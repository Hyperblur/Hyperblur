"use client";

import * as React from "react";

export type AuthFlowOtpChannel = "sms" | "email" | "call";

export interface AuthFlowOtpVerifyProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "defaultValue" | "onChange"> {
  title?: string;
  length?: number;
  destinations?: Partial<Record<AuthFlowOtpChannel, string>>;
  defaultChannel?: AuthFlowOtpChannel;
  defaultValue?: string;
  resendSeconds?: number;
  maxAttempts?: number;
  onVerify?: (code: string, channel: AuthFlowOtpChannel) => boolean | void | Promise<boolean | void>;
  onResend?: (channel: AuthFlowOtpChannel) => void;
  onChannelChange?: (channel: AuthFlowOtpChannel) => void;
  onBack?: () => void;
  headingAs?: "h1" | "h2" | "h3";
  accent?: string;
}

const channelLabels: Record<AuthFlowOtpChannel, string> = { sms: "Text", email: "Email", call: "Call" };

const css = `
@keyframes hb-vg1-drop {
  0% { opacity: 0; transform: translate3d(0, -14px, 0) scale(.7); }
  60% { opacity: 1; transform: translate3d(0, 2px, 0) scale(1.06); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes hb-vg1-shake {
  0%, 100% { transform: translateX(0); }
  18% { transform: translateX(-10px); }
  36% { transform: translateX(8px); }
  54% { transform: translateX(-5px); }
  72% { transform: translateX(3px); }
}
@keyframes hb-vg1-sweep {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}
@keyframes hb-vg1-blink { 50% { opacity: 0; } }
@keyframes hb-vg1-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-vg1-rise {
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-vg1 {
  --hb-vg1-accent: #22d3ee;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 88px 20px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vg1 *, .hb-vg1 *::before, .hb-vg1 *::after { box-sizing: border-box; }
.hb-vg1::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse 46% 38% at 50% 0%, color-mix(in srgb, var(--hb-vg1-accent) 18%, transparent), transparent 72%),
    repeating-linear-gradient(90deg, rgba(255,255,255,.025) 0 1px, transparent 1px 64px);
  -webkit-mask-image: linear-gradient(180deg, #000 30%, transparent);
  mask-image: linear-gradient(180deg, #000 30%, transparent);
}
.hb-vg1-card {
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  padding: 36px 36px 28px;
  border: 1px solid #222;
  border-radius: 22px;
  background: linear-gradient(180deg, #141414, #0e0e0e);
  box-shadow: 0 1px 0 rgba(255,255,255,.06) inset, 0 40px 80px -40px rgba(0,0,0,.9), 0 0 0 1px rgba(0,0,0,.4);
}
.hb-vg1-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hb-vg1-step { color: #8f8f8f; font-size: 12px; font-weight: 550; letter-spacing: .08em; text-transform: uppercase; font-family: var(--font-mono), ui-monospace, monospace; }
.hb-vg1-seg {
  position: relative;
  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  padding: 3px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #0a0a0a;
}
.hb-vg1-thumb {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  border-radius: 999px;
  background: linear-gradient(180deg, #262626, #1c1c1c);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 2px 6px rgba(0,0,0,.5);
  transition: transform .42s cubic-bezier(.3, 1.3, .5, 1);
}
.hb-vg1-chan {
  position: relative;
  z-index: 1;
  min-width: 58px;
  padding: 6px 12px;
  border: 0;
  border-radius: 999px;
  background: none;
  color: #8f8f8f;
  font: inherit;
  font-size: 12.5px;
  font-weight: 550;
  cursor: pointer;
  transition: color .2s ease;
}
.hb-vg1-chan[aria-checked="true"] { color: #ededed; }
.hb-vg1-chan:focus-visible { outline: 2px solid var(--hb-vg1-accent); outline-offset: 1px; }
.hb-vg1-title { margin: 26px 0 0; font-size: 28px; font-weight: 650; letter-spacing: -.03em; line-height: 1.15; }
.hb-vg1-sub { margin: 10px 0 0; color: #a1a1a1; font-size: 14.5px; line-height: 1.6; min-height: 46px; }
.hb-vg1-sub strong { color: #ededed; font-weight: 550; font-family: var(--font-mono), ui-monospace, monospace; font-size: 13.5px; }
.hb-vg1-field { position: relative; margin-top: 26px; }
.hb-vg1-input {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  border: 0;
  background: transparent;
  color: transparent;
  caret-color: transparent;
  font-size: 16px;
  letter-spacing: 3em;
  outline: none;
  opacity: .01;
  cursor: text;
}
.hb-vg1-rail {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--hb-vg1-n), 1fr);
  overflow: hidden;
  height: 72px;
  border: 1px solid #262626;
  border-radius: 16px;
  background: linear-gradient(180deg, #0b0b0b, #101010);
  box-shadow: inset 0 2px 8px rgba(0,0,0,.6);
  transition: border-color .25s ease, box-shadow .25s ease;
}
.hb-vg1-field[data-focus="true"] .hb-vg1-rail { border-color: color-mix(in srgb, var(--hb-vg1-accent) 60%, #262626); box-shadow: inset 0 2px 8px rgba(0,0,0,.6), 0 0 0 4px color-mix(in srgb, var(--hb-vg1-accent) 14%, transparent); }
.hb-vg1-slot {
  position: relative;
  display: grid;
  place-items: center;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 30px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: #ededed;
}
.hb-vg1-slot + .hb-vg1-slot::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22%;
  bottom: 22%;
  width: 1px;
  background: #1f1f1f;
}
.hb-vg1-slot[data-mid="true"]::before { top: 36%; bottom: 36%; width: 8px; left: -4px; height: auto; border-radius: 2px; background: #2a2a2a; }
.hb-vg1-digit { display: inline-block; animation: hb-vg1-drop .38s cubic-bezier(.3, 1.4, .5, 1) both; }
.hb-vg1-dot { width: 6px; height: 6px; border-radius: 50%; background: #2c2c2c; }
.hb-vg1-caret { width: 2px; height: 30px; border-radius: 2px; background: var(--hb-vg1-accent); animation: hb-vg1-blink 1s steps(1) infinite; }
.hb-vg1-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: calc(100% / var(--hb-vg1-n));
  border-radius: 3px 3px 0 0;
  background: var(--hb-vg1-accent);
  box-shadow: 0 0 18px var(--hb-vg1-accent);
  transform: translateX(calc(var(--hb-vg1-i) * 100%));
  transition: transform .34s cubic-bezier(.3, 1.2, .5, 1), opacity .2s ease;
}
.hb-vg1-field[data-focus="false"] .hb-vg1-bar { opacity: .35; }
.hb-vg1-scan {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-vg1-accent) 26%, transparent), transparent);
  animation: hb-vg1-sweep 1s cubic-bezier(.6, 0, .4, 1) infinite;
}
.hb-vg1[data-status="error"] .hb-vg1-rail { border-color: #7f1d1d; animation: hb-vg1-shake .45s cubic-bezier(.36, .07, .19, .97); }
.hb-vg1[data-status="error"] .hb-vg1-slot { color: #fca5a5; }
.hb-vg1[data-status="error"] .hb-vg1-bar { background: #f87171; box-shadow: 0 0 18px #f87171; }
.hb-vg1[data-status="success"] .hb-vg1-rail { border-color: #14532d; background: linear-gradient(180deg, #08130c, #0b1a10); }
.hb-vg1[data-status="success"] .hb-vg1-slot { color: #86efac; }
.hb-vg1[data-status="success"] .hb-vg1-bar { opacity: 0; }
.hb-vg1-msg { display: flex; align-items: center; gap: 8px; min-height: 22px; margin-top: 12px; color: #8f8f8f; font-size: 13px; }
.hb-vg1-msg[data-tone="error"] { color: #fca5a5; }
.hb-vg1-msg[data-tone="success"] { color: #86efac; animation: hb-vg1-rise .4s cubic-bezier(.2, .8, .2, 1) both; }
.hb-vg1-check path { stroke-dasharray: 24; stroke-dashoffset: 24; animation: hb-vg1-draw .5s .1s cubic-bezier(.65, 0, .35, 1) forwards; }
.hb-vg1-foot { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-top: 22px; padding-top: 20px; border-top: 1px solid #1f1f1f; }
.hb-vg1-hint { color: #8f8f8f; font-size: 13px; }
.hb-vg1-hint kbd { padding: 1px 6px; border: 1px solid #2a2a2a; border-bottom-width: 2px; border-radius: 5px; background: #151515; color: #cfcfcf; font: 500 11px/1.4 var(--font-mono), ui-monospace, monospace; }
.hb-vg1-back { padding: 0; border: 0; border-radius: 4px; background: none; color: var(--hb-vg1-accent); font: inherit; font-weight: 550; cursor: pointer; }
.hb-vg1-back:hover { text-decoration: underline; text-underline-offset: 3px; }
.hb-vg1-back:focus-visible { outline: 2px solid var(--hb-vg1-accent); outline-offset: 2px; }
.hb-vg1-resend {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px 6px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #121212;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;
  transition: border-color .2s ease, background .2s ease, transform .15s ease;
}
.hb-vg1-resend:hover:not(:disabled) { border-color: #3a3a3a; background: #171717; }
.hb-vg1-resend:active:not(:disabled) { transform: scale(.97); }
.hb-vg1-resend:disabled { color: #8f8f8f; cursor: default; }
.hb-vg1-resend:focus-visible { outline: 2px solid var(--hb-vg1-accent); outline-offset: 2px; }
.hb-vg1-ring { position: relative; display: grid; place-items: center; width: 26px; height: 26px; }
.hb-vg1-ring svg { position: absolute; inset: 0; transform: rotate(-90deg); }
.hb-vg1-ring-track { stroke: #262626; }
.hb-vg1-ring-fill { stroke: var(--hb-vg1-accent); transition: stroke-dashoffset 1s linear; }
.hb-vg1-ring span { font: 600 9.5px/1 var(--font-mono), ui-monospace, monospace; font-variant-numeric: tabular-nums; }
@media (max-width: 520px) {
  .hb-vg1-card { padding: 26px 20px 22px; }
  .hb-vg1-top { flex-direction: column; align-items: flex-start; }
  .hb-vg1-rail { height: 60px; }
  .hb-vg1-slot { font-size: 24px; }
  .hb-vg1-foot { flex-direction: column; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vg1 *, .hb-vg1 *::before, .hb-vg1 *::after { animation: none !important; transition: none !important; }
  .hb-vg1-check path { stroke-dashoffset: 0; }
}
`;

