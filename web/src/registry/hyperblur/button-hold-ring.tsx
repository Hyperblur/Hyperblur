"use client";

import * as React from "react";

export interface ButtonHoldRingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onProgress"> {
  label?: string;
  hint?: string;
  holdingLabel?: string;
  firedLabel?: string;
  firedHint?: string;
  icon?: React.ReactNode;
  duration?: number;
  resetAfter?: number;
  size?: number;
  accent?: string;
  disabled?: boolean;
  onFire?: () => void;
  onProgress?: (progress: number) => void;
}

const css = `
.hb-xb2 {
  --hb-xb2-c: #ff4d5e;
  --hb-xb2-s: 64px;
  --hb-xb2-a: 0px;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
}
.hb-xb2 *, .hb-xb2 *::before, .hb-xb2 *::after { box-sizing: border-box; }
.hb-xb2-wrap { position: relative; width: calc(var(--hb-xb2-s) + 16px); height: calc(var(--hb-xb2-s) + 16px); flex: none; display: grid; place-items: center; }
.hb-xb2-ring { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); overflow: visible; pointer-events: none; }
.hb-xb2-track { fill: none; stroke: #232323; stroke-width: 3; }
.hb-xb2-prog { fill: none; stroke: var(--hb-xb2-c); stroke-width: 3; stroke-linecap: round; filter: drop-shadow(0 0 6px color-mix(in srgb, var(--hb-xb2-c) 70%, transparent)); }
.hb-xb2-ticks line { stroke: #3a3a3a; stroke-width: 1.4; stroke-linecap: round; }
.hb-xb2-btn {
  position: relative;
  width: var(--hb-xb2-s);
  height: var(--hb-xb2-s);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #f5f5f5;
  font: inherit;
  cursor: pointer;
  background: radial-gradient(100% 100% at 50% 0%, #2b2b2b 0%, #161616 70%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -2px 6px rgba(0, 0, 0, 0.6), 0 8px 20px -8px rgba(0, 0, 0, 0.9), 0 0 0 1px #2a2a2a;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background 0.3s ease;
}
.hb-xb2-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, var(--hb-xb2-c), color-mix(in srgb, var(--hb-xb2-c) 60%, #000));
  opacity: var(--hb-xb2-o, 0);
  transform: scale(var(--hb-xb2-o, 0));
  transition: opacity 0.12s linear;
}
.hb-xb2[data-state="holding"][data-pressed="true"] .hb-xb2-btn { transform: scale(0.94); animation: hb-xb2-rumble 0.09s linear infinite; }
.hb-xb2[data-state="fired"] .hb-xb2-btn { background: var(--hb-xb2-c); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px var(--hb-xb2-c), 0 0 34px -4px var(--hb-xb2-c); }
.hb-xb2-btn:focus-visible { outline: 2px solid var(--hb-xb2-c); outline-offset: 10px; }
.hb-xb2-btn:disabled { cursor: not-allowed; opacity: 0.45; }
.hb-xb2-ico { position: relative; display: grid; place-items: center; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease; }
.hb-xb2-ico svg { width: calc(var(--hb-xb2-s) * 0.38); height: calc(var(--hb-xb2-s) * 0.38); fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.hb-xb2-ok { position: absolute; opacity: 0; transform: scale(0.3); }
.hb-xb2[data-state="fired"] .hb-xb2-ico:not(.hb-xb2-ok) { opacity: 0; transform: scale(0.3); }
.hb-xb2[data-state="fired"] .hb-xb2-ok { opacity: 1; transform: none; }
.hb-xb2-ok path { stroke-dasharray: 24; stroke-dashoffset: 24; stroke-width: 2.6; }
.hb-xb2[data-state="fired"] .hb-xb2-ok path { animation: hb-xb2-draw 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.08s forwards; }
.hb-xb2-burst { position: absolute; inset: 8px; border-radius: 50%; border: 2px solid var(--hb-xb2-c); opacity: 0; pointer-events: none; }
.hb-xb2[data-state="fired"] .hb-xb2-burst { animation: hb-xb2-burst 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.hb-xb2[data-state="fired"] .hb-xb2-burst + .hb-xb2-burst { animation-delay: 0.12s; }
.hb-xb2-txt { display: grid; min-width: 0; }
.hb-xb2-t { grid-area: 1 / 1; display: flex; flex-direction: column; gap: 3px; opacity: 0; transform: translateY(6px); transition: opacity 0.25s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); white-space: nowrap; }
.hb-xb2-t[data-on="true"] { opacity: 1; transform: none; }
.hb-xb2-l { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.hb-xb2-h { font-size: 12px; color: #8f8f8f; font-variant-numeric: tabular-nums; display: inline-flex; align-items: center; gap: 6px; }
.hb-xb2-kbd { font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; padding: 1px 5px; border-radius: 4px; border: 1px solid #2c2c2c; background: #151515; color: #a1a1a1; }
.hb-xb2-live { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--hb-xb2-c); box-shadow: 0 0 0 0 var(--hb-xb2-c); animation: hb-xb2-ping 1.4s ease-out infinite; }
@keyframes hb-xb2-rumble {
  0% { translate: 0 0; }
  25% { translate: var(--hb-xb2-a) calc(var(--hb-xb2-a) * -0.5); }
  50% { translate: calc(var(--hb-xb2-a) * -1) 0; }
  75% { translate: calc(var(--hb-xb2-a) * 0.5) var(--hb-xb2-a); }
  100% { translate: 0 0; }
}
@keyframes hb-xb2-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-xb2-burst { 0% { opacity: 0.9; transform: scale(0.9); } 100% { opacity: 0; transform: scale(1.7); } }
@keyframes hb-xb2-ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-xb2-c) 70%, transparent); } 100% { box-shadow: 0 0 0 7px transparent; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xb2[data-state="holding"][data-pressed="true"] .hb-xb2-btn { animation: none; }
  .hb-xb2-burst, .hb-xb2-live { animation: none !important; }
  .hb-xb2 *, .hb-xb2-btn { transition-duration: 0.01s !important; }
  .hb-xb2[data-state="fired"] .hb-xb2-ok path { animation: none; stroke-dashoffset: 0; }
}
`;

