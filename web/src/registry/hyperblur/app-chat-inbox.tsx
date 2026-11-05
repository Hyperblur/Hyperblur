"use client";

import * as React from "react";

export interface AppChatMessage {
  id: string;
  author: string;
  text: string;
  time: string;
  day: string;
  attachments?: string[];
}

export interface AppChatConversation {
  id: string;
  name: string;
  kind: "channel" | "dm";
  members?: string[];
  online?: boolean;
  unread?: number;
  topic?: string;
  messages: AppChatMessage[];
  typing?: string;
}

export interface AppChatInboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  conversations?: AppChatConversation[];
  me?: string;
  defaultConversationId?: string;
  defaultDraft?: string;
  defaultAttachments?: string[];
  accent?: string;
  onSend?: (conversationId: string, message: AppChatMessage) => void;
  onConversationChange?: (id: string) => void;
}

const defaultConversations: AppChatConversation[] = [
  {
    id: "launch",
    name: "launch-week",
    kind: "channel",
    topic: "Shipping v2.15 on Nov 12",
    members: ["Lena Park", "Diego Ramos", "Amara Chen", "Tom Whitaker", "Maya Okafor"],
    unread: 0,
    typing: "Lena Park",
    messages: [
      { id: "m1", author: "Diego Ramos", day: "Yesterday", time: "5:48 PM", text: "Staging is green again. The Safari tooltip bug was a stacking context on the sidebar." },
      { id: "m2", author: "Diego Ramos", day: "Yesterday", time: "5:49 PM", text: "Fix is in PR 2381 if anyone wants to look before tomorrow." },
      { id: "m3", author: "Maya Okafor", day: "Yesterday", time: "6:02 PM", text: "Reviewed and approved. Nice catch." },
      { id: "m4", author: "Amara Chen", day: "Today", time: "9:12 AM", text: "Final hero is up. I went with the darker gradient, it reads better on the pricing page too.", attachments: ["hero-launch-v4.png"] },
      { id: "m5", author: "Lena Park", day: "Today", time: "9:20 AM", text: "Love it. Can we get a square crop for the social posts?" },
      { id: "m6", author: "Maya Okafor", day: "Today", time: "9:24 AM", text: "I will pair with Amara after standup. Lena, do you still need the changelog draft today?" },
    ],
  },
  {
    id: "lena",
    name: "Lena Park",
    kind: "dm",
    online: true,
    unread: 2,
    messages: [
      { id: "l1", author: "Lena Park", day: "Today", time: "8:41 AM", text: "Morning! Quick one about the annual discount copy." },
      { id: "l2", author: "Lena Park", day: "Today", time: "8:42 AM", text: "Is 'two months free' clearer than '17% off'? Testing both next week." },
    ],
  },
  {
    id: "design",
    name: "design-crit",
    kind: "channel",
    topic: "Thursday 2pm, bring one screen",
    members: ["Amara Chen", "Sofia Lind", "Maya Okafor"],
    unread: 5,
    messages: [
      { id: "d1", author: "Sofia Lind", day: "Monday", time: "3:10 PM", text: "Uploaded the type scale explorations. Feedback welcome before Thursday.", attachments: ["type-scale-v2.fig"] },
      { id: "d2", author: "Amara Chen", day: "Monday", time: "3:32 PM", text: "Option B for headings, option A for body. The 15px base feels right." },
    ],
  },
  {
    id: "diego",
    name: "Diego Ramos",
    kind: "dm",
    online: false,
    messages: [
      { id: "g1", author: "Maya Okafor", day: "Yesterday", time: "4:05 PM", text: "Can you take the tooltip bug? It is blocking the release checklist." },
      { id: "g2", author: "Diego Ramos", day: "Yesterday", time: "4:11 PM", text: "On it, should have something by end of day." },
    ],
  },
  {
    id: "growth",
    name: "growth",
    kind: "channel",
    topic: "Experiments and weekly numbers",
    members: ["Tom Whitaker", "Lena Park", "Maya Okafor"],
    messages: [
      { id: "w1", author: "Tom Whitaker", day: "Yesterday", time: "2:00 PM", text: "Activation up 4.2 points week over week. The checklist is doing work." },
    ],
  },
];

const replies = [
  "Yes please, by 3pm if you can. I will merge it into the release notes.",
  "Sounds good, thanks!",
  "Perfect, adding it to the board now.",
  "Works for me. Ping me when it is ready for review.",
];

