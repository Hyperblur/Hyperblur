"use client";

import * as React from "react";

export interface ButtonSlideDeleteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange" | "onProgress"> {
  label?: string;
  doneLabel?: string;
  threshold?: number;
  accent?: string;
  resetAfter?: number;
  disabled?: boolean;
  onConfirm?: () => void;
  onProgress?: (value: number) => void;
}

const css = `
.hb-xd2 {
  --hb-xd2-h: 3.25rem;
  --hb-xd2-t: 2.625rem;
  --hb-xd2-x: 0px;
  --hb-xd2-p: 0;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 320px;
  height: var(--hb-xd2-h);
  padding: 5px;
  font-family: inherit;
  font-size: 0.875rem;
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(0,0,0,0.35), rgba(255,255,255,0.02)),
    #120909;
  border: 1px solid color-mix(in srgb, var(--hb-xd2-c) 22%, #241415);
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04);
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  isolation: isolate;
  transition: border-color 0.3s ease;
}
.hb-xd2 *, .hb-xd2 *::before, .hb-xd2 *::after { box-sizing: border-box; }
.hb-xd2[data-disabled="true"] { opacity: 0.45; }
.hb-xd2-fill {
  position: absolute;
  inset: 0 auto 0 0;
  z-index: -1;
  width: calc(var(--hb-xd2-x) + var(--hb-xd2-t) + 10px);
  border-radius: 999px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xd2-c) 6%, transparent), color-mix(in srgb, var(--hb-xd2-c) 46%, transparent));
  box-shadow: inset -12px 0 18px -10px color-mix(in srgb, var(--hb-xd2-c) 80%, transparent);
}
.hb-xd2-label {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding-left: calc(var(--hb-xd2-t) + 8px);
  padding-right: 44px;
  font-weight: 500;
  letter-spacing: 0.01em;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(100deg, #6f5a5b 0%, #6f5a5b 40%, #ffe3e4 50%, #6f5a5b 60%, #6f5a5b 100%);
  background-size: 240% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  clip-path: inset(0 0 0 calc(var(--hb-xd2-x) + var(--hb-xd2-t) * 0.5 + 5px));
  opacity: calc(1 - var(--hb-xd2-p) * 0.9);
  animation: hb-xd2-shine 2.6s cubic-bezier(0.45, 0, 0.3, 1) infinite;
}
.hb-xd2-bin {
  position: absolute;
  top: 50%;
  right: 15px;
  width: 22px;
  height: 22px;
  margin-top: -11px;
  color: color-mix(in srgb, var(--hb-xd2-c) 40%, #6f5a5b);
  transform: scale(calc(1 + var(--hb-xd2-p) * 0.18));
  transition: color 0.2s ease;
}
.hb-xd2[data-near="true"] .hb-xd2-bin { color: color-mix(in srgb, var(--hb-xd2-c) 70%, #fff); }
.hb-xd2-lid {
  transform-box: fill-box;
  transform-origin: 85% 100%;
  transform: rotate(calc(var(--hb-xd2-p) * -38deg)) translateY(calc(var(--hb-xd2-p) * -1px));
}
.hb-xd2-thumb {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: var(--hb-xd2-t);
  height: var(--hb-xd2-t);
  margin: 0;
  padding: 0;
  color: #fff;
  border: 0;
  border-radius: 999px;
  background:
    radial-gradient(120% 90% at 30% 20%, rgba(255,255,255,0.35), rgba(255,255,255,0) 50%),
    linear-gradient(180deg, color-mix(in srgb, var(--hb-xd2-c) 88%, #fff), color-mix(in srgb, var(--hb-xd2-c) 85%, #000));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 12px -2px color-mix(in srgb, var(--hb-xd2-c) 70%, transparent), 0 1px 2px rgba(0,0,0,0.6);
  transform: translateX(var(--hb-xd2-x));
  cursor: grab;
  touch-action: none;
  transition: transform 0.55s cubic-bezier(0.25, 1.4, 0.4, 1), opacity 0.3s ease, scale 0.3s ease;
}
.hb-xd2[data-drag="true"] .hb-xd2-thumb { cursor: grabbing; transition: none; }
.hb-xd2-thumb:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xd2-chev { display: flex; }
.hb-xd2-chev svg:last-child { margin-left: -7px; opacity: 0.55; }
.hb-xd2[data-phase="done"] .hb-xd2-thumb { scale: 0.2; opacity: 0; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease 0.15s, scale 0.35s ease 0.1s; }
.hb-xd2-done {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xd2-c) 90%, #fff), var(--hb-xd2-c));
  border-radius: 999px;
  opacity: 0;
  clip-path: inset(0 0 0 100% round 999px);
  transition: clip-path 0.5s cubic-bezier(0.7, 0, 0.2, 1) 0.15s, opacity 0.2s ease 0.15s;
}
.hb-xd2[data-phase="done"] .hb-xd2-done { opacity: 1; clip-path: inset(0 0 0 0 round 999px); }
.hb-xd2[data-phase="done"] .hb-xd2-bin, .hb-xd2[data-phase="done"] .hb-xd2-label { opacity: 0; }
.hb-xd2-done svg path { stroke-dasharray: 24; stroke-dashoffset: 24; }
.hb-xd2[data-phase="done"] .hb-xd2-done svg path { animation: hb-xd2-tick 0.4s ease 0.55s forwards; }
@keyframes hb-xd2-shine {
  0% { background-position: 100% 0; }
  100% { background-position: 0% 0; }
}
@keyframes hb-xd2-tick { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xd2-label { animation: none; color: #8a7475; background: none; }
  .hb-xd2-thumb, .hb-xd2-done, .hb-xd2[data-phase="done"] .hb-xd2-thumb { transition: none; }
  .hb-xd2-done svg path { stroke-dashoffset: 0; }
  .hb-xd2[data-phase="done"] .hb-xd2-done svg path { animation: none; }
}
`;

