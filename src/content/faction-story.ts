import type { FactionId } from "@/core/models/ids";
import type { FactionArcChange } from "./faction-routes";
import type { StoryChapter, StoryEvent } from "./story-events";

export type AdvisorId =
  | "aditya"
  | "park"
  | "manuela"
  | "osman"
  | "marta"
  | "tanya"
  | "sawada"
  | "adeola"
  | "lu"
  | "su";

export interface AdvisorProfile {
  id: AdvisorId;
  factionId: FactionId;
  name: string;
  role: string;
  principle: string;
}

export type AdvisorTrustState = Readonly<Record<AdvisorId, number>>;

export const advisors: readonly AdvisorProfile[] = [
  { id: "aditya", factionId: "consortium", name: "阿迪蒂亚·梅赫塔", role: "首席运营官", principle: "稳运转" },
  { id: "park", factionId: "consortium", name: "朴世勋", role: "公关总监", principle: "管舆论" },
  { id: "manuela", factionId: "sovereign", name: "曼努埃拉·科雷亚", role: "管委会主席", principle: "讲理想" },
  { id: "osman", factionId: "sovereign", name: "奥斯曼·亚尔琴", role: "首席审计官", principle: "讲证据" },
  { id: "marta", factionId: "labor_union", name: "玛尔塔·索萨", role: "总协调", principle: "稳扎稳打" },
  { id: "tanya", factionId: "labor_union", name: "塔尼娅·卡明斯基", role: "红隼小队队长", principle: "要有行动" },
  { id: "sawada", factionId: "independent_labs", name: "泽田真司", role: "创始人", principle: "再检查" },
  { id: "adeola", factionId: "independent_labs", name: "阿德奥拉·巴洛贡", role: "传播负责人", principle: "先发出去" },
  { id: "lu", factionId: "socialist_power", name: "陆知行", role: "算力调度局局长", principle: "按流程" },
  { id: "su", factionId: "socialist_power", name: "苏晚照", role: "公共算力站站长", principle: "先试试" }
];

const advisorById = Object.fromEntries(advisors.map((advisor) => [advisor.id, advisor])) as Record<AdvisorId, AdvisorProfile>;

export const getAdvisor = (id: AdvisorId): AdvisorProfile => advisorById[id];

export const getFactionAdvisors = (factionId: FactionId): readonly AdvisorProfile[] =>
  advisors.filter((advisor) => advisor.factionId === factionId);

export const createAdvisorTrustState = (): AdvisorTrustState => ({
  aditya: 0,
  park: 0,
  manuela: 0,
  osman: 0,
  marta: 0,
  tanya: 0,
  sawada: 0,
  adeola: 0,
  lu: 0,
  su: 0
});

export const applyAdvisorTrust = (
  state: AdvisorTrustState,
  advisorId: AdvisorId | undefined
): AdvisorTrustState => advisorId === undefined
  ? state
  : { ...state, [advisorId]: Math.min(100, state[advisorId] + 10) };

const perspectiveByFaction: Readonly<Record<FactionId, string>> = {
  consortium: "天穹调度台正在估算这场风波对资源收益与控制力的影响。",
  sovereign: "管委会必须判断，这场风波会让规则更有分量，还是再次陷入空转。",
  labor_union: "星火的联络点正在确认，这个决定会怎样落到一线数据工作者身上。",
  independent_labs: "棱镜社正在追踪这场风波会不会扩大开放空间，也放大失控风险。",
  socialist_power: "赤衡的调度部门正在衡量，长期建设与眼前民生能否同时守住。"
};

export const getStoryPerspective = (event: StoryEvent, factionId: FactionId): string =>
  event.factionId === factionId
    ? "这是你所在势力的内部抉择。结果将改变本路线的命脉与隐患。"
    : perspectiveByFaction[factionId];

const event = (
  id: string,
  displayCode: string,
  factionId: FactionId,
  chapter: StoryChapter,
  title: string,
  description: string,
  options: StoryEvent["options"]
): StoryEvent => ({ id, displayCode, factionId, chapter, title, description, options });

