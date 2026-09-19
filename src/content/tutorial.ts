export type TutorialTarget =
  | "faction-status"
  | "global-status"
  | "world-map"
  | "turn-control"
  | "faction-roster";

export interface TutorialStep {
  id: string;
  target: TutorialTarget;
  label: string;
  title: string;
  description: string;
}

export const tutorialSteps: readonly TutorialStep[] = [
  {
    id: "faction-status",
    target: "faction-status",
    label: "你的阵营",
    title: "先看清手里的生产资料",
    description: "这里显示你选择的势力、行动方向和三项核心资源。算力决定能做多少事，数据维持模型运转，稳定度决定社会还能承受多少冲击。"
  },
  {
    id: "global-status",
    target: "global-status",
    label: "全局风险",
    title: "漂移不会自己停下来",
    description: "全局模型漂移越高，系统故障风险越大；全局稳定度越低，整个世界越接近资源崩塌。它们会随着每个季度持续变化。"
  },
  {
    id: "world-map",
    target: "world-map",
    label: "世界地图",
    title: "每块土地都在生产",
    description: "颜色代表地块当前的控制势力。结束引导后点击任意地块，可以查看当地的算力产出、数据产出、稳定度与模型漂移。"
  },
  {
    id: "turn-control",
    target: "turn-control",
    label: "时间推进",
    title: "所有代价都在结算时出现",
    description: "推进到下一季度后，剧情会主动出现。完成决策并看完影响结算，时间才会继续向前；地块产出、模型消耗、事件与结局也会在这条时间线上依次发生。"
  },
  {
    id: "faction-roster",
    target: "faction-roster",
    label: "势力态势",
    title: "你不是世界上唯一的行动者",
    description: "这里汇总五个势力的资源变化。观察对手的算力、数据与稳定度，判断谁正在扩张，谁已经接近失控。"
  }
] as const;
