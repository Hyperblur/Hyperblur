"use client";

import * as React from "react";

export interface RadarSeries {
  name: string;
  values: number[];
  color?: string;
}

export interface RadarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  axes?: string[];
  series?: RadarSeries[];
  max?: number;
  rings?: number;
  colors?: string[];
  height?: number;
  legend?: "bottom" | "right" | "none";
  valueFormatter?: (n: number) => string;
  animate?: boolean;
}

const PALETTE = ["#2f7bff", "#8b5cf6", "#34d399", "#fbbf24", "#fb7185", "#7fb3ff"];

const DEFAULT_AXES = ["Speed", "Power", "Range", "Defense", "Agility", "Focus"];

const DEFAULT_SERIES: RadarSeries[] = [
  { name: "Current", values: [82, 64, 71, 58, 90, 76] },
  { name: "Previous", values: [68, 72, 54, 63, 70, 61] },
];

const css = `
.hb-rdr { display: flex; flex-direction: column; gap: 8px; width: 100%; min-width: 0; box-sizing: border-box; color: #ededed; font-family: inherit; }
.hb-rdr *, .hb-rdr *::before, .hb-rdr *::after { box-sizing: border-box; }
.hb-rdr[data-legend="right"] { flex-direction: row; align-items: center; gap: 10px; }
.hb-rdr-plot { position: relative; flex: 1 1 auto; min-width: 0; width: 100%; max-width: 420px; margin: 0 auto; touch-action: pan-y; }
.hb-rdr-svg { display: block; width: 100%; height: auto; overflow: visible; }
.hb-rdr-ring { fill: none; stroke: #262626; stroke-width: 1; }
.hb-rdr-ring[data-last="true"] { stroke: #333333; }
.hb-rdr-axis { stroke: #262626; stroke-width: 1; }
.hb-rdr-label { fill: #a1a1a1; font-size: 10.5px; font-family: inherit; transition: fill .2s ease; }
.hb-rdr-label[data-on="true"] { fill: #ededed; }
.hb-rdr-poly {
  animation: hb-rdr-grow .85s cubic-bezier(.22, .8, .24, 1) backwards;
  animation-delay: var(--hb-rdr-d, 0ms);
  transition: opacity .25s ease;
}
.hb-rdr-poly[data-dim="true"] { opacity: .28; }
.hb-rdr-poly[data-off="true"] { opacity: 0; pointer-events: none; }
.hb-rdr-shape { stroke-width: 1.75; stroke-linejoin: round; transition: fill-opacity .25s ease, stroke-width .2s ease; }
.hb-rdr-dots {
  animation: hb-rdr-fade .4s ease backwards;
  animation-delay: calc(var(--hb-rdr-d, 0ms) + 600ms);
  transition: opacity .25s ease;
}
.hb-rdr-dots[data-dim="true"] { opacity: .28; }
.hb-rdr-dots[data-off="true"] { opacity: 0; pointer-events: none; }
.hb-rdr-hit { fill: transparent; outline: none; cursor: pointer; }
.hb-rdr-hit:focus-visible { stroke: #7fb3ff; stroke-width: 1.5; }
.hb-rdr-tip {
  position: absolute;
  z-index: 2;
  min-width: 92px;
  padding: 6px 9px;
  border-radius: 8px;
  border: 1px solid #262626;
  background: #171717;
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, .8);
  font-size: 11px;
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
}
.hb-rdr-tip-r { display: flex; align-items: center; gap: 6px; color: #ededed; }
.hb-rdr-tip-d { width: 6px; height: 6px; border-radius: 2px; flex: none; }
.hb-rdr-tip-l { color: #8f8f8f; }
.hb-rdr-tip-v {
  margin-left: auto;
  padding-left: 10px;
  color: #ededed;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-rdr-legend { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; margin: 0; padding: 0; list-style: none; }
.hb-rdr[data-legend="right"] .hb-rdr-legend { flex: none; flex-direction: column; flex-wrap: nowrap; align-items: stretch; justify-content: center; }
.hb-rdr-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 9px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 11.5px;
  line-height: 1.3;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease, border-color .15s ease;
}
.hb-rdr-btn:hover { background: #1a1a1a; }
.hb-rdr-btn:focus-visible { outline: 2px solid #7fb3ff; outline-offset: 1px; }
.hb-rdr-btn[aria-pressed="false"] { color: #6b6b6b; }
.hb-rdr-btn[aria-pressed="false"] .hb-rdr-name { text-decoration: line-through; }
.hb-rdr-swatch { width: 8px; height: 8px; border-radius: 3px; flex: none; transition: opacity .2s ease; }
.hb-rdr-btn[aria-pressed="false"] .hb-rdr-swatch { opacity: .35; }
.hb-rdr-name { white-space: nowrap; }
.hb-rdr[data-animate="false"] .hb-rdr-poly, .hb-rdr[data-animate="false"] .hb-rdr-dots { animation: none; }
@keyframes hb-rdr-grow {
  from { transform: scale(.05); opacity: 0; }
}
@keyframes hb-rdr-fade {
  from { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-rdr-poly, .hb-rdr-dots { animation: none !important; }
  .hb-rdr-poly, .hb-rdr-dots, .hb-rdr-shape, .hb-rdr-label, .hb-rdr-btn { transition: none !important; }
}
`;

