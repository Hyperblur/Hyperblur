"use client";

import * as React from "react";

export interface AboutGrowthMilestone {
  year: string;
  title: string;
  text: string;
  headcount: number;
  tag: string;
}

export interface AboutGrowthTimelineProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  milestones?: AboutGrowthMilestone[];
  defaultActive?: number;
  metricLabel?: string;
  onMilestoneChange?: (index: number) => void;
  accent?: string;
}

const defaultMilestones: AboutGrowthMilestone[] = [
  { year: "2019", title: "Two people and a spare bedroom", text: "Lea and Marten ship the first sync engine for field crews. Twelve customers pay by bank transfer.", headcount: 2, tag: "Founded" },
  { year: "2020", title: "Offline mode that actually works", text: "Crews in the Alps keep working with no signal. Revenue triples while everyone else is pausing hiring.", headcount: 9, tag: "Seed, 3.2M" },
  { year: "2021", title: "First office in Ghent", text: "A converted textile mill with too many stairs. Support moves in-house and response time drops to 40 minutes.", headcount: 24, tag: "Office" },
  { year: "2022", title: "Platform for partners", text: "The public API opens. Forty integrations arrive in six months, most built by customers themselves.", headcount: 51, tag: "Series A" },
  { year: "2024", title: "Profitable, on purpose", text: "We slow hiring, fix the roadmap and break even in Q3 without cutting a single role.", headcount: 78, tag: "Break-even" },
  { year: "2026", title: "Eleven countries, one calm team", text: "Over 3,400 companies schedule their crews with us. Still no open-plan office, still no weekend deploys.", headcount: 112, tag: "Today" },
];

