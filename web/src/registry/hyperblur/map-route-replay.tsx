"use client";

import * as React from "react";

export interface MapRouteReplayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onProgress" | "children"> {
  accent?: string;
  routeSeed?: number;
  distanceKm?: number;
  durationSec?: number;
  autoplay?: boolean;
  loop?: boolean;
  paceSecPerKm?: number;
  hour?: number;
  defaultHour?: number;
  onHourChange?: (hour: number) => void;
  onProgress?: (progress: number, km: number) => void;
  label?: string;
}

type Pt = [number, number];
type C3 = [number, number, number];
type Box = { x0: number; y0: number; x1: number; y1: number; h: number; t: number; id: number };
type Cell = { i: number; j: number; k: number };
type City = { n: number; seed: number; boxes: Box[]; cells: Cell[]; trees: Pt[]; ave: [Pt, Pt] };
type View = { k: number; ox: number; oy: number; c: number; cos: number; sin: number; zs: number };
type Light = { ux: number; uy: number; el: number; night: number; warm: number };

const GRID = 14;
const ANGLE = 0.52;
const RW = 0.42;
const SAMPLES = 720;
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const NORMALS: Pt[] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
const DIRS: Pt[] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
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
  return n * 0.72 + Math.sin(x * 0.42 + seed * 0.7) * 1.25 + Math.sin(x * 0.93 + seed) * 0.32;
}

function buildCity(n: number, seed: number): City {
  const boxes: Box[] = [];
  const cells: Cell[] = [];
  const trees: Pt[] = [];
  const pi = 2 + Math.floor(rnd(seed, 1) * 3);
  const pj = 2 + Math.floor(rnd(seed, 2) * 2);
  const a: Pt = [0, n * (0.1 + rnd(seed, 3) * 0.08)];
  const b: Pt = [n, n * (0.4 + rnd(seed, 4) * 0.1)];
  const ax = b[0] - a[0];
  const ay = b[1] - a[1];
  const al = Math.hypot(ax, ay);
  const dcx = n * 0.56;
  const dcy = n * 0.42;
  let id = 0;
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const cx = i + 0.5;
      const cy = j + 0.5;
      const dr = Math.abs(cy - riverY(cx, n, seed));
      if (dr < RW + 0.08) continue;
      if (dr < 0.95) {
        cells.push({ i, j, k: 2 });
        for (let q = 0; q < 3; q++) {
          const tx = i + 0.2 + rnd(seed, i, j, q * 2 + 40) * 0.6;
          const ty = j + 0.2 + rnd(seed, i, j, q * 2 + 41) * 0.6;
          if (Math.abs(ty - riverY(tx, n, seed)) > RW + 0.14) trees.push([tx, ty]);
        }
        continue;
      }
      if (i >= pi && i < pi + 3 && j >= pj && j < pj + 2) {
        cells.push({ i, j, k: 1 });
        for (let q = 0; q < 6; q++) {
          trees.push([i + 0.2 + rnd(seed, i, j, q * 2 + 60) * 0.6, j + 0.2 + rnd(seed, i, j, q * 2 + 61) * 0.6]);
        }
        continue;
      }
      const da = Math.abs((cx - a[0]) * ay - (cy - a[1]) * ax) / al;
      if (da < 0.66) {
        cells.push({ i, j, k: 3 });
        if (rnd(seed, i, j, 70) < 0.6) trees.push([cx + (rnd(seed, i, j, 71) - 0.5) * 0.5, cy + (rnd(seed, i, j, 72) - 0.5) * 0.5]);
        continue;
      }
      cells.push({ i, j, k: 0 });
      const s = 0.16;
      const g = 0.05;
      const x0 = i + s;
      const y0 = j + s;
      const x1 = i + 1 - s;
      const y1 = j + 1 - s;
      const r = rnd(seed, i, j, 7);
      const lots: [number, number, number, number][] = [];
      if (r < 0.34) {
        lots.push([x0, y0, x1, y1]);
      } else if (r < 0.72) {
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
      const core = Math.exp(-((cx - dcx) ** 2 + (cy - dcy) ** 2) / 16);
      lots.forEach((l, q) => {
        const u = rnd(seed, i, j, 20 + q);
        let h = 0.08 + core * (0.3 + u * 1.05) + rnd(seed, i, j, 30 + q) * 0.12;
        if (u > 0.9 && core > 0.4) h *= 1.5;
        boxes.push({ x0: l[0], y0: l[1], x1: l[2], y1: l[3], h: Math.min(2.6, h), t: rnd(seed, i, j, 50 + q), id: id++ });
      });
    }
  }
  return { n, seed, boxes, cells, trees, ave: [a, b] };
}

