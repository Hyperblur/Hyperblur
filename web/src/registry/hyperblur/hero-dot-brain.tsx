"use client";

import * as React from "react";

export interface HeroDotBrainLink {
  label: string;
  href: string;
}

export interface HeroDotBrainProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotBrainLink | null;
  brand?: string;
  nav?: HeroDotBrainLink[];
  navCta?: HeroDotBrainLink | null;
  learnMore?: HeroDotBrainLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  folds?: number;
  activity?: number;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}


const css = `
@keyframes hb-hh11-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh11-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
.hb-hh11 {
  --hb-hh11-accent: #ff2bd6;
  --hb-hh11-ink: #ffffff;
  --hb-hh11-lime: #c6ff3d;
  --hb-hh11-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 640px;
  overflow: hidden;
  container-type: inline-size;
  background: #0d0221;
  color: #f6ecff;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hh11 *, .hb-hh11 *::before, .hb-hh11 *::after { box-sizing: border-box; }
.hb-hh11-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh11-bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: 26px 48px;
}
.hb-hh11-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -.03em;
  text-decoration: none;
  border-radius: 8px;
}
.hb-hh11-mark { flex: none; color: var(--hb-hh11-lime); }
.hb-hh11-right {
  display: flex;
  align-items: center;
  gap: 26px;
}
.hb-hh11-links {
  display: flex;
  align-items: center;
  gap: 26px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh11-link {
  color: rgba(246, 236, 255, .66);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color .2s ease;
}
.hb-hh11-link:hover { color: var(--hb-hh11-lime); }
.hb-hh11-login { color: #fff; font-weight: 600; }
.hb-hh11-search {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: rgba(246, 236, 255, .66);
  cursor: pointer;
  transition: color .2s ease;
}
.hb-hh11-search:hover { color: var(--hb-hh11-lime); }
.hb-hh11-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 240px;
}
.hb-hh11-foot {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 26px;
  width: 100%;
  padding: 0 48px 64px;
}
.hb-hh11-copy { min-width: 0; }
.hb-hh11-title {
  max-width: 7.6em;
  margin: 0;
  color: #fff;
  font-size: clamp(34px, 6.2cqi, 88px);
  font-weight: 800;
  line-height: .96;
  letter-spacing: -.055em;
  text-wrap: balance;
  text-shadow: 0 2px 30px rgba(13, 2, 33, .9), 0 0 2px rgba(13, 2, 33, .6);
  animation: hb-hh11-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh11-sub {
  max-width: 28em;
  margin: 18px 0 0;
  color: rgba(246, 236, 255, .82);
  font-size: 16px;
  line-height: 1.55;
  text-wrap: pretty;
  text-shadow: 0 1px 16px rgba(13, 2, 33, .95);
  animation: hb-hh11-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh11-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-hh11-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh11-caption {
  margin: 0;
  color: var(--hb-hh11-lime);
  font-family: var(--hb-hh11-mono);
  font-size: 11.5px;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.hb-hh11-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-hh11-cmd {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  height: 46px;
  padding: 0 6px 0 14px;
  border: 1px solid rgba(255, 43, 214, .4);
  border-radius: 8px;
  background: rgba(13, 2, 33, .72);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.hb-hh11-prompt { flex: none; color: var(--hb-hh11-lime); font-family: var(--hb-hh11-mono); font-size: 12px; }
.hb-hh11-code {
  min-width: 0;
  overflow: hidden;
  color: #f6ecff;
  font-family: var(--hb-hh11-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh11-copybtn {
  position: relative;
  display: inline-grid;
  flex: none;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: rgba(246, 236, 255, .66);
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh11-copybtn:hover { color: #fff; background: rgba(255, 43, 214, .18); }
.hb-hh11-copybtn[data-done="true"] { color: var(--hb-hh11-lime); }
.hb-hh11-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 46px;
  padding: 0 14px 0 20px;
  border-radius: 8px;
  background: var(--hb-hh11-accent);
  color: var(--hb-hh11-ink);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 0 34px -6px var(--hb-hh11-accent);
  transition: filter .2s ease;
}
.hb-hh11-cta:hover { filter: brightness(1.1); }
.hb-hh11-cta svg { transition: transform .2s ease; }
.hb-hh11-cta:hover svg { transform: translateX(2px); }
.hb-hh11-more {
  position: absolute;
  right: 48px;
  bottom: 28px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 8px;
  color: rgba(246, 236, 255, .7);
  font-family: var(--hb-hh11-mono);
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: color .2s ease;
}
.hb-hh11-more:hover { color: var(--hb-hh11-lime); }
.hb-hh11-more svg { animation: hb-hh11-bob 1.8s ease-in-out infinite; }
.hb-hh11 a:focus-visible, .hb-hh11 button:focus-visible {
  outline: 2px solid var(--hb-hh11-lime);
  outline-offset: 2px;
}
.hb-hh11-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 860px) {
  .hb-hh11-bar { padding: 20px 24px; }
  .hb-hh11-foot { padding: 0 24px 60px; }
  .hb-hh11-more { right: 24px; }
  .hb-hh11-right, .hb-hh11-links { gap: 18px; }
}
@container (max-width: 640px) {
  .hb-hh11-links, .hb-hh11-search { display: none; }
  .hb-hh11-stage { min-height: calc(78cqi + 24px); }
  .hb-hh11-title { font-size: clamp(34px, 11.5cqi, 50px); }
  .hb-hh11-sub { font-size: 14px; }
  .hb-hh11-side, .hb-hh11-row { align-self: stretch; }
  .hb-hh11-row { flex-direction: column; }
  .hb-hh11-cta { width: 100%; }
  .hb-hh11-more { display: none; }
}
@container (max-width: 360px) {
  .hb-hh11-bar { padding: 16px 18px; }
  .hb-hh11-foot { padding: 0 18px 56px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh11-title, .hb-hh11-sub, .hb-hh11-side, .hb-hh11-more svg { animation: none; }
  .hb-hh11-link, .hb-hh11-search, .hb-hh11-copybtn, .hb-hh11-cta, .hb-hh11-cta svg, .hb-hh11-more { transition: none; }
  .hb-hh11-cta:hover svg { transform: none; }
}
`;


