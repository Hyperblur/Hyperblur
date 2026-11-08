"use client";

import * as React from "react";

export interface ArcStat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  progress: number;
  caption?: string;
}

export interface StatsArcGridProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  feature?: ArcStat;
  stats?: ArcStat[];
  duration?: number;
  accent?: string;
}

const css = `
.hb-wb8 {
  --hb-wb8-accent: #a3e635;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wb8 *, .hb-wb8 *::before, .hb-wb8 *::after { box-sizing: border-box; }
.hb-wb8-wrap { max-width: 1120px; margin: 0 auto; padding: 80px 24px 96px; }
.hb-wb8-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; margin-bottom: 32px; }
.hb-wb8-eyebrow { margin: 0 0 12px; color: var(--hb-wb8-accent); font-size: 12px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; font-family: var(--font-mono, ui-monospace, monospace); }
.hb-wb8-title { margin: 0; max-width: 540px; font-size: clamp(28px, 3.8cqw, 42px); font-weight: 600; line-height: 1.04; letter-spacing: -.04em; text-wrap: balance; }
.hb-wb8-sub { margin: 0; max-width: 320px; color: #8f8f8f; font-size: 14.5px; line-height: 1.6; }
.hb-wb8-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) repeat(2, minmax(0, 1fr)); grid-auto-rows: minmax(190px, auto); gap: 12px; margin: 0; padding: 0; list-style: none; }
.hb-wb8-tile {
  position: relative;
  min-width: 0;
  overflow: hidden;
  padding: 22px 22px 20px;
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 20px;
  background: radial-gradient(120% 120% at 100% 100%, color-mix(in srgb, var(--hb-wb8-accent) 7%, #111), #0f0f0f 60%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
  transition: border-color .4s ease, transform .5s cubic-bezier(.2, .8, .2, 1);
}
.hb-wb8-tile:hover { border-color: color-mix(in srgb, var(--hb-wb8-accent) 30%, rgba(255, 255, 255, .08)); transform: translateY(-2px); }
.hb-wb8-tile[data-big] { grid-row: span 2; padding: 28px; background: radial-gradient(90% 70% at 50% 100%, color-mix(in srgb, var(--hb-wb8-accent) 12%, #111), #0f0f0f 70%); }
.hb-wb8-arc { position: absolute; right: 0; bottom: 0; width: 56%; aspect-ratio: 1; pointer-events: none; }
.hb-wb8-tile[data-big] .hb-wb8-arc { left: 50%; right: auto; bottom: -2px; width: 92%; aspect-ratio: 2; transform: translateX(-50%); }
.hb-wb8-seg { fill: #1d1d1d; transition: fill .25s ease, filter .3s ease; }
.hb-wb8-seg[data-on="true"] { fill: var(--hb-wb8-accent); }
.hb-wb8-tile:hover .hb-wb8-seg[data-on="true"] { filter: drop-shadow(0 0 4px color-mix(in srgb, var(--hb-wb8-accent) 70%, transparent)); }
.hb-wb8-copy { position: relative; z-index: 1; }
.hb-wb8-num { display: flex; align-items: baseline; font-size: clamp(34px, 4.2cqw, 48px); font-weight: 600; line-height: 1; letter-spacing: -.05em; font-variant-numeric: tabular-nums; }
.hb-wb8-tile[data-big] .hb-wb8-num { font-size: clamp(52px, 7.4cqw, 88px); }
.hb-wb8-num small { margin-left: 3px; color: #8f8f8f; font-size: .48em; letter-spacing: -.02em; }
.hb-wb8-label { margin: 10px 0 0; max-width: 54%; font-size: 13.5px; font-weight: 500; line-height: 1.35; }
.hb-wb8-tile[data-big] .hb-wb8-label { max-width: 300px; font-size: 16px; }
.hb-wb8-cap { position: absolute; left: 22px; bottom: 18px; z-index: 1; max-width: 48%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-flex; align-items: center; gap: 6px; color: #8f8f8f; font-size: 12px; font-family: var(--font-mono, ui-monospace, monospace); font-variant-numeric: tabular-nums; }
.hb-wb8-cap i { width: 6px; height: 6px; border-radius: 2px; background: var(--hb-wb8-accent); }
.hb-wb8-tile[data-big] .hb-wb8-cap { max-width: none; left: 50%; bottom: 22px; transform: translateX(-50%); padding: 4px 10px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 999px; background: rgba(10, 10, 10, .7); white-space: nowrap; }
.hb-wb8-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 860px) {
  .hb-wb8-head { flex-direction: column; align-items: flex-start; gap: 14px; }
  .hb-wb8-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-wb8-tile[data-big] { grid-column: span 2; grid-row: auto; min-height: 340px; }
  .hb-wb8-tile[data-big] .hb-wb8-arc { width: min(92%, 520px); }
}
@container (max-width: 460px) {
  .hb-wb8-wrap { padding: 60px 16px 72px; }
  .hb-wb8-grid { grid-template-columns: minmax(0, 1fr); grid-auto-rows: minmax(170px, auto); }
  .hb-wb8-tile[data-big] { grid-column: auto; min-height: 300px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wb8-tile, .hb-wb8-seg { transition: none; }
  .hb-wb8-tile:hover { transform: none; }
}
`;

