"use client";

import * as React from "react";

export interface SliderRangeDualProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  minGap?: number;
  formatValue?: (value: number) => string;
  bubbles?: "always" | "active" | "none";
  label?: string;
  name?: string;
  disabled?: boolean;
  accent?: string;
}

const css = `
.hb-qn8 {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 0 11px;
  font: inherit;
  color: #ededed;
  user-select: none;
  -webkit-user-select: none;
}
.hb-qn8 *, .hb-qn8 *::before, .hb-qn8 *::after { box-sizing: border-box; }
.hb-qn8[data-bubbles="always"], .hb-qn8[data-bubbles="active"] { padding-top: 34px; }
.hb-qn8[data-disabled="true"] { opacity: 0.45; pointer-events: none; }
.hb-qn8-hit {
  position: relative;
  height: 22px;
  cursor: pointer;
  touch-action: none;
}
.hb-qn8-rail {
  position: absolute;
  top: 50%;
  right: -11px;
  left: -11px;
  height: 6px;
  border-radius: 6px;
  background: #262626;
  transform: translateY(-50%);
}
.hb-qn8-fill {
  position: absolute;
  top: 50%;
  height: 6px;
  border-radius: 6px;
  background: var(--hb-qn8-a);
  box-shadow: 0 0 14px -2px var(--hb-qn8-a);
  transform: translateY(-50%);
}
.hb-qn8-thumb {
  position: absolute;
  top: 50%;
  z-index: 1;
  width: 22px;
  height: 22px;
  margin: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.2);
  outline: 0;
  cursor: grab;
  transform: translate(-50%, -50%);
  transition: scale 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
}
.hb-qn8-thumb::after {
  content: "";
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  background: var(--hb-qn8-a);
}
.hb-qn8-thumb:hover { scale: 1.08; }
.hb-qn8-thumb:focus-visible { box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), 0 0 0 4px color-mix(in srgb, var(--hb-qn8-a) 45%, transparent); }
.hb-qn8-thumb[data-active="true"] { z-index: 2; scale: 1.14; cursor: grabbing; }
.hb-qn8-bub {
  position: absolute;
  bottom: calc(100% + 9px);
  left: 50%;
  padding: 4px 8px;
  border: 1px solid #2f2f2f;
  border-radius: 8px;
  background: #1a1a1a;
  box-shadow: 0 6px 16px -6px rgba(0, 0, 0, 0.7);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  color: #ededed;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  pointer-events: none;
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.hb-qn8-thumb[data-which="min"] .hb-qn8-bub { transform: translateX(-62%) translateY(0); }
.hb-qn8-thumb[data-which="max"] .hb-qn8-bub { transform: translateX(-38%) translateY(0); }
.hb-qn8-bub::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  width: 7px;
  height: 7px;
  margin: -4px 0 0 -3.5px;
  border-right: 1px solid #2f2f2f;
  border-bottom: 1px solid #2f2f2f;
  background: #1a1a1a;
  transform: rotate(45deg);
}
.hb-qn8-thumb[data-which="min"] .hb-qn8-bub::after { left: 62%; }
.hb-qn8-thumb[data-which="max"] .hb-qn8-bub::after { left: 38%; }
.hb-qn8[data-bubbles="active"] .hb-qn8-bub { opacity: 0; transform: translateX(-50%) translateY(4px); }
.hb-qn8[data-bubbles="active"] .hb-qn8-thumb[data-which="min"] .hb-qn8-bub { transform: translateX(-62%) translateY(4px); }
.hb-qn8[data-bubbles="active"] .hb-qn8-thumb[data-which="max"] .hb-qn8-bub { transform: translateX(-38%) translateY(4px); }
.hb-qn8[data-bubbles="active"] .hb-qn8-thumb:hover .hb-qn8-bub,
.hb-qn8[data-bubbles="active"] .hb-qn8-thumb:focus-visible .hb-qn8-bub,
.hb-qn8[data-bubbles="active"] .hb-qn8-thumb[data-active="true"] .hb-qn8-bub { opacity: 1; }
.hb-qn8[data-bubbles="active"] .hb-qn8-thumb[data-which="min"]:hover .hb-qn8-bub,
.hb-qn8[data-bubbles="active"] .hb-qn8-thumb[data-which="min"]:focus-visible .hb-qn8-bub,
.hb-qn8[data-bubbles="active"] .hb-qn8-thumb[data-which="min"][data-active="true"] .hb-qn8-bub { transform: translateX(-62%) translateY(0); }
.hb-qn8[data-bubbles="active"] .hb-qn8-thumb[data-which="max"]:hover .hb-qn8-bub,
.hb-qn8[data-bubbles="active"] .hb-qn8-thumb[data-which="max"]:focus-visible .hb-qn8-bub,
.hb-qn8[data-bubbles="active"] .hb-qn8-thumb[data-which="max"][data-active="true"] .hb-qn8-bub { transform: translateX(-38%) translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .hb-qn8-thumb, .hb-qn8-bub { transition: none; }
}
`;

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