function buildRoute(seed: number, n: number): Pt[] {
  const lo = 4;
  const hi = n - 4;
  const wet = (x: number, y: number) => Math.abs(y - riverY(x, n, seed)) < RW + 0.1;
  for (let attempt = 0; attempt < 40; attempt++) {
    const sx = lo + Math.floor(rnd(seed, 11, attempt) * (hi - lo + 1));
    const sy = lo + Math.floor(rnd(seed, 12, attempt) * (hi - lo + 1));
    if (wet(sx, sy)) continue;
    const pts: Pt[] = [[sx, sy]];
    const seen = new Set<number>([sx * 100 + sy]);
    let dir = Math.floor(rnd(seed, 13, attempt) * 4);
    let total = 0;
    for (let step = 0; step < 48 && total < 20; step++) {
      const r = rnd(seed, step, attempt, 5);
      const order = r < 0.4 ? [0, 1, 3] : r < 0.7 ? [1, 0, 3] : [3, 0, 1];
      const len = 1 + Math.floor(rnd(seed, step, attempt, 6) * 3);
      let moved = 0;
      for (const o of order) {
        const d = (dir + o) % 4;
        const [dx, dy] = DIRS[d];
        let [cx, cy] = pts[pts.length - 1];
        let count = 0;
        for (let q = 0; q < len; q++) {
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < lo || nx > hi || ny < lo || ny > hi) break;
          if (seen.has(nx * 100 + ny) || wet(nx, ny)) break;
          if (dy === 0 && wet(cx + dx / 2, cy)) break;
          seen.add(nx * 100 + ny);
          pts.push([nx, ny]);
          cx = nx;
          cy = ny;
          count++;
        }
        if (count > 0) {
          moved = count;
          dir = d;
          break;
        }
      }
      if (!moved) break;
      total += moved;
    }
    if (total >= 14) {
      const out: Pt[] = [pts[0]];
      for (let q = 1; q < pts.length - 1; q++) {
        const p = out[out.length - 1];
        const c = pts[q];
        const nx = pts[q + 1];
        const straight = (c[0] - p[0]) * (nx[1] - c[1]) - (c[1] - p[1]) * (nx[0] - c[0]) === 0;
        if (!straight) out.push(c);
      }
      out.push(pts[pts.length - 1]);
      return out;
    }
  }
  return [
    [lo, lo],
    [hi, lo],
    [hi, lo + 2],
    [lo + 1, lo + 2],
    [lo + 1, hi - 1],
    [hi, hi - 1],
  ];
}

function sampleRoute(pts: Pt[], count: number): Pt[] {
  const dense: Pt[] = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const a = pts[i - 1];
    const p = pts[i];
    const b = pts[i + 1];
    const la = Math.hypot(p[0] - a[0], p[1] - a[1]);
    const lb = Math.hypot(b[0] - p[0], b[1] - p[1]);
    const ra = Math.min(0.3, la / 2);
    const rb = Math.min(0.3, lb / 2);
    const p1: Pt = [p[0] - ((p[0] - a[0]) / la) * ra, p[1] - ((p[1] - a[1]) / la) * ra];
    const p2: Pt = [p[0] + ((b[0] - p[0]) / lb) * rb, p[1] + ((b[1] - p[1]) / lb) * rb];
    for (let q = 0; q <= 8; q++) {
      const t = q / 8;
      const u = 1 - t;
      dense.push([u * u * p1[0] + 2 * u * t * p[0] + t * t * p2[0], u * u * p1[1] + 2 * u * t * p[1] + t * t * p2[1]]);
    }
  }
  dense.push(pts[pts.length - 1]);
  const acc = [0];
  for (let i = 1; i < dense.length; i++) {
    acc.push(acc[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]));
  }
  const total = acc[acc.length - 1];
  const out: Pt[] = [];
  let seg = 1;
  for (let q = 0; q < count; q++) {
    const d = (q / (count - 1)) * total;
    while (seg < dense.length - 1 && acc[seg] < d) seg++;
    const span = acc[seg] - acc[seg - 1] || 1;
    const t = Math.min(1, Math.max(0, (d - acc[seg - 1]) / span));
    out.push([
      dense[seg - 1][0] + (dense[seg][0] - dense[seg - 1][0]) * t,
      dense[seg - 1][1] + (dense[seg][1] - dense[seg - 1][1]) * t,
    ]);
  }
  return out;
}

function proj(v: View, x: number, y: number, z: number): Pt {
  const dx = x - v.c;
  const dy = y - v.c;
  const rx = dx * v.cos - dy * v.sin;
  const ry = dx * v.sin + dy * v.cos;
  return [v.ox + (rx - ry) * v.k * 0.866, v.oy + (rx + ry) * v.k * 0.5 - z * v.k * 0.82 * v.zs];
}

