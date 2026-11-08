"use client";

import * as React from "react";

export interface HeroScrollRingLink {
  label: string;
  href: string;
}

export interface HeroScrollRingPiece {
  name: string;
  price: string;
  glaze: string;
  backdrop: string;
}

export interface HeroScrollRingProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  brand?: string;
  title?: string;
  subtitle?: string;
  pieces?: HeroScrollRingPiece[];
  cta?: HeroScrollRingLink | null;
  turns?: number;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const defaultPieces: HeroScrollRingPiece[] = [
  { name: "Tide vase", price: "$84", glaze: "#d9e4e0", backdrop: "#4b6a72" },
  { name: "Ember bowl", price: "$62", glaze: "#e0855a", backdrop: "#3a2219" },
  { name: "Salt jug", price: "$96", glaze: "#efe7da", backdrop: "#8f7f6a" },
  { name: "Moss cup", price: "$34", glaze: "#8ea06a", backdrop: "#29331f" },
  { name: "Dune bottle", price: "$110", glaze: "#d8b98c", backdrop: "#5a4630" },
  { name: "Ink pitcher", price: "$128", glaze: "#2b3550", backdrop: "#a7b2c8" },
  { name: "Clay lantern", price: "$74", glaze: "#c6704f", backdrop: "#f0d9c2" },
  { name: "Frost carafe", price: "$88", glaze: "#f4f6f7", backdrop: "#30383d" },
  { name: "Plum vessel", price: "$142", glaze: "#7b3f5c", backdrop: "#e6c9d3" },
  { name: "Ash platter", price: "$58", glaze: "#9a9690", backdrop: "#1f1e1c" },
];

const shapes = [
  "M40 14h20v8c0 6 14 12 14 34 0 22-10 34-24 34S26 78 26 56c0-22 14-28 14-34z",
  "M16 52h68c0 20-16 34-34 34S16 72 16 52z",
  "M38 16h18l-2 10c12 4 18 16 18 32 0 20-10 30-22 30S28 78 28 58c0-14 4-26 12-30l-6-4z",
  "M30 40h40l-4 44H34z",
  "M44 10h12v20c10 6 14 16 14 30 0 18-8 28-20 28S30 78 30 60c0-14 4-24 14-30z",
];