export function SliderRangeDual({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = [25, 75],
  onValueChange,
  minGap = 0,
  formatValue,
  bubbles = "always",
  label = "Range",
  name,
  disabled = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: SliderRangeDualProps) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<[number, number]>(defaultValue);
  const current = controlled ? value : inner;
  const [lo, hi] = current;
  const valueRef = React.useRef<[number, number]>(current);
  const hitRef = React.useRef<HTMLDivElement>(null);
  const thumbs = React.useRef<(HTMLDivElement | null)[]>([null, null]);
  const dragging = React.useRef<0 | 1 | null>(null);
  const [active, setActive] = React.useState<0 | 1 | null>(null);

  React.useEffect(() => {
    valueRef.current = current;
  });

  const span = Math.max(max - min, Number.EPSILON);
  const pct = (n: number) => ((clamp(n, min, max) - min) / span) * 100;
  const show = (n: number) => (formatValue ? formatValue(n) : String(n));
  const decimals = (String(step).split(".")[1] ?? "").length;

  function snap(raw: number) {
    const stepped = Math.round((raw - min) / step) * step + min;
    return clamp(Number(stepped.toFixed(decimals)), min, max);
  }

  function setThumb(index: 0 | 1, raw: number) {
    const [a, b] = valueRef.current;
    const nv = snap(raw);
    const next: [number, number] =
      index === 0 ? [clamp(nv, min, Math.max(min, b - minGap)), b] : [a, clamp(nv, Math.min(max, a + minGap), max)];
    if (next[0] === a && next[1] === b) return;
    valueRef.current = next;
    if (!controlled) setInner(next);
    onValueChange?.(next);
  }

  function fromPointer(clientX: number) {
    const rect = hitRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return min;
    return min + clamp((clientX - rect.left) / rect.width, 0, 1) * (max - min);
  }

  function grab(index: 0 | 1, e: React.PointerEvent<HTMLDivElement>) {
    dragging.current = index;
    setActive(index);
    const el = thumbs.current[index];
    el?.setPointerCapture(e.pointerId);
    el?.focus({ preventScroll: true });
  }

  function onTrackDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("[data-hb-qn8-thumb]")) return;
    const raw = fromPointer(e.clientX);
    const [a, b] = valueRef.current;
    const index: 0 | 1 = Math.abs(raw - a) < Math.abs(raw - b) || (a === b && raw < a) ? 0 : 1;
    setThumb(index, raw);
    grab(index, e);
  }

  function onThumbDown(index: 0 | 1, e: React.PointerEvent<HTMLDivElement>) {
    if (disabled || e.button !== 0) return;
    e.preventDefault();
    grab(index, e);
  }

  function onThumbMove(index: 0 | 1, e: React.PointerEvent<HTMLDivElement>) {
    if (dragging.current !== index) return;
    setThumb(index, fromPointer(e.clientX));
  }

  function release() {
    dragging.current = null;
    setActive(null);
  }

  function onThumbKey(index: 0 | 1, e: React.KeyboardEvent<HTMLDivElement>) {
    const now = valueRef.current[index];
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = now + step;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = now - step;
    else if (e.key === "PageUp") next = now + step * 10;
    else if (e.key === "PageDown") next = now - step * 10;
    else if (e.key === "Home") next = min;
    else if (e.key === "End") next = max;
    if (next === null) return;
    e.preventDefault();
    setThumb(index, next);
  }

  const vars = { "--hb-qn8-a": accent, ...style } as React.CSSProperties;
  return (
    <>
      <style href="hb-slider-range-dual" precedence="default">{css}</style>
      <div
        className={`hb-qn8 ${className}`}
        style={vars}
        data-bubbles={bubbles}
        data-disabled={disabled}
        {...rest}
      >
        <div ref={hitRef} className="hb-qn8-hit" onPointerDown={onTrackDown}>
          <div className="hb-qn8-rail" />
          <div className="hb-qn8-fill" style={{ left: `${pct(lo).toFixed(3)}%`, width: `${(pct(hi) - pct(lo)).toFixed(3)}%` }} />
          {([0, 1] as const).map((index) => (
            <div
              key={index}
              ref={(el) => {
                thumbs.current[index] = el;
              }}
              className="hb-qn8-thumb"
              style={{ left: `${pct(current[index]).toFixed(3)}%` }}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-orientation="horizontal"
              aria-valuemin={index === 0 ? min : Math.min(max, lo + minGap)}
              aria-valuemax={index === 0 ? Math.max(min, hi - minGap) : max}
              aria-valuenow={current[index]}
              aria-valuetext={show(current[index])}
              aria-label={`${label} ${index === 0 ? "minimum" : "maximum"}`}
              aria-disabled={disabled || undefined}
              data-hb-qn8-thumb=""
              data-which={index === 0 ? "min" : "max"}
              data-active={active === index}
              onPointerDown={(e) => onThumbDown(index, e)}
              onPointerMove={(e) => onThumbMove(index, e)}
              onPointerUp={release}
              onPointerCancel={release}
              onLostPointerCapture={release}
              onKeyDown={(e) => onThumbKey(index, e)}
            >
              {bubbles !== "none" ? <span className="hb-qn8-bub">{show(current[index])}</span> : null}
            </div>
          ))}
        </div>
        {name ? (
          <>
            <input type="hidden" name={`${name}-min`} value={lo} />
            <input type="hidden" name={`${name}-max`} value={hi} />
          </>
        ) : null}
      </div>
    </>
  );
}
