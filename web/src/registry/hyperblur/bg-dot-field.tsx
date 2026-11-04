"use client";

import * as React from "react";

export interface BgDotFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: number;
  size?: number;
  color?: string;
  accent?: string;
  radius?: number;
  push?: number;
  grow?: number;
  speed?: number;
}

const css = `
.hb-qj3 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-qj3-c { display: block; width: 100%; height: 100%; }
`;

export function BgDotField({
  spacing = 16,
  size = 1.3,
  color = "rgba(255,255,255,0.3)",
  accent = "#2f7bff",
  radius = 110,
  push = 22,
  grow = 1.8,
  speed = 1,
  className = "",
  style,
  ...rest
}: BgDotFieldProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const R = Math.max(20, radius);
    const R2 = R * R;
    const TAU = Math.PI * 2;
    let w = 0;
    let h = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;
    let gap = Math.max(6, spacing);
    let n = 0;
    let bx = new Float32Array(0);
    let by = new Float32Array(0);
    let ox = new Float32Array(0);
    let oy = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let kk = new Float32Array(0);

    function idleX(tt: number) {
      return w * (0.5 + 0.34 * Math.sin(tt * 0.43 + 2.1));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.3 * Math.sin(tt * 0.71 + 0.3));
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
      const k = 1 - Math.exp(-dt * (inside ? 12 : 2.6));
      px += (gx - px) * k;
      py += (gy - py) * k;
    }

    function layout() {
      gap = Math.max(6, spacing);
      while ((w / gap + 1) * (h / gap + 1) > 14000) gap *= 1.15;
      const cols = Math.floor(w / gap) + 1;
      const rows = Math.floor(h / gap) + 1;
      const sx = (w - (cols - 1) * gap) / 2;
      const sy = (h - (rows - 1) * gap) / 2;
      n = cols * rows;
      bx = new Float32Array(n);
      by = new Float32Array(n);
      ox = new Float32Array(n);
      oy = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      kk = new Float32Array(n);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          bx[i] = sx + c * gap;
          by[i] = sy + r * gap;
        }
      }
    }

    function settle() {
      for (let i = 0; i < n; i++) {
        const dx = bx[i] - px;
        const dy = by[i] - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const k = 1 - d / R;
          ox[i] = (dx / d) * k * k * push;
          oy[i] = (dy / d) * k * k * push;
          kk[i] = k;
        } else {
          ox[i] = 0;
          oy[i] = 0;
          kk[i] = 0;
        }
        vx[i] = 0;
        vy[i] = 0;
      }
    }

    function step(dt: number) {
      const stiff = 130;
      const damp = 11;
      const pulse = 0.85 + 0.15 * Math.sin(t * 1.7);
      for (let i = 0; i < n; i++) {
        const dx = bx[i] - px;
        const dy = by[i] - py;
        const d2 = dx * dx + dy * dy;
        let gx = 0;
        let gy = 0;
        let k = 0;
        if (d2 < R2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          k = 1 - d / R;
          const f = k * k * push * pulse;
          gx = (dx / d) * f;
          gy = (dy / d) * f;
        }
        kk[i] += (k - kk[i]) * Math.min(1, dt * 10);
        vx[i] += ((gx - ox[i]) * stiff - vx[i] * damp) * dt;
        vy[i] += ((gy - oy[i]) * stiff - vy[i] * damp) * dt;
        ox[i] += vx[i] * dt;
        oy[i] += vy[i] * dt;
      }
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const x = bx[i] + ox[i];
        const y = by[i] + oy[i];
        ctx.moveTo(x + size, y);
        ctx.arc(x, y, size, 0, TAU);
      }
      ctx.fill();
      ctx.fillStyle = accent;
      for (let i = 0; i < n; i++) {
        const k = kk[i];
        if (k < 0.02) continue;
        ctx.globalAlpha = Math.min(1, k * 1.4);
        ctx.beginPath();
        ctx.arc(bx[i] + ox[i], by[i] + oy[i], size * (1 + grow * k), 0, TAU);
        ctx.fill();
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
      layout();
      if (motion.matches) still();
      else {
        track(0);
        settle();
        draw();
      }
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 1.4;
      inside = false;
      placed = false;
      track(0);
      settle();
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      track(dt);
      step(dt);
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
  }, [spacing, size, color, accent, radius, push, grow, speed]);

  return (
    <div ref={wrapRef} className={`hb-qj3 ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-bg-dot-field" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qj3-c" />
    </div>
  );
}
