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
  showBar?: boolean;
}

type HeroLink = HeroDotGalaxyLink;

const css = `
@keyframes hb-hh4-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-hh4 {
  --hb-hh4-accent: #ff5fd2;
  --hb-hh4-ink: #0a0f24;
  --hb-hh4-fg: #e8ecff;
  --hb-hh4-mute: rgba(190, 202, 245, .66);
  --hb-hh4-line: rgba(150, 170, 255, .28);
  --hb-hh4-panel: rgba(6, 10, 30, .62);
  --hb-hh4-align: center;
  --hb-hh4-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 720px;
  overflow: hidden;
  container-type: inline-size;
  background: radial-gradient(75% 70% at 50% 52%, #0c1840 0%, #070e2a 52%, #040818 100%);
  color: var(--hb-hh4-fg);
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-hh4 *, .hb-hh4 *::before, .hb-hh4 *::after { box-sizing: border-box; }
.hb-hh4-canvas { position: absolute; inset: 0; z-index: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.hb-hh4-bar {
  position: relative; z-index: 3; display: flex; align-items: baseline; justify-content: space-between; gap: 24px;
  width: 100%; margin: 0 auto; padding: 26px 40px;
  font-family: var(--hb-hh4-mono); font-size: 12px; letter-spacing: .06em;
}
.hb-hh4-brand { color: #fff; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; text-decoration: none; }
.hb-hh4-menu { display: flex; align-items: baseline; gap: 30px; }
.hb-hh4-links { display: flex; align-items: baseline; gap: 30px; margin: 0; padding: 0; list-style: none; }
.hb-hh4-link, .hb-hh4-text {
  padding: 0; border: 0; background: none; color: rgba(210, 220, 255, .74); font: inherit; letter-spacing: inherit; text-decoration: none; cursor: pointer; transition: color .2s ease;
}
.hb-hh4-link:hover, .hb-hh4-text:hover { color: #fff; }
.hb-hh4-accentlink { color: var(--hb-hh4-accent); }
.hb-hh4-accentlink:hover { color: #fff; }
.hb-hh4-main {
  position: relative; z-index: 2; flex: 1 1 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px;
  width: 100%; max-width: 760px; margin: 0 auto; padding: 8px 28px 72px; text-align: center;
}
.hb-hh4-title {
  max-width: 12em; margin: 0; color: #fff; font-size: clamp(34px, 5.6cqi, 80px); font-weight: 600; line-height: 1; letter-spacing: -.045em; text-wrap: balance;
  text-shadow: 0 2px 40px rgba(4, 8, 24, 1), 0 0 10px rgba(4, 8, 24, .8);
  animation: hb-hh4-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh4-sub {
  max-width: 32em; margin: 0; color: rgba(214, 222, 255, .86); font-size: 16px; line-height: 1.55; text-wrap: pretty;
  text-shadow: 0 1px 24px rgba(4, 8, 24, 1), 0 0 8px rgba(4, 8, 24, .9);
  animation: hb-hh4-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh4-caption, .hb-hh4-more, .hb-hh4-bar { text-shadow: 0 0 10px #040818, 0 0 4px #040818; }
.hb-hh4-side { animation: hb-hh4-up .8s .16s cubic-bezier(.2, .7, .2, 1) both; }
.hb-hh4-more { color: var(--hb-hh4-accent); font-family: var(--hb-hh4-mono); font-size: 12px; letter-spacing: .08em; text-decoration: none; }
.hb-hh4-more:hover { color: #fff; }
.hb-hh4-side { display: flex; flex-direction: column; gap: 14px; min-width: 0; align-items: var(--hb-hh4-align, flex-start); }
.hb-hh4-row { display: flex; flex-wrap: wrap; align-items: stretch; gap: 10px; max-width: 100%; justify-content: var(--hb-hh4-align, flex-start); }
.hb-hh4-cta {
  display: inline-flex; flex: none; align-items: center; justify-content: center; gap: 6px;
  height: 44px; padding: 0 16px 0 20px; border-radius: 8px;
  background: var(--hb-hh4-accent); color: var(--hb-hh4-ink);
  font-size: 14px; font-weight: 600; letter-spacing: -.01em; text-decoration: none; white-space: nowrap;
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh4-cta:hover { filter: brightness(1.08); }
.hb-hh4-cta svg { transition: transform .2s ease; }
.hb-hh4-cta:hover svg { transform: translateX(2px); }
.hb-hh4-cmd {
  display: flex; align-items: center; gap: 8px; min-width: 0; height: 44px; padding: 0 6px 0 14px;
  border: 1px solid var(--hb-hh4-line); border-radius: 8px; background: var(--hb-hh4-panel);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}
.hb-hh4-prompt { flex: none; color: var(--hb-hh4-accent); font-family: var(--hb-hh4-mono); font-size: 12px; }
.hb-hh4-code { min-width: 0; overflow: hidden; color: var(--hb-hh4-fg); font-family: var(--hb-hh4-mono); font-size: 12px; white-space: nowrap; text-overflow: ellipsis; }
.hb-hh4-copybtn {
  display: inline-grid; flex: none; place-items: center; width: 30px; height: 30px; padding: 0;
  border: 0; border-radius: 6px; background: transparent; color: var(--hb-hh4-mute); cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh4-copybtn:hover { color: var(--hb-hh4-fg); background: var(--hb-hh4-line); }
.hb-hh4-copybtn[data-done="true"] { color: var(--hb-hh4-accent); }
.hb-hh4-caption { margin: 0; color: var(--hb-hh4-mute); font-family: var(--hb-hh4-mono); font-size: 11.5px; letter-spacing: .04em; }
.hb-hh4-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hb-hh4 a:focus-visible, .hb-hh4 button:focus-visible { outline: 2px solid var(--hb-hh4-accent); outline-offset: 2px; }

@container (max-width: 760px) {
  .hb-hh4-bar { padding: 20px 24px; }
}
@container (max-width: 640px) {
  .hb-hh4-links { display: none; }
  .hb-hh4-menu { gap: 18px; }
  .hb-hh4-main { padding: 8px 22px 48px; gap: 18px; }
  .hb-hh4-sub { font-size: 14.5px; }
  .hb-hh4-side, .hb-hh4-row { align-self: stretch; }
  .hb-hh4-row { flex-direction: column; }
  .hb-hh4-cta { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh4-title, .hb-hh4-sub, .hb-hh4-caption, .hb-hh4-more, .hb-hh4-bar { text-shadow: 0 0 10px #040818, 0 0 4px #040818; }
.hb-hh4-side { animation: none; }
  .hb-hh4-link, .hb-hh4-text, .hb-hh4-cta, .hb-hh4-cta svg, .hb-hh4-copybtn { transition: none; }
}
`;

