"use client";

import * as React from "react";

export interface HeroAuroraLitAction {
  label: string;
  href: string;
}

export interface HeroAuroraLitProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroAuroraLitAction | null;
  secondaryCta?: HeroAuroraLitAction | null;
  colors?: [string, string, string];
  reflection?: boolean;
  speed?: number;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb10 {
  --hb-vb10-a: #34f5c5;
  --hb-vb10-b: #3b82f6;
  --hb-vb10-c: #c026d3;
  --hb-vb10-sp: 1;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 620px;
  padding: 60px clamp(18px, 5cqi, 48px) 56px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #030304;
  color: #ededed;
  font-family: inherit;
  text-align: center;
  -webkit-font-smoothing: antialiased;
}
.hb-vb10 *, .hb-vb10 *::before, .hb-vb10 *::after { box-sizing: border-box; }
.hb-vb10-sky {
  position: absolute;
  left: 50%;
  top: 38%;
  z-index: -2;
  width: min(1100px, 130%);
  height: 340px;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.hb-vb10-veil {
  position: absolute;
  border-radius: 50%;
  filter: blur(46px);
  mix-blend-mode: screen;
  animation: hb-vb10-drift calc(var(--hb-vb10-dur) / var(--hb-vb10-sp)) cubic-bezier(.45, 0, .55, 1) infinite alternate;
  animation-delay: var(--hb-vb10-del);
}
.hb-vb10-veil:nth-child(1) { left: 6%; top: 18%; width: 52%; height: 64%; background: radial-gradient(closest-side, var(--hb-vb10-a), transparent); --hb-vb10-dur: 11s; --hb-vb10-del: -2s; --hb-vb10-tx: 12%; }
.hb-vb10-veil:nth-child(2) { left: 32%; top: 6%; width: 46%; height: 80%; background: radial-gradient(closest-side, var(--hb-vb10-b), transparent); --hb-vb10-dur: 14s; --hb-vb10-del: -6s; --hb-vb10-tx: -10%; }
.hb-vb10-veil:nth-child(3) { left: 52%; top: 22%; width: 42%; height: 60%; background: radial-gradient(closest-side, var(--hb-vb10-c), transparent); --hb-vb10-dur: 12s; --hb-vb10-del: -4s; --hb-vb10-tx: -14%; }
.hb-vb10-veil:nth-child(4) { left: 24%; top: 34%; width: 50%; height: 34%; background: radial-gradient(closest-side, #ffffff, transparent); opacity: .55; --hb-vb10-dur: 9s; --hb-vb10-del: -1s; --hb-vb10-tx: 8%; }
@keyframes hb-vb10-drift {
  from { transform: translate3d(0, 0, 0) scale(1, 1); }
  to { transform: translate3d(var(--hb-vb10-tx), -6%, 0) scale(1.15, .85); }
}
.hb-vb10-curtain {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(90deg, rgba(3, 3, 4, 0) 0 22px, rgba(3, 3, 4, .35) 22px 26px);
  -webkit-mask-image: linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent);
  mask-image: linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent);
  animation: hb-vb10-curtain calc(20s / var(--hb-vb10-sp)) linear infinite;
}
@keyframes hb-vb10-curtain {
  to { background-position: 260px 0; }
}
.hb-vb10-stars {
  position: absolute;
  inset: 0;
  z-index: -3;
  background-image:
    radial-gradient(1px 1px at 12% 18%, rgba(255, 255, 255, .7), transparent),
    radial-gradient(1px 1px at 28% 72%, rgba(255, 255, 255, .5), transparent),
    radial-gradient(1px 1px at 44% 12%, rgba(255, 255, 255, .6), transparent),
    radial-gradient(1px 1px at 63% 82%, rgba(255, 255, 255, .45), transparent),
    radial-gradient(1px 1px at 78% 22%, rgba(255, 255, 255, .7), transparent),
    radial-gradient(1px 1px at 90% 64%, rgba(255, 255, 255, .5), transparent),
    radial-gradient(1.5px 1.5px at 6% 52%, rgba(255, 255, 255, .6), transparent),
    radial-gradient(1.5px 1.5px at 84% 46%, rgba(255, 255, 255, .55), transparent);
  pointer-events: none;
}
.hb-vb10-in { animation: hb-vb10-up 1s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb10-d, 0ms); }
@keyframes hb-vb10-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vb10-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: rgba(237, 237, 237, .6);
  font-size: 12.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-vb10-eyebrow::before, .hb-vb10-eyebrow::after { content: ""; width: 24px; height: 1px; background: linear-gradient(90deg, transparent, rgba(237, 237, 237, .4)); }
