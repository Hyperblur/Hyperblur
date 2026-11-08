"use client";

import * as React from "react";

export interface HeroScrollExpandLink {
  label: string;
  href: string;
}

export interface HeroScrollExpandProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  titleStart?: string;
  titleEnd?: string;
  subtitle?: string;
  caption?: string;
  cta?: HeroScrollExpandLink | null;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-va1 {
  --hb-va1-accent: #ff9a3c;
  --hb-va1-e: 0;
  --hb-va1-o: 0;
  position: relative;
  width: 100%;
  height: var(--hb-va1-h);
  color: #ededed;
  font-family: inherit;
  background: #0a0a0a;
}
.hb-va1[data-pinned="true"] { height: calc(var(--hb-va1-h) * var(--hb-va1-len)); }
.hb-va1 *, .hb-va1 *::before, .hb-va1 *::after { box-sizing: border-box; }
.hb-va1-stage {
  position: sticky;
  top: 0;
  height: var(--hb-va1-h);
  overflow: hidden;
  container-type: size;
  isolation: isolate;
}
.hb-va1-top {
  position: absolute;
  inset: 0 0 auto;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.4cqh 4cqw;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.15cqw, 13px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(237, 237, 237, 0.62);
}
.hb-va1-rec { display: inline-flex; align-items: center; gap: 0.7em; }
.hb-va1-rec::before {
  content: "";
  width: 0.62em;
  height: 0.62em;
  border-radius: 50%;
  background: var(--hb-va1-accent);
  box-shadow: 0 0 0 0.3em color-mix(in srgb, var(--hb-va1-accent) 22%, transparent);
}
.hb-va1-media {
  position: absolute;
  inset: 0;
  z-index: 1;
  clip-path: inset(calc((1 - var(--hb-va1-e)) * 27%) calc((1 - var(--hb-va1-e)) * 32%) round calc((1 - var(--hb-va1-e)) * 26px));
  will-change: clip-path;
}
.hb-va1-scene {
  position: absolute;
  inset: 0;
  transform: scale(calc(1.32 - var(--hb-va1-e) * 0.32));
  transform-origin: 50% 58%;
  background:
    radial-gradient(18% 24% at 50% 62%, rgba(255, 214, 160, 0.95), rgba(255, 150, 70, 0.55) 40%, transparent 72%),
    radial-gradient(60% 50% at 50% 66%, color-mix(in srgb, var(--hb-va1-accent) 55%, transparent), transparent 70%),
    linear-gradient(180deg, #070b1d 0%, #1b1d3c 28%, #6a3a4d 50%, #e0844a 62%, #2a1b26 63%, #120d17 100%);
}
.hb-va1-sun {
  position: absolute;
  left: 50%;
  top: 62.6%;
  width: 11cqw;
  aspect-ratio: 1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle at 50% 40%, #fff3df, #ffc27a 55%, #ff8e3c);
  box-shadow: 0 0 6cqw 2cqw rgba(255, 160, 80, 0.5);
  clip-path: inset(0 0 50% 0);
}
.hb-va1-sea {
  position: absolute;
  inset: 62.6% 0 0;
  background:
    repeating-linear-gradient(180deg, rgba(255, 196, 130, 0.28) 0 1px, transparent 1px 7px),
    linear-gradient(180deg, rgba(255, 150, 80, 0.35), transparent 70%);
  -webkit-mask-image: radial-gradient(40% 90% at 50% 0%, #000, transparent);
  mask-image: radial-gradient(40% 90% at 50% 0%, #000, transparent);
}
.hb-va1-boat { position: absolute; left: 61%; top: 55.5%; width: 4.4cqw; color: #0b0812; }
.hb-va1-grain {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.55));
}
.hb-va1-head {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4cqw;
  margin: 0;
  pointer-events: none;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(2.6rem, 10.2cqw, 9rem);
  font-weight: 600;
  line-height: 0.9;
  letter-spacing: -0.055em;
  white-space: nowrap;
}
.hb-va1-w {
  display: block;
  opacity: calc(1 - var(--hb-va1-e) * 1.6);
  filter: blur(calc(var(--hb-va1-e) * 10px));
}
.hb-va1-w:first-child { transform: translateX(calc(var(--hb-va1-e) * -38cqw)); }
.hb-va1-w:last-child {
  transform: translateX(calc(var(--hb-va1-e) * 38cqw));
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(237, 237, 237, 0.92);
}
.hb-va1-sub {
  position: absolute;
  left: 50%;
  bottom: 9cqh;
  z-index: 3;
  width: min(30rem, 80cqw);
  margin: 0;
  transform: translate(-50%, calc(var(--hb-va1-e) * 30px));
  opacity: calc(1 - var(--hb-va1-e) * 2.2);
  text-align: center;
  font-size: clamp(12px, 1.5cqw, 16px);
  line-height: 1.55;
  color: #a1a1a1;
}
.hb-va1-hint {
  display: block;
  margin-top: 1.1em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.72em;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(237, 237, 237, 0.45);
}
.hb-va1-hint::after {
  content: "";
  display: block;
  width: 1px;
  height: 2.4em;
  margin: 0.8em auto 0;
  background: linear-gradient(var(--hb-va1-accent), transparent);
}
.hb-va1-over {
  position: absolute;
  inset: auto 0 0;
  z-index: 3;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  padding: 0 4cqw 6cqh;
  opacity: var(--hb-va1-o);
  transform: translateY(calc((1 - var(--hb-va1-o)) * 24px));
  pointer-events: none;
}
.hb-va1[data-over="true"] .hb-va1-over { pointer-events: auto; }
.hb-va1-cap {
  max-width: 26ch;
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(1.1rem, 3.3cqw, 2.6rem);
  font-weight: 500;
  line-height: 1.04;
  letter-spacing: -0.03em;
  text-shadow: 0 2px 30px rgba(0, 0, 0, 0.45);
}
.hb-va1-tc {
  display: block;
  margin-bottom: 0.9rem;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.1cqw, 12px);
  letter-spacing: 0.16em;
  color: rgba(255, 230, 200, 0.75);
}
.hb-va1-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75em;
  flex-shrink: 0;
  padding: 0.5em 1.25em 0.5em 0.5em;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.18);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  color: #fff;
  font-size: clamp(12px, 1.4cqw, 15px);
  font-weight: 500;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 14px 40px -12px rgba(0, 0, 0, 0.7);
  transition: background 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-va1-cta:hover { background: rgba(10, 10, 10, 0.72); transform: translateY(-1px); }
