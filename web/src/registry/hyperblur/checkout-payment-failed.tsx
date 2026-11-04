"use client";

import * as React from "react";

export type PaymentRecoveryMethod = "retry" | "card" | "transfer";

export interface PaymentRecoveryValues {
  method: PaymentRecoveryMethod;
  amount: number;
  cardLast4: string;
}

export interface PaymentFailedBank {
  bank: string;
  accountName: string;
  account: string;
  routing: string;
}

export interface CheckoutPaymentFailedProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  merchant?: string;
  amount?: number;
  currency?: string;
  cardLabel?: string;
  reason?: string;
  reference?: string;
  bank?: PaymentFailedBank;
  supportEmail?: string;
  replyTime?: string;
  defaultMethod?: PaymentRecoveryMethod;
  onRecover?: (values: PaymentRecoveryValues) => void;
  onContact?: (channel: "chat" | "email") => void;
  accent?: string;
}

const defaultBank: PaymentFailedBank = {
  bank: "Harbor Point Bank",
  accountName: "Northwind Supply LLC",
  account: "0000 4471 2290",
  routing: "000 111 222",
};

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

const css = `
.hb-qg7 {
  --hb-qg7-accent: #f43f5e;
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
.hb-qg7 *, .hb-qg7 *::before, .hb-qg7 *::after { box-sizing: border-box; }
.hb-qg7::before { content: ""; position: absolute; left: 50%; top: -260px; width: 900px; height: 520px; margin-left: -450px; z-index: -1; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-qg7-accent) 14%, transparent), transparent); }
.hb-qg7-inner { max-width: 1120px; margin: 0 auto; padding: clamp(44px, 7cqw, 100px) clamp(16px, 4cqw, 32px); display: grid; gap: 20px; align-items: start; }
@container (min-width: 860px) { .hb-qg7-inner { grid-template-columns: minmax(0, 1fr) 320px; gap: 24px; } }
.hb-qg7-main { border: 1px solid rgba(255,255,255,.08); border-radius: 22px; background: linear-gradient(180deg, #121212, #0d0d0d); padding: clamp(20px, 3.4cqw, 34px); box-shadow: inset 0 1px 0 rgba(255,255,255,.05); }
.hb-qg7-top { display: flex; gap: 18px; align-items: flex-start; flex-wrap: wrap; }
.hb-qg7-icon { position: relative; width: 54px; height: 54px; flex: none; border-radius: 16px; display: grid; place-items: center; background: color-mix(in srgb, var(--hb-qg7-accent) 14%, #111); border: 1px solid color-mix(in srgb, var(--hb-qg7-accent) 40%, transparent); color: var(--hb-qg7-accent); animation: hb-qg7-shake .6s .2s cubic-bezier(.36,.07,.19,.97) both; }
.hb-qg7-icon::after { content: ""; position: absolute; inset: -1px; border-radius: inherit; border: 1px solid var(--hb-qg7-accent); animation: hb-qg7-ring 2.4s 1s ease-out infinite; opacity: 0; }
@keyframes hb-qg7-shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(3px); } 30%, 50%, 70% { transform: translateX(-5px); } 40%, 60% { transform: translateX(5px); } }
@keyframes hb-qg7-ring { 0% { transform: scale(1); opacity: .7; } 80%, 100% { transform: scale(1.45); opacity: 0; } }
.hb-qg7-icon svg { width: 24px; height: 24px; }
.hb-qg7-title { margin: 0; font-size: clamp(24px, 3.6cqw, 34px); letter-spacing: -0.03em; font-weight: 600; line-height: 1.1; }
.hb-qg7-lead { margin: 8px 0 0; color: #8f8f8f; font-size: 15px; line-height: 1.55; max-width: 560px; }
.hb-qg7-lead b { color: #ededed; font-weight: 500; }
.hb-qg7-facts { margin: 22px 0 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); border: 1px solid rgba(255,255,255,.08); border-radius: 14px; overflow: hidden; }
.hb-qg7-fact { padding: 12px 14px; display: grid; gap: 3px; border-right: 1px solid rgba(255,255,255,.06); }
.hb-qg7-fact:last-child { border-right: 0; }
.hb-qg7-fact dt { font-size: 11px; color: #6b6b6b; text-transform: uppercase; letter-spacing: .06em; }
.hb-qg7-fact dd { margin: 0; font-size: 13px; font-weight: 500; }
.hb-qg7-fact dd[data-bad="true"] { color: #fda4af; }
.hb-qg7-h { margin: 28px 0 12px; font-size: 14px; font-weight: 600; color: #a1a1a1; }
.hb-qg7-opts { display: grid; gap: 10px; }
.hb-qg7-opt { border: 1px solid rgba(255,255,255,.09); border-radius: 14px; background: #0d0d0d; transition: border-color .2s, background .2s; }
.hb-qg7-opt[data-on="true"] { border-color: color-mix(in srgb, #ededed 40%, transparent); background: #131313; }
.hb-qg7-radio { width: 100%; display: grid; grid-template-columns: 20px 36px 1fr auto; gap: 12px; align-items: center; text-align: left; background: none; border: 0; color: inherit; font: inherit; padding: 14px 16px; cursor: pointer; border-radius: 14px; }
.hb-qg7-radio:focus-visible { outline: 2px solid var(--hb-qg7-accent); outline-offset: -2px; }
.hb-qg7-dot { width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,.25); display: grid; place-items: center; }
.hb-qg7-dot::after { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #ededed; transform: scale(0); transition: transform .2s cubic-bezier(.3,1.5,.5,1); }
.hb-qg7-opt[data-on="true"] .hb-qg7-dot { border-color: #ededed; }
.hb-qg7-opt[data-on="true"] .hb-qg7-dot::after { transform: scale(1); }
.hb-qg7-oico { width: 36px; height: 36px; border-radius: 10px; background: #1a1a1a; border: 1px solid rgba(255,255,255,.08); display: grid; place-items: center; color: #d4d4d4; }
.hb-qg7-oico svg { width: 16px; height: 16px; }
.hb-qg7-radio b { display: block; font-size: 14px; font-weight: 600; }
.hb-qg7-radio small { display: block; font-size: 12px; color: #8f8f8f; margin-top: 2px; }
.hb-qg7-badge { font-size: 11px; color: #a1a1a1; border: 1px solid rgba(255,255,255,.1); border-radius: 999px; padding: 3px 8px; white-space: nowrap; }
.hb-qg7-more { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s cubic-bezier(.2,.8,.2,1); }
.hb-qg7-opt[data-on="true"] .hb-qg7-more { grid-template-rows: 1fr; }
.hb-qg7-more > div { overflow: hidden; }
.hb-qg7-pad { padding: 0 16px 16px 84px; }
@container (max-width: 520px) { .hb-qg7-pad { padding-left: 16px; } .hb-qg7-badge { display: none; } .hb-qg7-radio { grid-template-columns: 20px 36px 1fr; } }
.hb-qg7-row { display: grid; grid-template-columns: 1.6fr 1fr .8fr; gap: 8px; }
.hb-qg7-input { width: 100%; height: 42px; border-radius: 10px; border: 1px solid rgba(255,255,255,.1); background: #0a0a0a; color: #ededed; font: inherit; font-size: 14px; padding: 0 12px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-qg7-input::placeholder { color: #555; }
.hb-qg7-input:focus { border-color: #ededed; box-shadow: 0 0 0 3px rgba(255,255,255,.12); }
.hb-qg7-input[aria-invalid="true"] { border-color: var(--hb-qg7-accent); }
.hb-qg7-bank { display: grid; gap: 1px; border-radius: 12px; overflow: hidden; background: rgba(255,255,255,.06); }
.hb-qg7-bank div { display: grid; grid-template-columns: 120px 1fr auto; gap: 8px; align-items: center; padding: 9px 12px; background: #0f0f0f; font-size: 13px; }
.hb-qg7-bank span { color: #8f8f8f; font-size: 12px; }
.hb-qg7-bank b { font-weight: 500; font-variant-numeric: tabular-nums; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qg7-copy { background: none; border: 1px solid rgba(255,255,255,.1); color: #a1a1a1; border-radius: 6px; font: inherit; font-size: 11px; padding: 3px 8px; cursor: pointer; }
.hb-qg7-copy:hover { color: #ededed; border-color: rgba(255,255,255,.25); }
.hb-qg7-copy:focus-visible, .hb-qg7-cta:focus-visible, .hb-qg7-sbtn:focus-visible { outline: 2px solid var(--hb-qg7-accent); outline-offset: 2px; }
.hb-qg7-note { margin: 8px 0 0; font-size: 12px; color: #6b6b6b; }
.hb-qg7-err { margin: 8px 0 0; font-size: 12px; color: #fda4af; }
.hb-qg7-foot { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; margin-top: 22px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,.06); }
.hb-qg7-foot p { margin: 0; font-size: 12px; color: #6b6b6b; }
.hb-qg7-cta { height: 48px; padding: 0 22px; border: 0; border-radius: 12px; background: #ededed; color: #0a0a0a; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 10px; transition: filter .2s, transform .15s; }
.hb-qg7-cta:hover { filter: brightness(.92); }
.hb-qg7-cta:active { transform: translateY(1px); }
.hb-qg7-cta[disabled] { cursor: progress; opacity: .8; }
.hb-qg7-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(0,0,0,.2); border-top-color: #0a0a0a; animation: hb-qg7-rot .8s linear infinite; }
@keyframes hb-qg7-rot { to { transform: rotate(360deg); } }
.hb-qg7-ok { display: flex; gap: 14px; align-items: center; margin-top: 22px; padding: 16px; border-radius: 14px; border: 1px solid rgba(52,211,153,.3); background: rgba(52,211,153,.08); animation: hb-qg7-in .4s ease; }
@keyframes hb-qg7-in { from { opacity: 0; transform: translateY(6px); } }
.hb-qg7-ok svg { width: 28px; height: 28px; color: #34d399; flex: none; }
.hb-qg7-ok b { display: block; font-size: 14px; }
.hb-qg7-ok span { font-size: 13px; color: #a1a1a1; }
.hb-qg7-side { display: grid; gap: 14px; }
.hb-qg7-card { border: 1px solid rgba(255,255,255,.08); border-radius: 18px; background: #111; padding: 20px; }
.hb-qg7-avatars { display: flex; }
.hb-qg7-av { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; font-weight: 600; color: #0a0a0a; border: 2px solid #111; margin-left: -8px; }
.hb-qg7-av:first-child { margin-left: 0; }
.hb-qg7-online { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #a1a1a1; margin-left: 10px; align-self: center; }
.hb-qg7-online::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 3px rgba(52,211,153,.18); }
.hb-qg7-card h3 { margin: 14px 0 4px; font-size: 16px; font-weight: 600; }
.hb-qg7-card p { margin: 0; font-size: 13px; color: #8f8f8f; line-height: 1.55; }
.hb-qg7-sbtns { display: grid; gap: 8px; margin-top: 16px; }
.hb-qg7-sbtn { height: 40px; border-radius: 10px; border: 1px solid rgba(255,255,255,.1); background: #171717; color: #ededed; font: inherit; font-size: 13px; font-weight: 500; display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; text-decoration: none; transition: background .2s; }
.hb-qg7-sbtn:hover { background: #1f1f1f; }
.hb-qg7-sbtn svg { width: 14px; height: 14px; }
.hb-qg7-ref { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.06); font-size: 12px; color: #6b6b6b; }
.hb-qg7-ref code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #d4d4d4; font-size: 12px; }
.hb-qg7-why { list-style: none; margin: 10px 0 0; padding: 0; display: grid; gap: 8px; font-size: 13px; color: #a1a1a1; }
.hb-qg7-why li { display: flex; gap: 8px; }
.hb-qg7-why li::before { content: ""; flex: none; width: 5px; height: 5px; border-radius: 50%; margin-top: 7px; background: var(--hb-qg7-accent); }
@media (prefers-reduced-motion: reduce) {
  .hb-qg7 *, .hb-qg7 *::before, .hb-qg7 *::after { animation: none !important; transition: none !important; }
}
`;

