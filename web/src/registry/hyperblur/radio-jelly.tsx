"use client";

import * as React from "react";

export interface RadioJellyOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioJellyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: RadioJellyOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  accent?: string;
  size?: number;
  direction?: "vertical" | "horizontal";
  disabled?: boolean;
}

const css = `
.hb-qr5 {
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
}
.hb-qr5[data-direction="horizontal"] {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px 12px;
}
.hb-qr5-o {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 8px 10px;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.2s ease;
}
.hb-qr5-o:hover { background: rgba(255, 255, 255, 0.04); }
.hb-qr5-o[data-disabled="true"] { opacity: 0.45; cursor: not-allowed; }
.hb-qr5-o[data-disabled="true"]:hover { background: transparent; }
.hb-qr5-i {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  opacity: 0;
  pointer-events: none;
}
.hb-qr5-r {
  position: relative;
  flex: none;
  width: var(--hb-qr5-z);
  height: var(--hb-qr5-z);
  box-sizing: border-box;
  border: 2px solid #3a3a3a;
  border-radius: 50%;
  background: #0f0f0f;
  display: grid;
  place-items: center;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.hb-qr5-o:hover .hb-qr5-r { border-color: #5a5a5a; }
.hb-qr5-i:focus-visible ~ .hb-qr5-r {
  outline: 2px solid var(--hb-qr5-a);
  outline-offset: 3px;
}
.hb-qr5-d {
  width: 56%;
  height: 56%;
  border-radius: 50%;
  background: radial-gradient(circle at 34% 28%, color-mix(in srgb, var(--hb-qr5-a) 35%, #ffffff) 0%, var(--hb-qr5-a) 55%);
  transform: scale(0);
  opacity: 0;
  transition: transform 0.16s ease, opacity 0.16s ease;
}
.hb-qr5-o[data-checked="true"] .hb-qr5-r {
  border-color: var(--hb-qr5-a);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-qr5-a) 16%, transparent);
  animation: hb-qr5-ring 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-qr5-o[data-checked="true"] .hb-qr5-d {
  opacity: 1;
  animation: hb-qr5-jelly 0.85s linear both;
}
.hb-qr5-t {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 1px;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-qr5-o[data-checked="true"] .hb-qr5-t { transform: translateX(3px); }
.hb-qr5-l {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  color: #bdbdbd;
  transition: color 0.2s ease;
}
.hb-qr5-o[data-checked="true"] .hb-qr5-l { color: #ffffff; }
.hb-qr5-x {
  font-size: 12px;
  line-height: 1.35;
  color: #8f8f8f;
}
@keyframes hb-qr5-jelly {
  0% { transform: scale(0, 0); }
  18% { transform: scale(1.5, 0.62); }
  34% { transform: scale(0.76, 1.34); }
  50% { transform: scale(1.18, 0.88); }
  66% { transform: scale(0.94, 1.07); }
  82% { transform: scale(1.03, 0.98); }
  100% { transform: scale(1, 1); }
}
@keyframes hb-qr5-ring {
  0% { transform: scale(1); }
  25% { transform: scale(0.88, 1.1); }
  50% { transform: scale(1.1, 0.92); }
  75% { transform: scale(0.97, 1.03); }
  100% { transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qr5-o, .hb-qr5-r, .hb-qr5-d, .hb-qr5-t, .hb-qr5-l { transition: none; }
  .hb-qr5-o[data-checked="true"] .hb-qr5-r,
  .hb-qr5-o[data-checked="true"] .hb-qr5-d { animation: none; transform: none; }
  .hb-qr5-o[data-checked="true"] .hb-qr5-t { transform: none; }
}
`;

export function RadioJelly({
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  accent = "#2f7bff",
  size = 22,
  direction = "vertical",
  disabled = false,
  className = "",
  style,
  ...rest
}: RadioJellyProps) {
  const autoName = React.useId();
  const groupName = name ?? autoName;
  const [inner, setInner] = React.useState<string | undefined>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;

  function pick(next: string) {
    if (!controlled) setInner(next);
    if (next !== current) onValueChange?.(next);
  }

  return (
    <div
      role="radiogroup"
      data-direction={direction}
      className={`hb-qr5 ${className}`.trim()}
      style={
        {
          ["--hb-qr5-a" as string]: accent,
          ["--hb-qr5-z" as string]: `${size}px`,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-radio-jelly" precedence="default">
        {css}
      </style>
      {options.map((option) => {
        const off = disabled || option.disabled === true;
        const checked = current === option.value;
        return (
          <label
            key={option.value}
            className="hb-qr5-o"
            data-checked={checked ? "true" : "false"}
            data-disabled={off ? "true" : "false"}
          >
            <input
              type="radio"
              className="hb-qr5-i"
              name={groupName}
              value={option.value}
              checked={checked}
              disabled={off}
              onChange={() => pick(option.value)}
            />
            <span className="hb-qr5-r" aria-hidden="true">
              <span className="hb-qr5-d" />
            </span>
            <span className="hb-qr5-t">
              <span className="hb-qr5-l">{option.label}</span>
              {option.description ? <span className="hb-qr5-x">{option.description}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
