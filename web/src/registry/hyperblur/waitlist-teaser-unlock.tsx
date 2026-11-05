"use client";

import * as React from "react";

export interface WaitlistTeaserValues {
  email: string;
  teamSize: string;
}

export interface WaitlistTeaserUnlockProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  bullets?: string[];
  teamSizes?: string[];
  ctaLabel?: string;
  productName?: string;
  defaultUnlocked?: boolean;
  onSubmit?: (values: WaitlistTeaserValues) => void | Promise<void>;
  accent?: string;
}

const css = `
@keyframes hb-yg7-scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(520%); }
}
@keyframes hb-yg7-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes hb-yg7-grow { from { transform: scaleY(0); } }
@keyframes hb-yg7-spin { to { transform: rotate(360deg); } }
@keyframes hb-yg7-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
.hb-yg7 {
  --hb-yg7-accent: #7c3aed;
  --hb-yg7-ink: #111014;
  --hb-yg7-muted: #67646f;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #ffffff;
  color: var(--hb-yg7-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yg7 *, .hb-yg7 *::before, .hb-yg7 *::after { box-sizing: border-box; }
.hb-yg7-in {
  position: relative;
  display: grid;
  gap: 48px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 88px 24px;
}
@container (min-width: 840px) {
  .hb-yg7-in { grid-template-columns: 0.9fr 1.1fr; gap: 56px; align-items: center; }
}
.hb-yg7-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-yg7-accent) 9%, #fff);
  color: var(--hb-yg7-accent);
  font-size: 12.5px;
  font-weight: 600;
}
.hb-yg7-title {
  margin: 18px 0 0;
  font-size: clamp(32px, 4.8cqw, 52px);
  font-weight: 650;
  line-height: 1.03;
  letter-spacing: -0.045em;
  text-wrap: balance;
}
.hb-yg7-sub {
  margin: 16px 0 0;
  color: var(--hb-yg7-muted);
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-yg7-bullets { display: grid; gap: 10px; margin: 22px 0 0; padding: 0; list-style: none; }
.hb-yg7-bullets li { display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: #34313b; }
.hb-yg7-bullets svg { flex: none; color: var(--hb-yg7-accent); }
.hb-yg7-form { display: grid; gap: 10px; margin-top: 28px; }
@container (min-width: 520px) {
  .hb-yg7-form { grid-template-columns: 1fr 150px; }
  .hb-yg7-btn { grid-column: 1 / -1; }
}
.hb-yg7-field { position: relative; }
.hb-yg7-field label {
  display: block;
  margin-bottom: 6px;
  color: #4a4752;
  font-size: 12.5px;
  font-weight: 600;
}
.hb-yg7-control {
  width: 100%;
  height: 46px;
  padding: 0 14px;
  border: 1px solid rgba(17, 16, 20, 0.14);
  border-radius: 12px;
  background: #fff;
  color: var(--hb-yg7-ink);
  font: inherit;
  font-size: 14.5px;
  outline: none;
  box-shadow: 0 1px 2px rgba(17, 16, 20, 0.04);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  appearance: none;
}
select.hb-yg7-control {
  padding-right: 34px;
  background-image: linear-gradient(45deg, transparent 50%, #67646f 50%), linear-gradient(135deg, #67646f 50%, transparent 50%);
  background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
}
.hb-yg7-control:focus { border-color: var(--hb-yg7-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-yg7-accent) 14%, transparent); }
.hb-yg7-control[aria-invalid="true"] { border-color: #e5484d; }
.hb-yg7-err { min-height: 18px; margin: 5px 0 0; color: #d93036; font-size: 12.5px; }
.hb-yg7-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  border: 0;
  border-radius: 12px;
  background: var(--hb-yg7-ink);
  color: #fff;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 12px 24px -14px rgba(17, 16, 20, 0.6);
  transition: background 0.2s ease, transform 0.15s ease;
}
.hb-yg7-btn:hover:not(:disabled) { background: color-mix(in srgb, var(--hb-yg7-accent) 30%, var(--hb-yg7-ink)); }
.hb-yg7-btn:active:not(:disabled) { transform: scale(0.985); }
.hb-yg7-btn:focus-visible { outline: 2px solid var(--hb-yg7-accent); outline-offset: 3px; }
.hb-yg7-btn:disabled { cursor: progress; }
.hb-yg7-spin {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: hb-yg7-spin 0.7s linear infinite;
}
.hb-yg7-done {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
  padding: 16px 18px;
  border: 1px solid color-mix(in srgb, var(--hb-yg7-accent) 30%, transparent);
  border-radius: 14px;
  background: color-mix(in srgb, var(--hb-yg7-accent) 6%, #fff);
  animation: hb-yg7-in 0.5s ease both;
  outline: none;
}
.hb-yg7-done b {
  display: grid;
  place-items: center;
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--hb-yg7-accent);
  color: #fff;
}
.hb-yg7-done strong { display: block; font-size: 15px; }
.hb-yg7-done span { display: block; margin-top: 2px; color: var(--hb-yg7-muted); font-size: 13.5px; }
.hb-yg7-stage {
  position: relative;
  padding: 18px;
  border-radius: 28px;
  background:
    radial-gradient(60% 60% at 70% 20%, color-mix(in srgb, var(--hb-yg7-accent) 22%, transparent), transparent 70%),
    radial-gradient(50% 60% at 10% 90%, rgba(255, 150, 120, 0.22), transparent 70%),
    #f4f2f8;
  box-shadow: inset 0 0 0 1px rgba(17, 16, 20, 0.06);
}
.hb-yg7-window {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(17, 16, 20, 0.1);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 30px 60px -30px rgba(40, 20, 80, 0.4);
  animation: hb-yg7-float 8s ease-in-out infinite;
}
.hb-yg7-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(17, 16, 20, 0.07);
  background: #fbfafc;
}
.hb-yg7-bar i { width: 9px; height: 9px; border-radius: 50%; background: #e3e1e8; }
.hb-yg7-bar span { margin-left: 10px; color: #8c8994; font-size: 11.5px; font-weight: 500; }
.hb-yg7-app {
  display: grid;
  grid-template-columns: 120px 1fr;
  min-height: 300px;
  filter: blur(var(--hb-yg7-blur));
  transform: scale(var(--hb-yg7-zoom));
  transition: filter 1.1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-yg7-side { display: grid; align-content: start; gap: 8px; padding: 14px 12px; border-right: 1px solid rgba(17, 16, 20, 0.06); }
.hb-yg7-side span { height: 9px; border-radius: 5px; background: #ecebf0; }
.hb-yg7-side span:first-child { width: 70%; height: 12px; background: var(--hb-yg7-accent); opacity: 0.8; margin-bottom: 8px; }
.hb-yg7-main { padding: 16px; }
.hb-yg7-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.hb-yg7-kpi { padding: 10px 12px; border: 1px solid rgba(17, 16, 20, 0.07); border-radius: 10px; }
.hb-yg7-kpi small { display: block; color: #8c8994; font-size: 10.5px; }
.hb-yg7-kpi strong { display: block; margin-top: 3px; font-size: 17px; letter-spacing: -0.02em; }
.hb-yg7-kpi em { color: #16a34a; font-size: 10.5px; font-style: normal; font-weight: 600; }
.hb-yg7-chart {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 120px;
  margin-top: 12px;
  padding: 12px;
  border: 1px solid rgba(17, 16, 20, 0.07);
  border-radius: 10px;
}
.hb-yg7-chart span {
  flex: 1;
  border-radius: 4px 4px 2px 2px;
  background: linear-gradient(180deg, var(--hb-yg7-accent), color-mix(in srgb, var(--hb-yg7-accent) 35%, #fff));
  transform-origin: bottom;
  animation: hb-yg7-grow 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-yg7-rows { display: grid; gap: 7px; margin-top: 12px; }
.hb-yg7-rows div { display: flex; align-items: center; gap: 8px; }
.hb-yg7-rows i { width: 18px; height: 18px; border-radius: 50%; background: #ecebf0; }
.hb-yg7-rows span { flex: 1; height: 8px; border-radius: 4px; background: #f0eff3; }
.hb-yg7-rows b { width: 40px; height: 8px; border-radius: 4px; background: color-mix(in srgb, var(--hb-yg7-accent) 25%, #fff); }
.hb-yg7-scan {
  position: absolute;
  left: 0;
  right: 0;
  top: 34px;
  height: 22%;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--hb-yg7-accent) 18%, transparent), transparent);
  animation: hb-yg7-scan 3.6s ease-in-out infinite;
  transition: opacity 0.6s ease;
}
.hb-yg7-lock {
  position: absolute;
  inset: 34px 0 0;
  display: grid;
  place-items: center;
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.hb-yg7-lock div {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px 10px 10px;
  border: 1px solid rgba(17, 16, 20, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  box-shadow: 0 12px 30px -14px rgba(17, 16, 20, 0.35);
  font-size: 13.5px;
  font-weight: 600;
}
.hb-yg7-lock b {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--hb-yg7-ink);
  color: #fff;
}
.hb-yg7[data-unlocked="true"] .hb-yg7-scan, .hb-yg7[data-unlocked="true"] .hb-yg7-lock { opacity: 0; pointer-events: none; }
.hb-yg7[data-unlocked="true"] .hb-yg7-lock { transform: scale(0.9); }
.hb-yg7-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-yg7-window, .hb-yg7-scan, .hb-yg7-chart span, .hb-yg7-done { animation: none; }
  .hb-yg7-app, .hb-yg7-lock, .hb-yg7-control, .hb-yg7-btn { transition: none; }
}
`;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const bars = [38, 52, 44, 63, 58, 72, 66, 81, 77, 90, 84, 96];

