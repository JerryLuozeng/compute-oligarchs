import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import type { StrategicActionState, ActionPressureTag } from "@/core/systems/strategic-actions";
import type { AdvisorRelationshipState } from "./advisor-system";
import type { AdvisorTrustState } from "./faction-story";
import type { InterestPressureState } from "./interest-pressure";
import { hasPolicyTag, type PolicyLegacyState } from "./policy-legacies";
import { applyEventEffects, type RuntimeGameEvent } from "./event-runtime";
import type { EventEffect, EventTheme, GameEventOption } from "./events";

interface DynamicCrisisContext {
  gameState: GameState;
  playerFactionId: FactionId;
  pressureState: InterestPressureState;
  actionState: StrategicActionState;
  policyState: PolicyLegacyState;
  advisorTrust: AdvisorTrustState;
  advisorRelationships: AdvisorRelationshipState;
}

interface CrisisAssessment {
  score: number;
  causes: readonly string[];
}

interface DynamicCrisisDefinition {
  id: string;
  theme: EventTheme;
  title: string;
  description: string;
  policyText: string;
  threshold: number;
  assess: (context: DynamicCrisisContext) => CrisisAssessment;
  options: readonly GameEventOption[];
}

const recentActionCount = (
  context: DynamicCrisisContext,
  tag: ActionPressureTag,
  lookback = 4
): number => context.actionState.history.filter((record) =>
  record.turn > context.gameState.turn - lookback && record.pressureTags.includes(tag)
).length;

const playerResources = (context: DynamicCrisisContext) =>
  context.gameState.factions.find((faction) => faction.id === context.playerFactionId)?.resources;

const option = (
  id: string,
  text: string,
  outcome: string,
  effects: readonly EventEffect[]
): GameEventOption => ({ id, text, outcome, effects });

