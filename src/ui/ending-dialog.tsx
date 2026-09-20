import { useEffect, useRef } from "react";
import { GitBranch, House, RotateCcw, ShieldAlert } from "lucide-react";
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
  const isCollapse = ending.tone === "collapse";

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
          <span>{isCollapse ? <ShieldAlert /> : <GitBranch />}{ending.copy.label}</span>
          <span>{isCollapse ? "SYSTEM TERMINATED" : "HISTORICAL TRAJECTORY"}</span>
        </header>

        <div className="ending-dialog__body">
          <p>{isCollapse ? "系统结局 / 崩溃" : "社会形态 / 系统延续"}</p>
          <h2 id="ending-dialog-title" data-text={ending.copy.title}>{ending.copy.title}</h2>
          <p id="ending-dialog-description" className="ending-dialog__description">
            {ending.copy.description}
          </p>
          <blockquote>{ending.copy.dispatch}</blockquote>
          <div className="ending-dialog__factors" aria-label="历史形成因素">
            <strong>这条路线如何形成</strong>
            <ul>
              {ending.factors.map((factor) => <li key={factor}>{factor}</li>)}
            </ul>
          </div>
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
