"use client";

import * as React from "react";

export interface LoaderPulseRingsProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  rings?: number;
  speed?: number;
  icon?: React.ReactNode;
  label?: string;
}

const css = `
.hb-qca {
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
.hb-qca *, .hb-qca *::before, .hb-qca *::after { box-sizing: border-box; }
.hb-qca-g {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: var(--hb-qca-s);
  height: var(--hb-qca-s);
}
.hb-qca-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(var(--hb-qca-s) * 0.34);
  height: calc(var(--hb-qca-s) * 0.34);
  margin: calc(var(--hb-qca-s) * -0.17) 0 0 calc(var(--hb-qca-s) * -0.17);
  border-radius: 50%;
  border: 2px solid var(--hb-qca-c);
  background: radial-gradient(circle, transparent 55%, color-mix(in srgb, var(--hb-qca-c) 22%, transparent));
  opacity: 0;
  animation: hb-qca-expand var(--hb-qca-t) cubic-bezier(0.2, 0.6, 0.3, 1) infinite;
  animation-delay: calc(var(--i) * var(--hb-qca-t) / var(--hb-qca-n) * -1);
}
.hb-qca-core {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: calc(var(--hb-qca-s) * 0.34);
  height: calc(var(--hb-qca-s) * 0.34);
  border-radius: 50%;
  background: linear-gradient(145deg, var(--hb-qca-a), var(--hb-qca-c));
  color: #fff;
  box-shadow: 0 0 calc(var(--hb-qca-s) * 0.16) color-mix(in srgb, var(--hb-qca-c) 60%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  animation: hb-qca-beat var(--hb-qca-t) ease-in-out infinite;
}
.hb-qca-core svg { display: block; width: 52%; height: 52%; }
.hb-qca-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-qca-sr {
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
@keyframes hb-qca-expand {
  0% { transform: scale(1); opacity: 0.75; }
  100% { transform: scale(2.9); opacity: 0; }
}
@keyframes hb-qca-beat {
  0%, 100% { transform: scale(1); }
  12% { transform: scale(1.1); }
  30% { transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qca-ring { animation: none; opacity: 0.25; transform: scale(1.8); }
  .hb-qca-ring:nth-child(2) { transform: scale(2.4); opacity: 0.12; }
  .hb-qca-core { animation: none; }
}
`;

function Signal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 12h.01" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M5.6 5.6a9 9 0 0 0 0 12.8" />
      <path d="M18.4 5.6a9 9 0 0 1 0 12.8" />
    </svg>
  );
}

export function LoaderPulseRings({
  size = 96,
  color = "#2f7bff",
  accent = "#7fb3ff",
  rings = 3,
  speed = 2.4,
  icon,
  label,
  className = "",
  style,
  ...rest
}: LoaderPulseRingsProps) {
  const n = Math.max(1, Math.round(rings));
  const vars = {
    "--hb-qca-s": `${size}px`,
    "--hb-qca-c": color,
    "--hb-qca-a": accent,
    "--hb-qca-n": n,
    "--hb-qca-t": `${speed}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-pulse-rings" precedence="default">{css}</style>
      <span role="status" className={`hb-qca ${className}`} style={vars} {...rest}>
        <span className="hb-qca-g" aria-hidden="true">
          {Array.from({ length: n }, (_, i) => (
            <span key={i} className="hb-qca-ring" style={{ "--i": i } as React.CSSProperties} />
          ))}
          <span className="hb-qca-core">{icon ?? <Signal />}</span>
        </span>
        <span className={label ? "hb-qca-l" : "hb-qca-sr"}>{label ?? "Loading"}</span>
      </span>
    </>
  );
}
