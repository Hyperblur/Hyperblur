"use client";

import * as React from "react";

export interface HeroScrollHorizontalLink {
  label: string;
  href: string;
}

export interface HeroScrollHorizontalChapter {
  title: string;
  text: string;
  stat: string;
  statLabel: string;
}

export interface HeroScrollHorizontalProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: HeroScrollHorizontalLink | null;
  chapters?: HeroScrollHorizontalChapter[];
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const defaultChapters: HeroScrollHorizontalChapter[] = [
  { title: "Harvest", text: "Only the ripest cherries, picked by hand over six passes of the same trees.", stat: "1,740 m", statLabel: "altitude" },
  { title: "Wash", text: "Pulped the same afternoon, then fermented for 36 hours in spring water.", stat: "36 h", statLabel: "ferment" },
  { title: "Dry", text: "Turned every hour on raised beds until the beans settle at eleven percent.", stat: "18 days", statLabel: "on the beds" },
  { title: "Roast", text: "Small batches in Lisbon, light enough to keep the panela and plum.", stat: "212 °C", statLabel: "first crack" },
  { title: "Brew", text: "Fifteen grams, two hundred and fifty of water, and four quiet minutes.", stat: "1:16", statLabel: "ratio" },
];

const art = [
  <g key="a">
    <path d="M60 18c-6 14-6 26 0 38" stroke="#7aa35a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M60 30c10-8 22-8 30-2-8 8-20 9-30 2z" fill="#4f7a3a" />
    <circle cx="44" cy="70" r="15" fill="#c2342c" />
    <circle cx="70" cy="76" r="17" fill="#a3221d" />
    <circle cx="56" cy="94" r="14" fill="#d9463a" />
    <circle cx="40" cy="65" r="4" fill="#fff" opacity="0.35" />
    <circle cx="65" cy="70" r="4.5" fill="#fff" opacity="0.3" />
  </g>,
  <g key="b" fill="none" strokeLinecap="round">
    <path d="M14 46c12-8 24 8 36 0s24 8 36 0 18 4 20 2" stroke="#6fb7d6" strokeWidth="3" />
    <path d="M14 64c12-8 24 8 36 0s24 8 36 0 18 4 20 2" stroke="#4d93b3" strokeWidth="3" />
    <path d="M14 82c12-8 24 8 36 0s24 8 36 0 18 4 20 2" stroke="#356f8a" strokeWidth="3" />
    <ellipse cx="46" cy="56" rx="6" ry="8" fill="#e9d5a8" />
    <ellipse cx="76" cy="73" rx="6" ry="8" fill="#d8bf8a" />
  </g>,
  <g key="c">
    <rect x="12" y="62" width="96" height="10" rx="3" fill="#6b4a2f" />
    <path d="M18 72v26M102 72v26" stroke="#4a3220" strokeWidth="4" />
    {Array.from({ length: 14 }, (_, i) => (
      <ellipse key={i} cx={20 + i * 6.2} cy={58 - (i % 3)} rx="3.2" ry="4.2" fill={i % 2 ? "#c9a46a" : "#b38b52"} />
    ))}
    <circle cx="88" cy="26" r="11" fill="#f5c46b" />
  </g>,
  <g key="d">
    <circle cx="60" cy="62" r="34" fill="#2b1b12" stroke="#8a5a3a" strokeWidth="4" />
    <circle cx="60" cy="62" r="22" fill="none" stroke="#5a3a24" strokeWidth="2" strokeDasharray="4 5" />
    {Array.from({ length: 9 }, (_, i) => (
      <ellipse
        key={i}
        cx={(60 + Math.cos(i * 0.7) * (8 + i * 1.6)).toFixed(2)}
        cy={(62 + Math.sin(i * 0.7) * (8 + i * 1.6)).toFixed(2)}
        rx="3"
        ry="4"
        fill="#6e3f1f"
      />
    ))}
    <path d="M60 22c-4-6 4-10 0-16M72 24c-4-6 4-10 0-16" stroke="#a1a1a1" strokeWidth="2" fill="none" opacity="0.5" />
  </g>,
  <g key="e">
    <path d="M26 48h60v20a30 30 0 0 1-60 0z" fill="#efe6d8" />
    <path d="M86 54h6a10 10 0 0 1 0 20h-8" stroke="#efe6d8" strokeWidth="5" fill="none" />
    <ellipse cx="56" cy="50" rx="28" ry="5" fill="#5a3418" />
    <path d="M18 104h76" stroke="#3a2a1d" strokeWidth="4" strokeLinecap="round" />
    <path d="M46 36c-4-6 4-10 0-16M60 36c-4-6 4-10 0-16" stroke="#a1a1a1" strokeWidth="2" fill="none" opacity="0.5" />
  </g>,
];

