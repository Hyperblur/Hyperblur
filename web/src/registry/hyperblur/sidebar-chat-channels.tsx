"use client";

import * as React from "react";

export type ChatPresence = "online" | "away" | "busy" | "offline";

export interface ChatChannel {
  id: string;
  name: string;
  unread?: number;
  muted?: boolean;
  private?: boolean;
}

export interface ChatPerson {
  id: string;
  name: string;
  status?: ChatPresence;
  unread?: number;
}

export interface SidebarChatChannelsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  channels?: ChatChannel[];
  people?: ChatPerson[];
  title?: string;
  subtitle?: string;
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  openSections?: string[];
  defaultOpenSections?: string[];
  onOpenSectionsChange?: (open: string[]) => void;
  channelsTitle?: string;
  peopleTitle?: string;
  accent?: string;
}

const defaultChannels: ChatChannel[] = [
  { id: "general", name: "general" },
  { id: "design", name: "design-crit", unread: 4 },
  { id: "launch", name: "launch-room", unread: 1 },
  { id: "payroll", name: "payroll", private: true },
  { id: "random", name: "random", muted: true },
];

const defaultPeople: ChatPerson[] = [
  { id: "maya", name: "Maya Chen", status: "online" },
  { id: "daniel", name: "Daniel Okafor", status: "away", unread: 2 },
  { id: "priya", name: "Priya Raman", status: "busy" },
  { id: "leo", name: "Leo Marsh", status: "offline" },
];

