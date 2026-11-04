"use client";

import * as React from "react";

export interface CursorFluidSplashProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  size?: number;
  intensity?: number;
  trail?: number;
  idle?: boolean;
}

const css = `
.hb-qi4 { position: relative; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; isolation: isolate; font-family: inherit; }
.hb-qi4 *, .hb-qi4 *::before, .hb-qi4 *::after { box-sizing: border-box; }
.hb-qi4-canvas { position: absolute; inset: 0; z-index: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.hb-qi4-content { position: relative; z-index: 1; width: 100%; height: 100%; }
`;

const defaultColors = ["#2f7bff", "#ff3d81", "#ffb02e", "#22d3a6", "#8b5cf6"];
const POOL = 420;

function hash(n: number) {
  let x = (Math.imul(n | 0, 374761393) + 668265263) | 0;
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

export function CursorFluidSplash({
  colors = defaultColors,
  size = 26,
  intensity = 1,
  trail = 0.85,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorFluidSplashProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const palette = colors.length ? colors.join("|") : defaultColors.join("|");

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const list = palette.split("|");
    const sprites = list.map((c) => {
      const s = document.createElement("canvas");
      s.width = 64;
      s.height = 64;
      const g = s.getContext("2d");
      if (g) {
        g.fillStyle = c;
        g.fillRect(0, 0, 64, 64);
        g.globalCompositeOperation = "destination-in";
        const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(0,0,0,1)");
        grad.addColorStop(0.45, "rgba(0,0,0,0.55)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = grad;
        g.fillRect(0, 0, 64, 64);
      }
      return s;
    });
    const px0 = new Float32Array(POOL);
    const py0 = new Float32Array(POOL);
    const vx0 = new Float32Array(POOL);
    const vy0 = new Float32Array(POOL);
    const rad = new Float32Array(POOL);
    const life = new Float32Array(POOL);
    const decay = new Float32Array(POOL);
    const hue = new Uint8Array(POOL);
    const fadeAlpha = Math.max(0.03, Math.min(1, 0.04 + (1 - trail) * 0.6));
    let w = 0;
    let h = 0;
    let px = 0;
    let py = 0;
    let lx = 0;
    let ly = 0;
    let active = false;
    let mix = 0;
    let raf = 0;
    let last = 0;
    let t = 0;
    let visible = true;
    let placed = false;
    let cursor = 0;
    let serial = 0;
    let carry = 0;

    const emit = (x: number, y: number, mvx: number, mvy: number) => {
      const i = cursor;
      cursor = (cursor + 1) % POOL;
      serial++;
      const a = hash(serial * 5) * Math.PI * 2;
      const sp = 20 + hash(serial * 5 + 1) * 70;
      px0[i] = x;
      py0[i] = y;
      vx0[i] = mvx * 0.35 + Math.cos(a) * sp;
      vy0[i] = mvy * 0.35 + Math.sin(a) * sp;
      rad[i] = size * (0.55 + hash(serial * 5 + 2) * 0.8);
      life[i] = 1;
      decay[i] = 0.55 + hash(serial * 5 + 3) * 0.6;
      hue[i] = Math.floor(serial / 7) % list.length;
    };

    const step = (dt: number) => {
      t += dt;
      mix += ((active ? 1 : 0) - mix) * (1 - Math.exp(-dt * 4));
      const ix = idle ? w * (0.5 + 0.36 * Math.sin(t * 0.9)) : px;
      const iy = idle ? h * (0.5 + 0.3 * Math.sin(t * 1.8 + 0.5)) : py;
      const tx = ix + (px - ix) * mix;
      const ty = iy + (py - iy) * mix;
      const dx = tx - lx;
      const dy = ty - ly;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.5 && (idle || active || mix > 0.02)) {
        carry += dist * 0.3 * intensity;
        const k = Math.min(10, Math.floor(carry));
        carry -= k;
        if (carry > 4) carry = 0;
        for (let e = 0; e < k; e++) {
          const u = (e + 1) / k;
          emit(lx + dx * u, ly + dy * u, dx / dt, dy / dt);
        }
      }
      lx = tx;
      ly = ty;
      const drag = Math.exp(-dt * 2.4);
      for (let i = 0; i < POOL; i++) {
        if (life[i] <= 0) continue;
        vx0[i] = vx0[i] * drag + Math.sin(py0[i] * 0.025 + t * 1.3) * 60 * dt;
        vy0[i] = vy0[i] * drag + Math.cos(px0[i] * 0.025 - t * 1.1) * 60 * dt;
        px0[i] += vx0[i] * dt;
        py0[i] += vy0[i] * dt;
        rad[i] *= 1 + dt * 0.5;
        life[i] -= decay[i] * dt;
      }
    };

    const draw = (clear: boolean) => {
      if (clear) {
        ctx.clearRect(0, 0, w, h);
      } else {
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 1;
        ctx.fillStyle = `rgba(0,0,0,${fadeAlpha.toFixed(3)})`;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < POOL; i++) {
        const l = life[i];
        if (l <= 0) continue;
        const r = rad[i];
        ctx.globalAlpha = Math.min(1, l) * 0.42;
        ctx.drawImage(sprites[hue[i]], px0[i] - r, py0[i] - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = (now: number) => {
      const dt = Math.min(0.04, Math.max(0.001, (now - last) / 1000));
      last = now;
      step(dt);
      draw(false);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || reduced || !visible || !w) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const nw = root.clientWidth;
      const nh = root.clientHeight;
      if (!nw || !nh) return;
      w = nw;
      h = nh;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!placed) {
        placed = true;
        px = w / 2;
        py = h / 2;
        lx = idle ? w * 0.5 : px;
        ly = idle ? h * (0.5 + 0.3 * Math.sin(0.5)) : py;
      }
      if (reduced) {
        if (!idle) {
          lx = w * 0.2;
          ly = h * 0.5;
          px = w * 0.8;
        }
        for (let i = 0; i < 70; i++) step(1 / 60);
        draw(true);
      } else {
        start();
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const s = r.width ? w / r.width : 1;
      px = (e.clientX - r.left) * s;
      py = (e.clientY - r.top) * s;
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
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    resize();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
      root.removeEventListener("pointerup", onUp);
    };
  }, [palette, size, intensity, trail, idle]);

  return (
    <div ref={rootRef} className={`hb-qi4 ${className}`} style={style} {...rest}>
      <style href="hb-cursor-fluid-splash" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qi4-canvas" aria-hidden="true" />
      <div className="hb-qi4-content">{children}</div>
    </div>
  );
}