.hb-vb10-eyebrow::after { transform: scaleX(-1); }
.hb-vb10-word {
  position: relative;
  margin: 0;
  font-family: var(--font-grotesk, inherit);
  font-size: clamp(54px, 12cqi, 156px);
  font-weight: 700;
  line-height: .92;
  letter-spacing: -.055em;
  text-wrap: balance;
}
.hb-vb10-title {
  width: 100%;
  max-width: 1000px;
  margin-top: 22px;
  background: linear-gradient(180deg, #3a3d4a 0%, #101015 34%, #050507 70%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter:
    drop-shadow(0 -1px 0 color-mix(in srgb, var(--hb-vb10-a) 70%, #ffffff))
    drop-shadow(0 0 18px color-mix(in srgb, var(--hb-vb10-b) 55%, transparent))
    drop-shadow(0 0 48px color-mix(in srgb, var(--hb-vb10-a) 30%, transparent));
}
.hb-vb10-mwrap {
  width: 100%;
  max-width: 1000px;
  height: .6em;
  margin-top: 4px;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
}
.hb-vb10-mirror {
  margin: 0;
  background: linear-gradient(0deg, #2a2d38 0%, #08080a 40%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transform: scaleY(-1);
  opacity: .5;
  filter: blur(1.5px) drop-shadow(0 0 18px color-mix(in srgb, var(--hb-vb10-b) 40%, transparent));
  -webkit-mask-image: linear-gradient(0deg, rgba(0, 0, 0, .9), transparent 42%);
  mask-image: linear-gradient(0deg, rgba(0, 0, 0, .9), transparent 42%);
}
.hb-vb10-horizon {
  width: min(760px, 90%);
  height: 1px;
  margin-top: -2px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-vb10-a) 60%, #ffffff), color-mix(in srgb, var(--hb-vb10-b) 70%, transparent), transparent);
  box-shadow: 0 0 24px 2px color-mix(in srgb, var(--hb-vb10-b) 40%, transparent);
}
.hb-vb10-sub { max-width: 520px; margin: 26px 0 0; color: rgba(237, 237, 237, .58); font-size: clamp(14.5px, 1.7cqi, 16.5px); line-height: 1.6; }
.hb-vb10-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 26px; }
.hb-vb10-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
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
  transition: transform .25s cubic-bezier(.2, .8, .2, 1), background .25s ease, border-color .25s ease, box-shadow .3s ease;
}
.hb-vb10-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .28); transform: translateY(-1px); }
.hb-vb10-btn:active { transform: scale(.98); }
.hb-vb10-btn:focus-visible { outline: 2px solid var(--hb-vb10-a); outline-offset: 3px; }
.hb-vb10-btn[data-primary] { border-color: transparent; background: #f5f5f5; color: #050507; box-shadow: 0 0 0 1px rgba(255, 255, 255, .2), 0 0 40px -8px color-mix(in srgb, var(--hb-vb10-a) 70%, transparent); }
.hb-vb10-btn[data-primary]:hover { background: #ffffff; box-shadow: 0 0 0 1px rgba(255, 255, 255, .3), 0 0 56px -6px color-mix(in srgb, var(--hb-vb10-a) 80%, transparent); }
@container (max-width: 480px) {
  .hb-vb10-actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 320px; }
  .hb-vb10-btn { justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb10-veil, .hb-vb10-curtain, .hb-vb10-in { animation: none; }
  .hb-vb10-btn { transition: none; }
}
`;

const defaultPrimary: HeroAuroraLitAction = { label: "Download for Mac", href: "#" };
const defaultSecondary: HeroAuroraLitAction = { label: "Read the manifesto", href: "#" };

function d(ms: number) {
  return { "--hb-vb10-d": `${ms}ms` } as React.CSSProperties;
}

export function HeroAuroraLit({
  eyebrow = "Nocturne for Mac and iPad",
  title = "Write in the quiet hours",
  subtitle = "A calm writing space with a night palette tuned for tired eyes, timed focus sessions and private sync across your devices.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  colors = ["#34f5c5", "#3b82f6", "#c026d3"],
  reflection = true,
  speed = 1,
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroAuroraLitProps) {
  const Heading = headingAs;
  const vars = {
    "--hb-vb10-a": colors[0],
    "--hb-vb10-b": colors[1],
    "--hb-vb10-c": colors[2],
    "--hb-vb10-sp": Math.max(speed, 0.1),
    ...style,
  } as React.CSSProperties;

  return (
    <section className={`hb-vb10 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-aurora-lit" precedence="default">{css}</style>
      <div className="hb-vb10-stars" aria-hidden="true" />
      <div className="hb-vb10-sky" aria-hidden="true">
        <span className="hb-vb10-veil" />
        <span className="hb-vb10-veil" />
        <span className="hb-vb10-veil" />
        <span className="hb-vb10-veil" />
        <span className="hb-vb10-curtain" />
      </div>
      {eyebrow ? (
        <p className="hb-vb10-eyebrow hb-vb10-in" style={d(60)}>
          {eyebrow}
        </p>
      ) : null}
      <Heading className="hb-vb10-word hb-vb10-title hb-vb10-in" style={d(160)}>
        {title}
      </Heading>
      {reflection ? (
        <>
          <div className="hb-vb10-word hb-vb10-mwrap hb-vb10-in" style={d(260)} aria-hidden="true">
            <p className="hb-vb10-mirror">{title}</p>
          </div>
          <span className="hb-vb10-horizon hb-vb10-in" style={d(320)} aria-hidden="true" />
        </>
      ) : null}
      {subtitle ? (
        <p className="hb-vb10-sub hb-vb10-in" style={d(380)}>
          {subtitle}
        </p>
      ) : null}
      {primaryCta || secondaryCta ? (
        <div className="hb-vb10-actions hb-vb10-in" style={d(460)}>
          {primaryCta ? (
            <a className="hb-vb10-btn" data-primary="" href={primaryCta.href}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
              </svg>
              {primaryCta.label}
            </a>
          ) : null}
          {secondaryCta ? (
            <a className="hb-vb10-btn" href={secondaryCta.href}>
              {secondaryCta.label}
            </a>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
