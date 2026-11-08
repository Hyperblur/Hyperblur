"use client";

import * as React from "react";

export interface MotionSkewMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  chips?: string[];
  speed?: number;
  skew?: number;
  sensitivity?: number;
  showMeter?: boolean;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
}

const defaultWords = ["Strategy", "Identity", "Motion", "Product", "Launch"];
const defaultChips = [
  "Brand systems",
  "Design ops",
  "Web platforms",
  "Campaign film",
  "Type design",
  "Packaging",
  "Prototyping",
  "Art direction",
];

const css = `
.hb-wh3 {
  --hb-wh3-a: #2f7bff;
  --hb-wh3-s: 0;
  position: relative;
  width: 100%;
  overflow: hidden;
  color: #ededed;
  font-family: inherit;
  container-type: inline-size;
  padding: clamp(10px, 2.6cqw, 28px) 0;
}
.hb-wh3 *, .hb-wh3 *::before, .hb-wh3 *::after { box-sizing: border-box; }
.hb-wh3-meter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  padding: 0 clamp(12px, 3cqw, 32px) clamp(6px, 1.6cqw, 18px);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 1.3cqw, 12px);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7a7a7a;
}
.hb-wh3-gauge { display: inline-flex; align-items: center; gap: 0.7em; font-variant-numeric: tabular-nums; }
.hb-wh3-gauge b { min-width: 3.4em; font-weight: 500; text-align: right; color: #ededed; }
.hb-wh3-ticks { display: inline-flex; gap: 2px; }
.hb-wh3-ticks i {
  width: 3px;
  height: 9px;
  border-radius: 1px;
  background: #2a2a2a;
  transition: background 0.12s linear;
}
.hb-wh3-ticks i[data-on="true"] { background: var(--hb-wh3-a); box-shadow: 0 0 6px color-mix(in srgb, var(--hb-wh3-a) 60%, transparent); }
.hb-wh3-row {
  position: relative;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
}
.hb-wh3-track {
  display: flex;
  width: max-content;
  will-change: transform;
  transform-origin: 50% 60%;
}
.hb-wh3-group { display: flex; align-items: center; flex: none; }
.hb-wh3-word {
  position: relative;
  display: inline-block;
  padding: 0 0.22em;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(30px, 11cqw, 150px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.04em;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1px #4d4d4d;
}
.hb-wh3-word::after {
  content: attr(data-t);
  position: absolute;
  inset: 0;
  padding: inherit;
  color: #f4f4f4;
  -webkit-text-stroke: 0;
  background: linear-gradient(100deg, #f4f4f4 30%, color-mix(in srgb, var(--hb-wh3-a) 70%, #fff));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: var(--hb-wh3-s);
}
.hb-wh3-star {
  flex: none;
  width: clamp(14px, 3.6cqw, 46px);
  height: clamp(14px, 3.6cqw, 46px);
  margin: 0 0.4em;
  color: var(--hb-wh3-a);
  transform: rotate(calc(var(--hb-wh3-s) * 90deg));
}
.hb-wh3-row-b { margin-top: clamp(6px, 1.6cqw, 18px); }
.hb-wh3-chip {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  margin-right: 0.6em;
  padding: 0.5em 0.95em;
  border-radius: 999px;
  border: 1px solid #262626;
  background: linear-gradient(180deg, #161616, #101010);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  font-size: clamp(10px, 1.7cqw, 16px);
  font-weight: 500;
  white-space: nowrap;
  color: #cfcfcf;
}
.hb-wh3-chip::before {
  content: "";
  width: 0.45em;
  height: 0.45em;
  border-radius: 50%;
  background: color-mix(in srgb, var(--hb-wh3-a) 80%, #fff);
  opacity: calc(0.35 + var(--hb-wh3-s) * 0.65);
}
@media (prefers-reduced-motion: reduce) {
  .hb-wh3-track { will-change: auto; }
  .hb-wh3-ticks i { transition: none; }
}
`;

