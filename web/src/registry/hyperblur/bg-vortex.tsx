"use client";

import * as React from "react";

export interface BgVortexProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  rings?: number;
  twist?: number;
  sparks?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve12 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve12-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve12-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
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

export function BgVortex({
  color = "#3a2a8f",
  accent = "#7fb3ff",
  background = "#040409",
  rings = 32,
  twist = 2.4,
  sparks = 160,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgVortexProps) {
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

    const ca = rgbOf(color, [58, 42, 143]);
    const cb = rgbOf(accent, [127, 179, 255]);
    const nr = Math.max(8, Math.min(80, Math.round(rings)));
    const ns = Math.max(0, Math.min(600, Math.round(sparks)));
    const sp = Array.from({ length: ns }, (_, i) => ({
      a: rnd(i * 4 + 1) * 6.283,
      z: rnd(i * 4 + 2),
      v: 0.6 + rnd(i * 4 + 3) * 0.8,
      r: 0.75 + rnd(i * 4 + 4) * 0.35,
    }));

    let w = 0;
    let h = 0;
    let t = 0;

    function mix(k: number, a: number) {
      return `rgba(${Math.round(ca[0] + (cb[0] - ca[0]) * k)},${Math.round(ca[1] + (cb[1] - ca[1]) * k)},${Math.round(ca[2] + (cb[2] - ca[2]) * k)},${a.toFixed(3)})`;
    }

    function proj(z: number) {
      return 1 / (0.09 + (1 - z) * 2.4);
    }

    function center(z: number): [number, number] {
      const far = 1 - z;
      return [
        w / 2 + Math.sin(t * 0.31) * w * 0.09 * far * far + Math.sin(t * 0.17 + 1) * w * 0.03 * far,
        h / 2 + Math.cos(t * 0.23) * h * 0.08 * far * far,
      ];
    }

    function render() {
      if (!w || !h) return;
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      const R = Math.max(w, h) * 0.16;
      const flow = t * 0.07;
      g.lineCap = "round";
      g.globalCompositeOperation = "lighter";
      for (let i = 0; i < nr; i++) {
        const z = (i / nr + flow) % 1;
        const r = R * proj(z);
        if (r > Math.max(w, h) * 1.4) continue;
        const [cx, cy] = center(z);
        const fade = Math.min(1, z / 0.25) * Math.min(1, (1 - z) / 0.22);
        if (fade <= 0.01) continue;
        const rot = t * 0.35 + z * twist * 3.14159;
        const segs = 14;
        const arc = (6.2832 / segs) * 0.56;
        g.strokeStyle = mix(z, fade * (0.35 + z * 0.5));
        g.lineWidth = 0.6 + z * z * 5;
        g.beginPath();
        for (let s = 0; s < segs; s++) {
          const a0 = rot + (s * 6.2832) / segs;
          g.moveTo(cx + Math.cos(a0) * r, cy + Math.sin(a0) * r);
          g.arc(cx, cy, r, a0, a0 + arc);
        }
        g.stroke();
      }
      g.lineWidth = 1.2;
      for (const s of sp) {
        const z0 = (s.z + flow * s.v * 1.4) % 1;
        const z1 = Math.max(0, z0 - 0.025);
        const fade = Math.min(1, z0 / 0.3) * Math.min(1, (1 - z0) / 0.12);
        if (fade <= 0.01) continue;
        const a0 = s.a + t * 0.35 + z0 * twist * 3.14159;
        const a1 = s.a + t * 0.35 + z1 * twist * 3.14159;
        const [x0, y0] = center(z0);
        const [x1, y1] = center(z1);
        const r0 = R * proj(z0) * s.r;
        const r1 = R * proj(z1) * s.r;
        g.strokeStyle = mix(0.6 + z0 * 0.4, fade * 0.8);
        g.beginPath();
        g.moveTo(x1 + Math.cos(a1) * r1, y1 + Math.sin(a1) * r1);
        g.lineTo(x0 + Math.cos(a0) * r0, y0 + Math.sin(a0) * r0);
        g.stroke();
      }
      g.globalCompositeOperation = "source-over";
      const [ex, ey] = center(0);
      const core = g.createRadialGradient(ex, ey, 0, ex, ey, R * 0.9);
      core.addColorStop(0, mix(1, 0.35));
      core.addColorStop(0.25, mix(0.5, 0.12));
      core.addColorStop(1, "rgba(0,0,0,0)");
      g.globalCompositeOperation = "lighter";
      g.fillStyle = core;
      g.fillRect(0, 0, w, h);
      g.globalCompositeOperation = "source-over";
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function still() {
      t = 3;
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
  }, [color, accent, background, rings, twist, sparks, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve12 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-vortex" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve12-c" aria-hidden="true" />
      {children ? <div className="hb-ve12-in">{children}</div> : null}
    </div>
  );
}
