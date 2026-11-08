"use client";

import * as React from "react";

export interface KanbanTask {
  id: string;
  title: string;
  group: string;
  tag?: string;
  tagColor?: string;
  assignee?: string;
  due?: string;
  points?: number;
}

export interface KanbanGroup {
  id: string;
  label: string;
  color: string;
  limit?: number;
  done?: boolean;
}

export interface ListKanbanGroupedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  groups?: KanbanGroup[];
  tasks?: KanbanTask[];
  defaultTasks?: KanbanTask[];
  onChange?: (tasks: KanbanTask[]) => void;
  accent?: string;
  defaultCollapsed?: string[];
}

const defaultGroups: KanbanGroup[] = [
  { id: "doing", label: "In progress", color: "#2f7bff", limit: 3 },
  { id: "review", label: "In review", color: "#a78bfa", limit: 2 },
  { id: "next", label: "Up next", color: "#f5b544" },
  { id: "done", label: "Done", color: "#4ade80", done: true },
];

const sample: KanbanTask[] = [
  { id: "t1", title: "Rate limit the export endpoint", group: "doing", tag: "API", tagColor: "#2f7bff", assignee: "Maya Chen", due: "Nov 10", points: 3 },
  { id: "t2", title: "Empty states for the billing tab", group: "doing", tag: "Design", tagColor: "#f472b6", assignee: "Leo Marsh", due: "Nov 12", points: 2 },
  { id: "t3", title: "Migrate audit log to partitioned table", group: "review", tag: "Data", tagColor: "#22c3a6", assignee: "Jonah Reyes", due: "Nov 9", points: 5 },
  { id: "t4", title: "SSO setup guide for admins", group: "next", tag: "Docs", tagColor: "#f5b544", assignee: "Priya Raman", points: 1 },
  { id: "t5", title: "Retry webhooks with backoff", group: "next", tag: "API", tagColor: "#2f7bff", assignee: "Kenji Watanabe", due: "Nov 18", points: 3 },
  { id: "t6", title: "Keyboard shortcuts sheet", group: "next", tag: "Design", tagColor: "#f472b6", assignee: "Sofia Lind", points: 2 },
  { id: "t7", title: "Invoice PDF line wrapping", group: "done", tag: "Billing", tagColor: "#4ade80", assignee: "Amara Okafor", points: 1 },
];

