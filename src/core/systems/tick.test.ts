import { describe, expect, it } from "vitest";
import type { GameState } from "../models/game-state";
import { initialGameState } from "../models/initial-state";
import { tick } from "./tick";

const isolatedState = (overrides: Partial<GameState["infrastructureRegions"][number]>): GameState => ({
  ...initialGameState,
  factions: initialGameState.factions.map((faction) => ({
    ...faction,
    resources: { ...faction.resources, data: 1000 }
  })),
  infrastructureRegions: [{
    ...initialGameState.infrastructureRegions[4],
    computeCapacity: 20,
    powerGeneration: 10,
    powerDemand: 10,
    dataProduction: 10,
    modelDrift: 0,
    stability: 50,
    ...overrides
  }]
});

describe("tick", () => {
  it("returns a new state and advances time", () => {
    const nextState = tick(initialGameState);

    expect(nextState).not.toBe(initialGameState);
    expect(nextState.factions).not.toBe(initialGameState.factions);
    expect(nextState.infrastructureRegions).not.toBe(initialGameState.infrastructureRegions);
    expect(nextState.turn).toBe(initialGameState.turn + 1);
    expect(initialGameState.turn).toBe(0);
  });

  it("adds controlled infrastructure production", () => {
    const state = isolatedState({});
    const before = state.factions.find((faction) => faction.id === "consortium")!;
    const after = tick(state).factions.find((faction) => faction.id === "consortium")!;

    expect(after.resources.compute - before.resources.compute).toBeCloseTo(20);
    expect(after.resources.data - before.resources.data).toBeCloseTo(10);
  });

  it("uses high regional stability to increase production", () => {
    const state = isolatedState({ stability: 100 });
    const before = state.factions.find((faction) => faction.id === "consortium")!;
    const after = tick(state).factions.find((faction) => faction.id === "consortium")!;

    expect(after.resources.compute - before.resources.compute).toBeCloseTo(24);
    expect(after.resources.data - before.resources.data).toBeCloseTo(12);
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

  it("limits usable compute and stability when electricity is insufficient", () => {
    const balanced = tick(isolatedState({ powerGeneration: 10, powerDemand: 10 }));
    const constrained = tick(isolatedState({ powerGeneration: 5, powerDemand: 10 }));
    const balancedFaction = balanced.factions.find((faction) => faction.id === "consortium")!;
    const constrainedFaction = constrained.factions.find((faction) => faction.id === "consortium")!;

    expect(constrainedFaction.resources.compute).toBeLessThan(balancedFaction.resources.compute);
    expect(constrainedFaction.resources.stability).toBeLessThan(balancedFaction.resources.stability);
    expect(constrained.globalModelDrift).toBeGreaterThan(balanced.globalModelDrift);
  });

  it("collapses production in a critically unstable region", () => {
    const state = isolatedState({ stability: 10 });
    const before = state.factions.find((faction) => faction.id === "consortium")!;
    const after = tick(state).factions.find((faction) => faction.id === "consortium")!;

    expect(after.resources.compute - before.resources.compute).toBeCloseTo(5);
    expect(after.resources.data - before.resources.data).toBeCloseTo(2.5);
  });
});
