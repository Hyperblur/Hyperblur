"use client";

import * as React from "react";

export interface AuthFlowDevicePlace {
  label: string;
  x: number;
  y: number;
}

export interface AuthFlowNewDeviceProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  device?: string;
  browser?: string;
  ip?: string;
  when?: string;
  attempt?: AuthFlowDevicePlace;
  usual?: AuthFlowDevicePlace;
  distance?: string;
  numbers?: number[];
  correct?: number;
  onApprove?: (remember: boolean) => void;
  onDeny?: () => void;
  headingAs?: "h1" | "h2" | "h3";
  accent?: string;
}

const css = `
@keyframes hb-vg4-pulse {
  0% { transform: scale(1); opacity: .9; }
  100% { transform: scale(5.5); opacity: 0; }
}
@keyframes hb-vg4-flow { to { stroke-dashoffset: -24; } }
@keyframes hb-vg4-in {
  from { opacity: 0; transform: translate3d(0, 10px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-vg4-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(7px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(2px); }
}
@keyframes hb-vg4-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-vg4-row {
  from { opacity: 0; transform: translate3d(-8px, 0, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-vg4 {
  --hb-vg4-accent: #fbbf24;
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
.hb-vg4 *, .hb-vg4 *::before, .hb-vg4 *::after { box-sizing: border-box; }
.hb-vg4::before { content: ""; position: absolute; inset: 0; z-index: -1; background: radial-gradient(ellipse 45% 50% at 20% 30%, color-mix(in srgb, var(--hb-vg4-accent) 9%, transparent), transparent 70%); }
.hb-vg4-wrap { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); max-width: 900px; margin: 0 auto; border: 1px solid #222; border-radius: 24px; background: #0e0e0e; box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 50px 100px -50px #000; overflow: hidden; }
.hb-vg4-left { padding: 28px; border-right: 1px solid #1d1d1d; background: linear-gradient(180deg, #121212, #0d0d0d); }
.hb-vg4-tag { display: inline-flex; align-items: center; gap: 8px; color: var(--hb-vg4-accent); font: 600 11.5px/1 var(--font-mono), ui-monospace, monospace; letter-spacing: .1em; text-transform: uppercase; }
.hb-vg4-tag i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vg4-accent) 20%, transparent); font-style: normal; }
.hb-vg4-title { margin: 14px 0 0; font-size: 28px; font-weight: 650; letter-spacing: -.03em; line-height: 1.12; }
.hb-vg4-map { position: relative; margin-top: 20px; border: 1px solid #1f1f1f; border-radius: 16px; background: radial-gradient(ellipse at 50% 120%, #161616, #0b0b0b 70%); overflow: hidden; }
.hb-vg4-map svg { display: block; width: 100%; height: auto; }
.hb-vg4-dots circle { fill: #2a2a2a; }
.hb-vg4-arc { stroke: var(--hb-vg4-accent); stroke-dasharray: 3 5; animation: hb-vg4-flow 1.2s linear infinite; }
.hb-vg4-ping { fill: none; stroke: var(--hb-vg4-accent); stroke-width: .4; transform-box: fill-box; transform-origin: center; animation: hb-vg4-pulse 2s cubic-bezier(.2, .6, .3, 1) infinite; }
.hb-vg4-ping:nth-of-type(2) { animation-delay: 1s; }
.hb-vg4-pin { position: absolute; transform: translate(-50%, calc(-100% - 12px)); padding: 4px 8px; border: 1px solid #2a2a2a; border-radius: 7px; background: rgba(17,17,17,.92); color: #cfcfcf; font-size: 11px; font-weight: 550; white-space: nowrap; backdrop-filter: blur(6px); }
.hb-vg4-pin[data-new="true"] { border-color: color-mix(in srgb, var(--hb-vg4-accent) 50%, #2a2a2a); color: #ededed; }
.hb-vg4-dist { position: absolute; right: 10px; bottom: 10px; padding: 3px 7px; border-radius: 6px; background: #151515; color: #8f8f8f; font: 500 10.5px/1.3 var(--font-mono), ui-monospace, monospace; }
.hb-vg4-facts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; margin: 16px 0 0; border: 1px solid #1f1f1f; border-radius: 14px; background: #1f1f1f; overflow: hidden; }
.hb-vg4-facts div { padding: 11px 14px; background: #0f0f0f; }
.hb-vg4-facts dt { color: #6f6f6f; font-size: 11px; font-weight: 550; letter-spacing: .04em; text-transform: uppercase; }
.hb-vg4-facts dd { margin: 4px 0 0; color: #ededed; font-size: 13.5px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-vg4-facts dd code { font: 500 12.5px/1 var(--font-mono), ui-monospace, monospace; }
.hb-vg4-right { display: flex; flex-direction: column; padding: 28px; }
.hb-vg4-h { margin: 0; font-size: 18px; font-weight: 650; letter-spacing: -.015em; }
.hb-vg4-p { margin: 8px 0 0; color: #a1a1a1; font-size: 14px; line-height: 1.6; }
.hb-vg4-nums { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 20px; }
.hb-vg4-nums[data-bad="true"] { animation: hb-vg4-shake .42s ease; }
.hb-vg4-num {
  position: relative;
  height: 78px;
  border: 1px solid #262626;
  border-radius: 16px;
  background: linear-gradient(180deg, #171717, #111);
  color: #ededed;
  font: 600 32px/1 var(--font-grotesk), var(--font-sans), sans-serif;
  font-variant-numeric: tabular-nums;
  letter-spacing: -.02em;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 6px 14px -8px #000;
  transition: transform .18s cubic-bezier(.3, 1.4, .5, 1), border-color .2s ease, background .2s ease, color .2s ease;
}
.hb-vg4-num:hover:not(:disabled) { transform: translateY(-2px); border-color: #3a3a3a; }
.hb-vg4-num:active:not(:disabled) { transform: translateY(0) scale(.97); }
.hb-vg4-num:focus-visible { outline: 2px solid var(--hb-vg4-accent); outline-offset: 2px; }
.hb-vg4-num[data-state="wrong"] { border-color: #7f1d1d; color: #fca5a5; background: #160b0b; }
.hb-vg4-num[data-state="right"] { border-color: color-mix(in srgb, var(--hb-vg4-accent) 60%, transparent); color: var(--hb-vg4-accent); background: color-mix(in srgb, var(--hb-vg4-accent) 8%, #111); }
.hb-vg4-num:disabled { cursor: default; }
.hb-vg4-msg { min-height: 20px; margin-top: 10px; color: #8f8f8f; font-size: 12.5px; }
.hb-vg4-msg[data-bad="true"] { color: #fca5a5; }
.hb-vg4-remember { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; padding: 12px 14px; border: 1px solid #1f1f1f; border-radius: 12px; background: #0b0b0b; color: #cfcfcf; font-size: 13px; cursor: pointer; }
.hb-vg4-sw { position: relative; flex: 0 0 auto; width: 36px; height: 20px; border-radius: 99px; background: #2a2a2a; transition: background .25s ease; }
.hb-vg4-sw::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #ededed; box-shadow: 0 1px 3px rgba(0,0,0,.5); transition: transform .3s cubic-bezier(.3, 1.4, .5, 1); }
.hb-vg4-remember input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.hb-vg4-remember input:checked + .hb-vg4-sw { background: var(--hb-vg4-accent); }
.hb-vg4-remember input:checked + .hb-vg4-sw::after { transform: translateX(16px); }
.hb-vg4-remember input:focus-visible + .hb-vg4-sw { outline: 2px solid var(--hb-vg4-accent); outline-offset: 2px; }
.hb-vg4-deny { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 44px; margin-top: auto; padding: 0 16px; border: 1px solid #3b1414; border-radius: 12px; background: #140a0a; color: #fca5a5; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .2s ease, border-color .2s ease, transform .12s ease; }
.hb-vg4-deny:hover { background: #1c0d0d; border-color: #5b1d1d; }
.hb-vg4-deny:active { transform: scale(.98); }
.hb-vg4-deny:focus-visible { outline: 2px solid #f87171; outline-offset: 2px; }
.hb-vg4-spacer { flex: 1 1 auto; min-height: 18px; }
.hb-vg4-result { animation: hb-vg4-in .45s cubic-bezier(.2, .8, .2, 1) both; }
.hb-vg4-badge { display: grid; place-items: center; width: 48px; height: 48px; border-radius: 15px; }
.hb-vg4-badge[data-tone="ok"] { background: color-mix(in srgb, var(--hb-vg4-accent) 14%, #111); color: var(--hb-vg4-accent); }
.hb-vg4-badge[data-tone="bad"] { background: #1a0c0c; color: #f87171; }
.hb-vg4-badge path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-vg4-draw .55s .1s cubic-bezier(.65, 0, .35, 1) forwards; }
.hb-vg4-result .hb-vg4-h { margin-top: 16px; }
.hb-vg4-list { display: grid; gap: 8px; margin: 18px 0 0; padding: 0; list-style: none; }
.hb-vg4-list li { display: flex; align-items: center; gap: 10px; color: #cfcfcf; font-size: 13.5px; animation: hb-vg4-row .4s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--d) * 220ms + 200ms); }
.hb-vg4-list li span { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 50%; background: #1a1a1a; color: #86efac; }
.hb-vg4-undo { align-self: flex-start; margin-top: 18px; padding: 0; border: 0; border-radius: 4px; background: none; color: #8f8f8f; font: inherit; font-size: 13px; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
.hb-vg4-undo:hover { color: #ededed; }
.hb-vg4-undo:focus-visible { outline: 2px solid var(--hb-vg4-accent); outline-offset: 2px; }
@container (max-width: 700px) {
  .hb-vg4-wrap { grid-template-columns: minmax(0, 1fr); }
  .hb-vg4-left { border-right: 0; border-bottom: 1px solid #1d1d1d; padding: 22px; }
  .hb-vg4-right { padding: 22px; }
  .hb-vg4-title { font-size: 23px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vg4 *, .hb-vg4 *::before, .hb-vg4 *::after { animation: none !important; transition: none !important; }
  .hb-vg4-badge path { stroke-dashoffset: 0; }
  .hb-vg4-ping { display: none; }
}
`;

