"use client";

import * as React from "react";

export interface CtaMarqueeBandProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  phrase?: string;
  eyebrow?: string;
  cta?: { label: string; href: string };
  points?: string[];
  speed?: number;
  strength?: number;
  accent?: string;
}

const css = `
.hb-kc9 {
  --hb-kc9-accent: #ff5a36;
  --hb-kc9-speed: 32s;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kc9 *, .hb-kc9 *::before, .hb-kc9 *::after { box-sizing: border-box; }
.hb-kc9::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: -1;
  width: 70%;
  height: 70%;
  transform: translate(-50%, -50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kc9-accent) 22%, transparent), transparent);
  pointer-events: none;
}
.hb-kc9-band { padding: 56px 0 48px; border-top: 1px solid rgba(255, 255, 255, .08); border-bottom: 1px solid rgba(255, 255, 255, .08); }
.hb-kc9-top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 16px 28px;
  color: #8f8f8f;
  font-size: 13px;
  font-weight: 550;
  letter-spacing: .08em;
  text-align: center;
  text-transform: uppercase;
}
.hb-kc9-live { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--hb-kc9-accent); }
.hb-kc9-live::after {
  content: "";
  position: absolute;
  inset: -4px;
  border: 1px solid var(--hb-kc9-accent);
  border-radius: 50%;
  animation: hb-kc9-ping 1.8s cubic-bezier(0, 0, .2, 1) infinite;
}
.hb-kc9-stage { position: relative; }
.hb-kc9-rows { display: grid; gap: .04em; font-size: clamp(56px, 12cqi, 156px); transform: rotate(-2.5deg) scale(1.04); }
.hb-kc9-row { display: flex; width: max-content; }
.hb-kc9-track { display: flex; flex: none; animation: hb-kc9-left var(--hb-kc9-speed) linear infinite; }
.hb-kc9-row[data-dir="right"] .hb-kc9-track { animation-name: hb-kc9-right; animation-duration: calc(var(--hb-kc9-speed) * 1.25); }
.hb-kc9-row[data-slow="true"] .hb-kc9-track { animation-duration: calc(var(--hb-kc9-speed) * 1.6); }
.hb-kc9-item {
  display: inline-flex;
  align-items: center;
  gap: .32em;
  padding-right: .32em;
  font-weight: 760;
  line-height: 1.04;
  letter-spacing: -.045em;
  white-space: nowrap;
}
.hb-kc9-row[data-look="solid"] .hb-kc9-item { color: #ededed; }
.hb-kc9-row[data-look="outline"] .hb-kc9-item { color: transparent; -webkit-text-stroke: 1.5px color-mix(in srgb, var(--hb-kc9-accent) 80%, #fff); }
.hb-kc9-row[data-look="dim"] .hb-kc9-item { color: #1e1e1e; }
.hb-kc9-star { flex: none; width: .5em; height: .5em; }
.hb-kc9-row[data-look="solid"] .hb-kc9-star { color: var(--hb-kc9-accent); }
.hb-kc9-row[data-look="outline"] .hb-kc9-star { color: rgba(255, 255, 255, .4); }
.hb-kc9-row[data-look="dim"] .hb-kc9-star { color: #262626; }
.hb-kc9-magnet {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  transform: translate(-50%, -50%) translate3d(var(--hb-kc9-x, 0px), var(--hb-kc9-y, 0px), 0);
  transition: transform .45s cubic-bezier(.2, .9, .3, 1.2);
}
.hb-kc9-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 64px;
  padding: 0 14px 0 30px;
  border-radius: 999px;
  background: var(--hb-kc9-accent);
  color: #fff;
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 0 0 10px rgba(10, 10, 10, .55), 0 0 0 11px rgba(255, 255, 255, .08), 0 24px 60px -14px var(--hb-kc9-accent), inset 0 1px 0 rgba(255, 255, 255, .35);
  transition: box-shadow .3s ease, filter .3s ease;
}
.hb-kc9-cta:hover { filter: brightness(1.08); box-shadow: 0 0 0 14px rgba(10, 10, 10, .6), 0 0 0 15px rgba(255, 255, 255, .12), 0 30px 70px -14px var(--hb-kc9-accent), inset 0 1px 0 rgba(255, 255, 255, .35); }
.hb-kc9-cta:focus-visible { outline: 2px solid #fff; outline-offset: 16px; }
.hb-kc9-label { display: inline-block; transform: translate3d(calc(var(--hb-kc9-x, 0px) * .25), calc(var(--hb-kc9-y, 0px) * .25), 0); transition: transform .45s cubic-bezier(.2, .9, .3, 1.2); }
.hb-kc9-arrow {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #0a0a0a;
  color: #fff;
  transition: transform .35s cubic-bezier(.3, 1.6, .5, 1);
}
.hb-kc9-arrow svg { width: 16px; height: 16px; }
.hb-kc9-cta:hover .hb-kc9-arrow { transform: rotate(-45deg); }
.hb-kc9-points {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 22px;
  margin: 34px 16px 0;
  padding: 0;
  color: #8f8f8f;
  font-size: 14px;
  list-style: none;
}
.hb-kc9-points li { display: inline-flex; align-items: center; gap: 8px; }
.hb-kc9-points svg { width: 14px; height: 14px; color: var(--hb-kc9-accent); }
.hb-kc9-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-kc9-left { from { transform: translateX(0); } to { transform: translateX(-100%); } }
@keyframes hb-kc9-right { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes hb-kc9-ping { 75%, 100% { transform: scale(2); opacity: 0; } }
@container (min-width: 720px) {
  .hb-kc9-band { padding: 88px 0 72px; }
  .hb-kc9-top { margin-bottom: 40px; }
  .hb-kc9-cta { height: 76px; padding: 0 16px 0 36px; font-size: 19px; }
  .hb-kc9-arrow { width: 48px; height: 48px; }
  .hb-kc9-points { margin-top: 44px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kc9-track, .hb-kc9-live::after { animation: none; }
  .hb-kc9-magnet, .hb-kc9-label, .hb-kc9-arrow, .hb-kc9-cta { transition: none; }
}
`;

