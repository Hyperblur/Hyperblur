"use client";

import * as React from "react";

export interface HeroScrollCurtainLink {
  label: string;
  href: string;
}

export interface HeroScrollCurtainShow {
  date: string;
  title: string;
  tag: string;
}

export interface HeroScrollCurtainProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  marquee?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroScrollCurtainLink | null;
  secondaryCta?: HeroScrollCurtainLink | null;
  shows?: HeroScrollCurtainShow[];
  curtainColor?: string;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const defaultShows: HeroScrollCurtainShow[] = [
  { date: "Apr 03", title: "The Glass Orchard", tag: "Premiere" },
  { date: "Apr 19", title: "Nine Small Hours", tag: "Drama" },
  { date: "May 08", title: "Salt & Brass", tag: "Musical" },
];

const css = `
.hb-va5 {
  --hb-va5-accent: #e8c27a;
  --hb-va5-red: #b3122e;
  --hb-va5-e: 0;
  --hb-va5-o: 0;
  position: relative;
  width: 100%;
  height: var(--hb-va5-h);
  color: #f3ece0;
  font-family: inherit;
  background: #070505;
}
.hb-va5[data-pinned="true"] { height: calc(var(--hb-va5-h) * var(--hb-va5-len)); }
.hb-va5 *, .hb-va5 *::before, .hb-va5 *::after { box-sizing: border-box; }
.hb-va5-stage {
  position: sticky;
  top: 0;
  height: var(--hb-va5-h);
  overflow: hidden;
  container-type: size;
  isolation: isolate;
  background:
    radial-gradient(60% 40% at 50% 104%, rgba(232, 194, 122, 0.16), transparent 70%),
    linear-gradient(180deg, #0b0707, #120a09 70%, #1a0f0b);
}
.hb-va5-spot {
  position: absolute;
  left: 50%;
  top: -10%;
  width: 70cqw;
  height: 120%;
  transform: translateX(-50%);
  background: conic-gradient(from 168deg at 50% 0%, transparent 0deg, rgba(255, 236, 200, 0.16) 12deg, rgba(255, 236, 200, 0.07) 20deg, transparent 24deg);
  opacity: var(--hb-va5-e);
  filter: blur(6px);
  pointer-events: none;
}
.hb-va5-floor {
  position: absolute;
  inset: auto 0 0;
  height: 16%;
  background: linear-gradient(180deg, #2a1810, #120a07);
  box-shadow: inset 0 1px 0 rgba(232, 194, 122, 0.25);
}
.hb-va5-floor::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: 40cqw;
  height: 70%;
  transform: translateX(-50%);
  background: radial-gradient(50% 100% at 50% 0%, rgba(255, 230, 190, 0.28), transparent 70%);
  opacity: var(--hb-va5-e);
}
.hb-va5-show {
  position: absolute;
  inset: 0 0 16%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10cqh 8cqw 0;
  text-align: center;
  opacity: calc(0.15 + var(--hb-va5-o) * 0.85);
  transform: scale(calc(0.94 + var(--hb-va5-o) * 0.06));
}
.hb-va5-eyebrow {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.1cqw, 12px);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--hb-va5-accent);
}
.hb-va5-title {
  max-width: 16ch;
  margin: 0.5em 0 0;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(1.9rem, 5.8cqw, 5.2rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.045em;
}
.hb-va5-sub {
  max-width: 46ch;
  margin: 0.9em 0 0;
  font-size: clamp(12px, 1.45cqw, 16px);
  line-height: 1.55;
  color: rgba(243, 236, 224, 0.62);
}
.hb-va5-actions { display: flex; gap: 0.7rem; margin-top: 1.6em; }
.hb-va5-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75em 1.35em;
  border-radius: 999px;
  font-size: clamp(12px, 1.35cqw, 15px);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease, border-color 0.3s ease;
}
.hb-va5-btn:hover { transform: translateY(-1px); }
.hb-va5-btn:focus-visible { outline: 2px solid var(--hb-va5-accent); outline-offset: 3px; }
.hb-va5-solid {
  background: linear-gradient(180deg, #f4d697, var(--hb-va5-accent));
  color: #2a1606;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 12px 34px -12px rgba(232, 194, 122, 0.7);
}
.hb-va5-ghost { border: 1px solid rgba(243, 236, 224, 0.22); color: #f3ece0; }
.hb-va5-ghost:hover { border-color: rgba(243, 236, 224, 0.45); background: rgba(243, 236, 224, 0.05); }
.hb-va5-cards { display: flex; gap: 0.7rem; margin-top: 2.2em; }
.hb-va5-card {
  min-width: 13em;
  padding: 0.75em 0.9em;
  border: 1px solid rgba(232, 194, 122, 0.18);
  border-radius: 0.8em;
  background: linear-gradient(180deg, rgba(40, 24, 16, 0.75), rgba(20, 12, 9, 0.75));
  text-align: left;
  font-size: clamp(10px, 1.15cqw, 13px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.hb-va5-card b { display: block; margin-top: 0.25em; font-size: 1.12em; font-weight: 600; color: #f3ece0; }
.hb-va5-meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.85em;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(243, 236, 224, 0.5);
}
.hb-va5-meta span:last-child { color: var(--hb-va5-accent); }
.hb-va5-half {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  width: calc(50% * (1 - var(--hb-va5-e) * 0.86) + 1px);
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.45), transparent 22%, transparent 70%, rgba(0, 0, 0, 0.55)),
    repeating-linear-gradient(90deg,
      color-mix(in srgb, var(--hb-va5-red) 45%, #000) 0%,
      var(--hb-va5-red) 2.4%,
      color-mix(in srgb, var(--hb-va5-red) 80%, #fff) 3.4%,
      color-mix(in srgb, var(--hb-va5-red) 70%, #000) 5.2%,
      color-mix(in srgb, var(--hb-va5-red) 45%, #000) 6.4%);
  will-change: width, clip-path;
}
.hb-va5-left {
  left: 0;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--hb-va5-e) * 22%), 0 100%);
  box-shadow: inset -24px 0 40px -20px rgba(0, 0, 0, 0.7);
}
.hb-va5-right {
  right: 0;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - var(--hb-va5-e) * 22%));
  box-shadow: inset 24px 0 40px -20px rgba(0, 0, 0, 0.7);
}
.hb-va5-word {
  position: absolute;
  top: 50%;
  width: 100cqw;
  transform: translateY(-50%);
  text-align: center;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(2rem, 9.4cqw, 8.4rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(180deg, #fff1cf, var(--hb-va5-accent) 55%, #9c7637);
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.5));
  pointer-events: none;
}
.hb-va5-word small {
  display: block;
  margin-top: 0.7em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.13em;
  font-weight: 500;
  letter-spacing: 0.4em;
}
.hb-va5-left .hb-va5-word { right: -50cqw; }
.hb-va5-right .hb-va5-word { left: -50cqw; }
.hb-va5-valance {
  position: absolute;
  inset: 0 0 auto;
  z-index: 3;
  height: 9cqh;
  background:
    linear-gradient(180deg, transparent 78%, var(--hb-va5-accent) 78%, var(--hb-va5-accent) 84%, transparent 84%),
    linear-gradient(180deg, color-mix(in srgb, var(--hb-va5-red) 55%, #000), var(--hb-va5-red));
  -webkit-mask: radial-gradient(3.2cqw 2.2cqh at 50% 100%, transparent 98%, #000 100%) 0 0 / 6.4cqw 100% repeat-x;
  mask: radial-gradient(3.2cqw 2.2cqh at 50% 100%, transparent 98%, #000 100%) 0 0 / 6.4cqw 100% repeat-x;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}
.hb-va5-hint {
  position: absolute;
  left: 50%;
  bottom: 4cqh;
  z-index: 3;
  transform: translateX(-50%);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 1cqw, 11px);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(243, 236, 224, 0.55);
  opacity: calc(1 - var(--hb-va5-e) * 3);
}
@media (prefers-reduced-motion: reduce) {
  .hb-va5-btn { transition: none; }
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

export function HeroScrollCurtain({
  marquee = "Opening night",
  eyebrow = "The Aldridge Theatre · Spring Season 2027",
  title = "The house lights are going down",
  subtitle = "Twelve productions, three world premieres and a season pass that pays for itself by the fourth show.",
  primaryCta = { label: "Get a season pass", href: "#" },
  secondaryCta = { label: "See the program", href: "#" },
  shows = defaultShows,
  curtainColor = "#b3122e",
  accent = "#e8c27a",
  progress,
  autoPlay = false,
  duration = 5,
  length = 3,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollCurtainProps) {
  const ref = React.useRef<HTMLElement>(null);
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;

  useScrollProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--hb-va5-e", ease(clamp01(p / 0.8)).toFixed(4));
      el.style.setProperty("--hb-va5-o", ease(clamp01((p - 0.3) / 0.55)).toFixed(4));
    },
    progress,
    autoPlay,
    duration,
  );

  const word = (
    <span className="hb-va5-word">
      {marquee}
      <small>Spring season · 2027</small>
    </span>
  );

  return (
    <section
      ref={ref}
      className={["hb-va5", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={
        {
          "--hb-va5-accent": accent,
          "--hb-va5-red": curtainColor,
          "--hb-va5-h": height,
          "--hb-va5-len": length,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-hero-scroll-curtain" precedence="default">{css}</style>
      <div className="hb-va5-stage">
        <div className="hb-va5-spot" aria-hidden="true" />
        <div className="hb-va5-floor" aria-hidden="true" />
        <div className="hb-va5-show">
          <span className="hb-va5-eyebrow">{eyebrow}</span>
          <Heading className="hb-va5-title">{title}</Heading>
          {subtitle ? <p className="hb-va5-sub">{subtitle}</p> : null}
          {primaryCta || secondaryCta ? (
            <div className="hb-va5-actions">
              {primaryCta ? (
                <a className="hb-va5-btn hb-va5-solid" href={primaryCta.href}>
                  {primaryCta.label}
                </a>
              ) : null}
              {secondaryCta ? (
                <a className="hb-va5-btn hb-va5-ghost" href={secondaryCta.href}>
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          ) : null}
          {shows.length ? (
            <div className="hb-va5-cards">
              {shows.map((s) => (
                <div key={s.title} className="hb-va5-card">
                  <span className="hb-va5-meta">
                    <span>{s.date}</span>
                    <span>{s.tag}</span>
                  </span>
                  <b>{s.title}</b>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="hb-va5-half hb-va5-left" aria-hidden="true">{word}</div>
        <div className="hb-va5-half hb-va5-right" aria-hidden="true">{word}</div>
        <div className="hb-va5-valance" aria-hidden="true" />
        <span className="hb-va5-hint" aria-hidden="true">Scroll to open the curtain</span>
      </div>
    </section>
  );
}
