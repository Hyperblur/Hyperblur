"use client";

import * as React from "react";

export type CheckoutStepperCycle = "monthly" | "yearly";

export interface CheckoutStepperValues {
  name: string;
  email: string;
  company: string;
  seats: number;
  cycle: CheckoutStepperCycle;
  cardBrand: string;
  cardLast4: string;
  total: number;
}

export interface CheckoutStepperCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  product?: string;
  plan?: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  defaultSeats?: number;
  defaultStep?: number;
  currency?: string;
  onStepChange?: (step: number) => void;
  onComplete?: (values: CheckoutStepperValues) => void;
  accent?: string;
}

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

const stepLabels = ["Details", "Payment", "Confirm"];

const css = `
.hb-qg3 {
  --hb-qg3-accent: #06b6d4;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  isolation: isolate;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-qg3 *, .hb-qg3 *::before, .hb-qg3 *::after { box-sizing: border-box; }
.hb-qg3::before { content: ""; position: absolute; inset: 0; z-index: -2; background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1.2px); background-size: 22px 22px; mask-image: radial-gradient(60% 70% at 50% 40%, #000, transparent); -webkit-mask-image: radial-gradient(60% 70% at 50% 40%, #000, transparent); }
.hb-qg3::after { content: ""; position: absolute; left: 50%; top: 18%; width: 620px; height: 420px; transform: translateX(-50%); z-index: -1; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-qg3-accent) 22%, transparent), transparent); filter: blur(10px); }
.hb-qg3-inner { max-width: 1120px; margin: 0 auto; padding: clamp(44px, 8cqw, 96px) clamp(14px, 4cqw, 32px); display: grid; justify-items: center; }
.hb-qg3-card { width: 100%; max-width: 520px; border-radius: 22px; border: 1px solid rgba(255,255,255,.09); background: linear-gradient(180deg, rgba(23,23,23,.92), rgba(14,14,14,.96)); backdrop-filter: blur(12px); box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 40px 90px -40px rgba(0,0,0,.95), 0 0 0 1px rgba(0,0,0,.4); overflow: hidden; }
.hb-qg3-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,.06); }
.hb-qg3-prod { display: flex; align-items: center; gap: 12px; }
.hb-qg3-mark { width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; background: color-mix(in srgb, var(--hb-qg3-accent) 18%, #111); border: 1px solid color-mix(in srgb, var(--hb-qg3-accent) 40%, transparent); color: var(--hb-qg3-accent); }
.hb-qg3-mark svg { width: 18px; height: 18px; }
.hb-qg3-prod b { display: block; font-size: 15px; font-weight: 600; }
.hb-qg3-prod small { font-size: 12px; color: #8f8f8f; }
.hb-qg3-price { text-align: right; font-variant-numeric: tabular-nums; }
.hb-qg3-price b { display: block; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; }
.hb-qg3-price small { font-size: 11px; color: #8f8f8f; }
.hb-qg3-stepwrap { position: relative; }
.hb-qg3-steps { list-style: none; margin: 0; padding: 18px 24px 4px; display: grid; grid-template-columns: repeat(3, 1fr); position: relative; }
.hb-qg3-track { position: absolute; left: calc(24px + 16.66%); right: calc(24px + 16.66%); top: 31px; height: 2px; background: rgba(255,255,255,.08); border-radius: 2px; overflow: hidden; }
.hb-qg3-track i { display: block; height: 100%; background: var(--hb-qg3-accent); transform-origin: left; transition: transform .5s cubic-bezier(.2,.8,.2,1); box-shadow: 0 0 12px var(--hb-qg3-accent); }
.hb-qg3-step { display: grid; justify-items: center; gap: 8px; font-size: 12px; color: #6b6b6b; position: relative; transition: color .3s; }
.hb-qg3-dot { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; background: #111; border: 1.5px solid rgba(255,255,255,.14); font-size: 12px; font-weight: 600; transition: background .3s, border-color .3s, color .3s, box-shadow .3s; }
.hb-qg3-step[data-state="current"] { color: #ededed; }
.hb-qg3-step[data-state="current"] .hb-qg3-dot { border-color: var(--hb-qg3-accent); color: var(--hb-qg3-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-qg3-accent) 18%, transparent); }
.hb-qg3-step[data-state="done"] { color: #a1a1a1; }
.hb-qg3-step[data-state="done"] .hb-qg3-dot { background: var(--hb-qg3-accent); border-color: var(--hb-qg3-accent); color: #031317; }
.hb-qg3-body { padding: 20px 24px 24px; overflow: hidden; }
.hb-qg3-pane { display: grid; gap: 14px; }
.hb-qg3-pane[data-dir="next"] { animation: hb-qg3-next .45s cubic-bezier(.2,.8,.2,1); }
.hb-qg3-pane[data-dir="prev"] { animation: hb-qg3-prev .45s cubic-bezier(.2,.8,.2,1); }
@keyframes hb-qg3-next { from { opacity: 0; transform: translateX(28px); } }
@keyframes hb-qg3-prev { from { opacity: 0; transform: translateX(-28px); } }
.hb-qg3-h { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; outline: none; }
.hb-qg3-sub { margin: -8px 0 2px; font-size: 13px; color: #8f8f8f; }
.hb-qg3-field { display: grid; gap: 6px; min-width: 0; }
.hb-qg3-label { font-size: 12px; color: #a1a1a1; }
.hb-qg3-input { width: 100%; height: 42px; border-radius: 10px; border: 1px solid rgba(255,255,255,.1); background: #0a0a0a; color: #ededed; font: inherit; font-size: 14px; padding: 0 12px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-qg3-input::placeholder { color: #555; }
.hb-qg3-input:focus { border-color: var(--hb-qg3-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qg3-accent) 22%, transparent); }
.hb-qg3-input[aria-invalid="true"] { border-color: #f87171; }
.hb-qg3-two { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.hb-qg3-err { font-size: 12px; color: #f87171; }
.hb-qg3-seats { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,.08); background: #0d0d0d; }
.hb-qg3-seats span { font-size: 13px; color: #a1a1a1; }
.hb-qg3-counter { display: flex; align-items: center; gap: 4px; }
.hb-qg3-counter button { width: 30px; height: 30px; border-radius: 8px; border: 1px solid rgba(255,255,255,.1); background: #171717; color: #ededed; font: inherit; font-size: 16px; cursor: pointer; }
.hb-qg3-counter button:hover { background: #1f1f1f; }
.hb-qg3-counter output { min-width: 34px; text-align: center; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-qg3-cycle { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.hb-qg3-cyc { text-align: left; border: 1px solid rgba(255,255,255,.1); border-radius: 12px; background: #0a0a0a; color: #ededed; font: inherit; padding: 10px 12px; cursor: pointer; display: grid; gap: 2px; transition: border-color .2s, background .2s; }
.hb-qg3-cyc b { font-size: 13px; font-weight: 600; display: flex; justify-content: space-between; gap: 6px; }
.hb-qg3-cyc small { font-size: 12px; color: #8f8f8f; }
.hb-qg3-cyc em { font-style: normal; font-size: 10px; font-weight: 700; color: #031317; background: var(--hb-qg3-accent); padding: 1px 6px; border-radius: 999px; }
.hb-qg3-cyc[aria-checked="true"] { border-color: var(--hb-qg3-accent); background: color-mix(in srgb, var(--hb-qg3-accent) 8%, #0a0a0a); }
.hb-qg3-review { list-style: none; margin: 0; padding: 0; border: 1px solid rgba(255,255,255,.08); border-radius: 14px; overflow: hidden; }
.hb-qg3-review li { display: grid; grid-template-columns: 90px 1fr auto; gap: 10px; align-items: center; padding: 12px 14px; font-size: 13px; }
.hb-qg3-review li + li { border-top: 1px solid rgba(255,255,255,.06); }
.hb-qg3-review span { color: #8f8f8f; }
.hb-qg3-review b { font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qg3-edit { background: none; border: 0; color: var(--hb-qg3-accent); font: inherit; font-size: 12px; cursor: pointer; padding: 2px 4px; border-radius: 4px; }
.hb-qg3-tot { display: flex; justify-content: space-between; align-items: baseline; padding: 4px 2px; }
.hb-qg3-tot span { font-size: 13px; color: #a1a1a1; }
.hb-qg3-tot b { font-size: 22px; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.hb-qg3-agree { display: flex; align-items: flex-start; gap: 10px; font-size: 12px; color: #8f8f8f; cursor: pointer; }
.hb-qg3-agree input { accent-color: var(--hb-qg3-accent); margin: 1px 0 0; width: 15px; height: 15px; }
.hb-qg3-nav { display: flex; gap: 10px; margin-top: 4px; }
.hb-qg3-back { height: 46px; padding: 0 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,.12); background: transparent; color: #ededed; font: inherit; font-size: 14px; cursor: pointer; }
.hb-qg3-back:hover { background: rgba(255,255,255,.05); }
.hb-qg3-next { flex: 1; height: 46px; border-radius: 12px; border: 0; background: var(--hb-qg3-accent); color: #031317; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 12px 30px -14px var(--hb-qg3-accent); transition: filter .2s, transform .15s; }
.hb-qg3-next:hover { filter: brightness(1.08); }
.hb-qg3-next:active { transform: translateY(1px); }
.hb-qg3-next[disabled] { opacity: .5; cursor: not-allowed; }
.hb-qg3-next svg { width: 14px; height: 14px; transition: transform .2s; }
.hb-qg3-next:hover svg { transform: translateX(2px); }
.hb-qg3-back:focus-visible, .hb-qg3-next:focus-visible, .hb-qg3-cyc:focus-visible, .hb-qg3-counter button:focus-visible, .hb-qg3-edit:focus-visible { outline: 2px solid var(--hb-qg3-accent); outline-offset: 2px; }
.hb-qg3-done { display: grid; justify-items: center; text-align: center; gap: 8px; padding: 18px 0 8px; animation: hb-qg3-next .45s cubic-bezier(.2,.8,.2,1); }
.hb-qg3-ok { width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; color: #031317; background: var(--hb-qg3-accent); box-shadow: 0 0 0 8px color-mix(in srgb, var(--hb-qg3-accent) 15%, transparent), 0 0 40px color-mix(in srgb, var(--hb-qg3-accent) 50%, transparent); }
.hb-qg3-done h3 { margin: 10px 0 0; font-size: 20px; letter-spacing: -0.02em; }
.hb-qg3-done p { margin: 0; color: #8f8f8f; font-size: 13px; max-width: 340px; }
.hb-qg3-foot { margin: 16px 0 0; font-size: 12px; color: #6b6b6b; display: flex; align-items: center; gap: 6px; }
.hb-qg3-foot svg { width: 12px; height: 12px; }
@media (prefers-reduced-motion: reduce) {
  .hb-qg3 *, .hb-qg3 *::before, .hb-qg3 *::after { animation: none !important; transition: none !important; }
}
`;