const defaultNav: HeroDotBrainLink[] = [
  { label: "Product", href: "#" },
  { label: "Research", href: "#" },
  { label: "Pricing", href: "#" },
];
const defaultNavCta: HeroDotBrainLink = { label: "Log in", href: "#" };
const defaultPrimary: HeroDotBrainLink = { label: "Start free", href: "#" };
const defaultMore: HeroDotBrainLink = { label: "How it works", href: "#" };


const TAU = Math.PI * 2;

type Field = (x: number, y: number, z: number) => number;

interface Cloud {
  n: number;
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  nx: Float32Array;
  ny: Float32Array;
  nz: Float32Array;
  w: Float32Array;
}

function hash(i: number, salt: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) ^ Math.imul(salt + 11, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

function smin(a: number, b: number, k: number) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}

function ell(px: number, py: number, pz: number, rx: number, ry: number, rz: number) {
  const ax = px / rx;
  const ay = py / ry;
  const az = pz / rz;
  const k0 = Math.sqrt(ax * ax + ay * ay + az * az);
  const bx = ax / rx;
  const by = ay / ry;
  const bz = az / rz;
  const k1 = Math.sqrt(bx * bx + by * by + bz * bz);
  return k1 > 1e-9 ? (k0 * (k0 - 1)) / k1 : -Math.min(rx, ry, rz);
}

function capsule(px: number, py: number, pz: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number, ra: number, rb: number) {
  const pax = px - ax;
  const pay = py - ay;
  const paz = pz - az;
  const bax = bx - ax;
  const bay = by - ay;
  const baz = bz - az;
  const dd = bax * bax + bay * bay + baz * baz;
  let h = dd > 0 ? (pax * bax + pay * bay + paz * baz) / dd : 0;
  h = h < 0 ? 0 : h > 1 ? 1 : h;
  const qx = pax - bax * h;
  const qy = pay - bay * h;
  const qz = paz - baz * h;
  return Math.sqrt(qx * qx + qy * qy + qz * qz) - (ra + (rb - ra) * h);
}

