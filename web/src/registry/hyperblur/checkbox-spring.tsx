"use client";

import * as React from "react";

export interface CheckboxSpringProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange" | "defaultChecked"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  accent?: string;
  size?: number;
  disabled?: boolean;
  name?: string;
  value?: string;
}

const css = `
.hb-qr6 {
  display: inline-flex;
  align-items: flex-start;
  gap: 10px;
  position: relative;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-qr6[data-disabled="true"] { opacity: 0.45; cursor: not-allowed; }
.hb-qr6-i {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  opacity: 0;
  pointer-events: none;
}
.hb-qr6-b {
  flex: none;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  border: 1.5px solid #3d3d3d;
  border-radius: 28%;
  background: #0f0f0f;
  color: #ffffff;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-qr6:not([data-disabled="true"]):hover .hb-qr6-b { border-color: #6a6a6a; }
.hb-qr6:not([data-disabled="true"]):active .hb-qr6-b { transform: scale(0.86); }
.hb-qr6-i:focus-visible ~ .hb-qr6-b {
  outline: 2px solid var(--hb-qr6-a);
  outline-offset: 3px;
}
.hb-qr6[data-state="on"] .hb-qr6-b {
  background: var(--hb-qr6-a);
  border-color: var(--hb-qr6-a);
  animation: hb-qr6-pop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
}
.hb-qr6[data-state="mixed"] .hb-qr6-b {
  background: var(--hb-qr6-a);
  border-color: var(--hb-qr6-a);
  animation: hb-qr6-pop2 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
}
.hb-qr6-s {
  width: 76%;
  height: 76%;
  overflow: visible;
  fill: none;
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transform: scale(0.4);
  transition: opacity 0.14s ease, transform 0.14s ease;
}
.hb-qr6-c,
.hb-qr6-m {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.28s ease 0.1s;
}
.hb-qr6[data-state="on"] .hb-qr6-s {
  opacity: 1;
  transform: scale(1);
  animation: hb-qr6-bounce 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.08s backwards;
}
.hb-qr6[data-state="on"] .hb-qr6-c { stroke-dashoffset: 0; }
.hb-qr6[data-state="mixed"] .hb-qr6-s {
  opacity: 1;
  transform: scale(1);
  animation: hb-qr6-bounce2 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.08s backwards;
}
.hb-qr6[data-state="mixed"] .hb-qr6-m { stroke-dashoffset: 0; }
.hb-qr6-t {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 1px;
}
.hb-qr6-l {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
}
.hb-qr6-x {
  font-size: 12px;
  line-height: 1.35;
  color: #8f8f8f;
}
@keyframes hb-qr6-pop {
  0% { transform: scale(0.78); }
  30% { transform: scale(1.26); }
  50% { transform: scale(0.9); }
  70% { transform: scale(1.07); }
  100% { transform: scale(1); }
}
@keyframes hb-qr6-pop2 {
  0% { transform: scale(0.78); }
  30% { transform: scale(1.26); }
  50% { transform: scale(0.9); }
  70% { transform: scale(1.07); }
  100% { transform: scale(1); }
}
@keyframes hb-qr6-bounce {
  0% { transform: scale(0) rotate(-14deg); }
  45% { transform: scale(1.4) rotate(6deg); }
  65% { transform: scale(0.82) rotate(-3deg); }
  82% { transform: scale(1.1) rotate(0); }
  100% { transform: scale(1) rotate(0); }
}
@keyframes hb-qr6-bounce2 {
  0% { transform: scale(0) rotate(-14deg); }
  45% { transform: scale(1.4) rotate(6deg); }
  65% { transform: scale(0.82) rotate(-3deg); }
  82% { transform: scale(1.1) rotate(0); }
  100% { transform: scale(1) rotate(0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qr6-b, .hb-qr6-s, .hb-qr6-c, .hb-qr6-m { transition: none; }
  .hb-qr6[data-state="on"] .hb-qr6-b,
  .hb-qr6[data-state="mixed"] .hb-qr6-b,
  .hb-qr6[data-state="on"] .hb-qr6-s,
  .hb-qr6[data-state="mixed"] .hb-qr6-s { animation: none; }
  .hb-qr6:not([data-disabled="true"]):active .hb-qr6-b { transform: none; }
}
`;

export function CheckboxSpring({
  checked,
  defaultChecked = false,
  onCheckedChange,
  indeterminate = false,
  label,
  description,
  accent = "#2f7bff",
  size = 22,
  disabled = false,
  name,
  value,
  className = "",
  style,
  ...rest
}: CheckboxSpringProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inner, setInner] = React.useState(defaultChecked);
  const controlled = checked !== undefined;
  const on = controlled ? checked : inner;
  const state = indeterminate ? "mixed" : on ? "on" : "off";

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      data-state={state}
      data-disabled={disabled ? "true" : "false"}
      className={`hb-qr6 ${className}`.trim()}
      style={{ ["--hb-qr6-a" as string]: accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-checkbox-spring" precedence="default">
        {css}
      </style>
      <input
        ref={inputRef}
        type="checkbox"
        className="hb-qr6-i"
        name={name}
        value={value}
        checked={on}
        disabled={disabled}
        onChange={(e) => {
          const next = e.target.checked;
          if (!controlled) setInner(next);
          onCheckedChange?.(next);
        }}
      />
      <span className="hb-qr6-b" aria-hidden="true" style={{ width: size, height: size }}>
        <svg className="hb-qr6-s" viewBox="0 0 24 24">
          <path className="hb-qr6-c" d="M5.5 12.8 10 17.2 18.5 7" pathLength={1} />
          <path className="hb-qr6-m" d="M6 12h12" pathLength={1} />
        </svg>
      </span>
      {label || description ? (
        <span className="hb-qr6-t">
          {label ? <span className="hb-qr6-l">{label}</span> : null}
          {description ? <span className="hb-qr6-x">{description}</span> : null}
        </span>
      ) : null}
    </label>
  );
}
