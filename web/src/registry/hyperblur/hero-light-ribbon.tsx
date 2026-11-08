"use client";

import * as React from "react";

export interface HeroLightRibbonAction {
  label: string;
  href: string;
}

export interface HeroLightRibbonStat {
  value: string;
  label: string;
}

export interface HeroLightRibbonProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroLightRibbonAction | null;
  secondaryCta?: HeroLightRibbonAction | null;
  stats?: HeroLightRibbonStat[];
  colors?: [string, string, string];
  strands?: number;
  speed?: number;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb11 {
  --hb-vb11-sp: 1;
  --hb-vb11-a: #ff7a45;
  --hb-vb11-b: #f43f5e;
  --hb-vb11-c: #8b5cf6;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 620px;
  padding: 64px clamp(20px, 6cqi, 72px) 34px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #070608;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vb11 *, .hb-vb11 *::before, .hb-vb11 *::after { box-sizing: border-box; }
.hb-vb11-art {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-vb11-flow {
  transform-box: view-box;
  transform-origin: 600px 380px;
  animation: hb-vb11-breathe calc(12s / var(--hb-vb11-sp)) cubic-bezier(.45, 0, .55, 1) infinite alternate;
}
@keyframes hb-vb11-breathe {
  from { transform: translate3d(0, 8px, 0) scaleY(.94) rotate(-.6deg); }
  to { transform: translate3d(0, -10px, 0) scaleY(1.06) rotate(.8deg); }
}
.hb-vb11-pulse {
  stroke-dasharray: 160 2200;
  animation: hb-vb11-run calc(var(--hb-vb11-dur) / var(--hb-vb11-sp)) cubic-bezier(.6, 0, .4, 1) infinite;
  animation-delay: var(--hb-vb11-del);
}
@keyframes hb-vb11-run {
  from { stroke-dashoffset: 2360; }
  to { stroke-dashoffset: 0; }
}
.hb-vb11-copy { position: relative; max-width: 560px; }
.hb-vb11-in { animation: hb-vb11-up .9s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb11-d, 0ms); }
@keyframes hb-vb11-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vb11-eyebrow { display: inline-flex; align-items: center; gap: 10px; margin: 0; color: rgba(237, 237, 237, .62); font-size: 13px; }
.hb-vb11-eyebrow b {
  padding: 3px 9px;
  border-radius: 6px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-vb11-a) 25%, transparent), color-mix(in srgb, var(--hb-vb11-c) 25%, transparent));
  color: #fff;
  font-size: 11.5px;
  font-weight: 600;
}
.hb-vb11-title {
  margin: 20px 0 0;
  color: #f7f7f7;
  font-size: clamp(38px, 6.2cqi, 68px);
  font-weight: 640;
  line-height: 1;
  letter-spacing: -.05em;
  text-wrap: balance;
}
.hb-vb11-title span {
  background: linear-gradient(90deg, var(--hb-vb11-a), var(--hb-vb11-b) 50%, var(--hb-vb11-c));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-vb11-sub { max-width: 460px; margin: 18px 0 0; color: rgba(237, 237, 237, .58); font-size: clamp(14.5px, 1.7cqi, 16.5px); line-height: 1.55; }
.hb-vb11-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
.hb-vb11-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 22px;
  overflow: hidden;
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
.hb-vb11-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .28); transform: translateY(-1px); }
.hb-vb11-btn:active { transform: scale(.98); }
.hb-vb11-btn:focus-visible { outline: 2px solid var(--hb-vb11-a); outline-offset: 3px; }
.hb-vb11-btn[data-primary] { border-color: transparent; background: #f7f7f7; color: #0a0a0a; }
.hb-vb11-btn[data-primary]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--hb-vb11-a), var(--hb-vb11-b), var(--hb-vb11-c));
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform .5s cubic-bezier(.16, 1, .3, 1);
}
.hb-vb11-btn[data-primary]:hover::after { transform: scaleX(1); }
.hb-vb11-stats { display: grid; grid-template-columns: repeat(var(--hb-vb11-n), minmax(0, 1fr)); gap: 24px; max-width: 620px; margin: 40px 0 0; padding: 0; list-style: none; }
.hb-vb11-stat { padding-left: 14px; border-left: 1px solid rgba(255, 255, 255, .12); }
.hb-vb11-stat b { display: block; color: #fafafa; font-family: var(--font-grotesk, inherit); font-size: clamp(20px, 2.6cqi, 26px); font-weight: 600; letter-spacing: -.03em; }
.hb-vb11-stat span { display: block; margin-top: 4px; color: rgba(237, 237, 237, .45); font-size: 12.5px; }
@container (max-width: 560px) {
  .hb-vb11-stats { grid-template-columns: 1fr; gap: 12px; }
  .hb-vb11-actions { flex-direction: column; align-items: stretch; }
  .hb-vb11-btn { justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb11-flow, .hb-vb11-in { animation: none; }
  .hb-vb11-pulse { display: none; }
  .hb-vb11-btn, .hb-vb11-btn[data-primary]::after { transition: none; }
}
`;

function strandPath(i: number, n: number) {
  const k = i - (n - 1) / 2;
  const y0 = 860 + k * 5;
  const c1y = 800 - k * 16;
  const c2y = 60 + k * 14;
  const y1 = 300 - k * 4;
  return `M -80 ${y0.toFixed(1)} C 320 ${c1y.toFixed(1)}, 720 ${c2y.toFixed(1)}, 1300 ${y1.toFixed(1)}`;
}

const defaultStats: HeroLightRibbonStat[] = [
  { value: "$4.2B", label: "Processed every month" },
  { value: "180 ms", label: "Median authorization" },
  { value: "46", label: "Countries with instant payouts" },
];

const defaultPrimary: HeroLightRibbonAction = { label: "Open an account", href: "#" };
const defaultSecondary: HeroLightRibbonAction = { label: "Read the API docs", href: "#" };

function d(ms: number) {
  return { "--hb-vb11-d": `${ms}ms` } as React.CSSProperties;
}

export function HeroLightRibbon({
  eyebrow = "Instant payouts are live",
  title = "Money that moves at the speed of light",
  subtitle = "Relay routes every payment over the fastest rail available, so your sellers get paid in seconds instead of days.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  stats = defaultStats,
  colors = ["#ff7a45", "#f43f5e", "#8b5cf6"],
  strands = 28,
  speed = 1,
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroLightRibbonProps) {
  const Heading = headingAs;
  const uid = React.useId().replace(/:/g, "");
  const n = Math.max(6, Math.min(60, Math.round(strands)));
  const vars = {
    "--hb-vb11-a": colors[0],
    "--hb-vb11-b": colors[1],
    "--hb-vb11-c": colors[2],
    "--hb-vb11-sp": Math.max(speed, 0.1),
    "--hb-vb11-n": Math.max(stats.length, 1),
    ...style,
  } as React.CSSProperties;
  const paths = Array.from({ length: n }, (_, i) => strandPath(i, n));
  const pulses = [Math.floor(n * 0.3), Math.floor(n * 0.5), Math.floor(n * 0.72)];
  const words = title.split(" ");
  const cut = Math.max(1, words.length - 3);

  return (
    <section className={`hb-vb11 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-light-ribbon" precedence="default">{css}</style>
      <svg className="hb-vb11-art" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={colors[0]} stopOpacity="0" />
            <stop offset=".25" stopColor={colors[0]} />
            <stop offset=".55" stopColor={colors[1]} />
            <stop offset=".85" stopColor={colors[2]} />
            <stop offset="1" stopColor={colors[2]} stopOpacity="0" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id={`${uid}-haze`} x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>
        <g className="hb-vb11-flow">
          <g filter={`url(#${uid}-haze)`} opacity=".55">
            {paths.filter((_, i) => i % 3 === 0).map((p, i) => (
              <path key={i} d={p} fill="none" stroke={`url(#${uid}-g)`} strokeWidth="18" />
            ))}
          </g>
          {paths.map((p, i) => {
            const center = 1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2);
            return <path key={i} d={p} fill="none" stroke={`url(#${uid}-g)`} strokeWidth={(0.6 + center * 0.9).toFixed(2)} opacity={(0.18 + center * 0.7).toFixed(2)} />;
          })}
          {pulses.map((index, j) => (
            <g key={j}>
              <path
                className="hb-vb11-pulse"
                d={paths[index]}
                fill="none"
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinecap="round"
                filter={`url(#${uid}-glow)`}
                style={{ "--hb-vb11-dur": `${5 + j * 1.6}s`, "--hb-vb11-del": `${-j * 1.9}s` } as React.CSSProperties}
              />
              <path
                className="hb-vb11-pulse"
                d={paths[index]}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinecap="round"
                style={{ "--hb-vb11-dur": `${5 + j * 1.6}s`, "--hb-vb11-del": `${-j * 1.9}s` } as React.CSSProperties}
              />
            </g>
          ))}
        </g>
      </svg>
      <div className="hb-vb11-copy">
        {eyebrow ? (
          <p className="hb-vb11-eyebrow hb-vb11-in" style={d(40)}>
            <b>New</b>
            {eyebrow}
          </p>
        ) : null}
        <Heading className="hb-vb11-title hb-vb11-in" style={d(130)}>
          {words.slice(0, cut).join(" ")} <span>{words.slice(cut).join(" ")}</span>
        </Heading>
        {subtitle ? (
          <p className="hb-vb11-sub hb-vb11-in" style={d(230)}>
            {subtitle}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-vb11-actions hb-vb11-in" style={d(330)}>
            {primaryCta ? (
              <a className="hb-vb11-btn" data-primary="" href={primaryCta.href}>
                {primaryCta.label}
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-vb11-btn" href={secondaryCta.href}>
                {secondaryCta.label}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      {stats.length ? (
        <ul className="hb-vb11-stats hb-vb11-in" style={d(450)}>
          {stats.map((stat) => (
            <li key={stat.label} className="hb-vb11-stat">
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
