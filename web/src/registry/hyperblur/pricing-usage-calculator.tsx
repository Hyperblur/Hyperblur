"use client";

import * as React from "react";

export interface PricingUsageMeter {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  included: number;
  rate: number;
  defaultValue: number;
  color: string;
}

export interface PricingUsagePlan {
  name: string;
  price: number;
  limits: Record<string, number>;
}

export interface PricingUsageCalculatorProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  meters?: PricingUsageMeter[];
  baseFee?: number;
  plans?: PricingUsagePlan[];
  currency?: string;
  locale?: string;
  defaultValues?: Record<string, number>;
  onChange?: (values: Record<string, number>, total: number) => void;
  cta?: { label: string; href: string };
  accent?: string;
}

const defaultMeters: PricingUsageMeter[] = [
  { id: "requests", label: "API requests", unit: "M req", min: 0, max: 50, step: 1, included: 2, rate: 3.2, defaultValue: 14, color: "#2f7bff" },
  { id: "storage", label: "Storage", unit: "GB", min: 0, max: 2000, step: 25, included: 100, rate: 0.021, defaultValue: 650, color: "#a78bfa" },
  { id: "bandwidth", label: "Bandwidth", unit: "TB", min: 0, max: 20, step: 0.5, included: 1, rate: 8, defaultValue: 4.5, color: "#34d399" },
  { id: "builds", label: "Build minutes", unit: "min", min: 0, max: 20000, step: 250, included: 1000, rate: 0.004, defaultValue: 6000, color: "#f5a524" },
];

const defaultPlans: PricingUsagePlan[] = [
  { name: "Hobby", price: 0, limits: { requests: 2, storage: 100, bandwidth: 1, builds: 1000 } },
  { name: "Pro", price: 79, limits: { requests: 25, storage: 1000, bandwidth: 10, builds: 10000 } },
  { name: "Business", price: 249, limits: { requests: 50, storage: 2000, bandwidth: 20, builds: 20000 } },
];

