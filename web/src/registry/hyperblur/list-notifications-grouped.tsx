"use client";

import * as React from "react";

export type NotificationKind = "comment" | "mention" | "approve" | "alert" | "invite";

export interface NotificationItem {
  id: string;
  actor: string;
  title: string;
  body?: string;
  time: string;
  kind?: NotificationKind;
  unread?: boolean;
}

export interface NotificationGroup {
  id: string;
  label: string;
  items: NotificationItem[];
}

export interface ListNotificationsGroupedProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children" | "defaultValue" | "title" | "onSelect"> {
  groups?: NotificationGroup[];
  title?: string;
  onSelect?: (item: NotificationItem) => void;
  onMarkRead?: (id: string, read: boolean) => void;
  onMarkAllRead?: () => void;
  onDismiss?: (id: string) => void;
  emptyTitle?: string;
  emptyText?: string;
  compact?: boolean;
  accent?: string;
}

const defaultGroups: NotificationGroup[] = [
  {
    id: "today",
    label: "Today",
    items: [
      { id: "n1", actor: "Priya Raman", title: "commented on Q4 roadmap", body: "Can we move the billing work up a sprint?", time: "9m", kind: "comment", unread: true },
      { id: "n2", actor: "Daniel Okafor", title: "mentioned you in Launch plan", body: "@maya the final copy is ready for review.", time: "1h", kind: "mention", unread: true },
      { id: "n3", actor: "Stripe", title: "Payout of $3,240.00 is on the way", time: "3h", kind: "approve" },
    ],
  },
  {
    id: "yesterday",
    label: "Yesterday",
    items: [
      { id: "n4", actor: "Leo Marsh", title: "invited you to Design systems", time: "Mon", kind: "invite", unread: true },
      { id: "n5", actor: "Status page", title: "Elevated API latency was resolved", time: "Mon", kind: "alert" },
    ],
  },
];

const KIND_ICON: Record<NotificationKind, string> = {
  comment: "M4 5.5h12a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1H9.5L6 16.5v-3.8H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1z",
  mention: "M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM13 7v4.2c0 .9.7 1.6 1.6 1.6 1.3 0 2-1.2 2-2.8a6.6 6.6 0 1 0-2.6 5.2",
  approve: "M4.5 10.5l3.5 3.5 7.5-8",
  alert: "M10 3.5l7 12.5H3zM10 8.5v3.2M10 13.8v.01",
  invite: "M8 9a2.7 2.7 0 1 0 0-5.4A2.7 2.7 0 0 0 8 9zM2.8 16c.5-2.5 2.5-3.8 5.2-3.8M14.5 11v5M12 13.5h5",
};

const KIND_COLOR: Record<NotificationKind, string> = {
  comment: "#2f7bff",
  mention: "#8b5cf6",
  approve: "#30a46c",
  alert: "#f5a623",
  invite: "#d6409f",
};

const PALETTE = ["#3b4a6b", "#5b3f7a", "#6b3a3f", "#2f5d4a", "#6a5a2a", "#2a5a66", "#6a3a58"];

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "")).toUpperCase();
}

