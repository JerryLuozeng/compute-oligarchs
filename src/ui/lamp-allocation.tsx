import { useEffect, useRef, useState } from "react";
import { Activity, Lightbulb, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import {
  LAMP_ALLOCATION_TOTAL,
  createEqualLampAllocation,
  getAllocationTotal,
  getLampShare,
  getLampStatus,
  isValidLampAllocation,
  lampDefinitions,
  lampStatusLabels,
  type LampAllocation,
  type LampTendencyState
} from "@/content/lamps";
import "./lamp-allocation.css";

export function LampStatusBoard({
  state,
  onOpen
}: {
  state: LampTendencyState;
  onOpen: () => void;
}) {
  const hasAllocation = state.chapterAllocationCount > 0;

  return (
    <section className="lamp-board" aria-label="五灯倾向">
      <header className="lamp-board__header">
        <div>
          <p><Activity /> ALLOCATION SIGNAL</p>
          <h2>五灯倾向</h2>
        </div>
        <button type="button" onClick={onOpen}>
          <SlidersHorizontal />{hasAllocation ? "调整分配" : "开始点灯"}
        </button>
      </header>
      <div className="lamp-board__grid">
        {lampDefinitions.map((lamp) => {
          const status = hasAllocation ? getLampStatus(state.chapterTotals, lamp.id) : "steady";
          const share = hasAllocation ? getLampShare(state.chapterTotals, lamp.id) : 0;
          return (
            <div className={`lamp-readout lamp-tone--${lamp.tone} lamp-readout--${status}`} key={lamp.id}>
              <span className="lamp-readout__signal"><Lightbulb /></span>
              <div>
                <strong>{lamp.name}</strong>
                <small>{hasAllocation ? lampStatusLabels[status] : "等待分配"}</small>
              </div>
              <b>{share.toFixed(0)}%</b>
              <span className="lamp-readout__track" aria-hidden="true">
                <i style={{ width: `${share}%` }} />
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export function LampAllocationDialog({
  current,
  required,
  onClose,
  onConfirm
}: {
  current: LampAllocation;
  required: boolean;
  onClose: () => void;
  onConfirm: (allocation: LampAllocation) => void;
}) {
  const [draft, setDraft] = useState<LampAllocation>(() => ({ ...current }));
  const dialogRef = useRef<HTMLElement>(null);
  const firstSliderRef = useRef<HTMLInputElement>(null);
  const total = getAllocationTotal(draft);
  const remaining = LAMP_ALLOCATION_TOTAL - total;
  const valid = isValidLampAllocation(draft);
  const hasDarkLamp = lampDefinitions.some((lamp) => draft[lamp.id] <= 5);

  useEffect(() => {
    firstSliderRef.current?.focus();
  }, []);

  return (
    <div className="lamp-overlay" role="presentation">
      <section
        ref={dialogRef}
        className="lamp-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lamp-dialog-title"
        aria-describedby="lamp-dialog-description"
        onKeyDown={(event) => {
          if (event.key === "Escape" && !required) {
            onClose();
            return;
          }
          if (event.key !== "Tab") return;

          const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
            "button:not(:disabled), input:not(:disabled)"
          );
          if (focusable === undefined || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        <div className="lamp-dialog__noise" aria-hidden="true" />
        <header className="lamp-dialog__header">
          <span><Lightbulb /> GRID ALLOCATION / FIVE LAMPS</span>
          {required ? <span>首次调度</span> : (
            <button type="button" onClick={onClose} aria-label="关闭点灯调度"><X /></button>
          )}
        </header>

        <div className="lamp-dialog__intro">
          <p>本章算力分配</p>
          <h2 id="lamp-dialog-title">今晚，灯该为谁亮？</h2>
          <p id="lamp-dialog-description">算力有限。每一盏灯亮起，另一盏就会暗一点。</p>
        </div>

        <div className="lamp-controls">
          {lampDefinitions.map((lamp, index) => (
            <label className={`lamp-control lamp-tone--${lamp.tone}`} key={lamp.id}>
              <span className="lamp-control__icon"><Lightbulb /></span>
              <span className="lamp-control__copy">
                <strong>{lamp.name}</strong>
                <small>{lamp.description}</small>
              </span>
              <b>{draft[lamp.id]}%</b>
              <input
                ref={index === 0 ? firstSliderRef : undefined}
                type="range"
                min="0"
                max="100"
                step="5"
                value={draft[lamp.id]}
                aria-label={`${lamp.name}分配比例`}
                onChange={(event) => setDraft((allocation) => ({
                  ...allocation,
                  [lamp.id]: Number(event.target.value)
                }))}
              />
            </label>
          ))}
        </div>

        <footer className="lamp-dialog__footer">
          <div className={`lamp-budget ${remaining === 0 ? "lamp-budget--ready" : ""}`}>
            <span>可分配总额</span>
            <strong>{total} / {LAMP_ALLOCATION_TOTAL}</strong>
            <small>{remaining > 0 ? `还可分配 ${remaining}%` : remaining < 0 ? `已超出 ${Math.abs(remaining)}%` : "分配完成"}</small>
          </div>
          <div className="lamp-dialog__actions">
            <button type="button" onClick={() => setDraft(createEqualLampAllocation())}>
              <RotateCcw />均衡分配
            </button>
            <button type="button" disabled={!valid} onClick={() => onConfirm(draft)}>
              <Lightbulb />让灯亮起来
            </button>
          </div>
        </footer>
        {hasDarkLamp ? <p className="lamp-dialog__warning">有一盏灯几乎全暗了。它的主人，会记得。</p> : null}
      </section>
    </div>
  );
}