function f(n: number) {
  return n.toFixed(2);
}

function niceMax(raw: number) {
  if (!(raw > 0)) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const half = mag / 2;
  return Math.ceil(raw / half) * half;
}

export function RadarChart({
  axes = DEFAULT_AXES,
  series = DEFAULT_SERIES,
  max,
  rings = 4,
  colors = PALETTE,
  height = 200,
  legend = "bottom",
  valueFormatter,
  animate = true,
  className = "",
  ...rest
}: RadarChartProps) {
  const [hidden, setHidden] = React.useState<number[]>([]);
  const [active, setActive] = React.useState<{ s: number; i: number } | null>(null);
  const [hoverSeries, setHoverSeries] = React.useState<number | null>(null);

  const n = axes.length;
  const W = 260;
  const H = Math.max(120, height);
  const cx = W / 2;
  const cy = H / 2;
  const R = Math.max(24, Math.min(W / 2 - 58, H / 2 - 20));
  const items = series.map((s, si) => ({ ...s, si, color: s.color ?? colors[si % colors.length] }));
  const peak = Math.max(0, ...items.flatMap((s) => s.values.filter((v) => Number.isFinite(v))));
  const top = max ?? niceMax(peak);
  const ringCount = Math.max(1, Math.round(rings));
  const fmt = valueFormatter ?? ((v: number) => String(Math.round(v * 10) / 10));

  const angle = (i: number) => -Math.PI / 2 + (i / Math.max(1, n)) * Math.PI * 2;
  const point = (i: number, frac: number): [number, number] => [
    cx + R * frac * Math.cos(angle(i)),
    cy + R * frac * Math.sin(angle(i)),
  ];
  const frac = (v: number | undefined) => (Number.isFinite(v) ? Math.min(1, Math.max(0, (v as number) / top)) : 0);
  const polyPoints = (s: RadarSeries) =>
    axes
      .map((_, i) => {
        const [x, y] = point(i, frac(s.values[i]));
        return `${f(x)},${f(y)}`;
      })
      .join(" ");

  const toggle = (si: number) =>
    setHidden((h) => (h.includes(si) ? h.filter((x) => x !== si) : [...h, si]));

  const focusSeries = active ? active.s : hoverSeries;
  const summary = items.length
    ? `Radar chart across ${n} axes. ${items
        .map((s) => {
          let best = 0;
          axes.forEach((_, i) => {
            if ((s.values[i] ?? 0) > (s.values[best] ?? 0)) best = i;
          });
          return `${s.name} peaks at ${axes[best]}, ${fmt(s.values[best] ?? 0)}`;
        })
        .join(". ")}.`
    : "Radar chart with no data";

  const tipItem = active ? items.find((s) => s.si === active.s) : undefined;
  let tip: React.ReactNode = null;
  if (active && tipItem) {
    const [px, py] = point(active.i, frac(tipItem.values[active.i]));
    const below = py < H * 0.28;
    tip = (
      <div
        className="hb-rdr-tip"
        aria-hidden="true"
        style={{
          left: `${Math.min(84, Math.max(16, (px / W) * 100)).toFixed(2)}%`,
          top: `${((py / H) * 100).toFixed(2)}%`,
          transform: below ? "translate(-50%, 14px)" : "translate(-50%, calc(-100% - 12px))",
        }}
      >
        <div className="hb-rdr-tip-r">
          <span className="hb-rdr-tip-d" style={{ background: tipItem.color }} />
          {tipItem.name}
        </div>
        <div className="hb-rdr-tip-r">
          <span className="hb-rdr-tip-l">{axes[active.i]}</span>
          <span className="hb-rdr-tip-v">{fmt(tipItem.values[active.i] ?? 0)}</span>
        </div>
      </div>
    );
  }

  const legendEl =
    legend === "none" ? null : (
      <ul className="hb-rdr-legend">
        {items.map((s) => {
          const on = !hidden.includes(s.si);
          return (
            <li key={s.si}>
              <button
                type="button"
                className="hb-rdr-btn"
                aria-pressed={on}
                onClick={() => toggle(s.si)}
                onMouseEnter={() => setHoverSeries(s.si)}
                onMouseLeave={() => setHoverSeries(null)}
                onFocus={() => setHoverSeries(s.si)}
                onBlur={() => setHoverSeries(null)}
              >
                <span className="hb-rdr-swatch" style={{ background: s.color }} />
                <span className="hb-rdr-name">{s.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    );

  return (
    <div
      className={`hb-rdr ${className}`}
      data-legend={legend}
      data-animate={animate ? "true" : "false"}
      {...rest}
    >
      <style href="hb-radar-chart" precedence="default">{css}</style>
      <div className="hb-rdr-plot" onMouseLeave={() => setActive(null)}>
        <svg className="hb-rdr-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary}>
          {Array.from({ length: ringCount }, (_, k) => {
            const pts = axes
              .map((_, i) => {
                const [x, y] = point(i, (k + 1) / ringCount);
                return `${f(x)},${f(y)}`;
              })
              .join(" ");
            return <polygon key={k} className="hb-rdr-ring" data-last={k === ringCount - 1 ? "true" : "false"} points={pts} />;
          })}
          {axes.map((_, i) => {
            const [x, y] = point(i, 1);
            return <line key={i} className="hb-rdr-axis" x1={f(cx)} y1={f(cy)} x2={f(x)} y2={f(y)} />;
          })}
          {axes.map((label, i) => {
            const c = Math.cos(angle(i));
            const s = Math.sin(angle(i));
            const lx = cx + (R + 11) * c;
            const ly = cy + (R + 11) * s;
            return (
              <text
                key={i}
                className="hb-rdr-label"
                data-on={active && active.i === i ? "true" : "false"}
                x={f(lx)}
                y={f(ly)}
                textAnchor={c > 0.3 ? "start" : c < -0.3 ? "end" : "middle"}
                dominantBaseline={s < -0.5 ? "auto" : s > 0.5 ? "hanging" : "middle"}
              >
                {label}
              </text>
            );
          })}
          {items.map((s) => {
            const off = hidden.includes(s.si);
            const dim = focusSeries !== null && focusSeries !== s.si;
            return (
              <g
                key={s.si}
                className="hb-rdr-poly"
                data-off={off ? "true" : "false"}
                data-dim={dim ? "true" : "false"}
                style={{
                  transformOrigin: `${f(cx)}px ${f(cy)}px`,
                  ["--hb-rdr-d" as string]: `${s.si * 140}ms`,
                }}
              >
                <polygon
                  className="hb-rdr-shape"
                  points={polyPoints(s)}
                  fill={s.color}
                  fillOpacity={focusSeries === s.si ? 0.28 : 0.15}
                  stroke={s.color}
                />
              </g>
            );
          })}
          {items.map((s) => {
            const off = hidden.includes(s.si);
            const dim = focusSeries !== null && focusSeries !== s.si;
            return (
              <g
                key={s.si}
                className="hb-rdr-dots"
                data-off={off ? "true" : "false"}
                data-dim={dim ? "true" : "false"}
                style={{ ["--hb-rdr-d" as string]: `${s.si * 140}ms` }}
              >
                {axes.map((label, i) => {
                  const [x, y] = point(i, frac(s.values[i]));
                  const on = active && active.s === s.si && active.i === i;
                  return (
                    <g key={i}>
                      <circle cx={f(x)} cy={f(y)} r={on ? 4.5 : 3} fill="#0a0a0a" stroke={s.color} strokeWidth={1.75} />
                      <circle
                        className="hb-rdr-hit"
                        cx={f(x)}
                        cy={f(y)}
                        r={9}
                        tabIndex={off ? -1 : 0}
                        aria-label={`${s.name}, ${label}: ${fmt(s.values[i] ?? 0)}`}
                        onMouseEnter={() => setActive({ s: s.si, i })}
                        onFocus={() => setActive({ s: s.si, i })}
                        onBlur={() => setActive(null)}
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
        {tip}
      </div>
      {legendEl}
    </div>
  );
}
