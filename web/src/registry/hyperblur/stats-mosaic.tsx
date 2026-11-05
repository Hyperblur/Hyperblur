"use client";

import * as React from "react";

export type StatsMosaicVisual = "area" | "bars" | "dots" | "gauge" | "faces" | "stars";

export interface StatsMosaicItem {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  detail: string;
  visual: StatsMosaicVisual;
}

export interface StatsMosaicProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: StatsMosaicItem[];
  duration?: number;
  accent?: string;
}

const defaultItems: StatsMosaicItem[] = [
  { label: "Events processed every month", value: 2.4, decimals: 1, suffix: "B", detail: "Up 38% since January", visual: "area" },
  { label: "Uptime, last 90 days", value: 99.995, decimals: 3, suffix: "%", detail: "One 4 minute incident", visual: "bars" },
  { label: "Countries with active teams", value: 184, detail: "From Reykjavik to Wellington", visual: "dots" },
  { label: "Median query latency", value: 41, suffix: "ms", detail: "p95 under 120ms", visual: "gauge" },
  { label: "Teams building on Pulse", value: 12800, detail: "Including 61 of the Fortune 500", visual: "faces" },
  { label: "Average review score", value: 4.9, decimals: 1, suffix: "/5", detail: "From 3,214 reviews", visual: "stars" },
];

