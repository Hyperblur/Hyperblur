"use client";

import * as React from "react";

export type ButtonSpecularTone = "chrome" | "glass" | "blue";

export interface ButtonSpecularProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonSpecularTone;
  tilt?: number;
  shine?: number;
  idle?: boolean;
}

const css = `
.hb-qv1 {
  --hb-qv1-x: 50%;
  --hb-qv1-y: 30%;
  --hb-qv1-rx: 0deg;
  --hb-qv1-ry: 0deg;
  --hb-qv1-k: 1;
  --hb-qv1-b1: #50535c;
  --hb-qv1-b2: #17181c;
  --hb-qv1-fg: #f3f5f9;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55em;
  box-sizing: border-box;
  margin: 0;
  padding: 0.85em 1.7em;
  font: inherit;
  font-weight: 600;
  letter-spacing: -0.005em;
  line-height: 1.1;
  color: var(--hb-qv1-fg);
  background: linear-gradient(180deg, var(--hb-qv1-b1), var(--hb-qv1-b2));
  border: 0;
  border-radius: 14px;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  transform: perspective(520px) rotateX(var(--hb-qv1-rx)) rotateY(var(--hb-qv1-ry));
  scale: 1;
  transition: scale 0.18s cubic-bezier(0.3, 1.4, 0.5, 1), filter 0.2s ease, box-shadow 0.2s ease;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.34),
    inset 0 -2px 4px rgba(0, 0, 0, 0.38),
    0 12px 24px -12px rgba(0, 0, 0, 0.8),
    0 2px 3px rgba(0, 0, 0, 0.45);
}
.hb-qv1 *, .hb-qv1 *::before, .hb-qv1 *::after { box-sizing: border-box; }
.hb-qv1[data-tone="glass"] {
  --hb-qv1-b1: rgba(255, 255, 255, 0.16);
  --hb-qv1-b2: rgba(255, 255, 255, 0.04);
  -webkit-backdrop-filter: blur(14px) saturate(1.4);
  backdrop-filter: blur(14px) saturate(1.4);
}
.hb-qv1[data-tone="blue"] {
  --hb-qv1-b1: #639fff;
  --hb-qv1-b2: #1a4ccb;
  --hb-qv1-fg: #ffffff;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.45),
    inset 0 -2px 4px rgba(8, 24, 90, 0.45),
    0 14px 28px -12px rgba(47, 123, 255, 0.65),
    0 2px 3px rgba(0, 0, 0, 0.4);
}
.hb-qv1:hover:not(:disabled) { filter: brightness(1.07); }
.hb-qv1:active:not(:disabled) {
  scale: 0.962;
  filter: brightness(0.94);
  box-shadow:
    inset 0 2px 6px rgba(0, 0, 0, 0.55),
    inset 0 -1px 0 rgba(255, 255, 255, 0.12),
    0 4px 10px -6px rgba(0, 0, 0, 0.8);
}
.hb-qv1:focus-visible { outline: 2px solid #7fb3ff; outline-offset: 3px; }
.hb-qv1:disabled { opacity: 0.5; cursor: not-allowed; }
.hb-qv1-gl, .hb-qv1-st, .hb-qv1-bv {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}
.hb-qv1-gl {
  z-index: 0;
  mix-blend-mode: screen;
  background: radial-gradient(
    ellipse 62% 150% at var(--hb-qv1-x) var(--hb-qv1-y),
    rgba(255, 255, 255, calc(0.5 * var(--hb-qv1-k))),
    rgba(255, 255, 255, 0) 100%
  );
}
.hb-qv1-st {
  z-index: 0;
  background:
    linear-gradient(
      105deg,
      transparent calc(var(--hb-qv1-x) - 13%),
      rgba(255, 255, 255, calc(0.3 * var(--hb-qv1-k))) var(--hb-qv1-x),
      transparent calc(var(--hb-qv1-x) + 13%)
    ),
    linear-gradient(
      105deg,
      transparent calc(100% - var(--hb-qv1-x) - 4%),
      rgba(255, 255, 255, calc(0.16 * var(--hb-qv1-k))) calc(100% - var(--hb-qv1-x)),
      transparent calc(100% - var(--hb-qv1-x) + 4%)
    );
}
.hb-qv1-bv {
  z-index: 1;
  padding: 1px;
  background: radial-gradient(
    ellipse 75% 190% at var(--hb-qv1-x) var(--hb-qv1-y),
    rgba(255, 255, 255, calc(0.95 * var(--hb-qv1-k))),
    rgba(255, 255, 255, 0.2) 55%,
    rgba(255, 255, 255, 0.07)
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
.hb-qv1-tx {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.42);
}
@media (prefers-reduced-motion: reduce) {
  .hb-qv1 { transition: none; }
  .hb-qv1:active:not(:disabled) { scale: 1; }
}
`;

