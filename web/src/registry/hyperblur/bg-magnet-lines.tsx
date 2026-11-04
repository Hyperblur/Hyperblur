"use client";

import * as React from "react";

export interface BgMagnetLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: number;
  length?: number;
  thickness?: number;
  color?: string;
  accent?: string;
  radius?: number;
  swirl?: number;
  speed?: number;
}

const css = `
.hb-qj2 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-qj2-c { display: block; width: 100%; height: 100%; }
`;

export function BgMagnetLines({
  spacing = 26,
  length = 12,
  thickness = 2,
  color = "rgba(255,255,255,0.2)",
  accent = "#2f7bff",
  radius = 200,
  swirl = 1,
  speed = 1,
  className = "",
  style,
  ...rest
}: BgMagnetLinesProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const gap = Math.max(10, spacing);
    const R = Math.max(30, radius);
    let w = 0;
    let h = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let presence = 0;
    let placed = false;

    function idleX(tt: number) {
      return w * (0.5 + 0.3 * Math.sin(tt * 0.37 + 0.4));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.32 * Math.sin(tt * 0.59 + 1.6));
    }

    function track(dt: number) {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed) {
        px = gx;
        py = gy;
        placed = true;
        return;
      }
      const k = 1 - Math.exp(-dt * (inside ? 9 : 2.2));
      px += (gx - px) * k;
      py += (gy - py) * k;
      presence += ((inside ? 1 : 0) - presence) * (1 - Math.exp(-dt * 3));
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;
      const idle = (1 - presence) * swirl;
      ctx.lineCap = "round";
      ctx.lineWidth = thickness;
      ctx.strokeStyle = color;
      ctx.beginPath();
      const near: number[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ox + c * gap;
          const y = oy + r * gap;
          const dx = px - x;
          const dy = py - y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const a = Math.atan2(dy, dx) + idle * 0.85 * Math.sin(t * 0.55 + x * 0.006 - y * 0.0045);
          const k = Math.max(0, 1 - d / R);
          const half = (length * (0.7 + 0.65 * k)) / 2;
          const cx = Math.cos(a) * half;
          const cy = Math.sin(a) * half;
          ctx.moveTo(x - cx, y - cy);
          ctx.lineTo(x + cx, y + cy);
          if (k > 0) near.push(x - cx, y - cy, x + cx, y + cy, k);
        }
      }
      ctx.stroke();
      ctx.strokeStyle = accent;
      for (let i = 0; i < near.length; i += 5) {
        ctx.globalAlpha = near[i + 4] * near[i + 4];
        ctx.beginPath();
        ctx.moveTo(near[i], near[i + 1]);
        ctx.lineTo(near[i + 2], near[i + 3]);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function resize() {
      if (!wrap || !canvas || !ctx) return;
      const nw = wrap.clientWidth;
      const nh = wrap.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (motion.matches) still();
      else {
        track(0);
        draw();
      }
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 3.1;
      inside = false;
      placed = false;
      presence = 0;
      track(0);
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      track(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    function sync() {
      const run = visible && !document.hidden && !motion.matches;
      if (run && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (motion.matches) still();
    }

    function move(e: PointerEvent) {
      if (!host || motion.matches) return;
      const rect = host.getBoundingClientRect();
      const sx = rect.width ? host.clientWidth / rect.width : 1;
      const sy = rect.height ? host.clientHeight / rect.height : 1;
      tx = (e.clientX - rect.left) * sx;
      ty = (e.clientY - rect.top) * sy;
      inside = true;
    }

    function leave(e: PointerEvent) {
      if (e.type === "pointerup" && e.pointerType === "mouse") return;
      inside = false;
    }

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
  }, [spacing, length, thickness, color, accent, radius, swirl, speed]);

  return (
    <div ref={wrapRef} className={`hb-qj2 ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-bg-magnet-lines" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qj2-c" />
    </div>
  );
}