function surface(field: Field, box: number[], cell: number, count: number, limit: number, salt: number, accept: Field | null, slice: number, share: number): Cloud {
  const big = cell * 2;
  const gx0 = box[0];
  const gy0 = box[1];
  const gz0 = box[2];
  const nxc = Math.ceil((box[3] - gx0) / big);
  const nyc = Math.ceil((box[4] - gy0) / big);
  const nzc = Math.ceil((box[5] - gz0) / big);
  const cells: number[] = [];
  for (let k = 0; k < nzc; k++) {
    for (let j = 0; j < nyc; j++) {
      for (let i = 0; i < nxc; i++) {
        const cx = gx0 + (i + 0.5) * big;
        const cy = gy0 + (j + 0.5) * big;
        const cz = gz0 + (k + 0.5) * big;
        if (Math.abs(field(cx, cy, cz)) > big * 0.9) continue;
        for (let q = 0; q < 8; q++) {
          const fx = cx + ((q & 1) - 0.5) * cell;
          const fy = cy + (((q >> 1) & 1) - 0.5) * cell;
          const fz = cz + (((q >> 2) & 1) - 0.5) * cell;
          if (Math.abs(field(fx, fy, fz)) < cell * 0.9) cells.push(fx, fy, fz);
        }
      }
    }
  }
  const out: Cloud = {
    n: 0,
    x: new Float32Array(count),
    y: new Float32Array(count),
    z: new Float32Array(count),
    nx: new Float32Array(count),
    ny: new Float32Array(count),
    nz: new Float32Array(count),
    w: new Float32Array(count),
  };
  const nc = cells.length / 3;
  if (!nc) return out;
  const real = Math.min(count, limit);
  const e = cell * 0.08;
  let n = 0;
  for (let t = 0; t < real * 8 && n < real; t++) {
    const c = Math.floor(hash(t, salt) * nc) * 3;
    let px = cells[c] + (hash(t, salt + 1) - 0.5) * cell;
    let py = cells[c + 1] + (hash(t, salt + 2) - 0.5) * cell;
    let pz = cells[c + 2] + (hash(t, salt + 3) - 0.5) * cell;
    if (accept && hash(t, salt + 4) > accept(px, py, pz)) continue;
    const flat = slice > 0 && hash(t, salt + 5) < share;
    if (flat) py = Math.round(py / slice) * slice;
    let ux = 0;
    let uy = 1;
    let uz = 0;
    let d = 0;
    for (let it = 0; it < 2; it++) {
      const a = field(px + e, py - e, pz - e);
      const b = field(px - e, py - e, pz + e);
      const c2 = field(px - e, py + e, pz - e);
      const d2 = field(px + e, py + e, pz + e);
      ux = a - b - c2 + d2;
      uy = -a - b + c2 + d2;
      uz = -a + b - c2 + d2;
      d = (a + b + c2 + d2) * 0.25;
      const gl = Math.sqrt(ux * ux + uy * uy + uz * uz) || 1;
      ux /= gl;
      uy /= gl;
      uz /= gl;
      if (flat) {
        const hl = ux * ux + uz * uz;
        if (hl < 0.2) {
          d = 1;
          break;
        }
        px -= (ux * d) / hl;
        pz -= (uz * d) / hl;
      } else {
        px -= ux * d;
        py -= uy * d;
        pz -= uz * d;
      }
    }
    if (!(Math.abs(d) < cell * 0.25)) continue;
    out.x[n] = px;
    out.y[n] = py;
    out.z[n] = pz;
    out.nx[n] = ux;
    out.ny[n] = uy;
    out.nz[n] = uz;
    out.w[n] = flat ? 1 : 0;
    n++;
  }
  const made = n;
  for (let t = 0; made > 0 && n < count; t++, n++) {
    const j = t % made;
    const ux = out.nx[j];
    const uy = out.ny[j];
    const uz = out.nz[j];
    let ax = uy;
    let ay = -ux;
    let az = 0;
    let al = Math.sqrt(ax * ax + ay * ay);
    if (al < 0.2) {
      ax = 0;
      ay = uz;
      az = -uy;
      al = Math.sqrt(ay * ay + az * az) || 1;
    }
    ax /= al;
    ay /= al;
    az /= al;
    const bx = uy * az - uz * ay;
    const by = uz * ax - ux * az;
    const bz = ux * ay - uy * ax;
    const u = (hash(t, salt + 7) - 0.5) * cell * 0.7;
    const v = (hash(t, salt + 8) - 0.5) * cell * 0.7;
    out.x[n] = out.x[j] + ax * u + bx * v;
    out.y[n] = out.y[j] + ay * u + by * v;
    out.z[n] = out.z[j] + az * u + bz * v;
    out.nx[n] = ux;
    out.ny[n] = uy;
    out.nz[n] = uz;
    out.w[n] = out.w[j];
  }
  out.n = n;
  return out;
}

function gyri(x: number, y: number, z: number) {
  return (
    Math.sin(x * 14.6 + 2.2 * Math.sin(z * 8.5 + 1.3) + 1.1) +
    Math.sin(y * 16.5 + 1.9 * Math.sin(x * 7.5 + 0.4) + 2.6) +
    Math.sin(z * 15.5 + 1.7 * Math.sin(y * 9.4 + 2.2) + 0.3)
  );
}

function fissure(x: number, y: number, z: number) {
  if (Math.abs(x) < 0.25) return 9;
  const dy = 0.24;
  const dz = -0.62;
  let h = ((y + 0.1) * dy + (z - 0.42) * dz) / (dy * dy + dz * dz);
  h = h < 0 ? 0 : h > 1 ? 1 : h;
  const qy = y + 0.1 - dy * h;
  const qz = z - 0.42 - dz * h;
  return Math.sqrt(qy * qy + qz * qz);
}