const css = `
.hb-yib {
  --hb-yib-accent: #22d3ee;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yib *, .hb-yib *::before, .hb-yib *::after { box-sizing: border-box; }
.hb-yib-inner { max-width: 1120px; margin: 0 auto; padding: 72px 20px 80px; }
.hb-yib-head { display: grid; gap: 14px; margin-bottom: 40px; }
.hb-yib-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0; font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: #8f8f8f; }
.hb-yib-eyebrow::before { content: ""; width: 6px; height: 6px; border-radius: 1px; background: var(--hb-yib-accent); box-shadow: 0 0 12px var(--hb-yib-accent); }
.hb-yib-title { margin: 0; font-size: clamp(30px, 5cqi, 54px); line-height: 1.02; letter-spacing: -.045em; font-weight: 600; max-width: 16ch; }
.hb-yib-sub { margin: 0; max-width: 440px; font-size: 15px; line-height: 1.6; color: #8f8f8f; }
.hb-yib-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
.hb-yib-tile {
  position: relative; display: flex; flex-direction: column; min-height: 230px; padding: 22px; border-radius: 20px; overflow: hidden;
  background: linear-gradient(180deg, #131313, #0e0e0e); border: 1px solid rgba(255, 255, 255, .08);
  box-shadow: 0 1px 0 rgba(255, 255, 255, .05) inset; transition: border-color .3s, transform .3s;
  animation: hb-yib-rise .7s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-yib-i) * 80ms);
}
.hb-yib-tile:hover { border-color: rgba(255, 255, 255, .16); }
.hb-yib-tile::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .4s;
  background: radial-gradient(400px circle at 50% 0%, color-mix(in srgb, var(--hb-yib-accent) 12%, transparent), transparent 60%);
}
.hb-yib-tile:hover::before { opacity: 1; }
.hb-yib-num { position: relative; margin: 0; font-size: clamp(36px, 4.4cqi, 52px); line-height: 1; letter-spacing: -.045em; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-yib-num small { font-size: .5em; letter-spacing: -.02em; color: #8f8f8f; margin-left: 2px; }
.hb-yib-label { position: relative; margin: 10px 0 0; font-size: 14px; color: #c9c9c9; }
.hb-yib-detail { position: relative; margin: 4px 0 0; font-size: 12px; color: #6f6f6f; }
.hb-yib-vis { position: relative; margin-top: auto; padding-top: 18px; }
.hb-yib-area { display: block; width: 100%; height: 120px; overflow: visible; }
.hb-yib-line { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hb-yib-draw 2s .3s cubic-bezier(.4, 0, .2, 1) forwards; }
.hb-yib-fill { opacity: 0; animation: hb-yib-fade 1.2s 1.2s ease forwards; }
.hb-yib-pulse { animation: hb-yib-blip 2s 2.2s ease-out infinite; transform-box: fill-box; transform-origin: center; opacity: 0; }
.hb-yib-bars { display: flex; align-items: flex-end; gap: 3px; height: 54px; }
.hb-yib-bar { flex: 1; height: 100%; border-radius: 2px; background: color-mix(in srgb, #4ade80 75%, #0a0a0a); transform-origin: bottom; animation: hb-yib-grow .5s cubic-bezier(.3, 1.4, .5, 1) both; animation-delay: calc(300ms + var(--hb-yib-b) * 22ms); }
.hb-yib-bar[data-bad="true"] { background: #f59e0b; height: 70%; }
.hb-yib-barlbl { display: flex; justify-content: space-between; margin-top: 8px; font-size: 11px; color: #5f5f5f; }
.hb-yib-dots { display: grid; grid-template-columns: repeat(14, minmax(0, 1fr)); gap: 5px; }
.hb-yib-dot { aspect-ratio: 1; border-radius: 50%; background: #222; }
.hb-yib-dot[data-on="true"] { background: var(--hb-yib-accent); animation: hb-yib-glow 3.2s ease-in-out infinite; animation-delay: calc(var(--hb-yib-d) * 1ms); }
.hb-yib-gauge { display: block; width: 100%; max-width: 220px; height: auto; margin: 0 auto; }
.hb-yib-arc { stroke-dasharray: 100; stroke-dashoffset: 100; animation: hb-yib-arc 1.6s .4s cubic-bezier(.2, .8, .2, 1) forwards; }
.hb-yib-needle { transform-origin: 60px 60px; transform: rotate(-90deg); animation: hb-yib-needle 1.6s .4s cubic-bezier(.3, 1.3, .5, 1) forwards; }
.hb-yib-faces { display: grid; gap: 8px; mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); }
.hb-yib-track { display: flex; gap: 8px; width: max-content; animation: hb-yib-slide 26s linear infinite; }
.hb-yib-track[data-rev="true"] { animation-direction: reverse; animation-duration: 32s; }
.hb-yib-face { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 11px; flex: none; font-size: 12px; font-weight: 600; color: #0a0a0a; }
.hb-yib-stars { display: flex; gap: 6px; }
.hb-yib-star { position: relative; width: 26px; height: 26px; }
.hb-yib-star svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-yib-star span { position: absolute; inset: 0; overflow: hidden; width: 0; animation: hb-yib-fillx .5s cubic-bezier(.3, 1.2, .5, 1) forwards; animation-delay: calc(400ms + var(--hb-yib-s) * 140ms); }
.hb-yib-star span svg { width: 26px; height: 26px; }
.hb-yib-dist { display: grid; gap: 5px; margin-top: 14px; }
.hb-yib-dist div { display: grid; grid-template-columns: 14px minmax(0, 1fr) 34px; align-items: center; gap: 8px; font-size: 11px; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-yib-dist i { display: block; height: 5px; border-radius: 3px; background: #1f1f1f; overflow: hidden; }
.hb-yib-dist b { display: block; height: 100%; border-radius: 3px; background: #fbbf24; transform-origin: left; animation: hb-yib-growx .9s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(600ms + var(--hb-yib-s) * 90ms); }
.hb-yib-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-yib-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
@keyframes hb-yib-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-yib-fade { to { opacity: 1; } }
@keyframes hb-yib-blip { 0% { opacity: .9; transform: scale(1); } 100% { opacity: 0; transform: scale(3.2); } }
@keyframes hb-yib-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-yib-growx { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-yib-glow { 0%, 100% { opacity: .35; transform: scale(.8); } 50% { opacity: 1; transform: scale(1); box-shadow: 0 0 10px var(--hb-yib-accent); } }
@keyframes hb-yib-arc { to { stroke-dashoffset: var(--hb-yib-arc-end); } }
@keyframes hb-yib-needle { to { transform: rotate(var(--hb-yib-angle)); } }
@keyframes hb-yib-slide { to { transform: translateX(-50%); } }
@keyframes hb-yib-fillx { to { width: var(--hb-yib-w); } }
@container (min-width: 620px) {
  .hb-yib-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-yib-tile[data-wide="true"] { grid-column: span 2; }
}
@container (min-width: 900px) {
  .hb-yib-inner { padding: 104px 32px 112px; }
  .hb-yib-head { grid-template-columns: minmax(0, 1fr) minmax(0, 440px); align-items: end; }
  .hb-yib-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
  .hb-yib-tile { min-height: 250px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yib-tile, .hb-yib-line, .hb-yib-fill, .hb-yib-pulse, .hb-yib-bar, .hb-yib-dot[data-on="true"], .hb-yib-arc, .hb-yib-needle, .hb-yib-track, .hb-yib-star span, .hb-yib-dist b { animation: none; }
  .hb-yib-line { stroke-dashoffset: 0; }
  .hb-yib-fill { opacity: 1; }
  .hb-yib-arc { stroke-dashoffset: var(--hb-yib-arc-end); }
  .hb-yib-needle { transform: rotate(var(--hb-yib-angle)); }
  .hb-yib-star span { width: var(--hb-yib-w); }
  .hb-yib-tile, .hb-yib-tile::before { transition: none; }
}
`;

