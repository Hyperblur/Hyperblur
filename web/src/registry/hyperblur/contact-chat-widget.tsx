"use client";

import * as React from "react";

export interface ContactChatReply {
  label: string;
  answer: string;
}

export interface ContactChatChannel {
  label: string;
  detail: string;
  href: string;
}

export interface ContactChatValues {
  email: string;
  topic: string | null;
  message: string;
}

export interface ContactChatWidgetProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  agentName?: string;
  team?: string[];
  greeting?: string[];
  replies?: ContactChatReply[];
  channels?: ContactChatChannel[];
  onSubmit?: (values: ContactChatValues) => void | Promise<unknown>;
  accent?: string;
}

type Msg = { id: number; from: "agent" | "user" | "card" | "done"; text: string };

const defaultReplies: ContactChatReply[] = [
  { label: "Pricing for my team", answer: "Teams of 10 or more get volume pricing from $9 per seat. I can send you a quote with your exact numbers." },
  { label: "Book a demo", answer: "Happy to set one up. Demos run 25 minutes and we tailor them to the tools you already use." },
  { label: "Something is broken", answer: "Sorry about that. Share a quick description and an engineer from the on-call rotation will pick it up." },
  { label: "Migrating from Notion", answer: "Our importer moves pages, databases and comments in one pass. Most workspaces finish in under ten minutes." },
];

const defaultChannels: ContactChatChannel[] = [
  { label: "Live chat", detail: "Median first reply 3m 40s", href: "#" },
  { label: "Email", detail: "help@fieldnote.app", href: "mailto:help@fieldnote.app" },
  { label: "Status", detail: "All systems normal", href: "#" },
];

