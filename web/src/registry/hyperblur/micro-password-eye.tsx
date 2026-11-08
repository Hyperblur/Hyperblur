"use client";

import * as React from "react";

export interface MicroPasswordEyeProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "type" | "size"> {
  label?: string;
  value?: string;
  defaultValue?: string;
  revealed?: boolean;
  defaultRevealed?: boolean;
  accent?: string;
  hint?: string;
  onValueChange?: (value: string) => void;
  onRevealedChange?: (revealed: boolean) => void;
}

const css = `
.hb-wf7 {
  --hb-wf7-c: #2f7bff;
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
}
.hb-wf7 *, .hb-wf7 *::before, .hb-wf7 *::after { box-sizing: border-box; }
.hb-wf7-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.hb-wf7-lb { font-size: 12.5px; font-weight: 500; color: #bdbdbd; }
.hb-wf7-caps {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(255, 176, 32, 0.12);
  color: #ffc35a;
  font-size: 10.5px;
  font-weight: 600;
  opacity: 0;
  transform: translateY(3px);
  transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.hb-wf7-caps[data-on="true"] { opacity: 1; transform: none; }
.hb-wf7-f {
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  border-radius: 12px;
  background: #0d0d0d;
  border: 1px solid #262626;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.6);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-wf7-f:focus-within { border-color: color-mix(in srgb, var(--hb-wf7-c) 70%, #262626); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wf7-c) 20%, transparent), inset 0 1px 2px rgba(0,0,0,0.6); }
.hb-wf7-box { position: relative; flex: 1; min-width: 0; height: 100%; overflow: hidden; }
.hb-wf7-in {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 0 0 14px;
  border: 0;
  background: transparent;
  color: #ededed;
  caret-color: var(--hb-wf7-c);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 14px;
  letter-spacing: 0.04em;
  outline: none;
}
.hb-wf7-in::placeholder { color: #555; letter-spacing: 0; font-family: inherit; }
.hb-wf7[data-flip="true"] .hb-wf7-in { color: transparent; }
.hb-wf7-ov {
  position: absolute;
  left: 14px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 14px;
  letter-spacing: 0.04em;
  white-space: pre;
  perspective: 120px;
}
.hb-wf7-ch { position: relative; display: inline-block; }
.hb-wf7-ch > span { display: inline-block; backface-visibility: hidden; }
.hb-wf7-ch > span:last-child { position: absolute; left: 0; top: 0; width: 100%; text-align: center; }
.hb-wf7-ov[data-to="text"] .hb-wf7-ch > span:first-child { animation: hb-wf7-in 0.32s cubic-bezier(0.3, 1.4, 0.5, 1) both; animation-delay: var(--hb-wf7-d); }
.hb-wf7-ov[data-to="text"] .hb-wf7-ch > span:last-child { animation: hb-wf7-out 0.32s cubic-bezier(0.3, 1.4, 0.5, 1) both; animation-delay: var(--hb-wf7-d); }
.hb-wf7-ov[data-to="dots"] .hb-wf7-ch > span:first-child { animation: hb-wf7-out 0.32s cubic-bezier(0.3, 1.4, 0.5, 1) both; animation-delay: var(--hb-wf7-d); }
.hb-wf7-ov[data-to="dots"] .hb-wf7-ch > span:last-child { animation: hb-wf7-in 0.32s cubic-bezier(0.3, 1.4, 0.5, 1) both; animation-delay: var(--hb-wf7-d); }
@keyframes hb-wf7-in { from { transform: rotateX(-90deg); opacity: 0; color: var(--hb-wf7-c); } to { transform: none; opacity: 1; } }
@keyframes hb-wf7-out { from { transform: none; opacity: 1; } to { transform: rotateX(90deg); opacity: 0; } }
.hb-wf7-eye {
  flex: none;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  margin: 0 3px 0 6px;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #8a8a8a;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.hb-wf7-eye:hover { background: #1a1a1a; color: #ededed; }
.hb-wf7-eye:active { transform: scale(0.9); }
.hb-wf7-eye:focus-visible { outline: 2px solid var(--hb-wf7-c); outline-offset: 0; }
.hb-wf7-eye svg { width: 22px; height: 22px; overflow: visible; }
.hb-wf7-open { transform-origin: 12px 12px; transform: scaleY(0.08); opacity: 0; transition: transform 0.28s cubic-bezier(0.3, 1.5, 0.5, 1), opacity 0.15s ease; }
.hb-wf7-shut { transition: opacity 0.18s ease; }
.hb-wf7[data-shown="true"] .hb-wf7-open { transform: none; opacity: 1; }
.hb-wf7[data-shown="true"] .hb-wf7-shut { opacity: 0; }
.hb-wf7[data-shown="true"] .hb-wf7-eye { color: var(--hb-wf7-c); }
.hb-wf7-pu { transition: transform 0.18s ease-out; }
.hb-wf7-ht { font-size: 11px; color: #6f6f6f; }
@media (prefers-reduced-motion: reduce) {
  .hb-wf7-open, .hb-wf7-shut, .hb-wf7-pu, .hb-wf7-eye, .hb-wf7-caps, .hb-wf7-f { transition: none; }
  .hb-wf7-ov { display: none; }
  .hb-wf7[data-flip="true"] .hb-wf7-in { color: #ededed; }
}
`;

