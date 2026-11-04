"use client";

import * as React from "react";

export interface TodoItem {
  id: string;
  text: string;
  done?: boolean;
}

export interface ListTodoAnimatedProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  items?: TodoItem[];
  defaultItems?: TodoItem[];
  onChange?: (items: TodoItem[]) => void;
  placeholder?: string;
  maxHeight?: number;
  autoDemo?: number;
  accent?: string;
}

const seed: TodoItem[] = [
  { id: "d1", text: "Review the pricing page copy" },
  { id: "d2", text: "Send invoice to Northwind", done: true },
  { id: "d3", text: "Book flights for the offsite" },
];

const css = `
.hb-za6 {
  --hb-za6-c: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-za6 *, .hb-za6 *::before, .hb-za6 *::after { box-sizing: border-box; }
.hb-za6-add {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 4px 0 12px;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hb-za6-add:focus-within { border-color: var(--hb-za6-c); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-za6-c) 22%, transparent); }
.hb-za6-input {
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  padding: 0;
  font: inherit;
  font-size: 13px;
  color: #ededed;
  background: transparent;
  border: 0;
  outline: none;
}
.hb-za6-input::placeholder { color: #6f6f6f; }
.hb-za6-go {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  color: #0a0a0a;
  background: #ededed;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease;
}
.hb-za6-go:hover { background: #ffffff; }
.hb-za6-go:active { transform: scale(0.92); }
.hb-za6-go:disabled { opacity: 0.35; cursor: default; }
.hb-za6-go:focus-visible { outline: 2px solid var(--hb-za6-c); outline-offset: 2px; }
.hb-za6-go svg { width: 14px; height: 14px; }
.hb-za6-list {
  position: relative;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: #333333 transparent;
}
.hb-za6-item {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: 1fr;
  border-radius: 8px;
  transition: grid-template-rows 0.34s cubic-bezier(0.22, 0.9, 0.24, 1), opacity 0.28s ease;
  animation: hb-za6-in 0.38s cubic-bezier(0.22, 0.9, 0.24, 1) backwards;
}
.hb-za6-item[data-leaving="true"] { grid-template-rows: 0fr; opacity: 0; pointer-events: none; }
.hb-za6-inner { min-height: 0; overflow: hidden; }
.hb-za6-row {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 4px 0 6px;
  border-radius: 8px;
  transition: background 0.2s ease;
}
.hb-za6-row:hover, .hb-za6-row:focus-within { background: rgba(255, 255, 255, 0.04); }
.hb-za6-check {
  position: relative;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  color: #0a0a0a;
  background: transparent;
  border: 1.5px solid #4a4a4a;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-za6-check:hover { border-color: #7a7a7a; }
.hb-za6-check:active { transform: scale(0.88); }
.hb-za6-check:focus-visible { outline: 2px solid var(--hb-za6-c); outline-offset: 2px; }
.hb-za6-check[aria-checked="true"] { background: var(--hb-za6-c); border-color: var(--hb-za6-c); }
.hb-za6-check svg { width: 12px; height: 12px; overflow: visible; }
.hb-za6-check path {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16;
  stroke-dashoffset: 16;
  transition: stroke-dashoffset 0.3s cubic-bezier(0.5, 0, 0.2, 1);
}
.hb-za6-check[aria-checked="true"] path { stroke-dashoffset: 0; transition-delay: 0.08s; }
.hb-za6-label { flex: 1 1 auto; min-width: 0; font-size: 13px; line-height: 1.2; }
.hb-za6-text {
  position: relative;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #ededed;
  transition: color 0.3s ease;
}
.hb-za6-text::after {
  content: "";
  position: absolute;
  left: 0;
  top: 52%;
  width: 100%;
  height: 1.5px;
  background: #8f8f8f;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.34s cubic-bezier(0.5, 0, 0.2, 1);
}
.hb-za6-row[data-done="true"] .hb-za6-text { color: #6f6f6f; }
.hb-za6-row[data-done="true"] .hb-za6-text::after { transform: scaleX(1); }
.hb-za6-tools { display: flex; flex: 0 0 auto; align-items: center; gap: 1px; opacity: 0.45; transition: opacity 0.2s ease; }
.hb-za6-row:hover .hb-za6-tools, .hb-za6-row:focus-within .hb-za6-tools { opacity: 1; }
.hb-za6-tool {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  color: #9a9a9a;
  background: transparent;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}
.hb-za6-tool:hover:not(:disabled) { background: #262626; color: #ededed; }
.hb-za6-tool[data-kind="delete"]:hover:not(:disabled) { color: #ff6b6b; }
.hb-za6-tool:focus-visible { outline: 2px solid var(--hb-za6-c); outline-offset: 1px; }
.hb-za6-tool:disabled { opacity: 0.25; cursor: default; }
.hb-za6-tool svg { width: 13px; height: 13px; }
.hb-za6-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 8px; padding: 0 2px; font-size: 12px; color: #8f8f8f; }
.hb-za6-left { display: inline-flex; align-items: center; gap: 8px; font-variant-numeric: tabular-nums; }
.hb-za6-left b { display: inline-block; font-weight: 600; color: #ededed; animation: hb-za6-tick 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-za6-meter { width: 44px; height: 3px; overflow: hidden; background: #262626; border-radius: 999px; }
.hb-za6-meter span { display: block; height: 100%; background: var(--hb-za6-c); border-radius: inherit; transform-origin: left center; transform: scaleX(var(--hb-za6-p, 0)); transition: transform 0.4s cubic-bezier(0.22, 0.9, 0.24, 1); }
.hb-za6-clear {
  margin: 0;
  padding: 2px 6px;
  font: inherit;
  font-size: 12px;
  color: #a1a1a1;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}
.hb-za6-clear:hover { color: #ededed; background: #1c1c1c; }
.hb-za6-clear:focus-visible { outline: 2px solid var(--hb-za6-c); outline-offset: 1px; }
.hb-za6-empty { padding: 14px 0; font-size: 12px; text-align: center; color: #6f6f6f; }
@keyframes hb-za6-in {
  from { grid-template-rows: 0fr; opacity: 0; }
  to { grid-template-rows: 1fr; opacity: 1; }
}
@keyframes hb-za6-tick {
  from { opacity: 0; transform: translateY(-6px) scale(0.8); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-za6-item, .hb-za6-check, .hb-za6-check path, .hb-za6-text::after, .hb-za6-meter span { transition: none; animation: none; }
  .hb-za6-left b { animation: none; }
}
`;

