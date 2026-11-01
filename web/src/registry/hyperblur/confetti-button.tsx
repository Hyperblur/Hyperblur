"use client";

import * as React from "react";

export interface ConfettiButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  children: React.ReactNode;
  colors?: string[];
  count?: number;
  successLabel?: string;
  rounded?: number;
  size?: "sm" | "md" | "lg";
}

interface Piece {
  x: number;
  up: number;
  fall: number;
  rot: number;
  w: number;
  h: number;
  dur: number;
  delay: number;
  color: string;
  round: boolean;
}

interface Burst {
  id: number;
  pieces: Piece[];
}

const css = `
.hb-cf {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0.8em 1.8em;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  color: #0a0c11;
  background: #fff;
  border: 0;
  border-radius: var(--hb-r);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25), 0 10px 28px -12px rgba(255, 255, 255, 0.4);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
}
.hb-cf[data-size="sm"] { font-size: 13px; padding: 0.65em 1.45em; }
.hb-cf[data-size="lg"] { font-size: 17px; padding: 0.9em 2.1em; }
.hb-cf:hover { transform: translateY(-1px); }
.hb-cf:active { transform: scale(0.95); }
.hb-cf:focus-visible { outline: 2px solid var(--hb-c); outline-offset: 3px; }
.hb-cf:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
.hb-cf-l {
  display: grid;
  place-items: center;
  overflow: clip;
  padding-block: 0.1em;
}
.hb-cf-a, .hb-cf-b {
  grid-area: 1 / 1;
  white-space: nowrap;
  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-cf-b { opacity: 0; transform: translateY(70%); }
.hb-cf[data-done="true"] .hb-cf-a { opacity: 0; transform: translateY(-70%); }
.hb-cf[data-done="true"] .hb-cf-b { opacity: 1; transform: none; }
.hb-cf-burst {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  z-index: 2;
  pointer-events: none;
}
.hb-cf-p {
  position: absolute;
  left: 0;
  top: 0;
  animation: hb-cf-x var(--hb-t) cubic-bezier(0.08, 0.6, 0.3, 1) var(--hb-dl) both;
}
.hb-cf-p > i {
  display: block;
  width: var(--hb-w);
  height: var(--hb-h);
  margin: calc(var(--hb-h) / -2) 0 0 calc(var(--hb-w) / -2);
  background: var(--hb-pc);
  border-radius: var(--hb-br);
  animation: hb-cf-y var(--hb-t) linear var(--hb-dl) both;
}
.hb-cf-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@keyframes hb-cf-x {
  to { transform: translateX(var(--hb-x)); }
}
@keyframes hb-cf-y {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; animation-timing-function: cubic-bezier(0.2, 0.7, 0.4, 1); }
  38% { transform: translateY(var(--hb-up)) rotate(calc(var(--hb-r) * 0.4)); animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6); }
  82% { opacity: 1; }
  100% { transform: translateY(var(--hb-fall)) rotate(var(--hb-r)); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-cf, .hb-cf-a, .hb-cf-b { transition-duration: 0.01s; }
  .hb-cf:hover, .hb-cf:active { transform: none; }
}
`;

const fallbackColors = ["#ff4d6d", "#ffb703", "#2f7bff", "#19c3f5", "#7cf29a"];

function seeded(seed: number) {
  let a = (seed * 2654435761) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makePieces(seed: number, count: number, colors: string[]): Piece[] {
  const rand = seeded(seed + 1);
  const palette = colors.length ? colors : fallbackColors;
  const pieces: Piece[] = [];
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (rand() - 0.5) * Math.PI * 1.15;
    const power = 70 + rand() * 90;
    const round = rand() < 0.4;
    const w = round ? 5 + rand() * 3 : 6 + rand() * 5;
    pieces.push({
      x: Math.cos(angle) * power,
      up: Math.sin(angle) * power * 0.9,
      fall: 70 + rand() * 90,
      rot: (rand() - 0.5) * 1080,
      w,
      h: round ? w : 3 + rand() * 3,
      dur: 0.9 + rand() * 0.5,
      delay: rand() * 0.06,
      color: palette[Math.floor(rand() * palette.length)],
      round,
    });
  }
  return pieces;
}

export function ConfettiButton({
  children,
  colors = ["#ff4d6d", "#ffb703", "#2f7bff", "#19c3f5", "#7cf29a"],
  count = 28,
  successLabel = "Done",
  rounded = 9999,
  size = "md",
  type = "button",
  className = "",
  style,
  onClick,
  ...rest
}: ConfettiButtonProps) {
  const counter = React.useRef(0);
  const timers = React.useRef<number[]>([]);
  const labelTimer = React.useRef(0);
  const [bursts, setBursts] = React.useState<Burst[]>([]);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const list = timers.current;
    return () => {
      list.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(labelTimer.current);
    };
  }, []);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const id = counter.current++;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!calm) {
      const pieces = makePieces(id, Math.max(0, Math.min(160, Math.round(count))), colors);
      setBursts((list) => [...list, { id, pieces }]);
      timers.current.push(
        window.setTimeout(() => {
          setBursts((list) => list.filter((b) => b.id !== id));
        }, 1700),
      );
    }
    setDone(true);
    window.clearTimeout(labelTimer.current);
    labelTimer.current = window.setTimeout(() => setDone(false), 1800);
  }

  const vars = {
    "--hb-c": colors[0] ?? "#2f7bff",
    "--hb-r": `${rounded}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-confetti-button" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-cf ${className}`}
        style={vars}
        data-size={size}
        data-done={done}
        onClick={handleClick}
        {...rest}
      >
        <span className="hb-cf-l">
          <span className="hb-cf-a">{children}</span>
          <span className="hb-cf-b" aria-hidden="true">{successLabel}</span>
        </span>
        {bursts.map((burst) => (
          <span key={burst.id} className="hb-cf-burst" aria-hidden="true">
            {burst.pieces.map((p, i) => (
              <span
                key={i}
                className="hb-cf-p"
                style={
                  {
                    "--hb-x": `${p.x.toFixed(1)}px`,
                    "--hb-t": `${p.dur.toFixed(2)}s`,
                    "--hb-dl": `${p.delay.toFixed(3)}s`,
                  } as React.CSSProperties
                }
              >
                <i
                  style={
                    {
                      "--hb-up": `${p.up.toFixed(1)}px`,
                      "--hb-fall": `${p.fall.toFixed(1)}px`,
                      "--hb-r": `${p.rot.toFixed(0)}deg`,
                      "--hb-w": `${p.w.toFixed(1)}px`,
                      "--hb-h": `${p.h.toFixed(1)}px`,
                      "--hb-pc": p.color,
                      "--hb-br": p.round ? "50%" : "1px",
                    } as React.CSSProperties
                  }
                />
              </span>
            ))}
          </span>
        ))}
      </button>
      <span className="hb-cf-sr" role="status" aria-live="polite">
        {done ? successLabel : ""}
      </span>
    </>
  );
}
