"use client";

import * as React from "react";
import { Pause, Play } from "./icons";

const G = 16;
const ZMAX = 5;
const LOOP = 14;
const SEED = 0x2f7b;

type Cell = { kind: "b" | "w" | "p" | "l"; h: number; seed: number };
type RGB = [number, number, number];

function hash(n: number) {
  let h = Math.imul((n + SEED) ^ ((n + SEED) >>> 16), 0x45d9f3b);
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function riverX(y: number) {
  return 6.2 + y * 0.55 + Math.sin(y * 0.6) * 0.6;
}

function buildCity(): Cell[] {
  const cells: Cell[] = [];
  for (let gy = 0; gy < G; gy++) {
    for (let gx = 0; gx < G; gx++) {
      const k = gy * G + gx;
      const cx = gx + 0.5;
      const cy = gy + 0.5;
      const r = hash(k * 7 + 3);
      let kind: Cell["kind"] = "b";
      if (Math.abs(cx - riverX(cy)) < 1.05) kind = "w";
      else if (gx >= 11 && gx <= 13 && gy >= 9 && gy <= 11) kind = "p";
      else if (gx >= 2 && gx <= 3 && gy >= 2 && gy <= 3) kind = "p";
      else if (r < 0.06) kind = "l";
      const dc = Math.hypot(cx - 9.5, cy - 6.5);
      const core = Math.max(0, 1 - dc / 6.5);
      const h = 0.3 + r * r * 1.1 + core * core * hash(k * 13 + 1) * 4.2;
      cells.push({ kind, h: Math.min(ZMAX, h), seed: k });
    }
  }
  return cells;
}

const route: [number, number][] = [
  [1, 15],
  [1, 11],
  [4, 11],
  [4, 8],
  [7, 8],
  [7, 5],
  [10, 5],
  [10, 2],
  [14, 2],
  [14, 0],
];

const segs = route.slice(1).map((p, i) => Math.hypot(p[0] - route[i][0], p[1] - route[i][1]));
const total = segs.reduce((a, b) => a + b, 0);

function pointAt(p: number): [number, number] {
  let d = p * total;
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i] || i === segs.length - 1) {
      const t = segs[i] === 0 ? 0 : Math.min(1, d / segs[i]);
      const a = route[i];
      const b = route[i + 1];
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    }
    d -= segs[i];
  }
  return route[route.length - 1];
}

const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const scale = (c: RGB, k: number): RGB => [c[0] * k, c[1] * k, c[2] * k];
const add = (c: RGB, d: RGB, k: number): RGB => [c[0] + d[0] * k, c[1] + d[1] * k, c[2] + d[2] * k];
const rgb = (c: RGB, a = 1) => `rgba(${Math.round(Math.min(255, c[0]))},${Math.round(Math.min(255, c[1]))},${Math.round(Math.min(255, c[2]))},${a.toFixed(3)})`;

function lighting(hour: number) {
  const a = ((hour - 6) / 12) * Math.PI;
  const elev = Math.sin(a);
  const day = Math.max(0, Math.min(1, elev * 1.3 + 0.1));
  const side = Math.cos(a) * day;
  const warm = Math.exp(-((hour - 18.6) ** 2) / 1.6) + Math.exp(-((hour - 6.4) ** 2) / 1.6);
  const tint: RGB = [70, 22, 12];
  return {
    day,
    warm,
    sky: add(mix([5, 7, 11], [16, 22, 33], day), tint, warm * 0.35),
    ground: add(mix([7, 9, 14], [19, 24, 33], day), tint, warm * 0.12),
    top: add(mix([17, 22, 31], [58, 66, 82], day), tint, warm * 0.6),
    right: scale(mix([10, 13, 20], [34, 40, 53], day), 1 + side * 0.3),
    left: scale(mix([13, 16, 24], [42, 49, 63], day), 1 - side * 0.3),
    water: mix([6, 15, 23], [20, 44, 60], day),
    park: mix([8, 17, 15], [22, 44, 36], day),
    windows: Math.max(0, Math.min(1, (1 - day) * 1.25 - 0.08)),
    edge: 0.1 + day * 0.1,
  };
}

