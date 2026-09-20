import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const source = fileURLToPath(new URL("./story-source.md", import.meta.url));
const destination = fileURLToPath(new URL("./story-events.json", import.meta.url));
const text = readFileSync(source, "utf8").replaceAll("\r\n", "\n");
const main = text.split("## 七、新增随机事件合集\n")[1]?.split("## 八、轻量小事件")[0];
const small = text.split("## 八、轻量小事件")[1]?.split("## 九、滚动新闻")[0];

if (main === undefined || small === undefined) throw new Error("Story sections not found");

const chapters = ["序章", "第一章", "第二章", "第三章", "第四章", "终章"];
const events = [];
let chapter = "";
let current;
let option;

for (const line of main.split("\n")) {
  const chapterMatch = line.match(/^### (序章|第一章|第二章|第三章|第四章|终章)/);
  if (chapterMatch) chapter = chapterMatch[1];

  const heading = line.match(/^#### (P1|E\d{2}(?:′)?)《([^》]+)》/);
  if (heading) {
    current = { id: heading[1], chapter, title: heading[2], description: "", options: [] };
    events.push(current);
    option = undefined;
  }

  if (current === undefined) continue;
  const description = line.match(/^\*\*描述\*\*：(.+)$/);
  if (description) current.description = description[1];

  const choice = line.match(/^\*\*([ABC])(?:（可选）)?：(.+)\*\*$/);
  if (choice) {
    option = { id: choice[1], text: choice[2], outcome: "" };
    current.options.push(option);
  }

  const outcome = line.match(/^→ (.+)$/);
  if (outcome && option !== undefined) option.outcome = outcome[1];
}

let minor;
for (const line of small.split("\n")) {
  const heading = line.match(/^\*\*(M\d{2})《([^》]+)》\*\*$/);
  if (heading) {
    minor = { id: heading[1], chapter: "任意", title: heading[2], description: "", options: [] };
    events.push(minor);
    continue;
  }
  if (minor === undefined || line.length === 0 || line.startsWith(">")) continue;
  const choice = line.match(/^([AB])：(.+?) → (.+)$/);
  if (choice) minor.options.push({ id: choice[1], text: choice[2], outcome: choice[3] });
  else if (minor.description === "") minor.description = line;
}

const ids = new Set(events.map((event) => event.id));
if (events.length !== 51 || ids.size !== 51 || events.some((event) =>
  event.description === "" || !chapters.includes(event.chapter) && event.chapter !== "任意"
  || event.options.length < 2 || event.options.some((choice) => !choice.text || !choice.outcome)
)) throw new Error("Story source contains incomplete or duplicate events");

writeFileSync(destination, `${JSON.stringify(events, null, 2)}\n`, "utf8");
