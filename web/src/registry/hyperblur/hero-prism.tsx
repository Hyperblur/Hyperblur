"use client";

import * as React from "react";

export interface HeroPrismAction {
  label: string;
  href: string;
}

export interface HeroPrismProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroPrismAction | null;
  secondaryCta?: HeroPrismAction | null;
  showRuler?: boolean;
  interactive?: boolean;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb1 {
  --hb-vb1-tilt: 0deg;
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
  background: radial-gradient(120% 80% at 50% 0%, #0d0f14 0%, #060607 60%);
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vb1 *, .hb-vb1 *::before, .hb-vb1 *::after { box-sizing: border-box; }
.hb-vb1-scene {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-vb1-tiltg {
  transform-box: view-box;
  transform-origin: 662px 196px;
  transform: rotate(var(--hb-vb1-tilt));
  transition: transform 1.1s cubic-bezier(.16, 1, .3, 1);
}
.hb-vb1-fan {
  transform-box: view-box;
  transform-origin: 662px 196px;
  animation: hb-vb1-sway 9s cubic-bezier(.45, 0, .55, 1) infinite alternate;
}
@keyframes hb-vb1-sway {
  from { transform: rotate(-2.2deg); }
  to { transform: rotate(2.4deg); }
}
.hb-vb1-band {
  mix-blend-mode: screen;
  animation: hb-vb1-shimmer 5.5s ease-in-out infinite;
  animation-delay: calc(var(--hb-vb1-i) * -.7s);
}
@keyframes hb-vb1-shimmer {
  0%, 100% { opacity: .78; }
  50% { opacity: .46; }
}
.hb-vb1-photon {
  stroke-dasharray: 46 640;
  animation: hb-vb1-travel 3.2s cubic-bezier(.55, 0, .45, 1) infinite;
}
@keyframes hb-vb1-travel {
  from { stroke-dashoffset: 700; }
  to { stroke-dashoffset: 0; }
}
.hb-vb1-glint {
  animation: hb-vb1-glint 6s ease-in-out infinite;
}
@keyframes hb-vb1-glint {
  0%, 70%, 100% { opacity: .15; }
  80% { opacity: .9; }
}
.hb-vb1-veil {
  position: absolute;
  left: 50%;
  top: 46%;
  z-index: -1;
  width: min(760px, 92%);
  height: 340px;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, rgba(6, 6, 7, .82), rgba(6, 6, 7, 0));
  pointer-events: none;
}
.hb-vb1-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 980px;
  margin-top: auto;
  padding: 300px clamp(20px, 5cqi, 48px) 0;
  text-align: center;
}
.hb-vb1-in { animation: hb-vb1-up .9s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb1-d, 0ms); }
@keyframes hb-vb1-up {
  from { opacity: 0; transform: translate3d(0, 16px, 0); filter: blur(6px); }
  to { opacity: 1; transform: none; filter: none; }
}
.hb-vb1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: rgba(237, 237, 237, .7);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-vb1-chip {
  width: 34px;
  height: 6px;
  border-radius: 99px;
  background: linear-gradient(90deg, #ff3b3b, #ff9b2f, #ffe14d, #3ddc84, #2fb4ff, #4d5bff, #a24dff);
}
.hb-vb1-title {
  max-width: 900px;
  margin: 20px 0 0;
  color: #f5f5f5;
  font-size: clamp(38px, 7cqi, 74px);
  font-weight: 640;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
}
.hb-vb1-title span {
  background: linear-gradient(92deg, #ffffff 0%, #ffffff 42%, #ffd9a8 58%, #b9f0ff 76%, #d8c4ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-vb1-sub {
  max-width: 560px;
  margin: 20px 0 0;
  color: rgba(237, 237, 237, .6);
  font-size: clamp(15px, 1.9cqi, 17.5px);
  line-height: 1.55;
  text-wrap: pretty;
}
.hb-vb1-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 30px; }
.hb-vb1-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  color: #ededed;
  font: inherit;
  font-size: 15px;
  font-weight: 550;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .25s cubic-bezier(.2, .8, .2, 1), background .25s ease, border-color .25s ease;
}
.hb-vb1-btn:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .26); transform: translateY(-1px); }
.hb-vb1-btn:active { transform: scale(.98); }
.hb-vb1-btn:focus-visible { outline: 2px solid #b9f0ff; outline-offset: 3px; }
.hb-vb1-btn[data-primary] {
  border: 1px solid transparent;
  background:
    linear-gradient(#f5f5f5, #f5f5f5) padding-box,
    linear-gradient(90deg, #ff3b3b, #ffe14d, #3ddc84, #2fb4ff, #a24dff) border-box;
  color: #0a0a0a;
  box-shadow: 0 10px 40px -12px rgba(162, 77, 255, .7), 0 6px 30px -14px rgba(47, 180, 255, .8);
}
.hb-vb1-btn[data-primary]:hover { background: linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, #ff3b3b, #ffe14d, #3ddc84, #2fb4ff, #a24dff) border-box; }
.hb-vb1-btn svg { transition: transform .25s ease; }
.hb-vb1-btn:hover svg { transform: translateX(2px); }
.hb-vb1-ruler {
  width: 100%;
  max-width: 980px;
  margin-top: auto;
  padding: 44px clamp(20px, 5cqi, 48px) 26px;
}
.hb-vb1-bar {
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, #7a2dff, #4d5bff, #2fb4ff, #3ddc84, #ffe14d, #ff9b2f, #ff3b3b);
  opacity: .8;
}
.hb-vb1-ticks { display: flex; justify-content: space-between; margin-top: 8px; }
.hb-vb1-tick {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: rgba(237, 237, 237, .38);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
}
.hb-vb1-tick::before { content: ""; width: 1px; height: var(--hb-vb1-h, 6px); background: rgba(237, 237, 237, .3); }
.hb-vb1-tick[data-major]::before { background: rgba(237, 237, 237, .6); }
.hb-vb1-tick[data-minor] span { visibility: hidden; }
@container (max-width: 560px) {
  .hb-vb1-inner { padding-top: 250px; }
  .hb-vb1-actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 340px; }
  .hb-vb1-btn { justify-content: center; }
  .hb-vb1-tick[data-mid] span { visibility: hidden; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb1-fan, .hb-vb1-band, .hb-vb1-photon, .hb-vb1-glint, .hb-vb1-in { animation: none; }
  .hb-vb1-photon { display: none; }
  .hb-vb1-tiltg, .hb-vb1-btn, .hb-vb1-btn svg { transition: none; }
}
`;

const spectrum = ["#ff3b3b", "#ff8a2f", "#ffe14d", "#3ddc84", "#2fb4ff", "#4d5bff", "#a24dff"];

const bands = spectrum.map((color, i) => {
  const a = 300 + i * 52;
  const b = a + 58;
  return { color, points: `662,196 1320,${a} 1320,${b}` };
});

const ticks = Array.from({ length: 17 }, (_, i) => {
  const nm = 380 + i * 20;
  const major = i % 4 === 0;
  const mid = i % 2 === 0 && !major;
  return { nm, major, mid };
});

const defaultPrimary: HeroPrismAction = { label: "Start splitting data", href: "#" };
const defaultSecondary: HeroPrismAction = { label: "See how it works", href: "#" };

function d(ms: number) {
  return { "--hb-vb1-d": `${ms}ms` } as React.CSSProperties;
}

export function HeroPrism({
  eyebrow = "Spectra 3 · Signal decomposition",
  title = "One stream in. Every signal out.",
  subtitle = "Spectra splits a single firehose of product events into the seven metrics your team actually acts on, refreshed every second and explained in plain language.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  showRuler = true,
  interactive = true,
  headingAs = "h1",
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: HeroPrismProps) {
  const Heading = headingAs;
  const uid = React.useId().replace(/:/g, "");
  const root = React.useRef<HTMLElement>(null);
  const split = title.lastIndexOf(" ", Math.floor(title.length * 0.55));
  const head = split > 0 ? title.slice(0, split) : "";
  const tail = split > 0 ? title.slice(split + 1) : title;

  const move = (event: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(event);
    if (!interactive || !root.current) return;
    const box = root.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    root.current.style.setProperty("--hb-vb1-tilt", `${(x * 7).toFixed(2)}deg`);
  };
  const leave = (event: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(event);
    root.current?.style.setProperty("--hb-vb1-tilt", "0deg");
  };

  return (
    <section ref={root} className={`hb-vb1 ${className}`} style={style} onPointerMove={move} onPointerLeave={leave} {...rest}>
      <style href="hb-hero-prism" precedence="default">{css}</style>
      <svg className="hb-vb1-scene" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        <defs>
          <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".2" />
            <stop offset=".5" stopColor="#ffffff" stopOpacity=".04" />
            <stop offset="1" stopColor="#9fd8ff" stopOpacity=".14" />
          </linearGradient>
          <linearGradient id={`${uid}-beam`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset=".6" stopColor="#ffffff" stopOpacity=".55" />
            <stop offset="1" stopColor="#ffffff" stopOpacity=".95" />
          </linearGradient>
          <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset=".75" stopColor="#fff" stopOpacity=".7" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={`${uid}-mask`}>
            <rect x="0" y="0" width="1400" height="760" fill={`url(#${uid}-fade)`} />
          </mask>
        </defs>
        <line x1="-40" y1="96" x2="541" y2="196" stroke={`url(#${uid}-beam)`} strokeWidth="2.4" />
        <line x1="-40" y1="96" x2="541" y2="196" stroke="#ffffff" strokeOpacity=".35" strokeWidth="9" filter={`url(#${uid}-glow)`} />
        <line className="hb-vb1-photon" x1="-40" y1="96" x2="541" y2="196" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        <g className="hb-vb1-tiltg">
          <g className="hb-vb1-fan" mask={`url(#${uid}-mask)`}>
            <g filter={`url(#${uid}-soft)`} opacity=".85">
              {bands.map((band, i) => (
                <polygon key={i} points={band.points} fill={band.color} opacity=".55" />
              ))}
            </g>
            {bands.map((band, i) => (
              <polygon
                key={i}
                className="hb-vb1-band"
                points={band.points}
                fill={band.color}
                style={{ "--hb-vb1-i": i } as React.CSSProperties}
              />
            ))}
          </g>
        </g>
        <path d="M541 196 L662 196" stroke="#ffffff" strokeOpacity=".5" strokeWidth="2" />
        <polygon points="600,84 476,304 724,304" fill={`url(#${uid}-glass)`} stroke="rgba(255,255,255,.55)" strokeWidth="1.4" strokeLinejoin="round" />
        <polygon points="600,84 476,304 600,250" fill="#ffffff" opacity=".05" />
        <polygon points="600,84 724,304 600,250" fill="#7fd0ff" opacity=".05" />
        <line x1="600" y1="84" x2="600" y2="250" stroke="#ffffff" strokeOpacity=".12" />
        <line className="hb-vb1-glint" x1="590" y1="104" x2="500" y2="264" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="600" cy="84" r="2.4" fill="#ffffff" />
        <ellipse cx="600" cy="318" rx="150" ry="8" fill="#000" opacity=".6" filter={`url(#${uid}-glow)`} />
      </svg>
      <div className="hb-vb1-veil" aria-hidden="true" />
      <div className="hb-vb1-inner">
        {eyebrow ? (
          <p className="hb-vb1-eyebrow hb-vb1-in" style={d(80)}>
            <span className="hb-vb1-chip" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <Heading className="hb-vb1-title hb-vb1-in" style={d(180)}>
          {head ? `${head} ` : null}
          <span>{tail}</span>
        </Heading>
        {subtitle ? (
          <p className="hb-vb1-sub hb-vb1-in" style={d(300)}>
            {subtitle}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-vb1-actions hb-vb1-in" style={d(420)}>
            {primaryCta ? (
              <a className="hb-vb1-btn" data-primary="" href={primaryCta.href}>
                {primaryCta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-vb1-btn" href={secondaryCta.href}>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      {showRuler ? (
        <div className="hb-vb1-ruler hb-vb1-in" style={d(560)} aria-hidden="true">
          <div className="hb-vb1-bar" />
          <div className="hb-vb1-ticks">
            {ticks.map((tick) => (
              <span
                key={tick.nm}
                className="hb-vb1-tick"
                data-major={tick.major ? "" : undefined}
                data-mid={tick.mid ? "" : undefined}
                data-minor={!tick.major && !tick.mid ? "" : undefined}
                style={{ "--hb-vb1-h": tick.major ? "10px" : "5px" } as React.CSSProperties}
              >
                <span>{tick.nm}</span>
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
