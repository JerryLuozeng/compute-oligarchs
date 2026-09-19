import { useEffect, useRef } from "react";
import { Activity, ArrowRight, RadioTower, TriangleAlert } from "lucide-react";
import type { RuntimeGameEvent, RuntimeGameEventOption } from "@/content/event-runtime";
import "./event-dialog.css";

const themeLabel: Record<RuntimeGameEvent["theme"], string> = {
  labor_struggle: "LABOR SIGNAL",
  compute_monopoly: "COMPUTE CONTROL",
  data_leak: "DATA BREACH",
  model_drift: "DRIFT WARNING",
  open_source_commons: "COMMONS PROTOCOL"
};

export function EventDialog({
  event,
  onChoose
}: {
  event: RuntimeGameEvent;
  onChoose: (option: RuntimeGameEventOption) => void;
}) {
  const firstOptionRef = useRef<HTMLButtonElement>(null);
  const lastOptionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstOptionRef.current?.focus();
  }, [event.id]);

  return (
    <div className="event-overlay" role="presentation">
      <section
        className={`event-dialog event-dialog--${event.theme}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="event-dialog-title"
        aria-describedby="event-dialog-description"
        onKeyDown={(keyboardEvent) => {
          if (keyboardEvent.key !== "Tab") return;

          if (keyboardEvent.shiftKey && document.activeElement === firstOptionRef.current) {
            keyboardEvent.preventDefault();
            lastOptionRef.current?.focus();
          } else if (!keyboardEvent.shiftKey && document.activeElement === lastOptionRef.current) {
            keyboardEvent.preventDefault();
            firstOptionRef.current?.focus();
          }
        }}
      >
        <div className="event-dialog__noise" aria-hidden="true" />
        <header className="event-dialog__header">
          <span><RadioTower /> EVENT INTERCEPT</span>
          <span className="event-dialog__theme"><i />{themeLabel[event.theme]}</span>
        </header>

        <div className="event-dialog__body">
          <p className="event-dialog__eyebrow"><TriangleAlert /> 决策窗口 / 时间暂停</p>
          <h2 id="event-dialog-title" data-text={event.title}>{event.title}</h2>
          <p id="event-dialog-description" className="event-dialog__description">{event.description}</p>
          <blockquote>{event.policyText}</blockquote>
          <p className="event-dialog__trigger"><Activity />触发条件：{event.trigger.description}</p>
        </div>

        <div className="event-dialog__options" aria-label="事件决策">
          {event.options.map((option, index) => (
            <button
              ref={index === 0 ? firstOptionRef : lastOptionRef}
              type="button"
              key={option.id}
              onClick={() => onChoose(option)}
            >
              <span>OPTION {String(index + 1).padStart(2, "0")}</span>
              <strong>{option.text}</strong>
              <ArrowRight />
            </button>
          ))}
        </div>

        <footer className="event-dialog__footer">
          选择将立即写入本季度状态。未决事件会锁定时间推进。
        </footer>
      </section>
    </div>
  );
}
