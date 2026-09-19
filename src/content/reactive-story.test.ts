import { describe, expect, it } from "vitest";
import { initialGameState } from "@/core/models/initial-state";
import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import { createStoryProgress, recordStoryChoice } from "./story-events";
import { createLampTendencyState, recordLampAllocation, type LampAllocation } from "./lamps";
import { findReactiveStoryEvent, reactiveStoryEvents } from "./reactive-story";

const lamps = (allocation: LampAllocation) =>
  recordLampAllocation(createLampTendencyState(), allocation);

const withResources = (
  factionId: FactionId,
  resources: { compute: number; data: number; stability: number }
): GameState => ({
  ...initialGameState,
  factions: initialGameState.factions.map((faction) =>
    faction.id === factionId ? { ...faction, resources } : faction
  )
});

describe("reactive story events", () => {
  it("includes every resonance, grievance and resource crisis event", () => {
    expect(reactiveStoryEvents).toHaveLength(14);
    expect(new Set(reactiveStoryEvents.map((event) => event.id)).size).toBe(14);
    expect(reactiveStoryEvents.filter((event) => event.reactiveType === "resonance")).toHaveLength(5);
    expect(reactiveStoryEvents.filter((event) => event.reactiveType === "grievance")).toHaveLength(5);
    expect(reactiveStoryEvents.filter((event) => event.reactiveType === "crisis")).toHaveLength(4);
  });

  it("reacts to a favored lamp when no lamp is neglected", () => {
    const state = lamps({ industry: 30, order: 20, workshop: 20, commons: 15, livelihood: 15 });
    expect(findReactiveStoryEvent(createStoryProgress(), state, initialGameState, "consortium")?.id).toBe("RA1");
  });

  it("prioritizes the grievance of a neglected lamp over a simultaneous bright lamp", () => {
    const state = lamps({ industry: 0, order: 25, workshop: 25, commons: 25, livelihood: 25 });
    expect(findReactiveStoryEvent(createStoryProgress(), state, initialGameState, "consortium")?.id).toBe("RB1");
  });

  it("prioritizes resource crises and allows at most one reactive event per chapter", () => {
    const state = lamps({ industry: 20, order: 20, workshop: 20, commons: 20, livelihood: 20 });
    const lowCompute = withResources("labor_union", { compute: 12, data: 86, stability: 47 });
    const crisis = findReactiveStoryEvent(createStoryProgress(), state, lowCompute, "labor_union");
    expect(crisis?.id).toBe("RC1");

    const resolved = recordStoryChoice(createStoryProgress(), crisis!, "A");
    expect(resolved.reactiveChapterIndexes).toEqual([0]);
    expect(findReactiveStoryEvent(resolved, state, lowCompute, "labor_union")).toBeUndefined();
  });

  it("caps resource crises at two per game", () => {
    const state = lamps({ industry: 20, order: 20, workshop: 20, commons: 20, livelihood: 20 });
    const depleted = withResources("consortium", { compute: 0, data: 0, stability: 0 });
    const progress = {
      ...createStoryProgress(),
      chapterIndex: 3,
      resolvedIds: ["RC1", "RC2"],
      reactiveChapterIndexes: [0, 1]
    };

    expect(findReactiveStoryEvent(progress, state, depleted, "consortium")).toBeUndefined();
  });
});