function lightAt(hour: number): Light {
  const t = Math.min(1, Math.max(0, (hour - 6) / 12));
  const phi = -Math.PI / 4 + t * Math.PI;
  return {
    ux: Math.cos(phi),
    uy: Math.sin(phi),
    el: Math.sin(Math.PI * t) * 1.05,
    night: Math.min(1, Math.max(0, (6.7 - hour) / 0.9, (hour - 18.4) / 0.9)),
    warm: Math.min(1, Math.max(0, 1 - Math.abs(hour - 7) / 1.7, 1 - Math.abs(hour - 17.7) / 1.9)),
  };
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

function drawLayer(g: CanvasRenderingContext2D, bl: CanvasRenderingContext2D, w: number, h: number, city: City, v: View, L: Light, acc: C3) {
  let ctx = g;
  const n = city.n;
  const P = (x: number, y: number, z = 0) => proj(v, x, y, z);
  const nt = L.night;
  const day = 1 - nt;
  const wm = L.warm * day;
  const sun = mixc([255, 238, 214], [255, 138, 78], wm);

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, rgba(mixc(mixc([15, 20, 32], [38, 20, 30], wm), [5, 7, 14], nt)));
  sky.addColorStop(1, rgba(mixc(mixc([8, 10, 16], [22, 12, 15], wm), [3, 4, 8], nt)));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const ground = mixc(mixc([17, 20, 29], [26, 20, 25], wm * 0.6), [9, 11, 18], nt);
  ctx.beginPath();
  quad(ctx, [P(0, 0), P(n, 0), P(n, n), P(0, n)]);
  ctx.fillStyle = rgba(ground);
  ctx.fill();

  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const a = P(i, 0);
    const b = P(i, n);
    const c = P(0, i);
    const d = P(n, i);
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.moveTo(c[0], c[1]);
    ctx.lineTo(d[0], d[1]);
  }
  ctx.strokeStyle = "rgba(255,255,255,0.035)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const kinds: C3[] = [
    mixc([25, 29, 40], [12, 14, 22], nt),
    mixc([20, 41, 33], [9, 21, 18], nt),
    mixc([20, 34, 30], [10, 18, 17], nt),
    mixc([23, 26, 35], [11, 13, 20], nt),
  ];
  for (let kind = 0; kind < 4; kind++) {
    ctx.beginPath();
    for (const c of city.cells) {
      if (c.k !== kind) continue;
      const m = kind === 0 ? 0.1 : 0.06;
      quad(ctx, [P(c.i + m, c.j + m), P(c.i + 1 - m, c.j + m), P(c.i + 1 - m, c.j + 1 - m), P(c.i + m, c.j + 1 - m)]);
    }
    ctx.fillStyle = rgba(kinds[kind]);
    ctx.fill();
  }

  const [aa, ab] = city.ave;
  const al = Math.hypot(ab[0] - aa[0], ab[1] - aa[1]);
  const nx = (-(ab[1] - aa[1]) / al) * 0.17;
  const ny = ((ab[0] - aa[0]) / al) * 0.17;
  ctx.beginPath();
  quad(ctx, [P(aa[0] + nx, aa[1] + ny), P(ab[0] + nx, ab[1] + ny), P(ab[0] - nx, ab[1] - ny), P(aa[0] - nx, aa[1] - ny)]);
  ctx.fillStyle = rgba(ground);
  ctx.fill();
  ctx.beginPath();
  const s0 = P(aa[0], aa[1]);
  const s1 = P(ab[0], ab[1]);
  ctx.moveTo(s0[0], s0[1]);
  ctx.lineTo(s1[0], s1[1]);
  ctx.setLineDash([4, 5]);
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.stroke();
  ctx.setLineDash([]);

  const water = mixc(mixc([13, 31, 56], [30, 30, 52], wm * 0.5), [7, 15, 31], nt);
  const top: Pt[] = [];
  const bot: Pt[] = [];
  for (let x = 0; x <= n + 0.001; x += 0.25) {
    const y = riverY(x, n, city.seed);
    top.push(P(x, y - RW));
    bot.push(P(x, y + RW));
  }
  ctx.beginPath();
  quad(ctx, top.concat(bot.reverse()));
  ctx.fillStyle = rgba(water);
  ctx.fill();
  ctx.beginPath();
  top.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
  bot.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
  ctx.strokeStyle = rgba(mixc([110, 160, 255], sun, wm * 0.5), 0.16);
  ctx.stroke();
  ctx.beginPath();
  for (let i = 1; i < n; i++) {
    const y = riverY(i, n, city.seed);
    quad(ctx, [P(i - 0.09, y - RW - 0.06), P(i + 0.09, y - RW - 0.06), P(i + 0.09, y + RW + 0.06), P(i - 0.09, y + RW + 0.06)]);
  }
  ctx.fillStyle = rgba(mixc(ground, [60, 66, 80], 0.25));
  ctx.fill();

  const tr = v.k * 0.075;
  ctx.beginPath();
  for (const t of city.trees) {
    const p = P(t[0] + 0.04, t[1] + 0.04);
    ctx.moveTo(p[0] + tr, p[1]);
    ctx.arc(p[0], p[1], tr, 0, Math.PI * 2);
  }
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fill();
  ctx.beginPath();
  for (const t of city.trees) {
    const p = P(t[0], t[1], 0.08);
    ctx.moveTo(p[0] + tr, p[1]);
    ctx.arc(p[0], p[1], tr, 0, Math.PI * 2);
  }
  ctx.fillStyle = rgba(shade(mixc([38, 84, 62], [17, 38, 31], nt), 1, sun, 0.06 * day));
  ctx.fill();

  const wx = L.ux * v.cos + L.uy * v.sin;
  const wy = -L.ux * v.sin + L.uy * v.cos;
  if (day > 0.02) {
    ctx.beginPath();
    for (const b of city.boxes) {
      const len = Math.min(3.2, b.h / Math.tan(Math.max(0.16, L.el)));
      const ox = -wx * len;
      const oy = -wy * len;
      const hp = hull([
        P(b.x0, b.y0),
        P(b.x1, b.y0),
        P(b.x1, b.y1),
        P(b.x0, b.y1),
        P(b.x0 + ox, b.y0 + oy),
        P(b.x1 + ox, b.y0 + oy),
        P(b.x1 + ox, b.y1 + oy),
        P(b.x0 + ox, b.y1 + oy),
      ]);
      quad(ctx, hp);
    }
    ctx.fillStyle = `rgba(0,0,0,${(0.34 * day).toFixed(3)})`;
    ctx.fill();
  }

  ctx = bl;
  const rn = NORMALS.map(([x, y]) => [x * v.cos - y * v.sin, x * v.sin + y * v.cos] as Pt);
  const vis = rn.map((p) => p[0] + p[1] > 0.001);
  const lam = rn.map((p) => Math.max(0, p[0] * L.ux + p[1] * L.uy));
  const depth = (b: Box) => {
    const dx = (b.x0 + b.x1) / 2 - v.c;
    const dy = (b.y0 + b.y1) / 2 - v.c;
    return dx * v.cos - dy * v.sin + dx * v.sin + dy * v.cos;
  };
  const sorted = city.boxes.slice().sort((a, b) => depth(a) - depth(b));
  const topBase = mixc([44, 51, 68], [20, 24, 37], nt);
  const sideBase = mixc([28, 33, 46], [12, 15, 25], nt);
  const sunTop = 0.06 + Math.sin(L.el) * 0.16;
  for (const b of sorted) {
    const c: Pt[] = [
      [b.x0, b.y0],
      [b.x1, b.y0],
      [b.x1, b.y1],
      [b.x0, b.y1],
    ];
    const tone = 0.88 + b.t * 0.24;
    for (let e = 0; e < 4; e++) {
      if (!vis[e]) continue;
      const p = c[e];
      const q = c[(e + 1) % 4];
      ctx.beginPath();
      quad(ctx, [P(p[0], p[1]), P(q[0], q[1]), P(q[0], q[1], b.h), P(p[0], p[1], b.h)]);
      ctx.fillStyle = rgba(shade(sideBase, tone * (e % 2 ? 0.92 : 1.05), sun, lam[e] * 0.36 * day));
      ctx.fill();
      if (nt > 0.05) {
        const floors = Math.floor((b.h - 0.08) / 0.14);
        const cols = Math.max(1, Math.round(Math.hypot(q[0] - p[0], q[1] - p[1]) / 0.12));
        ctx.fillStyle = `rgba(255,196,120,${(0.85 * nt).toFixed(3)})`;
        for (let f = 0; f < floors; f++) {
          for (let k = 0; k < cols; k++) {
            if (rnd(city.seed, b.id, e * 37 + f, k) > 0.34) continue;
            const u = (k + 0.5) / cols;
            const w0 = P(p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u, 0.12 + f * 0.14);
            ctx.fillRect(w0[0] - 0.7, w0[1] - 0.6, 1.4, 1.2);
          }
        }
      }
    }
    ctx.beginPath();
    quad(ctx, c.map((p) => P(p[0], p[1], b.h)));
    ctx.fillStyle = rgba(shade(topBase, tone, sun, sunTop * day));
    ctx.fill();
    ctx.strokeStyle = `rgba(255,255,255,${(0.05 + 0.04 * day).toFixed(3)})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
    if (b.h > 1.5 && nt > 0.3) {
      const r = P((b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2, b.h + 0.05);
      ctx.beginPath();
      ctx.arc(r[0], r[1], 1.4, 0, Math.PI * 2);
      ctx.fillStyle = rgba(acc, nt);
      ctx.fill();
    }
  }

  const gx = L.ux - L.uy;
  const gy = L.ux + L.uy;
  const gl = Math.hypot(gx, gy) || 1;
  const glow = ctx.createRadialGradient(w / 2 + (gx / gl) * w * 0.55, h / 2 + (gy / gl) * h * 0.75, 0, w / 2 + (gx / gl) * w * 0.55, h / 2 + (gy / gl) * h * 0.75, Math.max(w, h) * 0.7);
  glow.addColorStop(0, rgba(sun, 0.1 * day + 0.08 * wm));
  glow.addColorStop(1, rgba(sun, 0));
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
  if (nt > 0) {
    const moon = ctx.createRadialGradient(w * 0.15, -h * 0.1, 0, w * 0.15, -h * 0.1, Math.max(w, h) * 0.8);
    moon.addColorStop(0, `rgba(90,120,200,${(0.1 * nt).toFixed(3)})`);
    moon.addColorStop(1, "rgba(90,120,200,0)");
    ctx.fillStyle = moon;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.globalCompositeOperation = "source-over";
  const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
  vg.addColorStop(0, "rgba(4,5,8,0)");
  vg.addColorStop(1, "rgba(4,5,8,0.6)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);
}

function fitView(route: Pt[], w: number, h: number, n: number): View {
  const base: View = { k: 1, ox: 0, oy: 0, c: n / 2, cos: Math.cos(ANGLE), sin: Math.sin(ANGLE), zs: h < 260 ? 0.62 : 1 };
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < route.length; i += 8) {
    const p = proj(base, route[i][0], route[i][1], 0);
    minX = Math.min(minX, p[0]);
    maxX = Math.max(maxX, p[0]);
    minY = Math.min(minY, p[1]);
    maxY = Math.max(maxY, p[1]);
  }
  minY -= 0.9;
  const padX = Math.min(40, w * 0.08);
  const top = h < 260 ? 40 : 64;
  const bottom = h < 260 ? 44 : 64;
  const k = Math.max(8, Math.min((w - padX * 2) / (maxX - minX), (h - top - bottom) / (maxY - minY), Math.min(w, h) / 4.5));
  return {
    ...base,
    k,
    ox: padX + (w - padX * 2 - (maxX - minX) * k) / 2 - minX * k,
    oy: top + (h - top - bottom - (maxY - minY) * k) / 2 - minY * k,
  };
}

function easeBack(x: number) {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
}

function clock(sec: number) {
  const s = Math.max(0, Math.round(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  const mm = String(m).padStart(h ? 2 : 1, "0");
  return `${h ? `${h}:` : ""}${mm}:${String(r).padStart(2, "0")}`;
}

function fmtHour(hour: number) {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function subscribeMotion(cb: () => void) {
  const m = window.matchMedia(RM_QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

const css = `
.hb-ub1 {
  --hb-ub1-a: #ff4d4d;
  --hb-ub1-p: 0%;
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
.hb-ub1 *, .hb-ub1 *::before, .hb-ub1 *::after { box-sizing: border-box; }
.hb-ub1-cv { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-ub1-glass {
  position: absolute;
  background: rgba(9, 10, 13, 0.66);
  border: 1px solid rgba(255, 255, 255, 0.08);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.hb-ub1-hud {
  left: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 7px 11px 8px;
  border-radius: 10px;
  pointer-events: none;
}
.hb-ub1-k {
  display: flex;
  align-items: center;
  gap: 6px;
  font: 600 9px/1 ${MONO};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8f8f8f;
}
.hb-ub1-k::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-ub1-a);
  box-shadow: 0 0 8px var(--hb-ub1-a);
}
.hb-ub1-km { display: flex; align-items: baseline; gap: 4px; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-ub1-km b { font-size: 19px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; }
.hb-ub1-km span, .hb-ub1-sub { font-size: 10.5px; color: #a1a1a1; white-space: nowrap; font-variant-numeric: tabular-nums; }
.hb-ub1-sun {
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  gap: 7px;
  height: 30px;
  padding: 0 10px;
  border-radius: 999px;
}
.hb-ub1-sun svg { flex: none; width: 14px; height: 14px; color: #ffc27a; }
.hb-ub1-sun[data-night="true"] svg { color: #a9c2ff; }
.hb-ub1-hr { min-width: 34px; font: 500 10px/1 ${MONO}; color: #ededed; text-align: right; font-variant-numeric: tabular-nums; }
.hb-ub1-bar {
  left: 10px;
  right: 10px;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 38px;
  padding: 0 12px 0 5px;
  border-radius: 999px;
}
.hb-ub1-play {
  flex: none;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #ededed;
  color: #0a0a0a;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
}
.hb-ub1-play:hover { transform: scale(1.07); background: #fff; }
.hb-ub1-play:active { transform: scale(0.95); }
.hb-ub1-play svg { width: 12px; height: 12px; }
.hb-ub1-range {
  --hb-ub1-f: 0%;
  --hb-ub1-tc: var(--hb-ub1-a);
  -webkit-appearance: none;
  appearance: none;
  min-width: 0;
  height: 18px;
  margin: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
}
.hb-ub1-scrub { flex: 1; --hb-ub1-f: var(--hb-ub1-p); }
.hb-ub1-hour { width: 64px; --hb-ub1-tc: #ffc27a; }
.hb-ub1-range::-webkit-slider-runnable-track {
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--hb-ub1-tc) var(--hb-ub1-f), rgba(255, 255, 255, 0.16) var(--hb-ub1-f));
}
.hb-ub1-range::-moz-range-track {
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--hb-ub1-tc) var(--hb-ub1-f), rgba(255, 255, 255, 0.16) var(--hb-ub1-f));
}
.hb-ub1-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  margin-top: -4.5px;
  border: 2px solid var(--hb-ub1-tc);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ub1-tc) 26%, transparent);
  transition: transform 0.15s ease;
}
.hb-ub1-range::-moz-range-thumb {
  width: 8px;
  height: 8px;
  border: 2px solid var(--hb-ub1-tc);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ub1-tc) 26%, transparent);
}
.hb-ub1-range:active::-webkit-slider-thumb { transform: scale(1.2); }
.hb-ub1-play:focus-visible, .hb-ub1-range:focus-visible { outline: 2px solid var(--hb-ub1-a); outline-offset: 3px; border-radius: 999px; }
.hb-ub1-pct { flex: none; min-width: 30px; font: 500 10px/1 ${MONO}; color: #a1a1a1; text-align: right; font-variant-numeric: tabular-nums; }
@container (max-width: 400px) {
  .hb-ub1-km b { font-size: 16px; }
  .hb-ub1-hour { width: 50px; }
  .hb-ub1-pct { display: none; }
  .hb-ub1-bar { height: 34px; }
  .hb-ub1-play { width: 24px; height: 24px; }
}
@container (max-width: 300px) {
  .hb-ub1-sub { display: none; }
  .hb-ub1-hr { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ub1-play, .hb-ub1-range::-webkit-slider-thumb { transition: none; }
}
`;

type Api = { draw: () => void; relayer: () => void; kick: () => void; seek: (p: number) => void; progress: () => number };

export function MapRouteReplay({
  accent = "#ff4d4d",
  routeSeed = 7,
  distanceKm = 8,
  durationSec = 18,
  autoplay = true,
  loop = true,
  paceSecPerKm = 312,
  hour,
  defaultHour = 17.5,
  onHourChange,
  onProgress,
  label = "Route replay",
  className = "",
  style,
  ...rest
}: MapRouteReplayProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const scrubRef = React.useRef<HTMLInputElement>(null);
  const kmRef = React.useRef<HTMLElement>(null);
  const timeRef = React.useRef<HTMLSpanElement>(null);
  const pctRef = React.useRef<HTMLSpanElement>(null);
  const api = React.useRef<Api | null>(null);
  const reduced = React.useSyncExternalStore(subscribeMotion, () => window.matchMedia(RM_QUERY).matches, () => false);
  const [innerHour, setInnerHour] = React.useState(defaultHour);
  const [playState, setPlayState] = React.useState<boolean | null>(null);
  const hr = Math.min(21, Math.max(5, hour ?? innerHour));
  const playing = playState ?? (autoplay && !reduced);
  const st = React.useRef({
    progress: 0,
    playing: false,
    hour: hr,
    accent,
    duration: durationSec,
    loop,
    pace: paceSecPerKm,
    reduced: false,
    scrubbing: false,
    onProgress,
  });

  React.useEffect(() => {
    const s = st.current;
    s.accent = accent;
    s.duration = durationSec;
    s.loop = loop;
    s.pace = paceSecPerKm;
    s.onProgress = onProgress;
    api.current?.draw();
  }, [accent, durationSec, loop, paceSecPerKm, onProgress]);

  React.useEffect(() => {
    st.current.hour = hr;
    api.current?.relayer();
  }, [hr]);

  React.useEffect(() => {
    const s = st.current;
    s.reduced = reduced;
    if (reduced && s.progress === 0 && !s.playing) api.current?.seek(1);
  }, [reduced]);

  React.useEffect(() => {
    st.current.playing = playing;
    api.current?.kick();
  }, [playing]);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const s = st.current;
    const city = buildCity(GRID, routeSeed);
    const route = sampleRoute(buildRoute(routeSeed, GRID), SAMPLES);
    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d");
    const blds = document.createElement("canvas");
    const bctx = blds.getContext("2d");
    if (!lctx || !bctx) return;
    const dist = Math.max(0.5, distanceKm);
    const passed: number[] = new Array(Math.max(0, Math.ceil(dist) - 1)).fill(-1);
    const scr = new Float32Array(route.length * 2);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let view: View | null = null;
    let raf = 0;
    let last = 0;
    let hold = 0;
    let visible = true;
    let rgb: C3 = [255, 77, 77];
    let rgbFor = "";

    const report = () => {
      const p = s.progress;
      const km = p * dist;
      const now = performance.now();
      for (let k = 0; k < passed.length; k++) {
        const f = (k + 1) / dist;
        if (p >= f && passed[k] < 0) passed[k] = now;
        else if (p < f) passed[k] = -1;
      }
      if (kmRef.current) kmRef.current.textContent = km.toFixed(2);
      if (timeRef.current) timeRef.current.textContent = clock(km * s.pace);
      if (pctRef.current) pctRef.current.textContent = `${Math.round(p * 100)}%`;
      const sc = scrubRef.current;
      if (sc) {
        if (!s.scrubbing) sc.value = String(Math.round(p * 1000));
        sc.setAttribute("aria-valuetext", `${km.toFixed(2)} of ${dist.toFixed(2)} km`);
      }
      root.style.setProperty("--hb-ub1-p", `${(p * 100).toFixed(2)}%`);
      s.onProgress?.(p, km);
    };

    const relayer = () => {
      if (!view) return;
      if (rgbFor !== s.accent) {
        rgb = parseColor(lctx, s.accent, [255, 77, 77]);
        rgbFor = s.accent;
      }
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.clearRect(0, 0, w, h);
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, w, h);
      drawLayer(lctx, bctx, w, h, city, view, lightAt(s.hour), rgb);
    };

    const draw = (t = performance.now()) => {
      if (!view) return;
      if (rgbFor !== s.accent) relayer();
      const A = (a: number) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a.toFixed(3)})`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(layer, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const M = route.length;
      const f = s.progress * (M - 1);
      const i0 = Math.min(M - 1, Math.floor(f));
      const fr = f - i0;
      const hx = i0 < M - 1 ? scr[i0 * 2] + (scr[i0 * 2 + 2] - scr[i0 * 2]) * fr : scr[i0 * 2];
      const hy = i0 < M - 1 ? scr[i0 * 2 + 1] + (scr[i0 * 2 + 3] - scr[i0 * 2 + 1]) * fr : scr[i0 * 2 + 1];
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const routePass = () => {
        if (i0 < M - 1) {
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          for (let i = i0 + 1; i < M; i++) ctx.lineTo(scr[i * 2], scr[i * 2 + 1]);
          ctx.setLineDash([1.5, 4]);
          ctx.strokeStyle = "rgba(237,237,237,0.5)";
          ctx.lineWidth = 1.4;
          ctx.stroke();
          ctx.setLineDash([]);
        }
  
        if (f > 0) {
          ctx.beginPath();
          ctx.moveTo(scr[0], scr[1]);
          for (let i = 1; i <= i0; i++) ctx.lineTo(scr[i * 2], scr[i * 2 + 1]);
          ctx.lineTo(hx, hy);
          ctx.strokeStyle = A(0.32);
          ctx.lineWidth = 2;
          ctx.stroke();
          const tail = Math.round(M * 0.16);
          const from = Math.max(0, i0 - tail);
          ctx.globalCompositeOperation = "lighter";
          ctx.beginPath();
          ctx.moveTo(scr[from * 2], scr[from * 2 + 1]);
          for (let i = from + 1; i <= i0; i++) ctx.lineTo(scr[i * 2], scr[i * 2 + 1]);
          ctx.lineTo(hx, hy);
          ctx.strokeStyle = A(0.18);
          ctx.lineWidth = 7;
          ctx.stroke();
          ctx.globalCompositeOperation = "source-over";
          for (let j = from; j <= i0; j += 6) {
            const e = Math.min(i0, j + 6);
            const q = Math.max(0, (j - (i0 - tail)) / tail);
            ctx.beginPath();
            ctx.moveTo(scr[j * 2], scr[j * 2 + 1]);
            for (let m = j + 1; m <= e; m++) ctx.lineTo(scr[m * 2], scr[m * 2 + 1]);
            if (e === i0) ctx.lineTo(hx, hy);
            ctx.strokeStyle = A(0.3 + q * 0.7);
            ctx.lineWidth = 1.6 + q * 1.8;
            ctx.stroke();
            if (e === i0) break;
          }
        }
      };
      routePass();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(blds, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 0.42;
      routePass();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(scr[0], scr[1], 3.4, 0, Math.PI * 2);
      ctx.fillStyle = "#0a0a0a";
      ctx.fill();
      ctx.strokeStyle = "rgba(237,237,237,0.9)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      const ex = scr[(M - 1) * 2];
      const ey = scr[(M - 1) * 2 + 1];
      ctx.beginPath();
      ctx.rect(ex - 3.5, ey - 3.5, 7, 7);
      ctx.fillStyle = s.progress >= 1 ? A(1) : "#0a0a0a";
      ctx.fill();
      ctx.stroke();

      let latest = -1;
      for (let k = 0; k < passed.length; k++) if (passed[k] >= 0) latest = k;
      ctx.font = `600 9px ${MONO}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let k = 0; k < passed.length; k++) {
        const idx = Math.round(((k + 1) / dist) * (M - 1));
        const x = scr[idx * 2];
        const y = scr[idx * 2 + 1];
        if (passed[k] < 0) {
          ctx.beginPath();
          ctx.arc(x, y, 1.7, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(237,237,237,0.5)";
          ctx.fill();
          continue;
        }
        const age = (t - passed[k]) / 1000;
        const pop = s.reduced ? 1 : easeBack(Math.min(1, Math.max(0, age / 0.45)));
        const hy2 = y - 12 * pop;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, hy2);
        ctx.strokeStyle = "rgba(237,237,237,0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, hy2 - 3.2 * pop);
        ctx.lineTo(x + 3.2 * pop, hy2);
        ctx.lineTo(x, hy2 + 3.2 * pop);
        ctx.lineTo(x - 3.2 * pop, hy2);
        ctx.closePath();
        ctx.fillStyle = A(1);
        ctx.fill();
        const big = k === latest && (age < 2.6 || s.reduced || !s.playing);
        if (big) {
          const text = `${k + 1} KM`;
          const tw = ctx.measureText(text).width + 12;
          ctx.save();
          ctx.translate(x, hy2 - 12);
          ctx.scale(pop, pop);
          ctx.beginPath();
          ctx.roundRect(-tw / 2, -7.5, tw, 15, 7.5);
          ctx.fillStyle = "rgba(10,10,12,0.88)";
          ctx.fill();
          ctx.strokeStyle = A(0.7);
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = "#ededed";
          ctx.fillText(text, 0, 0.5);
          ctx.restore();
        } else {
          ctx.fillStyle = "rgba(237,237,237,0.85)";
          ctx.fillText(String(k + 1), x, hy2 - 9);
        }
      }

      const pulse = s.reduced ? 0.4 : (t / 1100) % 1;
      ctx.globalCompositeOperation = "lighter";
      const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 18);
      g.addColorStop(0, A(0.6));
      g.addColorStop(1, A(0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(hx, hy, 18, 0, Math.PI * 2);
      ctx.fill();
      const beam = ctx.createLinearGradient(hx, hy, hx, hy - 36);
      beam.addColorStop(0, A(0.85));
      beam.addColorStop(1, A(0));
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.lineTo(hx, hy - 36);
      ctx.strokeStyle = beam;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.arc(hx, hy, 4 + pulse * 9, 0, Math.PI * 2);
      ctx.strokeStyle = A(0.75 * (1 - pulse));
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(hx, hy, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = A(1);
      ctx.lineWidth = 1.6;
      ctx.stroke();
    };

    const frame = (t: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      if (s.playing && !s.scrubbing) {
        if (s.progress >= 1) {
          hold += dt;
          if (s.loop && hold > 1.6) {
            s.progress = 0;
            hold = 0;
            report();
          } else if (!s.loop) {
            s.playing = false;
            setPlayState(false);
          }
        } else {
          s.progress = Math.min(1, s.progress + dt / Math.max(1, s.duration));
          hold = 0;
          report();
        }
      }
      draw(t);
      if (visible && (s.playing || !s.reduced)) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const kick = () => {
      if (raf || !visible) {
        draw();
        return;
      }
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const r = root.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      w = r.width;
      h = r.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      layer.width = canvas.width;
      layer.height = canvas.height;
      blds.width = canvas.width;
      blds.height = canvas.height;
      view = fitView(route, w, h, GRID);
      for (let i = 0; i < route.length; i++) {
        const p = proj(view, route[i][0], route[i][1], 0.02);
        scr[i * 2] = p[0];
        scr[i * 2 + 1] = p[1];
      }
      relayer();
      draw();
    };

    api.current = {
      draw: () => draw(),
      relayer: () => {
        relayer();
        draw();
      },
      kick,
      seek: (p: number) => {
        s.progress = Math.min(1, Math.max(0, p));
        hold = 0;
        report();
        draw();
      },
      progress: () => s.progress,
    };

    s.progress = 0;
    s.reduced = window.matchMedia(RM_QUERY).matches;
    if (s.reduced && !s.playing) s.progress = 1;
    resize();
    report();
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(root);
    kick();
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
      raf = 0;
      api.current = null;
    };
  }, [routeSeed, distanceKm]);

  const changeHour = (value: number) => {
    if (hour === undefined) setInnerHour(value);
    onHourChange?.(value);
  };

  const toggle = () => {
    if (!playing && api.current && api.current.progress() >= 1) api.current.seek(0);
    setPlayState(!playing);
  };

  const night = hr < 6.5 || hr > 18.5;
  const dist = Math.max(0.5, distanceKm);
  const pace = clock(paceSecPerKm);

  return (
    <div
      ref={rootRef}
      className={`hb-ub1 ${className}`.trim()}
      style={{ "--hb-ub1-a": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-map-route-replay" precedence="default">
        {css}
      </style>
      <canvas ref={canvasRef} className="hb-ub1-cv" aria-hidden="true" />
      <div className="hb-ub1-glass hb-ub1-hud">
        <span className="hb-ub1-k">{label}</span>
        <div className="hb-ub1-km">
          <b ref={kmRef}>0.00</b>
          <span>/ {dist.toFixed(2)} km</span>
        </div>
        <span className="hb-ub1-sub">
          <span ref={timeRef}>0:00</span> elapsed · {pace} /km
        </span>
      </div>
      <div className="hb-ub1-glass hb-ub1-sun" data-night={night ? "true" : "false"}>
        {night ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
          </svg>
        )}
        <input
          type="range"
          className="hb-ub1-range hb-ub1-hour"
          min={5}
          max={21}
          step={0.25}
          value={hr}
          aria-label="Time of day"
          aria-valuetext={fmtHour(hr)}
          style={{ "--hb-ub1-f": `${(((hr - 5) / 16) * 100).toFixed(2)}%` } as React.CSSProperties}
          onChange={(e) => changeHour(Number(e.currentTarget.value))}
        />
        <span className="hb-ub1-hr">{fmtHour(hr)}</span>
      </div>
      <div className="hb-ub1-glass hb-ub1-bar">
        <button type="button" className="hb-ub1-play" aria-label={playing ? "Pause replay" : "Play replay"} onClick={toggle}>
          {playing ? (
            <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
              <rect x="2" y="1.5" width="2.8" height="9" rx="0.8" />
              <rect x="7.2" y="1.5" width="2.8" height="9" rx="0.8" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
              <path d="M3 1.8v8.4a.6.6 0 0 0 .9.5l7-4.2a.6.6 0 0 0 0-1L3.9 1.3a.6.6 0 0 0-.9.5Z" />
            </svg>
          )}
        </button>
        <input
          ref={scrubRef}
          type="range"
          className="hb-ub1-range hb-ub1-scrub"
          min={0}
          max={1000}
          step={1}
          defaultValue={0}
          aria-label="Replay position"
          onPointerDown={() => {
            st.current.scrubbing = true;
          }}
          onPointerUp={() => {
            st.current.scrubbing = false;
          }}
          onPointerCancel={() => {
            st.current.scrubbing = false;
          }}
          onBlur={() => {
            st.current.scrubbing = false;
          }}
          onChange={(e) => api.current?.seek(Number(e.currentTarget.value) / 1000)}
        />
        <span ref={pctRef} className="hb-ub1-pct">
          0%
        </span>
      </div>
    </div>
  );
}
