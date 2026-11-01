"use client";

import * as React from "react";

export interface SparklineProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[];
  color?: string;
  height?: number;
  strokeWidth?: number;
  fill?: boolean;
  animate?: boolean;
}

const css = `
.hb-spark { position: relative; display: block; width: 100%; min-width: 0; line-height: 0; }
.hb-spark-svg { display: block; width: 100%; overflow: visible; }
.hb-spark-line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1.1s cubic-bezier(.22, .8, .24, 1), opacity .15s ease;
}
.hb-spark-area { transition: opacity .7s ease .35s; }
.hb-spark-dot { transition: opacity .3s ease .95s; }
.hb-spark[data-ready="false"] .hb-spark-line { stroke-dashoffset: 1; opacity: 0; }
.hb-spark[data-ready="false"] .hb-spark-area,
.hb-spark[data-ready="false"] .hb-spark-dot { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .hb-spark-line, .hb-spark-area, .hb-spark-dot { transition: none !important; }
  .hb-spark[data-ready="false"] .hb-spark-line { stroke-dashoffset: 0 !important; opacity: 1 !important; }
  .hb-spark[data-ready="false"] .hb-spark-area,
  .hb-spark[data-ready="false"] .hb-spark-dot { opacity: 1 !important; }
}
`;

function r(n: number) {
  return Math.round(n * 100) / 100;
}

function monotone(pts: [number, number][]) {
  const n = pts.length;
  if (n === 0) return "";
  if (n === 1) return `M${r(pts[0][0])},${r(pts[0][1])}`;
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

export function Sparkline({
  data,
  color = "#2f7bff",
  height = 40,
  strokeWidth = 2,
  fill = true,
  animate = true,
  className = "",
  style,
  ...rest
}: SparklineProps) {
  const [ref, width] = useWidth(120);
  const ready = useReady(animate);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");

  const vals = data.filter((v) => Number.isFinite(v));
  const dotR = Math.max(3, strokeWidth * 1.4);
  const pad = dotR + 1;
  const min = vals.length ? Math.min(...vals) : 0;
  const max = vals.length ? Math.max(...vals) : 0;
  const span = max - min;
  const innerW = Math.max(1, width - pad * 2);
  const innerH = Math.max(1, height - pad * 2);

  const pts: [number, number][] = vals.map((v, i) => [
    vals.length === 1 ? width / 2 : pad + (i / (vals.length - 1)) * innerW,
    span === 0 ? height / 2 : pad + (1 - (v - min) / span) * innerH,
  ]);

  const line = monotone(pts);
  const last = pts[pts.length - 1];
  const first = pts[0];
  const area =
    pts.length > 1 ? `${line}L${r(last[0])},${height}L${r(first[0])},${height}Z` : "";
  const label = vals.length
    ? `Sparkline of ${vals.length} values, from ${vals[0]} to ${vals[vals.length - 1]}, low ${min}, high ${max}`
    : "Sparkline with no data";

  return (
    <div
      ref={ref}
      className={`hb-spark ${className}`}
      data-ready={ready ? "true" : "false"}
      style={{ height, ...style }}
      {...rest}
    >
      <style href="hb-sparkline" precedence="default">{css}</style>
      <svg
        className="hb-spark-svg"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={label}
      >
        <defs>
          <linearGradient id={`hb-spark-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {fill && area ? (
          <path className="hb-spark-area" d={area} fill={`url(#hb-spark-${uid})`} />
        ) : null}
        {pts.length > 1 ? (
          <path
            className="hb-spark-line"
            d={line}
            pathLength={1}
            stroke={color}
            strokeWidth={strokeWidth}
          />
        ) : null}
        {last ? (
          <g className="hb-spark-dot">
            <circle cx={last[0]} cy={last[1]} r={dotR * 2} fill={color} opacity="0.18" />
            <circle cx={last[0]} cy={last[1]} r={dotR} fill={color} stroke="#111111" strokeWidth="1.5" />
          </g>
        ) : null}
      </svg>
    </div>
  );
}
