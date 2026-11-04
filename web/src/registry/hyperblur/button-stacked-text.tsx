"use client";

import * as React from "react";

export interface ButtonStackedTextProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "children"> {
  children?: string;
  hoverLabel?: string;
  stagger?: number;
  variant?: "outline" | "solid";
  accent?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  idle?: boolean;
}

const css = `
.hb-qaa {
  --hb-qaa-c: #2f7bff;
  --hb-qaa-bg: transparent;
  --hb-qaa-fg: #ededed;
  --hb-qaa-ring: #333333;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  box-sizing: border-box;
  margin: 0;
  padding: 0.8em 1.8em;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--hb-qaa-fg);
  background: var(--hb-qaa-bg);
  border: 0;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px var(--hb-qaa-ring);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease, background-color 0.25s ease;
}
.hb-qaa[data-size="sm"] { font-size: 13px; }
.hb-qaa[data-size="lg"] { font-size: 17px; }
.hb-qaa[data-variant="solid"] {
  --hb-qaa-bg: var(--hb-qaa-c);
  --hb-qaa-fg: #ffffff;
  --hb-qaa-ring: transparent;
}
.hb-qaa:hover:not(:disabled), .hb-qaa:focus-visible:not(:disabled) { --hb-qaa-ring: var(--hb-qaa-c); }
.hb-qaa[data-variant="solid"]:hover:not(:disabled) { filter: brightness(1.1); }
.hb-qaa-w {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 1.25em;
  overflow: hidden;
}
.hb-qaa-row {
  display: block;
  height: 1.25em;
  white-space: pre;
}
.hb-qaa-ch {
  display: inline-block;
  transform: translateY(0);
  transition: transform 0.5s cubic-bezier(0.7, 0, 0.2, 1);
  transition-delay: calc(var(--hb-qaa-i) * var(--hb-qaa-s));
}
.hb-qaa:hover:not(:disabled):not([aria-busy="true"]) .hb-qaa-ch,
.hb-qaa:focus-visible:not(:disabled):not([aria-busy="true"]) .hb-qaa-ch {
  transform: translateY(-100%);
}
.hb-qaa[data-idle="true"]:not(:hover):not(:focus-visible):not(:disabled) .hb-qaa-ch {
  animation: hb-qaa-roll 5.2s cubic-bezier(0.7, 0, 0.2, 1) infinite;
  animation-delay: calc(1.2s + var(--hb-qaa-i) * var(--hb-qaa-s));
}
.hb-qaa:active:not(:disabled) { transform: scale(0.97); }
.hb-qaa:focus-visible { outline: 2px solid var(--hb-qaa-c); outline-offset: 3px; }
.hb-qaa:disabled { cursor: not-allowed; }
.hb-qaa:disabled:not([aria-busy="true"]) { opacity: 0.45; }
.hb-qaa-sp {
  width: 1em;
  height: 1em;
  flex: none;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-qaa-spin 0.7s linear infinite;
}
@keyframes hb-qaa-spin { to { transform: rotate(360deg); } }
@keyframes hb-qaa-roll {
  0%, 62% { transform: translateY(0); }
  72%, 86% { transform: translateY(-100%); }
  96%, 100% { transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qaa { transition: none; }
  .hb-qaa .hb-qaa-ch { animation: none !important; transition-duration: 0.01s; transition-delay: 0s; }
  .hb-qaa:active:not(:disabled) { transform: none; }
  .hb-qaa-sp { animation-duration: 1.6s; }
}
`;

function Letters({ text, step }: { text: string; step: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="hb-qaa-ch"
          style={{ "--hb-qaa-i": i, "--hb-qaa-s": `${step}ms` } as React.CSSProperties}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

export function ButtonStackedText({
  children = "Get started",
  hoverLabel = "Let's go",
  stagger = 24,
  variant = "outline",
  accent = "#2f7bff",
  size = "md",
  loading = false,
  idle = true,
  disabled = false,
  type = "button",
  className = "",
  style,
  "aria-label": ariaLabel,
  ...rest
}: ButtonStackedTextProps) {
  const vars = { "--hb-qaa-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-stacked-text" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-qaa ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        data-idle={idle ? "true" : "false"}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        aria-label={ariaLabel ?? children}
        {...rest}
      >
        {loading ? <span className="hb-qaa-sp" aria-hidden="true" /> : null}
        <span className="hb-qaa-w" aria-hidden="true">
          <span className="hb-qaa-row">
            <Letters text={children} step={stagger} />
          </span>
          <span className="hb-qaa-row">
            <Letters text={hoverLabel} step={stagger} />
          </span>
        </span>
      </button>
    </>
  );
}
