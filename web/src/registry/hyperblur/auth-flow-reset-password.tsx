"use client";

import * as React from "react";

export interface AuthFlowResetPasswordProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  title?: string;
  email?: string;
  expiresIn?: number;
  minBits?: number;
  previous?: string[];
  sessions?: string[];
  defaultPassword?: string;
  onSubmit?: (password: string) => void | Promise<unknown>;
  continueHref?: string;
  headingAs?: "h1" | "h2" | "h3";
  accent?: string;
}

const css = `
@keyframes hb-vg2-tile {
  0% { transform: scaleY(.2); opacity: 0; }
  70% { transform: scaleY(1.15); opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}
@keyframes hb-vg2-in {
  from { opacity: 0; transform: translate3d(0, 10px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-vg2-out {
  to { opacity: .35; text-decoration-color: currentColor; }
}
@keyframes hb-vg2-spin { to { transform: rotate(360deg); } }
@keyframes hb-vg2-draw { to { stroke-dashoffset: 0; } }
.hb-vg2 {
  --hb-vg2-accent: #a3e635;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 80px 20px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vg2 *, .hb-vg2 *::before, .hb-vg2 *::after { box-sizing: border-box; }
.hb-vg2::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(ellipse 40% 50% at 82% 20%, color-mix(in srgb, var(--hb-vg2-accent) 10%, transparent), transparent 70%), radial-gradient(ellipse 30% 40% at 10% 90%, rgba(255,255,255,.035), transparent 70%);
}
.hb-vg2-wrap { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); gap: 56px; align-items: start; max-width: 940px; margin: 0 auto; }
.hb-vg2-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 10px 5px 8px; border: 1px solid #262626; border-radius: 999px; background: #111; color: #a1a1a1; font: 500 12px/1 var(--font-mono), ui-monospace, monospace; font-variant-numeric: tabular-nums; }
.hb-vg2-eyebrow i { width: 7px; height: 7px; border-radius: 50%; background: var(--hb-vg2-accent); box-shadow: 0 0 10px var(--hb-vg2-accent); font-style: normal; }
.hb-vg2-eyebrow[data-late="true"] i { background: #fb923c; box-shadow: 0 0 10px #fb923c; }
.hb-vg2-title { margin: 22px 0 0; font-size: 40px; font-weight: 650; letter-spacing: -.035em; line-height: 1.05; }
.hb-vg2-lead { margin: 14px 0 0; color: #a1a1a1; font-size: 15px; line-height: 1.65; }
.hb-vg2-lead strong { color: #ededed; font-weight: 550; }
.hb-vg2-legend { display: grid; gap: 10px; margin: 30px 0 0; padding: 0; list-style: none; }
.hb-vg2-legend li { display: flex; align-items: center; gap: 12px; color: #8f8f8f; font-size: 13.5px; transition: color .25s ease; }
.hb-vg2-legend li[data-on="true"] { color: #ededed; }
.hb-vg2-sw { width: 22px; height: 10px; border-radius: 3px; background: #1d1d1d; transition: background .3s ease, box-shadow .3s ease; }
.hb-vg2-legend li[data-on="true"] .hb-vg2-sw { background: var(--sw); box-shadow: 0 0 12px color-mix(in srgb, var(--sw) 50%, transparent); }
.hb-vg2-card { position: relative; padding: 30px; border: 1px solid #222; border-radius: 22px; background: linear-gradient(180deg, #131313, #0e0e0e); box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 40px 80px -40px rgba(0,0,0,.95); }
.hb-vg2-label { display: flex; justify-content: space-between; align-items: baseline; color: #cfcfcf; font-size: 13px; font-weight: 550; }
.hb-vg2-label span { color: #8f8f8f; font-weight: 450; font-size: 12px; }
.hb-vg2-box { position: relative; margin-top: 8px; }
.hb-vg2-input {
  width: 100%;
  height: 50px;
  padding: 0 52px 0 16px;
  border: 1px solid #262626;
  border-radius: 13px;
  background: #0a0a0a;
  color: #ededed;
  font: inherit;
  font-size: 15px;
  letter-spacing: .02em;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.hb-vg2-input::placeholder { color: #5c5c5c; letter-spacing: 0; }
.hb-vg2-input:focus { border-color: color-mix(in srgb, var(--hb-vg2-accent) 55%, #262626); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vg2-accent) 12%, transparent); }
.hb-vg2-input[aria-invalid="true"] { border-color: #7f1d1d; }
.hb-vg2-eye { position: absolute; top: 7px; right: 7px; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 9px; background: none; color: #8f8f8f; cursor: pointer; transition: background .2s ease, color .2s ease; }
.hb-vg2-eye:hover { background: #1a1a1a; color: #ededed; }
.hb-vg2-eye:focus-visible { outline: 2px solid var(--hb-vg2-accent); outline-offset: 0; }
.hb-vg2-strip { display: flex; gap: 3px; height: 18px; margin-top: 12px; padding: 4px; border: 1px solid #1c1c1c; border-radius: 8px; background: #0b0b0b; overflow: hidden; }
.hb-vg2-strip:empty::after { content: "Your password's makeup appears here, never the characters"; align-self: center; color: #4f4f4f; font-size: 10.5px; white-space: nowrap; }
.hb-vg2-tile { flex: 0 0 auto; width: 8px; border-radius: 2px; background: var(--sw); transform-origin: bottom; animation: hb-vg2-tile .32s cubic-bezier(.3, 1.4, .5, 1) both; }
.hb-vg2-tile[data-weak="true"] { opacity: .35; }
.hb-vg2-meter { position: relative; margin-top: 18px; }
.hb-vg2-track { position: relative; height: 8px; border-radius: 99px; background: #1a1a1a; overflow: hidden; }
.hb-vg2-fill { position: absolute; inset: 0 auto 0 0; border-radius: 99px; background: linear-gradient(90deg, #f87171, #fb923c 30%, #facc15 55%, var(--hb-vg2-accent) 85%); background-size: var(--hb-vg2-full) 100%; transition: width .5s cubic-bezier(.2, .9, .25, 1); }
.hb-vg2-ticks { position: relative; height: 26px; margin-top: 6px; color: #5c5c5c; font: 500 10.5px/1 var(--font-mono), ui-monospace, monospace; }
.hb-vg2-ticks span { position: absolute; top: 0; transform: translateX(-50%); padding-top: 8px; white-space: nowrap; transition: color .3s ease; }
.hb-vg2-ticks span::before { content: ""; position: absolute; top: 0; left: 50%; width: 1px; height: 5px; background: currentColor; }
.hb-vg2-ticks span[data-on="true"] { color: #cfcfcf; }
.hb-vg2-readout { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 2px; }
.hb-vg2-bits { font: 600 22px/1 var(--font-mono), ui-monospace, monospace; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
.hb-vg2-bits small { margin-left: 4px; color: #8f8f8f; font-size: 11px; font-weight: 500; letter-spacing: 0; }
.hb-vg2-verdict { color: #a1a1a1; font-size: 13px; text-align: right; }
.hb-vg2-verdict b { color: #ededed; font-weight: 600; }
.hb-vg2-warn { display: flex; gap: 8px; align-items: flex-start; margin-top: 12px; padding: 10px 12px; border: 1px solid #3b2a12; border-radius: 10px; background: #1a130a; color: #fdba74; font-size: 12.5px; line-height: 1.5; animation: hb-vg2-in .3s cubic-bezier(.2, .8, .2, 1) both; }
.hb-vg2-sep { height: 1px; margin: 22px 0; background: #1f1f1f; }
.hb-vg2-match { display: flex; align-items: center; gap: 8px; min-height: 20px; margin-top: 10px; color: #8f8f8f; font-size: 12.5px; }
.hb-vg2-match[data-tone="ok"] { color: var(--hb-vg2-accent); }
.hb-vg2-match[data-tone="bad"] { color: #fca5a5; }
.hb-vg2-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: 0;
  border-radius: 13px;
  background: linear-gradient(180deg, #fafafa, #d9d9d9);
  color: #0a0a0a;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: inset 0 1px 0 #fff, 0 10px 24px -12px rgba(255,255,255,.4);
  transition: transform .15s ease, opacity .2s ease, filter .2s ease;
}
.hb-vg2-btn:hover:not(:disabled) { filter: brightness(1.05); }
.hb-vg2-btn:active:not(:disabled) { transform: scale(.985); }
.hb-vg2-btn:disabled { opacity: .35; cursor: not-allowed; }
.hb-vg2-btn:focus-visible { outline: 2px solid var(--hb-vg2-accent); outline-offset: 3px; }
.hb-vg2-spin { width: 16px; height: 16px; border: 2px solid rgba(0,0,0,.2); border-top-color: #0a0a0a; border-radius: 50%; animation: hb-vg2-spin .7s linear infinite; }
.hb-vg2-err { margin-top: 12px; color: #fca5a5; font-size: 13px; }
.hb-vg2-done { animation: hb-vg2-in .45s cubic-bezier(.2, .8, .2, 1) both; }
.hb-vg2-ok { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 16px; background: color-mix(in srgb, var(--hb-vg2-accent) 14%, #111); color: var(--hb-vg2-accent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-vg2-accent) 35%, transparent); }
.hb-vg2-ok path { stroke-dasharray: 26; stroke-dashoffset: 26; animation: hb-vg2-draw .55s .15s cubic-bezier(.65, 0, .35, 1) forwards; }
.hb-vg2-done h3 { margin: 18px 0 0; font-size: 22px; font-weight: 650; letter-spacing: -.02em; }
.hb-vg2-done p { margin: 8px 0 0; color: #a1a1a1; font-size: 14px; line-height: 1.6; }
.hb-vg2-sessions { display: grid; gap: 6px; margin: 18px 0 0; padding: 0; list-style: none; }
.hb-vg2-sessions li { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 12px; border: 1px solid #1f1f1f; border-radius: 10px; background: #0c0c0c; color: #cfcfcf; font-size: 13px; animation: hb-vg2-in .4s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--d) * 120ms + 250ms); }
.hb-vg2-sessions li span:last-child { color: #8f8f8f; font: 500 11px/1 var(--font-mono), ui-monospace, monospace; }
.hb-vg2-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 20px; color: var(--hb-vg2-accent); font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px; }
.hb-vg2-link:hover { text-decoration: underline; text-underline-offset: 4px; }
.hb-vg2-link:focus-visible { outline: 2px solid var(--hb-vg2-accent); outline-offset: 3px; }
@container (max-width: 760px) {
  .hb-vg2-wrap { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .hb-vg2-legend { display: none; }
  .hb-vg2-title { font-size: 30px; }
  .hb-vg2-card { padding: 22px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vg2 *, .hb-vg2 *::before, .hb-vg2 *::after { animation: none !important; transition: none !important; }
  .hb-vg2-ok path { stroke-dashoffset: 0; }
}
`;

