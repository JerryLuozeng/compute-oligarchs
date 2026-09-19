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
      tileId: "wasteland"
    });
    expect(result.gameState).toBe(initialGameState);
    expect(result.actionState.pointsRemaining).toBe(2);
    expect(result.actionState.investigatedTileIds).toEqual(["wasteland"]);
  });

  it("trades current compute for future output and pressure", () => {
    const active = beginStrategicActionPhase(createStrategicActionState(), 2);
    const result = executeStrategicAction(initialGameState, active, "consortium", {
      type: "invest",
      tileId: "glass-tower"
    });
    const player = result.gameState.factions.find((faction) => faction.id === "consortium");
    const tile = result.gameState.tiles.find((candidate) => candidate.id === "glass-tower");
    expect(player?.resources.compute).toBe(74);
    expect(tile).toMatchObject({ computeOutput: 26, dataOutput: 9, modelDrift: 6.75 });
    expect(result.actionState.history[0]?.pressureTags).toContain("data-demand");
  });

  it("audits drift at the cost of data and immediate output", () => {
    const active = beginStrategicActionPhase(createStrategicActionState(), 2);
    const result = executeStrategicAction(initialGameState, active, "labor_union", {
      type: "audit",
      tileId: "annotation-city"
    });
    const player = result.gameState.factions.find((faction) => faction.id === "labor_union");
    const tile = result.gameState.tiles.find((candidate) => candidate.id === "annotation-city");
    expect(player?.resources.data).toBe(80);
    expect(tile).toMatchObject({ computeOutput: 2, modelDrift: 6, stability: 51 });
    expect(result.gameState.globalModelDrift).toBeCloseTo(7.8);
  });

  it("rejects unavailable actions without spending points", () => {
    const active = beginStrategicActionPhase(createStrategicActionState(), 1);
    const afterInvest = executeStrategicAction(initialGameState, active, "consortium", {
      type: "invest",
      tileId: "glass-tower"
    });
    const rejected = executeStrategicAction(afterInvest.gameState, afterInvest.actionState, "consortium", {
      type: "audit",
      tileId: "glass-tower"
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
      history: [{ id: "bad", turn: 1, type: "conquer", targetId: "wasteland", pressureTags: [] }]
    })).toBe(false);
  });
});
