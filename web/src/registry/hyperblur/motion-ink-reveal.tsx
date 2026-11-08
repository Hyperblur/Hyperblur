"use client";

import * as React from "react";

export interface MotionInkRevealProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  caption?: string;
  hint?: string;
  inkColor?: string;
  turbulence?: number;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
}

const BLOBS = [
  { x: 380, y: 300, r: 420, d: 0 },
  { x: 860, y: 470, r: 380, d: 0.12 },
  { x: 140, y: 620, r: 300, d: 0.24 },
  { x: 1080, y: 140, r: 320, d: 0.3 },
  { x: 620, y: 700, r: 300, d: 0.38 },
  { x: 120, y: 90, r: 260, d: 0.46 },
  { x: 640, y: 380, r: 640, d: 0.55 },
];

const LINES = Array.from({ length: 16 }, (_, i) => {
  const y = 492 + i * i * 1.05 + i * 6;
  const w = 380 - i * 14 + ((i * 37) % 50);
  return { y: y.toFixed(1), x: (820 - w / 2).toFixed(1), w: Math.max(40, w).toFixed(1), o: (0.75 - i * 0.04).toFixed(2) };
});

const css = `
.hb-wh9 {
  --hb-wh9-a: #ffb27a;
  --hb-wh9-p: 0;
  position: relative;
  width: 100%;
  height: var(--hb-wh9-h);
  color: #fff;
  font-family: inherit;
  background: #0b0b0b;
}
.hb-wh9[data-pinned="true"] { height: calc(var(--hb-wh9-h) * var(--hb-wh9-len)); }
.hb-wh9 *, .hb-wh9 *::before, .hb-wh9 *::after { box-sizing: border-box; }
.hb-wh9-stage {
  position: sticky;
  top: 0;
  height: var(--hb-wh9-h);
  overflow: hidden;
  container-type: size;
  background-color: #0c0c0c;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: clamp(16px, 4cqw, 44px) clamp(16px, 4cqw, 44px);
}
.hb-wh9-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.hb-wh9-hint {
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55em;
  transform: translate(-50%, -50%);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(8px, 1.4cqw, 13px);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #6f6f6f;
  opacity: clamp(0, calc(1 - var(--hb-wh9-p) * 6), 1);
  pointer-events: none;
}
.hb-wh9-hint i {
  width: clamp(18px, 3cqw, 30px);
  height: clamp(18px, 3cqw, 30px);
  border-radius: 50%;
  border: 1px dashed #4a4a4a;
  animation: hb-wh9-spin 6s linear infinite;
}
@keyframes hb-wh9-spin { to { transform: rotate(360deg); } }
.hb-wh9-copy {
  position: absolute;
  left: max(14px, 5cqw);
  top: max(12px, 7cqh);
  max-width: 70cqw;
  opacity: clamp(0, calc((var(--hb-wh9-p) - 0.55) * 3.2), 1);
  transform: translateY(calc((1 - clamp(0, calc((var(--hb-wh9-p) - 0.55) * 3.2), 1)) * 14px));
  pointer-events: none;
}
.hb-wh9-eyebrow {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(7px, 1.3cqw, 12px);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 238, 222, 0.78);
}
.hb-wh9-title {
  margin: 0.3em 0 0;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(16px, min(6cqw, 10cqh), 88px);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.04em;
  color: #fff8f0;
  text-shadow: 0 2px 30px rgba(40, 10, 30, 0.45);
}
.hb-wh9-meta {
  position: absolute;
  right: max(14px, 5cqw);
  bottom: max(10px, 6cqh);
  display: flex;
  align-items: center;
  gap: 0.9em;
  padding: 0.45em 0.8em;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(10, 10, 14, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(7px, 1.2cqw, 12px);
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, 0.72);
}
.hb-wh9-meta b { font-weight: 500; color: var(--hb-wh9-a); }
@media (prefers-reduced-motion: reduce) {
  .hb-wh9-hint i { animation: none; }
}
`;

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function inOut(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function outCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function findScroller(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    const oy = getComputedStyle(node).overflowY;
    if ((oy === "auto" || oy === "scroll" || oy === "overlay") && node.scrollHeight > node.clientHeight + 1) return node;
    node = node.parentElement;
  }
  return null;
}

