"use client";

import * as React from "react";

export interface AuthFlowLockScreenProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  user?: string;
  email?: string;
  time?: string;
  date?: string;
  live?: boolean;
  pin?: string;
  maxAttempts?: number;
  lockoutSeconds?: number;
  onUnlock?: () => void;
  onFail?: (attempts: number) => void;
  onSwitchUser?: () => void;
  headingAs?: "h1" | "h2" | "h3";
  accent?: string;
}

const css = `
@keyframes hb-vg6-shake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-12px); }
  30% { transform: translateX(10px); }
  45% { transform: translateX(-7px); }
  60% { transform: translateX(5px); }
  75% { transform: translateX(-2px); }
}
@keyframes hb-vg6-drift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(-3%, 2%, 0) scale(1.06); }
}
@keyframes hb-vg6-shackle {
  0% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-4px) rotate(0); }
  100% { transform: translateY(-4px) rotate(-28deg); }
}
@keyframes hb-vg6-up {
  to { transform: translate3d(0, -110%, 0); opacity: 0; }
}
@keyframes hb-vg6-welcome {
  from { opacity: 0; transform: scale(.96); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes hb-vg6-colon { 50% { opacity: .25; } }
.hb-vg6 {
  --hb-vg6-accent: #60a5fa;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 640px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #05070c;
  color: #f5f5f5;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vg6 *, .hb-vg6 *::before, .hb-vg6 *::after { box-sizing: border-box; }
.hb-vg6-wall { position: absolute; inset: -6%; z-index: -2; background: radial-gradient(60% 50% at 70% 20%, color-mix(in srgb, var(--hb-vg6-accent) 45%, transparent), transparent 70%), radial-gradient(50% 60% at 15% 80%, #3b1d5a, transparent 70%), linear-gradient(180deg, #0d1424, #05070c 80%); animation: hb-vg6-drift 24s ease-in-out infinite; }
.hb-vg6-ridge { position: absolute; left: 0; right: 0; bottom: 0; z-index: -1; width: 100%; height: 46%; }
.hb-vg6-ridge path:nth-child(1) { fill: #0e1526; }
.hb-vg6-ridge path:nth-child(2) { fill: #0a0f1c; }
.hb-vg6-ridge path:nth-child(3) { fill: #070a13; }
.hb-vg6-veil { position: absolute; inset: 0; z-index: -1; background: rgba(5,7,12,.18); backdrop-filter: blur(0); transition: backdrop-filter .6s ease, background .6s ease; }
.hb-vg6[data-mode="entry"] .hb-vg6-veil { background: rgba(5,7,12,.45); backdrop-filter: blur(18px) saturate(1.2); }
.hb-vg6-top { position: absolute; top: 20px; left: 24px; right: 24px; display: flex; justify-content: space-between; color: rgba(255,255,255,.75); font-size: 12.5px; font-weight: 550; }
.hb-vg6-top span { display: inline-flex; align-items: center; gap: 6px; }
.hb-vg6-screen { display: flex; flex-direction: column; align-items: center; min-height: 640px; padding: 72px 20px 36px; }
.hb-vg6[data-unlocked="true"] .hb-vg6-screen { animation: hb-vg6-up .7s .45s cubic-bezier(.7, 0, .3, 1) forwards; }
.hb-vg6-lock { color: rgba(255,255,255,.85); }
.hb-vg6-lock .hb-vg6-sh { transform-origin: 16px 10px; transform-box: view-box; }
.hb-vg6[data-unlocked="true"] .hb-vg6-sh { animation: hb-vg6-shackle .5s cubic-bezier(.3, 1.3, .5, 1) forwards; }
.hb-vg6-date { margin: 12px 0 0; color: rgba(255,255,255,.8); font-size: 17px; font-weight: 550; letter-spacing: .01em; }
.hb-vg6-clock { display: flex; align-items: center; margin: 2px 0 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 112px; font-weight: 600; line-height: 1; letter-spacing: -.04em; font-variant-numeric: tabular-nums; text-shadow: 0 10px 40px rgba(0,0,0,.35); transition: transform .5s cubic-bezier(.2, .8, .2, 1), font-size .5s cubic-bezier(.2, .8, .2, 1); }
.hb-vg6[data-mode="entry"] .hb-vg6-clock { font-size: 64px; }
.hb-vg6-digit { position: relative; display: inline-block; width: .62em; height: 1em; overflow: hidden; }
.hb-vg6-strip { position: absolute; left: 0; right: 0; top: 0; display: flex; flex-direction: column; transform: translateY(calc(var(--v) * -1em)); transition: transform .7s cubic-bezier(.65, 0, .25, 1); }
.hb-vg6-strip span { display: block; height: 1em; text-align: center; }
.hb-vg6-colon { display: inline-block; width: .3em; text-align: center; animation: hb-vg6-colon 2s steps(1) infinite; }
.hb-vg6-panel { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 320px; margin-top: auto; }
.hb-vg6-av { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #fbcfe8, #a78bfa 55%, #60a5fa); color: #0b0b14; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 22px; font-weight: 700; box-shadow: 0 0 0 3px rgba(255,255,255,.18), 0 18px 40px -12px rgba(0,0,0,.6); }
.hb-vg6-name { margin: 12px 0 0; font-size: 18px; font-weight: 650; letter-spacing: -.01em; }
.hb-vg6-mail { margin: 2px 0 0; color: rgba(255,255,255,.6); font-size: 13px; }
.hb-vg6-wake { margin-top: 18px; display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 18px; border: 1px solid rgba(255,255,255,.18); border-radius: 999px; background: rgba(255,255,255,.1); color: #fff; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; backdrop-filter: blur(12px); transition: background .2s ease, transform .15s ease; }
.hb-vg6-wake:hover { background: rgba(255,255,255,.16); }
.hb-vg6-wake:active { transform: scale(.97); }
.hb-vg6-dots { display: flex; gap: 14px; height: 14px; margin-top: 16px; }
.hb-vg6-dots[data-bad="true"] { animation: hb-vg6-shake .5s cubic-bezier(.36, .07, .19, .97); }
.hb-vg6-dots i { width: 13px; height: 13px; border: 1.5px solid rgba(255,255,255,.7); border-radius: 50%; font-style: normal; transition: background .15s ease, transform .2s cubic-bezier(.3, 1.6, .5, 1); }
.hb-vg6-dots i[data-on="true"] { background: #fff; transform: scale(1.12); }
.hb-vg6-dots[data-bad="true"] i { border-color: #fca5a5; background: transparent; }
.hb-vg6-msg { min-height: 18px; margin-top: 10px; color: rgba(255,255,255,.7); font-size: 12.5px; text-align: center; }
.hb-vg6-msg[data-bad="true"] { color: #fecaca; }
.hb-vg6-pad { display: grid; grid-template-columns: repeat(3, 64px); gap: 12px 22px; margin-top: 12px; }
.hb-vg6-key { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 64px; height: 64px; border: 0; border-radius: 50%; background: rgba(255,255,255,.12); color: #fff; font: inherit; cursor: pointer; backdrop-filter: blur(10px); box-shadow: inset 0 1px 0 rgba(255,255,255,.15); transition: background .3s ease, transform .12s ease; }
.hb-vg6-key b { font-size: 26px; font-weight: 500; line-height: 1; }
.hb-vg6-key small { margin-top: 2px; color: rgba(255,255,255,.6); font-size: 8.5px; font-weight: 650; letter-spacing: .2em; }
.hb-vg6-key:hover:not(:disabled) { background: rgba(255,255,255,.2); }
.hb-vg6-key:active:not(:disabled), .hb-vg6-key[data-hit="true"] { background: rgba(255,255,255,.42); transform: scale(.94); transition-duration: .05s; }
.hb-vg6-key:disabled { opacity: .35; cursor: not-allowed; }
.hb-vg6-text { background: none; box-shadow: none; backdrop-filter: none; font-size: 13.5px; font-weight: 600; }
.hb-vg6-text:hover:not(:disabled) { background: rgba(255,255,255,.08); }
.hb-vg6-key:focus-visible, .hb-vg6-wake:focus-visible, .hb-vg6-link:focus-visible { outline: 2px solid var(--hb-vg6-accent); outline-offset: 3px; }
.hb-vg6-out { position: relative; display: grid; place-items: center; width: 72px; height: 72px; margin-top: 16px; }
.hb-vg6-out svg { position: absolute; inset: 0; transform: rotate(-90deg); }
.hb-vg6-out circle:last-child { stroke: #fca5a5; transition: stroke-dashoffset 1s linear; }
.hb-vg6-out b { font: 600 20px/1 var(--font-mono), ui-monospace, monospace; font-variant-numeric: tabular-nums; }
.hb-vg6-links { display: flex; gap: 18px; margin-top: 18px; }
.hb-vg6-link { padding: 4px 6px; border: 0; border-radius: 6px; background: none; color: rgba(255,255,255,.75); font: inherit; font-size: 13px; font-weight: 550; cursor: pointer; }
.hb-vg6-link:hover { color: #fff; }
.hb-vg6-welcome { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; animation: hb-vg6-welcome .6s .9s cubic-bezier(.2, .8, .2, 1) both; }
.hb-vg6-welcome h3 { margin: 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 36px; font-weight: 600; letter-spacing: -.03em; }
.hb-vg6-welcome p { margin: 8px 0 0; color: rgba(255,255,255,.65); font-size: 14px; }
.hb-vg6-welcome button { margin-top: 18px; }
@container (max-width: 520px) {
  .hb-vg6-clock { font-size: 84px; }
  .hb-vg6[data-mode="entry"] .hb-vg6-clock { font-size: 48px; }
  .hb-vg6-pad { gap: 10px 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vg6 *, .hb-vg6 *::before, .hb-vg6 *::after { animation: none !important; transition: none !important; }
  .hb-vg6[data-unlocked="true"] .hb-vg6-screen { opacity: 0; }
}
`;

