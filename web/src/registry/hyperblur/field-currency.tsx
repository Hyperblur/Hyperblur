"use client";

import * as React from "react";

export interface FieldCurrencyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  label?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (amount: number, currency: string) => void;
  currency?: string;
  defaultCurrency?: string;
  currencies?: string[];
  onCurrencyChange?: (currency: string) => void;
  locale?: string;
  max?: number;
  maxLabel?: string;
  rates?: Record<string, number>;
  convertTo?: string;
  quickAmounts?: number[];
  accent?: string;
  disabled?: boolean;
}

const css = `
.hb-xg10 {
  --hb-xg10-c: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-xg10 *, .hb-xg10 *::before, .hb-xg10 *::after { box-sizing: border-box; }
.hb-xg10[data-disabled="true"] { opacity: 0.5; pointer-events: none; }
.hb-xg10-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin: 0 0 7px; font-size: 12.5px; font-weight: 500; color: #a1a1a1; }
.hb-xg10-bal { font-size: 11.5px; font-weight: 400; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-xg10-box {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 62px;
  padding: 0 8px 0 16px;
  border: 1px solid #262626;
  border-radius: 14px;
  background: linear-gradient(180deg, #161616, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 1px 2px rgba(0, 0, 0, 0.5);
  cursor: text;
  transition: border-color 0.2s ease, box-shadow 0.25s ease;
}
.hb-xg10-box:hover { border-color: #333; }
.hb-xg10-box:focus-within {
  border-color: var(--hb-xg10-c);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 0 4px color-mix(in srgb, var(--hb-xg10-c) 16%, transparent);
}
.hb-xg10[data-over="true"] .hb-xg10-box { border-color: #f2555a; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 0 4px rgba(242, 85, 90, 0.14); animation: hb-xg10-shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xg10-amt {
  position: relative;
  display: flex;
  align-items: baseline;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-family: var(--font-grotesk), var(--font-sans), sans-serif;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.15;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.hb-xg10-ch { display: inline-block; animation: hb-xg10-roll 0.32s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xg10-ch[data-kind="currency"] { margin-right: 2px; font-size: 0.72em; color: #8f8f8f; animation: none; align-self: flex-start; margin-top: 0.18em; }
.hb-xg10-ch[data-kind="group"], .hb-xg10-ch[data-kind="decimal"] { color: #6f6f6f; animation: none; }
.hb-xg10-ch[data-kind="fraction"] { font-size: 0.72em; color: #a1a1a1; }
.hb-xg10[data-zero="true"] .hb-xg10-ch:not([data-kind="currency"]) { color: #4a4a4a; }
.hb-xg10-caret { display: inline-block; width: 2px; height: 0.9em; margin-left: 3px; align-self: center; border-radius: 1px; background: var(--hb-xg10-c); opacity: 0; }
.hb-xg10-box:focus-within .hb-xg10-caret { opacity: 1; animation: hb-xg10-blink 1.1s steps(2, jump-none) infinite; }
.hb-xg10-in { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; padding: 0; border: 0; opacity: 0; cursor: text; font-size: 16px; }
.hb-xg10-cur { position: relative; flex: none; }
.hb-xg10-sel {
  height: 34px;
  margin: 0;
  padding: 0 26px 0 10px;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  background: linear-gradient(180deg, #1f1f1f, #161616);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  color: #ededed;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
.hb-xg10-sel:focus-visible { outline: 2px solid var(--hb-xg10-c); outline-offset: 2px; }
.hb-xg10-sel option { background: #161616; color: #ededed; }
.hb-xg10-cur svg { position: absolute; right: 10px; top: 50%; width: 10px; height: 10px; margin-top: -5px; color: #8f8f8f; pointer-events: none; }
.hb-xg10-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 9px; }
.hb-xg10-chips { display: flex; gap: 5px; }
.hb-xg10-chip {
  height: 26px;
  margin: 0;
  padding: 0 10px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #121212;
  color: #a1a1a1;
  font: inherit;
  font-size: 11.5px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xg10-chip:hover { border-color: #3a3a3a; color: #ededed; }
.hb-xg10-chip:active { transform: scale(0.93); }
.hb-xg10-chip:focus-visible { outline: 2px solid var(--hb-xg10-c); outline-offset: 2px; }
.hb-xg10-conv { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11.5px; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-xg10[data-over="true"] .hb-xg10-conv { color: #ff7a7a; }
@keyframes hb-xg10-roll { from { opacity: 0; transform: translateY(55%); filter: blur(2px); } }
@keyframes hb-xg10-blink { 50% { opacity: 0; } }
@keyframes hb-xg10-shake { 20%, 60% { transform: translateX(-4px); } 40%, 80% { transform: translateX(4px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xg10 * { transition: none !important; animation: none !important; }
  .hb-xg10[data-over="true"] .hb-xg10-box { animation: none; }
}
`;

const defaultRates: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, BRL: 5.42, JPY: 151.3, CAD: 1.37, AUD: 1.52, CHF: 0.88 };

function digitsOf(currency: string, locale: string) {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).resolvedOptions().maximumFractionDigits ?? 2;
  } catch {
    return 2;
  }
}

function fmt(amount: number, currency: string, locale: string) {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

function partsOf(amount: number, currency: string, locale: string) {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).formatToParts(amount);
  } catch {
    return [{ type: "integer", value: amount.toFixed(0) }] as Intl.NumberFormatPart[];
  }
}