type Status = "idle" | "verifying" | "error" | "success" | "locked";

function settle(result: boolean | void | Promise<boolean | void>) {
  return result instanceof Promise ? result : new Promise<boolean | void>((resolve) => window.setTimeout(() => resolve(result), 900));
}

export function AuthFlowOtpVerify({
  title = "Enter the code we sent",
  length = 6,
  destinations = { sms: "+1 (415) ••• ••82", email: "m•••@northwind.io", call: "+1 (415) ••• ••82" },
  defaultChannel = "sms",
  defaultValue = "",
  resendSeconds = 30,
  maxAttempts = 3,
  onVerify,
  onResend,
  onChannelChange,
  onBack,
  headingAs = "h2",
  accent = "#22d3ee",
  className = "",
  style,
  ...rest
}: AuthFlowOtpVerifyProps) {
  const Heading = headingAs;
  const uid = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const channels = (Object.keys(channelLabels) as AuthFlowOtpChannel[]).filter((c) => destinations[c]);
  const [channel, setChannel] = React.useState<AuthFlowOtpChannel>(channels.includes(defaultChannel) ? defaultChannel : channels[0] ?? "sms");
  const [code, setCode] = React.useState(defaultValue.replace(/\D/g, "").slice(0, length));
  const [focus, setFocus] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [attempts, setAttempts] = React.useState(0);
  const [left, setLeft] = React.useState(resendSeconds);
  const [notice, setNotice] = React.useState("");

  React.useEffect(() => {
    if (left <= 0) return;
    const id = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [left]);

  const verify = React.useCallback(
    (value: string) => {
      setStatus("verifying");
      setNotice("Checking code");
      settle(onVerify ? onVerify(value, channel) : true).then(
        (ok) => {
          if (ok === false) {
            const next = attempts + 1;
            setAttempts(next);
            if (next >= maxAttempts) {
              setStatus("locked");
              setNotice("Too many attempts. Request a new code to continue.");
            } else {
              setStatus("error");
              setNotice(`That code didn't match. ${maxAttempts - next} ${maxAttempts - next === 1 ? "attempt" : "attempts"} left.`);
              window.setTimeout(() => {
                setCode("");
                inputRef.current?.focus();
              }, 450);
            }
          } else {
            setStatus("success");
            setNotice("Verified. Signing you in");
          }
        },
        () => {
          setStatus("error");
          setNotice("We couldn't reach the server. Try again.");
        },
      );
    },
    [attempts, channel, maxAttempts, onVerify],
  );

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status === "verifying" || status === "success" || status === "locked") return;
    const next = e.target.value.replace(/\D/g, "").slice(0, length);
    setCode(next);
    if (status === "error") {
      setStatus("idle");
      setNotice("");
    }
    if (next.length === length) verify(next);
  };

  const pick = (c: AuthFlowOtpChannel) => {
    if (status === "success") return;
    setChannel(c);
    onChannelChange?.(c);
  };

  const resend = () => {
    if (left > 0 || status === "success") return;
    onResend?.(channel);
    setLeft(resendSeconds);
    setAttempts(0);
    setCode("");
    setStatus("idle");
    setNotice(`New code sent by ${channelLabels[channel].toLowerCase()}.`);
    inputRef.current?.focus();
  };

  const onSegKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = channels.indexOf(channel);
    const next = channels[(i + (e.key === "ArrowRight" ? 1 : channels.length - 1)) % channels.length];
    pick(next);
    const el = e.currentTarget.querySelector<HTMLButtonElement>(`[data-c="${next}"]`);
    el?.focus();
  };

  const half = length % 2 === 0 ? length / 2 : -1;
  const active = Math.min(code.length, length - 1);
  const C = 2 * Math.PI * 11;
  const ratio = resendSeconds > 0 ? left / resendSeconds : 0;
  const verb = channel === "email" ? "emailed" : channel === "call" ? "will read it to" : "texted";
  const vars = { "--hb-vg1-accent": accent, "--hb-vg1-n": length, "--hb-vg1-i": active, ...style } as React.CSSProperties;
  const tone = status === "error" || status === "locked" ? "error" : status === "success" ? "success" : "info";

  return (
    <section
      className={`hb-vg1 ${className}`}
      style={vars}
      data-status={status}
      aria-labelledby={`${uid}-t`}
      onKeyDown={(e) => {
        if (e.key === "Escape" && onBack) onBack();
      }}
      {...rest}
    >
      <style href="hb-auth-flow-otp-verify" precedence="default">{css}</style>
      <div className="hb-vg1-card">
        <div className="hb-vg1-top">
          <span className="hb-vg1-step">Step 2 of 2</span>
          {channels.length > 1 ? (
            <div className="hb-vg1-seg" role="radiogroup" aria-label="Delivery method" onKeyDown={onSegKey}>
              <span className="hb-vg1-thumb" aria-hidden="true" style={{ width: `calc((100% - 6px) / ${channels.length})`, transform: `translateX(${channels.indexOf(channel) * 100}%)` }} />
              {channels.map((c) => (
                <button key={c} type="button" role="radio" data-c={c} aria-checked={c === channel} tabIndex={c === channel ? 0 : -1} className="hb-vg1-chan" onClick={() => pick(c)}>
                  {channelLabels[c]}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <Heading id={`${uid}-t`} className="hb-vg1-title">{status === "success" ? "You're verified" : title}</Heading>
        <p className="hb-vg1-sub">
          {channel === "call" ? (
            <>We {verb} <strong>{destinations[channel]}</strong> in a moment. Type the {length} digits you hear.</>
          ) : (
            <>We {verb} a {length}-digit code to <strong>{destinations[channel]}</strong>. It expires in 10 minutes.</>
          )}
        </p>
        <div className="hb-vg1-field" data-focus={focus}>
          <input
            ref={inputRef}
            className="hb-vg1-input"
            value={code}
            onChange={change}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={length}
            aria-label={`${length}-digit verification code`}
            aria-describedby={`${uid}-m`}
            aria-invalid={status === "error" || undefined}
            disabled={status === "success" || status === "locked"}
          />
          <div className="hb-vg1-rail" aria-hidden="true">
            {Array.from({ length }, (_, i) => (
              <span key={i} className="hb-vg1-slot" data-mid={i === half}>
                {code[i] ? (
                  <span key={`${i}-${code[i]}`} className="hb-vg1-digit">{code[i]}</span>
                ) : focus && i === code.length ? (
                  <span className="hb-vg1-caret" />
                ) : (
                  <span className="hb-vg1-dot" />
                )}
              </span>
            ))}
            <span className="hb-vg1-bar" />
            {status === "verifying" ? <span className="hb-vg1-scan" /> : null}
          </div>
        </div>
        <div id={`${uid}-m`} className="hb-vg1-msg" data-tone={tone} role="status" aria-live="polite">
          {status === "success" ? (
            <svg className="hb-vg1-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          ) : null}
          {notice || "Paste the code or type it. It checks itself when complete."}
        </div>
        <div className="hb-vg1-foot">
          <span className="hb-vg1-hint">
            Wrong {channel === "email" ? "address" : "number"}?{" "}
            <button type="button" className="hb-vg1-back" onClick={() => onBack?.()}>Go back</button> or press <kbd>Esc</kbd>
          </span>
          <button type="button" className="hb-vg1-resend" onClick={resend} disabled={left > 0 || status === "success"}>
            <span className="hb-vg1-ring" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" strokeWidth="2.2">
                <circle className="hb-vg1-ring-track" cx="13" cy="13" r="11" />
                <circle className="hb-vg1-ring-fill" cx="13" cy="13" r="11" strokeLinecap="round" strokeDasharray={C.toFixed(2)} strokeDashoffset={(C * (1 - ratio)).toFixed(2)} />
              </svg>
              <span>{left > 0 ? left : "↻"}</span>
            </span>
            {left > 0 ? "Resend soon" : "Resend code"}
          </button>
        </div>
      </div>
    </section>
  );
}
