"use client";

import * as React from "react";

export interface AboutPressOutlet {
  name: string;
  style?: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface AboutPressQuote {
  quote: string;
  outlet: string;
  author: string;
}

export interface AboutPressAward {
  title: string;
  issuer: string;
  year: string;
}

export interface AboutPressWallProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  outlets?: AboutPressOutlet[];
  quotes?: AboutPressQuote[];
  awards?: AboutPressAward[];
  interval?: number;
  pressKit?: { label: string; href: string };
  accent?: string;
}

const defaultOutlets: AboutPressOutlet[] = [
  { name: "The Ledger", style: 0 },
  { name: "WIRED NORTH", style: 1 },
  { name: "fastcompany", style: 2 },
  { name: "Monocle Weekly", style: 3 },
  { name: "TECHPOST", style: 4 },
  { name: "The Verge Daily", style: 5 },
  { name: "Bloomline", style: 2 },
  { name: "HACKER QUARTERLY", style: 1 },
  { name: "The Atlas", style: 3 },
  { name: "dezeen", style: 0 },
  { name: "FORMAT", style: 4 },
  { name: "Product Journal", style: 5 },
];

const defaultQuotes: AboutPressQuote[] = [
  { quote: "Halcyon has quietly become the calendar that people who hate calendars actually open.", outlet: "The Ledger", author: "Amara Quist, senior editor" },
  { quote: "The rare productivity app that gives you time back instead of asking for more of it.", outlet: "Monocle Weekly", author: "Felix Harrow, technology desk" },
  { quote: "A masterclass in restraint. Every pixel feels like it argued for its place and won.", outlet: "fastcompany", author: "Lena Ortiz, design columnist" },
];

const defaultAwards: AboutPressAward[] = [
  { title: "App of the Year", issuer: "Productivity Awards", year: "2025" },
  { title: "Best Interaction Design", issuer: "Interface Prize", year: "2025" },
  { title: "Top 10 Startups to Watch", issuer: "Northern Tech Review", year: "2024" },
  { title: "Editors' Choice", issuer: "Mac Software Guide", year: "2024" },
];

