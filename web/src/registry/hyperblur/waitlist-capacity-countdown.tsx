"use client";

import * as React from "react";

export interface WaitlistCapacityValues {
  email: string;
}

export interface WaitlistCapacityCountdownProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  cohort?: string;
  title?: string;
  subtitle?: string;
  launchAt?: string;
  initialSeconds?: number;
  capacity?: number;
  claimed?: number;
  liveSignups?: boolean;
  ctaLabel?: string;
  onSubmit?: (values: WaitlistCapacityValues) => void | Promise<void>;
  accent?: string;
}

const css = `
@keyframes hb-yg8-roll {
  from { transform: translateY(-60%); opacity: 0; }
  to { transform: none; opacity: 1; }
}
@keyframes hb-yg8-stripes { to { background-position: 28px 0; } }
@keyframes hb-yg8-fill { from { transform: scaleX(0); } }
@keyframes hb-yg8-blink { 50% { opacity: 0.25; } }
@keyframes hb-yg8-spin { to { transform: rotate(360deg); } }
@keyframes hb-yg8-bump {
  0% { transform: none; }
  35% { transform: translateY(-3px) scale(1.06); color: var(--hb-yg8-accent); }
  100% { transform: none; }
}
@keyframes hb-yg8-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
.hb-yg8 {
  --hb-yg8-accent: #fbbf24;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yg8 *, .hb-yg8 *::before, .hb-yg8 *::after { box-sizing: border-box; }
.hb-yg8-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(50% 40% at 50% 0%, color-mix(in srgb, var(--hb-yg8-accent) 14%, transparent), transparent 70%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 120px);
  mask-image: linear-gradient(180deg, #000, transparent 90%);
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 90%);
}
.hb-yg8-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 80px 24px 96px;
}
.hb-yg8-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px; }
.hb-yg8-cohort {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--hb-yg8-accent);
  font-family: ui-monospace, "Geist Mono", Menlo, monospace;
  font-size: 12.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hb-yg8-cohort i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; animation: hb-yg8-blink 1.4s steps(2) infinite; }
.hb-yg8-title {
  max-width: 620px;
  margin: 14px 0 0;
  font-size: clamp(32px, 4.8cqw, 52px);
  font-weight: 650;
  line-height: 1.03;
  letter-spacing: -0.045em;
  text-wrap: balance;
}
.hb-yg8-sub { max-width: 420px; margin: 0; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; }
.hb-yg8-panel {
  margin-top: 40px;
  padding: clamp(18px, 3cqw, 32px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  background: linear-gradient(180deg, #131313, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 40px 80px -50px rgba(0, 0, 0, 0.9);
}
.hb-yg8-clock { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(8px, 1.6cqw, 16px); }
.hb-yg8-unit {
  position: relative;
  padding: clamp(12px, 2cqw, 22px) 8px clamp(10px, 1.6cqw, 16px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  background: #0b0b0b;
  text-align: center;
}
.hb-yg8-unit::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
}
.hb-yg8-digits {
  display: flex;
  justify-content: center;
  font-family: ui-monospace, "Geist Mono", Menlo, monospace;
  font-size: clamp(34px, 7cqw, 72px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}
.hb-yg8-digit { display: inline-block; animation: hb-yg8-roll 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.hb-yg8-unit span { display: block; margin-top: 8px; color: #6f6f6f; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
.hb-yg8-cap { margin-top: 28px; }
.hb-yg8-cap-top { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px; }
.hb-yg8-cap-top strong { font-size: 15px; font-weight: 600; }
.hb-yg8-left { color: #a1a1a1; font-size: 14px; }
.hb-yg8-left b { display: inline-block; color: #ededed; font-weight: 650; font-variant-numeric: tabular-nums; }
.hb-yg8-left b[data-bump] { animation: hb-yg8-bump 0.6s ease; }
.hb-yg8-bar {
  position: relative;
  height: 14px;
  margin-top: 12px;
  overflow: hidden;
  border-radius: 999px;
  background: #1a1a1a;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
}
.hb-yg8-fill {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: 999px;
  background:
    repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.16) 0 7px, transparent 7px 14px),
    linear-gradient(90deg, color-mix(in srgb, var(--hb-yg8-accent) 70%, #000), var(--hb-yg8-accent));
  background-size: 28px 100%, 100% 100%;
  box-shadow: 0 0 20px color-mix(in srgb, var(--hb-yg8-accent) 50%, transparent);
  transform-origin: left;
  animation: hb-yg8-fill 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) both, hb-yg8-stripes 1s linear infinite;
  transition: width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-yg8-ticks { position: relative; height: 22px; margin-top: 6px; color: #5f5f5f; font-size: 11.5px; font-variant-numeric: tabular-nums; }
.hb-yg8-ticks span { position: absolute; top: 0; transform: translateX(-50%); }
.hb-yg8-ticks span:first-child { transform: none; }
.hb-yg8-ticks span:last-child { transform: translateX(-100%); }
.hb-yg8-form { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
.hb-yg8-field { flex: 1 1 240px; }
.hb-yg8-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hb-yg8-input {
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: #0b0b0b;
  color: #ededed;
  font: inherit;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-yg8-input::placeholder { color: #5f5f5f; }
.hb-yg8-input:focus { border-color: color-mix(in srgb, var(--hb-yg8-accent) 70%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-yg8-accent) 18%, transparent); }
.hb-yg8-input[aria-invalid="true"] { border-color: rgba(248, 113, 113, 0.7); }
.hb-yg8-err { min-height: 18px; margin: 6px 0 0; color: #f87171; font-size: 12.5px; }
.hb-yg8-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 0 0 auto;
  height: 50px;
  padding: 0 22px;
  border: 0;
  border-radius: 14px;
  background: var(--hb-yg8-accent);
  color: #1a1203;
  font: inherit;
  font-size: 15px;
  font-weight: 650;
  cursor: pointer;
  transition: filter 0.2s ease, transform 0.15s ease;
}
.hb-yg8-btn:hover:not(:disabled) { filter: brightness(1.08); }
.hb-yg8-btn:active:not(:disabled) { transform: scale(0.98); }
.hb-yg8-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-yg8-btn:disabled { cursor: progress; }
.hb-yg8-spin {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(26, 18, 3, 0.25);
  border-top-color: #1a1203;
  border-radius: 50%;
  animation: hb-yg8-spin 0.7s linear infinite;
}
.hb-yg8-done {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 18px;
  padding: 16px 18px;
  border: 1px solid color-mix(in srgb, var(--hb-yg8-accent) 35%, transparent);
  border-radius: 14px;
  background: color-mix(in srgb, var(--hb-yg8-accent) 8%, #0e0e0e);
  animation: hb-yg8-in 0.5s ease both;
  outline: none;
}
.hb-yg8-done strong { display: block; font-size: 15px; }
.hb-yg8-done span { display: block; margin-top: 2px; color: #a1a1a1; font-size: 13.5px; }
.hb-yg8-seat {
  font-family: ui-monospace, "Geist Mono", Menlo, monospace;
  color: var(--hb-yg8-accent);
  font-size: 22px;
  font-weight: 600;
}
@media (prefers-reduced-motion: reduce) {
  .hb-yg8-digit, .hb-yg8-fill, .hb-yg8-cohort i, .hb-yg8-left b[data-bump], .hb-yg8-done { animation: none; }
  .hb-yg8-fill, .hb-yg8-input, .hb-yg8-btn { transition: none; }
}
`;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function Digits({ value }: { value: string }) {
  return (
    <span className="hb-yg8-digits" aria-hidden="true">
      {value.split("").map((d, i) => (
        <span key={`${i}-${d}`} className="hb-yg8-digit">{d}</span>
      ))}
    </span>
  );
}

