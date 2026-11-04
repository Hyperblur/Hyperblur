"use client";

import * as React from "react";

export interface BranchedMenuItem {
  id: string;
  label: string;
  hint?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: BranchedMenuItem[];
}

export interface BranchedMenuProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, "onChange" | "defaultValue"> {
  items?: BranchedMenuItem[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (id: string, item: BranchedMenuItem, path: string[]) => void;
  defaultExpanded?: string[];
  accent?: string;
  label?: string;
}

const defaultItems: BranchedMenuItem[] = [
  {
    id: "new",
    label: "New",
    children: [
      { id: "new-file", label: "Blank file", hint: "N" },
      { id: "new-folder", label: "Folder", hint: "F" },
      {
        id: "new-template",
        label: "From template",
        children: [
          { id: "tpl-landing", label: "Landing page" },
          { id: "tpl-docs", label: "Documentation" },
          { id: "tpl-blog", label: "Blog post" },
        ],
      },
    ],
  },
  {
    id: "share",
    label: "Share",
    children: [
      { id: "share-link", label: "Copy link", hint: "L" },
      { id: "share-invite", label: "Invite people" },
    ],
  },
  { id: "export", label: "Export", hint: "E" },
  { id: "archive", label: "Archive", disabled: true },
];

const css = `
.hb-qs1 {
  --hb-qs1-c: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 6px;
  list-style: none;
  font: inherit;
  font-size: 13px;
  line-height: 1;
  color: #ededed;
  background: #111111;
  border: 1px solid #262626;
  border-radius: 14px;
}
.hb-qs1 *, .hb-qs1 *::before, .hb-qs1 *::after { box-sizing: border-box; font-family: inherit; }
.hb-qs1-it { position: relative; margin: 0; padding: 0; outline: none; }
.hb-qs1-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 30px;
  padding: 0 8px;
  border-radius: 8px;
  color: #c9c9c9;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.18s ease, color 0.18s ease;
}
.hb-qs1-row:hover { background: rgba(255, 255, 255, 0.05); color: #ededed; }
.hb-qs1-it:focus-visible > .hb-qs1-row { outline: 2px solid var(--hb-qs1-c); outline-offset: -2px; color: #fff; }
.hb-qs1-it[aria-selected="true"] > .hb-qs1-row {
  color: #fff;
  background: color-mix(in srgb, var(--hb-qs1-c) 18%, transparent);
}
.hb-qs1-it[aria-disabled="true"] > .hb-qs1-row { opacity: 0.4; cursor: not-allowed; }
.hb-qs1-it[aria-disabled="true"] > .hb-qs1-row:hover { background: transparent; color: #c9c9c9; }
.hb-qs1-ic { display: grid; place-items: center; width: 16px; height: 16px; flex: none; color: #8f8f8f; }
.hb-qs1-ic svg { width: 100%; height: 100%; }
.hb-qs1-lb { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; }
.hb-qs1-hn {
  flex: none;
  padding: 3px 5px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: #8f8f8f;
  border: 1px solid #262626;
  border-radius: 5px;
}
.hb-qs1-ch {
  flex: none;
  width: 14px;
  height: 14px;
  color: #8f8f8f;
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease;
}
.hb-qs1-it[aria-expanded="true"] > .hb-qs1-row > .hb-qs1-ch { transform: rotate(90deg); color: var(--hb-qs1-c); }
.hb-qs1-dot {
  flex: none;
  width: 6px;
  height: 6px;
  margin-right: 5px;
  border-radius: 999px;
  background: var(--hb-qs1-c);
  opacity: 0;
  transform: scale(0.4);
  transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-qs1-it[aria-selected="true"] > .hb-qs1-row .hb-qs1-dot { opacity: 1; transform: scale(1); }
.hb-qs1-sub {
  position: relative;
  margin: 0 0 0 15px;
  padding: 0 0 0 17px;
  list-style: none;
  animation: hb-qs1-open 0.32s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hb-qs1-sub > .hb-qs1-it::before {
  content: "";
  position: absolute;
  left: -17px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: color-mix(in srgb, var(--hb-qs1-c) 45%, #333333);
  transform-origin: top center;
  animation: hb-qs1-down 0.34s cubic-bezier(0.3, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--hb-qs1-i, 0) * 70ms);
}
.hb-qs1-sub > .hb-qs1-it:last-child::before { bottom: auto; height: 15px; }
.hb-qs1-sub > .hb-qs1-it::after {
  content: "";
  position: absolute;
  left: -17px;
  top: 15px;
  width: 13px;
  height: 1px;
  background: color-mix(in srgb, var(--hb-qs1-c) 45%, #333333);
  transform-origin: left center;
  animation: hb-qs1-across 0.26s cubic-bezier(0.3, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--hb-qs1-i, 0) * 70ms + 130ms);
}
.hb-qs1-sub > .hb-qs1-it > .hb-qs1-row { animation: hb-qs1-pop 0.3s ease both; animation-delay: calc(var(--hb-qs1-i, 0) * 70ms + 200ms); }
@keyframes hb-qs1-open {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes hb-qs1-down {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@keyframes hb-qs1-across {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes hb-qs1-pop {
  from { opacity: 0; transform: translateX(-6px); }
  to { opacity: 1; transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qs1-sub, .hb-qs1-sub > .hb-qs1-it::before, .hb-qs1-sub > .hb-qs1-it::after, .hb-qs1-sub > .hb-qs1-it > .hb-qs1-row { animation: none; }
  .hb-qs1-row, .hb-qs1-ch, .hb-qs1-dot { transition: none; }
}
`;

function visibleIds(nodes: BranchedMenuItem[], open: Set<string>, out: string[] = []) {
  for (const node of nodes) {
    if (node.disabled) continue;
    out.push(node.id);
    if (node.children?.length && open.has(node.id)) visibleIds(node.children, open, out);
  }
  return out;
}

function findPath(nodes: BranchedMenuItem[], id: string, trail: BranchedMenuItem[] = []): BranchedMenuItem[] | null {
  for (const node of nodes) {
    const next = [...trail, node];
    if (node.id === id) return next;
    if (node.children) {
      const hit = findPath(node.children, id, next);
      if (hit) return hit;
    }
  }
  return null;
}

const chevron = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3.5 10.5 8 6 12.5" />
  </svg>
);

