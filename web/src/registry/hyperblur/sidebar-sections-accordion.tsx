"use client";

import * as React from "react";

const ICONS = {
  layers: "M10 3.5l6.5 3.3L10 10 3.5 6.8zM3.5 10.2L10 13.5l6.5-3.3M3.5 13.4L10 16.7l6.5-3.3",
  users:
    "M7.5 9a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zM2.5 16.2c.4-2.7 2.5-4.2 5-4.2s4.6 1.5 5 4.2M13 4.2a2.7 2.7 0 0 1 0 5M14.5 12.2c1.6.5 2.7 1.8 3 4",
  card: "M3.5 5.5h13a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zM2.5 8.5h15M5.5 12h3",
  bolt: "M11 3L4.5 11h4.5l-1 6 6.5-8H10z",
  book: "M4 4.2A1.2 1.2 0 0 1 5.2 3H16v12.5H5.7A1.7 1.7 0 0 0 4 17.2zM4 17.2V4.2M7.5 6.5h5.5",
  gear: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2.8v2M10 15.2v2M17.2 10h-2M4.8 10h-2M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4M15.1 15.1l-1.4-1.4M6.3 6.3L4.9 4.9",
} as const;

export type SidebarSectionsIconName = keyof typeof ICONS;

export function SidebarSectionsIcon({ name }: { name: SidebarSectionsIconName }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export interface SidebarSectionItem {
  id: string;
  label: string;
  badge?: string | number;
}

export interface SidebarSection {
  id: string;
  title: string;
  icon?: SidebarSectionsIconName;
  badge?: string | number;
  items: SidebarSectionItem[];
}

export interface SidebarSectionsAccordionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  sections?: SidebarSection[];
  open?: string[];
  defaultOpen?: string[];
  onOpenChange?: (open: string[]) => void;
  multiple?: boolean;
  persistKey?: string;
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  title?: string;
  accent?: string;
}

const defaultSections: SidebarSection[] = [
  {
    id: "projects",
    title: "Projects",
    icon: "layers",
    badge: 3,
    items: [
      { id: "overview", label: "Overview" },
      { id: "roadmap", label: "Roadmap" },
      { id: "releases", label: "Releases", badge: "New" },
    ],
  },
  {
    id: "team",
    title: "Team",
    icon: "users",
    items: [
      { id: "members", label: "Members", badge: 12 },
      { id: "roles", label: "Roles" },
    ],
  },
  {
    id: "billing",
    title: "Billing",
    icon: "card",
    items: [
      { id: "plan", label: "Plan" },
      { id: "invoices", label: "Invoices" },
      { id: "usage", label: "Usage" },
    ],
  },
  {
    id: "developers",
    title: "Developers",
    icon: "bolt",
    items: [
      { id: "keys", label: "API keys" },
      { id: "webhooks", label: "Webhooks" },
    ],
  },
];

const STORE_EVENT = "hb-yc4-store";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(STORE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(STORE_EVENT, cb);
  };
}

function readStore(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStore(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    return;
  } finally {
    window.dispatchEvent(new Event(STORE_EVENT));
  }
}

function parseStore(raw: string | null): string[] | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((x): x is string => typeof x === "string") : null;
  } catch {
    return null;
  }
}

