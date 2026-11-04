"use client";

import * as React from "react";

export interface BgSilkThreadsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  color?: string;
  accent?: string;
  amplitude?: number;
  thickness?: number;
  push?: number;
  radius?: number;
  speed?: number;
}

const css = `
.hb-qq3 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qq3-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qq3-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function qq3Hash(n: number) {
  let x = Math.imul(n | 0, 2654435761);
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519);
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

export function BgSilkThreads({
  count = 40,
  color = "#d9e2ff",
  accent = "#2f7bff",
  amplitude = 18,
  thickness = 1,
  push = 34,
  radius = 90,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgSilkThreadsProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const n = Math.max(4, Math.min(160, Math.round(count)));
    const ph1 = new Float32Array(n);
    const ph2 = new Float32Array(n);
    const k1 = new Float32Array(n);
    const k2 = new Float32Array(n);
    const sp1 = new Float32Array(n);
    const sp2 = new Float32Array(n);
    const amp = new Float32Array(n);
    const depth = new Float32Array(n);
    const shine = new Float32Array(n);
    const jitter = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const b = i * 11 + 3;
      ph1[i] = i * 0.21 + qq3Hash(b) * 0.6;
      ph2[i] = qq3Hash(b + 1) * Math.PI * 2;
      k1[i] = 0.006 + qq3Hash(b + 2) * 0.004;
      k2[i] = 0.013 + qq3Hash(b + 3) * 0.008;
      sp1[i] = 0.5 + qq3Hash(b + 4) * 0.35;
      sp2[i] = 0.3 + qq3Hash(b + 5) * 0.5;
      amp[i] = 0.7 + qq3Hash(b + 6) * 0.6;
      depth[i] = qq3Hash(b + 7);
      shine[i] = qq3Hash(b + 8);
      jitter[i] = qq3Hash(b + 9) - 0.5;
    }
    let disp = new Float32Array(0);

    let w = 0;
    let h = 0;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let act = 0;
    let placed = false;
    let step = 6;
    let pts = 0;

    function idleX(tt: number) {
      return w * (0.5 + 0.38 * Math.sin(tt * 0.33 + 1.1));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.3 * Math.sin(tt * 0.58 + 0.2));
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
      const k = 1 - Math.exp(-dt * (inside ? 10 : 2.2));
      px += (gx - px) * k;
      py += (gy - py) * k;
      act += ((inside ? 1 : 0) - act) * (1 - Math.exp(-dt * 3));
    }

    function base(i: number, x: number) {
      const top = h * 0.12;
      const span = h * 0.76;
      const y0 = top + ((i + 0.5 + jitter[i] * 0.6) / n) * span;
      const a = amplitude * amp[i];
      return (
        y0 +
        a * Math.sin(x * k1[i] + t * sp1[i] + ph1[i]) +
        a * 0.45 * Math.sin(x * k2[i] - t * sp2[i] + ph2[i]) +
        a * 0.6 * Math.sin(x * 0.0035 + t * 0.21)
      );
    }

    function draw(dt: number) {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const R = Math.max(20, radius);
      const sigma2 = 2 * R * R * 0.45;
      const force = push * (0.45 + 0.55 * act);
      const soft = R * 0.22;
      const ease = dt > 0 ? 1 - Math.exp(-dt * 9) : 1;
      for (let i = 0; i < n; i++) {
        const d = depth[i];
        const band = (((t * 0.045 * (0.6 + d)) + shine[i]) % 1.4) - 0.2;
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        const lo = Math.max(0, Math.min(1, band - 0.18));
        const mid = Math.max(0, Math.min(1, band));
        const hi = Math.max(0, Math.min(1, band + 0.18));
        const tone = i % 3 === 0 ? accent : color;
        grad.addColorStop(0, tone);
        grad.addColorStop(lo, tone);
        grad.addColorStop(mid, "#ffffff");
        grad.addColorStop(hi, tone);
        grad.addColorStop(1, tone);
        ctx.strokeStyle = grad;
        ctx.globalAlpha = 0.14 + d * 0.32;
        ctx.lineWidth = thickness * (0.5 + d * 0.9);
        ctx.beginPath();
        for (let p = 0; p < pts; p++) {
          const x = p * step - step;
          const y = base(i, x);
          const dx = x - px;
          const dy = y - py;
          const g = Math.exp(-(dx * dx) / sigma2);
          const target = (dy / Math.sqrt(dy * dy + soft * soft)) * force * g * Math.exp(-Math.abs(dy) / (R * 1.4));
          const o = i * pts + p;
          disp[o] += (target - disp[o]) * ease;
          const yy = y + disp[o];
          if (p === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "destination-out";
      const fade = ctx.createLinearGradient(0, 0, w, 0);
      fade.addColorStop(0, "rgba(0,0,0,1)");
      fade.addColorStop(0.1, "rgba(0,0,0,0)");
      fade.addColorStop(0.9, "rgba(0,0,0,0)");
      fade.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
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
      step = Math.max(5, w / 140);
      pts = Math.ceil(w / step) + 3;
      disp = new Float32Array(n * pts);
      if (motion.matches) still();
      else {
        track(0);
        draw(0);
      }
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 2.5;
      inside = false;
      placed = false;
      act = 0;
      track(0);
      draw(0);
    }

    function frame(now: number) {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      track(dt);
      draw(dt);
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
      if (!wrap || motion.matches) return;
      const rect = wrap.getBoundingClientRect();
      const kx = rect.width ? wrap.clientWidth / rect.width : 1;
      const ky = rect.height ? wrap.clientHeight / rect.height : 1;
      tx = (e.clientX - rect.left) * kx;
      ty = (e.clientY - rect.top) * ky;
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
  }, [count, color, accent, amplitude, thickness, push, radius, speed]);

  return (
    <div ref={wrapRef} className={`hb-qq3 ${className}`} style={style} {...rest}>
      <style href="hb-bg-silk-threads" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qq3-c" aria-hidden="true" />
      {children ? <div className="hb-qq3-in">{children}</div> : null}
    </div>
  );
}
