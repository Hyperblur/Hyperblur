"use client";

import * as React from "react";

export interface WaitlistLadderRung {
  at: number;
  title: string;
  detail: string;
}

export interface WaitlistReferralLadderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  rungs?: WaitlistLadderRung[];
  basePosition?: number;
  spotsPerReferral?: number;
  referrals?: number;
  defaultReferrals?: number;
  defaultJoined?: boolean;
  referralBase?: string;
  simulateJoins?: boolean;
  onJoin?: (email: string) => void | Promise<void>;
  onInvite?: (emails: string[]) => void;
  onLinkCopy?: (link: string) => void;
  accent?: string;
}

const defaultRungs: WaitlistLadderRung[] = [
  { at: 0, title: "On the list", detail: "Your spot is saved" },
  { at: 1, title: "Skip 250 spots", detail: "Per friend who joins" },
  { at: 3, title: "Wave one access", detail: "In before the public beta" },
  { at: 5, title: "Founding badge", detail: "On your profile, forever" },
  { at: 10, title: "A year of Pro", detail: "Worth 144 dollars" },
];

const css = `
@keyframes hb-wd8-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes hb-wd8-shine { from { transform: translateY(100%); } to { transform: translateY(-100%); } }
@keyframes hb-wd8-burst { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(2.4); opacity: 0; } }
@keyframes hb-wd8-spin { to { transform: rotate(360deg); } }
.hb-wd8 {
  --hb-wd8-accent: #a3e635;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
.hb-wd8 *, .hb-wd8 *::before, .hb-wd8 *::after { box-sizing: border-box; }
.hb-wd8::before { content: ""; position: absolute; right: -10%; bottom: -30%; width: 60%; height: 90%; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-wd8-accent) 12%, transparent), transparent); pointer-events: none; }
.hb-wd8-in { position: relative; max-width: 1120px; margin: 0 auto; padding: 76px 20px 92px; display: grid; gap: 44px; align-items: center; }
@container (min-width: 880px) { .hb-wd8-in { grid-template-columns: 1.05fr 1fr; gap: 72px; } }
.hb-wd8-eyebrow { font: 500 12px/1 var(--font-mono, monospace); letter-spacing: 0.08em; text-transform: uppercase; color: var(--hb-wd8-accent); }
.hb-wd8-title { margin: 14px 0 14px; font: 600 clamp(32px, 5cqw, 54px)/1 var(--font-grotesk, inherit); letter-spacing: -0.035em; }
.hb-wd8-sub { margin: 0 0 26px; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; max-width: 42ch; }
.hb-wd8-form { display: flex; gap: 8px; max-width: 440px; flex-wrap: wrap; }
.hb-wd8-input { flex: 1 1 220px; min-width: 0; height: 48px; padding: 0 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: #121212; color: #ededed; font: 400 15px/1 inherit; font-family: inherit; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.hb-wd8-input::placeholder { color: #5e5e5e; }
.hb-wd8-input:focus { border-color: color-mix(in srgb, var(--hb-wd8-accent) 70%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wd8-accent) 18%, transparent); }
.hb-wd8-btn { appearance: none; border: 0; height: 48px; padding: 0 20px; border-radius: 12px; background: var(--hb-wd8-accent); color: #0b1203; font: 600 14px/1 inherit; font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 10px 26px -12px var(--hb-wd8-accent); transition: transform 0.2s cubic-bezier(0.34, 1.4, 0.5, 1), filter 0.2s ease; }
.hb-wd8-btn:hover { filter: brightness(1.06); }
.hb-wd8-btn:active { transform: scale(0.97); }
.hb-wd8-btn:focus-visible { outline: 2px solid #ededed; outline-offset: 3px; }
.hb-wd8-ghost { background: #171717; color: #ededed; box-shadow: inset 0 1px 0 rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); }
.hb-wd8-spin { width: 15px; height: 15px; border-radius: 50%; border: 2px solid rgba(11,18,3,0.25); border-top-color: #0b1203; animation: hb-wd8-spin 0.7s linear infinite; }
.hb-wd8-err { margin: 8px 0 0; font-size: 12.5px; color: #f87171; }
.hb-wd8-me { display: grid; gap: 14px; max-width: 460px; padding: 18px; border-radius: 18px; background: #111; border: 1px solid rgba(255,255,255,0.08); animation: hb-wd8-rise 0.5s ease both; }
.hb-wd8-pos { display: flex; align-items: baseline; gap: 10px; }
.hb-wd8-pos b { font: 600 34px/1 var(--font-grotesk, inherit); letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.hb-wd8-pos span { font-size: 13px; color: #8f8f8f; }
.hb-wd8-pos em { margin-left: auto; font: 600 12px/1 var(--font-mono, monospace); font-style: normal; color: var(--hb-wd8-accent); }
.hb-wd8-link { display: flex; gap: 6px; align-items: center; padding: 5px 5px 5px 12px; border-radius: 12px; background: #0b0b0b; border: 1px dashed rgba(255,255,255,0.14); }
.hb-wd8-link code { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 500 13px/1 var(--font-mono, monospace); color: #cfcfcf; }
.hb-wd8-copy { height: 36px; padding: 0 14px; font-size: 13px; }
.hb-wd8-chips { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 6px; border-radius: 12px; background: #0b0b0b; border: 1px solid rgba(255,255,255,0.08); }
.hb-wd8-chips:focus-within { border-color: color-mix(in srgb, var(--hb-wd8-accent) 60%, transparent); }
.hb-wd8-chip { display: inline-flex; align-items: center; gap: 6px; padding: 5px 6px 5px 10px; border-radius: 8px; background: #1b1b1b; font-size: 12.5px; color: #dcdcdc; }
.hb-wd8-chip[data-state="joined"] { background: color-mix(in srgb, var(--hb-wd8-accent) 18%, #141414); color: #fff; }
.hb-wd8-chip small { font: 500 10px/1 var(--font-mono, monospace); color: #8f8f8f; }
.hb-wd8-chip[data-state="joined"] small { color: var(--hb-wd8-accent); }
.hb-wd8-x { appearance: none; border: 0; background: transparent; color: #8f8f8f; width: 18px; height: 18px; border-radius: 5px; cursor: pointer; display: grid; place-items: center; }
.hb-wd8-x:hover { background: #2a2a2a; color: #fff; }
.hb-wd8-x:focus-visible { outline: 2px solid var(--hb-wd8-accent); }
.hb-wd8-chips input { flex: 1 1 140px; min-width: 120px; border: 0; background: transparent; color: #ededed; font: 400 13.5px/1 inherit; font-family: inherit; padding: 6px; outline: none; }
.hb-wd8-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
.hb-wd8-row small { font-size: 12px; color: #8f8f8f; }
.hb-wd8-ladder { position: relative; padding: 22px 22px 22px 18px; border-radius: 22px; border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, #121212, #0d0d0d); box-shadow: inset 0 1px 0 rgba(255,255,255,0.05); }
.hb-wd8-lhead { display: flex; justify-content: space-between; align-items: center; margin: 0 0 18px 4px; font: 500 11px/1 var(--font-mono, monospace); letter-spacing: 0.08em; text-transform: uppercase; color: #8f8f8f; }
.hb-wd8-lhead b { color: #ededed; font-size: 13px; letter-spacing: 0; }
.hb-wd8-climb { position: relative; display: grid; grid-template-columns: 44px 1fr; }
.hb-wd8-rail { position: relative; grid-row: 1 / -1; grid-column: 1; justify-self: center; width: 6px; border-radius: 3px; background: #1f1f1f; overflow: hidden; margin: 29px 0; }
.hb-wd8-fill { position: absolute; left: 0; right: 0; bottom: 0; border-radius: 3px; background: linear-gradient(0deg, color-mix(in srgb, var(--hb-wd8-accent) 40%, transparent), var(--hb-wd8-accent)); transition: height 1s cubic-bezier(0.65, 0, 0.35, 1); }
.hb-wd8-fill::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, transparent, rgba(255,255,255,0.7), transparent); animation: hb-wd8-shine 2.4s ease-in-out infinite; }
.hb-wd8-climber { position: absolute; left: 22px; z-index: 3; transform: translate(-50%, 50%); transition: bottom 1s cubic-bezier(0.65, 0, 0.35, 1); padding: 4px 8px; border-radius: 999px; background: #ededed; color: #0a0a0a; font: 700 10.5px/1 var(--font-mono, monospace); box-shadow: 0 0 0 4px #0d0d0d, 0 0 20px color-mix(in srgb, var(--hb-wd8-accent) 60%, transparent); white-space: nowrap; }
.hb-wd8-rungs { grid-column: 2; list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column-reverse; gap: 10px; }
.hb-wd8-rung { position: relative; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.06); background: #121212; animation: hb-wd8-rise 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both; transition: border-color 0.4s ease, background-color 0.4s ease; }
.hb-wd8-rung::before { content: ""; position: absolute; left: -27px; top: 50%; width: 12px; height: 12px; margin-top: -6px; border-radius: 50%; background: #0d0d0d; border: 2px solid #333; transition: border-color 0.3s ease, background-color 0.3s ease; }
.hb-wd8-rung[data-done="true"] { border-color: color-mix(in srgb, var(--hb-wd8-accent) 35%, transparent); background: linear-gradient(90deg, color-mix(in srgb, var(--hb-wd8-accent) 9%, #121212), #121212); }
.hb-wd8-rung[data-done="true"]::before { border-color: var(--hb-wd8-accent); background: var(--hb-wd8-accent); }
.hb-wd8-rung[data-next="true"] { border-color: rgba(255,255,255,0.18); }
.hb-wd8-rung strong { display: block; font-size: 14.5px; font-weight: 600; }
.hb-wd8-rung span { display: block; font-size: 12px; color: #8a8a8a; margin-top: 3px; }
.hb-wd8-badge { font: 600 11px/1 var(--font-mono, monospace); padding: 6px 8px; border-radius: 8px; background: #1b1b1b; color: #a1a1a1; white-space: nowrap; }
.hb-wd8-rung[data-done="true"] .hb-wd8-badge { background: var(--hb-wd8-accent); color: #0b1203; }
.hb-wd8-pop { position: absolute; left: -27px; top: 50%; width: 12px; height: 12px; margin-top: -6px; border-radius: 50%; border: 2px solid var(--hb-wd8-accent); animation: hb-wd8-burst 0.8s ease-out both; pointer-events: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-wd8 *, .hb-wd8 *::before, .hb-wd8 *::after { animation: none !important; transition: none !important; }
  .hb-wd8-pop { display: none; }
}
`;

