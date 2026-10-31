"use client";

import * as React from "react";

export interface HeroSectionAction {
  label: string;
  href: string;
}

export interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primary?: HeroSectionAction | null;
  secondary?: HeroSectionAction | null;
  trust?: string[];
  accent?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

const css = `
@keyframes hb-hs-up {
  from { opacity: 0; transform: translate3d(0, 18px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-hs {
  --hb-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  padding: 96px 24px 80px;
  background: #0a0a0a;
  color: #f2f2f5;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.hb-hs *, .hb-hs *::before, .hb-hs *::after { box-sizing: border-box; }
.hb-hs::before {
  content: "";
  position: absolute;
  top: -240px;
  left: 50%;
  width: 900px;
  height: 520px;
  transform: translateX(-50%);
  pointer-events: none;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-accent) 28%, transparent), transparent);
  opacity: .7;
}
.hb-hs-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1080px;
  margin: 0 auto;
  text-align: center;
}
.hb-hs[data-align="left"] .hb-hs-inner { align-items: stretch; text-align: left; }
.hb-hs-a {
  animation: hb-hs-up .7s cubic-bezier(.22, .8, .24, 1) both;
  animation-delay: calc(var(--hb-i, 0) * 90ms);
}
.hb-hs-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: center;
  margin: 0 0 24px;
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  color: rgba(255, 255, 255, .75);
  font-size: 13px;
  line-height: 1.2;
}
.hb-hs[data-align="left"] .hb-hs-eyebrow { align-self: flex-start; }
.hb-hs-eyebrow::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-accent);
  box-shadow: 0 0 10px var(--hb-accent);
}
.hb-hs-title {
  max-width: 820px;
  margin: 0;
  font-size: clamp(36px, 6.2vw, 68px);
  font-weight: 700;
  line-height: 1.06;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-hs-mark {
  background: linear-gradient(100deg, var(--hb-accent), color-mix(in srgb, var(--hb-accent) 55%, #ffffff));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-hs-sub {
  max-width: 600px;
  margin: 22px 0 0;
  color: rgba(255, 255, 255, .62);
  font-size: clamp(16px, 2vw, 19px);
  line-height: 1.55;
  text-wrap: pretty;
}
.hb-hs-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
.hb-hs[data-align="left"] .hb-hs-actions { justify-content: flex-start; }
.hb-hs-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 24px;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 999px;
  background: transparent;
  color: #f2f2f5;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition: transform .2s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.hb-hs-btn:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .35); transform: translate3d(0, -1px, 0); }
.hb-hs-btn:focus-visible { outline: 2px solid var(--hb-accent); outline-offset: 3px; }
.hb-hs-btn[data-primary="true"] {
  border-color: var(--hb-accent);
  background: var(--hb-accent);
  color: #fff;
  box-shadow: 0 8px 28px -8px var(--hb-accent);
}
.hb-hs-btn[data-primary="true"]:hover { background: color-mix(in srgb, var(--hb-accent) 82%, #ffffff); border-color: transparent; }
.hb-hs-trust {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 22px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
  color: rgba(255, 255, 255, .55);
  font-size: 13px;
}
.hb-hs[data-align="left"] .hb-hs-trust { justify-content: flex-start; }
.hb-hs-trust li { display: inline-flex; align-items: center; gap: 7px; }
.hb-hs-trust svg { flex: none; color: var(--hb-accent); }
.hb-hs-panel {
  position: relative;
  width: 100%;
  max-width: 960px;
  aspect-ratio: 16 / 9;
  margin: 64px auto 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 20px;
  background:
    radial-gradient(60% 70% at 50% 0%, color-mix(in srgb, var(--hb-accent) 16%, transparent), transparent 70%),
    #0e0e11;
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, .9), 0 0 0 1px rgba(255, 255, 255, .02) inset;
}
.hb-hs[data-align="left"] .hb-hs-panel { margin-left: 0; margin-right: 0; max-width: none; }
.hb-hs-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, .05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .05) 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 30%, transparent 85%);
  mask-image: radial-gradient(ellipse at 50% 40%, #000 30%, transparent 85%);
}
.hb-hs-bar {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 7px;
  padding: 14px 16px;
}
.hb-hs-bar i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255, 255, 255, .14); }
.hb-hs-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
}
.hb-hs-content > img,
.hb-hs-content > video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (max-width: 767px) {
  .hb-hs { padding: 64px 20px 56px; }
  .hb-hs::before { width: 560px; height: 360px; top: -180px; }
  .hb-hs-actions { flex-direction: column; align-items: stretch; width: 100%; }
  .hb-hs-btn { width: 100%; }
  .hb-hs-panel { aspect-ratio: 4 / 3; margin-top: 44px; border-radius: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hs-a { animation: none; }
  .hb-hs-btn { transition: none; }
  .hb-hs-btn:hover { transform: none; }
}
`;

const defaultPrimary: HeroSectionAction = { label: "Start building", href: "#" };
const defaultSecondary: HeroSectionAction = { label: "Book a demo", href: "#" };
const defaultTrust = ["No credit card", "Cancel anytime", "Free for 14 days"];

function delay(index: number) {
  return { "--hb-i": index } as React.CSSProperties;
}

export function HeroSection({
  eyebrow = "Now in public beta",
  title = "Ship interfaces that feel alive",
  highlight = "alive",
  subtitle = "A fast, opinionated toolkit for designing, building and shipping polished product experiences, without the busywork.",
  primary = defaultPrimary,
  secondary = defaultSecondary,
  trust = defaultTrust,
  accent = "#2f7bff",
  align = "center",
  children,
  className = "",
  style,
  ...rest
}: HeroSectionProps) {
  const vars = { "--hb-accent": accent, ...style } as React.CSSProperties;
  const at = highlight ? title.indexOf(highlight) : -1;

  return (
    <section className={`hb-hs ${className}`} data-align={align === "left" ? "left" : "center"} style={vars} {...rest}>
      <style href="hb-hero-section" precedence="default">{css}</style>
      <div className="hb-hs-inner">
        {eyebrow ? (
          <p className="hb-hs-eyebrow hb-hs-a" style={delay(0)}>
            {eyebrow}
          </p>
        ) : null}
        <h2 className="hb-hs-title hb-hs-a" style={delay(1)}>
          {at >= 0 ? (
            <>
              {title.slice(0, at)}
              <span className="hb-hs-mark">{highlight}</span>
              {title.slice(at + highlight.length)}
            </>
          ) : (
            title
          )}
        </h2>
        {subtitle ? (
          <p className="hb-hs-sub hb-hs-a" style={delay(2)}>
            {subtitle}
          </p>
        ) : null}
        {primary || secondary ? (
          <div className="hb-hs-actions hb-hs-a" style={delay(3)}>
            {primary ? (
              <a className="hb-hs-btn" data-primary="true" href={primary.href}>
                {primary.label}
              </a>
            ) : null}
            {secondary ? (
              <a className="hb-hs-btn" href={secondary.href}>
                {secondary.label}
              </a>
            ) : null}
          </div>
        ) : null}
        {trust.length > 0 ? (
          <ul className="hb-hs-trust hb-hs-a" style={delay(4)}>
            {trust.map((item) => (
              <li key={item}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="hb-hs-panel hb-hs-a" style={delay(5)}>
          <div className="hb-hs-bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          {children != null ? <div className="hb-hs-content">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
