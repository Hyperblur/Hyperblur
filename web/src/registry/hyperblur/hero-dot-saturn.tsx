"use client";

import * as React from "react";

export interface HeroDotSaturnLink {
  label: string;
  href: string;
}

export interface HeroDotSaturnProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotSaturnLink | null;
  brand?: string;
  nav?: HeroDotSaturnLink[];
  navCta?: HeroDotSaturnLink | null;
  learnMore?: HeroDotSaturnLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  ringTilt?: number;
  bands?: number;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

type HeroLink = HeroDotSaturnLink;

const css = `
@keyframes hb-hh1-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-hh1 {
  --hb-hh1-accent: #c2542d;
  --hb-hh1-ink: #ffffff;
  --hb-hh1-fg: #1b1712;
  --hb-hh1-mute: rgba(27, 23, 18, .62);
  --hb-hh1-line: rgba(27, 23, 18, .24);
  --hb-hh1-panel: rgba(239, 231, 214, .82);
  --hb-hh1-align: center;
  --hb-hh1-paper: #efe7d6;
  --hb-hh1-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 720px;
  overflow: hidden;
  container-type: inline-size;
  background: radial-gradient(55% 60% at 50% 50%, #f5eedf, var(--hb-hh1-paper) 75%);
  color: var(--hb-hh1-fg);
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-hh1 *, .hb-hh1 *::before, .hb-hh1 *::after { box-sizing: border-box; }
.hb-hh1-canvas { position: absolute; inset: 0; z-index: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.hb-hh1-canvas[data-front="true"] { z-index: 3; }
.hb-hh1-bar {
  position: relative; z-index: 4; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 36px;
  width: 100%; max-width: 1280px; margin: 0 auto; padding: 24px 40px; pointer-events: none;
}
.hb-hh1-bar > * { pointer-events: auto; }
.hb-hh1-brand {
  display: inline-flex; align-items: center; gap: 10px; color: var(--hb-hh1-fg); text-decoration: none;
  font-family: var(--font-serif, "Iowan Old Style", "Palatino Linotype", Georgia, serif); font-size: 22px; font-weight: 700; letter-spacing: -.02em;
}
.hb-hh1-mark { flex: none; color: var(--hb-hh1-accent); }
.hb-hh1-side-l, .hb-hh1-side-r { display: flex; align-items: center; gap: 28px; min-width: 0; }
.hb-hh1-side-l { justify-content: flex-end; }
.hb-hh1-side-r { justify-content: flex-start; }
.hb-hh1-links { display: flex; align-items: center; gap: 28px; margin: 0; padding: 0; list-style: none; }
.hb-hh1-link { color: var(--hb-hh1-mute); font-size: 13px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; text-decoration: none; transition: color .2s ease; }
.hb-hh1-link:hover { color: var(--hb-hh1-fg); }
.hb-hh1-tools { display: flex; align-items: center; gap: 10px; margin-left: auto; }
.hb-hh1-outline {
  display: inline-flex; align-items: center; height: 34px; padding: 0 14px; border: 1px solid var(--hb-hh1-fg); border-radius: 8px;
  color: var(--hb-hh1-fg); font-size: 13px; font-weight: 600; text-decoration: none; white-space: nowrap; transition: background-color .2s ease, color .2s ease;
}
.hb-hh1-outline:hover { background: var(--hb-hh1-fg); color: var(--hb-hh1-paper); }
.hb-hh1-search { display: inline-grid; place-items: center; width: 34px; height: 34px; padding: 0; border: 0; border-radius: 8px; background: transparent; color: var(--hb-hh1-fg); cursor: pointer; }
.hb-hh1-search:hover { background: rgba(27, 23, 18, .08); }
.hb-hh1-main {
  position: relative; z-index: 2; flex: 1 1 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px;
  width: 100%; max-width: 940px; margin: 0 auto; padding: 8px 32px 64px; text-align: center;
}
.hb-hh1-title {
  max-width: 12em; margin: 0 0 clamp(26px, 3.4cqi, 50px); color: var(--hb-hh1-fg);
  font-family: var(--font-serif, "Iowan Old Style", "Palatino Linotype", Georgia, serif);
  font-size: clamp(34px, 6.4cqi, 92px); font-weight: 700; line-height: .98; letter-spacing: -.045em; text-wrap: balance;
  text-shadow: 0 0 28px var(--hb-hh1-paper), 0 0 12px var(--hb-hh1-paper), 0 0 3px var(--hb-hh1-paper);
  animation: hb-hh1-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh1-sub {
  max-width: 34em; margin: 0; color: var(--hb-hh1-fg); font-size: 16px; font-weight: 500; line-height: 1.5; text-wrap: pretty;
  text-shadow: 0 0 18px var(--hb-hh1-paper), 0 0 8px var(--hb-hh1-paper);
  animation: hb-hh1-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh1-sub, .hb-hh1-more, .hb-hh1-caption { background: rgba(239, 231, 214, .8); padding: 3px 10px; border-radius: 6px; -webkit-box-decoration-break: clone; box-decoration-break: clone; text-shadow: none; }
.hb-hh1-side { animation: hb-hh1-up .8s .16s cubic-bezier(.2, .7, .2, 1) both; }
.hb-hh1-more { color: var(--hb-hh1-fg); font-size: 13px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; text-decoration: underline; text-underline-offset: 5px; text-decoration-color: var(--hb-hh1-accent); text-decoration-thickness: 2px; }
.hb-hh1 .hb-hh1-cta { background: var(--hb-hh1-fg); color: var(--hb-hh1-paper); }
.hb-hh1 .hb-hh1-cmd { background: var(--hb-hh1-paper); border-color: var(--hb-hh1-fg); }
.hb-hh1 .hb-hh1-prompt { color: var(--hb-hh1-accent); }
.hb-hh1 .hb-hh1-caption { color: var(--hb-hh1-fg); text-shadow: 0 0 10px var(--hb-hh1-paper); }
.hb-hh1-side { display: flex; flex-direction: column; gap: 14px; min-width: 0; align-items: var(--hb-hh1-align, flex-start); }
.hb-hh1-row { display: flex; flex-wrap: wrap; align-items: stretch; gap: 10px; max-width: 100%; justify-content: var(--hb-hh1-align, flex-start); }
.hb-hh1-cta {
  display: inline-flex; flex: none; align-items: center; justify-content: center; gap: 6px;
  height: 44px; padding: 0 16px 0 20px; border-radius: 8px;
  background: var(--hb-hh1-accent); color: var(--hb-hh1-ink);
  font-size: 14px; font-weight: 600; letter-spacing: -.01em; text-decoration: none; white-space: nowrap;
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh1-cta:hover { filter: brightness(1.08); }
.hb-hh1-cta svg { transition: transform .2s ease; }
.hb-hh1-cta:hover svg { transform: translateX(2px); }
.hb-hh1-cmd {
  display: flex; align-items: center; gap: 8px; min-width: 0; height: 44px; padding: 0 6px 0 14px;
  border: 1px solid var(--hb-hh1-line); border-radius: 8px; background: var(--hb-hh1-panel);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}
.hb-hh1-prompt { flex: none; color: var(--hb-hh1-accent); font-family: var(--hb-hh1-mono); font-size: 12px; }
.hb-hh1-code { min-width: 0; overflow: hidden; color: var(--hb-hh1-fg); font-family: var(--hb-hh1-mono); font-size: 12px; white-space: nowrap; text-overflow: ellipsis; }
.hb-hh1-copybtn {
  display: inline-grid; flex: none; place-items: center; width: 30px; height: 30px; padding: 0;
  border: 0; border-radius: 6px; background: transparent; color: var(--hb-hh1-mute); cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh1-copybtn:hover { color: var(--hb-hh1-fg); background: var(--hb-hh1-line); }
.hb-hh1-copybtn[data-done="true"] { color: var(--hb-hh1-accent); }
.hb-hh1-caption { margin: 0; color: var(--hb-hh1-mute); font-family: var(--hb-hh1-mono); font-size: 11.5px; letter-spacing: .04em; }
.hb-hh1-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hb-hh1 a:focus-visible, .hb-hh1 button:focus-visible { outline: 2px solid var(--hb-hh1-accent); outline-offset: 2px; }

@container (max-width: 860px) {
  .hb-hh1-bar { gap: 16px; padding: 18px 24px; }
  .hb-hh1-side-l .hb-hh1-links, .hb-hh1-side-r .hb-hh1-links { gap: 16px; }
}
@container (max-width: 700px) {
  .hb-hh1-side-l, .hb-hh1-side-r .hb-hh1-links, .hb-hh1-outline { display: none; }
  .hb-hh1-bar { grid-template-columns: 1fr auto 1fr; }
  .hb-hh1-main { padding: 16px 20px 40px; gap: 18px; justify-content: center; }
  .hb-hh1-sub { font-size: 14.5px; }
  .hb-hh1-side, .hb-hh1-row { align-self: stretch; }
  .hb-hh1-row { flex-direction: column; }
  .hb-hh1-cta { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh1-title, .hb-hh1-sub, .hb-hh1-sub, .hb-hh1-more, .hb-hh1-caption { background: rgba(239, 231, 214, .8); padding: 3px 10px; border-radius: 6px; -webkit-box-decoration-break: clone; box-decoration-break: clone; text-shadow: none; }
.hb-hh1-side { animation: none; }
  .hb-hh1-link, .hb-hh1-cta, .hb-hh1-cta svg, .hb-hh1-copybtn, .hb-hh1-outline { transition: none; }
}
`;

