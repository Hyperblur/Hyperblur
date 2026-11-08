"use client";

import * as React from "react";

export interface PricingEnterpriseSize {
  label: string;
  seats: number;
}

export interface PricingEnterpriseAddon {
  id: string;
  label: string;
  perSeat: number;
}

export interface PricingEnterpriseRequest {
  size: PricingEnterpriseSize;
  addons: string[];
  slot: string;
  email: string;
  estimate: [number, number];
}

export interface PricingEnterpriseContactProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  points?: string[];
  badges?: string[];
  customers?: string[];
  sizes?: PricingEnterpriseSize[];
  addons?: PricingEnterpriseAddon[];
  basePerSeat?: number;
  slots?: { day: string; times: string[] }[];
  currency?: string;
  locale?: string;
  submitLabel?: string;
  onSubmit?: (request: PricingEnterpriseRequest) => void;
  accent?: string;
}

const defaultPoints = [
  "Volume pricing from 250 seats with a single annual invoice",
  "Private cloud or single-tenant deployment in your region",
  "99.99% uptime SLA with service credits",
  "Named architect for rollout, training and migration",
];

const defaultBadges = ["SOC 2 Type II", "ISO 27001", "HIPAA", "GDPR"];
const defaultCustomers = ["Northwind", "Halden Bank", "Orbital", "Kestrel Health", "Lumen Air"];

const defaultSizes: PricingEnterpriseSize[] = [
  { label: "250-500", seats: 375 },
  { label: "500-2k", seats: 1200 },
  { label: "2k-10k", seats: 5000 },
  { label: "10k+", seats: 14000 },
];

const defaultAddons: PricingEnterpriseAddon[] = [
  { id: "sso", label: "SSO and SCIM", perSeat: 0 },
  { id: "residency", label: "Data residency", perSeat: 2 },
  { id: "audit", label: "Audit and eDiscovery", perSeat: 3 },
  { id: "support", label: "24/7 premium support", perSeat: 4 },
];

const defaultSlots = [
  { day: "Tue", times: ["09:30", "11:00", "15:30"] },
  { day: "Wed", times: ["10:00", "13:30", "16:00"] },
  { day: "Thu", times: ["09:00", "14:00", "17:00"] },
];

