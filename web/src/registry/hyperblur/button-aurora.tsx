"use client";

import * as React from "react";

export interface ButtonAuroraProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  colors?: [string, string, string];
  intensity?: number;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-xa6 {
  --hb-xa6-a: #22d3ee;
  --hb-xa6-b: #a855f7;
  --hb-xa6-c: #f472b6;
  --hb-xa6-i: 0.7;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  color: #f4f4f5;
  background: transparent;
  border: 0;
  border-radius: 14px;
  cursor: pointer;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-xa6 *, .hb-xa6 *::before, .hb-xa6 *::after { box-sizing: border-box; }
.hb-xa6[data-size="sm"] { font-size: 13px; }
.hb-xa6[data-size="lg"] { font-size: 17px; }
.hb-xa6:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
.hb-xa6:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xa6-halo {
  position: absolute;
  inset: -6px -10px;
  z-index: -2;
  border-radius: 22px;
  filter: blur(16px) saturate(1.3);
  opacity: calc(var(--hb-xa6-i) * 0.75);
  transform: scale(0.94);
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  pointer-events: none;
  overflow: hidden;
}
.hb-xa6:hover:not(:disabled) .hb-xa6-halo,
.hb-xa6:focus-visible .hb-xa6-halo { opacity: var(--hb-xa6-i); transform: scale(1.04); }
.hb-xa6-blob {
  position: absolute;
  width: 70%;
  height: 160%;
  top: -30%;
  border-radius: 50%;
  mix-blend-mode: screen;
}
.hb-xa6-blob[data-k="a"] { left: -10%; background: var(--hb-xa6-a); animation: hb-xa6-da 7s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate; }
.hb-xa6-blob[data-k="b"] { left: 20%; background: var(--hb-xa6-b); animation: hb-xa6-db 9s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate; }
.hb-xa6-blob[data-k="c"] { left: 45%; background: var(--hb-xa6-c); animation: hb-xa6-dc 8s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate; }
.hb-xa6-rim {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(110deg, var(--hb-xa6-a), var(--hb-xa6-b), var(--hb-xa6-c), var(--hb-xa6-a));
  background-size: 300% 100%;
  animation: hb-xa6-rim 6s linear infinite;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  opacity: 0.85;
}
.hb-xa6-face {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.95em 1.6em;
  border-radius: inherit;
  white-space: nowrap;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0) 50%),
    rgba(12, 12, 16, 0.86);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -10px 18px -10px color-mix(in srgb, var(--hb-xa6-b) 50%, transparent);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-xa6:active:not(:disabled) .hb-xa6-face { transform: scale(0.97); }
.hb-xa6-spark { width: 1em; height: 1em; flex: none; }
.hb-xa6:hover:not(:disabled) .hb-xa6-spark { animation: hb-xa6-tw 1.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes hb-xa6-da { to { transform: translate(40%, 12%) scale(1.2); } }
@keyframes hb-xa6-db { to { transform: translate(-30%, -10%) scale(0.85); } }
@keyframes hb-xa6-dc { to { transform: translate(-45%, 8%) scale(1.15); } }
@keyframes hb-xa6-rim { to { background-position: 300% 0; } }
@keyframes hb-xa6-tw { 0% { transform: scale(1) rotate(0); } 50% { transform: scale(1.3) rotate(90deg); } 100% { transform: scale(1) rotate(180deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xa6-blob, .hb-xa6-rim, .hb-xa6:hover:not(:disabled) .hb-xa6-spark { animation: none; }
  .hb-xa6-halo, .hb-xa6-face { transition: none; }
}
`;

export function ButtonAurora({
  children = "Generate palette",
  colors = ["#22d3ee", "#a855f7", "#f472b6"],
  intensity = 0.7,
  size = "md",
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonAuroraProps) {
  const raw = React.useId();
  const gid = `hb-xa6-g${raw.replace(/[^a-zA-Z0-9]/g, "")}`;
  const vars = {
    "--hb-xa6-a": colors[0],
    "--hb-xa6-b": colors[1],
    "--hb-xa6-c": colors[2],
    "--hb-xa6-i": Math.max(0, Math.min(1, intensity)).toFixed(2),
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-aurora" precedence="default">{css}</style>
      <button type={type} className={`hb-xa6 ${className}`} style={vars} data-size={size} {...rest}>
        <span className="hb-xa6-halo" aria-hidden="true">
          <span className="hb-xa6-blob" data-k="a" />
          <span className="hb-xa6-blob" data-k="b" />
          <span className="hb-xa6-blob" data-k="c" />
        </span>
        <span className="hb-xa6-rim" aria-hidden="true" />
        <span className="hb-xa6-face">
          <svg className="hb-xa6-spark" viewBox="0 0 16 16" aria-hidden="true">
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={colors[0]} />
                <stop offset="0.5" stopColor={colors[1]} />
                <stop offset="1" stopColor={colors[2]} />
              </linearGradient>
            </defs>
            <path d="M8 0.8l1.6 4.6 4.6 1.6-4.6 1.6L8 13.2 6.4 8.6 1.8 7l4.6-1.6z" fill={`url(#${gid})`} />
            <path d="M13 10.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" fill={`url(#${gid})`} />
          </svg>
          {children}
        </span>
      </button>
    </>
  );
}
