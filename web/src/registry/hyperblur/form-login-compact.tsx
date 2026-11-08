"use client";

import * as React from "react";

export interface FormLoginCompactProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "title"> {
  title?: string;
  brand?: string;
  maxAttempts?: number;
  lockSeconds?: number;
  accent?: string;
  delay?: number;
  onIdentify?: (email: string) => void | Promise<void>;
  onSubmit?: (email: string, password: string, remember: boolean) => boolean | Promise<boolean>;
  onForgot?: (email: string) => void;
}

const css = `
.hb-xh11 {
  --hb-xh11-a: #60a5fa;
  box-sizing: border-box;
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
  font-family: inherit;
  color: #ededed;
}
.hb-xh11 *, .hb-xh11 *::before, .hb-xh11 *::after { box-sizing: border-box; }
.hb-xh11-card { position: relative; padding: 20px; border: 1px solid #262626; border-radius: 16px; background: linear-gradient(180deg, #131313, #0e0e0e); box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 48px -24px rgba(0,0,0,0.9); }
.hb-xh11-card[data-shake="a"] { animation: hb-xh11-shake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xh11-card[data-shake="b"] { animation: hb-xh11-shake-b 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xh11-head { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.hb-xh11-logo { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 9px; background: #ededed; color: #0a0a0a; }
.hb-xh11-logo svg { width: 16px; height: 16px; }
.hb-xh11-title { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.hb-xh11-title small { display: block; margin-top: 1px; font-size: 12px; font-weight: 400; color: #7f7f7f; }
.hb-xh11-form { display: grid; gap: 10px; }
.hb-xh11-id { display: flex; align-items: center; gap: 9px; height: 40px; padding: 0 6px 0 5px; border: 1px solid #262626; border-radius: 999px; background: #0b0b0b; animation: hb-xh11-in 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh11-av { display: grid; place-items: center; width: 28px; height: 28px; flex: none; border-radius: 50%; background: linear-gradient(135deg, var(--hb-xh11-a), #a78bfa); color: #fff; font-size: 12px; font-weight: 600; }
.hb-xh11-id span { flex: 1; min-width: 0; font-size: 13px; color: #d6d6d6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xh11-chg { flex: none; height: 26px; padding: 0 10px; border: 0; border-radius: 999px; background: #1b1b1b; color: #bdbdbd; font: inherit; font-size: 11.5px; cursor: pointer; transition: background 0.2s ease, color 0.2s ease; }
.hb-xh11-chg:hover { background: #262626; color: #fff; }
.hb-xh11-chg:focus-visible { outline: 2px solid var(--hb-xh11-a); outline-offset: 1px; }
.hb-xh11-box { position: relative; display: flex; align-items: center; height: 42px; border: 1px solid #272727; border-radius: 10px; background: #0b0b0b; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.hb-xh11-box:focus-within { border-color: var(--hb-xh11-a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xh11-a) 20%, transparent); }
.hb-xh11-box[data-bad="true"] { border-color: #f05260; box-shadow: 0 0 0 3px rgba(240,82,96,0.12); }
.hb-xh11-in { flex: 1; min-width: 0; height: 100%; padding: 0 12px; border: 0; outline: 0; background: transparent; color: #ededed; font: inherit; font-size: 14px; }
.hb-xh11-in::placeholder { color: #545454; }
.hb-xh11-step { animation: hb-xh11-slide 0.42s cubic-bezier(0.22, 1, 0.36, 1); display: grid; gap: 10px; }
.hb-xh11-eye { display: grid; place-items: center; width: 30px; height: 30px; margin-right: 6px; border: 0; border-radius: 7px; background: none; color: #767676; cursor: pointer; transition: color 0.2s ease, background 0.2s ease; }
.hb-xh11-eye:hover { color: #fff; background: #1b1b1b; }
.hb-xh11-eye:focus-visible { outline: 2px solid var(--hb-xh11-a); }
.hb-xh11-eye svg { width: 16px; height: 16px; }
.hb-xh11-caps { display: inline-flex; align-items: center; gap: 4px; margin-right: 4px; padding: 2px 6px; border-radius: 5px; background: rgba(245,165,36,0.14); color: #f5b74a; font-size: 10.5px; font-weight: 600; animation: hb-xh11-in 0.2s ease-out; }
.hb-xh11-caps svg { width: 10px; height: 10px; }
.hb-xh11-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 12px; color: #8a8a8a; }
.hb-xh11-rem { display: inline-flex; align-items: center; gap: 7px; cursor: pointer; }
.hb-xh11-rem input { width: 14px; height: 14px; margin: 0; accent-color: var(--hb-xh11-a); }
.hb-xh11-forgot { padding: 0; border: 0; background: none; color: #bcbcbc; font: inherit; font-size: 12px; cursor: pointer; }
.hb-xh11-forgot:hover { color: #fff; text-decoration: underline; text-underline-offset: 3px; }
.hb-xh11-forgot:focus-visible { outline: 2px solid var(--hb-xh11-a); outline-offset: 2px; border-radius: 3px; }
.hb-xh11-err { display: flex; gap: 8px; align-items: flex-start; margin: 0; padding: 8px 10px; border-radius: 9px; background: rgba(240,82,96,0.08); border: 1px solid rgba(240,82,96,0.25); font-size: 12px; color: #ff9aa3; line-height: 1.4; animation: hb-xh11-in 0.25s ease-out; }
.hb-xh11-err b { font-weight: 600; color: #ffb3b9; }
.hb-xh11-pips { display: inline-flex; gap: 3px; margin-left: auto; padding-top: 4px; flex: none; }
.hb-xh11-pips i { width: 6px; height: 6px; border-radius: 50%; background: #ff9aa3; }
.hb-xh11-pips i[data-used="true"] { background: rgba(255,154,163,0.25); }
.hb-xh11-go { position: relative; overflow: hidden; height: 42px; border: 0; border-radius: 10px; background: #ededed; color: #0a0a0a; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: inset 0 -2px 0 rgba(0,0,0,0.12); transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), background 0.2s ease, opacity 0.2s ease; }
.hb-xh11-go:hover:not(:disabled) { background: #fff; }
.hb-xh11-go:active:not(:disabled) { transform: scale(0.98); }
.hb-xh11-go:disabled { opacity: 0.5; cursor: not-allowed; }
.hb-xh11-go:focus-visible { outline: 2px solid var(--hb-xh11-a); outline-offset: 2px; }
.hb-xh11-go[aria-busy="true"]::after { content: ""; position: absolute; left: 0; bottom: 0; height: 2px; width: 40%; background: var(--hb-xh11-a); animation: hb-xh11-scan 0.9s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
.hb-xh11-sso { display: flex; align-items: center; gap: 10px; font-size: 11px; color: #5c5c5c; text-transform: uppercase; letter-spacing: 0.08em; }
.hb-xh11-sso::before, .hb-xh11-sso::after { content: ""; flex: 1; height: 1px; background: #222; }
.hb-xh11-key { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 40px; border: 1px solid #272727; border-radius: 10px; background: #121212; color: #d4d4d4; font: inherit; font-size: 13px; cursor: pointer; transition: background 0.2s ease, border-color 0.2s ease; }
.hb-xh11-key:hover { background: #181818; border-color: #333; }
.hb-xh11-key:focus-visible { outline: 2px solid var(--hb-xh11-a); outline-offset: 2px; }
.hb-xh11-key svg { width: 16px; height: 16px; }
.hb-xh11-ok { display: grid; justify-items: center; gap: 8px; padding: 10px 0 4px; text-align: center; animation: hb-xh11-in 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh11-ok .hb-xh11-av { width: 52px; height: 52px; font-size: 19px; box-shadow: 0 0 0 4px #0e0e0e, 0 0 0 5px color-mix(in srgb, var(--hb-xh11-a) 60%, transparent); animation: hb-xh11-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh11-ok h3 { margin: 6px 0 0; font-size: 16px; font-weight: 600; }
.hb-xh11-ok p { margin: 0; font-size: 12.5px; color: #8a8a8a; }
.hb-xh11-bar { width: 100%; height: 3px; margin-top: 8px; border-radius: 3px; background: #1f1f1f; overflow: hidden; }
.hb-xh11-bar i { display: block; height: 100%; background: var(--hb-xh11-a); transform-origin: left; animation: hb-xh11-fill 1.8s cubic-bezier(0.4, 0, 0.2, 1) both; }
@keyframes hb-xh11-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh11-slide { from { opacity: 0; transform: translateX(22px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh11-shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-5px); } 40%, 60% { transform: translateX(5px); } }
@keyframes hb-xh11-shake-b { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-5px); } 40%, 60% { transform: translateX(5px); } }
@keyframes hb-xh11-scan { from { transform: translateX(-100%); } to { transform: translateX(250%); } }
@keyframes hb-xh11-pop { from { transform: scale(0.5); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes hb-xh11-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xh11 *, .hb-xh11 *::before, .hb-xh11 *::after { animation: none !important; transition: none !important; }
}
`;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function nameFrom(email: string) {
  const local = email.split("@")[0] ?? "";
  const first = local.split(/[._-]/)[0] ?? local;
  return first ? first[0].toUpperCase() + first.slice(1) : "there";
}

