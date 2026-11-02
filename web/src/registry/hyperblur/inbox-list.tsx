"use client";

import * as React from "react";

export type InboxAction = "open" | "star" | "archive" | "snooze" | "delete";

export interface InboxMessage {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
  starred?: boolean;
}

export const defaultMessages: InboxMessage[] = [
  { id: "m1", sender: "Priya Raman", subject: "Roadmap review moved to Thursday", preview: "Hi all, the Q4 roadmap review now starts at 2pm so Daniel can join from Lisbon.", time: "9:41 AM", unread: true, starred: true },
  { id: "m2", sender: "Stripe", subject: "Your payout of $3,240.00 is on the way", preview: "Funds should arrive in your bank account within two business days.", time: "8:15 AM", unread: true },
  { id: "m3", sender: "Daniel Okafor", subject: "Re: Pricing page copy", preview: "Looks great. One small thing on the annual toggle, can we say two months free?", time: "Yesterday" },
  { id: "m4", sender: "Figma", subject: "Maya commented on Onboarding v3", preview: "“Love the empty state. Could the illustration be a little warmer?”", time: "Yesterday", unread: true },
  { id: "m5", sender: "Hannah Weiss", subject: "Lunch on Friday?", preview: "There is a new ramen place near the office that I keep hearing good things about.", time: "Oct 29" },
  { id: "m6", sender: "GitHub", subject: "[northwind/web] Pull request merged", preview: "Lucas Moreau merged #482: Speed up the dashboard first paint.", time: "Oct 28", starred: true },
];

export interface InboxListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  messages?: InboxMessage[];
  title?: string;
  accent?: string;
  onAction?: (action: InboxAction, ids: string[]) => void;
}

