"use client";

import * as React from "react";

export interface PricingRibbonTier {
  name: string;
  summary: string;
  price: number;
  period: string;
  features: string[];
  cta: { label: string; href: string };
  ribbon?: string;
}

export interface PricingRibbonHighlightProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tiers?: PricingRibbonTier[];
  currency?: string;
  locale?: string;
  selected?: number;
  defaultSelected?: number;
  onSelect?: (index: number, tier: PricingRibbonTier) => void;
  accent?: string;
  accentTo?: string;
}

const defaultTiers: PricingRibbonTier[] = [
  {
    name: "Essentials",
    summary: "Bookkeeping for freelancers and sole traders.",
    price: 15,
    period: "per month",
    features: ["Bank feeds from 2 accounts", "Invoices and receipts", "Quarterly tax estimate", "Mobile receipt capture"],
    cta: { label: "Choose Essentials", href: "#" },
  },
  {
    name: "Growth",
    summary: "Payroll and reporting for teams up to 25.",
    price: 42,
    period: "per month",
    features: ["Unlimited bank feeds", "Payroll for 25 people", "Profit and cash forecasts", "Multi-currency invoicing", "Accountant access"],
    cta: { label: "Choose Growth", href: "#" },
    ribbon: "Best value",
  },
  {
    name: "Premium",
    summary: "Multi-entity books with approvals and audit trail.",
    price: 89,
    period: "per month",
    features: ["Everything in Growth", "Up to 5 entities", "Spend approvals", "Audit trail and locks", "Dedicated onboarding"],
    cta: { label: "Choose Premium", href: "#" },
  },
];

