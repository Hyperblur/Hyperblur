"use client";

import * as React from "react";

export interface CreditPack {
  name: string;
  credits: number;
  price: number;
  bestValue?: boolean;
}

export interface PricingCreditsFaq {
  question: string;
  answer: string;
}

export interface PricingCreditsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  packs?: CreditPack[];
  currency?: string;
  usageLabel?: string;
  creditsPerUse?: number;
  value?: number;
  defaultValue?: number;
  onPackChange?: (index: number, pack: CreditPack) => void;
  onPurchase?: (pack: CreditPack) => void;
  buyLabel?: string;
  bestValueLabel?: string;
  faqs?: PricingCreditsFaq[];
  accent?: string;
}

const defaultPacks: CreditPack[] = [
  { name: "Starter", credits: 500, price: 10 },
  { name: "Creator", credits: 2000, price: 36 },
  { name: "Studio", credits: 6000, price: 90, bestValue: true },
  { name: "Agency", credits: 20000, price: 260 },
];

const defaultFaqs: PricingCreditsFaq[] = [
  { question: "Do credits expire?", answer: "Never. Use them this week or next year." },
  { question: "Can my team share them?", answer: "Yes, one balance for the whole workspace." },
  { question: "What if I run out?", answer: "Top up any time, renders never stop mid-job." },
];

