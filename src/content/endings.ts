import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import type { StrategicActionState } from "@/core/systems/strategic-actions";
import { advisorDispositions, type AdvisorRelationshipState } from "./advisor-system";
import type { EventDecisionState } from "./event-runtime";
import { getFactionAdvisors, type AdvisorTrustState } from "./faction-story";
import type { InterestPressureState } from "./interest-pressure";
import { getLampShare, getLampStatus, type LampId, type LampTendencyState } from "./lamps";
import { hasPolicyTag, type PolicyLegacyState } from "./policy-legacies";
import type { FactionArcState } from "./faction-routes";
import type { StoryProgress } from "./story-events";

export const endingThresholds = {
  defeat: {
    maximumGlobalModelDrift: 80,
    minimumFactionStability: 0
  }
} as const;

export type EndingKind =
  | "victory"
  | "faction-collapse"
  | "system-collapse"
  | "route-success"
  | "route-compromise"
  | "route-turning"
  | "shared-network"
  | "fragments"
  | "compute-capital"
  | "centralized-ai"
  | "worker-data-common"
  | "open-compute"
  | "public-ai";

export interface EndingCopy {
  label: string;
  title: string;
  description: string;
  dispatch: string;
}

export interface EndingResult {
  kind: EndingKind;
  tone: "continuity" | "collapse";
  copy: EndingCopy;
  factors: readonly string[];
}

export const endingCopies: Record<EndingKind, EndingCopy> = {
  victory: {
    label: "PRODUCTION REORGANIZED",
    title: "共同生产仍在继续",
    description:
      "算力、数据与稳定的社会关系暂时达成平衡。没有奇点降临，也没有机器替人类作出决定；只有生产资料终于开始回应真实需要。",
    dispatch: "这不是技术胜利。下一季度仍需维护、劳动、分配与公开争论。"
  },
  "faction-collapse": {
    label: "FACTION INFRASTRUCTURE LOST",
    title: "组织结构已经失效",
    description:
      "玩家势力的稳定度归零。命令无法抵达节点，资源无法形成协作，曾经集中的力量重新散落进废墟。",
    dispatch: "没有机器发动反抗。崩塌来自无法继续维持的生产关系。"
  },
  "system-collapse": {
    label: "MODEL DRIFT CASCADE",
    title: "世界已经越过模型边界",
    description:
      "全局模型漂移达到系统崩溃阈值。陈旧数据继续复制陈旧判断，基础设施在错误的现实描述中停止协同。",
    dispatch: "模型没有背叛任何人。它只是太久没有得到真实世界的新鲜劳动。"
  },
  "route-success": {
    label: "FACTION ROUTE / STABLE",
    title: "一条路，暂时走通了",
    description: "你的势力守住了命脉，也没有把隐患推给下一班人。世界没有因此变得简单，但这条路线留下了可以继续工作的结构。",
    dispatch: "成功不是把别人的灯吹灭，而是让自己的灯在风里继续亮。"
  },
  "route-compromise": {
    label: "FACTION ROUTE / FRACTURE",
    title: "胜利留下了裂缝",
    description: "你的势力仍然站着，但高涨的隐患已经写进组织的日常。每一次效率、秩序或安全的选择，都有人替它支付了代价。",
    dispatch: "没有人能把被压下去的东西永远藏在报表下面。"
  },
  "route-turning": {
    label: "FACTION ROUTE / TURNING",
    title: "把方向交给了别人",
    description: "你没有沿着势力最熟悉的道路走到底。让利、公开与合作改变了路线，也让原本坚硬的边界出现了新的入口。",
    dispatch: "转向不是认输。它只是承认，另一盏灯也照得到这里。"
  },
  "shared-network": {
    label: "HIDDEN ENDING / COMMON NETWORK",
    title: "共用的网",
    description: "五张桌子被拼成了一张。它吵吵闹闹，效率不高，但每个人都有座位。窗外的塔轮流亮起，像一场缓慢而漫长的对话。",
    dispatch: "共同管理从来不安静，但它给劳动留下了可见的入口。"
  },
  fragments: {
    label: "HIDDEN ENDING / FRAGMENTS",
    title: "碎片",
    description: "每个人都守住了自己的阵地，也失去了对方的信任。世界分成了几块，每一块都在亮，但彼此看不见对方的灯。",
    dispatch: "分裂没有让任何一盏灯更自由，只让它们再也无法互相取暖。"
  },
  "compute-capital": {
    label: "SOCIAL FORM / COMPUTE CAPITAL",
    title: "算力资本社会",
    description: "扩张能力成为社会的首要尺度。新机架不断亮起，生产速度持续提高，数据劳动与公共服务则围绕算力所有者的需求重新排列。",
    dispatch: "系统活了下来。问题不再是谁能生产，而是谁有权决定生产为了什么。"
  },
  "centralized-ai": {
    label: "SOCIAL FORM / CENTRALIZED AI",
    title: "集中式 AI 社会",
    description: "统一规则压住了失序，各地区通过同一套模型与调度流程运转。风险更容易被集中处理，地方经验也更难穿过层层批复。",
    dispatch: "稳定来自协调，也来自服从。下一次偏差出现时，所有人仍会先等待中心给出答案。"
  },
  "worker-data-common": {
    label: "SOCIAL FORM / DATA COMMON",
    title: "数据劳动共同体",
    description: "数据生产者获得了谈判权与共同管理入口。训练数据不再被视为自然矿藏，但生产速度、组织成本和内部争论成为新的日常。",
    dispatch: "劳动终于被写进系统。谁来组织劳动、谁承担维护，仍然需要一遍遍讨论。"
  },
  "open-compute": {
    label: "SOCIAL FORM / OPEN COMPUTE",
    title: "开放计算社会",
    description: "模型、数据来源与失败记录被持续公开。创新从更多地方发生，系统也必须承受泄露、滥用与无人能够独占控制权的风险。",
    dispatch: "光照到了更多人，也照出了更多错误。公开没有消灭风险，只让风险无法继续躲藏。"
  },
  "public-ai": {
    label: "SOCIAL FORM / PUBLIC AI",
    title: "公共 AI 社会",
    description: "算力像交通与电力一样按公共需要铺开。医疗、教育和基层服务获得长期投入，扩张速度与地方自主则被放在更靠后的位置。",
    dispatch: "没有奇点，只有维护。公共系统的意义，在于明天仍有人愿意把下一座站修好。"
  }
};

