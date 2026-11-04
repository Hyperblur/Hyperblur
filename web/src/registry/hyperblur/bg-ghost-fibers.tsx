"use client";

import * as React from "react";

export interface BgGhostFibersProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  color?: string;
  accent?: string;
  thickness?: number;
  amplitude?: number;
  trail?: number;
  radius?: number;
  seed?: number;
  speed?: number;
}

const css = `
.hb-qo3 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qo3-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qo3-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function hash2(x: number, y: number, s: number) {
  let n = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 1442695041)) | 0;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function noise2(x: number, y: number, s: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi, s);
  const b = hash2(xi + 1, yi, s);
  const c = hash2(xi, yi + 1, s);
  const d = hash2(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export function BgGhostFibers({
  count = 22,
  color = "rgba(200,220,255,0.55)",
  accent = "#7fb3ff",
  thickness = 1,
  amplitude = 0.28,
  trail = 3,
  radius = 120,
  seed = 7,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgGhostFibersProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !context) return;
    const g = context;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const N = Math.max(1, Math.min(80, Math.round(count)));
    const R = Math.max(20, radius);
    const ghosts = Math.max(0, Math.min(6, Math.round(trail)));
    const s0 = Math.round(seed) | 0;
    let w = 0;
    let h = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let hover = 0;
    let placed = false;
    let M = 40;
    let xs = new Float32Array(0);
    let ys = new Float32Array(0);
    let gs = new Float32Array(0);

    const idleX = (tt: number) => w * (0.5 + 0.36 * Math.sin(tt * 0.31 + 2.2));
    const idleY = (tt: number) => h * (0.5 + 0.3 * Math.sin(tt * 0.53 + 0.8));

    const track = (dt: number) => {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed) {
        px = gx;
        py = gy;
        placed = true;
      } else {
        const e = 1 - Math.exp(-dt * (inside ? 7 : 1.8));
        px += (gx - px) * e;
        py += (gy - py) * e;
      }
      hover += ((inside ? 1 : 0) - hover) * Math.min(1, dt * 4);
    };

    const layout = () => {
      M = Math.max(24, Math.min(110, Math.round(w / 12)));
      xs = new Float32Array(M);
      ys = new Float32Array(M);
      gs = new Float32Array(M);
    };

    const shape = (f: number, T: number, live: boolean) => {
      const base = h * (0.04 + (0.92 * (f + 0.5)) / N + (hash2(f, 3, s0) - 0.5) * (0.6 / N));
      const amp = h * amplitude;
      const inv = 1 / (R * R);
      const pull = 0.6 + 0.4 * hover;
      for (let j = 0; j < M; j++) {
        const x0 = -0.06 * w + (j * 1.12 * w) / (M - 1);
        const nx = x0 * 0.0045 - T * 0.05 + f * 7.31;
        const ny = T * 0.11 + f * 1.73;
        const n1 = noise2(nx, ny, s0) * 2 - 1;
        const n2 = noise2(nx * 2.3 + 4.1, ny * 1.4 + 9.2, s0 + 11) * 2 - 1;
        let x = x0 + n2 * 10;
        let y = base + amp * (0.75 * n1 + 0.25 * n2);
        let gp = 0;
        if (live) {
          const dx = px - x;
          const dy = py - y;
          gp = Math.exp(-(dx * dx + dy * dy) * inv) * pull;
          x += dx * gp * 0.12;
          y += dy * gp * 0.3;
        }
        xs[j] = x;
        ys[j] = y;
        gs[j] = gp;
      }
    };

    const path = (a: number, b: number) => {
      g.beginPath();
      g.moveTo(xs[a], ys[a]);
      for (let j = a + 1; j < b; j++) {
        const mx = (xs[j] + xs[j + 1]) / 2;
        const my = (ys[j] + ys[j + 1]) / 2;
        g.quadraticCurveTo(xs[j], ys[j], mx, my);
      }
      g.lineTo(xs[b], ys[b]);
    };

    const draw = () => {
      if (!w || !h) return;
      g.clearRect(0, 0, w, h);
      g.globalCompositeOperation = "lighter";
      g.lineCap = "round";
      g.lineJoin = "round";
      for (let f = 0; f < N; f++) {
        const tint = hash2(f, 1, s0) < 0.22;
        const alpha = (0.22 + 0.5 * hash2(f, 2, s0)) * (0.65 + 0.35 * Math.sin(t * 0.5 + f * 1.3));
        g.strokeStyle = tint ? accent : color;
        g.lineWidth = thickness;
        for (let k = ghosts; k >= 1; k--) {
          shape(f, t - k * 0.55, false);
          path(0, M - 1);
          g.globalAlpha = alpha * 0.32 * Math.pow(0.6, k - 1);
          g.stroke();
        }
        shape(f, t, true);
        path(0, M - 1);
        g.globalAlpha = alpha;
        g.stroke();
        g.strokeStyle = accent;
        for (let j = 0; j < M - 1; j++) {
          const gp = (gs[j] + gs[j + 1]) / 2;
          if (gp < 0.03) continue;
          g.beginPath();
          g.moveTo(xs[j], ys[j]);
          g.lineTo(xs[j + 1], ys[j + 1]);
          g.lineWidth = thickness * (1 + 4.5 * gp);
          g.globalAlpha = Math.min(1, gp * (0.45 + alpha));
          g.stroke();
        }
      }
      g.globalAlpha = 1;
      g.globalCompositeOperation = "source-over";
    };

    const resize = () => {
      const nw = wrap.clientWidth;
      const nh = wrap.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
      if (motion.matches) still();
      else {
        track(0);
        draw();
      }
    };

    let visible = true;
    let raf = 0;
    let prev = 0;

    const still = () => {
      t = 4.2;
      inside = false;
      placed = false;
      hover = 0;
      track(0);
      draw();
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      track(dt);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const run = visible && !document.hidden && !motion.matches;
      if (run && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (motion.matches) still();
    };

    const move = (e: PointerEvent) => {
      if (motion.matches) return;
      const rect = host.getBoundingClientRect();
      const sx = rect.width ? host.clientWidth / rect.width : 1;
      const sy = rect.height ? host.clientHeight / rect.height : 1;
      tx = (e.clientX - rect.left) * sx;
      ty = (e.clientY - rect.top) * sy;
      inside = true;
    };

    const leave = (e: PointerEvent) => {
      if (e.type === "pointerup" && e.pointerType === "mouse") return;
      inside = false;
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });
    ro.observe(wrap);
    io.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerdown", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointerup", leave);
    host.addEventListener("pointercancel", leave);
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerdown", move);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointerup", leave);
      host.removeEventListener("pointercancel", leave);
    };
  }, [count, color, accent, thickness, amplitude, trail, radius, seed, speed]);

  return (
    <div ref={wrapRef} className={`hb-qo3 ${className}`} style={style} {...rest}>
      <style href="hb-bg-ghost-fibers" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qo3-c" aria-hidden="true" />
      {children != null && <div className="hb-qo3-in">{children}</div>}
    </div>
  );
}
