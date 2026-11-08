"use client";

import * as React from "react";

export interface CinemaDollyZoomAction {
  label: string;
  href: string;
}

export interface CinemaDollyZoomProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  kicker?: string;
  title?: string;
  subtitle?: string;
  cta?: CinemaDollyZoomAction | null;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  frames?: number;
  accent?: string;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vc11 {
  --hb-vc11-accent: #ff4d4d;
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 600px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: radial-gradient(60% 60% at 50% 46%, #2a1414, #0a0606 70%);
  color: #fbeeee;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc11 *, .hb-vc11 *::before, .hb-vc11 *::after { box-sizing: border-box; }
.hb-vc11-hall { position: absolute; inset: 0; }
.hb-vc11-lines { position: absolute; inset: 0; width: 100%; height: 100%; opacity: .4; }
.hb-vc11-frame {
  position: absolute;
  left: 50%;
  top: 0;
  width: 62cqi;
  height: 92%;
  margin-left: -31cqi;
  border: 2px solid rgba(255, 220, 210, .8);
  border-bottom-color: transparent;
  will-change: transform, opacity;
  transform-origin: 50% 50%;
}
.hb-vc11-frame[data-lamp]::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 6%;
  width: 18%;
  height: 2.2%;
  border-radius: 2px;
  background: #ffe9d6;
  box-shadow: 0 0 30px 8px rgba(255, 200, 170, .45);
  transform: translateX(-50%);
}
.hb-vc11-frame[data-door]::after {
  content: "";
  position: absolute;
  top: 18%;
  bottom: 0;
  width: 14%;
  border: 1px solid rgba(255, 220, 210, .5);
  border-bottom: 0;
  background: rgba(40, 14, 14, .6);
}
.hb-vc11-frame[data-door="l"]::after { left: 4%; }
.hb-vc11-frame[data-door="r"]::after { right: 4%; }
.hb-vc11-subject {
  position: absolute;
  left: 50%;
  bottom: 37.4%;
  width: 5cqi;
  min-width: 34px;
  transform: translateX(-50%);
  filter: drop-shadow(0 0 24px rgba(255, 80, 80, .35));
}
.hb-vc11-subject svg { display: block; width: 100%; height: auto; }
.hb-vc11-shade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(0deg, rgba(8, 4, 4, .92), transparent 42%), radial-gradient(80% 80% at 50% 46%, transparent 50%, rgba(0, 0, 0, .6));
}
.hb-vc11-copy {
  position: absolute;
  left: clamp(20px, 5cqi, 56px);
  bottom: clamp(26px, 5cqi, 52px);
  z-index: 3;
  max-width: 520px;
  padding-right: 20px;
}
.hb-vc11-kicker {
  margin: 0 0 12px;
  color: var(--hb-vc11-accent);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: .3em;
  text-transform: uppercase;
}
.hb-vc11-title {
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(34px, 6.4cqi, 80px);
  font-weight: 700;
  line-height: .94;
  letter-spacing: -.04em;
}
.hb-vc11-sub {
  max-width: 420px;
  margin: 14px 0 0;
  color: rgba(251, 238, 238, .72);
  font-size: clamp(13.5px, 1.6cqi, 15.5px);
  line-height: 1.55;
}
.hb-vc11-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  margin-top: 20px;
  padding: 0 20px;
  border-radius: 999px;
  background: #fbeeee;
  color: #120808;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: transform .2s ease, background .25s ease;
}
.hb-vc11-cta:hover { background: #ffffff; }
.hb-vc11-cta:active { transform: scale(.97); }
.hb-vc11-cta:focus-visible { outline: 2px solid var(--hb-vc11-accent); outline-offset: 3px; }
.hb-vc11-hud {
  position: absolute;
  top: 18px;
  right: clamp(16px, 3cqi, 30px);
  z-index: 3;
  display: grid;
  grid-template-columns: auto auto;
  gap: 6px 16px;
  padding: 12px 14px;
  border: 1px solid rgba(251, 238, 238, .14);
  border-radius: 12px;
  background: rgba(14, 8, 8, .55);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
}
.hb-vc11-k { margin: 0; color: rgba(251, 238, 238, .5); }
.hb-vc11-v { margin: 0; color: #fbeeee; text-align: right; font-variant-numeric: tabular-nums; }
.hb-vc11-meter {
  grid-column: 1 / -1;
  position: relative;
  height: 3px;
  margin-top: 4px;
  border-radius: 3px;
  background: rgba(251, 238, 238, .14);
  overflow: hidden;
}
.hb-vc11-meter span {
  position: absolute;
  inset: 0;
  background: var(--hb-vc11-accent);
  transform-origin: left;
}
`;

const Z_SUBJECT = 5;
const K = 0.36;

export function CinemaDollyZoom({
  kicker = "Chapter four",
  title = "The hallway keeps getting longer",
  subtitle = "Nothing in the house moves. Only the distance between you and the door at the end.",
  cta = { label: "Continue the story", href: "#" },
  progress,
  autoPlay = true,
  duration = 7,
  frames = 14,
  accent = "#ff4d4d",
  headingAs = "h1",
  className,
  style,
  ...rest
}: CinemaDollyZoomProps) {
  const Heading = headingAs;
  const rootRef = React.useRef<HTMLElement>(null);
  const frameRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const focalRef = React.useRef<HTMLSpanElement>(null);
  const dollyRef = React.useRef<HTMLSpanElement>(null);
  const meterRef = React.useRef<HTMLSpanElement>(null);
  const count = Math.max(6, Math.min(24, Math.round(frames)));
  const depths = React.useMemo(() => Array.from({ length: count }, (_, i) => 0.4 + i * 0.9), [count]);
  const behind = depths.filter((z) => z > Z_SUBJECT).length;

  const apply = React.useCallback(
    (p: number) => {
      const d = 0.5 + p * 7.5;
      depths.forEach((z, i) => {
        const el = frameRefs.current[i];
        if (!el) return;
        const s = (K * (d + Z_SUBJECT)) / (d + z);
        el.style.transform = `scale(${s.toFixed(4)})`;
        el.style.opacity = Math.max(0.08, 1 - z / 14).toFixed(3);
      });
      if (focalRef.current) focalRef.current.textContent = `${Math.round(18 + p * 117)} mm`;
      if (dollyRef.current) dollyRef.current.textContent = `${d.toFixed(1)} m`;
      if (meterRef.current) meterRef.current.style.transform = `scaleX(${p.toFixed(3)})`;
    },
    [depths],
  );

  React.useEffect(() => {
    if (progress !== undefined) {
      apply(Math.max(0, Math.min(1, progress)));
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!autoPlay || reduce) {
      apply(reduce ? 1 : 0);
      return;
    }
    let raf = 0;
    let visible = true;
    let elapsed = 0;
    let last = 0;
    const el = rootRef.current;
    const io = el
      ? new IntersectionObserver((entries) => {
          visible = entries[0]?.isIntersecting ?? true;
        })
      : null;
    if (el && io) io.observe(el);
    const loop = (now: number) => {
      if (last && visible) elapsed += (now - last) / 1000;
      last = now;
      const cycle = (elapsed / duration) % 2;
      const k = cycle < 1 ? cycle : 2 - cycle;
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      apply(e);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [progress, autoPlay, duration, apply]);

  const vars = { "--hb-vc11-accent": accent, ...style } as React.CSSProperties;
  const order = depths.map((z, i) => ({ z, i })).reverse();

  const frameEl = (z: number, i: number) => {
    const h = Math.imul(i + 3, 2654435761) >>> 0;
    const s0 = (K * (0.5 + Z_SUBJECT)) / (0.5 + z);
    return (
      <div
        key={i}
        ref={(node) => {
          frameRefs.current[i] = node;
        }}
        className="hb-vc11-frame"
        data-lamp={i % 2 === 0 ? "" : undefined}
        data-door={h % 3 === 0 ? "l" : h % 3 === 1 ? "r" : undefined}
        style={{ transform: `scale(${s0.toFixed(4)})`, opacity: Math.max(0.08, 1 - z / 14).toFixed(3) }}
      />
    );
  };

  return (
    <section ref={rootRef} className={["hb-vc11", className].filter(Boolean).join(" ")} style={vars} {...rest}>
      <style href="hb-cinema-dolly-zoom" precedence="default">{css}</style>
      <div className="hb-vc11-hall" aria-hidden="true">
        <svg className="hb-vc11-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L50 46 M100 100 L50 46 M0 0 L50 46 M100 0 L50 46" stroke="#ffd8cc" strokeWidth=".15" vectorEffect="non-scaling-stroke" fill="none" />
        </svg>
        {order.slice(0, behind).map(({ z, i }) => frameEl(z, i))}
        <div className="hb-vc11-subject">
          <svg viewBox="0 0 40 110">
            <circle cx="20" cy="10" r="8" fill="#0d0505" />
            <path d="M8 22 C8 19 12 18 20 18 C28 18 32 19 32 22 L34 62 L29 62 L28 108 L22 108 L20 70 L18 108 L12 108 L11 62 L6 62Z" fill="#0d0505" />
            <path d="M8 22 C8 19 12 18 20 18 C28 18 32 19 32 22" stroke="#ff8a7a" strokeWidth="1" fill="none" opacity=".6" />
          </svg>
        </div>
        {order.slice(behind).map(({ z, i }) => frameEl(z, i))}
      </div>
      <div className="hb-vc11-shade" aria-hidden="true" />
      <div className="hb-vc11-hud" aria-hidden="true">
        <span className="hb-vc11-k">Focal</span>
        <span className="hb-vc11-v" ref={focalRef}>18 mm</span>
        <span className="hb-vc11-k">Dolly</span>
        <span className="hb-vc11-v" ref={dollyRef}>0.5 m</span>
        <span className="hb-vc11-meter"><span ref={meterRef} style={{ transform: "scaleX(0)" }} /></span>
      </div>
      <div className="hb-vc11-copy">
        {kicker ? <p className="hb-vc11-kicker">{kicker}</p> : null}
        <Heading className="hb-vc11-title">{title}</Heading>
        {subtitle ? <p className="hb-vc11-sub">{subtitle}</p> : null}
        {cta ? (
          <a className="hb-vc11-cta" href={cta.href}>
            {cta.label}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        ) : null}
      </div>
    </section>
  );
}
