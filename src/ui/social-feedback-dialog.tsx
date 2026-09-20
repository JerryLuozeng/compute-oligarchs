import { ArrowRight, Radio, TriangleAlert } from "lucide-react";
import { lampDefinitions, type LampId } from "@/content/lamps";
import type { InterestFeedback } from "@/content/interest-pressure";
import "./social-feedback-dialog.css";

const levelLabels = {
  stable: "可控",
  strained: "承压",
  crisis: "危机",
  breaking: "断裂"
} as const;

const definitions = Object.fromEntries(
  lampDefinitions.map((definition) => [definition.id, definition])
) as Record<LampId, (typeof lampDefinitions)[number]>;

export function SocialFeedbackDialog({
  feedback,
  onContinue
}: {
  feedback: readonly InterestFeedback[];
  onContinue: () => void;
}) {
  const criticalCount = feedback.filter((item) => item.level === "crisis" || item.level === "breaking").length;

  return (
    <div className="event-overlay" role="presentation">
      <section className="social-feedback-dialog" role="alertdialog" aria-modal="true" aria-labelledby="social-feedback-title">
        <header>
          <span><Radio /> SOCIAL RESPONSE</span>
          <strong className={criticalCount > 0 ? "is-critical" : ""}>
            <TriangleAlert /> {criticalCount > 0 ? `${criticalCount} 个危机方向` : "系统仍可协调"}
          </strong>
        </header>
        <div className="social-feedback-dialog__intro">
          <p>季度社会反馈</p>
          <h2 id="social-feedback-title">每一盏灯都有人在等待</h2>
          <span>本季度分配、行动和历史承诺共同改变了五种利益方向的压力。</span>
        </div>
        <div className="social-feedback-dialog__grid">
          {feedback.map((item) => {
            const definition = definitions[item.lampId];
            return (
              <article className={`social-feedback-dialog__item social-feedback-dialog__item--${item.level}`} key={item.lampId}>
                <div>
                  <span>{definition.shortName}</span>
                  <strong>{levelLabels[item.level]}</strong>
                </div>
                <p>{item.summary}</p>
                <footer>
                  <span>社会压力</span>
                  <strong>{item.pressure.toFixed(0)}</strong>
                  <i>{item.delta > 0 ? "+" : ""}{item.delta.toFixed(0)}</i>
                </footer>
              </article>
            );
          })}
        </div>
        <footer className="social-feedback-dialog__continue">
          <span>压力达到 25 / 50 / 75 时，将依次进入承压、危机与断裂阶段。</span>
          <button type="button" onClick={onContinue}>接收后续反馈 <ArrowRight /></button>
        </footer>
      </section>
    </div>
  );
}
