"use client";

import * as React from "react";

const ICONS = {
  user: "M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.8 16.5c.6-2.8 3-4.3 6.2-4.3s5.6 1.5 6.2 4.3",
  shield: "M10 2.8l6 2.2v4.6c0 3.4-2.4 5.9-6 7.6-3.6-1.7-6-4.2-6-7.6V5z",
  bell: "M5.5 14V9.2a4.5 4.5 0 0 1 9 0V14l1.3 1.5H4.2zM8.3 17.2h3.4",
  building: "M4.5 17V4.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1V17M12.5 8.5h2a1 1 0 0 1 1 1V17M3.5 17h13M7.5 7h2M7.5 10h2M7.5 13h2",
  card: "M3.5 5.5h13a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zM2.5 8.5h15M5.5 12h3",
  plug: "M7.5 3v4M12.5 3v4M5.5 7h9v2.5a4.5 4.5 0 0 1-9 0zM10 14v3",
  palette:
    "M10 3a7 7 0 1 0 0 14c1 0 1.5-.7 1.2-1.5-.4-1 .3-2 1.4-2H14a3 3 0 0 0 3-3C17 5.7 13.9 3 10 3zM6.8 9.5v.01M9 6.8v.01M12 7v.01",
  key: "M12.5 11.5a3.5 3.5 0 1 0-3-1.7L3.5 15.8V17h2v-1.5h1.5V14h1.5l1.7-1.8a3.5 3.5 0 0 0 2.3-.7zM13 7.5v.01",
} as const;

export type SidebarSettingsIconName = keyof typeof ICONS;

