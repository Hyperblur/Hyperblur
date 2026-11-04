"use client";

import * as React from "react";

export type LoginTerminalStatus = "waiting" | "approved" | "expired";

export interface LoginTerminalProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  title?: string;
  subtitle?: string;
  command?: string;
  code?: string;
  verifyUrl?: string;
  user?: string;
  expiresIn?: number;
  status?: LoginTerminalStatus;
  defaultStatus?: LoginTerminalStatus;
  onStatusChange?: (status: LoginTerminalStatus) => void;
  onCodeCopy?: (code: string) => void;
  onSubmit?: (values: { token: string }) => boolean | void | Promise<boolean | void>;
  tokenPrefix?: string;
  accent?: string;
}

const css = `
.hb-qh9 {
  --hb-qh9-accent: #4ade80;
  --hb-qh9-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #08090a;
  color: #ededed;
  font-family: inherit;
  padding: clamp(64px, 9cqw, 112px) 20px;
}
.hb-qh9 *, .hb-qh9 *::before, .hb-qh9 *::after { box-sizing: border-box; }
.hb-qh9::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px) 0 0 / 32px 32px, linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px) 0 0 / 32px 32px; mask: radial-gradient(ellipse 60% 60% at 70% 50%, #000, transparent 75%); }
.hb-qh9-inner { position: relative; max-width: 1120px; margin: 0 auto; display: grid; gap: 40px; align-items: center; }
.hb-qh9-kicker { font-family: var(--hb-qh9-mono); font-size: 12px; color: var(--hb-qh9-accent); letter-spacing: .04em; }
.hb-qh9-title { margin: 14px 0 12px; font-size: clamp(30px, 4.4cqw, 44px); line-height: 1.05; letter-spacing: -.03em; font-weight: 600; }
.hb-qh9-sub { margin: 0; max-width: 420px; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-qh9-steps { list-style: none; margin: 26px 0 0; padding: 0; display: grid; gap: 12px; counter-reset: hb-qh9-n; }
.hb-qh9-steps li { display: flex; gap: 12px; align-items: baseline; font-size: 14px; color: #a1a1a1; counter-increment: hb-qh9-n; }
.hb-qh9-steps li::before { content: counter(hb-qh9-n, decimal-leading-zero); font-family: var(--hb-qh9-mono); font-size: 12px; color: #555; }
.hb-qh9-steps code { font-family: var(--hb-qh9-mono); font-size: 13px; color: #ededed; background: #141414; border: 1px solid #222; padding: 1px 6px; border-radius: 6px; }
.hb-qh9-token { margin-top: 28px; padding-top: 22px; border-top: 1px solid rgba(255,255,255,.07); max-width: 420px; }
.hb-qh9-tlabel { display: block; font-size: 13px; color: #a1a1a1; margin-bottom: 8px; }
.hb-qh9-trow { display: flex; gap: 8px; }
.hb-qh9-tinput { flex: 1; min-width: 0; height: 42px; padding: 0 12px; border-radius: 10px; border: 1px solid #262626; background: #0e0e0e; color: #ededed; font-family: var(--hb-qh9-mono); font-size: 13px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-qh9-tinput:focus { border-color: var(--hb-qh9-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qh9-accent) 18%, transparent); }
.hb-qh9-tinput[aria-invalid="true"] { border-color: #f87171; }
.hb-qh9-tbtn { flex: none; height: 42px; padding: 0 16px; border-radius: 10px; border: 1px solid #2a2a2a; background: #161616; color: #ededed; font: inherit; font-size: 13.5px; cursor: pointer; transition: background .2s; }
.hb-qh9-tbtn:hover { background: #1e1e1e; }
.hb-qh9-tbtn:disabled { cursor: progress; color: #8f8f8f; }
.hb-qh9-terr { margin: 8px 0 0; font-size: 12.5px; color: #fca5a5; }
.hb-qh9-tok { margin: 8px 0 0; font-size: 12.5px; color: var(--hb-qh9-accent); }
.hb-qh9-win { border-radius: 16px; border: 1px solid rgba(255,255,255,.1); background: #0c0d0e; box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 40px 100px -40px color-mix(in srgb, var(--hb-qh9-accent) 25%, transparent), 0 30px 60px -30px rgba(0,0,0,.9); overflow: hidden; min-width: 0; }
.hb-qh9-bar { display: flex; align-items: center; gap: 8px; height: 40px; padding: 0 14px; border-bottom: 1px solid rgba(255,255,255,.06); background: #111213; }
.hb-qh9-light { width: 11px; height: 11px; border-radius: 50%; background: #2a2a2a; }
.hb-qh9-wtitle { flex: 1; text-align: center; margin-right: 40px; font-family: var(--hb-qh9-mono); font-size: 12px; color: #6f6f6f; }
.hb-qh9-body { padding: 20px 20px 24px; font-family: var(--hb-qh9-mono); font-size: 13.5px; line-height: 1.75; color: #cfcfcf; min-height: 330px; overflow-x: auto; }
.hb-qh9-line { display: block; white-space: pre; clip-path: inset(0 100% 0 0); animation: hb-qh9-type var(--hb-qh9-dur, .5s) steps(var(--hb-qh9-steps, 20)) var(--hb-qh9-delay, 0s) forwards; }
.hb-qh9-pr { color: var(--hb-qh9-accent); }
.hb-qh9-dim { color: #6f6f6f; }
.hb-qh9-q { color: #7fb3ff; }
.hb-qh9-warn { color: #fbbf24; }
.hb-qh9-codebox { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 12px 0 14px; padding: 14px 14px 14px 18px; border-radius: 12px; border: 1px solid color-mix(in srgb, var(--hb-qh9-accent) 35%, transparent); background: color-mix(in srgb, var(--hb-qh9-accent) 6%, #0c0d0e); opacity: 0; animation: hb-qh9-pop .5s cubic-bezier(.2,.7,.2,1) var(--hb-qh9-delay, 0s) forwards; }
.hb-qh9-code { font-size: clamp(22px, 3.4cqw, 30px); letter-spacing: .18em; font-weight: 600; color: #fff; }
.hb-qh9-copy { flex: none; display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 12px; border-radius: 9px; border: 1px solid rgba(255,255,255,.12); background: #151617; color: #ededed; font-family: inherit; font-size: 12px; cursor: pointer; transition: background .2s, border-color .2s; }
.hb-qh9-copy:hover { background: #1c1d1e; border-color: rgba(255,255,255,.2); }
.hb-qh9-copy[data-copied="true"] { color: var(--hb-qh9-accent); border-color: color-mix(in srgb, var(--hb-qh9-accent) 45%, transparent); }
.hb-qh9-copy:focus-visible, .hb-qh9-tbtn:focus-visible, .hb-qh9-url:focus-visible { outline: 2px solid var(--hb-qh9-accent); outline-offset: 2px; }
.hb-qh9-url { color: #ededed; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(255,255,255,.3); border-radius: 3px; }
.hb-qh9-wait { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; opacity: 0; animation: hb-qh9-pop .4s ease var(--hb-qh9-delay, 0s) forwards; }
.hb-qh9-spinner::before { content: "⠋"; color: var(--hb-qh9-accent); animation: hb-qh9-braille .8s steps(1) infinite; }
.hb-qh9-pulse { animation: hb-qh9-pulse 1.6s ease-in-out infinite; }
.hb-qh9-exp { color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-qh9-ok { color: var(--hb-qh9-accent); }
.hb-qh9-bad { color: #f87171; }
.hb-qh9-cursor { display: inline-block; width: .6em; height: 1.1em; vertical-align: -.2em; background: var(--hb-qh9-accent); animation: hb-qh9-blink 1s steps(1) infinite; }
.hb-qh9-res { display: block; animation: hb-qh9-pop .35s ease both; }
@container (min-width: 860px) {
  .hb-qh9-inner { grid-template-columns: .85fr 1.15fr; gap: 56px; }
}
@keyframes hb-qh9-type { to { clip-path: inset(0 0 0 0); } }
@keyframes hb-qh9-pop { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes hb-qh9-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .45; } }
@keyframes hb-qh9-blink { 50% { opacity: 0; } }
@keyframes hb-qh9-braille {
  0% { content: "⠋"; } 12.5% { content: "⠙"; } 25% { content: "⠹"; } 37.5% { content: "⠸"; }
  50% { content: "⠼"; } 62.5% { content: "⠴"; } 75% { content: "⠦"; } 87.5% { content: "⠧"; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qh9 *, .hb-qh9 *::before, .hb-qh9 *::after { animation: none !important; transition: none !important; }
  .hb-qh9-line { clip-path: none; }
  .hb-qh9-codebox, .hb-qh9-wait { opacity: 1; }
}
`;