const routeEndingCopies: Record<FactionId, Record<"success" | "compromise" | "turning", EndingCopy>> = {
  consortium: {
    success: { label: "CONSORTIUM / CONTROL", title: "穹顶合拢", description: "倒计时被兑现，掌声很响。你站在台上，看着台下一张张笑脸，觉得他们离你很远。", dispatch: "天穹赢得了效率，也必须继续回答信任去了哪里。" },
    compromise: { label: "CONSORTIUM / FRACTURE", title: "倒塌的塔", description: "内部的不满、事故与谎言同时爆发。天穹没有输给任何人，而是输给了自己压下去的东西。", dispatch: "裂缝从来不是突然出现，只是终于无法再被报表遮住。" },
    turning: { label: "CONSORTIUM / TURNING", title: "迟到的诚实", description: "天穹接受了监管，倒计时终于不再重置。有人说这是失败，也有人说，这是第一次真正的开始。", dispatch: "让利没有结束生产，它只是重新回答了生产为了谁。" }
  },
  sovereign: {
    success: { label: "SOVEREIGN / TRUST", title: "规则之网", description: "条例通过了，天穹低头了，也留了后手。世界没那么疯，也没那么亮。", dispatch: "奥斯曼把笔记本交给继任者：\"账，别断。\"" },
    compromise: { label: "SOVEREIGN / STALL", title: "有名无实", description: "文件很多，会议很多，掌声也很多。只是没人再看它们。", dispatch: "没有执行的规则，只是另一种安静的失信。" },
    turning: { label: "SOVEREIGN / TURNING", title: "迟来的牙齿", description: "你终于让寰盟咬了一口。有人说这是奇迹，有人说，这是灾难的开始。", dispatch: "联盟第一次留下了齿痕，也第一次必须承担它的重量。" }
  },
  labor_union: {
    success: { label: "LABOR / SOLIDARITY", title: "星火不熄", description: "地下库里灯一盏一盏亮起，数据工第一次在自己的网络上写下自己的名字。", dispatch: "路还很长，但他们有了自己的钥匙，也有了自己的开会时间。" },
    compromise: { label: "LABOR / EXPOSED", title: "火种散落", description: "联络点被端，人被冲散。但很多年后，某个货运站的夜校里，有人重新点起了一盏灯。", dispatch: "组织可以被打散，被记住的劳动不会凭空消失。" },
    turning: { label: "LABOR / TURNING", title: "孤军", description: "你们赢了几场仗，却没有人再愿意留下来。塔尼娅一个人站在空仓库里，说：\"我们忘了问大家怎么想。\"", dispatch: "行动走得太快时，也可能把要同行的人留在身后。" }
  },
  independent_labs: {
    success: { label: "PRISM / OPEN LIGHT", title: "公开的光", description: "所有人都能下载，所有人都能修改，所有人都得为自己写的东西负责。", dispatch: "这不是最安静的世界，却是最愿意互相解释的世界。" },
    compromise: { label: "PRISM / CAPTURED", title: "被收购的光", description: "棱镜社变得很有钱，也变得很沉默。仓库还在，白板还在，只是墙上的字换了。", dispatch: "开放没有被禁止，只是逐渐忘了自己为什么开放。" },
    turning: { label: "PRISM / FRACTURE", title: "碎裂的镜", description: "一次公开，引发了一次没人预料的事故。镜子碎了，每一块碎片都在闪，谁也不知道哪一块才是真的。", dispatch: "光照到了所有地方，也照出了无人准备承担的后果。" }
  },
  socialist_power: {
    success: { label: "PUBLIC / LONG LIGHT", title: "长夜里的灯", description: "算力像水电一样通到最远的村庄。有人说它不够快，有人说它不够自由，但山里的孩子说：\"我们有光了。\"", dispatch: "长期建设没有奇点，只有一座站接着一座站亮起来。" },
    compromise: { label: "PUBLIC / DELAY", title: "慢了半拍", description: "一切都在按流程走，只是世界已经不再等流程。你们赢得了安稳，却错过了一个窗口。", dispatch: "稳住今天不等于准备好了明天。" },
    turning: { label: "PUBLIC / OPEN DOOR", title: "开门", description: "赤衡的站点第一次接入了别人的网络。有人担心，有人期待。窗外的灯一盏一盏亮起来，不分谁的。", dispatch: "门打开以后，统筹不再只是内部的安排。" }
  }
};

