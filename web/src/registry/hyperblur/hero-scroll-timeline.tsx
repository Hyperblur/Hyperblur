"use client";

import * as React from "react";

export interface HeroScrollTimelineLink {
  label: string;
  href: string;
}

export interface HeroScrollTimelineMilestone {
  year: number;
  title: string;
  text: string;
  count: number;
}

export interface HeroScrollTimelineProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  countLabel?: string;
  milestones?: HeroScrollTimelineMilestone[];
  cta?: HeroScrollTimelineLink | null;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const defaultMilestones: HeroScrollTimelineMilestone[] = [
  { year: 2019, title: "First install", text: "Twelve panels on a garage in Fresno.", count: 1 },
  { year: 2020, title: "Home batteries", text: "Every system ships with storage.", count: 140 },
  { year: 2022, title: "1,000 homes", text: "Crews in four California counties.", count: 1000 },
  { year: 2023, title: "Community solar", text: "Renters can finally join in.", count: 6500 },
  { year: 2025, title: "Virtual power plant", text: "Homes sell power back at peak.", count: 18000 },
  { year: 2027, title: "40,000 rooftops", text: "And 312 MW of clean capacity.", count: 40000 },
];

const W = 100;
const H = 140;
const SAMPLES = 160;

const curve = (() => {
  const pts: { x: number; y: number; d: number }[] = [];
  let total = 0;
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const x = 50 + Math.sin(t * Math.PI * 2.5 - 0.4) * 30;
    const y = 8 + t * (H - 16);
    if (i > 0) {
      const prev = pts[i - 1];
      total += Math.hypot(x - prev.x, y - prev.y);
    }
    pts.push({ x, y, d: total });
  }
  const path = pts.map((pt, i) => `${i ? "L" : "M"}${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`).join("");
  return { pts, total, path };
})();

function pointAt(f: number) {
  const target = f * curve.total;
  const pts = curve.pts;
  for (let i = 1; i < pts.length; i++) {
    if (pts[i].d >= target) {
      const a = pts[i - 1];
      const b = pts[i];
      const k = b.d === a.d ? 0 : (target - a.d) / (b.d - a.d);
      return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
    }
  }
  return pts[pts.length - 1];
}

