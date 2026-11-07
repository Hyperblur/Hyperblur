"use client";

import * as React from "react";

export interface ChatBubbleTypingLabels {
  online: string;
  typing: string;
  reply: string;
}

export interface ChatBubbleTypingProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  initials?: string;
  messages?: string[];
  time?: string;
  phone?: string;
  message?: string;
  href?: string;
  typingDuration?: number;
  wordDelay?: number;
  messageGap?: number;
  startDelay?: number;
  loop?: boolean;
  loopDelay?: number;
  showHeader?: boolean;
  showReply?: boolean;
  theme?: "dark" | "light";
  accent?: string;
  labels?: Partial<ChatBubbleTypingLabels>;
}

const defaultLabels: ChatBubbleTypingLabels = {
  online: "online",
  typing: "typing...",
  reply: "Reply on chat",
};

const defaultMessages = [
  "Hi Sam! Your order #2048 is on the grill right now.",
  "Ready for pickup in about 15 minutes. Want to add a cold drink?",
];

const css = `
.hb-ob4 {
  --hb-ob4-bg: #0d0d0d;
  --hb-ob4-bubble: #1b1b1b;
  --hb-ob4-line: #262626;
  --hb-ob4-text: #ededed;
  --hb-ob4-muted: #8f8f8f;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-height: 0;
  padding: 12px;
  border: 1px solid var(--hb-ob4-line);
  border-radius: 20px;
  background:
    radial-gradient(120% 70% at 0% 0%, color-mix(in srgb, var(--hb-ob4-accent) 7%, transparent) 0%, transparent 60%),
    var(--hb-ob4-bg);
  color: var(--hb-ob4-text);
  font-family: inherit;
  font-size: 13.5px;
  line-height: 1.42;
  container-type: inline-size;
}
.hb-ob4 *, .hb-ob4 *::before, .hb-ob4 *::after { box-sizing: border-box; }
.hb-ob4[data-theme="light"] {
  --hb-ob4-bg: #f3f1ec;
  --hb-ob4-bubble: #ffffff;
  --hb-ob4-line: #e3dfd6;
  --hb-ob4-text: #161616;
  --hb-ob4-muted: #75716a;
}
.hb-ob4-head { display: flex; flex: none; align-items: center; gap: 10px; }
.hb-ob4-av {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(140deg, #f59e0b 0%, #ea580c 55%, #9a3412 100%);
  color: #fff;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
}
.hb-ob4-on {
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 11px;
  height: 11px;
  border: 2px solid var(--hb-ob4-bg);
  border-radius: 50%;
  background: var(--hb-ob4-accent);
}
.hb-ob4-who { display: flex; min-width: 0; flex-direction: column; }
.hb-ob4-name { overflow: hidden; font-size: 14px; font-weight: 650; line-height: 1.2; white-space: nowrap; text-overflow: ellipsis; }
.hb-ob4-status { color: var(--hb-ob4-muted); font-size: 12px; line-height: 1.3; transition: color 0.2s ease; }
.hb-ob4-status[data-typing="true"] { color: var(--hb-ob4-accent); }
.hb-ob4-log { display: flex; flex: 1 1 auto; min-height: 0; flex-direction: column; justify-content: flex-end; gap: 6px; overflow: hidden; padding-top: 2px; }
.hb-ob4-msg {
  position: relative;
  align-self: flex-start;
  max-width: 88%;
  padding: 8px 12px 7px;
  border: 1px solid var(--hb-ob4-line);
  border-radius: 4px 16px 16px 16px;
  background: var(--hb-ob4-bubble);
  animation: hb-ob4-pop 0.32s cubic-bezier(0.25, 1.3, 0.5, 1) both;
  transform-origin: 0 0;
}
.hb-ob4-msg + .hb-ob4-msg { border-radius: 16px; }
.hb-ob4[data-theme="light"] .hb-ob4-msg { box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06); }
.hb-ob4-w { animation: hb-ob4-word 0.28s ease both; }
.hb-ob4-time { float: right; margin: 6px 0 -2px 10px; color: var(--hb-ob4-muted); font-size: 10.5px; line-height: 1; font-variant-numeric: tabular-nums; }
.hb-ob4-dots { display: inline-flex; align-items: center; gap: 4px; height: 19px; padding: 0 2px; }
.hb-ob4-dots span { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-ob4-muted); animation: hb-ob4-dot 1.2s ease-in-out infinite; }
.hb-ob4-dots span:nth-child(2) { animation-delay: 0.16s; }
.hb-ob4-dots span:nth-child(3) { animation-delay: 0.32s; }
.hb-ob4-reply {
  display: inline-flex;
  flex: none;
  align-items: center;
  align-self: flex-start;
  gap: 7px;
  height: 32px;
  padding: 0 14px 0 11px;
  border-radius: 999px;
  background: var(--hb-ob4-accent);
  color: #062a14;
  font-size: 12.5px;
  font-weight: 650;
  text-decoration: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition: opacity 0.35s ease, transform 0.35s ease, visibility 0s 0.35s, filter 0.15s ease;
}
.hb-ob4-reply[data-show="true"] { opacity: 1; visibility: visible; transform: none; transition: opacity 0.35s ease, transform 0.35s ease, visibility 0s, filter 0.15s ease; }
.hb-ob4-reply:hover { filter: brightness(1.08); }
.hb-ob4-reply:focus-visible { outline: 2px solid var(--hb-ob4-accent); outline-offset: 3px; }
.hb-ob4-reply svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-ob4-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 300px) {
  .hb-ob4-av { width: 28px; height: 28px; font-size: 11px; }
  .hb-ob4-msg { max-width: 94%; }
  .hb-ob4 { font-size: 13px; }
}
@container (min-width: 520px) {
  .hb-ob4 { padding: 16px; font-size: 14.5px; }
  .hb-ob4-msg { max-width: 70%; }
}
@keyframes hb-ob4-pop { from { opacity: 0; transform: scale(0.86) translateY(4px); } to { opacity: 1; transform: none; } }
@keyframes hb-ob4-word { from { opacity: 0; filter: blur(2px); } to { opacity: 1; filter: blur(0); } }
@keyframes hb-ob4-dot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.45; } 30% { transform: translateY(-4px); opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ob4-msg, .hb-ob4-w, .hb-ob4-dots span { animation: none; }
  .hb-ob4-reply, .hb-ob4-reply[data-show="true"], .hb-ob4-status { transition: none; }
}
`;

