import type { FactionId } from "@/core/world";

export const factionBriefings: ReadonlyArray<{
  id: FactionId;
  name: string;
  position: string;
}> = [
  { id: "consortium", name: "天穹公司", position: "占有算力，经营神话，也积累神话债。" },
  { id: "sovereign", name: "寰盟", position: "多国联合起来，争取不被超国家算力资本俘获。" },
  { id: "labor_union", name: "星火工联", position: "跨国生产新鲜数据，却缺少实现其价值的算力。" },
  { id: "independent_labs", name: "独立实验室", position: "拥有知识，依赖租赁算力，在独立与依附间摇摆。" },
  { id: "socialist_power", name: "社会主义强国", position: "探索算力与数据公有，同时面对官僚化与封锁。" }
];

export const systemNotices = [
  "模型没有出错，是世界变了。",
  "本季度稳定度上升，因为投诉入口已合并。",
  "新鲜数据库存低于安全线，漂移风险正在积累。"
] as const;
