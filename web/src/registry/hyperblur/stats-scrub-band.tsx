"use client";

import * as React from "react";

export interface ScrubMetric {
  label: string;
  base: number;
  trend: number;
  volatility?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  lowerIsBetter?: boolean;
}

export interface StatsScrubBandProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  metrics?: ScrubMetric[];
  ranges?: number[];
  defaultRange?: number;
  endDate?: string;
  accent?: string;
  onRangeChange?: (days: number) => void;
}

const css = `
.hb-wb7 {
  --hb-wb7-accent: #2f7bff;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wb7 *, .hb-wb7 *::before, .hb-wb7 *::after { box-sizing: border-box; }
.hb-wb7-wrap { max-width: 1180px; margin: 0 auto; padding: 88px 24px 96px; }
.hb-wb7-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 28px; }
.hb-wb7-eyebrow { display: flex; align-items: center; gap: 8px; margin: 0 0 12px; color: #8f8f8f; font-size: 13px; }
.hb-wb7-live { position: relative; width: 8px; height: 8px; border-radius: 50%; background: #22c55e; }
.hb-wb7-live::after { content: ""; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid #22c55e; animation: hb-wb7-ping 2s cubic-bezier(.2, .8, .2, 1) infinite; }
.hb-wb7-title { margin: 0; max-width: 560px; font-size: clamp(26px, 3.6cqw, 40px); font-weight: 600; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-wb7-seg { position: relative; display: inline-flex; padding: 3px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 999px; background: #121212; }
.hb-wb7-seg button {
  position: relative;
  z-index: 1;
  min-width: 52px;
  padding: 7px 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: color .25s ease;
}
.hb-wb7-seg button[aria-pressed="true"] { color: #0a0a0a; }
.hb-wb7-seg button:focus-visible { outline: 2px solid var(--hb-wb7-accent); outline-offset: 2px; }
.hb-wb7-thumb { position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc((100% - 6px) / var(--hb-wb7-n)); border-radius: 999px; background: #ededed; transform: translateX(calc(var(--hb-wb7-r) * 100%)); transition: transform .45s cubic-bezier(.2, .8, .2, 1); }
.hb-wb7-band {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--hb-wb7-cols, 4), minmax(0, 1fr));
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background: linear-gradient(180deg, #121212, #0d0d0d);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 40px 80px -40px rgba(0, 0, 0, .9);
  overflow: hidden;
  cursor: crosshair;
  touch-action: pan-y;
}
.hb-wb7-band:focus-visible { outline: 2px solid var(--hb-wb7-accent); outline-offset: 3px; }
.hb-wb7-date {
  position: absolute;
  top: 14px;
  right: 16px;
  padding: 3px 9px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: #1a1a1a;
  color: #a1a1a1;
  font-size: 11.5px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-variant-numeric: tabular-nums;
  z-index: 2;
}
.hb-wb7-date b { color: #ededed; font-weight: 500; }
.hb-wb7-cell { position: relative; min-width: 0; padding: 22px 22px 0; border-left: 1px solid rgba(255, 255, 255, .07); }
.hb-wb7-cell:first-child { border-left: 0; }
.hb-wb7-label { margin: 0; color: #8f8f8f; font-size: 13px; font-weight: 500; }
.hb-wb7-row { display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 10px; margin-top: 10px; }
.hb-wb7-val { font-size: clamp(26px, 3cqw, 34px); font-weight: 600; line-height: 1; letter-spacing: -.04em; font-variant-numeric: tabular-nums; }
.hb-wb7-delta { display: inline-flex; align-items: center; gap: 3px; padding: 2px 7px; border-radius: 999px; font-size: 11.5px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-wb7-delta[data-good="true"] { color: #4ade80; background: rgba(74, 222, 128, .1); }
.hb-wb7-delta[data-good="false"] { color: #f87171; background: rgba(248, 113, 113, .1); }
.hb-wb7-spark { display: block; width: calc(100% + 44px); height: 92px; margin: 18px -22px 0; overflow: visible; }
.hb-wb7-area { opacity: 0; animation: hb-wb7-fade .9s .35s ease both; }
.hb-wb7-line { fill: none; stroke: var(--hb-wb7-accent); stroke-width: 1.6; stroke-linejoin: round; stroke-linecap: round; vector-effect: non-scaling-stroke; stroke-dasharray: 1; stroke-dashoffset: 1; animation: hb-wb7-draw 1.2s cubic-bezier(.65, 0, .35, 1) forwards; animation-delay: calc(var(--hb-wb7-i) * 90ms); }
.hb-wb7-end { position: absolute; width: 8px; height: 8px; margin: -4px 0 0 -4px; border-radius: 50%; background: var(--hb-wb7-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-wb7-accent) 25%, transparent); pointer-events: none; animation: hb-wb7-fade .4s 1.2s both; }
.hb-wb7-dotwrap { position: absolute; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 50%; background: #0a0a0a; border: 2px solid var(--hb-wb7-accent); pointer-events: none; }
.hb-wb7-xline { position: absolute; top: 0; bottom: 0; width: 1px; background: linear-gradient(180deg, transparent, rgba(255, 255, 255, .28) 30%, rgba(255, 255, 255, .28)); pointer-events: none; }
.hb-wb7-foot { display: flex; justify-content: space-between; gap: 16px; margin-top: 14px; color: #6f6f6f; font-size: 12px; }
.hb-wb7-foot kbd { padding: 1px 5px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 4px; background: #151515; color: #a1a1a1; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; }
.hb-wb7-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-wb7-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-wb7-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-wb7-ping { from { transform: scale(.6); opacity: 1; } to { transform: scale(1.8); opacity: 0; } }
@container (max-width: 860px) {
  .hb-wb7-band { --hb-wb7-cols: 2; }
  .hb-wb7-cell:nth-child(odd of .hb-wb7-cell) { border-left: 0; }
  .hb-wb7-cell:nth-child(n+3 of .hb-wb7-cell) { border-top: 1px solid rgba(255, 255, 255, .07); }
  .hb-wb7-top { flex-direction: column; align-items: flex-start; }
}
@container (max-width: 460px) {
  .hb-wb7-wrap { padding: 64px 16px 72px; }
  .hb-wb7-band { --hb-wb7-cols: 1; }
  .hb-wb7-cell { border-left: 0; }
  .hb-wb7-cell:nth-child(n+2 of .hb-wb7-cell) { border-top: 1px solid rgba(255, 255, 255, .07); }
  .hb-wb7-spark { height: 70px; }
  .hb-wb7-foot span:last-child { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wb7-live::after { animation: none; }
  .hb-wb7-line { animation: none; stroke-dashoffset: 0; }
  .hb-wb7-area, .hb-wb7-end { animation: none; opacity: 1; }
  .hb-wb7-thumb, .hb-wb7-seg button { transition: none; }
}
`;

