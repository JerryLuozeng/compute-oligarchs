import type { FactionId } from "@/core/models/ids";
import {
  getLampStatus,
  lampDefinitions,
  lampStatusLabels,
  type LampTendencyState
} from "./lamps";
import type { StoryChapter } from "./story-events";

export interface ChapterSettlement {
  chapter: StoryChapter;
  title: string;
  summary: string;
  brightest: string;
  neglected: string;
  statuses: readonly {
    lampName: string;
    status: string;
  }[];
}

const chapterNames: readonly StoryChapter[] = ["序章", "第一章", "第二章", "第三章", "第四章", "终章"];

const statusText: Record<FactionId, Record<"brightest" | "steady" | "neglected", string>> = {
  consortium: {
    brightest: "订单如潮，仓库空了，账户里多了几个零。天穹的人开始叫你的名字。",
    steady: "生意照常。有人满意，有人抱怨。",
    neglected: "订单堆积，客户在等。天穹寄来一封礼貌的信，字里行间都是提醒。"
  },
  sovereign: {
    brightest: "听证会座无虚席，审计官的笔记本写满了。规则有了牙齿，也有了拖延。",
    steady: "会议照常，文件照常，没人满意，也没人拍桌子。",
    neglected: "管委会的灯几乎熄了。曼努埃拉在会议室里站了很久，没有说话。"
  },
  labor_union: {
    brightest: "工棚里第一次亮着暖气。新面孔越来越多，其中也有陌生的眼睛。",
    steady: "夜班照旧，互助金照旧，人们心里都有一本账。",
    neglected: "暖气坏了。有人说：\"他们只顾着大事。\""
  },
  independent_labs: {
    brightest: "社区里一夜多出三千个新项目，有人做成了，有人做砸了，有人做了一件危险的事。",
    steady: "代码在提交，讨论在继续，咖啡在变凉。",
    neglected: "镜像库掉线，社群里一排问号。泽田盯着屏幕：\"我们还撑得住吗？\""
  },
  socialist_power: {
    brightest: "山村的孩子用上了实验课，老人的药单准时送到。日子稳了，也有人嫌它太单调。",
    steady: "医院、学校、养老院，灯光稳定。没有人感谢，也没有人抱怨。",
    neglected: "一座公共站停了，老人们守在门口，没人说话。"
  }
};

export const createChapterSettlement = (
  chapterIndex: number,
  lamps: LampTendencyState
): ChapterSettlement => {
  const chapter = chapterNames[chapterIndex] ?? chapterNames[chapterNames.length - 1];
  const statuses = lampDefinitions.map((lamp) => {
    const status = getLampStatus(lamps.chapterTotals, lamp.id);
    return { lampName: lamp.name, status: lampStatusLabels[status] };
  });
  const brightest = lampDefinitions.find((lamp) => getLampStatus(lamps.chapterTotals, lamp.id) === "brightest");
  const neglected = lampDefinitions.find((lamp) => getLampStatus(lamps.chapterTotals, lamp.id) === "neglected");

  return {
    chapter,
    title: `${chapter} / 灯火回响`,
    summary: brightest === undefined && neglected === undefined
      ? "这一章没有一盏灯真正压过其他灯，也没有谁彻底熄灭。每一种需要都留下了痕迹。"
      : `这一章，${brightest?.name ?? "没有单一的主灯"}获得了最多的照料，${neglected?.name ?? "没有一盏灯被彻底冷落"}留下了等待。`,
    brightest: brightest === undefined ? "没有一盏灯持续最亮。" : statusText[brightest.factionId].brightest,
    neglected: neglected === undefined ? "没有一盏灯持续被冷落。" : statusText[neglected.factionId].neglected,
    statuses
  };
};