export function WaitlistTeaserUnlock({
  eyebrow = "Coming this fall",
  title = "See the dashboard before anyone else",
  subtitle = "Ledgerly reconciles every bank, card and payout account in real time. Join the waitlist to unlock the live preview right now.",
  bullets = ["Real-time reconciliation across 14,000 banks", "Close the month in hours, not days", "SOC 2 Type II from day one"],
  teamSizes = ["Just me", "2 to 10", "11 to 50", "51 to 200", "200+"],
  ctaLabel = "Join and unlock preview",
  productName = "app.ledgerly.com",
  defaultUnlocked = false,
  onSubmit,
  accent = "#7c3aed",
  className = "",
  style,
  ...rest
}: WaitlistTeaserUnlockProps) {
  const id = React.useId();
  const [email, setEmail] = React.useState("");
  const [teamSize, setTeamSize] = React.useState("");
  const [errors, setErrors] = React.useState<{ email?: string; teamSize?: string }>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">(defaultUnlocked ? "done" : "idle");
  const doneRef = React.useRef<HTMLDivElement>(null);
  const unlocked = status === "done";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: string; teamSize?: string } = {};
    if (!emailRe.test(email.trim())) next.email = email.trim() ? "Enter a valid work email." : "Email is required.";
    if (!teamSize) next.teamSize = "Pick a size.";
    setErrors(next);
    if (next.email || next.teamSize) return;
    setStatus("loading");
    try {
      await Promise.all([onSubmit?.({ email: email.trim(), teamSize }), new Promise((r) => setTimeout(r, 900))]);
      setStatus("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setStatus("idle");
      setErrors({ email: "Something went wrong. Please try again." });
    }
  };

  return (
    <section
      className={`hb-yg7 ${className}`}
      data-unlocked={unlocked}
      style={{ "--hb-yg7-accent": accent, "--hb-yg7-blur": unlocked ? "0px" : "9px", "--hb-yg7-zoom": unlocked ? 1 : 1.04, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-waitlist-teaser-unlock" precedence="default">{css}</style>
      <div className="hb-yg7-in">
        <div>
          <span className="hb-yg7-eyebrow">{eyebrow}</span>
          <h2 className="hb-yg7-title">{title}</h2>
          <p className="hb-yg7-sub">{subtitle}</p>
          <ul className="hb-yg7-bullets">
            {bullets.map((b) => (
              <li key={b}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                {b}
              </li>
            ))}
          </ul>
          {unlocked ? (
            <div ref={doneRef} className="hb-yg7-done" role="status" tabIndex={-1}>
              <b aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </b>
              <div>
                <strong>Preview unlocked</strong>
                <span>{email ? `Your invite will go to ${email.trim()}.` : "Your invite is on the way."}</span>
              </div>
            </div>
          ) : (
            <form className="hb-yg7-form" onSubmit={submit} noValidate>
              <div className="hb-yg7-field">
                <label htmlFor={`${id}-email`}>Work email</label>
                <input
                  id={`${id}-email`}
                  className="hb-yg7-control"
                  type="email"
                  autoComplete="email"
                  placeholder="maria@northwind.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={`${id}-email-err`}
                  disabled={status === "loading"}
                />
                <p id={`${id}-email-err`} className="hb-yg7-err">{errors.email}</p>
              </div>
              <div className="hb-yg7-field">
                <label htmlFor={`${id}-size`}>Team size</label>
                <select
                  id={`${id}-size`}
                  className="hb-yg7-control"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  aria-invalid={errors.teamSize ? true : undefined}
                  aria-describedby={`${id}-size-err`}
                  disabled={status === "loading"}
                >
                  <option value="" disabled>Select</option>
                  {teamSizes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <p id={`${id}-size-err`} className="hb-yg7-err">{errors.teamSize}</p>
              </div>
              <button type="submit" className="hb-yg7-btn" disabled={status === "loading"}>
                {status === "loading" ? <><span className="hb-yg7-spin" aria-hidden="true" />Unlocking</> : ctaLabel}
              </button>
            </form>
          )}
        </div>
        <div className="hb-yg7-stage">
          <div className="hb-yg7-window" aria-label={unlocked ? "Product preview" : "Locked product preview"} role="img">
            <div className="hb-yg7-bar" aria-hidden="true"><i /><i /><i /><span>{productName}</span></div>
            <div className="hb-yg7-app" aria-hidden="true">
              <div className="hb-yg7-side">
                <span /><span style={{ width: "80%" }} /><span style={{ width: "64%" }} /><span style={{ width: "74%" }} /><span style={{ width: "56%" }} /><span style={{ width: "68%" }} />
              </div>
              <div className="hb-yg7-main">
                <div className="hb-yg7-kpis">
                  <div className="hb-yg7-kpi"><small>Cash on hand</small><strong>$4.82M</strong><em>+6.4%</em></div>
                  <div className="hb-yg7-kpi"><small>Unmatched</small><strong>12</strong><em>-38</em></div>
                  <div className="hb-yg7-kpi"><small>Close progress</small><strong>94%</strong><em>Day 2</em></div>
                </div>
                <div className="hb-yg7-chart">
                  {bars.map((h, i) => <span key={i} style={{ height: `${h}%`, animationDelay: `${(i * 0.05).toFixed(2)}s` }} />)}
                </div>
                <div className="hb-yg7-rows">
                  {[78, 62, 70].map((w, i) => <div key={i}><i /><span style={{ maxWidth: `${w}%` }} /><b /></div>)}
                </div>
              </div>
            </div>
            <div className="hb-yg7-scan" aria-hidden="true" />
            <div className="hb-yg7-lock" aria-hidden="true">
              <div>
                <b>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
                </b>
                Join to unlock the preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
