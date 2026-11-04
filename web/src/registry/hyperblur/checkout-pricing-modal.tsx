"use client";

import * as React from "react";

export type PricingModalPeriod = "monthly" | "yearly";

export interface PricingModalPlan {
  id: string;
  name: string;
  blurb: string;
  monthly: number;
  yearly: number;
  features: string[];
  badge?: string;
}

export interface PricingModalSelection {
  plan: string;
  period: PricingModalPeriod;
  price: number;
}

export interface CheckoutPricingModalProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  plans?: PricingModalPlan[];
  defaultPlan?: string;
  defaultPeriod?: PricingModalPeriod;
  defaultOpen?: boolean;
  workspace?: string;
  currency?: string;
  onOpenChange?: (open: boolean) => void;
  onContinue?: (selection: PricingModalSelection) => void;
  accent?: string;
}

const defaultPlans: PricingModalPlan[] = [
  { id: "plus", name: "Plus", blurb: "For solo builders", monthly: 8, yearly: 6, features: ["Unlimited docs", "30-day version history", "5 GB uploads"] },
  { id: "pro", name: "Pro", blurb: "For growing teams", monthly: 16, yearly: 12, features: ["Everything in Plus", "Guests and permissions", "Automations, 5,000 runs"], badge: "Popular" },
  { id: "scale", name: "Scale", blurb: "For whole companies", monthly: 32, yearly: 26, features: ["Everything in Pro", "SAML SSO and SCIM", "Audit log and data export"] },
];

