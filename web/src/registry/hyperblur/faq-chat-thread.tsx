"use client";

import * as React from "react";

export interface FaqChatItem {
  question: string;
  answer: string;
}

export interface FaqChatThreadProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FaqChatItem[];
  botName?: string;
  speed?: number;
  contact?: { label: string; href: string };
  onAsk?: (item: FaqChatItem, index: number) => void;
  accent?: string;
}

const defaultItems: FaqChatItem[] = [
  { question: "Can I try it before paying?", answer: "Yes. Every workspace starts with a 14 day trial of the Team plan. No card needed, and you keep your data if you downgrade to Free." },
  { question: "How does billing work for guests?", answer: "Guests are free and unlimited. You only pay for members who can create or edit projects, billed monthly or yearly." },
  { question: "Where is my data stored?", answer: "In the region you pick at signup: Frankfurt, Virginia or Sydney. Data never leaves that region, and backups are encrypted with AES-256." },
  { question: "Can I export everything?", answer: "Any time, from Settings. You get a zip with Markdown files, CSVs for every table and the original attachments, usually in under a minute." },
  { question: "Do you offer discounts for nonprofits?", answer: "Registered nonprofits and schools get 60 percent off any paid plan. Write to us from your organization email and we will apply it within a day." },
  { question: "What happens if I cancel?", answer: "Your workspace switches to Free at the end of the billing period. Nothing is deleted, and you can upgrade again with one click." },
];

