"use client";

import * as React from "react";

export interface TabFeature {
  title: string;
  description: string;
  visual?: React.ReactNode;
}

export interface FeaturesTabsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: TabFeature[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  interval?: number;
  autoPlay?: boolean;
  accent?: string;
}

const css = `
.hb-ka3 {
  --hb-ka3-accent: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ka3 *, .hb-ka3 *::before, .hb-ka3 *::after { box-sizing: border-box; }
.hb-ka3-wrap { max-width: 1120px; margin: 0 auto; padding: 88px 24px 104px; }
.hb-ka3-head { max-width: 640px; margin-bottom: 48px; }
.hb-ka3-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  padding: 4px 10px 4px 4px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 999px;
  background: #111;
  color: #a1a1a1;
  font-size: 12.5px;
}
.hb-ka3-eyebrow b {
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-ka3-accent) 18%, transparent);
  color: color-mix(in srgb, var(--hb-ka3-accent) 65%, #fff);
  font-size: 11px;
  font-weight: 600;
}
.hb-ka3-title {
  margin: 0;
  font-size: clamp(28px, 4cqw, 42px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -.03em;
  text-wrap: balance;
}
.hb-ka3-sub { margin: 14px 0 0; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-ka3-body {
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(0, 1.35fr);
  align-items: start;
  gap: 48px;
}
.hb-ka3-list { display: flex; flex-direction: column; gap: 4px; }
.hb-ka3-tab {
  position: relative;
  display: block;
  width: 100%;
  padding: 16px 18px 16px 26px;
  border: 1px solid transparent;
  border-radius: 14px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background .25s ease, border-color .25s ease;
}
.hb-ka3-tab:hover { background: rgba(255, 255, 255, .025); }
.hb-ka3-tab[aria-selected="true"] {
  border-color: rgba(255, 255, 255, .08);
  background: linear-gradient(180deg, #141416, #101011);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
}
.hb-ka3-tab:focus-visible { outline: 2px solid var(--hb-ka3-accent); outline-offset: 2px; }
.hb-ka3-track {
  position: absolute;
  left: 12px;
  top: 18px;
  bottom: 18px;
  width: 2px;
  overflow: hidden;
  border-radius: 2px;
  background: rgba(255, 255, 255, .08);
}
.hb-ka3-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--hb-ka3-accent);
  box-shadow: 0 0 10px var(--hb-ka3-accent);
  transform: scaleY(0);
  transform-origin: top;
}
.hb-ka3-tab[aria-selected="true"] .hb-ka3-fill { transform: scaleY(1); }
.hb-ka3[data-auto="true"] .hb-ka3-tab[aria-selected="true"] .hb-ka3-fill {
  animation: hb-ka3-progress var(--hb-ka3-ms, 5000ms) linear forwards;
}
.hb-ka3-body:hover .hb-ka3-fill { animation-play-state: paused !important; }
@keyframes hb-ka3-progress { from { transform: scaleY(0); } to { transform: scaleY(1); } }
.hb-ka3-tab-title {
  display: block;
  color: #8f8f8f;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -.01em;
  transition: color .25s ease;
}
.hb-ka3-tab[aria-selected="true"] .hb-ka3-tab-title, .hb-ka3-tab:hover .hb-ka3-tab-title { color: #ededed; }
.hb-ka3-more {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .4s cubic-bezier(.2, .8, .2, 1);
}
.hb-ka3-tab[aria-selected="true"] .hb-ka3-more { grid-template-rows: 1fr; }
.hb-ka3-more > span { overflow: hidden; }
.hb-ka3-desc { display: block; padding-top: 8px; color: #8f8f8f; font-size: 14px; line-height: 1.6; }
.hb-ka3-panel {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background:
    radial-gradient(90% 70% at 80% 0%, color-mix(in srgb, var(--hb-ka3-accent) 20%, transparent), transparent 60%),
    linear-gradient(180deg, #121214, #0b0b0c);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 40px 90px -40px rgba(0, 0, 0, .9);
}
.hb-ka3-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, .06);
}
.hb-ka3-chrome i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255, 255, 255, .12); }
.hb-ka3-chrome span {
  margin: 0 auto;
  padding: 3px 12px;
  border-radius: 6px;
  background: rgba(255, 255, 255, .04);
  color: #8f8f8f;
  font-size: 11.5px;
  transform: translateX(-18px);
}
.hb-ka3-panes { position: relative; aspect-ratio: 16 / 11; }
.hb-ka3-pane {
  position: absolute;
  inset: 0;
  padding: 22px;
  opacity: 0;
  transform: translateY(10px) scale(.985);
  filter: blur(6px);
  transition: opacity .5s ease, transform .6s cubic-bezier(.2, .8, .2, 1), filter .5s ease;
  pointer-events: none;
}
.hb-ka3-pane[data-on="true"] { opacity: 1; transform: none; filter: none; pointer-events: auto; }
.hb-ka3-m { display: flex; flex-direction: column; height: 100%; gap: 10px; font-size: 12px; color: #a1a1a1; }
.hb-ka3-mh { display: flex; align-items: center; justify-content: space-between; color: #8f8f8f; font-size: 12px; }
.hb-ka3-mh b { color: #ededed; font-weight: 600; font-size: 13px; }
.hb-ka3-chip {
  padding: 3px 9px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  font-size: 11px;
  color: #a1a1a1;
}
.hb-ka3-gantt {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 8px 0;
  border: 1px solid rgba(255, 255, 255, .06);
  border-radius: 12px;
  background-color: rgba(10, 10, 10, .6);
  background-image: linear-gradient(90deg, rgba(255, 255, 255, .05) 1px, transparent 1px);
  background-size: 10% 100%;
  background-position: 0 0;
}
.hb-ka3-grow { display: grid; grid-template-columns: 28% 1fr; align-items: center; padding: 0 12px; gap: 8px; }
.hb-ka3-grow > span { overflow: hidden; color: #c8c8c8; text-overflow: ellipsis; white-space: nowrap; }
.hb-ka3-lane { position: relative; height: 22px; }
.hb-ka3-gbar {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 6px;
  border-radius: 7px;
  color: #0a0a0a;
  font-size: 10.5px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .7s cubic-bezier(.2, .8, .2, 1);
}
.hb-ka3-pane[data-on="true"] .hb-ka3-gbar { transform: scaleX(1); }
.hb-ka3-gbar i {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(10, 10, 10, .25);
  flex: none;
}
.hb-ka3-code {
  flex: 1;
  overflow: hidden;
  padding: 14px 0;
  border: 1px solid rgba(255, 255, 255, .06);
  border-radius: 12px;
  background: rgba(8, 8, 9, .8);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
  line-height: 1.9;
}
.hb-ka3-ln { display: flex; gap: 16px; padding: 0 16px; white-space: pre; }
.hb-ka3-ln em { width: 16px; flex: none; color: #4a4a4a; font-style: normal; text-align: right; }
.hb-ka3-ln[data-hl="true"] { background: color-mix(in srgb, var(--hb-ka3-accent) 10%, transparent); box-shadow: inset 2px 0 0 var(--hb-ka3-accent); }
.hb-ka3-k { color: #c792ea; }
.hb-ka3-s { color: #9ece6a; }
.hb-ka3-f { color: #7fb3ff; }
.hb-ka3-c { color: #5c5c5c; }
.hb-ka3-caret {
  position: relative;
  display: inline-block;
  width: 2px;
  height: 15px;
  margin-left: 1px;
  vertical-align: -3px;
  background: var(--hb-ka3-accent);
  animation: hb-ka3-blink 1s steps(1) infinite;
}
.hb-ka3-caret b {
  position: absolute;
  left: 0;
  bottom: 100%;
  padding: 1px 5px;
  border-radius: 4px 4px 4px 0;
  background: var(--hb-ka3-accent);
  color: #fff;
  font-family: inherit;
  font-size: 9.5px;
  font-weight: 600;
  line-height: 1.4;
}
@keyframes hb-ka3-blink { 50% { opacity: .2; } }
.hb-ka3-diff {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .06);
  border-radius: 12px;
  background: rgba(8, 8, 9, .8);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11.5px;
  line-height: 1.9;
}
.hb-ka3-dl { padding: 0 14px; white-space: pre; overflow: hidden; text-overflow: ellipsis; }
.hb-ka3-dl[data-t="-"] { background: rgba(248, 81, 73, .1); color: #ffa198; }
.hb-ka3-dl[data-t="+"] { background: rgba(46, 160, 67, .12); color: #7ee2a0; }
.hb-ka3-cmt { display: flex; gap: 10px; align-items: flex-start; }
.hb-ka3-av {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: #0a0a0a;
  font-size: 10px;
  font-weight: 700;
}
.hb-ka3-bubble {
  flex: 1;
  min-width: 0;
  padding: 9px 12px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 4px 12px 12px 12px;
  background: #151517;
  color: #c8c8c8;
  line-height: 1.5;
}
.hb-ka3-bubble b { color: #ededed; font-weight: 600; margin-right: 6px; }
.hb-ka3-ok {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(46, 160, 67, .14);
  color: #7ee2a0;
  font-size: 11.5px;
  font-weight: 600;
}
.hb-ka3-steps { display: flex; flex-direction: column; gap: 8px; }
.hb-ka3-step {
  display: grid;
  grid-template-columns: 22px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 12px;
  background: rgba(20, 20, 22, .9);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity .4s ease, transform .5s cubic-bezier(.2, .8, .2, 1);
}
.hb-ka3-pane[data-on="true"] .hb-ka3-step { opacity: 1; transform: none; }
.hb-ka3-step b { color: #ededed; font-weight: 500; }
.hb-ka3-step span { color: #6f6f6f; font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 11px; }
.hb-ka3-tick {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(46, 160, 67, .16);
  color: #7ee2a0;
}
.hb-ka3-tick[data-live="true"] { background: color-mix(in srgb, var(--hb-ka3-accent) 20%, transparent); color: var(--hb-ka3-accent); }
.hb-ka3-tick svg { width: 12px; height: 12px; }
.hb-ka3-prog { height: 6px; overflow: hidden; border-radius: 6px; background: rgba(255, 255, 255, .06); }
.hb-ka3-prog i {
  display: block;
  width: 62%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-ka3-accent) 50%, transparent), var(--hb-ka3-accent));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.2s cubic-bezier(.2, .8, .2, 1) .5s;
}
.hb-ka3-pane[data-on="true"] .hb-ka3-prog i { transform: scaleX(1); }
.hb-ka3-regions { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-ka3-regions span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  font-size: 11px;
}
.hb-ka3-regions span::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-c, #7ee2a0); }
@container (max-width: 820px) {
  .hb-ka3-body { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .hb-ka3-head { margin-bottom: 36px; }
}
@container (max-width: 520px) {
  .hb-ka3-wrap { padding: 64px 16px 72px; }
  .hb-ka3-panes { aspect-ratio: 4 / 4; }
  .hb-ka3-pane { padding: 14px; }
  .hb-ka3-tab { padding: 14px 14px 14px 24px; }
  .hb-ka3-code { font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ka3-pane, .hb-ka3-more, .hb-ka3-gbar, .hb-ka3-step, .hb-ka3-prog i, .hb-ka3-tab, .hb-ka3-tab-title { transition: none; }
  .hb-ka3[data-auto="true"] .hb-ka3-tab[aria-selected="true"] .hb-ka3-fill, .hb-ka3-caret { animation: none; }
  .hb-ka3-pane { filter: none; transform: none; }
}
`;

