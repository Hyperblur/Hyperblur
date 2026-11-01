"use client";

import * as React from "react";

export interface KanbanCard {
  id: string;
  title: string;
  tag?: string;
  tone?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export interface KanbanBoardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  columns: KanbanColumn[];
  onChange?: (columns: KanbanColumn[]) => void;
  newCardLabel?: string;
  color?: string;
}

const css = `
.hb-kb {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 2px;
  overflow-x: auto;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: 12px;
  line-height: 16px;
  scrollbar-width: thin;
  scrollbar-color: #2a2a2a transparent;
  --hb-kb-accent: #2f7bff;
}
.hb-kb[data-dragging="true"], .hb-kb[data-dragging="true"] * { cursor: grabbing !important; }
.hb-kb-cols { display: flex; align-items: flex-start; gap: 12px; }
.hb-kb-col {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 6px;
  box-sizing: border-box;
  min-width: var(--hb-kb-minw, 140px);
  padding: 6px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #111111;
}
.hb-kb-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 0 2px; }
.hb-kb-title { overflow: hidden; font-size: 12px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-kb-count {
  flex: none;
  min-width: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: #1f1f1f;
  color: #8f8f8f;
  font-size: 11px;
  line-height: 18px;
  text-align: center;
}
.hb-kb-cards { display: flex; flex-direction: column; gap: 6px; min-height: 8px; margin: 0; padding: 0; list-style: none; }
.hb-kb-card {
  position: relative;
  box-sizing: border-box;
  padding: 5px 8px;
  border: 1px solid #262626;
  border-radius: 8px;
  background: #171717;
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  transition: border-color .15s ease, background-color .15s ease;
}
.hb-kb-card:hover { border-color: #333333; background: #1a1a1a; }
.hb-kb-card:focus-visible { outline: 2px solid var(--hb-kb-accent); outline-offset: 1px; }
.hb-kb-card[data-fresh="true"] { animation: hb-kb-in .35s cubic-bezier(.2, .9, .2, 1) both; }
.hb-kb-text {
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: anywhere;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.hb-kb-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  color: #8f8f8f;
  font-size: 11px;
  line-height: 14px;
}
.hb-kb-tag::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--hb-kb-tone, #8f8f8f);
}
.hb-kb-ph {
  box-sizing: border-box;
  border: 1px dashed var(--hb-kb-accent);
  border-radius: 8px;
  background: rgba(47, 123, 255, .08);
  background: color-mix(in srgb, var(--hb-kb-accent) 10%, transparent);
}
.hb-kb-add {
  display: flex;
  align-items: center;
  gap: 6px;
  box-sizing: border-box;
  width: 100%;
  height: 24px;
  margin: 0;
  padding: 0 6px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-kb-add:hover { background: #1f1f1f; color: #ededed; }
.hb-kb-add:focus-visible { outline: 2px solid var(--hb-kb-accent); outline-offset: 1px; }
.hb-kb-add svg { flex: none; width: 12px; height: 12px; }
.hb-kb-ghost { position: fixed; top: 0; left: 0; z-index: 1000; pointer-events: none; will-change: transform; }
.hb-kb-ghost-in {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-color: var(--hb-kb-accent);
  background: #1f1f1f;
  box-shadow: 0 14px 36px rgba(0, 0, 0, .55);
  transform: rotate(2.5deg) scale(1.03);
  transition: transform .18s cubic-bezier(.2, .9, .2, 1), box-shadow .18s ease;
  animation: hb-kb-lift .18s cubic-bezier(.2, .9, .2, 1) both;
}
.hb-kb-ghost[data-drop="true"] .hb-kb-ghost-in { transform: none; box-shadow: 0 2px 8px rgba(0, 0, 0, .3); animation: none; }
.hb-kb-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-kb-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0) scale(.96); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes hb-kb-lift {
  from { transform: rotate(0) scale(1); box-shadow: 0 2px 8px rgba(0, 0, 0, .3); }
  to { transform: rotate(2.5deg) scale(1.03); box-shadow: 0 14px 36px rgba(0, 0, 0, .55); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kb-card, .hb-kb-add, .hb-kb-ghost-in { transition: none; }
  .hb-kb-card[data-fresh="true"], .hb-kb-ghost-in { animation: none; }
  .hb-kb-ghost-in { transform: none; }
}
`;

