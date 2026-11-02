"use client";

import * as React from "react";

export interface HeroProductAction {
  label: string;
  href: string;
}

export interface HeroProductProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: HeroProductAction | null;
  secondaryCta?: HeroProductAction | null;
  checks?: string[];
  logosLabel?: string;
  logos?: string[];
  accent?: string;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-hrp {
  --hb-hrp-accent: #2f7bff;
  --hb-hrp-soft: color-mix(in srgb, var(--hb-hrp-accent) 50%, #ffffff);
  --hb-hrp-x: 0;
  --hb-hrp-y: 0;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #08090b;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hrp *, .hb-hrp *::before, .hb-hrp *::after { box-sizing: border-box; }
.hb-hrp::before {
  content: "";
  position: absolute;
  right: -10%;
  top: -20%;
  z-index: -1;
  width: 70%;
  height: 110%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-hrp-accent) 20%, transparent), transparent);
  pointer-events: none;
}
.hb-hrp::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(80% 70% at 70% 40%, #000 0%, transparent 75%);
  mask-image: radial-gradient(80% 70% at 70% 40%, #000 0%, transparent 75%);
  pointer-events: none;
}
.hb-hrp-wrap {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(44px, 5.6cqi, 80px) clamp(20px, 5cqi, 56px) clamp(24px, 3cqi, 40px);
}
.hb-hrp-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
  align-items: center;
  gap: clamp(28px, 5cqi, 64px);
}
.hb-hrp-copy { min-width: 0; }
.hb-hrp-in {
  animation: hb-hrp-up .8s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: var(--hb-hrp-i, 0ms);
}
@keyframes hb-hrp-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-hrp-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  margin: 0;
  padding: 5px 12px 5px 6px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: rgba(237, 237, 237, .78);
  font-size: 12.5px;
  line-height: 1.2;
}
.hb-hrp-eyebrow b {
  padding: 3px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-hrp-accent) 20%, transparent);
  color: var(--hb-hrp-soft);
  font-size: 11px;
  font-weight: 600;
}
.hb-hrp-title {
  margin: 22px 0 0;
  color: #f5f5f5;
  font-size: clamp(34px, 4.9cqi, 62px);
  font-weight: 650;
  line-height: 1.04;
  letter-spacing: -.04em;
  text-wrap: balance;
}
.hb-hrp-hl {
  background: linear-gradient(100deg, var(--hb-hrp-soft), var(--hb-hrp-accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-hrp-sub {
  max-width: 470px;
  margin: 20px 0 0;
  color: rgba(237, 237, 237, .6);
  font-size: clamp(15px, 1.8cqi, 17px);
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-hrp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}
.hb-hrp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 12px;
  background: rgba(255, 255, 255, .03);
  color: #ededed;
  font: inherit;
  font-size: 15px;
  font-weight: 550;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: background .2s ease, border-color .2s ease, transform .2s ease, box-shadow .2s ease;
}
.hb-hrp-btn:hover { background: rgba(255, 255, 255, .07); border-color: rgba(255, 255, 255, .24); transform: translate3d(0, -1px, 0); }
.hb-hrp-btn:active { transform: scale(.98); }
.hb-hrp-btn:focus-visible { outline: 2px solid var(--hb-hrp-accent); outline-offset: 3px; }
.hb-hrp-btn[data-primary] {
  border-color: transparent;
  background: var(--hb-hrp-accent);
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .22), 0 12px 32px -12px var(--hb-hrp-accent);
}
.hb-hrp-btn[data-primary]:hover { background: color-mix(in srgb, var(--hb-hrp-accent) 86%, #ffffff); }
.hb-hrp-btn svg { flex: none; transition: transform .2s ease; }
.hb-hrp-btn:hover svg { transform: translateX(2px); }
.hb-hrp-checks {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
  color: rgba(237, 237, 237, .55);
  font-size: 13px;
}
.hb-hrp-checks li { display: inline-flex; align-items: center; gap: 7px; }
.hb-hrp-checks svg { flex: none; color: var(--hb-hrp-soft); }
.hb-hrp-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / .86;
  perspective: 1400px;
}
.hb-hrp-rig {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform: rotateY(calc(var(--hb-hrp-x) * 7deg)) rotateX(calc(var(--hb-hrp-y) * -6deg));
  transition: transform .7s cubic-bezier(.2, .7, .2, 1);
}
.hb-hrp-layer {
  position: absolute;
  transform: translate3d(calc(var(--hb-hrp-x) * var(--hb-hrp-d) * 9px), calc(var(--hb-hrp-y) * var(--hb-hrp-d) * 8px), calc(var(--hb-hrp-d) * 26px));
  transition: transform .7s cubic-bezier(.2, .7, .2, 1);
}
.hb-hrp-l0 { left: 0; top: 13%; width: 88%; height: 70%; }
.hb-hrp-l1 { right: 0; top: 2%; width: 42%; }
.hb-hrp-l2 { left: -4%; bottom: 0; width: 48%; }
.hb-hrp-l3 { right: -3%; bottom: 17%; width: 52%; }
.hb-hrp-float {
  animation: hb-hrp-float var(--hb-hrp-ft, 7s) ease-in-out infinite;
  animation-delay: var(--hb-hrp-fd, 0s);
}
@keyframes hb-hrp-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -9px, 0); }
}
.hb-hrp-pop {
  animation: hb-hrp-pop .9s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: var(--hb-hrp-pd, 0ms);
}
@keyframes hb-hrp-pop {
  from { opacity: 0; transform: translate3d(0, 18px, 0) scale(.96); }
  to { opacity: 1; transform: none; }
}
.hb-hrp-card {
  border: 1px solid rgba(255, 255, 255, .09);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(28, 29, 33, .92), rgba(18, 19, 22, .96));
  box-shadow: 0 30px 60px -24px rgba(0, 0, 0, .85), inset 0 1px 0 rgba(255, 255, 255, .05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.hb-hrp-win {
  overflow: hidden;
  border-radius: 16px;
  background: #0f1013;
}
.hb-hrp-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(255, 255, 255, .06);
}
.hb-hrp-bar i { width: 9px; height: 9px; border-radius: 50%; background: rgba(255, 255, 255, .13); }
.hb-hrp-url {
  margin: 0 auto;
  padding: 3px 14px;
  border-radius: 6px;
  background: rgba(255, 255, 255, .05);
  color: #8f8f8f;
  font-size: 10.5px;
}
.hb-hrp-body { display: flex; height: calc(100% - 34px); }
.hb-hrp-side {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 44px;
  padding: 14px 0;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, .05);
}
.hb-hrp-side i { width: 18px; height: 18px; border-radius: 6px; background: rgba(255, 255, 255, .07); }
.hb-hrp-side i:first-child { background: var(--hb-hrp-accent); }
.hb-hrp-pane { flex: 1; min-width: 0; padding: 16px 18px; }
.hb-hrp-label { color: #8f8f8f; font-size: 11px; }
.hb-hrp-big { margin-top: 4px; color: #f5f5f5; font-size: 24px; font-weight: 650; letter-spacing: -.03em; }
.hb-hrp-delta { display: inline-flex; align-items: center; gap: 4px; margin-left: 8px; color: #34d399; font-size: 11px; font-weight: 600; vertical-align: middle; letter-spacing: 0; }
.hb-hrp-chart { display: block; width: 100%; height: auto; margin-top: 12px; }
.hb-hrp-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: hb-hrp-draw 1.8s cubic-bezier(.4, 0, .2, 1) .5s forwards;
}
@keyframes hb-hrp-draw {
  to { stroke-dashoffset: 0; }
}
.hb-hrp-area { opacity: 0; animation: hb-hrp-fade 1s ease 1.4s forwards; }
@keyframes hb-hrp-fade {
  to { opacity: 1; }
}
.hb-hrp-axis { display: flex; justify-content: space-between; margin-top: 6px; color: #6b6b6b; font-size: 9.5px; }
.hb-hrp-rev { padding: 14px 16px; }
.hb-hrp-rev-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.hb-hrp-rev-top .hb-hrp-label { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.hb-hrp-chip {
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(52, 211, 153, .14);
  color: #34d399;
  font-size: 10.5px;
  font-weight: 600;
}
.hb-hrp-bars {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 46px;
  margin-top: 12px;
}
.hb-hrp-bars span {
  flex: 1;
  border-radius: 3px 3px 1px 1px;
  background: rgba(255, 255, 255, .12);
  transform-origin: bottom;
  animation: hb-hrp-grow .8s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(700ms + var(--hb-hrp-b) * 45ms);
}
.hb-hrp-bars span:last-child { background: var(--hb-hrp-accent); box-shadow: 0 0 14px -2px var(--hb-hrp-accent); }
@keyframes hb-hrp-grow {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
.hb-hrp-team { display: flex; align-items: center; gap: 12px; padding: 12px 14px; }
.hb-hrp-team-copy { flex: 1; min-width: 0; }
.hb-hrp-team-title { color: #ededed; font-size: 12.5px; font-weight: 600; white-space: nowrap; }
.hb-hrp-team-sub { display: flex; align-items: center; gap: 6px; margin-top: 3px; color: #8f8f8f; font-size: 11px; white-space: nowrap; }
.hb-hrp-live { width: 6px; height: 6px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 3px rgba(52, 211, 153, .2); animation: hb-hrp-blink 2s ease-in-out infinite; }
@keyframes hb-hrp-blink {
  50% { box-shadow: 0 0 0 5px rgba(52, 211, 153, .05); }
}
.hb-hrp-faces { display: flex; margin-top: 10px; }
.hb-hrp-face {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin-left: -7px;
  border: 2px solid #17181b;
  border-radius: 50%;
  color: #ffffff;
  font-size: 9.5px;
  font-weight: 650;
}
.hb-hrp-face:first-child { margin-left: 0; }
.hb-hrp-face[data-more] { background: #2a2b30; color: #a1a1a1; }
.hb-hrp-join {
  flex: none;
  padding: 7px 12px;
  border-radius: 8px;
  background: #f5f5f5;
  color: #0a0a0a;
  font-size: 11.5px;
  font-weight: 650;
}
.hb-hrp-note { display: flex; align-items: center; gap: 10px; padding: 11px 13px; }
.hb-hrp-ok {
  display: grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(52, 211, 153, .15);
  color: #34d399;
}
.hb-hrp-note-copy { flex: 1; min-width: 0; }
.hb-hrp-note-copy b { display: block; overflow: hidden; color: #ededed; font-size: 12px; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; }
.hb-hrp-note-copy span { display: block; margin-top: 2px; color: #8f8f8f; font-size: 10.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-hrp-time { flex: none; align-self: flex-start; color: #6b6b6b; font-size: 10px; }
.hb-hrp-logos {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px clamp(20px, 4cqi, 40px);
  margin-top: clamp(24px, 3cqi, 44px);
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, .07);
}
.hb-hrp-logos-label { color: #8f8f8f; font-size: 12.5px; white-space: nowrap; }
.hb-hrp-logos ul { display: contents; }
.hb-hrp-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #8f8f8f;
  font-size: 15px;
  font-weight: 650;
  letter-spacing: -.02em;
  list-style: none;
  transition: color .2s ease;
}
.hb-hrp-logo:hover { color: #ededed; }
.hb-hrp-logo svg { flex: none; }
@container (max-width: 760px) {
  .hb-hrp-main { grid-template-columns: minmax(0, 1fr); }
  .hb-hrp-stage { width: 100%; max-width: 520px; margin: 8px auto 0; }
  .hb-hrp-logos { justify-content: center; }
  .hb-hrp-logos-label { flex-basis: 100%; text-align: center; }
}
@container (max-width: 560px) {
  .hb-hrp-stage { aspect-ratio: 1 / .95; }
  .hb-hrp-l0 { width: 94%; top: 15%; height: 66%; }
  .hb-hrp-l1 { width: 50%; top: 0; }
  .hb-hrp-l2 { left: 0; width: 58%; }
  .hb-hrp-l3 { right: 0; bottom: 19%; width: 62%; }
}
@container (max-width: 440px) {
  .hb-hrp-actions { flex-direction: column; }
  .hb-hrp-btn { width: 100%; }
  .hb-hrp-big { font-size: 19px; }
  .hb-hrp-side { display: none; }
  .hb-hrp-team-sub, .hb-hrp-note-copy span { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hrp-in, .hb-hrp-float, .hb-hrp-pop, .hb-hrp-bars span, .hb-hrp-live { animation: none; }
  .hb-hrp-line { animation: none; stroke-dashoffset: 0; }
  .hb-hrp-area { animation: none; opacity: 1; }
  .hb-hrp-rig, .hb-hrp-layer { transform: none; transition: none; }
  .hb-hrp-btn, .hb-hrp-btn svg, .hb-hrp-logo { transition: none; }
}
`;

const linePoints = [62, 58, 64, 55, 60, 48, 52, 41, 45, 36, 39, 28, 31, 20];

function chartPath() {
  const step = 300 / (linePoints.length - 1);
  const pts = linePoints.map((y, i) => [i * step, y] as const);
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i += 1) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = ((x0 + x1) / 2).toFixed(1);
    d += ` C${cx} ${y0.toFixed(1)} ${cx} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  return d;
}

const line = chartPath();
const area = `${line} L300 96 L0 96 Z`;
const bars = [38, 52, 44, 61, 49, 70, 58, 66, 74, 63, 82, 100];

const team = [
  { initials: "EM", color: "#7c3aed" },
  { initials: "TO", color: "#0ea5e9" },
  { initials: "RK", color: "#f43f5e" },
  { initials: "LB", color: "#f59e0b" },
];

const logoShapes = [
  <circle key="a" cx="9" cy="9" r="7" fill="none" stroke="currentColor" strokeWidth="2.4" />,
  <path key="b" d="M9 2l7 13H2z" fill="currentColor" />,
  <path key="c" d="M2 2h6v6H2zM10 10h6v6h-6zM10 2h6v6h-6z" fill="currentColor" />,
  <path key="d" d="M2 9a7 7 0 0 1 14 0H9z" fill="currentColor" />,
  <path key="e" d="M3 15V3l12 12V3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />,
  <path key="f" d="M9 1.5l2.2 5.3 5.3 2.2-5.3 2.2L9 16.5l-2.2-5.3L1.5 9l5.3-2.2z" fill="currentColor" />,
];

const defaultPrimary: HeroProductAction = { label: "Open an account", href: "#" };
const defaultSecondary: HeroProductAction = { label: "Talk to sales", href: "#" };
const defaultChecks = ["Free for 30 days", "No setup fees", "SOC 2 Type II"];
const defaultLogos = ["Kestrel", "Orbital", "Fathom", "Halcyon", "Quanta", "Northway"];

function delay(ms: number) {
  return { "--hb-hrp-i": `${ms}ms` } as React.CSSProperties;
}

function layer(depth: number) {
  return { "--hb-hrp-d": depth } as React.CSSProperties;
}

export function HeroProduct({
  eyebrow = "Bill pay with approvals is live",
  title = "Your company's money, finally in one place",
  highlight = "in one place",
  subtitle = "Cards, bills, payroll and real-time reporting in a single workspace. Close the books in hours instead of weeks.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  checks = defaultChecks,
  logosLabel = "Trusted by finance teams at",
  logos = defaultLogos,
  accent = "#2f7bff",
  headingAs = "h1",
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: HeroProductProps) {
  const Heading = headingAs;
  const rootRef = React.useRef<HTMLElement>(null);
  const vars = { "--hb-hrp-accent": accent, ...style } as React.CSSProperties;
  const at = highlight ? title.indexOf(highlight) : -1;
  const fillId = `hb-hrp-g${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const move = (event: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(event);
    const el = rootRef.current;
    if (!el || event.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.setProperty("--hb-hrp-x", x.toFixed(3));
    el.style.setProperty("--hb-hrp-y", y.toFixed(3));
  };

  const leave = (event: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(event);
    rootRef.current?.style.setProperty("--hb-hrp-x", "0");
    rootRef.current?.style.setProperty("--hb-hrp-y", "0");
  };

  return (
    <section ref={rootRef} className={`hb-hrp ${className}`} style={vars} onPointerMove={move} onPointerLeave={leave} {...rest}>
      <style href="hb-hero-product" precedence="default">{css}</style>
      <div className="hb-hrp-wrap">
        <div className="hb-hrp-main">
          <div className="hb-hrp-copy">
            {eyebrow ? (
              <p className="hb-hrp-eyebrow hb-hrp-in" style={delay(0)}>
                <b>New</b>
                {eyebrow}
              </p>
            ) : null}
            <Heading className="hb-hrp-title hb-hrp-in" style={delay(90)}>
              {at >= 0 ? (
                <>
                  {title.slice(0, at)}
                  <span className="hb-hrp-hl">{highlight}</span>
                  {title.slice(at + highlight.length)}
                </>
              ) : (
                title
              )}
            </Heading>
            {subtitle ? (
              <p className="hb-hrp-sub hb-hrp-in" style={delay(180)}>
                {subtitle}
              </p>
            ) : null}
            {primaryCta || secondaryCta ? (
              <div className="hb-hrp-actions hb-hrp-in" style={delay(270)}>
                {primaryCta ? (
                  <a className="hb-hrp-btn" data-primary="" href={primaryCta.href}>
                    {primaryCta.label}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                ) : null}
                {secondaryCta ? (
                  <a className="hb-hrp-btn" href={secondaryCta.href}>
                    {secondaryCta.label}
                  </a>
                ) : null}
              </div>
            ) : null}
            {checks.length > 0 ? (
              <ul className="hb-hrp-checks hb-hrp-in" style={delay(360)}>
                {checks.map((item) => (
                  <li key={item}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="hb-hrp-stage" aria-hidden="true">
            <div className="hb-hrp-rig">
              <div className="hb-hrp-layer hb-hrp-l0" style={layer(0)}>
                <div className="hb-hrp-pop" style={{ height: "100%", "--hb-hrp-pd": "200ms" } as React.CSSProperties}>
                  <div className="hb-hrp-card hb-hrp-win" style={{ height: "100%" }}>
                    <div className="hb-hrp-bar">
                      <i />
                      <i />
                      <i />
                      <span className="hb-hrp-url">app.ledgerly.com/overview</span>
                    </div>
                    <div className="hb-hrp-body">
                      <div className="hb-hrp-side">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className="hb-hrp-pane">
                        <div className="hb-hrp-label">Cash balance</div>
                        <div className="hb-hrp-big">
                          $1,842,560
                          <span className="hb-hrp-delta">+8.2%</span>
                        </div>
                        <svg className="hb-hrp-chart" viewBox="0 0 300 100">
                          <defs>
                            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0" style={{ stopColor: "var(--hb-hrp-accent)", stopOpacity: 0.35 }} />
                              <stop offset="1" style={{ stopColor: "var(--hb-hrp-accent)", stopOpacity: 0 }} />
                            </linearGradient>
                          </defs>
                          {[24, 48, 72].map((y) => (
                            <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,.05)" strokeWidth="1" />
                          ))}
                          <path className="hb-hrp-area" d={area} fill={`url(#${fillId})`} />
                          <path className="hb-hrp-line" d={line} pathLength={1} fill="none" style={{ stroke: "var(--hb-hrp-accent)" }} strokeWidth="2.4" strokeLinecap="round" />
                        </svg>
                        <div className="hb-hrp-axis">
                          <span>May</span>
                          <span>Jun</span>
                          <span>Jul</span>
                          <span>Aug</span>
                          <span>Sep</span>
                          <span>Oct</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hb-hrp-layer hb-hrp-l1" style={layer(2)}>
                <div className="hb-hrp-pop" style={{ "--hb-hrp-pd": "450ms" } as React.CSSProperties}>
                  <div className="hb-hrp-float" style={{ "--hb-hrp-ft": "7s", "--hb-hrp-fd": "-2s" } as React.CSSProperties}>
                    <div className="hb-hrp-card hb-hrp-rev">
                      <div className="hb-hrp-rev-top">
                        <span className="hb-hrp-label">Revenue · Oct</span>
                        <span className="hb-hrp-chip">+12.4%</span>
                      </div>
                      <div className="hb-hrp-big" style={{ fontSize: 20 }}>$84,210</div>
                      <div className="hb-hrp-bars">
                        {bars.map((h, i) => (
                          <span key={i} style={{ height: `${h}%`, "--hb-hrp-b": i } as React.CSSProperties} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hb-hrp-layer hb-hrp-l2" style={layer(3)}>
                <div className="hb-hrp-pop" style={{ "--hb-hrp-pd": "650ms" } as React.CSSProperties}>
                  <div className="hb-hrp-float" style={{ "--hb-hrp-ft": "8s", "--hb-hrp-fd": "-5s" } as React.CSSProperties}>
                    <div className="hb-hrp-card hb-hrp-team">
                      <div className="hb-hrp-team-copy">
                        <div className="hb-hrp-team-title">Month-end review</div>
                        <div className="hb-hrp-team-sub">
                          <i className="hb-hrp-live" />4 people in the call
                        </div>
                        <div className="hb-hrp-faces">
                          {team.map((face) => (
                            <span key={face.initials} className="hb-hrp-face" style={{ background: face.color }}>
                              {face.initials}
                            </span>
                          ))}
                          <span className="hb-hrp-face" data-more="">+3</span>
                        </div>
                      </div>
                      <span className="hb-hrp-join">Join</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hb-hrp-layer hb-hrp-l3" style={layer(4)}>
                <div className="hb-hrp-pop" style={{ "--hb-hrp-pd": "900ms" } as React.CSSProperties}>
                  <div className="hb-hrp-float" style={{ "--hb-hrp-ft": "6s", "--hb-hrp-fd": "-1s" } as React.CSSProperties}>
                    <div className="hb-hrp-card hb-hrp-note">
                      <span className="hb-hrp-ok">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </span>
                      <span className="hb-hrp-note-copy">
                        <b>Invoice #2041 paid</b>
                        <span>Northwind Labs · $12,400</span>
                      </span>
                      <span className="hb-hrp-time">now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {logos.length > 0 ? (
          <div className="hb-hrp-logos hb-hrp-in" style={delay(480)}>
            {logosLabel ? <span className="hb-hrp-logos-label">{logosLabel}</span> : null}
            <ul>
              {logos.map((name, i) => (
                <li key={name} className="hb-hrp-logo">
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    {logoShapes[i % logoShapes.length]}
                  </svg>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
