"use client";

import * as React from "react";

export interface SplitFlapTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  chars?: string;
  speed?: number;
  stagger?: number;
  padTo?: number;
}

const css = `
@keyframes hb-sf-fall {
  from { transform: rotateX(0deg); }
  to { transform: rotateX(-90deg); }
}
@keyframes hb-sf-rise {
  from { transform: rotateX(90deg); }
  to { transform: rotateX(0deg); }
}
.hb-sf {
  display: inline-flex;
  gap: 0.08em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-weight: 700;
  line-height: 1;
}
.hb-sf-tile {
  position: relative;
  display: inline-block;
  flex: 0 0 auto;
  width: 0.78em;
  height: 1.3em;
  perspective: 0.9em;
  color: var(--hb-sf-fg, #f4f4f5);
}
.hb-sf-tile::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 0.04em;
  min-height: 1px;
  margin-top: -0.02em;
  background: rgba(0, 0, 0, 0.85);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06);
  z-index: 5;
}
.hb-sf-half {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  overflow: hidden;
  background: var(--hb-sf-bg, #151517);
  backface-visibility: hidden;
}
.hb-sf-top { top: 0; border-radius: 0.1em 0.1em 0 0; transform-origin: 50% 100%; }
.hb-sf-bot { top: 50%; border-radius: 0 0 0.1em 0.1em; transform-origin: 50% 0; }
.hb-sf-ch {
  position: absolute;
  left: 0;
  right: 0;
  height: 200%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hb-sf-top .hb-sf-ch { top: 0; }
.hb-sf-bot .hb-sf-ch { top: -100%; }
.hb-sf-static { z-index: 1; }
.hb-sf-top.hb-sf-flap {
  z-index: 3;
  animation: hb-sf-fall calc(var(--hb-sf-t) * 0.5) ease-in forwards;
}
.hb-sf-bot.hb-sf-flap {
  z-index: 2;
  animation: hb-sf-rise calc(var(--hb-sf-t) * 0.5) ease-out calc(var(--hb-sf-t) * 0.5) both;
}
@media (prefers-reduced-motion: reduce) {
  .hb-sf-flap { display: none; }
}
`;

const DEFAULT_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const MISS_STEPS = 8;

function flipPath(from: string, target: string, pool: string[]) {
  if (from === target || pool.length === 0) return [];
  const start = pool.indexOf(from);
  const end = pool.indexOf(target);
  const len = pool.length;
  const path: string[] = [];
  if (end >= 0) {
    const count = start < 0 ? end + 1 : (end - start + len) % len;
    for (let k = 1; k <= count; k++) path.push(pool[(start + k + len) % len]);
    return path;
  }
  const count = Math.min(len, MISS_STEPS);
  for (let k = 1; k <= count; k++) path.push(pool[(start + k + len) % len]);
  path.push(target);
  return path;
}

interface Flap {
  prev: string;
  next: string;
  k: number;
}

interface TileProps {
  target: string;
  pool: string[];
  speed: number;
  delay: number;
}

function Tile({ target, pool, speed, delay }: TileProps) {
  const [flap, setFlap] = React.useState<Flap>({ prev: target, next: target, k: 0 });
  const shown = React.useRef(target);
  const first = React.useRef(true);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const blank = pool[0] ?? " ";
    const fromBlank = first.current && !reduced;
    if (reduced) first.current = false;
    const steps = reduced ? (shown.current === target ? [] : [target]) : flipPath(fromBlank ? blank : shown.current, target, pool);
    if (steps.length === 0) return;

    let i = 0;
    let timer = 0;
    const advance = () => {
      const prev = shown.current;
      const next = steps[i];
      shown.current = next;
      setFlap((f) => ({ prev, next, k: f.k + 1 }));
      i += 1;
      if (i < steps.length) timer = window.setTimeout(advance, speed);
    };

    if (fromBlank) {
      shown.current = blank;
      timer = window.setTimeout(() => {
        first.current = false;
        setFlap((f) => ({ prev: blank, next: blank, k: f.k }));
        timer = window.setTimeout(advance, delay);
      }, 0);
    } else {
      timer = window.setTimeout(advance, reduced ? 0 : delay);
    }
    return () => window.clearTimeout(timer);
  }, [target, pool, speed, delay]);

  return (
    <span className="hb-sf-tile" aria-hidden="true">
      <span className="hb-sf-half hb-sf-top hb-sf-static">
        <span className="hb-sf-ch">{flap.next}</span>
      </span>
      <span className="hb-sf-half hb-sf-bot hb-sf-static">
        <span className="hb-sf-ch">{flap.prev}</span>
      </span>
      <span key={`t${flap.k}`} className="hb-sf-half hb-sf-top hb-sf-flap">
        <span className="hb-sf-ch">{flap.prev}</span>
      </span>
      <span key={`b${flap.k}`} className="hb-sf-half hb-sf-bot hb-sf-flap">
        <span className="hb-sf-ch">{flap.next}</span>
      </span>
    </span>
  );
}

export function SplitFlapText({
  text,
  chars = DEFAULT_CHARS,
  speed = 60,
  stagger = 40,
  padTo = 0,
  className = "",
  style,
  ...rest
}: SplitFlapTextProps) {
  const pool = React.useMemo(() => Array.from(chars), [chars]);
  const padded = padTo > 0 ? text.padEnd(padTo, " ") : text;
  const columns = Array.from(padded);
  const vars = {
    "--hb-sf-t": `${Math.max(1, speed)}ms`,
    ...style,
  } as React.CSSProperties;

  return (
    <span
      className={`hb-sf ${className}`}
      style={vars}
      role="img"
      aria-label={text}
      {...rest}
    >
      <style href="hb-split-flap-text" precedence="default">{css}</style>
      {columns.map((ch, i) => (
        <Tile key={i} target={ch} pool={pool} speed={Math.max(1, speed)} delay={i * Math.max(0, stagger)} />
      ))}
    </span>
  );
}