export function FieldCurrency({
  label = "Amount",
  value,
  defaultValue = 0,
  onChange,
  currency,
  defaultCurrency = "USD",
  currencies = ["USD", "EUR", "GBP", "BRL", "JPY", "CAD"],
  onCurrencyChange,
  locale = "en-US",
  max,
  maxLabel = "Available",
  rates = defaultRates,
  convertTo = "EUR",
  quickAmounts = [10, 50, 100],
  accent = "#2f7bff",
  disabled = false,
  className = "",
  style,
  ...rest
}: FieldCurrencyProps) {
  const id = React.useId();
  const [innerCur, setInnerCur] = React.useState(defaultCurrency);
  const cur = currency ?? innerCur;
  const frac = digitsOf(cur, locale);
  const scale = Math.pow(10, frac);
  const controlled = value !== undefined;
  const [innerMinor, setInnerMinor] = React.useState(Math.round(defaultValue * scale));
  const minor = controlled ? Math.round(value * scale) : innerMinor;
  const amount = minor / scale;
  const over = max !== undefined && amount > max;

  function setMinor(n: number) {
    const clamped = Math.max(0, Math.min(n, 99999999999));
    if (!controlled) setInnerMinor(clamped);
    onChange?.(clamped / scale, cur);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      if (String(minor).length >= 11) return;
      setMinor(minor * 10 + Number(e.key));
    } else if (e.key === "Backspace") {
      e.preventDefault();
      setMinor(Math.floor(minor / 10));
    } else if (e.key === "Delete" || e.key === "Escape") {
      e.preventDefault();
      setMinor(0);
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const stepMinor = (e.shiftKey ? 10 : 1) * scale;
      setMinor(minor + (e.key === "ArrowUp" ? stepMinor : -stepMinor));
    }
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const raw = e.clipboardData.getData("text").replace(/[^\d.,]/g, "");
    if (!raw) return;
    const lastSep = Math.max(raw.lastIndexOf("."), raw.lastIndexOf(","));
    const hasFrac = lastSep >= 0 && raw.length - lastSep - 1 <= frac && raw.length - lastSep - 1 > 0;
    const whole = (hasFrac ? raw.slice(0, lastSep) : raw).replace(/[.,]/g, "");
    const part = hasFrac ? raw.slice(lastSep + 1).padEnd(frac, "0") : "".padEnd(frac, "0");
    setMinor(Number(`${whole || "0"}${part}`));
  }

  function changeCurrency(next: string) {
    if (currency === undefined) setInnerCur(next);
    onCurrencyChange?.(next);
    const nf = digitsOf(next, locale);
    const nextMinor = Math.round(amount * Math.pow(10, nf));
    if (!controlled) setInnerMinor(nextMinor);
    onChange?.(nextMinor / Math.pow(10, nf), next);
  }

  const parts = partsOf(amount, cur, locale);
  const chars: { ch: string; kind: string; key: string }[] = [];
  let digitPos = 0;
  for (let p = parts.length - 1; p >= 0; p--) {
    const part = parts[p];
    for (let i = part.value.length - 1; i >= 0; i--) {
      const ch = part.value[i];
      const isDigit = /\d/.test(ch);
      if (part.type === "literal" && /\s/.test(ch)) continue;
      chars.unshift({ ch, kind: part.type, key: isDigit ? `d${digitPos}-${ch}` : `${part.type}${digitPos}-${i}` });
      if (isDigit) digitPos++;
    }
  }

  const target = cur === convertTo ? "USD" : convertTo;
  const rateFrom = rates[cur];
  const rateTo = rates[target];
  const converted = rateFrom && rateTo ? (amount / rateFrom) * rateTo : null;
  const vars = { "--hb-xg10-c": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-xg10 ${className}`} style={vars} data-over={over} data-zero={minor === 0} data-disabled={disabled} {...rest}>
      <style href="hb-field-currency" precedence="default">{css}</style>
      <div className="hb-xg10-top">
        <label htmlFor={`${id}-in`}>{label}</label>
        {max !== undefined && (
          <span className="hb-xg10-bal">
            {maxLabel} {fmt(max, cur, locale)}
          </span>
        )}
      </div>
      <div className="hb-xg10-box">
        <div className="hb-xg10-amt" aria-hidden="true">
          {chars.map((c) => (
            <span key={c.key} className="hb-xg10-ch" data-kind={c.kind}>
              {c.ch}
            </span>
          ))}
          <span className="hb-xg10-caret" />
        </div>
        <input
          id={`${id}-in`}
          className="hb-xg10-in"
          inputMode="decimal"
          autoComplete="transaction-amount"
          value={fmt(amount, cur, locale)}
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, "").slice(0, 11);
            setMinor(Number(d || "0"));
          }}
          onKeyDown={onKey}
          onPaste={onPaste}
          disabled={disabled}
          aria-invalid={over}
          aria-describedby={`${id}-conv`}
        />
        <span className="hb-xg10-cur">
          <select className="hb-xg10-sel" aria-label="Currency" value={cur} onChange={(e) => changeCurrency(e.target.value)} disabled={disabled}>
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2.5 4l2.5 2.5L7.5 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="hb-xg10-foot">
        <div className="hb-xg10-chips">
          {quickAmounts.map((q) => (
            <button key={q} type="button" className="hb-xg10-chip" onClick={() => setMinor(minor + Math.round(q * scale))} disabled={disabled}>
              +{fmt(q, cur, locale).replace(/\.00$|,00$/, "")}
            </button>
          ))}
          {max !== undefined && (
            <button type="button" className="hb-xg10-chip" onClick={() => setMinor(Math.round(max * scale))} disabled={disabled}>
              Max
            </button>
          )}
        </div>
        <span className="hb-xg10-conv" id={`${id}-conv`} aria-live="polite">
          {over ? `Over by ${fmt(amount - (max ?? 0), cur, locale)}` : converted !== null && amount > 0 ? `≈ ${fmt(converted, target, locale)}` : "Digits fill from the right"}
        </span>
      </div>
    </div>
  );
}
