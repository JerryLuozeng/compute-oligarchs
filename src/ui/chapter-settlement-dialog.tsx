import { ArrowRight, Lightbulb, RadioTower } from "lucide-react";
import type { ChapterSettlement } from "@/content/chapter-settlements";
import "./chapter-settlement-dialog.css";

export function ChapterSettlementDialog({
  settlement,
  onContinue
}: {
  settlement: ChapterSettlement;
  onContinue: () => void;
}) {
  return (
    <div className="settlement-overlay" role="presentation">
      <section className="settlement-dialog" role="dialog" aria-modal="true" aria-labelledby="settlement-title">
        <div className="settlement-dialog__noise" aria-hidden="true" />
        <header className="settlement-dialog__header">
          <span><RadioTower /> CHAPTER ECHO / {settlement.chapter}</span>
          <span><Lightbulb /> 灯火记录</span>
        </header>
        <div className="settlement-dialog__body">
          <p className="settlement-dialog__eyebrow">章节结算</p>
          <h2 id="settlement-title" data-text={settlement.title}>{settlement.title}</h2>
          <p className="settlement-dialog__summary">{settlement.summary}</p>
          <div className="settlement-dialog__echoes">
            <p><strong>被照亮</strong>{settlement.brightest}</p>
            <p><strong>被冷落</strong>{settlement.neglected}</p>
          </div>
          <div className="settlement-dialog__statuses" aria-label="本章五灯状态">
            {settlement.statuses.map((status) => (
              <span key={status.lampName}>{status.lampName}<b>{status.status}</b></span>
            ))}
          </div>
        </div>
        <footer className="settlement-dialog__actions">
          <button type="button" onClick={onContinue}>进入下一章 <ArrowRight /></button>
        </footer>
      </section>
    </div>
  );
}
