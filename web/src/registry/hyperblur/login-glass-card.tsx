"use client";

import * as React from "react";

export interface LoginGlassCardLink {
  label: string;
  href: string;
}

export interface LoginGlassCardProvider {
  id: string;
  label: string;
}

export interface LoginGlassCardValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginGlassCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: string;
  title?: string;
  subtitle?: string;
  providers?: LoginGlassCardProvider[];
  defaultEmail?: string;
  forgot?: LoginGlassCardLink;
  signup?: LoginGlassCardLink;
  submitLabel?: string;
  successMessage?: string;
  onSubmit?: (values: LoginGlassCardValues) => boolean | void | Promise<boolean | void>;
  onProviderClick?: (id: string) => void;
  accent?: string;
}

const css = `
.hb-qh1 {
  --hb-qh1-accent: #8b5cf6;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #07070b;
  color: #ededed;
  font-family: inherit;
  padding: clamp(64px, 10cqw, 120px) 20px;
}
.hb-qh1 *, .hb-qh1 *::before, .hb-qh1 *::after { box-sizing: border-box; }
.hb-qh1-mesh { position: absolute; inset: -20%; z-index: -2; filter: blur(60px); opacity: .9; }
.hb-qh1-blob { position: absolute; border-radius: 50%; mix-blend-mode: screen; }
.hb-qh1-blob-a { width: 52%; height: 60%; left: 8%; top: 6%; background: radial-gradient(circle, var(--hb-qh1-accent), transparent 68%); animation: hb-qh1-drift-a 18s ease-in-out infinite alternate; }
.hb-qh1-blob-b { width: 46%; height: 56%; right: 6%; top: 18%; background: radial-gradient(circle, #2f7bff, transparent 66%); opacity: .75; animation: hb-qh1-drift-b 22s ease-in-out infinite alternate; }
.hb-qh1-blob-c { width: 44%; height: 50%; left: 30%; bottom: 0; background: radial-gradient(circle, #ec4899, transparent 66%); opacity: .5; animation: hb-qh1-drift-c 26s ease-in-out infinite alternate; }
.hb-qh1-veil { position: absolute; inset: 0; z-index: -1; background: radial-gradient(ellipse 70% 60% at 50% 45%, transparent, rgba(7,7,11,.72) 80%), linear-gradient(to bottom, rgba(7,7,11,.2), rgba(7,7,11,.6)); }
.hb-qh1-orb { position: absolute; z-index: -1; border-radius: 50%; background: radial-gradient(circle at 32% 28%, rgba(255,255,255,.9), rgba(255,255,255,.18) 30%, color-mix(in srgb, var(--hb-qh1-accent) 40%, transparent) 62%, transparent 72%); box-shadow: inset 0 0 12px rgba(255,255,255,.18); animation: hb-qh1-float var(--hb-qh1-d, 12s) ease-in-out var(--hb-qh1-delay, 0s) infinite alternate; }
.hb-qh1-inner { position: relative; max-width: 1120px; margin: 0 auto; display: grid; place-items: center; }
.hb-qh1-card {
  position: relative;
  width: 100%;
  max-width: 420px;
  padding: 32px 30px 26px;
  border-radius: 22px;
  background: linear-gradient(160deg, rgba(255,255,255,.11), rgba(255,255,255,.04));
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 30px 80px -20px rgba(0,0,0,.6), 0 0 0 1px rgba(0,0,0,.2);
  backdrop-filter: blur(22px) saturate(150%);
  -webkit-backdrop-filter: blur(22px) saturate(150%);
  animation: hb-qh1-rise .8s cubic-bezier(.2,.7,.2,1) both;
}
.hb-qh1-card::before { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; background: linear-gradient(120deg, rgba(255,255,255,.14), transparent 30%); mask: linear-gradient(#000, transparent 50%); }
.hb-qh1-mark { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 12px; margin-bottom: 18px; background: linear-gradient(140deg, var(--hb-qh1-accent), color-mix(in srgb, var(--hb-qh1-accent) 40%, #0a0a0a)); box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 8px 24px -6px var(--hb-qh1-accent); }
.hb-qh1-title { margin: 0; font-size: 26px; line-height: 1.15; letter-spacing: -.02em; font-weight: 600; }
.hb-qh1-sub { margin: 8px 0 22px; color: rgba(237,237,237,.66); font-size: 14px; line-height: 1.5; }
.hb-qh1-social { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.hb-qh1-prov { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 40px; border-radius: 11px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.05); color: #ededed; font: inherit; font-size: 13px; cursor: pointer; transition: background .2s, border-color .2s, transform .2s; }
.hb-qh1-prov:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.22); transform: translateY(-1px); }
.hb-qh1-prov:focus-visible, .hb-qh1-btn:focus-visible, .hb-qh1-link:focus-visible, .hb-qh1-eye:focus-visible { outline: 2px solid var(--hb-qh1-accent); outline-offset: 2px; }
.hb-qh1-prov span { display: none; }
.hb-qh1-div { display: flex; align-items: center; gap: 12px; margin: 20px 0; color: rgba(237,237,237,.45); font-size: 12px; }
.hb-qh1-div::before, .hb-qh1-div::after { content: ""; flex: 1; height: 1px; background: rgba(255,255,255,.12); }
.hb-qh1-form { display: grid; gap: 14px; }
.hb-qh1-field { display: grid; gap: 6px; }
.hb-qh1-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hb-qh1-label { font-size: 13px; color: rgba(237,237,237,.8); font-weight: 500; }
.hb-qh1-wrap { position: relative; }
.hb-qh1-input { width: 100%; height: 44px; padding: 0 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,.14); background: rgba(10,10,14,.45); color: #ededed; font: inherit; font-size: 14px; outline: none; transition: border-color .2s, box-shadow .2s, background .2s; }
.hb-qh1-input::placeholder { color: rgba(237,237,237,.35); }
.hb-qh1-input:focus { border-color: color-mix(in srgb, var(--hb-qh1-accent) 80%, white); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-qh1-accent) 25%, transparent); background: rgba(10,10,14,.6); }
.hb-qh1-input[aria-invalid="true"] { border-color: #f87171; box-shadow: 0 0 0 4px rgba(248,113,113,.15); }
.hb-qh1-pw { padding-right: 46px; }
.hb-qh1-eye { position: absolute; right: 6px; top: 6px; width: 32px; height: 32px; display: grid; place-items: center; border: 0; border-radius: 8px; background: transparent; color: rgba(237,237,237,.6); cursor: pointer; }
.hb-qh1-eye:hover { color: #fff; background: rgba(255,255,255,.08); }
.hb-qh1-err { margin: 0; font-size: 12px; color: #fca5a5; }
.hb-qh1-check { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(237,237,237,.72); cursor: pointer; }
.hb-qh1-check input { width: 16px; height: 16px; margin: 0; accent-color: var(--hb-qh1-accent); }
.hb-qh1-link { color: color-mix(in srgb, var(--hb-qh1-accent) 55%, white); font-size: 13px; text-decoration: none; border-radius: 4px; }
.hb-qh1-link:hover { text-decoration: underline; }
.hb-qh1-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 10px; height: 46px; margin-top: 4px; border: 0; border-radius: 12px; font: inherit; font-size: 14px; font-weight: 600; color: #fff; cursor: pointer; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-qh1-accent) 85%, white), var(--hb-qh1-accent)); box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 10px 30px -10px var(--hb-qh1-accent); transition: transform .2s, filter .2s; overflow: hidden; }
.hb-qh1-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.hb-qh1-btn:disabled { cursor: progress; filter: saturate(.8); transform: none; }
.hb-qh1-btn::after { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,.3) 50%, transparent 70%); transform: translateX(-100%); transition: transform .7s; }
.hb-qh1-btn:hover::after { transform: translateX(100%); }
.hb-qh1-spin { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: hb-qh1-turn .7s linear infinite; }
.hb-qh1-alert { margin: 0; padding: 10px 12px; border-radius: 10px; font-size: 13px; background: rgba(248,113,113,.12); border: 1px solid rgba(248,113,113,.3); color: #fecaca; }
.hb-qh1-foot { margin: 20px 0 0; text-align: center; font-size: 13px; color: rgba(237,237,237,.6); }
.hb-qh1-done { display: grid; justify-items: center; text-align: center; gap: 10px; padding: 18px 0 6px; animation: hb-qh1-rise .5s ease both; }
.hb-qh1-ok { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: color-mix(in srgb, var(--hb-qh1-accent) 22%, transparent); border: 1px solid color-mix(in srgb, var(--hb-qh1-accent) 50%, transparent); }
.hb-qh1-ok path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-qh1-draw .5s .15s ease forwards; }
@container (min-width: 420px) { .hb-qh1-prov span { display: inline; } }
@keyframes hb-qh1-drift-a { to { transform: translate(18%, 12%) scale(1.15); } }
@keyframes hb-qh1-drift-b { to { transform: translate(-22%, 10%) scale(.9); } }
@keyframes hb-qh1-drift-c { to { transform: translate(10%, -18%) scale(1.2); } }
@keyframes hb-qh1-float { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(var(--hb-qh1-x, 10px), var(--hb-qh1-y, -30px), 0); } }
@keyframes hb-qh1-rise { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes hb-qh1-turn { to { transform: rotate(360deg); } }
@keyframes hb-qh1-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-qh1 *, .hb-qh1 *::before, .hb-qh1 *::after { animation: none !important; transition: none !important; }
  .hb-qh1-ok path { stroke-dashoffset: 0; }
}
`;

