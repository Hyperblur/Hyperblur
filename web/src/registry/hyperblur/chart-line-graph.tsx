"use client";

import * as React from "react";

export interface ChartLinePoint {
  label: string;
  value: number;
}

export interface ChartLineGraphProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  data?: ChartLinePoint[];
  format?: (value: number) => string;
  axisFormat?: (value: number) => string;
  height?: number;
  accent?: string;
  curve?: boolean;
  sweep?: boolean;
}

const defaultData: ChartLinePoint[] = [
  { label: "Week 1", value: 1240 },
  { label: "Week 2", value: 1310 },
  { label: "Week 3", value: 1295 },
  { label: "Week 4", value: 1480 },
  { label: "Week 5", value: 1620 },
  { label: "Week 6", value: 1575 },
  { label: "Week 7", value: 1790 },
  { label: "Week 8", value: 1960 },
  { label: "Week 9", value: 1885 },
  { label: "Week 10", value: 2140 },
  { label: "Week 11", value: 2310 },
  { label: "Week 12", value: 2495 },
];

const css = `
.hb-zb5 {
  --hb-zb5-a: #2f7bff;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0 14px 26px 44px;
  color: #ededed;
  font-family: inherit;
  font-size: 12px;
}
.hb-zb5 *, .hb-zb5 *::before, .hb-zb5 *::after { box-sizing: border-box; }
.hb-zb5-plot {
  position: relative;
  width: 100%;
  height: var(--hb-zb5-h, 240px);
  outline: none;
  cursor: crosshair;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}
.hb-zb5-plot:focus-visible { border-radius: 8px; box-shadow: 0 0 0 2px color-mix(in srgb, var(--hb-zb5-a) 70%, transparent); }
.hb-zb5-svg { position: absolute; left: 0; top: 0; display: block; overflow: visible; }
.hb-zb5-grid { stroke: rgba(255, 255, 255, 0.07); stroke-width: 1; stroke-dasharray: 2 5; }
.hb-zb5-base { stroke: rgba(255, 255, 255, 0.16); stroke-dasharray: none; }
.hb-zb5-vg { stroke: rgba(255, 255, 255, 0.04); stroke-width: 1; }
.hb-zb5-line {
  fill: none;
  stroke: var(--hb-zb5-a);
  stroke-width: 2.25;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1 1;
  stroke-dashoffset: 1;
  filter: drop-shadow(0 0 7px color-mix(in srgb, var(--hb-zb5-a) 55%, transparent));
}
.hb-zb5[data-in="true"] .hb-zb5-line {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1.8s cubic-bezier(0.65, 0, 0.25, 1);
}
.hb-zb5-area { clip-path: inset(0 100% 0 0); }
.hb-zb5[data-in="true"] .hb-zb5-area {
  clip-path: inset(0 0 0 0);
  transition: clip-path 1.8s cubic-bezier(0.65, 0, 0.25, 1);
}
.hb-zb5-pt {
  fill: #0a0a0a;
  stroke: var(--hb-zb5-a);
  stroke-width: 1.75;
  opacity: 0;
}
.hb-zb5[data-in="true"] .hb-zb5-pt {
  opacity: 0.85;
  transition: opacity 0.35s ease var(--hb-zb5-d, 0ms);
}
.hb-zb5-yl, .hb-zb5-xl {
  position: absolute;
  font-size: 11px;
  line-height: 1;
  color: #8f8f8f;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
.hb-zb5-yl { right: calc(100% + 10px); transform: translateY(-50%); }
.hb-zb5-xl { top: calc(100% + 10px); transform: translateX(-50%); }
.hb-zb5-xl[data-on="true"] { color: #ededed; }
.hb-zb5-cx {
  position: absolute;
  top: 0;
  width: 1px;
  background: linear-gradient(to bottom, color-mix(in srgb, var(--hb-zb5-a) 80%, transparent), rgba(255, 255, 255, 0.04));
  pointer-events: none;
  transition: left 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-zb5-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  margin: -6px 0 0 -6px;
  border-radius: 50%;
  background: #0a0a0a;
  border: 2.5px solid var(--hb-zb5-a);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--hb-zb5-a) 22%, transparent);
  pointer-events: none;
  transition: left 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-zb5-end {
  position: absolute;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 50%;
  background: var(--hb-zb5-a);
  box-shadow: 0 0 12px var(--hb-zb5-a);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.hb-zb5[data-in="true"] .hb-zb5-end { opacity: 1; transition-delay: 1.7s; }
.hb-zb5[data-hold="true"] .hb-zb5-end { opacity: 0; transition-delay: 0s; }
.hb-zb5-end::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid var(--hb-zb5-a);
  animation: hb-zb5-pulse 2.2s ease-out infinite;
}
.hb-zb5-tip {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 96px;
  padding: 8px 11px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(23, 23, 23, 0.94);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  white-space: nowrap;
  transform: translate(-50%, calc(-100% - 14px));
  animation: hb-zb5-pop 0.18s ease-out;
  transition: left 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-zb5-tip[data-below="true"] { transform: translate(-50%, 18px); }
.hb-zb5-tl { font-size: 11px; color: #8f8f8f; }
.hb-zb5-tv { display: flex; align-items: baseline; gap: 8px; font-size: 15px; font-weight: 650; letter-spacing: -0.01em; font-variant-numeric: tabular-nums; }
.hb-zb5-td { font-size: 11px; font-weight: 600; color: #3ecf8e; }
.hb-zb5-td[data-neg="true"] { color: #ff6b6b; }
@keyframes hb-zb5-pulse {
  0% { transform: scale(1); opacity: 0.9; }
  100% { transform: scale(3.4); opacity: 0; }
}
@keyframes hb-zb5-pop {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-zb5-line, .hb-zb5-area, .hb-zb5-pt, .hb-zb5-end, .hb-zb5-cx, .hb-zb5-dot, .hb-zb5-tip { transition: none !important; animation: none !important; }
  .hb-zb5-line { stroke-dashoffset: 0; }
  .hb-zb5-area { clip-path: none; }
  .hb-zb5-pt { opacity: 0.85; }
  .hb-zb5-end { opacity: 1; }
}
`;

