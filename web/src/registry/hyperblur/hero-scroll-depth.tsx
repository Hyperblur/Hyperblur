"use client";

import * as React from "react";

export interface HeroScrollDepthLink {
  label: string;
  href: string;
}

export interface HeroScrollDepthProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  brand?: string;
  eyebrow?: string;
  title?: string;
  summary?: string;
  stats?: { value: string; label: string }[];
  cta?: HeroScrollDepthLink | null;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const defaultStats = [
  { value: "7", label: "days" },
  { value: "6", label: "mountain huts" },
  { value: "82 km", label: "Alta Via 1" },
];

const pines = (x0: number, base: number, count: number, size: number, seed: number) => {
  let d = "";
  for (let i = 0; i < count; i++) {
    let h = Math.imul((i + seed) * 374761393, 668265263) >>> 0;
    h = (h ^ (h >>> 13)) >>> 0;
    const s = size * (0.7 + ((h % 1000) / 1000) * 0.6);
    const x = x0 + i * size * 0.55 + ((h >>> 10) % 20) - 10;
    const top = base - s * 2.4;
    d += `M${x.toFixed(1)} ${top.toFixed(1)}L${(x + s * 0.5).toFixed(1)} ${(base - s * 1.5).toFixed(1)}L${(x + s * 0.28).toFixed(1)} ${(base - s * 1.5).toFixed(1)}L${(x + s * 0.75).toFixed(1)} ${(base - s * 0.6).toFixed(1)}L${(x + s * 0.12).toFixed(1)} ${(base - s * 0.6).toFixed(1)}L${(x + s * 0.12).toFixed(1)} ${base}L${(x - s * 0.12).toFixed(1)} ${base}L${(x - s * 0.12).toFixed(1)} ${(base - s * 0.6).toFixed(1)}L${(x - s * 0.75).toFixed(1)} ${(base - s * 0.6).toFixed(1)}L${(x - s * 0.28).toFixed(1)} ${(base - s * 1.5).toFixed(1)}L${(x - s * 0.5).toFixed(1)} ${(base - s * 1.5).toFixed(1)}Z`;
  }
  return d;
};

const farPeaks = "M0 700V420L80 380L150 400L240 330L310 372L390 318L470 360L560 300L640 352L720 326L800 368L880 312L960 356L1050 330L1130 372L1200 350V700Z";
const midPeaks =
  "M0 700V470L60 452L110 380L130 386L160 300L178 310L196 268L214 318L240 330L290 420L360 440L420 360L436 366L458 286L474 296L490 250L506 282L530 300L560 380L640 430L720 400L760 330L778 336L800 262L818 272L838 236L854 270L880 300L930 410L1000 440L1060 380L1090 330L1110 340L1140 300L1170 380L1200 400V700Z";
const hills = "M0 700V520C120 490 220 500 320 520C430 540 520 500 640 494C760 488 860 520 980 512C1080 506 1150 490 1200 496V700Z";
const hillTrees = pines(-10, 528, 38, 34, 3);
const frontLeft = pines(-60, 720, 6, 150, 11);
const frontRight = pines(960, 720, 6, 150, 23);

