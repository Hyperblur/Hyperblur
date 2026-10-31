"use client";

import * as React from "react";

export interface PricingTier {
  name: string;
  price: { monthly: number | string; yearly: number | string };
  description?: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}

export interface PricingSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
  accent?: string;
  currency?: string;
  yearlyDiscountLabel?: string;
  popularLabel?: string;
  defaultPeriod?: "monthly" | "yearly";
}

const css = `
.hb-ps {
  --hb-accent: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  padding: 88px 24px;
  background: #0a0a0a;
  color: #f2f2f5;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.hb-ps *, .hb-ps *::before, .hb-ps *::after { box-sizing: border-box; }
.hb-ps-inner { max-width: 1080px; margin: 0 auto; }
.hb-ps-head { display: flex; flex-direction: column; align-items: center; text-align: center; }
.hb-ps-title {
  max-width: 720px;
  margin: 0;
  font-size: clamp(30px, 4.6vw, 48px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -.03em;
  text-wrap: balance;
}
.hb-ps-sub {
  max-width: 540px;
  margin: 16px 0 0;
  color: rgba(255, 255, 255, .6);
  font-size: 17px;
  line-height: 1.55;
  text-wrap: pretty;
}
.hb-ps-toggle {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 32px;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
}
.hb-ps-thumb {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  border-radius: 999px;
  background: var(--hb-accent);
  box-shadow: 0 6px 20px -6px var(--hb-accent);
  transition: transform .35s cubic-bezier(.3, 1.2, .4, 1);
}
.hb-ps-toggle[data-period="yearly"] .hb-ps-thumb { transform: translate3d(100%, 0, 0); }
.hb-ps-opt {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 20px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, .6);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: color .25s ease;
}
.hb-ps-opt:hover { color: #fff; }
.hb-ps-opt[aria-pressed="true"] { color: #fff; }
.hb-ps-opt:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-ps-save {
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, .14);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .01em;
}
.hb-ps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
  margin: 56px 0 0;
  padding: 0;
  list-style: none;
}
.hb-ps-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 20px;
  background: rgba(255, 255, 255, .03);
  transition: transform .3s cubic-bezier(.22, .8, .24, 1), border-color .3s ease;
}
.hb-ps-card:hover { transform: translate3d(0, -3px, 0); border-color: rgba(255, 255, 255, .22); }
.hb-ps-card[data-highlighted="true"] {
  border-color: var(--hb-accent);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--hb-accent) 14%, transparent), transparent 55%),
    rgba(255, 255, 255, .03);
  box-shadow: 0 24px 60px -28px var(--hb-accent);
}
.hb-ps-badge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--hb-accent);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
}
.hb-ps-name { margin: 0; font-size: 16px; font-weight: 600; line-height: 1.3; }
.hb-ps-desc { min-height: 42px; margin: 8px 0 0; color: rgba(255, 255, 255, .6); font-size: 14px; line-height: 1.5; }
.hb-ps-price { display: grid; }
.hb-ps-pv {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0;
  transform: translate3d(0, 8px, 0);
  pointer-events: none;
  transition: opacity .22s ease, transform .22s ease;
}
.hb-ps-price[data-period="monthly"] .hb-ps-pv[data-for="monthly"],
.hb-ps-price[data-period="yearly"] .hb-ps-pv[data-for="yearly"] {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.hb-ps-amount { display: flex; align-items: baseline; gap: 4px; }
.hb-ps-num { font-size: 44px; font-weight: 700; line-height: 1; letter-spacing: -.035em; font-variant-numeric: tabular-nums; }
.hb-ps-per { color: rgba(255, 255, 255, .5); font-size: 14px; }
.hb-ps-note { color: rgba(255, 255, 255, .45); font-size: 12px; line-height: 1.2; }
.hb-ps-list {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 24px 0 0;
  border-top: 1px solid rgba(255, 255, 255, .08);
  list-style: none;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, .8);
}
.hb-ps-list li { display: flex; align-items: flex-start; gap: 10px; }
.hb-ps-check {
  flex: none;
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--hb-accent) 22%, transparent);
  color: var(--hb-accent);
}
.hb-ps-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 24px;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 999px;
  background: transparent;
  color: #f2f2f5;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition: background .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.hb-ps-cta:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .35); }
.hb-ps-cta:focus-visible { outline: 2px solid var(--hb-accent); outline-offset: 3px; }
.hb-ps-card[data-highlighted="true"] .hb-ps-cta {
  border-color: var(--hb-accent);
  background: var(--hb-accent);
  color: #fff;
  box-shadow: 0 8px 28px -8px var(--hb-accent);
}
.hb-ps-card[data-highlighted="true"] .hb-ps-cta:hover { background: color-mix(in srgb, var(--hb-accent) 82%, #ffffff); border-color: transparent; }
@media (max-width: 767px) {
  .hb-ps { padding: 64px 20px; }
  .hb-ps-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; margin-top: 44px; }
  .hb-ps-card { padding: 24px; }
  .hb-ps-desc { min-height: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ps-thumb, .hb-ps-opt, .hb-ps-pv, .hb-ps-card, .hb-ps-cta { transition: none; }
  .hb-ps-card:hover { transform: none; }
}
`;

