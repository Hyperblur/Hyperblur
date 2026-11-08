"use client";

import * as React from "react";

export interface PricingSpotlightTier {
  name: string;
  description: string;
  price: number | null;
  priceNote: string;
  features: string[];
  cta: { label: string; href: string };
  recommended?: boolean;
}

export interface PricingSpotlightGridProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tiers?: PricingSpotlightTier[];
  currency?: string;
  locale?: string;
  customLabel?: string;
  recommendedLabel?: string;
  radius?: number;
  restPosition?: { x: number; y: number } | null;
  accent?: string;
}

const defaultTiers: PricingSpotlightTier[] = [
  {
    name: "Basic",
    description: "Everything one designer needs to run client reviews.",
    price: 12,
    priceNote: "per editor / month",
    features: ["5 active projects", "Unlimited reviewers", "Version history, 30 days", "Figma and Slack import"],
    cta: { label: "Get Basic", href: "#" },
  },
  {
    name: "Team",
    description: "Shared libraries and approvals for growing studios.",
    price: 28,
    priceNote: "per editor / month",
    features: ["Unlimited projects", "Approval workflows", "Version history, forever", "Custom domains for share links", "Priority support"],
    cta: { label: "Start free trial", href: "#" },
    recommended: true,
  },
  {
    name: "Enterprise",
    description: "Security reviews, SSO and a contract that fits.",
    price: null,
    priceNote: "annual agreement",
    features: ["Everything in Team", "SAML SSO and SCIM", "Data residency in EU or US", "Audit log export", "Named account team"],
    cta: { label: "Book a demo", href: "#" },
  },
];

const defaultRest = { x: 0.5, y: 0.12 };

const css = `
.hb-vh3 {
  --hb-vh3-accent: #7fb3ff;
  --hb-vh3-r: 280px;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #070708;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vh3 *, .hb-vh3 *::before, .hb-vh3 *::after { box-sizing: border-box; }
.hb-vh3-inner { max-width: 1080px; margin: 0 auto; padding: 72px 20px; }
.hb-vh3-head { display: grid; gap: 12px; justify-items: center; text-align: center; }
.hb-vh3-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: #a1a1a1;
  font-size: 12.5px;
  font-weight: 500;
}
.hb-vh3-eyebrow i { width: 6px; height: 6px; border-radius: 999px; background: var(--hb-vh3-accent); box-shadow: 0 0 10px var(--hb-vh3-accent); font-style: normal; }
.hb-vh3-title { margin: 6px 0 0; max-width: 640px; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(30px, 5cqi, 50px); font-weight: 600; line-height: 1.04; letter-spacing: -.035em; text-wrap: balance; }
.hb-vh3-sub { margin: 0; max-width: 520px; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; }
.hb-vh3-field { position: relative; margin-top: 44px; }
.hb-vh3-field::before {
  content: "";
  position: absolute;
  inset: -40px;
  background-image: radial-gradient(rgba(255, 255, 255, .16) 1px, transparent 1.5px);
  background-size: 18px 18px;
  -webkit-mask-image: radial-gradient(var(--hb-vh3-r) circle at var(--gx, -999px) var(--gy, -999px), #000, transparent 70%);
  mask-image: radial-gradient(var(--hb-vh3-r) circle at var(--gx, -999px) var(--gy, -999px), #000, transparent 70%);
  pointer-events: none;
  transition: opacity .4s ease;
  opacity: var(--go, 0);
}
.hb-vh3-grid { position: relative; display: grid; grid-template-columns: 1fr; gap: 12px; margin: 0; padding: 0; list-style: none; }
@container (min-width: 760px) { .hb-vh3-grid { grid-template-columns: repeat(3, 1fr); } }
.hb-vh3-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px 24px 24px;
  border-radius: 18px;
  background: rgba(255, 255, 255, .06);
  isolation: isolate;
}
.hb-vh3-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(var(--hb-vh3-r) circle at var(--x, -999px) var(--y, -999px), var(--hb-vh3-accent), rgba(255, 255, 255, .08) 45%, rgba(255, 255, 255, .06));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
.hb-vh3-card::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: -2;
  border-radius: 17px;
  background:
    radial-gradient(calc(var(--hb-vh3-r) * .9) circle at var(--x, -999px) var(--y, -999px), color-mix(in srgb, var(--hb-vh3-accent) 10%, transparent), transparent 70%),
    linear-gradient(180deg, #111113, #0b0b0d);
}
.hb-vh3-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hb-vh3-name { margin: 0; font-size: 15px; font-weight: 600; }
.hb-vh3-rec {
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-vh3-accent) 16%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-vh3-accent) 40%, transparent);
  color: color-mix(in srgb, var(--hb-vh3-accent) 40%, #fff);
  font-size: 11.5px;
  font-weight: 600;
  line-height: 24px;
  white-space: nowrap;
}
.hb-vh3-desc { margin: 8px 0 0; min-height: 40px; color: #8f8f8f; font-size: 13.5px; line-height: 1.5; }
.hb-vh3-price { display: flex; align-items: baseline; gap: 8px; margin-top: 22px; }
.hb-vh3-price strong { font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 44px; font-weight: 600; letter-spacing: -.04em; line-height: 1; font-variant-numeric: tabular-nums; }
.hb-vh3-price span { color: #8f8f8f; font-size: 13px; }
.hb-vh3-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 42px;
  margin-top: 22px;
  border-radius: 11px;
  border: 1px solid rgba(255, 255, 255, .12);
  background: rgba(255, 255, 255, .04);
  color: #ededed;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color .2s ease, border-color .2s ease, transform .15s ease;
}
.hb-vh3-cta svg { width: 14px; height: 14px; transition: transform .3s cubic-bezier(.34, 1.56, .64, 1); }
.hb-vh3-cta:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .22); }
.hb-vh3-cta:hover svg { transform: translateX(3px); }
.hb-vh3-cta:active { transform: scale(.98); }
.hb-vh3-cta:focus-visible { outline: 2px solid var(--hb-vh3-accent); outline-offset: 2px; }
.hb-vh3-card[data-rec="true"] .hb-vh3-cta { border-color: transparent; background: #ededed; color: #0a0a0a; }
.hb-vh3-card[data-rec="true"] .hb-vh3-cta:hover { background: #fff; }
.hb-vh3-list { display: grid; gap: 11px; margin: 24px 0 0; padding: 0; list-style: none; }
.hb-vh3-list li { display: flex; align-items: flex-start; gap: 10px; color: #b3b3b3; font-size: 13.5px; line-height: 1.4; }
.hb-vh3-list svg { flex: none; width: 16px; height: 16px; margin-top: 1px; color: #6f6f6f; transition: color .3s ease; }
.hb-vh3-card:hover .hb-vh3-list svg { color: var(--hb-vh3-accent); }
@media (hover: none) { .hb-vh3-card::before { background: rgba(255, 255, 255, .1); } .hb-vh3-card[data-rec="true"]::before { background: var(--hb-vh3-accent); } }
@media (prefers-reduced-motion: reduce) {
  .hb-vh3 *, .hb-vh3 *::before, .hb-vh3 *::after { transition: none !important; }
}
`;

