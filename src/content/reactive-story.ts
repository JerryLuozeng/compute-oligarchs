import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import { getLampStatus, type LampId, type LampTendencyState } from "./lamps";
import type { StoryEvent, StoryProgress, StoryReactiveType } from "./story-events";

interface ReactiveStoryRule {
  event: StoryEvent;
  matches: (lamps: LampTendencyState, state: GameState, factionId: FactionId) => boolean;
}

const reactiveEvent = (
  id: string,
  reactiveType: StoryReactiveType,
  title: string,
  description: string,
  triggerNote: string,
  options: StoryEvent["options"]
): StoryEvent => ({
  id,
  displayCode: id,
  chapter: "任意",
  reactiveType,
  title,
  description,
  perspective: triggerNote,
  options
});

const lampRule = (
  event: StoryEvent,
  lampId: LampId,
  status: "brightest" | "neglected"
): ReactiveStoryRule => ({
  event,
  matches: (lamps) => getLampStatus(lamps.chapterTotals, lampId) === status
});

const resonanceRules: readonly ReactiveStoryRule[] = [
  lampRule(reactiveEvent("RA1", "resonance", "订单如潮",
    "天穹送来最大的一批订单，附带一份\"优先使用条款\"。销售总监笑着说：\"这是我们的诚意。\"",
    "产业之灯持续最亮。被偏爱的产业带来收益，也开始索要优先权。", [
      { id: "A", text: "接下，并签长期合约", outcome: "账户很好看，你的名字也出现在了天穹的合同里。" },
      { id: "B", text: "只接一半，保留余地", outcome: "订单少了，但你还能说\"不\"。" }
    ]), "industry", "brightest"),
  lampRule(reactiveEvent("RA2", "resonance", "整齐的文件",
    "管委会提前一年完成了新规草案，每一页都整整齐齐。可是，没人按它做事。",
    "秩序之灯持续最亮。规则获得了资源，但落地仍需要一次选择。", [
      { id: "A", text: "推动落地试点，哪怕只在一座城", outcome: "规则第一次走出会议室，磕磕绊绊，也真的改变了些什么。" },
      { id: "B", text: "先放着，等更合适的时候", outcome: "文件被锁进抽屉。奥斯曼说：\"账不会过期，人会。\"" }
    ]), "order", "brightest"),
  lampRule(reactiveEvent("RA3", "resonance", "越来越多的手",
    "工棚里来了很多新面孔。玛尔塔看着名单，皱起了眉：其中有几个人，没人认识。",
    "工棚之灯持续最亮。队伍正在壮大，暴露的风险也跟着靠近。", [
      { id: "A", text: "敞开大门，欢迎所有人", outcome: "队伍壮大了，也多了几双看不清的眼睛。" },
      { id: "B", text: "逐个走访，慢一点接纳", outcome: "慢了一些，心里踏实。" }
    ]), "workshop", "brightest"),
  lampRule(reactiveEvent("RA4", "resonance", "热闹的社区",
    "棱镜社一夜之间多出三千个新项目，其中有一个看起来很危险，没人确定它的用途。",
    "公开之灯持续最亮。开放带来了创造力，也把危险项目推到所有人面前。", [
      { id: "A", text: "放行，相信社区自己会纠错", outcome: "社区热闹得像过节，也有人半夜睡不着。" },
      { id: "B", text: "暂缓，先请安全小组看看", outcome: "项目的作者不太高兴：\"说好的开放呢？\"" }
    ]), "commons", "brightest"),
  lampRule(reactiveEvent("RA5", "resonance", "通电的村子",
    "一个山村的用电稳定了，夜里不再摸黑。村民却说：\"能不能再多点别的？\"",
    "民生之灯持续最亮。基本生活已经改善，新的期待也随之出现。", [
      { id: "A", text: "扩展项目，加入新玩法", outcome: "村里多了一个小小的创客角，也多了一张新表格要填。" },
      { id: "B", text: "保持现状，稳最重要", outcome: "村子安静得很，孩子们看着窗外的灯，没有再问。" }
    ]), "livelihood", "brightest")
];

const grievanceRules: readonly ReactiveStoryRule[] = [
  lampRule(reactiveEvent("RB1", "grievance", "订单去哪了",
    "天穹的客户抱怨，订单迟迟没有处理。一封\"友好提醒\"送到你桌上，措辞客气，落款是卡塔琳娜。",
    "产业之灯持续被冷落。积压的订单和失去耐心的客户来敲门了。", [
      { id: "A", text: "让出一部分配额，安抚天穹", outcome: "客户满意了，别的灯暗了一格。" },
      { id: "B", text: "顶住压力，不为所动", outcome: "信被放进抽屉。第二天，几笔合作悄悄取消了。" }
    ]), "industry", "neglected"),
  lampRule(reactiveEvent("RB2", "grievance", "被推迟的听证",
    "管委会经费告急，听证会被迫推迟。曼努埃拉站在门口，笑得有些勉强：\"我们会想办法的。\"",
    "秩序之灯持续被冷落。没有资源的规则正在失去发声的场所。", [
      { id: "A", text: "补一点资源，把会办完", outcome: "听证会如期举行，座位坐满了一半。" },
      { id: "B", text: "不补，让他们自己想办法", outcome: "会议室的灯灭了。有人低声说：\"规则，也是要吃饭的。\"" }
    ]), "order", "neglected"),
  lampRule(reactiveEvent("RB3", "grievance", "冷灶",
    "工棚里的暖气坏了。有人说：\"你们只顾大事，我们也是人。\"",
    "工棚之灯持续被冷落。一线数据工作者正在为最基本的生活发问。", [
      { id: "A", text: "优先修好，暂缓别的安排", outcome: "暖气重新响起来。桑吉夫蹲在管道旁，用袖子擦了擦汗。" },
      { id: "B", text: "说明理由，承诺下一轮再补", outcome: "有人点头，有人转身。玛尔塔说：\"先让大家把话说完。\"" }
    ]), "workshop", "neglected"),
  lampRule(reactiveEvent("RB4", "grievance", "掉线的服务器",
    "棱镜的镜像库突然掉线，社群里一片问号。泽田在群里发了一句：\"我们在修。\"",
    "公开之灯持续被冷落。共享网络失去维护，社区开始自行离散。", [
      { id: "A", text: "紧急补一批算力", outcome: "服务器重新亮起，有人发来一个\"谢谢\"的表情。" },
      { id: "B", text: "让社区自己想办法", outcome: "社区开始自救，也有人悄悄退出了群。" }
    ]), "commons", "neglected"),
  lampRule(reactiveEvent("RB5", "grievance", "停摆的站",
    "一座公共算力站因供给不足停摆。老人们守在门口，手里捏着写好的药单。",
    "民生之灯持续被冷落。公共服务停摆后，等待的人已经来到门口。", [
      { id: "A", text: "立刻调配，优先恢复", outcome: "灯亮了，老人们没有欢呼，只是慢慢排起了队。" },
      { id: "B", text: "等下一轮再处理", outcome: "有人等到了，有人没有。" }
    ]), "livelihood", "neglected")
];

