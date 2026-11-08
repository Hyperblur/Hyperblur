"use client";

import * as React from "react";

export interface HeroScrollSplitLink {
  label: string;
  href: string;
}

export interface HeroScrollSplitProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  brand?: string;
  place?: string;
  lineTop?: string;
  lineBottom?: string;
  location?: string;
  price?: string;
  cta?: HeroScrollSplitLink | null;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-va11 {
  --hb-va11-accent: #c4623a;
  --hb-va11-e: 0;
  --hb-va11-o: 0;
  position: relative;
  width: 100%;
  height: var(--hb-va11-h);
  color: #1b1814;
  font-family: inherit;
  background: #efe9df;
}
.hb-va11[data-pinned="true"] { height: calc(var(--hb-va11-h) * var(--hb-va11-len)); }
.hb-va11 *, .hb-va11 *::before, .hb-va11 *::after { box-sizing: border-box; }
.hb-va11-stage {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: var(--hb-va11-h);
  overflow: hidden;
  container-type: size;
  background:
    radial-gradient(60% 50% at 50% 50%, #f6f1e8, transparent 70%),
    #efe9df;
}
.hb-va11-bar {
  position: absolute;
  inset: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.6cqh 4cqw;
  font-size: clamp(11px, 1.3cqw, 14px);
}
.hb-va11-brand { font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; font-size: 0.92em; }
.hb-va11-nav { display: flex; gap: 1.8em; color: #6d655a; }
.hb-va11-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  font-size: clamp(2.2rem, 9.6cqw, 9rem);
  font-weight: 700;
  line-height: 0.86;
  letter-spacing: -0.06em;
  text-align: center;
}
.hb-va11-line { display: block; white-space: nowrap; will-change: transform; }
.hb-va11-line:first-child { transform: translateX(calc(var(--hb-va11-e) * -9cqw)); }
.hb-va11-line:last-child { transform: translateX(calc(var(--hb-va11-e) * 9cqw)); color: var(--hb-va11-accent); }
.hb-va11-band {
  position: relative;
  display: block;
  width: calc(26cqw + var(--hb-va11-e) * 64cqw);
  height: calc(0.6cqh + var(--hb-va11-e) * 44cqh);
  margin: calc(1cqh + var(--hb-va11-e) * 2cqh) 0;
  border-radius: calc(999px - var(--hb-va11-e) * 980px);
  overflow: hidden;
  background: #1b1814;
  box-shadow: 0 30px 60px -30px rgba(60, 40, 20, 0.45);
}
.hb-va11-view {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90cqw;
  height: 46cqh;
  transform: translate(-50%, -50%) scale(calc(1.35 - var(--hb-va11-e) * 0.35));
  background:
    radial-gradient(14% 22% at 68% 30%, rgba(255, 244, 214, 0.95), transparent 70%),
    linear-gradient(180deg, #9cc3d6 0%, #cfe0e4 46%, #6b9fb4 47%, #3f7690 70%, #2f5c72 100%);
}
.hb-va11-view svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-va11-meta {
  position: absolute;
  inset: auto 4cqw 5cqh;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  opacity: var(--hb-va11-o);
  transform: translateY(calc((1 - var(--hb-va11-o)) * 16px));
}
.hb-va11-meta p { margin: 0; font-size: clamp(11px, 1.35cqw, 15px); line-height: 1.5; color: #6d655a; }
.hb-va11-meta b { display: block; font-size: 1.15em; font-weight: 600; color: #1b1814; }
.hb-va11-right { display: flex; align-items: center; gap: 1.4em; }
.hb-va11-right p { text-align: right; }
.hb-va11-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.8em 1.35em;
  border-radius: 999px;
  background: #1b1814;
  color: #f6f1e8;
  font-size: clamp(12px, 1.35cqw, 15px);
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 12px 30px -14px rgba(27, 24, 20, 0.7);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease;
}
.hb-va11-cta:hover { transform: translateY(-1px); background: var(--hb-va11-accent); }
.hb-va11-cta:focus-visible { outline: 2px solid var(--hb-va11-accent); outline-offset: 3px; }
.hb-va11-hint {
  position: absolute;
  left: 50%;
  bottom: 5cqh;
  transform: translateX(-50%);
  font-size: clamp(10px, 1.1cqw, 12px);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8a8174;
  opacity: calc(1 - var(--hb-va11-e) * 3);
}
@media (max-width: 640px) {
  .hb-va11-nav { display: none; }
  .hb-va11-meta { flex-direction: column; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-va11-cta { transition: none; }
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

const arches =
  "M0 0H1000V560H0Z" +
  "M90 560V250A110 110 0 0 1 310 250V560Z" +
  "M390 560V210A110 110 0 0 1 610 210V560Z" +
  "M690 560V250A110 110 0 0 1 910 250V560Z";

export function HeroScrollSplit({
  brand = "Casa Larga",
  place = "Alentejo, Portugal",
  lineTop = "A long house",
  lineBottom = "by the sea",
  location = "Fourteen rooms on the Alentejo coast, two hours south of Lisbon.",
  price = "€280",
  cta = { label: "Check availability", href: "#" },
  accent = "#c4623a",
  progress,
  autoPlay = false,
  duration = 5,
  length = 3,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollSplitProps) {
  const ref = React.useRef<HTMLElement>(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;

  useScrollProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--hb-va11-e", ease(clamp01(p / 0.75)).toFixed(4));
      el.style.setProperty("--hb-va11-o", ease(clamp01((p - 0.62) / 0.3)).toFixed(4));
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-va11", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={{ "--hb-va11-accent": accent, "--hb-va11-h": height, "--hb-va11-len": length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-hero-scroll-split" precedence="default">{css}</style>
      <div className="hb-va11-stage">
        <div className="hb-va11-bar">
          <span className="hb-va11-brand">{brand}</span>
          <span className="hb-va11-nav" aria-hidden="true">
            <span>Rooms</span>
            <span>Table</span>
            <span>Journal</span>
          </span>
        </div>
        <Heading className="hb-va11-head">
          <span className="hb-va11-line">{lineTop}</span>
          <span className="hb-va11-band" aria-hidden="true">
            <span className="hb-va11-view">
              <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id={`${uid}w`} x1="0" x2="1">
                    <stop offset="0" stopColor="#efe6d6" />
                    <stop offset="0.5" stopColor="#f7f1e6" />
                    <stop offset="1" stopColor="#e3d7c3" />
                  </linearGradient>
                </defs>
                <path d="M0 470H1000V560H0Z" fill="#d9c7aa" />
                <path d="M0 470H1000" stroke="#c9b493" strokeWidth="3" />
                <path d={arches} fill={`url(#${uid}w)`} fillRule="evenodd" />
                <path d="M90 560V250A110 110 0 0 1 120 175" stroke="#cbbba1" strokeWidth="14" fill="none" opacity="0.6" />
                <path d="M390 560V210A110 110 0 0 1 420 135" stroke="#cbbba1" strokeWidth="14" fill="none" opacity="0.6" />
                <path d="M690 560V250A110 110 0 0 1 720 175" stroke="#cbbba1" strokeWidth="14" fill="none" opacity="0.6" />
                <ellipse cx="200" cy="520" rx="70" ry="10" fill="#b49a76" opacity="0.5" />
                <path d="M172 520c-4-40 8-62 28-74 20 12 32 34 28 74z" fill="#5f6b45" />
                <ellipse cx="800" cy="520" rx="70" ry="10" fill="#b49a76" opacity="0.5" />
                <path d="M776 520c-2-30 6-48 24-58 18 10 26 28 24 58z" fill="#6f7a52" />
              </svg>
            </span>
          </span>
          <span className="hb-va11-line">{lineBottom}</span>
        </Heading>
        <div className="hb-va11-meta">
          <p>
            {place ? <b>{place}</b> : null}
            {location}
          </p>
          <div className="hb-va11-right">
            {price ? (
              <p>
                <b>From {price}</b>
                per night, breakfast included
              </p>
            ) : null}
            {cta ? (
              <a className="hb-va11-cta" href={cta.href}>
                {cta.label}
              </a>
            ) : null}
          </div>
        </div>
        <span className="hb-va11-hint" aria-hidden="true">Scroll to open</span>
      </div>
    </section>
  );
}
