"use client";

import * as React from "react";

export interface OrbitTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric?: string;
  metricLabel?: string;
}

export interface ProofAvatarOrbitProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  testimonials?: OrbitTestimonial[];
  defaultIndex?: number;
  interval?: number;
  autoPlay?: boolean;
  accent?: string;
  onIndexChange?: (index: number) => void;
}

const css = `
.hb-wb2 {
  --hb-wb2-accent: #22d3ee;
  --hb-wb2-r: 400px;
  --hb-wb2-cx: -230px;
  --hb-wb2-cy: 50%;
  --hb-wb2-base: 0deg;
  --hb-wb2-av: 64px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 580px;
  overflow: hidden;
  container-type: inline-size;
  background: radial-gradient(120% 90% at 0% 50%, #0f1417, #0a0a0a 60%);
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wb2 *, .hb-wb2 *::before, .hb-wb2 *::after { box-sizing: border-box; }
.hb-wb2-orbit {
  position: absolute;
  left: var(--hb-wb2-cx);
  top: var(--hb-wb2-cy);
  width: 0;
  height: 0;
  pointer-events: none;
}
.hb-wb2-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.hb-wb2-ring[data-k="a"] { width: calc(var(--hb-wb2-r) * 2); height: calc(var(--hb-wb2-r) * 2); border: 1px solid rgba(255, 255, 255, .1); }
.hb-wb2-ring[data-k="b"] { width: calc(var(--hb-wb2-r) * 2 - 120px); height: calc(var(--hb-wb2-r) * 2 - 120px); border: 1px dashed rgba(255, 255, 255, .06); }
.hb-wb2-ring[data-k="c"] {
  width: calc(var(--hb-wb2-r) * 2 + 90px);
  height: calc(var(--hb-wb2-r) * 2 + 90px);
  background: repeating-conic-gradient(from 0deg, rgba(255, 255, 255, .16) 0 .25deg, transparent .25deg 3deg);
  -webkit-mask: radial-gradient(closest-side, transparent calc(100% - 9px), #000 calc(100% - 8px));
  mask: radial-gradient(closest-side, transparent calc(100% - 9px), #000 calc(100% - 8px));
  transform: translate(-50%, -50%) rotate(calc(var(--hb-wb2-step) * -4deg));
  transition: transform 1.2s cubic-bezier(.65, 0, .35, 1);
}
.hb-wb2-spot {
  position: absolute;
  left: calc(var(--hb-wb2-cx) + cos(var(--hb-wb2-base)) * var(--hb-wb2-r));
  top: calc(var(--hb-wb2-cy) + sin(var(--hb-wb2-base)) * var(--hb-wb2-r));
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-wb2-accent) 22%, transparent), transparent);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.hb-wb2-wheel {
  position: absolute;
  inset: 0;
  transform: rotate(calc(var(--hb-wb2-base) - var(--hb-wb2-step) * var(--hb-wb2-gap)));
  transition: transform 1.2s cubic-bezier(.65, 0, .35, 1);
}
.hb-wb2-slot {
  position: absolute;
  left: 0;
  top: 0;
  transform: rotate(calc(var(--hb-wb2-i) * var(--hb-wb2-gap))) translateX(var(--hb-wb2-r));
}
.hb-wb2-av {
  position: absolute;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
  width: var(--hb-wb2-av);
  height: var(--hb-wb2-av);
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  color: #fff;
  font: inherit;
  cursor: pointer;
  pointer-events: auto;
  opacity: var(--hb-wb2-o, 1);
  transform: translate(-50%, -50%) rotate(calc(-1 * (var(--hb-wb2-base) - var(--hb-wb2-step) * var(--hb-wb2-gap) + var(--hb-wb2-i) * var(--hb-wb2-gap)))) scale(var(--hb-wb2-s, .72));
  transition: transform 1.2s cubic-bezier(.65, 0, .35, 1), opacity .8s ease;
}
.hb-wb2-face {
  position: absolute;
  inset: 6px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -.02em;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3), inset 0 -8px 16px rgba(0, 0, 0, .25), 0 10px 30px -8px rgba(0, 0, 0, .8);
}
.hb-wb2-av[aria-current="true"] .hb-wb2-face { box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3), 0 0 0 3px #0a0a0a, 0 0 0 4px color-mix(in srgb, var(--hb-wb2-accent) 60%, transparent), 0 0 40px -4px var(--hb-wb2-accent); }
.hb-wb2-av:focus-visible { outline: 2px solid var(--hb-wb2-accent); outline-offset: 2px; }
.hb-wb2-prog { position: absolute; inset: -4px; width: calc(100% + 8px); height: calc(100% + 8px); transform: rotate(-90deg); overflow: visible; }
.hb-wb2-prog circle { fill: none; stroke: var(--hb-wb2-accent); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 100; stroke-dashoffset: 100; animation: hb-wb2-fill var(--hb-wb2-int) linear forwards; }
.hb-wb2:hover .hb-wb2-prog circle, .hb-wb2:focus-within .hb-wb2-prog circle { animation-play-state: paused; }
.hb-wb2[data-auto="false"] .hb-wb2-prog { display: none; }
.hb-wb2-wrap {
  position: relative;
  max-width: 1120px;
  min-height: 580px;
  margin: 0 auto;
  padding: 72px 32px 64px 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hb-wb2-wrap > :not(.hb-wb2-orbit):not(.hb-wb2-spot) { position: relative; }
.hb-wb2-head { display: flex; align-items: center; gap: 12px; margin: 0 0 28px; }
.hb-wb2-eyebrow { color: var(--hb-wb2-accent); font-size: 12px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
.hb-wb2-title { margin: 0; color: #8f8f8f; font-size: 14px; font-weight: 500; letter-spacing: 0; }
.hb-wb2-head i { width: 4px; height: 4px; border-radius: 50%; background: #3a3a3a; }
.hb-wb2-quote { margin: 0; min-height: 4.6em; font-size: clamp(22px, 3.1cqw, 34px); font-weight: 500; line-height: 1.24; letter-spacing: -.025em; text-wrap: pretty; }
.hb-wb2-word {
  display: inline-block;
  white-space: pre;
  animation: hb-wb2-word .8s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(min(var(--hb-wb2-w) * 26ms, 900ms) + 250ms);
}
.hb-wb2-foot { display: flex; flex-wrap: wrap; align-items: center; gap: 18px 28px; margin-top: 32px; }
.hb-wb2-cite { display: flex; flex-direction: column; gap: 3px; animation: hb-wb2-rise .7s .45s cubic-bezier(.2, .8, .2, 1) both; }
.hb-wb2-cite b { font-size: 15px; font-weight: 600; }
.hb-wb2-cite span { color: #8f8f8f; font-size: 13.5px; }
.hb-wb2-metric {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .05), rgba(255, 255, 255, .015));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06);
  animation: hb-wb2-rise .7s .55s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-wb2-metric b { color: var(--hb-wb2-accent); font-size: 20px; font-weight: 600; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
.hb-wb2-metric span { color: #a1a1a1; font-size: 12.5px; }
.hb-wb2-ctrl { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.hb-wb2-count { margin-right: 8px; color: #8f8f8f; font-size: 12.5px; font-variant-numeric: tabular-nums; font-family: var(--font-mono, ui-monospace, monospace); }
.hb-wb2-count b { color: #ededed; font-weight: 500; }
.hb-wb2-btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 50%;
  background: rgba(255, 255, 255, .03);
  color: #ededed;
  cursor: pointer;
  transition: background .25s ease, border-color .25s ease, transform .25s cubic-bezier(.2, .8, .2, 1);
}
.hb-wb2-btn:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .2); }
.hb-wb2-btn:active { transform: scale(.94); }
.hb-wb2-btn:focus-visible { outline: 2px solid var(--hb-wb2-accent); outline-offset: 2px; }
.hb-wb2-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-wb2-fill { to { stroke-dashoffset: 0; } }
@keyframes hb-wb2-word { from { opacity: 0; transform: translateY(.45em); filter: blur(6px); } }
@keyframes hb-wb2-rise { from { opacity: 0; transform: translateY(10px); } }
@container (max-width: 760px) {
  .hb-wb2 { --hb-wb2-r: 330px; --hb-wb2-cx: 50%; --hb-wb2-cy: -200px; --hb-wb2-base: 90deg; --hb-wb2-av: 58px; min-height: 0; background: radial-gradient(90% 50% at 50% 0%, #0f1417, #0a0a0a 70%); }
  .hb-wb2-wrap { min-height: 0; padding: 200px 20px 56px; }
  .hb-wb2-head { justify-content: center; }
  .hb-wb2-quote { min-height: 0; text-align: center; }
  .hb-wb2-foot { justify-content: center; text-align: center; }
  .hb-wb2-cite { align-items: center; }
  .hb-wb2-ctrl { margin: 0; width: 100%; justify-content: center; }
}
@container (max-width: 420px) {
  .hb-wb2 { --hb-wb2-r: 280px; --hb-wb2-cy: -150px; --hb-wb2-av: 52px; }
  .hb-wb2-wrap { padding-top: 196px; }
  .hb-wb2-head { flex-wrap: wrap; gap: 6px 10px; }
  .hb-wb2-head i { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wb2-wheel, .hb-wb2-av, .hb-wb2-ring[data-k="c"], .hb-wb2-btn { transition: none; }
  .hb-wb2-word, .hb-wb2-cite, .hb-wb2-metric { animation: none; }
  .hb-wb2-prog { display: none; }
}
`;

