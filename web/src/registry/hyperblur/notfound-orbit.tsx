"use client";

import * as React from "react";

export interface NotfoundOrbitProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  code?: string;
  title?: string;
  message?: string;
  path?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  onReport?: (path: string) => void;
  accent?: string;
}

function hash(n: number) {
  let x = (n * 2654435761) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519) >>> 0;
  x ^= x >>> 13;
  return x >>> 0;
}

const stars = Array.from({ length: 90 }, (_, i) => {
  const r = hash(i + 11);
  return { x: (r % 1000) / 10, y: ((r >>> 10) % 1000) / 10, s: 0.6 + ((r >>> 4) % 14) / 10, d: ((r >>> 6) % 40) / 10, layer: i % 3 };
});

const css = `
@keyframes hb-wd11-orbit { from { transform: rotateX(74deg) rotateY(-14deg) rotateZ(0deg); } to { transform: rotateX(74deg) rotateY(-14deg) rotateZ(360deg); } }
@keyframes hb-wd11-face { from { transform: rotateZ(0deg) rotateY(14deg) rotateX(-74deg); } to { transform: rotateZ(-360deg) rotateY(14deg) rotateX(-74deg); } }
@keyframes hb-wd11-twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
@keyframes hb-wd11-ping { 0% { transform: scale(0.2); opacity: 0.8; } 100% { transform: scale(1); opacity: 0; } }
@keyframes hb-wd11-sweep { to { transform: rotate(360deg); } }
@keyframes hb-wd11-comet { 0%, 70% { transform: translate(0, 0); opacity: 0; } 72% { opacity: 1; } 100% { transform: translate(-520px, 260px); opacity: 0; } }
@keyframes hb-wd11-drift { 0%, 100% { transform: translate(0, 0) rotate(-18deg); } 50% { transform: translate(10px, -8px) rotate(-10deg); } }
@keyframes hb-wd11-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
@keyframes hb-wd11-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.hb-wd11 {
  --hb-wd11-accent: #fb923c;
  --hb-wd11-px: 0;
  --hb-wd11-py: 0;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 620px;
  container-type: inline-size;
  background: radial-gradient(90% 70% at 50% 110%, color-mix(in srgb, var(--hb-wd11-accent) 18%, #0a0a12), #05060a 60%);
  color: #ededed;
  font-family: inherit;
  overflow: hidden;
  display: grid;
  -webkit-font-smoothing: antialiased;
}
.hb-wd11 *, .hb-wd11 *::before, .hb-wd11 *::after { box-sizing: border-box; }
.hb-wd11-sky { position: absolute; inset: -20px; pointer-events: none; }
.hb-wd11-layer { position: absolute; inset: 0; transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1); }
.hb-wd11-star { position: absolute; border-radius: 50%; background: #fff; animation: hb-wd11-twinkle 4s ease-in-out infinite; }
.hb-wd11-comet { position: absolute; right: 8%; top: 6%; width: 120px; height: 2px; border-radius: 2px; background: linear-gradient(90deg, #fff, transparent); transform-origin: left; rotate: -26deg; animation: hb-wd11-comet 9s ease-in 2s infinite; opacity: 0; }
.hb-wd11-in { position: relative; max-width: 1120px; width: 100%; margin: 0 auto; padding: 28px 20px 56px; display: grid; grid-template-rows: auto 1fr auto; gap: 8px; }
.hb-wd11-hud { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; font: 500 11px/1.6 var(--font-mono, monospace); color: #8a8f9c; letter-spacing: 0.06em; text-transform: uppercase; }
.hb-wd11-hud b { color: #ededed; font-weight: 600; }
.hb-wd11-sig { display: inline-flex; align-items: center; gap: 8px; color: var(--hb-wd11-accent); }
.hb-wd11-sig::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: currentColor; animation: hb-wd11-blink 1.2s steps(2) infinite; }
.hb-wd11-radar { position: relative; width: 74px; height: 74px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.12); background: radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%); overflow: hidden; flex: none; display: none; }
@container (min-width: 640px) { .hb-wd11-radar { display: block; } }
.hb-wd11-radar::before { content: ""; position: absolute; inset: 0; background: conic-gradient(from 0deg, color-mix(in srgb, var(--hb-wd11-accent) 55%, transparent), transparent 25%); animation: hb-wd11-sweep 3s linear infinite; }
.hb-wd11-radar::after { content: ""; position: absolute; inset: 36%; border-radius: 50%; border: 1px solid rgba(255,255,255,0.12); }
.hb-wd11-blip { position: absolute; left: 66%; top: 28%; width: 5px; height: 5px; border-radius: 50%; background: var(--hb-wd11-accent); }
.hb-wd11-blip::after { content: ""; position: absolute; inset: -8px; border-radius: 50%; border: 1px solid var(--hb-wd11-accent); animation: hb-wd11-ping 2s ease-out infinite; }
.hb-wd11-stage { position: relative; display: grid; place-items: center; min-height: 320px; perspective: 900px; }
.hb-wd11-system { position: relative; width: min(420px, 82cqw); aspect-ratio: 1; transform-style: preserve-3d; transform: translate(calc(var(--hb-wd11-px) * 10px), calc(var(--hb-wd11-py) * 8px)); transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1); }
.hb-wd11-planet { position: absolute; left: 50%; top: 50%; width: 42%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle at 34% 30%, color-mix(in srgb, var(--hb-wd11-accent) 30%, #fff) 0%, var(--hb-wd11-accent) 28%, color-mix(in srgb, var(--hb-wd11-accent) 40%, #1a0c05) 70%, #0b0603 100%); box-shadow: 0 0 80px -10px color-mix(in srgb, var(--hb-wd11-accent) 70%, transparent), inset -18px -22px 40px rgba(0,0,0,0.55); }
.hb-wd11-planet::before { content: ""; position: absolute; inset: 0; border-radius: 50%; background: repeating-linear-gradient(-18deg, transparent 0 14px, rgba(0,0,0,0.12) 14px 20px); mix-blend-mode: multiply; }
.hb-wd11-zero { position: relative; font: 700 clamp(56px, 13cqw, 96px)/1 var(--font-grotesk, inherit); letter-spacing: -0.05em; color: rgba(255,255,255,0.92); text-shadow: 0 2px 20px rgba(0,0,0,0.35); }
.hb-wd11-ring { position: absolute; left: 50%; top: 50%; width: 70%; height: 16%; transform: translate(-50%, -50%) rotate(-14deg); border-radius: 50%; border: 2px solid rgba(255,255,255,0.22); pointer-events: none; }
.hb-wd11-ring[data-half="back"] { clip-path: inset(0 0 50% 0); }
.hb-wd11-ring[data-half="front"] { clip-path: inset(50% 0 0 0); border-color: rgba(255,255,255,0.5); box-shadow: 0 2px 0 rgba(255,255,255,0.08); }
.hb-wd11-orbit { position: absolute; inset: 0; transform-style: preserve-3d; animation: hb-wd11-orbit 16s linear infinite; border-radius: 50%; }
.hb-wd11-orbit::before { content: ""; position: absolute; inset: 0; border-radius: 50%; border: 1px dashed rgba(255,255,255,0.14); }
.hb-wd11-arm { position: absolute; left: 50%; top: 50%; width: 0; height: 0; transform-style: preserve-3d; }
.hb-wd11-arm[data-i="0"] { transform: translateX(min(210px, 41cqw)); }
.hb-wd11-arm[data-i="1"] { transform: translateX(calc(min(210px, 41cqw) * -1)); }
.hb-wd11-sat { position: absolute; left: 0; top: 0; transform-style: preserve-3d; animation: hb-wd11-face 16s linear infinite; }
.hb-wd11-four { position: absolute; left: 0; top: 0; translate: -50% -50%; display: grid; place-items: center; width: clamp(64px, 14cqw, 92px); aspect-ratio: 1; border-radius: 24px; background: linear-gradient(160deg, #2a2d38, #12141b); border: 1px solid rgba(255,255,255,0.14); box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 20px 40px -12px rgba(0,0,0,0.9); font: 700 clamp(40px, 9cqw, 60px)/1 var(--font-grotesk, inherit); letter-spacing: -0.04em; color: #ededed; }
.hb-wd11-four::before, .hb-wd11-four::after { content: ""; position: absolute; top: 50%; width: 22px; height: 10px; margin-top: -5px; border-radius: 2px; background: repeating-linear-gradient(90deg, #3b5bdb 0 4px, #1e2a6b 4px 6px); border: 1px solid rgba(255,255,255,0.18); }
.hb-wd11-four::before { left: -25px; }
.hb-wd11-four::after { right: -25px; }
.hb-wd11-probe { position: absolute; right: 10%; top: 12%; width: 54px; animation: hb-wd11-drift 7s ease-in-out infinite; opacity: 0.9; }
.hb-wd11-copy { text-align: center; display: grid; justify-items: center; gap: 12px; animation: hb-wd11-up 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) 0.2s both; }
.hb-wd11-copy h1 { margin: 0; font: 600 clamp(26px, 4.2cqw, 42px)/1.08 var(--font-grotesk, inherit); letter-spacing: -0.03em; max-width: 20ch; }
.hb-wd11-copy p { margin: 0; color: #9096a3; font-size: 15px; line-height: 1.6; max-width: 46ch; }
.hb-wd11-copy code { font: 500 13px/1 var(--font-mono, monospace); color: #ededed; background: rgba(255,255,255,0.06); padding: 3px 6px; border-radius: 6px; }
.hb-wd11-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 6px; }
.hb-wd11-btn { display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 20px; border-radius: 999px; font: 600 14px/1 inherit; font-family: inherit; text-decoration: none; cursor: pointer; transition: transform 0.25s cubic-bezier(0.34, 1.4, 0.5, 1), background-color 0.2s ease, border-color 0.2s ease; }
.hb-wd11-btn:active { transform: scale(0.97); }
.hb-wd11-btn:focus-visible { outline: 2px solid var(--hb-wd11-accent); outline-offset: 3px; }
.hb-wd11-btn svg { width: 15px; height: 15px; }
.hb-wd11-primary { background: #ededed; color: #0a0a0a; border: 0; box-shadow: 0 10px 30px -12px color-mix(in srgb, var(--hb-wd11-accent) 80%, transparent); }
.hb-wd11-primary:hover { background: #fff; }
.hb-wd11-ghost { background: rgba(255,255,255,0.04); color: #ededed; border: 1px solid rgba(255,255,255,0.14); }
.hb-wd11-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.26); }
.hb-wd11-link { appearance: none; background: none; border: 0; padding: 0; color: #8a8f9c; font: 500 12.5px inherit; font-family: inherit; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.hb-wd11-link:hover { color: #ededed; }
.hb-wd11-link:focus-visible { outline: 2px solid var(--hb-wd11-accent); outline-offset: 3px; border-radius: 3px; }
@media (prefers-reduced-motion: reduce) {
  .hb-wd11 *, .hb-wd11 *::before, .hb-wd11 *::after { animation-play-state: paused !important; transition: none !important; }
  .hb-wd11-comet, .hb-wd11-copy { animation: none !important; }
}
`;

