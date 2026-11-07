"use client";

import * as React from "react";

export interface LoginMinimalLineLink {
  label: string;
  href: string;
}

export interface LoginMinimalLineValues {
  email: string;
  password: string;
}

export interface LoginMinimalLineProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: string;
  greeting?: string;
  note?: string;
  submitLabel?: string;
  onSubmit?: (values: LoginMinimalLineValues) => boolean | void | Promise<boolean | void>;
  forgot?: LoginMinimalLineLink;
  signup?: LoginMinimalLineLink;
  accent?: string;
}

const css = `
.hb-qh4 {
  --hb-qh4-accent: #c2410c;
  --hb-qh4-ink: #1c1a17;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #f7f5ef;
  color: var(--hb-qh4-ink);
  font-family: inherit;
  padding: clamp(72px, 10cqw, 128px) 24px;
}
.hb-qh4 *, .hb-qh4 *::before, .hb-qh4 *::after { box-sizing: border-box; }
.hb-qh4::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(to bottom, transparent 0 31px, rgba(28,26,23,.045) 31px 32px); mask: linear-gradient(to right, transparent, #000 30%, #000 70%, transparent); }
.hb-qh4-inner { position: relative; max-width: 1120px; margin: 0 auto; display: grid; gap: 48px; align-items: end; }
.hb-qh4-brand { display: flex; align-items: center; gap: 10px; font-size: 13px; letter-spacing: .14em; text-transform: uppercase; color: rgba(28,26,23,.6); margin-bottom: 28px; }
.hb-qh4-brand i { width: 8px; height: 8px; border-radius: 50%; background: var(--hb-qh4-accent); }
.hb-qh4-greet { margin: 0; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-weight: 400; font-size: clamp(48px, 9cqw, 104px); line-height: .95; letter-spacing: -.02em; }
.hb-qh4-word { display: inline-block; opacity: 0; transform: translateY(.4em); animation: hb-qh4-rise .9s cubic-bezier(.2,.7,.2,1) forwards; }
.hb-qh4-greet em { font-style: normal; color: var(--hb-qh4-accent); }
.hb-qh4-note { margin: 24px 0 0; max-width: 380px; font-size: 15px; line-height: 1.6; color: rgba(28,26,23,.62); }
.hb-qh4-form { display: grid; gap: 30px; max-width: 420px; width: 100%; justify-self: end; }
.hb-qh4-field { position: relative; padding-top: 18px; }
.hb-qh4-input { display: block; width: 100%; height: 40px; padding: 0 0 4px; border: 0; border-bottom: 1px solid rgba(28,26,23,.25); border-radius: 0; background: transparent; color: var(--hb-qh4-ink); font: inherit; font-size: 18px; outline: none; }
.hb-qh4-label { position: absolute; left: 0; top: 26px; font-size: 18px; color: rgba(28,26,23,.45); pointer-events: none; transform-origin: left top; transition: transform .3s cubic-bezier(.2,.7,.2,1), color .3s; }
.hb-qh4-input:focus + .hb-qh4-label, .hb-qh4-input:not(:placeholder-shown) + .hb-qh4-label { transform: translateY(-24px) scale(.7); color: rgba(28,26,23,.7); }
.hb-qh4-line { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--hb-qh4-ink); transform: scaleX(0); transform-origin: left; transition: transform .45s cubic-bezier(.2,.7,.2,1); }
.hb-qh4-input:focus ~ .hb-qh4-line { transform: scaleX(1); }
.hb-qh4-input[aria-invalid="true"] ~ .hb-qh4-line { transform: scaleX(1); background: #b42318; }
.hb-qh4-err { position: absolute; left: 0; top: calc(100% + 6px); margin: 0; font-size: 12px; color: #b42318; }
.hb-qh4-forgot { position: absolute; right: 0; top: 30px; font-size: 13px; color: rgba(28,26,23,.55); text-decoration: none; border-radius: 3px; }
.hb-qh4-forgot:hover { color: var(--hb-qh4-ink); }
.hb-qh4-actions { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 6px; }
.hb-qh4-signup { font-size: 14px; color: rgba(28,26,23,.6); }
.hb-qh4-signup a { color: var(--hb-qh4-ink); text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--hb-qh4-accent); border-radius: 3px; }
.hb-qh4-btn { display: inline-flex; align-items: center; gap: 14px; height: 52px; padding: 0 8px 0 22px; border: 0; border-radius: 999px; background: var(--hb-qh4-ink); color: #f7f5ef; font: inherit; font-size: 15px; cursor: pointer; transition: gap .3s cubic-bezier(.2,.7,.2,1), background .2s; }
.hb-qh4-btn:hover { gap: 20px; }
.hb-qh4-btn:disabled { cursor: progress; }
.hb-qh4-btn i { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: var(--hb-qh4-accent); color: #fff; }
.hb-qh4-btn:focus-visible, .hb-qh4-forgot:focus-visible, .hb-qh4-signup a:focus-visible { outline: 2px solid var(--hb-qh4-accent); outline-offset: 3px; }
.hb-qh4-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: hb-qh4-turn .7s linear infinite; }
.hb-qh4-alert { margin: 0; font-size: 14px; color: #b42318; }
.hb-qh4-done { max-width: 420px; justify-self: end; animation: hb-qh4-rise .6s ease both; }
.hb-qh4-done p { margin: 0 0 10px; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 36px; line-height: 1.1; }
.hb-qh4-done span { color: rgba(28,26,23,.6); font-size: 15px; }
.hb-qh4-bar { margin-top: 20px; height: 2px; background: rgba(28,26,23,.12); overflow: hidden; }
.hb-qh4-bar i { display: block; height: 100%; width: 100%; background: var(--hb-qh4-accent); transform-origin: left; animation: hb-qh4-load 1.8s ease forwards; }
@container (min-width: 780px) {
  .hb-qh4-inner { grid-template-columns: 1.25fr 1fr; gap: 72px; }
}
@container (max-width: 779px) {
  .hb-qh4-form, .hb-qh4-done { justify-self: stretch; max-width: none; }
}
@keyframes hb-qh4-rise { to { opacity: 1; transform: none; } }
@keyframes hb-qh4-turn { to { transform: rotate(360deg); } }
@keyframes hb-qh4-load { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-qh4 *, .hb-qh4 *::before, .hb-qh4 *::after { animation: none !important; transition: none !important; }
  .hb-qh4-word { opacity: 1; transform: none; }
}
`;

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise<unknown>((resolve) => setTimeout(() => resolve(result), 900));
}

