"use client";

import * as React from "react";

export interface SpringToggleProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "color" | "onChange" | "role" | "defaultChecked"
  > {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  color?: string;
  label?: string;
  disabled?: boolean;
}

const css = `
.hb-spt {
  display: inline-flex;
  align-items: center;
  gap: 0.65em;
  color: inherit;
}
.hb-spt[data-size="sm"] { --hb-w: 36px; --hb-h: 20px; }
.hb-spt[data-size="md"] { --hb-w: 46px; --hb-h: 26px; }
.hb-spt[data-size="lg"] { --hb-w: 58px; --hb-h: 32px; }
.hb-spt-b {
  position: relative;
  display: inline-block;
  flex: none;
  width: var(--hb-w);
  height: var(--hb-h);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.25s ease;
}
.hb-spt-b[aria-checked="true"] { background: var(--hb-c); }
.hb-spt-b:focus-visible { outline: 2px solid var(--hb-c); outline-offset: 3px; }
.hb-spt-b:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-spt-k {
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(var(--hb-h) - 6px);
  height: calc(var(--hb-h) - 6px);
  transform: translateX(0);
  transition: transform 0.5s cubic-bezier(0.34, 1.45, 0.5, 1);
  pointer-events: none;
}
.hb-spt-b[aria-checked="true"] .hb-spt-k { transform: translateX(calc(var(--hb-w) - var(--hb-h))); }
.hb-spt-d {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-spt-b:not(:disabled):active .hb-spt-d { transform: scaleX(1.2); }
.hb-spt-b[data-fx="on"] .hb-spt-d { animation: hb-spt-on 0.55s cubic-bezier(0.34, 1.56, 0.64, 1); transform-origin: right center; }
.hb-spt-b[data-fx="off"] .hb-spt-d { animation: hb-spt-off 0.55s cubic-bezier(0.34, 1.56, 0.64, 1); transform-origin: left center; }
.hb-spt-l { cursor: pointer; user-select: none; -webkit-user-select: none; }
.hb-spt[data-disabled="true"] .hb-spt-l { opacity: 0.45; cursor: not-allowed; }
@keyframes hb-spt-on {
  0% { transform: scale(1, 1); }
  30% { transform: scale(1.45, 0.82); }
  65% { transform: scale(0.92, 1.1); }
  100% { transform: scale(1, 1); }
}
@keyframes hb-spt-off {
  0% { transform: scale(1, 1); }
  30% { transform: scale(1.45, 0.82); }
  65% { transform: scale(0.92, 1.1); }
  100% { transform: scale(1, 1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-spt-b, .hb-spt-k, .hb-spt-d { transition: none; }
  .hb-spt-b[data-fx] .hb-spt-d { animation: none; }
  .hb-spt-b:not(:disabled):active .hb-spt-d { transform: none; }
}
`;

export function SpringToggle({
  checked,
  defaultChecked = false,
  onChange,
  size = "md",
  color = "#2f7bff",
  label,
  disabled = false,
  className = "",
  style,
  onClick,
  id,
  ...rest
}: SpringToggleProps) {
  const autoId = React.useId();
  const controlId = id ?? autoId;
  const [inner, setInner] = React.useState(defaultChecked);
  const [fx, setFx] = React.useState<"" | "on" | "off">("");
  const on = checked !== undefined ? checked : inner;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    if (e.defaultPrevented || disabled) return;
    const next = !on;
    if (checked === undefined) setInner(next);
    setFx(next ? "on" : "off");
    onChange?.(next);
  }

  const vars = { "--hb-c": color, ...style } as React.CSSProperties;

  return (
    <span
      className={`hb-spt ${className}`}
      style={vars}
      data-size={size}
      data-disabled={disabled}
    >
      <style href="hb-spring-toggle" precedence="default">{css}</style>
      <button
        {...rest}
        id={controlId}
        type="button"
        role="switch"
        aria-checked={on}
        className="hb-spt-b"
        disabled={disabled}
        data-fx={fx || undefined}
        onClick={handleClick}
      >
        <span className="hb-spt-k" aria-hidden="true">
          <span className="hb-spt-d" />
        </span>
      </button>
      {label ? (
        <label className="hb-spt-l" htmlFor={controlId}>
          {label}
        </label>
      ) : null}
    </span>
  );
}
