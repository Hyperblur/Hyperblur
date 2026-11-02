"use client";

import * as React from "react";

export interface ContactSplitFormLink {
  label: string;
  href: string;
}

export interface ContactSplitFormMethod {
  icon: "email" | "chat" | "calendar" | "phone";
  title: string;
  description: string;
  status?: string;
  action: ContactSplitFormLink;
}

export interface ContactSplitFormValues {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
}

export interface ContactSplitFormProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  methods?: ContactSplitFormMethod[];
  topics?: string[];
  maxLength?: number;
  responseNote?: string;
  onSubmit?: (values: ContactSplitFormValues) => void | Promise<unknown>;
  accent?: string;
}

const css = `
@property --hb-kf5-angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
@keyframes hb-kf5-beam { to { --hb-kf5-angle: 360deg; } }
@keyframes hb-kf5-ping {
  0% { transform: scale(1); opacity: .7; }
  100% { transform: scale(2.6); opacity: 0; }
}
@keyframes hb-kf5-rise {
  from { opacity: 0; translate: 0 14px; }
  to { opacity: 1; translate: 0 0; }
}
@keyframes hb-kf5-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-kf5-spin { to { transform: rotate(360deg); } }
@keyframes hb-kf5-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-kf5-pop {
  0% { opacity: 0; transform: scale(.5); }
  70% { transform: scale(1.06); }
  100% { opacity: 1; transform: scale(1); }
}
.hb-kf5 {
  --hb-kf5-accent: #ff6b4a;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 72px 16px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kf5 *, .hb-kf5 *::before, .hb-kf5 *::after { box-sizing: border-box; }
.hb-kf5::before {
  content: "";
  position: absolute;
  right: -10%;
  bottom: -30%;
  z-index: -1;
  width: 70%;
  height: 90%;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kf5-accent) 13%, transparent), transparent);
}
.hb-kf5-inner { display: grid; grid-template-columns: 1fr; gap: 44px; max-width: 1120px; margin: 0 auto; }
.hb-kf5-left { display: flex; flex-direction: column; min-width: 0; }
.hb-kf5-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 16px; color: var(--hb-kf5-accent); font-size: 13px; font-weight: 600; }
.hb-kf5-eyebrow::before { content: ""; width: 18px; height: 1px; background: currentColor; }
.hb-kf5-title { margin: 0; max-width: 14ch; font-size: clamp(32px, 6cqw, 52px); font-weight: 650; line-height: 1.02; letter-spacing: -.04em; text-wrap: balance; }
.hb-kf5-sub { max-width: 440px; margin: 16px 0 32px; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-kf5-methods { display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 0; list-style: none; }
.hb-kf5-method {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .03), rgba(255, 255, 255, .01));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  animation: hb-kf5-rise .6s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(var(--hb-kf5-i) * 90ms);
  transition: border-color .25s ease, transform .25s ease, background .25s ease;
}
.hb-kf5-method:hover { border-color: color-mix(in srgb, var(--hb-kf5-accent) 40%, rgba(255, 255, 255, .08)); background: rgba(255, 255, 255, .035); transform: translateX(4px); }
.hb-kf5-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 12px;
  background: linear-gradient(160deg, #1d1d1d, #121212);
  color: var(--hb-kf5-accent);
}
.hb-kf5-mbody { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.hb-kf5-mtitle { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; }
.hb-kf5-mdesc { color: #8f8f8f; font-size: 13px; line-height: 1.45; }
.hb-kf5-status { display: inline-flex; align-items: center; gap: 6px; padding: 2px 8px; border-radius: 999px; background: rgba(74, 222, 128, .1); color: #86efac; font-size: 11px; font-weight: 550; }
.hb-kf5-dot { position: relative; width: 6px; height: 6px; border-radius: 50%; background: #4ade80; }
.hb-kf5-dot::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: #4ade80; animation: hb-kf5-ping 1.8s ease-out infinite; }
.hb-kf5-mlink {
  justify-self: start;
  margin-top: 6px;
  color: #ededed;
  font-size: 13px;
  font-weight: 550;
  text-decoration: none;
  border-radius: 4px;
}
.hb-kf5-mlink::after { content: ""; position: absolute; inset: 0; border-radius: 16px; }
.hb-kf5-mlink span { display: inline-block; transition: transform .2s ease; }
.hb-kf5-method:hover .hb-kf5-mlink span { transform: translateX(3px); }
.hb-kf5-mlink:focus-visible { outline: none; }
.hb-kf5-mlink:focus-visible::after { outline: 2px solid var(--hb-kf5-accent); outline-offset: 2px; }
.hb-kf5-shell {
  position: relative;
  min-width: 0;
  padding: 1px;
  border-radius: 24px;
  background: conic-gradient(from var(--hb-kf5-angle), rgba(255, 255, 255, .08) 0deg, rgba(255, 255, 255, .08) 250deg, var(--hb-kf5-accent) 310deg, #ffd2c4 330deg, rgba(255, 255, 255, .08) 360deg);
  animation: hb-kf5-beam 6s linear infinite;
}
.hb-kf5-card {
  position: relative;
  height: 100%;
  padding: 24px 20px;
  border-radius: 23px;
  background: linear-gradient(180deg, #131313, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
}
.hb-kf5-form { display: grid; grid-template-columns: 1fr; gap: 16px; margin: 0; }
.hb-kf5-field { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
.hb-kf5-field[data-wide="true"] { grid-column: 1 / -1; }
.hb-kf5-lrow { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.hb-kf5-label { font-size: 13px; font-weight: 550; color: #d4d4d4; }
.hb-kf5-opt { color: #6f6f6f; font-size: 12px; font-weight: 400; }
.hb-kf5-input, .hb-kf5-select, .hb-kf5-area {
  display: block;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 12px;
  background: #0a0a0a;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color .18s ease, box-shadow .18s ease;
}
.hb-kf5-input, .hb-kf5-select { height: 44px; padding: 0 14px; }
.hb-kf5-select {
  appearance: none;
  padding-right: 38px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%238f8f8f' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 4.5 6 7.5l3-3'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  cursor: pointer;
}
.hb-kf5-select option { background: #111; color: #ededed; }
.hb-kf5-area { min-height: 132px; padding: 12px 14px; line-height: 1.55; resize: vertical; }
.hb-kf5-input::placeholder, .hb-kf5-area::placeholder { color: #565656; }
.hb-kf5-input:hover, .hb-kf5-select:hover, .hb-kf5-area:hover { border-color: rgba(255, 255, 255, .18); }
.hb-kf5-input:focus, .hb-kf5-select:focus, .hb-kf5-area:focus { border-color: var(--hb-kf5-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kf5-accent) 20%, transparent); }
.hb-kf5 [aria-invalid="true"] { border-color: #f87171; }
.hb-kf5 [aria-invalid="true"]:focus { box-shadow: 0 0 0 4px rgba(248, 113, 113, .18); }
.hb-kf5-count { color: #6f6f6f; font-size: 12px; font-variant-numeric: tabular-nums; transition: color .2s ease; }
.hb-kf5-count[data-tone="warn"] { color: #fbbf24; }
.hb-kf5-count[data-tone="over"] { color: #f87171; }
.hb-kf5-bar { height: 2px; overflow: hidden; border-radius: 2px; background: rgba(255, 255, 255, .06); }
.hb-kf5-bar i { display: block; height: 100%; background: var(--hb-kf5-accent); transform-origin: left; transition: transform .2s ease, background .2s ease; }
.hb-kf5-bar[data-tone="warn"] i { background: #fbbf24; }
.hb-kf5-bar[data-tone="over"] i { background: #f87171; }
.hb-kf5-err { margin: 0; color: #fca5a5; font-size: 12px; animation: hb-kf5-in .2s ease both; }
.hb-kf5-submit-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; grid-column: 1 / -1; margin-top: 4px; }
.hb-kf5-note { display: inline-flex; align-items: center; gap: 8px; color: #8f8f8f; font-size: 13px; }
.hb-kf5-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 46px;
  padding: 0 22px;
  border: 0;
  border-radius: 999px;
  background: var(--hb-kf5-accent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 12px 30px -12px var(--hb-kf5-accent);
  color: #1f0802;
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  transition: filter .2s ease, transform .2s ease;
}
.hb-kf5-btn:hover:not(:disabled) { filter: brightness(1.08); }
.hb-kf5-btn:active:not(:disabled) { transform: translateY(1px); }
.hb-kf5-btn:disabled { cursor: progress; opacity: .85; }
.hb-kf5-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-kf5-btn svg { transition: transform .2s ease; }
.hb-kf5-btn:hover:not(:disabled) svg { transform: translate(2px, -2px); }
.hb-kf5-spin { width: 15px; height: 15px; border: 2px solid rgba(31, 8, 2, .3); border-top-color: #1f0802; border-radius: 50%; animation: hb-kf5-spin .7s linear infinite; }
.hb-kf5-alert { grid-column: 1 / -1; margin: 0; padding: 10px 12px; border: 1px solid rgba(248, 113, 113, .3); border-radius: 10px; background: rgba(248, 113, 113, .08); color: #fecaca; font-size: 13px; }
.hb-kf5-done { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; min-height: 420px; padding: 24px; text-align: center; animation: hb-kf5-in .4s ease both; }
.hb-kf5-ok {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--hb-kf5-accent) 16%, transparent);
  box-shadow: 0 0 0 10px color-mix(in srgb, var(--hb-kf5-accent) 6%, transparent);
  color: var(--hb-kf5-accent);
  animation: hb-kf5-pop .5s cubic-bezier(.2, .9, .3, 1.2) both;
}
.hb-kf5-ok path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-kf5-draw .4s .25s ease forwards; }
.hb-kf5-done h3 { margin: 0; font-size: 24px; font-weight: 650; letter-spacing: -.02em; outline: none; }
.hb-kf5-done p { max-width: 360px; margin: 0 0 12px; color: #8f8f8f; font-size: 14px; line-height: 1.6; }
.hb-kf5-done strong { color: #ededed; font-weight: 550; overflow-wrap: anywhere; }
.hb-kf5-ghost { height: 40px; padding: 0 18px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 999px; background: transparent; color: #ededed; font: inherit; font-size: 13px; cursor: pointer; }
.hb-kf5-ghost:hover { background: rgba(255, 255, 255, .05); }
.hb-kf5-ghost:focus-visible { outline: 2px solid var(--hb-kf5-accent); outline-offset: 2px; }
.hb-kf5-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (min-width: 560px) {
  .hb-kf5-form { grid-template-columns: 1fr 1fr; }
  .hb-kf5-card { padding: 32px; }
}
@container (min-width: 900px) {
  .hb-kf5 { padding: 112px 32px; }
  .hb-kf5-inner { grid-template-columns: .9fr 1.1fr; gap: 64px; align-items: start; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kf5-shell, .hb-kf5-method, .hb-kf5-dot::after, .hb-kf5-err, .hb-kf5-done, .hb-kf5-ok, .hb-kf5-ok path { animation: none; }
  .hb-kf5-ok path { stroke-dashoffset: 0; }
  .hb-kf5-method, .hb-kf5-input, .hb-kf5-select, .hb-kf5-area, .hb-kf5-btn, .hb-kf5-btn svg, .hb-kf5-bar i, .hb-kf5-mlink span { transition: none; }
  .hb-kf5-spin { animation-duration: 2s; }
}
`;

