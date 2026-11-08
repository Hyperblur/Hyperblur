"use client";

import * as React from "react";

export interface TransitionPixelDissolveProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  from?: React.ReactNode;
  to?: React.ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  columns?: number;
  rows?: number;
  accent?: string;
  cover?: string;
}

const css = `
.hb-vj3 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  background: var(--hb-vj3-cov);
}
.hb-vj3 *, .hb-vj3 *::before, .hb-vj3 *::after { box-sizing: border-box; }
.hb-vj3-l {
  grid-area: 1 / 1;
  display: grid;
  min-width: 0;
  min-height: 0;
  visibility: hidden;
  transition: visibility 0s linear calc(var(--hb-vj3-d) * 0.5);
}
.hb-vj3-l[data-on="true"] { visibility: visible; }
.hb-vj3-grid {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(var(--hb-vj3-c), 1fr);
  grid-template-rows: repeat(var(--hb-vj3-r), 1fr);
  pointer-events: none;
}
.hb-vj3-px {
  opacity: 0;
  background: var(--hb-vj3-cov);
  transform: scale(1.04);
}
.hb-vj3[data-ran="true"][data-active="true"] .hb-vj3-px {
  animation:
    hb-vj3-in-a var(--hb-vj3-seg) cubic-bezier(0.3, 0.7, 0.2, 1) var(--hb-vj3-t1) both,
    hb-vj3-out-a var(--hb-vj3-seg) cubic-bezier(0.6, 0, 0.8, 0.4) var(--hb-vj3-t2) forwards;
}
.hb-vj3[data-ran="true"][data-active="false"] .hb-vj3-px {
  animation:
    hb-vj3-in-b var(--hb-vj3-seg) cubic-bezier(0.3, 0.7, 0.2, 1) var(--hb-vj3-t1) both,
    hb-vj3-out-b var(--hb-vj3-seg) cubic-bezier(0.6, 0, 0.8, 0.4) var(--hb-vj3-t2) forwards;
}
@keyframes hb-vj3-in-a {
  0% { opacity: 0; transform: scale(0.35); background: var(--hb-vj3-acc); }
  55% { opacity: 1; transform: scale(1.04); background: var(--hb-vj3-acc); }
  100% { opacity: 1; transform: scale(1.04); background: var(--hb-vj3-cov); }
}
@keyframes hb-vj3-out-a {
  0% { opacity: 1; transform: scale(1.04); background: var(--hb-vj3-cov); }
  45% { opacity: 1; background: var(--hb-vj3-soft); }
  100% { opacity: 0; transform: scale(0.35); background: var(--hb-vj3-soft); }
}
@keyframes hb-vj3-in-b {
  0% { opacity: 0; transform: scale(0.35); background: var(--hb-vj3-acc); }
  55% { opacity: 1; transform: scale(1.04); background: var(--hb-vj3-acc); }
  100% { opacity: 1; transform: scale(1.04); background: var(--hb-vj3-cov); }
}
@keyframes hb-vj3-out-b {
  0% { opacity: 1; transform: scale(1.04); background: var(--hb-vj3-cov); }
  45% { opacity: 1; background: var(--hb-vj3-soft); }
  100% { opacity: 0; transform: scale(0.35); background: var(--hb-vj3-soft); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vj3-l { transition: none; }
  .hb-vj3[data-ran="true"][data-active="true"] .hb-vj3-px,
  .hb-vj3[data-ran="true"][data-active="false"] .hb-vj3-px { animation: none; }
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

function hash(n: number) {
  let h = (n ^ 0x9e3779b9) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function Scene({ tone, kicker, title }: { tone: string; kicker: string; title: string }) {
  return (
    <div style={{ display: "grid", alignContent: "end", gap: 4, padding: 20, minHeight: 180, background: tone, color: "#ededed" }}>
      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(237,237,237,0.6)" }}>{kicker}</span>
      <strong style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</strong>
    </div>
  );
}

export function TransitionPixelDissolve({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 2800,
  duration = 1300,
  columns = 14,
  rows = 8,
  accent = "#2f7bff",
  cover = "#08090c",
  className,
  style,
  ...rest
}: TransitionPixelDissolveProps) {
  const value = useSwap(active, defaultActive, onActiveChange, autoPlay, interval);
  const [prev, setPrev] = React.useState(value);
  const [ran, setRan] = React.useState(false);
  if (prev !== value) {
    setPrev(value);
    setRan(true);
  }
  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <Scene tone="linear-gradient(160deg, #0f3b3a, #071312)" kicker="Lisbon" title="21° and clear" />;
  const b = to ?? kids[1] ?? <Scene tone="linear-gradient(160deg, #1e2a44, #090c14)" kicker="Reykjavik" title="4° with sleet" />;
  const c = Math.max(2, Math.round(columns));
  const r = Math.max(2, Math.round(rows));
  const seg = duration * 0.16;

  const vars = {
    "--hb-vj3-d": `${duration}ms`,
    "--hb-vj3-seg": `${seg.toFixed(0)}ms`,
    "--hb-vj3-c": c,
    "--hb-vj3-r": r,
    "--hb-vj3-acc": accent,
    "--hb-vj3-soft": `color-mix(in srgb, ${accent} 35%, ${cover})`,
    "--hb-vj3-cov": cover,
  } as React.CSSProperties;

  const cells = Array.from({ length: c * r }, (_, i) => {
    const col = i % c;
    const row = Math.floor(i / c);
    const diag = (col / (c - 1) + row / (r - 1)) / 2;
    const o1 = 0.6 * diag + 0.4 * hash(i * 7 + 3);
    const o2 = 0.6 * diag + 0.4 * hash(i * 13 + 11);
    const t1 = o1 * duration * 0.32;
    const t2 = duration * 0.52 + o2 * duration * 0.32;
    return (
      <span
        key={i}
        className="hb-vj3-px"
        style={{ "--hb-vj3-t1": `${t1.toFixed(0)}ms`, "--hb-vj3-t2": `${t2.toFixed(0)}ms` } as React.CSSProperties}
      />
    );
  });

  return (
    <div className={["hb-vj3", className].filter(Boolean).join(" ")} style={{ ...vars, ...style }} data-active={value} data-ran={ran} {...rest}>
      <style href="hb-transition-pixel-dissolve" precedence="default">{css}</style>
      <div className="hb-vj3-l" data-on={!value} aria-hidden={value} inert={value}>{a}</div>
      <div className="hb-vj3-l" data-on={value} aria-hidden={!value} inert={!value}>{b}</div>
      <div className="hb-vj3-grid" aria-hidden="true">{cells}</div>
    </div>
  );
}
