import { describe, expect, it } from "vitest";
import { initialGameState } from "../models/initial-state";
import { tick } from "./tick";

describe("tick", () => {
  it("returns a new state and advances the turn", () => {
    const nextState = tick(initialGameState);

    expect(nextState).not.toBe(initialGameState);
    expect(nextState.factions).not.toBe(initialGameState.factions);
    expect(nextState.tiles).not.toBe(initialGameState.tiles);
    expect(nextState.turn).toBe(initialGameState.turn + 1);
    expect(initialGameState.turn).toBe(0);
  });

  it("adds controlled tile production before model maintenance", () => {
    const nextState = tick(initialGameState);
    const consortium = nextState.factions.find(
      (faction) => faction.id === "consortium"
    );

    expect(consortium?.resources.compute).toBeGreaterThan(
      initialGameState.factions[0].resources.compute
    );
    expect(consortium?.resources.data).toBeGreaterThanOrEqual(0);
  });

  it("uses high stability to increase data output", () => {
    const state = {
      ...initialGameState,
      factions: initialGameState.factions.map((faction) => ({
        ...faction,
        resources: { ...faction.resources, data: 1 }
      })),
      tiles: initialGameState.tiles.map((tile) =>
        tile.id === "glass-tower"
          ? { ...tile, stability: 100, modelDrift: 0 }
          : { ...tile, controllingFaction: "none" as const }
      )
    };
    const nextState = tick(state);
    const consortium = nextState.factions.find(
      (faction) => faction.id === "consortium"
    );

    expect(consortium?.resources.data).toBeCloseTo(11, 5);
  });

  it("raises drift and lowers stability when data is insufficient", () => {
    const state = {
      ...initialGameState,
      factions: initialGameState.factions.map((faction) => ({
        ...faction,
        resources: { ...faction.resources, data: 0 }
      }))
    };
    const nextState = tick(state);

    expect(nextState.globalModelDrift).toBeGreaterThan(initialGameState.globalModelDrift);
    expect(nextState.globalStability).toBeLessThan(initialGameState.globalStability);
    expect(nextState.factions.every((faction) => faction.resources.data >= 0)).toBe(true);
  });

  it("applies resource collapse to a critically unstable tile", () => {
    const state = {
      ...initialGameState,
      factions: initialGameState.factions.map((faction) => ({
        ...faction,
        resources: { ...faction.resources, data: 1000 }
      })),
      tiles: initialGameState.tiles.map((tile) =>
        tile.id === "glass-tower"
          ? { ...tile, stability: 10, modelDrift: 0 }
          : { ...tile, controllingFaction: "none" as const }
      )
    };
    const nextState = tick(state);
    const consortium = nextState.factions.find(
      (faction) => faction.id === "consortium"
    );

    expect(consortium?.resources.compute).toBe(88);
    expect(consortium?.resources.data).toBe(1002);
  });
});
