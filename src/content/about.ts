export interface CreditEntry {
  role: string;
  name: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  version: string;
  overview: string;
  credits: readonly CreditEntry[];
}

export const aboutContent: AboutContent = {
  title: "算力寡头",
  subtitle: "COMPUTE OLIGARCHS",
  version: "0.1.0",
  overview:
    "算力历 41 年，专用模型支撑着城市运转，也持续吞食新鲜数据。奇点倒计时仍停在 18 个月。真正的争夺从来不是机器是否醒来，而是谁占有算力、谁生产数据、谁分得成果。",
  credits: [
    { role: "项目发起", name: "JerryLuozeng" },
    { role: "世界观与设计", name: "《算力寡头》制作组" },
    { role: "协作开发", name: "Codex" }
  ]
};
