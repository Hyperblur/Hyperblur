"use client";

import * as React from "react";

export interface HeroDotSilhouetteLink {
  label: string;
  href: string;
}

export interface HeroDotSilhouetteProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotSilhouetteLink | null;
  brand?: string;
  nav?: HeroDotSilhouetteLink[];
  navCta?: HeroDotSilhouetteLink | null;
  learnMore?: HeroDotSilhouetteLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  src?: string;
  relief?: number;
  swing?: number;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh9-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-hh9 {
  --hb-hh9-accent: #1740ff;
  --hb-hh9-ink: #ffffff;
  --hb-hh9-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 680px;
  overflow: hidden;
  container-type: inline-size;
  background: #f3ecdd;
  color: #ffffff;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}
.hb-hh9 *, .hb-hh9 *::before, .hb-hh9 *::after { box-sizing: border-box; }
.hb-hh9-wrap {
  display: grid;
  flex: 1 1 auto;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
.hb-hh9-panel {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--hb-hh9-accent);
  color: #ffffff;
}
.hb-hh9-art {
  position: relative;
  min-width: 0;
  min-height: 420px;
  overflow: hidden;
  background: #f3ecdd;
}
.hb-hh9-canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh9-tag {
  position: absolute;
  right: 20px;
  bottom: 18px;
  z-index: 1;
  margin: 0;
  color: #0d0d0f;
  font-family: var(--hb-hh9-mono);
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-hh9-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 26px 48px;
}
.hb-hh9-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -.02em;
  text-decoration: none;
  border-radius: 8px;
}
.hb-hh9-mark { flex: none; color: #ffffff; }
.hb-hh9-right { display: flex; align-items: center; gap: 22px; }
.hb-hh9-links {
  display: flex;
  align-items: center;
  gap: 22px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh9-link {
  color: rgba(255, 255, 255, .78);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color .2s ease;
}
.hb-hh9-link:hover { color: #ffffff; }
.hb-hh9-search {
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, .78);
  cursor: pointer;
  transition: color .2s ease;
}
.hb-hh9-search:hover { color: #ffffff; }
.hb-hh9-copy {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: flex-end;
  gap: 22px;
  padding: 40px 48px 56px;
}
.hb-hh9-title {
  max-width: 9em;
  margin: 0;
  color: #ffffff;
  font-size: clamp(38px, 6.2cqi, 96px);
  font-weight: 800;
  line-height: .94;
  letter-spacing: -.055em;
  text-wrap: balance;
  animation: hb-hh9-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh9-sub {
  max-width: 30em;
  margin: 0;
  color: rgba(255, 255, 255, .86);
  font-size: 16px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-hh9-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh9-row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
  animation: hb-hh9-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh9-cmd {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  height: 46px;
  padding: 0 6px 0 14px;
  border: 1px solid rgba(255, 255, 255, .42);
  border-radius: 8px;
  background: rgba(255, 255, 255, .08);
}
.hb-hh9-prompt { flex: none; color: #ffffff; font-family: var(--hb-hh9-mono); font-size: 12px; font-weight: 700; }
.hb-hh9-code {
  min-width: 0;
  overflow: hidden;
  color: #ffffff;
  font-family: var(--hb-hh9-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh9-copybtn {
  display: inline-grid;
  flex: none;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, .8);
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh9-copybtn:hover { color: #ffffff; background: rgba(255, 255, 255, .14); }
.hb-hh9-copybtn[data-done="true"] { color: var(--hb-hh9-accent); background: #ffffff; }
.hb-hh9-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 46px;
  padding: 0 16px 0 20px;
  border-radius: 8px;
  background: #f3ecdd;
  color: #0d0d0f;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color .2s ease, transform .15s ease;
}
.hb-hh9-cta:hover { background: #ffffff; }
.hb-hh9-cta svg { transition: transform .2s ease; }
.hb-hh9-cta:hover svg { transform: translateX(2px); }
.hb-hh9-foot { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 24px; }
.hb-hh9-caption {
  margin: 0;
  color: rgba(255, 255, 255, .7);
  font-family: var(--hb-hh9-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-hh9-more {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
  border-radius: 8px;
}
.hb-hh9 a:focus-visible, .hb-hh9 button:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 3px;
}
.hb-hh9-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 900px) {
  .hb-hh9-bar { padding: 22px 32px; }
  .hb-hh9-copy { padding: 32px 32px 48px; }
}
@container (max-width: 760px) {
  .hb-hh9-wrap { grid-template-columns: minmax(0, 1fr); }
  .hb-hh9-bar { padding: 18px 22px; }
  .hb-hh9-copy { gap: 18px; padding: 36px 22px 40px; }
  .hb-hh9-title { font-size: clamp(38px, 12cqi, 64px); }
  .hb-hh9-art { min-height: 120cqi; }
  .hb-hh9-links { display: none; }
  .hb-hh9-sub { font-size: 15px; }
  .hb-hh9-row { flex-direction: column; }
  .hb-hh9-cta { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh9-title, .hb-hh9-sub, .hb-hh9-row { animation: none; }
  .hb-hh9-link, .hb-hh9-search, .hb-hh9-copybtn, .hb-hh9-cta, .hb-hh9-cta svg { transition: none; }
  .hb-hh9-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotSilhouetteLink[] = [
  { label: "Gallery", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
];
const defaultNavCta: HeroDotSilhouetteLink = { label: "Sign in", href: "#" };
const defaultPrimary: HeroDotSilhouetteLink = { label: "Try your portrait", href: "#" };
const defaultMore: HeroDotSilhouetteLink = { label: "Learn more", href: "#" };

const TAU = Math.PI * 2;
const INK = "#0d0d0f";

const PORTRAIT_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><defs><linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4a4a"/><stop offset="1" stop-color="#1c1c1c"/></linearGradient><linearGradient id="h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ececec"/><stop offset=".55" stop-color="#bdbdbd"/><stop offset="1" stop-color="#7c7c7c"/></linearGradient><linearGradient id="n" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b0b0b0"/><stop offset="1" stop-color="#5e5e5e"/></linearGradient></defs><path fill="url(#t)" d="M-10 610V528C-10 478 70 452 140 436L170 424H230L260 436C330 452 410 478 410 528V610Z"/><path fill="url(#n)" d="M160 320V420C168 442 232 442 240 420V320Z"/><path fill="#2a2a2a" d="M160 346C180 380 220 380 240 346V320H160Z"/><ellipse cx="113" cy="246" rx="11" ry="25" fill="#c4c4c4"/><ellipse cx="287" cy="246" rx="11" ry="25" fill="#767676"/><ellipse cx="200" cy="232" rx="87" ry="110" fill="url(#h)"/><path fill="url(#h)" d="M116 250C120 322 160 350 200 350C240 350 280 322 284 250Z"/><path fill="#131313" d="M106 238C92 140 136 82 204 82C274 82 312 140 294 238C290 192 272 152 232 140C196 130 150 142 126 188C118 202 110 220 106 238Z"/><path fill="#131313" d="M128 112C150 56 232 46 278 106C250 90 170 86 128 112Z"/><ellipse cx="164" cy="232" rx="13" ry="5.5" fill="#1b1b1b"/><ellipse cx="236" cy="232" rx="13" ry="5.5" fill="#1b1b1b"/><path d="M147 214Q165 204 184 212M216 212Q235 204 253 214" stroke="#202020" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M201 238L192 284Q200 292 210 284" stroke="#6a6a6a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M175 314Q200 326 225 314" stroke="#383838" stroke-width="6" stroke-linecap="round" fill="none"/></svg>';
const PORTRAIT = `data:image/svg+xml,${encodeURIComponent(PORTRAIT_SVG)}`;

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

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#ffffff";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.6 ? "#0d0d0f" : "#ffffff";
}

interface Grid {
  n: number;
  x: Float32Array;
  y: Float32Array;
  t: Float32Array;
  r: Float32Array;
  h: Float32Array;
}

function sampleGrid(img: HTMLImageElement, W: number, H: number, gap: number): Grid | null {
  const rowGap = gap * 0.866;
  const cols = Math.ceil(W / gap) + 1;
  const rows = Math.ceil(H / rowGap) + 1;
  const sw = cols * 2;
  const sh = rows * 2;
  if (sw * sh > 6000000) return null;
  const iw = img.naturalWidth || img.width || 400;
  const ih = img.naturalHeight || img.height || 600;
  const aspect = iw / ih;
  let ph = H * 1.4;
  let pw = ph * aspect;
  if (pw > W * 1.3) {
    pw = W * 1.3;
    ph = pw / aspect;
  }
  const px = (W - pw) / 2;
  const py = (H - ph) / 2 + H * 0.01;
  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const g = canvas.getContext("2d", { willReadFrequently: true });
  if (!g) return null;
  let data: Uint8ClampedArray;
  try {
    g.drawImage(img, (px / gap) * 2, (py / rowGap) * 2, (pw / gap) * 2, (ph / rowGap) * 2);
    data = g.getImageData(0, 0, sw, sh).data;
  } catch {
    return null;
  }
  let clear = 0;
  let total = 0;
  for (let q = 3; q < data.length; q += 4 * 17) {
    total++;
    if (data[q] < 250) clear++;
  }
  const alphaMode = clear > total * 0.04;
  const cap = cols * rows;
  const out: Grid = {
    n: 0,
    x: new Float32Array(cap),
    y: new Float32Array(cap),
    t: new Float32Array(cap),
    r: new Float32Array(cap),
    h: new Float32Array(cap),
  };
  let n = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const sx = 2 * i + (j & 1);
      const sy = 2 * j;
      if (sx >= sw || sy >= sh) continue;
      const p = (sy * sw + sx) * 4;
      const a = data[p + 3] / 255;
      if (a < 0.5) continue;
      const l = (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255;
      let t: number;
      if (alphaMode) t = 0.3 + 0.7 * (1 - l);
      else t = l < 0.72 ? (0.72 - l) / 0.72 : 0;
      if (t < 0.06) continue;
      out.x[n] = (i + (j & 1) * 0.5) * gap;
      out.y[n] = j * rowGap;
      out.t[n] = t;
      out.r[n] = Math.max(0.7, gap * 0.54 * Math.sqrt(t));
      out.h[n] = hash(j * cols + i, 7);
      n++;
    }
  }
  out.n = n;
  return out;
}

function Mark() {
  return (
    <svg className="hb-hh9-mark" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="1.4" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="6" cy="18" r="1.4" />
      <circle cx="18" cy="18" r="2.4" />
    </svg>
  );
}

export function HeroDotSilhouette({
  title = "Every face, a field of dots.",
  subtitle = "Feed it any portrait as SVG or PNG and its tones become a halftone of dots that swell and thin as they breathe. Ships as one file you own.",
  caption = "SVG or PNG · tone-mapped dots · MIT licensed",
  command = "npx hyperblur add hero-dot-silhouette",
  primaryCta = defaultPrimary,
  brand = "Halftone",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#1740ff",
  density = 1,
  speed = 1,
  src = PORTRAIT,
  relief = 0.25,
  swing = 28,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotSilhouetteProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const artRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const art = artRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !art || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mult = Math.min(2, Math.max(0.3, Number.isFinite(density) ? density : 1));
    const pace = Math.max(0, Number.isFinite(speed) ? speed : 1);
    const rel = Math.min(1, Math.max(0, Number.isFinite(relief) ? relief : 0.25));
    const swingRad = (Math.min(60, Math.max(0, Number.isFinite(swing) ? swing : 28)) * Math.PI) / 180;

    let img: HTMLImageElement | null = null;
    let grid: Grid | null = null;
    let dead = false;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = 0;
    let pointer = false;
    let ptx = 0;
    let curX = 0;
    let rebuildTimer: ReturnType<typeof setTimeout> | null = null;

    function gapNow() {
      return (w < 560 ? 5.6 : 7.4) / Math.sqrt(mult);
    }

    function rebuild() {
      if (!img || !w || !h) return;
      grid = sampleGrid(img, w, h, gapNow());
    }

    function load(href: string, fallback: boolean) {
      const el = new Image();
      el.decoding = "async";
      el.onload = () => {
        if (dead) return;
        img = el;
        rebuild();
        draw();
      };
      el.onerror = () => {
        if (dead || fallback) return;
        load(PORTRAIT, true);
      };
      el.src = href;
    }

    function layout() {
      if (!canvas || !art) return;
      const rect = art.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
    }

    function draw() {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const g = grid;
      if (!g || !w || !h) return;
      const breath = reduce ? 0.86 : 0.5 + 0.5 * Math.sin(time * 0.85 * pace);
      const yaw = reduce ? swingRad * 0.3 : swingRad * Math.sin(time * 0.45 * pace) + curX * 0.25;
      const sy = Math.sin(yaw);
      const base = 0.28 + 0.78 * breath;
      const scale = 0.86 + 0.26 * breath;
      const shift = rel * h * 0.34 * sy;
      ctx.fillStyle = INK;
      ctx.beginPath();
      for (let i = 0; i < g.n; i++) {
        const t = g.t[i];
        const wave = reduce ? 0 : 0.2 * Math.sin(g.y[i] * 0.012 - time * 1.25 * pace);
        const thr = base + wave;
        const k = (thr - g.h[i] * (1.2 - 0.55 * t)) * 5;
        if (k <= 0) continue;
        const r = g.r[i] * scale * (k >= 1 ? 1 : k);
        const x = g.x[i] + (t - 0.5) * shift;
        const y = g.y[i];
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, TAU);
      }
      ctx.fill();
    }

    function frame(now: number) {
      raf = 0;
      const step = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      time += step;
      const tx = pointer ? ptx : 0;
      curX += (tx - curX) * Math.min(1, step * 2.4);
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
    }
    function onLeave() {
      pointer = false;
    }
    function onVisibility() {
      if (document.hidden) stop();
      else schedule();
    }

    layout();
    load(typeof src === "string" && src ? src : PORTRAIT, false);

    const ro = new ResizeObserver(() => {
      layout();
      draw();
      if (rebuildTimer) clearTimeout(rebuildTimer);
      rebuildTimer = setTimeout(() => {
        rebuildTimer = null;
        if (dead) return;
        rebuild();
        draw();
      }, 120);
    });
    ro.observe(art);
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
      if (rebuildTimer) clearTimeout(rebuildTimer);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, speed, src, relief, swing]);

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
  const vars = { "--hb-hh9-accent": accent, "--hb-hh9-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh9 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-silhouette" precedence="default">{css}</style>
      <div className="hb-hh9-wrap">
        <div className="hb-hh9-panel">
          <header className="hb-hh9-bar">
            <a className="hb-hh9-brand" href="#">
              <Mark />
              <span>{brand}</span>
            </a>
            <div className="hb-hh9-right">
              {nav.length ? (
                <nav aria-label="Primary">
                  <ul className="hb-hh9-links">
                    {nav.map((item) => (
                      <li key={item.label}>
                        <a className="hb-hh9-link" href={item.href}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                    {navCta ? (
                      <li>
                        <a className="hb-hh9-link" href={navCta.href}>
                          {navCta.label}
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </nav>
              ) : null}
              <button type="button" className="hb-hh9-search" aria-label="Search" onClick={onSearch}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16l4.5 4.5" />
                </svg>
              </button>
            </div>
          </header>
          <div className="hb-hh9-copy">
            <Heading className="hb-hh9-title">{title}</Heading>
            {subtitle ? <p className="hb-hh9-sub">{subtitle}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh9-row">
                {command ? (
                  <div className="hb-hh9-cmd">
                    <span className="hb-hh9-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh9-code">{command}</code>
                    <button type="button" className="hb-hh9-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                      <span className="hb-hh9-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-hh9-cta" href={primaryCta.href}>
                    {primaryCta.label}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </a>
                ) : null}
              </div>
            ) : null}
            {caption || learnMore ? (
              <div className="hb-hh9-foot">
                {caption ? <p className="hb-hh9-caption">{caption}</p> : null}
                {learnMore ? (
                  <a className="hb-hh9-more" href={learnMore.href}>
                    {learnMore.label}
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div ref={artRef} className="hb-hh9-art" aria-hidden="true">
          <canvas ref={canvasRef} className="hb-hh9-canvas" />
        </div>
      </div>
    </section>
  );
}
