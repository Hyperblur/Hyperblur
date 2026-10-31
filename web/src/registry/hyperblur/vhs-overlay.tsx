"use client";

import * as React from "react";

export interface VhsOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 1 | 2 | 3;
  bands?: number;
  speed?: number;
}

const css = `
@keyframes hb-vhs-drift { from { transform: translateY(-100%); } to { transform: translateY(var(--end)); } }
@keyframes hb-vhs-jitter {
  0%, 100% { transform: translateY(0); }
  18% { transform: translateY(var(--hb-j)); }
  22% { transform: translateY(0); }
  61% { transform: translateY(calc(var(--hb-j) * -1)); }
  64% { transform: translateY(0); }
  87% { transform: translateY(calc(var(--hb-j) * .5)); }
}
.hb-vhs { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-vhs-in { position: absolute; inset: -4px 0; animation: hb-vhs-jitter var(--hb-jd) steps(1, end) infinite; }
.hb-vhs-c, .hb-vhs-m { position: absolute; inset: 0; mix-blend-mode: screen; }
.hb-vhs-c { transform: translateX(calc(var(--hb-x) * -1)); background: linear-gradient(to right, rgba(0,255,255,var(--hb-bl)) 0, rgba(0,255,255,0) 14%, rgba(0,255,255,0) 86%, rgba(0,255,255,var(--hb-bl)) 100%); }
.hb-vhs-m { transform: translateX(var(--hb-x)); background: linear-gradient(to right, rgba(255,0,170,var(--hb-bl)) 0, rgba(255,0,170,0) 14%, rgba(255,0,170,0) 86%, rgba(255,0,170,var(--hb-bl)) 100%); }
.hb-vhs-b { position: absolute; left: 0; right: 0; top: 0; height: var(--h); background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,var(--hb-ba)) 70%, rgba(255,255,255,0)); animation: hb-vhs-drift var(--dur) linear infinite; animation-delay: var(--delay); will-change: transform; }
.hb-vhs-b::after { content: ""; position: absolute; left: 0; right: 0; bottom: 18%; height: 2px; background: rgba(255,255,255,calc(var(--hb-ba) * 2)); }
@media (prefers-reduced-motion: reduce) {
  .hb-vhs-in, .hb-vhs-b { animation: none; }
  .hb-vhs-b { transform: translateY(var(--rest)); }
}
`;

const LEVELS = {
  1: { bleed: 0.14, shift: 1.5, jitter: 0.5, band: 0.06 },
  2: { bleed: 0.24, shift: 3, jitter: 1, band: 0.1 },
  3: { bleed: 0.38, shift: 5, jitter: 2, band: 0.16 },
} as const;

function rnd(i: number, salt: number) {
  let x = ((i + 1) * 2654435761 + salt * 40503) >>> 0;
  x = ((x >>> 16) ^ x) * 0x45d9f3b;
  x = ((x >>> 16) ^ x) >>> 0;
  return (x % 1000) / 1000;
}

export function VhsOverlay({
  intensity = 2,
  bands = 2,
  speed = 1,
  className = "",
  style,
  ...rest
}: VhsOverlayProps) {
  const lv = LEVELS[intensity] ?? LEVELS[2];
  const rate = Math.max(speed, 0.01);

  const list = Array.from({ length: Math.max(0, Math.floor(bands)) }, (_, i) => {
    const h = +(7 + rnd(i, 1) * 8).toFixed(2);
    const end = +((100 / h) * 100).toFixed(1);
    const dur = +((5 + rnd(i, 2) * 5) / rate).toFixed(2);
    const delay = +(-rnd(i, 3) * dur).toFixed(2);
    const rest = +(((i + 0.5) / Math.max(1, Math.floor(bands))) * end * 0.8).toFixed(1);
    return { h, end, dur, delay, rest };
  });

  const vars = {
    "--hb-bl": lv.bleed,
    "--hb-x": `${lv.shift}px`,
    "--hb-j": `${lv.jitter}px`,
    "--hb-ba": lv.band,
    "--hb-jd": `${+(1.1 / rate).toFixed(2)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-vhs ${className}`} style={vars} aria-hidden="true" {...rest}>
      <style href="hb-vhs-overlay" precedence="default">{css}</style>
      <div className="hb-vhs-in">
        <div className="hb-vhs-c" />
        <div className="hb-vhs-m" />
        {list.map((b, i) => (
          <div
            key={i}
            className="hb-vhs-b"
            style={
              {
                "--h": `${b.h}%`,
                "--end": `${b.end}%`,
                "--dur": `${b.dur}s`,
                "--delay": `${b.delay}s`,
                "--rest": `${b.rest}%`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
