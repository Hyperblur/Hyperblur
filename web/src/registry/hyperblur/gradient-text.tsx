"use client";

import * as React from "react";

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  colors?: string[];
  speed?: number;
  angle?: number;
  animate?: boolean;
}

const css = `
@keyframes hb-gradient-sweep {
  from { background-position: 0% 50%; }
  to { background-position: -200% 50%; }
}
.hb-gradient {
  display: inline-block;
  white-space: pre;
  color: transparent;
  background-image: var(--hb-g);
  background-size: 100% 100%;
  -webkit-background-clip: text;
  background-clip: text;
}
.hb-gradient[data-animate] {
  background-size: 200% 100%;
  animation: hb-gradient-sweep calc(4s / var(--hb-s)) linear infinite;
}
@media (prefers-reduced-motion: reduce) { .hb-gradient[data-animate] { animation: none; } }
`;

const DEFAULT_COLORS = ["#2f7bff", "#7fb3ff", "#ffffff", "#2f7bff"];

export function GradientText({
  text,
  colors = DEFAULT_COLORS,
  speed = 1,
  angle = 90,
  animate = true,
  className = "",
  style,
  ...rest
}: GradientTextProps) {
  const stops = colors.length === 1 ? [colors[0], colors[0]] : colors;
  const vars = {
    "--hb-g": `linear-gradient(${angle}deg, ${stops.join(", ")})`,
    "--hb-s": speed > 0 ? speed : 1,
    ...style,
  } as React.CSSProperties;

  return (
    <span
      className={`hb-gradient ${className}`}
      style={vars}
      data-animate={animate ? "" : undefined}
      {...rest}
    >
      <style href="hb-gradient-text" precedence="default">{css}</style>
      {text}
    </span>
  );
}
