"use client";

import * as React from "react";

export interface CinemaTrailerSlamProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  words?: string[];
  title?: string;
  release?: string;
  studio?: string;
  beat?: number;
  hold?: number;
  loop?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  accent?: string;
  headingAs?: "h1" | "h2";
  onComplete?: () => void;
}

const css = `
.hb-vc2 {
  --hb-vc2-accent: #4aa8ff;
  position: relative;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 560px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #030406;
  color: #f2f4f7;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc2 *, .hb-vc2 *::before, .hb-vc2 *::after { box-sizing: border-box; }
.hb-vc2-smoke {
  position: absolute;
  inset: -20%;
  z-index: 0;
  background:
    radial-gradient(40% 30% at 30% 60%, rgba(60, 90, 140, .22), transparent 70%),
    radial-gradient(35% 28% at 72% 40%, rgba(40, 60, 100, .2), transparent 70%),
    radial-gradient(60% 50% at 50% 50%, rgba(20, 30, 50, .5), transparent 80%);
  animation: hb-vc2-drift 18s ease-in-out infinite alternate;
}
@keyframes hb-vc2-drift {
  from { transform: translate3d(-3%, 1%, 0) scale(1); }
  to { transform: translate3d(3%, -2%, 0) scale(1.08); }
}
.hb-vc2-flare {
  position: absolute;
  left: -10%;
  right: -10%;
  top: 50%;
  z-index: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-vc2-accent) 70%, #fff) 50%, transparent);
  box-shadow: 0 0 18px 2px color-mix(in srgb, var(--hb-vc2-accent) 60%, transparent), 0 0 80px 10px color-mix(in srgb, var(--hb-vc2-accent) 18%, transparent);
  opacity: 0;
  transform: scaleX(.2);
}
.hb-vc2-stage[data-beat] .hb-vc2-flare { animation: hb-vc2-flare .9s cubic-bezier(.2, .7, .2, 1) both; }
@keyframes hb-vc2-flare {
  0% { opacity: 0; transform: scaleX(.2); }
  15% { opacity: 1; transform: scaleX(1); }
  100% { opacity: 0; transform: scaleX(1.3); }
}
.hb-vc2-stage {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
}
.hb-vc2-shake {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  animation: hb-vc2-shake .42s cubic-bezier(.36, .07, .19, .97) both;
}
@keyframes hb-vc2-shake {
  0% { transform: translate3d(0, 0, 0); }
  14% { transform: translate3d(-9px, 5px, 0) rotate(-.5deg); }
  28% { transform: translate3d(8px, -6px, 0) rotate(.4deg); }
  44% { transform: translate3d(-5px, 3px, 0); }
  60% { transform: translate3d(3px, -2px, 0); }
  80% { transform: translate3d(-1px, 1px, 0); }
  100% { transform: none; }
}
.hb-vc2-word {
  margin: 0;
  padding: 0 24px;
  color: #f2f4f7;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(40px, 10.5cqi, 140px);
  font-weight: 700;
  line-height: .9;
  letter-spacing: -.02em;
  text-align: center;
  text-transform: uppercase;
  background: linear-gradient(180deg, #ffffff 30%, #9aa6b8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 30px color-mix(in srgb, var(--hb-vc2-accent) 35%, transparent));
  animation: hb-vc2-slam var(--hb-vc2-beat, 1200ms) cubic-bezier(.2, .9, .1, 1) both;
}
@keyframes hb-vc2-slam {
  0% { opacity: 0; transform: scale(2.6); filter: blur(14px); }
  10% { opacity: 1; transform: scale(.94); filter: blur(0); }
  16% { transform: scale(1.02); }
  22% { transform: scale(1); }
  78% { opacity: 1; transform: scale(1.06); }
  100% { opacity: 0; transform: scale(1.09); filter: blur(4px); }
}
.hb-vc2-flash {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  background: radial-gradient(60% 60% at 50% 50%, #ffffff, color-mix(in srgb, var(--hb-vc2-accent) 50%, #ffffff) 60%, transparent);
  mix-blend-mode: screen;
  animation: hb-vc2-flash .5s ease-out both;
}
@keyframes hb-vc2-flash {
  0% { opacity: .95; }
  100% { opacity: 0; }
}
.hb-vc2-final {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  text-align: center;
}
.hb-vc2-final[data-show="false"] { visibility: hidden; }
.hb-vc2-final[data-show="true"] > * { animation: hb-vc2-in 1.2s cubic-bezier(.16, .8, .2, 1) both; }
.hb-vc2-final[data-show="true"] > *:nth-child(2) { animation-delay: .25s; }
.hb-vc2-final[data-show="true"] > *:nth-child(3) { animation-delay: .5s; }
.hb-vc2-final[data-show="true"] > *:nth-child(4) { animation-delay: .7s; }
@keyframes hb-vc2-in {
  from { opacity: 0; transform: scale(1.08); filter: blur(8px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}
.hb-vc2-studio {
  margin: 0 0 16px;
  color: rgba(242, 244, 247, .55);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .42em;
  text-transform: uppercase;
}
.hb-vc2-title {
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(44px, 12cqi, 160px);
  font-weight: 700;
  line-height: .85;
  letter-spacing: -.04em;
  text-transform: uppercase;
  background: linear-gradient(180deg, #ffffff 20%, #7f8aa0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hb-vc2-release {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 22px 0 0;
  color: rgba(242, 244, 247, .8);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px;
  letter-spacing: .24em;
  text-transform: uppercase;
}
.hb-vc2-release::before, .hb-vc2-release::after {
  content: "";
  width: 36px;
  height: 1px;
  background: var(--hb-vc2-accent);
}
.hb-vc2-actions { display: flex; gap: 10px; margin-top: 28px; }
.hb-vc2-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border: 1px solid rgba(242, 244, 247, .18);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  color: #f2f4f7;
  font: inherit;
  font-size: 13.5px;
  font-weight: 550;
  text-decoration: none;
  cursor: pointer;
  transition: background .25s ease, border-color .25s ease, transform .2s ease;
}
.hb-vc2-btn[data-primary] { border-color: transparent; background: #f2f4f7; color: #05070a; }
.hb-vc2-btn:hover { border-color: rgba(242, 244, 247, .4); background: rgba(255, 255, 255, .1); }
.hb-vc2-btn[data-primary]:hover { background: #fff; }
.hb-vc2-btn:active { transform: scale(.97); }
.hb-vc2-btn:focus-visible { outline: 2px solid var(--hb-vc2-accent); outline-offset: 3px; }
.hb-vc2-pips {
  position: absolute;
  bottom: 22px;
  left: 50%;
  z-index: 5;
  display: flex;
  gap: 6px;
  transform: translateX(-50%);
}
.hb-vc2-pip {
  width: 22px;
  height: 2px;
  border-radius: 2px;
  background: rgba(242, 244, 247, .16);
  transition: background .3s ease, width .4s cubic-bezier(.2, .8, .2, 1);
}
.hb-vc2-pip[data-on="true"] { width: 34px; background: var(--hb-vc2-accent); }
.hb-vc2-rating {
  position: absolute;
  left: clamp(16px, 3cqi, 32px);
  bottom: 18px;
  z-index: 5;
  padding: 5px 8px;
  border: 1px solid rgba(242, 244, 247, .24);
  color: rgba(242, 244, 247, .6);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 9.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
}
@media (prefers-reduced-motion: reduce) {
  .hb-vc2-smoke, .hb-vc2-shake, .hb-vc2-flare, .hb-vc2-final > * { animation: none !important; }
  .hb-vc2-stage, .hb-vc2-flash { display: none; }
  .hb-vc2-final[data-show="false"] { visibility: visible; }
}
`;