const css = `
.hb-qga {
  --hb-qga-accent: #6366f1;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 620px;
  isolation: isolate;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-qga *, .hb-qga *::before, .hb-qga *::after { box-sizing: border-box; }
.hb-qga-app { position: absolute; inset: 0; display: grid; grid-template-columns: 210px 1fr; z-index: -1; }
@container (max-width: 640px) { .hb-qga-app { grid-template-columns: 1fr; } .hb-qga-side { display: none; } }
.hb-qga-side { border-right: 1px solid rgba(255,255,255,.06); background: #0d0d0d; padding: 20px 14px; display: grid; align-content: start; gap: 8px; }
.hb-qga-ws { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; margin-bottom: 14px; }
.hb-qga-ws i { width: 22px; height: 22px; border-radius: 6px; background: linear-gradient(135deg, var(--hb-qga-accent), #a855f7); }
.hb-qga-nav { height: 26px; border-radius: 6px; background: rgba(255,255,255,.04); }
.hb-qga-nav:nth-child(3) { background: rgba(255,255,255,.08); }
.hb-qga-main { padding: 20px 28px; display: grid; align-content: start; gap: 18px; }
.hb-qga-topbar { display: flex; justify-content: space-between; align-items: center; }
.hb-qga-crumb { height: 12px; width: 160px; border-radius: 4px; background: rgba(255,255,255,.08); }
.hb-qga-trigger { height: 34px; padding: 0 14px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--hb-qga-accent) 50%, transparent); background: color-mix(in srgb, var(--hb-qga-accent) 16%, #0a0a0a); color: #ededed; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
.hb-qga-trigger svg { width: 13px; height: 13px; color: var(--hb-qga-accent); }
.hb-qga-trigger:focus-visible { outline: 2px solid var(--hb-qga-accent); outline-offset: 2px; }
.hb-qga-h1 { height: 26px; width: 46%; border-radius: 6px; background: rgba(255,255,255,.1); margin-top: 16px; }
.hb-qga-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.hb-qga-cards span { height: 110px; border-radius: 12px; background: #121212; border: 1px solid rgba(255,255,255,.05); }
.hb-qga-lines { display: grid; gap: 10px; }
.hb-qga-lines span { height: 12px; border-radius: 4px; background: rgba(255,255,255,.05); }
.hb-qga-lines span:nth-child(2n) { width: 80%; }
.hb-qga-backdrop { position: absolute; inset: 0; background: rgba(5,5,8,.62); backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px); animation: hb-qga-fade .3s ease; }
@keyframes hb-qga-fade { from { opacity: 0; } }
.hb-qga-wrap { position: absolute; inset: 0; display: grid; place-items: center; padding: 16px; }
.hb-qga-dialog { position: relative; width: 100%; max-width: 860px; max-height: 100%; overflow: auto; border-radius: 22px; border: 1px solid rgba(255,255,255,.1); background: linear-gradient(180deg, #151515, #0f0f0f); box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 50px 120px -30px rgba(0,0,0,.95); animation: hb-qga-pop .4s cubic-bezier(.2,.9,.25,1.05); }
@keyframes hb-qga-pop { from { opacity: 0; transform: translateY(12px) scale(.97); } }
.hb-qga-dialog::before { content: ""; position: absolute; left: 50%; top: -120px; width: 520px; height: 240px; margin-left: -260px; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-qga-accent) 28%, transparent), transparent); pointer-events: none; }
.hb-qga-dh { position: relative; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding: 24px 24px 0; flex-wrap: wrap; }
.hb-qga-dh h2 { margin: 0; font-size: clamp(20px, 2.8cqw, 26px); letter-spacing: -0.03em; font-weight: 600; }
.hb-qga-dh p { margin: 6px 0 0; font-size: 14px; color: #8f8f8f; }
.hb-qga-x { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 9px; border: 1px solid rgba(255,255,255,.08); background: #1a1a1a; color: #a1a1a1; display: grid; place-items: center; cursor: pointer; padding: 0; }
.hb-qga-x:hover { color: #ededed; background: #222; }
.hb-qga-switch { position: relative; display: inline-grid; grid-template-columns: 1fr 1fr; padding: 3px; border-radius: 999px; background: #0a0a0a; border: 1px solid rgba(255,255,255,.08); margin-right: 44px; }
.hb-qga-switch button { position: relative; z-index: 1; border: 0; background: none; color: #8f8f8f; font: inherit; font-size: 13px; font-weight: 500; padding: 7px 14px; border-radius: 999px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: color .25s; white-space: nowrap; }
.hb-qga-switch button[aria-checked="true"] { color: #0a0a0a; }
.hb-qga-switch em { font-style: normal; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 999px; background: color-mix(in srgb, var(--hb-qga-accent) 25%, transparent); color: #c7d2fe; }
.hb-qga-switch button[aria-checked="true"] em { background: var(--hb-qga-accent); color: #fff; }
.hb-qga-knob { position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc(50% - 3px); border-radius: 999px; background: #ededed; transition: transform .35s cubic-bezier(.3,1.3,.5,1); }
.hb-qga-switch[data-period="yearly"] .hb-qga-knob { transform: translateX(100%); }
.hb-qga-plans { display: grid; gap: 12px; padding: 20px 24px; }
@container (min-width: 700px) { .hb-qga-plans { grid-template-columns: repeat(3, 1fr); } }
.hb-qga-plan { position: relative; text-align: left; display: grid; align-content: start; gap: 4px; padding: 18px; border-radius: 16px; border: 1px solid rgba(255,255,255,.09); background: #111; color: inherit; font: inherit; cursor: pointer; transition: border-color .2s, background .2s, transform .2s, box-shadow .2s; animation: hb-qga-up .45s cubic-bezier(.2,.8,.2,1) both; }
@keyframes hb-qga-up { from { opacity: 0; transform: translateY(10px); } }
.hb-qga-plan:hover { border-color: rgba(255,255,255,.18); transform: translateY(-2px); }
.hb-qga-plan[aria-checked="true"] { border-color: var(--hb-qga-accent); background: color-mix(in srgb, var(--hb-qga-accent) 9%, #111); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qga-accent) 20%, transparent), 0 20px 40px -24px var(--hb-qga-accent); }
.hb-qga-plan:focus-visible, .hb-qga-x:focus-visible, .hb-qga-switch button:focus-visible, .hb-qga-go:focus-visible { outline: 2px solid #ededed; outline-offset: 2px; }
.hb-qga-ptop { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.hb-qga-ptop b { font-size: 16px; font-weight: 600; }
.hb-qga-radio { width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,.25); display: grid; place-items: center; transition: border-color .2s, background .2s; }
.hb-qga-plan[aria-checked="true"] .hb-qga-radio { border-color: var(--hb-qga-accent); background: var(--hb-qga-accent); }
.hb-qga-radio svg { width: 10px; height: 10px; color: #fff; opacity: 0; transition: opacity .2s; }
.hb-qga-plan[aria-checked="true"] .hb-qga-radio svg { opacity: 1; }
.hb-qga-badge { font-size: 10px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; padding: 2px 7px; border-radius: 999px; background: var(--hb-qga-accent); color: #fff; margin-left: 8px; }
.hb-qga-blurb { font-size: 12px; color: #8f8f8f; }
.hb-qga-price { display: flex; align-items: baseline; gap: 4px; margin: 12px 0 10px; height: 38px; overflow: hidden; }
.hb-qga-price b { display: inline-block; font-size: 34px; letter-spacing: -0.04em; font-weight: 600; font-variant-numeric: tabular-nums; animation: hb-qga-roll .4s cubic-bezier(.2,.8,.2,1); }
@keyframes hb-qga-roll { from { transform: translateY(60%); opacity: 0; } }
.hb-qga-price span { font-size: 12px; color: #8f8f8f; }
.hb-qga-feat { list-style: none; margin: 0; padding: 12px 0 0; border-top: 1px solid rgba(255,255,255,.06); display: grid; gap: 7px; font-size: 13px; color: #b5b5b5; }
.hb-qga-feat > span { display: flex; gap: 8px; align-items: flex-start; }
.hb-qga-feat svg { width: 13px; height: 13px; flex: none; margin-top: 3px; color: var(--hb-qga-accent); }
.hb-qga-sum { display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; padding: 16px 24px 20px; border-top: 1px solid rgba(255,255,255,.06); background: rgba(0,0,0,.25); }
.hb-qga-sum p { margin: 0; font-size: 13px; color: #8f8f8f; }
.hb-qga-sum p b { color: #ededed; font-weight: 600; }
.hb-qga-sum small { display: block; font-size: 12px; color: #6b6b6b; margin-top: 2px; }
.hb-qga-go { height: 44px; padding: 0 20px; border-radius: 12px; border: 0; background: var(--hb-qga-accent); color: #fff; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 12px 28px -12px var(--hb-qga-accent); transition: filter .2s, transform .15s; }
.hb-qga-go:hover { filter: brightness(1.1); }
.hb-qga-go:active { transform: translateY(1px); }
.hb-qga-go svg { width: 14px; height: 14px; }
.hb-qga-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-qga *, .hb-qga *::before, .hb-qga *::after { animation: none !important; transition: none !important; }
}
`;

