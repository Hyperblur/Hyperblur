"use client";

import * as React from "react";

export interface FormSignupValues {
  email: string;
  username: string;
  password: string;
}

export interface FormSignupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "title"> {
  title?: string;
  subtitle?: string;
  brand?: string;
  takenUsernames?: string[];
  emailDomains?: string[];
  resendSeconds?: number;
  submitLabel?: string;
  accent?: string;
  delay?: number;
  onSubmit?: (values: FormSignupValues) => void | Promise<void>;
  onResend?: (email: string) => void;
}

const css = `
.hb-xh2 {
  --hb-xh2-a: #8b5cf6;
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-family: inherit;
  color: #ededed;
}
.hb-xh2 *, .hb-xh2 *::before, .hb-xh2 *::after { box-sizing: border-box; }
.hb-xh2-card {
  position: relative;
  padding: 24px 22px 20px;
  border-radius: 20px;
  background: #0f0f10;
  border: 1px solid #242426;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 60px -30px rgba(0,0,0,0.9);
}
.hb-xh2-card::after {
  content: "";
  position: absolute;
  left: 22px;
  right: 22px;
  top: -1px;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-xh2-a) 80%, #fff), transparent);
  opacity: 0.7;
}
.hb-xh2-brand { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #d6d6d6; }
.hb-xh2-mark { width: 22px; height: 22px; border-radius: 7px; background: conic-gradient(from 210deg, var(--hb-xh2-a), #22d3ee, var(--hb-xh2-a)); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18); }
.hb-xh2-title { margin: 16px 0 4px; font-size: 21px; font-weight: 600; letter-spacing: -0.025em; }
.hb-xh2-sub { margin: 0 0 18px; font-size: 13px; color: #8f8f8f; }
.hb-xh2-form { display: grid; gap: 14px; }
.hb-xh2-field { display: grid; gap: 6px; }
.hb-xh2-label { font-size: 12px; font-weight: 500; color: #b3b3b3; }
.hb-xh2-box {
  position: relative;
  display: flex;
  align-items: center;
  height: 42px;
  border: 1px solid #27272a;
  border-radius: 11px;
  background: #131315;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-xh2-box:hover { border-color: #34343a; }
.hb-xh2-box:focus-within { border-color: var(--hb-xh2-a); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-xh2-a) 18%, transparent); }
.hb-xh2-box[data-state="bad"] { border-color: #ef4f5f; box-shadow: 0 0 0 4px rgba(239,79,95,0.12); }
.hb-xh2-box[data-state="good"] { border-color: color-mix(in srgb, #34d399 55%, #27272a); }
.hb-xh2-pre { padding-left: 12px; font-size: 14px; color: #5f5f66; }
.hb-xh2-in { flex: 1; min-width: 0; height: 100%; padding: 0 12px; border: 0; outline: 0; background: transparent; color: #ededed; font: inherit; font-size: 14px; }
.hb-xh2-pre + .hb-xh2-in { padding-left: 2px; }
.hb-xh2-in::placeholder { color: #55555c; }
.hb-xh2-side { display: flex; align-items: center; padding-right: 10px; }
.hb-xh2-eye { display: grid; place-items: center; width: 28px; height: 28px; border: 0; border-radius: 8px; background: transparent; color: #7a7a82; cursor: pointer; transition: color 0.2s ease, background 0.2s ease; }
.hb-xh2-eye:hover { color: #ededed; background: #1d1d20; }
.hb-xh2-eye:focus-visible { outline: 2px solid var(--hb-xh2-a); outline-offset: 1px; }
.hb-xh2-eye svg { width: 17px; height: 17px; }
.hb-xh2-tag { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 500; white-space: nowrap; animation: hb-xh2-in 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh2-tag[data-tone="ok"] { color: #4ade80; }
.hb-xh2-tag[data-tone="bad"] { color: #ff8793; }
.hb-xh2-tag[data-tone="wait"] { color: #8f8f96; }
.hb-xh2-tag svg { width: 14px; height: 14px; }
.hb-xh2-ring { width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid #3a3a40; border-top-color: #b8b8c0; animation: hb-xh2-rot 0.7s linear infinite; }
.hb-xh2-msg { margin: 0; font-size: 12px; color: #ff8793; animation: hb-xh2-in 0.22s ease-out; }
.hb-xh2-hint { margin: 0; font-size: 12px; color: #8f8f96; animation: hb-xh2-in 0.22s ease-out; }
.hb-xh2-fix {
  padding: 0;
  border: 0;
  background: none;
  color: #c4b5fd;
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, #c4b5fd 40%, transparent);
  text-underline-offset: 3px;
}
.hb-xh2-fix:focus-visible { outline: 2px solid var(--hb-xh2-a); outline-offset: 2px; border-radius: 3px; }
.hb-xh2-rules { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-top: 2px; }
.hb-xh2-rule { display: grid; gap: 5px; }
.hb-xh2-bar { height: 3px; border-radius: 3px; background: #232327; overflow: hidden; }
.hb-xh2-bar i { display: block; height: 100%; width: 100%; background: var(--hb-xh2-s, #4ade80); transform-origin: left; transform: scaleX(0); transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease; }
.hb-xh2-rule[data-ok="true"] .hb-xh2-bar i { transform: scaleX(1); }
.hb-xh2-rule span { font-size: 10.5px; color: #6b6b72; transition: color 0.25s ease; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xh2-rule[data-ok="true"] span { color: #c9c9cf; }
.hb-xh2-check { display: flex; gap: 10px; align-items: flex-start; font-size: 12.5px; color: #9a9aa2; line-height: 1.45; cursor: pointer; }
.hb-xh2-check input { position: absolute; opacity: 0; pointer-events: none; }
.hb-xh2-tick { flex: none; display: grid; place-items: center; width: 18px; height: 18px; margin-top: 1px; border-radius: 6px; border: 1px solid #3a3a40; background: #131315; transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh2-tick svg { width: 12px; height: 12px; stroke: #fff; stroke-dasharray: 20; stroke-dashoffset: 20; transition: stroke-dashoffset 0.3s cubic-bezier(0.65, 0, 0.35, 1); }
.hb-xh2-check input:checked + .hb-xh2-tick { background: var(--hb-xh2-a); border-color: var(--hb-xh2-a); }
.hb-xh2-check input:checked + .hb-xh2-tick svg { stroke-dashoffset: 0; }
.hb-xh2-check:active .hb-xh2-tick { transform: scale(0.88); }
.hb-xh2-check input:focus-visible + .hb-xh2-tick { outline: 2px solid var(--hb-xh2-a); outline-offset: 2px; }
.hb-xh2-check[data-bad="true"] .hb-xh2-tick { border-color: #ef4f5f; }
.hb-xh2-check a { color: #d4d4d8; text-underline-offset: 2px; }
.hb-xh2-go {
  position: relative;
  overflow: hidden;
  height: 44px;
  border: 0;
  border-radius: 12px;
  background: #f4f4f5;
  color: #0a0a0a;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: inset 0 -2px 0 rgba(0,0,0,0.12), 0 8px 24px -10px color-mix(in srgb, var(--hb-xh2-a) 80%, transparent);
  transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), background 0.2s ease;
}
.hb-xh2-go::before { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 30%, rgba(139,92,246,0.25) 50%, transparent 70%); transform: translateX(-100%); transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh2-go:hover::before { transform: translateX(100%); }
.hb-xh2-go:hover { background: #fff; }
.hb-xh2-go:active { transform: scale(0.985); }
.hb-xh2-go:focus-visible { outline: 2px solid var(--hb-xh2-a); outline-offset: 3px; }
.hb-xh2-go[aria-busy="true"] { cursor: progress; }
.hb-xh2-gol { position: relative; display: inline-flex; align-items: center; gap: 8px; }
.hb-xh2-dots { display: inline-flex; gap: 4px; }
.hb-xh2-dots i { width: 5px; height: 5px; border-radius: 50%; background: #0a0a0a; animation: hb-xh2-bob 0.9s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
.hb-xh2-dots i:nth-child(2) { animation-delay: 0.12s; }
.hb-xh2-dots i:nth-child(3) { animation-delay: 0.24s; }
.hb-xh2-alt { margin: 2px 0 0; text-align: center; font-size: 12.5px; color: #7d7d85; }
.hb-xh2-alt a { color: #e4e4e7; text-decoration: none; font-weight: 500; }
.hb-xh2-alt a:hover { text-decoration: underline; text-underline-offset: 3px; }
.hb-xh2-done { display: grid; justify-items: center; text-align: center; gap: 8px; padding: 10px 0 4px; animation: hb-xh2-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh2-env { position: relative; width: 74px; height: 58px; margin-bottom: 8px; }
.hb-xh2-env svg { width: 100%; height: 100%; overflow: visible; }
.hb-xh2-env .hb-xh2-letter { animation: hb-xh2-letter 1.1s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both; }
.hb-xh2-env .hb-xh2-flap { transform-origin: 37px 14px; animation: hb-xh2-flap 0.6s cubic-bezier(0.65, 0, 0.35, 1) both; }
.hb-xh2-done h3 { margin: 0; font-size: 19px; font-weight: 600; letter-spacing: -0.02em; }
.hb-xh2-done p { margin: 0; font-size: 13px; color: #8f8f96; line-height: 1.5; }
.hb-xh2-done strong { color: #ededed; font-weight: 500; }
.hb-xh2-acts { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; justify-content: center; }
.hb-xh2-sec { height: 34px; padding: 0 12px; border: 1px solid #2a2a2e; border-radius: 10px; background: #151517; color: #d4d4d8; font: inherit; font-size: 12.5px; cursor: pointer; font-variant-numeric: tabular-nums; transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
.hb-xh2-sec:hover:not(:disabled) { background: #1c1c1f; border-color: #3a3a40; }
.hb-xh2-sec:disabled { color: #6b6b72; cursor: default; }
.hb-xh2-sec:focus-visible { outline: 2px solid var(--hb-xh2-a); outline-offset: 2px; }
@keyframes hb-xh2-in { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh2-rise { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: none; } }
@keyframes hb-xh2-rot { to { transform: rotate(360deg); } }
@keyframes hb-xh2-bob { 0%, 100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(-3px); opacity: 1; } }
@keyframes hb-xh2-flap { from { transform: scaleY(1); } to { transform: scaleY(-1); } }
@keyframes hb-xh2-letter { 0% { transform: translateY(14px); opacity: 0; } 100% { transform: translateY(-12px); opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xh2 *, .hb-xh2 *::before, .hb-xh2 *::after { animation: none !important; transition: none !important; }
  .hb-xh2-env .hb-xh2-flap { transform: scaleY(-1); }
  .hb-xh2-env .hb-xh2-letter { transform: translateY(-12px); }
}
`;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const userRe = /^[a-z0-9_]{3,20}$/;