function hash(n: number) {
  let x = (n + 1) * 2654435761;
  x = (x ^ (x >>> 15)) >>> 0;
  x = Math.imul(x, 2246822519) >>> 0;
  return ((x ^ (x >>> 13)) >>> 0) / 4294967295;
}

const orbs = Array.from({ length: 7 }, (_, i) => {
  const size = 18 + Math.round(hash(i) * 46);
  return {
    size,
    left: (6 + hash(i + 11) * 88).toFixed(2),
    top: (8 + hash(i + 23) * 80).toFixed(2),
    d: (9 + hash(i + 31) * 9).toFixed(2),
    delay: (-hash(i + 41) * 8).toFixed(2),
    x: (-30 + hash(i + 51) * 60).toFixed(1),
    y: (-50 + hash(i + 61) * 30).toFixed(1),
  };
});

function Glyph({ id }: { id: string }) {
  if (id === "code") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5.5 4.5 2 8l3.5 3.5M10.5 4.5 14 8l-3.5 3.5" />
      </svg>
    );
  }
  if (id === "device") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4.5" y="1.8" width="7" height="12.4" rx="1.8" />
        <path d="M7 12h2" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 1.8 13 3.7v4c0 3-2 5.2-5 6.5-3-1.3-5-3.5-5-6.5v-4L8 1.8Z" />
      <path d="m5.8 8 1.7 1.7L10.4 6.6" />
    </svg>
  );
}

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise<unknown>((resolve) => setTimeout(() => resolve(result), 900));
}

