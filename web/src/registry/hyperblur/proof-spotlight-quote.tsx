"use client";

import * as React from "react";

export interface SpotlightQuote {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric?: string;
}

export interface ProofSpotlightQuoteProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  quotes?: SpotlightQuote[];
  interval?: number;
  autoPlay?: boolean;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  accent?: string;
}

const css = `
.hb-kd2 {
  --hb-kd2-accent: #ff5a36;
  --hb-kd2-int: 6s;
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #f7f5ef;
  color: #17161a;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kd2 *, .hb-kd2 *::before, .hb-kd2 *::after { box-sizing: border-box; }
.hb-kd2::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(50% 60% at 100% 0%, color-mix(in srgb, var(--hb-kd2-accent) 10%, transparent), transparent 70%),
    repeating-linear-gradient(0deg, rgba(23, 22, 26, .035) 0 1px, transparent 1px 32px);
  pointer-events: none;
}
.hb-kd2-in {
  position: relative;
  max-width: 1040px;
  margin: 0 auto;
  padding: 104px 32px 96px;
}
.hb-kd2-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 40px;
}
.hb-kd2-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #5d5a55;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-kd2-eyebrow::before {
  content: "";
  width: 28px;
  height: 1px;
  background: var(--hb-kd2-accent);
}
.hb-kd2-count {
  color: #8a867f;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  letter-spacing: .04em;
}
.hb-kd2-count b { color: #17161a; font-weight: 600; }
.hb-kd2-stage { display: grid; }
.hb-kd2-slide {
  grid-area: 1 / 1;
  margin: 0;
  opacity: 0;
  filter: blur(12px);
  transform: translate3d(0, 10px, 0) scale(.985);
  transition: opacity .7s ease, filter .8s ease, transform .9s cubic-bezier(.2, .8, .2, 1), visibility 0s linear .9s;
  visibility: hidden;
}
.hb-kd2-slide[data-active="true"] {
  opacity: 1;
  filter: blur(0);
  transform: none;
  visibility: visible;
  transition: opacity .7s ease .15s, filter .8s ease .1s, transform .9s cubic-bezier(.2, .8, .2, 1) .1s, visibility 0s linear 0s;
}
.hb-kd2-mark {
  display: block;
  width: 44px;
  height: 34px;
  margin-bottom: 20px;
  color: var(--hb-kd2-accent);
}
.hb-kd2-quote {
  margin: 0;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: clamp(28px, 5.2cqi, 54px);
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -.015em;
  color: #17161a;
  text-wrap: balance;
}
.hb-kd2-metric {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  padding: 6px 12px;
  border: 1px solid color-mix(in srgb, var(--hb-kd2-accent) 30%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-kd2-accent) 8%, #fff);
  color: color-mix(in srgb, var(--hb-kd2-accent) 70%, #17161a);
  font-size: 13px;
  font-weight: 600;
}
.hb-kd2-metric svg { width: 14px; height: 14px; }
.hb-kd2-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-top: 48px;
  padding-top: 28px;
  border-top: 1px solid rgba(23, 22, 26, .1);
}
.hb-kd2-authors { display: grid; min-width: 0; }
.hb-kd2-author {
  grid-area: 1 / 1;
  display: flex;
  align-items: center;
  gap: 14px;
  opacity: 0;
  transform: translate3d(0, 6px, 0);
  transition: opacity .5s ease, transform .6s cubic-bezier(.2, .8, .2, 1);
}
.hb-kd2-author[data-active="true"] { opacity: 1; transform: none; transition-delay: .2s; }
.hb-kd2-face {
  display: grid;
  flex: none;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 0 0 3px #f7f5ef, 0 0 0 4px rgba(23, 22, 26, .12);
}
.hb-kd2-name { display: block; font-size: 16px; font-weight: 600; font-style: normal; color: #17161a; }
.hb-kd2-role { display: block; margin-top: 2px; font-size: 14px; color: #6b6760; }
.hb-kd2-nav { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; flex: none; }
.hb-kd2-dots { display: flex; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-kd2-dot {
  position: relative;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #fff;
  font: inherit;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hb-kd2-dot-face {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  filter: grayscale(1) contrast(.9);
  opacity: .55;
  transition: filter .3s ease, opacity .3s ease, transform .35s cubic-bezier(.2, .8, .2, 1);
}
.hb-kd2-dot:hover .hb-kd2-dot-face { filter: none; opacity: .9; transform: scale(1.06); }
.hb-kd2-dot[aria-current="true"] .hb-kd2-dot-face { filter: none; opacity: 1; transform: scale(1.08); }
.hb-kd2-ring { position: absolute; inset: 0; width: 34px; height: 34px; transform: rotate(-90deg); pointer-events: none; }
.hb-kd2-ring circle { fill: none; stroke-width: 2; }
.hb-kd2-ring-bg { stroke: transparent; }
.hb-kd2-dot[aria-current="true"] .hb-kd2-ring-bg { stroke: rgba(23, 22, 26, .12); }
.hb-kd2-ring-fg { stroke: var(--hb-kd2-accent); stroke-dasharray: 100; stroke-dashoffset: 100; stroke-linecap: round; }
.hb-kd2-dot[aria-current="true"] .hb-kd2-ring-fg { stroke-dashoffset: 0; }
.hb-kd2[data-play="true"] .hb-kd2-dot[aria-current="true"] .hb-kd2-ring-fg { animation: hb-kd2-fill var(--hb-kd2-int) linear forwards; }
.hb-kd2[data-play="true"][data-paused="true"] .hb-kd2-ring-fg { animation-play-state: paused; }
@keyframes hb-kd2-fill { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
.hb-kd2-dot:focus-visible { outline: 2px solid var(--hb-kd2-accent); outline-offset: 2px; }
.hb-kd2-hint { color: #8a867f; font-size: 12px; }
@container (max-width: 640px) {
  .hb-kd2-in { padding: 72px 20px 64px; }
  .hb-kd2-top { margin-bottom: 28px; }
  .hb-kd2-bottom { flex-direction: column; align-items: flex-start; gap: 24px; margin-top: 36px; }
  .hb-kd2-nav { align-items: flex-start; }
  .hb-kd2-hint { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kd2-slide, .hb-kd2-slide[data-active="true"], .hb-kd2-author, .hb-kd2-author[data-active="true"], .hb-kd2-dot-face { transition: none; filter: none; transform: none; }
  .hb-kd2-ring-fg { animation: none !important; }
}
`;

