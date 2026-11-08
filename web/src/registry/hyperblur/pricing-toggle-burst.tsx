"use client";

import * as React from "react";

export type PricingToggleBurstPeriod = "monthly" | "yearly";

export interface PricingToggleBurstPlan {
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
}

export interface PricingToggleBurstProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingToggleBurstPlan[];
  currency?: string;
  locale?: string;
  period?: PricingToggleBurstPeriod;
  defaultPeriod?: PricingToggleBurstPeriod;
  onPeriodChange?: (period: PricingToggleBurstPeriod) => void;
  discountLabel?: string;
  accent?: string;
}

const defaultPlans: PricingToggleBurstPlan[] = [
  {
    name: "Starter",
    tagline: "For solo builders validating an idea.",
    monthly: 19,
    yearly: 15,
    features: ["2 production apps", "50k function runs", "Daily backups", "Community forum"],
    cta: { label: "Start building", href: "#" },
  },
  {
    name: "Studio",
    tagline: "For small teams shipping every week.",
    monthly: 49,
    yearly: 39,
    features: ["Unlimited apps", "1M function runs", "Branch previews", "Role-based access", "Priority email support"],
    cta: { label: "Start 14-day trial", href: "#" },
    featured: true,
  },
  {
    name: "Scale",
    tagline: "For products with real traffic and SLAs.",
    monthly: 149,
    yearly: 119,
    features: ["Everything in Studio", "10M function runs", "SAML SSO", "99.99% uptime SLA", "Dedicated success manager"],
    cta: { label: "Contact sales", href: "#" },
  },
];

const shards = Array.from({ length: 16 }, (_, i) => {
  const h = (Math.imul(i + 7, 2654435761) >>> 0) % 1000;
  const angle = (i / 16) * 360 + (h % 22) - 11;
  const dist = 34 + (h % 30);
  const size = 4 + (h % 4);
  return { angle: angle.toFixed(1), dist: dist.toFixed(1), size, round: h % 3 === 0, delay: ((h % 60) / 1000).toFixed(3) };
});

