"use client";

import * as React from "react";

export interface Button3dPressProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: "solid" | "light";
  accent?: string;
  size?: "sm" | "md" | "lg";
  depth?: number;
  loading?: boolean;
}

const css = `
.hb-qa4 {
  --hb-qa4-c: #2f7bff;
  --hb-qa4-d: 6px;
  --hb-qa4-face: var(--hb-qa4-c);
  --hb-qa4-edge: color-mix(in srgb, var(--hb-qa4-c) 55%, #000000);
  --hb-qa4-ink: #ffffff;
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  margin: 0;
  padding: 0 0 var(--hb-qa4-d);
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--hb-qa4-ink);
  background: none;
  border: 0;
  border-radius: 14px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.hb-qa4[data-size="sm"] { font-size: 13px; }
.hb-qa4[data-size="lg"] { font-size: 17px; }
.hb-qa4[data-variant="light"] {
  --hb-qa4-face: #f2f2f2;
  --hb-qa4-edge: #8a8a8a;
  --hb-qa4-ink: #0a0a0a;
}
.hb-qa4-e {
  position: absolute;
  top: var(--hb-qa4-d);
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: inherit;
  background: var(--hb-qa4-edge);
  box-shadow: 0 8px 14px -4px rgba(0, 0, 0, 0.55);
}
.hb-qa4-f {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  width: 100%;
  box-sizing: border-box;
  padding: 0.85em 1.9em;
  overflow: hidden;
  white-space: nowrap;
  border-radius: inherit;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-qa4-face) 86%, #ffffff), var(--hb-qa4-face));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -2px 0 rgba(0, 0, 0, 0.08);
  transform-origin: 50% 100%;
  transition: transform 0.38s cubic-bezier(0.34, 1.9, 0.5, 1);
}
.hb-qa4-f::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 40%;
  pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: translateX(-130%) skewX(-18deg);
  animation: hb-qa4-sheen 4.4s ease-in-out 1.2s infinite;
}
.hb-qa4:hover:not(:disabled) .hb-qa4-f { transform: translateY(-1px); }
.hb-qa4:active:not(:disabled) .hb-qa4-f,
.hb-qa4[data-pressed="true"]:not(:disabled) .hb-qa4-f {
  transform: translateY(var(--hb-qa4-d)) scale(1.03, 0.95);
  transition-duration: 0.07s;
  transition-timing-function: ease-out;
}
.hb-qa4[aria-busy="true"] .hb-qa4-f { transform: translateY(calc(var(--hb-qa4-d) * 0.6)); }
.hb-qa4:focus-visible { outline: 2px solid var(--hb-qa4-c); outline-offset: 4px; }
.hb-qa4:disabled { cursor: not-allowed; }
.hb-qa4:disabled:not([aria-busy="true"]) { opacity: 0.45; }
.hb-qa4:disabled:not([aria-busy="true"]) .hb-qa4-f { transform: translateY(calc(var(--hb-qa4-d) * 0.7)); }
.hb-qa4-sp {
  width: 1em;
  height: 1em;
  flex: none;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-qa4-spin 0.7s linear infinite;
}
@keyframes hb-qa4-spin { to { transform: rotate(360deg); } }
@keyframes hb-qa4-sheen {
  0%, 55% { transform: translateX(-130%) skewX(-18deg); }
  80%, 100% { transform: translateX(340%) skewX(-18deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qa4-f { transition: none; }
  .hb-qa4-f::after { animation: none; display: none; }
  .hb-qa4:active:not(:disabled) .hb-qa4-f,
  .hb-qa4[data-pressed="true"]:not(:disabled) .hb-qa4-f { transform: translateY(var(--hb-qa4-d)); }
  .hb-qa4-sp { animation-duration: 1.6s; }
}
`;

export function Button3dPress({
  children = "Continue",
  variant = "solid",
  accent = "#2f7bff",
  size = "md",
  depth = 6,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  style,
  onKeyDown,
  onKeyUp,
  onBlur,
  ...rest
}: Button3dPressProps) {
  const vars = {
    "--hb-qa4-c": accent,
    "--hb-qa4-d": `${Math.max(2, depth)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-3d-press" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-qa4 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") e.currentTarget.dataset.pressed = "true";
          onKeyDown?.(e);
        }}
        onKeyUp={(e) => {
          delete e.currentTarget.dataset.pressed;
          onKeyUp?.(e);
        }}
        onBlur={(e) => {
          delete e.currentTarget.dataset.pressed;
          onBlur?.(e);
        }}
        {...rest}
      >
        <span className="hb-qa4-e" aria-hidden="true" />
        <span className="hb-qa4-f">
          {loading ? <span className="hb-qa4-sp" aria-hidden="true" /> : null}
          {children}
        </span>
      </button>
    </>
  );
}
