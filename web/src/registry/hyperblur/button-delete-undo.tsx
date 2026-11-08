"use client";

import * as React from "react";

export interface ButtonDeleteUndoProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: React.ReactNode;
  message?: React.ReactNode;
  undoLabel?: string;
  restoredLabel?: React.ReactNode;
  committedLabel?: React.ReactNode;
  undoWindow?: number;
  accent?: string;
  resetAfter?: number;
  disabled?: boolean;
  onDelete?: () => void;
  onUndo?: () => void;
  onCommit?: () => void;
}

const css = `
.hb-xd6 {
  --hb-xd6-p: 1;
  position: relative;
  display: inline-grid;
  justify-items: start;
  align-items: center;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 0.8125rem;
  color: #ededed;
}
.hb-xd6 *, .hb-xd6 *::before, .hb-xd6 *::after { box-sizing: border-box; }
.hb-xd6-btn, .hb-xd6-toast { grid-area: 1 / 1; }
.hb-xd6-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  height: 2.5rem;
  margin: 0;
  padding: 0 1.05em 0 0.9em;
  font: inherit;
  font-weight: 600;
  color: color-mix(in srgb, var(--hb-xd6-c) 45%, #fff);
  white-space: nowrap;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xd6-c) 14%, #151515), color-mix(in srgb, var(--hb-xd6-c) 7%, #101010));
  border: 1px solid color-mix(in srgb, var(--hb-xd6-c) 30%, #262626);
  border-radius: 10px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.5);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transform-origin: left center;
  transition: opacity 0.25s ease, transform 0.45s cubic-bezier(0.3, 1.3, 0.5, 1), filter 0.3s ease, background 0.2s ease, border-color 0.2s ease;
}
.hb-xd6-btn:hover:not(:disabled) { border-color: color-mix(in srgb, var(--hb-xd6-c) 55%, #262626); background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xd6-c) 20%, #151515), color-mix(in srgb, var(--hb-xd6-c) 10%, #101010)); }
.hb-xd6-btn:active:not(:disabled) { transform: scale(0.97); }
.hb-xd6-btn:focus-visible, .hb-xd6-undo:focus-visible { outline: 2px solid var(--hb-xd6-c); outline-offset: 2px; }
.hb-xd6-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xd6[data-phase="pending"] .hb-xd6-btn,
.hb-xd6[data-phase="committed"] .hb-xd6-btn {
  opacity: 0;
  transform: scale(0.86) translateY(4px);
  filter: blur(3px);
  pointer-events: none;
  visibility: hidden;
  transition: opacity 0.2s ease, transform 0.3s ease, filter 0.3s ease, visibility 0s linear 0.3s;
}
.hb-xd6-toast {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 2.75rem;
  padding: 0 6px 0 8px;
  white-space: nowrap;
  background: linear-gradient(180deg, #1c1c1c, #141414);
  border: 1px solid #2c2c2c;
  border-radius: 12px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 30px -12px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.5);
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px) scale(0.94);
  transform-origin: left center;
  transition: opacity 0.2s ease, transform 0.5s cubic-bezier(0.2, 1.3, 0.4, 1), visibility 0s linear 0.5s;
}
.hb-xd6[data-phase="pending"] .hb-xd6-toast,
.hb-xd6[data-phase="committed"] .hb-xd6-toast,
.hb-xd6[data-phase="restored"] .hb-xd6-toast {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition: opacity 0.2s ease 0.05s, transform 0.5s cubic-bezier(0.2, 1.3, 0.4, 1) 0.05s, visibility 0s;
}
.hb-xd6-ico {
  display: grid;
  place-items: center;
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  color: color-mix(in srgb, var(--hb-xd6-c) 70%, #fff);
  background: color-mix(in srgb, var(--hb-xd6-c) 16%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xd6-c) 30%, transparent);
  transition: color 0.3s ease, background 0.3s ease;
}
.hb-xd6[data-phase="restored"] .hb-xd6-ico { color: #86efac; background: rgba(34,197,94,0.14); box-shadow: inset 0 0 0 1px rgba(34,197,94,0.3); }
.hb-xd6[data-phase="restored"] .hb-xd6-ico svg { animation: hb-xd6-rewind 0.6s cubic-bezier(0.3, 0.9, 0.3, 1); }
.hb-xd6[data-phase="committed"] .hb-xd6-ico { color: #8f8f8f; background: #1f1f1f; box-shadow: inset 0 0 0 1px #2a2a2a; }
.hb-xd6-msg { display: flex; flex-direction: column; gap: 1px; line-height: 1.2; padding-right: 4px; }
.hb-xd6-msg small { font-size: 0.68rem; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-xd6-undo {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 30px;
  margin: 0 0 0 auto;
  padding: 0 7px 0 11px;
  font: inherit;
  font-weight: 600;
  color: #fff;
  background: #262626;
  border: 1px solid #333;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}
.hb-xd6-undo:hover { background: #303030; }
.hb-xd6-undo:active { transform: scale(0.96); }
.hb-xd6-undo kbd {
  padding: 1px 5px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 0.66rem;
  font-weight: 500;
  color: #a1a1a1;
  background: #171717;
  border: 1px solid #333;
  border-bottom-width: 2px;
  border-radius: 5px;
}
.hb-xd6-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xd6-c) 60%, transparent), var(--hb-xd6-c));
  transform: scaleX(var(--hb-xd6-p));
  transform-origin: left;
  box-shadow: 0 0 8px var(--hb-xd6-c);
}
.hb-xd6[data-phase="committed"] .hb-xd6-bar, .hb-xd6[data-phase="restored"] .hb-xd6-bar { opacity: 0; }
.hb-xd6-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xd6-rewind { from { transform: rotate(360deg); } to { transform: rotate(0); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xd6-btn, .hb-xd6-toast, .hb-xd6[data-phase] .hb-xd6-btn, .hb-xd6[data-phase] .hb-xd6-toast { transition: none; filter: none; }
  .hb-xd6[data-phase="restored"] .hb-xd6-ico svg { animation: none; }
}
`;

