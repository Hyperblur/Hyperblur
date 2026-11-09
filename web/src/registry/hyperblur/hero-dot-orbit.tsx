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

type HeroLink = HeroDotOrbitLink;

const css = `
@keyframes hb-hh3-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-hh3 {
  --hb-hh3-accent: #22d3ee;
  --hb-hh3-ink: #04122b;
  --hb-hh3-fg: #eef2ff;
  --hb-hh3-mute: rgba(199, 210, 254, .72);
  --hb-hh3-line: rgba(165, 180, 252, .28);
  --hb-hh3-panel: rgba(11, 16, 38, .6);
  --hb-hh3-align: center;
  --hb-hh3-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 720px;
  overflow: hidden;
  container-type: inline-size;
  background:
    radial-gradient(62% 58% at 50% 38%, rgba(29, 59, 255, .78) 0%, rgba(25, 46, 200, .42) 42%, rgba(11, 16, 38, 0) 78%),
    #0b1026;
  color: var(--hb-hh3-fg);
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-hh3 *, .hb-hh3 *::before, .hb-hh3 *::after { box-sizing: border-box; }
.hb-hh3-canvas { position: absolute; inset: 0; z-index: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.hb-hh3-bar {
  position: relative; z-index: 3; display: flex; align-items: center; gap: 20px;
  width: calc(100% - 32px); max-width: 1040px; margin: 16px auto 0; padding: 9px 10px 9px 18px;
  border: 1px solid rgba(165, 180, 252, .22); border-radius: 8px;
  background: rgba(11, 16, 38, .5); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
  box-shadow: 0 18px 50px -24px rgba(0, 0, 0, .7);
}
.hb-hh3-brand { display: inline-flex; align-items: center; gap: 9px; color: #fff; font-size: 15px; font-weight: 700; letter-spacing: -.01em; text-decoration: none; }
.hb-hh3-mark { flex: none; color: var(--hb-hh3-accent); }
.hb-hh3-links { display: flex; align-items: center; justify-content: center; gap: 4px; flex: 1; margin: 0; padding: 0; list-style: none; }
.hb-hh3-nav { flex: 1; }
.hb-hh3-link { display: inline-flex; padding: 7px 12px; border-radius: 8px; color: rgba(224, 231, 255, .78); font-size: 13.5px; text-decoration: none; transition: color .2s ease, background-color .2s ease; }
.hb-hh3-link:hover { color: #fff; background: rgba(255, 255, 255, .08); }
.hb-hh3-tools { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.hb-hh3-search { display: inline-grid; place-items: center; width: 34px; height: 34px; padding: 0; border: 0; border-radius: 8px; background: transparent; color: rgba(224, 231, 255, .8); cursor: pointer; }
.hb-hh3-search:hover { color: #fff; background: rgba(255, 255, 255, .1); }
.hb-hh3-solid { display: inline-flex; align-items: center; height: 34px; padding: 0 14px; border-radius: 8px; background: #fff; color: #0b1026; font-size: 13px; font-weight: 600; text-decoration: none; white-space: nowrap; transition: filter .2s ease; }
.hb-hh3-solid:hover { filter: brightness(.92); }
.hb-hh3-stage { position: relative; z-index: 1; flex: 1 1 auto; min-height: 340px; }
.hb-hh3-copy {
  position: relative; z-index: 2; margin-top: auto; display: flex; flex-direction: column; align-items: center; gap: 16px;
  width: 100%; max-width: 760px; margin: 0 auto; padding: 0 28px 44px; text-align: center;
}
.hb-hh3-title {
  max-width: 17em; margin: 0; color: #fff; font-size: clamp(28px, 4cqi, 54px); font-weight: 650; line-height: 1.05; letter-spacing: -.04em; text-wrap: balance;
  text-shadow: 0 2px 28px rgba(5, 10, 40, .95), 0 0 6px rgba(5, 10, 40, .6);
  animation: hb-hh3-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh3-sub {
  max-width: 38em; margin: 0; color: rgba(224, 231, 255, .86); font-size: 15.5px; line-height: 1.55; text-wrap: pretty;
  text-shadow: 0 1px 18px rgba(5, 10, 40, .95);
  animation: hb-hh3-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh3-side { animation: hb-hh3-up .8s .16s cubic-bezier(.2, .7, .2, 1) both; }
.hb-hh3-more { color: var(--hb-hh3-accent); font-size: 14px; font-weight: 600; text-decoration: none; }
.hb-hh3-more:hover { text-decoration: underline; text-underline-offset: 5px; }
.hb-hh3-side { display: flex; flex-direction: column; gap: 14px; min-width: 0; align-items: var(--hb-hh3-align, flex-start); }
.hb-hh3-row { display: flex; flex-wrap: wrap; align-items: stretch; gap: 10px; max-width: 100%; justify-content: var(--hb-hh3-align, flex-start); }
.hb-hh3-cta {
  display: inline-flex; flex: none; align-items: center; justify-content: center; gap: 6px;
  height: 44px; padding: 0 16px 0 20px; border-radius: 8px;
  background: var(--hb-hh3-accent); color: var(--hb-hh3-ink);
  font-size: 14px; font-weight: 600; letter-spacing: -.01em; text-decoration: none; white-space: nowrap;
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh3-cta:hover { filter: brightness(1.08); }
.hb-hh3-cta svg { transition: transform .2s ease; }
.hb-hh3-cta:hover svg { transform: translateX(2px); }
.hb-hh3-cmd {
  display: flex; align-items: center; gap: 8px; min-width: 0; height: 44px; padding: 0 6px 0 14px;
  border: 1px solid var(--hb-hh3-line); border-radius: 8px; background: var(--hb-hh3-panel);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}
.hb-hh3-prompt { flex: none; color: var(--hb-hh3-accent); font-family: var(--hb-hh3-mono); font-size: 12px; }
.hb-hh3-code { min-width: 0; overflow: hidden; color: var(--hb-hh3-fg); font-family: var(--hb-hh3-mono); font-size: 12px; white-space: nowrap; text-overflow: ellipsis; }
.hb-hh3-copybtn {
  display: inline-grid; flex: none; place-items: center; width: 30px; height: 30px; padding: 0;
  border: 0; border-radius: 6px; background: transparent; color: var(--hb-hh3-mute); cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh3-copybtn:hover { color: var(--hb-hh3-fg); background: var(--hb-hh3-line); }
.hb-hh3-copybtn[data-done="true"] { color: var(--hb-hh3-accent); }
.hb-hh3-caption { margin: 0; color: var(--hb-hh3-mute); font-family: var(--hb-hh3-mono); font-size: 11.5px; letter-spacing: .04em; }
.hb-hh3-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hb-hh3 a:focus-visible, .hb-hh3 button:focus-visible { outline: 2px solid var(--hb-hh3-accent); outline-offset: 2px; }

@container (max-width: 760px) {
  .hb-hh3-copy { padding: 0 22px 36px; }
}
@container (max-width: 640px) {
  .hb-hh3-links, .hb-hh3-solid { display: none; }
  .hb-hh3-bar { padding: 8px 10px 8px 14px; }
  .hb-hh3-stage { min-height: 96cqi; }
  .hb-hh3-sub { font-size: 14.5px; }
  .hb-hh3-side, .hb-hh3-row { align-self: stretch; }
  .hb-hh3-row { flex-direction: column; }
  .hb-hh3-cta { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh3-title, .hb-hh3-sub, .hb-hh3-side { animation: none; }
  .hb-hh3-link, .hb-hh3-cta, .hb-hh3-cta svg, .hb-hh3-copybtn, .hb-hh3-solid { transition: none; }
}
`;

