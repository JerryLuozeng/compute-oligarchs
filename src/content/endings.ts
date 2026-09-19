import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import { getLampStatus, type LampTendencyState } from "./lamps";
import type { FactionArcState } from "./faction-routes";
import type { StoryProgress } from "./story-events";

export const endingThresholds = {
  victory: {
    compute: 100,
    data: 70,
    stability: 70,
    maximumGlobalModelDrift: 10
  },
  defeat: {
    maximumGlobalModelDrift: 30,
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
  | "fragments";

export interface EndingCopy {
  label: string;
  title: string;
  description: string;
  dispatch: string;
}

export interface EndingResult {
  kind: EndingKind;
  tone: "victory" | "defeat";
  copy: EndingCopy;
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
      tone: "defeat",
      copy: endingCopies["system-collapse"]
    };
  }

  if (playerFaction.resources.stability <= endingThresholds.defeat.minimumFactionStability) {
    return {
      kind: "faction-collapse",
      tone: "defeat",
      copy: endingCopies["faction-collapse"]
    };
  }

  const victory = endingThresholds.victory;
  if (
    playerFaction.resources.compute >= victory.compute &&
    playerFaction.resources.data >= victory.data &&
    playerFaction.resources.stability >= victory.stability &&
    state.globalModelDrift <= victory.maximumGlobalModelDrift
  ) {
    return { kind: "victory", tone: "victory", copy: endingCopies.victory };
  }

  return null;
};

const hasNeglectedLamp = (lamps: LampTendencyState): boolean =>
  (Object.keys(lamps.globalTotals) as Array<keyof typeof lamps.globalTotals>)
    .some((lampId) => getLampStatus(lamps.globalTotals, lampId) === "neglected");

const neglectedLampCount = (lamps: LampTendencyState): number =>
  (Object.keys(lamps.globalTotals) as Array<keyof typeof lamps.globalTotals>)
    .filter((lampId) => getLampStatus(lamps.globalTotals, lampId) === "neglected").length;

export const evaluateNarrativeEnding = (
  state: GameState,
  playerFactionId: FactionId,
  arc: FactionArcState,
  lamps: LampTendencyState,
  progress: StoryProgress
): EndingResult => {
  const finalChoice = progress.choices.E41;
  if (neglectedLampCount(lamps) >= 3 && finalChoice === "B") {
    return { kind: "fragments", tone: "defeat", copy: endingCopies.fragments };
  }

  if (!hasNeglectedLamp(lamps) && (finalChoice === "A" || finalChoice === "C")) {
    return { kind: "shared-network", tone: "victory", copy: endingCopies["shared-network"] };
  }

  if (arc.liability >= 65) {
    return { kind: "route-compromise", tone: "defeat", copy: endingCopies["route-compromise"] };
  }

  const cooperativeChoices = ["E02", "E13", "E17", "E21", "E24", "E34", "E41"]
    .filter((eventId) => progress.choices[eventId] === "A" || progress.choices[eventId] === "C").length;
  if (cooperativeChoices >= 3 || arc.lifeline < 65) {
    return { kind: "route-turning", tone: "victory", copy: endingCopies["route-turning"] };
  }

  void state;
  void playerFactionId;
  return { kind: "route-success", tone: "victory", copy: endingCopies["route-success"] };
};
