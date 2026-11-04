"use client";

import * as React from "react";

export interface LoginForgotPasswordLink {
  label: string;
  href: string;
}

export interface LoginForgotPasswordProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  title?: string;
  subtitle?: string;
  defaultEmail?: string;
  defaultSent?: boolean;
  resendSeconds?: number;
  onSubmit?: (values: { email: string }) => boolean | void | Promise<boolean | void>;
  onResend?: (email: string) => void;
  back?: LoginForgotPasswordLink;
  mailApp?: LoginForgotPasswordLink | null;
  accent?: string;
}

const css = `
.hb-qh5 {
  --hb-qh5-accent: #22d3ee;
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
.hb-qh5 *, .hb-qh5 *::before, .hb-qh5 *::after { box-sizing: border-box; }
.hb-qh5::before { content: ""; position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(rgba(255,255,255,.09) 1px, transparent 1.2px); background-size: 18px 18px; mask: radial-gradient(ellipse 50% 60% at 50% 40%, #000, transparent 80%); }
.hb-qh5-inner { position: relative; max-width: 1120px; margin: 0 auto; display: grid; justify-items: center; }
.hb-qh5-card { width: 100%; max-width: 460px; border-radius: 24px; background: #111; border: 1px solid rgba(255,255,255,.08); box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 40px 80px -40px rgba(0,0,0,.8); overflow: hidden; }
.hb-qh5-art { position: relative; height: 170px; display: grid; place-items: center; overflow: hidden; background: radial-gradient(ellipse 60% 90% at 50% 100%, color-mix(in srgb, var(--hb-qh5-accent) 28%, transparent), transparent 70%), linear-gradient(#141414, #111); border-bottom: 1px solid rgba(255,255,255,.06); }
.hb-qh5-art::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px) 0 0 / 28px 100%; mask: linear-gradient(to top, #000, transparent); }
.hb-qh5-env { position: relative; z-index: 1; width: 132px; animation: hb-qh5-bob 4s ease-in-out infinite; }
.hb-qh5-letter { transition: transform .8s cubic-bezier(.2,.7,.2,1) .25s; transform: translateY(20px); }
.hb-qh5[data-sent="true"] .hb-qh5-letter { transform: translateY(-14px); }
.hb-qh5-flap, .hb-qh5-lid { transform-box: view-box; transform-origin: 66px 40px; transition: transform .3s cubic-bezier(.4,0,.6,1); }
.hb-qh5-lid { transform: scaleY(0); transition-delay: 0s; }
.hb-qh5[data-sent="true"] .hb-qh5-flap { transform: scaleY(0); }
.hb-qh5[data-sent="true"] .hb-qh5-lid { transform: scaleY(1); transition-delay: .28s; }
.hb-qh5-spark { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: var(--hb-qh5-accent); opacity: 0; box-shadow: 0 0 10px var(--hb-qh5-accent); }
.hb-qh5[data-sent="true"] .hb-qh5-spark { animation: hb-qh5-spark 1.4s ease-out .3s both; }
.hb-qh5-body { padding: 28px 28px 26px; }
.hb-qh5-title { margin: 0; font-size: 24px; letter-spacing: -.02em; font-weight: 600; }
.hb-qh5-sub { margin: 8px 0 22px; color: #8f8f8f; font-size: 14px; line-height: 1.6; }
.hb-qh5-sub b { color: #ededed; font-weight: 500; }
.hb-qh5-label { display: block; margin-bottom: 6px; font-size: 13px; color: #a1a1a1; }
.hb-qh5-input { width: 100%; height: 46px; padding: 0 14px 0 42px; border-radius: 12px; border: 1px solid #262626; background: #0c0c0c; color: #ededed; font: inherit; font-size: 14px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-qh5-input:focus { border-color: var(--hb-qh5-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qh5-accent) 20%, transparent); }
.hb-qh5-input[aria-invalid="true"] { border-color: #f87171; }
.hb-qh5-wrap { position: relative; }
.hb-qh5-wrap svg { position: absolute; left: 14px; top: 15px; color: #6b6b6b; }
.hb-qh5-err { margin: 6px 0 0; font-size: 12px; color: #fca5a5; }
.hb-qh5-btn { margin-top: 16px; width: 100%; height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; border: 0; border-radius: 12px; background: var(--hb-qh5-accent); color: #031317; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: filter .2s, transform .2s; }
.hb-qh5-btn:hover { filter: brightness(1.08); }
.hb-qh5-btn:disabled { cursor: progress; }
.hb-qh5-spin { width: 15px; height: 15px; border-radius: 50%; border: 2px solid rgba(3,19,23,.3); border-top-color: #031317; animation: hb-qh5-turn .7s linear infinite; }
.hb-qh5-ghost { height: 42px; padding: 0 14px; border-radius: 11px; border: 1px solid #262626; background: #161616; color: #ededed; font: inherit; font-size: 13.5px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none; transition: background .2s, border-color .2s; }
.hb-qh5-ghost:hover:not(:disabled) { background: #1d1d1d; border-color: #333; }
.hb-qh5-ghost:disabled { color: #8f8f8f; cursor: not-allowed; }
.hb-qh5-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.hb-qh5-time { font-variant-numeric: tabular-nums; color: var(--hb-qh5-accent); }
.hb-qh5-meta { margin: 18px 0 0; font-size: 13px; color: #8f8f8f; }
.hb-qh5-text { border: 0; padding: 0; background: none; color: #ededed; font: inherit; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(255,255,255,.25); cursor: pointer; border-radius: 3px; }
.hb-qh5-foot { display: flex; justify-content: center; padding: 14px; border-top: 1px solid rgba(255,255,255,.06); background: #0e0e0e; }
.hb-qh5-back { display: inline-flex; align-items: center; gap: 8px; color: #a1a1a1; font-size: 13px; text-decoration: none; border-radius: 4px; }
.hb-qh5-back:hover { color: #ededed; }
.hb-qh5-btn:focus-visible, .hb-qh5-ghost:focus-visible, .hb-qh5-text:focus-visible, .hb-qh5-back:focus-visible { outline: 2px solid var(--hb-qh5-accent); outline-offset: 2px; }
.hb-qh5-swap { animation: hb-qh5-in .45s cubic-bezier(.2,.7,.2,1) both; }
.hb-qh5-toast { margin: 12px 0 0; font-size: 12.5px; color: var(--hb-qh5-accent); }
@keyframes hb-qh5-bob { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-6px) rotate(2deg); } }
@keyframes hb-qh5-spark { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(var(--hb-qh5-x), var(--hb-qh5-y)) scale(.3); } }
@keyframes hb-qh5-turn { to { transform: rotate(360deg); } }
@keyframes hb-qh5-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-qh5 *, .hb-qh5 *::before, .hb-qh5 *::after { animation: none !important; transition: none !important; }
}
`;

