"use client";

import * as React from "react";

export interface BgGlowOrbsProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  background?: string;
  floor?: boolean;
  size?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd12 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-vd12-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-vd12-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const defaultColors = ["#2f7bff", "#9b6bff", "#38e1c6", "#ff7a59"];

function hash(i: number) {
  let x = Math.imul(i ^ 0x3243f6a8, 0x885a308d);
  x ^= x >>> 15;
  x = Math.imul(x, 0x31319812);
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

function rgb(hex: string): [number, number, number] {
  let s = hex.replace("#", "");
  if (s.length === 3) s = s.split("").map((c) => c + c).join("");
  const n = parseInt(s.slice(0, 6), 16);
  if (Number.isNaN(n)) return [120, 160, 255];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function BgGlowOrbs({
  colors = defaultColors,
  background = "#050509",
  floor = true,
  size = 1,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgGlowOrbsProps) {
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
    const palette = colorKey.split("|").slice(0, 8).map(rgb);
    const orbs = palette.map((c, i) => ({
      c,
      a: 0.11 + 0.08 * hash(i * 6 + 1),
      b: 0.15 + 0.1 * hash(i * 6 + 2),
      cz: 0.09 + 0.07 * hash(i * 6 + 3),
      p1: hash(i * 6 + 4) * 6.28,
      p2: hash(i * 6 + 5) * 6.28,
      s: 0.8 + 0.4 * hash(i * 6 + 6),
      x: 0,
      y: 0,
      r: 0,
      z: 0,
    }));
    const tone = rgb(background);
    const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    const shade = (c: [number, number, number], k: number): [number, number, number] => [
      Math.round(c[0] * k),
      Math.round(c[1] * k),
      Math.round(c[2] * k),
    ];
    const tint = (c: [number, number, number], k: number): [number, number, number] => [
      Math.round(c[0] + (255 - c[0]) * k),
      Math.round(c[1] + (255 - c[1]) * k),
      Math.round(c[2] + (255 - c[2]) * k),
    ];
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let prev = 0;
    let visible = true;

    function place() {
      const unit = Math.min(w, h) * 0.13 * size;
      const n = orbs.length;
      orbs.forEach((o, i) => {
        const lane = n > 1 ? i / (n - 1) : 0.5;
        o.z = 0.5 + 0.5 * Math.sin(t * o.cz + o.p2);
        o.x = w * (0.14 + lane * 0.72 + 0.12 * Math.sin(t * o.a + o.p1));
        o.y = h * ((floor ? 0.4 : 0.5) + 0.12 * Math.sin(t * o.b + o.p2 * 1.7));
        o.r = unit * o.s * (0.7 + 0.5 * o.z);
      });
    }

    function body(o: (typeof orbs)[number], x: number, y: number, r: number, alpha: number) {
      g.globalAlpha = alpha;
      const halo = g.createRadialGradient(x, y, r * 0.6, x, y, r * 3.2);
      halo.addColorStop(0, rgba(o.c, 0.42));
      halo.addColorStop(1, rgba(o.c, 0));
      g.globalCompositeOperation = "lighter";
      g.fillStyle = halo;
      g.beginPath();
      g.arc(x, y, r * 3.2, 0, Math.PI * 2);
      g.fill();
      g.globalCompositeOperation = "source-over";
      const sphere = g.createRadialGradient(x - r * 0.38, y - r * 0.42, r * 0.04, x, y, r);
      sphere.addColorStop(0, rgba(tint(o.c, 0.85), 1));
      sphere.addColorStop(0.22, rgba(tint(o.c, 0.35), 1));
      sphere.addColorStop(0.62, rgba(o.c, 1));
      sphere.addColorStop(1, rgba(shade(o.c, 0.28), 1));
      g.fillStyle = sphere;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
      const rim = g.createRadialGradient(x + r * 0.35, y + r * 0.5, r * 0.55, x, y, r * 1.02);
      rim.addColorStop(0, rgba(o.c, 0));
      rim.addColorStop(0.85, rgba(o.c, 0));
      rim.addColorStop(1, rgba(tint(o.c, 0.5), 0.75));
      g.globalCompositeOperation = "lighter";
      g.fillStyle = rim;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
      g.globalAlpha = alpha * 0.85;
      g.fillStyle = "rgba(255,255,255,0.9)";
      g.beginPath();
      g.ellipse(x - r * 0.36, y - r * 0.46, r * 0.16, r * 0.09, -0.6, 0, Math.PI * 2);
      g.fill();
      g.globalCompositeOperation = "source-over";
    }

    function draw() {
      if (!w || !h) return;
      place();
      g.globalCompositeOperation = "source-over";
      g.globalAlpha = 1;
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      const fy = h * 0.72;
      const sorted = [...orbs].sort((a, b) => a.z - b.z);
      if (floor) {
        const sheen = g.createLinearGradient(0, fy, 0, h);
        sheen.addColorStop(0, "rgba(255,255,255,0.05)");
        sheen.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = sheen;
        g.fillRect(0, fy, w, h - fy);
        g.save();
        g.beginPath();
        g.rect(0, fy, w, h - fy);
        g.clip();
        for (const o of sorted) {
          const ry = fy + (fy - o.y) * 0.55;
          g.save();
          g.translate(o.x, ry);
          g.scale(1, -0.55);
          body(o, 0, 0, o.r, 0.32);
          g.restore();
        }
        const fade = g.createLinearGradient(0, fy, 0, h);
        fade.addColorStop(0, rgba(tone, 0.25));
        fade.addColorStop(0.7, rgba(tone, 0.95));
        fade.addColorStop(1, rgba(tone, 1));
        g.globalAlpha = 1;
        g.fillStyle = fade;
        g.fillRect(0, fy, w, h - fy);
        g.restore();
        const line = g.createLinearGradient(0, 0, w, 0);
        line.addColorStop(0, "rgba(255,255,255,0)");
        line.addColorStop(0.5, "rgba(255,255,255,0.22)");
        line.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = line;
        g.fillRect(0, fy, w, 1);
        for (const o of sorted) {
          const shadow = g.createRadialGradient(o.x, fy + 2, 0, o.x, fy + 2, o.r * 1.4);
          shadow.addColorStop(0, rgba(o.c, 0.35));
          shadow.addColorStop(1, rgba(o.c, 0));
          g.globalCompositeOperation = "lighter";
          g.fillStyle = shadow;
          g.fillRect(o.x - o.r * 1.4, fy - o.r * 0.3, o.r * 2.8, o.r * 0.6);
          g.globalCompositeOperation = "source-over";
        }
      }
      for (const o of sorted) body(o, o.x, o.y, o.r, 1);
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
      if (motion.matches) t = 5;
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
        t = 5;
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
  }, [colorKey, background, floor, size, speed]);

  return (
    <div ref={wrapRef} className={`hb-vd12 ${className}`} style={style} {...rest}>
      <style href="hb-bg-glow-orbs" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-vd12-c" aria-hidden="true" />
      {children ? <div className="hb-vd12-in">{children}</div> : null}
    </div>
  );
}
