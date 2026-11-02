"use client";

import * as React from "react";

export interface ShinyTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  color?: string;
  shine?: string;
  pauseOnHover?: boolean;
  disabled?: boolean;
  direction?: "right" | "left";
}

const css = `
@keyframes hb-shn-sweep {
  0% { background-position: 100% 0; }
  70%, 100% { background-position: 0% 0; }
}
.hb-shn {
  display: inline-block;
  white-space: pre-wrap;
  color: var(--hb-shn-c);
  background-image: linear-gradient(110deg, var(--hb-shn-c) 0%, var(--hb-shn-c) 38%, var(--hb-shn-s) 50%, var(--hb-shn-c) 62%, var(--hb-shn-c) 100%);
  background-size: 250% 100%;
  background-repeat: no-repeat;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hb-shn-sweep var(--hb-shn-d) cubic-bezier(.45, .05, .35, 1) infinite;
}
.hb-shn[data-dir="left"] { animation-direction: reverse; }
.hb-shn[data-pause]:hover { animation-play-state: paused; }
.hb-shn[data-off] {
  animation: none;
  background-image: none;
  -webkit-text-fill-color: currentColor;
}
@media (prefers-reduced-motion: reduce) {
  .hb-shn { animation: none; background-position: 50% 0; }
}
`;

export function ShinyText({
  text,
  speed = 3,
  color = "#8f8f8f",
  shine = "#ffffff",
  pauseOnHover = false,
  disabled = false,
  direction = "right",
  className = "",
  style,
  ...rest
}: ShinyTextProps) {
  const vars = {
    "--hb-shn-c": color,
    "--hb-shn-s": shine,
    "--hb-shn-d": `${(Math.max(0.4, speed) / 0.7).toFixed(3)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <span
      className={`hb-shn ${className}`}
      style={vars}
      data-dir={direction}
      data-pause={pauseOnHover ? "" : undefined}
      data-off={disabled ? "" : undefined}
      {...rest}
    >
      <style href="hb-shiny-text" precedence="default">{css}</style>
      {text}
    </span>
  );
}
