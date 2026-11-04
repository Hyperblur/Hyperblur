"use client";

import * as React from "react";

export interface BillingMethod {
  id: string;
  kind: "visa" | "mastercard" | "amex" | "bank";
  label: string;
  detail: string;
}

export interface BillingUsage {
  label: string;
  used: number;
  limit: number;
  unit?: string;
}

export interface BillingPlanInfo {
  name: string;
  price: number;
  period: string;
  renews: string;
  seats: string;
}

export interface BillingTaxId {
  type: string;
  value: string;
}

export interface CheckoutBillingSettingsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  plan?: BillingPlanInfo;
  methods?: BillingMethod[];
  defaultMethodId?: string;
  usage?: BillingUsage[];
  billingEmail?: string;
  taxId?: BillingTaxId;
  currency?: string;
  onChangePlan?: () => void;
  onCancelPlan?: () => void;
  onAddMethod?: () => void;
  onDefaultChange?: (id: string) => void;
  onRemoveMethod?: (id: string) => void;
  onEmailSave?: (email: string) => void;
  onTaxIdSave?: (taxId: BillingTaxId) => void;
  accent?: string;
}

const defaultPlan: BillingPlanInfo = { name: "Team", price: 96, period: "month", renews: "Dec 1, 2026", seats: "8 of 10 seats" };

const defaultMethods: BillingMethod[] = [
  { id: "pm_visa", kind: "visa", label: "Visa ending 4242", detail: "Expires 08 / 28" },
  { id: "pm_mc", kind: "mastercard", label: "Mastercard ending 4444", detail: "Expires 03 / 27" },
  { id: "pm_bank", kind: "bank", label: "Harbor Point Bank", detail: "Checking ending 6789" },
];

const defaultUsage: BillingUsage[] = [
  { label: "Seats", used: 8, limit: 10 },
  { label: "Build minutes", used: 3240, limit: 5000 },
  { label: "Storage", used: 42, limit: 100, unit: "GB" },
  { label: "Bandwidth", used: 912, limit: 1000, unit: "GB" },
];

const taxTypes: { id: string; label: string; placeholder: string; pattern: RegExp }[] = [
  { id: "eu_vat", label: "EU VAT", placeholder: "DE123456789", pattern: /^[A-Z]{2}[0-9A-Z]{8,12}$/ },
  { id: "gb_vat", label: "GB VAT", placeholder: "GB123456789", pattern: /^GB\d{9}$/ },
  { id: "us_ein", label: "US EIN", placeholder: "12-3456789", pattern: /^\d{2}-\d{7}$/ },
  { id: "au_abn", label: "AU ABN", placeholder: "12 345 678 901", pattern: /^\d{2} \d{3} \d{3} \d{3}$/ },
];

