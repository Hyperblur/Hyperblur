"use client";

import * as React from "react";

export interface FaqBranchingChatNode {
  question: string;
  answer: string;
  next?: string[];
}

export interface FaqBranchingChatProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  agentName?: string;
  greeting?: string;
  nodes?: Record<string, FaqBranchingChatNode>;
  roots?: string[];
  initialPath?: string[];
  contact?: { label: string; href: string };
  typingDelay?: number;
  onAsk?: (id: string) => void;
  onFeedback?: (id: string, helpful: boolean) => void;
  accent?: string;
}

type Msg = { key: string; from: "bot" | "user"; text: string; node?: string };

const css = `
.hb-wc11 {
  --hb-wc11-accent: #ff6b4a;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc11 *, .hb-wc11 *::before, .hb-wc11 *::after { box-sizing: border-box; }
.hb-wc11-inner { display: grid; gap: 40px; max-width: 1140px; margin: 0 auto; padding: 72px 20px; }
.hb-wc11-copy { display: grid; align-content: center; }
.hb-wc11-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 16px; color: var(--hb-wc11-accent); font-size: 13px; font-weight: 650; }
.hb-wc11-title { margin: 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(32px, 5cqi, 52px); font-weight: 600; line-height: 1.02; letter-spacing: -.04em; text-wrap: balance; }
.hb-wc11-sub { margin: 16px 0 0; max-width: 420px; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; }
.hb-wc11-steps { display: grid; gap: 12px; margin: 28px 0 0; padding: 0; list-style: none; }
.hb-wc11-steps li { display: flex; align-items: center; gap: 12px; color: #a1a1a1; font-size: 14px; }
.hb-wc11-steps b { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 7px; background: #171717; color: #ededed; font-size: 12px; font-weight: 650; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08); }
.hb-wc11-human { display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; color: #ededed; font-size: 14px; font-weight: 600; text-decoration: none; }
.hb-wc11-human svg { width: 14px; height: 14px; transition: transform .3s ease; }
.hb-wc11-human:hover svg { transform: translateX(3px); }
.hb-wc11-human:focus-visible, .hb-wc11-opt:focus-visible, .hb-wc11-vote:focus-visible, .hb-wc11-reset:focus-visible { outline: 2px solid var(--hb-wc11-accent); outline-offset: 2px; }
.hb-wc11-widget { position: relative; display: flex; flex-direction: column; width: 100%; max-width: 460px; height: 540px; margin: 0 auto; border: 1px solid rgba(255, 255, 255, .09); border-radius: 22px; background: #0f0f0f; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 50px 100px -40px rgba(0, 0, 0, .9), 0 0 0 8px rgba(255, 255, 255, .02); overflow: hidden; }
.hb-wc11-widget::before { content: ""; position: absolute; left: -20%; right: -20%; top: -40%; height: 70%; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-wc11-accent) 22%, transparent), transparent); pointer-events: none; }
.hb-wc11-top { position: relative; display: flex; align-items: center; gap: 12px; padding: 16px 16px 14px; border-bottom: 1px solid rgba(255, 255, 255, .07); }
.hb-wc11-agents { display: flex; }
.hb-wc11-agents i { position: relative; display: grid; place-items: center; width: 32px; height: 32px; margin-left: -9px; border: 2px solid #0f0f0f; border-radius: 50%; color: #fff; font-size: 11px; font-weight: 700; font-style: normal; }
.hb-wc11-agents i:first-child { margin-left: 0; }
.hb-wc11-agents i:last-child::after { content: ""; position: absolute; right: -1px; bottom: -1px; width: 9px; height: 9px; border: 2px solid #0f0f0f; border-radius: 50%; background: #22c55e; }
.hb-wc11-who { display: grid; gap: 1px; min-width: 0; }
.hb-wc11-who b { font-size: 14.5px; font-weight: 650; }
.hb-wc11-who span { color: #7a7a7a; font-size: 12px; }
.hb-wc11-reset { margin-left: auto; height: 30px; padding: 0 10px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 8px; background: transparent; color: #a1a1a1; font: inherit; font-size: 12px; cursor: pointer; transition: color .2s ease, border-color .2s ease; }
.hb-wc11-reset:hover { color: #ededed; border-color: rgba(255, 255, 255, .2); }
.hb-wc11-thread { position: relative; flex: 1; display: flex; flex-direction: column; gap: 10px; padding: 16px; overflow-y: auto; scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: #262626 transparent; overscroll-behavior: contain; }
.hb-wc11-msg { max-width: 84%; padding: 10px 13px; border-radius: 16px; font-size: 14px; line-height: 1.5; animation: hb-wc11-in .38s cubic-bezier(.2, .9, .3, 1.15) both; }
.hb-wc11-msg[data-from="bot"] { align-self: flex-start; border-bottom-left-radius: 5px; background: #191919; color: #d6d6d6; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .05); transform-origin: 0 100%; }
.hb-wc11-msg[data-from="user"] { align-self: flex-end; border-bottom-right-radius: 5px; background: var(--hb-wc11-accent); color: #fff; font-weight: 550; transform-origin: 100% 100%; box-shadow: 0 8px 20px -10px var(--hb-wc11-accent); }
.hb-wc11-fb { display: flex; align-items: center; gap: 6px; margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255, 255, 255, .06); color: #6f6f6f; font-size: 12px; }
.hb-wc11-vote { display: inline-grid; place-items: center; width: 26px; height: 26px; padding: 0; border: 1px solid rgba(255, 255, 255, .08); border-radius: 7px; background: transparent; color: #8f8f8f; cursor: pointer; transition: color .2s ease, background .2s ease, transform .3s cubic-bezier(.3, 1.8, .5, 1); }
.hb-wc11-vote:hover { color: #ededed; }
.hb-wc11-vote[aria-pressed="true"] { color: var(--hb-wc11-accent); border-color: color-mix(in srgb, var(--hb-wc11-accent) 50%, transparent); background: color-mix(in srgb, var(--hb-wc11-accent) 12%, transparent); transform: scale(1.12); }
.hb-wc11-vote svg { width: 13px; height: 13px; }
.hb-wc11-typing { display: inline-flex; align-self: flex-start; gap: 4px; padding: 13px 14px; border-radius: 16px; border-bottom-left-radius: 5px; background: #191919; animation: hb-wc11-in .3s ease both; }
.hb-wc11-typing i { width: 6px; height: 6px; border-radius: 50%; background: #8f8f8f; font-style: normal; animation: hb-wc11-dot 1.1s ease-in-out infinite; }
.hb-wc11-typing i:nth-child(2) { animation-delay: .15s; }
.hb-wc11-typing i:nth-child(3) { animation-delay: .3s; }
.hb-wc11-dock { position: relative; padding: 12px 14px 14px; border-top: 1px solid rgba(255, 255, 255, .07); background: linear-gradient(180deg, #111, #0d0d0d); }
.hb-wc11-dock p { margin: 0 0 10px; color: #6f6f6f; font-size: 11.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-wc11-opts { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-wc11-opt { display: inline-flex; align-items: center; gap: 6px; max-width: 100%; height: 32px; padding: 0 12px; border: 1px solid color-mix(in srgb, var(--hb-wc11-accent) 35%, rgba(255, 255, 255, .1)); border-radius: 999px; background: color-mix(in srgb, var(--hb-wc11-accent) 7%, transparent); color: #f1f1f1; font: inherit; font-size: 13px; font-weight: 550; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; animation: hb-wc11-chip .35s cubic-bezier(.2, .9, .3, 1.2) both; transition: background .2s ease, border-color .2s ease, transform .15s ease; }
.hb-wc11-opt:nth-child(2) { animation-delay: .05s; }
.hb-wc11-opt:nth-child(3) { animation-delay: .1s; }
.hb-wc11-opt:nth-child(4) { animation-delay: .15s; }
.hb-wc11-opt:hover { background: color-mix(in srgb, var(--hb-wc11-accent) 18%, transparent); border-color: var(--hb-wc11-accent); }
.hb-wc11-opt:active { transform: scale(.96); }
.hb-wc11-opt:disabled { opacity: .45; cursor: default; }
.hb-wc11-opt[data-kind="human"] { border-color: rgba(255, 255, 255, .12); background: transparent; color: #a1a1a1; }
@keyframes hb-wc11-in { from { opacity: 0; transform: translateY(8px) scale(.94); } }
@keyframes hb-wc11-chip { from { opacity: 0; transform: translateY(6px); } }
@keyframes hb-wc11-dot { 0%, 60%, 100% { transform: translateY(0); opacity: .5; } 30% { transform: translateY(-4px); opacity: 1; } }
@container (min-width: 820px) {
  .hb-wc11-inner { grid-template-columns: minmax(0, 1fr) minmax(0, 460px); gap: 72px; padding: 104px 40px; }
  .hb-wc11-widget { margin: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc11 *, .hb-wc11 *::before, .hb-wc11 *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
`;

