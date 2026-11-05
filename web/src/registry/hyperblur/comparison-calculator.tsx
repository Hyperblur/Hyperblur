"use client";

import * as React from "react";

export interface ComparisonCalculatorPlan {
  name: string;
  base: number;
  perSeat: number;
  perThousand: number;
  annualDiscount?: number;
}

export interface ComparisonCalculatorValue {
  seats: number;
  contacts: number;
  annual: boolean;
}

export interface ComparisonCalculatorProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  product?: ComparisonCalculatorPlan;
  competitors?: ComparisonCalculatorPlan[];
  value?: ComparisonCalculatorValue;
  defaultValue?: ComparisonCalculatorValue;
  onChange?: (value: ComparisonCalculatorValue, yearlySavings: number) => void;
  maxSeats?: number;
  maxContacts?: number;
  cta?: { label: string; href: string } | null;
  accent?: string;
}

const css = `
.hb-yh3 {
  --hb-yh3-accent: #ff5a36;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  overflow: hidden;
  padding: clamp(64px, 9cqi, 112px) 20px;
  background: #f7f5ef;
  color: #141414;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yh3 *, .hb-yh3 *::before, .hb-yh3 *::after { box-sizing: border-box; }
.hb-yh3::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(20,20,20,.07) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(70% 60% at 50% 0%, #000, transparent);
  mask-image: radial-gradient(70% 60% at 50% 0%, #000, transparent);
  pointer-events: none;
}
.hb-yh3-in { position: relative; max-width: 1120px; margin: 0 auto; }
.hb-yh3-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 36px; }
.hb-yh3-eyebrow { display: inline-block; color: var(--hb-yh3-accent); font-size: 13px; font-weight: 650; }
.hb-yh3-title { margin: 10px 0 0; max-width: 560px; font-size: clamp(30px, 4.4cqi, 46px); font-weight: 650; letter-spacing: -.035em; line-height: 1.05; }
.hb-yh3-sub { margin: 0; max-width: 360px; color: #6b6b6b; font-size: 15px; line-height: 1.6; }
.hb-yh3-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 16px; }
.hb-yh3-card { min-width: 0; padding: 28px; border: 1px solid rgba(20,20,20,.08); border-radius: 22px; background: #fff; box-shadow: 0 1px 0 rgba(20,20,20,.03), 0 20px 50px -30px rgba(20,20,20,.25); }
.hb-yh3-field + .hb-yh3-field { margin-top: 28px; }
.hb-yh3-lab { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.hb-yh3-lab label { font-size: 14px; font-weight: 600; }
.hb-yh3-out { font-size: 22px; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-yh3-out small { margin-left: 4px; color: #8a8a8a; font-size: 12.5px; font-weight: 500; letter-spacing: 0; }
.hb-yh3-hint { margin: 4px 0 0; color: #8a8a8a; font-size: 12.5px; }
.hb-yh3-range {
  -webkit-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  height: 28px;
  margin: 12px 0 0;
  background: transparent;
  cursor: pointer;
}
.hb-yh3-range::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 99px;
  background: linear-gradient(90deg, var(--hb-yh3-accent) 0 calc(var(--hb-yh3-p) * 1%), #ebe8df calc(var(--hb-yh3-p) * 1%) 100%);
}
.hb-yh3-range::-moz-range-track { height: 8px; border-radius: 99px; background: #ebe8df; }
.hb-yh3-range::-moz-range-progress { height: 8px; border-radius: 99px; background: var(--hb-yh3-accent); }
.hb-yh3-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  margin-top: -8px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(20,20,20,.12), 0 4px 10px -2px rgba(20,20,20,.3), inset 0 0 0 6px var(--hb-yh3-accent);
  transition: transform .15s ease;
}
.hb-yh3-range::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(20,20,20,.12), 0 4px 10px -2px rgba(20,20,20,.3), inset 0 0 0 6px var(--hb-yh3-accent);
}
.hb-yh3-range:active::-webkit-slider-thumb { transform: scale(1.12); }
.hb-yh3-range:focus-visible { outline: none; }
.hb-yh3-range:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-yh3-accent) 30%, transparent), inset 0 0 0 6px var(--hb-yh3-accent); }
.hb-yh3-range:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-yh3-accent) 30%, transparent), inset 0 0 0 6px var(--hb-yh3-accent); }
.hb-yh3-ticks { display: flex; justify-content: space-between; margin-top: 4px; color: #a3a3a3; font-size: 11px; font-variant-numeric: tabular-nums; }
.hb-yh3-seg { position: relative; display: grid; grid-template-columns: 1fr 1fr; margin-top: 30px; padding: 4px; border-radius: 999px; background: #f1eee6; }
.hb-yh3-pill { position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc(50% - 4px); border-radius: 999px; background: #fff; box-shadow: 0 1px 2px rgba(20,20,20,.12), 0 4px 12px -4px rgba(20,20,20,.18); transition: transform .35s cubic-bezier(.3,1.3,.5,1); }
.hb-yh3-seg[data-annual="true"] .hb-yh3-pill { transform: translateX(100%); }
.hb-yh3-opt { position: relative; z-index: 1; height: 38px; border: 0; border-radius: 999px; background: transparent; color: #6b6b6b; font: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: color .2s ease; }
.hb-yh3-opt[aria-pressed="true"] { color: #141414; }
.hb-yh3-opt em { margin-left: 6px; padding: 2px 7px; border-radius: 999px; background: color-mix(in srgb, var(--hb-yh3-accent) 14%, #fff); color: var(--hb-yh3-accent); font-size: 11px; font-style: normal; }
.hb-yh3-opt:focus-visible, .hb-yh3 a:focus-visible { outline: 2px solid var(--hb-yh3-accent); outline-offset: 2px; }
.hb-yh3-res { display: flex; flex-direction: column; }
.hb-yh3-save { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding-bottom: 22px; border-bottom: 1px solid rgba(20,20,20,.07); }
.hb-yh3-sl { color: #6b6b6b; font-size: 13.5px; }
.hb-yh3-sv { margin-top: 6px; font-size: clamp(36px, 5.4cqi, 56px); font-weight: 700; letter-spacing: -.045em; line-height: 1; font-variant-numeric: tabular-nums; }
.hb-yh3-sv span { color: var(--hb-yh3-accent); }
.hb-yh3-cta {
  display: inline-flex;
  align-items: center;
  flex: none;
  height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  background: #141414;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color .2s ease, transform .15s ease;
}
.hb-yh3-cta:hover { background: #2a2a2a; }
.hb-yh3-cta:active { transform: scale(.98); }
.hb-yh3-chart { position: relative; display: grid; grid-template-columns: repeat(var(--hb-yh3-n), minmax(0, 1fr)); gap: 18px; align-items: end; height: 250px; margin-top: 24px; padding-top: 10px; }
.hb-yh3-chart::before {
  content: "";
  position: absolute;
  inset: 10px 0 34px;
  background: repeating-linear-gradient(180deg, rgba(20,20,20,.06) 0 1px, transparent 1px 25%);
  pointer-events: none;
}
.hb-yh3-col { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; min-width: 0; }
.hb-yh3-amt { margin-bottom: 8px; font-size: 14px; font-weight: 650; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-yh3-amt small { color: #8a8a8a; font-size: 11.5px; font-weight: 500; }
.hb-yh3-bar {
  position: relative;
  width: min(100%, 92px);
  height: calc((100% - 64px) * var(--hb-yh3-h) / 100);
  min-height: 6px;
  border-radius: 12px 12px 4px 4px;
  background: repeating-linear-gradient(135deg, #e7e3d9 0 6px, #efece4 6px 12px);
  box-shadow: inset 0 0 0 1px rgba(20,20,20,.06);
  transition: height .55s cubic-bezier(.3,1.2,.4,1);
}
.hb-yh3-col[data-us="true"] .hb-yh3-bar { background: linear-gradient(180deg, color-mix(in srgb, var(--hb-yh3-accent) 85%, #fff), var(--hb-yh3-accent)); box-shadow: inset 0 1px 0 rgba(255,255,255,.4), 0 14px 30px -12px color-mix(in srgb, var(--hb-yh3-accent) 80%, transparent); }
.hb-yh3-name { display: flex; align-items: center; justify-content: center; gap: 6px; height: 34px; color: #6b6b6b; font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
.hb-yh3-col[data-us="true"] .hb-yh3-name { color: #141414; }
.hb-yh3-name i { width: 8px; height: 8px; flex: none; border-radius: 2px; background: #d6d1c4; }
.hb-yh3-col[data-us="true"] .hb-yh3-name i { background: var(--hb-yh3-accent); }
.hb-yh3-note { margin: 14px 0 0; color: #8a8a8a; font-size: 12px; line-height: 1.5; }
@container (max-width: 860px) {
  .hb-yh3-head { flex-direction: column; align-items: flex-start; }
  .hb-yh3-grid { grid-template-columns: minmax(0, 1fr); }
}
@container (max-width: 480px) {
  .hb-yh3-card { padding: 22px; }
  .hb-yh3-save { flex-direction: column; }
  .hb-yh3-chart { gap: 10px; height: 220px; }
  .hb-yh3-amt { font-size: 12.5px; }
  .hb-yh3-amt small { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yh3 *, .hb-yh3 *::before, .hb-yh3 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultProduct: ComparisonCalculatorPlan = { name: "Relay", base: 0, perSeat: 12, perThousand: 4, annualDiscount: 0.2 };

const defaultCompetitors: ComparisonCalculatorPlan[] = [
  { name: "Beacon Desk", base: 0, perSeat: 39, perThousand: 6, annualDiscount: 0.1 },
  { name: "Parcel HQ", base: 99, perSeat: 29, perThousand: 9, annualDiscount: 0.15 },
  { name: "Switchyard", base: 49, perSeat: 45, perThousand: 3, annualDiscount: 0 },
];

function money(n: number) {
  const s = Math.round(n).toString();
  return `$${s.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function monthly(plan: ComparisonCalculatorPlan, v: ComparisonCalculatorValue) {
  const raw = plan.base + v.seats * plan.perSeat + v.contacts * plan.perThousand;
  return v.annual ? raw * (1 - (plan.annualDiscount ?? 0)) : raw;
}

function useTween(target: number, ms = 450) {
  const [shown, setShown] = React.useState(target);
  const from = React.useRef(target);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      const id = window.requestAnimationFrame(() => setShown(target));
      return () => window.cancelAnimationFrame(id);
    }
    const start = from.current;
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      const v = start + (target - start) * e;
      from.current = v;
      setShown(v);
      if (k < 1) raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [target, ms]);
  return shown;
}

