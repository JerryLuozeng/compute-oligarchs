import type { FactionId } from "@/core/world";

export const factionBriefings: ReadonlyArray<{
  id: FactionId;
  name: string;
  position: string;
}> = [
  { id: "consortium", name: "财团", position: "占有算力，经营神话，也积累神话债。" },
  { id: "sovereign", name: "主权国家", position: "需要算力治理，同时抵抗被算力占有者俘获。" },
  { id: "labor_union", name: "数据劳工联合体", position: "生产新鲜数据，却缺少实现其价值的算力。" },
  { id: "independent_labs", name: "独立实验室", position: "拥有知识，依赖租赁算力，在独立与依附间摇摆。" },
  { id: "socialist_power", name: "社会主义强国", position: "探索算力与数据公有，同时面对官僚化与封锁。" }
];

export const systemNotices = [
  "模型没有出错，是世界变了。",
  "本季度稳定度上升，因为投诉入口已合并。",
  "新鲜数据库存低于安全线，漂移风险正在积累。"
] as const;
