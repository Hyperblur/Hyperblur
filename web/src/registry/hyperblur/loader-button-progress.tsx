"use client";

import * as React from "react";

type Phase = "idle" | "busy" | "done";

export interface LoaderButtonProgressProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "value"> {
  label?: string;
  busyLabel?: string;
  doneLabel?: string;
  value?: number;
  duration?: number;
  resetAfter?: number;
  autoPlay?: boolean;
  width?: number;
  accent?: string;
  success?: string;
  onStart?: () => void;
  onComplete?: () => void;
}

const curve: [number, number][] = [
  [0, 0],
  [0.22, 0.24],
  [0.4, 0.33],
  [0.7, 0.71],
  [0.82, 0.78],
  [1, 1],
];

function sample(t: number) {
  for (let i = 1; i < curve.length; i++) {
    if (t <= curve[i][0]) {
      const [t0, v0] = curve[i - 1];
      const [t1, v1] = curve[i];
      const f = (t - t0) / (t1 - t0 || 1);
      return v0 + (v1 - v0) * f * f * (3 - 2 * f);
    }
  }
  return 1;
}

const css = `
.hb-vk12 {
  position: relative;
  display: inline-block;
  width: var(--hb-vk12-w);
  max-width: 100%;
  height: 46px;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  color: #0a0a0a;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.005em;
  cursor: pointer;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  vertical-align: middle;
}
.hb-vk12 *, .hb-vk12 *::before, .hb-vk12 *::after { box-sizing: border-box; }
.hb-vk12[data-phase="busy"] { cursor: progress; }
.hb-vk12:disabled { cursor: not-allowed; opacity: 0.5; }
.hb-vk12-body {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 999px;
  overflow: hidden;
  background: linear-gradient(180deg, #ffffff, #e4e4e4);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.5), 0 8px 22px -8px rgba(255,255,255,0.25);
  transition: top 520ms cubic-bezier(0.65, 0, 0.35, 1), background 360ms ease, box-shadow 360ms ease, transform 160ms ease;
}
.hb-vk12:hover .hb-vk12-body { box-shadow: inset 0 1px 0 #fff, inset 0 -1px 0 rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.5), 0 10px 28px -8px rgba(255,255,255,0.4); }
.hb-vk12:active[data-phase="idle"] .hb-vk12-body { transform: scale(0.97); }
.hb-vk12:focus-visible .hb-vk12-body { outline: 2px solid var(--hb-vk12-a); outline-offset: 3px; }
.hb-vk12[data-phase="busy"] .hb-vk12-body {
  top: calc(100% - 6px);
  background: #1c1c1c;
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.6), inset 0 0 0 1px #262626;
}
.hb-vk12[data-phase="done"] .hb-vk12-body {
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-vk12-s) 88%, #fff), var(--hb-vk12-s));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.45), 0 1px 2px rgba(0,0,0,0.5), 0 10px 26px -10px var(--hb-vk12-s);
}
.hb-vk12-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--hb-vk12-p);
  border-radius: 999px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-vk12-a) 60%, #0a0a0a), var(--hb-vk12-a));
  box-shadow: 0 0 10px var(--hb-vk12-a);
  opacity: 0;
  transition: opacity 200ms ease;
}
.hb-vk12-fill::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
  background-size: 40% 100%;
  background-repeat: no-repeat;
  animation: hb-vk12-shine 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
.hb-vk12[data-phase="busy"] .hb-vk12-fill { opacity: 1; transition-delay: 300ms; }
.hb-vk12-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease;
}
.hb-vk12-face svg { width: 16px; height: 16px; flex: none; }
.hb-vk12-idle { opacity: 1; }
.hb-vk12[data-phase="busy"] .hb-vk12-idle, .hb-vk12[data-phase="done"] .hb-vk12-idle { opacity: 0; transform: translateY(-10px); }
.hb-vk12-busy {
  inset: 0 2px auto 2px;
  height: 34px;
  justify-content: space-between;
  color: #ededed;
  font-size: 12.5px;
  font-weight: 500;
  opacity: 0;
  transform: translateY(8px);
}
.hb-vk12-busy b { font-weight: 600; font-variant-numeric: tabular-nums; color: var(--hb-vk12-a); }
.hb-vk12[data-phase="busy"] .hb-vk12-busy { opacity: 1; transform: none; transition-delay: 160ms; }
.hb-vk12-done { color: #04130b; opacity: 0; transform: translateY(10px); }
.hb-vk12[data-phase="done"] .hb-vk12-done { opacity: 1; transform: none; transition-delay: 220ms; }
.hb-vk12-done path {
  stroke-dasharray: 16;
  stroke-dashoffset: 16;
}
.hb-vk12[data-phase="done"] .hb-vk12-done path {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 420ms cubic-bezier(0.65, 0, 0.35, 1) 380ms;
}
.hb-vk12-dots { display: inline-flex; gap: 3px; margin-left: 2px; }
.hb-vk12-dots span {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
  animation: hb-vk12-dot 1.1s ease-in-out infinite;
}
.hb-vk12-dots span:nth-child(2) { animation-delay: 0.15s; }
.hb-vk12-dots span:nth-child(3) { animation-delay: 0.3s; }
.hb-vk12-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-vk12-shine { from { background-position: -60% 0; } to { background-position: 160% 0; } }
@keyframes hb-vk12-dot { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vk12-body, .hb-vk12-face, .hb-vk12-fill, .hb-vk12-done path { transition: none !important; }
  .hb-vk12-fill::after, .hb-vk12-dots span { animation: none; }
}
`;

