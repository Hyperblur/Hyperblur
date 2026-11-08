"use client";

import * as React from "react";

export interface MotionCutoutRevealProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  hint?: string;
  layers?: [string, string, string, string, string];
  sky?: [string, string, string];
  sun?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
}

const W = 1200;
const BASE = [400, 470, 540, 610, 680];
const AMP = [70, 58, 46, 38, 30];
const STEPS = [9, 11, 8, 13, 10];

function hash(n: number) {
  let x = (n + 1) * 2654435761;
  x = Math.imul(x ^ (x >>> 15), 2246822519);
  x = Math.imul(x ^ (x >>> 13), 3266489917);
  return (x ^ (x >>> 16)) >>> 0;
}

function ridge(layer: number) {
  const count = STEPS[layer];
  const pts: [number, number][] = [];
  for (let i = 0; i <= count; i++) {
    const x = (i / count) * (W + 80) - 40;
    const h = hash(layer * 31 + i) / 4294967295;
    const wave = Math.sin(i * 1.7 + layer * 2.1) * 0.5 + 0.5;
    pts.push([x, BASE[layer] - AMP[layer] * (0.25 + 0.75 * (h * 0.6 + wave * 0.4))]);
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[Math.max(0, i - 1)];
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const [x3, y3] = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  d += ` L${W + 40} 1900 L-40 1900 Z`;
  return d;
}

const RIDGES = BASE.map((_, i) => ridge(i));

const STARS = Array.from({ length: 34 }, (_, i) => {
  const h = hash(i + 500);
  return { x: (h % 1200).toFixed(0), y: (((h >>> 11) % 300) + 20).toFixed(0), r: (((h >>> 22) % 3) * 0.5 + 0.8).toFixed(1) };
});

const css = `
.hb-wh6 {
  position: relative;
  width: 100%;
  height: var(--hb-wh6-h);
  color: #fff;
  font-family: inherit;
  background: #0b0a1c;
}
.hb-wh6[data-pinned="true"] { height: calc(var(--hb-wh6-h) * var(--hb-wh6-len)); }
.hb-wh6 *, .hb-wh6 *::before, .hb-wh6 *::after { box-sizing: border-box; }
.hb-wh6-stage {
  position: sticky;
  top: 0;
  height: var(--hb-wh6-h);
  overflow: hidden;
  container-type: size;
  isolation: isolate;
}
.hb-wh6-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.hb-wh6-stars { opacity: calc(0.9 - var(--hb-wh6-p) * 0.6); }
.hb-wh6-fill { filter: drop-shadow(0 -10px 18px rgba(4, 3, 18, 0.55)); }
.hb-wh6-copy {
  position: absolute;
  left: 0;
  right: 0;
  top: 8cqh;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 6cqw;
  text-align: center;
  opacity: clamp(0, calc((var(--hb-wh6-p) - 0.45) * 3), 1);
  transform: translateY(calc((1 - clamp(0, calc((var(--hb-wh6-p) - 0.45) * 2.2), 1)) * 24px));
}
.hb-wh6-eyebrow {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(7px, 1.3cqw, 12px);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 236, 220, 0.75);
}
.hb-wh6-title {
  margin: 0.35em 0 0;
  max-width: 18ch;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(16px, min(6cqw, 9cqh), 84px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.035em;
  color: #fff7ef;
  text-shadow: 0 2px 24px rgba(60, 20, 60, 0.45);
}
.hb-wh6-hint {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6em;
  transform: translate(-50%, -50%);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(8px, 1.4cqw, 13px);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.6);
  opacity: clamp(0, calc(1 - var(--hb-wh6-p) * 5), 1);
  pointer-events: none;
}
.hb-wh6-hint i {
  width: 1px;
  height: 2.6em;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), transparent);
}
`;

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function inOut(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
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
  const back = d * 0.6;
  const hold = 1600;
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

function layerShift(p: number, i: number) {
  const e = inOut(clamp01((p - (4 - i) * 0.1) / 0.55));
  return -(BASE[i] + 40) * (1 - e);
}

export function MotionCutoutReveal({
  eyebrow = "Trail guide · Autumn 2027",
  title = "Five ridges between you and the coast",
  hint = "Scroll to open",
  layers = ["#5b4a8c", "#40356f", "#2c2554", "#1d183d", "#110e27"],
  sky = ["#1c1742", "#7a4f93", "#ffad7a"],
  sun = "#ffd7a8",
  progress,
  autoPlay = false,
  duration = 5,
  length = 3,
  height = "100vh",
  className,
  style,
  ...rest
}: MotionCutoutRevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const groups = React.useRef<(SVGGElement | null)[]>([]);
  const sunRef = React.useRef<SVGGElement>(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const pinned = progress === undefined && !autoPlay;
  const start = typeof progress === "number" ? clamp01(progress) : 0;

  useProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--hb-wh6-p", p.toFixed(4));
      groups.current.forEach((g, i) => {
        if (g) g.setAttribute("transform", `translate(0 ${layerShift(p, i).toFixed(1)})`);
      });
      if (sunRef.current) sunRef.current.setAttribute("transform", `translate(0 ${(220 * (1 - inOut(clamp01((p - 0.3) / 0.7)))).toFixed(1)})`);
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-wh6", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={
        {
          "--hb-wh6-h": height,
          "--hb-wh6-len": length,
          "--hb-wh6-p": start,
          background: layers[4],
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-motion-cutout-reveal" precedence="default">{css}</style>
      <div className="hb-wh6-stage">
        <svg className="hb-wh6-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={sky[0]} />
              <stop offset="0.55" stopColor={sky[1]} />
              <stop offset="0.85" stopColor={sky[2]} />
            </linearGradient>
            <radialGradient id={`${uid}-sun`}>
              <stop offset="0" stopColor={sun} stopOpacity="0.9" />
              <stop offset="1" stopColor={sun} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="-200" y="-400" width="1600" height="1400" fill={`url(#${uid}-sky)`} />
          <g className="hb-wh6-stars">
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity="0.7" />
            ))}
          </g>
          <g ref={sunRef} transform={`translate(0 ${(220 * (1 - inOut(clamp01((start - 0.3) / 0.7)))).toFixed(1)})`}>
            <circle cx="600" cy="420" r="230" fill={`url(#${uid}-sun)`} />
            <circle cx="600" cy="420" r="78" fill={sun} />
          </g>
        </svg>
        <div className="hb-wh6-copy">
          <span className="hb-wh6-eyebrow">{eyebrow}</span>
          <h2 className="hb-wh6-title">{title}</h2>
        </div>
        <svg className="hb-wh6-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true" style={{ zIndex: 2 }}>
          {RIDGES.map((d, i) => (
            <g
              key={i}
              className="hb-wh6-layer"
              ref={(node) => {
                groups.current[i] = node;
              }}
              transform={`translate(0 ${layerShift(start, i).toFixed(1)})`}
            >
              <path className="hb-wh6-fill" d={d} fill={layers[i]} />
              <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
        {hint ? (
          <div className="hb-wh6-hint" aria-hidden="true">
            <span>{hint}</span>
            <i />
          </div>
        ) : null}
      </div>
    </section>
  );
}
