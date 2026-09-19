import { describe, expect, it } from "vitest";
import type { FactionId } from "@/core/models/ids";
import {
  createStrategyAllocation,
  simulateNarrativeRun,
  type AllocationStrategy,
  type ChoiceStrategy
} from "./balance-simulation";
import { getAllocationTotal } from "./lamps";

const factionIds: readonly FactionId[] = [
  "consortium", "sovereign", "labor_union", "independent_labs", "socialist_power"
];
const allocationStrategies: readonly AllocationStrategy[] = ["single-focus", "balanced", "dual-focus"];
const choiceStrategies: readonly ChoiceStrategy[] = ["cooperative", "assertive", "alternating"];

const results = factionIds.flatMap((factionId) =>
  allocationStrategies.flatMap((allocationStrategy) =>
    choiceStrategies.map((choiceStrategy) =>
      simulateNarrativeRun(factionId, allocationStrategy, choiceStrategy)
    )
  )
);

describe("narrative balance simulation", () => {
  it("keeps all strategy allocations valid", () => {
    for (const factionId of factionIds) {
      for (const strategy of allocationStrategies) {
        expect(getAllocationTotal(createStrategyAllocation(factionId, strategy))).toBe(100);
      }
    }
  });

  it("completes all 45 faction, allocation and choice combinations", () => {
    expect(results).toHaveLength(45);
    expect(results.every((result) => result.eventCount > 0)).toBe(true);
  });

  it("keeps a full run inside the target 35 to 50 minute reading window", () => {
    for (const result of results) {
      expect(result.estimatedMinutes[0]).toBeGreaterThanOrEqual(35);
      expect(result.estimatedMinutes[1]).toBeLessThanOrEqual(50);
    }
  });

  it("gives every faction more than one reachable ending and no forced tone", () => {
    for (const factionId of factionIds) {
      const factionResults = results.filter((result) => result.factionId === factionId);
      const endings = new Set(factionResults.map((result) => result.ending));
      expect(endings.size).toBeGreaterThanOrEqual(3);
      expect(factionResults.some((result) => result.ending === "fragments")).toBe(true);
      expect(factionResults.some((result) => result.ending !== "fragments")).toBe(true);
    }
  });

  it("makes lamp allocation visible through reactive events", () => {
    for (const factionId of factionIds) {
      const focused = results.find((result) =>
        result.factionId === factionId
        && result.allocationStrategy === "single-focus"
        && result.choiceStrategy === "cooperative"
      );
      expect(focused?.reactiveEventCount).toBeGreaterThanOrEqual(4);
    }
  });
});