const css = `
.hb-vh1 {
  --hb-vh1-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  isolation: isolate;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vh1 *, .hb-vh1 *::before, .hb-vh1 *::after { box-sizing: border-box; }
.hb-vh1::before {
  content: "";
  position: absolute;
  inset: -20% 10% auto;
  height: 520px;
  z-index: -1;
  background: radial-gradient(50% 50% at 50% 0%, color-mix(in srgb, var(--hb-vh1-accent) 20%, transparent), transparent 70%);
  pointer-events: none;
}
.hb-vh1-inner { max-width: 1080px; margin: 0 auto; padding: 72px 20px 72px; }
.hb-vh1-head { display: flex; flex-direction: column; align-items: center; text-align: center; }
.hb-vh1-eyebrow {
  margin: 0 0 14px;
  color: color-mix(in srgb, var(--hb-vh1-accent) 55%, #fff);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-vh1-title {
  margin: 0;
  max-width: 640px;
  font-size: clamp(30px, 5cqi, 48px);
  font-weight: 650;
  line-height: 1.06;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-vh1-sub { margin: 14px 0 0; max-width: 520px; color: #8f8f8f; font-size: 16px; line-height: 1.6; text-wrap: pretty; }
.hb-vh1-ctrl { position: relative; display: flex; align-items: center; gap: 14px; margin-top: 32px; }
.hb-vh1-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  border: 0;
  background: none;
  color: #8f8f8f;
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  cursor: pointer;
}
.hb-vh1-toggle span[data-on="true"] { color: #fff; }
.hb-vh1-toggle span { transition: color .3s ease; }
.hb-vh1-track {
  position: relative;
  width: 52px;
  height: 30px;
  border-radius: 999px;
  background: #1c1c1f;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .1), inset 0 2px 6px rgba(0, 0, 0, .6);
  transition: background-color .35s ease, box-shadow .35s ease;
}
.hb-vh1-toggle[aria-checked="true"] .hb-vh1-track {
  background: var(--hb-vh1-accent);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .2), 0 0 22px -4px var(--hb-vh1-accent);
}
.hb-vh1-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: linear-gradient(180deg, #fff, #dcdce2);
  box-shadow: 0 2px 6px rgba(0, 0, 0, .45), inset 0 -1px 0 rgba(0, 0, 0, .1);
  transition: transform .55s cubic-bezier(.34, 1.56, .64, 1), width .2s ease;
}
.hb-vh1-toggle:active .hb-vh1-knob { width: 30px; }
.hb-vh1-toggle[aria-checked="true"] .hb-vh1-knob { transform: translateX(22px); }
.hb-vh1-toggle[aria-checked="true"]:active .hb-vh1-knob { transform: translateX(16px); }
.hb-vh1-toggle:focus-visible { outline: none; }
.hb-vh1-toggle:focus-visible .hb-vh1-track { outline: 2px solid var(--hb-vh1-accent); outline-offset: 3px; }
.hb-vh1-badge-wrap { position: relative; display: inline-flex; }
.hb-vh1-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 12px;
  border: 1px dashed rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #8f8f8f;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  transition: color .3s ease, border-color .3s ease, background-color .3s ease;
}
.hb-vh1-badge[data-on="true"] {
  border-style: solid;
  border-color: color-mix(in srgb, var(--hb-vh1-accent) 60%, transparent);
  background: color-mix(in srgb, var(--hb-vh1-accent) 18%, transparent);
  color: #fff;
  animation: hb-vh1-pop .6s cubic-bezier(.34, 1.8, .5, 1);
}
@keyframes hb-vh1-pop { 0% { transform: scale(1); } 35% { transform: scale(1.18) rotate(-3deg); } 100% { transform: scale(1); } }
.hb-vh1-burst { position: absolute; left: 50%; top: 50%; width: 0; height: 0; pointer-events: none; }
.hb-vh1-shard {
  position: absolute;
  left: 0;
  top: 0;
  background: var(--hb-vh1-accent);
  opacity: 0;
  animation: hb-vh1-fly .8s cubic-bezier(.12, .7, .3, 1) forwards;
}
.hb-vh1-shard:nth-child(3n) { background: #fff; }
.hb-vh1-shard:nth-child(4n) { background: color-mix(in srgb, var(--hb-vh1-accent) 50%, #fff); }
@keyframes hb-vh1-fly {
  0% { opacity: 1; transform: rotate(var(--a)) translateX(4px) scale(1); }
  70% { opacity: 1; }
  100% { opacity: 0; transform: rotate(var(--a)) translateX(var(--d)) scale(.3); }
}
.hb-vh1-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  border-radius: 999px;
  border: 2px solid var(--hb-vh1-accent);
  opacity: 0;
  animation: hb-vh1-ring .7s cubic-bezier(.2, .7, .3, 1);
}
@keyframes hb-vh1-ring { 0% { opacity: .9; transform: scale(.4); } 100% { opacity: 0; transform: scale(2.6); } }
.hb-vh1-grid { display: grid; grid-template-columns: 1fr; gap: 14px; margin: 44px 0 0; padding: 0; list-style: none; }
@container (min-width: 760px) { .hb-vh1-grid { grid-template-columns: repeat(3, 1fr); } }
.hb-vh1-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 26px 24px 24px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background: linear-gradient(180deg, #131315, #0e0e10);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
}
.hb-vh1-card[data-featured="true"] {
  border-color: color-mix(in srgb, var(--hb-vh1-accent) 45%, transparent);
  background:
    radial-gradient(120% 60% at 50% 0%, color-mix(in srgb, var(--hb-vh1-accent) 14%, transparent), transparent 70%),
    linear-gradient(180deg, #141418, #0e0e11);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 24px 60px -30px color-mix(in srgb, var(--hb-vh1-accent) 70%, transparent);
}
.hb-vh1-name { margin: 0; font-size: 15px; font-weight: 600; }
.hb-vh1-tag { margin: 6px 0 0; color: #8f8f8f; font-size: 13.5px; line-height: 1.5; }
.hb-vh1-price { position: relative; display: flex; flex-direction: column; justify-content: flex-end; height: 86px; margin-top: 18px; }
.hb-vh1-was {
  position: relative;
  align-self: flex-start;
  color: #6b6b6b;
  font-size: 15px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity .35s ease, transform .45s cubic-bezier(.2, .8, .2, 1);
}
.hb-vh1-was::after {
  content: "";
  position: absolute;
  left: -2px;
  right: -2px;
  top: 52%;
  height: 1.5px;
  background: #ff6b6b;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .4s cubic-bezier(.65, 0, .35, 1) .15s;
}
.hb-vh1[data-period="yearly"] .hb-vh1-was { opacity: 1; transform: none; }
.hb-vh1[data-period="yearly"] .hb-vh1-was::after { transform: scaleX(1); }
.hb-vh1-amount { display: flex; align-items: baseline; gap: 6px; height: 52px; overflow: hidden; }
.hb-vh1-num {
  display: inline-block;
  font-size: 46px;
  font-weight: 650;
  letter-spacing: -.04em;
  line-height: 52px;
  font-variant-numeric: tabular-nums;
  animation: hb-vh1-in .55s cubic-bezier(.2, .9, .25, 1.15);
}
@keyframes hb-vh1-in { 0% { opacity: 0; transform: translateY(70%); filter: blur(4px); } 100% { opacity: 1; transform: none; filter: blur(0); } }
.hb-vh1-per { color: #8f8f8f; font-size: 13.5px; }
.hb-vh1-save {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  height: 24px;
  margin-top: 10px;
  padding: 0 10px;
  border-radius: 999px;
  background: color-mix(in srgb, #3ddc97 14%, transparent);
  color: #6ee7b7;
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  opacity: 0;
  transform: translateY(-4px) scale(.94);
  transition: opacity .35s ease .1s, transform .5s cubic-bezier(.34, 1.56, .64, 1) .1s;
}
.hb-vh1[data-period="yearly"] .hb-vh1-save { opacity: 1; transform: none; }
.hb-vh1-save[data-zero="true"] { visibility: hidden; }
.hb-vh1-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  margin-top: 18px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, .12);
  background: rgba(255, 255, 255, .03);
  color: #ededed;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color .2s ease, border-color .2s ease, transform .15s ease;
}
.hb-vh1-cta:hover { background: rgba(255, 255, 255, .07); border-color: rgba(255, 255, 255, .2); }
.hb-vh1-cta:active { transform: scale(.98); }
.hb-vh1-cta:focus-visible { outline: 2px solid var(--hb-vh1-accent); outline-offset: 2px; }
.hb-vh1-card[data-featured="true"] .hb-vh1-cta {
  border-color: transparent;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-vh1-accent) 85%, #fff), var(--hb-vh1-accent));
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3), 0 10px 24px -10px var(--hb-vh1-accent);
}
.hb-vh1-card[data-featured="true"] .hb-vh1-cta:hover { filter: brightness(1.08); }
.hb-vh1-list { display: grid; gap: 10px; margin: 22px 0 0; padding: 20px 0 0; border-top: 1px solid rgba(255, 255, 255, .07); list-style: none; }
.hb-vh1-list li { display: flex; gap: 10px; color: #b5b5b5; font-size: 13.5px; line-height: 1.4; }
.hb-vh1-list svg { flex: none; width: 16px; height: 16px; margin-top: 1px; color: var(--hb-vh1-accent); }
@media (prefers-reduced-motion: reduce) {
  .hb-vh1 *, .hb-vh1 *::before, .hb-vh1 *::after { animation: none !important; transition: none !important; }
  .hb-vh1-burst { display: none; }
}
`;

