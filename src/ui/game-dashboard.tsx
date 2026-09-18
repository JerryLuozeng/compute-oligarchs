import { useState, type ReactNode } from "react";
import {
  Activity,
  ChevronRight,
  Cpu,
  Database,
  Radio,
  ShieldCheck,
  TriangleAlert
} from "lucide-react";
import { initialGameState } from "@/core/models/initial-state";
import type { Faction } from "@/core/models/faction";
import type { GameState } from "@/core/models/game-state";
import { tick } from "@/core/systems/tick";
import { Button } from "./button";
import { MapTiles } from "./map-tiles";
import "./game-dashboard.css";

const visibleFactionCount = 4;

const factionTone: Record<Faction["id"], string> = {
  consortium: "faction-card--lime",
  sovereign: "faction-card--orange",
  labor_union: "faction-card--cyan",
  independent_labs: "faction-card--pink",
  socialist_power: "faction-card--lime"
};

const resourceBar = (value: number): number => Math.min(100, Math.max(0, value));

function ResourceLine({
  icon,
  label,
  value,
  tone
}: {
  icon: ReactNode;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="resource-line">
      <div className="resource-line__label">
        <span className={tone}>{icon}</span>
        <span>{label}</span>
        <strong>{value.toFixed(1)}</strong>
      </div>
      <div className="resource-line__track" aria-hidden="true">
        <span className={tone} style={{ width: `${resourceBar(value)}%` }} />
      </div>
    </div>
  );
}

function FactionCard({ faction, index }: { faction: Faction; index: number }) {
  const tone = factionTone[faction.id];

  return (
    <article className={`faction-card ${tone}`} data-testid="faction-card">
      <header className="faction-card__header">
        <span className="faction-card__index">0{index + 1}</span>
        <span className="faction-card__signal" aria-hidden="true" />
        <span className="faction-card__id">{faction.id.replaceAll("_", " ")}</span>
      </header>
      <h2>{faction.name}</h2>
      <div className="faction-card__resources">
        <ResourceLine icon={<Cpu />} label="算力" value={faction.resources.compute} tone="tone-compute" />
        <ResourceLine icon={<Database />} label="数据" value={faction.resources.data} tone="tone-data" />
        <ResourceLine icon={<ShieldCheck />} label="稳定度" value={faction.resources.stability} tone="tone-stability" />
      </div>
    </article>
  );
}

export function GameDashboard() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [glitchEnabled, setGlitchEnabled] = useState(true);
  const visibleFactions = gameState.factions.slice(0, visibleFactionCount);

  const advanceTurn = () => {
    setGameState((currentState) => tick(currentState));
  };

  return (
    <main className={`dashboard-shell ${glitchEnabled ? "glitch-enabled" : ""}`}>
      <div className="dashboard-noise" aria-hidden="true" />
      <div className="dashboard-scanline" aria-hidden="true" />

      <header className="dashboard-header">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><Radio /></div>
          <div>
            <p className="eyebrow">COMPUTE ERA / CE 41</p>
            <h1>算力寡头</h1>
          </div>
        </div>
        <div className="header-status">
          <span className="status-dot" aria-hidden="true" />
          <span>观察者模式</span>
          <span className="header-divider" aria-hidden="true" />
          <button
            className="glitch-switch"
            type="button"
            aria-pressed={glitchEnabled}
            onClick={() => setGlitchEnabled((enabled) => !enabled)}
          >
            GLITCH {glitchEnabled ? "ON" : "OFF"}
          </button>
        </div>
      </header>

      <section className="dashboard-intro">
        <div>
          <p className="eyebrow eyebrow--alert"><Activity /> QUARTERLY STATE REPORT</p>
          <p className="turn-display" data-testid="turn-number">
            <span>回合</span> {String(gameState.turn).padStart(2, "0")}
          </p>
          <h2 className="dashboard-title glitch-target">生产资料是主角</h2>
          <p className="dashboard-subtitle">算力是社会化生产资料，数据是数字劳动的凝结。</p>
        </div>
        <div className="global-readout">
          <div className="global-readout__warning"><TriangleAlert /> 模型漂移监测</div>
          <div className="global-readout__value">{gameState.globalModelDrift.toFixed(1)}</div>
          <div className="global-readout__meta">
            <span>全局稳定度</span>
            <strong>{gameState.globalStability.toFixed(1)}</strong>
          </div>
        </div>
      </section>

      <section className="faction-grid" aria-label="势力资源">
        {visibleFactions.map((faction, index) => (
          <FactionCard faction={faction} index={index} key={faction.id} />
        ))}
      </section>

      <MapTiles tiles={gameState.tiles} />

      <footer className="dashboard-footer">
        <p><span className="footer-pulse" aria-hidden="true" /> 数据持续消耗。世界持续变化。</p>
        <Button type="button" size="lg" onClick={advanceTurn} data-testid="next-turn-button">
          下一回合 <ChevronRight />
        </Button>
      </footer>
    </main>
  );
}
