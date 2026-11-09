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
  swing?: number;
  spin?: boolean;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh8-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-hh8 {
  --hb-hh8-accent: #b6ff3c;
  --hb-hh8-ink: #0c0d10;
  --hb-hh8-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 680px;
  overflow: hidden;
  container-type: inline-size;
  background: #e9e9ec;
  color: #16171b;
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
.hb-hh8-bar {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 22px 32px;
}
.hb-hh8-brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #101115;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -.02em;
  text-decoration: none;
  border-radius: 8px;
}
.hb-hh8-mark { flex: none; color: #101115; }
.hb-hh8-links {
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh8-side-l .hb-hh8-links { justify-content: flex-start; }
.hb-hh8-side-r { display: flex; align-items: center; justify-content: flex-end; gap: 6px; }
.hb-hh8-link {
  display: inline-flex;
  padding: 7px 12px;
  border-radius: 8px;
  color: #53545b;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh8-link:hover { color: #101115; background: rgba(16, 17, 21, .07); }
.hb-hh8-search {
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #53545b;
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh8-search:hover { color: #101115; background: rgba(16, 17, 21, .07); }
.hb-hh8-outline {
  display: inline-flex;
  align-items: center;
  height: 34px;
  padding: 0 14px;
  border: 1px solid #16171b;
  border-radius: 8px;
  color: #16171b;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color .2s ease, color .2s ease;
}
.hb-hh8-outline:hover { background: #16171b; color: #e9e9ec; }
.hb-hh8-stage {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  min-height: 300px;
}
.hb-hh8-foot {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 0 32px 56px;
  text-align: center;
}
.hb-hh8-title {
  margin: 0;
  color: #101115;
  font-size: clamp(30px, 4.6cqi, 62px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -.05em;
  text-wrap: balance;
  animation: hb-hh8-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh8-sub {
  max-width: 36em;
  margin: 0;
  color: #50515a;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-hh8-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh8-caption {
  margin: 0;
  color: #6d6e76;
  font-family: var(--hb-hh8-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-hh8-row {
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 100%;
  animation: hb-hh8-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh8-cmd {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  height: 44px;
  padding: 0 6px 0 14px;
  border: 1px solid rgba(16, 17, 21, .18);
  border-radius: 8px;
  background: rgba(255, 255, 255, .55);
}
.hb-hh8-prompt { flex: none; color: #16171b; font-family: var(--hb-hh8-mono); font-size: 12px; font-weight: 700; }
.hb-hh8-code {
  min-width: 0;
  overflow: hidden;
  color: #2b2c33;
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
  border-radius: 8px;
  background: transparent;
  color: #53545b;
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh8-copybtn:hover { color: #101115; background: rgba(16, 17, 21, .08); }
.hb-hh8-copybtn[data-done="true"] { color: #101115; background: var(--hb-hh8-accent); }
.hb-hh8-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 44px;
  padding: 0 16px 0 20px;
  border: 1px solid #16171b;
  border-radius: 8px;
  background: var(--hb-hh8-accent);
  color: var(--hb-hh8-ink);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 3px 3px 0 #16171b;
  transition: transform .15s ease, box-shadow .15s ease;
}
.hb-hh8-cta:hover { transform: translate(1px, 1px); box-shadow: 2px 2px 0 #16171b; }
.hb-hh8-cta svg { transition: transform .2s ease; }
.hb-hh8-cta:hover svg { transform: translateX(2px); }
.hb-hh8-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  color: #53545b;
  font-family: var(--hb-hh8-mono);
  font-size: 11px;
  letter-spacing: .1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: color .2s ease;
}
.hb-hh8-more:hover { color: #101115; }
.hb-hh8 a:focus-visible, .hb-hh8 button:focus-visible {
  outline: 2px solid #16171b;
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
  .hb-hh8-bar { padding: 16px 20px; gap: 12px; }
  .hb-hh8-foot { padding: 0 20px 44px; }
}
@container (max-width: 640px) {
  .hb-hh8-bar { grid-template-columns: 1fr auto 1fr; }
  .hb-hh8-side-l .hb-hh8-links, .hb-hh8-side-r .hb-hh8-links, .hb-hh8-outline { display: none; }
  .hb-hh8-side-l { min-width: 34px; }
  .hb-hh8-stage { min-height: calc(52cqi + 20px); }
  .hb-hh8-sub { font-size: 14px; }
  .hb-hh8-row { flex-direction: column; align-self: stretch; }
  .hb-hh8-cta { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh8-title, .hb-hh8-sub, .hb-hh8-row { animation: none; }
  .hb-hh8-link, .hb-hh8-search, .hb-hh8-outline, .hb-hh8-copybtn, .hb-hh8-cta, .hb-hh8-cta svg, .hb-hh8-more { transition: none; }
  .hb-hh8-cta:hover, .hb-hh8-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotLogoLink[] = [
  { label: "Product", href: "#" },
  { label: "Brand kit", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Changelog", href: "#" },
];
const defaultNavCta: HeroDotLogoLink = { label: "Sign in", href: "#" };
const defaultPrimary: HeroDotLogoLink = { label: "Upload your mark", href: "#" };
const defaultMore: HeroDotLogoLink = { label: "Learn more", href: "#" };

const TAU = Math.PI * 2;
const GRAPHITE = "28, 29, 34";
const LEVELS = 8;

interface Mask {
  on: Uint8Array;
  w: number;
  h: number;
}

interface Cloud {
  n: number;
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  kind: Uint8Array;
  size: Float32Array;
  u: Float32Array;
  sparks: number[];
  aspect: number;
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
  ctx.fillStyle = "#b6ff3c";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const hex = hexRgb(out);
  if (hex) return hex;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return [182, 255, 60];
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#0c0d10";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.5 ? "#0c0d10" : "#ffffff";
}

const DEFAULT_PATH = "M18.0 9.0 H33.0 L28.0 23.0 H13.0 Z M13.5 9.0 H16.1 L11.1 23.0 H8.5 Z M10.0 9.0 H11.6 L6.6 23.0 H5.0 Z M7.2 9.0 H8.1 L3.1 23.0 H2.2 Z";
const DEFAULT_VIEWBOX = "0 0 36 32";

function parseViewBox(value: string): [number, number, number, number] | null {
  const parts = String(value).trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some((p) => !Number.isFinite(p)) || parts[2] <= 0 || parts[3] <= 0) return null;
  return [parts[0], parts[1], parts[2], parts[3]];
}

function rasterPath(d: string, box: [number, number, number, number], rows: number): Mask | null {
  if (!d.trim() || typeof document === "undefined" || typeof Path2D === "undefined") return null;
  let shape: Path2D;
  try {
    shape = new Path2D(d);
  } catch {
    return null;
  }
  const scale = rows / box[3];
  const pad = 3;
  const cw = Math.ceil(box[2] * scale) + pad * 2;
  const ch = Math.ceil(box[3] * scale) + pad * 2;
  if (cw < 4 || ch < 4 || cw * ch > 4000000) return null;
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const g = canvas.getContext("2d", { willReadFrequently: true });
  if (!g) return null;
  g.setTransform(scale, 0, 0, scale, pad - box[0] * scale, pad - box[1] * scale);
  g.fillStyle = "#ffffff";
  g.fill(shape);
  let data: Uint8ClampedArray;
  try {
    data = g.getImageData(0, 0, cw, ch).data;
  } catch {
    return null;
  }
  const on = new Uint8Array(cw * ch);
  for (let k = 0, p = 3; k < cw * ch; k++, p += 4) on[k] = data[p] >= 128 ? 1 : 0;
  return { on, w: cw, h: ch };
}

function maskHeight(m: Mask) {
  let y0 = m.h;
  let y1 = -1;
  for (let j = 1; j < m.h - 1; j++) {
    for (let i = 1; i < m.w - 1; i++) {
      if (!m.on[j * m.w + i]) continue;
      if (j < y0) y0 = j;
      if (j > y1) y1 = j;
      break;
    }
  }
  return y1 < 0 ? 0 : y1 - y0 + 1;
}

function buildCloud(m: Mask, depth: number, layerCap: number): Cloud | null {
  const { on, w, h } = m;
  let x0 = w;
  let y0 = h;
  let x1 = -1;
  let y1 = -1;
  for (let j = 1; j < h - 1; j++) {
    for (let i = 1; i < w - 1; i++) {
      if (!on[j * w + i]) continue;
      if (i < x0) x0 = i;
      if (i > x1) x1 = i;
      if (j < y0) y0 = j;
      if (j > y1) y1 = j;
    }
  }
  if (x1 < 0) return null;
  const bw = x1 - x0 + 1;
  const bh = y1 - y0 + 1;
  const cxm = (x0 + x1 + 1) / 2;
  const cym = (y0 + y1 + 1) / 2;
  const half = depth / 2;
  const layers = Math.max(2, Math.min(layerCap, Math.round((depth * bh) / 1.7)));
  const xs: number[] = [];
  const ys: number[] = [];
  const zs: number[] = [];
  const ks: number[] = [];
  const ss: number[] = [];
  const us: number[] = [];
  const front: number[] = [];
  for (let j = 1; j < h - 1; j++) {
    for (let i = 1; i < w - 1; i++) {
      const k = j * w + i;
      if (!on[k]) continue;
      const edge = !on[k - 1] || !on[k + 1] || !on[k - w] || !on[k + w];
      const x = (i + 0.5 + (hash(k, 1) - 0.5) * 0.18 - cxm) / bh;
      const y = (cym - j - 0.5 - (hash(k, 2) - 0.5) * 0.18) / bh;
      const u = ((i - x0) / bw + (y1 - j) / bh) * 0.5;
      const sz = 0.86 + hash(k, 3) * 0.28;
      front.push(xs.length);
      xs.push(x);
      ys.push(y);
      zs.push(half);
      ks.push(edge ? 4 : 0);
      ss.push(sz);
      us.push(u);
      if (hash(k, 5) < 0.42) {
        xs.push(x);
        ys.push(y);
        zs.push(-half);
        ks.push(2);
        ss.push(sz * 0.9);
        us.push(u);
      }
      if (edge) {
        for (let q = 1; q < layers; q++) {
          xs.push(x);
          ys.push(y);
          zs.push(half - (depth * q) / layers);
          ks.push(1);
          ss.push(sz * 0.9);
          us.push(u);
        }
      }
      if ((i & 1) === 0 && (j & 1) === 0) {
        xs.push(x);
        ys.push(y);
        zs.push(half);
        ks.push(3);
        ss.push(sz);
        us.push(u);
      }
    }
  }
  const n = xs.length;
  const sparks: number[] = [];
  for (let q = 0; q < 14 && front.length; q++) sparks.push(front[Math.floor(hash(q, 41) * front.length)]);
  return {
    n,
    x: Float32Array.from(xs),
    y: Float32Array.from(ys),
    z: Float32Array.from(zs),
    kind: Uint8Array.from(ks),
    size: Float32Array.from(ss),
    u: Float32Array.from(us),
    sparks,
    aspect: bw / bh,
  };
}

function Mark() {
  return (
    <svg className="hb-hh8-mark" width="22" height="20" viewBox="0 0 36 32" fill="currentColor" aria-hidden="true">
      <path d={DEFAULT_PATH} />
    </svg>
  );
}

function NavList({ items }: { items: HeroDotLogoLink[] }) {
  if (!items.length) return null;
  return (
    <ul className="hb-hh8-links">
      {items.map((item) => (
        <li key={item.label}>
          <a className="hb-hh8-link" href={item.href}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function HeroDotLogo({
  title = "Your mark, in a thousand dots.",
  subtitle = "Paste any SVG path and it becomes a swinging dotted object with real depth and a soft dotted shadow. One file, no runtime.",
  caption = "Any SVG path · extruded dots · MIT licensed",
  command = "npx hyperblur add hero-dot-logo",
  primaryCta = defaultPrimary,
  brand = "Slipstream",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#b6ff3c",
  density = 1,
  speed = 1,
  path = DEFAULT_PATH,
  viewBox = DEFAULT_VIEWBOX,
  depth = 0.35,
  swing = 34,
  spin = false,
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
    const mult = Math.min(2, Math.max(0.3, Number.isFinite(density) ? density : 1));
    const pace = Math.max(0, Number.isFinite(speed) ? speed : 1);
    const deep = Math.min(1.2, Math.max(0.02, Number.isFinite(depth) ? depth : 0.35));
    const swingRad = (Math.min(80, Math.max(0, Number.isFinite(swing) ? swing : 34)) * Math.PI) / 180;
    const pathD = typeof path === "string" ? path : "";
    const box = parseViewBox(viewBox) ?? parseViewBox(DEFAULT_VIEWBOX);
    const lime = resolveRgb(accent, ctx);
    const limeFill = `rgb(${lime[0]}, ${lime[1]}, ${lime[2]})`;
    const alphas: string[] = [];
    for (let b = 0; b < LEVELS; b++) alphas.push(`rgba(${GRAPHITE}, ${(0.1 + (0.86 * b) / (LEVELS - 1)).toFixed(3)})`);
    const counts = new Int32Array(LEVELS);
    const starts = new Int32Array(LEVELS);

    let cloud: Cloud | null = null;
    let sampledRows = 0;
    let sx = new Float32Array(0);
    let sy = new Float32Array(0);
    let sr = new Float32Array(0);
    let bucket = new Uint8Array(0);
    let order = new Int32Array(0);
    let dead = false;
    let w = 0;
    let h = 0;
    let lw = 0;
    let cx = 0;
    let cy = 0;
    let top = 0;
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
    let curX = 0;
    let curY = 0;
    let resampleTimer: ReturnType<typeof setTimeout> | null = null;

    function aspectGuess() {
      return cloud ? cloud.aspect : 1.1;
    }

    function fitUnit() {
      return Math.max(40, Math.min(availW / aspectGuess(), availH));
    }

    function spacing() {
      return (lw < 640 ? 6.4 : 9) / Math.sqrt(mult);
    }

    function resample(force: boolean) {
      if (!box) return;
      const want = Math.min(240, Math.max(36, Math.round(fitUnit() / spacing())));
      if (!force && cloud && Math.abs(want - sampledRows) / sampledRows < 0.1) return;
      const cap = lw < 640 ? 8 : 12;
      const make = (d: string, bx: [number, number, number, number]) => {
        const probe = rasterPath(d, bx, 48);
        const pb = probe ? maskHeight(probe) : 0;
        if (!probe || !pb) return null;
        const m = rasterPath(d, bx, Math.min(900, (want * 48) / pb));
        return m ? buildCloud(m, deep, cap) : null;
      };
      let c = make(pathD, box);
      if (!c) {
        const fb = parseViewBox(DEFAULT_VIEWBOX);
        if (fb) c = make(DEFAULT_PATH, fb);
      }
      cloud = c;
      sampledRows = want;
      const n = c ? c.n : 0;
      if (sx.length < n) {
        sx = new Float32Array(n);
        sy = new Float32Array(n);
        sr = new Float32Array(n);
        bucket = new Uint8Array(n);
        order = new Int32Array(n);
      }
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
      const st = stage.getBoundingClientRect();
      cx = w / 2;
      top = st.top - rect.top;
      if (lw < 640) {
        availW = w * 0.8;
        availH = st.height * 0.9;
        cy = top + st.height * 0.5;
      } else {
        availW = w * 0.7;
        availH = st.height * 0.9;
        cy = top + st.height * 0.46;
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
      const phase = time * 0.55 * pace;
      let yaw: number;
      let roll: number;
      if (reduce) {
        yaw = swingRad * 0.42;
        roll = 0.028;
      } else if (spin) {
        yaw = phase - 0.36 * Math.sin(2 * phase);
        roll = 0.03 * Math.sin(phase * 0.7);
      } else {
        yaw = swingRad * Math.sin(phase);
        roll = 0.07 * Math.sin(phase - 0.5);
      }
      yaw += curX * 0.22;
      const pitch = 0.05 + curY * 0.14;
      const cyw = Math.cos(yaw);
      const syw = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const cr = Math.cos(roll);
      const sr0 = Math.sin(roll);
      const cam = Math.max(3.4, A * 1.6);
      const face = cyw * cp;
      const wall = 0.34 + 0.34 * Math.abs(syw);
      const pivotY = top - unit * 0.1;
      const rad = (lw < 640 ? 1.5 : 2.1) * Math.sqrt(unit / 520 + 0.2);
      const band = reduce ? 0.46 : -0.15 + (((time * pace) / 5.5) % 1) * 1.3;
      const zw = -(deep / 2 + 0.42);
      const perW = cam / (cam - zw);

      ctx.fillStyle = `rgba(${GRAPHITE}, 0.1)`;
      ctx.beginPath();
      for (let i = 0; i < c.n; i++) {
        if (c.kind[i] !== 3) continue;
        const x = c.x[i];
        const y = c.y[i];
        const z = c.z[i];
        const xr = x * cyw + z * syw;
        const zr = -x * syw + z * cyw;
        const t = zr - zw;
        const px = cx + (xr + 0.3 * t) * unit * perW + unit * 0.02;
        const py = cy - (y - 0.42 * t) * unit * perW - unit * 0.03;
        const r = rad * (0.9 + 0.5 * t) * c.size[i];
        ctx.moveTo(px + r, py);
        ctx.arc(px, py, r, 0, TAU);
      }
      ctx.fill();

      counts.fill(0);
      for (let i = 0; i < c.n; i++) {
        const kind = c.kind[i];
        if (kind === 3) {
          bucket[i] = 255;
          continue;
        }
        const x = c.x[i];
        const y = c.y[i];
        const z = c.z[i];
        const x1 = x * cyw + z * syw;
        const z1 = -x * syw + z * cyw;
        const y2 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;
        const per = cam / (cam - z2);
        const dx = x1 * unit * per;
        const dy = y2 * unit * per;
        const ry = cy - dy - pivotY;
        const rx = cx + dx - cx;
        sx[i] = cx + rx * cr - ry * sr0;
        sy[i] = pivotY + rx * sr0 + ry * cr;
        let b: number;
        if (kind === 0 || kind === 4) b = (face > 0 ? 0.62 + 0.38 * face : 0.2) + (kind === 4 ? 0.1 : 0);
        else if (kind === 1) b = wall;
        else b = 0.16 + 0.08 * (1 - face);
        if (b > 0.999) b = 0.999;
        if (b < 0) b = 0;
        sr[i] = rad * per * c.size[i] * (kind === 2 ? 0.85 : kind === 1 ? 0.8 : 1);
        const bi = Math.floor(b * LEVELS);
        bucket[i] = bi;
        counts[bi]++;
      }
      let acc0 = 0;
      for (let k = 0; k < LEVELS; k++) {
        starts[k] = acc0;
        acc0 += counts[k];
      }
      for (let i = 0; i < c.n; i++) if (bucket[i] !== 255) order[starts[bucket[i]]++] = i;
      let pos = 0;
      for (let k = 0; k < LEVELS; k++) {
        const m = counts[k];
        if (!m) continue;
        ctx.fillStyle = alphas[k];
        ctx.beginPath();
        for (let q = pos; q < pos + m; q++) {
          const i = order[q];
          const r = sr[i];
          ctx.moveTo(sx[i] + r, sy[i]);
          ctx.arc(sx[i], sy[i], r, 0, TAU);
        }
        ctx.fill();
        pos += m;
      }

      if (face > 0.2) {
        ctx.fillStyle = limeFill;
        ctx.strokeStyle = `rgba(${GRAPHITE}, 0.9)`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        for (let i = 0; i < c.n; i++) {
          const kind = c.kind[i];
          if (kind !== 0 && kind !== 4) continue;
          const du = c.u[i] - band;
          if (du * du > 0.0009) continue;
          if (hash(i, 13) > 0.8) continue;
          const r = sr[i] * 1.35;
          ctx.moveTo(sx[i] + r, sy[i]);
          ctx.arc(sx[i], sy[i], r, 0, TAU);
        }
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        for (let q = 0; q < c.sparks.length; q++) {
          const i = c.sparks[q];
          if (!reduce && Math.sin(time * 0.9 * pace + q * 2.3) < 0.2) continue;
          const r = sr[i] * 1.9;
          ctx.moveTo(sx[i] + r, sy[i]);
          ctx.arc(sx[i], sy[i], r, 0, TAU);
        }
        ctx.fill();
        ctx.stroke();
      }
    }

    function frame(now: number) {
      raf = 0;
      const step = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      time += step;
      const tx = pointer ? ptx : 0;
      const ty = pointer ? pty : 0;
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
    resample(true);
    layout();
    resample(false);
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
  }, [accent, density, speed, path, viewBox, depth, swing, spin]);

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
  const cut = Math.ceil(nav.length / 2);

  return (
    <section ref={rootRef} className={`hb-hh8 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-logo" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh8-canvas" aria-hidden="true" />
      <header className="hb-hh8-bar">
        <nav className="hb-hh8-side-l" aria-label="Primary">
          <NavList items={nav.slice(0, cut)} />
        </nav>
        <a className="hb-hh8-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        <div className="hb-hh8-side-r">
          <NavList items={nav.slice(cut)} />
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
        <Heading className="hb-hh8-title">{title}</Heading>
        {subtitle ? <p className="hb-hh8-sub">{subtitle}</p> : null}
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
        {caption ? <p className="hb-hh8-caption">{caption}</p> : null}
        {learnMore ? (
          <a className="hb-hh8-more" href={learnMore.href}>
            <span>{learnMore.label}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        ) : null}
      </div>
    </section>
  );
}