const css = `
.hb-vh6 {
  --hb-vh6-a: #2f7bff;
  --hb-vh6-b: #a78bfa;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vh6 *, .hb-vh6 *::before, .hb-vh6 *::after { box-sizing: border-box; }
.hb-vh6-inner { max-width: 1040px; margin: 0 auto; padding: 72px 20px; }
.hb-vh6-head { display: grid; justify-items: center; gap: 10px; text-align: center; }
.hb-vh6-eyebrow { margin: 0; font-family: var(--font-mono), ui-monospace, monospace; color: #8f8f8f; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
.hb-vh6-title { margin: 0; max-width: 620px; font-size: clamp(30px, 4.8cqi, 46px); font-weight: 650; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-vh6-sub { margin: 0; max-width: 500px; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; }
.hb-vh6-row { position: relative; display: grid; grid-template-columns: 1fr; gap: 14px; margin: 48px 0 0; }
@container (min-width: 760px) { .hb-vh6-row { grid-template-columns: repeat(var(--n), 1fr); gap: 16px; } }
.hb-vh6-frame {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  border-radius: 22px;
  padding: 1.5px;
  pointer-events: none;
  overflow: hidden;
  transition: transform .6s cubic-bezier(.3, 1.25, .4, 1), width .6s cubic-bezier(.3, 1.25, .4, 1), height .6s cubic-bezier(.3, 1.25, .4, 1), opacity .3s ease;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
.hb-vh6-frame::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 200%;
  aspect-ratio: 1;
  background: conic-gradient(from 0deg, transparent 0 40%, var(--hb-vh6-a) 55%, var(--hb-vh6-b) 70%, transparent 85%);
  transform: translate(-50%, -50%);
  animation: hb-vh6-spin 4.5s linear infinite;
}
.hb-vh6-frame::after { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-vh6-a) 35%, transparent); }
@keyframes hb-vh6-spin { to { transform: translate(-50%, -50%) rotate(1turn); } }
.hb-vh6-glow {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  border-radius: 22px;
  background: radial-gradient(70% 50% at 50% 0%, color-mix(in srgb, var(--hb-vh6-a) 22%, transparent), transparent 70%);
  box-shadow: 0 40px 80px -40px color-mix(in srgb, var(--hb-vh6-a) 60%, transparent);
  pointer-events: none;
  transition: transform .6s cubic-bezier(.3, 1.25, .4, 1), width .6s cubic-bezier(.3, 1.25, .4, 1), height .6s cubic-bezier(.3, 1.25, .4, 1);
}
.hb-vh6-card {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 30px 24px 24px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, .07);
  background: linear-gradient(180deg, rgba(20, 20, 23, .92), rgba(13, 13, 15, .92));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  overflow: hidden;
  cursor: pointer;
  outline: none;
  transition: border-color .3s ease;
}
.hb-vh6-card[data-lit="true"] { border-color: transparent; }
.hb-vh6-ribbon {
  position: absolute;
  top: 22px;
  right: -38px;
  width: 150px;
  padding: 6px 0;
  background: linear-gradient(90deg, var(--hb-vh6-a), var(--hb-vh6-b));
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  text-align: center;
  text-transform: uppercase;
  transform: rotate(45deg);
  box-shadow: 0 6px 18px -6px rgba(0, 0, 0, .8), inset 0 1px 0 rgba(255, 255, 255, .35);
  overflow: hidden;
}
.hb-vh6-ribbon::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: -40%;
  width: 30%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .55), transparent);
  transform: skewX(-20deg);
  animation: hb-vh6-shine 3.6s cubic-bezier(.4, 0, .2, 1) infinite;
}
@keyframes hb-vh6-shine { 0%, 55% { left: -40%; } 100% { left: 130%; } }
.hb-vh6-name { margin: 0; font-size: 16px; font-weight: 600; }
.hb-vh6-sum { margin: 8px 0 0; min-height: 42px; max-width: 230px; color: #8f8f8f; font-size: 13.5px; line-height: 1.55; }
.hb-vh6-price { display: flex; align-items: baseline; gap: 8px; margin-top: 20px; }
.hb-vh6-price strong { font-size: 46px; font-weight: 650; letter-spacing: -.045em; line-height: 1; font-variant-numeric: tabular-nums; }
.hb-vh6-price span { color: #8f8f8f; font-size: 13.5px; }
.hb-vh6-list { display: grid; gap: 11px; margin: 24px 0 26px; padding: 0; list-style: none; }
.hb-vh6-list li { display: flex; gap: 10px; color: #b5b5b5; font-size: 13.5px; line-height: 1.4; }
.hb-vh6-list svg { flex: none; width: 16px; height: 16px; margin-top: 1px; color: #5f5f66; transition: color .35s ease; }
.hb-vh6-card[data-lit="true"] .hb-vh6-list svg { color: var(--hb-vh6-a); }
.hb-vh6-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  margin-top: auto;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, .12);
  background: rgba(255, 255, 255, .03);
  color: #ededed;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background .3s ease, border-color .3s ease, color .3s ease, transform .15s ease, box-shadow .3s ease;
}
.hb-vh6-cta:hover { border-color: rgba(255, 255, 255, .22); }
.hb-vh6-cta:active { transform: scale(.98); }
.hb-vh6-cta:focus-visible { outline: 2px solid var(--hb-vh6-a); outline-offset: 2px; }
.hb-vh6-card[data-selected="true"] .hb-vh6-cta {
  border-color: transparent;
  background: linear-gradient(90deg, var(--hb-vh6-a), var(--hb-vh6-b));
  color: #fff;
  box-shadow: 0 12px 28px -12px var(--hb-vh6-a), inset 0 1px 0 rgba(255, 255, 255, .3);
}
.hb-vh6-sel {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  color: #6f6f6f;
  font-size: 12px;
  justify-content: center;
}
.hb-vh6-sel i { width: 14px; height: 14px; border-radius: 999px; border: 1.5px solid #3f3f46; font-style: normal; display: grid; place-items: center; transition: border-color .3s ease, background-color .3s ease; }
.hb-vh6-sel i::after { content: ""; width: 6px; height: 6px; border-radius: 999px; background: #fff; transform: scale(0); transition: transform .35s cubic-bezier(.34, 1.56, .64, 1); }
.hb-vh6-card[data-selected="true"] .hb-vh6-sel { color: #ededed; }
.hb-vh6-card[data-selected="true"] .hb-vh6-sel i { border-color: var(--hb-vh6-a); background: var(--hb-vh6-a); }
.hb-vh6-card[data-selected="true"] .hb-vh6-sel i::after { transform: scale(1); }
.hb-vh6-card:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-vh6-a); }
@media (prefers-reduced-motion: reduce) {
  .hb-vh6 *, .hb-vh6 *::before, .hb-vh6 *::after { animation: none !important; transition: none !important; }
}
`;

