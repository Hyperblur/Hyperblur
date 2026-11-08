"use client";

import * as React from "react";

export type ButtonSwipeConfirmStatus = "idle" | "pending" | "done";

export interface ButtonSwipeConfirmProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  pendingLabel?: string;
  doneLabel?: string;
  onConfirm?: () => unknown;
  threshold?: number;
  pendingDuration?: number;
  resetAfter?: number;
  accent?: string;
  disabled?: boolean;
}

const css = `
.hb-xb1 {
  --hb-xb1-c: #2f7bff;
  --hb-xb1-h: 56px;
  --hb-xb1-k: 46px;
  --hb-xb1-p: 0;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 340px;
  height: var(--hb-xb1-h);
  padding: 5px;
  border-radius: 999px;
  font-family: inherit;
  color: #ededed;
  background: linear-gradient(180deg, #121212 0%, #181818 100%);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.6), inset 0 0 0 1px #262626, 0 1px 0 rgba(255, 255, 255, 0.04);
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y;
  overflow: hidden;
  isolation: isolate;
}
.hb-xb1 *, .hb-xb1 *::before, .hb-xb1 *::after { box-sizing: border-box; }
.hb-xb1-fill {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  width: calc(var(--hb-xb1-k) + var(--hb-xb1-x, 0px));
  border-radius: 999px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xb1-c) 10%, transparent), color-mix(in srgb, var(--hb-xb1-c) 42%, transparent));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xb1-c) 35%, transparent);
  z-index: 0;
}
.hb-xb1[data-drag="false"] .hb-xb1-fill { transition: width 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease; }
.hb-xb1[data-status="done"] .hb-xb1-fill {
  width: calc(100% - 10px);
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xb1-c) 70%, #000), var(--hb-xb1-c));
  transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease;
}
.hb-xb1-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-left: calc(var(--hb-xb1-k) + 14px);
  padding-right: 18px;
  font-size: 14px;
  font-weight: 560;
  letter-spacing: -0.005em;
  white-space: nowrap;
  opacity: calc(1 - var(--hb-xb1-p) * 1.6);
  transform: translateX(calc(var(--hb-xb1-p) * 18px));
  z-index: 1;
  pointer-events: none;
}
.hb-xb1-text {
  background: linear-gradient(100deg, #6f6f6f 0%, #6f6f6f 38%, #f5f5f5 50%, #6f6f6f 62%, #6f6f6f 100%);
  background-size: 260% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: hb-xb1-shine 2.6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
.hb-xb1-chev { display: inline-flex; gap: 1px; }
.hb-xb1-chev svg { width: 9px; height: 12px; fill: none; stroke: #8f8f8f; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; animation: hb-xb1-chev 1.6s ease-in-out infinite; }
.hb-xb1-chev svg:nth-child(2) { animation-delay: 0.14s; }
.hb-xb1-chev svg:nth-child(3) { animation-delay: 0.28s; }
.hb-xb1-state {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 1;
  pointer-events: none;
  white-space: nowrap;
}
.hb-xb1[data-status="pending"] .hb-xb1-state[data-for="pending"],
.hb-xb1[data-status="done"] .hb-xb1-state[data-for="done"] { opacity: 1; transform: none; }
.hb-xb1[data-status="pending"] .hb-xb1-state[data-for="pending"] { color: #d4d4d4; padding-right: calc(var(--hb-xb1-k) + 8px); }
.hb-xb1-knob {
  position: absolute;
  top: 5px;
  left: 5px;
  width: var(--hb-xb1-k);
  height: var(--hb-xb1-k);
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  color: #0a0a0a;
  background: radial-gradient(120% 120% at 30% 20%, #ffffff 0%, #e9e9e9 55%, #cfcfcf 100%);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset, 0 6px 14px -4px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5);
  transform: translateX(var(--hb-xb1-x, 0px));
  cursor: grab;
  z-index: 2;
  font: inherit;
  touch-action: none;
}
.hb-xb1[data-drag="true"] .hb-xb1-knob { cursor: grabbing; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset, 0 10px 22px -6px rgba(0, 0, 0, 0.8), 0 0 0 6px color-mix(in srgb, var(--hb-xb1-c) 18%, transparent); }
.hb-xb1[data-drag="false"] .hb-xb1-knob { transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, background 0.3s ease, color 0.3s ease; }
.hb-xb1[data-status="done"] .hb-xb1-knob { color: var(--hb-xb1-c); cursor: default; }
.hb-xb1-knob:focus-visible { outline: 2px solid var(--hb-xb1-c); outline-offset: 3px; }
.hb-xb1-ico { position: absolute; display: grid; place-items: center; transition: opacity 0.25s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xb1-ico svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-xb1-ico[data-i="spin"], .hb-xb1-ico[data-i="check"] { opacity: 0; transform: scale(0.4); }
.hb-xb1[data-status="pending"] .hb-xb1-ico[data-i="arrow"], .hb-xb1[data-status="done"] .hb-xb1-ico[data-i="arrow"] { opacity: 0; transform: scale(0.4) rotate(-40deg); }
.hb-xb1[data-status="pending"] .hb-xb1-ico[data-i="spin"] { opacity: 1; transform: none; }
.hb-xb1[data-status="done"] .hb-xb1-ico[data-i="check"] { opacity: 1; transform: none; }
.hb-xb1-ico[data-i="spin"] svg { animation: hb-xb1-spin 0.8s linear infinite; stroke-width: 2.4; }
.hb-xb1-ico[data-i="check"] path { stroke-dasharray: 22; stroke-dashoffset: 22; }
.hb-xb1[data-status="done"] .hb-xb1-ico[data-i="check"] path { animation: hb-xb1-draw 0.42s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards; }
.hb-xb1[data-disabled="true"] { opacity: 0.45; }
.hb-xb1[data-disabled="true"] .hb-xb1-knob { cursor: not-allowed; }
@keyframes hb-xb1-shine { 0% { background-position: 100% 0; } 100% { background-position: 0% 0; } }
@keyframes hb-xb1-chev { 0%, 100% { opacity: 0.25; transform: translateX(0); } 50% { opacity: 1; transform: translateX(2px); } }
@keyframes hb-xb1-spin { to { transform: rotate(360deg); } }
@keyframes hb-xb1-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xb1-text, .hb-xb1-chev svg { animation: none; }
  .hb-xb1-text { color: #a1a1a1; background: none; }
  .hb-xb1 *, .hb-xb1-fill { transition-duration: 0.01s !important; }
  .hb-xb1-ico[data-i="spin"] svg { animation-duration: 1.6s; }
  .hb-xb1[data-status="done"] .hb-xb1-ico[data-i="check"] path { animation: none; stroke-dashoffset: 0; }
}
`;

