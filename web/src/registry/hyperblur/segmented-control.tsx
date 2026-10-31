"use client";

import * as React from "react";

export interface SegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "children"> {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md";
  color?: string;
  fullWidth?: boolean;
}

const css = `
.hb-seg {
  --hb-p: 3px;
  position: relative;
  display: inline-flex;
  align-items: stretch;
  padding: var(--hb-p);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
  isolation: isolate;
}
.hb-seg[data-full="true"] { display: flex; width: 100%; }
.hb-seg[data-size="sm"] { border-radius: 10px; }
.hb-seg-t {
  position: absolute;
  top: var(--hb-p);
  bottom: var(--hb-p);
  left: 0;
  z-index: 0;
  width: var(--hb-tw, 0px);
  border-radius: 9px;
  background: var(--hb-c);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transform: translateX(var(--hb-tx, 0px));
  opacity: 0;
  pointer-events: none;
}
.hb-seg[data-size="sm"] .hb-seg-t { border-radius: 7px; }
.hb-seg[data-ready="true"] .hb-seg-t { opacity: 1; }
.hb-seg[data-anim="true"] .hb-seg-t {
  transition: transform 0.4s cubic-bezier(0.34, 1.3, 0.64, 1), width 0.4s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.hb-seg-i {
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  margin: 0;
  padding: 0.55em 1.1em;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.62);
  background: transparent;
  border: 0;
  border-radius: 9px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.2s ease;
}
.hb-seg[data-full="true"] .hb-seg-i { flex: 1 1 0; }
.hb-seg[data-size="sm"] .hb-seg-i { padding: 0.35em 0.85em; font-size: 13px; border-radius: 7px; }
.hb-seg-i:hover:not(:disabled) { color: rgba(255, 255, 255, 0.9); }
.hb-seg-i[aria-checked="true"] { color: #fff; }
.hb-seg-i:focus-visible { outline: 2px solid #2f7bff; outline-offset: 1px; }
.hb-seg-i:disabled { opacity: 0.4; cursor: not-allowed; }
.hb-seg:not([data-ready="true"]) .hb-seg-i[aria-checked="true"] { background: var(--hb-c); }
@media (prefers-reduced-motion: reduce) {
  .hb-seg[data-anim="true"] .hb-seg-t, .hb-seg-i { transition: none; }
}
`;

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  size = "md",
  color = "rgba(255,255,255,0.18)",
  fullWidth = false,
  className = "",
  style,
  ...rest
}: SegmentedControlProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const items = React.useRef(new Map<string, HTMLButtonElement>());
  const [inner, setInner] = React.useState(
    () => defaultValue ?? options.find((o) => !o.disabled)?.value ?? "",
  );
  const current = value !== undefined ? value : inner;
  const hasCurrent = options.some((o) => o.value === current);
  const tabValue = hasCurrent ? current : options.find((o) => !o.disabled)?.value;

  const measure = React.useCallback(() => {
    const box = root.current;
    const el = items.current.get(current);
    if (!box || !el) {
      if (box) box.dataset.ready = "false";
      return;
    }
    box.style.setProperty("--hb-tx", `${el.offsetLeft}px`);
    box.style.setProperty("--hb-tw", `${el.offsetWidth}px`);
    box.dataset.ready = "true";
  }, [current]);

  React.useLayoutEffect(() => {
    measure();
  }, [measure, options, size, fullWidth]);

  React.useEffect(() => {
    const box = root.current;
    if (!box) return;
    const frame = requestAnimationFrame(() => {
      box.dataset.anim = "true";
    });
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      observer.observe(box);
      items.current.forEach((el) => observer?.observe(el));
    }
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, options]);

  function select(next: string) {
    if (value === undefined) setInner(next);
    if (next !== current) onChange?.(next);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, from: string) {
    const enabled = options.filter((o) => !o.disabled);
    if (enabled.length === 0) return;
    const index = enabled.findIndex((o) => o.value === from);
    let target: SegmentedOption | undefined;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      target = enabled[(index + 1) % enabled.length];
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      target = enabled[(index - 1 + enabled.length) % enabled.length];
    } else if (e.key === "Home") {
      target = enabled[0];
    } else if (e.key === "End") {
      target = enabled[enabled.length - 1];
    }
    if (!target) return;
    e.preventDefault();
    items.current.get(target.value)?.focus();
    select(target.value);
  }

  const vars = { "--hb-c": color, ...style } as React.CSSProperties;

  return (
    <div
      ref={root}
      role="radiogroup"
      className={`hb-seg ${className}`}
      style={vars}
      data-size={size}
      data-full={fullWidth}
      {...rest}
    >
      <style href="hb-segmented-control" precedence="default">{css}</style>
      <span className="hb-seg-t" aria-hidden="true" />
      {options.map((opt) => {
        const active = opt.value === current;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              if (el) items.current.set(opt.value, el);
              else items.current.delete(opt.value);
            }}
            type="button"
            role="radio"
            aria-checked={active}
            className="hb-seg-i"
            disabled={opt.disabled}
            tabIndex={opt.value === tabValue ? 0 : -1}
            onClick={() => select(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
