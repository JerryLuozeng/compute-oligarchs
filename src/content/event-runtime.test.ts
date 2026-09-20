import { describe, expect, it } from "vitest";
import { initialGameState } from "@/core/models/initial-state";
import {
  createEventDecisionState,
  findTriggeredEvent,
  isEventDecisionState,
  recordEventDecision,
  runtimeGameEvents
} from "./event-runtime";

describe("event runtime", () => {
  it("matches every configured condition before returning one event", () => {
    const event = findTriggeredEvent(initialGameState, new Set(), "consortium");

    expect(event?.id).toBe("blackout-auction");
    expect(event?.trigger.matches(initialGameState)).toBe(true);
  });

  it("skips resolved events and still returns at most one match", () => {
    const event = findTriggeredEvent(initialGameState, new Set(["blackout-auction"]), "consortium");

    expect(event).toBeUndefined();
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

  it("does not expose another faction's crisis as the player's decision", () => {
    expect(findTriggeredEvent(initialGameState, new Set(), "independent_labs")?.id).toBe("rentier-protocol");
    expect(findTriggeredEvent(initialGameState, new Set(), "labor_union")).toBeUndefined();
  });

  it("records the selected runtime event option once", () => {
    const event = runtimeGameEvents[0];
    const selectedOption = event.options[0];
    const recorded = recordEventDecision(createEventDecisionState(), event, selectedOption, 3);
    const duplicate = recordEventDecision(recorded, event, event.options[1], 3);

    expect(recorded.records[0]).toMatchObject({
      turn: 3,
      eventId: event.id,
      optionId: selectedOption.id,
      origin: "configured"
    });
    expect(duplicate).toBe(recorded);
    expect(isEventDecisionState(recorded)).toBe(true);
    expect(isEventDecisionState({ records: [{ ...recorded.records[0], origin: "unknown" }] })).toBe(false);
  });
});