const defaultQuotes: SpotlightQuote[] = [
  {
    quote: "We moved our entire billing stack in a weekend. Six months later, nobody on the team remembers what the old dashboards looked like.",
    name: "Elena Marchetti",
    role: "Head of Finance Operations",
    company: "Fernhill",
    metric: "Month-end close in 2 days, down from 9",
  },
  {
    quote: "Ledgerly is the rare tool that made our accountants and our engineers happy at the same time. That has never happened before.",
    name: "Marcus Webb",
    role: "VP Engineering",
    company: "Halcyon Health",
    metric: "38 hours saved every month",
  },
  {
    quote: "Revenue recognition used to be a spreadsheet with a prayer attached. Now it is a report I can send to the board without rechecking it.",
    name: "Aiko Tanaka",
    role: "Chief Financial Officer",
    company: "Quartzline",
    metric: "Zero audit adjustments in FY25",
  },
  {
    quote: "Their team answered our migration questions faster than our own Slack channel did. The product is great, the people are better.",
    name: "Samuel Osei",
    role: "Controller",
    company: "Driftwood Supply",
    metric: "Live across 4 entities in 3 weeks",
  },
];

const faces = [
  "linear-gradient(135deg, #ff7a45, #e8366d)",
  "linear-gradient(135deg, #3b82f6, #14b8a6)",
  "linear-gradient(135deg, #8b5cf6, #ec4899)",
  "linear-gradient(135deg, #f59e0b, #65a30d)",
  "linear-gradient(135deg, #0ea5e9, #6366f1)",
  "linear-gradient(135deg, #f43f5e, #f59e0b)",
];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ProofSpotlightQuote({
  eyebrow = "Customer stories",
  quotes = defaultQuotes,
  interval = 6,
  autoPlay = true,
  defaultIndex = 0,
  onIndexChange,
  accent = "#ff5a36",
  className = "",
  style,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: ProofSpotlightQuoteProps) {
  const uid = React.useId();
  const count = quotes.length;
  const [index, setIndex] = React.useState(() => Math.max(0, Math.min(count - 1, defaultIndex)));
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const dotsRef = React.useRef<HTMLUListElement>(null);
  const active = count > 0 ? Math.min(index, count - 1) : 0;
  const playing = autoPlay && count > 1;
  const paused = hovered || focused;

  const go = React.useCallback(
    (next: number) => {
      if (count === 0) return;
      const value = ((next % count) + count) % count;
      setIndex(value);
      onIndexChange?.(value);
    },
    [count, onIndexChange],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    if (next === -1) return;
    e.preventDefault();
    const value = ((next % count) + count) % count;
    go(value);
    const buttons = dotsRef.current?.querySelectorAll<HTMLButtonElement>("button");
    buttons?.[value]?.focus();
  };

  const vars = { "--hb-kd2-accent": accent, "--hb-kd2-int": `${Math.max(2, interval)}s`, ...style } as React.CSSProperties;

  return (
    <section
      className={`hb-kd2 ${className}`}
      style={vars}
      data-play={playing ? "true" : "false"}
      data-paused={paused ? "true" : "false"}
      aria-roledescription="carousel"
      aria-label={eyebrow || "Customer quotes"}
      onMouseEnter={(e) => {
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
        onBlur?.(e);
      }}
      {...rest}
    >
      <style href="hb-proof-spotlight-quote" precedence="default">{css}</style>
      <div className="hb-kd2-in">
        <div className="hb-kd2-top">
          {eyebrow ? <span className="hb-kd2-eyebrow">{eyebrow}</span> : <span />}
          {count > 1 && (
            <span className="hb-kd2-count" aria-hidden="true">
              <b>{String(active + 1).padStart(2, "0")}</b> / {String(count).padStart(2, "0")}
            </span>
          )}
        </div>
        <div className="hb-kd2-stage" aria-live={playing && !paused ? "off" : "polite"}>
          {quotes.map((q, i) => (
            <figure
              key={`${q.name}-${i}`}
              id={`${uid}-s${i}`}
              className="hb-kd2-slide"
              data-active={i === active ? "true" : "false"}
              aria-hidden={i !== active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <svg className="hb-kd2-mark" viewBox="0 0 44 34" fill="currentColor" aria-hidden="true">
                <path d="M0 34V20.6C0 9.4 5.6 2.5 16.8 0l2 4.4C12.6 6.3 9.6 10 9.4 15.6H18V34H0zm26 0V20.6C26 9.4 31.6 2.5 42.8 0l2 4.4c-6.2 1.9-9.2 5.6-9.4 11.2H44V34H26z" />
              </svg>
              <blockquote className="hb-kd2-quote">{q.quote}</blockquote>
              {q.metric && (
                <span className="hb-kd2-metric">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 11.5l4-4 3 3 5-6" />
                    <path d="M10.5 4.5H14V8" />
                  </svg>
                  {q.metric}
                </span>
              )}
            </figure>
          ))}
        </div>
        <div className="hb-kd2-bottom">
          <div className="hb-kd2-authors">
            {quotes.map((q, i) => (
              <div key={`${q.name}-a${i}`} className="hb-kd2-author" data-active={i === active ? "true" : "false"} aria-hidden={i !== active}>
                <span className="hb-kd2-face" style={{ background: faces[i % faces.length] }} aria-hidden="true">
                  {initialsOf(q.name)}
                </span>
                <span>
                  <cite className="hb-kd2-name">{q.name}</cite>
                  <span className="hb-kd2-role">
                    {q.role}, {q.company}
                  </span>
                </span>
              </div>
            ))}
          </div>
          {count > 1 && (
            <div className="hb-kd2-nav">
              <ul className="hb-kd2-dots" ref={dotsRef} onKeyDown={onKeyDown} aria-label="Choose a quote">
                {quotes.map((q, i) => (
                  <li key={`${q.name}-d${i}`}>
                    <button
                      type="button"
                      className="hb-kd2-dot"
                      aria-current={i === active ? "true" : undefined}
                      aria-controls={`${uid}-s${i}`}
                      aria-label={`Quote from ${q.name}, ${q.company}`}
                      tabIndex={i === active ? 0 : -1}
                      onClick={() => go(i)}
                    >
                      <span className="hb-kd2-dot-face" style={{ background: faces[i % faces.length] }} aria-hidden="true">
                        {initialsOf(q.name)}
                      </span>
                      <svg className="hb-kd2-ring" viewBox="0 0 34 34" aria-hidden="true">
                        <circle className="hb-kd2-ring-bg" cx="17" cy="17" r="16" pathLength={100} />
                        <circle
                          key={i === active ? `on-${active}` : "off"}
                          className="hb-kd2-ring-fg"
                          cx="17"
                          cy="17"
                          r="16"
                          pathLength={100}
                          onAnimationEnd={i === active ? () => go(active + 1) : undefined}
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              <span className="hb-kd2-hint">{playing ? "Hover to pause" : "Use arrow keys to browse"}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
