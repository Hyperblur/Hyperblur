"use client";

import * as React from "react";

export interface LoginOnboardingProfileValues {
  avatar: number;
  name: string;
  role: string;
  interests: string[];
}

export interface LoginOnboardingProfileProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  workspace?: string;
  title?: string;
  avatars?: [string, string][];
  roles?: string[];
  interests?: string[];
  minInterests?: number;
  defaultValues?: Partial<LoginOnboardingProfileValues>;
  defaultStep?: 0 | 1 | 2;
  onStepChange?: (step: number) => void;
  onSubmit?: (values: LoginOnboardingProfileValues) => boolean | void | Promise<boolean | void>;
  finishCta?: { label: string; href: string };
  accent?: string;
}

const css = `
.hb-qha {
  --hb-qha-accent: #ec4899;
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
.hb-qha *, .hb-qha *::before, .hb-qha *::after { box-sizing: border-box; }
.hb-qha::before { content: ""; position: absolute; inset: 0 0 auto; height: 420px; pointer-events: none; background: radial-gradient(ellipse 40% 70% at 25% 0%, color-mix(in srgb, var(--hb-qha-accent) 20%, transparent), transparent 70%), radial-gradient(ellipse 40% 70% at 80% 0%, rgba(99,102,241,.16), transparent 70%); }
.hb-qha-inner { position: relative; max-width: 1040px; margin: 0 auto; }
.hb-qha-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-bottom: 26px; }
.hb-qha-kicker { font-size: 13px; color: #8f8f8f; }
.hb-qha-title { margin: 6px 0 0; font-size: clamp(26px, 3.8cqw, 38px); letter-spacing: -.03em; line-height: 1.1; font-weight: 600; }
.hb-qha-count { font-size: 13px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-qha-prog { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 28px; list-style: none; padding: 0; }
.hb-qha-prog li { display: grid; gap: 8px; font-size: 12.5px; color: #6f6f6f; transition: color .3s; }
.hb-qha-prog li[data-state="current"], .hb-qha-prog li[data-state="done"] { color: #ededed; }
.hb-qha-track { height: 4px; border-radius: 4px; background: #1f1f1f; overflow: hidden; }
.hb-qha-track i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--hb-qha-accent), color-mix(in srgb, var(--hb-qha-accent) 50%, #a78bfa)); transform-origin: left; transform: scaleX(0); transition: transform .6s cubic-bezier(.2,.7,.2,1); }
.hb-qha-prog li[data-state="done"] .hb-qha-track i { transform: scaleX(1); }
.hb-qha-prog li[data-state="current"] .hb-qha-track i { transform: scaleX(.5); }
.hb-qha-grid { display: grid; gap: 20px; }
.hb-qha-preview { position: relative; border-radius: 22px; border: 1px solid rgba(255,255,255,.08); background: linear-gradient(180deg, #131313, #0f0f0f); padding: 22px; overflow: hidden; box-shadow: inset 0 1px 0 rgba(255,255,255,.05); }
.hb-qha-cover { position: absolute; inset: 0 0 auto; height: 92px; background: linear-gradient(120deg, var(--hb-qha-c1), var(--hb-qha-c2)); opacity: .45; transition: background .5s; mask: linear-gradient(#000, transparent); }
.hb-qha-pav { position: relative; width: 76px; height: 76px; border-radius: 50%; display: grid; place-items: center; margin-top: 26px; font-size: 26px; font-weight: 600; color: #fff; background: linear-gradient(140deg, var(--hb-qha-c1), var(--hb-qha-c2)); border: 4px solid #111; box-shadow: 0 10px 30px -10px var(--hb-qha-c1); transition: background .5s, box-shadow .5s; }
.hb-qha-pname { margin: 14px 0 2px; font-size: 20px; font-weight: 600; letter-spacing: -.01em; min-height: 26px; }
.hb-qha-pname[data-empty="true"] { color: #555; }
.hb-qha-prole { margin: 0; font-size: 13.5px; color: #8f8f8f; min-height: 20px; }
.hb-qha-ptags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; min-height: 26px; }
.hb-qha-ptag { height: 26px; padding: 0 10px; border-radius: 999px; display: inline-flex; align-items: center; font-size: 12px; background: #1a1a1a; border: 1px solid #2a2a2a; color: #d4d4d4; animation: hb-qha-pop .35s cubic-bezier(.3,1.5,.5,1) both; }
.hb-qha-pmeta { display: flex; gap: 16px; margin-top: 18px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.06); font-size: 12.5px; color: #6f6f6f; }
.hb-qha-pmeta b { display: block; color: #ededed; font-weight: 500; font-size: 13px; }
.hb-qha-panel { border-radius: 22px; border: 1px solid rgba(255,255,255,.08); background: #111; padding: clamp(20px, 3cqw, 30px); box-shadow: inset 0 1px 0 rgba(255,255,255,.05); min-width: 0; }
.hb-qha-pane { animation: hb-qha-slide .45s cubic-bezier(.2,.7,.2,1) both; border: 0; margin: 0; padding: 0; min-width: 0; }
.hb-qha-h { padding: 0; margin: 0 0 4px; font-size: 17px; font-weight: 600; }
.hb-qha-hint { margin: 0 0 18px; font-size: 13.5px; color: #8f8f8f; }
.hb-qha-avs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 22px; max-width: 320px; }
.hb-qha-av { position: relative; aspect-ratio: 1; border-radius: 50%; cursor: pointer; background: linear-gradient(140deg, var(--hb-qha-a1), var(--hb-qha-a2)); box-shadow: inset 0 1px 0 rgba(255,255,255,.3); transition: transform .3s cubic-bezier(.3,1.6,.5,1), box-shadow .25s; }
.hb-qha-av:hover { transform: scale(1.06); }
.hb-qha-av input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.hb-qha-av:has(input:checked) { box-shadow: 0 0 0 3px #111, 0 0 0 5px var(--hb-qha-accent); transform: scale(1.04); }
.hb-qha-av:has(input:focus-visible) { outline: 2px solid #fff; outline-offset: 4px; }
.hb-qha-label { display: block; margin-bottom: 6px; font-size: 13px; color: #a1a1a1; }
.hb-qha-input { width: 100%; height: 46px; padding: 0 14px; border-radius: 12px; border: 1px solid #262626; background: #0c0c0c; color: #ededed; font: inherit; font-size: 15px; outline: none; transition: border-color .2s, box-shadow .2s; }
.hb-qha-input:focus { border-color: var(--hb-qha-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-qha-accent) 22%, transparent); }
.hb-qha-input[aria-invalid="true"] { border-color: #f87171; }
.hb-qha-err { margin: 8px 0 0; font-size: 12.5px; color: #fca5a5; }
.hb-qha-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.hb-qha-chip { position: relative; display: inline-flex; align-items: center; gap: 7px; height: 38px; padding: 0 14px; border-radius: 999px; border: 1px solid #2a2a2a; background: #151515; color: #d4d4d4; font-size: 13.5px; cursor: pointer; user-select: none; transition: background .2s, border-color .2s, color .2s, transform .2s; }
.hb-qha-chip:hover { border-color: #3a3a3a; background: #191919; }
.hb-qha-chip input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.hb-qha-chip svg { width: 0; opacity: 0; transition: width .25s, opacity .25s; }
.hb-qha-chip:has(input:checked) { border-color: color-mix(in srgb, var(--hb-qha-accent) 60%, transparent); background: color-mix(in srgb, var(--hb-qha-accent) 14%, #151515); color: #fff; }
.hb-qha-chip:has(input:checked) svg { width: 12px; opacity: 1; }
.hb-qha-chip:has(input:focus-visible) { outline: 2px solid var(--hb-qha-accent); outline-offset: 2px; }
.hb-qha-chip:active { transform: scale(.96); }
.hb-qha-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 26px; }
.hb-qha-back { height: 44px; padding: 0 14px; border: 0; border-radius: 12px; background: transparent; color: #a1a1a1; font: inherit; font-size: 14px; cursor: pointer; }
.hb-qha-back:hover:not(:disabled) { color: #ededed; background: #171717; }
.hb-qha-back:disabled { opacity: 0; pointer-events: none; }
.hb-qha-next { height: 44px; padding: 0 22px; border: 0; border-radius: 12px; display: inline-flex; align-items: center; gap: 8px; background: #ededed; color: #0a0a0a; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .2s, transform .2s; }
.hb-qha-next:hover { background: #fff; }
.hb-qha-next:disabled { cursor: progress; }
.hb-qha-next[data-final="true"] { background: var(--hb-qha-accent); color: #fff; }
.hb-qha-next:focus-visible, .hb-qha-back:focus-visible, .hb-qha-cta:focus-visible { outline: 2px solid var(--hb-qha-accent); outline-offset: 2px; }
.hb-qha-spin { width: 15px; height: 15px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: hb-qha-turn .7s linear infinite; }
.hb-qha-done { position: relative; display: grid; justify-items: center; text-align: center; gap: 10px; padding: 36px 10px 20px; }
.hb-qha-burst { position: absolute; left: 50%; top: 74px; width: 0; height: 0; }
.hb-qha-bit { position: absolute; left: 0; top: 0; width: 8px; height: 8px; border-radius: 2px; background: var(--hb-qha-bc); opacity: 0; animation: hb-qha-fly 1.1s cubic-bezier(.15,.7,.3,1) var(--hb-qha-bd) forwards; }
.hb-qha-check { width: 76px; height: 76px; border-radius: 50%; display: grid; place-items: center; background: var(--hb-qha-accent); box-shadow: 0 0 0 10px color-mix(in srgb, var(--hb-qha-accent) 15%, transparent); animation: hb-qha-pop .6s cubic-bezier(.3,1.6,.5,1) both; }
.hb-qha-check path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-qha-draw .45s .35s ease forwards; }
.hb-qha-done h3 { margin: 12px 0 0; font-size: 22px; letter-spacing: -.02em; }
.hb-qha-done p { margin: 0; max-width: 340px; font-size: 14px; color: #8f8f8f; line-height: 1.6; }
.hb-qha-cta { margin-top: 10px; height: 44px; padding: 0 20px; border-radius: 12px; display: inline-flex; align-items: center; background: #ededed; color: #0a0a0a; font-size: 14px; font-weight: 600; text-decoration: none; }
@container (min-width: 780px) {
  .hb-qha-grid { grid-template-columns: 320px 1fr; gap: 24px; align-items: start; }
}
@keyframes hb-qha-slide { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }
@keyframes hb-qha-pop { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: none; } }
@keyframes hb-qha-turn { to { transform: rotate(360deg); } }
@keyframes hb-qha-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-qha-fly { 0% { opacity: 1; transform: translate(0, 0) rotate(0); } 100% { opacity: 0; transform: translate(var(--hb-qha-bx), var(--hb-qha-by)) rotate(var(--hb-qha-br)); } }
@media (prefers-reduced-motion: reduce) {
  .hb-qha *, .hb-qha *::before, .hb-qha *::after { animation: none !important; transition: none !important; }
  .hb-qha-check path { stroke-dashoffset: 0; }
  .hb-qha-bit { display: none; }
}
`;

