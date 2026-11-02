"use client";

import * as React from "react";

export interface MetricQuote {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface MetricsQuotesLink {
  label: string;
  href: string;
}

export interface ProofMetricsQuotesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: MetricQuote[];
  cta?: MetricsQuotesLink | null;
  accent?: string;
  duration?: number;
}

const css = `
.hb-kd4 {
  --hb-kd4-accent: #10b981;
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kd4 *, .hb-kd4 *::before, .hb-kd4 *::after { box-sizing: border-box; }
.hb-kd4::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: radial-gradient(70% 60% at 50% 0%, #000, transparent 75%);
  mask-image: radial-gradient(70% 60% at 50% 0%, #000, transparent 75%);
  pointer-events: none;
}
.hb-kd4-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 96px 24px 104px;
}
.hb-kd4-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 48px;
}
.hb-kd4-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--hb-kd4-accent);
  font-size: 13px;
  font-weight: 600;
}
.hb-kd4-eyebrow i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-kd4-accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kd4-accent) 20%, transparent);
}
.hb-kd4-title {
  margin: 14px 0 0;
  max-width: 620px;
  font-size: clamp(28px, 4.4cqi, 44px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -.03em;
  text-wrap: balance;
}
.hb-kd4-sub { margin: 14px 0 0; max-width: 520px; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-kd4-link {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  color: #ededed;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: border-color .25s ease, background-color .25s ease;
}
.hb-kd4-link:hover { border-color: color-mix(in srgb, var(--hb-kd4-accent) 55%, transparent); background: color-mix(in srgb, var(--hb-kd4-accent) 10%, transparent); }
.hb-kd4-link:focus-visible { outline: 2px solid var(--hb-kd4-accent); outline-offset: 3px; }
.hb-kd4-link svg { width: 14px; height: 14px; transition: transform .25s ease; }
.hb-kd4-link:hover svg { transform: translate3d(3px, 0, 0); }
.hb-kd4-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-kd4-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 22px;
  background: linear-gradient(180deg, #131313 0%, #0d0d0d 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06);
  overflow: hidden;
  transition: border-color .3s ease, transform .45s cubic-bezier(.2, .8, .2, 1);
}
.hb-kd4-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 28px;
  right: 28px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--hb-kd4-accent), transparent);
  opacity: .7;
}
.hb-kd4-card::after {
  content: "";
  position: absolute;
  inset: -40% -20% auto;
  height: 70%;
  background: radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--hb-kd4-accent) 13%, transparent), transparent 70%);
  pointer-events: none;
}
.hb-kd4-card:hover { border-color: color-mix(in srgb, var(--hb-kd4-accent) 35%, rgba(255, 255, 255, .08)); transform: translate3d(0, -3px, 0); }
.hb-kd4-num {
  position: relative;
  display: flex;
  align-items: baseline;
  margin: 0;
  font-size: clamp(44px, 6.4cqi, 68px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -.045em;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(180deg, #ffffff 30%, color-mix(in srgb, var(--hb-kd4-accent) 40%, #9a9a9a));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-kd4-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.hb-kd4-affix { font-size: .62em; letter-spacing: -.02em; }
.hb-kd4-label { position: relative; margin: 12px 0 0; color: #bdbdbd; font-size: 15px; font-weight: 500; }
.hb-kd4-bar {
  position: relative;
  height: 3px;
  margin: 24px 0 24px;
  border-radius: 3px;
  background: rgba(255, 255, 255, .06);
  overflow: hidden;
}
.hb-kd4-bar span {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-kd4-accent) 30%, transparent), var(--hb-kd4-accent));
  transform-origin: left center;
  transform: scaleX(var(--hb-kd4-w, 1));
  transition: transform var(--hb-kd4-dur, 1.8s) cubic-bezier(.16, 1, .3, 1);
}
.hb-kd4[data-armed="true"]:not([data-inview="true"]) .hb-kd4-bar span { transform: scaleX(0); transition: none; }
.hb-kd4-quote {
  position: relative;
  flex: 1;
  margin: 0;
  color: #d4d4d4;
  font-size: 15px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kd4-who {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
}
.hb-kd4-av {
  display: grid;
  flex: none;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .16);
}
.hb-kd4-name { display: block; font-size: 14px; font-weight: 600; font-style: normal; color: #ededed; }
.hb-kd4-role { display: block; margin-top: 2px; font-size: 12.5px; color: #8f8f8f; }
.hb-kd4-co {
  margin-left: auto;
  padding: 4px 9px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 999px;
  color: #a1a1a1;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
  white-space: nowrap;
}
.hb-kd4[data-armed="true"] .hb-kd4-card { opacity: 0; transform: translate3d(0, 18px, 0); }
.hb-kd4[data-armed="true"][data-inview="true"] .hb-kd4-card {
  opacity: 1;
  transform: none;
  transition: opacity .7s ease, transform .9s cubic-bezier(.16, 1, .3, 1), border-color .3s ease;
  transition-delay: var(--hb-kd4-delay, 0s), var(--hb-kd4-delay, 0s), 0s;
}
.hb-kd4[data-armed="true"][data-inview="true"] .hb-kd4-card:hover { transform: translate3d(0, -3px, 0); transition-delay: 0s; }
@container (max-width: 880px) {
  .hb-kd4-grid { grid-template-columns: minmax(0, 1fr); gap: 14px; }
  .hb-kd4-card { padding: 24px; }
  .hb-kd4-num { font-size: clamp(44px, 12cqi, 60px); }
}
@container (max-width: 640px) {
  .hb-kd4-in { padding: 64px 16px 72px; }
  .hb-kd4-head { flex-direction: column; align-items: flex-start; gap: 20px; margin-bottom: 32px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kd4-card, .hb-kd4-bar span, .hb-kd4-link, .hb-kd4-link svg { transition: none !important; }
  .hb-kd4-card:hover { transform: none; }
}
`;

