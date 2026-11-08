"use client";

import * as React from "react";

export interface MotionFlipSequenceFace {
  step: string;
  title: string;
  text: string;
  metric: string;
  metricLabel: string;
  from: string;
  to: string;
}

export interface MotionFlipSequenceProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  faces?: MotionFlipSequenceFace[];
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
}

const defaultFaces: MotionFlipSequenceFace[] = [
  { step: "Plan", title: "Scope the sprint in one board", text: "Drag issues in, set the goal, and the estimate updates live.", metric: "14", metricLabel: "issues", from: "#1b2f6b", to: "#4d7dff" },
  { step: "Build", title: "Preview every branch", text: "Each push gets its own link with comments pinned to the page.", metric: "3m", metricLabel: "to preview", from: "#2c1659", to: "#9a6bff" },
  { step: "Ship", title: "Release behind a flag", text: "Roll out to 5% first, watch errors, then open the gate.", metric: "5%", metricLabel: "canary", from: "#0d3f3a", to: "#2fd1ad" },
  { step: "Learn", title: "See what people actually used", text: "Adoption, drop-off and feedback land on the same card.", metric: "+22%", metricLabel: "activation", from: "#4b2210", to: "#ff8c4a" },
];

const css = `
.hb-wh5 {
  --hb-wh5-a: #2f7bff;
  position: relative;
  width: 100%;
  height: var(--hb-wh5-h);
  color: #ededed;
  font-family: inherit;
  background: #0a0a0a;
}
.hb-wh5[data-pinned="true"] { height: calc(var(--hb-wh5-h) * var(--hb-wh5-len)); }
.hb-wh5 *, .hb-wh5 *::before, .hb-wh5 *::after { box-sizing: border-box; }
.hb-wh5-stage {
  position: sticky;
  top: 0;
  height: var(--hb-wh5-h);
  overflow: hidden;
  container-type: size;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 5cqw;
  padding: 6cqh max(14px, 6cqw);
  background:
    radial-gradient(50% 70% at 70% 50%, color-mix(in srgb, var(--hb-wh5-a) 10%, transparent), transparent 70%),
    #0a0a0a;
}
.hb-wh5-steps {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: clamp(4px, 2.6cqh, 22px);
}
.hb-wh5-step {
  display: flex;
  align-items: center;
  gap: 0.7em;
  font-size: clamp(9px, 2.6cqh, 16px);
  font-weight: 500;
  color: #5e5e5e;
  transition: color 0.4s ease;
}
.hb-wh5-step b {
  display: grid;
  place-items: center;
  width: 1.9em;
  height: 1.9em;
  border-radius: 50%;
  border: 1px solid #2a2a2a;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.78em;
  font-weight: 500;
  transition: border-color 0.4s ease, background 0.4s ease, color 0.4s ease;
}
.hb-wh5-step[data-on="true"] { color: #ededed; }
.hb-wh5-step[data-on="true"] b { border-color: var(--hb-wh5-a); background: var(--hb-wh5-a); color: #fff; }
.hb-wh5-step[data-done="true"] b { border-color: color-mix(in srgb, var(--hb-wh5-a) 55%, #333); color: color-mix(in srgb, var(--hb-wh5-a) 60%, #fff); }
.hb-wh5-name { display: none; }
.hb-wh5-scene {
  position: relative;
  display: grid;
  place-items: center;
  height: 100%;
  perspective: 1100px;
}
.hb-wh5-deck {
  position: absolute;
  width: min(86%, 100cqh, 560px);
  aspect-ratio: 16 / 10;
  border-radius: clamp(10px, 3cqh, 22px);
  border: 1px solid #222;
  background: linear-gradient(180deg, #151515, #0f0f0f);
  transform: translate(calc(var(--k) * 10px), calc(var(--k) * 8px)) scale(calc(1 - var(--k) * 0.04));
  opacity: calc(0.8 - var(--k) * 0.25);
}
.hb-wh5-card {
  position: relative;
  width: min(86%, 100cqh, 560px);
  aspect-ratio: 16 / 10;
  transform-style: preserve-3d;
  will-change: transform;
}
.hb-wh5-side {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(10px, 5%, 30px);
  border-radius: clamp(10px, 3cqh, 22px);
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: linear-gradient(140deg, var(--to), var(--from) 62%, #0b0b0b);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  container-type: inline-size;
}
.hb-wh5-back { transform: rotateY(180deg); }
.hb-wh5-side::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.28) 48%, transparent 62%);
  transform: translateX(calc(var(--hb-wh5-sheen, 0) * 140% - 70%));
  pointer-events: none;
}
.hb-wh5-side::after {
  content: "";
  position: absolute;
  right: -12%;
  top: -30%;
  width: 60%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 0 0 18px rgba(255, 255, 255, 0.03), 0 0 0 40px rgba(255, 255, 255, 0.025);
  pointer-events: none;
}
.hb-wh5-top {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(7px, 3.4cqw, 13px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
}
.hb-wh5-title {
  position: relative;
  margin: 0;
  max-width: 15ch;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(12px, 8.4cqw, 38px);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: #fff;
}
.hb-wh5-low {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1em;
}
.hb-wh5-text {
  margin: 0;
  max-width: 30ch;
  font-size: clamp(7px, 3.6cqw, 15px);
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.74);
}
.hb-wh5-metric { text-align: right; flex: none; }
.hb-wh5-metric b {
  display: block;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(12px, 9cqw, 40px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #fff;
}
.hb-wh5-metric span { font-size: clamp(6px, 2.8cqw, 12px); color: rgba(255, 255, 255, 0.6); }
.hb-wh5-shadow {
  position: absolute;
  left: 50%;
  bottom: 6%;
  width: min(70%, 80cqh, 460px);
  height: 18px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(0, 0, 0, 0.8), transparent);
  transform: translateX(-50%) scaleX(var(--hb-wh5-sq, 1));
  filter: blur(6px);
  pointer-events: none;
}
@container (max-width: 460px) {
  .hb-wh5-stage { grid-template-columns: 1fr; grid-template-rows: 1fr auto; gap: 3cqh; padding: 5cqh 14px; }
  .hb-wh5-steps { order: 2; display: flex; justify-content: center; gap: 0.9em; }
  .hb-wh5-step span { display: none; }
  .hb-wh5-text { display: none; }
}
@container (min-width: 700px) {
  .hb-wh5-name { display: inline; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wh5-step, .hb-wh5-step b { transition: none; }
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
  const hold = 1400;
  const t = ms % (d + hold + back + 900);
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

function angleAt(p: number, n: number) {
  if (n < 2) return 0;
  const s = clamp01(p) * (n - 1);
  const k = Math.min(n - 2, Math.floor(s));
  const local = s - k;
  const flip = inOut(clamp01((local - 0.25) / 0.5));
  return (k + flip) * 180;
}

function Side({ face, index, total, back, hidden }: { face: MotionFlipSequenceFace; index: number; total: number; back?: boolean; hidden: boolean }) {
  return (
    <div
      aria-hidden={hidden ? "true" : undefined}
      className={back ? "hb-wh5-side hb-wh5-back" : "hb-wh5-side"}
      style={{ "--from": face.from, "--to": face.to } as React.CSSProperties}
    >
      <div className="hb-wh5-top">
        <span>{face.step}</span>
        <span>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <h3 className="hb-wh5-title">{face.title}</h3>
      <div className="hb-wh5-low">
        <p className="hb-wh5-text">{face.text}</p>
        <div className="hb-wh5-metric">
          <b>{face.metric}</b>
          <span>{face.metricLabel}</span>
        </div>
      </div>
    </div>
  );
}

export function MotionFlipSequence({
  faces = defaultFaces,
  accent = "#2f7bff",
  progress,
  autoPlay = false,
  duration = 6,
  length = 4,
  height = "100vh",
  className,
  style,
  ...rest
}: MotionFlipSequenceProps) {
  const ref = React.useRef<HTMLElement>(null);
  const n = Math.max(1, faces.length);
  const [angle, setAngle] = React.useState(() => angleAt(typeof progress === "number" ? progress : 0, n));
  const pinned = progress === undefined && !autoPlay;

  useProgress(
    ref,
    (p) => {
      const a = Math.round(angleAt(p, n) * 10) / 10;
      setAngle((old) => (old === a ? old : a));
    },
    progress,
    autoPlay,
    duration,
  );

  const frontIndex = Math.min(n - 1, 2 * Math.floor((angle + 270) / 360));
  const backIndex = Math.min(n - 1, 2 * Math.floor((angle + 90) / 360) + 1);
  const turn = ((angle % 360) + 360) % 360;
  const frontUp = turn < 90 || turn >= 270;
  const active = Math.min(n - 1, Math.round(angle / 180));
  const local = (angle % 180) / 180;
  const sheen = Math.sin(local * Math.PI);
  const rem = n - 1 - active;

  return (
    <section
      ref={ref}
      className={["hb-wh5", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={
        {
          "--hb-wh5-a": accent,
          "--hb-wh5-h": height,
          "--hb-wh5-len": length,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-motion-flip-sequence" precedence="default">{css}</style>
      <div className="hb-wh5-stage">
        <ol className="hb-wh5-steps">
          {faces.map((f, i) => (
            <li
              key={f.step}
              className="hb-wh5-step"
              data-on={i === active ? "true" : "false"}
              data-done={i < active ? "true" : "false"}
              aria-current={i === active ? "step" : undefined}
            >
              <b>{i + 1}</b>
              <span>
                {f.step}
                <span className="hb-wh5-name"> · {f.metric} {f.metricLabel}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="hb-wh5-scene">
          {Array.from({ length: Math.min(2, rem) }, (_, k) => (
            <span key={k} className="hb-wh5-deck" aria-hidden="true" style={{ "--k": 2 - k } as React.CSSProperties} />
          ))}
          <span
            className="hb-wh5-shadow"
            aria-hidden="true"
            style={{ "--hb-wh5-sq": Math.abs(Math.cos((angle * Math.PI) / 180)).toFixed(3) } as React.CSSProperties}
          />
          <div
            className="hb-wh5-card"
            style={
              {
                transform: `translateY(${(-sheen * 6).toFixed(2)}%) rotateY(${angle.toFixed(1)}deg) rotateX(${(sheen * 6).toFixed(2)}deg)`,
                "--hb-wh5-sheen": local.toFixed(3),
              } as React.CSSProperties
            }
          >
            <Side face={faces[frontIndex]} index={frontIndex} total={n} hidden={!frontUp} />
            <Side face={faces[backIndex]} index={backIndex} total={n} back hidden={frontUp} />
          </div>
        </div>
      </div>
    </section>
  );
}