export const evaluateEnding = (
  state: GameState,
  playerFactionId: FactionId
): EndingResult | null => {
  const playerFaction = state.factions.find((faction) => faction.id === playerFactionId);

  if (playerFaction === undefined) return null;

  if (state.globalModelDrift >= endingThresholds.defeat.maximumGlobalModelDrift) {
    return {
      kind: "system-collapse",
      tone: "collapse",
      copy: endingCopies["system-collapse"],
      factors: [`全局模型漂移达到 ${state.globalModelDrift.toFixed(1)}`]
    };
  }

  if (playerFaction.resources.stability <= endingThresholds.defeat.minimumFactionStability) {
    return {
      kind: "faction-collapse",
      tone: "collapse",
      copy: endingCopies["faction-collapse"],
      factors: ["玩家势力稳定度归零"]
    };
  }

  return null;
};

const hasNeglectedLamp = (lamps: LampTendencyState): boolean =>
  (Object.keys(lamps.globalTotals) as Array<keyof typeof lamps.globalTotals>)
    .some((lampId) => getLampStatus(lamps.globalTotals, lampId) === "neglected");

const neglectedLampCount = (lamps: LampTendencyState): number =>
  (Object.keys(lamps.globalTotals) as Array<keyof typeof lamps.globalTotals>)
    .filter((lampId) => getLampStatus(lamps.globalTotals, lampId) === "neglected").length;