const defaultAvatars: [string, string][] = [
  ["#ec4899", "#8b5cf6"],
  ["#f97316", "#facc15"],
  ["#06b6d4", "#3b82f6"],
  ["#22c55e", "#14b8a6"],
  ["#6366f1", "#0ea5e9"],
  ["#f43f5e", "#fb923c"],
  ["#a3e635", "#22d3ee"],
  ["#64748b", "#0f172a"],
];

const defaultRoles = ["Designer", "Engineer", "Product manager", "Founder", "Marketing", "Data & analytics", "Student", "Something else"];
const defaultInterests = ["Design systems", "Prototyping", "Analytics", "Automation", "Accessibility", "Motion", "User research", "Growth", "APIs", "Mobile", "Writing", "Hiring"];
const steps = ["Profile", "Role", "Interests"];

function hash(n: number) {
  let x = (n + 7) * 2654435761;
  x = (x ^ (x >>> 15)) >>> 0;
  x = Math.imul(x, 2246822519) >>> 0;
  return ((x ^ (x >>> 13)) >>> 0) / 4294967295;
}

const bits = Array.from({ length: 26 }, (_, i) => {
  const angle = (i / 26) * Math.PI * 2 + hash(i) * 0.4;
  const dist = 90 + hash(i + 30) * 110;
  return {
    x: (Math.cos(angle) * dist).toFixed(1),
    y: (Math.sin(angle) * dist * 0.75 - 20).toFixed(1),
    r: Math.round(hash(i + 60) * 540 - 270),
    d: (hash(i + 90) * 0.15 + 0.2).toFixed(2),
    c: ["var(--hb-qha-accent)", "#a78bfa", "#facc15", "#22d3ee", "#ededed"][i % 5],
  };
});

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise<unknown>((resolve) => setTimeout(() => resolve(result), 900));
}

