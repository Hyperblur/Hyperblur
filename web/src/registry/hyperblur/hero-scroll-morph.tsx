"use client";

import * as React from "react";

export interface HeroScrollMorphLink {
  label: string;
  href: string;
}

export interface HeroScrollMorphTile {
  label: string;
  meta: string;
  hue: number;
}

export interface HeroScrollMorphProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  brand?: string;
  title?: string;
  phases?: [string, string, string, string];
  tiles?: HeroScrollMorphTile[];
  cta?: HeroScrollMorphLink | null;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const defaultTiles: HeroScrollMorphTile[] = [
  { label: "Docs", meta: "214 pages", hue: 262 },
  { label: "Tasks", meta: "38 open", hue: 18 },
  { label: "Calendar", meta: "Today, 6", hue: 200 },
  { label: "Clients", meta: "1,204", hue: 150 },
  { label: "Chat", meta: "12 unread", hue: 330 },
  { label: "Files", meta: "8.4 GB", hue: 42 },
  { label: "Sheets", meta: "Q3 plan", hue: 170 },
  { label: "Forms", meta: "96 replies", hue: 285 },
  { label: "Wiki", meta: "Onboarding", hue: 222 },
  { label: "Goals", meta: "74% done", hue: 95 },
  { label: "Bugs", meta: "3 critical", hue: 0 },
  { label: "Design", meta: "v2.3 specs", hue: 305 },
];

const glyphs = [
  "M6 4h9l3 3v13H6z M9 11h6 M9 14h6 M9 17h4",
  "M5 7l2 2 3-3 M12 8h7 M5 13l2 2 3-3 M12 14h7 M12 19h7",
  "M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5",
  "M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M5 20c1.2-3.6 4-5 7-5s5.8 1.4 7 5",
  "M4 5h16v11h-9l-5 4v-4H4z",
  "M3 7h7l2 2h9v10H3z",
  "M4 4h16v16H4z M4 10h16 M4 15h16 M10 4v16",
  "M5 4h14v16H5z M8 8h8 M8 12h8 M8 16h5",
  "M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z M5 17a3 3 0 0 1 3-3h11",
  "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  "M8 7a4 4 0 0 1 8 0v2H8z M6 11h12v4a6 6 0 0 1-12 0z M3 13h3 M18 13h3 M4 8l3 2 M20 8l-3 2",
  "M12 3l9 9-9 9-9-9z M12 8l4 4-4 4-4-4z",
];

