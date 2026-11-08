"use client";

import * as React from "react";

export interface HeroDotSilhouetteLink {
  label: string;
  href: string;
}

export interface HeroDotSilhouetteProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotSilhouetteLink | null;
  brand?: string;
  nav?: HeroDotSilhouetteLink[];
  navCta?: HeroDotSilhouetteLink | null;
  learnMore?: HeroDotSilhouetteLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  src?: string;
  relief?: number;
  swing?: number;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh9-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh9-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
.hb-hh9 {
  --hb-hh9-accent: #ff8a4c;
  --hb-hh9-ink: #1a0a02;
  --hb-hh9-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
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
    radial-gradient(44% 56% at 50% 40%, color-mix(in srgb, var(--hb-hh9-accent) 7%, transparent), transparent 70%),
    #020202;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}
.hb-hh9 *, .hb-hh9 *::before, .hb-hh9 *::after { box-sizing: border-box; }
.hb-hh9-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh9::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 48%;
  pointer-events: none;
  background: linear-gradient(to top, #020202 0%, rgba(2, 2, 2, .86) 38%, rgba(2, 2, 2, 0) 100%);
}
.hb-hh9-bar {
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
.hb-hh9-brand {
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
.hb-hh9-mark { flex: none; color: var(--hb-hh9-accent); }
.hb-hh9-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh9-link {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--hb-hh9-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh9-link:hover { color: #ededed; background: rgba(255, 255, 255, .05); }
.hb-hh9-tools {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.hb-hh9-search {
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
.hb-hh9-search:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-hh9-outline {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #ededed;
  font-family: var(--hb-hh9-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-hh9-outline:hover { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .04); }
.hb-hh9-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 240px;
}
.hb-hh9-foot {
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
.hb-hh9-copy { min-width: 0; }
.hb-hh9-title {
  max-width: 11em;
  margin: 0;
  color: #f5f5f5;
  font-size: clamp(28px, 5.4cqi, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-hh9-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh9-sub {
  max-width: 34em;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-hh9-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh9-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-hh9-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh9-caption {
  margin: 0;
  color: #6f6f6f;
  font-family: var(--hb-hh9-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-hh9-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-hh9-cmd {
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
.hb-hh9-prompt { flex: none; color: var(--hb-hh9-accent); font-family: var(--hb-hh9-mono); font-size: 12px; }
.hb-hh9-code {
  min-width: 0;
  overflow: hidden;
  color: #d6d6d6;
  font-family: var(--hb-hh9-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh9-copybtn {
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
.hb-hh9-copybtn:hover { color: #ededed; background: rgba(255, 255, 255, .07); }
.hb-hh9-copybtn[data-done="true"] { color: var(--hb-hh9-accent); }
.hb-hh9-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 10px;
  background: var(--hb-hh9-accent);
  color: var(--hb-hh9-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 28px -10px var(--hb-hh9-accent);
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh9-cta:hover { filter: brightness(1.08); }
.hb-hh9-cta svg { transition: transform .2s ease; }
.hb-hh9-cta:hover svg { transform: translateX(2px); }
.hb-hh9-more {
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
  font-family: var(--hb-hh9-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-hh9-more:hover { color: #ededed; }
.hb-hh9-more svg { animation: hb-hh9-bob 1.8s ease-in-out infinite; }
.hb-hh9 a:focus-visible, .hb-hh9 button:focus-visible {
  outline: 2px solid var(--hb-hh9-accent);
  outline-offset: 2px;
}
.hb-hh9-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-hh9-foot { grid-template-columns: minmax(0, 1fr); padding: 0 24px 72px; }
  .hb-hh9-bar { padding: 16px 24px; }
}
@container (max-width: 640px) {
  .hb-hh9-bar { grid-template-columns: 1fr auto; }
  .hb-hh9-links, .hb-hh9-search { display: none; }
  .hb-hh9-stage { min-height: calc(92cqi + 24px); }
  .hb-hh9-sub { font-size: 14px; }
  .hb-hh9-side, .hb-hh9-row { align-self: stretch; }
  .hb-hh9-row { flex-direction: column; }
  .hb-hh9-cta { width: 100%; }
}
@container (max-width: 360px) {
  .hb-hh9-bar { padding: 14px 18px; }
  .hb-hh9-foot { padding: 0 18px 68px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh9-title, .hb-hh9-sub, .hb-hh9-side, .hb-hh9-more svg { animation: none; }
  .hb-hh9-link, .hb-hh9-search, .hb-hh9-outline, .hb-hh9-copybtn, .hb-hh9-cta, .hb-hh9-cta svg, .hb-hh9-more { transition: none; }
  .hb-hh9-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotSilhouetteLink[] = [
  { label: "Missions", href: "#" },
  { label: "Telemetry", href: "#" },
  { label: "Careers", href: "#" },
];
const defaultNavCta: HeroDotSilhouetteLink = { label: "Sign in", href: "#" };
const defaultPrimary: HeroDotSilhouetteLink = { label: "Book a launch", href: "#" };
const defaultMore: HeroDotSilhouetteLink = { label: "Learn more", href: "#" };

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
  ctx.fillStyle = "#ff8a4c";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const hex = hexRgb(out);
  if (hex) return hex;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return [255, 138, 76];
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#1a0a02";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#1a0a02" : "#ffffff";
}

function flickerAt(t: number) {
  const slot = Math.floor(t * 5);
  if (hash(slot, 77) < 0.94) return 0;
  const f = t * 5 - slot;
  return (0.05 + hash(slot, 78) * 0.09) * Math.sin(f * Math.PI);
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

function sampleCloud(source: Source, wantRows: number, budget: number, o: CloudOptions) {
  let rows = wantRows;
  let m: Mask | null = null;
  for (let a = 0; a < 4; a++) {
    m = source.raster(rows / source.baseH);
    if (!m) return null;
    const total = countCloud(m, o);
    if (total <= budget) break;
    rows *= Math.sqrt(budget / total) * 0.96;
  }
  return m ? buildCloud(m, o) : null;
}

const ROCKET_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"><path fill="#e4e4e4" fill-rule="evenodd" d="M100 14C130 40 146 90 146 148V184H54V148C54 90 70 40 100 14ZM127 112A27 27 0 1 0 73 112A27 27 0 1 0 127 112Z"/><circle cx="100" cy="112" r="19" fill="#767676"/><path fill="#bdbdbd" d="M54 191H146V212H54Z"/><path fill="#a8a8a8" d="M50 150C37 163 26 184 22 214V242L50 218Z"/><path fill="#a8a8a8" d="M150 150C163 163 174 184 178 214V242L150 218Z"/><path fill="#8e8e8e" d="M74 217H126L118 238H82Z"/><path fill="#ffffff" d="M80 245H120C118 263 110 277 100 296C90 277 82 263 80 245Z"/></svg>';
const ROCKET = `data:image/svg+xml,${encodeURIComponent(ROCKET_SVG)}`;

interface ImageMode {
  alpha: boolean | null;
}

function rasterImage(img: HTMLImageElement, k: number, mode: ImageMode): Mask | null {
  if (typeof document === "undefined") return null;
  const iw = img.naturalWidth || img.width || 300;
  const ih = img.naturalHeight || img.height || 300;
  const scale = (100 * k) / Math.max(iw, ih);
  const pad = 3;
  const dw = Math.max(2, Math.round(iw * scale));
  const dh = Math.max(2, Math.round(ih * scale));
  const cw = dw + pad * 2;
  const ch = dh + pad * 2;
  if (cw * ch > 9000000) return null;
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const g = canvas.getContext("2d", { willReadFrequently: true });
  if (!g) return null;
  let data: Uint8ClampedArray;
  try {
    g.drawImage(img, pad, pad, dw, dh);
    data = g.getImageData(0, 0, cw, ch).data;
  } catch {
    return null;
  }
  if (mode.alpha === null) {
    let clear = 0;
    for (let j = pad; j < pad + dh; j++) {
      for (let i = pad; i < pad + dw; i++) if (data[(j * cw + i) * 4 + 3] < 250) clear++;
    }
    mode.alpha = clear > dw * dh * 0.01;
  }
  const on = new Uint8Array(cw * ch);
  const lum = new Float32Array(cw * ch);
  for (let q = 0, p = 0; q < cw * ch; q++, p += 4) {
    const a = data[p + 3];
    if (a < 128) continue;
    const l = (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255;
    if (mode.alpha) {
      on[q] = 1;
      lum[q] = l;
    } else if (l < 0.5) {
      on[q] = 1;
      lum[q] = 1 - l;
    }
  }
  return { on, lum, w: cw, h: ch };
}

function Mark() {
  return (
    <svg className="hb-hh9-mark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.8c2.6 2.2 3.9 5.6 3.9 9.6v4.4H8.1v-4.4c0-4 1.3-7.4 3.9-9.6Z" />
      <circle cx="12" cy="10" r="1.6" />
      <path d="M8.1 13.4 5.4 16.6v3l2.7-1.8M15.9 13.4l2.7 3.2v3l-2.7-1.8M10.4 19.4 12 22l1.6-2.6" />
    </svg>
  );
}

export function HeroDotSilhouette({
  title = "Launch day, rendered in light.",
  subtitle = "Feed it any SVG or PNG and the outline becomes a hologram of dots with relief taken from its tones. Ships as one file you own.",
  caption = "SVG or PNG · luminance relief · MIT licensed",
  command = "npx hyperblur add hero-dot-silhouette",
  primaryCta = defaultPrimary,
  brand = "Apogee",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#ff8a4c",
  density = 1,
  speed = 1,
  src = ROCKET,
  relief = 0.25,
  swing = 28,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotSilhouetteProps) {
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
    const lift = Math.min(1, Math.max(0, Number.isFinite(relief) ? relief : 0.25));
    const swingRad = (Math.min(80, Math.max(0, Number.isFinite(swing) ? swing : 28)) * Math.PI) / 180;
    const opts: CloudOptions = { depth: 0.07, mids: 2, backKeep: 0.35, relief: lift, axis: 1 };
    const url = typeof src === "string" && src.trim() ? src.trim() : ROCKET;

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

    let source: Source | null = null;
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
      const a = source ? source.aspect : 1;
      return Math.max(4, Math.min(availW / a, availH));
    }

    function budget() {
      return Math.round((lw < 640 ? 9000 : 18000) * mult);
    }

    function wantRows() {
      return Math.min(220, Math.max(26, fitUnit() / 2.3));
    }

    function resample(force: boolean) {
      if (!source) {
        cloud = null;
        return;
      }
      const want = wantRows();
      const bud = budget();
      if (!force && cloud && Math.abs(want - sampledRows) / sampledRows < 0.12 && bud === sampledBudget) return;
      cloud = sampleCloud(source, want, bud, opts);
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

    function load(href: string, fallback: boolean) {
      const im = new Image();
      if (!/^(data|blob):/i.test(href)) im.crossOrigin = "anonymous";
      im.decoding = "async";
      im.onload = () => {
        if (dead) return;
        const mode: ImageMode = { alpha: null };
        const made = makeSource((k) => rasterImage(im, k, mode));
        if (!made && !fallback) {
          load(ROCKET, true);
          return;
        }
        source = made;
        resample(true);
        draw();
      };
      im.onerror = () => {
        if (dead || fallback) return;
        load(ROCKET, true);
      };
      im.src = href;
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
        availW = w * 0.8;
        availH = st.height * 0.86;
        cy = st.top - rect.top + st.height / 2;
      } else {
        availW = w * 0.5;
        availH = h * 0.58;
        cy = h * 0.41;
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
      const gsx = Math.max(0.6, A * 0.9);
      ctx.scale(gsx, 1);
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, unit * 1.2);
      glow.addColorStop(0, glowA);
      glow.addColorStop(1, glowB);
      ctx.fillStyle = glow;
      ctx.fillRect(-unit * 1.3, -unit * 1.3, unit * 2.6, unit * 2.6);
      ctx.restore();

      const yaw = (reduce ? swingRad * 0.45 : swingRad * Math.sin(time * 0.45 * pace)) + curX * 0.32;
      const pitch = 0.04 + curY * 0.26;
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
      const lineH = Math.max(12, unit * 0.1);
      const lineHalf = unit * Math.max(0.5, A * 0.75);
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
        const mx = (hash(k, 61) - 0.5) * Math.max(0.6, A) * 1.4;
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
    draw();
    load(url, url === ROCKET);

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
  }, [accent, density, speed, src, relief, swing]);

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
  const vars = { "--hb-hh9-accent": accent, "--hb-hh9-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh9 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-silhouette" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh9-canvas" aria-hidden="true" />
      <header className="hb-hh9-bar">
        <a className="hb-hh9-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-hh9-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh9-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span />
        )}
        <div className="hb-hh9-tools">
          <button type="button" className="hb-hh9-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh9-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh9-stage" aria-hidden="true" />
      <div className="hb-hh9-foot">
        <div className="hb-hh9-copy">
          <Heading className="hb-hh9-title">{title}</Heading>
          {subtitle ? <p className="hb-hh9-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-hh9-side">
            {caption ? <p className="hb-hh9-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh9-row">
                {command ? (
                  <div className="hb-hh9-cmd">
                    <span className="hb-hh9-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh9-code">{command}</code>
                    <button type="button" className="hb-hh9-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                      <span className="hb-hh9-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-hh9-cta" href={primaryCta.href}>
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
        <a className="hb-hh9-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}
