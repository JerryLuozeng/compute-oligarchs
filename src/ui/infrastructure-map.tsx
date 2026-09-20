import { useState, type ReactNode } from "react";
import { Activity, Cpu, Database, MapPinned, ShieldCheck, Zap } from "lucide-react";
import type { Faction } from "@/core/models/faction";
import { getPowerBalance, type InfrastructureKind, type InfrastructureRegion } from "@/core/models/infrastructure-region";
import type { FactionId, InfrastructureRegionId } from "@/core/models/ids";
import { getFactionProfile } from "@/content/factions";
import { WorldRegionMap } from "./world-region-map";
import "./infrastructure-map.css";

const controllerTone: Record<FactionId, string> = {
  consortium: "territory--consortium",
  sovereign: "territory--sovereign",
  labor_union: "territory--labor",
  independent_labs: "territory--labs",
  socialist_power: "territory--socialist"
};

const infrastructureLabels: Record<InfrastructureKind, string> = {
  compute_hub: "算力集群",
  power_hub: "电力枢纽",
  data_exchange: "数据交换站",
  network_relay: "网络中继",
  civic_grid: "公共电网"
};

interface RegionAssessment {
  label: string;
  detail: string;
  tone: "normal" | "watch" | "critical";
}

const assessRegion = (region: InfrastructureRegion): RegionAssessment => {
  const powerBalance = getPowerBalance(region);
  if (powerBalance < -1 || region.stability < 25 || region.modelDrift >= 16) {
    return { label: "基础设施危机", detail: "电力、稳定度或模型读数已越过安全边界", tone: "critical" };
  }
  if (powerBalance < 0 || region.stability < 50 || region.modelDrift >= 10) {
    return { label: "电网承压", detail: "有效算力将受到供电与社会稳定限制", tone: "watch" };
  }
  return { label: "运行正常", detail: "供电能够覆盖当前算力负荷", tone: "normal" };
};

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="region-dossier__metric"><span>{icon}{label}</span><strong>{value}</strong></div>;
}

export function InfrastructureMap({
  regions,
  factions
}: {
  regions: readonly InfrastructureRegion[];
  factions: readonly Faction[];
}) {
  const [selectedRegionId, setSelectedRegionId] = useState<InfrastructureRegionId>(regions[0]?.id ?? "region-01");
  const selectedRegion = regions.find((region) => region.id === selectedRegionId) ?? regions[0];
  if (selectedRegion === undefined) return null;

  const assessment = assessRegion(selectedRegion);
  const totalCompute = regions.reduce((total, region) => total + region.computeCapacity, 0);
  const totalGeneration = regions.reduce((total, region) => total + region.powerGeneration, 0);
  const totalDemand = regions.reduce((total, region) => total + region.powerDemand, 0);
  const deficitCount = regions.filter((region) => getPowerBalance(region) < 0).length;
  const territory = factions.map((faction) => {
    const controlled = regions.filter((region) => region.controllingFaction === faction.id);
    return {
      faction,
      count: controlled.length,
      compute: controlled.reduce((total, region) => total + region.computeCapacity, 0),
      power: controlled.reduce((total, region) => total + getPowerBalance(region), 0)
    };
  });

  return (
    <section className="infrastructure-map" aria-label="算力与电力基础设施版图">
      <header className="infrastructure-map__heading">
        <div>
          <p><MapPinned /> INFRASTRUCTURE CONTROL NETWORK / 30</p>
          <h2>算力与电力版图</h2>
        </div>
        <div className="infrastructure-map__legend" aria-label="势力图例">
          {territory.map(({ faction, count }) => (
            <span className={controllerTone[faction.id]} key={faction.id}><i />{getFactionProfile(faction.id).name}<b>{count}</b></span>
          ))}
        </div>
      </header>

      <div className="infrastructure-summary" aria-label="基础设施态势摘要">
        <div><Cpu /><span>算力容量</span><strong>{totalCompute.toFixed(1)}</strong></div>
        <div><Zap /><span>总发电</span><strong>{totalGeneration.toFixed(1)}</strong></div>
        <div><Activity /><span>总负荷</span><strong>{totalDemand.toFixed(1)}</strong></div>
        <div className={deficitCount > 0 ? "is-alert" : ""}><ShieldCheck /><span>缺电区域</span><strong>{deficitCount}/30</strong></div>
      </div>

      <div className="infrastructure-map__layout">
        <WorldRegionMap regions={regions} selectedRegionId={selectedRegion.id} onSelectRegion={setSelectedRegionId} />
        <aside className={`region-dossier ${controllerTone[selectedRegion.controllingFaction]} region-dossier--${assessment.tone}`} aria-live="polite">
          <div className="region-dossier__topline">
            <span>REGION {String(selectedRegion.regionNumber).padStart(2, "0")}</span>
            <span className="region-dossier__status"><i />{assessment.label}</span>
          </div>
          <h3>{selectedRegion.name}</h3>
          <dl>
            <div><dt>控制势力</dt><dd>{getFactionProfile(selectedRegion.controllingFaction).name}</dd></div>
            <div><dt>核心设施</dt><dd>{infrastructureLabels[selectedRegion.infrastructureKind]}</dd></div>
            <div><dt>控制状态</dt><dd>{selectedRegion.controlStatus === "fixed" ? "固定版图" : "争夺区域"}</dd></div>
          </dl>
          <div className="region-dossier__metrics">
            <Metric icon={<Cpu />} label="算力容量" value={selectedRegion.computeCapacity.toFixed(1)} />
            <Metric icon={<Zap />} label="发电能力" value={selectedRegion.powerGeneration.toFixed(1)} />
            <Metric icon={<Activity />} label="用电负荷" value={selectedRegion.powerDemand.toFixed(1)} />
            <Metric icon={<Database />} label="数据劳动" value={selectedRegion.dataProduction.toFixed(1)} />
          </div>
          <div className="region-dossier__balance">
            <span>电力余量</span>
            <strong>{getPowerBalance(selectedRegion) >= 0 ? "+" : ""}{getPowerBalance(selectedRegion).toFixed(1)}</strong>
          </div>
          <div className="region-dossier__stability">
            <span>区域稳定度</span><strong>{selectedRegion.stability.toFixed(1)}</strong>
            <i><b style={{ width: `${Math.min(100, Math.max(0, selectedRegion.stability))}%` }} /></i>
          </div>
          <p className="region-dossier__assessment">{assessment.detail}</p>
        </aside>
      </div>

      <div className="territory-ledger" aria-label="势力版图与综合基础设施实力">
        {territory.map(({ faction, count, compute, power }) => (
          <article className={controllerTone[faction.id]} key={faction.id}>
            <span><i />{getFactionProfile(faction.id).name}</span>
            <strong>{count} 区</strong>
            <small>算力 {compute.toFixed(0)} / 电力 {power >= 0 ? "+" : ""}{power.toFixed(1)}</small>
            <b style={{ width: `${count / regions.length * 100}%` }} />
          </article>
        ))}
      </div>
    </section>
  );
}
