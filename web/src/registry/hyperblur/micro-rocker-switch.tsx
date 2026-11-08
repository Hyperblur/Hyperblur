"use client";

import * as React from "react";

export interface MicroRockerSwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "role" | "children"> {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: string;
  onLabel?: string;
  offLabel?: string;
  showStatus?: boolean;
  size?: number;
  accent?: string;
  onChange?: (checked: boolean) => void;
}

const css = `
.hb-wf1 {
  --hb-wf1-c: #ff6a3d;
  --hb-wf1-s: 56px;
  --hb-wf1-r: -13deg;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: inherit;
  color: #ededed;
  background: none;
  border: 0;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-wf1 *, .hb-wf1 *::before, .hb-wf1 *::after { box-sizing: border-box; }
.hb-wf1:focus-visible { outline: none; }
.hb-wf1:focus-visible .hb-wf1-bz { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-wf1-c), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -3px 8px rgba(0,0,0,0.7); }
.hb-wf1:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-wf1[data-on="true"] { --hb-wf1-r: 13deg; }
.hb-wf1[data-press="l"] { --hb-wf1-r: -17deg; }
.hb-wf1[data-press="r"] { --hb-wf1-r: 17deg; }
.hb-wf1-bz {
  position: relative;
  flex: none;
  width: calc(var(--hb-wf1-s) * 1.78);
  height: var(--hb-wf1-s);
  padding: calc(var(--hb-wf1-s) * 0.1);
  border-radius: calc(var(--hb-wf1-s) * 0.24);
  background: linear-gradient(180deg, #1d1d1f 0%, #0c0c0d 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -3px 8px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04), 0 10px 22px -8px rgba(0,0,0,0.9);
  perspective: calc(var(--hb-wf1-s) * 4.2);
  transition: box-shadow 0.2s ease;
}
.hb-wf1-bz::before {
  content: "";
  position: absolute;
  inset: calc(var(--hb-wf1-s) * 0.07);
  border-radius: calc(var(--hb-wf1-s) * 0.17);
  background: #050505;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.9);
}
.hb-wf1-p {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
  border-radius: calc(var(--hb-wf1-s) * 0.13);
  transform: rotateY(var(--hb-wf1-r));
  transform-style: preserve-3d;
  transition: transform 0.34s cubic-bezier(0.3, 1.7, 0.45, 1);
  overflow: hidden;
  box-shadow: 0 2px 0 rgba(0,0,0,0.6), 0 6px 10px -4px rgba(0,0,0,0.8);
}
.hb-wf1-h {
  position: relative;
  display: grid;
  place-items: center;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.hb-wf1-h[data-side="l"] { background: linear-gradient(90deg, #3a3a3d 0%, #2c2c2f 100%); box-shadow: inset 1px 1px 0 rgba(255,255,255,0.12); }
.hb-wf1-h[data-side="r"] { background: linear-gradient(90deg, #1a1a1c 0%, #141416 100%); box-shadow: inset -1px 0 0 rgba(0,0,0,0.4); }
.hb-wf1[data-on="true"] .hb-wf1-h[data-side="l"] { background: linear-gradient(90deg, #141416 0%, #1a1a1c 100%); box-shadow: inset 1px 0 0 rgba(0,0,0,0.4); }
.hb-wf1[data-on="true"] .hb-wf1-h[data-side="r"] { background: linear-gradient(90deg, #2c2c2f 0%, #3a3a3d 100%); box-shadow: inset -1px 1px 0 rgba(255,255,255,0.12); }
.hb-wf1-h + .hb-wf1-h { border-left: 1px solid rgba(0,0,0,0.55); }
.hb-wf1-o {
  width: calc(var(--hb-wf1-s) * 0.24);
  height: calc(var(--hb-wf1-s) * 0.24);
  border-radius: 50%;
  border: calc(var(--hb-wf1-s) * 0.04) solid #9a9a9e;
  transition: border-color 0.3s ease;
}
.hb-wf1-i {
  width: calc(var(--hb-wf1-s) * 0.045);
  height: calc(var(--hb-wf1-s) * 0.28);
  border-radius: 2px;
  background: #6a6a6e;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.hb-wf1[data-on="true"] .hb-wf1-o { border-color: #4a4a4e; }
.hb-wf1[data-on="true"] .hb-wf1-i { background: var(--hb-wf1-c); box-shadow: 0 0 10px var(--hb-wf1-c), 0 0 2px var(--hb-wf1-c); }
.hb-wf1-sh {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 38%, rgba(0,0,0,0.25) 100%);
}
.hb-wf1-st {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  line-height: 1;
}
.hb-wf1-lb { font-size: 13px; font-weight: 600; letter-spacing: -0.01em; color: #ededed; }
.hb-wf1-row { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: #7a7a7a; transition: color 0.3s ease; }
.hb-wf1-led {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2a2a2a;
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.8);
  transition: background 0.25s ease, box-shadow 0.25s ease;
}
.hb-wf1[data-on="true"] .hb-wf1-row { color: #d6d6d6; }
.hb-wf1[data-on="true"] .hb-wf1-led { background: var(--hb-wf1-c); box-shadow: 0 0 0 2px color-mix(in srgb, var(--hb-wf1-c) 22%, transparent), 0 0 12px var(--hb-wf1-c); animation: hb-wf1-flick 0.42s steps(1, end); }
@keyframes hb-wf1-flick {
  0% { opacity: 0.3; }
  20% { opacity: 1; }
  35% { opacity: 0.5; }
  55% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wf1-p, .hb-wf1-h, .hb-wf1-i, .hb-wf1-led, .hb-wf1-o, .hb-wf1-row { transition: none; animation: none; }
  .hb-wf1[data-on="true"] .hb-wf1-led { animation: none; }
}
`;