const css = `
.hb-vh2 {
  --hb-vh2-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vh2 *, .hb-vh2 *::before, .hb-vh2 *::after { box-sizing: border-box; }
.hb-vh2-inner { max-width: 1080px; margin: 0 auto; padding: 64px 20px; }
.hb-vh2-eyebrow { margin: 0 0 12px; color: #8f8f8f; font-family: var(--font-mono), ui-monospace, monospace; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; }
.hb-vh2-eyebrow b { color: var(--hb-vh2-accent); font-weight: 500; }
.hb-vh2-title { margin: 0; max-width: 620px; font-size: clamp(28px, 4.4cqi, 42px); font-weight: 650; line-height: 1.08; letter-spacing: -.03em; text-wrap: balance; }
.hb-vh2-sub { margin: 12px 0 0; max-width: 540px; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; }
.hb-vh2-body { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 36px; }
@container (min-width: 780px) { .hb-vh2-body { grid-template-columns: 1.25fr 1fr; } }
.hb-vh2-panel {
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background: linear-gradient(180deg, #121214, #0d0d0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
}
.hb-vh2-meters { display: grid; gap: 6px; padding: 10px; }
.hb-vh2-meter { padding: 14px 14px 12px; border-radius: 14px; transition: background-color .25s ease; }
.hb-vh2-meter:hover, .hb-vh2-meter:focus-within { background: rgba(255, 255, 255, .025); }
.hb-vh2-mhead { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.hb-vh2-mlabel { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 550; }
.hb-vh2-dot { width: 8px; height: 8px; border-radius: 3px; background: var(--c); box-shadow: 0 0 10px var(--c); }
.hb-vh2-mval { font-family: var(--font-mono), ui-monospace, monospace; font-size: 13px; color: #ededed; font-variant-numeric: tabular-nums; }
.hb-vh2-mval small { color: #6f6f6f; font-size: 12px; }
.hb-vh2-range { position: relative; height: 26px; margin-top: 8px; }
.hb-vh2-rail { position: absolute; left: 0; right: 0; top: 11px; height: 4px; border-radius: 999px; background: #232326; overflow: hidden; }
.hb-vh2-free { position: absolute; left: 0; top: 0; bottom: 0; background: repeating-linear-gradient(90deg, rgba(255, 255, 255, .22) 0 2px, transparent 2px 5px); }
.hb-vh2-fill { position: absolute; left: 0; top: 0; bottom: 0; background: var(--c); border-radius: 999px; transition: width .12s ease-out; }
.hb-vh2-input {
  position: absolute;
  inset: 0;
  width: 100%;
  margin: 0;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}
.hb-vh2-input::-webkit-slider-runnable-track { height: 26px; background: transparent; }
.hb-vh2-input::-moz-range-track { height: 26px; background: transparent; }
.hb-vh2-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  margin-top: 4px;
  border-radius: 999px;
  border: 0;
  background: #fff;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--c) 35%, transparent), 0 2px 6px rgba(0, 0, 0, .5);
  transition: box-shadow .2s ease, transform .2s cubic-bezier(.34, 1.56, .64, 1);
}
.hb-vh2-input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 0;
  background: #fff;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--c) 35%, transparent), 0 2px 6px rgba(0, 0, 0, .5);
}
.hb-vh2-input:active::-webkit-slider-thumb { transform: scale(1.15); }
.hb-vh2-input:focus-visible { outline: none; }
.hb-vh2-input:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 4px var(--c), 0 0 0 7px rgba(255, 255, 255, .25); }
.hb-vh2-input:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 4px var(--c), 0 0 0 7px rgba(255, 255, 255, .25); }
.hb-vh2-mfoot { display: flex; justify-content: space-between; margin-top: 4px; color: #6f6f6f; font-size: 11.5px; font-variant-numeric: tabular-nums; }
.hb-vh2-receipt { display: flex; flex-direction: column; padding: 22px; }
.hb-vh2-total-label { color: #8f8f8f; font-size: 13px; }
.hb-vh2-total { display: flex; align-items: baseline; gap: 6px; margin-top: 6px; }
.hb-vh2-total strong { font-size: 44px; font-weight: 650; letter-spacing: -.04em; font-variant-numeric: tabular-nums; line-height: 1; }
.hb-vh2-total span { color: #8f8f8f; font-size: 13.5px; }
.hb-vh2-stack { display: flex; height: 10px; margin-top: 18px; border-radius: 999px; overflow: hidden; background: #1c1c1f; gap: 2px; }
.hb-vh2-seg { height: 100%; background: var(--c); transition: flex-grow .45s cubic-bezier(.2, .8, .2, 1); min-width: 0; }
.hb-vh2-seg:first-child { border-radius: 999px 0 0 999px; }
.hb-vh2-seg:last-child { border-radius: 0 999px 999px 0; }
.hb-vh2-lines { display: grid; gap: 0; margin: 16px 0 0; padding: 0; list-style: none; }
.hb-vh2-lines li { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 0; border-bottom: 1px dashed rgba(255, 255, 255, .08); color: #a1a1a1; font-size: 13px; }
.hb-vh2-lines li span:first-child { display: flex; align-items: center; gap: 8px; }
.hb-vh2-lines li span:last-child { color: #ededed; font-family: var(--font-mono), ui-monospace, monospace; font-size: 12.5px; font-variant-numeric: tabular-nums; }
.hb-vh2-lines li[data-free="true"] span:last-child { color: #6f6f6f; }
.hb-vh2-fit {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--hb-vh2-accent) 35%, transparent);
  background: color-mix(in srgb, var(--hb-vh2-accent) 9%, transparent);
  font-size: 13px;
  line-height: 1.45;
  color: #cfcfcf;
}
.hb-vh2-fit svg { flex: none; width: 18px; height: 18px; color: var(--hb-vh2-accent); }
.hb-vh2-fit b { color: #fff; font-weight: 600; }
.hb-vh2-fit-text { animation: hb-vh2-swap .45s cubic-bezier(.2, .9, .3, 1); }
@keyframes hb-vh2-swap { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.hb-vh2-plans { display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 6px; margin-top: 12px; }
.hb-vh2-plan {
  padding: 9px 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, .07);
  font-size: 12px;
  color: #8f8f8f;
  text-align: center;
  transition: border-color .3s ease, color .3s ease, background-color .3s ease;
}
.hb-vh2-plan b { display: block; color: #cfcfcf; font-size: 13px; font-weight: 600; }
.hb-vh2-plan[data-fit="true"] { border-color: var(--hb-vh2-accent); background: color-mix(in srgb, var(--hb-vh2-accent) 12%, transparent); color: #cfcfcf; }
.hb-vh2-plan[data-fit="true"] b { color: #fff; }
.hb-vh2-plan[data-over="true"] { opacity: .45; }
.hb-vh2-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  margin-top: auto;
  padding-top: 0;
  border-radius: 12px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color .2s ease, transform .15s ease;
}
.hb-vh2-ctawrap { display: flex; flex-direction: column; margin-top: 16px; flex: 1; justify-content: flex-end; }
.hb-vh2-cta:hover { background: #fff; }
.hb-vh2-cta:active { transform: scale(.98); }
.hb-vh2-cta:focus-visible { outline: 2px solid var(--hb-vh2-accent); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .hb-vh2 *, .hb-vh2 *::before, .hb-vh2 *::after { animation: none !important; transition: none !important; }
}
`;