export function MicroPasswordEye({
  label = "Password",
  value,
  defaultValue = "",
  revealed,
  defaultRevealed = false,
  accent = "#2f7bff",
  hint,
  placeholder = "Enter your password",
  autoComplete = "current-password",
  onValueChange,
  onRevealedChange,
  onKeyDown,
  onKeyUp,
  className = "",
  style,
  id,
  disabled,
  ...rest
}: MicroPasswordEyeProps) {
  const autoId = React.useId();
  const inputId = id ?? `hb-wf7-${autoId.replace(/:/g, "")}`;
  const [inner, setInner] = React.useState(defaultValue);
  const [innerShown, setInnerShown] = React.useState(defaultRevealed);
  const v = value ?? inner;
  const shown = revealed ?? innerShown;
  const [flip, setFlip] = React.useState<{ to: "text" | "dots"; n: number; scroll: number } | null>(null);
  const [look, setLook] = React.useState({ x: 0, y: 0 });
  const [caps, setCaps] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const eyeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!flip) return;
    const ms = Math.min(v.length, 24) * 22 + 360;
    const t = window.setTimeout(() => setFlip(null), ms);
    return () => window.clearTimeout(t);
  }, [flip, v.length]);

  const toggle = () => {
    const next = !shown;
    if (revealed === undefined) setInnerShown(next);
    onRevealedChange?.(next);
    if (v.length) setFlip((f) => ({ to: next ? "text" : "dots", n: (f?.n ?? 0) + 1, scroll: inputRef.current?.scrollLeft ?? 0 }));
  };

  const lookAt = (cx: number, cy: number) => {
    const el = eyeRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = cx - (r.left + r.width / 2);
    const dy = cy - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy) || 1;
    const k = Math.min(1, d / 120);
    setLook({ x: (dx / d) * 2.4 * k, y: (dy / d) * 1.6 * k });
  };

  const lookAtCaret = () => {
    const el = inputRef.current;
    const eye = eyeRef.current;
    if (!el || !eye) return;
    const r = el.getBoundingClientRect();
    const pos = el.selectionStart ?? v.length;
    lookAt(r.left + 14 + pos * 9.1 - el.scrollLeft, r.top + r.height / 2);
  };

  const chars = Array.from(v);

  return (
    <div
      ref={rootRef}
      className={`hb-wf7 ${className}`}
      data-shown={shown}
      data-flip={!!flip}
      style={{ ...style, ["--hb-wf7-c" as string]: accent }}
      onPointerMove={(e) => lookAt(e.clientX, e.clientY)}
      onPointerLeave={() => setLook({ x: 0, y: 0 })}
    >
      <style href="hb-micro-password-eye" precedence="default">
        {css}
      </style>
      <div className="hb-wf7-top">
        <label className="hb-wf7-lb" htmlFor={inputId}>
          {label}
        </label>
        <span className="hb-wf7-caps" data-on={caps} aria-live="polite">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <path d="M5 1l4 4.2H6.6V7H3.4V5.2H1zM3.4 8h3.2v1H3.4z" />
          </svg>
          {caps ? "Caps Lock is on" : ""}
        </span>
      </div>
      <div className="hb-wf7-f">
        <div className="hb-wf7-box">
          <input
            ref={inputRef}
            id={inputId}
            className="hb-wf7-in"
            type={shown ? "text" : "password"}
            value={v}
            placeholder={placeholder}
            autoComplete={autoComplete}
            spellCheck={false}
            autoCapitalize="off"
            disabled={disabled}
            onChange={(e) => {
              if (value === undefined) setInner(e.target.value);
              onValueChange?.(e.target.value);
              setFlip(null);
              lookAtCaret();
            }}
            onKeyDown={(e) => {
              onKeyDown?.(e);
              setCaps(e.getModifierState?.("CapsLock") ?? false);
            }}
            onKeyUp={(e) => {
              onKeyUp?.(e);
              setCaps(e.getModifierState?.("CapsLock") ?? false);
              lookAtCaret();
            }}
            {...rest}
          />
          {flip ? (
            <span key={flip.n} className="hb-wf7-ov" data-to={flip.to} aria-hidden="true" style={{ transform: `translateX(${(-flip.scroll).toFixed(1)}px)` }}>
              {chars.map((c, i) => (
                <span key={i} className="hb-wf7-ch" style={{ ["--hb-wf7-d" as string]: `${Math.min(i, 24) * 22}ms` }}>
                  <span>{c}</span>
                  <span>{"•"}</span>
                </span>
              ))}
            </span>
          ) : null}
        </div>
        <button
          ref={eyeRef}
          type="button"
          className="hb-wf7-eye"
          aria-label={shown ? "Hide password" : "Show password"}
          aria-pressed={shown}
          aria-controls={inputId}
          disabled={disabled}
          onClick={toggle}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <g className="hb-wf7-open">
              <path d="M2.5 12c2.3-4.2 5.6-6.3 9.5-6.3s7.2 2.1 9.5 6.3c-2.3 4.2-5.6 6.3-9.5 6.3S4.8 16.2 2.5 12z" />
              <g className="hb-wf7-pu" style={{ transform: `translate(${look.x.toFixed(2)}px,${look.y.toFixed(2)}px)` }}>
                <circle cx="12" cy="12" r="3.4" />
                <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
              </g>
            </g>
            <g className="hb-wf7-shut">
              <path d="M2.5 11c2.3 3.6 5.6 5.4 9.5 5.4s7.2-1.8 9.5-5.4" />
              <path d="M6 14.6l-1.4 2M12 16.4v2.4M18 14.6l1.4 2M9 15.9l-.6 2.3M15 15.9l.6 2.3" />
            </g>
          </svg>
        </button>
      </div>
      {hint ? <span className="hb-wf7-ht">{hint}</span> : null}
    </div>
  );
}
