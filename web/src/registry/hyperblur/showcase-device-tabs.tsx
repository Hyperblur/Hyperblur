"use client";

import * as React from "react";

export type ShowcaseDeviceTabsScreen = "inbox" | "analytics" | "calendar" | "automations";

export interface ShowcaseDeviceTabsFeature {
  title: string;
  description: string;
  screen: ShowcaseDeviceTabsScreen;
  image?: string;
}

export interface ShowcaseDeviceTabsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: ShowcaseDeviceTabsFeature[];
  value?: number;
  defaultValue?: number;
  onValueChange?: (index: number) => void;
  autoplay?: boolean;
  interval?: number;
  accent?: string;
}

const css = `
.hb-yh9 {
  --hb-yh9-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  overflow: hidden;
  padding: clamp(64px, 8cqi, 104px) 20px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yh9 *, .hb-yh9 *::before, .hb-yh9 *::after { box-sizing: border-box; }
.hb-yh9::before {
  content: "";
  position: absolute;
  right: -10%;
  top: 10%;
  width: 70%;
  height: 90%;
  background: radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--hb-yh9-accent) 22%, transparent), transparent 70%);
  pointer-events: none;
}
.hb-yh9-in { position: relative; display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: 48px; align-items: center; max-width: 1120px; margin: 0 auto; }
.hb-yh9-eyebrow { color: color-mix(in srgb, var(--hb-yh9-accent) 60%, #fff); font-size: 13px; font-weight: 600; }
.hb-yh9-title { margin: 12px 0 0; font-size: clamp(28px, 3.8cqi, 42px); font-weight: 650; letter-spacing: -.035em; line-height: 1.08; }
.hb-yh9-sub { margin: 14px 0 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-yh9-list { display: grid; gap: 4px; margin-top: 28px; }
.hb-yh9-tab {
  position: relative;
  display: block;
  width: 100%;
  margin: 0;
  padding: 14px 16px 16px 20px;
  border: 1px solid transparent;
  border-radius: 14px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transition: background-color .25s ease, border-color .25s ease;
}
.hb-yh9-tab:hover { background: rgba(255,255,255,.03); }
.hb-yh9-tab[aria-selected="true"] { border-color: rgba(255,255,255,.08); background: linear-gradient(180deg, #141414, #101010); box-shadow: inset 0 1px 0 rgba(255,255,255,.05); }
.hb-yh9-tab:focus-visible { outline: 2px solid var(--hb-yh9-accent); outline-offset: 2px; }
.hb-yh9-tt { display: flex; align-items: center; gap: 10px; color: #8f8f8f; font-size: 15px; font-weight: 600; transition: color .2s ease; }
.hb-yh9-tab[aria-selected="true"] .hb-yh9-tt { color: #ededed; }
.hb-yh9-num { color: #525252; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-yh9-tab[aria-selected="true"] .hb-yh9-num { color: var(--hb-yh9-accent); }
.hb-yh9-td { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s cubic-bezier(.2,.8,.2,1); }
.hb-yh9-tab[aria-selected="true"] .hb-yh9-td { grid-template-rows: 1fr; }
.hb-yh9-tdi { display: block; min-height: 0; margin: 0; overflow: hidden; color: #8f8f8f; font-size: 13.5px; line-height: 1.55; }
.hb-yh9-tdi > span { display: block; padding: 8px 0 0 30px; }
.hb-yh9-prog { position: absolute; left: 0; top: 14px; bottom: 14px; width: 2px; border-radius: 2px; background: rgba(255,255,255,.06); overflow: hidden; }
.hb-yh9-prog i { position: absolute; inset: 0; border-radius: inherit; background: var(--hb-yh9-accent); transform-origin: top; transform: scaleY(0); }
.hb-yh9-tab[aria-selected="true"] .hb-yh9-prog i { transform: scaleY(1); }
.hb-yh9[data-auto="true"] .hb-yh9-tab[aria-selected="true"] .hb-yh9-prog i { animation: hb-yh9-fill var(--hb-yh9-dur) linear both; }
.hb-yh9[data-paused="true"] .hb-yh9-prog i { animation-play-state: paused !important; }
.hb-yh9-dev { position: relative; min-width: 0; perspective: 1600px; }
.hb-yh9-lid { position: relative; padding: 12px 12px 14px; border-radius: 18px 18px 6px 6px; background: linear-gradient(180deg, #2a2a2d, #19191b); box-shadow: inset 0 0 0 1px rgba(255,255,255,.1), 0 50px 100px -40px rgba(0,0,0,.9); transform: rotateX(4deg); transform-origin: bottom; }
.hb-yh9-cam { position: absolute; top: 4px; left: 50%; width: 5px; height: 5px; border-radius: 50%; background: #0a0a0a; transform: translateX(-50%); }
.hb-yh9-screen { position: relative; aspect-ratio: 16 / 10; border-radius: 8px; background: #0c0c0e; overflow: hidden; }
.hb-yh9-base { position: relative; height: 16px; margin: 0 -6%; border-radius: 2px 2px 14px 14px; background: linear-gradient(180deg, #3a3a3e, #1c1c1f 70%); box-shadow: 0 30px 40px -20px rgba(0,0,0,.9); }
.hb-yh9-base::before { content: ""; position: absolute; top: 0; left: 50%; width: 18%; height: 6px; border-radius: 0 0 8px 8px; background: #141416; transform: translateX(-50%); }
.hb-yh9-pane { position: absolute; inset: 0; display: grid; grid-template-columns: 22% minmax(0, 1fr); opacity: 0; transform: translateY(14px) scale(.985); transition: opacity .5s ease, transform .6s cubic-bezier(.2,.8,.2,1); pointer-events: none; }
.hb-yh9-pane[data-on="true"] { opacity: 1; transform: none; pointer-events: auto; }
.hb-yh9-img { position: absolute; inset: 0; background-position: center top; background-size: cover; }
.hb-yh9-nav { display: flex; flex-direction: column; gap: 4px; padding: 14px 10px; border-right: 1px solid rgba(255,255,255,.06); background: #0f0f11; }
.hb-yh9-brand { display: flex; align-items: center; gap: 7px; margin-bottom: 10px; font-size: 11px; font-weight: 700; }
.hb-yh9-brand i { width: 14px; height: 14px; border-radius: 4px; background: var(--hb-yh9-accent); }
.hb-yh9-ni { height: 22px; padding: 0 8px; border-radius: 6px; color: #8f8f8f; font-size: 10px; line-height: 22px; white-space: nowrap; overflow: hidden; }
.hb-yh9-ni[data-on="true"] { background: rgba(255,255,255,.06); color: #ededed; }
.hb-yh9-main { min-width: 0; padding: 14px 16px; }
.hb-yh9-mh { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; font-size: 13px; font-weight: 650; }
.hb-yh9-mh span { height: 20px; padding: 0 8px; border-radius: 6px; background: var(--hb-yh9-accent); color: #fff; font-size: 9.5px; font-weight: 600; line-height: 20px; }
.hb-yh9-row { display: flex; align-items: center; gap: 9px; padding: 8px 9px; border-radius: 9px; opacity: 0; transform: translateX(10px); }
.hb-yh9-pane[data-on="true"] .hb-yh9-row, .hb-yh9-pane[data-on="true"] .hb-yh9-st, .hb-yh9-pane[data-on="true"] .hb-yh9-ev, .hb-yh9-pane[data-on="true"] .hb-yh9-node { animation: hb-yh9-in .5s cubic-bezier(.2,.8,.2,1) forwards; animation-delay: calc(150ms + var(--hb-yh9-k) * 70ms); }
.hb-yh9-row[data-on="true"] { background: color-mix(in srgb, var(--hb-yh9-accent) 12%, transparent); }
.hb-yh9-av { display: grid; place-items: center; flex: none; width: 24px; height: 24px; border-radius: 50%; color: #fff; font-size: 9px; font-weight: 700; }
.hb-yh9-rt { flex: 1; min-width: 0; }
.hb-yh9-rn { display: block; font-size: 10.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yh9-rd { display: block; margin-top: 1px; color: #8f8f8f; font-size: 9.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yh9-rx { color: #6f6f6f; font-size: 9px; }
.hb-yh9-ch { padding: 1px 6px; border-radius: 99px; font-size: 8.5px; font-weight: 600; }
.hb-yh9-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.hb-yh9-st { padding: 9px 10px; border: 1px solid rgba(255,255,255,.06); border-radius: 10px; background: #131316; opacity: 0; transform: translateY(8px); }
.hb-yh9-st span { color: #8f8f8f; font-size: 9px; }
.hb-yh9-st b { display: block; margin-top: 2px; font-size: 15px; letter-spacing: -.02em; }
.hb-yh9-st em { color: #34d399; font-size: 9px; font-style: normal; }
.hb-yh9-chart { position: relative; height: 54%; margin-top: 10px; padding: 10px; border: 1px solid rgba(255,255,255,.06); border-radius: 10px; background: #111114; }
.hb-yh9-chart svg { width: 100%; height: 100%; }
.hb-yh9-area { fill: color-mix(in srgb, var(--hb-yh9-accent) 20%, transparent); }
.hb-yh9-ln { fill: none; stroke: var(--hb-yh9-accent); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-dasharray: 400; stroke-dashoffset: 400; }
.hb-yh9-pane[data-on="true"] .hb-yh9-ln { animation: hb-yh9-draw 1.4s ease .3s forwards; }
.hb-yh9-cal { position: relative; display: grid; grid-template-columns: 30px repeat(5, minmax(0, 1fr)); grid-auto-rows: 26px; gap: 0; height: calc(100% - 34px); border-top: 1px solid rgba(255,255,255,.06); }
.hb-yh9-hr { color: #5f5f5f; font-size: 8.5px; padding-top: 2px; border-bottom: 1px solid rgba(255,255,255,.04); }
.hb-yh9-cell { border-left: 1px solid rgba(255,255,255,.04); border-bottom: 1px solid rgba(255,255,255,.04); }
.hb-yh9-ev { position: absolute; padding: 4px 6px; border-radius: 6px; font-size: 9px; font-weight: 600; line-height: 1.25; overflow: hidden; opacity: 0; transform: translateY(6px); }
.hb-yh9-flow { position: relative; height: calc(100% - 34px); }
.hb-yh9-flow svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-yh9-wire { fill: none; stroke: rgba(255,255,255,.14); stroke-width: 1.5; stroke-dasharray: 4 4; vector-effect: non-scaling-stroke; animation: hb-yh9-dash 1.2s linear infinite; }
.hb-yh9-node { position: absolute; width: 34%; padding: 8px 10px; border: 1px solid rgba(255,255,255,.08); border-radius: 10px; background: #141417; opacity: 0; transform: translateY(8px); }
.hb-yh9-node b { display: flex; align-items: center; gap: 6px; font-size: 10px; }
.hb-yh9-node b i { width: 8px; height: 8px; border-radius: 2px; }
.hb-yh9-node span { display: block; margin-top: 3px; color: #8f8f8f; font-size: 9px; }
@keyframes hb-yh9-fill { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-yh9-in { to { opacity: 1; transform: none; } }
@keyframes hb-yh9-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-yh9-dash { to { stroke-dashoffset: -16; } }
@container (max-width: 860px) {
  .hb-yh9-in { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .hb-yh9-dev { order: -1; }
}
@container (max-width: 480px) {
  .hb-yh9-pane { grid-template-columns: minmax(0, 1fr); }
  .hb-yh9-nav { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yh9 *, .hb-yh9 *::before, .hb-yh9 *::after { animation: none !important; transition: none !important; }
  .hb-yh9-row, .hb-yh9-st, .hb-yh9-ev, .hb-yh9-node { opacity: 1; transform: none; }
  .hb-yh9-ln { stroke-dashoffset: 0; }
}
`;

