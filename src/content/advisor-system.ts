import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import type { StrategicActionState } from "@/core/systems/strategic-actions";
import type { InterestPressureState, InterestPressureLevel } from "./interest-pressure";
import { getInterestPressureLevel } from "./interest-pressure";
import type { LampId } from "./lamps";
import { hasPolicyTag, type PolicyLegacyState } from "./policy-legacies";
import {
  getFactionAdvisors,
  type AdvisorId,
  type AdvisorProfile,
  type AdvisorTrustState
} from "./faction-story";
import type { StoryChoice, StoryEvent } from "./story-events";

export type AdvisorSignal = "open" | "partial" | "model-mediated";

export interface AdvisorDisposition {
  interest: LampId;
  stance: string;
  bias: "cautious" | "expansionist" | "institutional" | "participatory";
  preferredTags: readonly string[];
  opposedTags: readonly string[];
}

export interface AdvisorRelationshipRecord {
  turn: number;
  eventId: string;
  advisorId: AdvisorId;
  delta: number;
  reason: "advice-followed" | "advice-rejected";
}

export interface AdvisorRelationshipState {
  history: readonly AdvisorRelationshipRecord[];
}

export interface AdvisorBriefing {
  advisor: AdvisorProfile;
  interest: LampId;
  stance: string;
  signal: AdvisorSignal;
  message: string;
  evidence?: string;
}

export interface AdvisorDecisionResult {
  trust: AdvisorTrustState;
  relationships: AdvisorRelationshipState;
}

export const advisorDispositions: Readonly<Record<AdvisorId, AdvisorDisposition>> = {
  aditya: {
    interest: "industry",
    stance: "先保住生产连续性，再谈扩张速度。",
    bias: "cautious",
    preferredTags: ["safety-first"],
    opposedTags: ["growth-first"]
  },
  park: {
    interest: "industry",
    stance: "市场信心和扩张窗口不能等待。",
    bias: "expansionist",
    preferredTags: ["growth-first"],
    opposedTags: ["growth-restrained"]
  },
  manuela: {
    interest: "order",
    stance: "规则必须让普通人看见并参与。",
    bias: "participatory",
    preferredTags: ["public-legitimacy"],
    opposedTags: ["corporate-reliance"]
  },
  osman: {
    interest: "commons",
    stance: "没有证据链的承诺不能写进制度。",
    bias: "cautious",
    preferredTags: ["audit-first", "provenance-required"],
    opposedTags: ["corporate-reliance"]
  },
  marta: {
    interest: "workshop",
    stance: "先确认一线劳动者是否真的愿意承担。",
    bias: "participatory",
    preferredTags: ["labor-voice", "collective-accountability"],
    opposedTags: ["conflict-hidden"]
  },
  tanya: {
    interest: "workshop",
    stance: "窗口很短，组织必须先行动起来。",
    bias: "expansionist",
    preferredTags: ["informal-solidarity"],
    opposedTags: ["access-deferred"]
  },
  sawada: {
    interest: "commons",
    stance: "来源、用途和失败方式都必须能够复核。",
    bias: "cautious",
    preferredTags: ["audit-first", "provenance-required"],
    opposedTags: ["resource-first"]
  },
  adeola: {
    interest: "commons",
    stance: "公开本身就是让社区参与纠错的方法。",
    bias: "participatory",
    preferredTags: ["public-legitimacy", "resource-first"],
    opposedTags: ["conflict-hidden"]
  },
  lu: {
    interest: "order",
    stance: "长期系统必须经得起流程和维护周期。",
    bias: "institutional",
    preferredTags: ["infrastructure-first"],
    opposedTags: ["infrastructure-debt"]
  },
  su: {
    interest: "livelihood",
    stance: "先让服务抵达现场，再从现场修正方案。",
    bias: "participatory",
    preferredTags: ["access-first"],
    opposedTags: ["access-deferred"]
  }
};

const interestNames: Record<LampId, string> = {
  industry: "产业",
  order: "秩序",
  workshop: "工棚",
  commons: "公开",
  livelihood: "民生"
};

const pressureDescriptions: Record<InterestPressureLevel, string> = {
  stable: "目前仍在可控范围",
  strained: "已经出现持续压力",
  crisis: "正在进入结构性危机",
  breaking: "接近不可逆的断裂"
};

const signalLabels: Record<AdvisorSignal, string> = {
  open: "完整陈述",
  partial: "保留意见",
  "model-mediated": "模型转述"
};

export const getAdvisorSignalLabel = (signal: AdvisorSignal): string => signalLabels[signal];

export const createAdvisorRelationshipState = (): AdvisorRelationshipState => ({ history: [] });

const deterministicDistortion = (advisorId: AdvisorId, eventId: string, drift: number): boolean => {
  if (drift < 20) return false;
  const hash = [...`${advisorId}:${eventId}`].reduce((total, character) => total + character.charCodeAt(0), 0);
  return hash % 100 < Math.min(70, drift);
};

