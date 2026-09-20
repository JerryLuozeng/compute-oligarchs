import type { StrategicActionType } from "@/core/systems/strategic-actions";

export interface StrategicActionDefinition {
  type: StrategicActionType;
  name: string;
  description: string;
  tradeoff: string;
  cost: number;
  target: "region" | "faction";
}

export const strategicActionDefinitions: readonly StrategicActionDefinition[] = [
  {
    type: "investigate",
    name: "调查",
    description: "确认一个地区的异常来源，并为后续危机判断留下可靠记录。",
    tradeoff: "不改变当前产出，但占用一次行动机会。",
    cost: 1,
    target: "region"
  },
  {
    type: "audit",
    name: "审计",
    description: "检查训练数据与模型输出，压低目标地区的漂移。",
    tradeoff: "消耗 6 数据，短期压低算力容量，同时降低用电负荷。",
    cost: 2,
    target: "region"
  },
  {
    type: "invest",
    name: "投资",
    description: "为目标区域扩建算力集群与配套供电。",
    tradeoff: "消耗 8 算力。容量增长快于发电能力，会留下电力缺口。",
    cost: 2,
    target: "region"
  },
  {
    type: "negotiate",
    name: "协商",
    description: "与另一势力建立临时协调渠道，缓和双方压力。",
    tradeoff: "消耗 3 算力，并形成需要兑现的合作预期。",
    cost: 1,
    target: "faction"
  },
  {
    type: "mobilize",
    name: "动员",
    description: "要求目标地区在本轮扩大生产。",
    tradeoff: "提高产出，同时增加劳动压力、漂移并降低稳定度。",
    cost: 1,
    target: "region"
  },
  {
    type: "publish",
    name: "公开",
    description: "公开目标地区的问题与数据记录，纠正模型认知。",
    tradeoff: "消耗 3 数据，短期暴露矛盾并降低本势力稳定度。",
    cost: 1,
    target: "region"
  }
] as const;

export const strategicActionFeedback: Readonly<Record<StrategicActionType, string>> = {
  investigate: "调查记录已经归档。未来危机将能够读取这次发现。",
  audit: "漂移得到控制，但审计停机压低了当前产出。",
  invest: "新产能开始建设，随之而来的数据需求与基础设施压力已被记录。",
  negotiate: "协调渠道已经建立，对方会记住这次接触与后续承诺。",
  mobilize: "生产被短期拉高，劳动压力与系统风险同时开始积累。",
  publish: "信息进入公共视野，模型偏差下降，组织暂时承受公开带来的震荡。"
};