const defaultNodes: Record<string, FaqBranchingChatNode> = {
  shipping: { question: "How long does shipping take?", answer: "Orders leave our Portland studio within one business day. Domestic delivery takes 2 to 4 days, and international orders arrive in 6 to 10.", next: ["tracking", "international", "returns"] },
  tracking: { question: "Where is my tracking number?", answer: "It arrives by email the moment your parcel is scanned, usually the same evening. You can also find it under Orders in your account.", next: ["late", "returns"] },
  late: { question: "My order is late, what now?", answer: "If tracking has not moved for 3 days, reply to your confirmation email and we will reship it at no cost, no questions asked.", next: ["returns"] },
  international: { question: "Do you charge customs fees?", answer: "For the EU, UK and Canada we prepay duties at checkout, so nothing is due on delivery. Elsewhere, local fees may apply.", next: ["returns", "tracking"] },
  returns: { question: "What is your return policy?", answer: "Return anything unused within 60 days for a full refund. Start a return from your order page and we email a prepaid label.", next: ["refund", "exchange"] },
  refund: { question: "When will I get my refund?", answer: "Refunds go back to your original payment method within 2 business days of the return reaching us. Banks can take up to 5 more days.", next: ["exchange"] },
  exchange: { question: "Can I exchange for another size?", answer: "Yes. Choose exchange instead of refund and we ship the new size as soon as your return is scanned, so you are not waiting twice.", next: ["shipping"] },
  care: { question: "How do I care for linen?", answer: "Wash cold on a gentle cycle and line dry. Linen softens with every wash, and a warm iron while slightly damp removes creases.", next: ["returns"] },
};

