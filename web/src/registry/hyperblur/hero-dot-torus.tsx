"use client";

import * as React from "react";

export interface HeroDotTorusLink {
  label: string;
  href: string;
}

export type HeroDotTorusShape = "torus" | "mobius";

export interface HeroDotTorusProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotTorusLink | null;
  brand?: string;
  nav?: HeroDotTorusLink[];
  navCta?: HeroDotTorusLink | null;
  learnMore?: HeroDotTorusLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  shape?: HeroDotTorusShape;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh5-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh5-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
.hb-hh5 {
  --hb-hh5-accent: #3ee6c8;
  --hb-hh5-ink: #03140f;
  --hb-hh5-mono: var(--font-mono, ui-monospace), "Geist Mono", SFMono-Regular, Menlo, Consolas, monospace;
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
    radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--hb-hh5-accent) 6%, transparent), transparent 70%),
    #020202;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hh5 *, .hb-hh5 *::before, .hb-hh5 *::after { box-sizing: border-box; }
.hb-hh5-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh5::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 52%;
  pointer-events: none;
  background: linear-gradient(to top, #020202 0%, rgba(2, 2, 2, .86) 38%, rgba(2, 2, 2, 0) 100%);
}
.hb-hh5-bar {
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
.hb-hh5-brand {
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
.hb-hh5-mark { flex: none; color: var(--hb-hh5-accent); }
.hb-hh5-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh5-link {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--hb-hh5-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh5-link:hover { color: #ededed; background: rgba(255, 255, 255, .05); }
.hb-hh5-tools {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.hb-hh5-search {
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
.hb-hh5-search:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-hh5-outline {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #ededed;
  font-family: var(--hb-hh5-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-hh5-outline:hover { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .04); }
.hb-hh5-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 240px;
}
.hb-hh5-foot {
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
.hb-hh5-copy { min-width: 0; }
.hb-hh5-title {
  max-width: 11em;
  margin: 0;
  color: #f5f5f5;
  font-size: clamp(28px, 5.4cqi, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-hh5-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh5-sub {
  max-width: 34em;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-hh5-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh5-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-hh5-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh5-caption {
  margin: 0;
  color: #6f6f6f;
  font-family: var(--hb-hh5-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-hh5-caption b { color: var(--hb-hh5-accent); font-weight: 500; }
.hb-hh5-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-hh5-cmd {
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
.hb-hh5-prompt { flex: none; color: var(--hb-hh5-accent); font-family: var(--hb-hh5-mono); font-size: 12px; }
.hb-hh5-code {
  min-width: 0;
  overflow: hidden;
  color: #d6d6d6;
  font-family: var(--hb-hh5-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh5-copybtn {
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
.hb-hh5-copybtn:hover { color: #ededed; background: rgba(255, 255, 255, .07); }
.hb-hh5-copybtn[data-done="true"] { color: var(--hb-hh5-accent); }
.hb-hh5-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 10px;
  background: var(--hb-hh5-accent);
  color: var(--hb-hh5-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 28px -10px var(--hb-hh5-accent);
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh5-cta:hover { filter: brightness(1.08); }
.hb-hh5-cta svg { transition: transform .2s ease; }
.hb-hh5-cta:hover svg { transform: translateX(2px); }
.hb-hh5-more {
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
  font-family: var(--hb-hh5-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-hh5-more:hover { color: #ededed; }
.hb-hh5-more svg { animation: hb-hh5-bob 1.8s ease-in-out infinite; }
.hb-hh5 a:focus-visible, .hb-hh5 button:focus-visible {
  outline: 2px solid var(--hb-hh5-accent);
  outline-offset: 2px;
}
.hb-hh5-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-hh5-foot { grid-template-columns: minmax(0, 1fr); padding: 0 24px 72px; }
  .hb-hh5-bar { padding: 16px 24px; }
}
@container (max-width: 640px) {
  .hb-hh5-bar { grid-template-columns: 1fr auto; }
  .hb-hh5-links, .hb-hh5-search { display: none; }
  .hb-hh5-stage { min-height: calc(80cqi + 24px); }
  .hb-hh5-sub { font-size: 14px; }
  .hb-hh5-side, .hb-hh5-row { align-self: stretch; }
  .hb-hh5-row { flex-direction: column; }
  .hb-hh5-cta { width: 100%; }
}
@container (max-width: 360px) {
  .hb-hh5-bar { padding: 14px 18px; }
  .hb-hh5-foot { padding: 0 18px 68px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh5-title, .hb-hh5-sub, .hb-hh5-side, .hb-hh5-more svg { animation: none; }
  .hb-hh5-link, .hb-hh5-search, .hb-hh5-outline, .hb-hh5-copybtn, .hb-hh5-cta, .hb-hh5-cta svg, .hb-hh5-more { transition: none; }
  .hb-hh5-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotTorusLink[] = [
  { label: "Product", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
];
const defaultNavCta: HeroDotTorusLink = { label: "Log in", href: "#" };
const defaultPrimary: HeroDotTorusLink = { label: "Try it free", href: "#" };
const defaultMore: HeroDotTorusLink = { label: "How it works", href: "#" };

const TAU = Math.PI * 2;
const WARM: [number, number, number] = [250, 248, 238];
const ALPHAS = [0.05, 0.1, 0.17, 0.26, 0.37, 0.5, 0.65, 0.82, 1];
const TONES = 4;
const RMAJ = 0.66;
const RMIN = 0.3;
const MRAD = 0.66;
const MHALF = 0.36;
const RINGS = [64, 90, 116, 142, 168];

function hash(i: number, salt: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) ^ Math.imul(salt + 11, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
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
  ctx.fillStyle = "#3ee6c8";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const hex = hexRgb(out);
  if (hex) return hex;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return [255, 184, 77];
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#03140f";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#03140f" : "#ffffff";
}

function smooth(x: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return x * x * (3 - 2 * x);
}

function flicker(t: number) {
  const slot = Math.floor(t * 1.7);
  if (hash(slot, 77) < 0.88) return 1;
  const ph = t * 1.7 - slot;
  const start = hash(slot, 78) * 0.7;
  const len = 0.08 + hash(slot, 79) * 0.12;
  if (ph < start || ph > start + len) return 1;
  const k = (ph - start) / len;
  return 1 - (0.05 + hash(slot, 80) * 0.06) * Math.sin(k * Math.PI) * (0.7 + 0.3 * Math.sin(t * 90));
}

export interface TorusGrid {
  u: Float32Array;
  v: Float32Array;
  edge: Uint8Array;
  count: number;
}

export function buildTorusGrid(mobius: boolean, scale: number): TorusGrid {
  const sq = Math.sqrt(scale);
  if (mobius) {
    const nu = Math.max(80, Math.round(470 * sq));
    const ns = Math.max(5, Math.round(12 * sq));
    const count = nu * ns;
    const u = new Float32Array(count);
    const v = new Float32Array(count);
    const edge = new Uint8Array(count);
    let i = 0;
    for (let j = 0; j < ns; j++) {
      for (let k = 0; k < nu; k++) {
        u[i] = ((k + (j & 1) * 0.5) / nu) * TAU * 2;
        v[i] = (MHALF * (j + 0.5)) / ns;
        edge[i] = j === ns - 1 ? 1 : 0;
        i++;
      }
    }
    return { u, v, edge, count };
  }
  const nu = Math.max(40, Math.round(156 * sq));
  const nv = Math.max(16, Math.round(66 * sq));
  const count = nu * nv;
  const u = new Float32Array(count);
  const v = new Float32Array(count);
  const edge = new Uint8Array(count);
  let i = 0;
  for (let j = 0; j < nv; j++) {
    for (let k = 0; k < nu; k++) {
      u[i] = ((k + (j & 1) * 0.5) / nu) * TAU;
      v[i] = (j / nv) * TAU;
      i++;
    }
  }
  return { u, v, edge, count };
}

export function torusPoint(u: number, v: number, at: number, out: Float32Array) {
  const rr = RMIN * (1 + 0.07 * Math.sin(3 * u - at * 1.3));
  const cu = Math.cos(u);
  const su = Math.sin(u);
  const cv = Math.cos(v);
  const sv = Math.sin(v);
  const ring = RMAJ + rr * cv;
  out[0] = ring * cu;
  out[1] = rr * sv;
  out[2] = ring * su;
  out[3] = cv * cu;
  out[4] = sv;
  out[5] = cv * su;
}

export function mobiusPoint(u: number, s: number, out: Float32Array) {
  const c = Math.cos(u * 0.5);
  const sn = Math.sin(u * 0.5);
  const cu = Math.cos(u);
  const su = Math.sin(u);
  const A = MRAD + s * c;
  out[0] = A * cu;
  out[1] = s * sn;
  out[2] = A * su;
  const dux = -0.5 * s * sn * cu - A * su;
  const duy = 0.5 * s * c;
  const duz = -0.5 * s * sn * su + A * cu;
  const dsx = c * cu;
  const dsy = sn;
  const dsz = c * su;
  let nx = duy * dsz - duz * dsy;
  let ny = duz * dsx - dux * dsz;
  let nz = dux * dsy - duy * dsx;
  const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
  nx /= len;
  ny /= len;
  nz /= len;
  out[3] = nx;
  out[4] = ny;
  out[5] = nz;
}

function rotation(yaw: number, pitch: number, roll: number) {
  const cY = Math.cos(yaw);
  const sY = Math.sin(yaw);
  const cX = Math.cos(pitch);
  const sX = Math.sin(pitch);
  const cZ = Math.cos(roll);
  const sZ = Math.sin(roll);
  const m = new Float32Array(9);
  const basis = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  for (let c = 0; c < 3; c++) {
    const [x, y, z] = basis[c];
    const x1 = x * cY + z * sY;
    const z1 = -x * sY + z * cY;
    const y2 = y * cX - z1 * sX;
    const z2 = y * sX + z1 * cX;
    const x3 = x1 * cZ - y2 * sZ;
    const y3 = x1 * sZ + y2 * cZ;
    m[c] = x3;
    m[3 + c] = y3;
    m[6 + c] = z2;
  }
  return m;
}

function Mark() {
  return (
    <svg className="hb-hh5-mark" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="9.5" ry="5.6" stroke="currentColor" strokeWidth="1.7" />
      <ellipse cx="12" cy="11.4" rx="4" ry="1.7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 12c1.6 3.2 5.4 5.6 9.5 5.6s7.9-2.4 9.5-5.6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1.2 2.2" strokeLinecap="round" transform="translate(0 2.2)" />
    </svg>
  );
}

export function HeroDotTorus({
  title = "One loop for every event you ship.",
  subtitle = "Stream, retry and replay through a single continuous pipeline that never stalls and scales with your traffic.",
  caption = "99.99% uptime · 3 regions · MIT licensed",
  command = "npx hyperblur add hero-dot-torus",
  primaryCta = defaultPrimary,
  brand = "Loopwell",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#3ee6c8",
  density = 1,
  speed = 1,
  shape = "torus",
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotTorusProps) {
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
    const mobius = shape === "mobius";

    let grid = buildTorusGrid(mobius, mult);
    let small = false;
    const nDust = Math.round(150 * Math.min(1.4, mult));
    const da = new Float32Array(nDust);
    const dr = new Float32Array(nDust);
    const dh = new Float32Array(nDust);
    const dp = new Float32Array(nDust);
    for (let k = 0; k < nDust; k++) {
      da[k] = hash(k, 61) * TAU;
      dr[k] = 1.15 + Math.pow(hash(k, 62), 1.5) * 0.9;
      dh[k] = (hash(k, 63) * 2 - 1) * 0.9;
      dp[k] = hash(k, 64) * TAU;
    }
    let ringTotal = 0;
    for (let k = 0; k < RINGS.length; k++) ringTotal += RINGS[k];

    const cap = grid.count + nDust + ringTotal + 8;
    const sx = new Float32Array(cap);
    const sy = new Float32Array(cap);
    const ss = new Float32Array(cap);
    const bucket = new Uint8Array(cap);
    const order = new Int32Array(cap);
    const buckets = ALPHAS.length * TONES;
    const counts = new Int32Array(buckets);
    const starts = new Int32Array(buckets);
    const pt = new Float32Array(6);

    const acc = resolveRgb(accent, ctx);
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
    const rgba = (a: number) => `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, ${a.toFixed(3)})`;

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let S = 0;
    let dpr = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = reduce ? 9 : 0;
    let pointer = false;
    let ptx = 0;
    let pty = 0;
    let curX = 0;
    let curY = 0;
    let n = 0;

    function put(x: number, y: number, s: number, b: number, t: number) {
      if (b < 0.02) return;
      let bi = Math.floor(b * ALPHAS.length);
      if (bi >= ALPHAS.length) bi = ALPHAS.length - 1;
      let ti = Math.floor(t * TONES);
      if (ti >= TONES) ti = TONES - 1;
      if (ti < 0) ti = 0;
      sx[n] = x;
      sy[n] = y;
      ss[n] = s < 0.6 ? 0.6 : s > 1.4 ? 1.4 : s;
      const k = bi * TONES + ti;
      bucket[n] = k;
      counts[k]++;
      n++;
    }

    function flush(alpha: number) {
      if (!ctx) return;
      let acc0 = 0;
      for (let k = 0; k < buckets; k++) {
        starts[k] = acc0;
        acc0 += counts[k];
      }
      for (let i = 0; i < n; i++) order[starts[bucket[i]]++] = i;
      ctx.globalAlpha = alpha;
      let pos = 0;
      for (let k = 0; k < buckets; k++) {
        const c = counts[k];
        if (!c) continue;
        ctx.fillStyle = fills[k];
        ctx.beginPath();
        for (let p = pos; p < pos + c; p++) {
          const i = order[p];
          const s = ss[i];
          ctx.rect(sx[i] - s / 2, sy[i] - s / 2, s, s);
        }
        ctx.fill();
        pos += c;
      }
      ctx.globalAlpha = 1;
    }

    function layout() {
      if (!root || !canvas || !stage || !ctx) return;
      const rect = root.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      cx = w / 2;
      const nextSmall = w < 640;
      if (nextSmall !== small) {
        small = nextSmall;
        grid = buildTorusGrid(mobius, mult * (small ? 0.6 : 1));
      }
      if (small) {
        const st = stage.getBoundingClientRect();
        S = w * 0.34;
        cy = st.top - rect.top + st.height * 0.4;
      } else {
        S = Math.min(w * 0.27, h * 0.34);
        cy = h * 0.38;
      }
    }

    function projector(bx: number, by: number, at: number) {
      if (!ctx) return;
      const top = cy - S * 0.2;
      const cone = ctx.createLinearGradient(0, by, 0, top);
      cone.addColorStop(0, rgba(0.12));
      cone.addColorStop(0.6, rgba(0.035));
      cone.addColorStop(1, rgba(0));
      ctx.fillStyle = cone;
      ctx.beginPath();
      ctx.moveTo(bx - S * 0.28, by);
      ctx.lineTo(bx - S * 1.05, top);
      ctx.lineTo(bx + S * 1.05, top);
      ctx.lineTo(bx + S * 0.28, by);
      ctx.closePath();
      ctx.fill();
      ctx.save();
      ctx.translate(bx, by);
      ctx.scale(1, 0.2);
      const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 1.05);
      pool.addColorStop(0, rgba(0.17));
      pool.addColorStop(1, rgba(0));
      ctx.fillStyle = pool;
      ctx.fillRect(-S * 1.1, -S * 1.1, S * 2.2, S * 2.2);
      ctx.restore();
      for (let k = 0; k < RINGS.length; k++) {
        const rx = S * (0.28 + 0.2 * k);
        const ry = rx * 0.17;
        const cnt = RINGS[k];
        const rot = at * 0.14 * (k % 2 ? 1 : -1) + k * 0.9;
        for (let j = 0; j < cnt; j++) {
          if (k > 0 && j % 10 === 9) continue;
          const ang = rot + (j / cnt) * TAU;
          const sn = Math.sin(ang);
          const front = (sn + 1) * 0.5;
          const b = (0.66 - k * 0.1) * (0.45 + 0.55 * front);
          put(bx + Math.cos(ang) * rx, by + sn * ry, 0.75 + 0.45 * front, b, k === 0 ? 0.55 : 0.95);
        }
      }
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const at = time * pace;

      const halo = ctx.createRadialGradient(cx, cy, S * 0.1, cx, cy, S * 1.7);
      halo.addColorStop(0, rgba(0.1));
      halo.addColorStop(1, rgba(0));
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      counts.fill(0);
      n = 0;

      const bx = cx + curX * S * 0.05;
      const by = cy + S * 1.12;
      projector(bx, by, at);

      const yaw = at * 0.16 + curX * 0.6;
      const pitch = (mobius ? 0.78 : 1.02) + 0.16 * Math.sin(at * 0.17) + curY * 0.35;
      const roll = 0.22 * Math.sin(at * 0.07 + 0.6) - curX * 0.08;
      const m = rotation(yaw, pitch, roll);
      const ox = curX * S * 0.06;
      const oy = curY * S * 0.05 + (reduce ? 0 : Math.sin(at * 0.6) * S * 0.015);
      const sweep = reduce ? 0.1 : 1.25 - 2.5 * (at / 6 - Math.floor(at / 6));
      const { u: gu, v: gv, edge, count } = grid;
      const flow = at * (mobius ? 0.14 : 0.42);

      for (let i = 0; i < count; i++) {
        let u = gu[i];
        let lane = 0;
        if (mobius) {
          u += flow;
          mobiusPoint(u, gv[i], pt);
          const c = Math.cos(1.5 * (u - at * 0.75));
          lane = c > 0 ? Math.pow(c, 18) : 0;
        } else {
          const v = gv[i] + flow;
          torusPoint(u, v, at, pt);
          const c = 0.5 + 0.5 * Math.cos(3 * v + 2 * u);
          lane = c * c * c * c * c * c;
        }
        const X = pt[0];
        const Y = pt[1];
        const Z = pt[2];
        const x = m[0] * X + m[1] * Y + m[2] * Z;
        const y = m[3] * X + m[4] * Y + m[5] * Z;
        const z = m[6] * X + m[7] * Y + m[8] * Z;
        const nz = m[6] * pt[3] + m[7] * pt[4] + m[8] * pt[5];
        const p = 1 + z * 0.14;
        const px = cx + ox + x * S * p;
        const py = cy + oy - y * S * p;
        const front = Math.min(1, Math.max(0, (z + 1) * 0.5));
        const rim = 1 - Math.abs(nz);
        const rim3 = rim * rim * rim;
        const facing = nz > 0 ? nz : 0;
        let b = 0.1 + 0.3 * front + 0.24 * facing + 0.55 * rim3;
        b *= 0.58 + 0.42 * smooth((nz + 0.35) / 0.7);
        b *= mobius ? 0.8 + 0.6 * lane : 0.66 + 0.7 * lane;
        let t = 0.18 + 0.7 * rim * rim + (1 - front) * 0.2;
        if (edge[i]) {
          b += 0.2;
          t += 0.3;
        }
        const d = (py - cy) / S - sweep;
        const scan = Math.exp(-d * d * 120) * 0.6 + Math.exp(-d * d * 9) * 0.1;
        b = b * (1 + scan * 1.3) + scan * 0.2;
        if (b > 0.999) b = 0.999;
        put(px, py, 0.62 + 0.55 * front + 0.25 * rim3, b, t);
      }

      const drift = at * 0.05;
      for (let k = 0; k < nDust; k++) {
        const a = da[k] + drift * (1.4 - dr[k] * 0.4);
        const px = cx + Math.cos(a) * dr[k] * S * 1.05 + curX * 14 * dr[k];
        const py = cy + dh[k] * S * 0.9 + Math.sin(a) * dr[k] * S * 0.22 + curY * 8;
        const tw = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(time * 1.3 + dp[k]);
        put(px, py, 0.7, (0.08 + 0.16 * (2.05 - dr[k])) * tw, 0.9);
      }

      flush(reduce ? 1 : flicker(time));
    }

    function frame(now: number) {
      raf = 0;
      const step = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      time += step;
      let tx = ptx;
      let ty = pty;
      if (!pointer) {
        tx = Math.sin(time * 0.21) * 0.45;
        ty = Math.sin(time * 0.13 + 1.2) * 0.25;
      }
      const ease = Math.min(1, step * 2.4);
      curX += (tx - curX) * ease;
      curY += (ty - curY) * ease;
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
  }, [accent, density, speed, shape]);

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
  const vars = { "--hb-hh5-accent": accent, "--hb-hh5-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh5 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-torus" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh5-canvas" aria-hidden="true" />
      <header className="hb-hh5-bar">
        <a className="hb-hh5-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-hh5-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh5-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span />
        )}
        <div className="hb-hh5-tools">
          <button type="button" className="hb-hh5-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh5-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh5-stage" aria-hidden="true" />
      <div className="hb-hh5-foot">
        <div className="hb-hh5-copy">
          <Heading className="hb-hh5-title">{title}</Heading>
          {subtitle ? <p className="hb-hh5-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-hh5-side">
            {caption ? <p className="hb-hh5-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh5-row">
                {command ? (
                  <div className="hb-hh5-cmd">
                    <span className="hb-hh5-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh5-code">{command}</code>
                    <button type="button" className="hb-hh5-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                      <span className="hb-hh5-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-hh5-cta" href={primaryCta.href}>
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
        <a className="hb-hh5-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}
