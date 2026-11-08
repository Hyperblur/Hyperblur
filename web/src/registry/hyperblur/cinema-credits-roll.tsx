"use client";

import * as React from "react";

export interface CinemaCreditsLine {
  role: string;
  names: string[];
}

export interface CinemaCreditsBlock {
  heading?: string;
  lines: CinemaCreditsLine[];
}

export interface CinemaCreditsRollProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  blocks?: CinemaCreditsBlock[];
  note?: string;
  endCard?: string;
  duration?: number;
  paused?: boolean;
  defaultPaused?: boolean;
  onPausedChange?: (paused: boolean) => void;
  accent?: string;
  headingAs?: "h1" | "h2";
}

const defaultBlocks: CinemaCreditsBlock[] = [
  {
    lines: [
      { role: "Directed by", names: ["Mira Okafor"] },
      { role: "Written by", names: ["Mira Okafor", "Henrik Saar"] },
      { role: "Produced by", names: ["Lior Adler", "Maya Brandt"] },
    ],
  },
  {
    heading: "Cast",
    lines: [
      { role: "Elena Voss", names: ["Ines Carvalho"] },
      { role: "Tomas Reyes", names: ["Jonah Vale"] },
      { role: "The Keeper", names: ["Teo Lindqvist"] },
      { role: "Ada", names: ["Priya Raman"] },
    ],
  },
  {
    heading: "Crew",
    lines: [
      { role: "Director of Photography", names: ["Sun-Hee Park"] },
      { role: "Production Designer", names: ["Bastien Moreau"] },
      { role: "Editor", names: ["Dana Whitlock"] },
      { role: "Original Music", names: ["Arvo Ness"] },
      { role: "Sound Design", names: ["Kofi Mensah", "Rhea Patel"] },
      { role: "Costume Designer", names: ["Lucía Ferrer"] },
      { role: "Visual Effects", names: ["Northlight Studio"] },
      { role: "Colorist", names: ["Anouk de Vries"] },
    ],
  },
];

const css = `
.hb-vc3 {
  --hb-vc3-accent: #d7c49e;
  --hb-vc3-dur: 38s;
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 580px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: radial-gradient(90% 70% at 50% 50%, #0d0c0b, #000 80%);
  color: #ece6da;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc3 *, .hb-vc3 *::before, .hb-vc3 *::after { box-sizing: border-box; }
.hb-vc3-viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 22%, #000 78%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0, #000 22%, #000 78%, transparent 100%);
}
.hb-vc3-roll {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
  padding: 0 24px;
  animation: hb-vc3-roll var(--hb-vc3-dur) linear infinite;
  animation-delay: calc(var(--hb-vc3-dur) * -.12);
  will-change: transform;
}
.hb-vc3[data-paused="true"] .hb-vc3-roll,
.hb-vc3-viewport:hover .hb-vc3-roll { animation-play-state: paused; }
@keyframes hb-vc3-roll {
  from { top: 100%; transform: translate3d(0, 0, 0); }
  to { top: 0%; transform: translate3d(0, -100%, 0); }
}
.hb-vc3-title {
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(28px, 6cqi, 64px);
  font-weight: 600;
  letter-spacing: .28em;
  text-align: center;
  text-transform: uppercase;
}
.hb-vc3-block { display: flex; flex-direction: column; align-items: center; gap: 22px; width: 100%; max-width: 720px; }
.hb-vc3-heading {
  margin: 0;
  color: var(--hb-vc3-accent);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .5em;
  text-transform: uppercase;
}
.hb-vc3-heading::after {
  content: "";
  display: block;
  width: 28px;
  height: 1px;
  margin: 14px auto 0;
  background: currentColor;
  opacity: .6;
}
.hb-vc3-list { display: grid; gap: 14px; width: 100%; margin: 0; }
.hb-vc3-line {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 28px minmax(0, 1fr);
  align-items: baseline;
}
.hb-vc3-role {
  margin: 0;
  color: rgba(236, 230, 218, .5);
  font-size: clamp(10px, 1.2cqi, 12px);
  font-weight: 500;
  letter-spacing: .2em;
  text-align: right;
  text-transform: uppercase;
}
.hb-vc3-names { display: flex; flex-direction: column; gap: 4px; grid-column: 3; margin: 0; }
.hb-vc3-name {
  color: #f4efe5;
  font-size: clamp(14px, 1.9cqi, 19px);
  font-weight: 500;
  letter-spacing: .04em;
}
.hb-vc3-note {
  max-width: 460px;
  margin: 0;
  color: rgba(236, 230, 218, .45);
  font-size: 12px;
  line-height: 1.7;
  letter-spacing: .06em;
  text-align: center;
}
.hb-vc3-end {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding-bottom: 40px;
}
.hb-vc3-mark {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border: 1px solid rgba(236, 230, 218, .35);
  border-radius: 50%;
  color: var(--hb-vc3-accent);
}
.hb-vc3-endtext {
  margin: 0;
  font-size: 11px;
  letter-spacing: .5em;
  text-transform: uppercase;
  color: rgba(236, 230, 218, .62);
}
.hb-vc3-hud {
  position: absolute;
  left: clamp(14px, 3cqi, 28px);
  right: clamp(14px, 3cqi, 28px);
  bottom: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: rgba(236, 230, 218, .45);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-vc3-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 12px 0 10px;
  border: 1px solid rgba(236, 230, 218, .16);
  border-radius: 999px;
  background: rgba(20, 18, 16, .7);
  color: rgba(236, 230, 218, .8);
  font: inherit;
  cursor: pointer;
  transition: border-color .25s ease, color .25s ease;
}
.hb-vc3-toggle:hover { border-color: rgba(236, 230, 218, .4); color: #fff; }
.hb-vc3-toggle:focus-visible { outline: 2px solid var(--hb-vc3-accent); outline-offset: 3px; }
.hb-vc3-side {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  width: 14px;
  background: repeating-linear-gradient(180deg, transparent 0 10px, rgba(236, 230, 218, .07) 10px 18px);
  pointer-events: none;
}
.hb-vc3-side[data-side="l"] { left: 10px; }
.hb-vc3-side[data-side="r"] { right: 10px; }
@media (prefers-reduced-motion: reduce) {
  .hb-vc3-roll { animation: none; position: relative; top: 0; padding-top: 48px; padding-bottom: 64px; }
  .hb-vc3-viewport { overflow-y: auto; }
  .hb-vc3-toggle { display: none; }
}
`;

