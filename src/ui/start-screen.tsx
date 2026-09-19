import { useState } from "react";
import { ArrowRight, FolderOpen, Info, Play, Radio, Settings, TriangleAlert } from "lucide-react";
import type { SavedGame, SaveSlot } from "./save-slots";
import { readSaveSlots } from "./save-slots";
import { AboutDialog, LoadGameDialog, SettingsDialog } from "./home-panels";
import "./game-flow.css";

type HomePanel = "load" | "settings" | "about" | null;

const tutorialStorageKey = "compute-oligarchs.tutorial-complete";

export function StartScreen({
  onLoad,
  onStart
}: {
  onLoad: (savedGame: SavedGame) => void;
  onStart: () => void;
}) {
  const [activePanel, setActivePanel] = useState<HomePanel>(null);
  const [saveSlots, setSaveSlots] = useState<readonly SaveSlot[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [resetStatus, setResetStatus] = useState("清除已完成的引导步骤");

  const openLoadPanel = () => {
    setSaveSlots(readSaveSlots(window.localStorage));
    setActivePanel("load");
  };

  return (
    <main className="flow-screen flow-screen--start">
      <div className="flow-noise" aria-hidden="true" />
      <div className="flow-scanline" aria-hidden="true" />
      <header className="flow-header">
        <span className="flow-brand"><Radio /> COMPUTE ERA / CE 41</span>
        <span className="flow-signal"><i /> NETWORK DEGRADED</span>
      </header>

      <section className="start-stage">
        <div className="signal-array" aria-hidden="true">
          {Array.from({ length: 30 }, (_, index) => (
            <span key={index} style={{ opacity: 0.12 + (index % 7) * 0.1 }} />
          ))}
          <div className="signal-array__readout">
            <span>SINGULARITY ETA</span>
            <strong>18</strong>
            <span>MONTHS / AUTO-RENEWED</span>
          </div>
        </div>

        <div className="start-stage__copy">
          <p className="flow-eyebrow"><TriangleAlert /> SYSTEM OWNERSHIP DISPUTE</p>
          <h1 data-text="算力寡头">算力寡头</h1>
          <p className="start-stage__english">COMPUTE OLIGARCHS</p>
          <p className="start-stage__statement">机器从未想要过什么。想要的，一直是坐在机房上面的人。</p>
          <nav className="start-menu" aria-label="主菜单">
            <button type="button" onClick={onStart} data-testid="start-game-button">
              <span>01</span><Play /><strong>开始游戏</strong><ArrowRight />
            </button>
            <button type="button" onClick={openLoadPanel}>
              <span>02</span><FolderOpen /><strong>载入游戏</strong><ArrowRight />
            </button>
            <button type="button" onClick={() => setActivePanel("settings")}>
              <span>03</span><Settings /><strong>游戏设置</strong><ArrowRight />
            </button>
            <button type="button" onClick={() => setActivePanel("about")}>
              <span>04</span><Info /><strong>关于我们</strong><ArrowRight />
            </button>
          </nav>
        </div>
      </section>

      <footer className="flow-footer">
        <span>专用模型在线</span><span>数据劳动持续输入</span><span>奇点不会到来</span>
      </footer>

      {activePanel === "load" ? (
        <LoadGameDialog slots={saveSlots} onClose={() => setActivePanel(null)} onLoad={onLoad} />
      ) : null}
      {activePanel === "settings" ? (
        <SettingsDialog
          soundEnabled={soundEnabled}
          resetStatus={resetStatus}
          onClose={() => setActivePanel(null)}
          onToggleSound={() => setSoundEnabled((enabled) => !enabled)}
          onResetGuide={() => {
            window.localStorage.removeItem(tutorialStorageKey);
            setResetStatus("引导记录已重置");
          }}
        />
      ) : null}
      {activePanel === "about" ? <AboutDialog onClose={() => setActivePanel(null)} /> : null}
    </main>
  );
}
