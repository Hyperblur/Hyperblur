"use client";

import * as React from "react";

export interface ButtonIconSlideExpandProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  icon?: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  accent?: string;
  size?: "sm" | "md" | "lg";
  open?: boolean;
  loading?: boolean;
}

const defaultIcon = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const css = `
.hb-ya3 {
  --hb-ya3-h: 2.75rem;
  --hb-ya3-i: 1.15rem;
  --hb-ya3-fs: 0.9375rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: none;
  box-sizing: border-box;
  height: var(--hb-ya3-h);
  min-width: var(--hb-ya3-h);
  margin: 0;
  padding: 0 calc((var(--hb-ya3-h) - var(--hb-ya3-i)) / 2 - 1px);
  font: inherit;
  font-size: var(--hb-ya3-fs);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.18s cubic-bezier(0.3, 1.4, 0.5, 1), filter 0.2s ease;
}
.hb-ya3 *, .hb-ya3 *::before, .hb-ya3 *::after { box-sizing: border-box; }
.hb-ya3[data-size="sm"] { --hb-ya3-h: 2.25rem; --hb-ya3-i: 1rem; --hb-ya3-fs: 0.8125rem; }
.hb-ya3[data-size="lg"] { --hb-ya3-h: 3.25rem; --hb-ya3-i: 1.35rem; --hb-ya3-fs: 1.0625rem; }
.hb-ya3[data-variant="solid"] { color: #fff; background: var(--hb-ya3-c); }
.hb-ya3[data-variant="outline"] {
  color: #ededed;
  background: #111111;
  border-color: #2a2a2a;
}
.hb-ya3[data-variant="ghost"] {
  color: color-mix(in srgb, var(--hb-ya3-c) 70%, #fff);
  background: color-mix(in srgb, var(--hb-ya3-c) 12%, transparent);
}
.hb-ya3[data-variant="solid"]:not(:disabled):hover { filter: brightness(1.1); }
.hb-ya3[data-variant="outline"]:not(:disabled):hover,
.hb-ya3[data-variant="outline"][data-open="true"] { border-color: var(--hb-ya3-c); }
.hb-ya3[data-variant="ghost"]:not(:disabled):hover { background: color-mix(in srgb, var(--hb-ya3-c) 20%, transparent); }
.hb-ya3:not(:disabled):active { transform: scale(0.96); }
.hb-ya3:focus-visible { outline: 2px solid var(--hb-ya3-c); outline-offset: 3px; }
.hb-ya3:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-ya3[aria-busy="true"] { cursor: progress; }
.hb-ya3-icon {
  display: grid;
  flex: none;
  place-items: center;
  width: var(--hb-ya3-i);
  height: var(--hb-ya3-i);
  transition: transform 0.4s cubic-bezier(0.3, 0.9, 0.3, 1);
}
.hb-ya3-icon > svg { display: block; width: 100%; height: 100%; }
.hb-ya3-wrap {
  display: grid;
  grid-template-columns: 0fr;
  transition: grid-template-columns 0.42s cubic-bezier(0.3, 0.9, 0.3, 1);
}
.hb-ya3-clip { min-width: 0; overflow: hidden; }
.hb-ya3-text {
  display: block;
  padding: 0 0.3em 0 0.6em;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.25s ease, transform 0.42s cubic-bezier(0.3, 0.9, 0.3, 1);
}
.hb-ya3:not(:disabled):hover .hb-ya3-wrap,
.hb-ya3:not(:disabled):focus-visible .hb-ya3-wrap,
.hb-ya3[data-open="true"]:not(:disabled) .hb-ya3-wrap { grid-template-columns: 1fr; }
.hb-ya3:not(:disabled):hover .hb-ya3-text,
.hb-ya3:not(:disabled):focus-visible .hb-ya3-text,
.hb-ya3[data-open="true"]:not(:disabled) .hb-ya3-text {
  opacity: 1;
  transform: none;
  transition-delay: 0.08s;
}
.hb-ya3:not(:disabled):hover .hb-ya3-icon,
.hb-ya3:not(:disabled):focus-visible .hb-ya3-icon,
.hb-ya3[data-open="true"]:not(:disabled) .hb-ya3-icon { transform: scale(1.08); }
.hb-ya3-spin {
  width: 100%;
  height: 100%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-ya3-turn 0.7s linear infinite;
}
@keyframes hb-ya3-turn {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ya3, .hb-ya3-icon, .hb-ya3-wrap, .hb-ya3-text { transition: none; }
  .hb-ya3:not(:disabled):active { transform: none; }
  .hb-ya3-spin { animation-duration: 2s; }
}
`;

export function ButtonIconSlideExpand({
  icon = defaultIcon,
  variant = "solid",
  accent = "#2f7bff",
  size = "md",
  open = false,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  style,
  children,
  onClick,
  ...rest
}: ButtonIconSlideExpandProps) {
  const vars = { "--hb-ya3-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-icon-slide-expand" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-ya3 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        data-open={open}
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
        <span className="hb-ya3-icon" aria-hidden="true">
          {loading ? <span className="hb-ya3-spin" /> : icon}
        </span>
        <span className="hb-ya3-wrap">
          <span className="hb-ya3-clip">
            <span className="hb-ya3-text">{children}</span>
          </span>
        </span>
      </button>
    </>
  );
}