const defaultTiers: PricingTier[] = [
  {
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    description: "For side projects and early experiments.",
    features: ["1 project", "Community support", "Basic analytics", "1 GB storage"],
    cta: { label: "Get started", href: "#" },
  },
  {
    name: "Pro",
    price: { monthly: 24, yearly: 19 },
    description: "For growing teams that ship every week.",
    features: ["Unlimited projects", "Priority support", "Advanced analytics", "100 GB storage", "Custom domains"],
    cta: { label: "Start free trial", href: "#" },
    highlighted: true,
  },
  {
    name: "Team",
    price: { monthly: 64, yearly: 51 },
    description: "For organizations that need control and scale.",
    features: ["Everything in Pro", "SSO and audit logs", "Role-based access", "1 TB storage", "Dedicated manager"],
    cta: { label: "Contact sales", href: "#" },
  },
];

function Check() {
  return (
    <span className="hb-ps-check" aria-hidden="true">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

function PriceView({
  value,
  period,
  active,
  currency,
}: {
  value: number | string;
  period: "monthly" | "yearly";
  active: boolean;
  currency: string;
}) {
  const numeric = typeof value === "number";
  const note = numeric && value > 0 ? (period === "monthly" ? "Billed monthly" : "Billed yearly") : " ";
  return (
    <div className="hb-ps-pv" data-for={period} aria-hidden={!active}>
      <div className="hb-ps-amount">
        <span className="hb-ps-num">{numeric ? `${currency}${value}` : value}</span>
        {numeric ? <span className="hb-ps-per">/month</span> : null}
      </div>
      <span className="hb-ps-note">{note}</span>
    </div>
  );
}

export function PricingSection({
  title = "Simple pricing that scales with you",
  subtitle = "Start free and upgrade when you grow. No hidden fees, no surprises.",
  tiers = defaultTiers,
  accent = "#2f7bff",
  currency = "$",
  yearlyDiscountLabel = "Save 20%",
  popularLabel = "Most popular",
  defaultPeriod = "monthly",
  className = "",
  style,
  ...rest
}: PricingSectionProps) {
  const [period, setPeriod] = React.useState<"monthly" | "yearly">(defaultPeriod);
  const vars = { "--hb-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-ps ${className}`} style={vars} {...rest}>
      <style href="hb-pricing-section" precedence="default">{css}</style>
      <div className="hb-ps-inner">
        <div className="hb-ps-head">
          <h2 className="hb-ps-title">{title}</h2>
          {subtitle ? <p className="hb-ps-sub">{subtitle}</p> : null}
          <div className="hb-ps-toggle" role="group" aria-label="Billing period" data-period={period}>
            <span className="hb-ps-thumb" aria-hidden="true" />
            <button type="button" className="hb-ps-opt" aria-pressed={period === "monthly"} onClick={() => setPeriod("monthly")}>
              Monthly
            </button>
            <button type="button" className="hb-ps-opt" aria-pressed={period === "yearly"} onClick={() => setPeriod("yearly")}>
              Yearly
              {yearlyDiscountLabel ? <span className="hb-ps-save">{yearlyDiscountLabel}</span> : null}
            </button>
          </div>
        </div>
        <ul className="hb-ps-grid">
          {tiers.map((tier) => (
            <li className="hb-ps-card" key={tier.name} data-highlighted={tier.highlighted ? "true" : "false"}>
              {tier.highlighted ? <span className="hb-ps-badge">{popularLabel}</span> : null}
              <div>
                <h3 className="hb-ps-name">{tier.name}</h3>
                {tier.description ? <p className="hb-ps-desc">{tier.description}</p> : null}
              </div>
              <div className="hb-ps-price" data-period={period}>
                <PriceView value={tier.price.monthly} period="monthly" active={period === "monthly"} currency={currency} />
                <PriceView value={tier.price.yearly} period="yearly" active={period === "yearly"} currency={currency} />
              </div>
              <a className="hb-ps-cta" href={tier.cta.href}>
                {tier.cta.label}
              </a>
              <ul className="hb-ps-list">
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <Check />
                    {feature}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
