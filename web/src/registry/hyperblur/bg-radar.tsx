"use client";

import * as React from "react";

export interface BgRadarProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  origin?: [number, number];
  size?: number;
  targets?: number;
  labels?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve14 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve14-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve14-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
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

const TAU = Math.PI * 2;

export function BgRadar({
  color = "#1f3a33",
  accent = "#4dffb4",
  background = "#030806",
  origin = [0.5, 0.5],
  size = 1,
  targets = 9,
  labels = true,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgRadarProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const ox = origin[0];
  const oy = origin[1];

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;
    const g: CanvasRenderingContext2D = ctx;
    const el: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;
    const scope = document.createElement("canvas");
    const sctx = scope.getContext("2d");
    if (!sctx) return;
    const S: CanvasRenderingContext2D = sctx;

    const lc = rgbOf(color, [31, 58, 51]);
    const ac = rgbOf(accent, [77, 255, 180]);
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim();
    const family = `${mono ? mono + ", " : ""}ui-monospace, SFMono-Regular, Menlo, monospace`;
    const sprite = document.createElement("canvas");
    sprite.width = 48;
    sprite.height = 48;
    const spc = sprite.getContext("2d");
    if (spc) {
      const rg = spc.createRadialGradient(24, 24, 0, 24, 24, 24);
      rg.addColorStop(0, `rgba(${ac[0]},${ac[1]},${ac[2]},1)`);
      rg.addColorStop(0.2, `rgba(${ac[0]},${ac[1]},${ac[2]},0.45)`);
      rg.addColorStop(1, `rgba(${ac[0]},${ac[1]},${ac[2]},0)`);
      spc.fillStyle = rg;
      spc.fillRect(0, 0, 48, 48);
    }

    const nt = Math.max(0, Math.min(40, Math.round(targets)));
    const tg = Array.from({ length: nt }, (_, i) => ({
      r: 0.14 + rnd(i * 6 + 1) * 0.8,
      a: rnd(i * 6 + 2) * TAU,
      vr: (rnd(i * 6 + 3) - 0.5) * 0.006,
      va: (rnd(i * 6 + 4) - 0.5) * 0.02,
      id: 100 + Math.floor(rnd(i * 6 + 5) * 899),
      hit: -99,
      last: 0,
    }));

    let w = 0;
    let h = 0;
    let t = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let primed = false;

    function paintScope(dpr: number) {
      scope.width = Math.max(1, Math.round(w * dpr));
      scope.height = Math.max(1, Math.round(h * dpr));
      S.setTransform(dpr, 0, 0, dpr, 0, 0);
      S.clearRect(0, 0, w, h);
      const line = `rgb(${lc[0]},${lc[1]},${lc[2]})`;
      S.strokeStyle = line;
      S.lineWidth = 1;
      for (let i = 1; i <= 5; i++) {
        S.globalAlpha = i === 5 ? 1 : 0.7;
        S.beginPath();
        S.arc(cx, cy, (R * i) / 5, 0, TAU);
        S.stroke();
      }
      S.globalAlpha = 0.5;
      S.setLineDash([2, 4]);
      for (let i = 0; i < 12; i++) {
        const a = (i * TAU) / 12;
        S.beginPath();
        S.moveTo(cx + Math.cos(a) * R * 0.2, cy + Math.sin(a) * R * 0.2);
        S.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        S.stroke();
      }
      S.setLineDash([]);
      S.globalAlpha = 1;
      for (let d = 0; d < 360; d += 2) {
        const a = (d * Math.PI) / 180 - Math.PI / 2;
        const major = d % 10 === 0;
        const r0 = R * (major ? 0.965 : 0.982);
        S.globalAlpha = major ? 0.95 : 0.5;
        S.beginPath();
        S.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
        S.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        S.stroke();
      }
      S.globalAlpha = 0.85;
      S.fillStyle = `rgb(${Math.min(255, lc[0] + 60)},${Math.min(255, lc[1] + 80)},${Math.min(255, lc[2] + 70)})`;
      S.font = `500 9px ${family}`;
      S.textAlign = "center";
      S.textBaseline = "middle";
      for (let d = 0; d < 360; d += 30) {
        const a = (d * Math.PI) / 180 - Math.PI / 2;
        S.fillText(String(d).padStart(3, "0"), cx + Math.cos(a) * R * 0.92, cy + Math.sin(a) * R * 0.92);
      }
      S.textAlign = "left";
      for (let i = 1; i < 5; i++) S.fillText(`${i * 10}`, cx + 4, cy - (R * i) / 5 - 6);
      S.globalAlpha = 1;
    }

    function render(dt: number) {
      if (!w || !h) return;
      g.fillStyle = background;
      g.fillRect(0, 0, w, h);
      const vg = g.createRadialGradient(cx, cy, 0, cx, cy, R * 1.05);
      vg.addColorStop(0, `rgba(${ac[0]},${ac[1]},${ac[2]},0.06)`);
      vg.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = vg;
      g.fillRect(0, 0, w, h);
      g.drawImage(scope, 0, 0, w, h);
      const sweep = (t * 0.85) % TAU;
      const trail = 1.25;
      if (typeof g.createConicGradient === "function") {
        const grad = g.createConicGradient(sweep - trail, cx, cy);
        const f = trail / TAU;
        grad.addColorStop(0, `rgba(${ac[0]},${ac[1]},${ac[2]},0)`);
        grad.addColorStop(f * 0.7, `rgba(${ac[0]},${ac[1]},${ac[2]},0.07)`);
        grad.addColorStop(f, `rgba(${ac[0]},${ac[1]},${ac[2]},0.32)`);
        grad.addColorStop(Math.min(1, f + 0.0005), `rgba(${ac[0]},${ac[1]},${ac[2]},0)`);
        grad.addColorStop(1, `rgba(${ac[0]},${ac[1]},${ac[2]},0)`);
        g.fillStyle = grad;
        g.beginPath();
        g.arc(cx, cy, R, 0, TAU);
        g.fill();
      } else {
        for (let k = 0; k < 24; k++) {
          const a0 = sweep - trail + (trail * k) / 24;
          g.fillStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},${((k / 24) ** 2 * 0.3).toFixed(3)})`;
          g.beginPath();
          g.moveTo(cx, cy);
          g.arc(cx, cy, R, a0, a0 + trail / 24 + 0.01);
          g.closePath();
          g.fill();
        }
      }
      g.strokeStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},0.9)`;
      g.lineWidth = 1.4;
      g.beginPath();
      g.moveTo(cx, cy);
      g.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R);
      g.stroke();
      g.font = `500 9px ${family}`;
      g.textAlign = "left";
      g.textBaseline = "middle";
      g.globalCompositeOperation = "lighter";
      for (let i = 0; i < tg.length; i++) {
        const o = tg[i];
        o.r += o.vr * dt;
        o.a += o.va * dt;
        if (o.r < 0.12 || o.r > 0.95) o.vr = -o.vr;
        const ang = ((o.a % TAU) + TAU) % TAU;
        const delta = (((sweep - ang) % TAU) + TAU) % TAU;
        if (delta < o.last && dt > 0) o.hit = t;
        o.last = delta;
        const age = t - o.hit;
        const b = age >= 0 ? Math.exp(-age / 2.8) : 0;
        if (b < 0.02) continue;
        const x = cx + Math.cos(ang) * o.r * R;
        const y = cy + Math.sin(ang) * o.r * R;
        g.globalAlpha = b;
        g.drawImage(sprite, x - 12, y - 12, 24, 24);
        g.fillStyle = "rgba(240,255,248,0.95)";
        g.fillRect(x - 1.2, y - 1.2, 2.4, 2.4);
        if (labels && i % 3 === 0) {
          g.globalAlpha = b * 0.85;
          g.strokeStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},0.7)`;
          g.lineWidth = 1;
          g.beginPath();
          g.moveTo(x + 4, y - 4);
          g.lineTo(x + 12, y - 12);
          g.lineTo(x + 18, y - 12);
          g.stroke();
          g.fillStyle = `rgb(${ac[0]},${ac[1]},${ac[2]})`;
          g.fillText(`TRK ${o.id} · ${(o.r * 50).toFixed(1)}`, x + 21, y - 12);
        }
      }
      g.globalAlpha = 1;
      g.globalCompositeOperation = "source-over";
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

    function prime() {
      for (const o of tg) {
        const back = ((((t * 0.85 - o.a) % TAU) + TAU) % TAU) / 0.85;
        o.hit = t - back;
        o.last = (((t * 0.85 - o.a) % TAU) + TAU) % TAU;
      }
    }

    function still() {
      t = 4;
      prime();
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
      cx = w * ox;
      cy = h * oy;
      R = Math.max(80, Math.max(w, h) * 0.44 * size);
      paintScope(dpr);
      if (motion.matches) still();
      else {
        if (!primed) {
          t = 4;
          prime();
          primed = true;
        }
        render(0);
      }
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
  }, [color, accent, background, ox, oy, size, targets, labels, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve14 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-radar" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve14-c" aria-hidden="true" />
      {children ? <div className="hb-ve14-in">{children}</div> : null}
    </div>
  );
}
