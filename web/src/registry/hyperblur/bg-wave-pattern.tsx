"use client";

import * as React from "react";

export type BgWavePatternKind = "stripes" | "checks" | "diamonds";

export interface BgWavePatternProps extends React.HTMLAttributes<HTMLDivElement> {
  pattern?: BgWavePatternKind;
  cellSize?: number;
  color?: string;
  accent?: string;
  amplitude?: number;
  wavelength?: number;
  bend?: number;
  radius?: number;
  speed?: number;
}

const css = `
.hb-qo1 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qo1-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qo1-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

export function BgWavePattern({
  pattern = "stripes",
  cellSize = 22,
  color = "rgba(255,255,255,0.07)",
  accent = "#2f7bff",
  amplitude = 14,
  wavelength = 260,
  bend = 0.35,
  radius = 160,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgWavePatternProps) {
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

    const cell = Math.max(8, cellSize);
    const R = Math.max(30, radius);
    const k = (Math.PI * 2) / Math.max(40, wavelength);
    const C = Math.SQRT1_2;
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
    let step = cell / 2;
    let cols = 0;
    let rows = 0;
    let u0 = 0;
    let v0 = 0;
    let X = new Float32Array(0);
    let Y = new Float32Array(0);
    let F = new Float32Array(0);

    const idleX = (tt: number) => w * (0.5 + 0.32 * Math.sin(tt * 0.37 + 0.6));
    const idleY = (tt: number) => h * (0.5 + 0.28 * Math.sin(tt * 0.59 + 1.9));

    const track = (dt: number) => {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed) {
        px = gx;
        py = gy;
        placed = true;
      } else {
        const e = 1 - Math.exp(-dt * (inside ? 9 : 2.2));
        px += (gx - px) * e;
        py += (gy - py) * e;
      }
      hover += ((inside ? 1 : 0) - hover) * Math.min(1, dt * 4);
    };

    const layout = () => {
      const m = Math.abs(amplitude) * 2 + cell * 2;
      let uMin: number;
      let uMax: number;
      let vMin: number;
      let vMax: number;
      if (pattern === "diamonds") {
        uMin = -m;
        uMax = (w + h) * C + m;
        vMin = -w * C - m;
        vMax = h * C + m;
      } else {
        uMin = -m;
        uMax = w + m;
        vMin = -m;
        vMax = h + m;
      }
      let s = cell;
      while (((uMax - uMin) / (s / 2)) * ((vMax - vMin) / (s / 2)) > 22000) s *= 1.2;
      step = s / 2;
      u0 = Math.floor(uMin / s) * s;
      v0 = Math.floor(vMin / s) * s;
      cols = Math.ceil((uMax - u0) / step) + 1;
      rows = Math.ceil((vMax - v0) / step) + 1;
      X = new Float32Array(cols * rows);
      Y = new Float32Array(cols * rows);
      F = new Float32Array(cols * rows);
    };

    const warp = () => {
      const A = amplitude;
      const strength = bend * (0.55 + 0.45 * hover);
      const inv = 1 / (R * R);
      for (let j = 0; j < rows; j++) {
        const v = v0 + j * step;
        for (let i = 0; i < cols; i++) {
          const u = u0 + i * step;
          let sx: number;
          let sy: number;
          if (pattern === "diamonds") {
            sx = (u - v) * C;
            sy = (u + v) * C;
          } else {
            sx = u;
            sy = v;
          }
          const x0 = sx + A * 0.5 * Math.sin(sy * k * 0.8 - t * 0.9);
          const y0 = sy + A * (0.65 * Math.sin(sx * k + t * 1.2) + 0.35 * Math.sin(sx * k * 0.53 - sy * k * 0.4 + t * 0.7));
          const dx = px - x0;
          const dy = py - y0;
          const f = strength * Math.exp(-(dx * dx + dy * dy) * inv);
          const n = j * cols + i;
          X[n] = x0 + dx * f;
          Y[n] = y0 + dy * f;
          F[n] = f;
        }
      }
    };

    const on = (i: number, j: number) =>
      pattern === "stripes" ? ((j >> 1) & 1) === 0 : (((i >> 1) + (j >> 1)) & 1) === 0;

    const quad = (n: number) => {
      g.moveTo(X[n], Y[n]);
      g.lineTo(X[n + 1], Y[n + 1]);
      g.lineTo(X[n + cols + 1], Y[n + cols + 1]);
      g.lineTo(X[n + cols], Y[n + cols]);
      g.closePath();
    };

    const draw = () => {
      if (!w || !h) return;
      warp();
      g.clearRect(0, 0, w, h);
      g.fillStyle = color;
      g.beginPath();
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          if (on(i, j)) quad(j * cols + i);
        }
      }
      g.fill();
      const top = Math.max(0.0001, bend);
      g.fillStyle = accent;
      for (let b = 1; b <= 6; b++) {
        const lo = (b - 1) / 6;
        const hi = b / 6;
        let any = false;
        g.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            if (!on(i, j)) continue;
            const n = j * cols + i;
            const a = Math.min(1, ((F[n] + F[n + 1] + F[n + cols] + F[n + cols + 1]) / 4 / top) * 1.15);
            if (a < 0.04 || a < lo || a >= hi + (b === 6 ? 1 : 0)) continue;
            quad(n);
            any = true;
          }
        }
        if (any) {
          g.globalAlpha = 0.18 + hi * 0.62;
          g.fill();
        }
      }
      g.globalAlpha = 1;
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
      t = 2.3;
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
  }, [pattern, cellSize, color, accent, amplitude, wavelength, bend, radius, speed]);

  return (
    <div ref={wrapRef} className={`hb-qo1 ${className}`} style={style} {...rest}>
      <style href="hb-bg-wave-pattern" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qo1-c" aria-hidden="true" />
      {children != null && <div className="hb-qo1-in">{children}</div>}
    </div>
  );
}
