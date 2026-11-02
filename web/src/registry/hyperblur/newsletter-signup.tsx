"use client";

import * as React from "react";

export interface NewsletterSignupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  privacyNote?: React.ReactNode;
  align?: "center" | "left";
  accent?: string;
  onSubmit?: (email: string) => void | Promise<void>;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const css = `
.hb-nws {
  --hb-nws-a: #2f7bff;
  container: hb-nws / inline-size;
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-nws *, .hb-nws *::before, .hb-nws *::after { box-sizing: border-box; }
.hb-nws-in { display: grid; gap: 8px; justify-items: center; text-align: center; }
.hb-nws[data-align="left"] .hb-nws-in { justify-items: start; text-align: left; }
.hb-nws-title { margin: 0; color: #fff; font-size: 22px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2; }
.hb-nws-desc { margin: 0; max-width: 46ch; color: #a1a1a1; font-size: 14px; line-height: 1.5; }
.hb-nws-form { width: 100%; max-width: 440px; margin: 8px 0 0; }
.hb-nws-field {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px;
  border-radius: 14px;
  background: #121212;
  box-shadow: inset 0 0 0 1px #2a2a2a;
  transition: box-shadow 0.25s ease, background 0.25s ease;
}
.hb-nws-field:focus-within {
  box-shadow: inset 0 0 0 1px var(--hb-nws-a), 0 0 0 4px color-mix(in srgb, var(--hb-nws-a) 20%, transparent);
}
.hb-nws-field[data-invalid="true"] {
  box-shadow: inset 0 0 0 1px #ff5a5f, 0 0 0 4px rgba(255, 90, 95, 0.14);
}
.hb-nws-field[data-shake="a"] { animation: hb-nws-shake-a 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-nws-field[data-shake="b"] { animation: hb-nws-shake-b 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-nws-field[data-state="success"] {
  background: color-mix(in srgb, #2fd17a 8%, #121212);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, #2fd17a 40%, #121212);
}
.hb-nws-input {
  flex: 1;
  min-width: 0;
  height: 40px;
  margin: 0;
  padding: 0 12px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14.5px;
  transition: opacity 0.25s ease;
}
.hb-nws-input::placeholder { color: #6b6b6b; }
.hb-nws-field[data-state="success"] .hb-nws-input { opacity: 0; pointer-events: none; }
.hb-nws-done {
  position: absolute;
  top: 0;
  right: 52px;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: #d9f7e6;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.25;
  opacity: 0;
  transform: translateY(6px);
  pointer-events: none;
  transition: opacity 0.35s ease 0.15s, transform 0.4s cubic-bezier(0.2, 0.9, 0.2, 1) 0.15s;
}
.hb-nws-field[data-state="success"] .hb-nws-done { opacity: 1; transform: none; }
.hb-nws-btn {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  height: 40px;
  min-width: 40px;
  margin: 0;
  padding: 0 18px;
  overflow: hidden;
  border: 0;
  border-radius: 10px;
  background: var(--hb-nws-a);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  white-space: nowrap;
  cursor: pointer;
  transition: width 0.45s cubic-bezier(0.2, 0.9, 0.2, 1), padding 0.45s cubic-bezier(0.2, 0.9, 0.2, 1), background 0.3s ease, filter 0.2s ease, transform 0.15s ease;
}
.hb-nws-btn:hover { filter: brightness(1.1); }
.hb-nws-btn:active { transform: scale(0.97); }
.hb-nws-btn:disabled { cursor: default; filter: none; transform: none; }
.hb-nws-btn > * { grid-area: 1 / 1; transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1); }
.hb-nws-spin, .hb-nws-check { width: 18px; height: 18px; opacity: 0; transform: scale(0.6); }
.hb-nws-spin circle { transform-origin: center; animation: hb-nws-spin 0.8s linear infinite; }
.hb-nws-field[data-state="submitting"] .hb-nws-lbl { opacity: 0; transform: translateY(-8px); }
.hb-nws-field[data-state="submitting"] .hb-nws-spin { opacity: 1; transform: none; }
.hb-nws-field[data-state="success"] .hb-nws-btn { padding: 0; background: #22c55e; }
.hb-nws-field[data-state="success"] .hb-nws-lbl { opacity: 0; transform: translateY(-8px); }
.hb-nws-field[data-state="success"] .hb-nws-spin { opacity: 0; }
.hb-nws-field[data-state="success"] .hb-nws-check { opacity: 1; transform: none; }
.hb-nws-check path {
  stroke-dasharray: 22;
  stroke-dashoffset: 22;
}
.hb-nws-field[data-state="success"] .hb-nws-check path { animation: hb-nws-draw 0.45s cubic-bezier(0.2, 0.9, 0.2, 1) 0.25s forwards; }
.hb-nws-input:focus-visible { outline: 0; }
.hb-nws-btn:focus-visible,
.hb-nws-again:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
  border-radius: 8px;
}
.hb-nws-note { margin: 0; color: #6b6b6b; font-size: 12px; line-height: 1.4; }
.hb-nws-note[data-error="true"] { color: #ff7a7e; }
.hb-nws-again {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: color-mix(in srgb, var(--hb-nws-a) 55%, #fff);
  font: inherit;
  font-size: 12px;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
@keyframes hb-nws-shake-a {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-7px); }
  40%, 60% { transform: translateX(7px); }
}
@keyframes hb-nws-shake-b {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-7px); }
  40%, 60% { transform: translateX(7px); }
}
@keyframes hb-nws-spin { to { transform: rotate(360deg); } }
@keyframes hb-nws-draw { to { stroke-dashoffset: 0; } }
@container hb-nws (max-width: 339px) {
  .hb-nws-title { font-size: 20px; }
  .hb-nws-btn { padding: 0 14px; }
  .hb-nws-input { padding: 0 8px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-nws-field[data-shake] { animation: none; }
  .hb-nws-btn, .hb-nws-btn > *, .hb-nws-done, .hb-nws-input, .hb-nws-field { transition: none; }
  .hb-nws-spin circle { animation-duration: 2s; }
  .hb-nws-field[data-state="success"] .hb-nws-check path { animation: none; stroke-dashoffset: 0; }
}
`;