.hb-va1-cta:focus-visible { outline: 2px solid var(--hb-va1-accent); outline-offset: 3px; }
.hb-va1-play {
  display: grid;
  place-items: center;
  width: 2.3em;
  height: 2.3em;
  border-radius: 50%;
  background: var(--hb-va1-accent);
  color: #1a0d02;
}
.hb-va1-bar {
  position: absolute;
  left: 4cqw;
  right: 4cqw;
  bottom: 3cqh;
  z-index: 3;
  height: 2px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.14);
  opacity: var(--hb-va1-o);
  overflow: hidden;
}
.hb-va1-bar::after {
  content: "";
  position: absolute;
  inset: 0;
  transform-origin: 0 50%;
  transform: scaleX(var(--hb-va1-o));
  background: var(--hb-va1-accent);
}
@media (prefers-reduced-motion: reduce) {
  .hb-va1-cta { transition: none; }
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

function stamp(seconds: number) {
  const s = Math.floor(seconds);
  const f = Math.floor((seconds - s) * 24);
  return `00:${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
}

export function HeroScrollExpand({
  eyebrow = "Lumen Pictures · Showreel 2027",
  titleStart = "Stories",
  titleEnd = "in motion",
  subtitle = "An independent studio for brand films, documentaries and the occasional music video.",
  caption = "Forty-two films, nine countries, one reel cut from all of it.",
  cta = { label: "Watch the full reel", href: "#" },
  accent = "#ff9a3c",
  progress,
  autoPlay = false,
  duration = 5,
  length = 3,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollExpandProps) {
  const ref = React.useRef<HTMLElement>(null);
  const tcRef = React.useRef<HTMLSpanElement>(null);
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;

  useScrollProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      const e = ease(clamp01(p / 0.74));
      const o = clamp01((p - 0.7) / 0.24);
      el.style.setProperty("--hb-va1-e", e.toFixed(4));
      el.style.setProperty("--hb-va1-o", o.toFixed(4));
      el.dataset.over = o > 0.5 ? "true" : "false";
      if (tcRef.current) tcRef.current.textContent = `REEL 07  ${stamp(p * 134)}`;
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-va1", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={{ "--hb-va1-accent": accent, "--hb-va1-h": height, "--hb-va1-len": length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-hero-scroll-expand" precedence="default">{css}</style>
      <div className="hb-va1-stage">
        <div className="hb-va1-top">
          <span className="hb-va1-rec">{eyebrow}</span>
          <span>Scroll</span>
        </div>
        <div className="hb-va1-media" aria-hidden="true">
          <div className="hb-va1-scene">
            <div className="hb-va1-sun" />
            <div className="hb-va1-sea" />
            <svg className="hb-va1-boat" viewBox="0 0 40 40" fill="currentColor">
              <path d="M19 4 L19 30 L6 30 Z" />
              <path d="M21 9 L21 30 L33 30 Z" opacity="0.85" />
              <path d="M4 32 H36 L32 37 H8 Z" />
            </svg>
          </div>
          <div className="hb-va1-grain" />
        </div>
        <Heading className="hb-va1-head">
          <span className="hb-va1-w">{titleStart}</span>
          <span className="hb-va1-w">{titleEnd}</span>
        </Heading>
        {subtitle ? (
          <p className="hb-va1-sub">
            {subtitle}
            <span className="hb-va1-hint" aria-hidden="true">Scroll to play</span>
          </p>
        ) : null}
        <div className="hb-va1-over">
          <p className="hb-va1-cap">
            <span className="hb-va1-tc" ref={tcRef} aria-hidden="true">REEL 07  00:00:00:00</span>
            {caption}
          </p>
          {cta ? (
            <a className="hb-va1-cta" href={cta.href}>
              <span className="hb-va1-play" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M3 1.6v8.8c0 .5.5.8.9.5l6.6-4.4c.4-.3.4-.8 0-1L3.9 1.1c-.4-.3-.9 0-.9.5Z" />
                </svg>
              </span>
              {cta.label}
            </a>
          ) : null}
        </div>
        <div className="hb-va1-bar" aria-hidden="true" />
      </div>
    </section>
  );
}