const css = `
.hb-va2 {
  --hb-va2-accent: #8b5cf6;
  position: relative;
  width: 100%;
  height: var(--hb-va2-h);
  color: #ededed;
  font-family: inherit;
  background: #0a0a0b;
}
.hb-va2[data-pinned="true"] { height: calc(var(--hb-va2-h) * var(--hb-va2-len)); }
.hb-va2 *, .hb-va2 *::before, .hb-va2 *::after { box-sizing: border-box; }
.hb-va2-stage {
  position: sticky;
  top: 0;
  height: var(--hb-va2-h);
  overflow: hidden;
  container-type: size;
  isolation: isolate;
  background:
    radial-gradient(50% 45% at 50% 64%, color-mix(in srgb, var(--hb-va2-accent) 16%, transparent), transparent 70%),
    radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.07) 1px, transparent 1.4px) 0 0 / 26px 26px,
    #0a0a0b;
}
.hb-va2-copy {
  position: absolute;
  inset: 7cqh 0 auto;
  z-index: 3;
  text-align: center;
  pointer-events: none;
}
.hb-va2-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  padding: 0.35em 0.85em 0.35em 0.4em;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(23, 23, 23, 0.7);
  font-size: clamp(11px, 1.2cqw, 13px);
  color: #a1a1a1;
}
.hb-va2-dot {
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  background: conic-gradient(from 200deg, var(--hb-va2-accent), #f0abfc, var(--hb-va2-accent));
  box-shadow: inset 0 0 0 0.32em #171717;
}
.hb-va2-title {
  margin: 0.55em 0 0;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(1.8rem, 5.4cqw, 4.6rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.045em;
}
.hb-va2-lines {
  position: relative;
  display: block;
  height: 1.08em;
  margin-top: 0.06em;
}
.hb-va2-line {
  position: absolute;
  inset: 0;
  display: block;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, #ededed, color-mix(in srgb, var(--hb-va2-accent) 70%, #fff) 55%, #ededed);
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0;
  will-change: transform, opacity;
}
.hb-va2-line:first-child { opacity: 1; }
.hb-va2-card {
  position: absolute;
  left: 50%;
  top: 62%;
  z-index: 1;
  width: 9.6cqw;
  height: 12cqw;
  margin: -6cqw 0 0 -4.8cqw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.9cqw;
  border-radius: 1.1cqw;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: linear-gradient(180deg, #1a1a1c, #121213);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 1.6cqw 3cqw -1cqw rgba(0, 0, 0, 0.8);
  will-change: transform;
}
.hb-va2-art {
  position: relative;
  display: grid;
  place-items: center;
  height: 6.3cqw;
  border-radius: 0.7cqw;
  background:
    radial-gradient(90% 80% at 30% 20%, hsl(var(--hb-va2-hue) 90% 70% / 0.55), transparent 60%),
    linear-gradient(150deg, hsl(var(--hb-va2-hue) 70% 32%), hsl(var(--hb-va2-hue) 60% 14%));
  overflow: hidden;
}
.hb-va2-art::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), transparent 40%);
}
.hb-va2-art svg { width: 2.8cqw; height: 2.8cqw; color: #fff; }
.hb-va2-label {
  display: block;
  font-size: clamp(7px, 1.15cqw, 14px);
  font-weight: 600;
  letter-spacing: -0.01em;
}
.hb-va2-meta {
  display: block;
  margin-top: 0.15em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(6px, 0.82cqw, 10px);
  color: #8f8f8f;
}
.hb-va2-foot {
  position: absolute;
  inset: auto 4cqw 4.5cqh;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.hb-va2-steps { display: flex; gap: 0.5rem; }
.hb-va2-step {
  position: relative;
  width: clamp(22px, 4cqw, 46px);
  height: 3px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
}
.hb-va2-step span {
  position: absolute;
  inset: 0;
  transform-origin: 0 50%;
  transform: scaleX(0);
  background: var(--hb-va2-accent);
}
.hb-va2-step:first-child span { transform: scaleX(1); }
.hb-va2-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.7em 1.2em;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font-size: clamp(12px, 1.35cqw, 15px);
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2), 0 10px 30px -10px color-mix(in srgb, var(--hb-va2-accent) 80%, transparent);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease;
}
.hb-va2-cta:hover { transform: translateY(-1px); background: #fff; }
.hb-va2-cta:focus-visible { outline: 2px solid var(--hb-va2-accent); outline-offset: 3px; }
.hb-va2-cta svg { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-va2-cta:hover svg { transform: translateX(3px); }
@media (prefers-reduced-motion: reduce) {
  .hb-va2-cta, .hb-va2-cta svg { transition: none; }
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

type Pose = { x: number; y: number; r: number; s: number };

function hash(n: number) {
  let h = (n + 1) * 2654435761;
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function layouts(count: number): Pose[][] {
  const scatter: Pose[] = [];
  const grid: Pose[] = [];
  const arc: Pose[] = [];
  const stack: Pose[] = [];
  const cols = Math.ceil(count / 2);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + (hash(i) - 0.5) * 0.5;
    scatter.push({
      x: Math.cos(a) * (34 + hash(i + 40) * 8),
      y: Math.sin(a) * (17 + hash(i + 80) * 6) - 3,
      r: (hash(i + 120) - 0.5) * 56,
      s: 0.82 + hash(i + 160) * 0.22,
    });
    const c = i % cols;
    const row = Math.floor(i / cols);
    grid.push({ x: (c - (cols - 1) / 2) * 11, y: (row - 0.5) * 13.4, r: 0, s: 1 });
    const t = count > 1 ? i / (count - 1) : 0.5;
    const ang = (-62 + t * 124) * (Math.PI / 180);
    arc.push({ x: Math.sin(ang) * 40, y: 34 - Math.cos(ang) * 40, r: ang * (180 / Math.PI), s: 0.94 });
    stack.push({ x: (i - (count - 1) / 2) * 0.28, y: 2.5 - i * 0.38, r: (hash(i + 200) - 0.5) * 10, s: 1.22 });
  }
  return [scatter, grid, arc, stack];
}

function poseCss(p: Pose) {
  return `translate(${p.x.toFixed(2)}cqw, ${p.y.toFixed(2)}cqw) rotate(${p.r.toFixed(2)}deg) scale(${p.s.toFixed(3)})`;
}

export function HeroScrollMorph({
  brand = "Tandem 3.0 is here",
  title = "Every tool your team uses,",
  phases = ["scattered across tabs.", "lined up in one grid.", "connected end to end.", "shipped as one workspace."],
  tiles = defaultTiles,
  cta = { label: "Start with Tandem", href: "#" },
  accent = "#8b5cf6",
  progress,
  autoPlay = false,
  duration = 7,
  length = 4,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollMorphProps) {
  const ref = React.useRef<HTMLElement>(null);
  const cards = React.useRef<(HTMLDivElement | null)[]>([]);
  const lines = React.useRef<(HTMLSpanElement | null)[]>([]);
  const steps = React.useRef<(HTMLSpanElement | null)[]>([]);
  const poses = React.useMemo(() => layouts(tiles.length), [tiles.length]);
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;

  useScrollProgress(
    ref,
    (p) => {
      const s = p * 3;
      const seg = Math.min(2, Math.floor(s));
      const t = ease(clamp01((s - seg - 0.12) / 0.76));
      const from = poses[seg];
      const to = poses[seg + 1];
      cards.current.forEach((node, i) => {
        if (!node || !from[i] || !to[i]) return;
        const lag = clamp01(t * 1.25 - (i / tiles.length) * 0.25);
        const k = ease(lag);
        node.style.transform = poseCss({
          x: from[i].x + (to[i].x - from[i].x) * k,
          y: from[i].y + (to[i].y - from[i].y) * k,
          r: from[i].r + (to[i].r - from[i].r) * k,
          s: from[i].s + (to[i].s - from[i].s) * k,
        });
      });
      lines.current.forEach((node, k) => {
        if (!node) return;
        const d = s - k;
        const o = clamp01(1 - Math.abs(d) * 2.4);
        node.style.opacity = o.toFixed(3);
        node.style.transform = `translateY(${(-d * 0.5).toFixed(3)}em)`;
        node.style.filter = `blur(${((1 - o) * 6).toFixed(2)}px)`;
      });
      steps.current.forEach((node, k) => {
        if (node) node.style.transform = `scaleX(${clamp01(s - k + 1).toFixed(3)})`;
      });
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-va2", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={{ "--hb-va2-accent": accent, "--hb-va2-h": height, "--hb-va2-len": length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-hero-scroll-morph" precedence="default">{css}</style>
      <div className="hb-va2-stage">
        <div className="hb-va2-copy">
          <span className="hb-va2-brand">
            <span className="hb-va2-dot" aria-hidden="true" />
            {brand}
          </span>
          <Heading className="hb-va2-title">
            {title}
            <span className="hb-va2-lines">
              {phases.map((line, k) => (
                <span
                  key={line}
                  className="hb-va2-line"
                  ref={(node) => {
                    lines.current[k] = node;
                  }}
                  aria-hidden={k === 0 ? undefined : true}
                >
                  {line}
                </span>
              ))}
            </span>
          </Heading>
        </div>
        {tiles.map((tile, i) => (
          <div
            key={tile.label + i}
            className="hb-va2-card"
            aria-hidden="true"
            ref={(node) => {
              cards.current[i] = node;
            }}
            style={{ transform: poses[0][i] ? poseCss(poses[0][i]) : undefined, "--hb-va2-hue": tile.hue } as React.CSSProperties}
          >
            <span className="hb-va2-art">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d={glyphs[i % glyphs.length]} />
              </svg>
            </span>
            <span>
              <span className="hb-va2-label">{tile.label}</span>
              <span className="hb-va2-meta">{tile.meta}</span>
            </span>
          </div>
        ))}
        <div className="hb-va2-foot">
          <div className="hb-va2-steps" aria-hidden="true">
            {phases.map((line, k) => (
              <span key={line} className="hb-va2-step">
                <span
                  ref={(node) => {
                    steps.current[k] = node;
                  }}
                />
              </span>
            ))}
          </div>
          {cta ? (
            <a className="hb-va2-cta" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
