"use client";

import * as React from "react";

export interface BorderBeamButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  children: React.ReactNode;
  color?: string;
  secondary?: string;
  duration?: number;
  borderWidth?: number;
  rounded?: number;
  size?: "sm" | "md" | "lg";
}

const css = `
@property --hb-a {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
.hb-bb {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  margin: 0;
  padding: 0.8em 1.7em;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  color: #f4f6fb;
  background: #0a0c11;
  border: 0;
  border-radius: var(--hb-r);
  box-shadow: inset 0 0 0 var(--hb-w) rgba(255, 255, 255, 0.1);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, background-color 0.3s ease;
}
.hb-bb[data-size="sm"] { font-size: 13px; padding: 0.65em 1.4em; }
.hb-bb[data-size="lg"] { font-size: 17px; padding: 0.9em 2em; }
.hb-bb::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: var(--hb-w);
  border-radius: inherit;
  pointer-events: none;
  background: conic-gradient(
    from var(--hb-a),
    transparent 0deg,
    transparent 225deg,
    var(--hb-c2) 290deg,
    var(--hb-c) 338deg,
    transparent 360deg
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  opacity: 0.8;
  filter: saturate(1.1);
  animation: hb-bb-spin var(--hb-d) linear infinite;
  transition: opacity 0.35s ease, filter 0.35s ease;
}
.hb-bb:hover {
  transform: translateY(-1px);
  background-color: #0e1117;
  box-shadow:
    inset 0 0 0 var(--hb-w) rgba(255, 255, 255, 0.16),
    0 0 26px -8px color-mix(in srgb, var(--hb-c) 65%, transparent);
}
.hb-bb:hover::before { opacity: 1; filter: saturate(1.4) brightness(1.35); }
.hb-bb:active { transform: scale(0.97); }
.hb-bb:focus-visible { outline: 2px solid var(--hb-c); outline-offset: 3px; }
.hb-bb:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
@keyframes hb-bb-spin {
  to { --hb-a: 360deg; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-bb { transition: box-shadow 0.2s ease, background-color 0.2s ease; }
  .hb-bb::before { animation: none; --hb-a: 215deg; transition: opacity 0.2s ease; }
  .hb-bb:hover, .hb-bb:active { transform: none; }
}
`;

export function BorderBeamButton({
  children,
  color = "#2f7bff",
  secondary = "#19c3f5",
  duration = 3,
  borderWidth = 1.5,
  rounded = 9999,
  size = "md",
  type = "button",
  className = "",
  style,
  ...rest
}: BorderBeamButtonProps) {
  const vars = {
    "--hb-c": color,
    "--hb-c2": secondary,
    "--hb-d": `${Math.max(0.2, duration)}s`,
    "--hb-w": `${Math.max(0.5, borderWidth)}px`,
    "--hb-r": `${rounded}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-border-beam-button" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-bb ${className}`}
        style={vars}
        data-size={size}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}
