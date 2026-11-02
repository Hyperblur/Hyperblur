"use client";

import * as React from "react";

export type PersonStatus = "online" | "away" | "offline";
export type PersonAction = "edit" | "invite" | "remove";

export interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: PersonStatus;
}

export const defaultPeople: Person[] = [
  { id: "p1", name: "Maya Johnson", email: "maya@northwind.io", role: "Owner", status: "online" },
  { id: "p2", name: "Daniel Okafor", email: "daniel@northwind.io", role: "Admin", status: "online" },
  { id: "p3", name: "Priya Raman", email: "priya@northwind.io", role: "Member", status: "away" },
  { id: "p4", name: "Lucas Moreau", email: "lucas@northwind.io", role: "Member", status: "offline" },
  { id: "p5", name: "Hannah Weiss", email: "hannah@northwind.io", role: "Viewer", status: "online" },
  { id: "p6", name: "Tomas Silva", email: "tomas@northwind.io", role: "Member", status: "away" },
  { id: "p7", name: "Aiko Tanaka", email: "aiko@northwind.io", role: "Admin", status: "offline" },
];

export interface PeopleListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  people?: Person[];
  searchable?: boolean;
  placeholder?: string;
  accent?: string;
  onAction?: (action: PersonAction, person: Person) => void;
}

