"use client";

import * as React from "react";

export interface CheckoutOnePageItem {
  name: string;
  variant: string;
  price: number;
  quantity: number;
  hue: number;
}

export interface CheckoutOnePageDelivery {
  id: string;
  label: string;
  detail: string;
  price: number;
}

export interface CheckoutOnePageValues {
  email: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  delivery: string;
  method: "card" | "wallet";
  cardBrand: string;
  cardLast4: string;
  total: number;
}

export interface CheckoutOnePageProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: string;
  title?: string;
  items?: CheckoutOnePageItem[];
  deliveryOptions?: CheckoutOnePageDelivery[];
  defaultDelivery?: string;
  countries?: string[];
  currency?: string;
  taxRate?: number;
  onSubmit?: (values: CheckoutOnePageValues) => void;
  accent?: string;
}

const defaultItems: CheckoutOnePageItem[] = [
  { name: "Field Jacket", variant: "Olive / M", price: 168, quantity: 1, hue: 92 },
  { name: "Merino Crew Socks", variant: "Charcoal / 3-pack", price: 32, quantity: 2, hue: 220 },
  { name: "Canvas Weekender", variant: "Sand", price: 124, quantity: 1, hue: 36 },
];

const defaultDeliveries: CheckoutOnePageDelivery[] = [
  { id: "standard", label: "Standard", detail: "5 to 7 business days", price: 0 },
  { id: "express", label: "Express", detail: "2 business days", price: 12 },
  { id: "overnight", label: "Next day", detail: "Order before 2 pm", price: 24 },
];

const defaultCountries = ["United States", "Canada", "United Kingdom", "Germany", "Australia"];

type Fields = {
  email: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  card: string;
  expiry: string;
  cvc: string;
};

type FieldKey = keyof Fields;

const onlyDigits = (v: string) => v.replace(/\D/g, "");

