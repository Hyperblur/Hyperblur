"use client";

import * as React from "react";

export interface ScrubFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "min" | "max" | "step" | "type" | "size"
  > {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  sensitivity?: number;
  label?: string;
  suffix?: string;
}

const css = `
.hb-sf {
  display: inline-flex;
  align-items: stretch;
  height: 36px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, .16);
  background: rgba(255, 255, 255, .04);
  color: #f5f5f5;
  font: 500 14px/1 system-ui, -apple-system, "Segoe UI", sans-serif;
  transition: border-color .15s ease, background-color .15s ease;
}
.hb-sf:hover { background: rgba(255, 255, 255, .07); }
.hb-sf:focus-within,
.hb-sf[data-dragging="true"] {
  border-color: #2f7bff;
  background: rgba(47, 123, 255, .1);
}
.hb-sf:focus-within { box-shadow: 0 0 0 3px rgba(47, 123, 255, .28); }
.hb-sf-l {
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-right: 1px solid rgba(255, 255, 255, .12);
  color: rgba(255, 255, 255, .55);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  cursor: ew-resize;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  transition: color .15s ease;
}
.hb-sf-l:hover,
.hb-sf[data-dragging="true"] .hb-sf-l { color: #fff; }
.hb-sf-i {
  width: 4.5em;
  min-width: 0;
  padding: 0 10px;
  border: 0;
  outline: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-variant-numeric: tabular-nums;
  appearance: textfield;
  -moz-appearance: textfield;
}
.hb-sf-i::-webkit-inner-spin-button,
.hb-sf-i::-webkit-outer-spin-button {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
}
.hb-sf-s {
  display: flex;
  align-items: center;
  padding: 0 10px 0 0;
  color: rgba(255, 255, 255, .45);
  font-size: 12px;
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
}
@media (prefers-reduced-motion: reduce) {
  .hb-sf, .hb-sf-l { transition: none; }
}
`;

function places(n: number) {
  const s = String(n);
  const i = s.indexOf(".");
  return i < 0 ? 0 : s.length - i - 1;
}

export function ScrubField({
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  sensitivity = 0.5,
  label = "Value",
  suffix = "",
  id: idProp,
  className = "",
  style,
  onBlur,
  onKeyDown,
  ...rest
}: ScrubFieldProps) {
  const autoId = React.useId();
  const id = idProp ?? autoId;
  const suffixId = `${autoId}-s`;
  const [inner, setInner] = React.useState(defaultValue);
  const [draft, setDraft] = React.useState<string | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const drag = React.useRef({ active: false, moved: false, x: 0, raw: 0 });
  const last = React.useRef(defaultValue);
  const current = value ?? inner;
  const unit = step > 0 ? step : 1;

  function clamp(n: number) {
    let v = n;
    if (min !== undefined) v = Math.max(min, v);
    if (max !== undefined) v = Math.min(max, v);
    return v;
  }

  function snap(n: number) {
    const base = min ?? 0;
    const v = Math.round((n - base) / unit) * unit + base;
    return Number(v.toFixed(Math.max(places(unit), places(base))));
  }

  function commit(n: number) {
    if (n === last.current) return;
    last.current = n;
    setInner(n);
    onChange?.(n);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setDraft(raw);
    const n = Number(raw);
    if (raw !== "" && Number.isFinite(n)) commit(n);
  }

  function settle() {
    last.current = current;
    commit(clamp(current));
    setDraft(null);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    onBlur?.(e);
    settle();
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Enter") {
      settle();
      return;
    }
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const dir = e.key === "ArrowUp" ? 1 : -1;
    last.current = current;
    commit(clamp(snap(current + dir * unit * (e.shiftKey ? 10 : 1))));
    setDraft(null);
  }

  function handleDown(e: React.PointerEvent<HTMLLabelElement>) {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { active: true, moved: false, x: e.clientX, raw: current };
    last.current = current;
    setDragging(true);
  }

  function handleMove(e: React.PointerEvent<HTMLLabelElement>) {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    d.x = e.clientX;
    if (dx === 0) return;
    d.moved = true;
    d.raw = clamp(d.raw + dx * sensitivity * (e.shiftKey ? 10 : 1));
    commit(clamp(snap(d.raw)));
    setDraft(null);
  }

  function handleEnd(e: React.PointerEvent<HTMLLabelElement>) {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
  }

  function handleLabelClick(e: React.MouseEvent<HTMLLabelElement>) {
    if (drag.current.moved) e.preventDefault();
  }

  return (
    <div className={`hb-sf ${className}`} style={style} data-dragging={dragging}>
      <style href="hb-scrub-field" precedence="default">{css}</style>
      {label && (
        <label
          htmlFor={id}
          className="hb-sf-l"
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleEnd}
          onPointerCancel={handleEnd}
          onLostPointerCapture={handleEnd}
          onClick={handleLabelClick}
        >
          {label}
        </label>
      )}
      <input
        aria-describedby={suffix ? suffixId : undefined}
        {...rest}
        id={id}
        className="hb-sf-i"
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={unit}
        value={draft ?? String(current)}
        onChange={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKey}
      />
      {suffix && (
        <span id={suffixId} className="hb-sf-s">
          {suffix}
        </span>
      )}
    </div>
  );
}
