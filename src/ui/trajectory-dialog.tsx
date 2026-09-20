import { useEffect, useRef } from "react";
import { Activity, BookOpen, Crosshair, GitBranch, MessageSquareQuote, X } from "lucide-react";
import type { FactionId } from "@/core/models/ids";
import type { StrategicActionState } from "@/core/systems/strategic-actions";
import type { AdvisorRelationshipState } from "@/content/advisor-system";
import { getDynamicCrisisDecisionLabel } from "@/content/dynamic-crises";
import { runtimeGameEvents, type EventDecisionState } from "@/content/event-runtime";
import { getFactionAdvisors, type AdvisorTrustState } from "@/content/faction-story";
import { getInterestPressureLevel, type InterestPressureState } from "@/content/interest-pressure";
import { lampDefinitions } from "@/content/lamps";
import { policyLegacyDefinitions, type PolicyLegacyState, type PolicyLegacyStatus } from "@/content/policy-legacies";
import { getTimeCoordinate } from "./time-flow";
import "./trajectory-dialog.css";

const pressureLabels = {
  stable: "可控",
  strained: "承压",
  crisis: "危机",
  breaking: "断裂"
} as const;

const policyStatusLabels: Record<PolicyLegacyStatus, string> = {
  active: "兑现中",
  honored: "已兑现",
  broken: "已背离",
  superseded: "已取代"
};

const actionLabels: Record<StrategicActionState["history"][number]["type"], string> = {
  investigate: "调查",
  audit: "审计",
  invest: "投资",
  negotiate: "协商",
  mobilize: "动员",
  publish: "公开"
};

const decisionLabel = (eventId: string, optionId: string) => {
  const dynamic = getDynamicCrisisDecisionLabel(eventId, optionId);
  if (dynamic !== undefined) return dynamic;
  const event = runtimeGameEvents.find((candidate) => candidate.id === eventId);
  const selectedOption = event?.options.find((candidate) => candidate.id === optionId);
  return event === undefined || selectedOption === undefined
    ? { eventTitle: eventId, optionText: optionId }
    : { eventTitle: event.title, optionText: selectedOption.text };
};

export function TrajectoryDialog({
  factionId,
  pressures,
  policies,
  actions,
  advisorTrust,
  advisorRelationships,
  eventDecisions,
  onClose
}: {
  factionId: FactionId;
  pressures: InterestPressureState;
  policies: PolicyLegacyState;
  actions: StrategicActionState;
  advisorTrust: AdvisorTrustState;
  advisorRelationships: AdvisorRelationshipState;
  eventDecisions: EventDecisionState;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const advisors = getFactionAdvisors(factionId);
  const recentActions = actions.history.slice(-6).reverse();
  const recentDecisions = eventDecisions.records.slice(-6).reverse();

  useEffect(() => closeRef.current?.focus(), []);

  return (
    <div className="event-overlay" role="presentation">
      <section
        className="trajectory-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="trajectory-title"
        onKeyDown={(event) => { if (event.key === "Escape") onClose(); }}
      >
        <header className="trajectory-dialog__header">
          <span><GitBranch /> HISTORICAL TRAJECTORY</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="关闭历史态势"><X /></button>
        </header>

        <div className="trajectory-dialog__intro">
          <p>长期后果</p>
          <h2 id="trajectory-title">历史态势</h2>
          <span>每次分配、承诺和危机处理都在改变最终社会形态。</span>
        </div>

        <section className="trajectory-dialog__pressures" aria-label="五灯社会压力">
          {lampDefinitions.map((lamp) => {
            const pressure = pressures.pressures[lamp.id];
            const level = getInterestPressureLevel(pressure);
            return (
              <article className={`trajectory-pressure trajectory-pressure--${level}`} key={lamp.id}>
                <div><span>{lamp.shortName}</span><strong>{pressureLabels[level]}</strong></div>
                <i aria-hidden="true"><b style={{ width: `${pressure}%` }} /></i>
                <small>{pressure.toFixed(0)} / 100</small>
              </article>
            );
          })}
        </section>

        <div className="trajectory-dialog__columns">
          <section>
            <h3><BookOpen />政策遗产</h3>
            {policies.records.length === 0 ? <p className="trajectory-dialog__empty">尚未形成关键历史承诺。</p> : (
              <ul className="trajectory-dialog__ledger">
                {policies.records.map((record) => {
                  const definition = policyLegacyDefinitions[record.id];
                  return <li key={record.id}>
                    <span>{definition.title}<small>{definition.description}</small></span>
                    <strong data-status={record.status}>{policyStatusLabels[record.status]}</strong>
                  </li>;
                })}
              </ul>
            )}
          </section>

          <section>
            <h3><MessageSquareQuote />顾问关系</h3>
            <ul className="trajectory-dialog__ledger">
              {advisors.map((advisor) => {
                const rejected = advisorRelationships.history.filter((record) =>
                  record.advisorId === advisor.id && record.reason === "advice-rejected"
                ).length;
                return <li key={advisor.id}>
                  <span>{advisor.name}<small>{advisor.principle} / 意见落空 {rejected} 次</small></span>
                  <strong>{advisorTrust[advisor.id]}</strong>
                </li>;
              })}
            </ul>
          </section>

          <section>
            <h3><Crosshair />治理部署</h3>
            {recentActions.length === 0 ? <p className="trajectory-dialog__empty">尚未留下治理部署记录。</p> : (
              <ul className="trajectory-dialog__timeline">
                {recentActions.map((record) => <li key={record.id}>
                  <span>{getTimeCoordinate(record.turn).compactLabel}</span><strong>{actionLabels[record.type]}</strong><small>{record.targetId}</small>
                </li>)}
              </ul>
            )}
          </section>

          <section>
            <h3><Activity />事件与危机决策</h3>
            {recentDecisions.length === 0 ? <p className="trajectory-dialog__empty">尚未留下事件决策记录。</p> : (
              <ul className="trajectory-dialog__timeline">
                {recentDecisions.map((record) => {
                  const label = decisionLabel(record.eventId, record.optionId);
                  return <li key={`${record.turn}-${record.eventId}`}>
                    <span>{record.origin === "dynamic" ? "危机" : getTimeCoordinate(record.turn).compactLabel}</span>
                    <strong>{label.eventTitle}</strong><small>{label.optionText}</small>
                  </li>;
                })}
              </ul>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
