"use client";

import * as React from "react";

export type ContactChannel = "email" | "callback" | "video" | "chat";

export interface ContactChannelOption {
  id: ContactChannel;
  label: string;
  note: string;
}

export interface ContactChannelPickerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  channels?: ContactChannelOption[];
  defaultChannel?: ContactChannel;
  days?: string[];
  slots?: string[];
  agentName?: string;
  onChannelChange?: (channel: ContactChannel) => void;
  onSubmit?: (channel: ContactChannel, values: Record<string, string>) => void | Promise<void>;
  accent?: string;
}

const defaultChannels: ContactChannelOption[] = [
  { id: "email", label: "Email", note: "Reply in about 4 hours" },
  { id: "callback", label: "Call me back", note: "Within one business day" },
  { id: "video", label: "Video call", note: "30 minutes, your pick" },
  { id: "chat", label: "Live chat", note: "2 people online now" },
];

const css = `
@keyframes hb-wd2-in { from { opacity: 0; transform: translateY(10px); filter: blur(4px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes hb-wd2-type { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-3px); opacity: 1; } }
@keyframes hb-wd2-spin { to { transform: rotate(360deg); } }
@keyframes hb-wd2-pop { 0% { transform: scale(0.6); opacity: 0; } 70% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); } }
.hb-wd2 {
  --hb-wd2-accent: #f05d3b;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: #17171a;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wd2 *, .hb-wd2 *::before, .hb-wd2 *::after { box-sizing: border-box; }
.hb-wd2-in { max-width: 1120px; margin: 0 auto; padding: 76px 20px 92px; display: grid; gap: 36px; }
@container (min-width: 900px) { .hb-wd2-in { grid-template-columns: 0.85fr 1.15fr; gap: 64px; align-items: start; } }
.hb-wd2-eyebrow { font: 500 12px/1 var(--font-mono, monospace); letter-spacing: 0.08em; text-transform: uppercase; color: var(--hb-wd2-accent); }
.hb-wd2-title { margin: 14px 0 14px; font: 600 clamp(32px, 5cqw, 52px)/1.02 var(--font-grotesk, inherit); letter-spacing: -0.035em; }
.hb-wd2-sub { margin: 0; font-size: 15.5px; line-height: 1.6; color: #5d5b55; max-width: 40ch; }
.hb-wd2-facts { list-style: none; margin: 28px 0 0; padding: 0; display: grid; gap: 10px; }
.hb-wd2-facts li { display: flex; gap: 10px; align-items: center; font-size: 13.5px; color: #3b3a36; }
.hb-wd2-facts svg { width: 16px; height: 16px; color: var(--hb-wd2-accent); flex: none; }
.hb-wd2-card { border-radius: 22px; background: #fff; border: 1px solid rgba(23,23,26,0.08); box-shadow: 0 1px 0 rgba(255,255,255,0.8) inset, 0 30px 60px -30px rgba(40,30,10,0.25), 0 2px 6px rgba(40,30,10,0.04); padding: 10px; }
.hb-wd2-picker { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; padding: 4px; border-radius: 16px; background: #f1efe8; }
@container (min-width: 620px) { .hb-wd2-picker { grid-template-columns: repeat(4, 1fr); } }
.hb-wd2-ind { position: absolute; left: 4px; top: 4px; width: calc((100% - 12px) / 2); height: calc((100% - 12px) / 2); border-radius: 12px; background: #fff; box-shadow: 0 6px 16px -6px rgba(40,30,10,0.25), 0 0 0 1px rgba(23,23,26,0.06); transform: translate(calc(var(--hb-wd2-cx) * (100% + 4px)), calc(var(--hb-wd2-cy) * (100% + 4px))); transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.5, 1); }
@container (min-width: 620px) { .hb-wd2-ind { width: calc((100% - 20px) / 4); height: calc(100% - 8px); transform: translateX(calc(var(--hb-wd2-i) * (100% + 4px))); } }
.hb-wd2-opt { position: relative; z-index: 1; appearance: none; border: 0; background: transparent; text-align: left; padding: 12px 12px 13px; border-radius: 12px; cursor: pointer; font-family: inherit; color: #6b6963; display: grid; gap: 8px; transition: color 0.25s ease; }
.hb-wd2-opt:hover { color: #17171a; }
.hb-wd2-opt[aria-checked="true"] { color: #17171a; }
.hb-wd2-opt:focus-visible { outline: 2px solid var(--hb-wd2-accent); outline-offset: -2px; }
.hb-wd2-opt-ic { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; background: rgba(23,23,26,0.05); transition: background-color 0.3s ease, color 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.5, 0.5, 1); }
.hb-wd2-opt[aria-checked="true"] .hb-wd2-opt-ic { background: var(--hb-wd2-accent); color: #fff; transform: rotate(-8deg); }
.hb-wd2-opt-ic svg { width: 16px; height: 16px; }
.hb-wd2-opt strong { font-size: 13.5px; font-weight: 600; }
.hb-wd2-opt small { display: block; font-size: 11.5px; color: #8a877f; margin-top: 2px; }
.hb-wd2-panel { padding: 22px 18px 18px; display: grid; gap: 14px; animation: hb-wd2-in 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.hb-wd2-row { display: grid; gap: 12px; }
@container (min-width: 520px) { .hb-wd2-row { grid-template-columns: 1fr 1fr; } }
.hb-wd2-field { display: grid; gap: 6px; }
.hb-wd2-field > label, .hb-wd2-legend { font-size: 12px; font-weight: 600; color: #4a4843; }
.hb-wd2-input { width: 100%; padding: 11px 13px; border-radius: 11px; border: 1px solid rgba(23,23,26,0.12); background: #fbfaf7; color: #17171a; font: 400 14px/1.4 inherit; font-family: inherit; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease; resize: none; }
.hb-wd2-input::placeholder { color: #a8a59c; }
.hb-wd2-input:focus { background: #fff; border-color: var(--hb-wd2-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-wd2-accent) 14%, transparent); }
.hb-wd2-input[aria-invalid="true"] { border-color: #dc2626; }
.hb-wd2-chips { display: flex; flex-wrap: wrap; gap: 6px; border: 0; padding: 0; margin: 0; }
.hb-wd2-chip { appearance: none; border: 1px solid rgba(23,23,26,0.12); background: #fbfaf7; border-radius: 999px; padding: 8px 13px; font: 500 12.5px/1 inherit; font-family: inherit; color: #3b3a36; cursor: pointer; transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease; }
.hb-wd2-chip:hover { border-color: rgba(23,23,26,0.3); }
.hb-wd2-chip:active { transform: scale(0.96); }
.hb-wd2-chip[aria-pressed="true"] { background: #17171a; border-color: #17171a; color: #fff; }
.hb-wd2-chip:focus-visible { outline: 2px solid var(--hb-wd2-accent); outline-offset: 2px; }
.hb-wd2-days { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
.hb-wd2-day { appearance: none; border: 1px solid rgba(23,23,26,0.1); background: #fbfaf7; border-radius: 12px; padding: 9px 4px; display: grid; justify-items: center; gap: 2px; cursor: pointer; font-family: inherit; color: #3b3a36; transition: all 0.2s ease; }
.hb-wd2-day span { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: #8a877f; }
.hb-wd2-day b { font: 600 17px/1.1 var(--font-grotesk, inherit); }
.hb-wd2-day[aria-pressed="true"] { background: var(--hb-wd2-accent); border-color: var(--hb-wd2-accent); color: #fff; box-shadow: 0 8px 18px -8px var(--hb-wd2-accent); }
.hb-wd2-day[aria-pressed="true"] span { color: rgba(255,255,255,0.8); }
.hb-wd2-day:focus-visible { outline: 2px solid #17171a; outline-offset: 2px; }
.hb-wd2-thread { display: grid; gap: 8px; padding: 14px; border-radius: 14px; background: #f6f4ee; border: 1px solid rgba(23,23,26,0.06); }
.hb-wd2-msg { display: flex; gap: 8px; align-items: flex-end; max-width: 88%; }
.hb-wd2-msg p { margin: 0; padding: 9px 12px; border-radius: 14px 14px 14px 4px; background: #fff; font-size: 13px; line-height: 1.45; box-shadow: 0 1px 2px rgba(40,30,10,0.06); }
.hb-wd2-av { flex: none; width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; font: 600 10.5px/1 inherit; color: #fff; background: linear-gradient(135deg, var(--hb-wd2-accent), #f59e0b); }
.hb-wd2-typing { display: inline-flex; gap: 3px; padding: 11px 12px; border-radius: 14px 14px 14px 4px; background: #fff; }
.hb-wd2-typing i { width: 5px; height: 5px; border-radius: 50%; background: #8a877f; font-style: normal; animation: hb-wd2-type 1.1s ease-in-out infinite; }
.hb-wd2-typing i:nth-child(2) { animation-delay: 0.15s; }
.hb-wd2-typing i:nth-child(3) { animation-delay: 0.3s; }
.hb-wd2-foot { display: flex; align-items: center; gap: 12px; justify-content: space-between; flex-wrap: wrap; padding-top: 4px; }
.hb-wd2-hint { font-size: 12px; color: #8a877f; }
.hb-wd2-send { appearance: none; border: 0; height: 44px; padding: 0 20px; display: inline-flex; align-items: center; gap: 8px; border-radius: 999px; background: #17171a; color: #fff; font: 600 14px/1 inherit; font-family: inherit; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), 0 10px 22px -12px rgba(23,23,26,0.6); transition: transform 0.25s cubic-bezier(0.34, 1.4, 0.5, 1), background-color 0.2s ease; }
.hb-wd2-send:hover { background: #000; }
.hb-wd2-send:hover svg { transform: translateX(3px); }
.hb-wd2-send svg { width: 15px; height: 15px; transition: transform 0.25s ease; }
.hb-wd2-send:active { transform: scale(0.97); }
.hb-wd2-send:disabled { cursor: progress; opacity: 0.85; }
.hb-wd2-send:focus-visible { outline: 2px solid var(--hb-wd2-accent); outline-offset: 3px; }
.hb-wd2-spin { width: 15px; height: 15px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; animation: hb-wd2-spin 0.7s linear infinite; }
.hb-wd2-done { display: grid; justify-items: start; gap: 10px; padding: 30px 18px 22px; animation: hb-wd2-in 0.45s ease both; }
.hb-wd2-done-ic { width: 44px; height: 44px; border-radius: 14px; display: grid; place-items: center; background: var(--hb-wd2-accent); color: #fff; animation: hb-wd2-pop 0.5s cubic-bezier(0.34, 1.5, 0.5, 1) both; }
.hb-wd2-done-ic svg { width: 22px; height: 22px; }
.hb-wd2-done strong { font: 600 20px/1.2 var(--font-grotesk, inherit); letter-spacing: -0.02em; }
.hb-wd2-done p { margin: 0; color: #5d5b55; font-size: 14px; line-height: 1.55; max-width: 44ch; }
.hb-wd2-reset { appearance: none; background: none; border: 0; padding: 0; color: #17171a; font: 600 13px inherit; font-family: inherit; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.hb-wd2-err { font-size: 11.5px; color: #dc2626; }
@media (prefers-reduced-motion: reduce) {
  .hb-wd2 *, .hb-wd2 *::before, .hb-wd2 *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition: none !important; }
}
`;