const chevron = (
  <svg viewBox="0 0 9 12" aria-hidden="true">
    <path d="M2 2l4 4-4 4" />
  </svg>
);

export function ButtonSwipeConfirm({
  label = "Slide to pay $48.00",
  pendingLabel = "Processing",
  doneLabel = "Payment sent",
  onConfirm,
  threshold = 0.88,
  pendingDuration = 1100,
  resetAfter = 0,
  accent = "#2f7bff",
  disabled = false,
  className = "",
  style,
  ...rest
}: ButtonSwipeConfirmProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const start = React.useRef<{ x: number; base: number; max: number } | null>(null);
  const timers = React.useRef<number[]>([]);
  const [x, setX] = React.useState(0);
  const [max, setMax] = React.useState(1);
  const [dragging, setDragging] = React.useState(false);
  const [status, setStatus] = React.useState<ButtonSwipeConfirmStatus>("idle");

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  const measure = () => {
    const el = trackRef.current;
    if (!el) return 1;
    const m = Math.max(1, el.clientWidth - 10 - 46);
    setMax(m);
    return m;
  };

  const commit = (m: number) => {
    setX(m);
    setStatus("pending");
    timers.current.push(
      window.setTimeout(() => {
        setStatus("done");
        onConfirm?.();
        if (resetAfter > 0) {
          timers.current.push(
            window.setTimeout(() => {
              setStatus("idle");
              setX(0);
            }, resetAfter),
          );
        }
      }, pendingDuration),
    );
  };

  const locked = disabled || status !== "idle";

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (locked) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, base: x, max: measure() };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const s = start.current;
    if (!s) return;
    let next = s.base + e.clientX - s.x;
    if (next < 0) next = next * 0.18;
    if (next > s.max) next = s.max + (next - s.max) * 0.18;
    setX(next);
  };

  const onPointerUp = () => {
    const s = start.current;
    if (!s) return;
    start.current = null;
    setDragging(false);
    if (x / s.max >= threshold) commit(s.max);
    else setX(0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (locked) return;
    const m = measure();
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      commit(m);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = Math.min(m, x + m * 0.2);
      if (next / m >= threshold) commit(m);
      else setX(next);
    } else if (e.key === "ArrowLeft" || e.key === "Home") {
      e.preventDefault();
      setX(e.key === "Home" ? 0 : Math.max(0, x - m * 0.2));
    } else if (e.key === "End") {
      e.preventDefault();
      commit(m);
    }
  };

  const p = Math.max(0, Math.min(1, x / max));
  const vars = {
    "--hb-xb1-c": accent,
    "--hb-xb1-x": `${x.toFixed(1)}px`,
    "--hb-xb1-p": p.toFixed(3),
  } as React.CSSProperties;

  return (
    <div
      ref={trackRef}
      className={`hb-xb1 ${className}`.trim()}
      data-drag={dragging ? "true" : "false"}
      data-status={status}
      data-disabled={disabled ? "true" : "false"}
      style={{ ...vars, ...style }}
      {...rest}
    >
      <style href="hb-button-swipe-confirm" precedence="default">{css}</style>
      <div className="hb-xb1-fill" aria-hidden="true" />
      <div className="hb-xb1-label" aria-hidden="true">
        <span className="hb-xb1-text">{label}</span>
        <span className="hb-xb1-chev">
          {chevron}
          {chevron}
          {chevron}
        </span>
      </div>
      <div className="hb-xb1-state" data-for="pending" aria-hidden="true">{pendingLabel}</div>
      <div className="hb-xb1-state" data-for="done" aria-hidden="true">{doneLabel}</div>
      <button
        type="button"
        role="slider"
        className="hb-xb1-knob"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(p * 100)}
        aria-valuetext={status === "done" ? doneLabel : status === "pending" ? pendingLabel : `${Math.round(p * 100)}%`}
        aria-disabled={locked || undefined}
        disabled={disabled}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <span className="hb-xb1-ico" data-i="arrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        </span>
        <span className="hb-xb1-ico" data-i="spin">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3a9 9 0 1 0 9 9" />
          </svg>
        </span>
        <span className="hb-xb1-ico" data-i="check">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
      </button>
      <span role="status" aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {status === "done" ? doneLabel : status === "pending" ? pendingLabel : ""}
      </span>
    </div>
  );
}
