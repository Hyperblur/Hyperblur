"use client";

import * as React from "react";

export interface HeroDotOrbitLink {
  label: string;
  href: string;
}

export interface HeroDotOrbitProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotOrbitLink | null;
  brand?: string;
  nav?: HeroDotOrbitLink[];
  navCta?: HeroDotOrbitLink | null;
  learnMore?: HeroDotOrbitLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  orbits?: number;
  electrons?: number;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh3-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh3-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
.hb-hh3 {
  --hb-hh3-accent: #5aa9ff;
  --hb-hh3-ink: #0b0b12;
  --hb-hh3-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
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
    radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--hb-hh3-accent) 6%, transparent), transparent 70%),
    #010204;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}
.hb-hh3 *, .hb-hh3 *::before, .hb-hh3 *::after { box-sizing: border-box; }
.hb-hh3::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: repeating-linear-gradient(to bottom, rgba(255, 255, 255, .022) 0, rgba(255, 255, 255, .022) 1px, transparent 1px, transparent 3px);
  -webkit-mask-image: radial-gradient(70% 60% at 50% 40%, #000, transparent);
  mask-image: radial-gradient(70% 60% at 50% 40%, #000, transparent);
}
.hb-hh3-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh3::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 42%;
  pointer-events: none;
  background: linear-gradient(to top, #010204 0%, rgba(1, 2, 4, .8) 30%, rgba(1, 2, 4, 0) 100%);
}
.hb-hh3-bar {
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
.hb-hh3-brand {
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
.hb-hh3-mark { flex: none; color: var(--hb-hh3-accent); }
.hb-hh3-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh3-link {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--hb-hh3-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh3-link:hover { color: #ededed; background: rgba(255, 255, 255, .05); }
.hb-hh3-tools {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.hb-hh3-search {
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
.hb-hh3-search:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-hh3-outline {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #ededed;
  font-family: var(--hb-hh3-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-hh3-outline:hover { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .04); }
.hb-hh3-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 240px;
}
.hb-hh3-foot {
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
.hb-hh3-copy { min-width: 0; }
.hb-hh3-title {
  max-width: 11em;
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-style: normal;
  color: #f5f5f5;
  font-size: clamp(28px, 5.4cqi, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-hh3-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh3-sub {
  max-width: 34em;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-hh3-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh3-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-hh3-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh3-caption {
  margin: 0;
  color: #6f6f6f;
  font-family: var(--hb-hh3-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-hh3-caption b { color: var(--hb-hh3-accent); font-weight: 500; }
.hb-hh3-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-hh3-cmd {
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
.hb-hh3-prompt { flex: none; color: var(--hb-hh3-accent); font-family: var(--hb-hh3-mono); font-size: 12px; }
.hb-hh3-code {
  min-width: 0;
  overflow: hidden;
  color: #d6d6d6;
  font-family: var(--hb-hh3-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh3-copybtn {
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
.hb-hh3-copybtn:hover { color: #ededed; background: rgba(255, 255, 255, .07); }
.hb-hh3-copybtn[data-done="true"] { color: var(--hb-hh3-accent); }
.hb-hh3-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 10px;
  background: var(--hb-hh3-accent);
  color: var(--hb-hh3-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 28px -10px var(--hb-hh3-accent);
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh3-cta:hover { filter: brightness(1.08); }
.hb-hh3-cta svg { transition: transform .2s ease; }
.hb-hh3-cta:hover svg { transform: translateX(2px); }
.hb-hh3-more {
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
  font-family: var(--hb-hh3-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-hh3-more:hover { color: #ededed; }
.hb-hh3-more svg { animation: hb-hh3-bob 1.8s ease-in-out infinite; }
.hb-hh3 a:focus-visible, .hb-hh3 button:focus-visible {
  outline: 2px solid var(--hb-hh3-accent);
  outline-offset: 2px;
}
.hb-hh3-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-hh3-foot { grid-template-columns: minmax(0, 1fr); padding: 0 24px 72px; }
  .hb-hh3-bar { padding: 16px 24px; }
}
@container (max-width: 640px) {
  .hb-hh3-bar { grid-template-columns: 1fr auto; }
  .hb-hh3-links, .hb-hh3-search { display: none; }
  .hb-hh3-stage { min-height: calc(80cqi + 24px); }
  .hb-hh3-sub { font-size: 14px; }
  .hb-hh3-side, .hb-hh3-row { align-self: stretch; }
  .hb-hh3-row { flex-direction: column; }
  .hb-hh3-cta { width: 100%; }
}
@container (max-width: 360px) {
  .hb-hh3-bar { padding: 14px 18px; }
  .hb-hh3-foot { padding: 0 18px 68px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh3-title, .hb-hh3-sub, .hb-hh3-side, .hb-hh3-more svg { animation: none; }
  .hb-hh3-link, .hb-hh3-search, .hb-hh3-outline, .hb-hh3-copybtn, .hb-hh3-cta, .hb-hh3-cta svg, .hb-hh3-more { transition: none; }
  .hb-hh3-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotOrbitLink[] = [
  { label: "Runtime", href: "#" },
  { label: "Integrations", href: "#" },
  { label: "Status", href: "#" },
];
const defaultNavCta: HeroDotOrbitLink = { label: "Dashboard", href: "#" };
const defaultPrimary: HeroDotOrbitLink = { label: "Deploy the core", href: "#" };
const defaultMore: HeroDotOrbitLink = { label: "Learn more", href: "#" };

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

const NUCLEUS_R = 0.4;
const TRAIL = 22;

function rotatePoint(x: number, y: number, z: number, beta: number, alpha: number): [number, number, number] {
  const cb = Math.cos(beta);
  const sb = Math.sin(beta);
  const y1 = y * cb - z * sb;
  const z1 = y * sb + z * cb;
  const ca = Math.cos(alpha);
  const sa = Math.sin(alpha);
  return [x * ca - y1 * sa, x * sa + y1 * ca, z1];
}

function Mark() {
  return (
    <svg className="hb-hh3-mark" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="10" ry="3.6" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="10" ry="3.6" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.6" stroke="currentColor" strokeWidth="1.4" transform="rotate(-60 12 12)" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function HeroDotOrbit({
  title = "A stable core with everything in orbit.",
  subtitle = "One small, typed nucleus and every service moving around it at its own pace. Observable from the first request, and every line is yours to change.",
  caption = "1 nucleus · 5 orbits · one canvas at 60 fps",
  command = "npx hyperblur add hero-dot-orbit",
  brand = "Valence",
  accent = "#5aa9ff",
  primaryCta = defaultPrimary,
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  density = 1,
  speed = 1,
  orbits = 5,
  electrons = 1,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotOrbitProps) {
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
    const nOrb = Math.round(clampNum(orbits, 1, 8, 5));
    const nEl = Math.round(clampNum(electrons, 1, 3, 1));

    const perBall = Math.max(30, Math.round(130 * Math.sqrt(mult)));
    const perOrbit = Math.round(1100 * mult);
    const capShape = 13 * perBall + nOrb * perOrbit;
    const capDyn = nOrb * nEl * TRAIL;
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

    const balls: [number, number, number][] = [[0, 0, 0]];
    const phiG = (1 + Math.sqrt(5)) / 2;
    const ico: [number, number, number][] = [
      [-1, phiG, 0], [1, phiG, 0], [-1, -phiG, 0], [1, -phiG, 0],
      [0, -1, phiG], [0, 1, phiG], [0, -1, -phiG], [0, 1, -phiG],
      [phiG, 0, -1], [phiG, 0, 1], [-phiG, 0, -1], [-phiG, 0, 1],
    ];
    for (const v of ico) {
      const l = Math.hypot(v[0], v[1], v[2]);
      balls.push([(v[0] / l) * 0.25, (v[1] / l) * 0.25, (v[2] / l) * 0.25]);
    }
    for (let b = 0; b < balls.length; b++) {
      const [bx0, by0, bz0] = balls[b];
      const br = b === 0 ? 0.13 : 0.145;
      for (let j = 0; j < perBall; j++) {
        const yy = 1 - (2 * (j + 0.5)) / perBall;
        const rr = Math.sqrt(Math.max(0, 1 - yy * yy));
        const th = j * GOLDEN + b * 1.3;
        mx[n] = bx0 + Math.cos(th) * rr * br;
        my[n] = by0 + yy * br;
        mz[n] = bz0 + Math.sin(th) * rr * br;
        mk[n] = 0;
        mq[n] = b % 2;
        mb[n] = 0.85 + 0.15 * hash(n, 4);
        ms[n] = 0.85 + hash(n, 3) * 0.4;
        mr[n] = hash(n, 99);
        n++;
      }
    }
    const oUx = new Float32Array(nOrb);
    const oUy = new Float32Array(nOrb);
    const oUz = new Float32Array(nOrb);
    const oVx = new Float32Array(nOrb);
    const oVy = new Float32Array(nOrb);
    const oVz = new Float32Array(nOrb);
    const oR = new Float32Array(nOrb);
    const oW = new Float32Array(nOrb);
    const oP = new Float32Array(nOrb);
    for (let k = 0; k < nOrb; k++) {
      const alpha = (k * Math.PI) / nOrb + 0.2;
      const beta = 1.1 + 0.08 * Math.sin(k * 1.7 + 0.4);
      const R = 1.86 + 0.09 * ((k % 3) - 1);
      const u = rotatePoint(1, 0, 0, beta, alpha);
      const v = rotatePoint(0, 1, 0, beta, alpha);
      oUx[k] = u[0];
      oUy[k] = u[1];
      oUz[k] = u[2];
      oVx[k] = v[0];
      oVy[k] = v[1];
      oVz[k] = v[2];
      oR[k] = R;
      oW[k] = (0.7 + 0.55 * hash(k, 71)) * (k % 2 ? -1 : 1);
      oP[k] = hash(k, 72) * TAU;
      for (let j = 0; j < perOrbit; j++) {
        const th = ((j + hash(j, 80 + k) * 0.5) / perOrbit) * TAU;
        const rj = R + (hash(j, 90 + k) - 0.5) * 0.024;
        const c = Math.cos(th) * rj;
        const s = Math.sin(th) * rj;
        mx[n] = c * u[0] + s * v[0];
        my[n] = c * u[1] + s * v[1];
        mz[n] = c * u[2] + s * v[2];
        mu[n] = th;
        mk[n] = 1;
        mq[n] = k;
        mb[n] = 0.75 + 0.25 * hash(n, 5);
        ms[n] = 0.7 + hash(n, 6) * 0.3;
        mr[n] = hash(n, 99);
        n++;
      }
    }
    const nHeads = nOrb * nEl;
    const elA = new Float32Array(nHeads);
    const headX = new Float32Array(nHeads);
    const headY = new Float32Array(nHeads);
    const headF = new Float32Array(nHeads);
    const headH = new Float32Array(nHeads);

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

    const acc = resolveRgb(accent, ctx, [90, 169, 255]);
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
      if (small) {
        S = Math.min(w * 0.2, stageH / 4.7);
        cx = w / 2;
        cy = stageMid - S * 0.2;
      } else {
        S = Math.min(w * 0.19, h * 0.145);
        cx = w / 2;
        cy = h * 0.39;
      }
      bcx = cx;
      bcy = cy + S * 2.2;
      baseS = S * 1.05;
      coneTop = cy + S * 0.2;
      coneHalf = S * 1.15;
      scanCY = cy;
      scanH = S * 2.05;
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
      const spin = (reduce ? 0 : Math.sin(time * 0.17 * pace) * 0.22) + curX * 0.5;
      const pitch = 0.1 + curY * 0.24;
      const roll = time * 0.05 * pace;
      const cR = Math.cos(roll);
      const sR = Math.sin(roll);
      const cS = Math.cos(spin);
      const sS = Math.sin(spin);
      const cP = Math.cos(pitch);
      const sP = Math.sin(pitch);
      const ox = curX * S * 0.07;
      const oy = curY * S * 0.05;
      const breathe = reduce ? 1 : 1 + 0.035 * Math.sin(time * 1.6);
      const nr2 = NUCLEUS_R * NUCLEUS_R;
      for (let k = 0; k < nOrb; k++) {
        for (let e = 0; e < nEl; e++) elA[k * nEl + e] = oP[k] + (e * TAU) / nEl + time * pace * oW[k] * (1 + e * 0.04);
      }
      for (let i = 0; i < nShape; i++) {
        if (small && mr[i] > 0.62) {
          bucket[i] = 255;
          continue;
        }
        const nuc = mk[i] === 0;
        const f = nuc ? breathe : 1;
        const x0 = mx[i] * f;
        const y = my[i] * f;
        const z0 = mz[i] * f;
        const x1 = x0 * cS + z0 * sS;
        const z = -x0 * sS + z0 * cS;
        const y1 = y * cP - z * sP;
        const z2 = y * sP + z * cP;
        const x = x1 * cR - y1 * sR;
        const y2 = x1 * sR + y1 * cR;
        const persp = 1 + z2 * 0.06;
        const px = cx + ox + x * S * persp;
        const py = cy + oy - y2 * S * persp;
        const sc = scanAt(py);
        if (nuc) {
          const l = Math.sqrt(x * x + y2 * y2 + z2 * z2) || 1;
          const nz = z2 / l;
          const rim = nz > -0.1 ? Math.exp(-(nz * nz) / 0.05) : 0;
          const front = nz * 0.5 + 0.5;
          const b = mb[i] * (0.35 + 0.65 * front) + rim * 0.4 + sc * 0.4;
          put(i, px, py, b, (mq[i] ? 2 : 0) + (1 - front) * 1.2 + rim - sc, ms[i] * (0.75 + 0.5 * front + 0.2 * rim));
        } else {
          const k = mq[i];
          let g = 0;
          for (let e = 0; e < nEl; e++) {
            let d = (mu[i] - elA[k * nEl + e]) * (oW[k] > 0 ? 1 : -1);
            d = d - TAU * Math.floor(d / TAU + 0.5);
            const ahead = d > 0 ? Math.exp(-(d * d) / 0.004) : Math.exp(-(d * d) / 0.12);
            if (ahead > g) g = ahead;
          }
          if (reduce) g *= 0.6;
          const front = Math.max(0, Math.min(1, (z2 / 2) * 0.5 + 0.5));
          let b = mb[i] * 0.5 * (0.4 + 0.6 * front) + g * 0.55 + sc * 0.32;
          if (z2 < 0 && x * x + y2 * y2 < nr2) b *= 0.2;
          put(i, px, py, b, 2.2 + (1 - front) * 0.8 - g * 1.6 - sc * 1.4, ms[i] * (0.62 + 0.4 * front + 0.4 * g + 0.2 * sc));
        }
      }
      for (let k = 0; k < nOrb; k++) {
        const dir = oW[k] > 0 ? 1 : -1;
        const R = oR[k];
        for (let e = 0; e < nEl; e++) {
          const hi = k * nEl + e;
          for (let s = 0; s <= TRAIL; s++) {
            const th = elA[hi] - dir * s * 0.034;
            const c = Math.cos(th) * R;
            const sn = Math.sin(th) * R;
            const x0 = c * oUx[k] + sn * oVx[k];
            const y = c * oUy[k] + sn * oVy[k];
            const z0 = c * oUz[k] + sn * oVz[k];
            const x1 = x0 * cS + z0 * sS;
            const z = -x0 * sS + z0 * cS;
            const y1 = y * cP - z * sP;
            const z2 = y * sP + z * cP;
            const x = x1 * cR - y1 * sR;
            const y2 = x1 * sR + y1 * cR;
            const persp = 1 + z2 * 0.06;
            const px = cx + ox + x * S * persp;
            const py = cy + oy - y2 * S * persp;
            const front = Math.max(0, Math.min(1, (z2 / 2) * 0.5 + 0.5));
            const hidden = z2 < 0 && x * x + y2 * y2 < nr2 ? 0.15 : 1;
            if (s === 0) {
              headX[hi] = px;
              headY[hi] = py;
              headF[hi] = front;
              headH[hi] = hidden;
              continue;
            }
            const fade = 1 - s / (TRAIL + 1);
            put(count, px, py, (0.25 + 0.75 * fade * fade) * (0.45 + 0.55 * front) * hidden, s < 4 ? 0 : 0.5 + (1 - fade) * 2.5, (0.7 + 0.7 * fade) * (0.8 + 0.3 * front));
            count++;
          }
        }
      }

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
      const core = ctx.createRadialGradient(cx + ox, cy + oy, 0, cx + ox, cy + oy, S * 0.7);
      core.addColorStop(0, warmA(0.16));
      core.addColorStop(0.4, rgba(0.08));
      core.addColorStop(1, rgba(0));
      ctx.fillStyle = core;
      ctx.fillRect(cx + ox - S * 0.7, cy + oy - S * 0.7, S * 1.4, S * 1.4);
      const nHeadsDraw = nOrb * nEl;
      for (let hi = 0; hi < nHeadsDraw; hi++) {
        const f = headF[hi];
        const a = (0.45 + 0.55 * f) * headH[hi];
        const rad = S * (0.1 + 0.06 * f);
        const halo = ctx.createRadialGradient(headX[hi], headY[hi], 0, headX[hi], headY[hi], rad);
        halo.addColorStop(0, warmA(0.55 * a));
        halo.addColorStop(0.35, rgba(0.28 * a));
        halo.addColorStop(1, rgba(0));
        ctx.fillStyle = halo;
        ctx.fillRect(headX[hi] - rad, headY[hi] - rad, rad * 2, rad * 2);
        const s = 1.8 + 0.9 * f;
        ctx.fillStyle = warmA(Math.min(1, 0.4 + 0.6 * a));
        ctx.fillRect(headX[hi] - s / 2, headY[hi] - s / 2, s, s);
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
  }, [accent, density, speed, orbits, electrons]);

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
  const vars = { "--hb-hh3-accent": accent, "--hb-hh3-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh3 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-orbit" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh3-canvas" aria-hidden="true" />
      <header className="hb-hh3-bar">
        <a className="hb-hh3-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-hh3-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh3-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span />
        )}
        <div className="hb-hh3-tools">
          <button type="button" className="hb-hh3-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh3-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh3-stage" aria-hidden="true" />
      <div className="hb-hh3-foot">
        <div className="hb-hh3-copy">
          <Heading className="hb-hh3-title">{title}</Heading>
          {subtitle ? <p className="hb-hh3-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-hh3-side">
            {caption ? <p className="hb-hh3-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh3-row">
                {command ? (
                  <div className="hb-hh3-cmd">
                    <span className="hb-hh3-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh3-code">{command}</code>
                    <button type="button" className="hb-hh3-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                      <span className="hb-hh3-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-hh3-cta" href={primaryCta.href}>
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
        <a className="hb-hh3-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}