const css = `
.hb-yi7 {
  --hb-yi7-accent: #10b981;
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
.hb-yi7 *, .hb-yi7 *::before, .hb-yi7 *::after { box-sizing: border-box; }
.hb-yi7::before {
  content: ""; position: absolute; z-index: -1; left: -10%; bottom: -40%; width: 60%; height: 90%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-yi7-accent) 16%, transparent), transparent);
}
.hb-yi7-inner { max-width: 1120px; margin: 0 auto; padding: 72px 20px 80px; display: grid; gap: 36px; }
.hb-yi7-eyebrow { margin: 0 0 14px; font-size: 13px; font-weight: 500; color: var(--hb-yi7-accent); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.hb-yi7-title { margin: 0; font-size: clamp(30px, 4.6cqi, 48px); line-height: 1.05; letter-spacing: -.04em; font-weight: 600; }
.hb-yi7-sub { margin: 14px 0 0; max-width: 380px; font-size: 15px; line-height: 1.6; color: #8f8f8f; }
.hb-yi7-list { list-style: none; margin: 28px 0 0; padding: 0; display: grid; gap: 4px; counter-reset: hb-yi7-n; }
.hb-yi7-q {
  width: 100%; display: flex; align-items: center; gap: 12px; padding: 11px 12px; border-radius: 12px; border: 1px solid transparent; background: transparent;
  color: #c9c9c9; font: inherit; font-size: 14px; text-align: left; cursor: pointer; transition: background .2s, border-color .2s, color .2s;
}
.hb-yi7-q:hover:not(:disabled) { background: #121212; border-color: rgba(255, 255, 255, .08); color: #fff; }
.hb-yi7-q:disabled { cursor: default; }
.hb-yi7-q:focus-visible, .hb-yi7-reset:focus-visible, .hb-yi7-link:focus-visible { outline: 2px solid var(--hb-yi7-accent); outline-offset: 2px; }
.hb-yi7-num {
  display: grid; place-items: center; width: 24px; height: 24px; border-radius: 7px; flex: none; font-size: 11px; font-weight: 600;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #8f8f8f; border: 1px solid rgba(255, 255, 255, .1); background: #111;
  transition: background .3s, color .3s, border-color .3s;
}
.hb-yi7-q[data-asked="true"] { color: #6f6f6f; }
.hb-yi7-q[data-asked="true"] .hb-yi7-num { background: color-mix(in srgb, var(--hb-yi7-accent) 18%, transparent); border-color: color-mix(in srgb, var(--hb-yi7-accent) 40%, transparent); color: var(--hb-yi7-accent); }
.hb-yi7-num svg { width: 12px; height: 12px; }
.hb-yi7-q > svg { width: 14px; height: 14px; margin-left: auto; color: #5f5f5f; opacity: 0; transform: translateX(-4px); transition: opacity .2s, transform .2s; }
.hb-yi7-q:hover:not(:disabled) > svg { opacity: 1; transform: none; }
.hb-yi7-link { display: inline-flex; margin-top: 18px; font-size: 14px; color: #ededed; text-decoration: underline; text-decoration-color: rgba(255, 255, 255, .25); text-underline-offset: 4px; }
.hb-yi7-link:hover { text-decoration-color: var(--hb-yi7-accent); }
.hb-yi7-win {
  position: relative; display: flex; flex-direction: column; min-width: 0; border-radius: 24px; overflow: hidden;
  background: linear-gradient(180deg, #121212, #0d0d0d); border: 1px solid rgba(255, 255, 255, .08);
  box-shadow: 0 1px 0 rgba(255, 255, 255, .06) inset, 0 40px 80px -40px rgba(0, 0, 0, .9);
}
.hb-yi7-bar { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid rgba(255, 255, 255, .07); }
.hb-yi7-bot { position: relative; width: 34px; height: 34px; border-radius: 11px; display: grid; place-items: center; background: color-mix(in srgb, var(--hb-yi7-accent) 20%, #111); color: var(--hb-yi7-accent); border: 1px solid color-mix(in srgb, var(--hb-yi7-accent) 35%, transparent); }
.hb-yi7-bot svg { width: 18px; height: 18px; }
.hb-yi7-bot::after { content: ""; position: absolute; right: -2px; bottom: -2px; width: 9px; height: 9px; border-radius: 50%; background: #34d399; border: 2px solid #121212; }
.hb-yi7-bar p { margin: 0; font-size: 14px; font-weight: 600; }
.hb-yi7-bar small { display: block; font-size: 12px; font-weight: 400; color: #8f8f8f; }
.hb-yi7-reset {
  margin-left: auto; height: 30px; padding: 0 12px; border-radius: 9px; border: 1px solid rgba(255, 255, 255, .1); background: transparent;
  color: #a1a1a1; font: inherit; font-size: 12px; cursor: pointer; transition: background .2s, color .2s;
}
.hb-yi7-reset:hover { background: #1a1a1a; color: #fff; }
.hb-yi7-thread { height: 400px; overflow-y: auto; padding: 22px 18px; display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: #2a2a2a transparent; }
.hb-yi7-day { align-self: center; margin-bottom: 6px; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: #5f5f5f; }
.hb-yi7-msg { max-width: 84%; padding: 11px 14px; border-radius: 18px; font-size: 14px; line-height: 1.55; animation: hb-yi7-in .4s cubic-bezier(.2, .8, .2, 1) both; }
.hb-yi7-msg[data-from="user"] {
  align-self: flex-end; color: #04130d; font-weight: 500; border-bottom-right-radius: 6px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-yi7-accent) 80%, #fff), var(--hb-yi7-accent));
  box-shadow: 0 10px 24px -14px var(--hb-yi7-accent);
  transform-origin: right bottom;
}
.hb-yi7-msg[data-from="bot"] { align-self: flex-start; background: #1b1b1b; border: 1px solid rgba(255, 255, 255, .06); border-bottom-left-radius: 6px; color: #dedede; transform-origin: left bottom; }
.hb-yi7-cursor { display: inline-block; width: 7px; height: 14px; margin-left: 2px; vertical-align: -2px; border-radius: 1px; background: var(--hb-yi7-accent); animation: hb-yi7-blink .9s steps(1) infinite; }
.hb-yi7-dots { display: inline-flex; gap: 4px; padding: 3px 0; }
.hb-yi7-dots i { width: 6px; height: 6px; border-radius: 50%; background: #7a7a7a; animation: hb-yi7-wave 1.1s infinite; }
.hb-yi7-dots i:nth-child(2) { animation-delay: .14s; }
.hb-yi7-dots i:nth-child(3) { animation-delay: .28s; }
.hb-yi7-meta { align-self: flex-end; margin-top: -4px; font-size: 11px; color: #5f5f5f; }
.hb-yi7-chips { display: flex; gap: 8px; padding: 12px 14px; border-top: 1px solid rgba(255, 255, 255, .07); overflow-x: auto; scrollbar-width: none; }
.hb-yi7-chip {
  flex: none; height: 34px; padding: 0 14px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, .12); background: #141414;
  color: #d4d4d4; font: inherit; font-size: 13px; cursor: pointer; transition: border-color .2s, color .2s, background .2s;
}
.hb-yi7-chip:hover:not(:disabled) { border-color: var(--hb-yi7-accent); color: #fff; }
.hb-yi7-chip:disabled { opacity: .45; cursor: default; }
.hb-yi7-chip:focus-visible { outline: 2px solid var(--hb-yi7-accent); outline-offset: 2px; }
.hb-yi7-done { flex: 1; text-align: center; font-size: 13px; color: #8f8f8f; padding: 8px 0; }
@keyframes hb-yi7-in { from { opacity: 0; transform: translateY(8px) scale(.96); } to { opacity: 1; transform: none; } }
@keyframes hb-yi7-blink { 50% { opacity: 0; } }
@keyframes hb-yi7-wave { 0%, 60%, 100% { transform: translateY(0); opacity: .45; } 30% { transform: translateY(-4px); opacity: 1; } }
@container (min-width: 820px) {
  .hb-yi7-inner { grid-template-columns: minmax(0, 380px) minmax(0, 1fr); gap: 64px; padding: 104px 32px 112px; align-items: start; }
  .hb-yi7-thread { height: 440px; padding: 26px 24px; }
  .hb-yi7-chips { display: none; }
}
@container (max-width: 819px) {
  .hb-yi7-list { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yi7-msg, .hb-yi7-cursor, .hb-yi7-dots i { animation: none; }
  .hb-yi7-thread { scroll-behavior: auto; }
  .hb-yi7-q, .hb-yi7-q > svg, .hb-yi7-num, .hb-yi7-chip { transition: none; }
}
`;

