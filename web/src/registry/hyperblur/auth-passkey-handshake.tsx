"use client";

import * as React from "react";

export type AuthPasskeyHandshakeStage = "idle" | "searching" | "confirm" | "verified" | "failed";

export interface AuthPasskeyHandshakeProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  account?: { name: string; email: string };
  device?: string;
  timeoutSeconds?: number;
  defaultStage?: AuthPasskeyHandshakeStage;
  onPasskey?: () => boolean | void | Promise<boolean | void>;
  onFallback?: () => void;
  onSwitchAccount?: () => void;
  onStageChange?: (stage: AuthPasskeyHandshakeStage) => void;
  accent?: string;
}

const css = `
.hb-vf4 {
  --hb-vf4-accent: #3dd68c;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  display: grid;
  place-items: center;
  padding: 52px 20px;
  overflow: hidden;
  background: radial-gradient(ellipse 55% 45% at 50% 40%, color-mix(in srgb, var(--hb-vf4-accent) 10%, transparent), transparent 70%), #0a0a0a;
  color: #ededed;
  font-family: inherit;
}
.hb-vf4 *, .hb-vf4 *::before, .hb-vf4 *::after { box-sizing: border-box; }
.hb-vf4-card { width: 100%; max-width: 420px; text-align: center; }
.hb-vf4-chip { display: inline-flex; align-items: center; gap: 10px; height: 38px; padding: 0 6px 0 4px; border-radius: 999px; border: 1px solid #262626; background: #111; font-size: 13px; }
.hb-vf4-ava { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; font-size: 11.5px; font-weight: 600; color: #0a0a0a; background: linear-gradient(135deg, #fde68a, #f472b6); }
.hb-vf4-chip b { font-weight: 500; }
.hb-vf4-chip span { color: #8f8f8f; }
.hb-vf4-swap { height: 28px; padding: 0 10px; border-radius: 999px; border: 0; background: #1c1c1c; color: #a1a1a1; font: inherit; font-size: 12px; cursor: pointer; transition: background .2s, color .2s; }
.hb-vf4-swap:hover { background: #262626; color: #ededed; }
.hb-vf4-dial { position: relative; width: 190px; height: 190px; margin: 22px auto 18px; }
.hb-vf4-ticks { position: absolute; inset: 0; }
.hb-vf4-tick { position: absolute; left: 50%; top: 0; width: 2px; height: 14px; margin-left: -1px; border-radius: 2px; background: #2a2a2a; transform-origin: 1px 95px; transition: background .35s, height .35s; }
.hb-vf4[data-stage="searching"] .hb-vf4-tick { animation: hb-vf4-sweep 1.2s linear infinite; }
.hb-vf4[data-stage="confirm"] .hb-vf4-tick[data-on="true"] { background: var(--hb-vf4-accent); }
.hb-vf4[data-stage="verified"] .hb-vf4-tick { background: var(--hb-vf4-accent); height: 18px; transition-delay: var(--hb-vf4-d); }
.hb-vf4[data-stage="failed"] .hb-vf4-tick { background: #4a1f22; }
.hb-vf4-core { position: absolute; inset: 28px; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle at 50% 35%, #1a1a1a, #0e0e0e 70%); border: 1px solid #222; box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 20px 50px -20px rgba(0,0,0,.9); }
.hb-vf4-core::after { content: ""; position: absolute; inset: -1px; border-radius: 50%; box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-vf4-accent) 45%, transparent); }
.hb-vf4[data-stage="confirm"] .hb-vf4-core::after { animation: hb-vf4-ping 1.8s cubic-bezier(.2,.7,.2,1) infinite; }
.hb-vf4[data-stage="verified"] .hb-vf4-core { border-color: color-mix(in srgb, var(--hb-vf4-accent) 50%, #222); box-shadow: 0 0 60px -10px var(--hb-vf4-accent); transition: box-shadow .6s .4s, border-color .6s .4s; }
.hb-vf4-glyph { position: absolute; display: grid; place-items: center; opacity: 0; transform: scale(.7); transition: opacity .35s, transform .5s cubic-bezier(.3,1.5,.5,1); }
.hb-vf4-glyph[data-on="true"] { opacity: 1; transform: scale(1); }
.hb-vf4-arc { position: absolute; inset: 0; transform: rotate(-90deg); pointer-events: none; }
.hb-vf4-arc circle { fill: none; stroke: var(--hb-vf4-accent); stroke-width: 2; stroke-linecap: round; transition: stroke-dashoffset 1s linear, opacity .3s; }
.hb-vf4-count { position: absolute; bottom: 22px; left: 0; right: 0; font-family: var(--font-mono), ui-monospace, monospace; font-size: 11px; color: #8f8f8f; letter-spacing: .04em; }
.hb-vf4-check path { stroke-dasharray: 36; stroke-dashoffset: 36; animation: hb-vf4-draw .5s .5s cubic-bezier(.65,0,.35,1) forwards; }
.hb-vf4-title { margin: 0; font-size: 24px; letter-spacing: -.025em; font-weight: 600; line-height: 1.2; }
.hb-vf4-sub { margin: 8px auto 22px; max-width: 340px; color: #8f8f8f; font-size: 14px; line-height: 1.55; min-height: 44px; }
.hb-vf4-btn { width: 100%; height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; border: 0; border-radius: 13px; font: inherit; font-size: 14.5px; font-weight: 600; cursor: pointer; color: #04140b; background: var(--hb-vf4-accent); box-shadow: inset 0 1px 0 rgba(255,255,255,.45), 0 14px 34px -16px var(--hb-vf4-accent); transition: filter .2s, transform .2s cubic-bezier(.2,.8,.2,1), opacity .2s; }
.hb-vf4-btn:hover { filter: brightness(1.06); }
.hb-vf4-btn:active { transform: scale(.985); }
.hb-vf4-btn:disabled { cursor: default; opacity: .55; filter: grayscale(.3); }
.hb-vf4-steps { list-style: none; margin: 20px 0 0; padding: 14px 16px; border-radius: 14px; border: 1px solid #1f1f1f; background: #0f0f0f; display: grid; gap: 10px; text-align: left; }
.hb-vf4-step { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #6b6b6b; transition: color .3s; }
.hb-vf4-step[data-s="active"] { color: #ededed; }
.hb-vf4-step[data-s="done"] { color: #a1a1a1; }
.hb-vf4-step[data-s="error"] { color: #f58a8b; }
.hb-vf4-dot { flex: none; width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #333; display: grid; place-items: center; transition: border-color .3s, background .3s; }
.hb-vf4-step[data-s="active"] .hb-vf4-dot { border-color: var(--hb-vf4-accent); border-top-color: transparent; animation: hb-vf4-rot .8s linear infinite; }
.hb-vf4-step[data-s="done"] .hb-vf4-dot { border-color: var(--hb-vf4-accent); background: var(--hb-vf4-accent); }
.hb-vf4-step[data-s="error"] .hb-vf4-dot { border-color: #f05d5e; background: #f05d5e; }
.hb-vf4-step em { margin-left: auto; font-style: normal; font-family: var(--font-mono), ui-monospace, monospace; font-size: 11px; color: #5c5c5c; }
.hb-vf4-alt { margin: 18px 0 0; font-size: 13px; color: #8f8f8f; }
.hb-vf4-alt button { border: 0; background: none; padding: 0; font: inherit; color: #ededed; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,.25); }
.hb-vf4 :is(.hb-vf4-btn, .hb-vf4-swap, .hb-vf4-alt button):focus-visible { outline: 2px solid var(--hb-vf4-accent); outline-offset: 3px; }
@keyframes hb-vf4-sweep { 0% { background: var(--hb-vf4-accent); height: 18px; } 30%, 100% { background: #2a2a2a; height: 14px; } }
@keyframes hb-vf4-ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-vf4-accent) 45%, transparent); } 100% { box-shadow: 0 0 0 22px transparent; } }
@keyframes hb-vf4-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-vf4-rot { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-vf4 *, .hb-vf4 *::before, .hb-vf4 *::after { animation: none !important; transition: none !important; }
  .hb-vf4-check path { stroke-dashoffset: 0; }
}
`;

