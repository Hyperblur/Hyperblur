"use client";

import * as React from "react";

export interface ShimmerButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  children: React.ReactNode;
  color?: string;
  speed?: number;
  rounded?: number;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-sb {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  overflow: hidden;
  isolation: isolate;
  margin: 0;
  padding: 0.8em 1.7em;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.005em;
  white-space: nowrap;
  color: #f4f6fb;
  background: linear-gradient(180deg, #151821, #0a0c11);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--hb-r);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 10px 26px -14px rgba(0, 0, 0, 0.9);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease, box-shadow 0.3s ease;
}
.hb-sb[data-size="sm"] { font-size: 13px; padding: 0.65em 1.4em; }
.hb-sb[data-size="lg"] { font-size: 17px; padding: 0.9em 2em; }
.hb-sb::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: linear-gradient(
    105deg,
    transparent 40%,
    color-mix(in srgb, var(--hb-c) 42%, transparent) 50%,
    transparent 60%
  );
  background-size: 250% 100%;
  background-repeat: no-repeat;
  background-position: 100% 0;
  animation: hb-sb-sweep var(--hb-d) ease-in-out infinite;
}
.hb-sb::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(120% 150% at 50% 130%, color-mix(in srgb, var(--hb-c) 34%, transparent), transparent 62%);
  box-shadow: inset 0 0 22px color-mix(in srgb, var(--hb-c) 40%, transparent);
  transition: opacity 0.35s ease;
}
.hb-sb:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--hb-c) 55%, transparent);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 12px 30px -14px color-mix(in srgb, var(--hb-c) 70%, transparent);
}
.hb-sb:hover::after { opacity: 1; }
.hb-sb:active { transform: scale(0.97); }
.hb-sb:focus-visible { outline: 2px solid var(--hb-c); outline-offset: 3px; }
.hb-sb:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
@keyframes hb-sb-sweep {
  0% { background-position: 100% 0; }
  70%, 100% { background-position: 0% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-sb { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
  .hb-sb::before { animation: none; background-position: 50% 0; opacity: 0.5; }
  .hb-sb:hover, .hb-sb:active { transform: none; }
}
`;

export function ShimmerButton({
  children,
  color = "#2f7bff",
  speed = 1,
  rounded = 9999,
  size = "md",
  type = "button",
  className = "",
  style,
  ...rest
}: ShimmerButtonProps) {
  const vars = {
    "--hb-c": color,
    "--hb-d": `${(2.6 / Math.max(0.1, speed)).toFixed(3)}s`,
    "--hb-r": `${rounded}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-shimmer-button" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-sb ${className}`}
        style={vars}
        data-size={size}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}
