"use client";

import * as React from "react";

export interface BgLightningProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  background?: string;
  interval?: number;
  branches?: number;
  rain?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve10 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve10-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve10-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function rgbOf(value: string, fallback: [number, number, number]): [number, number, number] {
  const raw = value.trim().replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(hex.slice(0, 6), 16);
  if (hex.length < 6 || Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

interface Bolt {
  segs: number[];
  at: number;
}

export function BgLightning({
  accent = "#a9c8ff",
  background = "#05070d",
  interval = 3.2,
  branches = 1,
  rain = true,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgLightningProps) {
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
    const sky = document.createElement("canvas");
    const sctx = sky.getContext("2d");
    if (!sctx) return;
    const S: CanvasRenderingContext2D = sctx;

    const ac = rgbOf(accent, [169, 200, 255]);
    const bg = rgbOf(background, [5, 7, 13]);

    let seed = 0x7a11;
    function rand() {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    let w = 0;
    let h = 0;
    let t = 0;
    let next = 0.6;
    let bolts: Bolt[] = [];
    let drops = new Float32Array(0);

    function paintSky(dpr: number) {
      sky.width = Math.max(1, Math.round(w * dpr));
      sky.height = Math.max(1, Math.round(h * dpr));
      S.setTransform(dpr, 0, 0, dpr, 0, 0);
      S.clearRect(0, 0, w, h);
      seed = 0x5c1d;
      const count = Math.round(26 + (w * h) / 9000);
      for (let i = 0; i < count; i++) {
        const x = rand() * w * 1.2 - w * 0.1;
        const y = Math.pow(rand(), 1.6) * h * 0.62 - h * 0.05;
        const r = (0.12 + rand() * 0.22) * Math.max(w, h * 1.4);
        const rg = S.createRadialGradient(x, y, 0, x, y, r);
        const lum = 0.55 + rand() * 0.45;
        rg.addColorStop(0, `rgba(${Math.round(ac[0] * lum)},${Math.round(ac[1] * lum)},${Math.round(ac[2] * lum)},0.16)`);
        rg.addColorStop(1, "rgba(0,0,0,0)");
        S.fillStyle = rg;
        S.beginPath();
        S.ellipse(x, y, r, r * 0.45, 0, 0, 6.2832);
        S.fill();
      }
      seed = 0x7a11;
    }

    function setupRain() {
      const n = rain ? Math.round(Math.min(420, (w * h) / 1400)) : 0;
      drops = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        drops[i * 3] = rand() * w;
        drops[i * 3 + 1] = rand() * h;
        drops[i * 3 + 2] = 0.5 + rand() * 0.5;
      }
    }

    function crack(segs: number[], x1: number, y1: number, x2: number, y2: number, off: number, depth: number, width: number) {
      if (depth === 0) {
        segs.push(x1, y1, x2, y2, width);
        return;
      }
      const mx = (x1 + x2) / 2 + (rand() - 0.5) * off;
      const my = (y1 + y2) / 2 + (rand() - 0.5) * off * 0.25;
      crack(segs, x1, y1, mx, my, off * 0.52, depth - 1, width);
      crack(segs, mx, my, x2, y2, off * 0.52, depth - 1, width);
    }

    function strike() {
      const segs: number[] = [];
      const x0 = w * (0.12 + rand() * 0.76);
      const x1 = x0 + (rand() - 0.5) * w * 0.35;
      const y1 = h * (0.62 + rand() * 0.38);
      crack(segs, x0, -8, x1, y1, Math.max(w, h) * 0.32, 7, 1);
      const main = segs.length / 5;
      const nb = Math.round((2 + rand() * 3) * Math.max(0, branches));
      for (let b = 0; b < nb; b++) {
        const k = Math.floor(rand() * main * 0.8) * 5;
        const sx = segs[k];
        const sy = segs[k + 1];
        const dir = rand() > 0.5 ? 1 : -1;
        const len = h * (0.12 + rand() * 0.22);
        crack(segs, sx, sy, sx + dir * len * (0.5 + rand() * 0.6), sy + len, len * 0.5, 5, 0.55);
      }
      bolts.push({ segs, at: t });
      if (bolts.length > 3) bolts.shift();
    }

    function bright(age: number) {
      const a = Math.exp(-age / 0.06);
      const b = age > 0.16 ? Math.exp(-(age - 0.16) / 0.08) * 0.6 : 0;
      return Math.min(1, Math.max(a, b) + Math.exp(-age / 0.45) * 0.18);
    }

    function render(dt: number) {
      if (!w || !h) return;
      if (t >= next) {
        strike();
        next = t + Math.max(0.6, interval) * (0.55 + rand() * 0.9);
      }
      let flash = 0;
      for (const bo of bolts) flash = Math.max(flash, bright(t - bo.at));
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      const sway = Math.sin(t * 0.05) * 18;
      g.globalAlpha = Math.min(1, 0.45 + flash * 1.4);
      g.drawImage(sky, sway, 0, w, h);
      g.globalAlpha = 1;
      if (flash > 0.01) {
        const lg = g.createLinearGradient(0, 0, 0, h);
        lg.addColorStop(0, `rgba(${ac[0]},${ac[1]},${ac[2]},${(flash * 0.22).toFixed(3)})`);
        lg.addColorStop(1, `rgba(${ac[0]},${ac[1]},${ac[2]},${(flash * 0.04).toFixed(3)})`);
        g.fillStyle = lg;
        g.fillRect(0, 0, w, h);
      }
      g.globalCompositeOperation = "lighter";
      g.lineCap = "round";
      g.lineJoin = "round";
      for (const bo of bolts) {
        const age = t - bo.at;
        if (age > 1.2) continue;
        const b = bright(age);
        const passes: [number, string][] = [
          [9, `rgba(${ac[0]},${ac[1]},${ac[2]},${(b * 0.07).toFixed(3)})`],
          [3.2, `rgba(${ac[0]},${ac[1]},${ac[2]},${(b * 0.32).toFixed(3)})`],
          [1.1, `rgba(255,255,255,${b.toFixed(3)})`],
        ];
        for (const [lw, col] of passes) {
          g.strokeStyle = col;
          const segs = bo.segs;
          for (const thin of [1, 0.55]) {
            g.lineWidth = lw * thin;
            g.beginPath();
            for (let i = 0; i < segs.length; i += 5) {
              if (segs[i + 4] !== thin) continue;
              g.moveTo(segs[i], segs[i + 1]);
              g.lineTo(segs[i + 2], segs[i + 3]);
            }
            g.stroke();
          }
        }
      }
      g.globalCompositeOperation = "source-over";
      if (drops.length) {
        g.strokeStyle = `rgba(${Math.min(255, bg[0] + 150)},${Math.min(255, bg[1] + 160)},${Math.min(255, bg[2] + 180)},${(0.1 + flash * 0.3).toFixed(3)})`;
        g.lineWidth = 0.8;
        g.beginPath();
        const n = drops.length / 3;
        for (let i = 0; i < n; i++) {
          const z = drops[i * 3 + 2];
          let x = drops[i * 3] - 210 * z * dt * 0.28;
          let y = drops[i * 3 + 1] + 760 * z * dt;
          if (y > h + 10) {
            y = -12;
            x = rand() * (w + 60);
          }
          if (x < -20) x += w + 40;
          drops[i * 3] = x;
          drops[i * 3 + 1] = y;
          g.moveTo(x, y);
          g.lineTo(x - 3 * z, y + 13 * z);
        }
        g.stroke();
      }
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      bolts = [];
      t = 10;
      next = 10;
      render(0);
      t = 10.2;
      render(0);
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
      paintSky(dpr);
      setupRain();
      if (motion.matches) still();
      else render(0);
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000) * speed;
      prev = now;
      t += dt;
      render(dt);
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
  }, [accent, background, interval, branches, rain, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve10 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-lightning" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve10-c" aria-hidden="true" />
      {children ? <div className="hb-ve10-in">{children}</div> : null}
    </div>
  );
}
