import { useState, type ReactNode } from "react";
import { Activity, Cpu, Database, MapPinned, ShieldCheck } from "lucide-react";
import type { FactionId } from "@/core/models/ids";
import type { Tile } from "@/core/models/tile";
import { getMapSummary } from "./map-summary";
import { WorldRegionMap } from "./world-region-map";
import "./map-tiles.css";

type TileController = FactionId | "commons" | "none";

const controllerLabel: Record<TileController, string> = {
  consortium: "财团",
  sovereign: "主权国家",
  labor_union: "数据劳工联合体",
  independent_labs: "独立实验室",
  socialist_power: "社会主义强国",
  commons: "公共地带",
  none: "无人控制"
};

const controllerTone: Record<TileController, string> = {
  consortium: "tile--consortium",
  sovereign: "tile--sovereign",
  labor_union: "tile--labor",
  independent_labs: "tile--labs",
  socialist_power: "tile--socialist",
  commons: "tile--commons",
  none: "tile--wasteland"
};

const collectionModeLabel: Record<Tile["collectionMode"], string> = {
  free_service: "免费服务采集",
  compulsory: "强制采集",
  wage_labeling: "计件标注",
  cooperative: "合作社共有",
  public_commons: "公共数据公地"
};

interface TileAssessment {
  label: string;
  detail: string;
  tone: "normal" | "watch" | "critical";
}

const assessTile = (tile: Tile): TileAssessment => {
  if (tile.stability < 25 || tile.modelDrift >= 16) {
    return { label: "系统危机", detail: "运行数据已偏离安全区间", tone: "critical" };
  }
  if (tile.stability < 50 || tile.modelDrift >= 8) {
    return { label: "重点监测", detail: "需要持续核验地区反馈", tone: "watch" };
  }
  return { label: "运行正常", detail: "当前数据与社会反馈一致", tone: "normal" };
};

function TileMetric({ icon, label, value }: { icon: ReactNode; label: string; value: number }) {
  return (
    <div className="tile-detail__metric">
      <span>{icon}{label}</span>
      <strong>{value.toFixed(1)}</strong>
    </div>
  );
}

function MapSummary({ tiles }: { tiles: readonly Tile[] }) {
  const summary = getMapSummary(tiles);

  return (
    <div className="map-summary" aria-label="地图态势摘要">
      <div className="map-summary__item">
        <Cpu /><span>可用算力</span><strong>{summary.totalComputeOutput.toFixed(1)}</strong>
      </div>
      <div className="map-summary__item">
        <Database /><span>数据流</span><strong>{summary.totalDataOutput.toFixed(1)}</strong>
      </div>
      <div className="map-summary__item">
        <ShieldCheck /><span>平均稳定度</span><strong>{summary.averageStability.toFixed(1)}</strong>
      </div>
      <div className={`map-summary__item ${summary.unstableTileCount > 0 ? "map-summary__item--alert" : ""}`}>
        <Activity /><span>异常节点</span><strong>{summary.unstableTileCount}/{tiles.length}</strong>
      </div>
      <p>{summary.occupiedTileCount}/{tiles.length} 个地区已纳入治理网络</p>
    </div>
  );
}

export function MapTiles({ tiles }: { tiles: readonly Tile[] }) {
  const [selectedTileId, setSelectedTileId] = useState<Tile["id"]>(tiles[0]?.id ?? "wasteland");
  const selectedTile = tiles.find((tile) => tile.id === selectedTileId) ?? tiles[0];

  if (selectedTile === undefined) {
    return null;
  }

  const assessment = assessTile(selectedTile);

  return (
    <section className="map-section" aria-label="地块地图">
      <div className="map-section__heading">
        <div>
          <p className="map-section__eyebrow"><MapPinned /> SOCIAL SYSTEM NETWORK / 06</p>
          <h2>算力与数据运行网络</h2>
        </div>
        <div className="map-legend" aria-label="势力图例">
          <span><i className="legend-dot legend-dot--consortium" />财团</span>
          <span><i className="legend-dot legend-dot--sovereign" />国家</span>
          <span><i className="legend-dot legend-dot--labor" />劳工</span>
          <span><i className="legend-dot legend-dot--labs" />实验室</span>
          <span><i className="legend-dot legend-dot--socialist" />社会主义强国</span>
          <span><i className="legend-dot legend-dot--commons" />公共地带</span>
          <span><i className="legend-dot legend-dot--wasteland" />废土</span>
        </div>
      </div>

      <MapSummary tiles={tiles} />

      <div className="map-layout">
        <WorldRegionMap
          tiles={tiles}
          selectedTileId={selectedTile.id}
          onSelectTile={setSelectedTileId}
        />

        <aside className={`tile-detail ${controllerTone[selectedTile.controllingFaction]} tile-detail--${assessment.tone}`} aria-live="polite">
          <div className="tile-detail__topline">
            <span>REGIONAL DOSSIER</span>
            <span className="tile-detail__status"><i />{assessment.label}</span>
          </div>
          <h3>{selectedTile.name}</h3>
          <dl className="tile-detail__governance">
            <div><dt>管理主体</dt><dd>{controllerLabel[selectedTile.controllingFaction]}</dd></div>
            <div><dt>数据生产</dt><dd>{collectionModeLabel[selectedTile.collectionMode]}</dd></div>
          </dl>
          <div className="tile-detail__metrics">
            <TileMetric icon={<Cpu />} label="算力产出" value={selectedTile.computeOutput} />
            <TileMetric icon={<Database />} label="数据产出" value={selectedTile.dataOutput} />
            <TileMetric icon={<Activity />} label="模型漂移" value={selectedTile.modelDrift} />
          </div>
          <div className="tile-detail__stability">
            <span>地块稳定度</span>
            <strong>{selectedTile.stability.toFixed(1)}</strong>
            <span className="tile-detail__stability-track"><i style={{ width: `${Math.min(100, Math.max(0, selectedTile.stability))}%` }} /></span>
          </div>
          <p className="tile-detail__assessment">{assessment.detail}</p>
        </aside>
      </div>

      <div className="tile-grid" role="grid" aria-label="地区运行索引">
        {tiles.map((tile, index) => {
          const controller = tile.controllingFaction;
          const isSelected = tile.id === selectedTile.id;
          return (
            <button
              className={`map-tile ${controllerTone[controller]} map-tile--${assessTile(tile).tone} ${isSelected ? "map-tile--selected" : ""}`}
              type="button"
              role="gridcell"
              aria-label={`${tile.name}，${controllerLabel[controller]}，算力 ${tile.computeOutput.toFixed(1)}，数据 ${tile.dataOutput.toFixed(1)}，漂移 ${tile.modelDrift.toFixed(1)}`}
              aria-selected={isSelected}
              data-testid={`map-tile-${tile.id}`}
              key={tile.id}
              onClick={() => setSelectedTileId(tile.id)}
            >
              <span className="map-tile__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="map-tile__signal" aria-hidden="true" />
              <span className="map-tile__name">{tile.name}</span>
              <span className="map-tile__controller">{controllerLabel[controller]}</span>
              <span className="map-tile__output">C {tile.computeOutput.toFixed(1)} / D {tile.dataOutput.toFixed(1)}</span>
              <span className="map-tile__drift">δ {tile.modelDrift.toFixed(1)}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
