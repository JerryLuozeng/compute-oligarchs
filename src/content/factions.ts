import type { FactionId } from "@/core/models/ids";

export interface FactionProfile {
  id: FactionId;
  code: string;
  name: string;
  summary: string;
  mandate: string;
  strengths: readonly string[];
  weaknesses: readonly string[];
  tone: "lime" | "orange" | "cyan" | "pink" | "red";
}

export const factionProfiles: readonly FactionProfile[] = [
  {
    id: "consortium",
    code: "CORP-01",
    name: "财团",
    summary: "垄断算力集群与平台入口，以永不兑现的奇点承诺维持资本扩张。",
    mandate: "让每一份社会化生产能力继续以私人资产的名义运转。",
    strengths: ["初始算力储备最高", "资源调度与融资能力强"],
    weaknesses: ["高度依赖新鲜数据", "神话债务持续累积"],
    tone: "lime"
  },
  {
    id: "sovereign",
    code: "STATE-02",
    name: "主权国家",
    summary: "在治理需求、税基与平台渗透之间维持摇摆的国家机器。",
    mandate: "维持基础设施、财政能力与政治稳定之间的脆弱平衡。",
    strengths: ["稳定度与治理工具充足", "可调用公共数据储备"],
    weaknesses: ["容易遭受资本俘获", "决策受政治周期牵制"],
    tone: "orange"
  },
  {
    id: "labor_union",
    code: "LABOR-03",
    name: "数据劳工联合体",
    summary: "由标注员、内容审核者与被平台抽取数据的人组成的数字劳动联盟。",
    mandate: "让数据生产者取得对劳动成果、模型用途和分配方式的决定权。",
    strengths: ["新鲜数据生产能力强", "组织度可转化为集体行动"],
    weaknesses: ["初始算力接入极低", "内部诉求容易分化"],
    tone: "cyan"
  },
  {
    id: "independent_labs",
    code: "LABS-04",
    name: "独立实验室",
    summary: "掌握专业知识却缺少生产资料，在公共研究与资本租约之间寻找空间。",
    mandate: "证明知识可以脱离平台地租存在，但无法脱离真实劳动与物质条件。",
    strengths: ["研究信誉与技术弹性高", "能快速识别模型失效"],
    weaknesses: ["算力与数据库存不足", "长期依赖外部租赁"],
    tone: "pink"
  },
  {
    id: "socialist_power",
    code: "PUBLIC-05",
    name: "社会主义强国",
    summary: "尝试以公共所有和计划调度协调算力、能源、数据与维护劳动。",
    mandate: "使社会化生产与社会化占有相一致，同时抵抗封锁与官僚化。",
    strengths: ["公共算力基础雄厚", "资源稳定性与抗封锁能力强"],
    weaknesses: ["存在官僚化风险", "外部技术封锁压力长期存在"],
    tone: "red"
  }
] as const;

export const getFactionProfile = (id: FactionId): FactionProfile => {
  const profile = factionProfiles.find((faction) => faction.id === id);

  if (profile === undefined) {
    throw new Error(`Unknown faction profile: ${id}`);
  }

  return profile;
};