const defaultNav: HeroDotGalaxyLink[] = [
  { label: "Atlas", href: "#" },
  { label: "Missions", href: "#" },
  { label: "Archive", href: "#" },
];
const defaultNavCta: HeroDotGalaxyLink = { label: "Join the survey", href: "#" };
const defaultPrimary: HeroDotGalaxyLink = { label: "Explore the map", href: "#" };
const defaultMore: HeroDotGalaxyLink = { label: "How we chart it", href: "#" };

const TAU = Math.PI * 2;

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

function inkFor(accent: string, dark: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return dark;
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? dark : "#ffffff";
}

function clampNum(v: number, lo: number, hi: number, fallback: number) {
  if (!Number.isFinite(v)) return fallback;
  return Math.min(hi, Math.max(lo, v));
}

function smooth(t: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t * t * (3 - 2 * t);
}

function makeSprite(rgb: [number, number, number], size: number, core: number) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d");
  if (!g) return c;
  const r = size / 2;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  const mix = (v: number) => Math.round(v + (255 - v) * core);
  grad.addColorStop(0, `rgba(${mix(rgb[0])}, ${mix(rgb[1])}, ${mix(rgb[2])}, 1)`);
  grad.addColorStop(0.2, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.9)`);
  grad.addColorStop(0.5, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.28)`);
  grad.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

function useCopy(command: string) {
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  const copy = React.useCallback(() => {
    navigator.clipboard?.writeText(command).catch(() => undefined);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1600);
  }, [command]);
  return { copied, copy };
}

