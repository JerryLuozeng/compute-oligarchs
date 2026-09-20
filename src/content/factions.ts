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
    name: "天穹公司",
    summary: "手握海量云端服务器的巨型商业集团，依靠庞大人力源源不断生产数据，优先追逐资源收益。",
    mandate: "扩大云端版图，把每一份数据和算力都变成可持续收益。",
    strengths: ["开局算力资源丰厚", "数据产出稳定", "资金储备充足"],
    weaknesses: ["底层人员满意度容易下滑", "容易触发监管限制", "模型失控风险上升更快"],
    tone: "lime"
  },
  {
    id: "sovereign",
    code: "STATE-02",
    name: "寰盟",
    summary: "跨区域公共治理主体，依靠规则约束算力与数据流动，优先维持整个数字系统稳定。",
    mandate: "用规则和公共调度守住数字社会的基本秩序。",
    strengths: ["整体稳定性上限高", "抵御突发危机能力强", "可以出台管制政策规避风险"],
    weaknesses: ["算力扩张速度偏慢", "收集数据效率一般", "调整发展方向代价高昂"],
    tone: "orange"
  },
  {
    id: "labor_union",
    code: "LABOR-03",
    name: "星火工联",
    summary: "由一线数据工作者组成，掌握原始数据生产源头，希望争取更好的生存与劳动条件。",
    mandate: "让生产数据的一线劳动者获得应有的报酬与决定权。",
    strengths: ["获取原始数据能力强", "劳工相关事件更容易获得有利选项", "稳定性容错空间更大"],
    weaknesses: ["算力底子薄弱", "容易遭到资本势力打压", "发展周期漫长"],
    tone: "cyan"
  },
  {
    id: "independent_labs",
    code: "LABS-04",
    name: "棱镜开源社",
    summary: "独立程序员、算法研究者组成的团体，主张算力与算法公开共享，反抗大企业资源垄断。",
    mandate: "拆开技术高墙，让算法、算力和知识成为可共享的工具。",
    strengths: ["抵抗模型失控能力更强", "开源相关事件收益高", "自身稳定性不容易崩盘"],
    weaknesses: ["初始资源匮乏", "容易被大企业封锁算力", "短期产出能力弱"],
    tone: "pink"
  },
  {
    id: "socialist_power",
    code: "PUBLIC-05",
    name: "赤衡共同体",
    summary: "以公共利益为导向，统筹建设算力基础设施，平衡发展速度与全民稳定，防范资本无序扩张。",
    mandate: "以公共利益统筹长期建设，让发展成果覆盖每一个人。",
    strengths: ["全民稳定度天然偏高", "统筹调配资源", "抗大型危机能力极强", "可以平稳推进长期算力基建"],
    weaknesses: ["短期算力扩张速度有限", "资源分配需要权衡多方诉求", "转型改革成本较高"],
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