const css = `
.hb-kc4 {
  --hb-kc4-accent: #f5a524;
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
.hb-kc4 *, .hb-kc4 *::before, .hb-kc4 *::after { box-sizing: border-box; }
.hb-kc4::before {
  content: "";
  position: absolute;
  inset: auto -10% -40% -10%;
  z-index: -1;
  height: 70%;
  background: radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--hb-kc4-accent) 14%, transparent), transparent 70%);
  pointer-events: none;
}
.hb-kc4-inner { max-width: 1120px; margin: 0 auto; padding: 72px 18px 64px; }
.hb-kc4-head { display: grid; gap: 14px; max-width: 680px; }
.hb-kc4-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #a1a1a1;
  font-size: 13px;
  font-weight: 550;
}
.hb-kc4-coin {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--hb-kc4-accent) 40%, #fff), var(--hb-kc4-accent) 60%, color-mix(in srgb, var(--hb-kc4-accent) 60%, #000));
  box-shadow: 0 0 14px color-mix(in srgb, var(--hb-kc4-accent) 60%, transparent);
  color: #2a1a00;
  font-size: 11px;
  font-weight: 800;
}
.hb-kc4-title { margin: 0; font-size: clamp(30px, 5cqi, 48px); font-weight: 650; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-kc4-sub { margin: 0; max-width: 520px; color: #8f8f8f; font-size: 16px; line-height: 1.6; text-wrap: pretty; }
.hb-kc4-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  margin-top: 40px;
  perspective: 900px;
}
.hb-kc4-card {
  --hb-kc4-rx: 0deg;
  --hb-kc4-ry: 0deg;
  --hb-kc4-gx: 50%;
  --hb-kc4-gy: 0%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0;
  margin: 0;
  padding: 22px 20px 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background: linear-gradient(180deg, #151515, #0f0f0f);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transform: rotateX(var(--hb-kc4-rx)) rotateY(var(--hb-kc4-ry));
  transform-style: preserve-3d;
  transition: transform .5s cubic-bezier(.2, .8, .2, 1), border-color .3s ease, box-shadow .3s ease;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
}
.hb-kc4-card[data-tilting="true"] { transition: transform .08s linear, border-color .3s ease, box-shadow .3s ease; }
.hb-kc4-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(260px circle at var(--hb-kc4-gx) var(--hb-kc4-gy), rgba(255, 255, 255, .09), transparent 60%);
  opacity: 0;
  transition: opacity .3s ease;
  pointer-events: none;
}
.hb-kc4-card:hover::after { opacity: 1; }
.hb-kc4-card:hover { border-color: rgba(255, 255, 255, .16); }
.hb-kc4-card:focus-visible { outline: 2px solid var(--hb-kc4-accent); outline-offset: 3px; }
.hb-kc4-card[aria-checked="true"] {
  border-color: color-mix(in srgb, var(--hb-kc4-accent) 70%, transparent);
  background:
    radial-gradient(120% 70% at 50% 0%, color-mix(in srgb, var(--hb-kc4-accent) 16%, transparent), transparent 70%),
    linear-gradient(180deg, #171511, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 24px 60px -30px color-mix(in srgb, var(--hb-kc4-accent) 70%, transparent);
}
.hb-kc4-ribbon {
  position: absolute;
  top: 18px;
  right: -38px;
  width: 150px;
  padding: 5px 0;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-kc4-accent) 80%, #fff), var(--hb-kc4-accent));
  color: #241600;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .08em;
  text-align: center;
  text-transform: uppercase;
  transform: rotate(45deg);
  box-shadow: 0 4px 14px -4px color-mix(in srgb, var(--hb-kc4-accent) 80%, transparent);
}
.hb-kc4-name { display: flex; align-items: center; gap: 8px; color: #a1a1a1; font-size: 13px; font-weight: 600; }
.hb-kc4-radio {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border: 1.5px solid rgba(255, 255, 255, .25);
  border-radius: 50%;
  transition: border-color .2s ease;
}
.hb-kc4-radio::after {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--hb-kc4-accent);
  transform: scale(0);
  transition: transform .3s cubic-bezier(.3, 1.6, .5, 1);
}
.hb-kc4-card[aria-checked="true"] .hb-kc4-radio { border-color: var(--hb-kc4-accent); }
.hb-kc4-card[aria-checked="true"] .hb-kc4-radio::after { transform: scale(1); }
.hb-kc4-credits { display: flex; align-items: baseline; gap: 8px; margin-top: 18px; transform: translateZ(30px); }
.hb-kc4-credits strong { font-size: clamp(34px, 4.4cqi, 42px); font-weight: 650; line-height: 1; letter-spacing: -.04em; font-variant-numeric: tabular-nums; }
.hb-kc4-credits span { color: #8f8f8f; font-size: 13px; }
.hb-kc4-use { margin: 8px 0 0; color: #6f6f6f; font-size: 12.5px; }
.hb-kc4-foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; margin-top: 22px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, .07); }
.hb-kc4-price { font-size: 22px; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-kc4-unit { display: block; margin-top: 3px; color: #8f8f8f; font-size: 12px; font-weight: 500; letter-spacing: 0; }
.hb-kc4-save {
  padding: 3px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-kc4-accent) 14%, transparent);
  color: color-mix(in srgb, var(--hb-kc4-accent) 70%, #fff);
  font-size: 11.5px;
  font-weight: 650;
  white-space: nowrap;
}
.hb-kc4-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px 20px;
  margin-top: 16px;
  padding: 14px 14px 14px 20px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 18px;
  background: #111;
}
.hb-kc4-sum { margin: 0; color: #a1a1a1; font-size: 14px; line-height: 1.5; }
.hb-kc4-sum b { color: #ededed; font-weight: 650; font-variant-numeric: tabular-nums; }
.hb-kc4-buy {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 22px;
  border: 0;
  border-radius: 12px;
  background: var(--hb-kc4-accent);
  color: #1f1300;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .45), 0 10px 30px -12px var(--hb-kc4-accent);
  transition: transform .2s cubic-bezier(.2, .8, .2, 1), filter .2s ease;
}
.hb-kc4-buy:hover { transform: translateY(-1px); filter: brightness(1.06); }
.hb-kc4-buy:active { transform: scale(.98); }
.hb-kc4-buy:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-kc4-buy svg { width: 15px; height: 15px; }
.hb-kc4-faq { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; margin: 28px 0 0; }
.hb-kc4-faq div { display: grid; grid-template-columns: 16px minmax(0, 1fr); column-gap: 12px; padding: 14px 0; border-top: 1px solid rgba(255, 255, 255, .07); }
.hb-kc4-faq svg { grid-row: span 2; width: 16px; height: 16px; margin-top: 2px; color: color-mix(in srgb, var(--hb-kc4-accent) 70%, #fff); }
.hb-kc4-faq dt { margin: 0; color: #ededed; font-size: 14px; font-weight: 600; }
.hb-kc4-faq dd { margin: 3px 0 0; color: #8f8f8f; font-size: 13.5px; line-height: 1.45; }
@container (min-width: 540px) {
  .hb-kc4-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (min-width: 900px) {
  .hb-kc4-inner { padding: 100px 32px 88px; }
  .hb-kc4-head { grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); align-items: end; gap: 40px; max-width: none; }
  .hb-kc4-eyebrow { grid-column: 1 / -1; }
  .hb-kc4-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-top: 52px; }
  .hb-kc4-faq { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kc4-card, .hb-kc4-card[data-tilting="true"] { transform: none; transition: none; }
  .hb-kc4-card::after, .hb-kc4-radio, .hb-kc4-radio::after, .hb-kc4-buy { transition: none; }
}
`;

