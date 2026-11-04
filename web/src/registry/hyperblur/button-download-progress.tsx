"use client";

import * as React from "react";

export interface ButtonDownloadProgressProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  duration?: number;
  progressLabel?: React.ReactNode;
  doneLabel?: React.ReactNode;
  resetAfter?: number;
  onComplete?: () => void;
  variant?: "outline" | "solid";
  accent?: string;
  size?: "sm" | "md" | "lg";
}

type Phase = "idle" | "running" | "done";

const curve: [number, number][] = [
  [0, 0],
  [0.12, 0.16],
  [0.3, 0.34],
  [0.42, 0.4],
  [0.6, 0.71],
  [0.74, 0.78],
  [0.9, 0.97],
  [1, 1],
];

function shape(t: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  for (let i = 1; i < curve.length; i += 1) {
    const [t1, p1] = curve[i];
    if (t <= t1) {
      const [t0, p0] = curve[i - 1];
      const k = (t - t0) / (t1 - t0);
      const s = k * k * (3 - 2 * k);
      return p0 + (p1 - p0) * (0.5 * k + 0.5 * s);
    }
  }
  return 1;
}

const css = `
.hb-qa9 {
  --hb-qa9-c: #2f7bff;
  --hb-qa9-bg: #141414;
  --hb-qa9-fg: #ededed;
  --hb-qa9-ring: #2a2a2a;
  --hb-qa9-fill: color-mix(in srgb, var(--hb-qa9-c) 55%, transparent);
  --hb-qa9-p: 0;
  position: relative;
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0.8em 1.5em;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--hb-qa9-fg);
  background: var(--hb-qa9-bg);
  border: 0;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px var(--hb-qa9-ring);
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}
.hb-qa9[data-size="sm"] { font-size: 13px; }
.hb-qa9[data-size="lg"] { font-size: 17px; }
.hb-qa9[data-variant="solid"] {
  --hb-qa9-bg: color-mix(in srgb, var(--hb-qa9-c) 78%, #000000);
  --hb-qa9-fg: #ffffff;
  --hb-qa9-ring: transparent;
  --hb-qa9-fill: var(--hb-qa9-c);
}
.hb-qa9[data-phase="done"] {
  --hb-qa9-bg: #15803d;
  --hb-qa9-fg: #ffffff;
  --hb-qa9-ring: transparent;
  --hb-qa9-fill: #22c55e;
}
.hb-qa9[data-phase="done"][data-variant="outline"] {
  --hb-qa9-bg: #0f2a18;
  --hb-qa9-fg: #86efac;
  --hb-qa9-ring: color-mix(in srgb, #22c55e 50%, transparent);
  --hb-qa9-fill: color-mix(in srgb, #22c55e 18%, transparent);
}
.hb-qa9-f {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--hb-qa9-fill);
  transform: scaleX(var(--hb-qa9-p));
  transform-origin: left center;
  transition: transform 0.14s linear;
}
.hb-qa9[data-phase="idle"] .hb-qa9-f { transition: none; }
.hb-qa9-l {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(0.6em);
  transition: opacity 0.25s ease, transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-qa9-l[data-on="true"] { opacity: 1; transform: none; }
.hb-qa9-l[data-on="false"][data-past="true"] { transform: translateY(-0.6em); }
.hb-qa9-n { font-variant-numeric: tabular-nums; min-width: 3ch; text-align: right; }
.hb-qa9-s { font-size: 0.8em; font-weight: 500; opacity: 0.75; }
.hb-qa9-i {
  width: 1.1em;
  height: 1.1em;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-qa9-ck { stroke-width: 2.6; stroke-dasharray: 24; stroke-dashoffset: 24; }
.hb-qa9-l[data-on="true"] .hb-qa9-ck { animation: hb-qa9-draw 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards; }
.hb-qa9[data-phase="idle"]:not(:hover):not(:disabled) .hb-qa9-ar { animation: hb-qa9-bob 3.6s ease-in-out 1s infinite; }
.hb-qa9:hover:not(:disabled):not([data-phase="running"]) { --hb-qa9-ring: color-mix(in srgb, var(--hb-qa9-c) 60%, #2a2a2a); }
.hb-qa9[data-phase="running"] { cursor: progress; }
.hb-qa9[data-phase="done"] { cursor: default; }
.hb-qa9:active:not(:disabled):not([data-phase="running"]) { transform: scale(0.97); }
.hb-qa9:focus-visible { outline: 2px solid var(--hb-qa9-c); outline-offset: 3px; }
.hb-qa9:disabled:not([data-phase="running"]):not([data-phase="done"]) { opacity: 0.45; cursor: not-allowed; }
@keyframes hb-qa9-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-qa9-bob {
  0%, 70%, 100% { transform: none; }
  80% { transform: translateY(2px); }
  90% { transform: translateY(-1px); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qa9, .hb-qa9-f, .hb-qa9-l { transition-duration: 0.01s; }
  .hb-qa9 .hb-qa9-ar { animation: none !important; }
  .hb-qa9-l { transform: none; }
  .hb-qa9-l[data-on="true"] .hb-qa9-ck { animation: none; stroke-dashoffset: 0; }
  .hb-qa9:active:not(:disabled) { transform: none; }
}
`;