const agents = [
  { i: "MA", c: "#f97316" },
  { i: "JS", c: "#8b5cf6" },
  { i: "LK", c: "#0ea5e9" },
];

function build(greeting: string, path: string[], nodes: Record<string, FaqBranchingChatNode>): Msg[] {
  const out: Msg[] = [{ key: "g", from: "bot", text: greeting }];
  path.forEach((id, n) => {
    const node = nodes[id];
    if (!node) return;
    out.push({ key: `u${n}-${id}`, from: "user", text: node.question });
    out.push({ key: `b${n}-${id}`, from: "bot", text: node.answer, node: id });
  });
  return out;
}

export function FaqBranchingChat({
  eyebrow = "Instant answers",
  title = "Ask like you would ask a friend.",
  subtitle = "Pick a question and the next ones follow from your answer, so you reach the detail you need in two or three taps.",
  agentName = "Fern & Field support",
  greeting = "Hi there. What can we help you with today?",
  nodes = defaultNodes,
  roots = ["shipping", "returns", "care"],
  initialPath = ["shipping"],
  contact = { label: "Talk to a person", href: "#" },
  typingDelay = 900,
  onAsk,
  onFeedback,
  accent = "#ff6b4a",
  className = "",
  style,
  ...rest
}: FaqBranchingChatProps) {
  const [msgs, setMsgs] = React.useState<Msg[]>(() => build(greeting, initialPath, nodes));
  const [typing, setTyping] = React.useState(false);
  const [votes, setVotes] = React.useState<Record<string, boolean>>({});
  const [count, setCount] = React.useState(initialPath.length);
  const thread = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = React.useRef(false);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  React.useEffect(() => {
    const el = thread.current;
    if (!el) return;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  const lastNode = [...msgs].reverse().find((m) => m.node)?.node;
  const asked = new Set(msgs.filter((m) => m.node).map((m) => m.node));
  const pool = lastNode ? nodes[lastNode]?.next ?? roots : roots;
  const options = pool.filter((id) => nodes[id] && !(id === lastNode));
  const shown = options.length ? options : roots.filter((id) => !asked.has(id));

  const ask = (id: string) => {
    const node = nodes[id];
    if (!node || typing) return;
    onAsk?.(id);
    const n = count;
    setCount(n + 1);
    setMsgs((m) => [...m, { key: `u${n}-${id}`, from: "user", text: node.question }]);
    setTyping(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = reduced ? 0 : Math.max(200, typingDelay + Math.min(900, node.answer.length * 4));
    timer.current = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { key: `b${n}-${id}`, from: "bot", text: node.answer, node: id }]);
    }, wait);
  };

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setTyping(false);
    setVotes({});
    setCount(0);
    setMsgs(build(greeting, [], nodes));
  };

  const vote = (key: string, node: string, helpful: boolean) => {
    setVotes((v) => ({ ...v, [key]: helpful }));
    onFeedback?.(node, helpful);
  };

  const vars = { "--hb-wc11-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-wc11 ${className}`} style={vars} {...rest}>
      <style href="hb-faq-branching-chat" precedence="default">{css}</style>
      <div className="hb-wc11-inner">
        <div className="hb-wc11-copy">
          {eyebrow ? <p className="hb-wc11-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-wc11-title">{title}</h2>
          {subtitle ? <p className="hb-wc11-sub">{subtitle}</p> : null}
          <ul className="hb-wc11-steps">
            <li>
              <b>1</b>Tap a question
            </li>
            <li>
              <b>2</b>Follow the next best question
            </li>
            <li>
              <b>3</b>Still unsure? Hand over to a person
            </li>
          </ul>
          {contact ? (
            <a className="hb-wc11-human" href={contact.href}>
              {contact.label}
              <svg viewBox="0 0 14 14" aria-hidden="true">
                <path d="M2.5 7h8.5M7.5 3.5L11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
        </div>
        <div className="hb-wc11-widget">
          <div className="hb-wc11-top">
            <span className="hb-wc11-agents" aria-hidden="true">
              {agents.map((a) => (
                <i key={a.i} style={{ background: `linear-gradient(135deg, ${a.c}, #1c1c1c)` }}>
                  {a.i}
                </i>
              ))}
            </span>
            <span className="hb-wc11-who">
              <b>{agentName}</b>
              <span>Usually replies in 3 minutes</span>
            </span>
            <button type="button" className="hb-wc11-reset" onClick={reset}>
              Start over
            </button>
          </div>
          <div ref={thread} className="hb-wc11-thread" role="log" aria-live="polite" aria-label="Conversation">
            {msgs.map((m) => (
              <div key={m.key} className="hb-wc11-msg" data-from={m.from}>
                {m.text}
                {m.node ? (
                  <div className="hb-wc11-fb">
                    Helpful?
                    <button type="button" className="hb-wc11-vote" aria-pressed={votes[m.key] === true} aria-label="Yes, helpful" onClick={() => vote(m.key, m.node as string, true)}>
                      <svg viewBox="0 0 14 14" aria-hidden="true">
                        <path d="M4.5 6.5v5.5h-2V6.5zM4.5 6.5L7 1.8c1 0 1.6.8 1.4 1.8L8 5.5h3.2c.8 0 1.4.8 1.2 1.6l-1 4c-.2.6-.7.9-1.3.9H4.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button type="button" className="hb-wc11-vote" aria-pressed={votes[m.key] === false} aria-label="No, not helpful" onClick={() => vote(m.key, m.node as string, false)}>
                      <svg viewBox="0 0 14 14" aria-hidden="true" style={{ transform: "rotate(180deg)" }}>
                        <path d="M4.5 6.5v5.5h-2V6.5zM4.5 6.5L7 1.8c1 0 1.6.8 1.4 1.8L8 5.5h3.2c.8 0 1.4.8 1.2 1.6l-1 4c-.2.6-.7.9-1.3.9H4.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
            {typing ? (
              <span className="hb-wc11-typing" aria-label="Typing">
                <i />
                <i />
                <i />
              </span>
            ) : null}
          </div>
          <div className="hb-wc11-dock">
            <p>{lastNode ? "Related questions" : "Popular questions"}</p>
            <div className="hb-wc11-opts" key={`${lastNode ?? "root"}-${msgs.length}`}>
              {shown.slice(0, 3).map((id) => (
                <button key={id} type="button" className="hb-wc11-opt" disabled={typing} onClick={() => ask(id)}>
                  {nodes[id].question}
                </button>
              ))}
              {contact ? (
                <a className="hb-wc11-opt" data-kind="human" href={contact.href}>
                  {contact.label}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
