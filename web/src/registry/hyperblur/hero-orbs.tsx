"use client";

import * as React from "react";

export interface HeroOrbsAction {
  label: string;
  href: string;
}

export interface HeroOrbsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroOrbsAction | null;
  secondaryCta?: HeroOrbsAction | null;
  placeholder?: string;
  submitLabel?: string;
  successTitle?: string;
  onSubmit?: (email: string) => void | Promise<unknown>;
  people?: string[];
  trust?: string;
  accent?: string;
  colors?: [string, string, string];
}

type Status = "idle" | "loading" | "success" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const css = `
@keyframes hb-hro-spin {
  to { transform: rotate(360deg); }
}
@keyframes hb-hro-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.14); }
}
@keyframes hb-hro-rise {
  from { opacity: 0; transform: translate3d(0, 18px, 0) scale(.985); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes hb-hro-pop {
  from { opacity: 0; transform: scale(.9); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes hb-hro-check {
  to { stroke-dashoffset: 0; }
}
@keyframes hb-hro-shake {
  0%, 100% { transform: translate3d(0, 0, 0); }
  20%, 60% { transform: translate3d(-5px, 0, 0); }
  40%, 80% { transform: translate3d(5px, 0, 0); }
}
@keyframes hb-hro-load {
  to { transform: rotate(360deg); }
}
.hb-hro {
  --hb-hro-accent: #2f7bff;
  --hb-hro-c1: #2f7bff;
  --hb-hro-c2: #a259ff;
  --hb-hro-c3: #14b8a6;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 560px;
  overflow: hidden;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  container-type: inline-size;
  padding: clamp(48px, 6cqi, 88px) clamp(16px, 4cqi, 48px);
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hro *, .hb-hro *::before, .hb-hro *::after { box-sizing: border-box; }
.hb-hro-sky {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.hb-hro-sky::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, .045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .045) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: radial-gradient(ellipse at 50% 45%, #000 10%, transparent 72%);
  mask-image: radial-gradient(ellipse at 50% 45%, #000 10%, transparent 72%);
}
.hb-hro-orbit {
  position: absolute;
  left: var(--hb-hro-x);
  top: var(--hb-hro-y);
  width: 0;
  height: 0;
  animation: hb-hro-spin var(--hb-hro-t, 36s) linear infinite;
  animation-direction: var(--hb-hro-dir, normal);
}
.hb-hro-orb {
  position: absolute;
  left: calc(var(--hb-hro-s) / -2 + var(--hb-hro-r));
  top: calc(var(--hb-hro-s) / -2);
  width: var(--hb-hro-s);
  height: var(--hb-hro-s);
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, var(--hb-hro-c), color-mix(in srgb, var(--hb-hro-c) 45%, transparent) 42%, transparent 70%);
  filter: blur(36px);
  opacity: .8;
  animation: hb-hro-breathe var(--hb-hro-b, 11s) ease-in-out infinite;
  will-change: transform;
}
.hb-hro-card {
  position: relative;
  width: 100%;
  max-width: 640px;
  padding: clamp(26px, 4.2cqi, 44px);
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .085), rgba(255, 255, 255, .03));
  -webkit-backdrop-filter: blur(26px) saturate(150%);
  backdrop-filter: blur(26px) saturate(150%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .14),
    0 30px 80px -30px rgba(0, 0, 0, .8);
  text-align: center;
  animation: hb-hro-rise .9s cubic-bezier(.22, .8, .24, 1) both;
}
.hb-hro-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 20px;
  padding: 6px 13px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: rgba(10, 10, 10, .35);
  color: #c9c9c9;
  font-size: 12.5px;
  line-height: 1.2;
}
.hb-hro-pill i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-hro-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-hro-accent) 25%, transparent);
}
.hb-hro-title {
  margin: 0;
  font-size: clamp(30px, 5.1cqi, 52px);
  font-weight: 650;
  line-height: 1.06;
  letter-spacing: -.035em;
  text-wrap: balance;
  background: linear-gradient(180deg, #ffffff 30%, #b9b9c4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-hro-sub {
  max-width: 500px;
  margin: 16px auto 0;
  color: #a1a1a1;
  font-size: clamp(15px, 1.7cqi, 17px);
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-hro-slot { margin-top: 28px; min-height: 52px; }
.hb-hro-form { position: relative; text-align: left; }
.hb-hro-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 999px;
  background: rgba(10, 10, 10, .55);
  transition: border-color .2s ease, box-shadow .2s ease;
}
.hb-hro-row:focus-within {
  border-color: color-mix(in srgb, var(--hb-hro-accent) 70%, transparent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-hro-accent) 18%, transparent);
}
.hb-hro-form[data-state="invalid"] .hb-hro-row {
  border-color: #ff6b6b;
  box-shadow: 0 0 0 4px rgba(255, 107, 107, .14);
}
.hb-hro-form[data-shake="true"] .hb-hro-row { animation: hb-hro-shake .4s ease; }
.hb-hro-field { position: relative; flex: 1; min-width: 0; }
.hb-hro-input {
  width: 100%;
  height: 40px;
  padding: 0 38px 0 16px;
  border: 0;
  outline: none;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 15px;
}
.hb-hro-input::placeholder { color: #6f6f6f; }
.hb-hro-mark {
  position: absolute;
  right: 10px;
  top: 50%;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  border-radius: 50%;
  background: color-mix(in srgb, #3ddc97 18%, transparent);
  color: #3ddc97;
  animation: hb-hro-pop .25s ease both;
}
.hb-hro-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: none;
  height: 40px;
  padding: 0 20px;
  border: 0;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
}
.hb-hro-btn:hover { background: #ffffff; box-shadow: 0 0 24px -4px color-mix(in srgb, var(--hb-hro-accent) 70%, transparent); }
.hb-hro-btn:active { transform: scale(.97); }
.hb-hro-btn:disabled { cursor: progress; opacity: .8; }
.hb-hro-btn:focus-visible { outline: 2px solid var(--hb-hro-accent); outline-offset: 3px; }
.hb-hro-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(10, 10, 10, .2);
  border-top-color: #0a0a0a;
  border-radius: 50%;
  animation: hb-hro-load .7s linear infinite;
}
.hb-hro-msg {
  margin: 10px 0 0 18px;
  color: #ff8a8a;
  font-size: 13px;
  line-height: 1.4;
}
.hb-hro-hint {
  margin: 10px 0 0 18px;
  color: #7a7a7a;
  font-size: 12.5px;
  line-height: 1.4;
}
.hb-hro-done {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px 12px 12px;
  border: 1px solid color-mix(in srgb, #3ddc97 35%, transparent);
  border-radius: 20px;
  background: color-mix(in srgb, #3ddc97 9%, rgba(10, 10, 10, .5));
  text-align: left;
  animation: hb-hro-pop .45s cubic-bezier(.22, .8, .24, 1) both;
}
.hb-hro-done-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3ddc97;
  color: #06281a;
}
.hb-hro-done-icon path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: hb-hro-check .45s ease .2s forwards;
}
.hb-hro-done-text { flex: 1; min-width: 0; }
.hb-hro-done-text strong { display: block; font-size: 15px; font-weight: 600; color: #ededed; }
.hb-hro-done-text span { display: block; margin-top: 2px; overflow: hidden; color: #a1a1a1; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.hb-hro-reset {
  flex: none;
  padding: 6px 10px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-size: 12.5px;
  cursor: pointer;
}
.hb-hro-reset:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-hro-reset:focus-visible { outline: 2px solid var(--hb-hro-accent); outline-offset: 2px; }
.hb-hro-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px 22px;
  margin-top: 22px;
  font-size: 14px;
}
.hb-hro-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 2px;
  color: #d4d4d4;
  font-weight: 500;
  text-decoration: none;
  border-radius: 6px;
  transition: color .2s ease;
}
.hb-hro-link:hover { color: #ffffff; }
.hb-hro-link[data-primary="true"] { color: color-mix(in srgb, var(--hb-hro-accent) 55%, #ffffff); }
.hb-hro-link[data-primary="true"]:hover { color: #ffffff; }
.hb-hro-link svg { flex: none; transition: transform .2s ease; }
.hb-hro-link:hover svg { transform: translate3d(2px, 0, 0); }
.hb-hro-link:focus-visible { outline: 2px solid var(--hb-hro-accent); outline-offset: 3px; }
.hb-hro-play {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .1);
}
.hb-hro-trust {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px 14px;
  margin-top: 26px;
  color: #a1a1a1;
  font-size: 13.5px;
  text-align: center;
  animation: hb-hro-rise .9s cubic-bezier(.22, .8, .24, 1) .2s both;
}
.hb-hro-faces { display: flex; }
.hb-hro-face {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #fff;
  font-size: 10.5px;
  font-weight: 700;
  box-shadow: 0 0 0 2px #0a0a0a;
}
.hb-hro-face + .hb-hro-face { margin-left: -6px; }
.hb-hro-trust b { color: #ededed; font-weight: 600; }
.hb-hro-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
@container (max-width: 520px) {
  .hb-hro-card { border-radius: 22px; }
  .hb-hro-row { flex-direction: column; align-items: stretch; padding: 6px; border-radius: 18px; }
  .hb-hro-btn { width: 100%; height: 44px; border-radius: 13px; }
  .hb-hro-input { height: 44px; }
  .hb-hro-msg, .hb-hro-hint { margin-left: 6px; }
  .hb-hro-reset { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hro-orbit, .hb-hro-orb, .hb-hro-card, .hb-hro-trust, .hb-hro-done, .hb-hro-mark, .hb-hro-spinner { animation: none; }
  .hb-hro-form[data-shake="true"] .hb-hro-row { animation: none; }
  .hb-hro-done-icon path { animation: none; stroke-dashoffset: 0; }
  .hb-hro-row, .hb-hro-btn, .hb-hro-link, .hb-hro-link svg { transition: none; }
}
`;

