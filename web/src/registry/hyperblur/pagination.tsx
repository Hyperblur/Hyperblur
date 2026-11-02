"use client";

import * as React from "react";

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children"> {
  total?: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  siblings?: number;
  boundaries?: number;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "compact";
  accent?: string;
}

type Slot = number | "gap-start" | "gap-end";

const css = `
.hb-pag {
  --hb-pag-accent: #2f7bff;
  --hb-pag-h: 34px;
  --hb-pag-fs: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: var(--hb-pag-fs);
}
.hb-pag *, .hb-pag *::before, .hb-pag *::after { box-sizing: border-box; }
.hb-pag[data-size="sm"] { --hb-pag-h: 28px; --hb-pag-fs: 12px; }
.hb-pag[data-size="lg"] { --hb-pag-h: 40px; --hb-pag-fs: 14px; }
.hb-pag-row {
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: 100%;
}
.hb-pag-list {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
}
.hb-pag-ind {
  position: absolute;
  top: 0;
  left: 0;
  height: var(--hb-pag-h);
  width: var(--hb-pag-w, 0px);
  border-radius: calc(var(--hb-pag-h) * 0.3);
  background: var(--hb-pag-accent);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--hb-pag-accent) 38%, transparent);
  transform: translateX(var(--hb-pag-x, 0px));
  opacity: 0;
  pointer-events: none;
}
.hb-pag-list[data-ready="true"] .hb-pag-ind { opacity: 1; }
.hb-pag-list[data-anim="true"] .hb-pag-ind {
  transition: transform 0.38s cubic-bezier(0.34, 1.25, 0.64, 1), width 0.38s cubic-bezier(0.34, 1.25, 0.64, 1);
}
.hb-pag-btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  min-width: var(--hb-pag-h);
  height: var(--hb-pag-h);
  margin: 0;
  padding: 0 calc(var(--hb-pag-h) * 0.28);
  border: 0;
  border-radius: calc(var(--hb-pag-h) * 0.3);
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;
}
.hb-pag-btn:hover { color: #ededed; background: rgba(255, 255, 255, 0.07); }
.hb-pag-btn[aria-current="page"] { color: #fff; font-weight: 600; background: transparent; }
.hb-pag-list:not([data-ready="true"]) .hb-pag-btn[aria-current="page"] { background: var(--hb-pag-accent); }
.hb-pag-btn:focus-visible, .hb-pag-sel:focus-visible {
  outline: 2px solid var(--hb-pag-accent);
  outline-offset: 2px;
}
.hb-pag-nav {
  border: 1px solid #262626;
  background: #111111;
  color: #ededed;
}
.hb-pag-nav:hover { border-color: #333333; background: #171717; }
.hb-pag-nav[aria-disabled="true"] { opacity: 0.35; cursor: not-allowed; pointer-events: none; }
.hb-pag-nav svg, .hb-pag-sel-wrap svg { width: 14px; height: 14px; flex: none; }
.hb-pag-gap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: calc(var(--hb-pag-h) * 0.8);
  height: var(--hb-pag-h);
  color: #6b6b6b;
  letter-spacing: 0.1em;
  user-select: none;
}
.hb-pag-compact {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #8f8f8f;
}
.hb-pag-sel-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.hb-pag-sel {
  appearance: none;
  height: var(--hb-pag-h);
  margin: 0;
  padding: 0 28px 0 12px;
  border: 1px solid #262626;
  border-radius: calc(var(--hb-pag-h) * 0.3);
  background: #111111;
  color: #ededed;
  font: inherit;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.hb-pag-sel:hover { border-color: #333333; background: #171717; }
.hb-pag-sel-wrap svg {
  position: absolute;
  right: 9px;
  color: #8f8f8f;
  pointer-events: none;
}
.hb-pag-total { white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-pag-list[data-anim="true"] .hb-pag-ind, .hb-pag-btn, .hb-pag-sel { transition: none; }
}
`;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function buildSlots(total: number, page: number, siblings: number, boundaries: number): Slot[] {
  const keep = new Set<number>();
  for (let i = 1; i <= Math.min(boundaries, total); i += 1) {
    keep.add(i);
    keep.add(total - i + 1);
  }
  for (let i = page - siblings; i <= page + siblings; i += 1) {
    if (i >= 1 && i <= total) keep.add(i);
  }
  keep.add(page);
  const sorted = [...keep].sort((a, b) => a - b);
  const slots: Slot[] = [];
  sorted.forEach((n, index) => {
    const prev = sorted[index - 1];
    if (prev !== undefined) {
      const gap = n - prev;
      if (gap === 2) slots.push(prev + 1);
      else if (gap > 2) slots.push(n < page ? "gap-start" : "gap-end");
    }
    slots.push(n);
  });
  return slots;
}

