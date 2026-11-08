"use client";

import * as React from "react";

export interface PricingCreditPack {
  credits: number;
  price: number;
  bonus: number;
  label?: string;
}

export interface PricingCreditUse {
  label: string;
  cost: number;
}

export interface PricingCreditStackProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  packs?: PricingCreditPack[];
  uses?: PricingCreditUse[];
  currency?: string;
  locale?: string;
  selected?: number;
  defaultSelected?: number;
  onSelectedChange?: (index: number, pack: PricingCreditPack) => void;
  onPurchase?: (pack: PricingCreditPack) => void;
  buyLabel?: string;
  accent?: string;
}

const defaultPacks: PricingCreditPack[] = [
  { credits: 1000, price: 10, bonus: 0 },
  { credits: 5000, price: 45, bonus: 0.1 },
  { credits: 15000, price: 120, bonus: 0.2, label: "Popular" },
  { credits: 50000, price: 350, bonus: 0.3 },
];

const defaultUses: PricingCreditUse[] = [
  { label: "image generations", cost: 4 },
  { label: "minutes of voiceover", cost: 25 },
  { label: "HD video clips", cost: 120 },
];

const TILES = 22;

const css = `
.hb-vh8 {
  --hb-vh8-accent: #f5a524;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vh8 *, .hb-vh8 *::before, .hb-vh8 *::after { box-sizing: border-box; }
.hb-vh8-inner { max-width: 1040px; margin: 0 auto; padding: 64px 20px; }
.hb-vh8-head { max-width: 560px; }
.hb-vh8-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 12px; color: color-mix(in srgb, var(--hb-vh8-accent) 70%, #fff); font-size: 13px; font-weight: 600; }
.hb-vh8-eyebrow i { width: 14px; height: 14px; border-radius: 999px; background: radial-gradient(circle at 35% 30%, #fff6, transparent 50%), var(--hb-vh8-accent); box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .25); font-style: normal; }
.hb-vh8-title { margin: 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(28px, 4.4cqi, 44px); font-weight: 600; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-vh8-sub { margin: 12px 0 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-vh8-body { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 36px; }
@container (min-width: 760px) { .hb-vh8-body { grid-template-columns: 260px 1fr; gap: 20px; } }
.hb-vh8-vault {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-height: 300px;
  padding: 24px 20px 20px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, .08);
  background:
    radial-gradient(80% 50% at 50% 100%, color-mix(in srgb, var(--hb-vh8-accent) 18%, transparent), transparent 70%),
    linear-gradient(180deg, #111113, #0c0c0e);
  overflow: hidden;
}
.hb-vh8-stack { display: flex; flex-direction: column-reverse; align-items: center; gap: 3px; width: 120px; }
.hb-vh8-coin {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, #3a3a40, #6b6b74 30%, #4a4a52 70%, #2e2e33);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 1px 0 rgba(0, 0, 0, .6);
  animation: hb-vh8-drop .5s cubic-bezier(.3, 1.4, .5, 1) both;
  animation-delay: calc(var(--i) * 22ms);
}
.hb-vh8-coin:nth-child(odd) { transform: translateX(2px); }
.hb-vh8-coin[data-bonus="true"] {
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-vh8-accent) 55%, #000), var(--hb-vh8-accent) 30%, color-mix(in srgb, var(--hb-vh8-accent) 70%, #fff) 50%, color-mix(in srgb, var(--hb-vh8-accent) 60%, #000));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .5), 0 0 12px -2px var(--hb-vh8-accent);
}
@keyframes hb-vh8-drop { from { opacity: 0; translate: 0 -60px; } to { opacity: 1; translate: 0 0; } }
.hb-vh8-total { margin-top: 18px; text-align: center; }
.hb-vh8-total strong { display: block; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 32px; font-weight: 600; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
.hb-vh8-total span { color: #8f8f8f; font-size: 12.5px; }
.hb-vh8-total b { color: color-mix(in srgb, var(--hb-vh8-accent) 70%, #fff); font-weight: 600; }
.hb-vh8-side { display: flex; flex-direction: column; gap: 14px; }
.hb-vh8-packs { display: grid; gap: 8px; }
.hb-vh8-pack {
  position: relative;
  display: grid;
  grid-template-columns: 22px 1fr auto;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, .08);
  background: #111113;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color .25s ease, background-color .25s ease, transform .2s ease;
}
.hb-vh8-pack:hover { border-color: rgba(255, 255, 255, .16); background: #141416; }
.hb-vh8-pack:active { transform: scale(.995); }
.hb-vh8-pack:focus-visible { outline: 2px solid var(--hb-vh8-accent); outline-offset: 2px; }
.hb-vh8-pack[aria-checked="true"] { border-color: color-mix(in srgb, var(--hb-vh8-accent) 60%, transparent); background: color-mix(in srgb, var(--hb-vh8-accent) 7%, #111113); }
.hb-vh8-radio { width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #4a4a52; display: grid; place-items: center; transition: border-color .2s ease; }
.hb-vh8-radio::after { content: ""; width: 8px; height: 8px; border-radius: 999px; background: var(--hb-vh8-accent); transform: scale(0); transition: transform .3s cubic-bezier(.34, 1.56, .64, 1); }
.hb-vh8-pack[aria-checked="true"] .hb-vh8-radio { border-color: var(--hb-vh8-accent); }
.hb-vh8-pack[aria-checked="true"] .hb-vh8-radio::after { transform: scale(1); }
.hb-vh8-pmain { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-width: 0; }
.hb-vh8-pmain strong { font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-vh8-bonus { height: 22px; padding: 0 8px; border-radius: 6px; background: color-mix(in srgb, var(--hb-vh8-accent) 16%, transparent); color: color-mix(in srgb, var(--hb-vh8-accent) 60%, #fff); font-size: 11.5px; font-weight: 600; line-height: 22px; font-variant-numeric: tabular-nums; }
.hb-vh8-label { height: 22px; padding: 0 8px; border-radius: 6px; background: #ededed; color: #0a0a0a; font-size: 11px; font-weight: 700; line-height: 22px; text-transform: uppercase; letter-spacing: .04em; }
.hb-vh8-unit { width: 100%; color: #6f6f6f; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-vh8-pprice { font-size: 17px; font-weight: 650; font-variant-numeric: tabular-nums; letter-spacing: -.01em; }
.hb-vh8-uses { display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 8px; }
.hb-vh8-use { padding: 12px 14px; border-radius: 12px; background: #0f0f11; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .06); }
.hb-vh8-use strong { display: block; font-size: 18px; font-weight: 650; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
.hb-vh8-use strong span { display: inline-block; animation: hb-vh8-up .45s cubic-bezier(.2, .9, .3, 1.2); }
@keyframes hb-vh8-up { from { opacity: 0; transform: translateY(50%); } to { opacity: 1; transform: none; } }
.hb-vh8-use small { color: #8f8f8f; font-size: 12px; }
.hb-vh8-buy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 48px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-vh8-accent) 80%, #fff), var(--hb-vh8-accent));
  color: #1a1206;
  font: inherit;
  font-size: 15px;
  font-weight: 650;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .45), 0 14px 30px -14px var(--hb-vh8-accent);
  transition: filter .2s ease, transform .15s ease;
}
.hb-vh8-buy:hover { filter: brightness(1.06); }
.hb-vh8-buy:active { transform: scale(.985); }
.hb-vh8-buy:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-vh8-note { margin: 0; color: #6f6f6f; font-size: 12px; text-align: center; }
@media (prefers-reduced-motion: reduce) {
  .hb-vh8 *, .hb-vh8 *::before, .hb-vh8 *::after { animation: none !important; transition: none !important; }
}
`;

