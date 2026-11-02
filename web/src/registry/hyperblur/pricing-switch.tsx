"use client";

import * as React from "react";

export type PricingSwitchPeriod = "monthly" | "yearly";

export interface PricingSwitchTier {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
}

export interface PricingSwitchProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tiers?: PricingSwitchTier[];
  currency?: string;
  period?: PricingSwitchPeriod;
  defaultPeriod?: PricingSwitchPeriod;
  onPeriodChange?: (period: PricingSwitchPeriod) => void;
  saveLabel?: string;
  footnote?: string;
  accent?: string;
}

const defaultTiers: PricingSwitchTier[] = [
  {
    name: "Hobby",
    description: "For side projects and weekend experiments.",
    monthly: 0,
    yearly: 0,
    features: ["3 projects", "10k monthly visitors", "Community support", "7-day analytics"],
    cta: { label: "Start for free", href: "#" },
  },
  {
    name: "Pro",
    description: "For freelancers and small teams shipping weekly.",
    monthly: 29,
    yearly: 23,
    features: ["Unlimited projects", "250k monthly visitors", "Preview deployments", "Password protection", "Email support in 24h"],
    cta: { label: "Start 14-day trial", href: "#" },
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Scale",
    description: "For companies that need control and guarantees.",
    monthly: 99,
    yearly: 79,
    features: ["Everything in Pro", "2M monthly visitors", "SAML SSO and audit log", "99.99% uptime SLA", "Dedicated Slack channel"],
    cta: { label: "Talk to sales", href: "#" },
  },
];

