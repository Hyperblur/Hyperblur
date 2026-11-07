"use client";

import * as React from "react";

export interface LogoCloudItem {
  name: string;
  color?: string;
  href?: string;
}

export interface LogoCloudLink {
  label: string;
  href: string;
}

export interface ProofLogoCloudProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  logos?: LogoCloudItem[];
  rating?: number;
  reviewCount?: number;
  ratingSource?: string;
  cta?: LogoCloudLink | null;
  accent?: string;
  shimmer?: boolean;
}

const css = `
.hb-kd3 {
  --hb-kd3-accent: #2f7bff;
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kd3 *, .hb-kd3 *::before, .hb-kd3 *::after { box-sizing: border-box; }
.hb-kd3::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -260px;
  width: 900px;
  height: 520px;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kd3-accent) 14%, transparent), transparent);
  pointer-events: none;
}
.hb-kd3-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 96px 24px 104px;
}
.hb-kd3-head { max-width: 680px; margin: 0 auto 48px; text-align: center; }
.hb-kd3-eyebrow {
  margin: 0;
  color: var(--hb-kd3-accent);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .02em;
}
.hb-kd3-title {
  margin: 14px 0 0;
  font-size: clamp(26px, 4.2cqi, 40px);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -.028em;
  text-wrap: balance;
}
.hb-kd3-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  margin: 0;
  padding: 1px;
  list-style: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, .07);
  overflow: hidden;
}
.hb-kd3-cell { display: flex; min-width: 0; background: #0a0a0a; }
.hb-kd3-tile {
  --hb-kd3-c: #ededed;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 112px;
  padding: 24px 16px;
  overflow: hidden;
  color: #6c6c6c;
  text-decoration: none;
  background: linear-gradient(180deg, #0e0e0e, #0a0a0a);
  transition: color .35s ease, background-color .35s ease;
  outline: none;
}
.hb-kd3-tile::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(70% 90% at 50% 120%, color-mix(in srgb, var(--hb-kd3-c) 22%, transparent), transparent 70%);
  opacity: 0;
  transition: opacity .4s ease;
}
.hb-kd3-tile::after {
  content: "";
  position: absolute;
  top: -20%;
  bottom: -20%;
  left: 0;
  width: 46%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, .07) 45%, rgba(255, 255, 255, .13) 50%, rgba(255, 255, 255, .07) 55%, transparent);
  transform: translate3d(-160%, 0, 0) skewX(-14deg);
  pointer-events: none;
}
.hb-kd3[data-shimmer="true"] .hb-kd3-tile::after { animation: hb-kd3-sweep 7.5s cubic-bezier(.45, 0, .2, 1) infinite; animation-delay: var(--hb-kd3-d, 0s); }
@keyframes hb-kd3-sweep {
  0% { transform: translate3d(-160%, 0, 0) skewX(-14deg); }
  22% { transform: translate3d(330%, 0, 0) skewX(-14deg); }
  100% { transform: translate3d(330%, 0, 0) skewX(-14deg); }
}
.hb-kd3-tile:hover, .hb-kd3-tile:focus-visible { color: #ededed; }
.hb-kd3-tile:hover::before, .hb-kd3-tile:focus-visible::before { opacity: 1; }
.hb-kd3-tile:focus-visible { box-shadow: inset 0 0 0 2px var(--hb-kd3-accent); }
.hb-kd3-glyph {
  position: relative;
  flex: none;
  width: 26px;
  height: 26px;
  color: #5a5a5a;
  transition: color .35s ease, transform .5s cubic-bezier(.2, .8, .2, 1);
}
.hb-kd3-tile:hover .hb-kd3-glyph, .hb-kd3-tile:focus-visible .hb-kd3-glyph { color: var(--hb-kd3-c); transform: rotate(-8deg) scale(1.08); }
.hb-kd3-word { position: relative; white-space: nowrap; line-height: 1; font-size: 19px; }
.hb-kd3-word[data-style="0"] { font-weight: 700; letter-spacing: -.04em; }
.hb-kd3-word[data-style="1"] { font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 23px; letter-spacing: -.01em; }
.hb-kd3-word[data-style="2"] { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 16px; font-weight: 600; letter-spacing: .02em; text-transform: lowercase; }
.hb-kd3-word[data-style="3"] { font-size: 14px; font-weight: 700; letter-spacing: .32em; text-transform: uppercase; }
.hb-kd3-word[data-style="4"] { font-weight: 300; font-size: 21px; letter-spacing: -.02em; }
.hb-kd3-word[data-style="5"] { font-weight: 800; font-size: 18px; letter-spacing: -.02em; text-transform: uppercase; }
.hb-kd3-word[data-style="6"] { font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 22px; letter-spacing: .01em; }
.hb-kd3-word[data-style="7"] { font-weight: 600; font-size: 18px; letter-spacing: -.01em; }
.hb-kd3-rating {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px 22px;
  margin-top: 36px;
  color: #8f8f8f;
  font-size: 14px;
}
.hb-kd3-score { display: inline-flex; align-items: center; gap: 10px; }
.hb-kd3-score strong { color: #ededed; font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-kd3-stars { position: relative; display: inline-block; width: 92px; height: 16px; flex: none; }
.hb-kd3-stars svg { position: absolute; inset: 0; width: 92px; height: 16px; }
.hb-kd3-stars-base { color: rgba(255, 255, 255, .14); }
.hb-kd3-stars-fill { position: absolute; inset: 0 auto 0 0; overflow: hidden; color: #fbbf24; }
.hb-kd3-sep { width: 1px; height: 16px; background: rgba(255, 255, 255, .12); }
.hb-kd3-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ededed;
  font-weight: 500;
  text-decoration: none;
  border-radius: 6px;
}
.hb-kd3-link svg { width: 14px; height: 14px; transition: transform .25s ease; }
.hb-kd3-link:hover { color: color-mix(in srgb, var(--hb-kd3-accent) 55%, #fff); }
.hb-kd3-link:hover svg { transform: translate3d(3px, 0, 0); }
.hb-kd3-link:focus-visible { outline: 2px solid var(--hb-kd3-accent); outline-offset: 3px; }
@container (max-width: 760px) {
  .hb-kd3-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hb-kd3-tile { min-height: 96px; }
}
@container (max-width: 520px) {
  .hb-kd3-in { padding: 64px 16px 72px; }
  .hb-kd3-head { margin-bottom: 32px; }
  .hb-kd3-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); border-radius: 16px; }
  .hb-kd3-tile { min-height: 84px; padding: 18px 10px; gap: 8px; }
  .hb-kd3-glyph { width: 20px; height: 20px; }
  .hb-kd3-word { font-size: 16px; }
  .hb-kd3-word[data-style="1"], .hb-kd3-word[data-style="6"] { font-size: 19px; }
  .hb-kd3-word[data-style="3"] { font-size: 12px; letter-spacing: .22em; }
  .hb-kd3-sep { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kd3-tile::after { animation: none !important; display: none; }
  .hb-kd3-tile, .hb-kd3-tile::before, .hb-kd3-glyph, .hb-kd3-link svg { transition: none; }
  .hb-kd3-tile:hover .hb-kd3-glyph, .hb-kd3-tile:focus-visible .hb-kd3-glyph { transform: none; }
}
`;

