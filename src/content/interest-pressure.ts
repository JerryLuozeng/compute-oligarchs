import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import type { StrategicActionState, ActionPressureTag } from "@/core/systems/strategic-actions";
import type { LampId, LampTendencyState } from "./lamps";
import { hasPolicyTag, type PolicyLegacyState } from "./policy-legacies";

export type InterestPressureLevel = "stable" | "strained" | "crisis" | "breaking";

export interface InterestPressureRecord {
  turn: number;
  lampId: LampId;
  before: number;
  after: number;
  allocation: number;
  causes: readonly string[];
}

export interface InterestPressureState {
  turn: number;
  pressures: Record<LampId, number>;
  history: readonly InterestPressureRecord[];
}

export interface InterestFeedback {
  lampId: LampId;
  level: InterestPressureLevel;
  pressure: number;
  delta: number;
  summary: string;
}

export interface InterestSettlement {
  gameState: GameState;
  pressureState: InterestPressureState;
  feedback: readonly InterestFeedback[];
}

const lampIds: readonly LampId[] = ["industry", "order", "workshop", "commons", "livelihood"];

const emptyPressures = (): Record<LampId, number> => ({
  industry: 0,
  order: 0,
  workshop: 0,
  commons: 0,
  livelihood: 0
});

const clamp = (value: number, minimum = 0, maximum = 100): number =>
  Math.min(maximum, Math.max(minimum, value));

const allocationDelta = (allocation: number): number => {
  if (allocation >= 25) return -4;
  if (allocation >= 18) return -1;
  if (allocation >= 11) return 4;
  return 8;
};

const actionPressure = (
  tags: ReadonlySet<ActionPressureTag>,
  lampId: LampId
): { delta: number; causes: string[] } => {
  let delta = 0;
  const causes: string[] = [];
  const add = (tag: ActionPressureTag, amount: number, label: string) => {
    if (!tags.has(tag)) return;
    delta += amount;
    causes.push(label);
  };

  if (lampId === "industry") add("innovation-delay", 3, "审计延缓扩张");
  if (lampId === "order") {
    add("exposure-risk", 2, "问题公开造成制度震荡");
    add("commitment-risk", 1, "协商形成兑现压力");
  }
  if (lampId === "workshop") {
    add("labor-pressure", 6, "动员透支劳动");
    add("data-demand", 2, "新增产能扩大数据需求");
  }
  if (lampId === "commons") add("commitment-risk", 1, "社会开始追问协商结果");
  if (lampId === "livelihood") add("infrastructure-pressure", 3, "扩建挤压公共基础设施");
  return { delta, causes };
};

const legacyPressure = (
  policies: PolicyLegacyState,
  lampId: LampId
): { delta: number; causes: string[] } => {
  let delta = 0;
  const causes: string[] = [];
  const add = (tag: string, amount: number, label: string) => {
    if (!hasPolicyTag(policies, tag)) return;
    delta += amount;
    causes.push(label);
  };

  if (lampId === "industry") {
    add("safety-first", 1, "安全承诺约束扩张");
    add("access-first", 1, "公共服务优先占用产能");
  }
  if (lampId === "order") {
    add("safety-first", -1, "安全承诺支撑秩序");
    add("infrastructure-first", -1, "长期建设降低执行压力");
  }
  if (lampId === "workshop") {
    add("growth-first", 2, "扩张优先挤压劳动条件");
    add("labor-voice", -1, "共同问责释放劳动压力");
  }
  if (lampId === "commons") {
    add("public-legitimacy", -1, "公开听证维持社会信任");
    add("audit-first", -1, "来源审计维持可追溯性");
    add("corporate-reliance", 2, "企业依赖削弱公共信任");
    add("resource-first", 2, "来源不明的资源积累质疑");
  }
  if (lampId === "livelihood") {
    add("growth-first", 1, "扩张优先推迟公共投入");
    add("access-first", -1, "服务优先缓解民生等待");
    add("access-deferred", 2, "长期建设延后眼前服务");
  }
  return { delta, causes };
};

export const getInterestPressureLevel = (pressure: number): InterestPressureLevel => {
  if (pressure >= 75) return "breaking";
  if (pressure >= 50) return "crisis";
  if (pressure >= 25) return "strained";
  return "stable";
};

const severity = (pressure: number): number => {
  const level = getInterestPressureLevel(pressure);
  if (level === "breaking") return 3;
  if (level === "crisis") return 2;
  if (level === "strained") return 1;
  return 0;
};

const updateFactionResources = (
  state: GameState,
  factionId: FactionId,
  update: (resources: GameState["factions"][number]["resources"]) => GameState["factions"][number]["resources"]
): GameState => ({
  ...state,
  factions: state.factions.map((faction) => faction.id === factionId
    ? { ...faction, resources: update(faction.resources) }
    : faction)
});

