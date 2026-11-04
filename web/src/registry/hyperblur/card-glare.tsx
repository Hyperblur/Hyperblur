"use client";

import * as React from "react";

export interface CardGlareProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  subtitle?: string;
  badge?: string;
  src?: string;
  accent?: string;
  tilt?: number;
  glare?: number;
  ratio?: number;
  idle?: boolean;
}

const css = `
.hb-qk1 {
  --hb-qk1-rx: 0deg;
  --hb-qk1-ry: 0deg;
  --hb-qk1-gx: 35%;
  --hb-qk1-gy: 30%;
  --hb-qk1-bx: -6%;
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: var(--hb-qk1-r);
  perspective: 900px;
  font-family: inherit;
  box-sizing: border-box;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}
.hb-qk1 *, .hb-qk1 *::before, .hb-qk1 *::after { box-sizing: border-box; }
.hb-qk1-card {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 18px;
  background: #111111;
  color: #ededed;
  transform: rotateX(var(--hb-qk1-rx)) rotateY(var(--hb-qk1-ry));
  box-shadow: 0 24px 40px -22px rgba(0, 0, 0, 0.9);
  will-change: transform;
}
.hb-qk1-scene, .hb-qk1-img { position: absolute; inset: 0; }
.hb-qk1-img { background-size: cover; background-position: center; }
.hb-qk1-scene {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--hb-qk1-c) 55%, #0b0b18) 0%, color-mix(in srgb, var(--hb-qk1-c) 22%, #06060c) 72%);
}
.hb-qk1-sun {
  position: absolute;
  right: 17%;
  top: 14%;
  width: 22%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff 0, color-mix(in srgb, var(--hb-qk1-c) 50%, #ffffff) 58%, color-mix(in srgb, var(--hb-qk1-c) 80%, transparent) 100%);
  box-shadow: 0 0 60px color-mix(in srgb, var(--hb-qk1-c) 70%, transparent);
}
.hb-qk1-ridge { position: absolute; inset: 0; }
.hb-qk1-ridge[data-n="1"] {
  background: color-mix(in srgb, var(--hb-qk1-c) 20%, #05050a);
  clip-path: polygon(0 66%, 12% 50%, 26% 62%, 44% 36%, 60% 58%, 78% 44%, 100% 62%, 100% 100%, 0 100%);
}
.hb-qk1-ridge[data-n="2"] {
  background: color-mix(in srgb, var(--hb-qk1-c) 8%, #030306);
  clip-path: polygon(0 82%, 18% 70%, 36% 80%, 58% 64%, 80% 78%, 100% 70%, 100% 100%, 0 100%);
}
.hb-qk1-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 38%, rgba(5, 5, 8, 0.88) 100%);
}
.hb-qk1-hot {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at var(--hb-qk1-gx) var(--hb-qk1-gy), rgba(255, 255, 255, calc(var(--hb-qk1-a) * 0.42)), transparent 46%);
}
.hb-qk1-glare {
  position: absolute;
  inset: -35%;
  pointer-events: none;
  background: linear-gradient(
    112deg,
    transparent 40%,
    rgba(255, 255, 255, calc(var(--hb-qk1-a) * 0.5)) 46.5%,
    rgba(255, 255, 255, var(--hb-qk1-a)) 50%,
    rgba(255, 255, 255, calc(var(--hb-qk1-a) * 0.5)) 53.5%,
    transparent 60%
  );
  transform: translate3d(var(--hb-qk1-bx), 0, 0);
  mix-blend-mode: soft-light;
}
.hb-qk1-edge {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  pointer-events: none;
  background:
    radial-gradient(circle 150px at var(--hb-qk1-gx) var(--hb-qk1-gy), rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 100%),
    linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
}
.hb-qk1-badge {
  position: absolute;
  left: 14px;
  top: 14px;
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(10, 10, 12, 0.5);
  backdrop-filter: blur(6px);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.02em;
  color: #ededed;
}
.hb-qk1-body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 16px 15px;
}
.hb-qk1-title {
  margin: 0;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: #ffffff;
}
.hb-qk1-sub {
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.3;
  color: #b4b4b4;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qk1-card { transform: none; will-change: auto; }
}
`;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function CardGlare({
  title = "Aurora Night Train",
  subtitle = "Tromso to Narvik, 6h 40m",
  badge = "Departs 21:15",
  src,
  accent = "#2f7bff",
  tilt = 8,
  glare = 0.55,
  ratio = 1.45,
  idle = true,
  className = "",
  style,
  children,
  onPointerMove,
  onPointerLeave,
  onPointerCancel,
  ...rest
}: CardGlareProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const st = React.useRef({ tx: 0.35, ty: 0.3, x: 0.35, y: 0.3, hover: false });

  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    const s = st.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paint = () => {
      const rx = reduce ? 0 : (0.5 - s.y) * 2 * tilt;
      const ry = reduce ? 0 : (s.x - 0.5) * 2 * tilt;
      el.style.setProperty("--hb-qk1-rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--hb-qk1-ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--hb-qk1-gx", `${(s.x * 100).toFixed(1)}%`);
      el.style.setProperty("--hb-qk1-gy", `${(s.y * 100).toFixed(1)}%`);
      el.style.setProperty("--hb-qk1-bx", `${((s.x - 0.5) * 45).toFixed(1)}%`);
    };
    if (reduce) {
      s.x = 0.35;
      s.y = 0.3;
      paint();
      return;
    }
    let raf = 0;
    const frame = (now: number) => {
      const t = now / 1000;
      if (!s.hover) {
        if (idle) {
          s.tx = 0.5 + 0.36 * Math.sin(t * 0.8);
          s.ty = 0.5 + 0.3 * Math.sin(t * 0.63 + 1.2);
        } else {
          s.tx = 0.5;
          s.ty = 0.5;
        }
      }
      s.x += (s.tx - s.x) * 0.1;
      s.y += (s.ty - s.y) * 0.1;
      paint();
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [tilt, idle]);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    const r = e.currentTarget.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const s = st.current;
    s.hover = true;
    s.tx = clamp01((e.clientX - r.left) / r.width);
    s.ty = clamp01((e.clientY - r.top) / r.height);
  };

  const leave = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    st.current.hover = false;
  };

  const cancel = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerCancel?.(e);
    st.current.hover = false;
  };

  return (
    <div
      ref={root}
      className={`hb-qk1 ${className}`}
      style={
        {
          "--hb-qk1-r": ratio,
          "--hb-qk1-c": accent,
          "--hb-qk1-a": glare,
          ...style,
        } as React.CSSProperties
      }
      onPointerMove={move}
      onPointerLeave={leave}
      onPointerCancel={cancel}
      {...rest}
    >
      <style href="hb-card-glare" precedence="default">{css}</style>
      <div className="hb-qk1-card">
        {src ? (
          <div className="hb-qk1-img" style={{ backgroundImage: `url(${JSON.stringify(src)})` }} aria-hidden="true" />
        ) : (
          <div className="hb-qk1-scene" aria-hidden="true">
            <span className="hb-qk1-sun" />
            <span className="hb-qk1-ridge" data-n="1" />
            <span className="hb-qk1-ridge" data-n="2" />
          </div>
        )}
        <div className="hb-qk1-scrim" />
        {badge ? <span className="hb-qk1-badge">{badge}</span> : null}
        <div className="hb-qk1-body">
          <h3 className="hb-qk1-title">{title}</h3>
          {subtitle ? <p className="hb-qk1-sub">{subtitle}</p> : null}
          {children}
        </div>
        <div className="hb-qk1-hot" aria-hidden="true" />
        <div className="hb-qk1-glare" aria-hidden="true" />
        <div className="hb-qk1-edge" aria-hidden="true" />
      </div>
    </div>
  );
}
