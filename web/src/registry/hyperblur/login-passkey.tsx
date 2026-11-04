"use client";

import * as React from "react";

export interface LoginPasskeyLink {
  label: string;
  href: string;
}

export interface LoginPasskeyValues {
  email: string;
  password: string;
}

export interface LoginPasskeyProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  passkeyLabel?: string;
  device?: string;
  defaultExpanded?: boolean;
  onPasskey?: () => boolean | void | Promise<boolean | void>;
  onSubmit?: (values: LoginPasskeyValues) => boolean | void | Promise<boolean | void>;
  forgot?: LoginPasskeyLink;
  help?: LoginPasskeyLink;
  accent?: string;
}

const css = `
.hb-qh2 {
  --hb-qh2-accent: #10b981;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  padding: clamp(64px, 9cqw, 112px) 20px;
}
.hb-qh2 *, .hb-qh2 *::before, .hb-qh2 *::after { box-sizing: border-box; }
.hb-qh2::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 50% 60% at 78% 50%, color-mix(in srgb, var(--hb-qh2-accent) 16%, transparent), transparent 70%), linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px) 0 0 / 100% 48px; mask: linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent); }
.hb-qh2-inner { position: relative; max-width: 1120px; margin: 0 auto; display: grid; gap: 40px; align-items: center; }
.hb-qh2-copy { max-width: 440px; }
.hb-qh2-eyebrow { display: inline-flex; align-items: center; gap: 8px; height: 28px; padding: 0 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,.1); background: #111; color: #a1a1a1; font-size: 12px; }
.hb-qh2-eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-qh2-accent); box-shadow: 0 0 10px var(--hb-qh2-accent); }
.hb-qh2-title { margin: 18px 0 12px; font-size: clamp(30px, 4.6cqw, 46px); line-height: 1.05; letter-spacing: -.03em; font-weight: 600; }
.hb-qh2-sub { margin: 0 0 28px; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-qh2-primary { position: relative; width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 10px; height: 52px; border: 0; border-radius: 14px; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; color: #04140d; background: var(--hb-qh2-accent); box-shadow: inset 0 1px 0 rgba(255,255,255,.4), 0 14px 40px -14px var(--hb-qh2-accent); transition: transform .2s, filter .2s; }
.hb-qh2-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
.hb-qh2-primary:disabled { cursor: progress; transform: none; }
.hb-qh2-primary:focus-visible, .hb-qh2-toggle:focus-visible, .hb-qh2-submit:focus-visible, .hb-qh2-link:focus-visible { outline: 2px solid var(--hb-qh2-accent); outline-offset: 3px; }
.hb-qh2-device { margin: 12px 0 0; display: flex; align-items: center; gap: 8px; color: #8f8f8f; font-size: 12.5px; }
.hb-qh2-toggle { margin-top: 22px; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border: 0; border-top: 1px solid rgba(255,255,255,.08); background: none; color: #ededed; font: inherit; font-size: 14px; cursor: pointer; border-radius: 2px; }
.hb-qh2-toggle svg { transition: transform .35s cubic-bezier(.2,.7,.2,1); color: #8f8f8f; }
.hb-qh2-toggle[aria-expanded="true"] svg { transform: rotate(180deg); }
.hb-qh2-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s cubic-bezier(.2,.7,.2,1), opacity .35s; opacity: 0; }
.hb-qh2-panel[data-open="true"] { grid-template-rows: 1fr; opacity: 1; }
.hb-qh2-panel > div { overflow: hidden; }
.hb-qh2-form { display: grid; gap: 12px; padding: 4px 2px 6px; }
.hb-qh2-label { display: block; margin-bottom: 6px; font-size: 13px; color: #a1a1a1; }
.hb-qh2-input { width: 100%; height: 44px; padding: 0 14px; border-radius: 11px; border: 1px solid #262626; background: #111; color: #ededed; font: inherit; font-size: 14px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-qh2-input:focus { border-color: var(--hb-qh2-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qh2-accent) 22%, transparent); }
.hb-qh2-input[aria-invalid="true"] { border-color: #f87171; }
.hb-qh2-err { margin: 6px 0 0; font-size: 12px; color: #fca5a5; }
.hb-qh2-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hb-qh2-link { color: #a1a1a1; font-size: 13px; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(255,255,255,.2); border-radius: 3px; }
.hb-qh2-link:hover { color: #ededed; }
.hb-qh2-submit { height: 42px; padding: 0 18px; border-radius: 11px; border: 1px solid #333; background: #171717; color: #ededed; font: inherit; font-size: 14px; font-weight: 500; cursor: pointer; transition: background .2s; }
.hb-qh2-submit:hover { background: #1f1f1f; }
.hb-qh2-alert { margin: 14px 0 0; font-size: 13px; color: #fca5a5; }
.hb-qh2-stage { position: relative; display: grid; place-items: center; aspect-ratio: 1; max-width: 460px; width: 100%; justify-self: center; border-radius: 28px; border: 1px solid rgba(255,255,255,.08); background: radial-gradient(circle at 50% 42%, #141414, #0b0b0b 70%); box-shadow: inset 0 1px 0 rgba(255,255,255,.06); overflow: hidden; }
.hb-qh2-ring { position: absolute; left: 50%; top: 50%; width: 62%; aspect-ratio: 1; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--hb-qh2-accent) 40%, transparent); transform: translate(-50%, -50%) scale(.6); opacity: 0; animation: hb-qh2-pulse 3.6s cubic-bezier(.2,.7,.2,1) infinite; }
.hb-qh2-ring:nth-child(2) { animation-delay: 1.2s; }
.hb-qh2-ring:nth-child(3) { animation-delay: 2.4s; }
.hb-qh2-print { position: relative; width: 48%; color: color-mix(in srgb, var(--hb-qh2-accent) 85%, white); filter: drop-shadow(0 0 18px color-mix(in srgb, var(--hb-qh2-accent) 45%, transparent)); }
.hb-qh2-print path { fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-dasharray: 120; stroke-dashoffset: 0; opacity: .35; }
.hb-qh2-print .hb-qh2-lit { opacity: 1; stroke-dashoffset: 120; animation: hb-qh2-trace 3.2s ease-in-out infinite; }
.hb-qh2[data-state="scanning"] .hb-qh2-lit { animation-duration: 1.1s; }
.hb-qh2[data-state="success"] .hb-qh2-lit { animation: none; stroke-dashoffset: 0; }
.hb-qh2-scan { position: absolute; left: 22%; right: 22%; height: 2px; top: 30%; background: linear-gradient(90deg, transparent, var(--hb-qh2-accent), transparent); box-shadow: 0 0 18px var(--hb-qh2-accent); animation: hb-qh2-sweep 2.4s ease-in-out infinite alternate; }
.hb-qh2[data-state="success"] .hb-qh2-scan { opacity: 0; }
.hb-qh2-badge { position: absolute; bottom: 9%; display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 14px; border-radius: 999px; background: rgba(17,17,17,.9); border: 1px solid rgba(255,255,255,.1); font-size: 12.5px; color: #a1a1a1; }
.hb-qh2-badge b { color: #ededed; font-weight: 500; }
.hb-qh2-corner { position: absolute; width: 22px; height: 22px; border: 2px solid color-mix(in srgb, var(--hb-qh2-accent) 60%, transparent); }
.hb-qh2-c1 { left: 20%; top: 20%; border-right: 0; border-bottom: 0; border-top-left-radius: 8px; }
.hb-qh2-c2 { right: 20%; top: 20%; border-left: 0; border-bottom: 0; border-top-right-radius: 8px; }
.hb-qh2-c3 { left: 20%; bottom: 20%; border-right: 0; border-top: 0; border-bottom-left-radius: 8px; }
.hb-qh2-c4 { right: 20%; bottom: 20%; border-left: 0; border-top: 0; border-bottom-right-radius: 8px; }
.hb-qh2-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(4,20,13,.3); border-top-color: #04140d; animation: hb-qh2-turn .7s linear infinite; }
@container (min-width: 760px) {
  .hb-qh2-inner { grid-template-columns: 1fr 1fr; gap: 64px; }
}
@keyframes hb-qh2-pulse { 0% { opacity: .7; transform: translate(-50%, -50%) scale(.6); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); } }
@keyframes hb-qh2-trace { 0% { stroke-dashoffset: 120; } 50% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -120; } }
@keyframes hb-qh2-sweep { from { top: 26%; } to { top: 72%; } }
@keyframes hb-qh2-turn { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-qh2 *, .hb-qh2 *::before, .hb-qh2 *::after { animation: none !important; transition: none !important; }
  .hb-qh2-print .hb-qh2-lit { stroke-dashoffset: 0; }
}
`;

