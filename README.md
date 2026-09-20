# 算力寡头 / Compute Oligarchs

AI 朋克社会模拟沙盘原型。当前版本是一个静态网页原型，入口为 `dist/index.html`。

## 运行

在项目根目录启动静态服务器：

```powershell
python -m http.server 4173 -d dist
```

然后打开：

```text
http://127.0.0.1:4173/
```

## 当前流程

- 主菜单
- 选择阵营
- 进入地图主界面
- 点击地图区域查看区域状态
- 对区域执行命令
- 推进下一回合并触发季度事件

## 目录

- `dist/index.html`：游戏入口
- `dist/assets/game.js`：完整游戏状态与交互逻辑
- `dist/assets/game.css`：界面样式
- `dist/assets/azgaar_region_preview.png`：横向战略地图展示图
- `dist/assets/azgaar_region_id_map.png`：区域 ID 图
- `generated-map/`：地图生成来源与再生成脚本
# 算力寡头 · Compute Oligarchs

An AI-punk social simulation sandbox. The singularity never arrives.

## Stack

Tauri 2 + React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui.

## Development

```bash
pnpm install
pnpm dev
pnpm test
pnpm lint
pnpm typecheck
pnpm tauri dev
```

The desktop build requires the Rust stable toolchain and the platform prerequisites listed by Tauri.
