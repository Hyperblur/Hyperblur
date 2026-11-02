"use client";

import * as React from "react";

export interface NotfoundAstronautLink {
  label: string;
  href: string;
}

export interface NotfoundAstronautProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  code?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primary?: NotfoundAstronautLink;
  secondary?: NotfoundAstronautLink;
  onReport?: () => void;
  stars?: number;
  parallax?: boolean;
  accent?: string;
}

const css = `
.hb-kg2 {
  --hb-kg2-accent: #8b5cf6;
  --hb-kg2-px: 0;
  --hb-kg2-py: 0;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: radial-gradient(120% 80% at 50% 0%, #120f1f 0%, #0a0a0a 60%);
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kg2 *, .hb-kg2 *::before, .hb-kg2 *::after { box-sizing: border-box; }
.hb-kg2-sky { position: absolute; inset: -24px; z-index: -1; pointer-events: none; }
.hb-kg2-layer {
  position: absolute;
  inset: 0;
  transition: transform .6s cubic-bezier(.2, .8, .2, 1);
}
.hb-kg2-l1 { transform: translate3d(calc(var(--hb-kg2-px) * -6px), calc(var(--hb-kg2-py) * -6px), 0); }
.hb-kg2-l2 { transform: translate3d(calc(var(--hb-kg2-px) * -14px), calc(var(--hb-kg2-py) * -14px), 0); }
.hb-kg2-l3 { transform: translate3d(calc(var(--hb-kg2-px) * -26px), calc(var(--hb-kg2-py) * -26px), 0); }
.hb-kg2-star {
  position: absolute;
  width: var(--hb-kg2-s);
  height: var(--hb-kg2-s);
  border-radius: 50%;
  background: #fff;
  opacity: .3;
  animation: hb-kg2-twinkle var(--hb-kg2-t) ease-in-out var(--hb-kg2-d) infinite alternate;
}
.hb-kg2-star[data-glow] { box-shadow: 0 0 6px 1px rgba(255, 255, 255, .7); }
.hb-kg2-shoot {
  position: absolute;
  top: 14%;
  left: 62%;
  width: 120px;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, .9), transparent);
  transform: rotate(-24deg);
  opacity: 0;
  animation: hb-kg2-shoot 7s ease-in 2s infinite;
}
.hb-kg2-planet {
  position: absolute;
  left: 50%;
  bottom: -150cqi;
  width: 160cqi;
  aspect-ratio: 1;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--hb-kg2-accent) 55%, #0a0a0a) 0%, #0d0b16 22%, #0a0a0a 45%);
  box-shadow: 0 -2px 0 color-mix(in srgb, var(--hb-kg2-accent) 70%, #fff), 0 -30px 120px -10px color-mix(in srgb, var(--hb-kg2-accent) 55%, transparent);
}
.hb-kg2-ringed {
  position: absolute;
  top: 12%;
  right: 9%;
  width: clamp(54px, 9cqi, 96px);
}
.hb-kg2-inner {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 56px 20px 80px;
  text-align: center;
}
.hb-kg2-stage {
  position: relative;
  display: grid;
  place-items: center;
  height: clamp(200px, 32cqi, 300px);
}
.hb-kg2-code {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  margin: 0;
  font-size: clamp(130px, 31cqi, 300px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, .14);
  background: linear-gradient(180deg, rgba(255, 255, 255, .08), transparent 75%);
  -webkit-background-clip: text;
  background-clip: text;
  user-select: none;
}
.hb-kg2-float {
  position: relative;
  width: clamp(120px, 19cqi, 184px);
  animation: hb-kg2-float 6s ease-in-out infinite alternate;
}
.hb-kg2-spin { animation: hb-kg2-spin 40s linear infinite; }
.hb-kg2-spin svg { display: block; width: 100%; height: auto; overflow: visible; filter: drop-shadow(0 20px 30px rgba(0, 0, 0, .5)); }
.hb-kg2-eyebrow {
  margin: 4px 0 0;
  color: color-mix(in srgb, var(--hb-kg2-accent) 60%, #fff);
  font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 12px;
  letter-spacing: .16em;
  text-transform: uppercase;
}
.hb-kg2-title {
  margin: 12px 0 0;
  font-size: clamp(34px, 5.6cqi, 58px);
  font-weight: 650;
  line-height: 1.04;
  letter-spacing: -.035em;
}
.hb-kg2-sub {
  margin: 14px auto 0;
  max-width: 470px;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kg2-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}
.hb-kg2-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 22px;
  border: 1px solid transparent;
  border-radius: 999px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .2s cubic-bezier(.2, .8, .2, 1), background-color .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.hb-kg2-btn svg { width: 16px; height: 16px; }
.hb-kg2-btn:focus-visible { outline: 2px solid color-mix(in srgb, var(--hb-kg2-accent) 70%, #fff); outline-offset: 3px; }
.hb-kg2-primary {
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-kg2-accent) 85%, #fff), var(--hb-kg2-accent));
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 12px 32px -12px var(--hb-kg2-accent);
}
.hb-kg2-primary:hover { transform: translateY(-1px); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 16px 40px -10px var(--hb-kg2-accent); }
.hb-kg2-ghost { border-color: rgba(255, 255, 255, .12); background: rgba(10, 10, 10, .5); color: #ededed; backdrop-filter: blur(6px); }
.hb-kg2-ghost:hover { transform: translateY(-1px); border-color: rgba(255, 255, 255, .3); background: rgba(255, 255, 255, .06); }
@container (min-width: 760px) {
  .hb-kg2-inner { padding: 72px 40px 104px; }
}
@keyframes hb-kg2-twinkle { from { opacity: .15; transform: scale(.7); } to { opacity: 1; transform: scale(1); } }
@keyframes hb-kg2-float { from { transform: translateY(-10px) rotate(-6deg); } to { transform: translateY(12px) rotate(6deg); } }
@keyframes hb-kg2-spin { to { transform: rotate(360deg); } }
@keyframes hb-kg2-shoot {
  0%, 82% { opacity: 0; transform: translate(0, 0) rotate(-24deg); }
  86% { opacity: 1; }
  100% { opacity: 0; transform: translate(-240px, 108px) rotate(-24deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kg2-star, .hb-kg2-float, .hb-kg2-spin, .hb-kg2-shoot { animation: none; }
  .hb-kg2-layer, .hb-kg2-btn { transition: none; }
  .hb-kg2-btn:hover { transform: none; }
}
`;

