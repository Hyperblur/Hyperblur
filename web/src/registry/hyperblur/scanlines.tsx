"use client";

import * as React from "react";

export interface ScanlinesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Line darkness. */
  opacity?: number;
  /** Pixels per scanline. */
  lineHeight?: number;
  /** Subtle brightness flicker. */
  flicker?: boolean;
  /** Slow rolling bright band. */
  band?: boolean;
}

const css = `
@keyframes hb-sc-band { 0% { transform: translateY(-20%); } 100% { transform: translateY(520%); } }
@keyframes hb-sc-flicker { 0%, 100% { opacity: 1; } 50% { opacity: .92; } 92% { opacity: .97; } 95% { opacity: .85; } }
.hb-sc { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.hb-sc::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0) calc(var(--hb-lh) - 1px), rgba(0,0,0,var(--hb-o)) calc(var(--hb-lh) - 1px), rgba(0,0,0,var(--hb-o)) var(--hb-lh)); }
.hb-sc[data-band="true"]::after { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 18%; background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,.06), rgba(255,255,255,0)); animation: hb-sc-band 7s linear infinite; }
.hb-sc[data-flicker="true"] { animation: hb-sc-flicker 4s steps(1) infinite; }
@media (prefers-reduced-motion: reduce) { .hb-sc, .hb-sc::after { animation: none !important; } }
`;

export function Scanlines({
  opacity = 0.25,
  lineHeight = 3,
  flicker = true,
  band = true,
  className = "",
  style,
  ...rest
}: ScanlinesProps) {
  const vars = {
    "--hb-o": opacity,
    "--hb-lh": `${lineHeight}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={`hb-sc ${className}`}
      style={vars}
      data-band={band}
      data-flicker={flicker}
      aria-hidden="true"
      {...rest}
    >
      <style href="hb-scanlines" precedence="default">{css}</style>
    </div>
  );
}
