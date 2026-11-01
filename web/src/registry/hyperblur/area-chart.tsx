"use client";

import * as React from "react";

export interface AreaChartDatum {
  label: string;
  value: number;
}

export interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: AreaChartDatum[];
  color?: string;
  height?: number;
  smooth?: boolean;
  showDots?: boolean;
  valueFormatter?: (n: number) => string;
  locale?: string;
  animate?: boolean;
}

const css = `
.hb-area { position: relative; display: block; width: 100%; min-width: 0; color: #ededed; touch-action: pan-y; }
.hb-area-svg { display: block; width: 100%; overflow: visible; }
.hb-area-grid { stroke: #262626; stroke-width: 1; stroke-dasharray: 3 5; }
.hb-area-base { stroke: #262626; stroke-width: 1; }
.hb-area-tick {
  fill: #8f8f8f;
  font-size: 11px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-area-xl { fill: #8f8f8f; font-size: 11px; font-family: inherit; transition: fill .2s ease; }
.hb-area-xl[data-on="true"] { fill: #ededed; }
.hb-area-line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1.3s cubic-bezier(.22, .8, .24, 1), opacity .15s ease;
}
.hb-area-fill { transition: opacity .9s ease .4s; }
.hb-area-dots { transition: opacity .4s ease 1s; }
.hb-area[data-ready="false"] .hb-area-line { stroke-dashoffset: 1; opacity: 0; }
.hb-area[data-ready="false"] .hb-area-fill,
.hb-area[data-ready="false"] .hb-area-dots { opacity: 0; }
.hb-area-cross { stroke: #3a3a3a; stroke-width: 1; stroke-dasharray: 3 4; pointer-events: none; }
.hb-area-tip {
  position: absolute;
  z-index: 2;
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
  transition: left .1s ease, top .1s ease;
}
.hb-area-tip-l { color: #8f8f8f; }
.hb-area-tip-v {
  color: #ededed;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-area-sr {
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
  .hb-area-line, .hb-area-fill, .hb-area-dots, .hb-area-xl, .hb-area-tip { transition: none !important; }
  .hb-area[data-ready="false"] .hb-area-line { stroke-dashoffset: 0 !important; opacity: 1 !important; }
  .hb-area[data-ready="false"] .hb-area-fill,
  .hb-area[data-ready="false"] .hb-area-dots { opacity: 1 !important; }
}
`;

function r(n: number) {
  return Math.round(n * 100) / 100;
}

function monotone(pts: [number, number][]) {
  const n = pts.length;
  if (n < 2) return "";
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const dx = pts[i + 1][0] - pts[i][0];
    m.push(dx === 0 ? 0 : (pts[i + 1][1] - pts[i][1]) / dx);
  }
  const t: number[] = new Array(n).fill(0);
  t[0] = m[0];
  t[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) {
    t[i] = m[i - 1] * m[i] <= 0 ? 0 : (2 * m[i - 1] * m[i]) / (m[i - 1] + m[i]);
  }
  let d = `M${r(pts[0][0])},${r(pts[0][1])}`;
  for (let i = 0; i < n - 1; i++) {
    const dx = (pts[i + 1][0] - pts[i][0]) / 3;
    d += `C${r(pts[i][0] + dx)},${r(pts[i][1] + t[i] * dx)} ${r(pts[i + 1][0] - dx)},${r(pts[i + 1][1] - t[i + 1] * dx)} ${r(pts[i + 1][0])},${r(pts[i + 1][1])}`;
  }
  return d;
}