const defaultMetrics: ScrubMetric[] = [
  { label: "Monthly recurring revenue", base: 182400, trend: 0.22, volatility: 0.025, prefix: "$" },
  { label: "Active workspaces", base: 8120, trend: 0.16, volatility: 0.03 },
  { label: "Net revenue retention", base: 112.4, trend: 0.035, volatility: 0.006, suffix: "%", decimals: 1 },
  { label: "Median time to value", base: 3.9, trend: -0.28, volatility: 0.04, suffix: " days", decimals: 1, lowerIsBetter: true },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function daysIn(y: number, m: number) {
  if (m === 1) return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0) ? 29 : 28;
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];
}

function shift(iso: string, back: number) {
  const [ys, ms, ds] = iso.split("-");
  let y = Number(ys) || 2026;
  let m = (Number(ms) || 1) - 1;
  let d = Number(ds) || 1;
  let k = back;
  while (k > 0) {
    if (d > k) {
      d -= k;
      k = 0;
    } else {
      k -= d;
      m -= 1;
      if (m < 0) {
        m = 11;
        y -= 1;
      }
      d = daysIn(y, m);
    }
  }
  return `${months[m]} ${d}`;
}

function rnd(seed: number) {
  let x = (seed + 0x9e3779b9) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35) >>> 0;
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

function series(m: ScrubMetric, mi: number, days: number) {
  const vol = m.volatility ?? 0.03;
  const out: number[] = [];
  let walk = 0;
  for (let i = 0; i < days; i += 1) {
    const x = days === 1 ? 1 : i / (days - 1);
    walk = walk * 0.6 + (rnd(mi * 1000 + days * 7 + i) - 0.5) * 2 * vol;
    const span = m.trend * (days / 90);
    out.push(m.base * (1 - span + span * x + walk));
  }
  out[days - 1] = m.base;
  return out;
}

function fmt(m: ScrubMetric, v: number) {
  const dec = m.decimals ?? 0;
  const s = v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  return `${m.prefix ?? ""}${s}${m.suffix ?? ""}`;
}

