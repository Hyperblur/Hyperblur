"use client";

import * as React from "react";

export interface MicroNotifyBellProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  count?: number;
  defaultCount?: number;
  max?: number;
  size?: number;
  accent?: string;
  label?: string;
  clearOnOpen?: boolean;
  idle?: boolean;
  onCountChange?: (count: number) => void;
  onOpen?: () => void;
}

const css = `
.hb-wf9 {
  --hb-wf9-c: #ff4d5e;
  --hb-wf9-s: 46px;
  position: relative;
  display: inline-grid;
  place-items: center;
  width: var(--hb-wf9-s);
  height: var(--hb-wf9-s);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  background: linear-gradient(180deg, #1b1b1b, #131313);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 18px -10px rgba(0,0,0,0.9);
  color: #d4d4d4;
  cursor: grab;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}
.hb-wf9 *, .hb-wf9 *::before, .hb-wf9 *::after { box-sizing: border-box; }
.hb-wf9:hover { border-color: #3a3a3a; color: #fff; }
.hb-wf9:focus-visible { outline: 2px solid var(--hb-wf9-c); outline-offset: 3px; }
.hb-wf9:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-wf9-svg { width: 56%; height: 56%; overflow: visible; }
.hb-wf9-bell { transform-origin: 12px 3.2px; }
.hb-wf9-clap { transform-origin: 12px 15px; }
.hb-wf9-ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1.5px solid var(--hb-wf9-c);
  opacity: 0;
  pointer-events: none;
  animation: hb-wf9-ring 0.9s cubic-bezier(0.2, 0.7, 0.3, 1) both;
}
.hb-wf9-ring + .hb-wf9-ring { animation-delay: 0.16s; }
@keyframes hb-wf9-ring { 0% { opacity: 0.7; transform: scale(1); } 100% { opacity: 0; transform: scale(1.65); } }
.hb-wf9-bd {
  position: absolute;
  top: -6px;
  right: -7px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 999px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-wf9-c) 85%, #fff), var(--hb-wf9-c));
  box-shadow: 0 0 0 2.5px #0a0a0a, 0 4px 10px -2px color-mix(in srgb, var(--hb-wf9-c) 60%, transparent);
  color: #fff;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  overflow: hidden;
  transform: scale(1);
  transition: transform 0.35s cubic-bezier(0.3, 1.8, 0.4, 1), opacity 0.2s ease;
}
.hb-wf9-bd[data-zero="true"] { transform: scale(0); opacity: 0; }
.hb-wf9-dg { position: relative; display: block; height: 11px; overflow: hidden; }
.hb-wf9-col { display: flex; flex-direction: column; transition: transform 0.5s cubic-bezier(0.25, 1.3, 0.4, 1); }
.hb-wf9-col span { display: block; height: 11px; line-height: 11px; text-align: center; }
.hb-wf9-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-wf9, .hb-wf9-bd, .hb-wf9-col { transition: none; }
  .hb-wf9-ring { animation: none; display: none; }
}
`;

const digits = Array.from({ length: 10 }, (_, i) => i);

