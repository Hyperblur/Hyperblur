"use client";

import * as React from "react";

export interface ButtonHoldShredProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick" | "color"> {
  children?: React.ReactNode;
  doneLabel?: React.ReactNode;
  duration?: number;
  accent?: string;
  size?: "sm" | "md" | "lg";
  strips?: number;
  resetAfter?: number;
  onConfirm?: () => void;
}

const css = `
.hb-xd1 {
  --hb-xd1-h: 2.75rem;
  --hb-xd1-fs: 0.875rem;
  --hb-xd1-p: 0;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  font-family: inherit;
  font-size: var(--hb-xd1-fs);
  isolation: isolate;
}
.hb-xd1 *, .hb-xd1 *::before, .hb-xd1 *::after { box-sizing: border-box; }
.hb-xd1[data-size="sm"] { --hb-xd1-h: 2.25rem; --hb-xd1-fs: 0.8125rem; }
.hb-xd1[data-size="lg"] { --hb-xd1-h: 3.25rem; --hb-xd1-fs: 1rem; }
.hb-xd1-btn {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  height: var(--hb-xd1-h);
  margin: 0;
  padding: 0 1.25em;
  overflow: hidden;
  font: inherit;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: #ffd9db;
  white-space: nowrap;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0) 55%),
    linear-gradient(180deg, color-mix(in srgb, var(--hb-xd1-c) 22%, #160a0b), color-mix(in srgb, var(--hb-xd1-c) 10%, #0d0607));
  border: 1px solid color-mix(in srgb, var(--hb-xd1-c) 38%, #2a1516);
  border-radius: 12px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 1px 2px rgba(0,0,0,0.5), 0 8px 24px -12px color-mix(in srgb, var(--hb-xd1-c) 60%, transparent);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  transition: transform 0.25s cubic-bezier(0.3, 1.5, 0.5, 1), border-color 0.25s ease, box-shadow 0.25s ease;
}
.hb-xd1-btn:hover:not(:disabled) { border-color: color-mix(in srgb, var(--hb-xd1-c) 60%, #2a1516); }
.hb-xd1-btn:focus-visible { outline: 2px solid var(--hb-xd1-c); outline-offset: 3px; }
.hb-xd1-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xd1[data-phase="holding"] .hb-xd1-btn { animation: hb-xd1-buzz 0.09s steps(2, end) infinite; }
.hb-xd1-heat {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(0deg, color-mix(in srgb, var(--hb-xd1-c) 75%, transparent), color-mix(in srgb, var(--hb-xd1-c) 18%, transparent));
  transform: scaleY(var(--hb-xd1-p));
  transform-origin: bottom;
}
.hb-xd1-face {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  transform: translateY(calc(var(--hb-xd1-p) * 115%));
}
.hb-xd1[data-phase="done"] .hb-xd1-face { opacity: 0; }
.hb-xd1-done {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  color: #fff;
  opacity: 0;
  transform: translateY(-110%);
  transition: opacity 0.2s ease, transform 0.45s cubic-bezier(0.2, 1.2, 0.4, 1);
}
.hb-xd1[data-phase="done"] .hb-xd1-done { opacity: 1; transform: none; }
.hb-xd1[data-phase="done"] .hb-xd1-btn { border-color: var(--hb-xd1-c); background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xd1-c) 92%, #fff), var(--hb-xd1-c)); }
.hb-xd1-slot {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.85) 12%, rgba(0,0,0,0.85) 88%, transparent);
  box-shadow: 0 -1px 0 color-mix(in srgb, var(--hb-xd1-c) 50%, transparent);
}
.hb-xd1-strips {
  position: absolute;
  z-index: 1;
  top: calc(100% - 2px);
  left: 14px;
  right: 14px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}
.hb-xd1-strip {
  width: 4px;
  height: calc(var(--hb-xd1-p) * var(--hb-xd1-len));
  border-radius: 0 0 1px 1px;
  background:
    repeating-linear-gradient(180deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 4px),
    linear-gradient(180deg, #f3e9e9, #cdbfc0);
  box-shadow: 0 1px 2px rgba(0,0,0,0.4);
  transform-origin: top center;
}
.hb-xd1-strip:nth-child(odd) { background: repeating-linear-gradient(180deg, rgba(0,0,0,0.28) 0 1px, transparent 1px 3px), linear-gradient(180deg, #ebe1e1, #c3b5b6); }
.hb-xd1[data-phase="done"] .hb-xd1-strip {
  height: var(--hb-xd1-len);
  animation: hb-xd1-fall 0.85s cubic-bezier(0.55, 0, 0.8, 0.4) var(--hb-xd1-d) forwards;
}
.hb-xd1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-xd1-buzz {
  0% { transform: translate(0.4px, 0); }
  100% { transform: translate(-0.4px, 0.3px); }
}
@keyframes hb-xd1-fall {
  0% { transform: translateY(0) rotate(0); opacity: 1; }
  100% { transform: translateY(26px) rotate(var(--hb-xd1-r)); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xd1-btn, .hb-xd1-done { transition: none; }
  .hb-xd1[data-phase="holding"] .hb-xd1-btn { animation: none; }
  .hb-xd1[data-phase="done"] .hb-xd1-strip { animation: none; opacity: 0; }
}
`;

