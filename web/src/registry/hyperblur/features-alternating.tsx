"use client";

import * as React from "react";

export interface AlternatingFeature {
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: string[];
  link?: { label: string; href: string };
  visual?: React.ReactNode;
}

export interface FeaturesAlternatingProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: AlternatingFeature[];
  accent?: string;
}

const css = `
.hb-ka2 {
  --hb-ka2-accent: #10b981;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ka2 *, .hb-ka2 *::before, .hb-ka2 *::after { box-sizing: border-box; }
.hb-ka2-wrap { max-width: 1120px; margin: 0 auto; padding: 88px 24px 112px; }
.hb-ka2-head { max-width: 720px; margin: 0 auto 72px; text-align: center; }
.hb-ka2-eyebrow {
  margin: 0 0 14px;
  color: var(--hb-ka2-accent);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.hb-ka2-title {
  margin: 0;
  font-size: clamp(28px, 4.2cqw, 44px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -.03em;
  text-wrap: balance;
}
.hb-ka2-sub { margin: 16px auto 0; max-width: 560px; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-ka2-rows { display: flex; flex-direction: column; gap: 96px; }
.hb-ka2-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr);
  align-items: center;
  gap: 72px;
}
.hb-ka2-row[data-flip="true"] { grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr); }
.hb-ka2-row[data-flip="true"] .hb-ka2-copy { order: 2; }
.hb-ka2-copy {
  min-width: 0;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity .7s ease, transform .7s cubic-bezier(.2, .8, .2, 1);
}
.hb-ka2-row[data-in="true"] .hb-ka2-copy { opacity: 1; transform: none; }
.hb-ka2-step {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 18px;
  color: #a1a1a1;
  font-size: 13px;
  font-weight: 500;
}
.hb-ka2-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 1px solid color-mix(in srgb, var(--hb-ka2-accent) 40%, transparent);
  border-radius: 8px;
  background: color-mix(in srgb, var(--hb-ka2-accent) 12%, transparent);
  color: color-mix(in srgb, var(--hb-ka2-accent) 70%, #fff);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11px;
}
.hb-ka2-row-title {
  margin: 0;
  font-size: clamp(24px, 3cqw, 32px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -.025em;
}
.hb-ka2-desc { margin: 14px 0 0; color: #8f8f8f; font-size: 16px; line-height: 1.65; }
.hb-ka2-bullets { display: grid; gap: 12px; margin: 24px 0 0; padding: 0; list-style: none; }
.hb-ka2-bullets li { display: flex; gap: 12px; color: #d4d4d4; font-size: 15px; line-height: 1.5; }
.hb-ka2-bullets svg { flex: none; width: 18px; height: 18px; margin-top: 2px; color: var(--hb-ka2-accent); }
.hb-ka2-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 28px;
  color: #ededed;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, .2);
  padding-bottom: 2px;
  transition: border-color .2s ease, color .2s ease;
}
.hb-ka2-link:hover { color: #fff; border-color: var(--hb-ka2-accent); }
.hb-ka2-link:focus-visible { outline: 2px solid var(--hb-ka2-accent); outline-offset: 4px; border-radius: 2px; }
.hb-ka2-stage {
  position: relative;
  min-width: 0;
  aspect-ratio: 5 / 4;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background:
    radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, var(--hb-ka2-accent) 16%, transparent), transparent 60%),
    linear-gradient(180deg, #131315, #0c0c0d);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 40px 80px -40px rgba(0, 0, 0, .9);
}
.hb-ka2-stage::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px);
  background-size: 28px 28px;
  -webkit-mask: radial-gradient(80% 70% at 50% 40%, #000, transparent);
  mask: radial-gradient(80% 70% at 50% 40%, #000, transparent);
  pointer-events: none;
}
.hb-ka2-ui { position: absolute; inset: 0; padding: 7%; display: flex; flex-direction: column; }
.hb-ka2-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #a1a1a1;
  font-size: 12px;
}
.hb-ka2-bar b { color: #ededed; font-weight: 600; }
.hb-ka2-pill {
  padding: 3px 9px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  font-size: 11px;
}
.hb-ka2-msgs { display: flex; flex-direction: column; gap: 10px; }
.hb-ka2-msg {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 14px;
  background: rgba(23, 23, 23, .92);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  opacity: 0;
  transform: translateX(28px);
  transition: opacity .6s ease, transform .7s cubic-bezier(.2, .8, .2, 1);
}
.hb-ka2-row[data-in="true"] .hb-ka2-msg { opacity: 1; transform: none; }
.hb-ka2-av {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #0a0a0a;
  font-size: 11px;
  font-weight: 700;
}
.hb-ka2-msg-top { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #8f8f8f; }
.hb-ka2-msg-top b { color: #ededed; font-weight: 600; }
.hb-ka2-msg p { margin: 4px 0 0; color: #c8c8c8; font-size: 12.5px; line-height: 1.45; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-ka2-tag {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-ka2-accent) 16%, transparent);
  color: color-mix(in srgb, var(--hb-ka2-accent) 70%, #fff);
  font-size: 10.5px;
  white-space: nowrap;
}
.hb-ka2-merge {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 14px;
  color: #8f8f8f;
  font-size: 12px;
  opacity: 0;
  transition: opacity .6s ease 1s;
}
.hb-ka2-row[data-in="true"] .hb-ka2-merge { opacity: 1; }
.hb-ka2-merge i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--hb-ka2-accent);
  box-shadow: 0 0 12px var(--hb-ka2-accent);
}
.hb-ka2-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-ka2-path {
  fill: none;
  stroke: rgba(255, 255, 255, .16);
  stroke-width: 1.5;
  stroke-dasharray: 320;
  stroke-dashoffset: 320;
  transition: stroke-dashoffset 1.4s cubic-bezier(.4, 0, .2, 1);
}
.hb-ka2-path[data-hot="true"] { stroke: var(--hb-ka2-accent); stroke-opacity: .8; }
.hb-ka2-row[data-in="true"] .hb-ka2-path { stroke-dashoffset: 0; }
.hb-ka2-node rect { fill: #161618; stroke: rgba(255, 255, 255, .12); }
.hb-ka2-node[data-hot="true"] rect { stroke: var(--hb-ka2-accent); fill: color-mix(in srgb, var(--hb-ka2-accent) 12%, #161618); }
.hb-ka2-node text { fill: #ededed; font-size: 12px; font-weight: 500; font-family: inherit; }
.hb-ka2-node text.hb-ka2-small { fill: #8f8f8f; font-size: 10px; font-weight: 400; }
.hb-ka2-node {
  opacity: 0;
  transition: opacity .5s ease;
}
.hb-ka2-row[data-in="true"] .hb-ka2-node { opacity: 1; }
.hb-ka2-pulse { fill: var(--hb-ka2-accent); opacity: 0; transition: opacity .4s ease 1.4s; }
.hb-ka2-row[data-in="true"] .hb-ka2-pulse { opacity: 1; }
.hb-ka2-kpis { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-bottom: 14px; }
.hb-ka2-kpi {
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 12px;
  background: rgba(23, 23, 23, .9);
}
.hb-ka2-kpi span { display: block; color: #8f8f8f; font-size: 11px; }
.hb-ka2-kpi b { display: block; margin-top: 2px; font-size: 20px; font-weight: 600; letter-spacing: -.02em; }
.hb-ka2-kpi em { color: var(--hb-ka2-accent); font-size: 11px; font-style: normal; margin-left: 6px; }
.hb-ka2-chart {
  position: relative;
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 4%;
  min-height: 0;
  padding: 12px 12px 26px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 12px;
  background: rgba(17, 17, 17, .9);
}
.hb-ka2-col { position: relative; flex: 1; height: 100%; display: flex; align-items: flex-end; }
.hb-ka2-fill {
  width: 100%;
  border-radius: 6px 6px 2px 2px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .22), rgba(255, 255, 255, .06));
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform .9s cubic-bezier(.2, .8, .2, 1);
}
.hb-ka2-col[data-hot="true"] .hb-ka2-fill { background: linear-gradient(180deg, var(--hb-ka2-accent), color-mix(in srgb, var(--hb-ka2-accent) 25%, transparent)); box-shadow: 0 0 24px -4px color-mix(in srgb, var(--hb-ka2-accent) 60%, transparent); }
.hb-ka2-row[data-in="true"] .hb-ka2-fill { transform: scaleY(1); }
.hb-ka2-col span {
  position: absolute;
  left: 50%;
  bottom: -20px;
  transform: translateX(-50%);
  color: #6f6f6f;
  font-size: 10px;
  white-space: nowrap;
}
@container (max-width: 800px) {
  .hb-ka2-row, .hb-ka2-row[data-flip="true"] { grid-template-columns: minmax(0, 1fr); gap: 36px; }
  .hb-ka2-row[data-flip="true"] .hb-ka2-copy { order: 0; }
  .hb-ka2-rows { gap: 72px; }
}
@container (max-width: 520px) {
  .hb-ka2-wrap { padding: 64px 16px 80px; }
  .hb-ka2-head { margin-bottom: 48px; }
  .hb-ka2-stage { aspect-ratio: 4 / 4.2; border-radius: 16px; }
  .hb-ka2-ui { padding: 18px; }
  .hb-ka2-msg:nth-child(3) { display: none; }
  .hb-ka2-tag { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ka2-copy, .hb-ka2-msg, .hb-ka2-merge, .hb-ka2-node, .hb-ka2-path, .hb-ka2-fill, .hb-ka2-link { transition: none; }
  .hb-ka2-copy, .hb-ka2-msg, .hb-ka2-merge, .hb-ka2-node { opacity: 1; transform: none; }
  .hb-ka2-path { stroke-dashoffset: 0; }
  .hb-ka2-fill { transform: none; }
  .hb-ka2-pulse { display: none; }
}
`;

