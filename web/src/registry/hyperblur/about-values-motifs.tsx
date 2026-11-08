"use client";

import * as React from "react";

export type AboutValueMotif = "slices" | "door" | "ruler" | "target" | "lines" | "sprout";

export interface AboutValueItem {
  title: string;
  text: string;
  proof: string;
  motif: AboutValueMotif;
}

export interface AboutValuesMotifsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  values?: AboutValueItem[];
  link?: { label: string; href: string };
  onValueFocus?: (value: AboutValueItem) => void;
  accent?: string;
}

const defaultValues: AboutValueItem[] = [
  { title: "Ship in small slices", text: "Nothing waits for a big reveal. We release behind flags and learn from real use within days.", proof: "214 releases last year", motif: "slices" },
  { title: "Default to open", text: "Roadmap, salaries and incident notes are readable by everyone on the team from day one.", proof: "Every doc public inside", motif: "door" },
  { title: "Measure twice", text: "We write down what success looks like before building, then check it honestly afterwards.", proof: "Every launch has a review", motif: "ruler" },
  { title: "Own the outcome", text: "Whoever ships it follows it to the customer. No handoffs into a void, no shrugging at support.", proof: "Engineers on support rota", motif: "target" },
  { title: "Write it down", text: "Decisions live in short written memos, so people in nine time zones can disagree well.", proof: "1,180 memos and counting", motif: "lines" },
  { title: "Leave it better", text: "Every change cleans one small thing nearby. Over years, that compounding is the whole strategy.", proof: "Fridays for upkeep", motif: "sprout" },
];

