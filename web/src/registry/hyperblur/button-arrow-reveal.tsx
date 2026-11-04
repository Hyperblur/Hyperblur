"use client";

import * as React from "react";

export interface ButtonArrowRevealProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: "solid" | "outline";
  accent?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const css = `
.hb-qa6 {
  --hb-qa6-c: #2f7bff;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0.8em 1.9em;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  color: #ffffff;
  background: var(--hb-qa6-c);
  border: 0;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px transparent;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease, background-color 0.25s ease;
}
.hb-qa6[data-size="sm"] { font-size: 13px; }
.hb-qa6[data-size="lg"] { font-size: 17px; }
.hb-qa6[data-variant="outline"] {
  color: #ededed;
  background: transparent;
  box-shadow: inset 0 0 0 1px #333333;
}
.hb-qa6[data-variant="outline"]:hover:not(:disabled), .hb-qa6[data-variant="outline"]:focus-visible:not(:disabled) {
  box-shadow: inset 0 0 0 1px var(--hb-qa6-c);
}
.hb-qa6-in {
  position: relative;
  display: inline-block;
  white-space: nowrap;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-qa6-ar {
  position: absolute;
  top: 50%;
  left: 100%;
  width: 1.1em;
  height: 1.1em;
  margin: -0.55em 0 0 0.55em;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transform: translateX(-0.9em);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}
.hb-qa6-sp {
  position: absolute;
  top: 50%;
  left: 100%;
  width: 1em;
  height: 1em;
  margin: -0.5em 0 0 0.6em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-qa6-spin 0.7s linear infinite;
}
.hb-qa6:hover:not(:disabled) .hb-qa6-in, .hb-qa6:focus-visible:not(:disabled) .hb-qa6-in { transform: translateX(-0.82em); }
.hb-qa6:hover:not(:disabled) .hb-qa6-ar, .hb-qa6:focus-visible:not(:disabled) .hb-qa6-ar { opacity: 1; transform: translateX(0); }
.hb-qa6[aria-busy="true"] .hb-qa6-in { transform: translateX(-0.8em); }
.hb-qa6:not(:hover):not(:focus-visible):not(:disabled) .hb-qa6-in { animation: hb-qa6-hint-in 4.6s cubic-bezier(0.22, 1, 0.36, 1) 1s infinite; }
.hb-qa6:not(:hover):not(:focus-visible):not(:disabled) .hb-qa6-ar:not([data-go="true"]) { animation: hb-qa6-hint-ar 4.6s cubic-bezier(0.22, 1, 0.36, 1) 1s infinite; }
.hb-qa6-ar[data-go="true"] { animation: hb-qa6-go 0.7s cubic-bezier(0.65, 0, 0.35, 1) !important; }
.hb-qa6:active:not(:disabled) { transform: scale(0.97); }
.hb-qa6:focus-visible { outline: 2px solid var(--hb-qa6-c); outline-offset: 3px; }
.hb-qa6:disabled { cursor: not-allowed; }
.hb-qa6:disabled:not([aria-busy="true"]) { opacity: 0.45; }
@keyframes hb-qa6-spin { to { transform: rotate(360deg); } }
@keyframes hb-qa6-hint-in {
  0%, 70% { transform: translateX(0); }
  78%, 86% { transform: translateX(-0.82em); }
  96%, 100% { transform: translateX(0); }
}
@keyframes hb-qa6-hint-ar {
  0%, 70% { opacity: 0; transform: translateX(-0.9em); }
  78%, 86% { opacity: 1; transform: translateX(0); }
  96%, 100% { opacity: 0; transform: translateX(-0.9em); }
}
@keyframes hb-qa6-go {
  0% { opacity: 1; transform: translateX(0); }
  45% { opacity: 0; transform: translateX(1.6em); }
  46% { opacity: 0; transform: translateX(-1.6em); }
  100% { opacity: 1; transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qa6, .hb-qa6-in, .hb-qa6-ar { transition-duration: 0.01s; }
  .hb-qa6 .hb-qa6-in, .hb-qa6 .hb-qa6-ar { animation: none !important; }
  .hb-qa6:active:not(:disabled) { transform: none; }
  .hb-qa6-sp { animation-duration: 1.6s; }
}
`;

export function ButtonArrowReveal({
  children = "Read the story",
  variant = "solid",
  accent = "#2f7bff",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  style,
  onClick,
  ...rest
}: ButtonArrowRevealProps) {
  const [run, setRun] = React.useState({ n: 0, on: false });
  const vars = { "--hb-qa6-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-arrow-reveal" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-qa6 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        onClick={(e) => {
          setRun((r) => ({ n: r.n + 1, on: true }));
          onClick?.(e);
        }}
        {...rest}
      >
        <span className="hb-qa6-in">
          {children}
          {loading ? (
            <span className="hb-qa6-sp" aria-hidden="true" />
          ) : (
            <svg
              key={run.n}
              className="hb-qa6-ar"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              data-go={run.on ? "true" : undefined}
              onAnimationEnd={(e) => {
                if (e.animationName === "hb-qa6-go") setRun((r) => ({ ...r, on: false }));
              }}
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </span>
      </button>
    </>
  );
}
