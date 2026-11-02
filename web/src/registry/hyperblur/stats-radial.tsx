"use client";

import * as React from "react";

export interface RadialStat {
  value: number;
  max?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  caption?: string;
  label: string;
  description?: string;
}

export interface StatsRadialProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  stats?: RadialStat[];
  footnote?: string;
  duration?: number;
  accent?: string;
}

const css = `
.hb-ka8 {
  --hb-ka8-accent: #2f7bff;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  container-type: inline-size;
  background: #ffffff;
  color: #111111;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ka8 *, .hb-ka8 *::before, .hb-ka8 *::after { box-sizing: border-box; }
.hb-ka8::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(17, 17, 17, .09) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask: radial-gradient(70% 60% at 50% 0%, #000, transparent 75%);
  mask: radial-gradient(70% 60% at 50% 0%, #000, transparent 75%);
  pointer-events: none;
}
.hb-ka8-wrap { position: relative; max-width: 1120px; margin: 0 auto; padding: 80px 24px 96px; }
.hb-ka8-head { max-width: 640px; margin: 0 auto 48px; text-align: center; }
.hb-ka8-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  padding: 5px 12px;
  border: 1px solid #e8e8e8;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .04);
  color: #555;
  font-size: 12.5px;
  font-weight: 500;
}
.hb-ka8-eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-ka8-accent); }
.hb-ka8-title {
  margin: 0;
  font-size: clamp(28px, 4.2cqw, 44px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-ka8-sub { margin: 14px 0 0; color: #666; font-size: 16px; line-height: 1.6; }
.hb-ka8-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-ka8-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  padding: 32px 28px 30px;
  border: 1px solid #ececec;
  border-radius: 22px;
  background: linear-gradient(180deg, #fff, #fbfbfb);
  box-shadow: 0 1px 0 #fff inset, 0 1px 2px rgba(0, 0, 0, .04), 0 18px 40px -24px rgba(0, 0, 0, .14);
  text-align: center;
  transition: transform .4s cubic-bezier(.2, .8, .2, 1), box-shadow .4s ease;
}
.hb-ka8-card:hover { transform: translateY(-3px); box-shadow: 0 1px 0 #fff inset, 0 2px 4px rgba(0, 0, 0, .04), 0 28px 50px -26px rgba(0, 0, 0, .2); }
.hb-ka8-ring { position: relative; width: min(100%, 188px); aspect-ratio: 1; }
.hb-ka8-ring svg { display: block; width: 100%; height: 100%; }
.hb-ka8-track { fill: none; stroke: #f0f0f0; stroke-width: 12; }
.hb-ka8-arc { fill: none; stroke-width: 12; stroke-linecap: round; }
.hb-ka8-tick { stroke: #e2e2e2; stroke-width: 1.4; stroke-linecap: round; }
.hb-ka8-tick[data-on="true"] { stroke: var(--hb-ka8-accent); }
.hb-ka8-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hb-ka8-num {
  display: flex;
  align-items: baseline;
  font-size: clamp(34px, 4cqw, 44px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -.045em;
  font-variant-numeric: tabular-nums;
}
.hb-ka8-num small { margin-left: 2px; color: #8a8a8a; font-size: .45em; font-weight: 600; letter-spacing: 0; }
.hb-ka8-cap { margin-top: 6px; color: #8a8a8a; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-ka8-label { margin: 22px 0 0; font-size: 17px; font-weight: 600; letter-spacing: -.01em; }
.hb-ka8-desc { margin: 8px 0 0; max-width: 300px; color: #666; font-size: 14px; line-height: 1.6; }
.hb-ka8-foot { margin: 28px 0 0; color: #8a8a8a; font-size: 12.5px; text-align: center; }
.hb-ka8-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 820px) {
  .hb-ka8-grid { grid-template-columns: minmax(0, 1fr); max-width: 520px; margin: 0 auto; }
  .hb-ka8-card { display: grid; grid-template-columns: 140px minmax(0, 1fr); align-items: center; gap: 4px 24px; text-align: left; padding: 24px; }
  .hb-ka8-ring { grid-row: span 2; width: 140px; }
  .hb-ka8-label { margin: 0; align-self: end; }
  .hb-ka8-desc { align-self: start; }
  .hb-ka8-num { font-size: 30px; }
}
@container (max-width: 460px) {
  .hb-ka8-wrap { padding: 64px 16px 72px; }
  .hb-ka8-head { margin-bottom: 32px; }
  .hb-ka8-card { grid-template-columns: 104px minmax(0, 1fr); gap: 4px 16px; padding: 18px; border-radius: 18px; }
  .hb-ka8-ring { width: 104px; }
  .hb-ka8-num { font-size: 24px; }
  .hb-ka8-cap { display: none; }
  .hb-ka8-label { font-size: 15px; }
  .hb-ka8-desc { font-size: 13px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ka8-card { transition: none; }
  .hb-ka8-card:hover { transform: none; }
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
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

const TICKS = 48;
const tickLines = Array.from({ length: TICKS }, (_, i) => {
  const a = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
  const r1 = 95;
  const r2 = i % 4 === 0 ? 100 : 98;
  return {
    x1: (100 + Math.cos(a) * r1).toFixed(2),
    y1: (100 + Math.sin(a) * r1).toFixed(2),
    x2: (100 + Math.cos(a) * r2).toFixed(2),
    y2: (100 + Math.sin(a) * r2).toFixed(2),
  };
});

const defaultStats: RadialStat[] = [
  { value: 94, suffix: "%", caption: "CSAT", label: "Customer satisfaction", description: "Up from 81% in the first quarter after switching, measured across 2,400 teams." },
  { value: 4.8, max: 5, decimals: 1, suffix: "/5", caption: "Agent rating", label: "Agents actually like it", description: "Average score from 11,300 support agents on independent review sites." },
  { value: 63, suffix: "%", caption: "Deflected", label: "Solved before a ticket", description: "Help center answers and guided flows close most questions on their own." },
];

export function StatsRadial({
  eyebrow = "Helpline customer report 2026",
  title = "Support that customers rate, and agents enjoy",
  subtitle = "Three numbers we track every week, measured the same way since our first customer.",
  stats = defaultStats,
  footnote = "Survey of 2,400 support teams, July to September 2026.",
  duration = 1800,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: StatsRadialProps) {
  const uid = React.useId();
  const ref = React.useRef<HTMLUListElement>(null);
  const t = useProgress(ref, Math.max(duration, 200));
  const gid = `hb-ka8-g${uid.replace(/[^a-zA-Z0-9]/g, "")}`;
  const vars = { "--hb-ka8-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-ka8 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-stats-radial" precedence="default">{css}</style>
      <div className="hb-ka8-wrap">
        <header className="hb-ka8-head">
          {eyebrow && (
            <p className="hb-ka8-eyebrow">
              <i aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h2 id={`${uid}-t`} className="hb-ka8-title">{title}</h2>
          {subtitle && <p className="hb-ka8-sub">{subtitle}</p>}
        </header>
        <ul ref={ref} className="hb-ka8-grid">
          {stats.map((s, i) => {
            const max = s.max ?? 100;
            const pct = Math.min(Math.max(s.value / max, 0), 1);
            const delay = i * 0.12;
            const span = Math.max(1 - 0.12 * Math.max(stats.length - 1, 0), 0.3);
            const local = t >= 1 ? 1 : ease(Math.min(Math.max((t - delay) / span, 0), 1));
            const now = pct * local;
            const decimals = s.decimals ?? 0;
            const shown = (s.value * local).toFixed(decimals);
            const full = `${s.prefix ?? ""}${s.value.toFixed(decimals)}${s.suffix ?? ""}`;
            return (
              <li key={`${s.label}-${i}`} className="hb-ka8-card">
                <div className="hb-ka8-ring">
                  <svg viewBox="0 0 200 200" aria-hidden="true">
                    <defs>
                      <linearGradient id={`${gid}-${i}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor={accent} stopOpacity=".45" />
                        <stop offset="1" stopColor={accent} />
                      </linearGradient>
                    </defs>
                    {tickLines.map((l, k) => (
                      <line key={k} className="hb-ka8-tick" data-on={k / TICKS < now} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
                    ))}
                    <circle className="hb-ka8-track" cx="100" cy="100" r="80" />
                    <circle
                      className="hb-ka8-arc"
                      cx="100"
                      cy="100"
                      r="80"
                      pathLength={100}
                      stroke={`url(#${gid}-${i})`}
                      strokeDasharray="100 100"
                      strokeDashoffset={(100 - now * 100).toFixed(2)}
                      opacity={now > 0.002 ? 1 : 0}
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className="hb-ka8-center">
                    <span className="hb-ka8-sr">{full}</span>
                    <span className="hb-ka8-num" aria-hidden="true">
                      {s.prefix}
                      {shown}
                      {s.suffix && <small>{s.suffix}</small>}
                    </span>
                    {s.caption && <span className="hb-ka8-cap">{s.caption}</span>}
                  </div>
                </div>
                <h3 className="hb-ka8-label">{s.label}</h3>
                {s.description && <p className="hb-ka8-desc">{s.description}</p>}
              </li>
            );
          })}
        </ul>
        {footnote && <p className="hb-ka8-foot">{footnote}</p>}
      </div>
    </section>
  );
}