export function BranchedMenu({
  items = defaultItems,
  value,
  defaultValue = null,
  onChange,
  defaultExpanded = [],
  accent = "#2f7bff",
  label = "Menu",
  className = "",
  style,
  onKeyDown,
  onFocus,
  ...rest
}: BranchedMenuProps) {
  const rootRef = React.useRef<HTMLUListElement>(null);
  const [inner, setInner] = React.useState<string | null>(defaultValue);
  const [expanded, setExpanded] = React.useState<string[]>(defaultExpanded);
  const [focusId, setFocusId] = React.useState<string | null>(null);
  const selected = value !== undefined ? value : inner;
  const open = React.useMemo(() => new Set(expanded), [expanded]);
  const order = visibleIds(items, open);
  const tabId = focusId && order.includes(focusId) ? focusId : (order[0] ?? null);

  function focusItem(id: string) {
    setFocusId(id);
    const el = rootRef.current?.querySelector<HTMLElement>(`[data-hb-id="${CSS.escape(id)}"]`);
    el?.focus();
  }

  function toggle(id: string, force?: boolean) {
    setExpanded((cur) => {
      const has = cur.includes(id);
      const next = force === undefined ? !has : force;
      if (next === has) return cur;
      return next ? [...cur, id] : cur.filter((x) => x !== id);
    });
  }

  function choose(node: BranchedMenuItem) {
    if (node.disabled) return;
    if (node.children?.length) {
      toggle(node.id);
      return;
    }
    if (value === undefined) setInner(node.id);
    const path = findPath(items, node.id)?.map((n) => n.id) ?? [node.id];
    onChange?.(node.id, node, path);
  }

  function handleKey(e: React.KeyboardEvent<HTMLUListElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-hb-id]");
    const id = el?.dataset.hbId;
    if (!id) return;
    const trail = findPath(items, id);
    const node = trail?.[trail.length - 1];
    if (!trail || !node) return;
    const index = order.indexOf(id);
    const hasKids = Boolean(node.children?.length);
    const isOpen = open.has(id);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (index < order.length - 1) focusItem(order[index + 1]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index > 0) focusItem(order[index - 1]);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem(order[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem(order[order.length - 1]);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (hasKids && !isOpen) toggle(id, true);
      else if (hasKids && isOpen) {
        const first = node.children?.find((c) => !c.disabled);
        if (first) focusItem(first.id);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (hasKids && isOpen) toggle(id, false);
      else if (trail.length > 1) focusItem(trail[trail.length - 2].id);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(node);
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (hasKids && isOpen) toggle(id, false);
      else if (trail.length > 1) {
        const parent = trail[trail.length - 2];
        toggle(parent.id, false);
        focusItem(parent.id);
      }
    }
  }

  function renderNodes(nodes: BranchedMenuItem[], level: number): React.ReactNode {
    return nodes.map((node, i) => {
      const hasKids = Boolean(node.children?.length);
      const isOpen = hasKids && open.has(node.id);
      return (
        <li
          key={node.id}
          role="treeitem"
          data-hb-id={node.id}
          aria-level={level}
          aria-expanded={hasKids ? isOpen : undefined}
          aria-selected={!hasKids && selected === node.id}
          aria-disabled={node.disabled || undefined}
          tabIndex={node.id === tabId ? 0 : -1}
          className="hb-qs1-it"
          style={{ "--hb-qs1-i": i } as React.CSSProperties}
        >
          <div
            className="hb-qs1-row"
            onClick={() => {
              setFocusId(node.id);
              choose(node);
            }}
          >
            {node.icon ? <span className="hb-qs1-ic">{node.icon}</span> : null}
            <span className="hb-qs1-lb">{node.label}</span>
            {node.hint && !hasKids ? <span className="hb-qs1-hn">{node.hint}</span> : null}
            {hasKids ? <span className="hb-qs1-ch">{chevron}</span> : <span className="hb-qs1-dot" aria-hidden="true" />}
          </div>
          {isOpen ? (
            <ul role="group" className="hb-qs1-sub">
              {renderNodes(node.children ?? [], level + 1)}
            </ul>
          ) : null}
        </li>
      );
    });
  }

  return (
    <>
      <style href="hb-menu-branched" precedence="default">{css}</style>
      <ul
        ref={rootRef}
        role="tree"
        aria-label={label}
        className={`hb-qs1 ${className}`}
        style={{ "--hb-qs1-c": accent, ...style } as React.CSSProperties}
        onKeyDown={handleKey}
        onFocus={(e) => {
          onFocus?.(e);
          const id = (e.target as HTMLElement).closest<HTMLElement>("[data-hb-id]")?.dataset.hbId;
          if (id) setFocusId(id);
        }}
        {...rest}
      >
        {renderNodes(items, 1)}
      </ul>
    </>
  );
}