export function CheckoutStepperCard({
  product = "Relay",
  plan = "Team plan",
  monthlyPrice = 18,
  yearlyPrice = 15,
  defaultSeats = 5,
  defaultStep = 0,
  currency = "USD",
  onStepChange,
  onComplete,
  accent = "#06b6d4",
  className = "",
  style,
  ...rest
}: CheckoutStepperCardProps) {
  const uid = React.useId();
  const money = React.useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency }), [currency]);
  const [step, setStep] = React.useState(Math.max(0, Math.min(2, defaultStep)));
  const [dir, setDir] = React.useState<"next" | "prev" | "none">("none");
  const [done, setDone] = React.useState(false);
  const [name, setName] = React.useState("Priya Raman");
  const [email, setEmail] = React.useState("priya@halcyon.io");
  const [company, setCompany] = React.useState("Halcyon Labs");
  const [seats, setSeats] = React.useState(defaultSeats);
  const [cycle, setCycle] = React.useState<CheckoutStepperCycle>("yearly");
  const [card, setCard] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const headRef = React.useRef<HTMLHeadingElement>(null);
  const moved = React.useRef(false);

  React.useEffect(() => {
    if (moved.current) headRef.current?.focus();
  }, [step, done]);

  const unit = cycle === "yearly" ? yearlyPrice : monthlyPrice;
  const total = cycle === "yearly" ? unit * seats * 12 : unit * seats;

  const go = (next: number) => {
    moved.current = true;
    setDir(next > step ? "next" : "prev");
    setStep(next);
    onStepChange?.(next);
  };

  const check = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (name.trim().length < 2) e.name = "Enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = "Enter a valid work email.";
    }
    if (step === 1) {
      if (!luhn(card)) e.card = "This card number does not pass validation.";
      if (!/^(0[1-9]|1[0-2]) \/ \d{2}$/.test(expiry)) e.expiry = "Use MM / YY.";
      if (onlyDigits(cvc).length < 3) e.cvc = "3 or 4 digits.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!check()) return;
    if (step < 2) {
      go(step + 1);
      return;
    }
    moved.current = true;
    setDone(true);
    onComplete?.({
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      seats,
      cycle,
      cardBrand: brandOf(card),
      cardLast4: onlyDigits(card).slice(-4),
      total,
    });
  };

  const inv = (k: string) => (errors[k] ? "true" : undefined);
  const last4 = onlyDigits(card).slice(-4);
  const vars = { "--hb-qg3-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-qg3 ${className}`} style={vars} {...rest}>
      <style href="hb-checkout-stepper-card" precedence="default">{css}</style>
      <div className="hb-qg3-inner">
        <div className="hb-qg3-card">
          <div className="hb-qg3-head">
            <div className="hb-qg3-prod">
              <span className="hb-qg3-mark" aria-hidden="true">
                <svg viewBox="0 0 18 18" fill="none"><path d="M3 9h4l2-5 2 10 2-5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span>
                <b>{product} {plan}</b>
                <small>{seats} seats, billed {cycle}</small>
              </span>
            </div>
            <div className="hb-qg3-price">
              <b>{money.format(total)}</b>
              <small>{cycle === "yearly" ? "per year" : "per month"}</small>
            </div>
          </div>
          <div className="hb-qg3-stepwrap">
          <span className="hb-qg3-track" aria-hidden="true"><i style={{ transform: `scaleX(${done ? 1 : step / 2})` }} /></span>
          <ol className="hb-qg3-steps" aria-label="Checkout progress">
            {stepLabels.map((label, i) => {
              const state = done || i < step ? "done" : i === step ? "current" : "todo";
              return (
                <li key={label} className="hb-qg3-step" data-state={state} aria-current={state === "current" ? "step" : undefined}>
                  <span className="hb-qg3-dot">
                    {state === "done" ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    ) : i + 1}
                  </span>
                  {label}
                </li>
              );
            })}
          </ol>
          </div>
          <div className="hb-qg3-body">
            {done ? (
              <div className="hb-qg3-done" role="status">
                <span className="hb-qg3-ok">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <h3 ref={headRef} tabIndex={-1} className="hb-qg3-h">Welcome to {product}, {name.trim().split(" ")[0]}</h3>
                <p>{company.trim() || "Your workspace"} is on the {plan} with {seats} seats. Invites go out to your team as soon as you add them.</p>
              </div>
            ) : (
              <form
                key={step}
                className="hb-qg3-pane"
                data-dir={dir}
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  next();
                }}
              >
                {step === 0 ? (
                  <>
                    <h3 ref={headRef} tabIndex={-1} className="hb-qg3-h">Your details</h3>
                    <p className="hb-qg3-sub">We send the invoice and workspace invite here.</p>
                    <div className="hb-qg3-two">
                      <div className="hb-qg3-field">
                        <label className="hb-qg3-label" htmlFor={`${uid}-name`}>Full name</label>
                        <input id={`${uid}-name`} className="hb-qg3-input" autoComplete="name" value={name} aria-invalid={inv("name")} onChange={(e) => setName(e.target.value)} />
                        {errors.name ? <span className="hb-qg3-err">{errors.name}</span> : null}
                      </div>
                      <div className="hb-qg3-field">
                        <label className="hb-qg3-label" htmlFor={`${uid}-company`}>Company</label>
                        <input id={`${uid}-company`} className="hb-qg3-input" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} />
                      </div>
                    </div>
                    <div className="hb-qg3-field">
                      <label className="hb-qg3-label" htmlFor={`${uid}-email`}>Work email</label>
                      <input id={`${uid}-email`} className="hb-qg3-input" type="email" autoComplete="email" value={email} aria-invalid={inv("email")} onChange={(e) => setEmail(e.target.value)} />
                      {errors.email ? <span className="hb-qg3-err">{errors.email}</span> : null}
                    </div>
                    <div className="hb-qg3-seats">
                      <span>Seats</span>
                      <div className="hb-qg3-counter">
                        <button type="button" aria-label="Remove a seat" onClick={() => setSeats((s) => Math.max(1, s - 1))}>-</button>
                        <output aria-live="polite">{seats}</output>
                        <button type="button" aria-label="Add a seat" onClick={() => setSeats((s) => Math.min(500, s + 1))}>+</button>
                      </div>
                    </div>
                  </>
                ) : null}
                {step === 1 ? (
                  <>
                    <h3 ref={headRef} tabIndex={-1} className="hb-qg3-h">Payment</h3>
                    <p className="hb-qg3-sub">Test mode. Nothing is charged and nothing leaves this page.</p>
                    <div className="hb-qg3-cycle" role="radiogroup" aria-label="Billing cycle">
                      {(["monthly", "yearly"] as const).map((c) => (
                        <button key={c} type="button" role="radio" aria-checked={cycle === c} className="hb-qg3-cyc" onClick={() => setCycle(c)}>
                          <b>{c === "monthly" ? "Monthly" : "Yearly"}{c === "yearly" ? <em>-{Math.round((1 - yearlyPrice / monthlyPrice) * 100)}%</em> : null}</b>
                          <small>{money.format(c === "monthly" ? monthlyPrice : yearlyPrice)} per seat / month</small>
                        </button>
                      ))}
                    </div>
                    <div className="hb-qg3-field">
                      <label className="hb-qg3-label" htmlFor={`${uid}-card`}>Card number</label>
                      <input
                        id={`${uid}-card`}
                        className="hb-qg3-input"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="4242 4242 4242 4242"
                        value={card}
                        aria-invalid={inv("card")}
                        onChange={(e) => setCard(onlyDigits(e.target.value).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 "))}
                      />
                      {errors.card ? <span className="hb-qg3-err">{errors.card}</span> : null}
                    </div>
                    <div className="hb-qg3-two">
                      <div className="hb-qg3-field">
                        <label className="hb-qg3-label" htmlFor={`${uid}-exp`}>Expiry</label>
                        <input
                          id={`${uid}-exp`}
                          className="hb-qg3-input"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="MM / YY"
                          value={expiry}
                          aria-invalid={inv("expiry")}
                          onChange={(e) => {
                            const d = onlyDigits(e.target.value).slice(0, 4);
                            setExpiry(d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d);
                          }}
                        />
                        {errors.expiry ? <span className="hb-qg3-err">{errors.expiry}</span> : null}
                      </div>
                      <div className="hb-qg3-field">
                        <label className="hb-qg3-label" htmlFor={`${uid}-cvc`}>CVC</label>
                        <input id={`${uid}-cvc`} className="hb-qg3-input" inputMode="numeric" autoComplete="cc-csc" placeholder="123" value={cvc} aria-invalid={inv("cvc")} onChange={(e) => setCvc(onlyDigits(e.target.value).slice(0, 4))} />
                        {errors.cvc ? <span className="hb-qg3-err">{errors.cvc}</span> : null}
                      </div>
                    </div>
                  </>
                ) : null}
                {step === 2 ? (
                  <>
                    <h3 ref={headRef} tabIndex={-1} className="hb-qg3-h">Confirm and start</h3>
                    <ul className="hb-qg3-review">
                      <li><span>Account</span><b>{name.trim()}, {email.trim()}</b><button type="button" className="hb-qg3-edit" onClick={() => go(0)}>Edit</button></li>
                      <li><span>Plan</span><b>{plan}, {seats} seats</b><button type="button" className="hb-qg3-edit" onClick={() => go(0)}>Edit</button></li>
                      <li><span>Payment</span><b>{brandOf(card)} ending {last4 || "----"}</b><button type="button" className="hb-qg3-edit" onClick={() => go(1)}>Edit</button></li>
                    </ul>
                    <div className="hb-qg3-tot">
                      <span>Due today</span>
                      <b>{money.format(total)}</b>
                    </div>
                    <label className="hb-qg3-agree">
                      <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                      I agree that {product} renews this plan every {cycle === "yearly" ? "year" : "month"} until I cancel.
                    </label>
                  </>
                ) : null}
                <div className="hb-qg3-nav">
                  {step > 0 ? <button type="button" className="hb-qg3-back" onClick={() => go(step - 1)}>Back</button> : null}
                  <button type="submit" className="hb-qg3-next" disabled={step === 2 && !agree}>
                    {step === 2 ? `Start subscription` : `Continue to ${stepLabels[step + 1].toLowerCase()}`}
                    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </form>
            )}
            <p className="hb-qg3-foot">
              <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="2" y="5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M4 5V3.6a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1.3" /></svg>
              Cancel any time from workspace settings. Prices in {currency}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
