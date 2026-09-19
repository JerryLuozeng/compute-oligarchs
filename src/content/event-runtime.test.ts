import { describe, expect, it } from "vitest";
import { initialGameState } from "@/core/models/initial-state";
import { findTriggeredEvent, runtimeGameEvents } from "./event-runtime";

describe("event runtime", () => {
  it("matches every configured condition before returning one event", () => {
    const event = findTriggeredEvent(initialGameState, new Set());

    expect(event?.id).toBe("blackout-auction");
    expect(event?.trigger.matches(initialGameState)).toBe(true);
  });

  it("skips resolved events and still returns at most one match", () => {
    const event = findTriggeredEvent(initialGameState, new Set(["blackout-auction"]));

    expect(event?.id).toBe("rentier-protocol");
  });

  it("applies option effects without mutating the current state", () => {
    const event = runtimeGameEvents.find((candidate) => candidate.id === "blackout-auction");
    const option = event?.options.find((candidate) => candidate.id === "requisition-clusters");

    expect(option).toBeDefined();
    const nextState = option?.effect(initialGameState);
    const consortiumBefore = initialGameState.factions.find((faction) => faction.id === "consortium");
    const consortiumAfter = nextState?.factions.find((faction) => faction.id === "consortium");

    expect(nextState).not.toBe(initialGameState);
    expect(consortiumAfter?.resources.compute).toBe((consortiumBefore?.resources.compute ?? 0) - 18);
    expect(nextState?.globalStability).toBe(initialGameState.globalStability + 8);
    expect(initialGameState.globalStability).toBe(51.3);
  });

  it("exposes a pure effect function on every decision", () => {
    for (const event of runtimeGameEvents) {
      expect(event.options).toHaveLength(2);
      expect(event.options.every((option) => typeof option.effect === "function")).toBe(true);
    }
  });
});
