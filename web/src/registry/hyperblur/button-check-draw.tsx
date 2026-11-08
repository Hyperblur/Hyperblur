"use client";

import * as React from "react";

export interface ButtonCheckDrawProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick" | "color"> {
  children?: React.ReactNode;
  doneLabel?: React.ReactNode;
  minDuration?: number;
  accent?: string;
  size?: "sm" | "md" | "lg";
  resetAfter?: number;
  onConfirm?: () => void | Promise<unknown>;
}

const css = `
.hb-xd7 {
  --hb-xd7-h: 2.75rem;
  --hb-xd7-fs: 0.875rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: var(--hb-xd7-h);
  height: var(--hb-xd7-h);
  margin: 0;
  padding: 0 1.3em;
  font-family: inherit;
  font-size: var(--hb-xd7-fs);
  font-weight: 600;
  letter-spacing: -0.005em;
  color: #fff;
  white-space: nowrap;
  border: 1px solid color-mix(in srgb, var(--hb-xd7-c) 70%, #000);
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0) 55%),
    linear-gradient(180deg, color-mix(in srgb, var(--hb-xd7-c) 95%, #fff), color-mix(in srgb, var(--hb-xd7-c) 88%, #000));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.5), 0 10px 26px -12px var(--hb-xd7-c);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    padding 0.5s cubic-bezier(0.7, 0, 0.2, 1),
    background 0.4s ease,
    border-color 0.4s ease,
    box-shadow 0.4s ease,
    transform 0.2s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-xd7 *, .hb-xd7 *::before, .hb-xd7 *::after { box-sizing: border-box; }
.hb-xd7[data-size="sm"] { --hb-xd7-h: 2.25rem; --hb-xd7-fs: 0.8125rem; }
.hb-xd7[data-size="lg"] { --hb-xd7-h: 3.25rem; --hb-xd7-fs: 1rem; }
.hb-xd7:hover:not(:disabled)[data-phase="idle"] { box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.5), 0 12px 30px -10px var(--hb-xd7-c); }
.hb-xd7:active:not(:disabled)[data-phase="idle"] { transform: scale(0.97); }
.hb-xd7:focus-visible { outline: 2px solid color-mix(in srgb, var(--hb-xd7-c) 65%, #fff); outline-offset: 3px; }
.hb-xd7:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xd7-wrap {
  display: grid;
  grid-template-columns: 1fr;
  transition: grid-template-columns 0.5s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.25s ease;
}
.hb-xd7-inner { display: flex; align-items: center; gap: 0.5em; min-width: 0; overflow: hidden; }
.hb-xd7-inner > span { display: inline-flex; align-items: center; gap: 0.5em; }
.hb-xd7[data-phase="busy"], .hb-xd7[data-phase="check"] {
  padding: 0;
  cursor: progress;
  background: #141414;
  border-color: #2a2a2a;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.5);
}
.hb-xd7[data-phase="busy"] .hb-xd7-wrap, .hb-xd7[data-phase="check"] .hb-xd7-wrap { grid-template-columns: 0fr; opacity: 0; }
.hb-xd7-svg {
  position: absolute;
  inset: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  overflow: visible;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.hb-xd7[data-phase="busy"] .hb-xd7-svg, .hb-xd7[data-phase="check"] .hb-xd7-svg { opacity: 1; transition-delay: 0.4s; }
.hb-xd7-ring {
  fill: none;
  stroke: var(--hb-xd7-c);
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-dasharray: 25 100;
  transform-origin: 50% 50%;
  transform-box: fill-box;
}
.hb-xd7[data-phase="busy"] .hb-xd7-ring { animation: hb-xd7-spin 0.9s cubic-bezier(0.5, 0.15, 0.5, 0.85) infinite; }
.hb-xd7[data-phase="check"] .hb-xd7-ring { stroke-dasharray: 100 100; transition: stroke-dasharray 0.35s cubic-bezier(0.3, 0.9, 0.3, 1); }
.hb-xd7-disc {
  fill: var(--hb-xd7-c);
  transform-origin: 50% 50%;
  transform-box: fill-box;
  transform: scale(0);
}
.hb-xd7[data-phase="check"] .hb-xd7-disc { animation: hb-xd7-pop 0.5s cubic-bezier(0.3, 1.6, 0.5, 1) 0.2s forwards; }
.hb-xd7-tick {
  fill: none;
  stroke: #fff;
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
}
.hb-xd7[data-phase="check"] .hb-xd7-tick { animation: hb-xd7-draw 0.35s cubic-bezier(0.6, 0, 0.3, 1) 0.45s forwards; }
.hb-xd7[data-phase="done"] {
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xd7-c) 16%, #161616), color-mix(in srgb, var(--hb-xd7-c) 8%, #111));
  border-color: color-mix(in srgb, var(--hb-xd7-c) 40%, #262626);
  color: color-mix(in srgb, var(--hb-xd7-c) 40%, #fff);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
  cursor: default;
}
.hb-xd7[data-phase="done"] .hb-xd7-inner > span { animation: hb-xd7-in 0.4s cubic-bezier(0.2, 1.2, 0.4, 1); }
.hb-xd7-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xd7-spin { to { transform: rotate(360deg); } }
@keyframes hb-xd7-pop { to { transform: scale(1); } }
@keyframes hb-xd7-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-xd7-in { from { opacity: 0; transform: translateY(5px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xd7, .hb-xd7-wrap, .hb-xd7-svg, .hb-xd7-ring { transition: none; }
  .hb-xd7[data-phase="busy"] .hb-xd7-ring, .hb-xd7[data-phase="done"] .hb-xd7-inner > span { animation: none; }
  .hb-xd7[data-phase="check"] .hb-xd7-disc { animation: none; transform: scale(1); }
  .hb-xd7[data-phase="check"] .hb-xd7-tick { animation: none; stroke-dashoffset: 0; }
}
`;