const defaultMethods: ContactSplitFormMethod[] = [
  {
    icon: "email",
    title: "Email support",
    description: "support@northwind.io, answered within 4 hours on weekdays.",
    action: { label: "Write to us", href: "mailto:support@northwind.io" },
  },
  {
    icon: "chat",
    title: "Live chat",
    description: "Talk to an engineer, Monday to Friday, 8:00 to 20:00 CET.",
    status: "3 online",
    action: { label: "Start a chat", href: "#chat" },
  },
  {
    icon: "calendar",
    title: "Office hours",
    description: "Open video call every Tuesday at 16:00 CET. Bring your questions.",
    action: { label: "Book a slot", href: "#office-hours" },
  },
];

const defaultTopics = ["Sales and pricing", "Technical support", "Partnerships", "Billing", "Press", "Something else"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise((resolve) => setTimeout(resolve, 1000));
}

function MethodIcon({ icon }: { icon: ContactSplitFormMethod["icon"] }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (icon === "chat") {
    return (
      <svg {...common}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5v-9Z" />
        <path d="M8.5 9.5h.01M12 9.5h.01M15.5 9.5h.01" strokeWidth="2.4" />
      </svg>
    );
  }
  if (icon === "calendar") {
    return (
      <svg {...common}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4M8 14h3" />
      </svg>
    );
  }
  if (icon === "phone") {
    return (
      <svg {...common}>
        <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function ContactSplitForm({
  eyebrow = "Contact",
  title = "Talk to the people who build it",
  subtitle = "No ticket mazes and no bots. Every message lands with someone on the Northwind team who can actually fix things.",
  methods = defaultMethods,
  topics = defaultTopics,
  maxLength = 1000,
  responseNote = "We reply within one business day",
  onSubmit,
  accent = "#ff6b4a",
  className = "",
  style,
  ...rest
}: ContactSplitFormProps) {
  const uid = React.useId();
  const [values, setValues] = React.useState<ContactSplitFormValues>({ name: "", email: "", company: "", topic: "", message: "" });
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [formError, setFormError] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);
  const doneRef = React.useRef<HTMLHeadingElement>(null);
  const moved = React.useRef(false);

  React.useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    if (status === "success") doneRef.current?.focus();
    else formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }, [status]);

  const length = values.message.length;
  const errors: Partial<Record<keyof ContactSplitFormValues, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Tell us your name.";
  if (!values.email.trim()) errors.email = "Enter an email so we can reply.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "That email looks incomplete.";
  if (!values.topic) errors.topic = "Pick the topic closest to your question.";
  if (values.message.trim().length < 20) errors.message = "Add a little more detail, at least 20 characters.";
  else if (length > maxLength) errors.message = `Keep it under ${maxLength} characters.`;

  const tone = length > maxLength ? "over" : length > maxLength * 0.9 ? "warn" : undefined;
  const loading = status === "loading";

  function set<K extends keyof ContactSplitFormValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function shown(key: keyof ContactSplitFormValues) {
    return (touched[key] || submitted) && errors[key] ? errors[key] : "";
  }

  function a11y(key: keyof ContactSplitFormValues, extra?: string) {
    const message = shown(key);
    const ids = [message ? `${uid}-${key}-err` : "", extra ?? ""].filter(Boolean).join(" ");
    return { "aria-invalid": message ? true : undefined, "aria-describedby": ids || undefined } as const;
  }

  function blur(key: keyof ContactSplitFormValues) {
    return () => setTouched((t) => ({ ...t, [key]: true }));
  }

  function errorText(key: keyof ContactSplitFormValues) {
    const message = shown(key);
    return message ? (
      <p className="hb-kf5-err" id={`${uid}-${key}-err`}>
        {message}
      </p>
    ) : null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setSubmitted(true);
    setFormError("");
    if (Object.keys(errors).length) {
      window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setStatus("loading");
    try {
      await wait(
        onSubmit?.({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          topic: values.topic,
          message: values.message.trim(),
        }),
      );
      moved.current = true;
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setFormError(error instanceof Error && error.message ? error.message : "Your message didn't go through. Please try again.");
    }
  }

  function reset() {
    moved.current = true;
    setValues({ name: values.name, email: values.email, company: values.company, topic: "", message: "" });
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
  }

  const vars = { "--hb-kf5-accent": accent, ...style } as React.CSSProperties;
  const firstName = values.name.trim().split(" ")[0];

  return (
    <section className={`hb-kf5 ${className}`} style={vars} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-contact-split-form" precedence="default">{css}</style>
      <div className="hb-kf5-inner">
        <div className="hb-kf5-left">
          {eyebrow ? <p className="hb-kf5-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-kf5-title" id={`${uid}-title`}>
            {title}
          </h2>
          {subtitle ? <p className="hb-kf5-sub">{subtitle}</p> : null}
          <ul className="hb-kf5-methods">
            {methods.map((method, i) => (
              <li className="hb-kf5-method" key={method.title} style={{ "--hb-kf5-i": i } as React.CSSProperties}>
                <span className="hb-kf5-icon">
                  <MethodIcon icon={method.icon} />
                </span>
                <span className="hb-kf5-mbody">
                  <span className="hb-kf5-mtitle">
                    {method.title}
                    {method.status ? (
                      <span className="hb-kf5-status">
                        <span className="hb-kf5-dot" aria-hidden="true" />
                        {method.status}
                      </span>
                    ) : null}
                  </span>
                  <span className="hb-kf5-mdesc">{method.description}</span>
                  <a className="hb-kf5-mlink" href={method.action.href}>
                    {method.action.label} <span aria-hidden="true">&rarr;</span>
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hb-kf5-shell">
          <div className="hb-kf5-card">
            {status === "success" ? (
              <div className="hb-kf5-done" role="status">
                <span className="hb-kf5-ok" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <h3 ref={doneRef} tabIndex={-1}>
                  Message sent{firstName ? `, ${firstName}` : ""}
                </h3>
                <p>
                  Thanks for reaching out about {values.topic.toLowerCase()}. We&apos;ll reply to <strong>{values.email.trim()}</strong> within one business day.
                </p>
                <button type="button" className="hb-kf5-ghost" onClick={reset}>
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} className="hb-kf5-form" noValidate onSubmit={handleSubmit} aria-busy={loading || undefined}>
                {formError ? (
                  <p className="hb-kf5-alert" role="alert">
                    {formError}
                  </p>
                ) : null}
                <div className="hb-kf5-field">
                  <label className="hb-kf5-label" htmlFor={`${uid}-name`}>
                    Full name
                  </label>
                  <input id={`${uid}-name`} className="hb-kf5-input" autoComplete="name" placeholder="Maya Lindqvist" value={values.name} disabled={loading} onChange={(e) => set("name", e.target.value)} onBlur={blur("name")} {...a11y("name")} />
                  {errorText("name")}
                </div>
                <div className="hb-kf5-field">
                  <label className="hb-kf5-label" htmlFor={`${uid}-email`}>
                    Work email
                  </label>
                  <input id={`${uid}-email`} className="hb-kf5-input" type="email" autoComplete="email" placeholder="maya@company.com" value={values.email} disabled={loading} onChange={(e) => set("email", e.target.value)} onBlur={blur("email")} {...a11y("email")} />
                  {errorText("email")}
                </div>
                <div className="hb-kf5-field">
                  <div className="hb-kf5-lrow">
                    <label className="hb-kf5-label" htmlFor={`${uid}-company`}>
                      Company
                    </label>
                    <span className="hb-kf5-opt">Optional</span>
                  </div>
                  <input id={`${uid}-company`} className="hb-kf5-input" autoComplete="organization" placeholder="Fernhill Studio" value={values.company} disabled={loading} onChange={(e) => set("company", e.target.value)} />
                </div>
                <div className="hb-kf5-field">
                  <label className="hb-kf5-label" htmlFor={`${uid}-topic`}>
                    Topic
                  </label>
                  <select id={`${uid}-topic`} className="hb-kf5-select" value={values.topic} disabled={loading} onChange={(e) => set("topic", e.target.value)} onBlur={blur("topic")} {...a11y("topic")}>
                    <option value="" disabled>
                      Choose a topic
                    </option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                  {errorText("topic")}
                </div>
                <div className="hb-kf5-field" data-wide="true">
                  <div className="hb-kf5-lrow">
                    <label className="hb-kf5-label" htmlFor={`${uid}-message`}>
                      How can we help?
                    </label>
                    <span className="hb-kf5-count" id={`${uid}-count`} data-tone={tone}>
                      {length} / {maxLength}
                    </span>
                  </div>
                  <textarea
                    id={`${uid}-message`}
                    className="hb-kf5-area"
                    placeholder="We're moving 40 projects from another tool and want to keep our history. What does migration look like?"
                    value={values.message}
                    disabled={loading}
                    onChange={(e) => set("message", e.target.value)}
                    onBlur={blur("message")}
                    {...a11y("message", `${uid}-count`)}
                  />
                  <div className="hb-kf5-bar" data-tone={tone} aria-hidden="true">
                    <i style={{ transform: `scaleX(${Math.min(1, length / maxLength).toFixed(3)})` }} />
                  </div>
                  {errorText("message")}
                </div>
                <div className="hb-kf5-submit-row">
                  <span className="hb-kf5-note">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                      <circle cx="8" cy="8" r="6" />
                      <path d="M8 5v3l2 1.5" />
                    </svg>
                    {responseNote}
                  </span>
                  <button type="submit" className="hb-kf5-btn" disabled={loading}>
                    {loading ? <span className="hb-kf5-spin" aria-hidden="true" /> : null}
                    {loading ? "Sending" : "Send message"}
                    {loading ? null : (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
                      </svg>
                    )}
                  </button>
                </div>
                <span className="hb-kf5-sr" role="status">
                  {loading ? "Sending your message" : ""}
                </span>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
