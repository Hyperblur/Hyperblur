"use client";

import * as React from "react";

export interface HudOrbitBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  rings?: number;
  nodes?: number;
  tilt?: number;
  speed?: number;
  grid?: boolean;
  accent?: string;
  minHeight?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ua9 {
  --hb-ua9-accent: #ff4d4d;
  position: relative;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: radial-gradient(70% 60% at 50% 55%, #121212 0%, #0a0a0a 70%);
  color: #ededed;
  font-family: inherit;
}
.hb-ua9 *, .hb-ua9 *::before, .hb-ua9 *::after { box-sizing: border-box; }
.hb-ua9-grid {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image:
    linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
  background-size: 28px 28px;
  background-position: center center;
  -webkit-mask-image: radial-gradient(ellipse 70% 65% at 50% 50%, #000 20%, transparent 80%);
  mask-image: radial-gradient(ellipse 70% 65% at 50% 50%, #000 20%, transparent 80%);
  animation: hb-ua9-pan calc(40s / var(--hb-ua9-speed)) linear infinite;
}
.hb-ua9-scene {
  position: absolute;
  inset: 0;
  z-index: -1;
  perspective: 900px;
  perspective-origin: 50% 40%;
  pointer-events: none;
}
.hb-ua9-plane {
  position: absolute;
  left: 50%;
  top: 54%;
  width: max(110cqw, 320px);
  aspect-ratio: 1;
  transform: translate(-50%, -50%) rotateX(var(--hb-ua9-tilt));
  transform-style: preserve-3d;
}
.hb-ua9-spin {
  position: absolute;
  inset: 0;
  animation: hb-ua9-spin calc(140s / var(--hb-ua9-speed)) linear infinite;
}
.hb-ua9-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dotted rgba(255,255,255,.28);
}
.hb-ua9-ring[data-alt="true"] { border-style: dashed; border-color: rgba(255,255,255,.1); }
.hb-ua9-ring[data-hot="true"] { border-color: color-mix(in srgb, var(--hb-ua9-accent) 45%, transparent); }
.hb-ua9-track {
  position: absolute;
  border-radius: 50%;
  animation: hb-ua9-spin var(--hb-ua9-d) linear infinite;
  animation-delay: var(--hb-ua9-delay);
}
.hb-ua9-track[data-rev="true"] { animation-direction: reverse; }
.hb-ua9-node {
  position: absolute;
  left: 50%;
  top: 0;
  width: 5px;
  height: 5px;
  margin: -2.5px 0 0 -2.5px;
  border-radius: 50%;
  background: #ededed;
  box-shadow: 0 0 6px rgba(255,255,255,.7);
}
.hb-ua9-node[data-hot="true"] { width: 7px; height: 7px; margin: -3.5px 0 0 -3.5px; background: var(--hb-ua9-accent); box-shadow: 0 0 10px var(--hb-ua9-accent), 0 0 22px color-mix(in srgb, var(--hb-ua9-accent) 50%, transparent); }
.hb-ua9-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 14%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--hb-ua9-accent) 35%, transparent), transparent 70%);
  animation: hb-ua9-breathe calc(6s / var(--hb-ua9-speed)) ease-in-out infinite;
}
.hb-ua9-cross {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 22px;
  height: 22px;
  transform: translate(-50%, -50%);
  background:
    linear-gradient(var(--hb-ua9-accent), var(--hb-ua9-accent)) center / 1px 100% no-repeat,
    linear-gradient(var(--hb-ua9-accent), var(--hb-ua9-accent)) center / 100% 1px no-repeat;
  opacity: .8;
}
.hb-ua9-content { position: relative; z-index: 1; width: 100%; }
@keyframes hb-ua9-spin { to { transform: rotate(360deg); } }
@keyframes hb-ua9-pan { to { background-position: 28px 28px; } }
@keyframes hb-ua9-breathe { 50% { transform: translate(-50%, -50%) scale(1.35); opacity: .6; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ua9-grid, .hb-ua9-spin, .hb-ua9-track, .hb-ua9-core { animation: none; }
}
`;

function hash(n: number) {
  let x = (n + 7) * 2654435761;
  x = (x ^ (x >>> 16)) >>> 0;
  x = Math.imul(x, 2246822519) >>> 0;
  return (x ^ (x >>> 13)) >>> 0;
}

export function HudOrbitBackdrop({
  rings = 5,
  nodes = 6,
  tilt = 68,
  speed = 1,
  grid = true,
  accent = "#ff4d4d",
  minHeight = 280,
  children,
  className,
  style,
  ...rest
}: HudOrbitBackdropProps) {
  const count = Math.max(1, Math.min(12, Math.round(rings)));
  const step = 44 / count;
  const ringInset = (i: number) => `${(i * step).toFixed(2)}%`;

  return (
    <div
      className={["hb-ua9", className].filter(Boolean).join(" ")}
      style={{
        ["--hb-ua9-accent" as string]: accent,
        ["--hb-ua9-tilt" as string]: `${tilt.toFixed(1)}deg`,
        ["--hb-ua9-speed" as string]: Math.max(0.05, speed).toFixed(3),
        minHeight,
        ...style,
      }}
      {...rest}
    >
      <style href="hb-hud-orbit-backdrop" precedence="default">{css}</style>
      {grid ? <span className="hb-ua9-grid" aria-hidden="true" /> : null}
      <div className="hb-ua9-scene" aria-hidden="true">
        <div className="hb-ua9-plane">
          <div className="hb-ua9-spin">
            {Array.from({ length: count }, (_, i) => (
              <span
                key={`r${i}`}
                className="hb-ua9-ring"
                data-alt={i % 2 === 1 ? "true" : "false"}
                data-hot={i === count - 2 ? "true" : "false"}
                style={{ inset: ringInset(i) }}
              />
            ))}
            <span className="hb-ua9-core" />
            <span className="hb-ua9-cross" />
          </div>
          {Array.from({ length: Math.max(0, Math.round(nodes)) }, (_, i) => {
            const h = hash(i);
            const ring = h % count;
            const dur = (22 + (h % 31)) / Math.max(0.05, speed);
            return (
              <span
                key={`n${i}`}
                className="hb-ua9-track"
                data-rev={(h >>> 5) % 3 === 0 ? "true" : "false"}
                style={{
                  inset: ringInset(ring),
                  ["--hb-ua9-d" as string]: `${dur.toFixed(2)}s`,
                  ["--hb-ua9-delay" as string]: `-${(((h >>> 8) % 1000) / 1000 * dur).toFixed(2)}s`,
                }}
              >
                <span className="hb-ua9-node" data-hot={i % 3 === 0 ? "true" : "false"} />
              </span>
            );
          })}
        </div>
      </div>
      <div className="hb-ua9-content">{children}</div>
    </div>
  );
}

export default HudOrbitBackdrop;
