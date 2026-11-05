"use client";

import * as React from "react";

export type PricingSeatsBilling = "monthly" | "yearly";

export interface PricingSeatsPlan {
  name: string;
  description: string;
  seatPrice: number;
  maxSeats?: number;
  features: string[];
  cta: string;
}

export interface PricingSeatsBand {
  upTo: number;
  discount: number;
}

export interface PricingSeatsSliderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingSeatsPlan[];
  bands?: PricingSeatsBand[];
  min?: number;
  max?: number;
  seats?: number;
  defaultSeats?: number;
  onSeatsChange?: (seats: number) => void;
  defaultBilling?: PricingSeatsBilling;
  yearlyDiscount?: number;
  currency?: string;
  onPlanSelect?: (plan: PricingSeatsPlan, seats: number, total: number, billing: PricingSeatsBilling) => void;
  accent?: string;
}

const defaultPlans: PricingSeatsPlan[] = [
  { name: "Starter", description: "For small crews getting organized.", seatPrice: 12, maxSeats: 10, features: ["Unlimited projects", "5 GB per seat", "Email support"], cta: "Start free trial" },
  { name: "Team", description: "Shared workflows for growing teams.", seatPrice: 20, features: ["Everything in Starter", "Approvals and roles", "50 GB per seat", "Priority chat"], cta: "Choose Team" },
  { name: "Business", description: "Controls for regulated operations.", seatPrice: 32, features: ["Everything in Team", "SSO and SCIM", "Audit log export", "Named success manager"], cta: "Choose Business" },
];

const defaultBands: PricingSeatsBand[] = [
  { upTo: 10, discount: 0 },
  { upTo: 50, discount: 0.15 },
  { upTo: Infinity, discount: 0.3 },
];

