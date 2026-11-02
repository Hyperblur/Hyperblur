"use client";

import * as React from "react";

export interface SidebarTreeNode {
  id: string;
  name: string;
  children?: SidebarTreeNode[];
}

export interface SidebarTreeProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "onSelect" | "children" | "defaultValue" | "title"> {
  nodes?: SidebarTreeNode[];
  selected?: string | null;
  defaultSelected?: string | null;
  onSelect?: (id: string, node: SidebarTreeNode) => void;
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  filterable?: boolean;
  placeholder?: string;
  title?: string;
  rowHeight?: number;
  indent?: number;
  color?: string;
}

const sampleNodes: SidebarTreeNode[] = [
  {
    id: "app",
    name: "app",
    children: [
      { id: "app/layout.tsx", name: "layout.tsx" },
      { id: "app/page.tsx", name: "page.tsx" },
      { id: "app/globals.css", name: "globals.css" },
    ],
  },
  {
    id: "components",
    name: "components",
    children: [
      { id: "components/button.tsx", name: "button.tsx" },
      { id: "components/card.tsx", name: "card.tsx" },
      { id: "components/navbar.tsx", name: "navbar.tsx" },
    ],
  },
  { id: "lib", name: "lib", children: [{ id: "lib/utils.ts", name: "utils.ts" }] },
  { id: "package.json", name: "package.json" },
  { id: "tsconfig.json", name: "tsconfig.json" },
  { id: "README.md", name: "README.md" },
];

const css = `
.hb-tree {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: var(--hb-tree-w, 100%);
  max-width: 100%;
  height: 100%;
  min-height: 0;
  background: #0f0f0f;
  color: #c9c9c9;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: 13px;
  line-height: 18px;
  --hb-tree-accent: #2f7bff;
}
.hb-tree *, .hb-tree *::before, .hb-tree *::after { box-sizing: border-box; }
.hb-tree-title {
  flex: none;
  padding: 10px 14px 6px;
  color: #77777f;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .08em;
  line-height: 16px;
  text-transform: uppercase;
}
.hb-tree-filter { position: relative; flex: none; margin: 4px 10px 6px; }
.hb-tree-filter > svg { position: absolute; top: 50%; left: 9px; width: 13px; height: 13px; color: #77777f; transform: translateY(-50%); pointer-events: none; }
.hb-tree-input {
  display: block;
  width: 100%;
  height: 28px;
  margin: 0;
  padding: 0 28px 0 28px;
  border: 1px solid #262626;
  border-radius: 7px;
  outline: 0;
  background: #141414;
  color: #ededed;
  font: inherit;
  font-size: 12.5px;
  transition: border-color .18s ease, box-shadow .18s ease;
}
.hb-tree-input::placeholder { color: #6b6b73; }
.hb-tree-input:focus { border-color: var(--hb-tree-accent); box-shadow: 0 0 0 3px rgba(47, 123, 255, .18); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-tree-accent) 22%, transparent); }
.hb-tree-clear {
  position: absolute;
  top: 50%;
  right: 5px;
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background: #222222;
  color: #a1a1a1;
  cursor: pointer;
  transform: translateY(-50%);
}
.hb-tree-clear:hover { color: #ededed; }
.hb-tree-clear:focus-visible { outline: 2px solid var(--hb-tree-accent); outline-offset: 1px; }
.hb-tree-clear svg { width: 9px; height: 9px; }
.hb-tree-scroll { flex: 1; min-height: 0; padding: 2px 6px 8px; overflow: auto; scrollbar-width: thin; scrollbar-color: #2a2a2a transparent; }
.hb-tree-list { position: relative; margin: 0; padding: 0; list-style: none; }
.hb-tree-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  height: var(--hb-tree-row, 26px);
  padding: 0 8px 0 calc(var(--hb-tree-d, 0) * var(--hb-tree-indent, 14px) + 6px);
  border-radius: 6px;
  color: #a8a8a8;
  white-space: nowrap;
  cursor: pointer;
  outline: 0;
  user-select: none;
  -webkit-user-select: none;
  transition: background-color .12s ease, color .12s ease;
  animation: hb-tree-in .22s cubic-bezier(.2, .9, .2, 1) both;
}
.hb-tree-row:hover { background: #181818; color: #ededed; }
.hb-tree-row[aria-selected="true"] {
  background: rgba(47, 123, 255, .18);
  background: color-mix(in srgb, var(--hb-tree-accent) 20%, transparent);
  color: #ffffff;
}
.hb-tree-row:focus-visible { box-shadow: inset 0 0 0 1.5px var(--hb-tree-accent); }
.hb-tree-chev { flex: none; width: 12px; height: 12px; color: #6f6f78; transition: transform .22s cubic-bezier(.2, .9, .2, 1), color .15s ease; }
.hb-tree-row[aria-expanded="true"] > .hb-tree-chev { transform: rotate(90deg); color: #c9c9c9; }
.hb-tree-gap { flex: none; width: 12px; height: 12px; }
.hb-tree-ico { flex: none; width: 16px; height: 16px; }
.hb-tree-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.hb-tree-name mark { border-radius: 3px; background: rgba(245, 197, 66, .28); color: #ffe08a; }
.hb-tree-guide { position: absolute; top: 0; bottom: 0; width: 1px; background: #232323; transition: background-color .2s ease; pointer-events: none; }
.hb-tree-list:hover .hb-tree-guide { background: #333333; }
.hb-tree-empty { padding: 18px 12px; color: #77777f; text-align: center; }
@keyframes hb-tree-in {
  from { opacity: 0; transform: translate3d(0, -4px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-tree-row, .hb-tree-chev, .hb-tree-input, .hb-tree-guide { transition: none; animation: none; }
}
`;