const num = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const css = `
.hb-qg8 {
  --hb-qg8-accent: #7c3aed;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #fafafa;
  color: #18181b;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-qg8 *, .hb-qg8 *::before, .hb-qg8 *::after { box-sizing: border-box; }
.hb-qg8-inner { max-width: 1120px; margin: 0 auto; padding: clamp(40px, 6cqw, 88px) clamp(16px, 4cqw, 32px); }
.hb-qg8-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; padding-bottom: 20px; border-bottom: 1px solid #e4e4e7; }
.hb-qg8-title { margin: 0; font-size: clamp(26px, 3.6cqw, 34px); letter-spacing: -0.03em; font-weight: 600; }
.hb-qg8-sub { margin: 6px 0 0; font-size: 14px; color: #71717a; }
.hb-qg8-tabs { display: flex; gap: 4px; padding: 4px; background: #f0f0f2; border-radius: 10px; }
.hb-qg8-tabs span { font-size: 13px; padding: 6px 12px; border-radius: 7px; color: #71717a; }
.hb-qg8-tabs span[data-on="true"] { background: #fff; color: #18181b; box-shadow: 0 1px 2px rgba(0,0,0,.08); font-weight: 500; }
.hb-qg8-grid { display: grid; gap: 16px; margin-top: 24px; align-items: start; }
@container (min-width: 860px) { .hb-qg8-grid { grid-template-columns: minmax(0, 1fr) 340px; gap: 20px; } }
.hb-qg8-col { display: grid; gap: 16px; min-width: 0; }
.hb-qg8-card { background: #fff; border: 1px solid #e4e4e7; border-radius: 16px; padding: 20px; box-shadow: 0 1px 2px rgba(0,0,0,.03); }
.hb-qg8-ch { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 14px; }
.hb-qg8-ch h3 { margin: 0; font-size: 15px; font-weight: 600; }
.hb-qg8-ch p { margin: 2px 0 0; font-size: 12px; color: #71717a; }
.hb-qg8-plan { position: relative; overflow: hidden; border-color: color-mix(in srgb, var(--hb-qg8-accent) 30%, #e4e4e7); background: radial-gradient(120% 140% at 100% 0%, color-mix(in srgb, var(--hb-qg8-accent) 10%, #fff), #fff 60%); }
.hb-qg8-plan::after { content: ""; position: absolute; right: -40px; top: -40px; width: 160px; height: 160px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--hb-qg8-accent) 22%, transparent); box-shadow: 0 0 0 24px color-mix(in srgb, var(--hb-qg8-accent) 4%, transparent), 0 0 0 48px color-mix(in srgb, var(--hb-qg8-accent) 3%, transparent); pointer-events: none; }
.hb-qg8-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 999px; background: #ecfdf5; color: #047857; }
.hb-qg8-pill::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.hb-qg8-pname { display: flex; align-items: center; gap: 10px; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
.hb-qg8-price { margin: 10px 0 0; font-size: 13px; color: #71717a; }
.hb-qg8-price b { font-size: 34px; color: #18181b; letter-spacing: -0.04em; font-weight: 600; margin-right: 4px; }
.hb-qg8-pmeta { display: flex; gap: 18px; flex-wrap: wrap; margin: 14px 0 0; font-size: 13px; color: #52525b; }
.hb-qg8-pmeta span { display: inline-flex; align-items: center; gap: 6px; }
.hb-qg8-pmeta svg { width: 14px; height: 14px; color: #a1a1aa; }
.hb-qg8-pact { display: flex; gap: 8px; margin-top: 18px; position: relative; z-index: 1; }
.hb-qg8-btn { height: 36px; padding: 0 14px; border-radius: 9px; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: background .2s, border-color .2s, filter .2s; }
.hb-qg8-primary { border: 0; background: var(--hb-qg8-accent); color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,.2); }
.hb-qg8-primary:hover { filter: brightness(1.1); }
.hb-qg8-sec { border: 1px solid #e4e4e7; background: #fff; color: #18181b; }
.hb-qg8-sec:hover { background: #f4f4f5; }
.hb-qg8-danger { border: 0; background: #dc2626; color: #fff; }
.hb-qg8-danger:hover { filter: brightness(1.08); }
.hb-qg8-text { border: 0; background: none; color: #71717a; padding: 0 8px; }
.hb-qg8-text:hover { color: #18181b; }
.hb-qg8-btn:focus-visible, .hb-qg8-link:focus-visible { outline: 2px solid var(--hb-qg8-accent); outline-offset: 2px; }
.hb-qg8-btn[disabled] { opacity: .45; cursor: not-allowed; }
.hb-qg8-btn svg { width: 14px; height: 14px; }
.hb-qg8-methods { list-style: none; margin: 0; padding: 0; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; }
.hb-qg8-m { display: grid; grid-template-columns: 46px 1fr auto; gap: 12px; align-items: center; padding: 12px 14px; transition: background .2s; animation: hb-qg8-in .35s ease both; }
@keyframes hb-qg8-in { from { opacity: 0; transform: translateY(4px); } }
.hb-qg8-m + .hb-qg8-m, .hb-qg8-confirm { border-top: 1px solid #f0f0f2; }
.hb-qg8-m:hover { background: #fafafa; }
.hb-qg8-brand { width: 46px; height: 30px; border-radius: 6px; display: grid; place-items: center; font-size: 9px; font-weight: 800; letter-spacing: .04em; color: #fff; }
.hb-qg8-brand[data-kind="visa"] { background: linear-gradient(135deg, #1e3a8a, #2563eb); font-style: italic; }
.hb-qg8-brand[data-kind="mastercard"] { background: #18181b; }
.hb-qg8-brand[data-kind="amex"] { background: linear-gradient(135deg, #0e7490, #22d3ee); }
.hb-qg8-brand[data-kind="bank"] { background: #f4f4f5; color: #52525b; border: 1px solid #e4e4e7; }
.hb-qg8-brand svg { width: 16px; height: 16px; }
.hb-qg8-mc { position: relative; width: 22px; height: 14px; }
.hb-qg8-mc::before, .hb-qg8-mc::after { content: ""; position: absolute; top: 0; width: 14px; height: 14px; border-radius: 50%; }
.hb-qg8-mc::before { left: 0; background: #ef4444; }
.hb-qg8-mc::after { right: 0; background: #f59e0b; mix-blend-mode: screen; opacity: .9; }
.hb-qg8-mname { font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.hb-qg8-def { font-size: 11px; font-weight: 600; color: var(--hb-qg8-accent); background: color-mix(in srgb, var(--hb-qg8-accent) 10%, #fff); padding: 2px 7px; border-radius: 999px; }
.hb-qg8-mdet { font-size: 12px; color: #71717a; }
.hb-qg8-macts { display: flex; gap: 2px; }
.hb-qg8-link { border: 0; background: none; font: inherit; font-size: 12px; color: #52525b; padding: 6px 8px; border-radius: 6px; cursor: pointer; }
.hb-qg8-link:hover { background: #f4f4f5; color: #18181b; }
.hb-qg8-link[data-danger="true"]:hover { color: #dc2626; background: #fef2f2; }
.hb-qg8-link[disabled] { opacity: .4; cursor: not-allowed; }
.hb-qg8-confirm { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; padding: 12px 14px; background: #fef2f2; font-size: 13px; color: #7f1d1d; animation: hb-qg8-in .25s ease; }
.hb-qg8-confirm div { display: flex; gap: 6px; }
.hb-qg8-form { display: grid; gap: 16px; }
@container (min-width: 560px) { .hb-qg8-form { grid-template-columns: 1fr 1fr; } }
.hb-qg8-field { display: grid; gap: 6px; min-width: 0; }
.hb-qg8-label { font-size: 13px; font-weight: 500; }
.hb-qg8-help { font-size: 12px; color: #71717a; }
.hb-qg8-help[data-err="true"] { color: #dc2626; }
.hb-qg8-help[data-ok="true"] { color: #047857; }
.hb-qg8-inrow { display: flex; gap: 8px; }
.hb-qg8-input, .hb-qg8-select { height: 38px; border-radius: 9px; border: 1px solid #e4e4e7; background: #fff; color: #18181b; font: inherit; font-size: 14px; padding: 0 11px; outline: none; min-width: 0; transition: border-color .2s, box-shadow .2s; }
.hb-qg8-input { flex: 1; }
.hb-qg8-input::placeholder { color: #a1a1aa; }
.hb-qg8-input:focus, .hb-qg8-select:focus { border-color: var(--hb-qg8-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qg8-accent) 15%, transparent); }
.hb-qg8-input[aria-invalid="true"] { border-color: #dc2626; }
.hb-qg8-select { flex: none; width: 104px; }
.hb-qg8-meter { display: grid; gap: 14px; list-style: none; margin: 0; padding: 0; }
.hb-qg8-mrow { display: grid; gap: 7px; }
.hb-qg8-mtop { display: flex; justify-content: space-between; font-size: 13px; }
.hb-qg8-mtop span:last-child { color: #71717a; font-variant-numeric: tabular-nums; }
.hb-qg8-track { height: 7px; border-radius: 4px; background: #f0f0f2; overflow: hidden; }
.hb-qg8-fill { height: 100%; border-radius: 4px; background: var(--hb-qg8-accent); transform-origin: left; animation: hb-qg8-grow 1.1s cubic-bezier(.2,.8,.2,1) both; }
.hb-qg8-fill[data-warn="true"] { background: #f59e0b; }
@keyframes hb-qg8-grow { from { transform: scaleX(0); } }
.hb-qg8-warn { margin: 14px 0 0; display: flex; gap: 8px; padding: 10px 12px; border-radius: 10px; background: #fffbeb; color: #92400e; font-size: 12px; line-height: 1.45; }
.hb-qg8-warn svg { width: 14px; height: 14px; flex: none; margin-top: 1px; }
.hb-qg8-inv { display: flex; justify-content: space-between; align-items: baseline; }
.hb-qg8-inv b { font-size: 26px; letter-spacing: -0.03em; font-weight: 600; }
.hb-qg8-inv span { font-size: 12px; color: #71717a; }
.hb-qg8-invl { list-style: none; margin: 12px 0 0; padding: 12px 0 0; border-top: 1px dashed #e4e4e7; display: grid; gap: 8px; font-size: 13px; color: #52525b; }
.hb-qg8-invl li { display: flex; justify-content: space-between; font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) {
  .hb-qg8 *, .hb-qg8 *::before, .hb-qg8 *::after { animation: none !important; transition: none !important; }
}
`;

