"use client";

import * as React from "react";

export interface TransitionSplitFlapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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
  columns?: number;
}

const css = `
.hb-vj9 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  background: #050506;
}
.hb-vj9 *, .hb-vj9 *::before, .hb-vj9 *::after { box-sizing: border-box; }
.hb-vj9-l {
  grid-area: 1 / 1;
  display: grid;
  min-width: 0;
  min-height: 0;
  position: relative;
  z-index: 2;
  visibility: hidden;
  transition: visibility 0s linear 0s;
}
.hb-vj9-l[data-on="true"] {
  visibility: visible;
  transition: visibility 0s linear var(--hb-vj9-t);
}
.hb-vj9-board {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.hb-vj9-col {
  position: absolute;
  inset: 0;
  perspective: 720px;
}
.hb-vj9-piece {
  position: absolute;
  inset: 0;
  display: grid;
}
.hb-vj9-piece > .hb-vj9-c { display: grid; min-width: 0; min-height: 0; }
.hb-vj9-flap {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateX(-180deg);
}
.hb-vj9[data-ran="true"][data-active="true"] .hb-vj9-flap { animation: hb-vj9-flip-a var(--hb-vj9-d) cubic-bezier(0.55, 0, 0.32, 1.22) var(--hb-vj9-in) both; }
.hb-vj9[data-ran="true"][data-active="false"] .hb-vj9-flap { animation: hb-vj9-flip-b var(--hb-vj9-d) cubic-bezier(0.55, 0, 0.32, 1.22) var(--hb-vj9-in) both; }
@keyframes hb-vj9-flip-a { from { transform: rotateX(0deg); } to { transform: rotateX(-180deg); } }
@keyframes hb-vj9-flip-b { from { transform: rotateX(0deg); } to { transform: rotateX(-180deg); } }
.hb-vj9-face {
  position: absolute;
  inset: 0;
  display: grid;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.hb-vj9-face[data-face="back"] { transform: rotateX(180deg); }
.hb-vj9-face > .hb-vj9-c { display: grid; min-width: 0; min-height: 0; }
.hb-vj9-face::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
}
.hb-vj9-face[data-face="front"]::after { background: linear-gradient(180deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.7) 50%); }
.hb-vj9-face[data-face="back"]::after { background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.65) 50%); }
.hb-vj9[data-ran="true"][data-active="true"] .hb-vj9-face[data-face="front"]::after { animation: hb-vj9-dim-a var(--hb-vj9-d) ease-in var(--hb-vj9-in) both; }
.hb-vj9[data-ran="true"][data-active="false"] .hb-vj9-face[data-face="front"]::after { animation: hb-vj9-dim-b var(--hb-vj9-d) ease-in var(--hb-vj9-in) both; }
.hb-vj9[data-ran="true"][data-active="true"] .hb-vj9-face[data-face="back"]::after { animation: hb-vj9-lit-a var(--hb-vj9-d) ease-out var(--hb-vj9-in) both; }
.hb-vj9[data-ran="true"][data-active="false"] .hb-vj9-face[data-face="back"]::after { animation: hb-vj9-lit-b var(--hb-vj9-d) ease-out var(--hb-vj9-in) both; }
@keyframes hb-vj9-dim-a { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-vj9-dim-b { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-vj9-lit-a { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-vj9-lit-b { from { opacity: 1; } to { opacity: 0; } }
.hb-vj9-under {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0) 50%);
}
.hb-vj9[data-ran="true"][data-active="true"] .hb-vj9-under { animation: hb-vj9-dim-a var(--hb-vj9-d) ease-in var(--hb-vj9-in) both; }
.hb-vj9[data-ran="true"][data-active="false"] .hb-vj9-under { animation: hb-vj9-dim-b var(--hb-vj9-d) ease-in var(--hb-vj9-in) both; }
.hb-vj9-hinge {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 2px;
  margin-top: -1px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.85), rgba(255, 255, 255, 0.07));
  pointer-events: none;
}
.hb-vj9-seam {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  margin-left: -1px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 1px 0 0 rgba(255, 255, 255, 0.05);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .hb-vj9-l, .hb-vj9-l[data-on="true"] { transition: none; }
  .hb-vj9[data-ran="true"] .hb-vj9-flap,
  .hb-vj9[data-ran="true"] .hb-vj9-face::after,
  .hb-vj9[data-ran="true"] .hb-vj9-under { animation: none !important; }
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
    <div style={{ display: "grid", alignContent: "center", gap: 4, padding: 20, minHeight: 180, background: tone, color: "#ededed" }}>
      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(237,237,237,0.6)" }}>{kicker}</span>
      <strong style={{ fontSize: 22, fontWeight: 600, letterSpacing: "0.02em" }}>{title}</strong>
    </div>
  );
}

const pct = (n: number) => `${n.toFixed(3)}%`;

export function TransitionSplitFlap({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 2800,
  duration = 620,
  stagger = 90,
  columns = 4,
  className,
  style,
  ...rest
}: TransitionSplitFlapProps) {
  const value = useSwap(active, defaultActive, onActiveChange, autoPlay, interval);
  const [prev, setPrev] = React.useState(value);
  const [ran, setRan] = React.useState(false);
  if (prev !== value) {
    setPrev(value);
    setRan(true);
  }
  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <Scene tone="#141416" kicker="Gate B12" title="LISBON 08:40" />;
  const b = to ?? kids[1] ?? <Scene tone="#141416" kicker="Gate C03" title="TOKYO 09:15" />;
  const oldView = value ? a : b;
  const newView = value ? b : a;
  const n = Math.max(1, Math.round(columns));
  const total = duration + (n - 1) * stagger;

  const vars = {
    "--hb-vj9-d": `${duration}ms`,
    "--hb-vj9-t": `${total}ms`,
  } as React.CSSProperties;

  const cols = Array.from({ length: n }, (_, i) => {
    const l = (i / n) * 100;
    const r = 100 - ((i + 1) / n) * 100;
    const top = `inset(0% ${pct(r)} 50% ${pct(l)})`;
    const bottom = `inset(50% ${pct(r)} 0% ${pct(l)})`;
    const colVars = {
      perspectiveOrigin: `${pct(l + 50 / n)} 50%`,
      "--hb-vj9-in": `${i * stagger}ms`,
    } as React.CSSProperties;
    return (
      <div key={i} className="hb-vj9-col" style={colVars}>
        <div className="hb-vj9-piece" style={{ clipPath: top }}>
          <div className="hb-vj9-c">{newView}</div>
        </div>
        <div className="hb-vj9-piece" style={{ clipPath: bottom }}>
          <div className="hb-vj9-c">{oldView}</div>
          <div className="hb-vj9-under" />
        </div>
        <div className="hb-vj9-flap">
          <div className="hb-vj9-face" data-face="front" style={{ clipPath: top }}>
            <div className="hb-vj9-c">{oldView}</div>
          </div>
          <div className="hb-vj9-face" data-face="back" style={{ clipPath: bottom }}>
            <div className="hb-vj9-c">{newView}</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={["hb-vj9", className].filter(Boolean).join(" ")} style={{ ...vars, ...style }} data-active={value} data-ran={ran} {...rest}>
      <style href="hb-transition-split-flap" precedence="default">{css}</style>
      <div className="hb-vj9-board" aria-hidden="true" inert>
        {cols}
        <div className="hb-vj9-hinge" />
        {Array.from({ length: n - 1 }, (_, i) => (
          <div key={i} className="hb-vj9-seam" style={{ left: pct(((i + 1) / n) * 100) }} />
        ))}
      </div>
      <div className="hb-vj9-l" data-on={!value} aria-hidden={value} inert={value}>{a}</div>
      <div className="hb-vj9-l" data-on={value} aria-hidden={!value} inert={!value}>{b}</div>
    </div>
  );
}
