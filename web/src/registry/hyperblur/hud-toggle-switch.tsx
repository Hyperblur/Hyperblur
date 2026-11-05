"use client";

import * as React from "react";

export interface HudToggleSwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value" | "defaultValue"> {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  onLabel?: string;
  offLabel?: string;
  accent?: string;
}

const css = `
.hb-uaa {
  --hb-uaa-accent: #ff4d4d;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  margin: 0;
  padding: 0 10px;
  overflow: visible;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 0;
  background: rgba(255,255,255,.025);
  color: #a1a1a1;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: border-color .2s ease, background-color .2s ease, color .2s ease, transform .1s ease, box-shadow .25s ease;
}
.hb-uaa *, .hb-uaa *::before, .hb-uaa *::after { box-sizing: border-box; }
.hb-uaa:hover { border-color: rgba(255,255,255,.22); color: #ededed; }
.hb-uaa:active { transform: scale(.96); }
.hb-uaa:focus-visible { outline: 1px solid #ededed; outline-offset: 3px; }
.hb-uaa:disabled { opacity: .4; cursor: not-allowed; }
.hb-uaa::before, .hb-uaa::after {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  border: 0 solid rgba(255,255,255,.45);
  pointer-events: none;
  transition: border-color .2s ease;
}
.hb-uaa::before { left: -1px; top: -1px; border-left-width: 1px; border-top-width: 1px; }
.hb-uaa::after { right: -1px; bottom: -1px; border-right-width: 1px; border-bottom-width: 1px; }
.hb-uaa[aria-checked="true"] {
  color: #ededed;
  border-color: color-mix(in srgb, var(--hb-uaa-accent) 50%, transparent);
  background: color-mix(in srgb, var(--hb-uaa-accent) 9%, transparent);
  box-shadow: 0 0 14px -6px var(--hb-uaa-accent);
}
.hb-uaa[aria-checked="true"]::before, .hb-uaa[aria-checked="true"]::after { border-color: var(--hb-uaa-accent); }
.hb-uaa-dot {
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  border: 1px solid #5f5f5f;
  transition: background-color .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.hb-uaa[aria-checked="true"] .hb-uaa-dot { background: var(--hb-uaa-accent); border-color: var(--hb-uaa-accent); box-shadow: 0 0 8px var(--hb-uaa-accent); }
.hb-uaa-sep { width: 1px; height: 10px; background: rgba(255,255,255,.14); }
.hb-uaa-state { position: relative; display: inline-grid; min-width: 3ch; text-align: left; }
.hb-uaa-state span { grid-area: 1 / 1; transition: opacity .18s ease, transform .22s cubic-bezier(.2, .8, .2, 1); }
.hb-uaa-state span:first-child { opacity: 0; transform: translateY(-60%); }
.hb-uaa[aria-checked="true"] .hb-uaa-state span:first-child { opacity: 1; transform: none; color: var(--hb-uaa-accent); }
.hb-uaa[aria-checked="true"] .hb-uaa-state span:last-child { opacity: 0; transform: translateY(60%); }
.hb-uaa-flash {
  position: absolute;
  inset: -1px;
  pointer-events: none;
  border: 1px solid var(--hb-uaa-accent);
  opacity: 0;
  animation: hb-uaa-flash .45s ease-out;
}
@keyframes hb-uaa-flash {
  0% { opacity: .9; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.18, 1.5); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-uaa, .hb-uaa::before, .hb-uaa::after, .hb-uaa-dot, .hb-uaa-state span { transition: none; }
  .hb-uaa-flash { display: none; }
}
`;

export function HudToggleSwitch({
  label = "Snd",
  checked,
  defaultChecked = true,
  onChange,
  onLabel = "On",
  offLabel = "Off",
  accent = "#ff4d4d",
  className,
  style,
  onClick,
  ...rest
}: HudToggleSwitchProps) {
  const [inner, setInner] = React.useState(defaultChecked);
  const [pulse, setPulse] = React.useState(0);
  const on = checked ?? inner;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={`${label} ${on ? onLabel : offLabel}`}
      className={["hb-uaa", className].filter(Boolean).join(" ")}
      style={{ ["--hb-uaa-accent" as string]: accent, ...style }}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        const next = !on;
        if (checked === undefined) setInner(next);
        setPulse((p) => p + 1);
        onChange?.(next);
      }}
      {...rest}
    >
      <style href="hb-hud-toggle-switch" precedence="default">{css}</style>
      <span className="hb-uaa-dot" aria-hidden="true" />
      <span aria-hidden="true">{label}</span>
      <span className="hb-uaa-sep" aria-hidden="true" />
      <span className="hb-uaa-state" aria-hidden="true">
        <span>{onLabel}</span>
        <span>{offLabel}</span>
      </span>
      {pulse ? <span key={pulse} className="hb-uaa-flash" aria-hidden="true" /> : null}
    </button>
  );
}

export default HudToggleSwitch;
