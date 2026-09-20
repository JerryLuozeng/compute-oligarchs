import { describe, expect, it } from "vitest";
import type { GameState } from "@/core/models/game-state";
import { initialGameState } from "@/core/models/initial-state";
import { createStrategicActionState } from "@/core/systems/strategic-actions";
import { createAdvisorRelationshipState } from "./advisor-system";
import { endingThresholds, evaluateEnding, evaluateNarrativeEnding } from "./endings";
import { createAdvisorTrustState } from "./faction-story";
import { createFactionArcState } from "./faction-routes";
import { createInterestPressureState } from "./interest-pressure";
import { createLampTendencyState, recordLampAllocation } from "./lamps";
import { applyPolicyChoice, createPolicyLegacyState } from "./policy-legacies";
import { createStoryProgress } from "./story-events";

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

const balancedLamps = recordLampAllocation(createLampTendencyState(), {
  industry: 20, order: 20, workshop: 20, commons: 20, livelihood: 20
});

const narrativeContext = () => ({
  policyState: createPolicyLegacyState(),
  actionState: createStrategicActionState(),
  pressureState: createInterestPressureState(),
  advisorTrust: createAdvisorTrustState(),
  advisorRelationships: createAdvisorRelationshipState(),
  resolvedEventIds: [] as readonly string[]
});

describe("evaluateEnding", () => {
  it("returns no ending for the initial state", () => {
    expect(evaluateEnding(initialGameState, "consortium")).toBeNull();
  });

  it("does not turn a resource threshold into an automatic victory", () => {
    const state = withConsortiumResources({ compute: 180, data: 120, stability: 90 }, 5);
    expect(evaluateEnding(state, "consortium")).toBeNull();
  });

  it("returns faction collapse when player stability reaches zero", () => {
    const state = withConsortiumResources({ compute: 140, data: 90, stability: 0 });
    const result = evaluateEnding(state, "consortium");
    expect(result?.kind).toBe("faction-collapse");
    expect(result?.tone).toBe("collapse");
  });

  it("allows severe drift to create crises before terminal system collapse", () => {
    const severe = withConsortiumResources({ compute: 140, data: 90, stability: 80 }, 50);
    const terminal = { ...severe, globalModelDrift: endingThresholds.defeat.maximumGlobalModelDrift };
    expect(evaluateEnding(severe, "consortium")).toBeNull();
    expect(evaluateEnding(terminal, "consortium")?.kind).toBe("system-collapse");
  });
});

describe("evaluateNarrativeEnding", () => {
  it("returns the shared network for a balanced cooperative history", () => {
    const progress = {
      ...createStoryProgress(),
      choices: { E02: "A", E13: "A", E17: "A", E21: "A", E41: "A" }
    };
    const result = evaluateNarrativeEnding(
      initialGameState,
      "consortium",
      { factionId: "consortium", lifeline: 80, liability: 10 },
      balancedLamps,
      progress,
      narrativeContext()
    );
    expect(result.kind).toBe("shared-network");
    expect(result.tone).toBe("continuity");
    expect(result.factors.some((factor) => factor.includes("跨势力合作"))).toBe(true);
  });

  it("returns fragments when neglected interests combine with separation", () => {
    const lamps = recordLampAllocation(createLampTendencyState(), {
      industry: 40, order: 0, workshop: 0, commons: 0, livelihood: 60
    });
    const progress = { ...createStoryProgress(), choices: { E41: "B" } };
    const result = evaluateNarrativeEnding(
      initialGameState,
      "consortium",
      createFactionArcState(initialGameState, "consortium"),
      lamps,
      progress,
      narrativeContext()
    );
    expect(result.kind).toBe("fragments");
    expect(result.tone).toBe("continuity");
  });

  it("turns the strongest long-term lamp direction into a social form", () => {
    const industryLamps = recordLampAllocation(createLampTendencyState(), {
      industry: 56, order: 11, workshop: 11, commons: 11, livelihood: 11
    });
    const commonsLamps = recordLampAllocation(createLampTendencyState(), {
      industry: 11, order: 11, workshop: 11, commons: 56, livelihood: 11
    });
    const progress = { ...createStoryProgress(), choices: { E41: "A" } };
    expect(evaluateNarrativeEnding(
      initialGameState,
      "consortium",
      { factionId: "consortium", lifeline: 80, liability: 10 },
      industryLamps,
      progress,
      narrativeContext()
    ).kind).toBe("compute-capital");
    expect(evaluateNarrativeEnding(
      initialGameState,
      "consortium",
      { factionId: "consortium", lifeline: 45, liability: 30 },
      commonsLamps,
      progress,
      narrativeContext()
    ).kind).toBe("open-compute");
  });

  it("lets policy legacy and social pressure redirect an otherwise balanced route", () => {
    const base = narrativeContext();
    const policyState = applyPolicyChoice(base.policyState, "SOCIALIST-H1", "A", 2);
    const result = evaluateNarrativeEnding(
      initialGameState,
      "socialist_power",
      { factionId: "socialist_power", lifeline: 70, liability: 25 },
      balancedLamps,
      { ...createStoryProgress(), choices: { E41: "A" } },
      {
        ...base,
        policyState,
        pressureState: {
          ...base.pressureState,
          pressures: { ...base.pressureState.pressures, order: 50 }
        },
        eventDecisions: {
          records: [{
            turn: 4,
            eventId: "dynamic-capacity-debt",
            optionId: "ration-capacity",
            origin: "dynamic"
          }]
        },
        resolvedEventIds: ["dynamic-capacity-debt"]
      }
    );
    expect(result.kind).toBe("public-ai");
    expect(result.factors).toContain("动态危机处理：协作 1 / 强制 0");
  });

  it("lets repeated coercive crisis responses push society toward fragmentation", () => {
    const base = narrativeContext();
    const result = evaluateNarrativeEnding(
      initialGameState,
      "sovereign",
      { factionId: "sovereign", lifeline: 70, liability: 40 },
      balancedLamps,
      { ...createStoryProgress(), choices: { E41: "B" } },
      {
        ...base,
        eventDecisions: {
          records: [
            { turn: 3, eventId: "dynamic-labor-rupture", optionId: "enforce-output-quota", origin: "dynamic" },
            { turn: 5, eventId: "dynamic-trust-blackout", optionId: "centralize-message", origin: "dynamic" }
          ]
        }
      }
    );

    expect(result.kind).toBe("fragments");
    expect(result.factors).toContain("动态危机处理：协作 0 / 强制 2");
  });
});