function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

const messages = [
  { name: "Priya Raman", co: "Northbeam", source: "Support chat", text: "Can we export the weekly digest as CSV for our board deck?", tag: "Exports", color: "#f5a524" },
  { name: "Tom Becker", co: "Halcyon", source: "Sales call", text: "Blocker for renewal: we need SSO before Q1 rollout.", tag: "Security", color: "#7fb3ff" },
  { name: "Lena Ortiz", co: "Parcel & Co", source: "In-app widget", text: "Would love a CSV export, finance asks for it every Monday.", tag: "Exports", color: "#f472b6" },
];

function InboxVisual() {
  return (
    <div className="hb-ka2-ui">
      <div className="hb-ka2-bar">
        <span>
          <b>Inbox</b> &middot; 128 new this week
        </span>
        <span className="hb-ka2-pill">All sources</span>
      </div>
      <div className="hb-ka2-msgs">
        {messages.map((m, i) => (
          <div key={m.name} className="hb-ka2-msg" style={{ transitionDelay: `${(0.15 + i * 0.16).toFixed(2)}s` }}>
            <span className="hb-ka2-av" style={{ background: m.color }} aria-hidden="true">
              {m.name.split(" ").map((p) => p[0]).join("")}
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="hb-ka2-msg-top">
                <b>{m.name}</b>
                <span>{m.source}</span>
                <span className="hb-ka2-tag">{m.tag}</span>
              </div>
              <p>{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="hb-ka2-merge">
        <i aria-hidden="true" />
        2 requests merged into &ldquo;CSV export for digests&rdquo; &middot; 41 voices
      </div>
    </div>
  );
}

const flowPaths = [
  { d: "M120 150 C 160 150, 160 150, 196 150", hot: true },
  { d: "M288 150 C 320 150, 316 70, 352 70", hot: false },
  { d: "M288 150 C 330 150, 320 150, 352 150", hot: true },
  { d: "M288 150 C 320 150, 316 230, 352 230", hot: false },
];

function FlowVisual() {
  return (
    <svg className="hb-ka2-svg" viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {flowPaths.map((p, i) => (
        <path key={i} className="hb-ka2-path" d={p.d} data-hot={p.hot} style={{ transitionDelay: `${(0.2 + i * 0.18).toFixed(2)}s` }} />
      ))}
      <g className="hb-ka2-node" data-hot="false">
        <rect x="16" y="124" width="104" height="52" rx="12" />
        <text x="30" y="146">New request</text>
        <text className="hb-ka2-small" x="30" y="162">Halcyon &middot; $48k ARR</text>
      </g>
      <g className="hb-ka2-node" data-hot="true" style={{ transitionDelay: ".3s" }}>
        <rect x="196" y="118" width="92" height="64" rx="14" />
        <text x="212" y="145">Classify</text>
        <text className="hb-ka2-small" x="212" y="162">Security &middot; 0.94</text>
      </g>
      {[
        { y: 44, t: "Billing", s: "2 open" },
        { y: 124, t: "Platform", s: "Owner: Mei" },
        { y: 204, t: "Success", s: "12 open" },
      ].map((n, i) => (
        <g key={n.t} className="hb-ka2-node" data-hot={i === 1} style={{ transitionDelay: `${(0.7 + i * 0.12).toFixed(2)}s` }}>
          <rect x="352" y={n.y} width="112" height="52" rx="12" />
          <text x="366" y={n.y + 22}>{n.t}</text>
          <text className="hb-ka2-small" x="366" y={n.y + 38}>{n.s}</text>
        </g>
      ))}
      <circle className="hb-ka2-pulse" r="4">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M120 150 C 160 150, 160 150, 196 150 L 288 150 C 330 150, 320 150, 352 150" />
      </circle>
    </svg>
  );
}

const bars = [
  { m: "Jul", v: 0.42 },
  { m: "Aug", v: 0.55 },
  { m: "Sep", v: 0.49 },
  { m: "Oct", v: 0.68 },
  { m: "Nov", v: 0.74 },
  { m: "Dec", v: 0.92, hot: true },
];

function ChartVisual() {
  return (
    <div className="hb-ka2-ui">
      <div className="hb-ka2-kpis">
        <div className="hb-ka2-kpi">
          <span>Revenue at stake</span>
          <b>
            $1.82M<em>+24%</em>
          </b>
        </div>
        <div className="hb-ka2-kpi">
          <span>Requests shipped</span>
          <b>
            63<em>this quarter</em>
          </b>
        </div>
      </div>
      <div className="hb-ka2-chart">
        {bars.map((b, i) => (
          <div key={b.m} className="hb-ka2-col" data-hot={Boolean(b.hot)}>
            <div className="hb-ka2-fill" style={{ height: `${(b.v * 100).toFixed(1)}%`, transitionDelay: `${(0.2 + i * 0.09).toFixed(2)}s` }} />
            <span>{b.m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const builtIn: React.ReactNode[] = [<InboxVisual key="inbox" />, <FlowVisual key="flow" />, <ChartVisual key="chart" />];

const defaultFeatures: AlternatingFeature[] = [
  {
    eyebrow: "Capture",
    title: "Every request lands in one inbox",
    description: "Fieldnote listens to support chat, email, sales calls and the in-app widget, then folds duplicates together so one ask from forty customers reads as one.",
    bullets: ["Connects to 30 sources in a few clicks", "Merges duplicates while keeping every voice attached"],
    link: { label: "See all sources", href: "#" },
  },
  {
    eyebrow: "Route",
    title: "Sent straight to the team that owns it",
    description: "Rules look at product area, plan and account value, so a renewal blocker from a large account never waits behind a font request.",
    bullets: ["Routing by area, plan and revenue", "Handoff to your issue tracker with full context"],
    link: { label: "How routing works", href: "#" },
  },
  {
    eyebrow: "Report",
    title: "Know what to build next quarter",
    description: "Rank requests by the revenue behind them, watch themes rise month over month and tell customers automatically when their request ships.",
    bullets: ["Revenue-weighted ranking", "Automatic updates when a request ships"],
    link: { label: "Explore reports", href: "#" },
  },
];

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10" r="8" opacity=".35" />
      <path d="M6.5 10.2l2.3 2.3 4.7-4.8" />
    </svg>
  );
}

function Row({ feature, index }: { feature: AlternatingFeature; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const seen = useInView(ref);
  return (
    <div ref={ref} className="hb-ka2-row" data-flip={index % 2 === 1} data-in={seen}>
      <div className="hb-ka2-copy">
        <p className="hb-ka2-step">
          <span className="hb-ka2-num">{String(index + 1).padStart(2, "0")}</span>
          {feature.eyebrow}
        </p>
        <h3 className="hb-ka2-row-title">{feature.title}</h3>
        <p className="hb-ka2-desc">{feature.description}</p>
        {feature.bullets && feature.bullets.length > 0 && (
          <ul className="hb-ka2-bullets">
            {feature.bullets.map((b) => (
              <li key={b}>
                <Check />
                {b}
              </li>
            ))}
          </ul>
        )}
        {feature.link && (
          <a className="hb-ka2-link" href={feature.link.href}>
            {feature.link.label}
            <span aria-hidden="true">&rarr;</span>
          </a>
        )}
      </div>
      <div className="hb-ka2-stage">{feature.visual ?? builtIn[index % builtIn.length]}</div>
    </div>
  );
}

export function FeaturesAlternating({
  eyebrow = "How Fieldnote works",
  title = "From scattered feedback to a roadmap customers asked for",
  subtitle = "Three steps, no spreadsheets. Teams at 2,300 companies use Fieldnote to decide what to build next.",
  features = defaultFeatures,
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: FeaturesAlternatingProps) {
  const uid = React.useId();
  const vars = { "--hb-ka2-accent": accent, ...style } as React.CSSProperties;
  return (
    <section className={`hb-ka2 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-features-alternating" precedence="default">{css}</style>
      <div className="hb-ka2-wrap">
        <header className="hb-ka2-head">
          {eyebrow && <p className="hb-ka2-eyebrow">{eyebrow}</p>}
          <h2 id={`${uid}-t`} className="hb-ka2-title">{title}</h2>
          {subtitle && <p className="hb-ka2-sub">{subtitle}</p>}
        </header>
        <div className="hb-ka2-rows">
          {features.map((f, i) => (
            <Row key={`${f.title}-${i}`} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
