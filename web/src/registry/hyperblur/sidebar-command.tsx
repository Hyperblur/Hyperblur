"use client";

import * as React from "react";

const PATHS = {
  inbox: "M3 11l1.9-5.6a1 1 0 0 1 .9-.7h8.4a1 1 0 0 1 .9.7L17 11M3 11v3.8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V11M3 11h4l.9 1.8h4.2L13 11h4",
  issues: "M10 16.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM10 11.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z",
  cycle: "M15.5 10a5.5 5.5 0 1 1-1.6-3.9M15.5 3.8v2.7h-2.7",
  map: "M3 5l4.5-1.5 5 2L17 4v11l-4.5 1.5-5-2L3 16zM7.5 3.5v11M12.5 5.5v11",
  plus: "M10 4.5v11M4.5 10h11",
  moon: "M15.5 12.2A6 6 0 0 1 7.8 4.5a6 6 0 1 0 7.7 7.7z",
  user: "M10 9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 16.5c.7-2.8 3.1-4.2 6-4.2s5.3 1.4 6 4.2",
} as const;

export type SidebarCommandIconName = keyof typeof PATHS;

export interface SidebarCommandItem {
  id: string;
  label: string;
  group?: string;
  keys?: string;
  icon?: SidebarCommandIconName | React.ReactNode;
  action?: boolean;
}

export interface SidebarCommandProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue" | "onSelect"> {
  items?: SidebarCommandItem[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  onAction?: (id: string) => void;
  placeholder?: string;
  globalShortcuts?: boolean;
  chordTimeout?: number;
  accent?: string;
}

const defaultItems: SidebarCommandItem[] = [
  { id: "inbox", label: "Inbox", group: "Go to", keys: "g i", icon: "inbox" },
  { id: "issues", label: "My issues", group: "Go to", keys: "g m", icon: "issues" },
  { id: "cycles", label: "Active cycle", group: "Go to", keys: "g c", icon: "cycle" },
  { id: "roadmap", label: "Roadmap", group: "Go to", keys: "g r", icon: "map" },
  { id: "new", label: "New issue", group: "Actions", keys: "c", icon: "plus", action: true },
  { id: "theme", label: "Toggle theme", group: "Actions", keys: "t", icon: "moon", action: true },
];

