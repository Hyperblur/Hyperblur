"use client";

import * as React from "react";

export interface ContactMinimalLink {
  label: string;
  href: string;
}

export interface ContactMinimalDetail {
  label: string;
  lines: string[];
  link?: ContactMinimalLink;
}

export interface ContactMinimalValues {
  name: string;
  company: string;
  intent: string;
  email: string;
}

export interface ContactMinimalLightProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  studio?: string;
  availability?: string;
  title?: string;
  highlight?: string;
  suggestions?: string[];
  details?: ContactMinimalDetail[];
  responseNote?: string;
  onSubmit?: (values: ContactMinimalValues) => void | Promise<unknown>;
  accent?: string;
}

const css = `
@keyframes hb-kf8-letter {
  from { opacity: 0; transform: translate3d(0, .5em, 0) rotate(4deg); }
  to { opacity: 1; transform: translate3d(0, 0, 0) rotate(0); }
}
@keyframes hb-kf8-word {
  from { opacity: 0; filter: blur(6px); transform: translate3d(0, 10px, 0); }
  to { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0); }
}
@keyframes hb-kf8-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-kf8-spin { to { transform: rotate(360deg); } }
@keyframes hb-kf8-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: .35; }
}
.hb-kf8 {
  --hb-kf8-accent: #e5532d;
  --hb-kf8-ink: #1a1814;
  --hb-kf8-muted: #6f6a60;
  --hb-kf8-line: rgba(26, 24, 20, .14);
  --hb-kf8-serif: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 28px 20px 72px;
  overflow: hidden;
  container-type: inline-size;
  background: #f7f5ef;
  color: var(--hb-kf8-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kf8 *, .hb-kf8 *::before, .hb-kf8 *::after { box-sizing: border-box; }
.hb-kf8-inner { max-width: 1120px; margin: 0 auto; }
.hb-kf8-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 20px; padding-bottom: 16px; border-bottom: 1px solid var(--hb-kf8-line); color: var(--hb-kf8-muted); font-size: 13px; }
.hb-kf8-bar strong { color: var(--hb-kf8-ink); font-weight: 600; }
.hb-kf8-avail { display: inline-flex; align-items: center; gap: 8px; }
.hb-kf8-avail i { width: 7px; height: 7px; border-radius: 50%; background: #16a34a; box-shadow: 0 0 0 3px rgba(22, 163, 74, .15); animation: hb-kf8-blink 2.4s ease-in-out infinite; }
.hb-kf8-title {
  margin: 36px 0 28px;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: clamp(72px, 19cqw, 228px);
  font-weight: 400;
  line-height: .86;
  letter-spacing: -.035em;
}
.hb-kf8-ch { display: inline-block; animation: hb-kf8-letter .8s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-kf8-i) * 45ms); white-space: pre; }
.hb-kf8-hl { color: var(--hb-kf8-accent); }
.hb-kf8-grid { display: grid; grid-template-columns: 1fr; gap: 48px; }
.hb-kf8-form { margin: 0; min-width: 0; }
.hb-kf8-sentence { margin: 0; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: clamp(24px, 3.7cqw, 42px); line-height: 1.7; letter-spacing: -.01em; color: var(--hb-kf8-ink); }
.hb-kf8-fill {
  max-width: 100%;
  margin: 0 .12em;
  padding: 0 .1em;
  border: 0;
  border-bottom: 2px solid var(--hb-kf8-line);
  border-radius: 0;
  background: linear-gradient(var(--hb-kf8-accent), var(--hb-kf8-accent)) no-repeat left bottom / 0 2px;
  color: var(--hb-kf8-accent);
  font: inherit;
    line-height: 1.2;
  outline: none;
  transition: background-size .35s cubic-bezier(.2, .8, .2, 1), border-color .2s ease;
}
.hb-kf8-fill::placeholder { color: rgba(26, 24, 20, .3); }
.hb-kf8-fill:hover { border-bottom-color: rgba(26, 24, 20, .32); }
.hb-kf8-fill:focus { background-size: 100% 2px; }
.hb-kf8-fill:focus-visible { outline: 2px dashed color-mix(in srgb, var(--hb-kf8-accent) 45%, transparent); outline-offset: 4px; }
.hb-kf8-fill[aria-invalid="true"] { border-bottom-color: #b42318; border-bottom-style: dashed; }
.hb-kf8-fill:disabled { opacity: .6; }
.hb-kf8-sugg { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 22px 0 0; padding: 0; list-style: none; color: var(--hb-kf8-muted); font-size: 13px; }
.hb-kf8-chip {
  height: 32px;
  padding: 0 13px;
  border: 1px solid var(--hb-kf8-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, .55);
  color: var(--hb-kf8-ink);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease, color .2s ease;
}
.hb-kf8-chip:hover { border-color: var(--hb-kf8-ink); background: #fff; }
.hb-kf8-chip[aria-pressed="true"] { border-color: var(--hb-kf8-ink); background: var(--hb-kf8-ink); color: #f7f5ef; }
.hb-kf8-chip:focus-visible { outline: 2px solid var(--hb-kf8-accent); outline-offset: 2px; }
.hb-kf8-errs { display: grid; gap: 4px; margin: 18px 0 0; padding: 0; list-style: none; }
.hb-kf8-errs li { display: flex; align-items: center; gap: 8px; color: #b42318; font-size: 14px; animation: hb-kf8-in .2s ease both; }
.hb-kf8-errs li::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.hb-kf8-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 22px; margin-top: 34px; }
.hb-kf8-send {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  height: 60px;
  padding: 0 10px 0 28px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: var(--hb-kf8-ink);
  color: #f7f5ef;
  font: inherit;
  font-size: 16px;
  font-weight: 550;
  cursor: pointer;
  isolation: isolate;
  transition: transform .2s ease;
}
.hb-kf8-send::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: var(--hb-kf8-accent);
  transform: translateY(101%);
  transition: transform .45s cubic-bezier(.2, .8, .2, 1);
}
.hb-kf8-send:hover:not(:disabled)::before { transform: translateY(0); }
.hb-kf8-send:active:not(:disabled) { transform: scale(.98); }
.hb-kf8-send:disabled { cursor: progress; }
.hb-kf8-send:focus-visible { outline: 2px solid var(--hb-kf8-accent); outline-offset: 4px; }
.hb-kf8-arrow { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; background: #f7f5ef; color: var(--hb-kf8-ink); transition: transform .45s cubic-bezier(.2, .8, .2, 1); }
.hb-kf8-send:hover:not(:disabled) .hb-kf8-arrow { transform: rotate(-45deg); }
.hb-kf8-spin { width: 16px; height: 16px; border: 2px solid rgba(26, 24, 20, .2); border-top-color: var(--hb-kf8-ink); border-radius: 50%; animation: hb-kf8-spin .7s linear infinite; }
.hb-kf8-note { color: var(--hb-kf8-muted); font-size: 14px; }
.hb-kf8-alert { margin: 18px 0 0; color: #b42318; font-size: 14px; }
.hb-kf8-done { margin: 0; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: clamp(26px, 4cqw, 46px); line-height: 1.35; letter-spacing: -.015em; outline: none; }
.hb-kf8-word { display: inline-block; animation: hb-kf8-word .6s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-kf8-i) * 55ms); white-space: pre; }
.hb-kf8-word[data-hl="true"] { color: var(--hb-kf8-accent); }
.hb-kf8-again { margin-top: 28px; padding: 6px 0; border: 0; border-bottom: 1px solid currentColor; background: transparent; color: var(--hb-kf8-ink); font: inherit; font-size: 15px; cursor: pointer; animation: hb-kf8-in .4s 1s ease both; }
.hb-kf8-again:hover { color: var(--hb-kf8-accent); }
.hb-kf8-again:focus-visible { outline: 2px solid var(--hb-kf8-accent); outline-offset: 3px; }
.hb-kf8-details { display: grid; grid-template-columns: 1fr; gap: 0; margin: 0; border-top: 1px solid var(--hb-kf8-line); }
.hb-kf8-detail { display: grid; grid-template-columns: 110px 1fr; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--hb-kf8-line); font-size: 15px; line-height: 1.55; }
.hb-kf8-detail dt { color: var(--hb-kf8-muted); font-size: 13px; padding-top: 2px; }
.hb-kf8-detail dd { margin: 0; }
.hb-kf8-detail span { display: block; }
.hb-kf8-link { color: var(--hb-kf8-ink); text-decoration: underline; text-decoration-color: var(--hb-kf8-line); text-underline-offset: 4px; transition: text-decoration-color .2s ease, color .2s ease; border-radius: 2px; }
.hb-kf8-link:hover { color: var(--hb-kf8-accent); text-decoration-color: currentColor; }
.hb-kf8-link:focus-visible { outline: 2px solid var(--hb-kf8-accent); outline-offset: 3px; }
.hb-kf8-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (min-width: 880px) {
  .hb-kf8 { padding: 36px 40px 112px; }
  .hb-kf8-title { margin: 48px 0 40px; }
  .hb-kf8-grid { grid-template-columns: minmax(0, 1fr) 320px; gap: 80px; align-items: start; }
}
@container (max-width: 420px) {
  .hb-kf8-detail { grid-template-columns: 1fr; gap: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kf8-ch, .hb-kf8-word, .hb-kf8-errs li, .hb-kf8-again, .hb-kf8-avail i { animation: none; }
  .hb-kf8-fill, .hb-kf8-send, .hb-kf8-send::before, .hb-kf8-arrow, .hb-kf8-chip, .hb-kf8-link { transition: none; }
  .hb-kf8-spin { animation-duration: 2s; }
}
`;