function rand(i: number, salt: number) {
  let h = Math.imul(i + 1, 2654435761) ^ Math.imul(salt + 7, 1597334677);
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519);
  h ^= h >>> 13;
  h = Math.imul(h, 3266489917);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function Astronaut({ uid }: { uid: string }) {
  const visor = `${uid}-visor`;
  const suit = `${uid}-suit`;
  return (
    <svg viewBox="0 0 200 230" aria-hidden="true">
      <defs>
        <linearGradient id={visor} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b1530" />
          <stop offset=".55" stopColor="#0d0b18" />
          <stop offset="1" style={{ stopColor: "var(--hb-kg2-accent)" }} />
        </linearGradient>
        <linearGradient id={suit} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c4c7d2" />
        </linearGradient>
      </defs>
      <path d="M64 128c-30 6-44 30-58 62" fill="none" stroke="#9a9db0" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      <rect x="58" y="92" width="84" height="74" rx="16" fill="#a9adbd" />
      <g transform="rotate(-38 72 112)">
        <rect x="30" y="102" width="46" height="22" rx="11" fill={`url(#${suit})`} />
        <circle cx="32" cy="113" r="11" fill="#d9dbe3" />
      </g>
      <g transform="rotate(28 128 112)">
        <rect x="124" y="102" width="46" height="22" rx="11" fill={`url(#${suit})`} />
        <circle cx="168" cy="113" r="11" fill="#d9dbe3" />
      </g>
      <g transform="rotate(10 88 160)">
        <rect x="76" y="150" width="22" height="50" rx="11" fill={`url(#${suit})`} />
        <rect x="74" y="190" width="26" height="16" rx="7" fill="#8d91a3" />
      </g>
      <g transform="rotate(-16 112 160)">
        <rect x="102" y="150" width="22" height="50" rx="11" fill={`url(#${suit})`} />
        <rect x="100" y="190" width="26" height="16" rx="7" fill="#8d91a3" />
      </g>
      <rect x="68" y="94" width="64" height="80" rx="26" fill={`url(#${suit})`} />
      <rect x="84" y="118" width="32" height="22" rx="5" fill="#d3d6df" />
      <circle cx="92" cy="129" r="3.2" style={{ fill: "var(--hb-kg2-accent)" }} />
      <circle cx="100" cy="129" r="3.2" fill="#22d3ee" />
      <circle cx="108" cy="129" r="3.2" fill="#fbbf24" />
      <rect x="84" y="148" width="32" height="4" rx="2" fill="#c4c7d2" />
      <circle cx="100" cy="64" r="44" fill={`url(#${suit})`} />
      <rect x="66" y="40" width="68" height="50" rx="24" fill={`url(#${visor})`} />
      <path d="M76 56c4-8 12-11 20-11" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="4" strokeLinecap="round" />
      <circle cx="120" cy="76" r="3" fill="#fff" fillOpacity=".35" />
      <rect x="96" y="12" width="8" height="10" rx="3" fill="#c4c7d2" />
      <circle cx="100" cy="10" r="4" style={{ fill: "var(--hb-kg2-accent)" }} />
    </svg>
  );
}

