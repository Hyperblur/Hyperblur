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
  --hb-hh11-accent: #c084fc;
  --hb-hh11-ink: #0d0814;
  --hb-hh11-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 620px;
  overflow: hidden;
  container-type: inline-size;
  background:
    radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--hb-hh11-accent) 7%, transparent), transparent 70%),
    #020202;
  color: #ededed;
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
.hb-hh11::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 52%;
  pointer-events: none;
  background: linear-gradient(to top, #020202 0%, rgba(2, 2, 2, .86) 38%, rgba(2, 2, 2, 0) 100%);
}
.hb-hh11-bar {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 18px 32px;
}
.hb-hh11-brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  justify-self: start;
  color: #f4f4f4;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  border-radius: 6px;
}
.hb-hh11-mark { flex: none; color: var(--hb-hh11-accent); }
.hb-hh11-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh11-link {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--hb-hh11-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh11-link:hover { color: #ededed; background: rgba(255, 255, 255, .05); }
.hb-hh11-tools {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.hb-hh11-search {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh11-search:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-hh11-outline {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #ededed;
  font-family: var(--hb-hh11-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-hh11-outline:hover { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .04); }
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
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 28px 40px;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 32px 76px;
}
.hb-hh11-copy { min-width: 0; }
.hb-hh11-title {
  max-width: 11em;
  margin: 0;
  color: #f5f5f5;
  font-size: clamp(28px, 5.4cqi, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-hh11-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh11-sub {
  max-width: 34em;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
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
  color: #6f6f6f;
  font-family: var(--hb-hh11-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-hh11-caption b { color: var(--hb-hh11-accent); font-weight: 500; }
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
  height: 42px;
  padding: 0 6px 0 14px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 10px;
  background: rgba(14, 14, 14, .82);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.hb-hh11-prompt { flex: none; color: var(--hb-hh11-accent); font-family: var(--hb-hh11-mono); font-size: 12px; }
.hb-hh11-code {
  min-width: 0;
  overflow: hidden;
  color: #d6d6d6;
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
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh11-copybtn:hover { color: #ededed; background: rgba(255, 255, 255, .07); }
.hb-hh11-copybtn[data-done="true"] { color: var(--hb-hh11-accent); }
.hb-hh11-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 10px;
  background: var(--hb-hh11-accent);
  color: var(--hb-hh11-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 28px -10px var(--hb-hh11-accent);
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh11-cta:hover { filter: brightness(1.08); }
.hb-hh11-cta svg { transition: transform .2s ease; }
.hb-hh11-cta:hover svg { transform: translateX(2px); }
.hb-hh11-more {
  position: absolute;
  left: 50%;
  bottom: 18px;
  z-index: 2;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px 8px;
  border-radius: 6px;
  color: #6f6f6f;
  font-family: var(--hb-hh11-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-hh11-more:hover { color: #ededed; }
.hb-hh11-more svg { animation: hb-hh11-bob 1.8s ease-in-out infinite; }
.hb-hh11 a:focus-visible, .hb-hh11 button:focus-visible {
  outline: 2px solid var(--hb-hh11-accent);
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
@container (max-width: 760px) {
  .hb-hh11-foot { grid-template-columns: minmax(0, 1fr); padding: 0 24px 72px; }
  .hb-hh11-bar { padding: 16px 24px; }
}
@container (max-width: 640px) {
  .hb-hh11-bar { grid-template-columns: 1fr auto; }
  .hb-hh11-links, .hb-hh11-search { display: none; }
  .hb-hh11-stage { min-height: calc(80cqi + 24px); }
  .hb-hh11-sub { font-size: 14px; }
  .hb-hh11-side, .hb-hh11-row { align-self: stretch; }
  .hb-hh11-row { flex-direction: column; }
  .hb-hh11-cta { width: 100%; }
}
@container (max-width: 360px) {
  .hb-hh11-bar { padding: 14px 18px; }
  .hb-hh11-foot { padding: 0 18px 68px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh11-title, .hb-hh11-sub, .hb-hh11-side, .hb-hh11-more svg { animation: none; }
  .hb-hh11-link, .hb-hh11-search, .hb-hh11-outline, .hb-hh11-copybtn, .hb-hh11-cta, .hb-hh11-cta svg, .hb-hh11-more { transition: none; }
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
const WARM: [number, number, number] = [255, 243, 224];
const ALPHAS = [0.06, 0.14, 0.26, 0.42, 0.62, 0.9];
const TONES = 4;
const LIGHT: [number, number, number] = [-0.36, 0.56, 0.75];

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
  return -smin(-d, ax - 0.022, 0.05);
}

function buildBrain(count: number, folds: number): Cloud {
  const depth = 0.03 * folds;
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
  const line = (x: number, y: number, z: number) => {
    const s = gyri(x, y, z);
    const l = fissure(x, y, z);
    return Math.max(Math.exp(-s * s * 6), Math.exp(-(l * l) / 0.002));
  };
  const accept: Field = (x, y, z) => (cerebrum(x, y, z) > 0.08 ? 0.5 : 1 - bias + bias * line(x, y, z));
  const cloud = surface(field, [-0.85, -0.9, -1, 0.85, 0.75, 1], 0.04, count, 12000, 5, accept, 0, 0);
  for (let i = 0; i < cloud.n; i++) {
    const x = cloud.x[i];
    const y = cloud.y[i];
    const z = cloud.z[i];
    cloud.w[i] = cerebrum(x, y, z) < 0.06 ? 0.3 + 1.05 * bias * line(x, y, z) + (1 - bias) * 0.5 : 0.75;
  }
  return cloud;
}

function buildPaths(cloud: Cloud, paths: number, steps: number, salt: number) {
  const G = 0.08;
  const S = 32;
  const key = (x: number, y: number, z: number) => {
    const i = Math.min(S - 1, Math.max(0, Math.floor((x + 1.28) / G)));
    const j = Math.min(S - 1, Math.max(0, Math.floor((y + 1.28) / G)));
    const k = Math.min(S - 1, Math.max(0, Math.floor((z + 1.28) / G)));
    return i + j * S + k * S * S;
  };
  const n = cloud.n;
  const start = new Int32Array(S * S * S + 1);
  const keys = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    keys[i] = key(cloud.x[i], cloud.y[i], cloud.z[i]);
    start[keys[i] + 1]++;
  }
  for (let c = 0; c < S * S * S; c++) start[c + 1] += start[c];
  const fill = start.slice(0, S * S * S);
  const items = new Int32Array(n);
  for (let i = 0; i < n; i++) items[fill[keys[i]]++] = i;
  const out = new Int32Array(paths * steps);
  for (let p = 0; p < paths; p++) {
    let cur = Math.floor(hash(p, salt) * n);
    for (let tries = 0; tries < 20 && cloud.y[cur] < -0.1; tries++) cur = Math.floor(hash(p * 31 + tries, salt + 1) * n);
    const a = hash(p, salt + 2) * TAU;
    let dx = Math.cos(a);
    let dy = Math.sin(a) * 0.6;
    let dz = Math.sin(a * 1.7);
    for (let s = 0; s < steps; s++) {
      out[p * steps + s] = cur;
      const x = cloud.x[cur];
      const y = cloud.y[cur];
      const z = cloud.z[cur];
      const bi = Math.min(S - 1, Math.max(0, Math.floor((x + 1.28) / G)));
      const bj = Math.min(S - 1, Math.max(0, Math.floor((y + 1.28) / G)));
      const bk = Math.min(S - 1, Math.max(0, Math.floor((z + 1.28) / G)));
      let best = -1;
      let score = -9;
      for (let k = Math.max(0, bk - 1); k <= Math.min(S - 1, bk + 1); k++) {
        for (let j = Math.max(0, bj - 1); j <= Math.min(S - 1, bj + 1); j++) {
          for (let i = Math.max(0, bi - 1); i <= Math.min(S - 1, bi + 1); i++) {
            const c = i + j * S + k * S * S;
            for (let q = start[c]; q < start[c + 1]; q++) {
              const o = items[q];
              const ex = cloud.x[o] - x;
              const ey = cloud.y[o] - y;
              const ez = cloud.z[o] - z;
              const dd = Math.sqrt(ex * ex + ey * ey + ez * ez);
              if (dd < 0.022 || dd > 0.06) continue;
              const sc = (ex * dx + ey * dy + ez * dz) / dd + cloud.w[o] * 0.35;
              if (sc > score) {
                score = sc;
                best = o;
              }
            }
          }
        }
      }
      if (best < 0) best = cur;
      const ex = cloud.x[best] - x;
      const ey = cloud.y[best] - y;
      const ez = cloud.z[best] - z;
      const dd = Math.sqrt(ex * ex + ey * ey + ez * ez) || 1;
      const wob = (hash(p * 977 + s, salt + 3) - 0.5) * 0.5;
      dx = dx * 0.55 + (ex / dd) * 0.45 + wob;
      dy = dy * 0.55 + (ey / dd) * 0.45 - wob * 0.5;
      dz = dz * 0.55 + (ez / dd) * 0.45;
      const dl = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
      dx /= dl;
      dy /= dl;
      dz /= dl;
      cur = best;
    }
  }
  return out;
}

interface Scene {
  cloud: Cloud;
  total: number;
  rings: number;
  px: Float32Array;
  py: Float32Array;
  pz: Float32Array;
  bs: Float32Array;
  sx: Float32Array;
  sy: Float32Array;
  ss: Float32Array;
  sd: Float32Array;
  bucket: Uint8Array;
  order: Int32Array;
  counts: Int32Array;
  starts: Int32Array;
  fills: string[];
  acc: [number, number, number];
  paths: Int32Array;
  npaths: number;
  steps: number;
  flashes: number;
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

const RING_R = [0.5, 0.78, 1.06];
const RING_N = [70, 104, 140];
const BASE_Y = -1.08;

function createScene(count: number, folds: number, activity: number, acc: [number, number, number]): Scene {
  const cloud = buildBrain(count, folds);
  const rings = RING_N[0] + RING_N[1] + RING_N[2];
  const total = cloud.n + rings;
  const bs = new Float32Array(total);
  for (let i = 0; i < total; i++) bs[i] = 0.78 + hash(i, 3) * 0.4;
  const fills: string[] = [];
  for (let b = 0; b < ALPHAS.length; b++) {
    for (let t = 0; t < TONES; t++) {
      const m = t / (TONES - 1);
      const r = Math.round(WARM[0] + (acc[0] - WARM[0]) * m);
      const g = Math.round(WARM[1] + (acc[1] - WARM[1]) * m);
      const bl = Math.round(WARM[2] + (acc[2] - WARM[2]) * m);
      fills.push(`rgba(${r}, ${g}, ${bl}, ${ALPHAS[b].toFixed(3)})`);
    }
  }
  const npaths = Math.round(9 * activity);
  const steps = 64;
  return {
    cloud,
    total,
    rings,
    px: new Float32Array(total),
    py: new Float32Array(total),
    pz: new Float32Array(total),
    bs,
    sx: new Float32Array(total),
    sy: new Float32Array(total),
    ss: new Float32Array(total),
    sd: new Float32Array(total),
    bucket: new Uint8Array(total),
    order: new Int32Array(total),
    counts: new Int32Array(ALPHAS.length * TONES),
    starts: new Int32Array(ALPHAS.length * TONES),
    fills,
    acc,
    paths: npaths > 0 ? buildPaths(cloud, npaths, steps, 17) : new Int32Array(0),
    npaths,
    steps,
    flashes: Math.round(5 * activity),
  };
}

function paint(ctx: CanvasRenderingContext2D, s: Scene, v: View) {
  const { w, h, cx, cy, R, time, pace } = v;
  const acc = s.acc;
  ctx.setTransform(v.dpr, 0, 0, v.dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const glow = ctx.createRadialGradient(cx, cy, R * 0.15, cx, cy, R * 1.5);
  glow.addColorStop(0, `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0.11)`);
  glow.addColorStop(1, `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  const yaw = 0.95 + Math.sin(time * 0.23 * pace) * 0.38 + v.curX * 0.55;
  const pitch = 0.2 + Math.sin(time * 0.17 * pace + 1) * 0.05 + v.curY * 0.24;
  const cY = Math.cos(yaw);
  const sY = Math.sin(yaw);
  const cX = Math.cos(pitch);
  const sX = Math.sin(pitch);
  const ox = cx + v.curX * R * 0.05;
  const oy = cy + v.curY * R * 0.04;
  const yc = -0.16;

  const by = (BASE_Y - yc) * cX;
  const baseY = oy - by * R;
  const coneTop = oy + 0.25 * R;
  const cone = ctx.createLinearGradient(0, baseY, 0, coneTop);
  cone.addColorStop(0, `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0.12)`);
  cone.addColorStop(1, `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0)`);
  ctx.fillStyle = cone;
  ctx.beginPath();
  ctx.moveTo(ox - R * 0.98, baseY);
  ctx.lineTo(ox - R * 0.42, coneTop);
  ctx.lineTo(ox + R * 0.42, coneTop);
  ctx.lineTo(ox + R * 0.98, baseY);
  ctx.closePath();
  ctx.fill();

  const c = s.cloud;
  const n = Math.min(c.n, v.limit);
  const span = 2.1;
  const phase = ((time * pace) / 6) % 1;
  const band = v.still ? 9 : -1.25 + phase * span * 1.25;
  let flick = 1;
  if (!v.still) {
    const slot = Math.floor(time * 3);
    if (hash(slot, 91) < 0.07) flick = 1 - 0.1 * Math.sin(((time * 3) % 1) * Math.PI);
  }

  let ri = c.n;
  for (let r = 0; r < 3; r++) {
    const rr = RING_R[r];
    const rn = RING_N[r];
    const drift = time * pace * (r % 2 ? -0.08 : 0.06);
    for (let k = 0; k < rn; k++, ri++) {
      const a = (k / rn) * TAU + drift;
      s.px[ri] = Math.cos(a) * rr;
      s.py[ri] = BASE_Y;
      s.pz[ri] = Math.sin(a) * rr;
    }
  }

  s.counts.fill(0);
  const L0 = LIGHT[0];
  const L1 = LIGHT[1];
  const L2 = LIGHT[2];
  for (let i = 0; i < s.total; i++) {
    if (i >= n && i < c.n) {
      s.bucket[i] = 255;
      continue;
    }
    const ring = i >= c.n;
    const x = ring ? s.px[i] : c.x[i];
    const y = ring ? s.py[i] : c.y[i];
    const z = ring ? s.pz[i] : c.z[i];
    const x1 = x * cY + z * sY;
    const z1 = -x * sY + z * cY;
    const y2 = (y - yc) * cX - z1 * sX;
    const z2 = (y - yc) * sX + z1 * cX;
    const p = 1 + z2 * 0.06;
    s.sx[i] = ox + x1 * R * p;
    s.sy[i] = oy - y2 * R * p;
    const depth = Math.min(1, Math.max(0, (z2 + 1.1) / 2.2));
    s.sd[i] = depth;
    let b: number;
    let tone: number;
    if (ring) {
      b = 0.3 + 0.5 * depth;
      tone = 0.75;
    } else {
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
      const face = nz2 > 0 ? 1 : 0.3;
      b = c.w[i] * (0.3 + 0.95 * lam * face + 0.9 * rim) * (0.42 + 0.58 * depth) * 1.45;
      const dy = y2 - band;
      b += Math.exp(-(dy * dy) / 0.005) * 0.6 * (0.35 + c.w[i] * 0.5);
      tone = Math.min(1, rim * 1.5 + (1 - depth) * 0.35);
    }
    b *= flick;
    if (b > 0.999) b = 0.999;
    const bi = Math.floor(b * ALPHAS.length);
    let ti = Math.floor(tone * TONES);
    if (ti >= TONES) ti = TONES - 1;
    let sz = s.bs[i] * (0.62 + 0.6 * depth);
    if (sz > 1.4) sz = 1.4;
    if (sz < 0.6) sz = 0.6;
    s.ss[i] = sz;
    const k = bi * TONES + ti;
    s.bucket[i] = k;
    s.counts[k]++;
  }
  let run = 0;
  for (let k = 0; k < s.counts.length; k++) {
    s.starts[k] = run;
    run += s.counts[k];
  }
  for (let i = 0; i < s.total; i++) if (s.bucket[i] !== 255) s.order[s.starts[s.bucket[i]]++] = i;
  let pos = 0;
  for (let k = 0; k < s.counts.length; k++) {
    const m = s.counts[k];
    if (!m) continue;
    ctx.fillStyle = s.fills[k];
    ctx.beginPath();
    for (let q = pos; q < pos + m; q++) {
      const i = s.order[q];
      const sz = s.ss[i];
      ctx.rect(s.sx[i] - sz / 2, s.sy[i] - sz / 2, sz, sz);
    }
    ctx.fill();
    pos += m;
  }

  const hot = `rgb(${Math.round((255 + acc[0]) / 2)}, ${Math.round((250 + acc[1]) / 2)}, ${Math.round((245 + acc[2]) / 2)})`;
  ctx.fillStyle = hot;
  const tail = 11;
  for (let p = 0; p < s.npaths; p++) {
    const sp = 0.07 + hash(p, 51) * 0.06;
    const head = (((v.still ? 0.35 : time * pace * sp) + hash(p, 52)) % 1) * (s.steps + tail);
    for (let j = 0; j < tail; j++) {
      const f = head - j * 0.9;
      if (f < 0 || f >= s.steps - 1) continue;
      const a = Math.floor(f);
      const u = f - a;
      const ia = s.paths[p * s.steps + a];
      const ib = s.paths[p * s.steps + a + 1];
      if (ia >= n || ib >= n) continue;
      const d = s.sd[ia];
      const al = (1 - j / tail) * (0.25 + 0.75 * d) * flick;
      if (al <= 0.02) continue;
      ctx.globalAlpha = al;
      const qx = s.sx[ia] + (s.sx[ib] - s.sx[ia]) * u;
      const qy = s.sy[ia] + (s.sy[ib] - s.sy[ia]) * u;
      const sz = j === 0 ? 2 : 1.4;
      ctx.fillRect(qx - sz / 2, qy - sz / 2, sz, sz);
    }
  }
  for (let k = 0; k < s.flashes && n > 0; k++) {
    const period = 2.6 + hash(k, 61) * 2.4;
    const tt = (v.still ? 1 : time * pace) + hash(k, 62) * period;
    const cyc = Math.floor(tt / period);
    const lt = (tt - cyc * period) / 0.7;
    if (lt > 1) continue;
    const i = Math.floor(hash(k * 131 + cyc, 63) * n);
    const d = s.sd[i];
    if (d < 0.45) continue;
    const fx = s.sx[i];
    const fy = s.sy[i];
    const fade = (1 - lt) * flick;
    ctx.globalAlpha = fade;
    ctx.fillRect(fx - 1.4, fy - 1.4, 2.8, 2.8);
    const rad = 3 + lt * 16;
    ctx.globalAlpha = fade * 0.7;
    for (let q = 0; q < 8; q++) {
      const a = (q / 8) * TAU + k;
      ctx.fillRect(fx + Math.cos(a) * rad - 0.6, fy + Math.sin(a) * rad * 0.8 - 0.6, 1.2, 1.2);
    }
  }
  ctx.globalAlpha = 1;
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
  ctx.fillStyle = "#c084fc";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const hex = hexRgb(out);
  if (hex) return hex;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return [192, 132, 252];
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#0d0814";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#0d0814" : "#ffffff";
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
  title = "A second brain for your whole team.",
  subtitle = "Capture notes, decisions and docs in one place, then find anything in milliseconds. Local-first and end-to-end encrypted.",
  caption = "12 ms search · 40k teams · SOC 2 Type II",
  command = "npx hyperblur add hero-dot-brain",
  primaryCta = defaultPrimary,
  brand = "Cortexa",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#c084fc",
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
    const scene = createScene(Math.round(11000 * mult), Math.min(2, Math.max(0, Number.isFinite(folds) ? folds : 1)), Math.min(3, Math.max(0, Number.isFinite(activity) ? activity : 1)), acc);
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
      view.cx = w / 2;
      if (w < 640) {
        const st = stage.getBoundingClientRect();
        view.R = w * 0.36;
        view.cy = st.top - rect.top + st.height / 2;
        view.limit = Math.round(scene.cloud.n * 0.6);
      } else {
        view.R = Math.min(w * 0.27, h * 0.36);
        view.cy = h * 0.46;
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
        ) : (
          <span />
        )}
        <div className="hb-hh11-tools">
          <button type="button" className="hb-hh11-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh11-outline" href={navCta.href}>
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
