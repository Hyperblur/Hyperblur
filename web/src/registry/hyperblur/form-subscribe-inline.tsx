"use client";

import * as React from "react";

export interface FormSubscribeInlineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  placeholder?: string;
  buttonLabel?: string;
  frequencies?: string[];
  readers?: string;
  accent?: string;
  delay?: number;
  onSubmit?: (email: string, frequency: string) => void | Promise<void>;
}

const css = `
.hb-xh8 {
  --hb-xh8-a: #ff4f8b;
  --hb-xh8-bw: 118px;
  box-sizing: border-box;
  width: 100%;
  max-width: 420px;
  font-family: inherit;
  color: #ededed;
}
.hb-xh8 *, .hb-xh8 *::before, .hb-xh8 *::after { box-sizing: border-box; }
.hb-xh8-form { position: relative; }
.hb-xh8-row {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 4px;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  background: linear-gradient(180deg, #121212, #0d0d0d);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 12px 30px -14px rgba(0,0,0,0.9);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-xh8-row:focus-within { border-color: color-mix(in srgb, var(--hb-xh8-a) 70%, #2a2a2a); box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 4px color-mix(in srgb, var(--hb-xh8-a) 16%, transparent), 0 12px 30px -14px rgba(0,0,0,0.9); }
.hb-xh8-row[data-bad="a"], .hb-xh8-row[data-bad="b"] { border-color: #f05260; animation: hb-xh8-shake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xh8-row[data-bad="b"] { animation-name: hb-xh8-shake-b; }
.hb-xh8-ico { display: grid; place-items: center; width: 34px; flex: none; color: #6b6b6b; transition: color 0.2s ease; }
.hb-xh8-row:focus-within .hb-xh8-ico { color: var(--hb-xh8-a); }
.hb-xh8-ico svg { width: 17px; height: 17px; }
.hb-xh8-in { flex: 1; min-width: 0; height: 100%; padding: 0 calc(var(--hb-xh8-bw) + 8px) 0 2px; border: 0; outline: 0; background: transparent; color: #ededed; font: inherit; font-size: 14px; }
.hb-xh8-in::placeholder { color: #575757; }
.hb-xh8-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  bottom: 4px;
  z-index: 2;
  width: var(--hb-xh8-bw);
  border: 0;
  border-radius: 10px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xh8-a) 88%, #fff), var(--hb-xh8-a));
  color: #fff;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 16px -6px var(--hb-xh8-a);
  transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), filter 0.2s ease, opacity 0.2s ease;
}
.hb-xh8-btn:hover { filter: brightness(1.08); }
.hb-xh8-btn:active { transform: scale(0.97); }
.hb-xh8-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xh8-cover {
  position: absolute;
  inset: 4px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px 0 14px;
  border-radius: 10px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xh8-a) 88%, #fff), var(--hb-xh8-a));
  color: #fff;
  font-size: 13.5px;
  font-weight: 500;
  overflow: hidden;
  clip-path: inset(0 0 0 calc(100% - var(--hb-xh8-bw)) round 10px);
  opacity: 0;
  pointer-events: none;
  transition: clip-path 0.6s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.15s ease, background 0.5s ease;
}
.hb-xh8[data-s="loading"] .hb-xh8-cover, .hb-xh8[data-s="done"] .hb-xh8-cover { clip-path: inset(0 0 0 0 round 10px); opacity: 1; pointer-events: auto; }
.hb-xh8[data-s="done"] .hb-xh8-cover { background: linear-gradient(180deg, #1b2a20, #142019); color: #c9f7da; box-shadow: inset 0 0 0 1px rgba(61,220,132,0.3); }
.hb-xh8-prog { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: rgba(255,255,255,0.8); transform-origin: left; animation: hb-xh8-prog var(--hb-xh8-d) cubic-bezier(0.4, 0, 0.2, 1) both; }
.hb-xh8-dots { display: inline-flex; gap: 3px; }
.hb-xh8-dots i { width: 4px; height: 4px; border-radius: 50%; background: currentColor; animation: hb-xh8-dot 1s ease-in-out infinite; }
.hb-xh8-dots i:nth-child(2) { animation-delay: 0.15s; }
.hb-xh8-dots i:nth-child(3) { animation-delay: 0.3s; }
.hb-xh8-ok { flex: none; width: 22px; height: 22px; border-radius: 50%; background: #3ddc84; display: grid; place-items: center; animation: hb-xh8-pop 0.4s 0.1s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.hb-xh8-ok svg { width: 12px; height: 12px; stroke: #062b15; stroke-dasharray: 16; stroke-dashoffset: 16; animation: hb-xh8-draw 0.35s 0.35s ease-out forwards; }
.hb-xh8-txt { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xh8-txt b { color: #fff; font-weight: 600; }
.hb-xh8-mail { flex: none; display: inline-flex; align-items: center; gap: 5px; height: 30px; padding: 0 10px; border-radius: 8px; background: rgba(61,220,132,0.14); color: #a6f3c4; font-size: 12px; font-weight: 600; text-decoration: none; border: 0; cursor: pointer; font-family: inherit; transition: background 0.2s ease; }
.hb-xh8-mail:hover { background: rgba(61,220,132,0.24); }
.hb-xh8-mail:focus-visible { outline: 2px solid #3ddc84; outline-offset: 1px; }
.hb-xh8-mail svg { width: 12px; height: 12px; }
.hb-xh8-tip { position: absolute; left: 30px; bottom: calc(100% + 8px); z-index: 4; padding: 6px 10px; border-radius: 8px; background: #f05260; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; box-shadow: 0 8px 18px -8px rgba(240,82,96,0.8); animation: hb-xh8-tip 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh8-tip::after { content: ""; position: absolute; left: 14px; top: 100%; border: 5px solid transparent; border-top-color: #f05260; }
.hb-xh8-meta { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 10px; font-size: 12px; color: #7a7a7a; }
.hb-xh8-freq { display: inline-flex; padding: 2px; border: 1px solid #242424; border-radius: 8px; background: #0e0e0e; }
.hb-xh8-freq button { height: 24px; padding: 0 9px; border: 0; border-radius: 6px; background: transparent; color: #7f7f7f; font: inherit; font-size: 11.5px; cursor: pointer; transition: background 0.2s ease, color 0.2s ease; }
.hb-xh8-freq button[aria-checked="true"] { background: #1f1f1f; color: #f0f0f0; box-shadow: inset 0 1px 0 rgba(255,255,255,0.06); }
.hb-xh8-freq button:focus-visible { outline: 2px solid var(--hb-xh8-a); }
.hb-xh8-who { display: inline-flex; align-items: center; gap: 8px; min-width: 0; }
.hb-xh8-who span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xh8-avs { display: inline-flex; flex: none; }
.hb-xh8-avs i { width: 18px; height: 18px; margin-left: -6px; border-radius: 50%; border: 2px solid #0a0a0a; }
.hb-xh8-avs i:first-child { margin-left: 0; }
.hb-xh8-undo { padding: 0; border: 0; background: none; color: #a1a1a1; font: inherit; font-size: 12px; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #444; }
.hb-xh8-undo:hover { color: #fff; }
.hb-xh8-undo:focus-visible { outline: 2px solid var(--hb-xh8-a); outline-offset: 2px; border-radius: 3px; }
@keyframes hb-xh8-shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-5px); } 40%, 60% { transform: translateX(5px); } }
@keyframes hb-xh8-shake-b { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-5px); } 40%, 60% { transform: translateX(5px); } }
@keyframes hb-xh8-prog { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-xh8-dot { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
@keyframes hb-xh8-pop { from { transform: scale(0); } to { transform: scale(1); } }
@keyframes hb-xh8-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-xh8-tip { from { opacity: 0; transform: translateY(6px) scale(0.9); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xh8 *, .hb-xh8 *::before, .hb-xh8 *::after { animation: none !important; transition: none !important; }
  .hb-xh8-ok svg { stroke-dashoffset: 0; }
}
`;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inboxes: Record<string, { label: string; href: string }> = {
  "gmail.com": { label: "Open Gmail", href: "https://mail.google.com/mail/u/0/#inbox" },
  "googlemail.com": { label: "Open Gmail", href: "https://mail.google.com/mail/u/0/#inbox" },
  "outlook.com": { label: "Open Outlook", href: "https://outlook.live.com/mail/0/" },
  "hotmail.com": { label: "Open Outlook", href: "https://outlook.live.com/mail/0/" },
  "live.com": { label: "Open Outlook", href: "https://outlook.live.com/mail/0/" },
  "icloud.com": { label: "Open iCloud", href: "https://www.icloud.com/mail" },
  "proton.me": { label: "Open Proton", href: "https://mail.proton.me" },
  "yahoo.com": { label: "Open Yahoo", href: "https://mail.yahoo.com" },
};

