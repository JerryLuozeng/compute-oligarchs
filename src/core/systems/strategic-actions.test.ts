import { describe, expect, it } from "vitest";
import { initialGameState } from "../models/initial-state";
import {
  beginStrategicActionPhase,
  createStrategicActionState,
  executeStrategicAction,
  finishStrategicActionPhase,
  isStrategicActionState
} from "./strategic-actions";

describe("strategic actions", () => {
  it("opens one three-point action phase per quarter", () => {
    const initial = createStrategicActionState();
    const active = beginStrategicActionPhase(initial, 1);
    expect(active).toMatchObject({ turn: 1, status: "active", pointsRemaining: 3 });
    expect(beginStrategicActionPhase(active, 1)).toBe(active);
    expect(finishStrategicActionPhase(active)).toMatchObject({ status: "complete", pointsRemaining: 0 });
  });

  it("investigates without mutating world resources", () => {
    const active = beginStrategicActionPhase(createStrategicActionState(), 1);
    const result = executeStrategicAction(initialGameState, active, "consortium", {
      type: "investigate",
      regionId: "region-28"
    });
    expect(result.gameState).toBe(initialGameState);
    expect(result.actionState.pointsRemaining).toBe(2);
    expect(result.actionState.investigatedRegionIds).toEqual(["region-28"]);
  });

  it("trades current compute for future infrastructure and pressure", () => {
    const active = beginStrategicActionPhase(createStrategicActionState(), 2);
    const before = initialGameState.infrastructureRegions.find((region) => region.id === "region-05")!;
    const result = executeStrategicAction(initialGameState, active, "consortium", {
      type: "invest",
      regionId: "region-05"
    });
    const player = result.gameState.factions.find((faction) => faction.id === "consortium");
    const region = result.gameState.infrastructureRegions.find((candidate) => candidate.id === "region-05")!;
    expect(player?.resources.compute).toBe(74);
    expect(region.computeCapacity).toBeCloseTo(before.computeCapacity + 2);
    expect(region.powerGeneration).toBeCloseTo(before.powerGeneration + 0.4);
    expect(region.powerDemand).toBeCloseTo(before.powerDemand + 1.4);
    expect(region.dataProduction).toBeCloseTo(before.dataProduction + 0.5);
    expect(region.modelDrift).toBeCloseTo(before.modelDrift + 0.75);
    expect(result.actionState.history[0]?.pressureTags).toContain("data-demand");
  });

  it("audits drift at the cost of data and immediate capacity", () => {
    const active = beginStrategicActionPhase(createStrategicActionState(), 2);
    const before = initialGameState.infrastructureRegions.find((region) => region.id === "region-20")!;
    const result = executeStrategicAction(initialGameState, active, "labor_union", {
      type: "audit",
      regionId: "region-20"
    });
    const player = result.gameState.factions.find((faction) => faction.id === "labor_union");
    const region = result.gameState.infrastructureRegions.find((candidate) => candidate.id === "region-20")!;
    expect(player?.resources.data).toBe(80);
    expect(region.computeCapacity).toBeCloseTo(before.computeCapacity - 0.5);
    expect(region.powerDemand).toBeCloseTo(before.powerDemand - 0.5);
    expect(region.modelDrift).toBeCloseTo(Math.max(0, before.modelDrift - 2));
    expect(region.stability).toBeCloseTo(Math.min(100, before.stability + 3));
    expect(result.gameState.globalModelDrift).toBeCloseTo(7.8);
  });

  it("rejects unavailable actions without spending points", () => {
    const active = beginStrategicActionPhase(createStrategicActionState(), 1);
    const afterInvest = executeStrategicAction(initialGameState, active, "consortium", {
      type: "invest",
      regionId: "region-05"
    });
    const rejected = executeStrategicAction(afterInvest.gameState, afterInvest.actionState, "consortium", {
      type: "audit",
      regionId: "region-05"
    });
    expect(rejected.error).toBe("insufficient-points");
    expect(rejected.gameState).toBe(afterInvest.gameState);
    expect(rejected.actionState).toBe(afterInvest.actionState);
  });

  it("rejects malformed serialized action history", () => {
    const active = beginStrategicActionPhase(createStrategicActionState(), 1);
    expect(isStrategicActionState(active)).toBe(true);
    expect(isStrategicActionState({ ...active, pointsRemaining: 9 })).toBe(false);
    expect(isStrategicActionState({
      ...active,
      history: [{ id: "bad", turn: 1, type: "conquer", targetId: "region-28", pressureTags: [] }]
    })).toBe(false);
  });
});
