"use client";

import * as React from "react";

export interface GlitchTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Text to render. */
  text: string;
  /** How far the slices jump. */
  intensity?: 1 | 2 | 3;
  /** Animation speed multiplier. */
  speed?: number;
  /** Colors of the two ghost layers. */
  colors?: [string, string];
}

const css = `
@keyframes hb-glitch-a {
  0%, 100% { clip-path: inset(0 0 92% 0); transform: translate(calc(var(--hb-g) * -1), 0); }
  20% { clip-path: inset(30% 0 55% 0); transform: translate(var(--hb-g), 0); }
  40% { clip-path: inset(70% 0 10% 0); transform: translate(calc(var(--hb-g) * -1.5), 0); }
  60% { clip-path: inset(10% 0 80% 0); transform: translate(var(--hb-g), 0); }
  80% { clip-path: inset(50% 0 30% 0); transform: translate(calc(var(--hb-g) * -0.5), 0); }
}
@keyframes hb-glitch-b {
  0%, 100% { clip-path: inset(80% 0 5% 0); transform: translate(var(--hb-g), 0); }
  25% { clip-path: inset(5% 0 85% 0); transform: translate(calc(var(--hb-g) * -1), 0); }
  50% { clip-path: inset(45% 0 40% 0); transform: translate(calc(var(--hb-g) * 1.5), 0); }
  75% { clip-path: inset(25% 0 60% 0); transform: translate(calc(var(--hb-g) * -0.5), 0); }
}
@keyframes hb-glitch-base {
  0%, 92%, 100% { transform: translate(0, 0); }
  94% { transform: translate(calc(var(--hb-g) * 0.5), -1px); }
  96% { transform: translate(calc(var(--hb-g) * -0.5), 1px); }
}
.hb-glitch { position: relative; display: inline-block; animation: hb-glitch-base calc(3s / var(--hb-s)) steps(1) infinite; }
.hb-glitch > span[aria-hidden] { position: absolute; inset: 0; pointer-events: none; mix-blend-mode: screen; }
.hb-glitch > span[aria-hidden]:nth-child(2) { color: var(--hb-c1); animation: hb-glitch-a calc(1.6s / var(--hb-s)) steps(2) infinite; }
.hb-glitch > span[aria-hidden]:nth-child(3) { color: var(--hb-c2); animation: hb-glitch-b calc(2.1s / var(--hb-s)) steps(2) infinite; }
@media (prefers-reduced-motion: reduce) { .hb-glitch, .hb-glitch > span { animation: none !important; } }
`;

export function GlitchText({
  text,
  intensity = 2,
  speed = 1,
  colors = ["#19c3f5", "#ff2fa0"],
  className = "",
  style,
  ...rest
}: GlitchTextProps) {
  const vars = {
    "--hb-g": `${intensity * 2}px`,
    "--hb-s": speed,
    "--hb-c1": colors[0],
    "--hb-c2": colors[1],
    ...style,
  } as React.CSSProperties;

  return (
    <span className={`hb-glitch ${className}`} style={vars} {...rest}>
      <style href="hb-glitch-text" precedence="default">{css}</style>
      <span>{text}</span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