const defaultNav: HeroDotSaturnLink[] = [
  { label: "Journal", href: "#" },
  { label: "Studio", href: "#" },
  { label: "Pricing", href: "#" },
];
const defaultNavCta: HeroDotSaturnLink = { label: "Get started", href: "#" };
const defaultPrimary: HeroDotSaturnLink = { label: "Start building", href: "#" };
const defaultMore: HeroDotSaturnLink = { label: "Read the story", href: "#" };

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
    <div className="hb-hh1-side">
      {command || primaryCta ? (
        <div className="hb-hh1-row">
          {primaryCta ? (
            <a className="hb-hh1-cta" href={primaryCta.href}>
              {primaryCta.label}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </a>
          ) : null}
          {command ? (
            <div className="hb-hh1-cmd">
              <span className="hb-hh1-prompt" aria-hidden="true">$</span>
              <code className="hb-hh1-code">{command}</code>
              <button type="button" className="hb-hh1-copybtn" data-done={copied} onClick={onCopy} aria-label={copied ? "Copied" : "Copy command"}>
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
                <span className="hb-hh1-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      {caption ? <p className="hb-hh1-caption">{caption}</p> : null}
    </div>
  );
}


const INK: [number, number, number] = [27, 23, 18];
const RING_DEFS = [
  { a: 1.3, b: 1.52, density: 9000, tone: 0, gap: 0 },
  { a: 1.6, b: 1.9, density: 9000, tone: 1, gap: 0 },
  { a: 2.0, b: 2.1, density: 9000, tone: 0, gap: 1 },
];

function Mark() {
  return (
    <svg className="hb-hh1-mark" width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="6" fill="currentColor" />
      <ellipse cx="14" cy="14" rx="12.5" ry="4.2" transform="rotate(-18 14 14)" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function HeroDotSaturn({
  title = "Build products with their own gravity.",
  subtitle = "Interfaces that pull people in and keep them in orbit. Ship the source, own every line, and tune the motion to your brand.",
  caption = "3 rings · 15,000 dots · zero dependencies",
  command = "npx shadcn@latest add https://hyperblur.dev/r/hero-dot-saturn.json",
  brand = "Annulus",
  accent = "#c2542d",
  primaryCta = defaultPrimary,
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  density = 1,
  speed = 1,
  ringTilt = 0.45,
  bands = 9,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotSaturnProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const backRef = React.useRef<HTMLCanvasElement>(null);
  const frontRef = React.useRef<HTMLCanvasElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);
  const { copied, copy } = useCopy(command);

  React.useEffect(() => {
    const root = rootRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    const main = mainRef.current;
    const backCtx = back?.getContext("2d");
    const frontCtx = front?.getContext("2d");
    if (!root || !back || !front || !main || !backCtx || !frontCtx) return;
    const cb: CanvasRenderingContext2D = backCtx;
    const cf: CanvasRenderingContext2D = frontCtx;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mult = clampNum(density, 0.2, 2, 1);
    const pace = clampNum(speed, 0, 4, 1);
    const ratio = clampNum(ringTilt * 0.38, 0.06, 0.9, 0.17);
    const pitch = Math.asin(ratio);
    const nBands = clampNum(bands, 1, 24, 9);
    const roll = -0.12;
    const cP = Math.cos(pitch);
    const sP = Math.sin(pitch);
    const cR = Math.cos(roll);
    const sR = Math.sin(roll);

    const nSphere = Math.round(8000 * mult);
    const sx0 = new Float32Array(nSphere);
    const sy0 = new Float32Array(nSphere);
    const sz0 = new Float32Array(nSphere);
    const sBand = new Float32Array(nSphere);
    const sRnd = new Float32Array(nSphere);
    for (let i = 0; i < nSphere; i++) {
      const y = Math.max(-1, Math.min(1, 1 - (2 * (i + 0.5)) / nSphere + (hash(i, 7) - 0.5) * (1.4 / Math.sqrt(nSphere))));
      const r = Math.sqrt(1 - y * y);
      const th = i * GOLDEN + (hash(i, 9) - 0.5) * (5 / Math.sqrt(nSphere));
      sx0[i] = Math.cos(th) * r;
      sy0[i] = y;
      sz0[i] = Math.sin(th) * r;
      sBand[i] = Math.sin(Math.asin(y) * nBands * 1.0 + 0.6);
      sRnd[i] = hash(i, 5);
    }

    const rs: number[] = [];
    const ra: number[] = [];
    const rz: number[] = [];
    const rc: number[] = [];
    for (let k = 0; k < RING_DEFS.length; k++) {
      const def = RING_DEFS[k];
      const cnt = Math.round(((def.a + def.b) / 2) * (def.b - def.a) * def.density * mult);
      for (let j = 0; j < cnt; j++) {
        const u = hash(j, 40 + k);
        const rad = def.a + (def.b - def.a) * u;
        const ang = hash(j, 50 + k) * TAU;
        if (def.gap && Math.sin(ang * 36) < -0.2) continue;
        rs.push(rad);
        ra.push(ang);
        rz.push(0.7 + hash(j, 60 + k) * 0.8);
        rc.push(def.tone === 1 ? (hash(j, 70 + k) < 0.16 ? 1 : 0) : 1);
      }
    }
    const nRing = rs.length;
    const ringR = Float32Array.from(rs);
    const ringA = Float32Array.from(ra);
    const ringS = Float32Array.from(rz);
    const ringC = Uint8Array.from(rc);

    const nDust = 160;
    const total = nSphere + nRing;
    const X = new Float32Array(total);
    const Y = new Float32Array(total);
    const Rr = new Float32Array(total);
    const Bk = new Int8Array(total);

    const acc = resolveRgb(accent, cb, [194, 84, 45]);
    const inkFill = (a: number) => `rgba(${INK[0]}, ${INK[1]}, ${INK[2]}, ${a})`;
    const accFill = (a: number) => `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, ${a})`;
    const levels = [0.4, 0.7, 0.96];
    const fills: string[] = [];
    for (let c = 0; c < 2; c++) for (let l = 0; l < 3; l++) fills.push(c ? accFill(levels[l]) : inkFill(levels[l]));

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let R = 100;
    let unit = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = reduce ? 6 : 0;

    function layout() {
      if (!root || !back || !front || !main) return;
      const rect = root.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      for (const c of [back, front]) {
        c.width = Math.max(1, Math.round(w * dpr));
        c.height = Math.max(1, Math.round(h * dpr));
      }
      const small = w < 700;
      const t = main.querySelector(".hb-hh1-title");
      const tr = t ? t.getBoundingClientRect() : null;
      const mid = tr ? tr.top - rect.top + tr.height / 2 : h / 2;
      R = small ? Math.min(w * 0.4, h * 0.22) : Math.min(h * 0.34, w * 0.27);
      cx = w / 2;
      cy = mid + R * 0.07;
      unit = Math.max(0.5, Math.min(1.5, R / 300));
    }

    function draw() {
      if (!w || !h) return;
      for (const c of [cb, cf]) {
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
        c.clearRect(0, 0, w, h);
      }
      cb.fillStyle = inkFill(0.2);
      for (let k = 0; k < nDust; k++) {
        const x = hash(k, 81) * w;
        const y = hash(k, 82) * h;
        const tw = reduce ? 1 : 0.6 + 0.4 * Math.sin(time * 0.8 + hash(k, 83) * TAU);
        cb.globalAlpha = tw;
        cb.fillRect(x, y, 1.6, 1.6);
      }
      cb.globalAlpha = 1;
      const spin = time * 0.1 * pace;
      const cS = Math.cos(spin);
      const sS = Math.sin(spin);
      const lx = -0.5;
      const ly = 0.42;
      const lz = 0.76;
      const base = R * 0.0092;
      for (let i = 0; i < nSphere; i++) {
        const x0 = sx0[i] * cS + sz0[i] * sS;
        const z0 = -sx0[i] * sS + sz0[i] * cS;
        const y0 = sy0[i];
        const y1 = y0 * cP - z0 * sP;
        const z1 = y0 * sP + z0 * cP;
        if (z1 < 0.02) {
          Bk[i] = -1;
          continue;
        }
        const x2 = x0 * cR - y1 * sR;
        const y2 = x0 * sR + y1 * cR;
        const lam = Math.max(0, x2 * lx + y2 * ly + z1 * lz);
        const shade = 1 - lam;
        const band = sBand[i];
        const rr = base * (0.22 + 1.15 * shade * shade + 0.25 * shade) * (0.8 + 0.3 * band) * (0.45 + 0.55 * Math.sqrt(z1));
        X[i] = cx + x2 * R;
        Y[i] = cy - y2 * R;
        Rr[i] = rr;
        const terra = band > 0.9 && sRnd[i] < 0.55 ? 1 : 0;
        Bk[i] = terra * 3 + (shade > 0.55 ? 2 : shade > 0.28 ? 1 : 0);
        if (rr < 0.28) Bk[i] = -1;
      }
      const dotBase = Math.max(0.9, 1.45 * unit);
      for (let j = 0; j < nRing; j++) {
        const i = nSphere + j;
        const rad = ringR[j];
        const ang = ringA[j] + time * 0.09 * pace * (1.7 / Math.pow(rad, 1.5));
        const x0 = Math.cos(ang) * rad;
        const z0 = Math.sin(ang) * rad;
        const y1 = -z0 * sP;
        const z1 = z0 * cP;
        const x2 = x0 * cR - y1 * sR;
        const y2 = x0 * sR + y1 * cR;
        const px = cx + x2 * R;
        const py = cy - y2 * R;
        const frontSide = z1 >= 0;
        if (!frontSide && Math.hypot(x2, y2) < 0.99) {
          Bk[i] = -1;
          continue;
        }
        Rr[i] = dotBase * ringS[j] * (frontSide ? 1.1 : 0.85);
        X[i] = px;
        Y[i] = py;
        const lv = frontSide ? 2 : 1;
        const col = ringC[j] ? 3 : 0;
        Bk[i] = (frontSide ? 6 : 0) + col + lv;
      }
      cf.fillStyle = "#efe7d6";
      cf.beginPath();
      for (let i = nSphere; i < total; i++) {
        if (Bk[i] < 6) continue;
        const r = Rr[i] + 1.6;
        cf.moveTo(X[i] + r, Y[i]);
        cf.arc(X[i], Y[i], r, 0, TAU);
      }
      cf.fill();
      for (let k = 0; k < 12; k++) {
        const c = k >= 6 ? cf : cb;
        const kk = k % 6;
        c.fillStyle = fills[kk];
        c.beginPath();
        let any = false;
        for (let i = 0; i < total; i++) {
          if (Bk[i] !== k) continue;
          const r = Rr[i];
          c.moveTo(X[i] + r, Y[i]);
          c.arc(X[i], Y[i], r, 0, TAU);
          any = true;
        }
        if (any) c.fill();
      }
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
    ro.observe(main);
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
  }, [accent, density, speed, ringTilt, bands]);

  const Heading = headingAs;
  const vars = { "--hb-hh1-accent": accent, "--hb-hh1-ink": inkFor(accent, "#1b1712"), ...style } as React.CSSProperties;
  const split = Math.ceil(nav.length / 2);
  const leftNav = nav.slice(0, split);
  const rightNav = nav.slice(split);

  return (
    <section ref={rootRef} className={`hb-hh1 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-saturn" precedence="default">{css}</style>
      <canvas ref={backRef} className="hb-hh1-canvas" aria-hidden="true" />
      <header className="hb-hh1-bar">
        <div className="hb-hh1-side-l">
          {leftNav.length ? (
            <nav aria-label="Primary">
              <ul className="hb-hh1-links">
                {leftNav.map((item) => (
                  <li key={item.label}>
                    <a className="hb-hh1-link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
        <a className="hb-hh1-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        <div className="hb-hh1-side-r">
          {rightNav.length ? (
            <nav aria-label="Secondary">
              <ul className="hb-hh1-links">
                {rightNav.map((item) => (
                  <li key={item.label}>
                    <a className="hb-hh1-link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <div className="hb-hh1-tools">
            {navCta ? (
              <a className="hb-hh1-outline" href={navCta.href}>
                {navCta.label}
              </a>
            ) : null}
            <button type="button" className="hb-hh1-search" aria-label="Search" onClick={onSearch}>
              <SearchIcon />
            </button>
          </div>
        </div>
      </header>
      <div ref={mainRef} className="hb-hh1-main">
        <Heading className="hb-hh1-title">{title}</Heading>
        {subtitle ? <p className="hb-hh1-sub">{subtitle}</p> : null}
        <Actions caption={caption} command={command} primaryCta={primaryCta} copied={copied} onCopy={copy} />
        {learnMore ? (
          <a className="hb-hh1-more" href={learnMore.href}>
            {learnMore.label}
          </a>
        ) : null}
      </div>
      <canvas ref={frontRef} className="hb-hh1-canvas" data-front="true" aria-hidden="true" />
    </section>
  );
}