const css = `
.hb-vh7 {
  --hb-vh7-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vh7 *, .hb-vh7 *::before, .hb-vh7 *::after { box-sizing: border-box; }
.hb-vh7-inner { max-width: 1080px; margin: 0 auto; padding: 56px 20px; }
.hb-vh7-card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, .08);
  background:
    radial-gradient(70% 60% at 0% 0%, color-mix(in srgb, var(--hb-vh7-accent) 16%, transparent), transparent 60%),
    linear-gradient(180deg, #111113, #0c0c0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 40px 80px -40px rgba(0, 0, 0, .8);
  overflow: hidden;
}
@container (min-width: 820px) { .hb-vh7-card { grid-template-columns: 1fr 1.05fr; } }
.hb-vh7-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, .03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .03) 1px, transparent 1px);
  background-size: 32px 32px;
  -webkit-mask-image: radial-gradient(60% 70% at 10% 10%, #000, transparent 75%);
  mask-image: radial-gradient(60% 70% at 10% 10%, #000, transparent 75%);
  pointer-events: none;
}
.hb-vh7-left { position: relative; display: flex; flex-direction: column; padding: 36px 32px; }
.hb-vh7-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 16px; color: color-mix(in srgb, var(--hb-vh7-accent) 55%, #fff); font-size: 12.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
.hb-vh7-eyebrow svg { width: 14px; height: 14px; }
.hb-vh7-title { margin: 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(28px, 3.6cqi, 38px); font-weight: 600; line-height: 1.08; letter-spacing: -.03em; text-wrap: balance; }
.hb-vh7-sub { margin: 12px 0 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; max-width: 420px; }
.hb-vh7-points { display: grid; gap: 12px; margin: 24px 0 0; padding: 0; list-style: none; }
.hb-vh7-points li { display: flex; gap: 12px; color: #c4c4c4; font-size: 14px; line-height: 1.45; }
.hb-vh7-points svg { flex: none; width: 18px; height: 18px; color: var(--hb-vh7-accent); }
.hb-vh7-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 26px; }
.hb-vh7-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 30px;
  padding: 0 11px 0 8px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, .09);
  background: rgba(255, 255, 255, .025);
  color: #b5b5b5;
  font-size: 12px;
  font-weight: 600;
}
.hb-vh7-badge svg { width: 15px; height: 15px; color: #6ee7b7; }
.hb-vh7-logos { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 22px; margin-top: auto; padding-top: 28px; color: #5f5f66; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 15px; font-weight: 600; letter-spacing: -.01em; }
.hb-vh7-logos span:first-child { width: 100%; color: #6f6f6f; font-family: var(--font-sans), sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0; }
.hb-vh7-right { position: relative; padding: 28px; border-top: 1px solid rgba(255, 255, 255, .07); background: rgba(0, 0, 0, .25); }
@container (min-width: 820px) { .hb-vh7-right { border-top: 0; border-left: 1px solid rgba(255, 255, 255, .07); } }
.hb-vh7-form { display: grid; gap: 20px; }
.hb-vh7-legend { margin: 0 0 9px; padding: 0; color: #8f8f8f; font-size: 12.5px; font-weight: 500; }
.hb-vh7-fs { margin: 0; padding: 0; border: 0; min-width: 0; }
.hb-vh7-seg { display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 4px; padding: 4px; border-radius: 12px; background: #151517; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .06); }
.hb-vh7-seg label { position: relative; }
.hb-vh7-seg input, .hb-vh7-chips input, .hb-vh7-slots input { position: absolute; opacity: 0; pointer-events: none; }
.hb-vh7-seg span {
  display: grid;
  place-items: center;
  height: 34px;
  border-radius: 9px;
  color: #8f8f8f;
  font-size: 13px;
  font-weight: 550;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: background-color .25s ease, color .25s ease, box-shadow .25s ease;
}
.hb-vh7-seg span:hover { color: #ededed; }
.hb-vh7-seg input:checked + span { background: #2a2a2e; color: #fff; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 4px 10px -4px rgba(0, 0, 0, .8); }
.hb-vh7-seg input:focus-visible + span, .hb-vh7-chips input:focus-visible + span, .hb-vh7-slots input:focus-visible + span { outline: 2px solid var(--hb-vh7-accent); outline-offset: 2px; }
.hb-vh7-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-vh7-chips label { position: relative; }
.hb-vh7-chips span {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 32px;
  padding: 0 12px 0 9px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, .1);
  color: #a1a1a1;
  font-size: 12.5px;
  cursor: pointer;
  transition: border-color .25s ease, background-color .25s ease, color .25s ease;
}
.hb-vh7-chips span::before {
  content: "";
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border: 1.5px solid #4a4a52;
  transition: background-color .2s ease, border-color .2s ease;
}
.hb-vh7-chips input:checked + span { border-color: color-mix(in srgb, var(--hb-vh7-accent) 55%, transparent); background: color-mix(in srgb, var(--hb-vh7-accent) 12%, transparent); color: #fff; }
.hb-vh7-chips input:checked + span::before { border-color: var(--hb-vh7-accent); background-color: var(--hb-vh7-accent); }
.hb-vh7-chips span::after {
  content: "";
  position: absolute;
  left: 14px;
  top: 10px;
  width: 4px;
  height: 8px;
  border-right: 1.6px solid #fff;
  border-bottom: 1.6px solid #fff;
  transform: rotate(45deg) scale(0);
  transition: transform .25s cubic-bezier(.34, 1.56, .64, 1);
}
.hb-vh7-chips input:checked + span::after { transform: rotate(45deg) scale(1); }
.hb-vh7-est {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px dashed rgba(255, 255, 255, .12);
}
.hb-vh7-est small { display: block; color: #8f8f8f; font-size: 12px; }
.hb-vh7-est strong { display: block; margin-top: 3px; font-size: 20px; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-vh7-est strong span { display: inline-block; animation: hb-vh7-tick .45s cubic-bezier(.2, .9, .3, 1.2); }
@keyframes hb-vh7-tick { from { opacity: 0; transform: translateY(40%); } to { opacity: 1; transform: none; } }
.hb-vh7-est em { color: #6f6f6f; font-size: 12px; font-style: normal; text-align: right; }
.hb-vh7-slots { display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 8px; }
.hb-vh7-day { display: grid; gap: 5px; }
.hb-vh7-day > b { color: #6f6f6f; font-size: 11.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; text-align: center; }
.hb-vh7-slots label { position: relative; }
.hb-vh7-slots span {
  display: grid;
  place-items: center;
  height: 32px;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, .08);
  background: rgba(255, 255, 255, .02);
  color: #b5b5b5;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
  cursor: pointer;
  transition: border-color .2s ease, background-color .2s ease, color .2s ease, transform .2s cubic-bezier(.34, 1.56, .64, 1);
}
.hb-vh7-slots span:hover { border-color: rgba(255, 255, 255, .2); }
.hb-vh7-slots input:checked + span { border-color: var(--hb-vh7-accent); background: var(--hb-vh7-accent); color: #fff; transform: scale(1.03); }
.hb-vh7-row { display: flex; gap: 8px; }
.hb-vh7-email {
  flex: 1;
  min-width: 0;
  height: 44px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, .1);
  background: #121214;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.hb-vh7-email::placeholder { color: #5f5f66; }
.hb-vh7-email:focus { border-color: var(--hb-vh7-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-vh7-accent) 25%, transparent); }
.hb-vh7-email[aria-invalid="true"] { border-color: #f87171; }
.hb-vh7-submit {
  flex: none;
  height: 44px;
  padding: 0 18px;
  border: 0;
  border-radius: 12px;
  background: #ededed;
  color: #0a0a0a;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .2s ease, transform .15s ease;
}
.hb-vh7-submit:hover { background: #fff; }
.hb-vh7-submit:active { transform: scale(.97); }
.hb-vh7-submit:focus-visible { outline: 2px solid var(--hb-vh7-accent); outline-offset: 2px; }
.hb-vh7-err { margin: 6px 0 0; color: #fca5a5; font-size: 12px; }
.hb-vh7-done { display: grid; justify-items: center; align-content: center; gap: 10px; min-height: 380px; text-align: center; animation: hb-vh7-in .5s cubic-bezier(.2, .9, .3, 1); }
@keyframes hb-vh7-in { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: none; } }
.hb-vh7-done svg { width: 64px; height: 64px; }
.hb-vh7-done circle { stroke: color-mix(in srgb, var(--hb-vh7-accent) 40%, transparent); }
.hb-vh7-done path { stroke: var(--hb-vh7-accent); stroke-dasharray: 40; stroke-dashoffset: 40; animation: hb-vh7-draw .6s cubic-bezier(.65, 0, .35, 1) .2s forwards; }
@keyframes hb-vh7-draw { to { stroke-dashoffset: 0; } }
.hb-vh7-done h3 { margin: 6px 0 0; font-size: 20px; font-weight: 600; }
.hb-vh7-done p { margin: 0; max-width: 300px; color: #8f8f8f; font-size: 14px; line-height: 1.55; }
.hb-vh7-again { margin-top: 6px; padding: 0; border: 0; background: none; color: #a1a1a1; font: inherit; font-size: 13px; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.hb-vh7-again:focus-visible { outline: 2px solid var(--hb-vh7-accent); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .hb-vh7 *, .hb-vh7 *::before, .hb-vh7 *::after { animation: none !important; transition: none !important; }
  .hb-vh7-done path { stroke-dashoffset: 0; }
}
`;

