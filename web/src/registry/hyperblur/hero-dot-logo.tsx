"use client";

import * as React from "react";

export interface HeroDotLogoLink {
  label: string;
  href: string;
}

export interface HeroDotLogoProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotLogoLink | null;
  brand?: string;
  nav?: HeroDotLogoLink[];
  navCta?: HeroDotLogoLink | null;
  learnMore?: HeroDotLogoLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  path?: string;
  viewBox?: string;
  depth?: number;
  spin?: boolean;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh8-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh8-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
.hb-hh8 {
  --hb-hh8-accent: #2f7bff;
  --hb-hh8-ink: #020a1a;
  --hb-hh8-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
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
    radial-gradient(56% 46% at 50% 38%, color-mix(in srgb, var(--hb-hh8-accent) 7%, transparent), transparent 70%),
    #020202;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}
.hb-hh8 *, .hb-hh8 *::before, .hb-hh8 *::after { box-sizing: border-box; }
.hb-hh8-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh8::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 48%;
  pointer-events: none;
  background: linear-gradient(to top, #020202 0%, rgba(2, 2, 2, .86) 38%, rgba(2, 2, 2, 0) 100%);
}
.hb-hh8-bar {
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
.hb-hh8-brand {
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
.hb-hh8-mark { flex: none; color: var(--hb-hh8-accent); }
.hb-hh8-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh8-link {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--hb-hh8-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh8-link:hover { color: #ededed; background: rgba(255, 255, 255, .05); }
.hb-hh8-tools {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.hb-hh8-search {
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
.hb-hh8-search:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-hh8-outline {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #ededed;
  font-family: var(--hb-hh8-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-hh8-outline:hover { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .04); }
.hb-hh8-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 240px;
}
.hb-hh8-foot {
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
.hb-hh8-copy { min-width: 0; }
.hb-hh8-title {
  max-width: 11em;
  margin: 0;
  color: #f5f5f5;
  font-size: clamp(28px, 5.4cqi, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-hh8-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh8-sub {
  max-width: 34em;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-hh8-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh8-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-hh8-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh8-caption {
  margin: 0;
  color: #6f6f6f;
  font-family: var(--hb-hh8-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-hh8-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-hh8-cmd {
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
.hb-hh8-prompt { flex: none; color: var(--hb-hh8-accent); font-family: var(--hb-hh8-mono); font-size: 12px; }
.hb-hh8-code {
  min-width: 0;
  overflow: hidden;
  color: #d6d6d6;
  font-family: var(--hb-hh8-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh8-copybtn {
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
.hb-hh8-copybtn:hover { color: #ededed; background: rgba(255, 255, 255, .07); }
.hb-hh8-copybtn[data-done="true"] { color: var(--hb-hh8-accent); }
.hb-hh8-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 10px;
  background: var(--hb-hh8-accent);
  color: var(--hb-hh8-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 28px -10px var(--hb-hh8-accent);
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh8-cta:hover { filter: brightness(1.08); }
.hb-hh8-cta svg { transition: transform .2s ease; }
.hb-hh8-cta:hover svg { transform: translateX(2px); }
.hb-hh8-more {
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
  font-family: var(--hb-hh8-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-hh8-more:hover { color: #ededed; }
.hb-hh8-more svg { animation: hb-hh8-bob 1.8s ease-in-out infinite; }
.hb-hh8 a:focus-visible, .hb-hh8 button:focus-visible {
  outline: 2px solid var(--hb-hh8-accent);
  outline-offset: 2px;
}
.hb-hh8-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-hh8-foot { grid-template-columns: minmax(0, 1fr); padding: 0 24px 72px; }
  .hb-hh8-bar { padding: 16px 24px; }
}
@container (max-width: 640px) {
  .hb-hh8-bar { grid-template-columns: 1fr auto; }
  .hb-hh8-links, .hb-hh8-search { display: none; }
  .hb-hh8-stage { min-height: calc(50cqi + 40px); }
  .hb-hh8-sub { font-size: 14px; }
  .hb-hh8-side, .hb-hh8-row { align-self: stretch; }
  .hb-hh8-row { flex-direction: column; }
  .hb-hh8-cta { width: 100%; }
}
@container (max-width: 360px) {
  .hb-hh8-bar { padding: 14px 18px; }
  .hb-hh8-foot { padding: 0 18px 68px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh8-title, .hb-hh8-sub, .hb-hh8-side, .hb-hh8-more svg { animation: none; }
  .hb-hh8-link, .hb-hh8-search, .hb-hh8-outline, .hb-hh8-copybtn, .hb-hh8-cta, .hb-hh8-cta svg, .hb-hh8-more { transition: none; }
  .hb-hh8-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotLogoLink[] = [
  { label: "Product", href: "#" },
  { label: "Brand kit", href: "#" },
  { label: "Changelog", href: "#" },
];
const defaultNavCta: HeroDotLogoLink = { label: "Sign in", href: "#" };
const defaultPrimary: HeroDotLogoLink = { label: "Upload your mark", href: "#" };
const defaultMore: HeroDotLogoLink = { label: "Learn more", href: "#" };

const WARM: [number, number, number] = [255, 245, 230];
const ALPHAS = [0.07, 0.16, 0.28, 0.42, 0.58, 0.76, 0.96];
const TONES = 4;

interface Mask {
  on: Uint8Array;
  lum: Float32Array | null;
  w: number;
  h: number;
}

interface Source {
  raster: (k: number) => Mask | null;
  baseH: number;
  aspect: number;
}

interface CloudOptions {
  depth: number;
  mids: number;
  backKeep: number;
  relief: number;
  axis: 0 | 1;
}

interface Cloud {
  n: number;
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  kind: Uint8Array;
  tone: Uint8Array;
  shade: Float32Array;
  size: Float32Array;
  u: Float32Array;
  v: Float32Array;
  aspect: number;
  reach: number;
}

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
  ctx.fillStyle = "#2f7bff";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const hex = hexRgb(out);
  if (hex) return hex;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return [47, 123, 255];
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#020a1a";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#020a1a" : "#ffffff";
}

function flickerAt(t: number) {
  const slot = Math.floor(t * 5);
  if (hash(slot, 77) < 0.94) return 0;
  const f = t * 5 - slot;
  return (0.05 + hash(slot, 78) * 0.09) * Math.sin(f * Math.PI);
}

function alphaMask(g: CanvasRenderingContext2D, w: number, h: number): Mask | null {
  let data: Uint8ClampedArray;
  try {
    data = g.getImageData(0, 0, w, h).data;
  } catch {
    return null;
  }
  const on = new Uint8Array(w * h);
  for (let k = 0, p = 3; k < w * h; k++, p += 4) on[k] = data[p] >= 128 ? 1 : 0;
  return { on, lum: null, w, h };
}

function maskBox(m: Mask) {
  let x0 = m.w;
  let y0 = m.h;
  let x1 = -1;
  let y1 = -1;
  for (let j = 1; j < m.h - 1; j++) {
    const row = j * m.w;
    for (let i = 1; i < m.w - 1; i++) {
      if (!m.on[row + i]) continue;
      if (i < x0) x0 = i;
      if (i > x1) x1 = i;
      if (j < y0) y0 = j;
      if (j > y1) y1 = j;
    }
  }
  return x1 < 0 ? null : { x0, y0, x1, y1 };
}

function makeSource(raster: (k: number) => Mask | null): Source | null {
  const m = raster(1);
  if (!m) return null;
  const b = maskBox(m);
  if (!b) return null;
  const bh = b.y1 - b.y0 + 1;
  return { raster, baseH: bh, aspect: (b.x1 - b.x0 + 1) / bh };
}

function countCloud(m: Mask, o: CloudOptions) {
  const { on, w, h } = m;
  let total = 0;
  for (let j = 1; j < h - 1; j++) {
    for (let i = 1; i < w - 1; i++) {
      const k = j * w + i;
      if (!on[k]) continue;
      total += 1;
      if (hash(k, 5) < o.backKeep) total += 1;
      if (!on[k - 1] || !on[k + 1] || !on[k - w] || !on[k + w]) total += o.mids;
    }
  }
  return total;
}

function buildCloud(m: Mask, o: CloudOptions): Cloud | null {
  const { on, lum, w, h } = m;
  const box = maskBox(m);
  if (!box) return null;
  const dist = new Uint8Array(w * h);
  for (let k = 0; k < w * h; k++) dist[k] = on[k] ? 255 : 0;
  for (let j = 1; j < h; j++) {
    for (let i = 1; i < w; i++) {
      const k = j * w + i;
      if (dist[k]) dist[k] = Math.min(dist[k], dist[k - 1] + 1, dist[k - w] + 1);
    }
  }
  for (let j = h - 2; j >= 0; j--) {
    for (let i = w - 2; i >= 0; i--) {
      const k = j * w + i;
      if (dist[k]) dist[k] = Math.min(dist[k], dist[k + 1] + 1, dist[k + w] + 1);
    }
  }
  const n = countCloud(m, o);
  if (!n) return null;
  const bw = box.x1 - box.x0 + 1;
  const bh = box.y1 - box.y0 + 1;
  const cxm = (box.x0 + box.x1 + 1) / 2;
  const cym = (box.y0 + box.y1 + 1) / 2;
  const half = o.depth / 2;
  const dome = Math.max(2, bh * 0.09);
  const c: Cloud = {
    n,
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
    kind: new Uint8Array(n),
    tone: new Uint8Array(n),
    shade: new Float32Array(n),
    size: new Float32Array(n),
    u: new Float32Array(n),
    v: new Float32Array(n),
    aspect: bw / bh,
    reach: 0.5,
  };
  let p = 0;
  let reach = 0;
  const put = (x: number, y: number, z: number, kind: number, tone: number, shade: number, size: number, u: number, v: number) => {
    c.x[p] = x;
    c.y[p] = y;
    c.z[p] = z;
    c.kind[p] = kind;
    c.tone[p] = tone;
    c.shade[p] = shade;
    c.size[p] = size;
    c.u[p] = u;
    c.v[p] = v;
    const r = x * x + y * y + z * z;
    if (r > reach) reach = r;
    p++;
  };
  for (let j = 1; j < h - 1; j++) {
    for (let i = 1; i < w - 1; i++) {
      const k = j * w + i;
      if (!on[k] || p >= n) continue;
      const d = dist[k];
      const jx = (hash(k, 1) - 0.5) * 0.22;
      const jy = (hash(k, 2) - 0.5) * 0.22;
      const x = (i + 0.5 + jx - cxm) / bh;
      const y = (cym - j - 0.5 - jy) / bh;
      const b = lum ? lum[k] : 1;
      const zf = half + o.relief * (0.55 * (b - 0.5) + 0.45 * (Math.min(d, dome) / dome));
      const tone = d <= 1 ? 3 : d === 2 ? 2 : d === 3 ? 1 : 0;
      const u = o.axis === 0 ? (i - box.x0) / bw : (box.y1 - j) / bh;
      const v = (box.y1 - j) / bh;
      const sz = 0.82 + hash(k, 3) * 0.36;
      put(x, y, zf, 0, tone, b, sz, u, v);
      if (hash(k, 5) < o.backKeep && p < n) put(x, y, -half, 2, tone > 1 ? tone : 2, b, sz * 0.9, u, v);
      if (d === 1) {
        for (let q = 1; q <= o.mids && p < n; q++) {
          const t = q / (o.mids + 1);
          put(x, y, zf + (-half - zf) * t, 1, 3, b, sz * 0.92, u, v);
        }
      }
    }
  }
  c.n = p;
  c.reach = Math.max(0.3, Math.sqrt(reach));
  return c;
}

function sampleCloud(src: Source, wantRows: number, budget: number, o: CloudOptions) {
  let rows = wantRows;
  let m: Mask | null = null;
  for (let a = 0; a < 4; a++) {
    m = src.raster(rows / src.baseH);
    if (!m) return null;
    const total = countCloud(m, o);
    if (total <= budget) break;
    rows *= Math.sqrt(budget / total) * 0.96;
  }
  return m ? buildCloud(m, o) : null;
}

const DEFAULT_PATH = "M18.0 9.0 H33.0 L28.0 23.0 H13.0 Z M13.5 9.0 H16.1 L11.1 23.0 H8.5 Z M10.0 9.0 H11.6 L6.6 23.0 H5.0 Z M7.2 9.0 H8.1 L3.1 23.0 H2.2 Z";
const DEFAULT_VIEWBOX = "0 0 36 32";

function parseViewBox(value: string): [number, number, number, number] | null {
  const parts = String(value).trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some((p) => !Number.isFinite(p)) || parts[2] <= 0 || parts[3] <= 0) return null;
  return [parts[0], parts[1], parts[2], parts[3]];
}

function rasterPath(d: string, box: [number, number, number, number], k: number): Mask | null {
  if (!d.trim() || typeof document === "undefined" || typeof Path2D === "undefined") return null;
  let shape: Path2D;
  try {
    shape = new Path2D(d);
  } catch {
    return null;
  }
  const scale = (100 * k) / Math.max(box[2], box[3]);
  const pad = 3;
  const cw = Math.ceil(box[2] * scale) + pad * 2;
  const ch = Math.ceil(box[3] * scale) + pad * 2;
  if (cw < 4 || ch < 4 || cw * ch > 9000000) return null;
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const g = canvas.getContext("2d", { willReadFrequently: true });
  if (!g) return null;
  g.setTransform(scale, 0, 0, scale, pad - box[0] * scale, pad - box[1] * scale);
  g.fillStyle = "#ffffff";
  g.fill(shape);
  return alphaMask(g, cw, ch);
}

function Mark() {
  return (
    <svg className="hb-hh8-mark" width="22" height="20" viewBox="0 0 36 32" fill="currentColor" aria-hidden="true">
      <path d={DEFAULT_PATH} />
    </svg>
  );
}

export function HeroDotLogo({
  title = "Your mark, projected in three dimensions.",
  subtitle = "Drop in any SVG path and it turns into a spinning hologram of extruded dots, back faces dimmed and edges lit. Plain source, no runtime.",
  caption = "Any SVG path · 6 depth layers · MIT licensed",
  command = "npx hyperblur add hero-dot-logo",
  primaryCta = defaultPrimary,
  brand = "Slipstream",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#2f7bff",
  density = 1,
  speed = 1,
  path = DEFAULT_PATH,
  viewBox = DEFAULT_VIEWBOX,
  depth = 0.35,
  spin = true,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotLogoProps) {
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
    const deep = Math.min(1.5, Math.max(0.02, Number.isFinite(depth) ? depth : 0.35));
    const opts: CloudOptions = { depth: deep, mids: 4, backKeep: 0.6, relief: 0, axis: 1 };
    const pathD = typeof path === "string" ? path : "";
    const box = parseViewBox(viewBox) ?? parseViewBox(DEFAULT_VIEWBOX);

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
    const buckets = ALPHAS.length * TONES;
    const counts = new Int32Array(buckets);
    const starts = new Int32Array(buckets);
    const glowA = `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0.11)`;
    const glowB = `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0)`;
    const lineA = `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0.075)`;
    const lineB = `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0)`;
    const nMote = Math.round(70 * Math.min(1.5, mult));

    let src: Source | null = null;
    let cloud: Cloud | null = null;
    let sampledRows = 0;
    let sampledBudget = 0;
    let sx = new Float32Array(0);
    let sy = new Float32Array(0);
    let ss = new Float32Array(0);
    let bucket = new Uint8Array(0);
    let order = new Int32Array(0);

    let dead = false;
    let w = 0;
    let h = 0;
    let lw = 0;
    let cx = 0;
    let cy = 0;
    let availW = 0;
    let availH = 0;
    let dpr = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = 0;
    let pointer = false;
    let ptx = 0;
    let pty = 0;
    let pxp = 0;
    let pyp = 0;
    let curX = 0;
    let curY = 0;
    let resampleTimer: ReturnType<typeof setTimeout> | null = null;

    function fitUnit() {
      const a = src ? src.aspect : 1;
      return Math.max(4, Math.min(availW / a, availH));
    }

    function budget() {
      return Math.round((lw < 640 ? 9000 : 18000) * mult);
    }

    function wantRows() {
      return Math.min(220, Math.max(26, fitUnit() / 2.3));
    }

    function resample(force: boolean) {
      if (!src) {
        cloud = null;
        return;
      }
      const want = wantRows();
      const bud = budget();
      if (!force && cloud && Math.abs(want - sampledRows) / sampledRows < 0.12 && bud === sampledBudget) return;
      cloud = sampleCloud(src, want, bud, opts);
      sampledRows = want;
      sampledBudget = bud;
      const n = cloud ? cloud.n : 0;
      if (sx.length < n) {
        sx = new Float32Array(n);
        sy = new Float32Array(n);
        ss = new Float32Array(n);
        bucket = new Uint8Array(n);
        order = new Int32Array(n);
      }
    }

    function rebuild() {
      if (!box) return;
      src = makeSource((k) => rasterPath(pathD, box, k));
      if (!src) {
        const fallback = parseViewBox(DEFAULT_VIEWBOX);
        if (fallback) src = makeSource((k) => rasterPath(DEFAULT_PATH, fallback, k));
      }
      resample(true);
    }

    function layout() {
      if (!root || !canvas || !stage) return;
      const rect = root.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      lw = root.clientWidth || w;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      cx = w / 2;
      if (lw < 640) {
        const st = stage.getBoundingClientRect();
        availW = w * 0.7;
        availH = st.height * 0.72;
        cy = st.top - rect.top + st.height / 2;
      } else {
        availW = w * 0.5;
        availH = h * 0.36;
        cy = h * 0.38;
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const c = cloud;
      if (!c || !w || !h) return;
      const unit = fitUnit();
      const A = c.aspect;

      ctx.save();
      ctx.translate(cx, cy);
      const gsx = Math.max(1, A * 0.5);
      ctx.scale(gsx, 1);
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, unit * 1.2);
      glow.addColorStop(0, glowA);
      glow.addColorStop(1, glowB);
      ctx.fillStyle = glow;
      ctx.fillRect(-unit * 1.3, -unit * 1.3, unit * 2.6, unit * 2.6);
      ctx.restore();

      const turn = spin ? -0.5 + time * 0.42 * pace : 0.6 * Math.sin(time * 0.5 * pace);
      const yaw = (reduce ? 0.55 : turn) + curX * 0.4;
      const pitch = 0.1 + curY * 0.28;
      const cyw = Math.cos(yaw);
      const syw = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const cam = Math.max(3.2, A * 1.5);
      const face = cyw * cp;
      const wall = 0.34 + 0.5 * Math.abs(syw);
      const ox = curX * unit * 0.06;
      const oy = curY * unit * 0.05;
      const band = reduce ? 0.38 : -0.2 + (((time * pace) / 6) % 1) * 1.4;
      const flick = reduce ? 0 : flickerAt(time);
      const slot = Math.floor(time * 5);
      const glitch = flick > 0.035;
      const g0 = hash(slot, 79) * 0.86;
      const gShift = (hash(slot, 80) - 0.5) * unit * 0.22;
      const usePtr = pointer && !reduce;
      const pr = Math.max(36, unit * 0.55);
      const pr2 = pr * pr;
      const reach = c.reach;

      const bandY = cy + oy - (-0.5 + band) * cp * unit;
      const lineH = Math.max(12, unit * 0.16);
      const lineHalf = unit * Math.max(0.9, A * 0.62);
      const lg = ctx.createLinearGradient(0, bandY - lineH, 0, bandY + lineH);
      lg.addColorStop(0, lineB);
      lg.addColorStop(0.5, lineA);
      lg.addColorStop(1, lineB);
      ctx.fillStyle = lg;
      ctx.fillRect(cx + ox - lineHalf, bandY - lineH, lineHalf * 2, lineH * 2);

      counts.fill(0);
      for (let i = 0; i < c.n; i++) {
        const x = c.x[i];
        const y = c.y[i];
        const z = c.z[i];
        const x1 = x * cyw + z * syw;
        const z1 = -x * syw + z * cyw;
        const y2 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;
        const per = cam / (cam - z2);
        let px = cx + ox + x1 * unit * per;
        let py = cy + oy - y2 * unit * per;
        if (glitch && c.v[i] > g0 && c.v[i] < g0 + 0.09) px += gShift;
        const kind = c.kind[i];
        let b: number;
        if (kind === 0) b = face > 0 ? 0.56 + 0.42 * face : 0.12 + 0.14 * (1 + face);
        else if (kind === 2) b = -face > 0 ? 0.24 + 0.3 * -face : 0.07 + 0.09 * (1 + -face);
        else b = wall;
        b *= 0.6 + 0.4 * c.shade[i];
        let near = 0.5 + (0.5 * z2) / reach;
        if (near < 0) near = 0;
        if (near > 1) near = 1;
        b *= 0.78 + 0.32 * near;
        const du = c.u[i] - band;
        const sc = Math.exp(-(du * du) / 0.0032);
        b += 0.6 * sc;
        let s = c.size[i] * (0.72 + 0.42 * near) * (kind === 0 ? 1.16 : 0.9) * (1 + 0.22 * sc);
        if (usePtr) {
          const dx = px - pxp;
          const dy = py - pyp;
          const d2 = dx * dx + dy * dy;
          if (d2 < pr2) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / pr;
            const push = f * f * pr * 0.16;
            px += (dx / d) * push;
            py += (dy / d) * push;
            b += f * 0.35;
            s *= 1 + f * 0.25;
          }
        }
        sx[i] = px;
        sy[i] = py;
        if (s > 1.4) s = 1.4;
        if (s < 0.6) s = 0.6;
        ss[i] = s;
        if (b > 0.999) b = 0.999;
        if (b < 0) b = 0;
        const bi = Math.floor(b * ALPHAS.length);
        let ti = c.tone[i];
        if (sc > 0.45 && ti > 0) ti--;
        const k = bi * TONES + ti;
        bucket[i] = k;
        counts[k]++;
      }
      let acc0 = 0;
      for (let k = 0; k < buckets; k++) {
        starts[k] = acc0;
        acc0 += counts[k];
      }
      for (let i = 0; i < c.n; i++) order[starts[bucket[i]]++] = i;

      ctx.globalAlpha = 1 - flick;
      let pos = 0;
      for (let k = 0; k < buckets; k++) {
        const n = counts[k];
        if (!n) continue;
        ctx.fillStyle = fills[k];
        ctx.beginPath();
        for (let q = pos; q < pos + n; q++) {
          const i = order[q];
          const s = ss[i];
          ctx.rect(sx[i] - s / 2, sy[i] - s / 2, s, s);
        }
        ctx.fill();
        pos += n;
      }

      ctx.fillStyle = `rgb(${WARM[0]}, ${WARM[1]}, ${WARM[2]})`;
      for (let k = 0; k < nMote; k++) {
        const mx = (hash(k, 61) - 0.5) * Math.max(1, A) * 1.1;
        const sp0 = 0.035 + hash(k, 63) * 0.06;
        const fr = (hash(k, 62) + (reduce ? 0 : time * sp0 * pace)) % 1;
        const my = -0.7 + fr * 1.5;
        const px = cx + ox * 1.6 + mx * unit;
        const py = cy + oy * 1.6 - my * unit;
        ctx.globalAlpha = (0.08 + 0.3 * hash(k, 64)) * Math.sin(fr * Math.PI) * (1 - flick);
        const s = 0.6 + hash(k, 65) * 0.7;
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    }

    function frame(now: number) {
      raf = 0;
      const step = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      time += step;
      let tx = ptx;
      let ty = pty;
      if (!pointer) {
        tx = Math.sin(time * 0.21) * 0.3;
        ty = Math.sin(time * 0.13 + 1.2) * 0.22;
      }
      const ease = Math.min(1, step * 2.4);
      curX += (tx - curX) * ease;
      curY += (ty - curY) * ease;
      draw();
      schedule();
    }

    function schedule() {
      if (reduce || raf || dead || !visible || document.hidden) return;
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
      pxp = e.clientX - rect.left;
      pyp = e.clientY - rect.top;
      ptx = Math.max(-1, Math.min(1, (pxp / rect.width) * 2 - 1));
      pty = Math.max(-1, Math.min(1, (pyp / rect.height) * 2 - 1));
    }
    function onLeave() {
      pointer = false;
    }
    function onVisibility() {
      if (document.hidden) stop();
      else schedule();
    }

    layout();
    rebuild();
    draw();

    const ro = new ResizeObserver(() => {
      layout();
      draw();
      if (resampleTimer) clearTimeout(resampleTimer);
      resampleTimer = setTimeout(() => {
        resampleTimer = null;
        if (dead) return;
        resample(false);
        draw();
      }, 160);
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
      dead = true;
      stop();
      if (resampleTimer) clearTimeout(resampleTimer);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [accent, density, speed, path, viewBox, depth, spin]);

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
  const vars = { "--hb-hh8-accent": accent, "--hb-hh8-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh8 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-logo" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh8-canvas" aria-hidden="true" />
      <header className="hb-hh8-bar">
        <a className="hb-hh8-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-hh8-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh8-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span />
        )}
        <div className="hb-hh8-tools">
          <button type="button" className="hb-hh8-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh8-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh8-stage" aria-hidden="true" />
      <div className="hb-hh8-foot">
        <div className="hb-hh8-copy">
          <Heading className="hb-hh8-title">{title}</Heading>
          {subtitle ? <p className="hb-hh8-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-hh8-side">
            {caption ? <p className="hb-hh8-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh8-row">
                {command ? (
                  <div className="hb-hh8-cmd">
                    <span className="hb-hh8-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh8-code">{command}</code>
                    <button type="button" className="hb-hh8-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                      <span className="hb-hh8-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-hh8-cta" href={primaryCta.href}>
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
        <a className="hb-hh8-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}
