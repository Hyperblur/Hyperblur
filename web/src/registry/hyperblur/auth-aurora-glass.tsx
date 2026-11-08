"use client";

import * as React from "react";

export interface AuthAuroraGlassValues {
  email: string;
  password: string;
  stay: boolean;
}

export interface AuthAuroraGlassProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: string;
  title?: string;
  subtitle?: string;
  colors?: { idle: [string, string]; email: string; password: string; success: string };
  defaultEmail?: string;
  forgotHref?: string;
  signup?: { label: string; href: string } | null;
  onSubmit?: (values: AuthAuroraGlassValues) => boolean | void | Promise<boolean | void>;
}

const css = `
@property --hb-vf3-a { syntax: "<color>"; inherits: true; initial-value: #22d3ee; }
@property --hb-vf3-b { syntax: "<color>"; inherits: true; initial-value: #8b5cf6; }
.hb-vf3 {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  display: grid;
  place-items: center;
  padding: 60px 20px;
  overflow: hidden;
  isolation: isolate;
  background: #05060a;
  color: #f2f4f8;
  font-family: inherit;
  --hb-vf3-a: var(--hb-vf3-i1);
  --hb-vf3-b: var(--hb-vf3-i2);
  transition: --hb-vf3-a 1.2s cubic-bezier(.4,0,.2,1), --hb-vf3-b 1.2s cubic-bezier(.4,0,.2,1);
}
.hb-vf3[data-mood="email"] { --hb-vf3-a: var(--hb-vf3-ce); --hb-vf3-b: var(--hb-vf3-i1); }
.hb-vf3[data-mood="password"] { --hb-vf3-a: var(--hb-vf3-cp); --hb-vf3-b: var(--hb-vf3-i2); }
.hb-vf3[data-mood="caps"] { --hb-vf3-a: #f59e0b; --hb-vf3-b: #f97316; }
.hb-vf3[data-mood="success"] { --hb-vf3-a: var(--hb-vf3-cs); --hb-vf3-b: var(--hb-vf3-cs); }
.hb-vf3 *, .hb-vf3 *::before, .hb-vf3 *::after { box-sizing: border-box; }
.hb-vf3-sky { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
.hb-vf3-sky::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,.7), transparent), radial-gradient(1px 1px at 28% 72%, rgba(255,255,255,.4), transparent), radial-gradient(1px 1px at 46% 12%, rgba(255,255,255,.55), transparent), radial-gradient(1px 1px at 64% 84%, rgba(255,255,255,.35), transparent), radial-gradient(1px 1px at 78% 26%, rgba(255,255,255,.6), transparent), radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,.4), transparent), radial-gradient(1px 1px at 6% 52%, rgba(255,255,255,.35), transparent), radial-gradient(1px 1px at 55% 40%, rgba(255,255,255,.3), transparent);
}
.hb-vf3-sky::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 55%, #05060a 98%); }
.hb-vf3-band {
  position: absolute;
  top: -20%;
  height: 95%;
  width: 46%;
  border-radius: 50%;
  filter: blur(46px);
  mix-blend-mode: screen;
  opacity: .62;
  transform-origin: 50% 0;
  animation: hb-vf3-sway 14s cubic-bezier(.45,0,.55,1) infinite alternate;
}
.hb-vf3-band:nth-child(1) { left: -6%; background: linear-gradient(180deg, transparent 5%, var(--hb-vf3-a) 45%, transparent 90%); }
.hb-vf3-band:nth-child(2) { left: 22%; width: 34%; background: linear-gradient(180deg, transparent 10%, var(--hb-vf3-b) 50%, transparent 92%); animation-duration: 17s; animation-delay: -5s; }
.hb-vf3-band:nth-child(3) { left: 48%; background: linear-gradient(180deg, transparent 0%, var(--hb-vf3-a) 38%, transparent 85%); animation-duration: 19s; animation-delay: -9s; opacity: .5; }
.hb-vf3-band:nth-child(4) { left: 70%; width: 38%; background: linear-gradient(180deg, transparent 12%, var(--hb-vf3-b) 46%, transparent 88%); animation-duration: 15s; animation-delay: -3s; }
.hb-vf3-curtain {
  position: absolute;
  inset: -10% -10% 30%;
  background: repeating-linear-gradient(90deg, transparent 0 18px, rgba(255,255,255,.035) 18px 19px, transparent 19px 34px);
  mask: linear-gradient(180deg, transparent, #000 30%, transparent 85%);
  animation: hb-vf3-drift 30s linear infinite;
}
.hb-vf3-card {
  position: relative;
  width: 100%;
  max-width: 392px;
  padding: 30px;
  border-radius: 24px;
  background: linear-gradient(160deg, rgba(255,255,255,.12), rgba(255,255,255,.035) 45%, rgba(255,255,255,.06));
  backdrop-filter: blur(26px) saturate(150%);
  -webkit-backdrop-filter: blur(26px) saturate(150%);
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.28), inset 0 -1px 0 rgba(255,255,255,.04), 0 30px 80px -20px rgba(0,0,0,.7), 0 0 0 1px rgba(0,0,0,.2);
}
.hb-vf3-card::before {
  content: "";
  position: absolute;
  left: 18%;
  right: 18%;
  top: -1px;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-vf3-a) 70%, #fff), transparent);
}
.hb-vf3-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
.hb-vf3-brand { display: inline-flex; align-items: center; gap: 9px; font-weight: 600; font-size: 14px; }
.hb-vf3-orb { width: 24px; height: 24px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff, var(--hb-vf3-a) 40%, var(--hb-vf3-b) 90%); box-shadow: 0 0 18px -2px var(--hb-vf3-a); }
.hb-vf3-mood { font-size: 11.5px; color: rgba(242,244,248,.6); display: inline-flex; align-items: center; gap: 6px; }
.hb-vf3-mood i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-vf3-a); box-shadow: 0 0 8px var(--hb-vf3-a); }
.hb-vf3-title { margin: 0; font-size: 26px; line-height: 1.12; font-weight: 600; letter-spacing: -.03em; }
.hb-vf3-sub { margin: 8px 0 24px; font-size: 14px; line-height: 1.55; color: rgba(242,244,248,.66); }
.hb-vf3-float { position: relative; margin-bottom: 14px; }
.hb-vf3-input { width: 100%; height: 54px; padding: 22px 14px 8px; border-radius: 14px; border: 1px solid rgba(255,255,255,.14); background: rgba(5,6,10,.35); color: #fff; font: inherit; font-size: 14.5px; outline: none; transition: border-color .3s, background .3s, box-shadow .3s; }
.hb-vf3-input[data-pad="true"] { padding-right: 70px; }
.hb-vf3-input:focus { border-color: color-mix(in srgb, var(--hb-vf3-a) 75%, #fff); background: rgba(5,6,10,.5); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vf3-a) 22%, transparent), 0 10px 30px -12px var(--hb-vf3-a); }
.hb-vf3-input[aria-invalid="true"] { border-color: #ff7b7b; }
.hb-vf3-flabel { position: absolute; left: 15px; top: 17px; font-size: 14.5px; color: rgba(242,244,248,.55); pointer-events: none; transform-origin: 0 0; transition: transform .3s cubic-bezier(.2,.8,.2,1), color .3s; }
.hb-vf3-input:focus + .hb-vf3-flabel, .hb-vf3-input:not(:placeholder-shown) + .hb-vf3-flabel { transform: translateY(-9px) scale(.76); color: rgba(242,244,248,.8); }
.hb-vf3-reveal { position: absolute; right: 8px; top: 11px; height: 32px; padding: 0 10px; border: 0; border-radius: 9px; background: rgba(255,255,255,.08); color: rgba(242,244,248,.8); font: inherit; font-size: 12px; cursor: pointer; transition: background .2s; }
.hb-vf3-reveal:hover { background: rgba(255,255,255,.14); }
.hb-vf3-caps { display: flex; align-items: center; gap: 8px; margin: -4px 0 12px; font-size: 12px; color: #fbbf24; }
.hb-vf3-err { margin: -6px 0 12px; font-size: 12px; color: #ff9c9c; }
.hb-vf3-row { display: flex; align-items: center; justify-content: space-between; margin: 6px 0 22px; font-size: 13px; color: rgba(242,244,248,.7); }
.hb-vf3-row a { color: rgba(242,244,248,.85); text-decoration: none; }
.hb-vf3-row a:hover { color: #fff; }
.hb-vf3-switch { display: inline-flex; align-items: center; gap: 10px; border: 0; background: none; padding: 0; color: inherit; font: inherit; cursor: pointer; border-radius: 999px; }
.hb-vf3-track { position: relative; width: 34px; height: 20px; border-radius: 999px; background: rgba(255,255,255,.14); transition: background .3s; }
.hb-vf3-track::after { content: ""; position: absolute; left: 2px; top: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,.35); transition: transform .35s cubic-bezier(.3,1.4,.5,1); }
.hb-vf3-switch[aria-checked="true"] .hb-vf3-track { background: color-mix(in srgb, var(--hb-vf3-a) 80%, #000); }
.hb-vf3-switch[aria-checked="true"] .hb-vf3-track::after { transform: translateX(14px); }
.hb-vf3-go { position: relative; width: 100%; height: 50px; border: 0; border-radius: 14px; overflow: hidden; cursor: pointer; font: inherit; font-size: 15px; font-weight: 600; color: #05060a; background: #f5f7fb; box-shadow: inset 0 -2px 0 rgba(0,0,0,.08), 0 14px 34px -14px var(--hb-vf3-a); transition: transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .5s; display: inline-flex; align-items: center; justify-content: center; gap: 10px; }
.hb-vf3-go::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, var(--hb-vf3-a), var(--hb-vf3-b)); opacity: 0; transition: opacity .4s; }
.hb-vf3-go:hover::before { opacity: .22; }
.hb-vf3-go > span { position: relative; display: inline-flex; align-items: center; gap: 10px; }
.hb-vf3-go:active { transform: scale(.985); }
.hb-vf3-go:disabled { cursor: progress; }
.hb-vf3-dots { display: inline-flex; gap: 4px; }
.hb-vf3-dots i { width: 5px; height: 5px; border-radius: 50%; background: currentColor; animation: hb-vf3-dot 1s cubic-bezier(.45,0,.55,1) infinite; }
.hb-vf3-dots i:nth-child(2) { animation-delay: .15s; }
.hb-vf3-dots i:nth-child(3) { animation-delay: .3s; }
.hb-vf3-alert { margin: 0 0 14px; padding: 10px 12px; border-radius: 12px; background: rgba(255,123,123,.12); border: 1px solid rgba(255,123,123,.3); color: #ffc1c1; font-size: 13px; }
.hb-vf3-foot { margin: 18px 0 0; text-align: center; font-size: 13px; color: rgba(242,244,248,.6); }
.hb-vf3-foot a { color: #fff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.3); }
.hb-vf3 :is(.hb-vf3-reveal, .hb-vf3-switch, .hb-vf3-go, .hb-vf3-row a, .hb-vf3-foot a, .hb-vf3-back):focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-vf3-done { text-align: center; padding: 18px 0 6px; animation: hb-vf3-in .7s cubic-bezier(.2,.8,.2,1) both; }
.hb-vf3-halo { width: 78px; height: 78px; margin: 0 auto 18px; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle at 35% 30%, #fff, var(--hb-vf3-a) 45%, transparent 72%); box-shadow: 0 0 40px -4px var(--hb-vf3-a); animation: hb-vf3-pop .7s cubic-bezier(.3,1.5,.5,1) both; }
.hb-vf3-back { margin-top: 16px; border: 0; background: none; color: rgba(242,244,248,.7); font: inherit; font-size: 13px; cursor: pointer; border-radius: 6px; }
.hb-vf3-back:hover { color: #fff; }
@keyframes hb-vf3-sway { 0% { transform: translateX(-4%) skewX(-10deg) scaleY(.9); } 100% { transform: translateX(6%) skewX(12deg) scaleY(1.08); } }
@keyframes hb-vf3-drift { to { transform: translateX(-68px); } }
@keyframes hb-vf3-dot { 0%, 100% { opacity: .3; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-3px); } }
@keyframes hb-vf3-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes hb-vf3-pop { from { transform: scale(.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vf3, .hb-vf3 *, .hb-vf3 *::before, .hb-vf3 *::after { animation: none !important; transition: none !important; }
}
`;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

