"use client";

import * as React from "react";

export type SortableTone = "blue" | "green" | "amber" | "red" | "neutral";

export interface SortableItem {
  id: string;
  title: string;
  meta?: string;
  tone?: SortableTone;
}

export const defaultTasks: SortableItem[] = [
  { id: "s1", title: "Design review", meta: "High", tone: "red" },
  { id: "s2", title: "Ship onboarding flow", meta: "Medium", tone: "amber" },
  { id: "s3", title: "Write release notes", meta: "Low", tone: "green" },
  { id: "s4", title: "Fix billing webhook", meta: "High", tone: "red" },
  { id: "s5", title: "Plan Q4 roadmap", meta: "Medium", tone: "amber" },
];

export interface SortableListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: SortableItem[];
  label?: string;
  accent?: string;
  onReorder?: (items: SortableItem[], from: number, to: number) => void;
}

const css = `
.hb-srt {
  --hb-srt-accent: #2f7bff;
  --hb-srt-gap: 6px;
  container-type: inline-size;
  position: relative;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  color: #ededed;
}
.hb-srt-list { display: flex; flex-direction: column; gap: var(--hb-srt-gap); margin: 0; padding: 0; list-style: none; }
.hb-srt *, .hb-srt *::before, .hb-srt *::after { box-sizing: border-box; font-family: inherit; }
.hb-srt-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  height: 42px;
  padding: 0 12px 0 6px;
  border: 1px solid #222222;
  border-radius: 11px;
  background: #131313;
  user-select: none;
  -webkit-user-select: none;
  outline: 0;
  transition: background-color .15s ease, border-color .15s ease, box-shadow .2s ease;
}
.hb-srt-row:hover { background: #171717; border-color: #2c2c2c; }
.hb-srt-row:focus-visible { border-color: color-mix(in srgb, var(--hb-srt-accent) 85%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-srt-accent) 22%, transparent); }
.hb-srt[data-busy="true"] .hb-srt-row { transition: transform .22s cubic-bezier(.2, .8, .2, 1), background-color .15s ease, border-color .15s ease, box-shadow .2s ease; }
.hb-srt-row[data-lifted="true"] {
  z-index: 3;
  background: #181d28;
  border-color: color-mix(in srgb, var(--hb-srt-accent) 70%, transparent);
  box-shadow: 0 18px 36px rgba(0, 0, 0, .55), 0 0 0 3px color-mix(in srgb, var(--hb-srt-accent) 18%, transparent);
}
.hb-srt-row[data-lifted="true"][data-following="true"] { transition: background-color .15s ease, border-color .15s ease, box-shadow .2s ease; }
.hb-srt-grip {
  flex: none;
  display: grid;
  place-items: center;
  width: 26px;
  height: 30px;
  border-radius: 7px;
  color: #5a5a5a;
  cursor: grab;
  touch-action: none;
  transition: color .15s ease, background-color .15s ease;
}
.hb-srt-grip svg { width: 12px; height: 16px; }
.hb-srt-row:hover .hb-srt-grip { color: #8f8f8f; }
.hb-srt-grip:hover { background: rgba(255, 255, 255, .06); color: #ededed; }
.hb-srt-row[data-lifted="true"] .hb-srt-grip { cursor: grabbing; color: var(--hb-srt-accent); }
.hb-srt-num { flex: none; width: 20px; font-size: 11px; font-variant-numeric: tabular-nums; color: #6b6b6b; letter-spacing: .02em; }
.hb-srt-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; }
.hb-srt-chip {
  flex: none;
  padding: 1px 9px;
  border-radius: 999px;
  border: 1px solid var(--hb-srt-bd);
  background: var(--hb-srt-bg);
  color: var(--hb-srt-fg);
  font-size: 11px;
  font-weight: 500;
}
.hb-srt-chip[data-tone="neutral"] { --hb-srt-bd: #2a2a2a; --hb-srt-bg: #181818; --hb-srt-fg: #a1a1a1; }
.hb-srt-chip[data-tone="blue"] { --hb-srt-bd: rgba(47, 123, 255, .35); --hb-srt-bg: rgba(47, 123, 255, .12); --hb-srt-fg: #7fb3ff; }
.hb-srt-chip[data-tone="green"] { --hb-srt-bd: rgba(62, 207, 142, .32); --hb-srt-bg: rgba(62, 207, 142, .11); --hb-srt-fg: #5fdca6; }
.hb-srt-chip[data-tone="amber"] { --hb-srt-bd: rgba(245, 165, 36, .32); --hb-srt-bg: rgba(245, 165, 36, .11); --hb-srt-fg: #f5b84a; }
.hb-srt-chip[data-tone="red"] { --hb-srt-bd: rgba(255, 107, 107, .32); --hb-srt-bg: rgba(255, 107, 107, .11); --hb-srt-fg: #ff8484; }
.hb-srt-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 260px) {
  .hb-srt-num { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-srt-row, .hb-srt-grip { transition: none !important; }
}
`;