export function ComparisonCalculator({
  eyebrow = "Pricing calculator",
  title = "See what your support stack really costs",
  subtitle = "Move the sliders to match your team. Competitor prices come from their public pricing pages in October 2026.",
  product = defaultProduct,
  competitors = defaultCompetitors,
  value,
  defaultValue = { seats: 24, contacts: 60, annual: true },
  onChange,
  maxSeats = 200,
  maxContacts = 250,
  cta = { label: "Start a free trial", href: "#" },
  accent = "#ff5a36",
  className = "",
  style,
  ...rest
}: ComparisonCalculatorProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState(defaultValue);
  const v = value ?? inner;

  const ours = monthly(product, v);
  const theirs = competitors.map((c) => monthly(c, v));
  const cheapest = theirs.length ? Math.min(...theirs) : ours;
  const savings = Math.max(0, (cheapest - ours) * 12);
  const max = Math.max(ours, ...theirs, 1);
  const shownSavings = useTween(savings);

  function update(patch: Partial<ComparisonCalculatorValue>) {
    const next = { ...v, ...patch };
    if (value === undefined) setInner(next);
    const nOurs = monthly(product, next);
    const nTheirs = competitors.map((c) => monthly(c, next));
    const nCheap = nTheirs.length ? Math.min(...nTheirs) : nOurs;
    onChange?.(next, Math.max(0, (nCheap - nOurs) * 12));
  }

  const cols = [{ plan: product, cost: ours, us: true }, ...competitors.map((c, i) => ({ plan: c, cost: theirs[i]!, us: false }))];

  return (
    <section className={`hb-yh3 ${className}`} style={{ "--hb-yh3-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-comparison-calculator" precedence="default">
        {css}
      </style>
      <div className="hb-yh3-in">
        <header className="hb-yh3-head">
          <div>
            <span className="hb-yh3-eyebrow">{eyebrow}</span>
            <h2 className="hb-yh3-title">{title}</h2>
          </div>
          {subtitle && <p className="hb-yh3-sub">{subtitle}</p>}
        </header>
        <div className="hb-yh3-grid">
          <div className="hb-yh3-card">
            <div className="hb-yh3-field">
              <div className="hb-yh3-lab">
                <label htmlFor={`${uid}-seats`}>Support agents</label>
                <span className="hb-yh3-out" aria-hidden="true">
                  {v.seats}
                  <small>seats</small>
                </span>
              </div>
              <p className="hb-yh3-hint">People who answer conversations</p>
              <input
                id={`${uid}-seats`}
                className="hb-yh3-range"
                type="range"
                min={1}
                max={maxSeats}
                value={v.seats}
                aria-valuetext={`${v.seats} seats`}
                onChange={(e) => update({ seats: Number(e.target.value) })}
                style={{ "--hb-yh3-p": (((v.seats - 1) / Math.max(1, maxSeats - 1)) * 100).toFixed(2) } as React.CSSProperties}
              />
              <div className="hb-yh3-ticks" aria-hidden="true">
                <span>1</span>
                <span>{Math.round(maxSeats / 2)}</span>
                <span>{maxSeats}</span>
              </div>
            </div>
            <div className="hb-yh3-field">
              <div className="hb-yh3-lab">
                <label htmlFor={`${uid}-contacts`}>Monthly active contacts</label>
                <span className="hb-yh3-out" aria-hidden="true">
                  {v.contacts}k
                  <small>contacts</small>
                </span>
              </div>
              <p className="hb-yh3-hint">Customers who start a conversation</p>
              <input
                id={`${uid}-contacts`}
                className="hb-yh3-range"
                type="range"
                min={1}
                max={maxContacts}
                value={v.contacts}
                aria-valuetext={`${v.contacts} thousand contacts`}
                onChange={(e) => update({ contacts: Number(e.target.value) })}
                style={{ "--hb-yh3-p": (((v.contacts - 1) / Math.max(1, maxContacts - 1)) * 100).toFixed(2) } as React.CSSProperties}
              />
              <div className="hb-yh3-ticks" aria-hidden="true">
                <span>1k</span>
                <span>{Math.round(maxContacts / 2)}k</span>
                <span>{maxContacts}k</span>
              </div>
            </div>
            <div className="hb-yh3-seg" role="group" aria-label="Billing period" data-annual={v.annual ? "true" : "false"}>
              <span className="hb-yh3-pill" aria-hidden="true" />
              <button type="button" className="hb-yh3-opt" aria-pressed={!v.annual} onClick={() => update({ annual: false })}>
                Monthly
              </button>
              <button type="button" className="hb-yh3-opt" aria-pressed={v.annual} onClick={() => update({ annual: true })}>
                Yearly<em>save {Math.round((product.annualDiscount ?? 0) * 100)}%</em>
              </button>
            </div>
          </div>
          <div className="hb-yh3-card hb-yh3-res">
            <div className="hb-yh3-save">
              <div>
                <div className="hb-yh3-sl">You save at least, per year</div>
                <div className="hb-yh3-sv" aria-live="polite">
                  <span>{money(shownSavings)}</span>
                </div>
              </div>
              {cta && (
                <a href={cta.href} className="hb-yh3-cta">
                  {cta.label}
                </a>
              )}
            </div>
            <div className="hb-yh3-chart" style={{ "--hb-yh3-n": cols.length } as React.CSSProperties} role="list" aria-label="Monthly cost by product">
              {cols.map((c) => (
                <div key={c.plan.name} className="hb-yh3-col" data-us={c.us ? "true" : "false"} role="listitem">
                  <span className="hb-yh3-amt">
                    {money(c.cost)}
                    <small> /mo</small>
                  </span>
                  <span className="hb-yh3-bar" style={{ "--hb-yh3-h": ((c.cost / max) * 100).toFixed(2) } as React.CSSProperties} aria-hidden="true" />
                  <span className="hb-yh3-name">
                    <i aria-hidden="true" />
                    {c.plan.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="hb-yh3-note">Compared with the cheapest alternative for the same seats and contacts. Taxes not included.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
