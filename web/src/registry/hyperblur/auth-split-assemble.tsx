"use client";

import * as React from "react";

export interface AuthSplitAssembleValues {
  email: string;
  password: string;
}

export interface AuthSplitAssembleProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: string;
  title?: string;
  subtitle?: string;
  captions?: [string, string, string, string];
  defaultEmail?: string;
  forgotHref?: string;
  signup?: { label: string; href: string } | null;
  onSubmit?: (values: AuthSplitAssembleValues) => boolean | void | Promise<boolean | void>;
  accent?: string;
}

const css = `
.hb-vf2 {
  --hb-vf2-accent: #38bdf8;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
}
.hb-vf2 *, .hb-vf2 *::before, .hb-vf2 *::after { box-sizing: border-box; }
.hb-vf2-grid { display: grid; grid-template-columns: 1fr; min-height: 600px; }
@container (min-width: 760px) { .hb-vf2-grid { grid-template-columns: 1.05fr 1fr; } }
.hb-vf2-art {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  padding: 36px 24px 28px;
  min-height: 320px;
  background: radial-gradient(ellipse 70% 60% at 50% 58%, color-mix(in srgb, var(--hb-vf2-accent) 16%, transparent), transparent 70%), linear-gradient(180deg, #0d1117, #0a0c10);
  border-bottom: 1px solid #1f1f1f;
}
@container (min-width: 760px) { .hb-vf2-art { border-bottom: 0; border-right: 1px solid #1f1f1f; } }
.hb-vf2-art::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 36px 36px;
  mask: radial-gradient(ellipse 60% 55% at 50% 55%, #000, transparent 80%);
}
.hb-vf2-top { position: absolute; left: 28px; right: 28px; top: 26px; display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: #a1a1a1; }
.hb-vf2-brand { display: inline-flex; align-items: center; gap: 9px; color: #ededed; font-weight: 600; font-size: 14px; }
.hb-vf2-svg { position: relative; width: min(100%, 400px); height: auto; overflow: visible; }
.hb-vf2-slab { transition: transform .9s cubic-bezier(.34,1.35,.5,1); }
.hb-vf2-bob { animation: hb-vf2-bob 5s cubic-bezier(.45,0,.55,1) infinite; }
.hb-vf2-slab[data-s="1"] .hb-vf2-bob { animation-delay: -1.6s; }
.hb-vf2-slab[data-s="2"] .hb-vf2-bob { animation-delay: -3.2s; }
.hb-vf2-slab[data-locked="true"] .hb-vf2-bob { animation-play-state: paused; }
.hb-vf2-face-t { fill: #1b2230; stroke: rgba(255,255,255,.12); stroke-width: 1; transition: fill .6s, stroke .6s; }
.hb-vf2-face-l { fill: #121823; transition: fill .6s; }
.hb-vf2-face-r { fill: #0d121a; transition: fill .6s; }
.hb-vf2-inner { fill: none; stroke: rgba(255,255,255,.08); stroke-dasharray: 3 4; transition: stroke .6s; }
.hb-vf2-slab[data-locked="true"] .hb-vf2-face-t { fill: color-mix(in srgb, var(--hb-vf2-accent) 22%, #1b2230); stroke: color-mix(in srgb, var(--hb-vf2-accent) 70%, transparent); }
.hb-vf2-slab[data-locked="true"] .hb-vf2-face-l { fill: color-mix(in srgb, var(--hb-vf2-accent) 14%, #121823); }
.hb-vf2-slab[data-locked="true"] .hb-vf2-inner { stroke: color-mix(in srgb, var(--hb-vf2-accent) 60%, transparent); }
.hb-vf2-edge { fill: none; stroke: var(--hb-vf2-accent); stroke-width: 1.4; stroke-dasharray: 260; stroke-dashoffset: 260; transition: stroke-dashoffset 1s cubic-bezier(.65,0,.35,1) .2s; }
.hb-vf2-slab[data-locked="true"] .hb-vf2-edge { stroke-dashoffset: 0; }
.hb-vf2-emblem { opacity: .25; transition: opacity .6s, filter .6s; }
.hb-vf2[data-step="3"] .hb-vf2-emblem { opacity: 1; filter: drop-shadow(0 0 8px var(--hb-vf2-accent)); }
.hb-vf2-shadow { fill: rgba(0,0,0,.55); transition: transform .9s cubic-bezier(.34,1.35,.5,1), opacity .9s; transform-origin: 200px 340px; }
.hb-vf2-mote { fill: var(--hb-vf2-accent); opacity: 0; animation: hb-vf2-rise 6s cubic-bezier(.3,0,.6,1) infinite; }
.hb-vf2-beam { opacity: 0; transition: opacity .8s .4s; }
.hb-vf2[data-step="3"] .hb-vf2-beam { opacity: 1; }
.hb-vf2-steps { position: relative; display: flex; gap: 6px; justify-content: center; margin-top: 6px; }
.hb-vf2-pip { width: 26px; height: 3px; border-radius: 3px; background: rgba(255,255,255,.12); transition: background .5s, width .5s cubic-bezier(.2,.8,.2,1); }
.hb-vf2-pip[data-on="true"] { background: var(--hb-vf2-accent); width: 40px; }
.hb-vf2-cap { position: relative; margin: 14px 0 0; text-align: center; font-size: 13px; color: #a1a1a1; min-height: 20px; }
.hb-vf2-cap b { color: #ededed; font-weight: 600; }
.hb-vf2-artin { position: relative; display: grid; justify-items: center; width: 100%; padding-top: 30px; }
.hb-vf2-form { display: grid; align-content: center; padding: 48px clamp(24px, 6cqw, 72px); }
.hb-vf2-inner-form { width: 100%; max-width: 360px; margin: 0 auto; }
.hb-vf2-title { margin: 0; font-size: 28px; letter-spacing: -.03em; line-height: 1.1; font-weight: 600; }
.hb-vf2-sub { margin: 10px 0 28px; color: #8f8f8f; font-size: 14.5px; line-height: 1.55; }
.hb-vf2-field { position: relative; margin-bottom: 16px; }
.hb-vf2-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 13px; color: #a1a1a1; }
.hb-vf2-label a { color: #8f8f8f; text-decoration: none; }
.hb-vf2-label a:hover { color: #ededed; }
.hb-vf2-wrap { position: relative; }
.hb-vf2-input { width: 100%; height: 46px; padding: 0 42px 0 14px; border-radius: 11px; border: 1px solid #262626; background: #101010; color: #ededed; font: inherit; font-size: 14.5px; outline: none; transition: border-color .2s, box-shadow .2s, background .2s; }
.hb-vf2-input::placeholder { color: #585858; }
.hb-vf2-input:focus { border-color: var(--hb-vf2-accent); background: #121212; box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vf2-accent) 16%, transparent); }
.hb-vf2-input[aria-invalid="true"] { border-color: #ef5f5f; }
.hb-vf2-ok { position: absolute; right: 12px; top: 50%; width: 20px; height: 20px; margin-top: -10px; border-radius: 50%; display: grid; place-items: center; background: var(--hb-vf2-accent); color: #04111a; transform: scale(0); transition: transform .4s cubic-bezier(.3,1.6,.5,1); }
.hb-vf2-ok[data-on="true"] { transform: scale(1); }
.hb-vf2-err { margin: 6px 0 0; font-size: 12px; color: #f28b8b; }
.hb-vf2-meter { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-top: 8px; }
.hb-vf2-meter span { height: 3px; border-radius: 2px; background: #1f1f1f; transition: background .3s; }
.hb-vf2-meter span[data-on="true"] { background: var(--hb-vf2-accent); }
.hb-vf2-btn { width: 100%; height: 48px; margin-top: 10px; border: 0; border-radius: 11px; font: inherit; font-weight: 600; font-size: 14.5px; color: #04111a; background: var(--hb-vf2-accent); cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,.4), 0 14px 30px -14px var(--hb-vf2-accent); transition: filter .2s, transform .2s cubic-bezier(.2,.8,.2,1); display: inline-flex; align-items: center; justify-content: center; gap: 10px; }
.hb-vf2-btn:hover { filter: brightness(1.07); }
.hb-vf2-btn:active { transform: scale(.985); }
.hb-vf2-btn:disabled { cursor: progress; }
.hb-vf2-spin { width: 15px; height: 15px; border-radius: 50%; border: 2px solid rgba(4,17,26,.3); border-top-color: #04111a; animation: hb-vf2-rot .7s linear infinite; }
.hb-vf2-alert { margin: 0 0 16px; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(239,95,95,.3); background: rgba(239,95,95,.08); color: #f6a3a3; font-size: 13px; }
.hb-vf2-foot { margin: 22px 0 0; font-size: 13px; color: #8f8f8f; text-align: center; }
.hb-vf2-foot a, .hb-vf2-link { color: #ededed; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.25); }
.hb-vf2-link { background: none; border-top: 0; border-left: 0; border-right: 0; padding: 0; font: inherit; cursor: pointer; }
.hb-vf2 :is(.hb-vf2-btn, .hb-vf2-link, .hb-vf2-foot a, .hb-vf2-label a):focus-visible { outline: 2px solid var(--hb-vf2-accent); outline-offset: 3px; border-radius: 4px; }
.hb-vf2-done { animation: hb-vf2-in .6s cubic-bezier(.2,.8,.2,1) both; }
.hb-vf2-badge { display: inline-flex; align-items: center; gap: 8px; height: 28px; padding: 0 12px; border-radius: 999px; font-size: 12px; color: var(--hb-vf2-accent); background: color-mix(in srgb, var(--hb-vf2-accent) 12%, transparent); border: 1px solid color-mix(in srgb, var(--hb-vf2-accent) 30%, transparent); margin-bottom: 16px; }
@keyframes hb-vf2-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes hb-vf2-rise { 0% { opacity: 0; transform: translateY(0); } 20% { opacity: .8; } 100% { opacity: 0; transform: translateY(-120px); } }
@keyframes hb-vf2-rot { to { transform: rotate(360deg); } }
@keyframes hb-vf2-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vf2 *, .hb-vf2 *::before { animation: none !important; transition: none !important; }
  .hb-vf2-mote { opacity: 0; }
}
`;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