const css = `
.hb-yc4 {
  --hb-yc4-a: #2f7bff;
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
.hb-yc4 *, .hb-yc4 *::before, .hb-yc4 *::after { box-sizing: border-box; }
.hb-yc4-title { flex: none; margin: 0; padding: 14px 16px 8px; color: #ededed; font-size: 14px; font-weight: 600; letter-spacing: -.01em; line-height: 20px; }
.hb-yc4-scroll { flex: 1; min-height: 0; padding: 4px 8px 10px; overflow-y: auto; scrollbar-width: none; }
.hb-yc4-scroll::-webkit-scrollbar { display: none; }
.hb-yc4-sec { border-radius: 10px; transition: background-color .2s ease; }
.hb-yc4-sec[data-open="true"] { background: #131313; }
.hb-yc4-sec + .hb-yc4-sec { margin-top: 2px; }
.hb-yc4-head {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  height: 34px;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #b4b4b4;
  font: inherit;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.hb-yc4-head:hover { background: #181818; color: #ededed; }
.hb-yc4-sec[data-open="true"] > .hb-yc4-head { color: #ffffff; }
.hb-yc4-head:focus-visible { outline: 2px solid var(--hb-yc4-a); outline-offset: -2px; }
.hb-yc4-ico { display: grid; flex: none; place-items: center; width: 18px; height: 18px; color: #77777f; transition: color .2s ease; }
.hb-yc4-ico svg { width: 17px; height: 17px; }
.hb-yc4-sec[data-open="true"] .hb-yc4-ico { color: var(--hb-yc4-a); }
.hb-yc4-tx { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc4-bdg { flex: none; min-width: 20px; padding: 0 6px; border-radius: 999px; background: var(--hb-yc4-a); color: #ffffff; font-size: 11px; font-weight: 700; line-height: 18px; text-align: center; }
.hb-yc4-chev { width: 14px; height: 14px; flex: none; color: #6f6f6f; transition: transform .28s cubic-bezier(.2, .9, .2, 1), color .15s ease; }
.hb-yc4-sec[data-open="true"] .hb-yc4-chev { color: #ededed; transform: rotate(180deg); }
.hb-yc4-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s cubic-bezier(.2, .9, .2, 1); }
.hb-yc4-sec[data-open="true"] > .hb-yc4-panel { grid-template-rows: 1fr; }
.hb-yc4-in { min-height: 0; overflow: hidden; }
.hb-yc4-list { position: relative; margin: 0 0 6px 17px; padding: 2px 0 0 10px; list-style: none; border-left: 1px solid #262626; }
.hb-yc4-item {
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
  color: #8f8f8f;
  font: inherit;
  text-align: left;
  cursor: pointer;
  opacity: 0;
  transform: translateX(-6px);
  transition: background-color .15s ease, color .15s ease, opacity .25s ease, transform .3s cubic-bezier(.2, .9, .2, 1);
}
.hb-yc4-sec[data-open="true"] .hb-yc4-item { opacity: 1; transform: none; }
.hb-yc4-item:hover { background: #1a1a1a; color: #ededed; }
.hb-yc4-item:focus-visible { outline: 2px solid var(--hb-yc4-a); outline-offset: -2px; }
.hb-yc4-item[aria-current="true"] { background: color-mix(in srgb, var(--hb-yc4-a) 15%, transparent); color: #ffffff; }
.hb-yc4-item[aria-current="true"]::before {
  content: "";
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: -11px;
  width: 2px;
  border-radius: 2px;
  background: var(--hb-yc4-a);
  box-shadow: 0 0 8px var(--hb-yc4-a);
}
.hb-yc4-it { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc4-tag { flex: none; padding: 0 6px; border-radius: 999px; background: #232323; color: #d4d4d4; font-size: 10.5px; font-weight: 600; line-height: 16px; }
.hb-yc4-tag[data-new="true"] { background: color-mix(in srgb, #30a46c 22%, transparent); color: #5ed49b; }
@media (prefers-reduced-motion: reduce) {
  .hb-yc4-sec, .hb-yc4-head, .hb-yc4-ico, .hb-yc4-chev, .hb-yc4-panel, .hb-yc4-item { transition: none; }
}
`;

