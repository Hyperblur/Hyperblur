"use client";

import * as React from "react";

export interface ProofCaseStudy {
  company: string;
  industry: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  metricLabel: string;
  quote: string;
  author: string;
  role: string;
  href?: string;
  mark?: "ring" | "bolt" | "wave" | "grid" | "leaf" | "spark";
}

export interface ProofCaseStudiesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  studies?: ProofCaseStudy[];
  cta?: { label: string; href: string };
  defaultActive?: number;
  accent?: string;
  onStudyClick?: (study: ProofCaseStudy, index: number) => void;
}

const defaultStudies: ProofCaseStudy[] = [
  {
    company: "Halvard",
    industry: "Logistics",
    value: 3.4,
    decimals: 1,
    suffix: "x",
    metricLabel: "faster dispatch planning",
    quote: "We replaced four spreadsheets and a nightly script. Planners now finish the morning route in twenty minutes instead of an hour.",
    author: "Ines Duarte",
    role: "VP Operations",
    href: "#",
    mark: "wave",
  },
  {
    company: "Lumen Bank",
    industry: "Fintech",
    value: 41,
    suffix: "%",
    metricLabel: "fewer support tickets",
    quote: "Customers find answers before they ever reach us. The drop in tickets paid for the rollout in the first quarter.",
    author: "Daniel Okafor",
    role: "Head of Customer Experience",
    href: "#",
    mark: "ring",
  },
  {
    company: "Northpeak",
    industry: "Retail",
    value: 2.8,
    decimals: 1,
    prefix: "$",
    suffix: "M",
    metricLabel: "added annual revenue",
    quote: "Checkout went from five steps to two. Conversion on mobile climbed every single week after launch.",
    author: "Sofia Brandt",
    role: "Director of Ecommerce",
    href: "#",
    mark: "bolt",
  },
];

const css = `
.hb-yj3 {
  --hb-yj3-accent: #a78bfa;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yj3 *, .hb-yj3 *::before, .hb-yj3 *::after { box-sizing: border-box; }
.hb-yj3::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(60% 40% at 50% 0%, color-mix(in srgb, var(--hb-yj3-accent) 12%, transparent), transparent 70%),
    linear-gradient(rgba(255, 255, 255, .03) 1px, transparent 1px) 0 0 / 100% 64px;
  -webkit-mask: linear-gradient(180deg, #000, transparent 85%);
  mask: linear-gradient(180deg, #000, transparent 85%);
  pointer-events: none;
}
.hb-yj3-inner { max-width: 1120px; margin: 0 auto; padding: 72px 20px; }
@container (min-width: 760px) { .hb-yj3-inner { padding: 100px 32px; } }
.hb-yj3-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px 40px;
  margin-bottom: 44px;
}
.hb-yj3-eyebrow {
  margin: 0 0 14px;
  color: var(--hb-yj3-accent);
  font: 500 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-yj3-title {
  margin: 0;
  max-width: 560px;
  font-size: clamp(30px, 4.6cqw, 46px);
  line-height: 1.06;
  letter-spacing: -.03em;
  font-weight: 650;
  text-wrap: balance;
}
.hb-yj3-sub { margin: 14px 0 0; max-width: 520px; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-yj3-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #ededed;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, .2);
  padding-bottom: 4px;
  transition: border-color .2s ease, gap .2s ease;
}
.hb-yj3-link:hover { border-color: var(--hb-yj3-accent); gap: 12px; }
.hb-yj3-grid { display: grid; gap: 16px; }
@container (min-width: 620px) { .hb-yj3-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@container (min-width: 900px) { .hb-yj3-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.hb-yj3-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 380px;
  padding: 26px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background:
    radial-gradient(120% 70% at 100% 0%, color-mix(in srgb, var(--hb-yj3-accent) 9%, transparent), transparent 60%),
    linear-gradient(180deg, #141414, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: border-color .3s ease, transform .4s cubic-bezier(.2, .8, .2, 1);
}
.hb-yj3-card:focus-visible { outline: 2px solid var(--hb-yj3-accent); outline-offset: 3px; }
.hb-yj3-on { border-color: color-mix(in srgb, var(--hb-yj3-accent) 40%, rgba(255, 255, 255, .08)); transform: translateY(-4px); }
.hb-yj3-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hb-yj3-word {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -.03em;
}
.hb-yj3-word svg { width: 22px; height: 22px; color: var(--hb-yj3-accent); }
.hb-yj3-tag {
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 999px;
  color: #8f8f8f;
  font-size: 12px;
}
.hb-yj3-metric {
  margin: auto 0 0;
  padding-top: 48px;
  font-size: clamp(56px, 8cqw, 84px);
  line-height: .95;
  letter-spacing: -.05em;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(180deg, #fff 30%, #8f8f8f);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: transform .45s cubic-bezier(.2, .8, .2, 1), opacity .3s ease;
  transform-origin: left bottom;
}
.hb-yj3-label { margin: 10px 0 0; color: #a1a1a1; font-size: 15px; transition: opacity .3s ease; }
.hb-yj3-on .hb-yj3-metric { transform: translateY(-150px) scale(.62); }
.hb-yj3-on .hb-yj3-label { opacity: 0; }
.hb-yj3-quote {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 22px 26px 24px;
  border-top: 1px solid rgba(255, 255, 255, .08);
  background: linear-gradient(180deg, rgba(20, 20, 20, .92), #101010);
  backdrop-filter: blur(8px);
  transform: translateY(101%);
  transition: transform .5s cubic-bezier(.2, .8, .2, 1);
}
.hb-yj3-on .hb-yj3-quote { transform: translateY(0); }
.hb-yj3-quote blockquote {
  margin: 0;
  color: #ededed;
  font-size: 15px;
  line-height: 1.55;
}
.hb-yj3-quote blockquote::before { content: "\\201C"; color: var(--hb-yj3-accent); margin-right: 2px; }
.hb-yj3-who { display: flex; align-items: center; gap: 10px; margin-top: 16px; }
.hb-yj3-av {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--hb-yj3-accent), color-mix(in srgb, var(--hb-yj3-accent) 30%, #111));
  color: #0a0a0a;
  font-size: 12px;
  font-weight: 700;
}
.hb-yj3-who strong { display: block; font-size: 13px; font-weight: 600; }
.hb-yj3-who span { color: #8f8f8f; font-size: 12px; }
.hb-yj3-read {
  margin-left: auto;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, .12);
  color: #ededed;
}
.hb-yj3-dots { display: flex; gap: 6px; margin-top: 14px; }
.hb-yj3-dots i { width: 18px; height: 3px; border-radius: 2px; background: rgba(255, 255, 255, .1); transition: background .3s ease; }
.hb-yj3-on .hb-yj3-dots i:first-child { background: var(--hb-yj3-accent); }
@media (prefers-reduced-motion: reduce) {
  .hb-yj3 *, .hb-yj3 *::before, .hb-yj3 *::after { animation: none !important; transition: none !important; }
}
`;