const css = `
@keyframes hb-yg4-left { to { transform: translateX(-50%); } }
@keyframes hb-yg4-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
@keyframes hb-yg4-quote {
  from { opacity: 0; transform: translateY(12px); filter: blur(4px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}
@keyframes hb-yg4-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.hb-yg4 {
  --hb-yg4-accent: #f59e0b;
  --hb-yg4-ink: #16140f;
  --hb-yg4-muted: #6f6a60;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #ffffff;
  color: var(--hb-yg4-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yg4 *, .hb-yg4 *::before, .hb-yg4 *::after { box-sizing: border-box; }
.hb-yg4-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 80px 24px 88px;
  text-align: center;
}
.hb-yg4-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 12px;
  border: 1px solid rgba(22, 20, 15, 0.1);
  border-radius: 999px;
  color: var(--hb-yg4-muted);
  font-size: 12.5px;
  font-weight: 500;
}
.hb-yg4-eyebrow i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-yg4-accent);
}
.hb-yg4-title {
  margin: 16px auto 0;
  max-width: 640px;
  font-size: clamp(30px, 4.6cqw, 46px);
  font-weight: 650;
  line-height: 1.06;
  letter-spacing: -0.04em;
  text-wrap: balance;
}
.hb-yg4-wall {
  display: grid;
  gap: 10px;
  margin: 40px -24px 0;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.hb-yg4-row { display: flex; width: max-content; gap: 10px; }
.hb-yg4-row[data-dir="l"] { animation: hb-yg4-left 46s linear infinite; }
.hb-yg4-row[data-dir="r"] { animation: hb-yg4-right 52s linear infinite; }
.hb-yg4-wall:hover .hb-yg4-row { animation-play-state: paused; }
.hb-yg4-chip {
  display: inline-flex;
  align-items: center;
  height: 58px;
  padding: 0 26px;
  border: 1px solid rgba(22, 20, 15, 0.08);
  border-radius: 14px;
  background: #faf9f6;
  color: #3a372f;
  white-space: nowrap;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}
.hb-yg4-chip:hover { color: var(--hb-yg4-ink); background: #fff; border-color: color-mix(in srgb, var(--hb-yg4-accent) 50%, transparent); }
.hb-yg4-s0 { font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 23px; letter-spacing: -0.01em; }
.hb-yg4-s1 { font-size: 13px; font-weight: 800; letter-spacing: 0.24em; }
.hb-yg4-s2 { font-size: 21px; font-weight: 700; letter-spacing: -0.05em; }
.hb-yg4-s3 { font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 19px; font-weight: 600; font-variant: small-caps; letter-spacing: 0.04em; }
.hb-yg4-s4 { font-family: ui-monospace, "Geist Mono", Menlo, monospace; font-size: 15px; font-weight: 700; letter-spacing: 0.06em; }
.hb-yg4-s5 { font-size: 17px; font-weight: 300; letter-spacing: 0.02em; }
.hb-yg4-s5::first-letter { font-weight: 800; }
.hb-yg4-stage {
  position: relative;
  max-width: 820px;
  margin: 56px auto 0;
  outline: none;
}
.hb-yg4-mark {
  display: block;
  margin: 0 auto;
  color: var(--hb-yg4-accent);
}
.hb-yg4-quote {
  margin: 14px 0 0;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: clamp(26px, 3.6cqw, 38px);
  font-weight: 400;
  line-height: 1.18;
  letter-spacing: -0.015em;
  text-wrap: balance;
  animation: hb-yg4-quote 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-yg4-by {
  margin: 18px 0 0;
  color: var(--hb-yg4-muted);
  font-size: 14px;
  animation: hb-yg4-quote 0.7s 0.1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-yg4-by strong { color: var(--hb-yg4-ink); font-weight: 600; }
.hb-yg4-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}
.hb-yg4-dot {
  position: relative;
  width: 36px;
  height: 4px;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 4px;
  background: rgba(22, 20, 15, 0.1);
  cursor: pointer;
}
.hb-yg4-dot::before { content: ""; position: absolute; inset: -10px 0; }
.hb-yg4-dot:focus-visible { outline: 2px solid var(--hb-yg4-accent); outline-offset: 3px; }
.hb-yg4-dot span {
  position: absolute;
  inset: 0;
  background: var(--hb-yg4-ink);
  transform-origin: left;
  transform: scaleX(0);
}
.hb-yg4-dot[aria-current="true"] span { animation: hb-yg4-bar var(--hb-yg4-ms) linear both; }
.hb-yg4-stage[data-paused="true"] .hb-yg4-dot span { animation-play-state: paused; }
.hb-yg4-awards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 12px;
  margin: 56px 0 0;
  padding: 0;
  list-style: none;
}
.hb-yg4-award {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border: 1px solid rgba(22, 20, 15, 0.08);
  border-radius: 16px;
  background: linear-gradient(180deg, #fff, #fbfaf7);
  text-align: left;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.hb-yg4-award:hover { transform: translateY(-2px); box-shadow: 0 16px 32px -20px rgba(22, 20, 15, 0.3); }
.hb-yg4-laurel { flex: none; color: color-mix(in srgb, var(--hb-yg4-accent) 85%, #000); }
.hb-yg4-award strong { display: block; font-size: 14.5px; font-weight: 600; letter-spacing: -0.01em; }
.hb-yg4-award span { display: block; margin-top: 2px; color: var(--hb-yg4-muted); font-size: 12.5px; }
.hb-yg4-kit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 36px;
  color: var(--hb-yg4-ink);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid rgba(22, 20, 15, 0.2);
  padding-bottom: 2px;
  transition: border-color 0.2s ease;
}
.hb-yg4-kit:hover { border-color: var(--hb-yg4-accent); }
.hb-yg4-kit:focus-visible { outline: 2px solid var(--hb-yg4-accent); outline-offset: 3px; border-radius: 2px; }
@media (prefers-reduced-motion: reduce) {
  .hb-yg4-row, .hb-yg4-quote, .hb-yg4-by, .hb-yg4-dot span { animation: none !important; }
  .hb-yg4-dot[aria-current="true"] span { transform: none; }
  .hb-yg4-chip, .hb-yg4-award { transition: none; }
}
`;

