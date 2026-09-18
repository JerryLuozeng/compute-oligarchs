import type { Faction } from "./faction";
import type { GameState } from "./game-state";
import type { Tile } from "./tile";

export const initialFactions: readonly Faction[] = [
  {
    id: "consortium",
    name: "财团",
    resources: { compute: 82, data: 68, stability: 58 },
    exclusive: { mythHeat: 68, mythDebt: 12, informedLayerRatio: 0.25 }
  },
  {
    id: "sovereign",
    name: "主权国家",
    resources: { compute: 42, data: 56, stability: 65 },
    exclusive: { captureLevel: 38, monitoringIndex: 24, taxCapacity: 52 }
  },
  {
    id: "labor_union",
    name: "数据劳工联合体",
    resources: { compute: 12, data: 86, stability: 47 },
    exclusive: { organization: 46, awareness: 0.42, computeAccess: 0.08 }
  },
  {
    id: "independent_labs",
    name: "独立实验室",
    resources: { compute: 18, data: 34, stability: 54 },
    exclusive: { reputation: 58, researchFailures: 3, rentedCompute: 16 }
  },
  {
    id: "socialist_power",
    name: "社会主义强国",
    resources: { compute: 64, data: 61, stability: 62 },
    exclusive: { publicComputeRatio: 0.34, bureaucratization: 28, blockadeResistance: 41 }
  }
];

export const initialTiles: readonly Tile[] = [
  {
    id: "glass-tower",
    name: "玻璃塔区",
    controllingFaction: "consortium",
    computeOutput: 24,
    dataOutput: 8,
    modelDrift: 6,
    stability: 72,
    collectionMode: "free_service"
  },
  {
    id: "annotation-city",
    name: "标注城",
    controllingFaction: "labor_union",
    computeOutput: 3,
    dataOutput: 24,
    modelDrift: 8,
    stability: 48,
    collectionMode: "wage_labeling"
  },
  {
    id: "government-city",
    name: "政务城",
    controllingFaction: "sovereign",
    computeOutput: 8,
    dataOutput: 12,
    modelDrift: 5,
    stability: 66,
    collectionMode: "free_service"
  },
  {
    id: "old-town",
    name: "旧城区",
    controllingFaction: "commons",
    computeOutput: 2,
    dataOutput: 28,
    modelDrift: 9,
    stability: 43,
    collectionMode: "free_service"
  },
  {
    id: "energy-belt",
    name: "能源带",
    controllingFaction: "socialist_power",
    computeOutput: 18,
    dataOutput: 5,
    modelDrift: 4,
    stability: 61,
    collectionMode: "public_commons"
  },
  {
    id: "wasteland",
    name: "废土",
    controllingFaction: "none",
    computeOutput: 0,
    dataOutput: 1,
    modelDrift: 18,
    stability: 18,
    collectionMode: "compulsory"
  }
];

export const initialGameState: GameState = {
  turn: 0,
  factions: initialFactions.map((faction) => ({
    ...faction,
    resources: { ...faction.resources },
    exclusive: { ...faction.exclusive }
  })) as Faction[],
  tiles: initialTiles.map((tile) => ({ ...tile })),
  globalModelDrift: 8.3,
  globalStability: 51.3
};