const slabs = [
  { cy: 262, w: 128, lift: 0, spread: 34 },
  { cy: 240, w: 104, lift: 0, spread: 78 },
  { cy: 218, w: 80, lift: 0, spread: 124 },
];

const motes = Array.from({ length: 14 }, (_, i) => {
  const h = (Math.imul(i + 3, 2654435761) >>> 0) % 1000;
  return { x: (90 + (h % 220)).toFixed(0), y: (250 + ((h >> 3) % 50)).toFixed(0), d: ((h % 60) / 10).toFixed(1), r: (1 + (h % 3) * 0.5).toFixed(1) };
});

function Slab({ cy, w, t = 22, index, locked, offset, emblem }: { cy: number; w: number; t?: number; index: number; locked: boolean; offset: number; emblem?: boolean }) {
  const cx = 200;
  const d = w * 0.5;
  const top = `${cx},${cy - d} ${cx + w},${cy} ${cx},${cy + d} ${cx - w},${cy}`;
  const left = `${cx - w},${cy} ${cx},${cy + d} ${cx},${cy + d + t} ${cx - w},${cy + t}`;
  const right = `${cx + w},${cy} ${cx},${cy + d} ${cx},${cy + d + t} ${cx + w},${cy + t}`;
  const k = 0.62;
  const inner = `${cx},${cy - d * k} ${cx + w * k},${cy} ${cx},${cy + d * k} ${cx - w * k},${cy}`;
  const edge = `M${cx - w},${cy} L${cx},${cy - d} L${cx + w},${cy} L${cx},${cy + d} Z`;
  return (
    <g className="hb-vf2-slab" data-s={index} data-locked={locked} style={{ transform: `translateY(${-offset}px)` }}>
      <g className="hb-vf2-bob">
        <polygon className="hb-vf2-face-l" points={left} />
        <polygon className="hb-vf2-face-r" points={right} />
        <polygon className="hb-vf2-face-t" points={top} />
        <polygon className="hb-vf2-inner" points={inner} />
        <path className="hb-vf2-edge" d={edge} />
        {emblem ? (
          <g className="hb-vf2-emblem" transform={`translate(${cx} ${cy}) scale(1 .5) rotate(45)`}>
            <rect x="-15" y="-15" width="30" height="30" rx="7" fill="none" stroke="var(--hb-vf2-accent)" strokeWidth="2.4" />
            <circle r="5" fill="var(--hb-vf2-accent)" />
          </g>
        ) : null}
      </g>
    </g>
  );
}