const css = `
.hb-va8 {
  --hb-va8-accent: #f2a5c0;
  --hb-va8-rx: -62deg;
  --hb-va8-ry: 0deg;
  --hb-va8-sc: 0.72;
  --hb-va8-o: 0;
  position: relative;
  width: 100%;
  height: var(--hb-va8-h);
  color: #f2ede6;
  font-family: inherit;
  background: #0c0a0a;
}
.hb-va8[data-pinned="true"] { height: calc(var(--hb-va8-h) * var(--hb-va8-len)); }
.hb-va8 *, .hb-va8 *::before, .hb-va8 *::after { box-sizing: border-box; }
.hb-va8-stage {
  position: sticky;
  top: 0;
  height: var(--hb-va8-h);
  overflow: hidden;
  container-type: size;
  isolation: isolate;
  perspective: 1300px;
  perspective-origin: 50% 40%;
  background:
    radial-gradient(40% 30% at 50% 82%, color-mix(in srgb, var(--hb-va8-accent) 16%, transparent), transparent 70%),
    radial-gradient(70% 60% at 50% 30%, #1a1414, #0c0a0a 70%);
}
.hb-va8-head {
  position: absolute;
  inset: 0 0 auto;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding: 5cqh 4.5cqw 0;
}
.hb-va8-brand {
  display: block;
  margin-bottom: 0.9em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.1cqw, 12px);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--hb-va8-accent);
}
.hb-va8-title {
  max-width: 13ch;
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(1.6rem, 4.4cqw, 4rem);
  font-weight: 500;
  line-height: 0.98;
  letter-spacing: -0.04em;
}
.hb-va8-sub {
  max-width: 28ch;
  margin: 0;
  padding-top: 1.8em;
  font-size: clamp(11px, 1.3cqw, 15px);
  line-height: 1.55;
  text-align: right;
  color: rgba(242, 237, 230, 0.55);
}
.hb-va8-ring {
  position: absolute;
  left: 50%;
  top: 60%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  transform: scale(var(--hb-va8-sc)) rotateX(var(--hb-va8-rx)) rotateY(var(--hb-va8-ry));
  will-change: transform;
}
.hb-va8-card {
  position: absolute;
  left: -6.5cqw;
  top: -9cqw;
  width: 13cqw;
  height: 18cqw;
  border-radius: 1cqw;
  overflow: hidden;
  transform: rotateY(var(--hb-va8-a)) translateZ(23cqw);
  background:
    radial-gradient(80% 50% at 50% 100%, rgba(0, 0, 0, 0.35), transparent 70%),
    linear-gradient(180deg, color-mix(in srgb, var(--hb-va8-bg) 80%, #fff 20%), var(--hb-va8-bg));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12), 0 2cqw 3cqw -1cqw rgba(0, 0, 0, 0.6);
}
.hb-va8-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, rgba(255, 255, 255, 0.22), transparent 38%);
  mix-blend-mode: soft-light;
}
.hb-va8-card svg { position: absolute; left: 10%; bottom: 14%; width: 80%; }
.hb-va8-shadow {
  position: absolute;
  left: 22%;
  right: 22%;
  bottom: 12%;
  height: 6%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  filter: blur(4px);
}
.hb-va8-tag {
  position: absolute;
  left: 8%;
  top: 6%;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(6px, 0.8cqw, 10px);
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.75);
  mix-blend-mode: difference;
}
.hb-va8-foot {
  position: absolute;
  inset: auto 4.5cqw 5cqh;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
}
.hb-va8-now { font-size: clamp(12px, 1.5cqw, 17px); }
.hb-va8-now small {
  display: block;
  margin-bottom: 0.4em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.72em;
  letter-spacing: 0.16em;
  color: rgba(242, 237, 230, 0.5);
}
.hb-va8-now b { font-weight: 600; }
.hb-va8-now span { margin-left: 0.6em; color: var(--hb-va8-accent); }
.hb-va8-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.75em 1.3em;
  border-radius: 999px;
  border: 1px solid rgba(242, 237, 230, 0.2);
  color: #f2ede6;
  font-size: clamp(12px, 1.35cqw, 15px);
  font-weight: 500;
  text-decoration: none;
  background: rgba(242, 237, 230, 0.04);
  transition: background 0.3s ease, border-color 0.3s ease;
}
.hb-va8-cta:hover { background: rgba(242, 237, 230, 0.1); border-color: rgba(242, 237, 230, 0.4); }
.hb-va8-cta:focus-visible { outline: 2px solid var(--hb-va8-accent); outline-offset: 3px; }
.hb-va8-cta i {
  display: grid;
  place-items: center;
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  background: var(--hb-va8-accent);
  color: #2a0f19;
  font-style: normal;
}
@media (prefers-reduced-motion: reduce) {
  .hb-va8-cta { transition: none; }
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

export function HeroScrollRing({
  brand = "Atelier Noon · Spring 2027",
  title = "Ten pieces, fired once a season",
  subtitle = "Wheel-thrown stoneware from our studio in Porto. When a glaze sells out, it is gone until next year.",
  pieces = defaultPieces,
  cta = { label: "Shop the collection", href: "#" },
  turns = 1,
  accent = "#f2a5c0",
  progress,
  autoPlay = false,
  duration = 7,
  length = 4,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollRingProps) {
  const ref = React.useRef<HTMLElement>(null);
  const cards = React.useRef<(HTMLDivElement | null)[]>([]);
  const nameRef = React.useRef<HTMLElement>(null);
  const priceRef = React.useRef<HTMLSpanElement>(null);
  const idxRef = React.useRef<HTMLElement>(null);
  const front = React.useRef(-1);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;
  const n = Math.max(1, pieces.length);
  const step = 360 / n;

  useScrollProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      const k = ease(clamp01(p / 0.55));
      const ry = -p * 360 * turns + 14;
      el.style.setProperty("--hb-va8-rx", `${(-62 + k * 54).toFixed(2)}deg`);
      el.style.setProperty("--hb-va8-ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--hb-va8-sc", (0.72 + k * 0.28).toFixed(4));
      cards.current.forEach((node, i) => {
        if (!node) return;
        const facing = Math.cos(((i * step + ry) * Math.PI) / 180);
        node.style.filter = `brightness(${(0.45 + Math.max(0, facing) * 0.6).toFixed(3)})`;
      });
      const idx = (((Math.round(-ry / step) % n) + n) % n);
      if (idx !== front.current) {
        front.current = idx;
        const piece = pieces[idx];
        if (piece && nameRef.current && priceRef.current && idxRef.current) {
          nameRef.current.textContent = piece.name;
          priceRef.current.textContent = piece.price;
          idxRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
        }
      }
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-va8", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={{ "--hb-va8-accent": accent, "--hb-va8-h": height, "--hb-va8-len": length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-hero-scroll-ring" precedence="default">{css}</style>
      <div className="hb-va8-stage">
        <div className="hb-va8-head">
          <div>
            <span className="hb-va8-brand">{brand}</span>
            <Heading className="hb-va8-title">{title}</Heading>
          </div>
          {subtitle ? <p className="hb-va8-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-va8-ring" aria-hidden="true">
          {pieces.map((piece, i) => (
            <div
              key={piece.name}
              className="hb-va8-card"
              ref={(node) => {
                cards.current[i] = node;
              }}
              style={{ "--hb-va8-a": `${(i * step).toFixed(2)}deg`, "--hb-va8-bg": piece.backdrop } as React.CSSProperties}
            >
              <span className="hb-va8-tag">N°{String(i + 1).padStart(2, "0")}</span>
              <span className="hb-va8-shadow" />
              <svg viewBox="0 0 100 100">
                <defs>
                  <linearGradient id={`${uid}g${i}`} x1="0" x2="1">
                    <stop offset="0" stopColor={piece.glaze} />
                    <stop offset="0.55" stopColor={piece.glaze} stopOpacity="0.92" />
                    <stop offset="1" stopColor="#000" stopOpacity="0.55" />
                  </linearGradient>
                </defs>
                <path d={shapes[i % shapes.length]} fill={`url(#${uid}g${i})`} />
              </svg>
            </div>
          ))}
        </div>
        <div className="hb-va8-foot">
          <div className="hb-va8-now" aria-live="off">
            <small ref={idxRef}>{`01 / ${String(n).padStart(2, "0")}`}</small>
            <b ref={nameRef}>{pieces[0]?.name}</b>
            <span ref={priceRef}>{pieces[0]?.price}</span>
          </div>
          {cta ? (
            <a className="hb-va8-cta" href={cta.href}>
              {cta.label}
              <i aria-hidden="true">→</i>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