export const factionStoryEvents: readonly StoryEvent[] = [
  event("CONSORTIUM-T1", "T1", "consortium", "第一章", "董事会的最后通牒",
    "三位董事坐在长桌另一端：\"倒计时必须兑现，否则换人。\"卡塔琳娜没有说话，只是看着你。", [
      { id: "A", text: "加速上线，削减安全冗余", outcome: "进度提前了，梅赫塔在走廊里叹了一口气。", arcChange: { lifeline: 6, liability: 9 }, advisorId: "park", advisorAdvice: "我们理解大家的心情——先发个声明吧。" },
      { id: "B", text: "再次延期，并公开承认\"晚一点\"", outcome: "董事们皱眉，外界的批评少了，卡塔琳娜第一次对你点了点头。", arcChange: { lifeline: -3, liability: -7 }, advisorId: "aditya", advisorAdvice: "先保运转，其他的等会议结束再说。" }
    ]),
  event("CONSORTIUM-T2", "T2", "consortium", "第二章", "艾米莉的辞呈",
    "艾米莉把辞呈放在桌上。她知道得太多了。\"我只是想睡个安稳觉。\"", [
      { id: "A", text: "挽留，并给她调岗加薪", outcome: "她沉默很久，收下了。她的眼神没有变。", arcChange: { lifeline: 4, liability: 5 } },
      { id: "B", text: "批准，同时送她一份保密协议", outcome: "她签了字，走出大门时没有回头。", arcChange: { lifeline: -2, liability: 8 } }
    ]),
  event("CONSORTIUM-T3", "T3", "consortium", "第四章", "赢家的房间",
    "一切顺利。空会议室里，卡塔琳娜问你：\"我们赢了，那为什么没人高兴？\"", [
      { id: "A", text: "拿出一部分收益，设立\"数据红利\"", outcome: "她挑了挑眉：\"你是认真的？\"", arcChange: { lifeline: -4, liability: -10 } },
      { id: "B", text: "继续扩张，\"高兴是奢侈品\"", outcome: "她笑了一下，没再说话。", arcChange: { lifeline: 8, liability: 10 } }
    ]),
  event("SOVEREIGN-C1", "C1", "sovereign", "第一章", "没有预算的听证",
    "预算被砍，听证会只能办半场。奥斯曼翻着账本：\"场地、翻译、安保，我们只够一样。\"", [
      { id: "A", text: "把听证会搬到工棚和学校，借民心", outcome: "座位是折叠椅，听众是真人。天穹的代表也来了，坐在最后一排。", arcChange: { lifeline: 8, liability: -4 }, advisorId: "manuela", advisorAdvice: "只要大家愿意坐下来，就没有解决不了的事。" },
      { id: "B", text: "接受天穹赞助场地，借资金", outcome: "场地很漂亮，条幅上多了一个不该有的标志。", arcChange: { lifeline: -5, liability: 8 }, advisorId: "osman", advisorAdvice: "账不会撒谎，人会。" }
    ]),
  event("SOVEREIGN-C2", "C2", "sovereign", "第二章", "备忘录",
    "一份内部备忘录显示，成员国的一位代表和天穹有私下交易。曼努埃拉看了很久，说：\"这份，你决定。\"", [
      { id: "A", text: "公开备忘录", outcome: "成员国震动，你多了几个敌人，也多了很多陌生的支持者。", arcChange: { lifeline: 8, liability: -5 } },
      { id: "B", text: "交给成员国自行调查", outcome: "事情被\"处理\"了，外界什么也没看到。", arcChange: { lifeline: -6, liability: 8 } }
    ]),
  event("SOVEREIGN-C3", "C3", "sovereign", "第四章", "执行令",
    "你终于有权强制天穹交出一次数据。天穹回应：\"我们会在同一天检修全部服务器。\"", [
      { id: "A", text: "执行，承担后果", outcome: "城市里的灯闪了一下。你签的字，第一次有了重量。", arcChange: { lifeline: 10, liability: -7 } },
      { id: "B", text: "缓行，再谈一轮", outcome: "谈判桌上多了几杯咖啡，一切照旧。", arcChange: { lifeline: -7, liability: 10 } }
    ]),
  event("LABOR-S1", "S1", "labor_union", "第二章", "第一次晾晒会",
    "一次疏忽，桑吉夫的判断失误，导致一批数据丢失。大家围坐一圈：\"今晚，我们把话说开。\"", [
      { id: "A", text: "让他自己说清楚，大家一起评", outcome: "他说到一半红了眼眶。有人递了一杯热水。这次之后，没有人再对他隐瞒。", arcChange: { lifeline: 8, liability: -5 }, advisorId: "marta", advisorAdvice: "先问问大家怎么想。" },
      { id: "B", text: "私下处理，免得伤感情", outcome: "气氛保住了，心里的疙瘩却还在。", arcChange: { lifeline: -4, liability: 6 }, advisorId: "tanya", advisorAdvice: "再忍就不是忍，是认命。" }
    ]),
  event("LABOR-S2", "S2", "labor_union", "第三章", "不拿一颗螺丝",
    "深夜，一座无人看管的仓库里堆满高价设备。有人想拿走一批，换钱给受伤的同伴治病。", [
      { id: "A", text: "严守规矩，不拿，另想办法", outcome: "没人再提这件事。第二天，玛尔塔把自己的手表放在了桌上。", arcChange: { lifeline: 5, liability: -6 } },
      { id: "B", text: "允许\"借用\"，事后归还并登记", outcome: "设备被借走，又被原样送了回来。仓库的保安看着登记表，愣了很久。", arcChange: { lifeline: 7, liability: 5 } }
    ]),
  event("LABOR-S3", "S3", "labor_union", "第四章", "带不走的人",
    "净网行动中，撤退路线只够一半人通过。留下的人要守住地下库，走的人要保住火种。", [
      { id: "A", text: "让年轻人先撤", outcome: "年轻人一步三回头。留下的老工人说：\"快走，别让我们白等。\"", arcChange: { lifeline: 5, liability: -4 } },
      { id: "B", text: "让熟手先撤", outcome: "熟手们沉默着走了。年轻人守在门口，手里握着一把旧螺丝刀。", arcChange: { lifeline: -3, liability: 7 } }
    ]),
  event("PRISM-P1", "P1", "independent_labs", "序章", "匿名捐款",
    "一笔巨额匿名捐款到账，附言只有一句：\"随便你们怎么用。\"", [
      { id: "A", text: "立刻买服务器，摆脱欠费", outcome: "服务器亮起，社群一片欢呼。埃琳娜在角落里皱了皱眉。", arcChange: { lifeline: 7, liability: 8 }, advisorId: "adeola", advisorAdvice: "完美的东西，永远发不出去。" },
      { id: "B", text: "先查来源，再决定", outcome: "查了三天，一无所获。钱在账上，谁也不敢碰。", arcChange: { lifeline: -2, liability: -5 }, advisorId: "sawada", advisorAdvice: "等我再确认一下。" }
    ]),
  event("PRISM-P2", "P2", "independent_labs", "第三章", "社区的争吵",
    "泽田与阿德奥拉吵到一句话也不说，社群分成两派。有人说：\"不如各写各的。\"", [
      { id: "A", text: "召开全社公开会议，现场直播", outcome: "直播间挤满了人。吵得很凶，也吵出了几个好想法。", arcChange: { lifeline: 8, liability: 5 } },
      { id: "B", text: "先分开冷静，各自整理观点", outcome: "社里安静得像图书馆。有人说：\"冷静完，人也凉了。\"", arcChange: { lifeline: -4, liability: -3 } }
    ]),
  event("PRISM-P3", "P3", "independent_labs", "第四章", "被拿走的代码",
    "一个小国的政府，用棱镜的工具搭建了监控系统。埃琳娜看着新闻，握紧了拳头。", [
      { id: "A", text: "发声明谴责，并加上使用条款", outcome: "声明被转了很多次，也有人说：\"你们背叛了开源。\"", arcChange: { lifeline: -3, liability: -8 } },
      { id: "B", text: "保持沉默，开源就是开源", outcome: "你保住了原则，也保住了那个后果。", arcChange: { lifeline: 6, liability: 9 } }
    ]),
  event("SOCIALIST-H1", "H1", "socialist_power", "第一章", "山里的第十二座站",
    "站点选址有争议：建在村口方便，但占了几亩耕地；建在山后省地，但要修两个月的路。", [
      { id: "A", text: "建在村口，补偿耕地", outcome: "站点很快通电。村里的老人摸着新墙：\"这地方，以后就是学校了。\"", arcChange: { lifeline: 8, liability: 5 }, advisorId: "su", advisorAdvice: "试一试嘛，出了问题我来扛。" },
      { id: "B", text: "建在山后，先修路", outcome: "路修得很结实，通电晚了两个月，孩子们等得有点急。", arcChange: { lifeline: 4, liability: -6 }, advisorId: "lu", advisorAdvice: "算力要算，人也要算。" }
    ]),
  event("SOCIALIST-H2", "H2", "socialist_power", "第二章", "被打回来的方案",
    "苏晚照提了一份很新的方案，上级批复只有三个字：\"再研究。\"她站在走廊里，攥着文件。", [
      { id: "A", text: "帮她越级递交", outcome: "方案被再次审阅。有人说你冒进，也有人悄悄对你竖起了大拇指。", arcChange: { lifeline: 5, liability: 7 } },
      { id: "B", text: "让她先在小范围试点", outcome: "试点成功了。上级说：\"早点这么做就好了。\"苏晚照没说话。", arcChange: { lifeline: 7, liability: -4 } }
    ]),
  event("SOCIALIST-H3", "H3", "socialist_power", "第三章", "不想被夸的站长",
    "一位老站长把所有荣誉让给了下属，但报表上有一处对不上。他摆摆手：\"小事，别查了。\"", [
      { id: "A", text: "私下问清楚，不声张", outcome: "他叹了口气，把真相说了出来。你们一起把它补上了。", arcChange: { lifeline: 6, liability: -3 } },
      { id: "B", text: "按程序上报", outcome: "程序走得很稳。老站长被调走的那天，站里的孩子们围着他哭了。", arcChange: { lifeline: -5, liability: 5 } }
    ])
];

export const getFactionStoryEvents = (factionId: FactionId): readonly StoryEvent[] =>
  factionStoryEvents.filter((candidate) => candidate.factionId === factionId);

export const getChoiceArcChange = (change: FactionArcChange | undefined): FactionArcChange => change ?? {};