function Star() {
  return (
    <svg className="hb-kc9-star" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" fill="currentColor" />
    </svg>
  );
}

function Row({ phrase, look, dir, slow }: { phrase: string; look: "solid" | "outline" | "dim"; dir: "left" | "right"; slow?: boolean }) {
  const group = (
    <>
      {[0, 1, 2].map((n) => (
        <span key={n} className="hb-kc9-item">
          {phrase}
          <Star />
        </span>
      ))}
    </>
  );
  return (
    <div className="hb-kc9-row" data-look={look} data-dir={dir} data-slow={slow ? "true" : "false"}>
      <div className="hb-kc9-track">{group}</div>
      <div className="hb-kc9-track">{group}</div>
    </div>
  );
}

export function CtaMarqueeBand({
  phrase = "Start building today",
  eyebrow = "4,812 teams shipped this week",
  cta = { label: "Create your workspace", href: "#" },
  points = ["Free for 14 days", "No credit card", "Import from Notion in one click"],
  speed = 32,
  strength = 0.35,
  accent = "#ff5a36",
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: CtaMarqueeBandProps) {
  const magnet = React.useRef<HTMLDivElement>(null);
  const reduced = React.useRef(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const on = () => {
      reduced.current = mq.matches;
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const move = (e: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(e);
    const el = magnet.current;
    if (!el || reduced.current || e.pointerType === "touch") return;
    const stage = el.parentElement;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const radius = Math.min(360, r.width * 0.45);
    const k = dist < radius ? strength : 0;
    const cap = 90;
    const x = Math.max(-cap, Math.min(cap, dx * k));
    const y = Math.max(-cap * 0.6, Math.min(cap * 0.6, dy * k));
    el.style.setProperty("--hb-kc9-x", `${x.toFixed(1)}px`);
    el.style.setProperty("--hb-kc9-y", `${y.toFixed(1)}px`);
  };

  const leave = (e: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(e);
    const el = magnet.current;
    if (!el) return;
    el.style.setProperty("--hb-kc9-x", "0px");
    el.style.setProperty("--hb-kc9-y", "0px");
  };

  const vars = { "--hb-kc9-accent": accent, "--hb-kc9-speed": `${Math.max(4, speed)}s`, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kc9 ${className}`} style={vars} onPointerMove={move} onPointerLeave={leave} {...rest}>
      <style href="hb-cta-marquee-band" precedence="default">{css}</style>
      <div className="hb-kc9-band">
        {eyebrow ? (
          <p className="hb-kc9-top">
            <span className="hb-kc9-live" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <h2 className="hb-kc9-sr">{phrase}</h2>
        <div className="hb-kc9-stage">
          <div className="hb-kc9-rows" aria-hidden="true">
            <Row phrase={phrase} look="solid" dir="left" />
            <Row phrase={phrase} look="outline" dir="right" />
            <Row phrase={phrase} look="dim" dir="left" slow />
          </div>
          <div ref={magnet} className="hb-kc9-magnet">
            <a className="hb-kc9-cta" href={cta.href}>
              <span className="hb-kc9-label">{cta.label}</span>
              <span className="hb-kc9-arrow" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>
        {points.length ? (
          <ul className="hb-kc9-points">
            {points.map((p) => (
              <li key={p}>
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M2.5 7.3l2.7 2.7 6.3-6.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
