"use client";

import * as React from "react";

export interface BgMetaballsProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: [string, string];
  accent?: string;
  background?: string;
  count?: number;
  size?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve1 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve1-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve1-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
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

export function BgMetaballs({
  colors = ["#2f7bff", "#b46bff"],
  accent = "#e9f1ff",
  background = "#07080c",
  count = 7,
  size = 1,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgMetaballsProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const c0 = colors[0];
  const c1 = colors[1];

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;
    const g: CanvasRenderingContext2D = ctx;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;
    const buf = document.createElement("canvas");
    const bctx = buf.getContext("2d");
    if (!bctx) return;
    const b: CanvasRenderingContext2D = bctx;

    const ca = rgbOf(c0, [47, 123, 255]);
    const cb = rgbOf(c1, [180, 107, 255]);
    const hi = rgbOf(accent, [233, 241, 255]);
    const bg = rgbOf(background, [7, 8, 12]);
    const n = Math.max(2, Math.min(16, Math.round(count)));
    const seeds = Array.from({ length: n }, (_, i) => ({
      ax: 0.18 + rnd(i * 7 + 1) * 0.3,
      ay: 0.16 + rnd(i * 7 + 2) * 0.28,
      fx: 0.12 + rnd(i * 7 + 3) * 0.22,
      fy: 0.1 + rnd(i * 7 + 4) * 0.2,
      px: rnd(i * 7 + 5) * 6.283,
      py: rnd(i * 7 + 6) * 6.283,
      r: 0.08 + rnd(i * 7 + 7) * 0.07,
    }));
    const bx = new Float32Array(n);
    const by = new Float32Array(n);
    const br = new Float32Array(n);

    let w = 0;
    let h = 0;
    let gw = 0;
    let gh = 0;
    let img: ImageData | null = null;
    let t = 0;

    function place() {
      const m = Math.min(w, h);
      for (let i = 0; i < n; i++) {
        const s = seeds[i];
        bx[i] = (0.5 + s.ax * Math.sin(t * s.fx + s.px) + 0.08 * Math.sin(t * s.fy * 2.3 + s.py)) * gw;
        by[i] = (0.5 + s.ay * Math.cos(t * s.fy + s.py) + 0.06 * Math.cos(t * s.fx * 1.7 + s.px)) * gh;
        const rr = s.r * m * size * (gw / Math.max(1, w)) * (1 + 0.12 * Math.sin(t * 0.9 + s.px));
        br[i] = rr * rr;
      }
    }

    function render() {
      if (!img || !gw || !gh) return;
      place();
      const d = img.data;
      let p = 0;
      for (let y = 0; y < gh; y++) {
        const vy = y / gh;
        const r0 = ca[0] + (cb[0] - ca[0]) * vy;
        const g0 = ca[1] + (cb[1] - ca[1]) * vy;
        const b0 = ca[2] + (cb[2] - ca[2]) * vy;
        for (let x = 0; x < gw; x++) {
          let f = 0;
          let fs = 0;
          for (let i = 0; i < n; i++) {
            const dx = x - bx[i];
            const dy = y - by[i];
            f += br[i] / (dx * dx + dy * dy + 1);
            const ex = dx - 2.2;
            const ey = dy - 2.2;
            fs += br[i] / (ex * ex + ey * ey + 1);
          }
          let r = bg[0];
          let gg = bg[1];
          let bb = bg[2];
          if (f < 1) {
            const halo = f > 0.45 ? ((f - 0.45) / 0.55) ** 2 * 0.32 : 0;
            r += (r0 - r) * halo;
            gg += (g0 - gg) * halo;
            bb += (b0 - bb) * halo;
          } else {
            const edge = Math.min(1, (f - 1) / 0.06);
            const core = Math.min(1, (f - 1) / 2.4);
            const shade = 0.42 + 0.58 * core;
            const rim = Math.max(0, 1 - (f - 1) / 0.35) * 0.55;
            const spec = Math.max(0, Math.min(1, (f - fs) * 0.9 - 0.15));
            let cr = r0 * shade + (hi[0] - r0 * shade) * rim * 0.5;
            let cg = g0 * shade + (hi[1] - g0 * shade) * rim * 0.5;
            let cbv = b0 * shade + (hi[2] - b0 * shade) * rim * 0.5;
            cr += (hi[0] - cr) * spec;
            cg += (hi[1] - cg) * spec;
            cbv += (hi[2] - cbv) * spec;
            r += (cr - r) * edge;
            gg += (cg - gg) * edge;
            bb += (cbv - bb) * edge;
          }
          d[p] = r;
          d[p + 1] = gg;
          d[p + 2] = bb;
          d[p + 3] = 255;
          p += 4;
        }
      }
      b.putImageData(img, 0, 0);
      g.imageSmoothingEnabled = true;
      g.imageSmoothingQuality = "high";
      g.drawImage(buf, 0, 0, w, h);
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 4.2;
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
      const step = Math.max(3, Math.ceil(Math.sqrt((w * h) / 16000)));
      gw = Math.max(8, Math.ceil(w / step));
      gh = Math.max(8, Math.ceil(h / step));
      buf.width = gw;
      buf.height = gh;
      img = b.createImageData(gw, gh);
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
    ro.observe(wrap);
    io.observe(wrap);
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
  }, [c0, c1, accent, background, count, size, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve1 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-metaballs" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve1-c" aria-hidden="true" />
      {children ? <div className="hb-ve1-in">{children}</div> : null}
    </div>
  );
}
