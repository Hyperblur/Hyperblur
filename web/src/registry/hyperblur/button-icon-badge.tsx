"use client";

import * as React from "react";

export interface ButtonIconBadgeProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  count?: number;
  defaultCount?: number;
  onCountChange?: (count: number) => void;
  max?: number;
  dot?: boolean;
  clearOnClick?: boolean;
  label?: string;
  icon?: React.ReactNode;
  shape?: "square" | "circle";
  badgeColor?: string;
  ringColor?: string;
  accent?: string;
}

const css = `
.hb-xb9 {
  --hb-xb9-c: #2f7bff;
  --hb-xb9-b: #ff3b4e;
  --hb-xb9-r: #0a0a0a;
  position: relative;
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  width: 42px;
  height: 42px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 12px;
  color: #d4d4d4;
  font: inherit;
  cursor: pointer;
  background: linear-gradient(180deg, #1c1c1c, #141414);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), inset 0 0 0 1px #2a2a2a, 0 6px 14px -8px rgba(0, 0, 0, 0.9);
  -webkit-tap-highlight-color: transparent;
  transition: color 0.2s ease, box-shadow 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s ease;
}
.hb-xb9 *, .hb-xb9 *::before, .hb-xb9 *::after { box-sizing: border-box; }
.hb-xb9[data-shape="circle"] { border-radius: 50%; }
.hb-xb9:hover:not(:disabled) { color: #fff; background: linear-gradient(180deg, #222, #181818); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.09), inset 0 0 0 1px #363636, 0 8px 18px -8px rgba(0, 0, 0, 0.9); }
.hb-xb9:active:not(:disabled) { transform: scale(0.92); }
.hb-xb9:focus-visible { outline: 2px solid var(--hb-xb9-c); outline-offset: 3px; }
.hb-xb9:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xb9-ic { display: grid; place-items: center; transform-origin: 50% 12%; }
.hb-xb9-ic[data-ring="true"] { animation: hb-xb9-swing 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xb9-ic svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.hb-xb9-badge {
  position: absolute;
  top: -5px;
  right: -6px;
  min-width: 19px;
  height: 19px;
  padding: 0 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xb9-b) 80%, #fff) 0%, var(--hb-xb9-b) 55%, color-mix(in srgb, var(--hb-xb9-b) 85%, #000) 100%);
  box-shadow: 0 0 0 2.5px var(--hb-xb9-r), 0 4px 10px -2px color-mix(in srgb, var(--hb-xb9-b) 60%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  overflow: hidden;
  transform: scale(1);
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease, translate 0.45s cubic-bezier(0.55, 0, 0.3, 1);
  pointer-events: none;
}
.hb-xb9-badge[data-dot="true"] { min-width: 10px; width: 10px; height: 10px; padding: 0; top: 7px; right: 7px; }
.hb-xb9[data-shape="circle"] .hb-xb9-badge[data-dot="true"] { top: 6px; right: 6px; }
.hb-xb9-badge[data-hidden="true"] { transform: scale(0); opacity: 0; translate: 0 4px; }
.hb-xb9-badge[data-bump="true"] { animation: hb-xb9-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xb9-n { display: inline-block; animation: hb-xb9-roll 0.38s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xb9-ping { position: absolute; top: -5px; right: -6px; width: 19px; height: 19px; border-radius: 999px; border: 2px solid var(--hb-xb9-b); opacity: 0; pointer-events: none; }
.hb-xb9-ping[data-dot="true"] { width: 10px; height: 10px; top: 7px; right: 7px; }
.hb-xb9-ping[data-on="true"] { animation: hb-xb9-ping 0.9s cubic-bezier(0.22, 1, 0.36, 1); }
@keyframes hb-xb9-swing { 0% { transform: rotate(0); } 15% { transform: rotate(16deg); } 32% { transform: rotate(-13deg); } 48% { transform: rotate(9deg); } 64% { transform: rotate(-5deg); } 80% { transform: rotate(2deg); } 100% { transform: rotate(0); } }
@keyframes hb-xb9-pop { 0% { transform: scale(1); } 35% { transform: scale(1.35); } 100% { transform: scale(1); } }
@keyframes hb-xb9-roll { from { transform: translateY(105%); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes hb-xb9-ping { 0% { opacity: 0.85; transform: scale(1); } 100% { opacity: 0; transform: scale(2.1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xb9, .hb-xb9 * { transition-duration: 0.01s !important; animation: none !important; }
}
`;

const bell = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15zM10 20.5a2.2 2.2 0 0 0 4 0" />
  </svg>
);

export function ButtonIconBadge({
  count,
  defaultCount = 3,
  onCountChange,
  max = 99,
  dot = false,
  clearOnClick = true,
  label = "Notifications",
  icon = bell,
  shape = "square",
  badgeColor = "#ff3b4e",
  ringColor = "#0a0a0a",
  accent = "#2f7bff",
  disabled = false,
  type = "button",
  className = "",
  style,
  onClick,
  ...rest
}: ButtonIconBadgeProps) {
  const [inner, setInner] = React.useState(defaultCount);
  const value = Math.max(0, count ?? inner);
  const [seen, setSeen] = React.useState(value);
  const [bump, setBump] = React.useState(0);
  if (value !== seen) {
    if (value > seen) setBump((b) => b + 1);
    setSeen(value);
  }
  const text = value > max ? `${max}+` : String(value);
  const hidden = value === 0;
  const [shown, setShown] = React.useState(hidden ? "1" : text);
  if (!hidden && shown !== text) setShown(text);

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={hidden ? label : `${label}, ${value} unread`}
      className={`hb-xb9 ${className}`.trim()}
      data-shape={shape}
      style={{ "--hb-xb9-c": accent, "--hb-xb9-b": badgeColor, "--hb-xb9-r": ringColor, ...style } as React.CSSProperties}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !clearOnClick || value === 0) return;
        if (count === undefined) setInner(0);
        onCountChange?.(0);
      }}
      {...rest}
    >
      <style href="hb-button-icon-badge" precedence="default">{css}</style>
      <span key={`i${bump}`} className="hb-xb9-ic" data-ring={bump > 0 ? "true" : "false"} aria-hidden="true">
        {icon}
      </span>
      <span key={`p${bump}`} className="hb-xb9-ping" data-on={bump > 0 && !hidden ? "true" : "false"} data-dot={dot ? "true" : "false"} aria-hidden="true" />
      <span key={`b${bump}`} className="hb-xb9-badge" data-hidden={hidden ? "true" : "false"} data-dot={dot ? "true" : "false"} data-bump={bump > 0 ? "true" : "false"} aria-hidden="true">
        {!dot && (
          <span key={shown} className="hb-xb9-n">
            {shown}
          </span>
        )}
      </span>
    </button>
  );
}