function Tick() {
  return <svg viewBox="0 0 12 12" height="12" aria-hidden="true"><path d="m2.5 6.2 2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function LoginOnboardingProfile({
  workspace = "Northwind",
  title = "Set up your profile",
  avatars = defaultAvatars,
  roles = defaultRoles,
  interests = defaultInterests,
  minInterests = 3,
  defaultValues,
  defaultStep = 0,
  onStepChange,
  onSubmit,
  finishCta = { label: "Go to your workspace", href: "#workspace" },
  accent = "#ec4899",
  className = "",
  style,
  ...rest
}: LoginOnboardingProfileProps) {
  const uid = React.useId();
  const [step, setStep] = React.useState<number>(defaultStep);
  const [avatar, setAvatar] = React.useState(defaultValues?.avatar ?? 0);
  const [name, setName] = React.useState(defaultValues?.name ?? "");
  const [role, setRole] = React.useState(defaultValues?.role ?? "");
  const [picked, setPicked] = React.useState<string[]>(defaultValues?.interests ?? []);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");
  const nameRef = React.useRef<HTMLInputElement>(null);

  const colors = avatars[avatar] ?? avatars[0] ?? ["#ec4899", "#8b5cf6"];

  function go(next: number) {
    setError("");
    setStep(next);
    onStepChange?.(next);
  }

  function toggle(interest: string) {
    setPicked((list) => (list.includes(interest) ? list.filter((i) => i !== interest) : [...list, interest]));
    if (error) setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    if (step === 0) {
      if (name.trim().length < 2) {
        setError("Add the name your teammates will see.");
        nameRef.current?.focus();
        return;
      }
      return go(1);
    }
    if (step === 1) {
      if (!role) return setError("Pick the role closest to what you do.");
      return go(2);
    }
    if (picked.length < minInterests) return setError(`Choose at least ${minInterests} so we can tailor your home.`);
    setStatus("loading");
    try {
      const result = await wait(onSubmit ? onSubmit({ avatar, name: name.trim(), role, interests: picked }) : true);
      if (result === false) {
        setStatus("idle");
        setError("We couldn't save your profile. Try again.");
      } else {
        setStatus("done");
      }
    } catch {
      setStatus("idle");
      setError("We couldn't save your profile. Try again.");
    }
  }

  const first = name.trim().split(/\s+/)[0] ?? "";
  const done = status === "done";
  const progressState = (i: number) => (done || step > i ? "done" : step === i ? "current" : "todo");

  return (
    <section className={`hb-qha ${className}`} style={{ "--hb-qha-accent": accent, "--hb-qha-c1": colors[0], "--hb-qha-c2": colors[1], ...style } as React.CSSProperties} {...rest}>
      <style href="hb-login-onboarding-profile" precedence="default">{css}</style>
      <div className="hb-qha-inner">
        <div className="hb-qha-top">
          <div>
            <span className="hb-qha-kicker">Welcome to {workspace}</span>
            <h2 className="hb-qha-title">{done ? `You're all set${first ? `, ${first}` : ""}` : title}</h2>
          </div>
          <span className="hb-qha-count" aria-live="polite">{done ? "Complete" : `Step ${step + 1} of ${steps.length}`}</span>
        </div>
        <ol className="hb-qha-prog" aria-label="Setup progress">
          {steps.map((s, i) => (
            <li key={s} data-state={progressState(i)} aria-current={!done && step === i ? "step" : undefined}>
              <span className="hb-qha-track"><i /></span>
              {s}
            </li>
          ))}
        </ol>
        <div className="hb-qha-grid">
          <aside className="hb-qha-preview" aria-label="Profile preview">
            <span className="hb-qha-cover" aria-hidden="true" />
            <span className="hb-qha-pav" aria-hidden="true">{initials(name)}</span>
            <p className="hb-qha-pname" data-empty={!name.trim()}>{name.trim() || "Your name"}</p>
            <p className="hb-qha-prole">{role ? `${role} at ${workspace}` : `Member of ${workspace}`}</p>
            <div className="hb-qha-ptags">
              {picked.slice(0, 6).map((t) => <span key={t} className="hb-qha-ptag">{t}</span>)}
              {picked.length > 6 && <span className="hb-qha-ptag">+{picked.length - 6}</span>}
            </div>
            <div className="hb-qha-pmeta">
              <span><b>Local time</b>Lisbon, GMT+0</span>
              <span><b>Teams</b>Design, Growth</span>
            </div>
          </aside>
          <div className="hb-qha-panel">
            {done ? (
              <div className="hb-qha-done" role="status">
                <span className="hb-qha-burst" aria-hidden="true">
                  {bits.map((b, i) => (
                    <i key={i} className="hb-qha-bit" style={{ "--hb-qha-bx": `${b.x}px`, "--hb-qha-by": `${b.y}px`, "--hb-qha-br": `${b.r}deg`, "--hb-qha-bd": `${b.d}s`, "--hb-qha-bc": b.c } as React.CSSProperties} />
                  ))}
                </span>
                <span className="hb-qha-check">
                  <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12.5 4 4 8-9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <h3>Profile saved</h3>
                <p>We picked {picked.length} spaces and 4 teammates to follow based on your interests. You can change them in settings.</p>
                <a className="hb-qha-cta" href={finishCta.href}>{finishCta.label}</a>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit}>
                {step === 0 && (
                  <fieldset className="hb-qha-pane" key="s0">
                    <legend className="hb-qha-h">Pick an avatar</legend>
                    <p className="hb-qha-hint">You can upload a photo later from settings.</p>
                    <div className="hb-qha-avs" role="radiogroup" aria-label="Avatar color">
                      {avatars.map(([a1, a2], i) => (
                        <label key={i} className="hb-qha-av" style={{ "--hb-qha-a1": a1, "--hb-qha-a2": a2 } as React.CSSProperties}>
                          <input type="radio" name={`${uid}-av`} checked={avatar === i} onChange={() => setAvatar(i)} aria-label={`Avatar ${i + 1}`} />
                        </label>
                      ))}
                    </div>
                    <label className="hb-qha-label" htmlFor={`${uid}-n`}>Full name</label>
                    <input ref={nameRef} id={`${uid}-n`} className="hb-qha-input" autoComplete="name" placeholder="Mara Okafor" value={name} aria-invalid={error ? true : undefined} aria-describedby={error ? `${uid}-err` : undefined} onChange={(e) => { setName(e.target.value); if (error) setError(""); }} />
                  </fieldset>
                )}
                {step === 1 && (
                  <fieldset className="hb-qha-pane" key="s1" aria-invalid={error ? true : undefined} aria-describedby={error ? `${uid}-err` : undefined}>
                    <legend className="hb-qha-h">What do you do?</legend>
                    <p className="hb-qha-hint">We use this to set up your default views.</p>
                    <div className="hb-qha-chips">
                      {roles.map((r) => (
                        <label key={r} className="hb-qha-chip">
                          <input type="radio" name={`${uid}-role`} checked={role === r} onChange={() => { setRole(r); setError(""); }} />
                          <Tick />
                          {r}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}
                {step === 2 && (
                  <fieldset className="hb-qha-pane" key="s2" aria-invalid={error ? true : undefined} aria-describedby={error ? `${uid}-err` : undefined}>
                    <legend className="hb-qha-h">What are you into?</legend>
                    <p className="hb-qha-hint">Choose {minInterests} or more. {picked.length} selected.</p>
                    <div className="hb-qha-chips">
                      {interests.map((t) => (
                        <label key={t} className="hb-qha-chip">
                          <input type="checkbox" checked={picked.includes(t)} onChange={() => toggle(t)} />
                          <Tick />
                          {t}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}
                {error && <p className="hb-qha-err" id={`${uid}-err`} role="alert">{error}</p>}
                <div className="hb-qha-bar">
                  <button type="button" className="hb-qha-back" disabled={step === 0} onClick={() => go(step - 1)}>Back</button>
                  <button type="submit" className="hb-qha-next" data-final={step === 2} disabled={status === "loading"} aria-busy={status === "loading"}>
                    {status === "loading" && <span className="hb-qha-spin" aria-hidden="true" />}
                    {step === 2 ? (status === "loading" ? "Saving" : "Finish setup") : "Continue"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
