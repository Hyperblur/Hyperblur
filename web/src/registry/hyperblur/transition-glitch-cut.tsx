"use client";

import * as React from "react";

export interface TransitionGlitchCutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  from?: React.ReactNode;
  to?: React.ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  accent?: string;
  accentAlt?: string;
}

function hash(n: number) {
  let h = (n ^ 0x2545f491) >>> 0;
  h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d) >>> 0;
  h = Math.imul(h ^ (h >>> 12), 0x297a2d39) >>> 0;
  return ((h ^ (h >>> 15)) >>> 0) / 4294967295;
}

const FRAMES = 11;

function frames(name: string, seed: number, incoming: boolean) {
  const rows: string[] = [];
  for (let k = 0; k <= FRAMES; k++) {
    const p = ((k / FRAMES) * 100).toFixed(2);
    if (k === FRAMES) {
      rows.push(
        incoming
          ? `${p}% { clip-path: inset(0 0 0 0); transform: translate3d(0, 0, 0); filter: none; }`
          : `${p}% { clip-path: inset(50% 0 50% 0); transform: translate3d(0, 0, 0); filter: none; }`,
      );
      continue;
    }
    const h1 = hash(seed * 97 + k * 13);
    const h2 = hash(seed * 31 + k * 7 + 5);
    const h3 = hash(seed * 53 + k * 19 + 11);
    const grow = incoming ? k / FRAMES : 1 - k / FRAMES;
    const band = 8 + grow * 70 + h3 * 18;
    const top = Math.max(0, Math.min(100 - band, h1 * (100 - band)));
    const bottom = Math.max(0, 100 - top - band);
    const full = incoming ? k >= FRAMES - 2 && h2 > 0.4 : k < 2 && h2 > 0.4;
    const shift = (h2 - 0.5) * 28 * (1 - Math.abs(k / FRAMES - 0.5));
    const split = 2 + h3 * 5;
    const clip = full ? "inset(0 0 0 0)" : `inset(${top.toFixed(2)}% 0 ${bottom.toFixed(2)}% 0)`;
    rows.push(
      `${p}% { clip-path: ${clip}; transform: translate3d(${shift.toFixed(1)}px, 0, 0) skewX(${((h1 - 0.5) * 8).toFixed(2)}deg); filter: drop-shadow(${split.toFixed(1)}px 0 0 var(--hb-vj11-a)) drop-shadow(${(-split).toFixed(1)}px 0 0 var(--hb-vj11-b)); }`,
    );
  }
  return `@keyframes ${name} { ${rows.join(" ")} }`;
}

function scan(name: string, seed: number) {
  const rows: string[] = [];
  for (let k = 0; k <= FRAMES; k++) {
    const p = ((k / FRAMES) * 100).toFixed(2);
    const h = hash(seed * 71 + k * 29);
    const on = k > 0 && k < FRAMES && h > 0.35;
    rows.push(`${p}% { opacity: ${on ? (0.5 + h * 0.5).toFixed(2) : "0"}; top: ${(h * 92).toFixed(1)}%; height: ${(2 + hash(k * 3 + seed) * 9).toFixed(1)}%; }`);
  }
  return `@keyframes ${name} { ${rows.join(" ")} }`;
}