export function LoginGlassCard({
  brand = "Lumen",
  title = "Welcome back",
  subtitle = "Sign in to pick up where your team left off.",
  providers = [
    { id: "sso", label: "Single sign-on" },
    { id: "code", label: "Code host" },
    { id: "device", label: "This device" },
  ],
  defaultEmail = "",
  forgot = { label: "Forgot password?", href: "#forgot" },
  signup = { label: "Create an account", href: "#signup" },
  submitLabel = "Sign in",
  successMessage = "Signed in. Redirecting to your workspace.",
  onSubmit,
  onProviderClick,
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: LoginGlassCardProps) {
  const uid = React.useId();
  const [email, setEmail] = React.useState(defaultEmail);
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "error" | "success">("idle");

  function validate() {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "That email doesn't look right.";
    if (!password) next.password = "Enter your password.";
    else if (password.length < 8) next.password = "Passwords are at least 8 characters.";
    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const next = validate();
    setErrors(next);
    if (next.email || next.password) return;
    setStatus("loading");
    try {
      const result = await wait(onSubmit ? onSubmit({ email: email.trim(), password, remember }) : true);
      setStatus(result === false ? "error" : "success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={`hb-qh1 ${className}`} style={{ "--hb-qh1-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-login-glass-card" precedence="default">{css}</style>
      <div className="hb-qh1-mesh" aria-hidden="true">
        <div className="hb-qh1-blob hb-qh1-blob-a" />
        <div className="hb-qh1-blob hb-qh1-blob-b" />
        <div className="hb-qh1-blob hb-qh1-blob-c" />
      </div>
      <div className="hb-qh1-veil" aria-hidden="true" />
      {orbs.map((o, i) => (
        <span
          key={i}
          className="hb-qh1-orb"
          aria-hidden="true"
          style={{ width: o.size, height: o.size, left: `${o.left}%`, top: `${o.top}%`, "--hb-qh1-d": `${o.d}s`, "--hb-qh1-delay": `${o.delay}s`, "--hb-qh1-x": `${o.x}px`, "--hb-qh1-y": `${o.y}px` } as React.CSSProperties}
        />
      ))}
      <div className="hb-qh1-inner">
        <div className="hb-qh1-card">
          <div className="hb-qh1-mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M10 2 17 6v8l-7 4-7-4V6l7-4Z" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx="10" cy="10" r="2.6" fill="#fff" />
            </svg>
          </div>
          {status === "success" ? (
            <div className="hb-qh1-done" role="status">
              <div className="hb-qh1-ok">
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 12.5 4 4 8-9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="hb-qh1-title">Welcome to {brand}</h2>
              <p className="hb-qh1-sub" style={{ margin: 0 }}>{successMessage}</p>
            </div>
          ) : (
            <>
              <h2 className="hb-qh1-title">{title}</h2>
              <p className="hb-qh1-sub">{subtitle}</p>
              {providers.length > 0 && (
                <>
                  <div className="hb-qh1-social">
                    {providers.map((p) => (
                      <button key={p.id} type="button" className="hb-qh1-prov" aria-label={`Continue with ${p.label}`} onClick={() => onProviderClick?.(p.id)}>
                        <Glyph id={p.id} />
                        <span>{p.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="hb-qh1-div">or with email</div>
                </>
              )}
              <form className="hb-qh1-form" noValidate onSubmit={handleSubmit}>
                {status === "error" && (
                  <p className="hb-qh1-alert" role="alert">That email and password don&apos;t match an account.</p>
                )}
                <div className="hb-qh1-field">
                  <label className="hb-qh1-label" htmlFor={`${uid}-email`}>Email</label>
                  <input
                    id={`${uid}-email`}
                    className="hb-qh1-input"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((s) => ({ ...s, email: undefined }));
                    }}
                  />
                  {errors.email && <p className="hb-qh1-err" id={`${uid}-email-err`}>{errors.email}</p>}
                </div>
                <div className="hb-qh1-field">
                  <div className="hb-qh1-row">
                    <label className="hb-qh1-label" htmlFor={`${uid}-pw`}>Password</label>
                    <a className="hb-qh1-link" href={forgot.href}>{forgot.label}</a>
                  </div>
                  <div className="hb-qh1-wrap">
                    <input
                      id={`${uid}-pw`}
                      className="hb-qh1-input hb-qh1-pw"
                      type={show ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      aria-invalid={errors.password ? true : undefined}
                      aria-describedby={errors.password ? `${uid}-pw-err` : undefined}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((s) => ({ ...s, password: undefined }));
                      }}
                    />
                    <button type="button" className="hb-qh1-eye" aria-label={show ? "Hide password" : "Show password"} aria-pressed={show} onClick={() => setShow((s) => !s)}>
                      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
                        <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
                        {show && <path d="M2.5 13.5 13.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />}
                      </svg>
                    </button>
                  </div>
                  {errors.password && <p className="hb-qh1-err" id={`${uid}-pw-err`}>{errors.password}</p>}
                </div>
                <label className="hb-qh1-check">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  Keep me signed in for 30 days
                </label>
                <button type="submit" className="hb-qh1-btn" disabled={status === "loading"} aria-busy={status === "loading"}>
                  {status === "loading" && <span className="hb-qh1-spin" aria-hidden="true" />}
                  {status === "loading" ? "Signing in" : submitLabel}
                </button>
              </form>
              <p className="hb-qh1-foot">
                New to {brand}? <a className="hb-qh1-link" href={signup.href}>{signup.label}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
