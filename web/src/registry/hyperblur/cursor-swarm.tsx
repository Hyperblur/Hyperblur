"use client";

import * as React from "react";

export interface CursorSwarmProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  trail?: number;
  idle?: boolean;
}

const css = `
.hb-qi3 { position: relative; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; isolation: isolate; font-family: inherit; }
.hb-qi3 *, .hb-qi3 *::before, .hb-qi3 *::after { box-sizing: border-box; }
.hb-qi3-canvas { position: absolute; inset: 0; z-index: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.hb-qi3-content { position: relative; z-index: 1; width: 100%; height: 100%; }
`;

function hash(n: number) {
  let x = (Math.imul(n | 0, 374761393) + 668265263) | 0;
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

export function CursorSwarm({
  count = 40,
  color = "#7fb3ff",
  size = 2.4,
  speed = 1,
  trail = 0.7,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorSwarmProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = Math.max(1, Math.min(200, Math.floor(count)));
    const pos = new Float32Array(n * 2);
    const vel = new Float32Array(n * 2);
    const max = 170 * speed;
    const fadeAlpha = Math.max(0.05, Math.min(1, 1 - trail * 0.9));
    let w = 0;
    let h = 0;
    let px = 0;
    let py = 0;
    let active = false;
    let mix = 0;
    let raf = 0;
    let last = 0;
    let t = 0;
    let visible = true;
    let seeded = false;

    const seed = () => {
      for (let i = 0; i < n; i++) {
        const a = hash(i * 3 + 1) * Math.PI * 2;
        const d = 20 + hash(i * 3 + 2) * Math.min(w, h) * 0.35;
        pos[i * 2] = w / 2 + Math.cos(a) * d;
        pos[i * 2 + 1] = h / 2 + Math.sin(a) * d;
        vel[i * 2] = Math.cos(a + 1.6) * max * 0.5;
        vel[i * 2 + 1] = Math.sin(a + 1.6) * max * 0.5;
      }
    };

    const step = (dt: number) => {
      t += dt;
      mix += ((active ? 1 : 0) - mix) * (1 - Math.exp(-dt * 3));
      const ix = idle ? w * (0.5 + 0.3 * Math.sin(t * 0.42) + 0.08 * Math.sin(t * 1.3)) : px;
      const iy = idle ? h * (0.5 + 0.25 * Math.sin(t * 0.67 + 0.4)) : py;
      const tx = ix + (px - ix) * mix;
      const ty = iy + (py - iy) * mix;
      for (let i = 0; i < n; i++) {
        const x = pos[i * 2];
        const y = pos[i * 2 + 1];
        const vx = vel[i * 2];
        const vy = vel[i * 2 + 1];
        let sx = 0;
        let sy = 0;
        let cxs = 0;
        let cys = 0;
        let avx = 0;
        let avy = 0;
        let near = 0;
        for (let j = 0; j < n; j++) {
          if (j === i) continue;
          const dx = x - pos[j * 2];
          const dy = y - pos[j * 2 + 1];
          const d2 = dx * dx + dy * dy;
          if (d2 < 2500) {
            near++;
            cxs += pos[j * 2];
            cys += pos[j * 2 + 1];
            avx += vel[j * 2];
            avy += vel[j * 2 + 1];
            if (d2 < 256 && d2 > 0.01) {
              sx += dx / d2;
              sy += dy / d2;
            }
          }
        }
        const gx = tx - x;
        const gy = ty - y;
        const gd = Math.hypot(gx, gy) || 1;
        const orbit = gd < 70 ? 0.9 : 0.25;
        const side = i % 2 ? 1 : -1;
        let dvx = (gx / gd) * max + (-gy / gd) * max * orbit * side;
        let dvy = (gy / gd) * max + (gx / gd) * max * orbit * side;
        const wobble = Math.sin(t * 1.7 + i * 1.3) * 40;
        dvx += (-vy / (Math.hypot(vx, vy) || 1)) * wobble;
        dvy += (vx / (Math.hypot(vx, vy) || 1)) * wobble;
        let ax = (dvx - vx) * 1.6 + sx * 2600;
        let ay = (dvy - vy) * 1.6 + sy * 2600;
        if (near) {
          ax += (cxs / near - x) * 0.8 + (avx / near - vx) * 0.6;
          ay += (cys / near - y) * 0.8 + (avy / near - vy) * 0.6;
        }
        let nvx = vx + ax * dt;
        let nvy = vy + ay * dt;
        const sp = Math.hypot(nvx, nvy);
        const lim = max * 1.25;
        if (sp > lim) {
          nvx = (nvx / sp) * lim;
          nvy = (nvy / sp) * lim;
        } else if (sp < 30 && sp > 0) {
          nvx = (nvx / sp) * 30;
          nvy = (nvy / sp) * 30;
        }
        vel[i * 2] = nvx;
        vel[i * 2 + 1] = nvy;
        pos[i * 2] = x + nvx * dt;
        pos[i * 2 + 1] = y + nvy * dt;
      }
    };

    const draw = (clear: boolean) => {
      if (clear) {
        ctx.clearRect(0, 0, w, h);
      } else {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = `rgba(0,0,0,${fadeAlpha.toFixed(3)})`;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }
      ctx.fillStyle = color;
      for (let i = 0; i < n; i++) {
        const x = pos[i * 2];
        const y = pos[i * 2 + 1];
        const vx = vel[i * 2];
        const vy = vel[i * 2 + 1];
        const sp = Math.hypot(vx, vy) || 1;
        const ux = vx / sp;
        const uy = vy / sp;
        const len = size * 2.6;
        ctx.globalAlpha = 0.55 + 0.45 * Math.min(1, sp / max);
        ctx.beginPath();
        ctx.moveTo(x + ux * len, y + uy * len);
        ctx.lineTo(x - ux * len * 0.6 - uy * size, y - uy * len * 0.6 + ux * size);
        ctx.lineTo(x - ux * len * 0.6 + uy * size, y - uy * len * 0.6 - ux * size);
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, Math.max(0.001, (now - last) / 1000));
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
      if (!seeded) {
        seeded = true;
        px = w / 2;
        py = h / 2;
        seed();
      }
      if (reduced) {
        for (let i = 0; i < 90; i++) step(1 / 60);
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
  }, [count, color, size, speed, trail, idle]);

  return (
    <div ref={rootRef} className={`hb-qi3 ${className}`} style={style} {...rest}>
      <style href="hb-cursor-swarm" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qi3-canvas" aria-hidden="true" />
      <div className="hb-qi3-content">{children}</div>
    </div>
  );
}
