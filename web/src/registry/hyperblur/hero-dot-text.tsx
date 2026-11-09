"use client";

import * as React from "react";

export interface HeroDotTextLink {
  label: string;
  href: string;
}

export interface HeroDotTextProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotTextLink | null;
  brand?: string;
  nav?: HeroDotTextLink[];
  navCta?: HeroDotTextLink | null;
  learnMore?: HeroDotTextLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  word?: string;
  depth?: number;
  swing?: number;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh7-up {
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-hh7 {
  --hb-hh7-accent: #0d0d0d;
  --hb-hh7-ink: #f4f1ea;
  --hb-hh7-mono: var(--font-mono, ui-monospace), "Geist Mono", SFMono-Regular, Menlo, Consolas, monospace;
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 680px;
  overflow: hidden;
  container-type: inline-size;
  background: #f4f1ea;
  color: #0d0d0d;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hh7 *, .hb-hh7 *::before, .hb-hh7 *::after { box-sizing: border-box; }
.hb-hh7-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh7-bar {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 0 clamp(16px, 2.5cqw, 36px);
  padding: 18px 0 14px;
  border-bottom: 1px solid rgba(13, 13, 13, 0.16);
  font-family: var(--hb-hh7-mono);
  font-size: 11.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hb-hh7-brand {
  color: #0d0d0d;
  font-weight: 700;
  text-decoration: none;
}
.hb-hh7-mid, .hb-hh7-end {
  display: flex;
  align-items: center;
  gap: clamp(14px, 2.4cqw, 32px);
}
.hb-hh7-links {
  display: flex;
  align-items: center;
  gap: clamp(14px, 2.4cqw, 32px);
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh7-link, .hb-hh7-search {
  appearance: none;
  border: 0;
  background: none;
  padding: 2px 0;
  color: rgba(13, 13, 13, 0.62);
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.16s ease;
}
.hb-hh7-link:hover, .hb-hh7-search:hover { color: #0d0d0d; }
.hb-hh7-link:focus-visible, .hb-hh7-search:focus-visible, .hb-hh7-brand:focus-visible, .hb-hh7-cta:focus-visible, .hb-hh7-copybtn:focus-visible, .hb-hh7-more:focus-visible {
  outline: 2px solid #0d0d0d;
  outline-offset: 3px;
  border-radius: 4px;
}
.hb-hh7-stage {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  min-height: 300px;
  margin: 0 clamp(8px, 1.4cqw, 20px);
}
.hb-hh7-foot {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px 48px;
  padding: 8px clamp(16px, 2.5cqw, 36px) clamp(24px, 3cqw, 40px);
}
.hb-hh7-copy {
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: hb-hh7-up 0.8s 1.2s ease both;
}
.hb-hh7-title {
  max-width: 22ch;
  margin: 0;
  color: #0d0d0d;
  font-size: clamp(22px, 2.4cqw, 34px);
  font-weight: 650;
  line-height: 1.08;
  letter-spacing: -0.035em;
  text-wrap: balance;
}
.hb-hh7-sub {
  max-width: 46ch;
  margin: 0;
  color: rgba(13, 13, 13, 0.66);
  font-size: clamp(14px, 1.1cqw, 16px);
  line-height: 1.5;
}
.hb-hh7-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  animation: hb-hh7-up 0.8s 1.35s ease both;
}
.hb-hh7-caption {
  margin: 0;
  color: rgba(13, 13, 13, 0.55);
  font-family: var(--hb-hh7-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hb-hh7-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.hb-hh7-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 20px;
  border-radius: 8px;
  background: var(--hb-hh7-accent);
  color: var(--hb-hh7-ink);
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  transition: transform 0.18s ease, opacity 0.18s ease;
}
.hb-hh7-cta:hover { transform: translateY(-2px); opacity: 0.9; }
.hb-hh7-cmd {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  padding: 5px 5px 5px 13px;
  border: 1px solid rgba(13, 13, 13, 0.3);
  border-radius: 8px;
  color: #0d0d0d;
  font-family: var(--hb-hh7-mono);
  font-size: 12.5px;
}
.hb-hh7-prompt { opacity: 0.5; }
.hb-hh7-code { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-hh7-copybtn {
  appearance: none;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  flex: none;
  border: 0;
  border-radius: 6px;
  background: rgba(13, 13, 13, 0.08);
  color: #0d0d0d;
  cursor: pointer;
  transition: background 0.16s ease;
}
.hb-hh7-copybtn:hover { background: rgba(13, 13, 13, 0.16); }
.hb-hh7-more {
  color: #0d0d0d;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.hb-hh7-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 640px) {
  .hb-hh7 { min-height: 720px; }
  .hb-hh7-bar { font-size: 10.5px; letter-spacing: 0.05em; gap: 10px; }
  .hb-hh7-end .hb-hh7-link { display: none; }
  .hb-hh7-links { gap: 12px; }
  .hb-hh7-stage { min-height: 230px; }
  .hb-hh7-foot { flex-direction: column; align-items: flex-start; }
  .hb-hh7-cmd { font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh7-copy, .hb-hh7-side { animation: none; }
  .hb-hh7-link, .hb-hh7-search, .hb-hh7-copybtn, .hb-hh7-cta { transition: none; }
}
`;

const defaultNav: HeroDotTextLink[] = [
  { label: "Fonts", href: "#" },
  { label: "Showcase", href: "#" },
  { label: "Pricing", href: "#" },
];
const defaultNavCta: HeroDotTextLink = { label: "Log in", href: "#" };
const defaultPrimary: HeroDotTextLink = { label: "Get the kit", href: "#" };
const defaultMore: HeroDotTextLink = { label: "How it works", href: "#" };

const TAU = Math.PI * 2;
const FONT = '"Inter Tight", "Helvetica Neue", Helvetica, Arial, sans-serif';

function hash(n: number, salt: number) {
  const s = Math.sin(n * 127.1 + salt * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function hexRgb(value: string): [number, number, number] | null {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function toRgb(value: string, ctx: CanvasRenderingContext2D): [number, number, number] {
  const hex = hexRgb(value);
  if (hex) return hex;
  ctx.fillStyle = "#0d0d0d";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const h2 = hexRgb(out);
  if (h2) return h2;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return [13, 13, 13];
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#f4f1ea";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#0d0d0d" : "#f4f1ea";
}

function ease(x: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return 1 - Math.pow(1 - x, 3);
}

interface Cloud {
  tx: Float32Array;
  ty: Float32Array;
  bx: Float32Array;
  by: Float32Array;
  delay: Float32Array;
  phase: Float32Array;
  ox: Float32Array;
  oy: Float32Array;
  tone: Uint8Array;
  count: number;
  step: number;
  fontSize: number;
}

export function HeroDotText({
  title = "Type that floats off the page.",
  subtitle = "Turn any word into a living field of dots. One canvas, no dependencies.",
  caption = "Any word · MIT licensed",
  command = "npx shadcn@latest add https://hyperblur.dev/r/hero-dot-text.json",
  primaryCta = defaultPrimary,
  brand = "Glyphwork",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#0d0d0d",
  density = 1,
  speed = 1,
  word = "HYPERBLUR",
  depth = 0.18,
  swing = 32,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotTextProps) {
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
    const mult = Math.min(2, Math.max(0.4, Number.isFinite(density) ? density : 1));
    const pace = Math.max(0, Number.isFinite(speed) ? speed : 1);
    const push = Math.min(1, Math.max(0.02, Number.isFinite(depth) ? depth : 0.18));
    const sway = Math.min(80, Math.max(0, Number.isFinite(swing) ? swing : 32)) / 32;
    const text = (typeof word === "string" && word.trim() ? word.trim() : "WORD").toUpperCase();
    const rgb = toRgb(accent, ctx);
    const solid = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    const soft = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.42)`;

    let cloud: Cloud | null = null;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let start = 0;
    let mx = 0;
    let my = 0;
    let active = false;
    let rad0 = 0;

    const build = () => {
      const rr = root.getBoundingClientRect();
      const sr = stage.getBoundingClientRect();
      w = Math.max(1, rr.width);
      h = Math.max(1, rr.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const sx = sr.left - rr.left;
      const sy = sr.top - rr.top;
      const sw = Math.max(40, sr.width);
      const sh = Math.max(40, sr.height);
      const narrow = w < 640;
      let lines = [text];
      if (narrow) {
        const parts = text.split(/\s+/);
        if (parts.length > 1) {
          const mid = Math.ceil(parts.length / 2);
          lines = [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
        } else if (text.length > 5) {
          const mid = Math.ceil(text.length / 2);
          lines = [text.slice(0, mid), text.slice(mid)];
        }
      }
      const probe = document.createElement("canvas");
      probe.width = Math.round(sw);
      probe.height = Math.round(sh);
      const pc = probe.getContext("2d", { willReadFrequently: true });
      if (!pc) return;
      pc.font = `900 100px ${FONT}`;
      let maxW = 1;
      for (const ln of lines) maxW = Math.max(maxW, pc.measureText(ln).width);
      const lh = 0.84;
      const capH = 0.72;
      const byWidth = (sw * 0.985 * 100) / maxW;
      const fs = Math.min(byWidth, (sh * 0.94) / ((lines.length - 1) * lh + capH));
      const vs = Math.max(1, Math.min(lines.length > 1 ? 1.5 : 2, (sh * 0.9) / (((lines.length - 1) * lh + capH) * fs)));
      pc.font = `900 ${fs}px ${FONT}`;
      pc.textAlign = "center";
      pc.textBaseline = "alphabetic";
      pc.fillStyle = "#000";
      pc.setTransform(1, 0, 0, vs, 0, 0);
      const total = ((lines.length - 1) * lh * fs + capH * fs) * vs;
      const top = ((sh - total) / 2 + capH * fs * vs) / vs;
      lines.forEach((ln, i) => pc.fillText(ln, sw / 2, top + i * lh * fs));
      const img = pc.getImageData(0, 0, probe.width, probe.height).data;
      let step = Math.max(narrow ? 4.4 : 6, (fs * 0.036) / mult);
      let xs: number[] = [];
      let ys: number[] = [];
      for (let pass = 0; pass < 3; pass++) {
        xs = [];
        ys = [];
        const rowH = step * 0.866;
        for (let j = 0, y = step * 0.5; y < sh; j++, y += rowH) {
          const off = (j % 2) * step * 0.5;
          for (let x = step * 0.5 + off; x < sw; x += step) {
            const px = Math.min(probe.width - 1, Math.round(x));
            const py = Math.min(probe.height - 1, Math.round(y));
            if (img[(py * probe.width + px) * 4 + 3] > 140) {
              xs.push(sx + x);
              ys.push(sy + y);
            }
          }
        }
        if (xs.length <= 6500) break;
        step *= 1.25;
      }
      const n = xs.length;
      const c: Cloud = {
        tx: Float32Array.from(xs),
        ty: Float32Array.from(ys),
        bx: new Float32Array(n),
        by: new Float32Array(n),
        delay: new Float32Array(n),
        phase: new Float32Array(n),
        ox: new Float32Array(n),
        oy: new Float32Array(n),
        tone: new Uint8Array(n),
        count: n,
        step,
        fontSize: fs,
      };
      const cxm = sx + sw / 2;
      const cym = sy + sh / 2;
      const reach = Math.max(w, h);
      for (let k = 0; k < n; k++) {
        const a = hash(k, 31) * TAU;
        const d = (0.45 + hash(k, 32) * 0.7) * reach * 0.6;
        c.bx[k] = cxm + Math.cos(a) * d;
        c.by[k] = cym + Math.sin(a) * d * 0.7;
        c.delay[k] = ((c.tx[k] - sx) / sw) * 0.7 + hash(k, 33) * 0.45;
        c.phase[k] = hash(k, 34) * TAU;
        c.tone[k] = hash(k, 35) > 0.82 ? 1 : 0;
      }
      cloud = c;
      rad0 = step * 0.37;
    };

    const draw = (now: number) => {
      const c = cloud;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (!c) return;
      const sec = reduce ? 99 : ((now - start) / 1000) * pace;
      const real = (now - start) / 1000;
      const live = !reduce;
      const R = c.fontSize * 0.55;
      const amp = c.step * 0.4 * sway;
      for (let tone = 0; tone < 2; tone++) {
        ctx.fillStyle = tone === 0 ? solid : soft;
        ctx.beginPath();
        for (let k = 0; k < c.count; k++) {
          if (c.tone[k] !== tone) continue;
          const p = reduce ? 1 : ease((real * Math.max(0.35, pace) - c.delay[k]) / 1.5);
          if (p <= 0) continue;
          let x = c.bx[k] + (c.tx[k] - c.bx[k]) * p;
          let y = c.by[k] + (c.ty[k] - c.by[k]) * p;
          let rad = rad0 * (0.35 + 0.65 * p);
          if (live && p >= 1) {
            const wob = Math.sin(c.tx[k] * 0.0065 + sec * 0.85 + c.phase[k] * 0.15);
            x += Math.cos(sec * 0.6 + c.phase[k]) * amp * 0.45;
            y += wob * amp + Math.sin(sec * 0.7 + c.phase[k]) * amp * 0.3;
            const sweep = Math.sin(c.tx[k] * 0.0075 - sec * 1.5);
            if (sweep > 0.85) rad *= 1 + (sweep - 0.85) * 2.4;
            let tox = 0;
            let toy = 0;
            if (active) {
              const dx = c.tx[k] - mx;
              const dy = c.ty[k] - my;
              const d = Math.hypot(dx, dy);
              if (d < R && d > 0.001) {
                const f = (1 - d / R) * (1 - d / R);
                tox = (dx / d) * f * R * push * 1.6;
                toy = (dy / d) * f * R * push * 1.6;
                rad *= 1 + f * 0.5;
              }
            }
            c.ox[k] += (tox - c.ox[k]) * 0.12;
            c.oy[k] += (toy - c.oy[k]) * 0.12;
            x += c.ox[k];
            y += c.oy[k];
          }
          ctx.moveTo(x + rad, y);
          ctx.arc(x, y, rad, 0, TAU);
        }
        ctx.fill();
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
      const r = root.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      active = true;
    };
    const onLeave = () => {
      active = false;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else schedule();
    };

    let ready = false;
    const rebuild = () => {
      build();
      draw(performance.now());
    };
    start = performance.now();
    rebuild();
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!ready) rebuild();
      });
    }
    const ro = new ResizeObserver(() => rebuild());
    ro.observe(root);
    ro.observe(stage);
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
      ready = true;
      stop();
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [accent, density, speed, word, depth, swing]);

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
  const vars = { "--hb-hh7-accent": accent, "--hb-hh7-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh7 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-text" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh7-canvas" aria-hidden="true" />
      <header className="hb-hh7-bar">
        <a className="hb-hh7-brand" href="#">
          {brand}
        </a>
        {nav.length ? (
          <nav className="hb-hh7-mid" aria-label="Primary">
            <ul className="hb-hh7-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh7-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <div className="hb-hh7-end">
          <button type="button" className="hb-hh7-search" onClick={onSearch}>
            Search
          </button>
          {navCta ? (
            <a className="hb-hh7-link" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-hh7-stage" aria-hidden="true" />
      <div className="hb-hh7-foot">
        <div className="hb-hh7-copy">
          <Heading className="hb-hh7-title">{title}</Heading>
          {subtitle ? <p className="hb-hh7-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta || learnMore ? (
          <div className="hb-hh7-side">
            {caption ? <p className="hb-hh7-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh7-row">
                {primaryCta ? (
                  <a className="hb-hh7-cta" href={primaryCta.href}>
                    {primaryCta.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                ) : null}
                {command ? (
                  <div className="hb-hh7-cmd">
                    <span className="hb-hh7-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh7-code">{command}</code>
                    <button type="button" className="hb-hh7-copybtn" onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
                      {copied ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
                          <path d="M15.5 8.5V6.7a2.2 2.2 0 0 0-2.2-2.2H6.7a2.2 2.2 0 0 0-2.2 2.2v6.6a2.2 2.2 0 0 0 2.2 2.2h1.8" />
                        </svg>
                      )}
                      <span className="hb-hh7-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
            {learnMore ? (
              <a className="hb-hh7-more" href={learnMore.href}>
                {learnMore.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
