"use client";

import * as React from "react";

export interface AuthStatusRailValues {
  email: string;
  password: string;
  sso: boolean;
}

export interface AuthStatusRailProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: string;
  title?: string;
  subtitle?: string;
  region?: string;
  device?: string;
  ssoDomains?: string[];
  pings?: number[];
  defaultEmail?: string;
  forgotHref?: string;
  statusHref?: string;
  onSubmit?: (values: AuthStatusRailValues) => boolean | void | Promise<boolean | void>;
  accent?: string;
}

const css = `
.hb-vf7 {
  --hb-vf7-accent: #34d399;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  display: grid;
  place-items: center;
  padding: 48px 20px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
}
.hb-vf7 *, .hb-vf7 *::before, .hb-vf7 *::after { box-sizing: border-box; }
.hb-vf7 em { font-style: normal; }
.hb-vf7-shell { width: 100%; max-width: 820px; container-type: inline-size; }
.hb-vf7-card { display: grid; grid-template-columns: 1fr; border-radius: 20px; overflow: hidden; border: 1px solid #222; background: #0f0f0f; box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 40px 90px -40px rgba(0,0,0,.9); }
@container (min-width: 680px) { .hb-vf7-card { grid-template-columns: 1.1fr .9fr; } }
.hb-vf7-form { padding: 34px clamp(22px, 5cqw, 40px); }
.hb-vf7-brand { display: flex; align-items: center; gap: 9px; margin-bottom: 24px; font-weight: 600; font-size: 14px; }
.hb-vf7-brand i { width: 22px; height: 22px; border-radius: 6px; background: #ededed; display: grid; place-items: center; }
.hb-vf7-title { margin: 0; font-size: 25px; letter-spacing: -.03em; line-height: 1.15; font-weight: 600; }
.hb-vf7-sub { margin: 8px 0 24px; color: #8f8f8f; font-size: 14px; line-height: 1.55; }
.hb-vf7-label { display: flex; justify-content: space-between; margin-bottom: 7px; font-size: 12.5px; color: #a1a1a1; }
.hb-vf7-label a { color: #8f8f8f; text-decoration: none; }
.hb-vf7-label a:hover { color: #ededed; }
.hb-vf7-input { width: 100%; height: 44px; margin-bottom: 14px; padding: 0 14px; border-radius: 10px; border: 1px solid #262626; background: #0a0a0a; color: #ededed; font: inherit; font-size: 14px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-vf7-input:focus { border-color: var(--hb-vf7-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vf7-accent) 14%, transparent); }
.hb-vf7-input[aria-invalid="true"] { border-color: #ef5f5f; }
.hb-vf7-pw { display: grid; grid-template-rows: 1fr; transition: grid-template-rows .45s cubic-bezier(.2,.8,.2,1), opacity .3s; }
.hb-vf7-pw[data-hidden="true"] { grid-template-rows: 0fr; opacity: 0; }
.hb-vf7-pw > div { overflow: hidden; }
.hb-vf7-err { margin: -8px 0 12px; font-size: 12px; color: #f39494; }
.hb-vf7-btn { width: 100%; height: 46px; margin-top: 4px; border: 0; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; font: inherit; font-size: 14.5px; font-weight: 600; color: #0a0a0a; background: #ededed; cursor: pointer; transition: background .2s, transform .2s cubic-bezier(.2,.8,.2,1); }
.hb-vf7-btn:hover { background: #fff; }
.hb-vf7-btn:active { transform: scale(.985); }
.hb-vf7-btn:disabled { cursor: progress; }
.hb-vf7-btn[data-sso="true"] { background: var(--hb-vf7-accent); color: #04140d; }
.hb-vf7-spin { width: 15px; height: 15px; border-radius: 50%; border: 2px solid rgba(0,0,0,.2); border-top-color: currentColor; animation: hb-vf7-rot .7s linear infinite; }
.hb-vf7-alert { margin: 0 0 14px; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(239,95,95,.3); background: rgba(239,95,95,.08); color: #f6a3a3; font-size: 13px; }
.hb-vf7-ok { padding: 8px 0; animation: hb-vf7-in .5s cubic-bezier(.2,.8,.2,1) both; }
.hb-vf7-ok p { color: #8f8f8f; font-size: 14px; line-height: 1.55; margin: 8px 0 18px; }
.hb-vf7-link { border: 0; background: none; padding: 0; font: inherit; font-size: 13px; color: #ededed; cursor: pointer; border-bottom: 1px solid #444; }
.hb-vf7-rail { position: relative; padding: 28px 26px; border-top: 1px solid #1f1f1f; background: linear-gradient(180deg, #0c0c0c, #0a0a0a); }
@container (min-width: 680px) { .hb-vf7-rail { border-top: 0; border-left: 1px solid #1f1f1f; } }
.hb-vf7-rhead { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: #6b6b6b; }
.hb-vf7-rhead a { display: inline-flex; align-items: center; gap: 6px; color: #a1a1a1; text-decoration: none; letter-spacing: 0; text-transform: none; font-size: 12px; }
.hb-vf7-rhead a i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-vf7-accent); animation: hb-vf7-blink 2s ease-in-out infinite; }
.hb-vf7-list { list-style: none; margin: 0; padding: 0; position: relative; }
.hb-vf7-list::before { content: ""; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 1px; background: #232323; }
.hb-vf7-item { position: relative; display: grid; grid-template-columns: 15px 1fr; gap: 14px; padding-bottom: 18px; }
.hb-vf7-item:last-child { padding-bottom: 0; }
.hb-vf7-node { position: relative; z-index: 1; width: 15px; height: 15px; margin-top: 2px; border-radius: 50%; border: 1.5px solid #333; background: #0b0b0b; transition: border-color .4s, background .4s, box-shadow .4s; }
.hb-vf7-item[data-s="ok"] .hb-vf7-node { border-color: var(--hb-vf7-accent); background: color-mix(in srgb, var(--hb-vf7-accent) 25%, #0b0b0b); box-shadow: 0 0 12px -2px var(--hb-vf7-accent); }
.hb-vf7-item[data-s="live"] .hb-vf7-node { border-color: var(--hb-vf7-accent); }
.hb-vf7-item[data-s="live"] .hb-vf7-node::after { content: ""; position: absolute; inset: -5px; border-radius: 50%; border: 1px solid var(--hb-vf7-accent); animation: hb-vf7-pulse 1.8s cubic-bezier(.2,.7,.2,1) infinite; }
.hb-vf7-item[data-s="warn"] .hb-vf7-node { border-color: #f5a524; background: rgba(245,165,36,.2); }
.hb-vf7-item[data-s="busy"] .hb-vf7-node { border-color: var(--hb-vf7-accent); border-top-color: transparent; animation: hb-vf7-rot .8s linear infinite; }
.hb-vf7-name { font-size: 13px; font-weight: 500; color: #ededed; display: flex; justify-content: space-between; gap: 10px; }
.hb-vf7-name em { color: #6b6b6b; font-size: 11px; font-family: var(--font-mono), ui-monospace, monospace; font-weight: 400; }
.hb-vf7-val { margin-top: 3px; font-size: 12.5px; color: #8f8f8f; line-height: 1.45; animation: hb-vf7-in .35s cubic-bezier(.2,.8,.2,1) both; }
.hb-vf7-item[data-s="ok"] .hb-vf7-val b { color: var(--hb-vf7-accent); font-weight: 500; }
.hb-vf7-item[data-s="warn"] .hb-vf7-val b { color: #f5a524; font-weight: 500; }
.hb-vf7-spark { display: block; width: 100%; height: 26px; margin-top: 8px; overflow: visible; }
.hb-vf7-spark path { fill: none; stroke: var(--hb-vf7-accent); stroke-width: 1.5; stroke-linejoin: round; transition: d .5s; }
.hb-vf7 :is(.hb-vf7-btn, .hb-vf7-link, .hb-vf7-label a, .hb-vf7-rhead a):focus-visible { outline: 2px solid var(--hb-vf7-accent); outline-offset: 3px; border-radius: 6px; }
@keyframes hb-vf7-rot { to { transform: rotate(360deg); } }
@keyframes hb-vf7-pulse { 0% { opacity: .9; transform: scale(.6); } 100% { opacity: 0; transform: scale(1.4); } }
@keyframes hb-vf7-blink { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
@keyframes hb-vf7-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vf7 *, .hb-vf7 *::before, .hb-vf7 *::after { animation: none !important; transition: none !important; }
}
`;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function AuthStatusRail({
  brand = "Relaybase",
  title = "Sign in to Relaybase",
  subtitle = "Every step of your sign-in is checked in the open. Watch the rail as you go.",
  region = "fra1 Frankfurt",
  device = "MacBook Pro, Lisbon",
  ssoDomains = ["acme.com", "globex.io"],
  pings = [23, 21, 26, 22, 24, 31, 22, 20, 23, 25, 21, 22],
  defaultEmail = "",
  forgotHref = "#forgot",
  statusHref = "#status",
  onSubmit,
  accent = "#34d399",
  className,
  style,
  ...rest
}: AuthStatusRailProps) {
  const id = React.useId();
  const [email, setEmail] = React.useState(defaultEmail);
  const [password, setPassword] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setTick((n) => n + 1), 1600);
    return () => window.clearInterval(t);
  }, []);

  const emailOk = isEmail(email);
  const domain = emailOk ? email.trim().split("@")[1].toLowerCase() : "";
  const sso = emailOk && ssoDomains.includes(domain);
  const passOk = password.length >= 8;

  const n = pings.length;
  const series = Array.from({ length: n }, (_, i) => pings[(i + tick) % n]);
  const latest = series[n - 1];
  const max = Math.max(...series) + 4;
  const min = Math.min(...series) - 4;
  const pts = series.map((v, i) => [(i / (n - 1)) * 100, 24 - ((v - min) / (max - min)) * 22] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (!emailOk || (!sso && !passOk)) return;
    setStatus("loading");
    try {
      const r = onSubmit ? await onSubmit({ email: email.trim(), password, sso }) : await new Promise<boolean>((res) => setTimeout(() => res(true), 1300));
      if (r === false) {
        setStatus("idle");
        setError("Those credentials were rejected.");
        return;
      }
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  };

  const rail = [
    { name: "Edge region", meta: `${latest} ms`, s: "live", val: <><b>Connected</b> to {region}</>, spark: true },
    {
      name: "Workspace",
      meta: domain || "pending",
      s: !emailOk ? "idle" : sso ? "warn" : "ok",
      val: !emailOk ? "Waiting for your email" : sso ? <><b>SAML single sign-on</b> is required for {domain}</> : <><b>Password sign-in</b> allowed for {domain}</>,
    },
    {
      name: "Credentials",
      meta: sso ? "SSO" : passOk ? "policy ok" : `${password.length}/8`,
      s: sso ? "ok" : passOk ? "ok" : password ? "live" : "idle",
      val: sso ? <><b>Handled by your identity provider</b></> : passOk ? <><b>Meets policy</b>, checked locally</> : password ? "Keep typing, 8 characters minimum" : "Not entered yet",
    },
    { name: "Device", meta: "trusted", s: "ok", val: <><b>Recognized</b> {device}</> },
    {
      name: "Session",
      meta: status === "success" ? "12h" : "",
      s: status === "loading" ? "busy" : status === "success" ? "ok" : "idle",
      val: status === "loading" ? "Issuing an encrypted session token" : status === "success" ? <><b>Session issued</b>, expires in 12 hours</> : "Starts when you sign in",
    },
  ];

  return (
    <section className={["hb-vf7", className].filter(Boolean).join(" ")} style={{ "--hb-vf7-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-auth-status-rail" precedence="default">{css}</style>
      <div className="hb-vf7-shell">
        <div className="hb-vf7-card">
          <div className="hb-vf7-form">
            <div className="hb-vf7-brand">
              <i aria-hidden="true"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9V3l4 3 4-3v6" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></i>
              {brand}
            </div>
            {status === "success" ? (
              <div className="hb-vf7-ok" role="status">
                <h2 className="hb-vf7-title">You are signed in</h2>
                <p>Welcome back. {sso ? "Your identity provider confirmed it is you." : "All five checks passed."} Redirecting to your dashboard.</p>
                <button type="button" className="hb-vf7-link" onClick={() => { setStatus("idle"); setPassword(""); setTouched(false); }}>Not you? Sign out</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 className="hb-vf7-title">{title}</h2>
                <p className="hb-vf7-sub">{subtitle}</p>
                {error ? <p className="hb-vf7-alert" role="alert">{error}</p> : null}
                <label className="hb-vf7-label" htmlFor={`${id}-e`}>Work email</label>
                <input id={`${id}-e`} className="hb-vf7-input" type="email" autoComplete="email" placeholder="jordan@company.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={touched && !emailOk ? true : undefined} />
                {touched && !emailOk ? <p className="hb-vf7-err" role="alert">Enter your work email.</p> : null}
                <div className="hb-vf7-pw" data-hidden={sso}>
                  <div>
                    <div className="hb-vf7-label"><label htmlFor={`${id}-p`}>Password</label><a href={forgotHref} tabIndex={sso ? -1 : 0}>Forgot?</a></div>
                    <input id={`${id}-p`} className="hb-vf7-input" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} tabIndex={sso ? -1 : 0} aria-invalid={touched && !sso && !passOk ? true : undefined} />
                    {touched && !sso && !passOk ? <p className="hb-vf7-err" role="alert">At least 8 characters.</p> : null}
                  </div>
                </div>
                <button type="submit" className="hb-vf7-btn" data-sso={sso} disabled={status === "loading"} aria-busy={status === "loading"}>
                  {status === "loading" ? <><span className="hb-vf7-spin" aria-hidden="true" />Checking</> : sso ? `Continue with ${domain} SSO` : "Sign in"}
                </button>
              </form>
            )}
          </div>
          <aside className="hb-vf7-rail" aria-label="Sign-in status">
            <div className="hb-vf7-rhead">
              <span>Live status</span>
              <a href={statusHref}><i aria-hidden="true" />All systems normal</a>
            </div>
            <ol className="hb-vf7-list">
              {rail.map((r) => (
                <li key={r.name} className="hb-vf7-item" data-s={r.s}>
                  <span className="hb-vf7-node" aria-hidden="true" />
                  <div>
                    <div className="hb-vf7-name">{r.name}<em>{r.meta}</em></div>
                    <div key={r.s} className="hb-vf7-val">{r.val}</div>
                    {r.spark ? (
                      <svg className="hb-vf7-spark" viewBox="0 0 100 26" preserveAspectRatio="none" aria-hidden="true">
                        <path d={d} vectorEffect="non-scaling-stroke" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
