"use client";

import * as React from "react";

export interface SpeedLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  count?: number;
  speed?: number;
  angle?: number;
  opacity?: number;
}

const css = `
@keyframes hb-sl-run {
  0% { transform: translateX(-140%) skewX(var(--hb-skew)); }
  100% { transform: translateX(260%) skewX(var(--hb-skew)); }
}
.hb-sl { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-sl > i { position: absolute; top: var(--t); left: 0; width: var(--w); height: var(--h); background: var(--hb-c); opacity: var(--hb-o); animation: hb-sl-run var(--dur) linear infinite; animation-delay: var(--delay); will-change: transform; }
@media (prefers-reduced-motion: reduce) { .hb-sl > i { animation: none; } }
`;

function rnd(i: number, salt: number) {
  let x = ((i + 1) * 2654435761 + salt * 40503) >>> 0;
  x = ((x >>> 16) ^ x) * 0x45d9f3b;
  x = ((x >>> 16) ^ x) >>> 0;
  return (x % 1000) / 1000;
}

export function SpeedLines({
  color = "#2f7bff",
  count = 14,
  speed = 1,
  angle = 20,
  opacity = 0.35,
  className = "",
  style,
  ...rest
}: SpeedLinesProps) {
  const bars = Array.from({ length: count }, (_, i) => {
    const top = +(((i + 0.5) / count) * 100).toFixed(2);
    const w = +(25 + rnd(i, 1) * 45).toFixed(2);
    const h = +(2 + rnd(i, 2) * 4).toFixed(2);
    const dur = +((1.6 + rnd(i, 3) * 2.2) / speed).toFixed(2);
    const delay = +(-rnd(i, 4) * dur).toFixed(2);
    return { top, w, h, dur, delay };
  });

  const vars = {
    "--hb-c": color,
    "--hb-o": opacity,
    "--hb-skew": `${-angle}deg`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-sl ${className}`} style={vars} aria-hidden="true" {...rest}>
      <style href="hb-speed-lines" precedence="default">{css}</style>
      {bars.map((b, i) => (
        <i
          key={i}
          style={
            {
              "--t": `${b.top}%`,
              "--w": `${b.w}%`,
              "--h": `${b.h}px`,
              "--dur": `${b.dur}s`,
              "--delay": `${b.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