const css = `
.hb-yi9 {
  --hb-yi9-accent: #6d4aff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #f7f5ef;
  color: #15141a;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yi9 *, .hb-yi9 *::before, .hb-yi9 *::after { box-sizing: border-box; }
.hb-yi9-inner { max-width: 1120px; margin: 0 auto; padding: 72px 20px 80px; }
.hb-yi9-head { display: grid; justify-items: center; text-align: center; }
.hb-yi9-eyebrow { margin: 0 0 14px; font-size: 13px; font-weight: 600; color: var(--hb-yi9-accent); }
.hb-yi9-title { margin: 0; font-size: clamp(30px, 5cqi, 52px); line-height: 1.04; letter-spacing: -.04em; font-weight: 650; max-width: 18ch; }
.hb-yi9-sub { margin: 14px 0 0; max-width: 520px; font-size: 16px; line-height: 1.6; color: #66625a; }
.hb-yi9-bill { position: relative; display: inline-flex; margin-top: 26px; padding: 4px; border-radius: 999px; background: #ebe8df; border: 1px solid rgba(21, 20, 26, .06); }
.hb-yi9-bill::before {
  content: ""; position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc(50% - 4px); border-radius: 999px; background: #fff;
  box-shadow: 0 1px 2px rgba(21, 20, 26, .12), 0 0 0 1px rgba(21, 20, 26, .05); transition: transform .4s cubic-bezier(.3, 1.3, .5, 1);
}
.hb-yi9-bill[data-v="yearly"]::before { transform: translateX(100%); }
.hb-yi9-bill button { position: relative; width: 130px; height: 36px; border: 0; background: transparent; font: inherit; font-size: 14px; font-weight: 500; color: #66625a; cursor: pointer; border-radius: 999px; }
.hb-yi9-bill button[aria-pressed="true"] { color: #15141a; }
.hb-yi9-bill b { margin-left: 6px; padding: 1px 6px; border-radius: 999px; font-size: 11px; color: #0f7a4f; background: #d8f3e6; }
.hb-yi9-panel {
  margin-top: 40px; padding: 24px; border-radius: 22px; background: #fff; border: 1px solid rgba(21, 20, 26, .08);
  box-shadow: 0 1px 0 #fff inset, 0 24px 50px -32px rgba(21, 20, 26, .3); display: grid; gap: 20px;
}
.hb-yi9-q { margin: 0; font-size: 14px; color: #66625a; }
.hb-yi9-seats { display: flex; align-items: baseline; gap: 10px; margin-top: 6px; }
.hb-yi9-seats strong { font-size: 44px; line-height: 1; letter-spacing: -.04em; font-weight: 650; font-variant-numeric: tabular-nums; }
.hb-yi9-seats span { font-size: 15px; color: #66625a; }
.hb-yi9-range { -webkit-appearance: none; appearance: none; width: 100%; height: 28px; background: transparent; cursor: pointer; margin: 0; }
.hb-yi9-range::-webkit-slider-runnable-track { height: 8px; border-radius: 99px; background: linear-gradient(90deg, var(--hb-yi9-accent) calc(var(--hb-yi9-p) * 1%), #ebe8df 0); }
.hb-yi9-range::-moz-range-track { height: 8px; border-radius: 99px; background: linear-gradient(90deg, var(--hb-yi9-accent) calc(var(--hb-yi9-p) * 1%), #ebe8df 0); }
.hb-yi9-range::-webkit-slider-thumb {
  -webkit-appearance: none; width: 26px; height: 26px; margin-top: -9px; border-radius: 50%; background: #fff; border: 0;
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--hb-yi9-accent) 18%, transparent), 0 2px 8px rgba(21, 20, 26, .3); transition: box-shadow .2s, transform .2s;
}
.hb-yi9-range::-moz-range-thumb { width: 26px; height: 26px; border-radius: 50%; background: #fff; border: 0; box-shadow: 0 0 0 6px color-mix(in srgb, var(--hb-yi9-accent) 18%, transparent), 0 2px 8px rgba(21, 20, 26, .3); }
.hb-yi9-range:active::-webkit-slider-thumb { transform: scale(1.1); }
.hb-yi9-range:focus-visible { outline: none; }
.hb-yi9-range:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 4px #fff, 0 0 0 7px var(--hb-yi9-accent); }
.hb-yi9-range:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 4px #fff, 0 0 0 7px var(--hb-yi9-accent); }
.hb-yi9-ticks { display: flex; justify-content: space-between; margin-top: 4px; font-size: 12px; color: #9a958a; font-variant-numeric: tabular-nums; }
.hb-yi9-crowd { display: flex; flex-wrap: wrap; gap: 5px; align-content: flex-start; }
.hb-yi9-dot { width: 16px; height: 16px; border-radius: 50%; background: #ebe8df; transition: background .3s, transform .35s cubic-bezier(.3, 1.6, .5, 1); }
.hb-yi9-dot[data-on="true"] { transform: scale(1); }
.hb-yi9-dot[data-on="false"] { transform: scale(.6); }
.hb-yi9-more { font-size: 12px; font-weight: 600; color: var(--hb-yi9-accent); align-self: center; margin-left: 4px; }
.hb-yi9-bands { display: flex; flex-wrap: wrap; gap: 8px; }
.hb-yi9-band { padding: 6px 10px; border-radius: 10px; font-size: 12px; color: #66625a; background: #f7f5ef; border: 1px solid transparent; transition: background .3s, color .3s, border-color .3s; }
.hb-yi9-band[data-on="true"] { color: color-mix(in srgb, var(--hb-yi9-accent) 80%, #000); background: color-mix(in srgb, var(--hb-yi9-accent) 9%, #fff); border-color: color-mix(in srgb, var(--hb-yi9-accent) 30%, transparent); }
.hb-yi9-plans { display: grid; gap: 14px; margin-top: 18px; }
.hb-yi9-plan {
  position: relative; display: flex; flex-direction: column; padding: 24px; border-radius: 20px; background: #fff; border: 1px solid rgba(21, 20, 26, .08);
  transition: border-color .3s, box-shadow .3s, opacity .3s, transform .3s;
}
.hb-yi9-plan[data-best="true"] { border-color: var(--hb-yi9-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-yi9-accent) 14%, transparent), 0 30px 60px -36px color-mix(in srgb, var(--hb-yi9-accent) 70%, #000); }
.hb-yi9-plan[data-off="true"] { opacity: .55; }
.hb-yi9-flag { position: absolute; top: -11px; left: 24px; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; color: #fff; background: var(--hb-yi9-accent); animation: hb-yi9-pop .4s cubic-bezier(.3, 1.6, .5, 1) both; }
.hb-yi9-plan h3 { margin: 0; font-size: 17px; font-weight: 600; }
.hb-yi9-plan > p { margin: 4px 0 0; font-size: 14px; color: #66625a; }
.hb-yi9-price { display: flex; align-items: baseline; gap: 6px; margin-top: 18px; }
.hb-yi9-total { display: inline-flex; font-size: 40px; line-height: 1; letter-spacing: -.04em; font-weight: 650; font-variant-numeric: tabular-nums; }
.hb-yi9-per { font-size: 14px; color: #66625a; }
.hb-yi9-col { display: inline-block; height: 1em; overflow: hidden; }
.hb-yi9-strip { display: flex; flex-direction: column; transition: transform .6s cubic-bezier(.2, .9, .25, 1); }
.hb-yi9-strip span { height: 1em; line-height: 1; }
.hb-yi9-each { margin: 6px 0 0; font-size: 13px; color: #8a857a; }
.hb-yi9-rows { list-style: none; margin: 16px 0 0; padding: 12px 0 0; border-top: 1px dashed rgba(21, 20, 26, .14); display: grid; gap: 6px; }
.hb-yi9-rows li { display: flex; justify-content: space-between; gap: 10px; font-size: 13px; color: #66625a; font-variant-numeric: tabular-nums; }
.hb-yi9-rows li b { color: #15141a; font-weight: 600; }
.hb-yi9-feat { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 8px; }
.hb-yi9-feat li { display: flex; gap: 8px; font-size: 14px; color: #34322c; }
.hb-yi9-feat svg { width: 16px; height: 16px; flex: none; margin-top: 2px; color: var(--hb-yi9-accent); }
.hb-yi9-cta {
  margin-top: auto; padding-top: 22px;
}
.hb-yi9-cta button {
  width: 100%; height: 44px; border-radius: 12px; border: 1px solid rgba(21, 20, 26, .14); background: #fff; color: #15141a; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
  transition: background .2s, color .2s, border-color .2s, transform .2s;
}
.hb-yi9-cta button:hover:not(:disabled) { transform: translateY(-1px); border-color: rgba(21, 20, 26, .3); }
.hb-yi9-plan[data-best="true"] .hb-yi9-cta button { background: var(--hb-yi9-accent); border-color: transparent; color: #fff; }
.hb-yi9-cta button:disabled { cursor: not-allowed; }
.hb-yi9-cta button:focus-visible, .hb-yi9-bill button:focus-visible { outline: 2px solid var(--hb-yi9-accent); outline-offset: 2px; }
.hb-yi9-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-yi9-pop { from { opacity: 0; transform: translateY(6px) scale(.9); } to { opacity: 1; transform: none; } }
@container (min-width: 820px) {
  .hb-yi9-inner { padding: 104px 32px 112px; }
  .hb-yi9-panel { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); padding: 28px 32px; gap: 36px; align-items: center; }
  .hb-yi9-plans { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yi9-strip, .hb-yi9-dot, .hb-yi9-plan, .hb-yi9-bill::before, .hb-yi9-band, .hb-yi9-cta button, .hb-yi9-range::-webkit-slider-thumb { transition: none; }
  .hb-yi9-flag { animation: none; }
}
`;

