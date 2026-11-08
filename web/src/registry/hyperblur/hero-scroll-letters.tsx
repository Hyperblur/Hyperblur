"use client";

import * as React from "react";

export interface HeroScrollLettersLink {
  label: string;
  href: string;
}

export interface HeroScrollLettersProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  brand?: string;
  intro?: string;
  title?: string;
  subtitle?: string;
  detail?: string;
  cta?: HeroScrollLettersLink | null;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const letters =
  "M-1500 -1500H2530V1800H-1500Z" +
  "M40 260V40H96L184 170V40H240V260H184L96 130V260Z" +
  "M390 40A110 110 0 1 1 389.9 40ZM390 96A54 54 0 1 0 390.1 96Z" +
  "M520 40H580L630 190L680 40H740L660 260H600Z" +
  "M770 260L850 40H910L990 260H930L915 215H845L830 260ZM862 165H898L880 108Z";

const css = `
.hb-va4 {
  --hb-va4-accent: #5eead4;
  --hb-va4-z: 1;
  --hb-va4-c: 1;
  --hb-va4-i: 1;
  --hb-va4-o: 0;
  --hb-va4-k: 0;
  position: relative;
  width: 100%;
  height: var(--hb-va4-h);
  color: #ededed;
  font-family: inherit;
  background: #040507;
}
.hb-va4[data-pinned="true"] { height: calc(var(--hb-va4-h) * var(--hb-va4-len)); }
.hb-va4 *, .hb-va4 *::before, .hb-va4 *::after { box-sizing: border-box; }
.hb-va4-stage {
  position: sticky;
  top: 0;
  height: var(--hb-va4-h);
  overflow: hidden;
  container-type: size;
  isolation: isolate;
}
.hb-va4-sky {
  position: absolute;
  inset: -10%;
  transform: scale(calc(1.45 - var(--hb-va4-k) * 0.45));
  transform-origin: 39% 50%;
  background:
    radial-gradient(1px 1px at 12% 18%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 68% 12%, #fff 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 82% 34%, #dff 50%, transparent 51%),
    radial-gradient(1px 1px at 24% 66%, #fff 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 44% 28%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 91% 72%, #fff 50%, transparent 51%),
    radial-gradient(38% 30% at 62% 38%, rgba(139, 92, 246, 0.42), transparent 70%),
    radial-gradient(34% 28% at 34% 54%, color-mix(in srgb, var(--hb-va4-accent) 34%, transparent), transparent 70%),
    linear-gradient(118deg, transparent 30%, rgba(214, 220, 255, 0.16) 46%, rgba(255, 210, 240, 0.12) 52%, transparent 66%),
    linear-gradient(180deg, #050816, #0a0d24 55%, #120a1f);
}
.hb-va4-stars {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle, rgba(255, 255, 255, 0.9) 0.7px, transparent 1.2px) 0 0 / 53px 47px,
    radial-gradient(circle, rgba(200, 230, 255, 0.7) 0.6px, transparent 1.1px) 21px 13px / 89px 71px,
    radial-gradient(circle, rgba(255, 255, 255, 0.5) 0.5px, transparent 1px) 7px 31px / 31px 37px;
  animation: hb-va4-tw 5s ease-in-out infinite alternate;
}
@keyframes hb-va4-tw { from { opacity: 0.55; } to { opacity: 1; } }
.hb-va4-ridge { position: absolute; left: 0; right: 0; bottom: -1px; width: 100%; height: 22%; color: #040507; }
.hb-va4-cover {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  opacity: var(--hb-va4-c);
  pointer-events: none;
}
.hb-va4-word {
  width: 82cqw;
  aspect-ratio: 1030 / 300;
  overflow: visible;
  transform: scale(var(--hb-va4-z));
  transform-origin: 29.9% 50%;
  will-change: transform;
}
.hb-va4-word path { fill: #040507; fill-rule: evenodd; }
.hb-va4-intro {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4cqh 4cqw 6cqh;
  opacity: var(--hb-va4-i);
  pointer-events: none;
}
.hb-va4-bar { display: flex; align-items: center; justify-content: space-between; }
.hb-va4-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  font-size: clamp(12px, 1.35cqw, 15px);
  font-weight: 600;
  letter-spacing: -0.01em;
}
.hb-va4-brand::before {
  content: "";
  width: 0.9em;
  height: 0.9em;
  border-radius: 50%;
  border: 2px solid var(--hb-va4-accent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--hb-va4-accent) 70%, transparent);
}
.hb-va4-mono {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.1cqw, 12px);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(237, 237, 237, 0.5);
}
.hb-va4-lead {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}
.hb-va4-lead p {
  max-width: 30ch;
  margin: 0;
  font-size: clamp(12px, 1.6cqw, 18px);
  line-height: 1.45;
  color: #a1a1a1;
}
.hb-va4-final {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 6cqw;
  text-align: center;
  opacity: var(--hb-va4-o);
  transform: scale(calc(0.94 + var(--hb-va4-o) * 0.06));
  pointer-events: none;
}
.hb-va4[data-final="true"] .hb-va4-final { pointer-events: auto; }
.hb-va4-title {
  max-width: 14ch;
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(2rem, 7cqw, 6.2rem);
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.05em;
  text-shadow: 0 4px 40px rgba(0, 0, 0, 0.5);
}
.hb-va4-sub {
  max-width: 44ch;
  margin: 1em 0 0;
  font-size: clamp(12px, 1.55cqw, 17px);
  line-height: 1.55;
  color: rgba(237, 237, 237, 0.72);
}
.hb-va4-ticket {
  display: flex;
  align-items: center;
  gap: 1.2em;
  margin-top: 2em;
  padding: 0.45em 0.45em 0.45em 1.2em;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(6, 8, 18, 0.55);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.15cqw, 13px);
  color: rgba(237, 237, 237, 0.75);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
.hb-va4-ticket b { color: var(--hb-va4-accent); font-weight: 500; }
.hb-va4-cta {
  padding: 0.75em 1.3em;
  border-radius: 999px;
  background: var(--hb-va4-accent);
  color: #02130f;
  font-family: var(--font-sans, system-ui);
  font-size: 1.08em;
  font-weight: 600;
  text-decoration: none;
  transition: filter 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-va4-cta:hover { filter: brightness(1.08); transform: translateY(-1px); }
.hb-va4-cta:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  .hb-va4-stars { animation: none; }
  .hb-va4-cta { transition: none; }
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

export function HeroScrollLetters({
  brand = "Nova Expeditions",
  intro = "Small-group night-sky expeditions to the darkest places left on Earth.",
  title = "The sky, the way it used to look",
  subtitle = "Eight nights under Bortle 1 skies with an astronomer, a 16-inch telescope and nothing else on the horizon.",
  detail = "Atacama · 14 Mar 2027 · 6 seats left",
  cta = { label: "Reserve a seat", href: "#" },
  accent = "#5eead4",
  progress,
  autoPlay = false,
  duration = 5,
  length = 3,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollLettersProps) {
  const ref = React.useRef<HTMLElement>(null);
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;
  const [place, rest2] = detail.includes("·") ? [detail.slice(0, detail.indexOf("·")).trim(), detail.slice(detail.indexOf("·") + 1).trim()] : [detail, ""];

  useScrollProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      const k = clamp01(p / 0.72);
      const z = Math.pow(90, Math.pow(k, 1.7));
      el.style.setProperty("--hb-va4-z", z.toFixed(3));
      el.style.setProperty("--hb-va4-k", ease(k).toFixed(4));
      el.style.setProperty("--hb-va4-c", (1 - clamp01((p - 0.6) / 0.12)).toFixed(3));
      el.style.setProperty("--hb-va4-i", (1 - clamp01(p / 0.14)).toFixed(3));
      const o = ease(clamp01((p - 0.7) / 0.22));
      el.style.setProperty("--hb-va4-o", o.toFixed(3));
      el.dataset.final = o > 0.5 ? "true" : "false";
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-va4", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={{ "--hb-va4-accent": accent, "--hb-va4-h": height, "--hb-va4-len": length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-hero-scroll-letters" precedence="default">{css}</style>
      <div className="hb-va4-stage">
        <div className="hb-va4-sky" aria-hidden="true">
          <div className="hb-va4-stars" />
          <svg className="hb-va4-ridge" viewBox="0 0 1200 160" preserveAspectRatio="none" fill="currentColor">
            <path d="M0 160V96l90-34 70 22 110-58 90 40 80-18 120 52 96-46 104 38 90-26 110 44 120-50 120 40V160Z" />
          </svg>
        </div>
        <div className="hb-va4-cover" aria-hidden="true">
          <svg className="hb-va4-word" viewBox="0 0 1030 300">
            <path d={letters} />
          </svg>
        </div>
        <div className="hb-va4-intro">
          <div className="hb-va4-bar">
            <span className="hb-va4-brand">{brand}</span>
            <span className="hb-va4-mono">Season 2027</span>
          </div>
          <div className="hb-va4-lead">
            <p>{intro}</p>
            <span className="hb-va4-mono" aria-hidden="true">Scroll to enter</span>
          </div>
        </div>
        <div className="hb-va4-final">
          <Heading className="hb-va4-title">{title}</Heading>
          {subtitle ? <p className="hb-va4-sub">{subtitle}</p> : null}
          {cta || detail ? (
            <div className="hb-va4-ticket">
              {detail ? (
                <span>
                  <b>{place}</b>
                  {rest2 ? ` · ${rest2}` : ""}
                </span>
              ) : null}
              {cta ? (
                <a className="hb-va4-cta" href={cta.href}>
                  {cta.label}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
