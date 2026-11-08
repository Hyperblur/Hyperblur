"use client";

import * as React from "react";

export interface CinemaSubtitleCue {
  start: number;
  end: number;
  text: string;
  speaker?: string;
}

export interface CinemaSubtitlesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  episode?: string;
  cues?: CinemaSubtitleCue[];
  duration?: number;
  autoPlay?: boolean;
  loop?: boolean;
  defaultCaptions?: boolean;
  accent?: string;
  onCueChange?: (cue: CinemaSubtitleCue | null) => void;
  headingAs?: "h1" | "h2";
}

const defaultCues: CinemaSubtitleCue[] = [
  { start: 0.6, end: 3.2, speaker: "Mara", text: "You missed the turn again." },
  { start: 3.6, end: 6.4, speaker: "Elias", text: "I didn't miss it. I'm avoiding it." },
  { start: 7.0, end: 9.6, speaker: "Mara", text: "Avoiding what? It's a gas station." },
  { start: 10.2, end: 12.8, speaker: "Elias", text: "The radio. Listen. Right... there." },
  { start: 13.2, end: 15.0, text: "[ static rises, then a voice under it ]" },
  { start: 15.4, end: 18.8, speaker: "Mara", text: "That's not static. Someone is counting." },
];

const css = `
.hb-vc10 {
  --hb-vc10-accent: #ffd34d;
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 580px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #020305;
  color: #fff;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc10 *, .hb-vc10 *::before, .hb-vc10 *::after { box-sizing: border-box; }
.hb-vc10-scene { position: absolute; inset: 0; }
.hb-vc10-scene svg { display: block; width: 100%; height: 100%; }
.hb-vc10-sweep {
  position: absolute;
  inset: -20% -60%;
  background: linear-gradient(105deg, transparent 40%, rgba(255, 196, 120, .16) 48%, rgba(255, 220, 170, .26) 50%, rgba(255, 196, 120, .14) 52%, transparent 60%);
  mix-blend-mode: screen;
  animation: hb-vc10-sweep 2.6s cubic-bezier(.5, 0, .5, 1) infinite;
}
.hb-vc10[data-playing="false"] .hb-vc10-sweep,
.hb-vc10[data-playing="false"] .hb-vc10-lamp,
.hb-vc10[data-playing="false"] .hb-vc10-dash { animation-play-state: paused; }
@keyframes hb-vc10-sweep {
  from { transform: translate3d(-40%, 0, 0); }
  to { transform: translate3d(40%, 0, 0); }
}
.hb-vc10-lamp { animation: hb-vc10-lamp 2.6s cubic-bezier(.6, 0, .9, .4) infinite; transform-box: view-box; }
@keyframes hb-vc10-lamp {
  from { transform: translate(0, 0) scale(.2); opacity: 0; }
  20% { opacity: 1; }
  to { transform: translate(-560px, -120px) scale(2.4); opacity: 0; }
}
.hb-vc10-dash { animation: hb-vc10-dash .7s linear infinite; }
@keyframes hb-vc10-dash {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -60; }
}
.hb-vc10-top {
  position: absolute;
  top: 18px;
  left: clamp(16px, 3cqi, 30px);
  right: clamp(16px, 3cqi, 30px);
  z-index: 3;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.hb-vc10-title {
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(18px, 2.6cqi, 26px);
  font-weight: 600;
  letter-spacing: -.01em;
}
.hb-vc10-ep {
  color: rgba(255, 255, 255, .55);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: .16em;
  text-transform: uppercase;
  white-space: nowrap;
}
.hb-vc10-subs {
  position: absolute;
  left: 50%;
  bottom: 96px;
  z-index: 3;
  display: grid;
  place-items: center;
  width: min(92%, 760px);
  min-height: 64px;
  transform: translateX(-50%);
  text-align: center;
}
.hb-vc10-line {
  display: inline;
  margin: 0;
  padding: .12em .5em;
  border-radius: 4px;
  background: rgba(0, 0, 0, .55);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  color: #fff;
  font-size: clamp(16px, 2.6cqi, 26px);
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: .005em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, .8);
  animation: hb-vc10-in .32s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-vc10-line[data-sfx] { color: rgba(255, 255, 255, .78); font-size: clamp(14px, 2.1cqi, 21px); letter-spacing: .04em; }
.hb-vc10-speaker {
  margin-right: .45em;
  color: var(--hb-vc10-accent);
  font-size: .62em;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  vertical-align: .18em;
}
@keyframes hb-vc10-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-vc10-bar {
  position: absolute;
  left: clamp(12px, 3cqi, 28px);
  right: clamp(12px, 3cqi, 28px);
  bottom: 18px;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 14px;
  height: 52px;
  padding: 0 14px 0 8px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(28, 28, 32, .78), rgba(14, 14, 16, .86));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 20px 40px -20px rgba(0, 0, 0, .8);
  backdrop-filter: blur(14px);
}
.hb-vc10-ib {
  display: grid;
  flex: none;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: background .2s ease, color .2s ease;
}
.hb-vc10-ib:hover { background: rgba(255, 255, 255, .08); }
.hb-vc10-ib:focus-visible, .hb-vc10-range:focus-visible { outline: 2px solid var(--hb-vc10-accent); outline-offset: 2px; }
.hb-vc10-ib[aria-pressed="false"] { color: rgba(255, 255, 255, .45); }
.hb-vc10-cc {
  padding: 2px 4px;
  border: 1.5px solid currentColor;
  border-radius: 4px;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: .04em;
  line-height: 1;
}
.hb-vc10-tc {
  flex: none;
  min-width: 92px;
  color: rgba(255, 255, 255, .72);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
}
.hb-vc10-track { position: relative; flex: 1; min-width: 0; height: 36px; }
.hb-vc10-rail {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 4px;
  border-radius: 4px;
  background: rgba(255, 255, 255, .12);
  transform: translateY(-50%);
  overflow: hidden;
}
.hb-vc10-fill { position: absolute; inset: 0 auto 0 0; background: #fff; border-radius: 4px; }
.hb-vc10-cue {
  position: absolute;
  top: 50%;
  height: 4px;
  border-radius: 2px;
  background: color-mix(in srgb, var(--hb-vc10-accent) 55%, transparent);
  transform: translateY(-50%);
  pointer-events: none;
}
.hb-vc10-cue[data-on="true"] { background: var(--hb-vc10-accent); box-shadow: 0 0 10px var(--hb-vc10-accent); }
.hb-vc10-range {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  background: transparent;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}
.hb-vc10-range::-webkit-slider-runnable-track { height: 36px; background: transparent; }
.hb-vc10-range::-moz-range-track { height: 36px; background: transparent; }
.hb-vc10-range::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  margin-top: 11px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, .16);
  -webkit-appearance: none;
  appearance: none;
}
.hb-vc10-range::-moz-range-thumb { width: 14px; height: 14px; border: 0; border-radius: 50%; background: #fff; box-shadow: 0 0 0 4px rgba(255, 255, 255, .16); }
@container (max-width: 520px) {
  .hb-vc10-tc { display: none; }
  .hb-vc10-subs { bottom: 86px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vc10-sweep, .hb-vc10-lamp, .hb-vc10-dash, .hb-vc10-line { animation: none; }
}
`;

