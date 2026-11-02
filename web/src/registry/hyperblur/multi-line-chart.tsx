"use client";

import * as React from "react";

export interface LineSeries {
  name: string;
  data: number[];
  color?: string;
}

export interface MultiLineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  series?: LineSeries[];
  labels?: string[];
  colors?: string[];
  height?: number;
  smooth?: boolean;
  legend?: "top" | "bottom" | "none";
  valueFormatter?: (n: number) => string;
  locale?: string;
  animate?: boolean;
}

const PALETTE = ["#2f7bff", "#8b5cf6", "#34d399", "#fbbf24", "#fb7185", "#7fb3ff"];

const DEFAULT_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DEFAULT_SERIES: LineSeries[] = [
  { name: "Organic", data: [32, 36, 35, 41, 47, 46, 54, 59, 57, 66, 71, 78] },
  { name: "Paid", data: [24, 28, 33, 31, 38, 42, 40, 45, 52, 49, 55, 58] },
  { name: "Referral", data: [12, 14, 13, 17, 16, 21, 24, 23, 27, 30, 29, 35] },
];

const css = `
.hb-mlc { position: relative; display: flex; flex-direction: column; gap: 8px; width: 100%; min-width: 0; box-sizing: border-box; color: #ededed; font-family: inherit; }
.hb-mlc *, .hb-mlc *::before, .hb-mlc *::after { box-sizing: border-box; }
.hb-mlc-plot { position: relative; width: 100%; min-width: 0; touch-action: pan-y; }
.hb-mlc-svg { display: block; width: 100%; overflow: visible; outline: none; }
.hb-mlc-svg:focus-visible { outline: 2px solid #7fb3ff; outline-offset: 4px; border-radius: 4px; }
.hb-mlc-grid { stroke: #262626; stroke-width: 1; stroke-dasharray: 3 5; }
.hb-mlc-base { stroke: #262626; stroke-width: 1; }
.hb-mlc-tick {
  fill: #8f8f8f;
  font-size: 11px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-mlc-xl { fill: #8f8f8f; font-size: 11px; font-family: inherit; transition: fill .15s ease; }
.hb-mlc-xl[data-on="true"] { fill: #ededed; }
.hb-mlc-line {
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: hb-mlc-draw 1.3s cubic-bezier(.22, .8, .24, 1) backwards;
  animation-delay: calc(var(--hb-mlc-i, 0) * 120ms);
  transition: opacity .25s ease, stroke-width .2s ease;
}
.hb-mlc-line[data-off="true"] { opacity: 0; }
.hb-mlc-line[data-dim="true"] { opacity: .3; }
.hb-mlc-cross { stroke: #3a3a3a; stroke-width: 1; stroke-dasharray: 3 4; pointer-events: none; }
.hb-mlc-dot { transition: opacity .2s ease; pointer-events: none; }
.hb-mlc-tip {
  position: absolute;
  z-index: 2;
  min-width: 110px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid #262626;
  background: #171717;
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, .8);
  font-size: 11px;
  line-height: 1.45;
  white-space: nowrap;
  pointer-events: none;
}
.hb-mlc-tip-h { margin-bottom: 2px; color: #8f8f8f; }
.hb-mlc-tip-r { display: flex; align-items: center; gap: 6px; color: #ededed; }
.hb-mlc-tip-d { width: 6px; height: 6px; border-radius: 2px; flex: none; }
.hb-mlc-tip-v {
  margin-left: auto;
  padding-left: 12px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-mlc-legend { display: flex; flex-wrap: wrap; gap: 4px; margin: 0; padding: 0; list-style: none; }
.hb-mlc-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 3px 9px 3px 7px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 11.5px;
  line-height: 1.3;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-mlc-btn:hover { background: #1a1a1a; }
.hb-mlc-btn:focus-visible { outline: 2px solid #7fb3ff; outline-offset: 1px; }
.hb-mlc-btn[aria-pressed="false"] { color: #6b6b6b; }
.hb-mlc-btn[aria-pressed="false"] .hb-mlc-name { text-decoration: line-through; }
.hb-mlc-sw { width: 14px; height: 3px; border-radius: 2px; flex: none; transition: opacity .2s ease; }
.hb-mlc-btn[aria-pressed="false"] .hb-mlc-sw { opacity: .35; }
.hb-mlc-name { white-space: nowrap; }
.hb-mlc[data-animate="false"] .hb-mlc-line { animation: none; }
@keyframes hb-mlc-draw {
  from { stroke-dashoffset: 1; opacity: 0; }
  3% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-mlc-line { animation: none !important; }
  .hb-mlc-line, .hb-mlc-dot, .hb-mlc-btn { transition: none !important; }
}
`;

function f(n: number) {
  return n.toFixed(2);
}

function niceStep(raw: number) {
  if (!(raw > 0)) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / exp;
  const nice = m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10;
  return nice * exp;
}

