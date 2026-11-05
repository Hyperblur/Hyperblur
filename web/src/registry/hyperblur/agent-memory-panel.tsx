"use client";

import * as React from "react";

export interface MemoryItem {
  id: string;
  text: string;
  source: string;
  confidence: number;
}

export interface AgentMemoryPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
  items?: MemoryItem[];
  defaultItems?: MemoryItem[];
  onItemsChange?: (items: MemoryItem[]) => void;
  onForget?: (item: MemoryItem) => void;
  onEdit?: (item: MemoryItem) => void;
  title?: string;
  accent?: string;
}

const defaultMemories: MemoryItem[] = [
  { id: "m1", text: "Prefers short answers with the code first.", source: "chat, Mar 3", confidence: 0.94 },
  { id: "m2", text: "Deploys to Vercel from the main branch.", source: "repo scan", confidence: 0.81 },
  { id: "m3", text: "Works in the Lisbon time zone.", source: "inferred", confidence: 0.52 },
  { id: "m4", text: "Uses pnpm, never npm.", source: "chat, Feb 21", confidence: 0.9 },
];

const css = `
.hb-yf3 {
  box-sizing: border-box;
  width: 100%;
  padding: 8px 8px 6px;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.35;
  color: #ededed;
  background: #111111;
  border: 1px solid #262626;
  border-radius: 14px;
  text-align: left;
}
.hb-yf3 *, .hb-yf3 *::before, .hb-yf3 *::after { box-sizing: border-box; font-family: inherit; }
.hb-yf3-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 2px 6px 8px; }
.hb-yf3-title { display: flex; align-items: center; gap: 7px; margin: 0; font-size: 12.5px; font-weight: 600; letter-spacing: -0.005em; }
.hb-yf3-brain { width: 14px; height: 14px; color: var(--hb-yf3-a, #2f7bff); }
.hb-yf3-count { padding: 1px 7px; font-size: 10.5px; font-weight: 500; font-variant-numeric: tabular-nums; color: #a1a1a1; background: #1a1a1a; border: 1px solid #262626; border-radius: 999px; }
.hb-yf3-list { list-style: none; margin: 0; padding: 0; }
.hb-yf3-item { display: grid; grid-template-rows: 1fr; transition: grid-template-rows 0.28s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.22s ease, transform 0.28s ease; }
.hb-yf3-item[data-leaving="true"] { grid-template-rows: 0fr; opacity: 0; transform: translateX(14px); pointer-events: none; }
.hb-yf3-clip { min-height: 0; overflow: hidden; }
.hb-yf3-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin: 0 0 2px;
  padding: 5px 6px 5px 10px;
  border-radius: 10px;
  transition: background-color 0.15s ease;
}
.hb-yf3-card:hover, .hb-yf3-card:focus-within { background: #171717; }
.hb-yf3-body { flex: 1; min-width: 0; }
.hb-yf3-text { margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; color: #ededed; }
.hb-yf3-meta { display: flex; align-items: center; gap: 8px; margin-top: 3px; }
.hb-yf3-chip { display: inline-flex; align-items: center; gap: 5px; min-width: 0; padding: 1px 7px 1px 5px; font-size: 10.5px; color: #a1a1a1; background: #1a1a1a; border: 1px solid #262626; border-radius: 999px; white-space: nowrap; }
.hb-yf3-dot { flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-yf3-h, #7fb3ff); }
.hb-yf3-conf { display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; font-variant-numeric: tabular-nums; color: #8f8f8f; }
.hb-yf3-track { position: relative; width: 34px; height: 4px; overflow: hidden; background: #242424; border-radius: 4px; }
.hb-yf3-bar { display: block; height: 100%; border-radius: 4px; background: var(--hb-yf3-c, #3ecf8e); transform-origin: left center; animation: hb-yf3-grow 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-delay: calc(var(--hb-yf3-i, 0) * 80ms); }
.hb-yf3-actions { display: flex; flex: none; gap: 2px; opacity: 0.5; transition: opacity 0.15s ease; }
.hb-yf3-card:hover .hb-yf3-actions, .hb-yf3-card:focus-within .hb-yf3-actions { opacity: 1; }
.hb-yf3-btn { display: grid; place-items: center; width: 24px; height: 24px; margin: 0; padding: 0; color: #a1a1a1; background: transparent; border: 0; border-radius: 7px; cursor: pointer; transition: background-color 0.15s ease, color 0.15s ease; }
.hb-yf3-btn svg { width: 13px; height: 13px; }
.hb-yf3-btn:hover { color: #ededed; background: rgba(255, 255, 255, 0.08); }
.hb-yf3-btn[data-kind="forget"]:hover { color: #ff7a7a; background: rgba(255, 93, 93, 0.12); }
.hb-yf3-btn[data-kind="save"] { color: #3ecf8e; }
.hb-yf3-btn:focus-visible { outline: 2px solid var(--hb-yf3-a, #2f7bff); outline-offset: 1px; }
.hb-yf3-input { width: 100%; padding: 3px 7px; margin: -3px 0 0 -7px; font: inherit; font-size: 12px; color: #ededed; background: #0a0a0a; border: 1px solid var(--hb-yf3-a, #2f7bff); border-radius: 6px; outline: none; }
.hb-yf3-empty { display: grid; justify-items: center; gap: 6px; padding: 22px 12px; color: #8f8f8f; text-align: center; }
.hb-yf3-empty svg { width: 22px; height: 22px; color: #4a4a4a; }
.hb-yf3-empty p { margin: 0; }
@keyframes hb-yf3-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-yf3-item, .hb-yf3-card, .hb-yf3-actions, .hb-yf3-btn { transition: none; }
  .hb-yf3-bar { animation: none; }
  .hb-yf3-item[data-leaving="true"] { transform: none; }
}
`;

