"use client";

import * as React from "react";

export interface ProgressRing {
  label: string;
  value: number;
  goal: number;
  unit?: string;
  color?: string;
  color2?: string;
}

export interface ProgressRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rings?: ProgressRing[];
  size?: number;
  thickness?: number;
  colors?: string[];
  showLegend?: boolean;
  animate?: boolean;
}

const PALETTE = ["#fb7185", "#34d399", "#2f7bff", "#fbbf24", "#8b5cf6", "#7fb3ff"];

const DEFAULT_RINGS: ProgressRing[] = [
  { label: "Move", value: 486, goal: 600, unit: "kcal" },
  { label: "Exercise", value: 24, goal: 30, unit: "min" },
  { label: "Stand", value: 9, goal: 12, unit: "h" },
];

const css = `
.hb-prg { display: block; width: 100%; min-width: 0; box-sizing: border-box; container-type: inline-size; color: #ededed; font-family: inherit; }
.hb-prg *, .hb-prg *::before, .hb-prg *::after { box-sizing: border-box; }
.hb-prg-in { display: flex; align-items: center; justify-content: center; gap: 18px; min-width: 0; }
.hb-prg-wrap { position: relative; flex: none; }
.hb-prg-svg { display: block; overflow: visible; }
.hb-prg-track { fill: none; transition: opacity .2s ease; }
.hb-prg-arc {
  fill: none;
  stroke-linecap: round;
  animation: hb-prg-sweep 1.2s cubic-bezier(.22, .8, .24, 1) backwards;
  animation-delay: calc(var(--hb-prg-i, 0) * 160ms);
  transition: opacity .2s ease;
}
.hb-prg-ring[data-dim="true"] .hb-prg-arc,
.hb-prg-ring[data-dim="true"] .hb-prg-track { opacity: .3; }
.hb-prg-ring { cursor: pointer; }
.hb-prg-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hb-prg-list { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1 1 auto; max-width: 240px; margin: 0; padding: 0; list-style: none; }
.hb-prg-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  column-gap: 9px;
  width: 100%;
  padding: 5px 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease, opacity .2s ease;
}
.hb-prg-row[data-on="true"] { background: #1a1a1a; }
.hb-prg-row[data-dim="true"] { opacity: .5; }
.hb-prg-row:focus-visible { outline: 2px solid #7fb3ff; outline-offset: 1px; }
.hb-prg-dot { width: 8px; height: 8px; border-radius: 3px; }
.hb-prg-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; line-height: 1.3; }
.hb-prg-pct {
  grid-column: 3;
  grid-row: 1;
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.hb-prg-fig {
  grid-column: 2 / 4;
  grid-row: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #8f8f8f;
  font-size: 11px;
  line-height: 1.3;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-prg-fig b { color: #ededed; font-weight: 500; }
.hb-prg[data-animate="false"] .hb-prg-arc { animation: none; }
@keyframes hb-prg-sweep {
  from { stroke-dasharray: 0 100; }
}
@container (max-width: 300px) {
  .hb-prg-in { flex-direction: column; gap: 12px; }
  .hb-prg-list { width: 100%; max-width: none; flex: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-prg-arc { animation: none !important; }
  .hb-prg-arc, .hb-prg-track, .hb-prg-row { transition: none !important; }
}
`;

function f(n: number) {
  return n.toFixed(2);
}

