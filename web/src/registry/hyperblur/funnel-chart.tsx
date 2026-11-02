"use client";

import * as React from "react";

export interface FunnelStage {
  label: string;
  value: number;
  color?: string;
}

export interface FunnelChartProps extends React.HTMLAttributes<HTMLDivElement> {
  stages?: FunnelStage[];
  colors?: string[];
  stageHeight?: number;
  valueFormatter?: (n: number) => string;
  animate?: boolean;
}

const RAMP = ["#2f7bff", "#4d86ff", "#6a8ffa", "#8b8cf6", "#8b5cf6", "#34d399"];

const DEFAULT_STAGES: FunnelStage[] = [
  { label: "Visitors", value: 48200 },
  { label: "Sign-ups", value: 14600 },
  { label: "Activated", value: 8900 },
  { label: "Trial", value: 3400 },
  { label: "Paid", value: 1260 },
];

const css = `
.hb-fnl { position: relative; display: block; width: 100%; min-width: 0; box-sizing: border-box; color: #ededed; font-family: inherit; }
.hb-fnl *, .hb-fnl *::before, .hb-fnl *::after { box-sizing: border-box; }
.hb-fnl-plot { position: relative; width: 100%; max-width: 560px; margin: 0 auto; }
.hb-fnl-svg { display: block; width: 100%; height: auto; overflow: visible; }
.hb-fnl-stage {
  cursor: default;
  outline: none;
  animation: hb-fnl-in .6s cubic-bezier(.22, .8, .24, 1) backwards;
  animation-delay: calc(var(--hb-fnl-i, 0) * 90ms);
  transition: opacity .2s ease;
}
.hb-fnl-stage[data-dim="true"] { opacity: .35; }
.hb-fnl-shape { transition: filter .2s ease; }
.hb-fnl-stage[data-on="true"] .hb-fnl-shape { filter: brightness(1.18); }
.hb-fnl-stage:focus-visible .hb-fnl-shape { stroke: #ededed; stroke-width: 1.5; }
.hb-fnl-name { fill: #ededed; font-size: 11.5px; font-family: inherit; }
.hb-fnl-val {
  fill: #8f8f8f;
  font-size: 10.5px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-fnl-pct {
  fill: #ffffff;
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-fnl-drop {
  fill: #fb7185;
  font-size: 10.5px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-fnl-tip {
  position: absolute;
  z-index: 2;
  min-width: 120px;
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
.hb-fnl-tip-h { color: #ededed; font-weight: 600; }
.hb-fnl-tip-r { display: flex; justify-content: space-between; gap: 14px; color: #8f8f8f; }
.hb-fnl-tip-r b {
  color: #ededed;
  font-weight: 500;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-fnl-tip-r b[data-down="true"] { color: #fb7185; }
.hb-fnl[data-animate="false"] .hb-fnl-stage { animation: none; }
@keyframes hb-fnl-in {
  from { opacity: 0; transform: scaleX(.2); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-fnl-stage { animation: none !important; }
  .hb-fnl-stage, .hb-fnl-shape { transition: none !important; }
}
`;

function f(n: number) {
  return n.toFixed(2);
}

