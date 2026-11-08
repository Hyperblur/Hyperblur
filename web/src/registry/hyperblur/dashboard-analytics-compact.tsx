"use client";

import * as React from "react";

export type CompactRange = "7d" | "30d" | "90d";
export type CompactMetric = "visitors" | "pageviews" | "bounce" | "duration";

export interface DashboardAnalyticsCompactProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  site?: string;
  accent?: string;
  range?: CompactRange;
  defaultRange?: CompactRange;
  onRangeChange?: (range: CompactRange) => void;
  metric?: CompactMetric;
  defaultMetric?: CompactMetric;
  onMetricChange?: (metric: CompactMetric) => void;
  live?: boolean;
}

function hash(n: number) {
  let x = (n ^ 0x2545f491) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x2c1b3c6d) >>> 0;
  x = Math.imul(x ^ (x >>> 12), 0x297a2d39) >>> 0;
  return ((x ^ (x >>> 15)) >>> 0) / 4294967295;
}

const rangeDays: Record<CompactRange, number> = { "7d": 7, "30d": 30, "90d": 90 };
const rangeSeed: Record<CompactRange, number> = { "7d": 11, "30d": 23, "90d": 37 };

const metrics: { id: CompactMetric; label: string; base: number; swing: number; unit: "n" | "pct" | "dur"; lowerBetter?: boolean }[] = [
  { id: "visitors", label: "Visitors", base: 4200, swing: 0.35, unit: "n" },
  { id: "pageviews", label: "Pageviews", base: 11800, swing: 0.32, unit: "n" },
  { id: "bounce", label: "Bounce rate", base: 41, swing: 0.12, unit: "pct", lowerBetter: true },
  { id: "duration", label: "Visit duration", base: 194, swing: 0.18, unit: "dur" },
];

function series(metric: number, range: CompactRange, prev: boolean) {
  const m = metrics[metric];
  const n = rangeDays[range];
  const seed = rangeSeed[range] * 97 + metric * 13 + (prev ? 5000 : 0);
  return Array.from({ length: n }, (_, i) => {
    const t = i / Math.max(1, n - 1);
    const weekly = m.unit === "n" ? Math.sin((i % 7) * 0.9 + 0.6) * 0.12 : 0;
    const growth = prev ? 0.92 + t * 0.04 : 0.95 + t * 0.12;
    const noise = (hash(seed + i) - 0.5) * m.swing;
    return m.base * (growth + weekly + noise);
  });
}

