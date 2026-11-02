"use client";

import * as React from "react";

export interface TickerMetric {
  label: string;
  value: string;
  change?: string;
  direction?: "up" | "down";
  good?: boolean;
}

export interface TickerFeatured {
  value: string;
  label: string;
  change?: string;
  caption?: string;
}

export interface StatsTickerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  featured?: TickerFeatured;
  description?: string;
  primaryCta?: { label: string; href: string } | null;
  secondaryCta?: { label: string; href: string } | null;
  metrics?: TickerMetric[];
  speed?: number;
  rows?: 1 | 2;
  accent?: string;
}

const css = `
.hb-ka9 {
  --hb-ka9-accent: #22c55e;
  --hb-ka9-speed: 48s;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #050505;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ka9 *, .hb-ka9 *::before, .hb-ka9 *::after { box-sizing: border-box; }
.hb-ka9::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -260px;
  width: 900px;
  height: 520px;
  margin-left: -450px;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-ka9-accent) 14%, transparent), transparent);
  pointer-events: none;
}
.hb-ka9-wrap {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  align-items: end;
  gap: 32px 64px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 96px 24px 56px;
}
.hb-ka9-live {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px;
  color: #a1a1a1;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-ka9-pulse { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--hb-ka9-accent); }
.hb-ka9-pulse::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--hb-ka9-accent);
  animation: hb-ka9-ping 1.8s cubic-bezier(0, 0, .2, 1) infinite;
}
@keyframes hb-ka9-ping { 75%, 100% { transform: scale(2.6); opacity: 0; } }
.hb-ka9-big {
  margin: 0;
  font-size: clamp(64px, 12cqw, 148px);
  font-weight: 600;
  line-height: .9;
  letter-spacing: -.06em;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(180deg, #ffffff 30%, #6b6b6b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-ka9-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; margin-top: 20px; }
.hb-ka9-label { color: #a1a1a1; font-size: 16px; }
.hb-ka9-chg {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid color-mix(in srgb, var(--hb-ka9-accent) 35%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-ka9-accent) 12%, transparent);
  color: color-mix(in srgb, var(--hb-ka9-accent) 60%, #fff);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12.5px;
}
.hb-ka9-chg svg { width: 9px; height: 9px; }
.hb-ka9-chg span { color: #8f8f8f; }
.hb-ka9-side { padding-bottom: 8px; }
.hb-ka9-desc { margin: 0; color: #8f8f8f; font-size: 15px; line-height: 1.65; }
.hb-ka9-ctas { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
.hb-ka9-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  color: #ededed;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background .2s ease, border-color .2s ease;
}
.hb-ka9-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .22); }
.hb-ka9-btn:focus-visible { outline: 2px solid var(--hb-ka9-accent); outline-offset: 3px; }
.hb-ka9-btn[data-primary="true"] { border-color: transparent; background: #ededed; color: #0a0a0a; }
.hb-ka9-btn[data-primary="true"]:hover { background: #fff; }
.hb-ka9-band {
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, .08);
  border-bottom: 1px solid rgba(255, 255, 255, .08);
  background: linear-gradient(180deg, rgba(255, 255, 255, .02), rgba(255, 255, 255, 0));
}
.hb-ka9-row {
  overflow: hidden;
  -webkit-mask: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.hb-ka9-row + .hb-ka9-row { border-top: 1px solid rgba(255, 255, 255, .06); }
.hb-ka9-track {
  display: flex;
  width: max-content;
  animation: hb-ka9-scroll var(--hb-ka9-speed) linear infinite;
}
.hb-ka9-row[data-dir="reverse"] .hb-ka9-track { animation-direction: reverse; animation-duration: calc(var(--hb-ka9-speed) * 1.35); }
.hb-ka9-band:hover .hb-ka9-track { animation-play-state: paused; }
@keyframes hb-ka9-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.hb-ka9-list { display: flex; margin: 0; padding: 0; list-style: none; }
.hb-ka9-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px 32px;
  border-right: 1px solid rgba(255, 255, 255, .06);
  white-space: nowrap;
}
.hb-ka9-row[data-dir="reverse"] .hb-ka9-item { padding-top: 16px; padding-bottom: 16px; opacity: .72; }
.hb-ka9-il { color: #7a7a7a; font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
.hb-ka9-iv { color: #ededed; font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 18px; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
.hb-ka9-id {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
}
.hb-ka9-id svg { width: 8px; height: 8px; }
.hb-ka9-id[data-good="true"] { color: #4ade80; }
.hb-ka9-id[data-good="false"] { color: #f87171; }
.hb-ka9-pad { height: 72px; }
.hb-ka9-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 820px) {
  .hb-ka9-wrap { grid-template-columns: minmax(0, 1fr); align-items: start; }
}
@container (max-width: 520px) {
  .hb-ka9-wrap { padding: 64px 16px 40px; }
  .hb-ka9-big { font-size: clamp(52px, 18cqw, 80px); }
  .hb-ka9-item { padding: 16px 20px; gap: 10px; }
  .hb-ka9-iv { font-size: 15px; }
  .hb-ka9-pad { height: 48px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ka9-track, .hb-ka9-pulse::after { animation: none; }
  .hb-ka9-row { overflow-x: auto; }
  .hb-ka9-list[aria-hidden="true"] { display: none; }
  .hb-ka9-btn { transition: none; }
}
`;

