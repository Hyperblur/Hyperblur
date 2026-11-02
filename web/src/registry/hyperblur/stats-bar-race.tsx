"use client";

import * as React from "react";

export interface RaceBar {
  label: string;
  detail?: string;
  value: number;
}

export interface StatsBarRaceProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  summary?: { value: string; label: string } | null;
  chartTitle?: string;
  chartCaption?: string;
  bars?: RaceBar[];
  unit?: string;
  duration?: number;
  accent?: string;
}

const css = `
.hb-ka7 {
  --hb-ka7-accent: #ff6b4a;
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
.hb-ka7 *, .hb-ka7 *::before, .hb-ka7 *::after { box-sizing: border-box; }
.hb-ka7::before {
  content: "";
  position: absolute;
  right: -10%;
  top: -30%;
  width: 70%;
  height: 120%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-ka7-accent) 12%, transparent), transparent);
  pointer-events: none;
}
.hb-ka7-wrap {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, .82fr) minmax(0, 1.4fr);
  align-items: center;
  gap: 56px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 96px 24px;
}
.hb-ka7-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  color: #a1a1a1;
  font-size: 13px;
  font-weight: 500;
}
.hb-ka7-eyebrow i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--hb-ka7-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ka7-accent) 25%, transparent);
}
.hb-ka7-title {
  margin: 0;
  font-family: var(--font-grotesk, "Space Grotesk", ui-sans-serif, system-ui, sans-serif);
  font-size: clamp(30px, 4.4cqw, 48px);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-ka7-sub { margin: 18px 0 0; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-ka7-sum { margin-top: 36px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, .08); }
.hb-ka7-sum b {
  display: block;
  font-family: var(--font-grotesk, "Space Grotesk", ui-sans-serif, system-ui, sans-serif);
  font-size: clamp(40px, 5.6cqw, 60px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -.04em;
  background: linear-gradient(180deg, #fff, #8f8f8f);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-ka7-sum span { display: block; margin-top: 8px; color: #8f8f8f; font-size: 14px; }
.hb-ka7-card {
  min-width: 0;
  padding: 26px 26px 20px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background: linear-gradient(180deg, #121214, #0d0d0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 40px 80px -40px rgba(0, 0, 0, .9);
}
.hb-ka7-ch { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 22px; }
.hb-ka7-ch h3 { margin: 0; font-size: 15px; font-weight: 600; }
.hb-ka7-ch span { color: #6f6f6f; font-size: 12px; white-space: nowrap; }
.hb-ka7-rows { position: relative; display: flex; flex-direction: column; gap: 12px; margin: 0; padding: 0; list-style: none; }
.hb-ka7-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 132px) minmax(0, 1fr) 76px;
  align-items: center;
  gap: 12px;
}
.hb-ka7-rank { color: #5f5f5f; font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 12px; }
.hb-ka7-name { min-width: 0; }
.hb-ka7-name b { display: block; overflow: hidden; font-size: 14px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.hb-ka7-name span { display: block; color: #6f6f6f; font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 11px; }
.hb-ka7-track {
  position: relative;
  height: 30px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, .025);
  background-image: linear-gradient(90deg, rgba(255, 255, 255, .06) 1px, transparent 1px);
  background-size: 25% 100%;
}
.hb-ka7-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  min-width: 4px;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(255, 255, 255, .08), rgba(255, 255, 255, .26));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .12);
}
.hb-ka7-bar::after {
  content: "";
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  width: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, .55);
}
.hb-ka7-row[data-lead="true"] .hb-ka7-bar {
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-ka7-accent) 25%, transparent), var(--hb-ka7-accent));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 0 28px -6px var(--hb-ka7-accent);
}
.hb-ka7-row[data-lead="true"] .hb-ka7-bar::after { background: #fff; }
.hb-ka7-val {
  text-align: right;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}
.hb-ka7-row[data-lead="true"] .hb-ka7-val { color: color-mix(in srgb, var(--hb-ka7-accent) 55%, #fff); }
.hb-ka7-axis {
  display: grid;
  grid-template-columns: 24px minmax(0, 132px) minmax(0, 1fr) 76px;
  gap: 12px;
  margin-top: 12px;
  color: #5f5f5f;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 10.5px;
}
.hb-ka7-ticks { display: flex; justify-content: space-between; }
.hb-ka7-unit { text-align: right; }
@container (max-width: 860px) {
  .hb-ka7-wrap { grid-template-columns: minmax(0, 1fr); gap: 40px; }
}
@container (max-width: 520px) {
  .hb-ka7-wrap { padding: 64px 16px 72px; }
  .hb-ka7-card { padding: 18px 14px 14px; border-radius: 16px; }
  .hb-ka7-row, .hb-ka7-axis { grid-template-columns: minmax(0, 84px) minmax(0, 1fr) 58px; gap: 10px; }
  .hb-ka7-rank, .hb-ka7-axis > span:first-child { display: none; }
  .hb-ka7-name span { display: none; }
  .hb-ka7-name b, .hb-ka7-val { font-size: 12.5px; }
  .hb-ka7-track { height: 24px; }
  .hb-ka7-ch { flex-direction: column; gap: 4px; }
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
      { threshold: 0.25 },
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
  return 1 - Math.pow(1 - x, 3);
}

function niceMax(n: number) {
  if (n <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(n)));
  const steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  const unit = steps.find((s) => s * mag >= n) ?? 10;
  return unit * mag;
}

function compact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 ? 1 : 0)}k`;
  return String(Math.round(n));
}