const defaultPrimary: HeroOrbsAction = { label: "Read the launch notes", href: "#" };
const defaultSecondary: HeroOrbsAction = { label: "Watch the 90-second tour", href: "#" };
const defaultPeople = ["Maya Robinson", "Jonas Schmidt", "Aiko Kimura", "Luis Torres", "Dana Park"];
const faceColors = ["#2f7bff", "#a259ff", "#14b8a6", "#f59e0b", "#ef4f6b", "#22a06b", "#6366f1"];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function hash(text: string) {
  let h = 7;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

const orbits = [
  { x: "26%", y: "28%", s: "max(50cqi, 320px)", r: "8cqi", t: "34s", b: "12s", dir: "normal" },
  { x: "74%", y: "40%", s: "max(46cqi, 300px)", r: "10cqi", t: "42s", b: "14s", dir: "reverse" },
  { x: "50%", y: "92%", s: "max(54cqi, 340px)", r: "7cqi", t: "50s", b: "10s", dir: "normal" },
];

export function HeroOrbs({
  eyebrow = "Private beta · Spring cohort open",
  title = "The inbox that sorts itself before you wake up",
  subtitle = "Hush reads every thread, files the noise and lines up the five emails that actually need you today.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  placeholder = "you@company.com",
  submitLabel = "Get early access",
  successTitle = "You're on the list",
  onSubmit,
  people = defaultPeople,
  trust = "Joined by 2,400 product teams this month",
  accent = "#2f7bff",
  colors,
  className = "",
  style,
  ...rest
}: HeroOrbsProps) {
  const id = React.useId();
  const [email, setEmail] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [shaking, setShaking] = React.useState(false);
  const [sent, setSent] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const palette = colors ?? [accent, "#a259ff", "#14b8a6"];
  const value = email.trim();
  const valid = EMAIL.test(value);
  const invalid = touched && !valid;
  const rootStyle = {
    "--hb-hro-accent": accent,
    "--hb-hro-c1": palette[0],
    "--hb-hro-c2": palette[1],
    "--hb-hro-c3": palette[2],
    ...style,
  } as React.CSSProperties;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setTouched(true);
    if (!valid) {
      setShaking(false);
      requestAnimationFrame(() => setShaking(true));
      inputRef.current?.focus();
      return;
    }
    try {
      const result = onSubmit?.(value);
      if (result && typeof (result as Promise<unknown>).then === "function") {
        setStatus("loading");
        await result;
      }
      setSent(value);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setEmail("");
    setTouched(false);
    setStatus("idle");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const describedBy = invalid ? `${id}-err` : status === "error" ? `${id}-fail` : `${id}-hint`;

  return (
    <section className={`hb-hro ${className}`} style={rootStyle} {...rest}>
      <style href="hb-hero-orbs" precedence="default">{css}</style>
      <div className="hb-hro-sky" aria-hidden="true">
        {orbits.map((o, i) => (
          <div
            key={i}
            className="hb-hro-orbit"
            style={{ "--hb-hro-x": o.x, "--hb-hro-y": o.y, "--hb-hro-t": o.t, "--hb-hro-dir": o.dir } as React.CSSProperties}
          >
            <div
              className="hb-hro-orb"
              style={{ "--hb-hro-s": o.s, "--hb-hro-r": o.r, "--hb-hro-b": o.b, "--hb-hro-c": `var(--hb-hro-c${i + 1})` } as React.CSSProperties}
            />
          </div>
        ))}
      </div>

      <div className="hb-hro-card">
        {eyebrow ? (
          <p className="hb-hro-pill">
            <i aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <h2 className="hb-hro-title">{title}</h2>
        {subtitle ? <p className="hb-hro-sub">{subtitle}</p> : null}

        <div className="hb-hro-slot" aria-live="polite">
          {status === "success" ? (
            <div className="hb-hro-done" role="status">
              <span className="hb-hro-done-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path pathLength={1} d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <span className="hb-hro-done-text">
                <strong>{successTitle}</strong>
                <span>We will send your invite to {sent}</span>
              </span>
              <button type="button" className="hb-hro-reset" onClick={reset}>
                Use another email
              </button>
            </div>
          ) : (
            <form
              className="hb-hro-form"
              data-state={invalid ? "invalid" : valid ? "valid" : "idle"}
              data-shake={shaking ? "true" : undefined}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="hb-hro-row" onAnimationEnd={() => setShaking(false)}>
                <div className="hb-hro-field">
                  <label htmlFor={`${id}-email`} className="hb-hro-sr">
                    Work email
                  </label>
                  <input
                    ref={inputRef}
                    id={`${id}-email`}
                    className="hb-hro-input"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder={placeholder}
                    value={email}
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    onBlur={() => {
                      if (value) setTouched(true);
                    }}
                  />
                  {valid ? (
                    <span className="hb-hro-mark" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                  ) : null}
                </div>
                <button type="submit" className="hb-hro-btn" disabled={status === "loading"}>
                  {status === "loading" ? <span className="hb-hro-spinner" aria-hidden="true" /> : null}
                  {status === "loading" ? "Joining" : submitLabel}
                </button>
              </div>
              {invalid ? (
                <p id={`${id}-err`} className="hb-hro-msg">
                  {value ? "That email looks incomplete. Try name@company.com." : "Enter your work email to join."}
                </p>
              ) : status === "error" ? (
                <p id={`${id}-fail`} className="hb-hro-msg">
                  Something went wrong on our side. Please try again.
                </p>
              ) : (
                <p id={`${id}-hint`} className="hb-hro-hint">
                  One email when your invite is ready. No newsletters.
                </p>
              )}
            </form>
          )}
        </div>

        {primaryCta || secondaryCta ? (
          <div className="hb-hro-links">
            {primaryCta ? (
              <a className="hb-hro-link" data-primary="true" href={primaryCta.href}>
                {primaryCta.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-hro-link" href={secondaryCta.href}>
                <span className="hb-hro-play" aria-hidden="true">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4.5v15l13-7.5z" />
                  </svg>
                </span>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      {people.length > 0 || trust ? (
        <div className="hb-hro-trust">
          {people.length > 0 ? (
            <span className="hb-hro-faces" aria-hidden="true">
              {people.slice(0, 5).map((name) => (
                <span key={name} className="hb-hro-face" style={{ background: faceColors[hash(name) % faceColors.length] }}>
                  {initials(name)}
                </span>
              ))}
            </span>
          ) : null}
          {trust ? <span>{trust}</span> : null}
        </div>
      ) : null}
    </section>
  );
}