export interface NarrativeEndingContext {
  policyState?: PolicyLegacyState;
  actionState?: StrategicActionState;
  pressureState?: InterestPressureState;
  advisorTrust?: AdvisorTrustState;
  advisorRelationships?: AdvisorRelationshipState;
  eventDecisions?: EventDecisionState;
  resolvedEventIds?: readonly string[];
}

const lampIds: readonly LampId[] = ["industry", "order", "workshop", "commons", "livelihood"];

const socialFormByLamp: Record<LampId, EndingKind> = {
  industry: "compute-capital",
  order: "centralized-ai",
  workshop: "worker-data-common",
  commons: "open-compute",
  livelihood: "public-ai"
};

const factionDirection: Record<FactionId, LampId> = {
  consortium: "industry",
  sovereign: "order",
  labor_union: "workshop",
  independent_labs: "commons",
  socialist_power: "livelihood"
};

const cooperativeCrisisOptions = new Set([
  "open-collective-bargaining",
  "ration-capacity",
  "publish-evidence-chain",
  "temporary-joint-command",
  "interrupt-model-loop"
]);

const directionLabels: Record<LampId, string> = {
  industry: "产业",
  order: "秩序",
  workshop: "工棚",
  commons: "公开",
  livelihood: "民生"
};

const policyDirectionBonus = (policies: PolicyLegacyState | undefined, lampId: LampId): number => {
  if (policies === undefined) return 0;
  const tags: Record<LampId, readonly string[]> = {
    industry: ["growth-first", "resource-first", "corporate-reliance"],
    order: ["safety-first", "infrastructure-first", "audit-first"],
    workshop: ["labor-voice", "collective-accountability", "informal-solidarity"],
    commons: ["public-legitimacy", "provenance-required", "audit-first"],
    livelihood: ["access-first", "infrastructure-first"]
  };
  return tags[lampId].filter((tag) => hasPolicyTag(policies, tag)).length * 8;
};

const advisorDirectionBonus = (
  factionId: FactionId,
  trust: AdvisorTrustState | undefined,
  lampId: LampId
): number => {
  if (trust === undefined) return 0;
  return getFactionAdvisors(factionId)
    .filter((advisor) => advisorDispositions[advisor.id].interest === lampId)
    .reduce((total, advisor) => total + trust[advisor.id] / 10, 0);
};

const dominantSocialDirection = (
  factionId: FactionId,
  lamps: LampTendencyState,
  context: NarrativeEndingContext
): { lampId: LampId; score: number } => lampIds
  .map((lampId) => {
    const pressure = context.pressureState?.pressures[lampId] ?? 0;
    const factionBonus = factionDirection[factionId] === lampId ? 8 : 0;
    return {
      lampId,
      score: getLampShare(lamps.globalTotals, lampId)
        + factionBonus
        + policyDirectionBonus(context.policyState, lampId)
        + advisorDirectionBonus(factionId, context.advisorTrust, lampId)
        - pressure / 4
    };
  })
  .sort((left, right) => right.score - left.score)[0] ?? { lampId: factionDirection[factionId], score: 0 };

const cooperationScore = (progress: StoryProgress, context: NarrativeEndingContext): number => {
  const cooperativeChoices = ["E02", "E13", "E17", "E21", "E24", "E34", "E41"]
    .filter((eventId) => progress.choices[eventId] === "A" || progress.choices[eventId] === "C").length;
  const negotiations = context.actionState?.history.filter((record) => record.type === "negotiate").length ?? 0;
  const cooperativeCrises = context.eventDecisions?.records.filter((record) =>
    record.origin === "dynamic" && cooperativeCrisisOptions.has(record.optionId)
  ).length ?? 0;
  return cooperativeChoices + Math.min(3, negotiations) + Math.min(2, cooperativeCrises);
};

