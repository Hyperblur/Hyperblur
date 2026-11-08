"use client";

import * as React from "react";

export interface Milestone {
  date: string;
  label: string;
  value: number;
  unit?: string;
  at: number;
}

export interface StatsMilestonesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  milestones?: Milestone[];
  axis?: string[];
  duration?: number;
  replayLabel?: string;
  accent?: string;
}

const css = `
.hb-wb10 {
  --hb-wb10-accent: #fb7185;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wb10 *, .hb-wb10 *::before, .hb-wb10 *::after { box-sizing: border-box; }
.hb-wb10-wrap { max-width: 1160px; margin: 0 auto; padding: 64px 24px 72px; }
.hb-wb10-head { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); align-items: end; gap: 16px 40px; margin-bottom: 24px; }
.hb-wb10-aside { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; }
.hb-wb10-eyebrow { margin: 0 0 12px; color: #8f8f8f; font-size: 13px; }
.hb-wb10-eyebrow b { color: var(--hb-wb10-accent); font-weight: 600; }
.hb-wb10-title { margin: 0; max-width: 620px; font-size: clamp(28px, 3.8cqw, 42px); font-weight: 600; line-height: 1.04; letter-spacing: -.04em; text-wrap: balance; }
.hb-wb10-sub { margin: 0; max-width: 420px; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-wb10-replay { display: inline-flex; align-items: center; gap: 7px; flex: none; padding: 8px 14px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 999px; background: rgba(255, 255, 255, .03); color: #ededed; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; transition: background .25s ease, border-color .25s ease; }
.hb-wb10-replay:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .2); }
.hb-wb10-replay:focus-visible { outline: 2px solid var(--hb-wb10-accent); outline-offset: 2px; }
.hb-wb10-replay svg { transition: transform .5s cubic-bezier(.2, .8, .2, 1); }
.hb-wb10-replay:hover svg { transform: rotate(-120deg); }
.hb-wb10-stage { position: relative; height: 400px; }
.hb-wb10-cards { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(var(--hb-wb10-n), minmax(0, 1fr)); gap: 10px; margin: 0; padding: 0; list-style: none; }
.hb-wb10-chart { position: absolute; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none; }
.hb-wb10-plot { position: absolute; left: 0; right: 0; top: 150px; bottom: 34px; }
.hb-wb10-plot svg, .hb-wb10-links { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-wb10-grid line { stroke: rgba(255, 255, 255, .05); vector-effect: non-scaling-stroke; }
.hb-wb10-curve { fill: none; stroke: var(--hb-wb10-accent); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-linecap: round; }
.hb-wb10-ghost { fill: none; stroke: rgba(255, 255, 255, .1); stroke-width: 1.5; stroke-dasharray: 3 5; vector-effect: non-scaling-stroke; }
.hb-wb10-link { fill: none; stroke: rgba(255, 255, 255, .1); stroke-width: 1; stroke-dasharray: 3 4; vector-effect: non-scaling-stroke; transition: stroke .5s ease; }
.hb-wb10-link[data-on="true"] { stroke: color-mix(in srgb, var(--hb-wb10-accent) 55%, transparent); }
.hb-wb10-head-line { position: absolute; top: 0; bottom: 0; width: 1px; background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--hb-wb10-accent) 70%, transparent) 40%, var(--hb-wb10-accent)); }
.hb-wb10-head-line::after { content: ""; position: absolute; bottom: -4px; left: -4px; width: 9px; height: 9px; border-radius: 50%; background: var(--hb-wb10-accent); box-shadow: 0 0 16px var(--hb-wb10-accent); }
.hb-wb10-axis { position: absolute; left: 0; right: 0; bottom: 0; height: 34px; border-top: 1px solid rgba(255, 255, 255, .08); }
.hb-wb10-axis span { position: absolute; top: 10px; color: #6f6f6f; font-size: 11.5px; font-family: var(--font-mono, ui-monospace, monospace); transform: translateX(-50%); }
.hb-wb10-axis span:first-child { transform: none; }
.hb-wb10-axis span:last-child { transform: translateX(-100%); }
.hb-wb10-node { position: absolute; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 50%; background: #0a0a0a; border: 2px solid rgba(255, 255, 255, .25); transform: scale(.6); transition: transform .5s cubic-bezier(.3, 1.6, .5, 1), border-color .3s ease, box-shadow .3s ease; }
.hb-wb10-node[data-on="true"] { transform: scale(1); border-color: var(--hb-wb10-accent); box-shadow: 0 0 0 5px color-mix(in srgb, var(--hb-wb10-accent) 18%, transparent); }
.hb-wb10-node[data-hot="true"] { transform: scale(1.4); }
.hb-wb10-ms { min-width: 0; }
.hb-wb10-card {
  height: 100%;
  max-height: 112px;
  overflow: hidden;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 14px;
  background: linear-gradient(180deg, #151515, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
  transform: translateY(8px);
  opacity: .35;
  outline: none;
  transition: opacity .5s ease, transform .6s cubic-bezier(.2, .8, .2, 1), border-color .3s ease;
}
.hb-wb10-card:hover, .hb-wb10-card:focus-visible { border-color: color-mix(in srgb, var(--hb-wb10-accent) 45%, transparent); }
.hb-wb10-card:focus-visible { box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wb10-accent) 25%, transparent); }
.hb-wb10-ms[data-on="true"] .hb-wb10-card { opacity: 1; transform: none; }
.hb-wb10-date { display: block; color: #8f8f8f; font-size: 11px; font-family: var(--font-mono, ui-monospace, monospace); letter-spacing: .04em; }
.hb-wb10-count { display: block; margin-top: 6px; font-size: clamp(20px, 2.4cqw, 26px); font-weight: 600; line-height: 1; letter-spacing: -.04em; font-variant-numeric: tabular-nums; }
.hb-wb10-count small { margin-left: 4px; color: #8f8f8f; font-size: 12px; font-weight: 500; letter-spacing: 0; }
.hb-wb10-label { display: -webkit-box; margin-top: 6px; color: #a1a1a1; font-size: 12px; line-height: 1.35; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hb-wb10-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 760px) {
  .hb-wb10-head { grid-template-columns: minmax(0, 1fr); }
  .hb-wb10-card { max-height: none; }
  .hb-wb10-label { -webkit-line-clamp: unset; }
  .hb-wb10-stage { height: auto; padding-left: 24px; }
  .hb-wb10-stage::before { content: ""; position: absolute; left: 5px; top: 6px; bottom: 6px; width: 1px; background: rgba(255, 255, 255, .1); }
  .hb-wb10-stage::after { content: ""; position: absolute; left: 5px; top: 6px; width: 1px; height: calc(var(--hb-wb10-p) * (100% - 12px)); background: var(--hb-wb10-accent); }
  .hb-wb10-chart { display: none; }
  .hb-wb10-cards { grid-template-columns: minmax(0, 1fr); }
  .hb-wb10-ms { position: relative; }
  .hb-wb10-ms::before { content: ""; position: absolute; left: -23px; top: 16px; width: 9px; height: 9px; border-radius: 50%; background: #0a0a0a; border: 2px solid rgba(255, 255, 255, .25); }
  .hb-wb10-ms[data-on="true"]::before { border-color: var(--hb-wb10-accent); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wb10-card, .hb-wb10-node, .hb-wb10-link, .hb-wb10-replay, .hb-wb10-replay svg { transition: none; }
}
`;

