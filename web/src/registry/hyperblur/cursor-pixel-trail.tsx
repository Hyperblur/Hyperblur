"use client";

import * as React from "react";

export interface CursorPixelTrailProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  cell?: number;
  gap?: number;
  steps?: number;
  stepMs?: number;
  radius?: number;
  showGrid?: boolean;
  idle?: boolean;
}

const css = `
.hb-qi7 { position: relative; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; isolation: isolate; font-family: inherit; }
.hb-qi7 *, .hb-qi7 *::before, .hb-qi7 *::after { box-sizing: border-box; }
.hb-qi7-canvas { position: absolute; inset: 0; z-index: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.hb-qi7-content { position: relative; z-index: 1; width: 100%; height: 100%; }
`;

export function CursorPixelTrail({
  color = "#2f7bff",
  cell = 14,
  gap = 2,
  steps = 6,
  stepMs = 70,
  radius = 1,
  showGrid = true,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorPixelTrailProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = Math.max(4, cell);
    const pad = Math.max(0, Math.min(size - 2, gap));
    const levels = Math.max(1, Math.floor(steps));
    const tick = Math.max(16, stepMs) / 1000;
    const rr = Math.max(0, radius);
    let cols = 0;
    let rows = 0;
    let grid = new Uint8Array(0);
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
    let acc = 0;
    let visible = true;
    let placed = false;

    const stamp = (x: number, y: number) => {
      const c0 = Math.floor(x / size);
      const r0 = Math.floor(y / size);
      const span = Math.ceil(rr);
      for (let dy = -span; dy <= span; dy++) {
        for (let dx = -span; dx <= span; dx++) {
          if (dx * dx + dy * dy > rr * rr + 0.01) continue;
          const c = c0 + dx;
          const r = r0 + dy;
          if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
          grid[r * cols + c] = levels;
        }
      }
    };

    const step = (dt: number) => {
      t += dt;
      mix += ((active ? 1 : 0) - mix) * (1 - Math.exp(-dt * 4));
      const ix = idle ? w * (0.5 + 0.38 * Math.sin(t * 0.7) + 0.04 * Math.sin(t * 2.3)) : px;
      const iy = idle ? h * (0.5 + 0.32 * Math.sin(t * 1.15 + 0.9)) : py;
      const tx = ix + (px - ix) * mix;
      const ty = iy + (py - iy) * mix;
      acc += dt;
      while (acc >= tick) {
        acc -= tick;
        for (let i = 0; i < grid.length; i++) if (grid[i]) grid[i]--;
      }
      const dx = tx - lx;
      const dy = ty - ly;
      const d = Math.hypot(dx, dy);
      if (d > 0.5) {
        const k = Math.max(1, Math.ceil(d / (size * 0.5)));
        for (let i = 1; i <= k; i++) stamp(lx + (dx * i) / k, ly + (dy * i) / k);
      }
      lx = tx;
      ly = ty;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const inner = size - pad;
      const off = pad / 2;
      if (showGrid) {
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) ctx.fillRect(c * size + off, r * size + off, inner, inner);
        }
      }
      ctx.fillStyle = color;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = grid[r * cols + c];
          if (!v) continue;
          ctx.globalAlpha = v / levels;
          ctx.fillRect(c * size + off, r * size + off, inner, inner);
        }
      }
      ctx.fillStyle = "#ffffff";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r * cols + c] !== levels) continue;
          ctx.globalAlpha = 0.35;
          ctx.fillRect(c * size + off, r * size + off, inner, inner);
        }
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      step(dt);
      draw();
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
      cols = Math.ceil(w / size);
      rows = Math.ceil(h / size);
      grid = new Uint8Array(cols * rows);
      if (!placed) {
        placed = true;
        px = w / 2;
        py = h / 2;
        lx = idle ? w * 0.5 : px;
        ly = idle ? h * (0.5 + 0.32 * Math.sin(0.9)) : py;
      }
      if (reduced) {
        if (idle) {
          for (let i = 0; i < 24; i++) step(1 / 60);
        }
        draw();
      } else {
        start();
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const s = r.width ? w / r.width : 1;
      px = (e.clientX - r.left) * s;
      py = (e.clientY - r.top) * s;
      if (!active && !idle && mix < 0.02) {
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
  }, [color, cell, gap, steps, stepMs, radius, showGrid, idle]);

  return (
    <div ref={rootRef} className={`hb-qi7 ${className}`} style={style} {...rest}>
      <style href="hb-cursor-pixel-trail" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qi7-canvas" aria-hidden="true" />
      <div className="hb-qi7-content">{children}</div>
    </div>
  );
}
