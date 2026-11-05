"use client";

import * as React from "react";

export interface ButtonInkRippleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: "solid" | "outline" | "ghost";
  accent?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  idle?: boolean;
}

interface Ink {
  id: number;
  x: number;
  y: number;
  d: number;
}

const idlePoints = [
  [0.18, 0.55],
  [0.72, 0.35],
  [0.46, 0.75],
  [0.88, 0.62],
  [0.3, 0.3],
];

const css = `
.hb-ya1 {
  --hb-ya1-h: 2.5rem;
  --hb-ya1-fs: 0.9375rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: var(--hb-ya1-h);
  margin: 0;
  padding: 0 1.35em;
  overflow: hidden;
  isolation: isolate;
  font: inherit;
  font-size: var(--hb-ya1-fs);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.18s cubic-bezier(0.3, 1.4, 0.5, 1), background-color 0.2s ease, border-color 0.2s ease, filter 0.2s ease;
}
.hb-ya1 *, .hb-ya1 *::before, .hb-ya1 *::after { box-sizing: border-box; }
.hb-ya1[data-size="sm"] { --hb-ya1-h: 2.1rem; --hb-ya1-fs: 0.8125rem; }
.hb-ya1[data-size="lg"] { --hb-ya1-h: 3rem; --hb-ya1-fs: 1.0625rem; }
.hb-ya1[data-variant="solid"] {
  --hb-ya1-ink: rgba(255, 255, 255, 0.42);
  color: #fff;
  background: var(--hb-ya1-c);
}
.hb-ya1[data-variant="outline"] {
  --hb-ya1-ink: color-mix(in srgb, var(--hb-ya1-c) 38%, transparent);
  color: #ededed;
  background: transparent;
  border-color: color-mix(in srgb, var(--hb-ya1-c) 55%, #262626);
}
.hb-ya1[data-variant="ghost"] {
  --hb-ya1-ink: color-mix(in srgb, var(--hb-ya1-c) 30%, transparent);
  color: color-mix(in srgb, var(--hb-ya1-c) 70%, #fff);
  background: transparent;
}
.hb-ya1[data-variant="solid"]:not(:disabled):hover { filter: brightness(1.1); }
.hb-ya1[data-variant="outline"]:not(:disabled):hover { background: color-mix(in srgb, var(--hb-ya1-c) 9%, transparent); }
.hb-ya1[data-variant="ghost"]:not(:disabled):hover { background: color-mix(in srgb, var(--hb-ya1-c) 10%, transparent); }
.hb-ya1:not(:disabled):active { transform: scale(0.97); }
.hb-ya1:focus-visible { outline: 2px solid var(--hb-ya1-c); outline-offset: 3px; }
.hb-ya1:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-ya1[aria-busy="true"] { cursor: progress; }
.hb-ya1-inks {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}
.hb-ya1-ink {
  position: absolute;
  border-radius: 50%;
  background: var(--hb-ya1-ink);
  transform: scale(0);
  opacity: 0.9;
  animation: hb-ya1-spread 0.75s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.hb-ya1-label {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
}
.hb-ya1-spin {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-ya1-turn 0.7s linear infinite;
}
@keyframes hb-ya1-spread {
  0% { transform: scale(0); opacity: 0.9; }
  100% { transform: scale(1); opacity: 0; }
}
@keyframes hb-ya1-turn {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ya1 { transition: none; }
  .hb-ya1:not(:disabled):active { transform: none; }
  .hb-ya1-ink { animation-duration: 0.01s; }
  .hb-ya1-spin { animation-duration: 2s; }
}
`;

export function ButtonInkRipple({
  variant = "solid",
  accent = "#2f7bff",
  size = "md",
  loading = false,
  idle = false,
  disabled = false,
  type = "button",
  className = "",
  style,
  children,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
  onClick,
  ...rest
}: ButtonInkRippleProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const counter = React.useRef(0);
  const hovering = React.useRef(false);
  const [inks, setInks] = React.useState<Ink[]>([]);
  const blocked = disabled || loading;

  const spawn = React.useCallback((x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = Math.max(x, rect.width - x);
    const dy = Math.max(y, rect.height - y);
    const d = Math.hypot(dx, dy) * 2;
    counter.current += 1;
    const id = counter.current;
    setInks((list) => [...list.slice(-5), { id, x, y, d }]);
  }, []);

  React.useEffect(() => {
    if (!idle || blocked) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let step = 0;
    const timer = window.setInterval(() => {
      const el = ref.current;
      if (!el || hovering.current) return;
      const [fx, fy] = idlePoints[step % idlePoints.length];
      step += 1;
      spawn(fx * el.offsetWidth, fy * el.offsetHeight);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [idle, blocked, spawn]);

  const vars = { "--hb-ya1-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-ink-ripple" precedence="default">{css}</style>
      <button
        ref={ref}
        type={type}
        className={`hb-ya1 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        disabled={disabled}
        aria-busy={loading || undefined}
        onPointerEnter={(e) => {
          hovering.current = true;
          onPointerEnter?.(e);
        }}
        onPointerLeave={(e) => {
          hovering.current = false;
          onPointerLeave?.(e);
        }}
        onPointerDown={(e) => {
          onPointerDown?.(e);
          if (blocked || e.button !== 0) return;
          const rect = e.currentTarget.getBoundingClientRect();
          spawn(e.clientX - rect.left, e.clientY - rect.top);
        }}
        onClick={(e) => {
          if (loading) {
            e.preventDefault();
            return;
          }
          if (e.detail === 0 && !disabled) {
            const el = e.currentTarget;
            spawn(el.offsetWidth / 2, el.offsetHeight / 2);
          }
          onClick?.(e);
        }}
        {...rest}
      >
        <span className="hb-ya1-inks" aria-hidden="true">
          {inks.map((ink) => (
            <span
              key={ink.id}
              className="hb-ya1-ink"
              style={{
                left: `${(ink.x - ink.d / 2).toFixed(1)}px`,
                top: `${(ink.y - ink.d / 2).toFixed(1)}px`,
                width: `${ink.d.toFixed(1)}px`,
                height: `${ink.d.toFixed(1)}px`,
              }}
              onAnimationEnd={() => setInks((list) => list.filter((item) => item.id !== ink.id))}
            />
          ))}
        </span>
        <span className="hb-ya1-label">
          {loading ? <span className="hb-ya1-spin" aria-hidden="true" /> : null}
          {children}
        </span>
      </button>
    </>
  );
}