function chatHref(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

function hash(n: number) {
  let x = (n ^ 0x9e3779b9) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35) >>> 0;
  return (x ^ (x >>> 16)) >>> 0;
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w.charAt(0)))
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

type Step = { msg: number; words: number; typing: boolean; done: boolean };

export function ChatBubbleTyping({
  name = "Corner Kitchen",
  initials,
  messages = defaultMessages,
  time = "7:42 PM",
  phone = "1 555 555 0142",
  message = "Hi! Yes, please add a lemonade.",
  href,
  typingDuration = 1300,
  wordDelay = 95,
  messageGap = 700,
  startDelay = 400,
  loop = false,
  loopDelay = 4200,
  showHeader = true,
  showReply = true,
  theme = "dark",
  accent = "#25d366",
  labels,
  className,
  style,
  ...rest
}: ChatBubbleTypingProps) {
  const l = { ...defaultLabels, ...labels };
  const key = messages.join("\u0001");
  const split = React.useMemo(() => key.split("\u0001").map((m) => m.split(/\s+/).filter(Boolean)), [key]);
  const [step, setStep] = React.useState<Step>({ msg: 0, words: 0, typing: true, done: false });

  React.useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;
    const wait = (ms: number, fn: () => void) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) fn();
        }, ms),
      );
    };
    const total = split.length;
    if (!total) return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      wait(0, () => setStep({ msg: total - 1, words: split[total - 1].length, typing: false, done: true }));
      return () => {
        cancelled = true;
        timers.forEach(clearTimeout);
      };
    }
    const delayFor = (i: number, w: number) => {
      const word = split[i][w - 1] ?? "";
      let ms = wordDelay + word.length * 9 + (hash(i * 131 + w * 17) % 70);
      if (/[.!?]["')]?$/.test(word)) ms += 320;
      else if (/[,;:]$/.test(word)) ms += 170;
      return ms;
    };
    const reveal = (i: number, w: number) => {
      setStep({ msg: i, words: w, typing: false, done: false });
      if (w < split[i].length) wait(delayFor(i, w), () => reveal(i, w + 1));
      else if (i + 1 < total) wait(messageGap, () => type(i + 1));
      else {
        wait(120, () => setStep({ msg: i, words: w, typing: false, done: true }));
        if (loop) wait(loopDelay, () => type(0));
      }
    };
    const type = (i: number) => {
      setStep({ msg: i, words: 0, typing: true, done: false });
      wait(typingDuration, () => reveal(i, 1));
    };
    wait(startDelay, () => type(0));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [split, typingDuration, wordDelay, messageGap, startDelay, loop, loopDelay]);

  const replyHref = href ?? chatHref(phone, message);
  const shown = split.slice(0, step.msg + 1);

  return (
    <div
      className={["hb-ob4", className].filter(Boolean).join(" ")}
      data-theme={theme}
      style={{ "--hb-ob4-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-chat-bubble-typing" precedence="default">{css}</style>
      {showHeader ? (
        <div className="hb-ob4-head">
          <span className="hb-ob4-av" aria-hidden="true">
            {initials ?? initialsOf(name)}
            <span className="hb-ob4-on" />
          </span>
          <span className="hb-ob4-who">
            <span className="hb-ob4-name">{name}</span>
            <span className="hb-ob4-status" data-typing={step.typing ? "true" : "false"}>
              {step.typing ? l.typing : l.online}
            </span>
          </span>
        </div>
      ) : null}
      <div className="hb-ob4-log">
        {shown.map((words, i) => {
          const isCurrent = i === step.msg;
          if (isCurrent && step.typing) {
            return (
              <div key={`t${i}`} className="hb-ob4-msg" aria-label={l.typing}>
                <span className="hb-ob4-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            );
          }
          const visible = isCurrent ? words.slice(0, step.words) : words;
          const complete = visible.length === words.length;
          return (
            <div key={`m${i}`} className="hb-ob4-msg">
              <span className="hb-ob4-sr">{words.join(" ")}</span>
              <span aria-hidden="true">
                {visible.map((w, j) => (
                  <span key={j} className="hb-ob4-w">
                    {j ? " " : ""}
                    {w}
                  </span>
                ))}
              </span>
              {complete && time ? (
                <span className="hb-ob4-time" aria-hidden="true">
                  {time}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      {showReply ? (
        <a
          className="hb-ob4-reply"
          href={replyHref}
          target="_blank"
          rel="noopener noreferrer"
          data-show={step.done ? "true" : "false"}
          tabIndex={step.done ? undefined : -1}
          aria-hidden={step.done ? undefined : true}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H13" />
          </svg>
          {l.reply}
        </a>
      ) : null}
    </div>
  );
}
