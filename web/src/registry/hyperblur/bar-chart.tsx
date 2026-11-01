"use client";

import * as React from "react";

export interface BarChartDatum {
  label: string;
  value: number;
  value2?: number;
}

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BarChartDatum[];
  color?: string;
  color2?: string;
  height?: number;
  showGrid?: boolean;
  valueFormatter?: (n: number) => string;
  locale?: string;
  animate?: boolean;
  seriesLabels?: [string, string];
}

const css = `
.hb-bar { position: relative; display: block; width: 100%; min-width: 0; color: #ededed; }
.hb-bar-svg { display: block; width: 100%; overflow: visible; }
.hb-bar-grid { stroke: #262626; stroke-width: 1; stroke-dasharray: 3 5; }
.hb-bar-base { stroke: #262626; stroke-width: 1; }
.hb-bar-tick {
  fill: #8f8f8f;
  font-size: 11px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-bar-xl { fill: #8f8f8f; font-size: 11px; font-family: inherit; transition: fill .2s ease; }
.hb-bar-xl[data-on="true"] { fill: #ededed; }
.hb-bar-b {
  transform: scaleY(1);
  transition: transform .8s cubic-bezier(.22, .8, .24, 1) var(--hb-bar-d, 0ms), opacity .2s ease;
}
.hb-bar[data-ready="false"] .hb-bar-b { transform: scaleY(0); }
.hb-bar-b[data-dim="true"] { opacity: .4; }
.hb-bar-tip {
  position: absolute;
  z-index: 2;
  min-width: 64px;
  padding: 6px 9px;
  border-radius: 8px;
  border: 1px solid #262626;
  background: #171717;
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, .8);
  font-size: 11px;
  line-height: 1.35;
  white-space: nowrap;
  pointer-events: none;
  transform: translate(-50%, -100%);
  transition: left .12s ease, top .12s ease, opacity .12s ease;
}
.hb-bar-tip-l { color: #8f8f8f; }
.hb-bar-tip-r { display: flex; align-items: center; gap: 6px; }
.hb-bar-tip-d { width: 6px; height: 6px; border-radius: 2px; flex: none; }
.hb-bar-tip-v {
  margin-left: auto;
  padding-left: 8px;
  color: #ededed;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-bar-sr {
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
  .hb-bar-b, .hb-bar-xl, .hb-bar-tip { transition: none !important; }
  .hb-bar[data-ready="false"] .hb-bar-b { transform: scaleY(1) !important; }
}
`;

function useWidth(fallback: number) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(fallback);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width);
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

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