export function MicroRockerSwitch({
  checked,
  defaultChecked = false,
  label = "Power",
  onLabel = "On",
  offLabel = "Off",
  showStatus = true,
  size = 56,
  accent = "#ff6a3d",
  disabled,
  onChange,
  className = "",
  style,
  onClick,
  onKeyDown,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  ...rest
}: MicroRockerSwitchProps) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked ?? inner;
  const [press, setPress] = React.useState<"" | "l" | "r">("");
  const paddleRef = React.useRef<HTMLSpanElement>(null);

  const set = (next: boolean) => {
    if (disabled || next === on) return;
    if (checked === undefined) setInner(next);
    onChange?.(next);
  };

  const sideOf = (clientX: number): "l" | "r" | "" => {
    const el = paddleRef.current;
    if (!el) return "";
    const r = el.getBoundingClientRect();
    if (clientX < r.left || clientX > r.right) return "";
    return clientX - r.left < r.width / 2 ? "l" : "r";
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={showStatus ? undefined : label}
      disabled={disabled}
      data-on={on}
      data-press={press}
      className={`hb-wf1 ${className}`}
      style={{ ...style, ["--hb-wf1-c" as string]: accent, ["--hb-wf1-s" as string]: `${size}px` }}
      onPointerDown={(e) => {
        onPointerDown?.(e);
        if (disabled) return;
        const s = sideOf(e.clientX);
        if (s) setPress(s);
      }}
      onPointerUp={(e) => {
        onPointerUp?.(e);
        setPress("");
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setPress("");
      }}
      onPointerCancel={(e) => {
        onPointerCancel?.(e);
        setPress("");
      }}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        const s = e.detail === 0 ? "" : sideOf(e.clientX);
        if (s === "") set(!on);
        else set(s === "r");
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "ArrowRight") {
          e.preventDefault();
          set(true);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          set(false);
        }
      }}
      {...rest}
    >
      <style href="hb-micro-rocker-switch" precedence="default">
        {css}
      </style>
      <span className="hb-wf1-bz" aria-hidden="true">
        <span ref={paddleRef} className="hb-wf1-p">
          <span className="hb-wf1-h" data-side="l">
            <span className="hb-wf1-o" />
          </span>
          <span className="hb-wf1-h" data-side="r">
            <span className="hb-wf1-i" />
          </span>
          <span className="hb-wf1-sh" />
        </span>
      </span>
      {showStatus ? (
        <span className="hb-wf1-st">
          <span className="hb-wf1-lb">{label}</span>
          <span className="hb-wf1-row">
            <span key={on ? "on" : "off"} className="hb-wf1-led" />
            {on ? onLabel : offLabel}
          </span>
        </span>
      ) : null}
    </button>
  );
}
