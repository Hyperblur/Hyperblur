"use client";

import * as React from "react";

export interface PricingComparePlan {
  name: string;
  description: string;
  price: string;
  period?: string;
  note?: string;
  values: (boolean | string)[];
  cta: { label: string; href: string };
  highlighted?: boolean;
  badge?: string;
}

export interface PricingCompareCardsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: string[];
  plans?: PricingComparePlan[];
  enterprise?: { title: string; text: string; points: string[]; cta: { label: string; href: string } } | null;
  accent?: string;
}

const defaultFeatures = [
  "Projects",
  "Version history",
  "Comments and reviews",
  "Export to production code",
  "Custom domains",
  "Shared component libraries",
  "Brand kits and tokens",
  "Priority support",
];

const defaultPlans: PricingComparePlan[] = [
  {
    name: "Starter",
    description: "Everything one designer needs to ship polished sites.",
    price: "$12",
    period: "per editor / month",
    note: "Billed yearly or $15 month to month",
    values: ["3", "30 days", true, true, false, false, false, false],
    cta: { label: "Start with Starter", href: "#" },
  },
  {
    name: "Studio",
    description: "For teams that share systems, review together and own their brand.",
    price: "$32",
    period: "per editor / month",
    note: "Billed yearly or $39 month to month",
    values: ["Unlimited", "Unlimited", true, true, true, true, true, true],
    cta: { label: "Try Studio free for 14 days", href: "#" },
    highlighted: true,
    badge: "Best for teams",
  },
];

const defaultEnterprise = {
  title: "Enterprise",
  text: "Custom contracts, SAML SSO, EU or US data residency and a named success manager.",
  points: ["SOC 2 Type II", "99.99% SLA", "Invoice billing"],
  cta: { label: "Contact sales", href: "#" },
};