export function LoginMinimalLine({
  brand = "Folio",
  greeting = "Good to see you *again.*",
  note = "Your drafts, notes and reading list are right where you left them. Sign in to keep writing.",
  submitLabel = "Sign in",
  onSubmit,
  forgot = { label: "Forgot?", href: "#forgot" },
  signup = { label: "Create one", href: "#signup" },
  accent = "#c2410c",
  className = "",
  style,
  ...rest
}: LoginMinimalLineProps) {
  const uid = React.useId();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "error" | "success">("idle");

  const words = greeting.split(" ").filter(Boolean);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const next: { email?: string; password?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    if (next.email || next.password) return;
    setStatus("loading");
    try {
      const result = await wait(onSubmit ? onSubmit({ email: email.trim(), password }) : true);
      setStatus(result === false ? "error" : "success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={`hb-qh4 ${className}`} style={{ "--hb-qh4-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-login-minimal-line" precedence="default">{css}</style>
      <div className="hb-qh4-inner">
        <div>
          <div className="hb-qh4-brand"><i aria-hidden="true" />{brand}</div>
          <h2 className="hb-qh4-greet" aria-label={greeting.replaceAll("*", "")}>
            {words.map((w, i) => {
              const italic = w.startsWith("*") && w.endsWith("*");
              return (
                <React.Fragment key={i}>
                  <span className="hb-qh4-word" aria-hidden="true" style={{ animationDelay: `${(0.1 + i * 0.09).toFixed(2)}s` }}>
                    {italic ? <em>{w.slice(1, -1)}</em> : w}
                  </span>
                  {i < words.length - 1 ? " " : null}
                </React.Fragment>
              );
            })}
          </h2>
          <p className="hb-qh4-note">{note}</p>
        </div>
        {status === "success" ? (
          <div className="hb-qh4-done" role="status">
            <p>Welcome back.</p>
            <span>Opening your desk</span>
            <div className="hb-qh4-bar" aria-hidden="true"><i /></div>
          </div>
        ) : (
          <form className="hb-qh4-form" noValidate onSubmit={handleSubmit}>
            {status === "error" && <p className="hb-qh4-alert" role="alert">That combination didn&apos;t work. Try again.</p>}
            <div className="hb-qh4-field">
              <input id={`${uid}-e`} className="hb-qh4-input" type="email" autoComplete="email" placeholder=" " value={email} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? `${uid}-ee` : undefined} onChange={(e) => setEmail(e.target.value)} />
              <label className="hb-qh4-label" htmlFor={`${uid}-e`}>Email address</label>
              <span className="hb-qh4-line" aria-hidden="true" />
              {errors.email && <p className="hb-qh4-err" id={`${uid}-ee`}>{errors.email}</p>}
            </div>
            <div className="hb-qh4-field">
              <input id={`${uid}-p`} className="hb-qh4-input" type="password" autoComplete="current-password" placeholder=" " style={{ paddingRight: 64 }} value={password} aria-invalid={errors.password ? true : undefined} aria-describedby={errors.password ? `${uid}-pe` : undefined} onChange={(e) => setPassword(e.target.value)} />
              <label className="hb-qh4-label" htmlFor={`${uid}-p`}>Password</label>
              <span className="hb-qh4-line" aria-hidden="true" />
              <a className="hb-qh4-forgot" href={forgot.href}>{forgot.label}</a>
              {errors.password && <p className="hb-qh4-err" id={`${uid}-pe`}>{errors.password}</p>}
            </div>
            <div className="hb-qh4-actions">
              <span className="hb-qh4-signup">No account? <a href={signup.href}>{signup.label}</a></span>
              <button type="submit" className="hb-qh4-btn" disabled={status === "loading"} aria-busy={status === "loading"}>
                {status === "loading" ? "Signing in" : submitLabel}
                <i aria-hidden="true">
                  {status === "loading" ? <span className="hb-qh4-spin" /> : (
                    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </i>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
