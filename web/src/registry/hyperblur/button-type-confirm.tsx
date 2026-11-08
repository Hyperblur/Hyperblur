"use client";

import * as React from "react";

export interface ButtonTypeConfirmProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "children" | "onSubmit" | "onChange"> {
  confirmText?: string;
  label?: string;
  doneLabel?: string;
  hint?: string;
  caseSensitive?: boolean;
  accent?: string;
  resetAfter?: number;
  disabled?: boolean;
  onConfirm?: () => void;
  onValueChange?: (value: string, matched: boolean) => void;
}

const css = `
.hb-xd5 {
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  max-width: 340px;
  margin: 0;
  font-family: inherit;
  font-size: 0.8125rem;
  color: #ededed;
}
.hb-xd5 *, .hb-xd5 *::before, .hb-xd5 *::after { box-sizing: border-box; }
.hb-xd5-hint { margin: 0; line-height: 1.5; color: #a1a1a1; }
.hb-xd5-target {
  display: inline-flex;
  flex-wrap: wrap;
  vertical-align: baseline;
  padding: 1px 6px;
  margin: 0 2px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 0.92em;
  color: #d4d4d4;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  transition: border-color 0.3s ease, background 0.3s ease;
}
.hb-xd5-ch { position: relative; transition: color 0.18s ease; white-space: pre; }
.hb-xd5-ch[data-s="ok"] { color: color-mix(in srgb, var(--hb-xd5-c) 55%, #fff); text-shadow: 0 0 10px color-mix(in srgb, var(--hb-xd5-c) 60%, transparent); }
.hb-xd5-ch[data-s="bad"] { color: #fff; }
.hb-xd5-ch[data-s="bad"]::after {
  content: "";
  position: absolute;
  left: -1px;
  right: -1px;
  bottom: -1px;
  height: 2px;
  border-radius: 2px;
  background: #f5a524;
}
.hb-xd5-ch[data-s="next"]::before {
  content: "";
  position: absolute;
  left: -1px;
  top: 10%;
  bottom: 10%;
  width: 1.5px;
  background: color-mix(in srgb, var(--hb-xd5-c) 70%, #fff);
  animation: hb-xd5-caret 1s steps(2, start) infinite;
}
.hb-xd5[data-match="true"] .hb-xd5-target { border-color: color-mix(in srgb, var(--hb-xd5-c) 50%, #2a2a2a); background: color-mix(in srgb, var(--hb-xd5-c) 10%, #1a1a1a); }
.hb-xd5-row { display: flex; gap: 8px; }
.hb-xd5-field { position: relative; flex: 1; min-width: 0; }
.hb-xd5-input {
  width: 100%;
  height: 38px;
  padding: 0 34px 0 11px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 0.8125rem;
  color: #ededed;
  background: linear-gradient(180deg, #0c0c0c, #121212);
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.6);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-xd5-input::placeholder { color: #5c5c5c; }
.hb-xd5-input:focus { border-color: #4a4a4a; box-shadow: inset 0 1px 2px rgba(0,0,0,0.6), 0 0 0 3px rgba(255,255,255,0.06); }
.hb-xd5[data-bad="true"] .hb-xd5-input { border-color: #8a5a12; }
.hb-xd5[data-match="true"] .hb-xd5-input { border-color: color-mix(in srgb, var(--hb-xd5-c) 60%, #2a2a2a); box-shadow: inset 0 1px 2px rgba(0,0,0,0.6), 0 0 0 3px color-mix(in srgb, var(--hb-xd5-c) 16%, transparent); }
.hb-xd5[data-shake="true"] .hb-xd5-field { animation: hb-xd5-shake 0.32s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xd5-meter {
  position: absolute;
  right: 10px;
  top: 50%;
  width: 16px;
  height: 16px;
  margin-top: -8px;
  transform: rotate(-90deg);
}
.hb-xd5-meter circle { fill: none; stroke-width: 2.4; }
.hb-xd5-meter .hb-xd5-trk { stroke: #262626; }
.hb-xd5-meter .hb-xd5-arc { stroke: var(--hb-xd5-c); stroke-linecap: round; transition: stroke-dashoffset 0.25s cubic-bezier(0.3, 0.9, 0.3, 1); }
.hb-xd5-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 38px;
  padding: 0 14px;
  font: inherit;
  font-weight: 600;
  white-space: nowrap;
  color: #6b6b6b;
  background: #161616;
  border: 1px solid #262626;
  border-radius: 10px;
  cursor: not-allowed;
  overflow: hidden;
  transition: color 0.25s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, transform 0.18s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-xd5[data-match="true"] .hb-xd5-btn {
  color: #fff;
  cursor: pointer;
  border-color: color-mix(in srgb, var(--hb-xd5-c) 70%, #000);
  background:
    linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 60%),
    var(--hb-xd5-c);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 18px -8px var(--hb-xd5-c);
}
.hb-xd5[data-match="true"] .hb-xd5-btn:active { transform: scale(0.97); }
.hb-xd5-btn:focus-visible { outline: 2px solid color-mix(in srgb, var(--hb-xd5-c) 70%, #fff); outline-offset: 2px; }
.hb-xd5-shackle { transform-box: fill-box; transform-origin: 85% 100%; transition: transform 0.45s cubic-bezier(0.3, 1.8, 0.5, 1); }
.hb-xd5[data-match="true"] .hb-xd5-shackle { transform: translateY(-2px) rotate(-28deg); }
.hb-xd5[data-match="true"] .hb-xd5-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
  transform: translateX(-120%);
  animation: hb-xd5-sweep 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}
.hb-xd5-done {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 38px;
  padding: 0 12px;
  color: color-mix(in srgb, var(--hb-xd5-c) 45%, #fff);
  background: color-mix(in srgb, var(--hb-xd5-c) 10%, #111);
  border: 1px solid color-mix(in srgb, var(--hb-xd5-c) 35%, #262626);
  border-radius: 10px;
  animation: hb-xd5-in 0.45s cubic-bezier(0.2, 1.2, 0.4, 1);
}
.hb-xd5-done b { font-weight: 600; color: #fff; }
.hb-xd5-done code { font-family: var(--font-mono), ui-monospace, monospace; font-size: 0.92em; text-decoration: line-through; opacity: 0.7; }
@keyframes hb-xd5-caret { to { visibility: hidden; } }
@keyframes hb-xd5-shake {
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
}
@keyframes hb-xd5-sweep { to { transform: translateX(120%); } }
@keyframes hb-xd5-in { from { opacity: 0; transform: translateY(6px) scale(0.98); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xd5-btn, .hb-xd5-shackle, .hb-xd5-ch, .hb-xd5-meter .hb-xd5-arc { transition: none; }
  .hb-xd5[data-shake="true"] .hb-xd5-field, .hb-xd5[data-match="true"] .hb-xd5-btn::after, .hb-xd5-done, .hb-xd5-ch[data-s="next"]::before { animation: none; }
}
`;

