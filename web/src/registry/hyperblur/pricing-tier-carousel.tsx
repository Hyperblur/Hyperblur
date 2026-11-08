"use client";

import * as React from "react";

export interface PricingCarouselTier {
  name: string;
  audience: string;
  price: number;
  unit: string;
  features: string[];
  cta: { label: string; href: string };
  color: string;
}

export interface PricingTierCarouselProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tiers?: PricingCarouselTier[];
  currency?: string;
  locale?: string;
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number, tier: PricingCarouselTier) => void;
}

const defaultTiers: PricingCarouselTier[] = [
  { name: "Solo", audience: "One creator, one channel", price: 9, unit: "/ mo", features: ["1 brand profile", "30 scheduled posts", "Basic analytics", "Link-in-bio page"], cta: { label: "Choose Solo", href: "#" }, color: "#94a3b8" },
  { name: "Creator", audience: "Growing a real audience", price: 24, unit: "/ mo", features: ["3 brand profiles", "Unlimited scheduling", "Best-time suggestions", "Caption library"], cta: { label: "Choose Creator", href: "#" }, color: "#34d399" },
  { name: "Team", audience: "Agencies and small teams", price: 59, unit: "/ mo", features: ["10 brand profiles", "Approval queues", "Shared content calendar", "Client report PDFs"], cta: { label: "Choose Team", href: "#" }, color: "#2f7bff" },
  { name: "Business", audience: "Brands across many markets", price: 149, unit: "/ mo", features: ["40 brand profiles", "Social listening", "Custom roles", "Priority support in 2h"], cta: { label: "Choose Business", href: "#" }, color: "#a78bfa" },
  { name: "Network", audience: "Holding groups and franchises", price: 399, unit: "/ mo", features: ["Unlimited profiles", "SSO and audit log", "Regional workspaces", "Dedicated strategist"], cta: { label: "Talk to sales", href: "#" }, color: "#f5a524" },
];

