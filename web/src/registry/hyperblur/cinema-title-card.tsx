"use client";

import * as React from "react";

export interface CinemaTitleCardAction {
  label: string;
  href: string;
}

export interface CinemaTitleCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  presenter?: string;
  title?: string;
  tagline?: string;
  release?: string;
  billing?: string;
  aspect?: number;
  pushDuration?: number;
  primaryCta?: CinemaTitleCardAction | null;
  secondaryCta?: CinemaTitleCardAction | null;
  accent?: string;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vc1 {
  --hb-vc1-accent: #ffb35c;
  --hb-vc1-push: 16s;
  position: relative;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 580px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #050505;
  color: #f4efe6;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc1 *, .hb-vc1 *::before, .hb-vc1 *::after { box-sizing: border-box; }
.hb-vc1-scene {
  position: absolute;
  inset: 0;
  z-index: 0;
  transform-origin: 50% 62%;
  animation: hb-vc1-push var(--hb-vc1-push) cubic-bezier(.33, 0, .2, 1) infinite alternate;
}
.hb-vc1-scene svg { display: block; width: 100%; height: 100%; }
@keyframes hb-vc1-push {
  from { transform: scale(1); }
  to { transform: scale(1.14) translate3d(0, -1.2%, 0); }
}
.hb-vc1-car {
  animation: hb-vc1-car 9s cubic-bezier(.45, 0, .55, 1) infinite;
  transform-box: view-box;
}
@keyframes hb-vc1-car {
  0% { transform: translate(0, 0) scale(1); opacity: 0; }
  12% { opacity: 1; }
  100% { transform: translate(-6px, -38px) scale(.35); opacity: 0; }
}
.hb-vc1-vignette {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(120% 90% at 50% 55%, transparent 40%, rgba(0, 0, 0, .78) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, .25), transparent 30%, transparent 62%, rgba(0, 0, 0, .55));
}
.hb-vc1-bar {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 3;
  height: max(9%, calc(50% - 50cqi / var(--hb-vc1-ar, 2.39)));
  background: #000;
  animation: hb-vc1-bar 1.6s cubic-bezier(.7, 0, .2, 1) both;
}
.hb-vc1-bar[data-edge="top"] { top: 0; transform-origin: top; }
.hb-vc1-bar[data-edge="bottom"] { bottom: 0; transform-origin: bottom; }
@keyframes hb-vc1-bar {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
.hb-vc1-bar-row {
  position: absolute;
  left: clamp(16px, 4cqi, 48px);
  right: clamp(16px, 4cqi, 48px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: rgba(244, 239, 230, .44);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: .16em;
  text-transform: uppercase;
  white-space: nowrap;
}
.hb-vc1-bar[data-edge="top"] .hb-vc1-bar-row { bottom: 12px; }
.hb-vc1-bar[data-edge="bottom"] .hb-vc1-bar-row { top: 12px; }
.hb-vc1-rec { display: inline-flex; align-items: center; gap: 8px; }
.hb-vc1-rec::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-vc1-accent);
  box-shadow: 0 0 10px var(--hb-vc1-accent);
}
.hb-vc1-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 860px;
  padding: 120px clamp(20px, 5cqi, 64px);
  text-align: center;
}
.hb-vc1-presenter {
  margin: 0 0 18px;
  color: rgba(244, 239, 230, .7);
  font-size: clamp(10px, 1.25cqi, 12.5px);
  font-weight: 500;
  letter-spacing: .5em;
  text-transform: uppercase;
  animation: hb-vc1-fade 2.2s 1.1s ease both;
}
.hb-vc1-title {
  margin: 0;
  color: #fbf6ec;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(38px, 9.6cqi, 124px);
  font-weight: 600;
  line-height: .92;
  letter-spacing: .14em;
  text-transform: uppercase;
  text-shadow: 0 0 40px rgba(255, 196, 120, .18), 0 2px 0 rgba(0, 0, 0, .35);
  animation: hb-vc1-title 3.4s 1.4s cubic-bezier(.16, .8, .2, 1) both;
}
@keyframes hb-vc1-title {
  from { opacity: 0; letter-spacing: .42em; filter: blur(10px); }
  45% { opacity: 1; }
  to { opacity: 1; letter-spacing: .14em; filter: blur(0); }
}
.hb-vc1-rule {
  width: min(240px, 40%);
  height: 1px;
  margin: 26px 0 18px;
  background: linear-gradient(90deg, transparent, var(--hb-vc1-accent), transparent);
  animation: hb-vc1-rule 1.8s 2.8s cubic-bezier(.2, .8, .2, 1) both;
}
@keyframes hb-vc1-rule {
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
}
.hb-vc1-tagline {
  margin: 0;
  color: rgba(244, 239, 230, .78);
  font-size: clamp(14px, 1.9cqi, 19px);
  font-weight: 400;
  letter-spacing: .02em;
  animation: hb-vc1-fade 1.8s 3.1s ease both;
}
.hb-vc1-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
  animation: hb-vc1-fade 1.4s 3.5s ease both;
}
@keyframes hb-vc1-fade {
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vc1-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid rgba(244, 239, 230, .2);
  background: rgba(10, 10, 10, .4);
  color: #f4efe6;
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  letter-spacing: .01em;
  text-decoration: none;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  transition: background .3s ease, border-color .3s ease, transform .2s ease;
}
.hb-vc1-btn:hover { background: rgba(244, 239, 230, .1); border-color: rgba(244, 239, 230, .4); }
.hb-vc1-btn:active { transform: scale(.97); }
.hb-vc1-btn[data-primary] {
  border-color: transparent;
  background: #f4efe6;
  color: #0b0906;
  box-shadow: 0 10px 40px -10px color-mix(in srgb, var(--hb-vc1-accent) 70%, transparent);
}
.hb-vc1-btn[data-primary]:hover { background: #ffffff; }
.hb-vc1-btn:focus-visible { outline: 2px solid var(--hb-vc1-accent); outline-offset: 3px; }
.hb-vc1-play {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #0b0906;
  color: #f4efe6;
}
.hb-vc1-billing {
  display: block;
  max-width: 640px;
  margin: 0 auto;
  color: rgba(244, 239, 230, .38);
  font-size: 9px;
  line-height: 1.35;
  letter-spacing: .08em;
  text-align: center;
  text-transform: uppercase;
  white-space: normal;
  transform: scaleX(.82);
}
.hb-vc1-bill-row { top: auto !important; bottom: 14px; justify-content: center !important; }
@container (max-width: 560px) {
  .hb-vc1-billing { display: none; }
  .hb-vc1-copy { padding-top: 90px; padding-bottom: 90px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vc1-scene, .hb-vc1-car, .hb-vc1-bar, .hb-vc1-presenter, .hb-vc1-title, .hb-vc1-rule, .hb-vc1-tagline, .hb-vc1-actions { animation: none; }
  .hb-vc1-btn { transition: none; }
}
`;

function stars() {
  const out: { x: string; y: string; r: string; o: string }[] = [];
  for (let i = 0; i < 70; i++) {
    const h = (Math.imul(i + 11, 2654435761) >>> 0) % 100000;
    const h2 = (Math.imul(i + 97, 2246822519) >>> 0) % 100000;
    out.push({
      x: ((h / 100000) * 1600).toFixed(1),
      y: ((h2 / 100000) * 420).toFixed(1),
      r: (0.4 + ((h >>> 3) % 10) / 12).toFixed(2),
      o: (0.25 + ((h2 >>> 2) % 60) / 100).toFixed(2),
    });
  }
  return out;
}

const starField = stars();

export function CinemaTitleCard({
  presenter = "Halden Pictures presents",
  title = "The Long Quiet",
  tagline = "Some roads only run in one direction.",
  release = "In theaters March 14",
  billing = "Halden Pictures in association with North Ridge Films a Mira Okafor film The Long Quiet starring Jonah Vale Ines Carvalho Teo Lindqvist music by Arvo Ness edited by Dana Whitlock director of photography Sun-Hee Park produced by Lior Adler Maya Brandt written and directed by Mira Okafor",
  aspect = 2.39,
  pushDuration = 16,
  primaryCta = { label: "Watch the trailer", href: "#" },
  secondaryCta = { label: "Get tickets", href: "#" },
  accent = "#ffb35c",
  headingAs = "h1",
  className,
  style,
  ...rest
}: CinemaTitleCardProps) {
  const Heading = headingAs;
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const vars = {
    "--hb-vc1-accent": accent,
    "--hb-vc1-ar": String(aspect),
    "--hb-vc1-push": `${pushDuration}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <section className={["hb-vc1", className].filter(Boolean).join(" ")} style={vars} {...rest}>
      <style href="hb-cinema-title-card" precedence="default">{css}</style>
      <div className="hb-vc1-scene" aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`hb-vc1-sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#060a14" />
              <stop offset=".45" stopColor="#14213a" />
              <stop offset=".7" stopColor="#5a3a3a" />
              <stop offset=".82" stopColor="#d9884a" />
              <stop offset="1" stopColor="#2a1610" />
            </linearGradient>
            <radialGradient id={`hb-vc1-sun-${uid}`} cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#ffe1b0" />
              <stop offset=".35" stopColor="#ffb35c" stopOpacity=".85" />
              <stop offset="1" stopColor="#ff7a3c" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`hb-vc1-road-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a2a24" />
              <stop offset="1" stopColor="#0c0907" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill={`url(#hb-vc1-sky-${uid})`} />
          {starField.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} />
          ))}
          <circle cx="800" cy="640" r="260" fill={`url(#hb-vc1-sun-${uid})`} />
          <path d="M0 640 L180 590 L320 612 L470 560 L610 600 L760 575 L900 604 L1050 552 L1210 596 L1380 566 L1600 610 L1600 900 L0 900Z" fill="#2b1b1b" opacity=".9" />
          <path d="M0 668 L140 640 L300 660 L520 628 L700 652 L800 646 L940 650 L1140 626 L1320 656 L1600 640 L1600 900 L0 900Z" fill="#160e0d" />
          <path d="M0 900 L770 664 L830 664 L1600 900Z" fill={`url(#hb-vc1-road-${uid})`} />
          <path d="M799 668 L801 668 L812 900 L788 900Z" fill="#e8b46a" opacity=".55" />
          <g className="hb-vc1-car" style={{ transformOrigin: "800px 820px" }}>
            <circle cx="770" cy="820" r="5" fill="#fff4dc" />
            <circle cx="830" cy="820" r="5" fill="#fff4dc" />
            <ellipse cx="800" cy="820" rx="120" ry="16" fill="#ffd9a0" opacity=".16" />
          </g>
        </svg>
      </div>
      <div className="hb-vc1-vignette" aria-hidden="true" />
      <div className="hb-vc1-bar" data-edge="top">
        <div className="hb-vc1-bar-row" aria-hidden="true">
          <span className="hb-vc1-rec">Scope {aspect.toFixed(2)} : 1</span>
          <span>Reel 1 · 00:00:14:08</span>
        </div>
      </div>
      <div className="hb-vc1-bar" data-edge="bottom">
        <div className="hb-vc1-bar-row">
          <span>{release}</span>
          <span aria-hidden="true">Rated PG-13</span>
        </div>
        {billing ? (
          <div className="hb-vc1-bar-row hb-vc1-bill-row">
            <span className="hb-vc1-billing">{billing}</span>
          </div>
        ) : null}
      </div>
      <div className="hb-vc1-copy">
        {presenter ? <p className="hb-vc1-presenter">{presenter}</p> : null}
        <Heading className="hb-vc1-title">{title}</Heading>
        <div className="hb-vc1-rule" aria-hidden="true" />
        {tagline ? <p className="hb-vc1-tagline">{tagline}</p> : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-vc1-actions">
            {primaryCta ? (
              <a className="hb-vc1-btn" data-primary="" href={primaryCta.href}>
                <span className="hb-vc1-play" aria-hidden="true">
                  <svg width="8" height="9" viewBox="0 0 8 9"><path d="M0 0 L8 4.5 L0 9Z" fill="currentColor" /></svg>
                </span>
                {primaryCta.label}
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-vc1-btn" href={secondaryCta.href}>{secondaryCta.label}</a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