function fmt(v: number, unit: "n" | "pct" | "dur") {
  if (unit === "pct") return `${v.toFixed(1)}%`;
  if (unit === "dur") {
    const s = Math.round(v);
    return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
  }
  if (v >= 1e6) return `${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e4) return `${(v / 1e3).toFixed(1)}k`;
  return Math.round(v).toLocaleString("en-US");
}

function total(values: number[], unit: "n" | "pct" | "dur") {
  const sum = values.reduce((a, b) => a + b, 0);
  return unit === "n" ? sum : sum / Math.max(1, values.length);
}

function curve(points: [number, number][]) {
  const f = (n: number) => n.toFixed(2);
  let d = `M${f(points[0][0])} ${f(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

const pages = [
  { path: "/", share: 1 },
  { path: "/pricing", share: 0.46 },
  { path: "/docs/getting-started", share: 0.38 },
  { path: "/blog/zero-downtime-migrations", share: 0.29 },
  { path: "/changelog", share: 0.21 },
  { path: "/careers", share: 0.12 },
];

const sources = [
  { name: "Search", share: 0.44, color: "#2f7bff" },
  { name: "Direct", share: 0.24, color: "#7fb3ff" },
  { name: "Newsletter", share: 0.14, color: "#22c3a6" },
  { name: "Social", share: 0.11, color: "#a78bfa" },
  { name: "Referral", share: 0.07, color: "#f5b544" },
];

const countries = [
  { code: "US", name: "United States", share: 0.38 },
  { code: "DE", name: "Germany", share: 0.12 },
  { code: "BR", name: "Brazil", share: 0.09 },
  { code: "IN", name: "India", share: 0.08 },
  { code: "GB", name: "United Kingdom", share: 0.07 },
];

const css = `
.hb-wi9 {
  --hb-wi9-a: #2f7bff;
  container-type: inline-size;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #222;
  background: radial-gradient(120% 60% at 0% 0%, rgba(47, 123, 255, 0.07), transparent 60%), #0a0a0a;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
}
.hb-wi9 *, .hb-wi9 *::before, .hb-wi9 *::after { box-sizing: border-box; }
.hb-wi9 button { font-family: inherit; }
.hb-wi9 button:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); }
.hb-wi9-top { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.hb-wi9-site { display: flex; align-items: center; gap: 10px; }
.hb-wi9-fav { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; background: linear-gradient(135deg, var(--hb-wi9-a), #0b3b8c); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 14px -4px var(--hb-wi9-a); }
.hb-wi9-site b { display: block; font-size: 14px; font-weight: 600; letter-spacing: -0.01em; }
.hb-wi9-site span { font-size: 11.5px; color: #6f6f6f; }
.hb-wi9-live { display: inline-flex; align-items: center; gap: 7px; height: 28px; padding: 0 10px; border-radius: 999px; border: 1px solid #1f3a26; background: rgba(74, 222, 128, 0.06); font-size: 12px; color: #a7f3c0; font-variant-numeric: tabular-nums; }
.hb-wi9-live i { position: relative; width: 7px; height: 7px; border-radius: 50%; background: #4ade80; }
.hb-wi9-live i::after { content: ""; position: absolute; inset: -4px; border-radius: 50%; border: 1.5px solid #4ade80; animation: hb-wi9-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite; }
@keyframes hb-wi9-ping { from { transform: scale(0.5); opacity: 1; } to { transform: scale(1.6); opacity: 0; } }
.hb-wi9-live b { font-weight: 600; color: #ededed; display: inline-block; min-width: 1.6em; }
.hb-wi9-seg { margin-left: auto; display: inline-flex; padding: 3px; gap: 2px; border-radius: 10px; background: #111; border: 1px solid #222; }
.hb-wi9-seg button { height: 26px; padding: 0 11px; border: 0; border-radius: 7px; background: transparent; color: #8f8f8f; font-size: 12px; cursor: pointer; transition: color 0.2s ease, background 0.2s ease; }
.hb-wi9-seg button:hover { color: #ededed; }
.hb-wi9-seg button[aria-pressed="true"] { color: #ededed; background: #222; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06); }
.hb-wi9-main { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 14px; }
.hb-wi9-card { border-radius: 13px; border: 1px solid #1f1f1f; background: linear-gradient(#111, #0e0e0e); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03); }
.hb-wi9-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-bottom: 1px solid #1c1c1c; }
.hb-wi9-kpi { position: relative; display: flex; flex-direction: column; gap: 4px; padding: 14px 16px 13px; border: 0; background: transparent; color: inherit; text-align: left; cursor: pointer; border-right: 1px solid #1c1c1c; transition: background 0.2s ease; }
.hb-wi9-kpi:last-child { border-right: 0; }
.hb-wi9-kpi:hover { background: rgba(255, 255, 255, 0.015); }
.hb-wi9-kpi::after { content: ""; position: absolute; left: 16px; right: 16px; bottom: -1px; height: 2px; border-radius: 2px; background: var(--hb-wi9-a); transform: scaleX(0); transition: transform 0.35s cubic-bezier(0.34, 1.3, 0.64, 1); }
.hb-wi9-kpi[aria-selected="true"]::after { transform: scaleX(1); }
.hb-wi9-kpi small { font-size: 11.5px; color: #8f8f8f; }
.hb-wi9-kpi[aria-selected="true"] small { color: #ededed; }
.hb-wi9-kpi strong { font-size: 22px; font-weight: 600; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.hb-wi9-delta { display: inline-flex; align-items: center; gap: 3px; font-size: 11.5px; font-weight: 500; font-variant-numeric: tabular-nums; }
.hb-wi9-delta[data-good="true"] { color: #4ade80; }
.hb-wi9-delta[data-good="false"] { color: #ff7a6b; }
.hb-wi9-delta span { color: #5f5f5f; font-weight: 400; }
.hb-wi9-chart { position: relative; height: 250px; margin: 14px 16px 6px 52px; cursor: crosshair; touch-action: pan-y; }
.hb-wi9-chart svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-wi9-grid { stroke: rgba(255, 255, 255, 0.06); stroke-dasharray: 2 5; vector-effect: non-scaling-stroke; }
.hb-wi9-line { fill: none; stroke: var(--hb-wi9-a); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-linejoin: round; filter: drop-shadow(0 0 8px color-mix(in srgb, var(--hb-wi9-a) 50%, transparent)); animation: hb-wi9-draw 1.2s cubic-bezier(0.65, 0, 0.25, 1) both; clip-path: inset(0 0 0 0); }
.hb-wi9-prev { fill: none; stroke: #4a4a4a; stroke-width: 1.4; stroke-dasharray: 4 4; vector-effect: non-scaling-stroke; }
.hb-wi9-area { animation: hb-wi9-fade 1.2s ease both; }
@keyframes hb-wi9-draw { from { clip-path: inset(0 100% 0 0); } }
@keyframes hb-wi9-fade { from { opacity: 0; } }
.hb-wi9-yl { position: absolute; right: calc(100% + 10px); transform: translateY(-50%); font-size: 10.5px; color: #5f5f5f; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-wi9-xl { position: absolute; top: calc(100% + 8px); transform: translateX(-50%); font-size: 10.5px; color: #5f5f5f; white-space: nowrap; }
.hb-wi9-cx { position: absolute; top: 0; bottom: 0; width: 1px; background: rgba(255, 255, 255, 0.18); pointer-events: none; }
.hb-wi9-dot { position: absolute; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 50%; background: #0a0a0a; border: 2px solid var(--hb-wi9-a); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-wi9-a) 22%, transparent); pointer-events: none; }
.hb-wi9-tip { position: absolute; top: 4px; z-index: 2; padding: 8px 10px; border-radius: 9px; background: rgba(23, 23, 23, 0.96); border: 1px solid #2a2a2a; box-shadow: 0 10px 26px rgba(0, 0, 0, 0.5); pointer-events: none; white-space: nowrap; font-size: 11.5px; }
.hb-wi9-tip small { display: block; color: #8f8f8f; margin-bottom: 3px; }
.hb-wi9-tip div { display: flex; align-items: center; gap: 6px; font-variant-numeric: tabular-nums; }
.hb-wi9-tip i { width: 8px; height: 2px; border-radius: 1px; }
.hb-wi9-legend { display: flex; gap: 14px; padding: 18px 16px 14px 52px; font-size: 11px; color: #6f6f6f; }
.hb-wi9-legend span { display: inline-flex; align-items: center; gap: 6px; }
.hb-wi9-side { display: flex; flex-direction: column; gap: 14px; }
.hb-wi9-panel { padding: 14px 14px 12px; }
.hb-wi9-ph { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.hb-wi9-ph b { font-size: 12.5px; font-weight: 600; }
.hb-wi9-ph span { font-size: 11px; color: #5f5f5f; }
.hb-wi9-rows { display: flex; flex-direction: column; gap: 3px; margin: 0; padding: 0; list-style: none; }
.hb-wi9-row { position: relative; display: flex; justify-content: space-between; gap: 10px; padding: 5px 8px; border-radius: 6px; font-size: 12px; overflow: hidden; }
.hb-wi9-row::before { content: ""; position: absolute; inset: 0; width: var(--hb-wi9-w); border-radius: 6px; background: color-mix(in srgb, var(--hb-wi9-a) 13%, transparent); transform-origin: left; animation: hb-wi9-bar 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: var(--hb-wi9-d, 0ms); }
@keyframes hb-wi9-bar { from { transform: scaleX(0); } }
.hb-wi9-row span { position: relative; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #d4d4d4; }
.hb-wi9-row b { position: relative; font-weight: 500; font-variant-numeric: tabular-nums; color: #a1a1a1; }
.hb-wi9-split { display: flex; height: 8px; gap: 2px; border-radius: 4px; overflow: hidden; margin-bottom: 10px; }
.hb-wi9-split i { height: 100%; transform-origin: left; animation: hb-wi9-bar 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: var(--hb-wi9-d, 0ms); transition: opacity 0.2s ease; }
.hb-wi9-split[data-hot="true"] i:not([data-on="true"]) { opacity: 0.25; }
.hb-wi9-src { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 12px; margin: 0; padding: 0; list-style: none; }
.hb-wi9-src li { display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: #a1a1a1; cursor: default; padding: 2px 0; }
.hb-wi9-src li i { width: 7px; height: 7px; border-radius: 2px; }
.hb-wi9-src li b { margin-left: auto; color: #ededed; font-weight: 500; font-variant-numeric: tabular-nums; }
.hb-wi9-cc { display: inline-grid; place-items: center; width: 22px; height: 15px; border-radius: 3px; background: #1c1c1c; border: 1px solid #2a2a2a; font-size: 8.5px; font-weight: 700; color: #a1a1a1; letter-spacing: 0.03em; margin-right: 8px; }
@container (max-width: 860px) {
  .hb-wi9-main { grid-template-columns: 1fr; }
  .hb-wi9-side { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
}
@container (max-width: 560px) {
  .hb-wi9 { padding: 14px; }
  .hb-wi9-kpis { grid-template-columns: 1fr 1fr; }
  .hb-wi9-kpi:nth-child(2) { border-right: 0; }
  .hb-wi9-kpi:nth-child(-n + 2) { border-bottom: 1px solid #1c1c1c; }
  .hb-wi9-chart { height: 190px; margin-left: 44px; }
  .hb-wi9-seg { margin-left: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wi9-line, .hb-wi9-area, .hb-wi9-row::before, .hb-wi9-split i, .hb-wi9-live i::after { animation: none; }
  .hb-wi9-kpi::after { transition: none; }
}
`;

export function DashboardAnalyticsCompact({
  site = "fieldnote.app",
  accent = "#2f7bff",
  range,
  defaultRange = "30d",
  onRangeChange,
  metric,
  defaultMetric = "visitors",
  onMetricChange,
  live = true,
  className,
  style,
  ...rest
}: DashboardAnalyticsCompactProps) {
  const [rInner, setRInner] = React.useState<CompactRange>(defaultRange);
  const [mInner, setMInner] = React.useState<CompactMetric>(defaultMetric);
  const [hover, setHover] = React.useState<number | null>(null);
  const [hotSrc, setHotSrc] = React.useState<string | null>(null);
  const [visitors, setVisitors] = React.useState(38);
  const chartRef = React.useRef<HTMLDivElement>(null);
  const r = range ?? rInner;
  const m = metric ?? mInner;
  const mi = Math.max(0, metrics.findIndex((x) => x.id === m));
  const meta = metrics[mi];

  React.useEffect(() => {
    if (!live) return;
    let k = 0;
    const id = window.setInterval(() => {
      k += 1;
      setVisitors((v) => Math.max(12, Math.min(90, Math.round(v + (hash(k * 31) - 0.48) * 8))));
    }, 2200);
    return () => window.clearInterval(id);
  }, [live]);

  const all = React.useMemo(
    () =>
      metrics.map((_, i) => {
        const cur = series(i, r, false);
        const prev = series(i, r, true);
        return { cur, prev, total: total(cur, metrics[i].unit), prevTotal: total(prev, metrics[i].unit) };
      }),
    [r],
  );

  const data = all[mi];
  const n = data.cur.length;
  const maxV = Math.max(...data.cur, ...data.prev) * 1.1;
  const minV = meta.unit === "n" ? 0 : Math.min(...data.cur, ...data.prev) * 0.85;
  const VW = 600;
  const VH = 250;
  const px = (i: number) => (i / Math.max(1, n - 1)) * VW;
  const py = (v: number) => VH - ((v - minV) / Math.max(1e-6, maxV - minV)) * VH;
  const linePts = data.cur.map((v, i) => [px(i), py(v)] as [number, number]);
  const prevPts = data.prev.map((v, i) => [px(i), py(v)] as [number, number]);
  const line = curve(linePts);
  const area = `${line} L${VW} ${VH} L0 ${VH} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => minV + (maxV - minV) * t);
  const dayLabel = (i: number) => {
    const back = n - 1 - i;
    if (back === 0) return "Today";
    if (back === 1) return "Yesterday";
    return `${back} days ago`;
  };
  const xIdx = [0, Math.round((n - 1) / 3), Math.round(((n - 1) * 2) / 3), n - 1];
  const pageTotal = all[1].total;
  const visitorTotal = all[0].total;
  const uid = React.useId().replace(/:/g, "");

  const setRange = (v: CompactRange) => {
    if (range === undefined) setRInner(v);
    setHover(null);
    onRangeChange?.(v);
  };
  const setMetric = (v: CompactMetric) => {
    if (metric === undefined) setMInner(v);
    onMetricChange?.(v);
  };

  return (
    <div {...rest} className={["hb-wi9", className].filter(Boolean).join(" ")} style={{ ...style, ["--hb-wi9-a" as string]: accent } as React.CSSProperties}>
      <style href="hb-dashboard-analytics-compact" precedence="default">{css}</style>
      <div className="hb-wi9-top">
        <div className="hb-wi9-site">
          <span className="hb-wi9-fav" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M2 10.5 5.2 6.8l2.4 2.2L12 3.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <b>{site}</b>
            <span>Last {rangeDays[r]} days vs previous period</span>
          </div>
        </div>
        {live ? (
          <span className="hb-wi9-live" aria-live="off">
            <i aria-hidden="true" />
            <b>{visitors}</b> on site now
          </span>
        ) : null}
        <div className="hb-wi9-seg" role="group" aria-label="Date range">
          {(Object.keys(rangeDays) as CompactRange[]).map((k) => (
            <button key={k} type="button" aria-pressed={r === k} onClick={() => setRange(k)}>
              {k === "7d" ? "7 days" : k === "30d" ? "30 days" : "90 days"}
            </button>
          ))}
        </div>
      </div>
      <div className="hb-wi9-main">
        <div className="hb-wi9-card">
          <div className="hb-wi9-kpis" role="tablist" aria-label="Metric">
            {metrics.map((k, i) => {
              const d = all[i];
              const change = ((d.total - d.prevTotal) / Math.max(1e-6, d.prevTotal)) * 100;
              const good = k.lowerBetter ? change <= 0 : change >= 0;
              return (
                <button
                  key={k.id}
                  type="button"
                  role="tab"
                  aria-selected={m === k.id}
                  aria-controls={`${uid}-chart`}
                  className="hb-wi9-kpi"
                  onClick={() => setMetric(k.id)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      const next = metrics[(i + (e.key === "ArrowRight" ? 1 : metrics.length - 1)) % metrics.length];
                      setMetric(next.id);
                      const sib = (e.currentTarget.parentElement?.children[metrics.indexOf(next)] as HTMLElement | undefined) ?? null;
                      sib?.focus();
                    }
                  }}
                >
                  <small>{k.label}</small>
                  <strong>{fmt(d.total, k.unit)}</strong>
                  <span className="hb-wi9-delta" data-good={good}>
                    <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true" style={{ transform: change >= 0 ? undefined : "rotate(180deg)" }}>
                      <path d="M5 1.5v7M2 4.5l3-3 3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {Math.abs(change).toFixed(1)}%<span>vs prev.</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div
            ref={chartRef}
            id={`${uid}-chart`}
            role="tabpanel"
            className="hb-wi9-chart"
            tabIndex={0}
            aria-label={`${meta.label} over the last ${rangeDays[r]} days. Use arrow keys to inspect days.`}
            onPointerMove={(e) => {
              const rc = chartRef.current?.getBoundingClientRect();
              if (!rc) return;
              setHover(Math.round(Math.min(1, Math.max(0, (e.clientX - rc.left) / rc.width)) * (n - 1)));
            }}
            onPointerLeave={() => setHover(null)}
            onBlur={() => setHover(null)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                setHover((h) => Math.min(n - 1, Math.max(0, (h ?? n - 1) + (e.key === "ArrowRight" ? 1 : -1))));
              }
            }}
          >
            <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none" role="img" aria-labelledby={`${uid}-t`} key={`${r}-${m}`}>
              <title id={`${uid}-t`}>{`${meta.label}: ${fmt(data.total, meta.unit)} over ${rangeDays[r]} days`}</title>
              <defs>
                <linearGradient id={`${uid}-g`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor={accent} stopOpacity="0.28" />
                  <stop offset="1" stopColor={accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              {ticks.map((t, i) => (
                <line key={i} className="hb-wi9-grid" x1={0} x2={VW} y1={py(t).toFixed(2)} y2={py(t).toFixed(2)} />
              ))}
              <path className="hb-wi9-area" d={area} fill={`url(#${uid}-g)`} />
              <path className="hb-wi9-prev" d={curve(prevPts)} />
              <path className="hb-wi9-line" d={line} />
            </svg>
            {ticks.map((t, i) => (
              <span key={i} className="hb-wi9-yl" style={{ top: `${((py(t) / VH) * 100).toFixed(2)}%` }}>
                {fmt(t, meta.unit)}
              </span>
            ))}
            {xIdx.map((i) => (
              <span key={i} className="hb-wi9-xl" style={{ left: `${((px(i) / VW) * 100).toFixed(2)}%`, transform: i === 0 ? "none" : i === n - 1 ? "translateX(-100%)" : undefined }}>
                {dayLabel(i)}
              </span>
            ))}
            {hover !== null ? (
              <>
                <span className="hb-wi9-cx" style={{ left: `${((px(hover) / VW) * 100).toFixed(2)}%` }} />
                <span className="hb-wi9-dot" style={{ left: `${((px(hover) / VW) * 100).toFixed(2)}%`, top: `${((py(data.cur[hover]) / VH) * 100).toFixed(2)}%` }} />
                <div className="hb-wi9-tip" style={{ left: `${((px(hover) / VW) * 100).toFixed(2)}%`, transform: hover > n * 0.6 ? "translateX(calc(-100% - 12px))" : "translateX(12px)" }}>
                  <small>{dayLabel(hover)}</small>
                  <div>
                    <i style={{ background: accent }} />
                    {fmt(data.cur[hover], meta.unit)}
                  </div>
                  <div style={{ color: "#8f8f8f" }}>
                    <i style={{ background: "#4a4a4a" }} />
                    {fmt(data.prev[hover], meta.unit)} previous
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div className="hb-wi9-legend" aria-hidden="true">
            <span>
              <i style={{ width: 14, height: 2, borderRadius: 1, background: accent, display: "inline-block" }} />
              This period
            </span>
            <span>
              <i style={{ width: 14, height: 0, borderTop: "1.5px dashed #4a4a4a", display: "inline-block" }} />
              Previous period
            </span>
          </div>
        </div>
        <div className="hb-wi9-side">
          <div className="hb-wi9-card hb-wi9-panel">
            <div className="hb-wi9-ph">
              <b>Top pages</b>
              <span>Views</span>
            </div>
            <ul className="hb-wi9-rows" key={r}>
              {pages.map((p, i) => (
                <li key={p.path} className="hb-wi9-row" style={{ ["--hb-wi9-w" as string]: `${(p.share * 100).toFixed(0)}%`, ["--hb-wi9-d" as string]: `${i * 60}ms` } as React.CSSProperties}>
                  <span>{p.path}</span>
                  <b>{fmt(pageTotal * p.share * 0.31, "n")}</b>
                </li>
              ))}
            </ul>
          </div>
          <div className="hb-wi9-card hb-wi9-panel">
            <div className="hb-wi9-ph">
              <b>Sources</b>
              <span>{fmt(visitorTotal, "n")} visitors</span>
            </div>
            <div className="hb-wi9-split" data-hot={hotSrc !== null} key={r} aria-hidden="true">
              {sources.map((s, i) => (
                <i key={s.name} data-on={hotSrc === s.name} style={{ width: `${(s.share * 100).toFixed(1)}%`, background: s.color, ["--hb-wi9-d" as string]: `${i * 70}ms` } as React.CSSProperties} />
              ))}
            </div>
            <ul className="hb-wi9-src">
              {sources.map((s) => (
                <li key={s.name} onPointerEnter={() => setHotSrc(s.name)} onPointerLeave={() => setHotSrc(null)}>
                  <i style={{ background: s.color }} />
                  {s.name}
                  <b>{(s.share * 100).toFixed(0)}%</b>
                </li>
              ))}
            </ul>
          </div>
          <div className="hb-wi9-card hb-wi9-panel">
            <div className="hb-wi9-ph">
              <b>Countries</b>
              <span>Share</span>
            </div>
            <ul className="hb-wi9-rows" key={`c-${r}`}>
              {countries.map((c, i) => (
                <li key={c.code} className="hb-wi9-row" style={{ ["--hb-wi9-w" as string]: `${((c.share / countries[0].share) * 100).toFixed(0)}%`, ["--hb-wi9-d" as string]: `${i * 60}ms` } as React.CSSProperties}>
                  <span>
                    <span className="hb-wi9-cc">{c.code}</span>
                    {c.name}
                  </span>
                  <b>{(c.share * 100).toFixed(0)}%</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
