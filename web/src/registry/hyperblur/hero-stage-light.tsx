"use client";

import * as React from "react";

export interface HeroStageLightAction {
  label: string;
  href: string;
}

export interface HeroStageLightSpec {
  value: string;
  label: string;
}

export interface HeroStageLightProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroStageLightAction | null;
  secondaryCta?: HeroStageLightAction | null;
  specs?: HeroStageLightSpec[];
  productName?: string;
  lightColor?: string;
  speed?: number;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb3 {
  --hb-vb3-light: #fff4dc;
  --hb-vb3-dur: 9s;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 660px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #050505;
  color: #ededed;
  font-family: inherit;
  text-align: center;
  -webkit-font-smoothing: antialiased;
}
.hb-vb3 *, .hb-vb3 *::before, .hb-vb3 *::after { box-sizing: border-box; }
.hb-vb3-rig {
  position: absolute;
  left: 50%;
  top: -6px;
  z-index: 3;
  width: 74px;
  height: 18px;
  transform: translateX(-50%);
  border-radius: 0 0 14px 14px;
  background: linear-gradient(180deg, #1d1d1f, #0b0b0c);
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, .12), 0 6px 18px rgba(0, 0, 0, .8);
}
.hb-vb3-rig::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -3px;
  width: 26px;
  height: 4px;
  transform: translateX(-50%);
  border-radius: 4px;
  background: var(--hb-vb3-light);
  box-shadow: 0 0 14px 4px color-mix(in srgb, var(--hb-vb3-light) 70%, transparent);
}
.hb-vb3-cone {
  position: absolute;
  left: 50%;
  top: 8px;
  z-index: 1;
  width: 120%;
  height: 112%;
  margin-left: -60%;
  transform-origin: 50% 0;
  pointer-events: none;
  animation: hb-vb3-sweep var(--hb-vb3-dur) cubic-bezier(.45, 0, .55, 1) infinite alternate;
}
.hb-vb3-beam {
  position: absolute;
  inset: 0;
  clip-path: polygon(49% 0, 51% 0, 72% 100%, 28% 100%);
  background:
    radial-gradient(60% 80% at 50% 0%, color-mix(in srgb, var(--hb-vb3-light) 34%, transparent), transparent 72%),
    linear-gradient(180deg, color-mix(in srgb, var(--hb-vb3-light) 22%, transparent), transparent 85%);
  filter: blur(6px);
  mix-blend-mode: screen;
}
.hb-vb3-core {
  position: absolute;
  inset: 0;
  clip-path: polygon(49.6% 0, 50.4% 0, 58% 100%, 42% 100%);
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-vb3-light) 24%, transparent), transparent 70%);
  filter: blur(10px);
  mix-blend-mode: screen;
}
.hb-vb3-mote {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: var(--hb-vb3-light);
  opacity: 0;
  animation: hb-vb3-mote var(--hb-vb3-md) linear infinite;
  animation-delay: var(--hb-vb3-mdl);
}
@keyframes hb-vb3-mote {
  0% { opacity: 0; transform: translate3d(0, 0, 0); }
  20% { opacity: var(--hb-vb3-mo); }
  80% { opacity: var(--hb-vb3-mo); }
  100% { opacity: 0; transform: translate3d(var(--hb-vb3-mx), -60px, 0); }
}
@keyframes hb-vb3-sweep {
  from { transform: rotate(16deg); }
  to { transform: rotate(-16deg); }
}
.hb-vb3-pool {
  position: absolute;
  left: 50%;
  bottom: -34px;
  z-index: -1;
  width: 460px;
  height: 80px;
  margin-left: -230px;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-vb3-light) 30%, transparent), transparent);
  filter: blur(6px);
  animation: hb-vb3-pool var(--hb-vb3-dur) cubic-bezier(.45, 0, .55, 1) infinite alternate;
}
@keyframes hb-vb3-pool {
  from { transform: translateX(-26%) scaleX(1.15); opacity: .7; }
  50% { opacity: 1; transform: translateX(0) scaleX(1); }
  to { transform: translateX(26%) scaleX(1.15); opacity: .7; }
}
.hb-vb3-floor {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  height: 190px;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, .03) 30%, rgba(255, 255, 255, .015));
  border-top: 1px solid rgba(255, 255, 255, .04);
}
.hb-vb3-copy {
  position: relative;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 820px;
  padding: 56px clamp(20px, 5cqi, 48px) 0;
}
.hb-vb3-in { animation: hb-vb3-up 1s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb3-d, 0ms); }
@keyframes hb-vb3-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vb3-eyebrow {
  margin: 0;
  color: color-mix(in srgb, var(--hb-vb3-light) 80%, #a1a1a1);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px;
  letter-spacing: .22em;
  text-transform: uppercase;
}
.hb-vb3-title {
  margin: 16px 0 0;
  background: linear-gradient(180deg, #ffffff 30%, rgba(255, 255, 255, .55));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: clamp(36px, 6.4cqi, 66px);
  font-weight: 620;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
}
.hb-vb3-sub {
  max-width: 520px;
  margin: 16px 0 0;
  color: rgba(237, 237, 237, .55);
  font-size: clamp(14.5px, 1.7cqi, 16.5px);
  line-height: 1.55;
}
.hb-vb3-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 24px; }
.hb-vb3-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 999px;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14.5px;
  font-weight: 550;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .25s cubic-bezier(.2, .8, .2, 1), background .25s ease, border-color .25s ease;
}
.hb-vb3-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .28); transform: translateY(-1px); }
.hb-vb3-btn:active { transform: scale(.98); }
.hb-vb3-btn:focus-visible { outline: 2px solid var(--hb-vb3-light); outline-offset: 3px; }
.hb-vb3-btn[data-primary] { border-color: transparent; background: #f5f5f5; color: #0a0a0a; }
.hb-vb3-btn[data-primary]:hover { background: #ffffff; box-shadow: 0 0 34px -6px color-mix(in srgb, var(--hb-vb3-light) 60%, transparent); }
.hb-vb3-product {
  position: relative;
  z-index: 2;
  width: 150px;
  margin-top: 28px;
}
.hb-vb3-product svg { display: block; width: 100%; height: auto; overflow: visible; }
.hb-vb3-sheen {
  animation: hb-vb3-sheen var(--hb-vb3-dur) cubic-bezier(.45, 0, .55, 1) infinite alternate;
}
@keyframes hb-vb3-sheen {
  from { transform: translateX(-46px); }
  to { transform: translateX(46px); }
}
.hb-vb3-name {
  position: absolute;
  left: 50%;
  bottom: -30px;
  transform: translateX(-50%);
  color: rgba(237, 237, 237, .4);
  font-family: var(--font-grotesk, inherit);
  font-size: 11px;
  letter-spacing: .3em;
  text-transform: uppercase;
  white-space: nowrap;
}
.hb-vb3-specs {
  position: relative;
  z-index: 4;
  display: grid;
  grid-template-columns: repeat(var(--hb-vb3-n), minmax(0, 1fr));
  width: 100%;
  max-width: 760px;
  margin: auto 0 0;
  padding: 40px clamp(20px, 5cqi, 48px) 22px;
  list-style: none;
}
.hb-vb3-spec { padding: 14px 8px 0; border-top: 1px solid rgba(255, 255, 255, .08); }
.hb-vb3-spec + .hb-vb3-spec { border-left: 1px solid rgba(255, 255, 255, .05); }
.hb-vb3-spec b { display: block; color: #f5f5f5; font-family: var(--font-grotesk, inherit); font-size: 20px; font-weight: 600; letter-spacing: -.02em; }
.hb-vb3-spec span { display: block; margin-top: 3px; color: rgba(237, 237, 237, .45); font-size: 12px; }
@container (max-width: 560px) {
  .hb-vb3-actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 320px; }
  .hb-vb3-btn { justify-content: center; }
  .hb-vb3-specs { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 12px; }
  .hb-vb3-spec + .hb-vb3-spec { border-left: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb3-cone, .hb-vb3-pool, .hb-vb3-sheen, .hb-vb3-mote, .hb-vb3-in { animation: none; }
  .hb-vb3-mote { opacity: 0; }
  .hb-vb3-btn { transition: none; }
}
`;

function hash(n: number) {
  let x = Math.imul(n + 7, 2654435761);
  x = Math.imul(x ^ (x >>> 15), 2246822519);
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

const motes = Array.from({ length: 26 }, (_, i) => ({
  left: `${(38 + hash(i * 3) * 24).toFixed(2)}%`,
  top: `${(18 + hash(i * 3 + 1) * 70).toFixed(2)}%`,
  dur: `${(5 + hash(i * 5) * 6).toFixed(2)}s`,
  delay: `${(-hash(i * 9 + 2) * 10).toFixed(2)}s`,
  drift: `${((hash(i * 13) - 0.5) * 30).toFixed(1)}px`,
  op: (0.25 + hash(i * 17) * 0.55).toFixed(2),
}));

const grille = Array.from({ length: 9 * 13 }, (_, i) => {
  const row = Math.floor(i / 9);
  const col = i % 9;
  return { cx: (62 + col * 9.5 + (row % 2 ? 4.75 : 0)).toFixed(2), cy: (98 + row * 8.5).toFixed(2) };
}).filter((dot) => Number(dot.cx) < 142);

const defaultSpecs: HeroStageLightSpec[] = [
  { value: "40 h", label: "Battery life" },
  { value: "360°", label: "Spatial sound" },
  { value: "1.2 kg", label: "Machined aluminium" },
  { value: "IP67", label: "Dust and water" },
];

const defaultPrimary: HeroStageLightAction = { label: "Pre-order for $349", href: "#" };
const defaultSecondary: HeroStageLightAction = { label: "Hear it", href: "#" };

function d(ms: number) {
  return { "--hb-vb3-d": `${ms}ms` } as React.CSSProperties;
}

export function HeroStageLight({
  eyebrow = "Introducing",
  title = "Sound that fills the room, not the shelf",
  subtitle = "Aero One turns any corner into a listening room, tuning itself to the space in under a second.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  specs = defaultSpecs,
  productName = "Aero One",
  lightColor = "#fff4dc",
  speed = 1,
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroStageLightProps) {
  const Heading = headingAs;
  const uid = React.useId().replace(/:/g, "");
  const vars = {
    "--hb-vb3-light": lightColor,
    "--hb-vb3-dur": `${(9 / Math.max(speed, 0.1)).toFixed(2)}s`,
    "--hb-vb3-n": Math.max(specs.length, 1),
    ...style,
  } as React.CSSProperties;

  return (
    <section className={`hb-vb3 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-stage-light" precedence="default">{css}</style>
      <span className="hb-vb3-rig" aria-hidden="true" />
      <div className="hb-vb3-cone" aria-hidden="true">
        <span className="hb-vb3-beam" />
        <span className="hb-vb3-core" />
        {motes.map((mote, i) => (
          <span
            key={i}
            className="hb-vb3-mote"
            style={
              {
                left: mote.left,
                top: mote.top,
                "--hb-vb3-md": mote.dur,
                "--hb-vb3-mdl": mote.delay,
                "--hb-vb3-mx": mote.drift,
                "--hb-vb3-mo": mote.op,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <span className="hb-vb3-floor" aria-hidden="true" />
      <div className="hb-vb3-copy">
        {eyebrow ? (
          <p className="hb-vb3-eyebrow hb-vb3-in" style={d(100)}>
            {eyebrow}
          </p>
        ) : null}
        <Heading className="hb-vb3-title hb-vb3-in" style={d(200)}>
          {title}
        </Heading>
        {subtitle ? (
          <p className="hb-vb3-sub hb-vb3-in" style={d(320)}>
            {subtitle}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-vb3-actions hb-vb3-in" style={d(440)}>
            {primaryCta ? (
              <a className="hb-vb3-btn" data-primary="" href={primaryCta.href}>
                {primaryCta.label}
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-vb3-btn" href={secondaryCta.href}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2" />
                </svg>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="hb-vb3-product hb-vb3-in" style={d(520)} role="img" aria-label={productName}>
        <span className="hb-vb3-pool" aria-hidden="true" />
        <svg viewBox="0 0 204 232" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0d0d0f" />
              <stop offset=".35" stopColor="#2a2a2e" />
              <stop offset=".55" stopColor="#3a3a3f" />
              <stop offset="1" stopColor="#0a0a0b" />
            </linearGradient>
            <linearGradient id={`${uid}-top`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5a5a60" />
              <stop offset="1" stopColor="#1b1b1e" />
            </linearGradient>
            <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".28" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`${uid}-clip`}>
              <path d="M30 40 Q30 28 102 28 Q174 28 174 40 L174 206 Q174 220 102 220 Q30 220 30 206 Z" />
            </clipPath>
            <radialGradient id={`${uid}-ring`} cx=".5" cy=".5" r=".5">
              <stop offset=".7" stopColor="var(--hb-vb3-light)" stopOpacity="0" />
              <stop offset=".92" stopColor="var(--hb-vb3-light)" stopOpacity=".9" />
              <stop offset="1" stopColor="var(--hb-vb3-light)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M30 40 Q30 28 102 28 Q174 28 174 40 L174 206 Q174 220 102 220 Q30 220 30 206 Z" fill={`url(#${uid}-body)`} />
          <g clipPath={`url(#${uid}-clip)`}>
            {grille.map((dot, i) => (
              <circle key={i} cx={dot.cx} cy={dot.cy} r="1.6" fill="#000" opacity=".75" />
            ))}
            <rect className="hb-vb3-sheen" x="72" y="20" width="60" height="210" fill={`url(#${uid}-sheen)`} />
          </g>
          <ellipse cx="102" cy="36" rx="72" ry="11" fill={`url(#${uid}-top)`} />
          <ellipse cx="102" cy="36" rx="44" ry="6.5" fill={`url(#${uid}-ring)`} />
          <ellipse cx="102" cy="36" rx="20" ry="3" fill="#0c0c0e" />
          <ellipse cx="102" cy="226" rx="86" ry="5" fill="#000" opacity=".8" />
        </svg>
        <span className="hb-vb3-name" aria-hidden="true">
          {productName}
        </span>
      </div>
      {specs.length ? (
        <ul className="hb-vb3-specs hb-vb3-in" style={d(700)}>
          {specs.map((spec) => (
            <li key={spec.label} className="hb-vb3-spec">
              <b>{spec.value}</b>
              <span>{spec.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
