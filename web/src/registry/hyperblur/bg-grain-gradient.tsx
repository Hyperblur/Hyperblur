"use client";

import * as React from "react";

export interface BgGrainGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  background?: string;
  grain?: number;
  animateGrain?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd6 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; background: var(--hb-vd6-bg); isolation: isolate; }
.hb-vd6 *, .hb-vd6 *::before, .hb-vd6 *::after { box-sizing: border-box; }
.hb-vd6-field { position: absolute; inset: -12%; filter: blur(34px) saturate(1.15); }
.hb-vd6-blob { position: absolute; width: var(--s); aspect-ratio: 1; left: var(--x); top: var(--y); border-radius: 50%; background: radial-gradient(circle at 50% 50%, var(--c) 0%, color-mix(in srgb, var(--c) 55%, transparent) 38%, transparent 68%); mix-blend-mode: screen; animation: hb-vd6-drift calc(var(--d) * var(--hb-vd6-k)) cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; animation-delay: var(--dl); }
.hb-vd6-floor { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0) 40%, color-mix(in srgb, var(--hb-vd6-bg) 70%, transparent) 100%), radial-gradient(90% 60% at 50% 0%, rgba(255,255,255,0.08), transparent 70%); }
.hb-vd6-grain { position: absolute; inset: -60px; width: calc(100% + 120px); height: calc(100% + 120px); display: block; mix-blend-mode: overlay; }
.hb-vd6-grain.hb-vd6-live { animation: hb-vd6-jitter 0.9s steps(6) infinite; }
.hb-vd6-dust { position: absolute; inset: -60px; width: calc(100% + 120px); height: calc(100% + 120px); display: block; mix-blend-mode: soft-light; }
.hb-vd6-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
@keyframes hb-vd6-drift {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(var(--x1), var(--y1)) scale(1.18); }
  66% { transform: translate(var(--x2), var(--y2)) scale(0.88); }
  100% { transform: translate(0, 0) scale(1); }
}
@keyframes hb-vd6-jitter {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-23px, 11px); }
  40% { transform: translate(17px, -29px); }
  60% { transform: translate(-9px, 31px); }
  80% { transform: translate(29px, 7px); }
  100% { transform: translate(0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vd6-blob, .hb-vd6-grain.hb-vd6-live { animation: none; }
}
`;

const defaultColors = ["#ff6a3d", "#2f7bff", "#ffb38a", "#2a1f8f"];

function hash(i: number) {
  let x = Math.imul(i ^ 0x1f83d9ab, 0x5be0cd19);
  x ^= x >>> 14;
  x = Math.imul(x, 0x9b05688c);
  x ^= x >>> 15;
  return (x >>> 0) / 4294967296;
}

export function BgGrainGradient({
  colors = defaultColors,
  background = "#0b0a10",
  grain = 0.42,
  animateGrain = true,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgGrainGradientProps) {
  const rawId = React.useId();
  const id = `hb-vd6-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const palette = colors.length ? colors : defaultColors;
  const spots = [
    [-8, -18],
    [48, -10],
    [8, 38],
    [52, 44],
    [24, 12],
    [70, 18],
  ];
  const blobs = palette.slice(0, 6).map((c, i) => ({
    c,
    x: spots[i][0] + (hash(i * 8 + 1) - 0.5) * 10,
    y: spots[i][1] + (hash(i * 8 + 2) - 0.5) * 10,
    s: 62 + 26 * hash(i * 8 + 3),
    x1: (hash(i * 8 + 4) - 0.5) * 36,
    y1: (hash(i * 8 + 5) - 0.5) * 30,
    x2: (hash(i * 8 + 6) - 0.5) * 36,
    y2: (hash(i * 8 + 7) - 0.5) * 30,
    d: 18 + 10 * hash(i * 8 + 8),
    dl: -hash(i * 8 + 9) * 24,
  }));
  const g = Math.max(0, Math.min(1, grain));

  return (
    <div
      className={`hb-vd6 ${className}`}
      style={{ "--hb-vd6-bg": background, "--hb-vd6-k": (1 / Math.max(0.05, speed)).toFixed(3), ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-bg-grain-gradient" precedence="default">{css}</style>
      <div className="hb-vd6-field" aria-hidden="true">
        {blobs.map((b, i) => (
          <span
            key={i}
            className="hb-vd6-blob"
            style={
              {
                "--c": b.c,
                "--x": `${b.x.toFixed(2)}%`,
                "--y": `${b.y.toFixed(2)}%`,
                "--s": `${b.s.toFixed(2)}%`,
                "--x1": `${b.x1.toFixed(2)}%`,
                "--y1": `${b.y1.toFixed(2)}%`,
                "--x2": `${b.x2.toFixed(2)}%`,
                "--y2": `${b.y2.toFixed(2)}%`,
                "--d": `${b.d.toFixed(2)}s`,
                "--dl": `${b.dl.toFixed(2)}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="hb-vd6-floor" aria-hidden="true" />
      {g > 0 ? (
        <>
          <svg className={`hb-vd6-grain${animateGrain ? " hb-vd6-live" : ""}`} style={{ opacity: g }} aria-hidden="true">
            <filter id={`${id}-n`} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncR type="linear" slope="1.9" intercept="-0.45" />
                <feFuncG type="linear" slope="1.9" intercept="-0.45" />
                <feFuncB type="linear" slope="1.9" intercept="-0.45" />
              </feComponentTransfer>
            </filter>
            <rect width="100%" height="100%" filter={`url(#${id}-n)`} />
          </svg>
          <svg className="hb-vd6-dust" style={{ opacity: g * 0.7 }} aria-hidden="true">
            <filter id={`${id}-d`} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="turbulence" baseFrequency="0.012 0.02" numOctaves="2" seed="7" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#${id}-d)`} />
          </svg>
        </>
      ) : null}
      {children ? <div className="hb-vd6-in">{children}</div> : null}
    </div>
  );
}
