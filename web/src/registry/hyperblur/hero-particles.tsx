"use client";

import * as React from "react";

export interface HeroParticlesAction {
  label: string;
  href: string;
}

export interface HeroParticlesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: HeroParticlesAction | null;
  secondaryCta?: HeroParticlesAction | null;
  command?: string;
  accent?: string;
  density?: number;
  linkDistance?: number;
  seed?: number;
}

const css = `
@keyframes hb-hrc-up {
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hrc-sheen {
  from { background-position: 0% 50%; }
  to { background-position: 200% 50%; }
}
@keyframes hb-hrc-ping {
  0% { transform: scale(1); opacity: .7; }
  80%, 100% { transform: scale(2.6); opacity: 0; }
}
.hb-hrc {
  --hb-hrc-accent: #2f7bff;
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 560px;
  overflow: hidden;
  container-type: inline-size;
  background:
    radial-gradient(90% 60% at 50% -10%, color-mix(in srgb, var(--hb-hrc-accent) 20%, transparent), transparent 65%),
    #07080b;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hrc *, .hb-hrc *::before, .hb-hrc *::after { box-sizing: border-box; }
.hb-hrc-canvas {
  position: absolute;
  inset: 0;
  z-index: -1;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(ellipse 42% 38% at 50% 48%, rgba(0, 0, 0, .28), #000 100%);
  mask-image: radial-gradient(ellipse 42% 38% at 50% 48%, rgba(0, 0, 0, .28), #000 100%);
}
.hb-hrc::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: -1;
  height: 140px;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, #07080b);
}
.hb-hrc-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 96px 24px 80px;
  text-align: center;
}
.hb-hrc-a {
  animation: hb-hrc-up .8s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(var(--hb-hrc-i, 0) * 80ms);
}
.hb-hrc-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  margin: 0 0 24px;
  padding: 5px 14px 5px 12px;
  border: 1px solid color-mix(in srgb, var(--hb-hrc-accent) 35%, rgba(255, 255, 255, .08));
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-hrc-accent) 9%, rgba(10, 10, 14, .7));
  color: #c9d6f2;
  font-size: 13px;
  line-height: 18px;
  backdrop-filter: blur(8px);
}
.hb-hrc-eyebrow span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-hrc-dot {
  position: relative;
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--hb-hrc-accent);
}
.hb-hrc-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--hb-hrc-accent);
  animation: hb-hrc-ping 2s cubic-bezier(0, 0, .2, 1) infinite;
}
.hb-hrc-title {
  max-width: 860px;
  margin: 0;
  color: #f4f5f7;
  font-size: clamp(34px, 7.2cqi, 72px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -.04em;
  text-wrap: balance;
}
.hb-hrc-mark {
  background: linear-gradient(90deg, var(--hb-hrc-accent), color-mix(in srgb, var(--hb-hrc-accent) 35%, #ffffff), #ffffff, color-mix(in srgb, var(--hb-hrc-accent) 35%, #ffffff), var(--hb-hrc-accent));
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: hb-hrc-sheen 7s linear infinite;
}
.hb-hrc-sub {
  max-width: 600px;
  margin: 22px 0 0;
  color: #9a9ca3;
  font-size: clamp(16px, 1.95cqi, 18.5px);
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-hrc-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
.hb-hrc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 12px;
  background: rgba(12, 13, 18, .6);
  color: #ededed;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  transition: transform .2s ease, background-color .2s ease, border-color .2s ease, box-shadow .25s ease, filter .2s ease;
}
.hb-hrc-btn:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .26); transform: translate3d(0, -1px, 0); }
.hb-hrc-btn:active { transform: scale(.98); }
.hb-hrc-btn:focus-visible { outline: 2px solid var(--hb-hrc-accent); outline-offset: 3px; }
.hb-hrc-btn svg { transition: transform .2s ease; }
.hb-hrc-btn:hover svg { transform: translate3d(3px, 0, 0); }
.hb-hrc-btn[data-primary="true"] {
  border-color: color-mix(in srgb, var(--hb-hrc-accent) 60%, #ffffff);
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-hrc-accent) 78%, #ffffff), var(--hb-hrc-accent));
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 12px 32px -10px var(--hb-hrc-accent);
}
.hb-hrc-btn[data-primary="true"]:hover { filter: brightness(1.08); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3), 0 16px 40px -10px var(--hb-hrc-accent); }
.hb-hrc-cmd {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  max-width: 100%;
  margin-top: 28px;
  padding: 6px 6px 6px 16px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 12px;
  background: rgba(14, 15, 20, .75);
  color: #c7c9d1;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13.5px;
  line-height: 1;
  backdrop-filter: blur(8px);
}
.hb-hrc-cmd > span { color: var(--hb-hrc-accent); user-select: none; }
.hb-hrc-cmd code {
  overflow: hidden;
  font: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-hrc-copy {
  display: inline-grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-hrc-copy:hover { background: rgba(255, 255, 255, .07); color: #ededed; }
.hb-hrc-copy:focus-visible { outline: 2px solid var(--hb-hrc-accent); outline-offset: 1px; }
.hb-hrc-copy[data-done="true"] { color: #3ddc97; }
@container (max-width: 520px) {
  .hb-hrc-inner { padding: 72px 20px 60px; }
  .hb-hrc-actions { flex-direction: column; align-self: stretch; }
  .hb-hrc-btn { width: 100%; }
  .hb-hrc-cmd { font-size: 12.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hrc-a, .hb-hrc-mark, .hb-hrc-dot::after { animation: none; }
  .hb-hrc-btn, .hb-hrc-btn svg, .hb-hrc-copy { transition: none; }
  .hb-hrc-btn:hover, .hb-hrc-btn:hover svg { transform: none; }
}
`;

