"use client";

import * as React from "react";

export interface AuthFlowTwoFactorSetupProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  issuer?: string;
  account?: string;
  secret?: string;
  backupCodes?: string[];
  defaultStep?: number;
  onVerify?: (code: string) => boolean | void | Promise<boolean | void>;
  onComplete?: () => void;
  onStepChange?: (step: number) => void;
  headingAs?: "h1" | "h2" | "h3";
  accent?: string;
}

const css = `
@keyframes hb-vg3-reveal {
  from { clip-path: circle(0% at 50% 50%); }
  to { clip-path: circle(75% at 50% 50%); }
}
@keyframes hb-vg3-scan {
  0% { transform: translateY(-10%); opacity: 0; }
  12% { opacity: 1; }
  88% { opacity: 1; }
  100% { transform: translateY(1000%); opacity: 0; }
}
@keyframes hb-vg3-in {
  from { opacity: 0; transform: translate3d(14px, 0, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-vg3-pop {
  0% { transform: scale(.6); opacity: 0; }
  60% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); }
}
@keyframes hb-vg3-tick { from { stroke-dashoffset: 0; } to { stroke-dashoffset: var(--hb-vg3-c); } }
@keyframes hb-vg3-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px); }
  50% { transform: translateX(6px); }
  75% { transform: translateX(-3px); }
}
.hb-vg3 {
  --hb-vg3-accent: #818cf8;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 72px 20px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vg3 *, .hb-vg3 *::before, .hb-vg3 *::after { box-sizing: border-box; }
.hb-vg3::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(ellipse 50% 45% at 50% 0%, color-mix(in srgb, var(--hb-vg3-accent) 14%, transparent), transparent 70%);
}
.hb-vg3-shell { max-width: 780px; margin: 0 auto; border: 1px solid #222; border-radius: 24px; background: linear-gradient(180deg, #131313, #0d0d0d); box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 50px 100px -50px #000; overflow: hidden; }
.hb-vg3-head { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 28px; border-bottom: 1px solid #1d1d1d; background: #0f0f0f; }
.hb-vg3-title { margin: 0; font-size: 17px; font-weight: 650; letter-spacing: -.01em; }
.hb-vg3-steps { display: flex; align-items: center; gap: 0; margin: 0; padding: 0; list-style: none; }
.hb-vg3-steps li { display: flex; align-items: center; color: #6b6b6b; font-size: 12.5px; font-weight: 550; transition: color .3s ease; }
.hb-vg3-steps li[data-state="current"], .hb-vg3-steps li[data-state="done"] { color: #ededed; }
.hb-vg3-num { display: grid; place-items: center; width: 22px; height: 22px; margin-right: 8px; border: 1px solid #2c2c2c; border-radius: 50%; font: 600 11px/1 var(--font-mono), ui-monospace, monospace; transition: background .3s ease, border-color .3s ease, color .3s ease; }
.hb-vg3-steps li[data-state="current"] .hb-vg3-num { border-color: var(--hb-vg3-accent); color: var(--hb-vg3-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vg3-accent) 15%, transparent); }
.hb-vg3-steps li[data-state="done"] .hb-vg3-num { border-color: transparent; background: var(--hb-vg3-accent); color: #0a0a0a; }
.hb-vg3-link { width: 28px; height: 1px; margin: 0 10px; background: #2a2a2a; position: relative; overflow: hidden; }
.hb-vg3-link::after { content: ""; position: absolute; inset: 0; background: var(--hb-vg3-accent); transform: scaleX(var(--f, 0)); transform-origin: left; transition: transform .5s cubic-bezier(.65, 0, .35, 1); }
.hb-vg3-body { padding: 30px 28px 28px; }
.hb-vg3-pane { animation: hb-vg3-in .4s cubic-bezier(.2, .8, .2, 1) both; }
.hb-vg3-grid { display: grid; grid-template-columns: 210px minmax(0, 1fr); gap: 32px; align-items: center; }
.hb-vg3-qr { position: relative; padding: 14px; border-radius: 18px; background: #f5f5f5; box-shadow: 0 20px 40px -20px color-mix(in srgb, var(--hb-vg3-accent) 70%, transparent), 0 0 0 1px rgba(255,255,255,.1); overflow: hidden; }
.hb-vg3-qr svg { display: block; width: 100%; height: auto; animation: hb-vg3-reveal 1.1s cubic-bezier(.3, .7, .2, 1) both; }
.hb-vg3-scanline { position: absolute; left: 8px; right: 8px; top: 8px; height: 10%; background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--hb-vg3-accent) 45%, transparent)); border-bottom: 2px solid var(--hb-vg3-accent); animation: hb-vg3-scan 2.8s 1s cubic-bezier(.45, 0, .55, 1) infinite; pointer-events: none; }
.hb-vg3-h { margin: 0; font-size: 22px; font-weight: 650; letter-spacing: -.02em; }
.hb-vg3-p { margin: 8px 0 0; color: #a1a1a1; font-size: 14px; line-height: 1.6; }
.hb-vg3-apps { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
.hb-vg3-apps span { padding: 4px 9px; border: 1px solid #262626; border-radius: 999px; color: #a1a1a1; font-size: 12px; }
.hb-vg3-key { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 18px; padding: 10px 10px 10px 14px; border: 1px dashed #2f2f2f; border-radius: 12px; background: #0a0a0a; }
.hb-vg3-key code { color: #ededed; font: 500 13.5px/1.4 var(--font-mono), ui-monospace, monospace; letter-spacing: .06em; word-break: break-all; }
.hb-vg3-mini { flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 11px; border: 1px solid #2a2a2a; border-radius: 8px; background: #161616; color: #ededed; font: inherit; font-size: 12.5px; font-weight: 550; cursor: pointer; transition: background .2s ease, border-color .2s ease, transform .12s ease; }
.hb-vg3-mini:hover { background: #1d1d1d; border-color: #3a3a3a; }
.hb-vg3-mini:active { transform: scale(.96); }
.hb-vg3-mini:focus-visible, .hb-vg3-btn:focus-visible, .hb-vg3-ghost:focus-visible, .hb-vg3-check input:focus-visible + span { outline: 2px solid var(--hb-vg3-accent); outline-offset: 2px; }
.hb-vg3-mini[data-ok="true"] { color: #86efac; border-color: #14532d; }
.hb-vg3-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 28px; padding-top: 22px; border-top: 1px solid #1d1d1d; }
.hb-vg3-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 42px; padding: 0 20px; border: 0; border-radius: 11px; background: var(--hb-vg3-accent); color: #0a0a0a; font: inherit; font-size: 14px; font-weight: 650; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 10px 24px -12px var(--hb-vg3-accent); transition: transform .15s ease, filter .2s ease, opacity .2s ease; }
.hb-vg3-btn:hover:not(:disabled) { filter: brightness(1.08); }
.hb-vg3-btn:active:not(:disabled) { transform: scale(.97); }
.hb-vg3-btn:disabled { opacity: .35; cursor: not-allowed; }
.hb-vg3-ghost { height: 42px; padding: 0 14px; border: 0; border-radius: 11px; background: none; color: #a1a1a1; font: inherit; font-size: 14px; font-weight: 550; cursor: pointer; }
.hb-vg3-ghost:hover { color: #ededed; background: #161616; }
.hb-vg3-verify { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 28px; align-items: center; }
.hb-vg3-code { position: relative; margin-top: 20px; }
.hb-vg3-code input { width: 100%; height: 64px; padding: 0 20px; border: 1px solid #262626; border-radius: 14px; background: #0a0a0a; color: #ededed; font: 500 30px/1 var(--font-mono), ui-monospace, monospace; letter-spacing: .5em; font-variant-numeric: tabular-nums; outline: none; transition: border-color .2s ease, box-shadow .2s ease; }
.hb-vg3-code input::placeholder { color: #333; }
.hb-vg3-code input:focus { border-color: color-mix(in srgb, var(--hb-vg3-accent) 60%, #262626); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vg3-accent) 14%, transparent); }
.hb-vg3-code[data-bad="true"] input { border-color: #7f1d1d; color: #fca5a5; animation: hb-vg3-shake .4s ease; }
.hb-vg3-note { min-height: 20px; margin-top: 10px; color: #8f8f8f; font-size: 12.5px; }
.hb-vg3-note[data-bad="true"] { color: #fca5a5; }
.hb-vg3-totp { position: relative; display: grid; place-items: center; width: 112px; height: 112px; }
.hb-vg3-totp svg { position: absolute; inset: 0; transform: rotate(-90deg); }
.hb-vg3-totp circle:last-child { stroke: var(--hb-vg3-accent); stroke-dasharray: var(--hb-vg3-c); animation: hb-vg3-tick 30s linear infinite; animation-delay: var(--hb-vg3-off, 0s); }
.hb-vg3-totp div { text-align: center; }
.hb-vg3-totp b { display: block; font: 600 17px/1 var(--font-mono), ui-monospace, monospace; letter-spacing: .08em; }
.hb-vg3-totp small { display: block; margin-top: 6px; color: #8f8f8f; font-size: 10.5px; }
.hb-vg3-codes { position: relative; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 14px; margin: 20px 0 0; padding: 18px; border: 1px solid #1f1f1f; border-radius: 14px; background: repeating-linear-gradient(135deg, #0c0c0c 0 8px, #0e0e0e 8px 16px); list-style: none; counter-reset: hb-vg3-n; }
.hb-vg3-codes li { display: flex; align-items: center; gap: 10px; font: 500 14.5px/1.5 var(--font-mono), ui-monospace, monospace; letter-spacing: .05em; counter-increment: hb-vg3-n; transition: filter .45s ease, opacity .45s ease; transition-delay: calc(var(--d) * 35ms); }
.hb-vg3-codes li::before { content: counter(hb-vg3-n, decimal-leading-zero); color: #4f4f4f; font-size: 11px; }
.hb-vg3-codes[data-hidden="true"] li { filter: blur(6px); opacity: .55; }
.hb-vg3-unhide { position: absolute; inset: 0; display: grid; place-items: center; border: 0; border-radius: 14px; background: rgba(10,10,10,.25); color: #ededed; font: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer; }
.hb-vg3-unhide span { display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border: 1px solid #333; border-radius: 999px; background: #151515; box-shadow: 0 10px 30px -10px #000; }
.hb-vg3-unhide:focus-visible span { outline: 2px solid var(--hb-vg3-accent); outline-offset: 2px; }
.hb-vg3-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.hb-vg3-check { display: flex; align-items: center; gap: 10px; color: #cfcfcf; font-size: 13.5px; cursor: pointer; }
.hb-vg3-check input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.hb-vg3-check span { display: grid; place-items: center; width: 18px; height: 18px; border: 1px solid #3a3a3a; border-radius: 5px; background: #0a0a0a; transition: background .2s ease, border-color .2s ease; }
.hb-vg3-check input:checked + span { border-color: var(--hb-vg3-accent); background: var(--hb-vg3-accent); color: #0a0a0a; }
.hb-vg3-check svg { opacity: 0; transition: opacity .15s ease; }
.hb-vg3-check input:checked + span svg { opacity: 1; }
.hb-vg3-done { display: flex; flex-direction: column; align-items: center; padding: 18px 0 8px; text-align: center; }
.hb-vg3-shield { display: grid; place-items: center; width: 72px; height: 72px; border-radius: 22px; background: color-mix(in srgb, var(--hb-vg3-accent) 16%, #111); color: var(--hb-vg3-accent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-vg3-accent) 40%, transparent), 0 20px 50px -20px var(--hb-vg3-accent); animation: hb-vg3-pop .55s cubic-bezier(.3, 1.4, .5, 1) both; }
.hb-vg3-done .hb-vg3-p { max-width: 420px; }
@container (max-width: 640px) {
  .hb-vg3-head { flex-direction: column; align-items: flex-start; }
  .hb-vg3-steps li > span:last-child { display: none; }
  .hb-vg3-grid, .hb-vg3-verify { grid-template-columns: minmax(0, 1fr); }
  .hb-vg3-qr { max-width: 220px; }
  .hb-vg3-totp { display: none; }
  .hb-vg3-codes { grid-template-columns: minmax(0, 1fr); }
  .hb-vg3-body { padding: 24px 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vg3 *, .hb-vg3 *::before, .hb-vg3 *::after { animation: none !important; transition: none !important; }
  .hb-vg3-scanline { display: none; }
}
`;

