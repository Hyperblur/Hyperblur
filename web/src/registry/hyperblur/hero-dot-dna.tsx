"use client";

import * as React from "react";

export interface HeroDotDnaLink {
  label: string;
  href: string;
}

export interface HeroDotDnaProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotDnaLink | null;
  brand?: string;
  nav?: HeroDotDnaLink[];
  navCta?: HeroDotDnaLink | null;
  learnMore?: HeroDotDnaLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  turns?: number;
  pulses?: number;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh2-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh2-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
.hb-hh2 {
  --hb-hh2-accent: #38e8c6;
  --hb-hh2-ink: #0b0b12;
  --hb-hh2-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
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
    radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--hb-hh2-accent) 6%, transparent), transparent 70%),
    #010204;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}
.hb-hh2 *, .hb-hh2 *::before, .hb-hh2 *::after { box-sizing: border-box; }
.hb-hh2::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: repeating-linear-gradient(to bottom, rgba(255, 255, 255, .022) 0, rgba(255, 255, 255, .022) 1px, transparent 1px, transparent 3px);
  -webkit-mask-image: radial-gradient(70% 60% at 50% 40%, #000, transparent);
  mask-image: radial-gradient(70% 60% at 50% 40%, #000, transparent);
}
.hb-hh2-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh2::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 42%;
  pointer-events: none;
  background: linear-gradient(to top, #010204 0%, rgba(1, 2, 4, .8) 30%, rgba(1, 2, 4, 0) 100%);
}
.hb-hh2-bar {
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
.hb-hh2-brand {
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
.hb-hh2-mark { flex: none; color: var(--hb-hh2-accent); }
.hb-hh2-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh2-link {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--hb-hh2-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh2-link:hover { color: #ededed; background: rgba(255, 255, 255, .05); }
.hb-hh2-tools {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.hb-hh2-search {
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
.hb-hh2-search:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-hh2-outline {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #ededed;
  font-family: var(--hb-hh2-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-hh2-outline:hover { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .04); }
.hb-hh2-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 240px;
}
.hb-hh2-foot {
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
.hb-hh2-copy { min-width: 0; }
.hb-hh2-title {
  max-width: 11em;
  margin: 0;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-style: normal;
  color: #f5f5f5;
  font-size: clamp(28px, 5.4cqi, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-hh2-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh2-sub {
  max-width: 34em;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-hh2-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh2-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-hh2-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh2-caption {
  margin: 0;
  color: #6f6f6f;
  font-family: var(--hb-hh2-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-hh2-caption b { color: var(--hb-hh2-accent); font-weight: 500; }
.hb-hh2-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-hh2-cmd {
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
.hb-hh2-prompt { flex: none; color: var(--hb-hh2-accent); font-family: var(--hb-hh2-mono); font-size: 12px; }
.hb-hh2-code {
  min-width: 0;
  overflow: hidden;
  color: #d6d6d6;
  font-family: var(--hb-hh2-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh2-copybtn {
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
.hb-hh2-copybtn:hover { color: #ededed; background: rgba(255, 255, 255, .07); }
.hb-hh2-copybtn[data-done="true"] { color: var(--hb-hh2-accent); }
.hb-hh2-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 10px;
  background: var(--hb-hh2-accent);
  color: var(--hb-hh2-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 28px -10px var(--hb-hh2-accent);
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh2-cta:hover { filter: brightness(1.08); }
.hb-hh2-cta svg { transition: transform .2s ease; }
.hb-hh2-cta:hover svg { transform: translateX(2px); }
.hb-hh2-more {
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
  font-family: var(--hb-hh2-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-hh2-more:hover { color: #ededed; }
.hb-hh2-more svg { animation: hb-hh2-bob 1.8s ease-in-out infinite; }
.hb-hh2 a:focus-visible, .hb-hh2 button:focus-visible {
  outline: 2px solid var(--hb-hh2-accent);
  outline-offset: 2px;
}
.hb-hh2-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-hh2-foot { grid-template-columns: minmax(0, 1fr); padding: 0 24px 72px; }
  .hb-hh2-bar { padding: 16px 24px; }
}
@container (max-width: 640px) {
  .hb-hh2-bar { grid-template-columns: 1fr auto; }
  .hb-hh2-links, .hb-hh2-search { display: none; }
  .hb-hh2-stage { min-height: calc(80cqi + 24px); }
  .hb-hh2-sub { font-size: 14px; }
  .hb-hh2-side, .hb-hh2-row { align-self: stretch; }
  .hb-hh2-row { flex-direction: column; }
  .hb-hh2-cta { width: 100%; }
}
@container (max-width: 360px) {
  .hb-hh2-bar { padding: 14px 18px; }
  .hb-hh2-foot { padding: 0 18px 68px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh2-title, .hb-hh2-sub, .hb-hh2-side, .hb-hh2-more svg { animation: none; }
  .hb-hh2-link, .hb-hh2-search, .hb-hh2-outline, .hb-hh2-copybtn, .hb-hh2-cta, .hb-hh2-cta svg, .hb-hh2-more { transition: none; }
  .hb-hh2-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotDnaLink[] = [
  { label: "Pipelines", href: "#" },
  { label: "Research", href: "#" },
  { label: "Docs", href: "#" },
];
const defaultNavCta: HeroDotDnaLink = { label: "Request access", href: "#" };
const defaultPrimary: HeroDotDnaLink = { label: "Run a sequence", href: "#" };
const defaultMore: HeroDotDnaLink = { label: "Learn more", href: "#" };

const TAU = Math.PI * 2;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const WARM: [number, number, number] = [255, 244, 228];
const ALPHAS = [0.05, 0.12, 0.21, 0.32, 0.45, 0.6, 0.78, 0.96];
const TONES = 4;
const BASE_RINGS = [0.42, 0.68, 0.94, 1.2];

function hash(i: number, salt: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) ^ Math.imul(salt + 11, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

function flicker(t: number) {
  const slot = Math.floor(t * 2.5);
  const h = hash(slot, 97);
  if (h < 0.9) return 1;
  const local = t * 2.5 - slot;
  if (local > 0.24) return 1;
  const depth = 0.035 + (h - 0.9) * 0.6;
  return 1 - depth * (0.55 + 0.45 * Math.sin(local * 150));
}

function hexRgb(value: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function resolveRgb(value: string, ctx: CanvasRenderingContext2D, fallback: [number, number, number]): [number, number, number] {
  const direct = hexRgb(value);
  if (direct) return direct;
  ctx.fillStyle = "#000000";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const hex = hexRgb(out);
  if (hex) return hex;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return fallback;
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#0b0b12";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#0b0b12" : "#ffffff";
}

function clampNum(v: number, lo: number, hi: number, fallback: number) {
  if (!Number.isFinite(v)) return fallback;
  return Math.min(hi, Math.max(lo, v));
}

const HELIX_H = 2.3;
const HELIX_R = 0.34;
const STRAND_GAP = 2.3;

function smooth(t: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t * t * (3 - 2 * t);
}

function Mark() {
  return (
    <svg className="hb-hh2-mark" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3c0 6 10 12 10 18M17 3c0 6-10 12-10 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8.6 7.5h6.8M8.6 16.5h6.8M10.4 12h3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

export function HeroDotDna({
  title = "Two strands. One source of truth.",
  subtitle = "Version every dataset and replay every experiment. A pipeline that pairs each change with its proof, from the first sample to the final figure.",
  caption = "6 turns · 60 base pairs · runs in any React app",
  command = "npx hyperblur add hero-dot-dna",
  brand = "Strandline",
  accent = "#38e8c6",
  primaryCta = defaultPrimary,
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  density = 1,
  speed = 1,
  turns = 6,
  pulses = 3,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotDnaProps) {
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
    const mult = clampNum(density, 0.2, 2, 1);
    const pace = clampNum(speed, 0, 4, 1);
    const nTurns = clampNum(turns, 2, 16, 6);
    const nPulses = Math.round(clampNum(pulses, 0, 8, 3));
    const nRungs = Math.max(8, Math.round(nTurns * 10));

    const nStrand = Math.round(3000 * mult);
    const perRung = Math.max(8, Math.round(24 * Math.sqrt(mult)));
    const perBead = Math.max(4, Math.round(9 * Math.sqrt(mult)));
    const capShape = nStrand * 2 + nRungs * (perRung * 2 + perBead * 2);
    const capDyn = 0;
    const nBaseMax = 640;
    const cap = capShape + nBaseMax + capDyn;
    const mx = new Float32Array(cap);
    const my = new Float32Array(cap);
    const mz = new Float32Array(cap);
    const mb = new Float32Array(cap);
    const ms = new Float32Array(cap);
    const mu = new Float32Array(cap);
    const mk = new Uint8Array(cap);
    const mq = new Uint8Array(cap);
    const mr = new Float32Array(cap);
    let n = 0;

    const rid = new Int16Array(capShape);
    const rungGlow = new Float32Array(nRungs);
    const pulseT = new Float32Array(Math.max(1, nPulses));
    const angleAt = (t: number, strand: number) => t * nTurns * TAU + strand * STRAND_GAP;
    for (let strand = 0; strand < 2; strand++) {
      for (let j = 0; j < nStrand; j++) {
        const t = (j + hash(j, 21 + strand) * 0.7) / nStrand;
        const phi = angleAt(t, strand);
        const psi = j * GOLDEN * 3.1 + strand;
        const tr = 0.034 * (0.55 + 0.45 * hash(j, 23 + strand));
        const rad = HELIX_R + Math.cos(psi) * tr;
        mx[n] = Math.cos(phi) * rad;
        my[n] = -HELIX_H + 2 * HELIX_H * t + Math.sin(psi) * tr * 0.9;
        mz[n] = Math.sin(phi) * rad;
        mu[n] = t;
        mq[n] = strand;
        mk[n] = 0;
        rid[n] = -1;
        mb[n] = 0.62 + 0.38 * hash(j, 25 + strand);
        ms[n] = 0.85 + hash(j, 27 + strand) * 0.4;
        mr[n] = hash(n, 99);
        n++;
      }
    }
    for (let k = 0; k < nRungs; k++) {
      const t = (k + 0.5) / nRungs;
      const pa = angleAt(t, 0);
      const pb = angleAt(t, 1);
      const yy = -HELIX_H + 2 * HELIX_H * t;
      const ax = Math.cos(pa) * HELIX_R;
      const az = Math.sin(pa) * HELIX_R;
      const bx = Math.cos(pb) * HELIX_R;
      const bz = Math.sin(pb) * HELIX_R;
      const pair = hash(k, 33) > 0.5 ? 1 : 0;
      for (let row = 0; row < 2; row++) {
        for (let d = 0; d < perRung; d++) {
          const s = 0.06 + (0.88 * d) / (perRung - 1);
          if (Math.abs(s - 0.5) < 0.04) continue;
          mx[n] = ax + (bx - ax) * s;
          my[n] = yy + (row - 0.5) * 0.026 + (hash(n, 34) - 0.5) * 0.008;
          mz[n] = az + (bz - az) * s;
          mu[n] = t;
          mq[n] = s < 0.5 ? pair : 1 - pair;
          mk[n] = 1;
          rid[n] = k;
          mb[n] = 0.85 + 0.15 * hash(n, 35);
          ms[n] = 0.75 + hash(n, 36) * 0.3;
          mr[n] = hash(n, 99);
          n++;
        }
      }
      for (let e = 0; e < 2; e++) {
        const ex = e ? bx : ax;
        const ez = e ? bz : az;
        for (let q = 0; q < perBead; q++) {
          const yq = 1 - (2 * (q + 0.5)) / perBead;
          const rq = Math.sqrt(Math.max(0, 1 - yq * yq));
          const th = q * GOLDEN + k;
          mx[n] = ex + Math.cos(th) * rq * 0.06;
          my[n] = yy + yq * 0.06;
          mz[n] = ez + Math.sin(th) * rq * 0.06;
          mu[n] = t;
          mq[n] = e;
          mk[n] = 4;
          rid[n] = k;
          mb[n] = 1;
          ms[n] = 0.9 + hash(n, 37) * 0.35;
          mr[n] = hash(n, 99);
          n++;
        }
      }
    }

    const nShape = n;
    for (let k = 0; k < BASE_RINGS.length; k++) {
      const r = BASE_RINGS[k];
      const count = Math.round(118 * r);
      const segs = 10 + k * 6;
      for (let j = 0; j < count && n < capShape + nBaseMax - 80; j++) {
        const th = (j / count) * TAU;
        if (k % 2 === 1 && Math.sin(th * segs) < -0.35) continue;
        mx[n] = r;
        mz[n] = th;
        mk[n] = 2;
        mq[n] = k;
        ms[n] = 0.8 + hash(n, 5) * 0.35;
        mr[n] = hash(n, 99);
        n++;
      }
    }
    for (let j = 0; j < 70; j++) {
      mx[n] = Math.sqrt((j + 0.5) / 70) * 0.22;
      mz[n] = j * GOLDEN;
      mk[n] = 3;
      mq[n] = 0;
      ms[n] = 0.9 + hash(j, 6) * 0.4;
      mr[n] = hash(n, 99);
      n++;
    }
    const nBaseEnd = n;

    const nMotes = Math.round(54 * Math.min(1.5, mult));
    const mo0 = new Float32Array(nMotes);
    const moX = new Float32Array(nMotes);
    const moS = new Float32Array(nMotes);
    for (let k = 0; k < nMotes; k++) {
      mo0[k] = hash(k, 61);
      moX[k] = hash(k, 62) * 2 - 1;
      moS[k] = 0.5 + hash(k, 63);
    }

    const sx = new Float32Array(cap);
    const sy = new Float32Array(cap);
    const ss = new Float32Array(cap);
    const bucket = new Uint8Array(cap);
    const order = new Int32Array(cap);
    const NA = ALPHAS.length;
    const buckets = NA * TONES;
    const counts = new Int32Array(buckets);
    const starts = new Int32Array(buckets);

    const acc = resolveRgb(accent, ctx, [56, 232, 198]);
    const fills: string[] = [];
    for (let b = 0; b < NA; b++) {
      for (let t = 0; t < TONES; t++) {
        const m = t / (TONES - 1);
        const r = Math.round(WARM[0] + (acc[0] - WARM[0]) * m);
        const g = Math.round(WARM[1] + (acc[1] - WARM[1]) * m);
        const bl = Math.round(WARM[2] + (acc[2] - WARM[2]) * m);
        fills.push(`rgba(${r}, ${g}, ${bl}, ${ALPHAS[b].toFixed(3)})`);
      }
    }
    const rgba = (a: number) => `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, ${a.toFixed(3)})`;
    const warmA = (a: number) => `rgba(${WARM[0]}, ${WARM[1]}, ${WARM[2]}, ${a.toFixed(3)})`;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let small = false;
    let S = 1;
    let cx = 0;
    let cy = 0;
    let bcx = 0;
    let bcy = 0;
    let baseS = 1;
    let coneTop = 0;
    let coneHalf = 1;
    let scanCY = 0;
    let scanH = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = 0;
    let pointer = false;
    let ptx = 0;
    let pty = 0;
    let curX = 0;
    let curY = 0;
    let band = 0;

    function layout() {
      if (!root || !canvas || !stage || !ctx) return;
      const rect = root.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      small = w < 640;
      const st = stage.getBoundingClientRect();
      const stageMid = st.top - rect.top + st.height / 2;
      const stageH = st.height;
      const pitch0 = 0.05;
      const roll0 = small ? -0.5 : -0.26;
      if (small) {
        S = Math.min(stageH / 5.3, w * 0.2);
        cx = w / 2;
        cy = stageMid - S * 0.3;
      } else {
        S = Math.min(h * 0.138, w * 0.2);
        cx = w / 2;
        cy = h * 0.42;
      }
      const reach = HELIX_H * Math.cos(pitch0);
      bcx = cx + reach * Math.sin(roll0) * S;
      bcy = cy + reach * Math.cos(roll0) * S + S * 0.32;
      baseS = S * 0.95;
      coneTop = cy - S * 0.2;
      coneHalf = S * 0.95;
      scanCY = cy;
      scanH = S * (HELIX_H + 0.3);
    }

    function scanAt(y: number) {
      if (reduce) return 0;
      const v = (scanCY - y) / scanH;
      const d = v - band;
      let s = Math.exp(-(d * d) / 0.006);
      if (d < 0) s += 0.2 * Math.exp(d * 5);
      return s;
    }

    function put(i: number, x: number, y: number, b: number, t: number, s: number) {
      if (b < 0.02) {
        bucket[i] = 255;
        return;
      }
      const bb = b > 0.999 ? 0.999 : b;
      let ti = Math.floor(t);
      if (ti < 0) ti = 0;
      if (ti >= TONES) ti = TONES - 1;
      sx[i] = x;
      sy[i] = y;
      ss[i] = s < 0.6 ? 0.6 : s > 1.4 ? 1.4 : s;
      bucket[i] = Math.floor(bb * NA) * TONES + ti;
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      band = -1.3 + 2.6 * (((time * pace) / 6) % 1);
      const fl = reduce ? 1 : flicker(time);
      ctx.globalAlpha = fl;

      const glow = ctx.createRadialGradient(cx, cy, S * 0.2, cx, cy, S * 2.6);
      glow.addColorStop(0, rgba(0.1));
      glow.addColorStop(1, rgba(0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const bp = 0.3 + curY * 0.06;
      const sbp = Math.sin(bp);
      const eR = 0.24 * baseS;
      const cone = ctx.createLinearGradient(0, bcy, 0, coneTop);
      cone.addColorStop(0, rgba(0.16));
      cone.addColorStop(0.5, rgba(0.05));
      cone.addColorStop(1, rgba(0));
      ctx.fillStyle = cone;
      ctx.beginPath();
      ctx.moveTo(bcx - eR, bcy);
      ctx.lineTo(cx - coneHalf, coneTop);
      ctx.lineTo(cx + coneHalf, coneTop);
      ctx.lineTo(bcx + eR, bcy);
      ctx.closePath();
      ctx.fill();
      ctx.save();
      ctx.translate(bcx, bcy);
      ctx.scale(1, Math.max(0.1, sbp));
      const pad = ctx.createRadialGradient(0, 0, 0, 0, 0, baseS * 1.35);
      pad.addColorStop(0, rgba(0.2));
      pad.addColorStop(0.4, rgba(0.06));
      pad.addColorStop(1, rgba(0));
      ctx.fillStyle = pad;
      ctx.fillRect(-baseS * 1.4, -baseS * 1.4, baseS * 2.8, baseS * 2.8);
      ctx.restore();

      let count = nBaseEnd;
      const spin = time * 0.32 * pace + curX * 0.7;
      const pitch = 0.05 + curY * 0.14;
      const roll = (small ? -0.5 : -0.26) + curX * 0.05;
      const cS = Math.cos(spin);
      const sS = Math.sin(spin);
      const cP = Math.cos(pitch);
      const sP = Math.sin(pitch);
      const cR = Math.cos(roll);
      const sR = Math.sin(roll);
      const ox = curX * S * 0.08;
      const oy = curY * S * 0.05;
      for (let p = 0; p < nPulses; p++) {
        const v = time * 0.1 * pace * (1 + 0.18 * (p % 3)) + p / nPulses + 0.13;
        pulseT[p] = v - Math.floor(v);
      }
      for (let k = 0; k < nRungs; k++) {
        const tk = (k + 0.5) / nRungs;
        let g = 0;
        for (let p = 0; p < nPulses; p++) {
          const d = pulseT[p] - tk;
          let e = Math.exp(-(d * d) / 0.0006);
          if (d > 0 && d < 0.14) e += 0.55 * Math.exp(-d * 22);
          if (e > g) g = e;
        }
        rungGlow[k] = reduce ? 0 : g;
      }
      for (let i = 0; i < nShape; i++) {
        if (small && mr[i] > 0.65) {
          bucket[i] = 255;
          continue;
        }
        const x0 = mx[i];
        const y = my[i];
        const z0 = mz[i];
        const x = x0 * cS + z0 * sS;
        const z = -x0 * sS + z0 * cS;
        const y2 = y * cP - z * sP;
        const z2 = y * sP + z * cP;
        const x3 = x * cR - y2 * sR;
        const y3 = x * sR + y2 * cR;
        const persp = 1 + z2 * 0.07;
        const px = cx + ox + x3 * S * persp;
        const py = cy + oy - y3 * S * persp;
        const t = mu[i];
        const fade = smooth(t / 0.09) * smooth((1 - t) / 0.09);
        if (fade <= 0) {
          bucket[i] = 255;
          continue;
        }
        const front = Math.max(0, Math.min(1, z2 / (HELIX_R * 2.2) + 0.5));
        const sc = scanAt(py);
        const kind = mk[i];
        if (kind === 0) {
          const len = Math.sqrt(x * x + z * z) || 1;
          const nz = (z / len) * cP;
          const rim = Math.exp(-(nz * nz) / 0.03);
          let pg = 0;
          if (!reduce) {
            for (let p = 0; p < nPulses; p++) {
              if ((p & 1) !== mq[i] && nPulses > 1) continue;
              const d = pulseT[p] - t;
              let e = Math.exp(-(d * d) / 0.00022);
              if (d > 0 && d < 0.08) e += 0.4 * Math.exp(-d * 45);
              if (e > pg) pg = e;
            }
          }
          const b = (mb[i] * 0.62 * (0.45 + 0.55 * front) + rim * 0.22 + pg * 0.95 + sc * 0.42) * fade;
          const tone = mq[i] ? 2.4 - front * 1.2 : 1.6 - front * 1.4;
          put(i, px, py, b, tone + rim - pg * 2.5 - sc * 1.2, ms[i] * (0.6 + 0.5 * front + 0.4 * pg + 0.25 * sc));
        } else {
          const g = rungGlow[rid[i]];
          const base = kind === 4 ? 0.85 : 0.72;
          const b = (mb[i] * base * (0.42 + 0.58 * front) + g * (kind === 4 ? 0.8 : 0.7) + sc * 0.36) * fade;
          const tone = (mq[i] ? 3 : 1) - front * 0.8;
          put(i, px, py, b, tone - g * 2.4 - sc * 1.2, ms[i] * (0.78 + 0.4 * front + 0.35 * g + 0.2 * sc));
        }
      }
      count += capDyn;

      const byaw = curX * 0.4;
      const turn = time * 0.12 * pace;
      const pulse = reduce ? 1 : 0.6 + 0.4 * Math.sin(time * 2.4);
      for (let i = nShape; i < nBaseEnd; i++) {
        if (small && mr[i] > 0.7) {
          bucket[i] = 255;
          continue;
        }
        const r = mx[i];
        const kind = mk[i];
        const th = mz[i] + byaw + (kind === 3 ? 0 : (mq[i] % 2 ? -turn : turn));
        const x = Math.cos(th) * r;
        const z = Math.sin(th) * r;
        const front = r > 0 ? (z / r) * 0.5 + 0.5 : 1;
        if (kind === 3) {
          put(i, bcx + x * baseS, bcy + z * baseS * sbp, 0.5 + 0.45 * pulse, 1, ms[i] * 1.1);
        } else {
          const b = (0.2 + 0.55 * front) * (1 - mq[i] * 0.13);
          put(i, bcx + x * baseS, bcy + z * baseS * sbp, b, mq[i] === 0 ? 2 : 3, ms[i] * (0.7 + 0.4 * front));
        }
      }

      counts.fill(0);
      for (let i = 0; i < count; i++) {
        const k = bucket[i];
        if (k !== 255) counts[k]++;
      }
      let acc0 = 0;
      for (let k = 0; k < buckets; k++) {
        starts[k] = acc0;
        acc0 += counts[k];
      }
      for (let i = 0; i < count; i++) {
        const k = bucket[i];
        if (k !== 255) order[starts[k]++] = i;
      }
      let pos = 0;
      for (let k = 0; k < buckets; k++) {
        const c = counts[k];
        if (!c) continue;
        ctx.fillStyle = fills[k];
        ctx.beginPath();
        for (let q = pos; q < pos + c; q++) {
          const i = order[q];
          const s = ss[i];
          ctx.rect(sx[i] - s / 2, sy[i] - s / 2, s, s);
        }
        ctx.fill();
        pos += c;
      }

      ctx.fillStyle = warmA(1);
      const span = bcy - coneTop;
      for (let k = 0; k < nMotes; k++) {
        const u = (mo0[k] + time * 0.05 * moS[k] * pace) % 1;
        const half = eR + (coneHalf - eR) * u;
        const px = bcx + (cx - bcx) * u + moX[k] * half * 0.85;
        const py = bcy - span * u;
        ctx.globalAlpha = fl * Math.sin(u * Math.PI) * (0.18 + 0.3 * moS[k] * 0.5);
        const s = 0.6 + 0.5 * moS[k] * 0.5;
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = fl;

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
        tx = Math.sin(time * 0.21) * 0.42;
        ty = Math.sin(time * 0.13 + 1.2) * 0.24;
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
  }, [accent, density, speed, turns, pulses]);

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
  const vars = { "--hb-hh2-accent": accent, "--hb-hh2-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh2 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-dna" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh2-canvas" aria-hidden="true" />
      <header className="hb-hh2-bar">
        <a className="hb-hh2-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-hh2-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh2-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span />
        )}
        <div className="hb-hh2-tools">
          <button type="button" className="hb-hh2-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh2-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh2-stage" aria-hidden="true" />
      <div className="hb-hh2-foot">
        <div className="hb-hh2-copy">
          <Heading className="hb-hh2-title">{title}</Heading>
          {subtitle ? <p className="hb-hh2-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-hh2-side">
            {caption ? <p className="hb-hh2-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh2-row">
                {command ? (
                  <div className="hb-hh2-cmd">
                    <span className="hb-hh2-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh2-code">{command}</code>
                    <button type="button" className="hb-hh2-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                      <span className="hb-hh2-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-hh2-cta" href={primaryCta.href}>
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
        <a className="hb-hh2-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}

