"use client";

import * as React from "react";

export interface CheckboxDrawProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "children" | "onChange" | "checked" | "defaultChecked"> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children?: React.ReactNode;
  description?: React.ReactNode;
  size?: number;
  accent?: string;
}

const css = `
.hb-qn3 {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  gap: 0.7em;
  box-sizing: border-box;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hb-qn3 *, .hb-qn3 *::before, .hb-qn3 *::after { box-sizing: border-box; }
.hb-qn3[data-disabled="true"] { opacity: 0.5; cursor: not-allowed; }
.hb-qn3-in {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: var(--hb-qn3-s);
  height: var(--hb-qn3-s);
  margin: 0;
  opacity: 0;
  cursor: inherit;
}
.hb-qn3-box {
  position: relative;
  flex: none;
  width: var(--hb-qn3-s);
  height: var(--hb-qn3-s);
  border: 1.5px solid #3a3a3a;
  border-radius: calc(var(--hb-qn3-s) * 0.32);
  background: #111;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.hb-qn3:hover .hb-qn3-in:not(:disabled) ~ .hb-qn3-box { border-color: #5a5a5a; }
.hb-qn3-box::before {
  content: "";
  position: absolute;
  inset: -1.5px;
  border-radius: inherit;
  background: var(--hb-qn3-a);
  transform: scale(0);
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-qn3-box::after {
  content: "";
  position: absolute;
  inset: -1.5px;
  border: 2px solid var(--hb-qn3-a);
  border-radius: inherit;
  opacity: 0;
  pointer-events: none;
}
.hb-qn3-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-qn3-tick, .hb-qn3-dash {
  fill: none;
  stroke: #fff;
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1 1.1;
  stroke-dashoffset: 1.05;
  transition: stroke-dashoffset 0.28s cubic-bezier(0.6, 0, 0.3, 1);
}
.hb-qn3-in:focus-visible ~ .hb-qn3-box { outline: 2px solid var(--hb-qn3-a); outline-offset: 2px; }
.hb-qn3-in:checked ~ .hb-qn3-box,
.hb-qn3-in:indeterminate ~ .hb-qn3-box {
  border-color: var(--hb-qn3-a);
  animation: hb-qn3-pop 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-qn3-in:checked ~ .hb-qn3-box::before,
.hb-qn3-in:indeterminate ~ .hb-qn3-box::before { transform: scale(1); }
.hb-qn3-in:checked ~ .hb-qn3-box::after,
.hb-qn3-in:indeterminate ~ .hb-qn3-box::after { animation: hb-qn3-ring 0.5s ease-out; }
.hb-qn3-in:checked ~ .hb-qn3-box .hb-qn3-tick { stroke-dashoffset: 0; transition-delay: 0.09s; }
.hb-qn3-in:indeterminate ~ .hb-qn3-box .hb-qn3-tick { stroke-dashoffset: 1.05; transition-delay: 0s; }
.hb-qn3-in:indeterminate ~ .hb-qn3-box .hb-qn3-dash { stroke-dashoffset: 0; transition-delay: 0.09s; }
.hb-qn3:active .hb-qn3-in:not(:disabled) ~ .hb-qn3-box { transform: scale(0.9); }
.hb-qn3-text { display: flex; flex-direction: column; min-width: 0; padding-top: 0.05em; line-height: 1.35; }
.hb-qn3-label { font-weight: 500; color: #ededed; }
.hb-qn3-desc { margin-top: 0.1em; font-size: 0.85em; color: #8f8f8f; }
@keyframes hb-qn3-pop {
  0% { transform: scale(0.84); }
  55% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
@keyframes hb-qn3-ring {
  0% { opacity: 0.55; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.75); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qn3-box, .hb-qn3-box::before, .hb-qn3-tick, .hb-qn3-dash { transition: none; }
  .hb-qn3-in:checked ~ .hb-qn3-box,
  .hb-qn3-in:indeterminate ~ .hb-qn3-box { animation: none; }
  .hb-qn3-in:checked ~ .hb-qn3-box::after,
  .hb-qn3-in:indeterminate ~ .hb-qn3-box::after { animation: none; }
  .hb-qn3:active .hb-qn3-in:not(:disabled) ~ .hb-qn3-box { transform: none; }
}
`;

export function CheckboxDraw({
  checked,
  defaultChecked = false,
  indeterminate = false,
  onCheckedChange,
  children,
  description,
  size = 22,
  accent = "#2f7bff",
  disabled = false,
  className = "",
  style,
  ...rest
}: CheckboxDrawProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const controlled = checked !== undefined;
  const vars = {
    "--hb-qn3-s": `${size}px`,
    "--hb-qn3-a": accent,
    ...style,
  } as React.CSSProperties;

  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  });

  return (
    <>
      <style href="hb-checkbox-draw" precedence="default">{css}</style>
      <label className={`hb-qn3 ${className}`} style={vars} data-disabled={disabled}>
        <input
          ref={ref}
          type="checkbox"
          className="hb-qn3-in"
          disabled={disabled}
          {...(controlled ? { checked } : { defaultChecked })}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...rest}
        />
        <span className="hb-qn3-box" aria-hidden="true">
          <svg className="hb-qn3-svg" viewBox="0 0 24 24" focusable="false">
            <path className="hb-qn3-tick" d="M6.2 12.6l4 4 7.6-8.6" pathLength="1" />
            <path className="hb-qn3-dash" d="M6.8 12h10.4" pathLength="1" />
          </svg>
        </span>
        {children !== undefined || description !== undefined ? (
          <span className="hb-qn3-text">
            {children !== undefined ? <span className="hb-qn3-label">{children}</span> : null}
            {description !== undefined ? <span className="hb-qn3-desc">{description}</span> : null}
          </span>
        ) : null}
      </label>
    </>
  );
}
