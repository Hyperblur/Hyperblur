"use client";

import * as React from "react";

export interface GridFloorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Line color. */
  color?: string;
  /** Scroll speed multiplier. */
  speed?: number;
  /** Grid cell size in pixels. */
  cell?: number;
  /** Where the floor starts, from 0 (top) to 1 (bottom). */
  horizon?: number;
  /** Soft glow on the lines and the horizon. */
  glow?: boolean;
}

const css = `
@keyframes hb-gf-scroll {
  from { background-position: 0 0, 0 0, 0 0, 0 0; }
  to { background-position: 0 var(--hb-cell), 0 var(--hb-cell), 0 var(--hb-cell), 0 var(--hb-cell); }
}
.hb-gf { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-gf-floor { position: absolute; left: 0; right: 0; bottom: 0; top: var(--hb-hz); overflow: hidden; perspective: 380px; perspective-origin: 50% 0; -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 45%); mask-image: linear-gradient(to bottom, transparent 0, #000 45%); }
.hb-gf-plane { position: absolute; left: -150%; right: -150%; top: 0; height: 400%; transform-origin: 50% 0; transform: rotateX(72deg); background-size: var(--hb-cell) var(--hb-cell); background-image: linear-gradient(to right, var(--hb-c) 0, var(--hb-c) 2px, transparent 2px), linear-gradient(to bottom, var(--hb-c) 0, var(--hb-c) 2px, transparent 2px); animation: hb-gf-scroll var(--hb-dur) linear infinite; }
.hb-gf[data-glow="true"] .hb-gf-plane { background-image: linear-gradient(to right, var(--hb-c) 0, var(--hb-c) 2px, transparent 2px), linear-gradient(to bottom, var(--hb-c) 0, var(--hb-c) 2px, transparent 2px), linear-gradient(to right, var(--hb-glow) 0, transparent 9px), linear-gradient(to bottom, var(--hb-glow) 0, transparent 9px); background-size: var(--hb-cell) var(--hb-cell); }
.hb-gf-horizon { position: absolute; left: 0; right: 0; top: var(--hb-hz); height: 18%; transform: translateY(-50%); background: radial-gradient(ellipse 60% 50% at 50% 50%, var(--hb-glow), transparent 70%); opacity: 0; }
.hb-gf[data-glow="true"] .hb-gf-horizon { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .hb-gf-plane { animation: none; } }
`;

export function GridFloor({
  color = "#2f7bff",
  speed = 1,
  cell = 48,
  horizon = 0.45,
  glow = true,
  className = "",
  style,
  ...rest
}: GridFloorProps) {
  const hz = Math.min(1, Math.max(0, horizon));
  const dur = +(cell / (60 * Math.max(speed, 0.01))).toFixed(3);

  const vars = {
    "--hb-c": color,
    "--hb-glow": `color-mix(in srgb, ${color} 35%, transparent)`,
    "--hb-cell": `${cell}px`,
    "--hb-hz": `${+(hz * 100).toFixed(2)}%`,
    "--hb-dur": `${dur}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-gf ${className}`} style={vars} data-glow={glow} aria-hidden="true" {...rest}>
      <style href="hb-grid-floor" precedence="default">{css}</style>
      <div className="hb-gf-floor">
        <div className="hb-gf-plane" />
      </div>
      <div className="hb-gf-horizon" />
    </div>
  );
}