export function CinemaTrailerSlam({
  words = ["This winter", "One signal", "Changes", "Everything"],
  title = "Deep Relay",
  release = "Only in theaters 11.27",
  studio = "From the studio behind Coldwater",
  beat = 1150,
  hold = 3600,
  loop = true,
  ctaLabel = "Watch the trailer",
  ctaHref = "#",
  accent = "#4aa8ff",
  headingAs = "h1",
  onComplete,
  className,
  style,
  ...rest
}: CinemaTrailerSlamProps) {
  const Heading = headingAs;
  const [step, setStep] = React.useState(0);
  const [run, setRun] = React.useState(0);
  const total = words.length;
  const done = step >= total;
  const completeRef = React.useRef(onComplete);

  React.useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let timer = 0;
    const tick = () => {
      i += 1;
      setStep(i);
      if (i < total) {
        timer = window.setTimeout(tick, beat);
      } else {
        completeRef.current?.();
        if (loop) {
          timer = window.setTimeout(() => {
            i = 0;
            setStep(0);
            timer = window.setTimeout(tick, beat);
          }, hold);
        }
      }
    };
    timer = window.setTimeout(tick, beat);
    return () => window.clearTimeout(timer);
  }, [total, beat, hold, loop, run]);

  const replay = () => {
    setStep(0);
    setRun((r) => r + 1);
  };

  const vars = { "--hb-vc2-accent": accent, "--hb-vc2-beat": `${beat}ms`, ...style } as React.CSSProperties;

  return (
    <section className={["hb-vc2", className].filter(Boolean).join(" ")} style={vars} {...rest}>
      <style href="hb-cinema-trailer-slam" precedence="default">{css}</style>
      <div className="hb-vc2-smoke" aria-hidden="true" />
      <div className="hb-vc2-stage" aria-hidden="true" data-beat={done ? undefined : step}>
        <div className="hb-vc2-flare" key={`f${run}-${step}`} />
        {!done ? (
          <div className="hb-vc2-shake" key={`s${run}-${step}`}>
            <p className="hb-vc2-word">{words[step]}</p>
          </div>
        ) : null}
        <div className="hb-vc2-flash" key={`l${run}-${step}`} />
      </div>
      <div className="hb-vc2-final" data-show={done ? "true" : "false"}>
        {studio ? <p className="hb-vc2-studio">{studio}</p> : null}
        <Heading className="hb-vc2-title">{title}</Heading>
        {release ? <p className="hb-vc2-release">{release}</p> : null}
        <div className="hb-vc2-actions">
          <a className="hb-vc2-btn" data-primary="" href={ctaHref}>{ctaLabel}</a>
          <button type="button" className="hb-vc2-btn" onClick={replay}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7M3 2.5v2.8h2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Replay
          </button>
        </div>
      </div>
      <div className="hb-vc2-pips" aria-hidden="true">
        {words.map((w, i) => (
          <span key={w + i} className="hb-vc2-pip" data-on={i === step || (done && i === total - 1) ? "true" : "false"} />
        ))}
      </div>
      <span className="hb-vc2-rating" aria-hidden="true">Teaser · Approved for all audiences</span>
    </section>
  );
}
