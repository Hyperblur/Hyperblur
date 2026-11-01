"use client";

import * as React from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  time?: string;
  streaming?: boolean;
}

export interface ChatThreadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  messages?: ChatMessage[];
  userName?: string;
  assistantName?: string;
  avatars?: { user?: React.ReactNode; assistant?: React.ReactNode };
  maxHeight?: number;
  typing?: boolean;
  color?: string;
  speed?: number;
}

const css = `
@keyframes hb-ct-blink {
  0%, 49.9% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes hb-ct-dot {
  0%, 80%, 100% { opacity: .3; transform: scale(.75); }
  40% { opacity: 1; transform: scale(1); }
}
@keyframes hb-ct-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
.hb-ct {
  box-sizing: border-box;
  width: 100%;
  overflow-y: auto;
  border: 1px solid #262626;
  border-radius: 14px;
  color: #ededed;
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  background: #111111;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
}
.hb-ct:focus-visible { outline: 2px solid var(--hb-ct-accent, #2f7bff); outline-offset: -2px; }
.hb-ct-list { display: flex; flex-direction: column; gap: 12px; padding: 12px; }
.hb-ct-row { display: flex; align-items: flex-end; gap: 8px; animation: hb-ct-in .3s ease both; }
.hb-ct-row[data-role="user"] { flex-direction: row-reverse; }
.hb-ct-avatar {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 24px;
  height: 24px;
  overflow: hidden;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .02em;
  color: #ffffff;
  background: var(--hb-ct-accent, #2f7bff);
}
.hb-ct-avatar[data-role="assistant"] { background: #8b5cf6; }
.hb-ct-avatar > * { max-width: 100%; max-height: 100%; }
.hb-ct-col { display: flex; flex-direction: column; gap: 3px; min-width: 0; max-width: calc(100% - 34px); }
.hb-ct-row[data-role="user"] .hb-ct-col { align-items: flex-end; }
.hb-ct-bubble {
  position: relative;
  margin: 0;
  padding: 8px 12px;
  border: 1px solid #262626;
  border-radius: 14px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  background: #171717;
}
.hb-ct-row[data-role="assistant"] .hb-ct-bubble { border-bottom-left-radius: 4px; }
.hb-ct-row[data-role="user"] .hb-ct-bubble {
  border-color: transparent;
  border-bottom-right-radius: 4px;
  color: #ffffff;
  background: var(--hb-ct-accent, #2f7bff);
}
.hb-ct-time { padding: 0 4px; color: #8f8f8f; font-size: 10.5px; }
.hb-ct-system { align-self: center; color: #8f8f8f; font-size: 11.5px; text-align: center; animation: hb-ct-in .3s ease both; }
.hb-ct-b { font-weight: 600; color: #ffffff; }
.hb-ct-c {
  padding: 1px 5px;
  border-radius: 5px;
  font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .88em;
  background: rgba(255,255,255,.1);
}
.hb-ct-row[data-role="assistant"] .hb-ct-c { border: 1px solid #262626; background: #0d0d0d; }
.hb-ct-caret {
  display: inline-block;
  width: 2px;
  height: 1.05em;
  margin-left: 2px;
  vertical-align: -0.18em;
  border-radius: 1px;
  background: #8b5cf6;
  animation: hb-ct-blink 1s linear infinite;
}
.hb-ct-typing { display: inline-flex; gap: 4px; align-items: center; padding: 6px 0; }
.hb-ct-typing i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #8f8f8f;
  animation: hb-ct-dot 1.2s ease-in-out infinite;
}
.hb-ct-typing i:nth-child(2) { animation-delay: .15s; }
.hb-ct-typing i:nth-child(3) { animation-delay: .3s; }
.hb-ct-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-ct-row, .hb-ct-system { animation: none; }
  .hb-ct-caret, .hb-ct-typing i { animation: none; }
  .hb-ct-typing i { opacity: .7; }
}
`;

type Kind = "t" | "b" | "c" | "n";

interface Unit {
  s: string;
  k: Kind;
}

