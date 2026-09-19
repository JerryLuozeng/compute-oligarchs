import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { tutorialSteps } from "@/content/tutorial";
import "./tutorial-overlay.css";

interface TargetBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

const spotlightPadding = 8;

export function TutorialOverlay({ onDismiss }: { onDismiss: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [targetBounds, setTargetBounds] = useState<TargetBounds | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstActionRef = useRef<HTMLButtonElement>(null);
  const lastActionRef = useRef<HTMLButtonElement>(null);
  const step = tutorialSteps[stepIndex];
  const isLastStep = stepIndex === tutorialSteps.length - 1;

  useEffect(() => {
    if (step === undefined) return;

    const target = document.querySelector<HTMLElement>(`[data-tutorial="${step.target}"]`);
    if (target === null) {
      setTargetBounds(null);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });

    const updateBounds = () => {
      const rect = target.getBoundingClientRect();
      setTargetBounds({
        left: Math.max(spotlightPadding, rect.left - spotlightPadding),
        top: Math.max(spotlightPadding, rect.top - spotlightPadding),
        width: Math.min(window.innerWidth - spotlightPadding * 2, rect.width + spotlightPadding * 2),
        height: Math.min(window.innerHeight - spotlightPadding * 2, rect.height + spotlightPadding * 2)
      });
    };

    const frame = window.requestAnimationFrame(updateBounds);
    const delayedFrame = window.setTimeout(updateBounds, reducedMotion ? 0 : 320);
    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds, true);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(delayedFrame);
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds, true);
    };
  }, [step]);

  useEffect(() => {
    if (stepIndex === 0) lastActionRef.current?.focus();
    else firstActionRef.current?.focus();
  }, [stepIndex]);

  if (step === undefined) return null;

  const panelSide = targetBounds !== null && targetBounds.left > window.innerWidth / 2
    ? "tutorial-panel--left"
    : "tutorial-panel--right";
  const panelLevel = targetBounds !== null && targetBounds.top > window.innerHeight * 0.52
    ? "tutorial-panel--top"
    : "tutorial-panel--bottom";

  return (
    <div className="tutorial-layer" role="presentation">
      {targetBounds === null ? <div className="tutorial-shade" aria-hidden="true" /> : (
        <div
          className="tutorial-spotlight"
          aria-hidden="true"
          style={targetBounds}
        />
      )}

      <section
        className={`tutorial-panel ${panelSide} ${panelLevel}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-title"
        aria-describedby="tutorial-description"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            onDismiss();
            return;
          }

          if (event.key !== "Tab") return;
          if (event.shiftKey && document.activeElement === closeButtonRef.current) {
            event.preventDefault();
            lastActionRef.current?.focus();
          } else if (!event.shiftKey && document.activeElement === lastActionRef.current) {
            event.preventDefault();
            closeButtonRef.current?.focus();
          }
        }}
      >
        <header className="tutorial-panel__header">
          <span>FIELD GUIDE / {String(stepIndex + 1).padStart(2, "0")}</span>
          <button ref={closeButtonRef} type="button" onClick={onDismiss} aria-label="跳过新手引导"><X /></button>
        </header>

        <div className="tutorial-panel__body">
          <p>{step.label}</p>
          <h2 id="tutorial-title">{step.title}</h2>
          <p id="tutorial-description">{step.description}</p>
        </div>

        <div className="tutorial-progress" aria-label={`引导进度 ${stepIndex + 1} / ${tutorialSteps.length}`}>
          {tutorialSteps.map((tutorialStep, index) => (
            <span className={index <= stepIndex ? "tutorial-progress__active" : ""} key={tutorialStep.id} />
          ))}
        </div>

        <footer className="tutorial-panel__actions">
          <button
            ref={firstActionRef}
            type="button"
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((index) => Math.max(0, index - 1))}
          >
            <ArrowLeft />上一步
          </button>
          <button
            ref={lastActionRef}
            type="button"
            onClick={() => {
              if (isLastStep) onDismiss();
              else setStepIndex((index) => index + 1);
            }}
          >
            {isLastStep ? <><Check />完成引导</> : <>下一步<ArrowRight /></>}
          </button>
        </footer>
      </section>
    </div>
  );
}