const defaultMilestones: Milestone[] = [
  { date: "Mar 2021", label: "First paying studio signs up", value: 1, unit: "studio", at: 0.03 },
  { date: "Jan 2022", label: "Public launch and the iPad app", value: 420, unit: "studios", at: 0.2 },
  { date: "Oct 2022", label: "Seed round closes, team of 14", value: 2600, unit: "studios", at: 0.36 },
  { date: "Sep 2023", label: "Payments and payouts go live", value: 11800, unit: "studios", at: 0.55 },
  { date: "Jun 2025", label: "Expansion to 30 countries", value: 46000, unit: "studios", at: 0.79 },
  { date: "Oct 2026", label: "Booking 1.2M classes a month", value: 91500, unit: "studios", at: 0.97 },
];

const STAGE = 400;
const PLOT_TOP = 150;
const CARD = 112;

const defaultAxis = ["2021", "2022", "2023", "2024", "2025", "2026"];

function compact(v: number) {
  if (v >= 100000) return `${Math.round(v / 1000)}k`;
  if (v >= 10000) return `${(v / 1000).toFixed(1)}k`;
  return Math.round(v).toLocaleString("en-US");
}

function easeInOut(x: number) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function smooth(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

export function StatsMilestones({
  eyebrow = "Five years of Pulsewell",
  title = "From one studio to ninety thousand",
  subtitle = "Every number below is a studio that runs its classes, members and payments on Pulsewell today.",
  milestones = defaultMilestones,
  axis = defaultAxis,
  duration = 3600,
  replayLabel = "Replay",
  accent = "#fb7185",
  className = "",
  style,
  ...rest
}: StatsMilestonesProps) {
  const uid = React.useId();
  const ref = React.useRef<HTMLDivElement>(null);
  const raf = React.useRef(0);
  const [t, setT] = React.useState(0);
  const [hot, setHot] = React.useState<number | null>(null);

  const play = React.useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(1);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / Math.max(duration, 400), 1);
      setT(p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [duration]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      raf.current = requestAnimationFrame(() => setT(1));
      return () => cancelAnimationFrame(raf.current);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [play]);

  const head = easeInOut(t);
  const max = Math.max(...milestones.map((m) => m.value), 1);
  const H = 100;
  const yOf = (v: number) => H - 6 - Math.sqrt(v / max) * (H - 14);
  const pts: [number, number][] = [[0, H - 4], ...milestones.map((m) => [m.at * 1000, yOf(m.value)] as [number, number]), [1000, yOf(max) - 2]];
  const curve = smooth(pts);
  const area = `${curve} L1000 ${H} L0 ${H} Z`;
  const gid = `${uid.replace(/[^a-zA-Z0-9]/g, "")}-a`;
  const clipId = `${uid.replace(/[^a-zA-Z0-9]/g, "")}-c`;
  const n = Math.max(milestones.length, 1);
  const nodeY = (v: number) => PLOT_TOP + (yOf(v) / H) * (STAGE - PLOT_TOP - 34);
  const vars = { "--hb-wb10-accent": accent, "--hb-wb10-p": head.toFixed(4), "--hb-wb10-n": n, ...style } as React.CSSProperties;

  return (
    <section className={`hb-wb10 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-stats-milestones" precedence="default">{css}</style>
      <div className="hb-wb10-wrap">
        <div className="hb-wb10-head">
          <div>
            <p className="hb-wb10-eyebrow"><b>{eyebrow}</b></p>
            <h2 id={`${uid}-t`} className="hb-wb10-title">{title}</h2>
          </div>
          <div className="hb-wb10-aside">
            {subtitle && <p className="hb-wb10-sub">{subtitle}</p>}
          <button type="button" className="hb-wb10-replay" onClick={play}>
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 1 0 1.7-4M2.5 2.5V5.5h3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {replayLabel}
          </button>
          </div>
        </div>
        <div ref={ref} className="hb-wb10-stage">
          <div className="hb-wb10-chart" aria-hidden="true">
            <div className="hb-wb10-plot">
              <svg viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={accent} stopOpacity=".3" />
                    <stop offset="1" stopColor={accent} stopOpacity="0" />
                  </linearGradient>
                  <clipPath id={clipId}>
                    <rect x="0" y="-20" width={(head * 1000).toFixed(2)} height={H + 40} />
                  </clipPath>
                </defs>
                <g className="hb-wb10-grid">
                  {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2="1000" y1={(H * g).toFixed(2)} y2={(H * g).toFixed(2)} />)}
                </g>
                <path className="hb-wb10-ghost" d={curve} />
                <g clipPath={`url(#${clipId})`}>
                  <path d={area} fill={`url(#${gid})`} />
                  <path className="hb-wb10-curve" d={curve} />
                </g>
              </svg>
              {t > 0 && t < 1 && <span className="hb-wb10-head-line" style={{ left: `${(head * 100).toFixed(2)}%` }} />}
            </div>
            <svg className="hb-wb10-links" viewBox={`0 0 1000 ${STAGE}`} preserveAspectRatio="none">
              {milestones.map((m, i) => {
                const cx = ((i + 0.5) / n) * 1000;
                const ax = m.at * 1000;
                const ny = nodeY(m.value);
                const mid = CARD + 14;
                return (
                  <path
                    key={i}
                    className="hb-wb10-link"
                    data-on={head >= m.at - 0.005}
                    d={`M${cx.toFixed(1)} ${CARD} L${cx.toFixed(1)} ${mid} L${ax.toFixed(1)} ${(mid + 18).toFixed(1)} L${ax.toFixed(1)} ${(ny - 8).toFixed(1)}`}
                  />
                );
              })}
            </svg>
            {milestones.map((m, i) => (
              <span
                key={i}
                className="hb-wb10-node"
                data-on={head >= m.at - 0.005}
                data-hot={hot === i}
                style={{ left: `${(m.at * 100).toFixed(2)}%`, top: `${nodeY(m.value).toFixed(1)}px` }}
              />
            ))}
            <div className="hb-wb10-axis">
              {axis.map((a, i) => (
                <span key={a} style={{ left: `${((i / Math.max(axis.length - 1, 1)) * 100).toFixed(2)}%` }}>{a}</span>
              ))}
            </div>
          </div>
          <ol className="hb-wb10-cards">
            {milestones.map((m, i) => {
              const on = head >= m.at - 0.005;
              const local = on ? Math.min(1, (head - m.at) / 0.12) : 0;
              const shown = t >= 1 ? m.value : m.value * (1 - Math.pow(1 - Math.max(local, 0), 3));
              return (
                <li key={`${m.date}-${i}`} className="hb-wb10-ms" data-on={on}>
                  <div
                    className="hb-wb10-card"
                    tabIndex={0}
                    onPointerEnter={() => setHot(i)}
                    onPointerLeave={() => setHot(null)}
                    onFocus={() => setHot(i)}
                    onBlur={() => setHot(null)}
                  >
                    <span className="hb-wb10-sr">{`${m.date}: ${m.label}, ${m.value.toLocaleString("en-US")} ${m.unit ?? ""}`}</span>
                    <span aria-hidden="true">
                      <span className="hb-wb10-date">{m.date}</span>
                      <span className="hb-wb10-count">{compact(shown)}<small>{m.unit}</small></span>
                      <span className="hb-wb10-label">{m.label}</span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
