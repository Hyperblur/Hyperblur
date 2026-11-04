"use client";

import * as React from "react";

export interface RadioCardOption {
  value: string;
  label: string;
  description?: string;
  meta?: string;
  disabled?: boolean;
}

export interface RadioCardGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  options: RadioCardOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  columns?: number;
  accent?: string;
  disabled?: boolean;
}

const css = `
.hb-qn4 {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--hb-qn4-cols), minmax(0, 1fr));
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
  font: inherit;
  color: #ededed;
}
.hb-qn4 *, .hb-qn4 *::before, .hb-qn4 *::after { box-sizing: border-box; }
.hb-qn4-hl {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border: 1px solid var(--hb-qn4-a);
  border-radius: 14px;
  background: color-mix(in srgb, var(--hb-qn4-a) 12%, transparent);
  box-shadow: 0 0 24px -8px var(--hb-qn4-a);
  opacity: 0;
  pointer-events: none;
}
.hb-qn4-hl[data-ready="true"] {
  transition: transform 0.38s cubic-bezier(0.3, 1.15, 0.4, 1), width 0.38s cubic-bezier(0.3, 1.15, 0.4, 1), height 0.38s cubic-bezier(0.3, 1.15, 0.4, 1), opacity 0.2s ease;
}
.hb-qn4-card {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 9px 14px;
  border: 1px solid #262626;
  border-radius: 14px;
  cursor: pointer;
  transition: border-color 0.25s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-qn4-card:hover { border-color: #3d3d3d; }
.hb-qn4-card[data-checked="true"] { border-color: transparent; }
.hb-qn4-card[data-disabled="true"] { opacity: 0.45; cursor: not-allowed; }
.hb-qn4-in {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}
.hb-qn4-card:has(.hb-qn4-in:focus-visible) { outline: 2px solid var(--hb-qn4-a); outline-offset: 2px; }
.hb-qn4-dot {
  position: relative;
  width: 20px;
  height: 20px;
  border: 1.5px solid #4a4a4a;
  border-radius: 50%;
  transition: border-color 0.25s ease, background 0.25s ease;
}
.hb-qn4-dot::before {
  content: "";
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: var(--hb-qn4-a);
  transform: scale(0);
  transition: transform 0.3s cubic-bezier(0.34, 1.7, 0.64, 1);
}
.hb-qn4-dot::after {
  content: "";
  position: absolute;
  inset: -1.5px;
  border: 2px solid var(--hb-qn4-a);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}
.hb-qn4-card[data-checked="true"] .hb-qn4-dot { border-color: var(--hb-qn4-a); }
.hb-qn4-card[data-checked="true"] .hb-qn4-dot::before { transform: scale(1); }
.hb-qn4-card[data-checked="true"] .hb-qn4-dot::after { animation: hb-qn4-ping 0.55s ease-out; }
.hb-qn4-body { display: flex; flex-direction: column; min-width: 0; line-height: 1.25; }
.hb-qn4-title { font-size: 14px; font-weight: 600; color: #ededed; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qn4-desc { font-size: 12px; color: #8f8f8f; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qn4-meta { font-size: 13px; font-weight: 600; color: #a1a1a1; font-variant-numeric: tabular-nums; white-space: nowrap; transition: color 0.25s ease; }
.hb-qn4-card[data-checked="true"] .hb-qn4-meta { color: #ededed; }
@keyframes hb-qn4-ping {
  0% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.9); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qn4-hl[data-ready="true"], .hb-qn4-card, .hb-qn4-dot, .hb-qn4-dot::before, .hb-qn4-meta { transition: none; }
  .hb-qn4-card[data-checked="true"] .hb-qn4-dot::after { animation: none; }
}
`;

export function RadioCardGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  columns = 1,
  accent = "#2f7bff",
  disabled = false,
  className = "",
  style,
  ...rest
}: RadioCardGroupProps) {
  const autoName = React.useId();
  const groupName = name ?? autoName;
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<string | undefined>(defaultValue);
  const current = controlled ? value : inner;
  const groupRef = React.useRef<HTMLDivElement>(null);
  const hlRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<Record<string, HTMLLabelElement | null>>({});

  const measure = React.useCallback(() => {
    const hl = hlRef.current;
    if (!hl) return;
    const card = current !== undefined ? cardRefs.current[current] : null;
    if (!card) {
      hl.style.opacity = "0";
      return;
    }
    hl.style.width = `${card.offsetWidth}px`;
    hl.style.height = `${card.offsetHeight}px`;
    hl.style.transform = `translate(${card.offsetLeft}px, ${card.offsetTop}px)`;
    hl.style.opacity = "1";
  }, [current]);

  React.useLayoutEffect(() => {
    measure();
    const group = groupRef.current;
    const hl = hlRef.current;
    if (!group || !hl) return;
    const frame = requestAnimationFrame(() => {
      hl.dataset.ready = "true";
    });
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [measure, options.length, columns]);

  function choose(next: string) {
    if (!controlled) setInner(next);
    onValueChange?.(next);
  }

  const vars = {
    "--hb-qn4-a": accent,
    "--hb-qn4-cols": Math.max(1, columns),
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-radio-card-group" precedence="default">{css}</style>
      <div
        ref={groupRef}
        role="radiogroup"
        className={`hb-qn4 ${className}`}
        style={vars}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        <div ref={hlRef} className="hb-qn4-hl" aria-hidden="true" />
        {options.map((option) => {
          const checked = current === option.value;
          const off = disabled || option.disabled === true;
          return (
            <label
              key={option.value}
              ref={(el) => {
                cardRefs.current[option.value] = el;
              }}
              className="hb-qn4-card"
              data-checked={checked}
              data-disabled={off}
            >
              <input
                type="radio"
                className="hb-qn4-in"
                name={groupName}
                value={option.value}
                checked={checked}
                disabled={off}
                onChange={() => choose(option.value)}
              />
              <span className="hb-qn4-dot" aria-hidden="true" />
              <span className="hb-qn4-body">
                <span className="hb-qn4-title">{option.label}</span>
                {option.description ? <span className="hb-qn4-desc">{option.description}</span> : null}
              </span>
              {option.meta ? <span className="hb-qn4-meta">{option.meta}</span> : null}
            </label>
          );
        })}
      </div>
    </>
  );
}
