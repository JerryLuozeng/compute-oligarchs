import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, Gauge, History, MessageSquareQuote, RadioTower, TimerReset } from "lucide-react";
import type { StoryChoice, StoryEvent } from "@/content/story-events";
import { getAdvisor } from "@/content/faction-story";
import { getDecisionImpacts } from "./time-flow";
import "./event-dialog.css";
import "./story-dialog.css";

function StoryImpactPanel({
  choice,
  lifelineLabel,
  liabilityLabel,
  timeLabel,
  onContinue
}: {
  choice: StoryChoice;
  lifelineLabel: string;
  liabilityLabel: string;
  timeLabel: string;
  onContinue: () => void;
}) {
  const [ready, setReady] = useState(false);
  const continueRef = useRef<HTMLButtonElement>(null);
  const impacts = getDecisionImpacts(choice, { lifeline: lifelineLabel, liability: liabilityLabel });

  useEffect(() => {
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1400;
    const timer = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready) continueRef.current?.focus();
  }, [ready]);

  return (
    <div className="story-impact" aria-live="polite">
      <div className="story-impact__header">
        <span><Gauge /> 决策影响</span>
        <strong>{timeLabel}</strong>
      </div>
      <div className="story-impact__grid">
        {impacts.map((impact, index) => (
          <div
            className={`story-impact__item story-impact__item--${impact.tone}`}
            style={{ "--impact-delay": `${index * 180}ms` } as React.CSSProperties}
            key={impact.id}
          >
            <span>{impact.label}</span>
            <strong>{impact.value}</strong>
            <i aria-hidden="true" />
          </div>
        ))}
      </div>
      <footer className="story-dialog__continue">
        <span className={ready ? "story-impact__status story-impact__status--ready" : "story-impact__status"}>
          <TimerReset /> {ready ? "时间线已更新" : "正在写入时间线..."}
        </span>
        <button ref={continueRef} type="button" disabled={!ready} onClick={onContinue}>
          完成本期结算 <ArrowRight />
        </button>
      </footer>
    </div>
  );
}

export function StoryDialog({
  event,
  perspective,
  selectedChoice,
  lifelineLabel,
  liabilityLabel,
  timeLabel,
  legacyEcho,
  legacyNotice,
  onChoose,
  onContinue
}: {
  event: StoryEvent;
  perspective: string;
  selectedChoice: StoryChoice | null;
  lifelineLabel: string;
  liabilityLabel: string;
  timeLabel: string;
  legacyEcho?: string;
  legacyNotice?: string;
  onChoose: (choice: StoryChoice) => void;
  onContinue: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const decisionLabel = event.reactiveType === "resonance"
    ? "回响"
    : event.reactiveType === "grievance"
      ? "怨气"
      : event.reactiveType === "crisis" ? "资源危机" : "抉择";

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, [event.id, selectedChoice]);

  return (
    <div className="event-overlay" role="presentation">
      <section
        ref={dialogRef}
        className={`event-dialog story-dialog ${event.reactiveType === undefined ? "" : `story-dialog--${event.reactiveType}`}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="story-dialog-title"
        aria-describedby="story-dialog-description"
        onKeyDown={(keyboardEvent) => {
          if (keyboardEvent.key !== "Tab") return;
          const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
          if (buttons === undefined || buttons.length === 0) return;
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (keyboardEvent.shiftKey && document.activeElement === first) {
            keyboardEvent.preventDefault();
            last.focus();
          } else if (!keyboardEvent.shiftKey && document.activeElement === last) {
            keyboardEvent.preventDefault();
            first.focus();
          }
        }}
      >
        <header className="event-dialog__header">
          <span><RadioTower /> STORY SIGNAL / {event.displayCode ?? event.id}</span>
          <span className="event-dialog__theme"><i />{event.chapter}</span>
        </header>
        <div className="event-dialog__body">
          <p className="event-dialog__eyebrow"><BookOpen /> {selectedChoice === null ? decisionLabel : "后果"}</p>
          <h2 id="story-dialog-title" data-text={event.title}>{event.title}</h2>
          <p id="story-dialog-description" className="event-dialog__description">
            {selectedChoice?.outcome ?? event.description}
          </p>
          {selectedChoice === null ? <p className="story-dialog__perspective">{perspective}</p> : null}
          {selectedChoice === null && legacyEcho !== undefined ? (
            <p className="story-dialog__legacy"><History /> 历史回声：{legacyEcho}</p>
          ) : null}
          {selectedChoice !== null && legacyNotice !== undefined ? (
            <p className="story-dialog__legacy story-dialog__legacy--recorded"><History /> {legacyNotice}</p>
          ) : null}
          {selectedChoice?.advisorId === undefined ? null : (
            <p className="story-dialog__echo">
              <MessageSquareQuote /> {getAdvisor(selectedChoice.advisorId).name}会记住你的选择。
            </p>
          )}
        </div>
        {selectedChoice === null ? (
          <div className="event-dialog__options" aria-label="剧情决策">
            <div className="story-dialog__decision-bar">
              <strong>决策选项</strong>
              <span>选择将写入政策记录，并影响后续时间线</span>
            </div>
            {event.options.map((choice, index) => (
              <button type="button" key={choice.id} onClick={() => onChoose(choice)}>
                <span>决策 {String.fromCharCode(65 + index)}</span>
                <strong>{choice.text}</strong>
                {choice.advisorId === undefined || choice.advisorAdvice === undefined ? null : (
                  <small>
                    <MessageSquareQuote />
                    <span>{getAdvisor(choice.advisorId).name}：{choice.advisorAdvice}</span>
                  </small>
                )}
                <ArrowRight />
              </button>
            ))}
          </div>
        ) : <StoryImpactPanel
          choice={selectedChoice}
          lifelineLabel={lifelineLabel}
          liabilityLabel={liabilityLabel}
          timeLabel={timeLabel}
          onContinue={onContinue}
        />}
      </section>
    </div>
  );
}