type Line = { key: string; from: "user" | "bot"; text: string };

export function FaqChatThread({
  eyebrow = "~/help --faq",
  title = "Ask away. We have heard these before.",
  subtitle = "The six questions we get every week, answered by the people who built Ledgerly. Tap one to see the reply.",
  items = defaultItems,
  botName = "Ledgerly help",
  speed = 1,
  contact = { label: "Still stuck? Message the team", href: "#" },
  onAsk,
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: FaqChatThreadProps) {
  const [asked, setAsked] = React.useState<number[]>(() => (items.length ? [0] : []));
  const [queue, setQueue] = React.useState<number | null>(() => (items.length > 1 ? 1 : null));
  const [typing, setTyping] = React.useState(false);
  const [live, setLive] = React.useState<{ index: number; text: string } | null>(null);
  const threadRef = React.useRef<HTMLDivElement>(null);
  const answer = items[queue ?? -1]?.answer;

  React.useEffect(() => {
    if (queue === null || answer === undefined) return;
    const index = queue;
    const text = answer;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = Math.max(1, Math.round(2 * speed));
    const ids: number[] = [];
    const finish = () => {
      setTyping(false);
      setLive(null);
      setAsked((a) => (a.includes(index) ? a : [...a, index]));
      setQueue(null);
    };
    ids.push(
      window.setTimeout(() => {
        if (reduce) {
          finish();
          return;
        }
        setTyping(true);
        ids.push(
          window.setTimeout(() => {
            setTyping(false);
            let n = 0;
            const tick = () => {
              n = Math.min(text.length, n + step);
              if (n >= text.length) {
                finish();
                return;
              }
              setLive({ index, text: text.slice(0, n) });
              ids.push(window.setTimeout(tick, 16));
            };
            tick();
          }, 750),
        );
      }, 350),
    );
    return () => ids.forEach((t) => window.clearTimeout(t));
  }, [queue, answer, speed]);

  React.useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [asked, typing, live, queue]);

  const busy = queue !== null;

  const ask = (i: number) => {
    if (busy || asked.includes(i)) return;
    setQueue(i);
    onAsk?.(items[i], i);
  };

  const reset = () => {
    if (busy) return;
    setAsked([]);
  };

  const lines: Line[] = [];
  asked.forEach((i) => {
    const it = items[i];
    if (!it) return;
    lines.push({ key: `q${i}`, from: "user", text: it.question });
    lines.push({ key: `a${i}`, from: "bot", text: it.answer });
  });

  const remaining = items.map((it, i) => ({ it, i })).filter(({ i }) => !asked.includes(i) && i !== queue);
  const vars = { "--hb-yi7-accent": accent, ...style } as React.CSSProperties;

  const arrow = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );

  return (
    <section className={`hb-yi7 ${className}`} style={vars} {...rest}>
      <style href="hb-faq-chat-thread" precedence="default">{css}</style>
      <div className="hb-yi7-inner">
        <div>
          {eyebrow ? <p className="hb-yi7-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-yi7-title">{title}</h2>
          {subtitle ? <p className="hb-yi7-sub">{subtitle}</p> : null}
          <ol className="hb-yi7-list">
            {items.map((it, i) => {
              const done = asked.includes(i) || queue === i;
              return (
                <li key={it.question}>
                  <button type="button" className="hb-yi7-q" data-asked={done} disabled={busy && !done} aria-disabled={done} onClick={() => ask(i)}>
                    <span className="hb-yi7-num" aria-hidden="true">
                      {done ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      ) : (
                        String(i + 1).padStart(2, "0")
                      )}
                    </span>
                    {it.question}
                    {done ? null : arrow}
                  </button>
                </li>
              );
            })}
          </ol>
          {contact ? (
            <a className="hb-yi7-link" href={contact.href}>
              {contact.label}
            </a>
          ) : null}
        </div>

        <div className="hb-yi7-win">
          <div className="hb-yi7-bar">
            <span className="hb-yi7-bot" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 5h16v11H9l-5 4z" />
                <path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01" />
              </svg>
            </span>
            <p>
              {botName}
              <small>Answers instantly, humans on weekdays</small>
            </p>
            <button type="button" className="hb-yi7-reset" onClick={reset} disabled={busy}>
              Clear
            </button>
          </div>
          <div className="hb-yi7-thread" ref={threadRef} role="log" aria-live="polite" aria-busy={busy}>
            <span className="hb-yi7-day">Today</span>
            {lines.map((l) => (
              <div key={l.key} className="hb-yi7-msg" data-from={l.from}>
                {l.text}
              </div>
            ))}
            {queue !== null && items[queue] ? (
              <>
                <div key={`q${queue}`} className="hb-yi7-msg" data-from="user">
                  {items[queue].question}
                </div>
                {typing ? (
                  <div className="hb-yi7-msg" data-from="bot" aria-label="Typing">
                    <span className="hb-yi7-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                ) : live ? (
                  <div className="hb-yi7-msg" data-from="bot">
                    {live.text}
                    <span className="hb-yi7-cursor" aria-hidden="true" />
                  </div>
                ) : null}
              </>
            ) : null}
            {lines.length && queue === null ? <span className="hb-yi7-meta">Read</span> : null}
          </div>
          <div className="hb-yi7-chips" role="group" aria-label="Suggested questions">
            {remaining.length ? (
              remaining.map(({ it, i }) => (
                <button key={it.question} type="button" className="hb-yi7-chip" disabled={busy} onClick={() => ask(i)}>
                  {it.question}
                </button>
              ))
            ) : (
              <p className="hb-yi7-done">That is every question. Need more? Message the team.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