const ridges = [
  "M32 10c-10 0-18 6-21 15",
  "M53 25c-3-9-11-15-21-15",
  "M18 30c2-8 8-13 14-13s12 5 14 13",
  "M14 40c0-3 0-6 1-9",
  "M49 31c1 4 1 9 1 13",
  "M22 50c-1-5-2-10-1-16 1-6 5-10 11-10s10 4 11 10c1 4 1 9 0 13",
  "M27 54c-2-6-3-12-2-18 1-4 3-6 7-6s6 2 7 6c1 5 0 11-2 16",
  "M32 36c0 8 0 14-3 22",
  "M38 42c0 6-1 12-4 17",
  "M44 50c-1 4-2 8-4 11",
];

function wait(result: unknown, ms: number) {
  return result instanceof Promise ? result : new Promise<unknown>((resolve) => setTimeout(() => resolve(result), ms));
}

export function LoginPasskey({
  eyebrow = "Passwordless by default",
  title = "Sign in with a touch",
  subtitle = "Your passkey lives on this device and unlocks Ledgerly with Touch ID, Face ID or your screen lock. Nothing to remember, nothing to phish.",
  passkeyLabel = "Use passkey",
  device = "MacBook Pro · last used 2 days ago",
  defaultExpanded = false,
  onPasskey,
  onSubmit,
  forgot = { label: "Forgot password?", href: "#forgot" },
  help = { label: "What is a passkey?", href: "#passkeys" },
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: LoginPasskeyProps) {
  const uid = React.useId();
  const [open, setOpen] = React.useState(defaultExpanded);
  const [state, setState] = React.useState<"idle" | "scanning" | "success" | "error">("idle");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [formBusy, setFormBusy] = React.useState(false);
  const [formError, setFormError] = React.useState("");

  async function startPasskey() {
    if (state === "scanning" || state === "success") return;
    setState("scanning");
    try {
      const result = await wait(onPasskey ? onPasskey() : true, 1600);
      setState(result === false ? "error" : "success");
    } catch {
      setState("error");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formBusy) return;
    const next: { email?: string; password?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    setErrors(next);
    setFormError("");
    if (next.email || next.password) return;
    setFormBusy(true);
    try {
      const result = await wait(onSubmit ? onSubmit({ email: email.trim(), password }) : true, 900);
      if (result === false) setFormError("Incorrect email or password.");
      else setState("success");
    } catch {
      setFormError("Something went wrong. Try again.");
    }
    setFormBusy(false);
  }

  const statusText = state === "scanning" ? "Waiting for your device" : state === "success" ? "Verified" : state === "error" ? "Not verified" : "Ready";

  return (
    <section className={`hb-qh2 ${className}`} data-state={state} style={{ "--hb-qh2-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-login-passkey" precedence="default">{css}</style>
      <div className="hb-qh2-inner">
        <div className="hb-qh2-copy">
          <span className="hb-qh2-eyebrow"><i aria-hidden="true" />{eyebrow}</span>
          <h2 className="hb-qh2-title">{state === "success" ? "You're in." : title}</h2>
          <p className="hb-qh2-sub">{state === "success" ? "Verified with your passkey. Loading your books for this quarter." : subtitle}</p>
          <button type="button" className="hb-qh2-primary" onClick={startPasskey} disabled={state === "scanning" || state === "success"} aria-busy={state === "scanning"}>
            {state === "scanning" ? <span className="hb-qh2-spin" aria-hidden="true" /> : (
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M11 11l9 9M17 17l2-2M15 15l2-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
            {state === "scanning" ? "Confirm on your device" : state === "success" ? "Signed in" : passkeyLabel}
          </button>
          <p className="hb-qh2-device" role="status">
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="3" width="12" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M1 13h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
            {state === "error" ? "Passkey was cancelled. Try again or use your password." : device}
          </p>
          <button type="button" className="hb-qh2-toggle" aria-expanded={open} aria-controls={`${uid}-panel`} onClick={() => setOpen((o) => !o)}>
            Sign in with password instead
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="hb-qh2-panel" id={`${uid}-panel`} data-open={open} aria-hidden={!open}>
            <div>
              <form className="hb-qh2-form" noValidate onSubmit={handleSubmit}>
                <div>
                  <label className="hb-qh2-label" htmlFor={`${uid}-email`}>Work email</label>
                  <input id={`${uid}-email`} className="hb-qh2-input" type="email" autoComplete="email webauthn" placeholder="dana@ledgerly.io" tabIndex={open ? 0 : -1} value={email} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? `${uid}-ee` : undefined} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <p className="hb-qh2-err" id={`${uid}-ee`}>{errors.email}</p>}
                </div>
                <div>
                  <label className="hb-qh2-label" htmlFor={`${uid}-pw`}>Password</label>
                  <input id={`${uid}-pw`} className="hb-qh2-input" type="password" autoComplete="current-password" tabIndex={open ? 0 : -1} value={password} aria-invalid={errors.password ? true : undefined} aria-describedby={errors.password ? `${uid}-pe` : undefined} onChange={(e) => setPassword(e.target.value)} />
                  {errors.password && <p className="hb-qh2-err" id={`${uid}-pe`}>{errors.password}</p>}
                </div>
                <div className="hb-qh2-row">
                  <a className="hb-qh2-link" href={forgot.href} tabIndex={open ? 0 : -1}>{forgot.label}</a>
                  <button type="submit" className="hb-qh2-submit" tabIndex={open ? 0 : -1} disabled={formBusy} aria-busy={formBusy}>{formBusy ? "Checking" : "Continue"}</button>
                </div>
                {formError && <p className="hb-qh2-alert" role="alert">{formError}</p>}
              </form>
            </div>
          </div>
          <a className="hb-qh2-link" href={help.href}>{help.label}</a>
        </div>
        <div className="hb-qh2-stage" aria-hidden="true">
          <span className="hb-qh2-ring" />
          <span className="hb-qh2-ring" />
          <span className="hb-qh2-ring" />
          <span className="hb-qh2-corner hb-qh2-c1" />
          <span className="hb-qh2-corner hb-qh2-c2" />
          <span className="hb-qh2-corner hb-qh2-c3" />
          <span className="hb-qh2-corner hb-qh2-c4" />
          <svg className="hb-qh2-print" viewBox="0 0 64 64">
            {ridges.map((d, i) => <path key={`b${i}`} d={d} />)}
            {ridges.map((d, i) => <path key={`l${i}`} d={d} className="hb-qh2-lit" style={{ animationDelay: `${(i * 0.12).toFixed(2)}s` }} />)}
          </svg>
          <span className="hb-qh2-scan" />
          <span className="hb-qh2-badge">Status <b>{statusText}</b></span>
        </div>
      </div>
    </section>
  );
}
