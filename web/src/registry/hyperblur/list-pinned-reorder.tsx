"use client";

import * as React from "react";

export interface PinnedItem {
  id: string;
  title: string;
  subtitle?: string;
  pinned?: boolean;
  color?: string;
}

export interface ListPinnedReorderProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, "onChange" | "children" | "defaultValue"> {
  value?: PinnedItem[];
  defaultValue?: PinnedItem[];
  onChange?: (items: PinnedItem[]) => void;
  rowHeight?: number;
  accent?: string;
}

const defaultItems: PinnedItem[] = [
  { id: "p1", title: "Northwind redesign", subtitle: "12 tasks", pinned: true, color: "#2f7bff" },
  { id: "p2", title: "Q4 planning", subtitle: "Due Fri", color: "#8b5cf6" },
  { id: "p3", title: "Customer interviews", subtitle: "5 notes", color: "#30a46c" },
  { id: "p4", title: "Pricing experiment", subtitle: "Draft", color: "#f5a623" },
  { id: "p5", title: "Brand refresh", subtitle: "On hold", color: "#e5484d" },
];

const PALETTE = ["#2f7bff", "#8b5cf6", "#30a46c", "#f5a623", "#e5484d", "#0ea5b7", "#d6409f"];

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

function arrange(items: PinnedItem[]) {
  return [...items.filter((i) => i.pinned), ...items.filter((i) => !i.pinned)];
}

const css = `
.hb-yc8 {
  --hb-yc8-a: #2f7bff;
  --hb-yc8-row: 36px;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
}
.hb-yc8 *, .hb-yc8 *::before, .hb-yc8 *::after { box-sizing: border-box; }
.hb-yc8-li {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: var(--hb-yc8-row);
  padding: 0 4px 0 8px;
  border: 1px solid #232323;
  border-radius: 10px;
  background: #121212;
  will-change: transform;
  transition: background-color .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.hb-yc8-li + .hb-yc8-li { margin-top: 3px; }
.hb-yc8-li:hover { background: #161616; border-color: #2c2c2c; }
.hb-yc8-li[data-pinned="true"] { background: color-mix(in srgb, var(--hb-yc8-a) 9%, #111111); border-color: color-mix(in srgb, var(--hb-yc8-a) 30%, #232323); }
.hb-yc8-li[data-edge="true"] { margin-bottom: 8px; }
.hb-yc8-li[data-edge="true"]::after {
  content: "";
  position: absolute;
  right: 12px;
  bottom: -5px;
  left: 12px;
  height: 1px;
  background: repeating-linear-gradient(90deg, #333333 0 4px, transparent 4px 8px);
}
.hb-yc8-li[data-flash="true"] { animation: hb-yc8-flash .7s ease-out; }
.hb-yc8-tile { flex: none; width: 8px; height: 8px; border-radius: 3px; background: var(--hb-yc8-c, #2f7bff); box-shadow: 0 0 10px color-mix(in srgb, var(--hb-yc8-c, #2f7bff) 60%, transparent); }
.hb-yc8-txt { display: flex; flex: 1; align-items: baseline; gap: 8px; min-width: 0; }
.hb-yc8-name { min-width: 0; overflow: hidden; font-weight: var(--hb-yc8-w, 550); text-overflow: ellipsis; white-space: nowrap; }
.hb-yc8-sub { flex: none; color: #77777f; font-size: 11.5px; white-space: nowrap; }
.hb-yc8-acts { display: flex; flex: none; align-items: center; gap: 1px; }
.hb-yc8-btn {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #6f6f6f;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease, transform .15s ease, opacity .15s ease;
}
.hb-yc8-btn svg { width: 15px; height: 15px; }
.hb-yc8-btn:hover { background: #242424; color: #ededed; }
.hb-yc8-btn:active { transform: scale(.9); }
.hb-yc8-btn:focus-visible { outline: 2px solid var(--hb-yc8-a); outline-offset: 0; }
.hb-yc8-btn[aria-disabled="true"] { opacity: .28; cursor: default; }
.hb-yc8-btn[aria-disabled="true"]:hover { background: transparent; color: #6f6f6f; }
.hb-yc8-pin svg { transition: transform .3s cubic-bezier(.3, 1.5, .5, 1); transform: rotate(45deg); }
.hb-yc8-pin[aria-pressed="true"] { color: var(--hb-yc8-a); }
.hb-yc8-pin[aria-pressed="true"] svg { transform: rotate(0); }
.hb-yc8-pin[aria-pressed="true"] svg path { fill: color-mix(in srgb, var(--hb-yc8-a) 35%, transparent); }
.hb-yc8-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-yc8-flash {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-yc8-a) 55%, transparent); }
  100% { box-shadow: 0 0 0 8px transparent; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yc8-li, .hb-yc8-btn, .hb-yc8-pin svg { transition: none; }
  .hb-yc8-li[data-flash="true"] { animation: none; }
}
`;