function straight(pts: [number, number][]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${r(p[0])},${r(p[1])}`).join("");
}

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

function niceStep(raw: number) {
  if (!(raw > 0)) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / exp;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * exp;
}

export function AreaChart({
  data,
  color = "#2f7bff",
  height = 220,
  smooth = true,
  showDots = false,
  valueFormatter,
  locale = "en-US",
  animate = true,
  className = "",
  ...rest
}: AreaChartProps) {
  const [ref, width] = useWidth(360);
  const ready = useReady(animate);
  const [active, setActive] = React.useState<number | null>(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");

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

  const vals = data.map((d) => (Number.isFinite(d.value) ? d.value : 0));
  const hi = vals.length ? Math.max(...vals) : 0;
  const lo = vals.length ? Math.min(...vals, 0) : 0;
  const step = niceStep((hi - lo) / 4);
  const top = lo + step * 4;
  const ticks = [0, 1, 2, 3, 4].map((i) => lo + step * i);

  const padL = Math.max(28, ...ticks.map((t) => axisFmt(t).length * 6.4 + 10));
  const padR = 12;
  const padT = 12;
  const padB = 24;
  const innerW = Math.max(1, width - padL - padR);
  const innerH = Math.max(1, height - padT - padB);
  const yOf = (v: number) => padT + innerH - ((v - lo) / (top - lo || 1)) * innerH;
  const xOf = (i: number) => (data.length < 2 ? padL + innerW / 2 : padL + (i / (data.length - 1)) * innerW);
  const every = Math.max(1, Math.ceil(46 / (innerW / Math.max(1, data.length - 1))));

  const pts: [number, number][] = vals.map((v, i) => [xOf(i), yOf(v)]);
  const line = smooth ? monotone(pts) : straight(pts);
  const base = padT + innerH;
  const area =
    pts.length > 1 ? `${line}L${r(pts[pts.length - 1][0])},${base}L${r(pts[0][0])},${base}Z` : "";

  const label = data.length
    ? `Area chart with ${data.length} points, from ${data[0].label} at ${tipFmt(vals[0])} to ${data[data.length - 1].label} at ${tipFmt(vals[vals.length - 1])}. Low ${tipFmt(Math.min(...vals))}, high ${tipFmt(hi)}.`
    : "Area chart with no data";

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    if (!data.length) return;
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / (box.width || 1)) * innerW + padL;
    const idx = data.length < 2 ? 0 : Math.round(((x - padL) / innerW) * (data.length - 1));
    setActive(Math.min(data.length - 1, Math.max(0, idx)));
  };

  const act = active === null ? null : data[active];
  const tipX = active === null ? 0 : Math.min(Math.max(xOf(active), 44), width - 44);
  const tipY = active === null ? 0 : Math.max(yOf(vals[active]) - 12, 44);

  return (
    <div
      ref={ref}
      className={`hb-area ${className}`}
      data-ready={ready ? "true" : "false"}
      style={{ height }}
      {...rest}
    >
      <style href="hb-area-chart" precedence="default">{css}</style>
      <svg
        className="hb-area-svg"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={label}
      >
        <defs>
          <linearGradient id={`hb-area-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.34" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              className={i === 0 ? "hb-area-base" : "hb-area-grid"}
              x1={padL}
              x2={width - padR}
              y1={yOf(t)}
              y2={yOf(t)}
            />
            <text className="hb-area-tick" x={padL - 8} y={yOf(t)} textAnchor="end" dominantBaseline="middle">
              {axisFmt(t)}
            </text>
          </g>
        ))}
        {data.map((d, i) =>
          i % every === 0 ? (
            <text
              key={i}
              className="hb-area-xl"
              data-on={active === i ? "true" : "false"}
              x={xOf(i)}
              y={height - 6}
              textAnchor={data.length > 1 && i === 0 ? "start" : data.length > 1 && i === data.length - 1 ? "end" : "middle"}
            >
              {d.label}
            </text>
          ) : null
        )}
        {area ? <path className="hb-area-fill" d={area} fill={`url(#hb-area-${uid})`} /> : null}
        {pts.length > 1 ? (
          <path className="hb-area-line" d={line} pathLength={1} stroke={color} strokeWidth={2} />
        ) : null}
        {showDots ? (
          <g className="hb-area-dots">
            {pts.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#111111" stroke={color} strokeWidth={1.75} />
            ))}
          </g>
        ) : null}
        {active !== null ? (
          <g>
            <line className="hb-area-cross" x1={xOf(active)} x2={xOf(active)} y1={padT} y2={base} />
            <circle cx={xOf(active)} cy={yOf(vals[active])} r={8} fill={color} opacity="0.2" />
            <circle cx={xOf(active)} cy={yOf(vals[active])} r={4} fill={color} stroke="#111111" strokeWidth={1.5} />
          </g>
        ) : null}
        <rect
          x={padL}
          y={padT}
          width={innerW}
          height={innerH + padB - 4}
          fill="transparent"
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setActive(null)}
        />
      </svg>
      {act ? (
        <div className="hb-area-tip" aria-hidden="true" style={{ left: tipX, top: tipY }}>
          <div className="hb-area-tip-l">{act.label}</div>
          <div className="hb-area-tip-v">{tipFmt(vals[active as number])}</div>
        </div>
      ) : null}
      <ul className="hb-area-sr">
        {data.map((d, i) => (
          <li key={i}>
            {d.label}: {tipFmt(vals[i])}
          </li>
        ))}
      </ul>
    </div>
  );
}
