"use client";

import * as React from "react";

export interface MapCityBlocksProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  accent?: string;
  seed?: number;
  autoRotate?: boolean;
  night?: boolean;
  defaultNight?: boolean;
  onNightChange?: (night: boolean) => void;
  label?: string;
  caption?: string;
}

type Pt = [number, number];
type C3 = [number, number, number];
type Box = { x0: number; y0: number; x1: number; y1: number; h: number; t: number; id: number };
type Cell = { i: number; j: number; k: number };
type City = { n: number; seed: number; boxes: Box[]; cells: Cell[]; trees: Pt[]; lamps: Pt[] };
type View = { k: number; ox: number; oy: number; c: number; cos: number; sin: number };

const GRID = 12;
const RW = 0.4;
const SUN_X = Math.cos(0.95);
const SUN_Y = Math.sin(0.95);
const NORMALS: Pt[] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
const RM_QUERY = "(prefers-reduced-motion: reduce)";

function mix32(n: number) {
  let x = n | 0;
  x = Math.imul(x ^ (x >>> 16), 0x7feb352d);
  x = Math.imul(x ^ (x >>> 15), 0x846ca68b);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

function rnd(seed: number, a: number, b = 0, c = 0) {
  return mix32(seed * 374761393 + a * 668265263 + b * 2246822519 + c * 3266489917 + 1013904223);
}

function riverY(x: number, n: number, seed: number) {
  return n * 0.76 + Math.sin(x * 0.5 + seed * 0.9) * 1.1 + Math.sin(x * 1.1 + seed) * 0.25;
}

function buildCity(n: number, seed: number): City {
  const boxes: Box[] = [];
  const cells: Cell[] = [];
  const trees: Pt[] = [];
  const lamps: Pt[] = [];
  const pi = 1 + Math.floor(rnd(seed, 1) * 3);
  const pj = 1 + Math.floor(rnd(seed, 2) * 3);
  const dcx = n * 0.55;
  const dcy = n * 0.45;
  let id = 0;
  for (let j = 1; j < n; j++) {
    for (let i = 1; i < n; i++) {
      if (Math.abs(j - riverY(i, n, seed)) > RW + 0.12) lamps.push([i, j]);
    }
  }
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const cx = i + 0.5;
      const cy = j + 0.5;
      const dr = Math.abs(cy - riverY(cx, n, seed));
      if (dr < RW + 0.1) continue;
      if (dr < 0.95) {
        cells.push({ i, j, k: 2 });
        for (let q = 0; q < 3; q++) {
          const tx = i + 0.2 + rnd(seed, i, j, q * 2 + 40) * 0.6;
          const ty = j + 0.2 + rnd(seed, i, j, q * 2 + 41) * 0.6;
          if (Math.abs(ty - riverY(tx, n, seed)) > RW + 0.14) trees.push([tx, ty]);
        }
        continue;
      }
      if (i >= pi && i < pi + 2 && j >= pj && j < pj + 2) {
        cells.push({ i, j, k: 1 });
        for (let q = 0; q < 6; q++) {
          trees.push([i + 0.2 + rnd(seed, i, j, q * 2 + 60) * 0.6, j + 0.2 + rnd(seed, i, j, q * 2 + 61) * 0.6]);
        }
        continue;
      }
      cells.push({ i, j, k: 0 });
      const s = 0.15;
      const g = 0.05;
      const x0 = i + s;
      const y0 = j + s;
      const x1 = i + 1 - s;
      const y1 = j + 1 - s;
      const r = rnd(seed, i, j, 7);
      const lots: [number, number, number, number][] = [];
      if (r < 0.36) {
        lots.push([x0, y0, x1, y1]);
      } else if (r < 0.74) {
        const m = 0.4 + rnd(seed, i, j, 8) * 0.2;
        if (rnd(seed, i, j, 9) < 0.5) {
          const xm = x0 + (x1 - x0) * m;
          lots.push([x0, y0, xm - g / 2, y1], [xm + g / 2, y0, x1, y1]);
        } else {
          const ym = y0 + (y1 - y0) * m;
          lots.push([x0, y0, x1, ym - g / 2], [x0, ym + g / 2, x1, y1]);
        }
      } else {
        const xm = (x0 + x1) / 2;
        const ym = (y0 + y1) / 2;
        lots.push(
          [x0, y0, xm - g / 2, ym - g / 2],
          [xm + g / 2, y0, x1, ym - g / 2],
          [x0, ym + g / 2, xm - g / 2, y1],
          [xm + g / 2, ym + g / 2, x1, y1],
        );
      }
      const core = Math.exp(-((cx - dcx) ** 2 + (cy - dcy) ** 2) / 12);
      lots.forEach((l, q) => {
        const u = rnd(seed, i, j, 20 + q);
        let h = 0.1 + core * (0.32 + u * 1.05) + rnd(seed, i, j, 30 + q) * 0.12;
        if (u > 0.88 && core > 0.35) h *= 1.55;
        boxes.push({ x0: l[0], y0: l[1], x1: l[2], y1: l[3], h: Math.min(2.9, h), t: rnd(seed, i, j, 50 + q), id: id++ });
      });
    }
  }
  return { n, seed, boxes, cells, trees, lamps };
}

