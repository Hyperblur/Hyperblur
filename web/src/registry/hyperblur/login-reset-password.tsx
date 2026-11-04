"use client";

import * as React from "react";

export interface LoginResetPasswordLink {
  label: string;
  href: string;
}

export interface LoginResetPasswordProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  title?: string;
  subtitle?: string;
  account?: string;
  minLength?: number;
  defaultPassword?: string;
  onSubmit?: (values: { password: string }) => boolean | void | Promise<boolean | void>;
  signIn?: LoginResetPasswordLink;
  accent?: string;
}

const css = `
.hb-qh6 {
  --hb-qh6-accent: #2f7bff;
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
.hb-qh6 *, .hb-qh6 *::before, .hb-qh6 *::after { box-sizing: border-box; }
.hb-qh6::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(135deg, rgba(255,255,255,.028) 0 1px, transparent 1px 14px); mask: radial-gradient(ellipse 60% 70% at 50% 50%, #000, transparent 80%); }
.hb-qh6-inner { position: relative; max-width: 920px; margin: 0 auto; }
.hb-qh6-shell { display: grid; border-radius: 24px; border: 1px solid rgba(255,255,255,.08); background: #111; box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 40px 90px -50px rgba(0,0,0,.9); overflow: hidden; }
.hb-qh6-main { padding: clamp(24px, 4cqw, 40px); }
.hb-qh6-side { padding: clamp(24px, 4cqw, 36px); background: linear-gradient(180deg, #141414, #0f0f0f); border-top: 1px solid rgba(255,255,255,.06); }
.hb-qh6-lock { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; background: color-mix(in srgb, var(--hb-qh6-accent) 14%, #111); border: 1px solid color-mix(in srgb, var(--hb-qh6-accent) 35%, transparent); color: color-mix(in srgb, var(--hb-qh6-accent) 70%, white); margin-bottom: 20px; }
.hb-qh6-title { margin: 0; font-size: clamp(24px, 3.4cqw, 30px); letter-spacing: -.02em; font-weight: 600; }
.hb-qh6-sub { margin: 8px 0 24px; font-size: 14px; color: #8f8f8f; line-height: 1.6; }
.hb-qh6-sub b { color: #ededed; font-weight: 500; }
.hb-qh6-form { display: grid; gap: 16px; }
.hb-qh6-label { display: block; margin-bottom: 6px; font-size: 13px; color: #a1a1a1; }
.hb-qh6-wrap { position: relative; }
.hb-qh6-input { width: 100%; height: 46px; padding: 0 48px 0 14px; border-radius: 12px; border: 1px solid #262626; background: #0c0c0c; color: #ededed; font: inherit; font-size: 15px; letter-spacing: .02em; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-qh6-input:focus { border-color: var(--hb-qh6-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qh6-accent) 22%, transparent); }
.hb-qh6-input[aria-invalid="true"] { border-color: #f87171; }
.hb-qh6-eye { position: absolute; right: 7px; top: 7px; width: 32px; height: 32px; border: 0; border-radius: 8px; background: transparent; color: #8f8f8f; cursor: pointer; display: grid; place-items: center; }
.hb-qh6-eye:hover { color: #ededed; background: #1a1a1a; }
.hb-qh6-meter { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 10px; }
.hb-qh6-seg { height: 4px; border-radius: 4px; background: #222; overflow: hidden; }
.hb-qh6-seg i { display: block; height: 100%; background: var(--hb-qh6-level); transform-origin: left; transform: scaleX(0); transition: transform .4s cubic-bezier(.2,.7,.2,1), background .3s; }
.hb-qh6-seg[data-on="true"] i { transform: scaleX(1); }
.hb-qh6-strength { display: flex; justify-content: space-between; margin-top: 8px; font-size: 12px; color: #8f8f8f; }
.hb-qh6-strength b { color: var(--hb-qh6-level); font-weight: 600; transition: color .3s; }
.hb-qh6-err { margin: 6px 0 0; font-size: 12px; color: #fca5a5; }
.hb-qh6-match { margin: 6px 0 0; font-size: 12px; color: #4ade80; }
.hb-qh6-btn { margin-top: 4px; height: 46px; border: 0; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--hb-qh6-accent); color: #fff; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,.25); transition: filter .2s, opacity .2s; }
.hb-qh6-btn:hover { filter: brightness(1.1); }
.hb-qh6-btn:disabled { cursor: progress; }
.hb-qh6-btn:focus-visible, .hb-qh6-eye:focus-visible, .hb-qh6-cta:focus-visible { outline: 2px solid var(--hb-qh6-accent); outline-offset: 2px; }
.hb-qh6-spin { width: 15px; height: 15px; border-radius: 50%; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; animation: hb-qh6-turn .7s linear infinite; }
.hb-qh6-h3 { margin: 0 0 4px; font-size: 13px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #a1a1a1; }
.hb-qh6-hint { margin: 0 0 18px; font-size: 13px; color: #6f6f6f; }
.hb-qh6-rules { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.hb-qh6-rule { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #8f8f8f; transition: color .3s; }
.hb-qh6-rule[data-ok="true"] { color: #ededed; }
.hb-qh6-tick { flex: none; position: relative; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #333; display: grid; place-items: center; transition: background .3s, border-color .3s, transform .3s cubic-bezier(.3,1.6,.5,1); }
.hb-qh6-tick path { stroke-dasharray: 14; stroke-dashoffset: 14; transition: stroke-dashoffset .35s ease .05s; }
.hb-qh6-rule[data-ok="true"] .hb-qh6-tick { background: var(--hb-qh6-accent); border-color: var(--hb-qh6-accent); transform: scale(1.08); }
.hb-qh6-rule[data-ok="true"] .hb-qh6-tick path { stroke-dashoffset: 0; }
.hb-qh6-crack { margin-top: 22px; padding: 14px; border-radius: 14px; border: 1px solid rgba(255,255,255,.06); background: #0c0c0c; display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 13px; color: #8f8f8f; }
.hb-qh6-crack b { color: #ededed; font-weight: 500; font-variant-numeric: tabular-nums; }
.hb-qh6-done { display: grid; justify-items: start; gap: 12px; animation: hb-qh6-in .5s ease both; }
.hb-qh6-ok { width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; background: color-mix(in srgb, #22c55e 14%, #111); border: 1px solid rgba(34,197,94,.35); }
.hb-qh6-ok path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-qh6-draw .5s .15s ease forwards; }
.hb-qh6-chip { display: inline-flex; align-items: center; gap: 8px; height: 30px; padding: 0 12px; border-radius: 999px; background: #171717; border: 1px solid #262626; font-size: 12.5px; color: #a1a1a1; }
.hb-qh6-cta { display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: 12px; background: #ededed; color: #0a0a0a; font-size: 14px; font-weight: 600; text-decoration: none; margin-top: 6px; }
@container (min-width: 720px) {
  .hb-qh6-shell { grid-template-columns: 1.15fr 1fr; }
  .hb-qh6-side { border-top: 0; border-left: 1px solid rgba(255,255,255,.06); }
}
@keyframes hb-qh6-turn { to { transform: rotate(360deg); } }
@keyframes hb-qh6-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-qh6-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-qh6 *, .hb-qh6 *::before, .hb-qh6 *::after { animation: none !important; transition: none !important; }
  .hb-qh6-ok path { stroke-dashoffset: 0; }
}
`;

