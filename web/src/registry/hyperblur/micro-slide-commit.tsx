"use client";

import * as React from "react";

export interface SlideCommitProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange" | "color"> {
  label?: string;
  committedLabel?: string;
  onCommit?: () => void;
  accent?: string;
  threshold?: number;
  holdDuration?: number;
  resetAfter?: number;
  disabled?: boolean;
}

const css = `
.hb-qs4 {
  --hb-qs4-c: #ff4d5e;
  --hb-qs4-p: 0;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 54px;
  padding: 5px;
  font: inherit;
  font-size: 14px;
  color: #ededed;
  background: #141414;
  border: 1px solid #262626;
  border-radius: 999px;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
  -webkit-user-select: none;
  transition: border-color 0.3s ease;
}
.hb-qs4 *, .hb-qs4 *::before, .hb-qs4 *::after { box-sizing: border-box; font-family: inherit; }
.hb-qs4[data-p="on"] { border-color: color-mix(in srgb, var(--hb-qs4-c) 60%, #262626); }
.hb-qs4[data-disabled="true"] { opacity: 0.45; }
.hb-qs4-f {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: calc(52px + var(--hb-qs4-p) * (100% - 52px));
  border-radius: 999px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-qs4-c) 55%, #141414) 0%, var(--hb-qs4-c) 100%);
  opacity: calc(0.15 + var(--hb-qs4-p) * 0.85);
  transition: width 0.45s cubic-bezier(0.34, 1.4, 0.5, 1), opacity 0.3s ease;
}
.hb-qs4[data-drag="true"] .hb-qs4-f, .hb-qs4[data-hold="true"] .hb-qs4-f { transition: none; }
.hb-qs4-l {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 40px;
  font-weight: 500;
  letter-spacing: 0.01em;
  pointer-events: none;
  opacity: max(0, calc(1 - var(--hb-qs4-p) * 1.7));
}
.hb-qs4-lt {
  color: transparent;
  background: linear-gradient(100deg, #6f6f6f 35%, #f2f2f2 50%, #6f6f6f 65%) 0 0 / 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: hb-qs4-shine 2.8s linear infinite;
}
.hb-qs4-d {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  color: #fff;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.25s ease 0.15s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
}
.hb-qs4[data-done="true"] .hb-qs4-d { opacity: 1; transform: scale(1); }
.hb-qs4[data-done="true"] .hb-qs4-l { opacity: 0; }
.hb-qs4-h {
  position: absolute;
  top: 4px;
  left: calc(4px + var(--hb-qs4-p) * (100% - 52px));
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin: 0;
  padding: 0;
  color: #0a0a0a;
  background: #f2f2f2;
  border: 0;
  border-radius: 999px;
  cursor: grab;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
  transition: left 0.45s cubic-bezier(0.34, 1.4, 0.5, 1), transform 0.2s ease, background-color 0.25s ease, color 0.25s ease;
  animation: hb-qs4-nudge 3.6s ease-in-out infinite;
}
.hb-qs4-h:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-qs4-h:disabled { cursor: not-allowed; animation: none; }
.hb-qs4[data-drag="true"] .hb-qs4-h, .hb-qs4[data-hold="true"] .hb-qs4-h { transition: transform 0.2s ease, background-color 0.25s ease; animation: none; cursor: grabbing; transform: scale(1.04); }
.hb-qs4[data-done="true"] .hb-qs4-h {
  animation: hb-qs4-lock 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: #fff;
  color: var(--hb-qs4-c);
}
.hb-qs4-i { grid-area: 1 / 1; width: 20px; height: 20px; transition: opacity 0.2s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-qs4-ic { opacity: 1; }
.hb-qs4-ik { opacity: 0; transform: scale(0.4) rotate(-30deg); }
.hb-qs4[data-done="true"] .hb-qs4-ic { opacity: 0; transform: scale(0.4); }
.hb-qs4[data-done="true"] .hb-qs4-ik { opacity: 1; transform: scale(1) rotate(0deg); }
.hb-qs4-ic path { animation: hb-qs4-chev 1.4s ease-in-out infinite; }
.hb-qs4-ic path:nth-child(2) { animation-delay: 0.18s; }
.hb-qs4[data-drag="true"] .hb-qs4-ic path, .hb-qs4[data-hold="true"] .hb-qs4-ic path { animation: none; opacity: 1; }
.hb-qs4-sr {
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
@keyframes hb-qs4-shine {
  from { background-position: 150% 0; }
  to { background-position: -50% 0; }
}
@keyframes hb-qs4-nudge {
  0%, 62%, 100% { translate: 0 0; }
  72% { translate: 9px 0; }
  82% { translate: 0 0; }
  90% { translate: 5px 0; }
}
@keyframes hb-qs4-lock {
  0% { transform: scale(1); }
  35% { transform: scale(0.84); }
  70% { transform: scale(1.12); }
  100% { transform: scale(1); }
}
@keyframes hb-qs4-chev {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qs4, .hb-qs4-f, .hb-qs4-h, .hb-qs4-d, .hb-qs4-i { transition: none; }
  .hb-qs4-lt, .hb-qs4-h, .hb-qs4-ic path { animation: none; }
  .hb-qs4-lt { color: #8f8f8f; background: none; }
  .hb-qs4[data-done="true"] .hb-qs4-h { animation: none; }
}
`;