interface DragState {
  id: string;
  card: KanbanCard;
  w: number;
  h: number;
  col: string;
  index: number;
}

interface DragRef {
  id: string;
  pointerId: number;
  sx: number;
  sy: number;
  ox: number;
  oy: number;
  w: number;
  h: number;
  x: number;
  y: number;
  active: boolean;
  col: string;
  index: number;
}

type Entry = { kind: "card"; card: KanbanCard } | { kind: "ph" };

function relocate(cols: KanbanColumn[], id: string, toCol: string, toIndex: number): KanbanColumn[] {
  const source = cols.find((c) => c.cards.some((x) => x.id === id));
  const card = source?.cards.find((x) => x.id === id);
  if (!card) return cols;
  return cols.map((c) => {
    const list = c.cards.filter((x) => x.id !== id);
    if (c.id !== toCol) return list.length === c.cards.length ? c : { ...c, cards: list };
    list.splice(Math.max(0, Math.min(toIndex, list.length)), 0, card);
    return { ...c, cards: list };
  });
}

function signature(cols: KanbanColumn[]) {
  return JSON.stringify(cols);
}

function CardBody({ card }: { card: KanbanCard }) {
  return (
    <>
      <span className="hb-kb-text">{card.title}</span>
      {card.tag ? (
        <span className="hb-kb-tag" style={card.tone ? ({ "--hb-kb-tone": card.tone } as React.CSSProperties) : undefined}>
          {card.tag}
        </span>
      ) : null}
    </>
  );
}

