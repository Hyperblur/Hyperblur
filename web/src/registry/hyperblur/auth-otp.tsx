"use client";

import * as React from "react";

export interface AuthOtpLink {
  label: string;
  href: string;
}

export interface AuthOtpProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "defaultValue"> {
  title?: string;
  destination?: string;
  length?: number;
  defaultValue?: string;
  resendSeconds?: number;
  maxAttempts?: number;
  onVerify?: (code: string) => boolean | void | Promise<boolean | void>;
  onResend?: () => void;
  changeHref?: string;
  alternate?: AuthOtpLink | null;
  successCta?: AuthOtpLink;
  accent?: string;
}

const css = `
@keyframes hb-kf3-ring {
  0% { opacity: .55; transform: translate(-50%, -50%) scale(.35); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
}
@keyframes hb-kf3-shake-a {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-9px); }
  30% { transform: translateX(8px); }
  45% { transform: translateX(-6px); }
  60% { transform: translateX(4px); }
  75% { transform: translateX(-2px); }
}
@keyframes hb-kf3-shake-b {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-9px); }
  30% { transform: translateX(8px); }
  45% { transform: translateX(-6px); }
  60% { transform: translateX(4px); }
  75% { transform: translateX(-2px); }
}
@keyframes hb-kf3-pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.08); }
  100% { transform: scale(1); }
}
@keyframes hb-kf3-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-kf3-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-kf3-spin { to { transform: rotate(360deg); } }
@keyframes hb-kf3-badge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.hb-kf3 {
  --hb-kf3-accent: #f5a524;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 72px 16px 72px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kf3 *, .hb-kf3 *::before, .hb-kf3 *::after { box-sizing: border-box; }
.hb-kf3::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse 50% 40% at 50% 26%, color-mix(in srgb, var(--hb-kf3-accent) 16%, transparent), transparent 70%),
    linear-gradient(180deg, #0a0a0a, #0c0b09 60%, #0a0a0a);
}
.hb-kf3-rings { position: absolute; top: 132px; left: 50%; z-index: -1; width: 0; height: 0; pointer-events: none; }
.hb-kf3-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 560px;
  height: 560px;
  border: 1px solid color-mix(in srgb, var(--hb-kf3-accent) 45%, transparent);
  border-radius: 50%;
  animation: hb-kf3-ring 6s cubic-bezier(.2, .6, .3, 1) infinite;
}
.hb-kf3-ring:nth-child(2) { animation-delay: 2s; }
.hb-kf3-ring:nth-child(3) { animation-delay: 4s; }
.hb-kf3-static {
  position: absolute;
  top: 0;
  left: 0;
  border: 1px dashed rgba(255, 255, 255, .06);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.hb-kf3-inner { display: flex; flex-direction: column; align-items: center; max-width: 520px; margin: 0 auto; text-align: center; }
.hb-kf3-badge {
  position: relative;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  margin-bottom: 28px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 24px;
  background: linear-gradient(160deg, #1c1a16, #0f0e0c);
  box-shadow: 0 20px 50px -18px color-mix(in srgb, var(--hb-kf3-accent) 60%, transparent), inset 0 1px 0 rgba(255, 255, 255, .1);
  color: var(--hb-kf3-accent);
  animation: hb-kf3-badge 5s ease-in-out infinite;
}
.hb-kf3-badge::after {
  content: "";
  position: absolute;
  top: -5px;
  right: -5px;
  width: 16px;
  height: 16px;
  border: 3px solid #0a0a0a;
  border-radius: 50%;
  background: var(--hb-kf3-accent);
}
.hb-kf3[data-status="success"] .hb-kf3-badge { color: #4ade80; }
.hb-kf3[data-status="success"] .hb-kf3-badge::after { background: #4ade80; }
.hb-kf3-title { margin: 0; font-size: clamp(26px, 5cqw, 36px); font-weight: 650; letter-spacing: -.03em; line-height: 1.1; }
.hb-kf3-sub { margin: 12px 0 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-kf3-sub strong { color: #ededed; font-weight: 550; white-space: nowrap; }
.hb-kf3-a { color: var(--hb-kf3-accent); font-weight: 550; text-decoration: none; border-radius: 4px; }
.hb-kf3-a:hover { text-decoration: underline; text-underline-offset: 3px; }
.hb-kf3-a:focus-visible { outline: 2px solid var(--hb-kf3-accent); outline-offset: 2px; }
.hb-kf3-form { display: flex; flex-direction: column; align-items: center; width: 100%; margin: 36px 0 0; }
.hb-kf3-cells { display: flex; justify-content: center; gap: clamp(6px, 1.6cqw, 12px); width: 100%; }
.hb-kf3-cells[data-shake="a"] { animation: hb-kf3-shake-a .45s ease both; }
.hb-kf3-cells[data-shake="b"] { animation: hb-kf3-shake-b .45s ease both; }
.hb-kf3-gap { align-self: center; width: 10px; height: 2px; border-radius: 2px; background: rgba(255, 255, 255, .18); }
.hb-kf3-cell {
  flex: 0 1 56px;
  width: 100%;
  min-width: 0;
  height: clamp(54px, 13cqw, 66px);
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 14px;
  background: linear-gradient(180deg, #141414, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
  color: #fff;
  caret-color: var(--hb-kf3-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: clamp(22px, 5cqw, 28px);
  font-weight: 600;
  text-align: center;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease, background .3s ease, color .3s ease;
}
.hb-kf3-cell:hover { border-color: rgba(255, 255, 255, .2); }
.hb-kf3-cell:focus { border-color: var(--hb-kf3-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kf3-accent) 22%, transparent); }
.hb-kf3-cell[data-filled="true"] { border-color: rgba(255, 255, 255, .24); animation: hb-kf3-pop .2s ease; }
.hb-kf3-cell[aria-invalid="true"] { border-color: #f87171; color: #fca5a5; }
.hb-kf3-cell:disabled { opacity: 1; cursor: default; }
.hb-kf3[data-status="success"] .hb-kf3-cell {
  border-color: rgba(74, 222, 128, .6);
  background: linear-gradient(180deg, rgba(74, 222, 128, .14), rgba(74, 222, 128, .05));
  color: #bbf7d0;
  transition-delay: calc(var(--hb-kf3-i) * 60ms);
}
.hb-kf3-msg { min-height: 20px; margin: 14px 0 0; font-size: 13px; color: #8f8f8f; }
.hb-kf3-msg[data-tone="error"] { color: #fca5a5; animation: hb-kf3-in .2s ease both; }
.hb-kf3-msg[data-tone="info"] { color: var(--hb-kf3-accent); animation: hb-kf3-in .2s ease both; }
.hb-kf3-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 360px;
  height: 46px;
  margin-top: 14px;
  border: 0;
  border-radius: 12px;
  background: var(--hb-kf3-accent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .4), 0 12px 30px -14px var(--hb-kf3-accent);
  color: #1a1204;
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  cursor: pointer;
  transition: filter .2s ease, opacity .2s ease, transform .2s ease;
}
.hb-kf3-btn:hover:not(:disabled) { filter: brightness(1.08); }
.hb-kf3-btn:active:not(:disabled) { transform: translateY(1px); }
.hb-kf3-btn:disabled { opacity: .45; cursor: not-allowed; }
.hb-kf3-btn[aria-busy="true"] { opacity: .85; cursor: progress; }
.hb-kf3-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-kf3-spin { width: 15px; height: 15px; border: 2px solid rgba(26, 18, 4, .3); border-top-color: #1a1204; border-radius: 50%; animation: hb-kf3-spin .7s linear infinite; }
.hb-kf3-resend { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 22px; color: #8f8f8f; font-size: 13px; }
.hb-kf3-link {
  padding: 2px 4px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-weight: 550;
  cursor: pointer;
}
.hb-kf3-link:hover { color: var(--hb-kf3-accent); }
.hb-kf3-link:focus-visible { outline: 2px solid var(--hb-kf3-accent); outline-offset: 1px; }
.hb-kf3-timer {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: #ededed;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.hb-kf3-timer svg { color: var(--hb-kf3-accent); }
.hb-kf3-alt { margin: 28px 0 0; padding-top: 22px; border-top: 1px solid rgba(255, 255, 255, .07); color: #6f6f6f; font-size: 13px; width: 100%; max-width: 360px; }
.hb-kf3-done { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-top: 22px; animation: hb-kf3-in .35s .25s ease both; }
.hb-kf3-done svg circle { stroke-dasharray: 76; stroke-dashoffset: 76; animation: hb-kf3-draw .5s .3s ease forwards; }
.hb-kf3-done svg path { stroke-dasharray: 20; stroke-dashoffset: 20; animation: hb-kf3-draw .3s .7s ease forwards; }
.hb-kf3-done strong { font-size: 16px; font-weight: 600; }
.hb-kf3-done span { color: #8f8f8f; font-size: 13px; }
.hb-kf3-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (min-width: 720px) {
  .hb-kf3 { padding: 104px 24px 112px; }
  .hb-kf3-rings { top: 142px; }
}
@container (max-width: 380px) {
  .hb-kf3-gap { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kf3-ring, .hb-kf3-badge, .hb-kf3-cells[data-shake], .hb-kf3-cell[data-filled="true"], .hb-kf3-msg, .hb-kf3-done, .hb-kf3-done svg circle, .hb-kf3-done svg path { animation: none; }
  .hb-kf3-done svg circle, .hb-kf3-done svg path { stroke-dashoffset: 0; }
  .hb-kf3-cell, .hb-kf3-btn { transition: none; }
  .hb-kf3-spin { animation-duration: 2s; }
}
`;

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise<unknown>((resolve) => setTimeout(() => resolve(result), 800));
}