function cerebrum(x: number, y: number, z: number) {
  const ax = Math.abs(x);
  let d = ell(ax - 0.36, y - 0.12, z, 0.4, 0.56, 0.92);
  d = smin(d, ell(ax - 0.42, y + 0.2, z - 0.18, 0.27, 0.26, 0.5), 0.14);
  d = smin(d, ell(ax - 0.3, y - 0.02, z - 0.55, 0.28, 0.36, 0.36), 0.1);
  return -smin(-d, ax - 0.045, 0.04);
}

function buildBrain(count: number, folds: number): Cloud {
  const depth = 0.045 * folds;
  const bias = Math.min(1, folds) * 0.92;
  const field: Field = (x, y, z) => {
    let d = cerebrum(x, y, z);
    if (d < 0.08 && folds > 0) {
      const s = gyri(x, y, z);
      const l = fissure(x, y, z);
      d += depth * Math.exp(-s * s * 3) + 2 * depth * Math.exp(-(l * l) / 0.0015);
    }
    const ax = Math.abs(x);
    let cb = ell(ax - 0.2, y + 0.38, z + 0.58, 0.26, 0.19, 0.24);
    if (cb < 0.05) cb += 0.008 * Math.sin(y * 70 + z * 20);
    d = smin(d, cb, 0.04);
    return smin(d, capsule(x, y, z, 0, -0.25, -0.22, 0, -0.82, -0.34, 0.11, 0.08), 0.08);
  };
  const bank = (x: number, y: number, z: number) => {
    const s = Math.abs(gyri(x, y, z));
    const l = fissure(x, y, z);
    const e = s - 0.5;
    return Math.max(Math.exp(-(e * e) / 0.05), Math.exp(-((l - 0.035) * (l - 0.035)) / 0.0006));
  };
  const core = (x: number, y: number, z: number) => {
    const s = gyri(x, y, z);
    const l = fissure(x, y, z);
    return Math.max(Math.exp(-(s * s) / 0.03), Math.exp(-(l * l) / 0.0003));
  };
  const accept: Field = (x, y, z) => {
    if (cerebrum(x, y, z) > 0.08) return 0.45;
    const m = Math.abs(x) < 0.12 && y > -0.05 ? 0.5 : 0;
    return Math.min(1, Math.max(0.04, 1 - bias * 0.75 + bias * 0.85 * bank(x, y, z) - bias * 0.3 * core(x, y, z) + m));
  };
  const cloud = surface(field, [-0.85, -0.9, -1, 0.85, 0.75, 1], 0.04, count, 12500, 5, accept, 0, 0);
  for (let i = 0; i < cloud.n; i++) {
    const x = cloud.x[i];
    const y = cloud.y[i];
    const z = cloud.z[i];
    if (cerebrum(x, y, z) < 0.06) {
      const crest = Math.min(1, Math.abs(gyri(x, y, z)) / 2);
      const mid = Math.abs(x) < 0.1 && y > -0.05 ? 0.45 : 0;
      cloud.w[i] = Math.max(0.1, 0.5 + bias * (0.95 * bank(x, y, z) + 0.25 * crest - 0.45 * core(x, y, z)) + (1 - bias) * 0.3 + mid);
    } else {
      cloud.w[i] = 0.8;
    }
  }
  return cloud;
}

interface Graph {
  nodes: Int32Array;
  ea: Int32Array;
  eb: Int32Array;
  adjStart: Int32Array;
  adj: Int32Array;
}

function buildGraph(cloud: Cloud, want: number): Graph {
  const stride = Math.max(1, Math.floor(cloud.n / want));
  const list: number[] = [];
  for (let i = 0; i < cloud.n && list.length < want; i += stride) list.push(i);
  const nn = list.length;
  const G = 0.13;
  const S = 24;
  const cell = (v: number) => Math.min(S - 1, Math.max(0, Math.floor((v + 1.5) / G)));
  const buckets: number[][] = [];
  for (let c = 0; c < S * S * S; c++) buckets.push([]);
  for (let j = 0; j < nn; j++) {
    const i = list[j];
    buckets[cell(cloud.x[i]) + cell(cloud.y[i]) * S + cell(cloud.z[i]) * S * S].push(j);
  }
  const seen = new Set<number>();
  const ea: number[] = [];
  const eb: number[] = [];
  for (let j = 0; j < nn; j++) {
    const i = list[j];
    const ci = cell(cloud.x[i]);
    const cj = cell(cloud.y[i]);
    const ck = cell(cloud.z[i]);
    const cand: [number, number][] = [];
    for (let k = Math.max(0, ck - 1); k <= Math.min(S - 1, ck + 1); k++) {
      for (let q = Math.max(0, cj - 1); q <= Math.min(S - 1, cj + 1); q++) {
        for (let p = Math.max(0, ci - 1); p <= Math.min(S - 1, ci + 1); p++) {
          const b = buckets[p + q * S + k * S * S];
          for (let m = 0; m < b.length; m++) {
            const o = b[m];
            if (o === j) continue;
            const t = list[o];
            const dx = cloud.x[t] - cloud.x[i];
            const dy = cloud.y[t] - cloud.y[i];
            const dz = cloud.z[t] - cloud.z[i];
            const dd = dx * dx + dy * dy + dz * dz;
            if (dd < 0.0289) cand.push([dd, o]);
          }
        }
      }
    }
    cand.sort((a, b) => a[0] - b[0]);
    for (let m = 0; m < Math.min(3, cand.length); m++) {
      const o = cand[m][1];
      const key = Math.min(j, o) * nn + Math.max(j, o);
      if (seen.has(key)) continue;
      seen.add(key);
      ea.push(j);
      eb.push(o);
    }
  }
  const deg = new Int32Array(nn + 1);
  for (let e = 0; e < ea.length; e++) {
    deg[ea[e] + 1]++;
    deg[eb[e] + 1]++;
  }
  for (let j = 0; j < nn; j++) deg[j + 1] += deg[j];
  const fill = deg.slice(0, nn);
  const adj = new Int32Array(ea.length * 2);
  for (let e = 0; e < ea.length; e++) {
    adj[fill[ea[e]]++] = eb[e];
    adj[fill[eb[e]]++] = ea[e];
  }
  return { nodes: Int32Array.from(list), ea: Int32Array.from(ea), eb: Int32Array.from(eb), adjStart: deg, adj };
}

