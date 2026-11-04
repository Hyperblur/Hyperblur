"use client";

import * as React from "react";

export interface StackNotification {
  id: string;
  title: string;
  body?: string;
  time?: string;
  color?: string;
  mark?: string;
}

export interface CardStackExpandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  items?: StackNotification[];
  defaultItems?: StackNotification[];
  onChange?: (items: StackNotification[]) => void;
  incoming?: StackNotification[];
  title?: string;
  max?: number;
  cardHeight?: number;
  gap?: number;
  autoPeek?: number;
  reserveSpace?: boolean;
  accent?: string;
}

const seed: StackNotification[] = [
  { id: "s1", title: "Deploy finished", body: "web-app is live on production", time: "now", color: "#2f7bff", mark: "D" },
  { id: "s2", title: "Maya commented", body: "Can we ship the new pricing page?", time: "4m", color: "#e5584f", mark: "M" },
  { id: "s3", title: "Invoice paid", body: "Northwind sent $1,240.00", time: "1h", color: "#2fa56b", mark: "$" },
  { id: "s4", title: "Weekly digest", body: "12 merged pull requests this week", time: "2h", color: "#9a6bff", mark: "W" },
];

const pool: StackNotification[] = [
  { id: "p1", title: "New signup", body: "ana@fernhill.example joined Team", time: "now", color: "#f0a22e", mark: "N" },
  { id: "p2", title: "Build warning", body: "Bundle grew by 14 kB on /pricing", time: "now", color: "#e5584f", mark: "!" },
  { id: "p3", title: "Review requested", body: "Tomas asked for your review", time: "now", color: "#2f7bff", mark: "R" },
  { id: "p4", title: "Backup complete", body: "Nightly snapshot stored, 2.4 GB", time: "now", color: "#2fa56b", mark: "B" },
];

const css = `
.hb-za4 {
  --hb-za4-c: #2f7bff;
  --hb-za4-h: 52px;
  --hb-za4-g: 8px;
  --hb-za4-p: 9px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-za4 *, .hb-za4 *::before, .hb-za4 *::after { box-sizing: border-box; }
.hb-za4-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
.hb-za4-title { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 13px; font-weight: 600; letter-spacing: -0.01em; }
.hb-za4-count {
  min-width: 20px;
  padding: 1px 6px;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: #ededed;
  background: #262626;
  border-radius: 999px;
  font-variant-numeric: tabular-nums;
}
.hb-za4-tools { display: flex; gap: 6px; }
.hb-za4-tool {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  margin: 0;
  padding: 0 10px;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  color: #d4d4d4;
  background: #171717;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.hb-za4-tool:hover { background: #202020; border-color: #3a3a3a; }
.hb-za4-tool:active { transform: scale(0.96); }
.hb-za4-tool:focus-visible { outline: 2px solid var(--hb-za4-c); outline-offset: 2px; }
.hb-za4-tool svg { width: 12px; height: 12px; }
.hb-za4-stack {
  position: relative;
  height: var(--hb-za4-sh);
  list-style: none;
  margin: 0;
  padding: 0;
  transition: height 0.5s cubic-bezier(0.22, 0.9, 0.24, 1);
}
.hb-za4-item {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: var(--hb-za4-h);
  z-index: calc(100 - var(--hb-za4-k));
  transform-origin: 50% 100%;
  transform: translateY(calc(var(--hb-za4-k) * var(--hb-za4-p))) scale(calc(1 - var(--hb-za4-k) * 0.05));
  transition: transform 0.5s cubic-bezier(0.22, 0.9, 0.24, 1), opacity 0.35s ease;
}
.hb-za4[data-open="true"] .hb-za4-item {
  transform: translateY(calc(var(--hb-za4-k) * (var(--hb-za4-h) + var(--hb-za4-g)))) scale(1);
}
.hb-za4-item[data-hide="true"] { opacity: 0; pointer-events: none; }
.hb-za4-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
  padding: 0 8px 0 10px;
  overflow: hidden;
  background: #151515;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  transform: translateX(var(--hb-za4-dx, 0px));
  transition: transform 0.35s cubic-bezier(0.22, 0.9, 0.24, 1), opacity 0.3s ease;
  animation: hb-za4-in 0.5s cubic-bezier(0.22, 0.9, 0.24, 1) backwards;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}
.hb-za4-item[data-drag="true"] .hb-za4-card { transition: none; }
.hb-za4-item[data-leaving="true"] .hb-za4-card { transform: translateX(calc(var(--hb-za4-dir, 1) * 115%)); opacity: 0; }
.hb-za4-item[data-leaving="true"] { pointer-events: none; }
.hb-za4[data-open="true"] .hb-za4-card { cursor: grab; }
.hb-za4-body, .hb-za4-mark, .hb-za4-meta { transition: opacity 0.3s ease; }
.hb-za4[data-open="false"] .hb-za4-item:not([data-top="true"]) .hb-za4-card > * { opacity: 0; }
.hb-za4-mark {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 30px;
  height: 30px;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  border-radius: 9px;
}
.hb-za4-body { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.hb-za4-body b { font-size: 13px; font-weight: 600; letter-spacing: -0.005em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-za4-body span { font-size: 12px; color: #9a9a9a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-za4-meta { flex: 0 0 auto; display: flex; align-items: center; gap: 4px; }
.hb-za4-time { font-size: 11px; color: #707070; font-variant-numeric: tabular-nums; }
.hb-za4-x {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  color: #8f8f8f;
  background: transparent;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-za4-x:hover { background: #262626; color: #ededed; }
.hb-za4-x:focus-visible { outline: 2px solid var(--hb-za4-c); outline-offset: 1px; }
.hb-za4-x svg { width: 12px; height: 12px; }
.hb-za4-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: var(--hb-za4-h);
  font-size: 12px;
  color: #8f8f8f;
  border: 1px dashed #2a2a2a;
  border-radius: 12px;
  animation: hb-za4-in 0.5s cubic-bezier(0.22, 0.9, 0.24, 1) backwards;
}
.hb-za4-empty svg { width: 14px; height: 14px; color: var(--hb-za4-c); }
@keyframes hb-za4-in {
  from { opacity: 0; transform: translateY(-18px) scale(0.94); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-za4-stack, .hb-za4-item, .hb-za4-card, .hb-za4-body, .hb-za4-mark, .hb-za4-meta, .hb-za4-tool { transition: none; }
  .hb-za4-card, .hb-za4-empty { animation: none; }
}
`;

