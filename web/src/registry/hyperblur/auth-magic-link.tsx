"use client";

import * as React from "react";

export interface AuthMagicLinkLink {
  label: string;
  href: string;
}

export interface AuthMagicLinkValues {
  email: string;
}

export interface AuthMagicLinkProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: string;
  title?: string;
  subtitle?: string;
  notes?: string[];
  expiresIn?: string;
  resendSeconds?: number;
  defaultEmail?: string;
  alternate?: AuthMagicLinkLink | null;
  onSubmit?: (values: AuthMagicLinkValues) => void | Promise<unknown>;
  onResend?: (email: string) => void | Promise<unknown>;
  accent?: string;
}

const css = `
@keyframes hb-kf4-float {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(var(--hb-kf4-r, 0deg)); }
  50% { transform: translate3d(0, -8px, 0) rotate(var(--hb-kf4-r, 0deg)); }
}
@keyframes hb-kf4-letter {
  0% { transform: translateY(-46px); }
  55% { transform: translateY(-46px); }
  100% { transform: translateY(0); }
}
@keyframes hb-kf4-flap-back {
  0%, 60% { transform: scaleY(-1); }
  78% { transform: scaleY(0); }
  100% { transform: scaleY(0); }
}
@keyframes hb-kf4-flap-front {
  0%, 78% { transform: scaleY(0); }
  100% { transform: scaleY(1); }
}
@keyframes hb-kf4-bounce {
  0%, 100% { transform: translateY(0) rotate(0); }
  30% { transform: translateY(-10px) rotate(-3deg); }
  60% { transform: translateY(0) rotate(1.5deg); }
}
@keyframes hb-kf4-hover {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
@keyframes hb-kf4-pop {
  from { opacity: 0; transform: scale(.4); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes hb-kf4-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-kf4-spin { to { transform: rotate(360deg); } }
.hb-kf4 {
  --hb-kf4-accent: #2f7bff;
  --hb-kf4-ink: #171512;
  --hb-kf4-muted: #6b675e;
  --hb-kf4-line: rgba(23, 21, 18, .1);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 72px 16px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #f7f5ef;
  color: var(--hb-kf4-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kf4 *, .hb-kf4 *::before, .hb-kf4 *::after { box-sizing: border-box; }
.hb-kf4::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(var(--hb-kf4-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--hb-kf4-line) 1px, transparent 1px);
  background-size: 56px 56px;
  background-position: center top;
  opacity: .55;
  -webkit-mask-image: radial-gradient(ellipse 60% 70% at 50% 45%, #000 20%, transparent 80%);
  mask-image: radial-gradient(ellipse 60% 70% at 50% 45%, #000 20%, transparent 80%);
}
.hb-kf4::after {
  content: "";
  position: absolute;
  top: 18%;
  left: 50%;
  z-index: -1;
  width: 640px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kf4-accent) 18%, transparent), transparent);
  transform: translateX(-50%);
}
.hb-kf4-stage { position: relative; display: flex; justify-content: center; max-width: 1120px; margin: 0 auto; }
.hb-kf4-note {
  position: absolute;
  display: none;
  align-items: center;
  gap: 8px;
  padding: 9px 14px 9px 10px;
  border: 1px solid var(--hb-kf4-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, .8);
  box-shadow: 0 12px 30px -16px rgba(23, 21, 18, .35);
  color: var(--hb-kf4-ink);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  animation: hb-kf4-float 7s ease-in-out infinite;
}
.hb-kf4-note i {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--hb-kf4-accent) 14%, #fff);
  color: var(--hb-kf4-accent);
  font-style: normal;
}
.hb-kf4-note[data-n="0"] { top: 64px; left: 2%; --hb-kf4-r: -3deg; }
.hb-kf4-note[data-n="1"] { top: 220px; right: 1%; --hb-kf4-r: 2.5deg; animation-delay: -2.5s; }
.hb-kf4-note[data-n="2"] { bottom: 56px; left: 7%; --hb-kf4-r: 2deg; animation-delay: -4.5s; }
.hb-kf4-card {
  position: relative;
  display: grid;
  width: 100%;
  max-width: 452px;
  padding: 36px 28px 28px;
  border: 1px solid var(--hb-kf4-line);
  border-radius: 26px;
  background: #fff;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .9) inset, 0 30px 70px -36px rgba(23, 21, 18, .35), 0 2px 6px rgba(23, 21, 18, .04);
}
.hb-kf4-state {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: opacity .45s ease, transform .55s cubic-bezier(.2, .8, .2, 1), filter .45s ease, visibility 0s linear 0s;
}
.hb-kf4-state[data-on="false"] { visibility: hidden; opacity: 0; filter: blur(6px); transition: opacity .3s ease, transform .4s ease, filter .3s ease, visibility 0s linear .4s; }
.hb-kf4-state[data-s="form"][data-on="false"] { transform: scale(.96) translateY(-10px); }
.hb-kf4-state[data-s="sent"][data-on="false"] { transform: scale(1.03) translateY(10px); }
.hb-kf4-logo { display: flex; align-items: center; gap: 9px; margin-bottom: 30px; font-size: 15px; font-weight: 650; letter-spacing: -.01em; }
.hb-kf4-mark { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 9px; background: var(--hb-kf4-ink); color: #f7f5ef; }
.hb-kf4-title { margin: 0; font-size: clamp(26px, 5cqw, 32px); font-weight: 650; line-height: 1.12; letter-spacing: -.035em; text-wrap: balance; }
.hb-kf4-sub { margin: 10px 0 26px; color: var(--hb-kf4-muted); font-size: 15px; line-height: 1.55; }
.hb-kf4-form { display: flex; flex-direction: column; gap: 12px; margin: 0; }
.hb-kf4-label { font-size: 13px; font-weight: 600; }
.hb-kf4-input {
  display: block;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid rgba(23, 21, 18, .16);
  border-radius: 14px;
  background: #fbfaf7;
  color: var(--hb-kf4-ink);
  font: inherit;
  font-size: 15px;
  outline: none;
  transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
}
.hb-kf4-input::placeholder { color: #a29d92; }
.hb-kf4-input:hover { border-color: rgba(23, 21, 18, .28); }
.hb-kf4-input:focus { border-color: var(--hb-kf4-accent); background: #fff; box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kf4-accent) 18%, transparent); }
.hb-kf4-input[aria-invalid="true"] { border-color: #dc2626; }
.hb-kf4-input[aria-invalid="true"]:focus { box-shadow: 0 0 0 4px rgba(220, 38, 38, .14); }
.hb-kf4-err { display: flex; align-items: center; gap: 6px; margin: -2px 0 0; color: #b91c1c; font-size: 13px; animation: hb-kf4-in .2s ease both; }
.hb-kf4-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 48px;
  margin-top: 4px;
  overflow: hidden;
  border: 0;
  border-radius: 14px;
  background: var(--hb-kf4-ink);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .18), 0 10px 24px -12px rgba(23, 21, 18, .6);
  color: #fff;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .2s ease, background .2s ease;
}
.hb-kf4-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, .22) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform .7s ease;
}
.hb-kf4-btn:hover:not(:disabled)::after { transform: translateX(100%); }
.hb-kf4-btn:hover:not(:disabled) { background: color-mix(in srgb, var(--hb-kf4-ink) 88%, var(--hb-kf4-accent)); }
.hb-kf4-btn:active:not(:disabled) { transform: translateY(1px); }
.hb-kf4-btn:disabled { cursor: progress; opacity: .85; }
.hb-kf4-btn:focus-visible { outline: 2px solid var(--hb-kf4-accent); outline-offset: 3px; }
.hb-kf4-spin { width: 16px; height: 16px; border: 2px solid rgba(255, 255, 255, .35); border-top-color: #fff; border-radius: 50%; animation: hb-kf4-spin .7s linear infinite; }
.hb-kf4-alert { margin: 0; padding: 10px 12px; border: 1px solid rgba(220, 38, 38, .25); border-radius: 12px; background: #fef2f2; color: #991b1b; font-size: 13px; }
.hb-kf4-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--hb-kf4-line); color: var(--hb-kf4-muted); font-size: 13px; }
.hb-kf4-a { color: var(--hb-kf4-ink); font-weight: 600; text-decoration: underline; text-decoration-color: rgba(23, 21, 18, .25); text-underline-offset: 3px; border-radius: 4px; }
.hb-kf4-a:hover { text-decoration-color: currentColor; }
.hb-kf4-a:focus-visible { outline: 2px solid var(--hb-kf4-accent); outline-offset: 2px; }
.hb-kf4-env { display: grid; place-items: center; height: 150px; margin: -6px 0 18px; }
.hb-kf4-env svg { overflow: visible; }
.hb-kf4-env-wrap { position: relative; }
.hb-kf4-env-body { transform-box: fill-box; transform-origin: center bottom; }
.hb-kf4-letter { transform: translateY(-46px); }
.hb-kf4-flap-back { transform-box: fill-box; transform-origin: center top; transform: scaleY(-1); }
.hb-kf4-flap-front { transform-box: fill-box; transform-origin: center top; transform: scaleY(0); }
.hb-kf4-badge { transform-box: fill-box; transform-origin: center; opacity: 0; }
.hb-kf4[data-sent="true"] .hb-kf4-letter { animation: hb-kf4-letter 1s cubic-bezier(.5, 0, .2, 1) both; }
.hb-kf4[data-sent="true"] .hb-kf4-flap-back { animation: hb-kf4-flap-back 1.25s ease both; }
.hb-kf4[data-sent="true"] .hb-kf4-flap-front { animation: hb-kf4-flap-front 1.25s ease both; }
.hb-kf4[data-sent="true"] .hb-kf4-env-body { animation: hb-kf4-bounce .6s 1.25s ease both, hb-kf4-hover 4s 2s ease-in-out infinite; }
.hb-kf4[data-sent="true"] .hb-kf4-badge { animation: hb-kf4-pop .4s 1.45s cubic-bezier(.2, 1.4, .4, 1) both; }
.hb-kf4-sent-title { margin: 0; font-size: 26px; font-weight: 650; letter-spacing: -.03em; text-align: center; outline: none; }
.hb-kf4-sent-sub { margin: 10px 0 0; color: var(--hb-kf4-muted); font-size: 15px; line-height: 1.6; text-align: center; }
.hb-kf4-sent-sub strong { color: var(--hb-kf4-ink); font-weight: 600; overflow-wrap: anywhere; }
.hb-kf4-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; }
.hb-kf4-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  border: 1px solid rgba(23, 21, 18, .14);
  border-radius: 12px;
  background: #fff;
  color: var(--hb-kf4-ink);
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease;
}
.hb-kf4-ghost:hover:not(:disabled) { background: #f7f5ef; border-color: rgba(23, 21, 18, .24); }
.hb-kf4-ghost:disabled { color: var(--hb-kf4-muted); cursor: default; }
.hb-kf4-ghost:focus-visible { outline: 2px solid var(--hb-kf4-accent); outline-offset: 2px; }
.hb-kf4-text { padding: 6px; border: 0; border-radius: 8px; background: transparent; color: var(--hb-kf4-muted); font: inherit; font-size: 13px; cursor: pointer; }
.hb-kf4-text:hover { color: var(--hb-kf4-ink); text-decoration: underline; text-underline-offset: 3px; }
.hb-kf4-text:focus-visible { outline: 2px solid var(--hb-kf4-accent); outline-offset: 1px; }
.hb-kf4-toast { min-height: 18px; margin: 12px 0 0; color: #15803d; font-size: 13px; text-align: center; }
.hb-kf4-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (min-width: 860px) {
  .hb-kf4 { padding: 104px 24px; }
  .hb-kf4-note { display: inline-flex; }
  .hb-kf4-card { padding: 44px 40px 32px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kf4-note, .hb-kf4-err { animation: none; }
  .hb-kf4-state, .hb-kf4-input, .hb-kf4-btn, .hb-kf4-btn::after, .hb-kf4-ghost { transition: none; }
  .hb-kf4[data-sent="true"] .hb-kf4-letter,
  .hb-kf4[data-sent="true"] .hb-kf4-flap-back,
  .hb-kf4[data-sent="true"] .hb-kf4-flap-front,
  .hb-kf4[data-sent="true"] .hb-kf4-env-body,
  .hb-kf4[data-sent="true"] .hb-kf4-badge { animation: none; }
  .hb-kf4[data-sent="true"] .hb-kf4-letter { transform: none; }
  .hb-kf4[data-sent="true"] .hb-kf4-flap-back { transform: scaleY(0); }
  .hb-kf4[data-sent="true"] .hb-kf4-flap-front { transform: none; }
  .hb-kf4[data-sent="true"] .hb-kf4-badge { opacity: 1; }
  .hb-kf4-spin { animation-duration: 2s; }
}
`;