function Star() {
  return (
    <svg className="hb-wh3-star" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5c.5 5.6 4.9 10 10.5 10.5-5.6.5-10 4.9-10.5 10.5-.5-5.6-4.9-10-10.5-10.5C7.1 11.5 11.5 7.1 12 1.5z" fill="currentColor" />
    </svg>
  );
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

function burst(ms: number, duration: number) {
  const d = Math.max(1.5, duration) * 1000;
  const ph = (ms % d) / d;
  if (ph < 0.22) return Math.sin((Math.PI * ph) / 0.22) * 2.4;
  if (ph > 0.5 && ph < 0.66) return -Math.sin((Math.PI * (ph - 0.5)) / 0.16) * 1.7;
  return 0;
}

const TICKS = 12;
const COPIES = 4;

export function MotionSkewMarquee({
  words = defaultWords,
  chips = defaultChips,
  speed = 60,
  skew = 14,
  sensitivity = 1,
  showMeter = true,
  accent = "#2f7bff",
  progress,
  autoPlay = false,
  duration = 5,
  className,
  style,
  ...rest
}: MotionSkewMarqueeProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const trackA = React.useRef<HTMLDivElement>(null);
  const trackB = React.useRef<HTMLDivElement>(null);
  const readout = React.useRef<HTMLElement>(null);
  const ticks = React.useRef<HTMLSpanElement>(null);
  const progressRef = React.useRef(progress);

  React.useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const controlled = typeof progress === "number";

  React.useEffect(() => {
    const root = ref.current;
    const a = trackA.current;
    const b = trackB.current;
    if (!root || !a || !b) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sc = findScroller(root);
    const readScroll = () => (sc ? sc.scrollTop : window.scrollY);
    let lastScroll = readScroll();
    let lastP = progressRef.current ?? 0;
    let raf = 0;
    let last = 0;
    let t = 0;
    let vs = 0;
    let xa = 0;
    let xb = 0;
    let dir = 1;
    let visible = true;
    let shownTicks = -1;
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(root);
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(50, now - last) : 16;
      last = now;
      if (!visible) return;
      t += dt;
      let v = 0;
      if (controlled) {
        const p = progressRef.current ?? 0;
        v = ((p - lastP) / dt) * 1000 * 3;
        lastP = p;
      } else if (autoPlay) {
        v = burst(t, duration);
      } else {
        const s = readScroll();
        v = ((s - lastScroll) / dt) * 1000 / 900;
        lastScroll = s;
      }
      v *= sensitivity;
      vs += (v - vs) * Math.min(1, dt * 0.009);
      if (Math.abs(vs) > 0.05) dir = vs < 0 ? -1 : 1;
      const mag = Math.min(3, Math.abs(vs));
      const step = (dt / 1000) * speed * (1 + mag * 4) * dir;
      const wa = (a.firstElementChild as HTMLElement | null)?.offsetWidth || 1;
      const wb = (b.firstElementChild as HTMLElement | null)?.offsetWidth || 1;
      xa = (((xa + step) % wa) + wa) % wa;
      xb = (((xb + step * 0.8) % wb) + wb) % wb;
      const k = Math.max(-1, Math.min(1, vs / 1.6));
      const sk = (-k * skew).toFixed(2);
      const sx = (1 + Math.abs(k) * 0.06).toFixed(3);
      a.style.transform = `translate3d(${(-xa).toFixed(1)}px,0,0) skewX(${sk}deg) scaleX(${sx})`;
      b.style.transform = `translate3d(${(xb - wb).toFixed(1)}px,0,0) skewX(${(-Number(sk) * 0.6).toFixed(2)}deg)`;
      root.style.setProperty("--hb-wh3-s", Math.min(1, mag / 1.5).toFixed(3));
      if (readout.current) readout.current.textContent = `${(1 + mag * 4).toFixed(1)}x`;
      const on = Math.round(Math.min(1, mag / 2.2) * TICKS);
      if (on !== shownTicks && ticks.current) {
        shownTicks = on;
        Array.from(ticks.current.children).forEach((el, i) => el.setAttribute("data-on", i < on ? "true" : "false"));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [controlled, autoPlay, duration, speed, skew, sensitivity]);

  const groupA = (key: number) => (
    <div className="hb-wh3-group" key={key} aria-hidden={key > 0 ? "true" : undefined}>
      {words.map((w, i) => (
        <React.Fragment key={`${w}-${i}`}>
          <span className="hb-wh3-word" data-t={w}>
            {w}
          </span>
          <Star />
        </React.Fragment>
      ))}
    </div>
  );

  const groupB = (key: number) => (
    <div className="hb-wh3-group" key={key} aria-hidden={key > 0 ? "true" : undefined}>
      {chips.map((c, i) => (
        <span className="hb-wh3-chip" key={`${c}-${i}`}>
          {c}
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      className={["hb-wh3", className].filter(Boolean).join(" ")}
      style={{ "--hb-wh3-a": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-motion-skew-marquee" precedence="default">{css}</style>
      {showMeter ? (
        <div className="hb-wh3-meter" aria-hidden="true">
          <span>Scroll speed</span>
          <span className="hb-wh3-gauge">
            <span className="hb-wh3-ticks" ref={ticks}>
              {Array.from({ length: TICKS }, (_, i) => (
                <i key={i} data-on="false" />
              ))}
            </span>
            <b ref={readout}>1.0x</b>
          </span>
        </div>
      ) : null}
      <div className="hb-wh3-row">
        <div className="hb-wh3-track" ref={trackA}>
          {Array.from({ length: COPIES }, (_, i) => groupA(i))}
        </div>
      </div>
      <div className="hb-wh3-row hb-wh3-row-b">
        <div className="hb-wh3-track" ref={trackB}>
          {Array.from({ length: COPIES }, (_, i) => groupB(i))}
        </div>
      </div>
    </div>
  );
}
