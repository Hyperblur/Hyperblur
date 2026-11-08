"use client";

import * as React from "react";

export type FieldCardBrand = "visa" | "mastercard" | "amex" | "discover" | "unknown";

export interface FieldCardValue {
  number: string;
  expiry: string;
  cvc: string;
  brand: FieldCardBrand;
  complete: boolean;
}

export interface FieldCardNumberProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  label?: string;
  accent?: string;
  defaultNumber?: string;
  defaultExpiry?: string;
  defaultCvc?: string;
  hint?: string;
  disabled?: boolean;
  onChange?: (value: FieldCardValue) => void;
  onComplete?: (value: FieldCardValue) => void;
}

const css = `
.hb-xg1 {
  --hb-xg1-c: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-xg1 *, .hb-xg1 *::before, .hb-xg1 *::after { box-sizing: border-box; }
.hb-xg1-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 7px;
  font-size: 12.5px;
  font-weight: 500;
  color: #a1a1a1;
}
.hb-xg1-lock { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: #6f6f6f; }
.hb-xg1-lock svg { width: 11px; height: 11px; }
.hb-xg1-box {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 12px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: linear-gradient(180deg, #161616, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 1px 2px rgba(0, 0, 0, 0.5);
  transition: border-color 0.2s ease, box-shadow 0.25s ease;
  overflow: hidden;
}
.hb-xg1-box:hover { border-color: #333; }
.hb-xg1-box:focus-within {
  border-color: var(--hb-xg1-c);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 0 4px color-mix(in srgb, var(--hb-xg1-c) 16%, transparent);
}
.hb-xg1[data-state="error"] .hb-xg1-box {
  border-color: #f2555a;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 0 0 4px rgba(242, 85, 90, 0.14);
  animation: hb-xg1-shake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
.hb-xg1[data-disabled="true"] { opacity: 0.5; pointer-events: none; }
.hb-xg1-glyph { flex: none; width: 30px; height: 20px; perspective: 240px; }
.hb-xg1-card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.3, 1.35, 0.5, 1);
}
.hb-xg1[data-flip="true"] .hb-xg1-card { transform: rotateY(180deg); }
.hb-xg1-face {
  position: absolute;
  inset: 0;
  border-radius: 4px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12), 0 2px 6px rgba(0, 0, 0, 0.5);
}
.hb-xg1-front { background: linear-gradient(135deg, #3a3a3a, #1d1d1d); transition: background 0.35s ease; }
.hb-xg1[data-brand="visa"] .hb-xg1-front { background: linear-gradient(135deg, #3d64ff, #1b2a8a); }
.hb-xg1[data-brand="mastercard"] .hb-xg1-front { background: linear-gradient(135deg, #ff8a3d, #b3261e); }
.hb-xg1[data-brand="amex"] .hb-xg1-front { background: linear-gradient(135deg, #4fd1c5, #1d6f8a); }
.hb-xg1[data-brand="discover"] .hb-xg1-front { background: linear-gradient(135deg, #ffb347, #c25e00); }
.hb-xg1-chip { position: absolute; left: 4px; top: 5px; width: 7px; height: 5px; border-radius: 1.5px; background: linear-gradient(135deg, #f3d77a, #b08a2e); }
.hb-xg1-brand {
  position: absolute;
  right: 3px;
  bottom: 2px;
  font-family: var(--font-grotesk), var(--font-sans), sans-serif;
  font-size: 6px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.92);
}
.hb-xg1-back { transform: rotateY(180deg); background: linear-gradient(135deg, #2c2c2c, #151515); }
.hb-xg1-stripe { position: absolute; left: 0; right: 0; top: 4px; height: 4px; background: #050505; }
.hb-xg1-cvcbox { position: absolute; right: 3px; top: 11px; width: 10px; height: 5px; border-radius: 1px; background: #fff; box-shadow: 0 0 0 1.5px var(--hb-xg1-c); }
.hb-xg1-num {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  max-width: 100%;
  height: 100%;
  transition: max-width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xg1[data-collapsed="true"] .hb-xg1-num { max-width: 84px; }
.hb-xg1-in {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14.5px;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
  caret-color: var(--hb-xg1-c);
}
.hb-xg1-in::placeholder { color: #565656; }
.hb-xg1-num .hb-xg1-in { transition: opacity 0.25s ease; }
.hb-xg1[data-collapsed="true"] .hb-xg1-num .hb-xg1-in { opacity: 0; }
.hb-xg1-last {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14.5px;
  font-variant-numeric: tabular-nums;
  color: #ededed;
  white-space: nowrap;
  cursor: text;
  opacity: 0;
  transform: translateX(10px);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xg1-last span { color: #6f6f6f; letter-spacing: 0.08em; }
.hb-xg1[data-collapsed="true"] .hb-xg1-last { opacity: 1; transform: none; pointer-events: auto; }
.hb-xg1-rest {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: none;
  max-width: 0;
  height: 100%;
  opacity: 0;
  transform: translateX(14px);
  transition: max-width 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease 0.08s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xg1[data-reveal="true"] .hb-xg1-rest { max-width: 150px; opacity: 1; transform: none; }
.hb-xg1-sep { width: 1px; height: 18px; flex: none; background: #262626; }
.hb-xg1-exp { width: 56px; flex: none; }
.hb-xg1-cvc { width: 42px; flex: none; }
.hb-xg1-help {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 18px;
  margin-top: 8px;
  font-size: 12.5px;
  color: #8f8f8f;
}
.hb-xg1-help svg { width: 14px; height: 14px; flex: none; }
.hb-xg1[data-state="error"] .hb-xg1-help { color: #ff6b6f; }
.hb-xg1[data-state="ok"] .hb-xg1-help { color: #5fd38d; }
.hb-xg1-tick { stroke-dasharray: 20; stroke-dashoffset: 20; animation: hb-xg1-draw 0.45s cubic-bezier(0.65, 0, 0.35, 1) forwards 0.1s; }
.hb-xg1-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xg1-shake {
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
@keyframes hb-xg1-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xg1 *, .hb-xg1 *::before { transition: none !important; animation: none !important; }
  .hb-xg1[data-state="error"] .hb-xg1-box { animation: none; }
  .hb-xg1-tick { stroke-dashoffset: 0; }
}
`;