const css = `
.hb-va12 {
  --hb-va12-accent: #ffb37a;
  --hb-va12-p: 0;
  --hb-va12-o: 0;
  position: relative;
  width: 100%;
  height: var(--hb-va12-h);
  color: #fff;
  font-family: inherit;
  background: #0f1022;
}
.hb-va12[data-pinned="true"] { height: calc(var(--hb-va12-h) * var(--hb-va12-len)); }
.hb-va12 *, .hb-va12 *::before, .hb-va12 *::after { box-sizing: border-box; }
.hb-va12-stage {
  position: sticky;
  top: 0;
  height: var(--hb-va12-h);
  overflow: hidden;
  container-type: size;
  isolation: isolate;
}
.hb-va12-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform-origin: 50% 100%;
  transform: translateY(calc(var(--hb-va12-p) * var(--hb-va12-ty))) scale(calc(1 + var(--hb-va12-p) * var(--hb-va12-z)));
  will-change: transform;
  pointer-events: none;
}
.hb-va12-sky {
  background:
    radial-gradient(9cqw 9cqw at 62% 52%, #fff2d8, color-mix(in srgb, var(--hb-va12-accent) 80%, #fff) 30%, transparent 62%),
    radial-gradient(60% 40% at 62% 58%, color-mix(in srgb, var(--hb-va12-accent) 55%, transparent), transparent 70%),
    linear-gradient(180deg, #14173a 0%, #2b2d63 30%, #8a5a8a 52%, #f0a674 66%, #f6c79a 74%);
}
.hb-va12-fog {
  position: absolute;
  inset: 52% -10% 18%;
  background: linear-gradient(180deg, transparent, rgba(255, 226, 214, 0.32) 50%, transparent);
  filter: blur(8px);
  transform: translateX(calc(var(--hb-va12-p) * -6cqw));
  pointer-events: none;
}
.hb-va12-copy {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 36cqh;
  text-align: center;
  transform: translateY(calc(var(--hb-va12-p) * -16cqh)) scale(calc(1 + var(--hb-va12-p) * 0.18));
  opacity: calc(1 - var(--hb-va12-p) * 0.6);
  will-change: transform;
}
.hb-va12-eyebrow {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.15cqw, 13px);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 240, 225, 0.8);
}
.hb-va12-title {
  margin: 0.25em 0 0;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(3rem, 15cqw, 14rem);
  font-weight: 700;
  line-height: 0.85;
  letter-spacing: -0.06em;
  color: #fff7ee;
  text-shadow: 0 10px 50px rgba(40, 20, 60, 0.35);
}
.hb-va12-bar {
  position: absolute;
  inset: 0 0 auto;
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.6cqh 4cqw;
  font-size: clamp(11px, 1.3cqw, 14px);
}
.hb-va12-brand { display: inline-flex; align-items: center; gap: 0.5em; font-weight: 700; letter-spacing: -0.01em; }
.hb-va12-brand svg { width: 1.3em; height: 1.3em; }
.hb-va12-nav { display: flex; gap: 1.6em; color: rgba(255, 255, 255, 0.72); }
.hb-va12-final {
  position: absolute;
  inset: auto 4cqw 6cqh;
  z-index: 6;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  opacity: var(--hb-va12-o);
  transform: translateY(calc((1 - var(--hb-va12-o)) * 24px));
  pointer-events: none;
}
.hb-va12[data-final="true"] .hb-va12-final { pointer-events: auto; }
.hb-va12-summary {
  max-width: 30ch;
  margin: 0;
  font-size: clamp(13px, 1.8cqw, 20px);
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: -0.015em;
}
.hb-va12-stats { display: flex; gap: 2.4cqw; margin-top: 1em; }
.hb-va12-stats div { font-size: clamp(10px, 1.15cqw, 13px); color: rgba(255, 255, 255, 0.6); }
.hb-va12-stats b { display: block; font-size: 1.7em; font-weight: 600; letter-spacing: -0.03em; color: #fff; }
.hb-va12-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.8em 1.4em;
  border-radius: 999px;
  background: var(--hb-va12-accent);
  color: #2a1406;
  font-size: clamp(12px, 1.4cqw, 15px);
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 14px 34px -12px var(--hb-va12-accent);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
}
.hb-va12-cta:hover { transform: translateY(-1px); filter: brightness(1.06); }
.hb-va12-cta:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
@media (max-width: 640px) {
  .hb-va12-nav { display: none; }
  .hb-va12-final { flex-direction: column; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-va12-cta { transition: none; }
}
`;

function findScroller(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    const oy = getComputedStyle(node).overflowY;
    if ((oy === "auto" || oy === "scroll" || oy === "overlay") && node.scrollHeight > node.clientHeight + 1) return node;
    node = node.parentElement;
  }
  return null;
}

