"use client";

import * as React from "react";

export interface PricingSinglePlanProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  planName?: string;
  price?: number;
  yearlyPrice?: number;
  period?: string;
  features?: string[];
  stats?: { value: string; label: string }[];
  sealText?: string;
  currency?: string;
  locale?: string;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
  accent?: string;
}

const defaultFeatures = [
  "Unlimited projects",
  "Unlimited collaborators",
  "Custom domains with SSL",
  "Version history forever",
  "Form submissions and webhooks",
  "Password-protected pages",
  "Analytics without cookies",
  "Global CDN on every page",
  "Priority email support",
];

const defaultStats = [
  { value: "4,200+", label: "studios on the plan" },
  { value: "0", label: "add-ons or upsells" },
  { value: "1 min", label: "to cancel, online" },
];

const css = `
.hb-vh10 {
  --hb-vh10-accent: #7fb3ff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vh10 *, .hb-vh10 *::before, .hb-vh10 *::after { box-sizing: border-box; }
.hb-vh10-inner { position: relative; max-width: 920px; margin: 0 auto; padding: 72px 20px 64px; text-align: center; }
.hb-vh10-eyebrow { margin: 0; color: #8f8f8f; font-family: var(--font-mono), ui-monospace, monospace; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; }
.hb-vh10-title { margin: 14px auto 0; max-width: 620px; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(30px, 5cqi, 52px); font-weight: 600; line-height: 1.02; letter-spacing: -.04em; text-wrap: balance; }
.hb-vh10-sub { margin: 14px auto 0; max-width: 480px; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; }
.hb-vh10-priceblock { position: relative; display: inline-flex; flex-direction: column; align-items: center; margin-top: 40px; padding: 0 92px; }
.hb-vh10-plan { display: inline-flex; align-items: center; gap: 8px; height: 26px; padding: 0 12px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, .1); color: #cfcfcf; font-size: 12.5px; font-weight: 600; }
.hb-vh10-plan i { width: 6px; height: 6px; border-radius: 999px; background: var(--hb-vh10-accent); box-shadow: 0 0 8px var(--hb-vh10-accent); font-style: normal; }
.hb-vh10-price { display: flex; align-items: flex-start; gap: 4px; margin-top: 14px; }
.hb-vh10-price strong {
  font-family: var(--font-grotesk), var(--font-sans), sans-serif;
  font-size: clamp(72px, 13cqi, 120px);
  font-weight: 600;
  line-height: .9;
  letter-spacing: -.06em;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(180deg, #fff 30%, #8f8f98);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-vh10-period { margin-top: 10px; color: #8f8f8f; font-size: 14px; }
.hb-vh10-alt { margin-top: 6px; color: #6f6f6f; font-size: 13px; font-variant-numeric: tabular-nums; }
.hb-vh10-alt b { color: color-mix(in srgb, var(--hb-vh10-accent) 60%, #fff); font-weight: 600; }
.hb-vh10-seal { position: absolute; right: -6px; top: 34px; width: 104px; height: 104px; }
.hb-vh10-seal svg { width: 100%; height: 100%; overflow: visible; }
.hb-vh10-ring { transform-origin: 50px 50px; animation: hb-vh10-spin 22s linear infinite; }
@keyframes hb-vh10-spin { to { transform: rotate(1turn); } }
.hb-vh10-ring text { fill: #a1a1a1; font-family: var(--font-mono), ui-monospace, monospace; font-size: 8.4px; letter-spacing: .18em; text-transform: uppercase; }
.hb-vh10-core { fill: #111113; stroke: rgba(255, 255, 255, .12); }
.hb-vh10-core-mark { fill: none; stroke: var(--hb-vh10-accent); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-vh10-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; margin-top: 30px; }
.hb-vh10-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .2), 0 16px 40px -16px color-mix(in srgb, var(--hb-vh10-accent) 80%, transparent);
  transition: transform .2s cubic-bezier(.34, 1.56, .64, 1), background-color .2s ease;
}
.hb-vh10-cta::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: -60%;
  width: 40%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .9), transparent);
  transform: skewX(-20deg);
  animation: hb-vh10-shine 4.2s cubic-bezier(.4, 0, .2, 1) infinite;
}
@keyframes hb-vh10-shine { 0%, 60% { left: -60%; } 100% { left: 140%; } }
.hb-vh10-cta svg { width: 15px; height: 15px; transition: transform .3s cubic-bezier(.34, 1.56, .64, 1); }
.hb-vh10-cta:hover { background: #fff; transform: translateY(-1px); }
.hb-vh10-cta:hover svg { transform: translateX(3px); }
.hb-vh10-cta:active { transform: scale(.98); }
.hb-vh10-cta:focus-visible { outline: 2px solid var(--hb-vh10-accent); outline-offset: 3px; }
.hb-vh10-sec { color: #a1a1a1; font-size: 14px; font-weight: 500; text-decoration: none; padding: 0 8px; border-radius: 6px; transition: color .2s ease; }
.hb-vh10-sec:hover { color: #fff; }
.hb-vh10-sec:focus-visible { outline: 2px solid var(--hb-vh10-accent); outline-offset: 3px; }
.hb-vh10-list { display: grid; grid-template-columns: 1fr; gap: 0 28px; margin: 48px 0 0; padding: 26px 0 0; border-top: 1px solid rgba(255, 255, 255, .07); list-style: none; text-align: left; }
@container (min-width: 620px) { .hb-vh10-list { grid-template-columns: repeat(3, 1fr); } }
.hb-vh10-list li { display: flex; align-items: center; gap: 10px; padding: 9px 0; color: #6f6f6f; font-size: 14px; transition: color .4s ease; transition-delay: calc(var(--i) * 90ms); }
.hb-vh10-box { position: relative; flex: none; width: 18px; height: 18px; border-radius: 6px; border: 1.5px solid #3a3a40; transition: border-color .3s ease, background-color .3s ease; transition-delay: calc(var(--i) * 90ms); }
.hb-vh10-box svg { position: absolute; inset: 1px; width: 13px; height: 13px; }
.hb-vh10-box path { fill: none; stroke: #0a0a0a; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 16; stroke-dashoffset: 16; transition: stroke-dashoffset .35s cubic-bezier(.65, 0, .35, 1); transition-delay: calc(var(--i) * 90ms + 120ms); }
.hb-vh10[data-in="true"] .hb-vh10-list li { color: #cfcfcf; }
.hb-vh10[data-in="true"] .hb-vh10-box { border-color: var(--hb-vh10-accent); background: var(--hb-vh10-accent); }
.hb-vh10[data-in="true"] .hb-vh10-box path { stroke-dashoffset: 0; }
.hb-vh10-stats { display: grid; grid-template-columns: repeat(var(--n), 1fr); margin-top: 32px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, .07); background: rgba(255, 255, 255, .015); }
.hb-vh10-stat { padding: 16px 12px; }
.hb-vh10-stat + .hb-vh10-stat { border-left: 1px solid rgba(255, 255, 255, .07); }
.hb-vh10-stat strong { display: block; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 22px; font-weight: 600; letter-spacing: -.02em; }
.hb-vh10-stat span { color: #8f8f8f; font-size: 12.5px; }
@container (max-width: 560px) {
  .hb-vh10-priceblock { padding: 0; }
  .hb-vh10-seal { position: relative; right: auto; top: auto; margin-top: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vh10 *, .hb-vh10 *::before, .hb-vh10 *::after { animation: none !important; transition: none !important; }
  .hb-vh10-list li { color: #cfcfcf; }
  .hb-vh10-box { border-color: var(--hb-vh10-accent); background: var(--hb-vh10-accent); }
  .hb-vh10-box path { stroke-dashoffset: 0; }
}
`;