const brandLabel: Record<FieldCardBrand, string> = {
  visa: "VISA",
  mastercard: "MC",
  amex: "AMEX",
  discover: "DISC",
  unknown: "",
};

const brandName: Record<FieldCardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  discover: "Discover",
  unknown: "Card",
};

function brandOf(d: string): FieldCardBrand {
  if (/^4/.test(d)) return "visa";
  if (/^3[47]/.test(d)) return "amex";
  if (/^(5[1-5]|2[2-7])/.test(d)) return "mastercard";
  if (/^(6011|65|64[4-9])/.test(d)) return "discover";
  return "unknown";
}

function groupsOf(brand: FieldCardBrand) {
  return brand === "amex" ? [4, 6, 5] : [4, 4, 4, 4];
}

function lengthOf(brand: FieldCardBrand) {
  return brand === "amex" ? 15 : 16;
}

function formatNumber(d: string, brand: FieldCardBrand) {
  const out: string[] = [];
  let i = 0;
  for (const g of groupsOf(brand)) {
    if (i >= d.length) break;
    out.push(d.slice(i, i + g));
    i += g;
  }
  return out.join(" ");
}

function luhn(d: string) {
  let sum = 0;
  let dbl = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = d.charCodeAt(i) - 48;
    if (dbl) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

function formatExpiry(raw: string, typing = false) {
  let d = raw.replace(/\D/g, "").slice(0, 4);
  if (typing && d.length === 1 && d > "1") d = "0" + d;
  if (d.length < 2) return d;
  if (d.length === 2) return typing ? d + " / " : d;
  return `${d.slice(0, 2)} / ${d.slice(2)}`;
}

function subscribeNone() {
  return () => {};
}

function readMonthIndex() {
  const [y, m] = new Intl.DateTimeFormat("en-CA").format().split("-").map(Number);
  return (y % 100) * 12 + m;
}

function readNull() {
  return null;
}

function caretAfterDigits(formatted: string, digits: number) {
  if (digits <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) seen++;
    if (seen === digits) return i + 1;
  }
  return formatted.length;
}