const sampleFiles = ["changelog-draft.md", "social-crop-1080.png", "metrics-oct.csv", "launch-checklist.pdf"];
const palette = ["#2f7bff", "#9b6bff", "#ff7a59", "#22b07d", "#e0a526", "#e5508a", "#16a3b8"];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h >>> 0;
}
function initials(name: string) {
  const p = name.split(/\s+/).filter(Boolean);
  return ((p[0]?.[0] ?? "") + (p[1]?.[0] ?? "")).toUpperCase();
}

const css = `
.hb-ye5 {
  --hb-ye5-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.45;
}
.hb-ye5 *, .hb-ye5 *::before, .hb-ye5 *::after { box-sizing: border-box; }
.hb-ye5-shell { display: grid; grid-template-columns: 1fr; height: 100%; }
.hb-ye5-list { display: none; flex-direction: column; min-height: 0; border-right: 1px solid rgba(255,255,255,.08); background: #0d0d0d; }
.hb-ye5-list-h { display: flex; align-items: center; justify-content: space-between; padding: 16px 16px 10px; }
.hb-ye5-list-h h2 { margin: 0; font-size: 16px; font-weight: 600; }
.hb-ye5-search { display: flex; align-items: center; gap: 8px; height: 32px; margin: 0 12px 8px; padding: 0 10px; border: 1px solid #222; border-radius: 8px; background: #111; color: #737373; }
.hb-ye5-search:focus-within { outline: 2px solid var(--hb-ye5-accent); outline-offset: 1px; }
.hb-ye5-search svg { width: 14px; height: 14px; flex: none; }
.hb-ye5-search input { flex: 1; min-width: 0; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 13px; outline: none; }
.hb-ye5-convs { flex: 1; overflow: auto; padding: 0 8px 10px; scrollbar-width: thin; scrollbar-color: #262626 transparent; }
.hb-ye5-sec { padding: 12px 8px 6px; color: #737373; font-size: 11.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-ye5-conv { display: grid; grid-template-columns: 32px 1fr auto; align-items: center; gap: 10px; width: 100%; margin: 0; padding: 8px; border: 0; border-radius: 9px; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; transition: background-color .15s ease; }
.hb-ye5-conv:hover { background: #151515; }
.hb-ye5-conv[aria-selected="true"] { background: #1a1a1a; box-shadow: inset 0 0 0 1px rgba(255,255,255,.05); }
.hb-ye5-conv:focus-visible, .hb-ye5-ib:focus-visible, .hb-ye5-send:focus-visible, .hb-ye5-chipx:focus-visible { outline: 2px solid var(--hb-ye5-accent); outline-offset: 1px; }
.hb-ye5-hash { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 9px; background: #1a1a1a; color: #8f8f8f; font-size: 15px; font-weight: 600; }
.hb-ye5-av { position: relative; display: grid; place-items: center; flex: none; width: 32px; height: 32px; border-radius: 999px; color: #fff; font-size: 11.5px; font-weight: 700; }
.hb-ye5-av[data-online]::after { content: ""; position: absolute; right: -1px; bottom: -1px; width: 10px; height: 10px; border: 2px solid #0d0d0d; border-radius: 999px; background: #4b4b4b; }
.hb-ye5-av[data-online="true"]::after { background: #3ccf91; }
.hb-ye5-conv-main { min-width: 0; }
.hb-ye5-conv-name { overflow: hidden; font-size: 13.5px; font-weight: 500; white-space: nowrap; text-overflow: ellipsis; }
.hb-ye5-conv[data-unread="true"] .hb-ye5-conv-name { font-weight: 700; }
.hb-ye5-conv-prev { overflow: hidden; color: #737373; font-size: 12px; white-space: nowrap; text-overflow: ellipsis; }
.hb-ye5-badge { min-width: 19px; height: 19px; padding: 0 6px; border-radius: 999px; background: var(--hb-ye5-accent); color: #fff; font-size: 11px; font-weight: 700; line-height: 19px; text-align: center; }
.hb-ye5-thread { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.hb-ye5-th { display: flex; align-items: center; gap: 12px; padding: 12px 18px; border-bottom: 1px solid rgba(255,255,255,.08); }
.hb-ye5-th-main { flex: 1; min-width: 0; }
.hb-ye5-th-name { font-size: 15px; font-weight: 600; }
.hb-ye5-th-topic { overflow: hidden; color: #8f8f8f; font-size: 12.5px; white-space: nowrap; text-overflow: ellipsis; }
.hb-ye5-stack { display: flex; }
.hb-ye5-stack .hb-ye5-av { width: 26px; height: 26px; margin-left: -7px; border: 2px solid #0a0a0a; font-size: 9.5px; }
.hb-ye5-stack .hb-ye5-av:first-child { margin-left: 0; }
.hb-ye5-ib { display: grid; place-items: center; width: 32px; height: 32px; flex: none; margin: 0; padding: 0; border: 1px solid transparent; border-radius: 8px; background: transparent; color: #a1a1a1; cursor: pointer; }
.hb-ye5-ib:hover { border-color: #262626; background: #141414; color: #ededed; }
.hb-ye5-ib svg { width: 17px; height: 17px; }
.hb-ye5-msgs { flex: 1; overflow: auto; padding: 8px 18px 14px; scrollbar-width: thin; scrollbar-color: #262626 transparent; }
.hb-ye5-day { position: relative; margin: 14px 0 8px; text-align: center; }
.hb-ye5-day::before { content: ""; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: rgba(255,255,255,.07); }
.hb-ye5-day span { position: relative; padding: 3px 10px; border: 1px solid rgba(255,255,255,.08); border-radius: 999px; background: #0a0a0a; color: #8f8f8f; font-size: 11.5px; font-weight: 500; }
.hb-ye5-grp { display: flex; gap: 10px; margin-top: 12px; animation: hb-ye5-in .32s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye5-grp[data-mine="true"] { flex-direction: row-reverse; }
.hb-ye5-grp .hb-ye5-av { width: 30px; height: 30px; margin-top: 18px; }
.hb-ye5-col { display: flex; flex-direction: column; align-items: flex-start; gap: 3px; max-width: min(76%, 520px); min-width: 0; }
.hb-ye5-grp[data-mine="true"] .hb-ye5-col { align-items: flex-end; }
.hb-ye5-who { display: flex; gap: 8px; padding: 0 4px 2px; font-size: 12px; }
.hb-ye5-who b { font-weight: 600; }
.hb-ye5-who span { color: #737373; }
.hb-ye5-bubble { padding: 8px 12px; border-radius: 4px 14px 14px 4px; background: #171717; color: #e5e5e5; font-size: 13.5px; overflow-wrap: anywhere; box-shadow: inset 0 1px 0 rgba(255,255,255,.04); }
.hb-ye5-who + .hb-ye5-bubble { border-top-left-radius: 14px; }
.hb-ye5-grp[data-mine="true"] .hb-ye5-bubble { border-radius: 14px 4px 4px 14px; background: var(--hb-ye5-accent); color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,.18); }
.hb-ye5-grp[data-mine="true"] .hb-ye5-who + .hb-ye5-bubble { border-top-right-radius: 14px; }
.hb-ye5-file { display: flex; align-items: center; gap: 10px; padding: 8px 12px 8px 8px; border: 1px solid rgba(255,255,255,.08); border-radius: 12px; background: #121212; font-size: 12.5px; }
.hb-ye5-file i { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 8px; background: linear-gradient(135deg, #9b6bff, var(--hb-ye5-accent)); color: #fff; font-style: normal; font-size: 9px; font-weight: 700; text-transform: uppercase; }
.hb-ye5-file small { display: block; color: #737373; font-size: 11px; }
.hb-ye5-typing { display: flex; align-items: center; gap: 10px; margin-top: 14px; color: #8f8f8f; font-size: 12px; animation: hb-ye5-in .3s ease both; }
.hb-ye5-dots { display: inline-flex; gap: 4px; padding: 10px 12px; border-radius: 14px; background: #171717; }
.hb-ye5-dots i { width: 6px; height: 6px; border-radius: 999px; background: #8f8f8f; animation: hb-ye5-dot 1.2s ease-in-out infinite; }
.hb-ye5-dots i:nth-child(2) { animation-delay: .15s; }
.hb-ye5-dots i:nth-child(3) { animation-delay: .3s; }
.hb-ye5-composer { margin: 0 14px 14px; padding: 8px; border: 1px solid #262626; border-radius: 14px; background: #111; transition: border-color .15s ease, box-shadow .15s ease; }
.hb-ye5-composer:focus-within { border-color: color-mix(in srgb, var(--hb-ye5-accent) 60%, #262626); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ye5-accent) 16%, transparent); }
.hb-ye5-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 2px 2px 8px; }
.hb-ye5-chip { display: inline-flex; align-items: center; gap: 7px; height: 28px; padding: 0 4px 0 6px; border: 1px solid rgba(255,255,255,.09); border-radius: 8px; background: #181818; font-size: 12px; animation: hb-ye5-pop .22s cubic-bezier(.2,1.4,.4,1) both; }
.hb-ye5-chip i { width: 16px; height: 16px; border-radius: 4px; background: linear-gradient(135deg, #f2a93b, #ff6f5e); }
.hb-ye5-chipx { display: grid; place-items: center; width: 20px; height: 20px; margin: 0; padding: 0; border: 0; border-radius: 5px; background: transparent; color: #8f8f8f; cursor: pointer; }
.hb-ye5-chipx:hover { background: #2a2a2a; color: #fff; }
.hb-ye5-chipx svg { width: 12px; height: 12px; }
.hb-ye5-input { display: block; width: 100%; min-height: 22px; max-height: 120px; margin: 0; padding: 4px 6px; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 13.5px; line-height: 1.5; resize: none; outline: none; }
.hb-ye5-input::placeholder { color: #666; }
.hb-ye5-tools { display: flex; align-items: center; gap: 2px; padding-top: 4px; }
.hb-ye5-tools .hb-ye5-ib { width: 30px; height: 30px; }
.hb-ye5-hint { margin-left: auto; margin-right: 8px; color: #555; font-size: 11.5px; }
.hb-ye5-send { display: inline-flex; align-items: center; gap: 6px; height: 30px; margin: 0; padding: 0 12px; border: 0; border-radius: 8px; background: var(--hb-ye5-accent); color: #fff; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: opacity .15s ease, transform .15s ease; }
.hb-ye5-send:disabled { opacity: .4; cursor: default; }
.hb-ye5-send:not(:disabled):active { transform: scale(.96); }
.hb-ye5-send svg { width: 14px; height: 14px; }
@keyframes hb-ye5-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes hb-ye5-pop { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: none; } }
@keyframes hb-ye5-dot { 0%, 60%, 100% { transform: translateY(0); opacity: .5; } 30% { transform: translateY(-4px); opacity: 1; } }
@container (min-width: 680px) {
  .hb-ye5-shell { grid-template-columns: 260px 1fr; }
  .hb-ye5-list { display: flex; }
}
@container (max-width: 480px) {
  .hb-ye5-hint, .hb-ye5-stack { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ye5 *, .hb-ye5 *::before, .hb-ye5 *::after { animation: none !important; transition: none !important; }
}
`;

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Avatar({ name, online }: { name: string; online?: boolean }) {
  return (
    <span className="hb-ye5-av" data-online={online === undefined ? undefined : online} style={{ background: palette[hash(name) % palette.length] }} aria-hidden="true">
      {initials(name)}
    </span>
  );
}