function group(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Roll({ text }: { text: string }) {
  const chars = text.split("");
  return (
    <span className="hb-yi9-total" aria-hidden="true">
      {chars.map((c, i) => {
        const key = chars.length - i;
        if (c < "0" || c > "9") return <span key={`s${key}`}>{c}</span>;
        const d = Number(c);
        return (
          <span key={`d${key}`} className="hb-yi9-col">
            <span className="hb-yi9-strip" style={{ transform: `translateY(${(-d * 10).toFixed(0)}%)` }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

function breakdown(seats: number, base: number, bands: PricingSeatsBand[]) {
  let from = 0;
  const rows: { from: number; to: number; count: number; rate: number }[] = [];
  for (const b of bands) {
    const to = Math.min(seats, b.upTo);
    const count = Math.max(0, to - from);
    if (count > 0) rows.push({ from: from + 1, to, count, rate: base * (1 - b.discount) });
    from = Math.max(from, b.upTo);
    if (from >= seats) break;
  }
  return rows;
}

const crowdColors = ["#6d4aff", "#e2553f", "#1f8a5b", "#d4a017", "#2f7bff", "#c04fd8"];

export function PricingSeatsSlider({
  eyebrow = "Pricing that scales down",
  title = "Pay per seat. The more people, the less each costs.",
  subtitle = "Seats 11 to 50 are 15 percent off, every seat after 50 is 30 percent off. Drag to see your exact bill.",
  plans = defaultPlans,
  bands = defaultBands,
  min = 1,
  max = 200,
  seats,
  defaultSeats = 24,
  onSeatsChange,
  defaultBilling = "yearly",
  yearlyDiscount = 0.2,
  currency = "$",
  onPlanSelect,
  accent = "#6d4aff",
  className = "",
  style,
  ...rest
}: PricingSeatsSliderProps) {
  const [inner, setInner] = React.useState(defaultSeats);
  const [billing, setBilling] = React.useState<PricingSeatsBilling>(defaultBilling);
  const count = Math.min(max, Math.max(min, seats ?? inner));
  const factor = billing === "yearly" ? 1 - yearlyDiscount : 1;
  const pct = ((count - min) / Math.max(1, max - min)) * 100;
  const id = React.useId();

  const change = (v: number) => {
    if (seats === undefined) setInner(v);
    onSeatsChange?.(v);
  };

  const priced = plans.map((p) => {
    const rows = breakdown(count, p.seatPrice * factor, bands);
    const total = rows.reduce((s, r) => s + r.count * r.rate, 0);
    return { p, rows, total, off: p.maxSeats !== undefined && count > p.maxSeats };
  });
  const bestIndex = (() => {
    const open = priced.map((x, i) => ({ ...x, i })).filter((x) => !x.off);
    if (!open.length) return -1;
    if (count <= 10) return open[0].i;
    if (count > 100) return open[open.length - 1].i;
    return open[Math.min(1, open.length - 1)].i;
  })();

  const shown = Math.min(count, 40);
  const vars = { "--hb-yi9-accent": accent, "--hb-yi9-p": pct.toFixed(2), ...style } as React.CSSProperties;

  return (
    <section className={`hb-yi9 ${className}`} style={vars} {...rest}>
      <style href="hb-pricing-seats-slider" precedence="default">{css}</style>
      <div className="hb-yi9-inner">
        <div className="hb-yi9-head">
          {eyebrow ? <p className="hb-yi9-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-yi9-title">{title}</h2>
          {subtitle ? <p className="hb-yi9-sub">{subtitle}</p> : null}
          <div className="hb-yi9-bill" data-v={billing} role="group" aria-label="Billing period">
            <button type="button" aria-pressed={billing === "monthly"} onClick={() => setBilling("monthly")}>
              Monthly
            </button>
            <button type="button" aria-pressed={billing === "yearly"} onClick={() => setBilling("yearly")}>
              Yearly<b>{`-${Math.round(yearlyDiscount * 100)}%`}</b>
            </button>
          </div>
        </div>

        <div className="hb-yi9-panel">
          <div>
            <label className="hb-yi9-q" htmlFor={`${id}-seats`}>
              How many people are on your team?
            </label>
            <p className="hb-yi9-seats">
              <strong>{count}</strong>
              <span>{count === 1 ? "seat" : "seats"}</span>
            </p>
            <input
              id={`${id}-seats`}
              className="hb-yi9-range"
              type="range"
              min={min}
              max={max}
              value={count}
              aria-valuetext={`${count} seats`}
              onChange={(e) => change(Number(e.target.value))}
            />
            <div className="hb-yi9-ticks" aria-hidden="true">
              <span>{min}</span>
              <span>{Math.round((min + max) / 4)}</span>
              <span>{Math.round((min + max) / 2)}</span>
              <span>{max}</span>
            </div>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            <div className="hb-yi9-crowd" aria-hidden="true">
              {Array.from({ length: 40 }, (_, i) => (
                <span
                  key={i}
                  className="hb-yi9-dot"
                  data-on={i < shown}
                  style={{ background: i < shown ? crowdColors[(i * 7) % crowdColors.length] : undefined, transitionDelay: `${(i % 10) * 12}ms` }}
                />
              ))}
              {count > 40 ? <span className="hb-yi9-more">{`+${count - 40}`}</span> : null}
            </div>
            <div className="hb-yi9-bands">
              {bands.map((b, i) => {
                const lo = i === 0 ? 1 : bands[i - 1].upTo + 1;
                const label = Number.isFinite(b.upTo) ? `Seats ${lo} to ${b.upTo}` : `Seats ${lo}+`;
                return (
                  <span key={label} className="hb-yi9-band" data-on={count >= lo}>
                    {label}
                    {b.discount ? ` · ${Math.round(b.discount * 100)}% off` : " · list price"}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hb-yi9-plans">
          {priced.map(({ p, rows, total, off }, i) => {
            const best = i === bestIndex;
            const each = count > 0 ? total / count : 0;
            return (
              <article key={p.name} className="hb-yi9-plan" data-best={best} data-off={off}>
                {best ? <span className="hb-yi9-flag">{`Best for ${count} seats`}</span> : null}
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="hb-yi9-price">
                  <span className="hb-yi9-sr">
                    {off ? `${p.name} is not available above ${p.maxSeats} seats` : `${currency}${group(total)} per month`}
                  </span>
                  <Roll text={off ? `${currency}0` : `${currency}${group(total)}`} />
                  <span className="hb-yi9-per">/ month</span>
                </div>
                <p className="hb-yi9-each">
                  {off ? `Up to ${p.maxSeats} seats` : `${currency}${each.toFixed(2)} per seat, billed ${billing}`}
                </p>
                {!off ? (
                  <ul className="hb-yi9-rows">
                    {rows.map((r) => (
                      <li key={r.from}>
                        <span>{r.from === r.to ? `Seat ${r.from}` : `Seats ${r.from} to ${r.to}`}</span>
                        <span>
                          {`${r.count} × ${currency}${r.rate.toFixed(2)} = `}
                          <b>{`${currency}${group(r.count * r.rate)}`}</b>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <ul className="hb-yi9-feat">
                  {p.features.map((f) => (
                    <li key={f}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="hb-yi9-cta">
                  <button type="button" disabled={off} onClick={() => onPlanSelect?.(p, count, total, billing)}>
                    {off ? "Too many seats" : p.cta}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