interface Row {
  node: SidebarTreeNode;
  depth: number;
  parent: string | null;
  pos: number;
  size: number;
}

function prune(nodes: SidebarTreeNode[], q: string): SidebarTreeNode[] {
  return nodes.flatMap((node) => {
    if (!node.children) return node.name.toLowerCase().includes(q) ? [node] : [];
    const kids = prune(node.children, q);
    if (kids.length > 0) return [{ ...node, children: kids }];
    return node.name.toLowerCase().includes(q) ? [{ ...node, children: [] }] : [];
  });
}

function flatten(nodes: SidebarTreeNode[], open: (id: string) => boolean, depth: number, parent: string | null, out: Row[]) {
  nodes.forEach((node, i) => {
    out.push({ node, depth, parent, pos: i + 1, size: nodes.length });
    if (node.children && node.children.length > 0 && open(node.id)) flatten(node.children, open, depth + 1, node.id, out);
  });
}

function extOf(name: string) {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
}

function highlight(name: string, q: string): React.ReactNode {
  if (!q) return name;
  const at = name.toLowerCase().indexOf(q);
  if (at < 0) return name;
  return (
    <>
      {name.slice(0, at)}
      <mark>{name.slice(at, at + q.length)}</mark>
      {name.slice(at + q.length)}
    </>
  );
}