const css = `
@keyframes hb-wd5-slice { 0% { transform: translateX(-26px); opacity: 0; } 30%, 80% { transform: none; opacity: 1; } 100% { transform: translateX(26px); opacity: 0; } }
@keyframes hb-wd5-door { 0%, 15% { transform: perspective(160px) rotateY(0deg); } 50%, 80% { transform: perspective(160px) rotateY(-62deg); } 100% { transform: perspective(160px) rotateY(0deg); } }
@keyframes hb-wd5-glow { 0%, 15% { opacity: 0; } 50%, 80% { opacity: 1; } 100% { opacity: 0; } }
@keyframes hb-wd5-caliper { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(46px); } }
@keyframes hb-wd5-arrow { 0% { transform: translate(-60px, 30px); opacity: 0; } 40% { opacity: 1; } 55%, 85% { transform: none; opacity: 1; } 100% { transform: none; opacity: 0; } }
@keyframes hb-wd5-ring { 0%, 50% { transform: scale(1); } 60% { transform: scale(1.12); } 75%, 100% { transform: scale(1); } }
@keyframes hb-wd5-write { 0% { stroke-dashoffset: 1; } 60%, 90% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 0; opacity: 0; } }
@keyframes hb-wd5-grow { 0% { transform: scaleY(0); } 50%, 90% { transform: scaleY(1); } 100% { transform: scaleY(1); opacity: 0.2; } }
@keyframes hb-wd5-leaf { 0%, 35% { transform: scale(0); } 60%, 90% { transform: scale(1); } 100% { transform: scale(1); opacity: 0.2; } }
.hb-wd5 {
  --hb-wd5-accent: #e5484d;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: #18171a;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wd5 *, .hb-wd5 *::before, .hb-wd5 *::after { box-sizing: border-box; }
.hb-wd5-in { max-width: 1120px; margin: 0 auto; padding: 76px 20px 92px; }
.hb-wd5-head { display: grid; gap: 16px; margin-bottom: 40px; }
@container (min-width: 820px) { .hb-wd5-head { grid-template-columns: 1.2fr 1fr; align-items: end; gap: 48px; } }
.hb-wd5-eyebrow { font: 500 12px/1 var(--font-mono, monospace); letter-spacing: 0.08em; text-transform: uppercase; color: var(--hb-wd5-accent); }
.hb-wd5-title { margin: 12px 0 0; font: 600 clamp(32px, 5cqw, 54px)/1 var(--font-grotesk, inherit); letter-spacing: -0.035em; }
.hb-wd5-side p { margin: 0 0 14px; color: #5f5d57; font-size: 15px; line-height: 1.6; }
.hb-wd5-link { display: inline-flex; align-items: center; gap: 8px; color: #18171a; font-weight: 600; font-size: 14px; text-decoration: none; }
.hb-wd5-link svg { width: 15px; height: 15px; transition: transform 0.3s cubic-bezier(0.34, 1.4, 0.5, 1); }
.hb-wd5-link:hover svg { transform: translateX(4px); }
.hb-wd5-link:focus-visible { outline: 2px solid var(--hb-wd5-accent); outline-offset: 4px; border-radius: 4px; }
.hb-wd5-grid { display: grid; gap: 1px; background: rgba(24,23,26,0.1); border: 1px solid rgba(24,23,26,0.1); border-radius: 22px; overflow: hidden; }
@container (min-width: 560px) { .hb-wd5-grid { grid-template-columns: 1fr 1fr; } }
@container (min-width: 900px) { .hb-wd5-grid { grid-template-columns: repeat(3, 1fr); } }
.hb-wd5-tile { --hb-wd5-mx: 50%; --hb-wd5-my: 0%; position: relative; display: grid; gap: 12px; align-content: start; padding: 22px 24px 26px; background: #fbfaf6; outline: none; transition: background-color 0.4s ease; overflow: hidden; }
.hb-wd5-tile::before { content: ""; position: absolute; inset: 0; background: radial-gradient(260px circle at var(--hb-wd5-mx) var(--hb-wd5-my), color-mix(in srgb, var(--hb-wd5-accent) 10%, transparent), transparent 70%); opacity: 0; transition: opacity 0.4s ease; pointer-events: none; }
.hb-wd5-tile:hover, .hb-wd5-tile:focus-visible { background: #fff; }
.hb-wd5-tile:hover::before, .hb-wd5-tile:focus-visible::before { opacity: 1; }
.hb-wd5-tile:focus-visible { box-shadow: inset 0 0 0 2px var(--hb-wd5-accent); }
.hb-wd5-top { position: relative; display: flex; align-items: flex-start; justify-content: space-between; }
.hb-wd5-num { font: 600 44px/1 var(--font-grotesk, inherit); letter-spacing: -0.04em; color: transparent; -webkit-text-stroke: 1px rgba(24,23,26,0.25); transition: -webkit-text-stroke-color 0.3s ease, color 0.4s ease; }
.hb-wd5-tile:hover .hb-wd5-num, .hb-wd5-tile:focus-visible .hb-wd5-num { color: var(--hb-wd5-accent); -webkit-text-stroke-color: var(--hb-wd5-accent); }
.hb-wd5-art { width: 112px; height: 72px; border-radius: 12px; background: #f1eee6; border: 1px solid rgba(24,23,26,0.06); display: grid; place-items: center; overflow: hidden; transition: background-color 0.4s ease, border-color 0.4s ease; }
.hb-wd5-tile:hover .hb-wd5-art, .hb-wd5-tile:focus-visible .hb-wd5-art { background: #18171a; border-color: #18171a; }
.hb-wd5-art svg { width: 100%; height: 100%; display: block; }
.hb-wd5-ink { stroke: #18171a; transition: stroke 0.4s ease; }
.hb-wd5-fill { fill: #18171a; transition: fill 0.4s ease; }
.hb-wd5-tile:hover .hb-wd5-ink, .hb-wd5-tile:focus-visible .hb-wd5-ink { stroke: #f7f5ef; }
.hb-wd5-tile:hover .hb-wd5-fill, .hb-wd5-tile:focus-visible .hb-wd5-fill { fill: #f7f5ef; }
.hb-wd5-acc { fill: var(--hb-wd5-accent); }
.hb-wd5-accs { stroke: var(--hb-wd5-accent); }
.hb-wd5-a { transform-box: fill-box; }
.hb-wd5-tile:hover .hb-wd5-m-slice, .hb-wd5-tile:focus-visible .hb-wd5-m-slice { animation: hb-wd5-slice 2.4s cubic-bezier(0.6, 0, 0.3, 1) infinite; }
.hb-wd5-m-door { transform-origin: left center; }
.hb-wd5-tile:hover .hb-wd5-m-door, .hb-wd5-tile:focus-visible .hb-wd5-m-door { animation: hb-wd5-door 2.6s cubic-bezier(0.6, 0, 0.3, 1) infinite; }
.hb-wd5-m-glow { opacity: 0; }
.hb-wd5-tile:hover .hb-wd5-m-glow, .hb-wd5-tile:focus-visible .hb-wd5-m-glow { animation: hb-wd5-glow 2.6s cubic-bezier(0.6, 0, 0.3, 1) infinite; }
.hb-wd5-tile:hover .hb-wd5-m-cal, .hb-wd5-tile:focus-visible .hb-wd5-m-cal { animation: hb-wd5-caliper 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
.hb-wd5-tile:hover .hb-wd5-m-arrow, .hb-wd5-tile:focus-visible .hb-wd5-m-arrow { animation: hb-wd5-arrow 2.2s cubic-bezier(0.3, 0, 0.2, 1) infinite; }
.hb-wd5-m-ring { transform-origin: center; }
.hb-wd5-tile:hover .hb-wd5-m-ring, .hb-wd5-tile:focus-visible .hb-wd5-m-ring { animation: hb-wd5-ring 2.2s ease infinite; }
.hb-wd5-m-write { stroke-dasharray: 1; }
.hb-wd5-tile:hover .hb-wd5-m-write, .hb-wd5-tile:focus-visible .hb-wd5-m-write { animation: hb-wd5-write 2.8s cubic-bezier(0.5, 0, 0.3, 1) infinite both; }
.hb-wd5-m-stem { transform-origin: bottom; }
.hb-wd5-tile:hover .hb-wd5-m-stem, .hb-wd5-tile:focus-visible .hb-wd5-m-stem { animation: hb-wd5-grow 2.8s cubic-bezier(0.3, 0.7, 0.3, 1) infinite; }
.hb-wd5-m-leaf { transform-origin: bottom center; }
.hb-wd5-tile:hover .hb-wd5-m-leaf, .hb-wd5-tile:focus-visible .hb-wd5-m-leaf { animation: hb-wd5-leaf 2.8s cubic-bezier(0.34, 1.5, 0.5, 1) infinite; }
.hb-wd5-tile h3 { position: relative; margin: 8px 0 0; font: 600 19px/1.2 var(--font-grotesk, inherit); letter-spacing: -0.02em; }
.hb-wd5-tile p { position: relative; margin: 0; color: #5f5d57; font-size: 14px; line-height: 1.6; }
.hb-wd5-proof { position: relative; display: inline-flex; align-items: center; gap: 8px; margin-top: 4px; font: 500 11.5px/1 var(--font-mono, monospace); color: #8a877f; }
.hb-wd5-proof::before { content: ""; width: 14px; height: 1px; background: currentColor; transition: width 0.4s cubic-bezier(0.34, 1.3, 0.5, 1), background-color 0.3s ease; }
.hb-wd5-tile:hover .hb-wd5-proof, .hb-wd5-tile:focus-visible .hb-wd5-proof { color: #18171a; }
.hb-wd5-tile:hover .hb-wd5-proof::before, .hb-wd5-tile:focus-visible .hb-wd5-proof::before { width: 28px; background: var(--hb-wd5-accent); }
@media (prefers-reduced-motion: reduce) {
  .hb-wd5 *, .hb-wd5 *::before, .hb-wd5 *::after { animation: none !important; transition: none !important; }
}
`;