export function KanbanBoard({
  columns,
  onChange,
  newCardLabel = "New card",
  color = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: KanbanBoardProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const ghostRef = React.useRef<HTMLDivElement>(null);
  const dragRef = React.useRef<DragRef | null>(null);
  const colsRef = React.useRef(columns);
  const positions = React.useRef<Map<string, { x: number; y: number }>>(new Map());
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropping = React.useRef(false);
  const counter = React.useRef(0);
  const focusId = React.useRef<string | null>(null);
  const [cols, setCols] = React.useState(columns);
  const [prevProp, setPrevProp] = React.useState(columns);
  const [drag, setDrag] = React.useState<DragState | null>(null);
  const [fresh, setFresh] = React.useState("");
  const [announce, setAnnounce] = React.useState("");

  if (prevProp !== columns) {
    setPrevProp(columns);
    if (signature(columns) !== signature(cols)) setCols(columns);
  }

  const dragId = drag ? drag.id : null;

  const commit = React.useCallback(
    (next: KanbanColumn[]) => {
      colsRef.current = next;
      setCols(next);
      onChange?.(next);
    },
    [onChange],
  );

  React.useLayoutEffect(() => {
    colsRef.current = cols;
  }, [cols]);

  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const base = root.getBoundingClientRect();
    const next = new Map<string, { x: number; y: number }>();
    root.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
      const id = el.dataset.flip as string;
      const r = el.getBoundingClientRect();
      const x = r.left - base.left + root.scrollLeft;
      const y = r.top - base.top + root.scrollTop;
      next.set(id, { x, y });
      const prev = positions.current.get(id);
      if (!prev || reduce) return;
      const dx = prev.x - x;
      const dy = prev.y - y;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
      el.style.transition = "none";
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      void el.offsetWidth;
      el.style.transition = "transform .24s cubic-bezier(.2, .9, .2, 1), border-color .15s ease, background-color .15s ease";
      el.style.transform = "";
    });
    positions.current = next;
  });

  React.useLayoutEffect(() => {
    const id = focusId.current;
    if (!id) return;
    focusId.current = null;
    const el = Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-card]") ?? []).find((n) => n.dataset.card === id);
    el?.focus();
  }, [cols]);

  const moveGhost = React.useCallback(() => {
    const d = dragRef.current;
    const g = ghostRef.current;
    if (!d || !g || dropping.current) return;
    g.style.transform = `translate3d(${d.x - d.ox}px, ${d.y - d.oy}px, 0)`;
  }, []);

  React.useLayoutEffect(() => {
    if (dragId) moveGhost();
  }, [dragId, moveGhost]);

  const cancel = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    dropping.current = false;
    dragRef.current = null;
    setDrag(null);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  React.useEffect(() => {
    if (!dragId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dragId, cancel]);

  function retarget(x: number, y: number) {
    const root = rootRef.current;
    const d = dragRef.current;
    if (!root || !d) return;
    let best: HTMLElement | null = null;
    let bestDist = Infinity;
    root.querySelectorAll<HTMLElement>("[data-col]").forEach((c) => {
      const r = c.getBoundingClientRect();
      const dx = x < r.left ? r.left - x : x > r.right ? x - r.right : 0;
      if (dx < bestDist) {
        bestDist = dx;
        best = c;
      }
    });
    const target = best as HTMLElement | null;
    if (!target) return;
    const colId = target.dataset.col as string;
    let index = 0;
    target.querySelectorAll<HTMLElement>("[data-card]").forEach((c) => {
      const r = c.getBoundingClientRect();
      if (y > r.top + r.height / 2) index += 1;
    });
    if (d.col === colId && d.index === index) return;
    d.col = colId;
    d.index = index;
    setDrag((prev) => (prev ? { ...prev, col: colId, index } : prev));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (dropping.current || dragRef.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
    if (!el || !rootRef.current?.contains(el)) return;
    const id = el.dataset.card as string;
    const colEl = el.closest<HTMLElement>("[data-col]");
    const colId = colEl?.dataset.col ?? "";
    const col = colsRef.current.find((c) => c.id === colId);
    if (!col) return;
    const rect = el.getBoundingClientRect();
    dragRef.current = {
      id,
      pointerId: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      ox: e.clientX - rect.left,
      oy: e.clientY - rect.top,
      w: rect.width,
      h: rect.height,
      x: e.clientX,
      y: e.clientY,
      active: false,
      col: colId,
      index: col.cards.findIndex((c) => c.id === id),
    };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId || dropping.current) return;
    d.x = e.clientX;
    d.y = e.clientY;
    if (!d.active) {
      if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 4) return;
      const card = colsRef.current.flatMap((c) => c.cards).find((c) => c.id === d.id);
      if (!card) {
        dragRef.current = null;
        return;
      }
      d.active = true;
      rootRef.current?.setPointerCapture(e.pointerId);
      setDrag({ id: d.id, card, w: d.w, h: d.h, col: d.col, index: d.index });
      return;
    }
    moveGhost();
    retarget(e.clientX, e.clientY);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId || dropping.current) return;
    if (!d.active) {
      dragRef.current = null;
      return;
    }
    const { id, col, index } = d;
    const finalize = () => {
      timer.current = null;
      dropping.current = false;
      dragRef.current = null;
      commit(relocate(colsRef.current, id, col, index));
      setDrag(null);
    };
    const reduce = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ph = rootRef.current?.querySelector<HTMLElement>("[data-ph]");
    const ghost = ghostRef.current;
    if (ph && ghost && !reduce) {
      const r = ph.getBoundingClientRect();
      dropping.current = true;
      ghost.dataset.drop = "true";
      ghost.style.transition = "transform .18s cubic-bezier(.2, .9, .2, 1)";
      ghost.style.transform = `translate3d(${r.left}px, ${r.top}px, 0)`;
      timer.current = setTimeout(finalize, 190);
    } else {
      finalize();
    }
  }

  function addCard(colId: string) {
    if (dragRef.current) return;
    let id = "";
    do {
      counter.current += 1;
      id = `${uid}-new-${counter.current}`;
    } while (colsRef.current.some((c) => c.cards.some((x) => x.id === id)));
    const card: KanbanCard = { id, title: newCardLabel };
    setFresh(id);
    commit(colsRef.current.map((c) => (c.id === colId ? { ...c, cards: [...c.cards, card] } : c)));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented || !e.altKey) return;
    const el = e.target as HTMLElement;
    if (!el.dataset || !el.dataset.card) return;
    const dc = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const di = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!dc && !di) return;
    e.preventDefault();
    const id = el.dataset.card;
    const all = colsRef.current;
    const ci = all.findIndex((c) => c.cards.some((x) => x.id === id));
    if (ci < 0) return;
    const ii = all[ci].cards.findIndex((x) => x.id === id);
    const nci = Math.max(0, Math.min(all.length - 1, ci + dc));
    const len = all[nci].cards.length - (nci === ci ? 1 : 0);
    const nii = Math.max(0, Math.min(len, nci === ci ? ii + di : ii));
    if (nci === ci && nii === ii) return;
    focusId.current = id;
    commit(relocate(all, id, all[nci].id, nii));
    setAnnounce(`${all[ci].cards[ii].title} moved to ${all[nci].title}, position ${nii + 1}`);
  }

  const view = cols.map((col) => {
    const list: Entry[] = col.cards
      .filter((c) => !drag || c.id !== drag.id)
      .map((card): Entry => ({ kind: "card", card }));
    if (drag && drag.col === col.id) list.splice(Math.min(drag.index, list.length), 0, { kind: "ph" });
    return { col, list };
  });

  const vars = { "--hb-kb-accent": color, ...style } as React.CSSProperties;
  const hintId = `${uid}-hint`;

  return (
    <div
      ref={rootRef}
      className={`hb-kb ${className}`}
      data-dragging={drag !== null}
      style={vars}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={cancel}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <style href="hb-kanban-board" precedence="default">{css}</style>
      <span id={hintId} className="hb-kb-sr">
        Drag with the pointer, or hold Alt and press the arrow keys to move this card.
      </span>
      <div className="hb-kb-sr" role="status" aria-live="polite">
        {announce}
      </div>
      <div className="hb-kb-cols">
        {view.map(({ col, list }) => (
          <section key={col.id} className="hb-kb-col" role="group" aria-label={col.title} data-col={col.id}>
            <div className="hb-kb-head">
              <span className="hb-kb-title">{col.title}</span>
              <span className="hb-kb-count" aria-label={`${list.length} cards`}>
                {list.length}
              </span>
            </div>
            <ul className="hb-kb-cards">
              {list.map((entry) =>
                entry.kind === "ph" ? (
                  <li key="hb-ph" className="hb-kb-ph" data-ph="true" style={{ height: drag?.h }} aria-hidden="true" />
                ) : (
                  <li
                    key={entry.card.id}
                    className="hb-kb-card"
                    data-card={entry.card.id}
                    data-flip={entry.card.id}
                    data-fresh={fresh === entry.card.id}
                    tabIndex={0}
                    aria-describedby={hintId}
                    onAnimationEnd={() => {
                      if (fresh === entry.card.id) setFresh("");
                    }}
                  >
                    <CardBody card={entry.card} />
                  </li>
                ),
              )}
            </ul>
            <button type="button" className="hb-kb-add" onClick={() => addCard(col.id)}>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 2v8M2 6h8" />
              </svg>
              Add card
            </button>
          </section>
        ))}
      </div>
      {drag ? (
        <div ref={ghostRef} className="hb-kb-ghost" style={{ width: drag.w, height: drag.h }} aria-hidden="true">
          <div className="hb-kb-card hb-kb-ghost-in">
            <CardBody card={drag.card} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