const tones = [
  ["#22d3ee", "#0e7490"],
  ["#a78bfa", "#5b21b6"],
  ["#fb923c", "#9a3412"],
  ["#34d399", "#047857"],
  ["#f472b6", "#9d174d"],
  ["#facc15", "#a16207"],
  ["#60a5fa", "#1d4ed8"],
  ["#f87171", "#991b1b"],
];

const defaultTestimonials: OrbitTestimonial[] = [
  { quote: "We replaced four dashboards and a weekly spreadsheet ritual. Finance now closes the month in two days instead of nine.", name: "Hannah Weiss", role: "VP Finance", company: "Brightline Freight", metric: "7 days", metricLabel: "faster month-end close" },
  { quote: "The forecasting view is the first thing our board asks for. It made our planning meetings shorter and calmer.", name: "Rafael Costa", role: "COO", company: "Juniper Clinics", metric: "41%", metricLabel: "shorter planning cycles" },
  { quote: "Every team owns its numbers now. Nobody waits on the data team for a chart, and the data team finally gets to do real work.", name: "Aiko Tanaka", role: "Head of Data", company: "Mosswood", metric: "1,200", metricLabel: "self-serve reports a month" },
  { quote: "We caught a pricing leak in week one that had cost us six figures a year. That paid for the next decade.", name: "Elliot Mensah", role: "CFO", company: "Northpaw", metric: "$184k", metricLabel: "recovered in year one" },
  { quote: "Rolling it out to 300 people took a single afternoon. The permissions model just made sense to our admins.", name: "Clara Jensen", role: "IT Director", company: "Halberd Group", metric: "300", metricLabel: "seats live in one day" },
  { quote: "I open it before email every morning. It tells me what changed and why, in plain sentences.", name: "Samir Patel", role: "Founder", company: "Quayside", metric: "6 min", metricLabel: "daily review, down from 40" },
  { quote: "Our investors get a live link instead of a quarterly deck. Fundraising conversations start from trust.", name: "Laura Kim", role: "CEO", company: "Fieldnote", metric: "2.4x", metricLabel: "faster diligence" },
  { quote: "The alerts are tuned so well that when one fires, people actually stop and look.", name: "Diego Herrera", role: "Ops lead", company: "Cobalt Kitchens", metric: "93%", metricLabel: "alerts acted on" },
  { quote: "Support replied with a fix and a short video, twice, before we had finished writing the ticket.", name: "Nora Lindqvist", role: "RevOps", company: "Tallgrass", metric: "4 min", metricLabel: "median first reply" },
  { quote: "It is the only tool our sales and finance teams agree on. That alone is worth the subscription.", name: "Owen Gallagher", role: "CRO", company: "Ridgeway", metric: "1", metricLabel: "source of truth" },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

export function ProofAvatarOrbit({
  eyebrow = "Customer stories",
  title = "Heard from teams on Ledgerly",
  testimonials = defaultTestimonials,
  defaultIndex = 0,
  interval = 6500,
  autoPlay = true,
  accent = "#22d3ee",
  onIndexChange,
  className = "",
  style,
  ...rest
}: ProofAvatarOrbitProps) {
  const uid = React.useId();
  const n = Math.max(testimonials.length, 1);
  const [step, setStep] = React.useState(() => Math.max(0, Math.min(defaultIndex, n - 1)));
  const active = ((step % n) + n) % n;
  const t = testimonials[active];

  const go = React.useCallback(
    (delta: number) => {
      const next = step + delta;
      setStep(next);
      onIndexChange?.(((next % n) + n) % n);
    },
    [n, step, onIndexChange],
  );

  const goTo = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    if (d !== 0) go(d);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(-1);
    }
  };

  const vars = {
    "--hb-wb2-accent": accent,
    "--hb-wb2-step": step,
    "--hb-wb2-gap": `${(360 / n).toFixed(4)}deg`,
    "--hb-wb2-int": `${Math.max(interval, 1500)}ms`,
    ...style,
  } as React.CSSProperties;

  const words = t ? t.quote.split(" ") : [];

  return (
    <section className={`hb-wb2 ${className}`} style={vars} data-auto={autoPlay} aria-labelledby={`${uid}-t`} aria-roledescription="carousel" {...rest}>
      <style href="hb-proof-avatar-orbit" precedence="default">{css}</style>
      <div className="hb-wb2-wrap">
        <div className="hb-wb2-spot" aria-hidden="true" />
        <div className="hb-wb2-orbit">
          <div className="hb-wb2-ring" data-k="c" aria-hidden="true" />
          <div className="hb-wb2-ring" data-k="a" aria-hidden="true" />
          <div className="hb-wb2-ring" data-k="b" aria-hidden="true" />
          <div className="hb-wb2-wheel" role="group" aria-label="Choose a customer" onKeyDown={onKey}>
            {testimonials.map((item, i) => {
              const raw = Math.abs(i - active);
              const d = Math.min(raw, n - raw);
              const o = d === 0 ? 1 : d === 1 ? 0.6 : d === 2 ? 0.28 : 0.08;
              const s = d === 0 ? 1 : 0.72;
              const [a, b] = tones[i % tones.length];
              return (
                <div key={`${item.name}-${i}`} className="hb-wb2-slot" style={{ "--hb-wb2-i": i } as React.CSSProperties}>
                  <button
                    type="button"
                    className="hb-wb2-av"
                    aria-current={i === active}
                    aria-label={`Quote from ${item.name}, ${item.company}`}
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => goTo(i)}
                    style={{ "--hb-wb2-o": o, "--hb-wb2-s": s } as React.CSSProperties}
                  >
                    {i === active && autoPlay && (
                      <svg key={step} className="hb-wb2-prog" viewBox="0 0 72 72" aria-hidden="true" onAnimationEnd={() => go(1)}>
                        <circle cx="36" cy="36" r="34" pathLength={100} />
                      </svg>
                    )}
                    <span className="hb-wb2-face" style={{ background: `radial-gradient(circle at 30% 25%, ${a}, ${b})` }}>{initials(item.name)}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="hb-wb2-head">
          <span className="hb-wb2-eyebrow">{eyebrow}</span>
          <i aria-hidden="true" />
          <h2 id={`${uid}-t`} className="hb-wb2-title">{title}</h2>
        </div>
        {t && (
          <div key={step} aria-live="polite">
            <blockquote className="hb-wb2-quote">
              <span className="hb-wb2-sr">{t.quote}</span>
              <span aria-hidden="true">
                {words.map((w, i) => (
                  <span key={i} className="hb-wb2-word" style={{ "--hb-wb2-w": i } as React.CSSProperties}>{i < words.length - 1 ? `${w} ` : w}</span>
                ))}
              </span>
            </blockquote>
            <div className="hb-wb2-foot">
              <div className="hb-wb2-cite">
                <b>{t.name}</b>
                <span>{`${t.role}, ${t.company}`}</span>
              </div>
              {t.metric && (
                <div className="hb-wb2-metric">
                  <b>{t.metric}</b>
                  <span>{t.metricLabel}</span>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="hb-wb2-foot" style={{ marginTop: 28 }}>
          <div className="hb-wb2-ctrl">
            <span className="hb-wb2-count"><b>{String(active + 1).padStart(2, "0")}</b>{` / ${String(n).padStart(2, "0")}`}</span>
            <button type="button" className="hb-wb2-btn" aria-label="Previous quote" onClick={() => go(-1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className="hb-wb2-btn" aria-label="Next quote" onClick={() => go(1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
