"use client";

import * as React from "react";

export type PayCardFormTheme = "midnight" | "aurora" | "ember" | "graphite" | "lagoon";
export type PayCardBrandId = "arc" | "twin" | "tri" | "ring" | "none";

export interface PayCardFormValues {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  brand: PayCardBrandId;
}

export interface PayCardFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "onChange" | "defaultValue"> {
  onSubmit?: (values: PayCardFormValues) => void;
  onChange?: (values: PayCardFormValues) => void;
  defaultValues?: Partial<Pick<PayCardFormValues, "number" | "name" | "expiry" | "cvc">>;
  showPreview?: boolean;
  submitLabel?: string;
  successLabel?: string;
  theme?: PayCardFormTheme;
  bank?: string;
  accent?: string;
}

type FieldName = "number" | "name" | "expiry" | "cvc";

interface Brand {
  id: PayCardBrandId;
  label: string;
  lengths: number[];
  cvc: number;
}

const css = `
.hb-qf2 {
  box-sizing: border-box;
  container-type: inline-size;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
}
.hb-qf2 *, .hb-qf2 *::before, .hb-qf2 *::after { box-sizing: border-box; }
.hb-qf2-grid { display: grid; gap: 22px; }
@container (min-width: 520px) {
  .hb-qf2-grid { grid-template-columns: minmax(0, 0.92fr) minmax(0, 1fr); align-items: center; gap: 28px; }
}
.hb-qf2-stage { min-width: 0; width: 100%; max-width: 340px; margin: 0 auto; perspective: 1100px; container-type: inline-size; }
.hb-qf2-card {
  position: relative;
  width: 100%;
  aspect-ratio: 1.586;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-qf2[data-flip="true"] .hb-qf2-card { transform: rotateY(180deg); }
.hb-qf2-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  color: #fff;
  border-radius: 5.2cqw;
  background:
    radial-gradient(120% 90% at 0% 0%, var(--hb-qf2-a), transparent 62%),
    linear-gradient(135deg, var(--hb-qf2-b), var(--hb-qf2-c));
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12) inset, 0 3cqw 7cqw -2cqw rgba(0, 0, 0, 0.65);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.hb-qf2[data-theme="midnight"] { --hb-qf2-a: #3b6dff; --hb-qf2-b: #14214f; --hb-qf2-c: #070b1c; }
.hb-qf2[data-theme="aurora"] { --hb-qf2-a: #2dd4a8; --hb-qf2-b: #3b2f8f; --hb-qf2-c: #0e0a2a; }
.hb-qf2[data-theme="ember"] { --hb-qf2-a: #ff8a4c; --hb-qf2-b: #8a1f3d; --hb-qf2-c: #1c0810; }
.hb-qf2[data-theme="graphite"] { --hb-qf2-a: #8a8f9c; --hb-qf2-b: #2b2e36; --hb-qf2-c: #0d0e12; }
.hb-qf2[data-theme="lagoon"] { --hb-qf2-a: #35d0ff; --hb-qf2-b: #0b5d8a; --hb-qf2-c: #04202e; }
.hb-qf2-front {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6.4cqw 7cqw 6cqw;
}
.hb-qf2-top { display: flex; align-items: center; justify-content: space-between; }
.hb-qf2-bank { font-size: 4.2cqw; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.92; }
.hb-qf2-nfc { width: 6.4cqw; height: 6.4cqw; fill: none; stroke: #fff; stroke-width: 1.7; stroke-linecap: round; opacity: 0.85; }
.hb-qf2-chip {
  display: block;
  width: 12.6cqw;
  height: 9.6cqw;
  border-radius: 1.8cqw;
  background:
    linear-gradient(90deg, transparent 32%, rgba(80, 55, 10, 0.5) 32% 34%, transparent 34% 66%, rgba(80, 55, 10, 0.5) 66% 68%, transparent 68%),
    linear-gradient(0deg, transparent 46%, rgba(80, 55, 10, 0.5) 46% 54%, transparent 54%),
    linear-gradient(135deg, #f5dc9a, #c8a24e 55%, #efd58f);
}
.hb-qf2-cf { border-radius: 1.6cqw; margin: -1cqw -1.4cqw; padding: 1cqw 1.4cqw; min-width: 0; transition: background-color 0.3s ease, box-shadow 0.3s ease; }
.hb-qf2-cf[data-on="true"] { background: rgba(255, 255, 255, 0.14); box-shadow: 0 0 0 0.45cqw rgba(255, 255, 255, 0.6); }
.hb-qf2-cf[data-empty="true"] > * { opacity: 0.45; }
.hb-qf2-cnum {
  display: flex;
  gap: 3cqw;
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 6.2cqw;
  letter-spacing: 0.04em;
  line-height: 1.1;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}
.hb-qf2-bot { display: flex; align-items: flex-end; justify-content: space-between; gap: 3cqw; }
.hb-qf2-meta { display: flex; min-width: 0; flex: 1; align-items: flex-end; gap: 5cqw; }
.hb-qf2-clab { display: block; margin-bottom: 0.6cqw; font-size: 2.5cqw; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.6; }
.hb-qf2-cv {
  display: block;
  overflow: hidden;
  font-size: 4cqw;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}
.hb-qf2-cmark { width: 14cqw; height: 9.6cqw; flex: none; }
.hb-qf2-back { transform: rotateY(180deg); }
.hb-qf2-stripe { position: absolute; left: 0; right: 0; top: 10cqw; height: 14cqw; background: #08080a; }
.hb-qf2-sign {
  position: absolute;
  left: 7cqw;
  right: 7cqw;
  top: 31cqw;
  display: flex;
  align-items: center;
  height: 10cqw;
  overflow: hidden;
  background: repeating-linear-gradient(135deg, #f1efe8 0 1.4cqw, #dcd9cf 1.4cqw 2.8cqw);
  border-radius: 1.2cqw;
}
.hb-qf2-code {
  min-width: 14cqw;
  margin-left: auto;
  padding: 1cqw 2.4cqw;
  background: #fff;
  color: #14151a;
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 5cqw;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-align: right;
}
.hb-qf2-fields { display: flex; min-width: 0; flex-direction: column; gap: 12px; }
.hb-qf2-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; }
.hb-qf2-field { min-width: 0; }
.hb-qf2-lab { display: block; margin-bottom: 6px; color: #a1a1a1; font-size: 12px; font-weight: 500; letter-spacing: 0.01em; }
.hb-qf2-ctl { position: relative; display: flex; align-items: center; }
.hb-qf2-in {
  width: 100%;
  height: 42px;
  margin: 0;
  padding: 0 12px;
  color: #ededed;
  font: inherit;
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}
.hb-qf2-in::placeholder { color: #5f5f5f; }
.hb-qf2-in:hover { border-color: #3a3a3a; }
.hb-qf2-in:focus-visible { border-color: var(--hb-qf2-x); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qf2-x) 28%, transparent); }
.hb-qf2-field[data-bad="true"] .hb-qf2-in { border-color: #ff5d6c; box-shadow: 0 0 0 3px rgba(255, 93, 108, 0.16); }
.hb-qf2-field[data-ok="true"] .hb-qf2-in { padding-right: 70px; }
.hb-qf2-tail { position: absolute; right: 10px; display: flex; align-items: center; gap: 8px; pointer-events: none; }
.hb-qf2-mini { width: 26px; height: 18px; }
.hb-qf2-tick { width: 16px; height: 16px; fill: none; stroke: #3ddc97; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.hb-qf2-err {
  display: grid;
  grid-template-rows: 0fr;
  margin: 0;
  color: #ff7a86;
  font-size: 12px;
  opacity: 0;
  transition: grid-template-rows 0.25s ease, opacity 0.25s ease, margin 0.25s ease;
}
.hb-qf2-err > span { min-height: 0; overflow: hidden; }
.hb-qf2-field[data-bad="true"] .hb-qf2-err { grid-template-rows: 1fr; margin-top: 5px; opacity: 1; }
.hb-qf2-field[data-bad="true"] .hb-qf2-ctl { animation: hb-qf2-shake 0.35s ease; }
.hb-qf2-go {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 44px;
  margin: 2px 0 0;
  padding: 0 16px;
  overflow: hidden;
  color: #fff;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  background: var(--hb-qf2-x);
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0));
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease;
}
.hb-qf2-go:hover { transform: translateY(-1px); }
.hb-qf2-go:active { transform: scale(0.98); }
.hb-qf2-go:focus-visible { outline: 2px solid var(--hb-qf2-x); outline-offset: 3px; }
.hb-qf2-go[data-done="true"] { background-color: #15803d; }
.hb-qf2-go > span { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 8px; transition: opacity 0.25s ease, transform 0.3s ease; }
.hb-qf2-go > span:last-child { opacity: 0; transform: translateY(60%); }
.hb-qf2-go[data-done="true"] > span:first-child { opacity: 0; transform: translateY(-60%); }
.hb-qf2-go[data-done="true"] > span:last-child { opacity: 1; transform: none; }
@keyframes hb-qf2-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qf2-card, .hb-qf2-in, .hb-qf2-err, .hb-qf2-go, .hb-qf2-go > span { transition: none; }
  .hb-qf2-field[data-bad="true"] .hb-qf2-ctl { animation: none; }
}
`;

