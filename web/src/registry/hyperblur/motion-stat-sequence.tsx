"use client";

import * as React from "react";

export interface MotionStatSequenceStat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta?: string;
}

export interface MotionStatSequenceProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  stats?: MotionStatSequenceStat[];
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
}

const defaultStats: MotionStatSequenceStat[] = [
  { value: 2.4, decimals: 1, suffix: "B", label: "Requests served last quarter", delta: "+38% QoQ" },
  { value: 99.995, decimals: 3, suffix: "%", label: "Edge uptime across 41 regions", delta: "4 min downtime" },
  { value: 186, prefix: "", suffix: "ms", label: "Median cold start, worldwide", delta: "-62ms since May" },
];

const css = `
.hb-wh1 {
  --hb-wh1-a: #2f7bff;
  position: relative;
  width: 100%;
  height: var(--hb-wh1-h);
  color: #ededed;
  font-family: inherit;
  background: #0a0a0a;
}
.hb-wh1[data-pinned="true"] { height: calc(var(--hb-wh1-h) * var(--hb-wh1-len)); }
.hb-wh1 *, .hb-wh1 *::before, .hb-wh1 *::after { box-sizing: border-box; }
.hb-wh1-stage {
  position: sticky;
  top: 0;
  height: var(--hb-wh1-h);
  overflow: hidden;
  container-type: size;
  display: grid;
  grid-template-columns: 1fr;
  align-content: center;
  gap: 4cqh;
  padding: 7cqh max(16px, 6cqw);
  background:
    radial-gradient(60% 80% at 100% 0%, color-mix(in srgb, var(--hb-wh1-a) 10%, transparent), transparent 70%),
    linear-gradient(180deg, #0c0c0c, #0a0a0a);
}
.hb-wh1-title, .hb-wh1-meter { display: none; }
.hb-wh1-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6em;
  margin: 0;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(8px, 2.2cqh, 12px);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #8f8f8f;
}
.hb-wh1-eyebrow::before {
  content: "";
  width: 0.55em;
  height: 0.55em;
  border-radius: 50%;
  background: var(--hb-wh1-a);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wh1-a) 22%, transparent);
}
.hb-wh1-title {
  margin: 0.7em 0 0;
  max-width: 13ch;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(22px, 6.4cqh, 60px);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.035em;
  color: #f5f5f5;
}
.hb-wh1-meter {
  display: flex;
  align-items: center;
  gap: 0.8em;
  margin-top: 2.2em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 1.8cqh, 12px);
  color: #6f6f6f;
  font-variant-numeric: tabular-nums;
}
.hb-wh1-meter i {
  position: relative;
  flex: 0 0 9em;
  height: 2px;
  border-radius: 2px;
  background: #222;
  overflow: hidden;
}
.hb-wh1-meter i::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--hb-wh1-a);
  transform-origin: left;
  transform: scaleX(var(--hb-wh1-p, 0));
}
.hb-wh1-list {
  position: relative;
  margin: 0;
  padding: 0 0 0 clamp(14px, 4cqw, 34px);
  list-style: none;
  display: grid;
  gap: clamp(4px, 2.4cqh, 26px);
}
.hb-wh1-list::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.4em;
  bottom: 0.4em;
  width: 1px;
  background: #242424;
}
.hb-wh1-list::after {
  content: "";
  position: absolute;
  left: -0.5px;
  top: 0.4em;
  bottom: 0.4em;
  width: 2px;
  background: linear-gradient(180deg, var(--hb-wh1-a), color-mix(in srgb, var(--hb-wh1-a) 50%, #fff));
  transform-origin: top;
  transform: scaleY(var(--hb-wh1-p, 0));
  box-shadow: 0 0 10px var(--hb-wh1-a);
}
.hb-wh1-row {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: baseline;
  column-gap: clamp(8px, 2.4cqw, 22px);
  opacity: calc(0.22 + var(--hb-wh1-on) * 0.78);
  transform: translateX(calc((1 - var(--hb-wh1-on)) * 10px));
  transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-wh1-row[data-state="done"] { opacity: 0.62; }
.hb-wh1-dot {
  position: absolute;
  left: calc(clamp(14px, 4cqw, 34px) * -1 - 4px);
  top: 50%;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid #3a3a3a;
  background: #0a0a0a;
  transform: translateY(-50%) scale(calc(0.7 + var(--hb-wh1-on) * 0.3));
  transition: border-color 0.4s ease, background 0.4s ease;
}
.hb-wh1-row[data-state="active"] .hb-wh1-dot,
.hb-wh1-row[data-state="done"] .hb-wh1-dot {
  border-color: var(--hb-wh1-a);
  background: var(--hb-wh1-a);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-wh1-a) 20%, transparent);
}
.hb-wh1-num {
  grid-row: span 2;
  min-width: 4.6ch;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(24px, 13cqh, 92px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  color: #f6f6f6;
}
.hb-wh1-unit { color: color-mix(in srgb, var(--hb-wh1-a) 55%, #fff); font-size: 0.62em; letter-spacing: -0.02em; margin-left: 0.04em; }
.hb-wh1-label {
  align-self: end;
  font-size: clamp(9px, 2.5cqh, 16px);
  line-height: 1.3;
  color: #a1a1a1;
}
.hb-wh1-foot {
  display: flex;
  align-items: center;
  gap: 0.6em;
  align-self: start;
  margin-top: 0.35em;
}
.hb-wh1-bar {
  position: relative;
  width: clamp(36px, 14cqw, 140px);
  height: 2px;
  border-radius: 2px;
  background: #1f1f1f;
  overflow: hidden;
}
.hb-wh1-bar::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--hb-wh1-a);
  transform-origin: left;
  transform: scaleX(var(--hb-wh1-t));
}
.hb-wh1-delta {
  padding: 0.18em 0.55em;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--hb-wh1-a) 40%, transparent);
  background: color-mix(in srgb, var(--hb-wh1-a) 12%, transparent);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(7px, 1.8cqh, 11px);
  white-space: nowrap;
  color: color-mix(in srgb, var(--hb-wh1-a) 45%, #fff);
  opacity: 0;
  transform: translateY(4px) scale(0.92);
  transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-wh1-row[data-state="done"] .hb-wh1-delta,
.hb-wh1-row[data-full="true"] .hb-wh1-delta { opacity: 1; transform: none; }
.hb-wh1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@container (min-width: 620px) {
  .hb-wh1-stage { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); align-items: center; column-gap: 6cqw; }
  .hb-wh1-title { display: block; }
  .hb-wh1-meter { display: flex; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wh1-row, .hb-wh1-dot, .hb-wh1-delta { transition: none; }
}
`;

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function ease(x: number) {
  return 1 - Math.pow(1 - x, 3);
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
  const back = d * 0.45;
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

function format(v: number, decimals: number) {
  return v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function MotionStatSequence({
  eyebrow = "Platform report · Q3",
  title = "A quarter on the network, in three numbers",
  stats = defaultStats,
  accent = "#2f7bff",
  progress,
  autoPlay = false,
  duration = 6,
  length = 3,
  height = "100vh",
  className,
  style,
  ...rest
}: MotionStatSequenceProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [p, setP] = React.useState(typeof progress === "number" ? clamp01(progress) : 0);
  const pinned = progress === undefined && !autoPlay;
  const n = Math.max(1, stats.length);

  useProgress(
    ref,
    (v) => {
      const q = Math.round(v * 2000) / 2000;
      ref.current?.style.setProperty("--hb-wh1-p", q.toFixed(4));
      setP((old) => (old === q ? old : q));
    },
    progress,
    autoPlay,
    duration,
  );

  const s = clamp01(p / 0.92) * n;

  return (
    <section
      ref={ref}
      className={["hb-wh1", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={
        {
          "--hb-wh1-a": accent,
          "--hb-wh1-h": height,
          "--hb-wh1-len": length,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-motion-stat-sequence" precedence="default">{css}</style>
      <div className="hb-wh1-stage">
        <div className="hb-wh1-intro">
          <p className="hb-wh1-eyebrow">{eyebrow}</p>
          <h2 className="hb-wh1-title">{title}</h2>
          <div className="hb-wh1-meter" aria-hidden="true">
            <span>{String(Math.min(n, Math.floor(s) + 1)).padStart(2, "0")}</span>
            <i />
            <span>{String(n).padStart(2, "0")}</span>
          </div>
        </div>
        <ol className="hb-wh1-list">
          {stats.map((stat, i) => {
            const local = clamp01(s - i);
            const t = ease(clamp01(local / 0.8));
            const state = local >= 1 ? "done" : local > 0 ? "active" : "idle";
            const on = state === "idle" ? 0 : 1;
            const decimals = stat.decimals ?? 0;
            return (
              <li
                key={stat.label}
                className="hb-wh1-row"
                data-state={state}
                data-full={t >= 0.999 ? "true" : "false"}
                style={{ "--hb-wh1-on": on, "--hb-wh1-t": t.toFixed(4) } as React.CSSProperties}
              >
                <span className="hb-wh1-dot" aria-hidden="true" />
                <span className="hb-wh1-num" aria-hidden="true">
                  {stat.prefix ? <span className="hb-wh1-unit">{stat.prefix}</span> : null}
                  {format(stat.value * t, decimals)}
                  {stat.suffix ? <span className="hb-wh1-unit">{stat.suffix}</span> : null}
                </span>
                <span className="hb-wh1-sr">
                  {stat.prefix}
                  {format(stat.value, decimals)}
                  {stat.suffix}
                </span>
                <span className="hb-wh1-label">{stat.label}</span>
                <span className="hb-wh1-foot" aria-hidden="true">
                  <span className="hb-wh1-bar" />
                  {stat.delta ? <span className="hb-wh1-delta">{stat.delta}</span> : null}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
