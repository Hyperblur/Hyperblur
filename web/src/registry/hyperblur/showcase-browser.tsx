"use client";

import * as React from "react";

export interface ShowcaseBrowserLink {
  label: string;
  href: string;
}

export interface ShowcaseBrowserCallout {
  label: string;
  detail?: string;
}

export interface ShowcaseBrowserProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  points?: string[];
  primaryCta?: ShowcaseBrowserLink | null;
  secondaryCta?: ShowcaseBrowserLink | null;
  url?: string;
  callouts?: ShowcaseBrowserCallout[];
  accent?: string;
}

const css = `
@keyframes hb-kb7-rise { from { opacity: 0; transform: translate3d(0, 18px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-kb7-scroll { 0%, 8% { transform: translate3d(0, 0, 0); } 46%, 54% { transform: translate3d(0, -60%, 0); } 92%, 100% { transform: translate3d(0, 0, 0); } }
@keyframes hb-kb7-pop { from { opacity: 0; transform: scale(.85) translate3d(0, 8px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-kb7-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -6px; } }
@keyframes hb-kb7-glow { 0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: .9; transform: scale(1.08); } }
@keyframes hb-kb7-ping { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(2.6); opacity: 0; } }
.hb-kb7 {
  --hb-kb7-accent: #ff6b4a;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kb7 *, .hb-kb7 *::before, .hb-kb7 *::after { box-sizing: border-box; }
.hb-kb7-in {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, .82fr) minmax(0, 1.18fr);
  align-items: center;
  gap: clamp(28px, 4.5cqi, 56px);
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(56px, 7.5cqi, 104px) clamp(16px, 4.5cqi, 48px);
}
.hb-kb7-copy { min-width: 0; animation: hb-kb7-rise .7s cubic-bezier(.2, .8, .2, 1) backwards; }
.hb-kb7-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 18px; color: #a1a1a1; font-size: 13px; font-weight: 500; }
.hb-kb7-eyebrow i { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--hb-kb7-accent); }
.hb-kb7-eyebrow i::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: var(--hb-kb7-accent); animation: hb-kb7-ping 1.8s ease-out infinite; }
.hb-kb7-title { margin: 0; font-size: clamp(32px, 4.6cqi, 54px); font-weight: 600; line-height: 1.02; letter-spacing: -.04em; text-wrap: balance; }
.hb-kb7-sub { margin: 18px 0 0; color: #8f8f8f; font-size: clamp(15px, 1.5cqi, 17px); line-height: 1.6; text-wrap: pretty; }
.hb-kb7-points { display: grid; gap: 10px; margin: 22px 0 0; padding: 0; list-style: none; }
.hb-kb7-points li { display: flex; align-items: center; gap: 10px; color: #d4d4d4; font-size: 14px; }
.hb-kb7-points svg { flex: none; color: var(--hb-kb7-accent); }
.hb-kb7-ctas { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
.hb-kb7-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 18px; border: 1px solid rgba(255, 255, 255, .14); border-radius: 999px; color: #ededed; font-size: 14px; font-weight: 600; text-decoration: none; transition: background .2s ease, transform .2s ease, border-color .2s ease; }
.hb-kb7-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .24); }
.hb-kb7-btn[data-primary="true"] { border-color: transparent; background: #ededed; color: #0a0a0a; }
.hb-kb7-btn[data-primary="true"]:hover { background: #fff; transform: translate3d(0, -1px, 0); }
.hb-kb7-btn:focus-visible { outline: 2px solid var(--hb-kb7-accent); outline-offset: 3px; }
.hb-kb7-stage {
  position: relative;
  min-width: 0;
  padding: clamp(28px, 5cqi, 64px) clamp(20px, 4.5cqi, 60px);
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 28px;
  background:
    radial-gradient(70% 60% at 15% 10%, color-mix(in srgb, var(--hb-kb7-accent) 55%, transparent), transparent 70%),
    radial-gradient(60% 70% at 95% 90%, rgba(99, 102, 241, .55), transparent 70%),
    radial-gradient(40% 40% at 70% 20%, rgba(244, 114, 182, .35), transparent 70%),
    #120f1a;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);
  animation: hb-kb7-rise .8s cubic-bezier(.2, .8, .2, 1) .12s backwards;
}
.hb-kb7-stage::before { content: ""; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(rgba(255, 255, 255, .05) 1px, transparent 1px) 0 0 / 28px 28px, linear-gradient(90deg, rgba(255, 255, 255, .05) 1px, transparent 1px) 0 0 / 28px 28px; mask-image: radial-gradient(80% 80% at 50% 50%, #000, transparent); pointer-events: none; }
.hb-kb7-frame { position: relative; overflow: hidden; border: 1px solid rgba(255, 255, 255, .14); border-radius: 14px; background: #0c0c0e; box-shadow: 0 40px 80px -30px rgba(0, 0, 0, .8), 0 0 0 6px rgba(255, 255, 255, .03); }
.hb-kb7-chrome { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 12px; height: 38px; padding: 0 12px; border-bottom: 1px solid rgba(255, 255, 255, .07); background: #141416; }
.hb-kb7-dots { display: flex; gap: 6px; }
.hb-kb7-dots i { width: 10px; height: 10px; border-radius: 50%; background: #ff5f57; }
.hb-kb7-dots i:nth-child(2) { background: #febc2e; }
.hb-kb7-dots i:nth-child(3) { background: #28c840; }
.hb-kb7-url { display: flex; align-items: center; justify-content: center; gap: 6px; min-width: 0; max-width: 300px; height: 24px; margin: 0 auto; padding: 0 12px; border-radius: 7px; background: #0b0b0c; color: #8f8f8f; font-size: 11.5px; }
.hb-kb7-url span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-kb7-url svg { flex: none; color: #4ade80; }
.hb-kb7-tools { display: flex; gap: 10px; color: #5f5f5f; }
.hb-kb7-view { position: relative; aspect-ratio: 16 / 10.4; overflow: hidden; }
.hb-kb7-page { position: absolute; inset: 0 0 auto; display: flex; flex-direction: column; height: 250%; padding: 0 5%; background: #0c0c0e; color: #ededed; animation: hb-kb7-scroll 22s cubic-bezier(.65, 0, .35, 1) 1.2s infinite; }
.hb-kb7-stage:hover .hb-kb7-page { animation-play-state: paused; }
.hb-kb7-nav { display: flex; align-items: center; gap: 4%; flex: 0 0 5.5%; border-bottom: 1px solid rgba(255, 255, 255, .06); font-size: 10px; color: #8f8f8f; }
.hb-kb7-nav b { display: inline-flex; align-items: center; gap: 6px; margin-right: auto; color: #ededed; font-size: 11px; font-weight: 700; }
.hb-kb7-nav b i { width: 12px; height: 12px; border-radius: 4px; background: linear-gradient(135deg, var(--hb-kb7-accent), #6366f1); }
.hb-kb7-nav em { padding: 4px 9px; border-radius: 999px; background: #ededed; color: #0a0a0a; font-style: normal; font-weight: 600; }
.hb-kb7-hero { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 6%; flex: 0 0 24%; }
.hb-kb7-hero h4 { margin: 0; font-size: clamp(14px, 2.4cqi, 24px); font-weight: 600; line-height: 1.05; letter-spacing: -.03em; }
.hb-kb7-hero p { margin: 8px 0 0; color: #8f8f8f; font-size: clamp(8px, .95cqi, 10.5px); line-height: 1.5; }
.hb-kb7-hbtn { display: flex; gap: 6px; margin-top: 10px; }
.hb-kb7-hbtn span { padding: 4px 9px; border-radius: 999px; background: var(--hb-kb7-accent); color: #fff; font-size: 9px; font-weight: 600; }
.hb-kb7-hbtn span + span { background: rgba(255, 255, 255, .08); color: #d4d4d4; }
.hb-kb7-shot { position: relative; height: 78%; overflow: hidden; border: 1px solid rgba(255, 255, 255, .08); border-radius: 10px; background: linear-gradient(160deg, #1a1625, #111); }
.hb-kb7-shot svg { position: absolute; inset: auto 0 0; width: 100%; height: 62%; }
.hb-kb7-shot b { position: absolute; top: 10%; left: 8%; font-size: clamp(10px, 1.6cqi, 16px); font-weight: 600; }
.hb-kb7-shot small { position: absolute; top: 26%; left: 8%; color: #4ade80; font-size: 9px; }
.hb-kb7-logos { display: flex; align-items: center; justify-content: space-between; gap: 4%; flex: 0 0 7%; border-block: 1px solid rgba(255, 255, 255, .05); }
.hb-kb7-logos span { flex: 1; height: 8px; border-radius: 4px; background: rgba(255, 255, 255, .1); }
.hb-kb7-feats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3%; flex: 0 0 20%; padding-block: 4% 2%; }
.hb-kb7-feat { padding: 9%; border: 1px solid rgba(255, 255, 255, .07); border-radius: 10px; background: #121214; }
.hb-kb7-feat i { display: block; width: 18px; height: 18px; margin-bottom: 10px; border-radius: 6px; background: color-mix(in srgb, var(--hb-kb7-accent) 30%, #1a1a1a); }
.hb-kb7-feat b { display: block; font-size: 10px; font-weight: 600; }
.hb-kb7-feat span { display: block; height: 5px; margin-top: 6px; border-radius: 3px; background: rgba(255, 255, 255, .08); }
.hb-kb7-feat span + span { width: 70%; }
.hb-kb7-price { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3%; flex: 0 0 27%; padding-block: 3%; }
.hb-kb7-plan { display: flex; flex-direction: column; gap: 6px; padding: 9%; border: 1px solid rgba(255, 255, 255, .07); border-radius: 10px; background: #111113; font-size: 9px; color: #8f8f8f; }
.hb-kb7-plan b { color: #ededed; font-size: 15px; font-weight: 600; }
.hb-kb7-plan span { height: 5px; border-radius: 3px; background: rgba(255, 255, 255, .08); }
.hb-kb7-plan em { margin-top: auto; padding: 5px; border-radius: 6px; background: rgba(255, 255, 255, .08); color: #ededed; font-style: normal; text-align: center; font-weight: 600; }
.hb-kb7-plan[data-hl="true"] { border-color: color-mix(in srgb, var(--hb-kb7-accent) 60%, transparent); background: color-mix(in srgb, var(--hb-kb7-accent) 8%, #111113); }
.hb-kb7-plan[data-hl="true"] em { font-style: normal; background: var(--hb-kb7-accent); color: #fff; }
.hb-kb7-foot { display: flex; gap: 6%; flex: 1; padding-top: 3%; border-top: 1px solid rgba(255, 255, 255, .05); }
.hb-kb7-foot div { flex: 1; display: grid; align-content: start; gap: 6px; }
.hb-kb7-foot span { height: 5px; border-radius: 3px; background: rgba(255, 255, 255, .07); }
.hb-kb7-callouts { position: absolute; inset: 0; pointer-events: none; }
.hb-kb7-callout { position: absolute; display: flex; align-items: center; pointer-events: auto; animation: hb-kb7-pop .5s cubic-bezier(.34, 1.56, .64, 1) backwards, hb-kb7-float 5s ease-in-out infinite; animation-delay: calc(var(--hb-kb7-j) * 220ms + 900ms), calc(var(--hb-kb7-j) * -1.2s); }
.hb-kb7-callout[data-side="right"] { flex-direction: row-reverse; }
.hb-kb7-pill { display: flex; align-items: center; gap: 9px; padding: 8px 12px 8px 9px; border: 1px solid rgba(255, 255, 255, .16); border-radius: 12px; background: rgba(18, 18, 20, .82); box-shadow: 0 14px 30px -12px rgba(0, 0, 0, .7), inset 0 1px 0 rgba(255, 255, 255, .08); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); white-space: nowrap; transition: transform .2s ease, border-color .2s ease; }
.hb-kb7-pill:hover { transform: translate3d(0, -2px, 0); border-color: color-mix(in srgb, var(--hb-kb7-accent) 60%, transparent); }
.hb-kb7-pill > i { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 7px; background: color-mix(in srgb, var(--hb-kb7-accent) 22%, #1a1a1a); color: var(--hb-kb7-accent); }
.hb-kb7-pill b { display: block; font-size: 12px; font-weight: 600; }
.hb-kb7-pill small { display: block; color: #8f8f8f; font-size: 10.5px; }
.hb-kb7-wire { width: clamp(16px, 3cqi, 36px); height: 1px; background: repeating-linear-gradient(90deg, rgba(255, 255, 255, .6) 0 3px, transparent 3px 6px); }
.hb-kb7-wire::after { content: ""; float: right; width: 7px; height: 7px; margin-top: -3px; border: 2px solid #fff; border-radius: 50%; background: var(--hb-kb7-accent); }
.hb-kb7-callout[data-side="right"] .hb-kb7-wire::after { float: left; }
.hb-kb7-halo { position: absolute; inset: 20% 10%; border-radius: 50%; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kb7-accent) 30%, transparent), transparent); filter: blur(30px); animation: hb-kb7-glow 6s ease-in-out infinite; pointer-events: none; }
@container (max-width: 900px) {
  .hb-kb7-in { grid-template-columns: minmax(0, 1fr); }
  .hb-kb7-copy { max-width: 620px; }
}
@container (max-width: 600px) {
  .hb-kb7-callouts { position: static; display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
  .hb-kb7-callout { position: static; animation-name: hb-kb7-pop; animation-iteration-count: 1; }
  .hb-kb7-wire { display: none; }
  .hb-kb7-pill { white-space: normal; }
  .hb-kb7-stage { padding: 18px; border-radius: 20px; }
  .hb-kb7-hero { grid-template-columns: 1fr; }
  .hb-kb7-shot { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kb7 *, .hb-kb7 *::before, .hb-kb7 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultCallouts: ShowcaseBrowserCallout[] = [
  { label: "Preview on every PR", detail: "Shareable link in 40s" },
  { label: "Edge cached", detail: "38 ms from Tokyo" },
  { label: "Lighthouse 100", detail: "Performance, a11y, SEO" },
  { label: "Auto dark mode", detail: "Follows the system" },
];

const calloutPos: { top: string; left?: string; right?: string; side: "left" | "right" }[] = [
  { top: "12%", left: "1%", side: "left" },
  { top: "30%", right: "1%", side: "right" },
  { top: "70%", left: "1%", side: "left" },
  { top: "82%", right: "1%", side: "right" },
];

const calloutIcons = [
  "M2.5 8s2-4 5.5-4 5.5 4 5.5 4-2 4-5.5 4-5.5-4-5.5-4zM8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  "M9 1.5L3.5 9H8l-1 5.5L12.5 7H8z",
  "M8 2l1.8 3.7 4 .6-2.9 2.8.7 4L8 11.2 4.4 13.1l.7-4L2.2 6.3l4-.6z",
  "M13 9.5A5.5 5.5 0 016.5 3a5.5 5.5 0 106.5 6.5z",
];

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity=".15" />
    <path d="M5 8.2l2 2 4-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ShowcaseBrowser({
  eyebrow = "Lumen 3.0 is live",
  title = "See your site the way customers do",
  subtitle = "Every push becomes a live, shareable preview with performance, accessibility and dark mode checked before anyone hits merge.",
  points = ["Instant previews for every branch", "Comments pinned to any element", "Rollbacks in a single click"],
  primaryCta = { label: "Start for free", href: "#" },
  secondaryCta = { label: "Book a demo", href: "#" },
  url = "lumen.app/launch",
  callouts = defaultCallouts,
  accent = "#ff6b4a",
  className,
  style,
  ...rest
}: ShowcaseBrowserProps) {
  return (
    <section
      className={["hb-kb7", className].filter(Boolean).join(" ")}
      style={{ "--hb-kb7-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-showcase-browser" precedence="default">{css}</style>
      <div className="hb-kb7-in">
        <div className="hb-kb7-copy">
          {eyebrow ? (
            <p className="hb-kb7-eyebrow">
              <i aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h2 className="hb-kb7-title">{title}</h2>
          {subtitle ? <p className="hb-kb7-sub">{subtitle}</p> : null}
          {points.length ? (
            <ul className="hb-kb7-points">
              {points.map((p) => (
                <li key={p}>
                  <Check />
                  {p}
                </li>
              ))}
            </ul>
          ) : null}
          {primaryCta || secondaryCta ? (
            <div className="hb-kb7-ctas">
              {primaryCta ? (
                <a className="hb-kb7-btn" data-primary="true" href={primaryCta.href}>
                  {primaryCta.label}
                </a>
              ) : null}
              {secondaryCta ? (
                <a className="hb-kb7-btn" href={secondaryCta.href}>
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="hb-kb7-stage">
          <span className="hb-kb7-halo" aria-hidden="true" />
          <div className="hb-kb7-frame" role="img" aria-label={`Browser preview of ${url}`}>
            <div className="hb-kb7-chrome">
              <span className="hb-kb7-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="hb-kb7-url">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="3" y="7" width="10" height="7.5" rx="2" fill="currentColor" />
                  <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <span>{url}</span>
              </span>
              <span className="hb-kb7-tools" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M13 8a5 5 0 11-1.5-3.6M13 2.5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="hb-kb7-view" aria-hidden="true">
              <div className="hb-kb7-page">
                <div className="hb-kb7-nav">
                  <b>
                    <i />
                    Lumen
                  </b>
                  <span>Product</span>
                  <span>Docs</span>
                  <span>Pricing</span>
                  <em>Sign up</em>
                </div>
                <div className="hb-kb7-hero">
                  <div>
                    <h4>Launch pages that load before you blink</h4>
                    <p>Design, preview and publish from one place. Loved by 9,400 product teams.</p>
                    <div className="hb-kb7-hbtn">
                      <span>Get started</span>
                      <span>Live demo</span>
                    </div>
                  </div>
                  <div className="hb-kb7-shot">
                    <b>24,812 visits</b>
                    <small>+32% this week</small>
                    <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                      <path d="M0 34 C12 30 18 32 28 24 S46 22 54 16 S72 18 80 10 S94 6 100 4 V40 H0 Z" fill={accent} fillOpacity=".22" />
                      <path d="M0 34 C12 30 18 32 28 24 S46 22 54 16 S72 18 80 10 S94 6 100 4" fill="none" stroke={accent} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    </svg>
                  </div>
                </div>
                <div className="hb-kb7-logos">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="hb-kb7-feats">
                  {["Visual editor", "Branch previews", "Global edge"].map((f) => (
                    <div key={f} className="hb-kb7-feat">
                      <i />
                      <b>{f}</b>
                      <span />
                      <span />
                    </div>
                  ))}
                </div>
                <div className="hb-kb7-price">
                  {[
                    { n: "Hobby", p: "$0" },
                    { n: "Pro", p: "$24" },
                    { n: "Team", p: "$79" },
                  ].map((pl, i) => (
                    <div key={pl.n} className="hb-kb7-plan" data-hl={i === 1 ? "true" : undefined}>
                      {pl.n}
                      <b>{pl.p}</b>
                      <span />
                      <span />
                      <span style={{ width: "60%" }} />
                      <em>Choose</em>
                    </div>
                  ))}
                </div>
                <div className="hb-kb7-foot">
                  {[0, 1, 2, 3].map((c) => (
                    <div key={c}>
                      <span style={{ width: "50%" }} />
                      <span />
                      <span style={{ width: "70%" }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hb-kb7-callouts">
            {callouts.slice(0, 4).map((c, j) => {
              const pos = calloutPos[j];
              return (
                <div
                  key={c.label}
                  className="hb-kb7-callout"
                  data-side={pos.side}
                  style={{ top: pos.top, left: pos.left, right: pos.right, "--hb-kb7-j": j } as React.CSSProperties}
                >
                  <div className="hb-kb7-pill">
                    <i aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 16 16">
                        <path d={calloutIcons[j]} fill="currentColor" />
                      </svg>
                    </i>
                    <div>
                      <b>{c.label}</b>
                      {c.detail ? <small>{c.detail}</small> : null}
                    </div>
                  </div>
                  <span className="hb-kb7-wire" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
