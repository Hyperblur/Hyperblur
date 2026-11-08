"use client";

import * as React from "react";

export interface HeroScrollWipeLink {
  label: string;
  href: string;
}

export interface HeroScrollWipeKpi {
  label: string;
  value: string;
  delta: string;
}

export interface HeroScrollWipeProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  brand?: string;
  title?: string;
  before?: string;
  after?: string;
  subtitle?: string;
  kpis?: HeroScrollWipeKpi[];
  cta?: HeroScrollWipeLink | null;
  handleLabel?: string;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
  headingAs?: "h1" | "h2";
}

const defaultKpis: HeroScrollWipeKpi[] = [
  { label: "MRR", value: "$84.2k", delta: "+12.4%" },
  { label: "Active accounts", value: "3,904", delta: "+318" },
  { label: "Net churn", value: "1.8%", delta: "-0.6 pt" },
];

const cells = [
  ["Month", "MRR", "New", "Churn", "Accts", "ARPA"],
  ["Jan", "61,240", "212", "2.9%", "2,910", "21.04"],
  ["Feb", "64,880", "236", "2.6%", "3,018", "21.49"],
  ["Mar", "69,410", "251", "2.4%", "3,204", "21.66"],
  ["Apr", "73,020", "240", "2.3%", "3,388", "21.55"],
  ["May", "78,760", "289", "2.0%", "3,640", "21.63"],
  ["Jun", "84,190", "302", "1.8%", "3,904", "21.56"],
];