export function ButtonDownloadProgress({
  children = "Download",
  progressLabel = "Downloading",
  doneLabel = "Done",
  duration = 3200,
  resetAfter = 2200,
  onComplete,
  onClick,
  variant = "outline",
  accent = "#2f7bff",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonDownloadProgressProps) {
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [pct, setPct] = React.useState(0);
  const raf = React.useRef(0);
  const timer = React.useRef(0);
  const finished = React.useRef(onComplete);

  React.useEffect(() => {
    finished.current = onComplete;
  }, [onComplete]);

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(raf.current);
      window.clearTimeout(timer.current);
    };
  }, []);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (phase !== "idle" || disabled) return;
    onClick?.(e);
    const total = Math.max(300, duration);
    const t0 = performance.now();
    setPct(0);
    setPhase("running");
    function tick(now: number) {
      const t = Math.min(1, (now - t0) / total);
      const value = Math.round(shape(t) * 100);
      setPct(value);
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      setPhase("done");
      finished.current?.();
      timer.current = window.setTimeout(() => {
        setPhase("idle");
        setPct(0);
      }, Math.max(0, resetAfter));
    }
    raf.current = requestAnimationFrame(tick);
  }

  const vars = {
    "--hb-qa9-c": accent,
    "--hb-qa9-p": phase === "done" ? "1" : (pct / 100).toFixed(2),
    ...style,
  } as React.CSSProperties;

  const order: Phase[] = ["idle", "running", "done"];

  return (
    <>
      <style href="hb-button-download-progress" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-qa9 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        data-phase={phase}
        disabled={disabled || phase !== "idle"}
        aria-busy={phase === "running" || undefined}
        aria-live="polite"
        onClick={handleClick}
        {...rest}
      >
        <span className="hb-qa9-f" aria-hidden="true" />
        {order.map((key) => (
          <span
            key={key}
            className="hb-qa9-l"
            data-on={phase === key ? "true" : "false"}
            data-past={order.indexOf(key) < order.indexOf(phase) ? "true" : undefined}
            aria-hidden={phase === key ? undefined : true}
          >
            {key === "idle" ? (
              <>
                <svg className="hb-qa9-i hb-qa9-ar" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
                </svg>
                {children}
              </>
            ) : null}
            {key === "running" ? (
              <>
                <span className="hb-qa9-s">{progressLabel}</span>
                <span className="hb-qa9-n">{pct}%</span>
              </>
            ) : null}
            {key === "done" ? (
              <>
                <svg className="hb-qa9-i hb-qa9-ck" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {doneLabel}
              </>
            ) : null}
          </span>
        ))}
      </button>
    </>
  );
}