const broadcast = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="2.2" />
    <path d="M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 19a10 10 0 0 1 0-14M19 5a10 10 0 0 1 0 14" />
  </svg>
);

export function ButtonHoldRing({
  label = "Hold to go live",
  hint = "Hold for 1.2 seconds",
  holdingLabel = "Keep holding",
  firedLabel = "You're live",
  firedHint = "Streaming now",
  icon = broadcast,
  duration = 1200,
  resetAfter = 2200,
  size = 64,
  accent = "#ff4d5e",
  disabled = false,
  onFire,
  onProgress,
  className = "",
  style,
  ...rest
}: ButtonHoldRingProps) {
  const [progress, setProgress] = React.useState(0);
  const [state, setState] = React.useState<"idle" | "holding" | "fired">("idle");
  const [pressed, setPressed] = React.useState(false);
  const raf = React.useRef(0);
  const holding = React.useRef(false);
  const value = React.useRef(0);
  const last = React.useRef(0);
  const timer = React.useRef(0);
  const cbs = React.useRef({ onFire, onProgress });

  React.useEffect(() => {
    cbs.current = { onFire, onProgress };
  });

  React.useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      window.clearTimeout(timer.current);
    },
    [],
  );

  const run = () => {
    function tick(now: number) {
      const dt = last.current ? now - last.current : 16;
      last.current = now;
      const dir = holding.current ? 1 : -2.4;
      const next = Math.max(0, Math.min(1, value.current + (dt / duration) * dir));
      value.current = next;
      setProgress(next);
      cbs.current.onProgress?.(next);
      if (next >= 1) {
        holding.current = false;
        setPressed(false);
        setState("fired");
        cbs.current.onFire?.();
        timer.current = window.setTimeout(() => {
          value.current = 0;
          setProgress(0);
          setState("idle");
        }, resetAfter);
        return;
      }
      if (next <= 0 && !holding.current) {
        setState("idle");
        return;
      }
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
  };

  const begin = () => {
    if (disabled || state === "fired" || holding.current) return;
    holding.current = true;
    setPressed(true);
    setState("holding");
    cancelAnimationFrame(raf.current);
    last.current = 0;
    run();
  };

  const end = () => {
    setPressed(false);
    if (!holding.current) return;
    holding.current = false;
  };

  const r = 44;
  const c = 2 * Math.PI * r;
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    return { x1: (50 + Math.cos(a) * 48.5).toFixed(2), y1: (50 + Math.sin(a) * 48.5).toFixed(2), x2: (50 + Math.cos(a) * 50).toFixed(2), y2: (50 + Math.sin(a) * 50).toFixed(2) };
  });
  const remain = ((1 - progress) * duration) / 1000;

  const vars = {
    "--hb-xb2-c": accent,
    "--hb-xb2-s": `${size}px`,
    "--hb-xb2-a": `${(progress * 1.6).toFixed(2)}px`,
    "--hb-xb2-o": (state === "fired" ? 0 : progress * 0.35).toFixed(3),
  } as React.CSSProperties;

  return (
    <div className={`hb-xb2 ${className}`.trim()} data-state={state} data-pressed={pressed ? "true" : "false"} style={{ ...vars, ...style }} {...rest}>
      <style href="hb-button-hold-ring" precedence="default">{css}</style>
      <div className="hb-xb2-wrap">
        <svg className="hb-xb2-ring" viewBox="0 0 100 100" aria-hidden="true">
          <g className="hb-xb2-ticks">
            {ticks.map((t, i) => (
              <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
            ))}
          </g>
          <circle className="hb-xb2-track" cx="50" cy="50" r={r} />
          <circle
            className="hb-xb2-prog"
            cx="50"
            cy="50"
            r={r}
            strokeDasharray={c.toFixed(2)}
            strokeDashoffset={(c * (1 - (state === "fired" ? 1 : progress))).toFixed(2)}
            opacity={progress > 0 || state === "fired" ? 1 : 0}
          />
        </svg>
        <span className="hb-xb2-burst" aria-hidden="true" />
        <span className="hb-xb2-burst" aria-hidden="true" />
        <button
          type="button"
          className="hb-xb2-btn"
          aria-label={state === "fired" ? firedLabel : `${label}. Press and hold.`}
          disabled={disabled}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            begin();
          }}
          onPointerUp={end}
          onPointerCancel={end}
          onLostPointerCapture={end}
          onContextMenu={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              if (!e.repeat) begin();
            }
          }}
          onKeyUp={(e) => {
            if (e.key === " " || e.key === "Enter") end();
          }}
          onBlur={end}
        >
          <span className="hb-xb2-ico">{icon}</span>
          <span className="hb-xb2-ico hb-xb2-ok">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
        </button>
      </div>
      <div className="hb-xb2-txt" aria-live="polite">
        <div className="hb-xb2-t" data-on={state === "idle" ? "true" : "false"}>
          <span className="hb-xb2-l">{label}</span>
          <span className="hb-xb2-h">
            {hint}
            <span className="hb-xb2-kbd">Space</span>
          </span>
        </div>
        <div className="hb-xb2-t" data-on={state === "holding" ? "true" : "false"} aria-hidden={state !== "holding"}>
          <span className="hb-xb2-l">{holdingLabel}</span>
          <span className="hb-xb2-h">{remain.toFixed(1)}s</span>
        </div>
        <div className="hb-xb2-t" data-on={state === "fired" ? "true" : "false"} aria-hidden={state !== "fired"}>
          <span className="hb-xb2-l">{firedLabel}</span>
          <span className="hb-xb2-h">
            <span className="hb-xb2-live" />
            {firedHint}
          </span>
        </div>
      </div>
    </div>
  );
}