const defaultNav: HeroDotOrbitLink[] = [
  { label: "Platform", href: "#" },
  { label: "Services", href: "#" },
  { label: "Changelog", href: "#" },
];
const defaultNavCta: HeroDotOrbitLink = { label: "Start free", href: "#" };
const defaultPrimary: HeroDotOrbitLink = { label: "Open the console", href: "#" };
const defaultMore: HeroDotOrbitLink = { label: "See how it works", href: "#" };

const TAU = Math.PI * 2;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

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

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
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
    <div className="hb-hh3-side">
      {command || primaryCta ? (
        <div className="hb-hh3-row">
          {primaryCta ? (
            <a className="hb-hh3-cta" href={primaryCta.href}>
              {primaryCta.label}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </a>
          ) : null}
          {command ? (
            <div className="hb-hh3-cmd">
              <span className="hb-hh3-prompt" aria-hidden="true">$</span>
              <code className="hb-hh3-code">{command}</code>
              <button type="button" className="hb-hh3-copybtn" data-done={copied} onClick={onCopy} aria-label={copied ? "Copied" : "Copy command"}>
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
                <span className="hb-hh3-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      {caption ? <p className="hb-hh3-caption">{caption}</p> : null}
    </div>
  );
}


function Mark() {
  return (
    <svg className="hb-hh3-mark" width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="3.4" fill="currentColor" />
      <ellipse cx="14" cy="14" rx="12" ry="4.6" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="14" cy="14" rx="12" ry="4.6" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 14 14)" />
      <ellipse cx="14" cy="14" rx="12" ry="4.6" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 14 14)" />
    </svg>
  );
}