const classes = [
  { id: "lower", label: "Lowercase letters", color: "#60a5fa", size: 26, test: (c: string) => /[a-z]/.test(c) },
  { id: "upper", label: "Uppercase letters", color: "#c084fc", size: 26, test: (c: string) => /[A-Z]/.test(c) },
  { id: "digit", label: "Numbers", color: "#facc15", size: 10, test: (c: string) => /[0-9]/.test(c) },
  { id: "symbol", label: "Symbols and spaces", color: "#f472b6", size: 33, test: () => true },
];

const common = ["password", "123456", "qwerty", "letmein", "welcome", "admin", "iloveyou", "monkey", "dragon", "abc123"];

function kindOf(c: string) {
  return classes.find((k) => k.test(c)) ?? classes[3];
}

function analyse(pw: string, previous: string[]) {
  const kinds = new Set<string>();
  let pool = 0;
  for (const c of pw) kinds.add(kindOf(c).id);
  for (const k of classes) if (kinds.has(k.id)) pool += k.size;
  const weak: boolean[] = [];
  let effective = 0;
  for (let i = 0; i < pw.length; i++) {
    const a = pw.charCodeAt(i);
    const repeat = i > 0 && pw[i] === pw[i - 1];
    const seq = i > 0 && Math.abs(a - pw.charCodeAt(i - 1)) === 1;
    weak.push(repeat || seq);
    effective += repeat || seq ? 0.25 : 1;
  }
  let bits = pw.length ? effective * Math.log2(Math.max(pool, 1)) : 0;
  const lower = pw.toLowerCase();
  const isCommon = common.some((w) => lower.includes(w));
  if (isCommon) bits *= 0.35;
  const reused = previous.some((p) => p === pw);
  if (reused) bits = Math.min(bits, 12);
  return { bits: Math.round(bits), kinds, weak, isCommon, reused };
}