export function detectPayCardBrand(digits: string): Brand {
  if (/^4/.test(digits)) return { id: "arc", label: "Arc", lengths: [16], cvc: 3 };
  if (/^(5[1-5]|2(2[2-9]|[3-6]|7[01]|720))/.test(digits)) return { id: "twin", label: "Twin", lengths: [16], cvc: 3 };
  if (/^3[47]/.test(digits)) return { id: "tri", label: "Tri", lengths: [15], cvc: 4 };
  if (/^6/.test(digits)) return { id: "ring", label: "Ring", lengths: [16, 17, 18, 19], cvc: 3 };
  return { id: "none", label: "Card", lengths: [13, 14, 15, 16, 17, 18, 19], cvc: 3 };
}

export function isLuhnValid(digits: string) {
  let sum = 0;
  let flip = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = digits.charCodeAt(i) - 48;
    if (flip) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    flip = !flip;
  }
  return digits.length > 0 && sum % 10 === 0;
}

function formatNumber(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 19);
  if (/^3[47]/.test(digits)) {
    return [digits.slice(0, 4), digits.slice(4, 10), digits.slice(10, 15)].filter(Boolean).join(" ");
  }
  return (digits.match(/.{1,4}/g) ?? []).join(" ");
}

function formatExpiry(raw: string, prev: string) {
  let digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length === 1 && digits > "1") digits = `0${digits}`;
  if (digits.length < 2) return digits;
  if (digits.length === 2) return raw.length < prev.length ? digits : `${digits}/`;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function checkNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "Enter your card number";
  const brand = detectPayCardBrand(digits);
  if (digits.length < Math.min(...brand.lengths)) return "Card number looks incomplete";
  if (!brand.lengths.includes(digits.length)) return "Check the number of digits";
  if (!isLuhnValid(digits)) return "This card number is not valid";
  return "";
}