function FileIcon({ name }: { name: string }) {
  const ext = extOf(name);
  const base = { className: "hb-tree-ico", viewBox: "0 0 16 16", fill: "none", "aria-hidden": true } as const;
  if (ext === "ts") {
    return (
      <svg {...base}>
        <rect x="1.5" y="1.5" width="13" height="13" rx="3" fill="#3178c6" />
        <text x="8" y="11.4" textAnchor="middle" fontSize="7.6" fontWeight="700" fill="#ffffff" fontFamily="ui-sans-serif, system-ui, sans-serif">
          TS
        </text>
      </svg>
    );
  }
  if (ext === "tsx") {
    return (
      <svg {...base} stroke="#4fc3f7" strokeWidth="0.95">
        <circle cx="8" cy="8" r="1.3" fill="#4fc3f7" stroke="none" />
        <ellipse cx="8" cy="8" rx="6.6" ry="2.5" />
        <ellipse cx="8" cy="8" rx="6.6" ry="2.5" transform="rotate(60 8 8)" />
        <ellipse cx="8" cy="8" rx="6.6" ry="2.5" transform="rotate(120 8 8)" />
      </svg>
    );
  }
  if (ext === "css") {
    return (
      <svg {...base} stroke="#a78bfa" strokeWidth="1.3" strokeLinecap="round">
        <path d="M6.2 2.8L5.2 13.2M11.2 2.8l-1 10.4M3 6.2h10.4M2.6 9.8H13" />
      </svg>
    );
  }
  if (ext === "json") {
    return (
      <svg {...base} stroke="#f5c542" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2.8C4.6 2.8 4.6 3.8 4.6 5.3S4.2 7.9 3 8c1.2.1 1.6.6 1.6 2.7s0 2.5 1.4 2.5M10 2.8c1.4 0 1.4 1 1.4 2.5s.4 2.6 1.6 2.7c-1.2.1-1.6.6-1.6 2.7s0 2.5-1.4 2.5" />
      </svg>
    );
  }
  if (ext === "md") {
    return (
      <svg {...base} stroke="#9aa4b2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1.5" y="3.5" width="13" height="9" rx="2" />
        <path d="M4 10V6l1.8 2.2L7.6 6v4M11.2 6v3.6M9.8 8.4l1.4 1.5 1.4-1.5" />
      </svg>
    );
  }
  return (
    <svg {...base} stroke="#8f8f8f" strokeWidth="1.2" strokeLinejoin="round">
      <path d="M4 1.8h5l3.2 3.2v8.2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2.8a1 1 0 0 1 1-1zM9 1.8V5h3.2" />
    </svg>
  );
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg className="hb-tree-ico" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {open ? (
        <path d="M1.8 4.4a1 1 0 0 1 1-1h3l1.3 1.4h5.1a1 1 0 0 1 1 1V6H4.4a1 1 0 0 0-.95.7L1.8 11.5zM3.5 12.6l1.5-4.7a.8.8 0 0 1 .76-.55h8.4a.6.6 0 0 1 .57.8l-1.4 4.2a.9.9 0 0 1-.85.6H3.9a.6.6 0 0 1-.4-.35z" fill="#7a8ba6" />
      ) : (
        <path d="M1.8 4.4a1 1 0 0 1 1-1h3l1.3 1.4h5.1a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1H2.8a1 1 0 0 1-1-1z" fill="#7a8ba6" />
      )}
    </svg>
  );
}

