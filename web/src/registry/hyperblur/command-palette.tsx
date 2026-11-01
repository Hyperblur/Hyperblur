"use client";

import * as React from "react";

export interface CommandPaletteItem {
  id: string;
  label: string;
  group?: string;
  hint?: string;
  icon?: React.ReactNode;
  onSelect?: () => void;
}

export interface CommandPaletteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onSelect"> {
  items: CommandPaletteItem[];
  placeholder?: string;
  hotkey?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (id: string) => void;
  inline?: boolean;
  color?: string;
  children?: React.ReactNode;
}

const css = `
.hb-cp {
  position: relative;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  --hb-cp-accent: #2f7bff;
}
.hb-cp[data-inline="true"] { width: 100%; }
.hb-cp-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  min-width: 220px;
  height: 36px;
  margin: 0;
  padding: 0 8px 0 10px;
  border: 1px solid #262626;
  border-radius: 10px;
  background: #111111;
  color: #8f8f8f;
  font: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: border-color .15s ease, background-color .15s ease, color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-cp-trigger:hover { border-color: #333333; background: #171717; color: #ededed; }
.hb-cp-trigger:focus-visible { outline: 2px solid var(--hb-cp-accent); outline-offset: 2px; }
.hb-cp-trigger-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-cp-kbd {
  flex: none;
  padding: 1px 6px;
  border: 1px solid #262626;
  border-radius: 6px;
  background: #171717;
  color: #8f8f8f;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11px;
  line-height: 16px;
}
.hb-cp-svg { flex: none; width: 16px; height: 16px; }
.hb-cp-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  padding: 12vh 16px 16px;
  background: rgba(0, 0, 0, .62);
  animation: hb-cp-fade .16s ease both;
}
.hb-cp-panel {
  width: 100%;
  max-width: 560px;
  overflow: hidden;
  border: 1px solid #262626;
  border-radius: 14px;
  background: #111111;
  box-shadow: 0 24px 80px rgba(0, 0, 0, .6);
  text-align: left;
}
.hb-cp-overlay .hb-cp-panel { animation: hb-cp-pop .2s cubic-bezier(.2, .9, .2, 1) both; }
.hb-cp[data-inline="true"] .hb-cp-panel { max-width: none; box-shadow: none; }
.hb-cp-field {
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  height: 44px;
  padding: 0 14px;
  border-bottom: 1px solid #262626;
  color: #8f8f8f;
}
.hb-cp[data-inline="true"] .hb-cp-field { height: 38px; }
.hb-cp-input {
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14px;
}
.hb-cp-input::placeholder { color: #8f8f8f; opacity: 1; }
.hb-cp-list {
  position: relative;
  box-sizing: border-box;
  max-height: 340px;
  padding: 6px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: #2a2a2a transparent;
}
.hb-cp[data-inline="true"] .hb-cp-list { max-height: 132px; }
.hb-cp-group-label {
  padding: 8px 10px 4px;
  color: #8f8f8f;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.hb-cp[data-inline="true"] .hb-cp-group-label { padding-top: 4px; }
.hb-cp-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 8px;
  color: #ededed;
  font-size: 13px;
  line-height: 18px;
  cursor: pointer;
  user-select: none;
}
.hb-cp-item[aria-selected="true"] { background: #1f1f1f; }
.hb-cp-icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 16px;
  height: 16px;
  color: #8f8f8f;
  transition: color .15s ease;
}
.hb-cp-item[aria-selected="true"] .hb-cp-icon { color: var(--hb-cp-accent); }
.hb-cp-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-cp-mark { color: var(--hb-cp-accent); font-weight: 600; }
.hb-cp-empty { padding: 28px 16px; color: #8f8f8f; font-size: 13px; text-align: center; }
@keyframes hb-cp-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-cp-pop {
  from { opacity: 0; transform: translate3d(0, 8px, 0) scale(.97); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-cp-overlay, .hb-cp-overlay .hb-cp-panel { animation: none; }
  .hb-cp-trigger, .hb-cp-icon { transition: none; }
}
`;