function bfs(g: Graph, seed: number, out: Int16Array) {
  out.fill(-1);
  const queue = new Int32Array(out.length);
  let head = 0;
  let tail = 0;
  queue[tail++] = seed;
  out[seed] = 0;
  while (head < tail) {
    const a = queue[head++];
    for (let q = g.adjStart[a]; q < g.adjStart[a + 1]; q++) {
      const b = g.adj[q];
      if (out[b] < 0) {
        out[b] = out[a] + 1;
        queue[tail++] = b;
      }
    }
  }
}

interface Scene {
  cloud: Cloud;
  graph: Graph;
  bs: Float32Array;
  col: Uint8Array;
  sx: Float32Array;
  sy: Float32Array;
  sd: Float32Array;
  ss: Float32Array;
  bucket: Uint8Array;
  order: Int32Array;
  counts: Int32Array;
  starts: Int32Array;
  na: Float32Array;
  nk: Uint8Array;
  dist: Int16Array[];
  cycle: Int32Array;
  ncasc: number;
  acc: [number, number, number];
  fills: string[];
}

interface View {
  w: number;
  h: number;
  cx: number;
  cy: number;
  R: number;
  time: number;
  curX: number;
  curY: number;
  pace: number;
  still: boolean;
  limit: number;
  dpr: number;
}

const ALPHAS = [0.16, 0.3, 0.46, 0.64, 0.82, 1];
const LIGHT: [number, number, number] = [-0.36, 0.56, 0.75];
const LIME: [number, number, number] = [198, 255, 61];
const HOP = 0.075;
const PERIOD = 4.6;

function createScene(count: number, folds: number, activity: number, acc: [number, number, number]): Scene {
  const cloud = buildBrain(count, folds);
  const graph = buildGraph(cloud, 1000);
  const nn = graph.nodes.length;
  const bs = new Float32Array(cloud.n);
  const col = new Uint8Array(cloud.n);
  for (let i = 0; i < cloud.n; i++) {
    bs[i] = 0.75 + hash(i, 3) * 0.5;
    col[i] = hash(i, 41) < 0.24 ? 1 : 0;
  }
  const fills: string[] = [];
  for (let c = 0; c < 2; c++) {
    const rgb = c ? LIME : acc;
    for (let b = 0; b < ALPHAS.length; b++) fills.push(`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${ALPHAS[b].toFixed(3)})`);
  }
  const ncasc = Math.max(0, Math.round(3 * activity));
  const dist: Int16Array[] = [];
  for (let k = 0; k < ncasc; k++) dist.push(new Int16Array(nn).fill(-1));
  return {
    cloud,
    graph,
    bs,
    col,
    sx: new Float32Array(cloud.n),
    sy: new Float32Array(cloud.n),
    sd: new Float32Array(cloud.n),
    ss: new Float32Array(cloud.n),
    bucket: new Uint8Array(cloud.n),
    order: new Int32Array(cloud.n),
    counts: new Int32Array(ALPHAS.length * 2),
    starts: new Int32Array(ALPHAS.length * 2),
    na: new Float32Array(nn),
    nk: new Uint8Array(nn),
    dist,
    cycle: new Int32Array(ncasc).fill(-999),
    ncasc,
    acc,
    fills,
  };
}

function pulse(u: number) {
  if (u < 0) return 0;
  if (u < 0.5) return u / 0.5;
  return Math.exp(-(u - 0.5) / 2.4);
}

