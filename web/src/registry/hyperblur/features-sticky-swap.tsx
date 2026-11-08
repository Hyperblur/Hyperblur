"use client";

import * as React from "react";

export interface FeaturesStickySwapItem {
  kicker: string;
  title: string;
  body: string;
  points?: string[];
}

export interface FeaturesStickySwapProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FeaturesStickySwapItem[];
  accent?: string;
  autoPlay?: boolean;
  interval?: number;
  onActiveChange?: (index: number) => void;
}

const css = `
@keyframes hb-wa1-rise { from { opacity: 0; transform: translate3d(0, 14px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-wa1-drop { 0% { opacity: 0; transform: translate3d(0, -18px, 0) scale(.96); } 100% { opacity: 1; transform: none; } }
@keyframes hb-wa1-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-wa1-bar { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-wa1-tick { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-wa1-pulse { 0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-wa1-accent) 55%, transparent); } 60% { box-shadow: 0 0 0 10px transparent; } }
@keyframes hb-wa1-blink { 50% { opacity: .25; } }
.hb-wa1 {
  --hb-wa1-accent: #8b5cf6;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa1 *, .hb-wa1 *::before, .hb-wa1 *::after { box-sizing: border-box; }
.hb-wa1 em, .hb-wa1 i { font-style: normal; }
.hb-wa1-in { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa1-head { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); align-items: end; gap: 16px 48px; margin-bottom: clamp(28px, 5cqi, 56px); }
.hb-wa1-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 14px; color: #a1a1a1; font-size: 13px; font-weight: 500; }
.hb-wa1-eyebrow::before { content: ""; width: 18px; height: 2px; border-radius: 2px; background: var(--hb-wa1-accent); }
.hb-wa1-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(30px, 4.6cqi, 52px); font-weight: 600; line-height: 1.02; letter-spacing: -.035em; text-wrap: balance; }
.hb-wa1-sub { margin: 0; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; text-wrap: pretty; }
.hb-wa1-body { display: grid; grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr); gap: clamp(24px, 5cqi, 64px); align-items: start; }
.hb-wa1-list { position: relative; margin: 0; padding: 0 0 0 28px; list-style: none; }
.hb-wa1-list::before { content: ""; position: absolute; top: 6px; bottom: 6px; left: 7px; width: 2px; border-radius: 2px; background: #1c1c1c; }
.hb-wa1-fill { position: absolute; top: 6px; left: 7px; width: 2px; height: calc((100% - 12px) * var(--hb-wa1-p, 0)); border-radius: 2px; background: linear-gradient(var(--hb-wa1-accent), color-mix(in srgb, var(--hb-wa1-accent) 40%, #fff)); transition: height .6s cubic-bezier(.22, 1, .36, 1); }
.hb-wa1-item { position: relative; min-height: clamp(260px, 34cqi, 380px); padding: 2px 0 40px; opacity: .38; transition: opacity .5s ease; }
.hb-wa1-item[data-active="true"] { opacity: 1; }
.hb-wa1-item:last-child { min-height: 0; padding-bottom: 8px; }
.hb-wa1-dot { position: absolute; top: 4px; left: -28px; width: 16px; height: 16px; border: 2px solid #2a2a2a; border-radius: 50%; background: #0a0a0a; transition: border-color .4s ease, background .4s ease; }
.hb-wa1-item[data-active="true"] .hb-wa1-dot { border-color: var(--hb-wa1-accent); background: color-mix(in srgb, var(--hb-wa1-accent) 30%, #0a0a0a); animation: hb-wa1-pulse 1.8s ease-out infinite; }
.hb-wa1-btn { display: block; width: 100%; margin: 0; padding: 0; border: 0; background: none; color: inherit; font: inherit; text-align: left; cursor: pointer; border-radius: 10px; }
.hb-wa1-btn:focus-visible { outline: 2px solid var(--hb-wa1-accent); outline-offset: 6px; }
.hb-wa1-kicker { display: block; margin-bottom: 10px; color: var(--hb-wa1-accent); font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: .04em; }
.hb-wa1-item h3 { margin: 0; font-size: clamp(20px, 2.4cqi, 26px); font-weight: 600; letter-spacing: -.02em; line-height: 1.2; }
.hb-wa1-item p { margin: 10px 0 0; max-width: 420px; color: #9a9a9a; font-size: 15px; line-height: 1.65; }
.hb-wa1-points { display: grid; gap: 8px; margin: 18px 0 0; padding: 0; list-style: none; }
.hb-wa1-points li { display: flex; align-items: center; gap: 10px; color: #cfcfcf; font-size: 13.5px; }
.hb-wa1-points svg { flex: none; color: var(--hb-wa1-accent); }
.hb-wa1-stage { position: sticky; top: clamp(16px, 9vh, 88px); }
.hb-wa1-win { position: relative; aspect-ratio: 5 / 4; overflow: hidden; border: 1px solid rgba(255, 255, 255, .08); border-radius: 20px; background: radial-gradient(120% 90% at 100% 0%, color-mix(in srgb, var(--hb-wa1-accent) 16%, transparent), transparent 60%), linear-gradient(180deg, #131313, #0d0d0d); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 40px 80px -40px rgba(0, 0, 0, .8); }
.hb-wa1-chrome { display: flex; align-items: center; gap: 10px; height: 42px; padding: 0 16px; border-bottom: 1px solid rgba(255, 255, 255, .06); color: #8f8f8f; font-size: 12px; }
.hb-wa1-chrome b { color: #ededed; font-weight: 600; }
.hb-wa1-chrome span:last-child { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; }
.hb-wa1-chrome span:last-child::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: hb-wa1-blink 2s ease infinite; }
.hb-wa1-steps { display: flex; gap: 4px; }
.hb-wa1-steps i { width: 18px; height: 4px; border-radius: 4px; background: #262626; transition: background .4s ease, width .4s cubic-bezier(.22, 1, .36, 1); }
.hb-wa1-steps i[data-on="true"] { width: 30px; background: var(--hb-wa1-accent); }
.hb-wa1-scene { position: absolute; inset: 42px 0 0; padding: clamp(14px, 2.4cqi, 24px); opacity: 0; transform: translate3d(0, 24px, 0) scale(.97); filter: blur(6px); transition: opacity .55s ease, transform .7s cubic-bezier(.22, 1, .36, 1), filter .55s ease; pointer-events: none; }
.hb-wa1-scene[data-active="true"] { opacity: 1; transform: none; filter: none; }
.hb-wa1-scene[data-active="false"][data-before="true"] { transform: translate3d(0, -24px, 0) scale(.97); }
.hb-wa1-card { padding: 12px 14px; border: 1px solid rgba(255, 255, 255, .07); border-radius: 12px; background: #161616; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04); }
.hb-wa1-inbox { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; height: 100%; }
.hb-wa1-col { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.hb-wa1-col > small { color: #6f6f6f; font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-wa1-req { display: grid; gap: 6px; }
.hb-wa1-req b { overflow: hidden; color: #e5e5e5; font-size: 12.5px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.hb-wa1-req span { display: flex; align-items: center; gap: 6px; color: #7a7a7a; font-size: 11px; }
.hb-wa1-av { display: inline-grid; place-items: center; width: 16px; height: 16px; border-radius: 50%; color: #0a0a0a; font-size: 8px; font-weight: 700; }
.hb-wa1-tag { margin-left: auto; padding: 1px 6px; border-radius: 6px; background: color-mix(in srgb, var(--hb-wa1-accent) 18%, transparent); color: color-mix(in srgb, var(--hb-wa1-accent) 70%, #fff); font-size: 10px; }
.hb-wa1-scene[data-active="true"] .hb-wa1-req[data-new="true"] { animation: hb-wa1-drop .6s cubic-bezier(.22, 1, .36, 1) both; animation-delay: calc(var(--hb-wa1-j) * 160ms + 200ms); }
.hb-wa1-plan { display: grid; gap: 10px; }
.hb-wa1-months { display: grid; grid-template-columns: 90px repeat(3, minmax(0, 1fr)); color: #6f6f6f; font-size: 11px; }
.hb-wa1-row { display: grid; grid-template-columns: 90px minmax(0, 1fr); align-items: center; gap: 0; height: 30px; }
.hb-wa1-row > span { overflow: hidden; color: #bdbdbd; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-wa1-track { position: relative; height: 100%; border-left: 1px dashed #262626; background: repeating-linear-gradient(90deg, transparent 0 calc(33.33% - 1px), #1d1d1d calc(33.33% - 1px) 33.33%); }
.hb-wa1-gantt { position: absolute; top: 6px; bottom: 6px; left: var(--l); width: var(--w); border-radius: 6px; background: linear-gradient(90deg, color-mix(in srgb, var(--c) 85%, #000), var(--c)); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25); transform-origin: left; display: flex; align-items: center; padding: 0 8px; color: rgba(0, 0, 0, .75); font-size: 10.5px; font-weight: 600; white-space: nowrap; overflow: hidden; }
.hb-wa1-scene[data-active="true"] .hb-wa1-gantt { animation: hb-wa1-grow .8s cubic-bezier(.22, 1, .36, 1) both; animation-delay: calc(var(--hb-wa1-j) * 110ms + 150ms); }
.hb-wa1-today { position: absolute; top: 18px; bottom: 0; left: calc(90px + (100% - 90px) * .46); width: 1px; background: var(--hb-wa1-accent); }
.hb-wa1-today::before { content: "Today"; position: absolute; top: -16px; left: 50%; transform: translateX(-50%); padding: 1px 6px; border-radius: 6px; background: var(--hb-wa1-accent); color: #fff; font-size: 9.5px; font-weight: 600; }
.hb-wa1-measure { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); gap: 12px; height: 100%; }
.hb-wa1-big { display: flex; flex-direction: column; justify-content: space-between; }
.hb-wa1-big small { color: #7a7a7a; font-size: 11.5px; }
.hb-wa1-big strong { display: block; margin: 6px 0 2px; font-family: var(--font-grotesk, inherit); font-size: clamp(30px, 4.4cqi, 46px); font-weight: 600; letter-spacing: -.04em; }
.hb-wa1-big em { color: #4ade80; font-size: 12px; }
.hb-wa1-bars { display: flex; align-items: flex-end; gap: 6px; height: 100%; padding-top: 18px; }
.hb-wa1-bars i { flex: 1; height: var(--h); border-radius: 5px 5px 2px 2px; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-wa1-accent) 90%, #fff), color-mix(in srgb, var(--hb-wa1-accent) 25%, #111)); transform-origin: bottom; opacity: .55; }
.hb-wa1-bars i:last-child { opacity: 1; }
.hb-wa1-scene[data-active="true"] .hb-wa1-bars i { animation: hb-wa1-bar .7s cubic-bezier(.22, 1, .36, 1) both; animation-delay: calc(var(--hb-wa1-j) * 60ms + 150ms); }
.hb-wa1-ship { display: grid; gap: 8px; }
.hb-wa1-check { display: flex; align-items: center; gap: 10px; color: #d4d4d4; font-size: 12.5px; }
.hb-wa1-check > span:first-child { display: grid; place-items: center; width: 18px; height: 18px; border: 1.5px solid #333; border-radius: 6px; }
.hb-wa1-check path { stroke-dasharray: 1; stroke-dashoffset: 1; }
.hb-wa1-scene[data-active="true"] .hb-wa1-check > span:first-child { border-color: var(--hb-wa1-accent); background: color-mix(in srgb, var(--hb-wa1-accent) 20%, transparent); transition: all .3s ease calc(var(--hb-wa1-j) * 260ms + 200ms); }
.hb-wa1-scene[data-active="true"] .hb-wa1-check path { animation: hb-wa1-tick .4s ease both; animation-delay: calc(var(--hb-wa1-j) * 260ms + 300ms); }
.hb-wa1-check small { margin-left: auto; color: #6f6f6f; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; }
.hb-wa1-launch { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 6px; padding: 12px 14px; border-radius: 12px; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-wa1-accent) 22%, #121212), #121212); border: 1px solid color-mix(in srgb, var(--hb-wa1-accent) 35%, transparent); font-size: 12.5px; }
.hb-wa1-launch b { padding: 6px 12px; border-radius: 999px; background: var(--hb-wa1-accent); color: #fff; font-size: 12px; animation: hb-wa1-pulse 2s ease-out infinite; }
@container (max-width: 760px) {
  .hb-wa1-head { grid-template-columns: minmax(0, 1fr); }
  .hb-wa1-body { grid-template-columns: minmax(0, 1fr); }
  .hb-wa1-stage { order: -1; top: 8px; z-index: 2; }
  .hb-wa1-win { aspect-ratio: 16 / 11; }
  .hb-wa1-item { min-height: 220px; }
}
@container (max-width: 420px) {
  .hb-wa1-months, .hb-wa1-row { grid-template-columns: 64px minmax(0, 1fr); }
  .hb-wa1-months > span:nth-child(n + 2) { display: none; }
  .hb-wa1-today { left: calc(64px + (100% - 64px) * .46); }
  .hb-wa1-measure { grid-template-columns: minmax(0, 1fr); }
  .hb-wa1-bars { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa1 *, .hb-wa1 *::before, .hb-wa1 *::after { animation: none !important; transition: none !important; }
  .hb-wa1-check path { stroke-dashoffset: 0; }
}
`;