const css = `
.hb-xk6 {
  --hb-xk6-a: #2f7bff;
  --hb-xk6-t: 1500ms;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-right: 1px solid #1f1f1f;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, .02), transparent 30%),
    #0c0c0c;
  color: #ededed;
  font-family: inherit;
  font-size: 12.5px;
  line-height: 18px;
}
.hb-xk6 *, .hb-xk6 *::before, .hb-xk6 *::after { box-sizing: border-box; }
.hb-xk6-mono { font-family: var(--font-mono, ui-monospace, monospace); }
.hb-xk6-field {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  margin: 10px 10px 4px;
  padding: 0 6px 0 10px;
  border: 1px solid #262626;
  border-radius: 9px;
  background: #121212;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, .5);
  transition: border-color .18s ease, box-shadow .18s ease;
}
.hb-xk6-field:focus-within { border-color: color-mix(in srgb, var(--hb-xk6-a) 60%, #262626); box-shadow: inset 0 1px 2px rgba(0, 0, 0, .5), 0 0 0 3px color-mix(in srgb, var(--hb-xk6-a) 18%, transparent); }
.hb-xk6-caret { color: var(--hb-xk6-a); font-family: var(--font-mono, ui-monospace, monospace); font-size: 13px; font-weight: 600; }
.hb-xk6-input { flex: 1; min-width: 0; height: 100%; margin: 0; padding: 0; border: 0; background: transparent; color: #ededed; font: inherit; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; outline: none; }
.hb-xk6-input::placeholder { color: #5f5f66; }
.hb-xk6-kbd { display: inline-grid; place-items: center; min-width: 18px; height: 18px; padding: 0 4px; border: 1px solid #2c2c2c; border-bottom-width: 2px; border-radius: 5px; background: #181818; color: #8f8f8f; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; line-height: 1; }
.hb-xk6-body { flex: 1; min-height: 0; padding: 0 6px; overflow-y: auto; scrollbar-width: none; }
.hb-xk6-body::-webkit-scrollbar { display: none; }
.hb-xk6-gl { margin: 8px 8px 3px; color: #55555c; font-family: var(--font-mono, ui-monospace, monospace); font-size: 9.5px; letter-spacing: .1em; text-transform: uppercase; }
.hb-xk6-list { margin: 0; padding: 0; list-style: none; }
.hb-xk6-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 0 6px 0 12px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #9a9aa1;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .12s ease, color .12s ease;
}
.hb-xk6-row svg { flex: none; width: 15px; height: 15px; }
.hb-xk6-row:hover, .hb-xk6-row[data-hot="true"] { background: #171717; color: #ededed; }
.hb-xk6-row:focus-visible { outline: none; background: #1a1a1a; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xk6-a) 55%, transparent); color: #fff; }
.hb-xk6-row[aria-current="page"] { color: #fff; }
.hb-xk6-row[aria-current="page"]::before { content: ""; position: absolute; left: 3px; top: 50%; border: 4px solid transparent; border-left: 5px solid var(--hb-xk6-a); transform: translateY(-50%); }
.hb-xk6-row[aria-current="page"] svg { color: var(--hb-xk6-a); }
.hb-xk6-rl { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk6-rl mark { border-radius: 2px; background: color-mix(in srgb, var(--hb-xk6-a) 28%, transparent); color: #fff; }
.hb-xk6-keys { display: inline-flex; gap: 3px; }
.hb-xk6-keys .hb-xk6-kbd[data-lit="true"] { border-color: var(--hb-xk6-a); background: color-mix(in srgb, var(--hb-xk6-a) 22%, #181818); color: #fff; }
.hb-xk6-row[data-dim="true"] { opacity: .35; }
.hb-xk6-empty { margin: 18px 12px; color: #6f6f76; font-size: 12px; text-align: center; }
.hb-xk6-empty b { color: #ededed; font-weight: 500; }
.hb-xk6-status {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  flex: none;
  height: 30px;
  padding: 0 12px;
  overflow: hidden;
  border-top: 1px solid #1c1c1c;
  background: #0a0a0a;
  color: #6f6f76;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  white-space: nowrap;
}
.hb-xk6-mode { padding: 1px 6px; border-radius: 4px; background: #1c1c1c; color: #a1a1a1; font-weight: 600; letter-spacing: .04em; }
.hb-xk6-status[data-state="chord"] .hb-xk6-mode { background: var(--hb-xk6-a); color: #fff; }
.hb-xk6-status[data-state="done"] .hb-xk6-mode { background: #30a46c; color: #fff; }
.hb-xk6-msg { display: inline-flex; align-items: center; gap: 6px; min-width: 0; overflow: hidden; text-overflow: ellipsis; animation: hb-xk6-msg .22s cubic-bezier(.22, 1, .36, 1); }
.hb-xk6-msg b { color: #ededed; font-weight: 500; }
.hb-xk6-drain { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--hb-xk6-a); transform-origin: left; animation: hb-xk6-drain var(--hb-xk6-t) linear forwards; }
@keyframes hb-xk6-drain { to { transform: scaleX(0); } }
@keyframes hb-xk6-msg { from { opacity: 0; transform: translateY(6px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xk6 *, .hb-xk6 *::before, .hb-xk6 *::after { transition: none !important; animation: none !important; }
}
`;

function Glyph({ icon }: { icon?: SidebarCommandIconName | React.ReactNode }) {
  if (typeof icon === "string" || icon === undefined) {
    const d = PATHS[(icon as SidebarCommandIconName | undefined) ?? "inbox"] ?? PATHS.inbox;
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    );
  }
  return <>{icon}</>;
}

function fuzzy(label: string, q: string): number[] | null {
  if (!q) return [];
  const l = label.toLowerCase();
  const hits: number[] = [];
  let from = 0;
  for (const ch of q.toLowerCase()) {
    if (ch === " ") continue;
    const at = l.indexOf(ch, from);
    if (at < 0) return null;
    hits.push(at);
    from = at + 1;
  }
  return hits;
}