function pos(n: number) {
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

function niceStep(raw: number) {
  if (!(raw > 0)) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / exp;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * exp;
}

function topRound(x: number, y: number, w: number, h: number, rad: number) {
  const k = Math.max(0, Math.min(rad, w / 2, h));
  const f = (n: number) => Math.round(n * 100) / 100;
  if (k === 0) return `M${f(x)},${f(y + h)}V${f(y)}H${f(x + w)}V${f(y + h)}Z`;
  return `M${f(x)},${f(y + h)}V${f(y + k)}Q${f(x)},${f(y)} ${f(x + k)},${f(y)}H${f(x + w - k)}Q${f(x + w)},${f(y)} ${f(x + w)},${f(y + k)}V${f(y + h)}Z`;
}

export function BarChart({
  data,
  color = "#2f7bff",
  color2 = "#6b7a99",
  height = 200,
  showGrid = true,
  valueFormatter,
  locale = "en-US",
  animate = true,
  seriesLabels = ["Value", "Other"],
  className = "",
  ...rest
}: BarChartProps) {
  const [ref, width] = useWidth(320);
  const ready = useReady(animate);
  const [active, setActive] = React.useState<number | null>(null);

  const compact = React.useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }),
    [locale]
  );
  const full = React.useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }),
    [locale]
  );
  const axisFmt = (n: number) => (valueFormatter ? valueFormatter(n) : compact.format(n));
  const tipFmt = (n: number) => (valueFormatter ? valueFormatter(n) : full.format(n));

  const stacked = data.some((d) => pos(d.value2 ?? 0) > 0);
  const totals = data.map((d) => pos(d.value) + pos(d.value2 ?? 0));
  const peak = totals.length ? Math.max(...totals) : 0;
  const step = niceStep(peak / 4);
  const top = Math.max(step * 4, step);
  const ticks = [0, 1, 2, 3, 4].map((i) => (top / 4) * i);

  const padL = Math.max(28, ...ticks.map((t) => axisFmt(t).length * 6.4 + 10));
  const padR = 6;
  const padT = 10;
  const padB = 24;
  const innerW = Math.max(1, width - padL - padR);
  const innerH = Math.max(1, height - padT - padB);
  const yOf = (v: number) => padT + innerH - (v / top) * innerH;
  const n = Math.max(1, data.length);
  const slot = innerW / n;
  const barW = Math.max(4, Math.min(slot * 0.6, 44));
  const every = Math.max(1, Math.ceil(34 / slot));

  const peakIdx = totals.indexOf(peak);
  const label = data.length
    ? `Bar chart with ${data.length} bars${stacked ? " in two series" : ""}. Highest: ${data[peakIdx].label}, ${tipFmt(peak)}.`
    : "Bar chart with no data";

  const tipX = active === null ? 0 : Math.min(Math.max(padL + slot * (active + 0.5), 52), width - 52);
  const tipY = active === null ? 0 : Math.max(yOf(totals[active]) - 8, stacked ? 56 : 44);
  const act = active === null ? null : data[active];

  return (
    <div
      ref={ref}
      className={`hb-bar ${className}`}
      data-ready={ready ? "true" : "false"}
      style={{ height }}
      onMouseLeave={() => setActive(null)}
      {...rest}
    >
      <style href="hb-bar-chart" precedence="default">{css}</style>
      <svg
        className="hb-bar-svg"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={label}
      >
        {ticks.map((t, i) => (
          <g key={i}>
            {showGrid || i === 0 ? (
              <line
                className={i === 0 ? "hb-bar-base" : "hb-bar-grid"}
                x1={padL}
                x2={width - padR}
                y1={yOf(t)}
                y2={yOf(t)}
              />
            ) : null}
            <text className="hb-bar-tick" x={padL - 8} y={yOf(t)} textAnchor="end" dominantBaseline="middle">
              {axisFmt(t)}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const cx = padL + slot * (i + 0.5);
          const x = cx - barW / 2;
          const v1 = pos(d.value);
          const v2 = pos(d.value2 ?? 0);
          const h1 = (v1 / top) * innerH;
          const h2 = (v2 / top) * innerH;
          const base = padT + innerH;
          return (
            <g key={i}>
              <g
                className="hb-bar-b"
                data-on={active === i ? "true" : "false"}
                data-dim={active !== null && active !== i ? "true" : "false"}
                style={{
                  transformOrigin: `${cx}px ${base}px`,
                  ["--hb-bar-d" as string]: `${i * 45}ms`,
                }}
              >
                {h1 > 0 ? <path d={topRound(x, base - h1, barW, h1, v2 > 0 ? 0 : 5)} fill={color} /> : null}
                {h2 > 0 ? <path d={topRound(x, base - h1 - h2, barW, h2, 5)} fill={color2} /> : null}
              </g>
              {i % every === 0 ? (
                <text
                  className="hb-bar-xl"
                  data-on={active === i ? "true" : "false"}
                  x={cx}
                  y={height - 6}
                  textAnchor="middle"
                >
                  {d.label}
                </text>
              ) : null}
              <rect
                x={padL + slot * i}
                y={padT}
                width={slot}
                height={innerH + padB - 4}
                fill="transparent"
                onMouseEnter={() => setActive(i)}
                onMouseMove={() => setActive(i)}
              />
            </g>
          );
        })}
      </svg>
      {act ? (
        <div className="hb-bar-tip" aria-hidden="true" style={{ left: tipX, top: tipY }}>
          <div className="hb-bar-tip-l">{act.label}</div>
          <div className="hb-bar-tip-r">
            {stacked ? <span className="hb-bar-tip-d" style={{ background: color }} /> : null}
            {stacked ? seriesLabels[0] : null}
            <span className="hb-bar-tip-v">{tipFmt(act.value)}</span>
          </div>
          {stacked ? (
            <div className="hb-bar-tip-r">
              <span className="hb-bar-tip-d" style={{ background: color2 }} />
              {seriesLabels[1]}
              <span className="hb-bar-tip-v">{tipFmt(act.value2 ?? 0)}</span>
            </div>
          ) : null}
        </div>
      ) : null}
      <ul className="hb-bar-sr">
        {data.map((d, i) => (
          <li key={i}>
            {d.label}: {tipFmt(d.value)}
            {typeof d.value2 === "number" ? `, ${tipFmt(d.value2)}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
