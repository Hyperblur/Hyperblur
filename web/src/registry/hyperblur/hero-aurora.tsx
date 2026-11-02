"use client";

import * as React from "react";

export interface HeroAuroraAction {
  label: string;
  href: string;
}

export interface HeroAuroraBadge {
  tag?: string;
  label: string;
  href?: string;
}

export interface HeroAuroraProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  highlight?: string;
  subtitle?: string;
  badge?: HeroAuroraBadge | null;
  primaryCta?: HeroAuroraAction | null;
  secondaryCta?: HeroAuroraAction | null;
  proof?: string;
  accent?: string;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-hra {
  --hb-hra-accent: #2f7bff;
  --hb-hra-c1: color-mix(in srgb, var(--hb-hra-accent) 70%, #22d3ee);
  --hb-hra-c2: color-mix(in srgb, var(--hb-hra-accent) 55%, #a855f7);
  --hb-hra-c3: color-mix(in srgb, var(--hb-hra-accent) 40%, #34d399);
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #050607;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hra *, .hb-hra *::before, .hb-hra *::after { box-sizing: border-box; }
.hb-hra-sky {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.hb-hra-sky::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 18%;
  width: 70%;
  height: 60%;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-hra-accent) 22%, transparent), transparent);
}
.hb-hra-ribbon {
  position: absolute;
  left: -25%;
  width: 150%;
  height: 36%;
  border-radius: 50%;
  background:
    repeating-linear-gradient(90deg, transparent 0 18px, rgba(255, 255, 255, .06) 18px 20px),
    linear-gradient(90deg, transparent 8%, var(--hb-hra-ra) 32%, var(--hb-hra-rb) 58%, transparent 90%);
  -webkit-mask-image: radial-gradient(closest-side, #000 18%, transparent 100%);
  mask-image: radial-gradient(closest-side, #000 18%, transparent 100%);
  opacity: .5;
  mix-blend-mode: screen;
  transform: rotate(var(--hb-hra-rot)) skewX(-24deg);
  animation: hb-hra-drift var(--hb-hra-dur) ease-in-out infinite alternate;
  animation-delay: var(--hb-hra-delay);
  will-change: transform;
}
.hb-hra-ribbon:nth-child(1) { top: -4%; --hb-hra-ra: var(--hb-hra-c1); --hb-hra-rb: var(--hb-hra-accent); --hb-hra-rot: -10deg; --hb-hra-dur: 16s; --hb-hra-delay: -3s; }
.hb-hra-ribbon:nth-child(2) { top: 10%; --hb-hra-ra: var(--hb-hra-c2); --hb-hra-rb: var(--hb-hra-c1); --hb-hra-rot: 8deg; --hb-hra-dur: 21s; --hb-hra-delay: -9s; opacity: .42; }
.hb-hra-ribbon:nth-child(3) { top: 24%; --hb-hra-ra: var(--hb-hra-c3); --hb-hra-rb: var(--hb-hra-c2); --hb-hra-rot: -4deg; --hb-hra-dur: 25s; --hb-hra-delay: -14s; opacity: .32; }
.hb-hra-ribbon:nth-child(4) { top: -16%; --hb-hra-ra: var(--hb-hra-accent); --hb-hra-rb: var(--hb-hra-c3); --hb-hra-rot: 16deg; --hb-hra-dur: 19s; --hb-hra-delay: -6s; opacity: .3; }
@keyframes hb-hra-drift {
  0% { transform: translate3d(-6%, 0, 0) rotate(var(--hb-hra-rot)) skewX(-24deg) scaleY(1); }
  50% { transform: translate3d(2%, -5%, 0) rotate(calc(var(--hb-hra-rot) + 4deg)) skewX(-12deg) scaleY(1.25); }
  100% { transform: translate3d(7%, 4%, 0) rotate(calc(var(--hb-hra-rot) - 3deg)) skewX(-30deg) scaleY(.85); }
}
.hb-hra-star {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #ffffff;
  animation: hb-hra-twinkle 4s ease-in-out infinite;
}
@keyframes hb-hra-twinkle {
  0%, 100% { opacity: var(--hb-hra-o); }
  50% { opacity: .05; }
}
.hb-hra-grid {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 48%;
  background-image:
    linear-gradient(rgba(255, 255, 255, .075) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .075) 1px, transparent 1px);
  background-size: 56px 56px;
  background-position: center bottom;
  -webkit-mask-image: radial-gradient(60% 100% at 50% 100%, #000 0%, transparent 75%);
  mask-image: radial-gradient(60% 100% at 50% 100%, #000 0%, transparent 75%);
}
.hb-hra-sky::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(5, 6, 7, 0) 40%, rgba(5, 6, 7, .55) 100%);
}
.hb-hra-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1040px;
  padding: clamp(64px, 9cqi, 96px) clamp(20px, 5cqi, 48px) clamp(72px, 9cqi, 100px);
  text-align: center;
}
.hb-hra-in {
  animation: hb-hra-up .8s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: var(--hb-hra-i, 0ms);
}
@keyframes hb-hra-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-hra-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  padding: 4px 14px 4px 4px;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 999px;
  background:
    linear-gradient(#0b0c10, #0b0c10) padding-box,
    linear-gradient(120deg, rgba(255, 255, 255, .3), color-mix(in srgb, var(--hb-hra-accent) 70%, transparent), rgba(255, 255, 255, .08)) border-box;
  color: rgba(237, 237, 237, .86);
  font-size: 13px;
  line-height: 1.2;
  text-decoration: none;
  transition: transform .25s ease;
}
.hb-hra-badge::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 35%, rgba(255, 255, 255, .2) 50%, transparent 65%);
  transform: translateX(-110%);
  animation: hb-hra-shine 4.5s ease-in-out infinite 1.4s;
  pointer-events: none;
}
@keyframes hb-hra-shine {
  0% { transform: translateX(-110%); }
  35%, 100% { transform: translateX(110%); }
}
a.hb-hra-badge:hover { transform: translate3d(0, -1px, 0); }
a.hb-hra-badge:focus-visible { outline: 2px solid var(--hb-hra-accent); outline-offset: 3px; }
.hb-hra-tag {
  flex: none;
  padding: 4px 9px;
  border-radius: 999px;
  background: var(--hb-hra-accent);
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: .01em;
}
.hb-hra-badge-label { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.hb-hra-badge svg { flex: none; opacity: .7; transition: transform .25s ease; }
a.hb-hra-badge:hover svg { transform: translateX(2px); }
.hb-hra-title {
  max-width: 1000px;
  margin: 26px 0 0;
  color: #f4f4f5;
  font-size: clamp(38px, 7.4cqi, 78px);
  font-weight: 650;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
}
.hb-hra-word {
  display: inline-block;
  animation: hb-hra-word .95s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: calc(220ms + var(--hb-hra-w) * 85ms);
}
@keyframes hb-hra-word {
  from { opacity: 0; filter: blur(14px); transform: translate3d(0, .3em, 0); }
  to { opacity: 1; filter: blur(0); transform: none; }
}
.hb-hra-word[data-hl] {
  --hb-hra-h0: color-mix(in srgb, var(--hb-hra-c1) 55%, #ffffff);
  --hb-hra-h1: color-mix(in srgb, var(--hb-hra-c2) 85%, #ffffff);
  padding-bottom: .06em;
  background: linear-gradient(100deg, color-mix(in srgb, var(--hb-hra-h1) var(--hb-hra-p0), var(--hb-hra-h0)), color-mix(in srgb, var(--hb-hra-h1) var(--hb-hra-p1), var(--hb-hra-h0)));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-hra-sub {
  max-width: 580px;
  margin: 22px 0 0;
  color: rgba(237, 237, 237, .62);
  font-size: clamp(15px, 2cqi, 18px);
  line-height: 1.55;
  text-wrap: pretty;
}
.hb-hra-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
.hb-hra-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: rgba(255, 255, 255, .045);
  color: #ededed;
  font: inherit;
  font-size: 15px;
  font-weight: 550;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .2s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.hb-hra-btn:hover { background: rgba(255, 255, 255, .09); border-color: rgba(255, 255, 255, .22); transform: translate3d(0, -1px, 0); }
.hb-hra-btn:active { transform: translate3d(0, 0, 0) scale(.98); }
.hb-hra-btn:focus-visible { outline: 2px solid var(--hb-hra-accent); outline-offset: 3px; }
.hb-hra-btn[data-primary] {
  border-color: transparent;
  background: #f4f4f5;
  color: #0a0a0a;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .1), 0 12px 40px -10px var(--hb-hra-accent);
}
.hb-hra-btn[data-primary]:hover { background: #ffffff; box-shadow: 0 0 0 1px rgba(255, 255, 255, .2), 0 14px 48px -8px var(--hb-hra-accent); }
.hb-hra-btn svg { flex: none; transition: transform .2s ease; }
.hb-hra-btn[data-primary]:hover svg { transform: translateX(2px); }
.hb-hra-play {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .12);
}
.hb-hra-proof {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px 14px;
  margin-top: 30px;
  color: rgba(237, 237, 237, .55);
  font-size: 13px;
}
.hb-hra-faces { display: flex; }
.hb-hra-face {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin-left: -8px;
  border: 2px solid #050607;
  border-radius: 50%;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 650;
}
.hb-hra-face:first-child { margin-left: 0; }
.hb-hra-stars { display: inline-flex; gap: 2px; color: #fbbf24; }
.hb-hra-proof-text { display: inline-flex; align-items: center; gap: 8px; }
.hb-hra-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 560px) {
  .hb-hra-actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 360px; }
  .hb-hra-btn { width: 100%; }
  .hb-hra-ribbon { height: 30%; }
  .hb-hra-grid { background-size: 40px 40px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hra-ribbon, .hb-hra-star, .hb-hra-badge::after, .hb-hra-in, .hb-hra-word { animation: none; }
  .hb-hra-word { filter: none; }
  .hb-hra-btn, .hb-hra-badge, .hb-hra-btn svg, .hb-hra-badge svg { transition: none; }
}
`;

function hash(n: number) {
  let x = Math.imul(n + 1, 374761393);
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

const stars = Array.from({ length: 38 }, (_, i) => ({
  left: `${(hash(i * 3) * 100).toFixed(2)}%`,
  top: `${(hash(i * 3 + 1) * 58).toFixed(2)}%`,
  opacity: (0.25 + hash(i * 3 + 2) * 0.55).toFixed(2),
  delay: `${(-hash(i * 7 + 5) * 4).toFixed(2)}s`,
  scale: hash(i * 11 + 3) > 0.82 ? 1.5 : 1,
}));

const faces = [
  { initials: "MR", color: "#6d5efc" },
  { initials: "AK", color: "#0ea5e9" },
  { initials: "JL", color: "#f97316" },
  { initials: "SD", color: "#10b981" },
];

const defaultBadge: HeroAuroraBadge = { tag: "New", label: "Session replays are here", href: "#" };
const defaultPrimary: HeroAuroraAction = { label: "Start for free", href: "#" };
const defaultSecondary: HeroAuroraAction = { label: "Watch the demo", href: "#" };

function delay(ms: number) {
  return { "--hb-hra-i": `${ms}ms` } as React.CSSProperties;
}

export function HeroAurora({
  title = "Build products your customers can't stop using",
  highlight = "can't stop using",
  subtitle = "Lumen turns raw product events into answers in seconds. Funnels, retention and live dashboards, without writing a single line of SQL.",
  badge = defaultBadge,
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  proof = "Loved by 12,400+ product teams",
  accent = "#2f7bff",
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroAuroraProps) {
  const Heading = headingAs;
  const vars = { "--hb-hra-accent": accent, ...style } as React.CSSProperties;
  const words = title.split(/\s+/).filter(Boolean);
  const marks = highlight ? highlight.split(/\s+/).filter(Boolean) : [];
  let start = -1;
  if (marks.length) {
    for (let i = 0; i + marks.length <= words.length; i += 1) {
      if (marks.every((word, j) => words[i + j] === word)) {
        start = i;
        break;
      }
    }
  }
  const base = 220 + words.length * 85;

  const badgeBody = badge ? (
    <>
      {badge.tag ? <span className="hb-hra-tag">{badge.tag}</span> : null}
      <span className="hb-hra-badge-label">{badge.label}</span>
      {badge.href ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      ) : null}
    </>
  ) : null;

  return (
    <section className={`hb-hra ${className}`} style={vars} {...rest}>
      <style href="hb-hero-aurora" precedence="default">{css}</style>
      <div className="hb-hra-sky" aria-hidden="true">
        <span className="hb-hra-ribbon" />
        <span className="hb-hra-ribbon" />
        <span className="hb-hra-ribbon" />
        <span className="hb-hra-ribbon" />
        {stars.map((star, i) => (
          <span
            key={i}
            className="hb-hra-star"
            style={{ left: star.left, top: star.top, animationDelay: star.delay, transform: `scale(${star.scale})`, "--hb-hra-o": star.opacity } as React.CSSProperties}
          />
        ))}
        <span className="hb-hra-grid" />
      </div>
      <div className="hb-hra-inner">
        {badge ? (
          badge.href ? (
            <a className="hb-hra-badge hb-hra-in" href={badge.href} style={delay(0)}>
              {badgeBody}
            </a>
          ) : (
            <p className="hb-hra-badge hb-hra-in" style={{ ...delay(0), margin: 0 }}>
              {badgeBody}
            </p>
          )
        ) : null}
        <Heading className="hb-hra-title">
          <span className="hb-hra-sr">{title}</span>
          <span aria-hidden="true">
            {words.map((word, i) => {
              const marked = start >= 0 && i >= start && i < start + marks.length;
              return (
                <React.Fragment key={i}>
                  {i > 0 ? " " : null}
                  <span
                    className="hb-hra-word"
                    data-hl={marked ? "" : undefined}
                    style={
                      {
                        "--hb-hra-w": i,
                        "--hb-hra-p0": marked ? `${(((i - start) / marks.length) * 100).toFixed(1)}%` : undefined,
                        "--hb-hra-p1": marked ? `${(((i - start + 1) / marks.length) * 100).toFixed(1)}%` : undefined,
                      } as React.CSSProperties
                    }
                  >
                    {word}
                  </span>
                </React.Fragment>
              );
            })}
          </span>
        </Heading>
        {subtitle ? (
          <p className="hb-hra-sub hb-hra-in" style={delay(base)}>
            {subtitle}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-hra-actions hb-hra-in" style={delay(base + 120)}>
            {primaryCta ? (
              <a className="hb-hra-btn" data-primary="" href={primaryCta.href}>
                {primaryCta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-hra-btn" href={secondaryCta.href}>
                <span className="hb-hra-play" aria-hidden="true">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4.5v15l13-7.5z" />
                  </svg>
                </span>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
        {proof ? (
          <div className="hb-hra-proof hb-hra-in" style={delay(base + 240)}>
            <span className="hb-hra-faces" aria-hidden="true">
              {faces.map((face) => (
                <span key={face.initials} className="hb-hra-face" style={{ background: face.color }}>
                  {face.initials}
                </span>
              ))}
            </span>
            <span className="hb-hra-proof-text">
              <span className="hb-hra-stars" role="img" aria-label="Rated 5 out of 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.8l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z" />
                  </svg>
                ))}
              </span>
              {proof}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