const defaultLogos: LogoCloudItem[] = [
  { name: "Northwind", color: "#2f7bff" },
  { name: "Halcyon", color: "#f472b6" },
  { name: "quartzline", color: "#a78bfa" },
  { name: "Obelisk", color: "#e5e5e5" },
  { name: "Fernhill", color: "#34d399" },
  { name: "Kestrel", color: "#f59e0b" },
  { name: "Lumio", color: "#22d3ee" },
  { name: "Parallax", color: "#fb7185" },
  { name: "Driftwood", color: "#d6a77a" },
  { name: "sable.io", color: "#818cf8" },
  { name: "Meridian", color: "#4ade80" },
  { name: "Tidewell", color: "#38bdf8" },
];

const glyphs = [
  <path key="0" d="M13 2l9.5 5.5v11L13 24l-9.5-5.5v-11L13 2zm0 5.2L8 10v6l5 2.8 5-2.8v-6l-5-2.8z" />,
  <path key="1" d="M13 2a11 11 0 1 1 0 22 11 11 0 0 1 0-22zm0 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z" />,
  <path key="2" d="M3 20.5L13 3l10 17.5H3zm5.4-3h9.2L13 9.4l-4.6 8.1z" />,
  <path key="3" d="M4 5h4v16H4V5zm7 4h4v12h-4V9zm7-6h4v18h-4V3z" />,
  <path key="4" d="M13 2l11 11-11 11L2 13 13 2zm0 6.4L8.4 13l4.6 4.6 4.6-4.6L13 8.4z" />,
  <path key="5" d="M2 15c3-4.5 5.5-4.5 8 0s5 4.5 8 0 4.5-4.5 6-2v4c-1.5-2.5-3-2.5-6 2s-5.5 4.5-8 0-5-4.5-8 0v-4z" />,
  <path key="6" d="M5 3h16v5H10v4h9v5h-9v6H5V3z" />,
  <path key="7" d="M13 3a10 10 0 0 1 10 10h-5a5 5 0 0 0-5-5V3zM3 13h5a5 5 0 0 0 5 5v5A10 10 0 0 1 3 13z" />,
];

