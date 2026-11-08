"use client";

import * as React from "react";

export interface MicroSlideUnlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  label?: string;
  unlockedLabel?: string;
  accent?: string;
  resetAfter?: number;
  idle?: boolean;
  disabled?: boolean;
  onUnlock?: () => void;
}

const css = `
.hb-wf2 {
  --hb-wf2-c: #2f7bff;
  --hb-wf2-p: 0;
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 56px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 999px;
  background: linear-gradient(180deg, #0c0c0c 0%, #151515 100%);
  border: 1px solid #262626;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.65), 0 1px 0 rgba(255,255,255,0.04);
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y;
  overflow: hidden;
  font-family: inherit;
  transition: border-color 0.4s ease, background 0.5s ease;
}
.hb-wf2 *, .hb-wf2 *::before, .hb-wf2 *::after { box-sizing: border-box; }
.hb-wf2[data-disabled="true"] { opacity: 0.45; }
.hb-wf2-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-wf2-c) 6%, transparent), color-mix(in srgb, var(--hb-wf2-c) 32%, transparent));
  pointer-events: none;
}
.hb-wf2-txt {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-left: 46px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  pointer-events: none;
  opacity: calc(1 - var(--hb-wf2-p) * 1.7);
}
.hb-wf2-sh {
  color: transparent;
  background: linear-gradient(100deg, #5c5c5c 0%, #5c5c5c 40%, #f2f2f2 50%, #5c5c5c 60%, #5c5c5c 100%);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: hb-wf2-shine 2.6s cubic-bezier(0.45, 0, 0.3, 1) infinite;
}
.hb-wf2-chev { display: inline-flex; color: #4a4a4a; }
.hb-wf2-chev svg { width: 14px; height: 14px; animation: hb-wf2-chev 1.6s ease-in-out infinite; }
.hb-wf2-chev svg + svg { margin-left: -8px; animation-delay: 0.15s; }
@keyframes hb-wf2-shine { 0% { background-position: 120% 0; } 100% { background-position: -20% 0; } }
@keyframes hb-wf2-chev { 0%, 100% { opacity: 0.25; transform: translateX(0); } 50% { opacity: 1; transform: translateX(2px); } }
.hb-wf2-done {
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
  transition: opacity 0.3s ease 0.12s, transform 0.4s cubic-bezier(0.2, 1.4, 0.4, 1) 0.12s;
  pointer-events: none;
}
.hb-wf2[data-done="true"] { border-color: color-mix(in srgb, var(--hb-wf2-c) 60%, #262626); background: linear-gradient(180deg, color-mix(in srgb, var(--hb-wf2-c) 70%, #000), var(--hb-wf2-c)); }
.hb-wf2[data-done="true"] .hb-wf2-done { opacity: 1; transform: none; }
.hb-wf2[data-done="true"] .hb-wf2-fill { opacity: 0; }
.hb-wf2-rail {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 44px;
  height: 44px;
  transition: transform 0.55s cubic-bezier(0.25, 1.45, 0.4, 1);
  will-change: transform;
}
.hb-wf2[data-drag="true"] .hb-wf2-rail { transition: none; }
.hb-wf2-k {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 999px;
  background: radial-gradient(circle at 50% 28%, #ffffff 0%, #e6e6e6 55%, #cfcfcf 100%);
  color: #161616;
  box-shadow: 0 4px 10px rgba(0,0,0,0.55), inset 0 -2px 3px rgba(0,0,0,0.15), inset 0 1px 0 #fff;
  cursor: grab;
  touch-action: none;
  transition: transform 0.2s cubic-bezier(0.3, 1.5, 0.5, 1), box-shadow 0.2s ease;
}
.hb-wf2-k:focus-visible { outline: 2px solid var(--hb-wf2-c); outline-offset: 3px; }
.hb-wf2[data-drag="true"] .hb-wf2-k { cursor: grabbing; transform: scale(1.06); box-shadow: 0 8px 18px rgba(0,0,0,0.6), 0 0 0 6px color-mix(in srgb, var(--hb-wf2-c) 18%, transparent); }
.hb-wf2[data-idle="true"] .hb-wf2-k { animation: hb-wf2-nudge 3.4s cubic-bezier(0.4, 0, 0.2, 1) infinite 1s; }
@keyframes hb-wf2-nudge {
  0%, 62%, 100% { transform: translateX(0); }
  72% { transform: translateX(22px); }
  80% { transform: translateX(-3px); }
  86% { transform: translateX(6px); }
  92% { transform: translateX(0); }
}
.hb-wf2-k svg { width: 20px; height: 20px; overflow: visible; }
.hb-wf2-shk { transition: transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1); transform-origin: 8px 11px; }
.hb-wf2[data-done="true"] .hb-wf2-k { color: var(--hb-wf2-c); }
@media (prefers-reduced-motion: reduce) {
  .hb-wf2, .hb-wf2-rail, .hb-wf2-k, .hb-wf2-done, .hb-wf2-shk { transition: none; }
  .hb-wf2-sh, .hb-wf2-chev svg, .hb-wf2[data-idle="true"] .hb-wf2-k { animation: none; }
  .hb-wf2-sh { color: #9a9a9a; background: none; }
}
`;

