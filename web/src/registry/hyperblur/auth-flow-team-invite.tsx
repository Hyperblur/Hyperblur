"use client";

import * as React from "react";

export interface AuthFlowInviteMember {
  name: string;
  color?: string;
}

export type AuthFlowInviteRole = "Member" | "Admin" | "Guest";

export interface AuthFlowTeamInviteProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  workspace?: string;
  inviter?: string;
  email?: string;
  role?: string;
  domain?: string;
  members?: AuthFlowInviteMember[];
  suggestions?: string[];
  seats?: number;
  defaultStep?: number;
  defaultInvites?: string[];
  onJoin?: (values: { name: string; password: string }) => void | Promise<unknown>;
  onInvite?: (invites: { email: string; role: AuthFlowInviteRole }[]) => void | Promise<unknown>;
  headingAs?: "h1" | "h2" | "h3";
  accent?: string;
}

const css = `
@keyframes hb-vg7-in {
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-vg7-chip {
  0% { opacity: 0; transform: scale(.6); }
  70% { transform: scale(1.06); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes hb-vg7-fly {
  0% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
  100% { opacity: 0; transform: translate3d(var(--fx), -150px, 0) scale(.35); }
}
@keyframes hb-vg7-pop {
  0% { transform: scale(0); }
  70% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
@keyframes hb-vg7-shine { to { background-position: -200% 0; } }
.hb-vg7 {
  --hb-vg7-accent: #34d399;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 64px 20px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vg7 *, .hb-vg7 *::before, .hb-vg7 *::after { box-sizing: border-box; }
.hb-vg7::before { content: ""; position: absolute; inset: 0; z-index: -1; background: radial-gradient(ellipse 50% 40% at 50% 0%, color-mix(in srgb, var(--hb-vg7-accent) 12%, transparent), transparent 70%), radial-gradient(circle at 50% 0%, rgba(255,255,255,.04) 1px, transparent 1px) 0 0 / 22px 22px; }
.hb-vg7-col { max-width: 560px; margin: 0 auto; }
.hb-vg7-ticket { position: relative; display: flex; align-items: center; gap: 16px; padding: 18px 20px; border: 1px solid #262626; border-radius: 18px; background: linear-gradient(110deg, #141414 40%, color-mix(in srgb, var(--hb-vg7-accent) 10%, #141414) 50%, #141414 60%) 0 0 / 200% 100%; box-shadow: inset 0 1px 0 rgba(255,255,255,.05); animation: hb-vg7-shine 6s cubic-bezier(.4, 0, .2, 1) infinite; }
.hb-vg7-ticket::before, .hb-vg7-ticket::after { content: ""; position: absolute; top: 50%; width: 16px; height: 16px; margin-top: -8px; border: 1px solid #262626; border-radius: 50%; background: #0a0a0a; }
.hb-vg7-ticket::before { left: -9px; clip-path: inset(0 0 0 50%); }
.hb-vg7-ticket::after { right: -9px; clip-path: inset(0 50% 0 0); }
.hb-vg7-logo { flex: 0 0 auto; display: grid; place-items: center; width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, var(--hb-vg7-accent), color-mix(in srgb, var(--hb-vg7-accent) 40%, #0a0a0a)); color: #04120c; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 20px; font-weight: 700; box-shadow: inset 0 1px 0 rgba(255,255,255,.35); }
.hb-vg7-tx { min-width: 0; flex: 1 1 auto; }
.hb-vg7-tx p { margin: 0; color: #a1a1a1; font-size: 13px; line-height: 1.5; }
.hb-vg7-tx p b { color: #ededed; font-weight: 600; }
.hb-vg7-tx strong { display: block; margin-top: 2px; font-size: 17px; font-weight: 650; letter-spacing: -.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-vg7-stack { display: flex; flex: 0 0 auto; padding-left: 8px; }
.hb-vg7-av { display: grid; place-items: center; width: 30px; height: 30px; margin-left: -8px; border: 2px solid #141414; border-radius: 50%; background: var(--c, #333); color: #0a0a0a; font-size: 11px; font-weight: 700; }
.hb-vg7-av[data-new="true"] { animation: hb-vg7-pop .45s cubic-bezier(.3, 1.5, .5, 1) both; animation-delay: calc(var(--d) * 90ms + 450ms); }
.hb-vg7-more { background: #222; color: #cfcfcf; font-size: 10.5px; }
.hb-vg7-card { margin-top: 18px; padding: 28px; border: 1px solid #222; border-radius: 22px; background: linear-gradient(180deg, #131313, #0e0e0e); box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 40px 80px -40px #000; }
.hb-vg7-pane { animation: hb-vg7-in .45s cubic-bezier(.2, .8, .2, 1) both; }
.hb-vg7-title { margin: 0; font-size: 24px; font-weight: 650; letter-spacing: -.025em; }
.hb-vg7-sub { margin: 6px 0 0; color: #a1a1a1; font-size: 14px; line-height: 1.55; }
.hb-vg7-fields { display: grid; gap: 14px; margin-top: 22px; }
.hb-vg7-label { display: block; margin-bottom: 6px; color: #cfcfcf; font-size: 13px; font-weight: 550; }
.hb-vg7-input { width: 100%; height: 44px; padding: 0 14px; border: 1px solid #262626; border-radius: 11px; background: #0a0a0a; color: #ededed; font: inherit; font-size: 14.5px; outline: none; transition: border-color .2s ease, box-shadow .2s ease; }
.hb-vg7-input::placeholder { color: #555; }
.hb-vg7-input:focus { border-color: color-mix(in srgb, var(--hb-vg7-accent) 55%, #262626); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vg7-accent) 12%, transparent); }
.hb-vg7-locked { display: flex; align-items: center; justify-content: space-between; gap: 10px; height: 44px; padding: 0 12px 0 14px; border: 1px solid #1f1f1f; border-radius: 11px; background: #0d0d0d; color: #a1a1a1; font-size: 14.5px; }
.hb-vg7-locked span:last-child { display: inline-flex; align-items: center; gap: 6px; color: var(--hb-vg7-accent); font-size: 12px; font-weight: 600; white-space: nowrap; }
.hb-vg7-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; }
.hb-vg7-role { display: inline-flex; align-items: center; gap: 6px; margin-top: 18px; color: #8f8f8f; font-size: 12.5px; }
.hb-vg7-role b { padding: 3px 8px; border: 1px solid #2a2a2a; border-radius: 6px; color: #ededed; font-weight: 600; }
.hb-vg7-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 46px; margin-top: 20px; border: 0; border-radius: 12px; background: var(--hb-vg7-accent); color: #04120c; font: inherit; font-size: 14.5px; font-weight: 650; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 12px 28px -14px var(--hb-vg7-accent); transition: transform .15s ease, filter .2s ease, opacity .2s ease; }
.hb-vg7-btn:hover:not(:disabled) { filter: brightness(1.07); }
.hb-vg7-btn:active:not(:disabled) { transform: scale(.985); }
.hb-vg7-btn:disabled { opacity: .4; cursor: not-allowed; }
.hb-vg7-btn:focus-visible, .hb-vg7-skip:focus-visible, .hb-vg7-x:focus-visible, .hb-vg7-rbtn:focus-visible, .hb-vg7-sug button:focus-visible { outline: 2px solid var(--hb-vg7-accent); outline-offset: 2px; }
.hb-vg7-err { min-height: 18px; margin-top: 10px; color: #fca5a5; font-size: 13px; }
.hb-vg7-box { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-height: 52px; margin-top: 20px; padding: 7px; border: 1px solid #262626; border-radius: 13px; background: #0a0a0a; cursor: text; transition: border-color .2s ease, box-shadow .2s ease; }
.hb-vg7-box:focus-within { border-color: color-mix(in srgb, var(--hb-vg7-accent) 55%, #262626); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-vg7-accent) 12%, transparent); }
.hb-vg7-box input { flex: 1 1 140px; min-width: 120px; height: 34px; padding: 0 6px; border: 0; background: none; color: #ededed; font: inherit; font-size: 14px; outline: none; }
.hb-vg7-box input::placeholder { color: #555; }
.hb-vg7-chip { display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 4px 0 6px; border: 1px solid #2a2a2a; border-radius: 9px; background: #151515; font-size: 13px; animation: hb-vg7-chip .3s cubic-bezier(.3, 1.4, .5, 1) both; max-width: 100%; }
.hb-vg7-chip[data-flying="true"] { animation: hb-vg7-fly .6s cubic-bezier(.5, 0, .75, 0) forwards; animation-delay: calc(var(--d) * 70ms); }
.hb-vg7-chip[data-bad="true"] { border-color: #5b1d1d; background: #170b0b; color: #fca5a5; }
.hb-vg7-dot { width: 18px; height: 18px; border-radius: 50%; background: var(--c); flex: 0 0 auto; display: grid; place-items: center; color: #0a0a0a; font-size: 9px; font-weight: 700; }
.hb-vg7-mail { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 180px; }
.hb-vg7-ext { padding: 1px 5px; border-radius: 4px; background: #2a2210; color: #fbbf24; font-size: 10.5px; font-weight: 650; }
.hb-vg7-rbtn { height: 24px; padding: 0 7px; border: 1px solid #2a2a2a; border-radius: 6px; background: #0e0e0e; color: #cfcfcf; font: inherit; font-size: 11.5px; font-weight: 600; cursor: pointer; transition: background .2s ease; }
.hb-vg7-rbtn:hover { background: #1c1c1c; }
.hb-vg7-x { display: grid; place-items: center; width: 22px; height: 22px; border: 0; border-radius: 6px; background: none; color: #8f8f8f; cursor: pointer; }
.hb-vg7-x:hover { background: #222; color: #ededed; }
.hb-vg7-hint { margin-top: 8px; color: #6b6b6b; font-size: 12px; }
.hb-vg7-seats { margin-top: 18px; }
.hb-vg7-seats div:first-child { display: flex; justify-content: space-between; color: #a1a1a1; font-size: 12.5px; }
.hb-vg7-seats b { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-vg7-meter { display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 3px; margin-top: 8px; }
.hb-vg7-meter span { height: 6px; border-radius: 2px; background: #1f1f1f; transition: background .3s ease; transition-delay: calc(var(--d) * 30ms); }
.hb-vg7-meter span[data-s="used"] { background: #4b4b4b; }
.hb-vg7-meter span[data-s="new"] { background: var(--hb-vg7-accent); }
.hb-vg7-meter span[data-s="over"] { background: #f87171; }
.hb-vg7-sug { margin-top: 20px; }
.hb-vg7-sug h4 { margin: 0 0 8px; color: #8f8f8f; font-size: 12px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
.hb-vg7-sug ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
.hb-vg7-sug li { display: flex; align-items: center; gap: 10px; padding: 6px 6px 6px 8px; border-radius: 10px; font-size: 13.5px; transition: background .2s ease; }
.hb-vg7-sug li:hover { background: #141414; }
.hb-vg7-sug li span:nth-child(2) { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #cfcfcf; }
.hb-vg7-sug button { height: 28px; padding: 0 10px; border: 1px solid #2a2a2a; border-radius: 8px; background: #121212; color: #ededed; font: inherit; font-size: 12.5px; font-weight: 600; cursor: pointer; }
.hb-vg7-sug button:hover { border-color: #3a3a3a; }
.hb-vg7-actions { display: flex; align-items: center; gap: 12px; margin-top: 20px; }
.hb-vg7-actions .hb-vg7-btn { margin-top: 0; flex: 1 1 auto; }
.hb-vg7-skip { flex: 0 0 auto; height: 46px; padding: 0 16px; border: 0; border-radius: 12px; background: none; color: #a1a1a1; font: inherit; font-size: 14px; font-weight: 550; cursor: pointer; }
.hb-vg7-skip:hover { color: #ededed; background: #151515; }
.hb-vg7-done { text-align: center; padding: 8px 0; }
.hb-vg7-done .hb-vg7-sub { max-width: 380px; margin-left: auto; margin-right: auto; }
.hb-vg7-done a { display: inline-flex; align-items: center; justify-content: center; gap: 8px; margin-top: 20px; height: 44px; padding: 0 18px; border-radius: 12px; background: #ededed; color: #0a0a0a; font-size: 14px; font-weight: 650; text-decoration: none; }
.hb-vg7-done a:focus-visible { outline: 2px solid var(--hb-vg7-accent); outline-offset: 3px; }
@container (max-width: 560px) {
  .hb-vg7-stack { display: none; }
  .hb-vg7-row { grid-template-columns: minmax(0, 1fr); }
  .hb-vg7-card { padding: 22px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vg7 *, .hb-vg7 *::before, .hb-vg7 *::after { animation: none !important; transition: none !important; }
}
`;

