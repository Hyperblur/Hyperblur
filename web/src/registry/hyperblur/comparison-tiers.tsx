"use client";

import * as React from "react";

export type ComparisonTiersValue = boolean | string;

export interface ComparisonTiersTier {
  name: string;
  price: string;
  period?: string;
  blurb: string;
  values: ComparisonTiersValue[];
  cta: { label: string; href: string };
  badge?: string;
}

export interface ComparisonTiersProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  rows?: string[];
  tiers?: ComparisonTiersTier[];
  highlight?: number;
  onTierSelect?: (index: number, tier: ComparisonTiersTier) => void;
  accent?: string;
}

const css = `
.hb-yh1 {
  --hb-yh1-accent: #8b5cf6;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  overflow: hidden;
  padding: clamp(64px, 9cqi, 112px) 20px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yh1 *, .hb-yh1 *::before, .hb-yh1 *::after { box-sizing: border-box; }
.hb-yh1::before {
  content: "";
  position: absolute;
  inset: -20% -10% auto;
  height: 70%;
  background: radial-gradient(50% 60% at 50% 0%, color-mix(in srgb, var(--hb-yh1-accent) 22%, transparent), transparent 70%);
  pointer-events: none;
}
.hb-yh1-in { position: relative; max-width: 1120px; margin: 0 auto; }
.hb-yh1-head { max-width: 640px; margin: 0 auto 48px; text-align: center; }
.hb-yh1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 12px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 999px;
  background: rgba(255,255,255,.03);
  color: #a1a1a1;
  font-size: 12.5px;
  font-weight: 500;
}
.hb-yh1-eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-yh1-accent); box-shadow: 0 0 10px var(--hb-yh1-accent); }
.hb-yh1-title { margin: 18px 0 0; font-size: clamp(30px, 4.6cqi, 48px); font-weight: 650; letter-spacing: -.035em; line-height: 1.06; }
.hb-yh1-sub { margin: 14px auto 0; max-width: 520px; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-yh1-grid { display: grid; grid-template-columns: repeat(var(--hb-yh1-n, 3), minmax(0, 1fr)); gap: 16px; align-items: stretch; }
.hb-yh1-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 26px 24px 24px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 20px;
  background: linear-gradient(180deg, #131313, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
  opacity: 0;
  transform: translateY(18px);
  animation: hb-yh1-rise .7s cubic-bezier(.2,.8,.2,1) forwards;
  animation-delay: calc(var(--hb-yh1-i) * 110ms);
}
.hb-yh1-card[data-pick="true"] {
  border-color: transparent;
  background: linear-gradient(180deg, #17151f, #0f0e14) padding-box, conic-gradient(from var(--hb-yh1-a, 0deg), transparent 0deg, var(--hb-yh1-accent) 60deg, transparent 140deg, transparent 220deg, color-mix(in srgb, var(--hb-yh1-accent) 60%, #fff) 290deg, transparent 360deg) border-box;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 30px 80px -30px color-mix(in srgb, var(--hb-yh1-accent) 55%, transparent);
  animation: hb-yh1-rise .7s cubic-bezier(.2,.8,.2,1) forwards, hb-yh1-spin 6s linear infinite;
  animation-delay: calc(var(--hb-yh1-i) * 110ms), 0s;
}
@property --hb-yh1-a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.hb-yh1-badge {
  position: absolute;
  top: -11px;
  left: 24px;
  height: 22px;
  padding: 0 10px;
  border-radius: 999px;
  background: var(--hb-yh1-accent);
  color: #fff;
  font-size: 11.5px;
  font-weight: 650;
  line-height: 22px;
  letter-spacing: .01em;
  box-shadow: 0 6px 20px -4px color-mix(in srgb, var(--hb-yh1-accent) 70%, transparent);
}
.hb-yh1-name { margin: 0; color: #d4d4d4; font-size: 15px; font-weight: 600; }
.hb-yh1-price { display: flex; align-items: baseline; gap: 6px; margin-top: 14px; }
.hb-yh1-amt { font-size: 40px; font-weight: 650; letter-spacing: -.04em; line-height: 1; }
.hb-yh1-per { color: #8f8f8f; font-size: 13.5px; }
.hb-yh1-blurb { margin: 12px 0 0; min-height: 42px; color: #8f8f8f; font-size: 13.5px; line-height: 1.55; }
.hb-yh1-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  margin-top: 20px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 999px;
  background: rgba(255,255,255,.04);
  color: #ededed;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color .2s ease, border-color .2s ease, transform .15s ease;
}
.hb-yh1-cta:hover { background: rgba(255,255,255,.09); border-color: rgba(255,255,255,.2); }
.hb-yh1-cta:active { transform: scale(.98); }
.hb-yh1-card[data-pick="true"] .hb-yh1-cta { border-color: transparent; background: #ededed; color: #0a0a0a; }
.hb-yh1-card[data-pick="true"] .hb-yh1-cta:hover { background: #fff; }
.hb-yh1-list { margin: 22px 0 0; padding: 18px 0 0; border-top: 1px solid rgba(255,255,255,.07); list-style: none; }
.hb-yh1-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 34px;
  margin: 0 -10px;
  padding: 0 10px;
  border-radius: 9px;
  color: #c9c9c9;
  font-size: 13.5px;
  transition: background-color .2s ease, color .2s ease;
}
.hb-yh1-row[data-off="true"] { color: #5f5f5f; }
.hb-yh1-row[data-hot="true"] { background: rgba(255,255,255,.05); color: #fff; }
.hb-yh1-row[data-off="true"][data-hot="true"] { color: #8f8f8f; }
.hb-yh1-ic { display: grid; place-items: center; flex: none; width: 18px; height: 18px; border-radius: 50%; background: rgba(255,255,255,.06); }
.hb-yh1-ic svg { width: 11px; height: 11px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.hb-yh1-ic[data-on="true"] { background: color-mix(in srgb, var(--hb-yh1-accent) 18%, transparent); color: color-mix(in srgb, var(--hb-yh1-accent) 70%, #fff); }
.hb-yh1-ic[data-on="true"] path { stroke-dasharray: 16; stroke-dashoffset: 16; animation: hb-yh1-draw .5s ease forwards; animation-delay: calc(400ms + var(--hb-yh1-i) * 110ms + var(--hb-yh1-r) * 60ms); }
.hb-yh1-lbl { flex: 1; min-width: 0; }
.hb-yh1-val { flex: none; color: #ededed; font-size: 12.5px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-yh1-card[data-pick="true"] .hb-yh1-val { color: color-mix(in srgb, var(--hb-yh1-accent) 60%, #fff); }
.hb-yh1-foot { margin-top: 28px; color: #6f6f6f; font-size: 13px; text-align: center; }
.hb-yh1-foot a { color: #a1a1a1; text-underline-offset: 3px; }
.hb-yh1 a:focus-visible { outline: 2px solid var(--hb-yh1-accent); outline-offset: 3px; }
@keyframes hb-yh1-rise { to { opacity: 1; transform: none; } }
@keyframes hb-yh1-spin { to { --hb-yh1-a: 360deg; } }
@keyframes hb-yh1-draw { to { stroke-dashoffset: 0; } }
@container (max-width: 760px) {
  .hb-yh1-grid { grid-template-columns: minmax(0, 1fr); max-width: 440px; margin: 0 auto; gap: 22px; }
  .hb-yh1-blurb { min-height: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yh1 *, .hb-yh1 *::before, .hb-yh1 *::after { animation: none !important; transition: none !important; }
  .hb-yh1-card { opacity: 1; transform: none; }
  .hb-yh1-ic[data-on="true"] path { stroke-dashoffset: 0; }
}
`;