const css = `
.hb-ppl {
  --hb-ppl-accent: #2f7bff;
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
.hb-ppl *, .hb-ppl *::before, .hb-ppl *::after { box-sizing: border-box; font-family: inherit; }
.hb-ppl-search {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 10px;
  margin-bottom: 6px;
  border: 1px solid #262626;
  border-radius: 9px;
  background: #111111;
  color: #8f8f8f;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.hb-ppl-search:focus-within {
  border-color: color-mix(in srgb, var(--hb-ppl-accent) 70%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ppl-accent) 18%, transparent);
}
.hb-ppl-search svg { width: 14px; height: 14px; flex: none; }
.hb-ppl-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  outline: 0;
  background: none;
  color: #ededed;
  font-size: 13px;
}
.hb-ppl-input::placeholder { color: #6b6b6b; }
.hb-ppl-input::-webkit-search-cancel-button { display: none; }
.hb-ppl-count { flex: none; font-size: 11px; color: #6b6b6b; font-variant-numeric: tabular-nums; }
.hb-ppl-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.hb-ppl-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  padding: 7px 8px;
  border-radius: 10px;
  animation: hb-ppl-in .32s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(var(--hb-ppl-i, 0) * 28ms);
  transition: background-color .15s ease;
}
.hb-ppl-row:hover, .hb-ppl-row:focus-within { background: rgba(255, 255, 255, .045); }
.hb-ppl-row[data-open="true"] { background: color-mix(in srgb, var(--hb-ppl-accent) 12%, transparent); z-index: 3; }
.hb-ppl-avatar {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--hb-ppl-bg);
  color: var(--hb-ppl-fg);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .02em;
}
.hb-ppl-dot {
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #111111;
  background: #5a5a5a;
}
.hb-ppl-dot[data-status="online"] { background: #3ecf8e; }
.hb-ppl-dot[data-status="away"] { background: #f5a524; }
.hb-ppl-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.hb-ppl-name {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  font-weight: 500;
  color: #ededed;
}
.hb-ppl-name-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-ppl-email { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; color: #8f8f8f; }
.hb-ppl-invited {
  flex: none;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  color: #7fb3ff;
  background: rgba(47, 123, 255, .14);
  animation: hb-ppl-pop .3s cubic-bezier(.3, 1.4, .5, 1) both;
}
.hb-ppl-role {
  flex: none;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid #262626;
  background: #171717;
  font-size: 11px;
  font-weight: 500;
  color: #a1a1a1;
}
.hb-ppl-role[data-tone="blue"] { color: #7fb3ff; border-color: rgba(47, 123, 255, .35); background: rgba(47, 123, 255, .1); }
.hb-ppl-role[data-tone="violet"] { color: #c4a8ff; border-color: rgba(150, 110, 255, .32); background: rgba(150, 110, 255, .1); }
.hb-ppl-actions { position: relative; flex: none; }
.hb-ppl-more {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: none;
  color: #8f8f8f;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-ppl-more:hover, .hb-ppl-more[aria-expanded="true"] { background: rgba(255, 255, 255, .08); color: #ededed; }
.hb-ppl-more svg { width: 16px; height: 16px; }
.hb-ppl-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 4px);
  z-index: 10;
  min-width: 148px;
  padding: 4px;
  border: 1px solid #2a2a2a;
  border-radius: 11px;
  background: #171717;
  box-shadow: 0 14px 34px rgba(0, 0, 0, .55);
  transform-origin: top right;
  animation: hb-ppl-menu .16s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-ppl-menu[data-above="true"] { top: auto; bottom: calc(100% + 4px); transform-origin: bottom right; }
.hb-ppl-item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 7px 9px;
  border: 0;
  border-radius: 7px;
  background: none;
  color: #ededed;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}
.hb-ppl-item svg { width: 14px; height: 14px; flex: none; color: #8f8f8f; }
.hb-ppl-item:hover, .hb-ppl-item:focus-visible { outline: 0; background: rgba(255, 255, 255, .08); }
.hb-ppl-item[data-danger="true"] { color: #ff6b6b; }
.hb-ppl-item[data-danger="true"] svg { color: #ff6b6b; }
.hb-ppl-item[data-danger="true"]:hover, .hb-ppl-item[data-danger="true"]:focus-visible { background: rgba(255, 90, 90, .12); }
.hb-ppl-input:focus-visible, .hb-ppl-more:focus-visible, .hb-ppl-clear:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--hb-ppl-accent) 75%, transparent);
  outline-offset: 1px;
}
.hb-ppl-input:focus-visible { outline: 0; }
.hb-ppl-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 22px 12px;
  text-align: center;
  color: #8f8f8f;
  animation: hb-ppl-empty .4s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-ppl-empty svg { width: 34px; height: 34px; margin-bottom: 6px; color: #3a3a3a; animation: hb-ppl-float 3s ease-in-out infinite; }
.hb-ppl-empty strong { font-weight: 500; color: #ededed; }
.hb-ppl-clear {
  margin-top: 6px;
  padding: 4px 11px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #171717;
  color: #ededed;
  font-size: 12px;
  cursor: pointer;
  transition: border-color .15s ease, background-color .15s ease;
}
.hb-ppl-clear:hover { border-color: #3a3a3a; background: #1f1f1f; }
.hb-ppl-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 300px) {
  .hb-ppl-role { display: none; }
}
@keyframes hb-ppl-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ppl-pop {
  from { opacity: 0; transform: scale(.7); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ppl-menu {
  from { opacity: 0; transform: scale(.94) translateY(-4px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ppl-empty {
  from { opacity: 0; transform: translateY(8px) scale(.97); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ppl-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ppl-row, .hb-ppl-invited, .hb-ppl-menu, .hb-ppl-empty, .hb-ppl-empty svg { animation: none !important; }
  .hb-ppl-row, .hb-ppl-more, .hb-ppl-search, .hb-ppl-clear { transition: none !important; }
}
`;

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (Math.imul(h, 31) + input.charCodeAt(i)) >>> 0;
  return h;
}

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0][0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

function roleTone(role: string) {
  const key = role.toLowerCase();
  if (key === "owner") return "blue";
  if (key === "admin") return "violet";
  return "neutral";
}

const statusLabel: Record<PersonStatus, string> = {
  online: "Online",
  away: "Away",
  offline: "Offline",
};

const menuItems: { action: PersonAction; label: string; icon: React.ReactNode }[] = [
  {
    action: "edit",
    label: "Edit",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.5 2.5l3 3L5.5 13.5l-3.5.5.5-3.5z" />
      </svg>
    ),
  },
  {
    action: "invite",
    label: "Invite",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1.8" y="3.5" width="12.4" height="9" rx="1.8" />
        <path d="M2.4 4.6L8 8.6l5.6-4" />
      </svg>
    ),
  },
  {
    action: "remove",
    label: "Remove",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2.5 4.5h11M6 4.5V3h4v1.5M4 4.5l.6 8.2a1 1 0 0 0 1 .8h4.8a1 1 0 0 0 1-.8l.6-8.2" />
      </svg>
    ),
  },
];