const css = `
.hb-yc7 {
  --hb-yc7-a: #2f7bff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  border: 1px solid #262626;
  border-radius: 14px;
  background: #111111;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
}
.hb-yc7 *, .hb-yc7 *::before, .hb-yc7 *::after { box-sizing: border-box; }
.hb-yc7-top { display: flex; flex: none; align-items: center; gap: 8px; padding: 9px 8px 9px 14px; border-bottom: 1px solid #1f1f1f; }
.hb-yc7-ttl { margin: 0; font-size: 14px; font-weight: 600; letter-spacing: -.01em; line-height: 20px; }
.hb-yc7-num { min-width: 20px; padding: 0 6px; border-radius: 999px; background: var(--hb-yc7-a); color: #ffffff; font-size: 11px; font-variant-numeric: tabular-nums; font-weight: 700; line-height: 18px; text-align: center; transition: opacity .2s ease, transform .25s cubic-bezier(.3, 1.4, .5, 1); }
.hb-yc7-num[data-zero="true"] { opacity: 0; transform: scale(.5); }
.hb-yc7-all {
  height: 26px;
  margin: 0 0 0 auto;
  padding: 0 9px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease, opacity .15s ease;
}
.hb-yc7-all:hover:not(:disabled) { background: #1c1c1c; color: #ffffff; }
.hb-yc7-all:disabled { opacity: .4; cursor: default; }
.hb-yc7-all:focus-visible { outline: 2px solid var(--hb-yc7-a); outline-offset: 1px; }
.hb-yc7-group { padding: 6px 6px 2px; }
.hb-yc7-label { margin: 0; padding: 4px 8px 3px; color: #6f6f6f; font-size: 10.5px; font-weight: 600; letter-spacing: .08em; line-height: 14px; text-transform: uppercase; }
.hb-yc7-list { margin: 0; padding: 0; list-style: none; }
.hb-yc7-wrap { display: grid; grid-template-rows: 1fr; transition: grid-template-rows .26s cubic-bezier(.4, 0, .2, 1), opacity .2s ease; animation: hb-yc7-in .4s cubic-bezier(.2, .9, .2, 1) both; animation-delay: calc(var(--hb-yc7-i, 0) * 55ms); }
.hb-yc7-wrap[data-leaving="true"] { grid-template-rows: 0fr; opacity: 0; }
.hb-yc7-cut { min-height: 0; overflow: hidden; }
.hb-yc7-row { position: relative; }
.hb-yc7-main {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  margin: 0;
  padding: 7px 8px 7px 16px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease;
}
.hb-yc7-row:hover .hb-yc7-main, .hb-yc7-row:focus-within .hb-yc7-main { background: #171717; }
.hb-yc7-main:focus-visible { outline: 2px solid var(--hb-yc7-a); outline-offset: -2px; }
.hb-yc7-dot {
  position: absolute;
  top: 50%;
  left: 7px;
  width: 6px;
  height: 6px;
  margin-top: -3px;
  border-radius: 999px;
  background: var(--hb-yc7-a);
  box-shadow: 0 0 8px var(--hb-yc7-a);
  transform: scale(0);
  transition: transform .25s cubic-bezier(.3, 1.5, .5, 1);
  pointer-events: none;
}
.hb-yc7-row[data-unread="true"] .hb-yc7-dot { transform: scale(1); }
.hb-yc7-av {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 28px;
  height: 28px;
  margin-top: 1px;
  border-radius: 999px;
  background: var(--hb-yc7-c, #3b4a6b);
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .02em;
}
.hb-yc7-kind {
  position: absolute;
  right: -4px;
  bottom: -3px;
  display: grid;
  place-items: center;
  width: 14px;
  height: 14px;
  border: 2px solid #111111;
  border-radius: 999px;
  background: var(--hb-yc7-k, #2f7bff);
  color: #ffffff;
  transition: border-color .15s ease;
}
.hb-yc7-kind svg { width: 8px; height: 8px; }
.hb-yc7-row:hover .hb-yc7-kind, .hb-yc7-row:focus-within .hb-yc7-kind { border-color: #171717; }
.hb-yc7-txt { flex: 1; min-width: 0; }
.hb-yc7-line { display: block; margin: 0; overflow: hidden; color: #a1a1a1; font-size: 12.5px; line-height: 17px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc7-line b { color: #d4d4d4; font-weight: 600; }
.hb-yc7-row[data-unread="true"] .hb-yc7-line { color: #ededed; }
.hb-yc7-row[data-unread="true"] .hb-yc7-line b { color: #ffffff; font-weight: 700; }
.hb-yc7-body { display: block; margin: 0; overflow: hidden; color: #77777f; font-size: 11.5px; line-height: 16px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc7-time { flex: none; margin-top: 1px; color: #6f6f6f; font-size: 11px; line-height: 16px; transition: opacity .12s ease; }
.hb-yc7-acts {
  position: absolute;
  top: 5px;
  right: 6px;
  display: flex;
  gap: 2px;
  padding: 2px;
  border: 1px solid #2a2a2a;
  border-radius: 9px;
  background: #1a1a1a;
  box-shadow: 0 6px 16px rgba(0, 0, 0, .45);
  opacity: 0;
  transform: translateX(6px);
  pointer-events: none;
  transition: opacity .15s ease, transform .2s cubic-bezier(.2, .9, .2, 1);
}
.hb-yc7-row:hover .hb-yc7-acts, .hb-yc7-row:focus-within .hb-yc7-acts { opacity: 1; transform: none; pointer-events: auto; }
.hb-yc7-row:hover .hb-yc7-time, .hb-yc7-row:focus-within .hb-yc7-time { opacity: 0; }
.hb-yc7-act {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #a1a1a1;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-yc7-act svg { width: 14px; height: 14px; }
.hb-yc7-act:hover { background: #2a2a2a; color: #ffffff; }
.hb-yc7-act:focus-visible { outline: 2px solid var(--hb-yc7-a); outline-offset: 0; }
.hb-yc7-empty { display: grid; justify-items: center; gap: 2px; padding: 30px 16px 32px; text-align: center; animation: hb-yc7-in .4s ease both; }
.hb-yc7-ok { display: grid; place-items: center; width: 36px; height: 36px; margin-bottom: 6px; border-radius: 999px; background: color-mix(in srgb, #30a46c 18%, transparent); color: #30a46c; }
.hb-yc7-ok svg { width: 18px; height: 18px; }
.hb-yc7-empty b { font-size: 13px; font-weight: 600; }
.hb-yc7-empty span { color: #77777f; font-size: 12px; }
@media (hover: none) {
  .hb-yc7-acts { opacity: 1; transform: none; pointer-events: auto; }
  .hb-yc7-time { opacity: 0; }
}
.hb-yc7[data-compact="true"] .hb-yc7-top { padding-top: 6px; padding-bottom: 6px; }
.hb-yc7[data-compact="true"] .hb-yc7-group { padding-top: 3px; padding-bottom: 0; }
.hb-yc7[data-compact="true"] .hb-yc7-label { padding-top: 2px; padding-bottom: 2px; }
.hb-yc7[data-compact="true"] .hb-yc7-main { padding-top: 4px; padding-bottom: 4px; }
.hb-yc7[data-compact="true"] .hb-yc7-av { width: 24px; height: 24px; font-size: 9.5px; }
@keyframes hb-yc7-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yc7-wrap, .hb-yc7-empty { animation: none; }
  .hb-yc7-wrap, .hb-yc7-dot, .hb-yc7-acts, .hb-yc7-main, .hb-yc7-num, .hb-yc7-time { transition: none; }
}
`;

