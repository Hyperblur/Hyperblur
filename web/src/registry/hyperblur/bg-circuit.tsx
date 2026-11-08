"use client";

import * as React from "react";

export interface BgCircuitProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  pitch?: number;
  pulses?: number;
  chips?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-ve6 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-ve6-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ve6-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

function rgbOf(value: string, fallback: [number, number, number]): [number, number, number] {
  const raw = value.trim().replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(hex.slice(0, 6), 16);
  if (hex.length < 6 || Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const DIRS: [number, number][] = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

interface Trace {
  xs: number[];
  ys: number[];
  acc: number[];
  len: number;
  flash: number;
}

interface Pulse {
  trace: number;
  s: number;
  v: number;
  wait: number;
}

export function BgCircuit({
  color = "#1d2636",
  accent = "#2f7bff",
  background = "#05070b",
  pitch = 22,
  pulses = 1,
  chips = true,
  speed = 1,
  className = "",
  style,
  children,
  ...rest
}: BgCircuitProps) {
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
    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d");
    if (!lctx) return;
    const L: CanvasRenderingContext2D = lctx;

    const lc = rgbOf(color, [29, 38, 54]);
    const ac = rgbOf(accent, [47, 123, 255]);
    const glow = document.createElement("canvas");
    glow.width = 64;
    glow.height = 64;
    const gc = glow.getContext("2d");
    if (gc) {
      const rg = gc.createRadialGradient(32, 32, 0, 32, 32, 32);
      rg.addColorStop(0, `rgba(${ac[0]},${ac[1]},${ac[2]},0.9)`);
      rg.addColorStop(0.25, `rgba(${ac[0]},${ac[1]},${ac[2]},0.35)`);
      rg.addColorStop(1, `rgba(${ac[0]},${ac[1]},${ac[2]},0)`);
      gc.fillStyle = rg;
      gc.fillRect(0, 0, 64, 64);
    }

    let seed = 0xc1c;
    function rand() {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    let w = 0;
    let h = 0;
    let t = 0;
    let traces: Trace[] = [];
    let list: Pulse[] = [];

    function build(dpr: number) {
      seed = 0xc1c;
      const p = Math.max(12, pitch);
      const cols = Math.ceil(w / p) + 1;
      const rows = Math.ceil(h / p) + 1;
      const occ = new Uint8Array(cols * rows);
      const ox = (w - (cols - 1) * p) / 2;
      const oy = (h - (rows - 1) * p) / 2;
      const pins: [number, number, number][] = [];
      const boxes: [number, number, number, number][] = [];
      if (chips) {
        const count = Math.max(1, Math.round((cols * rows) / 260));
        for (let k = 0; k < count * 4 && boxes.length < count; k++) {
          const bw = 3 + Math.floor(rand() * 3);
          const bh = 2 + Math.floor(rand() * 3);
          const bx = 1 + Math.floor(rand() * Math.max(1, cols - bw - 2));
          const by = 1 + Math.floor(rand() * Math.max(1, rows - bh - 2));
          let free = true;
          for (let y = by - 1; y <= by + bh && free; y++) for (let x = bx - 1; x <= bx + bw && free; x++) if (occ[y * cols + x]) free = false;
          if (!free) continue;
          for (let y = by; y < by + bh; y++) for (let x = bx; x < bx + bw; x++) occ[y * cols + x] = 1;
          boxes.push([bx, by, bw, bh]);
          for (let x = bx; x < bx + bw; x++) {
            pins.push([x, by - 1, 6]);
            pins.push([x, by + bh, 2]);
          }
          for (let y = by; y < by + bh; y++) {
            pins.push([bx - 1, y, 4]);
            pins.push([bx + bw, y, 0]);
          }
        }
      }
      traces = [];
      const attempts = Math.round((cols * rows) / 5);
      for (let a = 0; a < attempts; a++) {
        let cx: number;
        let cy: number;
        let dir: number;
        if (pins.length && rand() < 0.35) {
          const pin = pins[Math.floor(rand() * pins.length)];
          cx = pin[0];
          cy = pin[1];
          dir = pin[2];
        } else {
          cx = Math.floor(rand() * cols);
          cy = Math.floor(rand() * rows);
          dir = Math.floor(rand() * 4) * 2;
        }
        if (cx < 0 || cy < 0 || cx >= cols || cy >= rows || occ[cy * cols + cx]) continue;
        const cells: [number, number][] = [[cx, cy]];
        const target = 3 + Math.floor(rand() * 12);
        const taken = [cy * cols + cx];
        occ[cy * cols + cx] = 1;
        for (let s = 0; s < target; s++) {
          let nd = dir;
          const r = rand();
          if (r < 0.14) nd = (dir + 1) % 8;
          else if (r < 0.28) nd = (dir + 7) % 8;
          const [dx, dy] = DIRS[nd];
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || occ[ny * cols + nx]) break;
          if (dx && dy && occ[cy * cols + nx] && occ[ny * cols + cx]) break;
          occ[ny * cols + nx] = 1;
          taken.push(ny * cols + nx);
          cells.push([nx, ny]);
          cx = nx;
          cy = ny;
          dir = nd;
        }
        if (cells.length < 3) {
          if (cells.length < 2) for (const i of taken) occ[i] = 0;
          continue;
        }
        const xs = cells.map((c) => ox + c[0] * p);
        const ys = cells.map((c) => oy + c[1] * p);
        const acc = [0];
        for (let i = 1; i < xs.length; i++) acc.push(acc[i - 1] + Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]));
        traces.push({ xs, ys, acc, len: acc[acc.length - 1], flash: -9 });
      }

      layer.width = Math.max(1, Math.round(w * dpr));
      layer.height = Math.max(1, Math.round(h * dpr));
      L.setTransform(dpr, 0, 0, dpr, 0, 0);
      L.clearRect(0, 0, w, h);
      L.fillStyle = `rgba(${lc[0]},${lc[1]},${lc[2]},0.5)`;
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (!occ[y * cols + x] && (x + y) % 2 === 0) L.fillRect(ox + x * p - 0.5, oy + y * p - 0.5, 1, 1);
      L.lineCap = "round";
      L.lineJoin = "round";
      L.lineWidth = 1.5;
      L.strokeStyle = `rgb(${lc[0]},${lc[1]},${lc[2]})`;
      for (const tr of traces) {
        L.beginPath();
        L.moveTo(tr.xs[0], tr.ys[0]);
        for (let i = 1; i < tr.xs.length; i++) L.lineTo(tr.xs[i], tr.ys[i]);
        L.stroke();
      }
      L.fillStyle = background;
      for (const tr of traces) {
        for (const i of [0, tr.xs.length - 1]) {
          L.beginPath();
          L.arc(tr.xs[i], tr.ys[i], 2.8, 0, 6.2832);
          L.fill();
          L.stroke();
        }
      }
      for (const [bx, by, bw, bh] of boxes) {
        const x = ox + bx * p - p * 0.42;
        const y = oy + by * p - p * 0.42;
        const ww = (bw - 1) * p + p * 0.84;
        const hh = (bh - 1) * p + p * 0.84;
        const lg = L.createLinearGradient(x, y, x, y + hh);
        lg.addColorStop(0, `rgb(${Math.min(255, lc[0] + 10)},${Math.min(255, lc[1] + 12)},${Math.min(255, lc[2] + 16)})`);
        lg.addColorStop(1, `rgb(${lc[0] >> 1},${lc[1] >> 1},${lc[2] >> 1})`);
        L.fillStyle = lg;
        L.beginPath();
        L.roundRect(x, y, ww, hh, 3);
        L.fill();
        L.strokeStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},0.28)`;
        L.lineWidth = 1;
        L.stroke();
        L.fillStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},0.4)`;
        L.beginPath();
        L.arc(x + 6, y + 6, 1.6, 0, 6.2832);
        L.fill();
        L.strokeStyle = `rgb(${lc[0]},${lc[1]},${lc[2]})`;
        L.lineWidth = 1.5;
      }

      const count = Math.max(1, Math.round(traces.length * 0.28 * pulses));
      list = [];
      for (let i = 0; i < count && traces.length; i++) {
        const ti = Math.floor(rand() * traces.length);
        list.push({ trace: ti, s: rand() * traces[ti].len, v: 50 + rand() * 90, wait: 0 });
      }
    }

    function at(tr: Trace, s: number): [number, number] {
      if (s <= 0) return [tr.xs[0], tr.ys[0]];
      if (s >= tr.len) return [tr.xs[tr.xs.length - 1], tr.ys[tr.ys.length - 1]];
      let i = 1;
      while (i < tr.acc.length - 1 && tr.acc[i] < s) i++;
      const k = (s - tr.acc[i - 1]) / (tr.acc[i] - tr.acc[i - 1] || 1);
      return [tr.xs[i - 1] + (tr.xs[i] - tr.xs[i - 1]) * k, tr.ys[i - 1] + (tr.ys[i] - tr.ys[i - 1]) * k];
    }

    function render(dt: number) {
      if (!w || !h) return;
      g.clearRect(0, 0, w, h);
      g.drawImage(layer, 0, 0, w, h);
      g.globalCompositeOperation = "lighter";
      g.lineCap = "round";
      const tail = 46;
      for (const pu of list) {
        if (pu.wait > 0) {
          pu.wait -= dt;
          continue;
        }
        const tr = traces[pu.trace];
        if (!tr) continue;
        const before = pu.s;
        pu.s += pu.v * dt;
        if (before < tr.len && pu.s >= tr.len) tr.flash = t;
        if (pu.s - tail > tr.len) {
          pu.trace = Math.floor(rand() * traces.length);
          pu.s = 0;
          pu.v = 50 + rand() * 90;
          pu.wait = rand() * 1.4;
          continue;
        }
        const steps = 10;
        let [px, py] = at(tr, pu.s - tail);
        for (let k = 1; k <= steps; k++) {
          const [qx, qy] = at(tr, pu.s - tail + (tail * k) / steps);
          g.strokeStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},${((k / steps) ** 2 * 0.95).toFixed(3)})`;
          g.lineWidth = 1 + (k / steps) * 1.2;
          g.beginPath();
          g.moveTo(px, py);
          g.lineTo(qx, qy);
          g.stroke();
          px = qx;
          py = qy;
        }
        if (pu.s <= tr.len) {
          g.drawImage(glow, px - 14, py - 14, 28, 28);
          g.fillStyle = "rgba(255,255,255,0.9)";
          g.beginPath();
          g.arc(px, py, 1.3, 0, 6.2832);
          g.fill();
        }
      }
      for (const tr of traces) {
        const age = t - tr.flash;
        if (age < 0 || age > 1.1) continue;
        const k = 1 - age / 1.1;
        const ex = tr.xs[tr.xs.length - 1];
        const ey = tr.ys[tr.ys.length - 1];
        g.globalAlpha = k;
        g.drawImage(glow, ex - 18, ey - 18, 36, 36);
        g.strokeStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},${(k * 0.9).toFixed(3)})`;
        g.lineWidth = 1.2;
        g.beginPath();
        g.arc(ex, ey, 2.8 + (1 - k) * 7, 0, 6.2832);
        g.stroke();
        g.globalAlpha = 1;
      }
      g.globalCompositeOperation = "source-over";
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let raf = 0;
    let prev = 0;

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
      build(dpr);
      render(0);
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
  }, [color, accent, background, pitch, pulses, chips, speed]);

  return (
    <div ref={wrapRef} className={`hb-ve6 ${className}`} style={{ background, ...style }} {...rest}>
      <style href="hb-bg-circuit" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ve6-c" aria-hidden="true" />
      {children ? <div className="hb-ve6-in">{children}</div> : null}
    </div>
  );
}