const defaultFeatures: ShowcaseDeviceTabsFeature[] = [
  { title: "One inbox for every channel", description: "Email, chat and WhatsApp land in the same queue, grouped by customer and sorted by urgency.", screen: "inbox" },
  { title: "Pipeline you can trust", description: "Forecasts update as deals move, with win rates by stage and rep so Monday reviews take ten minutes.", screen: "analytics" },
  { title: "Scheduling without the ping-pong", description: "Share a link, let prospects pick a slot and the right rep gets the meeting with notes attached.", screen: "calendar" },
  { title: "Automations in plain steps", description: "When a trial converts, notify sales, tag the account and start onboarding. No code, no tickets.", screen: "automations" },
];

const navItems = ["Inbox", "Pipeline", "Calendar", "Automations", "Contacts", "Reports"];

const navFor: Record<ShowcaseDeviceTabsScreen, number> = { inbox: 0, analytics: 1, calendar: 2, automations: 3 };

function Screen({ kind }: { kind: ShowcaseDeviceTabsScreen }) {
  if (kind === "inbox") {
    const rows = [
      ["Hannah Cole", "Re: Renewal for 40 seats", "#f97316", "2m", "Urgent", "#f87171"],
      ["Diego Alvarez", "Can we move the demo to Thursday?", "#0ea5e9", "8m", "Chat", "#7dd3fc"],
      ["Mei Tanaka", "Invoice question for October", "#8b5cf6", "21m", "Billing", "#c4b5fd"],
      ["Oliver Brandt", "Loved the onboarding call", "#10b981", "1h", "WhatsApp", "#6ee7b7"],
      ["Priya Shah", "SSO setup failing on Okta", "#ec4899", "2h", "Support", "#f9a8d4"],
    ];
    return (
      <>
        <div className="hb-yh9-mh">
          Inbox<span>24 open</span>
        </div>
        {rows.map(([n, d, c, t, tag, tc], i) => (
          <div key={n} className="hb-yh9-row" data-on={i === 0 ? "true" : "false"} style={{ "--hb-yh9-k": i } as React.CSSProperties}>
            <span className="hb-yh9-av" style={{ background: c }}>
              {n!.split(" ").map((p) => p[0])}
            </span>
            <span className="hb-yh9-rt">
              <span className="hb-yh9-rn">{n}</span>
              <span className="hb-yh9-rd">{d}</span>
            </span>
            <span className="hb-yh9-ch" style={{ color: tc, background: `color-mix(in srgb, ${tc} 15%, transparent)` }}>
              {tag}
            </span>
            <span className="hb-yh9-rx">{t}</span>
          </div>
        ))}
      </>
    );
  }
  if (kind === "analytics") {
    const pts = [52, 48, 50, 41, 44, 36, 38, 30, 26, 28, 18, 12];
    const d = pts.map((y, i) => `${i === 0 ? "M" : "L"}${((i / (pts.length - 1)) * 100).toFixed(2)} ${y}`).join(" ");
    return (
      <>
        <div className="hb-yh9-mh">
          Pipeline<span>Q4 forecast</span>
        </div>
        <div className="hb-yh9-stats">
          {[
            ["Weighted", "$1.42M", "+9%"],
            ["Win rate", "31%", "+4 pt"],
            ["Cycle", "23 days", "-5d"],
          ].map(([k, v, e], i) => (
            <div key={k} className="hb-yh9-st" style={{ "--hb-yh9-k": i } as React.CSSProperties}>
              <span>{k}</span>
              <b>{v}</b>
              <em>{e}</em>
            </div>
          ))}
        </div>
        <div className="hb-yh9-chart">
          <svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
            <path className="hb-yh9-area" d={`${d} L100 60 L0 60 Z`} />
            <path className="hb-yh9-ln" d={d} />
          </svg>
        </div>
      </>
    );
  }
  if (kind === "calendar") {
    const hours = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];
    const evs = [
      { d: 0, h: 0, l: 2, t: "Demo, Acme Freight", c: "#2f7bff" },
      { d: 1, h: 2, l: 1, t: "Intro call", c: "#10b981" },
      { d: 2, h: 1, l: 2, t: "Pipeline review", c: "#8b5cf6" },
      { d: 3, h: 4, l: 2, t: "Onboarding, Lumen", c: "#f97316" },
      { d: 4, h: 0, l: 1, t: "1:1 with Sam", c: "#ec4899" },
      { d: 1, h: 5, l: 2, t: "Contract walkthrough", c: "#2f7bff" },
    ];
    return (
      <>
        <div className="hb-yh9-mh">
          Week of Nov 10<span>Share link</span>
        </div>
        <div className="hb-yh9-cal">
          {hours.map((h) => (
            <React.Fragment key={h}>
              <span className="hb-yh9-hr">{h}</span>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="hb-yh9-cell" />
              ))}
            </React.Fragment>
          ))}
          {evs.map((e, i) => (
            <span
              key={e.t}
              className="hb-yh9-ev"
              style={
                {
                  "--hb-yh9-k": i,
                  left: `calc(30px + (100% - 30px) * ${(e.d / 5).toFixed(3)} + 2px)`,
                  width: "calc((100% - 30px) / 5 - 4px)",
                  top: `${e.h * 26 + 2}px`,
                  height: `${e.l * 26 - 4}px`,
                  background: `color-mix(in srgb, ${e.c} 22%, #121214)`,
                  color: "#ededed",
                  boxShadow: `inset 2px 0 0 ${e.c}`,
                } as React.CSSProperties
              }
            >
              {e.t}
            </span>
          ))}
        </div>
      </>
    );
  }
  const nodes = [
    { x: 4, y: 6, t: "Trial converts", s: "Trigger, Stripe", c: "#f59e0b" },
    { x: 58, y: 6, t: "Tag account", s: "Plan: Growth", c: "#2f7bff" },
    { x: 4, y: 56, t: "Notify #sales", s: "Slack message", c: "#10b981" },
    { x: 58, y: 56, t: "Start onboarding", s: "5 step sequence", c: "#8b5cf6" },
  ];
  return (
    <>
      <div className="hb-yh9-mh">
        Trial to paid<span>Live</span>
      </div>
      <div className="hb-yh9-flow">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path className="hb-yh9-wire" d="M38 18 C 48 18, 48 18, 58 18" />
          <path className="hb-yh9-wire" d="M21 30 C 21 42, 21 44, 21 56" />
          <path className="hb-yh9-wire" d="M75 30 C 75 42, 75 44, 75 56" />
        </svg>
        {nodes.map((n, i) => (
          <div key={n.t} className="hb-yh9-node" style={{ "--hb-yh9-k": i, left: `${n.x}%`, top: `${n.y}%` } as React.CSSProperties}>
            <b>
              <i style={{ background: n.c }} />
              {n.t}
            </b>
            <span>{n.s}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export function ShowcaseDeviceTabs({
  eyebrow = "Inside Orbit",
  title = "Everything your revenue team does, on one screen",
  subtitle = "Pick a feature to see it in the app. The tour advances on its own and pauses while you read.",
  features = defaultFeatures,
  value,
  defaultValue = 0,
  onValueChange,
  autoplay = true,
  interval = 6000,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: ShowcaseDeviceTabsProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState(defaultValue);
  const [paused, setPaused] = React.useState(false);
  const current = value ?? inner;
  const listRef = React.useRef<HTMLDivElement>(null);

  function go(i: number) {
    const n = (i + features.length) % features.length;
    if (value === undefined) setInner(n);
    onValueChange?.(n);
  }

  function onKey(e: React.KeyboardEvent) {
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = current + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = current - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = features.length - 1;
    else return;
    e.preventDefault();
    const n = (next + features.length) % features.length;
    go(n);
    listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]')[n]?.focus();
  }

  return (
    <section
      className={`hb-yh9 ${className}`}
      data-auto={autoplay ? "true" : "false"}
      data-paused={paused ? "true" : "false"}
      style={{ "--hb-yh9-accent": accent, "--hb-yh9-dur": `${interval}ms`, ...style } as React.CSSProperties}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      {...rest}
    >
      <style href="hb-showcase-device-tabs" precedence="default">
        {css}
      </style>
      <div className="hb-yh9-in">
        <div>
          <span className="hb-yh9-eyebrow">{eyebrow}</span>
          <h2 className="hb-yh9-title">{title}</h2>
          {subtitle && <p className="hb-yh9-sub">{subtitle}</p>}
          <div ref={listRef} className="hb-yh9-list" role="tablist" aria-orientation="vertical" aria-label="Features" onKeyDown={onKey}>
            {features.map((f, i) => {
              const on = i === current;
              return (
                <button
                  key={f.title}
                  type="button"
                  role="tab"
                  id={`${uid}-t${i}`}
                  aria-selected={on}
                  aria-controls={`${uid}-p`}
                  tabIndex={on ? 0 : -1}
                  className="hb-yh9-tab"
                  onClick={() => go(i)}
                >
                  <span className="hb-yh9-prog" aria-hidden="true">
                    <i onAnimationEnd={on ? () => go(current + 1) : undefined} />
                  </span>
                  <span className="hb-yh9-tt">
                    <span className="hb-yh9-num">{String(i + 1).padStart(2, "0")}</span>
                    {f.title}
                  </span>
                  <span className="hb-yh9-td">
                    <span className="hb-yh9-tdi">
                      <span>{f.description}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="hb-yh9-dev" id={`${uid}-p`} role="tabpanel" aria-labelledby={`${uid}-t${current}`}>
          <div className="hb-yh9-lid">
            <span className="hb-yh9-cam" aria-hidden="true" />
            <div className="hb-yh9-screen">
              {features.map((f, i) => (
                <div key={f.title} className="hb-yh9-pane" data-on={i === current ? "true" : "false"} aria-hidden={i !== current}>
                  {f.image ? (
                    <span className="hb-yh9-img" role="img" aria-label={f.title} style={{ backgroundImage: `url("${f.image}")` }} />
                  ) : (
                    <>
                      <div className="hb-yh9-nav">
                        <div className="hb-yh9-brand">
                          <i />
                          Orbit
                        </div>
                        {navItems.map((n, k) => (
                          <div key={n} className="hb-yh9-ni" data-on={k === navFor[f.screen] ? "true" : "false"}>
                            {n}
                          </div>
                        ))}
                      </div>
                      <div className="hb-yh9-main">
                        <Screen kind={f.screen} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="hb-yh9-base" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
