"use client";

import * as React from "react";

export interface SidebarDocsLink {
  id: string;
  label: string;
  href?: string;
  badge?: string;
  children?: SidebarDocsLink[];
}

export interface SidebarDocsGroup {
  id: string;
  title: string;
  items: SidebarDocsLink[];
}

export interface SidebarDocsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  groups?: SidebarDocsGroup[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  openGroups?: string[];
  defaultOpenGroups?: string[];
  onOpenGroupsChange?: (ids: string[]) => void;
  search?: boolean;
  placeholder?: string;
  rowHeight?: number;
  color?: string;
}

const defaultGroups: SidebarDocsGroup[] = [
  {
    id: "start",
    title: "Getting started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "installation", label: "Installation" },
      { id: "quickstart", label: "Quick start", badge: "New" },
    ],
  },
  {
    id: "concepts",
    title: "Core concepts",
    items: [
      { id: "routing", label: "Routing" },
      {
        id: "theming",
        label: "Theming",
        children: [
          { id: "theming-colors", label: "Colors" },
          { id: "theming-type", label: "Typography" },
        ],
      },
      { id: "data", label: "Data fetching" },
    ],
  },
  {
    id: "reference",
    title: "API reference",
    items: [
      { id: "config", label: "Configuration" },
      { id: "cli", label: "CLI", badge: "New" },
      { id: "plugins", label: "Plugins" },
    ],
  },
];

const css = `
.hb-sdoc {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: var(--hb-sdoc-w, 264px);
  max-width: 100%;
  height: 100%;
  min-height: 0;
  border-right: 1px solid #262626;
  background: #0d0d0d;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: 13px;
  line-height: 18px;
  --hb-sdoc-accent: #2f7bff;
}
.hb-sdoc *, .hb-sdoc *::before, .hb-sdoc *::after { box-sizing: border-box; }
.hb-sdoc-top { flex: none; padding: 10px 12px 6px; }
.hb-sdoc-search {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px 0 10px;
  border: 1px solid #262626;
  border-radius: 9px;
  background: #141414;
  transition: border-color .18s ease, box-shadow .18s ease;
}
.hb-sdoc-search:focus-within { border-color: var(--hb-sdoc-accent); box-shadow: 0 0 0 3px rgba(47, 123, 255, .18); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-sdoc-accent) 22%, transparent); }
.hb-sdoc-search > svg { flex: none; width: 15px; height: 15px; color: #77777f; }
.hb-sdoc-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0 8px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
}
.hb-sdoc-input::placeholder { color: #77777f; }
.hb-sdoc-clear {
  display: grid;
  flex: none;
  place-items: center;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: #222222;
  color: #a1a1a1;
  cursor: pointer;
}
.hb-sdoc-clear:hover { color: #ededed; }
.hb-sdoc-clear:focus-visible { outline: 2px solid var(--hb-sdoc-accent); outline-offset: 1px; }
.hb-sdoc-clear svg { width: 10px; height: 10px; }
.hb-sdoc-nav { position: relative; flex: 1; min-height: 0; padding: 4px 12px 10px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #2a2a2a transparent; }
.hb-sdoc-group + .hb-sdoc-group { margin-top: 6px; }
.hb-sdoc-ghead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  height: var(--hb-sdoc-row, 30px);
  margin: 0;
  padding: 0 6px 0 4px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: background-color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-sdoc-ghead:hover { background: #171717; }
.hb-sdoc-ghead:focus-visible { outline: 2px solid var(--hb-sdoc-accent); outline-offset: -2px; }
.hb-sdoc-chev { flex: none; width: 14px; height: 14px; color: #77777f; transition: transform .3s cubic-bezier(.2, .9, .2, 1); }
.hb-sdoc-ghead[aria-expanded="true"] .hb-sdoc-chev { transform: rotate(90deg); }
.hb-sdoc-collapse {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows .32s cubic-bezier(.2, .9, .2, 1), visibility 0s linear .32s;
}
.hb-sdoc-collapse[data-open="true"] { grid-template-rows: 1fr; visibility: visible; transition-delay: 0s; }
.hb-sdoc-inner { min-height: 0; overflow: hidden; }
.hb-sdoc-list { position: relative; margin: 2px 0 2px 9px; padding: 0; border-left: 1px solid #262626; list-style: none; }
.hb-sdoc-list .hb-sdoc-list { margin: 0 0 0 12px; }
.hb-sdoc-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: calc(100% - 4px);
  height: var(--hb-sdoc-row, 30px);
  margin: 0 0 0 4px;
  padding: 0 8px 0 10px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: color .15s ease, background-color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-sdoc-link::before {
  content: "";
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: -5px;
  width: 2px;
  border-radius: 2px;
  background: var(--hb-sdoc-accent);
  opacity: 0;
  transform: scaleY(.2);
  transition: opacity .2s ease, transform .3s cubic-bezier(.2, .9, .2, 1);
}
.hb-sdoc-link:hover { background: #151515; color: #ededed; }
.hb-sdoc-link[aria-current="page"] { color: #ffffff; font-weight: 500; }
.hb-sdoc-link[aria-current="page"]::before { opacity: 1; transform: scaleY(1); }
.hb-sdoc-link:focus-visible { outline: 2px solid var(--hb-sdoc-accent); outline-offset: -2px; }
.hb-sdoc-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-sdoc-new {
  flex: none;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(47, 123, 255, .16);
  background: color-mix(in srgb, var(--hb-sdoc-accent) 18%, transparent);
  color: #7fb3ff;
  font-size: 10.5px;
  font-weight: 600;
  line-height: 16px;
}
.hb-sdoc-empty { padding: 20px 8px; color: #77777f; text-align: center; }
.hb-sdoc-empty strong { color: #ededed; font-weight: 500; }
@media (prefers-reduced-motion: reduce) {
  .hb-sdoc-search, .hb-sdoc-ghead, .hb-sdoc-chev, .hb-sdoc-collapse, .hb-sdoc-link, .hb-sdoc-link::before { transition: none; }
}
`;