const PALETTE = ["#2f7bff", "#8b5cf6", "#e5484d", "#30a46c", "#f5a623", "#0ea5b7", "#d6409f"];

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
.hb-yc2 {
  --hb-yc2-a: #2f7bff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 0;
  border-right: 1px solid #262626;
  background: #0f0f0f;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
}
.hb-yc2 *, .hb-yc2 *::before, .hb-yc2 *::after { box-sizing: border-box; }
.hb-yc2-top { display: flex; flex: none; align-items: center; gap: 9px; padding: 12px 12px 10px; border-bottom: 1px solid #1f1f1f; }
.hb-yc2-logo {
  display: grid;
  flex: none;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--hb-yc2-a), color-mix(in srgb, var(--hb-yc2-a) 45%, #8b5cf6));
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}
.hb-yc2-ttl { min-width: 0; }
.hb-yc2-name { margin: 0; overflow: hidden; font-size: 13px; font-weight: 600; line-height: 16px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc2-sub { margin: 0; overflow: hidden; color: #77777f; font-size: 11px; line-height: 14px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc2-scroll { flex: 1; min-height: 0; padding: 6px; overflow-y: auto; scrollbar-width: none; }
.hb-yc2-scroll::-webkit-scrollbar { display: none; }
.hb-yc2-sec + .hb-yc2-sec { margin-top: 6px; }
.hb-yc2-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 26px;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: .02em;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-yc2-toggle:hover { background: #161616; color: #ededed; }
.hb-yc2-toggle:focus-visible { outline: 2px solid var(--hb-yc2-a); outline-offset: -2px; }
.hb-yc2-chev { width: 12px; height: 12px; flex: none; transition: transform .22s cubic-bezier(.2, .9, .2, 1); }
.hb-yc2-toggle[aria-expanded="false"] .hb-yc2-chev { transform: rotate(-90deg); }
.hb-yc2-tt { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc2-sum { display: none; flex: none; min-width: 16px; padding: 0 5px; border-radius: 999px; background: var(--hb-yc2-a); color: #ffffff; font-size: 10px; font-weight: 700; line-height: 16px; text-align: center; animation: hb-yc2-pop .25s cubic-bezier(.3, 1.5, .5, 1) both; }
.hb-yc2-toggle[aria-expanded="false"] .hb-yc2-sum[data-on="true"] { display: block; }
.hb-yc2-body { display: grid; grid-template-rows: 1fr; transition: grid-template-rows .26s cubic-bezier(.2, .9, .2, 1); }
.hb-yc2-body[data-open="false"] { grid-template-rows: 0fr; }
.hb-yc2-inner { min-height: 0; overflow: hidden; }
.hb-yc2-list { display: flex; flex-direction: column; margin: 0; padding: 2px 0 0; list-style: none; }
.hb-yc2-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 28px;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-yc2-item:hover { background: #181818; color: #ededed; }
.hb-yc2-item:focus-visible { outline: 2px solid var(--hb-yc2-a); outline-offset: -2px; }
.hb-yc2-item[aria-current="true"] { background: var(--hb-yc2-a); color: #ffffff; }
.hb-yc2-item[data-muted="true"]:not([aria-current="true"]) { color: #6a6a6a; }
.hb-yc2-hash { width: 14px; flex: none; color: #6f6f6f; font-size: 15px; font-weight: 500; line-height: 1; text-align: center; }
.hb-yc2-item[aria-current="true"] .hb-yc2-hash { color: rgba(255, 255, 255, .8); }
.hb-yc2-lock { width: 12px; height: 12px; flex: none; margin: 0 1px; color: #6f6f6f; }
.hb-yc2-item[aria-current="true"] .hb-yc2-lock { color: rgba(255, 255, 255, .8); }
.hb-yc2-txt { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc2-item[data-unread="true"] .hb-yc2-txt { color: #ffffff; font-weight: 700; }
.hb-yc2-badge { flex: none; min-width: 18px; padding: 0 6px; border-radius: 999px; background: #e5484d; color: #ffffff; font-size: 10.5px; font-weight: 700; line-height: 18px; text-align: center; }
.hb-yc2-item[aria-current="true"] .hb-yc2-badge { background: rgba(255, 255, 255, .24); }
.hb-yc2-av {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 7px;
  background: var(--hb-yc2-c, #2f7bff);
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .02em;
}
.hb-yc2-pres {
  position: absolute;
  right: -3px;
  bottom: -3px;
  width: 9px;
  height: 9px;
  border: 2px solid #0f0f0f;
  border-radius: 999px;
  background: var(--hb-yc2-s, #4a4a4a);
  transition: border-color .15s ease;
}
.hb-yc2-pres[data-s="offline"] { background: #0f0f0f; box-shadow: inset 0 0 0 1.5px #5a5a5a; }
.hb-yc2-item:hover .hb-yc2-pres { border-color: #181818; }
.hb-yc2-item[aria-current="true"] .hb-yc2-pres { border-color: var(--hb-yc2-a); }
.hb-yc2-item[aria-current="true"] .hb-yc2-pres[data-s="offline"] { background: var(--hb-yc2-a); }
.hb-yc2-pres[data-s="online"] { animation: hb-yc2-pulse 2.6s ease-in-out infinite; }
@keyframes hb-yc2-pop {
  from { opacity: 0; transform: scale(.5); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-yc2-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(48, 164, 108, 0); }
  50% { box-shadow: 0 0 0 3px rgba(48, 164, 108, .28); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yc2-toggle, .hb-yc2-item, .hb-yc2-body, .hb-yc2-chev { transition: none; }
  .hb-yc2-pres[data-s="online"], .hb-yc2-sum { animation: none; }
}
`;

const PRESENCE: Record<ChatPresence, string> = {
  online: "#30a46c",
  away: "#f5a623",
  busy: "#e5484d",
  offline: "#4a4a4a",
};

function Chevron() {
  return (
    <svg className="hb-yc2-chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4.5L6 7.5l3-3" />
    </svg>
  );
}

export function SidebarChatChannels({
  channels = defaultChannels,
  people = defaultPeople,
  title = "Northwind",
  subtitle = "12 online",
  active,
  defaultActive,
  onChange,
  openSections,
  defaultOpenSections = ["channels", "people"],
  onOpenSectionsChange,
  channelsTitle = "Channels",
  peopleTitle = "Direct messages",
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: SidebarChatChannelsProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const [inner, setInner] = React.useState(defaultActive ?? channels[0]?.id ?? "");
  const [innerOpen, setInnerOpen] = React.useState(defaultOpenSections);
  const [focusKey, setFocusKey] = React.useState("");
  const current = active ?? inner;
  const open = openSections ?? innerOpen;

  function select(id: string) {
    if (active === undefined) setInner(id);
    onChange?.(id);
  }

  function setOpen(id: string, next: boolean) {
    const has = open.includes(id);
    if (has === next) return;
    const value = next ? [...open, id] : open.filter((x) => x !== id);
    if (openSections === undefined) setInnerOpen(value);
    onOpenSectionsChange?.(value);
  }

  function ring() {
    return Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-yc2-nav]") ?? []).filter((el) => !el.closest("[inert]"));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Escape") {
      (document.activeElement as HTMLElement | null)?.blur();
      return;
    }
    const target = e.target as HTMLElement;
    if (!target.hasAttribute("data-yc2-nav")) return;
    const items = ring();
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
    const section = target.dataset.yc2Section;
    if (section && e.key === "ArrowRight") {
      e.preventDefault();
      setOpen(section, true);
    } else if (section && e.key === "ArrowLeft") {
      e.preventDefault();
      setOpen(section, false);
    }
  }

  const keys = [
    "s:channels",
    ...(open.includes("channels") ? channels.map((c) => c.id) : []),
    "s:people",
    ...(open.includes("people") ? people.map((p) => p.id) : []),
  ];
  const wanted = keys.includes(focusKey) ? focusKey : keys.includes(current) ? current : keys[0];

  const channelUnread = channels.reduce((n, c) => n + (c.muted ? 0 : (c.unread ?? 0)), 0);
  const peopleUnread = people.reduce((n, p) => n + (p.unread ?? 0), 0);

  const vars = { "--hb-yc2-a": accent, ...style } as React.CSSProperties;

  function toggle(id: string, label: string, unread: number) {
    const isOpen = open.includes(id);
    return (
      <button
        type="button"
        className="hb-yc2-toggle"
        data-yc2-nav=""
        data-yc2-section={id}
        aria-expanded={isOpen}
        aria-controls={`${uid}-${id}`}
        tabIndex={wanted === `s:${id}` ? 0 : -1}
        onFocus={() => setFocusKey(`s:${id}`)}
        onClick={() => setOpen(id, !isOpen)}
      >
        <Chevron />
        <span className="hb-yc2-tt">{label}</span>
        <span className="hb-yc2-sum" data-on={unread > 0} aria-hidden="true">
          {unread}
        </span>
      </button>
    );
  }

  return (
    <nav ref={rootRef} className={`hb-yc2 ${className}`} aria-label="Conversations" style={vars} onKeyDown={handleKeyDown} {...rest}>
      <style href="hb-sidebar-chat-channels" precedence="default">{css}</style>
      <div className="hb-yc2-top">
        <span className="hb-yc2-logo" aria-hidden="true">
          {title.trim().charAt(0).toUpperCase()}
        </span>
        <div className="hb-yc2-ttl">
          <p className="hb-yc2-name">{title}</p>
          {subtitle ? <p className="hb-yc2-sub">{subtitle}</p> : null}
        </div>
      </div>
      <div className="hb-yc2-scroll">
        <div className="hb-yc2-sec">
          {toggle("channels", channelsTitle, channelUnread)}
          <div id={`${uid}-channels`} className="hb-yc2-body" data-open={open.includes("channels")}>
            <div className="hb-yc2-inner" inert={!open.includes("channels")}>
              <ul className="hb-yc2-list" role="list">
                {channels.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className="hb-yc2-item"
                      data-yc2-nav=""
                      data-unread={!!c.unread && !c.muted}
                      data-muted={!!c.muted}
                      aria-current={c.id === current ? true : undefined}
                      tabIndex={wanted === c.id ? 0 : -1}
                      onFocus={() => setFocusKey(c.id)}
                      onClick={() => select(c.id)}
                    >
                      {c.private ? (
                        <svg className="hb-yc2-lock" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2.5" y="5.3" width="7" height="5" rx="1.2" />
                          <path d="M4 5.3V3.8a2 2 0 0 1 4 0v1.5" />
                        </svg>
                      ) : (
                        <span className="hb-yc2-hash" aria-hidden="true">
                          #
                        </span>
                      )}
                      <span className="hb-yc2-txt">{c.name}</span>
                      {c.unread && !c.muted ? (
                        <span className="hb-yc2-badge" aria-label={`${c.unread} unread`}>
                          {c.unread}
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="hb-yc2-sec">
          {toggle("people", peopleTitle, peopleUnread)}
          <div id={`${uid}-people`} className="hb-yc2-body" data-open={open.includes("people")}>
            <div className="hb-yc2-inner" inert={!open.includes("people")}>
              <ul className="hb-yc2-list" role="list">
                {people.map((p) => {
                  const status = p.status ?? "offline";
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        className="hb-yc2-item"
                        data-yc2-nav=""
                        data-unread={!!p.unread}
                        aria-current={p.id === current ? true : undefined}
                        tabIndex={wanted === p.id ? 0 : -1}
                        onFocus={() => setFocusKey(p.id)}
                        onClick={() => select(p.id)}
                      >
                        <span className="hb-yc2-av" style={{ "--hb-yc2-c": PALETTE[hash(p.name) % PALETTE.length] } as React.CSSProperties} aria-hidden="true">
                          {initials(p.name)}
                          <span className="hb-yc2-pres" data-s={status} style={{ "--hb-yc2-s": PRESENCE[status] } as React.CSSProperties} />
                        </span>
                        <span className="hb-yc2-txt">
                          {p.name}
                          <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>, {status}</span>
                        </span>
                        {p.unread ? (
                          <span className="hb-yc2-badge" aria-label={`${p.unread} unread`}>
                            {p.unread}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