function hash(n: number) {
  let x = (n ^ 0x9e3779b9) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35) >>> 0;
  return (x ^ (x >>> 16)) >>> 0;
}

function seedOf(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
}

const N = 25;

function finder(x: number, y: number, ox: number, oy: number) {
  const dx = x - ox;
  const dy = y - oy;
  if (dx < -1 || dy < -1 || dx > 7 || dy > 7) return null;
  if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return false;
  if (dx === 0 || dy === 0 || dx === 6 || dy === 6) return true;
  if (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) return true;
  return false;
}

function matrixPath(seed: number) {
  let d = "";
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      let on: boolean | null = finder(x, y, 0, 0);
      if (on === null) on = finder(x, y, N - 7, 0);
      if (on === null) on = finder(x, y, 0, N - 7);
      if (on === null) {
        const ax = x - 18;
        const ay = y - 18;
        if (ax >= -2 && ax <= 2 && ay >= -2 && ay <= 2) on = Math.max(Math.abs(ax), Math.abs(ay)) !== 1;
        else if (y === 6) on = x % 2 === 0;
        else if (x === 6) on = y % 2 === 0;
        else on = hash(seed + y * N + x) % 100 < 48;
      }
      if (on) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return d;
}

function wait<T>(result: T | Promise<T>, ms: number) {
  return result instanceof Promise ? result : new Promise<T>((resolve) => window.setTimeout(() => resolve(result), ms));
}

