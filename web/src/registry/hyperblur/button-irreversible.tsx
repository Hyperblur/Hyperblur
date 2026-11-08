"use client";

import * as React from "react";

export interface ButtonIrreversibleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  label?: string;
  description?: string;
  title?: string;
  consequences?: string[];
  acknowledge?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  doneLabel?: string;
  accent?: string;
  open?: boolean;
  defaultOpen?: boolean;
  resetAfter?: number;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const css = `
.hb-xd12 {
  box-sizing: border-box;
  width: 100%;
  max-width: 340px;
  font-family: inherit;
  font-size: 0.8125rem;
  color: #ededed;
}
.hb-xd12 *, .hb-xd12 *::before, .hb-xd12 *::after { box-sizing: border-box; }
.hb-xd12-shell {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: linear-gradient(180deg, #161616, #121212);
  border: 1px solid color-mix(in srgb, var(--hb-xd12-c) 26%, #262626);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.5);
  transition: border-color 0.35s ease, box-shadow 0.45s ease, background 0.45s ease;
}
.hb-xd12[data-open="true"] .hb-xd12-shell {
  border-color: color-mix(in srgb, var(--hb-xd12-c) 55%, #262626);
  background:
    radial-gradient(120% 70% at 50% 0%, color-mix(in srgb, var(--hb-xd12-c) 14%, transparent), transparent 70%),
    linear-gradient(180deg, #170f10, #110c0c);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 4px color-mix(in srgb, var(--hb-xd12-c) 10%, transparent), 0 18px 40px -20px color-mix(in srgb, var(--hb-xd12-c) 70%, transparent);
}
.hb-xd12-shell::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 2px;
  background: repeating-linear-gradient(-45deg, var(--hb-xd12-c) 0 6px, transparent 6px 12px);
  background-size: 17px 2px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.hb-xd12[data-open="true"] .hb-xd12-shell::before { opacity: 0.9; animation: hb-xd12-march 0.9s linear infinite; }
.hb-xd12-trigger {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  margin: 0;
  padding: 11px 12px;
  font: inherit;
  text-align: left;
  color: inherit;
  background: transparent;
  border: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hb-xd12-trigger:focus-visible { outline: 2px solid var(--hb-xd12-c); outline-offset: -2px; border-radius: 12px; }
.hb-xd12-trigger:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xd12-ico {
  display: grid;
  place-items: center;
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  color: color-mix(in srgb, var(--hb-xd12-c) 70%, #fff);
  background: color-mix(in srgb, var(--hb-xd12-c) 14%, #141414);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xd12-c) 30%, transparent);
  transition: background 0.3s ease, color 0.3s ease;
}
.hb-xd12[data-open="true"] .hb-xd12-ico { color: #fff; background: var(--hb-xd12-c); }
.hb-xd12-tt { display: flex; flex: 1; flex-direction: column; gap: 1px; min-width: 0; line-height: 1.3; }
.hb-xd12-tt b { font-weight: 600; color: color-mix(in srgb, var(--hb-xd12-c) 35%, #fff); }
.hb-xd12-tt small { overflow: hidden; font-size: 0.72rem; color: #8f8f8f; text-overflow: ellipsis; white-space: nowrap; }
.hb-xd12-step {
  flex: none;
  padding: 2px 7px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 0.64rem;
  letter-spacing: 0.04em;
  color: #a1a1a1;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  transition: color 0.3s ease, border-color 0.3s ease;
}
.hb-xd12[data-open="true"] .hb-xd12-step { color: color-mix(in srgb, var(--hb-xd12-c) 50%, #fff); border-color: color-mix(in srgb, var(--hb-xd12-c) 40%, #2a2a2a); }
.hb-xd12-chev { flex: none; color: #737373; transition: transform 0.45s cubic-bezier(0.3, 1.4, 0.5, 1); }
.hb-xd12[data-open="true"] .hb-xd12-chev { transform: rotate(180deg); }
.hb-xd12-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s cubic-bezier(0.6, 0, 0.15, 1);
}
.hb-xd12[data-open="true"] .hb-xd12-panel { grid-template-rows: 1fr; }
.hb-xd12-inner { min-height: 0; overflow: hidden; }
.hb-xd12-body {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 0 12px 12px;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 0.25s ease, transform 0.4s cubic-bezier(0.2, 1, 0.3, 1);
}
.hb-xd12[data-open="true"] .hb-xd12-body { opacity: 1; transform: none; transition-delay: 0.12s; }
.hb-xd12-list { display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 9px 0 0; list-style: none; border-top: 1px solid #2a1c1d; }
.hb-xd12-list li { display: flex; align-items: flex-start; gap: 7px; line-height: 1.35; color: #b5b5b5; font-size: 0.75rem; }
.hb-xd12-list li::before {
  content: "";
  flex: none;
  width: 5px;
  height: 5px;
  margin-top: 0.42em;
  border-radius: 1px;
  background: var(--hb-xd12-c);
  transform: rotate(45deg);
}
.hb-xd12-ack { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #d4d4d4; cursor: pointer; user-select: none; }
.hb-xd12-ack input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.hb-xd12-box {
  display: grid;
  place-items: center;
  flex: none;
  width: 16px;
  height: 16px;
  color: #fff;
  border: 1px solid #3a3a3a;
  border-radius: 5px;
  background: #0d0d0d;
  transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-xd12-box path { stroke-dasharray: 20; stroke-dashoffset: 20; transition: stroke-dashoffset 0.3s cubic-bezier(0.6, 0, 0.3, 1); }
.hb-xd12-ack input:checked + .hb-xd12-box { background: var(--hb-xd12-c); border-color: var(--hb-xd12-c); }
.hb-xd12-ack input:checked + .hb-xd12-box path { stroke-dashoffset: 0; }
.hb-xd12-ack input:focus-visible + .hb-xd12-box { box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xd12-c) 35%, transparent); }
.hb-xd12-acts { display: flex; gap: 8px; }
.hb-xd12-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 34px;
  margin: 0;
  padding: 0 12px;
  font: inherit;
  font-weight: 600;
  white-space: nowrap;
  border-radius: 9px;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.3s ease, transform 0.15s ease;
}
.hb-xd12-btn:active:not([aria-disabled="true"]) { transform: scale(0.97); }
.hb-xd12-btn:focus-visible { outline: 2px solid color-mix(in srgb, var(--hb-xd12-c) 70%, #fff); outline-offset: 2px; }
.hb-xd12-cancel { color: #d4d4d4; background: #1c1c1c; border: 1px solid #2c2c2c; }
.hb-xd12-cancel:hover { background: #242424; }
.hb-xd12-go {
  flex: 1;
  color: #6b6b6b;
  background: #181818;
  border: 1px solid #262626;
  cursor: not-allowed;
}
.hb-xd12[data-ack="true"] .hb-xd12-go {
  color: #fff;
  cursor: pointer;
  border-color: color-mix(in srgb, var(--hb-xd12-c) 70%, #000);
  background: linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 60%), var(--hb-xd12-c);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 20px -10px var(--hb-xd12-c);
}
.hb-xd12-done {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 0 0;
  border-top: 1px solid #2a1c1d;
  font-weight: 600;
  color: color-mix(in srgb, var(--hb-xd12-c) 40%, #fff);
  animation: hb-xd12-in 0.4s cubic-bezier(0.2, 1.2, 0.4, 1);
}
@keyframes hb-xd12-march { to { background-position: 17px 0; } }
@keyframes hb-xd12-in { from { opacity: 0; transform: translateY(5px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xd12-shell, .hb-xd12-panel, .hb-xd12-body, .hb-xd12-chev, .hb-xd12-box path, .hb-xd12-btn { transition: none; }
  .hb-xd12[data-open="true"] .hb-xd12-shell::before, .hb-xd12-done { animation: none; }
}
`;

