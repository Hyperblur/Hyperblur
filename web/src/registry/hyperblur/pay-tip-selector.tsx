"use client";

import * as React from "react";

export interface PayTipChange {
  percent: number | null;
  amount: number;
  total: number;
}

export interface PayTipSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  subtotal?: number;
  currency?: string;
  options?: number[];
  percent?: number | null;
  defaultPercent?: number | null;
  onChange?: (tip: PayTipChange) => void;
  title?: string;
  note?: string;
  allowCustom?: boolean;
  accent?: string;
}

const css = `
.hb-qf8 {
  box-sizing: border-box;
  width: 100%;
  padding: 12px 14px;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  background: #111111;
  border: 1px solid #262626;
  border-radius: 14px;
}
.hb-qf8 *, .hb-qf8 *::before, .hb-qf8 *::after { box-sizing: border-box; }
.hb-qf8-hd { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.hb-qf8-hd b { font-size: 13.5px; font-weight: 600; }
.hb-qf8-hd span { overflow: hidden; color: #8f8f8f; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-qf8-chips { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 6px; margin: 10px 0 0; }
.hb-qf8-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 42px;
  margin: 0;
  padding: 0 4px;
  color: #ededed;
  font: inherit;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.25s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  -webkit-tap-highlight-color: transparent;
}
.hb-qf8-chip:hover { border-color: #3d3d3d; }
.hb-qf8-chip:active { transform: scale(0.96); }
.hb-qf8-chip:focus-visible { outline: 2px solid var(--hb-qf8-x); outline-offset: 2px; }
.hb-qf8-chip[aria-pressed="true"] {
  background: color-mix(in srgb, var(--hb-qf8-x) 16%, #0a0a0a);
  border-color: var(--hb-qf8-x);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qf8-x) 14%, transparent);
}
.hb-qf8-chip b { font-size: 13px; font-weight: 600; line-height: 1.2; }
.hb-qf8-chip span { color: #8f8f8f; font-size: 11px; font-variant-numeric: tabular-nums; line-height: 1.2; }
.hb-qf8-chip[aria-pressed="true"] span { color: color-mix(in srgb, var(--hb-qf8-x) 50%, #fff); }
.hb-qf8-rows { margin: 8px 0 0; }
.hb-qf8-row { display: flex; align-items: center; justify-content: space-between; min-height: 22px; margin: 0; color: #a1a1a1; }
.hb-qf8-row dd { margin: 0; color: #ededed; font-weight: 500; }
.hb-qf8-total { margin-top: 4px; padding-top: 6px; color: #ededed; border-top: 1px dashed #333333; }
.hb-qf8-total dt { font-weight: 600; }
.hb-qf8-total dd { font-size: 20px; font-weight: 650; letter-spacing: -0.02em; }
.hb-qf8-field {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  color: #ededed;
  background: #0a0a0a;
  border: 1px solid var(--hb-qf8-x);
  border-radius: 8px;
  animation: hb-qf8-in 0.3s ease both;
}
.hb-qf8-field:focus-within { box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qf8-x) 25%, transparent); }
.hb-qf8-field span { color: #8f8f8f; }
.hb-qf8-field input {
  width: 64px;
  margin: 0 0 0 3px;
  padding: 0;
  color: inherit;
  font: inherit;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  text-align: right;
  background: none;
  border: 0;
  outline: none;
}
.hb-qf8-roll { position: relative; display: inline-flex; align-items: flex-start; height: calc(var(--hb-qf8-lh) * 1em); font-variant-numeric: tabular-nums; line-height: var(--hb-qf8-lh); white-space: pre; --hb-qf8-lh: 1.25; }
.hb-qf8-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.hb-qf8-d { display: inline-block; height: calc(var(--hb-qf8-lh) * 1em); overflow: hidden; }
.hb-qf8-dc { display: flex; flex-direction: column; transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1); }
.hb-qf8-dc > span { display: block; height: calc(var(--hb-qf8-lh) * 1em); }
@keyframes hb-qf8-in { from { opacity: 0; transform: translateX(6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-qf8-chip, .hb-qf8-dc { transition: none; }
  .hb-qf8-field { animation: none; }
}
`;

