"use client";

import * as React from "react";

export interface HowDashedStep {
  title: string;
  description: string;
  meta?: string;
}

export interface HowDashedPathProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: HowDashedStep[];
  cta?: { label: string; href: string };
  duration?: number;
  accent?: string;
}

const defaultSteps: HowDashedStep[] = [
  { title: "Tell us about your space", description: "Answer six quick questions about rooms, light and the way you live.", meta: "3 minutes" },
  { title: "Meet your designer", description: "A video call with one of our 140 interior designers, matched to your style.", meta: "Within 48 hours" },
  { title: "Review two concepts", description: "Moodboards, floor plans and a shoppable list you can tweak line by line.", meta: "Day 7" },
  { title: "Everything arrives", description: "We order, track and coordinate delivery. You unpack and enjoy the room.", meta: "Week 3" },
];

const css = `
.hb-yj6 {
  --hb-yj6-accent: #e0613a;
  --hb-yj6-ink: #1f1d19;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #f7f5ef;
  color: var(--hb-yj6-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yj6 *, .hb-yj6 *::before, .hb-yj6 *::after { box-sizing: border-box; }
.hb-yj6::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(35% 45% at 12% 85%, color-mix(in srgb, var(--hb-yj6-accent) 10%, transparent), transparent 70%),
    radial-gradient(30% 40% at 92% 10%, rgba(47, 92, 160, .07), transparent 70%);
  pointer-events: none;
}
.hb-yj6-inner { max-width: 1120px; margin: 0 auto; padding: 72px 20px; }
@container (min-width: 860px) { .hb-yj6-inner { padding: 100px 32px 108px; } }
.hb-yj6-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px 40px;
  margin-bottom: 40px;
}
.hb-yj6-eyebrow {
  display: inline-block;
  margin: 0 0 14px;
  padding: 5px 11px;
  border: 1px solid rgba(31, 29, 25, .12);
  border-radius: 999px;
  color: #6f6a60;
  font-size: 12.5px;
  font-weight: 500;
}
.hb-yj6-title {
  margin: 0;
  max-width: 600px;
  font-size: clamp(30px, 4.8cqw, 48px);
  line-height: 1.04;
  letter-spacing: -.035em;
  font-weight: 650;
  text-wrap: balance;
}
.hb-yj6-sub { margin: 14px 0 0; max-width: 500px; color: #6f6a60; font-size: 16px; line-height: 1.6; }
.hb-yj6-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  background: var(--hb-yj6-ink);
  color: #f7f5ef;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: transform .2s ease, background .2s ease;
}
.hb-yj6-cta:hover { transform: translateY(-1px); background: #000; }
.hb-yj6-cta:focus-visible { outline: 2px solid var(--hb-yj6-accent); outline-offset: 3px; }
.hb-yj6-stage { position: relative; display: grid; gap: 18px; padding-left: 42px; }
.hb-yj6-svg { display: none; }
.hb-yj6-vline {
  position: absolute;
  left: 15px;
  top: 20px;
  bottom: 20px;
  width: 2px;
  background: repeating-linear-gradient(180deg, color-mix(in srgb, var(--hb-yj6-ink) 30%, transparent) 0 6px, transparent 6px 12px);
  background-size: 2px 12px;
  animation: hb-yj6-vmarch 1s linear infinite;
}
.hb-yj6-vdot {
  position: absolute;
  left: 9px;
  top: 20px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--hb-yj6-accent);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--hb-yj6-accent) 20%, transparent);
  animation: hb-yj6-vtravel var(--hb-yj6-dur) cubic-bezier(.6, 0, .4, 1) infinite;
}
.hb-yj6-card {
  position: relative;
  z-index: 1;
  padding: 22px;
  border: 1px solid rgba(31, 29, 25, .1);
  border-radius: 18px;
  background: #fffdf8;
  box-shadow: 0 1px 0 #fff inset, 0 1px 2px rgba(31, 29, 25, .05), 0 18px 40px -26px rgba(31, 29, 25, .35);
  animation: hb-yj6-glow var(--hb-yj6-dur) ease-in-out infinite;
  animation-delay: calc(var(--hb-yj6-i) * var(--hb-yj6-dur) / 4);
}
.hb-yj6-badge {
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--hb-yj6-ink);
  color: #f7f5ef;
  font-size: 15px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  animation: hb-yj6-badge var(--hb-yj6-dur) ease-in-out infinite;
  animation-delay: inherit;
}
.hb-yj6-card h3 { margin: 16px 0 0; font-size: 18px; line-height: 1.25; letter-spacing: -.015em; font-weight: 620; }
.hb-yj6-card p { margin: 8px 0 0; color: #6f6a60; font-size: 14.5px; line-height: 1.55; }
.hb-yj6-meta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  color: #8a8478;
  font: 500 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.hb-yj6-meta::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-yj6-accent); }
@container (min-width: 860px) {
  .hb-yj6-stage { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; padding: 0; }
  .hb-yj6-vline, .hb-yj6-vdot { display: none; }
  .hb-yj6-svg { display: block; grid-column: 1 / -1; width: 100%; height: auto; aspect-ratio: 1000 / 130; overflow: visible; margin-bottom: 4px; }
  .hb-yj6-card:nth-of-type(even) { margin-top: 36px; }
}
.hb-yj6-path-bg { fill: none; stroke: color-mix(in srgb, var(--hb-yj6-ink) 12%, transparent); stroke-width: 10; stroke-linecap: round; }
.hb-yj6-path {
  fill: none;
  stroke: color-mix(in srgb, var(--hb-yj6-ink) 45%, transparent);
  stroke-width: 2;
  stroke-dasharray: 7 9;
  stroke-linecap: round;
  animation: hb-yj6-march 1.2s linear infinite;
}
.hb-yj6-trail { fill: none; stroke: var(--hb-yj6-accent); stroke-width: 2.5; stroke-linecap: round; opacity: .9; }
@keyframes hb-yj6-march { to { stroke-dashoffset: -32; } }
@keyframes hb-yj6-vmarch { to { background-position: 0 12px; } }
@keyframes hb-yj6-vtravel {
  0% { top: 20px; }
  75%, 100% { top: calc(100% - 34px); }
}
@keyframes hb-yj6-glow {
  0%, 26%, 100% { border-color: rgba(31, 29, 25, .1); transform: translateY(0); }
  4%, 20% { border-color: color-mix(in srgb, var(--hb-yj6-accent) 55%, transparent); transform: translateY(-4px); }
}
@keyframes hb-yj6-badge {
  0%, 26%, 100% { background: var(--hb-yj6-ink); }
  4%, 20% { background: var(--hb-yj6-accent); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yj6 *, .hb-yj6 *::before, .hb-yj6 *::after { animation: none !important; transition: none !important; }
  .hb-yj6-vdot, .hb-yj6-mover { display: none; }
}
`;

