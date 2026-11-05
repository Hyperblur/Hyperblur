"use client";

import * as React from "react";

export interface ButtonBubblesPopProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: "solid" | "outline" | "ghost";
  accent?: string;
  size?: "sm" | "md" | "lg";
  count?: number;
  idle?: boolean;
  loading?: boolean;
}

function mix(n: number) {
  let x = Math.imul(n + 0x6d2b79f5, 0x85ebca6b) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 0xc2b2ae35) >>> 0;
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

const css = `
.hb-ya8 {
  --hb-ya8-fs: 0.9375rem;
  --hb-ya8-h: 2.75rem;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
}
.hb-ya8 *, .hb-ya8 *::before, .hb-ya8 *::after { box-sizing: border-box; }
.hb-ya8[data-size="sm"] { --hb-ya8-fs: 0.8125rem; --hb-ya8-h: 2.25rem; }
.hb-ya8[data-size="lg"] { --hb-ya8-fs: 1.0625rem; --hb-ya8-h: 3.25rem; }
.hb-ya8-btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  height: var(--hb-ya8-h);
  margin: 0;
  padding: 0 1.5em;
  font: inherit;
  font-size: var(--hb-ya8-fs);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  transform-origin: 50% 100%;
  transition: transform 0.16s cubic-bezier(0.3, 1.4, 0.5, 1), background-color 0.2s ease, border-color 0.2s ease, filter 0.2s ease;
}
.hb-ya8[data-variant="solid"] .hb-ya8-btn { color: #fff; background: var(--hb-ya8-c); }
.hb-ya8[data-variant="outline"] .hb-ya8-btn {
  color: #ededed;
  background: transparent;
  border-color: color-mix(in srgb, var(--hb-ya8-c) 55%, #262626);
}
.hb-ya8[data-variant="ghost"] .hb-ya8-btn {
  color: color-mix(in srgb, var(--hb-ya8-c) 70%, #fff);
  background: color-mix(in srgb, var(--hb-ya8-c) 12%, transparent);
}
.hb-ya8[data-variant="solid"] .hb-ya8-btn:not(:disabled):hover { filter: brightness(1.1); }
.hb-ya8[data-variant="outline"] .hb-ya8-btn:not(:disabled):hover { background: color-mix(in srgb, var(--hb-ya8-c) 9%, transparent); }
.hb-ya8[data-variant="ghost"] .hb-ya8-btn:not(:disabled):hover { background: color-mix(in srgb, var(--hb-ya8-c) 20%, transparent); }
.hb-ya8-btn:not(:disabled):active { transform: scale(1.07, 0.88); }
.hb-ya8-btn[data-sq="a"] { animation: hb-ya8-rebound-a 0.6s cubic-bezier(0.3, 0.9, 0.3, 1); }
.hb-ya8-btn[data-sq="b"] { animation: hb-ya8-rebound-b 0.6s cubic-bezier(0.3, 0.9, 0.3, 1); }
.hb-ya8-btn:focus-visible { outline: 2px solid var(--hb-ya8-c); outline-offset: 3px; }
.hb-ya8-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-ya8-btn[aria-busy="true"] { cursor: progress; }
.hb-ya8-field {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 0;
  z-index: 2;
  pointer-events: none;
}
.hb-ya8-bubble {
  position: absolute;
  top: 0;
  width: var(--hb-ya8-s);
  height: var(--hb-ya8-s);
  margin: calc(var(--hb-ya8-s) / -2) 0 0 calc(var(--hb-ya8-s) / -2);
  border: 1px solid color-mix(in srgb, var(--hb-ya8-c) 65%, #fff);
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 28%, rgba(255, 255, 255, 0.85) 0, rgba(255, 255, 255, 0) 24%),
    radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--hb-ya8-c) 10%, transparent) 40%, color-mix(in srgb, var(--hb-ya8-c) 38%, transparent) 100%);
  opacity: 0;
  animation: hb-ya8-rise var(--hb-ya8-d) cubic-bezier(0.2, 0.6, 0.3, 1) var(--hb-ya8-w) both;
}
.hb-ya8-spin {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-ya8-turn 0.7s linear infinite;
}
@keyframes hb-ya8-rise {
  0% { opacity: 0; transform: translate(0, 4px) scale(0.35); }
  14% { opacity: 1; transform: translate(0, -6px) scale(1); }
  78% { opacity: 0.9; }
  100% { opacity: 0; transform: translate(var(--hb-ya8-x), calc(var(--hb-ya8-r) * -1)) scale(1.3); }
}
@keyframes hb-ya8-rebound-a {
  0% { transform: scale(1.1, 0.86); }
  34% { transform: scale(0.94, 1.1); }
  64% { transform: scale(1.03, 0.97); }
  100% { transform: scale(1); }
}
@keyframes hb-ya8-rebound-b {
  0% { transform: scale(1.1, 0.86); }
  34% { transform: scale(0.94, 1.1); }
  64% { transform: scale(1.03, 0.97); }
  100% { transform: scale(1); }
}
@keyframes hb-ya8-turn {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ya8-btn { transition: none; }
  .hb-ya8-btn:not(:disabled):active { transform: none; }
  .hb-ya8-btn[data-sq] { animation: none; }
  .hb-ya8-field { display: none; }
  .hb-ya8-spin { animation-duration: 2s; }
}
`;

