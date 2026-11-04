"use client";

import * as React from "react";

export interface CheckoutSplitItem {
  name: string;
  detail: string;
  amount: number;
}

export interface CheckoutSplitPromo {
  code: string;
  percent: number;
}

export interface CheckoutSplitValues {
  email: string;
  name: string;
  country: string;
  postalCode: string;
  promo: string;
  saveDetails: boolean;
  cardBrand: string;
  cardLast4: string;
  total: number;
}

export interface CheckoutSplitSummaryProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  merchant?: string;
  items?: CheckoutSplitItem[];
  promoCodes?: CheckoutSplitPromo[];
  taxRate?: number;
  currency?: string;
  badges?: string[];
  onPromoApply?: (code: string, valid: boolean) => void;
  onPay?: (values: CheckoutSplitValues) => void;
  accent?: string;
}

const defaultItems: CheckoutSplitItem[] = [
  { name: "Lumen Pro", detail: "Annual license, 1 editor", amount: 192 },
  { name: "Extra seats", detail: "3 reviewers at $36 / year", amount: 108 },
  { name: "Asset library", detail: "4,000 LUTs and overlays", amount: 49 },
];

const defaultPromos: CheckoutSplitPromo[] = [{ code: "LAUNCH20", percent: 20 }];
const defaultBadges = ["256-bit encryption", "30-day refund", "Cancel any time"];

const onlyDigits = (v: string) => v.replace(/\D/g, "");

