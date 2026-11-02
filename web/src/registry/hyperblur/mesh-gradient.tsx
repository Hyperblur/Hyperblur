"use client";

import * as React from "react";

export interface MeshGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  speed?: number;
  grain?: number;
  blur?: number;
  background?: string;
  blend?: React.CSSProperties["mixBlendMode"];
}

const noise =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const css = `
@keyframes hb-msh-x {
  from { transform: translate3d(calc(var(--hb-msh-ax) * -1), 0, 0); }
  to { transform: translate3d(var(--hb-msh-ax), 0, 0); }
}
@keyframes hb-msh-y {
  from { transform: translate3d(0, calc(var(--hb-msh-ay) * -1), 0) scale(var(--hb-msh-s0)) rotate(0deg); }
  to { transform: translate3d(0, var(--hb-msh-ay), 0) scale(var(--hb-msh-s1)) rotate(40deg); }
}
@keyframes hb-msh-jitter {
  0% { transform: translate3d(0, 0, 0); }
  20% { transform: translate3d(-3%, 2%, 0); }
  40% { transform: translate3d(2%, -3%, 0); }
  60% { transform: translate3d(-2%, -1%, 0); }
  80% { transform: translate3d(3%, 3%, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
.hb-msh {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  background: var(--hb-msh-bg);
  isolation: isolate;
}
.hb-msh-layer {
  position: absolute;
  inset: -20%;
  filter: blur(var(--hb-msh-b)) saturate(1.15);
}
.hb-msh-x {
  position: absolute;
  left: var(--hb-msh-l);
  top: var(--hb-msh-t);
  width: var(--hb-msh-w);
  height: var(--hb-msh-h);
  mix-blend-mode: var(--hb-msh-blend);
  animation: hb-msh-x var(--hb-msh-dx) ease-in-out infinite alternate;
  animation-delay: var(--hb-msh-lx);
  will-change: transform;
}
.hb-msh-y {
  width: 100%;
  height: 100%;
  border-radius: 46% 54% 58% 42% / 44% 50% 50% 56%;
  background: radial-gradient(closest-side, var(--hb-msh-c) 0%, var(--hb-msh-c) 35%, color-mix(in srgb, var(--hb-msh-c) 0%, transparent) 100%);
  animation: hb-msh-y var(--hb-msh-dy) ease-in-out infinite alternate;
  animation-delay: var(--hb-msh-ly);
  will-change: transform;
}
.hb-msh-grain {
  position: absolute;
  inset: -50%;
  background-image: ${noise};
  background-size: 180px 180px;
  opacity: var(--hb-msh-g);
  mix-blend-mode: overlay;
  animation: hb-msh-jitter 1.2s steps(5) infinite;
}
@media (prefers-reduced-motion: reduce) {
  .hb-msh-x, .hb-msh-y, .hb-msh-grain { animation: none; will-change: auto; }
}
`;

const spots = [
  { l: -14, t: -22, w: 70, h: 78, ax: 20, ay: 24, dx: 17, dy: 23, s0: 1, s1: 1.2 },
  { l: 42, t: -26, w: 66, h: 70, ax: 24, ay: 20, dx: 21, dy: 15, s0: 1.1, s1: 0.85 },
  { l: 30, t: 38, w: 74, h: 68, ax: 26, ay: 18, dx: 19, dy: 27, s0: 0.9, s1: 1.15 },
  { l: -20, t: 34, w: 64, h: 72, ax: 18, ay: 26, dx: 25, dy: 18, s0: 1.05, s1: 0.9 },
  { l: 18, t: 4, w: 56, h: 56, ax: 28, ay: 26, dx: 14, dy: 20, s0: 0.85, s1: 1.25 },
  { l: 58, t: 16, w: 58, h: 64, ax: 22, ay: 22, dx: 23, dy: 13, s0: 1, s1: 1.1 },
];

export function MeshGradient({
  colors = ["#ff4d8d", "#7c3aed", "#2f7bff", "#19c3f5", "#ffb547"],
  speed = 1,
  grain = 0.18,
  blur = 60,
  background = "#0b0a1a",
  blend = "lighten",
  className = "",
  style,
  ...rest
}: MeshGradientProps) {
  const palette = (colors.length > 0 ? colors : ["#2f7bff"]).slice(0, 6);
  const count = Math.min(6, Math.max(4, palette.length));
  const sp = Math.max(0.05, speed);
  const g = Math.min(1, Math.max(0, grain));

  const vars = {
    "--hb-msh-bg": background,
    "--hb-msh-b": `${Math.max(0, blur)}px`,
    "--hb-msh-g": g.toFixed(3),
    "--hb-msh-blend": blend,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-msh ${className}`} style={vars} aria-hidden="true" {...rest}>
      <style href="hb-mesh-gradient" precedence="default">{css}</style>
      <div className="hb-msh-layer">
        {spots.slice(0, count).map((s, i) => (
          <div
            key={i}
            className="hb-msh-x"
            style={
              {
                "--hb-msh-l": `${s.l}%`,
                "--hb-msh-t": `${s.t}%`,
                "--hb-msh-w": `${s.w}%`,
                "--hb-msh-h": `${s.h}%`,
                "--hb-msh-ax": `${s.ax}%`,
                "--hb-msh-dx": `${(s.dx / sp).toFixed(3)}s`,
                "--hb-msh-lx": `${(-(s.dx * (i + 1) * 0.37) / sp).toFixed(3)}s`,
              } as React.CSSProperties
            }
          >
            <div
              className="hb-msh-y"
              style={
                {
                  "--hb-msh-c": palette[i % palette.length],
                  "--hb-msh-ay": `${s.ay}%`,
                  "--hb-msh-dy": `${(s.dy / sp).toFixed(3)}s`,
                  "--hb-msh-ly": `${(-(s.dy * (i + 2) * 0.29) / sp).toFixed(3)}s`,
                  "--hb-msh-s0": s.s0,
                  "--hb-msh-s1": s.s1,
                } as React.CSSProperties
              }
            />
          </div>
        ))}
      </div>
      {g > 0 && <div className="hb-msh-grain" />}
    </div>
  );
}