const POINTS = [
  { x: 125, y: 28 },
  { x: 375, y: 100 },
  { x: 625, y: 28 },
  { x: 875, y: 100 },
];

const PATH = "M 125 28 C 250 28, 250 100, 375 100 S 500 28, 625 28 S 750 100, 875 100";

export function HowDashedPath({
  eyebrow = "How it works",
  title = "A finished room in three weeks, not three months",
  subtitle = "One designer, one plan and one delivery date. You stay in charge of every decision.",
  steps = defaultSteps,
  cta = { label: "Book a free call", href: "#" },
  duration = 8,
  accent = "#e0613a",
  className,
  style,
  ...rest
}: HowDashedPathProps) {
  const rawId = React.useId();
  const pathId = `hb-yj6-p${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const shown = steps.slice(0, 4);
  const dur = Math.max(2, duration);

  return (
    <section
      className={["hb-yj6", className].filter(Boolean).join(" ")}
      style={{ "--hb-yj6-accent": accent, "--hb-yj6-dur": `${dur}s`, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-how-dashed-path" precedence="default">{css}</style>
      <div className="hb-yj6-inner">
        <div className="hb-yj6-head">
          <div>
            {eyebrow ? <p className="hb-yj6-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-yj6-title">{title}</h2>
            {subtitle ? <p className="hb-yj6-sub">{subtitle}</p> : null}
          </div>
          {cta ? (
            <a className="hb-yj6-cta" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
        </div>
        <div className="hb-yj6-stage" role="list">
          <svg className="hb-yj6-svg" viewBox="0 0 1000 130" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <path id={pathId} className="hb-yj6-path-bg" d={PATH} />
            <path className="hb-yj6-path" d={PATH} />
            {POINTS.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="13" fill="#fffdf8" stroke="currentColor" strokeOpacity=".18" strokeWidth="1.5" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor" opacity=".6">
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            ))}
            <g className="hb-yj6-mover">
              <circle r="16" fill={accent} opacity=".18">
                <animateMotion dur={`${dur}s`} repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.75;1" calcMode="linear">
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
              <circle r="8" fill={accent} stroke="#fffdf8" strokeWidth="3">
                <animateMotion dur={`${dur}s`} repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.75;1" calcMode="linear">
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          </svg>
          <span className="hb-yj6-vline" aria-hidden="true" />
          <span className="hb-yj6-vdot" aria-hidden="true" />
          {shown.map((s, i) => (
            <div role="listitem" key={s.title + i} className="hb-yj6-card" style={{ "--hb-yj6-i": i } as React.CSSProperties}>
              <span className="hb-yj6-badge">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              {s.meta ? <span className="hb-yj6-meta">{s.meta}</span> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
