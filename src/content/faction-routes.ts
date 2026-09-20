import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";

export interface FactionRoute {
  title: string;
  theme: string;
  opening: readonly string[];
  playstyle: string;
  lifeline: string;
  liability: string;
}

export const factionRoutes: Record<FactionId, FactionRoute> = {
  consortium: {
    title: "赢家的房间",
    theme: "胜利者的孤独。你拥有一切，除了别人的信任。",
    opening: [
      "董事会给了最后期限：倒计时已经重置了三次，这一次，必须兑现。",
      "你刚被任命为算力调度部的负责人。卡塔琳娜递给你一杯咖啡，说：",
      '"别让我们再等一年。"'
    ],
    playstyle: "资源最多，选项最多，诱惑也最多。每一次\"效率\"的选择都会在\"裂缝\"上留下一道细纹。你随时可以变得更强，但你也随时可能被自己压下去的东西拖垮。",
    lifeline: "控制力",
    liability: "裂缝"
  },
  sovereign: {
    title: "没有牙齿的规则",
    theme: "夹在中间的权威。你手里只有一支笔，却要让所有人签字。",
    opening: [
      "成员国宣布下一年度预算削减。",
      '曼努埃拉握着你的手："我们需要证明，寰盟不是一张空桌子。"',
      '你翻开第一份档案，最上面写着："天穹公司：拒绝出席。"'
    ],
    playstyle: "你没有算力，只有听证、审计、表决。要推动事情，就得借势：借民心、借证据、借盟友。每一次妥协都会在\"空转\"上添一笔，每一次坚持又会让你失去一些朋友。",
    lifeline: "公信力",
    liability: "空转"
  },
  labor_union: {
    title: "一盏很小的灯",
    theme: "从夹缝里长出来。你什么都没有，却什么都不能缺席。",
    opening: [
      "夜班结束，工棚里一盏灯还亮着。",
      '玛尔塔把一叠皱巴巴的名单递给你："这些人，都在等答案。"',
      "你不知道下一步该做什么，但你知道，你必须先去问他们。"
    ],
    playstyle: "资源少到只能亮一两盏灯。每一次分配都是取舍：你能不能既保住互助，又养活地下库？\"人心\"是你最重要的东西，来自你的每一次走访、每一句实话；\"暴露\"则是你的影子，越亮越大。",
    lifeline: "人心",
    liability: "暴露"
  },
  independent_labs: {
    title: "公开的代价",
    theme: "光会照到所有人，包括不该被照到的人。",
    opening: [
      "你所在的仓库里，墙上挂满了白板，桌上堆满了外卖盒。",
      "一笔匿名捐款刚刚到账，数额大得让整个社群沉默了。",
      '泽田盯着屏幕："谁会捐这么多钱？"'
    ],
    playstyle: "钱少，点子多。你的每一个选择，都在\"开放度\"与\"失控\"之间摇摆：公开越多，社区越有活力，风险也越难控制。顾问之间的争吵是你的日常。",
    lifeline: "开放度",
    liability: "失控"
  },
  socialist_power: {
    title: "稳与快",
    theme: "把算力修成水电，就必须面对水电的日常——慢，贵，永远不够。",
    opening: [
      "山路很长，车轮扬起黄色的灰。",
      '你被派去落实第十二座公共算力站。沈清和递给你一张图纸："图纸比口号有用。"',
      "山下的孩子已经在等第一堂课。"
    ],
    playstyle: "资源稳定，但并不宽裕。你要统筹：先保谁，后保谁。每一次\"快\"的选择都可能带来风险，每一次\"稳\"的选择又可能让人等得太久。\"僵化\"是你最大的敌人，也是你最难发现的敌人。",
    lifeline: "民生保障",
    liability: "僵化"
  }
};

export interface FactionArcState {
  factionId: FactionId;
  lifeline: number;
  liability: number;
}

export interface FactionArcChange {
  lifeline?: number;
  liability?: number;
}

const clamp = (value: number): number => Math.min(100, Math.max(0, value));

export const createFactionArcState = (
  state: GameState,
  factionId: FactionId
): FactionArcState => {
  const faction = state.factions.find((candidate) => candidate.id === factionId);
  if (faction === undefined) throw new Error(`Missing faction: ${factionId}`);

  let lifeline: number;
  switch (faction.id) {
    case "consortium":
      lifeline = faction.resources.compute;
      break;
    case "sovereign":
      lifeline = faction.resources.stability;
      break;
    case "labor_union":
      lifeline = faction.exclusive.organization;
      break;
    case "independent_labs":
      lifeline = faction.exclusive.reputation;
      break;
    case "socialist_power":
      lifeline = faction.resources.stability;
      break;
  }

  return { factionId, lifeline: clamp(lifeline), liability: 0 };
};

export const applyFactionArcChange = (
  state: FactionArcState,
  change: FactionArcChange
): FactionArcState => ({
  ...state,
  lifeline: clamp(state.lifeline + (change.lifeline ?? 0)),
  liability: clamp(state.liability + (change.liability ?? 0))
});
