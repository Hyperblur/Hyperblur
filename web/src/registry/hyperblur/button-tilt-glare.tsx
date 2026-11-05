"use client";

import * as React from "react";

export interface ButtonTiltGlareProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: "solid" | "light" | "dark";
  accent?: string;
  size?: "sm" | "md" | "lg";
  tilt?: number;
  sway?: boolean;
  loading?: boolean;
}

interface Pose {
  rx: number;
  ry: number;
  gx: number;
  gy: number;
  ga: number;
}

const css = `
.hb-ya6 {
  --hb-ya6-fs: 1.0625rem;
  --hb-ya6-rx: 0deg;
  --hb-ya6-ry: 0deg;
  --hb-ya6-gx: 50%;
  --hb-ya6-gy: 30%;
  --hb-ya6-ga: 0.3;
  --hb-ya6-sx: 0px;
  --hb-ya6-sy: 0px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0 0 8px;
  padding: 0.95em 2.1em;
  font: inherit;
  font-size: var(--hb-ya6-fs);
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid var(--hb-ya6-rim);
  border-radius: 18px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transform-style: preserve-3d;
  transform: perspective(560px) rotateX(var(--hb-ya6-rx)) rotateY(var(--hb-ya6-ry));
  will-change: transform;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 7px 0 var(--hb-ya6-edge),
    var(--hb-ya6-sx) calc(20px + var(--hb-ya6-sy)) 28px -6px rgba(0, 0, 0, 0.65);
  transition: translate 0.14s ease, box-shadow 0.14s ease, filter 0.2s ease;
}
.hb-ya6 *, .hb-ya6 *::before, .hb-ya6 *::after { box-sizing: border-box; }
.hb-ya6[data-size="sm"] { --hb-ya6-fs: 0.875rem; }
.hb-ya6[data-size="lg"] { --hb-ya6-fs: 1.25rem; }
.hb-ya6[data-variant="solid"] {
  --hb-ya6-edge: color-mix(in srgb, var(--hb-ya6-c) 52%, #000);
  --hb-ya6-rim: color-mix(in srgb, var(--hb-ya6-c) 70%, #fff);
  color: #fff;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-ya6-c) 80%, #fff), var(--hb-ya6-c));
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
}
.hb-ya6[data-variant="light"] {
  --hb-ya6-edge: #8d8d95;
  --hb-ya6-rim: #ffffff;
  color: #0a0a0a;
  background: linear-gradient(180deg, #ffffff, #dcdce0);
}
.hb-ya6[data-variant="dark"] {
  --hb-ya6-edge: #000000;
  --hb-ya6-rim: #34343a;
  color: #ededed;
  background: linear-gradient(180deg, #26262a, #151517);
}
.hb-ya6:not(:disabled):active {
  translate: 0 5px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 2px 0 var(--hb-ya6-edge),
    0 8px 14px -4px rgba(0, 0, 0, 0.6);
}
.hb-ya6:focus-visible { outline: 2px solid var(--hb-ya6-c); outline-offset: 5px; }
.hb-ya6:disabled { opacity: 0.45; cursor: not-allowed; filter: saturate(0.6); }
.hb-ya6[aria-busy="true"] { cursor: progress; }
.hb-ya6-glare {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at var(--hb-ya6-gx) var(--hb-ya6-gy), rgba(255, 255, 255, var(--hb-ya6-ga)) 0, rgba(255, 255, 255, 0) 58%);
  mix-blend-mode: soft-light;
}
.hb-ya6-sheen {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at var(--hb-ya6-gx) var(--hb-ya6-gy), rgba(255, 255, 255, calc(var(--hb-ya6-ga) * 0.35)) 0, rgba(255, 255, 255, 0) 38%);
}
.hb-ya6-label {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  transform: translateZ(16px);
}
.hb-ya6-spin {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-ya6-turn 0.7s linear infinite;
}
@keyframes hb-ya6-turn {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ya6 { transition: none; transform: none; }
  .hb-ya6-label { transform: none; }
  .hb-ya6-spin { animation-duration: 2s; }
}
`;

export function ButtonTiltGlare({
  variant = "solid",
  accent = "#2f7bff",
  size = "md",
  tilt = 14,
  sway = true,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  style,
  children,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  onClick,
  ...rest
}: ButtonTiltGlareProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const hover = React.useRef(false);
  const target = React.useRef<Pose>({ rx: 0, ry: 0, gx: 50, gy: 30, ga: 0.3 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cur: Pose = { rx: 0, ry: 0, gx: 50, gy: 30, ga: 0.3 };
    const amp = Math.max(0, tilt);
    let raf = 0;
    let visible = true;

    function frame(now: number) {
      if (!el) return;
      const goal = target.current;
      if (!hover.current) {
        goal.rx = sway ? Math.sin(now * 0.0013) * amp * 0.35 : 0;
        goal.ry = sway ? Math.sin(now * 0.001 + 1.2) * amp * 0.6 : 0;
        goal.gx = 50 + (sway ? Math.sin(now * 0.001 + 1.2) * 34 : 0);
        goal.gy = 32 + (sway ? Math.cos(now * 0.0013) * 18 : 0);
        goal.ga = 0.38;
      }
      const k = 0.13;
      cur.rx += (goal.rx - cur.rx) * k;
      cur.ry += (goal.ry - cur.ry) * k;
      cur.gx += (goal.gx - cur.gx) * k;
      cur.gy += (goal.gy - cur.gy) * k;
      cur.ga += (goal.ga - cur.ga) * k;
      el.style.setProperty("--hb-ya6-rx", `${cur.rx.toFixed(2)}deg`);
      el.style.setProperty("--hb-ya6-ry", `${cur.ry.toFixed(2)}deg`);
      el.style.setProperty("--hb-ya6-gx", `${cur.gx.toFixed(1)}%`);
      el.style.setProperty("--hb-ya6-gy", `${cur.gy.toFixed(1)}%`);
      el.style.setProperty("--hb-ya6-ga", cur.ga.toFixed(3));
      el.style.setProperty("--hb-ya6-sx", `${(-cur.ry * 1.1).toFixed(1)}px`);
      el.style.setProperty("--hb-ya6-sy", `${(cur.rx * 1.1).toFixed(1)}px`);
      raf = requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => {
      const next = entry.isIntersecting;
      if (next === visible) return;
      visible = next;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    observer.observe(el);
    raf = requestAnimationFrame(frame);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [tilt, sway]);

  function aim(e: React.PointerEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const ny = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    const amp = Math.max(0, tilt);
    const goal = target.current;
    goal.rx = -(ny - 0.5) * 2 * amp * 0.7;
    goal.ry = (nx - 0.5) * 2 * amp;
    goal.gx = nx * 100;
    goal.gy = ny * 100;
    goal.ga = 0.85;
  }

  const vars = { "--hb-ya6-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-tilt-glare" precedence="default">{css}</style>
      <button
        ref={ref}
        type={type}
        className={`hb-ya6 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        disabled={disabled}
        aria-busy={loading || undefined}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          if (disabled || e.pointerType === "touch") return;
          hover.current = true;
          aim(e);
        }}
        onPointerMove={(e) => {
          onPointerMove?.(e);
          if (!hover.current) return;
          aim(e);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          hover.current = false;
        }}
        onClick={(e) => {
          if (loading) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...rest}
      >
        <span className="hb-ya6-glare" aria-hidden="true" />
        <span className="hb-ya6-sheen" aria-hidden="true" />
        <span className="hb-ya6-label">
          {loading ? <span className="hb-ya6-spin" aria-hidden="true" /> : null}
          {children}
        </span>
      </button>
    </>
  );
}