function useProgress<T extends Element>(ref: React.RefObject<T | null>, duration: number) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setT(1);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setT(p);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === "undefined") {
      raf = requestAnimationFrame(() => setT(1));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, duration]);
  return t;
}

function easeOut(x: number) {
  return 1 - Math.pow(1 - x, 4);
}

function sector(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const p = (r: number, a: number) => `${(cx + Math.cos(a) * r).toFixed(2)} ${(cy + Math.sin(a) * r).toFixed(2)}`;
  return `M${p(r1, a0)} A${r1} ${r1} 0 0 1 ${p(r1, a1)} L${p(r0, a1)} A${r0} ${r0} 0 0 0 ${p(r0, a0)} Z`;
}

function segments(count: number, cx: number, cy: number, r0: number, r1: number, from: number, to: number, gap: number) {
  const step = (to - from) / count;
  return Array.from({ length: count }, (_, i) => {
    const a0 = from + i * step + gap / 2;
    const a1 = from + (i + 1) * step - gap / 2;
    return sector(cx, cy, r0, r1, a0, a1);
  });
}

const smallSegs = segments(22, 200, 200, 128, 176, Math.PI, Math.PI * 1.5, 0.022);
const bigSegs = segments(40, 200, 200, 128, 190, Math.PI, Math.PI * 2, 0.018);

const defaultFeature: ArcStat = { value: 2.74, decimals: 2, prefix: "$", suffix: "B", label: "Payments processed on Ferro in 2026, with seven weeks still to go", progress: 0.82, caption: "82% of the annual target" };

const defaultStats: ArcStat[] = [
  { value: 99.995, decimals: 3, suffix: "%", label: "API uptime over the last 12 months", progress: 0.99, caption: "SLA 99.95%" },
  { value: 41, suffix: "ms", label: "Median authorization latency worldwide", progress: 0.41, caption: "of 100 ms budget" },
  { value: 186, label: "Countries where merchants accept payouts", progress: 0.95, caption: "186 of 195" },
  { value: 0.04, decimals: 2, suffix: "%", label: "Fraud rate after automated screening", progress: 0.18, caption: "industry avg 0.22%" },
];

function Tile({ s, big, t, delay }: { s: ArcStat; big?: boolean; t: number; delay: number }) {
  const local = t >= 1 ? 1 : easeOut(Math.min(Math.max((t - delay) / (1 - delay), 0), 1));
  const segs = big ? bigSegs : smallSegs;
  const lit = Math.max(0, Math.min(1, s.progress)) * local;
  const dec = s.decimals ?? 0;
  const shown = (s.value * local).toFixed(dec);
  const full = `${s.prefix ?? ""}${s.value.toFixed(dec)}${s.suffix ?? ""}`;
  return (
    <li className="hb-wb8-tile" data-big={big ? "" : undefined}>
      <svg className="hb-wb8-arc" viewBox={big ? "0 0 400 200" : "0 0 200 200"} aria-hidden="true">
          {segs.map((d, k) => (
            <path
              key={k}
              className="hb-wb8-seg"
              d={d}
              data-on={k / segs.length < lit - 0.0001}
              style={{ fillOpacity: (0.45 + 0.55 * (k / segs.length)).toFixed(2) }}
            />
          ))}
      </svg>
      <div className="hb-wb8-copy">
        <span className="hb-wb8-sr">{full}</span>
        <span className="hb-wb8-num" aria-hidden="true">
          {s.prefix}
          {shown}
          {s.suffix && <small>{s.suffix}</small>}
        </span>
        <p className="hb-wb8-label">{s.label}</p>
      </div>
      {s.caption && (
        <span className="hb-wb8-cap"><i aria-hidden="true" />{s.caption}</span>
      )}
    </li>
  );
}

export function StatsArcGrid({
  eyebrow = "Ferro by the numbers",
  title = "Infrastructure that money trusts",
  subtitle = "Each gauge shows how far we are toward the goal we publish every January. Figures audited quarterly.",
  feature = defaultFeature,
  stats = defaultStats,
  duration = 2000,
  accent = "#a3e635",
  className = "",
  style,
  ...rest
}: StatsArcGridProps) {
  const uid = React.useId();
  const ref = React.useRef<HTMLUListElement>(null);
  const t = useProgress(ref, Math.max(duration, 200));
  const vars = { "--hb-wb8-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-wb8 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-stats-arc-grid" precedence="default">{css}</style>
      <div className="hb-wb8-wrap">
        <div className="hb-wb8-head">
          <div>
            <p className="hb-wb8-eyebrow">{eyebrow}</p>
            <h2 id={`${uid}-t`} className="hb-wb8-title">{title}</h2>
          </div>
          {subtitle && <p className="hb-wb8-sub">{subtitle}</p>}
        </div>
        <ul ref={ref} className="hb-wb8-grid">
          {feature && <Tile s={feature} big t={t} delay={0} />}
          {stats.map((s, i) => (
            <Tile key={`${s.label}-${i}`} s={s} t={t} delay={Math.min(0.12 + i * 0.08, 0.6)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
