"use client";

import * as React from "react";

export interface CinemaCountdownLeaderAction {
  label: string;
  href: string;
}

export interface CinemaCountdownLeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  from?: number;
  to?: number;
  loop?: boolean;
  hold?: number;
  eyebrow?: string;
  title?: string;
  details?: string[];
  cta?: CinemaCountdownLeaderAction | null;
  accent?: string;
  onComplete?: () => void;
  headingAs?: "h1" | "h2";
}

const css = `
@property --hb-vc9-a {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
.hb-vc9 {
  --hb-vc9-accent: #e8ff5a;
  position: relative;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 580px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #07070a;
  color: #f2f2ee;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc9 *, .hb-vc9 *::before, .hb-vc9 *::after { box-sizing: border-box; }
.hb-vc9-content {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 760px;
  padding: 80px 24px;
  text-align: center;
}
.hb-vc9-glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(50% 40% at 50% 50%, color-mix(in srgb, var(--hb-vc9-accent) 14%, transparent), transparent 70%);
}
.hb-vc9[data-phase="done"] .hb-vc9-content > * { animation: hb-vc9-up 1s cubic-bezier(.16, .8, .2, 1) both; }
.hb-vc9[data-phase="done"] .hb-vc9-content > *:nth-child(3) { animation-delay: .12s; }
.hb-vc9[data-phase="done"] .hb-vc9-content > *:nth-child(4) { animation-delay: .24s; }
.hb-vc9[data-phase="done"] .hb-vc9-content > *:nth-child(5) { animation-delay: .36s; }
@keyframes hb-vc9-up {
  from { opacity: 0; transform: translate3d(0, 18px, 0) scale(.98); }
  to { opacity: 1; transform: none; }
}
.hb-vc9-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 18px;
  padding: 6px 12px;
  border: 1px solid color-mix(in srgb, var(--hb-vc9-accent) 40%, transparent);
  border-radius: 999px;
  color: var(--hb-vc9-accent);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: .2em;
  text-transform: uppercase;
}
.hb-vc9-title {
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(42px, 9.6cqi, 124px);
  font-weight: 700;
  line-height: .9;
  letter-spacing: -.045em;
}
.hb-vc9-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 22px;
  margin: 22px 0 0;
  padding: 0;
  color: rgba(242, 242, 238, .7);
  font-size: 14px;
  list-style: none;
}
.hb-vc9-details li { display: inline-flex; align-items: center; gap: 22px; }
.hb-vc9-details li + li::before { content: ""; width: 4px; height: 4px; margin-left: -13px; border-radius: 50%; background: rgba(242, 242, 238, .35); }
.hb-vc9-actions { display: flex; gap: 10px; margin-top: 28px; }
.hb-vc9-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border: 1px solid rgba(242, 242, 238, .18);
  border-radius: 999px;
  background: transparent;
  color: #f2f2ee;
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  text-decoration: none;
  cursor: pointer;
  transition: background .25s ease, border-color .25s ease, transform .2s ease;
}
.hb-vc9-btn[data-primary] { border-color: transparent; background: var(--hb-vc9-accent); color: #0a0a06; }
.hb-vc9-btn:hover { border-color: rgba(242, 242, 238, .4); }
.hb-vc9-btn[data-primary]:hover { background: color-mix(in srgb, var(--hb-vc9-accent) 85%, #fff); }
.hb-vc9-btn:active { transform: scale(.97); }
.hb-vc9-btn:focus-visible { outline: 2px solid var(--hb-vc9-accent); outline-offset: 3px; }
.hb-vc9-leader {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  background: radial-gradient(70% 80% at 50% 50%, #8b8a84, #4a4945 70%, #232220);
  color: #0d0d0c;
  transition: opacity .5s ease, visibility .5s;
}
.hb-vc9[data-phase="done"] .hb-vc9-leader { opacity: 0; visibility: hidden; }
.hb-vc9-leader::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, .05) 0 1px, transparent 1px 3px);
  animation: hb-vc9-jitter .12s steps(2, end) infinite;
}
@keyframes hb-vc9-jitter {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(0, 1px, 0); }
}
.hb-vc9-cross {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent calc(50% - .75px), rgba(13, 13, 12, .75) calc(50% - .75px), rgba(13, 13, 12, .75) calc(50% + .75px), transparent calc(50% + .75px)),
    linear-gradient(0deg, transparent calc(50% - .75px), rgba(13, 13, 12, .75) calc(50% - .75px), rgba(13, 13, 12, .75) calc(50% + .75px), transparent calc(50% + .75px));
}
.hb-vc9-dial {
  position: relative;
  display: grid;
  place-items: center;
  width: min(66cqi, 400px);
  aspect-ratio: 1;
  border-radius: 50%;
}
.hb-vc9-sweep {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, rgba(13, 13, 12, .55) 0 var(--hb-vc9-a), rgba(255, 255, 255, .06) var(--hb-vc9-a) 360deg);
  animation: hb-vc9-sweep 1s linear both;
}
@keyframes hb-vc9-sweep {
  from { --hb-vc9-a: 0deg; }
  to { --hb-vc9-a: 360deg; }
}
.hb-vc9-ring {
  position: absolute;
  border: 2px solid rgba(240, 240, 232, .85);
  border-radius: 50%;
}
.hb-vc9-ring[data-r="1"] { inset: 0; }
.hb-vc9-ring[data-r="2"] { inset: 7%; border-width: 1.5px; }
.hb-vc9-num {
  position: relative;
  color: #0d0d0c;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: min(42cqi, 260px);
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 1px rgba(255, 255, 255, .4);
  animation: hb-vc9-num 1s steps(1, end) both;
}
@keyframes hb-vc9-num {
  0% { transform: translate3d(0, -1px, 0); }
  50% { transform: translate3d(1px, 0, 0); }
}
.hb-vc9-label {
  position: absolute;
  z-index: 1;
  color: rgba(13, 13, 12, .78);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: .2em;
  text-transform: uppercase;
}
.hb-vc9-label[data-pos="tl"] { top: 18px; left: 22px; }
.hb-vc9-label[data-pos="tr"] { top: 18px; right: 22px; }
.hb-vc9-label[data-pos="bl"] { bottom: 18px; left: 22px; }
.hb-vc9-label[data-pos="br"] { bottom: 18px; right: 22px; }
.hb-vc9-pop {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: #fff;
  pointer-events: none;
  animation: hb-vc9-pop .28s steps(1, end) both;
}
@keyframes hb-vc9-pop {
  0% { opacity: 1; }
  40% { opacity: .2; background: #000; }
  70% { opacity: 0; }
  100% { opacity: 0; }
}
.hb-vc9-skip {
  position: absolute;
  right: 18px;
  bottom: 48px;
  z-index: 4;
  height: 30px;
  padding: 0 12px;
  border: 1px solid rgba(13, 13, 12, .4);
  border-radius: 999px;
  background: rgba(240, 240, 232, .3);
  color: #0d0d0c;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
  cursor: pointer;
}
.hb-vc9-skip:focus-visible { outline: 2px solid #0d0d0c; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .hb-vc9-leader, .hb-vc9-pop, .hb-vc9-skip { display: none; }
  .hb-vc9 .hb-vc9-content > * { animation: none !important; }
}
`;