function Motif({ kind }: { kind: AboutValueMotif }) {
  const ink = { className: "hb-wd5-ink", fill: "none", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "slices") {
    return (
      <svg viewBox="0 0 112 72" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} className={`hb-wd5-a ${i === 3 ? "hb-wd5-acc" : "hb-wd5-fill"} hb-wd5-m-slice`} x={22 + i * 18} y={46 - i * 8} width="14" height={10 + i * 8} rx="3" style={{ animationDelay: `${(i * 0.14).toFixed(2)}s` }} />
        ))}
        <path {...ink} d="M16 58h80" />
      </svg>
    );
  }
  if (kind === "door") {
    return (
      <svg viewBox="0 0 112 72" aria-hidden="true">
        <rect className="hb-wd5-acc hb-wd5-m-glow" x="40" y="12" width="32" height="48" rx="2" />
        <rect {...ink} x="40" y="12" width="32" height="48" rx="2" />
        <g className="hb-wd5-a hb-wd5-m-door">
          <rect className="hb-wd5-fill" x="40" y="12" width="32" height="48" rx="2" />
          <circle className="hb-wd5-acc" cx="66" cy="37" r="2.4" />
        </g>
        <path {...ink} d="M26 60h60" />
      </svg>
    );
  }
  if (kind === "ruler") {
    return (
      <svg viewBox="0 0 112 72" aria-hidden="true">
        <rect {...ink} x="14" y="40" width="84" height="16" rx="3" />
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} {...ink} strokeWidth={1.4} d={`M${20 + i * 6} 40v${i % 4 === 0 ? 8 : 4}`} />
        ))}
        <g className="hb-wd5-a hb-wd5-m-cal">
          <path className="hb-wd5-accs" fill="none" strokeWidth="2.4" strokeLinecap="round" d="M26 16v24M26 16h14" />
        </g>
        <path {...ink} strokeWidth={1.6} d="M20 16v24M20 16h-6" />
      </svg>
    );
  }
  if (kind === "target") {
    return (
      <svg viewBox="0 0 112 72" aria-hidden="true">
        <g className="hb-wd5-a hb-wd5-m-ring">
          <circle {...ink} cx="64" cy="36" r="24" />
          <circle {...ink} cx="64" cy="36" r="15" />
          <circle className="hb-wd5-acc" cx="64" cy="36" r="6" />
        </g>
        <g className="hb-wd5-a hb-wd5-m-arrow">
          <path {...ink} d="M28 54L62 38M28 54l2-8M28 54l8-1" />
        </g>
      </svg>
    );
  }
  if (kind === "lines") {
    return (
      <svg viewBox="0 0 112 72" aria-hidden="true">
        <rect {...ink} strokeWidth={1.6} x="26" y="8" width="60" height="56" rx="4" />
        {[22, 32, 42].map((y, i) => (
          <path key={y} {...ink} className="hb-wd5-ink hb-wd5-m-write" pathLength={1} d={`M34 ${y} c6 -4 10 4 16 0 s10 4 16 0 s6 2 ${i === 2 ? 2 : 10} 0`} style={{ animationDelay: `${(i * 0.35).toFixed(2)}s` }} />
        ))}
        <path className="hb-wd5-accs hb-wd5-m-write" fill="none" strokeWidth="2.2" strokeLinecap="round" pathLength={1} d="M34 54h20" style={{ animationDelay: "1.05s" }} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 112 72" aria-hidden="true">
      <path {...ink} d="M30 62h52" />
      <path className="hb-wd5-fill" d="M44 62h24l-3 -8h-18z" />
      <path className="hb-wd5-a hb-wd5-accs hb-wd5-m-stem" fill="none" strokeWidth="2.4" strokeLinecap="round" d="M56 54V22" />
      <path className="hb-wd5-a hb-wd5-acc hb-wd5-m-leaf" d="M56 36c-10 0 -16 -6 -16 -14c10 0 16 6 16 14z" />
      <path className="hb-wd5-a hb-wd5-acc hb-wd5-m-leaf" d="M56 28c8 0 14 -5 14 -12c-8 0 -14 5 -14 12z" style={{ animationDelay: "0.2s" }} />
    </svg>
  );
}

