"use client";

import * as React from "react";

export interface WaitlistLaunchPerk {
  title: string;
  detail: string;
}

export interface WaitlistLaunchCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  launchAt?: string;
  liveLabel?: string;
  placeholder?: string;
  ctaLabel?: string;
  perksTitle?: string;
  perks?: WaitlistLaunchPerk[];
  note?: string;
  onSubmit?: (email: string) => void;
  accent?: string;
}

const css = `
@keyframes hb-kh9-ftop { from { transform: rotateX(0deg); } to { transform: rotateX(-90deg); } }
@keyframes hb-kh9-fbot { from { transform: rotateX(90deg); } to { transform: rotateX(0deg); } }
@keyframes hb-kh9-drift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  33% { transform: translate3d(6%, -4%, 0) scale(1.08); }
  66% { transform: translate3d(-5%, 5%, 0) scale(0.95); }
}
@keyframes hb-kh9-in {
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-kh9 {
  --hb-kh9-accent: #ff7a59;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container: hb-kh9-root / inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kh9 *, .hb-kh9 *::before, .hb-kh9 *::after { box-sizing: border-box; }
.hb-kh9-sky { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-kh9-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.55;
  animation: hb-kh9-drift 18s ease-in-out infinite;
}
.hb-kh9-b1 { top: -18%; left: 8%; width: 46%; height: 70%; background: color-mix(in srgb, var(--hb-kh9-accent) 55%, transparent); }
.hb-kh9-b2 { top: 30%; right: -6%; width: 40%; height: 70%; background: rgba(124, 92, 255, 0.35); animation-delay: -6s; }
.hb-kh9-b3 { bottom: -30%; left: 30%; width: 44%; height: 60%; background: rgba(34, 211, 238, 0.18); animation-delay: -12s; }
.hb-kh9-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(60% 60% at 50% 50%, #000, transparent 80%);
  -webkit-mask-image: radial-gradient(60% 60% at 50% 50%, #000, transparent 80%);
}
.hb-kh9-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 64px 16px 72px;
}
.hb-kh9-card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  max-width: 980px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(23, 23, 23, 0.86), rgba(12, 12, 12, 0.92));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 60px 120px -50px rgba(0, 0, 0, 0.95);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
}
.hb-kh9-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 12%;
  right: 12%;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-kh9-accent) 80%, #ffffff), transparent);
}
.hb-kh9-main { min-width: 0; padding: 28px 22px; }
.hb-kh9-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; }
.hb-kh9-brand { display: inline-flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.hb-kh9-logo {
  position: relative;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffffff, color-mix(in srgb, var(--hb-kh9-accent) 80%, #ffffff) 40%, var(--hb-kh9-accent));
  box-shadow: 0 0 20px color-mix(in srgb, var(--hb-kh9-accent) 60%, transparent);
}
.hb-kh9-logo::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 9px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #141414;
}
.hb-kh9-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 28px;
  padding: 0 12px;
  border: 1px solid color-mix(in srgb, var(--hb-kh9-accent) 35%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-kh9-accent) 10%, transparent);
  color: color-mix(in srgb, var(--hb-kh9-accent) 45%, #ffffff);
  font-size: 12px;
  font-weight: 600;
}
.hb-kh9-title {
  margin: 26px 0 0;
  font-size: clamp(28px, 4.2cqw, 42px);
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: -0.04em;
  text-wrap: balance;
}
.hb-kh9-sub { margin: 12px 0 0; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; text-wrap: pretty; }
.hb-kh9-live {
  margin: 24px 0 0;
  color: color-mix(in srgb, var(--hb-kh9-accent) 50%, #ffffff);
  font-size: 13px;
  font-weight: 600;
}
.hb-kh9-units {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  max-width: 460px;
  margin-top: 24px;
  container-type: inline-size;
}
.hb-kh9-unit { display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 0; }
.hb-kh9-tile {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1.08;
  border-radius: 14px;
  font-size: 12.5cqw;
  font-weight: 600;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  perspective: 400px;
  box-shadow: 0 18px 30px -18px rgba(0, 0, 0, 0.9);
}
.hb-kh9-half {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  overflow: hidden;
  background: linear-gradient(180deg, #202020, #191919);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.hb-kh9-half > span {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200%;
  color: #f5f5f5;
}
.hb-kh9-up {
  top: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 0;
  border-radius: 14px 14px 0 0;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transform-origin: 50% 100%;
}
.hb-kh9-down {
  top: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 0;
  border-radius: 0 0 14px 14px;
  background: linear-gradient(180deg, #171717, #141414);
  transform-origin: 50% 0;
}
.hb-kh9-down > span { transform: translateY(-50%); }
.hb-kh9-tile::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  z-index: 3;
  height: 1px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
}
.hb-kh9-ftop { z-index: 2; animation: hb-kh9-ftop 0.32s cubic-bezier(0.55, 0, 0.9, 0.4) both; }
.hb-kh9-fbot { z-index: 2; animation: hb-kh9-fbot 0.38s cubic-bezier(0.1, 0.6, 0.4, 1) 0.32s both; }
.hb-kh9-ul { color: #8f8f8f; font-size: 11.5px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
.hb-kh9-form {
  display: flex;
  gap: 8px;
  max-width: 460px;
  margin-top: 26px;
}
.hb-kh9-input {
  flex: 1;
  min-width: 0;
  height: 46px;
  margin: 0;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.35);
  color: #ededed;
  font: inherit;
  font-size: 14.5px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-kh9-input::placeholder { color: #6f6f6f; }
.hb-kh9-input:focus { border-color: color-mix(in srgb, var(--hb-kh9-accent) 60%, transparent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kh9-accent) 16%, transparent); }
.hb-kh9-btn {
  flex: none;
  height: 46px;
  margin: 0;
  padding: 0 18px;
  border: 0;
  border-radius: 12px;
  background: var(--hb-kh9-accent);
  color: #1a0b06;
  font: inherit;
  font-size: 14.5px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 10px 30px -12px var(--hb-kh9-accent);
  transition: transform 0.15s ease, filter 0.2s ease;
}
.hb-kh9-btn:hover { filter: brightness(1.08); }
.hb-kh9-btn:active { transform: scale(0.97); }
.hb-kh9-btn:focus-visible { outline: 2px solid #ffffff; outline-offset: 3px; }
.hb-kh9-err { margin: 8px 0 0; color: #ff8a8a; font-size: 13px; }
.hb-kh9-ok {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 460px;
  margin-top: 26px;
  padding: 12px 14px;
  border: 1px solid color-mix(in srgb, var(--hb-kh9-accent) 30%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, var(--hb-kh9-accent) 8%, transparent);
  font-size: 14px;
  animation: hb-kh9-in 0.4s ease both;
}
.hb-kh9-ok svg { flex: none; width: 20px; height: 20px; fill: none; stroke: var(--hb-kh9-accent); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh9-ok b { font-weight: 600; }
.hb-kh9-note { margin: 12px 0 0; color: #6f6f6f; font-size: 12.5px; }
.hb-kh9-side {
  min-width: 0;
  padding: 24px 22px 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.015);
}
.hb-kh9-ph { margin: 0; color: #8f8f8f; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
.hb-kh9-perks { display: grid; gap: 4px; margin: 14px 0 0; padding: 0; list-style: none; }
.hb-kh9-perk {
  display: flex;
  gap: 14px;
  padding: 12px;
  border: 1px solid transparent;
  border-radius: 14px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.hb-kh9-perk:hover { border-color: rgba(255, 255, 255, 0.06); background: rgba(255, 255, 255, 0.03); }
.hb-kh9-pi {
  display: grid;
  flex: none;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  background: #151515;
  color: var(--hb-kh9-accent);
}
.hb-kh9-pi svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh9-pt { display: block; min-width: 0; }
.hb-kh9-pt strong { display: block; font-size: 14.5px; font-weight: 600; }
.hb-kh9-pd { display: block; margin-top: 3px; color: #8f8f8f; font-size: 13px; line-height: 1.45; }
.hb-kh9-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@container hb-kh9-root (max-width: 420px) {
  .hb-kh9-form { flex-direction: column; }
  .hb-kh9-btn { width: 100%; }
  .hb-kh9-tile { border-radius: 10px; }
  .hb-kh9-up { border-radius: 10px 10px 0 0; }
  .hb-kh9-down { border-radius: 0 0 10px 10px; }
}
@container hb-kh9-root (min-width: 720px) {
  .hb-kh9-in { padding: 88px 40px 96px; }
  .hb-kh9-main { padding: 40px 40px 36px; }
  .hb-kh9-side { padding: 28px 30px 32px; }
}
@container hb-kh9-root (min-width: 880px) {
  .hb-kh9-in { padding: 72px 40px 88px; }
  .hb-kh9-card { grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); }
  .hb-kh9-side { border-top: 0; border-left: 1px solid rgba(255, 255, 255, 0.07); padding: 40px 28px 32px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kh9 *, .hb-kh9 *::before, .hb-kh9 *::after { animation: none !important; transition: none !important; }
  .hb-kh9-ftop { display: none; }
}
`;

