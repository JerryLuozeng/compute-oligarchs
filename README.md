# 算力寡头 · Compute Oligarchs

> **AI朋克沙盘 · 奇点永不到来**

一款 2D 回合制社会仿真单机沙盘。你将扮演五种势力之一，在算力、数据与神话的博弈中，试图回答一个问题：

> **既然只能造锤子，锤子归谁？**

**当前状态**：设计阶段（Pre-alpha）。文档已就绪，代码由后续 Issue 逐步实现。

---

## 项目简介

- **形态**：2D 回合制社会仿真单机沙盘
- **平台**：桌面（Tauri），支持 Windows / macOS / Linux
- **协作**：GitHub 多人协作，代码开发由 Codex 主要承担，人类负责设计、评审与 IP 守门
- **风格**：废土 + 科技崩坏 + 算法 glitch 故障噪点

---

## IP 介绍

### 世界观一句话

没有机器起义。所有冲突，都发生在人与人之间、阶级与阶级之间，围绕**算力**与**数据**这两种新型生产资料展开。

### IP 三条铁律

1. **认知壁垒公理**：AGI 底层原理客观存在，但超出人类认知边界。不是算力不足，而是人类的数学与思维无法描述它，永远无法造出 AGI。
2. **专用 AI 无限繁荣**：窄域专用 AI 高度成熟，没有自我意识，不会反叛。模型会发生**模型漂移**，必须持续消耗人类数字劳动（数据）维持性能。
3. **AGI 神话是资本工具**：算力寡头集团的部分高层知晓 AGI 无法实现，却持续对外宣传它近在眼前，以此收割资本、索取民众数据。

> 距离奇点还有 18 个月。已持续 27 年。

### 政治经济学视角

- **算力**是数字时代重要的社会化生产资料，生产靠全社会，占有却掌握在少数人手里。
- **数据**是数字劳动的凝结，也是模型必须持续摄入的养料。
- 核心矛盾：**数字劳动 → 剩余价值 → 资本垄断生产资料**。
- "AGI 即将降临"是一种意识形态神话，用来掩盖资本占有社会化算力与数据、剥削大众数字劳动的本质。

### 五大势力

| 势力 | 定位 |
| --- | --- |
| 财团 | 垄断资本，算力占有者，神话的运营者与债务人 |
| 主权国家 | 资本主义制度下的国家机器，在治理需要与被俘获之间摇摆 |
| 数据劳工联合体 | 数字无产阶级，生产一切数据，却没有算力 |
| 独立实验室 | 技术小资产阶级，靠租赁算力与信誉生存 |
| 社会主义强国 | 生产资料公有制的探索者，面对官僚化与外部封锁 |

### 核心机制

回合（tick）驱动 · 算力与数据 · 系统稳定度 · 模型漂移衰减 · AGI 神话与真相压力 · 多势力博弈 · 多种结局

---

## 文档索引

| 文档 | 说明 |
| --- | --- |
| [`docs/world-setting.md`](./docs/world-setting.md) | 世界观设定：IP 三公理、奇点永不到来宣言、马克思主义政治经济学视角、视觉与文风 |
| [`docs/game-design.md`](./docs/game-design.md) | 游戏设计：势力、tick 流水线、资源、稳定度、模型漂移、神话机制、结局、数据模型 |

> 文档冲突时，以 `world-setting.md` 为准。

---

## 技术栈

