"use client";

import * as React from "react";

export type PayInterval = "monthly" | "yearly";

export interface PaySubscriptionToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "onSelect"> {
  name?: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  currency?: string;
  features?: string[];
  cta?: string;
  interval?: PayInterval;
  defaultInterval?: PayInterval;
  onChange?: (interval: PayInterval) => void;
  onSelect?: (interval: PayInterval) => void;
  accent?: string;
}

const css = `
.hb-qfa {
  box-sizing: border-box;
  container-type: inline-size;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
}
.hb-qfa *, .hb-qfa *::before, .hb-qfa *::after { box-sizing: border-box; }
.hb-qfa-card { position: relative; padding: 12px 14px 14px; overflow: hidden; background: #111111; border: 1px solid #262626; border-radius: 14px; }
.hb-qfa-card::before {
  content: "";
  position: absolute;
  right: -40px;
  top: -60px;
  width: 180px;
  height: 140px;
  pointer-events: none;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-qfa-x) 26%, transparent), transparent);
  opacity: 0.7;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-qfa[data-interval="yearly"] .hb-qfa-card::before { transform: translateX(-20px) scale(1.15); }
.hb-qfa-top { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hb-qfa-name { margin: 0; font-size: 14px; font-weight: 600; }
.hb-qfa-seg { position: relative; display: grid; grid-template-columns: 1fr 1fr; padding: 3px; background: #0a0a0a; border: 1px solid #2a2a2a; border-radius: 999px; }
.hb-qfa-pill {
  position: absolute;
  left: 3px;
  top: 3px;
  bottom: 3px;
  width: calc(50% - 3px);
  background: #ededed;
  border-radius: 999px;
  transition: transform 0.4s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.hb-qfa[data-interval="yearly"] .hb-qfa-pill { transform: translateX(100%); }
.hb-qfa-opt {
  position: relative;
  min-width: 64px;
  height: 24px;
  margin: 0;
  padding: 0 10px;
  color: #a1a1a1;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  background: none;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.3s ease;
}
.hb-qfa-opt[aria-checked="true"] { color: #0a0a0a; }
.hb-qfa-opt:focus-visible { outline: 2px solid var(--hb-qfa-x); outline-offset: 2px; }
.hb-qfa-mid { position: relative; display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; margin-top: 8px; }
.hb-qfa-price { display: flex; align-items: baseline; gap: 4px; font-size: 34px; font-weight: 650; letter-spacing: -0.03em; line-height: 1; }
.hb-qfa-price small { color: #8f8f8f; font-size: 13px; font-weight: 500; letter-spacing: 0; }
.hb-qfa-save {
  flex: none;
  margin-bottom: 4px;
  padding: 3px 9px;
  color: #7ff0bd;
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
  background: rgba(61, 220, 151, 0.14);
  border: 1px solid rgba(61, 220, 151, 0.3);
  border-radius: 999px;
  opacity: 0;
  transform: scale(0.7) translateY(4px);
  transform-origin: right bottom;
  transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-qfa[data-interval="yearly"] .hb-qfa-save { opacity: 1; transform: none; }
.hb-qfa-bill { position: relative; margin: 4px 0 0; color: #8f8f8f; font-size: 12px; }
.hb-qfa-list { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 4px 12px; margin: 10px 0 0; padding: 0; list-style: none; }
.hb-qfa-list li { display: flex; align-items: center; gap: 6px; min-width: 0; color: #cfcfcf; font-size: 12px; }
.hb-qfa-list span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qfa-list svg { flex: none; width: 13px; height: 13px; fill: none; stroke: var(--hb-qfa-x); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.hb-qfa-go {
  position: relative;
  display: block;
  width: 100%;
  height: 34px;
  margin: 10px 0 0;
  padding: 0;
  color: #fff;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  background: var(--hb-qfa-x);
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0));
  border: 0;
  border-radius: 9px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-qfa-go:hover { transform: translateY(-1px); }
.hb-qfa-go:active { transform: scale(0.98); }
.hb-qfa-go:focus-visible { outline: 2px solid var(--hb-qfa-x); outline-offset: 3px; }
.hb-qfa-roll { position: relative; display: inline-flex; align-items: flex-start; height: calc(var(--hb-qfa-lh) * 1em); font-variant-numeric: tabular-nums; line-height: var(--hb-qfa-lh); white-space: pre; --hb-qfa-lh: 1.1; }
.hb-qfa-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.hb-qfa-d { display: inline-block; height: calc(var(--hb-qfa-lh) * 1em); overflow: hidden; }
.hb-qfa-dc { display: flex; flex-direction: column; transition: transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1); }
.hb-qfa-dc > span { display: block; height: calc(var(--hb-qfa-lh) * 1em); }
@container (max-width: 270px) {
  .hb-qfa-list { grid-template-columns: 1fr; }
  .hb-qfa-top { flex-direction: column; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qfa-card::before, .hb-qfa-pill, .hb-qfa-opt, .hb-qfa-save, .hb-qfa-go, .hb-qfa-dc { transition: none; }
}
`;

