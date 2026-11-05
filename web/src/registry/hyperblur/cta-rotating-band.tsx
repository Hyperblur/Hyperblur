"use client";

import * as React from "react";

export interface CtaRotatingBandProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  before?: string;
  words?: string[];
  after?: string;
  subtitle?: string;
  interval?: number;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  note?: string;
  accent?: string;
  secondAccent?: string;
}

const css = `
.hb-yi5 {
  --hb-yi5-a: #8b5cf6;
  --hb-yi5-b: #22d3ee;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: #0a0a0a;
  color: #fff;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yi5 *, .hb-yi5 *::before, .hb-yi5 *::after { box-sizing: border-box; }
.hb-yi5-band { position: relative; overflow: hidden; border-top: 1px solid rgba(255, 255, 255, .1); border-bottom: 1px solid rgba(255, 255, 255, .1); }
.hb-yi5-mesh { position: absolute; inset: -40%; z-index: -2; filter: blur(60px) saturate(1.2); opacity: .95; }
.hb-yi5-blob { position: absolute; width: 55%; height: 70%; border-radius: 50%; mix-blend-mode: screen; }
.hb-yi5-blob:nth-child(1) { left: 10%; top: 20%; background: var(--hb-yi5-a); animation: hb-yi5-drift1 16s ease-in-out infinite; }
.hb-yi5-blob:nth-child(2) { right: 8%; top: 30%; background: var(--hb-yi5-b); animation: hb-yi5-drift2 19s ease-in-out infinite; }
.hb-yi5-blob:nth-child(3) { left: 35%; bottom: 10%; width: 40%; height: 50%; background: color-mix(in srgb, var(--hb-yi5-a) 50%, #f472b6); animation: hb-yi5-drift3 22s ease-in-out infinite; }
.hb-yi5-band::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background:
    linear-gradient(180deg, rgba(10, 10, 10, .55), rgba(10, 10, 10, .2) 40%, rgba(10, 10, 10, .65)),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, .05) 0 1px, transparent 1px 88px);
}
.hb-yi5-band::after {
  content: ""; position: absolute; inset: 0; z-index: -1; opacity: .18; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.hb-yi5-inner { position: relative; max-width: 1120px; margin: 0 auto; padding: 88px 20px; text-align: center; display: grid; justify-items: center; }
.hb-yi5-kicker {
  display: inline-flex; align-items: center; gap: 8px; margin: 0 0 24px; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 500;
  background: rgba(255, 255, 255, .08); border: 1px solid rgba(255, 255, 255, .16); backdrop-filter: blur(8px); color: rgba(255, 255, 255, .9);
}
.hb-yi5-kicker b { padding: 2px 7px; border-radius: 999px; background: #fff; color: #0a0a0a; font-size: 11px; }
.hb-yi5-title { margin: 0; font-size: clamp(34px, 7cqi, 80px); line-height: 1.02; letter-spacing: -.045em; font-weight: 650; max-width: 16ch; text-wrap: balance; }
.hb-yi5-slot { position: relative; display: grid; justify-items: center; overflow: hidden; padding: .02em .06em .1em; margin: -.02em 0 -.04em; }
.hb-yi5-word {
  position: relative; grid-area: 1 / 1; display: inline-block; white-space: nowrap;
  color: transparent; background: linear-gradient(100deg, #fff 10%, color-mix(in srgb, var(--hb-yi5-b) 60%, #fff) 50%, color-mix(in srgb, var(--hb-yi5-a) 55%, #fff) 90%);
  -webkit-background-clip: text; background-clip: text;
}
.hb-yi5-word[data-state="in"] { animation: hb-yi5-in .7s cubic-bezier(.2, .9, .2, 1) both; }
.hb-yi5-word[data-state="out"] { animation: hb-yi5-out .5s cubic-bezier(.6, 0, .8, .4) both; }
.hb-yi5-underline { position: absolute; left: 0; right: 0; bottom: -.04em; height: .06em; border-radius: 99px; background: linear-gradient(90deg, var(--hb-yi5-b), var(--hb-yi5-a)); transform-origin: left; animation: hb-yi5-line var(--hb-yi5-dur) linear both; }
.hb-yi5-sub { margin: 22px 0 0; max-width: 540px; font-size: clamp(15px, 1.8cqi, 18px); line-height: 1.6; color: rgba(255, 255, 255, .78); }
.hb-yi5-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 34px; }
.hb-yi5-btn {
  position: relative; display: inline-flex; align-items: center; gap: 8px; height: 50px; padding: 0 24px; border-radius: 999px;
  font-size: 15px; font-weight: 600; text-decoration: none; transition: transform .25s cubic-bezier(.2, .8, .2, 1), background .25s, box-shadow .25s, border-color .25s;
}
.hb-yi5-btn[data-kind="primary"] { background: #fff; color: #0a0a0a; box-shadow: 0 1px 0 #fff inset, 0 18px 40px -16px rgba(0, 0, 0, .7), 0 0 0 6px rgba(255, 255, 255, .08); }
.hb-yi5-btn[data-kind="primary"]:hover { transform: translateY(-2px); box-shadow: 0 1px 0 #fff inset, 0 24px 50px -16px rgba(0, 0, 0, .8), 0 0 0 8px rgba(255, 255, 255, .12); }
.hb-yi5-btn[data-kind="ghost"] { color: #fff; border: 1px solid rgba(255, 255, 255, .28); background: rgba(10, 10, 10, .25); backdrop-filter: blur(10px); }
.hb-yi5-btn[data-kind="ghost"]:hover { background: rgba(255, 255, 255, .12); border-color: rgba(255, 255, 255, .5); }
.hb-yi5-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-yi5-btn svg { width: 16px; height: 16px; transition: transform .25s; }
.hb-yi5-btn:hover svg { transform: translateX(3px); }
.hb-yi5-note { margin: 22px 0 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 20px; font-size: 13px; color: rgba(255, 255, 255, .65); }
.hb-yi5-note span { display: inline-flex; align-items: center; gap: 6px; }
.hb-yi5-note svg { width: 14px; height: 14px; color: color-mix(in srgb, var(--hb-yi5-b) 70%, #fff); }
.hb-yi5-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-yi5-in { from { opacity: 0; transform: translateY(70%); filter: blur(8px); } to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes hb-yi5-out { from { opacity: 1; transform: none; filter: blur(0); } to { opacity: 0; transform: translateY(-70%); filter: blur(8px); } }
@keyframes hb-yi5-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-yi5-drift1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(18%, 12%) scale(1.15); } }
@keyframes hb-yi5-drift2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-20%, -10%) scale(.9); } }
@keyframes hb-yi5-drift3 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-10%, -25%); } }
@container (min-width: 760px) {
  .hb-yi5-inner { padding: 128px 32px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yi5-blob, .hb-yi5-word, .hb-yi5-underline { animation: none !important; }
  .hb-yi5-btn, .hb-yi5-btn svg { transition: none; }
}
`;

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function CtaRotatingBand({
  before = "Ship your next",
  words = ["launch page", "pricing page", "onboarding", "changelog", "docs site"],
  after = "before Friday.",
  subtitle = "Start from 300 production-ready sections, wire them to your data, and deploy to your own domain in an afternoon.",
  interval = 2600,
  primaryCta = { label: "Start building free", href: "#" },
  secondaryCta = { label: "Book a 20 min demo", href: "#" },
  note = "No credit card|Free for side projects|Cancel anytime",
  accent = "#8b5cf6",
  secondAccent = "#22d3ee",
  className = "",
  style,
  ...rest
}: CtaRotatingBandProps) {
  const [rot, setRot] = React.useState<{ index: number; prev: number | null }>({ index: 0, prev: null });
  const { index, prev } = rot;
  const count = words.length;

  React.useEffect(() => {
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setRot((r) => ({ index: (r.index + 1) % count, prev: r.index }));
    }, Math.max(1200, interval));
    return () => window.clearInterval(id);
  }, [count, interval]);

  const vars = { "--hb-yi5-a": accent, "--hb-yi5-b": secondAccent, "--hb-yi5-dur": `${Math.max(1200, interval)}ms`, ...style } as React.CSSProperties;

  return (
    <section className={`hb-yi5 ${className}`} style={vars} {...rest}>
      <style href="hb-cta-rotating-band" precedence="default">{css}</style>
      <div className="hb-yi5-band">
        <div className="hb-yi5-mesh" aria-hidden="true">
          <span className="hb-yi5-blob" />
          <span className="hb-yi5-blob" />
          <span className="hb-yi5-blob" />
        </div>
        <div className="hb-yi5-inner">
          <p className="hb-yi5-kicker">
            <b>New</b>
            Templates for every page you ship
          </p>
          <h2 className="hb-yi5-title">
            <span className="hb-yi5-sr">{`${before} ${words.join(", ")} ${after}`}</span>
            <span aria-hidden="true">
              {before}
              <span className="hb-yi5-slot">
                {prev !== null ? (
                  <span key={`o${prev}-${index}`} className="hb-yi5-word" data-state="out">
                    {words[prev]}
                  </span>
                ) : null}
                <span key={`i${index}`} className="hb-yi5-word" data-state={prev === null ? "still" : "in"}>
                  {words[index]}
                  <span className="hb-yi5-underline" />
                </span>
              </span>
              {after}
            </span>
          </h2>
          {subtitle ? <p className="hb-yi5-sub">{subtitle}</p> : null}
          <div className="hb-yi5-actions">
            {primaryCta ? (
              <a className="hb-yi5-btn" data-kind="primary" href={primaryCta.href}>
                {primaryCta.label}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-yi5-btn" data-kind="ghost" href={secondaryCta.href}>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
          {note ? (
            <p className="hb-yi5-note">
              {note.split("|").map((n) => (
                <span key={n}>
                  <Check />
                  {n}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
