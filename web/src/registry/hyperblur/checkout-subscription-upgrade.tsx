"use client";

import * as React from "react";

export interface UpgradePlan {
  name: string;
  price: number;
  features: string[];
}

export interface UpgradeValues {
  plan: string;
  seats: number;
  dueToday: number;
  nextInvoice: number;
}

export interface CheckoutSubscriptionUpgradeProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  currentPlan?: UpgradePlan;
  newPlan?: UpgradePlan;
  currentSeats?: number;
  defaultSeats?: number;
  maxSeats?: number;
  daysRemaining?: number;
  cycleDays?: number;
  renewalDate?: string;
  cardLabel?: string;
  currency?: string;
  onSeatsChange?: (seats: number) => void;
  onChangeCard?: () => void;
  onConfirm?: (values: UpgradeValues) => void;
  accent?: string;
}

const defaultCurrent: UpgradePlan = {
  name: "Starter",
  price: 10,
  features: ["5 projects", "Basic reports", "Email support", "7-day history"],
};

const defaultNew: UpgradePlan = {
  name: "Business",
  price: 22,
  features: ["Unlimited projects", "Custom reports and exports", "SAML single sign-on", "Priority support, 4 h", "Unlimited history"],
};

function useTween(target: number) {
  const [value, setValue] = React.useState(target);
  const from = React.useRef(target);
  React.useEffect(() => {
    const start = from.current;
    if (start === target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = reduce ? 1 : Math.min(1, (t - t0) / 450);
      const v = start + (target - start) * (1 - Math.pow(1 - p, 3));
      from.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

function Num({ value, format }: { value: number; format: (n: number) => string }) {
  const v = useTween(value);
  return <>{format(v)}</>;
}

const css = `
.hb-qg5 {
  --hb-qg5-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #f7f5ef;
  color: #121622;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-qg5 *, .hb-qg5 *::before, .hb-qg5 *::after { box-sizing: border-box; }
.hb-qg5-inner { max-width: 1120px; margin: 0 auto; padding: clamp(44px, 7cqw, 104px) clamp(16px, 4cqw, 32px); }
.hb-qg5-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0; font-size: 12px; font-weight: 600; color: var(--hb-qg5-accent); background: color-mix(in srgb, var(--hb-qg5-accent) 10%, #fff); border: 1px solid color-mix(in srgb, var(--hb-qg5-accent) 25%, transparent); padding: 4px 10px; border-radius: 999px; }
.hb-qg5-title { margin: 14px 0 0; font-size: clamp(28px, 4.4cqw, 44px); letter-spacing: -0.035em; line-height: 1.05; font-weight: 600; }
.hb-qg5-sub { margin: 12px 0 0; color: #5b5f6b; font-size: 15px; line-height: 1.6; max-width: 560px; }
.hb-qg5-grid { display: grid; gap: 20px; margin-top: 36px; align-items: start; }
@container (min-width: 860px) { .hb-qg5-grid { grid-template-columns: minmax(0, 1fr) 380px; gap: 28px; } }
.hb-qg5-plans { display: grid; gap: 12px; align-items: stretch; }
@container (min-width: 560px) { .hb-qg5-plans { grid-template-columns: 1fr 36px 1fr; } }
.hb-qg5-plan { border-radius: 18px; background: #fff; border: 1px solid rgba(18,22,34,.08); padding: 20px; box-shadow: 0 1px 2px rgba(18,22,34,.04); }
.hb-qg5-plan[data-new="true"] { border-color: var(--hb-qg5-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-qg5-accent) 12%, transparent), 0 20px 40px -24px color-mix(in srgb, var(--hb-qg5-accent) 60%, transparent); position: relative; }
.hb-qg5-tag { font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #8a8e99; }
.hb-qg5-plan[data-new="true"] .hb-qg5-tag { color: var(--hb-qg5-accent); }
.hb-qg5-pname { margin: 6px 0 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
.hb-qg5-pprice { margin: 4px 0 14px; font-size: 13px; color: #5b5f6b; }
.hb-qg5-pprice b { font-size: 26px; color: #121622; letter-spacing: -0.03em; font-weight: 600; }
.hb-qg5-feat { list-style: none; margin: 0; padding: 14px 0 0; border-top: 1px dashed rgba(18,22,34,.12); display: grid; gap: 8px; font-size: 13px; color: #3a3f4b; }
.hb-qg5-feat li { display: flex; gap: 8px; align-items: flex-start; }
.hb-qg5-feat svg { width: 14px; height: 14px; flex: none; margin-top: 2px; color: #a3a7b1; }
.hb-qg5-plan[data-new="true"] .hb-qg5-feat svg { color: var(--hb-qg5-accent); }
.hb-qg5-arrow { display: none; place-items: center; }
@container (min-width: 560px) { .hb-qg5-arrow { display: grid; } }
.hb-qg5-arrow span { width: 34px; height: 34px; border-radius: 50%; background: #121622; color: #fff; display: grid; place-items: center; animation: hb-qg5-nudge 2.2s ease-in-out infinite; }
@keyframes hb-qg5-nudge { 50% { transform: translateX(3px); } }
.hb-qg5-arrow svg { width: 14px; height: 14px; }
.hb-qg5-seats { margin-top: 12px; border-radius: 18px; background: #fff; border: 1px solid rgba(18,22,34,.08); padding: 20px; }
.hb-qg5-seathead { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.hb-qg5-seathead label { font-size: 14px; font-weight: 600; }
.hb-qg5-seathead output { font-size: 13px; color: #5b5f6b; }
.hb-qg5-seathead output b { font-size: 22px; color: #121622; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.hb-qg5-range { -webkit-appearance: none; appearance: none; width: 100%; height: 28px; margin: 14px 0 6px; background: transparent; cursor: pointer; }
.hb-qg5-range::-webkit-slider-runnable-track { height: 6px; border-radius: 3px; background: linear-gradient(90deg, var(--hb-qg5-accent) var(--hb-qg5-fill), rgba(18,22,34,.1) var(--hb-qg5-fill)); }
.hb-qg5-range::-moz-range-track { height: 6px; border-radius: 3px; background: linear-gradient(90deg, var(--hb-qg5-accent) var(--hb-qg5-fill), rgba(18,22,34,.1) var(--hb-qg5-fill)); }
.hb-qg5-range::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; margin-top: -8px; border-radius: 50%; background: #fff; border: 2px solid var(--hb-qg5-accent); box-shadow: 0 2px 8px rgba(18,22,34,.2); transition: transform .15s; }
.hb-qg5-range::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 2px solid var(--hb-qg5-accent); box-shadow: 0 2px 8px rgba(18,22,34,.2); }
.hb-qg5-range:active::-webkit-slider-thumb { transform: scale(1.15); }
.hb-qg5-range:focus-visible { outline: none; }
.hb-qg5-range:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 5px color-mix(in srgb, var(--hb-qg5-accent) 25%, transparent); }
.hb-qg5-range:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 5px color-mix(in srgb, var(--hb-qg5-accent) 25%, transparent); }
.hb-qg5-ticks { display: flex; justify-content: space-between; font-size: 11px; color: #8a8e99; font-variant-numeric: tabular-nums; }
.hb-qg5-hint { margin: 12px 0 0; font-size: 12px; color: #5b5f6b; }
.hb-qg5-sum { border-radius: 20px; background: #121622; color: #eef0f5; padding: 22px; box-shadow: 0 30px 60px -30px rgba(18,22,34,.6); position: relative; overflow: hidden; }
.hb-qg5-sum::before { content: ""; position: absolute; right: -40%; top: -50%; width: 100%; height: 100%; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-qg5-accent) 45%, transparent), transparent); pointer-events: none; }
.hb-qg5-sum h3 { margin: 0 0 16px; font-size: 15px; font-weight: 600; position: relative; }
.hb-qg5-lines { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; position: relative; }
.hb-qg5-lines li { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; color: #b7bcc9; font-variant-numeric: tabular-nums; }
.hb-qg5-lines li small { display: block; font-size: 11px; color: #7d8394; margin-top: 2px; }
.hb-qg5-lines li[data-credit="true"] span:last-child { color: #6ee7b7; }
.hb-qg5-due { display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.1); position: relative; }
.hb-qg5-due span { font-size: 13px; color: #b7bcc9; }
.hb-qg5-due b { font-size: 32px; letter-spacing: -0.03em; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-qg5-next { margin: 6px 0 0; font-size: 12px; color: #7d8394; position: relative; }
.hb-qg5-card { margin-top: 18px; display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); position: relative; }
.hb-qg5-chip { width: 38px; height: 26px; border-radius: 5px; background: linear-gradient(135deg, #e8eaf0, #9aa1b2); position: relative; flex: none; }
.hb-qg5-chip::after { content: ""; position: absolute; left: 6px; top: 8px; width: 10px; height: 8px; border-radius: 2px; background: #c9a227; }
.hb-qg5-card div { flex: 1; min-width: 0; font-size: 13px; }
.hb-qg5-card small { display: block; font-size: 11px; color: #7d8394; }
.hb-qg5-change { background: none; border: 0; color: #9ec2ff; font: inherit; font-size: 12px; cursor: pointer; padding: 4px; border-radius: 4px; }
.hb-qg5-btn { margin-top: 16px; width: 100%; height: 50px; border: 0; border-radius: 12px; background: var(--hb-qg5-accent); color: #fff; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 10px; position: relative; box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 10px 28px -10px var(--hb-qg5-accent); transition: filter .2s, transform .15s; }
.hb-qg5-btn:hover { filter: brightness(1.08); }
.hb-qg5-btn:active { transform: translateY(1px); }
.hb-qg5-btn[disabled] { cursor: default; opacity: .85; }
.hb-qg5-btn:focus-visible, .hb-qg5-change:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-qg5-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: hb-qg5-rot .8s linear infinite; }
@keyframes hb-qg5-rot { to { transform: rotate(360deg); } }
.hb-qg5-fine { margin: 12px 0 0; font-size: 11px; color: #7d8394; text-align: center; position: relative; }
.hb-qg5-okbar { margin-top: 16px; display: flex; gap: 10px; align-items: center; padding: 12px; border-radius: 12px; background: rgba(110,231,183,.12); border: 1px solid rgba(110,231,183,.3); color: #a7f3d0; font-size: 13px; position: relative; animation: hb-qg5-in .4s ease; }
@keyframes hb-qg5-in { from { opacity: 0; transform: translateY(6px); } }
.hb-qg5-okbar svg { width: 18px; height: 18px; flex: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-qg5 *, .hb-qg5 *::before, .hb-qg5 *::after { animation: none !important; transition: none !important; }
}
`;

function Check() {
  return <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7.3l2.6 2.6L11 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function CheckoutSubscriptionUpgrade({
  eyebrow = "Upgrade",
  title = "Move Halcyon Labs to Business",
  subtitle = "You keep everything you have today. We credit the unused part of your Starter plan and only charge the difference for the rest of this cycle.",
  currentPlan = defaultCurrent,
  newPlan = defaultNew,
  currentSeats = 8,
  defaultSeats = 12,
  maxSeats = 50,
  daysRemaining = 18,
  cycleDays = 30,
  renewalDate = "Dec 1, 2026",
  cardLabel = "Visa ending 4242",
  currency = "USD",
  onSeatsChange,
  onChangeCard,
  onConfirm,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: CheckoutSubscriptionUpgradeProps) {
  const uid = React.useId();
  const money = React.useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency }), [currency]);
  const fmt = React.useCallback((n: number) => money.format(n), [money]);
  const [seats, setSeats] = React.useState(Math.max(1, Math.min(maxSeats, defaultSeats)));
  const [status, setStatus] = React.useState<"idle" | "processing" | "done">("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const ratio = daysRemaining / cycleDays;
  const credit = Math.round(currentPlan.price * currentSeats * ratio * 100) / 100;
  const charge = Math.round(newPlan.price * seats * ratio * 100) / 100;
  const due = Math.max(0, Math.round((charge - credit) * 100) / 100);
  const nextInvoice = newPlan.price * seats;
  const fill = `${(((seats - 1) / Math.max(1, maxSeats - 1)) * 100).toFixed(2)}%`;

  const confirm = () => {
    if (status !== "idle") return;
    setStatus("processing");
    timer.current = setTimeout(() => {
      setStatus("done");
      onConfirm?.({ plan: newPlan.name, seats, dueToday: due, nextInvoice });
    }, 1000);
  };

  const vars = { "--hb-qg5-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-qg5 ${className}`} style={vars} {...rest}>
      <style href="hb-checkout-subscription-upgrade" precedence="default">{css}</style>
      <div className="hb-qg5-inner">
        {eyebrow ? <p className="hb-qg5-eyebrow">{eyebrow}</p> : null}
        <h2 className="hb-qg5-title">{title}</h2>
        {subtitle ? <p className="hb-qg5-sub">{subtitle}</p> : null}
        <div className="hb-qg5-grid">
          <div>
            <div className="hb-qg5-plans">
              <div className="hb-qg5-plan">
                <span className="hb-qg5-tag">Current plan</span>
                <h3 className="hb-qg5-pname">{currentPlan.name}</h3>
                <p className="hb-qg5-pprice"><b>{fmt(currentPlan.price)}</b> per seat / month, {currentSeats} seats</p>
                <ul className="hb-qg5-feat">
                  {currentPlan.features.map((f) => <li key={f}><Check />{f}</li>)}
                </ul>
              </div>
              <div className="hb-qg5-arrow" aria-hidden="true">
                <span><svg viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              </div>
              <div className="hb-qg5-plan" data-new="true">
                <span className="hb-qg5-tag">New plan</span>
                <h3 className="hb-qg5-pname">{newPlan.name}</h3>
                <p className="hb-qg5-pprice"><b>{fmt(newPlan.price)}</b> per seat / month</p>
                <ul className="hb-qg5-feat">
                  {newPlan.features.map((f) => <li key={f}><Check />{f}</li>)}
                </ul>
              </div>
            </div>
            <div className="hb-qg5-seats">
              <div className="hb-qg5-seathead">
                <label htmlFor={`${uid}-seats`}>Seats on {newPlan.name}</label>
                <output htmlFor={`${uid}-seats`}><b>{seats}</b> seats, {fmt(nextInvoice)} / month</output>
              </div>
              <input
                id={`${uid}-seats`}
                className="hb-qg5-range"
                type="range"
                min={1}
                max={maxSeats}
                value={seats}
                disabled={status !== "idle"}
                style={{ "--hb-qg5-fill": fill } as React.CSSProperties}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  setSeats(n);
                  onSeatsChange?.(n);
                }}
              />
              <div className="hb-qg5-ticks" aria-hidden="true"><span>1</span><span>{Math.round(maxSeats / 2)}</span><span>{maxSeats}</span></div>
              <p className="hb-qg5-hint">
                {seats > currentSeats
                  ? `${seats - currentSeats} new seats. Invite links go out after you confirm.`
                  : seats < currentSeats
                    ? `${currentSeats - seats} members will move to view-only access.`
                    : "Same seat count as today."}
              </p>
            </div>
          </div>
          <aside className="hb-qg5-sum" aria-label="Payment summary">
            <h3>Proration</h3>
            <ul className="hb-qg5-lines">
              <li>
                <span>{newPlan.name}, {seats} seats<small>{daysRemaining} of {cycleDays} days left in cycle</small></span>
                <span><Num value={charge} format={fmt} /></span>
              </li>
              <li data-credit="true">
                <span>Unused {currentPlan.name}<small>{currentSeats} seats, credited</small></span>
                <span>-{fmt(credit)}</span>
              </li>
            </ul>
            <div className="hb-qg5-due">
              <span>Due today</span>
              <b aria-live="polite"><Num value={due} format={fmt} /></b>
            </div>
            <p className="hb-qg5-next">Then <Num value={nextInvoice} format={fmt} /> every month from {renewalDate}.</p>
            <div className="hb-qg5-card">
              <span className="hb-qg5-chip" aria-hidden="true" />
              <div>{cardLabel}<small>Card on file, expires 08 / 28</small></div>
              <button type="button" className="hb-qg5-change" onClick={() => onChangeCard?.()}>Change</button>
            </div>
            {status === "done" ? (
              <div className="hb-qg5-okbar" role="status">
                <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 9.2l2.3 2.3L12.5 6.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                You are on {newPlan.name} with {seats} seats. Receipt sent to billing.
              </div>
            ) : (
              <button type="button" className="hb-qg5-btn" onClick={confirm} disabled={status === "processing"}>
                {status === "processing" ? <><span className="hb-qg5-spin" aria-hidden="true" />Upgrading</> : `Upgrade and pay ${fmt(due)}`}
              </button>
            )}
            <p className="hb-qg5-fine">Downgrade or cancel any time. Unused time is always credited.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