const TICKS = 60;

export function AuthPasskeyHandshake({
  title = "Sign in with your passkey",
  subtitle = "No password needed. Your device signs a one-time challenge, and nothing secret leaves it.",
  account = { name: "Maya Okafor", email: "maya@lumen.dev" },
  device = "MacBook Pro",
  timeoutSeconds = 60,
  defaultStage = "idle",
  onPasskey,
  onFallback,
  onSwitchAccount,
  onStageChange,
  accent = "#3dd68c",
  className,
  style,
  ...rest
}: AuthPasskeyHandshakeProps) {
  const [stage, setStageState] = React.useState<AuthPasskeyHandshakeStage>(defaultStage);
  const [left, setLeft] = React.useState(timeoutSeconds);
  const [failReason, setFailReason] = React.useState("The request was cancelled on your device.");
  const runRef = React.useRef(0);

  const setStage = React.useCallback((s: AuthPasskeyHandshakeStage) => {
    setStageState(s);
    onStageChange?.(s);
  }, [onStageChange]);

  React.useEffect(() => {
    if (stage !== "confirm") return;
    const run = runRef.current;
    const deadline = performance.now() + timeoutSeconds * 1000;
    const t = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - performance.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0 && run === runRef.current) {
        runRef.current += 1;
        setFailReason("The request timed out before your device answered.");
        setStage("failed");
      }
    }, 250);
    return () => window.clearInterval(t);
  }, [stage, timeoutSeconds, setStage]);

  React.useEffect(() => () => { runRef.current += 1; }, []);

  const start = async () => {
    const run = ++runRef.current;
    setLeft(timeoutSeconds);
    setStage("searching");
    await new Promise((r) => setTimeout(r, 900));
    if (run !== runRef.current) return;
    setStage("confirm");
    try {
      const r = onPasskey ? await onPasskey() : await new Promise<boolean>((res) => setTimeout(() => res(true), 2200));
      if (run !== runRef.current) return;
      if (r === false) {
        setFailReason("The request was cancelled on your device.");
        setStage("failed");
        return;
      }
      setStage("verified");
    } catch (err) {
      if (run !== runRef.current) return;
      setFailReason(err instanceof Error ? err.message : "Your device could not sign the challenge.");
      setStage("failed");
    }
  };

  const busy = stage === "searching" || stage === "confirm";
  const fraction = left / Math.max(1, timeoutSeconds);
  const lit = Math.round(fraction * TICKS);
  const circ = 2 * Math.PI * 82;
  const initials = account.name.split(" ").map((p) => p[0]).slice(0, 2).join("");

  const headline: Record<AuthPasskeyHandshakeStage, string> = {
    idle: title,
    searching: "Looking for your passkey",
    confirm: `Confirm on ${device}`,
    verified: `Welcome back, ${account.name.split(" ")[0]}`,
    failed: "That did not go through",
  };
  const copy: Record<AuthPasskeyHandshakeStage, string> = {
    idle: subtitle,
    searching: "Asking your browser for a passkey saved for this site.",
    confirm: `Use Touch ID or your security key on ${device} to approve this sign-in.`,
    verified: "Signature verified. Opening your workspace now.",
    failed: failReason,
  };

  const stepState = (i: number) => {
    const order = { idle: -1, searching: 0, confirm: 1, verified: 3, failed: 1 }[stage];
    if (stage === "failed" && i === 1) return "error";
    if (i < order) return "done";
    if (i === order) return stage === "failed" ? "idle" : "active";
    return "idle";
  };
  const steps = [
    { label: "Request challenge", meta: stepState(0) === "done" ? "84 ms" : "" },
    { label: `Sign with ${device}`, meta: stage === "confirm" ? `${left}s` : stepState(1) === "done" ? "ok" : "" },
    { label: "Verify signature", meta: stepState(2) === "done" ? "ES256" : "" },
  ];

  return (
    <section className={["hb-vf4", className].filter(Boolean).join(" ")} data-stage={stage} style={{ "--hb-vf4-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-auth-passkey-handshake" precedence="default">{css}</style>
      <div className="hb-vf4-card">
        <div className="hb-vf4-chip">
          <span className="hb-vf4-ava" aria-hidden="true">{initials}</span>
          <b>{account.name}</b>
          <span>{account.email}</span>
          <button type="button" className="hb-vf4-swap" onClick={() => onSwitchAccount?.()} disabled={busy}>Switch</button>
        </div>
        <div className="hb-vf4-dial" aria-hidden="true">
          <div className="hb-vf4-ticks">
            {Array.from({ length: TICKS }, (_, i) => (
              <span key={i} className="hb-vf4-tick" data-on={i < lit} style={{ transform: `rotate(${(i * 360 / TICKS).toFixed(2)}deg)`, animationDelay: `${(i * 1.2 / TICKS - 1.2).toFixed(3)}s`, "--hb-vf4-d": `${(i * 12).toFixed(0)}ms` } as React.CSSProperties} />
            ))}
          </div>
          <div className="hb-vf4-core">
            <span className="hb-vf4-glyph" data-on={stage === "idle" || stage === "searching"}>
              <svg width="54" height="54" viewBox="0 0 48 48" fill="none">
                <circle cx="17" cy="16" r="8" stroke="#ededed" strokeWidth="2.2" />
                <path d="M4 38c0-7 6-11 13-11 3 0 6 .8 8 2.2" stroke="#ededed" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="35" cy="27" r="5.5" stroke={accent} strokeWidth="2.2" />
                <path d="M35 32.5V43m0-4h4m-4-3h3" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="hb-vf4-glyph" data-on={stage === "confirm"}>
              <svg width="58" height="58" viewBox="0 0 48 48" fill="none">
                <rect x="9" y="11" width="30" height="20" rx="2.5" stroke="#ededed" strokeWidth="2" />
                <path d="M5 35h38l-2.5 3h-33Z" stroke="#ededed" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="24" cy="21" r="5" stroke={accent} strokeWidth="2" />
                <path d="M24 18.5v2.5" stroke={accent} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="hb-vf4-glyph" data-on={stage === "verified"}>
              {stage === "verified" ? (
                <svg className="hb-vf4-check" width="56" height="56" viewBox="0 0 48 48" fill="none"><path d="M13 25l7.5 7.5L36 17" stroke={accent} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : null}
            </span>
            <span className="hb-vf4-glyph" data-on={stage === "failed"}>
              <svg width="50" height="50" viewBox="0 0 48 48" fill="none"><path d="M24 14v13m0 6.5v.5" stroke="#f05d5e" strokeWidth="3.2" strokeLinecap="round" /><circle cx="24" cy="24" r="16" stroke="#f05d5e" strokeWidth="2" opacity=".5" /></svg>
            </span>
            {stage === "confirm" ? <span className="hb-vf4-count">00:{String(left).padStart(2, "0")}</span> : null}
          </div>
          <svg className="hb-vf4-arc" viewBox="0 0 190 190">
            <circle cx="95" cy="95" r="82" strokeDasharray={circ.toFixed(2)} strokeDashoffset={(circ * (1 - fraction)).toFixed(2)} style={{ opacity: stage === "confirm" ? 0.55 : 0 }} />
          </svg>
        </div>
        <h2 className="hb-vf4-title" aria-live="polite">{headline[stage]}</h2>
        <p className="hb-vf4-sub">{copy[stage]}</p>
        {stage === "verified" ? null : (
          <button type="button" className="hb-vf4-btn" onClick={start} disabled={busy} aria-busy={busy}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="8.5" cy="9" r="4" stroke="currentColor" strokeWidth="2" /><path d="M11.5 11.5 20 20m-3-3 2-2m-4.5-.5 2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            {stage === "failed" ? "Try again" : busy ? "Waiting for device" : "Use passkey"}
          </button>
        )}
        <ol className="hb-vf4-steps">
          {steps.map((s, i) => (
            <li key={s.label} className="hb-vf4-step" data-s={stepState(i)}>
              <span className="hb-vf4-dot" aria-hidden="true" />
              {s.label}
              <em>{s.meta}</em>
            </li>
          ))}
        </ol>
        <p className="hb-vf4-alt">Lost your device? <button type="button" onClick={() => onFallback?.()}>Sign in with an email code</button></p>
      </div>
    </section>
  );
}
