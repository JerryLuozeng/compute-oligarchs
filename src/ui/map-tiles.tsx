import { useState, type ReactNode } from "react";
import { Activity, Cpu, Database, MapPinned, ShieldCheck } from "lucide-react";
import type { FactionId } from "@/core/models/ids";
import type { Tile } from "@/core/models/tile";
import { getMapSummary } from "./map-summary";
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

const tileStatus = (tile: Tile): string => tile.modelDrift >= 12 ? "高漂移" : tile.modelDrift >= 8 ? "漂移累积" : "运行中";

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
      <p>{summary.occupiedTileCount} 个节点已被占用</p>
    </div>
  );
}

export function MapTiles({ tiles }: { tiles: readonly Tile[] }) {
  const [selectedTileId, setSelectedTileId] = useState<Tile["id"]>(tiles[0]?.id ?? "wasteland");
  const selectedTile = tiles.find((tile) => tile.id === selectedTileId) ?? tiles[0];

  if (selectedTile === undefined) {
    return null;
  }

  return (
    <section className="map-section" aria-label="地块地图">
      <div className="map-section__heading">
        <div>
          <p className="map-section__eyebrow"><MapPinned /> TERRITORY / GRID 06</p>
          <h2>生产资料分布</h2>
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
        <div className="tile-grid" role="grid" aria-label="世界地块">
          {tiles.map((tile, index) => {
            const controller = tile.controllingFaction;
            const isSelected = tile.id === selectedTile.id;
            return (
              <button
                className={`map-tile ${controllerTone[controller]} ${isSelected ? "map-tile--selected" : ""} ${tile.modelDrift >= 12 ? "map-tile--unstable" : ""}`}
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

        <aside className={`tile-detail ${controllerTone[selectedTile.controllingFaction]}`} aria-live="polite">
          <div className="tile-detail__topline">
            <span>SELECTED NODE</span>
            <span className="tile-detail__status">{tileStatus(selectedTile)}</span>
          </div>
          <h3>{selectedTile.name}</h3>
          <p className="tile-detail__controller">{controllerLabel[selectedTile.controllingFaction]} · {collectionModeLabel[selectedTile.collectionMode]}</p>
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
        </aside>
      </div>
    </section>
  );
}
