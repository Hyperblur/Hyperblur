"use client";

import * as React from "react";

export interface ToggleGooeyProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange" | "children" | "defaultChecked"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: number;
  label?: string;
  accent?: string;
  disabled?: boolean;
  name?: string;
}

const css = `
.hb-qn2 {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  flex: none;
  width: calc(var(--hb-qn2-h) * 1.75);
  height: var(--hb-qn2-h);
  margin: 0;
  font: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hb-qn2 *, .hb-qn2 *::before, .hb-qn2 *::after { box-sizing: border-box; }
.hb-qn2[data-disabled="true"] { opacity: 0.5; cursor: not-allowed; }
.hb-qn2-in {
  position: absolute;
  inset: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}
.hb-qn2-track {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #262626;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transition: background 0.4s ease, box-shadow 0.4s ease;
}
.hb-qn2-in:checked ~ .hb-qn2-track {
  background: var(--hb-qn2-a);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18), 0 0 18px -4px var(--hb-qn2-a);
}
.hb-qn2-in:focus-visible ~ .hb-qn2-track { outline: 2px solid var(--hb-qn2-a); outline-offset: 3px; }
.hb-qn2-goo {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.hb-qn2-a, .hb-qn2-b {
  position: absolute;
  top: calc(var(--hb-qn2-h) * 0.125);
  left: calc(var(--hb-qn2-h) * 0.125);
  width: calc(var(--hb-qn2-h) * 0.75);
  height: calc(var(--hb-qn2-h) * 0.75);
  border-radius: 50%;
  background: #fff;
  transform: translateX(0);
}
.hb-qn2-a { transition: transform 0.26s cubic-bezier(0.2, 0.8, 0.3, 1), scale 0.2s ease; }
.hb-qn2-b { transition: transform 0.5s cubic-bezier(0.5, 0, 0.2, 1), scale 0.2s ease; }
.hb-qn2-in:checked ~ .hb-qn2-goo .hb-qn2-a,
.hb-qn2-in:checked ~ .hb-qn2-goo .hb-qn2-b { transform: translateX(calc(var(--hb-qn2-h) * 0.75)); }
.hb-qn2:active .hb-qn2-a { scale: 1.1 0.92; }
.hb-qn2:active .hb-qn2-b { scale: 1.18 0.88; }
.hb-qn2-svg { position: absolute; width: 0; height: 0; overflow: hidden; pointer-events: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-qn2-track, .hb-qn2-a, .hb-qn2-b { transition: none; }
  .hb-qn2:active .hb-qn2-a, .hb-qn2:active .hb-qn2-b { scale: 1; }
}
`;

export function ToggleGooey({
  checked,
  defaultChecked = false,
  onCheckedChange,
  size = 32,
  label = "Toggle",
  accent = "#2f7bff",
  disabled = false,
  name,
  className = "",
  style,
  ...rest
}: ToggleGooeyProps) {
  const filterId = `hb-qn2-${React.useId().replace(/:/g, "")}`;
  const controlled = checked !== undefined;
  const vars = {
    "--hb-qn2-h": `${size}px`,
    "--hb-qn2-a": accent,
    ...style,
  } as React.CSSProperties;
  const blur = (size * 0.12).toFixed(2);

  return (
    <>
      <style href="hb-toggle-gooey" precedence="default">{css}</style>
      <label className={`hb-qn2 ${className}`} style={vars} data-disabled={disabled} {...rest}>
        <input
          type="checkbox"
          role="switch"
          className="hb-qn2-in"
          aria-label={label}
          name={name}
          disabled={disabled}
          {...(controlled ? { checked } : { defaultChecked })}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
        />
        <span className="hb-qn2-track" aria-hidden="true" />
        <span className="hb-qn2-goo" aria-hidden="true" style={{ filter: `url(#${filterId})` }}>
          <span className="hb-qn2-a" />
          <span className="hb-qn2-b" />
        </span>
        <svg className="hb-qn2-svg" aria-hidden="true" focusable="false">
          <filter id={filterId} x="-30%" y="-60%" width="160%" height="220%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </svg>
      </label>
    </>
  );
}
