"use client";

import * as React from "react";

export interface AuroraProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  speed?: number;
  blur?: number;
  opacity?: number;
}

const css = `
@keyframes hb-au-a {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  33% { transform: translate3d(22%, 14%, 0) scale(1.18); }
  66% { transform: translate3d(-12%, 26%, 0) scale(0.92); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes hb-au-b {
  0% { transform: translate3d(0, 0, 0) scale(1.05); }
  40% { transform: translate3d(-24%, -16%, 0) scale(0.9); }
  75% { transform: translate3d(14%, -22%, 0) scale(1.2); }
  100% { transform: translate3d(0, 0, 0) scale(1.05); }
}
@keyframes hb-au-c {
  0% { transform: translate3d(0, 0, 0) scale(0.95); }
  30% { transform: translate3d(-18%, 20%, 0) scale(1.15); }
  70% { transform: translate3d(20%, -10%, 0) scale(1); }
  100% { transform: translate3d(0, 0, 0) scale(0.95); }
}
.hb-au { position: absolute; inset: 0; overflow: hidden; pointer-events: none; opacity: var(--hb-o); }
.hb-au-blob {
  position: absolute;
  left: var(--hb-x);
  top: var(--hb-y);
  width: var(--hb-s);
  height: var(--hb-s);
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, var(--hb-c) 0, transparent 68%);
  filter: blur(var(--hb-b));
  will-change: transform;
  animation: var(--hb-k) var(--hb-d) ease-in-out infinite;
  animation-delay: var(--hb-dl);
}
@media (prefers-reduced-motion: reduce) {
  .hb-au-blob { animation: none; will-change: auto; }
}
`;

const blobs = [
  { x: -12, y: -28, s: 70, k: "hb-au-a", d: 26, dl: 0 },
  { x: 44, y: -20, s: 62, k: "hb-au-b", d: 32, dl: -9 },
  { x: 8, y: 34, s: 66, k: "hb-au-c", d: 29, dl: -15 },
  { x: 52, y: 40, s: 58, k: "hb-au-a", d: 36, dl: -21 },
];

export function Aurora({
  colors = ["#2f7bff", "#7fb3ff", "#19c3f5"],
  speed = 1,
  blur = 80,
  opacity = 0.55,
  className = "",
  style,
  ...rest
}: AuroraProps) {
  const palette = colors.length > 0 ? colors : ["#2f7bff"];
  const sp = Math.max(speed, 0.01);

  const vars = {
    "--hb-o": Math.min(1, Math.max(0, opacity)),
    "--hb-b": `${Math.max(0, blur)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-au ${className}`} style={vars} aria-hidden="true" {...rest}>
      <style href="hb-aurora" precedence="default">{css}</style>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="hb-au-blob"
          style={
            {
              "--hb-x": `${b.x}%`,
              "--hb-y": `${b.y}%`,
              "--hb-s": `${b.s}%`,
              "--hb-c": palette[i % palette.length],
              "--hb-k": b.k,
              "--hb-d": `${(b.d / sp).toFixed(3)}s`,
              "--hb-dl": `${(b.dl / sp).toFixed(3)}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