const css = `
.hb-kc1 {
  --hb-kc1-accent: #8b5cf6;
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
.hb-kc1 *, .hb-kc1 *::before, .hb-kc1 *::after { box-sizing: border-box; }
.hb-kc1::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(50% 40% at 50% 62%, color-mix(in srgb, var(--hb-kc1-accent) 22%, transparent), transparent 70%),
    linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px) 0 0 / 48px 48px,
    linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px) 0 0 / 48px 48px;
  -webkit-mask-image: radial-gradient(80% 70% at 50% 40%, #000 30%, transparent 85%);
  mask-image: radial-gradient(80% 70% at 50% 40%, #000 30%, transparent 85%);
  pointer-events: none;
}
.hb-kc1-inner { max-width: 1120px; margin: 0 auto; padding: 72px 18px 64px; }
.hb-kc1-head { display: flex; flex-direction: column; gap: 24px; }
.hb-kc1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 14px;
  color: color-mix(in srgb, var(--hb-kc1-accent) 60%, #fff);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-kc1-eyebrow::before {
  content: "";
  width: 18px;
  height: 1px;
  background: currentColor;
}
.hb-kc1-title {
  margin: 0;
  max-width: 620px;
  font-size: clamp(30px, 5cqi, 48px);
  font-weight: 650;
  line-height: 1.06;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-kc1-sub {
  margin: 14px 0 0;
  max-width: 520px;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kc1-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.hb-kc1-switch {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: #111;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
}
.hb-kc1-pill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  border-radius: 999px;
  background: linear-gradient(180deg, #2a2a2e, #1c1c20);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .12), 0 6px 16px -6px rgba(0, 0, 0, .8);
  transition: transform .5s cubic-bezier(.65, 0, .2, 1.25);
}
.hb-kc1-switch[data-period="yearly"] .hb-kc1-pill { transform: translateX(100%); }
.hb-kc1-opt {
  position: relative;
  z-index: 1;
  min-width: 96px;
  height: 36px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  background: none;
  color: #8f8f8f;
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  cursor: pointer;
  transition: color .3s ease;
}
.hb-kc1-opt[aria-checked="true"] { color: #fff; }
.hb-kc1-opt:focus-visible { outline: 2px solid var(--hb-kc1-accent); outline-offset: 2px; }
.hb-kc1-save {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  color: #8f8f8f;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  transition: color .3s ease, border-color .3s ease, background-color .3s ease, transform .4s cubic-bezier(.3, 1.6, .5, 1);
}
.hb-kc1-save svg { width: 12px; height: 12px; }
.hb-kc1-save[data-on="true"] {
  border-color: color-mix(in srgb, var(--hb-kc1-accent) 50%, transparent);
  background: color-mix(in srgb, var(--hb-kc1-accent) 16%, transparent);
  color: color-mix(in srgb, var(--hb-kc1-accent) 55%, #fff);
  transform: scale(1.04);
}
.hb-kc1-panel {
  display: grid;
  grid-template-columns: 1fr;
  margin: 44px 0 0;
  padding: 0;
  list-style: none;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .025), rgba(255, 255, 255, .01));
}
.hb-kc1-tier { position: relative; display: flex; flex-direction: column; padding: 28px 24px; }
.hb-kc1-tier + .hb-kc1-tier { border-top: 1px solid rgba(255, 255, 255, .08); }
.hb-kc1-tier[data-featured="true"] {
  z-index: 1;
  margin: -1px;
  padding: 1px;
  border: 0;
  border-radius: 24px;
  overflow: hidden;
  isolation: isolate;
  background: color-mix(in srgb, var(--hb-kc1-accent) 35%, rgba(255, 255, 255, .1));
  box-shadow: 0 40px 90px -40px color-mix(in srgb, var(--hb-kc1-accent) 80%, transparent), 0 0 0 1px rgba(0, 0, 0, .5);
}
.hb-kc1-tier[data-featured="true"] + .hb-kc1-tier { border-top: 0; }
.hb-kc1-tier[data-featured="true"]::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: -1;
  width: 260%;
  aspect-ratio: 1;
  background: conic-gradient(from 0deg, transparent 0 58%, color-mix(in srgb, var(--hb-kc1-accent) 70%, transparent) 70%, #fff 76%, var(--hb-kc1-accent) 82%, transparent 92%);
  transform: translate(-50%, -50%) rotate(0deg);
  animation: hb-kc1-spin 7s linear infinite;
}
.hb-kc1-body { display: flex; flex: 1; flex-direction: column; }
.hb-kc1-tier[data-featured="true"] .hb-kc1-body {
  padding: 27px 23px;
  border-radius: 23px;
  background:
    radial-gradient(120% 60% at 50% 0%, color-mix(in srgb, var(--hb-kc1-accent) 18%, transparent), transparent 70%),
    #0e0e10;
}
.hb-kc1-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hb-kc1-name { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: -.01em; }
.hb-kc1-badge {
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-kc1-accent) 22%, transparent);
  color: color-mix(in srgb, var(--hb-kc1-accent) 50%, #fff);
  font-size: 11.5px;
  font-weight: 600;
  line-height: 24px;
  white-space: nowrap;
}
.hb-kc1-desc { margin: 8px 0 0; min-height: 2.9em; color: #8f8f8f; font-size: 14px; line-height: 1.45; }
.hb-kc1-price { display: flex; align-items: flex-end; gap: 6px; margin-top: 22px; }
.hb-kc1-amount {
  display: inline-flex;
  align-items: flex-start;
  font-size: 52px;
  font-weight: 650;
  letter-spacing: -.04em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.hb-kc1-cur { margin: .1em .04em 0 0; color: #a1a1a1; font-size: .46em; font-weight: 550; letter-spacing: 0; }
.hb-kc1-odo { display: inline-flex; }
.hb-kc1-slot {
  display: inline-block;
  height: 1.1em;
  max-width: 1em;
  overflow: hidden;
  transition: max-width .5s cubic-bezier(.65, 0, .2, 1);
}
.hb-kc1-slot[data-empty="true"] { max-width: 0; }
.hb-kc1-reel {
  display: flex;
  flex-direction: column;
  transition: transform .9s cubic-bezier(.3, 1.35, .45, 1);
  transition-delay: var(--hb-kc1-d, 0ms);
}
.hb-kc1-reel span { display: block; height: 1.1em; line-height: 1.1em; text-align: center; }
.hb-kc1-per { padding-bottom: 8px; color: #8f8f8f; font-size: 14px; }
.hb-kc1-bill { margin: 8px 0 0; min-height: 1.4em; color: #6f6f6f; font-size: 13px; }
.hb-kc1-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 42px;
  margin-top: 22px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: #ededed;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color .25s ease, border-color .25s ease, transform .25s cubic-bezier(.2, .8, .2, 1);
}
.hb-kc1-cta:hover { border-color: rgba(255, 255, 255, .28); background: rgba(255, 255, 255, .07); }
.hb-kc1-cta:active { transform: scale(.98); }
.hb-kc1-cta:focus-visible { outline: 2px solid var(--hb-kc1-accent); outline-offset: 3px; }
.hb-kc1-cta svg { width: 14px; height: 14px; transition: transform .25s ease; }
.hb-kc1-cta:hover svg { transform: translateX(3px); }
.hb-kc1-tier[data-featured="true"] .hb-kc1-cta {
  border-color: transparent;
  background: #fff;
  color: #0a0a0a;
  box-shadow: 0 10px 30px -12px color-mix(in srgb, var(--hb-kc1-accent) 90%, transparent);
}
.hb-kc1-tier[data-featured="true"] .hb-kc1-cta:hover { background: #f0f0f0; }
.hb-kc1-list { display: grid; gap: 11px; margin: 24px 0 0; padding: 22px 0 0; border-top: 1px dashed rgba(255, 255, 255, .1); list-style: none; }
.hb-kc1-list li { display: flex; align-items: flex-start; gap: 10px; color: #c9c9c9; font-size: 14px; line-height: 1.4; }
.hb-kc1-list svg { flex: none; width: 16px; height: 16px; margin-top: 1px; color: color-mix(in srgb, var(--hb-kc1-accent) 65%, #fff); }
.hb-kc1-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px 22px;
  margin: 32px 0 0;
  color: #6f6f6f;
  font-size: 13px;
  text-align: center;
}
.hb-kc1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-kc1-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
@container (min-width: 760px) {
  .hb-kc1-inner { padding: 104px 32px 88px; }
  .hb-kc1-head { flex-direction: row; align-items: flex-end; justify-content: space-between; }
  .hb-kc1-controls { flex-direction: column; align-items: flex-end; gap: 10px; }
  .hb-kc1-panel { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 64px; }
  .hb-kc1-tier { padding: 34px 30px; }
  .hb-kc1-tier + .hb-kc1-tier { border-top: 0; border-left: 1px solid rgba(255, 255, 255, .08); }
  .hb-kc1-tier[data-featured="true"] { margin: -16px 0; padding: 1px; border-left: 0; }
  .hb-kc1-tier[data-featured="true"] + .hb-kc1-tier { border-left: 0; }
  .hb-kc1-tier[data-featured="true"] .hb-kc1-body { padding: 49px 29px 33px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kc1-tier[data-featured="true"]::before { animation: none; }
  .hb-kc1-pill, .hb-kc1-reel, .hb-kc1-slot, .hb-kc1-save, .hb-kc1-cta, .hb-kc1-cta svg { transition: none; }
}
`;

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Odometer({ value, width }: { value: number; width: number }) {
  const chars = String(Math.max(0, Math.round(value))).padStart(width, " ").split("");
  return (
    <span className="hb-kc1-odo" aria-hidden="true">
      {chars.map((c, i) => {
        const digit = c === " " ? 0 : Number(c);
        return (
          <span key={i} className="hb-kc1-slot" data-empty={c === " " ? "true" : "false"}>
            <span
              className="hb-kc1-reel"
              style={{ transform: `translateY(${(-digit * 10).toFixed(2)}%)`, "--hb-kc1-d": `${i * 70}ms` } as React.CSSProperties}
            >
              {"0123456789".split("").map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function PricingSwitch({
  eyebrow = "Pricing",
  title = "Pay for what you ship, not for seats",
  subtitle = "Every plan includes global edge hosting, automatic HTTPS and instant rollbacks. Switch or cancel any time.",
  tiers = defaultTiers,
  currency = "$",
  period,
  defaultPeriod = "yearly",
  onPeriodChange,
  saveLabel = "Save 20%",
  footnote = "Prices in USD, billed per workspace. Taxes calculated at checkout.",
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: PricingSwitchProps) {
  const [inner, setInner] = React.useState<PricingSwitchPeriod>(defaultPeriod);
  const current = period ?? inner;
  const monthlyRef = React.useRef<HTMLButtonElement>(null);
  const yearlyRef = React.useRef<HTMLButtonElement>(null);

  const choose = (next: PricingSwitchPeriod) => {
    if (next === current) return;
    if (period === undefined) setInner(next);
    onPeriodChange?.(next);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const next = current === "monthly" ? "yearly" : "monthly";
    choose(next);
    (next === "monthly" ? monthlyRef : yearlyRef).current?.focus();
  };

  const vars = { "--hb-kc1-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kc1 ${className}`} style={vars} {...rest}>
      <style href="hb-pricing-switch" precedence="default">{css}</style>
      <div className="hb-kc1-inner">
        <div className="hb-kc1-head">
          <div>
            {eyebrow ? <p className="hb-kc1-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-kc1-title">{title}</h2>
            {subtitle ? <p className="hb-kc1-sub">{subtitle}</p> : null}
          </div>
          <div className="hb-kc1-controls">
            <div className="hb-kc1-switch" role="radiogroup" aria-label="Billing period" data-period={current} onKeyDown={onKey}>
              <span className="hb-kc1-pill" aria-hidden="true" />
              <button
                ref={monthlyRef}
                type="button"
                role="radio"
                className="hb-kc1-opt"
                aria-checked={current === "monthly"}
                tabIndex={current === "monthly" ? 0 : -1}
                onClick={() => choose("monthly")}
              >
                Monthly
              </button>
              <button
                ref={yearlyRef}
                type="button"
                role="radio"
                className="hb-kc1-opt"
                aria-checked={current === "yearly"}
                tabIndex={current === "yearly" ? 0 : -1}
                onClick={() => choose("yearly")}
              >
                Yearly
              </button>
            </div>
            {saveLabel ? (
              <span className="hb-kc1-save" data-on={current === "yearly" ? "true" : "false"}>
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M6 1l1.4 3.1L10.8 4.5 8.3 6.8 9 10.2 6 8.5 3 10.2l.7-3.4L1.2 4.5l3.4-.4z" fill="currentColor" />
                </svg>
                {saveLabel} with yearly
              </span>
            ) : null}
          </div>
        </div>
        <ul className="hb-kc1-panel">
          {tiers.map((tier) => {
            const price = current === "yearly" ? tier.yearly : tier.monthly;
            const width = Math.max(String(tier.monthly).length, String(tier.yearly).length);
            const bill =
              price === 0
                ? "Free forever, no card needed"
                : current === "yearly"
                  ? `Billed ${currency}${tier.yearly * 12} once a year`
                  : "Billed monthly, cancel any time";
            return (
              <li key={tier.name} className="hb-kc1-tier" data-featured={tier.featured ? "true" : "false"}>
                <div className="hb-kc1-body">
                  <div className="hb-kc1-row">
                    <h3 className="hb-kc1-name">{tier.name}</h3>
                    {tier.badge ? <span className="hb-kc1-badge">{tier.badge}</span> : null}
                  </div>
                  <p className="hb-kc1-desc">{tier.description}</p>
                  <div className="hb-kc1-price">
                    <span className="hb-kc1-amount">
                      <span className="hb-kc1-cur">{currency}</span>
                      <Odometer value={price} width={width} />
                    </span>
                    <span className="hb-kc1-per">/ month</span>
                    <span className="hb-kc1-sr" aria-live="polite">
                      {`${currency}${price} per month`}
                    </span>
                  </div>
                  <p className="hb-kc1-bill">{bill}</p>
                  <a className="hb-kc1-cta" href={tier.cta.href}>
                    {tier.cta.label}
                    <Arrow />
                  </a>
                  <ul className="hb-kc1-list">
                    {tier.features.map((f) => (
                      <li key={f}>
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
        {footnote ? <p className="hb-kc1-foot">{footnote}</p> : null}
      </div>
    </section>
  );
}