function Laurel() {
  return (
    <svg className="hb-yg4-laurel" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M13 33c-5-3-8-8-8-14 0-3 1-6 2-8" />
      <path d="M27 33c5-3 8-8 8-14 0-3-1-6-2-8" />
      <path d="M7 14c2 0 4 1 4 3-2 0-4-1-4-3Z M6 20c2 0 4 1 4 3-2 0-4-1-4-3Z M8 26c2 0 4 1 4 3-2 0-4-1-4-3Z" fill="currentColor" />
      <path d="M33 14c-2 0-4 1-4 3 2 0 4-1 4-3Z M34 20c-2 0-4 1-4 3 2 0 4-1 4-3Z M32 26c-2 0-4 1-4 3 2 0 4-1 4-3Z" fill="currentColor" />
      <path d="M20 12l2 4 4.4.6-3.2 3 .8 4.4-4-2.1-4 2.1.8-4.4-3.2-3 4.4-.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function AboutPressWall({
  eyebrow = "Press and awards",
  title = "Covered by the people who cover the craft",
  outlets = defaultOutlets,
  quotes = defaultQuotes,
  awards = defaultAwards,
  interval = 6000,
  pressKit = { label: "Download the press kit", href: "#press-kit" },
  accent = "#f59e0b",
  className = "",
  style,
  ...rest
}: AboutPressWallProps) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const half = Math.ceil(outlets.length / 2);
  const rows = [outlets.slice(0, half), outlets.slice(half)];
  const q = quotes[index % Math.max(quotes.length, 1)];

  React.useEffect(() => {
    if (paused || quotes.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % quotes.length), interval);
    return () => window.clearTimeout(id);
  }, [index, paused, interval, quotes.length]);

  return (
    <section className={`hb-yg4 ${className}`} style={{ "--hb-yg4-accent": accent, "--hb-yg4-ms": `${interval}ms`, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-about-press-wall" precedence="default">{css}</style>
      <div className="hb-yg4-in">
        <span className="hb-yg4-eyebrow"><i aria-hidden="true" />{eyebrow}</span>
        <h2 className="hb-yg4-title">{title}</h2>
        <div className="hb-yg4-wall">
          {rows.map((row, r) => (
            <div key={r} className="hb-yg4-row" data-dir={r === 0 ? "l" : "r"}>
              {[...row, ...row].map((o, i) => (
                <span
                  key={`${o.name}-${i}`}
                  className={`hb-yg4-chip hb-yg4-s${o.style ?? 0}`}
                  aria-hidden={i >= row.length ? true : undefined}
                >
                  {o.name}
                </span>
              ))}
            </div>
          ))}
        </div>
        {q && (
          <figure
            className="hb-yg4-stage"
            data-paused={paused}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <svg className="hb-yg4-mark" width="34" height="26" viewBox="0 0 34 26" fill="currentColor" aria-hidden="true">
              <path d="M0 26V15C0 6.7 4.6 1.6 13 0l1.6 3.4C9.8 5 7.4 8 7.2 12H14v14H0Zm19 0V15C19 6.7 23.6 1.6 32 0l1.6 3.4C28.8 5 26.4 8 26.2 12H33v14H19Z" />
            </svg>
            <blockquote key={`q-${index}`} className="hb-yg4-quote" aria-live="polite">{q.quote}</blockquote>
            <figcaption key={`c-${index}`} className="hb-yg4-by"><strong>{q.outlet}</strong> · {q.author}</figcaption>
            {quotes.length > 1 && (
              <div className="hb-yg4-dots" role="group" aria-label="Choose a quote">
                {quotes.map((item, i) => (
                  <button
                    key={item.outlet + i}
                    type="button"
                    className="hb-yg4-dot"
                    aria-label={`Quote from ${item.outlet}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                  >
                    <span key={i === index ? `on-${index}` : "off"} />
                  </button>
                ))}
              </div>
            )}
          </figure>
        )}
        <ul className="hb-yg4-awards">
          {awards.map((a) => (
            <li key={a.title} className="hb-yg4-award">
              <Laurel />
              <div>
                <strong>{a.title}</strong>
                <span>{a.issuer}, {a.year}</span>
              </div>
            </li>
          ))}
        </ul>
        {pressKit && (
          <a className="hb-yg4-kit" href={pressKit.href}>
            {pressKit.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 4v12M6 10l6 6 6-6M5 20h14" /></svg>
          </a>
        )}
      </div>
    </section>
  );
}