export function AuthSplitAssemble({
  brand = "Stratum",
  title = "Sign in to Stratum",
  subtitle = "Your infrastructure, layered and accounted for. Pick up from your last deploy.",
  captions = ["Three layers stand between you and your stack.", "Identity confirmed. Checking the second layer.", "Credentials ready. Lock it in.", "All layers aligned. Welcome back."],
  defaultEmail = "",
  forgotHref = "#forgot",
  signup = { label: "Start for free", href: "#signup" },
  onSubmit,
  accent = "#38bdf8",
  className,
  style,
  ...rest
}: AuthSplitAssembleProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9-]/g, "");
  const [email, setEmail] = React.useState(defaultEmail);
  const [password, setPassword] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = React.useState<string | null>(null);

  const emailOk = isEmail(email);
  const passOk = password.length >= 8;
  const step = status === "success" ? 3 : emailOk && passOk ? 2 : emailOk ? 1 : 0;
  const score = Math.min(4, (password.length >= 8 ? 1 : 0) + (/[A-Z]/.test(password) ? 1 : 0) + (/\d/.test(password) ? 1 : 0) + (/[^A-Za-z0-9]/.test(password) ? 1 : 0));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (!emailOk || !passOk) return;
    setStatus("loading");
    try {
      const r = onSubmit ? await onSubmit({ email: email.trim(), password }) : await new Promise<boolean>((res) => setTimeout(() => res(true), 1000));
      if (r === false) {
        setStatus("idle");
        setError("We could not verify those credentials.");
        return;
      }
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  };

  const [capHead, ...capTail] = captions[step].split(/(?<=\.)\s+/);

  return (
    <section className={["hb-vf2", className].filter(Boolean).join(" ")} data-step={step} style={{ "--hb-vf2-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-auth-split-assemble" precedence="default">{css}</style>
      <div className="hb-vf2-grid">
        <div className="hb-vf2-art">
          <div className="hb-vf2-top">
            <span className="hb-vf2-brand">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2 18 6.5 10 11 2 6.5Z" fill={accent} /><path d="M2 10l8 4.5 8-4.5M2 13.5 10 18l8-4.5" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" opacity=".6" /></svg>
              {brand}
            </span>
            <span>Layer {Math.min(step + 1, 3)} of 3</span>
          </div>
          <div className="hb-vf2-artin">
            <svg className="hb-vf2-svg" viewBox="0 0 400 360" aria-hidden="true">
              <defs>
                <linearGradient id={`${id}-beam`} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor={accent} stopOpacity=".55" />
                  <stop offset="1" stopColor={accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <ellipse className="hb-vf2-shadow" cx="200" cy="340" rx="140" ry="22" style={{ transform: `scale(${step >= 2 ? 1 : 0.86})`, opacity: step >= 2 ? 0.9 : 0.5 }} />
              {motes.map((m, i) => (
                <circle key={i} className="hb-vf2-mote" cx={m.x} cy={m.y} r={m.r} style={{ animationDelay: `-${m.d}s` }} />
              ))}
              {slabs.map((s, i) => (
                <Slab key={i} index={i} cy={s.cy} w={s.w} locked={step > i} offset={step > i ? 0 : s.spread - (step === i ? 14 : 0)} emblem={i === 2} />
              ))}
              <polygon className="hb-vf2-beam" points="186,178 214,178 236,20 164,20" fill={`url(#${id}-beam)`} />
            </svg>
            <div className="hb-vf2-steps" aria-hidden="true">
              {[0, 1, 2].map((i) => <span key={i} className="hb-vf2-pip" data-on={step > i} />)}
            </div>
            <p className="hb-vf2-cap" aria-live="polite">
              <b>{capHead}</b> {capTail.join(" ")}
            </p>
          </div>
        </div>
        <div className="hb-vf2-form">
          <div className="hb-vf2-inner-form">
            {status === "success" ? (
              <div className="hb-vf2-done" role="status">
                <span className="hb-vf2-badge">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6.2 5 8.6l4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Session started
                </span>
                <h2 className="hb-vf2-title">Welcome back</h2>
                <p className="hb-vf2-sub">Signed in as {email.trim()}. Your last deploy finished 14 minutes ago with no errors.</p>
                <button type="button" className="hb-vf2-link" onClick={() => { setStatus("idle"); setPassword(""); setTouched(false); }}>Sign in with a different account</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 className="hb-vf2-title">{title}</h2>
                <p className="hb-vf2-sub">{subtitle}</p>
                {error ? <p className="hb-vf2-alert" role="alert">{error}</p> : null}
                <div className="hb-vf2-field">
                  <label className="hb-vf2-label" htmlFor={`${id}-e`}>Email</label>
                  <div className="hb-vf2-wrap">
                    <input id={`${id}-e`} className="hb-vf2-input" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={touched && !emailOk ? true : undefined} />
                    <span className="hb-vf2-ok" data-on={emailOk} aria-hidden="true"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2 5 8.6l4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  </div>
                  {touched && !emailOk ? <p className="hb-vf2-err" role="alert">Enter a valid email address.</p> : null}
                </div>
                <div className="hb-vf2-field">
                  <div className="hb-vf2-label"><label htmlFor={`${id}-p`}>Password</label><a href={forgotHref}>Forgot password?</a></div>
                  <div className="hb-vf2-wrap">
                    <input id={`${id}-p`} className="hb-vf2-input" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={touched && !passOk ? true : undefined} />
                    <span className="hb-vf2-ok" data-on={passOk} aria-hidden="true"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2 5 8.6l4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  </div>
                  <div className="hb-vf2-meter" aria-hidden="true">{[0, 1, 2, 3].map((i) => <span key={i} data-on={score > i} />)}</div>
                  {touched && !passOk ? <p className="hb-vf2-err" role="alert">Passwords are at least 8 characters.</p> : null}
                </div>
                <button type="submit" className="hb-vf2-btn" disabled={status === "loading"} aria-busy={status === "loading"}>
                  {status === "loading" ? <><span className="hb-vf2-spin" aria-hidden="true" />Aligning layers</> : "Sign in"}
                </button>
                {signup ? <p className="hb-vf2-foot">No account yet? <a href={signup.href}>{signup.label}</a></p> : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