const css = `
.hb-inb {
  --hb-inb-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  color: #ededed;
}
.hb-inb *, .hb-inb *::before, .hb-inb *::after { box-sizing: border-box; font-family: inherit; }
.hb-inb-head {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 10px;
  margin-bottom: 2px;
  border-bottom: 1px solid #1f1f1f;
}
.hb-inb-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; }
.hb-inb-title span { margin-left: 8px; font-size: 12px; font-weight: 400; color: #8f8f8f; }
.hb-inb-bulk { display: flex; gap: 4px; animation: hb-inb-bulk .28s cubic-bezier(.2, .8, .2, 1) both; }
.hb-inb-bbtn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  padding: 0 9px;
  border: 1px solid #2a2a2a;
  border-radius: 7px;
  background: #171717;
  color: #ededed;
  font-size: 12px;
  cursor: pointer;
  transition: background-color .15s ease, border-color .15s ease;
}
.hb-inb-bbtn svg { width: 12px; height: 12px; }
.hb-inb-bbtn:hover { background: #202020; border-color: #3a3a3a; }
.hb-inb-check { position: relative; flex: none; width: 16px; height: 16px; display: block; }
.hb-inb-input { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
.hb-inb-box {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border: 1.5px solid #3a3a3a;
  border-radius: 5px;
  background: #0a0a0a;
  color: #fff;
  pointer-events: none;
  transition: background-color .15s ease, border-color .15s ease;
}
.hb-inb-box svg { grid-area: 1 / 1; width: 10px; height: 10px; opacity: 0; transform: scale(.5); transition: opacity .15s ease, transform .2s cubic-bezier(.3, 1.5, .5, 1); }
.hb-inb-input:checked + .hb-inb-box,
.hb-inb-input:indeterminate + .hb-inb-box { background: var(--hb-inb-accent); border-color: var(--hb-inb-accent); }
.hb-inb-input:checked + .hb-inb-box .hb-inb-tick,
.hb-inb-input:indeterminate + .hb-inb-box .hb-inb-dash { opacity: 1; transform: none; }
.hb-inb-input:focus-visible + .hb-inb-box,
.hb-inb-bbtn:focus-visible, .hb-inb-star:focus-visible, .hb-inb-q:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--hb-inb-accent) 80%, transparent);
  outline-offset: 1px;
}
.hb-inb-list { list-style: none; margin: 0; padding: 0; }
.hb-inb-row {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows .26s cubic-bezier(.4, 0, .2, 1), opacity .22s ease;
  animation: hb-inb-in .36s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(var(--hb-inb-i, 0) * 40ms);
}
.hb-inb-row[data-leaving="true"] { grid-template-rows: 0fr; opacity: 0; }
.hb-inb-row:focus-visible { outline: 0; }
.hb-inb-wrap { min-height: 0; overflow: hidden; border-radius: 10px; }
.hb-inb-inner {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 10px;
  transition: background-color .15s ease;
}
.hb-inb-row:hover .hb-inb-inner { background: rgba(255, 255, 255, .045); }
.hb-inb-row[data-selected="true"] .hb-inb-inner { background: color-mix(in srgb, var(--hb-inb-accent) 13%, transparent); }
.hb-inb-row:focus-visible .hb-inb-inner { box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--hb-inb-accent) 80%, transparent); }
.hb-inb-lead { flex: none; display: flex; align-items: center; gap: 6px; height: 19px; }
.hb-inb-star {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background: none;
  color: #4a4a4a;
  cursor: pointer;
  transition: color .15s ease, transform .2s cubic-bezier(.3, 1.5, .5, 1);
}
.hb-inb-star svg { width: 15px; height: 15px; }
.hb-inb-star:hover { color: #8f8f8f; }
.hb-inb-star[aria-pressed="true"] { color: #f5b84a; }
.hb-inb-star[aria-pressed="true"] svg path { fill: currentColor; }
.hb-inb-star:active { transform: scale(.82); }
.hb-inb-main { flex: 1; min-width: 0; display: flex; flex-direction: column; cursor: pointer; }
.hb-inb-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-width: 0; height: 19px; }
.hb-inb-from { display: flex; align-items: center; gap: 6px; min-width: 0; color: #a1a1a1; }
.hb-inb-dot { flex: none; width: 7px; height: 7px; border-radius: 50%; background: var(--hb-inb-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-inb-accent) 20%, transparent); }
.hb-inb-sender { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-inb-end { position: relative; flex: none; display: grid; justify-items: end; align-items: center; }
.hb-inb-time, .hb-inb-quick { grid-area: 1 / 1; transition: opacity .15s ease, transform .18s ease; }
.hb-inb-time { font-size: 11px; color: #6b6b6b; white-space: nowrap; font-variant-numeric: tabular-nums; }
.hb-inb-quick { display: flex; gap: 2px; opacity: 0; transform: translateX(6px); pointer-events: none; }
.hb-inb-row:hover .hb-inb-time, .hb-inb-row:focus-within .hb-inb-time { opacity: 0; }
.hb-inb-row:hover .hb-inb-quick, .hb-inb-row:focus-within .hb-inb-quick { opacity: 1; transform: none; pointer-events: auto; }
.hb-inb-q {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: none;
  color: #a1a1a1;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-inb-q svg { width: 14px; height: 14px; }
.hb-inb-q:hover { background: rgba(255, 255, 255, .1); color: #ededed; }
.hb-inb-q[data-danger="true"]:hover { background: rgba(255, 90, 90, .15); color: #ff6b6b; }
.hb-inb-line { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12.5px; color: #6f6f6f; }
.hb-inb-subject { color: #a1a1a1; }
.hb-inb-row[data-unread="true"] .hb-inb-from { color: #f5f5f5; font-weight: 600; }
.hb-inb-row[data-unread="true"] .hb-inb-subject { color: #ededed; font-weight: 600; }
.hb-inb-row[data-unread="true"] .hb-inb-time { color: #a1a1a1; }
.hb-inb-empty { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 26px 12px; color: #8f8f8f; text-align: center; animation: hb-inb-in .4s ease both; }
.hb-inb-empty svg { width: 30px; height: 30px; margin-bottom: 4px; color: #3ecf8e; }
.hb-inb-empty strong { color: #ededed; font-weight: 500; }
.hb-inb-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 280px) {
  .hb-inb-lead .hb-inb-check { display: none; }
}
@keyframes hb-inb-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-inb-bulk {
  from { opacity: 0; transform: translateX(8px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-inb-row, .hb-inb-bulk, .hb-inb-empty { animation: none !important; }
  .hb-inb-row, .hb-inb-inner, .hb-inb-star, .hb-inb-time, .hb-inb-quick, .hb-inb-box, .hb-inb-box svg, .hb-inb-q, .hb-inb-bbtn { transition: none !important; }
}
`;

const starPath = "M8 1.8l1.9 4 4.3.5-3.2 2.9.9 4.3L8 11.4 4.1 13.5l.9-4.3L1.8 6.3l4.3-.5z";

function Tick() {
  return (
    <svg className="hb-inb-tick" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.4 6.4l2.3 2.3 4.9-5" />
    </svg>
  );
}

function Dash() {
  return (
    <svg className="hb-inb-dash" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6h6" />
    </svg>
  );
}

