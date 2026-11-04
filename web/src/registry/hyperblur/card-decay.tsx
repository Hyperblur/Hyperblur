"use client";

import * as React from "react";

export interface CardDecayProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  kicker?: string;
  caption?: string;
  src?: string;
  accent?: string;
  strength?: number;
  ratio?: number;
  idle?: boolean;
}

const css = `
.hb-qk4 {
  --hb-qk4-ix: 0px;
  --hb-qk4-iy: 0px;
  --hb-qk4-ir: 0deg;
  --hb-qk4-tx: 0px;
  --hb-qk4-ty: 0px;
  --hb-qk4-gx: 0px;
  --hb-qk4-gy: 0px;
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: var(--hb-qk4-r);
  container-type: inline-size;
  font-family: inherit;
  box-sizing: border-box;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}
.hb-qk4 *, .hb-qk4 *::before, .hb-qk4 *::after { box-sizing: border-box; }
.hb-qk4-frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid #262626;
  background: #0a0a0a;
  color: #ededed;
}
.hb-qk4-img {
  position: absolute;
  inset: -14%;
  background-size: cover;
  background-position: center;
  transform: translate3d(var(--hb-qk4-ix), var(--hb-qk4-iy), 0) rotate(var(--hb-qk4-ir));
  will-change: transform;
}
.hb-qk4-scene {
  background:
    radial-gradient(circle at 74% 34%, #ffffff 0, color-mix(in srgb, var(--hb-qk4-c) 40%, #ffffff) 7%, transparent 8.5%),
    radial-gradient(circle at 74% 34%, color-mix(in srgb, var(--hb-qk4-c) 75%, transparent) 0, transparent 34%),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.07) 0 1px, transparent 1px 9px),
    linear-gradient(180deg, color-mix(in srgb, var(--hb-qk4-c) 62%, #0a0a18) 0%, color-mix(in srgb, var(--hb-qk4-c) 20%, #050509) 100%);
}
.hb-qk4-skyline {
  position: absolute;
  inset: 0;
  background: #06060b;
  clip-path: polygon(0 78%, 6% 78%, 6% 62%, 12% 62%, 12% 70%, 18% 70%, 18% 54%, 25% 54%, 25% 72%, 32% 72%, 32% 60%, 38% 60%, 38% 76%, 46% 76%, 46% 58%, 53% 58%, 53% 68%, 60% 68%, 60% 50%, 68% 50%, 68% 74%, 75% 74%, 75% 64%, 83% 64%, 83% 72%, 90% 72%, 90% 56%, 96% 56%, 96% 78%, 100% 78%, 100% 100%, 0 100%);
}
.hb-qk4-shade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(5, 5, 8, 0.1) 30%, rgba(5, 5, 8, 0.78) 100%);
}
.hb-qk4-kick {
  position: absolute;
  left: 5cqw;
  top: 5cqw;
  padding: 1.6cqw 3.2cqw;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(10, 10, 12, 0.5);
  font-size: max(10px, 3.4cqw);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ededed;
  transform: translate3d(calc(var(--hb-qk4-tx) * 0.5), calc(var(--hb-qk4-ty) * 0.5), 0);
  will-change: transform;
}
.hb-qk4-head {
  position: absolute;
  left: 5cqw;
  right: 5cqw;
  bottom: 4.6cqw;
}
.hb-qk4-title, .hb-qk4-ghost {
  display: block;
  margin: 0;
  font-size: 14cqw;
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.hb-qk4-title {
  position: relative;
  color: #ffffff;
  transform: translate3d(var(--hb-qk4-tx), var(--hb-qk4-ty), 0);
  will-change: transform;
}
.hb-qk4-ghost {
  position: absolute;
  left: 0;
  top: 0;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
  transform: translate3d(var(--hb-qk4-gx), var(--hb-qk4-gy), 0);
  will-change: transform;
  pointer-events: none;
}
.hb-qk4-cap {
  margin: 2.4cqw 0 0;
  font-size: max(11px, 3.6cqw);
  line-height: 1.3;
  color: #bdbdbd;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qk4-img, .hb-qk4-kick, .hb-qk4-title, .hb-qk4-ghost { transform: none; will-change: auto; }
}
`;