export function ButtonTypeConfirm({
  confirmText = "acme/billing-api",
  label = "Delete",
  doneLabel = "Repository deleted",
  hint = "This permanently deletes the repository, its issues and 214 releases. Type",
  caseSensitive = true,
  accent = "#ef4444",
  resetAfter = 3200,
  disabled = false,
  onConfirm,
  onValueChange,
  className = "",
  style,
  ...rest
}: ButtonTypeConfirmProps) {
  const id = React.useId();
  const [value, setValue] = React.useState("");
  const [shake, setShake] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const latest = React.useRef({ onConfirm, onValueChange });
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    latest.current = { onConfirm, onValueChange };
  }, [onConfirm, onValueChange]);

  React.useEffect(() => {
    if (!shake) return;
    const t = window.setTimeout(() => setShake(0), 340);
    return () => window.clearTimeout(t);
  }, [shake]);

  React.useEffect(() => {
    if (!done || resetAfter <= 0) return;
    const t = window.setTimeout(() => {
      setDone(false);
      setValue("");
    }, resetAfter);
    return () => window.clearTimeout(t);
  }, [done, resetAfter]);

  const norm = (s: string) => (caseSensitive ? s : s.toLowerCase());
  const a = norm(value);
  const b = norm(confirmText);
  let prefix = 0;
  while (prefix < a.length && prefix < b.length && a[prefix] === b[prefix]) prefix++;
  const matched = a === b;
  const bad = a.length > prefix;
  const ratio = b.length ? prefix / b.length : 0;
  const circ = 2 * Math.PI * 6;

  const chars = Array.from(confirmText).map((c, i) => {
    let s = "idle";
    if (i < prefix) s = "ok";
    else if (bad && i === prefix) s = "bad";
    else if (!bad && i === prefix && value.length > 0) s = "next";
    return { c, s };
  });

  return (
    <form
      className={`hb-xd5 ${className}`.trim()}
      data-match={matched}
      data-bad={bad}
      data-shake={shake > 0}
      style={{ "--hb-xd5-c": accent, ...style } as React.CSSProperties}
      onSubmit={(e) => {
        e.preventDefault();
        if (disabled || done) return;
        if (!matched) {
          setShake((n) => n + 1);
          inputRef.current?.focus();
          return;
        }
        setDone(true);
        latest.current.onConfirm?.();
      }}
      {...rest}
    >
      <style href="hb-button-type-confirm" precedence="default">{css}</style>
      <p className="hb-xd5-hint" id={`${id}-hint`}>
        {hint}
        <span className="hb-xd5-target" aria-label={confirmText}>
          {chars.map((ch, i) => (
            <span key={i} className="hb-xd5-ch" data-s={ch.s} aria-hidden="true">{ch.c}</span>
          ))}
        </span>
        to confirm.
      </p>
      {done ? (
        <div className="hb-xd5-done" role="status" aria-live="polite">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          <b>{doneLabel}</b>
          <code>{confirmText}</code>
        </div>
      ) : (
        <div className="hb-xd5-row">
          <div className="hb-xd5-field">
            <input
              ref={inputRef}
              className="hb-xd5-input"
              value={value}
              disabled={disabled}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              placeholder={confirmText}
              aria-label={`Type ${confirmText} to confirm`}
              aria-describedby={`${id}-hint`}
              aria-invalid={bad || undefined}
              onChange={(e) => {
                const v = e.target.value;
                const na = norm(v);
                if (na.length > a.length && !b.startsWith(na)) setShake((n) => n + 1);
                setValue(v);
                latest.current.onValueChange?.(v, na === b);
              }}
            />
            <svg className="hb-xd5-meter" viewBox="0 0 16 16" aria-hidden="true">
              <circle className="hb-xd5-trk" cx="8" cy="8" r="6" />
              <circle className="hb-xd5-arc" cx="8" cy="8" r="6" strokeDasharray={circ.toFixed(2)} strokeDashoffset={(circ * (1 - ratio)).toFixed(2)} />
            </svg>
          </div>
          <button type="submit" className="hb-xd5-btn" aria-disabled={!matched || disabled || undefined}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path className="hb-xd5-shackle" d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            {label}
          </button>
        </div>
      )}
    </form>
  );
}
