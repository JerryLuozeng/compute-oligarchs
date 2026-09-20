import { describe, expect, it } from "vitest";
import { initialGameState } from "@/core/models/initial-state";
import {
  beginStrategicActionPhase,
  createStrategicActionState,
  executeStrategicAction
} from "@/core/systems/strategic-actions";
import { applyPolicyChoice, createPolicyLegacyState } from "./policy-legacies";
import { createLampTendencyState, recordLampAllocation } from "./lamps";
import {
  createInterestPressureState,
  getInterestPressureLevel,
  settleInterestPressures
} from "./interest-pressure";

const allocation = (industry: number, order: number, workshop: number, commons: number, livelihood: number) =>
  recordLampAllocation(createLampTendencyState(), { industry, order, workshop, commons, livelihood });

describe("interest pressure", () => {
  it("keeps a balanced allocation stable", () => {
    const settlement = settleInterestPressures(
      { ...initialGameState, turn: 1 },
      createInterestPressureState(),
      allocation(20, 20, 20, 20, 20),
      createStrategicActionState(),
      createPolicyLegacyState()
    );
    expect(settlement.pressureState.pressures).toEqual({
      industry: 0, order: 0, workshop: 0, commons: 0, livelihood: 0
    });
  });

  it("accumulates relative pressure when one interest is repeatedly neglected", () => {
    const lamps = allocation(35, 20, 5, 20, 20);
    const first = settleInterestPressures(
      { ...initialGameState, turn: 1 },
      createInterestPressureState(),
      lamps,
      createStrategicActionState(),
      createPolicyLegacyState()
    );
    const second = settleInterestPressures(
      { ...first.gameState, turn: 2 },
      first.pressureState,
      lamps,
      createStrategicActionState(),
      createPolicyLegacyState()
    );
    expect(first.pressureState.pressures.workshop).toBe(8);
    expect(second.pressureState.pressures.workshop).toBe(16);
    expect(second.pressureState.pressures.industry).toBe(0);
  });

  it("turns active actions and policy legacies into traceable pressure", () => {
    const active = beginStrategicActionPhase(createStrategicActionState(), 1);
    const action = executeStrategicAction(initialGameState, active, "consortium", {
      type: "mobilize",
      regionId: "region-05"
    });
    const policies = applyPolicyChoice(createPolicyLegacyState(), "CONSORTIUM-T1", "A", 1);
    const settlement = settleInterestPressures(
      { ...action.gameState, turn: 1 },
      createInterestPressureState(),
      allocation(20, 20, 20, 20, 20),
      action.actionState,
      policies
    );
    expect(settlement.pressureState.pressures.workshop).toBe(7);
    expect(settlement.pressureState.history.find((record) => record.lampId === "workshop")?.causes)
      .toEqual(expect.arrayContaining(["动员透支劳动", "扩张优先挤压劳动条件"]));
  });

  it("applies escalating consequences after pressure crosses a threshold", () => {
    const pressureState = {
      ...createInterestPressureState(),
      pressures: { industry: 24, order: 49, workshop: 74, commons: 24, livelihood: 49 }
    };
    const settlement = settleInterestPressures(
      { ...initialGameState, turn: 1 },
      pressureState,
      allocation(10, 10, 10, 10, 60),
      createStrategicActionState(),
      createPolicyLegacyState()
    );
    expect(getInterestPressureLevel(settlement.pressureState.pressures.workshop)).toBe("breaking");
    expect(settlement.gameState.factions.find((faction) => faction.id === "labor_union")?.resources.data).toBe(77);
    expect(settlement.gameState.globalStability).toBeLessThan(initialGameState.globalStability);
    expect(settlement.gameState.globalModelDrift).toBeGreaterThan(initialGameState.globalModelDrift);
  });

  it("settles each quarter only once", () => {
    const gameState = { ...initialGameState, turn: 1 };
    const first = settleInterestPressures(
      gameState,
      createInterestPressureState(),
      allocation(40, 15, 15, 15, 15),
      createStrategicActionState(),
      createPolicyLegacyState()
    );
    const repeated = settleInterestPressures(
      first.gameState,
      first.pressureState,
      allocation(40, 15, 15, 15, 15),
      createStrategicActionState(),
      createPolicyLegacyState()
    );
    expect(repeated.pressureState).toBe(first.pressureState);
    expect(repeated.gameState).toBe(first.gameState);
    expect(repeated.feedback).toEqual([]);
  });
});
