import { describe, expect, it } from "vitest";
import { initialGameState } from "@/core/models/initial-state";
import { createStrategicActionState, type StrategicActionState } from "@/core/systems/strategic-actions";
import { createAdvisorRelationshipState } from "./advisor-system";
import { findTriggeredDynamicCrisis } from "./dynamic-crises";
import { createAdvisorTrustState } from "./faction-story";
import { createInterestPressureState } from "./interest-pressure";
import { applyPolicyChoice, createPolicyLegacyState } from "./policy-legacies";

const context = () => ({
  gameState: { ...initialGameState, turn: 5 },
  playerFactionId: "consortium" as const,
  pressureState: createInterestPressureState(),
  actionState: createStrategicActionState(),
  policyState: createPolicyLegacyState(),
  advisorTrust: createAdvisorTrustState(),
  advisorRelationships: createAdvisorRelationshipState()
});

describe("dynamic crises", () => {
  it("does not manufacture a crisis without accumulated causes", () => {
    expect(findTriggeredDynamicCrisis(context(), new Set())).toBeUndefined();
  });

  it("turns labor pressure, mobilization and policy legacy into a labor crisis", () => {
    const current = context();
    const actions: StrategicActionState = {
      ...current.actionState,
      turn: 5,
      history: [
        { id: "4-1-mobilize", turn: 4, type: "mobilize", targetId: "annotation-city", pressureTags: ["labor-pressure"] },
        { id: "5-1-mobilize", turn: 5, type: "mobilize", targetId: "annotation-city", pressureTags: ["labor-pressure"] }
      ]
    };
    const crisis = findTriggeredDynamicCrisis({
      ...current,
      actionState: actions,
      pressureState: {
        ...current.pressureState,
        pressures: { ...current.pressureState.pressures, workshop: 50 }
      },
      policyState: applyPolicyChoice(current.policyState, "CONSORTIUM-T1", "A", 2)
    }, new Set());

    expect(crisis?.id).toBe("dynamic-labor-rupture");
    expect(crisis?.trigger.description).toContain("透支式动员");
    expect(crisis?.trigger.description).toContain("扩张优先承诺");
  });

  it("uses rejected advice and broken promises to produce a trust crisis", () => {
    const current = context();
    const policyState = applyPolicyChoice(
      applyPolicyChoice(current.policyState, "CONSORTIUM-T1", "A", 1),
      "CONSORTIUM-T3",
      "A",
      4
    );
    const crisis = findTriggeredDynamicCrisis({
      ...current,
      pressureState: {
        ...current.pressureState,
        pressures: { ...current.pressureState.pressures, commons: 45 }
      },
      policyState,
      advisorTrust: { ...current.advisorTrust, park: -12 },
      advisorRelationships: {
        history: [
          { turn: 4, eventId: "A", advisorId: "aditya", delta: -4, reason: "advice-rejected" },
          { turn: 5, eventId: "B", advisorId: "park", delta: -4, reason: "advice-rejected" }
        ]
      }
    }, new Set());

    expect(crisis?.id).toBe("dynamic-trust-blackout");
    expect(crisis?.trigger.description).toContain("历史承诺已经被撕毁");
    expect(crisis?.trigger.description).toContain("停止充分共享信息");
  });

  it("selects the highest-scoring unresolved crisis and skips it after resolution", () => {
    const current = context();
    const risky = {
      ...current,
      gameState: { ...current.gameState, globalModelDrift: 20 },
      pressureState: {
        ...current.pressureState,
        pressures: { ...current.pressureState.pressures, workshop: 80 }
      }
    };
    const first = findTriggeredDynamicCrisis(risky, new Set());
    const second = findTriggeredDynamicCrisis(risky, new Set([first?.id ?? ""]));

    expect(first?.id).toBe("dynamic-labor-rupture");
    expect(second?.id).toBe("dynamic-model-feedback-loop");
  });

  it("applies crisis decisions immutably", () => {
    const current = context();
    const crisisGameState = { ...current.gameState, globalModelDrift: 24 };
    const crisis = findTriggeredDynamicCrisis({
      ...current,
      gameState: crisisGameState
    }, new Set());
    const next = crisis?.options[0]?.effect(crisisGameState);

    expect(crisis?.id).toBe("dynamic-model-feedback-loop");
    expect(next).not.toBe(current.gameState);
    expect(next?.globalModelDrift).toBe(15);
    expect(crisisGameState.globalModelDrift).toBe(24);
  });
});
