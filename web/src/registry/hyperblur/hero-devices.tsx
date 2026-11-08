"use client";

import * as React from "react";

export interface HeroDevicesAction {
  label: string;
  href: string;
}

export interface HeroDevicesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroDevicesAction | null;
  secondaryCta?: HeroDevicesAction | null;
  accent?: string;
  interactive?: boolean;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb5 {
  --hb-vb5-accent: #2f7bff;
  --hb-vb5-x: 0;
  --hb-vb5-y: 0;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 640px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background:
    radial-gradient(60% 50% at 50% 100%, color-mix(in srgb, var(--hb-vb5-accent) 26%, transparent), transparent 70%),
    #08080a;
  color: #ededed;
  font-family: inherit;
  text-align: center;
  -webkit-font-smoothing: antialiased;
}
.hb-vb5 *, .hb-vb5 *::before, .hb-vb5 *::after { box-sizing: border-box; }
.hb-vb5-copy { display: flex; flex-direction: column; align-items: center; max-width: 760px; padding: 60px clamp(20px, 5cqi, 48px) 0; }
.hb-vb5-in { animation: hb-vb5-up .9s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb5-d, 0ms); }
@keyframes hb-vb5-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vb5-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0; color: rgba(237, 237, 237, .62); font-size: 13px; }
.hb-vb5-devs { display: inline-flex; gap: 4px; color: color-mix(in srgb, var(--hb-vb5-accent) 60%, #ffffff); }
.hb-vb5-title {
  margin: 14px 0 0;
  color: #f5f5f5;
  font-size: clamp(34px, 5.8cqi, 60px);
  font-weight: 640;
  line-height: 1.03;
  letter-spacing: -.045em;
  text-wrap: balance;
}
.hb-vb5-sub { max-width: 540px; margin: 14px 0 0; color: rgba(237, 237, 237, .58); font-size: clamp(14.5px, 1.7cqi, 16.5px); line-height: 1.55; }
.hb-vb5-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 24px; }
.hb-vb5-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 12px;
  background: rgba(255, 255, 255, .04);
  color: #ededed;
  font: inherit;
  font-size: 14.5px;
  font-weight: 550;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .25s cubic-bezier(.2, .8, .2, 1), background .25s ease, border-color .25s ease, box-shadow .25s ease;
}
.hb-vb5-btn:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .26); transform: translateY(-1px); }
.hb-vb5-btn:active { transform: scale(.98); }
.hb-vb5-btn:focus-visible { outline: 2px solid var(--hb-vb5-accent); outline-offset: 3px; }
.hb-vb5-btn[data-primary] {
  border-color: color-mix(in srgb, var(--hb-vb5-accent) 70%, #ffffff);
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-vb5-accent) 85%, #ffffff), var(--hb-vb5-accent));
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3), 0 10px 30px -10px var(--hb-vb5-accent);
}
.hb-vb5-stage {
  position: relative;
  width: min(660px, 88%);
  margin-top: 44px;
  perspective: 1800px;
  pointer-events: none;
}
.hb-vb5-layer {
  transform: translate3d(calc(var(--hb-vb5-x) * var(--hb-vb5-k) * 1px), calc(var(--hb-vb5-y) * var(--hb-vb5-k) * 1px), 0);
  transition: transform 1.1s cubic-bezier(.16, 1, .3, 1);
}
.hb-vb5-lid {
  position: relative;
  padding: 2.2% 2.2% 2.6%;
  border-radius: 18px 18px 6px 6px;
  background: linear-gradient(180deg, #2a2b2f, #151619);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .12), 0 40px 80px -30px rgba(0, 0, 0, .9);
  transform-origin: 50% 100%;
  animation: hb-vb5-open 1.6s cubic-bezier(.16, 1, .3, 1) .3s both;
}
@keyframes hb-vb5-open {
  from { transform: rotateX(-86deg); filter: brightness(.3); }
  to { transform: rotateX(0); filter: none; }
}
.hb-vb5-screen {
  position: relative;
  display: grid;
  grid-template-columns: 17% 1fr;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 8px;
  background: #0d0e11;
  text-align: left;
}
.hb-vb5-glare {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, rgba(255, 255, 255, .08), transparent 40%);
  pointer-events: none;
}
.hb-vb5-side { display: flex; flex-direction: column; gap: 6px; padding: 10px 8px; border-right: 1px solid rgba(255, 255, 255, .06); background: #0a0b0d; }
.hb-vb5-logo { width: 18px; height: 18px; margin-bottom: 8px; border-radius: 6px; background: linear-gradient(135deg, var(--hb-vb5-accent), #a855f7); }
.hb-vb5-nav { height: 7px; border-radius: 4px; background: rgba(255, 255, 255, .08); }
.hb-vb5-nav[data-on] { background: color-mix(in srgb, var(--hb-vb5-accent) 55%, transparent); }
.hb-vb5-main { display: flex; flex-direction: column; min-width: 0; padding: 10px 12px; }
.hb-vb5-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; color: #ededed; font-size: 11px; font-weight: 600; }
.hb-vb5-bar span:last-child { padding: 3px 7px; border-radius: 5px; background: var(--hb-vb5-accent); color: #fff; font-size: 8.5px; }
.hb-vb5-board { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; flex: 1; }
.hb-vb5-col { display: flex; flex-direction: column; gap: 6px; padding: 6px; border-radius: 7px; background: rgba(255, 255, 255, .025); }
.hb-vb5-colh { display: flex; align-items: center; gap: 5px; color: rgba(237, 237, 237, .55); font-size: 8.5px; font-weight: 600; }
.hb-vb5-colh::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: var(--hb-vb5-c); }
.hb-vb5-card {
  padding: 6px 7px;
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 6px;
  background: #15171b;
  color: rgba(237, 237, 237, .85);
  font-size: 8.5px;
  line-height: 1.35;
  animation: hb-vb5-pop .7s cubic-bezier(.34, 1.56, .64, 1) both;
  animation-delay: calc(1.2s + var(--hb-vb5-ci) * 70ms);
}
.hb-vb5-card i { display: block; height: 3px; margin-top: 5px; border-radius: 2px; background: rgba(255, 255, 255, .08); font-style: normal; }
.hb-vb5-card i::after { content: ""; display: block; width: var(--hb-vb5-p); height: 100%; border-radius: 2px; background: var(--hb-vb5-c); }
@keyframes hb-vb5-pop {
  from { opacity: 0; transform: translate3d(0, 6px, 0) scale(.96); }
  to { opacity: 1; transform: none; }
}
.hb-vb5-base {
  position: relative;
  width: 116%;
  height: 14px;
  margin-left: -8%;
  border-radius: 2px 2px 14px 14px;
  background: linear-gradient(180deg, #3a3b40, #1a1b1e 60%, #0c0c0e);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, .9);
}
.hb-vb5-base::before { content: ""; position: absolute; left: 42%; right: 42%; top: 0; height: 5px; border-radius: 0 0 6px 6px; background: #121316; }
.hb-vb5-phone {
  position: absolute;
  right: -7%;
  bottom: -18%;
  width: 25%;
  padding: 1.6%;
  border-radius: 22px;
  background: linear-gradient(160deg, #34353a, #121316);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .14), -20px 30px 60px -10px rgba(0, 0, 0, .9);
  animation: hb-vb5-slide 1.3s cubic-bezier(.16, 1, .3, 1) 1s both;
}
@keyframes hb-vb5-slide {
  from { opacity: 0; transform: translate3d(30%, 30%, 0) rotate(8deg); }
  to { opacity: 1; transform: none; }
}
.hb-vb5-pscreen { display: flex; flex-direction: column; gap: 5px; aspect-ratio: 9 / 19; padding: 16% 7% 7%; overflow: hidden; border-radius: 17px; background: #0c0d10; text-align: left; position: relative; }
.hb-vb5-island { position: absolute; left: 50%; top: 4%; width: 34%; height: 4%; transform: translateX(-50%); border-radius: 99px; background: #000; }
.hb-vb5-ptime { color: #ededed; font-size: 15px; font-weight: 600; letter-spacing: -.02em; text-align: center; margin-bottom: 4px; }
.hb-vb5-note { padding: 6px; border-radius: 8px; background: rgba(255, 255, 255, .06); color: rgba(237, 237, 237, .85); font-size: 7.5px; line-height: 1.35; animation: hb-vb5-pop .7s cubic-bezier(.34, 1.56, .64, 1) both; animation-delay: calc(1.9s + var(--hb-vb5-ci) * 160ms); }
.hb-vb5-note b { display: block; color: #fff; font-weight: 600; }
.hb-vb5-chip {
  position: absolute;
  left: -9%;
  top: 22%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px 10px 10px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 14px;
  background: rgba(18, 19, 23, .78);
  backdrop-filter: blur(14px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 20px 40px -14px rgba(0, 0, 0, .9);
  text-align: left;
  animation: hb-vb5-pop .9s cubic-bezier(.34, 1.56, .64, 1) 1.7s both;
}
.hb-vb5-chip b { display: block; color: #fff; font-size: 12px; font-weight: 600; }
.hb-vb5-chip span { color: rgba(237, 237, 237, .55); font-size: 11px; }
.hb-vb5-ring { flex: none; }
.hb-vb5-ring circle:last-child { stroke-dasharray: 88; stroke-dashoffset: 88; animation: hb-vb5-ring 1.4s cubic-bezier(.16, 1, .3, 1) 2s forwards; }
@keyframes hb-vb5-ring {
  to { stroke-dashoffset: 7; }
}
@container (max-width: 560px) {
  .hb-vb5-actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 320px; }
  .hb-vb5-btn { justify-content: center; }
  .hb-vb5-chip { left: -2%; top: -10%; scale: .85; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb5-in, .hb-vb5-lid, .hb-vb5-card, .hb-vb5-phone, .hb-vb5-note, .hb-vb5-chip { animation: none; }
  .hb-vb5-ring circle:last-child { animation: none; stroke-dashoffset: 7; }
  .hb-vb5-layer, .hb-vb5-btn { transition: none; }
}
`;

const columns = [
  {
    name: "Planned",
    color: "#a1a1aa",
    cards: [
      { t: "Billing page empty states", p: "10%" },
      { t: "Invite flow copy review", p: "0%" },
    ],
  },
  {
    name: "In progress",
    color: "#f5a524",
    cards: [
      { t: "Offline sync for mobile", p: "64%" },
      { t: "Audit log export to CSV", p: "40%" },
      { t: "Dark mode tokens", p: "82%" },
    ],
  },
  {
    name: "Shipped",
    color: "#22c55e",
    cards: [
      { t: "SSO with Okta", p: "100%" },
      { t: "Faster search index", p: "100%" },
    ],
  },
];

const offsets = columns.map((_, i) => columns.slice(0, i).reduce((sum, col) => sum + col.cards.length, 0));

const notes = [
  { title: "Maya moved a card", body: "Offline sync is now In progress" },
  { title: "Build passed", body: "release/24.3 deployed to staging" },
  { title: "Standup in 10 min", body: "Product sync, Room 4" },
];

const defaultPrimary: HeroDevicesAction = { label: "Get Tandem free", href: "#" };
const defaultSecondary: HeroDevicesAction = { label: "Download for iOS", href: "#" };

function d(ms: number) {
  return { "--hb-vb5-d": `${ms}ms` } as React.CSSProperties;
}

function k(depth: number) {
  return { "--hb-vb5-k": depth } as React.CSSProperties;
}

export function HeroDevices({
  eyebrow = "Desktop, web and mobile",
  title = "Plan the sprint on one screen. Ship it from any other.",
  subtitle = "Tandem keeps your board, standups and releases in sync across every device, even when the train goes underground.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  accent = "#2f7bff",
  interactive = true,
  headingAs = "h1",
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: HeroDevicesProps) {
  const Heading = headingAs;
  const root = React.useRef<HTMLElement>(null);
  const vars = { "--hb-vb5-accent": accent, ...style } as React.CSSProperties;

  const move = (event: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(event);
    if (!interactive || !root.current) return;
    const box = root.current.getBoundingClientRect();
    root.current.style.setProperty("--hb-vb5-x", (((event.clientX - box.left) / box.width - 0.5) * 2).toFixed(3));
    root.current.style.setProperty("--hb-vb5-y", (((event.clientY - box.top) / box.height - 0.5) * 2).toFixed(3));
  };
  const leave = (event: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(event);
    root.current?.style.setProperty("--hb-vb5-x", "0");
    root.current?.style.setProperty("--hb-vb5-y", "0");
  };

  return (
    <section ref={root} className={`hb-vb5 ${className}`} style={vars} onPointerMove={move} onPointerLeave={leave} {...rest}>
      <style href="hb-hero-devices" precedence="default">{css}</style>
      <div className="hb-vb5-copy">
        {eyebrow ? (
          <p className="hb-vb5-eyebrow hb-vb5-in" style={d(40)}>
            <span className="hb-vb5-devs" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="12" rx="2" />
                <path d="M2 20h20" />
              </svg>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="7" y="2" width="10" height="20" rx="2.5" />
                <path d="M11 18h2" />
              </svg>
            </span>
            {eyebrow}
          </p>
        ) : null}
        <Heading className="hb-vb5-title hb-vb5-in" style={d(130)}>
          {title}
        </Heading>
        {subtitle ? (
          <p className="hb-vb5-sub hb-vb5-in" style={d(230)}>
            {subtitle}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-vb5-actions hb-vb5-in" style={d(330)}>
            {primaryCta ? (
              <a className="hb-vb5-btn" data-primary="" href={primaryCta.href}>
                {primaryCta.label}
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-vb5-btn" href={secondaryCta.href}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                </svg>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="hb-vb5-stage" aria-hidden="true">
        <div className="hb-vb5-layer" style={k(8)}>
          <div className="hb-vb5-lid">
            <div className="hb-vb5-screen">
              <div className="hb-vb5-side">
                <span className="hb-vb5-logo" />
                <span className="hb-vb5-nav" data-on="" />
                <span className="hb-vb5-nav" style={{ width: "80%" }} />
                <span className="hb-vb5-nav" style={{ width: "90%" }} />
                <span className="hb-vb5-nav" style={{ width: "70%" }} />
              </div>
              <div className="hb-vb5-main">
                <div className="hb-vb5-bar">
                  <span>Sprint 24 · Mobile launch</span>
                  <span>Share</span>
                </div>
                <div className="hb-vb5-board">
                  {columns.map((col, c) => (
                    <div key={col.name} className="hb-vb5-col" style={{ "--hb-vb5-c": col.color } as React.CSSProperties}>
                      <span className="hb-vb5-colh">{col.name}</span>
                      {col.cards.map((card, i) => (
                        <span key={card.t} className="hb-vb5-card" style={{ "--hb-vb5-ci": offsets[c] + i, "--hb-vb5-p": card.p } as React.CSSProperties}>
                          {card.t}
                          <i />
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <span className="hb-vb5-glare" />
            </div>
          </div>
          <div className="hb-vb5-base" />
        </div>
        <div className="hb-vb5-layer" style={{ ...k(22), position: "absolute", inset: 0 }}>
          <div className="hb-vb5-phone">
            <div className="hb-vb5-pscreen">
              <span className="hb-vb5-island" />
              <span className="hb-vb5-ptime">9:41</span>
              {notes.map((note, i) => (
                <span key={note.title} className="hb-vb5-note" style={{ "--hb-vb5-ci": i } as React.CSSProperties}>
                  <b>{note.title}</b>
                  {note.body}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="hb-vb5-layer" style={{ ...k(36), position: "absolute", inset: 0 }}>
          <div className="hb-vb5-chip">
            <svg className="hb-vb5-ring" width="34" height="34" viewBox="0 0 34 34">
              <circle cx="17" cy="17" r="14" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="3.5" />
              <circle cx="17" cy="17" r="14" fill="none" stroke="var(--hb-vb5-accent)" strokeWidth="3.5" strokeLinecap="round" transform="rotate(-90 17 17)" />
            </svg>
            <div>
              <b>Sprint 24 · 92%</b>
              <span>18 of 19 tasks done</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
