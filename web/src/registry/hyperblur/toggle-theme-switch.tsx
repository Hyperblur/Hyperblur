"use client";

import * as React from "react";

export interface ToggleThemeSwitchProps
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
.hb-qn1 {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  flex: none;
  width: calc(var(--hb-qn1-h) * 2);
  height: var(--hb-qn1-h);
  margin: 0;
  border-radius: 999px;
  font: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hb-qn1 *, .hb-qn1 *::before, .hb-qn1 *::after { box-sizing: border-box; }
.hb-qn1[data-disabled="true"] { opacity: 0.5; cursor: not-allowed; }
.hb-qn1-in {
  position: absolute;
  inset: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}
.hb-qn1-track {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  background: linear-gradient(180deg, #7db8ff 0%, #cfe6ff 100%);
  box-shadow: inset 0 1px 4px rgba(10, 30, 70, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.hb-qn1-in:focus-visible ~ .hb-qn1-track { outline: 2px solid var(--hb-qn1-a); outline-offset: 3px; }
.hb-qn1-night {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #080c1f 0%, #1c2552 100%);
  opacity: 0;
  transition: opacity 0.55s ease;
}
.hb-qn1-stars {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateY(-35%);
  transition: opacity 0.4s ease, transform 0.55s cubic-bezier(0.3, 1.2, 0.4, 1);
}
.hb-qn1-star { fill: #fff; animation: hb-qn1-tw 2.4s ease-in-out infinite; }
.hb-qn1-star:nth-child(2n) { animation-delay: -0.8s; }
.hb-qn1-star:nth-child(3n) { animation-delay: -1.6s; }
.hb-qn1-clouds {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 58%;
  height: 74%;
  fill: #fff;
  opacity: 0.95;
  transition: opacity 0.4s ease, transform 0.55s cubic-bezier(0.3, 1.2, 0.4, 1);
}
.hb-qn1-clouds-b { opacity: 0.6; }
.hb-qn1-in:checked ~ .hb-qn1-track .hb-qn1-night { opacity: 1; }
.hb-qn1-in:checked ~ .hb-qn1-track .hb-qn1-stars { opacity: 1; transform: translateY(0); }
.hb-qn1-in:checked ~ .hb-qn1-track .hb-qn1-clouds { opacity: 0; transform: translateX(40%); }
.hb-qn1-thumb {
  position: absolute;
  z-index: 1;
  top: calc(var(--hb-qn1-h) * 0.125);
  left: calc(var(--hb-qn1-h) * 0.125);
  width: calc(var(--hb-qn1-h) * 0.75);
  height: calc(var(--hb-qn1-h) * 0.75);
  pointer-events: none;
  filter: drop-shadow(0 0 5px rgba(255, 190, 50, 0.65));
  transform: translateX(0);
  transition: transform 0.55s cubic-bezier(0.6, -0.2, 0.3, 1.25), filter 0.55s ease;
}
.hb-qn1-in:checked ~ .hb-qn1-thumb {
  transform: translateX(var(--hb-qn1-h));
  filter: drop-shadow(0 0 5px rgba(190, 210, 255, 0.5));
}
.hb-qn1:active .hb-qn1-thumb { scale: 1.08; }
.hb-qn1-svg { display: block; width: 100%; height: 100%; overflow: visible; }
.hb-qn1-core {
  fill: #ffc43d;
  transform-box: fill-box;
  transform-origin: center;
  transition: fill 0.55s ease, transform 0.55s cubic-bezier(0.3, 1.3, 0.5, 1);
}
.hb-qn1-in:checked ~ .hb-qn1-thumb .hb-qn1-core { fill: #e9eefb; transform: scale(1.18); }
.hb-qn1-rays {
  stroke: #ffc43d;
  stroke-width: 1.8;
  stroke-linecap: round;
  transform-box: view-box;
  transform-origin: 12px 12px;
  transition: transform 0.55s cubic-bezier(0.3, 1.2, 0.5, 1), opacity 0.35s ease;
}
.hb-qn1-in:checked ~ .hb-qn1-thumb .hb-qn1-rays { transform: rotate(80deg) scale(0.3); opacity: 0; }
.hb-qn1-cut {
  transform: translate(15px, -7px);
  transition: transform 0.55s cubic-bezier(0.3, 1.2, 0.5, 1);
}
.hb-qn1-in:checked ~ .hb-qn1-thumb .hb-qn1-cut { transform: translate(0, 0); }
.hb-qn1-crater { fill: #8b97c4; opacity: 0; transition: opacity 0.4s ease 0.2s; }
.hb-qn1-in:checked ~ .hb-qn1-thumb .hb-qn1-crater { opacity: 0.35; }
@keyframes hb-qn1-tw {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qn1-night, .hb-qn1-stars, .hb-qn1-clouds, .hb-qn1-thumb, .hb-qn1-core, .hb-qn1-rays, .hb-qn1-cut, .hb-qn1-crater { transition: none; }
  .hb-qn1-star { animation: none; }
  .hb-qn1:active .hb-qn1-thumb { scale: 1; }
}
`;

const stars: [number, number, number][] = [
  [10, 9, 1.1],
  [19, 21, 0.8],
  [25, 8, 0.9],
  [31, 23, 1],
  [14, 15.5, 0.6],
  [36, 12, 0.7],
];

export function ToggleThemeSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  size = 32,
  label = "Dark mode",
  accent = "#7fb3ff",
  disabled = false,
  name,
  className = "",
  style,
  ...rest
}: ToggleThemeSwitchProps) {
  const maskId = `hb-qn1-${React.useId().replace(/:/g, "")}`;
  const controlled = checked !== undefined;
  const vars = {
    "--hb-qn1-h": `${size}px`,
    "--hb-qn1-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-toggle-theme-switch" precedence="default">{css}</style>
      <label className={`hb-qn1 ${className}`} style={vars} data-disabled={disabled} {...rest}>
        <input
          type="checkbox"
          role="switch"
          className="hb-qn1-in"
          aria-label={label}
          name={name}
          disabled={disabled}
          {...(controlled ? { checked } : { defaultChecked })}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
        />
        <span className="hb-qn1-track" aria-hidden="true">
          <span className="hb-qn1-night" />
          <svg className="hb-qn1-stars" viewBox="0 0 64 32" focusable="false">
            {stars.map(([x, y, r]) => (
              <circle key={`${x}-${y}`} className="hb-qn1-star" cx={x} cy={y} r={r} />
            ))}
          </svg>
          <svg className="hb-qn1-clouds" viewBox="0 0 40 24" focusable="false">
            <g className="hb-qn1-clouds-b">
              <circle cx="14" cy="21" r="5" />
              <circle cx="22" cy="19" r="6" />
              <rect x="10" y="20" width="20" height="6" />
            </g>
            <circle cx="28" cy="20" r="6.5" />
            <circle cx="35" cy="22" r="5" />
            <circle cx="20" cy="22" r="5.5" />
            <rect x="18" y="20" width="22" height="8" />
          </svg>
        </span>
        <span className="hb-qn1-thumb" aria-hidden="true">
          <svg className="hb-qn1-svg" viewBox="0 0 24 24" focusable="false">
            <g className="hb-qn1-rays">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line key={deg} x1="12" y1="0.8" x2="12" y2="2.8" transform={`rotate(${deg} 12 12)`} />
              ))}
            </g>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="-6" y="-6" width="36" height="36">
              <rect x="-6" y="-6" width="36" height="36" fill="#fff" />
              <circle className="hb-qn1-cut" cx="17.5" cy="8" r="6.4" fill="#000" />
            </mask>
            <g mask={`url(#${maskId})`}>
              <circle className="hb-qn1-core" cx="12" cy="12" r="6.2" />
              <circle className="hb-qn1-crater" cx="8.6" cy="13.4" r="1.3" />
              <circle className="hb-qn1-crater" cx="11.4" cy="16.6" r="0.9" />
              <circle className="hb-qn1-crater" cx="7.6" cy="10.2" r="0.8" />
            </g>
          </svg>
        </span>
      </label>
    </>
  );
}
