import { describe, expect, it } from "vitest";
import { initialFactions, initialGameState, initialTiles } from "./initial-state";

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

  it("contains the six world-setting tiles", () => {
    expect(initialTiles).toHaveLength(6);
    expect(initialTiles.map((tile) => tile.id)).toEqual([
      "glass-tower",
      "annotation-city",
      "government-city",
      "old-town",
      "energy-belt",
      "wasteland"
    ]);
  });

  it("starts at the documented opening era", () => {
    expect(initialGameState.turn).toBe(0);
    expect(initialGameState.globalModelDrift).toBeGreaterThan(0);
    expect(initialGameState.globalStability).toBeGreaterThan(0);
  });
});
