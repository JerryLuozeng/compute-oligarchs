import { describe, expect, it } from "vitest";
import type { GameState } from "@/core/models/game-state";
import { initialGameState } from "@/core/models/initial-state";
import { endingThresholds, evaluateEnding } from "./endings";

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
