"use client";

import * as React from "react";

export interface VersusSide {
  label: string;
  title: string;
  points: string[];
}

export interface VersusMetric {
  label: string;
  before: string;
  after: string;
  ratio: number;
}

export interface ComparisonVersusProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  before?: VersusSide;
  after?: VersusSide;
  metrics?: VersusMetric[];
  badge?: string;
  accent?: string;
}

const defaultBefore: VersusSide = {
  label: "Before",
  title: "Shipping a launch page the old way",
  points: [
    "Copy lives in 14 docs and nobody knows which one is final",
    "Every typo fix waits for a developer and a deploy",
    "Translations are pasted by hand into six locales",
    "Approvals happen in DMs and quietly get lost",
    "Preview links break whenever the branch changes",
  ],
};

const defaultAfter: VersusSide = {
  label: "After",
  title: "Shipping it with Inkwell",
  points: [
    "One source of truth with history on every field",
    "Editors publish in a click, developers keep their weekends",
    "Locales sync automatically into review queues",
    "Comments and sign-off live right next to the content",
    "A stable preview link for every single draft",
  ],
};

const defaultMetrics: VersusMetric[] = [
  { label: "Time to publish", before: "3 days", after: "20 min", ratio: 0.08 },
  { label: "Tools in the stack", before: "9", after: "1", ratio: 0.12 },
  { label: "Review rounds", before: "6", after: "2", ratio: 0.33 },
  { label: "Monthly spend", before: "$1,840", after: "$390", ratio: 0.21 },
];

