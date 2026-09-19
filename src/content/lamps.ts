import type { FactionId } from "@/core/models/ids";

export type LampId = "industry" | "order" | "workshop" | "commons" | "livelihood";

export type LampAllocation = Record<LampId, number>;

export type LampStatus = "brightest" | "steady" | "neglected";

export interface LampDefinition {
  id: LampId;
  factionId: FactionId;
  name: string;
  shortName: string;
  description: string;
  tone: "lime" | "orange" | "cyan" | "pink" | "red";
}

export interface LampTendencyState {
  current: LampAllocation;
  chapterTotals: LampAllocation;
  globalTotals: LampAllocation;
  chapterAllocationCount: number;
  allocationCount: number;
}

export const lampDefinitions: readonly LampDefinition[] = [
  {
    id: "industry",
    factionId: "consortium",
    name: "产业之灯",
    shortName: "产业",
    description: "工厂、订单、商店的生意。灯亮，钱来得快。",
    tone: "lime"
  },
  {
    id: "order",
    factionId: "sovereign",
    name: "秩序之灯",
    shortName: "秩序",
    description: "听证、审计、规则。灯亮，事情慢一点，但更讲理。",
    tone: "orange"
  },
  {
    id: "workshop",
    factionId: "labor_union",
    name: "工棚之灯",
    shortName: "工棚",
    description: "工人的互助、夜班、地下库。灯亮，人心暖，也容易被盯上。",
    tone: "cyan"
  },
  {
    id: "commons",
    factionId: "independent_labs",
    name: "公开之灯",
    shortName: "公开",
    description: "开源、教育、共享。灯亮，点子多，也容易被滥用。",
    tone: "pink"
  },
  {
    id: "livelihood",
    factionId: "socialist_power",
    name: "民生之灯",
    shortName: "民生",
    description: "医院、学校、养老。灯亮，日子稳，但花钱慢。",
    tone: "red"
  }
] as const;

export const lampStatusLabels: Record<LampStatus, string> = {
  brightest: "灯火通明",
  steady: "灯光尚稳",
  neglected: "灯影摇晃"
};

export const LAMP_ALLOCATION_TOTAL = 100;

const lampIds = lampDefinitions.map((lamp) => lamp.id);

const createEmptyAllocation = (): LampAllocation => ({
  industry: 0,
  order: 0,
  workshop: 0,
  commons: 0,
  livelihood: 0
});

export const createEqualLampAllocation = (): LampAllocation => ({
  industry: 20,
  order: 20,
  workshop: 20,
  commons: 20,
  livelihood: 20
});

export const createLampTendencyState = (): LampTendencyState => ({
  current: createEqualLampAllocation(),
  chapterTotals: createEmptyAllocation(),
  globalTotals: createEmptyAllocation(),
  chapterAllocationCount: 0,
  allocationCount: 0
});

export const getAllocationTotal = (allocation: LampAllocation): number =>
  lampIds.reduce((total, lampId) => total + allocation[lampId], 0);

export const isValidLampAllocation = (allocation: LampAllocation): boolean =>
  getAllocationTotal(allocation) === LAMP_ALLOCATION_TOTAL
  && lampIds.every((lampId) => Number.isInteger(allocation[lampId]) && allocation[lampId] >= 0);

const addAllocation = (
  totals: LampAllocation,
  allocation: LampAllocation
): LampAllocation => lampIds.reduce<LampAllocation>((nextTotals, lampId) => ({
  ...nextTotals,
  [lampId]: totals[lampId] + allocation[lampId]
}), createEmptyAllocation());

export const recordLampAllocation = (
  state: LampTendencyState,
  allocation: LampAllocation
): LampTendencyState => {
  if (!isValidLampAllocation(allocation)) return state;

  return {
    current: { ...allocation },
    chapterTotals: addAllocation(state.chapterTotals, allocation),
    globalTotals: addAllocation(state.globalTotals, allocation),
    chapterAllocationCount: state.chapterAllocationCount + 1,
    allocationCount: state.allocationCount + 1
  };
};

export const beginLampChapter = (state: LampTendencyState): LampTendencyState => ({
  ...state,
  chapterTotals: createEmptyAllocation(),
  chapterAllocationCount: 0
});

export const getLampShare = (totals: LampAllocation, lampId: LampId): number => {
  const total = getAllocationTotal(totals);
  return total === 0 ? 0 : totals[lampId] / total * 100;
};

export const getLampStatus = (totals: LampAllocation, lampId: LampId): LampStatus => {
  if (getAllocationTotal(totals) === 0) return "steady";

  const share = getLampShare(totals, lampId);
  const highestShare = Math.max(...lampIds.map((id) => getLampShare(totals, id)));

  if (share >= 25 && share === highestShare) return "brightest";
  if (share <= 10) return "neglected";
  return "steady";
};