export function FormLoginCompact({
  title = "Sign in",
  brand = "Northwind",
  maxAttempts = 3,
  lockSeconds = 30,
  accent = "#60a5fa",
  delay = 900,
  onIdentify,
  onSubmit,
  onForgot,
  className,
  style,
  ...rest
}: FormLoginCompactProps) {
  const uid = React.useId();
  const [step, setStep] = React.useState<"email" | "password" | "done">("email");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [caps, setCaps] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");
  const [fails, setFails] = React.useState(0);
  const [lock, setLock] = React.useState(0);
  const [shake, setShake] = React.useState(0);
  const [note, setNote] = React.useState("");
  const emailRef = React.useRef<HTMLInputElement>(null);
  const pwRef = React.useRef<HTMLInputElement>(null);
  const tick = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearInterval(tick.current), []);

  const fail = (msg: string) => {
    setError(msg);
    setShake((n) => n + 1);
  };

  const identify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!emailRe.test(email.trim())) {
      fail(email ? "Enter a complete email address." : "Enter your email to continue.");
      emailRef.current?.focus();
      return;
    }
    setBusy(true);
    setError("");
    try {
      await Promise.all([Promise.resolve(onIdentify?.(email.trim())), new Promise((r) => window.setTimeout(r, delay * 0.6))]);
      setStep("password");
      window.requestAnimationFrame(() => pwRef.current?.focus());
    } catch (err) {
      fail(err instanceof Error && err.message ? err.message : "We could not find that account.");
    } finally {
      setBusy(false);
    }
  };

  const startLock = () => {
    setLock(lockSeconds);
    window.clearInterval(tick.current);
    tick.current = window.setInterval(() => {
      setLock((s) => {
        if (s <= 1) {
          window.clearInterval(tick.current);
          setFails(0);
          setError("");
        }
        return Math.max(0, s - 1);
      });
    }, 1000);
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || lock) return;
    if (!password) {
      fail("Enter your password.");
      pwRef.current?.focus();
      return;
    }
    setBusy(true);
    setError("");
    let ok = false;
    try {
      const [result] = await Promise.all([
        Promise.resolve(onSubmit ? onSubmit(email.trim(), password, remember) : password.length >= 8),
        new Promise((r) => window.setTimeout(r, delay)),
      ]);
      ok = Boolean(result);
    } catch {
      ok = false;
    }
    setBusy(false);
    if (ok) {
      setStep("done");
      return;
    }
    const n = fails + 1;
    setFails(n);
    setPassword("");
    if (n >= maxAttempts) {
      fail("Too many attempts.");
      startLock();
    } else {
      fail(`Incorrect password. ${maxAttempts - n} attempt${maxAttempts - n === 1 ? "" : "s"} left.`);
      pwRef.current?.focus();
    }
  };

  const initial = (email.trim()[0] ?? "?").toUpperCase();

  return (
    <div className={["hb-xh11", className].filter(Boolean).join(" ")} style={{ ...style, "--hb-xh11-a": accent } as React.CSSProperties} {...rest}>
      <style href="hb-form-login-compact" precedence="default">{css}</style>
      <div className="hb-xh11-card" data-shake={shake ? (shake % 2 ? "a" : "b") : undefined}>
        {step === "done" ? (
          <div className="hb-xh11-ok" role="status">
            <span className="hb-xh11-av" aria-hidden="true">{initial}</span>
            <h3>Welcome back, {nameFrom(email.trim())}</h3>
            <p>Taking you to your {brand} dashboard</p>
            <span className="hb-xh11-bar" aria-hidden="true"><i /></span>
          </div>
        ) : (
          <>
            <div className="hb-xh11-head">
              <span className="hb-xh11-logo" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1 14.5 13.5h-13L8 1Z" /></svg>
              </span>
              <h3 className="hb-xh11-title">
                {title}
                <small>{step === "email" ? `Use your ${brand} account` : "Enter your password"}</small>
              </h3>
            </div>
            {step === "email" ? (
              <form className="hb-xh11-form" onSubmit={identify} noValidate>
                <div className="hb-xh11-box" data-bad={Boolean(error)}>
                  <input
                    ref={emailRef}
                    className="hb-xh11-in"
                    type="email"
                    autoComplete="username"
                    aria-label="Email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${uid}-err` : undefined}
                  />
                </div>
                {error ? <p className="hb-xh11-err" id={`${uid}-err`} role="alert">{error}</p> : null}
                <button type="submit" className="hb-xh11-go" aria-busy={busy}>{busy ? "Checking" : "Continue"}</button>
                <span className="hb-xh11-sso">or</span>
                <button type="button" className="hb-xh11-key" onClick={() => setNote("Passkey prompt opened")}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="5.5" cy="8" r="3" />
                    <path d="M8.5 8H15M12.5 8v2.5M14.5 8v2" />
                  </svg>
                  {note || "Sign in with a passkey"}
                </button>
              </form>
            ) : (
              <form className="hb-xh11-form hb-xh11-step" onSubmit={signIn} noValidate>
                <div className="hb-xh11-id">
                  <span className="hb-xh11-av" aria-hidden="true">{initial}</span>
                  <span>{email.trim()}</span>
                  <button
                    type="button"
                    className="hb-xh11-chg"
                    onClick={() => { setStep("email"); setPassword(""); setError(""); window.requestAnimationFrame(() => emailRef.current?.focus()); }}
                  >
                    Change
                  </button>
                </div>
                <div className="hb-xh11-box" data-bad={Boolean(error)}>
                  <input
                    ref={pwRef}
                    className="hb-xh11-in"
                    type={visible ? "text" : "password"}
                    autoComplete="current-password"
                    aria-label="Password"
                    placeholder="Password"
                    value={password}
                    disabled={lock > 0}
                    onChange={(e) => { setPassword(e.target.value); if (!lock) setError(""); }}
                    onKeyUp={(e) => setCaps(e.getModifierState("CapsLock"))}
                    onKeyDown={(e) => setCaps(e.getModifierState("CapsLock"))}
                    onBlur={() => setCaps(false)}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${uid}-err` : undefined}
                  />
                  {caps ? (
                    <span className="hb-xh11-caps" role="status">
                      <svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M5 1 9 5.5H6.5V9h-3V5.5H1L5 1Z" /></svg>
                      Caps
                    </span>
                  ) : null}
                  <button type="button" className="hb-xh11-eye" onClick={() => setVisible((v) => !v)} aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                      {visible ? null : <path d="M4 4l16 16" />}
                    </svg>
                  </button>
                </div>
                {error ? (
                  <p className="hb-xh11-err" id={`${uid}-err`} role="alert">
                    <span>{lock ? <><b>Locked.</b> Try again in 0:{lock.toString().padStart(2, "0")} or reset your password.</> : error}</span>
                    {fails > 0 && !lock ? (
                      <span className="hb-xh11-pips" aria-hidden="true">
                        {Array.from({ length: maxAttempts }, (_, i) => <i key={i} data-used={i < fails} />)}
                      </span>
                    ) : null}
                  </p>
                ) : null}
                <div className="hb-xh11-row">
                  <label className="hb-xh11-rem">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                    Remember this device
                  </label>
                  <button type="button" className="hb-xh11-forgot" onClick={() => onForgot?.(email.trim())}>Forgot?</button>
                </div>
                <button type="submit" className="hb-xh11-go" aria-busy={busy} disabled={lock > 0}>
                  {busy ? "Signing in" : lock ? `Locked 0:${lock.toString().padStart(2, "0")}` : "Sign in"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
