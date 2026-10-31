"use client";

import * as React from "react";

export interface StrokeTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  strokeWidth?: number;
  color?: string;
  fill?: string;
  trigger?: "hover" | "always" | "none";
  duration?: number;
}

const css = `
.hb-stroke { position: relative; display: inline-block; }
.hb-stroke-base {
  display: block;
  color: transparent;
  -webkit-text-stroke: var(--hb-stroke-w) var(--hb-stroke-c);
  paint-order: stroke fill;
}
.hb-stroke-fill {
  position: absolute;
  inset: 0;
  display: block;
  color: var(--hb-stroke-f);
  -webkit-text-stroke: var(--hb-stroke-w) var(--hb-stroke-f);
  paint-order: stroke fill;
  clip-path: inset(-20% 100% -20% -10%);
  transition: clip-path var(--hb-stroke-d) cubic-bezier(0.65, 0, 0.35, 1);
  pointer-events: none;
  user-select: none;
}
.hb-stroke[data-trigger="hover"]:hover .hb-stroke-fill,
.hb-stroke[data-trigger="always"] .hb-stroke-fill {
  clip-path: inset(-20% -10% -20% -10%);
}
@media (prefers-reduced-motion: reduce) {
  .hb-stroke-fill { transition: none; }
}
`;

export function StrokeText({
  text,
  strokeWidth = 1.5,
  color = "#ffffff",
  fill,
  trigger = "hover",
  duration = 0.6,
  className = "",
  style,
  ...rest
}: StrokeTextProps) {
  const vars = {
    "--hb-stroke-w": `${strokeWidth}px`,
    "--hb-stroke-c": color,
    "--hb-stroke-f": fill ?? color,
    "--hb-stroke-d": `${Math.max(0, duration)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <span className={`hb-stroke ${className}`} style={vars} data-trigger={trigger} {...rest}>
      <style href="hb-stroke-text" precedence="default">{css}</style>
      <span className="hb-stroke-base">{text}</span>
      <span className="hb-stroke-fill" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
