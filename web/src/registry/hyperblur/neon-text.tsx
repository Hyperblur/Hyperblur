"use client";

import * as React from "react";

export interface NeonTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  color?: string;
  flicker?: boolean;
  intensity?: 1 | 2 | 3;
}

const css = `
@keyframes hb-neon-flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% { color: var(--hb-on-color); text-shadow: var(--hb-on); }
  19%, 21%, 24%, 54%, 56% { color: var(--hb-off-color); text-shadow: var(--hb-off); }
  76%, 78% { color: var(--hb-on-color); text-shadow: var(--hb-on); }
  77% { color: var(--hb-off-color); text-shadow: var(--hb-off); }
}
.hb-neon {
  --hb-on-color: color-mix(in srgb, var(--hb-neon) 22%, #fff);
  --hb-off-color: color-mix(in srgb, var(--hb-neon) 45%, #000);
  --hb-on:
    0 0 calc(var(--hb-i) * 1px) #fff,
    0 0 calc(var(--hb-i) * 4px) var(--hb-neon),
    0 0 calc(var(--hb-i) * 9px) var(--hb-neon),
    0 0 calc(var(--hb-i) * 16px) var(--hb-neon),
    0 0 calc(var(--hb-i) * 28px) var(--hb-neon);
  --hb-off: 0 0 calc(var(--hb-i) * 2px) var(--hb-neon);
  display: inline-block;
  color: var(--hb-on-color);
  text-shadow: var(--hb-on);
}
.hb-neon[data-flicker="true"] { animation: hb-neon-flicker 5.5s linear infinite; }
@media (prefers-reduced-motion: reduce) { .hb-neon { animation: none !important; } }
`;

export function NeonText({
  text,
  color = "#2f7bff",
  flicker = true,
  intensity = 2,
  className = "",
  style,
  ...rest
}: NeonTextProps) {
  const vars = {
    "--hb-neon": color,
    "--hb-i": intensity,
    ...style,
  } as React.CSSProperties;

  return (
    <span className={`hb-neon ${className}`} style={vars} data-flicker={flicker} {...rest}>
      <style href="hb-neon-text" precedence="default">{css}</style>
      {text}
    </span>
  );
}