function Mark({ kind }: { kind: NonNullable<ProofCaseStudy["mark"]> }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {kind === "ring" ? <><circle cx="12" cy="12" r="8" {...common} /><circle cx="12" cy="12" r="3" fill="currentColor" /></> : null}
      {kind === "bolt" ? <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" {...common} /> : null}
      {kind === "wave" ? <path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0" {...common} /> : null}
      {kind === "grid" ? <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" {...common} /> : null}
      {kind === "leaf" ? <path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15Zm0 0 7-7" {...common} /> : null}
      {kind === "spark" ? <path d="M12 3v6m0 6v6M3 12h6m6 0h6M6 6l3 3m6 6 3 3M18 6l-3 3m-6 6-3 3" {...common} /> : null}
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ProofCaseStudies({
  eyebrow = "Case studies",
  title = "Teams that switched, and the numbers that followed",
  subtitle = "Real results from operations, support and growth teams after their first ninety days.",
  studies = defaultStudies,
  cta = { label: "Read all customer stories", href: "#" },
  defaultActive = 1,
  accent = "#a78bfa",
  onStudyClick,
  className,
  style,
  ...rest
}: ProofCaseStudiesProps) {
  const [active, setActive] = React.useState<number>(defaultActive);
  const [progress, setProgress] = React.useState(0);
  const rootRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const run = () => {
      if (reduce) {
        setProgress(1);
        return;
      }
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        setProgress(1 - Math.pow(1 - p, 3));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={["hb-yj3", className].filter(Boolean).join(" ")}
      style={{ "--hb-yj3-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-proof-case-studies" precedence="default">{css}</style>
      <div className="hb-yj3-inner">
        <div className="hb-yj3-head">
          <div>
            {eyebrow ? <p className="hb-yj3-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-yj3-title">{title}</h2>
            {subtitle ? <p className="hb-yj3-sub">{subtitle}</p> : null}
          </div>
          {cta ? (
            <a className="hb-yj3-link" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
        </div>
        <div className="hb-yj3-grid" onPointerLeave={() => setActive(defaultActive)}>
          {studies.map((s, i) => {
            const on = active === i;
            const shown = (s.value * progress).toFixed(s.decimals ?? 0);
            return (
              <a
                key={s.company + i}
                className={on ? "hb-yj3-card hb-yj3-on" : "hb-yj3-card"}
                href={s.href ?? "#"}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => onStudyClick?.(s, i)}
                aria-label={`${s.company}: ${s.prefix ?? ""}${s.value}${s.suffix ?? ""} ${s.metricLabel}. Read the case study.`}
              >
                <div className="hb-yj3-top">
                  <span className="hb-yj3-word">
                    <Mark kind={s.mark ?? "ring"} />
                    {s.company}
                  </span>
                  <span className="hb-yj3-tag">{s.industry}</span>
                </div>
                <p className="hb-yj3-metric" aria-hidden="true">
                  {s.prefix}
                  {shown}
                  {s.suffix}
                </p>
                <p className="hb-yj3-label">{s.metricLabel}</p>
                <div className="hb-yj3-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="hb-yj3-quote">
                  <blockquote>{s.quote}</blockquote>
                  <div className="hb-yj3-who">
                    <span className="hb-yj3-av">{initials(s.author)}</span>
                    <div>
                      <strong>{s.author}</strong>
                      <span>
                        {s.role}, {s.company}
                      </span>
                    </div>
                    <span className="hb-yj3-read" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