const css = `
@keyframes hb-wd4-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
.hb-wd4 {
  --hb-wd4-accent: #8b5cf6;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wd4 *, .hb-wd4 *::before, .hb-wd4 *::after { box-sizing: border-box; }
.hb-wd4-in { max-width: 1120px; margin: 0 auto; padding: 72px 20px 96px; display: grid; gap: 36px; }
@container (min-width: 860px) { .hb-wd4-in { grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; } }
.hb-wd4-side { display: grid; gap: 22px; }
@container (min-width: 860px) { .hb-wd4-side { position: sticky; top: 24px; } }
.hb-wd4-eyebrow { font: 500 12px/1 var(--font-mono, monospace); letter-spacing: 0.08em; text-transform: uppercase; color: var(--hb-wd4-accent); }
.hb-wd4-title { margin: 12px 0 10px; font: 600 clamp(30px, 4.4cqw, 46px)/1.04 var(--font-grotesk, inherit); letter-spacing: -0.03em; }
.hb-wd4-sub { margin: 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; max-width: 42ch; }
.hb-wd4-panel { position: relative; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, #131313, #0e0e0e); padding: 20px 20px 14px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.05); overflow: hidden; }
.hb-wd4-panel::before { content: ""; position: absolute; inset: -40% -20% auto auto; width: 70%; height: 90%; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-wd4-accent) 22%, transparent), transparent); pointer-events: none; }
.hb-wd4-readout { position: relative; display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
.hb-wd4-year { font: 600 clamp(44px, 7cqw, 68px)/0.9 var(--font-grotesk, inherit); letter-spacing: -0.04em; font-variant-numeric: tabular-nums; }
.hb-wd4-count { text-align: right; }
.hb-wd4-count b { display: block; font: 600 30px/1 var(--font-grotesk, inherit); font-variant-numeric: tabular-nums; color: var(--hb-wd4-accent); }
.hb-wd4-count span { font: 500 11px/1 var(--font-mono, monospace); color: #8f8f8f; letter-spacing: 0.08em; text-transform: uppercase; }
.hb-wd4-live { display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; font: 500 11px/1 var(--font-mono, monospace); color: #a1a1a1; }
.hb-wd4-live::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-wd4-accent); animation: hb-wd4-blink 1.6s ease-in-out infinite; }
.hb-wd4-chart { display: block; width: 100%; height: auto; margin-top: 12px; overflow: visible; }
.hb-wd4-clip { transition: width 0.9s cubic-bezier(0.65, 0, 0.35, 1); }
.hb-wd4-node { transition: r 0.4s cubic-bezier(0.34, 1.5, 0.5, 1), fill 0.3s ease; cursor: pointer; }
.hb-wd4-node:focus-visible { outline: none; stroke: #fff; stroke-width: 2; }
.hb-wd4-axis { font: 500 10px var(--font-mono, monospace); fill: #5f5f5f; }
.hb-wd4-axis[data-on="true"] { fill: #ededed; }
.hb-wd4-list { list-style: none; margin: 0; padding: 0; position: relative; display: grid; gap: 14px; }
.hb-wd4-list::before { content: ""; position: absolute; left: 15px; top: 8px; bottom: 8px; width: 1px; background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)); }
.hb-wd4-item { position: relative; padding-left: 48px; opacity: 0.38; transform: translateY(10px); transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1); }
.hb-wd4-item[data-seen="true"] { opacity: 0.62; transform: none; }
.hb-wd4-item[data-active="true"] { opacity: 1; }
.hb-wd4-bullet { position: absolute; left: 8px; top: 22px; width: 15px; height: 15px; border-radius: 50%; background: #0a0a0a; border: 2px solid #3a3a3a; transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.5, 0.5, 1); }
.hb-wd4-item[data-active="true"] .hb-wd4-bullet { border-color: var(--hb-wd4-accent); box-shadow: 0 0 0 5px color-mix(in srgb, var(--hb-wd4-accent) 20%, transparent); transform: scale(1.1); }
.hb-wd4-card { appearance: none; width: 100%; text-align: left; font-family: inherit; color: inherit; display: grid; gap: 8px; padding: 18px 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); background: #101010; cursor: pointer; transition: border-color 0.3s ease, background-color 0.3s ease; }
.hb-wd4-card:hover { border-color: rgba(255,255,255,0.14); }
.hb-wd4-item[data-active="true"] .hb-wd4-card { border-color: color-mix(in srgb, var(--hb-wd4-accent) 45%, transparent); background: linear-gradient(180deg, color-mix(in srgb, var(--hb-wd4-accent) 7%, #121212), #101010); }
.hb-wd4-card:focus-visible { outline: 2px solid var(--hb-wd4-accent); outline-offset: 3px; }
.hb-wd4-meta { display: flex; align-items: center; gap: 10px; }
.hb-wd4-meta b { font: 600 13px/1 var(--font-mono, monospace); color: #a1a1a1; }
.hb-wd4-tag { font: 500 11px/1 inherit; padding: 4px 8px; border-radius: 999px; background: rgba(255,255,255,0.06); color: #cfcfcf; }
.hb-wd4-item[data-active="true"] .hb-wd4-tag { background: color-mix(in srgb, var(--hb-wd4-accent) 22%, transparent); color: #fff; }
.hb-wd4-meta small { margin-left: auto; font: 500 11px/1 var(--font-mono, monospace); color: #6f6f6f; }
.hb-wd4-h { display: block; font: 600 18px/1.25 var(--font-grotesk, inherit); letter-spacing: -0.015em; }
.hb-wd4-p { display: block; font-size: 14px; line-height: 1.6; color: #9a9a9a; }
@media (prefers-reduced-motion: reduce) {
  .hb-wd4 *, .hb-wd4 *::before, .hb-wd4 *::after { animation: none !important; transition: none !important; }
  .hb-wd4-item { transform: none; opacity: 1; }
}
`;

function useTween(target: number) {
  const [v, setV] = React.useState(target);
  const from = React.useRef(target);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      const id = requestAnimationFrame(() => setV(target));
      return () => cancelAnimationFrame(id);
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / 900);
      const e = 1 - Math.pow(1 - k, 3);
      const cur = a + (target - a) * e;
      from.current = cur;
      setV(cur);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return Math.round(v);
}

