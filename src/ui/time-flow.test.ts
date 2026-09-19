import { describe, expect, it } from "vitest";
import type { StoryChoice } from "@/content/story-events";
import { getDecisionImpacts, getTimeCoordinate } from "./time-flow";

describe("time flow", () => {
  it("converts elapsed quarters into a forward-moving calendar", () => {
    expect(getTimeCoordinate(0)).toMatchObject({ year: 41, quarter: 1, compactLabel: "CE 41 / Q1" });
    expect(getTimeCoordinate(3).label).toBe("算力历 41 年 · 第四季度");
    expect(getTimeCoordinate(4)).toMatchObject({ year: 42, quarter: 1, compactLabel: "CE 42 / Q1" });
  });

  it("describes route and advisor consequences with player-facing tones", () => {
    const choice: StoryChoice = {
      id: "A",
      text: "推进",
      outcome: "已经发生。",
      arcChange: { lifeline: 6, liability: 9 },
      advisorId: "park"
    };

    expect(getDecisionImpacts(choice, { lifeline: "控制力", liability: "裂缝" })).toEqual([
      { id: "lifeline", label: "控制力", value: "+6", tone: "positive" },
      { id: "liability", label: "裂缝", value: "+9", tone: "negative" },
      { id: "advisor-park", label: "顾问信任", value: "+10", tone: "positive" }
    ]);
  });

  it("shows a timeline consequence when a choice has no immediate numeric change", () => {
    const choice: StoryChoice = { id: "B", text: "等待", outcome: "消息被记下。" };
    expect(getDecisionImpacts(choice, { lifeline: "人心", liability: "暴露" })).toEqual([
      { id: "timeline", label: "后续剧情", value: "路径已改变", tone: "neutral" }
    ]);
  });
});
