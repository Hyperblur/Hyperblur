"use client";

import * as React from "react";

export interface ButtonSplitHalvesProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  reveal?: React.ReactNode;
  icon?: React.ReactNode;
  axis?: "x" | "y";
  variant?: "light" | "dark" | "accent";
  accent?: string;
  size?: "sm" | "md" | "lg";
  open?: boolean;
  loading?: boolean;
}

const css = `
.hb-ya4 {
  --hb-ya4-h: 2.9rem;
  --hb-ya4-fs: 0.9375rem;
  position: relative;
  display: inline-grid;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: hidden;
  isolation: isolate;
  font: inherit;
  font-size: var(--hb-ya4-fs);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid var(--hb-ya4-line);
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.18s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.hb-ya4 *, .hb-ya4 *::before, .hb-ya4 *::after { box-sizing: border-box; }
.hb-ya4[data-size="sm"] { --hb-ya4-h: 2.4rem; --hb-ya4-fs: 0.8125rem; }
.hb-ya4[data-size="lg"] { --hb-ya4-h: 3.4rem; --hb-ya4-fs: 1.0625rem; }
.hb-ya4[data-variant="light"] {
  --hb-ya4-door: #f2f2f3;
  --hb-ya4-fg: #0a0a0a;
  --hb-ya4-alt: var(--hb-ya4-c);
  --hb-ya4-altfg: #fff;
  --hb-ya4-line: rgba(255, 255, 255, 0.2);
}
.hb-ya4[data-variant="dark"] {
  --hb-ya4-door: #131314;
  --hb-ya4-fg: #ededed;
  --hb-ya4-alt: var(--hb-ya4-c);
  --hb-ya4-altfg: #fff;
  --hb-ya4-line: #2a2a2a;
}
.hb-ya4[data-variant="accent"] {
  --hb-ya4-door: var(--hb-ya4-c);
  --hb-ya4-fg: #fff;
  --hb-ya4-alt: #f2f2f3;
  --hb-ya4-altfg: #0a0a0a;
  --hb-ya4-line: transparent;
}
.hb-ya4:not(:disabled):active { transform: scale(0.97); }
.hb-ya4:focus-visible { outline: 2px solid var(--hb-ya4-c); outline-offset: 3px; }
.hb-ya4:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-ya4[aria-busy="true"] { cursor: progress; }
.hb-ya4-alt {
  grid-area: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55em;
  height: var(--hb-ya4-h);
  padding: 0 1.7em;
  color: var(--hb-ya4-altfg);
  background: var(--hb-ya4-alt);
  opacity: 0.6;
  transform: scale(0.9);
  transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.3, 0.9, 0.3, 1);
}
.hb-ya4-alt > svg { width: 1.1em; height: 1.1em; flex: none; }
.hb-ya4-half {
  grid-area: 1 / 1;
  display: grid;
  place-items: center;
  height: var(--hb-ya4-h);
  padding: 0 1.7em;
  color: var(--hb-ya4-fg);
  background: var(--hb-ya4-door);
  transition: transform 0.5s cubic-bezier(0.7, 0, 0.2, 1);
}
.hb-ya4[data-axis="y"] .hb-ya4-a { clip-path: inset(0 0 calc(50% - 0.5px) 0); }
.hb-ya4[data-axis="y"] .hb-ya4-b { clip-path: inset(calc(50% - 0.5px) 0 0 0); }
.hb-ya4[data-axis="x"] .hb-ya4-a { clip-path: inset(0 calc(50% - 0.5px) 0 0); }
.hb-ya4[data-axis="x"] .hb-ya4-b { clip-path: inset(0 0 0 calc(50% - 0.5px)); }
.hb-ya4:not(:disabled):hover .hb-ya4-alt,
.hb-ya4:not(:disabled):focus-visible .hb-ya4-alt,
.hb-ya4[data-open="true"] .hb-ya4-alt { opacity: 1; transform: none; }
.hb-ya4[data-axis="y"]:not(:disabled):hover .hb-ya4-a,
.hb-ya4[data-axis="y"]:not(:disabled):focus-visible .hb-ya4-a,
.hb-ya4[data-axis="y"][data-open="true"] .hb-ya4-a { transform: translateY(-64%); }
.hb-ya4[data-axis="y"]:not(:disabled):hover .hb-ya4-b,
.hb-ya4[data-axis="y"]:not(:disabled):focus-visible .hb-ya4-b,
.hb-ya4[data-axis="y"][data-open="true"] .hb-ya4-b { transform: translateY(64%); }
.hb-ya4[data-axis="x"]:not(:disabled):hover .hb-ya4-a,
.hb-ya4[data-axis="x"]:not(:disabled):focus-visible .hb-ya4-a,
.hb-ya4[data-axis="x"][data-open="true"] .hb-ya4-a { transform: translateX(-64%); }
.hb-ya4[data-axis="x"]:not(:disabled):hover .hb-ya4-b,
.hb-ya4[data-axis="x"]:not(:disabled):focus-visible .hb-ya4-b,
.hb-ya4[data-axis="x"][data-open="true"] .hb-ya4-b { transform: translateX(64%); }
.hb-ya4-spin {
  width: 1.05em;
  height: 1.05em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-ya4-turn 0.7s linear infinite;
}
@keyframes hb-ya4-turn {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ya4, .hb-ya4-alt, .hb-ya4-half { transition: none; }
  .hb-ya4:not(:disabled):active { transform: none; }
  .hb-ya4-spin { animation-duration: 2s; }
}
`;

export function ButtonSplitHalves({
  reveal = "Let's go",
  icon,
  axis = "y",
  variant = "light",
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
}: ButtonSplitHalvesProps) {
  const vars = { "--hb-ya4-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-split-halves" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-ya4 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        data-axis={axis}
        data-open={open || loading}
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
        <span className="hb-ya4-alt" aria-hidden="true">
          {loading ? <span className="hb-ya4-spin" /> : icon}
          {loading ? null : reveal}
        </span>
        <span className="hb-ya4-half hb-ya4-a">{children}</span>
        <span className="hb-ya4-half hb-ya4-b" aria-hidden="true">{children}</span>
      </button>
    </>
  );
}