export function FieldCardNumber({
  label = "Card details",
  accent = "#2f7bff",
  defaultNumber = "",
  defaultExpiry = "",
  defaultCvc = "",
  hint = "Your card is encrypted end to end.",
  disabled = false,
  onChange,
  onComplete,
  className = "",
  style,
  ...rest
}: FieldCardNumberProps) {
  const id = React.useId();
  const numRef = React.useRef<HTMLInputElement>(null);
  const expRef = React.useRef<HTMLInputElement>(null);
  const cvcRef = React.useRef<HTMLInputElement>(null);
  const [digits, setDigits] = React.useState(defaultNumber.replace(/\D/g, "").slice(0, 16));
  const [expiry, setExpiry] = React.useState(formatExpiry(defaultExpiry));
  const [cvc, setCvc] = React.useState(defaultCvc.replace(/\D/g, "").slice(0, 4));
  const [focus, setFocus] = React.useState<"number" | "expiry" | "cvc" | null>(null);
  const [touched, setTouched] = React.useState(false);
  const now = React.useSyncExternalStore(subscribeNone, readMonthIndex, readNull);
  const completed = React.useRef(false);

  const brand = brandOf(digits);
  const max = lengthOf(brand);
  const numberFull = digits.length >= max;
  const numberValid = numberFull && luhn(digits.slice(0, max));
  const expDigits = expiry.replace(/\D/g, "");
  const month = Number(expDigits.slice(0, 2));
  const year = Number(expDigits.slice(2, 4));
  const expFull = expDigits.length === 4;
  const expValid = expFull && month >= 1 && month <= 12 && (now === null || year * 12 + month >= now);
  const cvcLen = brand === "amex" ? 4 : 3;
  const cvcValid = cvc.length === cvcLen;
  const complete = numberValid && expValid && cvcValid;

  let error = "";
  if (numberFull && !numberValid) error = "That card number doesn't look right.";
  else if (expFull && !expValid) error = month < 1 || month > 12 ? "Expiry month must be 01 to 12." : "This card has expired.";
  else if (touched && focus === null && digits.length > 0 && !numberFull) error = "Card number is incomplete.";
  else if (touched && focus === null && numberValid && cvc.length > 0 && !cvcValid) error = `Security code needs ${cvcLen} digits.`;

  const reveal = numberValid || expiry.length > 0 || cvc.length > 0;
  const collapsed = numberValid && focus !== "number";
  const state = error ? "error" : complete ? "ok" : "idle";

  const emit = React.useCallback(
    (d: string, e: string, c: string) => {
      const b = brandOf(d);
      const ed = e.replace(/\D/g, "");
      const m = Number(ed.slice(0, 2));
      const ok =
        d.length === lengthOf(b) &&
        luhn(d) &&
        ed.length === 4 &&
        m >= 1 &&
        m <= 12 &&
        c.length === (b === "amex" ? 4 : 3);
      const v: FieldCardValue = { number: d, expiry: e.replace(/\s/g, ""), cvc: c, brand: b, complete: ok };
      onChange?.(v);
      if (ok && !completed.current) {
        completed.current = true;
        onComplete?.(v);
      }
      if (!ok) completed.current = false;
    },
    [onChange, onComplete],
  );

  function onNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const el = e.target;
    const caret = el.selectionStart ?? el.value.length;
    const before = el.value.slice(0, caret).replace(/\D/g, "").length;
    const raw = el.value.replace(/\D/g, "");
    const b = brandOf(raw);
    const d = raw.slice(0, lengthOf(b));
    setDigits(d);
    emit(d, expiry, cvc);
    const formatted = formatNumber(d, b);
    requestAnimationFrame(() => {
      const pos = caretAfterDigits(formatted, Math.min(before, d.length));
      numRef.current?.setSelectionRange(pos, pos);
    });
    if (d.length === lengthOf(b) && luhn(d) && caret >= el.value.length) {
      requestAnimationFrame(() => expRef.current?.focus());
    }
  }

  function onExpiry(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const deleting = raw.length < expiry.length;
    let d = raw.replace(/\D/g, "").slice(0, 4);
    if (deleting && /\/\s?$/.test(raw)) d = d.slice(0, -1);
    const v = formatExpiry(d, !deleting);
    setExpiry(v);
    emit(digits, v, cvc);
    if (!deleting && v.replace(/\D/g, "").length === 4) requestAnimationFrame(() => cvcRef.current?.focus());
  }

  function onCvc(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/\D/g, "").slice(0, cvcLen);
    setCvc(v);
    emit(digits, expiry, v);
  }

  function back(e: React.KeyboardEvent<HTMLInputElement>, value: string, prev: React.RefObject<HTMLInputElement | null>) {
    if (e.key === "Backspace" && value.length === 0) {
      e.preventDefault();
      const el = prev.current;
      if (!el) return;
      el.focus();
      const end = el.value.length;
      el.setSelectionRange(end, end);
    }
  }

  const helpId = `${id}-help`;
  const vars = { "--hb-xg1-c": accent, ...style } as React.CSSProperties;

  return (
    <div
      className={`hb-xg1 ${className}`}
      style={vars}
      data-state={state}
      data-brand={brand}
      data-flip={focus === "cvc"}
      data-reveal={reveal}
      data-collapsed={collapsed}
      data-disabled={disabled}
      {...rest}
    >
      <style href="hb-field-card-number" precedence="default">{css}</style>
      <div className="hb-xg1-label">
        <label htmlFor={`${id}-n`}>{label}</label>
        <span className="hb-xg1-lock" aria-hidden="true">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="2.2" y="5.2" width="7.6" height="5.6" rx="1.4" />
            <path d="M4 5.2V3.8a2 2 0 0 1 4 0v1.4" />
          </svg>
          Secure
        </span>
      </div>
      <div className="hb-xg1-box" onClick={(e) => e.target === e.currentTarget && numRef.current?.focus()}>
        <div className="hb-xg1-glyph" aria-hidden="true">
          <div className="hb-xg1-card">
            <div className="hb-xg1-face hb-xg1-front">
              <span className="hb-xg1-chip" />
              <span className="hb-xg1-brand">{brandLabel[brand]}</span>
            </div>
            <div className="hb-xg1-face hb-xg1-back">
              <span className="hb-xg1-stripe" />
              <span className="hb-xg1-cvcbox" />
            </div>
          </div>
        </div>
        <div className="hb-xg1-num">
          <input
            ref={numRef}
            id={`${id}-n`}
            className="hb-xg1-in"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 1234 1234 1234"
            value={formatNumber(digits, brand)}
            onChange={onNumber}
            onFocus={() => setFocus("number")}
            onBlur={() => {
              setFocus(null);
              setTouched(true);
            }}
            disabled={disabled}
            aria-invalid={state === "error" && !numberValid}
            aria-describedby={helpId}
          />
          <span
            className="hb-xg1-last"
            aria-hidden="true"
            onMouseDown={(e) => {
              e.preventDefault();
              numRef.current?.focus();
            }}
          >
            <span>••••</span>
            {digits.slice(-4)}
          </span>
        </div>
        <div className="hb-xg1-rest">
          <span className="hb-xg1-sep" aria-hidden="true" />
          <input
            ref={expRef}
            className="hb-xg1-in hb-xg1-exp"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM / YY"
            aria-label="Expiry date"
            value={expiry}
            onChange={onExpiry}
            onKeyDown={(e) => back(e, expiry, numRef)}
            onFocus={() => setFocus("expiry")}
            onBlur={() => {
              setFocus(null);
              setTouched(true);
            }}
            tabIndex={reveal ? 0 : -1}
            disabled={disabled}
            aria-invalid={expFull && !expValid}
          />
          <input
            ref={cvcRef}
            className="hb-xg1-in hb-xg1-cvc"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder={brand === "amex" ? "CVCC" : "CVC"}
            aria-label="Security code"
            value={cvc}
            onChange={onCvc}
            onKeyDown={(e) => back(e, cvc, expRef)}
            onFocus={() => setFocus("cvc")}
            onBlur={() => {
              setFocus(null);
              setTouched(true);
            }}
            tabIndex={reveal ? 0 : -1}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="hb-xg1-help" id={helpId} aria-live="polite">
        {state === "error" ? (
          <>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="8" cy="8" r="6.3" />
              <path d="M8 4.8v3.6M8 10.9v.2" strokeLinecap="round" />
            </svg>
            {error}
          </>
        ) : state === "ok" ? (
          <>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path className="hb-xg1-tick" d="M3.5 8.4l3 3 6-6.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {brandName[brand]} ending {digits.slice(-4)}, expires {expiry.replace(/\s/g, "")}
          </>
        ) : (
          hint
        )}
      </div>
    </div>
  );
}