export function PricingRibbonHighlight({
  eyebrow = "Pricing",
  title = "Books that close themselves every month",
  subtitle = "Hover to compare, click to choose. All plans include bank-grade encryption and free migration from your old tool.",
  tiers = defaultTiers,
  currency = "USD",
  locale = "en-US",
  selected,
  defaultSelected,
  onSelect,
  accent = "#2f7bff",
  accentTo = "#a78bfa",
  className = "",
  style,
  ...rest
}: PricingRibbonHighlightProps) {
  const ribbonIndex = Math.max(0, tiers.findIndex((t) => t.ribbon));
  const [inner, setInner] = React.useState(defaultSelected ?? ribbonIndex);
  const [hover, setHover] = React.useState<number | null>(null);
  const [rect, setRect] = React.useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const rowRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const current = selected ?? inner;
  const lit = hover ?? current;

  const money = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }),
    [locale, currency],
  );

  const measure = React.useCallback(() => {
    const el = cardRefs.current[lit];
    if (!el) return;
    setRect({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
  }, [lit]);

  React.useLayoutEffect(() => {
    measure();
  }, [measure]);

  React.useEffect(() => {
    const row = rowRef.current;
    if (!row || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(row);
    return () => ro.disconnect();
  }, [measure]);

  const choose = (i: number) => {
    if (selected === undefined) setInner(i);
    onSelect?.(i, tiers[i]);
  };

  const frameStyle: React.CSSProperties = rect
    ? { width: rect.w, height: rect.h, transform: `translate(${rect.x}px, ${rect.y}px)` }
    : { opacity: 0 };

  return (
    <section
      className={`hb-vh6 ${className}`}
      style={{ "--hb-vh6-a": accent, "--hb-vh6-b": accentTo, "--n": tiers.length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-pricing-ribbon-highlight" precedence="default">{css}</style>
      <div className="hb-vh6-inner">
        <div className="hb-vh6-head">
          {eyebrow ? <p className="hb-vh6-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-vh6-title">{title}</h2>
          {subtitle ? <p className="hb-vh6-sub">{subtitle}</p> : null}
        </div>
        <div ref={rowRef} className="hb-vh6-row" role="radiogroup" aria-label="Plans" onPointerLeave={() => setHover(null)}>
          <span className="hb-vh6-glow" style={frameStyle} aria-hidden="true" />
          {tiers.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="hb-vh6-card"
              role="radio"
              aria-checked={current === i}
              tabIndex={current === i ? 0 : -1}
              data-lit={lit === i ? "true" : undefined}
              data-selected={current === i ? "true" : undefined}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => choose(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  if (e.target === e.currentTarget) { e.preventDefault(); choose(i); }
                } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  const n = (i + 1) % tiers.length;
                  choose(n);
                  cardRefs.current[n]?.focus();
                } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  const n = (i - 1 + tiers.length) % tiers.length;
                  choose(n);
                  cardRefs.current[n]?.focus();
                }
              }}
            >
              {t.ribbon ? <span className="hb-vh6-ribbon" aria-hidden="true">{t.ribbon}</span> : null}
              <h3 className="hb-vh6-name">{t.name}</h3>
              <p className="hb-vh6-sum">{t.summary}</p>
              <div className="hb-vh6-price">
                <strong>{money.format(t.price)}</strong>
                <span>{t.period}</span>
              </div>
              <ul className="hb-vh6-list">
                {t.features.map((f) => (
                  <li key={f}>
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a className="hb-vh6-cta" href={t.cta.href} tabIndex={current === i ? 0 : -1} onClick={(e) => e.stopPropagation()}>
                {t.cta.label}
              </a>
              <span className="hb-vh6-sel" aria-hidden="true"><i />{current === i ? "Selected" : "Select"}</span>
            </div>
          ))}
          <span className="hb-vh6-frame" style={frameStyle} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
