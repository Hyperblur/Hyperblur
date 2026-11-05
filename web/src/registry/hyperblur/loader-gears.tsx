"use client";

import * as React from "react";

export interface LoaderGearsProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  label?: string;
}

interface GearSpec {
  n: number;
  cx: number;
  cy: number;
  off: number;
}

const K = Math.PI / 180;

function mesh(a: GearSpec, nb: number, theta: number): number {
  const rb = nb * 2;
  const xa = a.n * 2 * (a.off - theta) * K;
  const raw = theta + 180 - (xa + 2 * Math.PI) / (rb * K);
  const pitch = 360 / nb;
  return ((raw % pitch) + pitch) % pitch;
}

const BIG: GearSpec = { n: 12, cx: 32, cy: 50, off: 0 };

function place(theta: number, n: number): GearSpec {
  return {
    n,
    cx: BIG.cx + 40 * Math.cos(theta * K),
    cy: BIG.cy + 40 * Math.sin(theta * K),
    off: mesh(BIG, n, theta),
  };
}

function gearPath(g: GearSpec): string {
  const r = g.n * 2;
  const root = r - 2.6;
  const tip = r + 2.4;
  const pitch = 360 / g.n;
  const pt = (rad: number, deg: number) =>
    `${(g.cx + rad * Math.cos(deg * K)).toFixed(2)} ${(g.cy + rad * Math.sin(deg * K)).toFixed(2)}`;
  const arc = `A ${root.toFixed(2)} ${root.toFixed(2)} 0 0 1`;
  let d = "";
  for (let i = 0; i < g.n; i++) {
    const c = g.off + i * pitch;
    d += `${i === 0 ? "M" : arc} ${pt(root, c - pitch * 0.27)} `;
    d += `L ${pt(tip, c - pitch * 0.15)} L ${pt(tip, c + pitch * 0.15)} L ${pt(root, c + pitch * 0.27)} `;
  }
  d += `${arc} ${pt(root, g.off - pitch * 0.27)} Z `;
  const hr = r * 0.3;
  d += `M ${(g.cx - hr).toFixed(2)} ${g.cy.toFixed(2)} a ${hr.toFixed(2)} ${hr.toFixed(2)} 0 1 0 ${(hr * 2).toFixed(2)} 0 a ${hr.toFixed(2)} ${hr.toFixed(2)} 0 1 0 ${(-hr * 2).toFixed(2)} 0 Z`;
  return d;
}

const GEARS = [
  { spec: BIG, tone: 0, reverse: false },
  { spec: place(-35, 8), tone: 1, reverse: true },
  { spec: place(40, 8), tone: 0, reverse: true },
].map((g) => ({ ...g, d: gearPath(g.spec) }));

const css = `
.hb-yb1 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  vertical-align: middle;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-yb1 *, .hb-yb1 *::before, .hb-yb1 *::after { box-sizing: border-box; }
.hb-yb1-svg {
  display: block;
  flex: none;
  width: var(--hb-yb1-s);
  height: var(--hb-yb1-s);
  overflow: visible;
}
.hb-yb1-g {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: hb-yb1-turn var(--hb-yb1-d) linear infinite;
}
.hb-yb1-g[data-rev] { animation-direction: reverse; }
.hb-yb1-l {
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.01em;
  color: inherit;
  opacity: 0.72;
  white-space: nowrap;
}
.hb-yb1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@keyframes hb-yb1-turn {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yb1-g { animation: none; }
}
`;

export function LoaderGears({
  size = 56,
  color = "#2f7bff",
  accent = "#7fb3ff",
  speed = 3,
  label,
  className = "",
  style,
  ...rest
}: LoaderGearsProps) {
  const base = speed > 0 ? speed : 3;
  const vars = { "--hb-yb1-s": `${size}px`, ...style } as React.CSSProperties;

  return (
    <span role="status" className={`hb-yb1 ${className}`} style={vars} {...rest}>
      <style href="hb-loader-gears" precedence="default">{css}</style>
      <svg className="hb-yb1-svg" viewBox="-3 4 94 94" aria-hidden="true" focusable="false">
        {GEARS.map((g, i) => (
          <path
            key={i}
            className="hb-yb1-g"
            d={g.d}
            fill={g.tone === 0 ? color : accent}
            fillRule="evenodd"
            data-rev={g.reverse ? "" : undefined}
            style={{ "--hb-yb1-d": `${((base * g.spec.n) / 12).toFixed(3)}s` } as React.CSSProperties}
          />
        ))}
      </svg>
      <span className={label ? "hb-yb1-l" : "hb-yb1-sr"}>{label ?? "Loading"}</span>
    </span>
  );
}
