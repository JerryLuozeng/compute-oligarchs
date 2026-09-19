import { describe, expect, it } from "vitest";
import {
  applyPolicyChoice,
  createPolicyLegacyState,
  getActivePolicyLegacies,
  getPolicyLegacyEcho,
  hasPolicyTag,
  isPolicyLegacyState
} from "./policy-legacies";

describe("policy legacies", () => {
  it("records a key choice as an immutable active commitment", () => {
    const initial = createPolicyLegacyState();
    const next = applyPolicyChoice(initial, "CONSORTIUM-T1", "A", 3);

    expect(initial.records).toEqual([]);
    expect(next.records).toEqual([expect.objectContaining({
      id: "consortium-deadline-first",
      status: "active",
      createdAtTurn: 3
    })]);
    expect(hasPolicyTag(next, "growth-first")).toBe(true);
  });

  it("does not duplicate a commitment when a choice is replayed", () => {
    const once = applyPolicyChoice(createPolicyLegacyState(), "PRISM-P1", "B", 1);
    const twice = applyPolicyChoice(once, "PRISM-P1", "B", 2);

    expect(twice).toBe(once);
    expect(twice.records).toHaveLength(1);
  });

  it("lets a later decision honor or break an active commitment", () => {
    const promised = applyPolicyChoice(createPolicyLegacyState(), "SOVEREIGN-C1", "A", 2);
    const resolved = applyPolicyChoice(promised, "SOVEREIGN-C3", "B", 9);

    expect(resolved.records[0]).toMatchObject({ status: "broken", updatedAtTurn: 9 });
    expect(hasPolicyTag(resolved, "public-legitimacy")).toBe(false);
    expect(hasPolicyTag(resolved, "public-legitimacy", ["broken"])).toBe(true);
    expect(getActivePolicyLegacies(resolved)).toEqual([]);
  });

  it("exposes active history as context for later faction events", () => {
    const state = applyPolicyChoice(createPolicyLegacyState(), "LABOR-S1", "A", 4);
    expect(getPolicyLegacyEcho(state, "LABOR-S2")?.title).toBe("共同问责");
    expect(getPolicyLegacyEcho(state, "CONSORTIUM-T2")).toBeUndefined();
  });

  it("validates serialized state without accepting unknown legacy ids", () => {
    const state = applyPolicyChoice(createPolicyLegacyState(), "SOCIALIST-H1", "B", 1);
    expect(isPolicyLegacyState(state)).toBe(true);
    expect(isPolicyLegacyState({ records: [{ ...state.records[0], id: "unknown" }] })).toBe(false);
  });
});