const defaultItems: MetricQuote[] = [
  {
    value: 3.2,
    suffix: "x",
    decimals: 1,
    label: "faster deploys to production",
    quote: "We went from a nervous Thursday release to shipping a dozen times a day. Our on-call rotation finally sleeps through the night.",
    name: "Rachel Nguyen",
    role: "Director of Platform",
    company: "Fernhill",
  },
  {
    value: -41,
    suffix: "%",
    label: "churn in the first 90 days",
    quote: "Onboarding emails triggered from real product usage did more for retention than two years of discount campaigns.",
    name: "Jonas Lindqvist",
    role: "Head of Growth",
    company: "Tidewell",
  },
  {
    value: 1.8,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    label: "saved on infrastructure in year one",
    quote: "Consolidating four vendors onto one bill paid for the rollout in the first quarter. Finance now forwards our dashboard around.",
    name: "Imani Brooks",
    role: "VP Operations",
    company: "Meridian",
  },
];

const tones = [
  "linear-gradient(135deg, #10b981, #0ea5e9)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #8b5cf6, #2f7bff)",
  "linear-gradient(135deg, #ec4899, #f59e0b)",
];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatValue(value: number, decimals: number) {
  const sign = value < 0 ? "−" : "";
  return sign + Math.abs(value).toFixed(decimals);
}

export function ProofMetricsQuotes({
  eyebrow = "Customer results",
  title = "The numbers our customers bring to their board meetings",
  subtitle = "Measured by the teams themselves, twelve months after switching to Relay.",
  items = defaultItems,
  cta = { label: "Read the case studies", href: "#case-studies" },
  accent = "#10b981",
  duration = 1.8,
  className = "",
  style,
  ...rest
}: ProofMetricsQuotesProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const signature = items.map((item) => `${item.value}:${item.decimals ?? 0}`).join("|");

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-hb-kd4-to]"));
    nodes.forEach((node) => {
      node.textContent = formatValue(0, Number(node.dataset.hbKd4Dec ?? 0));
    });
    root.dataset.armed = "true";
    let frame = 0;
    const ms = Math.max(300, duration * 1000);
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / ms);
        const eased = 1 - Math.pow(1 - t, 4);
        nodes.forEach((node) => {
          const to = Number(node.dataset.hbKd4To ?? 0);
          const dec = Number(node.dataset.hbKd4Dec ?? 0);
          node.textContent = formatValue(t >= 1 ? to : to * eased, dec);
        });
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          root.dataset.inview = "true";
          io.disconnect();
          run();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      nodes.forEach((node) => {
        node.textContent = formatValue(Number(node.dataset.hbKd4To ?? 0), Number(node.dataset.hbKd4Dec ?? 0));
      });
      delete root.dataset.armed;
      delete root.dataset.inview;
    };
  }, [signature, duration]);

  const maxAbs = Math.max(1, ...items.map((item) => Math.abs(item.value)));
  const vars = { "--hb-kd4-accent": accent, "--hb-kd4-dur": `${Math.max(0.3, duration).toFixed(2)}s`, ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-kd4 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-proof-metrics-quotes" precedence="default">{css}</style>
      <div className="hb-kd4-in">
        <header className="hb-kd4-head">
          <div>
            {eyebrow && (
              <p className="hb-kd4-eyebrow">
                <i aria-hidden="true" />
                {eyebrow}
              </p>
            )}
            <h2 id={`${uid}-t`} className="hb-kd4-title">{title}</h2>
            {subtitle && <p className="hb-kd4-sub">{subtitle}</p>}
          </div>
          {cta && (
            <a className="hb-kd4-link" href={cta.href}>
              {cta.label}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          )}
        </header>
        <ul className="hb-kd4-grid">
          {items.map((item, i) => {
            const decimals = item.decimals ?? 0;
            const final = `${item.prefix ?? ""}${formatValue(item.value, decimals)}${item.suffix ?? ""}`;
            const width = (0.45 + 0.55 * (Math.abs(item.value) / maxAbs)).toFixed(3);
            return (
              <li key={`${item.name}-${i}`}>
                <figure
                  className="hb-kd4-card"
                  style={{ "--hb-kd4-delay": `${(i * 0.12).toFixed(2)}s`, "--hb-kd4-w": width } as React.CSSProperties}
                >
                  <p className="hb-kd4-num">
                    <span className="hb-kd4-sr">{final}</span>
                    {item.prefix && <span className="hb-kd4-affix" aria-hidden="true">{item.prefix}</span>}
                    <span key={`${item.value}-${decimals}`} aria-hidden="true" data-hb-kd4-to={item.value} data-hb-kd4-dec={decimals}>
                      {formatValue(item.value, decimals)}
                    </span>
                    {item.suffix && <span className="hb-kd4-affix" aria-hidden="true">{item.suffix}</span>}
                  </p>
                  <p className="hb-kd4-label">{item.label}</p>
                  <div className="hb-kd4-bar" aria-hidden="true">
                    <span />
                  </div>
                  <blockquote className="hb-kd4-quote">{item.quote}</blockquote>
                  <figcaption className="hb-kd4-who">
                    <span className="hb-kd4-av" style={{ background: tones[i % tones.length] }} aria-hidden="true">
                      {initialsOf(item.name)}
                    </span>
                    <span>
                      <cite className="hb-kd4-name">{item.name}</cite>
                      <span className="hb-kd4-role">{item.role}</span>
                    </span>
                    <span className="hb-kd4-co">{item.company}</span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
