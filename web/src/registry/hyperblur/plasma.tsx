"use client";

import * as React from "react";

export interface PlasmaProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  speed?: number;
  scale?: number;
  opacity?: number;
  seed?: number;
}

const css = `
.hb-pl { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-pl-c { display: block; width: 100%; height: 100%; }
`;

function rnd(seed: number, i: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) + Math.imul(seed | 0, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

export function Plasma({
  colors = ["#0b0e14", "#2f7bff", "#19c3f5"],
  speed = 1,
  scale = 1,
  opacity = 0.8,
  seed = 1,
  className = "",
  style,
  ...rest
}: PlasmaProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const key = colors.join("|");

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const buf = document.createElement("canvas");
    const bctx = buf.getContext("2d");
    const probe = document.createElement("canvas");
    probe.width = 1;
    probe.height = 1;
    const pctx = probe.getContext("2d", { willReadFrequently: true });
    if (!wrap || !canvas || !ctx || !bctx || !pctx) return;

    const stops = key.split("|").map((c) => {
      pctx.clearRect(0, 0, 1, 1);
      pctx.fillStyle = "#000";
      pctx.fillStyle = c;
      pctx.fillRect(0, 0, 1, 1);
      const d = pctx.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2]];
    });
    const last = stops.length - 1;
    const lut = new Uint8ClampedArray(256 * 3);
    for (let i = 0; i < 256; i++) {
      const p = (i / 255) * last;
      const a = Math.min(last, Math.floor(p));
      const b = Math.min(last, a + 1);
      const f = p - a;
      for (let k = 0; k < 3; k++) lut[i * 3 + k] = stops[a][k] + (stops[b][k] - stops[a][k]) * f;
    }

    const TAU = Math.PI * 2;
    const r = (i: number) => rnd(seed, i);
    const u = 1 / (70 * Math.max(scale, 0.05));
    const ph0 = r(1) * TAU;
    const ph1 = r(2) * TAU;
    const ph2 = r(3) * TAU;
    const ph3 = r(4) * TAU;
    const kx = u * (0.9 + r(5) * 0.3);
    const ky = u * (1.1 + r(6) * 0.3);
    const kc = u * (0.7 + r(7) * 0.3);
    const kr = u * (1 + r(8) * 0.3);
    const s0 = 0.7 + r(9) * 0.4;
    const s1 = 0.9 + r(10) * 0.4;
    const s2 = 0.5 + r(11) * 0.4;
    const s3 = 0.8 + r(12) * 0.4;
    const fx = 0.3 + r(13) * 0.4;
    const fy = 0.3 + r(14) * 0.4;
    const rate = 0.8 * speed;

    let bw = 0;
    let bh = 0;
    let cellX = 1;
    let cellY = 1;
    let img: ImageData | null = null;
    let colA = new Float32Array(0);
    let colS = new Float32Array(0);
    let colC = new Float32Array(0);
    let rowB = new Float32Array(0);
    let rowS = new Float32Array(0);
    let rowC = new Float32Array(0);
    let dist = new Float32Array(0);
    let time = 20 + r(15) * 40;

    function draw(t: number) {
      if (!img || !ctx || !bctx || !canvas) return;
      const tt = t * rate;
      for (let x = 0; x < bw; x++) {
        const X = x * cellX;
        colA[x] = Math.sin(X * kx + ph0 + tt * s0);
        const p = X * kc + tt * s2 + ph2;
        colS[x] = Math.sin(p);
        colC[x] = Math.cos(p);
      }
      for (let y = 0; y < bh; y++) {
        const Y = y * cellY;
        rowB[y] = Math.sin(Y * ky + ph1 + tt * s1);
        const q = Y * kc;
        rowS[y] = Math.sin(q);
        rowC[y] = Math.cos(q);
      }
      const data = img.data;
      const rt = ph3 - tt * s3;
      let i = 0;
      for (let y = 0; y < bh; y++) {
        const b = rowB[y];
        const sq = rowS[y];
        const cq = rowC[y];
        for (let x = 0; x < bw; x++, i++) {
          const v = colA[x] + b + (colS[x] * cq + colC[x] * sq) + Math.sin(dist[i] * kr + rt);
          let j = ((v * 0.2 + 0.5) * 255) | 0;
          if (j < 0) j = 0;
          else if (j > 255) j = 255;
          const o = i * 4;
          const l = j * 3;
          data[o] = lut[l];
          data[o + 1] = lut[l + 1];
          data[o + 2] = lut[l + 2];
          data[o + 3] = 255;
        }
      }
      bctx.putImageData(img, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = Math.min(1, Math.max(0, opacity));
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(buf, 0, 0, bw, bh, 0, 0, canvas.width, canvas.height);
    }

    function resize() {
      if (!wrap || !canvas || !bctx) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      let cell = 4;
      if ((w * h) / (cell * cell) > 90000) cell = Math.sqrt((w * h) / 90000);
      bw = Math.max(2, Math.round(w / cell));
      bh = Math.max(2, Math.round(h / cell));
      buf.width = bw;
      buf.height = bh;
      img = bctx.createImageData(bw, bh);
      cellX = w / bw;
      cellY = h / bh;
      colA = new Float32Array(bw);
      colS = new Float32Array(bw);
      colC = new Float32Array(bw);
      rowB = new Float32Array(bh);
      rowS = new Float32Array(bh);
      rowC = new Float32Array(bh);
      dist = new Float32Array(bw * bh);
      const cx = fx * w;
      const cy = fy * h;
      let i = 0;
      for (let y = 0; y < bh; y++) {
        const dy = y * cellY - cy;
        for (let x = 0; x < bw; x++, i++) {
          const dx = x * cellX - cx;
          dist[i] = Math.sqrt(dx * dx + dy * dy);
        }
      }
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
  }, [key, speed, scale, opacity, seed]);

  return (
    <div ref={wrapRef} className={`hb-pl ${className}`} style={style} aria-hidden="true" {...rest}>
      <style href="hb-plasma" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-pl-c" />
    </div>
  );
}