const css = `
.hb-yi2 {
  --hb-yi2-accent: #8b5cf6;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yi2 *, .hb-yi2 *::before, .hb-yi2 *::after { box-sizing: border-box; }
.hb-yi2::before {
  content: ""; position: absolute; z-index: -1; right: -10%; top: -30%; width: 70%; height: 120%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-yi2-accent) 22%, transparent), transparent 70%);
}
.hb-yi2::after {
  content: ""; position: absolute; z-index: -1; inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at 70% 40%, #000, transparent 70%);
}
.hb-yi2-inner { max-width: 1120px; margin: 0 auto; padding: 72px 20px 80px; display: grid; gap: 44px; align-items: center; }
.hb-yi2-eyebrow {
  display: inline-flex; align-items: center; gap: 8px; margin: 0 0 18px; padding: 5px 11px 5px 8px; border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, .1); background: rgba(255, 255, 255, .03); font-size: 12px; color: #c9c9c9;
}
.hb-yi2-live { width: 8px; height: 8px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 0 rgba(52, 211, 153, .6); animation: hb-yi2-ping 2s infinite; }
.hb-yi2-title { margin: 0; font-size: clamp(30px, 5cqi, 52px); line-height: 1.04; letter-spacing: -.04em; font-weight: 600; }
.hb-yi2-title span { color: transparent; background: linear-gradient(90deg, #fff, color-mix(in srgb, var(--hb-yi2-accent) 70%, #fff)); -webkit-background-clip: text; background-clip: text; }
.hb-yi2-sub { margin: 18px 0 0; max-width: 460px; font-size: 16px; line-height: 1.6; color: #8f8f8f; }
.hb-yi2-channels { list-style: none; margin: 30px 0 0; padding: 0; display: grid; gap: 1px; max-width: 440px; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255, 255, 255, .08); background: rgba(255, 255, 255, .06); }
.hb-yi2-channels a {
  display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; background: #0d0d0d;
  color: inherit; text-decoration: none; font-size: 14px; transition: background .2s;
}
.hb-yi2-channels a:hover { background: #141414; }
.hb-yi2-channels a:focus-visible { outline: 2px solid var(--hb-yi2-accent); outline-offset: -2px; }
.hb-yi2-channels b { font-weight: 500; }
.hb-yi2-channels span { color: #8f8f8f; font-size: 13px; display: inline-flex; align-items: center; gap: 8px; }
.hb-yi2-channels svg { width: 14px; height: 14px; color: #5f5f5f; transition: transform .2s, color .2s; }
.hb-yi2-channels a:hover svg { transform: translateX(3px); color: #ededed; }
.hb-yi2-widget {
  position: relative; width: 100%; max-width: 400px; justify-self: center; border-radius: 22px; overflow: hidden;
  background: linear-gradient(180deg, #151515, #0f0f0f); border: 1px solid rgba(255, 255, 255, .09);
  box-shadow: 0 1px 0 rgba(255, 255, 255, .08) inset, 0 40px 80px -30px rgba(0, 0, 0, .9), 0 0 0 1px rgba(0, 0, 0, .4);
  animation: hb-yi2-pop .7s cubic-bezier(.2, .9, .25, 1.15) both;
}
.hb-yi2-top {
  position: relative; padding: 18px 18px 16px; display: flex; align-items: center; gap: 12px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--hb-yi2-accent) 38%, #121212), #141414 70%);
  border-bottom: 1px solid rgba(255, 255, 255, .07);
}
.hb-yi2-stack { display: flex; }
.hb-yi2-face {
  display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; margin-left: -9px; font-size: 12px; font-weight: 600; color: #fff;
  border: 2px solid #1a1a1a;
}
.hb-yi2-face:first-child { margin-left: 0; }
.hb-yi2-top-text { min-width: 0; flex: 1; }
.hb-yi2-top-text p { margin: 0; }
.hb-yi2-top-name { font-size: 15px; font-weight: 600; }
.hb-yi2-top-note { margin-top: 2px !important; font-size: 12px; color: #b9b9b9; display: flex; align-items: center; gap: 6px; }
.hb-yi2-top-note::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #34d399; }
.hb-yi2-thread { height: 330px; overflow-y: auto; padding: 18px 16px 12px; display: flex; flex-direction: column; gap: 8px; scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: #2a2a2a transparent; }
.hb-yi2-row { display: flex; gap: 8px; align-items: flex-end; animation: hb-yi2-in .35s cubic-bezier(.2, .8, .2, 1) both; }
.hb-yi2-row[data-from="user"] { justify-content: flex-end; }
.hb-yi2-mini { width: 24px; height: 24px; border-radius: 50%; flex: none; display: grid; place-items: center; font-size: 10px; font-weight: 600; color: #fff; }
.hb-yi2-row[data-chain="true"] .hb-yi2-mini { visibility: hidden; }
.hb-yi2-bubble { max-width: 82%; padding: 10px 13px; border-radius: 16px; font-size: 14px; line-height: 1.5; background: #1d1d1d; border: 1px solid rgba(255, 255, 255, .06); border-bottom-left-radius: 5px; }
.hb-yi2-row[data-from="user"] .hb-yi2-bubble {
  background: var(--hb-yi2-accent); border-color: transparent; color: #fff; border-bottom-left-radius: 16px; border-bottom-right-radius: 5px;
  box-shadow: 0 8px 20px -10px var(--hb-yi2-accent);
}
.hb-yi2-caret { display: inline-block; width: 2px; height: 1em; margin-left: 2px; vertical-align: -2px; background: currentColor; animation: hb-yi2-blink 1s steps(1) infinite; }
.hb-yi2-dots { display: inline-flex; gap: 4px; padding: 4px 2px; }
.hb-yi2-dots i { width: 6px; height: 6px; border-radius: 50%; background: #8f8f8f; animation: hb-yi2-bounce 1.2s infinite ease-in-out; }
.hb-yi2-dots i:nth-child(2) { animation-delay: .15s; }
.hb-yi2-dots i:nth-child(3) { animation-delay: .3s; }
.hb-yi2-chips { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 6px; padding: 4px 0 2px 32px; }
.hb-yi2-chip {
  padding: 7px 12px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--hb-yi2-accent) 55%, transparent);
  background: color-mix(in srgb, var(--hb-yi2-accent) 10%, transparent); color: color-mix(in srgb, var(--hb-yi2-accent) 45%, #fff);
  font: inherit; font-size: 13px; cursor: pointer; animation: hb-yi2-in .4s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-yi2-i) * 70ms);
  transition: background .2s, transform .2s, color .2s;
}
.hb-yi2-chip:hover { background: color-mix(in srgb, var(--hb-yi2-accent) 22%, transparent); color: #fff; transform: translateY(-1px); }
.hb-yi2-chip:focus-visible, .hb-yi2-send:focus-visible, .hb-yi2-cardbtn:focus-visible { outline: 2px solid var(--hb-yi2-accent); outline-offset: 2px; }
.hb-yi2-card { margin-left: 32px; padding: 14px; border-radius: 14px; background: #151515; border: 1px solid rgba(255, 255, 255, .08); display: grid; gap: 8px; animation: hb-yi2-in .4s cubic-bezier(.2, .8, .2, 1) both; }
.hb-yi2-card label { font-size: 12px; color: #a1a1a1; }
.hb-yi2-cardrow { display: flex; gap: 6px; }
.hb-yi2-card input {
  flex: 1; min-width: 0; height: 38px; padding: 0 12px; border-radius: 10px; border: 1px solid rgba(255, 255, 255, .1); background: #0b0b0b;
  color: #ededed; font: inherit; font-size: 14px; outline: none; transition: border-color .2s, box-shadow .2s;
}
.hb-yi2-card input:focus { border-color: var(--hb-yi2-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-yi2-accent) 25%, transparent); }
.hb-yi2-card[data-invalid="true"] input { border-color: #f87171; }
.hb-yi2-err { font-size: 12px; color: #f87171; }
.hb-yi2-cardbtn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 38px; padding: 0 14px; border-radius: 10px; border: 0;
  background: #ededed; color: #0a0a0a; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: background .2s;
}
.hb-yi2-cardbtn:hover:not(:disabled) { background: #fff; }
.hb-yi2-cardbtn:disabled { cursor: progress; opacity: .8; }
.hb-yi2-spin { width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(0, 0, 0, .2); border-top-color: #0a0a0a; animation: hb-yi2-spin .7s linear infinite; }
.hb-yi2-done { margin-left: 32px; display: flex; gap: 10px; align-items: flex-start; padding: 12px 14px; border-radius: 14px; font-size: 13px; line-height: 1.5; color: #d1fae5; background: rgba(16, 185, 129, .1); border: 1px solid rgba(16, 185, 129, .3); animation: hb-yi2-in .4s both; }
.hb-yi2-done svg { width: 16px; height: 16px; flex: none; margin-top: 2px; color: #34d399; }
.hb-yi2-compose { display: flex; gap: 8px; align-items: center; padding: 12px; border-top: 1px solid rgba(255, 255, 255, .07); background: #121212; }
.hb-yi2-compose input {
  flex: 1; min-width: 0; height: 40px; padding: 0 14px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, .08); background: #0b0b0b;
  color: #ededed; font: inherit; font-size: 14px; outline: none; transition: border-color .2s;
}
.hb-yi2-compose input:focus { border-color: color-mix(in srgb, var(--hb-yi2-accent) 70%, transparent); }
.hb-yi2-send {
  display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; border: 0; flex: none; cursor: pointer;
  background: var(--hb-yi2-accent); color: #fff; transition: transform .2s, opacity .2s;
}
.hb-yi2-send:hover:not(:disabled) { transform: scale(1.06); }
.hb-yi2-send:disabled { opacity: .35; cursor: not-allowed; }
.hb-yi2-send svg { width: 16px; height: 16px; }
.hb-yi2-foot { padding: 0 12px 10px; background: #121212; font-size: 11px; color: #5f5f5f; text-align: center; }
@keyframes hb-yi2-in { from { opacity: 0; transform: translateY(6px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes hb-yi2-pop { from { opacity: 0; transform: translateY(24px) scale(.96); } to { opacity: 1; transform: none; } }
@keyframes hb-yi2-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: .5; } 30% { transform: translateY(-4px); opacity: 1; } }
@keyframes hb-yi2-blink { 50% { opacity: 0; } }
@keyframes hb-yi2-spin { to { transform: rotate(360deg); } }
@keyframes hb-yi2-ping { 0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, .6); } 80%, 100% { box-shadow: 0 0 0 8px rgba(52, 211, 153, 0); } }
@container (min-width: 820px) {
  .hb-yi2-inner { grid-template-columns: minmax(0, 1fr) 400px; gap: 64px; padding: 104px 32px 112px; }
  .hb-yi2-widget { justify-self: end; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yi2-widget, .hb-yi2-row, .hb-yi2-chip, .hb-yi2-card, .hb-yi2-done, .hb-yi2-dots i, .hb-yi2-caret, .hb-yi2-live { animation: none; }
  .hb-yi2-thread { scroll-behavior: auto; }
  .hb-yi2-chip, .hb-yi2-send, .hb-yi2-channels a, .hb-yi2-channels svg { transition: none; }
}
`;