const applyPressureConsequences = (
  state: GameState,
  pressures: Record<LampId, number>
): GameState => {
  let next = state;
  const industry = severity(pressures.industry);
  const order = severity(pressures.order);
  const workshop = severity(pressures.workshop);
  const commons = severity(pressures.commons);
  const livelihood = severity(pressures.livelihood);

  if (industry > 0) {
    next = updateFactionResources(next, "consortium", (resources) => ({
      ...resources,
      compute: Math.max(0, resources.compute - industry * 2)
    }));
  }
  if (order > 0) {
    next = updateFactionResources(next, "sovereign", (resources) => ({
      ...resources,
      stability: clamp(resources.stability - order)
    }));
    next = { ...next, globalStability: clamp(next.globalStability - order) };
  }
  if (workshop > 0) {
    next = updateFactionResources(next, "labor_union", (resources) => ({
      ...resources,
      data: Math.max(0, resources.data - workshop * 3),
      stability: clamp(resources.stability - workshop)
    }));
  }
  if (commons > 0) {
    next = updateFactionResources(next, "independent_labs", (resources) => ({
      ...resources,
      stability: clamp(resources.stability - commons)
    }));
    next = { ...next, globalModelDrift: clamp(next.globalModelDrift + commons * 0.75) };
  }
  if (livelihood > 0) {
    next = updateFactionResources(next, "socialist_power", (resources) => ({
      ...resources,
      stability: clamp(resources.stability - livelihood * 2)
    }));
    next = { ...next, globalStability: clamp(next.globalStability - livelihood * 0.5) };
  }

  const tileSeverity: Partial<Record<FactionId | "commons", number>> = {
    consortium: industry,
    sovereign: order,
    labor_union: workshop,
    commons,
    socialist_power: livelihood
  };
  return {
    ...next,
    tiles: next.tiles.map((tile) => {
      const loss = tile.controllingFaction === "none" ? 0 : tileSeverity[tile.controllingFaction] ?? 0;
      return loss === 0 ? tile : { ...tile, stability: clamp(tile.stability - loss) };
    })
  };
};

const summaries: Record<LampId, Record<Exclude<InterestPressureLevel, "stable">, string>> = {
  industry: {
    strained: "投资与订单开始等待，算力扩张速度受到拖累。",
    crisis: "产业链开始收缩，集中算力正在失去维护能力。",
    breaking: "生产网络大面积停顿，既有算力也无法稳定运行。"
  },
  order: {
    strained: "规则执行出现空档，全局稳定开始承压。",
    crisis: "监管与协调失灵，地区之间开始各自为政。",
    breaking: "制度网络接近失效，公共决策无法抵达基层。"
  },
  workshop: {
    strained: "数据劳动质量下降，返工和缺勤开始增加。",
    crisis: "劳动者组织化加速，数据供应出现持续缺口。",
    breaking: "生产关系断裂，关键数据劳动接近全面停摆。"
  },
  commons: {
    strained: "信息不透明正在制造审计与信任压力。",
    crisis: "公共监督失效，模型开始依赖无法验证的数据。",
    breaking: "社会不再相信系统提供的事实，模型漂移快速扩散。"
  },
  livelihood: {
    strained: "公共服务排队延长，普通人的不满开始积累。",
    crisis: "医疗、教育与就业系统同时承压，稳定度持续下降。",
    breaking: "基本生活保障失灵，社会协作基础正在瓦解。"
  }
};

export const createInterestPressureState = (): InterestPressureState => ({
  turn: 0,
  pressures: emptyPressures(),
  history: []
});

export const settleInterestPressures = (
  gameState: GameState,
  pressureState: InterestPressureState,
  lamps: LampTendencyState,
  actions: StrategicActionState,
  policies: PolicyLegacyState
): InterestSettlement => {
  if (pressureState.turn >= gameState.turn) {
    return { gameState, pressureState, feedback: [] };
  }

  const currentTags = new Set(actions.history
    .filter((record) => record.turn === gameState.turn)
    .flatMap((record) => record.pressureTags));
  const records: InterestPressureRecord[] = [];
  const nextPressures = lampIds.reduce<Record<LampId, number>>((next, lampId) => {
    const allocation = lamps.current[lampId];
    const action = actionPressure(currentTags, lampId);
    const legacy = legacyPressure(policies, lampId);
    const base = allocationDelta(allocation);
    const before = pressureState.pressures[lampId];
    const after = clamp(before + base + action.delta + legacy.delta);
    const causes = [
      allocation < 18 ? "长期分配不足" : allocation >= 25 ? "获得优先照顾" : "维持基本投入",
      ...action.causes,
      ...legacy.causes
    ];
    records.push({ turn: gameState.turn, lampId, before, after, allocation, causes });
    next[lampId] = after;
    return next;
  }, emptyPressures());

  const nextPressureState: InterestPressureState = {
    turn: gameState.turn,
    pressures: nextPressures,
    history: [...pressureState.history, ...records]
  };
  const nextGameState = applyPressureConsequences(gameState, nextPressures);
  const feedback = records.map<InterestFeedback>((record) => {
    const level = getInterestPressureLevel(record.after);
    return {
      lampId: record.lampId,
      level,
      pressure: record.after,
      delta: record.after - record.before,
      summary: level === "stable"
        ? record.after < record.before ? "这一方向的压力正在缓解。" : "这一方向仍在可控范围内。"
        : summaries[record.lampId][level]
    };
  });
  return { gameState: nextGameState, pressureState: nextPressureState, feedback };
};

export const isInterestPressureState = (value: unknown): value is InterestPressureState => {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  if (!Number.isInteger(candidate.turn) || typeof candidate.pressures !== "object" || candidate.pressures === null) {
    return false;
  }
  const pressures = candidate.pressures as Record<string, unknown>;
  return lampIds.every((lampId) => typeof pressures[lampId] === "number"
    && Number.isFinite(pressures[lampId])
    && (pressures[lampId] as number) >= 0
    && (pressures[lampId] as number) <= 100)
    && Array.isArray(candidate.history);
};
