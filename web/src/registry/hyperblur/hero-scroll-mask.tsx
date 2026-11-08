"use client";

import * as React from "react";

export interface HeroScrollMaskLink {
  label: string;
  href: string;
}

export interface HeroScrollMaskFact {
  label: string;
  value: string;
}

export interface HeroScrollMaskProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  word?: string;
  year?: string;
  price?: string;
  eyebrow?: string;
  title?: string;
  facts?: HeroScrollMaskFact[];
  cta?: HeroScrollMaskLink | null;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const defaultFacts: HeroScrollMaskFact[] = [
  { label: "When", value: "May 20–22, 2027" },
  { label: "Where", value: "LX Factory, Lisbon" },
  { label: "Who", value: "38 speakers, 900 seats" },
];

const css = `
.hb-va7 {
  --hb-va7-accent: #c6f432;
  --hb-va7-s: 3.4;
  --hb-va7-x: 0;
  --hb-va7-o: 0;
  position: relative;
  width: 100%;
  height: var(--hb-va7-h);
  color: #ededed;
  font-family: inherit;
  background: #0b0c09;
}
.hb-va7[data-pinned="true"] { height: calc(var(--hb-va7-h) * var(--hb-va7-len)); }
.hb-va7 *, .hb-va7 *::before, .hb-va7 *::after { box-sizing: border-box; }
.hb-va7-stage {
  position: sticky;
  top: 0;
  height: var(--hb-va7-h);
  overflow: hidden;
  container-type: size;
  isolation: isolate;
  background:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px) 0 0 / 100% 12.5cqh,
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px) 0 0 / 12.5cqw 100%,
    #0b0c09;
}
.hb-va7-word {
  position: absolute;
  left: 50%;
  top: 47%;
  margin: 0;
  transform: translate(-50%, -50%) scale(var(--hb-va7-s));
  transform-origin: 50% 50%;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: 15.5cqw;
  font-weight: 700;
  line-height: 0.8;
  letter-spacing: calc(-0.06em + (var(--hb-va7-s) - 1) * 0.02em);
  text-transform: uppercase;
  white-space: nowrap;
  color: transparent;
  background:
    repeating-linear-gradient(104deg, rgba(10, 12, 8, 0.0) 0 1.4%, rgba(10, 12, 8, 0.28) 1.4% 1.9%),
    radial-gradient(30% 50% at 22% 40%, #f8ffd8, transparent 70%),
    radial-gradient(40% 60% at 70% 64%, #1f8f6a, transparent 72%),
    conic-gradient(from 210deg at 46% 54%, var(--hb-va7-accent), #3ad19a, #0f5d4a, #f2ff9e, var(--hb-va7-accent));
  background-size: 100% 100%, 220% 100%, 220% 100%, 220% 100%;
  background-position: 0 0, calc(var(--hb-va7-x) * 100%) 0, calc(var(--hb-va7-x) * -60% + 60%) 0, calc(var(--hb-va7-x) * 80%) 0;
  -webkit-background-clip: text;
  background-clip: text;
  will-change: transform;
}
.hb-va7-word sup {
  margin-left: 0.04em;
  font-size: 0.32em;
  vertical-align: 1.5em;
  letter-spacing: -0.02em;
}
.hb-va7-bar {
  position: absolute;
  inset: 0 0 auto;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.6cqh 4cqw;
  opacity: var(--hb-va7-o);
  transform: translateY(calc((1 - var(--hb-va7-o)) * -20px));
  font-size: clamp(11px, 1.3cqw, 14px);
}
.hb-va7-logo { display: inline-flex; align-items: center; gap: 0.5em; font-weight: 700; letter-spacing: -0.02em; }
.hb-va7-logo::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 0.2em;
  background: repeating-linear-gradient(104deg, var(--hb-va7-accent) 0 2px, transparent 2px 4px);
}
.hb-va7-links { display: flex; gap: 1.6em; color: #8f8f8f; }
.hb-va7-eyebrow {
  position: absolute;
  left: 50%;
  top: 22cqh;
  z-index: 2;
  transform: translate(-50%, calc((1 - var(--hb-va7-o)) * -14px));
  opacity: var(--hb-va7-o);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.15cqw, 13px);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--hb-va7-accent);
}
.hb-va7-title {
  position: absolute;
  left: 50%;
  top: 61cqh;
  z-index: 2;
  width: min(36rem, 86cqw);
  margin: 0;
  transform: translate(-50%, calc((1 - var(--hb-va7-o)) * 18px));
  opacity: var(--hb-va7-o);
  text-align: center;
  font-size: clamp(14px, 2cqw, 22px);
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: -0.015em;
  color: #d6d6d6;
}
.hb-va7-foot {
  position: absolute;
  inset: auto 4cqw 5cqh;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
  align-items: end;
  gap: 2cqw;
  padding-top: 2.4cqh;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.hb-va7-fact {
  opacity: var(--hb-va7-o);
  transform: translateY(calc((1 - var(--hb-va7-o)) * (14px + var(--hb-va7-i) * 10px)));
  font-size: clamp(11px, 1.35cqw, 15px);
}
.hb-va7-fact small {
  display: block;
  margin-bottom: 0.35em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.75em;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6f6f6f;
}
.hb-va7-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.75em 1.3em;
  border-radius: 999px;
  background: var(--hb-va7-accent);
  color: #10140a;
  font-size: clamp(12px, 1.35cqw, 15px);
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  opacity: var(--hb-va7-o);
  transform: scale(calc(0.9 + var(--hb-va7-o) * 0.1));
  box-shadow: 0 0 0 0 transparent, 0 12px 36px -12px var(--hb-va7-accent);
  transition: box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-va7-cta:hover { box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-va7-accent) 25%, transparent), 0 12px 36px -12px var(--hb-va7-accent); }
.hb-va7-cta:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-va7-cta b { padding-left: 0.6em; border-left: 1px solid rgba(16, 20, 10, 0.25); font-weight: 600; }
.hb-va7-hint {
  position: absolute;
  left: 50%;
  bottom: 5cqh;
  z-index: 1;
  transform: translateX(-50%);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 1cqw, 11px);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(237, 237, 237, 0.55);
  opacity: calc(1 - var(--hb-va7-o) * 4);
}
@media (max-width: 640px) {
  .hb-va7-foot { grid-template-columns: 1fr 1fr; }
  .hb-va7-links { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-va7-cta { transition: none; }
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

export function HeroScrollMask({
  word = "Fieldwork",
  year = "27",
  price = "€390",
  eyebrow = "A design conference · Lisbon",
  title = "Three days of talks, studio visits and long dinners with people who make things for a living.",
  facts = defaultFacts,
  cta = { label: "Get your ticket", href: "#" },
  accent = "#c6f432",
  progress,
  autoPlay = false,
  duration = 5,
  length = 3,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollMaskProps) {
  const ref = React.useRef<HTMLElement>(null);
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;

  useScrollProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      const k = ease(clamp01(p / 0.66));
      el.style.setProperty("--hb-va7-s", (3.4 - k * 2.4).toFixed(4));
      el.style.setProperty("--hb-va7-x", p.toFixed(4));
      el.style.setProperty("--hb-va7-o", ease(clamp01((p - 0.56) / 0.34)).toFixed(4));
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-va7", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={{ "--hb-va7-accent": accent, "--hb-va7-h": height, "--hb-va7-len": length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-hero-scroll-mask" precedence="default">{css}</style>
      <div className="hb-va7-stage">
        <div className="hb-va7-bar">
          <span className="hb-va7-logo">{word}</span>
          <span className="hb-va7-links" aria-hidden="true">
            <span>Speakers</span>
            <span>Program</span>
            <span>Venue</span>
          </span>
        </div>
        <span className="hb-va7-eyebrow">{eyebrow}</span>
        <Heading className="hb-va7-word" aria-label={year ? `${word} ${year}` : word}>
          {word}
          {year ? <sup>{year}</sup> : null}
        </Heading>
        {title ? <p className="hb-va7-title">{title}</p> : null}
        <div className="hb-va7-foot">
          {facts.map((f, i) => (
            <div key={f.label} className="hb-va7-fact" style={{ "--hb-va7-i": i } as React.CSSProperties}>
              <small>{f.label}</small>
              {f.value}
            </div>
          ))}
          {cta ? (
            <a className="hb-va7-cta" href={cta.href}>
              {cta.label}
              {price ? <b>{price}</b> : null}
            </a>
          ) : null}
        </div>
        <span className="hb-va7-hint" aria-hidden="true">Scroll</span>
      </div>
    </section>
  );
}