const options: { id: PaymentRecoveryMethod; title: string; hint: string; badge: string }[] = [
  { id: "retry", title: "Try the same card again", hint: "Approve the charge in your banking app first, then retry.", badge: "Fastest" },
  { id: "card", title: "Use a different card", hint: "Debit or credit. Your order stays reserved.", badge: "Instant" },
  { id: "transfer", title: "Pay by bank transfer", hint: "We ship as soon as the transfer lands.", badge: "1 to 2 days" },
];

function OptionIcon({ id }: { id: PaymentRecoveryMethod }) {
  if (id === "retry") return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13.5 8A5.5 5.5 0 113.9 4.3M3.5 1.5v3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (id === "card") return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1.5" y="3.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M1.5 6.5h13M4 10h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 6.5L8 2.5l6 4M3 7v5M6.3 7v5M9.7 7v5M13 7v5M2 13.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function CheckoutPaymentFailed({
  title = "Your payment was declined",
  merchant = "Northwind Supply",
  amount = 86.4,
  currency = "USD",
  cardLabel = "Visa ending 0341",
  reason = "Insufficient funds",
  reference = "NW-20931",
  bank = defaultBank,
  supportEmail = "billing@northwind.example",
  replyTime = "about 6 minutes",
  defaultMethod = "retry",
  onRecover,
  onContact,
  accent = "#f43f5e",
  className = "",
  style,
  ...rest
}: CheckoutPaymentFailedProps) {
  const uid = React.useId();
  const money = React.useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency }), [currency]);
  const [method, setMethod] = React.useState<PaymentRecoveryMethod>(defaultMethod);
  const [card, setCard] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [error, setError] = React.useState("");
  const [copied, setCopied] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "processing" | "done">("idle");
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const pick = (i: number) => {
    const n = (i + options.length) % options.length;
    setMethod(options[n].id);
    setError("");
    refs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      pick(i + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      pick(i - 1);
    }
  };

  const copy = (label: string, value: string) => {
    navigator.clipboard?.writeText(value).then(
      () => {
        setCopied(label);
        setTimeout(() => setCopied(""), 1400);
      },
      () => undefined,
    );
  };

  const go = () => {
    if (status !== "idle") return;
    if (method === "card") {
      if (!luhn(card)) return setError("That card number does not look right.");
      if (!/^(0[1-9]|1[0-2]) \/ \d{2}$/.test(expiry)) return setError("Use MM / YY for the expiry date.");
      if (onlyDigits(cvc).length < 3) return setError("Enter the security code.");
    }
    setError("");
    setStatus("processing");
    timer.current = setTimeout(() => {
      setStatus("done");
      onRecover?.({ method, amount, cardLast4: method === "card" ? onlyDigits(card).slice(-4) : method === "retry" ? onlyDigits(cardLabel).slice(-4) : "" });
    }, 1200);
  };

  const ctaLabel = method === "retry" ? `Retry ${money.format(amount)}` : method === "card" ? `Pay ${money.format(amount)}` : "I have sent the transfer";
  const doneText =
    method === "transfer"
      ? { t: "Thanks, we are watching for it", s: `Your order ships as soon as ${money.format(amount)} arrives with reference ${reference}.` }
      : { t: "Payment went through", s: `${money.format(amount)} paid to ${merchant}. Your order is back in the queue.` };
  const vars = { "--hb-qg7-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-qg7 ${className}`} style={vars} {...rest}>
      <style href="hb-checkout-payment-failed" precedence="default">{css}</style>
      <div className="hb-qg7-inner">
        <div className="hb-qg7-main">
          <div className="hb-qg7-top">
            <span className="hb-qg7-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="5" width="19" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" /><path d="M2.5 9.5h19" stroke="currentColor" strokeWidth="1.7" /><path d="M15 13.5l4 4M19 13.5l-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
            </span>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 className="hb-qg7-title">{title}</h2>
              <p className="hb-qg7-lead">Your bank turned down the <b>{money.format(amount)}</b> charge from {merchant}. Nothing was taken from your account and your items are held for 24 hours.</p>
            </div>
          </div>
          <dl className="hb-qg7-facts">
            <div className="hb-qg7-fact"><dt>Card</dt><dd>{cardLabel}</dd></div>
            <div className="hb-qg7-fact"><dt>Reason</dt><dd data-bad="true">{reason}</dd></div>
            <div className="hb-qg7-fact"><dt>Order</dt><dd>{reference}</dd></div>
          </dl>
          {status === "done" ? (
            <div className="hb-qg7-ok" role="status">
              <svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><circle cx="14" cy="14" r="12.5" stroke="currentColor" strokeWidth="1.6" /><path d="M8.5 14.4l3.6 3.6 7.4-7.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div><b>{doneText.t}</b><span>{doneText.s}</span></div>
            </div>
          ) : (
            <>
              <h3 className="hb-qg7-h" id={`${uid}-opts`}>Choose how to finish your order</h3>
              <div className="hb-qg7-opts" role="radiogroup" aria-labelledby={`${uid}-opts`}>
                {options.map((o, i) => {
                  const on = o.id === method;
                  return (
                    <div key={o.id} className="hb-qg7-opt" data-on={on ? "true" : "false"}>
                      <button
                        ref={(el) => { refs.current[i] = el; }}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        tabIndex={on ? 0 : -1}
                        className="hb-qg7-radio"
                        onClick={() => pick(i)}
                        onKeyDown={(e) => onKey(e, i)}
                      >
                        <span className="hb-qg7-dot" aria-hidden="true" />
                        <span className="hb-qg7-oico"><OptionIcon id={o.id} /></span>
                        <span><b>{o.title}</b><small>{o.hint}</small></span>
                        <span className="hb-qg7-badge">{o.badge}</span>
                      </button>
                      {o.id !== "retry" ? (
                        <div className="hb-qg7-more" aria-hidden={on ? undefined : true}>
                          <div>
                            <div className="hb-qg7-pad">
                              {o.id === "card" ? (
                                <>
                                  <div className="hb-qg7-row">
                                    <input className="hb-qg7-input" aria-label="Card number" inputMode="numeric" autoComplete="cc-number" placeholder="5555 5555 5555 4444" tabIndex={on ? 0 : -1} value={card} aria-invalid={error && method === "card" ? "true" : undefined} onChange={(e) => setCard(onlyDigits(e.target.value).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 "))} />
                                    <input className="hb-qg7-input" aria-label="Expiry date" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" tabIndex={on ? 0 : -1} value={expiry} onChange={(e) => { const d = onlyDigits(e.target.value).slice(0, 4); setExpiry(d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d); }} />
                                    <input className="hb-qg7-input" aria-label="Security code" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" tabIndex={on ? 0 : -1} value={cvc} onChange={(e) => setCvc(onlyDigits(e.target.value).slice(0, 4))} />
                                  </div>
                                  {error ? <p className="hb-qg7-err" role="alert">{error}</p> : <p className="hb-qg7-note">Test mode. Card details never leave this page.</p>}
                                </>
                              ) : (
                                <>
                                  <div className="hb-qg7-bank">
                                    {[
                                      ["Bank", bank.bank],
                                      ["Account name", bank.accountName],
                                      ["Account", bank.account],
                                      ["Routing", bank.routing],
                                      ["Reference", reference],
                                    ].map(([k, v]) => (
                                      <div key={k}>
                                        <span>{k}</span>
                                        <b>{v}</b>
                                        <button type="button" className="hb-qg7-copy" tabIndex={on ? 0 : -1} onClick={() => copy(k, v)} aria-label={`Copy ${k}`}>{copied === k ? "Copied" : "Copy"}</button>
                                      </div>
                                    ))}
                                  </div>
                                  <p className="hb-qg7-note">Sample details for a demo account. Always include the reference.</p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <div className="hb-qg7-foot">
                <p>Items held until tomorrow, 10:42.</p>
                <button type="button" className="hb-qg7-cta" onClick={go} disabled={status === "processing"}>
                  {status === "processing" ? <><span className="hb-qg7-spin" aria-hidden="true" />Working on it</> : ctaLabel}
                </button>
              </div>
            </>
          )}
        </div>
        <aside className="hb-qg7-side">
          <div className="hb-qg7-card">
            <div className="hb-qg7-avatars" aria-hidden="true">
              <span className="hb-qg7-av" style={{ background: "#fda4af" }}>RK</span>
              <span className="hb-qg7-av" style={{ background: "#93c5fd" }}>TO</span>
              <span className="hb-qg7-av" style={{ background: "#fcd34d" }}>LM</span>
              <span className="hb-qg7-online">Online</span>
            </div>
            <h3>Need a hand?</h3>
            <p>The billing team replies in {replyTime}. Share your order reference and we will sort it out.</p>
            <div className="hb-qg7-sbtns">
              <button type="button" className="hb-qg7-sbtn" onClick={() => onContact?.("chat")}>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 7.5a5.5 5 0 1111 0 5.5 5 0 01-7.6 4.6L2.5 13l.9-2.7a4.8 4.8 0 01-.9-2.8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                Chat with billing
              </button>
              <a className="hb-qg7-sbtn" href={`mailto:${supportEmail}?subject=${encodeURIComponent(`Declined payment ${reference}`)}`} onClick={() => onContact?.("email")}>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                Email {supportEmail.split("@")[0]}
              </a>
            </div>
            <div className="hb-qg7-ref">
              <span>Reference <code>{reference}</code></span>
              <button type="button" className="hb-qg7-copy" onClick={() => copy("ref", reference)}>{copied === "ref" ? "Copied" : "Copy"}</button>
            </div>
          </div>
          <div className="hb-qg7-card">
            <h3 style={{ marginTop: 0 }}>Why cards get declined</h3>
            <ul className="hb-qg7-why">
              <li>Not enough available balance or credit</li>
              <li>The bank flagged an unusual purchase</li>
              <li>Expired card or a typo in the details</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
