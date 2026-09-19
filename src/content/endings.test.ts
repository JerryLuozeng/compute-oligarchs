import { describe, expect, it } from "vitest";
import type { GameState } from "@/core/models/game-state";
import { initialGameState } from "@/core/models/initial-state";
import { endingThresholds, evaluateEnding } from "./endings";
import { evaluateNarrativeEnding } from "./endings";
import { createFactionArcState } from "./faction-routes";
import { createLampTendencyState, recordLampAllocation } from "./lamps";
import { createStoryProgress } from "./story-events";

const withConsortiumResources = (
  resources: { compute: number; data: number; stability: number },
  globalModelDrift = initialGameState.globalModelDrift
): GameState => ({
  ...initialGameState,
  factions: initialGameState.factions.map((faction) =>
    faction.id === "consortium" ? { ...faction, resources } : faction
  ),
  globalModelDrift
});

describe("evaluateEnding", () => {
  it("returns no ending for the initial state", () => {
    expect(evaluateEnding(initialGameState, "consortium")).toBeNull();
  });

  it("returns victory when all player resource and drift thresholds are met", () => {
    const state = withConsortiumResources({
      compute: endingThresholds.victory.compute,
      data: endingThresholds.victory.data,
      stability: endingThresholds.victory.stability
    }, endingThresholds.victory.maximumGlobalModelDrift);

    expect(evaluateEnding(state, "consortium")?.kind).toBe("victory");
  });

  it("returns faction defeat when player stability reaches zero", () => {
    const state = withConsortiumResources({ compute: 140, data: 90, stability: 0 });

    expect(evaluateEnding(state, "consortium")?.kind).toBe("faction-collapse");
  });

  it("prioritizes global system collapse over an otherwise valid victory", () => {
    const state = withConsortiumResources(
      { compute: 140, data: 90, stability: 80 },
      endingThresholds.defeat.maximumGlobalModelDrift
    );

    expect(evaluateEnding(state, "consortium")?.kind).toBe("system-collapse");
  });
});

describe("evaluateNarrativeEnding", () => {
  const balancedLamps = recordLampAllocation(createLampTendencyState(), {
    industry: 20, order: 20, workshop: 20, commons: 20, livelihood: 20
  });

  it("returns the shared hidden ending for a cooperative final choice", () => {
    const progress = { ...createStoryProgress(), choices: { E41: "A" } };
    const result = evaluateNarrativeEnding(
      initialGameState,
      "consortium",
      { factionId: "consortium", lifeline: 80, liability: 10 },
      balancedLamps,
      progress
    );

    expect(result.kind).toBe("shared-network");
  });

  it("returns fragments when three lamps are neglected and the player chooses separation", () => {
    const lamps = recordLampAllocation(createLampTendencyState(), {
      industry: 40, order: 0, workshop: 0, commons: 0, livelihood: 60
    });
    const progress = { ...createStoryProgress(), choices: { E41: "B" } };
    const result = evaluateNarrativeEnding(
      initialGameState,
      "consortium",
      createFactionArcState(initialGameState, "consortium"),
      lamps,
      progress
    );

    expect(result.kind).toBe("fragments");
    expect(result.tone).toBe("defeat");
  });

  it("distinguishes route compromise from a stable route", () => {
    const progress = { ...createStoryProgress(), choices: { E41: "B" } };
    const compromised = evaluateNarrativeEnding(
      initialGameState,
      "consortium",
      { factionId: "consortium", lifeline: 75, liability: 70 },
      balancedLamps,
      progress
    );
    const stable = evaluateNarrativeEnding(
      initialGameState,
      "consortium",
      { factionId: "consortium", lifeline: 80, liability: 10 },
      balancedLamps,
      progress
    );

    expect(compromised.kind).toBe("route-compromise");
    expect(stable.kind).toBe("route-success");
  });
});