export function SidebarSettingsIcon({ name }: { name: SidebarSettingsIconName }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export interface SettingsNavItem {
  id: string;
  label: string;
  icon?: SidebarSettingsIconName;
  keywords?: string[];
  badge?: string;
}

export interface SettingsNavGroup {
  id: string;
  title: string;
  items: SettingsNavItem[];
}

export interface SidebarSettingsNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  groups?: SettingsNavGroup[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (query: string) => void;
  onBack?: () => void;
  backHref?: string;
  backLabel?: string;
  title?: string;
  placeholder?: string;
  emptyText?: string;
  accent?: string;
}

const defaultGroups: SettingsNavGroup[] = [
  {
    id: "account",
    title: "Account",
    items: [
      { id: "profile", label: "Profile", icon: "user", keywords: ["name", "avatar", "email"] },
      { id: "security", label: "Security", icon: "shield", keywords: ["password", "2fa", "sessions"] },
      { id: "notifications", label: "Notifications", icon: "bell", keywords: ["email", "alerts", "digest"] },
      { id: "appearance", label: "Appearance", icon: "palette", keywords: ["theme", "dark", "light"] },
    ],
  },
  {
    id: "workspace",
    title: "Workspace",
    items: [
      { id: "general", label: "General", icon: "building", keywords: ["name", "logo", "domain"] },
      { id: "billing", label: "Billing", icon: "card", keywords: ["plan", "invoice", "payment"], badge: "Pro" },
      { id: "integrations", label: "Integrations", icon: "plug", keywords: ["apps", "slack", "webhooks"] },
      { id: "keys", label: "API keys", icon: "key", keywords: ["token", "developer", "secret"] },
    ],
  },
];

const css = `
.hb-yc5 {
  --hb-yc5-a: #2f7bff;
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
.hb-yc5 *, .hb-yc5 *::before, .hb-yc5 *::after { box-sizing: border-box; }
.hb-yc5-top { flex: none; padding: 10px 10px 8px; }
.hb-yc5-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  margin: 0 0 6px -4px;
  padding: 0 8px 0 4px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: color .15s ease, background-color .15s ease;
}
.hb-yc5-back svg { width: 14px; height: 14px; transition: transform .2s ease; }
.hb-yc5-back:hover { background: #181818; color: #ededed; }
.hb-yc5-back:hover svg { transform: translateX(-2px); }
.hb-yc5-back:focus-visible { outline: 2px solid var(--hb-yc5-a); outline-offset: 1px; }
.hb-yc5-ttl { margin: 0 0 8px; font-size: 16px; font-weight: 650; letter-spacing: -.015em; line-height: 22px; }
.hb-yc5-field {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  border: 1px solid #262626;
  border-radius: 9px;
  background: #0a0a0a;
  transition: border-color .18s ease, box-shadow .18s ease;
}
.hb-yc5-field:focus-within {
  border-color: var(--hb-yc5-a);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-yc5-a) 22%, transparent);
}
.hb-yc5-mag { position: absolute; left: 9px; width: 14px; height: 14px; color: #6f6f6f; pointer-events: none; }
.hb-yc5-input {
  width: 100%;
  height: 100%;
  min-width: 0;
  padding: 0 28px 0 29px;
  border: 0;
  outline: none;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 13px;
}
.hb-yc5-input::placeholder { color: #6f6f6f; }
.hb-yc5-clear {
  position: absolute;
  right: 5px;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: #1f1f1f;
  color: #a1a1a1;
  cursor: pointer;
  animation: hb-yc5-pop .18s ease both;
}
.hb-yc5-clear svg { width: 10px; height: 10px; }
.hb-yc5-clear:hover { background: #2a2a2a; color: #ffffff; }
.hb-yc5-clear:focus-visible { outline: 2px solid var(--hb-yc5-a); outline-offset: 1px; }
.hb-yc5-scroll { position: relative; flex: 1; min-height: 0; padding: 2px 8px 10px; overflow-y: auto; scrollbar-width: none; }
.hb-yc5-scroll::-webkit-scrollbar { display: none; }
.hb-yc5-head { margin: 0; padding: 10px 8px 4px; color: #6f6f6f; font-size: 10.5px; font-weight: 600; letter-spacing: .08em; line-height: 14px; text-transform: uppercase; }
.hb-yc5-list { display: flex; flex-direction: column; gap: 1px; margin: 0; padding: 0; list-style: none; }
.hb-yc5-li { animation: hb-yc5-in .24s cubic-bezier(.2, .9, .2, 1) both; }
.hb-yc5-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-yc5-item:hover { background: #181818; color: #ededed; }
.hb-yc5-item:focus-visible { outline: 2px solid var(--hb-yc5-a); outline-offset: -2px; }
.hb-yc5-item[aria-current="true"] { background: #1c1c1c; color: #ffffff; }
.hb-yc5-ico { display: grid; flex: none; place-items: center; width: 16px; height: 16px; color: #77777f; transition: color .15s ease; }
.hb-yc5-ico svg { width: 16px; height: 16px; }
.hb-yc5-item[aria-current="true"] .hb-yc5-ico { color: var(--hb-yc5-a); }
.hb-yc5-txt { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc5-mark { background: color-mix(in srgb, var(--hb-yc5-a) 30%, transparent); border-radius: 3px; box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-yc5-a) 30%, transparent); color: #ffffff; }
.hb-yc5-tag { flex: none; padding: 0 6px; border-radius: 999px; background: color-mix(in srgb, var(--hb-yc5-a) 20%, transparent); color: var(--hb-yc5-a); font-size: 10.5px; font-weight: 700; line-height: 16px; }
.hb-yc5-empty { margin: 18px 8px 0; color: #77777f; font-size: 12px; line-height: 18px; text-align: center; animation: hb-yc5-in .24s ease both; }
.hb-yc5-empty b { display: block; margin-bottom: 2px; color: #ededed; font-weight: 600; }
.hb-yc5-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-yc5-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-yc5-pop {
  from { opacity: 0; transform: scale(.6); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yc5-back, .hb-yc5-back svg, .hb-yc5-field, .hb-yc5-item, .hb-yc5-ico { transition: none; }
  .hb-yc5-li, .hb-yc5-empty, .hb-yc5-clear { animation: none; }
}
`;

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  const at = q ? text.toLowerCase().indexOf(q) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <mark className="hb-yc5-mark">{text.slice(at, at + q.length)}</mark>
      {text.slice(at + q.length)}
    </>
  );
}

