"use client";

import * as React from "react";

export interface AuthLockRevealItem {
  name: string;
  meta: string;
}

export interface AuthLockRevealProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  vaultName?: string;
  account?: { name: string; email: string };
  items?: AuthLockRevealItem[];
  minLength?: number;
  defaultPassword?: string;
  onUnlock?: (password: string) => boolean | void | Promise<boolean | void>;
  onLock?: () => void;
  onSwitchAccount?: () => void;
  accent?: string;
}

const css = `
.hb-vf8 {
  --hb-vf8-accent: #e6b450;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  display: grid;
  place-items: center;
  padding: 44px 20px;
  overflow: hidden;
  background: radial-gradient(ellipse 50% 40% at 50% 26%, color-mix(in srgb, var(--hb-vf8-accent) 9%, transparent), transparent 70%), #0a0a0a;
  color: #ededed;
  font-family: inherit;
}
.hb-vf8 *, .hb-vf8 *::before, .hb-vf8 *::after { box-sizing: border-box; }
.hb-vf8-card { width: 100%; max-width: 380px; text-align: center; }
.hb-vf8-lock { display: block; width: 168px; height: 168px; margin: 0 auto 6px; overflow: visible; transition: transform .7s cubic-bezier(.3,1.3,.5,1); }
.hb-vf8[data-stage="open"] .hb-vf8-lock { transform: scale(.78) translateY(-8px); }
.hb-vf8[data-stage="error"] .hb-vf8-lock { animation: hb-vf8-shake .5s cubic-bezier(.36,.07,.19,.97); }
.hb-vf8-shackle { fill: none; stroke-width: 13; stroke-linecap: round; transform-origin: 138px 92px; transition: transform .55s cubic-bezier(.3,1.6,.5,1); }
.hb-vf8[data-stage="open"] .hb-vf8-shackle { transform: translateY(-16px) rotate(-24deg); transition-delay: .15s; }
.hb-vf8-pin { transition: transform .35s cubic-bezier(.3,1.6,.5,1); }
.hb-vf8-driver { fill: #4a4a50; transition: fill .3s; }
.hb-vf8-pin[data-set="true"] .hb-vf8-driver { fill: var(--hb-vf8-accent); }
.hb-vf8-keypin { fill: #8a8a92; }
.hb-vf8-shear { stroke: color-mix(in srgb, var(--hb-vf8-accent) 40%, #2a2a2a); stroke-width: 1; stroke-dasharray: 2 3; transition: stroke .4s; }
.hb-vf8[data-stage="open"] .hb-vf8-shear { stroke: var(--hb-vf8-accent); stroke-dasharray: none; }
.hb-vf8-plug { fill: #1d1d21; transition: fill .4s .1s; }
.hb-vf8[data-stage="open"] .hb-vf8-plug { fill: color-mix(in srgb, var(--hb-vf8-accent) 30%, #1d1d21); }
.hb-vf8-key { transform: translateX(-110px); opacity: 0; transition: transform .6s cubic-bezier(.6,0,.2,1), opacity .2s; }
.hb-vf8[data-stage="checking"] .hb-vf8-key, .hb-vf8[data-stage="open"] .hb-vf8-key { transform: translateX(0); opacity: 1; }
.hb-vf8-glow { opacity: 0; transition: opacity .6s .3s; }
.hb-vf8[data-stage="open"] .hb-vf8-glow { opacity: 1; }
.hb-vf8-count { display: flex; justify-content: center; gap: 6px; margin: 0 0 18px; }
.hb-vf8-count i { width: 6px; height: 6px; border-radius: 50%; background: #2a2a2a; transition: background .3s, transform .3s cubic-bezier(.3,1.6,.5,1); }
.hb-vf8-count i[data-on="true"] { background: var(--hb-vf8-accent); transform: scale(1.25); }
.hb-vf8-title { margin: 0; font-size: 24px; letter-spacing: -.025em; line-height: 1.2; font-weight: 600; }
.hb-vf8-sub { margin: 8px 0 20px; color: #8f8f8f; font-size: 14px; line-height: 1.55; }
.hb-vf8-who { display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 10px; margin-bottom: 12px; border-radius: 12px; border: 1px solid #222; background: #101010; text-align: left; }
.hb-vf8-ava { width: 30px; height: 30px; flex: none; border-radius: 50%; display: grid; place-items: center; font-size: 11.5px; font-weight: 600; color: #0a0a0a; background: linear-gradient(135deg, #a7f3d0, #60a5fa); }
.hb-vf8-who b { display: block; font-size: 13px; font-weight: 500; }
.hb-vf8-who span { display: block; font-size: 12px; color: #8f8f8f; }
.hb-vf8-who button { margin-left: auto; height: 28px; padding: 0 10px; border: 0; border-radius: 8px; background: #1b1b1b; color: #a1a1a1; font: inherit; font-size: 12px; cursor: pointer; }
.hb-vf8-who button:hover { color: #ededed; background: #242424; }
.hb-vf8-row { display: flex; gap: 8px; }
.hb-vf8-input { flex: 1; min-width: 0; height: 48px; padding: 0 14px; border-radius: 12px; border: 1px solid #262626; background: #0c0c0c; color: #ededed; font: inherit; font-size: 15px; letter-spacing: .08em; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-vf8-input::placeholder { letter-spacing: 0; color: #5a5a5a; }
.hb-vf8-input:focus { border-color: var(--hb-vf8-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vf8-accent) 15%, transparent); }
.hb-vf8-input[aria-invalid="true"] { border-color: #ef5f5f; }
.hb-vf8-turn { flex: none; height: 48px; padding: 0 18px; border: 0; border-radius: 12px; display: inline-flex; align-items: center; gap: 8px; font: inherit; font-size: 14px; font-weight: 600; color: #1a1205; background: linear-gradient(180deg, color-mix(in srgb, var(--hb-vf8-accent) 80%, #fff), var(--hb-vf8-accent)); box-shadow: inset 0 1px 0 rgba(255,255,255,.45), 0 12px 28px -14px var(--hb-vf8-accent); cursor: pointer; transition: filter .2s, transform .2s cubic-bezier(.2,.8,.2,1); }
.hb-vf8-turn:hover { filter: brightness(1.06); }
.hb-vf8-turn:active { transform: scale(.97); }
.hb-vf8-turn:disabled { cursor: progress; }
.hb-vf8-msg { min-height: 18px; margin: 10px 0 0; font-size: 12.5px; color: #8f8f8f; }
.hb-vf8-msg[data-error="true"] { color: #f39494; }
.hb-vf8-vault { text-align: left; animation: hb-vf8-rise .6s .35s cubic-bezier(.2,.8,.2,1) both; }
.hb-vf8-vhead { text-align: center; margin-bottom: 18px; }
.hb-vf8-list { list-style: none; margin: 0 0 16px; padding: 6px; border-radius: 14px; border: 1px solid #222; background: #0f0f0f; }
.hb-vf8-li { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 10px; font-size: 13.5px; animation: hb-vf8-rise .5s cubic-bezier(.2,.8,.2,1) both; }
.hb-vf8-li:hover { background: #151515; }
.hb-vf8-li i { width: 30px; height: 30px; flex: none; border-radius: 9px; display: grid; place-items: center; background: color-mix(in srgb, var(--hb-vf8-accent) 14%, #141414); color: var(--hb-vf8-accent); }
.hb-vf8-li span { margin-left: auto; font-size: 12px; color: #6b6b6b; white-space: nowrap; }
.hb-vf8-relock { width: 100%; height: 42px; border-radius: 11px; border: 1px solid #262626; background: #121212; color: #ededed; font: inherit; font-size: 13.5px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: background .2s, border-color .2s; }
.hb-vf8-relock:hover { background: #181818; border-color: #333; }
.hb-vf8 :is(.hb-vf8-turn, .hb-vf8-relock, .hb-vf8-who button):focus-visible { outline: 2px solid var(--hb-vf8-accent); outline-offset: 3px; }
@keyframes hb-vf8-shake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-7px) rotate(-2deg); } 40%, 60% { transform: translateX(7px) rotate(2deg); } }
@keyframes hb-vf8-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vf8 *, .hb-vf8 *::before, .hb-vf8 *::after { animation: none !important; transition: none !important; }
}
`;

