"use client";

import * as React from "react";

export interface BgWarpStarsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  stars?: number;
  cycle?: boolean;
  warp?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd4 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-vd4-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-vd4-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function hash(i: number) {
  let x = Math.imul(i ^ 0x6a09e667, 0xbb67ae85);
  x ^= x >>> 15;
  x = Math.imul(x, 0x3c6ef372);
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

function rgb(hex: string): [number, number, number] {
  let s = hex.replace("#", "");
  if (s.length === 3) s = s.split("").map((c) => c + c).join("");
  const n = parseInt(s.slice(0, 6), 16);
  if (Number.isNaN(n)) return [255, 255, 255];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function smooth(a: number, b: number, x: number) {
  const k = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return k * k * (3 - 2 * k);
}

export function BgWarpStars({
  color = "#ffffff",
  accent = "#7fb3ff",
  background = "#020308",
  stars = 420,
  cycle = true,
  warp = 0.6,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgWarpStarsProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrap || !canvas || !context) return;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;
    const g: CanvasRenderingContext2D = context;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const N = Math.max(40, Math.min(1500, Math.round(stars)));
    const xs = new Float32Array(N);
    const ys = new Float32Array(N);
    const zs = new Float32Array(N);
    const tint = new Float32Array(N);
    let seed = 0;
    function place(i: number, z: number) {
      seed++;
      const a = hash(seed * 3 + 1) * Math.PI * 2;
      const r = 0.04 + Math.sqrt(hash(seed * 3 + 2)) * 1.35;
      xs[i] = Math.cos(a) * r;
      ys[i] = Math.sin(a) * r;
      zs[i] = z;
      tint[i] = hash(seed * 3 + 3);
    }
    for (let i = 0; i < N; i++) place(i, 0.05 + hash(i + 7000) * 0.95);
    const cA = rgb(color);
    const cB = rgb(accent);
    const shades = Array.from({ length: 6 }, (_, i) => {
      const k = i / 5;
      return `rgb(${Math.round(cA[0] + (cB[0] - cA[0]) * k)},${Math.round(cA[1] + (cB[1] - cA[1]) * k)},${Math.round(cA[2] + (cB[2] - cA[2]) * k)})`;
    });
    const PERIOD = 13;
    const CRUISE = 0.07;
    const TOP = 2.4;
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let prev = 0;
    let visible = true;
    let v = CRUISE;
    let flash = 0;

    function profile(time: number) {
      if (!cycle) {
        const lv = Math.max(0, Math.min(1, warp));
        return { v: CRUISE + (TOP - CRUISE) * lv * lv, f: 0 };
      }
      const p = (time % PERIOD) / PERIOD;
      const up = smooth(0.42, 0.6, p);
      const down = smooth(0.84, 0.93, p);
      const vel = CRUISE + (TOP - CRUISE) * up * (1 - down);
      const f = p > 0.84 ? Math.exp(-(p - 0.845) * 60) * smooth(0.835, 0.845, p) : 0;
      return { v: vel, f };
    }

    function step(dt: number) {
      const pr = profile(t);
      v = pr.v;
      flash = pr.f;
      const dz = v * dt * 0.55;
      for (let i = 0; i < N; i++) {
        zs[i] -= dz;
        if (zs[i] <= 0.02) place(i, 0.96 + hash(seed + 99) * 0.04);
      }
    }

    function draw() {
      if (!w || !h) return;
      const cx = w / 2;
      const cy = h / 2;
      const fov = Math.max(w, h) * 0.55;
      const lv = Math.max(0, Math.min(1, (v - CRUISE) / (TOP - CRUISE)));
      g.globalCompositeOperation = "source-over";
      g.globalAlpha = 1;
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      if (lv > 0.01) {
        const glow = g.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6);
        glow.addColorStop(0, accent);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        g.globalAlpha = 0.28 * lv;
        g.fillStyle = glow;
        g.fillRect(0, 0, w, h);
      }
      g.globalCompositeOperation = "lighter";
      g.lineCap = "round";
      const tail = v * 0.075 + 0.003;
      for (let i = 0; i < N; i++) {
        const z = zs[i];
        const zt = Math.min(1.2, z + tail);
        const x1 = cx + (xs[i] / z) * fov;
        const y1 = cy + (ys[i] / z) * fov;
        if (x1 < -40 || x1 > w + 40 || y1 < -40 || y1 > h + 40) continue;
        const x0 = cx + (xs[i] / zt) * fov;
        const y0 = cy + (ys[i] / zt) * fov;
        const near = 1 - z;
        const fadeIn = Math.min(1, (1 - z) * 6);
        const radial = Math.min(1, Math.hypot(xs[i], ys[i]) / z / 1.2);
        const shade = Math.min(5, Math.round((lv * (1 - radial) * 0.9 + tint[i] * 0.35) * 5));
        g.strokeStyle = shades[shade];
        g.globalAlpha = Math.min(1, (0.25 + near * 0.85) * fadeIn);
        g.lineWidth = 0.4 + near * near * 2.2;
        g.beginPath();
        g.moveTo(x0, y0);
        g.lineTo(x1 + 0.01, y1 + 0.01);
        g.stroke();
      }
      g.globalCompositeOperation = "source-over";
      if (flash > 0.01) {
        g.globalAlpha = Math.min(0.55, flash * 0.55);
        g.fillStyle = "#ffffff";
        g.fillRect(0, 0, w, h);
      }
      const vig = g.createRadialGradient(cx, cy, Math.min(w, h) * 0.3, cx, cy, Math.max(w, h) * 0.75);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.55)");
      g.globalAlpha = 1;
      g.fillStyle = vig;
      g.fillRect(0, 0, w, h);
    }

    function still() {
      v = CRUISE * 3;
      flash = 0;
      draw();
    }

    function resize() {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      cv.width = Math.max(1, Math.round(w * dpr));
      cv.height = Math.max(1, Math.round(h * dpr));
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (motion.matches) still();
      else draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      step(dt * speed);
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

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });
    ro.observe(el);
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, [color, accent, background, stars, cycle, warp, speed]);

  return (
    <div ref={wrapRef} className={`hb-vd4 ${className}`} style={style} {...rest}>
      <style href="hb-bg-warp-stars" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-vd4-c" aria-hidden="true" />
      {children ? <div className="hb-vd4-in">{children}</div> : null}
    </div>
  );
}