function fitPlan(plans: PricingUsagePlan[], values: Record<string, number>) {
  const sorted = [...plans].sort((a, b) => a.price - b.price);
  return sorted.find((p) => Object.entries(values).every(([k, v]) => (p.limits[k] ?? Infinity) >= v)) ?? null;
}

export function PricingUsageCalculator({
  eyebrow = "Pricing calculator",
  title = "Estimate your bill before you write a line",
  subtitle = "Drag each meter to match your traffic. Every account gets the free allowance, and you only pay for what goes past it.",
  meters = defaultMeters,
  baseFee = 20,
  plans = defaultPlans,
  currency = "USD",
  locale = "en-US",
  defaultValues,
  onChange,
  cta = { label: "Start with this setup", href: "#" },
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PricingUsageCalculatorProps) {
  const [values, setValues] = React.useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const m of meters) init[m.id] = defaultValues?.[m.id] ?? m.defaultValue;
    return init;
  });

  const money = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [locale, currency],
  );
  const rateFmt = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 4 }),
    [locale, currency],
  );
  const num = React.useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }), [locale]);

  const costs = meters.map((m) => Math.max(0, (values[m.id] ?? 0) - m.included) * m.rate);
  const usageTotal = costs.reduce((a, b) => a + b, 0);
  const total = baseFee + usageTotal;
  const plan = fitPlan(plans, values);
  const saving = plan ? total - plan.price : 0;

  const update = (id: string, v: number) => {
    const next = { ...values, [id]: v };
    setValues(next);
    const t = baseFee + meters.reduce((s, m) => s + Math.max(0, (next[m.id] ?? 0) - m.included) * m.rate, 0);
    onChange?.(next, t);
  };

  return (
    <section className={`hb-vh2 ${className}`} style={{ "--hb-vh2-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-pricing-usage-calculator" precedence="default">{css}</style>
      <div className="hb-vh2-inner">
        {eyebrow ? <p className="hb-vh2-eyebrow"><b>$</b> {eyebrow}</p> : null}
        <h2 className="hb-vh2-title">{title}</h2>
        {subtitle ? <p className="hb-vh2-sub">{subtitle}</p> : null}
        <div className="hb-vh2-body">
          <div className="hb-vh2-panel hb-vh2-meters">
            {meters.map((m) => {
              const v = values[m.id] ?? 0;
              const pct = ((v - m.min) / (m.max - m.min)) * 100;
              const freePct = ((Math.min(m.included, m.max) - m.min) / (m.max - m.min)) * 100;
              return (
                <div key={m.id} className="hb-vh2-meter" style={{ "--c": m.color } as React.CSSProperties}>
                  <div className="hb-vh2-mhead">
                    <label className="hb-vh2-mlabel" htmlFor={`hb-vh2-${m.id}`}>
                      <span className="hb-vh2-dot" aria-hidden="true" />
                      {m.label}
                    </label>
                    <span className="hb-vh2-mval">
                      {num.format(v)} <small>{m.unit}</small>
                    </span>
                  </div>
                  <div className="hb-vh2-range">
                    <div className="hb-vh2-rail" aria-hidden="true">
                      <div className="hb-vh2-fill" style={{ width: `${pct.toFixed(2)}%` }} />
                      <div className="hb-vh2-free" style={{ width: `${freePct.toFixed(2)}%` }} />
                    </div>
                    <input
                      id={`hb-vh2-${m.id}`}
                      className="hb-vh2-input"
                      type="range"
                      min={m.min}
                      max={m.max}
                      step={m.step}
                      value={v}
                      aria-valuetext={`${num.format(v)} ${m.unit}`}
                      onChange={(e) => update(m.id, Number(e.target.value))}
                    />
                  </div>
                  <div className="hb-vh2-mfoot">
                    <span>{num.format(m.included)} {m.unit} free</span>
                    <span>{rateFmt.format(m.rate)} / extra {m.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="hb-vh2-panel hb-vh2-receipt">
            <span className="hb-vh2-total-label">Pay as you go, estimated</span>
            <div className="hb-vh2-total" aria-live="polite">
              <strong>{money.format(total)}</strong>
              <span>/ month</span>
            </div>
            <div className="hb-vh2-stack" aria-hidden="true">
              <div className="hb-vh2-seg" style={{ flexGrow: baseFee, "--c": "#5a5a60" } as React.CSSProperties} />
              {meters.map((m, i) => (
                <div key={m.id} className="hb-vh2-seg" style={{ flexGrow: costs[i], "--c": m.color } as React.CSSProperties} />
              ))}
            </div>
            <ul className="hb-vh2-lines">
              <li>
                <span>Platform fee</span>
                <span>{money.format(baseFee)}</span>
              </li>
              {meters.map((m, i) => (
                <li key={m.id} data-free={costs[i] === 0 ? "true" : undefined} style={{ "--c": m.color } as React.CSSProperties}>
                  <span><span className="hb-vh2-dot" aria-hidden="true" />{m.label}</span>
                  <span>{costs[i] === 0 ? "Included" : money.format(costs[i])}</span>
                </li>
              ))}
            </ul>
            <div className="hb-vh2-fit">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 2l2.2 4.6 5 .7-3.6 3.5.9 5L10 13.4 5.5 15.8l.9-5L2.8 7.3l5-.7z" fill="currentColor" />
              </svg>
              <span key={plan ? `${plan.name}-${saving > 0}` : "none"} className="hb-vh2-fit-text">
                {plan && saving > 0 ? (
                  <>Best fit: <b>{plan.name}</b> at {money.format(plan.price)} flat. You would save <b>{money.format(saving)}</b> a month.</>
                ) : plan ? (
                  <>Pay as you go is cheapest here. <b>{plan.name}</b> covers this usage if you want a fixed bill.</>
                ) : (
                  <>This is past every plan limit. <b>Talk to us</b> about committed-use discounts.</>
                )}
              </span>
            </div>
            <div className="hb-vh2-plans" style={{ "--n": plans.length } as React.CSSProperties}>
              {plans.map((p) => (
                <div
                  key={p.name}
                  className="hb-vh2-plan"
                  data-fit={plan?.name === p.name ? "true" : undefined}
                  data-over={!Object.entries(values).every(([k, v]) => (p.limits[k] ?? Infinity) >= v) ? "true" : undefined}
                >
                  <b>{p.name}</b>
                  {money.format(p.price)}
                </div>
              ))}
            </div>
            <div className="hb-vh2-ctawrap">
              <a className="hb-vh2-cta" href={cta.href}>{cta.label}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
