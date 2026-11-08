"use client";

import * as React from "react";

export interface CtaMagneticOrbStat {
  value: string;
  label: string;
}

export interface CtaMagneticOrbProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  ringText?: string;
  stats?: CtaMagneticOrbStat[];
  strength?: number;
  accent?: string;
  accent2?: string;
}

const css = `
.hb-wc5 {
  --hb-wc5-a: #7c3aed;
  --hb-wc5-b: #fb7185;
  --hb-wc5-mx: 70%;
  --hb-wc5-my: 50%;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: #08070b;
  color: #fff;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc5 *, .hb-wc5 *::before, .hb-wc5 *::after { box-sizing: border-box; }
.hb-wc5-bg { position: absolute; inset: 0; z-index: -2; overflow: hidden; }
.hb-wc5-pool {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(38% 44% at var(--hb-wc5-mx) var(--hb-wc5-my), color-mix(in srgb, var(--hb-wc5-b) 70%, transparent), transparent 70%),
    radial-gradient(50% 60% at 18% 30%, color-mix(in srgb, var(--hb-wc5-a) 85%, transparent), transparent 70%),
    radial-gradient(45% 55% at 60% 110%, color-mix(in srgb, var(--hb-wc5-a) 60%, #0ea5e9), transparent 70%),
    linear-gradient(120deg, #120a24, #08070b 70%);
  transition: background-position .6s ease;
  filter: saturate(1.15);
}
.hb-wc5-blob { position: absolute; width: 46cqi; aspect-ratio: 1; border-radius: 50%; filter: blur(60px); opacity: .55; mix-blend-mode: screen; }
.hb-wc5-blob:nth-child(2) { left: 8%; top: -18%; background: var(--hb-wc5-a); animation: hb-wc5-drift 18s cubic-bezier(.45, 0, .55, 1) infinite alternate; }
.hb-wc5-blob:nth-child(3) { right: -6%; bottom: -30%; background: var(--hb-wc5-b); animation: hb-wc5-drift 22s cubic-bezier(.45, 0, .55, 1) infinite alternate-reverse; }
.hb-wc5-grain {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: .22;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  pointer-events: none;
}
.hb-wc5-lines { position: absolute; inset: 0; z-index: -1; background-image: linear-gradient(90deg, rgba(255, 255, 255, .06) 1px, transparent 1px); background-size: calc(100% / 6) 100%; mask-image: linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent); pointer-events: none; }
.hb-wc5-inner { display: grid; gap: 40px; align-items: center; max-width: 1200px; margin: 0 auto; padding: 80px 22px; }
.hb-wc5-eyebrow { display: inline-flex; align-items: center; gap: 8px; width: max-content; margin: 0 0 20px; padding: 6px 12px; border: 1px solid rgba(255, 255, 255, .2); border-radius: 999px; background: rgba(255, 255, 255, .08); backdrop-filter: blur(8px); font-size: 13px; font-weight: 550; }
.hb-wc5-eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: #fff; box-shadow: 0 0 10px #fff; font-style: normal; }
.hb-wc5-title { margin: 0; max-width: 12ch; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(42px, 8.2cqi, 96px); font-weight: 600; line-height: .96; letter-spacing: -.045em; text-wrap: balance; }
.hb-wc5-sub { margin: 22px 0 0; max-width: 470px; color: rgba(255, 255, 255, .72); font-size: 17px; line-height: 1.55; }
.hb-wc5-stats { display: flex; flex-wrap: wrap; gap: 14px 36px; margin: 34px 0 0; padding: 0; list-style: none; }
.hb-wc5-stats li { display: grid; gap: 2px; padding-left: 14px; border-left: 1px solid rgba(255, 255, 255, .25); }
.hb-wc5-stats b { font-size: 24px; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-wc5-stats span { color: rgba(255, 255, 255, .6); font-size: 13px; }
.hb-wc5-stage { position: relative; display: grid; place-items: center; min-height: 260px; }
.hb-wc5-halo { position: absolute; width: 300px; aspect-ratio: 1; border-radius: 50%; border: 1px solid rgba(255, 255, 255, .14); }
.hb-wc5-halo::after { content: ""; position: absolute; inset: 34px; border-radius: 50%; border: 1px dashed rgba(255, 255, 255, .14); animation: hb-wc5-spin 40s linear infinite reverse; }
.hb-wc5-magnet { position: relative; transform: translate3d(var(--hb-wc5-x, 0px), var(--hb-wc5-y, 0px), 0); transition: transform .6s cubic-bezier(.2, .9, .25, 1.25); }
.hb-wc5-orb {
  position: relative;
  display: grid;
  place-items: center;
  width: 200px;
  aspect-ratio: 1;
  border-radius: 50%;
  color: #0b0614;
  text-decoration: none;
  outline: none;
}
.hb-wc5-ring { position: absolute; inset: 0; width: 100%; height: 100%; animation: hb-wc5-spin 22s linear infinite; }
.hb-wc5-orb:hover .hb-wc5-ring, .hb-wc5-orb:focus-visible .hb-wc5-ring { animation-duration: 7s; }
.hb-wc5-ring text { fill: #fff; font-size: 10.5px; font-weight: 600; letter-spacing: .28em; text-transform: uppercase; }
.hb-wc5-core {
  position: relative;
  display: grid;
  place-items: center;
  width: 118px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 28%, #fff, #f3eefe 45%, #d9cdfb);
  box-shadow: 0 0 0 10px rgba(255, 255, 255, .1), 0 24px 60px -10px color-mix(in srgb, var(--hb-wc5-b) 80%, transparent), inset 0 -8px 18px rgba(124, 58, 237, .25);
  transform: translate3d(calc(var(--hb-wc5-x, 0px) * .35), calc(var(--hb-wc5-y, 0px) * .35), 0) scale(var(--hb-wc5-s, 1));
  transition: transform .6s cubic-bezier(.2, .9, .25, 1.25), box-shadow .3s ease;
}
.hb-wc5-orb:hover .hb-wc5-core { --hb-wc5-s: 1.06; box-shadow: 0 0 0 16px rgba(255, 255, 255, .12), 0 30px 70px -10px color-mix(in srgb, var(--hb-wc5-b) 90%, transparent), inset 0 -8px 18px rgba(124, 58, 237, .25); }
.hb-wc5-orb:active .hb-wc5-core { --hb-wc5-s: .95; }
.hb-wc5-orb:focus-visible .hb-wc5-core { outline: 2px solid #fff; outline-offset: 20px; }
.hb-wc5-core svg { width: 30px; height: 30px; transition: transform .45s cubic-bezier(.3, 1.6, .5, 1); }
.hb-wc5-orb:hover .hb-wc5-core svg { transform: rotate(-45deg); }
.hb-wc5-label { position: absolute; top: calc(100% + 18px); left: 50%; transform: translateX(-50%); color: #fff; font-size: 15px; font-weight: 600; white-space: nowrap; }
@keyframes hb-wc5-spin { to { transform: rotate(360deg); } }
@keyframes hb-wc5-drift { from { transform: translate(0, 0) scale(1); } to { transform: translate(12%, 16%) scale(1.15); } }
@container (min-width: 760px) {
  .hb-wc5-inner { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 48px; padding: 120px 48px; }
  .hb-wc5-stage { min-height: 380px; }
  .hb-wc5-halo { width: 360px; }
  .hb-wc5-orb { width: 236px; }
  .hb-wc5-core { width: 138px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc5 *, .hb-wc5 *::before, .hb-wc5 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultStats: CtaMagneticOrbStat[] = [
  { value: "11 min", label: "average setup" },
  { value: "38%", label: "fewer status meetings" },
  { value: "4.9/5", label: "from 2,300 reviews" },
];

export function CtaMagneticOrb({
  eyebrow = "Free for teams up to 10",
  title = "Your roadmap, shipped before Friday.",
  subtitle = "Plan sprints, track releases and keep every stakeholder in the loop from one quiet workspace.",
  cta = { label: "Start building", href: "#" },
  ringText = "Start free trial · 14 days · no card needed · ",
  stats = defaultStats,
  strength = 0.4,
  accent = "#7c3aed",
  accent2 = "#fb7185",
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: CtaMagneticOrbProps) {
  const root = React.useRef<HTMLElement>(null);
  const magnet = React.useRef<HTMLDivElement>(null);
  const id = React.useId().replace(/:/g, "");

  const move = (e: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(e);
    const el = root.current;
    const m = magnet.current;
    if (!el || !m || e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hb-wc5-mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--hb-wc5-my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    const stage = m.parentElement;
    if (!stage) return;
    const s = stage.getBoundingClientRect();
    const dx = e.clientX - (s.left + s.width / 2);
    const dy = e.clientY - (s.top + s.height / 2);
    const near = Math.hypot(dx, dy) < Math.max(220, s.width * 0.7);
    const k = near ? Math.max(0, Math.min(1, strength)) : 0;
    const cap = 70;
    m.style.setProperty("--hb-wc5-x", `${Math.max(-cap, Math.min(cap, dx * k)).toFixed(1)}px`);
    m.style.setProperty("--hb-wc5-y", `${Math.max(-cap, Math.min(cap, dy * k)).toFixed(1)}px`);
  };

  const leave = (e: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(e);
    magnet.current?.style.setProperty("--hb-wc5-x", "0px");
    magnet.current?.style.setProperty("--hb-wc5-y", "0px");
  };

  const vars = { "--hb-wc5-a": accent, "--hb-wc5-b": accent2, ...style } as React.CSSProperties;

  return (
    <section ref={root} className={`hb-wc5 ${className}`} style={vars} onPointerMove={move} onPointerLeave={leave} {...rest}>
      <style href="hb-cta-magnetic-orb" precedence="default">{css}</style>
      <div className="hb-wc5-bg" aria-hidden="true">
        <div className="hb-wc5-pool" />
        <div className="hb-wc5-blob" />
        <div className="hb-wc5-blob" />
      </div>
      <div className="hb-wc5-lines" aria-hidden="true" />
      <div className="hb-wc5-grain" aria-hidden="true" />
      <div className="hb-wc5-inner">
        <div>
          {eyebrow ? (
            <p className="hb-wc5-eyebrow">
              <i aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h2 className="hb-wc5-title">{title}</h2>
          {subtitle ? <p className="hb-wc5-sub">{subtitle}</p> : null}
          {stats.length ? (
            <ul className="hb-wc5-stats">
              {stats.map((s) => (
                <li key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hb-wc5-stage">
          <span className="hb-wc5-halo" aria-hidden="true" />
          <div ref={magnet} className="hb-wc5-magnet">
            <a className="hb-wc5-orb" href={cta.href} aria-label={cta.label}>
              <svg className="hb-wc5-ring" viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <path id={`${id}-p`} d="M100 100m-84 0a84 84 0 1 1 168 0a84 84 0 1 1-168 0" />
                </defs>
                <text>
                  <textPath href={`#${id}-p`} textLength="520" lengthAdjust="spacing">
                    {ringText}
                  </textPath>
                </text>
              </svg>
              <span className="hb-wc5-core">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="hb-wc5-label" aria-hidden="true">{cta.label}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
