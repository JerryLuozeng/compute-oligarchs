import { describe, expect, it } from "vitest";
import { initialGameState } from "@/core/models/initial-state";
import { createStrategicActionState } from "@/core/systems/strategic-actions";
import { createInterestPressureState } from "./interest-pressure";
import { createPolicyLegacyState } from "./policy-legacies";
import {
  createAdvisorRelationshipState,
  createAdvisorBriefings,
  isAdvisorRelationshipState,
  resolveAdvisorDecision
} from "./advisor-system";
import { createAdvisorTrustState, getFactionStoryEvents } from "./faction-story";

describe("advisor system", () => {
  const event = getFactionStoryEvents("consortium")[0];

  it("gives two advisors distinct interpretations of the same event", () => {
    const briefings = createAdvisorBriefings(
      event,
      "consortium",
      createAdvisorTrustState(),
      createAdvisorRelationshipState(),
      createInterestPressureState(),
      initialGameState,
      createPolicyLegacyState(),
      createStrategicActionState()
    );
    expect(briefings).toHaveLength(2);
    expect(briefings[0]?.message).not.toBe(briefings[1]?.message);
    expect(briefings.map((briefing) => briefing.advisor.id)).toEqual(["aditya", "park"]);
  });

  it("records both support and rejection when advice is followed", () => {
    const result = resolveAdvisorDecision(
      createAdvisorTrustState(),
      createAdvisorRelationshipState(),
      "consortium",
      event,
      event.options[0],
      3
    );
    expect(result.trust.park).toBe(10);
    expect(result.trust.aditya).toBe(-4);
    expect(result.relationships.history).toEqual(expect.arrayContaining([
      expect.objectContaining({ advisorId: "park", reason: "advice-followed" }),
      expect.objectContaining({ advisorId: "aditya", reason: "advice-rejected" })
    ]));
  });

  it("reveals pressure evidence after trust is established", () => {
    const pressureState = {
      ...createInterestPressureState(),
      pressures: { industry: 30, order: 0, workshop: 0, commons: 0, livelihood: 0 },
      history: [{
        turn: 1,
        lampId: "industry" as const,
        before: 20,
        after: 30,
        allocation: 10,
        causes: ["长期分配不足"]
      }]
    };
    const trust = { ...createAdvisorTrustState(), aditya: 20 };
    const briefings = createAdvisorBriefings(
      event,
      "consortium",
      trust,
      createAdvisorRelationshipState(),
      pressureState,
      initialGameState,
      createPolicyLegacyState(),
      createStrategicActionState()
    );
    expect(briefings.find((briefing) => briefing.advisor.id === "aditya")?.evidence)
      .toContain("长期分配不足");
  });

  it("marks some advice as model-mediated when drift is high", () => {
    const briefings = createAdvisorBriefings(
      event,
      "consortium",
      createAdvisorTrustState(),
      createAdvisorRelationshipState(),
      createInterestPressureState(),
      { ...initialGameState, globalModelDrift: 100 },
      createPolicyLegacyState(),
      createStrategicActionState()
    );
    expect(briefings.some((briefing) => briefing.signal === "model-mediated")).toBe(true);
  });

  it("validates serialized relationship history", () => {
    const state = resolveAdvisorDecision(
      createAdvisorTrustState(),
      createAdvisorRelationshipState(),
      "consortium",
      event,
      event.options[0],
      1
    ).relationships;
    expect(isAdvisorRelationshipState(state)).toBe(true);
    expect(isAdvisorRelationshipState({ history: [{ ...state.history[0], advisorId: "unknown" }] })).toBe(false);
  });
});