const iconProps = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const archiveIcon = (
  <svg {...iconProps}>
    <rect x="2" y="3" width="12" height="3" rx="1" />
    <path d="M3 6v6.2A1.3 1.3 0 0 0 4.3 13.5h7.4A1.3 1.3 0 0 0 13 12.2V6M6.5 9h3" />
  </svg>
);
const snoozeIcon = (
  <svg {...iconProps}>
    <circle cx="8" cy="8.5" r="5.3" />
    <path d="M8 5.8v2.9l1.8 1.1" />
  </svg>
);
const deleteIcon = (
  <svg {...iconProps}>
    <path d="M2.5 4.5h11M6 4.5V3h4v1.5M4 4.5l.6 8.2a1 1 0 0 0 1 .8h4.8a1 1 0 0 0 1-.8l.6-8.2" />
  </svg>
);

const verbs: Record<InboxAction, string> = {
  open: "Opened",
  star: "Starred",
  archive: "Archived",
  snooze: "Snoozed",
  delete: "Deleted",
};

export function InboxList({
  messages = defaultMessages,
  title = "Inbox",
  accent = "#2f7bff",
  onAction,
  className = "",
  style,
  ...rest
}: InboxListProps) {
  const sourceKey = messages.map((m) => m.id).join("|");
  const [seenKey, setSeenKey] = React.useState(sourceKey);
  const [items, setItems] = React.useState<InboxMessage[]>(messages);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [leaving, setLeaving] = React.useState<string[]>([]);
  const [active, setActive] = React.useState(0);
  const [note, setNote] = React.useState("");
  const rows = React.useRef<(HTMLLIElement | null)[]>([]);
  const bulk = React.useRef<HTMLInputElement | null>(null);
  const refocus = React.useRef(false);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  if (seenKey !== sourceKey) {
    setSeenKey(sourceKey);
    setItems(messages);
    setSelected([]);
  }

  React.useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const count = items.length;
  const picked = selected.filter((id) => items.some((m) => m.id === id));
  const all = count > 0 && picked.length === count;
  const some = picked.length > 0 && !all;
  const unreadCount = items.filter((m) => m.unread).length;
  const current = Math.min(active, Math.max(0, count - 1));

  React.useEffect(() => {
    if (bulk.current) bulk.current.indeterminate = some;
  }, [some]);

  React.useLayoutEffect(() => {
    if (!refocus.current) return;
    refocus.current = false;
    rows.current[Math.min(active, Math.max(0, items.length - 1))]?.focus();
  }, [items, active]);

  const toggleOne = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleAll = () => {
    setSelected(all ? [] : items.map((m) => m.id));
  };

  const open = (id: string) => {
    setItems((prev) => prev.map((m) => (m.id === id && m.unread ? { ...m, unread: false } : m)));
    onAction?.("open", [id]);
  };

  const star = (id: string) => {
    const target = items.find((m) => m.id === id);
    if (!target) return;
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)));
    setNote(`${target.starred ? "Unstarred" : "Starred"} ${target.sender}`);
    onAction?.("star", [id]);
  };

  const remove = (action: "archive" | "snooze" | "delete", ids: string[], keepFocus = false) => {
    if (ids.length === 0) return;
    setLeaving((prev) => [...prev, ...ids]);
    setSelected((prev) => prev.filter((id) => !ids.includes(id)));
    setNote(`${verbs[action]} ${ids.length} ${ids.length === 1 ? "conversation" : "conversations"}`);
    onAction?.(action, ids);
    const t = setTimeout(() => {
      if (keepFocus) refocus.current = true;
      setItems((prev) => prev.filter((m) => !ids.includes(m.id)));
      setLeaving((prev) => prev.filter((id) => !ids.includes(id)));
    }, 270);
    timers.current.push(t);
  };

  const focusRow = (index: number) => {
    const next = Math.max(0, Math.min(count - 1, index));
    setActive(next);
    rows.current[next]?.focus();
  };

  const onRowKey = (event: React.KeyboardEvent<HTMLLIElement>, index: number, message: InboxMessage) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const onRow = event.target === event.currentTarget;
    const key = event.key;
    if (key === "j" || key === "ArrowDown") {
      event.preventDefault();
      focusRow(index + 1);
    } else if (key === "k" || key === "ArrowUp") {
      event.preventDefault();
      focusRow(index - 1);
    } else if (key === "Home") {
      event.preventDefault();
      focusRow(0);
    } else if (key === "End") {
      event.preventDefault();
      focusRow(count - 1);
    } else if (onRow && key === "Enter") {
      event.preventDefault();
      open(message.id);
    } else if (onRow && key === "x") {
      toggleOne(message.id);
    } else if (onRow && key === "s") {
      star(message.id);
    } else if (onRow && key === "e") {
      remove("archive", [message.id], true);
    } else if (onRow && (key === "#" || key === "Delete")) {
      remove("delete", [message.id], true);
    }
  };

  const vars = { "--hb-inb-accent": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-inb ${className}`} style={vars} {...rest}>
      <style href="hb-inbox-list" precedence="default">{css}</style>
      <div className="hb-inb-head">
        <span className="hb-inb-check">
          <input
            ref={bulk}
            type="checkbox"
            className="hb-inb-input"
            checked={all}
            aria-label={all ? "Deselect all conversations" : "Select all conversations"}
            onChange={toggleAll}
          />
          <span className="hb-inb-box" aria-hidden="true">
            <Tick />
            <Dash />
          </span>
        </span>
        {picked.length > 0 ? (
          <>
            <span className="hb-inb-title">{`${picked.length} selected`}</span>
            <span className="hb-inb-bulk">
              <button type="button" className="hb-inb-bbtn" onClick={() => remove("archive", picked)}>
                {archiveIcon}
                Archive
              </button>
              <button type="button" className="hb-inb-bbtn" onClick={() => remove("delete", picked)}>
                {deleteIcon}
                Delete
              </button>
            </span>
          </>
        ) : (
          <span className="hb-inb-title">
            {title}
            <span>{`${unreadCount} unread`}</span>
          </span>
        )}
      </div>
      <span className="hb-inb-sr" role="status" aria-live="polite">
        {note}
      </span>
      {count > 0 ? (
        <ul className="hb-inb-list" aria-label={title}>
          {items.map((message, index) => {
            const isSelected = picked.includes(message.id);
            const tab = index === current ? 0 : -1;
            return (
              <li
                key={message.id}
                ref={(el) => {
                  rows.current[index] = el;
                }}
                className="hb-inb-row"
                tabIndex={tab}
                data-unread={message.unread ? "true" : "false"}
                data-selected={isSelected}
                data-leaving={leaving.includes(message.id)}
                style={{ "--hb-inb-i": index } as React.CSSProperties}
                onFocus={(event) => {
                  if (event.target === event.currentTarget) setActive(index);
                }}
                onKeyDown={(event) => onRowKey(event, index, message)}
              >
                <div className="hb-inb-wrap">
                  <div className="hb-inb-inner">
                    <span className="hb-inb-lead">
                      <span className="hb-inb-check">
                        <input
                          type="checkbox"
                          className="hb-inb-input"
                          checked={isSelected}
                          tabIndex={tab}
                          aria-label={`Select message from ${message.sender}`}
                          onChange={() => toggleOne(message.id)}
                        />
                        <span className="hb-inb-box" aria-hidden="true">
                          <Tick />
                        </span>
                      </span>
                      <button
                        type="button"
                        className="hb-inb-star"
                        tabIndex={tab}
                        aria-pressed={!!message.starred}
                        aria-label={`Star message from ${message.sender}`}
                        onClick={() => star(message.id)}
                      >
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
                          <path d={starPath} />
                        </svg>
                      </button>
                    </span>
                    <div className="hb-inb-main" onClick={() => open(message.id)}>
                      <div className="hb-inb-top">
                        <span className="hb-inb-from">
                          {message.unread && <span className="hb-inb-dot" aria-hidden="true" />}
                          <span className="hb-inb-sender">{message.sender}</span>
                          {message.unread && <span className="hb-inb-sr">, unread</span>}
                        </span>
                        <span className="hb-inb-end" onClick={(event) => event.stopPropagation()}>
                          <span className="hb-inb-time">{message.time}</span>
                          <span className="hb-inb-quick">
                            <button type="button" className="hb-inb-q" tabIndex={tab} aria-label="Archive" onClick={() => remove("archive", [message.id], true)}>
                              {archiveIcon}
                            </button>
                            <button type="button" className="hb-inb-q" tabIndex={tab} aria-label="Snooze" onClick={() => remove("snooze", [message.id], true)}>
                              {snoozeIcon}
                            </button>
                            <button type="button" className="hb-inb-q" data-danger="true" tabIndex={tab} aria-label="Delete" onClick={() => remove("delete", [message.id], true)}>
                              {deleteIcon}
                            </button>
                          </span>
                        </span>
                      </div>
                      <div className="hb-inb-line">
                        <span className="hb-inb-subject">{message.subject}</span>
                        {` — ${message.preview}`}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="hb-inb-empty">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="16" cy="16" r="12" />
            <path d="M10.5 16.5l4 4 7-8" />
          </svg>
          <strong>Inbox zero</strong>
          <span>Nothing left to triage.</span>
        </div>
      )}
    </div>
  );
}
