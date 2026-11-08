"use client";

import * as React from "react";

export interface HeroDotTorusLink {
  label: string;
  href: string;
}

export type HeroDotTorusShape = "torus" | "mobius";

export interface HeroDotTorusProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotTorusLink | null;
  brand?: string;
  nav?: HeroDotTorusLink[];
  navCta?: HeroDotTorusLink | null;
  learnMore?: HeroDotTorusLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  shape?: HeroDotTorusShape;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh5-up {
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-hh5 {
  --hb-hh5-accent: #ffe6c4;
  --hb-hh5-ink: #1a0a05;
  --hb-hh5-mono: var(--font-mono, ui-monospace), "Geist Mono", SFMono-Regular, Menlo, Consolas, monospace;
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 640px;
  overflow: hidden;
  container-type: inline-size;
  background: #ff4a1c;
  color: #1a0a05;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hh5 *, .hb-hh5 *::before, .hb-hh5 *::after { box-sizing: border-box; }
.hb-hh5-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh5-bar {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 26px clamp(20px, 4cqw, 56px) 0;
}
.hb-hh5-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #1a0a05;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-decoration: none;
}
.hb-hh5-right {
  display: flex;
  align-items: center;
  gap: clamp(14px, 2.4cqw, 34px);
}
.hb-hh5-links {
  display: flex;
  align-items: center;
  gap: clamp(14px, 2.4cqw, 34px);
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh5-link, .hb-hh5-search {
  appearance: none;
  display: inline-flex;
  align-items: center;
  border: 0;
  background: none;
  padding: 4px 0;
  color: #1a0a05;
  font: inherit;
  font-size: 15px;
  font-weight: 650;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 0 2px;
  transition: background-size 0.22s ease;
}
.hb-hh5-link:hover, .hb-hh5-search:hover { background-size: 100% 2px; }
.hb-hh5-link:focus-visible, .hb-hh5-search:focus-visible, .hb-hh5-cta:focus-visible, .hb-hh5-copybtn:focus-visible, .hb-hh5-more:focus-visible, .hb-hh5-brand:focus-visible {
  outline: 2px solid #1a0a05;
  outline-offset: 3px;
  border-radius: 8px;
}
.hb-hh5-panel a:focus-visible, .hb-hh5-panel button:focus-visible { outline-color: #ffe6c4; }
.hb-hh5-foot {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 2.4cqw, 30px);
  margin-top: auto;
  padding: 0 clamp(20px, 4cqw, 56px) clamp(26px, 3.4cqw, 48px);
  pointer-events: none;
}
.hb-hh5-foot a, .hb-hh5-foot button, .hb-hh5-foot code { pointer-events: auto; }
.hb-hh5-panel {
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 2.4cqw, 30px);
  width: fit-content;
  max-width: min(100%, 60cqw);
  padding: clamp(20px, 2.4cqw, 34px);
  border-radius: 8px;
  background: #1a0a05;
  color: #ffe6c4;
  pointer-events: auto;
}
.hb-hh5-title {
  max-width: 11ch;
  margin: 0;
  color: #ffe6c4;
  font-size: clamp(50px, 7.6cqw, 140px);
  font-weight: 800;
  line-height: 0.88;
  letter-spacing: -0.055em;
  text-wrap: balance;
  animation: hb-hh5-up 0.8s 0.1s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.hb-hh5-lower {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 22px 40px;
  animation: hb-hh5-up 0.8s 0.25s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.hb-hh5-sub {
  max-width: 30ch;
  margin: 0;
  color: #ffe6c4;
  font-size: clamp(16px, 1.4cqw, 20px);
  font-weight: 550;
  line-height: 1.4;
}
.hb-hh5-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}
.hb-hh5-caption {
  margin: 0;
  color: #ffe6c4;
  font-family: var(--hb-hh5-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.hb-hh5-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.hb-hh5-cmd {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  padding: 6px 6px 6px 14px;
  border: 2px solid #ffe6c4;
  border-radius: 8px;
  background: transparent;
  color: #ffe6c4;
  font-family: var(--hb-hh5-mono);
  font-size: 13px;
}
.hb-hh5-prompt { opacity: 0.6; }
.hb-hh5-code { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-hh5-copybtn {
  appearance: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex: none;
  border: 0;
  border-radius: 6px;
  background: #ffe6c4;
  color: #1a0a05;
  cursor: pointer;
  transition: transform 0.18s ease;
}
.hb-hh5-copybtn:hover { transform: translateY(-1px); }
.hb-hh5-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 22px;
  border: 2px solid #ff4a1c;
  border-radius: 8px;
  background: #ff4a1c;
  color: #1a0a05;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease;
}
.hb-hh5-cta:hover { background: transparent; color: #ff4a1c; border-color: #ff4a1c; }
.hb-hh5-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ffe6c4;
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
}
.hb-hh5-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 720px) {
  .hb-hh5 { min-height: 720px; }
  .hb-hh5-bar { padding-top: 20px; }
  .hb-hh5-brand { font-size: 18px; }
  .hb-hh5-link, .hb-hh5-search { font-size: 13px; }
  .hb-hh5-right { gap: 14px; }
  .hb-hh5-links { gap: 14px; }
  .hb-hh5-title { max-width: 9ch; font-size: clamp(46px, 15.5cqw, 90px); }
  .hb-hh5-lower { flex-direction: column; align-items: flex-start; }
  .hb-hh5-panel { width: 100%; max-width: 100%; }
  .hb-hh5-cmd { font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh5-title, .hb-hh5-lower { animation: none; }
  .hb-hh5-link, .hb-hh5-search, .hb-hh5-copybtn, .hb-hh5-cta { transition: none; }
}
`;

const defaultNav: HeroDotTorusLink[] = [
  { label: "Product", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
];
const defaultNavCta: HeroDotTorusLink = { label: "Log in", href: "#" };
const defaultPrimary: HeroDotTorusLink = { label: "Start free", href: "#" };
const defaultMore: HeroDotTorusLink = { label: "How it works", href: "#" };

const TAU = Math.PI * 2;
const LAYERS = 18;
const TONES = 3;

function hash(n: number, salt: number) {
  const s = Math.sin(n * 127.1 + salt * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function smooth(x: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return x * x * (3 - 2 * x);
}

function hexRgb(value: string): [number, number, number] | null {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function toColor(value: string, ctx: CanvasRenderingContext2D) {
  const hex = hexRgb(value);
  if (hex) return value;
  ctx.fillStyle = "#ffe6c4";
  ctx.fillStyle = value;
  return String(ctx.fillStyle);
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#1a0a05" />
      <rect x="12" y="1" width="9" height="9" fill="#ffe6c4" stroke="#1a0a05" strokeWidth="2" />
      <rect x="1" y="12" width="9" height="9" fill="#ffe6c4" stroke="#1a0a05" strokeWidth="2" />
      <rect x="12" y="12" width="9" height="9" fill="#1a0a05" />
    </svg>
  );
}

interface Model {
  px: Float32Array;
  py: Float32Array;
  pz: Float32Array;
  nx: Float32Array;
  ny: Float32Array;
  nz: Float32Array;
  seed: Float32Array;
  count: number;
}

function buildModel(mobius: boolean, nuMax: number): Model {
  const R = 1;
  const r = 0.34;
  const xs: number[] = [];
  const ys: number[] = [];
  const zs: number[] = [];
  const ns: number[] = [];
  const point = (u: number, v: number, out: number[]) => {
    if (mobius) {
      const w = 0.52 * v;
      const k = R + w * Math.cos(u / 2);
      out[0] = k * Math.cos(u);
      out[1] = k * Math.sin(u);
      out[2] = w * Math.sin(u / 2);
    } else {
      const k = R + r * Math.cos(v);
      out[0] = k * Math.cos(u);
      out[1] = k * Math.sin(u);
      out[2] = r * Math.sin(v);
    }
  };
  const a = [0, 0, 0];
  const b = [0, 0, 0];
  const c = [0, 0, 0];
  const push = (u: number, v: number) => {
    const e = 0.002;
    point(u, v, a);
    point(u + e, v, b);
    point(u, v + e, c);
    const ux = b[0] - a[0];
    const uy = b[1] - a[1];
    const uz = b[2] - a[2];
    const vx = c[0] - a[0];
    const vy = c[1] - a[1];
    const vz = c[2] - a[2];
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len;
    ny /= len;
    nz /= len;
    if (!mobius) {
      const kk = R + r * Math.cos(v);
      const ox = kk * Math.cos(u);
      const oy = kk * Math.sin(u);
      const outward = nx * (a[0] - R * Math.cos(u)) + ny * (a[1] - R * Math.sin(u)) + nz * a[2];
      void ox;
      void oy;
      if (outward < 0) {
        nx = -nx;
        ny = -ny;
        nz = -nz;
      }
    }
    xs.push(a[0]);
    ys.push(a[1]);
    zs.push(a[2]);
    ns.push(nx, ny, nz);
  };
  if (mobius) {
    const rows = Math.max(8, Math.round(nuMax * 0.2));
    for (let j = 0; j < rows; j++) {
      const v = -1 + ((j + 0.5) / rows) * 2;
      const n = nuMax;
      for (let i = 0; i < n; i++) push(((i + (j % 2) * 0.5) / n) * TAU, v);
    }
  } else {
    const rings = Math.max(10, Math.round(nuMax * 0.3));
    for (let j = 0; j < rings; j++) {
      const v = (j / rings) * TAU;
      const n = Math.max(6, Math.round((nuMax * (R + r * Math.cos(v))) / (R + r)));
      const off = hash(j, 5);
      for (let i = 0; i < n; i++) push(((i + off) / n) * TAU, v);
    }
  }
  const count = xs.length;
  const m: Model = {
    px: Float32Array.from(xs),
    py: Float32Array.from(ys),
    pz: Float32Array.from(zs),
    nx: new Float32Array(count),
    ny: new Float32Array(count),
    nz: new Float32Array(count),
    seed: new Float32Array(count),
    count,
  };
  for (let k = 0; k < count; k++) {
    m.nx[k] = ns[k * 3];
    m.ny[k] = ns[k * 3 + 1];
    m.nz[k] = ns[k * 3 + 2];
    m.seed[k] = hash(k, 9);
  }
  return m;
}

export function HeroDotTorus({
  title = "Every event, one loop.",
  subtitle = "Stream, retry and replay through one continuous pipeline that never stalls.",
  caption = "99.99% uptime · 3 regions",
  command = "npx hyperblur add hero-dot-torus",
  primaryCta = defaultPrimary,
  brand = "Loopwell",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#ffe6c4",
  density = 1,
  speed = 1,
  shape = "torus",
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotTorusProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mult = Math.min(2, Math.max(0.3, Number.isFinite(density) ? density : 1));
    const pace = Math.max(0, Number.isFinite(speed) ? speed : 1);
    const mobius = shape === "mobius";
    const tones = [toColor("#c92f0b", ctx), toColor(accent, ctx), "#ffffff"];

    let model = buildModel(mobius, 1);
    let builtFor = 0;
    let cap = 0;
    let sx = new Float32Array(0);
    let sy = new Float32Array(0);
    let ss = new Float32Array(0);
    let key = new Uint16Array(0);
    let order = new Int32Array(0);
    const counts = new Int32Array(LAYERS * TONES + 1);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let narrow = false;
    let raf = 0;
    let visible = true;
    let start = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const layout = () => {
      const rect = root.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      narrow = w < 720;
      const nuMax = Math.round((narrow ? 130 : 230) * mult);
      if (nuMax !== builtFor) {
        builtFor = nuMax;
        model = buildModel(mobius, nuMax);
        if (model.count > cap) {
          cap = model.count;
          sx = new Float32Array(cap);
          sy = new Float32Array(cap);
          ss = new Float32Array(cap);
          key = new Uint16Array(cap);
          order = new Int32Array(cap);
        }
      }
    };

    const draw = (now: number) => {
      const t = reduce ? 5.4 : ((now - start) / 1000) * pace;
      const grow = reduce ? 1 : Math.min(1, (now - start) / 1500);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const unit = narrow ? (w * 0.5) / 1.4 : Math.min(w * 0.29, h * 0.4);
      const ccx = narrow ? w * 0.5 : w * 0.73;
      const ccy = narrow ? h * 0.3 : h * 0.66;
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const ax = (narrow ? 0.45 : 0.55) + 0.28 * Math.sin(t * 0.31 + 1) + cy * 0.3;
      const ay = 0.75 * Math.sin(t * 0.42) + cx * 0.4;
      const az = -0.3 + 0.35 * Math.sin(t * 0.23);
      const sap = Math.sin(t * 0.5);
      const cap2 = Math.cos(t * 0.5);
      const sax = Math.sin(ax);
      const cax = Math.cos(ax);
      const say = Math.sin(ay);
      const cay = Math.cos(ay);
      const saz = Math.sin(az);
      const caz = Math.cos(az);
      const D = 4.6;
      const pitch = (unit * TAU * 1.34) / builtFor;
      const base = Math.max(3, pitch * 0.5);
      const lx = -0.42;
      const ly = -0.62;
      const lz = 0.66;
      const m = model;
      const n = m.count;
      counts.fill(0);
      for (let k = 0; k < n; k++) {
        let x = m.px[k] * cap2 - m.py[k] * sap;
        let y = m.px[k] * sap + m.py[k] * cap2;
        let z = m.pz[k];
        let nx = m.nx[k] * cap2 - m.ny[k] * sap;
        let ny = m.nx[k] * sap + m.ny[k] * cap2;
        let nz = m.nz[k];
        let t1 = y * cax - z * sax;
        z = y * sax + z * cax;
        y = t1;
        t1 = ny * cax - nz * sax;
        nz = ny * sax + nz * cax;
        ny = t1;
        t1 = x * cay + z * say;
        z = -x * say + z * cay;
        x = t1;
        t1 = nx * cay + nz * say;
        nz = -nx * say + nz * cay;
        nx = t1;
        t1 = x * caz - y * saz;
        y = x * saz + y * caz;
        x = t1;
        t1 = nx * caz - ny * saz;
        ny = nx * saz + ny * caz;
        nx = t1;
        const s = D / (D - z);
        sx[k] = ccx + x * unit * s;
        sy[k] = ccy - y * unit * s;
        const lit = nx * lx + ny * ly + nz * lz;
        const facing = mobius ? Math.abs(nz) : nz;
        let tone = 0;
        if (facing > 0.02) tone = (mobius ? Math.abs(lit) : lit) > 0.62 ? 2 : 1;
        const life = smooth(grow * 1.6 - m.seed[k] * 0.6);
        const edge = mobius ? 1 : 0.35 + 0.65 * Math.min(1, Math.abs(nz) * 1.6);
        ss[k] = base * s * (tone === 0 ? 0.7 : 1) * edge * life;
        let layer = Math.floor(((z + 1.6) / 3.2) * LAYERS);
        if (layer < 0) layer = 0;
        if (layer >= LAYERS) layer = LAYERS - 1;
        const kk = layer * TONES + tone;
        key[k] = kk;
        counts[kk + 1]++;
      }
      for (let b = 1; b < counts.length; b++) counts[b] += counts[b - 1];
      for (let k = 0; k < n; k++) order[counts[key[k]]++] = k;
      let cur = -1;
      for (let i = 0; i < n; i++) {
        const k = order[i];
        const tone = key[k] % TONES;
        if (tone !== cur) {
          cur = tone;
          ctx.fillStyle = tones[tone];
        }
        const sz = Math.round(ss[k]);
        if (sz < 1) continue;
        ctx.fillRect(Math.round(sx[k] - sz / 2), Math.round(sy[k] - sz / 2), sz, sz);
      }
    };

    const frame = (now: number) => {
      raf = 0;
      draw(now);
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const schedule = () => {
      if (reduce || raf) return;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else schedule();
    };

    layout();
    start = performance.now();
    draw(start);
    const ro = new ResizeObserver(() => {
      layout();
      draw(performance.now());
    });
    ro.observe(root);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) schedule();
      else stop();
    });
    io.observe(root);
    if (!reduce) {
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
    }
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
  }, [accent, density, speed, shape]);

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
  const vars = { "--hb-hh5-accent": accent, ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh5 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-torus" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh5-canvas" aria-hidden="true" />
      <header className="hb-hh5-bar">
        <a className="hb-hh5-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        <div className="hb-hh5-right">
          {nav.length ? (
            <nav aria-label="Primary">
              <ul className="hb-hh5-links">
                {nav.map((item) => (
                  <li key={item.label}>
                    <a className="hb-hh5-link" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <button type="button" className="hb-hh5-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh5-link" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div className="hb-hh5-foot">
        <div className="hb-hh5-panel">
        <Heading className="hb-hh5-title">{title}</Heading>
        <div className="hb-hh5-lower">
          {subtitle ? <p className="hb-hh5-sub">{subtitle}</p> : null}
          {caption || command || primaryCta || learnMore ? (
            <div className="hb-hh5-side">
              {caption ? <p className="hb-hh5-caption">{caption}</p> : null}
              {command || primaryCta ? (
                <div className="hb-hh5-row">
                  {primaryCta ? (
                    <a className="hb-hh5-cta" href={primaryCta.href}>
                      {primaryCta.label}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  ) : null}
                  {command ? (
                    <div className="hb-hh5-cmd">
                      <span className="hb-hh5-prompt" aria-hidden="true">$</span>
                      <code className="hb-hh5-code">{command}</code>
                      <button type="button" className="hb-hh5-copybtn" onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
                        {copied ? (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" aria-hidden="true">
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                          </svg>
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" aria-hidden="true">
                            <rect x="8.5" y="8.5" width="11" height="11" />
                            <path d="M15.5 8.5V4.5h-11v11h4" />
                          </svg>
                        )}
                        <span className="hb-hh5-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
              {learnMore ? (
                <a className="hb-hh5-more" href={learnMore.href}>
                  {learnMore.label}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        </div>
      </div>
    </section>
  );
}
