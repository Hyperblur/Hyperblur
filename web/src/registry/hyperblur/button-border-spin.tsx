"use client";

import * as React from "react";

export interface ButtonBorderSpinProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: "dark" | "light" | "accent";
  accent?: string;
  size?: "sm" | "md" | "lg";
  spin?: "always" | "hover";
  duration?: number;
  loading?: boolean;
}

const css = `
.hb-ya2 {
  --hb-ya2-h: 2.75rem;
  --hb-ya2-fs: 0.9375rem;
  --hb-ya2-w: 1.5px;
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  margin: 0;
  padding: var(--hb-ya2-w);
  overflow: hidden;
  isolation: isolate;
  font: inherit;
  font-size: var(--hb-ya2-fs);
  background: rgba(255, 255, 255, 0.12);
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.18s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.hb-ya2 *, .hb-ya2 *::before, .hb-ya2 *::after { box-sizing: border-box; }
.hb-ya2[data-size="sm"] { --hb-ya2-h: 2.25rem; --hb-ya2-fs: 0.8125rem; }
.hb-ya2[data-size="lg"] { --hb-ya2-h: 3.25rem; --hb-ya2-fs: 1.0625rem; }
.hb-ya2[data-variant="dark"] {
  --hb-ya2-face: #0b0b0c;
  --hb-ya2-fg: #ededed;
  --hb-ya2-b: var(--hb-ya2-c);
  --hb-ya2-tip: color-mix(in srgb, var(--hb-ya2-c) 35%, #fff);
}
.hb-ya2[data-variant="light"] {
  --hb-ya2-face: #f4f4f5;
  --hb-ya2-fg: #0a0a0a;
  --hb-ya2-b: var(--hb-ya2-c);
  --hb-ya2-tip: color-mix(in srgb, var(--hb-ya2-c) 70%, #fff);
}
.hb-ya2[data-variant="accent"] {
  --hb-ya2-face: var(--hb-ya2-c);
  --hb-ya2-fg: #fff;
  --hb-ya2-b: rgba(255, 255, 255, 0.55);
  --hb-ya2-tip: #fff;
}
.hb-ya2:not(:disabled):active { transform: scale(0.97); }
.hb-ya2:focus-visible { outline: 2px solid var(--hb-ya2-c); outline-offset: 3px; }
.hb-ya2:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-ya2[aria-busy="true"] { cursor: progress; }
.hb-ya2-ring {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
  transition: opacity 0.35s ease;
}
.hb-ya2-sweep {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 280%;
  aspect-ratio: 1;
  background: conic-gradient(
    from 0deg,
    transparent 0 36%,
    var(--hb-ya2-b) 47%,
    var(--hb-ya2-tip) 50%,
    transparent 50.4% 86%,
    var(--hb-ya2-b) 97%,
    var(--hb-ya2-tip) 100%
  );
  transform: translate(-50%, -50%) rotate(0deg);
  animation: hb-ya2-turn var(--hb-ya2-t, 3s) linear infinite;
}
.hb-ya2[data-spin="hover"] .hb-ya2-ring { opacity: 0; }
.hb-ya2[data-spin="hover"]:not(:disabled):hover .hb-ya2-ring,
.hb-ya2[data-spin="hover"]:focus-visible .hb-ya2-ring { opacity: 1; }
.hb-ya2[data-spin="hover"] .hb-ya2-sweep { animation-play-state: paused; }
.hb-ya2[data-spin="hover"]:not(:disabled):hover .hb-ya2-sweep,
.hb-ya2[data-spin="hover"]:focus-visible .hb-ya2-sweep { animation-play-state: running; }
.hb-ya2-face {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  height: calc(var(--hb-ya2-h) - var(--hb-ya2-w) * 2);
  padding: 0 1.5em;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  color: var(--hb-ya2-fg);
  background: var(--hb-ya2-face);
  border-radius: 999px;
  transition: filter 0.2s ease;
}
.hb-ya2:not(:disabled):hover .hb-ya2-face { filter: brightness(1.12); }
.hb-ya2-spin {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-ya2-orbit 0.7s linear infinite;
}
@keyframes hb-ya2-turn {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes hb-ya2-orbit {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ya2, .hb-ya2-ring, .hb-ya2-face { transition: none; }
  .hb-ya2:not(:disabled):active { transform: none; }
  .hb-ya2-sweep { animation: none; transform: translate(-50%, -50%) rotate(40deg); }
  .hb-ya2-spin { animation-duration: 2s; }
}
`;

export function ButtonBorderSpin({
  variant = "dark",
  accent = "#2f7bff",
  size = "md",
  spin = "always",
  duration = 3,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  style,
  children,
  onClick,
  ...rest
}: ButtonBorderSpinProps) {
  const vars = {
    "--hb-ya2-c": accent,
    "--hb-ya2-t": `${Math.max(0.4, duration).toFixed(2)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-border-spin" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-ya2 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        data-spin={spin}
        disabled={disabled}
        aria-busy={loading || undefined}
        onClick={(e) => {
          if (loading) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...rest}
      >
        <span className="hb-ya2-ring" aria-hidden="true">
          <span className="hb-ya2-sweep" />
        </span>
        <span className="hb-ya2-face">
          {loading ? <span className="hb-ya2-spin" aria-hidden="true" /> : null}
          {children}
        </span>
      </button>
    </>
  );
}
