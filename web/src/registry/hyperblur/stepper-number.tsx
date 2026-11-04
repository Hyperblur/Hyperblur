"use client";

import * as React from "react";

export interface StepperNumberProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  size?: number;
  holdDelay?: number;
  repeatInterval?: number;
  accent?: string;
  disabled?: boolean;
  name?: string;
}

const css = `
.hb-qn9 {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  box-sizing: border-box;
  height: var(--hb-qn9-h);
  padding: 4px;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  background: #111;
  font: inherit;
  color: #ededed;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-qn9 *, .hb-qn9 *::before, .hb-qn9 *::after { box-sizing: border-box; }
.hb-qn9:hover { border-color: #3a3a3a; }
.hb-qn9:focus-within { border-color: color-mix(in srgb, var(--hb-qn9-a) 60%, #2a2a2a); }
.hb-qn9[data-disabled="true"] { opacity: 0.5; pointer-events: none; }
.hb-qn9-btn {
  display: grid;
  flex: none;
  place-items: center;
  width: calc(var(--hb-qn9-h) - 10px);
  height: calc(var(--hb-qn9-h) - 10px);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #1c1c1c;
  color: #ededed;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}
.hb-qn9-btn:hover:not(:disabled) { background: color-mix(in srgb, var(--hb-qn9-a) 28%, #1c1c1c); }
.hb-qn9-btn:active:not(:disabled) { transform: scale(0.88); background: var(--hb-qn9-a); }
.hb-qn9-btn:focus-visible { outline: 2px solid var(--hb-qn9-a); outline-offset: 2px; }
.hb-qn9-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.hb-qn9-btn svg { width: 40%; height: 40%; display: block; }
.hb-qn9-btn path { fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; }
.hb-qn9-val {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 3.2ch;
  height: 100%;
  padding: 0 8px;
  border-radius: 10px;
  font-size: calc(var(--hb-qn9-h) * 0.4);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
  outline: 0;
  cursor: default;
}
.hb-qn9-val:focus-visible { box-shadow: 0 0 0 2px var(--hb-qn9-a); }
.hb-qn9-roll { display: inline-flex; height: 1.2em; overflow: hidden; mask-image: linear-gradient(180deg, transparent 0, #000 14%, #000 86%, transparent 100%); -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 14%, #000 86%, transparent 100%); }
.hb-qn9-digit { display: block; width: 0.62em; height: 1.2em; overflow: hidden; text-align: center; }
.hb-qn9-sign { display: block; width: 0.5em; height: 1.2em; text-align: center; }
.hb-qn9-strip {
  display: block;
  transition: transform 0.45s cubic-bezier(0.3, 1.25, 0.4, 1), filter 0.2s ease;
}
.hb-qn9-strip span { display: block; height: 1.2em; }
@media (prefers-reduced-motion: reduce) {
  .hb-qn9, .hb-qn9-btn, .hb-qn9-strip { transition: none; }
}
`;

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function Roll({ text }: { text: string }) {
  const chars = text.split("");
  return (
    <span className="hb-qn9-roll" aria-hidden="true">
      {chars.map((ch, i) => {
        const fromRight = chars.length - 1 - i;
        if (ch < "0" || ch > "9") {
          return (
            <span key={`s${fromRight}`} className="hb-qn9-sign">
              {ch}
            </span>
          );
        }
        return (
          <span key={`d${fromRight}`} className="hb-qn9-digit">
            <span className="hb-qn9-strip" style={{ transform: `translateY(-${Number(ch) * 10}%)` }}>
              {digits.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function StepperNumber({
  value,
  defaultValue = 1,
  onValueChange,
  min = 0,
  max = 99,
  step = 1,
  label = "Quantity",
  size = 44,
  holdDelay = 420,
  repeatInterval = 90,
  accent = "#2f7bff",
  disabled = false,
  name,
  className = "",
  style,
  ...rest
}: StepperNumberProps) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(clamp(defaultValue, min, max));
  const current = controlled ? value : inner;
  const valueRef = React.useRef(current);
  const timer = React.useRef(0);

  React.useEffect(() => {
    valueRef.current = current;
  });

  React.useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  function stepBy(dir: 1 | -1, amount = step) {
    const now = valueRef.current;
    const next = clamp(now + dir * amount, min, max);
    if (next === now) return false;
    valueRef.current = next;
    if (!controlled) setInner(next);
    onValueChange?.(next);
    return true;
  }

  function jump(target: number) {
    const now = valueRef.current;
    const next = clamp(target, min, max);
    if (next === now) return;
    valueRef.current = next;
    if (!controlled) setInner(next);
    onValueChange?.(next);
  }

  function stop() {
    window.clearTimeout(timer.current);
  }

  function begin(dir: 1 | -1, e: React.PointerEvent<HTMLButtonElement>) {
    if (e.button !== 0) return;
    stop();
    if (!stepBy(dir)) return;
    let count = 0;
    const tick = () => {
      if (!stepBy(dir)) return;
      count += 1;
      timer.current = window.setTimeout(tick, Math.max(40, repeatInterval - count * 3));
    };
    timer.current = window.setTimeout(tick, holdDelay);
  }

  function onKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") stepBy(1);
    else if (e.key === "ArrowDown" || e.key === "ArrowLeft") stepBy(-1);
    else if (e.key === "PageUp") stepBy(1, step * 10);
    else if (e.key === "PageDown") stepBy(-1, step * 10);
    else if (e.key === "Home") jump(min);
    else if (e.key === "End") jump(max);
    else return;
    e.preventDefault();
  }

  const vars = {
    "--hb-qn9-h": `${size}px`,
    "--hb-qn9-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-stepper-number" precedence="default">{css}</style>
      <div
        role="group"
        aria-label={label}
        className={`hb-qn9 ${className}`}
        style={vars}
        data-disabled={disabled}
        {...rest}
      >
        <button
          type="button"
          className="hb-qn9-btn"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={disabled || current <= min}
          onPointerDown={(e) => begin(-1, e)}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          onContextMenu={(e) => e.preventDefault()}
          onClick={(e) => {
            if (e.detail === 0) stepBy(-1);
          }}
        >
          <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
            <path d="M3 8h10" />
          </svg>
        </button>
        <div
          className="hb-qn9-val"
          role="spinbutton"
          tabIndex={disabled ? -1 : 0}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current}
          onKeyDown={onKey}
        >
          <Roll text={String(current)} />
        </div>
        <button
          type="button"
          className="hb-qn9-btn"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={disabled || current >= max}
          onPointerDown={(e) => begin(1, e)}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          onContextMenu={(e) => e.preventDefault()}
          onClick={(e) => {
            if (e.detail === 0) stepBy(1);
          }}
        >
          <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
            <path d="M3 8h10M8 3v10" />
          </svg>
        </button>
        {name ? <input type="hidden" name={name} value={current} /> : null}
      </div>
    </>
  );
}
