"use client";

import * as React from "react";

export interface LiquidButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  rounded?: number;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-lb {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
  margin: 0;
  padding: 0.8em 1.8em;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  color: #f4f6fb;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid color-mix(in srgb, var(--hb-c) 65%, transparent);
  border-radius: var(--hb-r);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    color var(--hb-d) ease 0.08s,
    border-color var(--hb-d) ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-lb[data-size="sm"] { font-size: 13px; padding: 0.65em 1.45em; }
.hb-lb[data-size="lg"] { font-size: 17px; padding: 0.9em 2.1em; }
.hb-lb-fill {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  transform: translateY(calc(100% + 22px));
  transition: transform var(--hb-d) cubic-bezier(0.3, 0.8, 0.25, 1);
}
.hb-lb-body {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: -2px;
  background: var(--hb-c);
}
.hb-lb-wave {
  position: absolute;
  left: 0;
  width: 200%;
  height: 16px;
  fill: var(--hb-c);
}
.hb-lb-wave-a {
  top: -15px;
  animation: hb-lb-slide calc(var(--hb-d) * 3) linear infinite;
}
.hb-lb-wave-b {
  top: -19px;
  opacity: 0.45;
  animation: hb-lb-slide calc(var(--hb-d) * 4.5) linear infinite reverse;
}
.hb-lb-t { position: relative; }
.hb-lb:hover, .hb-lb:focus-visible {
  color: #05070b;
  border-color: var(--hb-c);
}
.hb-lb:hover .hb-lb-fill, .hb-lb:focus-visible .hb-lb-fill { transform: translateY(0); }
.hb-lb:active { transform: scale(0.97); }
.hb-lb:focus-visible { outline: 2px solid var(--hb-c); outline-offset: 3px; }
.hb-lb:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
@keyframes hb-lb-slide {
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-lb, .hb-lb-fill { transition-duration: 0.01s; }
  .hb-lb-wave { animation: none; }
  .hb-lb:active { transform: none; }
}
`;

const wave = "M0 8 Q25 -2 50 8 T100 8 T150 8 T200 8 V16 H0 Z";

export function LiquidButton({
  children,
  color = "#2f7bff",
  duration = 0.6,
  rounded = 9999,
  size = "md",
  type = "button",
  className = "",
  style,
  ...rest
}: LiquidButtonProps) {
  const vars = {
    "--hb-c": color,
    "--hb-d": `${Math.max(0.05, duration)}s`,
    "--hb-r": `${rounded}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-liquid-button" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-lb ${className}`}
        style={vars}
        data-size={size}
        {...rest}
      >
        <span className="hb-lb-fill" aria-hidden="true">
          <span className="hb-lb-body" />
          <svg className="hb-lb-wave hb-lb-wave-b" viewBox="0 0 200 16" preserveAspectRatio="none">
            <path d={wave} />
          </svg>
          <svg className="hb-lb-wave hb-lb-wave-a" viewBox="0 0 200 16" preserveAspectRatio="none">
            <path d={wave} />
          </svg>
        </span>
        <span className="hb-lb-t">{children}</span>
      </button>
    </>
  );
}