const defaultSuggestions = ["start a new project", "redesign our website", "book a two-week sprint", "just say hello"];

const defaultDetails: ContactMinimalDetail[] = [
  { label: "Email", lines: [], link: { label: "hello@halden.studio", href: "mailto:hello@halden.studio" } },
  { label: "Studio", lines: ["Jægersborggade 41", "2200 Copenhagen N, Denmark"] },
  { label: "Phone", lines: [], link: { label: "+45 32 18 40 92", href: "tel:+4532184092" } },
  { label: "Elsewhere", lines: [], link: { label: "Read our journal", href: "#journal" } },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise((resolve) => setTimeout(resolve, 1000));
}

type Field = "name" | "company" | "intent" | "email";

export function ContactMinimalLight({
  studio = "Studio Halden",
  availability = "Booking projects from January 2027",
  title = "Let's",
  highlight = "talk.",
  suggestions = defaultSuggestions,
  details = defaultDetails,
  responseNote = "We reply within two working days.",
  onSubmit,
  accent = "#e5532d",
  className = "",
  style,
  ...rest
}: ContactMinimalLightProps) {
  const uid = React.useId();
  const [values, setValues] = React.useState<ContactMinimalValues>({ name: "", company: "", intent: "", email: "" });
  const [submitted, setSubmitted] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [failure, setFailure] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);
  const doneRef = React.useRef<HTMLParagraphElement>(null);
  const moved = React.useRef(false);

  React.useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    if (status === "success") doneRef.current?.focus();
    else formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }, [status]);

  const errors: Partial<Record<Field, string>> = {};
  if (!values.name.trim()) errors.name = "Tell us your name.";
  if (!values.intent.trim()) errors.intent = "Let us know what you'd like to do, or pick a suggestion.";
  if (!values.email.trim()) errors.email = "Add an email so we can write back.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "That email address looks incomplete.";
  const visible = submitted ? errors : {};
  const loading = status === "loading";

  function set(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function fill(field: Field, label: string, placeholder: string, extra?: Partial<React.InputHTMLAttributes<HTMLInputElement>>) {
    const value = values[field];
    const message = visible[field];
    return (
      <>
        <label className="hb-kf8-sr" htmlFor={`${uid}-${field}`}>
          {label}
        </label>
        <input
          id={`${uid}-${field}`}
          className="hb-kf8-fill"
          name={field}
          placeholder={placeholder}
          value={value}
          size={Math.max(value.length, placeholder.length, 4)}
          disabled={loading}
          onChange={(e) => set(field, e.target.value)}
          aria-invalid={message ? true : undefined}
          aria-describedby={message ? `${uid}-${field}-err` : undefined}
          {...extra}
        />
      </>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setSubmitted(true);
    setFailure("");
    const first = (["name", "intent", "email"] as Field[]).find((f) => errors[f]);
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      await wait(
        onSubmit?.({
          name: values.name.trim(),
          company: values.company.trim(),
          intent: values.intent.trim(),
          email: values.email.trim(),
        }),
      );
      moved.current = true;
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setFailure(error instanceof Error && error.message ? error.message : "Your note didn't send. Please try again.");
    }
  }

  function again() {
    moved.current = true;
    setValues((v) => ({ ...v, intent: "" }));
    setSubmitted(false);
    setStatus("idle");
  }

  const heading = `${title} `;
  const letters = [...heading, ...highlight];
  const firstName = values.name.trim().split(" ")[0];
  const doneWords = `Thank you, ${firstName}. We'll write to ${values.email.trim()} within two working days.`.split(" ");
  const vars = { "--hb-kf8-accent": accent, ...style } as React.CSSProperties;
  const errorList = (["name", "intent", "email"] as Field[]).filter((f) => visible[f]);

  return (
    <section className={`hb-kf8 ${className}`} style={vars} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-contact-minimal-light" precedence="default">{css}</style>
      <div className="hb-kf8-inner">
        <div className="hb-kf8-bar">
          <span>
            <strong>{studio}</strong> / Contact
          </span>
          {availability ? (
            <span className="hb-kf8-avail">
              <i aria-hidden="true" />
              {availability}
            </span>
          ) : null}
        </div>
        <h2 className="hb-kf8-title" id={`${uid}-title`} aria-label={`${title} ${highlight}`}>
          {letters.map((ch, i) => (
            <span key={i} className={`hb-kf8-ch${i >= heading.length ? " hb-kf8-hl" : ""}`} style={{ "--hb-kf8-i": i } as React.CSSProperties} aria-hidden="true">
              {ch}
            </span>
          ))}
        </h2>
        <div className="hb-kf8-grid">
          <div>
            {status === "success" ? (
              <div role="status">
                <p className="hb-kf8-done" ref={doneRef} tabIndex={-1}>
                  {doneWords.map((word, i) => (
                    <span key={i} className="hb-kf8-word" data-hl={i === 2 || word === values.email.trim() ? "true" : undefined} style={{ "--hb-kf8-i": i } as React.CSSProperties}>
                      {word}
                      {i < doneWords.length - 1 ? " " : ""}
                    </span>
                  ))}
                </p>
                <button type="button" className="hb-kf8-again" onClick={again}>
                  Write another note
                </button>
              </div>
            ) : (
              <form ref={formRef} className="hb-kf8-form" noValidate onSubmit={handleSubmit} aria-busy={loading || undefined}>
                <p className="hb-kf8-sentence">
                  Hi, I&apos;m {fill("name", "Your name", "your name", { autoComplete: "name" })} from {fill("company", "Company, optional", "your company", { autoComplete: "organization" })}, and I&apos;d like to{" "}
                  {fill("intent", "What you'd like to do", "start a project")}. You can reach me at{" "}
                  {fill("email", "Email address", "you@email.com", { type: "email", autoComplete: "email", inputMode: "email" })}.
                </p>
                {suggestions.length ? (
                  <ul className="hb-kf8-sugg" aria-label="Suggestions">
                    <li aria-hidden="true">Or pick one:</li>
                    {suggestions.map((s) => (
                      <li key={s}>
                        <button type="button" className="hb-kf8-chip" aria-pressed={values.intent === s} disabled={loading} onClick={() => set("intent", s)}>
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {errorList.length ? (
                  <ul className="hb-kf8-errs">
                    {errorList.map((f) => (
                      <li key={f} id={`${uid}-${f}-err`}>
                        {visible[f]}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {failure ? (
                  <p className="hb-kf8-alert" role="alert">
                    {failure}
                  </p>
                ) : null}
                <div className="hb-kf8-actions">
                  <button type="submit" className="hb-kf8-send" disabled={loading}>
                    {loading ? "Sending" : "Send message"}
                    <span className="hb-kf8-arrow" aria-hidden="true">
                      {loading ? (
                        <span className="hb-kf8-spin" />
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      )}
                    </span>
                  </button>
                  <span className="hb-kf8-note">{responseNote}</span>
                </div>
                <span className="hb-kf8-sr" role="status">
                  {loading ? "Sending your message" : ""}
                </span>
              </form>
            )}
          </div>
          {details.length ? (
            <dl className="hb-kf8-details">
              {details.map((detail) => (
                <div className="hb-kf8-detail" key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>
                    {detail.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                    {detail.link ? (
                      <a className="hb-kf8-link" href={detail.link.href}>
                        {detail.link.label}
                      </a>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}
