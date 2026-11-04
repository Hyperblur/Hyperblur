"use client";

import * as React from "react";

export interface PaySlideToPayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  confirmLabel?: string;
  amount?: string;
  onConfirm?: () => void;
  accent?: string;
  threshold?: number;
  resetMs?: number;
  disabled?: boolean;
}

const css = `
.hb-qf6 {
  --hb-qf6-h: 48px;
  --hb-qf6-pad: 4px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: calc(var(--hb-qf6-h) + var(--hb-qf6-pad) * 2);
  overflow: hidden;
  color: #ededed;
  font-family: inherit;
  font-size: 14px;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  user-select: none;
  -webkit-user-select: none;
  transition: border-color 0.4s ease;
}
.hb-qf6 *, .hb-qf6 *::before, .hb-qf6 *::after { box-sizing: border-box; }
.hb-qf6[data-state="done"] { border-color: #15803d; }
.hb-qf6[data-disabled="true"] { opacity: 0.5; }
.hb-qf6-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: calc(var(--hb-qf6-h) + var(--hb-qf6-pad) * 2 + var(--hb-qf6-p, 0) * (100% - var(--hb-qf6-h) - var(--hb-qf6-pad) * 2));
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-qf6-x) 35%, #111111), var(--hb-qf6-x));
  border-radius: 999px;
  transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease;
}
.hb-qf6[data-drag="true"] .hb-qf6-fill, .hb-qf6[data-drag="true"] .hb-qf6-handle { transition: none; }
.hb-qf6[data-state="done"] .hb-qf6-fill { background: #15803d; }
.hb-qf6-label {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 0 20px 0 calc(var(--hb-qf6-h) + var(--hb-qf6-pad) * 2);
  pointer-events: none;
}
.hb-qf6-label > span {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  white-space: nowrap;
  transition: opacity 0.3s ease, transform 0.35s ease;
}
.hb-qf6-idle {
  color: transparent;
  background: linear-gradient(100deg, #8f8f8f 35%, #ffffff 50%, #8f8f8f 65%) 0 0 / 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: hb-qf6-shine 3.2s linear infinite;
}
.hb-qf6-ok { color: #fff; opacity: 0; transform: translateY(60%); }
.hb-qf6[data-state="done"] .hb-qf6-idle { opacity: 0; transform: translateY(-60%); animation: none; }
.hb-qf6[data-state="done"] .hb-qf6-ok { opacity: 1; transform: none; }
.hb-qf6[data-drag="true"] .hb-qf6-idle { opacity: calc(1 - var(--hb-qf6-p, 0) * 1.6); }
.hb-qf6-amt { font-variant-numeric: tabular-nums; }
.hb-qf6-handle {
  position: absolute;
  top: var(--hb-qf6-pad);
  left: calc(var(--hb-qf6-pad) + var(--hb-qf6-p, 0) * (100% - var(--hb-qf6-h) - var(--hb-qf6-pad) * 2));
  display: grid;
  place-items: center;
  width: var(--hb-qf6-h);
  height: var(--hb-qf6-h);
  margin: 0;
  padding: 0;
  color: #0a0a0a;
  background: #ededed;
  border: 0;
  border-radius: 50%;
  box-shadow: 0 4px 14px -4px rgba(0, 0, 0, 0.6);
  cursor: grab;
  touch-action: none;
  transition: left 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.35s ease, color 0.35s ease;
  animation: hb-qf6-nudge 3.6s ease-in-out infinite;
}
.hb-qf6[data-drag="true"] .hb-qf6-handle { cursor: grabbing; animation: none; }
.hb-qf6[data-state="done"] .hb-qf6-handle { color: #15803d; background: #fff; animation: none; cursor: default; }
.hb-qf6-handle:focus-visible { outline: 2px solid #fff; outline-offset: 2px; box-shadow: 0 0 0 5px var(--hb-qf6-x); }
.hb-qf6-ic { grid-area: 1 / 1; width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-qf6-ic-go { animation: hb-qf6-chev 1.4s ease-in-out infinite; }
.hb-qf6-ic-ok { opacity: 0; transform: scale(0.4) rotate(-30deg); }
.hb-qf6-ic-ok path { stroke-dasharray: 1 1.2; stroke-dashoffset: 1; transition: stroke-dashoffset 0.4s ease 0.15s; }
.hb-qf6[data-state="done"] .hb-qf6-ic-go { opacity: 0; transform: scale(0.4); animation: none; }
.hb-qf6[data-state="done"] .hb-qf6-ic-ok { opacity: 1; transform: none; }
.hb-qf6[data-state="done"] .hb-qf6-ic-ok path { stroke-dashoffset: 0; }
.hb-qf6-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-qf6-shine { from { background-position: 150% 0; } to { background-position: -100% 0; } }
@keyframes hb-qf6-nudge {
  0%, 62%, 100% { translate: 0 0; }
  74% { translate: 14px 0; }
  86% { translate: 0 0; }
}
@keyframes hb-qf6-chev {
  0%, 100% { transform: translateX(-1px); }
  50% { transform: translateX(2px); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qf6, .hb-qf6-fill, .hb-qf6-handle, .hb-qf6-label > span, .hb-qf6-ic, .hb-qf6-ic-ok path { transition: none; }
  .hb-qf6-idle, .hb-qf6-handle, .hb-qf6-ic-go { animation: none; }
}
`;

