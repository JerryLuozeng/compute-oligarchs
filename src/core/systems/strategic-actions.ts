import type { GameState } from "../models/game-state";
import { infrastructureRegionIds, type FactionId, type InfrastructureRegionId } from "../models/ids";

export const ACTION_POINTS_PER_QUARTER = 3;

export type StrategicActionType =
  | "investigate"
  | "audit"
  | "invest"
  | "negotiate"
  | "mobilize"
  | "publish";

export type StrategicAction =
  | { type: "investigate" | "audit" | "invest" | "mobilize" | "publish"; regionId: InfrastructureRegionId }
  | { type: "negotiate"; factionId: FactionId };

export type ActionPressureTag =
  | "data-demand"
  | "infrastructure-pressure"
  | "innovation-delay"
  | "labor-pressure"
  | "exposure-risk"
  | "commitment-risk";

export interface StrategicActionRecord {
  id: string;
  turn: number;
  type: StrategicActionType;
  targetId: InfrastructureRegionId | FactionId;
  pressureTags: readonly ActionPressureTag[];
}

export interface StrategicActionState {
  turn: number;
  status: "complete" | "active";
  pointsRemaining: number;
  investigatedRegionIds: readonly InfrastructureRegionId[];
  history: readonly StrategicActionRecord[];
}

export interface StrategicActionResult {
  gameState: GameState;
  actionState: StrategicActionState;
  error?: "phase-inactive" | "insufficient-points" | "invalid-target" | "insufficient-resources";
}

const actionCosts: Readonly<Record<StrategicActionType, number>> = {
  investigate: 1,
  audit: 2,
  invest: 2,
  negotiate: 1,
  mobilize: 1,
  publish: 1
};

const pressureTags: Readonly<Record<StrategicActionType, readonly ActionPressureTag[]>> = {
  investigate: [],
  audit: ["innovation-delay"],
  invest: ["data-demand", "infrastructure-pressure"],
  negotiate: ["commitment-risk"],
  mobilize: ["labor-pressure"],
  publish: ["exposure-risk"]
};

const factionIds: readonly FactionId[] = [
  "consortium", "sovereign", "labor_union", "independent_labs", "socialist_power"
];
const actionTypes = Object.keys(actionCosts) as readonly StrategicActionType[];
const knownPressureTags: readonly ActionPressureTag[] = [
  "data-demand",
  "infrastructure-pressure",
  "innovation-delay",
  "labor-pressure",
  "exposure-risk",
  "commitment-risk"
];

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value));

export const createStrategicActionState = (): StrategicActionState => ({
  turn: 0,
  status: "complete",
  pointsRemaining: 0,
  investigatedRegionIds: [],
  history: []
});

export const beginStrategicActionPhase = (
  state: StrategicActionState,
  turn: number
): StrategicActionState => {
  if (state.status === "active" || turn <= state.turn) return state;
  return { ...state, turn, status: "active", pointsRemaining: ACTION_POINTS_PER_QUARTER };
};

export const finishStrategicActionPhase = (state: StrategicActionState): StrategicActionState =>
  state.status === "complete" ? state : { ...state, status: "complete", pointsRemaining: 0 };

const targetId = (action: StrategicAction): InfrastructureRegionId | FactionId =>
  action.type === "negotiate" ? action.factionId : action.regionId;

const addRecord = (
  state: StrategicActionState,
  action: StrategicAction,
  pointsRemaining: number
): StrategicActionState => ({
  ...state,
  pointsRemaining,
  investigatedRegionIds: action.type === "investigate" && !state.investigatedRegionIds.includes(action.regionId)
    ? [...state.investigatedRegionIds, action.regionId]
    : state.investigatedRegionIds,
  history: [...state.history, {
    id: `${state.turn}-${state.history.length + 1}-${action.type}`,
    turn: state.turn,
    type: action.type,
    targetId: targetId(action),
    pressureTags: pressureTags[action.type]
  }]
});

const updateFaction = (
  state: GameState,
  factionId: FactionId,
  update: (resources: GameState["factions"][number]["resources"]) => GameState["factions"][number]["resources"]
): GameState => ({
  ...state,
  factions: state.factions.map((faction) => faction.id === factionId
    ? { ...faction, resources: update(faction.resources) }
    : faction)
});

