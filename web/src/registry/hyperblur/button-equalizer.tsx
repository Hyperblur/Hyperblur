"use client";

import * as React from "react";

export interface ButtonEqualizerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "onChange"> {
  playing?: boolean;
  defaultPlaying?: boolean;
  onPlayingChange?: (playing: boolean) => void;
  duration?: number;
  bars?: number;
  accent?: string;
  caption?: string;
}

const css = `
.hb-xa4 {
  --hb-xa4-c: #ff7a45;
  --hb-xa4-p: 0;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.8em;
  box-sizing: border-box;
  margin: 0;
  padding: 0.45em 1em 0.45em 0.45em;
  font: inherit;
  font-size: 14px;
  line-height: 1.15;
  color: #ededed;
  text-align: left;
  background: linear-gradient(180deg, #181818, #111);
  border: 0;
  border-radius: 999px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 0 0 1px #262626, 0 10px 28px -16px rgba(0, 0, 0, 0.9);
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 0.3s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-xa4 *, .hb-xa4 *::before, .hb-xa4 *::after { box-sizing: border-box; }
.hb-xa4:hover:not(:disabled) { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 0 1px #333, 0 10px 28px -16px rgba(0, 0, 0, 0.9); }
.hb-xa4[aria-pressed="true"] { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 0 1px color-mix(in srgb, var(--hb-xa4-c) 38%, #262626), 0 12px 30px -16px color-mix(in srgb, var(--hb-xa4-c) 55%, transparent); }
.hb-xa4:active:not(:disabled) { transform: scale(0.98); }
.hb-xa4:focus-visible { outline: 2px solid var(--hb-xa4-c); outline-offset: 3px; }
.hb-xa4:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xa4-prog {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  z-index: -1;
  background: var(--hb-xa4-c);
  transform-origin: left;
  transform: scaleX(var(--hb-xa4-p));
  transition: transform 0.25s linear;
  opacity: 0.9;
}
.hb-xa4-disc {
  position: relative;
  display: grid;
  place-items: center;
  width: 2.5em;
  height: 2.5em;
  flex: none;
  color: #120700;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--hb-xa4-c) 60%, #fff), var(--hb-xa4-c) 60%);
  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.2), 0 4px 12px -4px color-mix(in srgb, var(--hb-xa4-c) 70%, transparent);
}
.hb-xa4-disc::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1.5px solid var(--hb-xa4-c);
  opacity: 0;
  transform: scale(0.85);
}
.hb-xa4[aria-pressed="true"] .hb-xa4-disc::after { animation: hb-xa4-ping 1.6s cubic-bezier(0.2, 0.6, 0.3, 1) infinite; }
.hb-xa4-ico {
  position: absolute;
  width: 1em;
  height: 1em;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}
.hb-xa4-ico[data-k="pause"] { opacity: 0; transform: scale(0.4) rotate(-90deg); }
.hb-xa4[aria-pressed="true"] .hb-xa4-ico[data-k="play"] { opacity: 0; transform: scale(0.4) rotate(90deg); }
.hb-xa4[aria-pressed="true"] .hb-xa4-ico[data-k="pause"] { opacity: 1; transform: none; }
.hb-xa4-meta { display: flex; flex-direction: column; gap: 0.2em; min-width: 0; }
.hb-xa4-title { font-weight: 600; white-space: nowrap; }
.hb-xa4-time { font-family: var(--font-mono, ui-monospace, monospace); font-size: 0.78em; color: #8f8f8f; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-xa4-eq {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 1.9em;
  margin-left: 0.2em;
  flex: none;
}
.hb-xa4-bar {
  width: 3px;
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xa4-c) 55%, #fff), var(--hb-xa4-c));
  transform: scaleY(var(--hb-xa4-h));
  opacity: 0.4;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}
.hb-xa4-bar[data-done="true"] { opacity: 0.95; }
.hb-xa4[aria-pressed="true"] .hb-xa4-bar {
  opacity: 1;
  animation: hb-xa4-eq var(--hb-xa4-d) cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
  animation-delay: var(--hb-xa4-dl);
}
@keyframes hb-xa4-eq {
  0% { transform: scaleY(0.14); }
  40% { transform: scaleY(var(--hb-xa4-h)); }
  100% { transform: scaleY(calc(var(--hb-xa4-h) * 0.45 + 0.1)); }
}
@keyframes hb-xa4-ping {
  0% { opacity: 0.7; transform: scale(0.9); }
  100% { opacity: 0; transform: scale(1.35); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xa4, .hb-xa4-ico, .hb-xa4-bar, .hb-xa4-prog { transition: none; }
  .hb-xa4[aria-pressed="true"] .hb-xa4-bar, .hb-xa4[aria-pressed="true"] .hb-xa4-disc::after { animation: none; }
}
`;

