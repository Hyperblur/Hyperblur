"use client";

import * as React from "react";

export interface ParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  color?: string;
  lineColor?: string;
  linkDistance?: number;
  speed?: number;
  size?: number;
  seed?: number;
}

const css = `
.hb-pt { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-pt-c { display: block; width: 100%; height: 100%; }
`;

function rnd(seed: number, i: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) + Math.imul(seed | 0, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

export function Particles({
  count = 80,
  color = "#ffffff",
  lineColor = "#2f7bff",
  linkDistance = 120,
  speed = 1,
  size = 2,
  seed = 1,
  className = "",
  style,
  ...rest
}: ParticlesProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const n = Math.max(0, Math.min(600, Math.floor(count)));
    const TAU = Math.PI * 2;
    const link = Math.max(1, linkDistance);
    const link2 = link * link;
    const reach = Math.max(80, link * 1.2);
    const reach2 = reach * reach;
    const nx = new Float32Array(n);
    const ny = new Float32Array(n);
    const bx = new Float32Array(n);
    const by = new Float32Array(n);
    const vx = new Float32Array(n);
    const vy = new Float32Array(n);
    const rad = new Float32Array(n);
    const alpha = new Float32Array(n);
    const px = new Float32Array(n);
    const py = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      const a = rnd(seed, i * 8 + 1) * TAU;
      const v = 10 + rnd(seed, i * 8 + 2) * 20;
      nx[i] = rnd(seed, i * 8 + 3);
      ny[i] = rnd(seed, i * 8 + 4);
      bx[i] = Math.cos(a) * v;
      by[i] = Math.sin(a) * v;
      vx[i] = bx[i];
      vy[i] = by[i];
      rad[i] = size * (0.55 + rnd(seed, i * 8 + 5) * 0.9);
      alpha[i] = 0.4 + rnd(seed, i * 8 + 6) * 0.6;
    }

    let w = 0;
    let h = 0;
    let pointerOn = false;
    let mx = 0;
    let my = 0;
    let placed = false;

    function place() {
      for (let i = 0; i < n; i++) {
        px[i] = nx[i] * w;
        py[i] = ny[i] * h;
      }
      placed = true;
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = lineColor;
      for (let i = 0; i < n; i++) {
        const x = px[i];
        const y = py[i];
        for (let j = i + 1; j < n; j++) {
          const dx = px[j] - x;
          const dy = py[j] - y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= link2) continue;
          const k = 1 - Math.sqrt(d2) / link;
          ctx.globalAlpha = k * k * 0.7;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(px[j], py[j]);
          ctx.stroke();
        }
        if (pointerOn) {
          const dx = mx - x;
          const dy = my - y;
          const d2 = dx * dx + dy * dy;
          if (d2 < link2) {
            const k = 1 - Math.sqrt(d2) / link;
            ctx.globalAlpha = k * k * 0.9;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = color;
      for (let i = 0; i < n; i++) {
        ctx.globalAlpha = alpha[i];
        ctx.beginPath();
        ctx.arc(px[i], py[i], rad[i], 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function step(dt: number) {
      const relax = Math.min(1, dt * 1.5);
      const margin = 10;
      for (let i = 0; i < n; i++) {
        vx[i] += (bx[i] * speed - vx[i]) * relax;
        vy[i] += (by[i] * speed - vy[i]) * relax;
        if (pointerOn) {
          const dx = px[i] - mx;
          const dy = py[i] - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < reach2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / reach) * 160 * dt;
            vx[i] += (dx / d) * f;
            vy[i] += (dy / d) * f;
          }
        }
        let x = px[i] + vx[i] * dt;
        let y = py[i] + vy[i] * dt;
        if (x < -margin) x = w + margin;
        else if (x > w + margin) x = -margin;
        if (y < -margin) y = h + margin;
        else if (y > h + margin) y = -margin;
        px[i] = x;
        py[i] = y;
      }
    }

    function resize() {
      if (!wrap || !canvas || !ctx) return;
      const nw = wrap.clientWidth;
      const nh = wrap.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (placed && w && h) {
        for (let i = 0; i < n; i++) {
          px[i] = (px[i] / w) * nw;
          py[i] = (py[i] / h) * nh;
        }
      }
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!placed) place();
      draw();
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
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
    }

    function onMotion() {
      sync();
      draw();
    }

    function move(e: PointerEvent) {
      if (!host) return;
      const rect = host.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      pointerOn = !motion.matches;
    }

    function leave() {
      pointerOn = false;
    }

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });
    ro.observe(wrap);
    io.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", onMotion);
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", onMotion);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [count, color, lineColor, linkDistance, speed, size, seed]);

  return (
    <div ref={wrapRef} className={`hb-pt ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-particles" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-pt-c" />
    </div>
  );
}