export function AppChatInbox({
  conversations: conversationsProp = defaultConversations,
  me = "Maya Okafor",
  defaultConversationId,
  defaultDraft = "",
  defaultAttachments = [],
  accent = "#2f7bff",
  onSend,
  onConversationChange,
  className,
  style,
  ...rest
}: AppChatInboxProps) {
  const [convs, setConvs] = React.useState<AppChatConversation[]>(conversationsProp);
  const [activeId, setActiveId] = React.useState(defaultConversationId ?? conversationsProp[0]?.id);
  const [draft, setDraft] = React.useState(defaultDraft);
  const [attachments, setAttachments] = React.useState<string[]>(defaultAttachments);
  const [query, setQuery] = React.useState("");
  const counter = React.useRef(0);
  const timers = React.useRef<number[]>([]);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const convRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

  const active = convs.find((c) => c.id === activeId) ?? convs[0];
  const filtered = convs.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));
  const channels = filtered.filter((c) => c.kind === "channel");
  const dms = filtered.filter((c) => c.kind === "dm");
  const ordered = [...channels, ...dms];

  React.useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [active?.id, active?.messages.length, active?.typing]);

  const pick = (id: string) => {
    setActiveId(id);
    setConvs((list) => list.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
    onConversationChange?.(id);
  };

  const send = () => {
    const text = draft.trim();
    if (!active || (!text && !attachments.length)) return;
    counter.current += 1;
    const n = counter.current;
    const msg: AppChatMessage = { id: `me-${n}`, author: me, text, time: "Now", day: "Today", attachments: attachments.length ? attachments : undefined };
    const convId = active.id;
    const other = active.kind === "dm" ? active.name : active.typing ?? (active.members ?? []).find((m) => m !== me) ?? active.name;
    setConvs((list) => list.map((c) => (c.id === convId ? { ...c, typing: undefined, messages: [...c.messages, msg] } : c)));
    setDraft("");
    setAttachments([]);
    onSend?.(convId, msg);
    timers.current.push(window.setTimeout(() => {
      setConvs((list) => list.map((c) => (c.id === convId ? { ...c, typing: other } : c)));
    }, 700));
    timers.current.push(window.setTimeout(() => {
      setConvs((list) => list.map((c) => (c.id === convId ? { ...c, typing: undefined, messages: [...c.messages, { id: `re-${n}`, author: other, text: replies[(n - 1) % replies.length], time: "Now", day: "Today" }] } : c)));
    }, 2600));
  };

  const attach = () => {
    const next = sampleFiles.find((f) => !attachments.includes(f));
    if (next) setAttachments((a) => [...a, next]);
    inputRef.current?.focus();
  };

  const onConvKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = ordered[index + (e.key === "ArrowDown" ? 1 : -1)];
    if (next) {
      pick(next.id);
      convRefs.current.get(next.id)?.focus();
    }
  };

  const groups: { day: string; runs: { author: string; items: AppChatMessage[] }[] }[] = [];
  for (const m of active?.messages ?? []) {
    let g = groups[groups.length - 1];
    if (!g || g.day !== m.day) {
      g = { day: m.day, runs: [] };
      groups.push(g);
    }
    const run = g.runs[g.runs.length - 1];
    if (run && run.author === m.author) run.items.push(m);
    else g.runs.push({ author: m.author, items: [m] });
  }

  const renderConv = (c: AppChatConversation) => {
    const last = c.messages[c.messages.length - 1];
    const idx = ordered.indexOf(c);
    return (
      <button
        key={c.id}
        ref={(el) => { if (el) convRefs.current.set(c.id, el); else convRefs.current.delete(c.id); }}
        type="button"
        role="option"
        aria-selected={c.id === active?.id}
        tabIndex={c.id === active?.id ? 0 : -1}
        className="hb-ye5-conv"
        data-unread={!!c.unread}
        onClick={() => pick(c.id)}
        onKeyDown={(e) => onConvKey(e, idx)}
      >
        {c.kind === "channel" ? <span className="hb-ye5-hash" aria-hidden="true">#</span> : <Avatar name={c.name} online={!!c.online} />}
        <span className="hb-ye5-conv-main">
          <span className="hb-ye5-conv-name" style={{ display: "block" }}>{c.name}</span>
          <span className="hb-ye5-conv-prev" style={{ display: "block" }}>
            {c.typing ? "typing..." : last ? `${last.author === me ? "You" : last.author.split(" ")[0]}: ${last.text || "sent a file"}` : "No messages yet"}
          </span>
        </span>
        {c.unread ? <span className="hb-ye5-badge" aria-label={`${c.unread} unread`}>{c.unread}</span> : <span />}
      </button>
    );
  };

  return (
    <div className={["hb-ye5", className].filter(Boolean).join(" ")} style={{ "--hb-ye5-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-app-chat-inbox" precedence="default">{css}</style>
      <div className="hb-ye5-shell">
        <nav className="hb-ye5-list" aria-label="Conversations">
          <div className="hb-ye5-list-h">
            <h2>Northwind</h2>
            <button type="button" className="hb-ye5-ib" aria-label="New message"><Icon d="M4 20h4L19 9l-4-4L4 16v4Zm10-14 4 4" /></button>
          </div>
          <label className="hb-ye5-search">
            <Icon d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 2-4-4" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Jump to..." aria-label="Search conversations" />
          </label>
          <div className="hb-ye5-convs" role="listbox" aria-label="Conversation list">
            {channels.length > 0 && <div className="hb-ye5-sec">Channels</div>}
            {channels.map(renderConv)}
            {dms.length > 0 && <div className="hb-ye5-sec">Direct messages</div>}
            {dms.map(renderConv)}
          </div>
        </nav>
        {active && (
          <section className="hb-ye5-thread" aria-label={active.name}>
            <header className="hb-ye5-th">
              {active.kind === "channel" ? <span className="hb-ye5-hash" aria-hidden="true">#</span> : <Avatar name={active.name} online={!!active.online} />}
              <div className="hb-ye5-th-main">
                <div className="hb-ye5-th-name">{active.name}</div>
                <div className="hb-ye5-th-topic">{active.kind === "channel" ? active.topic ?? `${active.members?.length ?? 0} members` : active.online ? "Active now" : "Away"}</div>
              </div>
              {active.members && (
                <div className="hb-ye5-stack" aria-label={`${active.members.length} members`}>
                  {active.members.slice(0, 4).map((m) => <Avatar key={m} name={m} />)}
                </div>
              )}
              <button type="button" className="hb-ye5-ib" aria-label="Start a call"><Icon d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" /></button>
              <button type="button" className="hb-ye5-ib" aria-label="Search in conversation"><Icon d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 2-4-4" /></button>
            </header>
            <div className="hb-ye5-msgs" ref={scrollRef} role="log" aria-live="polite" aria-label="Messages">
              {groups.map((g) => (
                <div key={g.day}>
                  <div className="hb-ye5-day"><span>{g.day}</span></div>
                  {g.runs.map((run) => {
                    const mine = run.author === me;
                    return (
                      <div className="hb-ye5-grp" data-mine={mine} key={run.items[0].id}>
                        <Avatar name={run.author} />
                        <div className="hb-ye5-col">
                          <div className="hb-ye5-who"><b>{mine ? "You" : run.author}</b><span>{run.items[0].time}</span></div>
                          {run.items.map((m) => (
                            <React.Fragment key={m.id}>
                              {m.text && <div className="hb-ye5-bubble">{m.text}</div>}
                              {m.attachments?.map((a) => (
                                <div className="hb-ye5-file" key={a}>
                                  <i>{a.split(".").pop()}</i>
                                  <span>{a}<small>Shared file</small></span>
                                </div>
                              ))}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              {active.typing && (
                <div className="hb-ye5-typing" aria-live="polite">
                  <Avatar name={active.typing} />
                  <span className="hb-ye5-dots" aria-hidden="true"><i /><i /><i /></span>
                  <span>{active.typing.split(" ")[0]} is typing</span>
                </div>
              )}
            </div>
            <form className="hb-ye5-composer" onSubmit={(e) => { e.preventDefault(); send(); }}>
              {attachments.length > 0 && (
                <div className="hb-ye5-chips" aria-label="Attachments">
                  {attachments.map((a) => (
                    <span className="hb-ye5-chip" key={a}>
                      <i aria-hidden="true" />
                      {a}
                      <button type="button" className="hb-ye5-chipx" aria-label={`Remove ${a}`} onClick={() => setAttachments((list) => list.filter((x) => x !== a))}><Icon d="M6 6l12 12M18 6 6 18" /></button>
                    </span>
                  ))}
                </div>
              )}
              <textarea
                ref={inputRef}
                className="hb-ye5-input"
                rows={1}
                value={draft}
                placeholder={`Message ${active.kind === "channel" ? "#" : ""}${active.name}`}
                aria-label="Message"
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    send();
                  }
                }}
              />
              <div className="hb-ye5-tools">
                <button type="button" className="hb-ye5-ib" aria-label="Attach file" onClick={attach}><Icon d="M20 11.5l-8 8a5 5 0 0 1-7-7l8.5-8.5a3.5 3.5 0 0 1 5 5L10 17.5a2 2 0 0 1-3-3l7.5-7.5" /></button>
                <button type="button" className="hb-ye5-ib" aria-label="Mention someone" onClick={() => { setDraft((d) => `${d}@`); inputRef.current?.focus(); }}><Icon d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm0 0v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-4 7.5" /></button>
                <span className="hb-ye5-hint">Enter to send, Shift + Enter for a new line</span>
                <button type="submit" className="hb-ye5-send" disabled={!draft.trim() && !attachments.length}>Send<Icon d="M5 12h14m-6-6 6 6-6 6" /></button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}

export default AppChatInbox;
