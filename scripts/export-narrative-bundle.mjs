import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8").replaceAll("\r\n", "\n").trim();
const storyEvents = JSON.parse(read("src/content/story-events.json"));

const sourceSections = [
  ["势力展示文案", "src/content/factions.ts", "ts"],
  ["势力开场与路线主题", "src/content/faction-routes.ts", "ts"],
  ["顾问资料与势力专属剧情", "src/content/faction-story.ts", "ts"],
  ["主线选择规则与章节配额", "src/content/story-events.ts", "ts"],
  ["五灯共鸣、冷落与资源危机", "src/content/reactive-story.ts", "ts"],
  ["条件触发事件与数值效果", "src/content/events.ts", "ts"],
  ["玩家行为生成的动态危机", "src/content/dynamic-crises.ts", "ts"],
  ["历史承诺与兑现/背离", "src/content/policy-legacies.ts", "ts"],
  ["顾问立场、信息失真与信任", "src/content/advisor-system.ts", "ts"],
  ["五灯定义", "src/content/lamps.ts", "ts"],
  ["利益压力与社会反馈", "src/content/interest-pressure.ts", "ts"],
  ["章节总结文案", "src/content/chapter-settlements.ts", "ts"],
  ["主动行动文案", "src/content/strategic-actions.ts", "ts"],
  ["全部结局与判定规则", "src/content/endings.ts", "ts"],
  ["开局简报与系统消息", "src/content/briefing.ts", "ts"],
  ["游戏简介与制作信息", "src/content/about.ts", "ts"],
  ["新版基础设施区域命名与初始归属", "src/core/models/initial-state.ts", "ts"]
];

const lines = [
  "# 《算力寡头》剧情修改完整资料包",
  "",
  "> 生成来源：当前仓库实际运行代码。不要使用旧版 `src/content/story-source.md` 作为权威来源。",
  "> 本文用于交给外部模型统一修改剧情；包含完整剧情正文、事件、顾问、历史承诺、社会反馈与结局条件。",
  "",
  "## 给剧情修改者的约束",
  "",
  "1. 可以修改标题、描述、选项文字、结果文字、顾问台词和结局文案。",
  "2. 除非明确要求同步改代码，否则必须保留事件 `id`、选项 `id`、章节、触发字段、数值效果和条件结构。",
  "3. 五个正式展示名固定为：天穹财阀、联邦管委会、星火劳工团、棱镜开源社、赤衡共同体。",
  "4. 核心概念固定为：算力、数据、稳定度、模型漂移、电力、五灯、历史承诺、政策债务。",
  "5. 地图已经废除旧六地块设定，现为 30 个算力与电力基础设施区域；不要再写成六个核心地块。",
  "6. 不要把选择写成明显的正确/错误答案。每个方案都应有即时收益、承担者和延迟代价。",
  "7. 日常语言应通俗、具体、可视化；避免抽象学术口号堆叠。",
  "8. 若返回修改稿，请按原事件 ID 分节，明确列出替换后的 `title`、`description`、`option text`、`outcome`，不要擅自新增无法映射的 ID。",
  "",
  "## 当前剧情运行顺序",
  "",
  "`基础设施结算 -> 主线/势力/响应剧情 -> 玩家决策 -> 历史承诺与顾问信任 -> 3点治理行动 -> 五灯压力与社会反馈 -> 条件事件或动态危机 -> 章节总结 -> 下一季度`",
  "",
  "同一局不会播放全部内容。章节配额、前置选择、五灯状态、资源状态、历史承诺和玩家行动共同决定实际出现的事件。",
  "",
  "## A. 六章公共主线与轻量事件（完整正文）",
  ""
];

for (const event of storyEvents) {
  lines.push(`### [${event.chapter}] ${event.id}《${event.title}》`, "", event.description, "");
  for (const option of event.options) {
    lines.push(`- **${option.id}：${option.text}**`, `  - 结果：${option.outcome}`);
  }
  lines.push("");
}

lines.push(
  "## B. 其余权威剧情与规则源码",
  "",
  "以下内容保留源码结构，是为了让修改者准确看到触发条件、机械效果及相互依赖。只改文案时不要修改类型、ID、字段名和数值。",
  ""
);

for (const [title, path, language] of sourceSections) {
  lines.push(`### ${title}`, "", `来源：\`${path}\``, "", `\`\`\`\`${language}`, read(path), "````", "");
}

lines.push(
  "## C. 返回稿建议格式",
  "",
  "```markdown",
  "## 修改总原则",
  "...",
  "",
  "## E01 倒计时又重置了",
  "- title: ...",
  "- description: ...",
  "- option A text: ...",
  "- option A outcome: ...",
  "- option B text: ...",
  "- option B outcome: ...",
  "",
  "## dynamic-labor-rupture 无声班次",
  "...",
  "```",
  ""
);

const output = resolve(root, "docs/narrative-revision-bundle.md");
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${lines.join("\n")}\n`, "utf8");
console.log(`Wrote ${output}`);
