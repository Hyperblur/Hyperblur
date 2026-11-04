"use client";

import * as React from "react";

export interface MicroPulseHeartProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "children"> {
  pressed?: boolean;
  defaultPressed?: boolean;
  beating?: boolean;
  idle?: boolean;
  size?: number;
  accent?: string;
  label?: string;
  onChange?: (pressed: boolean) => void;
}

const heart =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

const css = `
.hb-ql8 {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: var(--hb-ql8-s);
  height: var(--hb-ql8-s);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #8f8f8f;
  background: radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.015));
  border: 1px solid #2a2a2a;
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  --hb-ql8-c: #ff4d6d;
  --hb-ql8-s: 56px;
}
.hb-ql8 *, .hb-ql8 *::before, .hb-ql8 *::after { box-sizing: border-box; }
.hb-ql8:hover { border-color: #3a3a3a; color: #bdbdbd; }
.hb-ql8:active { transform: scale(0.9); }
.hb-ql8:focus-visible { outline: 2px solid var(--hb-ql8-c); outline-offset: 4px; }
.hb-ql8:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-ql8[aria-pressed="true"] {
  color: var(--hb-ql8-c);
  border-color: color-mix(in srgb, var(--hb-ql8-c) 55%, transparent);
  background: radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--hb-ql8-c) 22%, transparent), color-mix(in srgb, var(--hb-ql8-c) 4%, transparent));
}
.hb-ql8-h {
  display: grid;
  place-items: center;
  width: 50%;
  height: 50%;
  transform-origin: 50% 55%;
  will-change: transform;
}
.hb-ql8-v {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.hb-ql8-o {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linejoin: round;
}
.hb-ql8-f {
  fill: var(--hb-ql8-c);
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transform: scale(0);
  transition: transform 0.45s cubic-bezier(0.34, 1.7, 0.64, 1);
  filter: drop-shadow(0 0 6px color-mix(in srgb, var(--hb-ql8-c) 70%, transparent));
}
.hb-ql8[aria-pressed="true"] .hb-ql8-f { transform: scale(1); }
.hb-ql8[data-beat="auto"][data-idle="true"] .hb-ql8-h { animation: hb-ql8-idle 3.4s ease-in-out infinite; }
.hb-ql8[data-beat="auto"]:hover .hb-ql8-h,
.hb-ql8[data-beat="auto"]:focus-visible .hb-ql8-h,
.hb-ql8[data-beat="on"] .hb-ql8-h { animation: hb-ql8-beat 1.05s ease-in-out infinite; }
.hb-ql8-b {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  pointer-events: none;
}
.hb-ql8-r {
  position: absolute;
  left: calc(var(--hb-ql8-s) / -2);
  top: calc(var(--hb-ql8-s) / -2);
  width: var(--hb-ql8-s);
  height: var(--hb-ql8-s);
  border: 2px solid var(--hb-ql8-c);
  border-radius: 50%;
  opacity: 0;
  animation: hb-ql8-ring 0.65s cubic-bezier(0.2, 0.7, 0.3, 1) both;
}
.hb-ql8-q {
  position: absolute;
  left: -3px;
  top: -3px;
  width: 6px;
  height: 6px;
  background: var(--hb-ql8-c);
  border-radius: 50%;
  opacity: 0;
  transform: rotate(var(--hb-ql8-a)) translateY(-10px);
  animation: hb-ql8-fly 0.7s cubic-bezier(0.2, 0.7, 0.3, 1) both;
}
.hb-ql8-q[data-alt="true"] {
  width: 4px;
  height: 4px;
  left: -2px;
  top: -2px;
  background: color-mix(in srgb, var(--hb-ql8-c) 55%, #fff);
  animation-delay: 0.05s;
}
@keyframes hb-ql8-idle {
  0% { transform: scale(1); }
  5% { transform: scale(1.14); }
  10% { transform: scale(1); }
  15% { transform: scale(1.09); }
  22% { transform: scale(1); }
  100% { transform: scale(1); }
}
@keyframes hb-ql8-beat {
  0% { transform: scale(1); }
  14% { transform: scale(1.2); }
  28% { transform: scale(1); }
  42% { transform: scale(1.13); }
  70% { transform: scale(1); }
  100% { transform: scale(1); }
}
@keyframes hb-ql8-ring {
  0% { opacity: 0.9; transform: scale(0.55); }
  100% { opacity: 0; transform: scale(1.7); }
}
@keyframes hb-ql8-fly {
  0% { opacity: 1; transform: rotate(var(--hb-ql8-a)) translateY(-10px) scale(1); }
  100% { opacity: 0; transform: rotate(var(--hb-ql8-a)) translateY(calc(var(--hb-ql8-s) * -0.82)) scale(0.2); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ql8, .hb-ql8-f { transition: none; }
  .hb-ql8-h, .hb-ql8-r, .hb-ql8-q { animation: none !important; }
}
`;

export function MicroPulseHeart({
  pressed,
  defaultPressed = false,
  beating,
  idle = true,
  size = 56,
  accent = "#ff4d6d",
  label = "Favorite",
  disabled,
  onChange,
  className = "",
  style,
  onClick,
  ...rest
}: MicroPulseHeartProps) {
  const [inner, setInner] = React.useState(defaultPressed);
  const on = pressed ?? inner;
  const [burst, setBurst] = React.useState(0);
  const beat = beating === undefined ? "auto" : beating ? "on" : "off";
  const vars = {
    "--hb-ql8-c": accent,
    "--hb-ql8-s": `${size}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-micro-pulse-heart" precedence="default">{css}</style>
      <button
        {...rest}
        type="button"
        aria-pressed={on}
        aria-label={label}
        disabled={disabled}
        data-beat={beat}
        data-idle={idle}
        className={`hb-ql8 ${className}`}
        style={vars}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          const next = !on;
          if (pressed === undefined) setInner(next);
          if (next) setBurst((b) => b + 1);
          onChange?.(next);
        }}
      >
        <span className="hb-ql8-h">
          <svg className="hb-ql8-v" viewBox="0 0 24 24" aria-hidden="true">
            <path className="hb-ql8-f" d={heart} />
            <path className="hb-ql8-o" d={heart} />
          </svg>
        </span>
        {burst > 0 ? (
          <span key={burst} className="hb-ql8-b" aria-hidden="true">
            <span className="hb-ql8-r" />
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className="hb-ql8-q"
                data-alt={i % 2 === 1}
                style={{ "--hb-ql8-a": `${(i * 36).toFixed(0)}deg` } as React.CSSProperties}
              />
            ))}
          </span>
        ) : null}
      </button>
    </>
  );
}