const css = `
.hb-vj11 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  background: #000000;
}
.hb-vj11 *, .hb-vj11 *::before, .hb-vj11 *::after { box-sizing: border-box; }
.hb-vj11-l {
  grid-area: 1 / 1;
  display: grid;
  min-width: 0;
  min-height: 0;
  z-index: 1;
  visibility: hidden;
  transition: visibility 0s linear var(--hb-vj11-d);
}
.hb-vj11-l[data-on="true"] {
  z-index: 2;
  visibility: visible;
  transition: visibility 0s linear 0s;
}
.hb-vj11[data-ran="true"] .hb-vj11-l[data-on="true"] { animation: hb-vj11-in var(--hb-vj11-d) steps(1, end) both; }
.hb-vj11[data-ran="true"] .hb-vj11-l[data-on="false"] { animation: hb-vj11-out var(--hb-vj11-d) steps(1, end) both; }
.hb-vj11-bar {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  background:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0 3px, transparent 3px 7px, color-mix(in srgb, var(--hb-vj11-a) 80%, transparent) 7px 19px, transparent 19px 26px),
    linear-gradient(90deg, var(--hb-vj11-b), var(--hb-vj11-a));
  mix-blend-mode: screen;
}
.hb-vj11-bar + .hb-vj11-bar { mix-blend-mode: difference; background: #ffffff; }
.hb-vj11-noise {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 3px);
}
.hb-vj11[data-ran="true"][data-active="true"] .hb-vj11-bar { animation: hb-vj11-s1a var(--hb-vj11-d) steps(1, end) both; }
.hb-vj11[data-ran="true"][data-active="false"] .hb-vj11-bar { animation: hb-vj11-s1b var(--hb-vj11-d) steps(1, end) both; }
.hb-vj11[data-ran="true"][data-active="true"] .hb-vj11-bar + .hb-vj11-bar { animation-name: hb-vj11-s2a; }
.hb-vj11[data-ran="true"][data-active="false"] .hb-vj11-bar + .hb-vj11-bar { animation-name: hb-vj11-s2b; }
.hb-vj11[data-ran="true"][data-active="true"] .hb-vj11-noise { animation: hb-vj11-na var(--hb-vj11-d) linear both; }
.hb-vj11[data-ran="true"][data-active="false"] .hb-vj11-noise { animation: hb-vj11-nb var(--hb-vj11-d) linear both; }
@keyframes hb-vj11-na { 0% { opacity: 0; } 10% { opacity: 1; } 80% { opacity: 0.6; } 100% { opacity: 0; } }
@keyframes hb-vj11-nb { 0% { opacity: 0; } 10% { opacity: 1; } 80% { opacity: 0.6; } 100% { opacity: 0; } }
${frames("hb-vj11-in", 3, true)}
${frames("hb-vj11-out", 8, false)}
${scan("hb-vj11-s1a", 2)}
${scan("hb-vj11-s1b", 2)}
${scan("hb-vj11-s2a", 6)}
${scan("hb-vj11-s2b", 6)}
@media (prefers-reduced-motion: reduce) {
  .hb-vj11-l, .hb-vj11-l[data-on="true"] { transition: none; }
  .hb-vj11[data-ran="true"] .hb-vj11-l[data-on="true"],
  .hb-vj11[data-ran="true"] .hb-vj11-l[data-on="false"],
  .hb-vj11[data-ran="true"] .hb-vj11-bar,
  .hb-vj11[data-ran="true"] .hb-vj11-noise { animation: none !important; }
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

export function TransitionGlitchCut({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 2400,
  duration = 560,
  accent = "#ff2e63",
  accentAlt = "#22d3ee",
  className,
  style,
  ...rest
}: TransitionGlitchCutProps) {
  const value = useSwap(active, defaultActive, onActiveChange, autoPlay, interval);
  const [prev, setPrev] = React.useState(value);
  const [ran, setRan] = React.useState(false);
  if (prev !== value) {
    setPrev(value);
    setRan(true);
  }
  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <Scene tone="linear-gradient(160deg, #1a1033, #07050d)" kicker="Channel 07" title="Night market, live" />;
  const b = to ?? kids[1] ?? <Scene tone="linear-gradient(160deg, #0d2a24, #040a09)" kicker="Channel 08" title="Harbor cam" />;

  const vars = {
    "--hb-vj11-d": `${duration}ms`,
    "--hb-vj11-a": accent,
    "--hb-vj11-b": accentAlt,
  } as React.CSSProperties;

  return (
    <div className={["hb-vj11", className].filter(Boolean).join(" ")} style={{ ...vars, ...style }} data-active={value} data-ran={ran} {...rest}>
      <style href="hb-transition-glitch-cut" precedence="default">{css}</style>
      <div className="hb-vj11-l" data-on={!value} aria-hidden={value} inert={value}>{a}</div>
      <div className="hb-vj11-l" data-on={value} aria-hidden={!value} inert={!value}>{b}</div>
      <div className="hb-vj11-noise" aria-hidden="true" />
      <div className="hb-vj11-bar" aria-hidden="true" />
      <div className="hb-vj11-bar" aria-hidden="true" />
    </div>
  );
}
