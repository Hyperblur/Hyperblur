"use client";

import * as React from "react";

export interface WaitlistInlinePillValues {
  email: string;
}

export interface WaitlistInlinePillProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  badge?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  ctaLabel?: string;
  successLabel?: string;
  note?: string;
  onSubmit?: (values: WaitlistInlinePillValues) => void | Promise<void>;
  accent?: string;
}

const css = `
@keyframes hb-yg5-spin { to { transform: rotate(360deg); } }
@keyframes hb-yg5-shake {
  0%, 100% { transform: none; }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(2px); }
}
@keyframes hb-yg5-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-yg5-pop {
  0% { opacity: 0; transform: scale(0.9); }
  60% { opacity: 1; transform: scale(1.03); }
  100% { opacity: 1; transform: none; }
}
@keyframes hb-yg5-breathe {
  0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.08); }
}
.hb-yg5 {
  --hb-yg5-accent: #22d3ee;
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
.hb-yg5 *, .hb-yg5 *::before, .hb-yg5 *::after { box-sizing: border-box; }
.hb-yg5-halo {
  position: absolute;
  top: 58%;
  left: 50%;
  width: 760px;
  height: 260px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-yg5-accent) 22%, transparent), transparent);
  filter: blur(20px);
  animation: hb-yg5-breathe 7s ease-in-out infinite;
}
.hb-yg5-dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: radial-gradient(60% 60% at 50% 50%, #000, transparent);
  -webkit-mask-image: radial-gradient(60% 60% at 50% 50%, #000, transparent);
}
.hb-yg5-in {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
  padding: 120px 24px;
  text-align: center;
}
.hb-yg5-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #a1a1a1;
  font-family: ui-monospace, "Geist Mono", Menlo, monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.hb-yg5-badge i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-yg5-accent);
  box-shadow: 0 0 10px var(--hb-yg5-accent);
}
.hb-yg5-title {
  max-width: 700px;
  margin: 18px 0 0;
  font-size: clamp(34px, 5.8cqw, 64px);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.05em;
  text-wrap: balance;
  background: linear-gradient(180deg, #fff 30%, rgba(255, 255, 255, 0.55));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-yg5-sub {
  max-width: 460px;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
}
.hb-yg5-slot {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 60px;
  margin-top: 36px;
}
.hb-yg5-form {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 440px;
  height: 56px;
  padding: 6px 6px 6px 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.85);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 20px 40px -24px rgba(0, 0, 0, 0.8);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-yg5-form:focus-within {
  border-color: color-mix(in srgb, var(--hb-yg5-accent) 60%, transparent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-yg5-accent) 16%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.hb-yg5-form[data-error="true"] {
  border-color: rgba(248, 113, 113, 0.7);
  animation: hb-yg5-shake 0.4s ease;
}
.hb-yg5-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
.hb-yg5-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  background: none;
  color: #ededed;
  font: inherit;
  font-size: 15px;
  outline: none;
}
.hb-yg5-input::placeholder { color: #6b6b6b; }
.hb-yg5-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
  min-width: 128px;
  padding: 0 20px;
  border: 0;
  border-radius: 999px;
  background: var(--hb-yg5-accent);
  color: #04141a;
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  transition: filter 0.2s ease, transform 0.15s ease;
}
.hb-yg5-btn:hover:not(:disabled) { filter: brightness(1.1); }
.hb-yg5-btn:active:not(:disabled) { transform: scale(0.97); }
.hb-yg5-btn:disabled { cursor: progress; }
.hb-yg5-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-yg5-spin {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(4, 20, 26, 0.25);
  border-top-color: #04141a;
  border-radius: 50%;
  animation: hb-yg5-spin 0.7s linear infinite;
}
.hb-yg5-error {
  min-height: 20px;
  margin: 10px 0 0;
  color: #f87171;
  font-size: 13px;
}
.hb-yg5-pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 56px;
  max-width: 100%;
  padding: 0 22px 0 8px;
  border: 1px solid color-mix(in srgb, var(--hb-yg5-accent) 45%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-yg5-accent) 10%, #0d0d0d);
  box-shadow: 0 0 40px -10px color-mix(in srgb, var(--hb-yg5-accent) 50%, transparent);
  animation: hb-yg5-pop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  outline: none;
}
.hb-yg5-check {
  display: grid;
  place-items: center;
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--hb-yg5-accent);
  color: #04141a;
}
.hb-yg5-check path {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  animation: hb-yg5-draw 0.45s 0.25s ease forwards;
}
.hb-yg5-pill-text {
  min-width: 0;
  overflow: hidden;
  text-align: left;
  font-size: 14px;
  line-height: 1.3;
}
.hb-yg5-pill-text strong { display: block; color: #fff; font-weight: 600; }
.hb-yg5-pill-text span { display: block; overflow: hidden; color: #a1a1a1; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yg5-note {
  margin: 8px 0 0;
  color: #6b6b6b;
  font-size: 13px;
}
@container (max-width: 420px) {
  .hb-yg5-btn { min-width: 0; padding: 0 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yg5-halo, .hb-yg5-form[data-error="true"], .hb-yg5-pill { animation: none; }
  .hb-yg5-check path { animation: none; stroke-dashoffset: 0; }
  .hb-yg5-form, .hb-yg5-btn { transition: none; }
}
`;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function WaitlistInlinePill({
  badge = "Private beta, spring 2026",
  title = "Ship release notes your users actually read",
  subtitle = "Changelog turns merged pull requests into a beautiful product update. Leave your email and we will send an invite.",
  placeholder = "you@company.com",
  ctaLabel = "Join waitlist",
  successLabel = "You are on the list",
  note = "No spam. One email when your invite is ready.",
  onSubmit,
  accent = "#22d3ee",
  className = "",
  style,
  ...rest
}: WaitlistInlinePillProps) {
  const id = React.useId();
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = React.useState("");
  const [shakeKey, setShakeKey] = React.useState(0);
  const pillRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (shakeKey > 0) inputRef.current?.focus();
  }, [shakeKey]);

  React.useEffect(() => {
    if (status === "done") pillRef.current?.focus();
  }, [status]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!emailRe.test(value)) {
      setError(value ? "That email does not look right." : "Enter your email to join.");
      setShakeKey((k) => k + 1);
      return;
    }
    setError("");
    setStatus("loading");
    try {
      await Promise.all([onSubmit?.({ email: value }), new Promise((r) => setTimeout(r, 900))]);
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className={`hb-yg5 ${className}`} style={{ "--hb-yg5-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-waitlist-inline-pill" precedence="default">{css}</style>
      <div className="hb-yg5-dots" aria-hidden="true" />
      <div className="hb-yg5-halo" aria-hidden="true" />
      <div className="hb-yg5-in">
        <span className="hb-yg5-badge"><i aria-hidden="true" />{badge}</span>
        <h2 className="hb-yg5-title">{title}</h2>
        <p className="hb-yg5-sub">{subtitle}</p>
        <div className="hb-yg5-slot">
          {status === "done" ? (
            <div ref={pillRef} className="hb-yg5-pill" role="status" tabIndex={-1}>
              <span className="hb-yg5-check" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </span>
              <span className="hb-yg5-pill-text">
                <strong>{successLabel}</strong>
                <span>We will write to {email.trim()}</span>
              </span>
            </div>
          ) : (
            <form
              key={shakeKey}
              className="hb-yg5-form"
              data-error={error ? "true" : undefined}
              onSubmit={submit}
              noValidate
            >
              <label htmlFor={`${id}-email`} className="hb-yg5-sr">Email address</label>
              <input
                id={`${id}-email`}
                className="hb-yg5-input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={placeholder}
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                aria-invalid={error ? true : undefined}
                aria-describedby={`${id}-msg`}
                disabled={status === "loading"}
                ref={inputRef}
              />
              <button type="submit" className="hb-yg5-btn" disabled={status === "loading"}>
                {status === "loading" ? <><span className="hb-yg5-spin" aria-hidden="true" /><span className="hb-yg5-sr">Joining</span></> : ctaLabel}
              </button>
            </form>
          )}
        </div>
        <p id={`${id}-msg`} className="hb-yg5-error" role="alert">{status !== "done" ? error : ""}</p>
        {status !== "done" && note && <p className="hb-yg5-note">{note}</p>}
      </div>
    </section>
  );
}
