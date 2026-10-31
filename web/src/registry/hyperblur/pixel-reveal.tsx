"use client";

import * as React from "react";

export interface PixelRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  rows?: number;
  cols?: number;
  duration?: number;
  color?: string;
}

const css = `
@keyframes hb-pr-out { to { opacity: 0; } }
.hb-pr { position: relative; display: inline-block; }
.hb-pr > .hb-pr-grid { position: absolute; inset: 0; display: grid; pointer-events: none; }
.hb-pr > .hb-pr-grid > i { background: var(--hb-c); animation: hb-pr-out .05s steps(1) forwards; animation-delay: var(--d); }
@media (prefers-reduced-motion: reduce) { .hb-pr > .hb-pr-grid { display: none; } }
`;

function hash(i: number) {
  let x = (i + 1) * 2654435761;
  x = ((x >>> 16) ^ x) * 0x45d9f3b;
  x = ((x >>> 16) ^ x) >>> 0;
  return (x % 1000) / 1000;
}

export function PixelReveal({
  children,
  rows = 8,
  cols = 14,
  duration = 1.2,
  color = "#0b0e14",
  className = "",
  style,
  ...rest
}: PixelRevealProps) {
  const total = rows * cols;
  const order = Array.from({ length: total }, (_, i) => i).sort((a, b) => hash(a) - hash(b));
  const delays = new Array<number>(total);
  order.forEach((cell, rank) => {
    delays[cell] = (rank / total) * duration;
  });

  const vars = { "--hb-c": color, ...style } as React.CSSProperties;

  return (
    <div className={`hb-pr ${className}`} style={vars} {...rest}>
      <style href="hb-pixel-reveal" precedence="default">{css}</style>
      {children}
      <div
        className="hb-pr-grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
        aria-hidden="true"
      >
        {delays.map((d, i) => (
          <i key={i} style={{ "--d": `${d.toFixed(3)}s` } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}
