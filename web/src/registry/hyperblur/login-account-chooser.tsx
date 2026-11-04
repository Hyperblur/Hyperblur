"use client";

import * as React from "react";

export interface LoginAccount {
  id: string;
  name: string;
  email: string;
  workspace?: string;
  signedIn?: boolean;
  hue?: number;
}

export interface LoginAccountChooserProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  app?: string;
  title?: string;
  accounts?: LoginAccount[];
  device?: string | null;
  onItemSelect?: (account: LoginAccount) => boolean | void | Promise<boolean | void>;
  onUseAnother?: () => void;
  onRemove?: (account: LoginAccount) => void;
  accent?: string;
}

const css = `
.hb-qh8 {
  --hb-qh8-accent: #ff7a59;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  padding: clamp(56px, 8cqw, 104px) 20px;
}
.hb-qh8 *, .hb-qh8 *::before, .hb-qh8 *::after { box-sizing: border-box; }
.hb-qh8-glow { position: absolute; left: 50%; top: -260px; width: 900px; height: 520px; transform: translateX(-50%); pointer-events: none; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-qh8-accent) 26%, transparent), transparent), radial-gradient(closest-side at 30% 60%, rgba(139,92,246,.18), transparent); filter: blur(30px); animation: hb-qh8-breathe 9s ease-in-out infinite alternate; }
.hb-qh8-arc { position: absolute; left: 50%; top: 40px; width: 760px; height: 760px; transform: translateX(-50%); border-radius: 50%; border: 1px solid rgba(255,255,255,.05); pointer-events: none; mask: linear-gradient(#000, transparent 45%); }
.hb-qh8-arc + .hb-qh8-arc { width: 1040px; height: 1040px; top: -60px; }
.hb-qh8-inner { position: relative; max-width: 460px; margin: 0 auto; }
.hb-qh8-head { text-align: center; margin-bottom: 24px; }
.hb-qh8-logo { width: 48px; height: 48px; margin: 0 auto 18px; border-radius: 14px; display: grid; place-items: center; background: linear-gradient(145deg, #1c1c1c, #111); border: 1px solid rgba(255,255,255,.1); box-shadow: inset 0 1px 0 rgba(255,255,255,.08); color: var(--hb-qh8-accent); }
.hb-qh8-title { margin: 0; font-size: clamp(26px, 4cqw, 32px); letter-spacing: -.025em; font-weight: 600; }
.hb-qh8-sub { margin: 8px 0 0; color: #8f8f8f; font-size: 14.5px; }
.hb-qh8-sub b { color: #ededed; font-weight: 500; }
.hb-qh8-chip { display: flex; width: fit-content; margin: 18px auto 0; align-items: center; gap: 8px; height: 30px; padding: 0 12px 0 10px; border-radius: 999px; background: #111; border: 1px solid rgba(255,255,255,.08); font-size: 12.5px; color: #a1a1a1; }
.hb-qh8-chip i { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 0 3px rgba(74,222,128,.15); }
.hb-qh8-card { border-radius: 20px; border: 1px solid rgba(255,255,255,.08); background: #111; box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 30px 70px -40px rgba(0,0,0,.9); overflow: hidden; }
.hb-qh8-list { list-style: none; margin: 0; padding: 6px; outline: none; }
.hb-qh8-opt { position: relative; display: flex; align-items: center; gap: 14px; padding: 12px; border-radius: 14px; cursor: pointer; outline: none; transition: background .2s; opacity: 0; animation: hb-qh8-in .5s cubic-bezier(.2,.7,.2,1) forwards; }
.hb-qh8-opt:hover { background: #161616; }
.hb-qh8-opt[data-active="true"] { background: #181818; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); }
.hb-qh8-list:focus-visible .hb-qh8-opt[data-active="true"] { box-shadow: inset 0 0 0 2px var(--hb-qh8-accent); }
.hb-qh8-av { position: relative; flex: none; width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; font-size: 14px; font-weight: 600; color: #fff; background: linear-gradient(140deg, hsl(var(--hb-qh8-h) 85% 62%), hsl(calc(var(--hb-qh8-h) + 50) 75% 45%)); box-shadow: inset 0 1px 0 rgba(255,255,255,.3); }
.hb-qh8-dot { position: absolute; right: -1px; bottom: -1px; width: 12px; height: 12px; border-radius: 50%; background: #4ade80; border: 2px solid #111; }
.hb-qh8-txt { min-width: 0; flex: 1; display: grid; gap: 2px; }
.hb-qh8-name { display: flex; align-items: center; gap: 8px; font-size: 14.5px; font-weight: 500; }
.hb-qh8-ws { height: 19px; padding: 0 7px; border-radius: 6px; display: inline-flex; align-items: center; font-size: 11px; color: #a1a1a1; background: #1c1c1c; border: 1px solid #2a2a2a; white-space: nowrap; }
.hb-qh8-mail { font-size: 13px; color: #8f8f8f; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qh8-state { flex: none; font-size: 12px; color: #6f6f6f; }
.hb-qh8-arrow { flex: none; color: #555; transition: transform .25s, color .25s; }
.hb-qh8-opt[data-active="true"] .hb-qh8-arrow { color: var(--hb-qh8-accent); transform: translateX(3px); }
.hb-qh8-rm { flex: none; width: 30px; height: 30px; border-radius: 8px; border: 1px solid #2a2a2a; background: #161616; color: #a1a1a1; display: grid; place-items: center; cursor: pointer; }
.hb-qh8-rm:hover { color: #fca5a5; border-color: rgba(248,113,113,.4); }
.hb-qh8-rm:focus-visible, .hb-qh8-manage:focus-visible { outline: 2px solid var(--hb-qh8-accent); outline-offset: 2px; }
.hb-qh8-new .hb-qh8-av { background: #171717; border: 1px dashed #3a3a3a; color: #a1a1a1; box-shadow: none; }
.hb-qh8-spin { width: 18px; height: 18px; border-radius: 50%; border: 2px solid rgba(255,255,255,.15); border-top-color: var(--hb-qh8-accent); animation: hb-qh8-turn .7s linear infinite; }
.hb-qh8-sep { height: 1px; margin: 4px 12px; background: rgba(255,255,255,.06); }
.hb-qh8-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 18px; border-top: 1px solid rgba(255,255,255,.06); background: #0e0e0e; font-size: 12px; color: #6f6f6f; }
.hb-qh8-keys { display: inline-flex; align-items: center; gap: 6px; }
.hb-qh8-kbd { min-width: 20px; height: 20px; padding: 0 5px; border-radius: 5px; display: inline-grid; place-items: center; background: #1a1a1a; border: 1px solid #2a2a2a; border-bottom-width: 2px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; color: #a1a1a1; }
.hb-qh8-manage { border: 0; background: none; padding: 4px 6px; border-radius: 6px; color: #a1a1a1; font: inherit; font-size: 12.5px; cursor: pointer; }
.hb-qh8-manage:hover { color: #ededed; }
.hb-qh8-done { display: grid; justify-items: center; gap: 12px; padding: 34px 20px; text-align: center; animation: hb-qh8-in .45s ease both; }
.hb-qh8-done .hb-qh8-av { width: 64px; height: 64px; font-size: 20px; }
.hb-qh8-done p { margin: 0; color: #8f8f8f; font-size: 14px; }
.hb-qh8-done strong { font-size: 18px; font-weight: 600; }
.hb-qh8-ring { position: absolute; inset: -6px; border-radius: 50%; border: 2px solid transparent; border-top-color: var(--hb-qh8-accent); animation: hb-qh8-turn 1s linear infinite; }
.hb-qh8-legal { margin: 18px 0 0; text-align: center; font-size: 12.5px; color: #6f6f6f; }
@container (max-width: 420px) { .hb-qh8-state, .hb-qh8-keys { display: none; } }
@keyframes hb-qh8-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes hb-qh8-turn { to { transform: rotate(360deg); } }
@keyframes hb-qh8-breathe { from { opacity: .75; transform: translateX(-50%) scale(1); } to { opacity: 1; transform: translateX(-50%) scale(1.08); } }
@media (prefers-reduced-motion: reduce) {
  .hb-qh8 *, .hb-qh8 *::before, .hb-qh8 *::after { animation: none !important; transition: none !important; }
  .hb-qh8-opt { opacity: 1; }
}
`;

