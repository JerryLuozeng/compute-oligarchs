import type { Faction } from "./faction";
import type { GameState } from "./game-state";
import type { InfrastructureKind, InfrastructureRegion } from "./infrastructure-region";
import type { FactionId, InfrastructureRegionId } from "./ids";

export const initialFactions: readonly Faction[] = [
  { id: "consortium", name: "财团", resources: { compute: 82, data: 68, stability: 58 }, exclusive: { mythHeat: 68, mythDebt: 12, informedLayerRatio: 0.25 } },
  { id: "sovereign", name: "主权国家", resources: { compute: 42, data: 56, stability: 65 }, exclusive: { captureLevel: 38, monitoringIndex: 24, taxCapacity: 52 } },
  { id: "labor_union", name: "数据劳工联合体", resources: { compute: 12, data: 86, stability: 47 }, exclusive: { organization: 46, awareness: 0.42, computeAccess: 0.08 } },
  { id: "independent_labs", name: "独立实验室", resources: { compute: 18, data: 34, stability: 54 }, exclusive: { reputation: 58, researchFailures: 3, rentedCompute: 16 } },
  { id: "socialist_power", name: "社会主义强国", resources: { compute: 64, data: 61, stability: 62 }, exclusive: { publicComputeRatio: 0.34, bureaucratization: 28, blockadeResistance: 41 } }
];

type RegionBlueprint = readonly [InfrastructureRegionId, string, FactionId, InfrastructureKind];

const regionBlueprints: readonly RegionBlueprint[] = [
  ["region-01", "联邦中枢环", "sovereign", "civic_grid"],
  ["region-02", "北岸监管区", "sovereign", "network_relay"],
  ["region-03", "赤衡北岭站", "socialist_power", "power_hub"],
  ["region-04", "赤衡枢纽带", "socialist_power", "compute_hub"],
  ["region-05", "云穹一号港", "consortium", "compute_hub"],
  ["region-06", "棱镜镜像岛", "independent_labs", "data_exchange"],
  ["region-07", "赤衡能源走廊", "socialist_power", "power_hub"],
  ["region-08", "赤衡公共云", "socialist_power", "civic_grid"],
  ["region-09", "联邦东部算域", "sovereign", "compute_hub"],
  ["region-10", "天穹海底缆站", "consortium", "network_relay"],
  ["region-11", "联邦数据关", "sovereign", "data_exchange"],
  ["region-12", "赤衡民生节点", "socialist_power", "civic_grid"],
  ["region-13", "星火南方工棚", "labor_union", "data_exchange"],
  ["region-14", "棱镜自治节点", "independent_labs", "network_relay"],
  ["region-15", "联邦中央档案区", "sovereign", "data_exchange"],
  ["region-16", "天穹边缘云", "consortium", "compute_hub"],
  ["region-17", "联邦工业审计区", "sovereign", "civic_grid"],
  ["region-18", "天穹离岸算场", "consortium", "compute_hub"],
  ["region-19", "棱镜协议港", "independent_labs", "data_exchange"],
  ["region-20", "星火维修走廊", "labor_union", "power_hub"],
  ["region-21", "联邦北境节点", "sovereign", "network_relay"],
  ["region-22", "天穹冷却基地", "consortium", "power_hub"],
  ["region-23", "星火地下库", "labor_union", "data_exchange"],
  ["region-24", "星火标注带", "labor_union", "data_exchange"],
  ["region-25", "棱镜公共仓", "independent_labs", "network_relay"],
  ["region-26", "天穹西部机房", "consortium", "compute_hub"],
  ["region-27", "联邦能源监管区", "sovereign", "power_hub"],
  ["region-28", "联邦远海站", "sovereign", "network_relay"],
  ["region-29", "星火数据集市", "labor_union", "data_exchange"],
  ["region-30", "天穹转运云", "consortium", "compute_hub"]
];

const factionBase: Readonly<Record<FactionId, readonly [number, number, number, number, number]>> = {
  consortium: [4.2, 3.2, 4.4, 1.7, 6.5],
  sovereign: [2.4, 3.3, 2.8, 1.8, 4.8],
  labor_union: [1.2, 2.0, 1.8, 4.4, 7.4],
  independent_labs: [1.8, 1.8, 2.0, 3.2, 4.1],
  socialist_power: [3.0, 4.8, 3.0, 2.0, 3.6]
};

const kindAdjustments: Readonly<Record<InfrastructureKind, readonly [number, number, number, number]>> = {
  compute_hub: [2.8, 0.4, 1.7, 0.2],
  power_hub: [0.4, 3.4, 0.2, 0.1],
  data_exchange: [0.2, 0.2, 0.3, 2.4],
  network_relay: [1.0, 0.8, 0.8, 0.9],
  civic_grid: [0.7, 1.7, 0.4, 1.0]
};

export const initialInfrastructureRegions: readonly InfrastructureRegion[] = regionBlueprints.map(
  ([id, name, controllingFaction, infrastructureKind], index) => {
    const base = factionBase[controllingFaction];
    const adjustment = kindAdjustments[infrastructureKind];
    const variance = (index % 3) * 0.35;
    return {
      id,
      regionNumber: index + 1,
      name,
      controllingFaction,
      controlStatus: controllingFaction === "socialist_power" ? "fixed" : "contested",
      infrastructureKind,
      computeCapacity: base[0] + adjustment[0] + variance,
      powerGeneration: base[1] + adjustment[1] + variance,
      powerDemand: base[2] + adjustment[2] + variance * 0.5,
      dataProduction: base[3] + adjustment[3] + variance,
      modelDrift: base[4] + (index % 4) * 0.5,
      stability: Math.min(88, base[4] < 5 ? 68 + (index % 5) * 3 : 52 + (index % 6) * 4)
    };
  }
);

export const initialGameState: GameState = {
  turn: 0,
  factions: initialFactions.map((faction) => ({ ...faction, resources: { ...faction.resources }, exclusive: { ...faction.exclusive } })) as Faction[],
  infrastructureRegions: initialInfrastructureRegions.map((region) => ({ ...region })),
  globalModelDrift: 8.3,
  globalStability: 51.3
};