const css = `
.hb-va10 {
  --hb-va10-accent: #fbbf24;
  position: relative;
  width: 100%;
  height: var(--hb-va10-h);
  color: #ededed;
  font-family: inherit;
  background: #0a0908;
}
.hb-va10[data-pinned="true"] { height: calc(var(--hb-va10-h) * var(--hb-va10-len)); }
.hb-va10 *, .hb-va10 *::before, .hb-va10 *::after { box-sizing: border-box; }
.hb-va10-stage {
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 3cqw;
  height: var(--hb-va10-h);
  padding: 0 6cqw;
  overflow: hidden;
  container-type: size;
  background:
    radial-gradient(40% 50% at 100% 0%, color-mix(in srgb, var(--hb-va10-accent) 16%, transparent), transparent 70%),
    #0a0908;
}
.hb-va10-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  font-size: clamp(11px, 1.2cqw, 13px);
  font-weight: 500;
  color: var(--hb-va10-accent);
}
.hb-va10-sun {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background: var(--hb-va10-accent);
  box-shadow: 0 0 0 0.25em color-mix(in srgb, var(--hb-va10-accent) 25%, transparent), 0 0 16px var(--hb-va10-accent);
}
.hb-va10-title {
  max-width: 12ch;
  margin: 0.5em 0 0;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(1.8rem, 5.2cqw, 4.8rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.045em;
}
.hb-va10-sub {
  max-width: 38ch;
  margin: 0.9em 0 0;
  font-size: clamp(12px, 1.4cqw, 16px);
  line-height: 1.55;
  color: #a1a1a1;
}
.hb-va10-counters {
  display: flex;
  gap: 3cqw;
  margin-top: 2em;
  padding-top: 1.2em;
  border-top: 1px solid #262626;
}
.hb-va10-counter small {
  display: block;
  margin-bottom: 0.35em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 1cqw, 11px);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #6f6f6f;
}
.hb-va10-counter b {
  display: block;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(1.4rem, 3.6cqw, 3.2rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}
.hb-va10-counter:last-child b { color: var(--hb-va10-accent); }
.hb-va10-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  margin-top: 1.6em;
  padding: 0.7em 1.3em;
  border-radius: 999px;
  background: var(--hb-va10-accent);
  color: #1f1400;
  font-size: clamp(12px, 1.35cqw, 15px);
  font-weight: 600;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 12px 30px -12px var(--hb-va10-accent);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
}
.hb-va10-cta:hover { transform: translateY(-1px); filter: brightness(1.05); }
.hb-va10-cta:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-va10-map {
  position: relative;
  height: 90cqh;
  aspect-ratio: 100 / 140;
}
.hb-va10-map svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-va10-node {
  position: absolute;
  width: 1.6cqh;
  height: 1.6cqh;
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0.7);
  background: #0a0908;
  border: 2px solid #3a3a3a;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
}
.hb-va10-node[data-on="true"] {
  transform: translate(-50%, -50%) scale(1);
  border-color: var(--hb-va10-accent);
  background: var(--hb-va10-accent);
  box-shadow: 0 0 0 0.5cqh color-mix(in srgb, var(--hb-va10-accent) 22%, transparent), 0 0 18px var(--hb-va10-accent);
}
.hb-va10-card {
  position: absolute;
  width: max-content;
  max-width: 17cqw;
  padding: 0.55em 0.75em;
  border-radius: 0.6em;
  border: 1px solid #262626;
  background: linear-gradient(180deg, #161514, #111010);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 24px -12px rgba(0, 0, 0, 0.8);
  font-size: clamp(9px, 1.1cqw, 13px);
  line-height: 1.35;
  opacity: 0.18;
  transform: translate(var(--hb-va10-tx), -50%) translateX(var(--hb-va10-dx));
  transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-va10-card[data-side="r"] { --hb-va10-tx: 1.6cqh; --hb-va10-dx: 10px; }
.hb-va10-card[data-side="l"] { --hb-va10-tx: calc(-100% - 1.6cqh); --hb-va10-dx: -10px; }
.hb-va10-card[data-on="true"] { opacity: 1; --hb-va10-dx: 0px; }
.hb-va10-card small {
  display: block;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.85em;
  color: var(--hb-va10-accent);
}
.hb-va10-card b { display: block; margin-top: 0.1em; font-weight: 600; }
.hb-va10-card span { display: block; color: #8f8f8f; }
@media (max-width: 640px) {
  .hb-va10-stage { grid-template-columns: 1fr; align-content: center; }
  .hb-va10-map { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-va10-node, .hb-va10-card, .hb-va10-cta { transition: none; }
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

export function HeroScrollTimeline({
  eyebrow = "Helio Energy · since 2019",
  title = "From one rooftop to forty thousand",
  subtitle = "Solar and storage for homes, installed by our own crews and monitored for the life of the system.",
  countLabel = "Homes powered",
  milestones = defaultMilestones,
  cta = { label: "Get a free roof estimate", href: "#" },
  accent = "#fbbf24",
  progress,
  autoPlay = false,
  duration = 6,
  length = 4,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollTimelineProps) {
  const ref = React.useRef<HTMLElement>(null);
  const pathRef = React.useRef<SVGPathElement>(null);
  const yearRef = React.useRef<HTMLElement>(null);
  const countRef = React.useRef<HTMLElement>(null);
  const nodes = React.useRef<(HTMLSpanElement | null)[]>([]);
  const cards = React.useRef<(HTMLDivElement | null)[]>([]);
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;
  const m = milestones.length;
  const marks = React.useMemo(
    () => milestones.map((_, k) => ({ f: m > 1 ? 0.04 + (k / (m - 1)) * 0.92 : 0.5, ...pointAt(m > 1 ? 0.04 + (k / (m - 1)) * 0.92 : 0.5) })),
    [milestones, m],
  );
  const first = milestones[0];

  useScrollProgress(
    ref,
    (p) => {
      const d = clamp01(p / 0.92);
      if (pathRef.current) pathRef.current.style.strokeDashoffset = (1 - d).toFixed(4);
      let reached = -1;
      marks.forEach((mk, k) => {
        const on = d >= mk.f - 0.005;
        if (on) reached = k;
        const v = on ? "true" : "false";
        const nd = nodes.current[k];
        const cd = cards.current[k];
        if (nd && nd.dataset.on !== v) nd.dataset.on = v;
        if (cd && cd.dataset.on !== v) cd.dataset.on = v;
      });
      if (!m) return;
      let year = milestones[0].year;
      let count = milestones[0].count;
      if (reached >= 0 && reached < m - 1) {
        const a = marks[reached];
        const b = marks[reached + 1];
        const k = clamp01((d - a.f) / (b.f - a.f));
        year = Math.floor(milestones[reached].year + (milestones[reached + 1].year - milestones[reached].year) * k);
        count = Math.round(milestones[reached].count + (milestones[reached + 1].count - milestones[reached].count) * ease(k));
      } else if (reached === m - 1) {
        year = milestones[m - 1].year;
        count = milestones[m - 1].count;
      }
      if (yearRef.current) yearRef.current.textContent = String(year);
      if (countRef.current) countRef.current.textContent = count.toLocaleString("en-US");
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-va10", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={{ "--hb-va10-accent": accent, "--hb-va10-h": height, "--hb-va10-len": length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-hero-scroll-timeline" precedence="default">{css}</style>
      <div className="hb-va10-stage">
        <div>
          <span className="hb-va10-eyebrow">
            <span className="hb-va10-sun" aria-hidden="true" />
            {eyebrow}
          </span>
          <Heading className="hb-va10-title">{title}</Heading>
          {subtitle ? <p className="hb-va10-sub">{subtitle}</p> : null}
          <div className="hb-va10-counters" aria-hidden="true">
            <div className="hb-va10-counter">
              <small>Year</small>
              <b ref={yearRef}>{first ? first.year : ""}</b>
            </div>
            <div className="hb-va10-counter">
              <small>{countLabel}</small>
              <b ref={countRef}>{first ? first.count.toLocaleString("en-US") : ""}</b>
            </div>
          </div>
          {cta ? (
            <a className="hb-va10-cta" href={cta.href}>
              {cta.label}
            </a>
          ) : null}
        </div>
        <div className="hb-va10-map">
          <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            <path d={curve.path} fill="none" stroke="#262626" strokeWidth="0.8" strokeDasharray="1.2 1.6" />
            <path
              ref={pathRef}
              d={curve.path}
              fill="none"
              stroke={accent}
              strokeWidth="1.1"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset="1"
              style={{ filter: `drop-shadow(0 0 3px ${accent})` }}
            />
          </svg>
          <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {milestones.map((ms, k) => {
              const mk = marks[k];
              const left = `${((mk.x / W) * 100).toFixed(2)}%`;
              const top = `${((mk.y / H) * 100).toFixed(2)}%`;
              return (
                <li key={ms.year + ms.title}>
                  <span
                    className="hb-va10-node"
                    style={{ left, top }}
                    ref={(node) => {
                      nodes.current[k] = node;
                    }}
                  />
                  <div
                    className="hb-va10-card"
                    data-side={mk.x < 50 ? "r" : "l"}
                    style={{ left, top }}
                    ref={(node) => {
                      cards.current[k] = node;
                    }}
                  >
                    <small>{ms.year}</small>
                    <b>{ms.title}</b>
                    <span>{ms.text}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
