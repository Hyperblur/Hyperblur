"use client";

import * as React from "react";

export interface LightRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  rays?: number;
  origin?: "top" | "top-left" | "top-right";
  speed?: number;
  spread?: number;
  intensity?: number;
  seed?: number;
}

const css = `
.hb-lr { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-lr-c { display: block; width: 100%; height: 100%; mix-blend-mode: screen; }
`;

const LAYER_WIDTH = [1, 0.6, 0.3];
const LAYER_ALPHA = [0.4, 0.35, 0.35];

function rnd(seed: number, i: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) + Math.imul(seed | 0, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

export function LightRays({
  color = "#2f7bff",
  rays = 12,
  origin = "top",
  speed = 1,
  spread = 60,
  intensity = 0.6,
  seed = 1,
  className = "",
  style,
  ...rest
}: LightRaysProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const probe = document.createElement("canvas");
    probe.width = 1;
    probe.height = 1;
    const pctx = probe.getContext("2d", { willReadFrequently: true });
    if (!wrap || !canvas || !ctx || !pctx) return;

    pctx.fillStyle = "#000";
    pctx.fillStyle = color;
    pctx.fillRect(0, 0, 1, 1);
    const rgb = pctx.getImageData(0, 0, 1, 1).data;
    const tint = `${rgb[0]},${rgb[1]},${rgb[2]}`;

    const n = Math.max(1, Math.min(64, Math.floor(rays)));
    const TAU = Math.PI * 2;
    const deg = Math.PI / 180;
    const sp = Math.max(5, Math.min(170, spread)) * deg;
    const gain = Math.min(1, Math.max(0, intensity));
    const spacing = sp / n;
    const offset = new Float32Array(n);
    const half = new Float32Array(n);
    const base = new Float32Array(n);
    const pulseRate = new Float32Array(n);
    const swayRate = new Float32Array(n);
    const phase = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      offset[i] = ((i + 0.5) / n - 0.5) * sp + (rnd(seed, i * 8 + 1) - 0.5) * spacing * 0.8;
      half[i] = spacing * (0.12 + rnd(seed, i * 8 + 2) * 0.38);
      base[i] = 0.35 + rnd(seed, i * 8 + 3) * 0.65;
      pulseRate[i] = 0.4 + rnd(seed, i * 8 + 4) * 0.8;
      swayRate[i] = 0.1 + rnd(seed, i * 8 + 5) * 0.2;
      phase[i] = rnd(seed, i * 8 + 6) * TAU;
    }

    let w = 0;
    let h = 0;
    let ox = 0;
    let oy = 0;
    let aim = Math.PI / 2;
    let reach = 1;
    let rayFill: CanvasGradient | null = null;
    let glowFill: CanvasGradient | null = null;
    let time = 10 + rnd(seed, 999) * 40;

    function draw(t: number) {
      if (!ctx || !canvas || !rayFill || !glowFill || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const tt = t * speed;
      const turn = Math.sin(tt * 0.12) * sp * 0.07;
      ctx.fillStyle = rayFill;
      for (let i = 0; i < n; i++) {
        const pulse = 0.5 + 0.5 * Math.sin(tt * pulseRate[i] + phase[i]);
        const a = Math.min(1, base[i] * (0.3 + 0.7 * pulse) * gain * 1.3);
        const mid = aim + offset[i] + turn + Math.sin(tt * swayRate[i] + phase[i]) * sp * 0.04;
        for (let l = 0; l < 3; l++) {
          const hw = half[i] * LAYER_WIDTH[l] * (0.9 + 0.1 * pulse);
          ctx.globalAlpha = a * LAYER_ALPHA[l];
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.lineTo(ox + Math.cos(mid - hw) * reach, oy + Math.sin(mid - hw) * reach);
          ctx.lineTo(ox + Math.cos(mid + hw) * reach, oy + Math.sin(mid + hw) * reach);
          ctx.closePath();
          ctx.fill();
        }
      }
      ctx.globalAlpha = Math.min(1, gain * 0.6);
      ctx.fillStyle = glowFill;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }

    function resize() {
      if (!wrap || !canvas || !ctx) return;
      const nw = wrap.clientWidth;
      const nh = wrap.clientHeight;
      if (!nw || !nh) return;
      w = nw;
      h = nh;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      let tx = 0.5 * w;
      if (origin === "top-left") {
        ox = 0.1 * w;
        tx = 0.55 * w;
      } else if (origin === "top-right") {
        ox = 0.9 * w;
        tx = 0.45 * w;
      } else {
        ox = 0.5 * w;
      }
      oy = -0.1 * h;
      aim = Math.atan2(h - oy, tx - ox);
      reach = Math.hypot(w, h) * 1.4;
      rayFill = ctx.createRadialGradient(ox, oy, 0, ox, oy, reach);
      rayFill.addColorStop(0, `rgba(${tint},1)`);
      rayFill.addColorStop(0.2, `rgba(${tint},0.6)`);
      rayFill.addColorStop(0.55, `rgba(${tint},0.18)`);
      rayFill.addColorStop(1, `rgba(${tint},0)`);
      const gr = Math.max(w, h) * 0.55;
      glowFill = ctx.createRadialGradient(ox, oy, 0, ox, oy, gr);
      glowFill.addColorStop(0, `rgba(${tint},0.9)`);
      glowFill.addColorStop(0.4, `rgba(${tint},0.25)`);
      glowFill.addColorStop(1, `rgba(${tint},0)`);
      draw(time);
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      time += dt;
      draw(time);
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
      draw(time);
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
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", onMotion);
    };
  }, [color, rays, origin, speed, spread, intensity, seed]);

  return (
    <div ref={wrapRef} className={`hb-lr ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-light-rays" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-lr-c" />
    </div>
  );
}