type Phase = "idle" | "pending" | "committed" | "restored";

export function ButtonDeleteUndo({
  children = "Delete 3 emails",
  message = "3 emails deleted",
  undoLabel = "Undo",
  restoredLabel = "Emails restored",
  committedLabel = "Deleted permanently",
  undoWindow = 5000,
  accent = "#ef4444",
  resetAfter = 2200,
  disabled = false,
  onDelete,
  onUndo,
  onCommit,
  className = "",
  style,
  ...rest
}: ButtonDeleteUndoProps) {
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const undoRef = React.useRef<HTMLButtonElement>(null);
  const raf = React.useRef(0);
  const elapsed = React.useRef(0);
  const latest = React.useRef({ onDelete, onUndo, onCommit });
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [left, setLeft] = React.useState(Math.ceil(undoWindow / 1000));

  React.useEffect(() => {
    latest.current = { onDelete, onUndo, onCommit };
  }, [onDelete, onUndo, onCommit]);

  const undo = React.useCallback(() => {
    cancelAnimationFrame(raf.current);
    setPhase("restored");
    latest.current.onUndo?.();
  }, []);

  React.useEffect(() => {
    if (phase !== "pending") return;
    elapsed.current = 0;
    let last = 0;
    const step = (t: number) => {
      const dt = last ? Math.min(64, t - last) : 0;
      last = t;
      elapsed.current += dt;
      const p = Math.max(0, 1 - elapsed.current / undoWindow);
      rootRef.current?.style.setProperty("--hb-xd6-p", p.toFixed(4));
      setLeft(Math.max(0, Math.ceil((undoWindow - elapsed.current) / 1000)));
      if (p <= 0) {
        setPhase("committed");
        latest.current.onCommit?.();
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase, undoWindow, undo]);

  React.useEffect(() => {
    if (phase === "restored") {
      const t = window.setTimeout(() => {
        setPhase("idle");
        requestAnimationFrame(() => btnRef.current?.focus({ preventScroll: true }));
      }, 1300);
      return () => window.clearTimeout(t);
    }
    if (phase === "committed" && resetAfter > 0) {
      const t = window.setTimeout(() => setPhase("idle"), resetAfter);
      return () => window.clearTimeout(t);
    }
  }, [phase, resetAfter]);

  const restoring = phase === "restored";
  const committed = phase === "committed";

  return (
    <span
      ref={rootRef}
      className={`hb-xd6 ${className}`.trim()}
      data-phase={phase}
      style={{ "--hb-xd6-c": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-button-delete-undo" precedence="default">{css}</style>
      <button
        ref={btnRef}
        type="button"
        className="hb-xd6-btn"
        disabled={disabled}
        tabIndex={phase === "idle" ? 0 : -1}
        onClick={() => {
          if (phase !== "idle") return;
          rootRef.current?.style.setProperty("--hb-xd6-p", "1");
          setLeft(Math.ceil(undoWindow / 1000));
          setPhase("pending");
          latest.current.onDelete?.();
          requestAnimationFrame(() => undoRef.current?.focus({ preventScroll: true }));
        }}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13" />
        </svg>
        {children}
      </button>
      <span className="hb-xd6-toast" aria-hidden={phase === "idle"}>
        <span className="hb-xd6-ico" aria-hidden="true">
          {restoring ? (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 1 0 2.5-5.8" /><path d="M4 4v4.5h4.5" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13" /></svg>
          )}
        </span>
        <span className="hb-xd6-msg">
          <span>{restoring ? restoredLabel : committed ? committedLabel : message}</span>
          {phase === "pending" && <small>{`Undo within ${left}s`}</small>}
        </span>
        {phase === "pending" && (
          <button ref={undoRef} type="button" className="hb-xd6-undo" onClick={undo}>
            {undoLabel}
            <kbd aria-hidden="true">⌘Z</kbd>
          </button>
        )}
        <span className="hb-xd6-bar" aria-hidden="true" />
      </span>
      <span className="hb-xd6-sr" role="status" aria-live="polite">
        {phase === "pending" ? message : restoring ? restoredLabel : committed ? committedLabel : ""}
      </span>
    </span>
  );
}