const css = `
.hb-vh5 {
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
.hb-vh5 *, .hb-vh5 *::before, .hb-vh5 *::after { box-sizing: border-box; }
.hb-vh5::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 46%;
  width: 760px;
  height: 420px;
  transform: translate(-50%, -50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-vh5-c) 22%, transparent), transparent);
  transition: background .6s ease;
  pointer-events: none;
}
.hb-vh5-inner { position: relative; max-width: 1080px; margin: 0 auto; padding: 64px 20px 56px; }
.hb-vh5-head { text-align: center; display: grid; justify-items: center; gap: 10px; }
.hb-vh5-eyebrow { margin: 0; color: #8f8f8f; font-size: 13px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.hb-vh5-title { margin: 0; max-width: 600px; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(28px, 4.6cqi, 46px); font-weight: 600; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-vh5-sub { margin: 0; max-width: 500px; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-vh5-stage {
  position: relative;
  height: 400px;
  margin-top: 36px;
  perspective: 1400px;
  touch-action: pan-y;
  outline: none;
  cursor: grab;
}
.hb-vh5-stage:active { cursor: grabbing; }
.hb-vh5-stage:focus-visible .hb-vh5-card[data-active="true"] { outline: 2px solid var(--hb-vh5-c); outline-offset: 4px; }
.hb-vh5-card {
  --o: 0;
  --ao: 0;
  position: absolute;
  left: 50%;
  top: 0;
  width: min(300px, 78cqi);
  height: 380px;
  margin-left: calc(min(300px, 78cqi) / -2);
  display: flex;
  flex-direction: column;
  padding: 24px 22px 22px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, .09);
  background:
    radial-gradient(120% 50% at 50% 0%, color-mix(in srgb, var(--tc) 16%, transparent), transparent 70%),
    linear-gradient(180deg, #151517, #0e0e10);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 30px 60px -30px rgba(0, 0, 0, .9);
  transform: translateX(calc(var(--o) * min(232px, 44cqi))) translateZ(calc(var(--ao) * -160px)) rotateY(calc(var(--o) * -24deg));
  opacity: calc(1 - var(--ao) * .32);
  filter: brightness(calc(1 - var(--ao) * .28));
  transition: transform .7s cubic-bezier(.22, 1, .36, 1), opacity .5s ease, filter .5s ease, border-color .4s ease;
  user-select: none;
}
.hb-vh5-card[data-active="true"] { border-color: color-mix(in srgb, var(--tc) 50%, transparent); }
.hb-vh5-card[data-far="true"] { opacity: 0; pointer-events: none; }
.hb-vh5-cname { display: flex; align-items: center; justify-content: space-between; }
.hb-vh5-cname h3 { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -.01em; }
.hb-vh5-chip { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, var(--tc), color-mix(in srgb, var(--tc) 40%, #000)); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 20px -8px var(--tc); }
.hb-vh5-aud { margin: 6px 0 0; color: #8f8f8f; font-size: 13.5px; }
.hb-vh5-price { display: flex; align-items: baseline; gap: 6px; margin-top: 22px; }
.hb-vh5-price strong { font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 48px; font-weight: 600; letter-spacing: -.04em; line-height: 1; font-variant-numeric: tabular-nums; }
.hb-vh5-price span { color: #8f8f8f; font-size: 14px; }
.hb-vh5-list { display: grid; gap: 10px; margin: 22px 0 0; padding: 18px 0 0; border-top: 1px solid rgba(255, 255, 255, .07); list-style: none; }
.hb-vh5-list li { display: flex; align-items: center; gap: 10px; color: #b5b5b5; font-size: 13.5px; }
.hb-vh5-list li::before { content: ""; flex: none; width: 5px; height: 5px; border-radius: 999px; background: var(--tc); }
.hb-vh5-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  margin-top: auto;
  border-radius: 12px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color .2s ease, transform .15s ease;
}
.hb-vh5-card:not([data-active="true"]) .hb-vh5-cta { background: rgba(255, 255, 255, .06); color: #8f8f8f; }
.hb-vh5-cta:hover { background: #fff; }
.hb-vh5-cta:active { transform: scale(.98); }
.hb-vh5-cta:focus-visible { outline: 2px solid var(--tc); outline-offset: 2px; }
.hb-vh5-nav { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 18px; }
.hb-vh5-arrow {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, .1);
  background: #121214;
  color: #ededed;
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease, transform .2s cubic-bezier(.34, 1.56, .64, 1), opacity .2s ease;
}
.hb-vh5-arrow svg { width: 16px; height: 16px; }
.hb-vh5-arrow:hover { background: #1b1b1e; border-color: rgba(255, 255, 255, .2); }
.hb-vh5-arrow:active { transform: scale(.92); }
.hb-vh5-arrow:disabled { opacity: .35; cursor: default; transform: none; }
.hb-vh5-arrow:focus-visible { outline: 2px solid var(--hb-vh5-c); outline-offset: 2px; }
.hb-vh5-rail { position: relative; width: min(420px, 60cqi); height: 40px; }
.hb-vh5-line { position: absolute; left: 0; right: 0; top: 13px; height: 2px; border-radius: 2px; background: #232326; }
.hb-vh5-tick {
  position: absolute;
  top: 6px;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}
.hb-vh5-tick::before { content: ""; position: absolute; inset: 4px; border-radius: 999px; background: #3a3a40; transition: background-color .3s ease, transform .3s ease; }
.hb-vh5-tick[aria-current="true"]::before { background: var(--tc); transform: scale(1.3); }
.hb-vh5-tick:focus-visible { outline: 2px solid var(--tc); outline-offset: 1px; }
.hb-vh5-tick span { position: absolute; top: 20px; left: 50%; transform: translateX(-50%); color: #6f6f6f; font-size: 11px; white-space: nowrap; font-variant-numeric: tabular-nums; transition: color .3s ease; }
.hb-vh5-tick[aria-current="true"] span { color: #ededed; }
.hb-vh5-marker { position: absolute; top: 5px; width: 18px; height: 18px; margin-left: -9px; border-radius: 999px; border: 2px solid var(--hb-vh5-c); box-shadow: 0 0 14px var(--hb-vh5-c); transition: left .7s cubic-bezier(.22, 1, .36, 1), border-color .4s ease; pointer-events: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-vh5 *, .hb-vh5 *::before, .hb-vh5 *::after { transition: none !important; }
}
`;