export function SidebarTree({
  nodes,
  selected,
  defaultSelected = null,
  onSelect,
  expanded,
  defaultExpanded,
  onExpandedChange,
  filterable = false,
  placeholder = "Filter files",
  title = "Explorer",
  rowHeight = 26,
  indent = 14,
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: SidebarTreeProps) {
  const data = nodes ?? sampleNodes;
  const rowRefs = React.useRef<Map<string, HTMLElement>>(new Map());
  const [innerSel, setInnerSel] = React.useState<string | null>(defaultSelected);
  const [innerOpen, setInnerOpen] = React.useState<string[]>(defaultExpanded ?? (nodes ? [] : ["app", "components"]));
  const [focusId, setFocusId] = React.useState("");
  const [query, setQuery] = React.useState("");
  const sel = selected !== undefined ? selected : innerSel;
  const openIds = expanded ?? innerOpen;
  const q = query.trim().toLowerCase();

  const rows = React.useMemo(() => {
    const out: Row[] = [];
    if (q) flatten(prune(data, q), () => true, 0, null, out);
    else flatten(data, (id) => openIds.includes(id), 0, null, out);
    return out;
  }, [data, openIds, q]);

  const tabStop = rows.some((r) => r.node.id === focusId)
    ? focusId
    : (rows.find((r) => r.node.id === sel)?.node.id ?? rows[0]?.node.id);

  function setOpenIds(next: string[]) {
    if (expanded === undefined) setInnerOpen(next);
    onExpandedChange?.(next);
  }

  function toggle(id: string, force?: boolean) {
    const isOpen = openIds.includes(id);
    const want = force ?? !isOpen;
    if (want === isOpen) return;
    setOpenIds(want ? [...openIds, id] : openIds.filter((x) => x !== id));
  }

  function choose(node: SidebarTreeNode) {
    if (selected === undefined) setInnerSel(node.id);
    onSelect?.(node.id, node);
  }

  function focusRow(id: string | undefined) {
    if (id) rowRefs.current.get(id)?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-tree-id]");
    if (!el) return;
    const id = el.dataset.treeId as string;
    const index = rows.findIndex((r) => r.node.id === id);
    if (index < 0) return;
    const row = rows[index];
    const isFolder = !!row.node.children;
    const isOpen = q ? true : openIds.includes(id);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusRow(rows[Math.min(rows.length - 1, index + 1)]?.node.id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusRow(rows[Math.max(0, index - 1)]?.node.id);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusRow(rows[0]?.node.id);
    } else if (e.key === "End") {
      e.preventDefault();
      focusRow(rows[rows.length - 1]?.node.id);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (!isFolder) return;
      if (!isOpen) toggle(id, true);
      else if (rows[index + 1] && rows[index + 1].parent === id) focusRow(rows[index + 1].node.id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (isFolder && isOpen && !q) toggle(id, false);
      else if (row.parent) focusRow(row.parent);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(row.node);
      if (isFolder && !q) toggle(id);
    }
  }

  const vars = {
    "--hb-tree-accent": color,
    "--hb-tree-row": `${rowHeight}px`,
    "--hb-tree-indent": `${indent}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-tree ${className}`} style={vars} {...rest}>
      <style href="hb-sidebar-tree" precedence="default">{css}</style>
      {title ? <div className="hb-tree-title">{title}</div> : null}
      {filterable ? (
        <div className="hb-tree-filter">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <input
            className="hb-tree-input"
            type="text"
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
                focusRow(tabStop);
              }
            }}
          />
          {query ? (
            <button type="button" className="hb-tree-clear" aria-label="Clear filter" onClick={() => setQuery("")}>
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <path d="M2 2l6 6M8 2L2 8" />
              </svg>
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="hb-tree-scroll">
        {rows.length === 0 ? (
          <div className="hb-tree-empty" role="status">
            No files match
          </div>
        ) : (
          <ul className="hb-tree-list" role="tree" aria-label={title || "Files"} onKeyDown={handleKeyDown}>
            {rows.map((row) => {
              const { node } = row;
              const isFolder = !!node.children;
              const isOpen = isFolder && (q ? true : openIds.includes(node.id));
              return (
                <li
                  key={node.id}
                  ref={(el) => {
                    if (el) rowRefs.current.set(node.id, el);
                    else rowRefs.current.delete(node.id);
                  }}
                  role="treeitem"
                  className="hb-tree-row"
                  data-tree-id={node.id}
                  aria-level={row.depth + 1}
                  aria-setsize={row.size}
                  aria-posinset={row.pos}
                  aria-expanded={isFolder ? isOpen : undefined}
                  aria-selected={node.id === sel}
                  tabIndex={node.id === tabStop ? 0 : -1}
                  style={{ "--hb-tree-d": row.depth } as React.CSSProperties}
                  onFocus={() => setFocusId(node.id)}
                  onClick={() => {
                    setFocusId(node.id);
                    choose(node);
                    if (isFolder && !q) toggle(node.id);
                  }}
                >
                  {Array.from({ length: row.depth }, (_, d) => (
                    <span key={d} className="hb-tree-guide" aria-hidden="true" style={{ left: `calc(${d} * var(--hb-tree-indent, 14px) + 12px)` }} />
                  ))}
                  {isFolder ? (
                    <svg className="hb-tree-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 3.5L10.5 8 6 12.5" />
                    </svg>
                  ) : (
                    <span className="hb-tree-gap" aria-hidden="true" />
                  )}
                  {isFolder ? <FolderIcon open={isOpen} /> : <FileIcon name={node.name} />}
                  <span className="hb-tree-name">{highlight(node.name, q)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