function RingedPlanet() {
  return (
    <svg viewBox="0 0 100 60" aria-hidden="true">
      <circle cx="50" cy="30" r="18" fill="#1d1830" />
      <path d="M32 30a18 18 0 0 1 36 0" style={{ fill: "color-mix(in srgb, var(--hb-kg2-accent) 50%, #2a2440)" }} />
      <ellipse cx="50" cy="32" rx="44" ry="9" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" transform="rotate(-12 50 32)" />
    </svg>
  );
}

export function NotfoundAstronaut({
  code = "404",
  eyebrow = "Error 404",
  title = "Lost in space",
  subtitle = "The page you were looking for drifted out of orbit. It may have been moved, renamed, or it never launched at all.",
  primary = { label: "Take me home", href: "/" },
  secondary = { label: "Report this link", href: "mailto:support@orbitly.io?subject=Broken%20link" },
  onReport,
  stars = 90,
  parallax = true,
  accent = "#8b5cf6",
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: NotfoundAstronautProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ref = React.useRef<HTMLElement>(null);
  const vars = { "--hb-kg2-accent": accent, ...style } as React.CSSProperties;

  const field = React.useMemo(
    () =>
      Array.from({ length: stars }, (_, i) => {
        const size = 1 + rand(i, 3) * 2.2;
        return {
          layer: i % 3,
          left: `${(rand(i, 1) * 100).toFixed(2)}%`,
          top: `${(rand(i, 2) * 100).toFixed(2)}%`,
          size: `${size.toFixed(2)}px`,
          glow: size > 2.6,
          t: `${(2 + rand(i, 4) * 4).toFixed(2)}s`,
          d: `${(-rand(i, 5) * 6).toFixed(2)}s`,
        };
      }),
    [stars],
  );

  const move = (e: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(e);
    if (!parallax || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    ref.current.style.setProperty("--hb-kg2-px", x.toFixed(3));
    ref.current.style.setProperty("--hb-kg2-py", y.toFixed(3));
  };

  const leave = (e: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(e);
    ref.current?.style.setProperty("--hb-kg2-px", "0");
    ref.current?.style.setProperty("--hb-kg2-py", "0");
  };

  return (
    <section
      ref={ref}
      className={`hb-kg2 ${className}`}
      style={vars}
      aria-labelledby={`${uid}-title`}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      <style href="hb-notfound-astronaut" precedence="default">{css}</style>
      <div className="hb-kg2-sky" aria-hidden="true">
        {[0, 1, 2].map((layer) => (
          <div key={layer} className={`hb-kg2-layer hb-kg2-l${layer + 1}`}>
            {field
              .filter((s) => s.layer === layer)
              .map((s, i) => (
                <span
                  key={i}
                  className="hb-kg2-star"
                  data-glow={s.glow ? "" : undefined}
                  style={{ left: s.left, top: s.top, "--hb-kg2-s": s.size, "--hb-kg2-t": s.t, "--hb-kg2-d": s.d } as React.CSSProperties}
                />
              ))}
            {layer === 1 && <div className="hb-kg2-ringed"><RingedPlanet /></div>}
            {layer === 0 && <span className="hb-kg2-shoot" />}
          </div>
        ))}
        <div className="hb-kg2-planet" />
      </div>
      <div className="hb-kg2-inner">
        <div className="hb-kg2-stage" aria-hidden="true">
          <p className="hb-kg2-code">{code}</p>
          <div className="hb-kg2-layer hb-kg2-l3" style={{ position: "relative", inset: "auto", display: "grid", placeItems: "center" }}>
            <div className="hb-kg2-float">
              <div className="hb-kg2-spin"><Astronaut uid={uid} /></div>
            </div>
          </div>
        </div>
        <p className="hb-kg2-eyebrow">{eyebrow}</p>
        <h1 id={`${uid}-title`} className="hb-kg2-title">{title}</h1>
        {subtitle && <p className="hb-kg2-sub">{subtitle}</p>}
        <div className="hb-kg2-actions">
          <a className="hb-kg2-btn hb-kg2-primary" href={primary.href}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 7.5 8 3l5.5 4.5V13a.5.5 0 0 1-.5.5H9.5V10h-3v3.5H3a.5.5 0 0 1-.5-.5V7.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
            {primary.label}
          </a>
          <a className="hb-kg2-btn hb-kg2-ghost" href={secondary.href} onClick={onReport}>{secondary.label}</a>
        </div>
      </div>
    </section>
  );
}