const defaultItems: FeaturesStickySwapItem[] = [
  { kicker: "01 · Capture", title: "Every request lands in one inbox", body: "Feedback from support tickets, sales calls and the in-app widget flows into a single triage queue, already tagged by account and revenue.", points: ["Deduplicates similar asks automatically", "Links each request to the customer who made it"] },
  { kicker: "02 · Plan", title: "Turn the noise into a quarter", body: "Drag the requests that matter onto a timeline. Capacity, dependencies and owners update as you plan, so nobody commits to a fantasy.", points: ["Capacity per squad, in real story points", "Dependencies drawn as you drop work"] },
  { kicker: "03 · Measure", title: "See what actually moved", body: "Every shipped item reports adoption and retention against the customers who asked for it. Your roadmap finally has a scoreboard.", points: ["Adoption by segment, week over week"] },
  { kicker: "04 · Close the loop", title: "Tell people you shipped it", body: "When a release goes out, everyone who requested it gets a personal note with a link to try it. No spreadsheet of emails required.", points: ["Release notes drafted from the linked tickets", "Sent from your own domain"] },
];

const avColors = ["#f9a8d4", "#93c5fd", "#fcd34d", "#86efac", "#c4b5fd"];

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity=".35" />
      <path d="M5 8.2 7 10l4-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SceneInbox() {
  const triage = [
    { t: "Bulk edit for invoices", who: "MR", a: "Mercer & Co", tag: "$84k" },
    { t: "SSO with custom domain", who: "JT", a: "Fieldhouse", tag: "$41k" },
    { t: "Export board as PDF", who: "AL", a: "Oakline", tag: "$12k" },
  ];
  const later = [
    { t: "Dark mode for embeds", who: "PK", a: "Lattice Labs", tag: "x14" },
    { t: "Slack digest at 9am", who: "SO", a: "Grove Health", tag: "x9" },
  ];
  return (
    <div className="hb-wa1-inbox">
      <div className="hb-wa1-col">
        <small>Triage · 3 new</small>
        {triage.map((r, j) => (
          <div key={r.t} className="hb-wa1-card hb-wa1-req" data-new="true" style={{ "--hb-wa1-j": j } as React.CSSProperties}>
            <b>{r.t}</b>
            <span>
              <i className="hb-wa1-av" style={{ background: avColors[j] }}>{r.who}</i>
              {r.a}
              <em className="hb-wa1-tag">{r.tag}</em>
            </span>
          </div>
        ))}
      </div>
      <div className="hb-wa1-col">
        <small>Merged · 2 clusters</small>
        {later.map((r, j) => (
          <div key={r.t} className="hb-wa1-card hb-wa1-req">
            <b>{r.t}</b>
            <span>
              <i className="hb-wa1-av" style={{ background: avColors[j + 3] }}>{r.who}</i>
              {r.a}
              <em className="hb-wa1-tag">{r.tag}</em>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScenePlan() {
  const rows = [
    { n: "Bulk edit", l: "4%", w: "38%", c: "#c4b5fd" },
    { n: "SSO domains", l: "22%", w: "30%", c: "#93c5fd" },
    { n: "PDF export", l: "44%", w: "26%", c: "#fcd34d" },
    { n: "Audit log", l: "58%", w: "36%", c: "#86efac" },
    { n: "Billing v2", l: "10%", w: "52%", c: "#f9a8d4" },
  ];
  return (
    <div className="hb-wa1-plan" style={{ position: "relative" }}>
      <div className="hb-wa1-months">
        <span>Q3 2026</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
      </div>
      {rows.map((r, j) => (
        <div key={r.n} className="hb-wa1-row">
          <span>{r.n}</span>
          <div className="hb-wa1-track">
            <div className="hb-wa1-gantt" style={{ "--l": r.l, "--w": r.w, "--c": r.c, "--hb-wa1-j": j } as React.CSSProperties}>
              {j === 0 ? "8 pts" : j === 4 ? "21 pts" : ""}
            </div>
          </div>
        </div>
      ))}
      <i className="hb-wa1-today" aria-hidden="true" />
    </div>
  );
}

function SceneMeasure() {
  const bars = [32, 41, 38, 52, 49, 63, 71, 86];
  return (
    <div className="hb-wa1-measure">
      <div className="hb-wa1-card hb-wa1-big">
        <div>
          <small>Bulk edit · weekly active accounts</small>
          <strong>1,284</strong>
          <em>+38% since release</em>
        </div>
        <small>27 of 31 requesting accounts adopted</small>
      </div>
      <div className="hb-wa1-card">
        <div className="hb-wa1-bars">
          {bars.map((h, j) => (
            <i key={j} style={{ "--h": `${h}%`, "--hb-wa1-j": j } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SceneShip() {
  const checks = [
    { t: "Release notes drafted from 31 tickets", m: "auto" },
    { t: "Personal note to each requester", m: "31" },
    { t: "Changelog entry published", m: "v4.12" },
    { t: "Help center article linked", m: "done" },
  ];
  return (
    <div className="hb-wa1-ship">
      {checks.map((c, j) => (
        <div key={c.t} className="hb-wa1-card hb-wa1-check" style={{ "--hb-wa1-j": j } as React.CSSProperties}>
          <span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
            </svg>
          </span>
          {c.t}
          <small>{c.m}</small>
        </div>
      ))}
      <div className="hb-wa1-launch">
        <span>Bulk edit is live for 27 accounts</span>
        <b>Notify</b>
      </div>
    </div>
  );
}

const scenes = [SceneInbox, ScenePlan, SceneMeasure, SceneShip];
const sceneNames = ["Inbox", "Roadmap", "Insights", "Releases"];

export function FeaturesStickySwap({
  eyebrow = "How teams use Lumen",
  title = "One roadmap, from the first request to the release note",
  subtitle = "Scroll through the loop most product teams run every week. The workspace on the right follows along.",
  items = defaultItems,
  accent = "#8b5cf6",
  autoPlay = false,
  interval = 4200,
  onActiveChange,
  className,
  style,
  ...rest
}: FeaturesStickySwapProps) {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLLIElement | null)[]>([]);
  const cb = React.useRef(onActiveChange);

  React.useEffect(() => {
    cb.current = onActiveChange;
  }, [onActiveChange]);

  const current = React.useRef(0);

  const select = React.useCallback((i: number) => {
    if (current.current === i) return;
    current.current = i;
    setActive(i);
    cb.current?.(i);
  }, []);

  React.useEffect(() => {
    if (autoPlay || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index);
            select(i);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [autoPlay, items.length, select]);

  React.useEffect(() => {
    if (!autoPlay || items.length < 2) return;
    const id = window.setInterval(() => select((current.current + 1) % items.length), interval);
    return () => window.clearInterval(id);
  }, [autoPlay, interval, items.length, select]);

  const progress = items.length > 1 ? active / (items.length - 1) : 1;
  const sceneIndex = active % scenes.length;

  return (
    <section className={["hb-wa1", className].filter(Boolean).join(" ")} style={{ "--hb-wa1-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-features-sticky-swap" precedence="default">{css}</style>
      <div className="hb-wa1-in">
        <div className="hb-wa1-head">
          <div>
            <p className="hb-wa1-eyebrow">{eyebrow}</p>
            <h2 className="hb-wa1-title">{title}</h2>
          </div>
          <p className="hb-wa1-sub">{subtitle}</p>
        </div>
        <div className="hb-wa1-body">
          <ol className="hb-wa1-list" style={{ "--hb-wa1-p": progress } as React.CSSProperties}>
            <i className="hb-wa1-fill" aria-hidden="true" />
            {items.map((it, i) => (
              <li
                key={it.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                data-active={i === active}
                className="hb-wa1-item"
              >
                <i className="hb-wa1-dot" aria-hidden="true" />
                <button type="button" className="hb-wa1-btn" aria-current={i === active ? "step" : undefined} onClick={() => select(i)}>
                  <span className="hb-wa1-kicker">{it.kicker}</span>
                  <h3>{it.title}</h3>
                </button>
                <p>{it.body}</p>
                {it.points && it.points.length > 0 && (
                  <ul className="hb-wa1-points">
                    {it.points.map((p) => (
                      <li key={p}>
                        <Tick />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
          <div className="hb-wa1-stage">
            <div className="hb-wa1-win" aria-live="polite">
              <div className="hb-wa1-chrome">
                <b>Lumen</b>
                <span>/ {sceneNames[sceneIndex]}</span>
                <span className="hb-wa1-steps" aria-hidden="true">
                  {items.map((it, i) => (
                    <i key={it.title} data-on={i === active} />
                  ))}
                </span>
                <span>synced</span>
              </div>
              {scenes.map((Scene, i) => (
                <div key={sceneNames[i]} className="hb-wa1-scene" data-active={i === sceneIndex} data-before={i < sceneIndex} aria-hidden={i !== sceneIndex}>
                  <Scene />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
