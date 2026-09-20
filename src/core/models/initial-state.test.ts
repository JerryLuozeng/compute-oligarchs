import { describe, expect, it } from "vitest";
import { initialFactions, initialGameState, initialInfrastructureRegions } from "./initial-state";

describe("initial game state", () => {
  it("contains the five documented factions", () => {
    expect(initialFactions).toHaveLength(5);
    expect(initialFactions.map((faction) => faction.id)).toEqual([
      "consortium",
      "sovereign",
      "labor_union",
      "independent_labs",
      "socialist_power"
    ]);
  });

  it("models all thirty map regions as infrastructure", () => {
    expect(initialInfrastructureRegions).toHaveLength(30);
    expect(new Set(initialInfrastructureRegions.map((region) => region.id)).size).toBe(30);
    expect(initialInfrastructureRegions.map((region) => region.regionNumber)).toEqual(
      Array.from({ length: 30 }, (_, index) => index + 1)
    );
  });

  it("gives the sovereign faction the largest opening territory", () => {
    const territoryCounts = initialInfrastructureRegions.reduce<Record<string, number>>((counts, region) => ({
      ...counts,
      [region.controllingFaction]: (counts[region.controllingFaction] ?? 0) + 1
    }), {});

    expect(territoryCounts.sovereign).toBe(9);
    expect(territoryCounts.consortium).toBe(7);
    expect(territoryCounts.labor_union).toBe(5);
    expect(territoryCounts.independent_labs).toBe(4);
  });

  it("keeps the Red Balance Community territory fixed", () => {
    const redBalanceRegions = initialInfrastructureRegions.filter(
      (region) => region.controllingFaction === "socialist_power"
    );
    expect(redBalanceRegions).toHaveLength(5);
    expect(redBalanceRegions.every((region) => region.controlStatus === "fixed")).toBe(true);
    expect(initialInfrastructureRegions
      .filter((region) => region.controllingFaction !== "socialist_power")
      .every((region) => region.controlStatus === "contested")).toBe(true);
  });

  it("starts at the documented opening era", () => {
    expect(initialGameState.turn).toBe(0);
    expect(initialGameState.globalModelDrift).toBeGreaterThan(0);
    expect(initialGameState.globalStability).toBeGreaterThan(0);
  });
});