function Actions({
  caption,
  command,
  primaryCta,
  copied,
  onCopy,
}: {
  caption: string;
  command: string;
  primaryCta: HeroLink | null;
  copied: boolean;
  onCopy: () => void;
}) {
  if (!caption && !command && !primaryCta) return null;
  return (
    <div className="hb-hh4-side">
      {command || primaryCta ? (
        <div className="hb-hh4-row">
          {primaryCta ? (
            <a className="hb-hh4-cta" href={primaryCta.href}>
              {primaryCta.label}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </a>
          ) : null}
          {command ? (
            <div className="hb-hh4-cmd">
              <span className="hb-hh4-prompt" aria-hidden="true">$</span>
              <code className="hb-hh4-code">{command}</code>
              <button type="button" className="hb-hh4-copybtn" data-done={copied} onClick={onCopy} aria-label={copied ? "Copied" : "Copy command"}>
                {copied ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
                    <path d="M15.5 8.5V6.7a2.2 2.2 0 0 0-2.2-2.2H6.7a2.2 2.2 0 0 0-2.2 2.2v6.6a2.2 2.2 0 0 0 2.2 2.2h1.8" />
                  </svg>
                )}
                <span className="hb-hh4-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      {caption ? <p className="hb-hh4-caption">{caption}</p> : null}
    </div>
  );
}


const PALETTE: [number, number, number][] = [
  [255, 184, 77],
  [96, 214, 255],
  [255, 95, 210],
  [214, 224, 255],
  [120, 140, 255],
];
const LEVELS = [0.4, 0.62, 0.82, 1];
const VOID = 0.4;

function gauss(i: number, salt: number) {
  const u = Math.max(1e-6, hash(i, salt));
  const v = hash(i, salt + 1);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
}

export function HeroDotGalaxy({
  title = "A whole universe of effects, one command away.",
  subtitle = "Every piece is plain React you copy into your repo. No runtime to install, no account, nothing orbiting your bundle.",
  caption = "3 spiral arms · 20k stars · MIT licensed",
  command = "npx shadcn@latest add https://hyperblur.dev/r/hero-dot-galaxy.json",
  primaryCta = defaultPrimary,
  brand = "Your brand",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#ff5fd2",
  density = 1,
  speed = 1,
  arms = 3,
  tightness = 0.35,
  headingAs = "h1",
  onSearch,
  showBar = false,
  className = "",
  style,
  ...rest
}: HeroDotGalaxyProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { copied, copy } = useCopy(command);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mult = clampNum(density, 0.2, 2, 1);
    const pace = clampNum(speed, 0, 4, 1);
    const nArms = Math.round(clampNum(arms, 1, 8, 3));
    const tight = clampNum(tightness, 0.12, 1.2, 0.35);
    const wind = 0.6 + 2.2 * tight;
    const acc = resolveRgb(accent, ctx, [255, 95, 210]);
    const colors = PALETTE.map((c, i) => (i === 2 ? acc : c));

    const nBase = Math.round(24000 * mult);
    const nClust = Math.round(120 * Math.min(1.5, mult));
    const perClust = 14;
    const nBulge = Math.round(1100 * mult);
    const cap = nBase + nClust * perClust + nBulge;
    const tr = new Float32Array(cap);
    const tt = new Float32Array(cap);
    const tc = new Uint8Array(cap);
    const tb = new Uint8Array(cap);
    const tsz = new Float32Array(cap);
    let n = 0;
    const armAngle = (arm: number, r: number) => (arm / nArms) * TAU + TAU * wind * r;
    const pushStar = (r: number, th: number, c: number, b: number, s: number) => {
      tr[n] = r;
      tt[n] = th;
      tc[n] = c;
      tb[n] = Math.min(3, Math.max(0, Math.floor(b * 4)));
      tsz[n] = s;
      n++;
    };
    const voidDim = (r: number) => 0.12 + 0.88 * smooth((r - VOID * 0.55) / (VOID * 0.9));
    for (let i = 0; i < nBase; i++) {
      const disk = hash(i, 1) < 0.2;
      const u = hash(i, 2);
      const r = 0.1 + 0.9 * Math.pow(u, 0.72);
      const arm = Math.floor(hash(i, 3) * nArms) % nArms;
      const spread = 0.16 + 0.32 * r;
      const th = disk ? hash(i, 4) * TAU : armAngle(arm, r) + gauss(i, 5) * spread * (1.1 - 0.5 * r) * 0.85;
      const rr = r + (disk ? 0 : gauss(i, 7) * 0.012);
      const hot = hash(i, 8);
      let c: number;
      if (r < 0.36) c = hot < 0.7 ? 0 : 3;
      else if (r < 0.7) c = hot < 0.45 ? 1 : hot < 0.7 ? 3 : hot < 0.88 ? 4 : 2;
      else c = hot < 0.4 ? 2 : hot < 0.65 ? 4 : hot < 0.85 ? 1 : 3;
      const dim = voidDim(r) * (disk ? 0.55 : 1);
      if (hash(i, 9) > dim + 0.12) continue;
      const b = (0.25 + 0.75 * Math.pow(hash(i, 10), 1.6)) * (0.35 + 0.65 * dim);
      pushStar(rr, th, c, b, 1.5 + hash(i, 11) * 1.3 + (hash(i, 12) > 0.96 ? 1.6 : 0));
    }
    const clR = new Float32Array(nClust);
    const clT = new Float32Array(nClust);
    const clC = new Uint8Array(nClust);
    const clS = new Float32Array(nClust);
    for (let k = 0; k < nClust; k++) {
      const r = VOID * 0.85 + (0.98 - VOID * 0.85) * Math.pow(hash(k, 31), 0.8);
      const arm = Math.floor(hash(k, 32) * nArms) % nArms;
      const th = armAngle(arm, r) + gauss(k, 33) * 0.05;
      const pick = hash(k, 34);
      const c = pick < 0.4 ? 2 : pick < 0.75 ? 1 : 0;
      clR[k] = r;
      clT[k] = th;
      clC[k] = c;
      clS[k] = 0.55 + hash(k, 35) * 0.9;
      for (let q = 0; q < perClust; q++) {
        const rr = r + gauss(n, 36) * 0.011;
        const tq = th + gauss(n, 38) * 0.014 / Math.max(0.3, r);
        pushStar(rr, tq, c, 0.55 + 0.45 * hash(n, 40), 1.3 + hash(n, 41) * 1.6);
      }
    }
    for (let i = 0; i < nBulge && n < cap; i++) {
      const r = Math.abs(gauss(i, 51)) * 0.1;
      pushStar(r, hash(i, 52) * TAU, hash(i, 53) < 0.8 ? 0 : 3, 0.18 + hash(i, 54) * 0.3, 1 + hash(i, 55));
    }
    const nHaze = 260;
    const hzR = new Float32Array(nHaze);
    const hzT = new Float32Array(nHaze);
    const hzC = new Uint8Array(nHaze);
    const hzS = new Float32Array(nHaze);
    for (let k = 0; k < nHaze; k++) {
      const r = VOID * 0.95 + (1 - VOID * 0.95) * Math.pow(hash(k, 71), 0.85);
      const arm = Math.floor(hash(k, 72) * nArms) % nArms;
      hzR[k] = r;
      hzT[k] = armAngle(arm, r) + gauss(k, 73) * 0.12;
      hzC[k] = r < 0.55 ? (hash(k, 74) < 0.5 ? 1 : 0) : hash(k, 74) < 0.55 ? 2 : 1;
      hzS[k] = 0.6 + hash(k, 75);
    }
    const nStar = n;
    const idx = Array.from({ length: nStar }, (_, i) => i);
    idx.sort((a, b) => tc[a] * 4 + tb[a] - (tc[b] * 4 + tb[b]));
    const sr = new Float32Array(nStar);
    const st = new Float32Array(nStar);
    const ssz = new Float32Array(nStar);
    const sBucket = new Uint8Array(nStar);
    const bStart = new Int32Array(21);
    for (let i = 0; i < nStar; i++) {
      const o = idx[i];
      sr[i] = tr[o];
      st[i] = tt[o];
      ssz[i] = tsz[o];
      sBucket[i] = tc[o] * 4 + tb[o];
    }
    for (let i = 0; i < nStar; i++) bStart[sBucket[i] + 1]++;
    for (let k = 0; k < 20; k++) bStart[k + 1] += bStart[k];
    const fills: string[] = [];
    for (let c = 0; c < 5; c++) {
      for (let l = 0; l < 4; l++) fills.push(`rgba(${colors[c][0]}, ${colors[c][1]}, ${colors[c][2]}, ${LEVELS[l]})`);
    }
    const spr = [makeSprite(colors[0], 96, 0.4), makeSprite(colors[1], 96, 0.4), makeSprite(colors[2], 96, 0.4)];
    const sprBulge = makeSprite(colors[0], 128, 0.1);
    const PX = new Float32Array(nStar);
    const PY = new Float32Array(nStar);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let R = 600;
    let ky = 0.62;
    let roll = -0.35;
    let unit = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = reduce ? 22 : 0;

    function layout() {
      if (!root || !canvas) return;
      const rect = root.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      const small = w < 640;
      cx = w / 2;
      cy = h * 0.52;
      R = small ? Math.max(h * 0.72, w * 1.3) : Math.max(w * 0.64, h * 0.95);
      ky = small ? 0.8 : 0.6;
      roll = small ? -0.5 : -0.3;
      unit = Math.max(0.7, Math.min(1.6, R / 800));
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (let k = 0; k < 150; k++) {
        const tw = reduce ? 0.7 : 0.5 + 0.5 * Math.sin(time * (0.5 + hash(k, 61)) + hash(k, 62) * TAU);
        ctx.fillStyle = `rgba(214, 224, 255, ${(0.1 + 0.4 * tw * hash(k, 63)).toFixed(3)})`;
        ctx.fillRect(hash(k, 64) * w, hash(k, 65) * h, 1.3, 1.3);
      }
      const cR = Math.cos(roll);
      const sR = Math.sin(roll);
      const rot = time * 0.045 * pace;
      for (let i = 0; i < nStar; i++) {
        const r = sr[i];
        const th = st[i] + rot * (0.55 / (0.22 + r));
        const x = Math.cos(th) * r;
        const y = Math.sin(th) * r * ky;
        PX[i] = cx + (x * cR - y * sR) * R;
        PY[i] = cy + (x * sR + y * cR) * R;
      }
      ctx.globalCompositeOperation = "lighter";
      for (let k = 0; k < nHaze; k++) {
        const r = hzR[k];
        const th = hzT[k] + rot * (0.55 / (0.22 + r));
        const x = Math.cos(th) * r;
        const y = Math.sin(th) * r * ky;
        const px = cx + (x * cR - y * sR) * R;
        const py = cy + (x * sR + y * cR) * R;
        const s = (150 + 170 * hzS[k]) * unit;
        if (px < -s || px > w + s || py < -s || py > h + s) continue;
        ctx.globalAlpha = 0.05 * (0.5 + 0.5 * hzS[k]);
        ctx.drawImage(spr[hzC[k]], px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = 0.07;
      const bs = R * 0.5;
      ctx.drawImage(sprBulge, cx - bs / 2, cy - bs * ky * 0.5, bs, bs * ky);
      for (let k = 0; k < nClust; k++) {
        const r = clR[k];
        const th = clT[k] + rot * (0.55 / (0.22 + r));
        const x = Math.cos(th) * r;
        const y = Math.sin(th) * r * ky;
        const px = cx + (x * cR - y * sR) * R;
        const py = cy + (x * sR + y * cR) * R;
        if (px < -80 || px > w + 80 || py < -80 || py > h + 80) continue;
        const pulse = reduce ? 1 : 0.8 + 0.2 * Math.sin(time * 1.1 + k);
        ctx.globalAlpha = 0.5 * pulse;
        const s = (22 + 34 * clS[k]) * unit;
        ctx.drawImage(spr[clC[k]], px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      for (let b = 0; b < 20; b++) {
        const a = bStart[b];
        const z = bStart[b + 1];
        if (a === z) continue;
        ctx.fillStyle = fills[b];
        ctx.beginPath();
        for (let i = a; i < z; i++) {
          const x = PX[i];
          const y = PY[i];
          if (x < -4 || x > w + 4 || y < -4 || y > h + 4) continue;
          const s = ssz[i] * unit;
          ctx.rect(x - s / 2, y - s / 2, s, s);
        }
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    function frame(now: number) {
      raf = 0;
      const step = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      time += step;
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
    document.addEventListener("visibilitychange", onVisibility);
    schedule();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [accent, density, speed, arms, tightness]);

  const Heading = headingAs;
  const vars = { "--hb-hh4-accent": accent, "--hb-hh4-ink": inkFor(accent, "#0a0f24"), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh4 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-galaxy" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh4-canvas" aria-hidden="true" />
      {showBar ? (
      <header className="hb-hh4-bar">
        <a className="hb-hh4-brand" href="#">
          {brand}
        </a>
        <div className="hb-hh4-menu">
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
          ) : null}
          <button type="button" className="hb-hh4-text" onClick={onSearch}>
            Search
          </button>
          {navCta ? (
            <a className="hb-hh4-link hb-hh4-accentlink" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      ) : null}
      <div className="hb-hh4-main">
        <Heading className="hb-hh4-title">{title}</Heading>
        {subtitle ? <p className="hb-hh4-sub">{subtitle}</p> : null}
        <Actions caption={caption} command={command} primaryCta={primaryCta} copied={copied} onCopy={copy} />
        {learnMore ? (
          <a className="hb-hh4-more" href={learnMore.href}>
            {learnMore.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