function Tick() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 6.2l2.2 2.2 4.8-4.8" />
    </svg>
  );
}

const ganttRows = [
  { t: "Usage-based invoices", l: 0, w: 46, c: "#7fb3ff", who: "Mei" },
  { t: "Tax rules for EU", l: 20, w: 40, c: "#c4b5fd", who: "Arjun" },
  { t: "Dunning emails", l: 38, w: 34, c: "#86efac", who: "Sara" },
  { t: "Revenue report v2", l: 50, w: 44, c: "#fcd34d", who: "Leo" },
  { t: "Migration script", l: 70, w: 28, c: "#f9a8d4", who: "Kofi" },
];

function PlanMock() {
  return (
    <div className="hb-ka3-m">
      <div className="hb-ka3-mh">
        <b>Cycle 24 &middot; Billing</b>
        <span className="hb-ka3-chip">Nov 4 &ndash; Nov 15</span>
      </div>
      <div className="hb-ka3-gantt">
        {ganttRows.map((r, i) => (
          <div key={r.t} className="hb-ka3-grow">
            <span>{r.t}</span>
            <div className="hb-ka3-lane">
              <div
                className="hb-ka3-gbar"
                style={{ left: `${r.l}%`, width: `${r.w}%`, background: r.c, transitionDelay: `${(0.12 + i * 0.08).toFixed(2)}s` }}
              >
                <i aria-hidden="true" />
                {r.who}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WriteMock() {
  return (
    <div className="hb-ka3-m">
      <div className="hb-ka3-mh">
        <b>invoices.ts</b>
        <span className="hb-ka3-chip">3 editing</span>
      </div>
      <div className="hb-ka3-code">
        <div className="hb-ka3-ln"><em>1</em><span><span className="hb-ka3-k">export async function</span> <span className="hb-ka3-f">draftInvoice</span>(account) {"{"}</span></div>
        <div className="hb-ka3-ln"><em>2</em><span>  <span className="hb-ka3-k">const</span> usage = <span className="hb-ka3-k">await</span> <span className="hb-ka3-f">meter</span>(account.id)</span></div>
        <div className="hb-ka3-ln"><em>3</em><span>  <span className="hb-ka3-c">{"#"} billed per 1k requests</span></span></div>
        <div className="hb-ka3-ln" data-hl="true"><em>4</em><span>  <span className="hb-ka3-k">const</span> total = usage.requests * <span className="hb-ka3-s">0.42</span><span className="hb-ka3-caret"><b>Mei</b></span></span></div>
        <div className="hb-ka3-ln"><em>5</em><span>  <span className="hb-ka3-k">return</span> {"{"} currency: <span className="hb-ka3-s">&quot;usd&quot;</span>, total {"}"}</span></div>
        <div className="hb-ka3-ln"><em>6</em><span>{"}"}</span></div>
      </div>
    </div>
  );
}

function ReviewMock() {
  return (
    <div className="hb-ka3-m">
      <div className="hb-ka3-mh">
        <b>#482 Usage-based invoices</b>
        <span className="hb-ka3-ok">
          <Tick />
          Approved
        </span>
      </div>
      <div className="hb-ka3-diff">
        <div className="hb-ka3-dl" data-t="-">- const total = usage.requests * 0.5</div>
        <div className="hb-ka3-dl" data-t="+">+ const total = usage.requests * 0.42</div>
        <div className="hb-ka3-dl" data-t="+">+ if (account.annual) total *= 0.9</div>
      </div>
      <div className="hb-ka3-cmt">
        <span className="hb-ka3-av" style={{ background: "#c4b5fd" }} aria-hidden="true">AK</span>
        <div className="hb-ka3-bubble"><b>Arjun</b>Matches the new price sheet. Can we cover annual plans in a test?</div>
      </div>
      <div className="hb-ka3-cmt">
        <span className="hb-ka3-av" style={{ background: "#7fb3ff" }} aria-hidden="true">ML</span>
        <div className="hb-ka3-bubble"><b>Mei</b>Added two cases, both green. Merging after lunch.</div>
      </div>
    </div>
  );
}

function ShipMock() {
  const steps = [
    { t: "Build", s: "41s" },
    { t: "Tests", s: "1,284 passed" },
    { t: "Preview", s: "ready" },
  ];
  return (
    <div className="hb-ka3-m">
      <div className="hb-ka3-mh">
        <b>Deploy &middot; main@8f2c1a</b>
        <span className="hb-ka3-chip">2 min ago</span>
      </div>
      <div className="hb-ka3-steps">
        {steps.map((s, i) => (
          <div key={s.t} className="hb-ka3-step" style={{ transitionDelay: `${(0.1 + i * 0.12).toFixed(2)}s` }}>
            <span className="hb-ka3-tick"><Tick /></span>
            <b>{s.t}</b>
            <span>{s.s}</span>
          </div>
        ))}
        <div className="hb-ka3-step" style={{ transitionDelay: ".46s" }}>
          <span className="hb-ka3-tick" data-live="true"><Tick /></span>
          <b>Production</b>
          <span>62% of traffic</span>
        </div>
      </div>
      <div className="hb-ka3-prog"><i /></div>
      <div className="hb-ka3-regions">
        <span>Frankfurt</span>
        <span>Virginia</span>
        <span>Tokyo</span>
        <span style={{ "--hb-c": "#fcd34d" } as React.CSSProperties}>Sydney</span>
      </div>
    </div>
  );
}

const builtIn: React.ReactNode[] = [<PlanMock key="plan" />, <WriteMock key="write" />, <ReviewMock key="review" />, <ShipMock key="ship" />];

const defaultFeatures: TabFeature[] = [
  { title: "Plan the cycle", description: "Drag scope into a two-week cycle and see who is overbooked before anyone says yes." },
  { title: "Write it together", description: "Specs and code live side by side, with live cursors and comments pinned to the exact line." },
  { title: "Review in context", description: "Diffs, preview links and discussion in one thread, so approvals take minutes instead of days." },
  { title: "Ship without the drama", description: "Gradual rollouts across regions with automatic rollback the moment error rates climb." },
];

export function FeaturesTabs({
  eyebrow = "Workflow",
  title = "One workspace from first sketch to production",
  subtitle = "Linework keeps planning, writing, review and release in the same place, so context never gets lost between tools.",
  features = defaultFeatures,
  value,
  defaultValue = 0,
  onChange,
  interval = 5000,
  autoPlay = true,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: FeaturesTabsProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState(defaultValue);
  const count = features.length;
  const active = Math.min(Math.max(value ?? inner, 0), Math.max(count - 1, 0));
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number) {
    const next = ((i % count) + count) % count;
    if (value === undefined) setInner(next);
    onChange?.(next);
  }

  function handleKey(e: React.KeyboardEvent<HTMLDivElement>) {
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    if (next === -1) return;
    e.preventDefault();
    const target = ((next % count) + count) % count;
    select(target);
    tabs.current[target]?.focus();
  }

  const vars = { "--hb-ka3-accent": accent, "--hb-ka3-ms": `${Math.max(interval, 500)}ms`, ...style } as React.CSSProperties;

  return (
    <section className={`hb-ka3 ${className}`} style={vars} data-auto={autoPlay && count > 1} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-features-tabs" precedence="default">{css}</style>
      <div className="hb-ka3-wrap">
        <header className="hb-ka3-head">
          {eyebrow && (
            <p className="hb-ka3-eyebrow">
              <b>{count} steps</b>
              {eyebrow}
            </p>
          )}
          <h2 id={`${uid}-t`} className="hb-ka3-title">{title}</h2>
          {subtitle && <p className="hb-ka3-sub">{subtitle}</p>}
        </header>
        <div className="hb-ka3-body">
          <div className="hb-ka3-list" role="tablist" aria-orientation="vertical" aria-label={title} onKeyDown={handleKey}>
            {features.map((f, i) => (
              <button
                key={`${f.title}-${i}`}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${uid}-pane-${i}`}
                tabIndex={i === active ? 0 : -1}
                className="hb-ka3-tab"
                onClick={() => select(i)}
              >
                <span className="hb-ka3-track" aria-hidden="true">
                  <span
                    key={i === active ? `on-${active}` : "off"}
                    className="hb-ka3-fill"
                    onAnimationEnd={(e) => {
                      if (e.animationName === "hb-ka3-progress" && i === active) select(active + 1);
                    }}
                  />
                </span>
                <span className="hb-ka3-tab-title">{f.title}</span>
                <span className="hb-ka3-more">
                  <span>
                    <span className="hb-ka3-desc">{f.description}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="hb-ka3-panel">
            <div className="hb-ka3-chrome" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>app.linework.dev</span>
            </div>
            <div className="hb-ka3-panes">
              {features.map((f, i) => (
                <div
                  key={`${f.title}-${i}`}
                  role="tabpanel"
                  id={`${uid}-pane-${i}`}
                  aria-labelledby={`${uid}-tab-${i}`}
                  aria-hidden={i !== active}
                  inert={i !== active}
                  className="hb-ka3-pane"
                  data-on={i === active}
                >
                  {f.visual ?? builtIn[i % builtIn.length]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
