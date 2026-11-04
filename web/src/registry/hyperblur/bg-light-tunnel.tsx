"use client";

import * as React from "react";

export interface BgLightTunnelProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  secondaryColor?: string;
  rings?: number;
  speed?: number;
  thickness?: number;
  cornerRadius?: number;
  follow?: number;
}

const css = `
.hb-qj7 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-qj7-c { display: block; width: 100%; height: 100%; }
`;

export function BgLightTunnel({
  color = "#2f7bff",
  secondaryColor = "#b16cff",
  rings = 22,
  speed = 1,
  thickness = 1.6,
  cornerRadius = 10,
  follow = 0.7,
  className = "",
  style,
  ...rest
}: BgLightTunnelProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const count = Math.max(4, Math.min(80, Math.floor(rings)));
    let w = 0;
    let h = 0;
    let t = 0;
    let travel = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;

    function idleX(tt: number) {
      return w * (0.5 + 0.26 * Math.sin(tt * 0.35));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.24 * Math.sin(tt * 0.56 + 1.3));
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
      const k = 1 - Math.exp(-dt * (inside ? 5 : 1.8));
      px += (gx - px) * k;
      py += (gy - py) * k;
    }

    function smooth(a: number, b: number, x: number) {
      const k = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return k * k * (3 - 2 * k);
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const vx = cx + (px - cx) * follow;
      const vy = cy + (py - cy) * follow;
      ctx.globalCompositeOperation = "lighter";
      const core = ctx.createRadialGradient(vx, vy, 0, vx, vy, Math.min(w, h) * 0.35);
      core.addColorStop(0, color);
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(vx, vy);
      ctx.lineTo(0, 0);
      ctx.moveTo(vx, vy);
      ctx.lineTo(w, 0);
      ctx.moveTo(vx, vy);
      ctx.lineTo(w, h);
      ctx.moveTo(vx, vy);
      ctx.lineTo(0, h);
      ctx.stroke();
      const order: number[] = [];
      for (let i = 0; i < count; i++) order.push(i);
      const depth = (i: number) => {
        const u = (((i / count - travel) % 1) + 1) % 1;
        return u;
      };
      order.sort((a, b) => depth(b) - depth(a));
      for (const i of order) {
        const z = depth(i);
        const s = 1 / (z * 8 + 0.6);
        const q = Math.min(1, s / 1.6667);
        const rx = vx + (cx - vx) * q;
        const ry = vy + (cy - vy) * q;
        const hw = (w / 2) * s;
        const hh = (h / 2) * s;
        const a = smooth(1, 0.78, z) * smooth(0, 0.07, z);
        if (a <= 0.01) continue;
        const lw = thickness * Math.min(3.5, 0.6 + s * 1.6);
        const c = i % 2 === 0 ? color : secondaryColor;
        const rad = Math.min(cornerRadius * s, hw, hh);
        ctx.strokeStyle = c;
        ctx.beginPath();
        ctx.roundRect(rx - hw, ry - hh, hw * 2, hh * 2, rad);
        ctx.globalAlpha = a * 0.16;
        ctx.lineWidth = lw * 5;
        ctx.stroke();
        ctx.globalAlpha = a * 0.3;
        ctx.lineWidth = lw * 2.2;
        ctx.stroke();
        ctx.globalAlpha = a;
        ctx.lineWidth = lw;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
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
      t = 0;
      travel = 0.02;
      inside = false;
      placed = false;
      track(0);
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt;
      travel = (travel + dt * 0.11 * speed) % 1;
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
  }, [color, secondaryColor, rings, speed, thickness, cornerRadius, follow]);

  return (
    <div ref={wrapRef} className={`hb-qj7 ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-bg-light-tunnel" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qj7-c" />
    </div>
  );
}