const defaultRows = [
  "Projects",
  "Editors per project",
  "Version history",
  "Custom domains",
  "Branch previews",
  "Audit log",
  "SSO and SCIM",
];

const defaultTiers: ComparisonTiersTier[] = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    blurb: "For side projects and trying things out with one collaborator.",
    values: ["3", "2", "7 days", false, false, false, false],
    cta: { label: "Start for free", href: "#" },
  },
  {
    name: "Studio",
    price: "$24",
    period: "per editor / mo",
    blurb: "For product teams shipping every week across several sites.",
    values: ["Unlimited", "10", "1 year", true, true, false, false],
    cta: { label: "Try Studio for 14 days", href: "#" },
    badge: "Most teams pick this",
  },
  {
    name: "Scale",
    price: "$59",
    period: "per editor / mo",
    blurb: "For companies that need controls, compliance and a named contact.",
    values: ["Unlimited", "Unlimited", "Forever", true, true, true, true],
    cta: { label: "Talk to sales", href: "#" },
  },
];

function Check() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 6.3 5 8.6l4.5-5" />
    </svg>
  );
}

function Dash() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3.5 6h5" />
    </svg>
  );
}

export function ComparisonTiers({
  eyebrow = "Compare plans",
  title = "Pick the plan that fits how you ship",
  subtitle = "Every plan includes unlimited viewers, global CDN hosting and SSL. Upgrade or downgrade any time.",
  rows = defaultRows,
  tiers = defaultTiers,
  highlight = 1,
  onTierSelect,
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: ComparisonTiersProps) {
  const [hot, setHot] = React.useState<number | null>(null);

  return (
    <section
      className={`hb-yh1 ${className}`}
      style={{ "--hb-yh1-accent": accent, "--hb-yh1-n": tiers.length, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-comparison-tiers" precedence="default">
        {css}
      </style>
      <div className="hb-yh1-in">
        <header className="hb-yh1-head">
          {eyebrow && (
            <span className="hb-yh1-eyebrow">
              <i aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h2 className="hb-yh1-title">{title}</h2>
          {subtitle && <p className="hb-yh1-sub">{subtitle}</p>}
        </header>
        <div className="hb-yh1-grid">
          {tiers.map((tier, i) => {
            const pick = i === highlight;
            return (
              <article
                key={tier.name}
                className="hb-yh1-card"
                data-pick={pick ? "true" : "false"}
                style={{ "--hb-yh1-i": i } as React.CSSProperties}
                aria-label={pick && tier.badge ? `${tier.name}, ${tier.badge}` : tier.name}
              >
                {pick && tier.badge && <span className="hb-yh1-badge">{tier.badge}</span>}
                <h3 className="hb-yh1-name">{tier.name}</h3>
                <div className="hb-yh1-price">
                  <span className="hb-yh1-amt">{tier.price}</span>
                  {tier.period && <span className="hb-yh1-per">{tier.period}</span>}
                </div>
                <p className="hb-yh1-blurb">{tier.blurb}</p>
                <a href={tier.cta.href} className="hb-yh1-cta" onClick={() => onTierSelect?.(i, tier)}>
                  {tier.cta.label}
                </a>
                <ul className="hb-yh1-list">
                  {rows.map((row, r) => {
                    const v = tier.values[r];
                    const on = v !== false && v !== undefined;
                    return (
                      <li
                        key={row}
                        className="hb-yh1-row"
                        data-off={on ? "false" : "true"}
                        data-hot={hot === r ? "true" : "false"}
                        onPointerEnter={() => setHot(r)}
                        onPointerLeave={() => setHot(null)}
                        style={{ "--hb-yh1-r": r } as React.CSSProperties}
                      >
                        <span className="hb-yh1-ic" data-on={on ? "true" : "false"}>
                          {on ? <Check /> : <Dash />}
                        </span>
                        <span className="hb-yh1-lbl">{row}</span>
                        {typeof v === "string" ? (
                          <span className="hb-yh1-val">{v}</span>
                        ) : (
                          <span className="hb-yh1-sr" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>
                            {on ? "Included" : "Not included"}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>
        <p className="hb-yh1-foot">
          Prices in USD, billed annually. Need more than 50 editors? <a href="#">Get a custom quote</a>
        </p>
      </div>
    </section>
  );
}