function monotone(pts: [number, number][]) {
  const n = pts.length;
  if (n === 0) return "";
  if (n === 1) return `M${f(pts[0][0])},${f(pts[0][1])}`;
  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = pts[i + 1][0] - pts[i][0] || 1;
    m[i] = (pts[i + 1][1] - pts[i][1]) / dx[i];
  }
  const t: number[] = new Array(n).fill(0);
  t[0] = m[0];
  t[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
    } else {
      const a = t[i] / m[i];
      const b = t[i + 1] / m[i];
      const s = a * a + b * b;
      if (s > 9) {
        const k = 3 / Math.sqrt(s);
        t[i] = k * a * m[i];
        t[i + 1] = k * b * m[i];
      }
    }
  }
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    d += `C${f(x0 + dx[i] / 3)},${f(y0 + (t[i] * dx[i]) / 3)} ${f(x1 - dx[i] / 3)},${f(y1 - (t[i + 1] * dx[i]) / 3)} ${f(x1)},${f(y1)}`;
  }
  return d;
}

function straight(pts: [number, number][]) {
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${f(x)},${f(y)}`).join("");
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

export function MultiLineChart({
  series = DEFAULT_SERIES,
  labels = DEFAULT_LABELS,
  colors = PALETTE,
  height = 200,
  smooth = true,
  legend = "bottom",
  valueFormatter,
  locale = "en-US",
  animate = true,
  className = "",
  ...rest
}: MultiLineChartProps) {
  const [ref, width] = useWidth(320);
  const [hidden, setHidden] = React.useState<number[]>([]);
  const [idx, setIdx] = React.useState<number | null>(null);
  const [hoverSeries, setHoverSeries] = React.useState<number | null>(null);

  const compact = React.useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }),
    [locale]
  );
  const full = React.useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }), [locale]);
  const axisFmt = (v: number) => (valueFormatter ? valueFormatter(v) : compact.format(v));
  const tipFmt = (v: number) => (valueFormatter ? valueFormatter(v) : full.format(v));

  const items = series.map((s, si) => ({ ...s, si, color: s.color ?? colors[si % colors.length] }));
  const n = Math.max(labels.length, ...items.map((s) => s.data.length), 0);
  const nums = items.flatMap((s) => s.data.filter((v) => Number.isFinite(v)));
  const hi = nums.length ? Math.max(...nums) : 1;
  const lo = nums.length ? Math.min(...nums) : 0;
  const fromZero = lo >= 0 && lo < hi * 0.5;
  const step = niceStep((hi - (fromZero ? 0 : lo)) / 4);
  const yMin = fromZero ? 0 : Math.floor(lo / step) * step;
  let yMax = Math.ceil(hi / step) * step;
  if (yMax <= yMin) yMax = yMin + step;
  const ticks: number[] = [];
  for (let v = yMin; v <= yMax + step / 1000 && ticks.length < 9; v += step) ticks.push(v);

  const padL = Math.max(28, ...ticks.map((t) => axisFmt(t).length * 6.4 + 10));
  const padR = 8;
  const padT = 10;
  const padB = 24;
  const inset = 8;
  const innerW = Math.max(1, width - padL - padR);
  const innerH = Math.max(1, height - padT - padB);
  const yOf = (v: number) => padT + innerH - ((v - yMin) / (yMax - yMin)) * innerH;
  const xOf = (i: number) => padL + inset + (n > 1 ? (i / (n - 1)) * (innerW - inset * 2) : (innerW - inset * 2) / 2);
  const slot = n > 1 ? (innerW - inset * 2) / (n - 1) : innerW;
  const every = Math.max(1, Math.ceil(40 / slot));

  const paths = items.map((s) => {
    const pts: [number, number][] = [];
    s.data.forEach((v, i) => {
      if (Number.isFinite(v)) pts.push([xOf(i), yOf(v)]);
    });
    return smooth ? monotone(pts) : straight(pts);
  });

  const toggle = (si: number) =>
    setHidden((h) => (h.includes(si) ? h.filter((x) => x !== si) : [...h, si]));

  const pointerIdx = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const vx = (e.clientX - rect.left) * (width / Math.max(1, rect.width));
    const raw = n > 1 ? ((vx - padL - inset) / (innerW - inset * 2)) * (n - 1) : 0;
    setIdx(Math.min(n - 1, Math.max(0, Math.round(raw))));
  };

  const onKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const cur = idx ?? n - 1;
    let next: number | null = null;
    if (e.key === "ArrowLeft") next = Math.max(0, cur - 1);
    else if (e.key === "ArrowRight") next = Math.min(n - 1, cur + 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else if (e.key === "Escape") {
      setIdx(null);
      return;
    }
    if (next !== null) {
      e.preventDefault();
      setIdx(next);
    }
  };

  const summary = items.length
    ? `Line chart with ${items.length} series over ${n} points. ${items
        .map((s) => {
          const vals = s.data.filter((v) => Number.isFinite(v));
          return vals.length ? `${s.name} goes from ${tipFmt(vals[0])} to ${tipFmt(vals[vals.length - 1])}` : s.name;
        })
        .join(". ")}.`
    : "Line chart with no data";

  const legendEl =
    legend === "none" ? null : (
      <ul className="hb-mlc-legend">
        {items.map((s) => {
          const on = !hidden.includes(s.si);
          return (
            <li key={s.si}>
              <button
                type="button"
                className="hb-mlc-btn"
                aria-pressed={on}
                onClick={() => toggle(s.si)}
                onMouseEnter={() => setHoverSeries(s.si)}
                onMouseLeave={() => setHoverSeries(null)}
                onFocus={() => setHoverSeries(s.si)}
                onBlur={() => setHoverSeries(null)}
              >
                <span className="hb-mlc-sw" style={{ background: s.color }} />
                <span className="hb-mlc-name">{s.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    );

  const visible = items.filter((s) => !hidden.includes(s.si));
  let tip: React.ReactNode = null;
  if (idx !== null && n > 0) {
    const x = xOf(idx);
    const flip = x > width * 0.55;
    tip = (
      <div
        className="hb-mlc-tip"
        aria-hidden="true"
        style={{
          left: x,
          top: padT + 4,
          transform: flip ? "translateX(calc(-100% - 12px))" : "translateX(12px)",
        }}
      >
        <div className="hb-mlc-tip-h">{labels[idx] ?? `Point ${idx + 1}`}</div>
        {visible.map((s) => (
          <div key={s.si} className="hb-mlc-tip-r">
            <span className="hb-mlc-tip-d" style={{ background: s.color }} />
            {s.name}
            <span className="hb-mlc-tip-v">{Number.isFinite(s.data[idx]) ? tipFmt(s.data[idx]) : "-"}</span>
          </div>
        ))}
        {visible.length === 0 ? <div className="hb-mlc-tip-r">No series shown</div> : null}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`hb-mlc ${className}`}
      data-animate={animate ? "true" : "false"}
      {...rest}
    >
      <style href="hb-multi-line-chart" precedence="default">{css}</style>
      {legend === "top" ? legendEl : null}
      <div className="hb-mlc-plot" onPointerLeave={() => setIdx(null)}>
        <svg
          className="hb-mlc-svg"
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={summary}
          tabIndex={0}
          onPointerMove={pointerIdx}
          onPointerDown={pointerIdx}
          onKeyDown={onKeyDown}
          onFocus={(e) => {
            if (idx === null && e.currentTarget.matches(":focus-visible")) setIdx(n - 1);
          }}
          onBlur={() => setIdx(null)}
        >
          {ticks.map((t, i) => (
            <g key={i}>
              <line
                className={i === 0 ? "hb-mlc-base" : "hb-mlc-grid"}
                x1={padL}
                x2={width - padR}
                y1={f(yOf(t))}
                y2={f(yOf(t))}
              />
              <text className="hb-mlc-tick" x={padL - 8} y={f(yOf(t))} textAnchor="end" dominantBaseline="middle">
                {axisFmt(t)}
              </text>
            </g>
          ))}
          {Array.from({ length: n }, (_, i) =>
            i % every === 0 ? (
              <text
                key={i}
                className="hb-mlc-xl"
                data-on={idx === i ? "true" : "false"}
                x={f(xOf(i))}
                y={height - 6}
                textAnchor="middle"
              >
                {labels[i] ?? ""}
              </text>
            ) : null
          )}
          {idx !== null ? (
            <line className="hb-mlc-cross" x1={f(xOf(idx))} x2={f(xOf(idx))} y1={padT} y2={padT + innerH} />
          ) : null}
          {items.map((s, k) => {
            const off = hidden.includes(s.si);
            const dim = hoverSeries !== null && hoverSeries !== s.si;
            return (
              <path
                key={s.si}
                className="hb-mlc-line"
                data-off={off ? "true" : "false"}
                data-dim={dim ? "true" : "false"}
                d={paths[k]}
                pathLength={1}
                stroke={s.color}
                style={{ ["--hb-mlc-i" as string]: s.si }}
              />
            );
          })}
          {idx !== null
            ? visible.map((s) =>
                Number.isFinite(s.data[idx]) ? (
                  <circle
                    key={s.si}
                    className="hb-mlc-dot"
                    cx={f(xOf(idx))}
                    cy={f(yOf(s.data[idx]))}
                    r={4}
                    fill="#0a0a0a"
                    stroke={s.color}
                    strokeWidth={2}
                  />
                ) : null
              )
            : null}
        </svg>
        {tip}
      </div>
      {legend === "bottom" ? legendEl : null}
    </div>
  );
}
