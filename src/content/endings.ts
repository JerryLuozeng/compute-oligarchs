import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";

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

export type EndingKind = "victory" | "faction-collapse" | "system-collapse";

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
