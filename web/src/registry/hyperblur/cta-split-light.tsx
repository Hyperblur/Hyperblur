"use client";

import * as React from "react";

export interface CtaSplitLightProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  promises?: string[];
  formTitle?: string;
  formSubtitle?: string;
  buttonLabel?: string;
  ssoLabel?: string;
  finePrint?: string;
  successMessage?: string;
  logosLabel?: string;
  logos?: string[];
  onSubmit?: (data: { name: string; email: string }) => void | Promise<void>;
  onSso?: () => void;
  headingFont?: string;
  accent?: string;
}

const css = `
.hb-kca {
  --hb-kca-accent: #0f8a5f;
  --hb-kca-serif: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: #f7f5ef;
  color: #161512;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kca *, .hb-kca *::before, .hb-kca *::after { box-sizing: border-box; }
.hb-kca::before {
  content: "";
  position: absolute;
  right: -12%;
  top: -20%;
  z-index: -1;
  width: 60%;
  height: 90%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kca-accent) 12%, transparent), transparent);
  pointer-events: none;
}
.hb-kca-inner { display: grid; grid-template-columns: minmax(0, 1fr); gap: 40px; max-width: 1120px; margin: 0 auto; padding: 72px 18px 64px; }
.hb-kca-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 5px 12px;
  border: 1px solid rgba(22, 21, 18, .12);
  border-radius: 999px;
  background: rgba(255, 255, 255, .6);
  color: #4a4842;
  font-size: 12.5px;
  font-weight: 600;
}
.hb-kca-eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-kca-accent); }
.hb-kca-title {
  margin: 22px 0 0;
  max-width: 560px;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: clamp(42px, 7.4cqi, 76px);
  font-weight: 400;
  line-height: .98;
  letter-spacing: -.02em;
  text-wrap: balance;
}
.hb-kca-hl { position: relative; display: inline-block; color: var(--hb-kca-accent); white-space: nowrap; }
.hb-kca-hl svg { position: absolute; left: -4%; bottom: -.12em; width: 108%; height: .32em; overflow: visible; }
.hb-kca-hl path { stroke-dasharray: 220; stroke-dashoffset: 220; animation: hb-kca-draw 1.2s cubic-bezier(.65, 0, .35, 1) .4s forwards; }
.hb-kca-sub { margin: 20px 0 0; max-width: 470px; color: #5b5850; font-size: 16.5px; line-height: 1.6; text-wrap: pretty; }
.hb-kca-list { display: grid; gap: 12px; margin: 28px 0 0; padding: 0; list-style: none; }
.hb-kca-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #2c2a25;
  font-size: 15px;
  line-height: 1.45;
  animation: hb-kca-up .7s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: var(--hb-kca-d, 0ms);
}
.hb-kca-check { display: grid; place-items: center; flex: none; width: 22px; height: 22px; border-radius: 50%; background: color-mix(in srgb, var(--hb-kca-accent) 14%, #fff); color: var(--hb-kca-accent); }
.hb-kca-check svg { width: 12px; height: 12px; }
.hb-kca-card {
  align-self: center;
  width: 100%;
  max-width: 440px;
  padding: 26px 22px 22px;
  border: 1px solid rgba(22, 21, 18, .08);
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .8) inset, 0 1px 2px rgba(22, 21, 18, .05), 0 30px 70px -30px rgba(22, 21, 18, .3);
  animation: hb-kca-up .9s cubic-bezier(.2, .8, .2, 1) .15s both;
}
.hb-kca-ftitle { margin: 0; font-size: 19px; font-weight: 700; letter-spacing: -.02em; }
.hb-kca-fsub { margin: 4px 0 0; color: #77746b; font-size: 14px; }
.hb-kca-form { display: grid; gap: 12px; margin-top: 20px; }
.hb-kca-field { display: grid; gap: 6px; }
.hb-kca-field label { color: #3c3a34; font-size: 12.5px; font-weight: 600; }
.hb-kca-input {
  width: 100%;
  height: 44px;
  padding: 0 13px;
  border: 1px solid rgba(22, 21, 18, .14);
  border-radius: 11px;
  background: #fbfaf7;
  color: #161512;
  font: inherit;
  font-size: 14.5px;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease, background-color .2s ease;
}
.hb-kca-input::placeholder { color: #a9a59b; }
.hb-kca-input:hover { border-color: rgba(22, 21, 18, .24); }
.hb-kca-input:focus { border-color: var(--hb-kca-accent); background: #fff; box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kca-accent) 16%, transparent); }
.hb-kca-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  margin-top: 4px;
  border: 0;
  border-radius: 11px;
  background: var(--hb-kca-accent);
  color: #fff;
  font: inherit;
  font-size: 14.5px;
  font-weight: 650;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 8px 20px -10px var(--hb-kca-accent);
  transition: transform .2s cubic-bezier(.2, .8, .2, 1), filter .2s ease;
}
.hb-kca-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.hb-kca-btn:active { transform: scale(.985); }
.hb-kca-btn:disabled { cursor: progress; opacity: .75; }
.hb-kca-btn:focus-visible, .hb-kca-sso:focus-visible { outline: 2px solid var(--hb-kca-accent); outline-offset: 3px; }
.hb-kca-or { display: flex; align-items: center; gap: 12px; margin: 4px 0; color: #a09c92; font-size: 12px; }
.hb-kca-or::before, .hb-kca-or::after { content: ""; flex: 1; height: 1px; background: rgba(22, 21, 18, .1); }
.hb-kca-sso {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 44px;
  border: 1px solid rgba(22, 21, 18, .14);
  border-radius: 11px;
  background: #fff;
  color: #2c2a25;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease;
}
.hb-kca-sso:hover { border-color: rgba(22, 21, 18, .26); background: #faf9f5; }
.hb-kca-sso svg { width: 16px; height: 16px; }
.hb-kca-fine { margin: 14px 0 0; color: #95918a; font-size: 12px; line-height: 1.5; text-align: center; }
.hb-kca-done { display: grid; justify-items: center; gap: 10px; padding: 28px 8px 18px; text-align: center; animation: hb-kca-up .5s cubic-bezier(.2, .8, .2, 1); }
.hb-kca-done span { display: grid; place-items: center; width: 48px; height: 48px; border-radius: 50%; background: color-mix(in srgb, var(--hb-kca-accent) 14%, #fff); color: var(--hb-kca-accent); }
.hb-kca-done svg { width: 22px; height: 22px; }
.hb-kca-done p { margin: 0; color: #3c3a34; font-size: 15px; line-height: 1.5; }
.hb-kca-logos { grid-column: 1 / -1; padding-top: 28px; border-top: 1px solid rgba(22, 21, 18, .08); }
.hb-kca-logos p { margin: 0 0 16px; color: #8a867d; font-size: 12.5px; font-weight: 550; letter-spacing: .04em; text-transform: uppercase; }
.hb-kca-logos ul { display: flex; flex-wrap: wrap; align-items: center; gap: 18px 34px; margin: 0; padding: 0; list-style: none; }
.hb-kca-logo { display: inline-flex; align-items: center; gap: 8px; color: #6e6a61; font-size: 17px; font-weight: 700; letter-spacing: -.02em; transition: color .2s ease; }
.hb-kca-logo:hover { color: #161512; }
.hb-kca-logo svg { width: 20px; height: 20px; }
.hb-kca-logo[data-v="1"] { font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-weight: 400; font-size: 21px; }
.hb-kca-logo[data-v="2"] { font-weight: 800; letter-spacing: .1em; font-size: 13.5px; text-transform: uppercase; }
.hb-kca-logo[data-v="3"] { font-weight: 500; letter-spacing: -.01em; }
@keyframes hb-kca-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-kca-up {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}
@container (min-width: 820px) {
  .hb-kca-inner { grid-template-columns: minmax(0, 1.15fr) minmax(0, .85fr); gap: 56px 72px; padding: 104px 32px 88px; }
  .hb-kca-card { justify-self: end; padding: 30px 28px 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kca-hl path { animation: none; stroke-dashoffset: 0; }
  .hb-kca-list li, .hb-kca-card, .hb-kca-done { animation: none; }
  .hb-kca-input, .hb-kca-btn, .hb-kca-sso, .hb-kca-logo { transition: none; }
}
`;