function formatCard(v: string) {
  return onlyDigits(v).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(v: string) {
  const d = onlyDigits(v).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

function luhn(v: string) {
  const d = onlyDigits(v);
  if (d.length < 13) return false;
  let sum = 0;
  let double = false;
  for (let i = d.length - 1; i >= 0; i -= 1) {
    let n = d.charCodeAt(i) - 48;
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

function brandOf(v: string) {
  const d = onlyDigits(v);
  if (/^4/.test(d)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(d)) return "Mastercard";
  if (/^3[47]/.test(d)) return "Amex";
  return "Card";
}

function expiryShape(v: string) {
  const m = /^(\d{2}) \/ (\d{2})$/.exec(v);
  if (!m) return false;
  const month = Number(m[1]);
  return month >= 1 && month <= 12;
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function validate(f: Fields, method: "card" | "wallet") {
  const e: Partial<Record<FieldKey, string>> = {};
  if (!emailOk(f.email)) e.email = "Enter a valid email address.";
  if (f.name.trim().length < 2) e.name = "Enter the recipient name.";
  if (f.address.trim().length < 4) e.address = "Enter a street address.";
  if (f.city.trim().length < 2) e.city = "Enter a city.";
  if (f.postalCode.trim().length < 3) e.postalCode = "Enter a postal code.";
  if (method === "card") {
    if (!luhn(f.card)) e.card = "This card number is not valid.";
    if (!expiryShape(f.expiry)) e.expiry = "Use MM / YY.";
    if (onlyDigits(f.cvc).length < 3) e.cvc = "3 or 4 digits.";
  }
  return e;
}

const css = `
.hb-qg1 {
  --hb-qg1-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  isolation: isolate;
  overflow: clip;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-qg1 *, .hb-qg1 *::before, .hb-qg1 *::after { box-sizing: border-box; }
.hb-qg1::before {
  content: "";
  position: absolute;
  inset: -20% -10% auto auto;
  width: 60%;
  height: 70%;
  z-index: -1;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-qg1-accent) 14%, transparent), transparent 70%);
  pointer-events: none;
}
.hb-qg1-inner { max-width: 1120px; margin: 0 auto; padding: clamp(40px, 8cqw, 88px) clamp(16px, 4cqw, 32px); }
.hb-qg1-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.hb-qg1-brand { display: flex; align-items: center; gap: 10px; font-weight: 600; letter-spacing: -0.01em; }
.hb-qg1-logo { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; background: linear-gradient(140deg, var(--hb-qg1-accent), color-mix(in srgb, var(--hb-qg1-accent) 40%, #000)); box-shadow: inset 0 1px 0 rgba(255,255,255,.25); }
.hb-qg1-logo svg { width: 14px; height: 14px; color: #fff; }
.hb-qg1-secure { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #8f8f8f; border: 1px solid rgba(255,255,255,.08); border-radius: 999px; padding: 5px 10px; background: rgba(255,255,255,.02); }
.hb-qg1-secure svg { width: 12px; height: 12px; color: var(--hb-qg1-accent); }
.hb-qg1-title { margin: 28px 0 6px; font-size: clamp(26px, 4cqw, 36px); line-height: 1.1; letter-spacing: -0.03em; font-weight: 600; }
.hb-qg1-rail { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin: 18px 0 32px; }
.hb-qg1-seg { display: grid; gap: 8px; font-size: 12px; color: #8f8f8f; }
.hb-qg1-bar { height: 3px; border-radius: 3px; background: rgba(255,255,255,.08); overflow: hidden; }
.hb-qg1-bar i { display: block; height: 100%; width: 100%; background: var(--hb-qg1-accent); transform: scaleX(0); transform-origin: left; transition: transform .6s cubic-bezier(.2,.8,.2,1); }
.hb-qg1-seg[data-done="true"] { color: #ededed; }
.hb-qg1-seg[data-done="true"] .hb-qg1-bar i { transform: scaleX(1); }
.hb-qg1-grid { display: grid; gap: 28px; align-items: start; }
@container (min-width: 820px) { .hb-qg1-grid { grid-template-columns: minmax(0, 1fr) 360px; gap: 40px; } }
.hb-qg1-form { display: grid; gap: 14px; min-width: 0; }
.hb-qg1-block { border: 1px solid rgba(255,255,255,.08); border-radius: 16px; background: linear-gradient(180deg, #111, #0e0e0e); padding: 20px; box-shadow: inset 0 1px 0 rgba(255,255,255,.04); margin: 0; min-width: 0; }
.hb-qg1-legend { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; letter-spacing: -0.01em; padding: 0; margin-bottom: 14px; }
.hb-qg1-num { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; font-size: 11px; border: 1px solid rgba(255,255,255,.14); color: #a1a1a1; transition: background .3s, color .3s, border-color .3s; }
.hb-qg1-block[data-done="true"] .hb-qg1-num { background: var(--hb-qg1-accent); border-color: var(--hb-qg1-accent); color: #fff; }
.hb-qg1-row { display: grid; gap: 12px; }
@container (min-width: 560px) { .hb-qg1-row-2 { grid-template-columns: 1fr 1fr; } .hb-qg1-row-3 { grid-template-columns: 1.4fr 1fr 1fr; } }
.hb-qg1-field { display: grid; gap: 6px; min-width: 0; }
.hb-qg1-label { font-size: 12px; color: #a1a1a1; }
.hb-qg1-input, .hb-qg1-select { width: 100%; height: 44px; border-radius: 10px; border: 1px solid rgba(255,255,255,.1); background: #0a0a0a; color: #ededed; font: inherit; font-size: 14px; padding: 0 12px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-qg1-select { appearance: none; background-image: linear-gradient(45deg, transparent 50%, #8f8f8f 50%), linear-gradient(135deg, #8f8f8f 50%, transparent 50%); background-position: calc(100% - 18px) 19px, calc(100% - 13px) 19px; background-size: 5px 5px; background-repeat: no-repeat; }
.hb-qg1-input::placeholder { color: #5c5c5c; }
.hb-qg1-input:focus, .hb-qg1-select:focus { border-color: var(--hb-qg1-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qg1-accent) 22%, transparent); }
.hb-qg1-input[aria-invalid="true"] { border-color: #f87171; }
.hb-qg1-err { font-size: 12px; color: #f87171; }
.hb-qg1-cardwrap { position: relative; }
.hb-qg1-cardwrap .hb-qg1-input { padding-right: 92px; font-variant-numeric: tabular-nums; letter-spacing: .02em; }
.hb-qg1-brandtag { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); font-size: 11px; font-weight: 600; padding: 4px 8px; border-radius: 6px; background: rgba(255,255,255,.06); color: #a1a1a1; transition: background .2s, color .2s; }
.hb-qg1-brandtag[data-known="true"] { background: color-mix(in srgb, var(--hb-qg1-accent) 20%, transparent); color: #fff; }
.hb-qg1-opts { display: grid; gap: 10px; }
@container (min-width: 560px) { .hb-qg1-opts { grid-template-columns: repeat(3, 1fr); } }
.hb-qg1-opt { position: relative; display: grid; gap: 2px; border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 12px 14px; cursor: pointer; background: #0a0a0a; transition: border-color .2s, background .2s; }
.hb-qg1-opt:hover { border-color: rgba(255,255,255,.2); }
.hb-qg1-opt[data-checked="true"] { border-color: var(--hb-qg1-accent); background: color-mix(in srgb, var(--hb-qg1-accent) 8%, #0a0a0a); }
.hb-qg1-opt:has(input:focus-visible) { box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qg1-accent) 30%, transparent); }
.hb-qg1-opt input { position: absolute; opacity: 0; pointer-events: none; }
.hb-qg1-opt b { font-size: 14px; font-weight: 600; display: flex; justify-content: space-between; }
.hb-qg1-opt span { font-size: 12px; color: #8f8f8f; }
.hb-qg1-wallets { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.hb-qg1-wallet { height: 44px; border-radius: 10px; border: 1px solid rgba(255,255,255,.1); font: inherit; font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: transform .15s, filter .2s; }
.hb-qg1-wallet:active { transform: scale(.98); }
.hb-qg1-wallet:focus-visible, .hb-qg1-pay:focus-visible, .hb-qg1-link:focus-visible { outline: 2px solid var(--hb-qg1-accent); outline-offset: 2px; }
.hb-qg1-wallet-a { background: #fff; color: #0a0a0a; border-color: #fff; }
.hb-qg1-wallet-b { background: #171717; color: #ededed; }
.hb-qg1-wallet:hover { filter: brightness(1.08); }
.hb-qg1-wallet svg { width: 16px; height: 16px; }
.hb-qg1-or { display: flex; align-items: center; gap: 12px; font-size: 12px; color: #6b6b6b; margin: 16px 0; }
.hb-qg1-or::before, .hb-qg1-or::after { content: ""; flex: 1; height: 1px; background: rgba(255,255,255,.08); }
.hb-qg1-pay { margin-top: 4px; width: 100%; height: 50px; border: 0; border-radius: 12px; background: var(--hb-qg1-accent); color: #fff; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 10px; box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 10px 30px -10px var(--hb-qg1-accent); transition: transform .15s, filter .2s; }
.hb-qg1-pay:hover { filter: brightness(1.08); }
.hb-qg1-pay:active { transform: translateY(1px); }
.hb-qg1-pay[disabled] { opacity: .75; cursor: progress; }
.hb-qg1-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: hb-qg1-spin .8s linear infinite; }
@keyframes hb-qg1-spin { to { transform: rotate(360deg); } }
.hb-qg1-note { font-size: 12px; color: #6b6b6b; text-align: center; margin: 10px 0 0; }
.hb-qg1-sum { position: sticky; top: 24px; border: 1px solid rgba(255,255,255,.08); border-radius: 18px; background: #111; padding: 20px; box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 30px 60px -30px rgba(0,0,0,.8); }
.hb-qg1-sumhead { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px; }
.hb-qg1-sumhead h3 { margin: 0; font-size: 15px; font-weight: 600; }
.hb-qg1-sumhead span { font-size: 12px; color: #8f8f8f; }
.hb-qg1-items { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
.hb-qg1-item { display: grid; grid-template-columns: 52px 1fr auto; gap: 12px; align-items: center; opacity: 0; transform: translateY(6px); animation: hb-qg1-in .5s cubic-bezier(.2,.8,.2,1) forwards; }
@keyframes hb-qg1-in { to { opacity: 1; transform: none; } }
.hb-qg1-thumb { position: relative; width: 52px; height: 52px; border-radius: 12px; border: 1px solid rgba(255,255,255,.08); }
.hb-qg1-qty { position: absolute; top: -6px; right: -6px; min-width: 18px; height: 18px; border-radius: 9px; background: #2a2a2a; color: #ededed; font-size: 10px; font-weight: 600; display: grid; place-items: center; padding: 0 5px; border: 1px solid #0a0a0a; }
.hb-qg1-iname { font-size: 14px; font-weight: 500; }
.hb-qg1-ivar { font-size: 12px; color: #8f8f8f; }
.hb-qg1-iprice { font-size: 14px; font-variant-numeric: tabular-nums; }
.hb-qg1-lines { margin: 18px 0 0; padding: 16px 0 0; border-top: 1px solid rgba(255,255,255,.08); display: grid; gap: 10px; }
.hb-qg1-line { display: flex; justify-content: space-between; font-size: 13px; color: #a1a1a1; font-variant-numeric: tabular-nums; }
.hb-qg1-total { display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.08); }
.hb-qg1-total span { font-size: 14px; color: #a1a1a1; }
.hb-qg1-total b { font-size: 24px; font-weight: 600; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.hb-qg1-done { border: 1px solid rgba(255,255,255,.08); border-radius: 18px; background: #111; padding: 40px 24px; text-align: center; display: grid; justify-items: center; gap: 10px; animation: hb-qg1-in .5s ease forwards; opacity: 0; }
.hb-qg1-mark { width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; background: color-mix(in srgb, var(--hb-qg1-accent) 16%, transparent); color: var(--hb-qg1-accent); }
.hb-qg1-mark path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-qg1-draw .6s .15s ease forwards; }
@keyframes hb-qg1-draw { to { stroke-dashoffset: 0; } }
.hb-qg1-done h3 { margin: 6px 0 0; font-size: 22px; letter-spacing: -0.02em; }
.hb-qg1-done p { margin: 0; color: #8f8f8f; font-size: 14px; max-width: 380px; }
.hb-qg1-link { margin-top: 10px; background: none; border: 1px solid rgba(255,255,255,.12); color: #ededed; border-radius: 999px; padding: 9px 16px; font: inherit; font-size: 13px; cursor: pointer; }
.hb-qg1-link:hover { background: rgba(255,255,255,.05); }
@media (prefers-reduced-motion: reduce) {
  .hb-qg1 *, .hb-qg1 *::before, .hb-qg1 *::after { animation: none !important; transition: none !important; }
  .hb-qg1-item, .hb-qg1-done { opacity: 1; transform: none; }
  .hb-qg1-mark path { stroke-dashoffset: 0; }
}
`;

const fieldIds: Record<FieldKey, string> = {
  email: "email",
  name: "name",
  address: "address",
  city: "city",
  postalCode: "postal",
  country: "country",
  card: "card",
  expiry: "expiry",
  cvc: "cvc",
};

export function CheckoutOnePage({
  brand = "Northwind Supply",
  title = "Checkout",
  items = defaultItems,
  deliveryOptions = defaultDeliveries,
  defaultDelivery,
  countries = defaultCountries,
  currency = "USD",
  taxRate = 0.0825,
  onSubmit,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: CheckoutOnePageProps) {
  const uid = React.useId();
  const [fields, setFields] = React.useState<Fields>({
    email: "",
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: countries[0] ?? "",
    card: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = React.useState<Partial<Record<FieldKey, string>>>({});
  const [delivery, setDelivery] = React.useState(defaultDelivery ?? deliveryOptions[0]?.id ?? "");
  const [status, setStatus] = React.useState<"idle" | "processing" | "done">("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const money = React.useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency }), [currency]);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = deliveryOptions.find((d) => d.id === delivery)?.price ?? 0;
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const total = subtotal + shipping + tax;
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const contactDone = emailOk(fields.email);
  const shipDone = fields.name.trim().length > 1 && fields.address.trim().length > 3 && fields.city.trim().length > 1 && fields.postalCode.trim().length > 2;
  const deliveryDone = shipDone && delivery !== "";
  const payDone = luhn(fields.card) && expiryShape(fields.expiry) && onlyDigits(fields.cvc).length >= 3;

  const set = (key: FieldKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let v = e.target.value;
    if (key === "card") v = formatCard(v);
    if (key === "expiry") v = formatExpiry(v);
    if (key === "cvc") v = onlyDigits(v).slice(0, 4);
    setFields((f) => ({ ...f, [key]: v }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (method: "card" | "wallet") => {
    if (status !== "idle") return;
    const found = validate(fields, method);
    setErrors(found);
    const first = (Object.keys(fieldIds) as FieldKey[]).find((k) => found[k]);
    if (first) {
      document.getElementById(`${uid}-${fieldIds[first]}`)?.focus();
      return;
    }
    setStatus("processing");
    timer.current = setTimeout(() => {
      setStatus("done");
      onSubmit?.({
        email: fields.email.trim(),
        name: fields.name.trim(),
        address: fields.address.trim(),
        city: fields.city.trim(),
        postalCode: fields.postalCode.trim(),
        country: fields.country,
        delivery,
        method,
        cardBrand: method === "card" ? brandOf(fields.card) : "Wallet",
        cardLast4: method === "card" ? onlyDigits(fields.card).slice(-4) : "",
        total: Math.round(total * 100) / 100,
      });
    }, 1100);
  };

  const field = (key: FieldKey, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => {
    const id = `${uid}-${fieldIds[key]}`;
    return (
      <div className="hb-qg1-field">
        <label className="hb-qg1-label" htmlFor={id}>{label}</label>
        <input
          id={id}
          className="hb-qg1-input"
          value={fields[key]}
          onChange={set(key)}
          aria-invalid={errors[key] ? "true" : undefined}
          aria-describedby={errors[key] ? `${id}-err` : undefined}
          {...props}
        />
        {errors[key] ? <span className="hb-qg1-err" id={`${id}-err`}>{errors[key]}</span> : null}
      </div>
    );
  };

  const reset = () => {
    setStatus("idle");
    setFields((f) => ({ ...f, card: "", expiry: "", cvc: "" }));
  };

  const vars = { "--hb-qg1-accent": accent, ...style } as React.CSSProperties;
  const steps = [
    { label: "Contact", done: contactDone },
    { label: "Shipping", done: shipDone },
    { label: "Delivery", done: deliveryDone },
    { label: "Payment", done: payDone || status === "done" },
  ];
  const cardBrand = brandOf(fields.card);

  return (
    <section className={`hb-qg1 ${className}`} style={vars} {...rest}>
      <style href="hb-checkout-one-page" precedence="default">{css}</style>
      <div className="hb-qg1-inner">
        <div className="hb-qg1-top">
          <div className="hb-qg1-brand">
            <span className="hb-qg1-logo" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 12V4l5 5 5-5v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            {brand}
          </div>
          <span className="hb-qg1-secure">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.6" /></svg>
            Encrypted checkout
          </span>
        </div>
        <h2 className="hb-qg1-title">{title}</h2>
        <div className="hb-qg1-rail" aria-hidden="true">
          {steps.map((s) => (
            <div key={s.label} className="hb-qg1-seg" data-done={s.done ? "true" : "false"}>
              <span className="hb-qg1-bar"><i /></span>
              {s.label}
            </div>
          ))}
        </div>
        <div className="hb-qg1-grid">
          {status === "done" ? (
            <div className="hb-qg1-done" role="status">
              <span className="hb-qg1-mark">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3>Thanks, your order is in</h3>
              <p>A confirmation is on its way to {fields.email.trim()}. We charge {money.format(total)} when the order ships.</p>
              <button type="button" className="hb-qg1-link" onClick={reset}>Back to checkout</button>
            </div>
          ) : (
            <form
              className="hb-qg1-form"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                submit("card");
              }}
            >
              <fieldset className="hb-qg1-block" data-done={contactDone ? "true" : "false"}>
                <legend className="hb-qg1-legend"><span className="hb-qg1-num">1</span>Contact</legend>
                {field("email", "Email", { type: "email", autoComplete: "email", placeholder: "maya@studio.co" })}
              </fieldset>
              <fieldset className="hb-qg1-block" data-done={shipDone ? "true" : "false"}>
                <legend className="hb-qg1-legend"><span className="hb-qg1-num">2</span>Shipping address</legend>
                <div className="hb-qg1-row">
                  <div className="hb-qg1-row hb-qg1-row-2">
                    {field("name", "Full name", { autoComplete: "name", placeholder: "Maya Lindqvist" })}
                    <div className="hb-qg1-field">
                      <label className="hb-qg1-label" htmlFor={`${uid}-country`}>Country</label>
                      <select id={`${uid}-country`} className="hb-qg1-select" value={fields.country} onChange={set("country")} autoComplete="country-name">
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  {field("address", "Street address", { autoComplete: "street-address", placeholder: "2140 Mission Street, Apt 4" })}
                  <div className="hb-qg1-row hb-qg1-row-2">
                    {field("city", "City", { autoComplete: "address-level2", placeholder: "San Francisco" })}
                    {field("postalCode", "Postal code", { autoComplete: "postal-code", placeholder: "94110" })}
                  </div>
                </div>
              </fieldset>
              <fieldset className="hb-qg1-block" data-done={deliveryDone ? "true" : "false"}>
                <legend className="hb-qg1-legend"><span className="hb-qg1-num">3</span>Delivery method</legend>
                <div className="hb-qg1-opts">
                  {deliveryOptions.map((d) => (
                    <label key={d.id} className="hb-qg1-opt" data-checked={delivery === d.id ? "true" : "false"}>
                      <input type="radio" name={`${uid}-delivery`} value={d.id} checked={delivery === d.id} onChange={() => setDelivery(d.id)} />
                      <b>{d.label}<em style={{ fontStyle: "normal", fontWeight: 500 }}>{d.price === 0 ? "Free" : money.format(d.price)}</em></b>
                      <span>{d.detail}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="hb-qg1-block" data-done={payDone ? "true" : "false"}>
                <legend className="hb-qg1-legend"><span className="hb-qg1-num">4</span>Payment</legend>
                <div className="hb-qg1-wallets">
                  <button type="button" className="hb-qg1-wallet hb-qg1-wallet-a" onClick={() => submit("wallet")} aria-label="Pay with device wallet">
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="4" y="1.5" width="8" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M7 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                    Pay
                  </button>
                  <button type="button" className="hb-qg1-wallet hb-qg1-wallet-b" onClick={() => submit("wallet")} aria-label="Pay with saved wallet">
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 5.5A1.5 1.5 0 013.5 4h9A1.5 1.5 0 0114 5.5v6a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 11.5z" stroke="currentColor" strokeWidth="1.5" /><path d="M10 8.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    Wallet
                  </button>
                </div>
                <div className="hb-qg1-or">or pay with card</div>
                <div className="hb-qg1-row">
                  <div className="hb-qg1-field">
                    <label className="hb-qg1-label" htmlFor={`${uid}-card`}>Card number</label>
                    <div className="hb-qg1-cardwrap">
                      <input
                        id={`${uid}-card`}
                        className="hb-qg1-input"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="4242 4242 4242 4242"
                        value={fields.card}
                        onChange={set("card")}
                        aria-invalid={errors.card ? "true" : undefined}
                        aria-describedby={errors.card ? `${uid}-card-err` : undefined}
                      />
                      <span className="hb-qg1-brandtag" data-known={cardBrand !== "Card" ? "true" : "false"}>{cardBrand}</span>
                    </div>
                    {errors.card ? <span className="hb-qg1-err" id={`${uid}-card-err`}>{errors.card}</span> : null}
                  </div>
                  <div className="hb-qg1-row hb-qg1-row-2">
                    {field("expiry", "Expiry", { inputMode: "numeric", autoComplete: "cc-exp", placeholder: "MM / YY" })}
                    {field("cvc", "Security code", { inputMode: "numeric", autoComplete: "cc-csc", placeholder: "123" })}
                  </div>
                </div>
                <button type="submit" className="hb-qg1-pay" disabled={status === "processing"}>
                  {status === "processing" ? <><span className="hb-qg1-spin" aria-hidden="true" />Processing</> : `Pay ${money.format(total)}`}
                </button>
                <p className="hb-qg1-note">Test mode. Card details stay in this browser tab.</p>
              </fieldset>
            </form>
          )}
          <aside className="hb-qg1-sum" aria-label="Order summary">
            <div className="hb-qg1-sumhead">
              <h3>Order summary</h3>
              <span>{count} items</span>
            </div>
            <ul className="hb-qg1-items">
              {items.map((it, i) => (
                <li key={it.name} className="hb-qg1-item" style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }}>
                  <span
                    className="hb-qg1-thumb"
                    style={{ background: `linear-gradient(140deg, hsl(${it.hue} 38% 42%), hsl(${it.hue} 30% 18%))` }}
                  >
                    <span className="hb-qg1-qty">{it.quantity}</span>
                  </span>
                  <span>
                    <div className="hb-qg1-iname">{it.name}</div>
                    <div className="hb-qg1-ivar">{it.variant}</div>
                  </span>
                  <span className="hb-qg1-iprice">{money.format(it.price * it.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="hb-qg1-lines">
              <div className="hb-qg1-line"><span>Subtotal</span><span>{money.format(subtotal)}</span></div>
              <div className="hb-qg1-line"><span>Shipping</span><span>{shipping === 0 ? "Free" : money.format(shipping)}</span></div>
              <div className="hb-qg1-line"><span>Estimated tax</span><span>{money.format(tax)}</span></div>
            </div>
            <div className="hb-qg1-total">
              <span>Total</span>
              <b aria-live="polite">{money.format(total)}</b>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
