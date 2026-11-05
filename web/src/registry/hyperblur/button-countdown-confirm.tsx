"use client";

import * as React from "react";

export interface ButtonCountdownConfirmProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "onClick" | "children"> {
  children?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  seconds?: number;
  pendingLabel?: string;
  cancelLabel?: string;
  doneLabel?: string;
  variant?: "solid" | "outline";
  accent?: string;
  size?: "sm" | "md" | "lg";
  defaultArmed?: boolean;
  loading?: boolean;
}

type Phase = "idle" | "armed" | "done";

const trash = (
  <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 7h16" />
    <path d="M9 7V4h6v3" />
    <path d="M6 7l1 13h10l1-13" />
    <path d="M10 11v5M14 11v5" />
  </svg>
);

const check = (
  <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const css = `
.hb-ya5 {
  --hb-ya5-h: 2.75rem;
  --hb-ya5-fs: 0.9375rem;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  font: inherit;
  font-size: var(--hb-ya5-fs);
}
.hb-ya5 *, .hb-ya5 *::before, .hb-ya5 *::after { box-sizing: border-box; }
.hb-ya5[data-size="sm"] { --hb-ya5-h: 2.25rem; --hb-ya5-fs: 0.8125rem; }
.hb-ya5[data-size="lg"] { --hb-ya5-h: 3.25rem; --hb-ya5-fs: 1.0625rem; }
.hb-ya5-main {
  position: relative;
  display: inline-grid;
  place-items: center;
  height: var(--hb-ya5-h);
  margin: 0;
  padding: 0 1.3em;
  overflow: hidden;
  font: inherit;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.18s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.hb-ya5[data-variant="solid"] .hb-ya5-main { color: #fff; background: var(--hb-ya5-c); }
.hb-ya5[data-variant="solid"] .hb-ya5-main:not(:disabled):hover { background: color-mix(in srgb, var(--hb-ya5-c) 88%, #fff); }
.hb-ya5[data-variant="solid"][data-phase="armed"] .hb-ya5-main { background: color-mix(in srgb, var(--hb-ya5-c) 70%, #000); }
.hb-ya5[data-variant="outline"] .hb-ya5-main {
  color: color-mix(in srgb, var(--hb-ya5-c) 70%, #fff);
  background: transparent;
  border-color: color-mix(in srgb, var(--hb-ya5-c) 55%, #262626);
}
.hb-ya5[data-variant="outline"] .hb-ya5-main:not(:disabled):hover { background: color-mix(in srgb, var(--hb-ya5-c) 10%, transparent); }
.hb-ya5[data-variant="outline"][data-phase="armed"] .hb-ya5-main { background: color-mix(in srgb, var(--hb-ya5-c) 16%, transparent); border-color: var(--hb-ya5-c); }
.hb-ya5-main:not(:disabled):active { transform: scale(0.97); }
.hb-ya5-main:focus-visible { outline: 2px solid var(--hb-ya5-c); outline-offset: 3px; }
.hb-ya5-cancel:focus-visible { outline: 2px solid var(--hb-ya5-c); outline-offset: -2px; }
.hb-ya5-main:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-ya5-main[aria-busy="true"] { cursor: progress; }
.hb-ya5-state {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  visibility: hidden;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.3, 0.9, 0.3, 1), visibility 0s linear 0.3s;
}
.hb-ya5[data-phase="idle"] .hb-ya5-idle,
.hb-ya5[data-phase="armed"] .hb-ya5-armed,
.hb-ya5[data-phase="done"] .hb-ya5-done {
  visibility: visible;
  opacity: 1;
  transform: none;
  transition-delay: 0s;
}
.hb-ya5-ring {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 1.6em;
  height: 1.6em;
}
.hb-ya5-ring > svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.hb-ya5-track { fill: none; stroke: currentColor; stroke-width: 2.4; opacity: 0.25; }
.hb-ya5-prog {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-dasharray: 62.83;
  stroke-dashoffset: 0;
  animation: hb-ya5-drain var(--hb-ya5-t, 3s) linear forwards;
}
.hb-ya5-num {
  position: relative;
  font-size: 0.72em;
  font-variant-numeric: tabular-nums;
}
.hb-ya5-time { font-variant-numeric: tabular-nums; }
.hb-ya5-cancelwrap {
  display: grid;
  grid-template-columns: 0fr;
  transition: grid-template-columns 0.4s cubic-bezier(0.3, 0.9, 0.3, 1);
}
.hb-ya5[data-phase="armed"] .hb-ya5-cancelwrap { grid-template-columns: 1fr; }
.hb-ya5-cliprow { min-width: 0; overflow: hidden; }
.hb-ya5-cancel {
  display: block;
  height: var(--hb-ya5-h);
  margin: 0 0 0 0.5rem;
  padding: 0 1.1em;
  font: inherit;
  font-weight: 500;
  line-height: 1;
  color: #d4d4d4;
  background: transparent;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.25s ease, background-color 0.2s ease, border-color 0.2s ease;
}
.hb-ya5[data-phase="armed"] .hb-ya5-cancel { opacity: 1; transition-delay: 0.1s; }
.hb-ya5-cancel:hover { background: #171717; border-color: #3a3a3a; }
.hb-ya5-spin {
  width: 1.1em;
  height: 1.1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-ya5-turn 0.7s linear infinite;
}
.hb-ya5-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@keyframes hb-ya5-drain {
  to { stroke-dashoffset: 62.83; }
}
@keyframes hb-ya5-turn {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ya5-main, .hb-ya5-state, .hb-ya5-cancelwrap, .hb-ya5-cancel { transition: none; }
  .hb-ya5-main:not(:disabled):active { transform: none; }
  .hb-ya5-prog { animation: none; }
  .hb-ya5-spin { animation-duration: 2s; }
}
`;

export function ButtonCountdownConfirm({
  children = "Delete project",
  onConfirm,
  onCancel,
  seconds = 3,
  pendingLabel = "Deleting in {s}s",
  cancelLabel = "Cancel",
  doneLabel = "Deleted",
  variant = "solid",
  accent = "#ff4d5e",
  size = "md",
  defaultArmed = false,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonCountdownConfirmProps) {
  const total = Math.max(1, Math.round(seconds));
  const mainRef = React.useRef<HTMLButtonElement>(null);
  const latest = React.useRef({ onConfirm, onCancel });
  const [phase, setPhase] = React.useState<Phase>(defaultArmed ? "armed" : "idle");
  const [left, setLeft] = React.useState(total);

  React.useEffect(() => {
    latest.current = { onConfirm, onCancel };
  }, [onConfirm, onCancel]);

  const finish = React.useCallback(() => {
    latest.current.onConfirm?.();
    setPhase("done");
  }, []);

  React.useEffect(() => {
    if (phase !== "armed") return;
    const tick = window.setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000);
    const end = window.setTimeout(finish, total * 1000);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(end);
    };
  }, [phase, total, finish]);

  React.useEffect(() => {
    if (phase !== "done") return;
    const timer = window.setTimeout(() => setPhase("idle"), 1700);
    return () => window.clearTimeout(timer);
  }, [phase]);

  function cancel() {
    setPhase("idle");
    latest.current.onCancel?.();
    mainRef.current?.focus();
  }

  function press() {
    if (disabled || loading) return;
    if (phase === "idle") {
      setLeft(total);
      setPhase("armed");
    } else if (phase === "armed") {
      finish();
    }
  }

  const armed = phase === "armed";
  const vars = {
    "--hb-ya5-c": accent,
    "--hb-ya5-t": `${total}s`,
    ...style,
  } as React.CSSProperties;
  const pending = pendingLabel.replace("{s}", String(left));

  return (
    <>
      <style href="hb-button-countdown-confirm" precedence="default">{css}</style>
      <span
        className={`hb-ya5 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        data-phase={phase}
        onKeyDown={(e) => {
          if (e.key === "Escape" && armed) {
            e.preventDefault();
            cancel();
          }
        }}
      >
        <button
          ref={mainRef}
          type={type}
          className="hb-ya5-main"
          disabled={disabled}
          aria-busy={loading || undefined}
          onClick={press}
          {...rest}
        >
          <span className="hb-ya5-state hb-ya5-idle" aria-hidden={phase !== "idle"}>
            {loading ? <span className="hb-ya5-spin" aria-hidden="true" /> : trash}
            {children}
          </span>
          <span className="hb-ya5-state hb-ya5-armed" aria-hidden={!armed}>
            {armed ? (
              <span className="hb-ya5-ring" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle className="hb-ya5-track" cx="12" cy="12" r="10" />
                  <circle className="hb-ya5-prog" cx="12" cy="12" r="10" />
                </svg>
                <span className="hb-ya5-num">{left}</span>
              </span>
            ) : null}
            <span className="hb-ya5-time">{pending}</span>
          </span>
          <span className="hb-ya5-state hb-ya5-done" aria-hidden={phase !== "done"}>
            {check}
            {doneLabel}
          </span>
        </button>
        <span className="hb-ya5-cancelwrap">
          <span className="hb-ya5-cliprow">
            <button
              type="button"
              className="hb-ya5-cancel"
              tabIndex={armed ? 0 : -1}
              aria-hidden={!armed}
              disabled={!armed}
              onClick={cancel}
            >
              {cancelLabel}
            </button>
          </span>
        </span>
        <span className="hb-ya5-sr" role="status" aria-live="polite">
          {armed
            ? `Confirming in ${total} seconds. Press Escape or ${cancelLabel} to stop.`
            : phase === "done"
              ? doneLabel
              : ""}
        </span>
      </span>
    </>
  );
}