const PAD_X = 12;
const PAD_T = 18;
const PAD_B = 6;

function niceStep(raw: number) {
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const f = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  return f * mag;
}

function linePath(xs: number[], ys: number[], curve: boolean) {
  const n = xs.length;
  if (n === 0) return "";
  if (n === 1) return `M${xs[0].toFixed(2)} ${ys[0].toFixed(2)}`;
  if (!curve) return xs.map((x, i) => `${i ? "L" : "M"}${x.toFixed(2)} ${ys[i].toFixed(2)}`).join("");
  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(xs[i + 1] - xs[i]);
    m.push((ys[i + 1] - ys[i]) / dx[i]);
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
  let d = `M${xs[0].toFixed(2)} ${ys[0].toFixed(2)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += `C${(xs[i] + h).toFixed(2)} ${(ys[i] + t[i] * h).toFixed(2)} ${(xs[i + 1] - h).toFixed(2)} ${(ys[i + 1] - t[i + 1] * h).toFixed(2)} ${xs[i + 1].toFixed(2)} ${ys[i + 1].toFixed(2)}`;
  }
  return d;
}

const plainFormat = (v: number) => v.toLocaleString("en-US");
const compactFormat = (v: number) => (Math.abs(v) >= 1000 ? `${+(v / 1000).toFixed(1)}k` : String(+v.toFixed(2)));

export function ChartLineGraph({
  data = defaultData,
  format = plainFormat,
  axisFormat = compactFormat,
  height = 240,
  accent = "#2f7bff",
  curve = true,
  sweep = false,
  "aria-label": ariaLabel = "Line graph",
  className = "",
  style,
  ...rest
}: ChartLineGraphProps) {
  const uid = React.useId().replace(/:/g, "");
  const rootRef = React.useRef<HTMLDivElement>(null);
  const plotRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(640);
  const [shown, setShown] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState<number | null>(null);
  const [auto, setAuto] = React.useState<number | null>(null);

  const n = data.length;

  React.useEffect(() => {
    const el = plotRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries[entries.length - 1].isIntersecting;
        setVisible(hit);
        if (hit) setShown(true);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!sweep || !visible || !shown || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 1;
    let interval = 0;
    const first = window.setTimeout(() => {
      setAuto(i);
      interval = window.setInterval(() => {
        i = (i + 1) % n;
        setAuto(i);
      }, 1300);
    }, 2100);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
      setAuto(null);
    };
  }, [sweep, visible, shown, n]);

  const values = data.map((d) => d.value);
  const lo = n ? Math.min(...values) : 0;
  const hi = n ? Math.max(...values) : 1;
  const span = hi - lo || Math.abs(hi) || 1;
  const step = niceStep(span / 4);
  const yMin = Math.floor(lo / step) * step;
  let yMax = Math.ceil(hi / step) * step;
  if (yMax - yMin < step * 4) yMax = yMin + step * 4;
  const ticks: number[] = [];
  for (let v = yMin; v <= yMax + step * 0.001; v += step) ticks.push(v);

  const plotH = height;
  const inner = plotH - PAD_T - PAD_B;
  const gap = n > 1 ? (width - PAD_X * 2) / (n - 1) : 0;
  const xs = data.map((_, i) => (n > 1 ? PAD_X + i * gap : width / 2));
  const ys = data.map((d) => PAD_T + (1 - (d.value - yMin) / (yMax - yMin)) * inner);
  const tickY = (v: number) => PAD_T + (1 - (v - yMin) / (yMax - yMin)) * inner;
  const line = linePath(xs, ys, curve);
  const area = n > 1 ? `${line}L${xs[n - 1].toFixed(2)} ${plotH}L${xs[0].toFixed(2)} ${plotH}Z` : "";
  const every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(width / 70))));

  const idx = active ?? auto;
  const hold = active !== null;

  function locate(clientX: number) {
    const el = plotRef.current;
    if (!el || n === 0) return 0;
    const r = el.getBoundingClientRect();
    const raw = gap ? (clientX - r.left - PAD_X) / gap : 0;
    return Math.min(n - 1, Math.max(0, Math.round(raw)));
  }

  function onKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (n === 0) return;
    const cur = active;
    let next: number | null | undefined;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = cur === null ? 0 : Math.min(n - 1, cur + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = cur === null ? n - 1 : Math.max(0, cur - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else if (e.key === "Escape") next = null;
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
  }

  const cur = idx !== null && idx < n ? data[idx] : null;
  const prevPoint = idx !== null && idx > 0 ? data[idx - 1] : null;
  const delta = cur && prevPoint && prevPoint.value !== 0 ? ((cur.value - prevPoint.value) / Math.abs(prevPoint.value)) * 100 : null;
  const tipX = idx !== null ? Math.min(width - 62, Math.max(62, xs[idx])) : 0;
  const tipBelow = idx !== null && ys[idx] < 74;

  return (
    <div
      ref={rootRef}
      data-in={shown ? "true" : "false"}
      data-hold={idx !== null ? "true" : "false"}
      className={`hb-zb5 ${className}`.trim()}
      style={{ "--hb-zb5-a": accent, "--hb-zb5-h": `${height}px`, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-chart-line-graph" precedence="default">{css}</style>
      <div
        ref={plotRef}
        className="hb-zb5-plot"
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={Math.max(0, n - 1)}
        aria-valuenow={hold && cur ? (active ?? undefined) : undefined}
        aria-valuetext={hold && cur ? `${cur.label}: ${format(cur.value)}` : undefined}
        onPointerMove={(e) => {
          if (e.pointerType === "touch") return;
          setActive(locate(e.clientX));
        }}
        onPointerDown={(e) => setActive(locate(e.clientX))}
        onPointerLeave={(e) => {
          if (e.pointerType !== "touch") setActive(null);
        }}
        onKeyDown={onKey}
        onFocus={(e) => {
          if (active === null && e.currentTarget.matches(":focus-visible")) setActive(n - 1);
        }}
        onBlur={() => setActive(null)}
      >
        <svg className="hb-zb5-svg" width={width} height={plotH} viewBox={`0 0 ${width} ${plotH}`} aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-a`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: "var(--hb-zb5-a)", stopOpacity: 0.34 }} />
              <stop offset="1" style={{ stopColor: "var(--hb-zb5-a)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          {ticks.map((v, i) => (
            <line
              key={`g${i}`}
              className={i === 0 ? "hb-zb5-grid hb-zb5-base" : "hb-zb5-grid"}
              x1={0}
              x2={width}
              y1={tickY(v).toFixed(2)}
              y2={tickY(v).toFixed(2)}
            />
          ))}
          {data.map((_, i) =>
            i % every === 0 ? (
              <line key={`v${i}`} className="hb-zb5-vg" x1={xs[i].toFixed(2)} x2={xs[i].toFixed(2)} y1={PAD_T} y2={plotH - PAD_B} />
            ) : null
          )}
          {area ? <path className="hb-zb5-area" d={area} fill={`url(#${uid}-a)`} /> : null}
          {line ? <path className="hb-zb5-line" d={line} pathLength={1} /> : null}
          {data.map((_, i) => (
            <circle
              key={`p${i}`}
              className="hb-zb5-pt"
              cx={xs[i].toFixed(2)}
              cy={ys[i].toFixed(2)}
              r={3}
              style={{ "--hb-zb5-d": `${Math.round(n > 1 ? (i / (n - 1)) * 1500 : 0)}ms` } as React.CSSProperties}
            />
          ))}
        </svg>
        {ticks.map((v, i) => (
          <span key={`y${i}`} className="hb-zb5-yl" style={{ top: tickY(v) }}>
            {axisFormat(v)}
          </span>
        ))}
        {data.map((d, i) =>
          i % every === 0 ? (
            <span key={`x${i}`} className="hb-zb5-xl" data-on={idx === i ? "true" : "false"} style={{ left: xs[i] }}>
              {d.label}
            </span>
          ) : null
        )}
        {n > 0 ? <span className="hb-zb5-end" style={{ left: xs[n - 1], top: ys[n - 1] }} /> : null}
        {cur && idx !== null ? (
          <>
            <span className="hb-zb5-cx" style={{ left: xs[idx], height: plotH - PAD_B }} />
            <span className="hb-zb5-dot" style={{ left: xs[idx], top: ys[idx] }} />
            <div className="hb-zb5-tip" data-below={tipBelow ? "true" : "false"} style={{ left: tipX, top: ys[idx] }}>
              <span className="hb-zb5-tl">{cur.label}</span>
              <span className="hb-zb5-tv">
                {format(cur.value)}
                {delta !== null ? (
                  <span className="hb-zb5-td" data-neg={delta < 0 ? "true" : "false"}>
                    {delta >= 0 ? "+" : ""}
                    {delta.toFixed(1)}%
                  </span>
                ) : null}
              </span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
