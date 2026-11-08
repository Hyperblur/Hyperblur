"use client";

import * as React from "react";

export interface FormWizardValues {
  workspace: string;
  slug: string;
  size: string;
  teams: string[];
  invites: string[];
}

export interface FormWizardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  domain?: string;
  sizes?: string[];
  teams?: string[];
  maxInvites?: number;
  accent?: string;
  defaultStep?: number;
  defaultValues?: Partial<FormWizardValues>;
  onStepChange?: (step: number) => void;
  onSubmit?: (values: FormWizardValues) => void | Promise<void>;
}

const steps = ["Workspace", "Team", "Invite", "Review"];

const css = `
.hb-xh3 {
  --hb-xh3-a: #14b8a6;
  box-sizing: border-box;
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  font-family: inherit;
  color: #ededed;
}
.hb-xh3 *, .hb-xh3 *::before, .hb-xh3 *::after { box-sizing: border-box; }
.hb-xh3-card {
  overflow: hidden;
  border: 1px solid #262626;
  border-radius: 18px;
  background: #101010;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 28px 56px -28px rgba(0,0,0,0.85);
}
.hb-xh3-top { padding: 18px 20px 16px; border-bottom: 1px solid #1f1f1f; background: linear-gradient(180deg, #141414, #101010); }
.hb-xh3-meta { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 12px; }
.hb-xh3-step { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--hb-xh3-a); }
.hb-xh3-pct { font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-xh3-rail { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.hb-xh3-seg { display: grid; gap: 7px; padding: 0; border: 0; background: none; text-align: left; color: #6b6b6b; font: inherit; font-size: 11.5px; cursor: default; }
.hb-xh3-seg[data-reach="true"] { cursor: pointer; color: #a1a1a1; }
.hb-xh3-seg[aria-current="step"] { color: #ededed; }
.hb-xh3-seg:focus-visible { outline: 2px solid var(--hb-xh3-a); outline-offset: 3px; border-radius: 4px; }
.hb-xh3-track { position: relative; height: 4px; border-radius: 4px; background: #222; overflow: hidden; }
.hb-xh3-track i { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-xh3-a) 70%, #000), var(--hb-xh3-a)); transform-origin: left; transform: scaleX(var(--hb-xh3-f, 0)); transition: transform 0.55s cubic-bezier(0.65, 0, 0.35, 1); box-shadow: 0 0 12px var(--hb-xh3-a); }
.hb-xh3-body { position: relative; min-height: 232px; padding: 20px; }
.hb-xh3-pane { display: grid; gap: 14px; animation: hb-xh3-next 0.42s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh3-pane[data-dir="back"] { animation-name: hb-xh3-back; }
.hb-xh3-h { margin: 0; font-size: 17px; font-weight: 600; letter-spacing: -0.02em; }
.hb-xh3-p { margin: -8px 0 0; font-size: 13px; color: #8f8f8f; line-height: 1.45; }
.hb-xh3-field { display: grid; gap: 6px; }
.hb-xh3-label { font-size: 12px; font-weight: 500; color: #b0b0b0; }
.hb-xh3-box { display: flex; align-items: center; min-height: 40px; border: 1px solid #272727; border-radius: 10px; background: #0b0b0b; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.hb-xh3-box:focus-within { border-color: var(--hb-xh3-a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xh3-a) 20%, transparent); }
.hb-xh3-box[data-bad="true"] { border-color: #f05260; box-shadow: 0 0 0 3px rgba(240,82,96,0.12); }
.hb-xh3-pre { padding-left: 12px; font-size: 13.5px; color: #5c5c5c; white-space: nowrap; }
.hb-xh3-in { flex: 1; min-width: 80px; height: 38px; padding: 0 12px; border: 0; outline: 0; background: transparent; color: #ededed; font: inherit; font-size: 14px; }
.hb-xh3-pre + .hb-xh3-in { padding-left: 1px; }
.hb-xh3-in::placeholder { color: #555; }
.hb-xh3-err { margin: 0; font-size: 12px; color: #ff8a95; animation: hb-xh3-fade 0.2s ease-out; }
.hb-xh3-help { margin: 0; font-size: 12px; color: #737373; }
.hb-xh3-sizes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.hb-xh3-size { position: relative; display: grid; gap: 2px; justify-items: center; padding: 12px 4px 10px; border: 1px solid #262626; border-radius: 12px; background: #0d0d0d; color: #bdbdbd; font: inherit; cursor: pointer; transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh3-size:hover { border-color: #363636; }
.hb-xh3-size:active { transform: scale(0.97); }
.hb-xh3-size[aria-checked="true"] { border-color: var(--hb-xh3-a); background: color-mix(in srgb, var(--hb-xh3-a) 9%, #0d0d0d); color: #fff; }
.hb-xh3-size:focus-visible { outline: 2px solid var(--hb-xh3-a); outline-offset: 2px; }
.hb-xh3-size b { font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-xh3-size small { font-size: 10.5px; color: #7a7a7a; }
.hb-xh3-heads { display: flex; gap: 2px; height: 14px; align-items: flex-end; margin-bottom: 4px; }
.hb-xh3-heads i { width: 5px; border-radius: 3px 3px 1px 1px; background: currentColor; opacity: 0.55; }
.hb-xh3-size[aria-checked="true"] .hb-xh3-heads i { background: var(--hb-xh3-a); opacity: 1; }
.hb-xh3-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-xh3-chip { display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 11px; border: 1px solid #2a2a2a; border-radius: 999px; background: #121212; color: #b9b9b9; font: inherit; font-size: 12.5px; cursor: pointer; transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh3-chip:hover { border-color: #3a3a3a; color: #e5e5e5; }
.hb-xh3-chip[aria-pressed="true"] { border-color: color-mix(in srgb, var(--hb-xh3-a) 60%, #2a2a2a); background: color-mix(in srgb, var(--hb-xh3-a) 14%, #121212); color: #fff; }
.hb-xh3-chip:focus-visible { outline: 2px solid var(--hb-xh3-a); outline-offset: 2px; }
.hb-xh3-chip svg { width: 12px; height: 12px; }
.hb-xh3-tagbox { flex-wrap: wrap; gap: 6px; padding: 6px; }
.hb-xh3-tag { display: inline-flex; align-items: center; gap: 4px; height: 26px; padding: 0 4px 0 9px; border-radius: 7px; background: #1b1b1b; border: 1px solid #2c2c2c; font-size: 12.5px; color: #e0e0e0; animation: hb-xh3-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh3-tag[data-bad="true"] { border-color: rgba(240,82,96,0.5); background: rgba(240,82,96,0.08); color: #ffa1a9; }
.hb-xh3-tag button { display: grid; place-items: center; width: 18px; height: 18px; border: 0; border-radius: 5px; background: transparent; color: inherit; opacity: 0.6; cursor: pointer; }
.hb-xh3-tag button:hover { opacity: 1; background: rgba(255,255,255,0.08); }
.hb-xh3-tag button:focus-visible { outline: 2px solid var(--hb-xh3-a); opacity: 1; }
.hb-xh3-tagbox .hb-xh3-in { height: 26px; padding: 0 6px; }
.hb-xh3-review { display: grid; margin: 0; border: 1px solid #222; border-radius: 12px; overflow: hidden; }
.hb-xh3-review div { display: grid; grid-template-columns: 84px 1fr auto; align-items: center; gap: 10px; padding: 10px 12px; border-top: 1px solid #1e1e1e; font-size: 13px; }
.hb-xh3-review div:first-child { border-top: 0; }
.hb-xh3-review dt { color: #7d7d7d; font-size: 12px; }
.hb-xh3-review dd { margin: 0; color: #e8e8e8; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xh3-edit { padding: 2px 6px; border: 0; border-radius: 6px; background: none; color: var(--hb-xh3-a); font: inherit; font-size: 12px; cursor: pointer; }
.hb-xh3-edit:hover { background: color-mix(in srgb, var(--hb-xh3-a) 12%, transparent); }
.hb-xh3-edit:focus-visible { outline: 2px solid var(--hb-xh3-a); }
.hb-xh3-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 20px; border-top: 1px solid #1f1f1f; background: #0d0d0d; }
.hb-xh3-ghost { height: 36px; padding: 0 12px; border: 0; border-radius: 10px; background: transparent; color: #a1a1a1; font: inherit; font-size: 13px; cursor: pointer; transition: color 0.2s ease, background 0.2s ease; }
.hb-xh3-ghost:hover:not(:disabled) { color: #ededed; background: #181818; }
.hb-xh3-ghost:disabled { opacity: 0; pointer-events: none; }
.hb-xh3-ghost:focus-visible { outline: 2px solid var(--hb-xh3-a); }
.hb-xh3-right { display: flex; gap: 6px; align-items: center; }
.hb-xh3-next { display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px 0 16px; border: 0; border-radius: 10px; background: var(--hb-xh3-a); color: #04201d; font: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 16px -6px var(--hb-xh3-a); transition: transform 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), filter 0.2s ease; }
.hb-xh3-next:hover { filter: brightness(1.08); }
.hb-xh3-next:active { transform: scale(0.97); }
.hb-xh3-next:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xh3-next svg { width: 15px; height: 15px; transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh3-next:hover svg { transform: translateX(2px); }
.hb-xh3-launch { display: grid; gap: 16px; padding: 24px 20px 22px; animation: hb-xh3-fade 0.4s ease-out; }
.hb-xh3-launch h3 { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; }
.hb-xh3-launch > p { margin: -10px 0 0; font-size: 13px; color: #8f8f8f; }
.hb-xh3-tasks { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
.hb-xh3-task { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px; background: #141414; font-size: 13px; color: #6f6f6f; transition: color 0.3s ease, background 0.3s ease; }
.hb-xh3-task[data-s="run"] { color: #ededed; background: #181818; }
.hb-xh3-task[data-s="done"] { color: #cfcfcf; }
.hb-xh3-ico { position: relative; display: grid; place-items: center; width: 18px; height: 18px; flex: none; border-radius: 50%; border: 1.5px solid #333; }
.hb-xh3-task[data-s="run"] .hb-xh3-ico { border-color: #333; border-top-color: var(--hb-xh3-a); animation: hb-xh3-rot 0.8s linear infinite; }
.hb-xh3-task[data-s="done"] .hb-xh3-ico { border-color: var(--hb-xh3-a); background: var(--hb-xh3-a); animation: hb-xh3-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh3-ico svg { width: 10px; height: 10px; stroke: #04201d; }
.hb-xh3-open { justify-self: start; display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 16px; border-radius: 10px; background: #f5f5f5; color: #0a0a0a; font-size: 13.5px; font-weight: 600; text-decoration: none; animation: hb-xh3-fade 0.4s ease-out; }
.hb-xh3-open:hover { background: #fff; }
.hb-xh3-open:focus-visible { outline: 2px solid var(--hb-xh3-a); outline-offset: 2px; }
@keyframes hb-xh3-next { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh3-back { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh3-fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh3-pop { from { transform: scale(0.6); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes hb-xh3-rot { to { transform: rotate(360deg); } }
@container (max-width: 380px) { .hb-xh3-sizes { grid-template-columns: repeat(2, 1fr); } }
.hb-xh3 { container-type: inline-size; }
@media (prefers-reduced-motion: reduce) {
  .hb-xh3 *, .hb-xh3 *::before, .hb-xh3 *::after { animation: none !important; transition: none !important; }
}
`;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32);
}

