"use client";

import * as React from "react";

export interface BgFirefliesProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  background?: string;
  horizon?: string;
  color?: string;
  count?: number;
  meadow?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve11 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve11-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve11-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function rgbOf(value: string, fallback: [number, number, number]): [number, number, number] {
  const raw = value.trim().replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(hex.slice(0, 6), 16);
  if (hex.length < 6 || Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rnd(i: number) {
  let x = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

export function BgFireflies({
  accent = "#ffd36b",
  background = "#060912",
  horizon = "#0f1c1a",
  color = "#020403",
  count = 46,
  meadow = true,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgFirefliesProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;
    const g: CanvasRenderingContext2D = ctx;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;
    const land = document.createElement("canvas");
    const lctx = land.getContext("2d");
    if (!lctx) return;
    const L: CanvasRenderingContext2D = lctx;

    const ac = rgbOf(accent, [255, 211, 107]);
    const sprite = document.createElement("canvas");
    sprite.width = 96;
    sprite.height = 96;
    const sp = sprite.getContext("2d");
    if (sp) {
      const rg = sp.createRadialGradient(48, 48, 0, 48, 48, 48);
      rg.addColorStop(0, "rgba(255,255,240,1)");
      rg.addColorStop(0.08, `rgba(${ac[0]},${ac[1]},${ac[2]},0.95)`);
      rg.addColorStop(0.3, `rgba(${ac[0]},${ac[1]},${ac[2]},0.28)`);
      rg.addColorStop(1, `rgba(${ac[0]},${ac[1]},${ac[2]},0)`);
      sp.fillStyle = rg;
      sp.fillRect(0, 0, 96, 96);
    }

    const n = Math.max(4, Math.min(220, Math.round(count)));
    const flies = Array.from({ length: n }, (_, i) => ({
      x: rnd(i * 9 + 1),
      y: 0.28 + rnd(i * 9 + 2) * 0.66,
      z: 0.35 + rnd(i * 9 + 3) * 0.65,
      ax: 0.03 + rnd(i * 9 + 4) * 0.07,
      ay: 0.02 + rnd(i * 9 + 5) * 0.05,
      fx: 0.12 + rnd(i * 9 + 6) * 0.25,
      fy: 0.15 + rnd(i * 9 + 7) * 0.3,
      ph: rnd(i * 9 + 8) * 6.283,
      period: 2.4 + rnd(i * 9 + 9) * 3.6,
      on: 0.5 + rnd(i * 13 + 2) * 0.6,
    }));

    let w = 0;
    let h = 0;
    let t = 0;

    function paintLand(dpr: number) {
      land.width = Math.max(1, Math.round(w * dpr));
      land.height = Math.max(1, Math.round(h * dpr));
      L.setTransform(dpr, 0, 0, dpr, 0, 0);
      L.clearRect(0, 0, w, h);
      if (!meadow) return;
      L.fillStyle = color;
      L.beginPath();
      L.moveTo(0, h);
      const base = h * 0.8;
      for (let x = 0, i = 0; x <= w + 12; x += 12, i++) {
        const y = base - (Math.sin(x * 0.011 + 1.3) * 0.5 + 0.5) * h * 0.08 - rnd(i * 5 + 700) * h * 0.05;
        L.lineTo(x, y);
      }
      L.lineTo(w, h);
      L.closePath();
      L.globalAlpha = 0.55;
      L.fill();
      L.globalAlpha = 1;
      L.beginPath();
      L.moveTo(0, h);
      const blades = Math.round(w / 3);
      for (let i = 0; i < blades; i++) {
        const x = (i / blades) * w + (rnd(i + 91) - 0.5) * 4;
        const bh = h * (0.05 + rnd(i * 3 + 17) * 0.11);
        const lean = (rnd(i * 7 + 5) - 0.5) * bh * 0.6;
        const y0 = h * 0.93;
        L.moveTo(x - 1.6, y0);
        L.quadraticCurveTo(x + lean * 0.3, y0 - bh * 0.6, x + lean, y0 - bh);
        L.quadraticCurveTo(x + lean * 0.3 + 0.6, y0 - bh * 0.55, x + 1.6, y0);
      }
      L.rect(0, h * 0.93 - 1, w, h * 0.07 + 2);
      L.fill();
    }

    function glow(f: (typeof flies)[number]) {
      const cyc = (t + f.ph * f.period) % f.period;
      const k = cyc < f.on ? Math.sin((cyc / f.on) * Math.PI) : 0;
      const x = (f.x + f.ax * Math.sin(t * f.fx + f.ph) + 0.02 * Math.sin(t * 1.3 + f.ph * 2)) * w;
      const y = (f.y + f.ay * Math.cos(t * f.fy + f.ph) + 0.015 * Math.sin(t * 1.7 + f.ph)) * h;
      const b = 0.12 + k * 0.88;
      const s = (10 + 26 * k) * f.z;
      g.globalAlpha = b * (0.45 + f.z * 0.55);
      g.drawImage(sprite, x - s, y - s, s * 2, s * 2);
    }

    function render() {
      if (!w || !h) return;
      const sky = g.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, background);
      sky.addColorStop(1, horizon);
      g.globalAlpha = 1;
      g.globalCompositeOperation = "source-over";
      g.fillStyle = sky;
      g.fillRect(0, 0, w, h);
      g.globalCompositeOperation = "lighter";
      for (const f of flies) if (f.z < 0.62) glow(f);
      g.globalCompositeOperation = "source-over";
      g.globalAlpha = 1;
      g.drawImage(land, 0, 0, w, h);
      g.globalCompositeOperation = "lighter";
      for (const f of flies) if (f.z >= 0.62) glow(f);
      g.globalCompositeOperation = "source-over";
      g.globalAlpha = 1;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 7.3;
      render();
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
      paintLand(dpr);
      if (motion.matches) still();
      else render();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      render();
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
  }, [accent, background, horizon, color, count, meadow, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve11 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-fireflies" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve11-c" aria-hidden="true" />
      {children ? <div className="hb-ve11-in">{children}</div> : null}
    </div>
  );
}
