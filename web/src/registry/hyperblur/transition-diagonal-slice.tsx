"use client";

import * as React from "react";

export interface TransitionDiagonalSliceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  from?: React.ReactNode;
  to?: React.ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  stagger?: number;
  slices?: number;
  slant?: number;
  accent?: string;
}

const css = `
.hb-vj2 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  background: #050506;
}
.hb-vj2 *, .hb-vj2 *::before, .hb-vj2 *::after { box-sizing: border-box; }
.hb-vj2-l {
  grid-area: 1 / 1;
  display: grid;
  min-width: 0;
  min-height: 0;
}
.hb-vj2-from {
  z-index: 0;
  transform-origin: 50% 50%;
  transition: transform var(--hb-vj2-t) cubic-bezier(0.22, 1, 0.36, 1), filter var(--hb-vj2-t) cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-vj2[data-active="true"] .hb-vj2-from {
  transform: scale(0.94) translateX(-3%);
  filter: brightness(0.4) saturate(0.6);
}
.hb-vj2-to {
  position: relative;
  z-index: 2;
  visibility: hidden;
  transition: visibility 0s linear 0s;
}
.hb-vj2[data-active="true"] .hb-vj2-to {
  visibility: visible;
  transition: visibility 0s linear var(--hb-vj2-t);
}
.hb-vj2-band {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  pointer-events: none;
  will-change: transform;
  transform: translate(var(--hb-vj2-tx), var(--hb-vj2-ty));
  transition: transform var(--hb-vj2-d) cubic-bezier(0.76, 0, 0.18, 1) var(--hb-vj2-out);
}
.hb-vj2[data-active="true"] .hb-vj2-band {
  transform: translate(0, 0);
  transition-delay: var(--hb-vj2-in);
}
.hb-vj2-band > .hb-vj2-c {
  display: grid;
  min-width: 0;
  min-height: 0;
}
.hb-vj2-edge {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-vj2-acc) 90%, #ffffff), transparent);
  opacity: 0;
}
.hb-vj2[data-ran="true"][data-active="true"] .hb-vj2-edge { animation: hb-vj2-glint-a var(--hb-vj2-d) cubic-bezier(0.76, 0, 0.18, 1) var(--hb-vj2-in) both; }
.hb-vj2[data-ran="true"][data-active="false"] .hb-vj2-edge { animation: hb-vj2-glint-b var(--hb-vj2-d) cubic-bezier(0.76, 0, 0.18, 1) var(--hb-vj2-out) both; }
@keyframes hb-vj2-glint-a { 0% { opacity: 0; } 35% { opacity: 0.95; } 100% { opacity: 0; } }
@keyframes hb-vj2-glint-b { 0% { opacity: 0; } 50% { opacity: 0.7; } 100% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vj2-from, .hb-vj2-band, .hb-vj2-to, .hb-vj2[data-active="true"] .hb-vj2-to, .hb-vj2[data-active="true"] .hb-vj2-band { transition: none; }
  .hb-vj2[data-ran="true"] .hb-vj2-edge { animation: none; }
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

const pct = (n: number) => `${n.toFixed(2)}%`;

export function TransitionDiagonalSlice({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 2600,
  duration = 720,
  stagger = 70,
  slices = 5,
  slant = 24,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: TransitionDiagonalSliceProps) {
  const value = useSwap(active, defaultActive, onActiveChange, autoPlay, interval);
  const [prev, setPrev] = React.useState(value);
  const [ran, setRan] = React.useState(false);
  if (prev !== value) {
    setPrev(value);
    setRan(true);
  }
  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <Scene tone="linear-gradient(150deg, #1f2937, #0b0d12)" kicker="Drop 01" title="Field jacket, olive" />;
  const b = to ?? kids[1] ?? <Scene tone="linear-gradient(150deg, #312e81, #0b0a1a)" kicker="Drop 02" title="Trail shell, indigo" />;
  const n = Math.max(2, Math.round(slices));
  const s = Math.max(0, slant);
  const w = (100 + s) / n;
  const total = duration + (n - 1) * stagger;

  const vars = {
    "--hb-vj2-d": `${duration}ms`,
    "--hb-vj2-t": `${total}ms`,
    "--hb-vj2-acc": accent,
  } as React.CSSProperties;

  const bands = Array.from({ length: n }, (_, i) => {
    const l = i * w - 0.25;
    const r = (i + 1) * w + 0.25;
    const clip = `polygon(${pct(l)} 0%, ${pct(r)} 0%, ${pct(r - s)} 100%, ${pct(l - s)} 100%)`;
    const edge = `polygon(${pct(l)} 0%, ${pct(l + 0.9)} 0%, ${pct(l + 0.9 - s)} 100%, ${pct(l - s)} 100%)`;
    const up = i % 2 === 0;
    const bandVars = {
      clipPath: clip,
      "--hb-vj2-tx": up ? pct(s) : pct(-s),
      "--hb-vj2-ty": up ? "-101%" : "101%",
      "--hb-vj2-in": `${i * stagger}ms`,
      "--hb-vj2-out": `${(n - 1 - i) * stagger}ms`,
    } as React.CSSProperties;
    return (
      <div key={i} className="hb-vj2-band" style={bandVars} aria-hidden="true" inert>
        <div className="hb-vj2-c">{b}</div>
        <div className="hb-vj2-edge" style={{ clipPath: edge }} />
      </div>
    );
  });

  return (
    <div className={["hb-vj2", className].filter(Boolean).join(" ")} style={{ ...vars, ...style }} data-active={value} data-ran={ran} {...rest}>
      <style href="hb-transition-diagonal-slice" precedence="default">{css}</style>
      <div className="hb-vj2-l hb-vj2-from" aria-hidden={value} inert={value}>{a}</div>
      {bands}
      <div className="hb-vj2-l hb-vj2-to" aria-hidden={!value} inert={!value}>{b}</div>
    </div>
  );
}