export function LoaderButtonProgress({
  label = "Deploy",
  busyLabel = "Deploying",
  doneLabel = "Deployed",
  value,
  duration = 3400,
  resetAfter = 2200,
  autoPlay = false,
  width = 220,
  accent = "#2f7bff",
  success = "#3ecf8e",
  onStart,
  onComplete,
  disabled,
  className = "",
  style,
  ...rest
}: LoaderButtonProgressProps) {
  const controlled = typeof value === "number" && Number.isFinite(value);
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [auto, setAuto] = React.useState(0);
  const completeRef = React.useRef(onComplete);
  const startRef = React.useRef(onStart);

  React.useEffect(() => {
    completeRef.current = onComplete;
    startRef.current = onStart;
  }, [onComplete, onStart]);

  const start = React.useCallback(() => {
    setAuto(0);
    setPhase("busy");
    startRef.current?.();
  }, []);

  React.useEffect(() => {
    if (phase !== "busy") return;
    let raf = 0;
    if (controlled) {
      if ((value as number) >= 100) {
        raf = requestAnimationFrame(() => {
          setPhase("done");
          completeRef.current?.();
        });
      }
      return () => cancelAnimationFrame(raf);
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 600 : Math.max(800, duration);
    let t0 = 0;
    function tick(now: number) {
      if (!t0) t0 = now;
      const t = Math.min(1, (now - t0) / total);
      setAuto(sample(t) * 100);
      if (t >= 1) {
        setPhase("done");
        completeRef.current?.();
        return;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, controlled, value, duration]);

  React.useEffect(() => {
    if (phase !== "done" || resetAfter <= 0) return;
    const id = window.setTimeout(() => setPhase("idle"), resetAfter);
    return () => window.clearTimeout(id);
  }, [phase, resetAfter]);

  React.useEffect(() => {
    if (!autoPlay || phase !== "idle" || disabled) return;
    const id = window.setTimeout(start, 1100);
    return () => window.clearTimeout(id);
  }, [autoPlay, phase, disabled, start]);

  const pct = Math.min(100, Math.max(0, controlled ? (value as number) : auto));
  const vars = {
    "--hb-vk12-w": `${width}px`,
    "--hb-vk12-p": `${pct.toFixed(1)}%`,
    "--hb-vk12-a": accent,
    "--hb-vk12-s": success,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-button-progress" precedence="default">{css}</style>
      <button
        type="button"
        className={`hb-vk12 ${className}`}
        data-phase={phase}
        disabled={disabled}
        aria-disabled={phase !== "idle" || undefined}
        aria-busy={phase === "busy"}
        style={vars}
        onClick={() => {
          if (phase === "idle") start();
        }}
        {...rest}
      >
        <span className="hb-vk12-body" aria-hidden="true">
          <span className="hb-vk12-fill" />
        </span>
        <span className="hb-vk12-face hb-vk12-idle" aria-hidden={phase !== "idle"}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4.5 12.5h-.3a3.2 3.2 0 0 1-.4-6.4 4.3 4.3 0 0 1 8.3-.6 3.1 3.1 0 0 1 .2 6.2" />
            <path d="M8 13.5V8.2M5.9 10.1 8 8l2.1 2.1" />
          </svg>
          {label}
        </span>
        <span className="hb-vk12-face hb-vk12-busy" aria-hidden="true">
          <span>
            {busyLabel}
            <span className="hb-vk12-dots">
              <span />
              <span />
              <span />
            </span>
          </span>
          <b>{Math.floor(pct)}%</b>
        </span>
        <span className="hb-vk12-face hb-vk12-done" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.4l3 3 6-6.4" />
          </svg>
          {doneLabel}
        </span>
        <span className="hb-vk12-sr" aria-live="polite">
          {phase === "busy" ? busyLabel : phase === "done" ? doneLabel : ""}
        </span>
      </button>
    </>
  );
}