function crackTime(bits: number) {
  const seconds = Math.pow(2, bits) / 1e10;
  if (seconds < 1) return "instantly";
  const units: [number, string][] = [[31536000 * 1e6, "million years"], [31536000 * 1e3, "thousand years"], [31536000, "years"], [86400, "days"], [3600, "hours"], [60, "minutes"], [1, "seconds"]];
  for (const [n, label] of units) if (seconds >= n) return `${Math.min(999, Math.floor(seconds / n))} ${label}`;
  return "instantly";
}

function wait(result: void | Promise<unknown>) {
  return result instanceof Promise ? result : new Promise((resolve) => window.setTimeout(resolve, 1000));
}

export function AuthFlowResetPassword({
  title = "Choose a new password",
  email = "maya.chen@northwind.io",
  expiresIn = 892,
  minBits = 60,
  previous = ["Northwind2024!"],
  sessions = ["MacBook Pro · Safari · Lisbon", "iPhone 15 · App · Lisbon", "Windows · Chrome · Berlin"],
  defaultPassword = "",
  onSubmit,
  continueHref = "#signin",
  headingAs = "h2",
  accent = "#a3e635",
  className = "",
  style,
  ...rest
}: AuthFlowResetPasswordProps) {
  const Heading = headingAs;
  const uid = React.useId();
  const [pw, setPw] = React.useState(defaultPassword);
  const [confirm, setConfirm] = React.useState(defaultPassword);
  const [show, setShow] = React.useState(false);
  const [left, setLeft] = React.useState(expiresIn);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (left <= 0 || done) return;
    const id = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [left, done]);

  const a = analyse(pw, previous);
  const full = Math.max(minBits * 1.6, 96);
  const pct = Math.min(100, (a.bits / full) * 100);
  const ticks = [
    { at: 28, label: "Weak" },
    { at: 45, label: "Fair" },
    { at: minBits, label: "Strong" },
    { at: Math.round(minBits * 1.35), label: "Excellent" },
  ];
  const level = [...ticks].reverse().find((t) => a.bits >= t.at)?.label ?? "Too short";
  const matches = confirm.length > 0 && confirm === pw;
  const mismatch = confirm.length > 0 && !pw.startsWith(confirm);
  const expired = left <= 0;
  const ready = a.bits >= minBits && matches && !a.reused && !expired;
  const mm = String(Math.floor(Math.max(left, 0) / 60)).padStart(2, "0");
  const ss = String(Math.max(left, 0) % 60).padStart(2, "0");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || busy) return;
    setBusy(true);
    setError("");
    wait(onSubmit?.(pw)).then(
      () => {
        setBusy(false);
        setDone(true);
      },
      (err: unknown) => {
        setBusy(false);
        setError(err instanceof Error ? err.message : "We couldn't update your password. Try again.");
      },
    );
  };

  const vars = { "--hb-vg2-accent": accent, "--hb-vg2-full": `${(10000 / Math.max(pct, 1)).toFixed(1)}%`, ...style } as React.CSSProperties;

  return (
    <section className={`hb-vg2 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-auth-flow-reset-password" precedence="default">{css}</style>
      <div className="hb-vg2-wrap">
        <div>
          <span className="hb-vg2-eyebrow" data-late={left < 120}>
            <i aria-hidden="true" />
            {expired ? "Reset link expired" : `Link valid for ${mm}:${ss}`}
          </span>
          <Heading id={`${uid}-t`} className="hb-vg2-title">{title}</Heading>
          <p className="hb-vg2-lead">
            Resetting the password for <strong>{email}</strong>. Every other session is signed out once you save.
          </p>
          <ul className="hb-vg2-legend" aria-label="Character types used">
            {classes.map((k) => (
              <li key={k.id} data-on={a.kinds.has(k.id)} style={{ "--sw": k.color } as React.CSSProperties}>
                <span className="hb-vg2-sw" aria-hidden="true" />
                {k.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="hb-vg2-card">
          {done ? (
            <div className="hb-vg2-done" role="status">
              <span className="hb-vg2-ok" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <h3>Password updated</h3>
              <p>We signed out {sessions.length} other {sessions.length === 1 ? "session" : "sessions"} to keep your account safe.</p>
              <ul className="hb-vg2-sessions">
                {sessions.map((s, i) => (
                  <li key={s} style={{ "--d": i } as React.CSSProperties}>
                    <span>{s}</span>
                    <span>signed out</span>
                  </li>
                ))}
              </ul>
              <a className="hb-vg2-link" href={continueHref}>
                Continue to sign in
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label className="hb-vg2-label" htmlFor={`${uid}-p`}>
                New password
                <span>{pw.length} characters</span>
              </label>
              <div className="hb-vg2-box">
                <input
                  id={`${uid}-p`}
                  className="hb-vg2-input"
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  autoComplete="new-password"
                  placeholder="At least 12 characters"
                  aria-describedby={`${uid}-s`}
                  aria-invalid={a.reused || undefined}
                  disabled={expired}
                />
                <button type="button" className="hb-vg2-eye" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                    {show ? null : <path d="M4 20L20 4" />}
                  </svg>
                </button>
              </div>
              <div className="hb-vg2-strip" aria-hidden="true">
                {Array.from(pw).slice(0, 32).map((c, i) => (
                  <span key={i} className="hb-vg2-tile" data-weak={a.weak[i]} style={{ "--sw": kindOf(c).color } as React.CSSProperties} />
                ))}
              </div>
              <div className="hb-vg2-meter" id={`${uid}-s`}>
                <div className="hb-vg2-track" role="meter" aria-label="Password strength" aria-valuemin={0} aria-valuemax={Math.round(full)} aria-valuenow={a.bits} aria-valuetext={`${level}, ${a.bits} bits`}>
                  <span className="hb-vg2-fill" style={{ width: `${pct.toFixed(1)}%` }} />
                </div>
                <div className="hb-vg2-ticks" aria-hidden="true">
                  {ticks.map((t) => (
                    <span key={t.label} data-on={a.bits >= t.at} style={{ left: `${Math.min(94, (t.at / full) * 100).toFixed(1)}%` }}>
                      {t.label}
                    </span>
                  ))}
                </div>
                <div className="hb-vg2-readout">
                  <span className="hb-vg2-bits">
                    {a.bits}
                    <small>bits</small>
                  </span>
                  <span className="hb-vg2-verdict">
                    <b>{pw ? level : "Start typing"}</b>
                    {pw ? ` · cracked ${crackTime(a.bits) === "instantly" ? "instantly" : `in ~${crackTime(a.bits)}`}` : ""}
                  </span>
                </div>
              </div>
              {a.reused ? (
                <div className="hb-vg2-warn" role="alert">You used this password before. Pick one you haven&apos;t used on this account.</div>
              ) : a.isCommon ? (
                <div className="hb-vg2-warn" role="alert">Contains a very common word. Attackers try these first.</div>
              ) : null}
              <div className="hb-vg2-sep" />
              <label className="hb-vg2-label" htmlFor={`${uid}-c`}>
                Confirm password
              </label>
              <div className="hb-vg2-box">
                <input
                  id={`${uid}-c`}
                  className="hb-vg2-input"
                  type={show ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Type it once more"
                  aria-invalid={mismatch || undefined}
                  aria-describedby={`${uid}-m`}
                  disabled={expired}
                />
              </div>
              <div id={`${uid}-m`} className="hb-vg2-match" data-tone={matches ? "ok" : mismatch ? "bad" : "idle"} aria-live="polite">
                {matches ? "Passwords match" : mismatch ? `Differs at character ${Array.from(confirm).findIndex((c, i) => c !== pw[i]) + 1}` : confirm ? `${confirm.length} of ${pw.length} characters` : ""}
              </div>
              <button type="submit" className="hb-vg2-btn" disabled={!ready || busy} aria-busy={busy || undefined}>
                {busy ? <span className="hb-vg2-spin" aria-hidden="true" /> : null}
                {busy ? "Saving" : expired ? "Request a new link" : "Save and sign out everywhere"}
              </button>
              {error ? <div className="hb-vg2-err" role="alert">{error}</div> : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