function sizeBars(i: number) {
  return Array.from({ length: i + 1 }, (_, k) => 6 + ((k * 5 + i * 3) % 8));
}

export function FormWizard({
  domain = "app.tempo.so/",
  sizes = ["Just me", "2-10", "11-50", "51+"],
  teams = ["Design", "Engineering", "Product", "Marketing", "Ops"],
  maxInvites = 5,
  accent = "#14b8a6",
  defaultStep = 0,
  defaultValues,
  onStepChange,
  onSubmit,
  className,
  style,
  ...rest
}: FormWizardProps) {
  const uid = React.useId();
  const [step, setStep] = React.useState(Math.min(3, Math.max(0, defaultStep)));
  const [dir, setDir] = React.useState<"next" | "back">("next");
  const [v, setV] = React.useState<FormWizardValues>({
    workspace: defaultValues?.workspace ?? "",
    slug: defaultValues?.slug ?? slugify(defaultValues?.workspace ?? ""),
    size: defaultValues?.size ?? "",
    teams: defaultValues?.teams ?? [],
    invites: defaultValues?.invites ?? [],
  });
  const [slugEdited, setSlugEdited] = React.useState(Boolean(defaultValues?.slug));
  const [draft, setDraft] = React.useState("");
  const [tried, setTried] = React.useState<Record<number, boolean>>({});
  const [phase, setPhase] = React.useState(-1);
  const timers = React.useRef<number[]>([]);
  const first = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  const errs: Record<string, string> = {};
  if (v.workspace.trim().length < 2) errs.workspace = "Give your workspace a name.";
  if (v.slug.length < 3) errs.slug = "Use at least 3 characters.";
  if (!v.size) errs.size = "Pick the closest team size.";
  if (!v.teams.length) errs.teams = "Choose at least one team.";
  const badInvites = v.invites.filter((e) => !emailRe.test(e));
  if (badInvites.length) errs.invites = `${badInvites.length === 1 ? "One address looks" : `${badInvites.length} addresses look`} wrong.`;
  const stepKeys = [["workspace", "slug"], ["size", "teams"], ["invites"], []];
  const stepOk = (s: number) => stepKeys[s].every((k) => !errs[k]);
  const reach = (s: number) => Array.from({ length: s }, (_, i) => i).every(stepOk);

  const go = (to: number) => {
    setDir(to > step ? "next" : "back");
    setStep(to);
    onStepChange?.(to);
  };

  const launch = async () => {
    setPhase(0);
    const tasks = 3;
    for (let i = 1; i <= tasks; i++) {
      timers.current.push(window.setTimeout(() => setPhase(i), i * 700));
    }
    await Promise.resolve(onSubmit?.(v));
  };

  const next = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!stepOk(step)) {
      setTried((t) => ({ ...t, [step]: true }));
      return;
    }
    if (step === 3) {
      launch();
      return;
    }
    go(step + 1);
  };

  const addInvite = (raw: string) => {
    const parts = raw.split(/[\s,;]+/).map((s) => s.trim().toLowerCase()).filter(Boolean);
    if (!parts.length) return;
    setV((s) => ({ ...s, invites: [...s.invites, ...parts.filter((p) => !s.invites.includes(p))].slice(0, maxInvites) }));
    setDraft("");
  };

  const err = (k: string) => (tried[step] && errs[k] ? <p className="hb-xh3-err" role="alert">{errs[k]}</p> : null);
  const fraction = phase >= 0 ? 1 : step / steps.length;

  const check = (
    <svg viewBox="0 0 12 12" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2.5 6.2 2.3 2.3 4.7-5" /></svg>
  );

  if (phase >= 0) {
    const tasks = [`Creating ${v.workspace.trim()}`, v.invites.length ? `Inviting ${v.invites.length} teammate${v.invites.length > 1 ? "s" : ""}` : "Preparing your inbox", `Setting up ${v.teams.length} team space${v.teams.length > 1 ? "s" : ""}`];
    return (
      <div className={["hb-xh3", className].filter(Boolean).join(" ")} style={{ ...style, "--hb-xh3-a": accent } as React.CSSProperties} {...rest}>
        <style href="hb-form-wizard" precedence="default">{css}</style>
        <div className="hb-xh3-card">
          <div className="hb-xh3-launch" role="status" aria-live="polite">
            <h3>{phase >= 3 ? "Your workspace is ready" : "Setting things up"}</h3>
            <p>{domain}{v.slug}</p>
            <ul className="hb-xh3-tasks">
              {tasks.map((t, i) => (
                <li key={t} className="hb-xh3-task" data-s={phase > i ? "done" : phase === i ? "run" : "wait"}>
                  <span className="hb-xh3-ico">{phase > i ? check : null}</span>
                  {t}
                </li>
              ))}
            </ul>
            {phase >= 3 ? <a className="hb-xh3-open" href={`#${v.slug}`}>Open workspace</a> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={["hb-xh3", className].filter(Boolean).join(" ")} style={{ ...style, "--hb-xh3-a": accent } as React.CSSProperties} {...rest}>
      <style href="hb-form-wizard" precedence="default">{css}</style>
      <form className="hb-xh3-card" onSubmit={next} noValidate>
        <div className="hb-xh3-top">
          <div className="hb-xh3-meta">
            <span className="hb-xh3-step">Step {step + 1} of {steps.length}</span>
            <span className="hb-xh3-pct">{Math.round(fraction * 100)}% complete</span>
          </div>
          <div className="hb-xh3-rail">
            {steps.map((s, i) => {
              const f = i < step ? 1 : i === step ? 0.5 : 0;
              const ok = i !== step && reach(i);
              return (
                <button
                  key={s}
                  type="button"
                  className="hb-xh3-seg"
                  data-reach={ok}
                  aria-current={i === step ? "step" : undefined}
                  aria-disabled={!ok && i !== step}
                  onClick={() => ok && go(i)}
                >
                  <span className="hb-xh3-track"><i style={{ "--hb-xh3-f": f } as React.CSSProperties} /></span>
                  {s}
                </button>
              );
            })}
          </div>
        </div>
        <div className="hb-xh3-body">
          <div className="hb-xh3-pane" key={step} data-dir={dir}>
            {step === 0 ? (
              <>
                <h3 className="hb-xh3-h">Name your workspace</h3>
                <p className="hb-xh3-p">This is where your team plans, ships and reviews.</p>
                <div className="hb-xh3-field">
                  <label className="hb-xh3-label" htmlFor={`${uid}-ws`}>Workspace name</label>
                  <div className="hb-xh3-box" data-bad={Boolean(tried[0] && errs.workspace)}>
                    <input
                      ref={first}
                      id={`${uid}-ws`}
                      className="hb-xh3-in"
                      placeholder="Northwind Studio"
                      value={v.workspace}
                      autoComplete="organization"
                      onChange={(e) => {
                        const workspace = e.target.value.slice(0, 40);
                        setV((s) => ({ ...s, workspace, slug: slugEdited ? s.slug : slugify(workspace) }));
                      }}
                    />
                  </div>
                  {err("workspace")}
                </div>
                <div className="hb-xh3-field">
                  <label className="hb-xh3-label" htmlFor={`${uid}-slug`}>Workspace URL</label>
                  <div className="hb-xh3-box" data-bad={Boolean(tried[0] && errs.slug)}>
                    <span className="hb-xh3-pre" aria-hidden="true">{domain}</span>
                    <input
                      id={`${uid}-slug`}
                      className="hb-xh3-in"
                      placeholder="northwind"
                      value={v.slug}
                      onChange={(e) => {
                        setSlugEdited(true);
                        setV((s) => ({ ...s, slug: slugify(e.target.value) }));
                      }}
                    />
                  </div>
                  {err("slug") ?? <p className="hb-xh3-help">You can change this later in settings.</p>}
                </div>
              </>
            ) : null}
            {step === 1 ? (
              <>
                <h3 className="hb-xh3-h">Tell us about your team</h3>
                <p className="hb-xh3-p">We will tune templates and limits to fit.</p>
                <div className="hb-xh3-field">
                  <span className="hb-xh3-label" id={`${uid}-size`}>Team size</span>
                  <div className="hb-xh3-sizes" role="radiogroup" aria-labelledby={`${uid}-size`}>
                    {sizes.map((s, i) => (
                      <button
                        key={s}
                        type="button"
                        role="radio"
                        aria-checked={v.size === s}
                        className="hb-xh3-size"
                        onClick={() => setV((x) => ({ ...x, size: s }))}
                      >
                        <span className="hb-xh3-heads" aria-hidden="true">
                          {sizeBars(i).map((h, k) => <i key={k} style={{ height: h }} />)}
                        </span>
                        <b>{s}</b>
                        <small>{i === 0 ? "solo" : "people"}</small>
                      </button>
                    ))}
                  </div>
                  {err("size")}
                </div>
                <div className="hb-xh3-field">
                  <span className="hb-xh3-label" id={`${uid}-teams`}>Who will use it?</span>
                  <div className="hb-xh3-chips" role="group" aria-labelledby={`${uid}-teams`}>
                    {teams.map((t) => {
                      const on = v.teams.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          className="hb-xh3-chip"
                          aria-pressed={on}
                          onClick={() => setV((x) => ({ ...x, teams: on ? x.teams.filter((y) => y !== t) : [...x.teams, t] }))}
                        >
                          {on ? check : null}
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  {err("teams")}
                </div>
              </>
            ) : null}
            {step === 2 ? (
              <>
                <h3 className="hb-xh3-h">Invite your teammates</h3>
                <p className="hb-xh3-p">Paste a list or press Enter after each address. Up to {maxInvites}.</p>
                <div className="hb-xh3-field">
                  <label className="hb-xh3-label" htmlFor={`${uid}-inv`}>Email addresses</label>
                  <div className="hb-xh3-box hb-xh3-tagbox" data-bad={Boolean(tried[2] && errs.invites)}>
                    {v.invites.map((e) => (
                      <span key={e} className="hb-xh3-tag" data-bad={!emailRe.test(e)}>
                        {e}
                        <button type="button" aria-label={`Remove ${e}`} onClick={() => setV((s) => ({ ...s, invites: s.invites.filter((x) => x !== e) }))}>
                          <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m3 3 6 6M9 3 3 9" /></svg>
                        </button>
                      </span>
                    ))}
                    {v.invites.length < maxInvites ? (
                      <input
                        id={`${uid}-inv`}
                        className="hb-xh3-in"
                        placeholder={v.invites.length ? "Add another" : "sam@northwind.io"}
                        value={draft}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/[,;\s]$/.test(val)) addInvite(val);
                          else setDraft(val);
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          addInvite(e.clipboardData.getData("text"));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && draft.trim()) {
                            e.preventDefault();
                            addInvite(draft);
                          }
                          if (e.key === "Backspace" && !draft && v.invites.length) {
                            setV((s) => ({ ...s, invites: s.invites.slice(0, -1) }));
                          }
                        }}
                        onBlur={() => draft.trim() && addInvite(draft)}
                      />
                    ) : null}
                  </div>
                  {err("invites") ?? <p className="hb-xh3-help">{v.invites.length}/{maxInvites} invites. Everyone joins as a member.</p>}
                </div>
              </>
            ) : null}
            {step === 3 ? (
              <>
                <h3 className="hb-xh3-h">Review and create</h3>
                <dl className="hb-xh3-review">
                  {[
                    { k: "Workspace", d: v.workspace, s: 0 },
                    { k: "URL", d: `${domain}${v.slug}`, s: 0 },
                    { k: "Team", d: `${v.size} · ${v.teams.join(", ")}`, s: 1 },
                    { k: "Invites", d: v.invites.length ? v.invites.join(", ") : "None yet", s: 2 },
                  ].map((r) => (
                    <div key={r.k}>
                      <dt>{r.k}</dt>
                      <dd title={r.d}>{r.d}</dd>
                      <button type="button" className="hb-xh3-edit" onClick={() => go(r.s)} aria-label={`Edit ${r.k}`}>Edit</button>
                    </div>
                  ))}
                </dl>
              </>
            ) : null}
          </div>
        </div>
        <div className="hb-xh3-foot">
          <button type="button" className="hb-xh3-ghost" disabled={step === 0} onClick={() => go(step - 1)}>Back</button>
          <div className="hb-xh3-right">
            {step === 2 && !v.invites.length ? <button type="button" className="hb-xh3-ghost" onClick={() => go(3)}>Skip for now</button> : null}
            <button type="submit" className="hb-xh3-next">
              {step === 3 ? "Create workspace" : "Continue"}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