function toDigits(value: string, length: number) {
  const clean = value.replace(/\D/g, "").slice(0, length);
  return Array.from({ length }, (_, i) => clean[i] ?? "");
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type Status = "idle" | "verifying" | "error" | "locked" | "success";

export function AuthOtp({
  title = "Check your phone",
  destination = "+1 (415) ••• ••92",
  length = 6,
  defaultValue = "",
  resendSeconds = 30,
  maxAttempts = 5,
  onVerify,
  onResend,
  changeHref = "#change-number",
  alternate = { label: "Use an authenticator app", href: "#authenticator" },
  successCta = { label: "Continue to Northwind", href: "#continue" },
  accent = "#f5a524",
  className = "",
  style,
  ...rest
}: AuthOtpProps) {
  const uid = React.useId();
  const [digits, setDigits] = React.useState(() => toDigits(defaultValue, length));
  const [status, setStatus] = React.useState<Status>("idle");
  const [shake, setShake] = React.useState<"a" | "b" | "">("");
  const [attempts, setAttempts] = React.useState(maxAttempts);
  const [left, setLeft] = React.useState(resendSeconds);
  const [notice, setNotice] = React.useState("");
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const code = digits.join("");
  const complete = code.length === length;
  const busy = status === "verifying";
  const locked = status === "locked";
  const success = status === "success";

  React.useEffect(() => {
    if (left <= 0) return;
    const id = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [left]);

  function focusAt(index: number) {
    const target = refs.current[Math.max(0, Math.min(length - 1, index))];
    if (target) {
      target.focus();
      target.select();
    }
  }

  async function verify(value: string) {
    if (busy || success || locked) return;
    setStatus("verifying");
    setNotice("");
    let ok = false;
    let message = "";
    try {
      const result = await wait(onVerify ? onVerify(value) : true);
      ok = result !== false;
    } catch (error) {
      message = error instanceof Error ? error.message : "";
    }
    if (ok) {
      setStatus("success");
      return;
    }
    const remaining = attempts - 1;
    setAttempts(remaining);
    setShake((s) => (s === "a" ? "b" : "a"));
    setDigits(Array.from({ length }, () => ""));
    if (remaining <= 0) {
      setStatus("locked");
      setNotice("Too many attempts. Request a new code to try again.");
      return;
    }
    setStatus("error");
    setNotice(message || `That code doesn't match. ${remaining} ${remaining === 1 ? "attempt" : "attempts"} left.`);
    window.setTimeout(() => focusAt(0), 0);
  }

  function commit(next: string[], focusIndex: number) {
    setDigits(next);
    if (status === "error") {
      setStatus("idle");
      setNotice("");
    }
    if (next.every(Boolean)) {
      refs.current[focusIndex]?.blur();
      void verify(next.join(""));
    } else {
      focusAt(focusIndex);
    }
  }

  function fill(from: number, text: string) {
    const clean = text.replace(/\D/g, "");
    if (!clean) return;
    const next = [...digits];
    let last = from;
    for (let k = 0; k < clean.length && from + k < length; k++) {
      next[from + k] = clean[k];
      last = from + k;
    }
    commit(next, Math.min(last + 1, length - 1));
  }

  function handleChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    let raw = event.target.value.replace(/\D/g, "");
    if (raw.length === 2 && digits[index]) raw = raw[0] === digits[index] ? raw[1] : raw[0];
    if (raw.length > 1) {
      fill(index, raw);
      return;
    }
    const next = [...digits];
    next[index] = raw;
    if (raw) commit(next, Math.min(index + 1, length - 1));
    else setDigits(next);
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      const next = [...digits];
      if (next[index]) {
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        next[index - 1] = "";
        setDigits(next);
        focusAt(index - 1);
      }
    } else if (event.key === "Delete") {
      event.preventDefault();
      setDigits((d) => d.map((v, i) => (i === index ? "" : v)));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusAt(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusAt(index + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusAt(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusAt(length - 1);
    } else if (/^\d$/.test(event.key) && digits[index] === event.key) {
      event.preventDefault();
      focusAt(index + 1);
    }
  }

  function handlePaste(index: number, event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    fill(index, event.clipboardData.getData("text"));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!complete) {
      setStatus("error");
      setNotice(`Enter all ${length} digits of the code.`);
      setShake((s) => (s === "a" ? "b" : "a"));
      focusAt(digits.findIndex((d) => !d));
      return;
    }
    void verify(code);
  }

  function resend() {
    onResend?.();
    setLeft(resendSeconds);
    setAttempts(maxAttempts);
    setDigits(Array.from({ length }, () => ""));
    setStatus("idle");
    setNotice(`New code sent to ${destination}.`);
    focusAt(0);
  }

  const invalid = status === "error" || locked;
  const tone = invalid ? "error" : notice ? "info" : undefined;
  const half = length % 2 === 0 && length >= 6 ? length / 2 : -1;
  const vars = { "--hb-kf3-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kf3 ${className}`} style={vars} data-status={status} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-auth-otp" precedence="default">{css}</style>
      <div className="hb-kf3-rings" aria-hidden="true">
        <span className="hb-kf3-static" style={{ width: 220, height: 220 }} />
        <span className="hb-kf3-static" style={{ width: 380, height: 380 }} />
        <span className="hb-kf3-ring" />
        <span className="hb-kf3-ring" />
        <span className="hb-kf3-ring" />
      </div>
      <div className="hb-kf3-inner">
        <div className="hb-kf3-badge" aria-hidden="true">
          {success ? (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
              <path d="m8.5 12 2.5 2.5 4.5-5" />
            </svg>
          ) : (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
              <path d="M10.5 18.5h3" />
              <path d="M9.5 9.5h.01M12 9.5h.01M14.5 9.5h.01" strokeWidth="2.4" />
            </svg>
          )}
        </div>
        <h2 className="hb-kf3-title" id={`${uid}-title`}>
          {success ? "You're verified" : title}
        </h2>
        <p className="hb-kf3-sub">
          {success ? (
            "Thanks for confirming it's you. Your account is secured with two-step verification."
          ) : (
            <>
              We sent a {length}-digit code to <strong>{destination}</strong>.{" "}
              <a className="hb-kf3-a" href={changeHref}>
                Change
              </a>
            </>
          )}
        </p>
        <form className="hb-kf3-form" noValidate onSubmit={handleSubmit}>
          <div
            className="hb-kf3-cells"
            role="group"
            aria-label="Verification code"
            aria-describedby={notice ? `${uid}-msg` : undefined}
            data-shake={shake || undefined}
          >
            {digits.map((digit, i) => (
              <React.Fragment key={i}>
                {i === half ? <span className="hb-kf3-gap" aria-hidden="true" /> : null}
                <input
                  ref={(node) => {
                    refs.current[i] = node;
                  }}
                  className="hb-kf3-cell"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete={i === 0 ? "one-time-code" : "off"}
                  aria-label={`Digit ${i + 1} of ${length}`}
                  aria-invalid={invalid ? true : undefined}
                  aria-describedby={notice ? `${uid}-msg` : undefined}
                  data-filled={digit ? "true" : undefined}
                  style={{ "--hb-kf3-i": i } as React.CSSProperties}
                  value={digit}
                  disabled={busy || success || locked}
                  onChange={(e) => handleChange(i, e)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={(e) => handlePaste(i, e)}
                  onFocus={(e) => e.currentTarget.select()}
                />
              </React.Fragment>
            ))}
          </div>
          <p className="hb-kf3-msg" id={`${uid}-msg`} data-tone={tone} role={invalid ? "alert" : "status"}>
            {notice || (busy ? "Checking your code" : "")}
          </p>
          {success ? (
            <div className="hb-kf3-done">
              <svg width="44" height="44" viewBox="0 0 28 28" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="14" cy="14" r="12" />
                <path d="m9 14.5 3.3 3.2L19 11" />
              </svg>
              <strong>Code accepted</strong>
              <span>Redirecting you in a moment.</span>
              <a className="hb-kf3-btn" href={successCta.href}>
                {successCta.label}
              </a>
            </div>
          ) : (
            <button type="submit" className="hb-kf3-btn" disabled={locked} aria-busy={busy || undefined}>
              {busy ? <span className="hb-kf3-spin" aria-hidden="true" /> : null}
              {busy ? "Verifying" : "Verify code"}
            </button>
          )}
        </form>
        {success ? null : (
          <div className="hb-kf3-resend">
            Didn&apos;t get a code?
            {left > 0 ? (
              <span className="hb-kf3-timer" aria-live="off">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 1.5" />
                </svg>
                <span className="hb-kf3-sr">Resend available in </span>
                {formatTime(left)}
              </span>
            ) : (
              <button type="button" className="hb-kf3-link" onClick={resend}>
                Resend code
              </button>
            )}
          </div>
        )}
        {alternate && !success ? (
          <p className="hb-kf3-alt">
            No signal?{" "}
            <a className="hb-kf3-a" href={alternate.href}>
              {alternate.label}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
