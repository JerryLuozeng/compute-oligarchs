import { describe, expect, it } from "vitest";
import {
  beginLampChapter,
  createEqualLampAllocation,
  createLampTendencyState,
  getAllocationTotal,
  getLampShare,
  getLampStatus,
  isValidLampAllocation,
  recordLampAllocation
} from "./lamps";

describe("lamp tendencies", () => {
  it("starts with an equal valid draft without recorded history", () => {
    const state = createLampTendencyState();

    expect(getAllocationTotal(state.current)).toBe(100);
    expect(state.allocationCount).toBe(0);
    expect(getLampStatus(state.chapterTotals, "industry")).toBe("steady");
  });

  it("records chapter and global shares without mutating the prior state", () => {
    const state = createLampTendencyState();
    const allocation = {
      ...createEqualLampAllocation(),
      industry: 30,
      livelihood: 10
    };
    const nextState = recordLampAllocation(state, allocation);

    expect(nextState).not.toBe(state);
    expect(state.allocationCount).toBe(0);
    expect(getLampShare(nextState.chapterTotals, "industry")).toBe(30);
    expect(getLampStatus(nextState.chapterTotals, "industry")).toBe("brightest");
    expect(getLampStatus(nextState.chapterTotals, "livelihood")).toBe("neglected");
  });

  it("rejects incomplete allocations", () => {
    const state = createLampTendencyState();
    const invalid = { ...createEqualLampAllocation(), industry: 15 };

    expect(isValidLampAllocation(invalid)).toBe(false);
    expect(recordLampAllocation(state, invalid)).toBe(state);
  });

  it("rebalances chapter tendencies after a second allocation", () => {
    const first = recordLampAllocation(createLampTendencyState(), {
      ...createEqualLampAllocation(),
      industry: 40,
      livelihood: 0
    });
    const second = recordLampAllocation(first, {
      ...createEqualLampAllocation(),
      industry: 10,
      livelihood: 30
    });

    expect(getLampShare(second.chapterTotals, "industry")).toBe(25);
    expect(getLampShare(second.chapterTotals, "livelihood")).toBe(15);
    expect(getLampStatus(second.chapterTotals, "livelihood")).toBe("steady");
    expect(second.chapterAllocationCount).toBe(2);
  });

  it("resets chapter history while preserving global tendencies", () => {
    const recorded = recordLampAllocation(createLampTendencyState(), createEqualLampAllocation());
    const nextChapter = beginLampChapter(recorded);

    expect(nextChapter.chapterAllocationCount).toBe(0);
    expect(getAllocationTotal(nextChapter.chapterTotals)).toBe(0);
    expect(getAllocationTotal(nextChapter.globalTotals)).toBe(100);
  });
});