export function PaySlideToPay({
  label = "Slide to pay",
  confirmLabel = "Payment sent",
  amount,
  onConfirm,
  accent = "#2f7bff",
  threshold = 0.9,
  resetMs = 2600,
  disabled = false,
  className = "",
  style,
  ...rest
}: PaySlideToPayProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const handleRef = React.useRef<HTMLButtonElement>(null);
  const pRef = React.useRef(0);
  const drag = React.useRef<{ x: number; p: number; travel: number } | null>(null);
  const timer = React.useRef(0);
  const latest = React.useRef(onConfirm);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    latest.current = onConfirm;
  }, [onConfirm]);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  function setP(p: number) {
    const clamped = Math.min(1, Math.max(0, p));
    pRef.current = clamped;
    rootRef.current?.style.setProperty("--hb-qf6-p", clamped.toFixed(4));
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(clamped * 100)));
  }

  function confirm() {
    if (done || disabled) return;
    setP(1);
    setDone(true);
    latest.current?.();
    if (resetMs > 0) {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setDone(false);
        setP(0);
      }, resetMs);
    }
  }

  function settle() {
    if (pRef.current >= threshold) confirm();
    else setP(0);
  }

  function onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    const root = rootRef.current;
    if (!root || done || disabled || event.button !== 0) return;
    const style = getComputedStyle(root);
    const h = parseFloat(style.getPropertyValue("--hb-qf6-h"));
    const pad = parseFloat(style.getPropertyValue("--hb-qf6-pad"));
    const travel = Math.max(1, root.clientWidth - h - pad * 2);
    drag.current = { x: event.clientX, p: pRef.current, travel };
    event.currentTarget.setPointerCapture(event.pointerId);
    root.dataset.drag = "true";
  }

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const d = drag.current;
    if (!d) return;
    setP(d.p + (event.clientX - d.x) / d.travel);
  }

  function endDrag(event: React.PointerEvent<HTMLButtonElement>) {
    if (!drag.current) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (rootRef.current) rootRef.current.dataset.drag = "false";
    settle();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (done || disabled) return;
    if (event.key === "Enter") {
      event.preventDefault();
      confirm();
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.min(1, pRef.current + 0.25);
      setP(next);
      if (next >= 1) confirm();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown" || event.key === "Escape") {
      event.preventDefault();
      setP(pRef.current - 0.25);
    }
  }

  const vars = { "--hb-qf6-x": accent, ...style } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`hb-qf6 ${className}`}
      style={vars}
      data-state={done ? "done" : "idle"}
      data-drag="false"
      data-disabled={disabled}
      {...rest}
    >
      <style href="hb-pay-slide-to-pay" precedence="default">{css}</style>
      <div className="hb-qf6-fill" aria-hidden="true" />
      <div className="hb-qf6-label" aria-hidden="true">
        <span className="hb-qf6-idle">
          {label}
          {amount && <span className="hb-qf6-amt">{amount}</span>}
        </span>
        <span className="hb-qf6-ok">{confirmLabel}</span>
      </div>
      <button
        ref={handleRef}
        type="button"
        role="slider"
        className="hb-qf6-handle"
        aria-label={`${label}${amount ? ` ${amount}` : ""}. Press Enter to confirm or use the arrow keys.`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={done ? 100 : 0}
        disabled={disabled}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        <svg className="hb-qf6-ic hb-qf6-ic-go" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 12h12M13 6l6 6-6 6" />
        </svg>
        <svg className="hb-qf6-ic hb-qf6-ic-ok" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12.5l4.6 4.6L19 7.5" pathLength="1" />
        </svg>
      </button>
      <span className="hb-qf6-sr" role="status" aria-live="polite">
        {done ? confirmLabel : ""}
      </span>
    </div>
  );
}