const dynamicCrisisDefinitions: readonly DynamicCrisisDefinition[] = [
  {
    id: "dynamic-labor-rupture",
    theme: "labor_struggle",
    title: "无声班次",
    description: "标注、审核与清洗队伍开始同时降低工作速度。系统把它记成效率波动，但地方联络站传来的消息只有一句：人已经撑不住了。",
    policyText: "这不是一次孤立停工，而是连续动员、扩张承诺与工棚压力共同留下的政策债务。",
    threshold: 7,
    assess: (context) => {
      const pressure = context.pressureState.pressures.workshop;
      const mobilizations = recentActionCount(context, "labor-pressure");
      const growthFirst = hasPolicyTag(context.policyState, "growth-first");
      const hiddenConflict = hasPolicyTag(context.policyState, "conflict-hidden");
      return {
        score: pressure / 10 + mobilizations * 2 + (growthFirst ? 2 : 0) + (hiddenConflict ? 2 : 0),
        causes: [
          pressure >= 25 ? `工棚压力已累积至 ${pressure.toFixed(0)}` : undefined,
          mobilizations > 0 ? `近四季度进行了 ${mobilizations} 次透支式动员` : undefined,
          growthFirst ? "仍在兑现扩张优先承诺" : undefined,
          hiddenConflict ? "过去选择把内部矛盾留在暗处" : undefined
        ].filter((cause): cause is string => cause !== undefined)
      };
    },
    options: [
      option("open-collective-bargaining", "暂停强制动员，开放集体协商", "生产速度暂时下降，但数据劳动重新获得了可谈判的边界。", [
        { target: "labor_union", data: -6, stability: 10, organization: 8 },
        { target: "consortium", compute: -8 },
        { target: "global", stability: 4, modelDrift: -1 }
      ]),
      option("enforce-output-quota", "维持产量指标，替换拒绝上工的人", "报表恢复了绿色，缺失与错标却开始进入下一批训练数据。", [
        { target: "labor_union", data: 8, stability: -10 },
        { target: "consortium", compute: 6 },
        { target: "global", stability: -5, modelDrift: 4 }
      ])
    ]
  },
  {
    id: "dynamic-capacity-debt",
    theme: "compute_monopoly",
    title: "扩容之后",
    description: "新机架已经通电，数据、冷却与公共供能却没有同步增长。多个地区开始争夺同一份基础设施余量。",
    policyText: "算力扩张不会凭空完成。每一座新增集群，都把数据需求和基础设施压力转移给了别处。",
    threshold: 7,
    assess: (context) => {
      const dataDemand = recentActionCount(context, "data-demand");
      const infrastructure = recentActionCount(context, "infrastructure-pressure");
      const resources = playerResources(context);
      const imbalance = resources !== undefined && resources.compute > Math.max(40, resources.data * 2);
      const infrastructureDebt = hasPolicyTag(context.policyState, "infrastructure-debt");
      const socialPressure = Math.max(
        context.pressureState.pressures.industry,
        context.pressureState.pressures.livelihood
      );
      return {
        score: socialPressure / 12 + dataDemand * 1.5 + infrastructure * 1.5
          + (imbalance ? 2 : 0) + (infrastructureDebt ? 2 : 0),
        causes: [
          socialPressure >= 25 ? `产业或民生压力已升至 ${socialPressure.toFixed(0)}` : undefined,
          dataDemand > 0 ? `${dataDemand} 次投资扩大了数据需求` : undefined,
          infrastructure > 0 ? `${infrastructure} 次扩建挤压基础设施` : undefined,
          imbalance ? "玩家势力的算力增长已明显快于数据供给" : undefined,
          infrastructureDebt ? "快速接入承诺留下了基础设施欠账" : undefined
        ].filter((cause): cause is string => cause !== undefined)
      };
    },
    options: [
      option("ration-capacity", "冻结扩容，按社会需要重新配给", "部分订单被取消，医院、学校和基础设施先拿到了稳定配额。", [
        { target: "consortium", compute: -10, stability: -2 },
        { target: "socialist_power", stability: 7 },
        { target: "global", stability: 5, modelDrift: -2 }
      ]),
      option("secure-private-supply", "签订排他供应协议，维持扩张", "核心集群继续增长，其他地区只能在更高价格下等待剩余资源。", [
        { target: "consortium", compute: 10, data: -8 },
        { target: "socialist_power", stability: -7 },
        { target: "global", stability: -5, modelDrift: 3 }
      ])
    ]
  },
  {
    id: "dynamic-trust-blackout",
    theme: "data_leak",
    title: "无人相信的公告",
    description: "三份互相矛盾的事故说明同时流出。顾问、地方节点和公众不再争论哪一份正确，而是怀疑所有版本都在隐藏什么。",
    policyText: "信息危机并非突然发生。被压下的分歧、被拒绝的警告与无法兑现的公开承诺，最终让事实失去共同入口。",
    threshold: 7,
    assess: (context) => {
      const pressure = context.pressureState.pressures.commons;
      const rejections = context.advisorRelationships.history.filter((record) =>
        record.turn > context.gameState.turn - 4 && record.reason === "advice-rejected"
      ).length;
      const marginalizedAdvisor = Object.values(context.advisorTrust).some((trust) => trust <= -12);
      const concealed = hasPolicyTag(context.policyState, "conflict-hidden")
        || hasPolicyTag(context.policyState, "corporate-reliance")
        || hasPolicyTag(context.policyState, "provenance-deferred");
      const brokenPromises = context.policyState.records.filter((record) => record.status === "broken").length;
      return {
        score: pressure / 10 + Math.min(3, rejections * 0.75) + (marginalizedAdvisor ? 2 : 0)
          + (concealed ? 2 : 0) + brokenPromises * 1.5,
        causes: [
          pressure >= 25 ? `公开压力已累积至 ${pressure.toFixed(0)}` : undefined,
          rejections > 0 ? `近四季度留下 ${rejections} 次顾问意见落空记录` : undefined,
          marginalizedAdvisor ? "至少一名顾问因长期被忽视而停止充分共享信息" : undefined,
          concealed ? "过去的政策选择削弱了可追溯性" : undefined,
          brokenPromises > 0 ? `${brokenPromises} 项历史承诺已经被撕毁` : undefined
        ].filter((cause): cause is string => cause !== undefined)
      };
    },
    options: [
      option("publish-evidence-chain", "公开证据链，接受独立复核", "公告不再整齐，但不同地区终于能够核对同一组事实。", [
        { target: "independent_labs", data: -5, stability: 7 },
        { target: "sovereign", stability: 4 },
        { target: "global", stability: 4, modelDrift: -4 }
      ]),
      option("centralize-message", "封存原始记录，统一对外口径", "争议暂时从屏幕上消失，地方节点却开始建立自己的消息渠道。", [
        { target: "sovereign", stability: -6 },
        { target: "global", stability: -6, modelDrift: 4 }
      ])
    ]
  },
  {
    id: "dynamic-coordination-gridlock",
    theme: "open_source_commons",
    title: "所有人都在等批复",
    description: "跨地区协作进入停滞。每个部门都能指出风险，却没有任何一方愿意承担先行动的责任。",
    policyText: "秩序只有在能够协调真实利益时才有作用。反复协商却不兑现，会把规则本身变成新的政策债务。",
    threshold: 7,
    assess: (context) => {
      const pressure = context.pressureState.pressures.order;
      const commitments = recentActionCount(context, "commitment-risk");
      const lowStability = context.gameState.globalStability < 45;
      const rejectedInstitution = context.advisorRelationships.history.filter((record) =>
        record.turn > context.gameState.turn - 4
        && record.reason === "advice-rejected"
        && (record.advisorId === "lu" || record.advisorId === "osman")
      ).length;
      return {
        score: pressure / 10 + commitments * 1.5 + (lowStability ? 2 : 0) + rejectedInstitution * 1.5,
        causes: [
          pressure >= 25 ? `秩序压力已累积至 ${pressure.toFixed(0)}` : undefined,
          commitments > 0 ? `${commitments} 次协商承诺仍待兑现` : undefined,
          lowStability ? "全局稳定度已跌破协调警戒线" : undefined,
          rejectedInstitution > 0 ? "流程与审计顾问的警告曾被连续搁置" : undefined
        ].filter((cause): cause is string => cause !== undefined)
      };
    },
    options: [
      option("temporary-joint-command", "成立临时联合调度席", "各方让出一部分控制权，换来一套能够执行的临时规则。", [
        { target: "sovereign", compute: -4, stability: 8 },
        { target: "global", stability: 5, modelDrift: -1 }
      ]),
      option("return-local-control", "退回地方自行处理", "批复不再堵塞，地区间的标准却开始迅速分裂。", [
        { target: "sovereign", compute: 4, stability: -7 },
        { target: "global", stability: -4, modelDrift: 3 }
      ])
    ]
  },
  {
    id: "dynamic-model-feedback-loop",
    theme: "model_drift",
    title: "模型开始引用自己",
    description: "多个政策模型给出了高度一致的建议。审计人员随后发现，它们的训练数据都来自上一轮模型生成的预测，而不是现实记录。",
    policyText: "模型漂移不是第二条生命值。错误判断进入政策，政策改变社会，新数据再把错误判断包装成现实。",
    threshold: 7,
    assess: (context) => {
      const drift = context.gameState.globalModelDrift;
      const commonsPressure = context.pressureState.pressures.commons;
      const audits = context.actionState.history.filter((record) =>
        record.turn > context.gameState.turn - 4 && record.type === "audit"
      ).length;
      const investigated = context.actionState.investigatedTileIds.length;
      const provenanceDeferred = hasPolicyTag(context.policyState, "provenance-deferred")
        || hasPolicyTag(context.policyState, "resource-first");
      return {
        score: drift / 4 + commonsPressure / 20 + (audits === 0 ? 1.5 : -audits)
          + (investigated === 0 ? 1 : 0) + (provenanceDeferred ? 2 : 0),
        causes: [
          drift >= 15 ? `全局模型漂移已升至 ${drift.toFixed(1)}` : undefined,
          commonsPressure >= 25 ? "公开与审计压力正在削弱数据可信度" : undefined,
          audits === 0 ? "近四季度没有执行模型审计" : undefined,
          investigated === 0 ? "尚无地区异常调查记录" : undefined,
          provenanceDeferred ? "历史政策允许来源不明的数据进入系统" : undefined
        ].filter((cause): cause is string => cause !== undefined)
      };
    },
    options: [
      option("interrupt-model-loop", "暂停自动决策，回到现场采样", "部分系统转入人工维持，模型第一次重新接触未经自己加工的现实。", [
        { target: "consortium", compute: -8 },
        { target: "independent_labs", data: -6, stability: 5 },
        { target: "global", stability: 3, modelDrift: -9 }
      ]),
      option("trust-model-consensus", "维持自动决策，相信多数模型", "执行效率短暂提高，错误却以一致意见的形式扩散到更多地区。", [
        { target: "consortium", compute: 10, data: -8 },
        { target: "global", stability: -7, modelDrift: 8 }
      ])
    ]
  }
];

const toRuntimeCrisis = (
  definition: DynamicCrisisDefinition,
  assessment: CrisisAssessment
): RuntimeGameEvent => ({
  id: definition.id,
  origin: "dynamic",
  theme: definition.theme,
  title: definition.title,
  description: definition.description,
  policyText: definition.policyText,
  trigger: {
    description: `因果评分 ${assessment.score.toFixed(1)}。${assessment.causes.join("；")}。`,
    all: [],
    matches: () => true
  },
  options: definition.options.map((eventOption) => ({
    ...eventOption,
    effect: (state) => applyEventEffects(state, eventOption.effects)
  }))
});

export const findTriggeredDynamicCrisis = (
  context: DynamicCrisisContext,
  resolvedEventIds: ReadonlySet<string>
): RuntimeGameEvent | undefined => {
  const candidate = dynamicCrisisDefinitions
    .filter((definition) => !resolvedEventIds.has(definition.id))
    .map((definition) => ({ definition, assessment: definition.assess(context) }))
    .filter(({ definition, assessment }) => assessment.score >= definition.threshold)
    .sort((left, right) => right.assessment.score - left.assessment.score)[0];
  return candidate === undefined
    ? undefined
    : toRuntimeCrisis(candidate.definition, candidate.assessment);
};