export function WaitlistCapacityCountdown({
  cohort = "Cohort 03 · Founding batch",
  title = "Two weeks until doors open. 500 seats.",
  subtitle = "Northstar onboards in small cohorts so every team gets a real setup call. When the bar fills, the next cohort opens in January.",
  launchAt,
  initialSeconds = 13 * 86400 + 7 * 3600 + 42 * 60 + 18,
  capacity = 500,
  claimed = 412,
  liveSignups = true,
  ctaLabel = "Reserve my seat",
  onSubmit,
  accent = "#fbbf24",
  className = "",
  style,
  ...rest
}: WaitlistCapacityCountdownProps) {
  const id = React.useId();
  const [seconds, setSeconds] = React.useState(initialSeconds);
  const [taken, setTaken] = React.useState(Math.min(claimed, capacity));
  const [bump, setBump] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");
  const [seat, setSeat] = React.useState(0);
  const doneRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const target = launchAt ? new Date(launchAt).getTime() : NaN;
    const tick = () => {
      if (!Number.isNaN(target)) setSeconds(Math.max(0, Math.floor((target - Date.now()) / 1000)));
      else setSeconds((s) => Math.max(0, s - 1));
    };
    const first = window.setTimeout(tick, 0);
    const t = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(t);
    };
  }, [launchAt]);

  React.useEffect(() => {
    if (!liveSignups) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gaps = [4200, 6800, 3500, 9100, 5600];
    let n = 0;
    let t = 0;
    const next = () => {
      t = window.setTimeout(() => {
        setTaken((v) => (v < capacity - 1 ? v + 1 : v));
        setBump((b) => b + 1);
        n += 1;
        next();
      }, gaps[n % gaps.length]);
    };
    next();
    return () => window.clearTimeout(t);
  }, [liveSignups, capacity]);

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const left = Math.max(0, capacity - taken);
  const pct = Math.min(100, (taken / capacity) * 100);
  const full = left === 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!emailRe.test(value)) {
      setError(value ? "That email does not look right." : "Enter your email to reserve a seat.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      await Promise.all([onSubmit?.({ email: value }), new Promise((r) => setTimeout(r, 900))]);
      setSeat(taken + 1);
      setTaken((v) => Math.min(capacity, v + 1));
      setBump((b) => b + 1);
      setStatus("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  };

  const units: [string, number][] = [["Days", days], ["Hours", hours], ["Minutes", minutes], ["Seconds", secs]];

  return (
    <section className={`hb-yg8 ${className}`} style={{ "--hb-yg8-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-waitlist-capacity-countdown" precedence="default">{css}</style>
      <div className="hb-yg8-bg" aria-hidden="true" />
      <div className="hb-yg8-in">
        <div className="hb-yg8-head">
          <div>
            <span className="hb-yg8-cohort"><i aria-hidden="true" />{cohort}</span>
            <h2 className="hb-yg8-title">{title}</h2>
          </div>
          <p className="hb-yg8-sub">{subtitle}</p>
        </div>
        <div className="hb-yg8-panel">
          <div className="hb-yg8-clock" role="timer" aria-label={`${days} days, ${hours} hours, ${minutes} minutes until launch`}>
            {units.map(([label, v]) => (
              <div key={label} className="hb-yg8-unit">
                <Digits value={pad(v)} />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="hb-yg8-cap">
            <div className="hb-yg8-cap-top">
              <strong>{taken.toLocaleString("en-US")} of {capacity.toLocaleString("en-US")} seats claimed</strong>
              <span className="hb-yg8-left" aria-live="polite">
                <b key={bump} data-bump={bump > 0 ? "" : undefined}>{left.toLocaleString("en-US")}</b> {left === 1 ? "spot" : "spots"} left
              </span>
            </div>
            <div className="hb-yg8-bar" role="progressbar" aria-valuemin={0} aria-valuemax={capacity} aria-valuenow={taken} aria-label="Seats claimed">
              <div className="hb-yg8-fill" style={{ width: `${pct.toFixed(2)}%` }} />
            </div>
            <div className="hb-yg8-ticks" aria-hidden="true">
              {[0, 25, 50, 75, 100].map((p) => (
                <span key={p} style={{ left: `${p}%` }}>{Math.round((capacity * p) / 100)}</span>
              ))}
            </div>
          </div>
          {status === "done" ? (
            <div ref={doneRef} className="hb-yg8-done" role="status" tabIndex={-1}>
              <div>
                <strong>Seat reserved</strong>
                <span>Confirmation sent to {email.trim()}. See you on launch day.</span>
              </div>
              <span className="hb-yg8-seat">#{String(seat).padStart(3, "0")}</span>
            </div>
          ) : (
            <form className="hb-yg8-form" onSubmit={submit} noValidate>
              <div className="hb-yg8-field">
                <label htmlFor={`${id}-email`} className="hb-yg8-sr">Email address</label>
                <input
                  id={`${id}-email`}
                  className="hb-yg8-input"
                  type="email"
                  autoComplete="email"
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={`${id}-err`}
                  disabled={status === "loading" || full}
                />
                <p id={`${id}-err`} className="hb-yg8-err" role="alert">{full ? "This cohort is full. Join the next one." : error}</p>
              </div>
              <button type="submit" className="hb-yg8-btn" disabled={status === "loading" || full}>
                {status === "loading" ? <><span className="hb-yg8-spin" aria-hidden="true" />Reserving</> : ctaLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
