"use client";

import * as React from "react";

export interface CursorGlareGridProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  spacing?: number;
  size?: number;
  radius?: number;
  idle?: boolean;
}

const css = `
.hb-qia { position: relative; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; isolation: isolate; font-family: inherit; }
.hb-qia *, .hb-qia *::before, .hb-qia *::after { box-sizing: border-box; }
.hb-qia-canvas { position: absolute; inset: 0; z-index: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.hb-qia-content { position: relative; z-index: 1; width: 100%; height: 100%; }
`;

export function CursorGlareGrid({
  color = "#4a4a4a",
  accent = "#2f7bff",
  spacing = 18,
  size = 7,
  radius = 150,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorGlareGridProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gap = Math.max(6, spacing);
    const reach = Math.max(20, radius);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let px = 0;
    let py = 0;
    let cx = 0;
    let cy = 0;
    let active = false;
    let mix = 0;
    let raf = 0;
    let last = 0;
    let t = 0;
    let visible = true;
    let placed = false;

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ox + c * gap;
          const y = oy + r * gap;
          const dx = cx - x;
          const dy = cy - y;
          const d = Math.hypot(dx, dy);
          const q = d / reach;
          const f = 1 / (1 + q * q * 2.2);
          const a = Math.atan2(dy, dx);
          const len = size * (0.5 + f * 1.1);
          const thick = size * (0.32 + f * 0.25);
          const cos = Math.cos(a);
          const sin = Math.sin(a);
          ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * x, dpr * y);
          ctx.globalAlpha = 0.45 + 0.3 * f;
          ctx.fillStyle = color;
          ctx.fillRect(-len / 2, -thick / 2, len, thick);
          if (f > 0.08) {
            ctx.globalAlpha = Math.min(1, (f - 0.08) * 1.25);
            ctx.fillStyle = accent;
            ctx.fillRect(-len / 2, -thick / 2, len, thick);
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const step = (dt: number) => {
      t += dt;
      mix += ((active ? 1 : 0) - mix) * (1 - Math.exp(-dt * 3.5));
      const ix = idle ? w * (0.5 + 0.34 * Math.sin(t * 0.45) + 0.05 * Math.sin(t * 1.4)) : px;
      const iy = idle ? h * (0.5 + 0.3 * Math.sin(t * 0.72 + 0.5)) : py;
      const tx = ix + (px - ix) * mix;
      const ty = iy + (py - iy) * mix;
      const k = 1 - Math.exp(-dt * 8);
      cx += (tx - cx) * k;
      cy += (ty - cy) * k;
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
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      if (!placed) {
        placed = true;
        px = w / 2;
        py = h / 2;
        cx = idle ? w * 0.5 : px;
        cy = idle ? h * (0.5 + 0.3 * Math.sin(0.5)) : py;
      }
      if (reduced) {
        cx = w * 0.66;
        cy = h * 0.42;
        draw();
      } else {
        draw();
        start();
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const s = r.width ? w / r.width : 1;
      px = (e.clientX - r.left) * s;
      py = (e.clientY - r.top) * s;
      active = true;
      if (reduced) {
        cx = px;
        cy = py;
        draw();
      }
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
  }, [color, accent, spacing, size, radius, idle]);

  return (
    <div ref={rootRef} className={`hb-qia ${className}`} style={style} {...rest}>
      <style href="hb-cursor-glare-grid" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qia-canvas" aria-hidden="true" />
      <div className="hb-qia-content">{children}</div>
    </div>
  );
}
