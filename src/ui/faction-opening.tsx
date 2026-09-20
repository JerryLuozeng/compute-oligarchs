import { ArrowLeft, ArrowRight, Cpu, Database, Lightbulb, Radio, ShieldCheck } from "lucide-react";
import { factionRoutes, createFactionArcState } from "@/content/faction-routes";
import { getFactionProfile } from "@/content/factions";
import { initialGameState } from "@/core/models/initial-state";
import type { FactionId } from "@/core/models/ids";
import { Button } from "./button";
import "./faction-opening.css";

export function FactionOpening({
  factionId,
  onBack,
  onContinue
}: {
  factionId: FactionId;
  onBack: () => void;
  onContinue: () => void;
}) {
  const profile = getFactionProfile(factionId);
  const route = factionRoutes[factionId];
  const faction = initialGameState.factions.find((candidate) => candidate.id === factionId);
  const arc = createFactionArcState(initialGameState, factionId);

  if (faction === undefined) return null;

  return (
    <main className={`flow-screen faction-opening faction-opening--${profile.tone}`}>
      <div className="flow-noise" aria-hidden="true" />
      <div className="flow-scanline" aria-hidden="true" />
      <header className="flow-header faction-opening__header">
        <button className="flow-back" type="button" onClick={onBack} aria-label="返回势力选择"><ArrowLeft /></button>
        <span className="flow-brand"><Radio /> GOVERNANCE BRIEFING / {profile.code}</span>
        <span className="flow-step">序章 / 00</span>
      </header>

      <div className="faction-opening__layout">
        <section className="faction-opening__story" aria-labelledby="opening-title">
          <p className="flow-eyebrow"><Lightbulb /> {profile.name}</p>
          <h1 id="opening-title" data-text={route.title}>{route.title}</h1>
          <p className="faction-opening__theme">{route.theme}</p>
          <div className="faction-opening__passage">
            {route.opening.map((line) => <p key={line}>{line}</p>)}
          </div>
          <p className="faction-opening__playstyle">{route.playstyle}</p>
          <Button type="button" size="lg" onClick={onContinue} data-testid="enter-game-button">
            确认授权并进入地图 <ArrowRight />
          </Button>
        </section>

        <aside className="faction-opening__ledger" aria-label="开局禀赋">
          <p>INITIAL LEDGER / {profile.code}</p>
          <h2>治理基线</h2>
          <section className="faction-opening__ledger-group">
            <h3>初始资源</h3>
            <div className="faction-opening__metrics">
              <span><Cpu />算力 <strong>{faction.resources.compute.toFixed(1)}</strong></span>
              <span><Database />数据 <strong>{faction.resources.data.toFixed(1)}</strong></span>
              <span><ShieldCheck />稳定度 <strong>{faction.resources.stability.toFixed(1)}</strong></span>
            </div>
          </section>
          <section className="faction-opening__ledger-group faction-opening__ledger-group--arc">
            <h3>长期轨迹</h3>
            <div className="faction-opening__arc">
              <span>命脉 / {route.lifeline}<strong>{arc.lifeline.toFixed(0)}</strong></span>
              <span>隐患 / {route.liability}<strong>{arc.liability.toFixed(0)}</strong></span>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
