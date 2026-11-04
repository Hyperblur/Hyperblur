"use client";

import * as React from "react";

export interface LoaderOrbitProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  label?: string;
}

const css = `
.hb-qc1 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7em;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-qc1 *, .hb-qc1 *::before, .hb-qc1 *::after { box-sizing: border-box; }
.hb-qc1-g {
  position: relative;
  flex: none;
  width: var(--hb-qc1-s);
  height: var(--hb-qc1-s);
}
.hb-qc1-r {
  position: absolute;
  inset: var(--hb-qc1-in);
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--hb-qc1-c) 22%, transparent);
  animation: hb-qc1-spin calc(var(--hb-qc1-t) * var(--hb-qc1-k)) linear infinite;
}
.hb-qc1-r > b {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--hb-qc1-d);
  height: var(--hb-qc1-d);
  margin: calc(var(--hb-qc1-d) / -2) 0 0 calc(var(--hb-qc1-d) / -2);
  border-radius: 50%;
  background: var(--hb-qc1-dc);
  box-shadow: 0 0 calc(var(--hb-qc1-d) * 1.6) var(--hb-qc1-dc);
}
.hb-qc1-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(var(--hb-qc1-s) * 0.12);
  height: calc(var(--hb-qc1-s) * 0.12);
  margin: calc(var(--hb-qc1-s) * -0.06) 0 0 calc(var(--hb-qc1-s) * -0.06);
  border-radius: 50%;
  background: var(--hb-qc1-c);
  opacity: 0.9;
  animation: hb-qc1-beat 1.6s ease-in-out infinite;
}
.hb-qc1-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-qc1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@keyframes hb-qc1-spin { to { transform: rotate(360deg); } }
@keyframes hb-qc1-beat {
  0%, 100% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.25); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qc1-r { animation-duration: 12s; }
  .hb-qc1-core { animation: none; }
}
`;

const orbits = [
  { inset: "0%", dot: 0.14, k: 1, color: 0 },
  { inset: "19%", dot: 0.12, k: 0.62, color: 1 },
  { inset: "36%", dot: 0.1, k: 0.4, color: 2 },
];

export function LoaderOrbit({
  size = 56,
  color = "#2f7bff",
  accent = "#7fb3ff",
  speed = 2.6,
  label,
  className = "",
  style,
  ...rest
}: LoaderOrbitProps) {
  const vars = {
    "--hb-qc1-s": `${size}px`,
    "--hb-qc1-c": color,
    "--hb-qc1-t": `${speed}s`,
    ...style,
  } as React.CSSProperties;
  const dotColors = [color, accent, "#ededed"];

  return (
    <>
      <style href="hb-loader-orbit" precedence="default">{css}</style>
      <span role="status" className={`hb-qc1 ${className}`} style={vars} {...rest}>
        <span className="hb-qc1-g" aria-hidden="true">
          {orbits.map((o, i) => (
            <span
              key={i}
              className="hb-qc1-r"
              style={
                {
                  "--hb-qc1-in": o.inset,
                  "--hb-qc1-k": o.k,
                  "--hb-qc1-d": `${(size * o.dot).toFixed(2)}px`,
                  "--hb-qc1-dc": dotColors[o.color],
                  animationDelay: `${(i * -0.5).toFixed(2)}s`,
                } as React.CSSProperties
              }
            >
              <b />
            </span>
          ))}
          <span className="hb-qc1-core" />
        </span>
        <span className={label ? "hb-qc1-l" : "hb-qc1-sr"}>{label ?? "Loading"}</span>
      </span>
    </>
  );
}
