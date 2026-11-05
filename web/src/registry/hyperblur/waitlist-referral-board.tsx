"use client";

import * as React from "react";

export interface WaitlistReferrer {
  name: string;
  handle: string;
  referrals: number;
  hue: number;
}

export interface WaitlistReferralReward {
  friends: number;
  label: string;
}

export interface WaitlistReferralValues {
  name: string;
  email: string;
}

export interface WaitlistReferralBoardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  totalSignups?: number;
  referrers?: WaitlistReferrer[];
  rewards?: WaitlistReferralReward[];
  referralBase?: string;
  onJoin?: (values: WaitlistReferralValues) => void | Promise<void>;
  onReferralCopy?: (url: string) => void;
  accent?: string;
}

const defaultReferrers: WaitlistReferrer[] = [
  { name: "Aisha Bello", handle: "@aishab", referrals: 214, hue: 268 },
  { name: "Tomas Varga", handle: "@tvarga", referrals: 187, hue: 200 },
  { name: "Lucia Moreno", handle: "@luciam", referrals: 149, hue: 340 },
  { name: "Kenji Watanabe", handle: "@kenjiw", referrals: 122, hue: 150 },
  { name: "Freya Nilsen", handle: "@freyan", referrals: 96, hue: 30 },
  { name: "Omar Haddad", handle: "@omarh", referrals: 71, hue: 220 },
];

const defaultRewards: WaitlistReferralReward[] = [
  { friends: 1, label: "Skip the line" },
  { friends: 3, label: "3 months of Pro" },
  { friends: 10, label: "Founding member badge" },
];