function proj(v: View, x: number, y: number, z: number): Pt {
  const dx = x - v.c;
  const dy = y - v.c;
  const rx = dx * v.cos - dy * v.sin;
  const ry = dx * v.sin + dy * v.cos;
  return [v.ox + (rx - ry) * v.k * 0.866, v.oy + (rx + ry) * v.k * 0.5 - z * v.k * 0.82];
}

function mixc(a: C3, b: C3, t: number): C3 {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function shade(a: C3, m: number, b: C3, t: number): C3 {
  return [Math.min(255, a[0] * m + b[0] * t), Math.min(255, a[1] * m + b[1] * t), Math.min(255, a[2] * m + b[2] * t)];
}

function rgba(c: C3, a = 1) {
  return `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${a.toFixed(3)})`;
}

function quad(ctx: CanvasRenderingContext2D, p: Pt[]) {
  ctx.moveTo(p[0][0], p[0][1]);
  for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
  ctx.closePath();
}

function hull(points: Pt[]): Pt[] {
  const p = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Pt, a: Pt, b: Pt) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: Pt[] = [];
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  const upper: Pt[] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

function parseColor(ctx: CanvasRenderingContext2D, value: string, fb: C3): C3 {
  ctx.fillStyle = "#000000";
  ctx.fillStyle = value;
  const v = String(ctx.fillStyle);
  if (v[0] === "#" && v.length === 7) {
    return [parseInt(v.slice(1, 3), 16), parseInt(v.slice(3, 5), 16), parseInt(v.slice(5, 7), 16)];
  }
  const m = v.match(/[\d.]+/g);
  return m && m.length >= 3 ? [Number(m[0]), Number(m[1]), Number(m[2])] : fb;
}

function drawScene(ctx: CanvasRenderingContext2D, w: number, h: number, city: City, v: View, nt: number, acc: C3, t: number) {
  const n = city.n;
  const P = (x: number, y: number, z = 0) => proj(v, x, y, z);
  const day = 1 - nt;
  const sun: C3 = mixc([255, 236, 210], [150, 175, 255], nt);
  const ux = SUN_X * v.cos - SUN_Y * v.sin;
  const uy = SUN_X * v.sin + SUN_Y * v.cos;

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, rgba(mixc([20, 26, 40], [5, 7, 15], nt)));
  sky.addColorStop(1, rgba(mixc([10, 12, 18], [3, 4, 9], nt)));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const ground = mixc([24, 28, 38], [10, 12, 19], nt);
  ctx.beginPath();
  quad(ctx, [P(-0.3, -0.3), P(n + 0.3, -0.3), P(n + 0.3, n + 0.3), P(-0.3, n + 0.3)]);
  ctx.fillStyle = rgba(mixc([14, 17, 24], [6, 7, 12], nt));
  ctx.fill();
  ctx.beginPath();
  quad(ctx, [P(0, 0), P(n, 0), P(n, n), P(0, n)]);
  ctx.fillStyle = rgba(ground);
  ctx.fill();

  const kinds: C3[] = [
    mixc([33, 38, 51], [13, 15, 24], nt),
    mixc([26, 52, 41], [9, 22, 19], nt),
    mixc([27, 44, 39], [11, 19, 18], nt),
  ];
  for (let kind = 0; kind < 3; kind++) {
    ctx.beginPath();
    for (const c of city.cells) {
      if (c.k !== kind) continue;
      const m = kind === 0 ? 0.1 : 0.06;
      quad(ctx, [P(c.i + m, c.j + m), P(c.i + 1 - m, c.j + m), P(c.i + 1 - m, c.j + 1 - m), P(c.i + m, c.j + 1 - m)]);
    }
    ctx.fillStyle = rgba(kinds[kind]);
    ctx.fill();
  }

  const top: Pt[] = [];
  const bot: Pt[] = [];
  for (let x = 0; x <= n + 0.001; x += 0.25) {
    const y = riverY(x, n, city.seed);
    top.push(P(x, y - RW));
    bot.push(P(x, y + RW));
  }
  ctx.beginPath();
  quad(ctx, top.concat(bot.slice().reverse()));
  ctx.fillStyle = rgba(mixc([18, 40, 70], [7, 15, 32], nt));
  ctx.fill();
  ctx.beginPath();
  top.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
  bot.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
  ctx.strokeStyle = rgba([120, 170, 255], 0.14 + nt * 0.06);
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.beginPath();
  for (let i = 1; i < n; i += 2) {
    const y = riverY(i, n, city.seed);
    quad(ctx, [P(i - 0.08, y - RW - 0.05), P(i + 0.08, y - RW - 0.05), P(i + 0.08, y + RW + 0.05), P(i - 0.08, y + RW + 0.05)]);
  }
  ctx.fillStyle = rgba(mixc(ground, [70, 76, 92], 0.2));
  ctx.fill();

  const tr = v.k * 0.08;
  ctx.beginPath();
  for (const tp of city.trees) {
    const p = P(tp[0], tp[1], 0.09);
    ctx.moveTo(p[0] + tr, p[1]);
    ctx.arc(p[0], p[1], tr, 0, Math.PI * 2);
  }
  ctx.fillStyle = rgba(mixc([46, 98, 72], [16, 36, 30], nt));
  ctx.fill();

  if (day > 0.02) {
    const len = 0.95;
    ctx.beginPath();
    for (const b of city.boxes) {
      const ox = -SUN_X * len * b.h;
      const oy = -SUN_Y * len * b.h;
      quad(
        ctx,
        hull([
          P(b.x0, b.y0),
          P(b.x1, b.y0),
          P(b.x1, b.y1),
          P(b.x0, b.y1),
          P(b.x0 + ox, b.y0 + oy),
          P(b.x1 + ox, b.y0 + oy),
          P(b.x1 + ox, b.y1 + oy),
          P(b.x0 + ox, b.y1 + oy),
        ]),
      );
    }
    ctx.fillStyle = `rgba(0,0,0,${(0.3 * day).toFixed(3)})`;
    ctx.fill();
  }

  if (nt > 0.02) {
    ctx.globalCompositeOperation = "lighter";
    const gr = Math.max(3, v.k * 0.16);
    ctx.beginPath();
    for (const l of city.lamps) {
      const p = P(l[0], l[1]);
      ctx.moveTo(p[0] + gr, p[1]);
      ctx.arc(p[0], p[1], gr, 0, Math.PI * 2);
    }
    ctx.fillStyle = `rgba(255,170,90,${(0.12 * nt).toFixed(3)})`;
    ctx.fill();
    ctx.beginPath();
    for (const l of city.lamps) {
      const p = P(l[0], l[1]);
      ctx.moveTo(p[0] + 1.1, p[1]);
      ctx.arc(p[0], p[1], 1.1, 0, Math.PI * 2);
    }
    ctx.fillStyle = `rgba(255,214,160,${(0.85 * nt).toFixed(3)})`;
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }

  const rn = NORMALS.map(([x, y]) => [x * v.cos - y * v.sin, x * v.sin + y * v.cos] as Pt);
  const vis = rn.map((p) => p[0] + p[1] > 0.001);
  const lam = rn.map((p) => Math.max(0, p[0] * ux + p[1] * uy));
  const depth = (b: Box) => {
    const dx = (b.x0 + b.x1) / 2 - v.c;
    const dy = (b.y0 + b.y1) / 2 - v.c;
    return dx * (v.cos + v.sin) + dy * (v.cos - v.sin);
  };
  const sorted = city.boxes.slice().sort((a, b) => depth(a) - depth(b));
  const topBase = mixc([48, 56, 74], [22, 26, 40], nt);
  const sideBase = mixc([27, 32, 45], [12, 15, 26], nt);
  const blink = 0.5 + 0.5 * Math.sin(t / 420);
  const winA = (0.9 * nt).toFixed(3);
  for (const b of sorted) {
    const c: Pt[] = [
      [b.x0, b.y0],
      [b.x1, b.y0],
      [b.x1, b.y1],
      [b.x0, b.y1],
    ];
    const tone = 0.86 + b.t * 0.26;
    for (let e = 0; e < 4; e++) {
      if (!vis[e]) continue;
      const p = c[e];
      const q = c[(e + 1) % 4];
      ctx.beginPath();
      quad(ctx, [P(p[0], p[1]), P(q[0], q[1]), P(q[0], q[1], b.h), P(p[0], p[1], b.h)]);
      ctx.fillStyle = rgba(shade(sideBase, tone, sun, lam[e] * (0.34 * day + 0.05 * nt)));
      ctx.fill();
      if (nt > 0.04) {
        const floors = Math.floor((b.h - 0.08) / 0.16);
        const cols = Math.max(1, Math.round(Math.hypot(q[0] - p[0], q[1] - p[1]) / 0.16));
        ctx.fillStyle = (b.id & 3) === 0 ? `rgba(170,205,255,${winA})` : `rgba(255,198,122,${winA})`;
        for (let f = 0; f < floors; f++) {
          for (let k = 0; k < cols; k++) {
            if (rnd(city.seed, b.id, e * 37 + f, k) > 0.4) continue;
            const u = (k + 0.5) / cols;
            const wp = P(p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u, 0.12 + f * 0.16);
            ctx.fillRect(wp[0] - 0.8, wp[1] - 0.7, 1.6, 1.4);
          }
        }
      }
    }
    ctx.beginPath();
    quad(ctx, c.map((p) => P(p[0], p[1], b.h)));
    ctx.fillStyle = rgba(shade(topBase, tone, sun, 0.14 * day));
    ctx.fill();
    ctx.strokeStyle = `rgba(255,255,255,${(0.05 + 0.05 * day).toFixed(3)})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
    if (b.h > 1.7) {
      const r = P((b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2, b.h + 0.06);
      ctx.beginPath();
      ctx.arc(r[0], r[1], 1.5 + blink * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = rgba(acc, 0.35 + 0.65 * blink);
      ctx.fill();
    }
  }

  const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.72);
  vg.addColorStop(0, "rgba(4,5,8,0)");
  vg.addColorStop(1, `rgba(4,5,8,${(0.45 + nt * 0.2).toFixed(3)})`);
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);
}

function subscribeMotion(cb: () => void) {
  const m = window.matchMedia(RM_QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

const css = `
.hb-ub2 {
  --hb-ub2-a: #ff4d4d;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 16 / 10;
  min-height: 180px;
  overflow: hidden;
  isolation: isolate;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: #07090d;
  color: #ededed;
  font-family: inherit;
  container-type: inline-size;
}
.hb-ub2 *, .hb-ub2 *::before, .hb-ub2 *::after { box-sizing: border-box; }
.hb-ub2-stage {
  position: absolute;
  inset: 0;
  cursor: grab;
  touch-action: pan-y;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-ub2-stage[data-drag="true"] { cursor: grabbing; }
.hb-ub2-stage:focus-visible { box-shadow: inset 0 0 0 2px var(--hb-ub2-a); border-radius: 13px; }
.hb-ub2-cv { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ub2-glass {
  position: absolute;
  background: rgba(9, 10, 13, 0.64);
  border: 1px solid rgba(255, 255, 255, 0.08);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.hb-ub2-hud {
  left: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 6px 11px 6px 6px;
  border-radius: 12px;
  pointer-events: none;
}
.hb-ub2-cmp { flex: none; width: 26px; height: 26px; color: #a1a1a1; }
.hb-ub2-tx { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.hb-ub2-tt { font-size: 12px; font-weight: 600; line-height: 1.1; white-space: nowrap; }
.hb-ub2-mc {
  font: 600 8.5px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8f8f8f;
  white-space: nowrap;
}
.hb-ub2-mc i { font-style: normal; color: var(--hb-ub2-a); }
.hb-ub2-tg {
  right: 10px;
  top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  margin: 0;
  padding: 0 11px 0 8px;
  border-radius: 999px;
  color: #ededed;
  font: inherit;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.hb-ub2-tg:hover { border-color: rgba(255, 255, 255, 0.2); }
.hb-ub2-tg:focus-visible { outline: 2px solid var(--hb-ub2-a); outline-offset: 2px; }
.hb-ub2-sw {
  position: relative;
  width: 26px;
  height: 15px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  transition: background 0.25s ease;
}
.hb-ub2-sw::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ffc27a;
  box-shadow: 0 0 8px rgba(255, 194, 122, 0.7);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s ease, box-shadow 0.25s ease;
}
.hb-ub2-tg[aria-pressed="true"] .hb-ub2-sw { background: color-mix(in srgb, var(--hb-ub2-a) 30%, rgba(255, 255, 255, 0.08)); }
.hb-ub2-tg[aria-pressed="true"] .hb-ub2-sw::after { transform: translateX(11px); background: #dfe7ff; box-shadow: 0 0 8px rgba(170, 195, 255, 0.7); }
.hb-ub2-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  font: 600 8.5px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(237, 237, 237, 0.55);
  pointer-events: none;
}
.hb-ub2-hint svg { width: 14px; height: 14px; }
@container (max-width: 300px) {
  .hb-ub2-mc { display: none; }
  .hb-ub2-tl { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ub2-sw, .hb-ub2-sw::after, .hb-ub2-tg { transition: none; }
}
`;

export function MapCityBlocks({
  accent = "#ff4d4d",
  seed = 12,
  autoRotate = true,
  night,
  defaultNight = false,
  onNightChange,
  label = "District 07",
  caption = "Live model",
  className = "",
  style,
  ...rest
}: MapCityBlocksProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const needleRef = React.useRef<SVGGElement>(null);
  const reduced = React.useSyncExternalStore(subscribeMotion, () => window.matchMedia(RM_QUERY).matches, () => false);
  const [innerNight, setInnerNight] = React.useState(defaultNight);
  const isNight = night ?? innerNight;
  const city = React.useMemo(() => buildCity(GRID, seed), [seed]);
  const st = React.useRef({ night: isNight, accent, auto: autoRotate, reduced: false, kick: () => {} });

  React.useEffect(() => {
    const s = st.current;
    s.night = isNight;
    s.accent = accent;
    s.auto = autoRotate;
    s.reduced = reduced;
    s.kick();
  }, [isNight, accent, autoRotate, reduced]);

  React.useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !stage || !canvas || !ctx) return;
    const s = st.current;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let view: View | null = null;
    let angle = 0.62;
    let vel = 0;
    let nm = s.night ? 1 : 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    let dragging = false;
    let lastX = 0;
    let lastT = 0;
    let idleAt = 0;
    let deg = -1;
    let rgb: C3 = [255, 77, 77];
    let rgbFor = "";

    const fit = () => {
      const n = city.n;
      const k = Math.min(w / (1.732 * n), (h - 16) / (n + 2.6)) * 1.12;
      view = { k, ox: w / 2, oy: h / 2 + k * 0.75, c: n / 2, cos: Math.cos(angle), sin: Math.sin(angle) };
    };

    const draw = (t = performance.now()) => {
      if (!view) return;
      if (rgbFor !== s.accent) {
        rgb = parseColor(ctx, s.accent, [255, 77, 77]);
        rgbFor = s.accent;
      }
      view.cos = Math.cos(angle);
      view.sin = Math.sin(angle);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawScene(ctx, w, h, city, view, nm, rgb, s.reduced ? 0 : t);
      const d = Math.round((((angle * 180) / Math.PI) % 360 + 360) % 360);
      if (d !== deg) {
        deg = d;
        stage.setAttribute("aria-valuenow", String(d));
        stage.setAttribute("aria-valuetext", `${d} degrees`);
        needleRef.current?.setAttribute("transform", `rotate(${(-d - 45).toFixed(1)} 13 13)`);
      }
    };

    const frame = (t: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      const target = s.night ? 1 : 0;
      if (s.reduced) {
        nm = target;
      } else {
        nm += (target - nm) * (1 - Math.exp(-dt * 5));
        if (Math.abs(target - nm) < 0.002) nm = target;
      }
      if (!dragging) {
        if (!s.reduced && s.auto && t - idleAt > 1400) vel += (0.14 - vel) * (1 - Math.exp(-dt * 1.2));
        else vel *= Math.exp(-dt * (s.reduced ? 30 : 2.6));
        angle += vel * dt;
      }
      draw(t);
      const busy = dragging || Math.abs(vel) > 0.002 || nm !== target;
      if (visible && (!s.reduced || busy)) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const kick = () => {
      if (!visible) return;
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    s.kick = kick;

    const resize = () => {
      const r = root.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      w = r.width;
      h = r.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      fit();
      draw();
    };

    const down = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      dragging = true;
      lastX = e.clientX;
      lastT = e.timeStamp;
      vel = 0;
      stage.setPointerCapture(e.pointerId);
      stage.dataset.drag = "true";
      kick();
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dt = Math.max(1, e.timeStamp - lastT) / 1000;
      const da = dx * (Math.PI / Math.max(240, w));
      angle += da;
      vel = vel * 0.6 + (da / dt) * 0.4;
      lastX = e.clientX;
      lastT = e.timeStamp;
      draw();
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      idleAt = e.timeStamp || performance.now();
      if (e.timeStamp - lastT > 80) vel = 0;
      vel = Math.max(-4, Math.min(4, vel));
      if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
      stage.dataset.drag = "false";
      kick();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      idleAt = performance.now();
      const dir = e.key === "ArrowLeft" ? -1 : 1;
      if (s.reduced) {
        angle += dir * 0.2;
        draw();
      } else {
        vel = dir * 1.6;
        kick();
      }
    };

    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    stage.addEventListener("keydown", key);
    s.reduced = window.matchMedia(RM_QUERY).matches;
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(root);
    kick();
    return () => {
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
      stage.removeEventListener("keydown", key);
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
      s.kick = () => {};
    };
  }, [city]);

  const toggle = () => {
    const next = !isNight;
    if (night === undefined) setInnerNight(next);
    onNightChange?.(next);
  };

  return (
    <div
      ref={rootRef}
      className={`hb-ub2 ${className}`.trim()}
      style={{ "--hb-ub2-a": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-map-city-blocks" precedence="default">
        {css}
      </style>
      <div
        ref={stageRef}
        className="hb-ub2-stage"
        role="slider"
        tabIndex={0}
        aria-label={`${label} 3D model rotation`}
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={36}
        aria-valuetext="36 degrees"
        data-drag="false"
      >
        <canvas ref={canvasRef} className="hb-ub2-cv" aria-hidden="true" />
      </div>
      <div className="hb-ub2-glass hb-ub2-hud">
        <svg className="hb-ub2-cmp" viewBox="0 0 26 26" aria-hidden="true">
          <circle cx="13" cy="13" r="12" fill="none" stroke="currentColor" strokeOpacity="0.35" />
          <g ref={needleRef} transform="rotate(-81 13 13)">
            <path d="M13 3.5 15.4 13h-4.8Z" fill="var(--hb-ub2-a)" />
            <path d="M13 22.5 10.6 13h4.8Z" fill="currentColor" fillOpacity="0.55" />
          </g>
        </svg>
        <div className="hb-ub2-tx">
          <span className="hb-ub2-tt">{label}</span>
          <span className="hb-ub2-mc">
            <i>●</i> {caption} · {city.boxes.length} bldg
          </span>
        </div>
      </div>
      <button type="button" className="hb-ub2-glass hb-ub2-tg" aria-pressed={isNight} aria-label="Night mode" onClick={toggle}>
        <span className="hb-ub2-sw" aria-hidden="true" />
        <span className="hb-ub2-tl">{isNight ? "Night" : "Day"}</span>
      </button>
      <div className="hb-ub2-hint" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 4 0 0 0 18 0" />
          <path d="m17.5 15.2 3.5-3.2 1 4.5" />
        </svg>
        Drag to rotate
      </div>
    </div>
  );
}