const pinX = [66, 82, 98, 114, 130];
const pinOrder = [2, 0, 4, 1, 3];
const pinDrop = pinX.map((_, i) => 4 + ((Math.imul(i + 7, 2246822519) >>> 0) % 6));
const keyCuts = pinX.map((_, i) => 3 + ((Math.imul(i + 11, 3266489917) >>> 0) % 4));

const icons = [
  <path key="a" d="M4 3h6l3 3v7H4Z M10 3v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />,
  <path key="b" d="M2.5 5.5h11v7h-11Z M2.5 8h11 M5 3.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />,
  <path key="c" d="M3 13V8m3.5 5V4m3.5 9V6.5m3.5 6.5V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />,
];

export function AuthLockReveal({
  vaultName = "Finance vault",
  account = { name: "Daniel Reyes", email: "daniel@harbor.co" },
  items = [
    { name: "Q3 board deck.pdf", meta: "Edited 2h ago" },
    { name: "Corporate card ending 4417", meta: "Updated yesterday" },
    { name: "Payroll forecast 2027", meta: "Tue, 9:40" },
  ],
  minLength = 6,
  defaultPassword = "",
  onUnlock,
  onLock,
  onSwitchAccount,
  accent = "#e6b450",
  className,
  style,
  ...rest
}: AuthLockRevealProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9-]/g, "");
  const [password, setPassword] = React.useState(defaultPassword);
  const [stage, setStage] = React.useState<"idle" | "checking" | "open" | "error">("idle");
  const [message, setMessage] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const setCount = Math.min(5, password.length);
  const initials = account.name.split(" ").map((p) => p[0]).slice(0, 2).join("");

  const fail = (text: string) => {
    setMessage(text);
    setStage("idle");
    requestAnimationFrame(() => setStage("error"));
  };

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stage === "checking") return;
    if (password.length < minLength) {
      fail(`Vault passwords have at least ${minLength} characters.`);
      return;
    }
    setMessage(null);
    setStage("checking");
    try {
      const [r] = await Promise.all([
        onUnlock ? onUnlock(password) : Promise.resolve(true),
        new Promise((res) => setTimeout(res, 900)),
      ]);
      if (r === false) {
        fail("That password did not turn the lock.");
        return;
      }
      setStage("open");
    } catch (err) {
      fail(err instanceof Error ? err.message : "The vault could not be reached.");
    }
  };

  const relock = () => {
    setPassword("");
    setStage("idle");
    setMessage(null);
    onLock?.();
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <section className={["hb-vf8", className].filter(Boolean).join(" ")} data-stage={stage} style={{ "--hb-vf8-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-auth-lock-reveal" precedence="default">{css}</style>
      <div className="hb-vf8-card">
        <svg className="hb-vf8-lock" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#6b6b72" />
              <stop offset=".5" stopColor="#d4d4d8" />
              <stop offset="1" stopColor="#5b5b62" />
            </linearGradient>
            <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2b2b31" />
              <stop offset="1" stopColor="#16161a" />
            </linearGradient>
            <radialGradient id={`${id}-glow`} cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor={accent} stopOpacity=".55" />
              <stop offset="1" stopColor={accent} stopOpacity="0" />
            </radialGradient>
            <clipPath id={`${id}-win`}><rect x="54" y="100" width="92" height="62" rx="8" /></clipPath>
          </defs>
          <circle className="hb-vf8-glow" cx="100" cy="132" r="90" fill={`url(#${id}-glow)`} />
          <path className="hb-vf8-shackle" stroke={`url(#${id}-steel)`} d="M62 94V60a38 38 0 0 1 76 0v34" />
          <rect x="38" y="86" width="124" height="98" rx="18" fill={`url(#${id}-body)`} stroke="rgba(255,255,255,.08)" />
          <path d="M52 90h96" stroke="rgba(255,255,255,.12)" strokeLinecap="round" />
          <rect x="54" y="100" width="92" height="62" rx="8" fill="#0b0b0d" stroke="rgba(0,0,0,.6)" />
          <g clipPath={`url(#${id}-win)`}>
            <rect className="hb-vf8-plug" x="54" y="138" width="92" height="18" />
            {pinX.map((x, i) => {
              const set = pinOrder.indexOf(i) < setCount || stage === "open" || stage === "checking";
              return (
                <g key={x}>
                  <path d={`M${x + 4} 100 l-3 2.5 6 2.5 -6 2.5 6 2.5 -6 2.5 6 2.5 -3 2`} stroke="#3a3a40" strokeWidth="1.2" fill="none" />
                  <g className="hb-vf8-pin" data-set={set} style={{ transform: `translateY(${set ? 0 : pinDrop[i]}px)` }}>
                    <rect className="hb-vf8-driver" x={x} y="116" width="8" height="22" rx="1.5" />
                    <path className="hb-vf8-keypin" d={`M${x} 138h8v${8 + keyCuts[i]}l-4 3-4-3Z`} />
                  </g>
                </g>
              );
            })}
            <line className="hb-vf8-shear" x1="54" y1="138" x2="146" y2="138" />
          </g>
          <g className="hb-vf8-key">
            <circle cx="30" cy="154" r="11" fill="none" stroke={accent} strokeWidth="5" />
            <path d={`M41 150${pinX.map((x, i) => `L${x} 150L${x + 4} ${149 + keyCuts[i]}L${x + 8} 150`).join("")}L144 150L146 154L144 158H41Z`} fill={accent} />
          </g>
          <circle cx="100" cy="172" r="2.5" fill="#3a3a40" />
        </svg>
        <div className="hb-vf8-count" aria-hidden="true">
          {pinX.map((x, i) => <i key={x} data-on={i < setCount || stage === "open"} />)}
        </div>
        {stage === "open" ? (
          <div className="hb-vf8-vault" role="status">
            <div className="hb-vf8-vhead">
              <h2 className="hb-vf8-title">{vaultName} is open</h2>
              <p className="hb-vf8-sub" style={{ marginBottom: 0 }}>{items.length} items changed since your last visit. Locks again after 5 idle minutes.</p>
            </div>
            <ul className="hb-vf8-list">
              {items.map((it, i) => (
                <li key={it.name} className="hb-vf8-li" style={{ animationDelay: `${(0.5 + i * 0.08).toFixed(2)}s` }}>
                  <i aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16">{icons[i % icons.length]}</svg></i>
                  {it.name}
                  <span>{it.meta}</span>
                </li>
              ))}
            </ul>
            <button type="button" className="hb-vf8-relock" onClick={relock}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" /></svg>
              Lock {vaultName.toLowerCase()}
            </button>
          </div>
        ) : (
          <form onSubmit={unlock} noValidate>
            <h2 className="hb-vf8-title">Unlock {vaultName.toLowerCase()}</h2>
            <p className="hb-vf8-sub">Confirm it is you to see balances, cards and shared files.</p>
            <div className="hb-vf8-who">
              <span className="hb-vf8-ava" aria-hidden="true">{initials}</span>
              <div><b>{account.name}</b><span>{account.email}</span></div>
              <button type="button" onClick={() => onSwitchAccount?.()}>Not you?</button>
            </div>
            <div className="hb-vf8-row">
              <label htmlFor={`${id}-p`} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Vault password</label>
              <input ref={inputRef} id={`${id}-p`} className="hb-vf8-input" type="password" autoComplete="current-password" placeholder="Vault password" value={password} onChange={(e) => { setPassword(e.target.value); if (stage === "error") setStage("idle"); }} aria-invalid={stage === "error" ? true : undefined} aria-describedby={`${id}-m`} />
              <button type="submit" className="hb-vf8-turn" disabled={stage === "checking"} aria-busy={stage === "checking"}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="5" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" /><path d="M8 8h6.5M12 8v2.5M14 8v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                {stage === "checking" ? "Turning" : "Unlock"}
              </button>
            </div>
            <p id={`${id}-m`} className="hb-vf8-msg" data-error={stage === "error"} role={stage === "error" ? "alert" : undefined}>
              {message ?? (setCount >= 5 ? "All pins set. Turn the key." : `${5 - setCount} ${5 - setCount === 1 ? "pin" : "pins"} left to set`)}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
