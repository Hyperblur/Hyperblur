"use client";

import * as React from "react";

export interface HeroDotHeadLink {
  label: string;
  href: string;
}

export interface HeroDotHeadProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotHeadLink | null;
  brand?: string;
  nav?: HeroDotHeadLink[];
  navCta?: HeroDotHeadLink | null;
  learnMore?: HeroDotHeadLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  swing?: number;
  scan?: boolean;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh12-up {
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh12-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.hb-hh12 {
  --hb-hh12-accent: #39ff88;
  --hb-hh12-ink: #02100a;
  --hb-hh12-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 680px;
  overflow: hidden;
  container-type: inline-size;
  background-color: #02100a;
  background-image: radial-gradient(color-mix(in srgb, var(--hb-hh12-accent) 16%, transparent) 1px, transparent 1.3px);
  background-size: 26px 26px;
  color: #c9ffe0;
  font-family: var(--hb-hh12-mono);
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}
.hb-hh12 *, .hb-hh12 *::before, .hb-hh12 *::after { box-sizing: border-box; }
.hb-hh12::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(0, 0, 0, .16) 3px 4px);
}
.hb-hh12-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh12-bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 16px 16px 0;
  padding: 9px 12px;
  border: 1px solid color-mix(in srgb, var(--hb-hh12-accent) 38%, transparent);
  border-radius: 8px;
  background: rgba(2, 20, 12, .86);
}
.hb-hh12-brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--hb-hh12-accent);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .02em;
  text-decoration: none;
  border-radius: 8px;
}
.hb-hh12-mark { flex: none; }
.hb-hh12-caret {
  display: inline-block;
  width: 8px;
  height: 14px;
  background: var(--hb-hh12-accent);
  animation: hb-hh12-blink 1.1s steps(1, end) infinite;
}
.hb-hh12-links {
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh12-link {
  display: inline-flex;
  padding: 5px 10px;
  border-radius: 8px;
  color: rgba(201, 255, 224, .66);
  font-size: 12px;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh12-link::before { content: "./"; color: color-mix(in srgb, var(--hb-hh12-accent) 60%, transparent); }
.hb-hh12-link:hover { color: var(--hb-hh12-accent); background: color-mix(in srgb, var(--hb-hh12-accent) 12%, transparent); }
.hb-hh12-tools {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}
.hb-hh12-search {
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: rgba(201, 255, 224, .7);
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh12-search:hover { color: var(--hb-hh12-accent); background: color-mix(in srgb, var(--hb-hh12-accent) 12%, transparent); }
.hb-hh12-outline {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  border: 1px solid color-mix(in srgb, var(--hb-hh12-accent) 55%, transparent);
  border-radius: 8px;
  color: var(--hb-hh12-accent);
  font-size: 12px;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color .2s ease, color .2s ease;
}
.hb-hh12-outline:hover { background: var(--hb-hh12-accent); color: var(--hb-hh12-ink); }
.hb-hh12-stage {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  min-height: 120px;
}
.hb-hh12-foot {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  width: 100%;
  max-width: 640px;
  padding: 0 48px 52px;
}
.hb-hh12-title {
  margin: 0;
  color: #e4fff0;
  font-family: var(--hb-hh12-mono);
  font-size: clamp(28px, 4.2cqi, 60px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -.045em;
  text-wrap: balance;
  text-shadow: 0 0 22px color-mix(in srgb, var(--hb-hh12-accent) 35%, transparent);
  animation: hb-hh12-up .7s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh12-sub {
  max-width: 34em;
  margin: 0;
  color: rgba(201, 255, 224, .7);
  font-size: 13.5px;
  line-height: 1.65;
  text-wrap: pretty;
  animation: hb-hh12-up .7s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh12-caption {
  margin: 0;
  color: color-mix(in srgb, var(--hb-hh12-accent) 80%, transparent);
  font-size: 11px;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.hb-hh12-row {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 100%;
  animation: hb-hh12-up .7s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh12-cmd {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  height: 42px;
  padding: 0 6px 0 14px;
  border: 1px solid color-mix(in srgb, var(--hb-hh12-accent) 38%, transparent);
  border-radius: 8px;
  background: color-mix(in srgb, var(--hb-hh12-accent) 7%, transparent);
}
.hb-hh12-prompt { flex: none; color: var(--hb-hh12-accent); font-size: 12px; font-weight: 700; }
.hb-hh12-code {
  min-width: 0;
  overflow: hidden;
  color: #c9ffe0;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh12-copybtn {
  position: relative;
  display: inline-grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: rgba(201, 255, 224, .7);
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh12-copybtn:hover { color: var(--hb-hh12-accent); background: color-mix(in srgb, var(--hb-hh12-accent) 14%, transparent); }
.hb-hh12-copybtn[data-done="true"] { color: var(--hb-hh12-ink); background: var(--hb-hh12-accent); }
.hb-hh12-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 42px;
  padding: 0 16px;
  border-radius: 8px;
  background: var(--hb-hh12-accent);
  color: var(--hb-hh12-ink);
  font-family: var(--hb-hh12-mono);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 0 24px -6px var(--hb-hh12-accent);
  transition: filter .2s ease;
}
.hb-hh12-cta:hover { filter: brightness(1.12); }
.hb-hh12-cta svg { transition: transform .2s ease; }
.hb-hh12-cta:hover svg { transform: translateX(2px); }
.hb-hh12-more {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 8px;
  color: rgba(201, 255, 224, .7);
  font-size: 12px;
  text-decoration: none;
  transition: color .2s ease;
}
.hb-hh12-more::before { content: "[ "; white-space: pre; }
.hb-hh12-more::after { content: " ]"; white-space: pre; }
.hb-hh12-more:hover { color: var(--hb-hh12-accent); }
.hb-hh12 a:focus-visible, .hb-hh12 button:focus-visible {
  outline: 2px solid var(--hb-hh12-accent);
  outline-offset: 2px;
}
.hb-hh12-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-hh12-foot { max-width: none; padding: 0 22px 36px; }
}
@container (max-width: 640px) {
  .hb-hh12-bar { margin: 12px 12px 0; gap: 10px; }
  .hb-hh12-links, .hb-hh12-outline { display: none; }
  .hb-hh12-stage { min-height: 92cqi; }
  .hb-hh12-sub { font-size: 13px; }
  .hb-hh12-row { flex-direction: column; align-self: stretch; }
  .hb-hh12-cta { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh12-title, .hb-hh12-sub, .hb-hh12-row { animation: none; }
  .hb-hh12-caret { animation: none; }
  .hb-hh12-link, .hb-hh12-search, .hb-hh12-outline, .hb-hh12-copybtn, .hb-hh12-cta, .hb-hh12-cta svg, .hb-hh12-more { transition: none; }
  .hb-hh12-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotHeadLink[] = [
  { label: "docs", href: "#" },
  { label: "api", href: "#" },
  { label: "pricing", href: "#" },
];
const defaultNavCta: HeroDotHeadLink = { label: "Contact sales", href: "#" };
const defaultPrimary: HeroDotHeadLink = { label: "Get API keys", href: "#" };
const defaultMore: HeroDotHeadLink = { label: "See the flow", href: "#" };

const HOT: [number, number, number] = [205, 255, 228];
const ALPHAS = [0.1, 0.22, 0.38, 0.58, 0.8, 0.98];
const TONES = 3;
const LIGHT: [number, number, number] = [-0.4, 0.5, 0.77];
const CENTER_Y = -0.42;
const TAGS: { name: string; x: number; y: number; z: number }[] = [
  { name: "VTX", x: 0, y: 1.08, z: -0.1 },
  { name: "OCC", x: 0, y: 0.32, z: -0.8 },
  { name: "C1", x: 0, y: -0.95, z: -0.34 },
];

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

function smax(a: number, b: number, k: number) {
  return -smin(-a, -b, k);
}

function sockets(x: number, y: number, z: number) {
  return ell(Math.abs(x) - 0.26, y - 0.07, z - 0.7, 0.15, 0.09, 0.12);
}

function skull(x: number, y: number, z: number) {
  const ax = Math.abs(x);
  let d = ell(x, y - 0.3, z + 0.17, 0.68, 0.8, 0.84);
  d = smin(d, ell(x, y + 0.14, z - 0.12, 0.56, 0.66, 0.6), 0.22);
  d = smin(d, ell(x, y - 0.32, z - 0.28, 0.5, 0.36, 0.38), 0.2);
  d = smin(d, ell(ax - 0.3, y + 0.42, z - 0.14, 0.2, 0.24, 0.36), 0.2);
  d = smin(d, ell(x, y + 0.66, z - 0.42, 0.22, 0.15, 0.2), 0.2);
  if (y < -0.3) {
    d = smin(d, capsule(x, y, z, 0, -0.5, -0.12, 0, -1.5, -0.06, 0.27, 0.31), 0.18);
    d = smin(d, ell(x, y + 1.82, z + 0.08, 1.3, 0.48, 0.46), 0.3);
  }
  return d;
}

function headField(x: number, y: number, z: number) {
  const ax = Math.abs(x);
  let d = skull(x, y, z);
  if (z > 0.2 && y > -0.8 && y < 0.5) {
    d = smin(d, ell(ax - 0.36, y + 0.06, z - 0.48, 0.18, 0.15, 0.2), 0.12);
    d = smin(d, capsule(x, y, z, -0.3, 0.2, 0.64, 0.3, 0.2, 0.64, 0.065, 0.065), 0.1);
    d = smin(d, capsule(x, y, z, 0, 0.14, 0.72, 0, -0.17, 0.95, 0.04, 0.07), 0.07);
    d = smin(d, ell(x, y + 0.21, z - 0.86, 0.12, 0.07, 0.08), 0.06);
    d = smin(d, ell(x, y + 0.43, z - 0.73, 0.16, 0.05, 0.07), 0.05);
    d = smin(d, ell(x, y + 0.53, z - 0.7, 0.14, 0.045, 0.07), 0.05);
    d = smax(d, -sockets(x, y, z), 0.06);
    d = smin(d, ell(ax - 0.26, y - 0.06, z - 0.63, 0.09, 0.06, 0.08), 0.02);
  }
  if (ax > 0.45 && y > -0.35 && y < 0.35) d = smin(d, ell(ax - 0.68, y, z + 0.1, 0.07, 0.22, 0.14), 0.06);
  return d;
}

function buildHead(count: number) {
  const raw = surface(headField, [-1.4, -1.98, -1, 1.4, 1.15, 1.1], 0.045, Math.round(count * 1.08), 11000, 9, null, 0.075, 0.6);
  const feat = new Float32Array(raw.n);
  let n = 0;
  for (let i = 0; i < raw.n; i++) {
    const x = raw.x[i];
    const y = raw.y[i];
    const z = raw.z[i];
    if (y < -1.9 || n >= count) continue;
    const f = Math.min(1, Math.abs(skull(x, y, z)) / 0.035);
    const hollow = sockets(x, y, z) < 0.02;
    const fade = y < -1.5 ? Math.max(0.15, (y + 1.9) / 0.4) : 1;
    raw.x[n] = x;
    raw.y[n] = y;
    raw.z[n] = z;
    raw.nx[n] = raw.nx[i];
    raw.ny[n] = raw.ny[i];
    raw.nz[n] = raw.nz[i];
    raw.w[n] = (hollow ? 0.26 : (raw.w[i] ? 0.95 : 0.5) + 0.9 * f) * fade;
    feat[n] = hollow ? 0 : f;
    n++;
  }
  raw.n = n;
  return { cloud: raw, feat };
}

interface Scene {
  cloud: Cloud;
  feat: Float32Array;
  hv: Float32Array;
  px: Float32Array;
  py: Float32Array;
  ss: Float32Array;
  bucket: Uint8Array;
  order: Int32Array;
  counts: Int32Array;
  starts: Int32Array;
  fills: string[];
  acc: [number, number, number];
}

interface View {
  w: number;
  h: number;
  cx: number;
  cy: number;
  R: number;
  top: number;
  time: number;
  curX: number;
  curY: number;
  pace: number;
  still: boolean;
  cut: number;
  dpr: number;
  swing: number;
  scan: boolean;
  compact: boolean;
}

function createScene(count: number, acc: [number, number, number]): Scene {
  const { cloud, feat } = buildHead(count);
  const n = cloud.n;
  const hv = new Float32Array(n);
  for (let i = 0; i < n; i++) hv[i] = hash(i, 55);
  const fills: string[] = [];
  for (let b = 0; b < ALPHAS.length; b++) {
    for (let t = 0; t < TONES; t++) {
      const m = t / (TONES - 1);
      const r = Math.round(acc[0] + (HOT[0] - acc[0]) * m);
      const g = Math.round(acc[1] + (HOT[1] - acc[1]) * m);
      const bl = Math.round(acc[2] + (HOT[2] - acc[2]) * m);
      fills.push(`rgba(${r}, ${g}, ${bl}, ${ALPHAS[b].toFixed(3)})`);
    }
  }
  return {
    cloud,
    feat,
    hv,
    px: new Float32Array(n),
    py: new Float32Array(n),
    ss: new Float32Array(n),
    bucket: new Uint8Array(n),
    order: new Int32Array(n),
    counts: new Int32Array(ALPHAS.length * TONES),
    starts: new Int32Array(ALPHAS.length * TONES),
    fills,
    acc,
  };
}

function fmt(v: number, d: number) {
  return (v >= 0 ? "+" : "-") + Math.abs(v).toFixed(d);
}

function paint(ctx: CanvasRenderingContext2D, s: Scene, v: View) {
  const { w, h, cx, cy, time, pace, R } = v;
  const acc = s.acc;
  const accCss = (a: number) => `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, ${a})`;
  ctx.setTransform(v.dpr, 0, 0, v.dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const base = -Math.PI / 2;
  const yaw = base + (v.still ? 0.08 : Math.sin(time * 0.3 * pace) * v.swing * 0.6) + v.curX * 0.2;
  const pitch = 0.04 + v.curY * 0.1;
  const cY = Math.cos(yaw);
  const sY = Math.sin(yaw);
  const cX = Math.cos(pitch);
  const sX = Math.sin(pitch);
  const ox = cx;
  const oy = cy;

  const c = s.cloud;
  const phase = ((time * pace) / 6.4) % 1;
  const band = v.still ? 0.1 : 1.45 - phase * 3.6;
  const live = v.scan;

  s.counts.fill(0);
  let kept = 0;
  for (let i = 0; i < c.n; i++) {
    const y0 = c.y[i];
    if (y0 < v.cut) {
      s.bucket[i] = 255;
      continue;
    }
    const dy = y0 - band;
    let reveal = 1;
    let core = 0;
    if (live) {
      const trail = dy > 0 ? Math.exp(-dy * 0.62) : 0;
      core = Math.exp(-(dy * dy) / 0.0055);
      reveal = Math.max(trail, core);
      if (s.hv[i] > 0.3 + 0.7 * reveal) {
        s.bucket[i] = 255;
        continue;
      }
    }
    const x = c.x[i];
    const y = y0 - CENTER_Y;
    const z = c.z[i];
    const x1 = x * cY + z * sY;
    const z1 = -x * sY + z * cY;
    const y2 = y * cX - z1 * sX;
    const z2 = y * sX + z1 * cX;
    const p = 1 + z2 * 0.04;
    s.px[i] = ox + x1 * R * p;
    s.py[i] = oy - y2 * R * p;
    const depth = Math.min(1, Math.max(0, (z2 + 1.2) / 2.4));
    const nx = c.nx[i];
    const ny = c.ny[i];
    const nz = c.nz[i];
    const nx1 = nx * cY + nz * sY;
    const nz1 = -nx * sY + nz * cY;
    const ny2 = ny * cX - nz1 * sX;
    const nz2 = ny * sX + nz1 * cX;
    const lam = Math.max(0, LIGHT[0] * nx1 + LIGHT[1] * ny2 + LIGHT[2] * nz2);
    const edge = 1 - Math.abs(nz2);
    const rim = nz2 > -0.4 ? edge * edge * edge : 0;
    const face = nz2 > 0 ? 1 : 0.34;
    let b = c.w[i] * (0.28 + 0.9 * lam * face + 0.8 * rim) * (0.5 + 0.5 * depth) * 1.5;
    if (live) b = b * (0.5 + 0.7 * reveal) + core * 0.7 * face;
    if (b > 0.999) b = 0.999;
    const bi = Math.floor(b * ALPHAS.length);
    let ti = Math.floor(Math.min(1, core * 1.3 + rim * 0.5) * TONES);
    if (ti >= TONES) ti = TONES - 1;
    let sz = (1 + 0.7 * depth) * (R / 150 + 0.55) * (1 + 0.5 * core);
    if (sz < 1.1) sz = 1.1;
    if (sz > 3.4) sz = 3.4;
    s.ss[i] = sz;
    const k = bi * TONES + ti;
    s.bucket[i] = k;
    s.counts[k]++;
    kept++;
  }
  let run = 0;
  for (let k = 0; k < s.counts.length; k++) {
    s.starts[k] = run;
    run += s.counts[k];
  }
  for (let i = 0; i < c.n; i++) if (s.bucket[i] !== 255) s.order[s.starts[s.bucket[i]]++] = i;
  let pos = 0;
  for (let k = 0; k < s.counts.length; k++) {
    const m = s.counts[k];
    if (!m) continue;
    ctx.fillStyle = s.fills[k];
    ctx.beginPath();
    for (let q = pos; q < pos + m; q++) {
      const i = s.order[q];
      const sz = s.ss[i];
      ctx.rect(s.px[i] - sz / 2, s.py[i] - sz / 2, sz, sz);
    }
    ctx.fill();
    pos += m;
  }

  const mono = `${v.compact ? 9.5 : 10.5}px ${"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"}`;
  ctx.font = mono;
  ctx.textBaseline = "middle";
  const rulerX = cx + R * 1.02;
  const lineY = oy - (band - CENTER_Y) * cX * R;
  const inView = lineY > v.top - 4 && lineY < h;

  if (!v.compact) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = accCss(0.4);
    for (let t = -1.5; t <= 1.25; t += 0.25) {
      const ty = oy - (t - CENTER_Y) * cX * R;
      if (ty < v.top || ty > h - 6) continue;
      const major = Math.abs(t - Math.round(t)) < 0.01;
      ctx.beginPath();
      ctx.moveTo(rulerX, Math.round(ty) + 0.5);
      ctx.lineTo(rulerX + (major ? 12 : 6), Math.round(ty) + 0.5);
      ctx.stroke();
      if (major) {
        ctx.fillStyle = accCss(0.55);
        ctx.textAlign = "left";
        ctx.fillText(fmt(t, 1), rulerX + 18, ty);
      }
    }
    ctx.beginPath();
    ctx.moveTo(rulerX + 0.5, Math.max(v.top, oy - (1.3 - CENTER_Y) * cX * R));
    ctx.lineTo(rulerX + 0.5, h);
    ctx.stroke();
  }

  if (live && inView) {
    const x0 = v.compact ? cx - R * 1.35 : cx - R * 1.25;
    const x1l = v.compact ? cx + R * 1.2 : rulerX;
    const grad = ctx.createLinearGradient(x0, 0, x1l, 0);
    grad.addColorStop(0, accCss(0));
    grad.addColorStop(0.18, accCss(0.85));
    grad.addColorStop(1, accCss(0.95));
    ctx.fillStyle = grad;
    ctx.fillRect(x0, Math.round(lineY), x1l - x0, 1.5);
    const glow = ctx.createLinearGradient(0, lineY - 22, 0, lineY);
    glow.addColorStop(0, accCss(0));
    glow.addColorStop(1, accCss(0.1));
    ctx.fillStyle = glow;
    ctx.fillRect(x0, lineY - 22, x1l - x0, 22);
    if (!v.compact) {
      ctx.fillStyle = accCss(1);
      ctx.beginPath();
      ctx.moveTo(rulerX - 2, lineY);
      ctx.lineTo(rulerX - 9, lineY - 4);
      ctx.lineTo(rulerX - 9, lineY + 4);
      ctx.closePath();
      ctx.fill();
    }
  }

  const info = [
    `SCAN ${fmt(band, 2)}`,
    `MESH ${kept.toLocaleString("en-US")} PTS`,
    `YAW  ${fmt(((yaw - base) * 180) / Math.PI, 1)}`,
  ];
  ctx.textAlign = "left";
  ctx.fillStyle = accCss(0.78);
  const ix = v.compact ? 20 : 34;
  const iy = v.top + (v.compact ? 18 : 30);
  for (let q = 0; q < info.length; q++) ctx.fillText(info[q], ix, iy + q * 16);

  if (!v.compact) {
    ctx.textAlign = "left";
    for (let q = 0; q < TAGS.length; q++) {
      const t = TAGS[q];
      const y = t.y - CENTER_Y;
      const x1 = t.x * cY + t.z * sY;
      const z1 = -t.x * sY + t.z * cY;
      const y2 = y * cX - z1 * sX;
      const z2 = y * sX + z1 * cX;
      const p = 1 + z2 * 0.04;
      const sx = ox + x1 * R * p;
      const sy = oy - y2 * R * p;
      const tx = rulerX + 52;
      ctx.strokeStyle = accCss(0.55);
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(tx - 6, sy);
      ctx.stroke();
      ctx.strokeRect(sx - 3.5, sy - 3.5, 7, 7);
      ctx.fillStyle = accCss(0.9);
      ctx.fillText(`${t.name} ${(0.9 + 0.09 * Math.abs(Math.sin(time * 0.7 + q * 2))).toFixed(2)}`, tx, sy);
    }
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
  ctx.fillStyle = "#39ff88";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const hex = hexRgb(out);
  if (hex) return hex;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return [57, 255, 136];
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#02100a";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#02100a" : "#ffffff";
}

function Mark() {
  return (
    <svg className="hb-hh12-mark" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      <path d="M4 5l9 7-9 7" />
      <path d="M14 19h7" />
    </svg>
  );
}

export function HeroDotHead({
  title = "Identity checks in under a second.",
  subtitle = "Verify people at a glance with liveness, document match and fraud signals in a single API call. Built for regulated teams.",
  caption = "0.8 s median · 190 countries · ISO 27001",
  command = "npx hyperblur add hero-dot-head",
  primaryCta = defaultPrimary,
  brand = "facet",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#39ff88",
  density = 1,
  speed = 1,
  swing = 35,
  scan = true,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotHeadProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const bar = barRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !stage || !bar || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mult = Math.min(2, Math.max(0.3, Number.isFinite(density) ? density : 1));
    const pace = Math.max(0, Number.isFinite(speed) ? speed : 1);
    const acc = resolveRgb(accent, ctx);
    const scene = createScene(Math.round(11000 * mult), acc);
    const view: View = {
      w: 0,
      h: 0,
      cx: 0,
      cy: 0,
      R: 0,
      top: 0,
      time: 0,
      curX: 0,
      curY: 0,
      pace,
      still: reduce,
      cut: -9,
      dpr: 1,
      swing: (Math.min(90, Math.max(0, Number.isFinite(swing) ? swing : 35)) * Math.PI) / 180,
      scan,
      compact: false,
    };
    let visible = true;
    let raf = 0;
    let last = 0;
    let pointer = false;
    let ptx = 0;
    let pty = 0;

    function layout() {
      if (!root || !canvas || !stage || !bar) return;
      const rect = root.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      view.w = w;
      view.h = h;
      view.dpr = dpr;
      const br = bar.getBoundingClientRect();
      view.top = br.bottom - rect.top;
      if (w < 640) {
        const st = stage.getBoundingClientRect();
        const sh = st.height;
        view.compact = true;
        view.R = sh / 2.75;
        view.cx = w * 0.56;
        view.cy = st.top - rect.top + view.R * 1.57;
        view.cut = -1.42;
      } else {
        view.compact = false;
        view.R = Math.min(h * 0.31, w * 0.23);
        view.cx = w * 0.66;
        view.cy = h * 0.57;
        view.cut = -9;
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
      const tx = pointer ? ptx : 0;
      const ty = pointer ? pty : 0;
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
  }, [accent, density, speed, swing, scan]);

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
  const vars = { "--hb-hh12-accent": accent, "--hb-hh12-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh12 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-head" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh12-canvas" aria-hidden="true" />
      <header ref={barRef} className="hb-hh12-bar">
        <a className="hb-hh12-brand" href="#">
          <Mark />
          <span>{brand}</span>
          <span className="hb-hh12-caret" aria-hidden="true" />
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-hh12-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh12-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <div className="hb-hh12-tools">
          <button type="button" className="hb-hh12-search" aria-label="Search" onClick={onSearch}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh12-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh12-stage" aria-hidden="true" />
      <div className="hb-hh12-foot">
        <Heading className="hb-hh12-title">{title}</Heading>
        {subtitle ? <p className="hb-hh12-sub">{subtitle}</p> : null}
        {command || primaryCta ? (
          <div className="hb-hh12-row">
            {command ? (
              <div className="hb-hh12-cmd">
                <span className="hb-hh12-prompt" aria-hidden="true">$</span>
                <code className="hb-hh12-code">{command}</code>
                <button type="button" className="hb-hh12-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                  <span className="hb-hh12-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                </button>
              </div>
            ) : null}
            {primaryCta ? (
              <a className="hb-hh12-cta" href={primaryCta.href}>
                {primaryCta.label}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </a>
            ) : null}
            {learnMore ? (
              <a className="hb-hh12-more" href={learnMore.href}>
                {learnMore.label}
              </a>
            ) : null}
          </div>
        ) : null}
        {caption ? <p className="hb-hh12-caption">{caption}</p> : null}
      </div>
    </section>
  );
}