function lighten(hex: string, amount: number) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const v = parseInt(m[1], 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  const r = mix((v >> 16) & 255);
  const g = mix((v >> 8) & 255);
  const b = mix(v & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export function ProgressRings({
  rings = DEFAULT_RINGS,
  size = 150,
  thickness = 14,
  colors = PALETTE,
  showLegend = true,
  animate = true,
  className = "",
  children,
  ...rest
}: ProgressRingsProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const [active, setActive] = React.useState<number | null>(null);

  const list = rings.slice(0, 3).map((r, i) => {
    const color = r.color ?? colors[i % colors.length];
    const goal = r.goal > 0 ? r.goal : 1;
    const value = Number.isFinite(r.value) ? Math.max(0, r.value) : 0;
    return { ...r, i, color, color2: r.color2 ?? lighten(color, 0.4), goal, value, frac: Math.min(1, value / goal) };
  });

  const stroke = Math.max(4, Math.min(thickness, size / 8));
  const gap = Math.max(2, Math.round(stroke * 0.3));
  const cx = size / 2;
  const outer = size / 2 - stroke / 2 - 2;

  const summary = list.length
    ? `Progress rings. ${list
        .map((r) => `${r.label} ${nf.format(r.value)} of ${nf.format(r.goal)}${r.unit ? ` ${r.unit}` : ""}, ${Math.round(r.frac * 100)} percent`)
        .join(". ")}.`
    : "Progress rings with no data";

  const innerSize = Math.max(0, (outer - (list.length - 1) * (stroke + gap) - stroke / 2) * 2 - 6);

  return (
    <div className={`hb-prg ${className}`} data-animate={animate ? "true" : "false"} {...rest}>
      <style href="hb-progress-rings" precedence="default">{css}</style>
      <div className="hb-prg-in">
        <div className="hb-prg-wrap" style={{ width: size, height: size }} onMouseLeave={() => setActive(null)}>
          <svg className="hb-prg-svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={summary}>
            <defs>
              {list.map((r) => (
                <linearGradient key={r.i} id={`hb-prg-${uid}-${r.i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={r.color} />
                  <stop offset="100%" stopColor={r.color2} />
                </linearGradient>
              ))}
            </defs>
            <g transform={`rotate(-90 ${f(cx)} ${f(cx)})`}>
              {list.map((r) => {
                const radius = outer - r.i * (stroke + gap);
                return (
                  <g
                    key={r.i}
                    className="hb-prg-ring"
                    data-dim={active !== null && active !== r.i ? "true" : "false"}
                    onMouseEnter={() => setActive(r.i)}
                  >
                    <circle
                      className="hb-prg-track"
                      cx={f(cx)}
                      cy={f(cx)}
                      r={f(radius)}
                      stroke={r.color}
                      strokeOpacity={0.16}
                      strokeWidth={stroke}
                    />
                    {r.frac > 0 ? (
                      <circle
                        className="hb-prg-arc"
                        cx={f(cx)}
                        cy={f(cx)}
                        r={f(radius)}
                        pathLength={100}
                        stroke={`url(#hb-prg-${uid}-${r.i})`}
                        strokeWidth={stroke}
                        strokeDasharray={`${f(r.frac * 100)} 100`}
                        style={{ ["--hb-prg-i" as string]: r.i }}
                      />
                    ) : null}
                  </g>
                );
              })}
            </g>
          </svg>
          {children ? (
            <div className="hb-prg-center">
              <div style={{ maxWidth: innerSize, maxHeight: innerSize }}>{children}</div>
            </div>
          ) : null}
        </div>
        {showLegend ? (
          <ul className="hb-prg-list">
            {list.map((r) => (
              <li
                key={r.i}
                className="hb-prg-row"
                tabIndex={0}
                data-on={active === r.i ? "true" : "false"}
                data-dim={active !== null && active !== r.i ? "true" : "false"}
                onMouseEnter={() => setActive(r.i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(r.i)}
                onBlur={() => setActive(null)}
              >
                <span
                  className="hb-prg-dot"
                  style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color2})` }}
                />
                <span className="hb-prg-name">{r.label}</span>
                <span className="hb-prg-pct">{Math.round((r.value / r.goal) * 100)}%</span>
                <span className="hb-prg-fig">
                  <b>{nf.format(r.value)}</b> / {nf.format(r.goal)}
                  {r.unit ? ` ${r.unit}` : ""}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
