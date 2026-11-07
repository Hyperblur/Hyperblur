"use client";

import * as React from "react";

export interface LocalService {
  name: string;
  duration: string;
  price: string;
  detail?: string;
  popular?: boolean;
}

export interface LocalServiceGroup {
  title: string;
  caption?: string;
  services: LocalService[];
}

export interface LocalServicePackage {
  label: string;
  title: string;
  description: string;
  price: string;
  was?: string;
  includes: string[];
  cta: { label: string; href: string };
}

export interface LocalServicesPriceListProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  groups?: LocalServiceGroup[];
  packageOffer?: LocalServicePackage | null;
  popularLabel?: string;
  accent?: string;
}

const defaultGroups: LocalServiceGroup[] = [
  {
    title: "Personal training",
    caption: "One coach, one plan, built around you",
    services: [
      { name: "Intro session and assessment", duration: "60 min", price: "$45", detail: "Movement screen and goal setting" },
      { name: "1:1 coaching", duration: "55 min", price: "$95", popular: true },
      { name: "Partner training", duration: "55 min", price: "$130", detail: "Price for two people" },
      { name: "Online check-in", duration: "20 min", price: "$35" },
    ],
  },
  {
    title: "Classes",
    caption: "Capped at 14 so coaches see everyone",
    services: [
      { name: "Strength foundations", duration: "50 min", price: "$28" },
      { name: "Engine conditioning", duration: "45 min", price: "$28", popular: true },
      { name: "Kettlebell flow", duration: "45 min", price: "$26" },
      { name: "10-class pass", duration: "Valid 90 days", price: "$230" },
    ],
  },
  {
    title: "Recovery",
    caption: "Book after any session or on its own",
    services: [
      { name: "Sports massage", duration: "50 min", price: "$110" },
      { name: "Cold plunge and sauna", duration: "40 min", price: "$30", popular: true },
      { name: "Mobility lab", duration: "30 min", price: "$22" },
      { name: "InBody scan", duration: "15 min", price: "$25" },
    ],
  },
];

const defaultPackage: LocalServicePackage = {
  label: "New member starter",
  title: "Your first month, sorted.",
  description: "Three private sessions to learn the lifts, unlimited classes for 30 days and a body scan at the start and the end.",
  price: "$199",
  was: "$342",
  includes: ["3 x 1:1 coaching", "Unlimited classes", "2 InBody scans", "Free towel service"],
  cta: { label: "Claim the starter", href: "#join" },
};

const css = `
.hb-kl5 {
  --hb-kl5-accent: #c6f432;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  background: #0b0c0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kl5 *, .hb-kl5 *::before, .hb-kl5 *::after { box-sizing: border-box; }
.hb-kl5::before { content: ""; position: absolute; inset: 0; background: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(ellipse at 50% 0%, #000 20%, transparent 70%); pointer-events: none; }
.hb-kl5-wrap { position: relative; max-width: 1120px; margin: 0 auto; padding: 88px 24px 100px; }
.hb-kl5-head { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, .8fr); gap: 32px; align-items: end; margin-bottom: 44px; }
.hb-kl5-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 16px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: var(--hb-kl5-accent); letter-spacing: .16em; text-transform: uppercase; }
.hb-kl5-eyebrow::before { content: ""; width: 8px; height: 8px; background: var(--hb-kl5-accent); transform: skewX(-12deg); }
.hb-kl5-title { margin: 0; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-weight: 700; font-size: clamp(36px, 5.4cqw, 64px); line-height: .95; letter-spacing: -.045em; text-transform: uppercase; }
.hb-kl5-title span { color: var(--hb-kl5-accent); }
.hb-kl5-sub { margin: 0; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-kl5-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.hb-kl5-col { min-width: 0; padding: 24px; border-radius: 20px; background: linear-gradient(180deg, #141512, #0f100e); border: 1px solid rgba(255,255,255,.08); box-shadow: inset 0 1px 0 rgba(255,255,255,.05); }
.hb-kl5-coltitle { margin: 0; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 20px; font-weight: 600; letter-spacing: -.02em; }
.hb-kl5-colcap { margin: 4px 0 14px; color: #7d7f78; font-size: 13.5px; }
.hb-kl5-list { margin: 0; padding: 0; list-style: none; }
.hb-kl5-row { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 12px; padding: 14px 12px; margin: 0 -12px; border-radius: 12px; border-top: 1px solid rgba(255,255,255,.06); transition: background .25s; animation: hb-kl5-in .6s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-kl5-i) * 60ms); }
@keyframes hb-kl5-in { from { opacity: 0; transform: translateX(-8px); } }
.hb-kl5-row:first-child { border-top-color: transparent; }
.hb-kl5-row:hover { background: rgba(255,255,255,.035); }
.hb-kl5-row[data-popular] { background: color-mix(in srgb, var(--hb-kl5-accent) 7%, transparent); border-top-color: transparent; }
.hb-kl5-row[data-popular] + .hb-kl5-row { border-top-color: transparent; }
.hb-kl5-name { min-width: 0; font-size: 15px; font-weight: 500; color: #ededed; }
.hb-kl5-pop { display: inline-flex; align-items: center; gap: 4px; margin-left: 8px; padding: 2px 7px; border-radius: 6px; background: var(--hb-kl5-accent); color: #0b0c0a; font-size: 10.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; vertical-align: 2px; position: relative; overflow: hidden; }
.hb-kl5-pop::after { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,.7) 50%, transparent 70%); transform: translateX(-120%); animation: hb-kl5-shine 3.2s ease-in-out infinite; }
@keyframes hb-kl5-shine { 60%, 100% { transform: translateX(120%); } }
.hb-kl5-price { font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums; color: #fff; text-align: right; }
.hb-kl5-meta { grid-column: 1 / -1; display: flex; align-items: center; gap: 8px; color: #7d7f78; font-size: 12.5px; }
.hb-kl5-meta svg { flex: none; color: color-mix(in srgb, var(--hb-kl5-accent) 70%, #777); }
.hb-kl5-pack { position: relative; margin-top: 16px; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) auto; gap: 28px; align-items: center; padding: 28px 30px; border-radius: 22px; background: var(--hb-kl5-accent); color: #0b0c0a; overflow: hidden; }
.hb-kl5-pack::before { content: ""; position: absolute; right: -60px; top: -60px; width: 240px; height: 240px; border-radius: 50%; border: 40px solid rgba(0,0,0,.06); }
.hb-kl5-packlabel { display: inline-block; margin-bottom: 10px; padding: 4px 10px; border-radius: 999px; background: #0b0c0a; color: var(--hb-kl5-accent); font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; }
.hb-kl5-packtitle { margin: 0; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: clamp(22px, 2.6cqw, 30px); font-weight: 700; letter-spacing: -.03em; line-height: 1.05; }
.hb-kl5-packdesc { margin: 8px 0 0; font-size: 14.5px; line-height: 1.5; color: rgba(11,12,10,.72); }
.hb-kl5-inc { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 14px; font-size: 13.5px; font-weight: 500; }
.hb-kl5-inc li { display: flex; align-items: center; gap: 6px; }
.hb-kl5-buy { position: relative; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.hb-kl5-amount { font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 40px; font-weight: 700; letter-spacing: -.04em; line-height: 1; }
.hb-kl5-amount s { margin-right: 8px; font-size: 16px; font-weight: 500; opacity: .5; }
.hb-kl5-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 20px; border-radius: 999px; background: #0b0c0a; color: #fff; font-size: 14.5px; font-weight: 600; text-decoration: none; white-space: nowrap; transition: transform .2s, box-shadow .2s; }
.hb-kl5-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 22px -12px rgba(0,0,0,.8); }
.hb-kl5-btn:focus-visible { outline: 2px solid #0b0c0a; outline-offset: 3px; }
@container (max-width: 900px) {
  .hb-kl5-cols { grid-template-columns: minmax(0, 1fr); }
  .hb-kl5-head { grid-template-columns: minmax(0, 1fr); }
  .hb-kl5-pack { grid-template-columns: minmax(0, 1fr); gap: 20px; }
  .hb-kl5-buy { align-items: flex-start; }
  .hb-kl5-wrap { padding: 64px 20px 72px; }
}
@container (max-width: 400px) {
  .hb-kl5-inc { grid-template-columns: minmax(0, 1fr); }
  .hb-kl5-pack { padding: 22px; }
  .hb-kl5-col { padding: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kl5 *, .hb-kl5 *::before, .hb-kl5 *::after { animation: none !important; transition: none !important; }
}
`;

