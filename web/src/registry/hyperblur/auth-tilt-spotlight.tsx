"use client";

import * as React from "react";

export interface AuthTiltSpotlightValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface AuthTiltSpotlightProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: string;
  title?: string;
  subtitle?: string;
  tilt?: number;
  defaultEmail?: string;
  forgotHref?: string;
  signup?: { label: string; href: string } | null;
  onSso?: () => void;
  onSubmit?: (values: AuthTiltSpotlightValues) => boolean | void | Promise<boolean | void>;
  accent?: string;
}

const css = `
@property --hb-vf1-angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.hb-vf1 {
  --hb-vf1-accent: #7c5cff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  display: grid;
  place-items: center;
  padding: 56px 20px;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
}
.hb-vf1 *, .hb-vf1 *::before, .hb-vf1 *::after { box-sizing: border-box; }
.hb-vf1 em, .hb-vf1 i { font-style: normal; }
.hb-vf1::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(255,255,255,.09) 1px, transparent 1.2px);
  background-size: 22px 22px;
  mask: radial-gradient(ellipse 60% 70% at 50% 50%, #000 10%, transparent 75%);
}
.hb-vf1::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 560px;
  height: 560px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  background: radial-gradient(circle, color-mix(in srgb, var(--hb-vf1-accent) 22%, transparent), transparent 62%);
  filter: blur(20px);
}
.hb-vf1-stage { position: relative; z-index: 1; width: 100%; max-width: 404px; perspective: 1100px; }
.hb-vf1-tilt {
  --hb-vf1-rx: 0deg;
  --hb-vf1-ry: 0deg;
  --hb-vf1-x: 50%;
  --hb-vf1-y: 0%;
  --hb-vf1-glow: 0;
  position: relative;
  border-radius: 22px;
  padding: 1px;
  transform: rotateX(var(--hb-vf1-rx)) rotateY(var(--hb-vf1-ry));
  transform-style: preserve-3d;
  transition: transform .5s cubic-bezier(.2,.8,.2,1);
  will-change: transform;
}
.hb-vf1-tilt[data-active="true"] { transition: transform .12s linear; }
.hb-vf1-tilt::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: conic-gradient(from var(--hb-vf1-angle), transparent 0deg, color-mix(in srgb, var(--hb-vf1-accent) 90%, #fff) 40deg, transparent 110deg, transparent 180deg, color-mix(in srgb, var(--hb-vf1-accent) 55%, #22d3ee) 220deg, transparent 290deg);
  animation: hb-vf1-spin 6s linear infinite;
}
.hb-vf1-tilt::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(180px circle at var(--hb-vf1-x) var(--hb-vf1-y), rgba(255,255,255,.75), transparent 70%);
  opacity: var(--hb-vf1-glow);
  transition: opacity .4s;
}
.hb-vf1-card {
  position: relative;
  z-index: 1;
  border-radius: 21px;
  padding: 30px 30px 26px;
  overflow: hidden;
  background: linear-gradient(180deg, #151519, #0e0e11 60%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 40px 80px -30px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.04);
}
.hb-vf1-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(260px circle at var(--hb-vf1-x) var(--hb-vf1-y), color-mix(in srgb, var(--hb-vf1-accent) 18%, transparent), transparent 70%);
  opacity: calc(.35 + var(--hb-vf1-glow) * .65);
  transition: opacity .4s;
}
.hb-vf1-body { position: relative; transform: translateZ(30px); }
.hb-vf1-mark { display: flex; align-items: center; gap: 10px; margin-bottom: 22px; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-vf1-logo { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; background: linear-gradient(140deg, color-mix(in srgb, var(--hb-vf1-accent) 85%, #fff), var(--hb-vf1-accent) 55%, color-mix(in srgb, var(--hb-vf1-accent) 50%, #000)); box-shadow: inset 0 1px 0 rgba(255,255,255,.45), 0 8px 20px -6px var(--hb-vf1-accent); }
.hb-vf1-title { margin: 0; font-size: 24px; line-height: 1.15; font-weight: 600; letter-spacing: -.025em; }
.hb-vf1-sub { margin: 8px 0 22px; color: #8f8f8f; font-size: 14px; line-height: 1.55; }
.hb-vf1-sub a { color: #ededed; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.25); }
.hb-vf1-sso { width: 100%; height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03); color: #ededed; font: inherit; font-size: 14px; font-weight: 500; cursor: pointer; transition: background .2s, border-color .2s, transform .2s cubic-bezier(.2,.8,.2,1); }
.hb-vf1-sso:hover { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.18); }
.hb-vf1-sso:active { transform: scale(.985); }
.hb-vf1-or { display: flex; align-items: center; gap: 12px; margin: 18px 0; color: #6b6b6b; font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; }
.hb-vf1-or::before, .hb-vf1-or::after { content: ""; flex: 1; height: 1px; background: rgba(255,255,255,.08); }
.hb-vf1-field { display: block; margin-bottom: 14px; }
.hb-vf1-label { display: flex; justify-content: space-between; margin-bottom: 7px; font-size: 12.5px; color: #a1a1a1; }
.hb-vf1-label a { color: #a1a1a1; text-decoration: none; transition: color .2s; }
.hb-vf1-label a:hover { color: #ededed; }
.hb-vf1-control { position: relative; }
.hb-vf1-input { width: 100%; height: 44px; padding: 0 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,.09); background: #0a0a0c; color: #ededed; font: inherit; font-size: 14px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-vf1-input::placeholder { color: #5a5a5f; }
.hb-vf1-input:focus { border-color: color-mix(in srgb, var(--hb-vf1-accent) 70%, #fff 0%); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vf1-accent) 18%, transparent); }
.hb-vf1-input[aria-invalid="true"] { border-color: #f05d5e; box-shadow: 0 0 0 4px rgba(240,93,94,.14); }
.hb-vf1-input[data-pad="true"] { padding-right: 64px; }
.hb-vf1-eye { position: absolute; right: 6px; top: 6px; height: 32px; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; color: #8f8f8f; font: inherit; font-size: 12px; cursor: pointer; transition: color .2s, background .2s; }
.hb-vf1-eye:hover { color: #ededed; background: rgba(255,255,255,.06); }
.hb-vf1-err { margin: 6px 0 0; color: #f58a8b; font-size: 12px; }
.hb-vf1-row { display: flex; align-items: center; justify-content: space-between; margin: 4px 0 20px; }
.hb-vf1-check { display: inline-flex; align-items: center; gap: 9px; color: #a1a1a1; font-size: 13px; cursor: pointer; user-select: none; }
.hb-vf1-check input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.hb-vf1-box { width: 17px; height: 17px; border-radius: 5px; border: 1px solid rgba(255,255,255,.18); display: grid; place-items: center; transition: background .2s, border-color .2s; }
.hb-vf1-box svg { opacity: 0; transform: scale(.6); transition: opacity .2s, transform .25s cubic-bezier(.3,1.6,.5,1); }
.hb-vf1-check input:checked + .hb-vf1-box { background: var(--hb-vf1-accent); border-color: var(--hb-vf1-accent); }
.hb-vf1-check input:checked + .hb-vf1-box svg { opacity: 1; transform: scale(1); }
.hb-vf1-check input:focus-visible + .hb-vf1-box { outline: 2px solid var(--hb-vf1-accent); outline-offset: 2px; }
.hb-vf1-submit { position: relative; width: 100%; height: 46px; border: 0; border-radius: 12px; overflow: hidden; font: inherit; font-size: 14.5px; font-weight: 600; color: #fff; cursor: pointer; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-vf1-accent) 88%, #fff), var(--hb-vf1-accent)); box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 12px 30px -12px var(--hb-vf1-accent); transition: transform .2s cubic-bezier(.2,.8,.2,1), filter .2s; }
.hb-vf1-submit:hover { filter: brightness(1.08); }
.hb-vf1-submit:active { transform: scale(.985); }
.hb-vf1-submit:disabled { cursor: progress; }
.hb-vf1-submit::after { content: ""; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.35) 50%, transparent 65%); transform: translateX(-100%); }
.hb-vf1-submit:hover::after { transform: translateX(100%); transition: transform .8s cubic-bezier(.2,.8,.2,1); }
.hb-vf1-spin { display: inline-block; width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; vertical-align: -3px; animation: hb-vf1-rot .7s linear infinite; }
.hb-vf1-alert { margin: 0 0 14px; padding: 10px 12px; border-radius: 10px; background: rgba(240,93,94,.1); border: 1px solid rgba(240,93,94,.25); color: #f8a5a6; font-size: 13px; }
.hb-vf1 :is(.hb-vf1-sso, .hb-vf1-submit, .hb-vf1-eye, .hb-vf1-sub a, .hb-vf1-label a, .hb-vf1-again):focus-visible { outline: 2px solid var(--hb-vf1-accent); outline-offset: 3px; }
.hb-vf1-done { display: grid; justify-items: center; text-align: center; padding: 26px 0 8px; animation: hb-vf1-in .6s cubic-bezier(.2,.8,.2,1) both; }
.hb-vf1-ring { width: 72px; height: 72px; border-radius: 50%; display: grid; place-items: center; margin-bottom: 18px; background: radial-gradient(circle, color-mix(in srgb, var(--hb-vf1-accent) 30%, transparent), transparent 70%); }
.hb-vf1-ring path { stroke-dasharray: 40; stroke-dashoffset: 40; animation: hb-vf1-draw .55s .2s cubic-bezier(.65,0,.35,1) forwards; }
.hb-vf1-ring circle { stroke-dasharray: 190; stroke-dashoffset: 190; animation: hb-vf1-draw .7s cubic-bezier(.65,0,.35,1) forwards; }
.hb-vf1-again { margin-top: 18px; border: 0; background: none; color: #8f8f8f; font: inherit; font-size: 13px; cursor: pointer; border-radius: 6px; }
.hb-vf1-again:hover { color: #ededed; }
.hb-vf1-foot { margin: 18px 0 0; text-align: center; color: #6b6b6b; font-size: 12px; }
@keyframes hb-vf1-spin { to { --hb-vf1-angle: 360deg; } }
@keyframes hb-vf1-rot { to { transform: rotate(360deg); } }
@keyframes hb-vf1-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-vf1-in { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vf1-tilt, .hb-vf1-tilt::before, .hb-vf1-done, .hb-vf1-spin, .hb-vf1-submit::after { animation: none !important; transition: none !important; transform: none !important; }
  .hb-vf1-ring path, .hb-vf1-ring circle { animation: none; stroke-dashoffset: 0; }
}
`;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function AuthTiltSpotlight({
  brand = "Northbeam",
  title = "Welcome back",
  subtitle = "Sign in to pick up where your team left off.",
  tilt = 9,
  defaultEmail = "",
  forgotHref = "#forgot",
  signup = { label: "Create an account", href: "#signup" },
  onSso,
  onSubmit,
  accent = "#7c5cff",
  className,
  style,
  ...rest
}: AuthTiltSpotlightProps) {
  const id = React.useId();
  const tiltRef = React.useRef<HTMLDivElement>(null);
  const [email, setEmail] = React.useState(defaultEmail);
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = React.useState<string | null>(null);

  const emailError = touched && !isEmail(email) ? "Enter a valid work email." : null;
  const passError = touched && password.length < 8 ? "Use at least 8 characters." : null;

  const reduce = React.useCallback(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--hb-vf1-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--hb-vf1-y", `${(py * 100).toFixed(1)}%`);
    el.style.setProperty("--hb-vf1-glow", "1");
    if (!reduce()) {
      el.style.setProperty("--hb-vf1-rx", `${((0.5 - py) * tilt).toFixed(2)}deg`);
      el.style.setProperty("--hb-vf1-ry", `${((px - 0.5) * tilt).toFixed(2)}deg`);
    }
    el.dataset.active = "true";
  };

  const onLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--hb-vf1-rx", "0deg");
    el.style.setProperty("--hb-vf1-ry", "0deg");
    el.style.setProperty("--hb-vf1-glow", "0");
    el.dataset.active = "false";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (!isEmail(email) || password.length < 8) return;
    setStatus("loading");
    try {
      const result = onSubmit
        ? await onSubmit({ email: email.trim(), password, remember })
        : await new Promise<boolean>((res) => setTimeout(() => res(true), 1100));
      if (result === false) {
        setStatus("idle");
        setError("That email and password do not match.");
        return;
      }
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  };

  return (
    <section className={["hb-vf1", className].filter(Boolean).join(" ")} style={{ "--hb-vf1-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-auth-tilt-spotlight" precedence="default">{css}</style>
      <div className="hb-vf1-stage">
        <div ref={tiltRef} className="hb-vf1-tilt" onPointerMove={onMove} onPointerLeave={onLeave}>
          <div className="hb-vf1-card">
            <div className="hb-vf1-body">
              <div className="hb-vf1-mark">
                <span className="hb-vf1-logo" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 12.5 8 3l5 9.5M5.4 8.5h5.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {brand}
              </div>
              {status === "success" ? (
                <div className="hb-vf1-done" role="status">
                  <div className="hb-vf1-ring">
                    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                      <circle cx="32" cy="32" r="29" stroke={accent} strokeWidth="2" />
                      <path d="M21 33l7.5 7.5L44 25" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="hb-vf1-title">You are in</h2>
                  <p className="hb-vf1-sub" style={{ margin: "8px 0 0" }}>Signed in as {email.trim()}. Loading your workspace.</p>
                  <button type="button" className="hb-vf1-again" onClick={() => { setStatus("idle"); setPassword(""); setTouched(false); }}>Use another account</button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h2 className="hb-vf1-title">{title}</h2>
                  <p className="hb-vf1-sub">
                    {subtitle}
                    {signup ? <> New here? <a href={signup.href}>{signup.label}</a></> : null}
                  </p>
                  <button type="button" className="hb-vf1-sso" onClick={() => onSso?.()}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2.5" y="7" width="11" height="7" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" /></svg>
                    Continue with single sign-on
                  </button>
                  <div className="hb-vf1-or">or with email</div>
                  {error ? <p className="hb-vf1-alert" role="alert">{error}</p> : null}
                  <div className="hb-vf1-field">
                    <label className="hb-vf1-label" htmlFor={`${id}-e`}><span>Work email</span></label>
                    <input id={`${id}-e`} className="hb-vf1-input" type="email" autoComplete="email" placeholder="maya@northbeam.io" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={emailError ? true : undefined} aria-describedby={emailError ? `${id}-ee` : undefined} />
                    {emailError ? <p id={`${id}-ee`} className="hb-vf1-err">{emailError}</p> : null}
                  </div>
                  <div className="hb-vf1-field">
                    <div className="hb-vf1-label"><label htmlFor={`${id}-p`}>Password</label><a href={forgotHref}>Forgot?</a></div>
                    <div className="hb-vf1-control">
                      <input id={`${id}-p`} className="hb-vf1-input" data-pad="true" type={show ? "text" : "password"} autoComplete="current-password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={passError ? true : undefined} aria-describedby={passError ? `${id}-pe` : undefined} />
                      <button type="button" className="hb-vf1-eye" onClick={() => setShow((s) => !s)} aria-pressed={show} aria-label={show ? "Hide password" : "Show password"}>{show ? "Hide" : "Show"}</button>
                    </div>
                    {passError ? <p id={`${id}-pe`} className="hb-vf1-err">{passError}</p> : null}
                  </div>
                  <div className="hb-vf1-row">
                    <label className="hb-vf1-check">
                      <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                      <span className="hb-vf1-box" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2 5 8.6l4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                      Keep me signed in
                    </label>
                  </div>
                  <button type="submit" className="hb-vf1-submit" disabled={status === "loading"} aria-busy={status === "loading"}>
                    {status === "loading" ? <><span className="hb-vf1-spin" aria-hidden="true" /> <span style={{ marginLeft: 8 }}>Signing in</span></> : "Sign in"}
                  </button>
                  <p className="hb-vf1-foot">Protected by device checks and rate limiting.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