function fmt(t: number) {
  const s = Math.floor(t);
  const f = Math.floor((t - s) * 24);
  return `00:${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
}

export function CinemaSubtitles({
  title = "Static, Episode 1",
  episode = "S1 · E1 · The Counting Station",
  cues = defaultCues,
  duration = 20,
  autoPlay = true,
  loop = true,
  defaultCaptions = true,
  accent = "#ffd34d",
  onCueChange,
  headingAs = "h2",
  className,
  style,
  ...rest
}: CinemaSubtitlesProps) {
  const Heading = headingAs;
  const [t, setT] = React.useState(0);
  const [playing, setPlaying] = React.useState(autoPlay);
  const [captions, setCaptions] = React.useState(defaultCaptions);
  const tRef = React.useRef(0);
  const cueRef = React.useRef(onCueChange);
  const uid = React.useId();

  React.useEffect(() => {
    cueRef.current = onCueChange;
  }, [onCueChange]);

  React.useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = 0;
    const step = (now: number) => {
      if (last) {
        let next = tRef.current + (now - last) / 1000;
        if (next >= duration) {
          if (loop) next = next % duration;
          else {
            next = duration;
            tRef.current = next;
            setT(next);
            setPlaying(false);
            return;
          }
        }
        tRef.current = next;
        setT(next);
      }
      last = now;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing, duration, loop]);

  const activeIndex = cues.findIndex((c) => t >= c.start && t < c.end);
  const active = activeIndex >= 0 ? cues[activeIndex] : null;

  React.useEffect(() => {
    cueRef.current?.(activeIndex >= 0 ? cues[activeIndex] : null);
  }, [activeIndex, cues]);

  const seek = (v: number) => {
    const next = Math.max(0, Math.min(duration, v));
    tRef.current = next;
    setT(next);
  };

  const toggle = () => {
    if (!playing && tRef.current >= duration) seek(0);
    setPlaying((p) => !p);
  };

  const vars = { "--hb-vc10-accent": accent, ...style } as React.CSSProperties;

  return (
    <section
      className={["hb-vc10", className].filter(Boolean).join(" ")}
      style={vars}
      data-playing={playing ? "true" : "false"}
      {...rest}
    >
      <style href="hb-cinema-subtitles" precedence="default">{css}</style>
      <div className="hb-vc10-scene" aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <rect width="1600" height="900" fill="#03050a" />
          <path d="M250 120 C600 60 1000 60 1350 120 L1480 560 L120 560Z" fill="#0a1220" />
          <path d="M250 120 C600 60 1000 60 1350 120 L1480 560 L120 560Z" fill="none" stroke="#101826" strokeWidth="18" />
          <path d="M120 560 L760 330 L840 330 L1480 560Z" fill="#05080e" />
          <path d="M800 334 L800 560" stroke="#c9a35a" strokeWidth="5" strokeDasharray="26 34" className="hb-vc10-dash" opacity=".7" />
          {[0, 1].map((i) => (
            <g key={i} className="hb-vc10-lamp" style={{ transformOrigin: "760px 320px", animationDelay: `${-i * 1.3}s` }}>
              <circle cx="760" cy="300" r="4" fill="#ffd9a0" />
              <circle cx="760" cy="300" r="14" fill="#ffc070" opacity=".25" />
            </g>
          ))}
          <circle cx="840" cy="340" r="3" fill="#ff4a3a" opacity=".85" />
          <circle cx="852" cy="340" r="3" fill="#ff4a3a" opacity=".85" />
          <path d="M0 520 L1600 520 L1600 900 L0 900Z" fill="#020305" />
          <path d="M0 560 C300 520 520 520 700 548 L700 900 L0 900Z" fill="#06080c" />
          <path d="M900 548 C1080 520 1300 520 1600 560 L1600 900 L900 900Z" fill="#06080c" />
          <ellipse cx="480" cy="560" rx="96" ry="112" fill="#010203" />
          <path d="M300 900 C310 720 380 660 480 660 C580 660 650 720 660 900Z" fill="#010203" />
          <ellipse cx="1110" cy="584" rx="88" ry="104" fill="#010203" />
          <path d="M940 900 C950 740 1020 690 1110 690 C1200 690 1270 740 1280 900Z" fill="#010203" />
          <rect x="740" y="600" width="120" height="44" rx="8" fill="#0b0f16" />
          <rect x="752" y="612" width="96" height="20" rx="3" fill="#0e3a2e" />
          <text x="800" y="627" fill="#4dffb0" fontSize="13" fontFamily="monospace" textAnchor="middle">88.4 FM</text>
          <path d="M300 104 L380 94 L380 136 L300 146Z" fill="#06090f" />
        </svg>
        <span className="hb-vc10-sweep" />
      </div>
      <div className="hb-vc10-top">
        <Heading className="hb-vc10-title">{title}</Heading>
        {episode ? <span className="hb-vc10-ep">{episode}</span> : null}
      </div>
      <div className="hb-vc10-subs" aria-live="polite">
        {captions && active ? (
          <p className="hb-vc10-line" key={activeIndex} data-sfx={active.speaker ? undefined : ""}>
            {active.speaker ? <span className="hb-vc10-speaker">{active.speaker}</span> : null}
            {active.text}
          </p>
        ) : null}
      </div>
      <div className="hb-vc10-bar">
        <button type="button" className="hb-vc10-ib" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 1.5h3v11h-3zM8.5 1.5h3v11h-3z" fill="currentColor" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.2 L12.5 7 L3 12.8Z" fill="currentColor" /></svg>
          )}
        </button>
        <span className="hb-vc10-tc" aria-hidden="true">{fmt(t)}</span>
        <div className="hb-vc10-track">
          <div className="hb-vc10-rail">
            <span className="hb-vc10-fill" style={{ width: `${((t / duration) * 100).toFixed(2)}%` }} />
          </div>
          {cues.map((c, i) => (
            <span
              key={i}
              className="hb-vc10-cue"
              data-on={i === activeIndex ? "true" : "false"}
              style={{ left: `${((c.start / duration) * 100).toFixed(2)}%`, width: `${(((c.end - c.start) / duration) * 100).toFixed(2)}%` }}
            />
          ))}
          <input
            className="hb-vc10-range"
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={t}
            aria-label="Seek"
            aria-valuetext={fmt(t)}
            aria-describedby={`${uid}-tc`}
            onChange={(e) => seek(Number(e.target.value))}
          />
          <span id={`${uid}-tc`} hidden>{active ? active.text : "No dialogue"}</span>
        </div>
        <button
          type="button"
          className="hb-vc10-ib"
          onClick={() => setCaptions((c) => !c)}
          aria-pressed={captions}
          aria-label="Subtitles"
        >
          <span className="hb-vc10-cc">CC</span>
        </button>
      </div>
    </section>
  );
}