const defaultPerks: WaitlistLaunchPerk[] = [
  { title: "Founding price, locked in", detail: "$6 a month for life instead of $12, as long as you stay." },
  { title: "In two weeks early", detail: "Waitlist members get access fourteen days before the public launch." },
  { title: "Shape what we build", detail: "A monthly call with the four people who design and ship Halcyon." },
];

const perkIcons = [
  <path key="0" d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z" />,
  <path key="1" d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />,
  <path key="2" d="M7 18l-3 3V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7zM8 9h8M8 13h5" />,
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function FlipUnit({ value, label }: { value: string; label: string }) {
  const [cur, setCur] = React.useState(value);
  const [prev, setPrev] = React.useState(value);
  if (value !== cur) {
    setPrev(cur);
    setCur(value);
  }
  const flipping = prev !== cur;
  return (
    <div className="hb-kh9-unit">
      <div className="hb-kh9-tile" aria-hidden="true">
        <span className="hb-kh9-half hb-kh9-up">
          <span>{cur}</span>
        </span>
        <span className="hb-kh9-half hb-kh9-down">
          <span>{prev}</span>
        </span>
        {flipping ? (
          <>
            <span key={`t${cur}`} className="hb-kh9-half hb-kh9-up hb-kh9-ftop">
              <span>{prev}</span>
            </span>
            <span key={`b${cur}`} className="hb-kh9-half hb-kh9-down hb-kh9-fbot">
              <span>{cur}</span>
            </span>
          </>
        ) : null}
      </div>
      <span className="hb-kh9-ul">{label}</span>
    </div>
  );
}

export function WaitlistLaunchCard({
  brand = "Halcyon",
  badge = "Launching January 15",
  title = "Something calm is coming to your inbox",
  subtitle = "Halcyon batches email into two quiet deliveries a day and drafts the replies that can wait. Join the list to get in first.",
  launchAt = "2027-01-15T17:00:00Z",
  liveLabel = "We are live. Check your inbox for your invite.",
  placeholder = "Your work email",
  ctaLabel = "Get early access",
  perksTitle = "Waitlist perks",
  perks = defaultPerks,
  note = "One email on launch day. No spam, unsubscribe anytime.",
  onSubmit,
  accent = "#ff7a59",
  className,
  style,
  ...rest
}: WaitlistLaunchCardProps) {
  const [left, setLeft] = React.useState<number | null>(null);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [sent, setSent] = React.useState("");
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");

  React.useEffect(() => {
    const target = Date.parse(launchAt);
    if (Number.isNaN(target)) return;
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [launchAt]);

  const total = Math.floor((left ?? 0) / 1000);
  const parts = [
    { label: "Days", value: pad(Math.floor(total / 86400)) },
    { label: "Hours", value: pad(Math.floor((total % 86400) / 3600)) },
    { label: "Minutes", value: pad(Math.floor((total % 3600) / 60)) },
    { label: "Seconds", value: pad(total % 60) },
  ];
  const done = left === 0;
  const spoken = left === null ? "" : `${parts[0].value} days, ${parts[1].value} hours and ${parts[2].value} minutes until launch`;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSent(value);
    onSubmit?.(value);
  };

  return (
    <section
      className={["hb-kh9", className].filter(Boolean).join(" ")}
      style={{ ["--hb-kh9-accent" as string]: accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-waitlist-launch-card" precedence="default">{css}</style>
      <div className="hb-kh9-sky" aria-hidden="true">
        <span className="hb-kh9-blob hb-kh9-b1" />
        <span className="hb-kh9-blob hb-kh9-b2" />
        <span className="hb-kh9-blob hb-kh9-b3" />
      </div>
      <div className="hb-kh9-grain" aria-hidden="true" />
      <div className="hb-kh9-in">
        <div className="hb-kh9-card">
          <div className="hb-kh9-main">
            <div className="hb-kh9-top">
              <span className="hb-kh9-brand">
                <span className="hb-kh9-logo" aria-hidden="true" />
                {brand}
              </span>
              {badge ? <span className="hb-kh9-badge">{badge}</span> : null}
            </div>
            <h2 className="hb-kh9-title">{title}</h2>
            {subtitle ? <p className="hb-kh9-sub">{subtitle}</p> : null}
            {done && liveLabel ? <p className="hb-kh9-live">{liveLabel}</p> : null}
            <div className="hb-kh9-units" role="timer" aria-label={spoken || "Countdown to launch"}>
              {parts.map((p) => (
                <FlipUnit key={p.label} value={p.value} label={p.label} />
              ))}
            </div>
            {sent ? (
              <div className="hb-kh9-ok" role="status">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                <span>
                  You are on the list. We will write to <b>{sent}</b> on launch day.
                </span>
              </div>
            ) : (
              <>
                <form className="hb-kh9-form" onSubmit={submit} noValidate>
                  <label htmlFor={`${uid}-email`} className="hb-kh9-sr">
                    Email address
                  </label>
                  <input
                    id={`${uid}-email`}
                    className="hb-kh9-input"
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
                  <button type="submit" className="hb-kh9-btn">
                    {ctaLabel}
                  </button>
                </form>
                {error ? (
                  <p className="hb-kh9-err" id={`${uid}-err`} role="alert">
                    {error}
                  </p>
                ) : null}
              </>
            )}
            {note ? <p className="hb-kh9-note">{note}</p> : null}
          </div>
          {perks.length ? (
            <div className="hb-kh9-side">
              <h3 className="hb-kh9-ph">{perksTitle}</h3>
              <ul className="hb-kh9-perks">
                {perks.map((p, i) => (
                  <li key={p.title} className="hb-kh9-perk">
                    <span className="hb-kh9-pi" aria-hidden="true">
                      <svg viewBox="0 0 24 24">{perkIcons[i % perkIcons.length]}</svg>
                    </span>
                    <span className="hb-kh9-pt">
                      <strong>{p.title}</strong>
                      <span className="hb-kh9-pd">{p.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