const defaultBars: RaceBar[] = [
  { label: "Frankfurt", detail: "fra1", value: 48200 },
  { label: "Virginia", detail: "iad1", value: 41900 },
  { label: "Tokyo", detail: "hnd1", value: 33400 },
  { label: "Sao Paulo", detail: "gru1", value: 21700 },
  { label: "Sydney", detail: "syd1", value: 17300 },
  { label: "Mumbai", detail: "bom1", value: 14800 },
];

export function StatsBarRace({
  eyebrow = "Live network",
  title = "Six regions. One edge that never sleeps.",
  subtitle = "Traffic is served from the region closest to each visitor, with automatic failover in under two seconds.",
  summary = { value: "177k", label: "requests per second at peak, October 2026" },
  chartTitle = "Requests per second by region",
  chartCaption = "30-day peak",
  bars = defaultBars,
  unit = "req/s",
  duration = 2600,
  accent = "#ff6b4a",
  className = "",
  style,
  ...rest
}: StatsBarRaceProps) {
  const uid = React.useId();
  const ref = React.useRef<HTMLUListElement>(null);
  const t = useProgress(ref, Math.max(duration, 200));
  const sorted = [...bars].sort((a, b) => b.value - a.value);
  const top = sorted[0]?.value ?? 1;
  const max = niceMax(top);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => compact(max * f));
  const vars = { "--hb-ka7-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-ka7 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-stats-bar-race" precedence="default">{css}</style>
      <div className="hb-ka7-wrap">
        <div>
          {eyebrow && (
            <p className="hb-ka7-eyebrow">
              <i aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h2 id={`${uid}-t`} className="hb-ka7-title">{title}</h2>
          {subtitle && <p className="hb-ka7-sub">{subtitle}</p>}
          {summary && (
            <div className="hb-ka7-sum">
              <b>{summary.value}</b>
              <span>{summary.label}</span>
            </div>
          )}
        </div>
        <div className="hb-ka7-card">
          <div className="hb-ka7-ch">
            <h3>{chartTitle}</h3>
            {chartCaption && <span>{chartCaption}</span>}
          </div>
          <ul ref={ref} className="hb-ka7-rows">
            {sorted.map((b, i) => {
              const share = b.value / top;
              const span = 0.4 + 0.6 * share;
              const local = t >= 1 ? 1 : easeOut(Math.min(t / span, 1));
              const width = (b.value / max) * 100 * local;
              const shown = Math.round(b.value * local);
              return (
                <li key={`${b.label}-${i}`} className="hb-ka7-row" data-lead={i === 0}>
                  <span className="hb-ka7-rank" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hb-ka7-name">
                    <b>{b.label}</b>
                    {b.detail && <span>{b.detail}</span>}
                  </span>
                  <span className="hb-ka7-track" aria-hidden="true">
                    <span className="hb-ka7-bar" style={{ width: `${width.toFixed(2)}%` }} />
                  </span>
                  <span className="hb-ka7-val">
                    <span aria-hidden="true">{shown.toLocaleString("en-US")}</span>
                    <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                      {`${b.value.toLocaleString("en-US")} ${unit}`}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="hb-ka7-axis" aria-hidden="true">
            <span />
            <span />
            <span className="hb-ka7-ticks">
              {ticks.map((tk, i) => (
                <span key={i}>{tk}</span>
              ))}
            </span>
            <span className="hb-ka7-unit">{unit}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