export function CinemaCreditsRoll({
  title = "The Long Quiet",
  blocks = defaultBlocks,
  note = "Filmed on location in Reykjavík, Iceland and Lisbon, Portugal. No lighthouses were harmed in the making of this picture.",
  endCard = "Halden Pictures",
  duration = 38,
  paused,
  defaultPaused = false,
  onPausedChange,
  accent = "#d7c49e",
  headingAs = "h2",
  className,
  style,
  ...rest
}: CinemaCreditsRollProps) {
  const Heading = headingAs;
  const [inner, setInner] = React.useState(defaultPaused);
  const isPaused = paused ?? inner;
  const toggle = () => {
    const next = !isPaused;
    if (paused === undefined) setInner(next);
    onPausedChange?.(next);
  };
  const vars = { "--hb-vc3-accent": accent, "--hb-vc3-dur": `${duration}s`, ...style } as React.CSSProperties;

  return (
    <section
      className={["hb-vc3", className].filter(Boolean).join(" ")}
      style={vars}
      data-paused={isPaused ? "true" : "false"}
      aria-label={`${title} credits`}
      {...rest}
    >
      <style href="hb-cinema-credits-roll" precedence="default">{css}</style>
      <span className="hb-vc3-side" data-side="l" aria-hidden="true" />
      <span className="hb-vc3-side" data-side="r" aria-hidden="true" />
      <div className="hb-vc3-viewport">
        <div className="hb-vc3-roll">
          <Heading className="hb-vc3-title">{title}</Heading>
          {blocks.map((block, bi) => (
            <div className="hb-vc3-block" key={bi}>
              {block.heading ? <h3 className="hb-vc3-heading">{block.heading}</h3> : null}
              <dl className="hb-vc3-list">
                {block.lines.map((line, li) => (
                  <div className="hb-vc3-line" key={li}>
                    <dt className="hb-vc3-role">{line.role}</dt>
                    <dd className="hb-vc3-names">
                      {line.names.map((n) => (
                        <span className="hb-vc3-name" key={n}>{n}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          {note ? <p className="hb-vc3-note">{note}</p> : null}
          <div className="hb-vc3-end">
            <span className="hb-vc3-mark" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="13" cy="7.5" r="2.2" fill="currentColor" />
                <circle cx="13" cy="18.5" r="2.2" fill="currentColor" />
                <circle cx="7.5" cy="13" r="2.2" fill="currentColor" />
                <circle cx="18.5" cy="13" r="2.2" fill="currentColor" />
              </svg>
            </span>
            <p className="hb-vc3-endtext">{endCard}</p>
          </div>
        </div>
      </div>
      <div className="hb-vc3-hud">
        <span aria-hidden="true">End credits · 01:52:14</span>
        <button type="button" className="hb-vc3-toggle" onClick={toggle} aria-pressed={isPaused}>
          {isPaused ? (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 0.5 L9.5 5 L1 9.5Z" fill="currentColor" /></svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 0.5h2.4v9H1.5zM6.1 0.5h2.4v9H6.1z" fill="currentColor" /></svg>
          )}
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
    </section>
  );
}
