"use client";

import * as React from "react";

export interface BentoSpotlightItem {
  title: string;
  description: string;
  href: string;
}

export interface BentoSpotlightProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: BentoSpotlightItem[];
  onItemSelect?: (item: BentoSpotlightItem, index: number) => void;
  accent?: string;
}

const css = `
@keyframes hb-kb6-rise { from { opacity: 0; transform: translate3d(0, 18px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-kb6-scan { 0%, 100% { transform: translateY(-9px); opacity: 0; } 15%, 85% { opacity: 1; } 50% { transform: translateY(9px); } }
@keyframes hb-kb6-flick { 0%, 100% { opacity: 1; } 45% { opacity: 1; } 50% { opacity: .35; } 55% { opacity: 1; } 70% { opacity: .6; } 74% { opacity: 1; } }
@keyframes hb-kb6-spinx { 0% { transform: scaleX(1); } 50% { transform: scaleX(.12); } 100% { transform: scaleX(1); } }
@keyframes hb-kb6-bar { 0%, 100% { transform: scaleY(var(--a)); } 50% { transform: scaleY(var(--b)); } }
@keyframes hb-kb6-ring { 0%, 60%, 100% { transform: rotate(0); } 10% { transform: rotate(14deg); } 20% { transform: rotate(-12deg); } 30% { transform: rotate(8deg); } 40% { transform: rotate(-5deg); } 50% { transform: rotate(2deg); } }
@keyframes hb-kb6-spin { to { transform: rotate(360deg); } }
@keyframes hb-kb6-sweep { 0%, 100% { transform: translate(-6px, -4px); } 50% { transform: translate(6px, 4px); } }
@keyframes hb-kb6-dash { to { stroke-dashoffset: -24; } }
.hb-kb6 {
  --hb-kb6-accent: #2f7bff;
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
.hb-kb6 *, .hb-kb6 *::before, .hb-kb6 *::after { box-sizing: border-box; }
.hb-kb6::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(50% 35% at 50% 0%, color-mix(in srgb, var(--hb-kb6-accent) 16%, transparent), transparent 75%);
}
.hb-kb6-in { position: relative; max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-kb6-head { max-width: 620px; margin: 0 auto clamp(28px, 4cqi, 48px); text-align: center; animation: hb-kb6-rise .7s cubic-bezier(.2, .8, .2, 1) backwards; }
.hb-kb6-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 16px; padding: 5px 12px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 999px; background: rgba(255, 255, 255, .03); color: #a1a1a1; font-size: 12.5px; }
.hb-kb6-eyebrow b { color: var(--hb-kb6-accent); font-weight: 600; }
.hb-kb6-title { margin: 0; font-size: clamp(30px, 4.4cqi, 48px); font-weight: 600; line-height: 1.05; letter-spacing: -.035em; text-wrap: balance; }
.hb-kb6-sub { margin: 14px auto 0; max-width: 520px; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; text-wrap: pretty; }
.hb-kb6-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.hb-kb6-cell {
  --x: 50%;
  --y: 0%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 210px;
  overflow: hidden;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 18px;
  background: linear-gradient(180deg, #131313, #0d0d0d);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  color: inherit;
  text-decoration: none;
  outline: none;
  animation: hb-kb6-rise .7s cubic-bezier(.2, .8, .2, 1) backwards;
  animation-delay: calc(var(--hb-kb6-i, 0) * 60ms + 120ms);
  transition: opacity .35s ease, filter .35s ease, transform .35s cubic-bezier(.2, .8, .2, 1), border-color .3s ease, box-shadow .3s ease;
}
.hb-kb6-cell::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(260px circle at var(--x) var(--y), color-mix(in srgb, var(--hb-kb6-accent) 18%, transparent), transparent 70%);
  transition: opacity .3s ease;
}
.hb-kb6-cell > * { position: relative; }
.hb-kb6-grid:has(.hb-kb6-cell:hover) .hb-kb6-cell:not(:hover),
.hb-kb6-grid:has(.hb-kb6-cell:focus-visible) .hb-kb6-cell:not(:focus-visible) {
  opacity: .42;
  filter: blur(1.5px) saturate(.5);
  transform: scale(.985);
}
.hb-kb6-cell:hover, .hb-kb6-cell:focus-visible {
  border-color: color-mix(in srgb, var(--hb-kb6-accent) 45%, rgba(255, 255, 255, .1));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 24px 60px -30px color-mix(in srgb, var(--hb-kb6-accent) 60%, transparent);
  transform: translate3d(0, -3px, 0);
}
.hb-kb6-cell:hover::before, .hb-kb6-cell:focus-visible::before { opacity: 1; }
.hb-kb6-cell:focus-visible { box-shadow: 0 0 0 2px var(--hb-kb6-accent); }
.hb-kb6-top { display: flex; align-items: flex-start; justify-content: space-between; }
.hb-kb6-icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 15px;
  background: linear-gradient(145deg, #1b1b1b, #101010);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .07), 0 8px 20px -10px rgba(0, 0, 0, .8);
  color: #d4d4d4;
  transition: color .3s ease, border-color .3s ease;
}
.hb-kb6-cell:hover .hb-kb6-icon, .hb-kb6-cell:focus-visible .hb-kb6-icon { color: var(--hb-kb6-accent); border-color: color-mix(in srgb, var(--hb-kb6-accent) 40%, transparent); }
.hb-kb6-icon svg { overflow: visible; }
.hb-kb6-icon svg * { transform-box: fill-box; }
.hb-kb6-go { color: #5f5f5f; opacity: 0; transform: translate3d(-4px, 4px, 0); transition: opacity .25s ease, transform .25s ease, color .25s ease; }
.hb-kb6-cell:hover .hb-kb6-go, .hb-kb6-cell:focus-visible .hb-kb6-go { opacity: 1; color: #ededed; transform: none; }
.hb-kb6-text { margin-top: auto; padding-top: 22px; }
.hb-kb6-text h3 { margin: 0; font-size: 15.5px; font-weight: 600; letter-spacing: -.01em; }
.hb-kb6-text p { margin: 6px 0 0; color: #8f8f8f; font-size: 13.5px; line-height: 1.55; }
.hb-kb6-scan { animation: hb-kb6-scan 2.8s ease-in-out infinite; transform-origin: center; }
.hb-kb6-flick { animation: hb-kb6-flick 3.2s linear infinite; }
.hb-kb6-cell:hover .hb-kb6-flick { filter: drop-shadow(0 0 6px currentColor); }
.hb-kb6-mer { transform-origin: center; animation: hb-kb6-spinx 4s ease-in-out infinite; }
.hb-kb6-mer + .hb-kb6-mer { animation-delay: -2s; }
.hb-kb6-shackle { transform-origin: center bottom; transition: transform .35s cubic-bezier(.34, 1.56, .64, 1); }
.hb-kb6-cell:hover .hb-kb6-shackle, .hb-kb6-cell:focus-visible .hb-kb6-shackle { transform: translateY(-4px) rotate(-14deg); transform-origin: 30% 100%; }
.hb-kb6-bar { transform-origin: bottom; animation: hb-kb6-bar 2.2s ease-in-out infinite; animation-delay: calc(var(--j) * -.4s); }
.hb-kb6-cell:hover .hb-kb6-bar { animation-duration: 1s; }
.hb-kb6-bell { transform-origin: 50% 10%; animation: hb-kb6-ring 3s ease-in-out infinite; }
.hb-kb6-gear { transform-origin: center; animation: hb-kb6-spin 9s linear infinite; }
.hb-kb6-cell:hover .hb-kb6-gear { animation-duration: 2.5s; }
.hb-kb6-layer { transition: transform .4s cubic-bezier(.34, 1.56, .64, 1); }
.hb-kb6-cell:hover .hb-kb6-layer[data-l="0"], .hb-kb6-cell:focus-visible .hb-kb6-layer[data-l="0"] { transform: translateY(-5px); }
.hb-kb6-cell:hover .hb-kb6-layer[data-l="2"], .hb-kb6-cell:focus-visible .hb-kb6-layer[data-l="2"] { transform: translateY(5px); }
.hb-kb6-lens { animation: hb-kb6-sweep 3s ease-in-out infinite; }
.hb-kb6-dashed { stroke-dasharray: 4 4; animation: hb-kb6-dash 1.6s linear infinite; }
@container (max-width: 760px) {
  .hb-kb6-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-kb6-cell:last-child:nth-child(odd) { grid-column: 1 / -1; }
}
@container (max-width: 480px) {
  .hb-kb6-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-kb6-cell { min-height: 180px; }
}
@media (hover: none) {
  .hb-kb6-grid:has(.hb-kb6-cell:hover) .hb-kb6-cell:not(:hover) { opacity: 1; filter: none; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kb6 *, .hb-kb6 *::before, .hb-kb6 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultItems: BentoSpotlightItem[] = [
  { title: "Zero-trust access", description: "Every request is verified, scoped and logged, from the office or a café.", href: "#" },
  { title: "Sub-50 ms responses", description: "Hot paths run close to users, so pages feel instant on any connection.", href: "#" },
  { title: "Edge in 38 regions", description: "Deploy once and serve from the nearest city with automatic failover.", href: "#" },
  { title: "Passkeys and SSO", description: "SAML, OIDC and passkeys out of the box, with SCIM provisioning.", href: "#" },
  { title: "Analytics built in", description: "Funnels, retention and revenue without a single extra script tag.", href: "#" },
  { title: "Alerts that matter", description: "Smart thresholds learn your traffic and only page you for real issues.", href: "#" },
  { title: "Workflows on autopilot", description: "Chain triggers, approvals and webhooks with a visual builder.", href: "#" },
  { title: "Every version kept", description: "Point-in-time restore for content, config and data, for 90 days.", href: "#" },
  { title: "Search in milliseconds", description: "Typo-tolerant full-text search across every record you store.", href: "#" },
];

const sw = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Icon({ index }: { index: number }) {
  switch (index % 9) {
    case 0:
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <path d="M14 3l9 3.5v7c0 5.6-3.8 9.6-9 11.5-5.2-1.9-9-5.9-9-11.5v-7z" {...sw} />
          <path className="hb-kb6-scan" d="M8 14h12" {...sw} strokeWidth={2} />
        </svg>
      );
    case 1:
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <path className="hb-kb6-flick" d="M15.5 3L6 16h7l-1.5 9L21 12h-7z" {...sw} />
        </svg>
      );
    case 2:
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <circle cx="14" cy="14" r="10" {...sw} />
          <path d="M4 14h20M6 8.5h16M6 19.5h16" {...sw} strokeWidth={1.2} opacity=".6" />
          <ellipse className="hb-kb6-mer" cx="14" cy="14" rx="5" ry="10" {...sw} />
          <ellipse className="hb-kb6-mer" cx="14" cy="14" rx="5" ry="10" {...sw} opacity=".5" />
        </svg>
      );
    case 3:
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <path className="hb-kb6-shackle" d="M9 12V9a5 5 0 0110 0v3" {...sw} />
          <rect x="5.5" y="12" width="17" height="12" rx="3" {...sw} />
          <path d="M14 16.5v3" {...sw} />
        </svg>
      );
    case 4:
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <path d="M4 24h20" {...sw} />
          {[
            { x: 6, h: 9, a: 0.6, b: 1 },
            { x: 11.5, h: 14, a: 1, b: 0.55 },
            { x: 17, h: 11, a: 0.7, b: 1 },
            { x: 22.5, h: 17, a: 1, b: 0.7 },
          ].map((b, j) => (
            <path
              key={j}
              className="hb-kb6-bar"
              d={`M${b.x} 21V${21 - b.h}`}
              {...sw}
              strokeWidth={3}
              style={{ "--a": b.a, "--b": b.b, "--j": j } as React.CSSProperties}
            />
          ))}
        </svg>
      );
    case 5:
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <g className="hb-kb6-bell">
            <path d="M8 19V13a6 6 0 0112 0v6l2 2H6z" {...sw} />
            <path d="M14 3.5V7" {...sw} />
          </g>
          <path d="M11.5 24a2.5 2.5 0 005 0" {...sw} />
        </svg>
      );
    case 6:
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <g className="hb-kb6-gear">
            <circle cx="14" cy="14" r="3.5" {...sw} />
            <path
              d="M14 3.5l1.6 2.6 3-.8.6 3 2.9 1-1.2 2.8 2 2.3-2.6 1.6.3 3.1-3.1.2-1.3 2.8-2.2-2-2.2 2-1.3-2.8-3.1-.2.3-3.1L4 14.1l2-2.3-1.2-2.8 2.9-1 .6-3 3 .8z"
              {...sw}
              strokeWidth={1.5}
            />
          </g>
        </svg>
      );
    case 7:
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <path className="hb-kb6-layer" data-l="0" d="M14 4l10 5-10 5-10-5z" {...sw} />
          <path className="hb-kb6-layer" data-l="1" d="M4 14l10 5 10-5" {...sw} />
          <path className="hb-kb6-layer" data-l="2" d="M4 19l10 5 10-5" {...sw} />
        </svg>
      );
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <path className="hb-kb6-dashed" d="M4 7h20M4 12h14M4 17h18M4 22h10" {...sw} strokeWidth={1.3} opacity=".55" />
          <g className="hb-kb6-lens">
            <circle cx="15" cy="13" r="5.5" {...sw} fill="#111" />
            <path d="M19 17l4.5 4.5" {...sw} strokeWidth={2.2} />
          </g>
        </svg>
      );
  }
}

export function BentoSpotlight({
  eyebrow = "Platform",
  title = "Nine reasons teams switch in a week",
  subtitle = "Security, speed and the boring-but-vital parts handled for you. Hover any tile to take a closer look.",
  items = defaultItems,
  onItemSelect,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: BentoSpotlightProps) {
  const move = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${(e.clientX - r.left).toFixed(0)}px`);
    el.style.setProperty("--y", `${(e.clientY - r.top).toFixed(0)}px`);
  };

  return (
    <section
      className={["hb-kb6", className].filter(Boolean).join(" ")}
      style={{ "--hb-kb6-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-bento-spotlight" precedence="default">{css}</style>
      <div className="hb-kb6-in">
        <header className="hb-kb6-head">
          {eyebrow ? (
            <p className="hb-kb6-eyebrow">
              <b>New</b>
              {eyebrow}
            </p>
          ) : null}
          <h2 className="hb-kb6-title">{title}</h2>
          {subtitle ? <p className="hb-kb6-sub">{subtitle}</p> : null}
        </header>
        <div className="hb-kb6-grid">
          {items.map((item, i) => (
            <a
              key={item.title}
              className="hb-kb6-cell"
              href={item.href}
              onPointerMove={move}
              onClick={onItemSelect ? () => onItemSelect(item, i) : undefined}
              style={{ "--hb-kb6-i": i } as React.CSSProperties}
            >
              <div className="hb-kb6-top">
                <span className="hb-kb6-icon">
                  <Icon index={i} />
                </span>
                <svg className="hb-kb6-go" width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="hb-kb6-text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