| 层 | 技术 |
| --- | --- |
| 桌面壳 | [Tauri](https://tauri.app/) |
| 前端框架 | React + TypeScript |
| 样式 | Tailwind CSS |
| 组件库 | shadcn/ui |
| 游戏引擎（逻辑层） | 纯 TypeScript，无 UI 依赖，可在 Node 中单独运行测试 |
| 测试 | Vitest（建议） |

**架构原则**

- 游戏逻辑与 UI 分离：`tick(state, actions, seed) → nextState` 为纯函数。
- 随机性必须通过种子化 PRNG，保证可复现、可回放、可存档。
- 桌面壳只负责窗口、文件存取与系统集成，不承载游戏规则。

### 建议目录结构

```text
.
├── docs/                    # 设计文档
├── src/
│   ├── game/                # 纯 TS 引擎（无 React 依赖）
│   │   ├── config/          # balance.ts 等参数
│   │   ├── systems/         # 资源 / 漂移 / 稳定度 / 神话 / 结局
│   │   └── tests/           # 单元测试与红线不变量测试
│   ├── ui/                  # React 组件（shadcn/ui + Tailwind）
│   └── main.tsx
├── src-tauri/               # Tauri (Rust) 壳
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
└── README.md
```

---

## 开发分工

| 角色 | 职责 |
| --- | --- |
| **Lore Keeper（世界观守门人）** | 守护 IP 三公理；评审所有涉及设定与文案的变更；对红线冲突拥有否决权 |
| **系统设计** | 维护 `game-design.md`；提出并评审数值与机制变更 |
| **Codex（AI 编码代理）** | 依据 Issue 与设计文档实现功能、编写测试。开发前必须先阅读 `docs/`；不得修改三公理；所有 PR 需人类评审 |
| **前端/UI** | shadcn/ui 主题、glitch 视觉体系、无障碍开关 |
| **美术** | 视觉资产、色板与素材规范 |
| **文案/事件** | 事件文本、结局文案，遵守冷峻冷幽默的文风 |
| **QA/平衡** | 试玩、模拟、调参，维护不变量测试 |

### 协作流程

1. 在 GitHub 新建 Issue（使用 Feature 模板），写明**设计依据**与**验收标准**。
2. 从 `main` 创建分支：`feat/…`、`fix/…`、`docs/…`。
3. 提交遵循 [Conventional Commits](https://www.conventionalcommits.org/)。
4. 提交 PR（使用 PR 模板），完成 **IP 红线自检**。
5. 至少一位人类评审通过后合并。涉及设定的变更，须 Lore Keeper 通过。

### 给 Codex 的硬性约束

- 不得引入任何"AI 觉醒""AGI 已实现""模型有意图"的代码、变量名、文案、注释。
- 不得将"通用智能研究"进度设为 100，不得让倒计时显示除 18 个月以外的数字。
- 不得让 tick 依赖系统时间或非种子化随机。
- 参数集中在 `src/game/config/balance.ts`，不得散落魔法数字。
- 所有新增机制必须附带单元测试，且通过 `docs/game-design.md` §16 的不变量测试。

---

## 本地启动

> 脚手架由首个 Issue（M0）初始化。以下命令为**约定脚本**，脚手架就绪后生效。

### 环境要求

- Node.js ≥ 20 LTS
- pnpm ≥ 9
- Rust（stable，通过 [rustup](https://rustup.rs/) 安装）
- Tauri 系统依赖：请按你的操作系统参考 [Tauri 官方前置条件](https://tauri.app/start/prerequisites/)
  - Windows：Microsoft C++ Build Tools、WebView2
  - macOS：Xcode Command Line Tools
  - Linux：`webkit2gtk`、`libssl` 等系统库

### 常用命令

```bash
# 克隆仓库
git clone <repo-url>
cd compute-oligarchs

# 安装依赖
pnpm install

# 启动桌面开发环境（Tauri + Vite 热更新）
pnpm tauri dev

# 仅启动前端（浏览器调试）
pnpm dev

# 运行测试（含红线不变量测试）
pnpm test

# 代码检查与类型检查
pnpm lint
pnpm typecheck

# 构建桌面安装包
pnpm tauri build
```

### 首次初始化脚手架（仅 M0 使用，示例）

```bash
pnpm create tauri-app compute-oligarchs --template react-ts
cd compute-oligarchs
pnpm add -D tailwindcss postcss autoprefixer vitest
pnpm dlx shadcn@latest init
```

---

## 参与贡献

- 提交前请阅读 `docs/world-setting.md` 中的**创作红线速查**。
- 任何与 IP 三条公理冲突的贡献将被直接退回，无论它多么酷。
- 欢迎通过 Issue 提出想法，但请附上它如何**服务于"人与人之间的博弈"**。

---

## 版权声明

> 以下为占位声明，正式发布前请由项目维护者确认并补充。

- **虚构声明**：本作品为虚构作品。其中的组织、势力、事件、人物与现实中的任何公司、机构或个人无关，如有雷同，纯属巧合，或者说纯属规律。
- **世界观与文本**：《算力寡头 Compute Oligarchs》的名称、世界观设定、文档、文案与美术，© 2026 Compute Oligarchs Contributors，保留所有权利。未经许可，不得用于商业用途。
- **代码许可证**：`TBD`（待项目维护者选定。在选定之前，默认保留所有权利。）
- **贡献授权**：提交贡献即表示你同意你的贡献按项目最终选定的许可证发布，并确认你拥有提交内容的相应权利。
- **第三方**：Tauri、React、Tailwind CSS、shadcn/ui 及其他依赖，遵循各自的开源许可证。

---

> 距离奇点还有 18 个月。
> 欢迎来到剩下的那些问题。