function initials(n?: string) {
  if (!n) return "";
  return n
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function hueOf(n: string) {
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (Math.imul(h, 31) + n.charCodeAt(i)) >>> 0;
  return h % 360;
}

const css = `
.hb-wi7 {
  --hb-wi7-a: #2f7bff;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  color: #ededed;
  font-family: inherit;
  font-size: 12.5px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  user-select: none;
  -webkit-user-select: none;
}
.hb-wi7 *, .hb-wi7 *::before, .hb-wi7 *::after { box-sizing: border-box; }
.hb-wi7-grp { border-radius: 11px; border: 1px solid #222; background: #0f0f0f; overflow: hidden; transition: border-color 0.2s ease, background 0.2s ease; }
.hb-wi7-grp[data-target="true"] { border-color: color-mix(in srgb, var(--hb-wi7-g) 55%, #222); background: color-mix(in srgb, var(--hb-wi7-g) 5%, #0f0f0f); }
.hb-wi7-gh {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.hb-wi7-gh:focus-visible { outline: none; box-shadow: inset 0 0 0 2px rgba(127, 179, 255, 0.6); border-radius: 10px; }
.hb-wi7-gh > svg { color: #6f6f6f; transition: transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1); }
.hb-wi7-grp[data-collapsed="true"] .hb-wi7-gh > svg { transform: rotate(-90deg); }
.hb-wi7-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--hb-wi7-g); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wi7-g) 18%, transparent); }
.hb-wi7-gl { font-weight: 600; font-size: 12px; }
.hb-wi7-cnt { font-size: 11px; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-wi7-wip { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-wi7-wip i { display: inline-flex; gap: 2px; }
.hb-wi7-wip i b { width: 6px; height: 10px; border-radius: 2px; background: #262626; transition: background 0.25s ease; }
.hb-wi7-wip i b[data-on="true"] { background: var(--hb-wi7-g); }
.hb-wi7-wip[data-over="true"] { color: #ff7a6b; }
.hb-wi7-wip[data-over="true"] i b[data-on="true"] { background: #ff7a6b; }
.hb-wi7-body { display: grid; grid-template-rows: 1fr; transition: grid-template-rows 0.35s cubic-bezier(0.65, 0, 0.25, 1); }
.hb-wi7-grp[data-collapsed="true"] .hb-wi7-body { grid-template-rows: 0fr; }
.hb-wi7-bi { min-height: 0; overflow: hidden; }
.hb-wi7-list { margin: 0; padding: 0 6px 6px; list-style: none; display: flex; flex-direction: column; gap: 3px; min-height: 8px; }
.hb-wi7-empty { margin: 0 6px 6px; height: 34px; border-radius: 8px; border: 1px dashed #2a2a2a; display: grid; place-items: center; font-size: 11px; color: #5f5f5f; }
.hb-wi7-row {
  position: relative;
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 8px 0 4px;
  border-radius: 8px;
  background: #151515;
  border: 1px solid #1f1f1f;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.025);
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.25s ease, opacity 0.2s ease;
}
.hb-wi7-row:hover { background: #181818; border-color: #2a2a2a; }
.hb-wi7-row[data-done="true"] .hb-wi7-tt { color: #6f6f6f; text-decoration: line-through; text-decoration-color: #444; }
.hb-wi7-row[data-drag="true"] {
  z-index: 10;
  background: #1c1c1c;
  border-color: color-mix(in srgb, var(--hb-wi7-a) 60%, #2a2a2a);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px color-mix(in srgb, var(--hb-wi7-a) 30%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.25s ease;
  cursor: grabbing;
}
.hb-wi7-row[data-drag="true"] .hb-wi7-in { transform: rotate(-1deg) scale(1.01); }
.hb-wi7-in { display: contents; }
.hb-wi7-hd {
  display: grid;
  place-items: center;
  width: 18px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: #4a4a4a;
  cursor: grab;
  touch-action: none;
  transition: color 0.15s ease, background 0.15s ease;
}
.hb-wi7-row:hover .hb-wi7-hd { color: #8f8f8f; }
.hb-wi7-hd:hover { background: #222; color: #ededed; }
.hb-wi7-hd:focus-visible { outline: none; color: #ededed; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); }
.hb-wi7-row[data-lifted="true"] { border-color: var(--hb-wi7-a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wi7-a) 25%, transparent); }
.hb-wi7-tx { display: flex; align-items: center; gap: 7px; min-width: 0; }
.hb-wi7-tt { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wi7-tag { flex: none; height: 18px; padding: 0 6px; border-radius: 5px; font-size: 10.5px; font-weight: 500; display: inline-flex; align-items: center; color: var(--hb-wi7-t); background: color-mix(in srgb, var(--hb-wi7-t) 12%, transparent); }
.hb-wi7-mt { display: flex; align-items: center; gap: 7px; font-size: 11px; color: #6f6f6f; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-wi7-pts { min-width: 18px; height: 18px; padding: 0 4px; border-radius: 5px; border: 1px solid #2a2a2a; display: grid; place-items: center; color: #a1a1a1; }
.hb-wi7-av { width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; font-size: 9px; font-weight: 700; color: #fff; box-shadow: 0 0 0 2px #151515; }
.hb-wi7-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 340px) {
  .hb-wi7-due, .hb-wi7-tag { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wi7-body, .hb-wi7-gh > svg, .hb-wi7-row { transition: none; }
}
`;

export function ListKanbanGrouped({
  groups = defaultGroups,
  tasks,
  defaultTasks = sample,
  onChange,
  accent = "#2f7bff",
  defaultCollapsed = [],
  className,
  style,
  ...rest
}: ListKanbanGroupedProps) {
  const [inner, setInner] = React.useState(defaultTasks);
  const list = tasks ?? inner;
  const [collapsed, setCollapsed] = React.useState<string[]>(defaultCollapsed);
  const [drag, setDrag] = React.useState<{ id: string; dy: number; target: string } | null>(null);
  const [lifted, setLifted] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState("");
  const rowRefs = React.useRef(new Map<string, HTMLLIElement>());
  const grpRefs = React.useRef(new Map<string, HTMLDivElement>());
  const tops = React.useRef(new Map<string, number>());
  const dragInfo = React.useRef<{ id: string; startY: number; startTop: number } | null>(null);
  const liftOrigin = React.useRef<KanbanTask[] | null>(null);
  const handleRefs = React.useRef(new Map<string, HTMLButtonElement>());

  const commit = React.useCallback(
    (next: KanbanTask[]) => {
      if (tasks === undefined) setInner(next);
      onChange?.(next);
    },
    [tasks, onChange],
  );

  const pageTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

  React.useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = new Map<string, number>();
    rowRefs.current.forEach((el, id) => next.set(id, pageTop(el) - (drag?.id === id ? drag.dy : 0)));
    if (!reduce) {
      rowRefs.current.forEach((el, id) => {
        if (drag?.id === id) return;
        const a = tops.current.get(id);
        const b = next.get(id);
        if (a === undefined || b === undefined || Math.abs(a - b) < 1) return;
        el.animate([{ transform: `translateY(${a - b}px)` }, { transform: "translateY(0)" }], { duration: 260, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
      });
    }
    tops.current = next;
  });

  const move = (id: string, group: string, index: number, source: KanbanTask[] = list) => {
    const item = source.find((t) => t.id === id);
    if (!item) return source;
    const rest = source.filter((t) => t.id !== id);
    const moved = { ...item, group };
    const inGroup = rest.filter((t) => t.group === group);
    const anchor = inGroup[index];
    let at = anchor ? rest.indexOf(anchor) : -1;
    if (at < 0) {
      const lastIn = inGroup[inGroup.length - 1];
      if (lastIn) at = rest.indexOf(lastIn) + 1;
      else {
        const gOrder = groups.map((g) => g.id);
        const gi = gOrder.indexOf(group);
        const after = rest.findIndex((t) => gOrder.indexOf(t.group) > gi);
        at = after < 0 ? rest.length : after;
      }
    }
    rest.splice(at, 0, moved);
    return rest;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>, id: string) => {
    if (e.button !== 0) return;
    const row = rowRefs.current.get(id);
    if (!row) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragInfo.current = { id, startY: e.clientY, startTop: pageTop(row) };
    const t = list.find((x) => x.id === id);
    setDrag({ id, dy: 0, target: t?.group ?? "" });
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const info = dragInfo.current;
    if (!info || !drag) return;
    const row = rowRefs.current.get(info.id);
    if (!row) return;
    const naturalTop = pageTop(row) - drag.dy;
    const pointerPage = e.clientY + window.scrollY;
    let target = drag.target;
    let index = -1;
    grpRefs.current.forEach((el, gid) => {
      const r = el.getBoundingClientRect();
      if (e.clientY >= r.top && e.clientY <= r.bottom) target = gid;
    });
    if (!collapsed.includes(target)) {
      const members = list.filter((t) => t.group === target && t.id !== info.id);
      index = members.length;
      for (let k = 0; k < members.length; k++) {
        const el = rowRefs.current.get(members[k].id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (pointerPage < r.top + window.scrollY + r.height / 2) {
          index = k;
          break;
        }
      }
    } else index = list.filter((t) => t.group === target && t.id !== info.id).length;
    const current = list.filter((t) => t.group === target && t.id !== info.id);
    const item = list.find((t) => t.id === info.id);
    const currentIndex = item && item.group === target ? list.filter((t) => t.group === target).indexOf(item) : -1;
    let next = list;
    if (item && (item.group !== target || currentIndex !== index) && index <= current.length) {
      next = move(info.id, target, index);
      commit(next);
    }
    const dy = info.startTop + (e.clientY - info.startY) - naturalTop;
    setDrag({ id: info.id, dy, target });
  };

  const endDrag = () => {
    const info = dragInfo.current;
    dragInfo.current = null;
    if (info) {
      const t = list.find((x) => x.id === info.id);
      const g = groups.find((x) => x.id === t?.group);
      if (t && g) setMessage(`${t.title} dropped in ${g.label}`);
      const row = rowRefs.current.get(info.id);
      if (row && drag && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        row.animate([{ transform: `translateY(${drag.dy}px)` }, { transform: "translateY(0)" }], { duration: 240, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
      }
    }
    setDrag(null);
  };

  const keyMove = (id: string, dir: number) => {
    const t = list.find((x) => x.id === id);
    if (!t) return;
    const order = groups.map((g) => g.id).filter((g) => !collapsed.includes(g) || g === t.group);
    const members = list.filter((x) => x.group === t.group);
    const idx = members.indexOf(t);
    let group = t.group;
    let index = idx + dir;
    if (index < 0 || index >= members.length) {
      const gi = order.indexOf(t.group) + dir;
      if (gi < 0 || gi >= order.length) return;
      group = order[gi];
      index = dir > 0 ? 0 : list.filter((x) => x.group === group).length;
    }
    const next = move(id, group, index);
    commit(next);
    const g = groups.find((x) => x.id === group);
    const pos = next.filter((x) => x.group === group).findIndex((x) => x.id === id) + 1;
    setMessage(`${t.title}, ${g?.label ?? group}, position ${pos}`);
    requestAnimationFrame(() => handleRefs.current.get(id)?.focus());
  };

  const onHandleKey = (e: React.KeyboardEvent, id: string) => {
    const t = list.find((x) => x.id === id);
    if (!t) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (lifted === id) {
        setLifted(null);
        liftOrigin.current = null;
        setMessage(`${t.title} dropped`);
      } else {
        setLifted(id);
        liftOrigin.current = list;
        setMessage(`${t.title} lifted. Use the arrow keys to move, Space to drop, Escape to cancel.`);
      }
    } else if (lifted === id && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      keyMove(id, e.key === "ArrowDown" ? 1 : -1);
    } else if (lifted === id && e.key === "Escape") {
      e.preventDefault();
      if (liftOrigin.current) commit(liftOrigin.current);
      liftOrigin.current = null;
      setLifted(null);
      setMessage(`Move cancelled`);
    }
  };

  return (
    <div {...rest} className={["hb-wi7", className].filter(Boolean).join(" ")} style={{ ...style, ["--hb-wi7-a" as string]: accent, containerType: "inline-size" } as React.CSSProperties}>
      <style href="hb-list-kanban-grouped" precedence="default">{css}</style>
      {groups.map((g) => {
        const items = list.filter((t) => t.group === g.id);
        const isCollapsed = collapsed.includes(g.id);
        const over = g.limit !== undefined && items.length > g.limit;
        return (
          <div
            key={g.id}
            className="hb-wi7-grp"
            data-collapsed={isCollapsed}
            data-target={drag !== null && drag.target === g.id}
            style={{ ["--hb-wi7-g" as string]: g.color } as React.CSSProperties}
            ref={(el) => {
              if (el) grpRefs.current.set(g.id, el);
              else grpRefs.current.delete(g.id);
            }}
          >
            <button type="button" className="hb-wi7-gh" aria-expanded={!isCollapsed} onClick={() => setCollapsed((c) => (c.includes(g.id) ? c.filter((x) => x !== g.id) : [...c, g.id]))}>
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hb-wi7-dot" />
              <span className="hb-wi7-gl">{g.label}</span>
              <span className="hb-wi7-cnt">{items.length}</span>
              {g.limit !== undefined ? (
                <span className="hb-wi7-wip" data-over={over} title={`Work in progress limit ${g.limit}`}>
                  {over ? "Over limit" : `${items.length}/${g.limit}`}
                  <i aria-hidden="true">
                    {Array.from({ length: Math.max(g.limit, items.length) }, (_, k) => (
                      <b key={k} data-on={k < items.length} />
                    ))}
                  </i>
                </span>
              ) : null}
            </button>
            <div className="hb-wi7-body">
              <div className="hb-wi7-bi" inert={isCollapsed}>
                {items.length ? (
                  <ul className="hb-wi7-list" aria-label={g.label}>
                    {items.map((t) => (
                      <li
                        key={t.id}
                        className="hb-wi7-row"
                        data-drag={drag?.id === t.id}
                        data-lifted={lifted === t.id}
                        data-done={g.done === true}
                        style={drag?.id === t.id ? { transform: `translateY(${drag.dy.toFixed(1)}px)` } : undefined}
                        ref={(el) => {
                          if (el) rowRefs.current.set(t.id, el);
                          else rowRefs.current.delete(t.id);
                        }}
                      >
                        <button
                          type="button"
                          className="hb-wi7-hd"
                          aria-label={`Reorder ${t.title}`}
                          aria-pressed={lifted === t.id}
                          ref={(el) => {
                            if (el) handleRefs.current.set(t.id, el);
                            else handleRefs.current.delete(t.id);
                          }}
                          onPointerDown={(e) => onPointerDown(e, t.id)}
                          onPointerMove={onPointerMove}
                          onPointerUp={endDrag}
                          onPointerCancel={endDrag}
                          onKeyDown={(e) => onHandleKey(e, t.id)}
                          onBlur={() => {
                            if (lifted === t.id) {
                              setLifted(null);
                              liftOrigin.current = null;
                            }
                          }}
                        >
                          <svg width="8" height="14" viewBox="0 0 8 14" aria-hidden="true">
                            {[2, 7, 12].map((y) => (
                              <React.Fragment key={y}>
                                <circle cx="2" cy={y} r="1.2" fill="currentColor" />
                                <circle cx="6" cy={y} r="1.2" fill="currentColor" />
                              </React.Fragment>
                            ))}
                          </svg>
                        </button>
                        <span className="hb-wi7-tx">
                          <span className="hb-wi7-tt">{t.title}</span>
                          {t.tag ? (
                            <span className="hb-wi7-tag" style={{ ["--hb-wi7-t" as string]: t.tagColor ?? "#8f8f8f" } as React.CSSProperties}>
                              {t.tag}
                            </span>
                          ) : null}
                        </span>
                        <span className="hb-wi7-mt">
                          {t.due ? <span className="hb-wi7-due">{t.due}</span> : null}
                          {t.points !== undefined ? <span className="hb-wi7-pts">{t.points}</span> : null}
                          {t.assignee ? (
                            <span className="hb-wi7-av" title={t.assignee} style={{ background: `hsl(${hueOf(t.assignee)} 55% 45%)` }}>
                              {initials(t.assignee)}
                            </span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="hb-wi7-empty">Drop tasks here</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div className="hb-wi7-sr" aria-live="assertive">
        {message}
      </div>
    </div>
  );
}