function hash(n: number) {
  let x = (n ^ 0x2c1b3c6d) >>> 0;
  x = Math.imul(x ^ (x >>> 12), 0x297a2d39) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x85ebca6b) >>> 0;
  return (x ^ (x >>> 13)) >>> 0;
}

function format(v: number, decimals: number) {
  const fixed = v.toFixed(decimals);
  const [whole, frac] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return frac ? `${grouped}.${frac}` : grouped;
}

function useProgress(duration: number) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let start = 0;
    const step = (t: number) => {
      if (reduce) {
        setP(1);
        return;
      }
      if (!start) start = t;
      const k = Math.min(1, (t - start) / duration);
      setP(1 - Math.pow(1 - k, 4));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration]);
  return p;
}

const areaPoints = [18, 22, 20, 28, 26, 34, 31, 40, 38, 47, 44, 55, 52, 63, 61, 72, 70, 84];

function Area({ id }: { id: string }) {
  const w = 400;
  const h = 120;
  const max = 90;
  const pts = areaPoints.map((v, i) => [(i / (areaPoints.length - 1)) * w, h - (v / max) * h] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  return (
    <svg className="hb-yib-area" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--hb-yib-accent)" stopOpacity=".35" />
          <stop offset="1" stopColor="var(--hb-yib-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={w} y1={(h * g).toFixed(1)} y2={(h * g).toFixed(1)} stroke="rgba(255,255,255,.05)" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
      ))}
      <path className="hb-yib-fill" d={`${d} L${w} ${h} L0 ${h} Z`} fill={`url(#${id}-g)`} />
      <path className="hb-yib-line" d={d} fill="none" stroke="var(--hb-yib-accent)" strokeWidth="2.5" strokeLinejoin="round" pathLength={1} vectorEffect="non-scaling-stroke" />
      <circle className="hb-yib-pulse" cx={last[0].toFixed(1)} cy={last[1].toFixed(1)} r="4" fill="var(--hb-yib-accent)" />
    </svg>
  );
}