const css = `
.hb-va9 {
  --hb-va9-accent: #34d399;
  --hb-va9-x: -20;
  position: relative;
  width: 100%;
  height: var(--hb-va9-h);
  font-family: inherit;
  background: #0a0a0a;
}
.hb-va9[data-pinned="true"] { height: calc(var(--hb-va9-h) * var(--hb-va9-len)); }
.hb-va9 *, .hb-va9 *::before, .hb-va9 *::after { box-sizing: border-box; }
.hb-va9-stage {
  position: sticky;
  top: 0;
  height: var(--hb-va9-h);
  overflow: hidden;
  container-type: size;
  isolation: isolate;
}
.hb-va9-layer {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.6cqh 5cqw 0;
}
.hb-va9-old {
  background:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px) 0 0 / 100% 24px,
    #0e0e0e;
  color: #8f8f8f;
  font-family: var(--font-mono, ui-monospace, monospace);
}
.hb-va9-new {
  z-index: 1;
  background:
    radial-gradient(60% 50% at 50% 100%, color-mix(in srgb, var(--hb-va9-accent) 18%, transparent), transparent 70%),
    radial-gradient(50% 40% at 50% 0%, rgba(127, 179, 255, 0.1), transparent 70%),
    #0a0a0a;
  color: #ededed;
  clip-path: polygon(0 0, calc((var(--hb-va9-x) + 8) * 1%) 0, calc((var(--hb-va9-x) - 8) * 1%) 100%, 0 100%);
  will-change: clip-path;
}
.hb-va9-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: clamp(11px, 1.3cqw, 14px);
}
.hb-va9-logo { display: inline-flex; align-items: center; gap: 0.5em; font-weight: 700; letter-spacing: -0.02em; }
.hb-va9-mark { width: 1.1em; height: 1.1em; border-radius: 0.3em; border: 1.5px solid currentColor; }
.hb-va9-new .hb-va9-mark { border: 0; background: conic-gradient(from 90deg, var(--hb-va9-accent), #7fb3ff, var(--hb-va9-accent)); }
.hb-va9-links { display: flex; gap: 1.6em; opacity: 0.7; }
.hb-va9-title {
  margin: 5cqh 0 0;
  text-align: center;
  font-size: clamp(1.5rem, 4.6cqw, 4.2rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.045em;
}
.hb-va9-old .hb-va9-title { font-weight: 500; letter-spacing: -0.03em; }
.hb-va9-title span { display: block; }
.hb-va9-old .hb-va9-title span { text-decoration: line-through; text-decoration-thickness: 2px; text-decoration-color: #5a5a5a; }
.hb-va9-new .hb-va9-title span {
  color: transparent;
  background: linear-gradient(90deg, var(--hb-va9-accent), #7fb3ff);
  -webkit-background-clip: text;
  background-clip: text;
}
.hb-va9-sub {
  max-width: 50ch;
  margin: 1em 0 0;
  text-align: center;
  font-size: clamp(11px, 1.4cqw, 16px);
  line-height: 1.5;
  opacity: 0.75;
}
.hb-va9-cta {
  display: inline-flex;
  margin-top: 1.3em;
  padding: 0.7em 1.3em;
  border-radius: 999px;
  font-size: clamp(12px, 1.35cqw, 15px);
  font-weight: 600;
  text-decoration: none;
}
.hb-va9-old .hb-va9-cta { border: 1px dashed #4a4a4a; color: #8f8f8f; }
.hb-va9-new .hb-va9-cta {
  background: #ededed;
  color: #0a0a0a;
  box-shadow: 0 10px 30px -10px color-mix(in srgb, var(--hb-va9-accent) 70%, transparent);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease;
}
.hb-va9-new .hb-va9-cta:hover { background: #fff; transform: translateY(-1px); }
.hb-va9-cta:focus-visible { outline: 2px solid var(--hb-va9-accent); outline-offset: 3px; }
.hb-va9-frame {
  width: min(100%, 76cqw);
  flex: 1;
  margin-top: 4cqh;
  padding: 1.6cqw;
  border-radius: 1.4cqw 1.4cqw 0 0;
  border: 1px solid #262626;
  border-bottom: 0;
  overflow: hidden;
  font-size: clamp(8px, 1.1cqw, 13px);
}
.hb-va9-old .hb-va9-frame { background: #121212; border-style: dashed; border-color: #333; }
.hb-va9-new .hb-va9-frame {
  background: linear-gradient(180deg, #141516, #0f1011);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 -20px 60px -30px color-mix(in srgb, var(--hb-va9-accent) 60%, transparent);
}
.hb-va9-sheet { display: grid; grid-template-columns: 2.2em repeat(6, 1fr); border-left: 1px solid #2a2a2a; border-top: 1px solid #2a2a2a; }
.hb-va9-sheet span {
  padding: 0.45em 0.6em;
  border-right: 1px solid #2a2a2a;
  border-bottom: 1px solid #2a2a2a;
  white-space: nowrap;
  overflow: hidden;
  text-align: right;
}
.hb-va9-sheet span[data-h] { background: #181818; color: #6f6f6f; text-align: center; }
.hb-va9-sheet span[data-b] { color: #b5b5b5; }
.hb-va9-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1cqw; }
.hb-va9-kpi {
  padding: 0.9em 1em;
  border-radius: 0.8em;
  border: 1px solid #222;
  background: #121314;
}
.hb-va9-kpi small { display: block; color: #8f8f8f; }
.hb-va9-kpi b { display: block; margin-top: 0.25em; font-size: 1.7em; font-weight: 600; letter-spacing: -0.03em; }
.hb-va9-kpi span { font-size: 0.9em; color: var(--hb-va9-accent); }
.hb-va9-charts { display: grid; grid-template-columns: 1.6fr 1fr; gap: 1cqw; margin-top: 1cqw; }
.hb-va9-chart { padding: 0.9em 1em; border-radius: 0.8em; border: 1px solid #222; background: #121314; color: #8f8f8f; }
.hb-va9-chart svg { display: block; width: 100%; height: auto; margin-top: 0.6em; }
.hb-va9-line {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}
.hb-va9-handle {
  position: absolute;
  top: 52%;
  left: calc(var(--hb-va9-x) * 1%);
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.45em 0.8em 0.45em 0.5em;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: #0a0a0a;
  border: 1px solid color-mix(in srgb, var(--hb-va9-accent) 60%, transparent);
  box-shadow: 0 0 0 4px rgba(10, 10, 10, 0.6), 0 0 24px color-mix(in srgb, var(--hb-va9-accent) 50%, transparent);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(10px, 1.15cqw, 13px);
  color: #ededed;
  white-space: nowrap;
  pointer-events: none;
}
.hb-va9-handle i {
  width: 0.6em;
  height: 0.6em;
  border-radius: 50%;
  background: var(--hb-va9-accent);
  box-shadow: 0 0 10px var(--hb-va9-accent);
}
@media (max-width: 640px) {
  .hb-va9-links { display: none; }
  .hb-va9-frame { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-va9-new .hb-va9-cta { transition: none; }
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

const area = "M0 70 L0 52 C 20 50, 30 44, 50 46 S 80 38, 100 34 S 140 30, 160 22 S 190 16, 200 10 L200 70 Z";
const line = "M0 52 C 20 50, 30 44, 50 46 S 80 38, 100 34 S 140 30, 160 22 S 190 16, 200 10";

export function HeroScrollWipe({
  brand = "Quanta",
  title = "Your numbers deserve better than",
  before = "a spreadsheet.",
  after = "a live dashboard.",
  subtitle = "Connect Postgres, Stripe or a plain CSV and get dashboards that refresh every minute, with alerts when something moves.",
  kpis = defaultKpis,
  cta = { label: "Connect your data", href: "#" },
  handleLabel = "migrated",
  accent = "#34d399",
  progress,
  autoPlay = false,
  duration = 5,
  length = 3,
  height = "100vh",
  headingAs = "h1",
  className,
  style,
  ...rest
}: HeroScrollWipeProps) {
  const ref = React.useRef<HTMLElement>(null);
  const lineRef = React.useRef<SVGLineElement>(null);
  const pctRef = React.useRef<HTMLSpanElement>(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const Heading = headingAs;
  const pinned = progress === undefined && !autoPlay;

  useScrollProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      const x = -12 + ease(clamp01(p / 0.9)) * 124;
      el.style.setProperty("--hb-va9-x", x.toFixed(3));
      if (lineRef.current) {
        lineRef.current.setAttribute("x1", (x + 8).toFixed(3));
        lineRef.current.setAttribute("x2", (x - 8).toFixed(3));
      }
      if (pctRef.current) pctRef.current.textContent = `${Math.round(clamp01((x + 8) / 116) * 100)}% ${handleLabel}`;
    },
    progress,
    autoPlay,
    duration,
  );

  const layer = (mode: "old" | "new") => {
    const fresh = mode === "new";
    return (
      <div className={`hb-va9-layer hb-va9-${mode}`} aria-hidden={fresh ? undefined : true}>
        <div className="hb-va9-nav">
          <span className="hb-va9-logo">
            <span className="hb-va9-mark" />
            {brand}
          </span>
          <span className="hb-va9-links">
            <span>Product</span>
            <span>Pricing</span>
            <span>Docs</span>
          </span>
        </div>
        {fresh ? (
          <Heading className="hb-va9-title">
            {title}
            <span>{after}</span>
          </Heading>
        ) : (
          <div className="hb-va9-title">
            {title}
            <span>{before}</span>
          </div>
        )}
        {subtitle ? <p className="hb-va9-sub">{subtitle}</p> : null}
        {cta ? (
          <a className="hb-va9-cta" href={cta.href} tabIndex={fresh ? undefined : -1}>
            {cta.label}
          </a>
        ) : null}
        <div className="hb-va9-frame">
          {fresh ? (
            <>
              <div className="hb-va9-kpis">
                {kpis.map((k) => (
                  <div key={k.label} className="hb-va9-kpi">
                    <small>{k.label}</small>
                    <b>{k.value}</b>
                    <span>{k.delta}</span>
                  </div>
                ))}
              </div>
              <div className="hb-va9-charts">
                <div className="hb-va9-chart">
                  Revenue, last 6 months
                  <svg viewBox="0 0 200 70">
                    <defs>
                      <linearGradient id={`${uid}a`} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor={accent} stopOpacity="0.45" />
                        <stop offset="1" stopColor={accent} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={area} fill={`url(#${uid}a)`} />
                    <path d={line} fill="none" stroke={accent} strokeWidth="2" />
                    <circle cx="200" cy="10" r="3" fill={accent} />
                  </svg>
                </div>
                <div className="hb-va9-chart">
                  New accounts
                  <svg viewBox="0 0 120 70">
                    {[30, 38, 44, 40, 54, 62].map((h, i) => (
                      <rect key={i} x={4 + i * 19} y={70 - h} width="13" height={h} rx="3" fill={i === 5 ? accent : "#2a2f2d"} />
                    ))}
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <div className="hb-va9-sheet">
              <span data-h="" />
              {["A", "B", "C", "D", "E", "F"].map((c) => (
                <span key={c} data-h="">
                  {c}
                </span>
              ))}
              {cells.map((row, r) => (
                <React.Fragment key={r}>
                  <span data-h="">{r + 1}</span>
                  {row.map((c, i) => (
                    <span key={i} data-b={r === 0 ? "" : undefined}>
                      {c}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      ref={ref}
      className={["hb-va9", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={{ "--hb-va9-accent": accent, "--hb-va9-h": height, "--hb-va9-len": length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-hero-scroll-wipe" precedence="default">{css}</style>
      <div className="hb-va9-stage">
        {layer("old")}
        {layer("new")}
        <svg className="hb-va9-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line ref={lineRef} x1="-4" y1="0" x2="-20" y2="100" stroke={accent} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="hb-va9-handle" aria-hidden="true">
          <i />
          <span ref={pctRef}>0% {handleLabel}</span>
        </span>
      </div>
    </section>
  );
}
