"use client";

import * as React from "react";

export interface WaitlistCounterProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  count?: number;
  live?: boolean;
  avatars?: string[];
  placeholder?: string;
  ctaLabel?: string;
  progress?: number;
  progressLabel?: string;
  milestones?: string[];
  referralBase?: string;
  referralBonus?: string;
  onSubmit?: (email: string, position: number) => void;
  onReferralCopy?: (url: string) => void;
  accent?: string;
}

const css = `
@keyframes hb-kh8-fill { from { transform: scaleX(0); } }
@keyframes hb-kh8-shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}
@keyframes hb-kh8-in {
  from { opacity: 0; transform: translate3d(0, 10px, 0) scale(0.98); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-kh8-ping {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(2.4); opacity: 0; }
}
@keyframes hb-kh8-bump {
  0% { transform: none; }
  40% { transform: translateY(-2px); color: var(--hb-kh8-accent); }
  100% { transform: none; }
}
.hb-kh8 {
  --hb-kh8-accent: #6d4aff;
  --hb-kh8-ink: #121216;
  --hb-kh8-muted: #6b6b76;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #ffffff;
  color: var(--hb-kh8-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kh8 *, .hb-kh8 *::before, .hb-kh8 *::after { box-sizing: border-box; }
.hb-kh8-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(46% 40% at 50% 0%, color-mix(in srgb, var(--hb-kh8-accent) 14%, transparent), transparent 70%),
    radial-gradient(30% 30% at 12% 90%, color-mix(in srgb, var(--hb-kh8-accent) 6%, transparent), transparent 70%),
    radial-gradient(30% 30% at 88% 80%, rgba(255, 170, 120, 0.1), transparent 70%);
}
.hb-kh8-arcs {
  position: absolute;
  top: -540px;
  left: 50%;
  width: 1100px;
  height: 1100px;
  margin-left: -550px;
  border-radius: 50%;
  pointer-events: none;
  background: repeating-radial-gradient(circle, transparent 0 79px, rgba(18, 18, 22, 0.05) 79px 80px);
  mask-image: radial-gradient(circle, #000 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(circle, #000 30%, transparent 70%);
}
.hb-kh8-in {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px 80px;
  text-align: center;
}
.hb-kh8-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 14px;
  border: 1px solid rgba(18, 18, 22, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px rgba(18, 18, 22, 0.04);
  color: #3e3e48;
  font-size: 12.5px;
  font-weight: 500;
}
.hb-kh8-dot { position: relative; width: 7px; height: 7px; border-radius: 50%; background: var(--hb-kh8-accent); }
.hb-kh8-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--hb-kh8-accent);
  animation: hb-kh8-ping 1.8s ease-out infinite;
}
.hb-kh8-title {
  max-width: 760px;
  margin: 20px 0 0;
  font-size: clamp(36px, 6.4cqw, 66px);
  font-weight: 650;
  line-height: 1;
  letter-spacing: -0.05em;
  text-wrap: balance;
}
.hb-kh8-title span {
  background: linear-gradient(100deg, var(--hb-kh8-accent), color-mix(in srgb, var(--hb-kh8-accent) 50%, #ff7a59));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-kh8-sub {
  max-width: 520px;
  margin: 18px 0 0;
  color: var(--hb-kh8-muted);
  font-size: 16.5px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kh8-form {
  display: flex;
  width: 100%;
  max-width: 460px;
  margin-top: 30px;
  padding: 5px;
  border: 1px solid rgba(18, 18, 22, 0.1);
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(18, 18, 22, 0.05), 0 14px 34px -18px color-mix(in srgb, var(--hb-kh8-accent) 45%, rgba(18, 18, 22, 0.3));
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-kh8-form:focus-within {
  border-color: color-mix(in srgb, var(--hb-kh8-accent) 55%, transparent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kh8-accent) 14%, transparent), 0 14px 34px -18px color-mix(in srgb, var(--hb-kh8-accent) 45%, rgba(18, 18, 22, 0.3));
}
.hb-kh8-input {
  flex: 1;
  min-width: 0;
  height: 44px;
  margin: 0;
  padding: 0 8px 0 16px;
  border: 0;
  background: transparent;
  color: var(--hb-kh8-ink);
  font: inherit;
  font-size: 15px;
  outline: none;
}
.hb-kh8-input::placeholder { color: #9a9aa4; }
.hb-kh8-btn {
  position: relative;
  flex: none;
  height: 44px;
  margin: 0;
  padding: 0 20px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: var(--hb-kh8-ink);
  color: #ffffff;
  font: inherit;
  font-size: 14.5px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.2s ease;
}
.hb-kh8-btn:hover { background: #000000; }
.hb-kh8-btn:active { transform: scale(0.97); }
.hb-kh8-btn:focus-visible { outline: 2px solid var(--hb-kh8-accent); outline-offset: 3px; }
.hb-kh8-err { margin: 10px 0 0; color: #d14343; font-size: 13px; }
.hb-kh8-social {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px 14px;
  margin-top: 22px;
  color: var(--hb-kh8-muted);
  font-size: 14px;
}
.hb-kh8-avs { display: flex; padding-left: 8px; }
.hb-kh8-av {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-left: -8px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  box-shadow: 0 1px 2px rgba(18, 18, 22, 0.12);
}
.hb-kh8-count { color: var(--hb-kh8-ink); font-weight: 600; }
.hb-kh8-roll {
  display: inline-flex;
  vertical-align: bottom;
  font-variant-numeric: tabular-nums;
}
.hb-kh8-col {
  display: inline-block;
  height: 1.25em;
  overflow: hidden;
  line-height: 1.25em;
}
.hb-kh8-strip {
  display: flex;
  flex-direction: column;
  transition: transform 0.7s cubic-bezier(0.2, 0.9, 0.2, 1);
}
.hb-kh8-strip span { height: 1.25em; }
.hb-kh8-sep { display: inline-block; line-height: 1.25em; }
.hb-kh8-prog {
  width: 100%;
  max-width: 520px;
  margin-top: 34px;
  padding: 16px 18px 14px;
  border: 1px solid rgba(18, 18, 22, 0.07);
  border-radius: 18px;
  background: rgba(250, 250, 252, 0.9);
  box-shadow: 0 1px 0 #ffffff inset;
  text-align: left;
}
.hb-kh8-ph { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; font-size: 13px; }
.hb-kh8-ph span { color: var(--hb-kh8-muted); }
.hb-kh8-ph b { font-size: 14px; font-weight: 650; font-variant-numeric: tabular-nums; }
.hb-kh8-bar {
  position: relative;
  height: 8px;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(18, 18, 22, 0.07);
}
.hb-kh8-fill {
  position: absolute;
  inset: 0 auto 0 0;
  overflow: hidden;
  border-radius: 999px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-kh8-accent) 70%, #ffffff), var(--hb-kh8-accent));
  transform-origin: left;
  animation: hb-kh8-fill 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s both;
}
.hb-kh8-fill::after {
  content: "";
  position: absolute;
  inset: 0;
  width: 40%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  animation: hb-kh8-shine 2.6s ease-in-out 1.8s infinite;
}
.hb-kh8-ms {
  display: grid;
  grid-template-columns: repeat(var(--hb-kh8-n), minmax(0, 1fr));
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
  font-size: 11.5px;
}
.hb-kh8-ms li { display: flex; align-items: center; gap: 5px; color: #9a9aa4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-kh8-ms li:not(:first-child) { justify-content: center; }
.hb-kh8-ms li:last-child { justify-content: flex-end; }
.hb-kh8-ms li[data-done="true"] { color: #3e3e48; }
.hb-kh8-ms li::before { content: ""; flex: none; width: 6px; height: 6px; border-radius: 50%; background: rgba(18, 18, 22, 0.15); }
.hb-kh8-ms li[data-done="true"]::before { background: var(--hb-kh8-accent); }
.hb-kh8-done {
  width: 100%;
  max-width: 480px;
  margin-top: 30px;
  padding: 22px;
  border: 1px solid color-mix(in srgb, var(--hb-kh8-accent) 25%, rgba(18, 18, 22, 0.08));
  border-radius: 22px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-kh8-accent) 6%, #ffffff), #ffffff);
  box-shadow: 0 20px 44px -26px color-mix(in srgb, var(--hb-kh8-accent) 50%, rgba(18, 18, 22, 0.3));
  animation: hb-kh8-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-kh8-check {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 50%;
  background: var(--hb-kh8-accent);
  color: #ffffff;
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--hb-kh8-accent) 14%, transparent);
}
.hb-kh8-check svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh8-dt { margin: 14px 0 0; font-size: 20px; font-weight: 650; letter-spacing: -0.02em; }
.hb-kh8-dt span { color: var(--hb-kh8-accent); font-variant-numeric: tabular-nums; }
.hb-kh8-dd { margin: 6px 0 0; color: var(--hb-kh8-muted); font-size: 14px; line-height: 1.5; }
.hb-kh8-ref {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 5px 5px 5px 14px;
  border: 1px solid rgba(18, 18, 22, 0.1);
  border-radius: 12px;
  background: #ffffff;
  text-align: left;
}
.hb-kh8-url {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  color: var(--hb-kh8-ink);
  font-family: var(--font-mono, ui-monospace), SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-kh8-copy {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 6px;
  height: 34px;
  margin: 0;
  padding: 0 12px;
  border: 0;
  border-radius: 9px;
  background: var(--hb-kh8-ink);
  color: #ffffff;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.hb-kh8-copy[data-done="true"] { background: var(--hb-kh8-accent); }
.hb-kh8-copy:focus-visible { outline: 2px solid var(--hb-kh8-accent); outline-offset: 2px; }
.hb-kh8-copy svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh8-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@container (max-width: 420px) {
  .hb-kh8-form { flex-direction: column; gap: 6px; border-radius: 20px; }
  .hb-kh8-input { height: 46px; }
  .hb-kh8-btn { width: 100%; }
  .hb-kh8-ms li:not(:first-child):not(:last-child) { display: none; }
  .hb-kh8-ms { grid-template-columns: 1fr 1fr; }
}
@container (min-width: 720px) {
  .hb-kh8-in { padding: 88px 40px 100px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kh8 *, .hb-kh8 *::before, .hb-kh8 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultAvatars = ["Maya Lin", "Jonah Reyes", "Sofia Duarte", "Kenji Mori", "Ava Brooks"];
const defaultMilestones = ["Alpha", "Private beta", "Public beta", "Launch"];
const palette = ["#6d4aff", "#ff7a59", "#14b8a6", "#f59e0b", "#3b82f6", "#ec4899"];
const ticks = [1, 2, 1, 1, 3, 1, 2, 1, 4, 1];

function hashText(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function Roll({ value }: { value: number }) {
  const text = value.toLocaleString("en-US");
  const chars = text.split("");
  return (
    <span className="hb-kh8-roll">
      <span className="hb-kh8-sr">{text}</span>
      {chars.map((ch, i) => {
        const key = chars.length - i;
        if (ch >= "0" && ch <= "9") {
          return (
            <span key={`d${key}`} className="hb-kh8-col" aria-hidden="true">
              <span className="hb-kh8-strip" style={{ transform: `translateY(${-Number(ch) * 10}%)` }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          );
        }
        return (
          <span key={`s${key}`} className="hb-kh8-sep" aria-hidden="true">
            {ch}
          </span>
        );
      })}
    </span>
  );
}

export function WaitlistCounter({
  eyebrow = "Private beta opens March 2027",
  title = "Be first in line for Orbit",
  subtitle = "The calendar that plans your week around deep work. We are letting people in from the waitlist in batches of 500.",
  count = 2431,
  live = true,
  avatars = defaultAvatars,
  placeholder = "you@company.com",
  ctaLabel = "Join the waitlist",
  progress = 72,
  progressLabel = "Road to launch",
  milestones = defaultMilestones,
  referralBase = "https://orbit.so/r/",
  referralBonus = "Every friend who joins moves you up 250 spots.",
  onSubmit,
  onReferralCopy,
  accent = "#6d4aff",
  className,
  style,
  ...rest
}: WaitlistCounterProps) {
  const [ahead, setAhead] = React.useState(count);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [joined, setJoined] = React.useState<{ position: number; code: string } | null>(null);
  const [copied, setCopied] = React.useState(false);
  const step = React.useRef(0);
  const timer = React.useRef<number | undefined>(undefined);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");

  React.useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => {
      const add = ticks[step.current % ticks.length];
      step.current += 1;
      setAhead((a) => a + add);
    }, 3200);
    return () => window.clearInterval(id);
  }, [live]);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    const position = ahead + 1;
    const code = hashText(value.toLowerCase()).toString(36).slice(0, 6).padEnd(6, "x");
    setAhead(position);
    setJoined({ position, code });
    onSubmit?.(value, position);
  };

  const url = joined ? `${referralBase}${joined.code}` : "";

  const copy = () => {
    if (!url) return;
    const done = () => {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    };
    onReferralCopy?.(url);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(done, done);
    } else {
      done();
    }
  };

  const pct = Math.min(Math.max(progress, 0), 100);
  const words = title.split(" ");
  const tail = words.length > 1 ? words.pop() : "";
  const head = words.join(" ");

  return (
    <section
      className={["hb-kh8", className].filter(Boolean).join(" ")}
      style={{ ["--hb-kh8-accent" as string]: accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-waitlist-counter" precedence="default">{css}</style>
      <div className="hb-kh8-bg" aria-hidden="true" />
      <div className="hb-kh8-arcs" aria-hidden="true" />
      <div className="hb-kh8-in">
        {eyebrow ? (
          <span className="hb-kh8-eyebrow">
            <span className="hb-kh8-dot" aria-hidden="true" />
            {eyebrow}
          </span>
        ) : null}
        <h2 className="hb-kh8-title">
          {head} {tail ? <span>{tail}</span> : null}
        </h2>
        {subtitle ? <p className="hb-kh8-sub">{subtitle}</p> : null}
        {joined ? (
          <div className="hb-kh8-done" role="status">
            <span className="hb-kh8-check" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <p className="hb-kh8-dt">
              You are in. Spot <span>#{joined.position.toLocaleString("en-US")}</span>
            </p>
            <p className="hb-kh8-dd">{referralBonus}</p>
            <div className="hb-kh8-ref">
              <span className="hb-kh8-url" title={url}>
                {url.replace("https://", "").replace("http://", "")}
              </span>
              <button type="button" className="hb-kh8-copy" data-done={copied ? "true" : "false"} onClick={copy}>
                {copied ? (
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <rect x="5.5" y="5.5" width="8" height="8" rx="1.8" />
                    <path d="M10.5 3.5V3A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
                  </svg>
                )}
                {copied ? "Copied" : "Copy link"}
              </button>
            </div>
            <span className="hb-kh8-sr" aria-live="polite">
              {copied ? "Referral link copied" : ""}
            </span>
          </div>
        ) : (
          <>
            <form className="hb-kh8-form" onSubmit={submit} noValidate>
              <label htmlFor={`${uid}-email`} className="hb-kh8-sr">
                Email address
              </label>
              <input
                id={`${uid}-email`}
                className="hb-kh8-input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={placeholder}
                value={email}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${uid}-err` : undefined}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
              />
              <button type="submit" className="hb-kh8-btn">
                {ctaLabel}
              </button>
            </form>
            {error ? (
              <p className="hb-kh8-err" id={`${uid}-err`} role="alert">
                {error}
              </p>
            ) : null}
          </>
        )}
        <div className="hb-kh8-social">
          {avatars.length ? (
            <span className="hb-kh8-avs" aria-hidden="true">
              {avatars.slice(0, 5).map((n, i) => (
                <span key={n} className="hb-kh8-av" style={{ background: palette[hashText(n) % palette.length], zIndex: 5 - i }}>
                  {initials(n)}
                </span>
              ))}
            </span>
          ) : null}
          <span>
            <span className="hb-kh8-count">
              <Roll value={ahead} />
            </span>{" "}
            {joined ? "on the list now, including you" : "people ahead of you"}
          </span>
        </div>
        <div className="hb-kh8-prog">
          <div className="hb-kh8-ph">
            <span>{progressLabel}</span>
            <b>{pct}%</b>
          </div>
          <div className="hb-kh8-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={progressLabel}>
            <span className="hb-kh8-fill" style={{ width: `${pct}%` }} />
          </div>
          {milestones.length ? (
            <ol className="hb-kh8-ms" style={{ ["--hb-kh8-n" as string]: String(milestones.length) } as React.CSSProperties}>
              {milestones.map((m, i) => {
                const at = milestones.length === 1 ? 100 : (i / (milestones.length - 1)) * 100;
                return (
                  <li key={m} data-done={pct >= at ? "true" : "false"}>
                    {m}
                  </li>
                );
              })}
            </ol>
          ) : null}
        </div>
      </div>
    </section>
  );
}