export function ListTodoAnimated({
  items,
  defaultItems,
  onChange,
  placeholder = "Add a task and press Enter",
  maxHeight,
  autoDemo = 0,
  accent = "#2f7bff",
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: ListTodoAnimatedProps) {
  const controlled = items !== undefined;
  const [inner, setInner] = React.useState<TodoItem[]>(defaultItems ?? seed);
  const list = controlled ? items : inner;
  const [draft, setDraft] = React.useState("");
  const [leaving, setLeaving] = React.useState<Record<string, true>>({});
  const [busy, setBusy] = React.useState(false);
  const els = React.useRef(new Map<string, HTMLLIElement>());
  const before = React.useRef<{ tops: Map<string, number>; id: string; kind: "up" | "down" } | null>(null);
  const counter = React.useRef(0);
  const timers = React.useRef<number[]>([]);
  const latest = React.useRef({ list, onChange, controlled });
  const inputId = React.useId();

  React.useEffect(() => {
    latest.current = { list, onChange, controlled };
  }, [list, onChange, controlled]);

  React.useEffect(() => {
    const ids = timers.current;
    return () => ids.forEach((t) => window.clearTimeout(t));
  }, []);

  const commit = React.useCallback((next: TodoItem[]) => {
    latest.current.list = next;
    if (!latest.current.controlled) setInner(next);
    latest.current.onChange?.(next);
  }, []);

  React.useLayoutEffect(() => {
    const snap = before.current;
    if (!snap) return;
    before.current = null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    els.current.forEach((el, id) => {
      const from = snap.tops.get(id);
      if (from === undefined || reduce) return;
      const delta = from - el.getBoundingClientRect().top;
      if (Math.abs(delta) < 1) return;
      const moved = id === snap.id;
      el.animate(
        [
          {
            transform: `translateY(${delta.toFixed(2)}px) scale(${moved ? 1.02 : 1})`,
            zIndex: moved ? 3 : 1,
            background: moved ? "#1d1d1d" : "transparent",
          },
          { transform: "translateY(0) scale(1)", zIndex: moved ? 3 : 1, background: "transparent" },
        ],
        { duration: 420, easing: "cubic-bezier(0.22, 0.9, 0.24, 1)" },
      );
    });
    const el = els.current.get(snap.id);
    if (el) {
      const first = el.querySelector<HTMLButtonElement>(`[data-move="${snap.kind}"]`);
      const other = el.querySelector<HTMLButtonElement>(`[data-move="${snap.kind === "up" ? "down" : "up"}"]`);
      (first && !first.disabled ? first : other)?.focus({ preventScroll: true });
    }
  }, [list]);

  const live = list.filter((t) => !leaving[t.id]);
  const left = live.filter((t) => !t.done).length;
  const doneCount = live.length - left;

  function add() {
    const text = draft.trim();
    if (!text) return;
    counter.current += 1;
    commit([{ id: `n${counter.current}-${list.length}`, text, done: false }, ...latest.current.list]);
    setDraft("");
  }

  function toggle(id: string) {
    commit(latest.current.list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeMany(ids: string[]) {
    if (!ids.length) return;
    setLeaving((prev) => {
      const copy = { ...prev };
      ids.forEach((id) => {
        copy[id] = true;
      });
      return copy;
    });
    const t = window.setTimeout(() => {
      commit(latest.current.list.filter((x) => !ids.includes(x.id)));
      setLeaving((prev) => {
        const copy = { ...prev };
        ids.forEach((id) => {
          delete copy[id];
        });
        return copy;
      });
    }, 360);
    timers.current.push(t);
  }

  function move(id: string, dir: -1 | 1) {
    const cur = latest.current.list;
    const i = cur.findIndex((t) => t.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= cur.length) return;
    const tops = new Map<string, number>();
    els.current.forEach((el, key) => tops.set(key, el.getBoundingClientRect().top));
    before.current = { tops, id, kind: dir < 0 ? "up" : "down" };
    const next = cur.slice();
    [next[i], next[j]] = [next[j], next[i]];
    commit(next);
  }

  function clearDone() {
    removeMany(latest.current.list.filter((t) => t.done && !leaving[t.id]).map((t) => t.id));
  }

  React.useEffect(() => {
    if (!autoDemo || busy) return;
    const id = window.setInterval(() => {
      const cur = latest.current.list;
      if (!cur.length) return;
      const open = cur.filter((t) => !t.done);
      const target = open.length ? open[0] : cur[cur.length - 1];
      commit(cur.map((t) => (t.id === target.id ? { ...t, done: !t.done } : t)));
    }, autoDemo);
    return () => window.clearInterval(id);
  }, [autoDemo, busy, commit]);

  const vars = {
    "--hb-za6-c": accent,
    "--hb-za6-p": live.length ? (doneCount / live.length).toFixed(4) : "0",
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={`hb-za6 ${className}`}
      style={vars}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        setBusy(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setBusy(false);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        setBusy(true);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        setBusy(false);
      }}
      {...rest}
    >
      <style href="hb-list-todo-animated" precedence="default">{css}</style>
      <div className="hb-za6-add">
        <input
          id={inputId}
          className="hb-za6-input"
          value={draft}
          placeholder={placeholder}
          aria-label="New task"
          autoComplete="off"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault();
              add();
            }
          }}
        />
        <button type="button" className="hb-za6-go" aria-label="Add task" disabled={!draft.trim()} onClick={add}>
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 2.5v9M2.5 7h9" />
          </svg>
        </button>
      </div>
      <ul className="hb-za6-list" style={maxHeight ? { maxHeight } : undefined} aria-label="Tasks">
        {list.map((t, i) => {
          const gone = Boolean(leaving[t.id]);
          return (
            <li
              key={t.id}
              ref={(el) => {
                if (el) els.current.set(t.id, el);
                else els.current.delete(t.id);
              }}
              className="hb-za6-item"
              data-leaving={gone}
            >
              <div className="hb-za6-inner">
                <div className="hb-za6-row" data-done={Boolean(t.done)}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={Boolean(t.done)}
                    aria-label={t.text}
                    className="hb-za6-check"
                    tabIndex={gone ? -1 : 0}
                    onClick={() => toggle(t.id)}
                  >
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="m2.2 6.4 2.5 2.5 5-5.6" />
                    </svg>
                  </button>
                  <span className="hb-za6-label">
                    <span className="hb-za6-text">{t.text}</span>
                  </span>
                  <span className="hb-za6-tools">
                    <button
                      type="button"
                      className="hb-za6-tool"
                      data-move="up"
                      aria-label={`Move ${t.text} up`}
                      disabled={i === 0 || gone}
                      tabIndex={gone ? -1 : 0}
                      onClick={() => move(t.id, -1)}
                    >
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m3 8.5 4-4 4 4" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="hb-za6-tool"
                      data-move="down"
                      aria-label={`Move ${t.text} down`}
                      disabled={i === list.length - 1 || gone}
                      tabIndex={gone ? -1 : 0}
                      onClick={() => move(t.id, 1)}
                    >
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m3 5.5 4 4 4-4" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="hb-za6-tool"
                      data-kind="delete"
                      aria-label={`Delete ${t.text}`}
                      tabIndex={gone ? -1 : 0}
                      onClick={() => removeMany([t.id])}
                    >
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                        <path d="m3.5 3.5 7 7M10.5 3.5l-7 7" />
                      </svg>
                    </button>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {live.length === 0 ? <div className="hb-za6-empty">Nothing left to do</div> : null}
      <div className="hb-za6-foot">
        <span className="hb-za6-left" role="status" aria-live="polite">
          <b key={left}>{left}</b>
          <span>{left === 1 ? "task left" : "tasks left"}</span>
          <span className="hb-za6-meter" aria-hidden="true">
            <span />
          </span>
        </span>
        {doneCount > 0 ? (
          <button type="button" className="hb-za6-clear" onClick={clearDone}>
            Clear done
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
