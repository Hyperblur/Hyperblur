"use client";

import * as React from "react";

export interface ButtonGlitchHoverProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: "outline" | "solid";
  accent?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  idle?: boolean;
}

const css = `
.hb-qa3 {
  --hb-qa3-c: #2f7bff;
  --hb-qa3-d: #ff2e63;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0.8em 1.7em;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.2;
  color: #ededed;
  background: #101010;
  border: 0;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px #2c2c2c;
  cursor: pointer;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: box-shadow 0.15s ease, background-color 0.15s ease;
}
.hb-qa3[data-size="sm"] { font-size: 13px; }
.hb-qa3[data-size="lg"] { font-size: 17px; }
.hb-qa3[data-variant="solid"] { color: #ffffff; background: var(--hb-qa3-c); box-shadow: none; }
.hb-qa3-t, .hb-qa3-r, .hb-qa3-b {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  white-space: nowrap;
}
.hb-qa3-t { position: relative; z-index: 2; }
.hb-qa3-r, .hb-qa3-b {
  position: absolute;
  inset: 0;
  z-index: 3;
  justify-content: center;
  pointer-events: none;
  opacity: 0;
  mix-blend-mode: screen;
}
.hb-qa3-r { color: var(--hb-qa3-d); }
.hb-qa3-b { color: var(--hb-qa3-c); }
.hb-qa3[data-variant="solid"] .hb-qa3-r, .hb-qa3[data-variant="solid"] .hb-qa3-b { mix-blend-mode: normal; }
.hb-qa3[data-variant="solid"] .hb-qa3-b { color: #7fe9ff; }
.hb-qa3:hover:not(:disabled), .hb-qa3:focus-visible:not(:disabled) {
  box-shadow: inset 0 0 0 1px var(--hb-qa3-c);
}
.hb-qa3:hover:not(:disabled) .hb-qa3-t, .hb-qa3:focus-visible:not(:disabled) .hb-qa3-t {
  animation: hb-qa3-main 0.42s steps(1, end) infinite;
}
.hb-qa3:hover:not(:disabled) .hb-qa3-r, .hb-qa3:focus-visible:not(:disabled) .hb-qa3-r {
  opacity: 1;
  animation: hb-qa3-red 0.5s steps(1, end) infinite;
}
.hb-qa3:hover:not(:disabled) .hb-qa3-b, .hb-qa3:focus-visible:not(:disabled) .hb-qa3-b {
  opacity: 1;
  animation: hb-qa3-blue 0.38s steps(1, end) infinite;
}
.hb-qa3[data-idle="true"]:not(:hover):not(:focus-visible):not(:disabled) .hb-qa3-r {
  animation: hb-qa3-burst-r 4.2s steps(1, end) infinite;
}
.hb-qa3[data-idle="true"]:not(:hover):not(:focus-visible):not(:disabled) .hb-qa3-b {
  animation: hb-qa3-burst-b 4.2s steps(1, end) infinite;
}
.hb-qa3:active:not(:disabled) { transform: translate(1px, 1px); }
.hb-qa3:focus-visible { outline: 2px solid var(--hb-qa3-c); outline-offset: 3px; }
.hb-qa3:disabled { cursor: not-allowed; }
.hb-qa3:disabled:not([aria-busy="true"]) { opacity: 0.45; }
.hb-qa3-sp {
  width: 1em;
  height: 1em;
  flex: none;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-qa3-spin 0.7s linear infinite;
}
@keyframes hb-qa3-spin { to { transform: rotate(360deg); } }
@keyframes hb-qa3-main {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-1px, 0); }
  40% { transform: translate(1px, 1px); }
  60% { transform: translate(0, -1px); }
  80% { transform: translate(1px, 0); }
}
@keyframes hb-qa3-red {
  0% { clip-path: inset(10% 0 62% 0); transform: translate(-3px, 0); }
  16% { clip-path: inset(58% 0 12% 0); transform: translate(3px, 0); }
  33% { clip-path: inset(30% 0 40% 0); transform: translate(-2px, 1px); }
  50% { clip-path: inset(72% 0 4% 0); transform: translate(4px, 0); }
  66% { clip-path: inset(2% 0 78% 0); transform: translate(-4px, 0); }
  83% { clip-path: inset(44% 0 30% 0); transform: translate(2px, -1px); }
}
@keyframes hb-qa3-blue {
  0% { clip-path: inset(64% 0 8% 0); transform: translate(3px, 0); }
  20% { clip-path: inset(6% 0 70% 0); transform: translate(-3px, 0); }
  40% { clip-path: inset(40% 0 34% 0); transform: translate(2px, 1px); }
  60% { clip-path: inset(18% 0 56% 0); transform: translate(-4px, 0); }
  80% { clip-path: inset(78% 0 2% 0); transform: translate(3px, -1px); }
}
@keyframes hb-qa3-burst-r {
  0%, 88% { opacity: 0; }
  89% { opacity: 1; clip-path: inset(12% 0 60% 0); transform: translate(-3px, 0); }
  92% { opacity: 1; clip-path: inset(56% 0 14% 0); transform: translate(3px, 0); }
  95% { opacity: 1; clip-path: inset(34% 0 36% 0); transform: translate(-2px, 0); }
  97%, 100% { opacity: 0; }
}
@keyframes hb-qa3-burst-b {
  0%, 89% { opacity: 0; }
  90% { opacity: 1; clip-path: inset(60% 0 10% 0); transform: translate(3px, 0); }
  93% { opacity: 1; clip-path: inset(8% 0 66% 0); transform: translate(-3px, 0); }
  96% { opacity: 1; clip-path: inset(42% 0 28% 0); transform: translate(2px, 0); }
  98%, 100% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qa3 { transition: none; }
  .hb-qa3 .hb-qa3-t, .hb-qa3 .hb-qa3-r, .hb-qa3 .hb-qa3-b { animation: none !important; }
  .hb-qa3:hover:not(:disabled) .hb-qa3-r, .hb-qa3:focus-visible:not(:disabled) .hb-qa3-r { opacity: 0.7; transform: translate(-2px, 0); }
  .hb-qa3:hover:not(:disabled) .hb-qa3-b, .hb-qa3:focus-visible:not(:disabled) .hb-qa3-b { opacity: 0.7; transform: translate(2px, 0); }
  .hb-qa3:active:not(:disabled) { transform: none; }
  .hb-qa3-sp { animation-duration: 1.6s; }
}
`;

export function ButtonGlitchHover({
  children = "Reconnect",
  variant = "outline",
  accent = "#2f7bff",
  size = "md",
  loading = false,
  disabled = false,
  idle = true,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonGlitchHoverProps) {
  const vars = { "--hb-qa3-c": accent, ...style } as React.CSSProperties;
  const label = (
    <>
      {loading ? <span className="hb-qa3-sp" aria-hidden="true" /> : null}
      {children}
    </>
  );

  return (
    <>
      <style href="hb-button-glitch-hover" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-qa3 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        data-idle={idle ? "true" : "false"}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...rest}
      >
        <span className="hb-qa3-t">{label}</span>
        <span className="hb-qa3-r" aria-hidden="true">{label}</span>
        <span className="hb-qa3-b" aria-hidden="true">{label}</span>
      </button>
    </>
  );
}