export function WaitlistReferralLadder({
  eyebrow = "Early access",
  title = "Bring friends, climb the ladder",
  subtitle = "Join the Tallyhall waitlist, share your link, and every friend who signs up moves you up a rung. Rewards unlock the moment they join.",
  rungs = defaultRungs,
  basePosition = 4318,
  spotsPerReferral = 250,
  referrals,
  defaultReferrals = 0,
  defaultJoined = false,
  referralBase = "tallyhall.app/r/",
  simulateJoins = false,
  onJoin,
  onInvite,
  onLinkCopy,
  accent = "#a3e635",
  className = "",
  style,
  ...rest
}: WaitlistReferralLadderProps) {
  const uid = React.useId().replace(/:/g, "");
  const [joined, setJoined] = React.useState(defaultJoined);
  const [email, setEmail] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [inner, setInner] = React.useState(defaultReferrals);
  const [copied, setCopied] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const [invites, setInvites] = React.useState<{ email: string; state: "draft" | "sent" | "joined" }[]>([]);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const count = referrals ?? inner;
  const max = rungs[rungs.length - 1]?.at || 1;

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const seg = (n: number) => {
    const idx = rungs.findIndex((r) => r.at > n);
    if (idx === -1) return 1;
    if (idx === 0) return 0;
    const a = rungs[idx - 1];
    const b = rungs[idx];
    const t = (n - a.at) / (b.at - a.at);
    return (idx - 1 + t) / (rungs.length - 1);
  };
  const progress = seg(Math.min(count, max));
  const position = Math.max(1, basePosition - count * spotsPerReferral);
  const nextRung = rungs.find((r) => r.at > count);
  const code = (email.split("@")[0] || "you").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10) || "you";
  const link = `${referralBase}${code}`;

  const join = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email to save your spot.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      if (onJoin) await onJoin(email);
      else await new Promise((r) => setTimeout(r, 750));
      setJoined(true);
    } catch {
      setError("Could not save your spot. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(`https://${link}`);
    } catch {}
    setCopied(true);
    onLinkCopy?.(`https://${link}`);
    timers.current.push(setTimeout(() => setCopied(false), 1600));
  };

  const addDraft = () => {
    const v = draft.trim().replace(/,$/, "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || invites.some((i) => i.email === v)) return;
    setInvites((s) => [...s, { email: v, state: "draft" }]);
    setDraft("");
  };

  const send = () => {
    const pending = invites.filter((i) => i.state === "draft").map((i) => i.email);
    if (!pending.length) return;
    setInvites((s) => s.map((i) => (i.state === "draft" ? { ...i, state: "sent" } : i)));
    onInvite?.(pending);
    if (simulateJoins) {
      pending.forEach((m, k) => {
        timers.current.push(
          setTimeout(() => {
            setInvites((s) => s.map((i) => (i.email === m ? { ...i, state: "joined" } : i)));
            setInner((c) => c + 1);
          }, 1400 + k * 1100),
        );
      });
    }
  };

  return (
    <section className={`hb-wd8 ${className}`} style={{ "--hb-wd8-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-waitlist-referral-ladder" precedence="default">{css}</style>
      <div className="hb-wd8-in">
        <div>
          <div className="hb-wd8-eyebrow">{eyebrow}</div>
          <h2 className="hb-wd8-title">{title}</h2>
          <p className="hb-wd8-sub">{subtitle}</p>
          {!joined ? (
            <>
              <form className="hb-wd8-form" onSubmit={join} noValidate>
                <input className="hb-wd8-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@studio.com" aria-label="Email address" aria-invalid={!!error} aria-describedby={error ? `${uid}-err` : undefined} autoComplete="email" />
                <button type="submit" className="hb-wd8-btn" disabled={saving}>
                  {saving && <span className="hb-wd8-spin" aria-hidden="true" />}
                  {saving ? "Saving" : "Save my spot"}
                </button>
              </form>
              {error && <p id={`${uid}-err`} className="hb-wd8-err" role="alert">{error}</p>}
            </>
          ) : (
            <div className="hb-wd8-me">
              <div className="hb-wd8-pos" aria-live="polite">
                <b>#{position.toLocaleString("en-US")}</b>
                <span>your place in line</span>
                {count > 0 && <em>+{(count * spotsPerReferral).toLocaleString("en-US")} spots</em>}
              </div>
              <div className="hb-wd8-link">
                <code>{link}</code>
                <button type="button" className="hb-wd8-btn hb-wd8-copy" onClick={copy} aria-live="polite">
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
              <div className="hb-wd8-chips">
                {invites.map((i) => (
                  <span key={i.email} className="hb-wd8-chip" data-state={i.state}>
                    {i.email}
                    {i.state !== "draft" && <small>{i.state === "joined" ? "joined" : "sent"}</small>}
                    {i.state === "draft" && (
                      <button type="button" className="hb-wd8-x" aria-label={`Remove ${i.email}`} onClick={() => setInvites((s) => s.filter((x) => x.email !== i.email))}>
                        <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M2 2l6 6M8 2L2 8" /></svg>
                      </button>
                    )}
                  </span>
                ))}
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "," || e.key === " ") {
                      e.preventDefault();
                      addDraft();
                    } else if (e.key === "Backspace" && !draft && invites.length && invites[invites.length - 1].state === "draft") {
                      setInvites((s) => s.slice(0, -1));
                    }
                  }}
                  onBlur={addDraft}
                  placeholder={invites.length ? "Add another" : "Friend emails, press Enter"}
                  aria-label="Invite friends by email"
                />
              </div>
              <div className="hb-wd8-row">
                <small>{nextRung ? `${nextRung.at - count} more to unlock ${nextRung.title.toLowerCase()}` : "Every reward unlocked"}</small>
                <button type="button" className="hb-wd8-btn hb-wd8-ghost" style={{ height: 40 }} onClick={send} disabled={!invites.some((i) => i.state === "draft")}>
                  Send invites
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="hb-wd8-ladder">
          <div className="hb-wd8-lhead">
            <span>Reward ladder</span>
            <b>
              {count} / {max} friends
            </b>
          </div>
          <div className="hb-wd8-climb">
            <div className="hb-wd8-rail" aria-hidden="true">
              <span className="hb-wd8-fill" style={{ height: `${(progress * 100).toFixed(1)}%` }} />
            </div>
            <span className="hb-wd8-climber" style={{ bottom: `calc(29px + (100% - 58px) * ${progress.toFixed(3)})` }} aria-hidden="true">
              {joined ? "YOU" : "START"}
            </span>
            <ol className="hb-wd8-rungs" role="list" aria-label="Rewards">
              {rungs.map((r, i) => {
                const done = joined && count >= r.at;
                return (
                  <li key={r.title} className="hb-wd8-rung" data-done={done} data-next={nextRung === r} style={{ animationDelay: `${((rungs.length - i) * 0.07).toFixed(2)}s` }}>
                    <div>
                      <strong>{r.title}</strong>
                      <span>{r.detail}</span>
                    </div>
                    <span className="hb-wd8-badge">{r.at === 0 ? "Join" : `${r.at} ${r.at === 1 ? "friend" : "friends"}`}</span>
                    {done && r.at > 0 && <span key={`p${count}`} className="hb-wd8-pop" aria-hidden="true" />}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