const css = `
.hb-kc3 {
  --hb-kc3-accent: #ff5c39;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #f7f5ef;
  color: #141414;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kc3 *, .hb-kc3 *::before, .hb-kc3 *::after { box-sizing: border-box; }
.hb-kc3-inner { max-width: 1120px; margin: 0 auto; padding: 72px 18px 64px; }
.hb-kc3-head { max-width: 660px; margin: 0 auto; text-align: center; }
.hb-kc3-eyebrow { margin: 0 0 14px; color: var(--hb-kc3-accent); font-size: 13px; font-weight: 650; letter-spacing: .02em; }
.hb-kc3-title {
  margin: 0;
  font-size: clamp(30px, 5cqi, 50px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -.04em;
  text-wrap: balance;
}
.hb-kc3-sub { margin: 16px auto 0; max-width: 500px; color: #5f5d57; font-size: 16px; line-height: 1.6; text-wrap: pretty; }
.hb-kc3-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; max-width: 940px; margin: 44px auto 0; padding: 0; list-style: none; }
.hb-kc3-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 26px 22px 24px;
  border: 1px solid rgba(20, 20, 20, .1);
  border-radius: 22px;
  background: rgba(255, 255, 255, .45);
  animation: hb-kc3-rise .8s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: var(--hb-kc3-d, 0ms);
}
.hb-kc3-card[data-hl="true"] {
  border-color: rgba(20, 20, 20, .06);
  background: #fff;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .9) inset, 0 2px 4px rgba(20, 20, 20, .04), 0 24px 60px -24px rgba(20, 20, 20, .25);
}
.hb-kc3-card[data-hl="true"]::before {
  content: "";
  position: absolute;
  left: 22px;
  right: 22px;
  top: -1px;
  height: 3px;
  border-radius: 0 0 4px 4px;
  background: var(--hb-kc3-accent);
}
.hb-kc3-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hb-kc3-name { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -.02em; }
.hb-kc3-badge {
  height: 26px;
  padding: 0 11px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-kc3-accent) 12%, #fff);
  color: color-mix(in srgb, var(--hb-kc3-accent) 80%, #000);
  font-size: 12px;
  font-weight: 650;
  line-height: 26px;
  white-space: nowrap;
}
.hb-kc3-desc { margin: 8px 0 0; max-width: 340px; color: #5f5d57; font-size: 14.5px; line-height: 1.5; }
.hb-kc3-price { display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 10px; margin-top: 22px; }
.hb-kc3-amount { font-size: clamp(44px, 6cqi, 56px); font-weight: 700; line-height: 1; letter-spacing: -.05em; font-variant-numeric: tabular-nums; }
.hb-kc3-period { color: #5f5d57; font-size: 14px; }
.hb-kc3-note { margin: 8px 0 0; color: #8b8880; font-size: 12.5px; }
.hb-kc3-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  margin-top: 22px;
  border: 1px solid rgba(20, 20, 20, .16);
  border-radius: 12px;
  background: transparent;
  color: #141414;
  font-size: 14.5px;
  font-weight: 650;
  text-decoration: none;
  transition: background-color .25s ease, border-color .25s ease, transform .2s ease, box-shadow .25s ease;
}
.hb-kc3-cta:hover { border-color: rgba(20, 20, 20, .32); background: rgba(20, 20, 20, .03); }
.hb-kc3-cta:active { transform: scale(.985); }
.hb-kc3-cta:focus-visible { outline: 2px solid var(--hb-kc3-accent); outline-offset: 3px; }
.hb-kc3-card[data-hl="true"] .hb-kc3-cta {
  border-color: #141414;
  background: #141414;
  color: #fff;
  box-shadow: 0 10px 24px -12px rgba(20, 20, 20, .6);
}
.hb-kc3-card[data-hl="true"] .hb-kc3-cta:hover { background: #2a2a2a; }
.hb-kc3-list { margin: 24px 0 0; padding: 0; list-style: none; }
.hb-kc3-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  border-top: 1px solid rgba(20, 20, 20, .07);
  font-size: 14px;
}
.hb-kc3-list li[data-off="true"] .hb-kc3-label { color: #a5a29a; }
.hb-kc3-label { color: #34322e; }
.hb-kc3-val { flex: none; color: #141414; font-weight: 650; font-size: 13.5px; }
.hb-kc3-tick {
  display: grid;
  place-items: center;
  flex: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--hb-kc3-accent) 14%, #fff);
  color: var(--hb-kc3-accent);
}
.hb-kc3-tick svg { width: 12px; height: 12px; }
.hb-kc3-tick path { stroke-dasharray: 16; stroke-dashoffset: 16; animation: hb-kc3-draw .5s cubic-bezier(.65, 0, .35, 1) forwards; animation-delay: var(--hb-kc3-d, 0ms); }
.hb-kc3-dash { flex: none; width: 22px; height: 22px; display: grid; place-items: center; }
.hb-kc3-dash::before { content: ""; width: 10px; height: 2px; border-radius: 2px; background: #c9c6bd; }
.hb-kc3-ent {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 18px;
  max-width: 940px;
  margin: 16px auto 0;
  padding: 22px;
  border-radius: 22px;
  background: #141414;
  color: #f7f5ef;
  animation: hb-kc3-rise .8s cubic-bezier(.2, .8, .2, 1) .3s both;
}
.hb-kc3-ent-main { display: flex; gap: 16px; align-items: flex-start; }
.hb-kc3-ent-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, .08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);
}
.hb-kc3-ent-icon svg { width: 20px; height: 20px; }
.hb-kc3-ent h3 { margin: 0; font-size: 16px; font-weight: 700; letter-spacing: -.01em; }
.hb-kc3-ent p { margin: 4px 0 0; color: rgba(247, 245, 239, .62); font-size: 14px; line-height: 1.5; }
.hb-kc3-points { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0 0; padding: 0; list-style: none; }
.hb-kc3-points li {
  padding: 4px 10px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  color: rgba(247, 245, 239, .8);
  font-size: 12px;
  font-weight: 550;
}
.hb-kc3-ent-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  align-self: center;
  height: 44px;
  padding: 0 20px;
  border-radius: 12px;
  background: #f7f5ef;
  color: #141414;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color .2s ease;
}
.hb-kc3-ent-cta:hover { background: #fff; }
.hb-kc3-ent-cta:focus-visible { outline: 2px solid var(--hb-kc3-accent); outline-offset: 3px; }
.hb-kc3-ent-cta svg { width: 14px; height: 14px; transition: transform .25s ease; }
.hb-kc3-ent-cta:hover svg { transform: translateX(3px); }
@keyframes hb-kc3-rise {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-kc3-draw { to { stroke-dashoffset: 0; } }
@container (min-width: 720px) {
  .hb-kc3-inner { padding: 104px 32px 96px; }
  .hb-kc3-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin-top: 56px; }
  .hb-kc3-card { padding: 34px 32px 28px; }
  .hb-kc3-card[data-hl="true"]::before { left: 32px; right: 32px; }
  .hb-kc3-ent { grid-template-columns: minmax(0, 1fr) auto; align-items: center; margin-top: 20px; padding: 24px 28px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kc3-card, .hb-kc3-ent { animation: none; }
  .hb-kc3-tick path { animation: none; stroke-dashoffset: 0; }
  .hb-kc3-cta, .hb-kc3-ent-cta, .hb-kc3-ent-cta svg { transition: none; }
}
`;

