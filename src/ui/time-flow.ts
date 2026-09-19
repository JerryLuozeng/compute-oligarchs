import type { FactionRoute } from "@/content/faction-routes";
import type { StoryChoice } from "@/content/story-events";

const BASE_COMPUTE_YEAR = 41;
const quarterNames = ["第一季度", "第二季度", "第三季度", "第四季度"] as const;

export interface TimeCoordinate {
  year: number;
  quarter: 1 | 2 | 3 | 4;
  label: string;
  compactLabel: string;
}

export type DecisionImpactTone = "positive" | "negative" | "neutral";

export interface DecisionImpact {
  id: string;
  label: string;
  value: string;
  tone: DecisionImpactTone;
}

export function getTimeCoordinate(elapsedQuarters: number): TimeCoordinate {
  const safeQuarters = Math.max(0, Math.floor(elapsedQuarters));
  const quarterIndex = safeQuarters % 4;
  const year = BASE_COMPUTE_YEAR + Math.floor(safeQuarters / 4);
  const quarter = (quarterIndex + 1) as TimeCoordinate["quarter"];

  return {
    year,
    quarter,
    label: `算力历 ${year} 年 · ${quarterNames[quarterIndex]}`,
    compactLabel: `CE ${year} / Q${quarter}`
  };
}

const signed = (value: number): string => `${value > 0 ? "+" : ""}${value}`;

export function getDecisionImpacts(
  choice: StoryChoice,
  route: Pick<FactionRoute, "lifeline" | "liability">
): readonly DecisionImpact[] {
  const impacts: DecisionImpact[] = [];
  const lifeline = choice.arcChange?.lifeline;
  const liability = choice.arcChange?.liability;

  if (lifeline !== undefined && lifeline !== 0) {
    impacts.push({
      id: "lifeline",
      label: route.lifeline,
      value: signed(lifeline),
      tone: lifeline > 0 ? "positive" : "negative"
    });
  }
  if (liability !== undefined && liability !== 0) {
    impacts.push({
      id: "liability",
      label: route.liability,
      value: signed(liability),
      tone: liability < 0 ? "positive" : "negative"
    });
  }
  if (choice.advisorId !== undefined) {
    impacts.push({
      id: `advisor-${choice.advisorId}`,
      label: "顾问信任",
      value: "+10",
      tone: "positive"
    });
  }

  return impacts.length > 0 ? impacts : [{
    id: "timeline",
    label: "后续剧情",
    value: "路径已改变",
    tone: "neutral"
  }];
}
