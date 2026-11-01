"use client";

import * as React from "react";

export interface DonutDatum {
  label: string;
  value: number;
  color?: string;
}

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DonutDatum[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  showLegend?: boolean;
  locale?: string;
  animate?: boolean;
}

const PALETTE = ["#2f7bff", "#22c55e", "#f5b301", "#a78bfa", "#ef4444", "#14b8a6", "#ec4899"];

const css = `
.hb-dn { display: flex; align-items: center; gap: 20px; min-width: 0; color: #ededed; }
.hb-dn-ring { position: relative; flex: none; }
.hb-dn-svg { display: block; overflow: visible; }
.hb-dn-track { fill: none; stroke: #1c1c1c; }
.hb-dn-seg {
  fill: none;
  transition: stroke-dasharray var(--hb-dn-t, .6s) cubic-bezier(.3, .6, .3, 1) var(--hb-dn-d, 0s), stroke-width .2s ease, opacity .2s ease;
}
.hb-dn-seg[data-dim="true"] { opacity: .35; }
.hb-dn-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0 14%;
  text-align: center;
  pointer-events: none;
}
.hb-dn-big {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif);
  font-weight: 600;
  letter-spacing: -.02em;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}
.hb-dn-small {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  line-height: 1.2;
  color: #8f8f8f;
}
.hb-dn-legend { display: flex; flex-direction: column; gap: 2px; min-width: 0; margin: 0; padding: 0; list-style: none; }
.hb-dn-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 6px;
  margin: 0 -6px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.3;
  transition: background-color .15s ease, opacity .2s ease;
}
.hb-dn-item[data-on="true"] { background: #1c1c1c; }
.hb-dn-item[data-dim="true"] { opacity: .5; }
.hb-dn-dot { width: 8px; height: 8px; border-radius: 3px; flex: none; }
.hb-dn-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #ededed; }
.hb-dn-pct {
  margin-left: auto;
  padding-left: 12px;
  color: #8f8f8f;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-dn-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
@media (prefers-reduced-motion: reduce) {
  .hb-dn-seg, .hb-dn-item { transition: none !important; }
}
`;

function useReady(animate: boolean) {
  const [ready, setReady] = React.useState(!animate);
  React.useEffect(() => {
    if (!animate) return;
    let a = 0;
    let b = 0;
    a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, [animate]);
  return animate ? ready : true;
}

export function DonutChart({
  data,
  size = 180,
  thickness = 22,
  centerLabel,
  showLegend = true,
  locale = "en-US",
  animate = true,
  className = "",
  ...rest
}: DonutChartProps) {
  const ready = useReady(animate);
  const [active, setActive] = React.useState<number | null>(null);

  const items = data
    .map((d, i) => ({ ...d, color: d.color ?? PALETTE[i % PALETTE.length], idx: i }))
    .filter((d) => Number.isFinite(d.value) && d.value > 0);
  const total = items.reduce((s, d) => s + d.value, 0);

  const nf = React.useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }),
    [locale]
  );
  const full = React.useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }),
    [locale]
  );
  const pf = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 }),
    [locale]
  );

  const grow = 4;
  const stroke = Math.max(2, Math.min(thickness, size / 2 - 4));
  const radius = Math.max(1, (size - stroke) / 2 - grow / 2);
  const C = 2 * Math.PI * radius;
  const gap = items.length > 1 ? Math.min(4, stroke * 0.3) : 0;
  const cx = size / 2;

  const segs = items.map((d, i) => ({
    ...d,
    frac: d.value / total,
    start: items.slice(0, i).reduce((s, x) => s + x.value, 0) / total,
  }));

  const act = active === null ? null : (segs.find((s) => s.idx === active) ?? null);
  const bigText = act ? pf.format(act.frac) : (centerLabel ?? nf.format(total));
  const smallText = act ? act.label : centerLabel ? "" : "Total";
  const bigSize = Math.max(12, Math.round(size * 0.17));

  const label = segs.length
    ? `Donut chart of ${segs.length} segments, total ${full.format(total)}. ${segs
        .map((s) => `${s.label} ${pf.format(s.frac)}`)
        .join(", ")}.`
    : "Donut chart with no data";

  return (
    <div className={`hb-dn ${className}`} {...rest}>
      <style href="hb-donut-chart" precedence="default">{css}</style>
      <div className="hb-dn-ring" style={{ width: size, height: size }}>
        <svg
          className="hb-dn-svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={label}
          onMouseLeave={() => setActive(null)}
        >
          <circle className="hb-dn-track" cx={cx} cy={cx} r={radius} strokeWidth={stroke} />
          <g transform={`rotate(-90 ${cx} ${cx})`}>
            {segs.map((s) => {
              const len = Math.max(0.001, s.frac * C - gap);
              const on = active === s.idx;
              return (
                <circle
                  key={s.idx}
                  className="hb-dn-seg"
                  data-dim={active !== null && !on ? "true" : "false"}
                  cx={cx}
                  cy={cx}
                  r={radius}
                  stroke={s.color}
                  strokeWidth={on ? stroke + grow : stroke}
                  strokeDasharray={ready ? `${r2(len)} ${r2(C)}` : `0 ${r2(C)}`}
                  strokeDashoffset={-r2(s.start * C + gap / 2)}
                  style={{
                    ["--hb-dn-t" as string]: `${Math.max(0.15, s.frac * 1.1)}s`,
                    ["--hb-dn-d" as string]: `${r2(s.start * 1.1)}s`,
                  }}
                  onMouseEnter={() => setActive(s.idx)}
                />
              );
            })}
          </g>
        </svg>
        <div className="hb-dn-center" aria-hidden="true">
          <div className="hb-dn-big" style={{ fontSize: centerLabel && !act ? Math.max(11, bigSize - 2) : bigSize }}>
            {bigText}
          </div>
          {smallText ? <div className="hb-dn-small">{smallText}</div> : null}
        </div>
      </div>
      {showLegend ? (
        <ul className="hb-dn-legend">
          {segs.map((s) => (
            <li
              key={s.idx}
              className="hb-dn-item"
              data-on={active === s.idx ? "true" : "false"}
              data-dim={active !== null && active !== s.idx ? "true" : "false"}
              onMouseEnter={() => setActive(s.idx)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="hb-dn-dot" style={{ background: s.color }} />
              <span className="hb-dn-name">{s.label}</span>
              <span className="hb-dn-pct">{pf.format(s.frac)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="hb-dn-sr">
          {segs.map((s) => (
            <li key={s.idx}>
              {s.label}: {full.format(s.value)} ({pf.format(s.frac)})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function r2(n: number) {
  return Math.round(n * 100) / 100;
}
