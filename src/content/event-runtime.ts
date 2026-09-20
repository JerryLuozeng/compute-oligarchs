import type { Faction } from "@/core/models/faction";
import type { GameState } from "@/core/models/game-state";
import {
  gameEvents,
  type EventCondition,
  type EventEffect,
  type GameEvent,
  type GameEventOption
} from "./events";

export interface RuntimeGameEventOption extends GameEventOption {
  effect: (state: GameState) => GameState;
}

export interface RuntimeGameEvent extends Omit<GameEvent, "trigger" | "options"> {
  origin?: "configured" | "dynamic";
  trigger: GameEvent["trigger"] & {
    matches: (state: GameState) => boolean;
  };
  options: readonly RuntimeGameEventOption[];
}

export interface EventDecisionRecord {
  turn: number;
  eventId: string;
  optionId: string;
  origin: "configured" | "dynamic";
}

export interface EventDecisionState {
  records: readonly EventDecisionRecord[];
}

export const createEventDecisionState = (): EventDecisionState => ({ records: [] });

export const recordEventDecision = (
  state: EventDecisionState,
  event: RuntimeGameEvent,
  option: RuntimeGameEventOption,
  turn: number
): EventDecisionState => state.records.some((record) => record.eventId === event.id)
  ? state
  : { records: [...state.records, {
      turn,
      eventId: event.id,
      optionId: option.id,
      origin: event.origin ?? "configured"
    }] };

export const isEventDecisionState = (value: unknown): value is EventDecisionState => {
  if (typeof value !== "object" || value === null || !("records" in value) || !Array.isArray(value.records)) {
    return false;
  }
  return value.records.every((record) => {
    if (typeof record !== "object" || record === null) return false;
    const candidate = record as Record<string, unknown>;
    return Number.isInteger(candidate.turn)
      && typeof candidate.eventId === "string"
      && typeof candidate.optionId === "string"
      && (candidate.origin === "configured" || candidate.origin === "dynamic");
  });
};

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value));

const compare = (value: number, operator: "above" | "below", threshold: number): boolean =>
  operator === "above" ? value > threshold : value < threshold;

const getFactionAttribute = (faction: Faction, attribute: string): number | undefined => {
  switch (faction.id) {
    case "consortium":
      if (attribute === "mythHeat") return faction.exclusive.mythHeat;
      if (attribute === "mythDebt") return faction.exclusive.mythDebt;
      if (attribute === "informedLayerRatio") return faction.exclusive.informedLayerRatio;
      return undefined;
    case "sovereign":
      if (attribute === "captureLevel") return faction.exclusive.captureLevel;
      if (attribute === "monitoringIndex") return faction.exclusive.monitoringIndex;
      if (attribute === "taxCapacity") return faction.exclusive.taxCapacity;
      return undefined;
    case "labor_union":
      if (attribute === "organization") return faction.exclusive.organization;
      if (attribute === "awareness") return faction.exclusive.awareness;
      if (attribute === "computeAccess") return faction.exclusive.computeAccess;
      return undefined;
    case "independent_labs":
      if (attribute === "reputation") return faction.exclusive.reputation;
      if (attribute === "researchFailures") return faction.exclusive.researchFailures;
      if (attribute === "rentedCompute") return faction.exclusive.rentedCompute;
      return undefined;
    case "socialist_power":
      if (attribute === "publicComputeRatio") return faction.exclusive.publicComputeRatio;
      if (attribute === "bureaucratization") return faction.exclusive.bureaucratization;
      if (attribute === "blockadeResistance") return faction.exclusive.blockadeResistance;
      return undefined;
  }
};

export const matchesEventCondition = (condition: EventCondition, state: GameState): boolean => {
  switch (condition.kind) {
    case "turn_at_least":
      return state.turn >= condition.value;
    case "global_stability_below":
      return state.globalStability < condition.value;
    case "global_model_drift_above":
      return state.globalModelDrift > condition.value;
    case "faction_resource": {
      const faction = state.factions.find((candidate) => candidate.id === condition.faction);
      return faction !== undefined && compare(
        faction.resources[condition.resource],
        condition.operator,
        condition.value
      );
    }
    case "faction_attribute": {
      const faction = state.factions.find((candidate) => candidate.id === condition.faction);
      if (faction === undefined) return false;
      const value = getFactionAttribute(faction, condition.attribute);
      return value !== undefined && compare(value, condition.operator, condition.value);
    }
    case "region_metric": {
      const region = state.infrastructureRegions.find((candidate) => candidate.id === condition.region);
      return region !== undefined && compare(region[condition.metric], condition.operator, condition.value);
    }
  }
};

const updateFaction = (faction: Faction, effect: EventEffect): Faction => {
  const resources = {
    compute: Math.max(0, faction.resources.compute + (effect.compute ?? 0)),
    data: Math.max(0, faction.resources.data + (effect.data ?? 0)),
    stability: clamp(faction.resources.stability + (effect.stability ?? 0), 0, 100)
  };

  switch (faction.id) {
    case "consortium":
      return {
        ...faction,
        resources,
        exclusive: {
          ...faction.exclusive,
          mythHeat: clamp(faction.exclusive.mythHeat + (effect.mythHeat ?? 0), 0, 100)
        }
      };
    case "labor_union":
      return {
        ...faction,
        resources,
        exclusive: {
          ...faction.exclusive,
          organization: clamp(faction.exclusive.organization + (effect.organization ?? 0), 0, 100),
          awareness: clamp(faction.exclusive.awareness + (effect.awareness ?? 0), 0, 1)
        }
      };
    case "socialist_power":
      return {
        ...faction,
        resources,
        exclusive: {
          ...faction.exclusive,
          publicComputeRatio: clamp(
            faction.exclusive.publicComputeRatio + (effect.publicComputeRatio ?? 0),
            0,
            1
          ),
          bureaucratization: clamp(
            faction.exclusive.bureaucratization + (effect.bureaucratization ?? 0),
            0,
            100
          )
        }
      };
    case "sovereign":
      return { ...faction, resources, exclusive: { ...faction.exclusive } };
    case "independent_labs":
      return { ...faction, resources, exclusive: { ...faction.exclusive } };
  }
};

export const applyEventEffects = (
  state: GameState,
  effects: readonly EventEffect[]
): GameState => effects.reduce<GameState>((currentState, effect) => {
  if (effect.target === "global") {
    return {
      ...currentState,
      globalStability: clamp(currentState.globalStability + (effect.stability ?? 0), 0, 100),
      globalModelDrift: Math.max(0, currentState.globalModelDrift + (effect.modelDrift ?? 0))
    };
  }

  return {
    ...currentState,
    factions: currentState.factions.map((faction) =>
      faction.id === effect.target ? updateFaction(faction, effect) : faction
    )
  };
}, state);

const createRuntimeEvent = (event: GameEvent): RuntimeGameEvent => ({
  ...event,
  origin: "configured",
  trigger: {
    ...event.trigger,
    matches: (state) => event.trigger.all.every((condition) => matchesEventCondition(condition, state))
  },
  options: event.options.map((option) => ({
    ...option,
    effect: (state) => applyEventEffects(state, option.effects)
  }))
});

export const runtimeGameEvents: readonly RuntimeGameEvent[] = gameEvents.map(createRuntimeEvent);

export const findTriggeredEvent = (
  state: GameState,
  resolvedEventIds: ReadonlySet<string>
): RuntimeGameEvent | undefined => runtimeGameEvents.find(
  (event) => !resolvedEventIds.has(event.id) && event.trigger.matches(state)
);