export function ButtonCheckDraw({
  children = "Remove member",
  doneLabel = "Removed",
  minDuration = 1100,
  accent = "#e5484d",
  size = "md",
  resetAfter = 2400,
  onConfirm,
  disabled = false,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonCheckDrawProps) {
  const [phase, setPhase] = React.useState<"idle" | "busy" | "check" | "done">("idle");
  const latest = React.useRef(onConfirm);
  const alive = React.useRef(true);

  React.useEffect(() => {
    latest.current = onConfirm;
  }, [onConfirm]);

  React.useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (phase === "check") {
      const t = window.setTimeout(() => setPhase("done"), 1100);
      return () => window.clearTimeout(t);
    }
    if (phase === "done" && resetAfter > 0) {
      const t = window.setTimeout(() => setPhase("idle"), resetAfter);
      return () => window.clearTimeout(t);
    }
  }, [phase, resetAfter]);

  const run = async () => {
    if (phase !== "idle" || disabled) return;
    setPhase("busy");
    const wait = new Promise((r) => window.setTimeout(r, minDuration));
    try {
      await Promise.all([Promise.resolve(latest.current?.()), wait]);
      if (alive.current) setPhase("check");
    } catch {
      if (alive.current) setPhase("idle");
    }
  };

  return (
    <button
      type={type}
      className={`hb-xd7 ${className}`.trim()}
      data-size={size}
      data-phase={phase}
      disabled={disabled}
      aria-busy={phase === "busy" || undefined}
      aria-disabled={phase !== "idle" || undefined}
      style={{ "--hb-xd7-c": accent, ...style } as React.CSSProperties}
      onClick={run}
      {...rest}
    >
      <style href="hb-button-check-draw" precedence="default">{css}</style>
      <span className="hb-xd7-wrap">
        <span className="hb-xd7-inner">
          {phase === "done" ? (
            <span>
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              {doneLabel}
            </span>
          ) : (
            <span>
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="10" cy="8" r="4" />
                <path d="M3 20c.8-3.6 3.6-5.5 7-5.5 1.6 0 3 .4 4.2 1.2" />
                <path d="M16 18h6" />
              </svg>
              {children}
            </span>
          )}
        </span>
      </span>
      <svg className="hb-xd7-svg" viewBox="0 0 44 44" aria-hidden="true">
        <circle className="hb-xd7-disc" cx="22" cy="22" r="17" />
        <circle className="hb-xd7-ring" cx="22" cy="22" r="21" pathLength={100} />
        <path className="hb-xd7-tick" d="M15 22.5l4.6 4.6L29.5 17" pathLength={20} />
      </svg>
      <span className="hb-xd7-sr" role="status" aria-live="polite">{phase === "busy" ? "Working" : phase === "done" ? doneLabel : ""}</span>
    </button>
  );
}
