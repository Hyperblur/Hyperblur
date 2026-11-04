"use client";

import * as React from "react";

export interface CursorImageTrailProps extends React.HTMLAttributes<HTMLDivElement> {
  images?: string[];
  size?: number;
  spacing?: number;
  duration?: number;
  max?: number;
  idle?: boolean;
}

const css = `
.hb-qi8 { position: relative; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; isolation: isolate; font-family: inherit; }
.hb-qi8 *, .hb-qi8 *::before, .hb-qi8 *::after { box-sizing: border-box; }
.hb-qi8-content { position: relative; z-index: 1; width: 100%; height: 100%; }
.hb-qi8-layer { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
.hb-qi8-tile { position: absolute; left: 0; top: 0; opacity: 0; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.16); background-color: #171717; background-size: cover; background-position: center; box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.7); will-change: transform, opacity; }
@media (prefers-reduced-motion: reduce) {
  .hb-qi8-layer { display: none; }
}
`;

const scenes = [
  "radial-gradient(circle at 70% 32%, #ffe3a3 0 9%, rgba(255,227,163,0) 10%), linear-gradient(180deg, #ff9a62 0%, #d4486b 52%, #2d1840 100%)",
  "radial-gradient(120% 60% at 50% 100%, #0d4f6b 0%, rgba(13,79,107,0) 60%), linear-gradient(180deg, #9fd8f0 0%, #3a8fc2 48%, #0b2c4a 100%)",
  "linear-gradient(160deg, rgba(0,0,0,0) 55%, #0e2a1a 56%), linear-gradient(200deg, rgba(0,0,0,0) 48%, #1b4a2c 49%), linear-gradient(180deg, #cfe8c4 0%, #6fa36a 100%)",
  "radial-gradient(140% 70% at 20% 100%, #c98b4a 0%, rgba(201,139,74,0) 55%), linear-gradient(180deg, #f6d9a8 0%, #e2a35f 60%, #8a4f26 100%)",
  "radial-gradient(80% 50% at 40% 30%, rgba(80,255,190,0.65) 0%, rgba(80,255,190,0) 70%), radial-gradient(60% 40% at 70% 45%, rgba(140,110,255,0.55) 0%, rgba(140,110,255,0) 70%), linear-gradient(180deg, #071226 0%, #0d1f3a 100%)",
  "linear-gradient(0deg, #0b0f1c 0 22%, rgba(0,0,0,0) 22%), repeating-linear-gradient(90deg, #1b2440 0 9px, #ffcf6b 9px 11px, #1b2440 11px 18px), linear-gradient(180deg, #2a2f5c 0%, #ff7a59 100%)",
  "radial-gradient(90% 60% at 50% 110%, #e8f6ff 0%, rgba(232,246,255,0) 60%), linear-gradient(180deg, #b9dcf2 0%, #6aa5cf 55%, #dff1fb 100%)",
  "radial-gradient(circle at 30% 70%, #f2c6ff 0 14%, rgba(242,198,255,0) 15%), linear-gradient(180deg, #b79cff 0%, #7c5ad9 55%, #2c1d57 100%)",
];

