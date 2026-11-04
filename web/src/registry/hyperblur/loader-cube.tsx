"use client";

import * as React from "react";

export interface LoaderCubeProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  label?: string;
}

const css = `
.hb-qcb {
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
.hb-qcb *, .hb-qcb *::before, .hb-qcb *::after { box-sizing: border-box; }
.hb-qcb-g {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: calc(var(--hb-qcb-s) * 1.7);
  height: calc(var(--hb-qcb-s) * 1.9);
  perspective: calc(var(--hb-qcb-s) * 6);
}
.hb-qcb-cube {
  position: relative;
  width: var(--hb-qcb-s);
  height: var(--hb-qcb-s);
  margin-top: calc(var(--hb-qcb-s) * -0.15);
  transform-style: preserve-3d;
  animation: hb-qcb-turn var(--hb-qcb-t) linear infinite;
}
.hb-qcb-f {
  position: absolute;
  inset: 0;
  border: 1.5px solid var(--hb-qcb-c);
  border-radius: calc(var(--hb-qcb-s) * 0.06);
  background: linear-gradient(145deg, color-mix(in srgb, var(--hb-qcb-a) 30%, transparent), color-mix(in srgb, var(--hb-qcb-c) 14%, transparent));
  box-shadow: inset 0 0 calc(var(--hb-qcb-s) * 0.3) color-mix(in srgb, var(--hb-qcb-c) 30%, transparent);
  backface-visibility: visible;
}
.hb-qcb-f:nth-child(1) { transform: translateZ(calc(var(--hb-qcb-s) / 2)); }
.hb-qcb-f:nth-child(2) { transform: rotateY(180deg) translateZ(calc(var(--hb-qcb-s) / 2)); }
.hb-qcb-f:nth-child(3) { transform: rotateY(90deg) translateZ(calc(var(--hb-qcb-s) / 2)); }
.hb-qcb-f:nth-child(4) { transform: rotateY(-90deg) translateZ(calc(var(--hb-qcb-s) / 2)); }
.hb-qcb-f:nth-child(5) { transform: rotateX(90deg) translateZ(calc(var(--hb-qcb-s) / 2)); background: linear-gradient(145deg, color-mix(in srgb, var(--hb-qcb-a) 55%, transparent), color-mix(in srgb, var(--hb-qcb-c) 30%, transparent)); }
.hb-qcb-f:nth-child(6) { transform: rotateX(-90deg) translateZ(calc(var(--hb-qcb-s) / 2)); }
.hb-qcb-shadow {
  position: absolute;
  left: 50%;
  bottom: calc(var(--hb-qcb-s) * 0.1);
  width: calc(var(--hb-qcb-s) * 1.1);
  height: calc(var(--hb-qcb-s) * 0.22);
  margin-left: calc(var(--hb-qcb-s) * -0.55);
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(0, 0, 0, 0.7), transparent);
  filter: blur(2px);
  animation: hb-qcb-shade calc(var(--hb-qcb-t) / 2) ease-in-out infinite;
}
.hb-qcb-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-qcb-sr {
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
@keyframes hb-qcb-turn {
  from { transform: rotateX(-24deg) rotateY(0deg); }
  to { transform: rotateX(-24deg) rotateY(360deg); }
}
@keyframes hb-qcb-shade {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(0.82); opacity: 0.55; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qcb-cube { animation: none; transform: rotateX(-24deg) rotateY(35deg); }
  .hb-qcb-shadow { animation: none; }
}
`;

export function LoaderCube({
  size = 40,
  color = "#2f7bff",
  accent = "#7fb3ff",
  speed = 4,
  label,
  className = "",
  style,
  ...rest
}: LoaderCubeProps) {
  const vars = {
    "--hb-qcb-s": `${size}px`,
    "--hb-qcb-c": color,
    "--hb-qcb-a": accent,
    "--hb-qcb-t": `${speed}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-cube" precedence="default">{css}</style>
      <span role="status" className={`hb-qcb ${className}`} style={vars} {...rest}>
        <span className="hb-qcb-g" aria-hidden="true">
          <span className="hb-qcb-shadow" />
          <span className="hb-qcb-cube">
            <i className="hb-qcb-f" />
            <i className="hb-qcb-f" />
            <i className="hb-qcb-f" />
            <i className="hb-qcb-f" />
            <i className="hb-qcb-f" />
            <i className="hb-qcb-f" />
          </span>
        </span>
        <span className={label ? "hb-qcb-l" : "hb-qcb-sr"}>{label ?? "Loading"}</span>
      </span>
    </>
  );
}