export function NotfoundOrbit({
  code = "404",
  title = "This page drifted out of orbit",
  message = "We lost the signal somewhere past the old docs. The page may have moved, or the link was mistyped before launch.",
  path = "/docs/v1/telemetry-api",
  primary = { label: "Return to base", href: "/" },
  secondary = { label: "Search the docs", href: "/docs" },
  onReport,
  accent = "#fb923c",
  className = "",
  style,
  ...rest
}: NotfoundOrbitProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [reported, setReported] = React.useState(false);
  const digits = code.split("");
  const outer = [digits[0] ?? "4", digits[2] ?? "4"];
  const middle = digits[1] ?? "0";

  const move = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hb-wd11-px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--hb-wd11-py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  return (
    <section ref={ref} className={`hb-wd11 ${className}`} style={{ "--hb-wd11-accent": accent, ...style } as React.CSSProperties} onPointerMove={move} {...rest}>
      <style href="hb-notfound-orbit" precedence="default">{css}</style>
      <div className="hb-wd11-sky" aria-hidden="true">
        {[0, 1, 2].map((l) => (
          <div key={l} className="hb-wd11-layer" style={{ transform: `translate(calc(var(--hb-wd11-px) * ${-(l + 1) * 12}px), calc(var(--hb-wd11-py) * ${-(l + 1) * 10}px))` }}>
            {stars
              .filter((s) => s.layer === l)
              .map((s, i) => (
                <span key={i} className="hb-wd11-star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${(s.s + l * 0.3).toFixed(1)}px`, height: `${(s.s + l * 0.3).toFixed(1)}px`, animationDelay: `${s.d}s` }} />
              ))}
          </div>
        ))}
        <span className="hb-wd11-comet" />
      </div>
      <div className="hb-wd11-in">
        <div className="hb-wd11-hud">
          <div>
            <span className="hb-wd11-sig">Signal lost</span>
            <br />
            Last contact <b>{path}</b>
            <br />
            Error <b>{code}</b> / route not found
          </div>
          <div className="hb-wd11-radar" aria-hidden="true">
            <span className="hb-wd11-blip" />
          </div>
        </div>
        <div className="hb-wd11-stage" aria-hidden="true">
          <svg className="hb-wd11-probe" viewBox="0 0 54 40" fill="none">
            <rect x="20" y="14" width="14" height="12" rx="2" fill="#2a2d38" stroke="rgba(255,255,255,0.3)" />
            <rect x="2" y="16" width="16" height="8" fill="#1e2a6b" stroke="rgba(255,255,255,0.25)" />
            <rect x="36" y="16" width="16" height="8" fill="#1e2a6b" stroke="rgba(255,255,255,0.25)" />
            <path d="M27 14V6M27 6l-4-4M27 6l4-4" stroke="rgba(255,255,255,0.5)" strokeLinecap="round" />
            <circle cx="27" cy="20" r="2" fill={accent} />
          </svg>
          <div className="hb-wd11-system">
            <span className="hb-wd11-ring" data-half="back" />
            <div className="hb-wd11-planet">
              <span className="hb-wd11-zero">{middle}</span>
            </div>
            <span className="hb-wd11-ring" data-half="front" />
            <div className="hb-wd11-orbit">
              {outer.map((d, i) => (
                <div key={i} className="hb-wd11-arm" data-i={i}>
                  <div className="hb-wd11-sat">
                    <span className="hb-wd11-four">{d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hb-wd11-copy">
          <h1>{title}</h1>
          <p>
            {message} Requested <code>{path}</code>.
          </p>
          <div className="hb-wd11-actions">
            <a className="hb-wd11-btn hb-wd11-primary" href={primary.href}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 7.5L8 3l5.5 4.5V13H10V9.5H6V13H2.5z" /></svg>
              {primary.label}
            </a>
            <a className="hb-wd11-btn hb-wd11-ghost" href={secondary.href}>
              {secondary.label}
            </a>
          </div>
          <button
            type="button"
            className="hb-wd11-link"
            onClick={() => {
              setReported(true);
              onReport?.(path);
            }}
            disabled={reported}
            aria-live="polite"
          >
            {reported ? "Thanks, mission control has the coordinates" : "Report this broken link"}
          </button>
        </div>
      </div>
    </section>
  );
}