export const executeStrategicAction = (
  gameState: GameState,
  actionState: StrategicActionState,
  playerFactionId: FactionId,
  action: StrategicAction
): StrategicActionResult => {
  if (actionState.status !== "active") return { gameState, actionState, error: "phase-inactive" };
  const cost = actionCosts[action.type];
  if (actionState.pointsRemaining < cost) return { gameState, actionState, error: "insufficient-points" };

  const player = gameState.factions.find((faction) => faction.id === playerFactionId);
  const region = action.type === "negotiate"
    ? undefined
    : gameState.infrastructureRegions.find((candidate) => candidate.id === action.regionId);
  const targetFaction = action.type === "negotiate"
    ? gameState.factions.find((faction) => faction.id === action.factionId)
    : undefined;
  if (player === undefined || (action.type === "negotiate" ? targetFaction === undefined : region === undefined)) {
    return { gameState, actionState, error: "invalid-target" };
  }

  let nextGameState = gameState;
  if (action.type === "audit") {
    if (player.resources.data < 6) return { gameState, actionState, error: "insufficient-resources" };
    nextGameState = updateFaction(gameState, playerFactionId, (resources) => ({ ...resources, data: resources.data - 6 }));
    nextGameState = {
      ...nextGameState,
      globalModelDrift: Math.max(0, nextGameState.globalModelDrift - 0.5),
      infrastructureRegions: nextGameState.infrastructureRegions.map((candidate) => candidate.id === action.regionId
        ? {
            ...candidate,
            computeCapacity: Math.max(0, candidate.computeCapacity - 0.5),
            powerDemand: Math.max(0, candidate.powerDemand - 0.5),
            modelDrift: Math.max(0, candidate.modelDrift - 2),
            stability: clamp(candidate.stability + 3, 0, 100)
          }
        : candidate)
    };
  } else if (action.type === "invest") {
    if (player.resources.compute < 8) return { gameState, actionState, error: "insufficient-resources" };
    nextGameState = updateFaction(gameState, playerFactionId, (resources) => ({ ...resources, compute: resources.compute - 8 }));
    nextGameState = {
      ...nextGameState,
      infrastructureRegions: nextGameState.infrastructureRegions.map((candidate) => candidate.id === action.regionId
        ? {
            ...candidate,
            computeCapacity: candidate.computeCapacity + 2,
            powerGeneration: candidate.powerGeneration + 0.4,
            powerDemand: candidate.powerDemand + 1.4,
            dataProduction: candidate.dataProduction + 0.5,
            modelDrift: candidate.modelDrift + 0.75
          }
        : candidate)
    };
  } else if (action.type === "negotiate") {
    if (player.resources.compute < 3 || action.factionId === playerFactionId) {
      return { gameState, actionState, error: action.factionId === playerFactionId ? "invalid-target" : "insufficient-resources" };
    }
    nextGameState = {
      ...gameState,
      globalStability: clamp(gameState.globalStability + 0.5, 0, 100),
      factions: gameState.factions.map((faction) => {
        if (faction.id === playerFactionId) {
          return { ...faction, resources: {
            ...faction.resources,
            compute: faction.resources.compute - 3,
            stability: clamp(faction.resources.stability + 1, 0, 100)
          } };
        }
        if (faction.id === action.factionId) {
          return { ...faction, resources: {
            ...faction.resources,
            stability: clamp(faction.resources.stability + 2, 0, 100)
          } };
        }
        return faction;
      })
    };
  } else if (action.type === "mobilize") {
    nextGameState = updateFaction(gameState, playerFactionId, (resources) => ({
      ...resources,
      stability: clamp(resources.stability - 2, 0, 100)
    }));
    nextGameState = {
      ...nextGameState,
      infrastructureRegions: nextGameState.infrastructureRegions.map((candidate) => candidate.id === action.regionId
        ? {
            ...candidate,
            computeCapacity: candidate.computeCapacity + 1,
            dataProduction: candidate.dataProduction + 2,
            powerDemand: candidate.powerDemand + 1,
            modelDrift: candidate.modelDrift + 1,
            stability: clamp(candidate.stability - 2, 0, 100)
          }
        : candidate)
    };
  } else if (action.type === "publish") {
    if (player.resources.data < 3) return { gameState, actionState, error: "insufficient-resources" };
    nextGameState = updateFaction(gameState, playerFactionId, (resources) => ({
      ...resources,
      data: resources.data - 3,
      stability: clamp(resources.stability - 1, 0, 100)
    }));
    nextGameState = {
      ...nextGameState,
      globalModelDrift: Math.max(0, nextGameState.globalModelDrift - 0.75),
      globalStability: clamp(nextGameState.globalStability + 0.5, 0, 100)
    };
  }

  return {
    gameState: nextGameState,
    actionState: addRecord(actionState, action, actionState.pointsRemaining - cost)
  };
};

export const isStrategicActionState = (value: unknown): value is StrategicActionState => {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  const validStatus = candidate.status === "complete" || candidate.status === "active";
  const validPoints = Number.isInteger(candidate.pointsRemaining)
    && (candidate.pointsRemaining as number) >= 0
    && (candidate.pointsRemaining as number) <= ACTION_POINTS_PER_QUARTER
    && (candidate.status !== "complete" || candidate.pointsRemaining === 0);
  return Number.isInteger(candidate.turn)
    && (candidate.turn as number) >= 0
    && validStatus
    && validPoints
    && Array.isArray(candidate.investigatedRegionIds)
    && candidate.investigatedRegionIds.every((id) => infrastructureRegionIds.includes(id as InfrastructureRegionId))
    && Array.isArray(candidate.history)
    && candidate.history.every((record) => {
      if (typeof record !== "object" || record === null) return false;
      const actionRecord = record as Record<string, unknown>;
      return typeof actionRecord.id === "string"
        && Number.isInteger(actionRecord.turn)
        && actionTypes.includes(actionRecord.type as StrategicActionType)
        && (infrastructureRegionIds.includes(actionRecord.targetId as InfrastructureRegionId)
          || factionIds.includes(actionRecord.targetId as FactionId))
        && Array.isArray(actionRecord.pressureTags)
        && actionRecord.pressureTags.every((tag) => knownPressureTags.includes(tag as ActionPressureTag));
    });
};