function Tick({ delay }: { delay: number }) {
  return (
    <span className="hb-kc3-tick" role="img" aria-label="Included" style={{ "--hb-kc3-d": `${delay}ms` } as React.CSSProperties}>
      <svg viewBox="0 0 12 12" aria-hidden="true">
        <path d="M2.5 6.3l2.3 2.3 4.7-5.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function PricingCompareCards({
  eyebrow = "Plans",
  title = "Two plans. Pick the one that fits your team.",
  subtitle = "Start on Starter, move to Studio when your team grows. We prorate the difference to the day.",
  features = defaultFeatures,
  plans = defaultPlans,
  enterprise = defaultEnterprise,
  accent = "#ff5c39",
  className = "",
  style,
  ...rest
}: PricingCompareCardsProps) {
  const vars = { "--hb-kc3-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kc3 ${className}`} style={vars} {...rest}>
      <style href="hb-pricing-compare-cards" precedence="default">{css}</style>
      <div className="hb-kc3-inner">
        <div className="hb-kc3-head">
          {eyebrow ? <p className="hb-kc3-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-kc3-title">{title}</h2>
          {subtitle ? <p className="hb-kc3-sub">{subtitle}</p> : null}
        </div>
        <ul className="hb-kc3-grid">
          {plans.map((plan, p) => (
            <li
              key={plan.name}
              className="hb-kc3-card"
              data-hl={plan.highlighted ? "true" : "false"}
              style={{ "--hb-kc3-d": `${p * 120}ms` } as React.CSSProperties}
            >
              <div className="hb-kc3-top">
                <h3 className="hb-kc3-name">{plan.name}</h3>
                {plan.badge ? <span className="hb-kc3-badge">{plan.badge}</span> : null}
              </div>
              <p className="hb-kc3-desc">{plan.description}</p>
              <div className="hb-kc3-price">
                <span className="hb-kc3-amount">{plan.price}</span>
                {plan.period ? <span className="hb-kc3-period">{plan.period}</span> : null}
              </div>
              {plan.note ? <p className="hb-kc3-note">{plan.note}</p> : null}
              <a className="hb-kc3-cta" href={plan.cta.href}>{plan.cta.label}</a>
              <ul className="hb-kc3-list">
                {features.map((feature, f) => {
                  const v = plan.values[f];
                  const off = v === false || v === undefined;
                  return (
                    <li key={feature} data-off={off ? "true" : "false"}>
                      <span className="hb-kc3-label">{feature}</span>
                      {typeof v === "string" ? (
                        <span className="hb-kc3-val">{v}</span>
                      ) : v ? (
                        <Tick delay={500 + p * 120 + f * 70} />
                      ) : (
                        <span className="hb-kc3-dash" role="img" aria-label="Not included" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
        {enterprise ? (
          <div className="hb-kc3-ent">
            <div className="hb-kc3-ent-main">
              <span className="hb-kc3-ent-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20">
                  <path d="M3.5 17V5.5L10 3l6.5 2.5V17M3.5 17h13M7 8h1.5M11.5 8H13M7 11h1.5M11.5 11H13M8.5 17v-3h3v3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3>{enterprise.title}</h3>
                <p>{enterprise.text}</p>
                <ul className="hb-kc3-points">
                  {enterprise.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
            <a className="hb-kc3-ent-cta" href={enterprise.cta.href}>
              {enterprise.cta.label}
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