const faces = [
  "linear-gradient(135deg, #f472b6, #8b5cf6)",
  "linear-gradient(135deg, #38bdf8, #2f7bff)",
  "linear-gradient(135deg, #fbbf24, #f97316)",
];

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ContactChatWidget({
  eyebrow = "4 people online now",
  title = "Questions? Talk to a human, not a ticket queue.",
  subtitle = "Our support team is spread across three time zones, so someone who knows the product answers within minutes, any day of the week.",
  agentName = "Priya Raman",
  team = ["Priya Raman", "Leo Brandt", "Ama Osei"],
  greeting = ["Hi there, I am Priya from the Fieldnote team.", "What can we help you with today?"],
  replies = defaultReplies,
  channels = defaultChannels,
  onSubmit,
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: ContactChatWidgetProps) {
  const [messages, setMessages] = React.useState<Msg[]>(() => [{ id: 0, from: "agent", text: greeting[0] ?? "" }]);
  const [typing, setTyping] = React.useState(false);
  const [live, setLive] = React.useState<string | null>(null);
  const [chips, setChips] = React.useState(false);
  const [topic, setTopic] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState("");
  const [lastMessage, setLastMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tried, setTried] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");
  const timers = React.useRef<number[]>([]);
  const idRef = React.useRef(1);
  const threadRef = React.useRef<HTMLDivElement>(null);
  const fieldId = React.useId();

  const later = React.useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  const push = React.useCallback((from: Msg["from"], text: string) => {
    const id = idRef.current++;
    setMessages((m) => [...m, { id, from, text }]);
  }, []);

  const say = React.useCallback(
    (text: string, after?: () => void) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        push("agent", text);
        after?.();
        return;
      }
      setTyping(true);
      later(() => {
        setTyping(false);
        let n = 0;
        const tick = () => {
          n = Math.min(text.length, n + 3);
          if (n >= text.length) {
            setLive(null);
            push("agent", text);
            after?.();
            return;
          }
          setLive(text.slice(0, n));
          later(tick, 22);
        };
        tick();
      }, 900);
    },
    [later, push],
  );

  const second = greeting[1];

  React.useEffect(() => {
    const list = timers.current;
    const id = window.setTimeout(() => {
      if (second) say(second, () => setChips(true));
      else setChips(true);
    }, 500);
    list.push(id);
    return () => {
      list.forEach((t) => window.clearTimeout(t));
      list.length = 0;
    };
  }, [second, say]);

  React.useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, live, chips]);

  const askEmail = () => {
    later(() => say("Where should we send the follow up?", () => push("card", "")), 250);
  };

  const choose = (r: ContactChatReply) => {
    setChips(false);
    setTopic(r.label);
    setLastMessage(r.label);
    push("user", r.label);
    say(r.answer, askEmail);
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || typing || live !== null) return;
    setDraft("");
    setChips(false);
    setLastMessage(text);
    push("user", text);
    if (status === "done") {
      say("Thanks, I added that to your conversation.");
      return;
    }
    const hasCard = messages.some((m) => m.from === "card");
    if (hasCard) say("Got it. Drop your email above and we will pick this up right away.");
    else say("Thanks for the details. Let me loop in the right person.", askEmail);
  };

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!emailOk(email) || status !== "idle") return;
    setStatus("loading");
    try {
      await onSubmit?.({ email: email.trim(), topic, message: lastMessage });
    } catch {
      setStatus("idle");
      return;
    }
    later(() => setStatus("done"), 700);
  };

  const invalid = tried && !emailOk(email);
  const busy = typing || live !== null;
  const vars = { "--hb-yi2-accent": accent, ...style } as React.CSSProperties;
  const agentFace = faces[0];

  return (
    <section className={`hb-yi2 ${className}`} style={vars} {...rest}>
      <style href="hb-contact-chat-widget" precedence="default">{css}</style>
      <div className="hb-yi2-inner">
        <div>
          {eyebrow ? (
            <p className="hb-yi2-eyebrow">
              <span className="hb-yi2-live" aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h2 className="hb-yi2-title">
            {title.split(", ").length > 1 ? (
              <>
                {title.split(", ")[0]},<br />
                <span>{title.split(", ").slice(1).join(", ")}</span>
              </>
            ) : (
              title
            )}
          </h2>
          {subtitle ? <p className="hb-yi2-sub">{subtitle}</p> : null}
          <ul className="hb-yi2-channels">
            {channels.map((c) => (
              <li key={c.label}>
                <a href={c.href}>
                  <b>{c.label}</b>
                  <span>
                    {c.detail}
                    <Arrow />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hb-yi2-widget" role="region" aria-label="Support chat">
          <div className="hb-yi2-top">
            <div className="hb-yi2-stack" aria-hidden="true">
              {team.slice(0, 3).map((n, i) => (
                <span key={n} className="hb-yi2-face" style={{ background: faces[i % faces.length] }}>
                  {initials(n)}
                </span>
              ))}
            </div>
            <div className="hb-yi2-top-text">
              <p className="hb-yi2-top-name">Fieldnote support</p>
              <p className="hb-yi2-top-note">Typically replies in 4 minutes</p>
            </div>
          </div>
          <div className="hb-yi2-thread" ref={threadRef} aria-live="polite">
            {messages.map((m, i) => {
              const prev = messages[i - 1];
              const chain = !!prev && prev.from === m.from;
              if (m.from === "card") {
                return status === "done" ? (
                  <div key={m.id} className="hb-yi2-done" role="status">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    <span>{`You are all set. ${agentName.split(" ")[0]} will reply to ${email.trim()} within 4 minutes.`}</span>
                  </div>
                ) : (
                  <form key={m.id} className="hb-yi2-card" data-invalid={invalid} noValidate onSubmit={submitEmail} aria-busy={status === "loading" || undefined}>
                    <label htmlFor={`${fieldId}-mail`}>Your email</label>
                    <div className="hb-yi2-cardrow">
                      <input
                        id={`${fieldId}-mail`}
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={email}
                        aria-invalid={invalid}
                        aria-describedby={invalid ? `${fieldId}-err` : undefined}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button type="submit" className="hb-yi2-cardbtn" disabled={status === "loading"}>
                        {status === "loading" ? <span className="hb-yi2-spin" aria-hidden="true" /> : null}
                        {status === "loading" ? "Sending" : "Send"}
                      </button>
                    </div>
                    {invalid ? <span id={`${fieldId}-err`} className="hb-yi2-err">That email does not look right.</span> : null}
                  </form>
                );
              }
              return (
                <div key={m.id} className="hb-yi2-row" data-from={m.from} data-chain={chain}>
                  {m.from === "agent" ? (
                    <span className="hb-yi2-mini" style={{ background: agentFace }} aria-hidden="true">
                      {initials(agentName)}
                    </span>
                  ) : null}
                  <div className="hb-yi2-bubble">{m.text}</div>
                </div>
              );
            })}
            {typing || live !== null ? (
              <div className="hb-yi2-row" data-from="agent" data-chain={messages[messages.length - 1]?.from === "agent"}>
                <span className="hb-yi2-mini" style={{ background: agentFace }} aria-hidden="true">
                  {initials(agentName)}
                </span>
                <div className="hb-yi2-bubble">
                  {live !== null ? (
                    <>
                      {live}
                      <span className="hb-yi2-caret" aria-hidden="true" />
                    </>
                  ) : (
                    <span className="hb-yi2-dots" aria-label={`${agentName} is typing`}>
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                </div>
              </div>
            ) : null}
            {chips ? (
              <div className="hb-yi2-chips" role="group" aria-label="Quick replies">
                {replies.map((r, i) => (
                  <button key={r.label} type="button" className="hb-yi2-chip" style={{ "--hb-yi2-i": i } as React.CSSProperties} onClick={() => choose(r)}>
                    {r.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <form className="hb-yi2-compose" onSubmit={send}>
            <input aria-label="Write a message" placeholder="Write a message" value={draft} onChange={(e) => setDraft(e.target.value)} />
            <button type="submit" className="hb-yi2-send" disabled={!draft.trim() || busy} aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </form>
          <p className="hb-yi2-foot">We reply here and by email</p>
        </div>
      </div>
    </section>
  );
}