export function SlideCommit({
  label = "Slide to delete",
  committedLabel = "Deleted",
  onCommit,
  accent = "#ff4d5e",
  threshold = 0.92,
  holdDuration = 1200,
  resetAfter = 2200,
  disabled = false,
  className = "",
  style,
  ...rest
}: SlideCommitProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const handleRef = React.useRef<HTMLButtonElement>(null);
  const progress = React.useRef(0);
  const dragging = React.useRef(false);
  const holding = React.useRef(false);
  const raf = React.useRef(0);
  const timer = React.useRef(0);
  const latest = React.useRef(onCommit);
  const hintId = React.useId();
  const [done, setDone] = React.useState(false);
  const [mode, setMode] = React.useState<"idle" | "drag" | "hold">("idle");

  React.useEffect(() => {
    latest.current = onCommit;
  }, [onCommit]);

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(raf.current);
      window.clearTimeout(timer.current);
    };
  }, []);

  function paint(p: number) {
    progress.current = p;
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--hb-qs4-p", p.toFixed(4));
    root.dataset.p = p > 0.02 ? "on" : "off";
  }

  function settle() {
    dragging.current = false;
    holding.current = false;
    cancelAnimationFrame(raf.current);
    setMode("idle");
  }

  function commit() {
    settle();
    paint(1);
    setDone(true);
    latest.current?.();
    if (resetAfter > 0) {
      timer.current = window.setTimeout(() => {
        setDone(false);
        paint(0);
      }, resetAfter);
    }
  }

  function release() {
    if (!dragging.current) return;
    const p = progress.current;
    if (p >= threshold) commit();
    else {
      settle();
      paint(0);
    }
  }

  function readX(clientX: number) {
    const root = rootRef.current;
    const handle = handleRef.current;
    if (!root || !handle) return 0;
    const box = root.getBoundingClientRect();
    const span = Math.max(1, box.width - 2 - 8 - handle.offsetWidth);
    return Math.min(1, Math.max(0, (clientX - box.left - 1 - 4 - handle.offsetWidth / 2) / span));
  }

  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (disabled || done || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    setMode("drag");
  }

  function onPointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!dragging.current) return;
    paint(readX(e.clientX));
  }

  function startHold() {
    if (disabled || done || holding.current || dragging.current) return;
    holding.current = true;
    setMode("hold");
    const from = progress.current;
    const t0 = performance.now();
    const total = Math.max(1, holdDuration);
    function tick(now: number) {
      if (!holding.current) return;
      const p = Math.min(1, from + (now - t0) / total);
      paint(p);
      if (p >= 1) {
        commit();
        return;
      }
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
  }

  function endHold() {
    if (!holding.current) return;
    settle();
    paint(0);
  }

  const vars = { "--hb-qs4-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-micro-slide-commit" precedence="default">{css}</style>
      <div
        ref={rootRef}
        className={`hb-qs4 ${className}`}
        style={vars}
        data-p="off"
        data-done={done}
        data-drag={mode === "drag"}
        data-hold={mode === "hold"}
        data-disabled={disabled}
        {...rest}
      >
        <span className="hb-qs4-f" aria-hidden="true" />
        <span className="hb-qs4-l" aria-hidden="true">
          <span className="hb-qs4-lt">{label}</span>
        </span>
        <span className="hb-qs4-d" aria-hidden="true">
          {committedLabel}
        </span>
        <button
          ref={handleRef}
          type="button"
          className="hb-qs4-h"
          disabled={disabled}
          aria-label={done ? committedLabel : label}
          aria-describedby={hintId}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={release}
          onPointerCancel={release}
          onLostPointerCapture={release}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            if (!e.repeat) startHold();
          }}
          onKeyUp={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            endHold();
          }}
          onBlur={endHold}
          onContextMenu={(e) => e.preventDefault()}
        >
          <svg className="hb-qs4-i hb-qs4-ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m4.5 5 5 5-5 5" />
            <path d="m10.5 5 5 5-5 5" />
          </svg>
          <svg className="hb-qs4-i hb-qs4-ik" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m4.5 10.5 3.6 3.6 7.4-8.2" />
          </svg>
        </button>
        <span id={hintId} className="hb-qs4-sr">
          Drag the handle to the end, or hold Enter, to confirm
        </span>
        <span className="hb-qs4-sr" role="status" aria-live="polite">
          {done ? committedLabel : ""}
        </span>
      </div>
    </>
  );
}