export function PeopleList({
  people = defaultPeople,
  searchable = true,
  placeholder = "Search people",
  accent = "#2f7bff",
  onAction,
  className = "",
  style,
  ...rest
}: PeopleListProps) {
  const sourceKey = people.map((p) => p.id).join("|");
  const [seenKey, setSeenKey] = React.useState(sourceKey);
  const [list, setList] = React.useState<Person[]>(people);
  const [query, setQuery] = React.useState("");
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [above, setAbove] = React.useState(false);
  const [invited, setInvited] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState("");
  const wrapRef = React.useRef<HTMLSpanElement | null>(null);
  const searchRef = React.useRef<HTMLInputElement | null>(null);

  if (seenKey !== sourceKey) {
    setSeenKey(sourceKey);
    setList(people);
  }

  React.useEffect(() => {
    if (!openId) return;
    const first = wrapRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
    first?.focus();
    const onDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && wrapRef.current && wrapRef.current.contains(target)) return;
      setOpenId(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openId]);

  const needle = query.trim().toLowerCase();
  const visible = needle
    ? list.filter((p) => `${p.name} ${p.email} ${p.role}`.toLowerCase().includes(needle))
    : list;

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    setAbove(window.innerHeight - rect.bottom < 150 && rect.top > 150);
    setOpenId(id);
  };

  const run = (action: PersonAction, person: Person) => {
    setOpenId(null);
    if (action === "remove") {
      setList((prev) => prev.filter((p) => p.id !== person.id));
      setMessage(`${person.name} removed`);
      searchRef.current?.focus();
    } else if (action === "invite") {
      setInvited((prev) => (prev.includes(person.id) ? prev : [...prev, person.id]));
      setMessage(`Invite sent to ${person.name}`);
    }
    onAction?.(action, person);
  };

  const onMenuKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    const current = items.indexOf(document.activeElement as HTMLElement);
    let next = -1;
    if (event.key === "ArrowDown") next = (current + 1) % items.length;
    else if (event.key === "ArrowUp") next = (current - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      wrapRef.current?.querySelector<HTMLElement>("[data-trigger]")?.focus();
      setOpenId(null);
      return;
    } else if (event.key === "Tab") {
      setOpenId(null);
      return;
    }
    if (next >= 0) {
      event.preventDefault();
      items[next]?.focus();
    }
  };

  const vars = { "--hb-ppl-accent": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-ppl ${className}`} style={vars} {...rest}>
      <style href="hb-people-list" precedence="default">{css}</style>
      {searchable && (
        <div className="hb-ppl-search">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <input
            ref={searchRef}
            className="hb-ppl-input"
            type="search"
            value={query}
            placeholder={placeholder}
            aria-label={placeholder}
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className="hb-ppl-count" aria-hidden="true">
            {visible.length}
          </span>
        </div>
      )}
      <span className="hb-ppl-sr" role="status" aria-live="polite">
        {message || `${visible.length} people`}
      </span>
      {visible.length > 0 ? (
        <ul className="hb-ppl-list" aria-label="People">
          {visible.map((person, i) => {
            const hue = hash(person.name) % 360;
            const status = person.status ?? "offline";
            const open = openId === person.id;
            const colors = {
              "--hb-ppl-bg": `hsl(${hue} 42% 30%)`,
              "--hb-ppl-fg": `hsl(${hue} 70% 88%)`,
              "--hb-ppl-i": i,
            } as React.CSSProperties;
            return (
              <li key={person.id} className="hb-ppl-row" data-open={open} style={colors}>
                <span className="hb-ppl-avatar" aria-hidden="true">
                  {initials(person.name)}
                  <span className="hb-ppl-dot" data-status={status} />
                </span>
                <span className="hb-ppl-main">
                  <span className="hb-ppl-name">
                    <span className="hb-ppl-name-text">{person.name}</span>
                    <span className="hb-ppl-sr">{`, ${statusLabel[status]}`}</span>
                    {invited.includes(person.id) && <span className="hb-ppl-invited">Invited</span>}
                  </span>
                  <span className="hb-ppl-email">{person.email}</span>
                </span>
                <span className="hb-ppl-role" data-tone={roleTone(person.role)}>
                  {person.role}
                </span>
                <span className="hb-ppl-actions" ref={open ? wrapRef : undefined}>
                  <button
                    type="button"
                    className="hb-ppl-more"
                    data-trigger=""
                    aria-label={`Actions for ${person.name}`}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    onClick={(event) => toggleMenu(event, person.id)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown" && !open) {
                        event.preventDefault();
                        toggleMenu(event, person.id);
                      }
                    }}
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <circle cx="3.5" cy="8" r="1.25" />
                      <circle cx="8" cy="8" r="1.25" />
                      <circle cx="12.5" cy="8" r="1.25" />
                    </svg>
                  </button>
                  {open && (
                    <div className="hb-ppl-menu" role="menu" aria-label={`${person.name} actions`} data-above={above} onKeyDown={onMenuKey}>
                      {menuItems.map((item) => (
                        <button
                          key={item.action}
                          type="button"
                          role="menuitem"
                          className="hb-ppl-item"
                          data-danger={item.action === "remove"}
                          tabIndex={-1}
                          onClick={() => run(item.action, person)}
                        >
                          {item.icon}
                          {item.action === "invite" && invited.includes(person.id) ? "Resend invite" : item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="hb-ppl-empty">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <circle cx="14" cy="14" r="8" />
            <path d="M20 20l7 7M10.5 14h7" />
          </svg>
          {needle ? (
            <>
              <strong>No one found</strong>
              <span>{`Nothing matches "${query.trim()}"`}</span>
              <button type="button" className="hb-ppl-clear" onClick={() => setQuery("")}>
                Clear search
              </button>
            </>
          ) : (
            <>
              <strong>No people yet</strong>
              <span>Invite teammates to see them here.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