function parse(text: string): Unit[] {
  const out: Unit[] = [];
  text.split("\n").forEach((line, li) => {
    if (li > 0) out.push({ s: "\n", k: "n" });
    line.split(/(\*\*[^*]+\*\*|`[^`]+`)/).forEach((seg) => {
      if (!seg) return;
      let k: Kind = "t";
      let body = seg;
      if (seg.length > 4 && seg.startsWith("**") && seg.endsWith("**")) {
        k = "b";
        body = seg.slice(2, -2);
      } else if (seg.length > 2 && seg.startsWith("`") && seg.endsWith("`")) {
        k = "c";
        body = seg.slice(1, -1);
      }
      (body.match(/\S+\s*|\s+/g) ?? []).forEach((s) => out.push({ s, k }));
    });
  });
  return out;
}

function render(units: Unit[], count: number): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const end = Math.min(count, units.length);
  let i = 0;
  while (i < end) {
    const k = units[i].k;
    const from = i;
    if (k === "n") {
      nodes.push(<br key={from} />);
      i += 1;
      continue;
    }
    let s = "";
    while (i < end && units[i].k === k) {
      s += units[i].s;
      i += 1;
    }
    if (k === "b") nodes.push(<strong key={from} className="hb-ct-b">{s}</strong>);
    else if (k === "c") nodes.push(<code key={from} className="hb-ct-c">{s}</code>);
    else nodes.push(<React.Fragment key={from}>{s}</React.Fragment>);
  }
  return nodes;
}

const subscribe = () => () => {};
const getAnimate = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerAnimate = () => false;

function useStream(text: string, total: number, speed: number) {
  const animate = React.useSyncExternalStore(subscribe, getAnimate, getServerAnimate);
  const [count, setCount] = React.useState(0);
  const [prev, setPrev] = React.useState(text);

  if (prev !== text) {
    setPrev(text);
    setCount(0);
  }

  React.useEffect(() => {
    if (!animate) return;
    let n = 0;
    let timer = 0;
    const step = () => {
      n += 1;
      if (n >= total) {
        setCount(total);
        return;
      }
      setCount(n);
      timer = window.setTimeout(step, speed);
    };
    timer = window.setTimeout(() => {
      setCount(0);
      timer = window.setTimeout(step, speed);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [animate, text, total, speed]);

  if (!animate) return { shown: total, active: false };
  const shown = Math.min(count, total);
  return { shown, active: shown < total };
}

function StaticBody({ text }: { text: string }) {
  const units = React.useMemo(() => parse(text), [text]);
  return <>{render(units, units.length)}</>;
}

function StreamBody({ text, speed }: { text: string; speed: number }) {
  const units = React.useMemo(() => parse(text), [text]);
  const { shown, active } = useStream(text, units.length, speed);
  return (
    <>
      {render(units, shown)}
      {active ? <span className="hb-ct-caret" aria-hidden="true" /> : null}
    </>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = Array.from(parts[0])[0] ?? "?";
  const last = parts.length > 1 ? (Array.from(parts[parts.length - 1])[0] ?? "") : "";
  return (first + last).toUpperCase();
}

export function ChatThread({
  messages = [],
  userName = "You",
  assistantName = "Assistant",
  avatars,
  maxHeight = 360,
  typing = false,
  color = "#2f7bff",
  speed = 24,
  className = "",
  style,
  ...rest
}: ChatThreadProps) {
  const scroller = React.useRef<HTMLDivElement>(null);
  const content = React.useRef<HTMLDivElement>(null);
  const stick = React.useRef(true);

  let lastAssistant = -1;
  messages.forEach((m, i) => {
    if (m.role === "assistant") lastAssistant = i;
  });

  const scrollToEnd = React.useCallback(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  React.useEffect(() => {
    const box = content.current;
    if (!box || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      if (stick.current) scrollToEnd();
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, [scrollToEnd]);

  React.useEffect(() => {
    stick.current = true;
    scrollToEnd();
  }, [messages.length, typing, scrollToEnd]);

  function onScroll() {
    const el = scroller.current;
    if (el) stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
  }

  const avatarFor = (role: "user" | "assistant") => {
    const custom = role === "user" ? avatars?.user : avatars?.assistant;
    if (custom) return custom;
    return initials(role === "user" ? userName : assistantName);
  };

  return (
    <div
      ref={scroller}
      className={`hb-ct ${className}`}
      style={{ maxHeight, "--hb-ct-accent": color, ...style } as React.CSSProperties}
      role="log"
      aria-live="polite"
      aria-label="Conversation"
      tabIndex={0}
      onScroll={onScroll}
      {...rest}
    >
      <style href="hb-chat-thread" precedence="default">{css}</style>
      <div ref={content} className="hb-ct-list">
        {messages.map((m, i) => {
          if (m.role === "system") {
            return (
              <div key={m.id} className="hb-ct-system">
                {m.content}
              </div>
            );
          }
          const name = m.role === "user" ? userName : assistantName;
          const live = m.role === "assistant" && m.streaming === true && i === lastAssistant && i === messages.length - 1;
          return (
            <div key={m.id} className="hb-ct-row" data-role={m.role}>
              <span className="hb-ct-avatar" data-role={m.role} aria-hidden="true">
                {avatarFor(m.role)}
              </span>
              <div className="hb-ct-col">
                <p className="hb-ct-bubble" aria-busy={live}>
                  <span className="hb-ct-sr">{name}: </span>
                  {live ? <StreamBody text={m.content} speed={speed} /> : <StaticBody text={m.content} />}
                </p>
                {m.time ? <span className="hb-ct-time">{m.time}</span> : null}
              </div>
            </div>
          );
        })}
        {typing ? (
          <div className="hb-ct-row" data-role="assistant">
            <span className="hb-ct-avatar" data-role="assistant" aria-hidden="true">
              {avatarFor("assistant")}
            </span>
            <div className="hb-ct-col">
              <div className="hb-ct-bubble" role="status" aria-label={`${assistantName} is typing`}>
                <span className="hb-ct-typing" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