const common = ["password", "123456", "qwerty", "letmein", "welcome", "iloveyou", "admin", "monkey", "dragon", "sunshine"];
const levels = [
  { label: "Too weak", color: "#ef4444", time: "instantly" },
  { label: "Weak", color: "#f97316", time: "about 3 hours" },
  { label: "Fair", color: "#eab308", time: "about 4 months" },
  { label: "Strong", color: "#22c55e", time: "centuries" },
];

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise<unknown>((resolve) => setTimeout(() => resolve(result), 1000));
}

function Eye({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {open && <path d="M2.5 13.5 13.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />}
    </svg>
  );
}

export function LoginResetPassword({
  title = "Choose a new password",
  subtitle = "You're resetting the password for",
  account = "jordan.ellis@tidewater.io",
  minLength = 12,
  defaultPassword = "",
  onSubmit,
  signIn = { label: "Continue to sign in", href: "#sign-in" },
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: LoginResetPasswordProps) {
  const uid = React.useId();
  const [password, setPassword] = React.useState(defaultPassword);
  const [confirm, setConfirm] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "error" | "success">("idle");

  const rules = [
    { id: "len", label: `At least ${minLength} characters`, ok: password.length >= minLength },
    { id: "case", label: "Upper and lowercase letters", ok: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { id: "num", label: "At least one number", ok: /\d/.test(password) },
    { id: "sym", label: "At least one symbol", ok: /[^A-Za-z0-9]/.test(password) },
    { id: "common", label: "Not a common password", ok: password.length > 0 && !common.some((c) => password.toLowerCase().includes(c)) },
  ];
  const passed = rules.filter((r) => r.ok).length;
  const score = password.length === 0 ? -1 : passed <= 2 ? 0 : passed === 3 ? 1 : passed === 4 ? 2 : 3;
  const level = levels[Math.max(0, score)];
  const valid = passed === rules.length;
  const matches = confirm.length > 0 && confirm === password;

  const pwError = touched && !valid ? "Your password needs to meet every rule on the right." : "";
  const confirmError = touched && valid && !matches ? "Passwords don't match yet." : "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!valid || !matches || status === "loading") return;
    setStatus("loading");
    try {
      const result = await wait(onSubmit ? onSubmit({ password }) : true);
      setStatus(result === false ? "error" : "success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={`hb-qh6 ${className}`} style={{ "--hb-qh6-accent": accent, "--hb-qh6-level": score < 0 ? "#333" : level.color, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-login-reset-password" precedence="default">{css}</style>
      <div className="hb-qh6-inner">
        <div className="hb-qh6-shell">
          <div className="hb-qh6-main">
            {status === "success" ? (
              <div className="hb-qh6-done" role="status">
                <div className="hb-qh6-ok">
                  <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12.5 4 4 8-9" fill="none" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h2 className="hb-qh6-title">Password updated</h2>
                <p className="hb-qh6-sub" style={{ margin: 0 }}>Use your new password the next time you sign in to <b>{account}</b>.</p>
                <span className="hb-qh6-chip">
                  <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 2.5 4v4c0 3.2 2.3 5.6 5.5 6.5 3.2-.9 5.5-3.3 5.5-6.5V4L8 1.5Z" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
                  Signed out of 3 other devices
                </span>
                <a className="hb-qh6-cta" href={signIn.href}>{signIn.label}
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
            ) : (
              <>
                <div className="hb-qh6-lock" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20"><rect x="4" y="9" width="12" height="8.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="10" cy="13.2" r="1.2" fill="currentColor" /></svg>
                </div>
                <h2 className="hb-qh6-title">{title}</h2>
                <p className="hb-qh6-sub">{subtitle} <b>{account}</b>.</p>
                <form className="hb-qh6-form" noValidate onSubmit={handleSubmit}>
                  <div>
                    <label className="hb-qh6-label" htmlFor={`${uid}-p`}>New password</label>
                    <div className="hb-qh6-wrap">
                      <input id={`${uid}-p`} className="hb-qh6-input" type={show ? "text" : "password"} autoComplete="new-password" value={password} aria-invalid={pwError ? true : undefined} aria-describedby={`${uid}-st${pwError ? ` ${uid}-pe` : ""}`} onChange={(e) => setPassword(e.target.value)} />
                      <button type="button" className="hb-qh6-eye" aria-label={show ? "Hide passwords" : "Show passwords"} aria-pressed={show} onClick={() => setShow((s) => !s)}><Eye open={show} /></button>
                    </div>
                    <div className="hb-qh6-meter" aria-hidden="true">
                      {[0, 1, 2, 3].map((i) => (
                        <span key={i} className="hb-qh6-seg" data-on={i <= score}><i style={{ transitionDelay: `${(i * 0.06).toFixed(2)}s` }} /></span>
                      ))}
                    </div>
                    <div className="hb-qh6-strength" id={`${uid}-st`} aria-live="polite">
                      <span>Strength</span>
                      <b>{score < 0 ? "None" : level.label}</b>
                    </div>
                    {pwError && <p className="hb-qh6-err" id={`${uid}-pe`}>{pwError}</p>}
                  </div>
                  <div>
                    <label className="hb-qh6-label" htmlFor={`${uid}-c`}>Confirm password</label>
                    <input id={`${uid}-c`} className="hb-qh6-input" type={show ? "text" : "password"} autoComplete="new-password" value={confirm} aria-invalid={confirmError ? true : undefined} aria-describedby={confirmError ? `${uid}-ce` : undefined} onChange={(e) => setConfirm(e.target.value)} />
                    {confirmError && <p className="hb-qh6-err" id={`${uid}-ce`}>{confirmError}</p>}
                    {matches && valid && <p className="hb-qh6-match">Passwords match.</p>}
                  </div>
                  {status === "error" && <p className="hb-qh6-err" role="alert">This reset link has expired. Request a new one.</p>}
                  <button type="submit" className="hb-qh6-btn" disabled={status === "loading"} aria-busy={status === "loading"}>
                    {status === "loading" && <span className="hb-qh6-spin" aria-hidden="true" />}
                    {status === "loading" ? "Updating password" : "Update password"}
                  </button>
                </form>
              </>
            )}
          </div>
          <aside className="hb-qh6-side" aria-label="Password requirements">
            <h3 className="hb-qh6-h3">Requirements</h3>
            <p className="hb-qh6-hint">{passed} of {rules.length} met</p>
            <ul className="hb-qh6-rules">
              {rules.map((r) => (
                <li key={r.id} className="hb-qh6-rule" data-ok={r.ok}>
                  <span className="hb-qh6-tick" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12"><path d="m2.5 6.2 2.3 2.3 4.7-5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span>{r.label}<span className="hb-qh6-sr" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{r.ok ? ", met" : ", not met"}</span></span>
                </li>
              ))}
            </ul>
            <div className="hb-qh6-crack">
              <span>Time to crack</span>
              <b>{score < 0 ? "Not set" : level.time}</b>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
