"use client";

import * as React from "react";

export interface AuthFlowSignupValues {
  name: string;
  email: string;
  workspace: string;
  uses: string[];
  password: string;
}

export interface AuthFlowSignupWizardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit" | "defaultValue"> {
  brand?: string;
  domain?: string;
  uses?: string[];
  defaultValues?: Partial<AuthFlowSignupValues>;
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  onSubmit?: (values: AuthFlowSignupValues) => void | Promise<unknown>;
  headingAs?: "h1" | "h2" | "h3";
  accent?: string;
}

const css = `
@keyframes hb-vg5-q {
  from { opacity: 0; transform: translate3d(0, 22px, 0); filter: blur(4px); }
  to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
}
@keyframes hb-vg5-qb {
  from { opacity: 0; transform: translate3d(0, -22px, 0); filter: blur(4px); }
  to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
}
@keyframes hb-vg5-stamp {
  0% { opacity: 0; transform: rotate(-14deg) scale(2.2); }
  60% { opacity: 1; transform: rotate(-14deg) scale(.92); }
  100% { opacity: 1; transform: rotate(-14deg) scale(1); }
}
@keyframes hb-vg5-float {
  0%, 100% { transform: rotate(-3deg) translateY(0); }
  50% { transform: rotate(-2deg) translateY(-6px); }
}
.hb-vg5 {
  --hb-vg5-accent: #f97316;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 72px 24px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vg5 *, .hb-vg5 *::before, .hb-vg5 *::after { box-sizing: border-box; }
.hb-vg5::before { content: ""; position: absolute; inset: 0; z-index: -1; background: radial-gradient(ellipse 36% 60% at 78% 50%, color-mix(in srgb, var(--hb-vg5-accent) 12%, transparent), transparent 70%); }
.hb-vg5-wrap { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 64px; align-items: center; max-width: 960px; margin: 0 auto; }
.hb-vg5-bar { display: flex; align-items: center; gap: 14px; }
.hb-vg5-segs { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 5px; flex: 1 1 auto; }
.hb-vg5-seg { height: 4px; border-radius: 4px; background: #1f1f1f; overflow: hidden; }
.hb-vg5-seg span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--hb-vg5-accent), color-mix(in srgb, var(--hb-vg5-accent) 60%, #fff)); transform: scaleX(var(--f)); transform-origin: left; transition: transform .5s cubic-bezier(.65, 0, .35, 1); }
.hb-vg5-count { color: #8f8f8f; font: 500 12px/1 var(--font-mono), ui-monospace, monospace; font-variant-numeric: tabular-nums; }
.hb-vg5-count b { color: #ededed; font-weight: 600; }
.hb-vg5-stage { min-height: 252px; margin-top: 40px; }
.hb-vg5-q { animation: hb-vg5-q .5s cubic-bezier(.2, .8, .2, 1) both; }
.hb-vg5-q[data-dir="back"] { animation-name: hb-vg5-qb; }
.hb-vg5-qn { display: inline-flex; align-items: center; gap: 8px; color: var(--hb-vg5-accent); font: 600 13px/1 var(--font-mono), ui-monospace, monospace; }
.hb-vg5-label { display: block; margin: 12px 0 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 34px; font-weight: 600; letter-spacing: -.03em; line-height: 1.12; }
.hb-vg5-help { margin: 10px 0 0; color: #8f8f8f; font-size: 14px; line-height: 1.55; }
.hb-vg5-field { position: relative; margin-top: 24px; }
.hb-vg5-input {
  width: 100%;
  padding: 8px 0 12px;
  border: 0;
  border-bottom: 1px solid #2a2a2a;
  border-radius: 0;
  background: linear-gradient(var(--hb-vg5-accent), var(--hb-vg5-accent)) left bottom / 0% 2px no-repeat;
  color: #ededed;
  font: inherit;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -.01em;
  outline: none;
  transition: background-size .45s cubic-bezier(.65, 0, .35, 1), border-color .2s ease;
}
.hb-vg5-input::placeholder { color: #3d3d3d; }
.hb-vg5-input:focus { background-size: 100% 2px; }
.hb-vg5-field[data-bad="true"] .hb-vg5-input { border-color: #7f1d1d; }
.hb-vg5-suffix { display: flex; align-items: baseline; gap: 2px; }
.hb-vg5-suffix .hb-vg5-input { flex: 1 1 auto; min-width: 0; }
.hb-vg5-suffix span { color: #5c5c5c; font-size: 20px; font-weight: 500; white-space: nowrap; }
.hb-vg5-err { min-height: 18px; margin-top: 10px; color: #fca5a5; font-size: 13px; }
.hb-vg5-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
.hb-vg5-chip { display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 14px 0 10px; border: 1px solid #2a2a2a; border-radius: 999px; background: #111; color: #cfcfcf; font: inherit; font-size: 14px; font-weight: 500; cursor: pointer; transition: border-color .2s ease, background .2s ease, color .2s ease, transform .15s cubic-bezier(.3, 1.4, .5, 1); }
.hb-vg5-chip:hover { border-color: #3a3a3a; }
.hb-vg5-chip:active { transform: scale(.95); }
.hb-vg5-chip kbd { display: grid; place-items: center; width: 20px; height: 20px; border: 1px solid #333; border-radius: 6px; color: #8f8f8f; font: 600 10.5px/1 var(--font-mono), ui-monospace, monospace; transition: inherit; }
.hb-vg5-chip[aria-pressed="true"] { border-color: color-mix(in srgb, var(--hb-vg5-accent) 60%, transparent); background: color-mix(in srgb, var(--hb-vg5-accent) 12%, #111); color: #ededed; }
.hb-vg5-chip[aria-pressed="true"] kbd { border-color: transparent; background: var(--hb-vg5-accent); color: #0a0a0a; }
.hb-vg5-chip:focus-visible, .hb-vg5-next:focus-visible, .hb-vg5-back:focus-visible, .hb-vg5-eye:focus-visible { outline: 2px solid var(--hb-vg5-accent); outline-offset: 2px; }
.hb-vg5-eye { position: absolute; right: 0; top: 10px; padding: 4px 8px; border: 1px solid #2a2a2a; border-radius: 7px; background: #111; color: #a1a1a1; font: inherit; font-size: 12px; cursor: pointer; }
.hb-vg5-nav { display: flex; align-items: center; gap: 14px; margin-top: 18px; }
.hb-vg5-next { display: inline-flex; align-items: center; gap: 10px; height: 44px; padding: 0 18px; border: 0; border-radius: 12px; background: #ededed; color: #0a0a0a; font: inherit; font-size: 14.5px; font-weight: 650; cursor: pointer; box-shadow: inset 0 1px 0 #fff, 0 10px 24px -14px rgba(255,255,255,.5); transition: transform .15s ease, opacity .2s ease; }
.hb-vg5-next:active:not(:disabled) { transform: scale(.97); }
.hb-vg5-next:disabled { opacity: .5; cursor: progress; }
.hb-vg5-hint { color: #6b6b6b; font-size: 12.5px; }
.hb-vg5-hint kbd { padding: 1px 6px; border: 1px solid #2a2a2a; border-bottom-width: 2px; border-radius: 5px; color: #a1a1a1; font: 500 11px/1.4 var(--font-mono), ui-monospace, monospace; }
.hb-vg5-back { margin-left: auto; padding: 6px 10px; border: 0; border-radius: 8px; background: none; color: #8f8f8f; font: inherit; font-size: 13px; cursor: pointer; }
.hb-vg5-back:hover { color: #ededed; background: #141414; }
.hb-vg5-pass { position: relative; justify-self: center; width: 100%; max-width: 330px; perspective: 900px; }
.hb-vg5-card { position: relative; padding: 22px; border: 1px solid #2a2a2a; border-radius: 22px; background: radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, var(--hb-vg5-accent) 22%, transparent), transparent 60%), linear-gradient(160deg, #1a1a1a, #0e0e0e); box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 40px 80px -30px #000, 0 0 0 6px #0f0f0f, 0 0 0 7px #222; animation: hb-vg5-float 7s ease-in-out infinite; overflow: hidden; }
.hb-vg5-card::before { content: ""; position: absolute; top: 14px; left: 50%; width: 44px; height: 6px; margin-left: -22px; border-radius: 6px; background: #0a0a0a; box-shadow: inset 0 1px 2px #000; }
.hb-vg5-brand { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; color: #a1a1a1; font: 600 11px/1 var(--font-mono), ui-monospace, monospace; letter-spacing: .12em; text-transform: uppercase; }
.hb-vg5-av { display: grid; place-items: center; width: 64px; height: 64px; margin-top: 22px; border-radius: 20px; background: var(--hb-vg5-av, #222); color: #0a0a0a; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -.02em; box-shadow: inset 0 1px 0 rgba(255,255,255,.4); transition: background .5s ease; }
.hb-vg5-av[data-empty="true"] { background: #1c1c1c; color: #4f4f4f; box-shadow: inset 0 0 0 1px #2a2a2a; }
.hb-vg5-line { display: block; min-height: 1.4em; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; transition: color .3s ease; }
.hb-vg5-line[data-empty="true"] { color: transparent; background: linear-gradient(90deg, #1d1d1d, #252525) left center / var(--w, 60%) .7em no-repeat; }
.hb-vg5-nm { margin-top: 16px; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 22px; font-weight: 600; letter-spacing: -.02em; }
.hb-vg5-em { color: #a1a1a1; font-size: 13.5px; }
.hb-vg5-url { margin-top: 16px; padding: 10px 12px; border: 1px dashed #2f2f2f; border-radius: 10px; background: rgba(0,0,0,.25); color: #ededed; font: 500 12.5px/1.4 var(--font-mono), ui-monospace, monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-vg5-url span { color: #6b6b6b; }
.hb-vg5-tags { display: flex; flex-wrap: wrap; gap: 5px; min-height: 24px; margin-top: 14px; }
.hb-vg5-tags span { padding: 4px 8px; border-radius: 6px; background: rgba(255,255,255,.06); color: #cfcfcf; font-size: 11.5px; font-weight: 550; }
.hb-vg5-lock { display: flex; align-items: center; gap: 8px; margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.07); color: #6b6b6b; font: 500 12px/1 var(--font-mono), ui-monospace, monospace; letter-spacing: .25em; }
.hb-vg5-lock[data-on="true"] { color: var(--hb-vg5-accent); }
.hb-vg5-stamp { position: absolute; right: 18px; bottom: 54px; padding: 8px 12px; border: 2px solid var(--hb-vg5-accent); border-radius: 10px; color: var(--hb-vg5-accent); font: 700 12px/1 var(--font-mono), ui-monospace, monospace; letter-spacing: .14em; text-transform: uppercase; animation: hb-vg5-stamp .55s cubic-bezier(.3, 1.3, .5, 1) both; box-shadow: inset 0 0 0 2px rgba(0,0,0,.2); }
.hb-vg5-done h3 { margin: 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 34px; font-weight: 600; letter-spacing: -.03em; line-height: 1.1; }
.hb-vg5-done p { margin: 12px 0 0; color: #a1a1a1; font-size: 15px; line-height: 1.6; }
.hb-vg5-done a { display: inline-flex; align-items: center; gap: 8px; margin-top: 22px; height: 44px; padding: 0 18px; border-radius: 12px; background: var(--hb-vg5-accent); color: #0a0a0a; font-size: 14.5px; font-weight: 650; text-decoration: none; }
.hb-vg5-done a:focus-visible { outline: 2px solid #ededed; outline-offset: 3px; }
@container (max-width: 760px) {
  .hb-vg5-wrap { grid-template-columns: minmax(0, 1fr); gap: 36px; }
  .hb-vg5-label { font-size: 26px; }
  .hb-vg5-input { font-size: 20px; }
  .hb-vg5-hint { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vg5 *, .hb-vg5 *::before, .hb-vg5 *::after { animation: none !important; transition: none !important; }
}
`;