export function PricingCreditStack({
  eyebrow = "Credits",
  title = "Top up once, create all month",
  subtitle = "Credits never expire and work across every tool. Bigger packs come with bonus credits on top.",
  packs = defaultPacks,
  uses = defaultUses,
  currency = "USD",
  locale = "en-US",
  selected,
  defaultSelected = 2,
  onSelectedChange,
  onPurchase,
  buyLabel = "Buy",
  accent = "#f5a524",
  className = "",
  style,
  ...rest
}: PricingCreditStackProps) {
  const [inner, setInner] = React.useState(defaultSelected);
  const current = Math.max(0, Math.min(packs.length - 1, selected ?? inner));
  const pack = packs[current];
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const money = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 0, maximumFractionDigits: 2 }),
    [locale, currency],
  );
  const unitMoney = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [locale, currency],
  );
  const num = React.useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const choose = (i: number) => {
    if (selected === undefined) setInner(i);
    onSelectedChange?.(i, packs[i]);
  };

  if (!pack) return null;
  const bonusCredits = Math.round(pack.credits * pack.bonus);
  const totalCredits = pack.credits + bonusCredits;
  const maxTotal = Math.max(...packs.map((p) => p.credits * (1 + p.bonus)));
  const tiles = Math.max(2, Math.round((totalCredits / maxTotal) * TILES));
  const bonusTiles = pack.bonus > 0 ? Math.max(1, Math.round(tiles * (pack.bonus / (1 + pack.bonus)))) : 0;

  return (
    <section className={`hb-vh8 ${className}`} style={{ "--hb-vh8-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-pricing-credit-stack" precedence="default">{css}</style>
      <div className="hb-vh8-inner">
        <div className="hb-vh8-head">
          {eyebrow ? <p className="hb-vh8-eyebrow"><i aria-hidden="true" />{eyebrow}</p> : null}
          <h2 className="hb-vh8-title">{title}</h2>
          {subtitle ? <p className="hb-vh8-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-vh8-body">
          <div className="hb-vh8-vault" aria-hidden="true">
            <div className="hb-vh8-stack">
              {Array.from({ length: tiles }, (_, i) => (
                <span
                  key={i}
                  className="hb-vh8-coin"
                  data-bonus={i >= tiles - bonusTiles ? "true" : undefined}
                  style={{ "--i": Math.max(0, i - 2) } as React.CSSProperties}
                />
              ))}
            </div>
            <div className="hb-vh8-total">
              <strong>{num.format(totalCredits)}</strong>
              <span>credits{bonusCredits > 0 ? <> incl. <b>+{num.format(bonusCredits)} bonus</b></> : null}</span>
            </div>
          </div>
          <div className="hb-vh8-side">
            <div className="hb-vh8-packs" role="radiogroup" aria-label="Credit packs">
              {packs.map((p, i) => (
                <button
                  key={p.credits}
                  ref={(el) => { refs.current[i] = el; }}
                  type="button"
                  role="radio"
                  aria-checked={i === current}
                  tabIndex={i === current ? 0 : -1}
                  className="hb-vh8-pack"
                  onClick={() => choose(i)}
                  onKeyDown={(e) => {
                    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
                    if (!d) return;
                    e.preventDefault();
                    const n = (i + d + packs.length) % packs.length;
                    choose(n);
                    refs.current[n]?.focus();
                  }}
                >
                  <span className="hb-vh8-radio" aria-hidden="true" />
                  <span className="hb-vh8-pmain">
                    <strong>{num.format(p.credits)} credits</strong>
                    {p.bonus > 0 ? <span className="hb-vh8-bonus">+{Math.round(p.bonus * 100)}% bonus</span> : null}
                    {p.label ? <span className="hb-vh8-label">{p.label}</span> : null}
                    <span className="hb-vh8-unit">{unitMoney.format((p.price / (p.credits * (1 + p.bonus))) * 100)} per 100 credits</span>
                  </span>
                  <span className="hb-vh8-pprice">{money.format(p.price)}</span>
                </button>
              ))}
            </div>
            {uses.length ? (
              <div className="hb-vh8-uses" style={{ "--n": uses.length } as React.CSSProperties} aria-live="polite">
                {uses.map((u) => {
                  const count = Math.floor(totalCredits / u.cost);
                  return (
                    <div key={u.label} className="hb-vh8-use">
                      <strong><span key={count}>~{num.format(count)}</span></strong>
                      <small>{u.label}</small>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <button type="button" className="hb-vh8-buy" onClick={() => onPurchase?.(pack)}>
              {buyLabel} {num.format(totalCredits)} credits for {money.format(pack.price)}
            </button>
            <p className="hb-vh8-note">One-time payment. Unused credits roll over forever.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
