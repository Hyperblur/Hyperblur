"use client";

import * as React from "react";

export interface AuthMagicFlightProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  brand?: string;
  title?: string;
  subtitle?: string;
  sender?: string;
  expiresMinutes?: number;
  resendSeconds?: number;
  mailHref?: string;
  defaultEmail?: string;
  defaultSent?: boolean;
  onSend?: (email: string) => boolean | void | Promise<boolean | void>;
  onResend?: (email: string) => void;
  accent?: string;
}

const css = `
.hb-vf5 {
  --hb-vf5-accent: #ff8a4c;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  display: grid;
  place-items: center;
  padding: 52px 20px;
  overflow: hidden;
  background: linear-gradient(180deg, #0c0a09, #0a0a0a 60%);
  color: #ededed;
  font-family: inherit;
}
.hb-vf5 *, .hb-vf5 *::before, .hb-vf5 *::after { box-sizing: border-box; }
.hb-vf5::before { content: ""; position: absolute; left: 50%; top: 18%; width: 620px; height: 320px; transform: translateX(-50%); background: radial-gradient(ellipse, color-mix(in srgb, var(--hb-vf5-accent) 13%, transparent), transparent 65%); pointer-events: none; }
.hb-vf5-card { position: relative; width: 100%; max-width: 420px; container-type: inline-size; padding: 28px 30px 26px; border-radius: 22px; background: linear-gradient(180deg, #141210, #0f0f0f); border: 1px solid #242120; box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 40px 80px -30px rgba(0,0,0,.9); }
.hb-vf5-brand { display: flex; align-items: center; gap: 9px; font-weight: 600; font-size: 14px; margin-bottom: 18px; }
.hb-vf5-brand i { width: 22px; height: 22px; border-radius: 7px; background: conic-gradient(from 200deg, var(--hb-vf5-accent), #ffd28a, var(--hb-vf5-accent)); box-shadow: 0 6px 16px -6px var(--hb-vf5-accent); }
.hb-vf5-stage { position: relative; width: 340px; height: 132px; margin: 0 auto 18px; }
@container (max-width: 380px) { .hb-vf5-stage { transform: scale(.8); transform-origin: top center; margin-bottom: -8px; } }
.hb-vf5-path { position: absolute; inset: 0; overflow: visible; }
.hb-vf5-route { fill: none; stroke: #2e2a27; stroke-width: 1.5; stroke-dasharray: 2 6; stroke-linecap: round; }
.hb-vf5-trail { fill: none; stroke: var(--hb-vf5-accent); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 360; stroke-dashoffset: 360; opacity: 0; }
.hb-vf5[data-stage="sending"] .hb-vf5-trail { opacity: 1; animation: hb-vf5-trail 1.3s .35s cubic-bezier(.55,0,.3,1) forwards; }
.hb-vf5[data-stage="sent"] .hb-vf5-trail { opacity: .35; stroke-dashoffset: 0; }
.hb-vf5-sheet { position: absolute; left: 14px; top: 62px; width: 56px; height: 44px; border-radius: 6px; background: linear-gradient(180deg, #f6efe8, #e6ddd3); box-shadow: 0 10px 24px -10px rgba(0,0,0,.8); padding: 9px 9px; display: grid; gap: 5px; align-content: start; transform-origin: 50% 100%; animation: hb-vf5-hover 3.6s cubic-bezier(.45,0,.55,1) infinite; }
.hb-vf5-sheet span { height: 3px; border-radius: 2px; background: #c9bdb0; }
.hb-vf5-sheet span:first-child { width: 60%; background: var(--hb-vf5-accent); }
.hb-vf5-sheet span:nth-child(3) { width: 75%; }
.hb-vf5[data-stage="sending"] .hb-vf5-sheet { animation: hb-vf5-fold .4s cubic-bezier(.6,0,.4,1) forwards; }
.hb-vf5[data-stage="sent"] .hb-vf5-sheet { opacity: 0; animation: none; }
.hb-vf5-env { position: absolute; left: 0; top: 0; width: 52px; height: 36px; offset-path: path("M42 84 C 110 -8, 226 -12, 294 74"); offset-rotate: auto; offset-distance: 0%; opacity: 0; }
.hb-vf5[data-stage="sending"] .hb-vf5-env { animation: hb-vf5-fly 1.3s .35s cubic-bezier(.55,0,.3,1) forwards; }
.hb-vf5-env svg { display: block; width: 100%; height: 100%; transform: rotate(0deg); filter: drop-shadow(0 8px 14px rgba(0,0,0,.6)); }
.hb-vf5-tray { position: absolute; right: 8px; top: 48px; width: 76px; height: 62px; display: grid; place-items: center; border-radius: 16px; border: 1px solid #2a2622; background: linear-gradient(180deg, #1a1715, #121110); transition: border-color .5s, box-shadow .5s; }
.hb-vf5[data-stage="sent"] .hb-vf5-tray { border-color: color-mix(in srgb, var(--hb-vf5-accent) 55%, #2a2622); box-shadow: 0 0 40px -10px var(--hb-vf5-accent), inset 0 1px 0 rgba(255,255,255,.06); animation: hb-vf5-catch .5s cubic-bezier(.3,1.6,.5,1); }
.hb-vf5-tray svg { color: #8f8a85; transition: color .5s; }
.hb-vf5[data-stage="sent"] .hb-vf5-tray svg { color: #ededed; }
.hb-vf5-badge { position: absolute; top: -8px; right: -8px; min-width: 22px; height: 22px; padding: 0 6px; border-radius: 999px; display: grid; place-items: center; background: var(--hb-vf5-accent); color: #1a0d05; font-size: 12px; font-weight: 700; box-shadow: 0 0 0 3px #121110; transform: scale(0); transition: transform .45s .1s cubic-bezier(.3,1.7,.5,1); }
.hb-vf5[data-stage="sent"] .hb-vf5-badge { transform: scale(1); }
.hb-vf5-from { position: absolute; left: 12px; top: 112px; font-size: 10.5px; color: #6f6964; font-family: var(--font-mono), ui-monospace, monospace; }
.hb-vf5-to { position: absolute; right: 0; top: 116px; width: 92px; text-align: center; font-size: 10.5px; color: #6f6964; font-family: var(--font-mono), ui-monospace, monospace; }
.hb-vf5-title { margin: 0; font-size: 24px; line-height: 1.2; font-weight: 600; letter-spacing: -.025em; }
.hb-vf5-sub { margin: 8px 0 20px; color: #9a948f; font-size: 14px; line-height: 1.55; }
.hb-vf5-sub b { color: #ededed; font-weight: 500; }
.hb-vf5-field { position: relative; }
.hb-vf5-input { width: 100%; height: 50px; padding: 0 128px 0 16px; border-radius: 14px; border: 1px solid #2a2622; background: #0c0b0a; color: #ededed; font: inherit; font-size: 14.5px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-vf5-input::placeholder { color: #5f5954; }
.hb-vf5-input:focus { border-color: var(--hb-vf5-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vf5-accent) 16%, transparent); }
.hb-vf5-input[aria-invalid="true"] { border-color: #ef5f5f; }
.hb-vf5-send { position: absolute; right: 5px; top: 5px; height: 40px; padding: 0 16px; border: 0; border-radius: 10px; display: inline-flex; align-items: center; gap: 8px; font: inherit; font-size: 13.5px; font-weight: 600; color: #1a0d05; background: var(--hb-vf5-accent); cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,.4); transition: filter .2s, transform .2s cubic-bezier(.2,.8,.2,1); }
.hb-vf5-send:hover { filter: brightness(1.08); }
.hb-vf5-send:active { transform: scale(.97); }
.hb-vf5-send:disabled { cursor: progress; }
.hb-vf5-send svg { transition: transform .3s cubic-bezier(.2,.8,.2,1); }
.hb-vf5-send:hover svg { transform: translate(2px, -2px); }
.hb-vf5-err { margin: 8px 0 0; font-size: 12.5px; color: #f39494; }
.hb-vf5-note { margin: 14px 0 0; font-size: 12.5px; color: #6f6964; line-height: 1.5; }
.hb-vf5-exp { margin: 0 0 16px; padding: 12px 14px; border-radius: 12px; border: 1px solid #242120; background: #0d0c0b; }
.hb-vf5-exp-row { display: flex; justify-content: space-between; font-size: 12.5px; color: #9a948f; margin-bottom: 9px; }
.hb-vf5-exp-row b { font-family: var(--font-mono), ui-monospace, monospace; font-weight: 500; color: #ededed; }
.hb-vf5-bar { height: 4px; border-radius: 4px; background: #221f1d; overflow: hidden; }
.hb-vf5-bar i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--hb-vf5-accent), #ffd28a); transform-origin: 0 50%; transition: transform 1s linear; }
.hb-vf5-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.hb-vf5-open, .hb-vf5-ghost { height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; font: inherit; font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer; transition: filter .2s, background .2s, border-color .2s, transform .2s cubic-bezier(.2,.8,.2,1); }
.hb-vf5-open { color: #1a0d05; background: var(--hb-vf5-accent); border: 0; box-shadow: inset 0 1px 0 rgba(255,255,255,.4), 0 12px 28px -14px var(--hb-vf5-accent); }
.hb-vf5-open:hover { filter: brightness(1.07); }
.hb-vf5-ghost { color: #ededed; background: #141210; border: 1px solid #2a2622; }
.hb-vf5-ghost:hover:not(:disabled) { background: #1b1816; border-color: #3a3430; }
.hb-vf5-ghost:disabled { color: #6f6964; cursor: not-allowed; }
.hb-vf5-open:active, .hb-vf5-ghost:active:not(:disabled) { transform: scale(.985); }
.hb-vf5-change { display: block; margin: 16px auto 0; border: 0; background: none; color: #9a948f; font: inherit; font-size: 13px; cursor: pointer; border-radius: 6px; }
.hb-vf5-change:hover { color: #ededed; }
.hb-vf5 :is(.hb-vf5-send, .hb-vf5-open, .hb-vf5-ghost, .hb-vf5-change):focus-visible { outline: 2px solid var(--hb-vf5-accent); outline-offset: 3px; }
.hb-vf5-swap { animation: hb-vf5-in .5s cubic-bezier(.2,.8,.2,1) both; }
@keyframes hb-vf5-hover { 0%, 100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-6px) rotate(-2deg); } }
@keyframes hb-vf5-fold { 0% { transform: rotate(-4deg); } 60% { transform: scaleY(.55) rotate(0deg); opacity: 1; } 100% { transform: scaleY(.3) translateY(-20px); opacity: 0; } }
@keyframes hb-vf5-fly { 0% { offset-distance: 0%; opacity: 0; transform: scale(.7); } 12% { opacity: 1; transform: scale(1); } 85% { opacity: 1; transform: scale(.85); } 100% { offset-distance: 100%; opacity: 0; transform: scale(.4); } }
@keyframes hb-vf5-trail { to { stroke-dashoffset: 0; } }
@keyframes hb-vf5-catch { 0% { transform: scale(1); } 40% { transform: scale(1.08) translateY(2px); } 100% { transform: scale(1); } }
@keyframes hb-vf5-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vf5 *, .hb-vf5 *::before, .hb-vf5 *::after { animation: none !important; transition: none !important; }
  .hb-vf5-env { display: none; }
}
`;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export function AuthMagicFlight({
  brand = "Parcel",
  title = "Sign in with a link",
  subtitle = "Enter your email and we will send a one-tap sign-in link. No password to remember.",
  sender = "login@parcel.app",
  expiresMinutes = 15,
  resendSeconds = 30,
  mailHref = "mailto:",
  defaultEmail = "",
  defaultSent = false,
  onSend,
  onResend,
  accent = "#ff8a4c",
  className,
  style,
  ...rest
}: AuthMagicFlightProps) {
  const id = React.useId();
  const [email, setEmail] = React.useState(defaultEmail || (defaultSent ? "maya@parcel.app" : ""));
  const [stage, setStage] = React.useState<"idle" | "sending" | "sent">(defaultSent ? "sent" : "idle");
  const [touched, setTouched] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [elapsed, setElapsed] = React.useState(0);
  const [resendAt, setResendAt] = React.useState(resendSeconds);
  const sentAt = React.useRef(0);

  React.useEffect(() => {
    if (stage !== "sent") return;
    if (!sentAt.current) sentAt.current = performance.now();
    const t = window.setInterval(() => setElapsed(Math.floor((performance.now() - sentAt.current) / 1000)), 500);
    return () => window.clearInterval(t);
  }, [stage]);

  const total = expiresMinutes * 60;
  const remaining = Math.max(0, total - elapsed);
  const cooldown = Math.max(0, resendAt - elapsed);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (!isEmail(email)) return;
    setStage("sending");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      const [r] = await Promise.all([onSend ? onSend(email.trim()) : wait(400).then(() => true), wait(reduce ? 0 : 1700)]);
      if (r === false) {
        setStage("idle");
        setError("We could not send a link to that address.");
        return;
      }
      sentAt.current = performance.now();
      setElapsed(0);
      setResendAt(resendSeconds);
      setStage("sent");
    } catch (err) {
      setStage("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  };

  const resend = () => {
    if (cooldown > 0) return;
    onResend?.(email.trim());
    sentAt.current = performance.now();
    setElapsed(0);
    setResendAt(resendSeconds);
  };

  const reset = () => {
    sentAt.current = 0;
    setElapsed(0);
    setStage("idle");
    setTouched(false);
  };

  const bad = touched && !isEmail(email);

  return (
    <section className={["hb-vf5", className].filter(Boolean).join(" ")} data-stage={stage} style={{ "--hb-vf5-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-auth-magic-flight" precedence="default">{css}</style>
      <div className="hb-vf5-card">
        <div className="hb-vf5-brand"><i aria-hidden="true" />{brand}</div>
        <div className="hb-vf5-stage" aria-hidden="true">
          <svg className="hb-vf5-path" viewBox="0 0 340 132">
            <path className="hb-vf5-route" d="M42 84 C 110 -8, 226 -12, 294 74" />
            <path className="hb-vf5-trail" d="M42 84 C 110 -8, 226 -12, 294 74" />
          </svg>
          <div className="hb-vf5-sheet"><span /><span /><span /><span /></div>
          <div className="hb-vf5-env">
            <svg viewBox="0 0 52 36" fill="none">
              <rect x="1" y="1" width="50" height="34" rx="5" fill="#f6efe8" />
              <path d="M2 4l24 17L50 4" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
              <path d="M2 33l17-14M50 33 33 19" stroke="#d6cabd" strokeWidth="1.6" />
            </svg>
          </div>
          <div className="hb-vf5-tray">
            <svg width="34" height="28" viewBox="0 0 34 28" fill="none">
              <path d="M3 15 8 3h18l5 12v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M3 15h8l2 4h8l2-4h8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="hb-vf5-badge">1</span>
          </div>
          <span className="hb-vf5-from">{sender}</span>
          <span className="hb-vf5-to">Inbox</span>
        </div>
        {stage === "sent" ? (
          <div className="hb-vf5-swap" role="status">
            <h2 className="hb-vf5-title">Check your inbox</h2>
            <p className="hb-vf5-sub">We sent a sign-in link to <b>{email.trim()}</b>. Open it on this device to continue.</p>
            <div className="hb-vf5-exp">
              <div className="hb-vf5-exp-row"><span>{remaining > 0 ? "Link expires in" : "Link expired"}</span><b>{mmss(remaining)}</b></div>
              <div className="hb-vf5-bar"><i style={{ transform: `scaleX(${(remaining / total).toFixed(4)})` }} /></div>
            </div>
            <div className="hb-vf5-actions">
              <a className="hb-vf5-open" href={mailHref}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V10M9 2h5v5M14 2 7.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Open mail
              </a>
              <button type="button" className="hb-vf5-ghost" onClick={resend} disabled={cooldown > 0}>{cooldown > 0 ? `Resend in ${cooldown}s` : "Resend link"}</button>
            </div>
            <button type="button" className="hb-vf5-change" onClick={reset}>Use a different email</button>
          </div>
        ) : (
          <form className="hb-vf5-swap" onSubmit={send} noValidate>
            <h2 className="hb-vf5-title">{title}</h2>
            <p className="hb-vf5-sub">{subtitle}</p>
            <div className="hb-vf5-field">
              <label htmlFor={`${id}-e`} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Email address</label>
              <input id={`${id}-e`} className="hb-vf5-input" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={stage === "sending"} aria-invalid={bad ? true : undefined} aria-describedby={bad ? `${id}-err` : undefined} />
              <button type="submit" className="hb-vf5-send" disabled={stage === "sending"} aria-busy={stage === "sending"}>
                {stage === "sending" ? "Sending" : "Send link"}
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8.5 14 2l-4 12-2.5-5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
              </button>
            </div>
            {bad ? <p id={`${id}-err`} className="hb-vf5-err" role="alert">Enter the email you use for {brand}.</p> : null}
            {error ? <p className="hb-vf5-err" role="alert">{error}</p> : null}
            <p className="hb-vf5-note">Links expire after {expiresMinutes} minutes and work once. We will never ask for your password by email.</p>
          </form>
        )}
      </div>
    </section>
  );
}
