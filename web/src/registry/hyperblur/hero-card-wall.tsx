"use client";

import * as React from "react";

export interface HeroCardWallAction {
  label: string;
  href: string;
}

export interface HeroCardWallItem {
  name: string;
  detail: string;
  color: string;
  stat?: string;
}

export interface HeroCardWallProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  count?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroCardWallAction | null;
  secondaryCta?: HeroCardWallAction | null;
  items?: HeroCardWallItem[];
  accent?: string;
  speed?: number;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb8 {
  --hb-vb8-accent: #2f7bff;
  --hb-vb8-sp: 1;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 620px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #08080a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vb8 *, .hb-vb8 *::before, .hb-vb8 *::after { box-sizing: border-box; }
.hb-vb8-scene {
  position: absolute;
  top: 50%;
  left: 58%;
  z-index: -2;
  width: 900px;
  height: 1100px;
  margin: -550px 0 0 -260px;
  perspective: 1400px;
  pointer-events: none;
}
.hb-vb8-plane {
  display: grid;
  grid-template-columns: repeat(5, 200px);
  gap: 16px;
  height: 100%;
  transform: rotateX(46deg) rotateZ(-32deg) translateZ(-60px);
  transform-style: preserve-3d;
}
.hb-vb8-col { overflow: hidden; }
.hb-vb8-track {
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: hb-vb8-scroll calc(var(--hb-vb8-dur) / var(--hb-vb8-sp)) linear infinite;
  animation-direction: var(--hb-vb8-dir);
}
@keyframes hb-vb8-scroll {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, calc(-50% - 8px), 0); }
}
.hb-vb8-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 150px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 16px;
  background: linear-gradient(160deg, #18181b, #0f0f11);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 20px 40px -20px rgba(0, 0, 0, .9);
}
.hb-vb8-card[data-lit] {
  border-color: color-mix(in srgb, var(--hb-vb8-accent) 55%, transparent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 0 40px -10px color-mix(in srgb, var(--hb-vb8-accent) 70%, transparent);
}
.hb-vb8-head { display: flex; align-items: center; gap: 10px; }
.hb-vb8-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(140deg, color-mix(in srgb, var(--hb-vb8-c) 90%, #ffffff), var(--hb-vb8-c));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 6px 14px -6px var(--hb-vb8-c);
  color: #fff;
  font-family: var(--font-grotesk, inherit);
  font-size: 15px;
  font-weight: 700;
}
.hb-vb8-name { color: #f5f5f5; font-size: 14px; font-weight: 600; }
.hb-vb8-state { display: block; color: rgba(237, 237, 237, .45); font-size: 11px; }
.hb-vb8-detail { margin: 0; color: rgba(237, 237, 237, .55); font-size: 12px; line-height: 1.45; }
.hb-vb8-stat { margin-top: auto; display: flex; align-items: center; justify-content: space-between; color: rgba(237, 237, 237, .4); font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; }
.hb-vb8-toggle { position: relative; width: 26px; height: 15px; border-radius: 99px; background: rgba(255, 255, 255, .1); }
.hb-vb8-toggle::after { content: ""; position: absolute; left: 2px; top: 2px; width: 11px; height: 11px; border-radius: 50%; background: rgba(255, 255, 255, .5); }
.hb-vb8-card[data-lit] .hb-vb8-toggle { background: var(--hb-vb8-accent); }
.hb-vb8-card[data-lit] .hb-vb8-toggle::after { left: 13px; background: #fff; }
.hb-vb8-fade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(90deg, #08080a 0%, #08080a 30%, rgba(8, 8, 10, .82) 46%, rgba(8, 8, 10, 0) 68%),
    linear-gradient(180deg, #08080a 0%, rgba(8, 8, 10, 0) 18%, rgba(8, 8, 10, 0) 82%, #08080a 100%);
  pointer-events: none;
}
.hb-vb8-copy { position: relative; max-width: 500px; padding: 60px clamp(20px, 6cqi, 72px); }
.hb-vb8-in { animation: hb-vb8-up .9s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb8-d, 0ms); }
@keyframes hb-vb8-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vb8-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: rgba(237, 237, 237, .6);
  font-size: 13px;
}
.hb-vb8-count {
  padding: 3px 8px;
  border-radius: 99px;
  background: color-mix(in srgb, var(--hb-vb8-accent) 18%, transparent);
  color: color-mix(in srgb, var(--hb-vb8-accent) 50%, #ffffff);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11.5px;
}
.hb-vb8-title {
  margin: 18px 0 0;
  color: #f5f5f5;
  font-size: clamp(36px, 5.6cqi, 60px);
  font-weight: 640;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
}
.hb-vb8-sub { margin: 18px 0 0; color: rgba(237, 237, 237, .58); font-size: clamp(14.5px, 1.7cqi, 16.5px); line-height: 1.55; }
.hb-vb8-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
.hb-vb8-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 999px;
  color: #ededed;
  font: inherit;
  font-size: 15px;
  font-weight: 550;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .25s cubic-bezier(.2, .8, .2, 1), background .25s ease, border-color .25s ease;
}
.hb-vb8-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .28); transform: translateY(-1px); }
.hb-vb8-btn:active { transform: scale(.98); }
.hb-vb8-btn:focus-visible { outline: 2px solid var(--hb-vb8-accent); outline-offset: 3px; }
.hb-vb8-btn[data-primary] { border-color: transparent; background: #f5f5f5; color: #0a0a0a; }
.hb-vb8-btn[data-primary]:hover { background: #ffffff; }
.hb-vb8-btn svg { transition: transform .25s ease; }
.hb-vb8-btn:hover svg { transform: translateX(2px); }
@container (max-width: 680px) {
  .hb-vb8 { align-items: flex-end; }
  .hb-vb8-scene { left: 50%; top: 20%; margin-left: -450px; }
  .hb-vb8-fade { background: linear-gradient(180deg, rgba(8, 8, 10, .2) 0%, rgba(8, 8, 10, .6) 35%, #08080a 62%); }
  .hb-vb8-copy { padding-top: 220px; }
}
@container (max-width: 480px) {
  .hb-vb8-actions { flex-direction: column; align-items: stretch; }
  .hb-vb8-btn { justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb8-track, .hb-vb8-in { animation: none; }
  .hb-vb8-btn, .hb-vb8-btn svg { transition: none; }
}
`;

const defaultItems: HeroCardWallItem[] = [
  { name: "Relay", detail: "Post deal alerts to #revenue the moment they close.", color: "#9b5cf6", stat: "2.1k syncs" },
  { name: "Ledgerly", detail: "Mirror invoices, refunds and disputes in real time.", color: "#6366f1", stat: "48 events/s" },
  { name: "Trackline", detail: "Turn customer feedback into triaged issues.", color: "#5e6ad2", stat: "312 issues" },
  { name: "Beacon", detail: "Keep contact owners aligned across both CRMs.", color: "#f97316", stat: "18k records" },
  { name: "Pagewell", detail: "Publish weekly metrics to a shared page.", color: "#71717a", stat: "Every Mon" },
  { name: "Tablestore", detail: "Stream changes from any table with row filters.", color: "#0ea5e9", stat: "6 tables" },
  { name: "Cartwheel", detail: "Sync orders and fulfillment across stores.", color: "#22c55e", stat: "940 orders" },
  { name: "Helpdeck", detail: "Attach account health to every ticket.", color: "#14b8a6", stat: "1.2k tickets" },
  { name: "Repoly", detail: "Link releases to the deals they unblock.", color: "#a1a1aa", stat: "86 repos" },
  { name: "Gridbase", detail: "Two-way sync with field-level conflict rules.", color: "#eab308", stat: "24 bases" },
  { name: "Sketchpad", detail: "Notify reviewers when a file changes status.", color: "#ec4899", stat: "41 files" },
  { name: "Icefield", detail: "Load clean events into your warehouse hourly.", color: "#38bdf8", stat: "3.4 TB" },
  { name: "Chatwell", detail: "Route conversations by plan and region.", color: "#3b82f6", stat: "570 chats" },
  { name: "Mailroom", detail: "Log threads to the right account automatically.", color: "#ef4444", stat: "9.8k emails" },
  { name: "Sprintly", detail: "Keep sprint status visible to customer teams.", color: "#2563eb", stat: "128 epics" },
];

const columnSpec = [
  { dur: "38s", dir: "normal" },
  { dur: "30s", dir: "reverse" },
  { dur: "44s", dir: "normal" },
  { dur: "34s", dir: "reverse" },
  { dur: "40s", dir: "normal" },
];

const defaultPrimary: HeroCardWallAction = { label: "Connect your stack", href: "#" };
const defaultSecondary: HeroCardWallAction = { label: "Browse integrations", href: "#" };

function d(ms: number) {
  return { "--hb-vb8-d": `${ms}ms` } as React.CSSProperties;
}

export function HeroCardWall({
  eyebrow = "integrations, and counting",
  count = "300+",
  title = "Plug into the tools your team already loves",
  subtitle = "Relaybase keeps your apps in sync with two-way connectors, field-level rules and a full audit trail. Setup takes minutes, not sprints.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  items = defaultItems,
  accent = "#2f7bff",
  speed = 1,
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroCardWallProps) {
  const Heading = headingAs;
  const vars = { "--hb-vb8-accent": accent, "--hb-vb8-sp": Math.max(speed, 0.1), ...style } as React.CSSProperties;
  const pool = items.length ? items : defaultItems;

  return (
    <section className={`hb-vb8 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-card-wall" precedence="default">{css}</style>
      <div className="hb-vb8-scene" aria-hidden="true">
        <div className="hb-vb8-plane">
          {columnSpec.map((col, c) => {
            const cards = Array.from({ length: 6 }, (_, i) => pool[(c * 3 + i * 2) % pool.length]);
            return (
              <div key={c} className="hb-vb8-col">
                <div className="hb-vb8-track" style={{ "--hb-vb8-dur": col.dur, "--hb-vb8-dir": col.dir } as React.CSSProperties}>
                  {cards.concat(cards).map((item, i) => (
                    <div
                      key={i}
                      className="hb-vb8-card"
                      data-lit={(c + i) % 4 === 1 ? "" : undefined}
                      style={{ "--hb-vb8-c": item.color } as React.CSSProperties}
                    >
                      <div className="hb-vb8-head">
                        <span className="hb-vb8-icon">{item.name.charAt(0)}</span>
                        <span>
                          <span className="hb-vb8-name">{item.name}</span>
                          <span className="hb-vb8-state">{(c + i) % 4 === 1 ? "Syncing" : "Connected"}</span>
                        </span>
                      </div>
                      <p className="hb-vb8-detail">{item.detail}</p>
                      <div className="hb-vb8-stat">
                        <span>{item.stat ?? ""}</span>
                        <span className="hb-vb8-toggle" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="hb-vb8-fade" aria-hidden="true" />
      <div className="hb-vb8-copy">
        {eyebrow ? (
          <p className="hb-vb8-eyebrow hb-vb8-in" style={d(40)}>
            {count ? <span className="hb-vb8-count">{count}</span> : null}
            {eyebrow}
          </p>
        ) : null}
        <Heading className="hb-vb8-title hb-vb8-in" style={d(130)}>
          {title}
        </Heading>
        {subtitle ? (
          <p className="hb-vb8-sub hb-vb8-in" style={d(230)}>
            {subtitle}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-vb8-actions hb-vb8-in" style={d(330)}>
            {primaryCta ? (
              <a className="hb-vb8-btn" data-primary="" href={primaryCta.href}>
                {primaryCta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-vb8-btn" href={secondaryCta.href}>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
