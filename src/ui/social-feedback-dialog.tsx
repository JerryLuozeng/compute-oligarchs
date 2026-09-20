import type { CSSProperties } from "react";
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

const pressureThresholds = [
  { value: 25, label: "承压" },
  { value: 50, label: "危机" },
  { value: 75, label: "断裂" }
] as const;

const getTrend = (delta: number): { label: string; tone: "rising" | "easing" | "steady" } => {
  if (delta > 0) return { label: "压力上升", tone: "rising" };
  if (delta < 0) return { label: "压力缓解", tone: "easing" };
  return { label: "压力持平", tone: "steady" };
};

const getThresholdNote = (pressure: number): string => {
  const next = pressureThresholds.find((threshold) => pressure < threshold.value);
  return next === undefined
    ? "已进入断裂区间"
    : `距${next.label}阈值 ${Math.ceil(Math.max(0, next.value - pressure))}`;
};

export function SocialFeedbackDialog({
  feedback,
  onContinue
}: {
  feedback: readonly InterestFeedback[];
  onContinue: () => void;
}) {
  const criticalCount = feedback.filter((item) => item.level === "crisis" || item.level === "breaking").length;
  const pressuredCount = feedback.filter((item) => item.level !== "stable").length;
  const systemStatus = criticalCount > 0
    ? `${criticalCount} 个危机方向`
    : pressuredCount > 0 ? `${pressuredCount} 个方向承压` : "系统仍可协调";

  return (
    <div className="event-overlay" role="presentation">
      <section className="social-feedback-dialog" role="alertdialog" aria-modal="true" aria-labelledby="social-feedback-title">
        <header>
          <span><Radio /> SOCIAL RESPONSE</span>
          <strong className={criticalCount > 0 ? "is-critical" : pressuredCount > 0 ? "is-pressured" : ""}>
            <TriangleAlert /> {systemStatus}
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
            const trend = getTrend(item.delta);
            return (
              <article
                className={`social-feedback-dialog__item social-feedback-dialog__item--${item.level}`}
                style={{ "--pressure-progress": `${item.pressure}%` } as CSSProperties}
                key={item.lampId}
              >
                <div>
                  <span>{definition.shortName}</span>
                  <strong>{levelLabels[item.level]}</strong>
                </div>
                <p>{item.summary}</p>
                <div
                  className="social-feedback-dialog__meter"
                  role="progressbar"
                  aria-label={`${definition.shortName}社会压力`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={item.pressure}
                >
                  <i />
                  {pressureThresholds.map((threshold) => (
                    <span style={{ left: `${threshold.value}%` }} key={threshold.value} aria-hidden="true" />
                  ))}
                </div>
                <footer>
                  <span>社会压力</span>
                  <strong>{item.pressure.toFixed(0)}</strong>
                  <i className={`is-${trend.tone}`}>
                    {trend.label} {item.delta > 0 ? "+" : ""}{item.delta.toFixed(0)}
                  </i>
                  <small>{getThresholdNote(item.pressure)}</small>
                </footer>
              </article>
            );
          })}
        </div>
        <footer className="social-feedback-dialog__continue">
          <span>压力达到 25 / 50 / 75 时，将依次进入承压、危机与断裂阶段。</span>
          <button type="button" onClick={onContinue}>确认反馈，继续结算 <ArrowRight /></button>
        </footer>
      </section>
    </div>
  );
}