export function PricingSinglePlan({
  eyebrow = "One plan",
  title = "Everything included. No tiers to compare.",
  subtitle = "Build and host as many sites as you like. One flat price per workspace, the whole team included.",
  planName = "Workspace",
  price = 24,
  yearlyPrice = 240,
  period = "per workspace / month",
  features = defaultFeatures,
  stats = defaultStats,
  sealText = "30-day money-back guarantee  ·  cancel anytime  ·  ",
  currency = "USD",
  locale = "en-US",
  cta = { label: "Start your workspace", href: "#" },
  secondary = { label: "See what is included", href: "#" },
  accent = "#7fb3ff",
  className = "",
  style,
  ...rest
}: PricingSinglePlanProps) {
  const uid = React.useId().replace(/:/g, "");
  const ref = React.useRef<HTMLElement>(null);

  const money = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }),
    [locale, currency],
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.in = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.in = "true";
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const yearlySave = price * 12 - yearlyPrice;

  return (
    <section
      ref={ref}
      className={`hb-vh10 ${className}`}
      style={{ "--hb-vh10-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-pricing-single-plan" precedence="default">{css}</style>
      <div className="hb-vh10-inner">
        {eyebrow ? <p className="hb-vh10-eyebrow">{eyebrow}</p> : null}
        <h2 className="hb-vh10-title">{title}</h2>
        {subtitle ? <p className="hb-vh10-sub">{subtitle}</p> : null}
        <div className="hb-vh10-priceblock">
          <span className="hb-vh10-plan"><i aria-hidden="true" />{planName}</span>
          <div className="hb-vh10-price">
            <strong>{money.format(price)}</strong>
          </div>
          <span className="hb-vh10-period">{period}</span>
          {yearlyPrice > 0 ? (
            <span className="hb-vh10-alt">
              or {money.format(yearlyPrice)} a year{yearlySave > 0 ? <>, <b>{money.format(yearlySave)} off</b></> : null}
            </span>
          ) : null}
          {sealText ? (
            <span className="hb-vh10-seal">
              <svg viewBox="0 0 100 100" role="img" aria-label={sealText.split("·").map((t) => t.trim()).filter(Boolean).join(". ")}>
                <defs>
                  <path id={`${uid}-c`} d="M50 50 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" />
                </defs>
                <g className="hb-vh10-ring">
                  <text>
                    <textPath href={`#${uid}-c`} textLength="250" lengthAdjust="spacing">{sealText}</textPath>
                  </text>
                </g>
                <circle className="hb-vh10-core" cx="50" cy="50" r="27" />
                <path className="hb-vh10-core-mark" d="M50 36l10 4v8c0 7-4.6 11.5-10 14-5.4-2.5-10-7-10-14v-8z M45 49.5l3.6 3.6 6.6-7" />
              </svg>
            </span>
          ) : null}
        </div>
        <div className="hb-vh10-actions">
          <a className="hb-vh10-cta" href={cta.href}>
            {cta.label}
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          {secondary ? <a className="hb-vh10-sec" href={secondary.href}>{secondary.label}</a> : null}
        </div>
        <ul className="hb-vh10-list">
          {features.map((f, i) => (
            <li key={f} style={{ "--i": i } as React.CSSProperties}>
              <span className="hb-vh10-box" aria-hidden="true">
                <svg viewBox="0 0 14 14"><path d="M3 7.4l2.6 2.6L11 4.4" /></svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
        {stats.length ? (
          <div className="hb-vh10-stats" style={{ "--n": stats.length } as React.CSSProperties}>
            {stats.map((s) => (
              <div key={s.label} className="hb-vh10-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