function group(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function perCredit(pack: CreditPack, currency: string) {
  const cents = (pack.price / Math.max(1, pack.credits)) * 100;
  return cents < 100 ? `${cents.toFixed(cents < 10 ? 2 : 1).replace(/\.?0+$/, "")}¢` : `${currency}${(cents / 100).toFixed(2)}`;
}

export function PricingCredits({
  eyebrow = "Pay as you go",
  title = "Buy credits once, render whenever you want",
  subtitle = "No subscription. Every export, upscale and render draws from one balance, and bigger packs cost less per credit.",
  packs = defaultPacks,
  currency = "$",
  usageLabel = "4K renders",
  creditsPerUse = 5,
  value,
  defaultValue,
  onPackChange,
  onPurchase,
  buyLabel = "Buy credits",
  bestValueLabel = "Best value",
  faqs = defaultFaqs,
  accent = "#f5a524",
  className = "",
  style,
  ...rest
}: PricingCreditsProps) {
  const fallback = Math.max(0, packs.findIndex((p) => p.bestValue));
  const [inner, setInner] = React.useState(defaultValue ?? fallback);
  const selected = Math.min(Math.max(0, value ?? inner), Math.max(0, packs.length - 1));
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const base = packs[0] ? packs[0].price / Math.max(1, packs[0].credits) : 0;
  const pack = packs[selected];

  const choose = (i: number) => {
    if (value === undefined) setInner(i);
    const p = packs[i];
    if (p) onPackChange?.(i, p);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = -1;
    if (e.key in keys) next = (selected + keys[e.key] + packs.length) % packs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = packs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    choose(next);
    refs.current[next]?.focus();
  };

  const tilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "touch") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.dataset.tilting = "true";
    el.style.setProperty("--hb-kc4-ry", `${((x - 0.5) * 12).toFixed(2)}deg`);
    el.style.setProperty("--hb-kc4-rx", `${((0.5 - y) * 10).toFixed(2)}deg`);
    el.style.setProperty("--hb-kc4-gx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--hb-kc4-gy", `${(y * 100).toFixed(1)}%`);
  };

  const reset = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    el.dataset.tilting = "false";
    el.style.setProperty("--hb-kc4-ry", "0deg");
    el.style.setProperty("--hb-kc4-rx", "0deg");
  };

  const vars = { "--hb-kc4-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kc4 ${className}`} style={vars} {...rest}>
      <style href="hb-pricing-credits" precedence="default">{css}</style>
      <div className="hb-kc4-inner">
        <div className="hb-kc4-head">
          {eyebrow ? (
            <p className="hb-kc4-eyebrow">
              <span className="hb-kc4-coin" aria-hidden="true">c</span>
              {eyebrow}
            </p>
          ) : null}
          <h2 className="hb-kc4-title">{title}</h2>
          {subtitle ? <p className="hb-kc4-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-kc4-grid" role="radiogroup" aria-label="Credit packs" onKeyDown={onKey}>
          {packs.map((p, i) => {
            const rate = p.price / Math.max(1, p.credits);
            const save = base > 0 ? Math.round((1 - rate / base) * 100) : 0;
            return (
              <button
                key={p.name}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={selected === i}
                tabIndex={selected === i ? 0 : -1}
                className="hb-kc4-card"
                onClick={() => choose(i)}
                onPointerMove={tilt}
                onPointerLeave={reset}
              >
                {p.bestValue ? <span className="hb-kc4-ribbon">{bestValueLabel}</span> : null}
                <span className="hb-kc4-name">
                  <span className="hb-kc4-radio" aria-hidden="true" />
                  {p.name}
                </span>
                <span className="hb-kc4-credits">
                  <strong>{group(p.credits)}</strong>
                  <span>credits</span>
                </span>
                <span className="hb-kc4-use">{`About ${group(p.credits / Math.max(1, creditsPerUse))} ${usageLabel}`}</span>
                <span className="hb-kc4-foot">
                  <span className="hb-kc4-price">
                    {`${currency}${group(p.price)}`}
                    <span className="hb-kc4-unit">{`${perCredit(p, currency)} per credit`}</span>
                  </span>
                  {save > 0 ? <span className="hb-kc4-save">{`Save ${save}%`}</span> : null}
                </span>
              </button>
            );
          })}
        </div>
        {pack ? (
          <div className="hb-kc4-bar">
            <p className="hb-kc4-sum" aria-live="polite">
              <b>{`${group(pack.credits)} credits`}</b>
              {` for `}
              <b>{`${currency}${group(pack.price)}`}</b>
              {`, one-time payment. Added to your balance instantly.`}
            </p>
            <button type="button" className="hb-kc4-buy" onClick={() => onPurchase?.(pack)}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 3h2l1.6 7.2a1 1 0 001 .8h5.6a1 1 0 001-.8L14 5.5H4.6M6.5 13.5h.01M11.5 13.5h.01" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {`${buyLabel} for ${currency}${group(pack.price)}`}
            </button>
          </div>
        ) : null}
        {faqs.length ? (
          <dl className="hb-kc4-faq">
            {faqs.map((f) => (
              <div key={f.question}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5.4 8.2l1.8 1.8 3.4-3.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <dt>{f.question}</dt>
                <dd>{f.answer}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
