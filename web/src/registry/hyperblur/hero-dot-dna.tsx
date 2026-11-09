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
  showBar?: boolean;
}

type HeroLink = HeroDotDnaLink;

const css = `
@keyframes hb-hh2-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-hh2 {
  --hb-hh2-accent: #5eead4;
  --hb-hh2-ink: #042f2e;
  --hb-hh2-fg: #ecfdf5;
  --hb-hh2-mute: rgba(204, 251, 241, .68);
  --hb-hh2-line: rgba(204, 251, 241, .22);
  --hb-hh2-panel: rgba(4, 47, 46, .55);
  --hb-hh2-align: center;
  --hb-hh2-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
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
    radial-gradient(70% 55% at 50% 38%, rgba(94, 234, 212, .2), transparent 72%),
    linear-gradient(160deg, #042f2e 0%, #075e5a 52%, #0f766e 100%);
  color: var(--hb-hh2-fg);
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.hb-hh2 *, .hb-hh2 *::before, .hb-hh2 *::after { box-sizing: border-box; }
.hb-hh2-canvas { position: absolute; inset: 0; z-index: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.hb-hh2-bar {
  position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: 24px;
  width: 100%; max-width: 1280px; margin: 0 auto; padding: 24px 40px;
}
.hb-hh2-brand { display: inline-flex; align-items: center; gap: 10px; color: #fff; font-size: 16px; font-weight: 700; letter-spacing: -.02em; text-decoration: none; }
.hb-hh2-mark { flex: none; color: var(--hb-hh2-accent); }
.hb-hh2-menu { display: flex; align-items: center; gap: 30px; }
.hb-hh2-links { display: flex; align-items: center; gap: 30px; margin: 0; padding: 0; list-style: none; }
.hb-hh2-link { color: rgba(236, 253, 245, .8); font-size: 14px; text-decoration: none; transition: color .2s ease; }
.hb-hh2-link:hover { color: #fff; text-decoration: underline; text-underline-offset: 6px; }
.hb-hh2-search { display: inline-grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 0; border-radius: 8px; background: transparent; color: rgba(236, 253, 245, .8); cursor: pointer; }
.hb-hh2-search:hover { color: #fff; background: rgba(255, 255, 255, .1); }
.hb-hh2-stage { position: relative; z-index: 1; flex: 1 1 auto; min-height: 300px; }
.hb-hh2-copy {
  position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 20px;
  width: 100%; max-width: 860px; margin: 0 auto; padding: 0 32px 56px; text-align: center;
}
.hb-hh2-title {
  max-width: 16em; margin: 0; color: #fff; font-size: clamp(30px, 4.6cqi, 62px); font-weight: 700; line-height: 1.04; letter-spacing: -.04em; text-wrap: balance;
  text-shadow: 0 2px 30px rgba(4, 47, 46, .9), 0 0 4px rgba(4, 47, 46, .5);
  animation: hb-hh2-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh2-sub {
  max-width: 38em; margin: 0; color: rgba(236, 253, 245, .86); font-size: 16px; line-height: 1.55; text-wrap: pretty;
  text-shadow: 0 1px 20px rgba(4, 47, 46, .95);
  animation: hb-hh2-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh2-side { animation: hb-hh2-up .8s .16s cubic-bezier(.2, .7, .2, 1) both; }
.hb-hh2-more { color: var(--hb-hh2-accent); font-size: 14px; font-weight: 600; text-decoration: none; }
.hb-hh2-more:hover { text-decoration: underline; text-underline-offset: 5px; }
.hb-hh2-side { display: flex; flex-direction: column; gap: 14px; min-width: 0; align-items: var(--hb-hh2-align, flex-start); }
.hb-hh2-row { display: flex; flex-wrap: wrap; align-items: stretch; gap: 10px; max-width: 100%; justify-content: var(--hb-hh2-align, flex-start); }
.hb-hh2-cta {
  display: inline-flex; flex: none; align-items: center; justify-content: center; gap: 6px;
  height: 44px; padding: 0 16px 0 20px; border-radius: 8px;
  background: var(--hb-hh2-accent); color: var(--hb-hh2-ink);
  font-size: 14px; font-weight: 600; letter-spacing: -.01em; text-decoration: none; white-space: nowrap;
  transition: filter .2s ease, transform .2s ease;
}
.hb-hh2-cta:hover { filter: brightness(1.08); }
.hb-hh2-cta svg { transition: transform .2s ease; }
.hb-hh2-cta:hover svg { transform: translateX(2px); }
.hb-hh2-cmd {
  display: flex; align-items: center; gap: 8px; min-width: 0; height: 44px; padding: 0 6px 0 14px;
  border: 1px solid var(--hb-hh2-line); border-radius: 8px; background: var(--hb-hh2-panel);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}
.hb-hh2-prompt { flex: none; color: var(--hb-hh2-accent); font-family: var(--hb-hh2-mono); font-size: 12px; }
.hb-hh2-code { min-width: 0; overflow: hidden; color: var(--hb-hh2-fg); font-family: var(--hb-hh2-mono); font-size: 12px; white-space: nowrap; text-overflow: ellipsis; }
.hb-hh2-copybtn {
  display: inline-grid; flex: none; place-items: center; width: 30px; height: 30px; padding: 0;
  border: 0; border-radius: 6px; background: transparent; color: var(--hb-hh2-mute); cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh2-copybtn:hover { color: var(--hb-hh2-fg); background: var(--hb-hh2-line); }
.hb-hh2-copybtn[data-done="true"] { color: var(--hb-hh2-accent); }
.hb-hh2-caption { margin: 0; color: var(--hb-hh2-mute); font-family: var(--hb-hh2-mono); font-size: 11.5px; letter-spacing: .04em; }
.hb-hh2-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hb-hh2 a:focus-visible, .hb-hh2 button:focus-visible { outline: 2px solid var(--hb-hh2-accent); outline-offset: 2px; }

@container (max-width: 760px) {
  .hb-hh2-bar { padding: 18px 24px; }
  .hb-hh2-copy { padding: 0 24px 40px; }
}
@container (max-width: 640px) {
  .hb-hh2-links { display: none; }
  .hb-hh2-menu { gap: 12px; }
  .hb-hh2-stage { min-height: 52cqi; }
  .hb-hh2-sub { font-size: 14.5px; }
  .hb-hh2-side, .hb-hh2-row { align-self: stretch; }
  .hb-hh2-row { flex-direction: column; }
  .hb-hh2-cta { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh2-title, .hb-hh2-sub, .hb-hh2-side { animation: none; }
  .hb-hh2-link, .hb-hh2-cta, .hb-hh2-cta svg, .hb-hh2-copybtn { transition: none; }
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
    <div className="hb-hh2-side">
      {command || primaryCta ? (
        <div className="hb-hh2-row">
          {primaryCta ? (
            <a className="hb-hh2-cta" href={primaryCta.href}>
              {primaryCta.label}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </a>
          ) : null}
          {command ? (
            <div className="hb-hh2-cmd">
              <span className="hb-hh2-prompt" aria-hidden="true">$</span>
              <code className="hb-hh2-code">{command}</code>
              <button type="button" className="hb-hh2-copybtn" data-done={copied} onClick={onCopy} aria-label={copied ? "Copied" : "Copy command"}>
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
                <span className="hb-hh2-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      {caption ? <p className="hb-hh2-caption">{caption}</p> : null}
    </div>
  );
}


function Mark() {
  return (
    <svg className="hb-hh2-mark" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7c6 0 12 10 18 10M3 17c6 0 12-10 18-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.5 8.6v6.8M16.5 8.6v6.8M12 10.4v3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

export function HeroDotDna({
  title = "Two strands. One source of truth.",
  subtitle = "Version every dataset and replay every experiment. A pipeline that pairs each change with its proof, from the first sample to the final figure.",
  caption = "6 turns · 60 base pairs · runs in any React app",
  command = "npx shadcn@latest add https://hyperblur.dev/r/hero-dot-dna.json",
  brand = "Your brand",
  accent = "#5eead4",
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
  showBar = false,
  className = "",
  style,
  ...rest
}: HeroDotDnaProps) {
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
    const nTurns = clampNum(turns, 1, 16, 6);
    const nPulses = Math.round(clampNum(pulses, 0, 8, 3));
    const perStrand = Math.round(2300 * mult);
    const nRungs = Math.max(10, Math.round(nTurns * 9));
    const perRung = Math.max(6, Math.round(18 * Math.sqrt(mult)));
    const total = perStrand * 2 + nRungs * (perRung + 2);
    const pt = new Float32Array(total);
    const pq = new Uint8Array(total);
    const pk = new Uint8Array(total);
    const pj = new Float32Array(total);
    const ps = new Float32Array(total);
    const pr = new Int16Array(total);
    let n = 0;
    for (let q = 0; q < 2; q++) {
      for (let j = 0; j < perStrand; j++) {
        pt[n] = (j + hash(j, 21 + q) * 0.8) / perStrand;
        pq[n] = q;
        pk[n] = 0;
        pj[n] = hash(j, 23 + q);
        ps[n] = hash(j, 25 + q);
        n++;
      }
    }
    for (let k = 0; k < nRungs; k++) {
      const t = (k + 0.5) / nRungs;
      for (let d = 0; d < perRung; d++) {
        pt[n] = t;
        pk[n] = 1;
        pq[n] = d / (perRung - 1) < 0.5 ? 0 : 1;
        ps[n] = 0.06 + (0.88 * d) / (perRung - 1);
        pj[n] = hash(n, 31);
        pr[n] = k;
        n++;
      }
      for (let e = 0; e < 2; e++) {
        pt[n] = t;
        pk[n] = 2;
        pq[n] = e;
        ps[n] = e;
        pj[n] = hash(n, 33);
        pr[n] = k;
        n++;
      }
    }
    const nBokeh = 26;

    const acc = resolveRgb(accent, ctx, [94, 234, 212]);
    const sprMint = makeSprite(acc, 64, 0.35);
    const sprWhite = makeSprite([226, 255, 250], 64, 0.6);
    const sprBokeh = makeSprite(acc, 128, 0);

    const X = new Float32Array(total);
    const Y = new Float32Array(total);
    const Z = new Float32Array(total);
    const B = new Float32Array(total);
    const Sz = new Float32Array(total);
    const rungGlow = new Float32Array(nRungs);
    const pulseT = new Float32Array(Math.max(1, nPulses));

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let len = 1;
    let rad = 1;
    let eTurns = nTurns;
    let unit = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = reduce ? 3.2 : 0;

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
      cy = st.top - rect.top + st.height / 2;
      len = w * (small ? 1.5 : 1.16);
      rad = small ? Math.min(h * 0.22, st.height * 0.5) : Math.min(h * 0.31, w * 0.3);
      eTurns = small ? Math.max(1.5, nTurns * 0.4) : nTurns * 0.62;
      unit = Math.max(0.55, Math.min(1.5, rad / 260));
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let k = 0; k < nBokeh; k++) {
        const u = (hash(k, 61) + time * 0.012 * pace * (0.5 + hash(k, 62))) % 1;
        const bx = hash(k, 63) * w;
        const by = h * (1.1 - u * 1.2);
        const bs = (50 + hash(k, 64) * 130) * unit;
        ctx.globalAlpha = 0.06 + hash(k, 65) * 0.1;
        ctx.drawImage(sprBokeh, bx - bs / 2, by - bs / 2, bs, bs);
      }
      const spin = time * 0.55 * pace;
      const roll = -0.07;
      const cR = Math.cos(roll);
      const sR = Math.sin(roll);
      const pitch = 0.28;
      const cP = Math.cos(pitch);
      const sP = Math.sin(pitch);
      for (let p = 0; p < nPulses; p++) {
        const v = time * 0.07 * pace * (1 + 0.2 * (p % 3)) + p / nPulses + 0.1;
        pulseT[p] = v - Math.floor(v);
      }
      for (let k = 0; k < nRungs; k++) {
        const tk = (k + 0.5) / nRungs;
        let g = 0;
        for (let p = 0; p < nPulses; p++) {
          const d = pulseT[p] - tk;
          let e = Math.exp(-(d * d) / 0.0007);
          if (d < 0 && d > -0.12) e += 0.5 * Math.exp(d * 24);
          if (e > g) g = e;
        }
        rungGlow[k] = g;
      }
      const off = 2.35;
      for (let i = 0; i < n; i++) {
        const t = pt[i];
        const kind = pk[i];
        let ang: number;
        let r0 = 1;
        let yy = 0;
        let gl = 0;
        if (kind === 0) {
          ang = t * eTurns * TAU + pq[i] * off + spin;
          r0 = 1 + (pj[i] - 0.5) * 0.14;
          yy = (ps[i] - 0.5) * 0.05;
          for (let p = 0; p < nPulses; p++) {
            if ((p & 1) !== pq[i] && nPulses > 1) continue;
            const d = pulseT[p] - t;
            let e = Math.exp(-(d * d) / 0.00025);
            if (d < 0 && d > -0.07) e += 0.4 * Math.exp(d * 40);
            if (e > gl) gl = e;
          }
        } else {
          const a1 = t * eTurns * TAU + spin;
          const a2 = a1 + off;
          const s = ps[i];
          if (kind === 1) {
            const ax = Math.cos(a1);
            const az = Math.sin(a1);
            const bx = Math.cos(a2);
            const bz = Math.sin(a2);
            const ex = ax + (bx - ax) * s;
            const ez = az + (bz - az) * s;
            ang = Math.atan2(ez, ex);
            r0 = Math.sqrt(ex * ex + ez * ez);
            yy = (pj[i] - 0.5) * 0.03;
          } else {
            ang = s ? a2 : a1;
          }
          gl = rungGlow[pr[i]];
        }
        const mx = (t * 2 - 1) * 0.5 * len;
        const my = Math.cos(ang) * r0 * rad;
        const mz = Math.sin(ang) * r0;
        const y1 = my * cP - mz * rad * sP;
        const z1 = my * sP + mz * rad * cP;
        const persp = 1 + (z1 / rad) * 0.1;
        const xr = mx;
        const yr = y1 * persp + yy * rad;
        X[i] = cx + xr * cR - yr * sR;
        Y[i] = cy + xr * sR + yr * cR;
        Z[i] = mz;
        const front = 0.5 + 0.5 * mz;
        let b: number;
        let sz: number;
        if (kind === 0) {
          b = (0.16 + 0.34 * front) * (0.7 + 0.3 * pj[i]) + gl * 0.85;
          sz = (7 + 5 * front + gl * 9) * (0.8 + 0.4 * ps[i]);
        } else if (kind === 1) {
          b = (0.3 + 0.4 * front) + gl * 0.7;
          sz = (5 + 4 * front + gl * 7) * (0.8 + 0.4 * pj[i]);
        } else {
          b = 0.45 + 0.4 * front + gl * 0.6;
          sz = 11 + 7 * front + gl * 10;
        }
        B[i] = b;
        Sz[i] = sz * unit;
      }
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < n; i++) {
          if ((Z[i] >= 0 ? 1 : 0) !== pass) continue;
          const b = B[i];
          if (b < 0.02) continue;
          const white = pq[i] === 1 || (pk[i] === 1 && pj[i] > 0.6) ? 1 : 0;
          ctx.globalAlpha = Math.min(1, b);
          const s = Sz[i];
          ctx.drawImage(white ? sprWhite : sprMint, X[i] - s / 2, Y[i] - s / 2, s, s);
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
  }, [accent, density, speed, turns, pulses]);

  const Heading = headingAs;
  const vars = { "--hb-hh2-accent": accent, "--hb-hh2-ink": inkFor(accent, "#042f2e"), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh2 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-dna" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh2-canvas" aria-hidden="true" />
      {showBar ? (
      <header className="hb-hh2-bar">
        <a className="hb-hh2-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        <div className="hb-hh2-menu">
          {nav.length || navCta ? (
            <nav aria-label="Primary">
              <ul className="hb-hh2-links">
                {nav.map((item) => (
                  <li key={item.label}>
                    <a className="hb-hh2-link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
                {navCta ? (
                  <li>
                    <a className="hb-hh2-link" href={navCta.href}>
                      {navCta.label}
                    </a>
                  </li>
                ) : null}
              </ul>
            </nav>
          ) : null}
          <button type="button" className="hb-hh2-search" aria-label="Search" onClick={onSearch}>
            <SearchIcon />
          </button>
        </div>
      </header>
      ) : null}
      <div ref={stageRef} className="hb-hh2-stage" aria-hidden="true" />
      <div className="hb-hh2-copy">
        <Heading className="hb-hh2-title">{title}</Heading>
        {subtitle ? <p className="hb-hh2-sub">{subtitle}</p> : null}
        <Actions caption={caption} command={command} primaryCta={primaryCta} copied={copied} onCopy={copy} />
        {learnMore ? (
          <a className="hb-hh2-more" href={learnMore.href}>
            {learnMore.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