const avatarColors = ["linear-gradient(135deg,#ff9a8b,#ff6a88)", "linear-gradient(135deg,#7f7fd5,#86a8e7)", "linear-gradient(135deg,#f6d365,#fda085)", "linear-gradient(135deg,#84fab0,#8fd3f4)"];

export function FormSubscribeInline({
  placeholder = "you@studio.com",
  buttonLabel = "Subscribe",
  frequencies = ["Weekly", "Monthly"],
  readers = "Join 12,400 designers",
  accent = "#ff4f8b",
  delay = 1300,
  onSubmit,
  className,
  style,
  ...rest
}: FormSubscribeInlineProps) {
  const uid = React.useId();
  const [email, setEmail] = React.useState("");
  const [freq, setFreq] = React.useState(frequencies[0] ?? "");
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");
  const [bad, setBad] = React.useState(0);
  const input = React.useRef<HTMLInputElement>(null);
  const mail = React.useRef<HTMLButtonElement>(null);

  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  const inbox = inboxes[domain];
  const message = !email.trim() ? "Enter your email first" : "That email is missing something";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    if (!emailRe.test(email.trim())) {
      setBad((n) => n + 1);
      input.current?.focus();
      return;
    }
    setBad(0);
    setStatus("loading");
    try {
      await Promise.all([Promise.resolve(onSubmit?.(email.trim(), freq)), new Promise((r) => window.setTimeout(r, delay))]);
      setStatus("done");
      window.requestAnimationFrame(() => mail.current?.focus({ preventScroll: true }));
    } catch {
      setStatus("idle");
      setBad((n) => n + 1);
    }
  };

  const reset = () => {
    setStatus("idle");
    window.requestAnimationFrame(() => input.current?.focus());
  };

  return (
    <div className={["hb-xh8", className].filter(Boolean).join(" ")} data-s={status} style={{ ...style, "--hb-xh8-a": accent, "--hb-xh8-d": `${delay}ms` } as React.CSSProperties} {...rest}>
      <style href="hb-form-subscribe-inline" precedence="default">{css}</style>
      <form className="hb-xh8-form" onSubmit={submit} noValidate>
        {bad > 0 ? <span className="hb-xh8-tip" key={bad} role="alert" id={`${uid}-tip`}>{message}</span> : null}
        <div className="hb-xh8-row" data-bad={bad ? (bad % 2 ? "a" : "b") : undefined}>
          <span className="hb-xh8-ico" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2.5" y="4.5" width="15" height="11" rx="2.5" />
              <path d="m3.5 6 6.5 5 6.5-5" />
            </svg>
          </span>
          <input
            ref={input}
            className="hb-xh8-in"
            type="email"
            autoComplete="email"
            aria-label="Email address"
            placeholder={placeholder}
            value={email}
            disabled={status !== "idle"}
            onChange={(e) => { setEmail(e.target.value); if (bad) setBad(0); }}
            aria-invalid={bad > 0 ? true : undefined}
            aria-describedby={bad > 0 ? `${uid}-tip` : undefined}
          />
          <button type="submit" className="hb-xh8-btn" tabIndex={status === "idle" ? 0 : -1}>{buttonLabel}</button>
          <div className="hb-xh8-cover" aria-live="polite">
            {status === "loading" ? (
              <>
                <span className="hb-xh8-txt">Adding you to the list</span>
                <span className="hb-xh8-dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="hb-xh8-prog" aria-hidden="true" />
              </>
            ) : null}
            {status === "done" ? (
              <>
                <span className="hb-xh8-ok" aria-hidden="true">
                  <svg viewBox="0 0 12 12" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m2.5 6.2 2.3 2.3 4.7-5" /></svg>
                </span>
                <span className="hb-xh8-txt">Confirm via <b>{email.trim()}</b></span>
                {inbox ? (
                  <a className="hb-xh8-mail" href={inbox.href} target="_blank" rel="noreferrer">
                    {inbox.label}
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 8 8 4M5 4h3v3" /></svg>
                  </a>
                ) : (
                  <button ref={mail} type="button" className="hb-xh8-mail" onClick={reset}>Edit</button>
                )}
              </>
            ) : null}
          </div>
        </div>
      </form>
      <div className="hb-xh8-meta">
        <span className="hb-xh8-who">
          <span className="hb-xh8-avs" aria-hidden="true">
            {avatarColors.map((c) => <i key={c} style={{ background: c }} />)}
          </span>
          <span>{status === "done" ? `${freq} issue, every ${freq === "Monthly" ? "first Tuesday" : "Thursday"}` : readers}</span>
        </span>
        {status === "done" ? (
          <button type="button" className="hb-xh8-undo" onClick={reset}>Use another email</button>
        ) : (
          <span className="hb-xh8-freq" role="radiogroup" aria-label="Frequency">
            {frequencies.map((f) => (
              <button key={f} type="button" role="radio" aria-checked={freq === f} onClick={() => setFreq(f)}>{f}</button>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