export function PricingTierCarousel({
  eyebrow = "Plans",
  title = "Find the plan that matches your reach",
  subtitle = "Swipe, drag or use the arrow keys. Every plan starts with a 14-day trial and no card.",
  tiers = defaultTiers,
  currency = "USD",
  locale = "en-US",
  index,
  defaultIndex = 2,
  onIndexChange,
  className = "",
  style,
  ...rest
}: PricingTierCarouselProps) {
  const [inner, setInner] = React.useState(defaultIndex);
  const active = Math.max(0, Math.min(tiers.length - 1, index ?? inner));
  const drag = React.useRef<{ x: number; id: number } | null>(null);
  const swiped = React.useRef(false);
  const money = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }),
    [locale, currency],
  );

  const go = (i: number) => {
    const next = Math.max(0, Math.min(tiers.length - 1, i));
    if (next === active) return;
    if (index === undefined) setInner(next);
    onIndexChange?.(next, tiers[next]);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(tiers.length - 1); }
  };

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, id: e.pointerId };
    swiped.current = false;
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) {
      swiped.current = true;
      go(active + (dx < 0 ? 1 : -1));
    }
  };

  const prices = tiers.map((t) => Math.log(t.price + 1));
  const lo = Math.min(...prices);
  const hi = Math.max(...prices);
  const pos = (i: number) => (hi === lo ? 50 : ((prices[i] - lo) / (hi - lo)) * 100);
  const color = tiers[active]?.color ?? "#2f7bff";

  return (
    <section className={`hb-vh5 ${className}`} style={{ "--hb-vh5-c": color, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-pricing-tier-carousel" precedence="default">{css}</style>
      <div className="hb-vh5-inner">
        <div className="hb-vh5-head">
          {eyebrow ? <p className="hb-vh5-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-vh5-title">{title}</h2>
          {subtitle ? <p className="hb-vh5-sub">{subtitle}</p> : null}
        </div>
        <div
          className="hb-vh5-stage"
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={`Plans, ${tiers[active]?.name} selected, ${active + 1} of ${tiers.length}`}
          onKeyDown={onKey}
          onPointerDown={onDown}
          onPointerUp={onUp}
          onPointerCancel={() => { drag.current = null; }}
        >
          {tiers.map((t, i) => {
            const o = i - active;
            const ao = Math.abs(o);
            return (
              <article
                key={t.name}
                className="hb-vh5-card"
                data-active={o === 0 ? "true" : undefined}
                data-far={ao > 2 ? "true" : undefined}
                aria-hidden={o !== 0}
                style={{ "--o": o, "--ao": ao, "--tc": t.color, zIndex: 10 - ao } as React.CSSProperties}
                onClick={() => {
                  if (swiped.current) { swiped.current = false; return; }
                  if (o !== 0) go(i);
                }}
              >
                <div className="hb-vh5-cname">
                  <h3>{t.name}</h3>
                  <span className="hb-vh5-chip" aria-hidden="true" />
                </div>
                <p className="hb-vh5-aud">{t.audience}</p>
                <div className="hb-vh5-price">
                  <strong>{money.format(t.price)}</strong>
                  <span>{t.unit}</span>
                </div>
                <ul className="hb-vh5-list">
                  {t.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <a className="hb-vh5-cta" href={t.cta.href} tabIndex={o === 0 ? 0 : -1}>{t.cta.label}</a>
              </article>
            );
          })}
        </div>
        <div className="hb-vh5-nav">
          <button type="button" className="hb-vh5-arrow" aria-label="Previous plan" disabled={active === 0} onClick={() => go(active - 1)}>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3.5L5.5 8l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="hb-vh5-rail">
            <div className="hb-vh5-line" />
            {tiers.map((t, i) => (
              <button
                key={t.name}
                type="button"
                className="hb-vh5-tick"
                style={{ left: `${pos(i).toFixed(2)}%`, "--tc": t.color } as React.CSSProperties}
                aria-current={i === active ? "true" : undefined}
                aria-label={`${t.name}, ${money.format(t.price)} ${t.unit}`}
                onClick={() => go(i)}
              >
                <span>{money.format(t.price)}</span>
              </button>
            ))}
            <div className="hb-vh5-marker" style={{ left: `${pos(active).toFixed(2)}%` }} aria-hidden="true" />
          </div>
          <button type="button" className="hb-vh5-arrow" aria-label="Next plan" disabled={active === tiers.length - 1} onClick={() => go(active + 1)}>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5L10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