function hash(n: number) {
  let h = (n + 1) * 2654435761;
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return (h ^ (h >>> 16)) >>> 0;
}

export function ButtonHoldShred({
  children = "Hold to shred",
  doneLabel = "Shredded",
  duration = 1300,
  accent = "#ef4444",
  size = "md",
  strips = 14,
  resetAfter = 2600,
  onConfirm,
  disabled = false,
  type = "button",
  className = "",
  style,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  onKeyDown,
  onKeyUp,
  onBlur,
  ...rest
}: ButtonHoldShredProps) {
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const progress = React.useRef(0);
  const dir = React.useRef(0);
  const raf = React.useRef(0);
  const last = React.useRef(0);
  const latest = React.useRef(onConfirm);
  const [phase, setPhase] = React.useState<"idle" | "holding" | "done">("idle");

  React.useEffect(() => {
    latest.current = onConfirm;
  }, [onConfirm]);

  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);

  React.useEffect(() => {
    if (phase !== "done" || resetAfter <= 0) return;
    const t = window.setTimeout(() => {
      progress.current = 0;
      rootRef.current?.style.setProperty("--hb-xd1-p", "0");
      setPhase("idle");
    }, resetAfter);
    return () => window.clearTimeout(t);
  }, [phase, resetAfter]);

  const run = () => {
    cancelAnimationFrame(raf.current);
    last.current = 0;
    const step = (t: number) => {
      const dt = last.current ? Math.min(48, t - last.current) : 16;
      last.current = t;
      if (dir.current > 0) progress.current = Math.min(1, progress.current + dt / duration);
      else progress.current = Math.max(0, progress.current - dt / (duration * 0.32));
      rootRef.current?.style.setProperty("--hb-xd1-p", progress.current.toFixed(3));
      if (dir.current > 0 && progress.current >= 1) {
        dir.current = 0;
        setPhase("done");
        latest.current?.();
        return;
      }
      if (dir.current <= 0 && progress.current <= 0) {
        setPhase("idle");
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  const start = () => {
    if (disabled || phase === "done" || dir.current > 0) return;
    dir.current = 1;
    setPhase("holding");
    run();
  };

  const stop = () => {
    if (dir.current <= 0) return;
    dir.current = -1;
    run();
  };

  const count = Math.max(4, Math.min(24, Math.round(strips)));
  const list = Array.from({ length: count }, (_, i) => {
    const h = hash(i);
    return {
      len: `${(14 + (h % 13)).toFixed(0)}px`,
      d: `${((h >>> 4) % 160).toFixed(0)}ms`,
      r: `${(((h >>> 9) % 50) - 25).toFixed(0)}deg`,
    };
  });

  return (
    <span
      ref={rootRef}
      className={`hb-xd1 ${className}`.trim()}
      data-size={size}
      data-phase={phase}
      style={{ "--hb-xd1-c": accent, ...style } as React.CSSProperties}
    >
      <style href="hb-button-hold-shred" precedence="default">{css}</style>
      <button
        type={type}
        className="hb-xd1-btn"
        disabled={disabled}
        aria-disabled={phase === "done" || undefined}
        onPointerDown={(e) => {
          onPointerDown?.(e);
          if (e.button !== 0) return;
          e.currentTarget.setPointerCapture?.(e.pointerId);
          start();
        }}
        onPointerUp={(e) => {
          onPointerUp?.(e);
          stop();
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          stop();
        }}
        onPointerCancel={(e) => {
          onPointerCancel?.(e);
          stop();
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if ((e.key === " " || e.key === "Enter") && !e.repeat) {
            e.preventDefault();
            start();
          }
        }}
        onKeyUp={(e) => {
          onKeyUp?.(e);
          if (e.key === " " || e.key === "Enter") stop();
        }}
        onBlur={(e) => {
          onBlur?.(e);
          stop();
        }}
        onContextMenu={(e) => e.preventDefault()}
        {...rest}
      >
        <span className="hb-xd1-heat" aria-hidden="true" />
        <span className="hb-xd1-face">
          <svg viewBox="0 0 24 24" width="1.05em" height="1.05em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9V4h9l3 3v2" />
            <rect x="3" y="9" width="18" height="6" rx="1.5" />
            <path d="M7 15v5M10 15v4M14 15v5M17 15v3" />
          </svg>
          {children}
        </span>
        <span className="hb-xd1-done" aria-hidden={phase !== "done"}>
          <svg viewBox="0 0 24 24" width="1.05em" height="1.05em" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
          {doneLabel}
        </span>
        <span className="hb-xd1-slot" aria-hidden="true" />
        <span className="hb-xd1-sr">Press and hold to confirm</span>
      </button>
      <span className="hb-xd1-strips" aria-hidden="true">
        {list.map((s, i) => (
          <span
            key={i}
            className="hb-xd1-strip"
            style={{ "--hb-xd1-len": s.len, "--hb-xd1-d": s.d, "--hb-xd1-r": s.r } as React.CSSProperties}
          />
        ))}
      </span>
      <span className="hb-xd1-sr" role="status" aria-live="polite">
        {phase === "done" ? doneLabel : ""}
      </span>
    </span>
  );
}
