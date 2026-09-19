import { describe, expect, it } from "vitest";
import { initialGameState } from "@/core/models/initial-state";
import type { FactionId } from "@/core/models/ids";
import { applyFactionArcChange, createFactionArcState, factionRoutes } from "./faction-routes";

const factionIds: readonly FactionId[] = [
  "consortium", "sovereign", "labor_union", "independent_labs", "socialist_power"
];

describe("faction routes", () => {
  it("has a distinct opening, lifeline and liability for every faction", () => {
    for (const factionId of factionIds) {
      const route = factionRoutes[factionId];
      expect(route.opening).toHaveLength(3);
      expect(route.lifeline).not.toBe(route.liability);
    }
    expect(new Set(factionIds.map((id) => factionRoutes[id].title)).size).toBe(5);
  });

  it("uses existing initial values without changing GameState", () => {
    const before = structuredClone(initialGameState);
    const values = factionIds.map((id) => createFactionArcState(initialGameState, id).lifeline);

    expect(values).toEqual([82, 65, 46, 58, 62]);
    expect(initialGameState).toEqual(before);
    expect(factionIds.map((id) => createFactionArcState(initialGameState, id).liability)).toEqual([0, 0, 0, 0, 0]);
  });

  it("applies narrative choices immutably within existing resource bounds", () => {
    const initial = createFactionArcState(initialGameState, "labor_union");
    const changed = applyFactionArcChange(initial, { lifeline: 12, liability: 120 });

    expect(changed).toEqual({ factionId: "labor_union", lifeline: 58, liability: 100 });
    expect(initial).toEqual({ factionId: "labor_union", lifeline: 46, liability: 0 });
    expect(applyFactionArcChange(changed, { lifeline: -100, liability: -200 })).toEqual({
      factionId: "labor_union", lifeline: 0, liability: 0
    });
  });
});