const css = `
.hb-kc6 {
  --hb-kc6-accent: #22d3ee;
  --hb-kc6-bad: #f87171;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  isolation: isolate;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kc6 *, .hb-kc6 *::before, .hb-kc6 *::after { box-sizing: border-box; }
.hb-kc6::before {
  content: "";
  position: absolute;
  right: -10%;
  top: 10%;
  z-index: -1;
  width: 60%;
  height: 80%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kc6-accent) 14%, transparent), transparent);
  pointer-events: none;
}
.hb-kc6-inner { max-width: 1120px; margin: 0 auto; padding: 72px 18px 64px; }
.hb-kc6-head { max-width: 640px; margin: 0 auto; text-align: center; }
.hb-kc6-eyebrow { margin: 0 0 14px; color: #8f8f8f; font-size: 13px; font-weight: 550; letter-spacing: .06em; text-transform: uppercase; }
.hb-kc6-title { margin: 0; font-size: clamp(30px, 5cqi, 48px); font-weight: 650; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-kc6-title em { font-style: normal; color: var(--hb-kc6-accent); }
.hb-kc6-sub { margin: 14px auto 0; max-width: 500px; color: #8f8f8f; font-size: 16px; line-height: 1.6; text-wrap: pretty; }
.hb-kc6-split { display: grid; grid-template-columns: minmax(0, 1fr); margin-top: 44px; }
.hb-kc6-panel {
  position: relative;
  padding: 26px 22px;
  border-radius: 22px;
  animation: hb-kc6-in .9s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-kc6-panel[data-side="before"] {
  --hb-kc6-from: -24px;
  border: 1px solid rgba(255, 255, 255, .07);
  background:
    repeating-linear-gradient(135deg, rgba(255, 255, 255, .018) 0 2px, transparent 2px 10px),
    #0e0e0e;
}
.hb-kc6-panel[data-side="after"] {
  --hb-kc6-from: 24px;
  border: 1px solid color-mix(in srgb, var(--hb-kc6-accent) 35%, transparent);
  background:
    radial-gradient(90% 70% at 100% 0%, color-mix(in srgb, var(--hb-kc6-accent) 16%, transparent), transparent 70%),
    #0d1012;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 30px 80px -40px color-mix(in srgb, var(--hb-kc6-accent) 70%, transparent);
  animation-delay: .12s;
}
.hb-kc6-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 26px;
  padding: 0 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 650;
  letter-spacing: .03em;
  text-transform: uppercase;
}
.hb-kc6-chip::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.hb-kc6-panel[data-side="before"] .hb-kc6-chip { background: rgba(255, 255, 255, .05); color: #8f8f8f; }
.hb-kc6-panel[data-side="after"] .hb-kc6-chip { background: color-mix(in srgb, var(--hb-kc6-accent) 16%, transparent); color: var(--hb-kc6-accent); }
.hb-kc6-panel[data-side="after"] .hb-kc6-chip::before { box-shadow: 0 0 10px currentColor; animation: hb-kc6-blink 2s ease-in-out infinite; }
.hb-kc6-ptitle { margin: 16px 0 0; font-size: 20px; font-weight: 650; letter-spacing: -.02em; line-height: 1.25; }
.hb-kc6-panel[data-side="before"] .hb-kc6-ptitle { color: #a1a1a1; }
.hb-kc6-list { display: grid; gap: 4px; margin: 18px 0 0; padding: 0; list-style: none; }
.hb-kc6-list li { display: flex; gap: 12px; padding: 9px 0; font-size: 14.5px; line-height: 1.45; }
.hb-kc6-list li + li { border-top: 1px solid rgba(255, 255, 255, .05); }
.hb-kc6-panel[data-side="before"] .hb-kc6-list li { color: #8a8a8a; }
.hb-kc6-panel[data-side="after"] .hb-kc6-list li { color: #dcdcdc; }
.hb-kc6-ico { display: grid; place-items: center; flex: none; width: 20px; height: 20px; margin-top: 1px; border-radius: 50%; }
.hb-kc6-ico svg { width: 10px; height: 10px; }
.hb-kc6-panel[data-side="before"] .hb-kc6-ico { background: color-mix(in srgb, var(--hb-kc6-bad) 12%, transparent); color: color-mix(in srgb, var(--hb-kc6-bad) 75%, #888); }
.hb-kc6-panel[data-side="after"] .hb-kc6-ico { background: color-mix(in srgb, var(--hb-kc6-accent) 18%, transparent); color: var(--hb-kc6-accent); }
.hb-kc6-vs {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  justify-self: center;
  align-self: center;
  width: 64px;
  height: 64px;
  margin: -26px 0;
  border-radius: 50%;
  background: #0a0a0a;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: .04em;
  box-shadow: 0 0 0 6px #0a0a0a, 0 10px 30px rgba(0, 0, 0, .7);
  animation: hb-kc6-pop .7s cubic-bezier(.3, 1.6, .5, 1) .35s both;
}
.hb-kc6-vs::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, rgba(255, 255, 255, .08), var(--hb-kc6-accent), rgba(255, 255, 255, .08) 50%, var(--hb-kc6-bad), rgba(255, 255, 255, .08));
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px));
  animation: hb-kc6-spin 6s linear infinite;
}
.hb-kc6-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 20px 0 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background: #0f0f0f;
  list-style: none;
}
.hb-kc6-metric { padding: 18px 16px; box-shadow: -1px -1px 0 rgba(255, 255, 255, .07); }
.hb-kc6-mlabel { margin: 0; color: #8f8f8f; font-size: 12.5px; }
.hb-kc6-mvals { display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 8px; margin: 8px 0 0; }
.hb-kc6-old { color: #6a6a6a; font-size: 14px; text-decoration: line-through; text-decoration-color: color-mix(in srgb, var(--hb-kc6-bad) 60%, transparent); }
.hb-kc6-arrow { width: 12px; height: 12px; color: #555; }
.hb-kc6-new { color: #fff; font-size: 24px; font-weight: 650; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
.hb-kc6-bars { display: grid; gap: 4px; margin-top: 12px; }
.hb-kc6-bar { height: 4px; border-radius: 4px; transform-origin: left center; animation: hb-kc6-grow 1.1s cubic-bezier(.2, .8, .2, 1) both; }
.hb-kc6-bar[data-k="before"] { width: 100%; background: color-mix(in srgb, var(--hb-kc6-bad) 35%, #262626); animation-delay: .5s; }
.hb-kc6-bar[data-k="after"] { width: var(--hb-kc6-r); min-width: 6px; background: var(--hb-kc6-accent); box-shadow: 0 0 10px color-mix(in srgb, var(--hb-kc6-accent) 70%, transparent); animation-delay: .8s; }
.hb-kc6-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-kc6-in {
  from { opacity: 0; transform: translateX(var(--hb-kc6-from)); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-kc6-pop {
  from { opacity: 0; transform: scale(.4) rotate(-20deg); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-kc6-spin { to { transform: rotate(360deg); } }
@keyframes hb-kc6-blink { 50% { opacity: .35; } }
@keyframes hb-kc6-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@container (min-width: 760px) {
  .hb-kc6-inner { padding: 100px 32px 88px; }
  .hb-kc6-split { grid-template-columns: minmax(0, 1fr) 0 minmax(0, 1fr); column-gap: 24px; margin-top: 56px; }
  .hb-kc6-panel { padding: 32px 32px 28px; }
  .hb-kc6-vs { width: 72px; height: 72px; margin: 0 -36px; font-size: 16px; }
  .hb-kc6-metrics { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 24px; }
  .hb-kc6-metric { padding: 22px 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kc6-panel, .hb-kc6-vs, .hb-kc6-bar { animation: none; }
  .hb-kc6-vs::before, .hb-kc6-panel[data-side="after"] .hb-kc6-chip::before { animation: none; }
}
`;