function hash(n: number) {
  let x = (Math.imul(n | 0, 374761393) + 668265263) | 0;
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

export function CursorImageTrail({
  images,
  size = 64,
  spacing = 44,
  duration = 950,
  max = 14,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorImageTrailProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const layerRef = React.useRef<HTMLDivElement>(null);
  const pool = Math.max(2, Math.min(40, Math.floor(max)));
  const sources = images && images.length ? images.map((src) => `url("${src}")`) : scenes;
  const sourceKey = sources.join("\n");

  React.useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    if (!root || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const list = sourceKey.split("\n");
    const tiles = Array.from(layer.children) as HTMLElement[];
    const anims: (Animation | null)[] = tiles.map(() => null);
    const tw = size;
    const th = size * 1.22;
    let w = root.clientWidth;
    let h = root.clientHeight;
    let px = w / 2;
    let py = h / 2;
    let lx = 0;
    let ly = 0;
    let sx = 0;
    let sy = 0;
    let active = false;
    let mix = 0;
    let raf = 0;
    let last = 0;
    let t = 0;
    let visible = true;
    let serial = 0;
    let primed = false;

    const spawn = (x: number, y: number, mvx: number, mvy: number) => {
      const el = tiles[serial % tiles.length];
      if (!el) return;
      anims[serial % tiles.length]?.cancel();
      const src = list[serial % list.length];
      el.style.backgroundImage = src;
      el.style.width = `${tw}px`;
      el.style.height = `${th.toFixed(1)}px`;
      const r0 = (hash(serial * 3 + 1) - 0.5) * 24;
      const r1 = r0 + (hash(serial * 3 + 2) - 0.5) * 30;
      const m = Math.hypot(mvx, mvy) || 1;
      const dx = (-mvx / m) * 22 + (hash(serial * 3 + 3) - 0.5) * 26;
      const dy = (-mvy / m) * 22 - 26;
      const x0 = x - tw / 2;
      const y0 = y - th / 2;
      const at = (ox: number, oy: number, s: number, r: number) =>
        `translate3d(${(x0 + ox).toFixed(1)}px, ${(y0 + oy).toFixed(1)}px, 0) scale(${s}) rotate(${r.toFixed(1)}deg)`;
      el.style.zIndex = String(serial % 1000);
      anims[serial % tiles.length] = el.animate(
        [
          { transform: at(0, 0, 0.55, r0), opacity: 0 },
          { transform: at(dx * 0.15, dy * 0.15, 1, r0), opacity: 1, offset: 0.18 },
          { transform: at(dx * 0.55, dy * 0.55, 0.96, (r0 + r1) / 2), opacity: 0.9, offset: 0.55 },
          { transform: at(dx, dy, 0.8, r1), opacity: 0 },
        ],
        { duration: Math.max(200, duration), easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" },
      );
      serial++;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      t += dt;
      w = root.clientWidth;
      h = root.clientHeight;
      mix += ((active ? 1 : 0) - mix) * (1 - Math.exp(-dt * 4));
      const ix = idle ? w * (0.5 + 0.36 * Math.sin(t * 0.75)) : px;
      const iy = idle ? h * (0.5 + 0.22 * Math.sin(t * 1.5 + 0.4)) : py;
      const tx = ix + (px - ix) * mix;
      const ty = iy + (py - iy) * mix;
      if (!primed) {
        primed = true;
        lx = sx = tx;
        ly = sy = ty;
      }
      const moved = Math.hypot(tx - sx, ty - sy);
      if (moved >= spacing && (idle || active)) {
        spawn(tx, ty, tx - lx, ty - ly);
        sx = tx;
        sy = ty;
      }
      lx = tx;
      ly = ty;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const s = r.width ? w / r.width : 1;
      px = (e.clientX - r.left) * s;
      py = (e.clientY - r.top) * s;
      if (!active && !idle) {
        sx = px;
        sy = py;
        lx = px;
        ly = py;
      }
      active = true;
    };
    const onLeave = () => {
      active = false;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") onLeave();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    root.addEventListener("pointerup", onUp);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    start();

    return () => {
      stop();
      io.disconnect();
      anims.forEach((a) => a?.cancel());
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
      root.removeEventListener("pointerup", onUp);
    };
  }, [sourceKey, size, spacing, duration, pool, idle]);

  return (
    <div ref={rootRef} className={`hb-qi8 ${className}`} style={style} {...rest}>
      <style href="hb-cursor-image-trail" precedence="default">{css}</style>
      <div className="hb-qi8-content">{children}</div>
      <div ref={layerRef} className="hb-qi8-layer" aria-hidden="true">
        {Array.from({ length: pool }, (_, i) => (
          <span key={i} className="hb-qi8-tile" />
        ))}
      </div>
    </div>
  );
}