export function SidebarSettingsNav({
  groups = defaultGroups,
  active,
  defaultActive,
  onChange,
  query,
  defaultQuery = "",
  onQueryChange,
  onBack,
  backHref,
  backLabel = "Back to app",
  title = "Settings",
  placeholder = "Search settings",
  emptyText = "Nothing matches your search.",
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: SidebarSettingsNavProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inner, setInner] = React.useState(defaultActive ?? groups[0]?.items[0]?.id ?? "");
  const [innerQuery, setInnerQuery] = React.useState(defaultQuery);
  const [focusId, setFocusId] = React.useState("");
  const current = active ?? inner;
  const q = query ?? innerQuery;
  const needle = q.trim().toLowerCase();

  const visible = groups
    .map((g) => ({
      ...g,
      items: needle ? g.items.filter((i) => [i.label, ...(i.keywords ?? [])].some((t) => t.toLowerCase().includes(needle))) : g.items,
    }))
    .filter((g) => g.items.length > 0);
  const flat = visible.flatMap((g) => g.items.map((i) => i.id));
  const tabStop = flat.includes(focusId) ? focusId : flat.includes(current) ? current : flat[0];

  function setQuery(next: string) {
    if (query === undefined) setInnerQuery(next);
    onQueryChange?.(next);
  }

  function select(id: string) {
    if (active === undefined) setInner(id);
    onChange?.(id);
  }

  function items() {
    return Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-yc5-item]") ?? []);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const target = e.target as HTMLElement;
    if (target === inputRef.current) {
      if (e.key === "Escape") {
        e.preventDefault();
        if (q) setQuery("");
        else inputRef.current?.blur();
      } else if (e.key === "ArrowDown" || (e.key === "Enter" && needle)) {
        e.preventDefault();
        items()[0]?.focus();
      }
      return;
    }
    if (e.key === "Escape") {
      (document.activeElement as HTMLElement | null)?.blur();
      return;
    }
    if (e.key === "/") {
      e.preventDefault();
      inputRef.current?.focus();
      return;
    }
    if (!target.hasAttribute("data-yc5-item")) return;
    const list = items();
    const at = list.indexOf(target);
    if (e.key === "ArrowUp" && at === 0) {
      e.preventDefault();
      inputRef.current?.focus();
      return;
    }
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(list.length - 1, at + 1);
    else if (e.key === "ArrowUp") next = Math.max(0, at - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = list.length - 1;
    if (next >= 0) {
      e.preventDefault();
      list[next]?.focus();
    }
  }

  const vars = { "--hb-yc5-a": accent, ...style } as React.CSSProperties;

  const backBody = (
    <>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9.5 3.5L5 8l4.5 4.5" />
      </svg>
      {backLabel}
    </>
  );

  return (
    <nav ref={rootRef} className={`hb-yc5 ${className}`} aria-label={title || "Settings"} style={vars} onKeyDown={handleKeyDown} {...rest}>
      <style href="hb-sidebar-settings-nav" precedence="default">{css}</style>
      <div className="hb-yc5-top">
        {backHref ? (
          <a className="hb-yc5-back" href={backHref} onClick={onBack}>
            {backBody}
          </a>
        ) : (
          <button type="button" className="hb-yc5-back" onClick={onBack}>
            {backBody}
          </button>
        )}
        {title ? <p className="hb-yc5-ttl">{title}</p> : null}
        <div className="hb-yc5-field">
          <svg className="hb-yc5-mag" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM17 17l-3.8-3.8" />
          </svg>
          <input
            ref={inputRef}
            className="hb-yc5-input"
            type="text"
            role="searchbox"
            autoComplete="off"
            spellCheck={false}
            value={q}
            placeholder={placeholder}
            aria-label={placeholder}
            onChange={(e) => setQuery(e.target.value)}
          />
          {q ? (
            <button
              type="button"
              className="hb-yc5-clear"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M2 2l6 6M8 2L2 8" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
      <div className="hb-yc5-scroll">
        {visible.map((g) => (
          <div key={g.id} role="group" aria-label={g.title}>
            <p className="hb-yc5-head">{g.title}</p>
            <ul className="hb-yc5-list" role="list">
              {g.items.map((item) => (
                <li key={item.id} className="hb-yc5-li">
                  <button
                    type="button"
                    className="hb-yc5-item"
                    data-yc5-item=""
                    aria-current={item.id === current ? true : undefined}
                    tabIndex={item.id === tabStop ? 0 : -1}
                    onFocus={() => setFocusId(item.id)}
                    onClick={() => select(item.id)}
                  >
                    <span className="hb-yc5-ico">
                      <SidebarSettingsIcon name={item.icon ?? "user"} />
                    </span>
                    <span className="hb-yc5-txt">
                      <Highlight text={item.label} query={q} />
                    </span>
                    {item.badge ? <span className="hb-yc5-tag">{item.badge}</span> : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {visible.length === 0 ? (
          <p className="hb-yc5-empty">
            <b>No results for &ldquo;{q.trim()}&rdquo;</b>
            {emptyText}
          </p>
        ) : null}
        <span className="hb-yc5-sr" role="status">
          {needle ? `${flat.length} ${flat.length === 1 ? "result" : "results"}` : ""}
        </span>
      </div>
    </nav>
  );
}