function ChannelIcon({ id }: { id: ContactChannel }) {
  const p = { viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (id === "email") return (<svg {...p}><rect x="1.8" y="3.2" width="12.4" height="9.6" rx="2" /><path d="M2.4 4.4L8 8.6l5.6-4.2" /></svg>);
  if (id === "callback") return (<svg {...p}><path d="M3.2 2.2h2.4l1.2 3-1.6 1a7.6 7.6 0 0 0 4.6 4.6l1-1.6 3 1.2v2.4a1.4 1.4 0 0 1-1.4 1.4A11.6 11.6 0 0 1 1.8 3.6a1.4 1.4 0 0 1 1.4-1.4z" /><path d="M10 2.4h3.6V6M13.6 2.4L9.6 6.4" /></svg>);
  if (id === "video") return (<svg {...p}><rect x="1.6" y="3.8" width="9" height="8.4" rx="2" /><path d="M10.6 7l3.8-2.2v6.4L10.6 9" /></svg>);
  return (<svg {...p}><path d="M2.4 3.6a1.6 1.6 0 0 1 1.6-1.6h8a1.6 1.6 0 0 1 1.6 1.6v5.6a1.6 1.6 0 0 1-1.6 1.6H6.6L3.6 13.4v-2.6H4a1.6 1.6 0 0 1-1.6-1.6z" /><path d="M5.4 6.4h5.2" /></svg>);
}

const windows = ["Morning, 9 to 12", "Afternoon, 12 to 17", "Evening, 17 to 20"];

export function ContactChannelPicker({
  eyebrow = "Get in touch",
  title = "Talk to us the way you like to talk",
  subtitle = "Pick a channel and the form adapts. Every request lands with the same small team in Porto, not a ticket queue.",
  channels = defaultChannels,
  defaultChannel = "email",
  days = ["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20"],
  slots = ["09:30", "11:00", "13:30", "15:00", "16:30"],
  agentName = "Inês",
  onChannelChange,
  onSubmit,
  accent = "#f05d3b",
  className = "",
  style,
  ...rest
}: ContactChannelPickerProps) {
  const uid = React.useId().replace(/:/g, "");
  const [channel, setChannel] = React.useState<ContactChannel>(defaultChannel);
  const [values, setValues] = React.useState<Record<string, string>>({ window: windows[1], day: days[1] ?? "", slot: slots[1] ?? "" });
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle");
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(0, channels.findIndex((c) => c.id === channel));

  const pick = (c: ContactChannel) => {
    setChannel(c);
    setError(null);
    onChannelChange?.(c);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const n = (i + map[e.key] + channels.length) % channels.length;
    pick(channels[n].id);
    refs.current[n]?.focus();
  };

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));
  const field = (k: string) => ({
    value: values[k] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(k, e.target.value),
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = (values.name ?? "").trim();
    if (!name) return setError("Add your name so we know who to ask for.");
    if ((channel === "email" || channel === "video") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email ?? "")) return setError("That email does not look right.");
    if (channel === "callback" && (values.phone ?? "").replace(/\D/g, "").length < 7) return setError("Add a phone number with area code.");
    setError(null);
    setStatus("sending");
    try {
      if (onSubmit) await onSubmit(channel, { ...values, channel });
      else await new Promise((r) => setTimeout(r, 850));
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  };

  const first = (values.name ?? "").trim().split(" ")[0] || "there";
  const doneText: Record<ContactChannel, [string, string]> = {
    email: [`Thanks, ${first}`, `Your note is with us. Expect a reply at ${values.email} in about four hours.`],
    callback: ["We will call you", `Someone will ring ${values.phone} ${values.window?.toLowerCase()}, on the next business day.`],
    video: ["Call booked", `${values.day} at ${values.slot}. The invite is on its way to ${values.email}.`],
    chat: [`${agentName} is joining`, `Hang tight, ${first}. The chat opens in this window in a few seconds.`],
  };

  return (
    <section className={`hb-wd2 ${className}`} style={{ "--hb-wd2-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-contact-channel-picker" precedence="default">{css}</style>
      <div className="hb-wd2-in">
        <div>
          <div className="hb-wd2-eyebrow">{eyebrow}</div>
          <h2 className="hb-wd2-title">{title}</h2>
          <p className="hb-wd2-sub">{subtitle}</p>
          <ul className="hb-wd2-facts">
            {["Real people, Monday to Friday, 9 to 20 WET", "Median first reply last month: 3 h 12 min", "Calls in English, Portuguese and Spanish"].map((f) => (
              <li key={f}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8.5l3 3 7-7" /></svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="hb-wd2-card">
          <div className="hb-wd2-picker" role="radiogroup" aria-label="Contact channel" style={{ "--hb-wd2-i": index, "--hb-wd2-cx": index % 2, "--hb-wd2-cy": Math.floor(index / 2) } as React.CSSProperties}>
            <span className="hb-wd2-ind" aria-hidden="true" />
            {channels.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={c.id === channel}
                tabIndex={c.id === channel ? 0 : -1}
                className="hb-wd2-opt"
                onClick={() => pick(c.id)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="hb-wd2-opt-ic"><ChannelIcon id={c.id} /></span>
                <span>
                  <strong>{c.label}</strong>
                  <small>{c.note}</small>
                </span>
              </button>
            ))}
          </div>
          {status === "sent" ? (
            <div className="hb-wd2-done" role="status">
              <span className="hb-wd2-done-ic"><ChannelIcon id={channel} /></span>
              <strong>{doneText[channel][0]}</strong>
              <p>{doneText[channel][1]}</p>
              <button type="button" className="hb-wd2-reset" onClick={() => setStatus("idle")}>Start over</button>
            </div>
          ) : (
            <form className="hb-wd2-panel" key={channel} onSubmit={submit} noValidate>
              <div className="hb-wd2-row">
                <div className="hb-wd2-field">
                  <label htmlFor={`${uid}-name`}>Your name</label>
                  <input id={`${uid}-name`} className="hb-wd2-input" placeholder="Tomás Reis" autoComplete="name" {...field("name")} />
                </div>
                {channel === "callback" ? (
                  <div className="hb-wd2-field">
                    <label htmlFor={`${uid}-phone`}>Phone</label>
                    <input id={`${uid}-phone`} type="tel" className="hb-wd2-input" placeholder="+351 912 480 117" autoComplete="tel" {...field("phone")} />
                  </div>
                ) : channel !== "chat" ? (
                  <div className="hb-wd2-field">
                    <label htmlFor={`${uid}-email`}>Work email</label>
                    <input id={`${uid}-email`} type="email" className="hb-wd2-input" placeholder="tomas@cardinal.pt" autoComplete="email" {...field("email")} />
                  </div>
                ) : (
                  <div className="hb-wd2-field">
                    <label htmlFor={`${uid}-topic`}>Topic</label>
                    <input id={`${uid}-topic`} className="hb-wd2-input" placeholder="Billing, migration, other" {...field("topic")} />
                  </div>
                )}
              </div>
              {channel === "email" && (
                <div className="hb-wd2-field">
                  <label htmlFor={`${uid}-msg`}>Message</label>
                  <textarea id={`${uid}-msg`} rows={4} className="hb-wd2-input" placeholder="We run 40 stores and want to move our loyalty program over before March." {...field("message")} />
                </div>
              )}
              {channel === "callback" && (
                <fieldset className="hb-wd2-chips" aria-label="Best time to call">
                  <span className="hb-wd2-legend" style={{ width: "100%", marginBottom: 2 }}>Best time to call</span>
                  {windows.map((w) => (
                    <button key={w} type="button" className="hb-wd2-chip" aria-pressed={values.window === w} onClick={() => set("window", w)}>{w}</button>
                  ))}
                </fieldset>
              )}
              {channel === "video" && (
                <>
                  <div className="hb-wd2-days" role="group" aria-label="Day">
                    {days.map((d) => {
                      const [w, n] = d.split(" ");
                      return (
                        <button key={d} type="button" className="hb-wd2-day" aria-pressed={values.day === d} onClick={() => set("day", d)}>
                          <span>{w}</span>
                          <b>{n}</b>
                        </button>
                      );
                    })}
                  </div>
                  <div className="hb-wd2-chips" role="group" aria-label="Time, Lisbon">
                    {slots.map((s) => (
                      <button key={s} type="button" className="hb-wd2-chip" aria-pressed={values.slot === s} onClick={() => set("slot", s)}>{s}</button>
                    ))}
                  </div>
                </>
              )}
              {channel === "chat" && (
                <div className="hb-wd2-thread" aria-label="Chat preview">
                  <div className="hb-wd2-msg">
                    <span className="hb-wd2-av" aria-hidden="true">{agentName.slice(0, 1)}</span>
                    <p>Hi, I am {agentName} from the support team. What can I help you sort out today?</p>
                  </div>
                  <div className="hb-wd2-msg">
                    <span className="hb-wd2-av" aria-hidden="true">{agentName.slice(0, 1)}</span>
                    <span className="hb-wd2-typing" aria-label={`${agentName} is typing`}><i /><i /><i /></span>
                  </div>
                </div>
              )}
              {error && <span className="hb-wd2-err" role="alert">{error}</span>}
              <div className="hb-wd2-foot">
                <span className="hb-wd2-hint">{channels[index]?.note}</span>
                <button type="submit" className="hb-wd2-send" disabled={status === "sending"}>
                  {status === "sending" ? <span className="hb-wd2-spin" aria-hidden="true" /> : null}
                  {channel === "email" ? "Send message" : channel === "callback" ? "Request a call" : channel === "video" ? "Book the call" : "Start chat"}
                  {status !== "sending" && (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