export function ButtonBubblesPop({
  variant = "solid",
  accent = "#2f7bff",
  size = "md",
  count = 9,
  idle = false,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  style,
  children,
  onClick,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: ButtonBubblesPopProps) {
  const hovering = React.useRef(false);
  const timer = React.useRef(0);
  const [burst, setBurst] = React.useState(0);
  const [live, setLive] = React.useState(false);
  const blocked = disabled || loading;

  const pop = React.useCallback(() => {
    setBurst((n) => n + 1);
    setLive(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLive(false), 1800);
  }, []);

  React.useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  React.useEffect(() => {
    if (!idle || blocked) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!hovering.current) pop();
    }, 3200);
    return () => window.clearInterval(id);
  }, [idle, blocked, pop]);

  const total = Math.max(0, Math.min(24, Math.round(count)));
  const bubbles = live
    ? Array.from({ length: total }, (_, i) => {
        const seed = burst * 131 + i * 17;
        return {
          key: `${burst}-${i}`,
          left: 8 + mix(seed) * 84,
          s: 6 + mix(seed + 1) * 12,
          r: 54 + mix(seed + 2) * 62,
          x: (mix(seed + 3) - 0.5) * 36,
          w: mix(seed + 4) * 0.2,
          d: 0.95 + mix(seed + 5) * 0.7,
        };
      })
    : [];

  const vars = { "--hb-ya8-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-bubbles-pop" precedence="default">{css}</style>
      <span className={`hb-ya8 ${className}`} style={vars} data-variant={variant} data-size={size}>
        <button
          type={type}
          className="hb-ya8-btn"
          data-sq={burst === 0 ? undefined : burst % 2 === 0 ? "a" : "b"}
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
          onClick={(e) => {
            if (loading) {
              e.preventDefault();
              return;
            }
            pop();
            onClick?.(e);
          }}
          {...rest}
        >
          {loading ? <span className="hb-ya8-spin" aria-hidden="true" /> : null}
          {children}
        </button>
        <span className="hb-ya8-field" aria-hidden="true">
          {bubbles.map((b) => (
            <span
              key={b.key}
              className="hb-ya8-bubble"
              style={
                {
                  left: `${b.left.toFixed(1)}%`,
                  "--hb-ya8-s": `${b.s.toFixed(1)}px`,
                  "--hb-ya8-r": `${b.r.toFixed(0)}px`,
                  "--hb-ya8-x": `${b.x.toFixed(1)}px`,
                  "--hb-ya8-w": `${b.w.toFixed(2)}s`,
                  "--hb-ya8-d": `${b.d.toFixed(2)}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      </span>
    </>
  );
}
