"use client";

import * as React from "react";

export interface MotionPathDrawMilestone {
  date: string;
  label: string;
  x: number;
  y: number;
}

export interface MotionPathDrawProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  milestones?: MotionPathDrawMilestone[];
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
}

const defaultMilestones: MotionPathDrawMilestone[] = [
  { date: "Jan", label: "First commit", x: 0.04, y: 0.78 },
  { date: "Mar", label: "Private alpha", x: 0.27, y: 0.36 },
  { date: "Jun", label: "12 design partners", x: 0.5, y: 0.7 },
  { date: "Sep", label: "Public beta", x: 0.73, y: 0.3 },
  { date: "Nov", label: "1.0 launch", x: 0.96, y: 0.52 },
];

const css = `
.hb-wh7 {
  --hb-wh7-a: #2f7bff;
  position: relative;
  width: 100%;
  height: var(--hb-wh7-h);
  color: #ededed;
  font-family: inherit;
  background: #0a0a0a;
}
.hb-wh7[data-pinned="true"] { height: calc(var(--hb-wh7-h) * var(--hb-wh7-len)); }
.hb-wh7 *, .hb-wh7 *::before, .hb-wh7 *::after { box-sizing: border-box; }
.hb-wh7-stage {
  position: sticky;
  top: 0;
  height: var(--hb-wh7-h);
  overflow: hidden;
  container-type: size;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 2cqh;
  padding: 6cqh max(14px, 5cqw) 5cqh;
  background-color: #0a0a0a;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.07) 1px, transparent 0);
  background-size: clamp(14px, 3cqw, 28px) clamp(14px, 3cqw, 28px);
}
.hb-wh7-head { display: flex; align-items: baseline; justify-content: space-between; gap: 1em; }
.hb-wh7-eyebrow {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(8px, 1.4cqw, 12px);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #8f8f8f;
}
.hb-wh7-title {
  margin: 0.3em 0 0;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(14px, min(4cqw, 7cqh), 52px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #f5f5f5;
}
.hb-wh7-pct {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 1.6cqw, 14px);
  font-variant-numeric: tabular-nums;
  color: color-mix(in srgb, var(--hb-wh7-a) 55%, #fff);
}
.hb-wh7-area { position: relative; min-height: 0; }
.hb-wh7-list { margin: 0; padding: 0; list-style: none; }
.hb-wh7-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-wh7-node {
  position: absolute;
  width: clamp(8px, 1.4cqw, 14px);
  height: clamp(8px, 1.4cqw, 14px);
  border-radius: 50%;
  border: 1.5px solid #3a3a3a;
  background: #0a0a0a;
  transform: translate(-50%, -50%);
  transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.4s ease;
}
.hb-wh7-node[data-on="true"] {
  border-color: var(--hb-wh7-a);
  background: var(--hb-wh7-a);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--hb-wh7-a) 20%, transparent), 0 0 18px var(--hb-wh7-a);
  animation: hb-wh7-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes hb-wh7-pop { 0% { transform: translate(-50%, -50%) scale(0.4); } 100% { transform: translate(-50%, -50%) scale(1); } }
.hb-wh7-tag {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.15em;
  padding: 0.45em 0.7em;
  border-radius: 0.6em;
  border: 1px solid #262626;
  background: linear-gradient(180deg, #161616, #111);
  box-shadow: 0 10px 24px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  font-size: clamp(8px, 1.35cqw, 13px);
  white-space: nowrap;
  opacity: 0;
  transform: translate(var(--tx), calc(var(--ty) + 6px));
  transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.hb-wh7-tag[data-on="true"] { opacity: 1; transform: translate(var(--tx), var(--ty)); }
.hb-wh7-tag b { font-weight: 600; color: #f2f2f2; }
.hb-wh7-tag span {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.82em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--hb-wh7-a) 55%, #fff);
}
.hb-wh7-head-dot {
  position: absolute;
  width: clamp(10px, 1.8cqw, 18px);
  height: clamp(10px, 1.8cqw, 18px);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-wh7-a) 45%, transparent), 0 0 24px 4px var(--hb-wh7-a);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.hb-wh7-foot {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(7px, 1.2cqw, 11px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #5c5c5c;
}
.hb-wh7-foot span[data-on="true"] { color: #d6d6d6; }
@container (max-height: 260px) {
  .hb-wh7-foot { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wh7-node, .hb-wh7-tag { transition: none; animation: none; }
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
  const back = d * 0.4;
  const hold = 1600;
  const t = ms % (d + hold + back + 600);
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

interface Geometry {
  d: string;
  samples: { x: number; y: number; l: number }[];
  total: number;
  marks: number[];
}

function build(points: [number, number][]): Geometry {
  const samples: { x: number; y: number; l: number }[] = [];
  const marks: number[] = [0];
  if (points.length === 0) return { d: "", samples, total: 0, marks };
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  let total = 0;
  samples.push({ x: points[0][0], y: points[0][1], l: 0 });
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1: [number, number] = [p1[0] + (p2[0] - p0[0]) / 5, p1[1] + (p2[1] - p0[1]) / 5];
    const c2: [number, number] = [p2[0] - (p3[0] - p1[0]) / 5, p2[1] - (p3[1] - p1[1]) / 5];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    let px = p1[0];
    let py = p1[1];
    for (let s = 1; s <= 28; s++) {
      const t = s / 28;
      const u = 1 - t;
      const x = u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0];
      const y = u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1];
      total += Math.hypot(x - px, y - py);
      samples.push({ x, y, l: total });
      px = x;
      py = y;
    }
    marks.push(total);
  }
  return { d, samples, total, marks };
}

function pointAt(g: Geometry, len: number) {
  const s = g.samples;
  if (s.length === 0) return { x: 0, y: 0 };
  if (len <= 0) return s[0];
  let lo = 0;
  let hi = s.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (s[mid].l < len) lo = mid + 1;
    else hi = mid;
  }
  const b = s[lo];
  const a = s[Math.max(0, lo - 1)];
  const span = b.l - a.l || 1;
  const f = clamp01((len - a.l) / span);
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
}

export function MotionPathDraw({
  eyebrow = "Our first year",
  title = "From a weekend repo to a 1.0",
  milestones = defaultMilestones,
  accent = "#2f7bff",
  progress,
  autoPlay = false,
  duration = 6,
  length = 3,
  height = "100vh",
  className,
  style,
  ...rest
}: MotionPathDrawProps) {
  const ref = React.useRef<HTMLElement>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [size, setSize] = React.useState({ w: 1000, h: 480 });
  const [p, setP] = React.useState(typeof progress === "number" ? clamp01(progress) : 0);
  const pinned = progress === undefined && !autoPlay;

  React.useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = Math.max(40, el.clientWidth);
      const h = Math.max(40, el.clientHeight);
      setSize((old) => (old.w === w && old.h === h ? old : { w, h }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useProgress(
    ref,
    (v) => {
      const q = Math.round(v * 1000) / 1000;
      setP((old) => (old === q ? old : q));
    },
    progress,
    autoPlay,
    duration,
  );

  const geo = React.useMemo(
    () => build(milestones.map((m) => [clamp01(m.x) * size.w, clamp01(m.y) * size.h] as [number, number])),
    [milestones, size.w, size.h],
  );

  const drawn = clamp01(p / 0.94) * geo.total;
  const head = pointAt(geo, drawn);
  const trail = Math.min(drawn, geo.total * 0.12);
  const passed = geo.marks.filter((m) => m <= drawn + 0.5).length;
  const current = milestones[Math.max(0, passed - 1)];

  return (
    <section
      ref={ref}
      className={["hb-wh7", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={
        {
          "--hb-wh7-a": accent,
          "--hb-wh7-h": height,
          "--hb-wh7-len": length,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-motion-path-draw" precedence="default">{css}</style>
      <div className="hb-wh7-stage">
        <div className="hb-wh7-head">
          <div>
            <div className="hb-wh7-eyebrow">{eyebrow}</div>
            <h2 className="hb-wh7-title">{title}</h2>
          </div>
          <span className="hb-wh7-pct" aria-hidden="true">
            {current ? current.date : ""} · {Math.round(clamp01(p / 0.94) * 100)}%
          </span>
        </div>
        <div className="hb-wh7-area" ref={areaRef}>
          <svg className="hb-wh7-svg" viewBox={`0 0 ${size.w} ${size.h}`} aria-hidden="true">
            <defs>
              <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor={accent} stopOpacity="0.35" />
                <stop offset="1" stopColor={accent} />
              </linearGradient>
              <filter id={`${uid}-b`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>
            <path d={geo.d} fill="none" stroke="#262626" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round" />
            <path
              d={geo.d}
              fill="none"
              stroke={`url(#${uid}-g)`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${drawn.toFixed(1)} ${(geo.total + 10).toFixed(1)}`}
            />
            <path
              d={geo.d}
              fill="none"
              stroke={accent}
              strokeWidth="10"
              strokeLinecap="round"
              filter={`url(#${uid}-b)`}
              opacity="0.8"
              strokeDasharray={`0 ${(drawn - trail).toFixed(1)} ${trail.toFixed(1)} ${(geo.total + 10).toFixed(1)}`}
            />
          </svg>
          <ol className="hb-wh7-list">
            {milestones.map((m, i) => {
              const on = i < passed;
              const below = m.y < 0.5;
              const tx = m.x < 0.15 ? "0%" : m.x > 0.85 ? "-100%" : "-50%";
              return (
                <li key={`${m.label}-${i}`}>
                  <span className="hb-wh7-node" data-on={on ? "true" : "false"} style={{ left: `${(clamp01(m.x) * 100).toFixed(2)}%`, top: `${(clamp01(m.y) * 100).toFixed(2)}%` }} />
                  <span
                    className="hb-wh7-tag"
                    data-on={on ? "true" : "false"}
                    style={
                      {
                        left: `${(clamp01(m.x) * 100).toFixed(2)}%`,
                        top: `${(clamp01(m.y) * 100).toFixed(2)}%`,
                        "--tx": tx,
                        "--ty": below ? "14px" : "calc(-100% - 14px)",
                      } as React.CSSProperties
                    }
                  >
                    <span>{m.date}</span>
                    <b>{m.label}</b>
                  </span>
                </li>
              );
            })}
          </ol>
          {geo.total > 0 && drawn > 0.5 && drawn < geo.total - 0.5 ? (
            <span
              className="hb-wh7-head-dot"
              aria-hidden="true"
              style={{ left: `${((head.x / size.w) * 100).toFixed(2)}%`, top: `${((head.y / size.h) * 100).toFixed(2)}%` }}
            />
          ) : null}
        </div>
        <div className="hb-wh7-foot" aria-hidden="true">
          {milestones.map((m, i) => (
            <span key={`${m.date}-${i}`} data-on={i < passed ? "true" : "false"}>
              {m.date}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