interface Spring {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function clampN(n: number) {
  return Math.min(1, Math.max(-1, n));
}

function advance(p: Spring, tx: number, ty: number, k: number, c: number, dt: number) {
  const steps = 2;
  const h = dt / steps;
  for (let i = 0; i < steps; i += 1) {
    p.vx += (k * (tx - p.x) - c * p.vx) * h;
    p.vy += (k * (ty - p.y) - c * p.vy) * h;
    p.x += p.vx * h;
    p.y += p.vy * h;
  }
}

export function CardDecay({
  title = "Neon Harbor",
  kicker = "Night shift 03",
  caption = "Container cranes, rain and 4 a.m. light",
  src,
  accent = "#2f7bff",
  strength = 22,
  ratio = 1.7,
  idle = true,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  onPointerCancel,
  ...rest
}: CardDecayProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const st = React.useRef({ tx: 0, ty: 0, hover: false });

  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    const s = st.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const img: Spring = { x: 0, y: 0, vx: 0, vy: 0 };
    const tit: Spring = { x: 0, y: 0, vx: 0, vy: 0 };
    const gho: Spring = { x: 0, y: 0, vx: 0, vy: 0 };
    let raf = 0;
    let last = 0;
    const frame = (ms: number) => {
      const t = ms / 1000;
      const dt = Math.min(0.04, last ? t - last : 0.016);
      last = t;
      if (!s.hover) {
        if (idle) {
          s.tx = 0.9 * Math.sin(t * 0.9);
          s.ty = 0.6 * Math.sin(t * 0.7 + 1.1);
        } else {
          s.tx = 0;
          s.ty = 0;
        }
      }
      advance(img, s.tx * strength, s.ty * strength, 140, 15, dt);
      advance(tit, s.tx * strength * 1.3, s.ty * strength * 0.9, 52, 7, dt);
      advance(gho, s.tx * strength * 1.9, s.ty * strength * 1.3, 28, 5, dt);
      const rot = Math.max(-9, Math.min(9, img.vx * 0.014));
      el.style.setProperty("--hb-qk4-ix", `${img.x.toFixed(2)}px`);
      el.style.setProperty("--hb-qk4-iy", `${img.y.toFixed(2)}px`);
      el.style.setProperty("--hb-qk4-ir", `${rot.toFixed(2)}deg`);
      el.style.setProperty("--hb-qk4-tx", `${tit.x.toFixed(2)}px`);
      el.style.setProperty("--hb-qk4-ty", `${tit.y.toFixed(2)}px`);
      el.style.setProperty("--hb-qk4-gx", `${gho.x.toFixed(2)}px`);
      el.style.setProperty("--hb-qk4-gy", `${gho.y.toFixed(2)}px`);
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [strength, idle]);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    const r = e.currentTarget.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const s = st.current;
    s.hover = true;
    s.tx = clampN(((e.clientX - r.left) / r.width - 0.5) * 2);
    s.ty = clampN(((e.clientY - r.top) / r.height - 0.5) * 2);
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
      className={`hb-qk4 ${className}`}
      style={{ "--hb-qk4-r": ratio, "--hb-qk4-c": accent, ...style } as React.CSSProperties}
      onPointerMove={move}
      onPointerLeave={leave}
      onPointerCancel={cancel}
      {...rest}
    >
      <style href="hb-card-decay" precedence="default">{css}</style>
      <div className="hb-qk4-frame">
        {src ? (
          <div className="hb-qk4-img" style={{ backgroundImage: `url(${JSON.stringify(src)})` }} aria-hidden="true" />
        ) : (
          <div className="hb-qk4-img hb-qk4-scene" aria-hidden="true">
            <span className="hb-qk4-skyline" />
          </div>
        )}
        <div className="hb-qk4-shade" aria-hidden="true" />
        {kicker ? <span className="hb-qk4-kick">{kicker}</span> : null}
        <div className="hb-qk4-head">
          <span className="hb-qk4-ghost" aria-hidden="true">{title}</span>
          <h3 className="hb-qk4-title">{title}</h3>
          {caption ? <p className="hb-qk4-cap">{caption}</p> : null}
        </div>
      </div>
    </div>
  );
}