export function ButtonSpecular({
  tone = "chrome",
  tilt = 6,
  shine = 1,
  idle = true,
  type = "button",
  className = "",
  style,
  children,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  ...rest
}: ButtonSpecularProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const wake = React.useRef<(() => void) | null>(null);
  const sim = React.useRef({ x: 0.5, y: 0.3, tx: 0.5, ty: 0.3, active: false, visible: true, running: false, raf: 0 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const s = sim.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function write() {
      if (!el) return;
      const k = s.active ? 1 : 0.4;
      el.style.setProperty("--hb-qv1-x", `${(s.x * 100).toFixed(2)}%`);
      el.style.setProperty("--hb-qv1-y", `${(s.y * 100).toFixed(2)}%`);
      el.style.setProperty("--hb-qv1-rx", `${((0.5 - s.y) * 2 * tilt * k).toFixed(2)}deg`);
      el.style.setProperty("--hb-qv1-ry", `${((s.x - 0.5) * 2 * tilt * k).toFixed(2)}deg`);
    }

    function tick(ts: number) {
      s.running = false;
      if (!s.visible) return;
      if (!s.active && idle) {
        const t = ts / 1000;
        s.tx = 0.5 + 0.38 * Math.sin(t * 0.9);
        s.ty = 0.36 + 0.16 * Math.sin(t * 1.4 + 1);
      }
      s.x += (s.tx - s.x) * 0.14;
      s.y += (s.ty - s.y) * 0.14;
      write();
      const moving = Math.abs(s.tx - s.x) > 0.001 || Math.abs(s.ty - s.y) > 0.001;
      if (idle || s.active || moving) {
        s.running = true;
        s.raf = requestAnimationFrame(tick);
      }
    }

    function ensure() {
      if (reduced) {
        s.x = s.tx;
        s.y = s.ty;
        write();
        return;
      }
      if (s.running || !s.visible) return;
      s.running = true;
      s.raf = requestAnimationFrame(tick);
    }

    wake.current = ensure;
    ensure();

    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
      if (s.visible) ensure();
    });
    io.observe(el);

    return () => {
      wake.current = null;
      io.disconnect();
      cancelAnimationFrame(s.raf);
      s.running = false;
    };
  }, [idle, tilt]);

  function aim(e: React.PointerEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const s = sim.current;
    s.active = true;
    s.tx = Math.min(1, Math.max(0, (e.clientX - r.left) / Math.max(1, r.width)));
    s.ty = Math.min(1, Math.max(0, (e.clientY - r.top) / Math.max(1, r.height)));
    wake.current?.();
  }

  const vars = { "--hb-qv1-k": shine, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-specular" precedence="default">{css}</style>
      <button
        ref={ref}
        type={type}
        data-tone={tone}
        className={`hb-qv1 ${className}`}
        style={vars}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          aim(e);
        }}
        onPointerMove={(e) => {
          onPointerMove?.(e);
          aim(e);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          const s = sim.current;
          s.active = false;
          if (!idle) {
            s.tx = 0.5;
            s.ty = 0.3;
          }
          wake.current?.();
        }}
        {...rest}
      >
        <span className="hb-qv1-gl" aria-hidden="true" />
        <span className="hb-qv1-st" aria-hidden="true" />
        <span className="hb-qv1-bv" aria-hidden="true" />
        <span className="hb-qv1-tx">{children}</span>
      </button>
    </>
  );
}