function Marked({ text, hits }: { text: string; hits: number[] }) {
  if (!hits.length) return <>{text}</>;
  const set = new Set(hits);
  return (
    <>
      {Array.from(text).map((ch, i) => (set.has(i) ? <mark key={i}>{ch}</mark> : <React.Fragment key={i}>{ch}</React.Fragment>))}
    </>
  );
}

function isEditable(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT";
}

export function SidebarCommand({
  items = defaultItems,
  active,
  defaultActive,
  onChange,
  onAction,
  placeholder = "Jump to...",
  globalShortcuts = false,
  chordTimeout = 1500,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: SidebarCommandProps) {
  const [inner, setInner] = React.useState(defaultActive ?? items.find((i) => !i.action)?.id ?? "");
  const [query, setQuery] = React.useState("");
  const [chord, setChord] = React.useState<string | null>(null);
  const [flashState, setFlashState] = React.useState<{ text: string; n: number } | null>(null);
  const flash = flashState?.text ?? null;
  const [hot, setHot] = React.useState(0);
  const current = active ?? inner;
  const rootRef = React.useRef<HTMLElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = items
    .map((item) => ({ item, hits: fuzzy(item.label, query.trim()) }))
    .filter((r): r is { item: SidebarCommandItem; hits: number[] } => r.hits !== null);
  const groups: { name: string; rows: typeof filtered }[] = [];
  for (const r of filtered) {
    const name = r.item.group ?? "";
    const g = groups.find((x) => x.name === name);
    if (g) g.rows.push(r);
    else groups.push({ name, rows: [r] });
  }
  const order = groups.flatMap((g) => g.rows.map((r) => r.item));
  const hotIndex = Math.min(hot, Math.max(0, order.length - 1));

  const run = React.useCallback(
    (item: SidebarCommandItem) => {
      if (item.action) onAction?.(item.id);
      else {
        if (active === undefined) setInner(item.id);
        onChange?.(item.id);
      }
      setChord(null);
      setFlashState((prev) => ({ text: item.action ? `Ran ${item.label}` : `Opened ${item.label}`, n: (prev?.n ?? 0) + 1 }));
    },
    [active, onAction, onChange],
  );

  const handleKey = React.useCallback(
    (key: string): boolean => {
      const k = key.toLowerCase();
      if (chord) {
        const match = items.find((i) => i.keys && i.keys.toLowerCase() === `${chord} ${k}`);
        setChord(null);
        if (match) {
          run(match);
          return true;
        }
        return k === "escape";
      }
      if (k.length !== 1) return false;
      const direct = items.find((i) => i.keys && i.keys.toLowerCase() === k);
      if (direct) {
        run(direct);
        return true;
      }
      if (items.some((i) => i.keys && i.keys.toLowerCase().startsWith(`${k} `))) {
        setChord(k);
        setFlashState(null);
        return true;
      }
      return false;
    },
    [chord, items, run],
  );

  React.useEffect(() => {
    if (!globalShortcuts) return;
    const onWin = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isEditable(e.target)) return;
      if (rootRef.current?.contains(e.target as Node)) return;
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }
      if (handleKey(e.key)) e.preventDefault();
    };
    window.addEventListener("keydown", onWin);
    return () => window.removeEventListener("keydown", onWin);
  }, [globalShortcuts, handleKey]);

  React.useEffect(() => {
    if (!chord) return;
    const t = window.setTimeout(() => setChord(null), chordTimeout);
    return () => window.clearTimeout(t);
  }, [chord, chordTimeout]);

  React.useEffect(() => {
    if (!flashState) return;
    const t = window.setTimeout(() => setFlashState(null), 1600);
    return () => window.clearTimeout(t);
  }, [flashState]);

  function rows() {
    return Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-xk6-row]") ?? []);
  }

  function onRootKey(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    const onInput = e.target === inputRef.current;
    if (onInput) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const n = e.key === "ArrowDown" ? Math.min(order.length - 1, hotIndex + 1) : Math.max(0, hotIndex - 1);
        setHot(n);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = order[hotIndex];
        if (item) {
          run(item);
          setQuery("");
          setHot(0);
        }
      } else if (e.key === "Escape") {
        if (query) {
          e.preventDefault();
          setQuery("");
        } else inputRef.current?.blur();
      } else if (e.key === "Tab" && !e.shiftKey && order.length) {
        e.preventDefault();
        rows()[hotIndex]?.focus();
      }
      return;
    }
    const list = rows();
    const at = list.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (at < 0) list[0]?.focus();
      else if (e.key === "ArrowUp" && at === 0) inputRef.current?.focus();
      else list[e.key === "ArrowDown" ? Math.min(list.length - 1, at + 1) : at - 1]?.focus();
      return;
    }
    if (e.key === "/") {
      e.preventDefault();
      inputRef.current?.focus();
      return;
    }
    if (handleKey(e.key)) e.preventDefault();
  }

  const lead = chord;
  const nextKeys = lead ? items.filter((i) => i.keys?.toLowerCase().startsWith(`${lead} `)) : [];
  const vars = { "--hb-xk6-a": accent, "--hb-xk6-t": `${chordTimeout}ms`, ...style } as React.CSSProperties;

  return (
    <nav ref={rootRef} aria-label="Command navigation" className={`hb-xk6 ${className}`} style={vars} onKeyDown={onRootKey} {...rest}>
      <style href="hb-sidebar-command" precedence="default">{css}</style>
      <label className="hb-xk6-field">
        <span className="hb-xk6-caret" aria-hidden="true">&gt;</span>
        <input
          ref={inputRef}
          className="hb-xk6-input"
          type="text"
          value={query}
          placeholder={placeholder}
          aria-label="Filter navigation"
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => {
            setQuery(e.target.value);
            setHot(0);
          }}
        />
        <kbd className="hb-xk6-kbd" aria-hidden="true">/</kbd>
      </label>
      <div className="hb-xk6-body">
        {groups.length === 0 ? (
          <p className="hb-xk6-empty">
            Nothing matches <b>{query}</b>
          </p>
        ) : (
          groups.map((g) => (
            <div key={g.name || "items"} role="group" aria-label={g.name || undefined}>
              {g.name ? <div className="hb-xk6-gl" aria-hidden="true">{g.name}</div> : null}
              <ul className="hb-xk6-list" role="list">
                {g.rows.map(({ item, hits }) => {
                  const flat = order.indexOf(item);
                  const parts = item.keys ? item.keys.split(" ") : [];
                  const dim = !!lead && !item.keys?.toLowerCase().startsWith(`${lead} `);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="hb-xk6-row"
                        data-xk6-row=""
                        data-hot={query !== "" && flat === hotIndex}
                        data-dim={dim}
                        aria-current={!item.action && item.id === current ? "page" : undefined}
                        aria-keyshortcuts={item.keys ? item.keys.replace(" ", " then ") : undefined}
                        onClick={() => run(item)}
                      >
                        <Glyph icon={item.icon} />
                        <span className="hb-xk6-rl">
                          <Marked text={item.label} hits={hits} />
                        </span>
                        {parts.length ? (
                          <span className="hb-xk6-keys" aria-hidden="true">
                            {parts.map((p, i) => (
                              <kbd key={i} className="hb-xk6-kbd" data-lit={!!lead && i === 0 && p.toLowerCase() === lead}>
                                {p.toUpperCase()}
                              </kbd>
                            ))}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>
      <div className="hb-xk6-status" data-state={lead ? "chord" : flash ? "done" : "idle"} aria-live="polite">
        <span className="hb-xk6-mode">{lead ? lead.toUpperCase() : flash ? "OK" : "NAV"}</span>
        {lead ? (
          <span key={`c-${lead}`} className="hb-xk6-msg">
            then {nextKeys.map((i) => (i.keys ?? "").split(" ")[1]?.toUpperCase()).join(" ")}
          </span>
        ) : flash ? (
          <span key={`f-${flashState?.n ?? 0}`} className="hb-xk6-msg">
            <b>{flash}</b>
          </span>
        ) : (
          <span className="hb-xk6-msg">/ search · G go to</span>
        )}
        {lead ? <span key={`d-${lead}`} className="hb-xk6-drain" aria-hidden="true" /> : null}
      </div>
    </nav>
  );
}