function filterLinks(links: SidebarDocsLink[], q: string): SidebarDocsLink[] {
  return links.flatMap((link) => {
    if (link.label.toLowerCase().includes(q)) return [link];
    const kids = link.children ? filterLinks(link.children, q) : [];
    return kids.length > 0 ? [{ ...link, children: kids }] : [];
  });
}

function findGroup(groups: SidebarDocsGroup[], id: string) {
  const has = (links: SidebarDocsLink[]): boolean => links.some((l) => l.id === id || (l.children ? has(l.children) : false));
  return groups.find((g) => has(g.items))?.id;
}

export function SidebarDocs({
  groups = defaultGroups,
  active,
  defaultActive,
  onChange,
  openGroups,
  defaultOpenGroups,
  onOpenGroupsChange,
  search = true,
  placeholder = "Search docs",
  rowHeight = 30,
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: SidebarDocsProps) {
  const uid = React.useId();
  const navRef = React.useRef<HTMLElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [innerActive, setInnerActive] = React.useState(defaultActive ?? "");
  const [innerOpen, setInnerOpen] = React.useState<string[]>(defaultOpenGroups ?? groups.map((g) => g.id));
  const [query, setQuery] = React.useState("");
  const current = active ?? innerActive;
  const [seen, setSeen] = React.useState(current);
  const openIds = openGroups ?? innerOpen;

  if (seen !== current) {
    setSeen(current);
    const gid = findGroup(groups, current);
    if (gid && openGroups === undefined && !innerOpen.includes(gid)) setInnerOpen([...innerOpen, gid]);
  }

  const q = query.trim().toLowerCase();
  const view = React.useMemo(() => {
    if (!q) return groups.map((g) => ({ group: g, items: g.items }));
    return groups
      .map((g) => ({ group: g, items: g.title.toLowerCase().includes(q) ? g.items : filterLinks(g.items, q) }))
      .filter((entry) => entry.items.length > 0);
  }, [groups, q]);

  React.useEffect(() => {
    const nav = navRef.current;
    if (!nav || !current) return;
    const el = Array.from(nav.querySelectorAll<HTMLElement>("[data-sdoc-id]")).find((n) => n.dataset.sdocId === current);
    if (!el) return;
    const top = el.offsetTop;
    let node: HTMLElement | null = el.offsetParent as HTMLElement | null;
    let offset = top;
    while (node && node !== nav) {
      offset += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    const bottom = offset + el.offsetHeight;
    if (offset < nav.scrollTop) nav.scrollTop = Math.max(0, offset - 40);
    else if (bottom > nav.scrollTop + nav.clientHeight) nav.scrollTop = bottom - nav.clientHeight + 40;
  }, [current]);

  function select(id: string) {
    if (active === undefined) setInnerActive(id);
    onChange?.(id);
  }

  function toggle(id: string) {
    const next = openIds.includes(id) ? openIds.filter((x) => x !== id) : [...openIds, id];
    if (openGroups === undefined) setInnerOpen(next);
    onOpenGroupsChange?.(next);
  }

  function navItems() {
    return Array.from(navRef.current?.querySelectorAll<HTMLElement>("[data-sdoc-nav]") ?? []).filter((n) => !n.closest("[inert]"));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    const list = navItems();
    const here = list.indexOf(e.target as HTMLElement);
    if (here < 0) return;
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(list.length - 1, here + 1);
    else if (e.key === "ArrowUp") next = here === 0 ? -2 : here - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = list.length - 1;
    if (next === -2) {
      e.preventDefault();
      inputRef.current?.focus();
      return;
    }
    if (next < 0) return;
    e.preventDefault();
    list[next]?.focus();
  }

  function renderLinks(links: SidebarDocsLink[], level: number): React.ReactNode {
    return (
      <ul className="hb-sdoc-list" role="list">
        {links.map((link) => {
          const common = {
            className: "hb-sdoc-link",
            "data-sdoc-nav": "",
            "data-sdoc-id": link.id,
            "aria-current": link.id === current ? ("page" as const) : undefined,
            onClick: () => select(link.id),
          };
          const body = (
            <>
              <span className="hb-sdoc-text">{link.label}</span>
              {link.badge ? <span className="hb-sdoc-new">{link.badge}</span> : null}
            </>
          );
          return (
            <li key={link.id}>
              {link.href ? (
                <a href={link.href} {...common}>
                  {body}
                </a>
              ) : (
                <button type="button" {...common}>
                  {body}
                </button>
              )}
              {link.children && link.children.length > 0 && level < 3 ? renderLinks(link.children, level + 1) : null}
            </li>
          );
        })}
      </ul>
    );
  }

  const vars = { "--hb-sdoc-accent": color, "--hb-sdoc-row": `${rowHeight}px`, ...style } as React.CSSProperties;

  return (
    <aside className={`hb-sdoc ${className}`} style={vars} {...rest}>
      <style href="hb-sidebar-docs" precedence="default">{css}</style>
      {search ? (
        <div className="hb-sdoc-top">
          <div className="hb-sdoc-search">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input
              ref={inputRef}
              className="hb-sdoc-input"
              type="text"
              role="searchbox"
              aria-label={placeholder}
              placeholder={placeholder}
              value={query}
              autoComplete="off"
              spellCheck={false}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setQuery("");
                else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  navItems()[0]?.focus();
                }
              }}
            />
            {query ? (
              <button
                type="button"
                className="hb-sdoc-clear"
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
      ) : null}
      <nav ref={navRef} className="hb-sdoc-nav" aria-label="Documentation" onKeyDown={handleKeyDown}>
        {view.length === 0 ? (
          <div className="hb-sdoc-empty" role="status">
            No results for <strong>{query.trim()}</strong>
          </div>
        ) : null}
        {view.map(({ group, items }) => {
          const isOpen = q ? true : openIds.includes(group.id);
          const panelId = `${uid}-${group.id}`;
          return (
            <section key={group.id} className="hb-sdoc-group">
              <button
                type="button"
                className="hb-sdoc-ghead"
                data-sdoc-nav=""
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  if (!q) toggle(group.id);
                }}
              >
                <span>{group.title}</span>
                <svg className="hb-sdoc-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 3.5L10.5 8 6 12.5" />
                </svg>
              </button>
              <div id={panelId} className="hb-sdoc-collapse" data-open={isOpen} inert={!isOpen}>
                <div className="hb-sdoc-inner">{renderLinks(items, 1)}</div>
              </div>
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