export function CinemaCountdownLeader({
  from = 5,
  to = 2,
  loop = true,
  hold = 4200,
  eyebrow = "Premiere night",
  title = "Lights down at eight",
  details = ["Thursday, March 12", "Rialto Hall, Screen 1", "Q&A with the director"],
  cta = { label: "Claim your seat", href: "#" },
  accent = "#e8ff5a",
  onComplete,
  headingAs = "h1",
  className,
  style,
  ...rest
}: CinemaCountdownLeaderProps) {
  const Heading = headingAs;
  const start = Math.max(from, to);
  const end = Math.min(from, to);
  const [n, setN] = React.useState(start);
  const [run, setRun] = React.useState(0);
  const [popped, setPopped] = React.useState(false);
  const [skipped, setSkipped] = React.useState(false);
  const done = n < end;
  const completeRef = React.useRef(onComplete);

  React.useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  React.useEffect(() => {
    if (skipped || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cur = start;
    let timer = 0;
    const tick = () => {
      cur -= 1;
      setN(cur);
      if (cur >= end) {
        timer = window.setTimeout(tick, 1000);
        return;
      }
      setPopped(true);
      completeRef.current?.();
      if (loop) {
        timer = window.setTimeout(() => {
          cur = start;
          setPopped(false);
          setN(start);
          timer = window.setTimeout(tick, 1000);
        }, hold);
      }
    };
    timer = window.setTimeout(tick, 1000);
    return () => window.clearTimeout(timer);
  }, [start, end, loop, hold, run, skipped]);

  const replay = () => {
    setSkipped(false);
    setPopped(false);
    setN(start);
    setRun((r) => r + 1);
  };

  const skip = () => {
    setSkipped(true);
    setN(end - 1);
    setPopped(false);
  };

  const vars = { "--hb-vc9-accent": accent, ...style } as React.CSSProperties;

  return (
    <section
      className={["hb-vc9", className].filter(Boolean).join(" ")}
      style={vars}
      data-phase={done ? "done" : "count"}
      {...rest}
    >
      <style href="hb-cinema-countdown-leader" precedence="default">{css}</style>
      <div className="hb-vc9-content" key={`c${run}-${done ? 1 : 0}`}>
        <span className="hb-vc9-glow" aria-hidden="true" />
        {eyebrow ? <p className="hb-vc9-eyebrow">{eyebrow}</p> : null}
        <Heading className="hb-vc9-title">{title}</Heading>
        {details.length ? (
          <ul className="hb-vc9-details">
            {details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        ) : null}
        <div className="hb-vc9-actions">
          {cta ? <a className="hb-vc9-btn" data-primary="" href={cta.href}>{cta.label}</a> : null}
          <button type="button" className="hb-vc9-btn" onClick={replay}>Replay leader</button>
        </div>
      </div>
      <div className="hb-vc9-leader" aria-hidden={done ? true : undefined} role="timer" aria-label={done ? undefined : `Starting in ${n}`}>
        <span className="hb-vc9-cross" />
        <div className="hb-vc9-dial">
          <span className="hb-vc9-sweep" key={`s${run}-${n}`} />
          <span className="hb-vc9-ring" data-r="1" />
          <span className="hb-vc9-ring" data-r="2" />
          <span className="hb-vc9-num" key={`n${run}-${n}`}>{Math.max(n, end)}</span>
        </div>
        <span className="hb-vc9-label" data-pos="tl">Picture start</span>
        <span className="hb-vc9-label" data-pos="tr">Reel 1</span>
        <span className="hb-vc9-label" data-pos="bl">35 mm · 24 fps</span>
        <span className="hb-vc9-label" data-pos="br">Head leader</span>
        {!done ? (
          <button type="button" className="hb-vc9-skip" onClick={skip}>Skip</button>
        ) : null}
      </div>
      {popped && done ? <span className="hb-vc9-pop" aria-hidden="true" key={`p${run}`} /> : null}
    </section>
  );
}
