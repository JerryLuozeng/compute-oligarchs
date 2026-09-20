import type { FactionId } from "@/core/models/ids";

export type SingularityBelief = "believer" | "skeptic";

export interface IntroFlags {
  singularityBelief: SingularityBelief;
}

export interface IntroChoiceOption {
  id: SingularityBelief;
  text: string;
}

export interface IntroChoice {
  id: string;
  prompt: string;
  options: readonly IntroChoiceOption[];
}

export interface IntroScene {
  id: string;
  sceneGroup: "world" | "factions" | "singularity" | "selection" | "faction-intro";
  location: string;
  speaker?: string;
  text: string;
  choice?: IntroChoice;
}

export interface FactionIntro {
  factionId: FactionId;
  scenes: readonly IntroScene[];
}

export const defaultIntroFlags: IntroFlags = { singularityBelief: "skeptic" };

export const worldIntroScenes: readonly IntroScene[] = [
  { id: "world-news", sceneGroup: "world", location: "全球新闻网络", text: "全球算力交易指数创新高。寰盟第九次协调会破裂。星火工联宣布跨境联合行动。" },
  { id: "world-countdown", sceneGroup: "world", location: "城市广场", text: "距离奇点，还有 365 天。角落里的红字写着：第三次重置。" },
  { id: "world-street", sceneGroup: "world", location: "凌晨街头", text: "外卖员耳机里的客服机器人正在道歉。他抬头看了一眼算力塔的指示灯。" },
  { id: "world-power", sceneGroup: "world", location: "云端机房", text: "这座机房，去年用掉的电，够一座小城市用三年。风扇声没有停过。" },
  { id: "world-labor", sceneGroup: "world", location: "数据工位", text: "凌晨换班。一位工人揉着眼睛，屏幕上是她刚标注完的第 4000 条语音数据。" },
  { id: "world-thesis", sceneGroup: "world", location: "系统广播", text: "没有人知道奇点会不会来。但所有人都已经在为它下注。" }
];

export const factionIntroScenes: Readonly<Record<FactionId, FactionIntro>> = {
  consortium: { factionId: "consortium", scenes: [
    { id: "consortium-board", sceneGroup: "faction-intro", location: "天穹公司董事会", speaker: "卡塔琳娜", text: "我们比任何国家都先一步买下了未来。" },
    { id: "consortium-floor", sceneGroup: "faction-intro", location: "云穹一号港", text: "机柜灯光如海。一名值班工朝你点头，你不知道他的名字。" },
    { id: "consortium-close", sceneGroup: "faction-intro", location: "调度部任命室", speaker: "卡塔琳娜", text: "记住，效率不解释自己。" }
  ] },
  sovereign: { factionId: "sovereign", scenes: [
    { id: "sovereign-council", sceneGroup: "faction-intro", location: "寰盟协调会", text: "多国代表为算力配额跨境分配吵到深夜。麦克风前没有人愿意先让出配额。" },
    { id: "sovereign-manuel", sceneGroup: "faction-intro", location: "会场走廊", speaker: "曼努埃拉", text: "我们没有军队，没有算力，只有这张桌子。别让它散架。" },
    { id: "sovereign-close", sceneGroup: "faction-intro", location: "待签条例", text: "《算力公共条例》草案摊在你面前。第一处空白等待你的签字。" }
  ] },
  labor_union: { factionId: "labor_union", scenes: [
    { id: "labor-rollcall", sceneGroup: "faction-intro", location: "跨境数据劳动带", speaker: "玛尔塔", text: "今晚接班的，有三个国家的人。他们的合同还是临时工。" },
    { id: "labor-network", sceneGroup: "faction-intro", location: "地下联络网络", speaker: "桑吉夫", text: "没人能一拉闸就把我们的东西全关了。" },
    { id: "labor-close", sceneGroup: "faction-intro", location: "工棚夜谈", speaker: "塔尼娅", text: "你会先谈判，还是先行动？" }
  ] },
  independent_labs: { factionId: "independent_labs", scenes: [
    { id: "prism-debate", sceneGroup: "faction-intro", location: "棱镜开源社实验室", speaker: "埃琳娜", text: "这个模型一旦开源，谁都能用，包括想用它作恶的人。" },
    { id: "prism-answer", sceneGroup: "faction-intro", location: "白板会议室", speaker: "泽田真司", text: "锁起来，它就只服务于锁得起它的人。" },
    { id: "prism-close", sceneGroup: "faction-intro", location: "匿名捐款通知", text: "一笔巨额匿名捐款到账。白板上的“下一步计划”停在半句。" }
  ] },
  socialist_power: { factionId: "socialist_power", scenes: [
    { id: "public-blueprint", sceneGroup: "faction-intro", location: "公共算力站施工现场", speaker: "陆知行", text: "图纸比口号有用。电，先算清楚。" },
    { id: "public-classroom", sceneGroup: "faction-intro", location: "山路尽头的公共机房", speaker: "苏晚照", text: "今天要是通了，明天全乡都能上。" },
    { id: "public-close", sceneGroup: "faction-intro", location: "第十二座公共算力站", text: "孩子们已经在教室门口探头。施工清单上，最后一项是电力余量。" }
  ] }
};

export const singularityChoice: IntroChoice = {
  id: "singularity-belief",
  prompt: "在你听到的所有说法里，你更倾向于相信——",
  options: [
    { id: "believer", text: "奇点真的会来" },
    { id: "skeptic", text: "奇点只是一种说法，重要的是现在" }
  ]
};