export function StatsScrubBand({
  eyebrow = "Updated every 15 minutes",
  title = "Growth you can scrub through, day by day",
  metrics = defaultMetrics,
  ranges = [7, 30, 90],
  defaultRange = 1,
  endDate = "2026-11-07",
  accent = "#2f7bff",
  onRangeChange,
  className = "",
  style,
  ...rest
}: StatsScrubBandProps) {
  const uid = React.useId();
  const [r, setR] = React.useState(Math.max(0, Math.min(defaultRange, ranges.length - 1)));
  const [hover, setHover] = React.useState<number | null>(null);
  const days = Math.max(2, ranges[r] ?? 30);
  const data = React.useMemo(() => metrics.map((m, i) => series(m, i, days)), [metrics, days]);
  const at = hover === null ? days - 1 : hover;

  const W = 200;
  const H = 60;
  const xs = (i: number) => (i / (days - 1)) * W;

  const pick = (e: React.PointerEvent<HTMLDivElement>) => {
    const cell = (e.target as HTMLElement).closest("[data-cell]") as HTMLElement | null;
    if (!cell) return;
    const b = cell.getBoundingClientRect();
    const f = Math.max(0, Math.min(1, (e.clientX - b.left) / Math.max(b.width, 1)));
    setHover(Math.round(f * (days - 1)));
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setHover(Math.max(0, at - 1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setHover(Math.min(days - 1, at + 1));
    } else if (e.key === "Escape" || e.key === "End") {
      setHover(null);
    } else if (e.key === "Home") {
      setHover(0);
    }
  };

  const choose = (i: number) => {
    setR(i);
    setHover(null);
    onRangeChange?.(ranges[i]);
  };

  const vars = { "--hb-wb7-accent": accent, "--hb-wb7-n": ranges.length, "--hb-wb7-r": r, ...style } as React.CSSProperties;
  const dateLabel = shift(endDate, days - 1 - at);

  return (
    <section className={`hb-wb7 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-stats-scrub-band" precedence="default">{css}</style>
      <div className="hb-wb7-wrap">
        <div className="hb-wb7-top">
          <div>
            <p className="hb-wb7-eyebrow"><span className="hb-wb7-live" aria-hidden="true" />{eyebrow}</p>
            <h2 id={`${uid}-t`} className="hb-wb7-title">{title}</h2>
          </div>
          <div className="hb-wb7-seg" role="group" aria-label="Time range">
            <span className="hb-wb7-thumb" aria-hidden="true" />
            {ranges.map((d, i) => (
              <button key={d} type="button" aria-pressed={i === r} onClick={() => choose(i)}>{`${d}D`}</button>
            ))}
          </div>
        </div>
        <div
          className="hb-wb7-band"
          tabIndex={0}
          role="group"
          aria-label={`Metrics for ${dateLabel}. Use the arrow keys to move through days.`}
          onPointerMove={pick}
          onPointerDown={pick}
          onPointerLeave={() => setHover(null)}
          onKeyDown={onKey}
          onBlur={() => setHover(null)}
        >
          <span className="hb-wb7-date" aria-live="polite">
            {hover === null ? <><b>Today</b>{` ${dateLabel}`}</> : <b>{dateLabel}</b>}
          </span>
          {metrics.map((m, mi) => {
            const s = data[mi];
            const min = Math.min(...s);
            const max = Math.max(...s);
            const ys = (v: number) => H - 6 - ((v - min) / Math.max(max - min, 1e-9)) * (H - 16);
            const line = s.map((v, i) => `${i ? "L" : "M"}${xs(i).toFixed(2)} ${ys(v).toFixed(2)}`).join(" ");
            const area = `${line} L${W} ${H} L0 ${H} Z`;
            const v = s[at];
            const first = s[0];
            const pct = ((v - first) / Math.max(Math.abs(first), 1e-9)) * 100;
            const good = m.lowerIsBetter ? pct <= 0 : pct >= 0;
            const gid = `${uid.replace(/[^a-zA-Z0-9]/g, "")}-g${mi}`;
            const px = (at / (days - 1)) * 100;
            const py = (ys(v) / H) * 100;
            return (
              <div key={`${m.label}-${mi}`} className="hb-wb7-cell" data-cell="">
                <p className="hb-wb7-label">{m.label}</p>
                <div className="hb-wb7-row">
                  <span className="hb-wb7-val">{fmt(m, v)}</span>
                  <span className="hb-wb7-delta" data-good={good}>
                    {`${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`}
                  </span>
                </div>
                <div style={{ position: "relative" }}>
                  <svg key={days} className="hb-wb7-spark" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" style={{ "--hb-wb7-i": mi } as React.CSSProperties}>
                    <defs>
                      <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor={accent} stopOpacity=".28" />
                        <stop offset="1" stopColor={accent} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="hb-wb7-area" d={area} fill={`url(#${gid})`} />
                    <path className="hb-wb7-line" d={line} pathLength={1} />
                  </svg>
                  <div style={{ position: "absolute", inset: "18px -22px 0" }} aria-hidden="true">
                    {hover !== null ? (
                      <>
                        <span className="hb-wb7-xline" style={{ left: `${px.toFixed(2)}%` }} />
                        <span className="hb-wb7-dotwrap" style={{ left: `${px.toFixed(2)}%`, top: `${py.toFixed(2)}%` }} />
                      </>
                    ) : (
                      <span key={days} className="hb-wb7-end" style={{ left: "100%", top: `${py.toFixed(2)}%` }} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="hb-wb7-foot">
          <span>{`Change measured from ${shift(endDate, days - 1)}`}</span>
          <span>Hover or use <kbd>Left</kbd> <kbd>Right</kbd> to scrub every metric at once</span>
        </div>
      </div>
    </section>
  );
}