const labels = ["Scan", "Verify", "Save codes"];

export function AuthFlowTwoFactorSetup({
  issuer = "Northwind",
  account = "maya.chen@northwind.io",
  secret = "JBSWY3DPEHPK3PXPNW4QK7ZL",
  backupCodes = ["4F7K-2QXM", "9TDR-HB3L", "C8WN-61PV", "Q2JE-7ZKA", "M5YH-D4RT", "X1GP-8BNC", "R6LA-3WFQ", "V9SK-T2EJ", "B3ZD-5MHU", "H7NC-Y0QW"],
  defaultStep = 0,
  onVerify,
  onComplete,
  onStepChange,
  headingAs = "h2",
  accent = "#818cf8",
  className = "",
  style,
  ...rest
}: AuthFlowTwoFactorSetupProps) {
  const Heading = headingAs;
  const uid = React.useId();
  const [step, setStep] = React.useState(Math.max(0, Math.min(3, defaultStep)));
  const [copied, setCopied] = React.useState("");
  const [code, setCode] = React.useState("");
  const [bad, setBad] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
  const [saved, setSaved] = React.useState(false);
  const rootRef = React.useRef<HTMLElement>(null);
  const path = React.useMemo(() => matrixPath(seedOf(secret)), [secret]);
  const grouped = secret.replace(/(.{4})/g, "$1 ").trim();

  React.useEffect(() => {
    rootRef.current?.style.setProperty("--hb-vg3-off", `${(-((Date.now() / 1000) % 30)).toFixed(2)}s`);
  }, []);

  const go = (n: number) => {
    setStep(n);
    onStepChange?.(n);
  };

  const copy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text).catch(() => undefined);
    setCopied(id);
    window.setTimeout(() => setCopied((c) => (c === id ? "" : c)), 1600);
  };

  const download = () => {
    const body = `${issuer} backup codes for ${account}\n\n${backupCodes.join("\n")}\n\nEach code works once.\n`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${issuer.toLowerCase()}-backup-codes.txt`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6 || busy) return;
    setBusy(true);
    wait(onVerify ? onVerify(code) : true, 800).then(
      (ok) => {
        setBusy(false);
        if (ok === false) {
          setBad(true);
          setCode("");
        } else go(2);
      },
      () => {
        setBusy(false);
        setBad(true);
      },
    );
  };

  const C = 2 * Math.PI * 50;
  const vars = { "--hb-vg3-accent": accent, "--hb-vg3-c": C.toFixed(2), ...style } as React.CSSProperties;
  const chk = (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 6.5l2.2 2.2L9.5 3.8" />
    </svg>
  );

  return (
    <section ref={rootRef} className={`hb-vg3 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-auth-flow-two-factor-setup" precedence="default">{css}</style>
      <div className="hb-vg3-shell">
        <div className="hb-vg3-head">
          <Heading id={`${uid}-t`} className="hb-vg3-title">Turn on two-factor authentication</Heading>
          <ol className="hb-vg3-steps" aria-label="Setup progress">
            {labels.map((l, i) => (
              <li key={l} data-state={step > i ? "done" : step === i ? "current" : "todo"} aria-current={step === i ? "step" : undefined}>
                {i > 0 ? <i className="hb-vg3-link" style={{ "--f": step >= i ? 1 : 0 } as React.CSSProperties} aria-hidden="true" /> : null}
                <span className="hb-vg3-num">{step > i ? chk : i + 1}</span>
                <span>{l}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="hb-vg3-body">
          {step === 0 ? (
            <div className="hb-vg3-pane" key="scan">
              <div className="hb-vg3-grid">
                <div className="hb-vg3-qr">
                  <svg viewBox={`-1 -1 ${N + 2} ${N + 2}`} shapeRendering="crispEdges" role="img" aria-label={`Setup code for ${issuer}`}>
                    <path d={path} fill="#0a0a0a" />
                  </svg>
                  <span className="hb-vg3-scanline" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="hb-vg3-h">Scan with your authenticator</h3>
                  <p className="hb-vg3-p">Open your authenticator app, tap add account and point the camera at the code. It links {issuer} to <b>{account}</b>.</p>
                  <div className="hb-vg3-apps" aria-label="Works with">
                    <span>1Password</span>
                    <span>Authy</span>
                    <span>Google Authenticator</span>
                  </div>
                  <div className="hb-vg3-key">
                    <code aria-label="Setup key">{grouped}</code>
                    <button type="button" className="hb-vg3-mini" data-ok={copied === "key"} onClick={() => copy(secret, "key")}>
                      {copied === "key" ? "Copied" : "Copy key"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="hb-vg3-foot">
                <span className="hb-vg3-p" style={{ margin: 0 }}>Can&apos;t scan? Type the key instead.</span>
                <button type="button" className="hb-vg3-btn" onClick={() => go(1)}>I&apos;ve added it</button>
              </div>
            </div>
          ) : step === 1 ? (
            <form className="hb-vg3-pane" key="verify" onSubmit={verify} noValidate>
              <div className="hb-vg3-verify">
                <div>
                  <h3 className="hb-vg3-h">Enter the 6-digit code</h3>
                  <p className="hb-vg3-p">Your app shows a new code for {issuer} every 30 seconds. Type the current one.</p>
                  <div className="hb-vg3-code" data-bad={bad}>
                    <input
                      value={code}
                      onChange={(e) => {
                        setBad(false);
                        setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                      }}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="000000"
                      aria-label="Authenticator code"
                      aria-invalid={bad || undefined}
                      aria-describedby={`${uid}-n`}
                    />
                  </div>
                  <div id={`${uid}-n`} className="hb-vg3-note" data-bad={bad} aria-live="polite">
                    {bad ? "That code is not valid. Wait for the next one and try again." : busy ? "Checking with your app" : "Tip: codes refresh when the ring completes."}
                  </div>
                </div>
                <div className="hb-vg3-totp" aria-hidden="true">
                  <svg width="112" height="112" viewBox="0 0 112 112" fill="none" strokeWidth="4" strokeLinecap="round">
                    <circle cx="56" cy="56" r="50" stroke="#1f1f1f" />
                    <circle cx="56" cy="56" r="50" />
                  </svg>
                  <div>
                    <b>{issuer.slice(0, 2).toUpperCase()}</b>
                    <small>30s window</small>
                  </div>
                </div>
              </div>
              <div className="hb-vg3-foot">
                <button type="button" className="hb-vg3-ghost" onClick={() => go(0)}>Back</button>
                <button type="submit" className="hb-vg3-btn" disabled={code.length !== 6 || busy} aria-busy={busy || undefined}>
                  {busy ? "Verifying" : "Verify code"}
                </button>
              </div>
            </form>
          ) : step === 2 ? (
            <div className="hb-vg3-pane" key="codes">
              <h3 className="hb-vg3-h">Save your backup codes</h3>
              <p className="hb-vg3-p">If you lose your phone, each code signs you in once. Store them somewhere only you can reach.</p>
              <div style={{ position: "relative" }}>
                <ul className="hb-vg3-codes" data-hidden={hidden} aria-label="Backup codes">
                  {backupCodes.map((c, i) => (
                    <li key={c} style={{ "--d": i } as React.CSSProperties} aria-hidden={hidden || undefined}>
                      {c}
                    </li>
                  ))}
                </ul>
                {hidden ? (
                  <button type="button" className="hb-vg3-unhide" onClick={() => setHidden(false)}>
                    <span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Reveal {backupCodes.length} codes
                    </span>
                  </button>
                ) : null}
              </div>
              <div className="hb-vg3-actions">
                <button type="button" className="hb-vg3-mini" data-ok={copied === "codes"} onClick={() => copy(backupCodes.join("\n"), "codes")} disabled={hidden}>
                  {copied === "codes" ? "Copied" : "Copy all"}
                </button>
                <button type="button" className="hb-vg3-mini" onClick={download} disabled={hidden}>Download .txt</button>
              </div>
              <div className="hb-vg3-foot">
                <label className="hb-vg3-check">
                  <input type="checkbox" checked={saved} onChange={(e) => setSaved(e.target.checked)} />
                  <span>{chk}</span>
                  I&apos;ve stored these codes safely
                </label>
                <button
                  type="button"
                  className="hb-vg3-btn"
                  disabled={!saved}
                  onClick={() => {
                    go(3);
                    onComplete?.();
                  }}
                >
                  Finish setup
                </button>
              </div>
            </div>
          ) : (
            <div className="hb-vg3-pane hb-vg3-done" key="done" role="status">
              <span className="hb-vg3-shield" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
                  <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
                </svg>
              </span>
              <h3 className="hb-vg3-h" style={{ marginTop: 18 }}>Two-factor is on</h3>
              <p className="hb-vg3-p">Next time you sign in to {issuer}, we&apos;ll ask for a code from your authenticator. You can manage methods in Security settings.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