const defaultNotes = ["No password to remember", "Link expires in 15 minutes", "Works on every device"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise((resolve) => setTimeout(resolve, 900));
}

function NoteIcon({ index }: { index: number }) {
  const paths = ["M5 8.5 7 10.5l4-5", "M8 4.5V8l2.2 1.4M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z", "M5 2.5h6a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1ZM7 11.5h2"];
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[index % paths.length]} />
    </svg>
  );
}

function Envelope() {
  return (
    <svg width="168" height="124" viewBox="0 0 168 124" fill="none" aria-hidden="true">
      <ellipse cx="84" cy="118" rx="54" ry="5" fill="rgba(23,21,18,.08)" />
      <g className="hb-kf4-env-body">
        <rect x="20" y="40" width="128" height="76" rx="10" fill="#efe9dc" stroke="rgba(23,21,18,.14)" />
        <path className="hb-kf4-flap-back" d="M20.5 41.5 84 84l63.5-42.5Z" fill="#e4dccb" stroke="rgba(23,21,18,.12)" strokeLinejoin="round" />
        <g className="hb-kf4-letter">
          <rect x="34" y="24" width="100" height="70" rx="6" fill="#fff" stroke="rgba(23,21,18,.12)" />
          <rect x="46" y="38" width="44" height="6" rx="3" fill="var(--hb-kf4-accent)" />
          <rect x="46" y="52" width="76" height="4" rx="2" fill="rgba(23,21,18,.14)" />
          <rect x="46" y="62" width="60" height="4" rx="2" fill="rgba(23,21,18,.14)" />
        </g>
        <path d="M20 50v56a10 10 0 0 0 10 10h108a10 10 0 0 0 10-10V50L84 88 20 50Z" fill="#f3eee3" stroke="rgba(23,21,18,.14)" strokeLinejoin="round" />
        <path d="M24 112 70 79M144 112 98 79" stroke="rgba(23,21,18,.1)" />
        <path className="hb-kf4-flap-front" d="M20.5 41.5 84 84l63.5-42.5Z" fill="#ebe4d5" stroke="rgba(23,21,18,.14)" strokeLinejoin="round" />
        <g className="hb-kf4-badge">
          <circle cx="140" cy="44" r="15" fill="var(--hb-kf4-accent)" stroke="#fff" strokeWidth="3" />
          <path d="m133.5 44.3 4.3 4.2 8-8.3" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

export function AuthMagicLink({
  brand = "Northwind",
  title = "Sign in with a link, not a password",
  subtitle = "Enter your work email and we'll send you a secure link that signs you in instantly.",
  notes = defaultNotes,
  expiresIn = "15 minutes",
  resendSeconds = 30,
  defaultEmail = "",
  alternate = { label: "Use single sign-on", href: "#sso" },
  onSubmit,
  onResend,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: AuthMagicLinkProps) {
  const uid = React.useId();
  const [email, setEmail] = React.useState(defaultEmail);
  const [touched, setTouched] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "sent">("idle");
  const [formError, setFormError] = React.useState("");
  const [left, setLeft] = React.useState(0);
  const [resending, setResending] = React.useState(false);
  const [toast, setToast] = React.useState("");
  const [round, setRound] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const sentTitleRef = React.useRef<HTMLHeadingElement>(null);
  const moved = React.useRef<"sent" | "form" | null>(null);

  React.useEffect(() => {
    if (left <= 0) return;
    const id = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [left]);

  React.useEffect(() => {
    const target = moved.current;
    if (!target) return;
    moved.current = null;
    if (target === "sent") sentTitleRef.current?.focus();
    else inputRef.current?.focus();
  }, [status]);

  const value = email.trim();
  const emailError = !value ? "Enter your email address." : !emailPattern.test(value) ? "Check the email format, like maya@northwind.io." : "";
  const showError = (touched || submitted) && emailError;
  const loading = status === "loading";
  const sent = status === "sent";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setSubmitted(true);
    setFormError("");
    if (emailError) {
      inputRef.current?.focus();
      return;
    }
    setStatus("loading");
    try {
      await wait(onSubmit?.({ email: value }));
      moved.current = "sent";
      setToast("");
      setLeft(resendSeconds);
      setRound((r) => r + 1);
      setStatus("sent");
    } catch (error) {
      setStatus("idle");
      setFormError(error instanceof Error && error.message ? error.message : "We couldn't send the link. Try again in a moment.");
    }
  }

  async function resend() {
    if (left > 0 || resending) return;
    setResending(true);
    setToast("");
    try {
      await wait(onResend?.(value));
      setToast(`A fresh link is on its way to ${value}.`);
      setLeft(resendSeconds);
      setRound((r) => r + 1);
    } catch {
      setToast("Couldn't resend right now. Try again shortly.");
    }
    setResending(false);
  }

  function changeEmail() {
    moved.current = "form";
    setStatus("idle");
    setSubmitted(false);
    setTouched(false);
  }

  const vars = { "--hb-kf4-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kf4 ${className}`} style={vars} data-sent={sent ? "true" : undefined} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-auth-magic-link" precedence="default">{css}</style>
      <div className="hb-kf4-stage">
        {notes.slice(0, 3).map((note, i) => (
          <span className="hb-kf4-note" data-n={i} key={note} aria-hidden="true">
            <i>
              <NoteIcon index={i} />
            </i>
            {note}
          </span>
        ))}
        <div className="hb-kf4-card">
          <div className="hb-kf4-state" data-s="form" data-on={sent ? "false" : "true"} inert={sent}>
            <div className="hb-kf4-logo">
              <span className="hb-kf4-mark" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.5 13.5V2.5h2.6l5.8 7V2.5h2.6v11h-2.6l-5.8-7v7H2.5Z" />
                </svg>
              </span>
              {brand}
            </div>
            <h2 className="hb-kf4-title" id={sent ? undefined : `${uid}-t`}>
              {title}
            </h2>
            <p className="hb-kf4-sub">{subtitle}</p>
            <form className="hb-kf4-form" noValidate onSubmit={handleSubmit} aria-busy={loading || undefined}>
              {formError ? (
                <p className="hb-kf4-alert" role="alert">
                  {formError}
                </p>
              ) : null}
              <label className="hb-kf4-label" htmlFor={`${uid}-email`}>
                Work email
              </label>
              <input
                ref={inputRef}
                id={`${uid}-email`}
                className="hb-kf4-input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="maya@northwind.io"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                aria-invalid={showError ? true : undefined}
                aria-describedby={showError ? `${uid}-err` : undefined}
              />
              {showError ? (
                <p className="hb-kf4-err" id={`${uid}-err`}>
                  {emailError}
                </p>
              ) : null}
              <button type="submit" className="hb-kf4-btn" disabled={loading}>
                {loading ? <span className="hb-kf4-spin" aria-hidden="true" /> : null}
                {loading ? "Sending your link" : "Email me a sign-in link"}
              </button>
              <span className="hb-kf4-sr" role="status">
                {loading ? "Sending your link" : ""}
              </span>
            </form>
            <div className="hb-kf4-foot">
              <span>Links expire after {expiresIn}.</span>
              {alternate ? (
                <a className="hb-kf4-a" href={alternate.href}>
                  {alternate.label}
                </a>
              ) : null}
            </div>
          </div>
          <div className="hb-kf4-state" data-s="sent" data-on={sent ? "true" : "false"} inert={!sent}>
            <div className="hb-kf4-env">
              <div className="hb-kf4-env-wrap" key={round}>
                <Envelope />
              </div>
            </div>
            <h2 className="hb-kf4-sent-title" id={sent ? `${uid}-t` : undefined} ref={sentTitleRef} tabIndex={-1}>
              Check your inbox
            </h2>
            <p className="hb-kf4-sent-sub">
              We sent a sign-in link to <strong>{value || "your email"}</strong>. It expires in {expiresIn}.
            </p>
            <div className="hb-kf4-actions">
              <button type="button" className="hb-kf4-ghost" disabled={left > 0 || resending} onClick={resend}>
                {resending ? "Resending" : left > 0 ? `Resend link in ${left}s` : "Resend link"}
              </button>
              <button type="button" className="hb-kf4-text" onClick={changeEmail}>
                Use a different email
              </button>
            </div>
            <p className="hb-kf4-toast" aria-live="polite">
              {toast}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