function hourLabel(h: number) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const phase = h < 5 ? "Night" : h < 7.5 ? "Dawn" : h < 17 ? "Day" : h < 20 ? "Dusk" : "Night";
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")} · ${phase}`;
}

type View = { w: number; h: number; dpr: number; u: number; ox: number; oy: number };

function project(v: View, x: number, y: number, z: number): [number, number] {
  return [v.ox + (x - y) * v.u, v.oy + (x + y) * v.u * 0.5 - z * v.u * 0.85];
}

function drawCity(ctx: CanvasRenderingContext2D, v: View, cells: Cell[], hour: number) {
  const L = lighting(hour);
  const P = (x: number, y: number, z: number) => project(v, x, y, z);
  const sky = ctx.createLinearGradient(0, 0, 0, v.h);
  sky.addColorStop(0, rgb(L.sky));
  sky.addColorStop(1, rgb(scale(L.sky, 0.55)));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, v.w, v.h);

  const quad = (pts: [number, number][]) => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
  };

  quad([P(0, 0, 0), P(G, 0, 0), P(G, G, 0), P(0, G, 0)]);
  ctx.fillStyle = rgb(L.ground);
  ctx.fill();

  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(217,222,232,${(0.05 + L.day * 0.05).toFixed(3)})`;
  ctx.beginPath();
  for (let i = 0; i <= G; i++) {
    const a = P(i, 0, 0);
    const b = P(i, G, 0);
    const c = P(0, i, 0);
    const d = P(G, i, 0);
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.moveTo(c[0], c[1]);
    ctx.lineTo(d[0], d[1]);
  }
  ctx.stroke();

  ctx.beginPath();
  const steps = 40;
  for (let s = 0; s <= steps; s++) {
    const y = -0.2 + (s / steps) * (G + 0.4);
    const yy = Math.max(0, Math.min(G, y));
    const p = P(Math.min(G, riverX(yy) - 0.85), yy, 0);
    if (s === 0) ctx.moveTo(p[0], p[1]);
    else ctx.lineTo(p[0], p[1]);
  }
  for (let s = steps; s >= 0; s--) {
    const y = -0.2 + (s / steps) * (G + 0.4);
    const yy = Math.max(0, Math.min(G, y));
    const p = P(Math.min(G, riverX(yy) + 0.85), yy, 0);
    ctx.lineTo(p[0], p[1]);
  }
  ctx.closePath();
  ctx.fillStyle = rgb(L.water);
  ctx.fill();
  ctx.strokeStyle = `rgba(94,234,212,${(0.12 + L.day * 0.1).toFixed(3)})`;
  ctx.stroke();

  const m = 0.16;
  for (let s = 0; s <= 2 * (G - 1); s++) {
    for (let gx = Math.max(0, s - G + 1); gx <= Math.min(G - 1, s); gx++) {
      const gy = s - gx;
      const c = cells[gy * G + gx];
      if (c.kind === "w") continue;
      const x0 = gx + m;
      const y0 = gy + m;
      const x1 = gx + 1 - m;
      const y1 = gy + 1 - m;
      if (c.kind === "p") {
        quad([P(x0, y0, 0.02), P(x1, y0, 0.02), P(x1, y1, 0.02), P(x0, y1, 0.02)]);
        ctx.fillStyle = rgb(L.park);
        ctx.fill();
        ctx.fillStyle = `rgba(94,234,212,${(0.25 + L.day * 0.2).toFixed(3)})`;
        for (let t = 0; t < 4; t++) {
          const tx = x0 + 0.15 + hash(c.seed * 5 + t) * 0.5;
          const ty = y0 + 0.15 + hash(c.seed * 9 + t) * 0.5;
          const p = P(tx, ty, 0.12);
          ctx.beginPath();
          ctx.arc(p[0], p[1], Math.max(1, v.u * 0.06), 0, Math.PI * 2);
          ctx.fill();
        }
        continue;
      }
      const z = c.kind === "l" ? 0.06 : c.h;
      const tA = P(x0, y0, z);
      const tB = P(x1, y0, z);
      const tC = P(x1, y1, z);
      const tD = P(x0, y1, z);
      const gB = P(x1, y0, 0);
      const gC = P(x1, y1, 0);
      const gD = P(x0, y1, 0);
      quad([tB, tC, gC, gB]);
      ctx.fillStyle = rgb(L.right);
      ctx.fill();
      quad([tD, tC, gC, gD]);
      ctx.fillStyle = rgb(L.left);
      ctx.fill();
      quad([tA, tB, tC, tD]);
      ctx.fillStyle = rgb(L.top);
      ctx.fill();
      ctx.strokeStyle = `rgba(217,222,232,${L.edge.toFixed(3)})`;
      ctx.stroke();

      if (L.windows > 0.02 && z > 0.6) {
        const floors = Math.floor(z / 0.34);
        const sz = Math.max(1, v.u * 0.055);
        for (let f = 0; f < floors; f++) {
          const wz = 0.2 + f * 0.34;
          for (let k = 0; k < 3; k++) {
            const t = 0.22 + k * 0.28;
            const lr = hash(c.seed * 31 + f * 7 + k);
            if (lr < 0.4) {
              const p = P(x1, y0 + (y1 - y0) * t, wz);
              ctx.fillStyle = lr < 0.03 ? `rgba(255,77,77,${L.windows.toFixed(3)})` : `rgba(255,214,160,${(L.windows * (0.45 + lr)).toFixed(3)})`;
              ctx.fillRect(p[0] - sz / 2, p[1] - sz / 2, sz, sz);
            }
            const lr2 = hash(c.seed * 37 + f * 11 + k);
            if (lr2 < 0.4) {
              const p = P(x0 + (x1 - x0) * t, y1, wz);
              ctx.fillStyle = lr2 < 0.03 ? `rgba(94,234,212,${L.windows.toFixed(3)})` : `rgba(255,214,160,${(L.windows * (0.4 + lr2)).toFixed(3)})`;
              ctx.fillRect(p[0] - sz / 2, p[1] - sz / 2, sz, sz);
            }
          }
        }
        if (z > 3.2) {
          const top = P((x0 + x1) / 2, (y0 + y1) / 2, z);
          ctx.fillStyle = `rgba(255,77,77,${(0.35 + L.windows * 0.65).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(top[0], top[1], Math.max(1.2, v.u * 0.07), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
}

function drawRoute(ctx: CanvasRenderingContext2D, v: View, p: number, time: number) {
  const pts = route.map(([x, y]) => project(v, x, y, 0.02));
  const lw = Math.max(1.5, v.u * 0.085);
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.setLineDash([v.u * 0.16, v.u * 0.18]);
  ctx.strokeStyle = "rgba(255,77,77,.32)";
  ctx.lineWidth = Math.max(1, lw * 0.6);
  ctx.beginPath();
  pts.forEach((q, i) => (i === 0 ? ctx.moveTo(q[0], q[1]) : ctx.lineTo(q[0], q[1])));
  ctx.stroke();
  ctx.setLineDash([]);

  const head = pointAt(p);
  ctx.beginPath();
  let d = p * total;
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 0; i < segs.length && d > 0; i++) {
    if (d >= segs[i]) ctx.lineTo(pts[i + 1][0], pts[i + 1][1]);
    else {
      const hp = project(v, head[0], head[1], 0.02);
      ctx.lineTo(hp[0], hp[1]);
    }
    d -= segs[i];
  }
  ctx.shadowColor = "#ff4d4d";
  ctx.shadowBlur = 14;
  ctx.strokeStyle = "#ff4d4d";
  ctx.lineWidth = lw;
  ctx.stroke();
  ctx.shadowBlur = 0;

  const ends: [[number, number], string][] = [
    [route[0], "Depot"],
    [route[route.length - 1], "Drop 07"],
  ];
  ctx.font = `500 ${Math.max(9, Math.round(v.u * 0.38))}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ends.forEach(([[x, y], label]) => {
    const g = project(v, x, y, 0);
    const t = project(v, x, y, 1.4);
    ctx.strokeStyle = "rgba(217,222,232,.55)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(g[0], g[1]);
    ctx.lineTo(t[0], t[1]);
    ctx.stroke();
    ctx.fillStyle = "#05070b";
    ctx.strokeStyle = "#d9dee8";
    const s = Math.max(4, v.u * 0.16);
    ctx.fillRect(g[0] - s / 2, g[1] - s / 2, s, s);
    ctx.strokeRect(g[0] - s / 2, g[1] - s / 2, s, s);
    ctx.fillStyle = "#d9dee8";
    const text = label.toUpperCase();
    const tw = ctx.measureText(text).width;
    const tx = t[0] + 5 + tw > v.w - 6 ? t[0] - 5 - tw : t[0] + 5;
    ctx.fillText(text, Math.max(6, tx), t[1] + 3);
  });

  const hg = project(v, head[0], head[1], 0.02);
  const ht = project(v, head[0], head[1], 2.4);
  const beam = ctx.createLinearGradient(hg[0], hg[1], ht[0], ht[1]);
  beam.addColorStop(0, "rgba(255,77,77,.9)");
  beam.addColorStop(1, "rgba(255,77,77,0)");
  ctx.strokeStyle = beam;
  ctx.lineWidth = Math.max(1, lw * 0.5);
  ctx.beginPath();
  ctx.moveTo(hg[0], hg[1]);
  ctx.lineTo(ht[0], ht[1]);
  ctx.stroke();

  const pulse = (time % 1.6) / 1.6;
  ctx.strokeStyle = `rgba(255,77,77,${(0.8 * (1 - pulse)).toFixed(3)})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(hg[0], hg[1], v.u * (0.2 + pulse * 0.9), v.u * (0.1 + pulse * 0.45), 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.shadowColor = "#ff4d4d";
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.arc(hg[0], hg[1], Math.max(2.5, v.u * 0.11), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function CityStudy() {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const scrubRef = React.useRef<HTMLInputElement>(null);
  const distRef = React.useRef<HTMLSpanElement>(null);
  const etaRef = React.useRef<HTMLSpanElement>(null);
  const speedRef = React.useRef<HTMLSpanElement>(null);
  const pctRef = React.useRef<HTMLSpanElement>(null);
  const [hour, setHour] = React.useState(19.5);
  const [playing, setPlaying] = React.useState(true);
  const state = React.useRef({ p: 0.18, time: 0, playing: true, visible: true, reduced: false, hour: 19.5, dirty: true, layerDirty: true });
  const cells = React.useMemo(() => buildCity(), []);

  React.useEffect(() => {
    state.current.playing = playing;
  }, [playing]);

  React.useEffect(() => {
    state.current.hour = hour;
    state.current.layerDirty = true;
    state.current.dirty = true;
  }, [hour]);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = state.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    s.reduced = mq.matches;
    if (s.reduced) s.p = 0.64;
    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d");
    if (!lctx) return;
    let view: View = { w: 0, h: 0, dpr: 1, u: 1, ox: 0, oy: 0 };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, r.width);
      const h = Math.max(1, r.height);
      const top = 1.7;
      const u = Math.min(w / (2 * G + 1), h / (G + top + 0.4));
      const H = (G + top) * u;
      view = { w, h, dpr, u, ox: w / 2, oy: (h - H) / 2 + top * u };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      layer.width = canvas.width;
      layer.height = canvas.height;
      s.layerDirty = true;
      s.dirty = true;
    };

    const readouts = () => {
      const p = s.p;
      if (scrubRef.current) {
        scrubRef.current.value = String(Math.round(p * 1000));
        scrubRef.current.style.setProperty("--p", `${(p * 100).toFixed(1)}%`);
      }
      if (distRef.current) distRef.current.textContent = (p * 4.82).toFixed(2);
      if (etaRef.current) {
        const sec = Math.round((1 - p) * 13.5 * 60);
        etaRef.current.textContent = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
      }
      if (speedRef.current) speedRef.current.textContent = String(Math.round(19 + Math.sin(p * 17) * 5 + Math.sin(p * 41) * 2));
      if (pctRef.current) pctRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
    };

    const render = () => {
      if (s.layerDirty) {
        lctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
        drawCity(lctx, view, cells, s.hour);
        s.layerDirty = false;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(layer, 0, 0);
      ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
      drawRoute(ctx, view, s.p, s.time);
      readouts();
      s.dirty = false;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver((entries) => {
            s.visible = entries.some((e) => e.isIntersecting);
          });
    io?.observe(wrap);
    const onMq = () => {
      s.reduced = mq.matches;
      s.dirty = true;
    };
    mq.addEventListener("change", onMq);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!s.visible) return;
      if (!s.reduced) {
        s.time += dt;
        if (s.playing) s.p = (s.p + dt / LOOP) % 1;
        s.dirty = true;
      }
      if (s.dirty) render();
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, [cells]);

  const hourPct = `${((hour / 24) * 100).toFixed(1)}%`;

  return (
    <div className="hbl-lb-panel">
      <div ref={wrapRef} className="hbl-lb-scan relative aspect-[4/3] w-full sm:aspect-[16/9]">
        <canvas ref={canvasRef} className="hbl-lb-canvas absolute inset-0" role="img" aria-label="An isometric city at night with a courier route lit in red, replayed from the depot to drop point 07." />
        <div className="pointer-events-none absolute left-3 top-3 border border-white/10 bg-[#05070b]/70 px-3 py-2 sm:left-4 sm:top-4">
          <p className="hbl-lb-label hbl-lb-label-red">Route R-07</p>
          <dl className="mt-1.5 grid grid-cols-[auto_auto] gap-x-4 gap-y-0.5 font-mono text-[11px] tabular-nums text-[#d9dee8]">
            <dt className="text-[#7a8394]">DIST</dt>
            <dd><span ref={distRef}>0.00</span> km</dd>
            <dt className="text-[#7a8394]">ETA</dt>
            <dd ref={etaRef}>13:30</dd>
            <dt className="hidden text-[#7a8394] sm:block">SPEED</dt>
            <dd className="hidden sm:block"><span ref={speedRef}>19</span> km/h</dd>
          </dl>
        </div>
        <div className="pointer-events-none absolute right-3 top-3 hidden text-right sm:right-4 sm:top-4 sm:block">
          <p className="hbl-lb-label">Seed 0x2F7B</p>
          <p className="hbl-lb-label mt-1">Grid 16 × 16</p>
          <p className="hbl-lb-label mt-1">Blocks 206</p>
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
          <p className="hbl-lb-label"><span className="hbl-lb-dot mr-2" aria-hidden="true" />Replay <span ref={pctRef} className="text-[#d9dee8]">000</span>%</p>
        </div>
      </div>
      <div className="grid gap-4 border-t border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] sm:gap-8 sm:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="hbl-lb-btn hbl-lb-btn-sm shrink-0"
            aria-pressed={playing}
            aria-label={playing ? "Pause route replay" : "Play route replay"}
          >
            {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <div className="min-w-0 flex-1">
            <label htmlFor="hbl-lb-scrub" className="hbl-lb-label">Route replay</label>
            <input
              ref={scrubRef}
              id="hbl-lb-scrub"
              type="range"
              min={0}
              max={1000}
              step={1}
              defaultValue={180}
              className="hbl-lb-range"
              onInput={(e) => {
                state.current.p = Number(e.currentTarget.value) / 1000;
                state.current.dirty = true;
              }}
            />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="hbl-lb-hour" className="hbl-lb-label">Time of day</label>
            <span className="font-mono text-[11px] tabular-nums text-[#d9dee8]">{hourLabel(hour)}</span>
          </div>
          <input
            id="hbl-lb-hour"
            type="range"
            min={0}
            max={23.75}
            step={0.25}
            value={hour}
            onChange={(e) => setHour(Number(e.currentTarget.value))}
            className="hbl-lb-range"
            style={{ ["--p" as string]: hourPct }}
          />
        </div>
      </div>
    </div>
  );
}
