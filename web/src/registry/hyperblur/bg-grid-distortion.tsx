"use client";

import * as React from "react";

export interface BgGridDistortionProps extends React.HTMLAttributes<HTMLDivElement> {
  cellSize?: number;
  radius?: number;
  strength?: number;
  color?: string;
  accent?: string;
  lineWidth?: number;
  speed?: number;
}

const css = `
.hb-qj1 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-qj1-c { display: block; width: 100%; height: 100%; }
`;

export function BgGridDistortion({
  cellSize = 32,
  radius = 140,
  strength = 0.55,
  color = "rgba(255,255,255,0.13)",
  accent = "#2f7bff",
  lineWidth = 1,
  speed = 1,
  className = "",
  style,
  ...rest
}: BgGridDistortionProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const cell = Math.max(8, cellSize);
    const R = Math.max(20, radius);
    const step = Math.max(4, Math.min(12, cell / 3));
    let w = 0;
    let h = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;

    function idleX(tt: number) {
      return w * (0.5 + 0.32 * Math.sin(tt * 0.41));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.3 * Math.sin(tt * 0.67 + 0.8));
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
      const k = 1 - Math.exp(-dt * (inside ? 10 : 2.4));
      px += (gx - px) * k;
      py += (gy - py) * k;
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const amt = strength * (0.85 + 0.15 * Math.sin(t * 1.3));
      const inv = 1 / (R * R);
      const ox = (w % cell) / 2;
      const oy = (h % cell) / 2;
      const grad = ctx.createRadialGradient(px, py, 0, px, py, R * 1.7);
      grad.addColorStop(0, accent);
      grad.addColorStop(1, color);
      ctx.strokeStyle = grad;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      for (let y = oy - cell; y <= h + cell; y += cell) {
        for (let x = -cell; x <= w + cell; x += step) {
          const dx = x - px;
          const dy = y - py;
          const f = amt * Math.exp(-(dx * dx + dy * dy) * inv);
          const X = x + dx * f;
          const Y = y + dy * f;
          if (x === -cell) ctx.moveTo(X, Y);
          else ctx.lineTo(X, Y);
        }
      }
      for (let x = ox - cell; x <= w + cell; x += cell) {
        for (let y = -cell; y <= h + cell; y += step) {
          const dx = x - px;
          const dy = y - py;
          const f = amt * Math.exp(-(dx * dx + dy * dy) * inv);
          const X = x + dx * f;
          const Y = y + dy * f;
          if (y === -cell) ctx.moveTo(X, Y);
          else ctx.lineTo(X, Y);
        }
      }
      ctx.stroke();
      ctx.fillStyle = accent;
      const reach = R * 1.4;
      for (let y = oy; y <= h; y += cell) {
        for (let x = ox; x <= w; x += cell) {
          const dx = x - px;
          const dy = y - py;
          const d2 = dx * dx + dy * dy;
          if (d2 > reach * reach) continue;
          const f = amt * Math.exp(-d2 * inv);
          const k = 1 - Math.sqrt(d2) / reach;
          ctx.globalAlpha = k * 0.9;
          ctx.fillRect(x + dx * f - 1, y + dy * f - 1, 2, 2);
        }
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
      t = 2.2;
      inside = false;
      placed = false;
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
  }, [cellSize, radius, strength, color, accent, lineWidth, speed]);

  return (
    <div ref={wrapRef} className={`hb-qj1 ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-bg-grid-distortion" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qj1-c" />
    </div>
  );
}