export function NewsletterSignup({
  title = "Get the Friday dispatch",
  description = "One short email every week with new features, product notes and what we are reading.",
  placeholder = "you@company.com",
  buttonLabel = "Subscribe",
  successMessage = "You are in. Check your inbox to confirm.",
  privacyNote = "No spam. Unsubscribe with one click.",
  align = "center",
  accent = "#2f7bff",
  onSubmit,
  className = "",
  style,
  ...rest
}: NewsletterSignupProps) {
  const uid = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = React.useState("");
  const [shake, setShake] = React.useState<"" | "a" | "b">("");

  React.useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    if (status === "success") btn.style.width = "40px";
    else if (status === "idle") btn.style.width = "";
  }, [status]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    const value = email.trim();
    if (!emailPattern.test(value)) {
      setError(value ? "That email address does not look right." : "Enter your email address.");
      setShake((s) => (s === "a" ? "b" : "a"));
      inputRef.current?.focus();
      return;
    }
    setError("");
    const btn = buttonRef.current;
    if (btn) btn.style.width = `${btn.offsetWidth}px`;
    setStatus("submitting");
    try {
      await onSubmit?.(value);
      setStatus("success");
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  }

  function reset() {
    setEmail("");
    setStatus("idle");
    setError("");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  const rootStyle = { "--hb-nws-a": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-nws ${className}`} data-align={align} style={rootStyle} {...rest}>
      <style href="hb-newsletter-signup" precedence="default">{css}</style>
      <div className="hb-nws-in">
        <h2 className="hb-nws-title">{title}</h2>
        {description && <p className="hb-nws-desc">{description}</p>}
        <form className="hb-nws-form" onSubmit={submit} noValidate>
          <div
            className="hb-nws-field"
            data-state={status}
            data-invalid={error ? "true" : "false"}
            data-shake={shake || undefined}
          >
            <input
              ref={inputRef}
              className="hb-nws-input"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={placeholder}
              aria-label="Email address"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${uid}-err` : undefined}
              disabled={status === "submitting"}
              tabIndex={status === "success" ? -1 : 0}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
            />
            <span className="hb-nws-done" role="status">
              {status === "success" ? successMessage : ""}
            </span>
            <button
              ref={buttonRef}
              className="hb-nws-btn"
              type="submit"
              disabled={status !== "idle"}
              aria-label={status === "success" ? "Subscribed" : undefined}
            >
              <span className="hb-nws-lbl">{buttonLabel}</span>
              <svg className="hb-nws-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" strokeDasharray="38 60" />
              </svg>
              <svg className="hb-nws-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5.5 12.5 4.2 4.2 8.8-9.4" />
              </svg>
            </button>
          </div>
        </form>
        <p className="hb-nws-note" id={`${uid}-err`} data-error={error ? "true" : "false"} role={error ? "alert" : undefined}>
          {error ? (
            error
          ) : status === "success" ? (
            <button type="button" className="hb-nws-again" onClick={reset}>
              Use a different email
            </button>
          ) : (
            privacyNote
          )}
        </p>
      </div>
    </div>
  );
}