export function AboutValuesMotifs({
  eyebrow = "How we work",
  title = "Six habits we hire for, and keep each other to",
  subtitle = "Values only matter when they change a decision. These are the ones that show up in our pull requests, our hiring loops and our calendars.",
  values = defaultValues,
  link = { label: "Read the team handbook", href: "#" },
  onValueFocus,
  accent = "#e5484d",
  className = "",
  style,
  ...rest
}: AboutValuesMotifsProps) {
  const move = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--hb-wd5-mx", `${(e.clientX - r.left).toFixed(0)}px`);
    e.currentTarget.style.setProperty("--hb-wd5-my", `${(e.clientY - r.top).toFixed(0)}px`);
  };

  return (
    <section className={`hb-wd5 ${className}`} style={{ "--hb-wd5-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-about-values-motifs" precedence="default">{css}</style>
      <div className="hb-wd5-in">
        <div className="hb-wd5-head">
          <div>
            <div className="hb-wd5-eyebrow">{eyebrow}</div>
            <h2 className="hb-wd5-title">{title}</h2>
          </div>
          <div className="hb-wd5-side">
            <p>{subtitle}</p>
            <a className="hb-wd5-link" href={link.href}>
              {link.label}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </a>
          </div>
        </div>
        <div className="hb-wd5-grid" role="list">
          {values.map((v, i) => (
            <article
              key={v.title}
              role="listitem"
              className="hb-wd5-tile"
              tabIndex={0}
              aria-label={`${i + 1}. ${v.title}`}
              onPointerMove={move}
              onPointerEnter={() => onValueFocus?.(v)}
              onFocus={() => onValueFocus?.(v)}
            >
              <div className="hb-wd5-top">
                <span className="hb-wd5-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="hb-wd5-art"><Motif kind={v.motif} /></span>
              </div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
              <span className="hb-wd5-proof">{v.proof}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