interface Row {
  item: CommandPaletteItem;
  idx: number[];
  score: number;
  n: number;
}

interface Section {
  key: string;
  rows: Row[];
}

function fuzzy(q: string, text: string): { score: number; idx: number[] } | null {
  if (!q) return { score: 0, idx: [] };
  const t = text.toLowerCase();
  const idx: number[] = [];
  let from = 0;
  let prev = -2;
  let score = 0;
  for (let i = 0; i < q.length; i++) {
    const at = t.indexOf(q[i], from);
    if (at < 0) return null;
    idx.push(at);
    score += 1;
    if (at === prev + 1) score += 5;
    if (at === 0 || " -_".includes(t[at - 1])) score += 4;
    score -= (at - from) * 0.1;
    prev = at;
    from = at + 1;
  }
  if (t.startsWith(q)) score += 10;
  else if (t.includes(q)) score += 6;
  return { score, idx };
}

function Highlight({ text, idx }: { text: string; idx: number[] }) {
  if (idx.length === 0) return <>{text}</>;
  const marked = new Set(idx);
  const parts: React.ReactNode[] = [];
  let buf = "";
  let on = false;
  const flush = (key: number) => {
    if (!buf) return;
    parts.push(on ? <span key={key} className="hb-cp-mark">{buf}</span> : buf);
    buf = "";
  };
  for (let i = 0; i < text.length; i++) {
    const m = marked.has(i);
    if (m !== on) {
      flush(i);
      on = m;
    }
    buf += text[i];
  }
  flush(text.length);
  return <>{parts}</>;
}

function SearchIcon() {
  return (
    <svg className="hb-cp-svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="hb-cp-svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
    </svg>
  );
}

interface PanelProps {
  uid: string;
  items: CommandPaletteItem[];
  placeholder: string;
  inline: boolean;
  onClose: () => void;
  onPick: (item: CommandPaletteItem) => void;
}

