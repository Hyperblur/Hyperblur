"use client";

import * as React from "react";

export interface BallCrystalProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  accent?: string;
  speed?: number;
  tilt?: number;
  detail?: 0 | 1 | 2;
}

type Vec = [number, number, number];
type Mesh = { verts: Vec[]; faces: [number, number, number][]; shade: number[] };

const css = `
.hb-qr1 {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1;
  box-sizing: border-box;
  margin: 0;
  touch-action: pan-y;
  background: radial-gradient(circle at 50% 46%, color-mix(in srgb, var(--hb-qr1-a) 26%, transparent) 0%, transparent 62%);
}
.hb-qr1::after {
  content: "";
  position: absolute;
  left: 22%;
  right: 22%;
  bottom: 3%;
  height: 7%;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55), transparent 70%);
  pointer-events: none;
}
.hb-qr1-c {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
}
`;

function hash(n: number) {
  let h = (n ^ 0x9e3779b9) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function normalize(v: Vec): Vec {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

function parseColor(value: string): [number, number, number] {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return [47, 123, 255];
  let hex = m[1];
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const meshCache = new Map<number, Mesh>();

function getMesh(detail: number): Mesh {
  const cached = meshCache.get(detail);
  if (cached) return cached;
  const t = (1 + Math.sqrt(5)) / 2;
  let verts: Vec[] = (
    [
      [-1, t, 0],
      [1, t, 0],
      [-1, -t, 0],
      [1, -t, 0],
      [0, -1, t],
      [0, 1, t],
      [0, -1, -t],
      [0, 1, -t],
      [t, 0, -1],
      [t, 0, 1],
      [-t, 0, -1],
      [-t, 0, 1],
    ] as Vec[]
  ).map(normalize);
  let faces: [number, number, number][] = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];
  for (let step = 0; step < detail; step += 1) {
    const base = verts;
    const out = base.slice();
    const cache = new Map<string, number>();
    const mid = (a: number, b: number) => {
      const key = a < b ? `${a}_${b}` : `${b}_${a}`;
      const hit = cache.get(key);
      if (hit !== undefined) return hit;
      const va = base[a];
      const vb = base[b];
      out.push(normalize([(va[0] + vb[0]) / 2, (va[1] + vb[1]) / 2, (va[2] + vb[2]) / 2]));
      cache.set(key, out.length - 1);
      return out.length - 1;
    };
    const next: [number, number, number][] = [];
    for (const [a, b, c] of faces) {
      const ab = mid(a, b);
      const bc = mid(b, c);
      const ca = mid(c, a);
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    verts = out;
    faces = next;
  }
  verts = verts.map((v, i) => {
    const s = 0.92 + 0.14 * hash(i * 7 + 3);
    return [v[0] * s, v[1] * s, v[2] * s] as Vec;
  });
  const shade = faces.map((_, i) => hash(i * 13 + 5) - 0.5);
  const mesh = { verts, faces, shade };
  meshCache.set(detail, mesh);
  return mesh;
}

type Item = { i: number; z: number; nx: number; ny: number; nz: number; cx: number; cy: number };

export function BallCrystal({
  size = 220,
  accent = "#7fb3ff",
  speed = 1,
  tilt = 1,
  detail = 1,
  className = "",
  style,
  ...rest
}: BallCrystalProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mesh = getMesh(detail);
    const base = parseColor(accent);
    const dark: [number, number, number] = [9, 13, 26];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rotated: Vec[] = mesh.verts.map(() => [0, 0, 0]);
    const items: Item[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let time = 0;
    let visible = true;
    let hover = false;
    let blend = 0;
    const cur = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };

    const draw = () => {
      if (!width || !height) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const r = Math.min(width, height) * 0.4;
      const cx = width / 2;
      const cy = height / 2 - r * 0.03;
      const yaw = time * 0.35 * speed + cur.x * 0.9 * tilt;
      const pitch = -0.28 + cur.y * 0.6 * tilt;
      const cyw = Math.cos(yaw);
      const syw = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      for (let i = 0; i < mesh.verts.length; i += 1) {
        const v = mesh.verts[i];
        const x1 = v[0] * cyw + v[2] * syw;
        const z1 = -v[0] * syw + v[2] * cyw;
        const y2 = v[1] * cp - z1 * sp;
        const z2 = v[1] * sp + z1 * cp;
        const o = rotated[i];
        o[0] = x1;
        o[1] = y2;
        o[2] = z2;
      }
      items.length = 0;
      for (let f = 0; f < mesh.faces.length; f += 1) {
        const [a, b, c] = mesh.faces[f];
        const va = rotated[a];
        const vb = rotated[b];
        const vc = rotated[c];
        const mx = (va[0] + vb[0] + vc[0]) / 3;
        const my = (va[1] + vb[1] + vc[1]) / 3;
        const mz = (va[2] + vb[2] + vc[2]) / 3;
        const ux = vb[0] - va[0];
        const uy = vb[1] - va[1];
        const uz = vb[2] - va[2];
        const wx = vc[0] - va[0];
        const wy = vc[1] - va[1];
        const wz = vc[2] - va[2];
        let nx = uy * wz - uz * wy;
        let ny = uz * wx - ux * wz;
        let nz = ux * wy - uy * wx;
        const nl = Math.hypot(nx, ny, nz) || 1;
        nx /= nl;
        ny /= nl;
        nz /= nl;
        if (nx * mx + ny * my + nz * mz < 0) {
          nx = -nx;
          ny = -ny;
          nz = -nz;
        }
        items.push({ i: f, z: mz, nx, ny, nz, cx: mx, cy: my });
      }
      items.sort((p, q) => p.z - q.z);
      const lraw = normalize([-0.35 + cur.x * 0.85, -0.55 + cur.y * 0.85, 0.75]);
      const hv = normalize([lraw[0], lraw[1], lraw[2] + 1]);
      let flare: { x: number; y: number; s: number } | null = null;
      for (const it of items) {
        const [a, b, c] = mesh.faces[it.i];
        const pa = rotated[a];
        const pb = rotated[b];
        const pc = rotated[c];
        if (it.nz < 0) {
          const k = 0.8;
          const ox = -cur.x * r * 0.07;
          const oy = -cur.y * r * 0.07;
          ctx.beginPath();
          ctx.moveTo(cx + pa[0] * r * k + ox, cy + pa[1] * r * k + oy);
          ctx.lineTo(cx + pb[0] * r * k + ox, cy + pb[1] * r * k + oy);
          ctx.lineTo(cx + pc[0] * r * k + ox, cy + pc[1] * r * k + oy);
          ctx.closePath();
          const d = Math.max(0, -(it.nx * lraw[0] + it.ny * lraw[1] + it.nz * lraw[2]));
          const al = 0.1 + 0.2 * d + mesh.shade[it.i] * 0.06;
          ctx.fillStyle = `rgba(${base[0]},${base[1]},${base[2]},${Math.max(0.04, al).toFixed(3)})`;
          ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.05)";
          ctx.lineWidth = 0.6;
          ctx.stroke();
          continue;
        }
        const diff = Math.max(0, it.nx * lraw[0] + it.ny * lraw[1] + it.nz * lraw[2]);
        const spec = Math.pow(Math.max(0, it.nx * hv[0] + it.ny * hv[1] + it.nz * hv[2]), 26);
        const rim = Math.pow(1 - it.nz, 2.4);
        const inten = Math.min(1, Math.max(0, 0.12 + 0.78 * diff + mesh.shade[it.i] * 0.24 + rim * 0.22));
        const w = Math.min(1, spec * 0.9 + rim * 0.14);
        const rr = (dark[0] + (base[0] - dark[0]) * inten) * (1 - w) + 255 * w;
        const gg = (dark[1] + (base[1] - dark[1]) * inten) * (1 - w) + 255 * w;
        const bb = (dark[2] + (base[2] - dark[2]) * inten) * (1 - w) + 255 * w;
        ctx.beginPath();
        ctx.moveTo(cx + pa[0] * r, cy + pa[1] * r);
        ctx.lineTo(cx + pb[0] * r, cy + pb[1] * r);
        ctx.lineTo(cx + pc[0] * r, cy + pc[1] * r);
        ctx.closePath();
        ctx.fillStyle = `rgba(${Math.round(rr)},${Math.round(gg)},${Math.round(bb)},0.9)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${(0.1 + spec * 0.4).toFixed(3)})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
        if (spec > 0.45 && (!flare || spec > flare.s)) {
          flare = { x: cx + it.cx * r, y: cy + it.cy * r, s: spec };
        }
      }
      if (flare) {
        const len = r * 0.16 * flare.s;
        ctx.strokeStyle = `rgba(255,255,255,${Math.min(0.95, flare.s).toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(flare.x - len, flare.y);
        ctx.lineTo(flare.x + len, flare.y);
        ctx.moveTo(flare.x, flare.y - len);
        ctx.lineTo(flare.x, flare.y + len);
        ctx.stroke();
      }
    };

    const frame = (ts: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0.016;
      last = ts;
      time += dt;
      blend += ((hover ? 1 : 0) - blend) * Math.min(1, dt * 4);
      const ix = Math.sin(time * 0.7) * 0.7;
      const iy = Math.cos(time * 0.5) * 0.5;
      const tx = ix * (1 - blend) + pointer.x * blend;
      const ty = iy * (1 - blend) + pointer.y * blend;
      const k = Math.min(1, dt * 5);
      cur.x += (tx - cur.x) * k;
      cur.y += (ty - cur.y) * k;
      draw();
      if (visible && !reduced) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduced || raf || !visible) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      draw();
    };

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
      pointer.y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
      hover = true;
    };
    const onLeave = () => {
      hover = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) start();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(root);
    resize();
    if (!reduced) {
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerdown", onMove);
      root.addEventListener("pointerleave", onLeave);
      root.addEventListener("pointercancel", onLeave);
      start();
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
    };
  }, [accent, detail, speed, tilt]);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Rotating crystal sphere"
      className={`hb-qr1 ${className}`.trim()}
      style={{ width: size, maxWidth: "100%", ["--hb-qr1-a" as string]: accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-ball-crystal" precedence="default">
        {css}
      </style>
      <canvas ref={canvasRef} className="hb-qr1-c" aria-hidden="true" />
    </div>
  );
}
