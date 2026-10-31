"use client";

import * as React from "react";

export interface WaveTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  amplitude?: number;
  speed?: number;
  stagger?: number;
}

const css = `
@keyframes hb-wave {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(calc(var(--hb-amp) * -1)); }
  75% { transform: translateY(var(--hb-amp)); }
}
.hb-wave { display: inline-block; white-space: nowrap; }
.hb-wave > span[aria-hidden] {
  display: inline-block;
  white-space: pre;
  animation: hb-wave calc(1.6s / var(--hb-s)) ease-in-out infinite;
  animation-delay: calc(var(--hb-n) * var(--hb-st));
}
@media (prefers-reduced-motion: reduce) { .hb-wave > span[aria-hidden] { animation: none !important; } }
`;

export function WaveText({
  text,
  amplitude = 8,
  speed = 1,
  stagger = 0.06,
  className = "",
  style,
  ...rest
}: WaveTextProps) {
  const vars = {
    "--hb-amp": `${amplitude}px`,
    "--hb-s": speed,
    "--hb-st": `${stagger}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <span className={`hb-wave ${className}`} style={vars} aria-label={text} {...rest}>
      <style href="hb-wave-text" precedence="default">{css}</style>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ "--hb-n": i } as React.CSSProperties}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