const focusable = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export function CheckoutPricingModal({
  title = "Upgrade your workspace",
  subtitle = "Pick a plan for Lattice. Switch or cancel any time, unused days are credited.",
  plans = defaultPlans,
  defaultPlan = "pro",
  defaultPeriod = "yearly",
  defaultOpen = true,
  workspace = "Lattice",
  currency = "USD",
  onOpenChange,
  onContinue,
  accent = "#6366f1",
  className = "",
  style,
  ...rest
}: CheckoutPricingModalProps) {
  const uid = React.useId();
  const money = React.useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }), [currency]);
  const [open, setOpen] = React.useState(defaultOpen);
  const [period, setPeriod] = React.useState<PricingModalPeriod>(defaultPeriod);
  const [plan, setPlan] = React.useState(defaultPlan);
  const [sent, setSent] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const planRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const interacted = React.useRef(false);

  React.useEffect(() => {
    if (!interacted.current) return;
    if (open) {
      const first = dialogRef.current?.querySelector<HTMLElement>('[aria-checked="true"][role="radio"]') ?? dialogRef.current?.querySelector<HTMLElement>(focusable);
      first?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  const setOpenState = (next: boolean) => {
    interacted.current = true;
    setOpen(next);
    if (next) setSent(false);
    onOpenChange?.(next);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setOpenState(false);
      return;
    }
    if (e.key !== "Tab" || !dialogRef.current) return;
    const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusable));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onPlanKey = (e: React.KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % plans.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + plans.length) % plans.length;
    if (n < 0) return;
    e.preventDefault();
    setPlan(plans[n].id);
    planRefs.current[n]?.focus();
  };

  const selected = plans.find((p) => p.id === plan) ?? plans[0];
  const unit = selected ? (period === "yearly" ? selected.yearly : selected.monthly) : 0;
  const billed = period === "yearly" ? unit * 12 : unit;
  const save = selected ? Math.round((1 - selected.yearly / selected.monthly) * 100) : 0;

  const go = () => {
    if (!selected) return;
    setSent(true);
    onContinue?.({ plan: selected.id, period, price: billed });
  };

  const vars = { "--hb-qga-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-qga ${className}`} style={vars} {...rest}>
      <style href="hb-checkout-pricing-modal" precedence="default">{css}</style>
      <div className="hb-qga-app" aria-hidden={open ? true : undefined} inert={open ? true : undefined}>
        <div className="hb-qga-side">
          <div className="hb-qga-ws"><i />{workspace}</div>
          <span className="hb-qga-nav" />
          <span className="hb-qga-nav" />
          <span className="hb-qga-nav" />
          <span className="hb-qga-nav" />
          <span className="hb-qga-nav" />
        </div>
        <div className="hb-qga-main">
          <div className="hb-qga-topbar">
            <span className="hb-qga-crumb" />
            <button ref={triggerRef} type="button" className="hb-qga-trigger" aria-haspopup="dialog" onClick={() => setOpenState(true)}>
              <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1.5l1.6 3.4 3.7.5-2.7 2.6.7 3.7L7 9.9l-3.3 1.8.7-3.7L1.7 5.4l3.7-.5z" fill="currentColor" /></svg>
              Upgrade
            </button>
          </div>
          <span className="hb-qga-h1" />
          <div className="hb-qga-cards"><span /><span /><span /></div>
          <div className="hb-qga-lines"><span /><span /><span /><span /><span /></div>
        </div>
      </div>
      {open ? (
        <>
          <div className="hb-qga-backdrop" onClick={() => setOpenState(false)} aria-hidden="true" />
          <div className="hb-qga-wrap" onClick={(e) => { if (e.target === e.currentTarget) setOpenState(false); }}>
            <div ref={dialogRef} className="hb-qga-dialog" role="dialog" aria-modal="true" aria-labelledby={`${uid}-t`} aria-describedby={`${uid}-d`} onKeyDown={onKeyDown}>
              <div className="hb-qga-dh">
                <div>
                  <h2 id={`${uid}-t`}>{title}</h2>
                  <p id={`${uid}-d`}>{subtitle}</p>
                </div>
                <div className="hb-qga-switch" role="radiogroup" aria-label="Billing period" data-period={period}>
                  <span className="hb-qga-knob" aria-hidden="true" />
                  <button type="button" role="radio" aria-checked={period === "monthly"} onClick={() => setPeriod("monthly")}>Monthly</button>
                  <button type="button" role="radio" aria-checked={period === "yearly"} onClick={() => setPeriod("yearly")}>Yearly{save > 0 ? <em>-{save}%</em> : null}</button>
                </div>
              </div>
              <button type="button" className="hb-qga-x" aria-label="Close" onClick={() => setOpenState(false)}>
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
              <div className="hb-qga-plans" role="radiogroup" aria-label="Plan">
                {plans.map((p, i) => {
                  const on = p.id === plan;
                  const price = period === "yearly" ? p.yearly : p.monthly;
                  return (
                    <button
                      key={p.id}
                      ref={(el) => { planRefs.current[i] = el; }}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      tabIndex={on ? 0 : -1}
                      className="hb-qga-plan"
                      style={{ animationDelay: `${(0.08 + i * 0.07).toFixed(2)}s` }}
                      onClick={() => setPlan(p.id)}
                      onKeyDown={(e) => onPlanKey(e, i)}
                    >
                      <span className="hb-qga-ptop">
                        <span><b>{p.name}</b>{p.badge ? <span className="hb-qga-badge">{p.badge}</span> : null}</span>
                        <span className="hb-qga-radio" aria-hidden="true">
                          <svg viewBox="0 0 10 10" fill="none"><path d="M2 5.2l2 2L8 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                      </span>
                      <span className="hb-qga-blurb">{p.blurb}</span>
                      <span className="hb-qga-price">
                        <b key={`${p.id}-${period}`}>{money.format(price)}</b>
                        <span>per seat / month</span>
                      </span>
                      <span className="hb-qga-feat">
                        {p.features.map((f) => (
                          <span key={f}>
                            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7.3l2.6 2.6L11 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            {f}
                          </span>
                        ))}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="hb-qga-sum">
                <p aria-live="polite">
                  <b>{selected?.name}</b>, billed {period}: <b>{money.format(billed)}</b> per seat
                  <small>{sent ? `Continuing to payment for ${selected?.name}.` : period === "yearly" ? `Equal to ${money.format(unit)} a month. Renews in 12 months.` : "Renews every month. Switch to yearly to save."}</small>
                </p>
                <button type="button" className="hb-qga-go" onClick={go}>
                  Continue with {selected?.name}
                  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <span className="hb-qga-sr" aria-live="polite">{open ? "" : "Pricing dialog closed"}</span>
    </section>
  );
}