export function MicroSlideUnlock({
  label = "slide to unlock",
  unlockedLabel = "Unlocked",
  accent = "#2f7bff",
  resetAfter = 1800,
  idle = true,
  disabled = false,
  onUnlock,
  className = "",
  style,
  ...rest
}: MicroSlideUnlockProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef({ on: false, startX: 0, base: 0 });
  const [x, setX] = React.useState(0);
  const [max, setMax] = React.useState(240);
  const [dragging, setDragging] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setMax(Math.max(40, el.clientWidth - 10 - 44)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    if (!done || resetAfter <= 0) return;
    const t = window.setTimeout(() => {
      setDone(false);
      setX(0);
    }, resetAfter);
    return () => window.clearTimeout(t);
  }, [done, resetAfter]);

  const unlock = () => {
    setX(max);
    setDone(true);
    onUnlock?.();
  };

  const p = done ? 1 : Math.max(0, Math.min(1, x / max));
  const pos = done ? max : x;

  return (
    <div
      ref={rootRef}
      className={`hb-wf2 ${className}`}
      data-drag={dragging}
      data-done={done}
      data-disabled={disabled}
      data-idle={idle && !touched && !dragging && !done && !disabled}
      style={{ ...style, ["--hb-wf2-c" as string]: accent, ["--hb-wf2-p" as string]: p.toFixed(3) }}
      {...rest}
    >
      <style href="hb-micro-slide-unlock" precedence="default">
        {css}
      </style>
      <span className="hb-wf2-fill" style={{ width: `${(pos + 54).toFixed(1)}px` }} />
      <span className="hb-wf2-txt" aria-hidden="true">
        <span className="hb-wf2-sh">{label}</span>
        <span className="hb-wf2-chev">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3l5 5-5 5" />
          </svg>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </span>
      </span>
      <span className="hb-wf2-done" aria-live="polite">
        {done ? (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
            {unlockedLabel}
          </>
        ) : null}
      </span>
      <span className="hb-wf2-rail" style={{ transform: `translate3d(${pos.toFixed(1)}px,0,0)` }}>
        <button
          type="button"
          role="slider"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(p * 100)}
          aria-valuetext={done ? unlockedLabel : `${Math.round(p * 100)}%`}
          disabled={disabled}
          className="hb-wf2-k"
          onPointerDown={(e) => {
            if (disabled || done) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            drag.current = { on: true, startX: e.clientX, base: x };
            setDragging(true);
            setTouched(true);
          }}
          onPointerMove={(e) => {
            if (!drag.current.on) return;
            const raw = drag.current.base + e.clientX - drag.current.startX;
            const over = raw > max ? max + (raw - max) * 0.15 : raw < 0 ? raw * 0.15 : raw;
            setX(Math.min(max + 8, Math.max(-8, over)));
          }}
          onPointerUp={() => {
            if (!drag.current.on) return;
            drag.current.on = false;
            setDragging(false);
            if (x >= max * 0.88) unlock();
            else setX(0);
          }}
          onPointerCancel={() => {
            drag.current.on = false;
            setDragging(false);
            setX(0);
          }}
          onKeyDown={(e) => {
            if (disabled || done) return;
            setTouched(true);
            if (e.key === "ArrowRight") {
              e.preventDefault();
              const n = Math.min(max, x + max * 0.25);
              if (n >= max) unlock();
              else setX(n);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              setX(Math.max(0, x - max * 0.25));
            } else if (e.key === "End" || e.key === "Enter") {
              e.preventDefault();
              unlock();
            } else if (e.key === "Home" || e.key === "Escape") {
              setX(0);
            }
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path
              className="hb-wf2-shk"
              d="M8 11V8a4 4 0 0 1 8 0v3"
              style={{
                transform: done
                  ? "translate(0px,-3.5px) rotate(-22deg)"
                  : `translate(0px,${(-p * 2.5).toFixed(2)}px)`,
              }}
            />
            <rect x="5" y="11" width="14" height="10" rx="2.5" fill="currentColor" stroke="none" />
            <circle cx="12" cy="16" r="1.4" fill="#ffffff" stroke="none" />
          </svg>
        </button>
      </span>
    </div>
  );
}