function seedOf(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h >>> 0;
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32);
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  return ((parts[0][0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function wait(result: void | Promise<unknown>) {
  return result instanceof Promise ? result : new Promise((resolve) => window.setTimeout(resolve, 900));
}

const questions = [
  { key: "name", q: "First, what should we call you?", help: "Your teammates will see this on comments and reviews.", ph: "Ada Lovelace" },
  { key: "email", q: "Where can we reach you?", help: "Use your work email so teammates can find you.", ph: "ada@company.com" },
  { key: "workspace", q: "Name your workspace", help: "Usually your company or team. You can rename it later.", ph: "Analytical Engines" },
  { key: "uses", q: "What will you use it for?", help: "Pick all that apply. Press the number keys to toggle.", ph: "" },
  { key: "password", q: "Last step: set a password", help: "At least 10 characters. Longer is better.", ph: "••••••••••" },
] as const;

export function AuthFlowSignupWizard({
  brand = "Ledgerline",
  domain = "ledgerline.app",
  uses = ["Product roadmaps", "Bug tracking", "Sprint planning", "Customer feedback", "Docs"],
  defaultValues,
  defaultStep = 0,
  onStepChange,
  onSubmit,
  headingAs = "h2",
  accent = "#f97316",
  className = "",
  style,
  ...rest
}: AuthFlowSignupWizardProps) {
  const Heading = headingAs;
  const uid = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [values, setValues] = React.useState<AuthFlowSignupValues>({
    name: defaultValues?.name ?? "",
    email: defaultValues?.email ?? "",
    workspace: defaultValues?.workspace ?? "",
    uses: defaultValues?.uses ?? [],
    password: defaultValues?.password ?? "",
  });
  const [step, setStep] = React.useState(Math.max(0, Math.min(questions.length - 1, defaultStep)));
  const [dir, setDir] = React.useState<"fwd" | "back">("fwd");
  const [error, setError] = React.useState("");
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const mounted = React.useRef(false);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    inputRef.current?.focus();
  }, [step]);

  const current = questions[step];
  const slug = slugify(values.workspace);

  const validate = () => {
    if (current.key === "name" && values.name.trim().length < 2) return "Tell us at least your first name.";
    if (current.key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) return "That email doesn't look right.";
    if (current.key === "workspace" && slug.length < 2) return "Give your workspace a name of two letters or more.";
    if (current.key === "uses" && values.uses.length === 0) return "Pick at least one so we can set things up for you.";
    if (current.key === "password" && values.password.length < 10) return `${10 - values.password.length} more characters to go.`;
    return "";
  };

  const move = (n: number) => {
    setDir(n > step ? "fwd" : "back");
    setStep(n);
    setError("");
    onStepChange?.(n);
  };

  const next = () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      if (fieldRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        fieldRef.current.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(5px)" }, { transform: "translateX(-2px)" }, { transform: "translateX(0)" }],
          { duration: 380, easing: "ease-out" },
        );
      }
      return;
    }
    if (step < questions.length - 1) {
      move(step + 1);
      return;
    }
    setBusy(true);
    wait(onSubmit?.(values)).then(
      () => {
        setBusy(false);
        setDone(true);
      },
      (err: unknown) => {
        setBusy(false);
        setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      },
    );
  };

  const toggle = (u: string) => {
    setError("");
    setValues((v) => ({ ...v, uses: v.uses.includes(u) ? v.uses.filter((x) => x !== u) : [...v.uses, u] }));
  };

  const onKey = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (current.key === "uses" && /^[1-9]$/.test(e.key)) {
      const u = uses[Number(e.key) - 1];
      if (u) {
        e.preventDefault();
        toggle(u);
      }
    }
  };

  const set = (k: "name" | "email" | "workspace" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setValues((v) => ({ ...v, [k]: e.target.value }));
  };

  const seed = seedOf(values.name.trim().toLowerCase());
  const hue = seed % 360;
  const av = `linear-gradient(135deg, hsl(${hue} 85% 68%), hsl(${(hue + 50) % 360} 80% 58%))`;
  const vars = { "--hb-vg5-accent": accent, ...style } as React.CSSProperties;
  const ini = initials(values.name);
  const qid = `${uid}-q`;

  return (
    <section className={`hb-vg5 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-auth-flow-signup-wizard" precedence="default">{css}</style>
      <div className="hb-vg5-wrap">
        <div>
          <Heading id={`${uid}-t`} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
            Create your {brand} account
          </Heading>
          {done ? (
            <div className="hb-vg5-done hb-vg5-q" role="status">
              <span className="hb-vg5-qn">All set</span>
              <h3 style={{ marginTop: 12 }}>Welcome to {brand}, {values.name.trim().split(/\s+/)[0]}.</h3>
              <p>We sent a confirmation to {values.email}. Your workspace is ready at {slug}.{domain}.</p>
              <a href={`#${slug}`}>
                Open {values.workspace.trim()}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          ) : (
            <>
              <div className="hb-vg5-bar">
                <div className="hb-vg5-segs" role="progressbar" aria-label="Sign-up progress" aria-valuemin={1} aria-valuemax={questions.length} aria-valuenow={step + 1}>
                  {questions.map((q, i) => (
                    <span key={q.key} className="hb-vg5-seg">
                      <span style={{ "--f": i < step ? 1 : i === step ? 0.35 : 0 } as React.CSSProperties} />
                    </span>
                  ))}
                </div>
                <span className="hb-vg5-count">
                  <b>{step + 1}</b>/{questions.length}
                </span>
              </div>
              <form
                className="hb-vg5-stage"
                noValidate
                onKeyDown={onKey}
                onSubmit={(e) => {
                  e.preventDefault();
                  next();
                }}
              >
                <div className="hb-vg5-q" data-dir={dir} key={step}>
                  <span className="hb-vg5-qn">
                    {step + 1}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                  <label className="hb-vg5-label" htmlFor={qid} id={`${qid}-l`}>{current.q}</label>
                  <p className="hb-vg5-help">{current.help}</p>
                  {current.key === "uses" ? (
                    <div className="hb-vg5-chips" role="group" aria-labelledby={`${qid}-l`} ref={fieldRef} data-bad={!!error}>
                      {uses.map((u, i) => (
                        <button key={u} type="button" className="hb-vg5-chip" aria-pressed={values.uses.includes(u)} onClick={() => toggle(u)}>
                          <kbd>{i + 1}</kbd>
                          {u}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="hb-vg5-field" data-bad={!!error} ref={fieldRef}>
                      {current.key === "workspace" ? (
                        <div className="hb-vg5-suffix">
                          <input ref={inputRef} id={qid} className="hb-vg5-input" value={values.workspace} onChange={set("workspace")} placeholder={current.ph} autoComplete="organization" aria-invalid={!!error || undefined} aria-describedby={`${qid}-e`} />
                          <span>.{domain}</span>
                        </div>
                      ) : current.key === "password" ? (
                        <>
                          <input ref={inputRef} id={qid} className="hb-vg5-input" type={show ? "text" : "password"} value={values.password} onChange={set("password")} placeholder={current.ph} autoComplete="new-password" aria-invalid={!!error || undefined} aria-describedby={`${qid}-e`} style={{ paddingRight: 64 }} />
                          <button type="button" className="hb-vg5-eye" onClick={() => setShow((s) => !s)} aria-pressed={show}>{show ? "Hide" : "Show"}</button>
                        </>
                      ) : (
                        <input
                          ref={inputRef}
                          id={qid}
                          className="hb-vg5-input"
                          type={current.key === "email" ? "email" : "text"}
                          value={values[current.key]}
                          onChange={set(current.key)}
                          placeholder={current.ph}
                          autoComplete={current.key === "email" ? "email" : "name"}
                          aria-invalid={!!error || undefined}
                          aria-describedby={`${qid}-e`}
                        />
                      )}
                    </div>
                  )}
                  <div id={`${qid}-e`} className="hb-vg5-err" role="alert">{error}</div>
                </div>
                <div className="hb-vg5-nav">
                  <button type="submit" className="hb-vg5-next" disabled={busy} aria-busy={busy || undefined}>
                    {busy ? "Creating account" : step === questions.length - 1 ? "Create account" : "Continue"}
                  </button>
                  <span className="hb-vg5-hint">
                    or press <kbd>Enter ↵</kbd>
                  </span>
                  {step > 0 ? (
                    <button type="button" className="hb-vg5-back" onClick={() => move(step - 1)}>
                      Back
                    </button>
                  ) : null}
                </div>
              </form>
            </>
          )}
        </div>
        <div className="hb-vg5-pass" aria-hidden="true">
          <div className="hb-vg5-card" style={{ "--hb-vg5-av": av } as React.CSSProperties}>
            <div className="hb-vg5-brand">
              <span>{brand}</span>
              <span>Member</span>
            </div>
            <div className="hb-vg5-av" data-empty={!ini}>{ini || "?"}</div>
            <span className="hb-vg5-line hb-vg5-nm" data-empty={!values.name.trim()} style={{ "--w": "70%" } as React.CSSProperties}>{values.name.trim() || "Your name"}</span>
            <span className="hb-vg5-line hb-vg5-em" data-empty={!values.email.trim()} style={{ "--w": "55%" } as React.CSSProperties}>{values.email.trim() || "you@company.com"}</span>
            <div className="hb-vg5-url">
              {slug || <span>your-team</span>}
              <span>.{domain}</span>
            </div>
            <div className="hb-vg5-tags">
              {values.uses.map((u) => (
                <span key={u}>{u}</span>
              ))}
            </div>
            <div className="hb-vg5-lock" data-on={values.password.length >= 10}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="10" width="16" height="11" rx="2.5" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              {"•".repeat(Math.min(values.password.length, 14)) || "not set"}
            </div>
            {done ? <span className="hb-vg5-stamp">Verified</span> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