function Panel({ uid, items, placeholder, inline, onClose, onPick }: PanelProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);

  const { sections, flat } = React.useMemo(() => {
    const q = query.replace(/\s+/g, "").toLowerCase();
    const matched: Row[] = [];
    items.forEach((item) => {
      const m = fuzzy(q, item.label);
      if (m) matched.push({ item, idx: m.idx, score: m.score, n: 0 });
    });
    if (q) matched.sort((a, b) => b.score - a.score);
    const out: Section[] = [];
    const byKey = new Map<string, Section>();
    matched.forEach((row) => {
      const key = row.item.group ?? "";
      let s = byKey.get(key);
      if (!s) {
        s = { key, rows: [] };
        byKey.set(key, s);
        out.push(s);
      }
      s.rows.push(row);
    });
    const all = out.flatMap((s) => s.rows);
    all.forEach((row, i) => {
      row.n = i;
    });
    return { sections: out, flat: all };
  }, [items, query]);

  const safe = flat.length === 0 ? -1 : Math.min(active, flat.length - 1);

  React.useEffect(() => {
    if (inline) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      if (previous && previous.isConnected) previous.focus();
    };
  }, [inline]);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list || safe < 0) return;
    const el = list.querySelector<HTMLElement>(`[data-n="${safe}"]`);
    if (!el) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (top - 28 < list.scrollTop) list.scrollTop = Math.max(0, top - 28);
    else if (bottom + 6 > list.scrollTop + list.clientHeight) list.scrollTop = bottom + 6 - list.clientHeight;
  }, [safe]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const n = flat.length;
    if (e.key === "Escape") {
      if (inline) return;
      e.preventDefault();
      e.stopPropagation();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (n) setActive(safe < 0 ? 0 : (safe + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (n) setActive(safe < 0 ? n - 1 : (safe - 1 + n) % n);
    } else if (e.key === "Home") {
      if (n) {
        e.preventDefault();
        setActive(0);
      }
    } else if (e.key === "End") {
      if (n) {
        e.preventDefault();
        setActive(n - 1);
      }
    } else if (e.key === "Enter") {
      if (safe >= 0) {
        e.preventDefault();
        onPick(flat[safe].item);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      inputRef.current?.focus();
    }
  }

  const listId = `${uid}-list`;

  return (
    <div
      className="hb-cp-panel"
      role={inline ? "group" : "dialog"}
      aria-modal={inline ? undefined : true}
      aria-label="Command palette"
      onKeyDown={handleKeyDown}
    >
      <div className="hb-cp-field">
        <SearchIcon />
        <input
          ref={inputRef}
          className="hb-cp-input"
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={safe >= 0 ? `${uid}-opt-${safe}` : undefined}
          aria-label="Search commands"
          placeholder={placeholder}
          value={query}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
        />
      </div>
      <div ref={listRef} id={listId} className="hb-cp-list" role="listbox" aria-label="Results">
        {flat.length === 0 ? (
          <div className="hb-cp-empty" role="status">
            No results for &ldquo;{query.trim()}&rdquo;
          </div>
        ) : (
          sections.map((section) => {
            const labelId = `${uid}-g-${section.key}`;
            return (
              <div key={section.key} role="group" aria-labelledby={section.key ? labelId : undefined}>
                {section.key ? (
                  <div id={labelId} className="hb-cp-group-label" role="presentation">
                    {section.key}
                  </div>
                ) : null}
                {section.rows.map((row) => (
                  <div
                    key={row.item.id}
                    id={`${uid}-opt-${row.n}`}
                    role="option"
                    aria-selected={safe === row.n}
                    data-n={row.n}
                    className="hb-cp-item"
                    onPointerMove={() => {
                      if (safe !== row.n) setActive(row.n);
                    }}
                    onClick={() => onPick(row.item)}
                  >
                    <span className="hb-cp-icon" aria-hidden="true">
                      {row.item.icon ?? <ArrowIcon />}
                    </span>
                    <span className="hb-cp-label">
                      <Highlight text={row.item.label} idx={row.idx} />
                    </span>
                    {row.item.hint ? <kbd className="hb-cp-kbd">{row.item.hint}</kbd> : null}
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function CommandPalette({
  items,
  placeholder = "Search…",
  hotkey = true,
  open,
  onOpenChange,
  onSelect,
  inline = false,
  color = "#2f7bff",
  children,
  className = "",
  style,
  ...rest
}: CommandPaletteProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState(false);
  const isOpen = inline || (open ?? inner);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  React.useEffect(() => {
    if (!hotkey || inline) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hotkey, inline, isOpen, setOpen]);

  function pick(item: CommandPaletteItem) {
    item.onSelect?.();
    onSelect?.(item.id);
    if (!inline) setOpen(false);
  }

  const vars = { "--hb-cp-accent": color, ...style } as React.CSSProperties;

  const panel = (
    <Panel
      uid={uid}
      items={items}
      placeholder={placeholder}
      inline={inline}
      onClose={() => setOpen(false)}
      onPick={pick}
    />
  );

  return (
    <div className={`hb-cp ${className}`} data-inline={inline} style={vars} {...rest}>
      <style href="hb-command-palette" precedence="default">{css}</style>
      {inline ? null : (
        <button
          type="button"
          className="hb-cp-trigger"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={() => setOpen(true)}
        >
          {children ?? (
            <>
              <SearchIcon />
              <span className="hb-cp-trigger-label">{placeholder}</span>
              {hotkey ? <kbd className="hb-cp-kbd">⌘K</kbd> : null}
            </>
          )}
        </button>
      )}
      {isOpen ? (
        inline ? (
          panel
        ) : (
          <div
            className="hb-cp-overlay"
            onPointerDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            {panel}
          </div>
        )
      ) : null}
    </div>
  );
}
