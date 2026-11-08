"use client";

import * as React from "react";

export interface FormContactTopic {
  id: string;
  label: string;
  reply: string;
  extra?: { name: string; label: string; placeholder: string; required?: boolean };
}

export interface FormContactValues {
  topic: string;
  name: string;
  email: string;
  message: string;
  extra: string;
}

export interface FormContactProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "title"> {
  title?: string;
  subtitle?: string;
  topics?: FormContactTopic[];
  defaultTopic?: string;
  minMessage?: number;
  maxMessage?: number;
  submitLabel?: string;
  accent?: string;
  delay?: number;
  onSubmit?: (values: FormContactValues) => void | Promise<void>;
}

const defaultTopics: FormContactTopic[] = [
  { id: "sales", label: "Sales", reply: "within 2 business hours", extra: { name: "company", label: "Company", placeholder: "Northwind Labs", required: true } },
  { id: "support", label: "Support", reply: "in about 40 minutes", extra: { name: "order", label: "Account email or order ID", placeholder: "ORD-20418" } },
  { id: "press", label: "Press", reply: "within one business day", extra: { name: "outlet", label: "Publication", placeholder: "The Verge", required: true } },
];

const css = `
.hb-xh1 {
  --hb-xh1-a: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  font-family: inherit;
  color: #ededed;
}
.hb-xh1 *, .hb-xh1 *::before, .hb-xh1 *::after { box-sizing: border-box; }
.hb-xh1-card {
  position: relative;
  overflow: hidden;
  padding: 22px;
  border: 1px solid #262626;
  border-radius: 18px;
  background: linear-gradient(180deg, #151515 0%, #101010 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 48px -24px rgba(0,0,0,0.8);
}
.hb-xh1-card::before {
  content: "";
  position: absolute;
  inset: -1px -1px auto;
  height: 120px;
  background: radial-gradient(60% 100% at 20% 0%, color-mix(in srgb, var(--hb-xh1-a) 16%, transparent), transparent 70%);
  pointer-events: none;
}
.hb-xh1-head { position: relative; margin-bottom: 16px; }
.hb-xh1-title { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; }
.hb-xh1-sub { margin: 4px 0 0; font-size: 13px; color: #9a9a9a; line-height: 1.45; }
.hb-xh1-topics {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--hb-xh1-n), 1fr);
  padding: 3px;
  margin-bottom: 16px;
  border: 1px solid #232323;
  border-radius: 12px;
  background: #0b0b0b;
}
.hb-xh1-thumb {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc((100% - 6px) / var(--hb-xh1-n));
  border-radius: 9px;
  background: linear-gradient(180deg, #232323, #1a1a1a);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.5);
  transform: translateX(calc(100% * var(--hb-xh1-i)));
  transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xh1-topic {
  position: relative;
  z-index: 1;
  height: 32px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
}
.hb-xh1-topic[aria-checked="true"] { color: #f5f5f5; }
.hb-xh1-topic:focus-visible { outline: 2px solid var(--hb-xh1-a); outline-offset: 1px; }
.hb-xh1-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@container (max-width: 360px) { .hb-xh1-row { grid-template-columns: 1fr; } }
.hb-xh1-form { container-type: inline-size; display: grid; gap: 12px; }
.hb-xh1-field { display: grid; gap: 6px; min-width: 0; }
.hb-xh1-label { display: flex; justify-content: space-between; font-size: 12px; font-weight: 500; color: #b5b5b5; }
.hb-xh1-label small { font-size: 11px; color: #6b6b6b; font-weight: 400; }
.hb-xh1-input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #262626;
  border-radius: 10px;
  background: #0c0c0c;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}
.hb-xh1-input::placeholder { color: #555; }
.hb-xh1-input:hover { border-color: #333; }
.hb-xh1-input:focus { border-color: var(--hb-xh1-a); background: #0e0e0e; box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xh1-a) 22%, transparent); }
.hb-xh1-input[aria-invalid="true"] { border-color: #f0525f; box-shadow: 0 0 0 3px rgba(240,82,95,0.14); }
.hb-xh1-area { height: 104px; padding: 10px 12px 26px; resize: none; line-height: 1.5; }
.hb-xh1-areawrap { position: relative; }
.hb-xh1-count {
  position: absolute;
  right: 10px;
  bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: #6b6b6b;
  pointer-events: none;
}
.hb-xh1-count svg { width: 16px; height: 16px; transform: rotate(-90deg); }
.hb-xh1-count circle { fill: none; stroke-width: 2.5; }
.hb-xh1-count .hb-xh1-track { stroke: #262626; }
.hb-xh1-count .hb-xh1-prog { stroke: var(--hb-xh1-c, #6b6b6b); stroke-linecap: round; transition: stroke-dashoffset 0.25s ease, stroke 0.25s ease; }
.hb-xh1-extra {
  display: grid;
  grid-template-rows: 1fr;
  animation: hb-xh1-swap 0.38s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xh1-err {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 12px;
  color: #ff8b95;
  animation: hb-xh1-drop 0.24s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xh1-err svg { width: 13px; height: 13px; flex: none; }
.hb-xh1-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 4px; }
.hb-xh1-eta { display: flex; align-items: center; gap: 7px; font-size: 12px; color: #8f8f8f; min-width: 0; }
.hb-xh1-eta b { color: #d6d6d6; font-weight: 500; }
.hb-xh1-dot { width: 7px; height: 7px; flex: none; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 0 3px rgba(61,220,132,0.16); animation: hb-xh1-pulse 2s ease-in-out infinite; }
.hb-xh1-send {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px 0 18px;
  border: 0;
  border-radius: 11px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xh1-a) 100%, #fff 14%), var(--hb-xh1-a));
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.28), 0 6px 18px -6px color-mix(in srgb, var(--hb-xh1-a) 70%, transparent);
  transition: transform 0.16s cubic-bezier(0.3, 0.7, 0.4, 1), filter 0.2s ease;
}
.hb-xh1-send:hover { filter: brightness(1.08); }
.hb-xh1-send:active { transform: translateY(1px) scale(0.98); }
.hb-xh1-send:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xh1-send[aria-busy="true"] { cursor: progress; }
.hb-xh1-send svg { width: 16px; height: 16px; transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh1-send:hover svg { transform: translate(2px, -2px); }
.hb-xh1-spin { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.35); border-top-color: #fff; border-radius: 50%; animation: hb-xh1-rot 0.7s linear infinite; }
.hb-xh1-banner { margin: 0; padding: 9px 12px; border: 1px solid rgba(240,82,95,0.35); border-radius: 10px; background: rgba(240,82,95,0.08); color: #ff9aa2; font-size: 12.5px; }
.hb-xh1-done { display: grid; justify-items: center; gap: 10px; padding: 18px 4px 6px; text-align: center; animation: hb-xh1-swap 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh1-plane { position: relative; width: 64px; height: 64px; display: grid; place-items: center; border-radius: 20px; background: radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--hb-xh1-a) 40%, #1a1a1a), #121212 70%); border: 1px solid #2a2a2a; box-shadow: inset 0 1px 0 rgba(255,255,255,0.08); }
.hb-xh1-plane svg { width: 30px; height: 30px; color: #fff; animation: hb-xh1-fly 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
.hb-xh1-done h3 { margin: 4px 0 0; font-size: 17px; font-weight: 600; letter-spacing: -0.01em; }
.hb-xh1-done p { margin: 0; font-size: 13px; color: #9a9a9a; line-height: 1.5; max-width: 300px; }
.hb-xh1-ticket { display: inline-flex; gap: 8px; align-items: center; padding: 6px 10px; border: 1px dashed #333; border-radius: 8px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: #cfcfcf; }
.hb-xh1-again { margin-top: 6px; height: 34px; padding: 0 14px; border: 1px solid #2a2a2a; border-radius: 10px; background: #161616; color: #d8d8d8; font: inherit; font-size: 13px; cursor: pointer; transition: background 0.2s ease, border-color 0.2s ease; }
.hb-xh1-again:hover { background: #1c1c1c; border-color: #383838; }
.hb-xh1-again:focus-visible { outline: 2px solid var(--hb-xh1-a); outline-offset: 2px; }
.hb-xh1-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-xh1-swap { from { opacity: 0; transform: translateY(8px); filter: blur(4px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes hb-xh1-drop { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh1-pulse { 0%, 100% { box-shadow: 0 0 0 3px rgba(61,220,132,0.16); } 50% { box-shadow: 0 0 0 5px rgba(61,220,132,0.06); } }
@keyframes hb-xh1-rot { to { transform: rotate(360deg); } }
@keyframes hb-xh1-fly { 0% { opacity: 0; transform: translate(-18px, 18px) scale(0.6) rotate(-12deg); } 60% { opacity: 1; transform: translate(3px, -3px) scale(1.05); } 100% { transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xh1 *, .hb-xh1 *::before, .hb-xh1 *::after { animation: none !important; transition: none !important; }
}
`;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function hashText(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function ErrIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.18" />
      <path d="M8 4.5v4M8 11h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function FormContact({
  title = "Talk to our team",
  subtitle = "Pick a topic and we will route you to the right person.",
  topics = defaultTopics,
  defaultTopic,
  minMessage = 20,
  maxMessage = 600,
  submitLabel = "Send message",
  accent = "#2f7bff",
  delay = 1100,
  onSubmit,
  className,
  style,
  ...rest
}: FormContactProps) {
  const uid = React.useId();
  const [topic, setTopic] = React.useState(defaultTopic ?? topics[0]?.id ?? "");
  const [values, setValues] = React.useState({ name: "", email: "", message: "", extra: "" });
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = React.useState("");
  const refs = React.useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const index = Math.max(0, topics.findIndex((t) => t.id === topic));
  const current = topics[index];

  const errors: Record<string, string> = {};
  if (values.name.trim().length < 2) errors.name = "Tell us your name.";
  if (!emailRe.test(values.email.trim())) errors.email = values.email ? "That email looks incomplete." : "We need an email to reply.";
  if (current?.extra?.required && !values.extra.trim()) errors.extra = `${current.extra.label} is required.`;
  if (values.message.trim().length < minMessage) errors.message = `A few more words, at least ${minMessage} characters.`;

  const show = (k: string) => touched[k] && errors[k];
  const len = values.message.length;
  const ratio = Math.min(1, len < minMessage ? len / minMessage : len / maxMessage);
  const ringColor = len < minMessage ? "#6b6b6b" : len > maxMessage * 0.9 ? "#f5a524" : "#3ddc84";
  const circ = 2 * Math.PI * 6;

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value.slice(0, k === "message" ? maxMessage : 200) }));
  const blur = (k: string) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    const keys = Object.keys(errors);
    if (keys.length) {
      setTouched({ name: true, email: true, extra: true, message: true });
      const order = ["name", "email", "extra", "message"];
      const first = order.find((k) => errors[k]);
      if (first) refs.current[first]?.focus();
      return;
    }
    setStatus("loading");
    setServerError("");
    try {
      await Promise.all([
        Promise.resolve(onSubmit?.({ topic, ...values, name: values.name.trim(), email: values.email.trim() })),
        new Promise((r) => window.setTimeout(r, delay)),
      ]);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error && err.message ? err.message : "We could not send that. Try again in a moment.");
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", message: "", extra: "" });
    setTouched({});
    setStatus("idle");
  };

  const ticket = `HB-${(hashText(values.email + values.message) % 900000 + 100000).toString()}`;

  const field = (k: "name" | "email" | "extra", label: string, placeholder: string, type = "text", auto?: string, hint?: string) => (
    <div className="hb-xh1-field">
      <label className="hb-xh1-label" htmlFor={`${uid}-${k}`}>
        {label}
        {hint ? <small>{hint}</small> : null}
      </label>
      <input
        ref={(el) => { refs.current[k] = el; }}
        id={`${uid}-${k}`}
        className="hb-xh1-input"
        type={type}
        autoComplete={auto}
        placeholder={placeholder}
        value={values[k]}
        onChange={set(k)}
        onBlur={blur(k)}
        aria-invalid={show(k) ? true : undefined}
        aria-describedby={show(k) ? `${uid}-${k}-e` : undefined}
      />
      {show(k) ? (
        <p className="hb-xh1-err" id={`${uid}-${k}-e`}>
          <ErrIcon />
          {errors[k]}
        </p>
      ) : null}
    </div>
  );

  return (
    <div
      className={["hb-xh1", className].filter(Boolean).join(" ")}
      style={{ ...style, "--hb-xh1-a": accent, "--hb-xh1-n": topics.length, "--hb-xh1-i": index } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-form-contact" precedence="default">{css}</style>
      <div className="hb-xh1-card">
        {status === "success" ? (
          <div className="hb-xh1-done" role="status">
            <div className="hb-xh1-plane">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
                <path d="M21 3 10 14" />
                <path d="M21 3 14.5 21l-4.5-7-7-4.5L21 3Z" />
              </svg>
            </div>
            <h3>Message sent</h3>
            <p>
              Thanks, {values.name.trim().split(" ")[0]}. The {current?.label.toLowerCase()} team usually replies {current?.reply}.
            </p>
            <span className="hb-xh1-ticket">Ticket {ticket}</span>
            <button type="button" className="hb-xh1-again" onClick={reset}>Send another message</button>
          </div>
        ) : (
          <>
            <div className="hb-xh1-head">
              <h3 className="hb-xh1-title">{title}</h3>
              <p className="hb-xh1-sub">{subtitle}</p>
            </div>
            <div className="hb-xh1-topics" role="radiogroup" aria-label="Topic">
              <span className="hb-xh1-thumb" aria-hidden="true" />
              {topics.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={t.id === topic}
                  tabIndex={t.id === topic ? 0 : -1}
                  className="hb-xh1-topic"
                  onClick={() => { setTopic(t.id); setValues((v) => ({ ...v, extra: "" })); }}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                    e.preventDefault();
                    const next = topics[(i + (e.key === "ArrowRight" ? 1 : topics.length - 1)) % topics.length];
                    setTopic(next.id);
                    setValues((v) => ({ ...v, extra: "" }));
                    const group = e.currentTarget.parentElement;
                    window.requestAnimationFrame(() => group?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus());
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <form className="hb-xh1-form" onSubmit={submit} noValidate>
              <div className="hb-xh1-row">
                {field("name", "Full name", "Maya Chen", "text", "name")}
                {field("email", "Work email", "maya@northwind.io", "email", "email")}
              </div>
              {current?.extra ? (
                <div className="hb-xh1-extra" key={current.id}>
                  {field("extra", current.extra.label, current.extra.placeholder, "text", undefined, current.extra.required ? undefined : "Optional")}
                </div>
              ) : null}
              <div className="hb-xh1-field">
                <label className="hb-xh1-label" htmlFor={`${uid}-message`}>How can we help?</label>
                <div className="hb-xh1-areawrap">
                  <textarea
                    ref={(el) => { refs.current.message = el; }}
                    id={`${uid}-message`}
                    className="hb-xh1-input hb-xh1-area"
                    placeholder="We are evaluating plans for a 40-person design team..."
                    value={values.message}
                    onChange={set("message")}
                    onBlur={blur("message")}
                    aria-invalid={show("message") ? true : undefined}
                    aria-describedby={`${uid}-message-c${show("message") ? ` ${uid}-message-e` : ""}`}
                  />
                  <span className="hb-xh1-count" id={`${uid}-message-c`} style={{ "--hb-xh1-c": ringColor } as React.CSSProperties}>
                    {len < minMessage ? `${minMessage - len} to go` : `${len}/${maxMessage}`}
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <circle className="hb-xh1-track" cx="8" cy="8" r="6" />
                      <circle className="hb-xh1-prog" cx="8" cy="8" r="6" strokeDasharray={circ.toFixed(2)} strokeDashoffset={(circ * (1 - ratio)).toFixed(2)} />
                    </svg>
                  </span>
                </div>
                {show("message") ? (
                  <p className="hb-xh1-err" id={`${uid}-message-e`}>
                    <ErrIcon />
                    {errors.message}
                  </p>
                ) : null}
              </div>
              {status === "error" ? <p className="hb-xh1-banner" role="alert">{serverError}</p> : null}
              <div className="hb-xh1-foot">
                <span className="hb-xh1-eta">
                  <span className="hb-xh1-dot" aria-hidden="true" />
                  <span>Replies <b>{current?.reply}</b></span>
                </span>
                <button type="submit" className="hb-xh1-send" aria-busy={status === "loading"}>
                  {status === "loading" ? <span className="hb-xh1-spin" aria-hidden="true" /> : null}
                  {status === "loading" ? "Sending" : submitLabel}
                  {status === "loading" ? null : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
