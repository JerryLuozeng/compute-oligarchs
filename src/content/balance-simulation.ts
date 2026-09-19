import { initialGameState } from "@/core/models/initial-state";
import type { FactionId } from "@/core/models/ids";
import { evaluateNarrativeEnding, type EndingKind } from "./endings";
import { applyFactionArcChange, createFactionArcState } from "./faction-routes";
import {
  beginLampChapter,
  createLampTendencyState,
  recordLampAllocation,
  type LampAllocation,
  type LampId
} from "./lamps";
import {
  advanceStoryChapter,
  createStoryProgress,
  findNextStoryEvent,
  isStoryComplete,
  recordStoryChoice,
  type StoryChoice
} from "./story-events";

export type AllocationStrategy = "single-focus" | "balanced" | "dual-focus";
export type ChoiceStrategy = "cooperative" | "assertive" | "alternating";

export interface BalanceSimulationResult {
  factionId: FactionId;
  allocationStrategy: AllocationStrategy;
  choiceStrategy: ChoiceStrategy;
  eventCount: number;
  reactiveEventCount: number;
  estimatedMinutes: readonly [number, number];
  ending: EndingKind;
}

const factionLamp: Record<FactionId, LampId> = {
  consortium: "industry",
  sovereign: "order",
  labor_union: "workshop",
  independent_labs: "commons",
  socialist_power: "livelihood"
};

const lampOrder: readonly LampId[] = ["industry", "order", "workshop", "commons", "livelihood"];

export const createStrategyAllocation = (
  factionId: FactionId,
  strategy: AllocationStrategy
): LampAllocation => {
  const primary = factionLamp[factionId];
  if (strategy === "balanced") {
    return { industry: 20, order: 20, workshop: 20, commons: 20, livelihood: 20 };
  }

  if (strategy === "single-focus") {
    return lampOrder.reduce<LampAllocation>((allocation, lampId) => ({
      ...allocation,
      [lampId]: lampId === primary ? 60 : 10
    }), { industry: 0, order: 0, workshop: 0, commons: 0, livelihood: 0 });
  }

  const primaryIndex = lampOrder.indexOf(primary);
  const secondary = lampOrder[(primaryIndex + 1) % lampOrder.length];
  const remainder = lampOrder.filter((lampId) => lampId !== primary && lampId !== secondary);
  return {
    industry: 0,
    order: 0,
    workshop: 0,
    commons: 0,
    livelihood: 0,
    [primary]: 40,
    [secondary]: 40,
    [remainder[0]]: 7,
    [remainder[1]]: 7,
    [remainder[2]]: 6
  };
};

const choose = (
  options: readonly StoryChoice[],
  strategy: ChoiceStrategy,
  eventIndex: number
): StoryChoice => {
  if (strategy === "cooperative") return options.find((option) => option.id === "C") ?? options[0];
  if (strategy === "assertive") return options.find((option) => option.id === "B") ?? options.at(-1)!;
  return options[eventIndex % 2] ?? options[0];
};

export const simulateNarrativeRun = (
  factionId: FactionId,
  allocationStrategy: AllocationStrategy,
  choiceStrategy: ChoiceStrategy
): BalanceSimulationResult => {
  const allocation = createStrategyAllocation(factionId, allocationStrategy);
  let lamps = recordLampAllocation(createLampTendencyState(), allocation);
  let progress = createStoryProgress();
  let arc = createFactionArcState(initialGameState, factionId);
  let eventCount = 0;
  let reactiveEventCount = 0;

  for (let step = 0; step < 100 && !isStoryComplete(progress, lamps, factionId, initialGameState); step += 1) {
    const event = findNextStoryEvent(progress, lamps, factionId, initialGameState);
    if (event !== undefined) {
      const selected = choose(event.options, choiceStrategy, eventCount);
      progress = recordStoryChoice(progress, event, selected.id);
      arc = applyFactionArcChange(arc, selected.arcChange ?? {});
      eventCount += 1;
      if (event.reactiveType !== undefined) reactiveEventCount += 1;
      continue;
    }

    const nextProgress = advanceStoryChapter(progress, lamps, factionId, initialGameState);
    if (nextProgress === progress) break;
    progress = nextProgress;
    lamps = recordLampAllocation(beginLampChapter(lamps), allocation);
  }

  if (!isStoryComplete(progress, lamps, factionId, initialGameState)) {
    throw new Error(`Simulation did not finish: ${factionId}/${allocationStrategy}/${choiceStrategy}`);
  }

  const ending = evaluateNarrativeEnding(initialGameState, factionId, arc, lamps, progress);
  return {
    factionId,
    allocationStrategy,
    choiceStrategy,
    eventCount,
    reactiveEventCount,
    // Includes six point-allocation rounds, map checks and chapter settlements.
    estimatedMinutes: [Math.round(eventCount * 38 / 60 + 9), Math.round(eventCount * 50 / 60 + 9)],
    ending: ending.kind
  };
};