const sparks = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return { x: (Math.cos(a) * 80).toFixed(1), y: (Math.sin(a) * 50 - 20).toFixed(1) };
});

function mask(email: string) {
  const [user, domain] = email.split("@");
  if (!domain) return email;
  return `${user.slice(0, 1)}${"•".repeat(Math.max(2, Math.min(5, user.length - 1)))}@${domain}`;
}

function format(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise<unknown>((resolve) => setTimeout(() => resolve(result), 900));
}

export function LoginForgotPassword({
  title = "Reset your password",
  subtitle = "Enter the email linked to your Harbor account and we'll send you a secure link to choose a new password.",
  defaultEmail = "",
  defaultSent = false,
  resendSeconds = 45,
  onSubmit,
  onResend,
  back = { label: "Back to sign in", href: "#sign-in" },
  mailApp = { label: "Open mail app", href: "mailto:" },
  accent = "#22d3ee",
  className = "",
  style,
  ...rest
}: LoginForgotPasswordProps) {
  const uid = React.useId();
  const [email, setEmail] = React.useState(defaultEmail || (defaultSent ? "maya.chen@harbor.app" : ""));
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "sent">(defaultSent ? "sent" : "idle");
  const [left, setLeft] = React.useState(defaultSent ? resendSeconds : 0);
  const [resent, setResent] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (status !== "sent" || left <= 0) return;
    const id = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [status, left]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const value = email.trim();
    if (!value) return setError("Enter your email address.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return setError("That email doesn't look right.");
    setError("");
    setStatus("loading");
    try {
      const result = await wait(onSubmit ? onSubmit({ email: value }) : true);
      if (result === false) {
        setStatus("idle");
        setError("We couldn't send a link right now. Try again in a minute.");
        return;
      }
      setStatus("sent");
      setLeft(resendSeconds);
    } catch {
      setStatus("idle");
      setError("We couldn't send a link right now. Try again in a minute.");
    }
  }

  function resend() {
    if (left > 0) return;
    onResend?.(email.trim());
    setResent((n) => n + 1);
    setLeft(resendSeconds);
  }

  function change() {
    setStatus("idle");
    setLeft(0);
    setResent(0);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  const sent = status === "sent";

  return (
    <section className={`hb-qh5 ${className}`} data-sent={sent} style={{ "--hb-qh5-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-login-forgot-password" precedence="default">{css}</style>
      <div className="hb-qh5-inner">
        <div className="hb-qh5-card">
          <div className="hb-qh5-art" aria-hidden="true">
            {sparks.map((s, i) => (
              <span key={i} className="hb-qh5-spark" style={{ "--hb-qh5-x": `${s.x}px`, "--hb-qh5-y": `${s.y}px` } as React.CSSProperties} />
            ))}
            <svg className="hb-qh5-env" viewBox="0 0 132 100">
              <path className="hb-qh5-lid" d="M10 40 66 8l56 32H10Z" fill="#26262a" stroke="rgba(255,255,255,.14)" />
              <g className="hb-qh5-letter">
                <rect x="22" y="22" width="88" height="52" rx="6" fill="#f4f4f5" />
                <rect x="34" y="34" width="44" height="5" rx="2.5" fill="#d4d4d8" />
                <rect x="34" y="45" width="64" height="4" rx="2" fill="#e4e4e7" />
                <rect x="34" y="54" width="30" height="9" rx="4.5" fill={accent} />
              </g>
              <path d="M10 40v48a6 6 0 0 0 6 6h100a6 6 0 0 0 6-6V40L66 72 10 40Z" fill="#1f1f22" stroke="rgba(255,255,255,.14)" />
              <path d="M10 88 52 62M122 88 80 62" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" />
              <path className="hb-qh5-flap" d="M10 40 66 72l56-32H10Z" fill="#26262a" stroke="rgba(255,255,255,.14)" />
            </svg>
          </div>
          <div className="hb-qh5-body">
            {sent ? (
              <div className="hb-qh5-swap" key="sent">
                <h2 className="hb-qh5-title">Check your inbox</h2>
                <p className="hb-qh5-sub">We sent a reset link to <b>{mask(email.trim())}</b>. It expires in 30 minutes and works once.</p>
                <div className="hb-qh5-actions">
                  {mailApp ? <a className="hb-qh5-ghost" href={mailApp.href}>{mailApp.label}</a> : null}
                  <button type="button" className="hb-qh5-ghost" onClick={resend} disabled={left > 0} aria-live="polite" style={mailApp ? undefined : { gridColumn: "1 / -1" }}>
                    {left > 0 ? <>Resend in <span className="hb-qh5-time">{format(left)}</span></> : "Resend link"}
                  </button>
                </div>
                {resent > 0 && <p className="hb-qh5-toast" role="status">A new link is on its way.</p>}
                <p className="hb-qh5-meta">Wrong address? <button type="button" className="hb-qh5-text" onClick={change}>Use a different email</button></p>
              </div>
            ) : (
              <form className="hb-qh5-swap" key="form" noValidate onSubmit={handleSubmit}>
                <h2 className="hb-qh5-title">{title}</h2>
                <p className="hb-qh5-sub">{subtitle}</p>
                <label className="hb-qh5-label" htmlFor={`${uid}-e`}>Email</label>
                <div className="hb-qh5-wrap">
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="3" width="13" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="m2 4 6 5 6-5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
                  <input ref={inputRef} id={`${uid}-e`} className="hb-qh5-input" type="email" autoComplete="email" placeholder="you@company.com" value={email} aria-invalid={error ? true : undefined} aria-describedby={error ? `${uid}-err` : undefined} onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }} />
                </div>
                {error && <p className="hb-qh5-err" id={`${uid}-err`} role="alert">{error}</p>}
                <button type="submit" className="hb-qh5-btn" disabled={status === "loading"} aria-busy={status === "loading"}>
                  {status === "loading" && <span className="hb-qh5-spin" aria-hidden="true" />}
                  {status === "loading" ? "Sending link" : "Send reset link"}
                </button>
              </form>
            )}
          </div>
          <div className="hb-qh5-foot">
            <a className="hb-qh5-back" href={back.href}>
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3M7 4 3 8l4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {back.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