export function CardStackExpand({
  items,
  defaultItems,
  onChange,
  incoming,
  title = "Notifications",
  max = 4,
  cardHeight = 52,
  gap = 8,
  autoPeek = 0,
  reserveSpace = false,
  accent = "#2f7bff",
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  onKeyDown,
  ...rest
}: CardStackExpandProps) {
  const controlled = items !== undefined;
  const [inner, setInner] = React.useState<StackNotification[]>(defaultItems ?? seed);
  const list = controlled ? items : inner;
  const queue = incoming && incoming.length ? incoming : pool;
  const [leaving, setLeaving] = React.useState<Record<string, number>>({});
  const [hover, setHover] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [pinned, setPinned] = React.useState(false);
  const [peek, setPeek] = React.useState(false);
  const [drag, setDrag] = React.useState<{ id: string; dx: number } | null>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const timers = React.useRef<number[]>([]);
  const counter = React.useRef(0);
  const down = React.useRef<{ id: string; x: number; pid: number; moved: boolean } | null>(null);
  const latest = React.useRef({ list, onChange, controlled });
  const stackId = React.useId();

  React.useEffect(() => {
    latest.current = { list, onChange, controlled };
  }, [list, onChange, controlled]);

  React.useEffect(() => {
    const ids = timers.current;
    return () => ids.forEach((t) => window.clearTimeout(t));
  }, []);

  const open = hover || focused || pinned || peek;
  const interacting = hover || focused || pinned;

  React.useEffect(() => {
    if (!autoPeek || interacting) return;
    let id = 0;
    function wait() {
      id = window.setTimeout(() => {
        setPeek(true);
        id = window.setTimeout(() => {
          setPeek(false);
          wait();
        }, 2000);
      }, autoPeek);
    }
    wait();
    return () => {
      window.clearTimeout(id);
      setPeek(false);
    };
  }, [autoPeek, interacting]);

  React.useEffect(() => {
    if (!pinned) return;
    function away(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setPinned(false);
    }
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [pinned]);

  function commit(next: StackNotification[]) {
    if (!latest.current.controlled) setInner(next);
    latest.current.onChange?.(next);
  }

  function dismiss(id: string, dir: number) {
    setLeaving((prev) => (prev[id] ? prev : { ...prev, [id]: dir }));
    const t = window.setTimeout(() => {
      commit(latest.current.list.filter((n) => n.id !== id));
      setLeaving((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }, 340);
    timers.current.push(t);
  }

  function add() {
    const base = queue[counter.current % queue.length];
    counter.current += 1;
    const fresh = { ...base, id: `${base.id}-${counter.current}` };
    commit([fresh, ...latest.current.list]);
  }

  const live = list.filter((n) => !leaving[n.id]);
  const shown = Math.max(1, Math.min(live.length, open ? max : 3));
  const collapsedHeight = cardHeight + Math.min(Math.max(live.length - 1, 0), 2) * 9;
  const expandedCount = Math.max(1, Math.min(live.length, max));
  const expandedHeight = expandedCount * cardHeight + (expandedCount - 1) * gap;
  const stackHeight = reserveSpace
    ? Math.max(expandedHeight, collapsedHeight)
    : open
      ? expandedHeight
      : collapsedHeight;

  const vars = {
    "--hb-za4-c": accent,
    "--hb-za4-h": `${cardHeight}px`,
    "--hb-za4-g": `${gap}px`,
    "--hb-za4-sh": `${stackHeight}px`,
    ...style,
  } as React.CSSProperties;

  const orders: number[] = [];
  let running = 0;
  list.forEach((n) => {
    orders.push(running);
    if (!leaving[n.id]) running += 1;
  });

  function pointerDown(e: React.PointerEvent<HTMLElement>, id: string) {
    if (!open || (e.pointerType === "mouse" && e.button !== 0)) return;
    if ((e.target as HTMLElement).closest("button")) return;
    down.current = { id, x: e.clientX, pid: e.pointerId, moved: false };
  }

  function pointerMove(e: React.PointerEvent<HTMLElement>) {
    const d = down.current;
    if (!d || d.pid !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 5) return;
    if (!d.moved) e.currentTarget.setPointerCapture(e.pointerId);
    d.moved = true;
    setDrag({ id: d.id, dx });
  }

  function pointerUp(e: React.PointerEvent<HTMLElement>) {
    const d = down.current;
    if (!d || d.pid !== e.pointerId) return;
    down.current = null;
    const dx = drag?.dx ?? 0;
    setDrag(null);
    if (Math.abs(dx) > 80) dismiss(d.id, dx > 0 ? 1 : -1);
  }

  return (
    <div
      ref={rootRef}
      className={`hb-za4 ${className}`}
      style={vars}
      data-open={open}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        if (e.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        if (e.pointerType === "mouse") setHover(false);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        setFocused(true);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Escape") {
          setPinned(false);
          setHover(false);
          setFocused(false);
          (document.activeElement as HTMLElement | null)?.blur();
        }
      }}
      {...rest}
    >
      <style href="hb-card-stack-expand" precedence="default">{css}</style>
      <div className="hb-za4-head">
        <div className="hb-za4-title">
          <span>{title}</span>
          <span className="hb-za4-count" aria-label={`${live.length} notifications`}>{live.length}</span>
        </div>
        <div className="hb-za4-tools">
          <button type="button" className="hb-za4-tool" onClick={add}>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 2v8M2 6h8" />
            </svg>
            New
          </button>
          <button
            type="button"
            className="hb-za4-tool"
            aria-expanded={open}
            aria-controls={stackId}
            onClick={() => setPinned((v) => !v)}
          >
            {open ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>
      {live.length === 0 ? (
        <div className="hb-za4-empty">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m2.5 7.5 3 3 6-6.5" />
          </svg>
          You are all caught up
        </div>
      ) : null}
      <ul
        id={stackId}
        className="hb-za4-stack"
        style={live.length === 0 ? { display: "none" } : undefined}
        onClick={() => {
          if (!open) setPinned(true);
        }}
      >
        {list.map((n, idx) => {
          const isLeaving = Boolean(leaving[n.id]);
          const k = orders[idx];
          const hidden = isLeaving ? false : k >= shown;
          const dragging = drag?.id === n.id;
          const itemStyle = {
            "--hb-za4-k": k,
            "--hb-za4-dir": leaving[n.id] ?? 1,
            "--hb-za4-dx": dragging ? `${drag.dx.toFixed(1)}px` : "0px",
          } as React.CSSProperties;
          return (
            <li
              key={n.id}
              className="hb-za4-item"
              style={itemStyle}
              data-top={k === 0}
              data-hide={hidden}
              data-drag={dragging}
              data-leaving={isLeaving}
              aria-hidden={hidden || (!open && k > 0) ? true : undefined}
              onPointerDown={(e) => pointerDown(e, n.id)}
              onPointerMove={pointerMove}
              onPointerUp={pointerUp}
              onPointerCancel={pointerUp}
            >
              <div className="hb-za4-card">
                <span className="hb-za4-mark" style={{ background: n.color ?? accent }} aria-hidden="true">
                  {n.mark ?? n.title.charAt(0)}
                </span>
                <div className="hb-za4-body">
                  <b>{n.title}</b>
                  {n.body ? <span>{n.body}</span> : null}
                </div>
                <div className="hb-za4-meta">
                  {n.time ? <span className="hb-za4-time">{n.time}</span> : null}
                  <button
                    type="button"
                    className="hb-za4-x"
                    aria-label={`Dismiss ${n.title}`}
                    tabIndex={open && !hidden ? 0 : -1}
                    onClick={(e) => {
                      e.stopPropagation();
                      dismiss(n.id, 1);
                    }}
                  >
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                      <path d="m2.5 2.5 7 7M9.5 2.5l-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
