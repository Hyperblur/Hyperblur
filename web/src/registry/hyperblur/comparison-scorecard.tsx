"use client";

import * as React from "react";

export interface ComparisonScorecardSide {
  name: string;
  score: number;
}

export interface ComparisonScorecardMetric {
  label: string;
  detail?: string;
  us: number;
  them: number;
  max: number;
  unit?: string;
  lowerIsBetter?: boolean;
}

export interface ComparisonScorecardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  us?: ComparisonScorecardSide;
  them?: ComparisonScorecardSide;
  metrics?: ComparisonScorecardMetric[];
  source?: string;
  cta?: { label: string; href: string } | null;
  duration?: number;
  accent?: string;
}

const css = `
.hb-yh2 {
  --hb-yh2-accent: #10b981;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  overflow: hidden;
  padding: clamp(64px, 9cqi, 112px) 20px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yh2 *, .hb-yh2 *::before, .hb-yh2 *::after { box-sizing: border-box; }
.hb-yh2-in { position: relative; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 20px; max-width: 1120px; margin: 0 auto; }
.hb-yh2-left {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 32px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 22px;
  background:
    radial-gradient(80% 60% at 0% 0%, color-mix(in srgb, var(--hb-yh2-accent) 16%, transparent), transparent 70%),
    linear-gradient(180deg, #121212, #0d0d0d);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
  overflow: hidden;
}
.hb-yh2-eyebrow { color: color-mix(in srgb, var(--hb-yh2-accent) 70%, #fff); font-size: 12.5px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-yh2-title { margin: 14px 0 0; font-size: clamp(28px, 3.6cqi, 40px); font-weight: 650; letter-spacing: -.035em; line-height: 1.08; }
.hb-yh2-sub { margin: 14px 0 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-yh2-rings { display: flex; align-items: center; gap: 22px; margin-top: auto; padding-top: 32px; }
.hb-yh2-ring { position: relative; flex: none; width: 112px; height: 112px; }
.hb-yh2-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-yh2-ring circle { fill: none; stroke-width: 8; }
.hb-yh2-track { stroke: rgba(255,255,255,.07); }
.hb-yh2-arc { stroke-linecap: round; }
.hb-yh2-ring[data-us="true"] .hb-yh2-arc { stroke: var(--hb-yh2-accent); filter: drop-shadow(0 0 6px color-mix(in srgb, var(--hb-yh2-accent) 60%, transparent)); }
.hb-yh2-ring[data-us="false"] { width: 84px; height: 84px; }
.hb-yh2-ring[data-us="false"] .hb-yh2-arc { stroke: #525252; }
.hb-yh2-rv { position: absolute; inset: 0; display: grid; place-items: center; align-content: center; text-align: center; }
.hb-yh2-rn { font-size: 30px; font-weight: 650; letter-spacing: -.03em; font-variant-numeric: tabular-nums; line-height: 1; }
.hb-yh2-ring[data-us="false"] .hb-yh2-rn { color: #a1a1a1; font-size: 22px; }
.hb-yh2-rl { margin-top: 4px; color: #8f8f8f; font-size: 11px; }
.hb-yh2-vs { color: #525252; font-size: 12px; font-weight: 600; letter-spacing: .1em; }
.hb-yh2-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  height: 42px;
  margin-top: 26px;
  padding: 0 18px;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color .2s ease, transform .15s ease;
}
.hb-yh2-cta:hover { background: #fff; }
.hb-yh2-cta svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .2s ease; }
.hb-yh2-cta:hover svg { transform: translateX(3px); }
.hb-yh2-right { min-width: 0; padding: 10px 28px; border: 1px solid rgba(255,255,255,.08); border-radius: 22px; background: #0e0e0e; }
.hb-yh2-legend { display: flex; align-items: center; gap: 18px; padding: 18px 0 14px; border-bottom: 1px solid rgba(255,255,255,.07); color: #8f8f8f; font-size: 12.5px; }
.hb-yh2-legend span { display: inline-flex; align-items: center; gap: 7px; }
.hb-yh2-legend i { width: 10px; height: 10px; border-radius: 3px; background: #404040; }
.hb-yh2-legend span:first-child i { background: var(--hb-yh2-accent); }
.hb-yh2-legend b { margin-left: auto; color: #6f6f6f; font-weight: 500; }
.hb-yh2-list { margin: 0; padding: 0; list-style: none; }
.hb-yh2-m { display: grid; grid-template-columns: minmax(0, 190px) minmax(0, 1fr) auto; align-items: center; gap: 8px 22px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,.06); }
.hb-yh2-m:last-child { border-bottom: 0; }
.hb-yh2-ml { font-size: 14px; font-weight: 600; }
.hb-yh2-md { margin-top: 3px; color: #6f6f6f; font-size: 12px; line-height: 1.4; }
.hb-yh2-bars { display: grid; gap: 6px; min-width: 0; }
.hb-yh2-bar { display: flex; align-items: center; gap: 10px; min-width: 0; }
.hb-yh2-track2 { position: relative; flex: 1; height: 8px; border-radius: 99px; background: rgba(255,255,255,.05); overflow: hidden; }
.hb-yh2-fill { position: absolute; inset: 0 auto 0 0; width: calc(var(--hb-yh2-w) * 1%); border-radius: inherit; background: #3f3f3f; transform-origin: left; transform: scaleX(var(--hb-yh2-p, 1)); }
.hb-yh2-bar[data-us="true"] .hb-yh2-fill { background: linear-gradient(90deg, color-mix(in srgb, var(--hb-yh2-accent) 55%, #0a0a0a), var(--hb-yh2-accent)); box-shadow: 0 0 14px color-mix(in srgb, var(--hb-yh2-accent) 50%, transparent); }
.hb-yh2-num { position: relative; flex: none; width: 64px; color: #8f8f8f; font-size: 12.5px; font-variant-numeric: tabular-nums; text-align: right; }
.hb-yh2-bar[data-us="true"] .hb-yh2-num { color: #ededed; font-weight: 600; }
.hb-yh2-delta {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 9px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-yh2-accent) 14%, transparent);
  color: color-mix(in srgb, var(--hb-yh2-accent) 70%, #fff);
  font-size: 12px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.hb-yh2-src { margin: 0; padding: 14px 0 16px; border-top: 1px solid rgba(255,255,255,.07); color: #5f5f5f; font-size: 11.5px; }
.hb-yh2 a:focus-visible { outline: 2px solid var(--hb-yh2-accent); outline-offset: 3px; }
@container (max-width: 860px) {
  .hb-yh2-in { grid-template-columns: minmax(0, 1fr); }
  .hb-yh2-rings { padding-top: 26px; }
}
@container (max-width: 520px) {
  .hb-yh2-left { padding: 24px; }
  .hb-yh2-right { padding: 6px 18px; }
  .hb-yh2-m { grid-template-columns: minmax(0, 1fr) auto; }
  .hb-yh2-bars { grid-column: 1 / -1; grid-row: 2; }
  .hb-yh2-legend b { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yh2 *, .hb-yh2 *::before, .hb-yh2 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultMetrics: ComparisonScorecardMetric[] = [
  { label: "Time to first insight", detail: "From signup to a shared dashboard", us: 4, them: 38, max: 40, unit: "min", lowerIsBetter: true },
  { label: "Query speed", detail: "p95 on a 200M row table", us: 0.8, them: 6.4, max: 7, unit: "s", lowerIsBetter: true },
  { label: "Connectors included", detail: "Without paid add-ons", us: 140, them: 35, max: 150 },
  { label: "Weekly active rate", detail: "Share of seats used each week", us: 87, them: 41, max: 100, unit: "%" },
  { label: "Support reply time", detail: "Median, business hours", us: 9, them: 52, max: 60, unit: "min", lowerIsBetter: true },
];

function fmt(n: number, unit?: string) {
  const v = Math.abs(n) >= 10 ? Math.round(n).toString() : n.toFixed(1);
  if (!unit) return v;
  return unit === "%" ? `${v}%` : `${v} ${unit}`;
}

function ease(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function ComparisonScorecard({
  eyebrow = "Fieldnote vs the usual stack",
  title = "Same questions, answered nine times faster",
  subtitle = "We ran both tools side by side for 30 days with 212 analysts at 18 companies. These are the medians.",
  us = { name: "Fieldnote", score: 9.2 },
  them = { name: "Legacy BI", score: 6.1 },
  metrics = defaultMetrics,
  source = "Independent benchmark by Northgate Research, September 2026. Legacy BI is the average of three incumbent tools.",
  cta = { label: "Read the full report", href: "#" },
  duration = 1400,
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: ComparisonScorecardProps) {
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.requestAnimationFrame(() => setP(1));
      return () => window.cancelAnimationFrame(id);
    }
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / duration);
      setP(ease(k));
      if (k < 1) raf = window.requestAnimationFrame(tick);
    };
    const delay = window.setTimeout(() => {
      raf = window.requestAnimationFrame(tick);
    }, 250);
    return () => {
      window.clearTimeout(delay);
      window.cancelAnimationFrame(raf);
    };
  }, [duration]);

  const R = 44;
  const C = 2 * Math.PI * R;

  return (
    <section className={`hb-yh2 ${className}`} style={{ "--hb-yh2-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-comparison-scorecard" precedence="default">
        {css}
      </style>
      <div className="hb-yh2-in">
        <div className="hb-yh2-left">
          <span className="hb-yh2-eyebrow">{eyebrow}</span>
          <h2 className="hb-yh2-title">{title}</h2>
          {subtitle && <p className="hb-yh2-sub">{subtitle}</p>}
          <div className="hb-yh2-rings" role="img" aria-label={`Overall score: ${us.name} ${us.score} out of 10, ${them.name} ${them.score} out of 10`}>
            {[us, them].map((side, i) => (
              <React.Fragment key={side.name}>
                {i === 1 && <span className="hb-yh2-vs">VS</span>}
                <div className="hb-yh2-ring" data-us={i === 0 ? "true" : "false"}>
                  <svg viewBox="0 0 100 100" aria-hidden="true">
                    <circle className="hb-yh2-track" cx="50" cy="50" r={R} />
                    <circle
                      className="hb-yh2-arc"
                      cx="50"
                      cy="50"
                      r={R}
                      strokeDasharray={C.toFixed(2)}
                      strokeDashoffset={(C * (1 - (side.score / 10) * p)).toFixed(2)}
                    />
                  </svg>
                  <div className="hb-yh2-rv" aria-hidden="true">
                    <span className="hb-yh2-rn">{(side.score * p).toFixed(1)}</span>
                    <span className="hb-yh2-rl">{side.name}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          {cta && (
            <a href={cta.href} className="hb-yh2-cta">
              {cta.label}
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          )}
        </div>
        <div className="hb-yh2-right">
          <div className="hb-yh2-legend">
            <span>
              <i aria-hidden="true" />
              {us.name}
            </span>
            <span>
              <i aria-hidden="true" />
              {them.name}
            </span>
            <b>Median of 212 analysts</b>
          </div>
          <ul className="hb-yh2-list">
            {metrics.map((m, i) => {
              const k = Math.max(0, Math.min(1, (p * (metrics.length + 2) - i) / 3));
              const better = m.lowerIsBetter ? m.them / Math.max(m.us, 0.0001) : m.us / Math.max(m.them, 0.0001);
              const delta = m.lowerIsBetter ? `${better.toFixed(better >= 10 ? 0 : 1)}x faster` : `+${Math.round((better - 1) * 100)}%`;
              return (
                <li key={m.label} className="hb-yh2-m">
                  <div>
                    <div className="hb-yh2-ml">{m.label}</div>
                    {m.detail && <div className="hb-yh2-md">{m.detail}</div>}
                  </div>
                  <div className="hb-yh2-bars">
                    {[
                      { us: true, v: m.us },
                      { us: false, v: m.them },
                    ].map((b) => (
                      <div key={b.us ? "us" : "them"} className="hb-yh2-bar" data-us={b.us ? "true" : "false"}>
                        <span className="hb-yh2-track2">
                          <span
                            className="hb-yh2-fill"
                            style={{ "--hb-yh2-w": ((b.v / m.max) * 100).toFixed(2), "--hb-yh2-p": ease(k).toFixed(4) } as React.CSSProperties}
                          />
                        </span>
                        <span className="hb-yh2-num">
                          <span aria-hidden="true">{fmt(b.v * ease(k), m.unit)}</span>
                          <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>
                            {`${b.us ? us.name : them.name}: ${fmt(b.v, m.unit)}`}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="hb-yh2-delta">{delta}</span>
                </li>
              );
            })}
          </ul>
          {source && <p className="hb-yh2-src">{source}</p>}
        </div>
      </div>
    </section>
  );
}