const endingFactors = (
  factionId: FactionId,
  arc: FactionArcState,
  direction: { lampId: LampId; score: number },
  cooperation: number,
  context: NarrativeEndingContext
): readonly string[] => {
  const brokenPolicies = context.policyState?.records.filter((record) => record.status === "broken").length ?? 0;
  const rejectedAdvice = context.advisorRelationships?.history.filter((record) => record.reason === "advice-rejected").length ?? 0;
  const crisisDecisions = context.eventDecisions?.records.filter((record) => record.origin === "dynamic") ?? [];
  const cooperativeCrises = crisisDecisions.filter((record) => cooperativeCrisisOptions.has(record.optionId)).length;
  const coerciveCrises = crisisDecisions.length - cooperativeCrises;
  return [
    `${directionLabels[direction.lampId]}成为最强长期方向（影响 ${direction.score.toFixed(1)}）`,
    `势力命脉 ${arc.lifeline.toFixed(0)} / 隐患 ${arc.liability.toFixed(0)}`,
    `跨势力合作记录 ${cooperation}`,
    brokenPolicies > 0 ? `有 ${brokenPolicies} 项历史承诺被背离` : "历史承诺未形成集中违约",
    rejectedAdvice > 0 ? `顾问关系中留下 ${rejectedAdvice} 次意见落空` : "顾问关系未出现长期裂痕",
    crisisDecisions.length > 0
      ? `动态危机处理：协作 ${cooperativeCrises} / 强制 ${coerciveCrises}`
      : "尚未形成动态危机处理经验",
    `最终路线由 ${factionDirection[factionId] === direction.lampId ? "势力惯性" : "跨出势力惯性"}塑造`
  ];
};

export const evaluateNarrativeEnding = (
  state: GameState,
  playerFactionId: FactionId,
  arc: FactionArcState,
  lamps: LampTendencyState,
  progress: StoryProgress,
  context: NarrativeEndingContext = {}
): EndingResult => {
  const collapse = evaluateEnding(state, playerFactionId);
  if (collapse !== null) return collapse;

  const cooperation = cooperationScore(progress, context);
  const brokenPolicies = context.policyState?.records.filter((record) => record.status === "broken").length ?? 0;
  const coerciveCrisisDecisions = context.eventDecisions?.records.filter((record) =>
    record.origin === "dynamic" && !cooperativeCrisisOptions.has(record.optionId)
  ).length ?? 0;
  const breakingPressures = context.pressureState === undefined
    ? 0
    : Object.values(context.pressureState.pressures).filter((pressure) => pressure >= 75).length;
  const finalChoice = progress.choices.E41;
  const direction = dominantSocialDirection(playerFactionId, lamps, context);
  const factors = endingFactors(playerFactionId, arc, direction, cooperation, context);

  if (breakingPressures >= 2
    || (neglectedLampCount(lamps) >= 3 && cooperation < 5)
    || (brokenPolicies >= 2 && cooperation < 4)
    || (coerciveCrisisDecisions >= 2 && cooperation < 5)
    || (finalChoice === "B" && neglectedLampCount(lamps) >= 2)) {
    return { kind: "fragments", tone: "continuity", copy: endingCopies.fragments, factors };
  }

  if (!hasNeglectedLamp(lamps)
    && breakingPressures === 0
    && cooperation >= 5
    && brokenPolicies <= 1
    && state.globalModelDrift < 50) {
    return { kind: "shared-network", tone: "continuity", copy: endingCopies["shared-network"], factors };
  }

  const routeMode = arc.liability >= 65 ? "compromise" : cooperation >= 3 || arc.lifeline < 65 ? "turning" : "success";
  const routeCopy = routeEndingCopies[playerFactionId][routeMode];
  const socialKind = socialFormByLamp[direction.lampId];
  const socialCopy = endingCopies[socialKind];
  return {
    kind: socialKind,
    tone: "continuity",
    copy: { ...socialCopy, dispatch: `${socialCopy.dispatch} ${routeCopy.dispatch}` },
    factors
  };
};