export function FunnelChart({
  stages = DEFAULT_STAGES,
  colors = RAMP,
  stageHeight = 34,
  valueFormatter,
  animate = true,
  className = "",
  ...rest
}: FunnelChartProps) {
  const [active, setActive] = React.useState<number | null>(null);

  const fmt = React.useMemo(() => {
    if (valueFormatter) return valueFormatter;
    const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
    return (n: number) => nf.format(n);
  }, [valueFormatter]);

  const W = 320;
  const labelW = 88;
  const dropW = 46;
  const funnelX = labelW + 6;
  const maxW = W - funnelX - dropW;
  const cx = funnelX + maxW / 2;
  const gapY = 3;
  const rh = Math.max(18, stageHeight);
  const n = stages.length;
  const H = Math.max(1, n) * rh;
  const first = stages[0]?.value > 0 ? stages[0].value : 1;

  const widths = stages.map((s) => Math.max(0.16, Math.min(1, (Number.isFinite(s.value) ? s.value : 0) / first)) * maxW);
  const rows = stages.map((s, i) => {
    const prev = i > 0 ? stages[i - 1].value : 0;
    const top = widths[i];
    const bottom = i < n - 1 ? widths[i + 1] : top * 0.78;
    const y0 = i * rh;
    const y1 = y0 + rh - gapY;
    const share = s.value / first;
    const drop = i > 0 && prev > 0 ? 1 - s.value / prev : null;
    return { ...s, i, top, bottom, y0, y1, share, drop, color: s.color ?? colors[i % colors.length] };
  });

  const pct = (x: number) => `${(Math.round(x * 1000) / 10).toFixed(x * 100 >= 10 ? 0 : 1)}%`;
  const summary = n
    ? `Funnel chart with ${n} stages. ${rows
        .map((r) => `${r.label} ${fmt(r.value)}, ${pct(r.share)} of ${stages[0].label}`)
        .join(". ")}.`
    : "Funnel chart with no data";

  const act = active === null ? null : rows[active];
  let tip: React.ReactNode = null;
  if (act) {
    const below = act.i < 2;
    tip = (
      <div
        className="hb-fnl-tip"
        aria-hidden="true"
        style={{
          left: `${((cx / W) * 100).toFixed(2)}%`,
          top: `${(((below ? act.y1 : act.y0) / H) * 100).toFixed(2)}%`,
          transform: below ? "translate(-50%, 6px)" : "translate(-50%, calc(-100% - 6px))",
        }}
      >
        <div className="hb-fnl-tip-h">{act.label}</div>
        <div className="hb-fnl-tip-r">
          Count <b>{fmt(act.value)}</b>
        </div>
        <div className="hb-fnl-tip-r">
          Of first stage <b>{pct(act.share)}</b>
        </div>
        {act.drop !== null ? (
          <div className="hb-fnl-tip-r">
            Drop-off <b data-down="true">{`-${pct(Math.max(0, act.drop))}`}</b>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`hb-fnl ${className}`} data-animate={animate ? "true" : "false"} {...rest}>
      <style href="hb-funnel-chart" precedence="default">{css}</style>
      <div className="hb-fnl-plot" onMouseLeave={() => setActive(null)}>
        <svg className="hb-fnl-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary}>
          {rows.map((r) => {
            const midY = (r.y0 + r.y1) / 2;
            const pts = [
              [cx - r.top / 2, r.y0],
              [cx + r.top / 2, r.y0],
              [cx + r.bottom / 2, r.y1],
              [cx - r.bottom / 2, r.y1],
            ]
              .map(([x, y]) => `${f(x)},${f(y)}`)
              .join(" ");
            const aria = `${r.label}: ${fmt(r.value)}, ${pct(r.share)} of first stage${
              r.drop !== null ? `, down ${pct(Math.max(0, r.drop))} from previous stage` : ""
            }`;
            return (
              <g
                key={r.i}
                className="hb-fnl-stage"
                data-on={active === r.i ? "true" : "false"}
                data-dim={active !== null && active !== r.i ? "true" : "false"}
                tabIndex={0}
                aria-label={aria}
                style={{
                  transformOrigin: `${f(cx)}px ${f(midY)}px`,
                  ["--hb-fnl-i" as string]: r.i,
                }}
                onMouseEnter={() => setActive(r.i)}
                onFocus={() => setActive(r.i)}
                onBlur={() => setActive(null)}
              >
                <rect x={0} y={r.y0} width={W} height={rh - gapY} fill="transparent" />
                <text className="hb-fnl-name" x={0} y={f(midY - 2)} dominantBaseline="auto">
                  {r.label}
                </text>
                <text className="hb-fnl-val" x={0} y={f(midY + 9)} dominantBaseline="auto">
                  {fmt(r.value)}
                </text>
                <polygon className="hb-fnl-shape" points={pts} fill={r.color} />
                <text className="hb-fnl-pct" x={f(cx)} y={f(midY)} textAnchor="middle" dominantBaseline="middle">
                  {pct(r.share)}
                </text>
                {r.drop !== null ? (
                  <text className="hb-fnl-drop" x={W} y={f(midY)} textAnchor="end" dominantBaseline="middle">
                    {`-${pct(Math.max(0, r.drop))}`}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
        {tip}
      </div>
    </div>
  );
}