function format(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise<unknown>((resolve) => setTimeout(() => resolve(result), 900));
}

function lineStyle(delay: number, text: string) {
  return { "--hb-qh9-delay": `${delay.toFixed(2)}s`, "--hb-qh9-steps": Math.max(4, text.length), "--hb-qh9-dur": `${Math.min(1.2, 0.02 * text.length + 0.15).toFixed(2)}s` } as React.CSSProperties;
}

export function LoginTerminal({
  title = "Sign in from your terminal",
  subtitle = "Authorize the Forge CLI with a one-time device code. No passwords in your shell history, and you can revoke the session any time.",
  command = "forge auth login",
  code = "WDJB-MJHT",
  verifyUrl = "https://forge.dev/device",
  user = "mara-k",
  expiresIn = 900,
  status,
  defaultStatus = "waiting",
  onStatusChange,
  onCodeCopy,
  onSubmit,
  tokenPrefix = "fg_",
  accent = "#4ade80",
  className = "",
  style,
  ...rest
}: LoginTerminalProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState<LoginTerminalStatus>(defaultStatus);
  const current = status ?? inner;
  const [left, setLeft] = React.useState(expiresIn);
  const [copied, setCopied] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [tokenError, setTokenError] = React.useState("");
  const [tokenBusy, setTokenBusy] = React.useState(false);

  const update = React.useCallback((next: LoginTerminalStatus) => {
    setInner(next);
    onStatusChange?.(next);
  }, [onStatusChange]);

  React.useEffect(() => {
    if (current !== "waiting" || left <= 0) return;
    const id = window.setTimeout(() => {
      if (left <= 1) update("expired");
      setLeft((s) => s - 1);
    }, 1000);
    return () => window.clearTimeout(id);
  }, [current, left, update]);

  React.useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copy() {
    let ok = true;
    try {
      await navigator.clipboard?.writeText(code);
    } catch {
      ok = false;
    }
    setCopied(ok);
    if (ok) onCodeCopy?.(code);
  }

  async function handleToken(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (tokenBusy) return;
    const value = token.trim();
    if (!value) return setTokenError("Paste a personal access token.");
    if (!value.startsWith(tokenPrefix) || value.length < tokenPrefix.length + 20) return setTokenError(`Tokens start with ${tokenPrefix} and are at least ${tokenPrefix.length + 20} characters.`);
    setTokenError("");
    setTokenBusy(true);
    try {
      const result = await wait(onSubmit ? onSubmit({ token: value }) : true);
      if (result === false) setTokenError("That token was rejected. Check its scopes.");
      else update("approved");
    } catch {
      setTokenError("Couldn't verify the token. Try again.");
    }
    setTokenBusy(false);
  }

  const host = verifyUrl.replace("https://", "").replace("http://", "");
  const l1 = `$ ${command}`;
  const l2 = "? How would you like to authenticate? Login with a web browser";
  const l4 = `- Press Enter to open ${host} in your browser...`;

  return (
    <section className={`hb-qh9 ${className}`} style={{ "--hb-qh9-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-login-terminal" precedence="default">{css}</style>
      <div className="hb-qh9-inner">
        <div>
          <span className="hb-qh9-kicker">~/ forge cli</span>
          <h2 className="hb-qh9-title">{title}</h2>
          <p className="hb-qh9-sub">{subtitle}</p>
          <ol className="hb-qh9-steps">
            <li><span>Run <code>{command}</code> in any project.</span></li>
            <li><span>Open <a className="hb-qh9-url" href={verifyUrl}>{host}</a> and enter the code.</span></li>
            <li><span>Approve the request. The CLI picks it up instantly.</span></li>
          </ol>
          <form className="hb-qh9-token" noValidate onSubmit={handleToken}>
            <label className="hb-qh9-tlabel" htmlFor={`${uid}-t`}>Headless machine? Paste a token instead</label>
            <div className="hb-qh9-trow">
              <input id={`${uid}-t`} className="hb-qh9-tinput" type="password" autoComplete="off" spellCheck={false} placeholder={`${tokenPrefix}••••••••••••••••••••`} value={token} aria-invalid={tokenError ? true : undefined} aria-describedby={tokenError ? `${uid}-te` : undefined} onChange={(e) => { setToken(e.target.value); if (tokenError) setTokenError(""); }} />
              <button type="submit" className="hb-qh9-tbtn" disabled={tokenBusy} aria-busy={tokenBusy}>{tokenBusy ? "Checking" : "Use token"}</button>
            </div>
            {tokenError && <p className="hb-qh9-terr" id={`${uid}-te`} role="alert">{tokenError}</p>}
            {current === "approved" && !tokenError && token && <p className="hb-qh9-tok" role="status">Token accepted.</p>}
          </form>
        </div>
        <div className="hb-qh9-win">
          <div className="hb-qh9-bar">
            <span className="hb-qh9-light" aria-hidden="true" />
            <span className="hb-qh9-light" aria-hidden="true" />
            <span className="hb-qh9-light" aria-hidden="true" />
            <span className="hb-qh9-wtitle">zsh · ~/code/northwind</span>
          </div>
          <div className="hb-qh9-body" role="log" aria-live="polite">
            <span className="hb-qh9-line" style={lineStyle(0.2, l1)}><span className="hb-qh9-pr">$</span> {command}</span>
            <span className="hb-qh9-line" style={lineStyle(1.1, l2)}><span className="hb-qh9-q">?</span> How would you like to authenticate? <span className="hb-qh9-pr">Login with a web browser</span></span>
            <span className="hb-qh9-line" style={lineStyle(2.1, "! First copy your one-time code:")}><span className="hb-qh9-warn">!</span> First copy your one-time code:</span>
            <div className="hb-qh9-codebox" style={{ "--hb-qh9-delay": "2.6s" } as React.CSSProperties}>
              <span className="hb-qh9-code" aria-label={`One-time code ${code.split("").join(" ")}`}>{code}</span>
              <button type="button" className="hb-qh9-copy" data-copied={copied} onClick={copy}>
                {copied ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 6.2 2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M8.5 3.5V2.5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <span className="hb-qh9-line" style={lineStyle(3.1, l4)}><span className="hb-qh9-dim">-</span> Press <span className="hb-qh9-q">Enter</span> to open <a className="hb-qh9-url" href={verifyUrl}>{host}</a> in your browser...</span>
            {current === "waiting" && (
              <span className="hb-qh9-wait" style={{ "--hb-qh9-delay": "4s" } as React.CSSProperties}>
                <span className="hb-qh9-spinner" aria-hidden="true" />
                <span className="hb-qh9-pulse">Waiting for approval in your browser</span>
                <span className="hb-qh9-exp">expires in {format(left)}</span>
              </span>
            )}
            {current === "approved" && (
              <>
                <span className="hb-qh9-res"><span className="hb-qh9-ok">✓</span> Authentication complete.</span>
                <span className="hb-qh9-res"><span className="hb-qh9-ok">✓</span> Logged in as <b>{user}</b></span>
                <span className="hb-qh9-res"><span className="hb-qh9-dim">  token saved to ~/.config/forge/hosts.yml</span></span>
                <span className="hb-qh9-res"><span className="hb-qh9-pr">$</span> <span className="hb-qh9-cursor" aria-hidden="true" /></span>
              </>
            )}
            {current === "expired" && (
              <>
                <span className="hb-qh9-res"><span className="hb-qh9-bad">✗</span> The code expired before it was approved.</span>
                <span className="hb-qh9-res"><span className="hb-qh9-dim">  run</span> {command} <span className="hb-qh9-dim">again to get a new one</span></span>
                <span className="hb-qh9-res"><span className="hb-qh9-pr">$</span> <span className="hb-qh9-cursor" aria-hidden="true" /></span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