const latestCause = (state: InterestPressureState, interest: LampId): string | undefined =>
  [...state.history].reverse().find((record) => record.lampId === interest)?.causes.at(-1);

const relationshipSignal = (trust: number, distorted: boolean): AdvisorSignal => {
  if (distorted) return "model-mediated";
  return trust < 0 ? "partial" : "open";
};

const policyAlignment = (policies: PolicyLegacyState, disposition: AdvisorDisposition): string | undefined => {
  const preferred = disposition.preferredTags.find((tag) => hasPolicyTag(policies, tag));
  if (preferred !== undefined) return "这与我们此前留下的承诺方向一致。";
  const opposed = disposition.opposedTags.find((tag) => hasPolicyTag(policies, tag));
  if (opposed !== undefined) return "这会再次触碰我们过去没有解决的承诺。";
  return undefined;
};

const driftInterpretation = (disposition: AdvisorDisposition, distorted: boolean): string => {
  if (!distorted) return disposition.stance;
  if (disposition.bias === "expansionist") return "模型把异常判断为短期噪声，我认为不必因此停下当前计划。";
  if (disposition.bias === "institutional") return "模型报告存在缺页，在补齐流程前我不会给出肯定结论。";
  if (disposition.bias === "participatory") return "模型无法解释现场反馈，我更愿意相信仍在系统外的人。";
  return "当前模型读数可能已经偏离现实，最安全的结论是暂不相信任何单一指标。";
};

export const createAdvisorBriefings = (
  event: StoryEvent,
  factionId: FactionId,
  trust: AdvisorTrustState,
  relationships: AdvisorRelationshipState,
  pressureState: InterestPressureState,
  gameState: GameState,
  policies: PolicyLegacyState,
  actions: StrategicActionState
): readonly AdvisorBriefing[] => getFactionAdvisors(factionId).map((advisor) => {
  const disposition = advisorDispositions[advisor.id];
  const pressure = pressureState.pressures[disposition.interest];
  const level = getInterestPressureLevel(pressure);
  const distorted = deterministicDistortion(advisor.id, event.id, gameState.globalModelDrift);
  const signal = relationshipSignal(trust[advisor.id], distorted);
  const alignment = policyAlignment(policies, disposition);
  const priorRejection = [...relationships.history].reverse()
    .find((record) => record.advisorId === advisor.id && record.reason === "advice-rejected");
  const relationshipNote = priorRejection === undefined
    ? undefined
    : "上一次我的意见被放在了一边，这次我只说能够确认的部分。";
  const investigated = actions.investigatedRegionIds.length > 0;
  const cause = latestCause(pressureState, disposition.interest);
  const evidence = trust[advisor.id] >= 20 && cause !== undefined
    ? `内部记录指向：${cause}。`
    : investigated
      ? `调查记录覆盖 ${actions.investigatedRegionIds.length} 个基础设施区域，但尚不足以排除利益偏差。`
      : undefined;
  const message = [
    `${interestNames[disposition.interest]}方向${pressureDescriptions[level]}。`,
    driftInterpretation(disposition, distorted),
    alignment,
    signal === "partial" ? relationshipNote : undefined
  ].filter((part): part is string => part !== undefined).join(" ");
  return { advisor, interest: disposition.interest, stance: disposition.stance, signal, message, evidence };
});

const clampTrust = (value: number): number => Math.min(100, Math.max(-100, value));

export const resolveAdvisorDecision = (
  trust: AdvisorTrustState,
  relationships: AdvisorRelationshipState,
  factionId: FactionId,
  event: StoryEvent,
  choice: StoryChoice,
  turn: number
): AdvisorDecisionResult => {
  if (choice.advisorId === undefined) return { trust, relationships };
  const factionAdvisors = getFactionAdvisors(factionId);
  const records: AdvisorRelationshipRecord[] = [];
  const nextTrust = { ...trust };
  for (const advisor of factionAdvisors) {
    const followed = advisor.id === choice.advisorId;
    const delta = followed ? 10 : -4;
    nextTrust[advisor.id] = clampTrust(nextTrust[advisor.id] + delta);
    records.push({
      turn,
      eventId: event.id,
      advisorId: advisor.id,
      delta,
      reason: followed ? "advice-followed" : "advice-rejected"
    });
  }
  return { trust: nextTrust, relationships: { history: [...relationships.history, ...records] } };
};

export const isAdvisorRelationshipState = (value: unknown): value is AdvisorRelationshipState => {
  if (typeof value !== "object" || value === null || !("history" in value) || !Array.isArray(value.history)) {
    return false;
  }
  return value.history.every((record) => {
    if (typeof record !== "object" || record === null) return false;
    const candidate = record as Record<string, unknown>;
    return Number.isInteger(candidate.turn)
      && typeof candidate.eventId === "string"
      && typeof candidate.advisorId === "string"
      && candidate.advisorId in advisorDispositions
      && typeof candidate.delta === "number"
      && (candidate.reason === "advice-followed" || candidate.reason === "advice-rejected");
  });
};