const defaults: LoginAccount[] = [
  { id: "ines", name: "Inês Duarte", email: "ines@lumacraft.studio", workspace: "Lumacraft", signedIn: true, hue: 18 },
  { id: "ines-personal", name: "Inês Duarte", email: "ines.duarte@fastmail.com", workspace: "Personal", signedIn: false, hue: 262 },
  { id: "ops", name: "Ops Team", email: "ops@northwind.co", workspace: "Northwind", signedIn: false, hue: 168 },
];

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise<unknown>((resolve) => setTimeout(() => resolve(result), 1100));
}

export function LoginAccountChooser({
  app = "Relay",
  title = "Choose an account",
  accounts = defaults,
  device = "This Mac is remembered · Lisbon, PT",
  onItemSelect,
  onUseAnother,
  onRemove,
  accent = "#ff7a59",
  className = "",
  style,
  ...rest
}: LoginAccountChooserProps) {
  const uid = React.useId();
  const [list, setList] = React.useState(accounts);
  const [active, setActive] = React.useState(0);
  const [manage, setManage] = React.useState(false);
  const [pending, setPending] = React.useState<string | null>(null);
  const [done, setDone] = React.useState<LoginAccount | null>(null);
  const [error, setError] = React.useState("");
  const listRef = React.useRef<HTMLUListElement>(null);
  const count = list.length + 1;
  const current = Math.min(active, count - 1);

  async function pick(index: number) {
    if (pending || manage) return;
    if (index >= list.length) {
      onUseAnother?.();
      return;
    }
    const account = list[index];
    setPending(account.id);
    setError("");
    try {
      const result = await wait(onItemSelect ? onItemSelect(account) : true);
      if (result === false) setError(`${account.email} needs you to sign in again.`);
      else setDone(account);
    } catch {
      setError("Something went wrong. Try again.");
    }
    setPending(null);
  }

  function remove(account: LoginAccount) {
    setList((l) => l.filter((a) => a.id !== account.id));
    onRemove?.(account);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current + 1) % count);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current - 1 + count) % count);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(count - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      void pick(current);
    } else if ((event.key === "Delete" || event.key === "Backspace") && manage && current < list.length) {
      event.preventDefault();
      remove(list[current]);
    }
  }

  const optId = (i: number) => `${uid}-o${i}`;

  return (
    <section className={`hb-qh8 ${className}`} style={{ "--hb-qh8-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-login-account-chooser" precedence="default">{css}</style>
      <div className="hb-qh8-glow" aria-hidden="true" />
      <div className="hb-qh8-arc" aria-hidden="true" />
      <div className="hb-qh8-arc" aria-hidden="true" />
      <div className="hb-qh8-inner">
        <div className="hb-qh8-head">
          <div className="hb-qh8-logo" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22"><path d="M4 11h6l2-5 3 10 2-5h1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h2 className="hb-qh8-title">{done ? `Welcome back, ${done.name.split(" ")[0]}` : title}</h2>
          <p className="hb-qh8-sub">{done ? "Opening your inbox" : <>to continue to <b>{app}</b></>}</p>
          {device && !done && <span className="hb-qh8-chip"><i aria-hidden="true" />{device}</span>}
        </div>
        <div className="hb-qh8-card">
          {done ? (
            <div className="hb-qh8-done" role="status">
              <span className="hb-qh8-av" style={{ "--hb-qh8-h": done.hue ?? 210 } as React.CSSProperties}>
                {initials(done.name)}
                <span className="hb-qh8-ring" aria-hidden="true" />
              </span>
              <strong>{done.email}</strong>
              <p>Signed in on this device.</p>
            </div>
          ) : (
            <>
              <ul
                ref={listRef}
                className="hb-qh8-list"
                role="listbox"
                tabIndex={0}
                aria-label={`Accounts for ${app}`}
                aria-activedescendant={optId(current)}
                aria-busy={pending ? true : undefined}
                onKeyDown={onKeyDown}
              >
                {list.map((a, i) => (
                  <li
                    key={a.id}
                    id={optId(i)}
                    role="option"
                    aria-selected={current === i}
                    className="hb-qh8-opt"
                    data-active={current === i}
                    style={{ animationDelay: `${(0.05 + i * 0.07).toFixed(2)}s` }}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => { listRef.current?.focus(); void pick(i); }}
                  >
                    <span className="hb-qh8-av" style={{ "--hb-qh8-h": a.hue ?? 210 } as React.CSSProperties} aria-hidden="true">
                      {initials(a.name)}
                      {a.signedIn && <span className="hb-qh8-dot" />}
                    </span>
                    <span className="hb-qh8-txt">
                      <span className="hb-qh8-name">{a.name}{a.workspace && <span className="hb-qh8-ws">{a.workspace}</span>}</span>
                      <span className="hb-qh8-mail">{a.email}</span>
                    </span>
                    {manage ? (
                      <button type="button" className="hb-qh8-rm" aria-label={`Remove ${a.email}`} tabIndex={-1} onClick={(e) => { e.stopPropagation(); remove(a); }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 3l6 6M9 3 3 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                      </button>
                    ) : pending === a.id ? (
                      <span className="hb-qh8-spin" aria-label="Signing in" />
                    ) : (
                      <>
                        <span className="hb-qh8-state">{a.signedIn ? "Signed in" : "Signed out"}</span>
                        <svg className="hb-qh8-arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </>
                    )}
                  </li>
                ))}
                {list.length > 0 && <li className="hb-qh8-sep" role="presentation" />}
                <li
                  id={optId(list.length)}
                  role="option"
                  aria-selected={current === list.length}
                  className="hb-qh8-opt hb-qh8-new"
                  data-active={current === list.length}
                  style={{ animationDelay: `${(0.05 + list.length * 0.07).toFixed(2)}s` }}
                  onMouseEnter={() => setActive(list.length)}
                  onClick={() => void pick(list.length)}
                >
                  <span className="hb-qh8-av" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </span>
                  <span className="hb-qh8-txt">
                    <span className="hb-qh8-name">Use another account</span>
                    <span className="hb-qh8-mail">Sign in with a different email</span>
                  </span>
                  <svg className="hb-qh8-arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </li>
              </ul>
              {error && <p role="alert" style={{ margin: "0 18px 12px", fontSize: 13, color: "#fca5a5" }}>{error}</p>}
              <div className="hb-qh8-foot">
                <span className="hb-qh8-keys" aria-hidden="true">
                  <span className="hb-qh8-kbd">↑</span><span className="hb-qh8-kbd">↓</span> to move
                  <span className="hb-qh8-kbd">↵</span> to continue
                </span>
                <button type="button" className="hb-qh8-manage" aria-pressed={manage} onClick={() => setManage((m) => !m)}>
                  {manage ? "Done" : "Remove an account"}
                </button>
              </div>
            </>
          )}
        </div>
        <p className="hb-qh8-legal">Signing in shares your name, email and photo with {app}.</p>
      </div>
    </section>
  );
}