function Side({ side, data }: { side: "before" | "after"; data: VersusSide }) {
  return (
    <div className="hb-kc6-panel" data-side={side}>
      <span className="hb-kc6-chip">{data.label}</span>
      <h3 className="hb-kc6-ptitle">{data.title}</h3>
      <ul className="hb-kc6-list">
        {data.points.map((p) => (
          <li key={p}>
            <span className="hb-kc6-ico" aria-hidden="true">
              {side === "before" ? (
                <svg viewBox="0 0 10 10">
                  <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 10 10">
                  <path d="M2 5.3l2 2 4-4.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ComparisonVersus({
  eyebrow = "Before and after",
  title = "Same launch. One-tenth of the busywork.",
  subtitle = "What changed for the content team at Northwind after moving 1,200 pages to Inkwell in a single sprint.",
  before = defaultBefore,
  after = defaultAfter,
  metrics = defaultMetrics,
  badge = "VS",
  accent = "#22d3ee",
  className = "",
  style,
  ...rest
}: ComparisonVersusProps) {
  const vars = { "--hb-kc6-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kc6 ${className}`} style={vars} {...rest}>
      <style href="hb-comparison-versus" precedence="default">{css}</style>
      <div className="hb-kc6-inner">
        <div className="hb-kc6-head">
          {eyebrow ? <p className="hb-kc6-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-kc6-title">{title}</h2>
          {subtitle ? <p className="hb-kc6-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-kc6-split">
          <Side side="before" data={before} />
          <span className="hb-kc6-vs" aria-hidden="true">{badge}</span>
          <Side side="after" data={after} />
        </div>
        {metrics.length ? (
          <ul className="hb-kc6-metrics">
            {metrics.map((m) => (
              <li key={m.label} className="hb-kc6-metric">
                <p className="hb-kc6-mlabel">{m.label}</p>
                <p className="hb-kc6-mvals">
                  <span className="hb-kc6-old">
                    <span className="hb-kc6-sr">{`${before.label}: `}</span>
                    {m.before}
                  </span>
                  <svg className="hb-kc6-arrow" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 6h7.5M6.5 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="hb-kc6-new">
                    <span className="hb-kc6-sr">{`, ${after.label}: `}</span>
                    {m.after}
                  </span>
                </p>
                <div className="hb-kc6-bars" aria-hidden="true">
                  <span className="hb-kc6-bar" data-k="before" />
                  <span
                    className="hb-kc6-bar"
                    data-k="after"
                    style={{ "--hb-kc6-r": `${(Math.min(1, Math.max(0, m.ratio)) * 100).toFixed(1)}%` } as React.CSSProperties}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