const tones = ["#1d1210", "#0f1619", "#1a150d", "#170f0b", "#14110f"];

const css = `
.hb-va3 {
  --hb-va3-accent: #e8875a;
  --hb-va3-p: 0;
  position: relative;
  width: 100%;
  height: var(--hb-va3-h);
  color: #efe6d8;
  font-family: inherit;
  background: #0d0a08;
}
.hb-va3[data-pinned="true"] { height: calc(var(--hb-va3-h) * var(--hb-va3-len)); }
.hb-va3 *, .hb-va3 *::before, .hb-va3 *::after { box-sizing: border-box; }
.hb-va3-stage {
  position: sticky;
  top: 0;
  height: var(--hb-va3-h);
  overflow: hidden;
  container-type: size;
  background: #0d0a08;
}
.hb-va3-track {
  display: flex;
  width: max-content;
  height: 100%;
  transform: translateX(calc((100cqw - 100%) * var(--hb-va3-p)));
  will-change: transform;
}
.hb-va3-intro {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 74cqw;
  height: 100%;
  padding: 0 6cqw 0 6cqw;
  background:
    radial-gradient(70% 70% at 90% 50%, color-mix(in srgb, var(--hb-va3-accent) 18%, transparent), transparent 70%),
    #0d0a08;
}
.hb-va3-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.7em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.15cqw, 13px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--hb-va3-accent);
}
.hb-va3-eyebrow::before { content: ""; width: 2.4em; height: 1px; background: currentColor; }
.hb-va3-title {
  max-width: 13ch;
  margin: 0.45em 0 0;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(2.2rem, 6.6cqw, 6rem);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.045em;
}
.hb-va3-sub {
  max-width: 40ch;
  margin: 1.2em 0 0;
  font-size: clamp(12px, 1.5cqw, 17px);
  line-height: 1.55;
  color: rgba(239, 230, 216, 0.62);
}
.hb-va3-row { display: flex; align-items: center; gap: 1.6em; margin-top: 2em; }
.hb-va3-cta {
  display: inline-flex;
  align-items: center;
  padding: 0.75em 1.4em;
  border-radius: 999px;
  background: var(--hb-va3-accent);
  color: #1d0f07;
  font-size: clamp(12px, 1.4cqw, 15px);
  font-weight: 600;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 12px 30px -12px var(--hb-va3-accent);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
}
.hb-va3-cta:hover { transform: translateY(-1px); filter: brightness(1.06); }
.hb-va3-cta:focus-visible { outline: 2px solid #efe6d8; outline-offset: 3px; }
.hb-va3-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.1cqw, 12px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(239, 230, 216, 0.5);
}
.hb-va3-hint svg { animation: hb-va3-nudge 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
@keyframes hb-va3-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
.hb-va3-panel {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 46cqw;
  height: 100%;
  padding: 9cqh 4cqw 15cqh;
  border-left: 1px solid rgba(239, 230, 216, 0.08);
  background: var(--hb-va3-tone);
  overflow: hidden;
}
.hb-va3-num {
  position: absolute;
  right: -2cqw;
  top: 4cqh;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: 30cqh;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(239, 230, 216, 0.14);
  transform: translateX(calc((var(--hb-va3-p) * var(--hb-va3-n) - var(--hb-va3-i)) * -7cqw));
  pointer-events: none;
}
.hb-va3-kicker {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.05cqw, 12px);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--hb-va3-accent);
}
.hb-va3-art {
  align-self: center;
  justify-self: center;
  width: min(30cqh, 22cqw);
  aspect-ratio: 1;
  transform: translateX(calc((var(--hb-va3-p) * var(--hb-va3-n) - var(--hb-va3-i)) * -3cqw));
}
.hb-va3-art svg { width: 100%; height: 100%; display: block; filter: drop-shadow(0 18px 24px rgba(0, 0, 0, 0.45)); }
.hb-va3-h3 {
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(1.3rem, 3.6cqw, 3rem);
  font-weight: 600;
  letter-spacing: -0.035em;
}
.hb-va3-text {
  max-width: 34ch;
  margin: 0.5em 0 0;
  font-size: clamp(11px, 1.3cqw, 15px);
  line-height: 1.5;
  color: rgba(239, 230, 216, 0.6);
}
.hb-va3-stat {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5em;
  margin-top: 1em;
  padding-top: 0.8em;
  border-top: 1px solid rgba(239, 230, 216, 0.12);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.15cqw, 13px);
  color: rgba(239, 230, 216, 0.5);
}
.hb-va3-stat b { font-weight: 500; font-size: 1.35em; color: #efe6d8; }
.hb-va3-rail {
  position: absolute;
  inset: auto 6cqw 5cqh;
  display: grid;
  grid-template-columns: repeat(var(--hb-va3-n), 1fr);
  gap: 0.6rem;
  pointer-events: none;
}
.hb-va3-tick {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 1cqw, 11px);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(239, 230, 216, 0.45);
}
.hb-va3-tick::before {
  content: "";
  display: block;
  height: 2px;
  margin-bottom: 0.7em;
  border-radius: 2px;
  background:
    linear-gradient(var(--hb-va3-accent), var(--hb-va3-accent)) 0 0 / calc(clamp(0, var(--hb-va3-p) * var(--hb-va3-n) - var(--hb-va3-i), 1) * 100%) 100% no-repeat,
    rgba(239, 230, 216, 0.14);
}
@media (prefers-reduced-motion: reduce) {
  .hb-va3-hint svg { animation: none; }
  .hb-va3-cta { transition: none; }
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

export function HeroScrollHorizontal({
  eyebrow = "Finca La Esperanza · Huila",
  title = "From a hillside in Huila to your morning cup",
  subtitle = "Single-origin coffee we buy direct, roast in small batches and ship within 48 hours of the roast.",
  cta = { label: "Shop the harvest", href: "#" },
  chapters = defaultChapters,
  accent = "#e8875a",
  progress,
  autoPlay = false,
  duration = 8,
  length = 5,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollHorizontalProps) {
  const ref = React.useRef<HTMLElement>(null);
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;

  useScrollProgress(
    ref,
    (p) => {
      ref.current?.style.setProperty("--hb-va3-p", p.toFixed(4));
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-va3", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={
        {
          "--hb-va3-accent": accent,
          "--hb-va3-h": height,
          "--hb-va3-len": length,
          "--hb-va3-n": chapters.length,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-hero-scroll-horizontal" precedence="default">{css}</style>
      <div className="hb-va3-stage">
        <div className="hb-va3-track">
          <div className="hb-va3-intro">
            <span className="hb-va3-eyebrow">{eyebrow}</span>
            <Heading className="hb-va3-title">{title}</Heading>
            {subtitle ? <p className="hb-va3-sub">{subtitle}</p> : null}
            <div className="hb-va3-row">
              {cta ? (
                <a className="hb-va3-cta" href={cta.href}>
                  {cta.label}
                </a>
              ) : null}
              <span className="hb-va3-hint" aria-hidden="true">
                The journey
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 8h12M10 4l4 4-4 4" />
                </svg>
              </span>
            </div>
          </div>
          {chapters.map((c, i) => (
            <article
              key={c.title}
              className="hb-va3-panel"
              style={{ "--hb-va3-tone": tones[i % tones.length], "--hb-va3-i": i + 0.5 } as React.CSSProperties}
            >
              <span className="hb-va3-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="hb-va3-kicker">Chapter {String(i + 1).padStart(2, "0")}</span>
              <div className="hb-va3-art" aria-hidden="true">
                <svg viewBox="0 0 120 120">{art[i % art.length]}</svg>
              </div>
              <div>
                <h3 className="hb-va3-h3">{c.title}</h3>
                <p className="hb-va3-text">{c.text}</p>
                <span className="hb-va3-stat">
                  <b>{c.stat}</b>
                  {c.statLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="hb-va3-rail" aria-hidden="true">
          {chapters.map((c, i) => (
            <span key={c.title} className="hb-va3-tick" style={{ "--hb-va3-i": i } as React.CSSProperties}>
              {c.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
