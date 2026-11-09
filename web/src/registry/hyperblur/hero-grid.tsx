"use client";

import * as React from "react";

export interface HeroGridAction {
  label: string;
  href: string;
}

export interface HeroGridStat {
  value: string;
  label: string;
}

export interface HeroGridProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  command?: string;
  primaryCta?: HeroGridAction | null;
  secondaryCta?: HeroGridAction | null;
  stats?: HeroGridStat[];
  accent?: string;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-hrg {
  --hb-hrg-accent: #2f7bff;
  --hb-hrg-soft: color-mix(in srgb, var(--hb-hrg-accent) 55%, #ffffff);
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #030304;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hrg *, .hb-hrg *::before, .hb-hrg *::after { box-sizing: border-box; }
.hb-hrg-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.hb-hrg-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, .09) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(70% 55% at 50% 0%, #000 0%, transparent 80%);
  mask-image: radial-gradient(70% 55% at 50% 0%, #000 0%, transparent 80%);
}
.hb-hrg-floor {
  position: absolute;
  left: -60%;
  right: -60%;
  bottom: 0;
  height: 31%;
  overflow: hidden;
  perspective: 220px;
  perspective-origin: 50% 0%;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 40%);
  mask-image: linear-gradient(180deg, transparent 0%, #000 40%);
}
.hb-hrg-plane {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 320%;
  transform-origin: 50% 100%;
  transform: rotateX(76deg);
  background-image:
    linear-gradient(90deg, color-mix(in srgb, var(--hb-hrg-accent) 60%, transparent) 1px, transparent 1px),
    linear-gradient(0deg, color-mix(in srgb, var(--hb-hrg-accent) 60%, transparent) 1px, transparent 1px);
  background-size: 56px 56px;
  background-position: center bottom;
  opacity: .55;
  animation: hb-hrg-run 2.2s linear infinite;
  will-change: transform;
}
@keyframes hb-hrg-run {
  from { transform: rotateX(76deg) translate3d(0, 0, 0); }
  to { transform: rotateX(76deg) translate3d(0, 56px, 0); }
}
.hb-hrg-horizon {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 31%;
  height: 1px;
  background: linear-gradient(90deg, transparent 5%, var(--hb-hrg-accent) 30%, #ffffff 50%, var(--hb-hrg-accent) 70%, transparent 95%);
  opacity: .9;
}
.hb-hrg-glow {
  position: absolute;
  left: 50%;
  bottom: 31%;
  width: 90%;
  height: 280px;
  transform: translate(-50%, 50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-hrg-accent) 42%, transparent), transparent);
  animation: hb-hrg-pulse 6s ease-in-out infinite;
}
@keyframes hb-hrg-pulse {
  0%, 100% { opacity: .75; }
  50% { opacity: 1; }
}
.hb-hrg-sweep {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(31% - 1px);
  height: 3px;
  background: linear-gradient(90deg, transparent, #ffffff, transparent);
  background-size: 30% 100%;
  background-repeat: no-repeat;
  animation: hb-hrg-sweep 5s cubic-bezier(.6, 0, .4, 1) infinite;
  filter: drop-shadow(0 0 6px var(--hb-hrg-accent));
  opacity: .8;
}
@keyframes hb-hrg-sweep {
  from { background-position: -40% 0; }
  to { background-position: 140% 0; }
}
.hb-hrg-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  padding: clamp(56px, 8cqi, 84px) clamp(20px, 5cqi, 48px) clamp(48px, 6cqi, 64px);
  text-align: center;
}
.hb-hrg-in {
  animation: hb-hrg-up .7s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: var(--hb-hrg-i, 0ms);
}
@keyframes hb-hrg-up {
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-hrg-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  margin: 0;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 6px;
  background: rgba(255, 255, 255, .03);
  color: rgba(237, 237, 237, .7);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.hb-hrg-eyebrow span { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.hb-hrg-dot {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 0 3px rgba(52, 211, 153, .18);
}
.hb-hrg-title {
  max-width: 860px;
  margin: 24px 0 0;
  color: #f5f5f5;
  font-size: clamp(34px, 6.8cqi, 72px);
  font-weight: 650;
  line-height: 1.03;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-hrg-fade .5s ease both;
}
@keyframes hb-hrg-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
.hb-hrg-wd { display: inline-block; white-space: nowrap; }
.hb-hrg-ch { position: relative; display: inline-block; }
.hb-hrg-ch[data-g] { color: transparent; }
.hb-hrg-ch[data-g]::after {
  content: attr(data-g);
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  color: var(--hb-hrg-soft);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-weight: 500;
}
.hb-hrg-sub {
  max-width: 560px;
  margin: 20px 0 0;
  color: rgba(237, 237, 237, .6);
  font-size: clamp(15px, 1.9cqi, 17px);
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-hrg-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}
.hb-hrg-term {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  min-width: 0;
  padding: 0 5px 0 16px;
  border: 1px solid #262626;
  border-radius: 10px;
  background: rgba(10, 10, 12, .85);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, .02);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 14px;
}
.hb-hrg-prompt { color: var(--hb-hrg-accent); user-select: none; }
.hb-hrg-cmd {
  min-width: 0;
  overflow: hidden;
  color: #ededed;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hrg-caret {
  flex: none;
  width: 8px;
  height: 16px;
  margin-left: -4px;
  background: var(--hb-hrg-soft);
  animation: hb-hrg-blink 1.1s steps(1) infinite;
}
@keyframes hb-hrg-blink {
  50% { opacity: 0; }
}
.hb-hrg-copy {
  display: grid;
  flex: none;
  place-items: center;
  width: 36px;
  height: 36px;
  margin-left: auto;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: #a1a1a1;
  cursor: pointer;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.hb-hrg-copy:hover { background: rgba(255, 255, 255, .06); color: #ededed; border-color: rgba(255, 255, 255, .08); }
.hb-hrg-copy:focus-visible { outline: 2px solid var(--hb-hrg-accent); outline-offset: 2px; }
.hb-hrg-copy[data-done] { color: #34d399; }
.hb-hrg-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 10px;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 15px;
  font-weight: 550;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: background .2s ease, border-color .2s ease, transform .2s ease, box-shadow .2s ease;
}
.hb-hrg-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .26); }
.hb-hrg-btn:active { transform: scale(.98); }
.hb-hrg-btn:focus-visible { outline: 2px solid var(--hb-hrg-accent); outline-offset: 3px; }
.hb-hrg-btn[data-primary] {
  border-color: color-mix(in srgb, var(--hb-hrg-accent) 70%, #ffffff);
  background: var(--hb-hrg-accent);
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 10px 30px -10px var(--hb-hrg-accent);
}
.hb-hrg-btn[data-primary]:hover { background: color-mix(in srgb, var(--hb-hrg-accent) 85%, #ffffff); }
.hb-hrg-btn svg { flex: none; transition: transform .2s ease; }
.hb-hrg-btn:hover svg { transform: translateX(2px); }
.hb-hrg-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 44px 0 0;
  padding: 0;
  list-style: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
.hb-hrg-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 2px clamp(18px, 4cqi, 36px);
  border-left: 1px solid rgba(255, 255, 255, .1);
}
.hb-hrg-stat:first-child { border-left: 0; }
.hb-hrg-stat b { color: #f5f5f5; font-size: 20px; font-weight: 500; letter-spacing: -.02em; }
.hb-hrg-stat span { color: #8f8f8f; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
.hb-hrg-mark {
  position: absolute;
  width: 11px;
  height: 11px;
  color: rgba(255, 255, 255, .28);
}
.hb-hrg-mark::before, .hb-hrg-mark::after {
  content: "";
  position: absolute;
  background: currentColor;
}
.hb-hrg-mark::before { left: 5px; top: 0; width: 1px; height: 11px; }
.hb-hrg-mark::after { left: 0; top: 5px; width: 11px; height: 1px; }
.hb-hrg-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 640px) {
  .hb-hrg-actions { width: 100%; max-width: 420px; }
  .hb-hrg-term { flex: 1 1 100%; }
  .hb-hrg-btn { flex: 1 1 0; }
  .hb-hrg-mark { display: none; }
  .hb-hrg-stats { margin-top: 36px; }
  .hb-hrg-stat b { font-size: 17px; }
}
@container (max-width: 520px) {
  .hb-hrg-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); width: 100%; }
  .hb-hrg-stat { padding: 2px 8px; }
  .hb-hrg-stat span { font-size: 10px; letter-spacing: .05em; }
}
@container (max-width: 400px) {
  .hb-hrg-btn { flex: 1 1 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hrg-plane, .hb-hrg-glow, .hb-hrg-sweep, .hb-hrg-caret, .hb-hrg-in, .hb-hrg-title { animation: none; }
  .hb-hrg-btn, .hb-hrg-copy, .hb-hrg-btn svg { transition: none; }
}
`;

const glyphs = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=<>/";

function hash(n: number) {
  let x = Math.imul(n + 1, 374761393);
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  x ^= x >>> 16;
  return x >>> 0;
}

const defaultPrimary: HeroGridAction = { label: "Get started", href: "#" };
const defaultSecondary: HeroGridAction = { label: "Read the docs", href: "#" };
const defaultStats: HeroGridStat[] = [
  { value: "8 ms", label: "Cold start p50" },
  { value: "310", label: "Edge cities" },
  { value: "99.999%", label: "Uptime SLA" },
];

function delay(ms: number) {
  return { "--hb-hrg-i": `${ms}ms` } as React.CSSProperties;
}

export function HeroGrid({
  eyebrow = "v4.2 · Edge runtime is now generally available",
  title = "Deploy to the edge in a single command",
  subtitle = "Relay builds, ships and scales your functions across 310 cities. Push to main and your API is live everywhere in under ten seconds.",
  command = "npx shadcn@latest add https://hyperblur.dev/r/hero-grid.json",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  stats = defaultStats,
  accent = "#2f7bff",
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroGridProps) {
  const Heading = headingAs;
  const vars = { "--hb-hrg-accent": accent, ...style } as React.CSSProperties;
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const frame = React.useRef(0);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [copied, setCopied] = React.useState(false);

  const decode = React.useCallback(() => {
    const root = headingRef.current;
    if (!root || frame.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = Array.from(root.querySelectorAll<HTMLElement>(".hb-hrg-ch"));
    if (!chars.length) return;
    const begin = performance.now();
    const span = 1150;
    const step = span / chars.length;
    const tick = (now: number) => {
      const elapsed = now - begin;
      const round = Math.floor(elapsed / 48);
      let pending = false;
      chars.forEach((el, i) => {
        const settle = 160 + i * step + (hash(i * 13) % 140);
        if (elapsed >= settle) {
          if (el.hasAttribute("data-g")) el.removeAttribute("data-g");
        } else {
          pending = true;
          el.setAttribute("data-g", glyphs[hash(i * 31 + round * 7) % glyphs.length]);
        }
      });
      frame.current = pending ? requestAnimationFrame(tick) : 0;
    };
    frame.current = requestAnimationFrame(tick);
  }, []);

  React.useEffect(() => {
    const root = headingRef.current;
    decode();
    return () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      root?.querySelectorAll(".hb-hrg-ch").forEach((el) => el.removeAttribute("data-g"));
    };
  }, [decode, title]);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    const done = () => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    };
    if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(command).then(done, done);
    else done();
  };

  const words = title.split(/\s+/).filter(Boolean);

  return (
    <section className={`hb-hrg ${className}`} style={vars} {...rest}>
      <style href="hb-hero-grid" precedence="default">{css}</style>
      <div className="hb-hrg-bg" aria-hidden="true">
        <div className="hb-hrg-glow" />
        <div className="hb-hrg-floor">
          <div className="hb-hrg-plane" />
        </div>
        <div className="hb-hrg-horizon" />
        <div className="hb-hrg-sweep" />
      </div>
      <div className="hb-hrg-inner">
        <i className="hb-hrg-mark" style={{ left: 8, top: 24 }} aria-hidden="true" />
        <i className="hb-hrg-mark" style={{ right: 8, top: 24 }} aria-hidden="true" />
        {eyebrow ? (
          <p className="hb-hrg-eyebrow hb-hrg-in" style={delay(0)}>
            <i className="hb-hrg-dot" aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>
        ) : null}
        <Heading ref={headingRef} className="hb-hrg-title" onPointerEnter={decode}>
          <span className="hb-hrg-sr">{title}</span>
          <span aria-hidden="true">
            {words.map((word, w) => (
              <React.Fragment key={w}>
                {w > 0 ? " " : null}
                <span className="hb-hrg-wd">
                  {Array.from(word).map((char, c) => (
                    <span key={c} className="hb-hrg-ch">
                      {char}
                    </span>
                  ))}
                </span>
              </React.Fragment>
            ))}
          </span>
        </Heading>
        {subtitle ? (
          <p className="hb-hrg-sub hb-hrg-in" style={delay(250)}>
            {subtitle}
          </p>
        ) : null}
        <div className="hb-hrg-actions hb-hrg-in" style={delay(380)}>
          {command ? (
            <div className="hb-hrg-term">
              <span className="hb-hrg-prompt" aria-hidden="true">$</span>
              <code className="hb-hrg-cmd">{command}</code>
              <span className="hb-hrg-caret" aria-hidden="true" />
              <button type="button" className="hb-hrg-copy" onClick={copy} data-done={copied ? "" : undefined} aria-label={copied ? "Copied" : "Copy command"}>
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="11" height="11" rx="2.5" />
                    <path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9" />
                  </svg>
                )}
              </button>
              <span className="hb-hrg-sr" aria-live="polite">{copied ? "Command copied to clipboard" : ""}</span>
            </div>
          ) : null}
          {primaryCta ? (
            <a className="hb-hrg-btn" data-primary="" href={primaryCta.href}>
              {primaryCta.label}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          ) : null}
          {secondaryCta ? (
            <a className="hb-hrg-btn" href={secondaryCta.href}>
              {secondaryCta.label}
            </a>
          ) : null}
        </div>
        {stats.length > 0 ? (
          <ul className="hb-hrg-stats hb-hrg-in" style={delay(520)}>
            {stats.map((stat) => (
              <li key={stat.label} className="hb-hrg-stat">
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
