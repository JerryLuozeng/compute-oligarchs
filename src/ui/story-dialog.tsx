import { useEffect, useRef } from "react";
import { ArrowRight, BookOpen, RadioTower } from "lucide-react";
import type { StoryChoice, StoryEvent } from "@/content/story-events";
import "./event-dialog.css";
import "./story-dialog.css";

export function StoryDialog({
  event,
  selectedChoice,
  onChoose,
  onContinue
}: {
  event: StoryEvent;
  selectedChoice: StoryChoice | null;
  onChoose: (choice: StoryChoice) => void;
  onContinue: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, [event.id, selectedChoice]);

  return (
    <div className="event-overlay" role="presentation">
      <section
        ref={dialogRef}
        className="event-dialog story-dialog"
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
        <div className="event-dialog__noise" aria-hidden="true" />
        <header className="event-dialog__header">
          <span><RadioTower /> STORY SIGNAL / {event.id}</span>
          <span className="event-dialog__theme"><i />{event.chapter}</span>
        </header>
        <div className="event-dialog__body">
          <p className="event-dialog__eyebrow"><BookOpen /> {selectedChoice === null ? "抉择" : "回响"}</p>
          <h2 id="story-dialog-title" data-text={event.title}>{event.title}</h2>
          <p id="story-dialog-description" className="event-dialog__description">
            {selectedChoice?.outcome ?? event.description}
          </p>
        </div>
        {selectedChoice === null ? (
          <div className="event-dialog__options" aria-label="剧情决策">
            {event.options.map((choice) => (
              <button type="button" key={choice.id} onClick={() => onChoose(choice)}>
                <span>OPTION {choice.id}</span>
                <strong>{choice.text}</strong>
                <ArrowRight />
              </button>
            ))}
          </div>
        ) : (
          <footer className="story-dialog__continue">
            <button type="button" onClick={onContinue}>继续 <ArrowRight /></button>
          </footer>
        )}
      </section>
    </div>
  );
}
