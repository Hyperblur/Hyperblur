"use client";

import * as React from "react";

export interface CounterStat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delta?: string;
  trend?: number[];
}

export interface StatsCountersProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  stats?: CounterStat[];
  duration?: number;
  footnote?: string;
  accent?: string;
}

const css = `
.hb-ka6 {
  --hb-ka6-accent: #f5a524;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ka6 *, .hb-ka6 *::before, .hb-ka6 *::after { box-sizing: border-box; }
.hb-ka6-wrap { max-width: 1120px; margin: 0 auto; padding: 96px 24px 104px; }
.hb-ka6-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px 48px;
  margin-bottom: 56px;
}
.hb-ka6-eyebrow {
  margin: 0 0 16px;
  color: #8f8f8f;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
  letter-spacing: .1em;
  text-transform: uppercase;
}
.hb-ka6-eyebrow b { color: var(--hb-ka6-accent); font-weight: 500; }
.hb-ka6-title {
  margin: 0;
  max-width: 620px;
  font-size: clamp(28px, 4.2cqw, 44px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -.03em;
  text-wrap: balance;
}
.hb-ka6-sub { margin: 0; max-width: 340px; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-ka6-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid rgba(255, 255, 255, .08);
  border-bottom: 1px solid rgba(255, 255, 255, .08);
}
.hb-ka6-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 36px 28px 28px;
}
.hb-ka6-cell + .hb-ka6-cell { border-left: 1px solid rgba(255, 255, 255, .08); }
.hb-ka6-cell::before {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, var(--hb-ka6-accent), transparent 70%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.2s cubic-bezier(.2, .8, .2, 1);
  transition-delay: var(--hb-ka6-d, 0s);
}
.hb-ka6[data-in="true"] .hb-ka6-cell::before { transform: scaleX(1); }
.hb-ka6-num {
  display: flex;
  align-items: baseline;
  margin: 0;
  font-size: clamp(36px, 6.6cqw, 76px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -.05em;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.hb-ka6-affix { color: #6f6f6f; font-size: .62em; font-weight: 500; letter-spacing: -.02em; }
.hb-ka6-affix[data-side="pre"] { margin-right: .04em; }
.hb-ka6-affix[data-side="post"] { margin-left: .04em; }
.hb-ka6-label { margin: 14px 0 0; color: #a1a1a1; font-size: 14px; line-height: 1.5; }
.hb-ka6-spark { display: block; width: 100%; height: 40px; margin-top: 22px; overflow: visible; }
.hb-ka6-line {
  fill: none;
  stroke: var(--hb-ka6-accent);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.6s cubic-bezier(.4, 0, .2, 1);
  transition-delay: var(--hb-ka6-d, 0s);
}
.hb-ka6-area { opacity: 0; transition: opacity 1s ease; transition-delay: calc(var(--hb-ka6-d, 0s) + .6s); }
.hb-ka6[data-in="true"] .hb-ka6-line { stroke-dashoffset: 0; }
.hb-ka6[data-in="true"] .hb-ka6-area { opacity: 1; }
.hb-ka6-delta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  color: #8f8f8f;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
}
.hb-ka6-delta svg { width: 10px; height: 10px; color: var(--hb-ka6-accent); }
.hb-ka6-foot { margin: 20px 0 0; color: #5f5f5f; font-size: 12px; }
.hb-ka6-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 860px) {
  .hb-ka6-head { flex-direction: column; align-items: flex-start; }
  .hb-ka6-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-ka6-cell:nth-child(3) { border-left: 0; }
  .hb-ka6-cell:nth-child(n + 3) { border-top: 1px solid rgba(255, 255, 255, .08); }
  .hb-ka6-num { font-size: clamp(32px, 10cqw, 72px); }
}
@container (max-width: 520px) {
  .hb-ka6-wrap { padding: 64px 16px 72px; }
  .hb-ka6-head { margin-bottom: 36px; }
  .hb-ka6-cell { padding: 24px 14px 20px; }
  .hb-ka6-cell:nth-child(odd) { padding-left: 0; }
  .hb-ka6-num { font-size: clamp(28px, 9.4cqw, 48px); }
  .hb-ka6-spark { height: 30px; margin-top: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ka6-cell::before, .hb-ka6-line, .hb-ka6-area { transition: none; }
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

function ease(x: number) {
  return 1 - Math.pow(1 - x, 4);
}

function format(n: number, decimals: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function sparkPaths(points: number[]) {
  const w = 120;
  const h = 32;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const step = points.length > 1 ? w / (points.length - 1) : w;
  const xy = points.map((p, i) => [i * step, h - 2 - ((p - min) / span) * (h - 6)]);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return { line, area };
}

const defaultStats: CounterStat[] = [
  { value: 4.2, decimals: 1, prefix: "$", suffix: "B", label: "Payment volume processed in 2026", delta: "+38% year over year", trend: [12, 14, 13, 17, 19, 18, 23, 26, 25, 31, 34, 38] },
  { value: 38000, suffix: "+", label: "Teams running payroll on Meridian", delta: "+9,400 since January", trend: [8, 9, 11, 12, 12, 15, 17, 19, 22, 24, 27, 30] },
  { value: 99.995, decimals: 3, suffix: "%", label: "API uptime over the last 12 months", delta: "26 min total downtime", trend: [30, 31, 30, 31, 31, 29, 31, 31, 30, 31, 31, 31] },
  { value: 142, label: "Countries with paying customers", delta: "+17 new markets", trend: [70, 76, 81, 88, 92, 99, 104, 112, 118, 125, 133, 142] },
];

export function StatsCounters({
  eyebrow = "Meridian in numbers",
  title = "Quietly moving money for teams in 142 countries",
  subtitle = "Every figure below is pulled from production systems and refreshed on the first of each month.",
  stats = defaultStats,
  duration = 2200,
  footnote = "Figures as of October 31, 2026.",
  accent = "#f5a524",
  className = "",
  style,
  ...rest
}: StatsCountersProps) {
  const uid = React.useId();
  const ref = React.useRef<HTMLUListElement>(null);
  const t = useProgress(ref, Math.max(duration, 200));
  const vars = { "--hb-ka6-accent": accent, ...style } as React.CSSProperties;
  const gradId = `hb-ka6-g${uid.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <section className={`hb-ka6 ${className}`} style={vars} data-in={t > 0} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-stats-counters" precedence="default">{css}</style>
      <div className="hb-ka6-wrap">
        <header className="hb-ka6-head">
          <div>
            {eyebrow && (
              <p className="hb-ka6-eyebrow">
                <b>&#9679;</b> {eyebrow}
              </p>
            )}
            <h2 id={`${uid}-t`} className="hb-ka6-title">{title}</h2>
          </div>
          {subtitle && <p className="hb-ka6-sub">{subtitle}</p>}
        </header>
        <ul ref={ref} className="hb-ka6-grid">
          {stats.map((s, i) => {
            const decimals = s.decimals ?? 0;
            const stagger = 0.08;
            const local = Math.min(Math.max((t - i * stagger) / (1 - stagger * Math.max(stats.length - 1, 0)), 0), 1);
            const shown = t >= 1 ? s.value : s.value * ease(local);
            const spark = s.trend && s.trend.length > 1 ? sparkPaths(s.trend) : null;
            const full = `${s.prefix ?? ""}${format(s.value, decimals)}${s.suffix ?? ""}`;
            return (
              <li key={`${s.label}-${i}`} className="hb-ka6-cell" style={{ "--hb-ka6-d": `${(i * 0.15).toFixed(2)}s` } as React.CSSProperties}>
                <p className="hb-ka6-num">
                  <span className="hb-ka6-sr">{full}</span>
                  <span aria-hidden="true" style={{ display: "contents" }}>
                    {s.prefix && <span className="hb-ka6-affix" data-side="pre">{s.prefix}</span>}
                    {format(shown, decimals)}
                    {s.suffix && <span className="hb-ka6-affix" data-side="post">{s.suffix}</span>}
                  </span>
                </p>
                <p className="hb-ka6-label">{s.label}</p>
                {spark && (
                  <svg className="hb-ka6-spark" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id={`${gradId}-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor={accent} stopOpacity=".28" />
                        <stop offset="1" stopColor={accent} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="hb-ka6-area" d={spark.area} fill={`url(#${gradId}-${i})`} />
                    <path className="hb-ka6-line" d={spark.line} pathLength={1} />
                  </svg>
                )}
                {s.delta && (
                  <span className="hb-ka6-delta">
                    {/^[+\-\u2212]/.test(s.delta) && (
                      <svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                        <path d={s.delta.startsWith("+") ? "M5 1l4 6H1z" : "M5 9L1 3h8z"} />
                      </svg>
                    )}
                    {s.delta}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        {footnote && <p className="hb-ka6-foot">{footnote}</p>}
      </div>
    </section>
  );
}