export function LocalServicesPriceList({
  eyebrow = "Ironbark Strength · Pricing",
  title = "Train hard. Pay fair.",
  subtitle = "No sign-up fees and no twelve-month contracts. Pay per session, grab a pass, or start with the new member package below.",
  groups = defaultGroups,
  packageOffer = defaultPackage,
  popularLabel = "Popular",
  accent = "#c6f432",
  className,
  style,
  ...rest
}: LocalServicesPriceListProps) {
  const words = title.split(" ");
  const tail = words.splice(-2).join(" ");
  let counter = 0;
  return (
    <section
      className={["hb-kl5", className].filter(Boolean).join(" ")}
      style={{ "--hb-kl5-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-local-services-price-list" precedence="default">{css}</style>
      <div className="hb-kl5-wrap">
        <div className="hb-kl5-head">
          <div>
            <p className="hb-kl5-eyebrow">{eyebrow}</p>
            <h2 className="hb-kl5-title">{words.join(" ")} <span>{tail}</span></h2>
          </div>
          <p className="hb-kl5-sub">{subtitle}</p>
        </div>
        <div className="hb-kl5-cols">
          {groups.map((g) => (
            <div key={g.title} className="hb-kl5-col">
              <h3 className="hb-kl5-coltitle">{g.title}</h3>
              {g.caption ? <p className="hb-kl5-colcap">{g.caption}</p> : null}
              <ul className="hb-kl5-list">
                {g.services.map((s) => {
                  const i = counter++;
                  return (
                    <li key={s.name} className="hb-kl5-row" data-popular={s.popular ? "" : undefined} style={{ "--hb-kl5-i": i } as React.CSSProperties}>
                      <span className="hb-kl5-name">
                        {s.name}
                        {s.popular ? <span className="hb-kl5-pop">{popularLabel}</span> : null}
                      </span>
                      <span className="hb-kl5-price">{s.price}</span>
                      <span className="hb-kl5-meta">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        {s.duration}{s.detail ? ` · ${s.detail}` : ""}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        {packageOffer ? (
          <div className="hb-kl5-pack">
            <div>
              <span className="hb-kl5-packlabel">{packageOffer.label}</span>
              <h3 className="hb-kl5-packtitle">{packageOffer.title}</h3>
              <p className="hb-kl5-packdesc">{packageOffer.description}</p>
            </div>
            <ul className="hb-kl5-inc">
              {packageOffer.includes.map((inc) => (
                <li key={inc}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {inc}
                </li>
              ))}
            </ul>
            <div className="hb-kl5-buy">
              <span className="hb-kl5-amount">{packageOffer.was ? <s>{packageOffer.was}</s> : null}{packageOffer.price}</span>
              <a className="hb-kl5-btn" href={packageOffer.cta.href}>
                {packageOffer.cta.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