const moodLabel: Record<string, string> = { idle: "Secure connection", email: "Identifying", password: "Encrypted input", caps: "Caps Lock is on", success: "Signed in" };

export function AuthAuroraGlass({
  brand = "Polaris",
  title = "Sign in under the lights",
  subtitle = "Welcome back. Your workspace syncs the moment you arrive.",
  colors = { idle: ["#22d3ee", "#8b5cf6"], email: "#2dd4bf", password: "#a855f7", success: "#4ade80" },
  defaultEmail = "",
  forgotHref = "#forgot",
  signup = { label: "Request access", href: "#signup" },
  onSubmit,
  className,
  style,
  ...rest
}: AuthAuroraGlassProps) {
  const id = React.useId();
  const [email, setEmail] = React.useState(defaultEmail);
  const [password, setPassword] = React.useState("");
  const [stay, setStay] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [focus, setFocus] = React.useState<"email" | "password" | null>(null);
  const [caps, setCaps] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = React.useState<string | null>(null);

  const mood = status === "success" ? "success" : focus === "password" && caps ? "caps" : focus ?? "idle";
  const emailBad = touched && !isEmail(email);
  const passBad = touched && password.length < 8;

  const readCaps = (e: React.KeyboardEvent<HTMLInputElement>) => setCaps(e.getModifierState("CapsLock"));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (!isEmail(email) || password.length < 8) return;
    setStatus("loading");
    try {
      const r = onSubmit ? await onSubmit({ email: email.trim(), password, stay }) : await new Promise<boolean>((res) => setTimeout(() => res(true), 1200));
      if (r === false) {
        setStatus("idle");
        setError("Those details do not match an account.");
        return;
      }
      setFocus(null);
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  };

  const vars = {
    "--hb-vf3-i1": colors.idle[0],
    "--hb-vf3-i2": colors.idle[1],
    "--hb-vf3-ce": colors.email,
    "--hb-vf3-cp": colors.password,
    "--hb-vf3-cs": colors.success,
    ...style,
  } as React.CSSProperties;

  return (
    <section className={["hb-vf3", className].filter(Boolean).join(" ")} data-mood={mood} style={vars} {...rest}>
      <style href="hb-auth-aurora-glass" precedence="default">{css}</style>
      <div className="hb-vf3-sky" aria-hidden="true">
        <span className="hb-vf3-band" />
        <span className="hb-vf3-band" />
        <span className="hb-vf3-band" />
        <span className="hb-vf3-band" />
        <span className="hb-vf3-curtain" />
      </div>
      <div className="hb-vf3-card">
        <div className="hb-vf3-head">
          <span className="hb-vf3-brand"><span className="hb-vf3-orb" aria-hidden="true" />{brand}</span>
          <span className="hb-vf3-mood" aria-live="polite"><i aria-hidden="true" />{moodLabel[mood]}</span>
        </div>
        {status === "success" ? (
          <div className="hb-vf3-done" role="status">
            <div className="hb-vf3-halo" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 12.5 10 17l9-10" stroke="#05060a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2 className="hb-vf3-title">Clear skies</h2>
            <p className="hb-vf3-sub" style={{ marginBottom: 0 }}>You are signed in as {email.trim()}{stay ? " for the next 30 days" : ""}.</p>
            <button type="button" className="hb-vf3-back" onClick={() => { setStatus("idle"); setPassword(""); setTouched(false); }}>Switch account</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h2 className="hb-vf3-title">{title}</h2>
            <p className="hb-vf3-sub">{subtitle}</p>
            {error ? <p className="hb-vf3-alert" role="alert">{error}</p> : null}
            <div className="hb-vf3-float">
              <input id={`${id}-e`} className="hb-vf3-input" type="email" autoComplete="email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocus("email")} onBlur={() => setFocus(null)} aria-invalid={emailBad ? true : undefined} />
              <label className="hb-vf3-flabel" htmlFor={`${id}-e`}>Email address</label>
            </div>
            {emailBad ? <p className="hb-vf3-err" role="alert">That email looks incomplete.</p> : null}
            <div className="hb-vf3-float">
              <input id={`${id}-p`} className="hb-vf3-input" data-pad="true" type={show ? "text" : "password"} autoComplete="current-password" placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={readCaps} onKeyUp={readCaps} onFocus={() => setFocus("password")} onBlur={() => setFocus(null)} aria-invalid={passBad ? true : undefined} />
              <label className="hb-vf3-flabel" htmlFor={`${id}-p`}>Password</label>
              <button type="button" className="hb-vf3-reveal" onClick={() => setShow((s) => !s)} aria-pressed={show} aria-label={show ? "Hide password" : "Show password"}>{show ? "Hide" : "Show"}</button>
            </div>
            {caps && focus === "password" ? (
              <p className="hb-vf3-caps" role="status">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2 2.5 8H5.5v3h5V8h3Z M5.5 13.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                Caps Lock is on
              </p>
            ) : null}
            {passBad ? <p className="hb-vf3-err" role="alert">At least 8 characters.</p> : null}
            <div className="hb-vf3-row">
              <button type="button" role="switch" aria-checked={stay} className="hb-vf3-switch" onClick={() => setStay((s) => !s)}>
                <span className="hb-vf3-track" aria-hidden="true" />
                Stay signed in
              </button>
              <a href={forgotHref}>Forgot password</a>
            </div>
            <button type="submit" className="hb-vf3-go" disabled={status === "loading"} aria-busy={status === "loading"}>
              <span>{status === "loading" ? <>Signing in <span className="hb-vf3-dots" aria-hidden="true"><i /><i /><i /></span></> : "Continue"}</span>
            </button>
            {signup ? <p className="hb-vf3-foot">New to {brand}? <a href={signup.href}>{signup.label}</a></p> : null}
          </form>
        )}
      </div>
    </section>
  );
}