const defaultPrimary: HeroParticlesAction = { label: "Get started", href: "#" };
const defaultSecondary: HeroParticlesAction = { label: "Read the docs", href: "#" };
const MAX_POINTS = 260;

function rnd(seed: number, i: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) ^ Math.imul((seed | 0) + 7, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

function delay(index: number) {
  return { "--hb-hrc-i": index } as React.CSSProperties;
}

export function HeroParticles({
  eyebrow = "Graph engine v4 is now generally available",
  title = "Connect every signal in your stack",
  highlight = "every signal",
  subtitle = "Lattice maps services, queues and databases into one live dependency graph and flags what breaks before you deploy.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  command = "npx shadcn@latest add https://hyperblur.dev/r/hero-particles.json",
  accent = "#2f7bff",
  density = 1.5,
  linkDistance = 120,
  seed = 7,
  className = "",
  style,
  ...rest
}: HeroParticlesProps) {
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
    const TAU = Math.PI * 2;
    const link = Math.max(20, linkDistance);
    const link2 = link * link;
    const reach = link * 1.7;
    const reach2 = reach * reach;
    const x = new Float32Array(MAX_POINTS);
    const y = new Float32Array(MAX_POINTS);
    const vx = new Float32Array(MAX_POINTS);
    const vy = new Float32Array(MAX_POINTS);
    const bx = new Float32Array(MAX_POINTS);
    const by = new Float32Array(MAX_POINTS);
    const rad = new Float32Array(MAX_POINTS);
    const base = new Float32Array(MAX_POINTS);
    const phase = new Float32Array(MAX_POINTS);
    const tw = new Float32Array(MAX_POINTS);

    for (let i = 0; i < MAX_POINTS; i++) {
      const a = rnd(seed, i * 9 + 1) * TAU;
      const v = 5 + rnd(seed, i * 9 + 2) * 11;
      bx[i] = Math.cos(a) * v;
      by[i] = Math.sin(a) * v;
      vx[i] = bx[i];
      vy[i] = by[i];
      rad[i] = 0.7 + rnd(seed, i * 9 + 5) * 1.3;
      base[i] = 0.35 + rnd(seed, i * 9 + 6) * 0.55;
      phase[i] = rnd(seed, i * 9 + 7) * TAU;
      tw[i] = 0.6 + rnd(seed, i * 9 + 8) * 1.6;
    }

    let w = 0;
    let h = 0;
    let n = 0;
    let placed = false;
    let pointer = false;
    let mx = 0;
    let my = 0;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = 0;

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = accent;
      for (let i = 0; i < n; i++) {
        const xi = x[i];
        const yi = y[i];
        for (let j = i + 1; j < n; j++) {
          const dx = x[j] - xi;
          const dy = y[j] - yi;
          const d2 = dx * dx + dy * dy;
          if (d2 >= link2) continue;
          const k = 1 - Math.sqrt(d2) / link;
          ctx.globalAlpha = k * k * 0.55;
          ctx.beginPath();
          ctx.moveTo(xi, yi);
          ctx.lineTo(x[j], y[j]);
          ctx.stroke();
        }
      }
      if (pointer) {
        for (let i = 0; i < n; i++) {
          const dx = mx - x[i];
          const dy = my - y[i];
          const d2 = dx * dx + dy * dy;
          if (d2 >= reach2) continue;
          const k = 1 - Math.sqrt(d2) / reach;
          ctx.globalAlpha = k * k * 0.8;
          ctx.beginPath();
          ctx.moveTo(x[i], y[i]);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < n; i++) {
        const glow = reduce ? 1 : 0.75 + 0.25 * Math.sin(time * tw[i] + phase[i]);
        ctx.globalAlpha = base[i] * glow;
        ctx.beginPath();
        ctx.arc(x[i], y[i], rad[i], 0, TAU);
        ctx.fill();
      }
      if (pointer) {
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(mx, my, 2.4, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function step(dt: number) {
      const relax = Math.min(1, dt * 2.2);
      const m = 16;
      for (let i = 0; i < n; i++) {
        let tx = bx[i];
        let ty = by[i];
        if (pointer) {
          const dx = mx - x[i];
          const dy = my - y[i];
          const d2 = dx * dx + dy * dy;
          if (d2 < reach2 && d2 > 64) {
            const d = Math.sqrt(d2);
            const f = (1 - d / reach) * 46;
            tx += (dx / d) * f;
            ty += (dy / d) * f;
          }
        }
        vx[i] += (tx - vx[i]) * relax;
        vy[i] += (ty - vy[i]) * relax;
        x[i] += vx[i] * dt;
        y[i] += vy[i] * dt;
        if (x[i] < -m) x[i] = w + m;
        else if (x[i] > w + m) x[i] = -m;
        if (y[i] < -m) y[i] = h + m;
        else if (y[i] > h + m) y[i] = -m;
      }
    }

    function frame(now: number) {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      time += dt;
      step(dt);
      draw();
      if (visible) raf = requestAnimationFrame(frame);
    }

    function start() {
      if (reduce || raf || !visible) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    }

    function resize() {
      if (!canvas || !ctx) return;
      const nw = canvas.clientWidth;
      const nh = canvas.clientHeight;
      if (!nw || !nh) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(nw * dpr);
      canvas.height = Math.round(nh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!placed) {
        for (let i = 0; i < MAX_POINTS; i++) {
          x[i] = rnd(seed, i * 9 + 3) * nw;
          y[i] = rnd(seed, i * 9 + 4) * nh;
        }
        placed = true;
      } else if (w && h) {
        const sx = nw / w;
        const sy = nh / h;
        for (let i = 0; i < MAX_POINTS; i++) {
          x[i] *= sx;
          y[i] *= sy;
        }
      }
      w = nw;
      h = nh;
      n = Math.max(16, Math.min(MAX_POINTS, Math.round(((w * h) / 10000) * Math.max(0.1, density))));
      draw();
    }

    function local(e: PointerEvent) {
      if (!root) return { x: 0, y: 0 };
      const r = root.getBoundingClientRect();
      const sx = r.width ? root.offsetWidth / r.width : 1;
      const sy = r.height ? root.offsetHeight / r.height : 1;
      return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
    }

    function onMove(e: PointerEvent) {
      const p = local(e);
      mx = p.x;
      my = p.y;
      pointer = true;
      if (reduce) draw();
    }

    function onLeave() {
      pointer = false;
      if (reduce) draw();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) start();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(root);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
    };
  }, [accent, density, linkDistance, seed]);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function copy() {
    if (!command) return;
    navigator.clipboard?.writeText(command).catch(() => undefined);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1600);
  }

  const vars = { "--hb-hrc-accent": accent, ...style } as React.CSSProperties;
  const at = highlight ? title.indexOf(highlight) : -1;

  return (
    <section ref={rootRef} className={`hb-hrc ${className}`} style={vars} {...rest}>
      <style href="hb-hero-particles" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hrc-canvas" aria-hidden="true" />
      <div className="hb-hrc-inner">
        {eyebrow ? (
          <p className="hb-hrc-eyebrow hb-hrc-a" style={delay(0)}>
            <span className="hb-hrc-dot" aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>
        ) : null}
        <h1 className="hb-hrc-title hb-hrc-a" style={delay(1)}>
          {at >= 0 ? (
            <>
              {title.slice(0, at)}
              <span className="hb-hrc-mark">{highlight}</span>
              {title.slice(at + highlight.length)}
            </>
          ) : (
            title
          )}
        </h1>
        {subtitle ? (
          <p className="hb-hrc-sub hb-hrc-a" style={delay(2)}>
            {subtitle}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-hrc-actions hb-hrc-a" style={delay(3)}>
            {primaryCta ? (
              <a className="hb-hrc-btn" data-primary="true" href={primaryCta.href}>
                {primaryCta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-hrc-btn" href={secondaryCta.href}>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
        {command ? (
          <div className="hb-hrc-cmd hb-hrc-a" style={delay(4)}>
            <span aria-hidden="true">$</span>
            <code>{command}</code>
            <button type="button" className="hb-hrc-copy" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
              {copied ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="11" height="11" rx="2.5" />
                  <path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9" />
                </svg>
              )}
            </button>
            <span className="hb-hrc-sr" role="status" aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              {copied ? "Command copied" : ""}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
