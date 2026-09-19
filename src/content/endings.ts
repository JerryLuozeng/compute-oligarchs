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

const routeEndingCopies: Record<FactionId, Record<"success" | "compromise" | "turning", EndingCopy>> = {
  consortium: {
    success: { label: "CONSORTIUM / CONTROL", title: "穹顶合拢", description: "倒计时被兑现，掌声很响。你站在台上，看着台下一张张笑脸，觉得他们离你很远。", dispatch: "天穹赢得了效率，也必须继续回答信任去了哪里。" },
    compromise: { label: "CONSORTIUM / FRACTURE", title: "倒塌的塔", description: "内部的不满、事故与谎言同时爆发。天穹没有输给任何人，而是输给了自己压下去的东西。", dispatch: "裂缝从来不是突然出现，只是终于无法再被报表遮住。" },
    turning: { label: "CONSORTIUM / TURNING", title: "迟到的诚实", description: "天穹接受了监管，倒计时终于不再重置。有人说这是失败，也有人说，这是第一次真正的开始。", dispatch: "让利没有结束生产，它只是重新回答了生产为了谁。" }
  },
  sovereign: {
    success: { label: "SOVEREIGN / TRUST", title: "规则之网", description: "条例通过了，天穹低头了，也留了后手。世界没那么疯，也没那么亮。", dispatch: "奥斯曼把笔记本交给继任者：\"账，别断。\"" },
    compromise: { label: "SOVEREIGN / STALL", title: "有名无实", description: "文件很多，会议很多，掌声也很多。只是没人再看它们。", dispatch: "没有执行的规则，只是另一种安静的失信。" },
    turning: { label: "SOVEREIGN / TURNING", title: "迟来的牙齿", description: "你终于让管委会咬了一口。有人说这是奇迹，有人说，这是灾难的开始。", dispatch: "权威第一次留下了齿痕，也第一次必须承担它的重量。" }
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
  const cooperativeChoices = ["E02", "E13", "E17", "E21", "E24", "E34", "E41"]
    .filter((eventId) => progress.choices[eventId] === "A" || progress.choices[eventId] === "C").length;
  if (neglectedLampCount(lamps) >= 3 && finalChoice === "B") {
    return { kind: "fragments", tone: "defeat", copy: endingCopies.fragments };
  }

  if (!hasNeglectedLamp(lamps)
    && cooperativeChoices >= 4
    && state.globalStability >= 40
    && (finalChoice === "A" || finalChoice === "C")) {
    return { kind: "shared-network", tone: "victory", copy: endingCopies["shared-network"] };
  }

  if (arc.liability >= 65) {
    return { kind: "route-compromise", tone: "defeat", copy: routeEndingCopies[playerFactionId].compromise };
  }

  if (cooperativeChoices >= 3 || arc.lifeline < 65) {
    return { kind: "route-turning", tone: "victory", copy: routeEndingCopies[playerFactionId].turning };
  }

  return { kind: "route-success", tone: "victory", copy: routeEndingCopies[playerFactionId].success };
};
