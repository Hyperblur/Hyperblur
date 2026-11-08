"use client";

import * as React from "react";

export interface HeroDotGalaxyLink {
  label: string;
  href: string;
}

export interface HeroDotGalaxyProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotGalaxyLink | null;
  brand?: string;
  nav?: HeroDotGalaxyLink[];
  navCta?: HeroDotGalaxyLink | null;
  learnMore?: HeroDotGalaxyLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  arms?: number;
  tightness?: number;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh4-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh4-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
.hb-hh4 {
  --hb-hh4-accent: #a99bff;
  --hb-hh4-ink: #0d0a1f;
  --hb-hh4-mono: var(--font-mono, ui-monospace), "Geist Mono", SFMono-Regular, Menlo, Consolas, monospace;
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
    radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--hb-hh4-accent) 6%, transparent), transparent 70%),
    #020202;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hh4 *, .hb-hh4 *::before, .hb-hh4 *::after { box-sizing: border-box; }
.hb-hh4-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh4::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 52%;
  pointer-events: none;
  background: linear-gradient(to top, #020202 0%, rgba(2, 2, 2, .86) 38%, rgba(2, 2, 2, 0) 100%);
}
.hb-hh4-bar {
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
.hb-hh4-brand {
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
.hb-hh4-mark { flex: none; color: var(--hb-hh4-accent); }
.hb-hh4-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh4-link {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--hb-hh4-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh4-link:hover { color: #ededed; background: rgba(255, 255, 255, .05); }
.hb-hh4-tools {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.hb-hh4-search {
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
.hb-hh4-search:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-hh4-outline {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #ededed;
  font-family: var(--hb-hh4-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-hh4-outline:hover { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .04); }
.hb-hh4-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 240px;
}
.hb-hh4-foot {
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
.hb-hh4-copy { min-width: 0; }
.hb-hh4-title {
  max-width: 11em;
  margin: 0;
  color: #f5f5f5;
  font-size: clamp(28px, 5.4cqi, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-hh4-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh4-sub {
  max-width: 34em;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-hh4-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh4-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-hh4-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh4-caption {
  margin: 0;
  color: #6f6f6f;
  font-family: var(--hb-hh4-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-hh4-caption b { color: var(--hb-hh4-accent); font-weight: 500; }
.hb-hh4-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-hh4-cmd {
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
.hb-hh4-prompt { flex: none; color: var(--hb-hh4-accent); font-family: var(--hb-hh4-mono); font-size: 12px; }
.hb-hh4-code {
  min-width: 0;
  overflow: hidden;
  color: #d6d6d6;
  font-family: var(--hb-hh4-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh4-copybtn {
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
.hb-hh4-copybtn:hover { color: #ededed; background: rgba(255, 255, 255, .07); }
.hb-hh4-copybtn[data-done="true"] { color: var(--hb-hh4-accent); }
.hb-hh4-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 10px;
  background: var(--hb-hh4-accent);
  color: var(--hb-hh4-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 28px -10px var(--hb-hh4-accent);
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh4-cta:hover { filter: brightness(1.08); }
.hb-hh4-cta svg { transition: transform .2s ease; }
.hb-hh4-cta:hover svg { transform: translateX(2px); }
.hb-hh4-more {
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
  font-family: var(--hb-hh4-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-hh4-more:hover { color: #ededed; }
.hb-hh4-more svg { animation: hb-hh4-bob 1.8s ease-in-out infinite; }
.hb-hh4 a:focus-visible, .hb-hh4 button:focus-visible {
  outline: 2px solid var(--hb-hh4-accent);
  outline-offset: 2px;
}
.hb-hh4-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-hh4-foot { grid-template-columns: minmax(0, 1fr); padding: 0 24px 72px; }
  .hb-hh4-bar { padding: 16px 24px; }
}
@container (max-width: 640px) {
  .hb-hh4-bar { grid-template-columns: 1fr auto; }
  .hb-hh4-links, .hb-hh4-search { display: none; }
  .hb-hh4-stage { min-height: calc(80cqi + 24px); }
  .hb-hh4-sub { font-size: 14px; }
  .hb-hh4-side, .hb-hh4-row { align-self: stretch; }
  .hb-hh4-row { flex-direction: column; }
  .hb-hh4-cta { width: 100%; }
}
@container (max-width: 360px) {
  .hb-hh4-bar { padding: 14px 18px; }
  .hb-hh4-foot { padding: 0 18px 68px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh4-title, .hb-hh4-sub, .hb-hh4-side, .hb-hh4-more svg { animation: none; }
  .hb-hh4-link, .hb-hh4-search, .hb-hh4-outline, .hb-hh4-copybtn, .hb-hh4-cta, .hb-hh4-cta svg, .hb-hh4-more { transition: none; }
  .hb-hh4-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotGalaxyLink[] = [
  { label: "Docs", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Changelog", href: "#" },
];
const defaultNavCta: HeroDotGalaxyLink = { label: "Sign in", href: "#" };
const defaultPrimary: HeroDotGalaxyLink = { label: "Start building", href: "#" };
const defaultMore: HeroDotGalaxyLink = { label: "Explore", href: "#" };

const TAU = Math.PI * 2;
const WARM: [number, number, number] = [255, 245, 230];
const ALPHAS = [0.05, 0.1, 0.17, 0.26, 0.37, 0.5, 0.65, 0.82, 1];
const TONES = 4;
const R0 = 0.1;
const RINGS = [70, 96, 122, 148, 174];

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
  ctx.fillStyle = "#a99bff";
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
  if (!rgb) return "#0d0a1f";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#0d0a1f" : "#ffffff";
}

function gauss(i: number, salt: number) {
  const u = Math.max(1e-6, hash(i, salt));
  const v = hash(i, salt + 1);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
}

function smooth(x: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return x * x * (3 - 2 * x);
}

function frac(x: number) {
  return x - Math.floor(x);
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

export interface GalaxyStars {
  kind: Uint8Array;
  r: Float32Array;
  a: Float32Array;
  y: Float32Array;
  b: Float32Array;
  t: Float32Array;
  s: Float32Array;
  g: Float32Array;
  q: Float32Array;
}

export function buildGalaxy(count: number, arms: number): GalaxyStars {
  const kind = new Uint8Array(count);
  const r = new Float32Array(count);
  const a = new Float32Array(count);
  const y = new Float32Array(count);
  const b = new Float32Array(count);
  const t = new Float32Array(count);
  const s = new Float32Array(count);
  const g = new Float32Array(count);
  const q = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const pick = hash(i, 1);
    if (pick < 0.19) {
      const x = gauss(i, 20) * 0.11;
      const z = gauss(i, 22) * 0.11;
      kind[i] = 0;
      r[i] = Math.sqrt(x * x + z * z);
      a[i] = Math.atan2(z, x);
      y[i] = gauss(i, 24) * 0.065;
      const core = Math.exp(-(r[i] * r[i] + y[i] * y[i]) / 0.006);
      b[i] = 0.42 + 0.58 * core;
      t[i] = Math.min(0.45, r[i] * 1.6);
      s[i] = 0.85 + 0.45 * core + hash(i, 26) * 0.15;
    } else if (pick < 0.76) {
      const arm = Math.floor(hash(i, 2) * arms) % arms;
      const knot = hash(i, 10) < 0.08;
      kind[i] = 1;
      a[i] = (arm / arms) * TAU;
      if (knot) {
        r[i] = frac((Math.floor(hash(i, 11) * 14) + 0.5) / 14 + gauss(i, 12) * 0.006 + arm * 0.023);
        g[i] = gauss(i, 4) * 0.22;
        q[i] = gauss(i, 6) * 0.006;
        b[i] = 1;
        t[i] = 0.35;
        s[i] = 1.05 + hash(i, 14) * 0.3;
      } else {
        r[i] = hash(i, 3);
        g[i] = gauss(i, 4);
        q[i] = gauss(i, 6) * 0.018;
        b[i] = 0.62 + hash(i, 15) * 0.3;
        t[i] = 0.1 + hash(i, 16) * 0.15;
        s[i] = 0.7 + hash(i, 17) * 0.4;
      }
      y[i] = gauss(i, 8) * 0.018;
    } else if (pick < 0.91) {
      kind[i] = 2;
      const rr = 0.08 + 0.95 * Math.sqrt(hash(i, 30));
      r[i] = rr;
      a[i] = hash(i, 31) * TAU;
      y[i] = gauss(i, 32) * 0.028 * (1 - rr * 0.5);
      b[i] = 0.16 + hash(i, 34) * 0.16;
      t[i] = 0.3 + rr * 0.6;
      s[i] = 0.6 + hash(i, 35) * 0.3;
    } else {
      kind[i] = 3;
      const rr = 0.3 + 0.95 * Math.pow(hash(i, 40), 0.8);
      const cy = hash(i, 41) * 2 - 1;
      r[i] = rr * Math.sqrt(1 - cy * cy);
      a[i] = hash(i, 42) * TAU;
      y[i] = rr * cy * 0.7;
      b[i] = 0.08 + hash(i, 43) * 0.14;
      t[i] = 0.6 + hash(i, 44) * 0.4;
      s[i] = 0.6 + hash(i, 45) * 0.25;
    }
  }
  return { kind, r, a, y, b, t, s, g, q };
}

function Mark() {
  return (
    <svg className="hb-hh4-mark" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 12c0-2.2 2.6-3.4 4.4-2 2.6 2 1.4 6.6-2.4 7.6-4.6 1.2-8.4-2.6-7.4-7.2C7.6 5.8 12.6 3.4 17 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 12c0 2.2-2.6 3.4-4.4 2-2.6-2-1.4-6.6 2.4-7.6 4.6-1.2 8.4 2.6 7.4 7.2-1 4.6-6 7-10.4 5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeDasharray="1.2 2.4" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function HeroDotGalaxy({
  title = "A whole universe of effects, one command away.",
  subtitle = "Every piece is plain React you copy into your repo. No runtime to install, no account, nothing orbiting your bundle.",
  caption = "3 spiral arms · 15k stars · MIT licensed",
  command = "npx hyperblur add hero-dot-galaxy",
  primaryCta = defaultPrimary,
  brand = "Corvid",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#a99bff",
  density = 1,
  speed = 1,
  arms = 3,
  tightness = 0.35,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotGalaxyProps) {
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
    const armCount = Math.max(1, Math.min(8, Math.round(Number.isFinite(arms) ? arms : 3)));
    const tight = Math.min(1.2, Math.max(0.12, Number.isFinite(tightness) ? tightness : 0.35));

    const nStar = Math.round(15000 * mult);
    const nSky = Math.round(180 * Math.min(1.4, mult));
    const stars = buildGalaxy(nStar, armCount);
    const kx = new Float32Array(nSky);
    const ky = new Float32Array(nSky);
    const kp = new Float32Array(nSky);
    const kb = new Float32Array(nSky);
    for (let k = 0; k < nSky; k++) {
      kx[k] = hash(k, 51);
      ky[k] = hash(k, 52);
      kp[k] = hash(k, 53) * TAU;
      kb[k] = 0.06 + hash(k, 54) * 0.22;
    }
    let ringTotal = 0;
    for (let k = 0; k < RINGS.length; k++) ringTotal += RINGS[k];

    const cap = nStar + nSky + ringTotal + 8;
    const sx = new Float32Array(cap);
    const sy = new Float32Array(cap);
    const ss = new Float32Array(cap);
    const bucket = new Uint8Array(cap);
    const order = new Int32Array(cap);
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
    const rgba = (a: number) => `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, ${a.toFixed(3)})`;
    const warm = (a: number) => `rgba(${WARM[0]}, ${WARM[1]}, ${WARM[2]}, ${a.toFixed(3)})`;

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let S = 0;
    let drawN = nStar;
    let dpr = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = reduce ? 14 : 0;
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
      if (w < 640) {
        const st = stage.getBoundingClientRect();
        S = w * 0.44;
        cy = st.top - rect.top + st.height * 0.42;
        drawN = Math.round(nStar * 0.62);
      } else {
        S = Math.min(w * 0.36, h * 0.46);
        cy = h * 0.38;
        drawN = nStar;
      }
    }

    function projector(bx: number, by: number, at: number) {
      if (!ctx) return;
      const top = cy - S * 0.3;
      const cone = ctx.createLinearGradient(0, by, 0, top);
      cone.addColorStop(0, rgba(0.11));
      cone.addColorStop(0.55, rgba(0.035));
      cone.addColorStop(1, rgba(0));
      ctx.fillStyle = cone;
      ctx.beginPath();
      ctx.moveTo(bx - S * 0.2, by);
      ctx.lineTo(bx - S * 1.02, top);
      ctx.lineTo(bx + S * 1.02, top);
      ctx.lineTo(bx + S * 0.2, by);
      ctx.closePath();
      ctx.fill();
      ctx.save();
      ctx.translate(bx, by);
      ctx.scale(1, 0.2);
      const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 0.95);
      pool.addColorStop(0, rgba(0.16));
      pool.addColorStop(1, rgba(0));
      ctx.fillStyle = pool;
      ctx.fillRect(-S, -S, S * 2, S * 2);
      ctx.restore();
      for (let k = 0; k < RINGS.length; k++) {
        const rx = S * (0.2 + 0.17 * k);
        const ry = rx * 0.17;
        const cnt = RINGS[k];
        const rot = at * 0.12 * (k % 2 ? 1 : -1) + k * 0.7;
        for (let j = 0; j < cnt; j++) {
          if (k > 0 && j % 9 === 8) continue;
          const ang = rot + (j / cnt) * TAU;
          const sn = Math.sin(ang);
          const front = (sn + 1) * 0.5;
          const b = (0.62 - k * 0.09) * (0.45 + 0.55 * front);
          put(bx + Math.cos(ang) * rx, by + sn * ry, 0.75 + 0.45 * front, b, k === 0 ? 0.55 : 0.95);
        }
      }
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const at = time * pace;

      const halo = ctx.createRadialGradient(cx, cy, S * 0.05, cx, cy, S * 1.35);
      halo.addColorStop(0, rgba(0.12));
      halo.addColorStop(1, rgba(0));
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      counts.fill(0);
      n = 0;

      for (let k = 0; k < nSky; k++) {
        const tw = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(time * (0.6 + kb[k] * 4) + kp[k]);
        put(kx[k] * w + curX * 6 * kb[k], ky[k] * h + curY * 4 * kb[k], 0.6 + kb[k], kb[k] * tw, 0);
      }

      const bx = cx + curX * S * 0.04;
      const by = cy + S * 0.86;
      projector(bx, by, at);

      const tiltX = 0.62 + curY * 0.24;
      const yaw = curX * 0.42;
      const roll = -0.14 + curX * 0.05;
      const cX = Math.cos(tiltX);
      const sX = Math.sin(tiltX);
      const cY = Math.cos(yaw);
      const sY = Math.sin(yaw);
      const cZ = Math.cos(roll);
      const sZ = Math.sin(roll);
      const ox = curX * S * 0.05;
      const oy = curY * S * 0.04;
      const sweep = reduce ? 0.12 : 1.3 - 2.6 * frac(at / 6);
      const { kind, r: pr, a: pa, y: py, b: pb, t: pt, s: ps, g: pg, q: pq } = stars;

      for (let i = 0; i < drawN; i++) {
        const kd = kind[i];
        let r = pr[i];
        let a = pa[i];
        let b = pb[i];
        let t = pt[i];
        if (kd === 1) {
          const s = frac(pr[i] - at * 0.018);
          const rad = R0 + (1 - R0) * s;
          a = pa[i] + Math.log(rad / R0) / tight + (pg[i] * (0.035 + 0.075 * s)) / rad - at * 0.05;
          r = rad + pq[i] * (0.5 + s);
          b *= (0.5 + 0.5 * (1 - s)) * smooth(s / 0.1) * smooth((1 - s) / 0.2);
          t = Math.min(1, t + s * 0.95);
        } else if (kd === 0) {
          a -= at * 0.34;
        } else if (kd === 2) {
          a -= at * (0.05 + 0.03 / (r + 0.12));
        } else {
          a -= at * 0.02;
        }
        const X = r * Math.cos(a);
        const Z = r * Math.sin(a);
        const Y = py[i];
        const y2 = Y * cX - Z * sX;
        const z2 = Y * sX + Z * cX;
        const x3 = X * cY + z2 * sY;
        const z3 = -X * sY + z2 * cY;
        const x4 = x3 * cZ - y2 * sZ;
        const y4 = x3 * sZ + y2 * cZ;
        const p = 1 + z3 * 0.12;
        const px = cx + ox + x4 * S * p;
        const pyy = cy + oy - y4 * S * p;
        const front = Math.min(1, Math.max(0, (z3 + 1) * 0.5));
        b *= 0.55 + 0.6 * front;
        if (r > 0.82 && kd !== 3) {
          const rim = smooth((r - 0.82) / 0.2);
          b += 0.12 * rim;
          t = Math.min(1, t + 0.4 * rim);
        }
        const d = (pyy - cy) / S - sweep;
        const scan = Math.exp(-d * d * 170) * 0.6 + Math.exp(-d * d * 12) * 0.1;
        b = b * (1 + scan * 1.3) + scan * 0.22 * Math.min(1, b * 5);
        if (b > 0.999) b = 0.999;
        put(px, pyy, ps[i] * (0.72 + 0.5 * front), b, t);
      }

      const core = ctx.createRadialGradient(cx + ox, cy + oy, 0, cx + ox, cy + oy, S * 0.26);
      core.addColorStop(0, warm(0.2));
      core.addColorStop(1, warm(0));
      ctx.fillStyle = core;
      ctx.fillRect(cx + ox - S * 0.3, cy + oy - S * 0.3, S * 0.6, S * 0.6);

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
  }, [accent, density, speed, arms, tightness]);

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
  const vars = { "--hb-hh4-accent": accent, "--hb-hh4-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh4 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-galaxy" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh4-canvas" aria-hidden="true" />
      <header className="hb-hh4-bar">
        <a className="hb-hh4-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-hh4-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh4-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span />
        )}
        <div className="hb-hh4-tools">
          <button type="button" className="hb-hh4-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh4-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh4-stage" aria-hidden="true" />
      <div className="hb-hh4-foot">
        <div className="hb-hh4-copy">
          <Heading className="hb-hh4-title">{title}</Heading>
          {subtitle ? <p className="hb-hh4-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-hh4-side">
            {caption ? <p className="hb-hh4-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh4-row">
                {command ? (
                  <div className="hb-hh4-cmd">
                    <span className="hb-hh4-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh4-code">{command}</code>
                    <button type="button" className="hb-hh4-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                      <span className="hb-hh4-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-hh4-cta" href={primaryCta.href}>
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
        <a className="hb-hh4-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}