const css = `
@keyframes hb-yg6-bar { from { transform: scaleX(0); } }
@keyframes hb-yg6-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-yg6-spin { to { transform: rotate(360deg); } }
@keyframes hb-yg6-glint {
  from { transform: translateX(-120%) skewX(-20deg); }
  to { transform: translateX(320%) skewX(-20deg); }
}
.hb-yg6 {
  --hb-yg6-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yg6 *, .hb-yg6 *::before, .hb-yg6 *::after { box-sizing: border-box; }
.hb-yg6-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(40% 50% at 100% 0%, color-mix(in srgb, var(--hb-yg6-accent) 16%, transparent), transparent 70%),
    radial-gradient(30% 40% at 0% 100%, rgba(255, 255, 255, 0.03), transparent 70%);
}
.hb-yg6-in {
  position: relative;
  display: grid;
  gap: 32px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 88px 24px;
}
@container (min-width: 820px) {
  .hb-yg6-in { grid-template-columns: 1.05fr 1fr; gap: 48px; align-items: start; }
}
.hb-yg6-eyebrow {
  color: color-mix(in srgb, var(--hb-yg6-accent) 65%, #fff);
  font-size: 13px;
  font-weight: 600;
}
.hb-yg6-title {
  margin: 12px 0 0;
  font-size: clamp(32px, 4.8cqw, 50px);
  font-weight: 650;
  line-height: 1.04;
  letter-spacing: -0.045em;
  text-wrap: balance;
}
.hb-yg6-sub {
  max-width: 460px;
  margin: 14px 0 0;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
}
.hb-yg6-card {
  margin-top: 28px;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background: linear-gradient(180deg, #141414, #101010);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 30px 60px -40px rgba(0, 0, 0, 0.9);
}
.hb-yg6-fields { display: grid; gap: 12px; }
@container (min-width: 520px) {
  .hb-yg6-fields { grid-template-columns: 1fr 1.3fr; }
}
.hb-yg6-field label {
  display: block;
  margin-bottom: 6px;
  color: #a1a1a1;
  font-size: 12.5px;
  font-weight: 500;
}
.hb-yg6-input {
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: #0b0b0b;
  color: #ededed;
  font: inherit;
  font-size: 14.5px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-yg6-input::placeholder { color: #5f5f5f; }
.hb-yg6-input:focus { border-color: color-mix(in srgb, var(--hb-yg6-accent) 70%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-yg6-accent) 20%, transparent); }
.hb-yg6-input[aria-invalid="true"] { border-color: rgba(248, 113, 113, 0.7); }
.hb-yg6-err { min-height: 18px; margin: 6px 0 0; color: #f87171; font-size: 12.5px; }
.hb-yg6-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 46px;
  margin-top: 6px;
  overflow: hidden;
  border: 0;
  border-radius: 12px;
  background: var(--hb-yg6-accent);
  color: #fff;
  font: inherit;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 10px 24px -12px var(--hb-yg6-accent);
  transition: filter 0.2s ease, transform 0.15s ease;
}
.hb-yg6-btn::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 30%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.28), transparent);
  animation: hb-yg6-glint 3.2s ease-in-out infinite;
}
.hb-yg6-btn:hover:not(:disabled) { filter: brightness(1.1); }
.hb-yg6-btn:active:not(:disabled) { transform: scale(0.985); }
.hb-yg6-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-yg6-btn:disabled { cursor: progress; }
.hb-yg6-spin {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: hb-yg6-spin 0.7s linear infinite;
}
.hb-yg6-pos { animation: hb-yg6-in 0.5s ease both; outline: none; }
.hb-yg6-pos-label { color: #8f8f8f; font-size: 13px; }
.hb-yg6-pos-num {
  margin-top: 4px;
  font-size: clamp(44px, 7cqw, 64px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;
  font-variant-numeric: tabular-nums;
}
.hb-yg6-pos-num span { color: color-mix(in srgb, var(--hb-yg6-accent) 70%, #fff); }
.hb-yg6-pos-hint { margin: 8px 0 0; color: #a1a1a1; font-size: 14px; line-height: 1.5; }
.hb-yg6-share {
  display: flex;
  gap: 8px;
  margin-top: 18px;
  padding: 6px 6px 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: #0b0b0b;
}
.hb-yg6-share input {
  flex: 1;
  min-width: 0;
  border: 0;
  background: none;
  color: #ededed;
  font-family: ui-monospace, "Geist Mono", Menlo, monospace;
  font-size: 13px;
  outline: none;
}
.hb-yg6-copy {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9px;
  background: #1a1a1a;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-yg6-copy:hover { background: #222; }
.hb-yg6-copy[data-copied="true"] { color: #4ade80; }
.hb-yg6-copy:focus-visible { outline: 2px solid var(--hb-yg6-accent); outline-offset: 2px; }
.hb-yg6-rewards {
  display: grid;
  gap: 8px;
  margin: 20px 0 0;
  padding: 18px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  list-style: none;
}
.hb-yg6-reward {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #a1a1a1;
  font-size: 13.5px;
}
.hb-yg6-reward b {
  display: grid;
  place-items: center;
  flex: none;
  width: 28px;
  height: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ededed;
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.hb-yg6-reward em { margin-left: auto; color: #6b6b6b; font-style: normal; font-size: 12px; }
.hb-yg6-board {
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  background: #0f0f0f;
}
.hb-yg6-board-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px 12px;
}
.hb-yg6-board-head h3 { margin: 0; font-size: 15px; font-weight: 600; }
.hb-yg6-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #8f8f8f;
  font-size: 12px;
}
.hb-yg6-live i { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 8px #4ade80; }
.hb-yg6-list { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
.hb-yg6-row {
  position: relative;
  display: grid;
  grid-template-columns: 26px 36px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  animation: hb-yg6-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transition: background 0.2s ease;
}
.hb-yg6-row:hover { background: #151515; }
.hb-yg6-row[data-you="true"] { background: color-mix(in srgb, var(--hb-yg6-accent) 12%, #111); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-yg6-accent) 35%, transparent); }
.hb-yg6-rank { color: #6b6b6b; font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums; text-align: center; }
.hb-yg6-row:nth-child(-n+3) .hb-yg6-rank { color: color-mix(in srgb, var(--hb-yg6-accent) 70%, #fff); }
.hb-yg6-av {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(140deg, hsl(var(--hb-yg6-h) 75% 62%), hsl(calc(var(--hb-yg6-h) + 40) 65% 38%));
  color: #fff;
  font-size: 13px;
  font-weight: 650;
}
.hb-yg6-who { min-width: 0; }
.hb-yg6-who strong { display: block; overflow: hidden; font-size: 14px; font-weight: 550; text-overflow: ellipsis; white-space: nowrap; }
.hb-yg6-track { display: block; position: relative; height: 4px; margin-top: 7px; overflow: hidden; border-radius: 4px; background: rgba(255, 255, 255, 0.06); }
.hb-yg6-fill {
  position: absolute;
  inset: 0;
  border-radius: 4px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-yg6-accent) 50%, transparent), var(--hb-yg6-accent));
  transform-origin: left;
  animation: hb-yg6-bar 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-yg6-n { text-align: right; font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-yg6-n small { display: block; color: #6b6b6b; font-size: 11.5px; font-weight: 400; }
.hb-yg6-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-yg6-row, .hb-yg6-fill, .hb-yg6-pos, .hb-yg6-btn::after { animation: none; }
  .hb-yg6-input, .hb-yg6-btn, .hb-yg6-copy, .hb-yg6-row { transition: none; }
}
`;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function WaitlistReferralBoard({
  eyebrow = "Relay early access",
  title = "Invite friends, jump the line",
  subtitle = "Every friend who joins with your link moves you up five spots. The top fifty referrers get in on day one.",
  totalSignups = 8412,
  referrers = defaultReferrers,
  rewards = defaultRewards,
  referralBase = "https://relay.so/r/",
  onJoin,
  onReferralCopy,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: WaitlistReferralBoardProps) {
  const id = React.useId();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");
  const [shown, setShown] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const posRef = React.useRef<HTMLDivElement>(null);
  const position = totalSignups + 1;
  const code = React.useMemo(() => hash(email.trim().toLowerCase()).toString(36).slice(0, 6), [email]);
  const url = `${referralBase}${code}`;
  const max = Math.max(1, ...referrers.map((r) => r.referrals));

  React.useEffect(() => {
    if (status !== "done") return;
    posRef.current?.focus();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const f = requestAnimationFrame(() => setShown(position));
      return () => cancelAnimationFrame(f);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min((now - start) / 1400, 1);
      setShown(Math.round(position * (1 - Math.pow(1 - k, 4))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status, position]);

  React.useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: { name?: string; email?: string } = {};
    if (name.trim().length < 2) next.name = "Tell us your name.";
    if (!emailRe.test(email.trim())) next.email = email.trim() ? "Check the email address." : "Email is required.";
    setErrors(next);
    if (next.name || next.email) return;
    setStatus("loading");
    try {
      await Promise.all([onJoin?.({ name: name.trim(), email: email.trim() }), new Promise((r) => setTimeout(r, 900))]);
      setStatus("done");
    } catch {
      setStatus("idle");
      setErrors({ email: "Something went wrong. Please try again." });
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {}
    setCopied(true);
    onReferralCopy?.(url);
  };

  const you = status === "done" ? { name: name.trim() || "You", handle: "you", referrals: 0, hue: 220 } : null;

  return (
    <section className={`hb-yg6 ${className}`} style={{ "--hb-yg6-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-waitlist-referral-board" precedence="default">{css}</style>
      <div className="hb-yg6-bg" aria-hidden="true" />
      <div className="hb-yg6-in">
        <div>
          <span className="hb-yg6-eyebrow">{eyebrow}</span>
          <h2 className="hb-yg6-title">{title}</h2>
          <p className="hb-yg6-sub">{subtitle}</p>
          <div className="hb-yg6-card">
            {status === "done" ? (
              <div ref={posRef} className="hb-yg6-pos" tabIndex={-1} role="status">
                <div className="hb-yg6-pos-label">Your spot in line</div>
                <div className="hb-yg6-pos-num" aria-label={`Number ${position.toLocaleString("en-US")}`}>
                  <span>#</span>{shown.toLocaleString("en-US")}
                </div>
                <p className="hb-yg6-pos-hint">Thanks, {name.trim().split(" ")[0]}. Share your link to move up.</p>
                <div className="hb-yg6-share">
                  <label htmlFor={`${id}-link`} className="hb-yg6-sr">Your referral link</label>
                  <input id={`${id}-link`} readOnly value={url} onFocus={(e) => e.currentTarget.select()} />
                  <button type="button" className="hb-yg6-copy" data-copied={copied} onClick={copy}>
                    {copied ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <span className="hb-yg6-sr" aria-live="polite">{copied ? "Link copied to clipboard" : ""}</span>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="hb-yg6-fields">
                  <div className="hb-yg6-field">
                    <label htmlFor={`${id}-name`}>Name</label>
                    <input
                      id={`${id}-name`}
                      className="hb-yg6-input"
                      autoComplete="name"
                      placeholder="Ada Lovelace"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={`${id}-name-err`}
                      disabled={status === "loading"}
                    />
                    <p id={`${id}-name-err`} className="hb-yg6-err">{errors.name}</p>
                  </div>
                  <div className="hb-yg6-field">
                    <label htmlFor={`${id}-email`}>Work email</label>
                    <input
                      id={`${id}-email`}
                      className="hb-yg6-input"
                      type="email"
                      autoComplete="email"
                      placeholder="ada@analytical.co"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={`${id}-email-err`}
                      disabled={status === "loading"}
                    />
                    <p id={`${id}-email-err`} className="hb-yg6-err">{errors.email}</p>
                  </div>
                </div>
                <button type="submit" className="hb-yg6-btn" disabled={status === "loading"}>
                  {status === "loading" ? <><span className="hb-yg6-spin" aria-hidden="true" />Saving your spot</> : `Join ${totalSignups.toLocaleString("en-US")} others`}
                </button>
              </form>
            )}
            <ul className="hb-yg6-rewards" aria-label="Referral rewards">
              {rewards.map((r) => (
                <li key={r.friends} className="hb-yg6-reward">
                  <b>{r.friends}</b>
                  {r.label}
                  <em>{r.friends === 1 ? "1 friend" : `${r.friends} friends`}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hb-yg6-board">
          <div className="hb-yg6-board-head">
            <h3>Top referrers this week</h3>
            <span className="hb-yg6-live"><i aria-hidden="true" />Live</span>
          </div>
          <ol className="hb-yg6-list">
            {referrers.map((r, i) => (
              <li key={r.handle} className="hb-yg6-row" style={{ "--hb-yg6-h": r.hue, animationDelay: `${(i * 0.07).toFixed(2)}s` } as React.CSSProperties}>
                <span className="hb-yg6-rank">{i + 1}</span>
                <span className="hb-yg6-av" aria-hidden="true">{initials(r.name)}</span>
                <span className="hb-yg6-who">
                  <strong>{r.name}</strong>
                  <span className="hb-yg6-track"><span className="hb-yg6-fill" style={{ width: `${((r.referrals / max) * 100).toFixed(1)}%`, animationDelay: `${(0.2 + i * 0.07).toFixed(2)}s` }} /></span>
                </span>
                <span className="hb-yg6-n">{r.referrals}<small>friends</small></span>
              </li>
            ))}
            {you && (
              <li className="hb-yg6-row" data-you="true" style={{ "--hb-yg6-h": you.hue } as React.CSSProperties}>
                <span className="hb-yg6-rank">-</span>
                <span className="hb-yg6-av" aria-hidden="true">{initials(you.name)}</span>
                <span className="hb-yg6-who">
                  <strong>{you.name} (you)</strong>
                  <span className="hb-yg6-track" />
                </span>
                <span className="hb-yg6-n">0<small>friends</small></span>
              </li>
            )}
          </ol>
        </div>
      </div>
    </section>
  );
}