function hash(n: number) {
  let h = Math.imul(n + 17, 2654435761);
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function clock(s: number) {
  const t = Math.max(0, Math.floor(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}

export function ButtonEqualizer({
  playing,
  defaultPlaying = false,
  onPlayingChange,
  duration = 30,
  bars = 14,
  accent = "#ff7a45",
  caption,
  children = "Play preview",
  type = "button",
  className = "",
  style,
  onClick,
  ...rest
}: ButtonEqualizerProps) {
  const [inner, setInner] = React.useState(defaultPlaying);
  const on = playing ?? inner;
  const [elapsed, setElapsed] = React.useState(0);
  const total = Math.max(1, duration);

  const setOn = React.useCallback(
    (next: boolean) => {
      if (playing === undefined) setInner(next);
      onPlayingChange?.(next);
    },
    [playing, onPlayingChange],
  );

  const live = React.useRef({ elapsed: 0, setOn });
  React.useEffect(() => {
    live.current.setOn = setOn;
  }, [setOn]);

  React.useEffect(() => {
    if (!on) return;
    const id = setInterval(() => {
      const next = live.current.elapsed + 0.25;
      if (next >= total) {
        live.current.elapsed = 0;
        setElapsed(0);
        live.current.setOn(false);
      } else {
        live.current.elapsed = next;
        setElapsed(next);
      }
    }, 250);
    return () => clearInterval(id);
  }, [on, total]);

  const n = Math.max(4, Math.min(32, Math.round(bars)));
  const frac = elapsed / total;
  const vars = { "--hb-xa4-c": accent, "--hb-xa4-p": frac.toFixed(4), ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-equalizer" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-xa4 ${className}`}
        style={vars}
        aria-pressed={on}
        onClick={(e) => {
          setOn(!on);
          onClick?.(e);
        }}
        {...rest}
      >
        <span className="hb-xa4-prog" aria-hidden="true" />
        <span className="hb-xa4-disc" aria-hidden="true">
          <svg className="hb-xa4-ico" data-k="play" viewBox="0 0 16 16">
            <path d="M5 3.3v9.4a.6.6 0 0 0 .9.5l7.4-4.7a.6.6 0 0 0 0-1L5.9 2.8a.6.6 0 0 0-.9.5Z" fill="currentColor" />
          </svg>
          <svg className="hb-xa4-ico" data-k="pause" viewBox="0 0 16 16">
            <rect x="3.5" y="3" width="3.2" height="10" rx="1" fill="currentColor" />
            <rect x="9.3" y="3" width="3.2" height="10" rx="1" fill="currentColor" />
          </svg>
        </span>
        <span className="hb-xa4-meta">
          <span className="hb-xa4-title">{on ? "Pause preview" : children}</span>
          <span className="hb-xa4-time">
            {caption ? `${caption} · ` : ""}
            {clock(elapsed)} / {clock(total)}
          </span>
        </span>
        <span className="hb-xa4-eq" aria-hidden="true">
          {Array.from({ length: n }, (_, i) => {
            const shape = 0.35 + 0.65 * Math.sin(((i + 0.5) / n) * Math.PI);
            const h = Math.min(1, 0.2 + shape * (0.45 + hash(i) * 0.55));
            const v = {
              "--hb-xa4-h": h.toFixed(3),
              "--hb-xa4-d": `${(0.38 + hash(i + 50) * 0.5).toFixed(3)}s`,
              "--hb-xa4-dl": `${(-hash(i + 99) * 0.8).toFixed(3)}s`,
            } as React.CSSProperties;
            return <span className="hb-xa4-bar" style={v} data-done={i / n < frac || undefined} key={i} />;
          })}
        </span>
      </button>
    </>
  );
}