function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

function hashText(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const rules = [
  { label: "8+ chars", test: (p: string) => p.length >= 8 },
  { label: "Number", test: (p: string) => /\d/.test(p) },
  { label: "Uppercase", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Symbol", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

const strengthColor = ["#ef4f5f", "#ef4f5f", "#f5a524", "#a3e635", "#4ade80"];

export function FormSignup({
  title = "Create your account",
  subtitle = "Free for 14 days. No credit card required.",
  brand = "Lumen",
  takenUsernames = ["admin", "maya", "lumen", "support", "root", "design"],
  emailDomains = ["gmail.com", "outlook.com", "yahoo.com", "icloud.com", "hotmail.com", "proton.me"],
  resendSeconds = 30,
  submitLabel = "Create account",
  accent = "#8b5cf6",
  delay = 1200,
  onSubmit,
  onResend,
  className,
  style,
  ...rest
}: FormSignupProps) {
  const uid = React.useId();
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [terms, setTerms] = React.useState(false);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [check, setCheck] = React.useState<"idle" | "checking" | "free" | "taken">("idle");
  const [status, setStatus] = React.useState<"idle" | "loading" | "sent">("idle");
  const [left, setLeft] = React.useState(0);
  const timer = React.useRef<number | undefined>(undefined);
  const tick = React.useRef<number | undefined>(undefined);
  const refs = React.useRef<Record<string, HTMLInputElement | null>>({});

  React.useEffect(() => () => {
    window.clearTimeout(timer.current);
    window.clearInterval(tick.current);
  }, []);

  const taken = React.useMemo(() => new Set(takenUsernames.map((t) => t.toLowerCase())), [takenUsernames]);

  const startCountdown = () => {
    window.clearInterval(tick.current);
    setLeft(resendSeconds);
    tick.current = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) window.clearInterval(tick.current);
        return Math.max(0, s - 1);
      });
    }, 1000);
  };

  const onUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
    setUsername(next);
    window.clearTimeout(timer.current);
    if (!userRe.test(next)) {
      setCheck("idle");
      return;
    }
    setCheck("checking");
    timer.current = window.setTimeout(() => setCheck(taken.has(next) ? "taken" : "free"), 650);
  };

  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  let suggestion = "";
  if (domain.includes(".") && !emailDomains.includes(domain)) {
    let best = "";
    let bestD = 3;
    for (const d of emailDomains) {
      const dd = distance(domain, d);
      if (dd < bestD) {
        best = d;
        bestD = dd;
      }
    }
    if (best) suggestion = `${email.split("@")[0]}@${best}`;
  }

  const passed = rules.filter((r) => r.test(password)).length;
  const errors: Record<string, string> = {};
  if (!emailRe.test(email.trim())) errors.email = email ? "Enter a complete email address." : "Email is required.";
  if (!userRe.test(username)) errors.username = "3 to 20 letters, numbers or underscores.";
  else if (check === "taken") errors.username = "That username is taken.";
  if (passed < 4) errors.password = "Your password needs all four checks.";
  if (!terms) errors.terms = "Please accept the terms to continue.";
  const show = (k: string) => (touched[k] ? errors[k] : undefined);
  const alt = `${username}${(hashText(username) % 89) + 10}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (Object.keys(errors).length || check === "checking") {
      setTouched({ email: true, username: true, password: true, terms: true });
      const first = ["email", "username", "password", "terms"].find((k) => errors[k]);
      if (first) refs.current[first]?.focus();
      return;
    }
    setStatus("loading");
    try {
      await Promise.all([Promise.resolve(onSubmit?.({ email: email.trim(), username, password })), new Promise((r) => window.setTimeout(r, delay))]);
      setStatus("sent");
      startCountdown();
    } catch {
      setStatus("idle");
    }
  };

  const userState = show("username") ? "bad" : check === "free" ? "good" : undefined;

  return (
    <div className={["hb-xh2", className].filter(Boolean).join(" ")} style={{ ...style, "--hb-xh2-a": accent } as React.CSSProperties} {...rest}>
      <style href="hb-form-signup" precedence="default">{css}</style>
      <div className="hb-xh2-card">
        {status === "sent" ? (
          <div className="hb-xh2-done" role="status">
            <div className="hb-xh2-env" aria-hidden="true">
              <svg viewBox="0 0 74 58">
                <rect className="hb-xh2-letter" x="14" y="10" width="46" height="34" rx="4" fill="#f4f4f5" />
                <path className="hb-xh2-letter" d="M22 20h24M22 27h30M22 34h18" stroke="#a1a1aa" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M4 18v32a4 4 0 0 0 4 4h58a4 4 0 0 0 4-4V18L37 38 4 18Z" fill={accent} />
                <path d="M4 50 30 32M70 50 44 32" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
                <path className="hb-xh2-flap" d="M4 18 37 38 70 18 37 14Z" fill="rgba(255,255,255,0.2)" />
              </svg>
            </div>
            <h3>Check your inbox</h3>
            <p>We sent a verification link to <strong>{email.trim()}</strong>. It expires in 24 hours.</p>
            <div className="hb-xh2-acts">
              <button
                type="button"
                className="hb-xh2-sec"
                disabled={left > 0}
                onClick={() => { onResend?.(email.trim()); startCountdown(); }}
              >
                {left > 0 ? `Resend in 0:${left.toString().padStart(2, "0")}` : "Resend email"}
              </button>
              <button type="button" className="hb-xh2-sec" onClick={() => { setStatus("idle"); window.clearInterval(tick.current); }}>
                Use a different email
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="hb-xh2-brand"><span className="hb-xh2-mark" aria-hidden="true" />{brand}</div>
            <h3 className="hb-xh2-title">{title}</h3>
            <p className="hb-xh2-sub">{subtitle}</p>
            <form className="hb-xh2-form" onSubmit={submit} noValidate>
              <div className="hb-xh2-field">
                <label className="hb-xh2-label" htmlFor={`${uid}-email`}>Email</label>
                <div className="hb-xh2-box" data-state={show("email") ? "bad" : undefined}>
                  <input
                    ref={(el) => { refs.current.email = el; }}
                    id={`${uid}-email`}
                    className="hb-xh2-in"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    aria-invalid={show("email") ? true : undefined}
                    aria-describedby={`${uid}-email-m`}
                  />
                </div>
                <div id={`${uid}-email-m`} aria-live="polite">
                  {suggestion ? (
                    <p className="hb-xh2-hint">
                      Did you mean{" "}
                      <button type="button" className="hb-xh2-fix" onClick={() => setEmail(suggestion)}>{suggestion}</button>?
                    </p>
                  ) : show("email") ? (
                    <p className="hb-xh2-msg">{show("email")}</p>
                  ) : null}
                </div>
              </div>
              <div className="hb-xh2-field">
                <label className="hb-xh2-label" htmlFor={`${uid}-user`}>Username</label>
                <div className="hb-xh2-box" data-state={userState}>
                  <span className="hb-xh2-pre" aria-hidden="true">{brand.toLowerCase().replace(/[^a-z0-9]/g, "")}.app/</span>
                  <input
                    ref={(el) => { refs.current.username = el; }}
                    id={`${uid}-user`}
                    className="hb-xh2-in"
                    autoComplete="username"
                    placeholder="maya_chen"
                    value={username}
                    onChange={onUser}
                    onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                    aria-invalid={show("username") ? true : undefined}
                    aria-describedby={`${uid}-user-m`}
                  />
                  <span className="hb-xh2-side" aria-live="polite">
                    {check === "checking" ? <span className="hb-xh2-tag" data-tone="wait"><span className="hb-xh2-ring" />Checking</span> : null}
                    {check === "free" ? (
                      <span className="hb-xh2-tag" data-tone="ok">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4 8.5 2.5 2.5L12 5.5" /></svg>
                        Available
                      </span>
                    ) : null}
                    {check === "taken" ? <span className="hb-xh2-tag" data-tone="bad">Taken</span> : null}
                  </span>
                </div>
                <div id={`${uid}-user-m`}>
                  {check === "taken" ? (
                    <p className="hb-xh2-hint">
                      Try{" "}
                      <button
                        type="button"
                        className="hb-xh2-fix"
                        onClick={() => { setUsername(alt); setCheck(taken.has(alt) ? "taken" : "free"); }}
                      >
                        {alt}
                      </button>{" "}
                      instead.
                    </p>
                  ) : show("username") ? <p className="hb-xh2-msg">{show("username")}</p> : null}
                </div>
              </div>
              <div className="hb-xh2-field">
                <label className="hb-xh2-label" htmlFor={`${uid}-pw`}>Password</label>
                <div className="hb-xh2-box" data-state={show("password") ? "bad" : passed === 4 ? "good" : undefined}>
                  <input
                    ref={(el) => { refs.current.password = el; }}
                    id={`${uid}-pw`}
                    className="hb-xh2-in"
                    type={visible ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    aria-invalid={show("password") ? true : undefined}
                    aria-describedby={`${uid}-pw-r`}
                  />
                  <span className="hb-xh2-side">
                    <button type="button" className="hb-xh2-eye" onClick={() => setVisible((v) => !v)} aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                        {visible ? null : <path d="M4 4l16 16" />}
                      </svg>
                    </button>
                  </span>
                </div>
                <div className="hb-xh2-rules" id={`${uid}-pw-r`} style={{ "--hb-xh2-s": strengthColor[passed] } as React.CSSProperties}>
                  {rules.map((r) => (
                    <div key={r.label} className="hb-xh2-rule" data-ok={r.test(password)}>
                      <span className="hb-xh2-bar"><i /></span>
                      <span>{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <label className="hb-xh2-check" data-bad={show("terms") ? true : undefined}>
                <input
                  ref={(el) => { refs.current.terms = el; }}
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  aria-invalid={show("terms") ? true : undefined}
                />
                <span className="hb-xh2-tick" aria-hidden="true">
                  <svg viewBox="0 0 12 12" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2.5 6.2 2.3 2.3 4.7-5" /></svg>
                </span>
                <span>I agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</span>
              </label>
              <button type="submit" className="hb-xh2-go" aria-busy={status === "loading"}>
                <span className="hb-xh2-gol">
                  {status === "loading" ? (
                    <>
                      Creating account
                      <span className="hb-xh2-dots" aria-hidden="true"><i /><i /><i /></span>
                    </>
                  ) : submitLabel}
                </span>
              </button>
              <p className="hb-xh2-alt">Already have an account? <a href="#signin">Sign in</a></p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
