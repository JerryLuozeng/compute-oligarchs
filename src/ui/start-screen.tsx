import { ArrowRight, Radio, TriangleAlert } from "lucide-react";
import { Button } from "./button";
import "./game-flow.css";

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="flow-screen flow-screen--start">
      <div className="flow-noise" aria-hidden="true" />
      <div className="flow-scanline" aria-hidden="true" />
      <header className="flow-header">
        <span className="flow-brand"><Radio /> COMPUTE ERA / CE 41</span>
        <span className="flow-signal"><i /> NETWORK DEGRADED</span>
      </header>

      <section className="start-stage">
        <div className="start-stage__copy">
          <p className="flow-eyebrow"><TriangleAlert /> SYSTEM OWNERSHIP DISPUTE</p>
          <h1 data-text="算力寡头">算力寡头</h1>
          <p className="start-stage__english">COMPUTE OLIGARCHS</p>
          <p className="start-stage__statement">机器从未想要过什么。想要的，一直是坐在机房上面的人。</p>
          <Button size="lg" onClick={onStart} data-testid="start-game-button">
            开始游戏 <ArrowRight />
          </Button>
        </div>

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
      </section>

      <footer className="flow-footer">
        <span>专用模型在线</span><span>数据劳动持续输入</span><span>奇点不会到来</span>
      </footer>
    </main>
  );
}