export function HeroDotOrbit({
  title = "A stable core with everything in orbit.",
  subtitle = "One small, typed nucleus and every service moving around it at its own pace. Observable from the first request, and every line is yours to change.",
  caption = "1 nucleus · 5 orbits · one canvas at 60 fps",
  command = "npx hyperblur add hero-dot-orbit",
  brand = "Valence",
  accent = "#22d3ee",
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
  const { copied, copy } = useCopy(command);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !stage || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mult = clampNum(density, 0.2, 2, 1);
    const pace = clampNum(speed, 0, 4, 1);
    const nOrb = Math.round(clampNum(orbits, 1, 9, 5));
    const nEl = Math.round(clampNum(electrons, 1, 4, 1));
    const perRing = Math.round(640 * mult);
    const nNuc = Math.round(1200 * mult);
    const nStars = 90;
    const TRAIL = 26;

    const oa = new Float32Array(nOrb);
    const ob = new Float32Array(nOrb);
    const oBeta = new Float32Array(nOrb);
    const oTilt = new Float32Array(nOrb);
    const oSpeed = new Float32Array(nOrb);
    for (let k = 0; k < nOrb; k++) {
      oa[k] = 0.82 + 0.18 * hash(k, 3);
      ob[k] = oa[k] * (0.4 + 0.12 * hash(k, 4));
      oBeta[k] = (k / nOrb) * Math.PI + 0.2;
      oTilt[k] = 0.15 + 0.4 * hash(k, 5) + (k % 2) * 0.3;
      oSpeed[k] = (0.55 + 0.35 * hash(k, 6)) * (k % 2 ? -1 : 1);
    }
    const rTh = new Float32Array(nOrb * perRing);
    const rJ = new Float32Array(nOrb * perRing * 2);
    const rS = new Float32Array(nOrb * perRing);
    for (let k = 0; k < nOrb; k++) {
      for (let j = 0; j < perRing; j++) {
        const i = k * perRing + j;
        rTh[i] = ((j + hash(i, 11) * 0.7) / perRing) * TAU;
        rJ[i * 2] = (hash(i, 12) - 0.5) * 0.024;
        rJ[i * 2 + 1] = (hash(i, 13) - 0.5) * 0.03;
        rS[i] = 0.7 + hash(i, 14) * 0.7;
      }
    }
    const nx = new Float32Array(nNuc);
    const ny = new Float32Array(nNuc);
    const nz = new Float32Array(nNuc);
    const nc = new Uint8Array(nNuc);
    const ns = new Float32Array(nNuc);
    for (let i = 0; i < nNuc; i++) {
      const y = 1 - (2 * (i + 0.5)) / nNuc;
      const r = Math.sqrt(1 - y * y);
      const th = i * GOLDEN;
      const d = Math.cbrt(0.15 + 0.85 * hash(i, 21));
      nx[i] = Math.cos(th) * r * d;
      ny[i] = y * d;
      nz[i] = Math.sin(th) * r * d;
      nc[i] = hash(i, 22) < 0.45 ? 0 : hash(i, 22) < 0.8 ? 1 : 2;
      ns[i] = 0.7 + hash(i, 23) * 0.6;
    }

    const acc = resolveRgb(accent, ctx, [34, 211, 238]);
    const sprRing = makeSprite([150, 176, 255], 48, 0.45);
    const sprCyan = makeSprite(acc, 64, 0.55);
    const sprWhite = makeSprite([214, 228, 255], 48, 0.7);
    const sprBlue = makeSprite([79, 123, 255], 48, 0.3);
    const sprEl = makeSprite(acc, 96, 0.75);
    const nucSprites = [sprWhite, sprCyan, sprBlue];

    const total = nOrb * perRing;
    const PX = new Float32Array(total);
    const PY = new Float32Array(total);
    const PZ = new Float32Array(total);
    const PB = new Float32Array(total);
    const NX = new Float32Array(nNuc);
    const NY = new Float32Array(nNuc);
    const NZ = new Float32Array(nNuc);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let R = 200;
    let unit = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = reduce ? 4.5 : 0;

    function layout() {
      if (!root || !canvas || !stage) return;
      const rect = root.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      const st = stage.getBoundingClientRect();
      const small = w < 640;
      cx = w / 2;
      if (small) {
        R = Math.min(w * 0.56, st.height * 0.62);
        cy = st.top - rect.top + st.height / 2;
      } else {
        R = Math.min(w * 0.42, h * 0.56);
        cy = h * 0.4;
      }
      unit = Math.max(0.55, Math.min(1.6, R / 300));
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let k = 0; k < nStars; k++) {
        const tw = reduce ? 0.6 : 0.5 + 0.5 * Math.sin(time * (0.6 + hash(k, 91)) + hash(k, 92) * TAU);
        ctx.globalAlpha = 0.12 + 0.4 * tw * hash(k, 93);
        const s = (2 + hash(k, 94) * 4) * unit;
        ctx.drawImage(sprWhite, hash(k, 95) * w - s / 2, hash(k, 96) * h - s / 2, s, s);
      }
      const spin = time * 0.22 * pace;
      const cS = Math.cos(spin);
      const sS = Math.sin(spin);
      const pitch = 0.3;
      const cP = Math.cos(pitch);
      const sP = Math.sin(pitch);
      const roll = -0.32;
      const cR = Math.cos(roll);
      const sR = Math.sin(roll);

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.62);
      glow.addColorStop(0, `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, .5)`);
      glow.addColorStop(0.35, "rgba(60, 100, 255, .26)");
      glow.addColorStop(1, "rgba(29, 59, 255, 0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = glow;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      const elTh = new Float32Array(nOrb * nEl);
      for (let k = 0; k < nOrb; k++) {
        for (let e = 0; e < nEl; e++) {
          elTh[k * nEl + e] = time * oSpeed[k] * pace * 0.9 + (e / nEl) * TAU + k * 1.3;
        }
      }

      function place(k: number, th: number, jr: number, jy: number, out: number[]) {
        const lx = Math.cos(th) * (oa[k] + jr);
        const ly = Math.sin(th) * (ob[k] + jr);
        const lz = jy;
        const bc = Math.cos(oBeta[k]);
        const bs = Math.sin(oBeta[k]);
        const x1 = lx * bc - ly * bs;
        const y1 = lx * bs + ly * bc;
        const ct = Math.cos(oTilt[k]);
        const st = Math.sin(oTilt[k]);
        const y2 = y1 * ct - lz * st;
        const z2 = y1 * st + lz * ct;
        const x3 = x1 * cS + z2 * sS;
        const z3 = -x1 * sS + z2 * cS;
        const y4 = y2 * cP - z3 * sP;
        const z4 = y2 * sP + z3 * cP;
        const x5 = x3 * cR - y4 * sR;
        const y5 = x3 * sR + y4 * cR;
        const persp = 1 + z4 * 0.12;
        out[0] = cx + x5 * R * persp;
        out[1] = cy - y5 * R * persp;
        out[2] = z4;
      }
      const tmp = [0, 0, 0];
      for (let k = 0; k < nOrb; k++) {
        for (let j = 0; j < perRing; j++) {
          const i = k * perRing + j;
          const th = rTh[i];
          place(k, th, rJ[i * 2], rJ[i * 2 + 1], tmp);
          PX[i] = tmp[0];
          PY[i] = tmp[1];
          PZ[i] = tmp[2];
          let g = 0;
          for (let e = 0; e < nEl; e++) {
            const dir = oSpeed[k] > 0 ? 1 : -1;
            let d = (elTh[k * nEl + e] - th) * dir;
            d = d - Math.floor(d / TAU) * TAU;
            if (d < 1.3) g = Math.max(g, (1 - d / 1.3) * (1 - d / 1.3));
          }
          PB[i] = g;
        }
      }
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < total; i++) {
          if ((PZ[i] >= 0 ? 1 : 0) !== pass) continue;
          const front = 0.5 + 0.5 * PZ[i];
          const b = 0.4 + 0.5 * front + PB[i] * 0.7;
          ctx.globalAlpha = Math.min(1, b);
          const s = (5 + 3 * front + PB[i] * 5) * unit * rS[i];
          ctx.drawImage(PB[i] > 0.3 ? sprCyan : sprRing, PX[i] - s / 2, PY[i] - s / 2, s, s);
        }
        if (pass === 0) {
          const beat = reduce ? 1 : 1 + 0.035 * Math.sin(time * 2.2);
          const nr = R * 0.19 * beat;
          const nspin = time * 0.5 * pace;
          const cN = Math.cos(nspin);
          const sN = Math.sin(nspin);
          for (let i = 0; i < nNuc; i++) {
            const x1 = nx[i] * cN + nz[i] * sN;
            const z1 = -nx[i] * sN + nz[i] * cN;
            const y2 = ny[i] * cP - z1 * sP;
            const z2 = ny[i] * sP + z1 * cP;
            const x3 = x1 * cR - y2 * sR;
            const y3 = x1 * sR + y2 * cR;
            NX[i] = cx + x3 * nr;
            NY[i] = cy - y3 * nr;
            NZ[i] = z2;
          }
          for (let i = 0; i < nNuc; i++) {
            const f = 0.5 + 0.5 * NZ[i];
            ctx.globalAlpha = 0.35 + 0.55 * f;
            const s = (6 + 6 * f) * ns[i] * unit;
            ctx.drawImage(nucSprites[nc[i]], NX[i] - s / 2, NY[i] - s / 2, s, s);
          }
        }
      }
      for (let k = 0; k < nOrb; k++) {
        const dir = oSpeed[k] > 0 ? 1 : -1;
        for (let e = 0; e < nEl; e++) {
          const th0 = elTh[k * nEl + e];
          for (let q = TRAIL; q >= 0; q--) {
            const th = th0 - dir * q * 0.05;
            place(k, th, 0, 0, tmp);
            const f = 1 - q / TRAIL;
            const depth = 0.55 + 0.45 * (0.5 + 0.5 * tmp[2]);
            ctx.globalAlpha = (q === 0 ? 1 : f * f * 0.7) * depth;
            const s = (q === 0 ? 24 : 5 + 14 * f) * unit * (0.8 + 0.3 * depth);
            ctx.drawImage(q === 0 ? sprEl : sprCyan, tmp[0] - s / 2, tmp[1] - s / 2, s, s);
          }
        }
      }
      ctx.globalAlpha = 1;
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
  }, [accent, density, speed, orbits, electrons]);

  const Heading = headingAs;
  const vars = { "--hb-hh3-accent": accent, "--hb-hh3-ink": inkFor(accent, "#04122b"), ...style } as React.CSSProperties;

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
          <nav className="hb-hh3-nav" aria-label="Primary">
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
          <span style={{ flex: 1 }} />
        )}
        <div className="hb-hh3-tools">
          <button type="button" className="hb-hh3-search" aria-label="Search" onClick={onSearch}>
            <SearchIcon />
          </button>
          {navCta ? (
            <a className="hb-hh3-solid" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh3-stage" aria-hidden="true" />
      <div className="hb-hh3-copy">
        <Heading className="hb-hh3-title">{title}</Heading>
        {subtitle ? <p className="hb-hh3-sub">{subtitle}</p> : null}
        <Actions caption={caption} command={command} primaryCta={primaryCta} copied={copied} onCopy={copy} />
        {learnMore ? (
          <a className="hb-hh3-more" href={learnMore.href}>
            {learnMore.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
