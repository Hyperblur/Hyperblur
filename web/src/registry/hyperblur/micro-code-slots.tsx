"use client";

import * as React from "react";

export interface CodeSlotsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  value?: string;
  charset?: string;
  duration?: number;
  stagger?: number;
  size?: number;
  accent?: string;
}

const css = `
.hb-qs2 {
  --hb-qs2-c: #2f7bff;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  font-family: ui-monospace, "Geist Mono", SFMono-Regular, Menlo, Consolas, monospace;
  font-weight: 600;
  line-height: 1;
  color: #ededed;
  font-variant-numeric: tabular-nums;
  user-select: none;
  -webkit-user-select: none;
}
.hb-qs2 *, .hb-qs2 *::before, .hb-qs2 *::after { box-sizing: border-box; }
.hb-qs2-w {
  position: relative;
  width: 0.82em;
  height: 1.3em;
  overflow: hidden;
  background: linear-gradient(180deg, #0c0c0c 0%, #171717 50%, #0c0c0c 100%);
  border: 1px solid #262626;
  border-radius: 0.2em;
  animation: hb-qs2-lock 0.7s ease both;
  animation-delay: calc(var(--hb-qs2-d) + var(--hb-qs2-t) * 0.88);
}
.hb-qs2-w::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(10, 10, 10, 0.85) 0%, transparent 28%, transparent 72%, rgba(10, 10, 10, 0.85) 100%);
}
.hb-qs2-s {
  display: block;
  transform: translateY(calc(var(--hb-qs2-n) * -1.3em));
  animation: hb-qs2-spin var(--hb-qs2-t) cubic-bezier(0.16, 0.86, 0.3, 1.04) backwards;
  animation-delay: var(--hb-qs2-d);
  will-change: transform;
}
.hb-qs2-g {
  display: grid;
  place-items: center;
  height: 1.3em;
}
.hb-qs2-x {
  display: grid;
  place-items: center;
  width: 0.5em;
  height: 1.3em;
  color: #6b6b6b;
}
@keyframes hb-qs2-spin {
  from { transform: translateY(0); }
  to { transform: translateY(calc(var(--hb-qs2-n) * -1.3em)); }
}
@keyframes hb-qs2-lock {
  0% { border-color: #262626; box-shadow: none; }
  30% { border-color: var(--hb-qs2-c); box-shadow: 0 0 0.7em color-mix(in srgb, var(--hb-qs2-c) 55%, transparent); }
  100% { border-color: #262626; box-shadow: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qs2-w, .hb-qs2-s { animation: none; }
}
`;

export function CodeSlots({
  value = "482916",
  charset = "0123456789",
  duration = 1500,
  stagger = 140,
  size = 44,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: CodeSlotsProps) {
  const chars = Array.from(charset);
  const len = Math.max(1, chars.length);
  const vars = {
    "--hb-qs2-c": accent,
    fontSize: `${size}px`,
    ...style,
  } as React.CSSProperties;

  let reel = 0;
  const cells = Array.from(value).map((ch, i) => {
    const target = chars.indexOf(ch);
    if (target < 0) {
      return (
        <span key={`${i}-x`} className="hb-qs2-x" aria-hidden="true">
          {ch === " " ? " " : ch}
        </span>
      );
    }
    const k = reel++;
    const spins = 1 + (k % 3);
    const extra = (k * 3 + 2) % len;
    const count = spins * len + extra + 1;
    const start = (((target - (count - 1)) % len) + len) % len;
    const glyphs: string[] = [];
    for (let j = 0; j < count; j++) glyphs.push(chars[(start + j) % len]);
    const cellStyle = {
      "--hb-qs2-n": count - 1,
      "--hb-qs2-t": `${Math.max(1, duration)}ms`,
      "--hb-qs2-d": `${(k * stagger).toFixed(0)}ms`,
    } as React.CSSProperties;
    return (
      <span key={`${i}-${ch}-${value}`} className="hb-qs2-w" style={cellStyle} aria-hidden="true">
        <span className="hb-qs2-s">
          {glyphs.map((g, j) => (
            <span key={j} className="hb-qs2-g">
              {g}
            </span>
          ))}
        </span>
      </span>
    );
  });

  return (
    <>
      <style href="hb-micro-code-slots" precedence="default">{css}</style>
      <div
        role="img"
        aria-label={value}
        className={`hb-qs2 ${className}`}
        style={vars}
        {...rest}
      >
        {cells}
      </div>
    </>
  );
}
