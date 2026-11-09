"use client";

import * as React from "react";

export interface HeroDotGlobeLink {
  label: string;
  href: string;
}

export interface HeroDotGlobeProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotGlobeLink | null;
  brand?: string;
  nav?: HeroDotGlobeLink[];
  navCta?: HeroDotGlobeLink | null;
  learnMore?: HeroDotGlobeLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-zc-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-zc-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
.hb-zc {
  --hb-zc-accent: #ffb84d;
  --hb-zc-ink: #140d02;
  --hb-zc-mono: ui-monospace, "Geist Mono", SFMono-Regular, Menlo, Consolas, monospace;
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
    radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--hb-zc-accent) 6%, transparent), transparent 70%),
    #020202;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-zc *, .hb-zc *::before, .hb-zc *::after { box-sizing: border-box; }
.hb-zc-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-zc::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 52%;
  pointer-events: none;
  background: linear-gradient(to top, #020202 0%, rgba(2, 2, 2, .86) 38%, rgba(2, 2, 2, 0) 100%);
}
.hb-zc-bar {
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
.hb-zc-brand {
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
.hb-zc-mark { flex: none; color: var(--hb-zc-accent); }
.hb-zc-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-zc-link {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--hb-zc-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-zc-link:hover { color: #ededed; background: rgba(255, 255, 255, .05); }
.hb-zc-tools {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.hb-zc-search {
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
.hb-zc-search:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-zc-outline {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #ededed;
  font-family: var(--hb-zc-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-zc-outline:hover { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .04); }
.hb-zc-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 240px;
}
.hb-zc-foot {
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
.hb-zc-copy { min-width: 0; }
.hb-zc-title {
  max-width: 11em;
  margin: 0;
  color: #f5f5f5;
  font-size: clamp(28px, 5.4cqi, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-zc-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-zc-sub {
  max-width: 34em;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-zc-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-zc-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-zc-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-zc-caption {
  margin: 0;
  color: #6f6f6f;
  font-family: var(--hb-zc-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-zc-caption b { color: var(--hb-zc-accent); font-weight: 500; }
.hb-zc-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-zc-cmd {
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
.hb-zc-prompt { flex: none; color: var(--hb-zc-accent); font-family: var(--hb-zc-mono); font-size: 12px; }
.hb-zc-code {
  min-width: 0;
  overflow: hidden;
  color: #d6d6d6;
  font-family: var(--hb-zc-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-zc-copybtn {
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
.hb-zc-copybtn:hover { color: #ededed; background: rgba(255, 255, 255, .07); }
.hb-zc-copybtn[data-done="true"] { color: var(--hb-zc-accent); }
.hb-zc-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 10px;
  background: var(--hb-zc-accent);
  color: var(--hb-zc-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 28px -10px var(--hb-zc-accent);
  transition: filter .2s ease, transform .2s ease;
}
.hb-zc-cta:hover { filter: brightness(1.08); }
.hb-zc-cta svg { transition: transform .2s ease; }
.hb-zc-cta:hover svg { transform: translateX(2px); }
.hb-zc-more {
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
  font-family: var(--hb-zc-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-zc-more:hover { color: #ededed; }
.hb-zc-more svg { animation: hb-zc-bob 1.8s ease-in-out infinite; }
.hb-zc a:focus-visible, .hb-zc button:focus-visible {
  outline: 2px solid var(--hb-zc-accent);
  outline-offset: 2px;
}
.hb-zc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-zc-foot { grid-template-columns: minmax(0, 1fr); padding: 0 24px 72px; }
  .hb-zc-bar { padding: 16px 24px; }
}
@container (max-width: 640px) {
  .hb-zc-bar { grid-template-columns: 1fr auto; }
  .hb-zc-links, .hb-zc-search { display: none; }
  .hb-zc-stage { min-height: calc(80cqi + 24px); }
  .hb-zc-sub { font-size: 14px; }
  .hb-zc-side, .hb-zc-row { align-self: stretch; }
  .hb-zc-row { flex-direction: column; }
  .hb-zc-cta { width: 100%; }
}
@container (max-width: 360px) {
  .hb-zc-bar { padding: 14px 18px; }
  .hb-zc-foot { padding: 0 18px 68px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-zc-title, .hb-zc-sub, .hb-zc-side, .hb-zc-more svg { animation: none; }
  .hb-zc-link, .hb-zc-search, .hb-zc-outline, .hb-zc-copybtn, .hb-zc-cta, .hb-zc-cta svg, .hb-zc-more { transition: none; }
  .hb-zc-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotGlobeLink[] = [
  { label: "Docs", href: "#" },
  { label: "Examples", href: "#" },
  { label: "Kit", href: "#" },
];
const defaultNavCta: HeroDotGlobeLink = { label: "Sign in", href: "#" };
const defaultPrimary: HeroDotGlobeLink = { label: "Get started", href: "#" };
const defaultMore: HeroDotGlobeLink = { label: "Learn more", href: "#" };

const TAU = Math.PI * 2;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const WARM: [number, number, number] = [255, 243, 224];
const ALPHAS = [0.08, 0.2, 0.36, 0.55, 0.76, 0.96];
const TONES = 4;

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
  ctx.fillStyle = "#ffb84d";
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
  if (!rgb) return "#140d02";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#140d02" : "#ffffff";
}

function Mark() {
  return (
    <svg className="hb-zc-mark" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" strokeDasharray="1.4 2.2" strokeLinecap="round" />
      <ellipse cx="12" cy="12" rx="9" ry="3.2" stroke="currentColor" strokeWidth="1.6" transform="rotate(-18 12 12)" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function HeroDotGlobe({
  title = "Build interfaces that move people.",
  subtitle = "Motion-ready React components you install with one command and own as plain source. No runtime, no lock-in.",
  caption = "v3.2 · 240+ components · MIT licensed",
  command = "npx shadcn@latest add https://hyperblur.dev/r/hero-dot-globe.json",
  primaryCta = defaultPrimary,
  brand = "Orbitkit",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#ffb84d",
  density = 1,
  speed = 1,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotGlobeProps) {
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

    const nBase = Math.round(6400 * mult);
    const nBand = Math.round(1500 * mult);
    const nDust = Math.round(240 * Math.min(1.4, mult));
    const total = nBase + nBand;

    const bx = new Float32Array(nBase);
    const by = new Float32Array(nBase);
    const bz = new Float32Array(nBase);
    const bs = new Float32Array(total);
    for (let i = 0; i < nBase; i++) {
      const yy = 1 - (2 * (i + 0.5)) / nBase;
      const r = Math.sqrt(Math.max(0, 1 - yy * yy));
      const th = i * GOLDEN;
      bx[i] = Math.cos(th) * r;
      by[i] = yy;
      bz[i] = Math.sin(th) * r;
      bs[i] = 0.75 + hash(i, 3) * 0.45;
    }
    const lat = new Float32Array(nBand);
    const lon = new Float32Array(nBand);
    for (let j = 0; j < nBand; j++) {
      const g = hash(j, 21) + hash(j, 22) + hash(j, 23) - 1.5;
      lat[j] = g * 0.16;
      lon[j] = hash(j, 24) * TAU;
      bs[nBase + j] = 0.8 + hash(j, 25) * 0.5;
    }
    const da = new Float32Array(nDust);
    const dr = new Float32Array(nDust);
    const dz = new Float32Array(nDust);
    const dp = new Float32Array(nDust);
    const dt = new Float32Array(nDust);
    for (let k = 0; k < nDust; k++) {
      da[k] = hash(k, 41) * TAU;
      const u = hash(k, 42);
      dr[k] = 1.08 + u * u * 1.25;
      dz[k] = 0.25 + hash(k, 43) * 0.75;
      dp[k] = hash(k, 44) * TAU;
      dt[k] = 0.4 + hash(k, 45) * 1.4;
    }

    const sx = new Float32Array(total);
    const sy = new Float32Array(total);
    const ss = new Float32Array(total);
    const bucket = new Uint8Array(total);
    const order = new Int32Array(total);
    const buckets = ALPHAS.length * TONES;
    const counts = new Int32Array(buckets);
    const starts = new Int32Array(buckets);

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
    const glowA = `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0.10)`;
    const glowB = `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0)`;

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
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
        R = w * 0.38;
        cy = st.top - rect.top + st.height / 2;
      } else {
        R = Math.min(w * 0.3, h * 0.42);
        cy = h * 0.44;
      }
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.45);
      glow.addColorStop(0, glowA);
      glow.addColorStop(1, glowB);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const spin = time * 0.09 * pace + curX * 0.45;
      const drift = -time * 0.16 * pace;
      const tiltX = 0.34 + curY * 0.3;
      const tiltZ = 0.4;
      const cY = Math.cos(spin);
      const sY = Math.sin(spin);
      const cX = Math.cos(tiltX);
      const sX = Math.sin(tiltX);
      const cZ = Math.cos(tiltZ);
      const sZ = Math.sin(tiltZ);
      const ox = curX * R * 0.05;
      const oy = curY * R * 0.04;

      counts.fill(0);
      for (let i = 0; i < total; i++) {
        let x: number;
        let y: number;
        let z: number;
        let band = 0;
        if (i < nBase) {
          x = bx[i];
          y = by[i];
          z = bz[i];
        } else {
          const j = i - nBase;
          const lo = lon[j] + drift;
          const cl = Math.cos(lat[j]);
          x = Math.cos(lo) * cl;
          y = Math.sin(lat[j]);
          z = Math.sin(lo) * cl;
          band = 1 - Math.min(1, Math.abs(lat[j]) / 0.16);
        }
        const x1 = x * cY + z * sY;
        const z1 = -x * sY + z * cY;
        const y2 = y * cX - z1 * sX;
        const z2 = y * sX + z1 * cX;
        const x3 = x1 * cZ - y2 * sZ;
        const y3 = x1 * sZ + y2 * cZ;
        const p = 1 + z2 * 0.07;
        sx[i] = cx + ox + x3 * R * p;
        sy[i] = cy + oy - y3 * R * p;
        const front = (z2 + 1) * 0.5;
        const rim = z2 > -0.08 ? Math.exp(-(z2 * z2) / 0.01) : 0;
        let b = 0.04 + 0.62 * front * front + 0.5 * rim + band * (0.18 + 0.32 * front);
        if (b > 0.999) b = 0.999;
        const bi = Math.floor(b * ALPHAS.length);
        const rr = x3 * x3 + y3 * y3;
        let ti = Math.floor(rr * rr * TONES);
        if (ti >= TONES) ti = TONES - 1;
        let s = bs[i] * (0.62 + 0.55 * front + 0.25 * rim);
        if (s > 1.4) s = 1.4;
        if (s < 0.6) s = 0.6;
        ss[i] = s;
        const k = bi * TONES + ti;
        bucket[i] = k;
        counts[k]++;
      }
      let acc0 = 0;
      for (let k = 0; k < buckets; k++) {
        starts[k] = acc0;
        acc0 += counts[k];
      }
      for (let i = 0; i < total; i++) order[starts[bucket[i]]++] = i;

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

      ctx.fillStyle = "rgb(236, 226, 210)";
      const swirl = time * 0.012 * pace;
      for (let k = 0; k < nDust; k++) {
        const a = da[k] + swirl * (1.6 - dr[k] * 0.5);
        const px = cx + Math.cos(a) * dr[k] * R + curX * dz[k] * 18;
        const py = cy + Math.sin(a) * dr[k] * R * 0.92 + curY * dz[k] * 12;
        if (px < -4 || px > w + 4 || py < -4 || py > h + 4) continue;
        const twinkle = reduce ? 1 : 0.55 + 0.45 * Math.sin(time * dt[k] + dp[k]);
        ctx.globalAlpha = (0.08 + 0.32 * dz[k]) * twinkle;
        const s = 0.6 + dz[k] * 0.7;
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
  }, [accent, density, speed]);

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
  const vars = { "--hb-zc-accent": accent, "--hb-zc-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-zc ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-globe" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-zc-canvas" aria-hidden="true" />
      <header className="hb-zc-bar">
        <a className="hb-zc-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-zc-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-zc-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span />
        )}
        <div className="hb-zc-tools">
          <button type="button" className="hb-zc-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-zc-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-zc-stage" aria-hidden="true" />
      <div className="hb-zc-foot">
        <div className="hb-zc-copy">
          <Heading className="hb-zc-title">{title}</Heading>
          {subtitle ? <p className="hb-zc-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-zc-side">
            {caption ? <p className="hb-zc-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-zc-row">
                {command ? (
                  <div className="hb-zc-cmd">
                    <span className="hb-zc-prompt" aria-hidden="true">$</span>
                    <code className="hb-zc-code">{command}</code>
                    <button type="button" className="hb-zc-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                      <span className="hb-zc-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-zc-cta" href={primaryCta.href}>
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
        <a className="hb-zc-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}