export function AboutGrowthTimeline({
  eyebrow = "Our story",
  title = "Seven years, grown one careful hire at a time",
  subtitle = "Scroll through the moments that shaped Fieldline. The chart follows along, so you can see the team grow with each chapter.",
  milestones = defaultMilestones,
  defaultActive = 2,
  metricLabel = "people on the team",
  onMilestoneChange,
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: AboutGrowthTimelineProps) {
  const uid = React.useId().replace(/:/g, "");
  const [active, setActive] = React.useState(Math.min(defaultActive, milestones.length - 1));
  const [seen, setSeen] = React.useState<Set<number>>(() => new Set(Array.from({ length: Math.min(defaultActive, milestones.length - 1) + 1 }, (_, i) => i)));
  const items = React.useRef<(HTMLLIElement | null)[]>([]);
  const cb = React.useRef(onMilestoneChange);
  React.useEffect(() => {
    cb.current = onMilestoneChange;
  });

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.index);
          setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));
          setActive((a) => {
            if (a !== i) cb.current?.(i);
            return i;
          });
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [milestones.length]);

  const select = (i: number) => {
    setActive(i);
    setSeen((s) => new Set(s).add(i));
    onMilestoneChange?.(i);
  };

  const W = 480;
  const H = 190;
  const pad = 14;
  const max = Math.max(...milestones.map((m) => m.headcount)) * 1.1;
  const pts = milestones.map((m, i) => [pad + (i * (W - pad * 2)) / Math.max(1, milestones.length - 1), H - 22 - (m.headcount / max) * (H - 44)] as const);
  let line = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = ((x0 + x1) / 2).toFixed(1);
    line += ` C${mx} ${y0.toFixed(1)} ${mx} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${H - 22} L${pts[0][0].toFixed(1)} ${H - 22}Z`;
  const clipW = (pts[active][0] + 6).toFixed(1);
  const count = useTween(milestones[active].headcount);

  return (
    <section className={`hb-wd4 ${className}`} style={{ "--hb-wd4-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-about-growth-timeline" precedence="default">{css}</style>
      <div className="hb-wd4-in">
        <div className="hb-wd4-side">
          <div>
            <div className="hb-wd4-eyebrow">{eyebrow}</div>
            <h2 className="hb-wd4-title">{title}</h2>
            <p className="hb-wd4-sub">{subtitle}</p>
          </div>
          <div className="hb-wd4-panel">
            <div className="hb-wd4-readout" aria-live="polite">
              <div>
                <div className="hb-wd4-year">{milestones[active].year}</div>
                <span className="hb-wd4-live">{milestones[active].tag}</span>
              </div>
              <div className="hb-wd4-count">
                <b>{count}</b>
                <span>{metricLabel}</span>
              </div>
            </div>
            <svg className="hb-wd4-chart" viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Team growth by year">
              <defs>
                <linearGradient id={`hb-wd4-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--hb-wd4-accent)" stopOpacity="0.45" />
                  <stop offset="1" stopColor="var(--hb-wd4-accent)" stopOpacity="0" />
                </linearGradient>
                <clipPath id={`hb-wd4-clip-${uid}`}>
                  <rect className="hb-wd4-clip" x="0" y="0" height={H} style={{ width: `${clipW}px` }} />
                </clipPath>
              </defs>
              {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1={pad} x2={W - pad} y1={(22 + g * (H - 44)).toFixed(1)} y2={(22 + g * (H - 44)).toFixed(1)} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 5" />
              ))}
              <path d={line} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 6" />
              <g clipPath={`url(#hb-wd4-clip-${uid})`}>
                <path d={area} fill={`url(#hb-wd4-fill-${uid})`} />
                <path d={line} fill="none" stroke="var(--hb-wd4-accent)" strokeWidth="2.5" strokeLinecap="round" />
              </g>
              <line x1={pts[active][0].toFixed(1)} x2={pts[active][0].toFixed(1)} y1={pts[active][1].toFixed(1)} y2={H - 22} stroke="var(--hb-wd4-accent)" strokeOpacity="0.4" strokeDasharray="2 3" style={{ transition: "all 0.9s cubic-bezier(0.65,0,0.35,1)" }} />
              {pts.map(([x, y], i) => (
                <g key={i}>
                  <circle
                    className="hb-wd4-node"
                    cx={x.toFixed(1)}
                    cy={y.toFixed(1)}
                    r={i === active ? 7 : 4}
                    fill={i <= active ? "var(--hb-wd4-accent)" : "#2a2a2a"}
                    stroke="#0e0e0e"
                    strokeWidth="3"
                    tabIndex={0}
                    role="button"
                    aria-label={`${milestones[i].year}: ${milestones[i].headcount} people`}
                    onClick={() => select(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        select(i);
                      }
                    }}
                  />
                  <text className="hb-wd4-axis" data-on={i === active} x={x.toFixed(1)} y={H - 4} textAnchor={i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"}>
                    {milestones[i].year}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
        <ol className="hb-wd4-list">
          {milestones.map((m, i) => (
            <li
              key={m.year + m.title}
              ref={(el) => {
                items.current[i] = el;
              }}
              data-index={i}
              className="hb-wd4-item"
              data-seen={seen.has(i)}
              data-active={i === active}
            >
              <span className="hb-wd4-bullet" aria-hidden="true" />
              <button type="button" className="hb-wd4-card" aria-current={i === active ? "step" : undefined} onClick={() => select(i)}>
                <span className="hb-wd4-meta">
                  <b>{m.year}</b>
                  <span className="hb-wd4-tag">{m.tag}</span>
                  <small>{m.headcount} people</small>
                </span>
                <span className="hb-wd4-h">{m.title}</span>
                <span className="hb-wd4-p">{m.text}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