function StarRow() {
  return (
    <svg viewBox="0 0 92 16" fill="currentColor" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          transform={`translate(${(i * 19).toFixed(0)} 0)`}
          d="M8 .8l2.1 4.4 4.8.7-3.5 3.4.8 4.8L8 11.8l-4.2 2.3.8-4.8L1.1 5.9l4.8-.7L8 .8z"
        />
      ))}
    </svg>
  );
}

export function ProofLogoCloud({
  eyebrow = "Trusted by 4,000+ product teams",
  title = "The platform behind teams that ship every single week",
  logos = defaultLogos,
  rating = 4.9,
  reviewCount = 2481,
  ratingSource = "verified reviews",
  cta = { label: "Read customer stories", href: "#customers" },
  accent = "#2f7bff",
  shimmer = true,
  className = "",
  style,
  ...rest
}: ProofLogoCloudProps) {
  const uid = React.useId();
  const safeRating = Math.max(0, Math.min(5, rating));
  const fill = ((safeRating / 5) * 100).toFixed(1);
  const vars = { "--hb-kd3-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kd3 ${className}`} style={vars} data-shimmer={shimmer ? "true" : "false"} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-proof-logo-cloud" precedence="default">{css}</style>
      <div className="hb-kd3-in">
        <header className="hb-kd3-head">
          {eyebrow && <p className="hb-kd3-eyebrow">{eyebrow}</p>}
          <h2 id={`${uid}-t`} className="hb-kd3-title">{title}</h2>
        </header>
        <ul className="hb-kd3-grid">
          {logos.map((logo, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const tileStyle = {
              "--hb-kd3-c": logo.color ?? accent,
              "--hb-kd3-d": `${((col + row) * 0.32).toFixed(2)}s`,
            } as React.CSSProperties;
            const inner = (
              <>
                <svg className="hb-kd3-glyph" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true">
                  {glyphs[(i * 5 + 3) % glyphs.length]}
                </svg>
                <span className="hb-kd3-word" data-style={i % 8}>
                  {logo.name}
                </span>
              </>
            );
            return (
              <li key={`${logo.name}-${i}`} className="hb-kd3-cell">
                {logo.href ? (
                  <a className="hb-kd3-tile" href={logo.href} style={tileStyle} aria-label={logo.name}>
                    {inner}
                  </a>
                ) : (
                  <div className="hb-kd3-tile" style={tileStyle} role="img" aria-label={logo.name}>
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="hb-kd3-rating">
          <span className="hb-kd3-score">
            <span className="hb-kd3-stars" role="img" aria-label={`Rated ${safeRating.toFixed(1)} out of 5`}>
              <span className="hb-kd3-stars-base">
                <StarRow />
              </span>
              <span className="hb-kd3-stars-fill" style={{ width: `${fill}%` }}>
                <StarRow />
              </span>
            </span>
            <strong>{safeRating.toFixed(1)}</strong>
            <span>
              from {reviewCount.toLocaleString("en-US")} {ratingSource}
            </span>
          </span>
          {cta && (
            <>
              <span className="hb-kd3-sep" aria-hidden="true" />
              <a className="hb-kd3-link" href={cta.href}>
                {cta.label}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
