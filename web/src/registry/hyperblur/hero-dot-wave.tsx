"use client";

import * as React from "react";

export interface HeroDotWaveLink {
  label: string;
  href: string;
}

export interface HeroDotWaveProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotWaveLink | null;
  brand?: string;
  nav?: HeroDotWaveLink[];
  navCta?: HeroDotWaveLink | null;
  learnMore?: HeroDotWaveLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  amplitude?: number;
  ripples?: boolean;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh6-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh6-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
.hb-hh6 {
  --hb-hh6-accent: #4da3ff;
  --hb-hh6-ink: #020c18;
  --hb-hh6-mono: var(--font-mono, ui-monospace), "Geist Mono", SFMono-Regular, Menlo, Consolas, monospace;
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
    radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--hb-hh6-accent) 6%, transparent), transparent 70%),
    #020202;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hh6 *, .hb-hh6 *::before, .hb-hh6 *::after { box-sizing: border-box; }
.hb-hh6-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh6::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 52%;
  pointer-events: none;
  background: linear-gradient(to top, #020202 0%, rgba(2, 2, 2, .86) 38%, rgba(2, 2, 2, 0) 100%);
}
.hb-hh6-bar {
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
.hb-hh6-brand {
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
.hb-hh6-mark { flex: none; color: var(--hb-hh6-accent); }
.hb-hh6-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh6-link {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--hb-hh6-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh6-link:hover { color: #ededed; background: rgba(255, 255, 255, .05); }
.hb-hh6-tools {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.hb-hh6-search {
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
.hb-hh6-search:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-hh6-outline {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #ededed;
  font-family: var(--hb-hh6-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-hh6-outline:hover { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .04); }
.hb-hh6-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 240px;
}
.hb-hh6-foot {
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
.hb-hh6-copy { min-width: 0; }
.hb-hh6-title {
  max-width: 11em;
  margin: 0;
  color: #f5f5f5;
  font-size: clamp(28px, 5.4cqi, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-hh6-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh6-sub {
  max-width: 34em;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-hh6-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh6-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-hh6-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh6-caption {
  margin: 0;
  color: #6f6f6f;
  font-family: var(--hb-hh6-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-hh6-caption b { color: var(--hb-hh6-accent); font-weight: 500; }
.hb-hh6-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-hh6-cmd {
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
.hb-hh6-prompt { flex: none; color: var(--hb-hh6-accent); font-family: var(--hb-hh6-mono); font-size: 12px; }
.hb-hh6-code {
  min-width: 0;
  overflow: hidden;
  color: #d6d6d6;
  font-family: var(--hb-hh6-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh6-copybtn {
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
.hb-hh6-copybtn:hover { color: #ededed; background: rgba(255, 255, 255, .07); }
.hb-hh6-copybtn[data-done="true"] { color: var(--hb-hh6-accent); }
.hb-hh6-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 10px;
  background: var(--hb-hh6-accent);
  color: var(--hb-hh6-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 28px -10px var(--hb-hh6-accent);
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh6-cta:hover { filter: brightness(1.08); }
.hb-hh6-cta svg { transition: transform .2s ease; }
.hb-hh6-cta:hover svg { transform: translateX(2px); }
.hb-hh6-more {
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
  font-family: var(--hb-hh6-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-hh6-more:hover { color: #ededed; }
.hb-hh6-more svg { animation: hb-hh6-bob 1.8s ease-in-out infinite; }
.hb-hh6 a:focus-visible, .hb-hh6 button:focus-visible {
  outline: 2px solid var(--hb-hh6-accent);
  outline-offset: 2px;
}
.hb-hh6-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-hh6-foot { grid-template-columns: minmax(0, 1fr); padding: 0 24px 72px; }
  .hb-hh6-bar { padding: 16px 24px; }
}
@container (max-width: 640px) {
  .hb-hh6-bar { grid-template-columns: 1fr auto; }
  .hb-hh6-links, .hb-hh6-search { display: none; }
  .hb-hh6-stage { min-height: calc(80cqi + 24px); }
  .hb-hh6-sub { font-size: 14px; }
  .hb-hh6-side, .hb-hh6-row { align-self: stretch; }
  .hb-hh6-row { flex-direction: column; }
  .hb-hh6-cta { width: 100%; }
}
@container (max-width: 360px) {
  .hb-hh6-bar { padding: 14px 18px; }
  .hb-hh6-foot { padding: 0 18px 68px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh6-title, .hb-hh6-sub, .hb-hh6-side, .hb-hh6-more svg { animation: none; }
  .hb-hh6-link, .hb-hh6-search, .hb-hh6-outline, .hb-hh6-copybtn, .hb-hh6-cta, .hb-hh6-cta svg, .hb-hh6-more { transition: none; }
  .hb-hh6-cta:hover svg { transform: none; }
}
.hb-hh6::after { height: 34%; background: linear-gradient(to top, rgba(2, 2, 2, .82) 0%, rgba(2, 2, 2, .42) 45%, rgba(2, 2, 2, 0) 100%); }
.hb-hh6-title, .hb-hh6-sub { text-shadow: 0 2px 18px rgba(2, 2, 2, .9); }
`;

const defaultNav: HeroDotWaveLink[] = [
  { label: "Platform", href: "#" },
  { label: "Customers", href: "#" },
  { label: "Docs", href: "#" },
];
const defaultNavCta: HeroDotWaveLink = { label: "Sign in", href: "#" };
const defaultPrimary: HeroDotWaveLink = { label: "Book a demo", href: "#" };
const defaultMore: HeroDotWaveLink = { label: "See the platform", href: "#" };

const WARM: [number, number, number] = [244, 247, 255];
const ALPHAS = [0.05, 0.1, 0.17, 0.26, 0.37, 0.5, 0.65, 0.82, 1];
const TONES = 4;
const Z0 = 1.2;
const Z1 = 9;
const CAM = 1.3;
const MAX_RIPPLES = 10;

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
  ctx.fillStyle = "#4da3ff";
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
  if (!rgb) return "#020c18";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#020c18" : "#ffffff";
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

export function waveHeight(x: number, z: number, t: number) {
  return (
    0.12 * Math.sin(1.4 * x + 0.9 * z - 1.2 * t) +
    0.08 * Math.sin(-x + 1.9 * z + 0.85 * t + 1.3) +
    0.045 * Math.sin(2.8 * x - 1.3 * z + 1.7 * t + 0.4) +
    0.03 * Math.sin(0.6 * x + 3.4 * z - 2.1 * t)
  );
}

export function rippleHeight(d: number, age: number, amp: number) {
  const g = d - 1.7 * age;
  return amp * Math.exp(-age * 0.55) * Math.exp(-g * g * 2.4) * Math.cos(g * 6) * smooth(age / 0.25);
}

export function waveRows(rows: number) {
  const z = new Float32Array(rows);
  for (let r = 0; r < rows; r++) z[r] = Z0 * Math.pow(Z1 / Z0, r / Math.max(1, rows - 1));
  return z;
}

function Mark() {
  return (
    <svg className="hb-hh6-mark" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 9.5c2.4 0 2.4-2.5 4.75-2.5S9.6 9.5 12 9.5s2.4-2.5 4.75-2.5 2.35 2.5 4.75 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M2.5 14c2.4 0 2.4-2.5 4.75-2.5S9.6 14 12 14s2.4-2.5 4.75-2.5S19.1 14 21.5 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeDasharray="1.2 2.3" />
      <path d="M2.5 18.5c2.4 0 2.4-2.5 4.75-2.5s2.35 2.5 4.75 2.5 2.4-2.5 4.75-2.5 2.35 2.5 4.75 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeDasharray="0.6 3" />
    </svg>
  );
}

export function HeroDotWave({
  title = "See the ripple before it becomes the outage.",
  subtitle = "Real-time observability that folds noisy telemetry into one calm surface. Every spike, traced to the line that caused it.",
  caption = "120M events per minute · p99 38 ms · MIT licensed",
  command = "npx hyperblur add hero-dot-wave",
  primaryCta = defaultPrimary,
  brand = "Tideline",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#4da3ff",
  density = 1,
  speed = 1,
  amplitude = 1,
  ripples = true,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotWaveProps) {
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
    const amp = Math.min(3, Math.max(0, Number.isFinite(amplitude) ? amplitude : 1));
    const live = ripples && !reduce;
    const sq = Math.sqrt(mult);

    const maxCols = Math.max(24, Math.round(140 * sq));
    const rows = Math.max(16, Math.round(76 * sq));
    const zr = waveRows(rows);
    let cols = maxCols;
    const cap = maxCols * rows + 8;
    const hy = new Float32Array(cap);
    const sx = new Float32Array(cap);
    const sy = new Float32Array(cap);
    const ss = new Float32Array(cap);
    const bucket = new Uint8Array(cap);
    const order = new Int32Array(cap);
    const buckets = ALPHAS.length * TONES;
    const counts = new Int32Array(buckets);
    const starts = new Int32Array(buckets);

    const rx = new Float32Array(MAX_RIPPLES);
    const rz = new Float32Array(MAX_RIPPLES);
    const rt = new Float32Array(MAX_RIPPLES);
    const ra = new Float32Array(MAX_RIPPLES);
    let rHead = 0;
    let rLive = 0;
    let lastSpawn = -10;
    let nextIdle = 1.2;
    let idleSlot = 0;

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
    let horizon = 0;
    let near = 0;
    let F = 1;
    let span = 1;
    let dpr = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = reduce ? 3 : 0;
    let pointer = false;
    let ptx = 0;
    let pty = 0;
    let pxl = 0;
    let pyl = 0;
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
      ctx.globalCompositeOperation = "lighter";
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
      ctx.globalCompositeOperation = "source-over";
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
      if (w < 640) {
        const st = stage.getBoundingClientRect();
        const top = st.top - rect.top;
        horizon = top + st.height * 0.08;
        near = top + st.height * 1.08;
        cols = Math.max(24, Math.round(maxCols * 0.62));
      } else {
        horizon = h * 0.24;
        near = h * 0.96;
        cols = maxCols;
      }
      F = ((near - horizon) * Z0) / CAM;
      span = w * 0.58;
    }

    function spawn(x: number, z: number, strength: number) {
      rx[rHead] = x;
      rz[rHead] = z;
      rt[rHead] = time;
      ra[rHead] = strength;
      rHead = (rHead + 1) % MAX_RIPPLES;
      if (rLive < MAX_RIPPLES) rLive++;
    }

    function toWorld(px: number, py: number) {
      const below = py - horizon - curY * h * 0.02;
      if (below < 6) return null;
      const z = (F * CAM) / below;
      if (z < Z0 * 0.8 || z > Z1) return null;
      const x = ((px - cx - curX * w * 0.04 * (Z0 / z)) * z) / F;
      return [x, z] as const;
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const at = time * pace;
      const hShift = curY * h * 0.02;

      const sky = ctx.createLinearGradient(0, horizon - h * 0.2 + hShift, 0, horizon + h * 0.22 + hShift);
      sky.addColorStop(0, rgba(0));
      sky.addColorStop(0.5, rgba(0.18));
      sky.addColorStop(1, rgba(0));
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      if (live) {
        if (!pointer && time >= nextIdle) {
          const zz = Z0 + 0.6 + Math.pow(hash(idleSlot, 91), 1.3) * 4.2;
          const half = (span * zz) / F;
          spawn((hash(idleSlot, 92) * 2 - 1) * half * 0.7, zz, 0.11 + hash(idleSlot, 93) * 0.05);
          nextIdle = time + 2.4 + hash(idleSlot, 94) * 1.8;
          idleSlot++;
        }
      }

      counts.fill(0);
      n = 0;
      const colStep = cols > 1 ? 2 / (cols - 1) : 0;
      for (let r = 0; r < rows; r++) {
        const z = zr[r];
        const half = (span * z) / F;
        for (let c = 0; c < cols; c++) {
          const xn = -1 + c * colStep + ((r & 1) ? colStep * 0.5 : 0);
          const x = xn * half;
          let y = waveHeight(x, z, at) * amp;
          if (rLive) {
            for (let k = 0; k < rLive; k++) {
              const age = time - rt[k];
              if (age > 7 || age < 0) continue;
              const dx = x - rx[k];
              const dz = z - rz[k];
              y += rippleHeight(Math.sqrt(dx * dx + dz * dz), age, ra[k]);
            }
          }
          hy[r * cols + c] = y;
        }
      }

      const sweep = reduce ? 0.55 : 1.15 - 1.3 * (at / 6 - Math.floor(at / 6));
      const depthSpan = near - horizon;
      for (let r = 0; r < rows; r++) {
        const z = zr[r];
        const inv = Z0 / z;
        const half = (span * z) / F;
        const tRow = r / (rows - 1);
        const fade = Math.pow(1 - tRow, 0.6) * (1 - smooth((tRow - 0.55) / 0.45) * 0.55);
        const par = curX * w * 0.04 * inv;
        for (let c = 0; c < cols; c++) {
          const xn = -1 + c * colStep + ((r & 1) ? colStep * 0.5 : 0);
          const x = xn * half;
          const y = hy[r * cols + c];
          const px = cx + (x / z) * F + par;
          const py = horizon + hShift + ((CAM - y) / z) * F;
          if (px < -4 || px > w + 4 || py < -4 || py > h + 4) continue;
          const ahead = r < rows - 1 ? hy[(r + 1) * cols + c] : y;
          const behind = r > 0 ? hy[(r - 1) * cols + c] : y;
          const slope = (ahead - y) / Math.max(0.05, zr[Math.min(rows - 1, r + 1)] - z + 0.0001);
          const rim = Math.min(1, Math.max(0, slope * 1.8));
          const base = waveHeight(x, z, at) * amp;
          const ripple = Math.abs(y - base);
          const crest = Math.min(1, Math.max(0, 0.5 + (y / (0.3 * Math.max(0.3, amp))) * 0.5));
          const ny = (py - horizon) / depthSpan;
          const d = ny - sweep;
          const scan = Math.exp(-d * d * 260) * 0.6 + Math.exp(-d * d * 18) * 0.1;
          const ridge = y >= ahead && y >= behind && crest > 0.52 ? smooth((crest - 0.52) / 0.3) : 0;
          const glow = crest * crest;
          let b = (0.58 + 0.5 * glow + 0.3 * rim + 0.55 * ridge + Math.min(0.8, ripple * 8)) * fade;
          b = b * (1 + scan * 1.2) + scan * 0.25 * fade;
          if (b > 0.999) b = 0.999;
          let t = 0.06 + tRow * 0.5 + glow * 0.75 + ridge * 0.6 + Math.min(0.3, ripple * 3) - rim * 0.12;
          if (t > 0.999) t = 0.999;
          put(px, py, 0.75 + 0.5 * Math.pow(inv, 0.6) + glow * 0.3 + ridge * 0.35, b, t);
        }
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
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;
      ptx = Math.max(-1, Math.min(1, (lx / rect.width) * 2 - 1));
      pty = Math.max(-1, Math.min(1, (ly / rect.height) * 2 - 1));
      if (!live) return;
      const moved = Math.hypot(lx - pxl, ly - pyl);
      if (time - lastSpawn > 0.3 && moved > 26) {
        const hit = toWorld(lx, ly);
        if (hit) {
          spawn(hit[0], hit[1], 0.1);
          lastSpawn = time;
          pxl = lx;
          pyl = ly;
        }
      }
    }
    function onDown(e: PointerEvent) {
      if (!root || !live) return;
      const rect = root.getBoundingClientRect();
      const hit = toWorld(e.clientX - rect.left, e.clientY - rect.top);
      if (hit) {
        spawn(hit[0], hit[1], 0.2);
        lastSpawn = time;
      }
    }
    function onLeave() {
      pointer = false;
      nextIdle = Math.max(nextIdle, time + 1.5);
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
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    schedule();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [accent, density, speed, amplitude, ripples]);

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
  const vars = { "--hb-hh6-accent": accent, "--hb-hh6-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh6 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-wave" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh6-canvas" aria-hidden="true" />
      <header className="hb-hh6-bar">
        <a className="hb-hh6-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-hh6-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh6-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span />
        )}
        <div className="hb-hh6-tools">
          <button type="button" className="hb-hh6-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh6-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh6-stage" aria-hidden="true" />
      <div className="hb-hh6-foot">
        <div className="hb-hh6-copy">
          <Heading className="hb-hh6-title">{title}</Heading>
          {subtitle ? <p className="hb-hh6-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-hh6-side">
            {caption ? <p className="hb-hh6-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh6-row">
                {command ? (
                  <div className="hb-hh6-cmd">
                    <span className="hb-hh6-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh6-code">{command}</code>
                    <button type="button" className="hb-hh6-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                      <span className="hb-hh6-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-hh6-cta" href={primaryCta.href}>
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
        <a className="hb-hh6-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}