export function ButtonSlideDelete({
  label = "Slide to delete",
  doneLabel = "Deleted",
  threshold = 0.88,
  accent = "#ef4444",
  resetAfter = 2600,
  disabled = false,
  onConfirm,
  onProgress,
  className = "",
  style,
  ...rest
}: ButtonSlideDeleteProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLButtonElement>(null);
  const drag = React.useRef<{ id: number; start: number; from: number } | null>(null);
  const latest = React.useRef({ onConfirm, onProgress });
  const [x, setX] = React.useState(0);
  const [max, setMax] = React.useState(1);
  const [dragging, setDragging] = React.useState(false);
  const [phase, setPhase] = React.useState<"idle" | "done">("idle");

  React.useEffect(() => {
    latest.current = { onConfirm, onProgress };
  }, [onConfirm, onProgress]);

  React.useEffect(() => {
    const el = trackRef.current;
    const th = thumbRef.current;
    if (!el || !th) return;
    const measure = () => setMax(Math.max(1, el.clientWidth - th.offsetWidth - 10));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    if (phase !== "done" || resetAfter <= 0) return;
    const t = window.setTimeout(() => {
      setX(0);
      setPhase("idle");
    }, resetAfter);
    return () => window.clearTimeout(t);
  }, [phase, resetAfter]);

  const p = Math.min(1, x / max);

  const update = (next: number) => {
    const v = Math.max(0, Math.min(max, next));
    setX(v);
    latest.current.onProgress?.(v / max);
  };

  const complete = () => {
    setX(max);
    setPhase("done");
    latest.current.onConfirm?.();
  };

  const locked = disabled || phase === "done";

  return (
    <div
      ref={trackRef}
      className={`hb-xd2 ${className}`.trim()}
      data-phase={phase}
      data-drag={dragging}
      data-near={p >= threshold}
      data-disabled={disabled}
      style={{ "--hb-xd2-c": accent, "--hb-xd2-x": `${x.toFixed(1)}px`, "--hb-xd2-p": p.toFixed(3), ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-button-slide-delete" precedence="default">{css}</style>
      <span className="hb-xd2-fill" aria-hidden="true" />
      <span className="hb-xd2-label" aria-hidden="true">{p >= threshold ? "Release to delete" : label}</span>
      <svg className="hb-xd2-bin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <g className="hb-xd2-lid">
          <path d="M3.5 6.5h17" />
          <path d="M9 6.5V4.5h6v2" />
        </g>
        <path d="M5.5 9l1 11h11l1-11" />
        <path d="M10 12v5M14 12v5" />
      </svg>
      <button
        ref={thumbRef}
        type="button"
        role="slider"
        className="hb-xd2-thumb"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(p * 100)}
        aria-valuetext={phase === "done" ? doneLabel : `${Math.round(p * 100)}%`}
        aria-disabled={locked || undefined}
        tabIndex={phase === "done" ? -1 : 0}
        onPointerDown={(e) => {
          if (locked || e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { id: e.pointerId, start: e.clientX, from: x };
          setDragging(true);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || d.id !== e.pointerId) return;
          update(d.from + e.clientX - d.start);
        }}
        onPointerUp={(e) => {
          const d = drag.current;
          if (!d || d.id !== e.pointerId) return;
          drag.current = null;
          setDragging(false);
          if (x / max >= threshold) complete();
          else update(0);
        }}
        onPointerCancel={() => {
          drag.current = null;
          setDragging(false);
          update(0);
        }}
        onKeyDown={(e) => {
          if (locked) return;
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            const next = x + max * 0.1;
            if (next / max >= 1) complete();
            else update(next);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "Home" || e.key === "Escape") {
            e.preventDefault();
            update(e.key === "ArrowLeft" || e.key === "ArrowDown" ? x - max * 0.1 : 0);
          } else if (e.key === "End" || e.key === "Enter") {
            e.preventDefault();
            complete();
          }
        }}
      >
        <span className="hb-xd2-chev" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </span>
      </button>
      <span className="hb-xd2-done" role="status" aria-live="polite">
        {phase === "done" && (
          <>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            {doneLabel}
          </>
        )}
      </span>
    </div>
  );
}
