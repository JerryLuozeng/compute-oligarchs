import { ArrowRight, History, RadioTower } from "lucide-react";
import type { ChapterSettlement } from "@/content/chapter-settlements";
import { lampStatusLabels } from "@/content/lamps";
import "./chapter-settlement-dialog.css";

const getStatusTone = (status: string): "bright" | "steady" | "neglected" => {
  if (status === lampStatusLabels.brightest) return "bright";
  if (status === lampStatusLabels.neglected) return "neglected";
  return "steady";
};

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
        <header className="settlement-dialog__header">
          <span><RadioTower /> CHAPTER SETTLEMENT / {settlement.chapter}</span>
          <span><History /> 治理轨迹已归档</span>
        </header>
        <div className="settlement-dialog__body">
          <p className="settlement-dialog__eyebrow">章节治理结果</p>
          <h2 id="settlement-title" data-text={settlement.title}>{settlement.title}</h2>
          <p className="settlement-dialog__summary">{settlement.summary}</p>
          <div className="settlement-dialog__echoes">
            <p><strong>持续获得照料</strong>{settlement.brightest}</p>
            <p><strong>持续等待回应</strong>{settlement.neglected}</p>
          </div>
          <div className="settlement-dialog__status-heading">
            <strong>五灯结果</strong>
            <span>本章长期分配倾向</span>
          </div>
          <div className="settlement-dialog__statuses" aria-label="本章五灯状态">
            {settlement.statuses.map((status) => (
              <span className={`is-${getStatusTone(status.status)}`} key={status.lampName}>
                <i aria-hidden="true" />
                <strong>{status.lampName}</strong>
                <b>{status.status}</b>
              </span>
            ))}
          </div>
        </div>
        <footer className="settlement-dialog__actions">
          <span>本章选择将继续影响后续事件与社会压力。</span>
          <button type="button" onClick={onContinue}>确认结算，进入下一章 <ArrowRight /></button>
        </footer>
      </section>
    </div>
  );
}