function Bars() {
  return (
    <>
      <div className="hb-yib-bars" aria-hidden="true">
        {Array.from({ length: 36 }, (_, i) => (
          <span key={i} className="hb-yib-bar" data-bad={i === 23} style={{ "--hb-yib-b": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="hb-yib-barlbl" aria-hidden="true">
        <span>90 days ago</span>
        <span>Today</span>
      </div>
    </>
  );
}

function Dots() {
  return (
    <div className="hb-yib-dots" aria-hidden="true">
      {Array.from({ length: 70 }, (_, i) => {
        const on = hash(i * 31 + 7) % 100 < 58;
        return <span key={i} className="hb-yib-dot" data-on={on} style={{ "--hb-yib-d": ((i % 14) * 120 + Math.floor(i / 14) * 90).toFixed(0) } as React.CSSProperties} />;
      })}
    </div>
  );
}

function Gauge({ value }: { value: number }) {
  const ratio = Math.max(0, Math.min(1, 1 - value / 200));
  const end = (100 - ratio * 100).toFixed(1);
  const angle = (-90 + ratio * 180).toFixed(1);
  return (
    <svg className="hb-yib-gauge" viewBox="0 0 120 68" aria-hidden="true" style={{ "--hb-yib-arc-end": end, "--hb-yib-angle": `${angle}deg` } as React.CSSProperties}>
      <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="#222" strokeWidth="9" strokeLinecap="round" />
      <path className="hb-yib-arc" d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="var(--hb-yib-accent)" strokeWidth="9" strokeLinecap="round" pathLength={100} />
      <g className="hb-yib-needle">
        <line x1="60" y1="60" x2="60" y2="20" stroke="#ededed" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <circle cx="60" cy="60" r="5" fill="#ededed" />
      <text x="10" y="68" fill="#5f5f5f" fontSize="7">200ms</text>
      <text x="110" y="68" fill="#5f5f5f" fontSize="7" textAnchor="end">0ms</text>
    </svg>
  );
}

const faceNames = ["AK", "MR", "JL", "SO", "TP", "EV", "NB", "HC", "DW", "LF", "QI", "RY"];
const faceColors = ["#22d3ee", "#a78bfa", "#fbbf24", "#4ade80", "#f472b6", "#60a5fa", "#fb923c"];

function Faces() {
  const row = (offset: number) => [...faceNames, ...faceNames].map((n, i) => ({ n, c: faceColors[(i + offset) % faceColors.length] }));
  return (
    <div className="hb-yib-faces" aria-hidden="true">
      {[0, 3].map((o) => (
        <div key={o} className="hb-yib-track" data-rev={o > 0}>
          {row(o).map((f, i) => (
            <span key={i} className="hb-yib-face" style={{ background: f.c }}>
              {f.n}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function Stars({ value }: { value: number }) {
  const path = "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z";
  const dist = [82, 12, 4, 1, 1];
  return (
    <div aria-hidden="true">
      <div className="hb-yib-stars">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, value - i));
          return (
            <span key={i} className="hb-yib-star" style={{ "--hb-yib-s": i, "--hb-yib-w": `${(fill * 100).toFixed(0)}%` } as React.CSSProperties}>
              <svg viewBox="0 0 24 24" fill="#222">
                <path d={path} />
              </svg>
              <span>
                <svg viewBox="0 0 24 24" fill="#fbbf24">
                  <path d={path} />
                </svg>
              </span>
            </span>
          );
        })}
      </div>
      <div className="hb-yib-dist">
        {dist.map((d, i) => (
          <div key={i} style={{ "--hb-yib-s": i } as React.CSSProperties}>
            <span>{5 - i}</span>
            <i>
              <b style={{ width: `${d}%` }} />
            </i>
            <span>{`${d}%`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsMosaic({
  eyebrow = "By the numbers",
  title = "Small team. Very large numbers.",
  subtitle = "Pulse handles analytics for product teams in 184 countries. Here is what the last quarter looked like.",
  items = defaultItems,
  duration = 1800,
  accent = "#22d3ee",
  className = "",
  style,
  ...rest
}: StatsMosaicProps) {
  const p = useProgress(duration);
  const id = React.useId().replace(/:/g, "");
  const wide = (v: StatsMosaicVisual) => v === "area" || v === "faces";
  const vars = { "--hb-yib-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-yib ${className}`} style={vars} {...rest}>
      <style href="hb-stats-mosaic" precedence="default">{css}</style>
      <div className="hb-yib-inner">
        <div className="hb-yib-head">
          <div>
            {eyebrow ? <p className="hb-yib-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-yib-title" style={{ marginTop: eyebrow ? 14 : 0 }}>{title}</h2>
          </div>
          {subtitle ? <p className="hb-yib-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-yib-grid">
          {items.map((it, i) => {
            const decimals = it.decimals ?? 0;
            const shown = format(it.value * p, decimals);
            return (
              <div key={it.label} className="hb-yib-tile" data-wide={wide(it.visual)} style={{ "--hb-yib-i": i } as React.CSSProperties}>
                <p className="hb-yib-num">
                  <span className="hb-yib-sr">
                    {`${it.prefix ?? ""}${format(it.value, decimals)}${it.suffix ?? ""}`}
                  </span>
                  <span aria-hidden="true">
                    {it.prefix}
                    {shown}
                    {it.suffix ? <small>{it.suffix}</small> : null}
                  </span>
                </p>
                <p className="hb-yib-label">{it.label}</p>
                <p className="hb-yib-detail">{it.detail}</p>
                <div className="hb-yib-vis">
                  {it.visual === "area" ? <Area id={`${id}-${i}`} /> : null}
                  {it.visual === "bars" ? <Bars /> : null}
                  {it.visual === "dots" ? <Dots /> : null}
                  {it.visual === "gauge" ? <Gauge value={it.value} /> : null}
                  {it.visual === "faces" ? <Faces /> : null}
                  {it.visual === "stars" ? <Stars value={it.value} /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