export function SidebarSectionsAccordion({
  sections = defaultSections,
  open,
  defaultOpen = ["projects"],
  onOpenChange,
  multiple = true,
  persistKey,
  active,
  defaultActive,
  onChange,
  title,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: SidebarSectionsAccordionProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const [inner, setInner] = React.useState(defaultActive ?? "");
  const [focusKey, setFocusKey] = React.useState("");
  const stored = React.useSyncExternalStore(
    subscribe,
    () => (persistKey ? readStore(persistKey) : null),
    () => null,
  );
  const saved = persistKey ? parseStore(stored) : null;
  const openIds = open ?? saved ?? innerOpen;
  const current = active ?? inner;

  function commit(next: string[]) {
    if (open === undefined) setInnerOpen(next);
    if (persistKey) writeStore(persistKey, JSON.stringify(next));
    onOpenChange?.(next);
  }

  function setSection(id: string, next: boolean) {
    const has = openIds.includes(id);
    if (has === next) return;
    if (next) commit(multiple ? [...openIds, id] : [id]);
    else commit(openIds.filter((x) => x !== id));
  }

  function select(id: string) {
    if (active === undefined) setInner(id);
    onChange?.(id);
  }

  function ring() {
    return Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-yc4-nav]") ?? []).filter((el) => !el.closest("[inert]"));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Escape") {
      (document.activeElement as HTMLElement | null)?.blur();
      return;
    }
    const target = e.target as HTMLElement;
    if (!target.hasAttribute("data-yc4-nav")) return;
    const list = ring();
    const at = list.indexOf(target);
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(list.length - 1, at + 1);
    else if (e.key === "ArrowUp") next = Math.max(0, at - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = list.length - 1;
    if (next >= 0) {
      e.preventDefault();
      list[next]?.focus();
      return;
    }
    const head = target.dataset.yc4Head;
    const parent = target.dataset.yc4Parent;
    if (head && e.key === "ArrowRight") {
      e.preventDefault();
      setSection(head, true);
    } else if (head && e.key === "ArrowLeft") {
      e.preventDefault();
      setSection(head, false);
    } else if (parent && e.key === "ArrowLeft") {
      e.preventDefault();
      rootRef.current?.querySelector<HTMLElement>(`[data-yc4-head="${parent}"]`)?.focus();
    }
  }

  const keys = sections.flatMap((s) => [`h:${s.id}`, ...(openIds.includes(s.id) ? s.items.map((i) => i.id) : [])]);
  const wanted = keys.includes(focusKey) ? focusKey : keys.includes(current) ? current : keys[0];

  const vars = { "--hb-yc4-a": accent, ...style } as React.CSSProperties;

  return (
    <nav ref={rootRef} className={`hb-yc4 ${className}`} aria-label="Sections" style={vars} onKeyDown={handleKeyDown} {...rest}>
      <style href="hb-sidebar-sections-accordion" precedence="default">{css}</style>
      {title ? <p className="hb-yc4-title">{title}</p> : null}
      <div className="hb-yc4-scroll">
        {sections.map((section) => {
          const isOpen = openIds.includes(section.id);
          const panelId = `${uid}-${section.id}`;
          return (
            <div key={section.id} className="hb-yc4-sec" data-open={isOpen}>
              <button
                type="button"
                className="hb-yc4-head"
                data-yc4-nav=""
                data-yc4-head={section.id}
                aria-expanded={isOpen}
                aria-controls={panelId}
                tabIndex={wanted === `h:${section.id}` ? 0 : -1}
                onFocus={() => setFocusKey(`h:${section.id}`)}
                onClick={() => setSection(section.id, !isOpen)}
              >
                <span className="hb-yc4-ico">
                  <SidebarSectionsIcon name={section.icon ?? "layers"} />
                </span>
                <span className="hb-yc4-tx">{section.title}</span>
                {section.badge !== undefined && section.badge !== "" ? <span className="hb-yc4-bdg">{section.badge}</span> : null}
                <svg className="hb-yc4-chev" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 5.5L7 9l3.5-3.5" />
                </svg>
              </button>
              <div id={panelId} className="hb-yc4-panel" role="region" aria-label={section.title}>
                <div className="hb-yc4-in" inert={!isOpen}>
                  <ul className="hb-yc4-list" role="list">
                    {section.items.map((item, i) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="hb-yc4-item"
                          data-yc4-nav=""
                          data-yc4-parent={section.id}
                          aria-current={item.id === current ? true : undefined}
                          tabIndex={wanted === item.id ? 0 : -1}
                          style={{ transitionDelay: isOpen ? `${(60 + i * 45).toFixed(0)}ms` : "0ms" }}
                          onFocus={() => setFocusKey(item.id)}
                          onClick={() => select(item.id)}
                        >
                          <span className="hb-yc4-it">{item.label}</span>
                          {item.badge !== undefined && item.badge !== "" ? (
                            <span className="hb-yc4-tag" data-new={item.badge === "New"}>
                              {item.badge}
                            </span>
                          ) : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