const defaultLogos = ["Halcyon", "Northwind", "Parable", "Kestrel", "Lumen & Co"];

const glyphs = [
  "M10 2a8 8 0 100 16 8 8 0 000-16zm0 3a5 5 0 110 10 5 5 0 010-10z",
  "M3 15L10 3l7 12H3z",
  "M3 3h6v6H3zM11 11h6v6h-6zM11 3h6v6h-6z",
  "M2 10c3-6 13-6 16 0-3 6-13 6-16 0zm8-3a3 3 0 100 6 3 3 0 000-6z",
  "M10 2l2.4 5.6L18 10l-5.6 2.4L10 18l-2.4-5.6L2 10l5.6-2.4z",
];

function Check() {
  return (
    <span className="hb-kca-check" aria-hidden="true">
      <svg viewBox="0 0 12 12">
        <path d="M2.5 6.3l2.3 2.3 4.7-5.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function CtaSplitLight({
  eyebrow = "For finance teams",
  title = "Close the books in days, not weeks.",
  highlight = "days,",
  subtitle = "Ledgerline reconciles every account overnight, flags what looks off and hands your auditors a clean trail.",
  promises = [
    "Bank feeds from 11,000 institutions, matched automatically",
    "Month-end checklist with owners, due dates and sign-off",
    "Live in under a week, with a migration specialist included",
  ],
  formTitle = "Start your free trial",
  formSubtitle = "14 days of full access. No card needed.",
  buttonLabel = "Create account",
  ssoLabel = "Continue with SSO",
  finePrint = "By signing up you agree to our Terms and Privacy Policy.",
  successMessage = "Check your inbox. We sent a link to finish setting up your workspace.",
  logosLabel = "Trusted by finance teams at",
  logos = defaultLogos,
  onSubmit,
  onSso,
  headingFont,
  accent = "#0f8a5f",
  className = "",
  style,
  ...rest
}: CtaSplitLightProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "busy" | "done">("idle");
  const id = React.useId();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state !== "idle") return;
    setState("busy");
    try {
      await onSubmit?.({ name: name.trim(), email: email.trim() });
      setState("done");
    } catch {
      setState("idle");
    }
  };

  const at = highlight ? title.indexOf(highlight) : -1;
  const vars = {
    "--hb-kca-accent": accent,
    ...(headingFont ? { "--hb-kca-serif": headingFont } : null),
    ...style,
  } as React.CSSProperties;

  return (
    <section className={`hb-kca ${className}`} style={vars} {...rest}>
      <style href="hb-cta-split-light" precedence="default">{css}</style>
      <div className="hb-kca-inner">
        <div>
          {eyebrow ? (
            <p className="hb-kca-eyebrow">
              <i aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h2 className="hb-kca-title">
            {at >= 0 ? (
              <>
                {title.slice(0, at)}
                <span className="hb-kca-hl">
                  {highlight}
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M3 14c38-9 84-12 128-8 22 2 44 5 66 2" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
                {title.slice(at + highlight.length)}
              </>
            ) : (
              title
            )}
          </h2>
          {subtitle ? <p className="hb-kca-sub">{subtitle}</p> : null}
          {promises.length ? (
            <ul className="hb-kca-list">
              {promises.map((p, i) => (
                <li key={p} style={{ "--hb-kca-d": `${300 + i * 110}ms` } as React.CSSProperties}>
                  <Check />
                  {p}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hb-kca-card">
          {state === "done" ? (
            <div className="hb-kca-done" role="status">
              <span aria-hidden="true">
                <svg viewBox="0 0 22 22">
                  <path d="M3 6.5l8 5.5 8-5.5M4 5h14a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p>{successMessage}</p>
            </div>
          ) : (
            <>
              <h3 className="hb-kca-ftitle">{formTitle}</h3>
              {formSubtitle ? <p className="hb-kca-fsub">{formSubtitle}</p> : null}
              <form className="hb-kca-form" onSubmit={submit}>
                <div className="hb-kca-field">
                  <label htmlFor={`${id}-name`}>Full name</label>
                  <input
                    id={`${id}-name`}
                    className="hb-kca-input"
                    type="text"
                    autoComplete="name"
                    placeholder="Maria Chen"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="hb-kca-field">
                  <label htmlFor={`${id}-email`}>Work email</label>
                  <input
                    id={`${id}-email`}
                    className="hb-kca-input"
                    type="email"
                    autoComplete="email"
                    placeholder="maria@halcyon.co"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="hb-kca-btn" disabled={state === "busy"}>
                  {state === "busy" ? "Creating account..." : buttonLabel}
                </button>
                {ssoLabel ? (
                  <>
                    <span className="hb-kca-or">or</span>
                    <button type="button" className="hb-kca-sso" onClick={() => onSso?.()}>
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4.5 7V5a3.5 3.5 0 017 0v2M3.5 7h9a1 1 0 011 1v5a1 1 0 01-1 1h-9a1 1 0 01-1-1V8a1 1 0 011-1z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {ssoLabel}
                    </button>
                  </>
                ) : null}
              </form>
              {finePrint ? <p className="hb-kca-fine">{finePrint}</p> : null}
            </>
          )}
        </div>
        {logos.length ? (
          <div className="hb-kca-logos">
            <p>{logosLabel}</p>
            <ul>
              {logos.map((l, i) => (
                <li key={l} className="hb-kca-logo" data-v={String(i % 4)}>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d={glyphs[i % glyphs.length]} fill="currentColor" fillRule="evenodd" />
                  </svg>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