function checkExpiry(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 4) return "Use the MM/YY format";
  const month = Number(digits.slice(0, 2));
  const year = 2000 + Number(digits.slice(2));
  if (month < 1 || month > 12) return "Month must be 01 to 12";
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;
  if (year < thisYear || (year === thisYear && month < thisMonth)) return "This card has expired";
  if (year > thisYear + 20) return "Check the expiry year";
  return "";
}

function checkCvc(value: string, brand: Brand) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== brand.cvc) return `Enter the ${brand.cvc}-digit code`;
  return "";
}

function checkName(value: string) {
  return value.trim().length < 2 ? "Enter the name on the card" : "";
}

function Mark({ kind, className }: { kind: PayCardBrandId; className: string }) {
  if (kind === "none") return null;
  return (
    <svg className={className} viewBox="0 0 56 38" aria-hidden="true">
      {kind === "twin" && (
        <>
          <circle cx="20" cy="19" r="14" fill="#fff" fillOpacity="0.7" />
          <circle cx="36" cy="19" r="14" fill="#fff" fillOpacity="0.38" />
        </>
      )}
      {kind === "tri" && (
        <>
          <path d="M6 33 L16 5 H24 L14 33 Z" fill="#fff" fillOpacity="0.4" />
          <path d="M20 33 L30 5 H38 L28 33 Z" fill="#fff" fillOpacity="0.62" />
          <path d="M34 33 L44 5 H52 L42 33 Z" fill="#fff" fillOpacity="0.85" />
        </>
      )}
      {kind === "arc" && (
        <>
          <path d="M8 31 A22 22 0 0 1 48 31" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="5" strokeLinecap="round" />
          <path d="M16 31 A14 14 0 0 1 40 31" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {kind === "ring" && (
        <>
          <circle cx="28" cy="19" r="14" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="5" />
          <circle cx="28" cy="19" r="5" fill="#fff" fillOpacity="0.85" />
        </>
      )}
    </svg>
  );
}

interface CardFieldProps {
  name: FieldName;
  uid: string;
  label: string;
  error: string;
  value: string;
  ok?: boolean;
  tail?: React.ReactNode;
  inputRef: (el: HTMLInputElement | null) => void;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  format?: (raw: string) => string;
  onValue: (name: FieldName, value: string) => void;
  onFocus: (name: FieldName) => void;
  onBlur: (name: FieldName) => void;
}

function CardField({ name, uid, label, error, value, ok, tail, inputRef, inputProps, format, onValue, onFocus, onBlur }: CardFieldProps) {
  const id = `${uid}-${name}`;
  const errorId = `${id}-e`;
  return (
    <div className="hb-qf2-field" data-bad={Boolean(error)} data-ok={Boolean(ok)}>
      <label className="hb-qf2-lab" htmlFor={id}>
        {label}
      </label>
      <div className="hb-qf2-ctl">
        <input
          ref={inputRef}
          id={id}
          className="hb-qf2-in"
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          value={value}
          onChange={(e) => onValue(name, format ? format(e.target.value) : e.target.value)}
          onFocus={() => onFocus(name)}
          onBlur={() => onBlur(name)}
          {...inputProps}
        />
        {tail}
      </div>
      <p id={errorId} className="hb-qf2-err" aria-live="polite">
        <span>{error}</span>
      </p>
    </div>
  );
}

export function PayCardForm({
  onSubmit,
  onChange,
  defaultValues,
  showPreview = true,
  submitLabel = "Pay now",
  successLabel = "Card accepted",
  theme = "midnight",
  bank = "Northvale",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PayCardFormProps) {
  const uid = React.useId();
  const inputs = React.useRef<Record<FieldName, HTMLInputElement | null>>({ number: null, expiry: null, cvc: null, name: null });
  const timer = React.useRef(0);
  const [values, setValues] = React.useState({
    number: formatNumber(defaultValues?.number ?? ""),
    name: defaultValues?.name ?? "",
    expiry: formatExpiry(defaultValues?.expiry ?? "", ""),
    cvc: (defaultValues?.cvc ?? "").replace(/\D/g, "").slice(0, 4),
  });
  const [errors, setErrors] = React.useState<Record<FieldName, string>>({ number: "", name: "", expiry: "", cvc: "" });
  const [touched, setTouched] = React.useState<Record<FieldName, boolean>>({ number: false, name: false, expiry: false, cvc: false });
  const [focused, setFocused] = React.useState<FieldName | null>(null);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const digits = values.number.replace(/\D/g, "");
  const brand = detectPayCardBrand(digits);
  const numberOk = brand.lengths.includes(digits.length) && isLuhnValid(digits);

  function validate(field: FieldName, next: typeof values) {
    const nextBrand = detectPayCardBrand(next.number.replace(/\D/g, ""));
    if (field === "number") return checkNumber(next.number);
    if (field === "expiry") return checkExpiry(next.expiry);
    if (field === "cvc") return checkCvc(next.cvc, nextBrand);
    return checkName(next.name);
  }

  function emit(next: typeof values) {
    const nextBrand = detectPayCardBrand(next.number.replace(/\D/g, ""));
    onChange?.({ ...next, number: next.number.replace(/\D/g, ""), brand: nextBrand.id });
  }

  function update(field: FieldName, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    setDone(false);
    if (touched[field] || errors[field]) setErrors((e) => ({ ...e, [field]: validate(field, next) }));
    emit(next);
    if (field === "number") {
      const nextDigits = value.replace(/\D/g, "");
      const nextBrand = detectPayCardBrand(nextDigits);
      if (nextBrand.id !== "none" && nextDigits.length === Math.max(...nextBrand.lengths) && isLuhnValid(nextDigits)) {
        inputs.current.expiry?.focus();
      }
    }
    if (field === "expiry" && value.replace(/\D/g, "").length === 4 && !checkExpiry(value)) inputs.current.cvc?.focus();
  }

  function blur(field: FieldName) {
    setFocused((f) => (f === field ? null : f));
    setTouched((t) => ({ ...t, [field]: true }));
    if (values[field]) setErrors((e) => ({ ...e, [field]: validate(field, values) }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const order: FieldName[] = ["number", "expiry", "cvc", "name"];
    const next = { number: "", name: "", expiry: "", cvc: "" };
    for (const f of order) next[f] = validate(f, values);
    setErrors(next);
    setTouched({ number: true, name: true, expiry: true, cvc: true });
    const first = order.find((f) => next[f]);
    if (first) {
      inputs.current[first]?.focus();
      return;
    }
    onSubmit?.({ ...values, number: digits, brand: brand.id });
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 2400);
  }

  const groups = (() => {
    const len = brand.id === "tri" ? 15 : Math.max(16, digits.length);
    const padded = digits.padEnd(len, "•");
    if (brand.id === "tri") return [padded.slice(0, 4), padded.slice(4, 10), padded.slice(10, 15)];
    return padded.match(/.{1,4}/g) ?? [];
  })();
  const cardName = values.name.trim().slice(0, 26);
  const expiryDigits = values.expiry.replace(/\D/g, "");
  const slots = "MM/YY".split("");
  [0, 1, 3, 4].forEach((at, i) => {
    if (i < expiryDigits.length) slots[at] = expiryDigits[i];
  });

  const vars = { "--hb-qf2-x": accent, ...style } as React.CSSProperties;

  return (
    <form
      noValidate
      className={`hb-qf2 ${className}`}
      style={vars}
      data-theme={theme}
      data-flip={focused === "cvc"}
      onSubmit={submit}
      {...rest}
    >
      <style href="hb-pay-card-form" precedence="default">{css}</style>
      <div className="hb-qf2-grid">
        {showPreview && (
          <div className="hb-qf2-stage" aria-hidden="true">
            <div className="hb-qf2-card">
              <div className="hb-qf2-face hb-qf2-front">
                <div className="hb-qf2-top">
                  <span className="hb-qf2-bank">{bank}</span>
                  <svg className="hb-qf2-nfc" viewBox="0 0 24 24">
                    <path d="M6 9.5a4 4 0 0 1 0 5M9.5 7a8 8 0 0 1 0 10M13 4.5a12 12 0 0 1 0 15M16.5 2a16 16 0 0 1 0 20" />
                  </svg>
                </div>
                <span className="hb-qf2-chip" />
                <div className="hb-qf2-cf" data-on={focused === "number"} data-empty={digits.length === 0}>
                  <div className="hb-qf2-cnum">
                    {groups.map((g, i) => (
                      <span key={i}>{g}</span>
                    ))}
                  </div>
                </div>
                <div className="hb-qf2-bot">
                  <div className="hb-qf2-meta">
                    <div className="hb-qf2-cf" data-on={focused === "name"} data-empty={cardName.length === 0} style={{ flex: 1 }}>
                      <span className="hb-qf2-clab">Card holder</span>
                      <span className="hb-qf2-cv">{cardName || "Full name"}</span>
                    </div>
                    <div className="hb-qf2-cf" data-on={focused === "expiry"} data-empty={expiryDigits.length === 0}>
                      <span className="hb-qf2-clab">Expires</span>
                      <span className="hb-qf2-cv">{slots.join("")}</span>
                    </div>
                  </div>
                  <Mark kind={brand.id === "none" ? "arc" : brand.id} className="hb-qf2-cmark" />
                </div>
              </div>
              <div className="hb-qf2-face hb-qf2-back">
                <div className="hb-qf2-stripe" />
                <div className="hb-qf2-sign">
                  <span className="hb-qf2-code">{values.cvc || "•".repeat(brand.cvc)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="hb-qf2-fields">
          <CardField
            name="number"
            uid={uid}
            error={errors.number}
            value={values.number}
            onValue={update}
            onFocus={setFocused}
            onBlur={blur}
            label="Card number"
            inputRef={(el) => { inputs.current.number = el; }}
            ok={numberOk}
            inputProps={{ type: "text", inputMode: "numeric", autoComplete: "cc-number", placeholder: "4242 4242 4242 4242", maxLength: 23 }}
            format={formatNumber}
            tail={
              <span className="hb-qf2-tail">
                {numberOk && (
                  <svg className="hb-qf2-tick" viewBox="0 0 16 16" aria-label="Valid number">
                    <path d="M3 8.5l3.2 3.2L13 4.8" />
                  </svg>
                )}
                {brand.id !== "none" && (
                  <span style={{ display: "inline-flex" }} title={brand.label}>
                    <Mark kind={brand.id} className="hb-qf2-mini" />
                  </span>
                )}
              </span>
            }
          />
          <div className="hb-qf2-row">
            <CardField
              name="expiry"
            uid={uid}
            error={errors.expiry}
            value={values.expiry}
            onValue={update}
            onFocus={setFocused}
            onBlur={blur}
              label="Expiry"
              inputRef={(el) => { inputs.current.expiry = el; }}
              inputProps={{ type: "text", inputMode: "numeric", autoComplete: "cc-exp", placeholder: "MM/YY", maxLength: 5 }}
              format={(v) => formatExpiry(v, values.expiry)}
            />
            <CardField
              name="cvc"
            uid={uid}
            error={errors.cvc}
            value={values.cvc}
            onValue={update}
            onFocus={setFocused}
            onBlur={blur}
              label="CVC"
              inputRef={(el) => { inputs.current.cvc = el; }}
              inputProps={{ type: "text", inputMode: "numeric", autoComplete: "cc-csc", placeholder: brand.cvc === 4 ? "1234" : "123", maxLength: 4 }}
              format={(v) => v.replace(/\D/g, "").slice(0, brand.cvc)}
            />
          </div>
          <CardField
            name="name"
            uid={uid}
            error={errors.name}
            value={values.name}
            onValue={update}
            onFocus={setFocused}
            onBlur={blur}
            label="Name on card"
            inputRef={(el) => { inputs.current.name = el; }}
            inputProps={{ type: "text", autoComplete: "cc-name", placeholder: "Alex Morgan", maxLength: 40 }}
          />
          <button type="submit" className="hb-qf2-go" data-done={done}>
            <span>{submitLabel}</span>
            <span aria-live="polite">{done ? successLabel : ""}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