const palette = ["#fda4af", "#fcd34d", "#86efac", "#7dd3fc", "#c4b5fd", "#f0abfc", "#fdba74", "#5eead4"];

function seedOf(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h >>> 0;
}

function colorOf(s: string) {
  return palette[seedOf(s) % palette.length];
}

function initialsOf(s: string) {
  const base = s.includes("@") ? s.split("@")[0].replace(/[._-]+/g, " ") : s;
  return base.split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function wait(result: void | Promise<unknown>, ms: number) {
  return result instanceof Promise ? result : new Promise((resolve) => window.setTimeout(resolve, ms));
}

const roles: AuthFlowInviteRole[] = ["Member", "Admin", "Guest"];
const valid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

interface Chip {
  email: string;
  role: AuthFlowInviteRole;
}

export function AuthFlowTeamInvite({
  workspace = "Atlas Robotics",
  inviter = "Jordan Reyes",
  email = "sam.okafor@atlasrobotics.com",
  role = "Editor",
  domain = "atlasrobotics.com",
  members = [{ name: "Jordan Reyes" }, { name: "Priya Nair" }, { name: "Leo Brandt" }, { name: "Ana Souza" }, { name: "Kenji Ito" }, { name: "Mara Voss" }],
  suggestions = ["lena.fischer@atlasrobotics.com", "omar.haddad@atlasrobotics.com", "chloe.martin@atlasrobotics.com"],
  seats = 12,
  defaultStep = 0,
  defaultInvites = [],
  onJoin,
  onInvite,
  headingAs = "h2",
  accent = "#34d399",
  className = "",
  style,
  ...rest
}: AuthFlowTeamInviteProps) {
  const Heading = headingAs;
  const uid = React.useId();
  const draftRef = React.useRef<HTMLInputElement>(null);
  const [step, setStep] = React.useState(Math.max(0, Math.min(2, defaultStep)));
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [chips, setChips] = React.useState<Chip[]>(() => defaultInvites.map((e) => ({ email: e.toLowerCase(), role: e.toLowerCase().endsWith(`@${domain}`) ? "Member" : "Guest" })));
  const [draft, setDraft] = React.useState("");
  const [flying, setFlying] = React.useState(false);
  const [joined, setJoined] = React.useState<string[]>([]);

  const used = members.length + 1;
  const good = chips.filter((c) => valid(c.email));
  const free = Math.max(0, seats - used);
  const over = Math.max(0, good.length - free);

  const join = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Add your full name so teammates recognise you.");
    if (password.length < 10) return setError("Use at least 10 characters for your password.");
    setError("");
    setBusy(true);
    wait(onJoin?.({ name: name.trim(), password }), 800).then(
      () => {
        setBusy(false);
        setStep(1);
      },
      (err: unknown) => {
        setBusy(false);
        setError(err instanceof Error ? err.message : "We couldn't create your account.");
      },
    );
  };

  const add = (raw: string) => {
    const list = raw.split(/[\s,;]+/).map((s) => s.trim().toLowerCase()).filter(Boolean);
    if (!list.length) return;
    setChips((cs) => {
      const next = [...cs];
      for (const e of list) if (!next.some((c) => c.email === e) && e !== email) next.push({ email: e, role: e.endsWith(`@${domain}`) ? "Member" : "Guest" });
      return next;
    });
    setDraft("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      if (draft.trim()) {
        e.preventDefault();
        add(draft);
      }
    } else if (e.key === "Backspace" && !draft && chips.length) {
      setChips((cs) => cs.slice(0, -1));
    }
  };

  const cycle = (i: number) => setChips((cs) => cs.map((c, j) => (j === i ? { ...c, role: roles[(roles.indexOf(c.role) + 1) % roles.length] } : c)));

  const send = () => {
    if (!good.length || over > 0 || busy) return;
    setBusy(true);
    const payload = good.map((c) => ({ email: c.email, role: c.role }));
    wait(onInvite?.(payload), 500).then(
      () => {
        setFlying(true);
        window.setTimeout(() => {
          setJoined(payload.map((p) => p.email));
          setBusy(false);
          setFlying(false);
          setChips([]);
          setStep(2);
        }, 650 + payload.length * 70);
      },
      (err: unknown) => {
        setBusy(false);
        setError(err instanceof Error ? err.message : "Invites couldn't be sent.");
      },
    );
  };

  const shown = members.slice(0, 4);
  const extra = members.length - shown.length;
  const vars = { "--hb-vg7-accent": accent, ...style } as React.CSSProperties;
  const check = (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 6.5l2.2 2.2L9.5 3.8" />
    </svg>
  );

  return (
    <section className={`hb-vg7 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-auth-flow-team-invite" precedence="default">{css}</style>
      <div className="hb-vg7-col">
        <div className="hb-vg7-ticket">
          <span className="hb-vg7-logo" aria-hidden="true">{workspace[0]}</span>
          <div className="hb-vg7-tx">
            <p>
              <b>{inviter}</b> invited you to join
            </p>
            <strong>{workspace}</strong>
          </div>
          <div className="hb-vg7-stack" aria-label={`${members.length + joined.length} members`}>
            {shown.map((m) => (
              <span key={m.name} className="hb-vg7-av" style={{ "--c": m.color ?? colorOf(m.name) } as React.CSSProperties} title={m.name}>
                {initialsOf(m.name)}
              </span>
            ))}
            {extra > 0 ? <span className="hb-vg7-av hb-vg7-more">+{extra}</span> : null}
            {joined.map((e, i) => (
              <span key={e} className="hb-vg7-av" data-new="true" style={{ "--c": colorOf(e), "--d": i } as React.CSSProperties} title={e}>
                {initialsOf(e)}
              </span>
            ))}
          </div>
        </div>
        <div className="hb-vg7-card">
          {step === 0 ? (
            <form className="hb-vg7-pane" onSubmit={join} noValidate key="join">
              <Heading id={`${uid}-t`} className="hb-vg7-title">Create your account</Heading>
              <p className="hb-vg7-sub">One step and you&apos;re in. The invite already confirmed your email.</p>
              <div className="hb-vg7-fields">
                <div>
                  <span className="hb-vg7-label">Work email</span>
                  <div className="hb-vg7-locked">
                    <span>{email}</span>
                    <span>{check} Verified by invite</span>
                  </div>
                </div>
                <div className="hb-vg7-row">
                  <div>
                    <label className="hb-vg7-label" htmlFor={`${uid}-n`}>Full name</label>
                    <input id={`${uid}-n`} className="hb-vg7-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sam Okafor" autoComplete="name" />
                  </div>
                  <div>
                    <label className="hb-vg7-label" htmlFor={`${uid}-p`}>Password</label>
                    <input id={`${uid}-p`} className="hb-vg7-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="10+ characters" autoComplete="new-password" />
                  </div>
                </div>
              </div>
              <div className="hb-vg7-role">
                You&apos;ll join as <b>{role}</b> · invite expires in 6 days
              </div>
              <button type="submit" className="hb-vg7-btn" disabled={busy} aria-busy={busy || undefined}>
                {busy ? "Joining" : `Join ${workspace}`}
              </button>
              <div className="hb-vg7-err" role="alert">{error}</div>
            </form>
          ) : step === 1 ? (
            <div className="hb-vg7-pane" key="invite">
              <Heading id={`${uid}-t`} className="hb-vg7-title">Bring your teammates</Heading>
              <p className="hb-vg7-sub">Paste a list or type emails. People outside {domain} join as guests.</p>
              <div className="hb-vg7-box" onClick={() => draftRef.current?.focus()}>
                {chips.map((c, i) => {
                  const ok = valid(c.email);
                  const external = ok && !c.email.endsWith(`@${domain}`);
                  return (
                    <span
                      key={c.email}
                      className="hb-vg7-chip"
                      data-bad={!ok}
                      data-flying={flying && ok}
                      style={{ "--c": colorOf(c.email), "--d": i, "--fx": `${(seedOf(c.email) % 120) - 60}px` } as React.CSSProperties}
                    >
                      <span className="hb-vg7-dot" aria-hidden="true">{ok ? initialsOf(c.email) : "!"}</span>
                      <span className="hb-vg7-mail">{c.email}</span>
                      {external ? <span className="hb-vg7-ext">External</span> : null}
                      {ok ? (
                        <button type="button" className="hb-vg7-rbtn" onClick={() => cycle(i)} aria-label={`Role for ${c.email}: ${c.role}. Change role`}>
                          {c.role}
                        </button>
                      ) : null}
                      <button type="button" className="hb-vg7-x" onClick={() => setChips((cs) => cs.filter((_, j) => j !== i))} aria-label={`Remove ${c.email}`}>
                        <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                          <path d="M2 2l6 6M8 2L2 8" />
                        </svg>
                      </button>
                    </span>
                  );
                })}
                <input
                  ref={draftRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onKey}
                  onPaste={(e) => {
                    const text = e.clipboardData.getData("text");
                    if (/[\s,;]/.test(text.trim())) {
                      e.preventDefault();
                      add(text);
                    }
                  }}
                  onBlur={() => draft.trim() && add(draft)}
                  placeholder={chips.length ? "Add more" : `name@${domain}`}
                  aria-label="Teammate emails"
                  aria-describedby={`${uid}-h`}
                />
              </div>
              <div id={`${uid}-h`} className="hb-vg7-hint">
                Press Enter or comma to add. Click a role to change it.
                {chips.some((c) => !valid(c.email)) ? " Fix or remove the red entries." : ""}
              </div>
              <div className="hb-vg7-seats">
                <div>
                  <span>Seats on your plan</span>
                  <span>
                    <b>{used + good.length}</b> of {seats}
                    {over ? <span style={{ color: "#fca5a5" }}> · {over} over limit</span> : null}
                  </span>
                </div>
                <div className="hb-vg7-meter" style={{ "--n": seats } as React.CSSProperties} aria-hidden="true">
                  {Array.from({ length: seats }, (_, i) => (
                    <span key={i} style={{ "--d": i } as React.CSSProperties} data-s={i < used ? "used" : i < used + good.length ? (over ? "over" : "new") : "free"} />
                  ))}
                </div>
              </div>
              {suggestions.filter((s) => !chips.some((c) => c.email === s)).length ? (
                <div className="hb-vg7-sug">
                  <h4>From {domain}</h4>
                  <ul>
                    {suggestions
                      .filter((s) => !chips.some((c) => c.email === s))
                      .map((s) => (
                        <li key={s}>
                          <span className="hb-vg7-dot" style={{ "--c": colorOf(s) } as React.CSSProperties} aria-hidden="true">{initialsOf(s)}</span>
                          <span>{s}</span>
                          <button type="button" onClick={() => add(s)} aria-label={`Add ${s}`}>Add</button>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : null}
              <div className="hb-vg7-actions">
                <button type="button" className="hb-vg7-skip" onClick={() => setStep(2)}>Skip for now</button>
                <button type="button" className="hb-vg7-btn" onClick={send} disabled={!good.length || over > 0 || busy} aria-busy={busy || undefined}>
                  {busy ? "Sending" : good.length ? `Send ${good.length} ${good.length === 1 ? "invite" : "invites"}` : "Send invites"}
                </button>
              </div>
              <div className="hb-vg7-err" role="alert">{error}</div>
            </div>
          ) : (
            <div className="hb-vg7-pane hb-vg7-done" key="done" role="status">
              <Heading id={`${uid}-t`} className="hb-vg7-title">You&apos;re in, {name.trim().split(/\s+/)[0] || "welcome"}</Heading>
              <p className="hb-vg7-sub">
                {joined.length ? `${joined.length} ${joined.length === 1 ? "invite is" : "invites are"} on the way. We'll let you know when they join ${workspace}.` : `${workspace} is ready. You can invite people any time from Settings.`}
              </p>
              <a href="#workspace">Open {workspace}</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