const shield = (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 1.5l5 2v4c0 3.2-2.2 5.6-5 7-2.8-1.4-5-3.8-5-7v-4z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M5.6 8l1.7 1.7 3.1-3.3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function PricingEnterpriseContact({
  eyebrow = "Enterprise",
  title = "A plan built around your security review",
  subtitle = "Tell us roughly how big the rollout is. You get a ballpark now and a tailored quote after a 30-minute call.",
  points = defaultPoints,
  badges = defaultBadges,
  customers = defaultCustomers,
  sizes = defaultSizes,
  addons = defaultAddons,
  basePerSeat = 18,
  slots = defaultSlots,
  currency = "USD",
  locale = "en-US",
  submitLabel = "Book the call",
  onSubmit,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PricingEnterpriseContactProps) {
  const uid = React.useId();
  const [size, setSize] = React.useState(1);
  const [picked, setPicked] = React.useState<string[]>(["sso"]);
  const [slot, setSlot] = React.useState(`${slots[0]?.day ?? ""} ${slots[0]?.times[1] ?? slots[0]?.times[0] ?? ""}`);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [done, setDone] = React.useState(false);

  const money = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, notation: "compact", maximumFractionDigits: 1 }),
    [locale, currency],
  );

  const seats = sizes[size]?.seats ?? 0;
  const perSeat = basePerSeat + addons.filter((a) => picked.includes(a.id)).reduce((s, a) => s + a.perSeat, 0);
  const discount = seats >= 10000 ? 0.7 : seats >= 2000 ? 0.8 : seats >= 500 ? 0.9 : 1;
  const yearly = seats * perSeat * 12 * discount;
  const estimate: [number, number] = [Math.round(yearly * 0.85), Math.round(yearly * 1.1)];
  const rangeText = `${money.format(estimate[0])} - ${money.format(estimate[1])}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a work email so we can send the invite.");
      return;
    }
    setError("");
    setDone(true);
    onSubmit?.({ size: sizes[size], addons: picked, slot, email, estimate });
  };

  return (
    <section className={`hb-vh7 ${className}`} style={{ "--hb-vh7-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-pricing-enterprise-contact" precedence="default">{css}</style>
      <div className="hb-vh7-inner">
        <div className="hb-vh7-card">
          <div className="hb-vh7-left">
            {eyebrow ? (
              <p className="hb-vh7-eyebrow">
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 14V5l6-3 6 3v9M5.5 14V9h5v5M2 14h12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                {eyebrow}
              </p>
            ) : null}
            <h2 className="hb-vh7-title">{title}</h2>
            {subtitle ? <p className="hb-vh7-sub">{subtitle}</p> : null}
            <ul className="hb-vh7-points">
              {points.map((p) => (
                <li key={p}>
                  <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 9.5l3.2 3.2L14 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {p}
                </li>
              ))}
            </ul>
            {badges.length ? (
              <div className="hb-vh7-badges">
                {badges.map((b) => <span key={b} className="hb-vh7-badge">{shield}{b}</span>)}
              </div>
            ) : null}
            {customers.length ? (
              <div className="hb-vh7-logos">
                <span>Trusted by security teams at</span>
                {customers.map((c) => <span key={c}>{c}</span>)}
              </div>
            ) : null}
          </div>
          <div className="hb-vh7-right">
            {done ? (
              <div className="hb-vh7-done" role="status">
                <svg viewBox="0 0 64 64" aria-hidden="true">
                  <circle cx="32" cy="32" r="29" fill="none" strokeWidth="2" />
                  <path d="M20 33l8 8 16-17" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3>Call booked for {slot}</h3>
                <p>An invite is on its way to {email}. We will bring a draft quote for about {sizes[size]?.label} seats.</p>
                <button type="button" className="hb-vh7-again" onClick={() => setDone(false)}>Change details</button>
              </div>
            ) : (
              <form className="hb-vh7-form" onSubmit={submit} noValidate>
                <fieldset className="hb-vh7-fs">
                  <legend className="hb-vh7-legend">Team size</legend>
                  <div className="hb-vh7-seg" style={{ "--n": sizes.length } as React.CSSProperties}>
                    {sizes.map((s, i) => (
                      <label key={s.label}>
                        <input type="radio" name={`${uid}-size`} checked={size === i} onChange={() => setSize(i)} />
                        <span>{s.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="hb-vh7-fs">
                  <legend className="hb-vh7-legend">What you need</legend>
                  <div className="hb-vh7-chips">
                    {addons.map((a) => (
                      <label key={a.id}>
                        <input
                          type="checkbox"
                          checked={picked.includes(a.id)}
                          onChange={(e) => setPicked((p) => (e.target.checked ? [...p, a.id] : p.filter((x) => x !== a.id)))}
                        />
                        <span>{a.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="hb-vh7-est" aria-live="polite">
                  <div>
                    <small>Typical annual contract</small>
                    <strong><span key={rangeText}>{rangeText}</span></strong>
                  </div>
                  <em>Volume discount<br />applied from 500 seats</em>
                </div>
                <fieldset className="hb-vh7-fs">
                  <legend className="hb-vh7-legend">Pick a time for a 30-minute call</legend>
                  <div className="hb-vh7-slots" style={{ "--n": slots.length } as React.CSSProperties}>
                    {slots.map((d) => (
                      <div key={d.day} className="hb-vh7-day">
                        <b>{d.day}</b>
                        {d.times.map((t) => {
                          const v = `${d.day} ${t}`;
                          return (
                            <label key={t}>
                              <input type="radio" name={`${uid}-slot`} aria-label={`${d.day} at ${t}`} checked={slot === v} onChange={() => setSlot(v)} />
                              <span>{t}</span>
                            </label>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <div className="hb-vh7-row">
                    <input
                      className="hb-vh7-email"
                      type="email"
                      placeholder="you@company.com"
                      aria-label="Work email"
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? `${uid}-err` : undefined}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="hb-vh7-submit">{submitLabel}</button>
                  </div>
                  {error ? <p id={`${uid}-err`} className="hb-vh7-err">{error}</p> : null}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
