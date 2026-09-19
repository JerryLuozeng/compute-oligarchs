import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export function HomeDialog({
  code,
  title,
  children,
  onClose
}: {
  code: string;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div className="home-overlay" role="presentation">
      <section
        className="home-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-dialog-title"
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
        }}
      >
        <div className="home-dialog__noise" aria-hidden="true" />
        <header className="home-dialog__header">
          <span>{code}</span>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="关闭窗口">
            <X />
          </button>
        </header>
        <div className="home-dialog__body">
          <h2 id="home-dialog-title">{title}</h2>
          {children}
        </div>
      </section>
    </div>
  );
}