export function MicroNotifyBell({
  count,
  defaultCount = 3,
  max = 99,
  size = 46,
  accent = "#ff4d5e",
  label = "Notifications",
  clearOnOpen = true,
  idle = false,
  disabled,
  onCountChange,
  onOpen,
  className = "",
  style,
  onClick,
  ...rest
}: MicroNotifyBellProps) {
  const [inner, setInner] = React.useState(defaultCount);
  const n = count ?? inner;
  const [rings, setRings] = React.useState(0);
  const [awake, setAwake] = React.useState(false);
  const bellRef = React.useRef<SVGGElement>(null);
  const clapRef = React.useRef<SVGGElement>(null);
  const sim = React.useRef({ a: 0, v: 0, c: 0, cv: 0, raf: 0, last: 0, running: false, reduced: false });
  const drag = React.useRef({ on: false, x: 0, lastX: 0, moved: false });
  const prev = React.useRef(n);
  const latest = React.useRef({ n, count, onCountChange });

  React.useEffect(() => {
    latest.current = { n, count, onCountChange };
  });

  const run = React.useCallback(() => {
    const s = sim.current;
    if (s.running || s.reduced) return;
    s.running = true;
    s.last = performance.now();
    const step = (t: number) => {
      const dt = Math.min(0.033, (t - s.last) / 1000);
      s.last = t;
      if (!drag.current.on) {
        s.v += (-260 * s.a - 5.2 * s.v) * dt;
        s.a += s.v * dt;
      }
      s.cv += (-420 * (s.c + s.a * 0.9) - 9 * s.cv) * dt;
      s.c += s.cv * dt;
      bellRef.current?.setAttribute("transform", `rotate(${s.a.toFixed(2)} 12 3.2)`);
      clapRef.current?.setAttribute("transform", `rotate(${(s.c * 1.4).toFixed(2)} 12 15)`);
      if (!drag.current.on && Math.abs(s.a) < 0.05 && Math.abs(s.v) < 0.05 && Math.abs(s.c) < 0.05 && Math.abs(s.cv) < 0.05) {
        s.running = false;
        bellRef.current?.setAttribute("transform", "rotate(0 12 3.2)");
        clapRef.current?.setAttribute("transform", "rotate(0 12 15)");
        return;
      }
      s.raf = requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);
  }, []);

  const ring = React.useCallback(
    (strength = 1) => {
      const s = sim.current;
      s.v += 210 * strength * (s.a >= 0 ? 1 : -1);
      setRings((r) => r + 1);
      run();
    },
    [run],
  );

  React.useEffect(() => {
    const s = sim.current;
    s.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  React.useEffect(() => {
    if (n > prev.current) ring(1);
    prev.current = n;
  }, [n, ring]);

  React.useEffect(() => {
    if (!idle || awake) return;
    const id = window.setInterval(() => {
      const l = latest.current;
      const next = l.n >= 12 ? 2 : l.n + 1;
      if (l.count === undefined) setInner(next);
      l.onCountChange?.(next);
    }, 3200);
    return () => window.clearInterval(id);
  }, [idle, awake]);

  const shown = Math.min(n, max);
  const over = n > max;
  const chars = String(shown).split("");

  return (
    <button
      type="button"
      aria-label={n > 0 ? `${label}, ${n} unread` : label}
      disabled={disabled}
      className={`hb-wf9 ${className}`}
      style={{ ...style, ["--hb-wf9-c" as string]: accent, ["--hb-wf9-s" as string]: `${size}px` }}
      onPointerEnter={() => setAwake(true)}
      onPointerDown={(e) => {
        if (disabled) return;
        setAwake(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = { on: true, x: e.clientX, lastX: e.clientX, moved: false };
        run();
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d.on) return;
        const dx = e.clientX - d.x;
        if (Math.abs(dx) > 3) d.moved = true;
        const s = sim.current;
        const target = Math.max(-38, Math.min(38, dx * 1.1));
        s.v = (target - s.a) * 30;
        s.a = target;
        d.lastX = e.clientX;
      }}
      onPointerUp={() => {
        drag.current.on = false;
        run();
      }}
      onPointerCancel={() => {
        drag.current.on = false;
        run();
      }}
      onClick={(e) => {
        onClick?.(e);
        if (drag.current.moved) {
          drag.current.moved = false;
          return;
        }
        ring(0.55);
        onOpen?.();
        if (clearOnOpen && n > 0) {
          if (count === undefined) setInner(0);
          onCountChange?.(0);
        }
      }}
      {...rest}
    >
      <style href="hb-micro-notify-bell" precedence="default">
        {css}
      </style>
      {rings > 0 ? (
        <React.Fragment key={rings}>
          <span className="hb-wf9-ring" aria-hidden="true" />
          <span className="hb-wf9-ring" aria-hidden="true" />
        </React.Fragment>
      ) : null}
      <svg className="hb-wf9-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <g ref={bellRef}>
          <g ref={clapRef}>
            <path d="M10 18.6a2.1 2.1 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </g>
          <path
            d="M12 3.2c-3.5 0-5.8 2.6-5.8 6v3c0 1.4-.6 2.5-1.5 3.5-.5.6-.1 1.5.7 1.5h13.2c.8 0 1.2-.9.7-1.5-.9-1-1.5-2.1-1.5-3.5v-3c0-3.4-2.3-6-5.8-6z"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="2.6" r="1.1" fill="currentColor" />
        </g>
      </svg>
      <span className="hb-wf9-bd" data-zero={n === 0} aria-hidden="true">
        {chars.map((c, i) => (
          <span key={`${chars.length}-${i}`} className="hb-wf9-dg">
            <span className="hb-wf9-col" style={{ transform: `translateY(${-Number(c) * 11}px)` }}>
              {digits.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ))}
        {over ? <span>+</span> : null}
      </span>
      <span className="hb-wf9-sr" aria-live="polite">
        {n > 0 ? `${n} unread` : ""}
      </span>
    </button>
  );
}