export function ListPinnedReorder({
  value,
  defaultValue = defaultItems,
  onChange,
  rowHeight = 36,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: ListPinnedReorderProps) {
  const rootRef = React.useRef<HTMLUListElement>(null);
  const nodes = React.useRef(new Map<string, HTMLLIElement>());
  const before = React.useRef<Map<string, number> | null>(null);
  const restore = React.useRef<{ id: string; act: string } | null>(null);
  const timer = React.useRef<number | null>(null);
  const [inner, setInner] = React.useState(defaultValue);
  const [focusId, setFocusId] = React.useState("");
  const [flashId, setFlashId] = React.useState("");
  const [note, setNote] = React.useState("");
  const list = arrange(value ?? inner);
  const signature = list.map((i) => `${i.id}${i.pinned ? "!" : ""}`).join("|");
  const lastPinned = list.reduce((n, i, at) => (i.pinned ? at : n), -1);
  const tabStop = list.some((i) => i.id === focusId) ? focusId : list[0]?.id;

  React.useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  React.useLayoutEffect(() => {
    const snapshot = before.current;
    before.current = null;
    const wanted = restore.current;
    restore.current = null;
    if (wanted) {
      nodes.current.get(wanted.id)?.querySelector<HTMLElement>(`[data-yc8-act="${wanted.act}"]`)?.focus({ preventScroll: true });
    }
    if (!snapshot || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    nodes.current.forEach((el, id) => {
      const from = snapshot.get(id);
      if (from === undefined) return;
      const delta = from - el.getBoundingClientRect().top;
      if (Math.abs(delta) < 1) return;
      el.style.transition = "none";
      el.style.transform = `translateY(${delta.toFixed(1)}px)`;
      void el.offsetHeight;
      el.style.transition = "transform .36s cubic-bezier(.2, .9, .2, 1), background-color .2s ease, border-color .2s ease";
      el.style.transform = "";
    });
  }, [signature]);

  function commit(next: PinnedItem[], id: string, act: string, message: string) {
    const snapshot = new Map<string, number>();
    nodes.current.forEach((el, key) => snapshot.set(key, el.getBoundingClientRect().top));
    before.current = snapshot;
    restore.current = { id, act };
    if (value === undefined) setInner(next);
    onChange?.(next);
    setFlashId(id);
    setNote(message);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setFlashId(""), 750);
  }

  function togglePin(id: string) {
    const at = list.findIndex((i) => i.id === id);
    const item = list[at];
    if (!item) return;
    const rest = list.filter((i) => i.id !== id);
    const pinnedCount = rest.filter((i) => i.pinned).length;
    rest.splice(pinnedCount, 0, { ...item, pinned: !item.pinned });
    commit(rest, id, "pin", `${item.title} ${item.pinned ? "unpinned" : "pinned"}`);
  }

  function move(id: string, dir: -1 | 1, act: string) {
    const at = list.findIndex((i) => i.id === id);
    const to = at + dir;
    const item = list[at];
    const other = list[to];
    if (!item || !other || !!other.pinned !== !!item.pinned) return;
    const next = [...list];
    next[at] = other;
    next[to] = item;
    commit(next, id, act, `${item.title} moved to position ${to + 1} of ${list.length}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const target = e.target as HTMLElement;
    const act = target.dataset.yc8Act;
    const id = target.closest<HTMLElement>("[data-yc8-id]")?.dataset.yc8Id;
    if (e.key === "Escape") {
      target.blur();
      return;
    }
    if (!act || !id) return;
    if ((e.key === "ArrowUp" || e.key === "ArrowDown") && e.altKey) {
      e.preventDefault();
      move(id, e.key === "ArrowUp" ? -1 : 1, act);
      return;
    }
    const at = list.findIndex((i) => i.id === id);
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(list.length - 1, at + 1);
    else if (e.key === "ArrowUp") next = Math.max(0, at - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = list.length - 1;
    if (next >= 0) {
      e.preventDefault();
      const nextId = list[next]?.id;
      if (!nextId) return;
      setFocusId(nextId);
      nodes.current.get(nextId)?.querySelector<HTMLElement>(`[data-yc8-act="${act}"]`)?.focus();
    }
  }

  const vars = { "--hb-yc8-a": accent, "--hb-yc8-row": `${rowHeight}px`, ...style } as React.CSSProperties;

  return (
    <ul ref={rootRef} className={`hb-yc8 ${className}`} role="list" style={vars} onKeyDown={handleKeyDown} {...rest}>
      <style href="hb-list-pinned-reorder" precedence="default">{css}</style>
      {list.map((item, at) => {
        const stop = item.id === tabStop ? 0 : -1;
        const canUp = at > 0 && !!list[at - 1]?.pinned === !!item.pinned;
        const canDown = at < list.length - 1 && !!list[at + 1]?.pinned === !!item.pinned;
        return (
          <li
            key={item.id}
            ref={(el) => {
              if (el) nodes.current.set(item.id, el);
              else nodes.current.delete(item.id);
            }}
            className="hb-yc8-li"
            data-yc8-id={item.id}
            data-pinned={!!item.pinned}
            data-edge={at === lastPinned && lastPinned < list.length - 1}
            data-flash={flashId === item.id}
          >
            <span className="hb-yc8-tile" style={{ "--hb-yc8-c": item.color ?? PALETTE[hash(item.title) % PALETTE.length] } as React.CSSProperties} aria-hidden="true" />
            <span className="hb-yc8-txt">
              <span className="hb-yc8-name">{item.title}</span>
              {item.subtitle ? <span className="hb-yc8-sub">{item.subtitle}</span> : null}
            </span>
            <span className="hb-yc8-acts">
              <button
                type="button"
                className="hb-yc8-btn hb-yc8-pin"
                data-yc8-act="pin"
                tabIndex={stop}
                aria-pressed={!!item.pinned}
                aria-label={`${item.pinned ? "Unpin" : "Pin"} ${item.title}`}
                title={item.pinned ? "Unpin" : "Pin to top"}
                onFocus={() => setFocusId(item.id)}
                onClick={() => togglePin(item.id)}
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 2.5h4l-.6 3.4 2.1 2.1v1H8.6V13.5h-1.2V9H4.5V8l2.1-2.1z" />
                </svg>
              </button>
              <button
                type="button"
                className="hb-yc8-btn"
                data-yc8-act="up"
                tabIndex={stop}
                aria-disabled={!canUp}
                aria-label={`Move ${item.title} up`}
                title="Move up"
                onFocus={() => setFocusId(item.id)}
                onClick={() => canUp && move(item.id, -1, "up")}
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 9.5L8 5.5l4 4" />
                </svg>
              </button>
              <button
                type="button"
                className="hb-yc8-btn"
                data-yc8-act="down"
                tabIndex={stop}
                aria-disabled={!canDown}
                aria-label={`Move ${item.title} down`}
                title="Move down"
                onFocus={() => setFocusId(item.id)}
                onClick={() => canDown && move(item.id, 1, "down")}
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 6.5l4 4 4-4" />
                </svg>
              </button>
            </span>
          </li>
        );
      })}
      <li className="hb-yc8-sr" role="status" aria-live="polite">
        {note}
      </li>
    </ul>
  );
}