export function PricingSpotlightGrid({
  eyebrow = "Plans for every studio",
  title = "Pricing that grows with your client list",
  subtitle = "Move across the plans. Every tier includes unlimited reviewers, so clients never need a seat.",
  tiers = defaultTiers,
  currency = "USD",
  locale = "en-US",
  customLabel = "Custom",
  recommendedLabel = "Most teams pick this",
  radius = 280,
  restPosition = defaultRest,
  accent = "#7fb3ff",
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: PricingSpotlightGridProps) {
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const money = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }),
    [locale, currency],
  );

  const paint = React.useCallback((clientX: number, clientY: number, on: boolean) => {
    const field = fieldRef.current;
    if (!field) return;
    const fr = field.getBoundingClientRect();
    const k = field.offsetWidth ? fr.width / field.offsetWidth : 1;
    field.style.setProperty("--gx", `${((clientX - fr.left) / k + 40).toFixed(1)}px`);
    field.style.setProperty("--gy", `${((clientY - fr.top) / k + 40).toFixed(1)}px`);
    field.style.setProperty("--go", on ? "1" : "0");
    field.querySelectorAll<HTMLElement>("[data-spot]").forEach((card) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${((clientX - r.left) / k).toFixed(1)}px`);
      card.style.setProperty("--y", `${((clientY - r.top) / k).toFixed(1)}px`);
    });
  }, []);

  const settle = React.useCallback(() => {
    const field = fieldRef.current;
    if (!field) return;
    if (!restPosition) {
      field.style.setProperty("--go", "0");
      field.querySelectorAll<HTMLElement>("[data-spot]").forEach((card) => {
        card.style.removeProperty("--x");
        card.style.removeProperty("--y");
      });
      return;
    }
    const fr = field.getBoundingClientRect();
    paint(fr.left + fr.width * restPosition.x, fr.top + fr.height * restPosition.y, false);
  }, [paint, restPosition]);

  React.useEffect(() => {
    settle();
  }, [settle]);

  const move = (e: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(e);
    paint(e.clientX, e.clientY, true);
  };

  const leave = (e: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(e);
    settle();
  };

  return (
    <section
      className={`hb-vh3 ${className}`}
      style={{ "--hb-vh3-accent": accent, "--hb-vh3-r": `${radius}px`, ...style } as React.CSSProperties}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      <style href="hb-pricing-spotlight-grid" precedence="default">{css}</style>
      <div className="hb-vh3-inner">
        <div className="hb-vh3-head">
          {eyebrow ? <span className="hb-vh3-eyebrow"><i aria-hidden="true" />{eyebrow}</span> : null}
          <h2 className="hb-vh3-title">{title}</h2>
          {subtitle ? <p className="hb-vh3-sub">{subtitle}</p> : null}
        </div>
        <div ref={fieldRef} className="hb-vh3-field">
          <ul className="hb-vh3-grid">
            {tiers.map((t) => (
              <li key={t.name} className="hb-vh3-card" data-spot="" data-rec={t.recommended ? "true" : undefined}>
                <div className="hb-vh3-top">
                  <h3 className="hb-vh3-name">{t.name}</h3>
                  {t.recommended && recommendedLabel ? <span className="hb-vh3-rec">{recommendedLabel}</span> : null}
                </div>
                <p className="hb-vh3-desc">{t.description}</p>
                <div className="hb-vh3-price">
                  <strong>{t.price === null ? customLabel : money.format(t.price)}</strong>
                  <span>{t.priceNote}</span>
                </div>
                <a className="hb-vh3-cta" href={t.cta.href}>
                  {t.cta.label}
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <ul className="hb-vh3-list">
                  {t.features.map((f) => (
                    <li key={f}>
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M5.4 8.2l1.8 1.8 3.5-3.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