function hash(n: number) {
  let x = Math.imul(n ^ 0x27d4eb2d, 0x165667b1) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x85ebca77) >>> 0;
  return (x ^ (x >>> 13)) >>> 0;
}

const W = 360;
const H = 170;

export function AuthFlowNewDevice({
  device = "MacBook Air",
  browser = "Chrome 131 on macOS",
  ip = "84.17.46.203",
  when = "Today, 9:41 AM",
  attempt = { label: "Berlin, DE", x: 0.66, y: 0.42 },
  usual = { label: "Lisbon, PT", x: 0.22, y: 0.7 },
  distance = "2,312 km from your usual sign-in",
  numbers = [38, 72, 15],
  correct = 72,
  onApprove,
  onDeny,
  headingAs = "h2",
  accent = "#fbbf24",
  className = "",
  style,
  ...rest
}: AuthFlowNewDeviceProps) {
  const Heading = headingAs;
  const uid = React.useId();
  const [picked, setPicked] = React.useState<number | null>(null);
  const [tries, setTries] = React.useState(0);
  const [remember, setRemember] = React.useState(true);
  const [result, setResult] = React.useState<"pending" | "approved" | "denied">("pending");

  const dots = React.useMemo(() => {
    const out: { x: number; y: number; r: number }[] = [];
    for (let y = 8; y < H; y += 10) {
      for (let x = 8; x < W; x += 10) {
        const h = hash(x * 131 + y * 7);
        const nx = x / W;
        const ny = y / H;
        const land = Math.sin(nx * 7.1 + 0.6) * Math.cos(ny * 5.3 - 0.4) + Math.sin(nx * 13 + ny * 4) * 0.35;
        if (land > -0.15 && h % 7 !== 0) out.push({ x, y, r: land > 0.45 ? 1.5 : 1.1 });
      }
    }
    return out;
  }, []);

  const ax = attempt.x * W;
  const ay = attempt.y * H;
  const ux = usual.x * W;
  const uy = usual.y * H;
  const cx = (ax + ux) / 2;
  const cy = Math.min(ay, uy) - 46;

  const pick = (n: number) => {
    if (picked === correct) return;
    setPicked(n);
    if (n === correct) {
      window.setTimeout(() => {
        setResult("approved");
        onApprove?.(remember);
      }, 650);
    } else setTries((t) => t + 1);
  };

  const deny = () => {
    setResult("denied");
    onDeny?.();
  };

  const reset = () => {
    setResult("pending");
    setPicked(null);
    setTries(0);
  };

  const wrong = picked !== null && picked !== correct;
  const vars = { "--hb-vg4-accent": accent, ...style } as React.CSSProperties;
  const tick = (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 6.5l2.2 2.2L9.5 3.8" />
    </svg>
  );

  return (
    <section className={`hb-vg4 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-auth-flow-new-device" precedence="default">{css}</style>
      <div className="hb-vg4-wrap">
        <div className="hb-vg4-left">
          <span className="hb-vg4-tag">
            <i aria-hidden="true" />
            New sign-in attempt
          </span>
          <Heading id={`${uid}-t`} className="hb-vg4-title">Is this you signing in from {attempt.label.split(",")[0]}?</Heading>
          <div className="hb-vg4-map">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Map from ${usual.label} to ${attempt.label}`}>
              <g className="hb-vg4-dots">
                {dots.map((d, i) => (
                  <circle key={i} cx={d.x} cy={d.y} r={d.r} />
                ))}
              </g>
              <path className="hb-vg4-arc" d={`M${ux.toFixed(1)} ${uy.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ax.toFixed(1)} ${ay.toFixed(1)}`} fill="none" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx={ux} cy={uy} r="4" fill="#8f8f8f" stroke="#0b0b0b" strokeWidth="2" />
              <circle className="hb-vg4-ping" cx={ax} cy={ay} r="4" />
              <circle className="hb-vg4-ping" cx={ax} cy={ay} r="4" />
              <circle cx={ax} cy={ay} r="5" fill={accent} stroke="#0b0b0b" strokeWidth="2" />
            </svg>
            <span className="hb-vg4-pin" style={{ left: `${(usual.x * 100).toFixed(1)}%`, top: `${(usual.y * 100).toFixed(1)}%` }}>Usual · {usual.label}</span>
            <span className="hb-vg4-pin" data-new="true" style={{ left: `${(attempt.x * 100).toFixed(1)}%`, top: `${(attempt.y * 100).toFixed(1)}%` }}>{attempt.label}</span>
            <span className="hb-vg4-dist">{distance}</span>
          </div>
          <dl className="hb-vg4-facts">
            <div>
              <dt>Device</dt>
              <dd>{device}</dd>
            </div>
            <div>
              <dt>Browser</dt>
              <dd>{browser}</dd>
            </div>
            <div>
              <dt>IP address</dt>
              <dd><code>{ip}</code></dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{when}</dd>
            </div>
          </dl>
        </div>
        <div className="hb-vg4-right">
          {result === "pending" ? (
            <>
              <h3 className="hb-vg4-h">Match the number</h3>
              <p className="hb-vg4-p">Your {device} is showing a two-digit number. Tap the same one here to let it in.</p>
              <div className="hb-vg4-nums" role="group" aria-label="Numbers" data-bad={wrong} key={tries}>
                {numbers.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className="hb-vg4-num"
                    data-state={picked === n ? (n === correct ? "right" : "wrong") : "idle"}
                    onClick={() => pick(n)}
                    disabled={picked === correct}
                    aria-describedby={`${uid}-m`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div id={`${uid}-m`} className="hb-vg4-msg" data-bad={wrong} aria-live="polite">
                {picked === correct ? "Number matched. Approving" : wrong ? (tries >= 2 ? "Still no match. If you didn't start this, block it." : "That's not the number on your device.") : "Not sure? Don't guess. Block it instead."}
              </div>
              <label className="hb-vg4-remember">
                Trust this device for 30 days
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span className="hb-vg4-sw" aria-hidden="true" />
              </label>
              <div className="hb-vg4-spacer" />
              <button type="button" className="hb-vg4-deny" onClick={deny}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M5.6 5.6l12.8 12.8" />
                </svg>
                No, it wasn&apos;t me
              </button>
            </>
          ) : result === "approved" ? (
            <div className="hb-vg4-result" role="status">
              <span className="hb-vg4-badge" data-tone="ok" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <h3 className="hb-vg4-h">{device} is signed in</h3>
              <p className="hb-vg4-p">{remember ? "We'll skip this check on it for the next 30 days." : "We'll ask again the next time it signs in."} You can remove it any time from Devices.</p>
              <button type="button" className="hb-vg4-undo" onClick={reset}>Review again</button>
            </div>
          ) : (
            <div className="hb-vg4-result" role="status">
              <span className="hb-vg4-badge" data-tone="bad" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
                </svg>
              </span>
              <h3 className="hb-vg4-h">Attempt blocked</h3>
              <p className="hb-vg4-p">Good call. Here is what we did to lock things down.</p>
              <ul className="hb-vg4-list">
                {[`Blocked ${device} in ${attempt.label}`, "Signed out every other session", "Sent a password reset link", "Flagged IP for review"].map((t, i) => (
                  <li key={t} style={{ "--d": i } as React.CSSProperties}>
                    <span>{tick}</span>
                    {t}
                  </li>
                ))}
              </ul>
              <button type="button" className="hb-vg4-undo" onClick={reset}>It was me after all</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
