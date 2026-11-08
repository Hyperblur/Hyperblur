"use client";

import * as React from "react";

export interface BgSoftCloudsProps extends React.HTMLAttributes<HTMLDivElement> {
  time?: "dusk" | "night" | "day";
  accent?: string;
  density?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd14 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-vd14-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-vd14-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const skies = {
  dusk: { sky: ["#121733", "#3a3466", "#c9837a", "#f0b48a"], lit: "#ffe6d2", shade: "#5d4f80", glow: "#ffb37a" },
  night: { sky: ["#03050c", "#08102a", "#13224a", "#1e3466"], lit: "#a9bde6", shade: "#141b36", glow: "#7fb3ff" },
  day: { sky: ["#2f6fd6", "#5b94ea", "#9cc3f5", "#d8e9ff"], lit: "#ffffff", shade: "#9db3d6", glow: "#fff1cf" },
};

function hash(i: number) {
  let x = Math.imul(i ^ 0xa4093822, 0x299f31d0);
  x ^= x >>> 16;
  x = Math.imul(x, 0x082efa98);
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

function cloudSprite(seed: number, lit: string, shade: string) {
  const W = 320;
  const H = 150;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const g = cv.getContext("2d");
  if (!g) return cv;
  const puffs = 7 + Math.floor(hash(seed) * 5);
  for (let i = 0; i < puffs; i++) {
    const u = (i + 0.5) / puffs;
    const hump = Math.sin(u * Math.PI);
    const r = H * (0.16 + 0.2 * hump + 0.08 * hash(seed * 13 + i));
    const x = W * (0.1 + 0.8 * u) + (hash(seed * 17 + i) - 0.5) * 18;
    const y = H * 0.72 - hump * H * 0.18 - hash(seed * 19 + i) * H * 0.1;
    const grad = g.createRadialGradient(x, y, r * 0.2, x, y, r);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.65, "rgba(255,255,255,0.75)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  const base = g.createLinearGradient(0, 0, 0, H);
  base.addColorStop(0, "rgba(255,255,255,1)");
  base.addColorStop(0.68, "rgba(255,255,255,1)");
  base.addColorStop(1, "rgba(255,255,255,0)");
  g.globalCompositeOperation = "destination-in";
  g.fillStyle = base;
  g.fillRect(0, 0, W, H);
  g.globalCompositeOperation = "source-atop";
  const tone = g.createLinearGradient(0, H * 0.15, 0, H * 0.9);
  tone.addColorStop(0, lit);
  tone.addColorStop(0.45, lit);
  tone.addColorStop(1, shade);
  g.fillStyle = tone;
  g.fillRect(0, 0, W, H);
  return cv;
}

export function BgSoftClouds({
  time = "dusk",
  accent,
  density = 1,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgSoftCloudsProps) {
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
    const sky = skies[time] ?? skies.dusk;
    const glow = accent ?? sky.glow;
    const sprites = Array.from({ length: 6 }, (_, i) => cloudSprite(i * 31 + 7, sky.lit, sky.shade));
    const layers = [
      { scale: 0.42, top: 0.5, spread: 0.18, v: 0.006, a: 0.55, n: 6 },
      { scale: 0.7, top: 0.3, spread: 0.26, v: 0.012, a: 0.78, n: 5 },
      { scale: 1.15, top: 0.08, spread: 0.42, v: 0.022, a: 0.95, n: 4 },
    ];
    const clouds = layers.flatMap((L, li) =>
      Array.from({ length: Math.max(1, Math.round(L.n * Math.max(0.2, density))) }, (_, i) => ({
        li,
        x: (i + hash(li * 50 + i * 3 + 1) * 0.8) / Math.max(1, Math.round(L.n * Math.max(0.2, density))),
        y: L.top + hash(li * 50 + i * 3 + 2) * L.spread,
        s: 0.75 + 0.5 * hash(li * 50 + i * 3 + 3),
        sp: Math.floor(hash(li * 50 + i * 3 + 4) * sprites.length),
        flip: hash(li * 50 + i * 3 + 5) > 0.5,
      })),
    );
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let prev = 0;
    let visible = true;

    function draw() {
      if (!w || !h) return;
      g.globalCompositeOperation = "source-over";
      g.globalAlpha = 1;
      const bg = g.createLinearGradient(0, 0, 0, h);
      sky.sky.forEach((c, i) => bg.addColorStop(i / (sky.sky.length - 1), c));
      g.fillStyle = bg;
      g.fillRect(0, 0, w, h);
      const sx = w * 0.72;
      const sy = h * 0.86;
      const sun = g.createRadialGradient(sx, sy, 0, sx, sy, Math.max(w, h) * 0.7);
      sun.addColorStop(0, glow);
      sun.addColorStop(1, "rgba(0,0,0,0)");
      g.globalAlpha = 0.55;
      g.fillStyle = sun;
      g.fillRect(0, 0, w, h);
      const unit = Math.max(w * 0.55, h * 0.9);
      for (let li = 0; li < layers.length; li++) {
        const L = layers[li];
        for (const c of clouds) {
          if (c.li !== li) continue;
          const cw = unit * L.scale * c.s;
          const ch = cw * (150 / 320);
          const span = w + cw * 1.2;
          const x = ((((c.x + t * L.v) % 1) + 1) % 1) * span - cw * 0.6;
          const y = c.y * h + Math.sin(t * 0.2 + c.x * 9) * 3 * L.scale;
          g.globalAlpha = L.a;
          if (c.flip) {
            g.save();
            g.translate(x + cw, y);
            g.scale(-1, 1);
            g.drawImage(sprites[c.sp], 0, 0, cw, ch);
            g.restore();
          } else g.drawImage(sprites[c.sp], x, y, cw, ch);
        }
        if (li < layers.length - 1) {
          const haze = g.createLinearGradient(0, h * 0.4, 0, h);
          haze.addColorStop(0, "rgba(0,0,0,0)");
          haze.addColorStop(1, sky.sky[sky.sky.length - 1]);
          g.globalAlpha = 0.18;
          g.fillStyle = haze;
          g.fillRect(0, 0, w, h);
        }
      }
      g.globalAlpha = 1;
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
      g.imageSmoothingEnabled = true;
      g.imageSmoothingQuality = "high";
      if (motion.matches) t = 0;
      draw();
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
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
      if (motion.matches) draw();
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
  }, [time, accent, density, speed]);

  return (
    <div ref={wrapRef} className={`hb-vd14 ${className}`} style={style} {...rest}>
      <style href="hb-bg-soft-clouds" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-vd14-c" aria-hidden="true" />
      {children ? <div className="hb-vd14-in">{children}</div> : null}
    </div>
  );
}
