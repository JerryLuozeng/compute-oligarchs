import { useEffect, useRef } from "react";
import { House, RotateCcw, ShieldAlert, Trophy } from "lucide-react";
import type { EndingResult } from "@/content/endings";
import "./ending-dialog.css";

export function EndingDialog({
  ending,
  onReturnToMenu,
  onRestart
}: {
  ending: EndingResult;
  onReturnToMenu: () => void;
  onRestart: () => void;
}) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const restartButtonRef = useRef<HTMLButtonElement>(null);
  const isVictory = ending.tone === "victory";

  useEffect(() => {
    restartButtonRef.current?.focus();
  }, [ending.kind]);

  return (
    <div className="ending-overlay" role="presentation">
      <section
        className={`ending-dialog ending-dialog--${ending.tone}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="ending-dialog-title"
        aria-describedby="ending-dialog-description"
        onKeyDown={(keyboardEvent) => {
          if (keyboardEvent.key !== "Tab") return;

          if (keyboardEvent.shiftKey && document.activeElement === menuButtonRef.current) {
            keyboardEvent.preventDefault();
            restartButtonRef.current?.focus();
          } else if (!keyboardEvent.shiftKey && document.activeElement === restartButtonRef.current) {
            keyboardEvent.preventDefault();
            menuButtonRef.current?.focus();
          }
        }}
      >
        <div className="ending-dialog__noise" aria-hidden="true" />
        <header className="ending-dialog__header">
          <span>{isVictory ? <Trophy /> : <ShieldAlert />}{ending.copy.label}</span>
          <span>SIMULATION TERMINATED</span>
        </header>

        <div className="ending-dialog__body">
          <p>{isVictory ? "结局 / 胜利" : "结局 / 失败"}</p>
          <h2 id="ending-dialog-title" data-text={ending.copy.title}>{ending.copy.title}</h2>
          <p id="ending-dialog-description" className="ending-dialog__description">
            {ending.copy.description}
          </p>
          <blockquote>{ending.copy.dispatch}</blockquote>
        </div>

        <footer className="ending-dialog__actions">
          <button ref={menuButtonRef} type="button" onClick={onReturnToMenu}>
            <House />返回主菜单
          </button>
          <button ref={restartButtonRef} type="button" onClick={onRestart}>
            <RotateCcw />重新开局
          </button>
        </footer>
      </section>
    </div>
  );
}