function moveItem<T>(list: T[], from: number, to: number) {
  const next = list.slice();
  const [picked] = next.splice(from, 1);
  next.splice(to, 0, picked);
  return next;
}

interface DragState {
  id: string;
  step: number;
  from: number;
  to: number;
  dy: number;
  settling: boolean;
}

interface GrabState {
  id: string;
  from: number;
  snapshot: SortableItem[];
}

export function SortableList({
  items = defaultTasks,
  label = "Sortable list",
  accent = "#2f7bff",
  onReorder,
  className = "",
  style,
  ...rest
}: SortableListProps) {
  const uid = React.useId();
  const sourceKey = items.map((item) => item.id).join("|");
  const [seenKey, setSeenKey] = React.useState(sourceKey);
  const [list, setList] = React.useState<SortableItem[]>(items);
  const [drag, setDrag] = React.useState<DragState | null>(null);
  const [grab, setGrab] = React.useState<GrabState | null>(null);
  const [focusId, setFocusId] = React.useState<string>(items[0]?.id ?? "");
  const [message, setMessage] = React.useState("");
  const rows = React.useRef(new Map<string, HTMLLIElement>());
  const before = React.useRef<Map<string, DOMRect> | null>(null);
  const moving = React.useRef(false);
  const session = React.useRef<{ id: string; from: number; startY: number; step: number; count: number } | null>(null);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  if (seenKey !== sourceKey) {
    setSeenKey(sourceKey);
    setList(items);
  }

  React.useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  React.useLayoutEffect(() => {
    const first = before.current;
    before.current = null;
    if (!first) return;
    rows.current.get(focusId)?.focus({ preventScroll: true });
    moving.current = false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    rows.current.forEach((el, id) => {
      const from = first.get(id);
      if (!from) return;
      const to = el.getBoundingClientRect();
      const dy = from.top - to.top;
      if (!dy) return;
      el.animate(
        [{ transform: `translateY(${dy.toFixed(1)}px)` }, { transform: "none" }],
        { duration: 240, easing: "cubic-bezier(.2, .8, .2, 1)" },
      );
    });
  }, [list, grab, focusId]);

  const finishDrop = (id: string, from: number, to: number) => {
    const next = from === to ? list : moveItem(list, from, to);
    setList(next);
    setDrag(null);
    const title = list[from]?.title ?? "";
    setMessage(from === to ? `${title} dropped, position unchanged` : `${title} dropped at position ${to + 1} of ${list.length}`);
    if (from !== to) onReorder?.(next, from, to);
  };

  const onGripDown = (event: React.PointerEvent<HTMLSpanElement>, id: string, index: number) => {
    if (event.button !== 0 || grab) return;
    const row = rows.current.get(id);
    const parent = row?.parentElement;
    if (!row || !parent) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const gap = parseFloat(getComputedStyle(parent).rowGap) || 0;
    session.current = { id, from: index, startY: event.clientY, step: row.offsetHeight + gap, count: list.length };
    setFocusId(id);
    row.focus({ preventScroll: true });
    setDrag({ id, step: session.current.step, from: index, to: index, dy: 0, settling: false });
    setMessage(`Picked up ${list[index].title}`);
  };

  const onGripMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const s = session.current;
    if (!s) return;
    const dy = Math.max(-s.from * s.step, Math.min((s.count - 1 - s.from) * s.step, event.clientY - s.startY));
    const to = Math.max(0, Math.min(s.count - 1, s.from + Math.round(dy / s.step)));
    setDrag((prev) => (prev && !prev.settling ? { ...prev, dy, to } : prev));
  };

  const onGripUp = (event: React.PointerEvent<HTMLSpanElement>, cancel: boolean) => {
    const s = session.current;
    if (!s) return;
    session.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const current = drag;
    if (!current) return;
    const to = cancel ? s.from : current.to;
    setDrag({ ...current, to, dy: (to - s.from) * s.step, settling: true });
    const t = setTimeout(() => finishDrop(s.id, s.from, to), 210);
    timers.current.push(t);
  };

  const capture = () => {
    const snapshot = new Map<string, DOMRect>();
    rows.current.forEach((el, id) => snapshot.set(id, el.getBoundingClientRect()));
    before.current = snapshot;
    moving.current = true;
  };

  const onRowKey = (event: React.KeyboardEvent<HTMLLIElement>, id: string, index: number) => {
    if (drag || event.target !== event.currentTarget) return;
    const key = event.key;
    if (key === " " || key === "Spacebar") {
      event.preventDefault();
      if (!grab) {
        setGrab({ id, from: index, snapshot: list });
        setMessage(`Picked up ${list[index].title}. Position ${index + 1} of ${list.length}. Use the arrow keys to move, Space to drop, Escape to cancel.`);
      } else {
        const origin = grab.from;
        setGrab(null);
        setMessage(
          origin === index
            ? `${list[index].title} dropped, position unchanged`
            : `${list[index].title} dropped at position ${index + 1} of ${list.length}`,
        );
        if (origin !== index) onReorder?.(list, origin, index);
      }
    } else if (key === "ArrowUp" || key === "ArrowDown") {
      event.preventDefault();
      const delta = key === "ArrowUp" ? -1 : 1;
      const target = index + delta;
      if (target < 0 || target >= list.length) return;
      if (grab && grab.id === id) {
        capture();
        setList(moveItem(list, index, target));
        setMessage(`${list[index].title} moved to position ${target + 1} of ${list.length}`);
      } else if (!grab) {
        rows.current.get(list[target].id)?.focus();
      }
    } else if (key === "Escape" && grab && grab.id === id) {
      event.preventDefault();
      capture();
      setList(grab.snapshot);
      setGrab(null);
      setMessage(`Reorder cancelled. ${list[index].title} returned to position ${grab.from + 1}`);
    }
  };

  const onRowBlur = (id: string, index: number) => {
    if (!grab || grab.id !== id || moving.current) return;
    const origin = grab.from;
    setGrab(null);
    setMessage(`${list[index].title} dropped at position ${index + 1} of ${list.length}`);
    if (origin !== index) onReorder?.(list, origin, index);
  };

  const vars = { "--hb-srt-accent": accent, ...style } as React.CSSProperties;
  return (
    <div className={`hb-srt ${className}`} style={vars} data-busy={drag !== null} {...rest}>
      <style href="hb-sortable-list" precedence="default">{css}</style>
      <span className="hb-srt-sr" id={`${uid}-help`}>
        Focus an item and press Space to pick it up. Use the arrow keys to move it, Space to drop, Escape to cancel.
      </span>
      <ul className="hb-srt-list" aria-label={label}>
      {list.map((item, index) => {
        const lifted = (drag && drag.id === item.id) || (grab && grab.id === item.id);
        let transform: string | undefined;
        if (drag) {
          if (drag.id === item.id) {
            transform = `translateY(${drag.dy.toFixed(1)}px) scale(${drag.settling ? 1 : 1.02})`;
          } else if (drag.to > drag.from && index > drag.from && index <= drag.to) {
            transform = `translateY(${(-drag.step).toFixed(1)}px)`;
          } else if (drag.to < drag.from && index >= drag.to && index < drag.from) {
            transform = `translateY(${drag.step.toFixed(1)}px)`;
          }
        } else if (grab && grab.id === item.id) {
          transform = "scale(1.02)";
        }
        return (
          <li
            key={item.id}
            ref={(el) => {
              if (el) rows.current.set(item.id, el);
              else rows.current.delete(item.id);
            }}
            className="hb-srt-row"
            tabIndex={item.id === focusId || (focusId === "" && index === 0) ? 0 : -1}
            aria-roledescription="sortable item"
            aria-describedby={`${uid}-help`}
            aria-label={`${item.title}${item.meta ? `, ${item.meta}` : ""}, ${index + 1} of ${list.length}${grab && grab.id === item.id ? ", grabbed" : ""}`}
            data-lifted={!!lifted}
            data-following={!!drag && drag.id === item.id && !drag.settling}
            style={transform ? { transform } : undefined}
            onFocus={(event) => {
              if (event.target === event.currentTarget) setFocusId(item.id);
            }}
            onKeyDown={(event) => onRowKey(event, item.id, index)}
            onBlur={(event) => {
              if (event.target === event.currentTarget) onRowBlur(item.id, index);
            }}
          >
            <span
              className="hb-srt-grip"
              aria-hidden="true"
              onPointerDown={(event) => onGripDown(event, item.id, index)}
              onPointerMove={onGripMove}
              onPointerUp={(event) => onGripUp(event, false)}
              onPointerCancel={(event) => onGripUp(event, true)}
            >
              <svg viewBox="0 0 12 16" fill="currentColor">
                <circle cx="3.5" cy="3" r="1.3" />
                <circle cx="8.5" cy="3" r="1.3" />
                <circle cx="3.5" cy="8" r="1.3" />
                <circle cx="8.5" cy="8" r="1.3" />
                <circle cx="3.5" cy="13" r="1.3" />
                <circle cx="8.5" cy="13" r="1.3" />
              </svg>
            </span>
            <span className="hb-srt-num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="hb-srt-title">{item.title}</span>
            {item.meta && (
              <span className="hb-srt-chip" data-tone={item.tone ?? "neutral"}>
                {item.meta}
              </span>
            )}
          </li>
        );
      })}
      </ul>
      <span className="hb-srt-sr" role="status" aria-live="assertive">
        {message}
      </span>
    </div>
  );
}
