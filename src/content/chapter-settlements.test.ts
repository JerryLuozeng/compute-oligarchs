import { describe, expect, it } from "vitest";
import { createLampTendencyState, recordLampAllocation } from "./lamps";
import { createChapterSettlement } from "./chapter-settlements";

describe("chapter settlements", () => {
  it("summarizes the brightest and neglected lamps", () => {
    const lamps = recordLampAllocation(createLampTendencyState(), {
      industry: 40, order: 20, workshop: 20, commons: 20, livelihood: 0
    });
    const settlement = createChapterSettlement(1, lamps);

    expect(settlement.chapter).toBe("第一章");
    expect(settlement.summary).toContain("产业之灯");
    expect(settlement.summary).toContain("民生之灯");
    expect(settlement.statuses).toHaveLength(5);
  });

  it("keeps a balanced chapter readable without inventing a neglected lamp", () => {
    const settlement = createChapterSettlement(0, recordLampAllocation(createLampTendencyState(), {
      industry: 20, order: 20, workshop: 20, commons: 20, livelihood: 20
    }));

    expect(settlement.brightest).toContain("没有一盏灯持续最亮");
    expect(settlement.neglected).toContain("没有一盏灯持续被冷落");
  });
});