export function ButtonIrreversible({
  label = "Delete account",
  description = "Remove your workspace, files and billing history",
  title = "This can't be undone",
  consequences = ["4 projects and 1,286 files are erased within 24 hours", "Your Pro plan ends today, with no refund for the remaining 19 days"],
  acknowledge = "I understand this is permanent",
  confirmLabel = "Delete permanently",
  cancelLabel = "Cancel",
  doneLabel = "Account scheduled for deletion",
  accent = "#ef4444",
  open: openProp,
  defaultOpen = false,
  resetAfter = 3000,
  disabled = false,
  onOpenChange,
  onConfirm,
  onCancel,
  className = "",
  style,
  ...rest
}: ButtonIrreversibleProps) {
  const id = React.useId();
  const [inner, setInner] = React.useState(defaultOpen);
  const [ack, setAck] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const ackRef = React.useRef<HTMLInputElement>(null);
  const latest = React.useRef({ onOpenChange, onConfirm, onCancel });
  const open = openProp ?? inner;

  React.useEffect(() => {
    latest.current = { onOpenChange, onConfirm, onCancel };
  }, [onOpenChange, onConfirm, onCancel]);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setInner(next);
      latest.current.onOpenChange?.(next);
      if (!next) setAck(false);
    },
    [openProp],
  );

  React.useEffect(() => {
    if (!done || resetAfter <= 0) return;
    const t = window.setTimeout(() => {
      setDone(false);
      setOpen(false);
    }, resetAfter);
    return () => window.clearTimeout(t);
  }, [done, resetAfter, setOpen]);

  const close = (cancelled: boolean) => {
    setOpen(false);
    if (cancelled) latest.current.onCancel?.();
    triggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <div
      className={`hb-xd12 ${className}`.trim()}
      data-open={open}
      data-ack={ack}
      style={{ "--hb-xd12-c": accent, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open && !done) {
          e.stopPropagation();
          close(true);
        }
      }}
      {...rest}
    >
      <style href="hb-button-irreversible" precedence="default">{css}</style>
      <div className="hb-xd12-shell">
        <button
          ref={triggerRef}
          type="button"
          className="hb-xd12-trigger"
          disabled={disabled}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => {
            if (done) return;
            if (open) close(true);
            else {
              setOpen(true);
              window.setTimeout(() => ackRef.current?.focus({ preventScroll: true }), 220);
            }
          }}
        >
          <span className="hb-xd12-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l9.5 17h-19z" />
              <path d="M12 10v4.5M12 17.5v.01" />
            </svg>
          </span>
          <span className="hb-xd12-tt">
            <b>{open ? title : label}</b>
            <small>{open ? "Review what happens next" : description}</small>
          </span>
          <span className="hb-xd12-step" aria-hidden="true">{open ? "2 / 2" : "1 / 2"}</span>
          <svg className="hb-xd12-chev" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <div className="hb-xd12-panel" id={`${id}-panel`} role="group" aria-label={title} inert={!open}>
          <div className="hb-xd12-inner">
            <div className="hb-xd12-body">
              <ul className="hb-xd12-list">
                {consequences.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              {done ? (
                <div className="hb-xd12-done" role="status" aria-live="polite">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                  {doneLabel}
                </div>
              ) : (
                <>
                  <label className="hb-xd12-ack">
                    <input ref={ackRef} type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
                    <span className="hb-xd12-box" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength={20} /></svg>
                    </span>
                    {acknowledge}
                  </label>
                  <div className="hb-xd12-acts">
                    <button type="button" className="hb-xd12-btn hb-xd12-cancel" onClick={() => close(true)}>
                      {cancelLabel}
                    </button>
                    <button
                      type="button"
                      className="hb-xd12-btn hb-xd12-go"
                      aria-disabled={!ack || undefined}
                      onClick={() => {
                        if (!ack) {
                          ackRef.current?.focus();
                          return;
                        }
                        setDone(true);
                        latest.current.onConfirm?.();
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13" />
                      </svg>
                      {confirmLabel}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