function ease(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function loopAt(ms: number, duration: number) {
  const d = Math.max(1, duration) * 1000;
  const back = d * 0.7;
  const hold = 1400;
  const t = ms % (d + hold + back + 700);
  if (t < d) return ease(t / d);
  if (t < d + hold) return 1;
  if (t < d + hold + back) return 1 - ease((t - d - hold) / back);
  return 0;
}

function useScrollProgress(
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

function layerStyle(ty: string, z: number): React.CSSProperties {
  return { "--hb-va12-ty": ty, "--hb-va12-z": z } as React.CSSProperties;
}

export function HeroScrollDepth({
  brand = "Trailhead",
  eyebrow = "Hut-to-hut trekking · Dolomites",
  title = "Go higher",
  summary = "A guided week on the Alta Via 1, from Lago di Braies to Belluno, sleeping in mountain huts every night.",
  stats = defaultStats,
  cta = { label: "Plan your trek", href: "#" },
  accent = "#ffb37a",
  progress,
  autoPlay = false,
  duration = 6,
  length = 3,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollDepthProps) {
  const ref = React.useRef<HTMLElement>(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;

  useScrollProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--hb-va12-p", ease(clamp01(p / 0.85)).toFixed(4));
      const o = ease(clamp01((p - 0.66) / 0.28));
      el.style.setProperty("--hb-va12-o", o.toFixed(4));
      el.dataset.final = o > 0.5 ? "true" : "false";
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-va12", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={{ "--hb-va12-accent": accent, "--hb-va12-h": height, "--hb-va12-len": length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-hero-scroll-depth" precedence="default">{css}</style>
      <div className="hb-va12-stage">
        <div className="hb-va12-layer hb-va12-sky" style={layerStyle("-3cqh", 0.04)} aria-hidden="true" />
        <svg className="hb-va12-layer" style={layerStyle("-2cqh", 0.1)} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path d={farPeaks} fill="#9a8db3" opacity="0.75" />
        </svg>
        <svg className="hb-va12-layer" style={layerStyle("0cqh", 0.22)} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}m`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6c5f91" />
              <stop offset="0.6" stopColor="#3f3a6a" />
            </linearGradient>
          </defs>
          <path d={midPeaks} fill={`url(#${uid}m)`} />
          <path d="M196 268L214 318L200 312L190 290Z M490 250L506 282L494 280L484 262Z M838 236L854 270L842 266L832 250Z" fill="#f6c79a" opacity="0.55" />
        </svg>
        <div className="hb-va12-copy">
          <span className="hb-va12-eyebrow">{eyebrow}</span>
          <Heading className="hb-va12-title">{title}</Heading>
        </div>
        <div className="hb-va12-fog" aria-hidden="true" />
        <svg className="hb-va12-layer" style={layerStyle("6cqh", 0.55)} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path d={hills} fill="#26264a" />
          <path d={hillTrees} fill="#1c1c3a" />
          <rect x="0" y="560" width="1200" height="140" fill="#1c1c3a" />
        </svg>
        <svg className="hb-va12-layer" style={layerStyle("26cqh", 1.5)} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path d={frontLeft} fill="#0c0d1c" />
          <path d={frontRight} fill="#0c0d1c" />
          <path d="M0 700V660C200 640 400 650 600 668C800 650 1000 640 1200 660V700Z" fill="#0c0d1c" />
        </svg>
        <div className="hb-va12-bar">
          <span className="hb-va12-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 20L9 8l4 6 3-4 6 10z" />
            </svg>
            {brand}
          </span>
          <span className="hb-va12-nav" aria-hidden="true">
            <span>Treks</span>
            <span>Huts</span>
            <span>Guides</span>
          </span>
        </div>
        <div className="hb-va12-final">
          <div>
            {summary ? <p className="hb-va12-summary">{summary}</p> : null}
            {stats.length ? (
              <div className="hb-va12-stats">
                {stats.map((s) => (
                  <div key={s.label}>
                    <b>{s.value}</b>
                    {s.label}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {cta ? (
            <a className="hb-va12-cta" href={cta.href}>
              {cta.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