function paint(ctx: CanvasRenderingContext2D, s: Scene, v: View) {
  const { w, h, cx, cy, R, time, pace } = v;
  const acc = s.acc;
  const g = s.graph;
  const nn = g.nodes.length;
  ctx.setTransform(v.dpr, 0, 0, v.dpr, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, w, h);
  const glow = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.6);
  glow.addColorStop(0, "rgba(124, 30, 214, 0.34)");
  glow.addColorStop(0.55, "rgba(74, 12, 140, 0.16)");
  glow.addColorStop(1, "rgba(13, 2, 33, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  const t = v.still ? 0 : time * pace;
  const yaw = 0.95 + Math.sin(t * 0.2) * 0.4 + v.curX * 0.5;
  const pitch = 0.3 + Math.sin(t * 0.15 + 1) * 0.06 + v.curY * 0.2;
  const roll = -0.2 + Math.sin(t * 0.17 + 0.5) * 0.09;
  const cY = Math.cos(yaw);
  const sY = Math.sin(yaw);
  const cX = Math.cos(pitch);
  const sX = Math.sin(pitch);
  const cR = Math.cos(roll);
  const sR = Math.sin(roll);
  const yc = -0.16;
  const c = s.cloud;
  const n = Math.min(c.n, v.limit);
  const L0 = LIGHT[0];
  const L1 = LIGHT[1];
  const L2 = LIGHT[2];
  const scale = Math.max(0.7, Math.min(1.25, R / 480));

  s.counts.fill(0);
  for (let i = 0; i < c.n; i++) {
    const x = c.x[i];
    const y = c.y[i] - yc;
    const z = c.z[i];
    const x1 = x * cY + z * sY;
    const z1 = -x * sY + z * cY;
    const y2 = y * cX - z1 * sX;
    const z2 = y * sX + z1 * cX;
    const x3 = x1 * cR - y2 * sR;
    const y3 = x1 * sR + y2 * cR;
    const p = 1 + z2 * 0.07;
    s.sx[i] = cx + x3 * R * p;
    s.sy[i] = cy - y3 * R * p;
    const depth = Math.min(1, Math.max(0, (z2 + 1.1) / 2.2));
    s.sd[i] = depth;
    if (i >= n) {
      s.bucket[i] = 255;
      continue;
    }
    const nx = c.nx[i];
    const ny = c.ny[i];
    const nz = c.nz[i];
    const nx1 = nx * cY + nz * sY;
    const nz1 = -nx * sY + nz * cY;
    const ny2 = ny * cX - nz1 * sX;
    const nz2 = ny * sX + nz1 * cX;
    const lam = Math.max(0, L0 * nx1 + L1 * ny2 + L2 * nz2);
    const edge = 1 - Math.abs(nz2);
    const rim = nz2 > -0.35 ? edge * edge * edge : 0;
    const face = nz2 > 0 ? 1 : 0.32;
    let b = c.w[i] * (0.38 + 1.0 * lam * face + 1.1 * rim) * (0.4 + 0.6 * depth) * 1.5;
    if (b > 0.999) b = 0.999;
    const k = s.col[i] * ALPHAS.length + Math.floor(b * ALPHAS.length);
    s.ss[i] = (0.65 + 1.1 * depth) * s.bs[i] * scale;
    s.bucket[i] = k;
    s.counts[k]++;
  }
  let run = 0;
  for (let k = 0; k < s.counts.length; k++) {
    s.starts[k] = run;
    run += s.counts[k];
  }
  for (let i = 0; i < c.n; i++) if (s.bucket[i] !== 255) s.order[s.starts[s.bucket[i]]++] = i;

  const lit = v.still ? 1.7 : t;
  s.na.fill(0);
  for (let k = 0; k < s.ncasc; k++) {
    const tt = lit + (k * PERIOD) / s.ncasc;
    const cyc = Math.floor(tt / PERIOD);
    if (s.cycle[k] !== cyc) {
      s.cycle[k] = cyc;
      let seed = Math.floor(hash(cyc * 7 + k, 71) * nn);
      for (let tries = 0; tries < 12 && s.sd[g.nodes[seed]] < 0.35; tries++) seed = Math.floor(hash(cyc * 7 + k, 72 + tries) * nn);
      bfs(g, seed, s.dist[k]);
    }
    const tau = ((tt - cyc * PERIOD) / HOP) - 1;
    const d = s.dist[k];
    for (let j = 0; j < nn; j++) {
      if (d[j] < 0) continue;
      const a = pulse(tau - d[j]);
      if (a > s.na[j]) {
        s.na[j] = a;
        s.nk[j] = k & 1;
      }
    }
  }

  ctx.lineWidth = 0.7;
  ctx.lineCap = "round";
  for (let band = 0; band < 3; band++) {
    ctx.strokeStyle = `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, ${[0.16, 0.28, 0.44][band]})`;
    ctx.beginPath();
    for (let e = 0; e < g.ea.length; e++) {
      const ia = g.nodes[g.ea[e]];
      const ib = g.nodes[g.eb[e]];
      if (ia >= n || ib >= n) continue;
      const dm = (s.sd[ia] + s.sd[ib]) * 0.5;
      if (Math.min(2, Math.floor(dm * 3)) !== band) continue;
      ctx.moveTo(s.sx[ia], s.sy[ia]);
      ctx.lineTo(s.sx[ib], s.sy[ib]);
    }
    ctx.stroke();
  }

  let pos = 0;
  for (let k = 0; k < s.counts.length; k++) {
    const m = s.counts[k];
    if (!m) continue;
    ctx.fillStyle = s.fills[k];
    ctx.beginPath();
    for (let q = pos; q < pos + m; q++) {
      const i = s.order[q];
      const r = s.ss[i];
      ctx.moveTo(s.sx[i] + r, s.sy[i]);
      ctx.arc(s.sx[i], s.sy[i], r, 0, TAU);
    }
    ctx.fill();
    pos += m;
  }

  if (s.ncasc > 0) {
    ctx.globalCompositeOperation = "lighter";
    for (let pass = 0; pass < 2; pass++) {
      for (let kk = 0; kk < 2; kk++) {
        const rgb = kk ? [255, 120, 235] : LIME;
        for (let lv = 0; lv < 3; lv++) {
          const lo = [0.05, 0.3, 0.65][lv];
          const hi = [0.3, 0.65, 1.01][lv];
          ctx.strokeStyle = pass ? `rgba(255, 255, 255, ${[0.35, 0.65, 0.95][lv]})` : `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${[0.2, 0.34, 0.5][lv]})`;
          ctx.lineWidth = pass ? 0.9 : 3 + lv;
          ctx.beginPath();
          for (let e = 0; e < g.ea.length; e++) {
            const a = g.ea[e];
            const b = g.eb[e];
            const ia = g.nodes[a];
            const ib = g.nodes[b];
            if (ia >= n || ib >= n) continue;
            const act = s.na[a] < s.na[b] ? s.na[a] : s.na[b];
            const hot = s.na[a] > s.na[b] ? s.na[a] : s.na[b];
            const ev = (act + hot) * 0.5;
            if (ev < lo || ev >= hi) continue;
            if ((s.nk[a] & 1) !== kk) continue;
            ctx.moveTo(s.sx[ia], s.sy[ia]);
            ctx.lineTo(s.sx[ib], s.sy[ib]);
          }
          ctx.stroke();
        }
      }
    }
    for (let j = 0; j < nn; j++) {
      const a = s.na[j];
      if (a < 0.08) continue;
      const i = g.nodes[j];
      if (i >= n) continue;
      const rgb = s.nk[j] ? [255, 120, 235] : LIME;
      const rr = (3 + 7 * a) * scale * (0.6 + 0.6 * s.sd[i]);
      ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${(0.22 * a).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(s.sx[i], s.sy[i], rr * 2, 0, TAU);
      ctx.fill();
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, a * 1.1).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(s.sx[i], s.sy[i], rr * 0.38, 0, TAU);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  }
}


function hexRgb(value: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function resolveRgb(value: string, ctx: CanvasRenderingContext2D): [number, number, number] {
  const direct = hexRgb(value);
  if (direct) return direct;
  ctx.fillStyle = "#ff2bd6";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const hex = hexRgb(out);
  if (hex) return hex;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return [255, 43, 214];
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#ffffff";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#0d0221" : "#ffffff";
}


function Mark() {
  return (
    <svg className="hb-hh11-mark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M11.2 4.6a3.4 3.4 0 0 0-5.6 2.1 3.2 3.2 0 0 0-1.4 5.3 3.3 3.3 0 0 0 2.4 5.2 3.3 3.3 0 0 0 4.6 1.9z" />
      <path d="M12.8 4.6a3.4 3.4 0 0 1 5.6 2.1 3.2 3.2 0 0 1 1.4 5.3 3.3 3.3 0 0 1-2.4 5.2 3.3 3.3 0 0 1-4.6 1.9z" />
      <path d="M8 9.6c1.2.2 2 .9 2.3 2M16 9.6c-1.2.2-2 .9-2.3 2M8.4 14.6c1 .5 1.8.4 2.6-.3M15.6 14.6c-1 .5-1.8.4-2.6-.3" strokeWidth="1.2" />
    </svg>
  );
}


export function HeroDotBrain({
  title = "Think faster. Your notes think back.",
  subtitle = "Capture notes, decisions and docs in one place, then find anything in milliseconds. Local-first and end-to-end encrypted.",
  caption = "12 ms search · 40k teams · SOC 2 Type II",
  command = "npx hyperblur add hero-dot-brain",
  primaryCta = defaultPrimary,
  brand = "Cortexa",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#ff2bd6",
  density = 1,
  speed = 1,
  folds = 1,
  activity = 1,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotBrainProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !stage || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mult = Math.min(2, Math.max(0.2, Number.isFinite(density) ? density : 1));
    const pace = Math.max(0, Number.isFinite(speed) ? speed : 1);
    const acc = resolveRgb(accent, ctx);
    const scene = createScene(Math.min(24000, Math.round(16000 * mult)), Math.min(2, Math.max(0, Number.isFinite(folds) ? folds : 1)), Math.min(3, Math.max(0, Number.isFinite(activity) ? activity : 1)), acc);
    const view: View = {
      w: 0,
      h: 0,
      cx: 0,
      cy: 0,
      R: 0,
      time: 0,
      curX: 0,
      curY: 0,
      pace,
      still: reduce,
      limit: scene.cloud.n,
      dpr: 1,
    };
    let visible = true;
    let raf = 0;
    let last = 0;
    let pointer = false;
    let ptx = 0;
    let pty = 0;

    function layout() {
      if (!root || !canvas || !stage) return;
      const rect = root.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      view.w = w;
      view.h = h;
      view.dpr = dpr;
      if (w < 640) {
        const st = stage.getBoundingClientRect();
        view.R = w * 0.52;
        view.cx = w * 0.5;
        view.cy = st.top - rect.top + st.height * 0.5;
        view.limit = Math.round(scene.cloud.n * 0.6);
      } else {
        view.R = Math.min(w * 0.34, h * 0.56);
        view.cx = w * 0.58;
        view.cy = h * 0.48;
        view.limit = scene.cloud.n;
      }
    }

    function draw() {
      if (!ctx || !view.w || !view.h) return;
      paint(ctx, scene, view);
    }

    function frame(now: number) {
      raf = 0;
      const step = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      view.time += step;
      let tx = ptx;
      let ty = pty;
      if (!pointer) {
        tx = Math.sin(view.time * 0.21) * 0.35;
        ty = Math.sin(view.time * 0.13 + 1.2) * 0.2;
      }
      const ease = Math.min(1, step * 2.4);
      view.curX += (tx - view.curX) * ease;
      view.curY += (ty - view.curY) * ease;
      draw();
      schedule();
    }

    function schedule() {
      if (reduce || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    }

    function onMove(e: PointerEvent) {
      if (!root) return;
      const rect = root.getBoundingClientRect();
      pointer = true;
      ptx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      pty = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
    }
    function onLeave() {
      pointer = false;
    }
    function onVisibility() {
      if (document.hidden) stop();
      else schedule();
    }

    layout();
    draw();

    const ro = new ResizeObserver(() => {
      layout();
      draw();
    });
    ro.observe(root);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) schedule();
      else stop();
    });
    io.observe(root);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    schedule();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [accent, density, speed, folds, activity]);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function copy() {
    navigator.clipboard?.writeText(command).catch(() => undefined);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1600);
  }

  const Heading = headingAs;
  const vars = { "--hb-hh11-accent": accent, "--hb-hh11-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh11 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-brain" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh11-canvas" aria-hidden="true" />
      <header className="hb-hh11-bar">
        <a className="hb-hh11-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        <div className="hb-hh11-right">
          {nav.length ? (
            <nav aria-label="Primary">
              <ul className="hb-hh11-links">
                {nav.map((item) => (
                  <li key={item.label}>
                    <a className="hb-hh11-link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <button type="button" className="hb-hh11-search" aria-label="Search" onClick={onSearch}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh11-link hb-hh11-login" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh11-stage" aria-hidden="true" />
      <div className="hb-hh11-foot">
        <div className="hb-hh11-copy">
          <Heading className="hb-hh11-title">{title}</Heading>
          {subtitle ? <p className="hb-hh11-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-hh11-side">
            {caption ? <p className="hb-hh11-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh11-row">
                {command ? (
                  <div className="hb-hh11-cmd">
                    <span className="hb-hh11-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh11-code">{command}</code>
                    <button type="button" className="hb-hh11-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
                      {copied ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="8.5" y="8.5" width="11" height="11" rx="2.2" />
                          <path d="M15.5 8.5V6.7a2.2 2.2 0 0 0-2.2-2.2H6.7a2.2 2.2 0 0 0-2.2 2.2v6.6a2.2 2.2 0 0 0 2.2 2.2h1.8" />
                        </svg>
                      )}
                      <span className="hb-hh11-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-hh11-cta" href={primaryCta.href}>
                    {primaryCta.label}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {learnMore ? (
        <a className="hb-hh11-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}