function Arrow({ up }: { up: boolean }) {
  return (
    <svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
      <path d={up ? "M5 1l4 7H1z" : "M5 9L1 2h8z"} />
    </svg>
  );
}

const defaultMetrics: TickerMetric[] = [
  { label: "Payments today", value: "$94.2M", change: "4.1%", direction: "up" },
  { label: "Active merchants", value: "61,480", change: "0.8%", direction: "up" },
  { label: "Avg. settlement", value: "1.7 days", change: "12.0%", direction: "down", good: true },
  { label: "Authorization rate", value: "97.6%", change: "0.3 pts", direction: "up" },
  { label: "Chargeback rate", value: "0.07%", change: "0.02 pts", direction: "down", good: true },
  { label: "Countries live", value: "46", change: "2", direction: "up" },
  { label: "Payouts sent", value: "1.2M", change: "6.5%", direction: "up" },
  { label: "Fraud blocked", value: "$3.9M", change: "9.2%", direction: "up" },
  { label: "API p95 latency", value: "84 ms", change: "6 ms", direction: "down", good: true },
  { label: "Disputes won", value: "71%", change: "1.4 pts", direction: "down", good: false },
  { label: "Uptime, 90 days", value: "99.999%" },
  { label: "FX pairs", value: "138", change: "4", direction: "up" },
];

const defaultFeatured: TickerFeatured = {
  value: "$2.84B",
  label: "settled through Ledgerline in October 2026",
  change: "31.4%",
  caption: "vs September",
};

function Item({ m }: { m: TickerMetric }) {
  const up = m.direction !== "down";
  const good = m.good ?? up;
  return (
    <li className="hb-ka9-item">
      <span className="hb-ka9-il">{m.label}</span>
      <span className="hb-ka9-iv">{m.value}</span>
      {m.change && m.direction && (
        <span className="hb-ka9-id" data-good={good}>
          <Arrow up={up} />
          {m.change}
          <span className="hb-ka9-sr">{up ? " up" : " down"}</span>
        </span>
      )}
    </li>
  );
}

function Row({ metrics, dir }: { metrics: TickerMetric[]; dir: "forward" | "reverse" }) {
  return (
    <div className="hb-ka9-row" data-dir={dir} aria-hidden={dir === "reverse" ? true : undefined}>
      <div className="hb-ka9-track">
        <ul className="hb-ka9-list">
          {metrics.map((m, i) => (
            <Item key={`${m.label}-${i}`} m={m} />
          ))}
        </ul>
        <ul className="hb-ka9-list" aria-hidden="true">
          {metrics.map((m, i) => (
            <Item key={`${m.label}-${i}`} m={m} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export function StatsTicker({
  eyebrow = "Live, updated every minute",
  featured = defaultFeatured,
  description = "Ledgerline moves money for 61,000 businesses across 46 countries. These are the numbers our operations team watches all day.",
  primaryCta = { label: "Open the status page", href: "#" },
  secondaryCta = { label: "Read the Q3 report", href: "#" },
  metrics = defaultMetrics,
  speed = 48,
  rows = 2,
  accent = "#22c55e",
  className = "",
  style,
  ...rest
}: StatsTickerProps) {
  const uid = React.useId();
  const half = Math.ceil(metrics.length / 2);
  const second = [...metrics.slice(half), ...metrics.slice(0, half)];
  const vars = { "--hb-ka9-accent": accent, "--hb-ka9-speed": `${Math.max(speed, 4)}s`, ...style } as React.CSSProperties;

  return (
    <section className={`hb-ka9 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-stats-ticker" precedence="default">{css}</style>
      <div className="hb-ka9-wrap">
        <div>
          {eyebrow && (
            <p className="hb-ka9-live">
              <span className="hb-ka9-pulse" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h2 id={`${uid}-t`} className="hb-ka9-big">{featured.value}</h2>
          <div className="hb-ka9-meta">
            <span className="hb-ka9-label">{featured.label}</span>
            {featured.change && (
              <span className="hb-ka9-chg">
                <Arrow up />
                {featured.change}
                {featured.caption && <span>{featured.caption}</span>}
              </span>
            )}
          </div>
        </div>
        <div className="hb-ka9-side">
          {description && <p className="hb-ka9-desc">{description}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="hb-ka9-ctas">
              {primaryCta && (
                <a className="hb-ka9-btn" data-primary="true" href={primaryCta.href}>
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a className="hb-ka9-btn" href={secondaryCta.href}>
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="hb-ka9-band" role="region" aria-label="Live metrics">
        <Row metrics={metrics} dir="forward" />
        {rows === 2 && <Row metrics={second} dir="reverse" />}
      </div>
      <div className="hb-ka9-pad" aria-hidden="true" />
    </section>
  );
}
