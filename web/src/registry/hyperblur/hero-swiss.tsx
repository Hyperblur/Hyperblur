"use client";

import * as React from "react";

export interface HeroSwissLink {
  label: string;
  href: string;
}

export interface HeroSwissProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  lines?: string[];
  subtitle?: string;
  meta?: string[];
  services?: HeroSwissLink[];
  cta?: HeroSwissLink | null;
  footnote?: string;
  accent?: string;
  appearance?: "light" | "dark";
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vb12 {
  --hb-vb12-accent: #ff3b1f;
  --hb-vb12-bg: #f3f1ec;
  --hb-vb12-ink: #111111;
  --hb-vb12-mute: rgba(17, 17, 17, .55);
  --hb-vb12-rule: rgba(17, 17, 17, .14);
  --hb-vb12-col: rgba(17, 17, 17, .045);
  position: relative;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: auto 1fr auto auto;
  column-gap: clamp(10px, 1.8cqi, 20px);
  width: 100%;
  min-height: 620px;
  padding: 22px clamp(18px, 4cqi, 44px) 18px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: var(--hb-vb12-bg);
  color: var(--hb-vb12-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vb12[data-appearance="dark"] {
  --hb-vb12-bg: #0c0c0c;
  --hb-vb12-ink: #ededed;
  --hb-vb12-mute: rgba(237, 237, 237, .55);
  --hb-vb12-rule: rgba(237, 237, 237, .14);
  --hb-vb12-col: rgba(237, 237, 237, .04);
}
.hb-vb12 *, .hb-vb12 *::before, .hb-vb12 *::after { box-sizing: border-box; }
.hb-vb12-cols {
  position: absolute;
  inset: 0 clamp(18px, 4cqi, 44px);
  z-index: -1;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: clamp(10px, 1.8cqi, 20px);
  pointer-events: none;
}
.hb-vb12-cols span { background: var(--hb-vb12-col); transform-origin: 50% 0; animation: hb-vb12-drop 1.2s cubic-bezier(.76, 0, .24, 1) both; animation-delay: calc(var(--hb-vb12-i) * 40ms); }
@keyframes hb-vb12-drop {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
.hb-vb12-meta {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
  padding: 0 0 12px;
  border-bottom: 1px solid var(--hb-vb12-ink);
  font-size: 12px;
  font-weight: 500;
  list-style: none;
}
.hb-vb12-meta li:last-child { justify-self: end; }
.hb-vb12-title {
  grid-column: 1 / span 10;
  grid-row: 2;
  align-self: center;
  margin: 28px 0 24px;
  font-size: clamp(48px, 10.4cqi, 136px);
  font-weight: 600;
  line-height: .9;
  letter-spacing: -.06em;
}
.hb-vb12-line { display: block; overflow: hidden; padding-bottom: .06em; }
.hb-vb12-line > span { display: inline-block; animation: hb-vb12-rise 1.1s cubic-bezier(.76, 0, .24, 1) both; animation-delay: calc(300ms + var(--hb-vb12-i) * 110ms); }
@keyframes hb-vb12-rise {
  from { transform: translate3d(0, 105%, 0); }
  to { transform: none; }
}
.hb-vb12-line[data-indent] { padding-left: 8.33%; }
.hb-vb12-line:last-child > span::after {
  content: "";
  display: inline-block;
  width: .18em;
  height: .18em;
  margin-left: .04em;
  border-radius: 50%;
  background: var(--hb-vb12-accent);
}
.hb-vb12-mark {
  grid-column: 11 / span 2;
  grid-row: 2;
  align-self: start;
  justify-self: end;
  width: clamp(44px, 9cqi, 96px);
  aspect-ratio: 1;
  margin-top: 30px;
  border-radius: 50%;
  background: var(--hb-vb12-accent);
  animation: hb-vb12-grow 1.2s cubic-bezier(.34, 1.56, .64, 1) .9s both;
}
@keyframes hb-vb12-grow {
  from { transform: scale(0); }
  to { transform: none; }
}
.hb-vb12-sub {
  grid-column: 1 / span 4;
  grid-row: 3;
  align-self: end;
  margin: 0;
  color: var(--hb-vb12-mute);
  font-size: 14px;
  line-height: 1.5;
}
.hb-vb12-sub::before { content: ""; display: block; width: 24px; height: 2px; margin-bottom: 12px; background: var(--hb-vb12-ink); }
.hb-vb12-list { grid-column: 6 / span 4; grid-row: 3; align-self: end; margin: 0; padding: 0; list-style: none; counter-reset: hb-vb12-n; }
.hb-vb12-item a {
  position: relative;
  display: grid;
  grid-template-columns: 32px 1fr auto;
  align-items: center;
  padding: 8px 0;
  border-top: 1px solid var(--hb-vb12-rule);
  color: inherit;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}
.hb-vb12-item a::before { counter-increment: hb-vb12-n; content: counter(hb-vb12-n, decimal-leading-zero); color: var(--hb-vb12-mute); font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; }
.hb-vb12-item a::after {
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  width: 100%;
  height: 1px;
  background: var(--hb-vb12-ink);
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform .5s cubic-bezier(.76, 0, .24, 1);
}
.hb-vb12-item a:hover::after, .hb-vb12-item a:focus-visible::after { transform: scaleX(1); }
.hb-vb12-item a:focus-visible { outline: 2px solid var(--hb-vb12-accent); outline-offset: 2px; }
.hb-vb12-item svg { opacity: 0; transform: translate3d(-6px, 0, 0); transition: opacity .3s ease, transform .4s cubic-bezier(.16, 1, .3, 1); }
.hb-vb12-item a:hover svg, .hb-vb12-item a:focus-visible svg { opacity: 1; transform: none; }
.hb-vb12-cta {
  grid-column: 10 / span 3;
  grid-row: 3;
  align-self: end;
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 0 4px;
  border-bottom: 2px solid var(--hb-vb12-ink);
  color: inherit;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  transition: color .3s ease, border-color .3s ease;
}
.hb-vb12-cta:hover { color: var(--hb-vb12-accent); border-color: var(--hb-vb12-accent); }
.hb-vb12-cta:focus-visible { outline: 2px solid var(--hb-vb12-accent); outline-offset: 4px; }
.hb-vb12-cta svg { transition: transform .4s cubic-bezier(.16, 1, .3, 1); }
.hb-vb12-cta:hover svg { transform: translate3d(3px, -3px, 0); }
.hb-vb12-foot {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
  padding-top: 10px;
  border-top: 1px solid var(--hb-vb12-rule);
  color: var(--hb-vb12-mute);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.hb-vb12-in { animation: hb-vb12-fade .9s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--hb-vb12-d, 0ms); }
@keyframes hb-vb12-fade {
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vb12-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 720px) {
  .hb-vb12-title { grid-column: 1 / -1; }
  .hb-vb12-mark { display: none; }
  .hb-vb12-meta { grid-template-columns: 1fr 1fr; }
  .hb-vb12-meta li:nth-child(2), .hb-vb12-meta li:nth-child(3) { display: none; }
  .hb-vb12-sub, .hb-vb12-list { grid-column: 1 / -1; margin-bottom: 20px; }
  .hb-vb12-cta { grid-column: 1 / -1; justify-self: start; }
  .hb-vb12-line[data-indent] { padding-left: 0; }
  .hb-vb12-title, .hb-vb12-sub, .hb-vb12-list, .hb-vb12-cta { grid-row: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vb12-cols span, .hb-vb12-line > span, .hb-vb12-mark, .hb-vb12-in { animation: none; }
  .hb-vb12-item a::after, .hb-vb12-item svg, .hb-vb12-cta, .hb-vb12-cta svg { transition: none; }
}
`;

const defaultLines = ["We make", "quiet things", "that last"];
const defaultMeta = ["Studio Brandt", "No. 07 / Autumn 2026", "Identity and wayfinding", "Zurich, CH"];
const defaultServices: HeroSwissLink[] = [
  { label: "Identity systems", href: "#" },
  { label: "Digital products", href: "#" },
  { label: "Wayfinding", href: "#" },
  { label: "Editorial design", href: "#" },
];
const defaultCta: HeroSwissLink = { label: "Start a conversation", href: "#" };

function d(ms: number) {
  return { "--hb-vb12-d": `${ms}ms` } as React.CSSProperties;
}

export function HeroSwiss({
  lines = defaultLines,
  subtitle = "An independent practice of six designers. We build brand systems for museums, transit networks and companies that plan in decades.",
  meta = defaultMeta,
  services = defaultServices,
  cta = defaultCta,
  footnote = "47.3769 N, 8.5417 E",
  accent = "#ff3b1f",
  appearance = "light",
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroSwissProps) {
  const Heading = headingAs;
  const vars = { "--hb-vb12-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-vb12 ${className}`} style={vars} data-appearance={appearance} {...rest}>
      <style href="hb-hero-swiss" precedence="default">{css}</style>
      <div className="hb-vb12-cols" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} style={{ "--hb-vb12-i": i } as React.CSSProperties} />
        ))}
      </div>
      {meta.length ? (
        <ul className="hb-vb12-meta hb-vb12-in" style={d(100)}>
          {meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      <Heading className="hb-vb12-title">
        <span className="hb-vb12-sr">{lines.join(" ")}</span>
        {lines.map((line, i) => (
          <span key={i} className="hb-vb12-line" data-indent={i === 1 ? "" : undefined} aria-hidden="true">
            <span style={{ "--hb-vb12-i": i } as React.CSSProperties}>{line}</span>
          </span>
        ))}
      </Heading>
      <span className="hb-vb12-mark" aria-hidden="true" />
      {subtitle ? (
        <p className="hb-vb12-sub hb-vb12-in" style={d(700)}>
          {subtitle}
        </p>
      ) : null}
      {services.length ? (
        <ul className="hb-vb12-list hb-vb12-in" style={d(800)}>
          {services.map((service) => (
            <li key={service.label} className="hb-vb12-item">
              <a href={service.href}>
                {service.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      {cta ? (
        <a className="hb-vb12-cta hb-vb12-in" style={d(900)} href={cta.href}>
          {cta.label}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      ) : null}
      <div className="hb-vb12-foot hb-vb12-in" style={d(1000)} aria-hidden="true">
        <span>Scroll</span>
        <span>{footnote}</span>
      </div>
    </section>
  );
}
