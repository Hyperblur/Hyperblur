"use client";

import * as React from "react";

export interface ButtonSlideFillProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: "outline" | "solid";
  accent?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  idle?: boolean;
}

type Side = "left" | "right" | "top" | "bottom";

const css = `
.hb-qa2 {
  --hb-qa2-c: #2f7bff;
  --hb-qa2-bg: transparent;
  --hb-qa2-fg: #ededed;
  --hb-qa2-fill: #ededed;
  --hb-qa2-ink: #0a0a0a;
  --hb-qa2-ring: #333333;
  --hb-qa2-closed: inset(0 100% 0 0);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0.8em 1.6em;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--hb-qa2-fg);
  background: var(--hb-qa2-bg);
  border: 0;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px var(--hb-qa2-ring);
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-qa2[data-size="sm"] { font-size: 13px; }
.hb-qa2[data-size="lg"] { font-size: 17px; }
.hb-qa2[data-variant="solid"] {
  --hb-qa2-bg: var(--hb-qa2-c);
  --hb-qa2-fg: #ffffff;
  --hb-qa2-fill: #ffffff;
  --hb-qa2-ink: #0a0a0a;
  --hb-qa2-ring: transparent;
}
.hb-qa2[data-side="left"] { --hb-qa2-closed: inset(0 100% 0 0); }
.hb-qa2[data-side="right"] { --hb-qa2-closed: inset(0 0 0 100%); }
.hb-qa2[data-side="top"] { --hb-qa2-closed: inset(0 0 100% 0); }
.hb-qa2[data-side="bottom"] { --hb-qa2-closed: inset(100% 0 0 0); }
.hb-qa2-t, .hb-qa2-o {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  white-space: nowrap;
}
.hb-qa2-o {
  position: absolute;
  inset: 0;
  z-index: 1;
  color: var(--hb-qa2-ink);
  background: var(--hb-qa2-fill);
  clip-path: var(--hb-qa2-closed);
  transition: clip-path 0.42s cubic-bezier(0.65, 0, 0.25, 1);
  pointer-events: none;
}
.hb-qa2[data-snap="true"] .hb-qa2-o { transition: none; }
.hb-qa2[data-active="true"] .hb-qa2-o { clip-path: inset(0 0 0 0); }
.hb-qa2[data-idle="true"][data-active="false"] .hb-qa2-o {
  animation: hb-qa2-sweep 4.8s cubic-bezier(0.65, 0, 0.25, 1) infinite;
}
.hb-qa2:active:not(:disabled) { transform: scale(0.97); }
.hb-qa2:focus-visible { outline: 2px solid var(--hb-qa2-c); outline-offset: 3px; }
.hb-qa2:disabled { cursor: not-allowed; }
.hb-qa2:disabled:not([aria-busy="true"]) { opacity: 0.45; }
.hb-qa2-sp {
  width: 1em;
  height: 1em;
  flex: none;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-qa2-spin 0.7s linear infinite;
}
@keyframes hb-qa2-spin { to { transform: rotate(360deg); } }
@keyframes hb-qa2-sweep {
  0%, 62% { clip-path: inset(0 100% 0 0); }
  74%, 80% { clip-path: inset(0 0 0 0); }
  92%, 100% { clip-path: inset(0 0 0 100%); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qa2, .hb-qa2-o { transition: none; }
  .hb-qa2[data-idle="true"][data-active="false"] .hb-qa2-o { animation: none; }
  .hb-qa2:active:not(:disabled) { transform: none; }
  .hb-qa2-sp { animation-duration: 1.6s; }
}
`;

function nearestSide(el: HTMLElement, x: number, y: number): Side {
  const r = el.getBoundingClientRect();
  const dl = Math.abs(x - r.left);
  const dr = Math.abs(r.right - x);
  const dt = Math.abs(y - r.top);
  const db = Math.abs(r.bottom - y);
  const m = Math.min(dl, dr, dt, db);
  if (m === dl) return "left";
  if (m === dr) return "right";
  if (m === dt) return "top";
  return "bottom";
}

export function ButtonSlideFill({
  children = "Join the waitlist",
  variant = "outline",
  accent = "#2f7bff",
  size = "md",
  loading = false,
  disabled = false,
  idle = true,
  type = "button",
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: ButtonSlideFillProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const timer = React.useRef(0);
  const inert = disabled || loading;

  React.useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  function open(el: HTMLButtonElement, side: Side) {
    window.clearTimeout(timer.current);
    el.dataset.idle = "false";
    el.dataset.snap = "true";
    el.dataset.side = side;
    void el.offsetWidth;
    el.dataset.snap = "false";
    el.dataset.active = "true";
  }

  function close(el: HTMLButtonElement, side: Side) {
    el.dataset.side = side;
    el.dataset.active = "false";
    timer.current = window.setTimeout(() => {
      el.dataset.idle = idle ? "true" : "false";
    }, 1400);
  }

  const vars = { "--hb-qa2-c": accent, ...style } as React.CSSProperties;
  const label = (
    <>
      {loading ? <span className="hb-qa2-sp" aria-hidden="true" /> : null}
      {children}
    </>
  );

  return (
    <>
      <style href="hb-button-slide-fill" precedence="default">{css}</style>
      <button
        ref={ref}
        type={type}
        className={`hb-qa2 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        data-side="left"
        data-active="false"
        data-idle={idle ? "true" : "false"}
        data-snap="false"
        disabled={inert}
        aria-busy={loading || undefined}
        onPointerEnter={(e) => {
          if (!inert) open(e.currentTarget, nearestSide(e.currentTarget, e.clientX, e.clientY));
          onPointerEnter?.(e);
        }}
        onPointerLeave={(e) => {
          close(e.currentTarget, nearestSide(e.currentTarget, e.clientX, e.clientY));
          onPointerLeave?.(e);
        }}
        onFocus={(e) => {
          if (!inert && e.currentTarget.matches(":focus-visible")) open(e.currentTarget, "left");
          onFocus?.(e);
        }}
        onBlur={(e) => {
          close(e.currentTarget, "right");
          onBlur?.(e);
        }}
        {...rest}
      >
        <span className="hb-qa2-t">{label}</span>
        <span className="hb-qa2-o" aria-hidden="true">{label}</span>
      </button>
    </>
  );
}
