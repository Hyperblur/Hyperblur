"use client";

import * as React from "react";

export interface HeroKineticAction {
  label: string;
  href: string;
}

export interface HeroKineticProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  lines?: [string, string, string];
  subtitle?: string;
  meta?: string[];
  primaryCta?: HeroKineticAction | null;
  secondaryCta?: HeroKineticAction | null;
  accent?: string;
  speed?: number;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb4 {
  --hb-vb4-accent: #c8ff3d;
  --hb-vb4-sp: 1;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 620px;
  padding: 22px clamp(18px, 4cqi, 44px) 30px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0b0b0b;
  color: #f2f2ee;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vb4 *, .hb-vb4 *::before, .hb-vb4 *::after { box-sizing: border-box; }
.hb-vb4-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 20px;
  margin: 0;
  padding: 0 0 14px;
  border-bottom: 1px solid rgba(242, 242, 238, .12);
  color: rgba(242, 242, 238, .55);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: .06em;
  text-transform: uppercase;
  list-style: none;
}
.hb-vb4-meta li:first-child { color: #f2f2ee; }
.hb-vb4-meta li:first-child::before {
  content: "";
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 50%;
  background: var(--hb-vb4-accent);
  box-shadow: 0 0 10px var(--hb-vb4-accent);
  vertical-align: 1px;
}
.hb-vb4-title {
  display: flex;
  flex-direction: column;
  margin: 18px 0 0;
  font-family: var(--font-grotesk, inherit);
  font-size: clamp(64px, 15.5cqi, 200px);
  font-weight: 700;
  line-height: .84;
  letter-spacing: -.055em;
  text-transform: uppercase;
}
.hb-vb4-row { display: flex; align-items: flex-end; height: .88em; white-space: nowrap; }
.hb-vb4-row[data-mode="wave"] .hb-vb4-ch {
  display: inline-block;
  transform-origin: 50% 100%;
  animation: hb-vb4-eq calc(2.4s / var(--hb-vb4-sp)) cubic-bezier(.65, 0, .35, 1) infinite;
  animation-delay: calc(var(--hb-vb4-i) * 110ms);
}
@keyframes hb-vb4-eq {
  0%, 100% { transform: scaleY(1); }
  45% { transform: scaleY(.42); }
  60% { transform: scaleY(1.06); }
}
.hb-vb4-row[data-mode="slide"] { position: relative; overflow: hidden; margin: 0 calc(clamp(18px, 4cqi, 44px) * -1); }
.hb-vb4-track {
  display: flex;
  flex: none;
  animation: hb-vb4-slide calc(16s / var(--hb-vb4-sp)) linear infinite;
}
.hb-vb4-track span {
  flex: none;
  padding-right: .3em;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(242, 242, 238, .7);
}
.hb-vb4-track span:nth-child(odd) { -webkit-text-stroke-color: var(--hb-vb4-accent); }
@keyframes hb-vb4-slide {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
.hb-vb4-row[data-mode="sweep"] { perspective: 600px; }
.hb-vb4-row[data-mode="sweep"] .hb-vb4-ch {
  display: inline-block;
  animation: hb-vb4-sweep calc(3.6s / var(--hb-vb4-sp)) cubic-bezier(.65, 0, .35, 1) infinite;
  animation-delay: calc(var(--hb-vb4-i) * 90ms);
  transition: transform .7s cubic-bezier(.34, 1.56, .64, 1);
}
.hb-vb4-row[data-mode="sweep"] .hb-vb4-ch:hover { transform: rotateX(360deg); }
@keyframes hb-vb4-sweep {
  0%, 30%, 100% { color: #f2f2ee; }
  12% { color: var(--hb-vb4-accent); }
}
.hb-vb4-in { animation: hb-vb4-rise 1s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb4-d, 0ms); }
.hb-vb4-row.hb-vb4-in { animation-name: hb-vb4-mask; }
@keyframes hb-vb4-rise {
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-vb4-mask {
  from { clip-path: inset(100% -10% -20% -10%); transform: translate3d(0, .2em, 0); }
  to { clip-path: inset(-30% -10% -20% -10%); transform: none; }
}
.hb-vb4-foot {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 20px 40px;
  margin-top: auto;
  padding-top: 28px;
}
.hb-vb4-sub {
  max-width: 440px;
  margin: 0;
  color: rgba(242, 242, 238, .62);
  font-size: clamp(14.5px, 1.6cqi, 16.5px);
  line-height: 1.5;
}
.hb-vb4-actions { display: flex; flex-wrap: wrap; gap: 10px; }
.hb-vb4-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 22px;
  border: 1px solid rgba(242, 242, 238, .2);
  border-radius: 999px;
  color: #f2f2ee;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: background .3s ease, color .3s ease, border-color .3s ease, transform .3s cubic-bezier(.2, .8, .2, 1);
}
.hb-vb4-btn:hover { border-color: #f2f2ee; transform: translateY(-1px); }
.hb-vb4-btn:active { transform: scale(.98); }
.hb-vb4-btn:focus-visible { outline: 2px solid var(--hb-vb4-accent); outline-offset: 3px; }
.hb-vb4-btn[data-primary] { border-color: var(--hb-vb4-accent); background: var(--hb-vb4-accent); color: #0b0b0b; }
.hb-vb4-btn[data-primary]:hover { background: #f2f2ee; border-color: #f2f2ee; }
.hb-vb4-arrow {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin-right: -10px;
  border-radius: 50%;
  background: #0b0b0b;
  color: var(--hb-vb4-accent);
  transition: transform .4s cubic-bezier(.34, 1.56, .64, 1);
}
.hb-vb4-btn:hover .hb-vb4-arrow { transform: rotate(-45deg); }
.hb-vb4-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 620px) {
  .hb-vb4-foot { grid-template-columns: 1fr; }
  .hb-vb4-meta li:nth-child(n + 3) { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb4-row[data-mode] .hb-vb4-ch, .hb-vb4-track, .hb-vb4-in { animation: none; }
  .hb-vb4-btn, .hb-vb4-arrow, .hb-vb4-row[data-mode="sweep"] .hb-vb4-ch { transition: none; }
}
`;

const defaultLines: [string, string, string] = ["Motion", "is the", "message"];
const defaultMeta = ["Kinetik Studio", "Type in motion since 2014", "Berlin / Remote", "Open for Q1 2027"];
const defaultPrimary: HeroKineticAction = { label: "Start a project", href: "#" };
const defaultSecondary: HeroKineticAction = { label: "Showreel 2026", href: "#" };

function d(ms: number) {
  return { "--hb-vb4-d": `${ms}ms` } as React.CSSProperties;
}

function Letters({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="hb-vb4-ch" style={{ "--hb-vb4-i": i } as React.CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

export function HeroKinetic({
  lines = defaultLines,
  subtitle = "We design identities that refuse to sit still: type systems, motion languages and launch films for brands that live on screens.",
  meta = defaultMeta,
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  accent = "#c8ff3d",
  speed = 1,
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroKineticProps) {
  const Heading = headingAs;
  const vars = { "--hb-vb4-accent": accent, "--hb-vb4-sp": Math.max(speed, 0.1), ...style } as React.CSSProperties;
  const repeat = Array.from({ length: 6 }, () => lines[1]);

  return (
    <section className={`hb-vb4 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-kinetic" precedence="default">{css}</style>
      {meta.length ? (
        <ul className="hb-vb4-meta hb-vb4-in" style={d(0)}>
          {meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      <Heading className="hb-vb4-title">
        <span className="hb-vb4-sr">{lines.join(" ")}</span>
        <span className="hb-vb4-row hb-vb4-in" data-mode="wave" style={d(120)} aria-hidden="true">
          <Letters text={lines[0]} />
        </span>
        <span className="hb-vb4-row hb-vb4-in" data-mode="slide" style={d(240)} aria-hidden="true">
          <span className="hb-vb4-track">
            {repeat.concat(repeat).map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </span>
        </span>
        <span className="hb-vb4-row hb-vb4-in" data-mode="sweep" style={d(360)} aria-hidden="true">
          <Letters text={lines[2]} />
        </span>
      </Heading>
      <div className="hb-vb4-foot hb-vb4-in" style={d(520)}>
        {subtitle ? <p className="hb-vb4-sub">{subtitle}</p> : <span />}
        {primaryCta || secondaryCta ? (
          <div className="hb-vb4-actions">
            {secondaryCta ? (
              <a className="hb-vb4-btn" href={secondaryCta.href}>
                {secondaryCta.label}
              </a>
            ) : null}
            {primaryCta ? (
              <a className="hb-vb4-btn" data-primary="" href={primaryCta.href}>
                {primaryCta.label}
                <span className="hb-vb4-arrow" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