export function PricingToggleBurst({
  eyebrow = "Pricing",
  title = "Simple plans that pay for themselves",
  subtitle = "Every plan includes unlimited collaborators and global edge hosting. Switch to yearly and keep two months on us.",
  plans = defaultPlans,
  currency = "USD",
  locale = "en-US",
  period,
  defaultPeriod = "monthly",
  onPeriodChange,
  discountLabel = "2 months free",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PricingToggleBurstProps) {
  const [inner, setInner] = React.useState<PricingToggleBurstPeriod>(defaultPeriod);
  const [burst, setBurst] = React.useState(0);
  const current = period ?? inner;
  const yearly = current === "yearly";

  const money = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }),
    [locale, currency],
  );

  const toggle = () => {
    const next: PricingToggleBurstPeriod = yearly ? "monthly" : "yearly";
    if (period === undefined) setInner(next);
    if (next === "yearly") setBurst((b) => b + 1);
    onPeriodChange?.(next);
  };

  return (
    <section
      className={`hb-vh1 ${className}`}
      data-period={current}
      style={{ "--hb-vh1-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-pricing-toggle-burst" precedence="default">{css}</style>
      <div className="hb-vh1-inner">
        <div className="hb-vh1-head">
          {eyebrow ? <p className="hb-vh1-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-vh1-title">{title}</h2>
          {subtitle ? <p className="hb-vh1-sub">{subtitle}</p> : null}
          <div className="hb-vh1-ctrl">
            <button type="button" role="switch" aria-checked={yearly} aria-label="Bill yearly" className="hb-vh1-toggle" onClick={toggle}>
              <span data-on={!yearly}>Monthly</span>
              <span className="hb-vh1-track" aria-hidden="true">
                <span className="hb-vh1-knob" />
              </span>
              <span data-on={yearly}>Yearly</span>
            </button>
            {discountLabel ? (
              <span className="hb-vh1-badge-wrap">
                <span key={`b${burst}`} className="hb-vh1-badge" data-on={yearly}>
                  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                    <path d="M8 1.5l1.6 3.6 3.9.4-2.9 2.6.8 3.8L8 10l-3.4 1.9.8-3.8L2.5 5.5l3.9-.4z" fill="currentColor" />
                  </svg>
                  {discountLabel}
                </span>
                {burst > 0 ? (
                  <span key={burst} className="hb-vh1-burst" aria-hidden="true">
                    <span className="hb-vh1-ring" />
                    {shards.map((s, i) => (
                      <span
                        key={i}
                        className="hb-vh1-shard"
                        style={{
                          width: s.size,
                          height: s.round ? s.size : 2,
                          borderRadius: s.round ? 999 : 1,
                          animationDelay: `${s.delay}s`,
                          "--a": `${s.angle}deg`,
                          "--d": `${s.dist}px`,
                        } as React.CSSProperties}
                      />
                    ))}
                  </span>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
        <ul className="hb-vh1-grid">
          {plans.map((plan) => {
            const value = yearly ? plan.yearly : plan.monthly;
            const saved = (plan.monthly - plan.yearly) * 12;
            return (
              <li key={plan.name} className="hb-vh1-card" data-featured={plan.featured ? "true" : undefined}>
                <h3 className="hb-vh1-name">{plan.name}</h3>
                <p className="hb-vh1-tag">{plan.tagline}</p>
                <div className="hb-vh1-price">
                  <span className="hb-vh1-was" aria-hidden={!yearly}>{money.format(plan.monthly)}</span>
                  <div className="hb-vh1-amount" aria-live="polite">
                    <span key={`${current}-${value}`} className="hb-vh1-num">{money.format(value)}</span>
                    <span className="hb-vh1-per">/ month</span>
                  </div>
                </div>
                <span className="hb-vh1-save" data-zero={saved <= 0 ? "true" : undefined}>
                  You save {money.format(saved)} a year
                </span>
                <a className="hb-vh1-cta" href={plan.cta.href}>{plan.cta.label}</a>
                <ul className="hb-vh1-list">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