function money(cents: number, currency: string) {
  const whole = Math.floor(cents / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${currency}${whole}.${(cents % 100).toString().padStart(2, "0")}`;
}

function Roll({ text }: { text: string }) {
  const chars = text.split("");
  return (
    <span className="hb-qf8-roll">
      <span className="hb-qf8-sr">{text}</span>
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
          <span key={key} className="hb-qf8-d" aria-hidden="true">
            <span className="hb-qf8-dc" style={{ transform: `translateY(calc(${Number(ch)} * var(--hb-qf8-lh) * -1em))` }}>
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

export function PayTipSelector({
  subtotal = 4200,
  currency = "$",
  options = [10, 15, 20],
  percent,
  defaultPercent = 15,
  onChange,
  title = "Add a tip",
  note = "100% goes to the team",
  allowCustom = true,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PayTipSelectorProps) {
  const [innerPercent, setInnerPercent] = React.useState<number | null>(defaultPercent);
  const [custom, setCustom] = React.useState("5.00");
  const current = percent === undefined ? innerPercent : percent;
  const isCustom = current === null;

  const amount = isCustom
    ? Math.round(Math.max(0, parseFloat(custom) || 0) * 100)
    : Math.round((subtotal * (current ?? 0)) / 100);
  const total = subtotal + amount;

  function emit(nextPercent: number | null, nextCustom: string) {
    const nextAmount =
      nextPercent === null
        ? Math.round(Math.max(0, parseFloat(nextCustom) || 0) * 100)
        : Math.round((subtotal * nextPercent) / 100);
    onChange?.({ percent: nextPercent, amount: nextAmount, total: subtotal + nextAmount });
  }

  function pick(next: number | null) {
    if (percent === undefined) setInnerPercent(next);
    emit(next, custom);
  }

  function onCustom(raw: string) {
    const cleaned = raw.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1").replace(/^(\d*\.\d{0,2}).*$/, "$1").slice(0, 7);
    setCustom(cleaned);
    emit(null, cleaned);
  }

  const chips: { key: string; label: string; value: number | null; sub: string }[] = [
    { key: "none", label: "No tip", value: 0, sub: money(0, currency) },
    ...options.map((p) => ({ key: `p${p}`, label: `${p}%`, value: p, sub: money(Math.round((subtotal * p) / 100), currency) })),
  ];
  if (allowCustom) chips.push({ key: "custom", label: "Custom", value: null, sub: "Other" });

  const vars = { "--hb-qf8-x": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-qf8 ${className}`} style={vars} {...rest}>
      <style href="hb-pay-tip-selector" precedence="default">{css}</style>
      <div className="hb-qf8-hd">
        <b>{title}</b>
        {note && <span>{note}</span>}
      </div>
      <div className="hb-qf8-chips" role="group" aria-label={title}>
        {chips.map((chip) => (
          <button key={chip.key} type="button" className="hb-qf8-chip" aria-pressed={current === chip.value} onClick={() => pick(chip.value)}>
            <b>{chip.label}</b>
            <span>{chip.sub}</span>
          </button>
        ))}
      </div>
      <dl className="hb-qf8-rows">
        <div className="hb-qf8-row">
          <dt>Subtotal</dt>
          <dd>
            <Roll text={money(subtotal, currency)} />
          </dd>
        </div>
        <div className="hb-qf8-row">
          <dt>Tip</dt>
          <dd>
            {isCustom ? (
              <label className="hb-qf8-field">
                <span>{currency}</span>
                <input
                  type="text"
                  inputMode="decimal"
                  aria-label="Custom tip amount"
                  value={custom}
                  onChange={(e) => onCustom(e.target.value)}
                />
              </label>
            ) : (
              <Roll text={money(amount, currency)} />
            )}
          </dd>
        </div>
        <div className="hb-qf8-row hb-qf8-total">
          <dt>Total</dt>
          <dd>
            <Roll text={money(total, currency)} />
          </dd>
        </div>
      </dl>
    </div>
  );
}
