import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, Radio } from "lucide-react";
import type { FactionId } from "@/core/models/ids";
import { factionProfiles, type FactionProfile } from "@/content/factions";
import { Button } from "./button";
import "./game-flow.css";

function FactionOption({
  faction,
  selected,
  onSelect
}: {
  faction: FactionProfile;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`select-card select-card--${faction.tone} ${selected ? "select-card--selected" : ""}`}
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
    >
      <span className="select-card__code">{faction.code}</span>
      <span className="select-card__check">{selected ? <Check /> : null}</span>
      <strong>{faction.name}</strong>
      <span className="select-card__summary">{faction.summary}</span>
      <span className="select-card__divider" />
      <span className="select-card__label">优势</span>
      {faction.strengths.map((strength) => <span className="select-card__trait trait--plus" key={strength}><Plus />{strength}</span>)}
      <span className="select-card__label">代价</span>
      {faction.weaknesses.map((weakness) => <span className="select-card__trait trait--minus" key={weakness}><Minus />{weakness}</span>)}
    </button>
  );
}

export function FactionSelect({
  onBack,
  onConfirm
}: {
  onBack: () => void;
  onConfirm: (factionId: FactionId) => void;
}) {
  const [selectedId, setSelectedId] = useState<FactionId | null>(null);
  const selectedFaction = factionProfiles.find((faction) => faction.id === selectedId);

  return (
    <main className="flow-screen flow-screen--select">
      <div className="flow-noise" aria-hidden="true" />
      <div className="flow-scanline" aria-hidden="true" />
      <header className="flow-header">
        <button className="flow-back" type="button" onClick={onBack} aria-label="返回开始页面"><ArrowLeft /></button>
        <span className="flow-brand"><Radio /> FACTION AUTHORIZATION</span>
        <span className="flow-step">01 / 01</span>
      </header>

      <section className="select-heading">
        <div><p className="flow-eyebrow">SELECT CLASS POSITION</p><h1>选择你的势力</h1></div>
        <p>你选择的不是英雄，而是一组生产关系、资源约束与结构性矛盾。</p>
      </section>

      <section className="select-grid" role="radiogroup" aria-label="可选势力">
        {factionProfiles.map((faction) => (
          <FactionOption
            faction={faction}
            key={faction.id}
            selected={faction.id === selectedId}
            onSelect={() => setSelectedId(faction.id)}
          />
        ))}
      </section>

      <footer className="select-confirm">
        <div>
          <span>{selectedFaction === undefined ? "等待势力授权" : selectedFaction.name}</span>
          <p>{selectedFaction?.mandate ?? "选择一个势力以读取其行动纲领。"}</p>
        </div>
        <Button
          size="lg"
          disabled={selectedId === null}
          onClick={() => selectedId !== null && onConfirm(selectedId)}
          data-testid="confirm-faction-button"
        >
          确认选择 <ArrowRight />
        </Button>
      </footer>
    </main>
  );
}
