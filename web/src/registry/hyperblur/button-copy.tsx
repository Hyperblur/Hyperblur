"use client";

import * as React from "react";

export interface ButtonCopyProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "value"> {
  value?: string;
  copiedLabel?: React.ReactNode;
  resetAfter?: number;
  onCopied?: (value: string) => void;
  variant?: "outline" | "solid" | "ghost";
  accent?: string;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-qa8 {
  --hb-qa8-c: #2f7bff;
  --hb-qa8-bg: #141414;
  --hb-qa8-fg: #ededed;
  --hb-qa8-ring: #2a2a2a;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55em;
  box-sizing: border-box;
  margin: 0;
  padding: 0.55em 0.95em 0.55em 0.8em;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--hb-qa8-fg);
  background: var(--hb-qa8-bg);
  border: 0;
  border-radius: 9px;
  box-shadow: inset 0 0 0 1px var(--hb-qa8-ring);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
}
.hb-qa8[data-size="sm"] { font-size: 12px; }
.hb-qa8[data-size="lg"] { font-size: 16px; }
.hb-qa8[data-variant="solid"] {
  --hb-qa8-bg: var(--hb-qa8-c);
  --hb-qa8-fg: #ffffff;
  --hb-qa8-ring: transparent;
}
.hb-qa8[data-variant="ghost"] {
  --hb-qa8-bg: transparent;
  --hb-qa8-ring: transparent;
  --hb-qa8-fg: #a1a1a1;
}
.hb-qa8:hover:not(:disabled) { --hb-qa8-ring: color-mix(in srgb, var(--hb-qa8-c) 60%, #2a2a2a); }
.hb-qa8[data-variant="ghost"]:hover:not(:disabled) { --hb-qa8-bg: rgba(255, 255, 255, 0.06); --hb-qa8-fg: #ededed; }
.hb-qa8[data-variant="solid"]:hover:not(:disabled) { filter: brightness(1.1); }
.hb-qa8[data-copied="true"] {
  --hb-qa8-fg: #4ade80;
  --hb-qa8-ring: color-mix(in srgb, #4ade80 45%, transparent);
}
.hb-qa8[data-variant="solid"][data-copied="true"] { --hb-qa8-bg: #16a34a; --hb-qa8-fg: #ffffff; }
.hb-qa8-i {
  position: relative;
  width: 1.15em;
  height: 1.15em;
  flex: none;
}
.hb-qa8-g {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: opacity 0.2s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-qa8-ck { opacity: 0; transform: scale(0.4) rotate(-20deg); stroke-dasharray: 24; stroke-dashoffset: 24; }
.hb-qa8[data-copied="true"] .hb-qa8-cp { opacity: 0; transform: scale(0.4) rotate(20deg); }
.hb-qa8[data-copied="true"] .hb-qa8-ck {
  opacity: 1;
  transform: none;
  animation: hb-qa8-draw 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.08s forwards;
}
.hb-qa8:not([data-copied="true"]):not(:hover):not(:disabled) .hb-qa8-cp { animation: hb-qa8-nudge 5s ease-in-out 1.5s infinite; }
.hb-qa8-w {
  position: relative;
  display: grid;
  overflow: hidden;
  height: 1.3em;
  line-height: 1.3;
}
.hb-qa8-a, .hb-qa8-b {
  grid-area: 1 / 1;
  white-space: nowrap;
  text-align: left;
  transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease;
}
.hb-qa8-b { transform: translateY(110%); opacity: 0; }
.hb-qa8[data-copied="true"] .hb-qa8-a { transform: translateY(-110%); opacity: 0; }
.hb-qa8[data-copied="true"] .hb-qa8-b { transform: none; opacity: 1; }
.hb-qa8:active:not(:disabled) { transform: scale(0.96); }
.hb-qa8:focus-visible { outline: 2px solid var(--hb-qa8-c); outline-offset: 3px; }
.hb-qa8:disabled { opacity: 0.45; cursor: not-allowed; }
@keyframes hb-qa8-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-qa8-nudge {
  0%, 84%, 100% { transform: none; }
  90% { transform: translateY(-1.5px) rotate(-6deg); }
  95% { transform: translateY(0) rotate(4deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qa8, .hb-qa8-g, .hb-qa8-a, .hb-qa8-b { transition-duration: 0.01s; }
  .hb-qa8 .hb-qa8-cp { animation: none !important; }
  .hb-qa8[data-copied="true"] .hb-qa8-ck { animation: none; stroke-dashoffset: 0; }
  .hb-qa8:active:not(:disabled) { transform: none; }
}
`;

function fallbackCopy(text: string) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  area.style.pointerEvents = "none";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(area);
  return ok;
}

export function ButtonCopy({
  children = "Copy",
  copiedLabel = "Copied",
  value = "npx shadcn@latest add https://hyperblur.dev/r/button-copy.json",
  resetAfter = 1600,
  onCopied,
  onClick,
  variant = "outline",
  accent = "#2f7bff",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonCopyProps) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef(0);

  React.useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      ok = fallbackCopy(value);
    }
    if (!ok) return;
    onCopied?.(value);
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), Math.max(0, resetAfter));
  }

  const vars = { "--hb-qa8-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-copy" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-qa8 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        data-copied={copied ? "true" : "false"}
        disabled={disabled}
        aria-live="polite"
        onClick={handleClick}
        {...rest}
      >
        <span className="hb-qa8-i" aria-hidden="true">
          <svg className="hb-qa8-g hb-qa8-cp" viewBox="0 0 24 24" focusable="false">
            <rect x="9" y="9" width="11" height="11" rx="2.5" />
            <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
          </svg>
          <svg className="hb-qa8-g hb-qa8-ck" viewBox="0 0 24 24" focusable="false">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <span className="hb-qa8-w">
          <span className="hb-qa8-a" aria-hidden={copied || undefined}>{children}</span>
          <span className="hb-qa8-b" aria-hidden={copied ? undefined : true}>{copiedLabel}</span>
        </span>
      </button>
    </>
  );
}