export function ListNotificationsGrouped({
  groups = defaultGroups,
  title = "Notifications",
  onSelect,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  emptyTitle = "You're all caught up",
  emptyText = "New activity will show up here.",
  compact = false,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: ListNotificationsGroupedProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const timers = React.useRef<number[]>([]);
  const [overrides, setOverrides] = React.useState<Record<string, boolean>>({});
  const [gone, setGone] = React.useState<string[]>([]);
  const [leaving, setLeaving] = React.useState<string[]>([]);
  const [focusId, setFocusId] = React.useState("");

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  const shown = groups
    .map((g) => ({ ...g, items: g.items.filter((i) => !gone.includes(i.id)) }))
    .filter((g) => g.items.length > 0);
  const flat = shown.flatMap((g) => g.items);
  const isUnread = (i: NotificationItem) => overrides[i.id] ?? !!i.unread;
  const unreadCount = flat.filter((i) => isUnread(i) && !leaving.includes(i.id)).length;
  const live = flat.filter((i) => !leaving.includes(i.id));
  const tabStop = live.some((i) => i.id === focusId) ? focusId : live[0]?.id;

  function setRead(id: string, read: boolean) {
    setOverrides((o) => ({ ...o, [id]: !read }));
    onMarkRead?.(id, read);
  }

  function markAll() {
    const next: Record<string, boolean> = {};
    flat.forEach((i) => {
      next[i.id] = false;
    });
    setOverrides((o) => ({ ...o, ...next }));
    onMarkAllRead?.();
  }

  function dismiss(id: string) {
    const items = Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-yc7-main]") ?? []);
    const at = items.findIndex((el) => el.dataset.yc7Main === id);
    const neighbor = items[at + 1] ?? items[at - 1];
    neighbor?.focus();
    onDismiss?.(id);
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (instant) {
      setGone((g) => [...g, id]);
      return;
    }
    setLeaving((l) => [...l, id]);
    timers.current.push(
      window.setTimeout(() => {
        setGone((g) => [...g, id]);
        setLeaving((l) => l.filter((x) => x !== id));
      }, 280),
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Escape") {
      (document.activeElement as HTMLElement | null)?.blur();
      return;
    }
    const target = e.target as HTMLElement;
    const id = target.dataset.yc7Main;
    if (!id) return;
    const items = Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-yc7-main]") ?? []).filter((el) => el.closest('[data-leaving="true"]') === null);
    const at = items.indexOf(target);
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(items.length - 1, at + 1);
    else if (e.key === "ArrowUp") next = Math.max(0, at - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next >= 0) {
      e.preventDefault();
      items[next]?.focus();
      return;
    }
    if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      dismiss(id);
    }
  }

  const vars = { "--hb-yc7-a": accent, ...style } as React.CSSProperties;
  const order = new Map(flat.map((it, n) => [it.id, n]));

  return (
    <div ref={rootRef} className={`hb-yc7 ${className}`} data-compact={compact} style={vars} onKeyDown={handleKeyDown} {...rest}>
      <style href="hb-list-notifications-grouped" precedence="default">{css}</style>
      <div className="hb-yc7-top">
        <h3 className="hb-yc7-ttl">{title}</h3>
        <span className="hb-yc7-num" data-zero={unreadCount === 0} aria-label={`${unreadCount} unread`}>
          {unreadCount}
        </span>
        <button type="button" className="hb-yc7-all" disabled={unreadCount === 0} onClick={markAll}>
          Mark all as read
        </button>
      </div>
      {shown.length === 0 ? (
        <div className="hb-yc7-empty">
          <span className="hb-yc7-ok">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4.5 10.5l3.5 3.5 7.5-8" />
            </svg>
          </span>
          <b>{emptyTitle}</b>
          <span>{emptyText}</span>
        </div>
      ) : (
        shown.map((g) => (
          <div key={g.id} className="hb-yc7-group" role="group" aria-label={g.label}>
            <p className="hb-yc7-label">{g.label}</p>
            <ul className="hb-yc7-list" role="list">
              {g.items.map((item) => {
                const unread = isUnread(item);
                const kind = item.kind ?? "comment";
                const i = order.get(item.id) ?? 0;
                return (
                  <li key={item.id} className="hb-yc7-wrap" data-leaving={leaving.includes(item.id)} style={{ "--hb-yc7-i": i } as React.CSSProperties}>
                    <div className="hb-yc7-cut">
                      <div className="hb-yc7-row" data-unread={unread}>
                        <span className="hb-yc7-dot" aria-hidden="true" />
                        <button
                          type="button"
                          className="hb-yc7-main"
                          data-yc7-main={item.id}
                          tabIndex={item.id === tabStop ? 0 : -1}
                          onFocus={() => setFocusId(item.id)}
                          onClick={() => {
                            if (unread) setRead(item.id, true);
                            onSelect?.(item);
                          }}
                        >
                          <span className="hb-yc7-av" style={{ "--hb-yc7-c": PALETTE[hash(item.actor) % PALETTE.length] } as React.CSSProperties} aria-hidden="true">
                            {initials(item.actor)}
                            <span className="hb-yc7-kind" style={{ "--hb-yc7-k": KIND_COLOR[kind] } as React.CSSProperties}>
                              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d={KIND_ICON[kind]} />
                              </svg>
                            </span>
                          </span>
                          <span className="hb-yc7-txt">
                            <span className="hb-yc7-line">
                              <b>{item.actor}</b> {item.title}
                            </span>
                            {item.body ? <span className="hb-yc7-body">{item.body}</span> : null}
                          </span>
                          <span className="hb-yc7-time">{item.time}</span>
                        </button>
                        <div className="hb-yc7-acts">
                          <button
                            type="button"
                            className="hb-yc7-act"
                            tabIndex={item.id === tabStop ? 0 : -1}
                            aria-label={unread ? "Mark as read" : "Mark as unread"}
                            title={unread ? "Mark as read" : "Mark as unread"}
                            onClick={() => setRead(item.id, unread)}
                          >
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              {unread ? <path d="M3.5 8.5l3 3 6-7" /> : <circle cx="8" cy="8" r="3" fill="currentColor" stroke="none" />}
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="hb-yc7-act"
                            tabIndex={item.id === tabStop ? 0 : -1}
                            aria-label="Dismiss"
                            title="Dismiss"
                            onClick={() => dismiss(item.id)}
                          >
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                              <path d="M4 4l8 8M12 4L4 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
