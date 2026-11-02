"use client";

import * as React from "react";

export interface MeteorsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  angle?: number;
  speed?: number;
  color?: string;
  stars?: number;
  seed?: number;
}

const css = `
@keyframes hb-met-fly {
  0% { transform: translate3d(0, 0, 0); opacity: 0; }
  3% { opacity: 1; }
  30% { opacity: 1; }
  38%, 100% { transform: translate3d(var(--hb-met-run), 0, 0); opacity: 0; }
}
@keyframes hb-met-twinkle {
  0%, 100% { opacity: var(--hb-met-lo); }
  50% { opacity: var(--hb-met-hi); }
}
.hb-met {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  container-type: size;
  --hb-met-run: 160cqmax;
}
.hb-met-star {
  position: absolute;
  border-radius: 50%;
  background: var(--hb-met-c);
  animation: hb-met-twinkle var(--hb-met-td) ease-in-out infinite;
  animation-delay: var(--hb-met-tl);
}
.hb-met-path {
  position: absolute;
  width: 0;
  height: 0;
  transform: rotate(var(--hb-met-a));
}
.hb-met-m {
  position: absolute;
  right: 0;
  top: calc(var(--hb-met-w) / -2);
  width: var(--hb-met-len);
  height: var(--hb-met-w);
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-met-c) 30%, transparent) 55%, var(--hb-met-c));
  opacity: 0;
  will-change: transform, opacity;
  animation: hb-met-fly var(--hb-met-d) linear infinite;
  animation-delay: var(--hb-met-dl);
}
.hb-met-m::after {
  content: "";
  position: absolute;
  right: -1px;
  top: 50%;
  width: calc(var(--hb-met-w) * 2.4);
  height: calc(var(--hb-met-w) * 2.4);
  border-radius: 50%;
  transform: translateY(-50%);
  background: var(--hb-met-c);
  box-shadow: 0 0 6px 1px var(--hb-met-c), 0 0 16px 3px color-mix(in srgb, var(--hb-met-c) 45%, transparent);
}
@media (prefers-reduced-motion: reduce) {
  .hb-met-star { animation: none; opacity: var(--hb-met-hi); }
  .hb-met-m { animation: none; will-change: auto; opacity: 0; }
  .hb-met-path:nth-child(3n + 1) .hb-met-m { opacity: 0.8; transform: translate3d(calc(var(--hb-met-run) * 0.28), 0, 0); }
}
`;

function rnd(i: number, salt: number, seed: number) {
  let x = (Math.imul(i + 1, 2654435761) + Math.imul(salt + 1, 40503) + Math.imul(seed | 0, 2246822519)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

export function Meteors({
  count = 20,
  angle = 145,
  speed = 1,
  color = "#ffffff",
  stars = 60,
  seed = 7,
  className = "",
  style,
  ...rest
}: MeteorsProps) {
  const total = Math.max(0, Math.round(count));
  const starTotal = Math.max(0, Math.round(stars));
  const sp = Math.max(0.05, speed);
  const rad = (angle * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);

  const meteors = Array.from({ length: total }, (_, i) => {
    const spread = (rnd(i, 1, seed) * 2 - 1) * 0.95;
    const back = 0.55 + rnd(i, 2, seed) * 0.35;
    const x = 0.5 - dx * back - dy * spread;
    const y = 0.5 - dy * back + dx * spread;
    const d = (3.2 + rnd(i, 3, seed) * 5.2) / sp;
    return {
      x: (x * 100).toFixed(2),
      y: (y * 100).toFixed(2),
      d: d.toFixed(3),
      dl: (-rnd(i, 4, seed) * d).toFixed(3),
      len: (50 + rnd(i, 5, seed) * 90).toFixed(1),
      w: (1 + rnd(i, 6, seed) * 0.8).toFixed(2),
    };
  });

  const field = Array.from({ length: starTotal }, (_, i) => {
    const hi = 0.35 + rnd(i, 11, seed) * 0.55;
    return {
      x: (rnd(i, 12, seed) * 100).toFixed(2),
      y: (rnd(i, 13, seed) * 100).toFixed(2),
      s: (0.6 + rnd(i, 14, seed) * 1.3).toFixed(2),
      hi: hi.toFixed(2),
      lo: (hi * 0.25).toFixed(2),
      td: (2.4 + rnd(i, 15, seed) * 4).toFixed(2),
      tl: (-rnd(i, 16, seed) * 6).toFixed(2),
    };
  });

  const vars = {
    "--hb-met-c": color,
    "--hb-met-a": `${angle.toFixed(2)}deg`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-met ${className}`} style={vars} aria-hidden="true" {...rest}>
      <style href="hb-meteors" precedence="default">{css}</style>
      {field.map((s, i) => (
        <span
          key={`s${i}`}
          className="hb-met-star"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.s}px`,
              height: `${s.s}px`,
              "--hb-met-hi": s.hi,
              "--hb-met-lo": s.lo,
              "--hb-met-td": `${s.td}s`,
              "--hb-met-tl": `${s.tl}s`,
            } as React.CSSProperties
          }
        />
      ))}
      {meteors.map((m, i) => (
        <span key={`m${i}`} className="hb-met-path" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
          <span
            className="hb-met-m"
            style={
              {
                "--hb-met-d": `${m.d}s`,
                "--hb-met-dl": `${m.dl}s`,
                "--hb-met-len": `${m.len}px`,
                "--hb-met-w": `${m.w}px`,
              } as React.CSSProperties
            }
          />
        </span>
      ))}
    </div>
  );
}
