"use client";

import * as React from "react";

export interface ButtonElasticStretchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  accent?: string;
  stretch?: number;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-xa2 {
  --hb-xa2-c: #ff5c8a;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0.95em 1.8em;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.01em;
  color: #fff;
  background: transparent;
  border: 0;
  border-radius: 999px;
  cursor: grab;
  isolation: isolate;
  touch-action: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-xa2 *, .hb-xa2 *::before, .hb-xa2 *::after { box-sizing: border-box; }
.hb-xa2[data-size="sm"] { font-size: 13px; }
.hb-xa2[data-size="lg"] { font-size: 17px; }
.hb-xa2[data-held="true"] { cursor: grabbing; }
.hb-xa2:focus-visible { outline: none; }
.hb-xa2:focus-visible .hb-xa2-body { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-xa2-c), inset 0 2px 1px rgba(255, 255, 255, 0.45), inset 0 -6px 12px rgba(0, 0, 0, 0.22); }
.hb-xa2:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xa2-body {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background:
    radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--hb-xa2-c) 70%, #fff) 0%, transparent 60%),
    linear-gradient(180deg, var(--hb-xa2-c), color-mix(in srgb, var(--hb-xa2-c) 72%, #3a0016));
  box-shadow:
    inset 0 2px 1px rgba(255, 255, 255, 0.45),
    inset 0 -6px 12px rgba(0, 0, 0, 0.22),
    0 14px 26px -12px color-mix(in srgb, var(--hb-xa2-c) 75%, transparent),
    0 3px 6px -2px rgba(0, 0, 0, 0.5);
  will-change: transform;
}
.hb-xa2-body::before {
  content: "";
  position: absolute;
  left: 14%;
  right: 14%;
  top: 9%;
  height: 34%;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0));
  filter: blur(0.5px);
}
.hb-xa2-body::after {
  content: "";
  position: absolute;
  right: 12%;
  top: 22%;
  width: 0.38em;
  height: 0.38em;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  filter: blur(0.4px);
}
.hb-xa2-label {
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  white-space: nowrap;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  will-change: transform;
}
.hb-xa2-label svg { width: 1.1em; height: 1.1em; flex: none; }
`;

function Bag() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.5 7h11l-.8 9.2a1.5 1.5 0 0 1-1.5 1.3H6.8a1.5 1.5 0 0 1-1.5-1.3L4.5 7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M7.5 9V6a2.5 2.5 0 0 1 5 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ButtonElasticStretch({
  children = "Add to cart",
  accent = "#ff5c8a",
  stretch = 1,
  icon,
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  style,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  onKeyDown,
  ...rest
}: ButtonElasticStretchProps) {
  const bodyRef = React.useRef<HTMLSpanElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);
  const [held, setHeld] = React.useState(false);
  const sim = React.useRef({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, held: false, sx: 0, sy: 0, raf: 0, reduce: false, k: 1, kick: () => {} });

  React.useEffect(() => {
    const s = sim.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    s.reduce = mq.matches;
    const onMq = () => {
      s.reduce = mq.matches;
    };
    mq.addEventListener("change", onMq);

    function paint() {
      const k = Math.max(0, s.k);
      const ax = Math.abs(s.x);
      const ay = Math.abs(s.y);
      const scx = 1 + (ax * 0.0045 - ay * 0.0018) * k;
      const scy = 1 + (ay * 0.006 - ax * 0.0022) * k;
      if (bodyRef.current) {
        bodyRef.current.style.transform = `translate(${(s.x * 0.5).toFixed(2)}px, ${(s.y * 0.5).toFixed(2)}px) scale(${scx.toFixed(4)}, ${scy.toFixed(4)})`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${(s.x * 0.62).toFixed(2)}px, ${(s.y * 0.62).toFixed(2)}px)`;
      }
    }

    function tick() {
      s.raf = 0;
      const stiff = s.held ? 0.28 : 0.14;
      const damp = s.held ? 0.62 : 0.8;
      s.vx = (s.vx + (s.tx - s.x) * stiff) * damp;
      s.vy = (s.vy + (s.ty - s.y) * stiff) * damp;
      s.x += s.vx;
      s.y += s.vy;
      paint();
      const moving = Math.abs(s.vx) + Math.abs(s.vy) + Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > 0.02;
      if (moving) s.raf = requestAnimationFrame(tick);
      else {
        s.x = s.tx;
        s.y = s.ty;
        paint();
      }
    }

    s.kick = () => {
      if (s.reduce) return;
      if (!s.raf) s.raf = requestAnimationFrame(tick);
    };

    return () => {
      cancelAnimationFrame(s.raf);
      s.raf = 0;
      s.kick = () => {};
      mq.removeEventListener("change", onMq);
    };
  }, []);

  React.useEffect(() => {
    sim.current.k = stretch;
  }, [stretch]);

  function kick() {
    sim.current.kick();
  }

  function rubber(d: number, limit: number) {
    return (d * limit) / (limit + Math.abs(d));
  }

  function aim(e: React.PointerEvent<HTMLButtonElement>) {
    const s = sim.current;
    const r = e.currentTarget.getBoundingClientRect();
    if (s.held) {
      s.tx = rubber(e.clientX - s.sx, 70);
      s.ty = rubber(e.clientY - s.sy, 40);
    } else {
      s.tx = (e.clientX - (r.left + r.width / 2)) * 0.12;
      s.ty = (e.clientY - (r.top + r.height / 2)) * 0.16;
    }
    kick();
  }

  function rest0() {
    const s = sim.current;
    s.tx = 0;
    s.ty = 0;
    kick();
  }

  function release() {
    const s = sim.current;
    if (!s.held) return;
    s.held = false;
    setHeld(false);
    s.vx += -s.x * 0.18;
    s.vy += -s.y * 0.18;
    rest0();
  }

  const vars = { "--hb-xa2-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-elastic-stretch" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-xa2 ${className}`}
        style={vars}
        data-size={size}
        data-held={held || undefined}
        disabled={disabled}
        onPointerDown={(e) => {
          const s = sim.current;
          s.held = true;
          s.sx = e.clientX;
          s.sy = e.clientY;
          s.tx = 0;
          s.ty = 4;
          setHeld(true);
          e.currentTarget.setPointerCapture?.(e.pointerId);
          kick();
          onPointerDown?.(e);
        }}
        onPointerMove={(e) => {
          aim(e);
          onPointerMove?.(e);
        }}
        onPointerUp={(e) => {
          release();
          onPointerUp?.(e);
        }}
        onPointerCancel={(e) => {
          release();
          onPointerCancel?.(e);
        }}
        onPointerLeave={(e) => {
          if (!sim.current.held) rest0();
          onPointerLeave?.(e);
        }}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            const s = sim.current;
            s.vx = 0;
            s.vy = 9;
            kick();
          }
          onKeyDown?.(e);
        }}
        {...rest}
      >
        <span ref={bodyRef} className="hb-xa2-body" aria-hidden="true" />
        <span ref={labelRef} className="hb-xa2-label">
          {icon === undefined ? <Bag /> : icon}
          {children}
        </span>
      </button>
    </>
  );
}
