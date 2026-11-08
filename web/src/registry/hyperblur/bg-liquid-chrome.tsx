"use client";

import * as React from "react";

export interface BgLiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  tint?: number;
  scale?: number;
  turbulence?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve7 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; background: #0b0c10; }
.hb-ve7-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve7-v { position: absolute; inset: 0; background: radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%); }
.hb-ve7-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function rgbOf(value: string, fallback: [number, number, number]): [number, number, number] {
  const raw = value.trim().replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(hex.slice(0, 6), 16);
  if (hex.length < 6 || Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const STOPS: [number, number, number, number, number][] = [
  [0, 8, 9, 12, 0],
  [0.16, 34, 38, 48, 0.2],
  [0.3, 120, 131, 150, 0.55],
  [0.4, 214, 224, 238, 0.7],
  [0.445, 250, 252, 255, 0.2],
  [0.47, 22, 24, 30, 0],
  [0.55, 58, 62, 72, 0],
  [0.7, 128, 120, 112, 0.1],
  [0.86, 206, 210, 218, 0.35],
  [1, 255, 255, 255, 0.15],
];

export function BgLiquidChrome({
  accent = "#7fb3ff",
  tint = 0.35,
  scale = 1,
  turbulence = 1,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgLiquidChromeProps) {
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
    const buf = document.createElement("canvas");
    const bctx = buf.getContext("2d");
    if (!bctx) return;
    const b: CanvasRenderingContext2D = bctx;

    const ac = rgbOf(accent, [127, 179, 255]);
    const tk = Math.max(0, Math.min(1, tint));
    const lut = new Uint8ClampedArray(256 * 3);
    for (let i = 0; i < 256; i++) {
      const v = i / 255;
      let k = 1;
      while (k < STOPS.length - 1 && STOPS[k][0] < v) k++;
      const a = STOPS[k - 1];
      const c = STOPS[k];
      const f = (v - a[0]) / (c[0] - a[0] || 1);
      const s = f * f * (3 - 2 * f);
      const m = (a[4] + (c[4] - a[4]) * s) * tk;
      for (let j = 0; j < 3; j++) {
        const base = a[j + 1] + (c[j + 1] - a[j + 1]) * s;
        lut[i * 3 + j] = base + (ac[j] * (base / 255) * 1.15 - base) * m;
      }
    }

    let w = 0;
    let h = 0;
    let gw = 0;
    let gh = 0;
    let img: ImageData | null = null;
    let t = 0;

    function render() {
      if (!img || !gw || !gh) return;
      const d = img.data;
      const sc = 2.6 / Math.max(0.3, scale);
      const amp = 0.62 * Math.max(0, turbulence);
      const asp = gw / gh;
      let p = 0;
      for (let y = 0; y < gh; y++) {
        const v0 = (y / gh) * sc;
        for (let x = 0; x < gw; x++) {
          let u = (x / gw) * sc * asp;
          let v = v0;
          u += amp * Math.sin(1.7 * v + t * 0.33);
          v += amp * Math.cos(1.3 * u - t * 0.27);
          u += amp * 0.8 * Math.sin(2.1 * v - t * 0.21 + 1.3);
          v += amp * 0.8 * Math.cos(1.9 * u + t * 0.19 + 0.7);
          u += amp * 0.5 * Math.sin(3.1 * v + t * 0.41 + 2.1);
          const val = 0.5 + 0.5 * Math.sin(u * 1.35 + v * 0.85 + 0.6 * Math.sin(v * 1.1 + t * 0.17));
          const i = Math.min(255, Math.max(0, (val * 255) | 0)) * 3;
          d[p] = lut[i];
          d[p + 1] = lut[i + 1];
          d[p + 2] = lut[i + 2];
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
      t = 5;
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
      const step = Math.max(2, Math.ceil(Math.sqrt((w * h) / 22000)));
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
  }, [accent, tint, scale, turbulence, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve7 ${className}`} style={style} {...rest}>
      <style href="hb-bg-liquid-chrome" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve7-c" aria-hidden="true" />
      <div className="hb-ve7-v" aria-hidden="true" />
      {children ? <div className="hb-ve7-in">{children}</div> : null}
    </div>
  );
}