function luhn(v: string) {
  const d = onlyDigits(v);
  if (d.length < 13) return false;
  let sum = 0;
  let dbl = false;
  for (let i = d.length - 1; i >= 0; i -= 1) {
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

function brandOf(v: string) {
  const d = onlyDigits(v);
  if (/^4/.test(d)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(d)) return "Mastercard";
  if (/^3[47]/.test(d)) return "Amex";
  return "Card";
}

function useTween(target: number) {
  const [value, setValue] = React.useState(target);
  const from = React.useRef(target);
  React.useEffect(() => {
    const start = from.current;
    if (start === target) return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      from.current = target;
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 700);
      const e = 1 - Math.pow(1 - p, 3);
      const v = start + (target - start) * e;
      from.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

const css = `
.hb-qg2 {
  --hb-qg2-accent: #8b5cf6;
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
.hb-qg2 *, .hb-qg2 *::before, .hb-qg2 *::after { box-sizing: border-box; }
.hb-qg2-inner { max-width: 1120px; margin: 0 auto; padding: clamp(40px, 8cqw, 96px) clamp(14px, 4cqw, 32px); }
.hb-qg2-shell { display: grid; border: 1px solid rgba(255,255,255,.08); border-radius: 22px; overflow: hidden; background: #0d0d0d; box-shadow: 0 40px 80px -40px rgba(0,0,0,.9), inset 0 1px 0 rgba(255,255,255,.05); }
@container (min-width: 820px) { .hb-qg2-shell { grid-template-columns: 1fr 1fr; } }
.hb-qg2-left { position: relative; isolation: isolate; padding: clamp(24px, 4cqw, 44px); display: flex; flex-direction: column; gap: 22px; overflow: hidden; background: #0f0d16; }
.hb-qg2-left::before { content: ""; position: absolute; inset: 0; z-index: -2; background: radial-gradient(80% 60% at 0% 0%, color-mix(in srgb, var(--hb-qg2-accent) 42%, transparent), transparent 60%), radial-gradient(70% 50% at 100% 100%, color-mix(in srgb, var(--hb-qg2-accent) 22%, transparent), transparent 70%); }
.hb-qg2-left::after { content: ""; position: absolute; inset: 0; z-index: -1; background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 28px 28px; mask-image: linear-gradient(180deg, #000, transparent 75%); -webkit-mask-image: linear-gradient(180deg, #000, transparent 75%); }
.hb-qg2-brand { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 15px; }
.hb-qg2-logo { width: 30px; height: 30px; border-radius: 50%; background: conic-gradient(from 200deg, var(--hb-qg2-accent), #fff 40%, var(--hb-qg2-accent)); box-shadow: 0 0 24px color-mix(in srgb, var(--hb-qg2-accent) 60%, transparent); }
.hb-qg2-test { margin-left: auto; font-size: 11px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: #fbbf24; background: rgba(251,191,36,.12); border: 1px solid rgba(251,191,36,.25); padding: 3px 8px; border-radius: 6px; }
.hb-qg2-pay { color: rgba(237,237,237,.7); font-size: 14px; margin: 0; }
.hb-qg2-big { font-size: clamp(38px, 6cqw, 52px); font-weight: 600; letter-spacing: -0.04em; line-height: 1; margin: 6px 0 0; font-variant-numeric: tabular-nums; }
.hb-qg2-items { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
.hb-qg2-item { display: grid; grid-template-columns: 38px 1fr auto; gap: 12px; align-items: center; }
.hb-qg2-ico { width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); box-shadow: inset 0 1px 0 rgba(255,255,255,.08); }
.hb-qg2-ico svg { width: 16px; height: 16px; color: #ededed; }
.hb-qg2-item b { display: block; font-size: 14px; font-weight: 500; }
.hb-qg2-item small { font-size: 12px; color: rgba(237,237,237,.55); }
.hb-qg2-amt { font-size: 14px; font-variant-numeric: tabular-nums; }
.hb-qg2-promo { display: flex; gap: 8px; }
.hb-qg2-promo input { flex: 1; min-width: 0; height: 40px; border-radius: 10px; border: 1px solid rgba(255,255,255,.12); background: rgba(0,0,0,.35); color: #ededed; font: inherit; font-size: 13px; padding: 0 12px; text-transform: uppercase; letter-spacing: .06em; outline: none; }
.hb-qg2-promo input::placeholder { text-transform: none; letter-spacing: 0; color: rgba(237,237,237,.4); }
.hb-qg2-promo input:focus { border-color: var(--hb-qg2-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qg2-accent) 25%, transparent); }
.hb-qg2-apply { height: 40px; padding: 0 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.06); color: #ededed; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; }
.hb-qg2-apply:hover { background: rgba(255,255,255,.1); }
.hb-qg2-apply:focus-visible, .hb-qg2-chip button:focus-visible, .hb-qg2-btn:focus-visible { outline: 2px solid var(--hb-qg2-accent); outline-offset: 2px; }
.hb-qg2-chip { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: .05em; padding: 6px 6px 6px 10px; border-radius: 8px; background: color-mix(in srgb, var(--hb-qg2-accent) 22%, transparent); border: 1px solid color-mix(in srgb, var(--hb-qg2-accent) 45%, transparent); animation: hb-qg2-pop .35s cubic-bezier(.3,1.4,.5,1); }
@keyframes hb-qg2-pop { from { transform: scale(.85); opacity: 0; } }
.hb-qg2-chip button { width: 20px; height: 20px; border: 0; border-radius: 5px; background: rgba(0,0,0,.3); color: #ededed; cursor: pointer; display: grid; place-items: center; padding: 0; }
.hb-qg2-msg { font-size: 12px; color: #fca5a5; margin: 6px 0 0; }
.hb-qg2-lines { display: grid; gap: 9px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.1); }
.hb-qg2-line { display: flex; justify-content: space-between; font-size: 13px; color: rgba(237,237,237,.65); font-variant-numeric: tabular-nums; }
.hb-qg2-line[data-strong="true"] { color: #ededed; font-size: 15px; font-weight: 600; padding-top: 6px; }
.hb-qg2-line[data-discount="true"] span:last-child { color: #c4b5fd; }
.hb-qg2-badges { margin-top: auto; display: flex; flex-wrap: wrap; gap: 8px 16px; padding-top: 6px; }
.hb-qg2-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: rgba(237,237,237,.6); }
.hb-qg2-badge svg { width: 14px; height: 14px; color: var(--hb-qg2-accent); }
.hb-qg2-right { padding: clamp(24px, 4cqw, 44px); display: flex; flex-direction: column; gap: 16px; border-top: 1px solid rgba(255,255,255,.06); }
@container (min-width: 820px) { .hb-qg2-right { border-top: 0; border-left: 1px solid rgba(255,255,255,.06); } }
.hb-qg2-h { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
.hb-qg2-field { display: grid; gap: 6px; }
.hb-qg2-label { font-size: 12px; color: #a1a1a1; }
.hb-qg2-input { width: 100%; height: 44px; border: 1px solid rgba(255,255,255,.1); border-radius: 10px; background: #0a0a0a; color: #ededed; font: inherit; font-size: 14px; padding: 0 12px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-qg2-input::placeholder { color: #555; }
.hb-qg2-input:focus { border-color: var(--hb-qg2-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qg2-accent) 22%, transparent); position: relative; z-index: 1; }
.hb-qg2-input[aria-invalid="true"] { border-color: #f87171; }
.hb-qg2-group { display: grid; grid-template-columns: 1fr 1fr; }
.hb-qg2-group .hb-qg2-input { border-radius: 0; }
.hb-qg2-group .hb-qg2-input:first-child { grid-column: 1 / -1; border-radius: 10px 10px 0 0; }
.hb-qg2-group .hb-qg2-input:nth-child(2) { border-top: 0; border-right: 0; border-radius: 0 0 0 10px; }
.hb-qg2-group .hb-qg2-input:nth-child(3) { border-top: 0; border-radius: 0 0 10px 0; }
.hb-qg2-cards { display: flex; gap: 4px; }
.hb-qg2-cards span { font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: #1c1c1c; color: #6b6b6b; transition: color .2s, background .2s; }
.hb-qg2-cards span[data-on="true"] { color: #fff; background: color-mix(in srgb, var(--hb-qg2-accent) 50%, #1c1c1c); }
.hb-qg2-labelrow { display: flex; justify-content: space-between; align-items: center; }
.hb-qg2-two { display: grid; grid-template-columns: 1.3fr 1fr; gap: 10px; }
.hb-qg2-err { font-size: 12px; color: #f87171; margin: 0; }
.hb-qg2-check { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: #a1a1a1; cursor: pointer; }
.hb-qg2-check input { margin: 2px 0 0; accent-color: var(--hb-qg2-accent); width: 16px; height: 16px; }
.hb-qg2-btn { position: relative; overflow: hidden; height: 50px; width: 100%; border: 0; border-radius: 12px; background: var(--hb-qg2-accent); color: #fff; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 10px; box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 14px 34px -14px var(--hb-qg2-accent); }
.hb-qg2-btn::after { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,.35) 50%, transparent 70%); transform: translateX(-100%); animation: hb-qg2-shine 3.2s ease-in-out infinite; }
@keyframes hb-qg2-shine { 0%, 55% { transform: translateX(-100%); } 85%, 100% { transform: translateX(100%); } }
.hb-qg2-btn[disabled] { cursor: progress; opacity: .8; }
.hb-qg2-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: hb-qg2-rot .8s linear infinite; }
@keyframes hb-qg2-rot { to { transform: rotate(360deg); } }
.hb-qg2-fine { font-size: 12px; color: #6b6b6b; text-align: center; margin: 0; }
.hb-qg2-done { flex: 1; display: grid; place-content: center; justify-items: center; text-align: center; gap: 10px; min-height: 360px; }
.hb-qg2-ring { width: 72px; height: 72px; border-radius: 50%; display: grid; place-items: center; background: color-mix(in srgb, var(--hb-qg2-accent) 18%, transparent); box-shadow: 0 0 0 10px color-mix(in srgb, var(--hb-qg2-accent) 7%, transparent); animation: hb-qg2-pop .5s cubic-bezier(.3,1.4,.5,1); color: #fff; }
.hb-qg2-done h3 { margin: 8px 0 0; font-size: 22px; letter-spacing: -0.02em; }
.hb-qg2-done p { margin: 0; color: #8f8f8f; font-size: 14px; max-width: 320px; }
@media (prefers-reduced-motion: reduce) {
  .hb-qg2 *, .hb-qg2 *::before, .hb-qg2 *::after { animation: none !important; transition: none !important; }
}
`;

function ItemIcon({ index }: { index: number }) {
  if (index % 3 === 0) {
    return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5l5.5 3v7L8 14.5l-5.5-3v-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M2.5 4.5L8 7.5l5.5-3M8 7.5v7" stroke="currentColor" strokeWidth="1.4" /></svg>;
  }
  if (index % 3 === 1) {
    return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M1.5 13.5c.6-2.4 2.3-3.5 4.5-3.5s3.9 1.1 4.5 3.5M11 3.2a2.4 2.4 0 010 4.6M12.5 10.3c1 .5 1.7 1.6 2 3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>;
  }
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M2.5 11l3.5-3.5 3 3 2-2 2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>;
}

function BadgeIcon({ index }: { index: number }) {
  if (index === 0) return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.5" /></svg>;
  if (index === 1) return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 109.6-3.7M12.5 1.5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5l5 2v4c0 3.2-2.2 5.6-5 7-2.8-1.4-5-3.8-5-7v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M5.5 8l1.8 1.8L10.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function CheckoutSplitSummary({
  merchant = "Lumen Studio",
  items = defaultItems,
  promoCodes = defaultPromos,
  taxRate = 0.07,
  currency = "USD",
  badges = defaultBadges,
  onPromoApply,
  onPay,
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: CheckoutSplitSummaryProps) {
  const uid = React.useId();
  const money = React.useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency }), [currency]);
  const [code, setCode] = React.useState("");
  const [promo, setPromo] = React.useState<CheckoutSplitPromo | null>(null);
  const [promoError, setPromoError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [card, setCard] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [name, setName] = React.useState("");
  const [country, setCountry] = React.useState("United States");
  const [zip, setZip] = React.useState("");
  const [save, setSave] = React.useState(true);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "processing" | "done">("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const discount = promo ? Math.round(subtotal * promo.percent) / 100 : 0;
  const tax = Math.round((subtotal - discount) * taxRate * 100) / 100;
  const total = Math.round((subtotal - discount + tax) * 100) / 100;
  const shown = useTween(total);

  const apply = () => {
    const c = code.trim().toUpperCase();
    if (!c) return;
    const match = promoCodes.find((p) => p.code.toUpperCase() === c) ?? null;
    onPromoApply?.(c, Boolean(match));
    if (match) {
      setPromo(match);
      setPromoError("");
      setCode("");
    } else {
      setPromoError(`"${c}" is not an active code.`);
    }
  };

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    let msg = "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) msg = "Enter a valid email for the receipt.";
    else if (!luhn(card)) msg = "Check the card number.";
    else if (!/^(0[1-9]|1[0-2]) \/ \d{2}$/.test(expiry)) msg = "Use MM / YY for the expiry date.";
    else if (onlyDigits(cvc).length < 3) msg = "Enter the 3 or 4 digit security code.";
    else if (name.trim().length < 2) msg = "Enter the name on the card.";
    else if (zip.trim().length < 3) msg = "Enter a postal code.";
    setError(msg);
    if (msg) return;
    setStatus("processing");
    timer.current = setTimeout(() => {
      setStatus("done");
      onPay?.({
        email: email.trim(),
        name: name.trim(),
        country,
        postalCode: zip.trim(),
        promo: promo?.code ?? "",
        saveDetails: save,
        cardBrand: brandOf(card),
        cardLast4: onlyDigits(card).slice(-4),
        total,
      });
    }, 1200);
  };

  const brand = brandOf(card);
  const vars = { "--hb-qg2-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-qg2 ${className}`} style={vars} {...rest}>
      <style href="hb-checkout-split-summary" precedence="default">{css}</style>
      <div className="hb-qg2-inner">
        <div className="hb-qg2-shell">
          <div className="hb-qg2-left">
            <div className="hb-qg2-brand">
              <span className="hb-qg2-logo" aria-hidden="true" />
              {merchant}
              <span className="hb-qg2-test">Test mode</span>
            </div>
            <div>
              <p className="hb-qg2-pay">Pay {merchant}</p>
              <p className="hb-qg2-big" aria-live="polite">{money.format(shown)}</p>
            </div>
            <ul className="hb-qg2-items">
              {items.map((it, i) => (
                <li key={it.name} className="hb-qg2-item">
                  <span className="hb-qg2-ico"><ItemIcon index={i} /></span>
                  <span>
                    <b>{it.name}</b>
                    <small>{it.detail}</small>
                  </span>
                  <span className="hb-qg2-amt">{money.format(it.amount)}</span>
                </li>
              ))}
            </ul>
            <div>
              {promo ? (
                <span className="hb-qg2-chip">
                  {promo.code} applied, {promo.percent}% off
                  <button type="button" aria-label={`Remove code ${promo.code}`} onClick={() => setPromo(null)}>
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </button>
                </span>
              ) : (
                <div className="hb-qg2-promo">
                  <label htmlFor={`${uid}-promo`} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Promotion code</label>
                  <input
                    id={`${uid}-promo`}
                    value={code}
                    placeholder="Add promotion code"
                    onChange={(e) => {
                      setCode(e.target.value);
                      setPromoError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        apply();
                      }
                    }}
                  />
                  <button type="button" className="hb-qg2-apply" onClick={apply}>Apply</button>
                </div>
              )}
              {promoError ? <p className="hb-qg2-msg" role="alert">{promoError}</p> : null}
            </div>
            <div className="hb-qg2-lines">
              <div className="hb-qg2-line"><span>Subtotal</span><span>{money.format(subtotal)}</span></div>
              {promo ? <div className="hb-qg2-line" data-discount="true"><span>Discount ({promo.code})</span><span>-{money.format(discount)}</span></div> : null}
              <div className="hb-qg2-line"><span>Sales tax ({(taxRate * 100).toFixed(1)}%)</span><span>{money.format(tax)}</span></div>
              <div className="hb-qg2-line" data-strong="true"><span>Total due today</span><span>{money.format(total)}</span></div>
            </div>
            <div className="hb-qg2-badges">
              {badges.map((b, i) => (
                <span key={b} className="hb-qg2-badge"><BadgeIcon index={i % 3} />{b}</span>
              ))}
            </div>
          </div>
          <div className="hb-qg2-right">
            {status === "done" ? (
              <div className="hb-qg2-done" role="status">
                <span className="hb-qg2-ring">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <h3>Payment complete</h3>
                <p>{money.format(total)} paid to {merchant}. Your license keys are on the way to {email.trim()}.</p>
              </div>
            ) : (
              <form onSubmit={pay} noValidate style={{ display: "grid", gap: 16 }}>
                <h3 className="hb-qg2-h">Pay with card</h3>
                <div className="hb-qg2-field">
                  <label className="hb-qg2-label" htmlFor={`${uid}-email`}>Email</label>
                  <input id={`${uid}-email`} className="hb-qg2-input" type="email" autoComplete="email" placeholder="jonas@kettle.studio" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="hb-qg2-field">
                  <div className="hb-qg2-labelrow">
                    <label className="hb-qg2-label" htmlFor={`${uid}-card`}>Card information</label>
                    <span className="hb-qg2-cards" aria-hidden="true">
                      <span data-on={brand === "Visa" ? "true" : "false"}>VISA</span>
                      <span data-on={brand === "Mastercard" ? "true" : "false"}>MC</span>
                      <span data-on={brand === "Amex" ? "true" : "false"}>AMEX</span>
                    </span>
                  </div>
                  <div className="hb-qg2-group">
                    <input
                      id={`${uid}-card`}
                      className="hb-qg2-input"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 1234 1234 1234"
                      value={card}
                      onChange={(e) => setCard(onlyDigits(e.target.value).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 "))}
                    />
                    <input
                      className="hb-qg2-input"
                      aria-label="Expiry date"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => {
                        const d = onlyDigits(e.target.value).slice(0, 4);
                        setExpiry(d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d);
                      }}
                    />
                    <input
                      className="hb-qg2-input"
                      aria-label="Security code"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="CVC"
                      value={cvc}
                      onChange={(e) => setCvc(onlyDigits(e.target.value).slice(0, 4))}
                    />
                  </div>
                </div>
                <div className="hb-qg2-field">
                  <label className="hb-qg2-label" htmlFor={`${uid}-name`}>Name on card</label>
                  <input id={`${uid}-name`} className="hb-qg2-input" autoComplete="cc-name" placeholder="Jonas Weber" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="hb-qg2-field">
                  <span className="hb-qg2-label">Billing address</span>
                  <div className="hb-qg2-two">
                    <select aria-label="Country" className="hb-qg2-input" value={country} onChange={(e) => setCountry(e.target.value)}>
                      {["United States", "Canada", "United Kingdom", "Germany", "Netherlands", "Japan"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <input aria-label="Postal code" className="hb-qg2-input" autoComplete="postal-code" placeholder="ZIP" value={zip} onChange={(e) => setZip(e.target.value)} />
                  </div>
                </div>
                <label className="hb-qg2-check">
                  <input type="checkbox" checked={save} onChange={(e) => setSave(e.target.checked)} />
                  Remember my email and name for one-click checkout on {merchant}.
                </label>
                {error ? <p className="hb-qg2-err" role="alert">{error}</p> : null}
                <button type="submit" className="hb-qg2-btn" disabled={status === "processing"}>
                  {status === "processing" ? <><span className="hb-qg2-spin" aria-hidden="true" />Processing</> : `Pay ${money.format(total)}`}
                </button>
                <p className="hb-qg2-fine">Test mode. Try 4242 4242 4242 4242 with any future date.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