function loopAt(ms: number, duration: number) {
  const d = Math.max(1, duration) * 1000;
  const back = d * 0.45;
  const hold = 1800;
  const t = ms % (d + hold + back + 700);
  if (t < d) return t / d;
  if (t < d + hold) return 1;
  if (t < d + hold + back) return 1 - inOut((t - d - hold) / back);
  return 0;
}

function useProgress(
  ref: React.RefObject<HTMLElement | null>,
  apply: (p: number) => void,
  progress: number | undefined,
  autoPlay: boolean,
  duration: number,
) {
  const applyRef = React.useRef(apply);
  React.useLayoutEffect(() => {
    applyRef.current = apply;
  });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = (p: number) => applyRef.current(clamp01(p));
    if (typeof progress === "number") {
      run(progress);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      run(1);
      return;
    }
    let raf = 0;
    if (autoPlay) {
      let visible = true;
      let last = 0;
      let t = 0;
      const io = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      });
      io.observe(el);
      const loop = (now: number) => {
        const dt = last ? Math.min(64, now - last) : 0;
        last = now;
        if (visible) {
          t += dt;
          run(loopAt(t, duration));
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
      };
    }
    const sc = findScroller(el);
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const top = sc ? r.top - sc.getBoundingClientRect().top : r.top;
      const vh = sc ? sc.clientHeight : window.innerHeight;
      const span = r.height - vh;
      run(span > 1 ? -top / span : (vh - top) / (vh + r.height));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    const target: HTMLElement | Window = sc ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, progress, autoPlay, duration]);
}

function radius(p: number, i: number) {
  const b = BLOBS[i];
  return b.r * outCubic(clamp01((p - b.d) / 0.42));
}

function ringOpacity(p: number) {
  return 0.6 * clamp01(p * 8) * (1 - clamp01((p - 0.55) / 0.35));
}