const letters = ["", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ"];

function Digit({ value }: { value: string }) {
  const n = Number(value);
  return (
    <span className="hb-vg6-digit">
      <span className="hb-vg6-strip" style={{ "--v": Number.isNaN(n) ? 0 : n } as React.CSSProperties} aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i}>{i}</span>
        ))}
      </span>
    </span>
  );
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function AuthFlowLockScreen({
  user = "Maya Chen",
  email = "maya.chen@northwind.io",
  time = "09:41",
  date = "Saturday, November 7",
  live = true,
  pin = "2580",
  maxAttempts = 3,
  lockoutSeconds = 30,
  onUnlock,
  onFail,
  onSwitchUser,
  headingAs = "h2",
  accent = "#60a5fa",
  className = "",
  style,
  ...rest
}: AuthFlowLockScreenProps) {
  const Heading = headingAs;
  const uid = React.useId();
  const [clock, setClock] = React.useState({ time, date });
  const [mode, setMode] = React.useState<"idle" | "entry">("idle");
  const [entry, setEntry] = React.useState("");
  const [bad, setBad] = React.useState(false);
  const [attempts, setAttempts] = React.useState(0);
  const [lock, setLock] = React.useState(0);
  const [unlocked, setUnlocked] = React.useState(false);
  const [hit, setHit] = React.useState("");
  const firstKey = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!live) return;
    const tick = () => {
      const d = new Date();
      setClock({
        time: `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`,
        date: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`,
      });
    };
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 5000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [live]);

  React.useEffect(() => {
    if (lock <= 0) return;
    const id = window.setTimeout(() => setLock((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [lock]);

  React.useEffect(() => {
    if (mode === "entry") firstKey.current?.focus();
  }, [mode]);

  const press = (d: string) => {
    if (lock > 0 || unlocked) return;
    setHit(d);
    window.setTimeout(() => setHit((h) => (h === d ? "" : h)), 120);
    setBad(false);
    const next = (entry + d).slice(0, pin.length);
    setEntry(next);
    if (next.length < pin.length) return;
    if (next === pin) {
      setUnlocked(true);
      window.setTimeout(() => onUnlock?.(), 900);
      return;
    }
    const n = attempts + 1;
    setAttempts(n);
    onFail?.(n);
    setBad(true);
    window.setTimeout(() => setEntry(""), 420);
    if (n >= maxAttempts) {
      setLock(lockoutSeconds);
      setAttempts(0);
    }
  };

  const erase = () => {
    if (lock > 0 || unlocked) return;
    setBad(false);
    setEntry((e) => e.slice(0, -1));
  };

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (mode !== "entry") return;
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      press(e.key);
    } else if (e.key === "Backspace") {
      e.preventDefault();
      erase();
    } else if (e.key === "Escape") {
      setMode("idle");
      setEntry("");
    }
  };

  const relock = () => {
    setUnlocked(false);
    setEntry("");
    setMode("idle");
  };

  const [hh, mm] = clock.time.split(":");
  const ini = user.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const C = 2 * Math.PI * 32;
  const vars = { "--hb-vg6-accent": accent, ...style } as React.CSSProperties;
  const message = lock > 0 ? `Too many attempts. Try again in ${lock}s.` : bad ? `Wrong PIN. ${maxAttempts - attempts} ${maxAttempts - attempts === 1 ? "try" : "tries"} before a ${lockoutSeconds}s lockout.` : unlocked ? "Unlocked" : "Enter your PIN";

  return (
    <section className={`hb-vg6 ${className}`} style={vars} data-mode={mode} data-unlocked={unlocked} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-auth-flow-lock-screen" precedence="default">{css}</style>
      <div className="hb-vg6-wall" aria-hidden="true" />
      <svg className="hb-vg6-ridge" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 160 L140 90 L260 150 L380 60 L520 140 L640 80 L780 150 L900 70 L1040 140 L1200 90 V300 H0Z" />
        <path d="M0 210 L120 160 L240 200 L360 140 L500 210 L620 150 L760 200 L880 150 L1020 210 L1200 160 V300 H0Z" />
        <path d="M0 260 L160 220 L300 250 L460 210 L600 255 L760 220 L900 250 L1060 215 L1200 245 V300 H0Z" />
      </svg>
      <div className="hb-vg6-veil" aria-hidden="true" />
      <div className="hb-vg6-top" aria-hidden="true">
        <span>Northwind Workstation</span>
        <span>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4C5.3.4 2.7 1.4.8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.6c1.3 0 2.5.5 3.5 1.3l1.2-1.3A7 7 0 0 0 8 4 7 7 0 0 0 3.3 5.8l1.2 1.3c1-.8 2.2-1.3 3.5-1.3zM8 9.4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
          </svg>
          82%
        </span>
      </div>
      <div className="hb-vg6-screen" onKeyDown={onKey}>
        <svg className="hb-vg6-lock" width="22" height="26" viewBox="0 0 32 36" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
          <path className="hb-vg6-sh" d="M9 16V10a7 7 0 0 1 14 0v6" />
          <rect x="5" y="16" width="22" height="17" rx="4" fill="currentColor" stroke="none" />
        </svg>
        <p className="hb-vg6-date">{clock.date}</p>
        <Heading id={`${uid}-t`} className="hb-vg6-clock" aria-label={`Locked. ${clock.time}`}>
          <Digit value={hh?.[0] ?? "0"} />
          <Digit value={hh?.[1] ?? "0"} />
          <span className="hb-vg6-colon" aria-hidden="true">:</span>
          <Digit value={mm?.[0] ?? "0"} />
          <Digit value={mm?.[1] ?? "0"} />
        </Heading>
        <div className="hb-vg6-panel">
          <div className="hb-vg6-av" aria-hidden="true">{ini}</div>
          <p className="hb-vg6-name">{user}</p>
          <p className="hb-vg6-mail">{email}</p>
          {mode === "idle" ? (
            <>
              <button type="button" className="hb-vg6-wake" onClick={() => setMode("entry")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="10" width="16" height="11" rx="2.5" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                Unlock with PIN
              </button>
              <div className="hb-vg6-links">
                <button type="button" className="hb-vg6-link" onClick={() => onSwitchUser?.()}>Switch user</button>
              </div>
            </>
          ) : (
            <>
              <div className="hb-vg6-dots" data-bad={bad} aria-hidden="true">
                {Array.from(pin, (_, i) => (
                  <i key={i} data-on={i < entry.length} />
                ))}
              </div>
              <div className="hb-vg6-msg" data-bad={bad || lock > 0} role="status" aria-live="polite">
                {message}
                {entry.length ? <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{`, ${entry.length} of ${pin.length} digits`}</span> : null}
              </div>
              {lock > 0 ? (
                <div className="hb-vg6-out" aria-hidden="true">
                  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" strokeWidth="3" strokeLinecap="round">
                    <circle cx="36" cy="36" r="32" stroke="rgba(255,255,255,.15)" />
                    <circle cx="36" cy="36" r="32" strokeDasharray={C.toFixed(2)} strokeDashoffset={(C * (1 - lock / lockoutSeconds)).toFixed(2)} />
                  </svg>
                  <b>{lock}</b>
                </div>
              ) : (
                <div className="hb-vg6-pad" role="group" aria-label="PIN keypad">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d, i) => (
                    <button key={d} ref={i === 0 ? firstKey : undefined} type="button" className="hb-vg6-key" data-hit={hit === d} onClick={() => press(d)} disabled={unlocked} aria-label={d}>
                      <b>{d}</b>
                      <small>{letters[i] || " "}</small>
                    </button>
                  ))}
                  <button
                    type="button"
                    className="hb-vg6-key hb-vg6-text"
                    onClick={() => {
                      setMode("idle");
                      setEntry("");
                      setBad(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="button" className="hb-vg6-key" data-hit={hit === "0"} onClick={() => press("0")} disabled={unlocked} aria-label="0">
                    <b>0</b>
                    <small>+</small>
                  </button>
                  <button type="button" className="hb-vg6-key hb-vg6-text" onClick={erase} disabled={!entry.length || unlocked} aria-label="Delete last digit">
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {unlocked ? (
        <div className="hb-vg6-welcome" role="status">
          <div>
            <h3>Welcome back, {user.split(/\s+/)[0]}</h3>
            <p>Restoring your 6 open windows</p>
            <button type="button" className="hb-vg6-wake" onClick={relock}>Lock again</button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