function fmt(value: number, currency: string) {
  const rounded = Math.round(value * 100) / 100;
  const whole = Math.floor(rounded);
  const cents = Math.round((rounded - whole) * 100);
  const wholeText = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return cents === 0 ? `${currency}${wholeText}` : `${currency}${wholeText}.${cents.toString().padStart(2, "0")}`;
}

function Roll({ text }: { text: string }) {
  const chars = text.split("");
  return (
    <span className="hb-qfa-roll">
      <span className="hb-qfa-sr">{text}</span>
      {chars.map((ch, i) => {
        const key = chars.length - i;
        if (ch < "0" || ch > "9") {
          return (
            <span key={key} aria-hidden="true">
              {ch}
            </span>
          );
        }
        return (
          <span key={key} className="hb-qfa-d" aria-hidden="true">
            <span className="hb-qfa-dc" style={{ transform: `translateY(calc(${Number(ch)} * var(--hb-qfa-lh) * -1em))` }}>
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function PaySubscriptionToggle({
  name = "Studio",
  monthlyPrice = 15,
  yearlyPrice = 144,
  currency = "$",
  features = ["Unlimited projects", "Priority support", "Team seats", "Export to PDF"],
  cta = "Start free trial",
  interval,
  defaultInterval = "yearly",
  onChange,
  onSelect,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PaySubscriptionToggleProps) {
  const [inner, setInner] = React.useState<PayInterval>(defaultInterval);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const current = interval ?? inner;
  const yearly = current === "yearly";
  const perMonth = yearly ? yearlyPrice / 12 : monthlyPrice;
  const savePct = Math.max(0, Math.round((1 - yearlyPrice / (monthlyPrice * 12)) * 100));
  const options: { id: PayInterval; label: string }[] = [
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  function choose(next: PayInterval) {
    if (interval === undefined) setInner(next);
    if (next !== current) onChange?.(next);
  }

  function onKey(event: React.KeyboardEvent, index: number) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const next = 1 - index;
    refs.current[next]?.focus();
    choose(options[next].id);
  }

  const vars = { "--hb-qfa-x": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-qfa ${className}`} style={vars} data-interval={current} {...rest}>
      <style href="hb-pay-subscription-toggle" precedence="default">{css}</style>
      <div className="hb-qfa-card">
        <div className="hb-qfa-top">
          <p className="hb-qfa-name">{name}</p>
          <div className="hb-qfa-seg" role="radiogroup" aria-label="Billing interval">
            <span className="hb-qfa-pill" aria-hidden="true" />
            {options.map((o, i) => (
              <button
                key={o.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="radio"
                className="hb-qfa-opt"
                aria-checked={current === o.id}
                tabIndex={current === o.id ? 0 : -1}
                onClick={() => choose(o.id)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div className="hb-qfa-mid">
          <div className="hb-qfa-price">
            <Roll text={fmt(perMonth, currency)} />
            <small>/ month</small>
          </div>
          {savePct > 0 && <span className="hb-qfa-save">Save {savePct}%</span>}
        </div>
        <p className="hb-qfa-bill">{yearly ? `Billed ${fmt(yearlyPrice, currency)} once a year` : "Billed monthly, cancel anytime"}</p>
        {features.length > 0 && (
          <ul className="hb-qfa-list">
            {features.slice(0, 4).map((f) => (
              <li key={f}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8.5l3.2 3.2L13 4.8" />
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <button type="button" className="hb-qfa-go" onClick={() => onSelect?.(current)}>
            {cta}
          </button>
        )}
      </div>
    </div>
  );
}