function hueOf(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  }
  return (h >>> 0) % 360;
}

function confColor(c: number) {
  if (c >= 0.8) return "#3ecf8e";
  if (c >= 0.6) return "#7fb3ff";
  return "#f5b544";
}

export function AgentMemoryPanel({
  items,
  defaultItems = defaultMemories,
  onItemsChange,
  onForget,
  onEdit,
  title = "Memory",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: AgentMemoryPanelProps) {
  const [inner, setInner] = React.useState<MemoryItem[]>(defaultItems);
  const [leaving, setLeaving] = React.useState<string[]>([]);
  const [editing, setEditing] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState("");
  const timers = React.useRef<number[]>([]);
  const controlled = items !== undefined;
  const list = controlled ? items : inner;
  const listRef = React.useRef(list);

  React.useEffect(() => {
    listRef.current = list;
  }, [list]);

  React.useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  function commit(next: MemoryItem[]) {
    if (!controlled) setInner(next);
    onItemsChange?.(next);
  }

  function forget(item: MemoryItem) {
    if (leaving.includes(item.id)) return;
    setLeaving((l) => [...l, item.id]);
    if (editing === item.id) setEditing(null);
    const t = window.setTimeout(() => {
      setLeaving((l) => l.filter((id) => id !== item.id));
      commit(listRef.current.filter((m) => m.id !== item.id));
      onForget?.(item);
    }, 300);
    timers.current.push(t);
  }

  function save(item: MemoryItem) {
    const text = draft.trim();
    setEditing(null);
    if (!text || text === item.text) return;
    const updated = { ...item, text, source: "you", confidence: 1 };
    commit(listRef.current.map((m) => (m.id === item.id ? updated : m)));
    onEdit?.(updated);
  }

  const count = list.length - leaving.length;

  return (
    <>
      <style href="hb-agent-memory-panel" precedence="default">{css}</style>
      <div
        className={`hb-yf3 ${className}`}
        style={{ "--hb-yf3-a": accent, ...style } as React.CSSProperties}
        {...rest}
      >
        <div className="hb-yf3-head">
          <h3 className="hb-yf3-title">
            <svg className="hb-yf3-brain" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 2.6a2.2 2.2 0 0 0-2.2 2.2 2.2 2.2 0 0 0-1.4 3.8 2.3 2.3 0 0 0 1.6 3.6A2.1 2.1 0 0 0 6 13.4V2.6zM10 2.6a2.2 2.2 0 0 1 2.2 2.2 2.2 2.2 0 0 1 1.4 3.8 2.3 2.3 0 0 1-1.6 3.6 2.1 2.1 0 0 1-2 1.2V2.6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            {title}
          </h3>
          <span className="hb-yf3-count" aria-live="polite">
            {count} {count === 1 ? "fact" : "facts"}
          </span>
        </div>
        {list.length === 0 ? (
          <div className="hb-yf3-empty">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
            <p>Nothing remembered yet</p>
          </div>
        ) : (
          <ul className="hb-yf3-list">
            {list.map((m, i) => {
              const isEditing = editing === m.id;
              const pct = Math.round(Math.min(1, Math.max(0, m.confidence)) * 100);
              return (
                <li
                  key={m.id}
                  className="hb-yf3-item"
                  data-leaving={leaving.includes(m.id)}
                  style={{ "--hb-yf3-i": i } as React.CSSProperties}
                >
                  <div className="hb-yf3-clip">
                    <div className="hb-yf3-card">
                      <div className="hb-yf3-body">
                        {isEditing ? (
                          <input
                            className="hb-yf3-input"
                            aria-label="Edit memory"
                            value={draft}
                            autoFocus
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") save(m);
                              if (e.key === "Escape") {
                                e.stopPropagation();
                                setEditing(null);
                              }
                            }}
                          />
                        ) : (
                          <p className="hb-yf3-text" title={m.text}>{m.text}</p>
                        )}
                        <div className="hb-yf3-meta">
                          <span className="hb-yf3-chip" style={{ "--hb-yf3-h": `hsl(${hueOf(m.source)} 70% 66%)` } as React.CSSProperties}>
                            <span className="hb-yf3-dot" />
                            {m.source}
                          </span>
                          <span className="hb-yf3-conf" role="img" aria-label={`Confidence ${pct}%`}>
                            <span className="hb-yf3-track">
                              <span
                                className="hb-yf3-bar"
                                style={{ width: `${pct}%`, "--hb-yf3-c": confColor(m.confidence) } as React.CSSProperties}
                              />
                            </span>
                            {pct}%
                          </span>
                        </div>
                      </div>
                      <div className="hb-yf3-actions">
                        {isEditing ? (
                          <>
                            <button type="button" className="hb-yf3-btn" data-kind="save" aria-label="Save memory" onClick={() => save(m)}>
                              <svg viewBox="0 0 14 14" fill="none"><path d="M2.6 7.4l2.8 2.8 5.6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                            <button type="button" className="hb-yf3-btn" aria-label="Cancel edit" onClick={() => setEditing(null)}>
                              <svg viewBox="0 0 14 14" fill="none"><path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="hb-yf3-btn"
                              aria-label={`Edit: ${m.text}`}
                              onClick={() => {
                                setDraft(m.text);
                                setEditing(m.id);
                              }}
                            >
                              <svg viewBox="0 0 14 14" fill="none"><path d="M2.2 11.8l.7-3 6.4-6.4a1.3 1.3 0 0 1 1.9 1.9L4.8 10.7l-2.6 1.1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
                            </button>
                            <button type="button" className="hb-yf3-btn" data-kind="forget" aria-label={`Forget: ${m.text}`} onClick={() => forget(m)}>
                              <svg viewBox="0 0 14 14" fill="none"><path d="M2.5 3.8h9M5.4 3.8V2.5h3.2v1.3M3.6 3.8l.6 7.7h5.6l.6-7.7M5.8 6v3.6M8.2 6v3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
