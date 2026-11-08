"use client";

import * as React from "react";

export interface BgBokehProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  background?: string;
  count?: number;
  shape?: "circle" | "hexagon";
  focusPull?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd10 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-vd10-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-vd10-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const defaultColors = ["#ffb86b", "#ff7a8a", "#7fb3ff", "#ffe2a8"];

function hash(i: number) {
  let x = Math.imul(i ^ 0x243f6a88, 0x85a308d3);
  x ^= x >>> 16;
  x = Math.imul(x, 0x13198a2e);
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

function sprite(c: [number, number, number], shape: "circle" | "hexagon", sharp: boolean) {
  const S = 128;
  const cv = document.createElement("canvas");
  cv.width = S;
  cv.height = S;
  const g = cv.getContext("2d");
  if (!g) return cv;
  const m = S / 2;
  const R = S / 2 - 2;
  const col = (a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  g.beginPath();
  if (shape === "hexagon") {
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
      const x = m + Math.cos(a) * R;
      const y = m + Math.sin(a) * R;
      if (i === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.closePath();
  } else g.arc(m, m, R, 0, Math.PI * 2);
  if (sharp) {
    const grad = g.createRadialGradient(m - R * 0.15, m - R * 0.15, 0, m, m, R);
    grad.addColorStop(0, col(0.42));
    grad.addColorStop(0.7, col(0.32));
    grad.addColorStop(0.9, col(0.55));
    grad.addColorStop(1, col(0.95));
    g.fillStyle = grad;
    g.fill();
    g.lineWidth = 2;
    g.strokeStyle = col(0.9);
    g.stroke();
  } else {
    g.save();
    g.clip();
    const grad = g.createRadialGradient(m, m, 0, m, m, R);
    grad.addColorStop(0, col(0.55));
    grad.addColorStop(0.6, col(0.35));
    grad.addColorStop(1, col(0));
    g.fillStyle = grad;
    g.fillRect(0, 0, S, S);
    g.restore();
  }
  return cv;
}

export function BgBokeh({
  colors = defaultColors,
  background = "#07060a",
  count = 38,
  shape = "circle",
  focusPull = true,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgBokehProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const colorKey = (colors.length ? colors : defaultColors).join("|");

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrap || !canvas || !context) return;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;
    const g: CanvasRenderingContext2D = context;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const palette = colorKey.split("|").map(rgb);
    const sharpSprites = palette.map((c) => sprite(c, shape, true));
    const softSprites = palette.map((c) => sprite(c, shape, false));
    const N = Math.max(4, Math.min(160, Math.round(count)));
    const discs = Array.from({ length: N }, (_, i) => ({
      x: hash(i * 7 + 1),
      y: hash(i * 7 + 2),
      d: hash(i * 7 + 3),
      size: 0.6 + 0.8 * hash(i * 7 + 4),
      c: Math.floor(hash(i * 7 + 5) * palette.length),
      vx: (hash(i * 7 + 6) - 0.5) * 0.012,
      vy: -0.004 - 0.01 * hash(i * 7 + 7),
      ph: hash(i * 7 + 8) * 6.28,
    })).sort((a, b) => a.d - b.d);
    const tone = rgb(background);
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
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      const warm = g.createRadialGradient(w * 0.3, h * 0.8, 0, w * 0.3, h * 0.8, Math.max(w, h) * 0.8);
      const p0 = palette[0];
      warm.addColorStop(0, `rgba(${p0[0]},${p0[1]},${p0[2]},0.16)`);
      warm.addColorStop(1, `rgba(${tone[0]},${tone[1]},${tone[2]},0)`);
      g.fillStyle = warm;
      g.fillRect(0, 0, w, h);
      g.globalCompositeOperation = "lighter";
      const focus = focusPull ? 0.5 + 0.48 * Math.sin(t * 0.32) : 0.08;
      const unit = Math.min(w, h);
      for (const b of discs) {
        const blur = Math.min(1, Math.abs(b.d - focus) * 1.6);
        const r = unit * (0.012 + b.size * (0.018 + 0.11 * blur)) * (0.6 + b.d * 0.7);
        const px = (((b.x + b.vx * t + 0.02 * Math.sin(t * 0.3 + b.ph)) % 1) + 1) % 1;
        const py = (((b.y + b.vy * t) % 1) + 1) % 1;
        const x = px * (w + r * 4) - r * 2;
        const y = py * (h + r * 4) - r * 2;
        const energy = Math.min(1, Math.pow((unit * 0.03) / r, 0.55));
        const flicker = 0.85 + 0.15 * Math.sin(t * 1.3 + b.ph * 3);
        const a = (0.25 + 0.75 * energy) * flicker;
        if (blur < 0.98) {
          g.globalAlpha = a * (1 - blur);
          g.drawImage(sharpSprites[b.c], x - r, y - r, r * 2, r * 2);
        }
        g.globalAlpha = a * (0.25 + blur * 0.75);
        g.drawImage(softSprites[b.c], x - r * 1.08, y - r * 1.08, r * 2.16, r * 2.16);
      }
      g.globalCompositeOperation = "source-over";
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
      if (motion.matches) t = 3;
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
      if (motion.matches) {
        t = 3;
        draw();
      }
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
  }, [colorKey, background, count, shape, focusPull, speed]);

  return (
    <div ref={wrapRef} className={`hb-vd10 ${className}`} style={style} {...rest}>
      <style href="hb-bg-bokeh" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-vd10-c" aria-hidden="true" />
      {children ? <div className="hb-vd10-in">{children}</div> : null}
    </div>
  );
}
