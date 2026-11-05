"use client";

import * as React from "react";

export interface AboutMissionPrinciple {
  title: string;
  text: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface AboutMissionSplitProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  statement?: string;
  highlight?: string[];
  signature?: string;
  principles?: AboutMissionPrinciple[];
  cta?: { label: string; href: string };
  accent?: string;
}

const defaultPrinciples: AboutMissionPrinciple[] = [
  { title: "Measure what matters", text: "Every feature ships with a number we promise to move. If it does not move, we remove the feature.", value: 41, suffix: "%", label: "less energy per kWh billed" },
  { title: "Build for the grid of 2040", text: "Our models assume half of all homes will sell power back. We design for that world today.", value: 1.8, suffix: "M", label: "homes on the platform" },
  { title: "Stay boring with money", text: "Profitable since year three. No growth at any cost, no surprise price changes, ever.", value: 12, prefix: "$", suffix: "M", label: "returned to customers in 2025" },
];

const css = `
@keyframes hb-yg3-word {
  from { opacity: 0; transform: translateY(0.4em); filter: blur(6px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}
@keyframes hb-yg3-card {
  from { opacity: 0; transform: translateX(24px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-yg3-sweep {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.hb-yg3 {
  --hb-yg3-accent: #10b981;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yg3 *, .hb-yg3 *::before, .hb-yg3 *::after { box-sizing: border-box; }
.hb-yg3-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px) 0 0 / 100% 64px,
    radial-gradient(50% 60% at 0% 100%, color-mix(in srgb, var(--hb-yg3-accent) 14%, transparent), transparent 70%);
  mask-image: linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent);
  -webkit-mask-image: linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent);
}
.hb-yg3-in {
  position: relative;
  display: grid;
  gap: 48px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 96px 24px;
}
@container (min-width: 820px) {
  .hb-yg3-in { grid-template-columns: 1.15fr 1fr; gap: 64px; align-items: center; }
}
.hb-yg3-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #8f8f8f;
  font-size: 13px;
  font-weight: 500;
}
.hb-yg3-eyebrow i {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--hb-yg3-accent);
  box-shadow: 0 0 12px var(--hb-yg3-accent);
}
.hb-yg3-statement {
  margin: 20px 0 0;
  font-size: clamp(34px, 5.4cqw, 62px);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.045em;
  text-wrap: balance;
}
.hb-yg3-w {
  display: inline-block;
  animation: hb-yg3-word 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-yg3-w[data-hl="true"] {
  color: var(--hb-yg3-accent);
  text-shadow: 0 0 40px color-mix(in srgb, var(--hb-yg3-accent) 40%, transparent);
}
.hb-yg3-sign {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 32px;
  color: #a1a1a1;
  font-size: 14px;
}
.hb-yg3-sign::before {
  content: "";
  width: 40px;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}
.hb-yg3-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  padding: 0 18px;
  height: 42px;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}
.hb-yg3-cta:hover { background: #fff; transform: translateY(-1px); }
.hb-yg3-cta:focus-visible { outline: 2px solid var(--hb-yg3-accent); outline-offset: 3px; }
.hb-yg3-cta svg { transition: transform 0.2s ease; }
.hb-yg3-cta:hover svg { transform: translateX(3px); }
.hb-yg3-list {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-yg3-card {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 18px;
  padding: 22px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: linear-gradient(180deg, #131313, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  animation: hb-yg3-card 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transition: border-color 0.3s ease, background 0.3s ease;
}
.hb-yg3-card:hover {
  border-color: color-mix(in srgb, var(--hb-yg3-accent) 40%, transparent);
  background: linear-gradient(180deg, #151715, #0f110f);
}
.hb-yg3-card::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--hb-yg3-accent), transparent);
  transform-origin: left;
  animation: hb-yg3-sweep 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: inherit;
}
.hb-yg3-num {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid color-mix(in srgb, var(--hb-yg3-accent) 35%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, var(--hb-yg3-accent) 10%, transparent);
  color: var(--hb-yg3-accent);
  font-family: ui-monospace, "Geist Mono", SFMono-Regular, Menlo, monospace;
  font-size: 14px;
  font-weight: 600;
}
.hb-yg3-card h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.hb-yg3-card p {
  margin: 6px 0 0;
  color: #8f8f8f;
  font-size: 14px;
  line-height: 1.55;
}
.hb-yg3-metric {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 10px;
  margin-top: 14px;
}
.hb-yg3-metric strong {
  font-size: 26px;
  font-weight: 650;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}
.hb-yg3-metric span { color: #8f8f8f; font-size: 12.5px; }
@media (prefers-reduced-motion: reduce) {
  .hb-yg3-w, .hb-yg3-card, .hb-yg3-card::after { animation: none; }
  .hb-yg3-card, .hb-yg3-cta, .hb-yg3-cta svg { transition: none; }
}
`;

function decimals(n: number) {
  const s = String(n);
  const i = s.indexOf(".");
  return i < 0 ? 0 : s.length - i - 1;
}

export function AboutMissionSplit({
  eyebrow = "Our mission",
  statement = "We exist to make clean energy the cheapest, simplest choice for every home on the planet.",
  highlight = ["cheapest,", "simplest"],
  signature = "Ingrid Solberg, founder of Fjordlight",
  principles = defaultPrinciples,
  cta = { label: "Read the 2025 impact report", href: "#impact" },
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: AboutMissionSplitProps) {
  const listRef = React.useRef<HTMLUListElement>(null);
  const [t, setT] = React.useState(1);

  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min((now - start) / 1600, 1);
        setT(1 - Math.pow(1 - k, 3));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const words = statement.split(" ");

  return (
    <section className={`hb-yg3 ${className}`} style={{ "--hb-yg3-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-about-mission-split" precedence="default">{css}</style>
      <div className="hb-yg3-bg" aria-hidden="true" />
      <div className="hb-yg3-in">
        <div>
          <span className="hb-yg3-eyebrow"><i aria-hidden="true" />{eyebrow}</span>
          <h2 className="hb-yg3-statement" aria-label={statement}>
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span
                  className="hb-yg3-w"
                  aria-hidden="true"
                  data-hl={highlight.includes(w)}
                  style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }}
                >
                  {w}
                </span>
                {i < words.length - 1 ? " " : ""}
              </React.Fragment>
            ))}
          </h2>
          {signature && <p className="hb-yg3-sign">{signature}</p>}
          {cta && (
            <a className="hb-yg3-cta" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          )}
        </div>
        <ul ref={listRef} className="hb-yg3-list">
          {principles.map((p, i) => {
            const d = decimals(p.value);
            return (
              <li key={p.title} className="hb-yg3-card" style={{ animationDelay: `${(0.3 + i * 0.12).toFixed(2)}s` }}>
                <span className="hb-yg3-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="hb-yg3-metric">
                    <strong aria-label={`${p.prefix ?? ""}${p.value}${p.suffix ?? ""}`}>
                      {p.prefix}{(p.value * t).toFixed(d)}{p.suffix}
                    </strong>
                    <span>{p.label}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