const chevronLeft = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 3.5 5.5 8 10 12.5" />
  </svg>
);
const chevronRight = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 3.5 4.5 4.5L6 12.5" />
  </svg>
);
const chevronDown = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4 6.25 4 4 4-4" />
  </svg>
);

export function Pagination({
  total = 12,
  page,
  defaultPage = 1,
  onPageChange,
  siblings = 1,
  boundaries = 1,
  size = "md",
  variant = "full",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PaginationProps) {
  const count = Math.max(1, Math.floor(total));
  const [inner, setInner] = React.useState(defaultPage);
  const current = clamp(page !== undefined ? page : inner, 1, count);
  const list = React.useRef<HTMLDivElement>(null);
  const nav = React.useRef<HTMLElement>(null);
  const buttons = React.useRef(new Map<number, HTMLButtonElement>());
  const slots = React.useMemo(
    () => buildSlots(count, current, Math.max(0, siblings), Math.max(0, boundaries)),
    [count, current, siblings, boundaries],
  );
  const selectId = React.useId();

  const measure = React.useCallback(() => {
    const box = list.current;
    const el = buttons.current.get(current);
    if (!box) return;
    if (!el) {
      box.dataset.ready = "false";
      return;
    }
    box.style.setProperty("--hb-pag-x", `${el.offsetLeft}px`);
    box.style.setProperty("--hb-pag-w", `${el.offsetWidth}px`);
    box.dataset.ready = "true";
  }, [current]);

  React.useLayoutEffect(() => {
    measure();
  }, [measure, slots, size, variant]);

  React.useEffect(() => {
    const box = list.current;
    if (!box) return;
    const frame = requestAnimationFrame(() => {
      box.dataset.anim = "true";
    });
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      observer.observe(box);
    }
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, variant, slots]);

  function go(next: number) {
    const target = clamp(next, 1, count);
    if (target === current) return;
    if (page === undefined) setInner(target);
    onPageChange?.(target);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const target = e.target as HTMLElement;
    if (target.tagName === "SELECT") return;
    const focusables = Array.from(
      nav.current?.querySelectorAll<HTMLElement>("button:not(:disabled)") ?? [],
    );
    const index = focusables.indexOf(target);
    if (index < 0) return;
    let next = index;
    if (e.key === "ArrowLeft") next = Math.max(0, index - 1);
    else if (e.key === "ArrowRight") next = Math.min(focusables.length - 1, index + 1);
    else if (e.key === "Home") next = 0;
    else next = focusables.length - 1;
    e.preventDefault();
    focusables[next]?.focus();
  }

  const atStart = current <= 1;
  const atEnd = current >= count;
  const vars = { "--hb-pag-accent": accent, ...style } as React.CSSProperties;

  const prev = (
    <button
      type="button"
      className="hb-pag-btn hb-pag-nav"
      aria-label="Previous page"
      aria-disabled={atStart}
      onClick={() => go(current - 1)}
    >
      {chevronLeft}
    </button>
  );
  const next = (
    <button
      type="button"
      className="hb-pag-btn hb-pag-nav"
      aria-label="Next page"
      aria-disabled={atEnd}
      onClick={() => go(current + 1)}
    >
      {chevronRight}
    </button>
  );

  return (
    <nav
      ref={nav}
      aria-label="Pagination"
      className={`hb-pag ${className}`}
      style={vars}
      data-size={size}
      data-variant={variant}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <style href="hb-pagination" precedence="default">{css}</style>
      {variant === "compact" ? (
        <div className="hb-pag-row">
          {prev}
          <div className="hb-pag-compact">
            <label htmlFor={selectId}>Page</label>
            <span className="hb-pag-sel-wrap">
              <select
                id={selectId}
                className="hb-pag-sel"
                value={current}
                onChange={(e) => go(Number(e.target.value))}
              >
                {Array.from({ length: count }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {chevronDown}
            </span>
            <span className="hb-pag-total">of {count}</span>
          </div>
          {next}
        </div>
      ) : (
        <div className="hb-pag-row">
          {prev}
          <div ref={list} className="hb-pag-list">
            <span className="hb-pag-ind" aria-hidden="true" />
            {slots.map((slot) =>
              typeof slot === "number" ? (
                <button
                  key={slot}
                  ref={(el) => {
                    if (el) buttons.current.set(slot, el);
                    else buttons.current.delete(slot);
                  }}
                  type="button"
                  className="hb-pag-btn"
                  aria-label={`Page ${slot}`}
                  aria-current={slot === current ? "page" : undefined}
                  onClick={() => go(slot)}
                >
                  {slot}
                </button>
              ) : (
                <span key={slot} className="hb-pag-gap" aria-hidden="true">
                  &hellip;
                </span>
              ),
            )}
          </div>
          {next}
        </div>
      )}
    </nav>
  );
}
