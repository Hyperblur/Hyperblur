"use client";

import * as React from "react";

export interface HeroGradientSphereAction {
  label: string;
  href: string;
}

export interface HeroGradientSphereToken {
  name: string;
  value: string;
}

export interface HeroGradientSphereProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroGradientSphereAction | null;
  secondaryCta?: HeroGradientSphereAction | null;
  colors?: [string, string, string];
  tokens?: HeroGradientSphereToken[];
  speed?: number;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb6 {
  --hb-vb6-c1: #ff5f3d;
  --hb-vb6-c2: #7c3aed;
  --hb-vb6-c3: #22d3ee;
  --hb-vb6-sp: 1;
  position: relative;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  align-items: center;
  gap: 32px;
  width: 100%;
  min-height: 620px;
  padding: 60px clamp(20px, 6cqi, 72px);
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #09090b;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vb6 *, .hb-vb6 *::before, .hb-vb6 *::after { box-sizing: border-box; }
.hb-vb6::before {
  content: "";
  position: absolute;
  right: -10%;
  top: 50%;
  z-index: -1;
  width: 70%;
  aspect-ratio: 1;
  transform: translateY(-50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-vb6-c2) 30%, transparent), transparent);
  pointer-events: none;
}
.hb-vb6-copy { max-width: 520px; }
.hb-vb6-in { animation: hb-vb6-up .9s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb6-d, 0ms); }
@keyframes hb-vb6-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vb6-eyebrow { margin: 0; color: rgba(237, 237, 237, .55); font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: .04em; }
.hb-vb6-eyebrow b { color: #ededed; font-weight: 500; }
.hb-vb6-title {
  margin: 18px 0 0;
  color: #f5f5f5;
  font-family: var(--font-grotesk, inherit);
  font-size: clamp(36px, 5.6cqi, 62px);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -.04em;
  text-wrap: balance;
}
.hb-vb6-sub { margin: 18px 0 0; color: rgba(237, 237, 237, .58); font-size: clamp(14.5px, 1.7cqi, 16.5px); line-height: 1.55; }
.hb-vb6-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
.hb-vb6-btn {
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
.hb-vb6-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .28); transform: translateY(-1px); }
.hb-vb6-btn:active { transform: scale(.98); }
.hb-vb6-btn:focus-visible { outline: 2px solid var(--hb-vb6-c3); outline-offset: 3px; }
.hb-vb6-btn[data-primary] {
  position: relative;
  border-color: transparent;
  background: #f5f5f5;
  color: #09090b;
}
.hb-vb6-btn[data-primary]::before {
  content: "";
  position: absolute;
  inset: -2px;
  z-index: -1;
  border-radius: inherit;
  background: conic-gradient(from var(--hb-vb6-a, 0deg), var(--hb-vb6-c1), var(--hb-vb6-c2), var(--hb-vb6-c3), var(--hb-vb6-c1));
  filter: blur(10px);
  opacity: 0;
  transition: opacity .3s ease;
}
.hb-vb6-btn[data-primary]:hover::before { opacity: .7; }
.hb-vb6-tokens { display: flex; flex-wrap: wrap; gap: 8px; margin: 30px 0 0; padding: 0; list-style: none; }
.hb-vb6-token {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px 5px 5px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 9px;
  background: rgba(255, 255, 255, .025);
  color: rgba(237, 237, 237, .7);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
}
.hb-vb6-token i { width: 16px; height: 16px; border-radius: 5px; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .18); font-style: normal; }
.hb-vb6-token span { color: rgba(237, 237, 237, .4); }
.hb-vb6-stage { position: relative; width: 100%; max-width: 460px; aspect-ratio: 1; justify-self: center; pointer-events: none; }
.hb-vb6-sphere {
  position: absolute;
  inset: 12%;
  overflow: hidden;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, color-mix(in srgb, var(--hb-vb6-c3) 40%, #ffffff), var(--hb-vb6-c2) 55%, #12081f 100%);
  box-shadow: 0 50px 90px -30px color-mix(in srgb, var(--hb-vb6-c2) 70%, transparent), 0 0 0 1px rgba(255, 255, 255, .06);
  animation: hb-vb6-breathe calc(10s / var(--hb-vb6-sp)) cubic-bezier(.45, 0, .55, 1) infinite alternate;
}
@keyframes hb-vb6-breathe {
  from { transform: scale(.985); }
  to { transform: scale(1.015); }
}
.hb-vb6-swirl {
  position: absolute;
  inset: -20%;
  animation: hb-vb6-spin calc(var(--hb-vb6-dur) / var(--hb-vb6-sp)) linear infinite;
  animation-direction: var(--hb-vb6-dir);
}
.hb-vb6-blob {
  position: absolute;
  left: var(--hb-vb6-l);
  top: var(--hb-vb6-t);
  width: var(--hb-vb6-s);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--hb-vb6-col);
  filter: blur(34px);
  mix-blend-mode: screen;
  opacity: .9;
}
@keyframes hb-vb6-spin {
  to { transform: rotate(360deg); }
}
.hb-vb6-shade {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 24%, rgba(255, 255, 255, .55) 0, rgba(255, 255, 255, .12) 12%, transparent 30%),
    radial-gradient(circle at 68% 74%, transparent 34%, rgba(5, 2, 12, .72) 78%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .14), inset -18px -24px 60px rgba(0, 0, 0, .4), inset 10px 14px 30px rgba(255, 255, 255, .12);
}
.hb-vb6-grain {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: repeating-radial-gradient(circle at 30% 30%, rgba(255, 255, 255, .05) 0 1px, transparent 1px 3px);
  mix-blend-mode: overlay;
  opacity: .6;
}
.hb-vb6-wire { position: absolute; inset: 12%; width: 76%; height: 76%; overflow: visible; }
.hb-vb6-mer {
  transform-box: fill-box;
  transform-origin: center;
  animation: hb-vb6-turn calc(14s / var(--hb-vb6-sp)) cubic-bezier(.45, 0, .55, 1) infinite;
  animation-delay: calc(var(--hb-vb6-m) * -14s / var(--hb-vb6-sp) / 6);
}
@keyframes hb-vb6-turn {
  0% { transform: scaleX(1); }
  50% { transform: scaleX(-1); }
  100% { transform: scaleX(1); }
}
.hb-vb6-orbit { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-vb6-tag {
  position: absolute;
  right: 0;
  bottom: 10%;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 12px;
  background: rgba(14, 14, 18, .7);
  backdrop-filter: blur(12px);
  color: rgba(237, 237, 237, .8);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  line-height: 1.5;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06);
}
.hb-vb6-tag b { color: #fff; font-weight: 500; }
@container (max-width: 760px) {
  .hb-vb6 { grid-template-columns: 1fr; padding-top: 40px; }
  .hb-vb6-stage { order: -1; max-width: 300px; }
}
@container (max-width: 480px) {
  .hb-vb6-actions { flex-direction: column; align-items: stretch; }
  .hb-vb6-btn { justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb6-in, .hb-vb6-sphere, .hb-vb6-swirl, .hb-vb6-mer { animation: none; }
  .hb-vb6-btn, .hb-vb6-btn[data-primary]::before { transition: none; }
  .hb-vb6-moon { display: none; }
}
`;

const defaultTokens: HeroGradientSphereToken[] = [
  { name: "ember-500", value: "#ff5f3d" },
  { name: "iris-600", value: "#7c3aed" },
  { name: "tide-400", value: "#22d3ee" },
  { name: "ink-950", value: "#12081f" },
];

const defaultPrimary: HeroGradientSphereAction = { label: "Generate a palette", href: "#" };
const defaultSecondary: HeroGradientSphereAction = { label: "View token docs", href: "#" };

function d(ms: number) {
  return { "--hb-vb6-d": `${ms}ms` } as React.CSSProperties;
}

export function HeroGradientSphere({
  eyebrow = "Meshwork / tokens v5 now sync to iOS and Android",
  title = "Color systems that hold together at every scale",
  subtitle = "Meshwork blends your brand colors into accessible palettes, then ships them as tokens for Figma, CSS and native apps in one sync.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  colors = ["#ff5f3d", "#7c3aed", "#22d3ee"],
  tokens = defaultTokens,
  speed = 1,
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroGradientSphereProps) {
  const Heading = headingAs;
  const uid = React.useId().replace(/:/g, "");
  const vars = {
    "--hb-vb6-c1": colors[0],
    "--hb-vb6-c2": colors[1],
    "--hb-vb6-c3": colors[2],
    "--hb-vb6-sp": Math.max(speed, 0.1),
    ...style,
  } as React.CSSProperties;
  const swirls = [
    { dur: "18s", dir: "normal", blobs: [{ l: "8%", t: "14%", s: "56%", col: "var(--hb-vb6-c1)" }, { l: "52%", t: "56%", s: "40%", col: "var(--hb-vb6-c3)" }] },
    { dur: "26s", dir: "reverse", blobs: [{ l: "48%", t: "6%", s: "46%", col: "var(--hb-vb6-c3)" }, { l: "10%", t: "60%", s: "38%", col: "#ffd166" }] },
    { dur: "34s", dir: "normal", blobs: [{ l: "30%", t: "34%", s: "36%", col: "#ffffff" }] },
  ];
  const ring = "M 404 230 A 196 50 0 1 1 46 230 A 196 50 0 1 1 404 230";

  return (
    <section className={`hb-vb6 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-gradient-sphere" precedence="default">{css}</style>
      <div className="hb-vb6-copy">
        {eyebrow ? (
          <p className="hb-vb6-eyebrow hb-vb6-in" style={d(40)}>
            {eyebrow.includes(" / ") ? (
              <>
                <b>{eyebrow.split(" / ")[0]}</b> / {eyebrow.split(" / ").slice(1).join(" / ")}
              </>
            ) : (
              eyebrow
            )}
          </p>
        ) : null}
        <Heading className="hb-vb6-title hb-vb6-in" style={d(130)}>
          {title}
        </Heading>
        {subtitle ? (
          <p className="hb-vb6-sub hb-vb6-in" style={d(230)}>
            {subtitle}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-vb6-actions hb-vb6-in" style={d(330)}>
            {primaryCta ? (
              <a className="hb-vb6-btn" data-primary="" href={primaryCta.href}>
                {primaryCta.label}
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-vb6-btn" href={secondaryCta.href}>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
        {tokens.length ? (
          <ul className="hb-vb6-tokens hb-vb6-in" style={d(430)} aria-label="Palette tokens">
            {tokens.map((token) => (
              <li key={token.name} className="hb-vb6-token">
                <i style={{ background: token.value }} aria-hidden="true" />
                {token.name}
                <span>{token.value}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="hb-vb6-stage hb-vb6-in" style={d(200)} aria-hidden="true">
        <svg className="hb-vb6-orbit" viewBox="0 0 450 450">
          <g transform="rotate(-16 225 225)">
            <path d={ring} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1" />
          </g>
        </svg>
        <div className="hb-vb6-sphere">
          {swirls.map((swirl, i) => (
            <div key={i} className="hb-vb6-swirl" style={{ "--hb-vb6-dur": swirl.dur, "--hb-vb6-dir": swirl.dir } as React.CSSProperties}>
              {swirl.blobs.map((blob, j) => (
                <span
                  key={j}
                  className="hb-vb6-blob"
                  style={{ "--hb-vb6-l": blob.l, "--hb-vb6-t": blob.t, "--hb-vb6-s": blob.s, "--hb-vb6-col": blob.col } as React.CSSProperties}
                />
              ))}
            </div>
          ))}
          <span className="hb-vb6-grain" />
          <span className="hb-vb6-shade" />
        </div>
        <svg className="hb-vb6-wire" viewBox="0 0 200 200">
          {[-60, -30, 0, 30, 60].map((lat) => {
            const rad = (lat * Math.PI) / 180;
            return (
              <ellipse
                key={lat}
                cx="100"
                cy={(100 - Math.sin(rad) * 99).toFixed(2)}
                rx={(Math.cos(rad) * 99).toFixed(2)}
                ry={(Math.cos(rad) * 12).toFixed(2)}
                fill="none"
                stroke="rgba(255,255,255,.12)"
                strokeWidth=".5"
              />
            );
          })}
          {[0, 1, 2, 3, 4, 5].map((m) => (
            <ellipse key={m} className="hb-vb6-mer" cx="100" cy="100" rx="99" ry="99" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth=".5" style={{ "--hb-vb6-m": m } as React.CSSProperties} />
          ))}
        </svg>
        <svg className="hb-vb6-orbit" viewBox="0 0 450 450">
          <defs>
            <radialGradient id={`${uid}-moon`} cx=".35" cy=".3" r=".7">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset=".5" stopColor={colors[2]} />
              <stop offset="1" stopColor={colors[1]} />
            </radialGradient>
          </defs>
          <g transform="rotate(-16 225 225)">
            <path d="M 404 230 A 196 50 0 0 1 46 230" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1" />
            <circle className="hb-vb6-moon" r="9" fill={`url(#${uid}-moon)`}>
              <animateMotion dur="12s" repeatCount="indefinite" path={ring} />
              <animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="1;1;0;0;1" keyTimes="0;.5;.58;.92;1" />
            </circle>
          </g>
        </svg>
        <div className="hb-vb6-tag">
          <b>contrast 7.2 : 1</b>
          <br />
          AAA on ink-950
        </div>
      </div>
    </section>
  );
}
