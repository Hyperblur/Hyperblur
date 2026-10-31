"use client";

import * as React from "react";

export interface CursorTrailProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  length?: number;
  size?: number;
  fade?: number;
  variant?: "dots" | "ribbon";
}

const css = `
.hb-ct { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-ct-c { display: block; width: 100%; height: 100%; }
@media (prefers-reduced-motion: reduce) {
  .hb-ct { display: none; }
}
`;

export function CursorTrail({
  color = "#2f7bff",
  length = 24,
  size = 6,
  fade = 0.9,
  variant = "ribbon",
  className = "",
  style,
  ...rest
}: CursorTrailProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const TAU = Math.PI * 2;
    const STEP = 1000 / 60;
    const cap = Math.max(2, Math.min(120, Math.floor(length)));
    const f = Math.min(1, Math.max(0, fade));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pts: number[] = [];
    let w = 0;
    let h = 0;
    let mx = 0;
    let my = 0;
    let pointerOn = false;
    let raf = 0;
    let prev = 0;
    let acc = 0;

    const drawDots = (n: number) => {
      ctx.fillStyle = color;
      for (let i = 0; i < n; i++) {
        const t = (i + 1) / n;
        ctx.globalAlpha = 1 - f * (1 - t);
        ctx.beginPath();
        ctx.arc(pts[i * 2], pts[i * 2 + 1], size * 0.5 * (0.3 + 0.7 * t), 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawRibbon = (n: number) => {
      const sx: number[] = [pts[0]];
      const sy: number[] = [pts[1]];
      const st: number[] = [0];
      for (let i = 0; i < n; i++) {
        const cx = pts[i * 2];
        const cy = pts[i * 2 + 1];
        const ax = i === 0 ? cx : (pts[(i - 1) * 2] + cx) / 2;
        const ay = i === 0 ? cy : (pts[(i - 1) * 2 + 1] + cy) / 2;
        const bx = i === n - 1 ? cx : (cx + pts[(i + 1) * 2]) / 2;
        const by = i === n - 1 ? cy : (cy + pts[(i + 1) * 2 + 1]) / 2;
        for (let k = 1; k <= 4; k++) {
          const u = k / 4;
          const v = 1 - u;
          sx.push(v * v * ax + 2 * v * u * cx + u * u * bx);
          sy.push(v * v * ay + 2 * v * u * cy + u * u * by);
          st.push((i + u) / n);
        }
      }
      const m = sx.length;
      const lx: number[] = [];
      const ly: number[] = [];
      const rx: number[] = [];
      const ry: number[] = [];
      let nx = 0;
      let ny = 1;
      for (let j = 0; j < m; j++) {
        const a = j === 0 ? 0 : j - 1;
        const b = j === m - 1 ? m - 1 : j + 1;
        const dx = sx[b] - sx[a];
        const dy = sy[b] - sy[a];
        const len = Math.hypot(dx, dy);
        if (len > 1e-6) {
          nx = -dy / len;
          ny = dx / len;
        }
        const hw = size * 0.5 * st[j];
        lx.push(sx[j] + nx * hw);
        ly.push(sy[j] + ny * hw);
        rx.push(sx[j] - nx * hw);
        ry.push(sy[j] - ny * hw);
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(lx[0], ly[0]);
      for (let j = 1; j < m; j++) ctx.lineTo(lx[j], ly[j]);
      for (let j = m - 1; j >= 0; j--) ctx.lineTo(rx[j], ry[j]);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(sx[m - 1], sy[m - 1], size * 0.5, 0, TAU);
      ctx.fill();
      ctx.globalCompositeOperation = "destination-in";
      if (Math.hypot(sx[m - 1] - sx[0], sy[m - 1] - sy[0]) > 1) {
        const g = ctx.createLinearGradient(sx[0], sy[0], sx[m - 1], sy[m - 1]);
        g.addColorStop(0, `rgba(0,0,0,${1 - f})`);
        g.addColorStop(1, "rgba(0,0,0,1)");
        ctx.fillStyle = g;
      } else {
        ctx.fillStyle = `rgba(0,0,0,${1 - f * 0.5})`;
      }
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const n = pts.length / 2;
      if (n < 2) return;
      if (variant === "dots") drawDots(n);
      else drawRibbon(n);
    };

    const tick = () => {
      if (pointerOn) {
        pts.push(mx, my);
        if (pts.length > cap * 2) pts.splice(0, pts.length - cap * 2);
      } else if (pts.length) {
        pts.splice(0, 2);
      }
    };

    const alive = () => {
      const n = pts.length / 2;
      if (!pointerOn) return n > 0;
      for (let i = 0; i < n; i++) {
        if (Math.abs(pts[i * 2] - mx) + Math.abs(pts[i * 2 + 1] - my) > 0.5) return true;
      }
      return false;
    };

    const frame = (now: number) => {
      acc += Math.min(100, Math.max(0, now - prev));
      prev = now;
      let ticks = 0;
      while (acc >= STEP && ticks < 6) {
        acc -= STEP;
        ticks++;
        tick();
      }
      if (acc > STEP) acc = 0;
      draw();
      if (alive()) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
        pts.length = 0;
        ctx.clearRect(0, 0, w, h);
      }
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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const move = (ev: Event) => {
      const e = ev as PointerEvent;
      if (e.pointerType === "touch" || motion.matches) return;
      const r = wrap.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      if (!pointerOn) {
        pts.length = 0;
        pointerOn = true;
      }
      if (!raf) {
        prev = performance.now();
        acc = STEP;
        raf = requestAnimationFrame(frame);
      }
    };

    const leave = () => {
      pointerOn = false;
      if (pts.length && !raf) {
        prev = performance.now();
        acc = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    resize();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [color, length, size, fade, variant]);

  return (
    <div ref={wrapRef} className={`hb-ct ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-cursor-trail" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ct-c" />
    </div>
  );
}
