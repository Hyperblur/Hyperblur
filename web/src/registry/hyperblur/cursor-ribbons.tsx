"use client";

import * as React from "react";

export interface CursorRibbonsProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  count?: number;
  length?: number;
  width?: number;
  idle?: boolean;
}

const css = `
.hb-qi5 { position: relative; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; isolation: isolate; font-family: inherit; }
.hb-qi5 *, .hb-qi5 *::before, .hb-qi5 *::after { box-sizing: border-box; }
.hb-qi5-canvas { position: absolute; inset: 0; z-index: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.hb-qi5-content { position: relative; z-index: 1; width: 100%; height: 100%; }
`;

const defaultColors = ["#2f7bff", "#7fb3ff", "#c084fc", "#22d3ee"];

export function CursorRibbons({
  colors = defaultColors,
  count = 4,
  length = 26,
  width = 7,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorRibbonsProps) {
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
    const rn = Math.max(1, Math.min(10, Math.floor(count)));
    const len = Math.max(4, Math.min(80, Math.floor(length)));
    const pts = Array.from({ length: rn }, () => new Float32Array(len * 2));
    const lx = new Float32Array(len);
    const ly = new Float32Array(len);
    const rx = new Float32Array(len);
    const ry = new Float32Array(len);
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
    let placed = false;

    const step = (dt: number) => {
      t += dt;
      mix += ((active ? 1 : 0) - mix) * (1 - Math.exp(-dt * 3.5));
      const ix = idle ? w * (0.5 + 0.34 * Math.sin(t * 0.62) + 0.05 * Math.sin(t * 2.1)) : px;
      const iy = idle ? h * (0.5 + 0.28 * Math.sin(t * 1.24 + 0.3)) : py;
      const tx = ix + (px - ix) * mix;
      const ty = iy + (py - iy) * mix;
      for (let r = 0; r < rn; r++) {
        const p = pts[r];
        const orbit = 4 + r * 5;
        const ang = t * (2.2 + r * 0.55) + r * 1.9;
        const hx = tx + Math.cos(ang) * orbit;
        const hy = ty + Math.sin(ang * 1.3) * orbit;
        const kh = 1 - Math.exp(-dt * (16 - r * 1.5));
        p[0] += (hx - p[0]) * kh;
        p[1] += (hy - p[1]) * kh;
        const kf = 1 - Math.exp(-dt * (36 - r * 3));
        for (let j = 1; j < len; j++) {
          p[j * 2] += (p[(j - 1) * 2] - p[j * 2]) * kf;
          p[j * 2 + 1] += (p[(j - 1) * 2 + 1] - p[j * 2 + 1]) * kf;
        }
      }
    };

    const ribbon = (p: Float32Array, half: number) => {
      let nx = 0;
      let ny = 1;
      for (let j = 0; j < len; j++) {
        const a = j === 0 ? 0 : j - 1;
        const b = j === len - 1 ? len - 1 : j + 1;
        const dx = p[b * 2] - p[a * 2];
        const dy = p[b * 2 + 1] - p[a * 2 + 1];
        const d = Math.hypot(dx, dy);
        if (d > 0.0001) {
          nx = -dy / d;
          ny = dx / d;
        }
        const taper = half * Math.pow(1 - j / len, 0.9) + 0.3;
        lx[j] = p[j * 2] + nx * taper;
        ly[j] = p[j * 2 + 1] + ny * taper;
        rx[j] = p[j * 2] - nx * taper;
        ry[j] = p[j * 2 + 1] - ny * taper;
      }
      ctx.beginPath();
      ctx.moveTo(lx[0], ly[0]);
      for (let j = 1; j < len; j++) ctx.lineTo(lx[j], ly[j]);
      for (let j = len - 1; j >= 0; j--) ctx.lineTo(rx[j], ry[j]);
      ctx.closePath();
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let r = 0; r < rn; r++) {
        const p = pts[r];
        const g = ctx.createLinearGradient(p[0], p[1], p[(len - 1) * 2], p[(len - 1) * 2 + 1]);
        const c = list[r % list.length];
        g.addColorStop(0, c);
        g.addColorStop(1, "rgba(0,0,0,0)");
        const bw = width * (1 - r * 0.08);
        ctx.fillStyle = g;
        ctx.globalAlpha = 0.18;
        ribbon(p, bw * 1.6);
        ctx.globalAlpha = 0.85;
        ribbon(p, bw * 0.5);
        ctx.globalAlpha = 1;
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(p[0], p[1], bw * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const place = (x: number, y: number) => {
      for (const p of pts) {
        for (let j = 0; j < len; j++) {
          p[j * 2] = x - j * 3;
          p[j * 2 + 1] = y;
        }
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, Math.max(0.001, (now - last) / 1000));
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
      if (!placed) {
        placed = true;
        px = w / 2;
        py = h / 2;
        place(idle ? w * 0.5 : px, idle ? h * (0.5 + 0.28 * Math.sin(0.3)) : py);
      }
      if (reduced) {
        if (idle) {
          for (let i = 0; i < 80; i++) step(1 / 60);
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
  }, [palette, count, length, width, idle]);

  return (
    <div ref={rootRef} className={`hb-qi5 ${className}`} style={style} {...rest}>
      <style href="hb-cursor-ribbons" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qi5-canvas" aria-hidden="true" />
      <div className="hb-qi5-content">{children}</div>
    </div>
  );
}