const getFactionResources = (state: GameState, factionId: FactionId) =>
  state.factions.find((faction) => faction.id === factionId)?.resources;

const crisisRules: readonly ReactiveStoryRule[] = [
  {
    event: reactiveEvent("RC1", "crisis", "能源见底",
      "深夜，电网报警。半座城市的灯闪了两下，然后暗了下去。",
      "可调度算力已经见底，能源供给无法同时维持所有区域。", [
        { id: "A", text: "拉闸保医院和学校", outcome: "商业区一片漆黑，直播间里有人骂，急诊室的灯没灭。" },
        { id: "B", text: "拉闸保产业，压低民用", outcome: "工厂灯火通明，居民区里有人点起了蜡烛。" }
      ]),
    matches: (_lamps, state, factionId) => (getFactionResources(state, factionId)?.compute ?? Number.POSITIVE_INFINITY) < 20
  },
  {
    event: reactiveEvent("RC2", "crisis", "账户见红",
      "账户余额变成了红色。供应商站在门口，说：\"这个月的账，得结一下。\"",
      "算力与数据储备同时偏低，当前生产余量已经无法覆盖日常支出。", [
        { id: "A", text: "变卖一部分设备，先渡过难关", outcome: "设备被搬走，机房空了一角。" },
        { id: "B", text: "向天穹借款", outcome: "钱到账了，附带一份很厚的条款。" }
      ]),
    matches: (_lamps, state, factionId) => {
      const resources = getFactionResources(state, factionId);
      return resources !== undefined && resources.compute + resources.data < 35;
    }
  },
  {
    event: reactiveEvent("RC3", "crisis", "民心跌落",
      "街头出现了手写的标语：\"我们不信你。\"有人拍下视频，转发了几十万次。",
      "所属势力稳定度已经见底，公开的不信任开始扩散。", [
        { id: "A", text: "公开检讨，承诺改正", outcome: "有人骂得更凶，也有人说：\"至少没躲。\"" },
        { id: "B", text: "强硬压下，不作回应", outcome: "视频被删了，标语却越来越多。" }
      ]),
    matches: (_lamps, state, factionId) => (getFactionResources(state, factionId)?.stability ?? Number.POSITIVE_INFINITY) < 30
  },
  {
    event: reactiveEvent("RC4", "crisis", "数据外泄",
      "一批核心数据被上传到不明位置。没人知道是谁做的，也没人知道有谁已经看过。",
      "数据供给已经见底，或全局模型漂移进入失控区间。", [
        { id: "A", text: "全面调查，公开进展", outcome: "调查很慢，公开很痛，但有人愿意留下来一起查。" },
        { id: "B", text: "转移与销毁，尽快止损", outcome: "风波暂时压下，但有些东西，永远追不回来了。" }
      ]),
    matches: (_lamps, state, factionId) =>
      (getFactionResources(state, factionId)?.data ?? Number.POSITIVE_INFINITY) < 20
      || state.globalModelDrift >= 60
  }
];

export const reactiveStoryEvents: readonly StoryEvent[] = [
  ...resonanceRules.map((rule) => rule.event),
  ...grievanceRules.map((rule) => rule.event),
  ...crisisRules.map((rule) => rule.event)
];

export const findReactiveStoryEvent = (
  progress: StoryProgress,
  lamps: LampTendencyState,
  state: GameState,
  factionId: FactionId
): StoryEvent | undefined => {
  if (progress.reactiveChapterIndexes.includes(progress.chapterIndex)) return undefined;
  const resolved = new Set(progress.resolvedIds);
  const resolvedCrisisCount = crisisRules.filter((rule) => resolved.has(rule.event.id)).length;
  const pendingCrisis = resolvedCrisisCount >= 2
    ? undefined
    : crisisRules.find((rule) => !resolved.has(rule.event.id) && rule.matches(lamps, state, factionId));
  if (pendingCrisis !== undefined) return pendingCrisis.event;

  return [...grievanceRules, ...resonanceRules]
    .find((rule) => !resolved.has(rule.event.id) && rule.matches(lamps, state, factionId))?.event;
};
