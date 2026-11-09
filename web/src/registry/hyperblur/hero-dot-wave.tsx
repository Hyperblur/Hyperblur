"use client";

import * as React from "react";

export interface HeroDotWaveLink {
  label: string;
  href: string;
}

export interface HeroDotWaveProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotWaveLink | null;
  brand?: string;
  nav?: HeroDotWaveLink[];
  navCta?: HeroDotWaveLink | null;
  learnMore?: HeroDotWaveLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  amplitude?: number;
  ripples?: boolean;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-hh6-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-hh6 {
  --hb-hh6-accent: #ffd6b9;
  --hb-hh6-ink: #1a0b3b;
  --hb-hh6-mono: var(--font-mono, ui-monospace), "Geist Mono", SFMono-Regular, Menlo, Consolas, monospace;
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 760px;
  overflow: hidden;
  container-type: inline-size;
  background: linear-gradient(180deg, #1a0b3b 0%, #2d1058 22%, #6b2a8a 40%, #c43d8f 56%, #ff5fa2 68%, #a8368f 72%, #4a1a6e 88%, #231048 100%);
  color: #fff3ea;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hh6 *, .hb-hh6 *::before, .hb-hh6 *::after { box-sizing: border-box; }
.hb-hh6-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh6-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 100%;
  max-width: 1080px;
  padding: clamp(44px, 6cqw, 84px) clamp(20px, 4cqw, 48px) 0;
  text-align: center;
}
.hb-hh6-caption {
  margin: 0;
  padding: 6px 12px;
  border: 1px solid rgba(255, 214, 185, 0.4);
  border-radius: 8px;
  background: rgba(26, 11, 59, 0.35);
  color: #ffd6b9;
  font-family: var(--hb-hh6-mono);
  font-size: 11.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  animation: hb-hh6-up 0.7s 0.05s ease both;
}
.hb-hh6-title {
  max-width: 24ch;
  margin: 0;
  color: #fff3ea;
  font-size: clamp(36px, 4.8cqw, 78px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.04em;
  text-wrap: balance;
  text-shadow: 0 2px 40px rgba(26, 11, 59, 0.55);
  animation: hb-hh6-up 0.8s 0.12s ease both;
}
.hb-hh6-sub {
  max-width: 52ch;
  margin: 0;
  color: rgba(255, 238, 228, 0.86);
  font-size: clamp(15px, 1.3cqw, 19px);
  line-height: 1.5;
  text-wrap: balance;
  animation: hb-hh6-up 0.8s 0.22s ease both;
}
.hb-hh6-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 6px;
  animation: hb-hh6-up 0.8s 0.32s ease both;
}
.hb-hh6-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 22px;
  border-radius: 8px;
  background: var(--hb-hh6-accent);
  color: var(--hb-hh6-ink);
  font-size: 15px;
  font-weight: 650;
  text-decoration: none;
  transition: transform 0.18s ease, filter 0.18s ease;
}
.hb-hh6-cta:hover { transform: translateY(-2px); filter: brightness(1.06); }
.hb-hh6-cmd {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  padding: 5px 5px 5px 14px;
  border: 1px solid rgba(255, 214, 185, 0.38);
  border-radius: 8px;
  background: rgba(26, 11, 59, 0.5);
  color: #ffe9dc;
  font-family: var(--hb-hh6-mono);
  font-size: 13px;
}
.hb-hh6-prompt { color: #ff8fbb; }
.hb-hh6-code { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-hh6-copybtn {
  appearance: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex: none;
  border: 0;
  border-radius: 6px;
  background: rgba(255, 214, 185, 0.14);
  color: #ffd6b9;
  cursor: pointer;
  transition: background 0.18s ease;
}
.hb-hh6-copybtn:hover { background: rgba(255, 214, 185, 0.26); }
.hb-hh6-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ffd6b9;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}
.hb-hh6-more:hover { text-decoration: underline; text-underline-offset: 4px; }
.hb-hh6-dock {
  position: absolute;
  left: 50%;
  bottom: 22px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: calc(100% - 28px);
  padding: 6px;
  border: 1px solid rgba(255, 214, 185, 0.28);
  border-radius: 8px;
  background: rgba(26, 11, 59, 0.66);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 18px 50px rgba(10, 4, 30, 0.5);
  transform: translateX(-50%);
}
.hb-hh6-brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 10px;
  color: #fff3ea;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-decoration: none;
  border-right: 1px solid rgba(255, 214, 185, 0.22);
  margin-right: 4px;
}
.hb-hh6-links {
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh6-link, .hb-hh6-search {
  appearance: none;
  display: inline-flex;
  align-items: center;
  border: 0;
  border-radius: 6px;
  background: none;
  padding: 9px 13px;
  color: rgba(255, 238, 228, 0.82);
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.16s ease, color 0.16s ease;
}
.hb-hh6-link:hover, .hb-hh6-search:hover { background: rgba(255, 214, 185, 0.14); color: #fff; }
.hb-hh6-navcta {
  margin-left: 4px;
  padding: 9px 14px;
  border-radius: 6px;
  background: var(--hb-hh6-accent);
  color: var(--hb-hh6-ink);
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  white-space: nowrap;
}
.hb-hh6-link:focus-visible, .hb-hh6-search:focus-visible, .hb-hh6-cta:focus-visible, .hb-hh6-copybtn:focus-visible, .hb-hh6-more:focus-visible, .hb-hh6-brand:focus-visible, .hb-hh6-navcta:focus-visible {
  outline: 2px solid #ffd6b9;
  outline-offset: 2px;
}
.hb-hh6-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 640px) {
  .hb-hh6 { min-height: 780px; }
  .hb-hh6-title { font-size: clamp(34px, 10.5cqw, 52px); }
  .hb-hh6-copy { gap: 14px; }
  .hb-hh6-brand { padding-right: 10px; }
  .hb-hh6-link, .hb-hh6-search { padding: 9px 9px; font-size: 13px; }
  .hb-hh6-navcta { display: none; }
  .hb-hh6-cmd { font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh6-caption, .hb-hh6-title, .hb-hh6-sub, .hb-hh6-row { animation: none; }
  .hb-hh6-cta, .hb-hh6-copybtn, .hb-hh6-link, .hb-hh6-search { transition: none; }
}
`;

const defaultNav: HeroDotWaveLink[] = [
  { label: "Product", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
];
const defaultNavCta: HeroDotWaveLink = { label: "Log in", href: "#" };
const defaultPrimary: HeroDotWaveLink = { label: "Start free", href: "#" };
const defaultMore: HeroDotWaveLink = { label: "How it works", href: "#" };

const TAU = Math.PI * 2;
const HORIZON = 0.68;
const ROWS = 52;
const MAX_RIPPLES = 6;

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

function resolveRgb(value: string, ctx: CanvasRenderingContext2D): [number, number, number] {
  const hex = hexRgb(value);
  if (hex) return hex;
  ctx.fillStyle = "#ffd6b9";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const h2 = hexRgb(out);
  if (h2) return h2;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return [255, 214, 185];
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#1a0b3b";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.5 ? "#1a0b3b" : "#ffffff";
}

function waveHeight(x: number, z: number, t: number) {
  return (
    0.12 * Math.sin(1.3 * x + 0.8 * z - 1.2 * t) +
    0.08 * Math.sin(-0.9 * x + 1.7 * z + 0.85 * t + 1.3) +
    0.045 * Math.sin(2.6 * x - 1.2 * z + 1.7 * t + 0.4)
  );
}

function rippleHeight(d: number, age: number, amp: number) {
  const g = d - 1.5 * age;
  return amp * Math.exp(-age * 0.5) * Math.exp(-g * g * 2.2) * Math.cos(g * 5.5) * smooth(age / 0.25);
}

function Mark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4.5" fill="#ffd6b9" />
      <path d="M2 14.5c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" stroke="#ff8fbb" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 19.5c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" stroke="#ffd6b9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

interface Ripple {
  x: number;
  z: number;
  born: number;
}

export function HeroDotWave({
  title = "See the swell before it breaks.",
  subtitle = "Real-time observability that folds noisy telemetry into one calm surface, traced to the line that caused it.",
  caption = "120M events per minute",
  command = "npx shadcn@latest add https://hyperblur.dev/r/hero-dot-wave.json",
  primaryCta = defaultPrimary,
  brand = "Tideline",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#ffd6b9",
  density = 1,
  speed = 1,
  amplitude = 1,
  ripples = true,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotWaveProps) {
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
    const amp = Math.max(0, Number.isFinite(amplitude) ? amplitude : 1);
    const acc = resolveRgb(accent, ctx);
    const far: [number, number, number] = [255, 130, 180];

    const rowFill: string[] = [];
    for (let r = 0; r < ROWS; r++) {
      const q = r / (ROWS - 1);
      const m = Math.pow(q, 0.8);
      const cr = Math.round(far[0] + (acc[0] - far[0]) * m);
      const cg = Math.round(far[1] + (acc[1] - far[1]) * m);
      const cb = Math.round(far[2] + (acc[2] - far[2]) * m);
      rowFill.push(`rgba(${cr}, ${cg}, ${cb}, ${(0.3 + 0.7 * Math.pow(q, 0.6)).toFixed(3)})`);
    }

    const stars = 70;
    const starX = new Float32Array(stars);
    const starY = new Float32Array(stars);
    for (let k = 0; k < stars; k++) {
      starX[k] = hash(k, 21);
      starY[k] = Math.pow(hash(k, 22), 1.3) * 0.5;
    }

    const rip: Ripple[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let horizon = 0;
    let raf = 0;
    let visible = true;
    let start = 0;
    let lastSpawn = 0;

    const layout = () => {
      const rect = root.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      horizon = h * HORIZON;
    };

    const draw = (now: number) => {
      const tt = reduce ? 3.4 : ((now - start) / 1000) * pace;
      const sec = (now - start) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const narrow = w < 640;
      const grow = reduce ? 1 : smooth(sec / 1.6);

      ctx.fillStyle = "#ffd6b9";
      for (let k = 0; k < stars; k++) {
        const tw = reduce ? 0.7 : 0.45 + 0.55 * Math.sin(sec * (0.8 + hash(k, 23)) + k);
        ctx.globalAlpha = 0.55 * tw * grow;
        const s = hash(k, 24) > 0.8 ? 2 : 1.2;
        ctx.fillRect(starX[k] * w, starY[k] * horizon * 1.2 + 4, s, s);
      }
      ctx.globalAlpha = 1;

      const sunR = narrow ? w * 0.2 : Math.min(w * 0.17, h * 0.23);
      const sunY = horizon;
      const sunCount = Math.round((narrow ? 520 : 760) * Math.min(1.5, mult));
      const gold = 2.399963;
      for (let k = 0; k < sunCount; k++) {
        const rr = Math.sqrt((k + 0.5) / sunCount);
        const a = k * gold;
        const px = w * 0.5 + Math.cos(a) * rr * sunR;
        const py = sunY + Math.sin(a) * rr * sunR;
        if (py > horizon + 1) continue;
        const depthK = (horizon - py) / sunR;
        if (depthK < 0.46) {
          const band = sunR * 0.1;
          const fr = ((horizon - py) / band) % 1;
          if (fr < 0.62 - depthK * 1.1) continue;
        }
        const gradient = Math.min(1, Math.max(0, (py - (sunY - sunR)) / sunR));
        const pulse = reduce ? 1 : 1 + 0.12 * Math.sin(sec * 1.4 + k * 0.05);
        const rad = (narrow ? 1.5 : 2.3) * (0.85 + 0.5 * (1 - rr * 0.3)) * pulse * grow;
        const cr = Math.round(255);
        const cg = Math.round(238 - gradient * 96);
        const cb = Math.round(200 - gradient * 56);
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${(1 - rr * 0.1).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, TAU);
        ctx.fill();
      }

      const f = w * 0.9;
      const H = h - horizon;
      const cols = Math.max(24, Math.round((w / (narrow ? 12 : 17)) * mult));
      const span = w * 1.16;
      for (let r = 0; r < ROWS; r++) {
        const q = (r + 1) / ROWS;
        const off = H * Math.pow(q, 2.1);
        const z = f / off;
        const near = off / H;
        ctx.fillStyle = rowFill[r];
        ctx.beginPath();
        const rad = (0.55 + 3.4 * Math.pow(near, 0.9)) * (narrow ? 0.62 : 1) * grow;
        const shift = (r % 2) * 0.5;
        for (let i = 0; i < cols; i++) {
          const sxn = (i + shift) / cols - 0.5;
          const px = w * 0.5 + sxn * span;
          const xw = sxn * span * (z / f);
          const gx = xw * 0.5;
          const gz = z * 0.5;
          let y = waveHeight(gx, gz, tt) * 1.3 * amp;
          for (let k = 0; k < rip.length; k++) {
            const age = (now - rip[k].born) / 1000;
            if (age > 5) continue;
            const d = Math.hypot(gx - rip[k].x * 0.5, gz - rip[k].z * 0.5);
            y += rippleHeight(d, age, 0.3 * amp);
          }
          const py = horizon + off - (y * f) / z;
          if (py < horizon) continue;
          const bump = 1 + Math.max(0, y) * 3.2;
          const rr = rad * bump;
          ctx.moveTo(px + rr, py);
          ctx.arc(px, py, rr, 0, TAU);
        }
        ctx.fill();
      }
      while (rip.length && (now - rip[0].born) / 1000 > 5) rip.shift();
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
    const spawn = (e: PointerEvent, force: boolean) => {
      const now = performance.now();
      if (!force && now - lastSpawn < 650) return;
      const rect = root.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const off = py - horizon;
      if (off < h * 0.02) return;
      lastSpawn = now;
      const z = (w * 0.9) / off;
      rip.push({ x: (px - w * 0.5) * (z / (w * 0.9)), z, born: now });
      if (rip.length > MAX_RIPPLES) rip.shift();
    };
    const onMove = (e: PointerEvent) => spawn(e, false);
    const onDown = (e: PointerEvent) => spawn(e, true);
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
    if (ripples && !reduce) {
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerdown", onDown);
    }
    document.addEventListener("visibilitychange", onVisibility);
    schedule();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [accent, density, speed, amplitude, ripples]);

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
  const vars = { "--hb-hh6-accent": accent, "--hb-hh6-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hh6 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-wave" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh6-canvas" aria-hidden="true" />
      <div className="hb-hh6-copy">
        {caption ? <p className="hb-hh6-caption">{caption}</p> : null}
        <Heading className="hb-hh6-title">{title}</Heading>
        {subtitle ? <p className="hb-hh6-sub">{subtitle}</p> : null}
        {command || primaryCta || learnMore ? (
          <div className="hb-hh6-row">
            {primaryCta ? (
              <a className="hb-hh6-cta" href={primaryCta.href}>
                {primaryCta.label}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </a>
            ) : null}
            {command ? (
              <div className="hb-hh6-cmd">
                <span className="hb-hh6-prompt" aria-hidden="true">$</span>
                <code className="hb-hh6-code">{command}</code>
                <button type="button" className="hb-hh6-copybtn" onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                  <span className="hb-hh6-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                </button>
              </div>
            ) : null}
            {learnMore ? (
              <a className="hb-hh6-more" href={learnMore.href}>
                {learnMore.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      <header className="hb-hh6-dock">
        <a className="hb-hh6-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-hh6-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh6-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <button type="button" className="hb-hh6-search" aria-label="Search" onClick={onSearch}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" />
          </svg>
        </button>
        {navCta ? (
          <a className="hb-hh6-navcta" href={navCta.href}>
            {navCta.label}
          </a>
        ) : null}
      </header>
    </section>
  );
}
