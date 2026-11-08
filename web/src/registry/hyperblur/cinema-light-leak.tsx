"use client";

import * as React from "react";

export interface CinemaLightLeakProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  reel?: string;
  title?: string;
  caption?: string;
  location?: string;
  intensity?: number;
  grain?: number;
  speed?: number;
  warm?: string;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vc5 {
  --hb-vc5-warm: #ff7a2f;
  --hb-vc5-int: .85;
  --hb-vc5-grain: .5;
  --hb-vc5-speed: 1;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  width: 100%;
  min-height: 580px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0605;
  color: #fff6ea;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc5 *, .hb-vc5 *::before, .hb-vc5 *::after { box-sizing: border-box; }
.hb-vc5-gate {
  position: absolute;
  inset: -6px;
  z-index: 0;
  animation: hb-vc5-weave calc(.9s / var(--hb-vc5-speed)) steps(1, end) infinite;
}
@keyframes hb-vc5-weave {
  0% { transform: translate3d(0, 0, 0); }
  20% { transform: translate3d(.6px, -1px, 0); }
  40% { transform: translate3d(-.4px, .8px, 0); }
  60% { transform: translate3d(.8px, .4px, 0); }
  80% { transform: translate3d(-.6px, -.6px, 0); }
}
.hb-vc5-gate svg { display: block; width: 100%; height: 100%; filter: saturate(1.15) contrast(1.05); }
.hb-vc5-sway { animation: hb-vc5-sway calc(7s / var(--hb-vc5-speed)) ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes hb-vc5-sway {
  from { transform: rotate(-1.4deg); }
  to { transform: rotate(1.2deg); }
}
.hb-vc5-leak {
  position: absolute;
  z-index: 1;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: screen;
  filter: blur(40px);
  opacity: 0;
}
.hb-vc5-leak[data-k="a"] {
  left: -20%;
  top: -30%;
  width: 70%;
  height: 120%;
  background: radial-gradient(closest-side, var(--hb-vc5-warm), color-mix(in srgb, var(--hb-vc5-warm) 40%, #ff2a5a) 55%, transparent);
  animation: hb-vc5-a calc(9s / var(--hb-vc5-speed)) cubic-bezier(.45, 0, .55, 1) infinite;
}
.hb-vc5-leak[data-k="b"] {
  right: -25%;
  top: 10%;
  width: 60%;
  height: 100%;
  background: radial-gradient(closest-side, #ffd27a, color-mix(in srgb, var(--hb-vc5-warm) 70%, #ffd27a) 50%, transparent);
  animation: hb-vc5-b calc(11s / var(--hb-vc5-speed)) cubic-bezier(.45, 0, .55, 1) infinite;
}
.hb-vc5-leak[data-k="c"] {
  left: 30%;
  bottom: -50%;
  width: 50%;
  height: 80%;
  background: radial-gradient(closest-side, #ff3d6e, transparent);
  animation: hb-vc5-c calc(13s / var(--hb-vc5-speed)) cubic-bezier(.45, 0, .55, 1) infinite;
}
@keyframes hb-vc5-a {
  0%, 100% { opacity: 0; transform: translate3d(-10%, 0, 0) scale(.9); }
  30% { opacity: calc(var(--hb-vc5-int) * .9); }
  55% { opacity: calc(var(--hb-vc5-int) * .55); transform: translate3d(18%, 6%, 0) scale(1.15); }
  70% { opacity: 0; }
}
@keyframes hb-vc5-b {
  0%, 100% { opacity: 0; transform: translate3d(10%, 0, 0); }
  40% { opacity: 0; }
  62% { opacity: calc(var(--hb-vc5-int) * .8); transform: translate3d(-14%, -8%, 0) scale(1.2); }
  85% { opacity: calc(var(--hb-vc5-int) * .2); }
}
@keyframes hb-vc5-c {
  0%, 100% { opacity: calc(var(--hb-vc5-int) * .25); transform: translate3d(0, 0, 0); }
  50% { opacity: calc(var(--hb-vc5-int) * .6); transform: translate3d(-30%, -10%, 0) scale(1.3); }
}
.hb-vc5-burn {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-vc5-warm) 90%, #fff), transparent 30%);
  mix-blend-mode: screen;
  opacity: 0;
  animation: hb-vc5-burn calc(9s / var(--hb-vc5-speed)) ease-out infinite;
}
@keyframes hb-vc5-burn {
  0%, 26%, 100% { opacity: 0; }
  28% { opacity: calc(var(--hb-vc5-int) * .7); }
  34% { opacity: 0; }
}
.hb-vc5-grain {
  position: absolute;
  inset: -50%;
  z-index: 3;
  width: 200%;
  height: 200%;
  pointer-events: none;
  opacity: var(--hb-vc5-grain);
  mix-blend-mode: overlay;
  animation: hb-vc5-grain .5s steps(5, end) infinite;
}
@keyframes hb-vc5-grain {
  0% { transform: translate3d(0, 0, 0); }
  20% { transform: translate3d(-6%, 4%, 0); }
  40% { transform: translate3d(4%, -7%, 0); }
  60% { transform: translate3d(-3%, -3%, 0); }
  80% { transform: translate3d(7%, 5%, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
.hb-vc5-frame {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  border-radius: 18px;
  box-shadow: inset 0 0 0 10px #050302, inset 0 0 90px 30px rgba(0, 0, 0, .75);
}
.hb-vc5-hud {
  position: absolute;
  top: 22px;
  left: 30px;
  right: 30px;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  color: rgba(255, 238, 214, .85);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: .16em;
  text-transform: uppercase;
  text-shadow: 0 1px 8px rgba(0, 0, 0, .6);
}
.hb-vc5-tc { font-variant-numeric: tabular-nums; }
.hb-vc5-tc::before {
  content: "";
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 50%;
  background: #ff4a3a;
  vertical-align: 1px;
  animation: hb-vc5-rec 1.2s steps(1, end) infinite;
}
@keyframes hb-vc5-rec {
  50% { opacity: .2; }
}
.hb-vc5-copy {
  position: relative;
  z-index: 5;
  max-width: 640px;
  padding: 0 clamp(24px, 5cqi, 64px) clamp(36px, 6cqi, 64px);
}
.hb-vc5-reel {
  margin: 0 0 12px;
  color: rgba(255, 238, 214, .7);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: .26em;
  text-transform: uppercase;
}
.hb-vc5-title {
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(40px, 8.6cqi, 108px);
  font-weight: 700;
  line-height: .9;
  letter-spacing: -.04em;
  text-shadow: 0 4px 40px rgba(0, 0, 0, .4);
}
.hb-vc5-caption {
  max-width: 440px;
  margin: 16px 0 0;
  color: rgba(255, 246, 234, .82);
  font-size: clamp(14px, 1.7cqi, 16px);
  line-height: 1.55;
}
.hb-vc5-loc {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding: 6px 12px;
  border: 1px solid rgba(255, 238, 214, .26);
  border-radius: 999px;
  background: rgba(20, 10, 6, .35);
  color: rgba(255, 238, 214, .9);
  font-size: 12px;
  backdrop-filter: blur(6px);
}
@media (prefers-reduced-motion: reduce) {
  .hb-vc5-gate, .hb-vc5-sway, .hb-vc5-burn, .hb-vc5-grain, .hb-vc5-tc::before { animation: none; }
  .hb-vc5-leak { animation: none; opacity: calc(var(--hb-vc5-int) * .4); }
}
`;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CinemaLightLeak({
  reel = "Reel 02 · Kodak 500T",
  title = "Summer, unedited",
  caption = "Eleven days of salt, static and borrowed cars, cut together from the rolls we almost threw away.",
  location = "Cabo da Roca, Portugal",
  intensity = 0.85,
  grain = 0.5,
  speed = 1,
  warm = "#ff7a2f",
  headingAs = "h1",
  className,
  style,
  ...rest
}: CinemaLightLeakProps) {
  const Heading = headingAs;
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const tcRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 14 * 24 * 60 + 8;
    const id = window.setInterval(() => {
      frame += 1;
      const f = frame % 24;
      const s = Math.floor(frame / 24) % 60;
      const m = Math.floor(frame / 1440) % 60;
      if (tcRef.current) tcRef.current.textContent = `00:${pad(m)}:${pad(s)}:${pad(f)}`;
    }, 1000 / 24);
    return () => window.clearInterval(id);
  }, []);

  const vars = {
    "--hb-vc5-warm": warm,
    "--hb-vc5-int": String(intensity),
    "--hb-vc5-grain": String(grain),
    "--hb-vc5-speed": String(speed),
    ...style,
  } as React.CSSProperties;

  return (
    <section className={["hb-vc5", className].filter(Boolean).join(" ")} style={vars} {...rest}>
      <style href="hb-cinema-light-leak" precedence="default">{css}</style>
      <div className="hb-vc5-gate" aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`hb-vc5-sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3b2a4a" />
              <stop offset=".4" stopColor="#c4646a" />
              <stop offset=".62" stopColor="#ffb07a" />
              <stop offset=".64" stopColor="#ffd6a4" />
              <stop offset="1" stopColor="#2d3348" />
            </linearGradient>
            <linearGradient id={`hb-vc5-sea-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e89a7a" />
              <stop offset=".3" stopColor="#5a4a62" />
              <stop offset="1" stopColor="#16141e" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill={`url(#hb-vc5-sky-${uid})`} />
          <circle cx="1040" cy="560" r="64" fill="#fff0d0" opacity=".95" />
          <circle cx="1040" cy="560" r="150" fill="#ffd9a0" opacity=".25" />
          <rect y="576" width="1600" height="324" fill={`url(#hb-vc5-sea-${uid})`} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={1000 - i * 18} y={590 + i * 22} width={80 + i * 36} height={3 + i * 0.6} rx="2" fill="#ffe2b8" opacity={(0.7 - i * 0.08).toFixed(2)} />
          ))}
          <path d="M0 620 C120 600 220 560 330 590 C430 616 520 650 600 720 L600 900 L0 900Z" fill="#120c10" />
          <path d="M1280 900 L1340 660 C1380 640 1440 630 1600 620 L1600 900Z" fill="#0e0a0e" />
          <g className="hb-vc5-sway">
            <path d="M250 900 C255 780 262 690 276 590" stroke="#0b0709" strokeWidth="9" fill="none" />
            <path d="M276 590 C230 560 190 570 150 600 M276 590 C250 540 210 520 170 520 M276 590 C300 540 340 520 390 530 M276 590 C330 570 370 590 400 630 M276 590 C280 545 300 510 320 490" stroke="#0b0709" strokeWidth="7" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>
      <span className="hb-vc5-leak" data-k="a" aria-hidden="true" />
      <span className="hb-vc5-leak" data-k="b" aria-hidden="true" />
      <span className="hb-vc5-leak" data-k="c" aria-hidden="true" />
      <span className="hb-vc5-burn" aria-hidden="true" />
      <svg className="hb-vc5-grain" aria-hidden="true">
        <filter id={`hb-vc5-noise-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 1.4 -.2" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#hb-vc5-noise-${uid})`} />
      </svg>
      <span className="hb-vc5-frame" aria-hidden="true" />
      <div className="hb-vc5-hud" aria-hidden="true">
        <span className="hb-vc5-tc" ref={tcRef}>00:14:00:08</span>
        <span>24 fps · 1.85 : 1</span>
      </div>
      <div className="hb-vc5-copy">
        {reel ? <p className="hb-vc5-reel">{reel}</p> : null}
        <Heading className="hb-vc5-title">{title}</Heading>
        {caption ? <p className="hb-vc5-caption">{caption}</p> : null}
        {location ? (
          <span className="hb-vc5-loc">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 14.5s5-4.6 5-8.5a5 5 0 1 0-10 0c0 3.9 5 8.5 5 8.5Z" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="6" r="1.8" fill="currentColor" /></svg>
            {location}
          </span>
        ) : null}
      </div>
    </section>
  );
}