export function MotionInkReveal({
  eyebrow = "Field notes · Lofoten",
  title = "Light at 21:40",
  caption = "f/2.8 · 1/60s · ISO 400",
  hint = "Scroll to develop",
  inkColor = "#ffb27a",
  turbulence = 1,
  accent = "#ffb27a",
  progress,
  autoPlay = false,
  duration = 5,
  length = 3,
  height = "100vh",
  className,
  style,
  ...rest
}: MotionInkRevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const fills = React.useRef<(SVGCircleElement | null)[]>([]);
  const rings = React.useRef<(SVGCircleElement | null)[]>([]);
  const pctRef = React.useRef<HTMLElement>(null);
  const ringGroup = React.useRef<SVGGElement>(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const pinned = progress === undefined && !autoPlay;
  const start = typeof progress === "number" ? clamp01(progress) : 0;
  const scale = (60 * Math.max(0, turbulence)).toFixed(1);

  useProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--hb-wh9-p", p.toFixed(4));
      for (let i = 0; i < BLOBS.length; i++) {
        const r = radius(p, i).toFixed(1);
        fills.current[i]?.setAttribute("r", r);
        rings.current[i]?.setAttribute("r", r);
      }
      ringGroup.current?.setAttribute("opacity", ringOpacity(p).toFixed(3));
      if (pctRef.current) pctRef.current.textContent = `${Math.round(clamp01(p / 0.97) * 100)}%`;
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-wh9", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={
        {
          "--hb-wh9-a": accent,
          "--hb-wh9-h": height,
          "--hb-wh9-len": length,
          "--hb-wh9-p": start,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-motion-ink-reveal" precedence="default">{css}</style>
      <div className="hb-wh9-stage">
        {hint ? (
          <div className="hb-wh9-hint" aria-hidden="true">
            <i />
            <span>{hint}</span>
          </div>
        ) : null}
        <svg className="hb-wh9-svg" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${title}. ${caption}`}>
          <defs>
            <filter id={`${uid}-ink`} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale={scale} xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <mask id={`${uid}-m`} maskUnits="userSpaceOnUse" x="-100" y="-100" width="1400" height="960">
              <rect x="-100" y="-100" width="1400" height="960" fill="#000" />
              <g filter={`url(#${uid}-ink)`}>
                {BLOBS.map((b, i) => (
                  <circle
                    key={i}
                    ref={(node) => {
                      fills.current[i] = node;
                    }}
                    cx={b.x}
                    cy={b.y}
                    r={radius(start, i).toFixed(1)}
                    fill="#fff"
                  />
                ))}
              </g>
            </mask>
            <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#101a3a" />
              <stop offset="0.42" stopColor="#5a3f78" />
              <stop offset="0.6" stopColor="#e47f6c" />
              <stop offset="0.66" stopColor="#ffcf96" />
            </linearGradient>
            <linearGradient id={`${uid}-sea`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c76f6a" />
              <stop offset="0.25" stopColor="#4b3463" />
              <stop offset="1" stopColor="#0d0e22" />
            </linearGradient>
            <radialGradient id={`${uid}-sun`}>
              <stop offset="0" stopColor="#fff1d6" stopOpacity="0.95" />
              <stop offset="0.25" stopColor="#ffc98d" stopOpacity="0.6" />
              <stop offset="1" stopColor="#ff9a6b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g mask={`url(#${uid}-m)`}>
            <rect x="-100" y="-100" width="1400" height="580" fill={`url(#${uid}-sky)`} />
            <circle cx="820" cy="430" r="260" fill={`url(#${uid}-sun)`} />
            <circle cx="820" cy="452" r="52" fill="#fff0d8" />
            <path d="M-100 480 L80 330 L190 400 L330 250 L470 390 L560 340 L700 470 L-100 480Z" fill="#3a2f57" />
            <path d="M520 480 L690 360 L780 410 L930 290 L1060 400 L1150 350 L1300 440 L1300 480Z" fill="#33294e" />
            <path d="M-100 480 L120 420 L260 455 L400 405 L520 470 L-100 480Z" fill="#221c3a" />
            <rect x="-100" y="478" width="1400" height="380" fill={`url(#${uid}-sea)`} />
            {LINES.map((l, i) => (
              <rect key={i} x={l.x} y={l.y} width={l.w} height="2.4" rx="1.2" fill="#ffd9a8" opacity={l.o} />
            ))}
            <path d="M-100 760 L-100 600 C 80 590 200 640 330 660 C 420 672 470 700 520 760Z" fill="#0b0a18" />
            <rect x="196" y="606" width="54" height="34" fill="#0b0a18" />
            <path d="M190 608 L223 584 L256 608Z" fill="#0b0a18" />
            <rect x="214" y="616" width="10" height="10" fill="#ffc77d" />
            <path d="M960 560 l60 0 l-10 10 l-42 0Z" fill="#14122a" />
            <rect x="986" y="534" width="2.5" height="26" fill="#14122a" />
            <path d="M988.5 536 l16 20 l-16 0Z" fill="#1d1a36" />
          </g>
          <g ref={ringGroup} filter={`url(#${uid}-ink)`} opacity={ringOpacity(start).toFixed(3)}>
            {BLOBS.map((b, i) => (
              <circle
                key={i}
                ref={(node) => {
                  rings.current[i] = node;
                }}
                cx={b.x}
                cy={b.y}
                r={radius(start, i).toFixed(1)}
                fill="none"
                stroke={inkColor}
                strokeWidth="2"
              />
            ))}
          </g>
        </svg>
        <div className="hb-wh9-copy">
          <div className="hb-wh9-eyebrow">{eyebrow}</div>
          <h2 className="hb-wh9-title">{title}</h2>
        </div>
        <div className="hb-wh9-meta" aria-hidden="true">
          <span>{caption}</span>
          <b ref={pctRef}>{`${Math.round(clamp01(start / 0.97) * 100)}%`}</b>
        </div>
      </div>
    </section>
  );
}