function BrandMark({ kind }: { kind: BillingMethod["kind"] }) {
  if (kind === "visa") return <>VISA</>;
  if (kind === "amex") return <>AMEX</>;
  if (kind === "mastercard") return <span className="hb-qg8-mc" />;
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 6.5L8 2.5l6 4M3 7v5M6.3 7v5M9.7 7v5M13 7v5M2 13.5h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function CheckoutBillingSettings({
  title = "Billing",
  subtitle = "Manage the plan, payment methods and invoices for Halcyon Labs.",
  plan = defaultPlan,
  methods = defaultMethods,
  defaultMethodId,
  usage = defaultUsage,
  billingEmail = "finance@halcyon.io",
  taxId = { type: "eu_vat", value: "DE287634519" },
  currency = "USD",
  onChangePlan,
  onCancelPlan,
  onAddMethod,
  onDefaultChange,
  onRemoveMethod,
  onEmailSave,
  onTaxIdSave,
  accent = "#7c3aed",
  className = "",
  style,
  ...rest
}: CheckoutBillingSettingsProps) {
  const uid = React.useId();
  const money = React.useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency }), [currency]);
  const [list, setList] = React.useState(methods);
  const [def, setDef] = React.useState(defaultMethodId ?? methods[0]?.id ?? "");
  const [confirming, setConfirming] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState(billingEmail);
  const [emailState, setEmailState] = React.useState<"idle" | "error" | "saved">("idle");
  const [taxType, setTaxType] = React.useState(taxId.type);
  const [taxValue, setTaxValue] = React.useState(taxId.value);
  const [taxState, setTaxState] = React.useState<"idle" | "error" | "saved">("idle");

  const tax = taxTypes.find((t) => t.id === taxType) ?? taxTypes[0];

  const makeDefault = (id: string) => {
    setDef(id);
    onDefaultChange?.(id);
  };
  const remove = (id: string) => {
    setList((l) => l.filter((m) => m.id !== id));
    setConfirming(null);
    onRemoveMethod?.(id);
  };
  const saveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setEmailState("error");
      return;
    }
    setEmailState("saved");
    onEmailSave?.(email.trim());
  };
  const saveTax = (e: React.FormEvent) => {
    e.preventDefault();
    const v = taxValue.trim().toUpperCase();
    if (!tax.pattern.test(v)) {
      setTaxState("error");
      return;
    }
    setTaxValue(v);
    setTaxState("saved");
    onTaxIdSave?.({ type: tax.id, value: v });
  };

  const hot = usage.find((u) => u.used / u.limit >= 0.85);
  const vars = { "--hb-qg8-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-qg8 ${className}`} style={vars} {...rest}>
      <style href="hb-checkout-billing-settings" precedence="default">{css}</style>
      <div className="hb-qg8-inner">
        <div className="hb-qg8-head">
          <div>
            <h2 className="hb-qg8-title">{title}</h2>
            {subtitle ? <p className="hb-qg8-sub">{subtitle}</p> : null}
          </div>
          <div className="hb-qg8-tabs" aria-hidden="true">
            <span>General</span>
            <span>Members</span>
            <span data-on="true">Billing</span>
            <span>Security</span>
          </div>
        </div>
        <div className="hb-qg8-grid">
          <div className="hb-qg8-col">
            <div className="hb-qg8-card hb-qg8-plan">
              <h3 className="hb-qg8-pname">{plan.name} plan <span className="hb-qg8-pill">Active</span></h3>
              <p className="hb-qg8-price"><b>{money.format(plan.price)}</b>per {plan.period}</p>
              <div className="hb-qg8-pmeta">
                <span><svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><rect x="1.5" y="2.5" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M1.5 5.5h11M4.5 1v3M9.5 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>Renews {plan.renews}</span>
                <span><svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.3" /><path d="M1.5 12c.5-2 1.8-3 3.5-3s3 1 3.5 3M9.5 2.6a2 2 0 010 3.8M10.8 8.8c.9.4 1.4 1.4 1.7 2.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>{plan.seats}</span>
              </div>
              <div className="hb-qg8-pact">
                <button type="button" className="hb-qg8-btn hb-qg8-primary" onClick={() => onChangePlan?.()}>Change plan</button>
                <button type="button" className="hb-qg8-btn hb-qg8-text" onClick={() => onCancelPlan?.()}>Cancel subscription</button>
              </div>
            </div>
            <div className="hb-qg8-card">
              <div className="hb-qg8-ch">
                <div>
                  <h3>Payment methods</h3>
                  <p>The default method is charged on each renewal.</p>
                </div>
                <button type="button" className="hb-qg8-btn hb-qg8-sec" onClick={() => onAddMethod?.()}>
                  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  Add
                </button>
              </div>
              <ul className="hb-qg8-methods">
                {list.map((m) => (
                  <React.Fragment key={m.id}>
                    <li className="hb-qg8-m">
                      <span className="hb-qg8-brand" data-kind={m.kind} aria-hidden="true"><BrandMark kind={m.kind} /></span>
                      <span>
                        <span className="hb-qg8-mname">{m.label}{m.id === def ? <span className="hb-qg8-def">Default</span> : null}</span>
                        <span className="hb-qg8-mdet">{m.detail}</span>
                      </span>
                      <span className="hb-qg8-macts">
                        {m.id !== def ? <button type="button" className="hb-qg8-link" onClick={() => makeDefault(m.id)}>Make default</button> : null}
                        <button
                          type="button"
                          className="hb-qg8-link"
                          data-danger="true"
                          disabled={m.id === def}
                          title={m.id === def ? "Choose another default before removing this one" : undefined}
                          aria-label={`Remove ${m.label}`}
                          aria-expanded={confirming === m.id}
                          onClick={() => setConfirming(m.id)}
                        >
                          Remove
                        </button>
                      </span>
                    </li>
                    {confirming === m.id ? (
                      <li className="hb-qg8-confirm" role="alert">
                        <span>Remove {m.label}? Future invoices will not use it.</span>
                        <div>
                          <button type="button" className="hb-qg8-btn hb-qg8-sec" onClick={() => setConfirming(null)}>Keep</button>
                          <button type="button" className="hb-qg8-btn hb-qg8-danger" onClick={() => remove(m.id)}>Remove</button>
                        </div>
                      </li>
                    ) : null}
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <div className="hb-qg8-card">
              <div className="hb-qg8-ch">
                <div>
                  <h3>Billing details</h3>
                  <p>Shown on every invoice we send.</p>
                </div>
              </div>
              <div className="hb-qg8-form">
                <form className="hb-qg8-field" onSubmit={saveEmail} noValidate>
                  <label className="hb-qg8-label" htmlFor={`${uid}-email`}>Billing email</label>
                  <div className="hb-qg8-inrow">
                    <input id={`${uid}-email`} className="hb-qg8-input" type="email" value={email} aria-invalid={emailState === "error" ? "true" : undefined} aria-describedby={`${uid}-email-h`} onChange={(e) => { setEmail(e.target.value); setEmailState("idle"); }} />
                    <button type="submit" className="hb-qg8-btn hb-qg8-sec">Save</button>
                  </div>
                  <span id={`${uid}-email-h`} className="hb-qg8-help" data-err={emailState === "error" ? "true" : undefined} data-ok={emailState === "saved" ? "true" : undefined} aria-live="polite">
                    {emailState === "error" ? "Enter a valid email address." : emailState === "saved" ? "Saved. Invoices go here from now on." : "Receipts and invoices are sent here."}
                  </span>
                </form>
                <form className="hb-qg8-field" onSubmit={saveTax} noValidate>
                  <label className="hb-qg8-label" htmlFor={`${uid}-tax`}>Tax ID</label>
                  <div className="hb-qg8-inrow">
                    <select aria-label="Tax ID type" className="hb-qg8-select" value={taxType} onChange={(e) => { setTaxType(e.target.value); setTaxState("idle"); }}>
                      {taxTypes.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                    </select>
                    <input id={`${uid}-tax`} className="hb-qg8-input" value={taxValue} placeholder={tax.placeholder} aria-invalid={taxState === "error" ? "true" : undefined} aria-describedby={`${uid}-tax-h`} onChange={(e) => { setTaxValue(e.target.value); setTaxState("idle"); }} />
                    <button type="submit" className="hb-qg8-btn hb-qg8-sec">Save</button>
                  </div>
                  <span id={`${uid}-tax-h`} className="hb-qg8-help" data-err={taxState === "error" ? "true" : undefined} data-ok={taxState === "saved" ? "true" : undefined} aria-live="polite">
                    {taxState === "error" ? `Format for ${tax.label}: ${tax.placeholder}` : taxState === "saved" ? "Tax ID saved and added to invoices." : "Needed for reverse charge in the EU and UK."}
                  </span>
                </form>
              </div>
            </div>
          </div>
          <div className="hb-qg8-col">
            <div className="hb-qg8-card">
              <div className="hb-qg8-ch">
                <div>
                  <h3>Usage this cycle</h3>
                  <p>Nov 1 to Nov 30</p>
                </div>
              </div>
              <ul className="hb-qg8-meter">
                {usage.map((u, i) => {
                  const pct = Math.min(1, u.used / u.limit);
                  return (
                    <li key={u.label} className="hb-qg8-mrow">
                      <div className="hb-qg8-mtop">
                        <span>{u.label}</span>
                        <span>{num(u.used)} / {num(u.limit)}{u.unit ? ` ${u.unit}` : ""}</span>
                      </div>
                      <div className="hb-qg8-track" role="progressbar" aria-label={u.label} aria-valuemin={0} aria-valuemax={u.limit} aria-valuenow={u.used}>
                        <div className="hb-qg8-fill" data-warn={pct >= 0.85 ? "true" : undefined} style={{ width: `${(pct * 100).toFixed(1)}%`, animationDelay: `${(i * 0.12).toFixed(2)}s` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
              {hot ? (
                <p className="hb-qg8-warn">
                  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1.5l6 11H1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M7 5.5v3M7 10.4v.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  {hot.label} is at {Math.round((hot.used / hot.limit) * 100)}%. Extra usage is billed at the end of the cycle.
                </p>
              ) : null}
            </div>
            <div className="hb-qg8-card">
              <div className="hb-qg8-ch"><div><h3>Next invoice</h3><p>Charged to the default method</p></div></div>
              <div className="hb-qg8-inv"><b>{money.format(plan.price + 14)}</b><span>{plan.renews}</span></div>
              <ul className="hb-qg8-invl">
                <li><span>{plan.name} plan</span><span>{money.format(plan.price)}</span></li>
                <li><span>Extra bandwidth</span><span>{money.format(14)}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
