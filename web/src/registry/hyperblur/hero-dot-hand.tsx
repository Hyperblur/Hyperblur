"use client";

import * as React from "react";

export interface HeroDotHandLink {
  label: string;
  href: string;
}

export interface HeroDotHandProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotHandLink | null;
  brand?: string;
  nav?: HeroDotHandLink[];
  navCta?: HeroDotHandLink | null;
  learnMore?: HeroDotHandLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  wave?: number;
  curl?: boolean;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh13-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh13-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
.hb-hh13 {
  --hb-hh13-accent: #ff8a5b;
  --hb-hh13-ink: #0d0814;
  --hb-hh13-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
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
    radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--hb-hh13-accent) 7%, transparent), transparent 70%),
    #020202;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hh13 *, .hb-hh13 *::before, .hb-hh13 *::after { box-sizing: border-box; }
.hb-hh13-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh13::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 52%;
  pointer-events: none;
  background: linear-gradient(to top, #020202 0%, rgba(2, 2, 2, .86) 38%, rgba(2, 2, 2, 0) 100%);
}
.hb-hh13-bar {
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
.hb-hh13-brand {
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
.hb-hh13-mark { flex: none; color: var(--hb-hh13-accent); }
.hb-hh13-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh13-link {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--hb-hh13-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh13-link:hover { color: #ededed; background: rgba(255, 255, 255, .05); }
.hb-hh13-tools {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.hb-hh13-search {
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
.hb-hh13-search:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-hh13-outline {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #ededed;
  font-family: var(--hb-hh13-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-hh13-outline:hover { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .04); }
.hb-hh13-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 240px;
}
.hb-hh13-foot {
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
.hb-hh13-copy { min-width: 0; }
.hb-hh13-title {
  max-width: 11em;
  margin: 0;
  color: #f5f5f5;
  font-size: clamp(28px, 5.4cqi, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-hh13-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh13-sub {
  max-width: 34em;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-hh13-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh13-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-hh13-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh13-caption {
  margin: 0;
  color: #6f6f6f;
  font-family: var(--hb-hh13-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-hh13-caption b { color: var(--hb-hh13-accent); font-weight: 500; }
.hb-hh13-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-hh13-cmd {
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
.hb-hh13-prompt { flex: none; color: var(--hb-hh13-accent); font-family: var(--hb-hh13-mono); font-size: 12px; }
.hb-hh13-code {
  min-width: 0;
  overflow: hidden;
  color: #d6d6d6;
  font-family: var(--hb-hh13-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh13-copybtn {
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
.hb-hh13-copybtn:hover { color: #ededed; background: rgba(255, 255, 255, .07); }
.hb-hh13-copybtn[data-done="true"] { color: var(--hb-hh13-accent); }
.hb-hh13-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 10px;
  background: var(--hb-hh13-accent);
  color: var(--hb-hh13-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 28px -10px var(--hb-hh13-accent);
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh13-cta:hover { filter: brightness(1.08); }
.hb-hh13-cta svg { transition: transform .2s ease; }
.hb-hh13-cta:hover svg { transform: translateX(2px); }
.hb-hh13-more {
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
  font-family: var(--hb-hh13-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-hh13-more:hover { color: #ededed; }
.hb-hh13-more svg { animation: hb-hh13-bob 1.8s ease-in-out infinite; }
.hb-hh13 a:focus-visible, .hb-hh13 button:focus-visible {
  outline: 2px solid var(--hb-hh13-accent);
  outline-offset: 2px;
}
.hb-hh13-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-hh13-foot { grid-template-columns: minmax(0, 1fr); padding: 0 24px 72px; }
  .hb-hh13-bar { padding: 16px 24px; }
}
@container (max-width: 640px) {
  .hb-hh13-bar { grid-template-columns: 1fr auto; }
  .hb-hh13-links, .hb-hh13-search { display: none; }
  .hb-hh13-stage { min-height: calc(80cqi + 24px); }
  .hb-hh13-sub { font-size: 14px; }
  .hb-hh13-side, .hb-hh13-row { align-self: stretch; }
  .hb-hh13-row { flex-direction: column; }
  .hb-hh13-cta { width: 100%; }
}
@container (max-width: 360px) {
  .hb-hh13-bar { padding: 14px 18px; }
  .hb-hh13-foot { padding: 0 18px 68px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh13-title, .hb-hh13-sub, .hb-hh13-side, .hb-hh13-more svg { animation: none; }
  .hb-hh13-link, .hb-hh13-search, .hb-hh13-outline, .hb-hh13-copybtn, .hb-hh13-cta, .hb-hh13-cta svg, .hb-hh13-more { transition: none; }
  .hb-hh13-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotHandLink[] = [
  { label: "Gestures", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Showcase", href: "#" },
];
const defaultNavCta: HeroDotHandLink = { label: "Sign in", href: "#" };
const defaultPrimary: HeroDotHandLink = { label: "Try the demo", href: "#" };
const defaultMore: HeroDotHandLink = { label: "Watch it move", href: "#" };

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

const FINGERS = [
  { x: -0.31, y: 0.46, a: 0.14, l: [0.45, 0.27, 0.21], r: 0.082 },
  { x: -0.1, y: 0.5, a: 0.04, l: [0.49, 0.3, 0.22], r: 0.086 },
  { x: 0.11, y: 0.48, a: -0.05, l: [0.46, 0.28, 0.21], r: 0.081 },
  { x: 0.31, y: 0.41, a: -0.16, l: [0.36, 0.23, 0.19], r: 0.07 },
];
const THUMB = { x: -0.3, y: -0.3, z: 0.06, l: [0.36, 0.28, 0.23], r: 0.095 };
const REST = [0.12, 0.16, 0.1];
const BONES = 16;

function chain(f: number, th: number[], out: Float32Array) {
  let m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number;
  let ox: number, oy: number, oz: number;
  let lens: number[];
  if (f < 4) {
    const g = FINGERS[f];
    const c = Math.cos(g.a);
    const s = Math.sin(g.a);
    m00 = c; m01 = -s; m02 = 0;
    m10 = s; m11 = c; m12 = 0;
    m20 = 0; m21 = 0; m22 = 1;
    ox = g.x; oy = g.y; oz = 0;
    lens = g.l;
  } else {
    const cz = Math.cos(0.85);
    const sz = Math.sin(0.85);
    const cy = Math.cos(0.7);
    const sy = Math.sin(0.7);
    m00 = cz * cy; m01 = -sz; m02 = cz * sy;
    m10 = sz * cy; m11 = cz; m12 = sz * sy;
    m20 = -sy; m21 = 0; m22 = cy;
    ox = THUMB.x; oy = THUMB.y; oz = THUMB.z;
    lens = THUMB.l;
  }
  for (let j = 0; j < 3; j++) {
    const c = Math.cos(th[j]);
    const s = Math.sin(th[j]);
    const a01 = m01 * c + m02 * s;
    const a02 = -m01 * s + m02 * c;
    const a11 = m11 * c + m12 * s;
    const a12 = -m11 * s + m12 * c;
    const a21 = m21 * c + m22 * s;
    const a22 = -m21 * s + m22 * c;
    m01 = a01; m02 = a02; m11 = a11; m12 = a12; m21 = a21; m22 = a22;
    const o = (1 + f * 3 + j) * 12;
    out[o] = m00; out[o + 1] = m01; out[o + 2] = m02;
    out[o + 3] = m10; out[o + 4] = m11; out[o + 5] = m12;
    out[o + 6] = m20; out[o + 7] = m21; out[o + 8] = m22;
    out[o + 9] = ox; out[o + 10] = oy; out[o + 11] = oz;
    ox += m01 * lens[j];
    oy += m11 * lens[j];
    oz += m21 * lens[j];
  }
}

function pose(th: Float32Array, out: Float32Array) {
  out[0] = 1; out[1] = 0; out[2] = 0;
  out[3] = 0; out[4] = 1; out[5] = 0;
  out[6] = 0; out[7] = 0; out[8] = 1;
  out[9] = 0; out[10] = 0; out[11] = 0;
  for (let f = 0; f < 5; f++) chain(f, [th[f * 3], th[f * 3 + 1], th[f * 3 + 2]], out);
}

function restAngles() {
  const th = new Float32Array(15);
  for (let f = 0; f < 5; f++) for (let j = 0; j < 3; j++) th[f * 3 + j] = REST[j] * (f === 4 ? 0.8 : 1);
  return th;
}

function boneLen(b: number) {
  const f = Math.floor((b - 1) / 3);
  const j = (b - 1) % 3;
  return f < 4 ? FINGERS[f].l[j] : THUMB.l[j];
}

function boneRad(b: number) {
  const f = Math.floor((b - 1) / 3);
  const j = (b - 1) % 3;
  const r = f < 4 ? FINGERS[f].r : THUMB.r;
  return r * (1 - j * 0.09);
}

function boneDist(m: Float32Array, b: number, x: number, y: number, z: number) {
  if (b === 0) {
    const qx = Math.abs(x) - 0.3 - 0.05 * y;
    const qy = Math.abs(y - 0.04) - 0.34;
    const qz = Math.abs(z) - 0.02;
    const ex = Math.max(qx, 0);
    const ey = Math.max(qy, 0);
    const ez = Math.max(qz, 0);
    let d = Math.sqrt(ex * ex + ey * ey + ez * ez) + Math.min(Math.max(qx, qy, qz), 0) - 0.12;
    d = smin(d, ell(x + 0.2, y + 0.2, z - 0.04, 0.2, 0.26, 0.13), 0.08);
    d = smin(d, capsule(x * 1.25, y, z * 1.1, 0, -0.38, 0, 0, -1.1, -0.02, 0.27, 0.25), 0.12);
    return d;
  }
  const o = b * 12;
  const len = boneLen(b);
  const ex = m[o + 9] + m[o + 1] * len;
  const ey = m[o + 10] + m[o + 4] * len;
  const ez = m[o + 11] + m[o + 7] * len;
  const r = boneRad(b);
  return capsule(x, y, z, m[o + 9], m[o + 10], m[o + 11], ex, ey, ez, r, r * 0.93);
}

function buildHand(count: number) {
  const rest = new Float32Array(BONES * 12);
  pose(restAngles(), rest);
  const field: Field = (x, y, z) => {
    let d = boneDist(rest, 0, x, y, z);
    for (let f = 0; f < 5; f++) {
      const b = 1 + f * 3;
      let e = boneDist(rest, b, x, y, z);
      e = smin(e, boneDist(rest, b + 1, x, y, z), 0.03);
      e = smin(e, boneDist(rest, b + 2, x, y, z), 0.025);
      d = smin(d, e, f === 4 ? 0.12 : 0.07);
    }
    return d;
  };
  const cloud = surface(field, [-0.95, -1.1, -0.45, 0.75, 1.6, 0.6], 0.032, count, 10000, 13, null, 0.055, 0.35);
  const b1 = new Uint8Array(cloud.n);
  const b2 = new Uint8Array(cloud.n);
  const bw = new Float32Array(cloud.n);
  for (let i = 0; i < cloud.n; i++) {
    const x = cloud.x[i];
    const y = cloud.y[i];
    const z = cloud.z[i];
    let best = 0;
    let bd = 9;
    let next = 0;
    let nd = 9;
    for (let b = 0; b < BONES; b++) {
      const d = boneDist(rest, b, x, y, z);
      if (d < bd) {
        next = best;
        nd = bd;
        best = b;
        bd = d;
      } else if (d < nd) {
        next = b;
        nd = d;
      }
    }
    const lo = Math.min(best, next);
    const hi = Math.max(best, next);
    const linked = lo === 0 ? (hi - 1) % 3 === 0 : hi - lo === 1 && Math.floor((hi - 1) / 3) === Math.floor((lo - 1) / 3);
    b1[i] = best;
    b2[i] = linked ? next : best;
    bw[i] = linked ? Math.max(0, 0.5 - (nd - bd) / 0.1) : 0;
    const fade = y < -0.8 ? Math.max(0.1, (y + 1.1) / 0.3) : 1;
    cloud.w[i] = (cloud.w[i] ? 0.95 : 0.6) * fade;
  }
  return { cloud, rest, b1, b2, bw };
}

interface Scene {
  cloud: Cloud;
  rest: Float32Array;
  cur: Float32Array;
  delta: Float32Array;
  th: Float32Array;
  b1: Uint8Array;
  b2: Uint8Array;
  bw: Float32Array;
  total: number;
  px: Float32Array;
  py: Float32Array;
  pz: Float32Array;
  bs: Float32Array;
  sx: Float32Array;
  sy: Float32Array;
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
  time: number;
  curX: number;
  curY: number;
  pace: number;
  still: boolean;
  limit: number;
  dpr: number;
  wave: number;
  grip: number;
}

const RING_R = [0.5, 0.76, 1.02];
const RING_N = [70, 100, 136];
const CUFF_N = 64;
const BASE_Y = -1.28;
const UNIT = 0.74;
const CENTER_Y = 0.12;

function createScene(count: number, acc: [number, number, number]): Scene {
  const { cloud, rest, b1, b2, bw } = buildHand(count);
  const total = cloud.n + RING_N[0] + RING_N[1] + RING_N[2] + CUFF_N * 2;
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
  return {
    cloud,
    rest,
    cur: new Float32Array(BONES * 12),
    delta: new Float32Array(BONES * 12),
    th: new Float32Array(15),
    b1,
    b2,
    bw,
    total,
    px: new Float32Array(total),
    py: new Float32Array(total),
    pz: new Float32Array(total),
    bs,
    sx: new Float32Array(total),
    sy: new Float32Array(total),
    ss: new Float32Array(total),
    bucket: new Uint8Array(total),
    order: new Int32Array(total),
    counts: new Int32Array(ALPHAS.length * TONES),
    starts: new Int32Array(ALPHAS.length * TONES),
    fills,
    acc,
  };
}

function articulate(s: Scene, time: number, wave: number, grip: number) {
  const th = s.th;
  for (let f = 0; f < 5; f++) {
    const roll = 0.5 + 0.5 * Math.sin(time * 1.5 - f * 0.75);
    const amp = f === 4 ? 0.35 : 1;
    for (let j = 0; j < 3; j++) {
      const k = [0.85, 1.1, 0.8][j];
      th[f * 3 + j] = REST[j] * (f === 4 ? 0.8 : 1) + (wave * 0.34 * roll + grip * 0.5) * k * amp;
    }
  }
  pose(th, s.cur);
  const r = s.rest;
  const c = s.cur;
  const d = s.delta;
  for (let b = 0; b < BONES; b++) {
    const o = b * 12;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        d[o + i * 3 + j] = c[o + i * 3] * r[o + j * 3] + c[o + i * 3 + 1] * r[o + j * 3 + 1] + c[o + i * 3 + 2] * r[o + j * 3 + 2];
      }
    }
    for (let i = 0; i < 3; i++) {
      d[o + 9 + i] = c[o + 9 + i] - (d[o + i * 3] * r[o + 9] + d[o + i * 3 + 1] * r[o + 10] + d[o + i * 3 + 2] * r[o + 11]);
    }
  }
}

function paint(ctx: CanvasRenderingContext2D, s: Scene, v: View) {
  const { w, h, cx, cy, time, pace } = v;
  const R = v.R * UNIT;
  const acc = s.acc;
  ctx.setTransform(v.dpr, 0, 0, v.dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 2.1);
  glow.addColorStop(0, `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0.11)`);
  glow.addColorStop(1, `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  const yaw = 0.36 + Math.sin(time * 0.21 * pace) * 0.24 + v.curX * 0.5;
  const pitch = 0.1 + Math.sin(time * 0.17 * pace + 0.6) * 0.04 + v.curY * 0.16;
  const cY = Math.cos(yaw);
  const sY = Math.sin(yaw);
  const cX = Math.cos(pitch);
  const sX = Math.sin(pitch);
  const ox = cx + v.curX * R * 0.06;
  const oy = cy + v.curY * R * 0.05;

  const baseY = oy - (BASE_Y - CENTER_Y) * cX * R;
  const coneTop = oy + 0.7 * R;
  const cone = ctx.createLinearGradient(0, baseY, 0, coneTop);
  cone.addColorStop(0, `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0.12)`);
  cone.addColorStop(1, `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0)`);
  ctx.fillStyle = cone;
  ctx.beginPath();
  ctx.moveTo(ox - R * 1.0, baseY);
  ctx.lineTo(ox - R * 0.45, coneTop);
  ctx.lineTo(ox + R * 0.45, coneTop);
  ctx.lineTo(ox + R * 1.0, baseY);
  ctx.closePath();
  ctx.fill();

  const c = s.cloud;
  const n = Math.min(c.n, v.limit);
  const phase = ((time * pace) / 6) % 1;
  const band = v.still ? 99 : -1.3 + phase * 3.2;
  let flick = 1;
  if (!v.still) {
    const slot = Math.floor(time * 3);
    if (hash(slot, 97) < 0.07) flick = 1 - 0.1 * Math.sin(((time * 3) % 1) * Math.PI);
  }

  articulate(s, v.still ? 0.6 : time * pace, v.wave, v.grip);
  const D = s.delta;
  for (let i = 0; i < n; i++) {
    const x = c.x[i];
    const y = c.y[i];
    const z = c.z[i];
    const o1 = s.b1[i] * 12;
    const o2 = s.b2[i] * 12;
    const wb = s.bw[i];
    const wa = 1 - wb;
    s.px[i] = wa * (D[o1] * x + D[o1 + 1] * y + D[o1 + 2] * z + D[o1 + 9]) + wb * (D[o2] * x + D[o2 + 1] * y + D[o2 + 2] * z + D[o2 + 9]);
    s.py[i] = wa * (D[o1 + 3] * x + D[o1 + 4] * y + D[o1 + 5] * z + D[o1 + 10]) + wb * (D[o2 + 3] * x + D[o2 + 4] * y + D[o2 + 5] * z + D[o2 + 10]);
    s.pz[i] = wa * (D[o1 + 6] * x + D[o1 + 7] * y + D[o1 + 8] * z + D[o1 + 11]) + wb * (D[o2 + 6] * x + D[o2 + 7] * y + D[o2 + 8] * z + D[o2 + 11]);
  }
  let ri = c.n;
  for (let r = 0; r < 2; r++) {
    const drift = time * pace * (r ? -0.35 : 0.28);
    const yy = r ? -0.84 : -0.62;
    for (let k = 0; k < CUFF_N; k++, ri++) {
      const a = (k / CUFF_N) * TAU + drift;
      s.px[ri] = Math.cos(a) * 0.4;
      s.py[ri] = yy;
      s.pz[ri] = Math.sin(a) * 0.3 - 0.01;
    }
  }
  const ringStart = ri;
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
    const x = s.px[i];
    const y = s.py[i] - CENTER_Y;
    const z = s.pz[i];
    const x1 = x * cY + z * sY;
    const z1 = -x * sY + z * cY;
    const y2 = y * cX - z1 * sX;
    const z2 = y * sX + z1 * cX;
    const p = 1 + z2 * 0.04;
    s.sx[i] = ox + x1 * R * p;
    s.sy[i] = oy - y2 * R * p;
    const depth = Math.min(1, Math.max(0, (z2 + 1.2) / 2.4));
    let b: number;
    let tone: number;
    if (ring) {
      b = i < ringStart ? 0.45 + 0.55 * depth : 0.3 + 0.5 * depth;
      tone = i < ringStart ? 1 : 0.75;
    } else {
      const o1 = s.b1[i] * 12;
      const nx0 = c.nx[i];
      const ny0 = c.ny[i];
      const nz0 = c.nz[i];
      const nx = D[o1] * nx0 + D[o1 + 1] * ny0 + D[o1 + 2] * nz0;
      const ny = D[o1 + 3] * nx0 + D[o1 + 4] * ny0 + D[o1 + 5] * nz0;
      const nz = D[o1 + 6] * nx0 + D[o1 + 7] * ny0 + D[o1 + 8] * nz0;
      const nx1 = nx * cY + nz * sY;
      const nz1 = -nx * sY + nz * cY;
      const ny2 = ny * cX - nz1 * sX;
      const nz2 = ny * sX + nz1 * cX;
      const lam = Math.max(0, L0 * nx1 + L1 * ny2 + L2 * nz2);
      const edge = 1 - Math.abs(nz2);
      const rim = nz2 > -0.35 ? edge * edge * edge : 0;
      const face = nz2 > 0 ? 1 : 0.28;
      b = c.w[i] * (0.3 + 0.95 * lam * face + 0.9 * rim) * (0.42 + 0.58 * depth) * 1.6;
      const dy = y + CENTER_Y - band;
      b += Math.exp(-(dy * dy) / 0.006) * 0.75 * (0.4 + 0.6 * face);
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
  ctx.fillStyle = "#ff8a5b";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const hex = hexRgb(out);
  if (hex) return hex;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return [255, 138, 91];
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#0d0814";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#0d0814" : "#ffffff";
}

function Mark() {
  return (
    <svg className="hb-hh13-mark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 12.5V5.8a1.3 1.3 0 0 1 2.6 0v5.4M10.6 11V4.6a1.3 1.3 0 0 1 2.6 0V11M13.2 11V5.4a1.3 1.3 0 0 1 2.6 0v6.4M15.8 11.4V7.8a1.3 1.3 0 0 1 2.6 0v6.6c0 3.4-2.4 6.1-5.7 6.1-2.2 0-3.6-.9-4.9-2.6l-2.4-3.4a1.3 1.3 0 0 1 2-1.6L8 13.5" />
    </svg>
  );
}

export function HeroDotHand({
  title = "Interfaces you can reach out and touch.",
  subtitle = "Hand tracking for the web: 21 joints per hand at 60 fps from any webcam, with gestures you define in a few lines.",
  caption = "60 fps · 21 joints · runs on device",
  command = "npx hyperblur add hero-dot-hand",
  primaryCta = defaultPrimary,
  brand = "Palmar",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#ff8a5b",
  density = 1,
  speed = 1,
  wave = 1,
  curl = true,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotHandProps) {
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
    const scene = createScene(Math.round(7500 * mult), acc);
    const waveAmt = Math.min(2, Math.max(0, Number.isFinite(wave) ? wave : 1));
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
      wave: waveAmt,
      grip: 0,
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
      const goal = curl && pointer ? Math.min(1, Math.max(0, (pty - 0.25) / 0.6)) : 0;
      view.grip += (goal - view.grip) * Math.min(1, step * 3);
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
  }, [accent, density, speed, wave, curl]);

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
  const vars = { "--hb-hh13-accent": accent, "--hb-hh13-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh13 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-hand" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh13-canvas" aria-hidden="true" />
      <header className="hb-hh13-bar">
        <a className="hb-hh13-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-hh13-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh13-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span />
        )}
        <div className="hb-hh13-tools">
          <button type="button" className="hb-hh13-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh13-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh13-stage" aria-hidden="true" />
      <div className="hb-hh13-foot">
        <div className="hb-hh13-copy">
          <Heading className="hb-hh13-title">{title}</Heading>
          {subtitle ? <p className="hb-hh13-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-hh13-side">
            {caption ? <p className="hb-hh13-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh13-row">
                {command ? (
                  <div className="hb-hh13-cmd">
                    <span className="hb-hh13-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh13-code">{command}</code>
                    <button type="button" className="hb-hh13-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                      <span className="hb-hh13-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-hh13-cta" href={primaryCta.href}>
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
        <a className="hb-hh13-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}
