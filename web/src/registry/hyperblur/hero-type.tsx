"use client";

import * as React from "react";

export interface HeroTypeAction {
  label: string;
  href: string;
}

export interface HeroTypeStat {
  value: string;
  suffix?: string;
  label: string;
}

export interface HeroTypeProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  words?: string[];
  subtitle?: string;
  primaryCta?: HeroTypeAction | null;
  secondaryCta?: HeroTypeAction | null;
  meta?: string[];
  stats?: HeroTypeStat[];
  keywords?: string[];
  secondaryKeywords?: string[];
  interval?: number;
  accent?: string;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-hrt {
  --hb-hrt-accent: #ff4a1c;
  --hb-hrt-bone: #ece5d8;
  --hb-hrt-line: rgba(236, 229, 216, .14);
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0b0a09;
  color: var(--hb-hrt-bone);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hrt *, .hb-hrt *::before, .hb-hrt *::after { box-sizing: border-box; }
.hb-hrt-pad { padding-left: clamp(20px, 4.4cqi, 56px); padding-right: clamp(20px, 4.4cqi, 56px); }
.hb-hrt-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 0;
  padding-top: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--hb-hrt-line);
  color: rgba(236, 229, 216, .58);
  font-size: 11.5px;
  letter-spacing: .1em;
  list-style: none;
  text-transform: uppercase;
}
.hb-hrt-top li { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
.hb-hrt-top li:first-child { color: var(--hb-hrt-bone); font-weight: 600; }
.hb-hrt-top li:first-child::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--hb-hrt-accent);
}
.hb-hrt-top li:last-child::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6ee7a8;
  animation: hb-hrt-pulse 2.2s ease-in-out infinite;
}
@keyframes hb-hrt-pulse {
  50% { opacity: .25; }
}
.hb-hrt-title {
  position: relative;
  margin: 0;
  padding-top: clamp(18px, 3.2cqi, 40px);
  color: var(--hb-hrt-bone);
  font-size: clamp(44px, 13cqi, 180px);
  font-weight: 700;
  line-height: .86;
  letter-spacing: -.058em;
  animation: hb-hrt-rise 1s cubic-bezier(.2, .8, .2, 1) both;
}
@keyframes hb-hrt-rise {
  from { opacity: 0; transform: translate3d(0, .12em, 0); }
  to { opacity: 1; transform: none; }
}
.hb-hrt-rot {
  display: inline-grid;
  padding: 0 .1em .04em 0;
  overflow: hidden;
  vertical-align: top;
  color: var(--hb-hrt-accent);
  font-family: var(--font-serif, Georgia, "Times New Roman", serif);
  font-style: italic;
  font-weight: 400;
  letter-spacing: -.03em;
}
.hb-hrt-w {
  grid-area: 1 / 1;
  opacity: 0;
  transform: translate3d(0, 105%, 0);
  transition: transform .75s cubic-bezier(.7, 0, .2, 1), opacity .45s ease;
}
.hb-hrt-w[data-state="on"] { opacity: 1; transform: none; }
.hb-hrt-w[data-state="off"] { opacity: 0; transform: translate3d(0, -105%, 0); }
.hb-hrt-mid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  align-items: end;
  gap: clamp(24px, 5cqi, 64px);
  padding-top: clamp(22px, 3cqi, 44px);
  padding-bottom: clamp(22px, 2.8cqi, 40px);
}
.hb-hrt-in {
  animation: hb-hrt-up .8s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: var(--hb-hrt-i, 0ms);
}
@keyframes hb-hrt-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-hrt-sub {
  max-width: 420px;
  margin: 0;
  color: rgba(236, 229, 216, .66);
  font-size: clamp(15px, 1.75cqi, 17px);
  line-height: 1.55;
  text-wrap: pretty;
}
.hb-hrt-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 24px;
  margin-top: 24px;
}
.hb-hrt-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 8px 0 22px;
  border-radius: 999px;
  background: var(--hb-hrt-accent);
  color: #0b0a09;
  font: inherit;
  font-size: 15px;
  font-weight: 650;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .25s ease, background .25s ease;
}
.hb-hrt-btn:hover { background: color-mix(in srgb, var(--hb-hrt-accent) 85%, #ffffff); }
.hb-hrt-btn:active { transform: scale(.97); }
.hb-hrt-btn:focus-visible, .hb-hrt-link:focus-visible { outline: 2px solid var(--hb-hrt-bone); outline-offset: 4px; }
.hb-hrt-btn span {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #0b0a09;
  color: var(--hb-hrt-accent);
  transition: transform .35s cubic-bezier(.2, .8, .2, 1);
}
.hb-hrt-btn:hover span { transform: rotate(-45deg); }
.hb-hrt-link {
  position: relative;
  padding: 6px 0;
  color: var(--hb-hrt-bone);
  font-size: 15px;
  font-weight: 550;
  text-decoration: none;
  white-space: nowrap;
}
.hb-hrt-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  height: 1px;
  background: currentColor;
  transform-origin: right;
  transition: transform .35s cubic-bezier(.2, .8, .2, 1);
}
.hb-hrt-link:hover::after { transform: scaleX(0); }
.hb-hrt-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hrt-stat {
  min-width: 0;
  padding: 12px 0 0 clamp(10px, 1.6cqi, 18px);
  border-top: 1px solid var(--hb-hrt-line);
  border-left: 1px solid var(--hb-hrt-line);
}
.hb-hrt-num {
  display: block;
  color: var(--hb-hrt-bone);
  font-size: clamp(36px, 7cqi, 104px);
  font-weight: 600;
  line-height: .9;
  letter-spacing: -.065em;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.hb-hrt-num sup {
  margin-left: .04em;
  color: var(--hb-hrt-accent);
  font-size: .42em;
  font-weight: 500;
  vertical-align: .95em;
  letter-spacing: 0;
}
.hb-hrt-stat-label {
  display: block;
  margin-top: 10px;
  color: rgba(236, 229, 216, .55);
  font-size: 11.5px;
  letter-spacing: .08em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hb-hrt-marq { margin-top: auto; border-top: 1px solid var(--hb-hrt-line); }
.hb-hrt-row {
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid var(--hb-hrt-line);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}
.hb-hrt-track {
  display: flex;
  flex: none;
  align-items: center;
  animation: hb-hrt-left var(--hb-hrt-speed, 38s) linear infinite;
}
.hb-hrt-row[data-dir="right"] .hb-hrt-track { animation-name: hb-hrt-right; }
.hb-hrt-row:hover .hb-hrt-track { animation-play-state: paused; }
@keyframes hb-hrt-left {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
@keyframes hb-hrt-right {
  from { transform: translate3d(-50%, 0, 0); }
  to { transform: translate3d(0, 0, 0); }
}
.hb-hrt-kw {
  display: inline-flex;
  align-items: center;
  gap: clamp(16px, 2.4cqi, 30px);
  padding: 8px clamp(8px, 1.2cqi, 15px);
  font-size: clamp(22px, 3.7cqi, 52px);
  font-weight: 650;
  line-height: 1.1;
  letter-spacing: -.04em;
  white-space: nowrap;
}
.hb-hrt-row[data-dir="right"] .hb-hrt-kw {
  color: transparent;
  -webkit-text-stroke: 1px rgba(236, 229, 216, .5);
  font-weight: 700;
}
.hb-hrt-kw svg { flex: none; width: .5em; height: .5em; color: var(--hb-hrt-accent); }
.hb-hrt-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-hrt-top li:nth-child(2), .hb-hrt-top li:nth-child(3) { display: none; }
  .hb-hrt-mid { grid-template-columns: minmax(0, 1fr); align-items: start; }
}
@container (max-width: 420px) {
  .hb-hrt-top li:last-child { display: none; }
  .hb-hrt-actions { flex-direction: column; align-items: stretch; }
  .hb-hrt-btn { justify-content: space-between; }
  .hb-hrt-link { align-self: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hrt-title, .hb-hrt-in, .hb-hrt-track, .hb-hrt-top li:last-child::before { animation: none; }
  .hb-hrt-w, .hb-hrt-btn, .hb-hrt-btn span, .hb-hrt-link::after { transition: none; }
}
`;

const defaultWords = ["move.", "last.", "sell.", "matter."];
const defaultMeta = ["Halden Studio", "Brand & product design", "Lisbon / New York", "Booking Q1 2027"];
const defaultStats: HeroTypeStat[] = [
  { value: "240", suffix: "+", label: "Launches" },
  { value: "12", label: "Years" },
  { value: "38", label: "Awards" },
];
const defaultKeywords = ["Brand identity", "Web design", "Product", "Motion", "Art direction", "Packaging"];
const defaultSecondary = ["Strategy", "Naming", "Type design", "Campaigns", "Editorial", "Design systems"];
const defaultPrimaryCta: HeroTypeAction = { label: "Start a project", href: "#" };
const defaultSecondaryCta: HeroTypeAction = { label: "See selected work", href: "#" };

function delay(ms: number) {
  return { "--hb-hrt-i": `${ms}ms` } as React.CSSProperties;
}

function Spark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0l2.4 7.6L22 4.6 17.2 11 24 12l-6.8 1 4.8 6.4-7.6-3L12 24l-2.4-7.6L2 19.4 6.8 13 0 12l6.8-1L2 4.6l7.6 3z" />
    </svg>
  );
}

function Row({ items, dir, speed }: { items: string[]; dir: "left" | "right"; speed: string }) {
  const loop = [...items, ...items];
  return (
    <div className="hb-hrt-row" data-dir={dir} aria-hidden="true">
      <div className="hb-hrt-track" style={{ "--hb-hrt-speed": speed } as React.CSSProperties}>
        {loop.map((item, i) => (
          <span key={i} className="hb-hrt-kw">
            {item}
            <Spark />
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroType({
  title = "Brands that",
  words = defaultWords,
  subtitle = "An independent studio building identities, websites and products for companies with something to say. Lisbon and New York, since 2014.",
  primaryCta = defaultPrimaryCta,
  secondaryCta = defaultSecondaryCta,
  meta = defaultMeta,
  stats = defaultStats,
  keywords = defaultKeywords,
  secondaryKeywords = defaultSecondary,
  interval = 2400,
  accent = "#ff4a1c",
  headingAs = "h1",
  className = "",
  style,
  ...rest
}: HeroTypeProps) {
  const Heading = headingAs;
  const [active, setActive] = React.useState(0);
  const count = words.length;
  const vars = { "--hb-hrt-accent": accent, ...style } as React.CSSProperties;

  React.useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), Math.max(800, interval));
    return () => clearInterval(id);
  }, [count, interval]);

  const current = count ? active % count : 0;
  const previous = count ? (current - 1 + count) % count : 0;
  const tail = secondaryKeywords.length ? secondaryKeywords : keywords;

  return (
    <section className={`hb-hrt ${className}`} style={vars} {...rest}>
      <style href="hb-hero-type" precedence="default">{css}</style>
      {meta.length > 0 ? (
        <ul className="hb-hrt-top hb-hrt-pad hb-hrt-in">
          {meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      <Heading className="hb-hrt-title hb-hrt-pad">
        <span className="hb-hrt-sr">{`${title} ${words.join(" ")}`}</span>
        <span aria-hidden="true">
          {title}{" "}
          {count > 0 ? (
            <span className="hb-hrt-rot">
              {words.map((word, i) => (
                <span key={i} className="hb-hrt-w" data-state={i === current ? "on" : i === previous && count > 1 ? "off" : "next"}>
                  {word}
                </span>
              ))}
            </span>
          ) : null}
        </span>
      </Heading>
      <div className="hb-hrt-mid hb-hrt-pad">
        <div className="hb-hrt-in" style={delay(250)}>
          {subtitle ? <p className="hb-hrt-sub">{subtitle}</p> : null}
          {primaryCta || secondaryCta ? (
            <div className="hb-hrt-actions">
              {primaryCta ? (
                <a className="hb-hrt-btn" href={primaryCta.href}>
                  {primaryCta.label}
                  <span aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              ) : null}
              {secondaryCta ? (
                <a className="hb-hrt-link" href={secondaryCta.href}>
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        {stats.length > 0 ? (
          <ul className="hb-hrt-stats hb-hrt-in" style={delay(380)}>
            {stats.map((stat) => (
              <li key={stat.label} className="hb-hrt-stat">
                <span className="hb-hrt-num">
                  {stat.value}
                  {stat.suffix ? <sup>{stat.suffix}</sup> : null}
                </span>
                <span className="hb-hrt-stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {keywords.length > 0 ? (
        <div className="hb-hrt-marq">
          <Row items={keywords} dir="left" speed="40s" />
          <Row items={tail} dir="right" speed="46s" />
        </div>
      ) : null}
    </section>
  );
}
