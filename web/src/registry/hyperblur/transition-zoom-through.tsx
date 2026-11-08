"use client";

import * as React from "react";

export interface TransitionZoomThroughProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  from?: React.ReactNode;
  to?: React.ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  origin?: { x: number; y: number };
  depth?: number;
  streaks?: boolean;
  accent?: string;
}

const css = `
.hb-vj8 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  background: #030304;
}
.hb-vj8 *, .hb-vj8 *::before, .hb-vj8 *::after { box-sizing: border-box; }
.hb-vj8-l {
  grid-area: 1 / 1;
  display: grid;
  min-width: 0;
  min-height: 0;
  transform-origin: var(--hb-vj8-x) var(--hb-vj8-y);
  transform: none;
  opacity: 1;
  filter: blur(0px);
  transition:
    transform calc(var(--hb-vj8-d) * 0.72) cubic-bezier(0.16, 1, 0.3, 1) calc(var(--hb-vj8-d) * 0.28),
    opacity calc(var(--hb-vj8-d) * 0.5) cubic-bezier(0.16, 1, 0.3, 1) calc(var(--hb-vj8-d) * 0.28),
    filter calc(var(--hb-vj8-d) * 0.6) ease calc(var(--hb-vj8-d) * 0.28),
    visibility 0s linear 0s;
}
.hb-vj8-l[data-on="false"] {
  visibility: hidden;
  opacity: 0;
  filter: blur(10px);
  transition:
    transform calc(var(--hb-vj8-d) * 0.62) cubic-bezier(0.7, 0, 0.84, 0),
    opacity calc(var(--hb-vj8-d) * 0.5) cubic-bezier(0.7, 0, 0.84, 0) calc(var(--hb-vj8-d) * 0.12),
    filter calc(var(--hb-vj8-d) * 0.6) ease,
    visibility 0s linear calc(var(--hb-vj8-d) * 0.62);
}
.hb-vj8[data-active="true"] .hb-vj8-l[data-role="from"] { transform: scale(var(--hb-vj8-k)); }
.hb-vj8[data-active="true"] .hb-vj8-l[data-role="to"] { z-index: 1; }
.hb-vj8[data-active="false"] .hb-vj8-l[data-role="from"] { z-index: 1; }
.hb-vj8-l[data-role="to"][data-on="false"] { transform: scale(0.42); }
.hb-vj8-fx {
  position: absolute;
  inset: -20%;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  background:
    radial-gradient(circle at var(--hb-vj8-x) var(--hb-vj8-y), color-mix(in srgb, var(--hb-vj8-acc) 55%, #ffffff) 0, color-mix(in srgb, var(--hb-vj8-acc) 30%, transparent) 6%, transparent 22%),
    repeating-conic-gradient(from 3deg at var(--hb-vj8-x) var(--hb-vj8-y), rgba(255, 255, 255, 0.5) 0deg 0.6deg, transparent 0.6deg 7deg, color-mix(in srgb, var(--hb-vj8-acc) 70%, transparent) 7deg 7.4deg, transparent 7.4deg 13deg);
  -webkit-mask: radial-gradient(circle at var(--hb-vj8-x) var(--hb-vj8-y), transparent 8%, #000 30%, #000 60%, transparent 85%);
  mask: radial-gradient(circle at var(--hb-vj8-x) var(--hb-vj8-y), transparent 8%, #000 30%, #000 60%, transparent 85%);
  transform-origin: var(--hb-vj8-x) var(--hb-vj8-y);
  mix-blend-mode: screen;
}
.hb-vj8[data-ran="true"][data-active="true"] .hb-vj8-fx { animation: hb-vj8-rush-a var(--hb-vj8-d) cubic-bezier(0.4, 0, 0.2, 1) both; }
.hb-vj8[data-ran="true"][data-active="false"] .hb-vj8-fx { animation: hb-vj8-rush-b var(--hb-vj8-d) cubic-bezier(0.4, 0, 0.2, 1) both; }
@keyframes hb-vj8-rush-a {
  0% { opacity: 0; transform: scale(0.6) rotate(0deg); }
  38% { opacity: 1; }
  100% { opacity: 0; transform: scale(1.8) rotate(6deg); }
}
@keyframes hb-vj8-rush-b {
  0% { opacity: 0; transform: scale(1.8) rotate(6deg); }
  45% { opacity: 0.85; }
  100% { opacity: 0; transform: scale(0.6) rotate(0deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vj8-l, .hb-vj8-l[data-on="false"] { transition: none; }
  .hb-vj8[data-ran="true"] .hb-vj8-fx { animation: none; display: none; }
}
`;

function useSwap(
  active: boolean | undefined,
  defaultActive: boolean,
  onActiveChange: ((active: boolean) => void) | undefined,
  autoPlay: boolean,
  interval: number,
) {
  const [inner, setInner] = React.useState(defaultActive);
  const controlled = active !== undefined;
  const value = controlled ? active : inner;
  const set = React.useCallback(
    (next: boolean) => {
      if (!controlled) setInner(next);
      onActiveChange?.(next);
    },
    [controlled, onActiveChange],
  );
  React.useEffect(() => {
    if (!autoPlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => set(!value), interval);
    return () => window.clearTimeout(id);
  }, [autoPlay, interval, value, set]);
  return value;
}

function Scene({ tone, kicker, title }: { tone: string; kicker: string; title: string }) {
  return (
    <div style={{ display: "grid", alignContent: "end", gap: 4, padding: 20, minHeight: 180, background: tone, color: "#ededed" }}>
      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(237,237,237,0.6)" }}>{kicker}</span>
      <strong style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</strong>
    </div>
  );
}

export function TransitionZoomThrough({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 2800,
  duration = 1100,
  origin = { x: 50, y: 50 },
  depth = 3.2,
  streaks = true,
  accent = "#7fb3ff",
  className,
  style,
  ...rest
}: TransitionZoomThroughProps) {
  const value = useSwap(active, defaultActive, onActiveChange, autoPlay, interval);
  const [prev, setPrev] = React.useState(value);
  const [ran, setRan] = React.useState(false);
  if (prev !== value) {
    setPrev(value);
    setRan(true);
  }
  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <Scene tone="radial-gradient(circle at 50% 50%, #1b2440, #06070c 70%)" kicker="Milky Way" title="Orion arm" />;
  const b = to ?? kids[1] ?? <Scene tone="radial-gradient(circle at 50% 50%, #3a2a1a, #0b0805 70%)" kicker="Kepler-452" title="b, 1,402 light years" />;

  const vars = {
    "--hb-vj8-x": `${origin.x}%`,
    "--hb-vj8-y": `${origin.y}%`,
    "--hb-vj8-d": `${duration}ms`,
    "--hb-vj8-k": Math.max(1.2, depth).toFixed(2),
    "--hb-vj8-acc": accent,
  } as React.CSSProperties;

  return (
    <div className={["hb-vj8", className].filter(Boolean).join(" ")} style={{ ...vars, ...style }} data-active={value} data-ran={ran} {...rest}>
      <style href="hb-transition-zoom-through" precedence="default">{css}</style>
      <div className="hb-vj8-l" data-role="from" data-on={!value} aria-hidden={value} inert={value}>{a}</div>
      <div className="hb-vj8-l" data-role="to" data-on={value} aria-hidden={!value} inert={!value}>{b}</div>
      {streaks ? <div className="hb-vj8-fx" aria-hidden="true" /> : null}
    </div>
  );
}
