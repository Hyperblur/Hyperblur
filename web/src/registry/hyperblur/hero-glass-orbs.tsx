"use client";

import * as React from "react";

export interface HeroGlassOrbsAction {
  label: string;
  href: string;
}

export interface HeroGlassOrbsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroGlassOrbsAction | null;
  secondaryCta?: HeroGlassOrbsAction | null;
  points?: string[];
  accent?: string;
  interactive?: boolean;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb2 {
  --hb-vb2-accent: #2f7bff;
  --hb-vb2-x: 0;
  --hb-vb2-y: 0;
  position: relative;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: 24px;
  width: 100%;
  min-height: 620px;
  padding: 64px clamp(20px, 6cqi, 72px);
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #070708;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vb2 *, .hb-vb2 *::before, .hb-vb2 *::after { box-sizing: border-box; }
.hb-vb2-field {
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, .055) 0 1px, transparent 1px 28px),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, .03) 0 1px, transparent 1px 28px);
  -webkit-mask-image: radial-gradient(70% 90% at 72% 50%, #000 20%, transparent 85%);
  mask-image: radial-gradient(70% 90% at 72% 50%, #000 20%, transparent 85%);
}
.hb-vb2-band {
  position: absolute;
  right: -10%;
  top: 22%;
  z-index: -2;
  width: 80%;
  height: 56%;
  border-radius: 50%;
  background: conic-gradient(from 200deg at 50% 50%, color-mix(in srgb, var(--hb-vb2-accent) 80%, #22d3ee), #a855f7, #f472b6, color-mix(in srgb, var(--hb-vb2-accent) 80%, #22d3ee));
  filter: blur(70px);
  opacity: .32;
  transform: rotate(-12deg);
  pointer-events: none;
  animation: hb-vb2-hue 18s linear infinite;
}
@keyframes hb-vb2-hue {
  to { transform: rotate(348deg); }
}
.hb-vb2-word {
  position: absolute;
  right: -2%;
  top: 50%;
  z-index: -1;
  margin: 0;
  color: transparent;
  font-family: var(--font-grotesk, inherit);
  font-size: clamp(120px, 26cqi, 280px);
  font-weight: 700;
  letter-spacing: -.06em;
  line-height: .8;
  -webkit-text-stroke: 1px rgba(255, 255, 255, .1);
  transform: translateY(-50%);
  pointer-events: none;
  user-select: none;
}
.hb-vb2-copy { position: relative; z-index: 2; max-width: 520px; }
.hb-vb2-in { animation: hb-vb2-up .9s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb2-d, 0ms); }
@keyframes hb-vb2-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vb2-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 6px 12px 6px 8px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08);
  color: rgba(237, 237, 237, .78);
  font-size: 12.5px;
}
.hb-vb2-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ffffff, color-mix(in srgb, var(--hb-vb2-accent) 70%, #ffffff) 40%, var(--hb-vb2-accent) 75%);
  box-shadow: 0 0 10px color-mix(in srgb, var(--hb-vb2-accent) 70%, transparent);
}
.hb-vb2-title {
  margin: 22px 0 0;
  color: #f5f5f5;
  font-size: clamp(36px, 5.6cqi, 62px);
  font-weight: 640;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
}
.hb-vb2-sub {
  margin: 18px 0 0;
  color: rgba(237, 237, 237, .6);
  font-size: clamp(15px, 1.7cqi, 17px);
  line-height: 1.55;
  text-wrap: pretty;
}
.hb-vb2-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.hb-vb2-btn {
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
  backdrop-filter: blur(10px);
  transition: transform .25s cubic-bezier(.2, .8, .2, 1), background .25s ease, border-color .25s ease;
}
.hb-vb2-btn:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .26); transform: translateY(-1px); }
.hb-vb2-btn:active { transform: scale(.98); }
.hb-vb2-btn:focus-visible { outline: 2px solid var(--hb-vb2-accent); outline-offset: 3px; }
.hb-vb2-btn[data-primary] {
  border-color: rgba(255, 255, 255, .5);
  background: linear-gradient(180deg, #ffffff, #dfe6f2);
  color: #08090b;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .08), 0 14px 34px -14px color-mix(in srgb, var(--hb-vb2-accent) 90%, transparent);
}
.hb-vb2-btn[data-primary]:hover { background: linear-gradient(180deg, #ffffff, #eef2f8); }
.hb-vb2-points { display: flex; flex-wrap: wrap; gap: 8px 18px; margin: 28px 0 0; padding: 0; list-style: none; }
.hb-vb2-points li { display: inline-flex; align-items: center; gap: 8px; color: rgba(237, 237, 237, .55); font-size: 13px; }
.hb-vb2-points svg { color: color-mix(in srgb, var(--hb-vb2-accent) 60%, #ffffff); }
.hb-vb2-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 480px;
  justify-self: center;
  pointer-events: none;
}
.hb-vb2-float {
  position: absolute;
  left: var(--hb-vb2-l);
  top: var(--hb-vb2-t);
  width: var(--hb-vb2-s);
  aspect-ratio: 1;
  transform: translate3d(calc(var(--hb-vb2-x) * var(--hb-vb2-z) * 1px), calc(var(--hb-vb2-y) * var(--hb-vb2-z) * 1px), 0);
  transition: transform 1s cubic-bezier(.16, 1, .3, 1);
}
.hb-vb2-orb {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 26%, rgba(255, 255, 255, .85) 0 3%, rgba(255, 255, 255, .25) 9%, transparent 22%),
    radial-gradient(circle at 70% 82%, color-mix(in srgb, var(--hb-vb2-tint) 60%, transparent) 0, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, .02) 55%, rgba(255, 255, 255, .14) 72%, rgba(255, 255, 255, .02) 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, .22),
    inset 6px 8px 18px rgba(255, 255, 255, .16),
    inset -10px -14px 30px color-mix(in srgb, var(--hb-vb2-tint) 40%, transparent),
    inset 2px 0 0 rgba(255, 90, 120, .35),
    inset -2px 0 0 rgba(80, 200, 255, .35),
    0 30px 60px -20px rgba(0, 0, 0, .8);
  backdrop-filter: blur(3px) saturate(1.8) brightness(1.15);
  -webkit-backdrop-filter: blur(3px) saturate(1.8) brightness(1.15);
  animation: hb-vb2-bob var(--hb-vb2-dur) cubic-bezier(.45, 0, .55, 1) infinite alternate;
  animation-delay: var(--hb-vb2-del);
}
.hb-vb2-lens {
  position: absolute;
  inset: -30%;
  border-radius: 50%;
  background:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, .16) 0 2px, transparent 2px 46px),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, .08) 0 1px, transparent 1px 46px);
  transform: scale(-1, 1) rotate(4deg);
  -webkit-mask-image: radial-gradient(circle, #000 0 28%, transparent 46%);
  mask-image: radial-gradient(circle, #000 0 28%, transparent 46%);
  opacity: .8;
}
.hb-vb2-caustic {
  position: absolute;
  left: 18%;
  bottom: 8%;
  width: 64%;
  height: 22%;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(255, 255, 255, .55), transparent);
  filter: blur(4px);
  opacity: .5;
}
.hb-vb2-shadow {
  position: absolute;
  left: 15%;
  right: 15%;
  bottom: -18%;
  height: 10%;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-vb2-tint) 45%, transparent), transparent);
  filter: blur(8px);
  animation: hb-vb2-shade var(--hb-vb2-dur) cubic-bezier(.45, 0, .55, 1) infinite alternate;
  animation-delay: var(--hb-vb2-del);
}
@keyframes hb-vb2-bob {
  from { transform: translate3d(0, -4%, 0) rotate(-4deg); }
  to { transform: translate3d(0, 5%, 0) rotate(6deg); }
}
@keyframes hb-vb2-shade {
  from { transform: scale(.8); opacity: .5; }
  to { transform: scale(1.05); opacity: .9; }
}
.hb-vb2-label {
  position: absolute;
  left: 58%;
  top: 6%;
  padding: 7px 11px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 10px;
  background: rgba(16, 17, 20, .6);
  backdrop-filter: blur(12px);
  color: rgba(237, 237, 237, .85);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06);
}
.hb-vb2-label b { color: color-mix(in srgb, var(--hb-vb2-accent) 55%, #ffffff); font-weight: 500; }
@container (max-width: 760px) {
  .hb-vb2 { grid-template-columns: 1fr; padding-top: 48px; }
  .hb-vb2-stage { order: -1; max-width: 300px; }
  .hb-vb2-copy { max-width: none; }
}
@container (max-width: 480px) {
  .hb-vb2-actions { flex-direction: column; align-items: stretch; }
  .hb-vb2-btn { justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb2-band, .hb-vb2-orb, .hb-vb2-shadow, .hb-vb2-in { animation: none; }
  .hb-vb2-float, .hb-vb2-btn { transition: none; }
}
`;

const orbs = [
  { l: "22%", t: "18%", s: "56%", z: 26, tint: "#4f8cff", dur: "7s", del: "-1s" },
  { l: "4%", t: "56%", s: "28%", z: 44, tint: "#c084fc", dur: "6s", del: "-3s" },
  { l: "70%", t: "58%", s: "22%", z: 60, tint: "#22d3ee", dur: "5.2s", del: "-2s" },
  { l: "62%", t: "8%", s: "15%", z: 70, tint: "#f472b6", dur: "4.6s", del: "-.5s" },
  { l: "42%", t: "80%", s: "11%", z: 84, tint: "#a3e635", dur: "4s", del: "-1.6s" },
];

const defaultPrimary: HeroGlassOrbsAction = { label: "Start tracing free", href: "#" };
const defaultSecondary: HeroGlassOrbsAction = { label: "Book a walkthrough", href: "#" };
const defaultPoints = ["OpenTelemetry native", "14-day retention free", "EU and US regions"];

function d(ms: number) {
  return { "--hb-vb2-d": `${ms}ms` } as React.CSSProperties;
}

export function HeroGlassOrbs({
  eyebrow = "Lens 2.4 · Trace maps now render in 3D",
  title = "See through every layer of your stack",
  subtitle = "Lens follows a request from the browser to the database and back, so you can spot the slow hop before your customers do.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  points = defaultPoints,
  accent = "#2f7bff",
  interactive = true,
  headingAs = "h1",
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: HeroGlassOrbsProps) {
  const Heading = headingAs;
  const root = React.useRef<HTMLElement>(null);
  const vars = { "--hb-vb2-accent": accent, ...style } as React.CSSProperties;

  const move = (event: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(event);
    if (!interactive || !root.current) return;
    const box = root.current.getBoundingClientRect();
    root.current.style.setProperty("--hb-vb2-x", (((event.clientX - box.left) / box.width - 0.5) * 0.6).toFixed(3));
    root.current.style.setProperty("--hb-vb2-y", (((event.clientY - box.top) / box.height - 0.5) * 0.6).toFixed(3));
  };
  const leave = (event: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(event);
    root.current?.style.setProperty("--hb-vb2-x", "0");
    root.current?.style.setProperty("--hb-vb2-y", "0");
  };

  return (
    <section ref={root} className={`hb-vb2 ${className}`} style={vars} onPointerMove={move} onPointerLeave={leave} {...rest}>
      <style href="hb-hero-glass-orbs" precedence="default">{css}</style>
      <div className="hb-vb2-field" aria-hidden="true" />
      <div className="hb-vb2-band" aria-hidden="true" />
      <p className="hb-vb2-word" aria-hidden="true">lens</p>
      <div className="hb-vb2-copy">
        {eyebrow ? (
          <p className="hb-vb2-eyebrow hb-vb2-in" style={d(60)}>
            <span className="hb-vb2-dot" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <Heading className="hb-vb2-title hb-vb2-in" style={d(150)}>
          {title}
        </Heading>
        {subtitle ? (
          <p className="hb-vb2-sub hb-vb2-in" style={d(260)}>
            {subtitle}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-vb2-actions hb-vb2-in" style={d(360)}>
            {primaryCta ? (
              <a className="hb-vb2-btn" data-primary="" href={primaryCta.href}>
                {primaryCta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-vb2-btn" href={secondaryCta.href}>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
        {points.length ? (
          <ul className="hb-vb2-points hb-vb2-in" style={d(460)}>
            {points.map((point) => (
              <li key={point}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="hb-vb2-stage" aria-hidden="true">
        {orbs.map((orb, i) => (
          <div
            key={i}
            className="hb-vb2-float"
            style={
              {
                "--hb-vb2-l": orb.l,
                "--hb-vb2-t": orb.t,
                "--hb-vb2-s": orb.s,
                "--hb-vb2-z": orb.z,
                "--hb-vb2-tint": orb.tint,
                "--hb-vb2-dur": orb.dur,
                "--hb-vb2-del": orb.del,
              } as React.CSSProperties
            }
          >
            <span className="hb-vb2-shadow" />
            <span className="hb-vb2-orb">
              <span className="hb-vb2-lens" />
              <span className="hb-vb2-caustic" />
            </span>
          </div>
        ))}
        <span className="hb-vb2-label">
          p95 <b>182 ms</b> · checkout-api
        </span>
      </div>
    </section>
  );
}
