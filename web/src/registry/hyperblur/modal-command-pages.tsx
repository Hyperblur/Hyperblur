"use client";

import * as React from "react";

export interface CommandPageItem {
  id: string;
  label: string;
  group?: string;
  hint?: string;
  shortcut?: string[];
  icon?: string;
  keywords?: string[];
  children?: CommandPageItem[];
}

export interface ModalCommandPagesProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  embedded?: boolean;
  trigger?: React.ReactNode;
  items?: CommandPageItem[];
  placeholder?: string;
  hotkey?: boolean;
  onSelect?: (item: CommandPageItem, path: string[]) => void;
  accent?: string;
}

const icons = {
  home: "M2.5 7.5 8 3l5.5 4.5V13a.5.5 0 0 1-.5.5H10V10H6v3.5H3a.5.5 0 0 1-.5-.5Z",
  inbox: "M2.5 9.5h3l1 1.5h3l1-1.5h3M3.5 3.5h9l1 6v3h-11v-3Z",
  folder: "M2.5 4.5a1 1 0 0 1 1-1h3l1.5 1.5h4.5a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1Z",
  plus: "M8 3.5v9M3.5 8h9",
  user: "M8 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 13.5a5 5 0 0 1 10 0",
  sun: "M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1",
  globe: "M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2.5 8h11M8 2.5c1.6 1.6 2.3 3.4 2.3 5.5S9.6 11.9 8 13.5C6.4 11.9 5.7 10.1 5.7 8S6.4 4.1 8 2.5Z",
  flag: "M3.5 13.5v-10M3.5 3.5h7l-1.5 2.5 1.5 2.5h-7",
  gear: "M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM13 8.8V7.2l-1.5-.4-.4-1 .8-1.3-1.2-1.2-1.3.8-1-.4L8.8 2H7.2l-.4 1.5-1 .4-1.3-.8-1.2 1.2.8 1.3-.4 1L2 7.2v1.6l1.5.4.4 1-.8 1.3 1.2 1.2 1.3-.8 1 .4.4 1.5h1.6l.4-1.5 1-.4 1.3.8 1.2-1.2-.8-1.3.4-1Z",
};

const defaultItems: CommandPageItem[] = [
  { id: "go-inbox", label: "Go to Inbox", group: "Navigate", icon: icons.inbox, shortcut: ["G", "I"] },
  { id: "go-projects", label: "Go to Projects", group: "Navigate", icon: icons.folder, shortcut: ["G", "P"] },
  { id: "new-issue", label: "Create issue", group: "Actions", icon: icons.plus, shortcut: ["C"] },
  {
    id: "assign",
    label: "Assign to…",
    group: "Actions",
    icon: icons.user,
    children: [
      { id: "assign-me", label: "Me", hint: "Alex Moreno" },
      { id: "assign-dana", label: "Dana Whitfield", hint: "Design" },
      { id: "assign-kenji", label: "Kenji Sato", hint: "Engineering" },
      { id: "assign-ruth", label: "Ruth Adeyemi", hint: "Product" },
      { id: "assign-none", label: "Unassigned" },
    ],
  },
  {
    id: "priority",
    label: "Set priority…",
    group: "Actions",
    icon: icons.flag,
    children: [
      { id: "p-urgent", label: "Urgent", shortcut: ["1"] },
      { id: "p-high", label: "High", shortcut: ["2"] },
      { id: "p-medium", label: "Medium", shortcut: ["3"] },
      { id: "p-low", label: "Low", shortcut: ["4"] },
    ],
  },
  {
    id: "theme",
    label: "Change theme…",
    group: "Preferences",
    icon: icons.sun,
    keywords: ["appearance", "dark", "light"],
    children: [
      { id: "theme-system", label: "Match system" },
      { id: "theme-dark", label: "Dark" },
      { id: "theme-light", label: "Light" },
      { id: "theme-contrast", label: "High contrast" },
    ],
  },
  {
    id: "language",
    label: "Change language…",
    group: "Preferences",
    icon: icons.globe,
    children: [
      { id: "lang-en", label: "English", hint: "English" },
      { id: "lang-pt", label: "Português", hint: "Portuguese" },
      { id: "lang-es", label: "Español", hint: "Spanish" },
      { id: "lang-de", label: "Deutsch", hint: "German" },
      { id: "lang-ja", label: "日本語", hint: "Japanese" },
    ],
  },
  { id: "settings", label: "Open settings", group: "Preferences", icon: icons.gear, shortcut: ["⌘", ","] },
];

const css = `
.hb-xe10 { --hb-xe10-accent: #2f7bff; display: inline-block; box-sizing: border-box; color: #ededed; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); }
.hb-xe10 *, .hb-xe10 *::before, .hb-xe10 *::after { box-sizing: border-box; }
.hb-xe10[data-embedded] { position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-height: 190px; border-radius: 16px; overflow: hidden; isolation: isolate; background: #0a0a0a; }
.hb-xe10-trigger { display: inline-flex; align-items: center; gap: 10px; width: 240px; height: 36px; padding: 0 6px 0 11px; border: 1px solid #262626; border-radius: 10px; background: #111; color: #8f8f8f; font: inherit; font-size: 13px; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; }
.hb-xe10-trigger:hover { border-color: #363636; color: #c4c4c4; }
.hb-xe10-trigger > svg { width: 14px; height: 14px; flex: none; }
.hb-xe10-trigger > span { flex: 1; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe10 button:focus-visible { outline: 2px solid var(--hb-xe10-accent); outline-offset: 2px; }
.hb-xe10-keys { display: inline-flex; gap: 3px; }
.hb-xe10-keys kbd { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 5px; background: #1a1a1a; box-shadow: inset 0 -1px 0 #2e2e2e, inset 0 0 0 1px #262626; color: #a1a1a1; font-family: inherit; font-size: 11px; }
.hb-xe10-layer { position: fixed; inset: 0; z-index: 1000; height: 100dvh; display: flex; justify-content: center; align-items: flex-start; padding: 14dvh 16px 16px; }
.hb-xe10[data-embedded] .hb-xe10-layer { position: absolute; height: auto; z-index: 2; padding: 10px; align-items: center; }
.hb-xe10-scrim { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.5); animation: hb-xe10-fade 0.18s ease both; }
.hb-xe10-layer[data-state="closed"] .hb-xe10-scrim { animation: hb-xe10-fade-out 0.16s ease both; }
.hb-xe10-panel { container-type: inline-size; position: relative; display: flex; flex-direction: column; width: 100%; max-width: 580px; max-height: min(460px, 100%); overflow: hidden; border: 1px solid #2a2a2a; border-radius: 14px; background: rgba(20, 20, 20, 0.92); -webkit-backdrop-filter: blur(24px) saturate(1.4); backdrop-filter: blur(24px) saturate(1.4); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -20px rgba(0, 0, 0, 0.9); animation: hb-xe10-in 0.22s cubic-bezier(0.2, 0.9, 0.3, 1.1) both; }
.hb-xe10[data-embedded] .hb-xe10-panel { height: 100%; max-height: 100%; }
.hb-xe10-layer[data-state="closed"] .hb-xe10-panel { animation: hb-xe10-out 0.16s ease both; }
.hb-xe10-panel[data-bump="a"] { animation: hb-xe10-bump-a 0.22s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe10-panel[data-bump="b"] { animation: hb-xe10-bump-b 0.22s cubic-bezier(0.3, 0.7, 0.4, 1); }
.hb-xe10-search { flex: none; display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 12px 14px; border-bottom: 1px solid #232323; }
.hb-xe10-search > svg { width: 16px; height: 16px; flex: none; color: #7a7a7a; }
.hb-xe10-crumb { display: inline-flex; align-items: center; height: 22px; padding: 0 8px; border-radius: 6px; background: color-mix(in srgb, var(--hb-xe10-accent) 18%, #1a1a1a); color: color-mix(in srgb, var(--hb-xe10-accent) 45%, #fff); font-size: 12px; font-weight: 550; white-space: nowrap; animation: hb-xe10-chip 0.25s cubic-bezier(0.3, 0.7, 0.4, 1.3) both; }
.hb-xe10-input { flex: 1; min-width: 120px; height: 26px; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 15px; outline: none; }
.hb-xe10-input::placeholder { color: #6a6a6a; }
.hb-xe10-list { flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 6px; scroll-padding: 8px; animation: hb-xe10-push 0.26s cubic-bezier(0.2, 0.9, 0.3, 1) both; }
.hb-xe10-list[data-dir="pop"] { animation-name: hb-xe10-pop; }
.hb-xe10-group { padding: 8px 10px 4px; color: #6f6f6f; font-size: 11px; font-weight: 600; letter-spacing: 0.02em; }
.hb-xe10-opt { position: relative; display: flex; align-items: center; gap: 10px; height: 38px; padding: 0 10px; border-radius: 8px; color: #d4d4d4; font-size: 13.5px; cursor: pointer; user-select: none; }
.hb-xe10-opt[aria-selected="true"] { background: #232323; color: #fff; }
.hb-xe10-opt[aria-selected="true"]::before { content: ""; position: absolute; left: 0; top: 10px; bottom: 10px; width: 2px; border-radius: 2px; background: var(--hb-xe10-accent); }
.hb-xe10-ico { display: grid; place-items: center; width: 22px; height: 22px; flex: none; border-radius: 6px; background: #1c1c1c; box-shadow: inset 0 0 0 1px #2a2a2a; color: #a8a8a8; }
.hb-xe10-opt[aria-selected="true"] .hb-xe10-ico { color: #fff; }
.hb-xe10-ico svg { width: 13px; height: 13px; }
.hb-xe10-lab { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xe10-lab mark { background: none; color: #fff; font-weight: 650; text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--hb-xe10-accent) 70%, transparent); text-underline-offset: 3px; }
.hb-xe10-hint { color: #6f6f6f; font-size: 12px; white-space: nowrap; }
.hb-xe10-chev { width: 13px; height: 13px; color: #6f6f6f; }
.hb-xe10-tick { width: 14px; height: 14px; color: var(--hb-xe10-accent); }
.hb-xe10-empty { padding: 28px 12px; color: #7a7a7a; font-size: 13px; text-align: center; }
.hb-xe10-foot { flex: none; display: flex; align-items: center; gap: 14px; padding: 8px 14px; border-top: 1px solid #232323; color: #6f6f6f; font-size: 11.5px; }
.hb-xe10-foot span { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
.hb-xe10-foot kbd { display: inline-grid; place-items: center; min-width: 18px; height: 18px; padding: 0 4px; border-radius: 4px; background: #1c1c1c; box-shadow: inset 0 0 0 1px #2a2a2a; color: #9a9a9a; font-family: inherit; font-size: 10.5px; }
.hb-xe10-done { margin-left: auto; color: #4fd18b; animation: hb-xe10-chip 0.25s ease both; }
@container (max-width: 380px) { .hb-xe10-foot span:nth-child(3) { display: none; } }
@keyframes hb-xe10-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-xe10-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xe10-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes hb-xe10-out { from { opacity: 1; } to { opacity: 0; transform: scale(0.98); } }
@keyframes hb-xe10-bump-a { 50% { transform: scale(0.985); } }
@keyframes hb-xe10-bump-b { 50% { transform: scale(0.985); } }
@keyframes hb-xe10-push { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
@keyframes hb-xe10-pop { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: none; } }
@keyframes hb-xe10-chip { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xe10-scrim, .hb-xe10-panel, .hb-xe10-panel[data-bump], .hb-xe10-list, .hb-xe10-crumb, .hb-xe10-done, .hb-xe10-layer[data-state="closed"] .hb-xe10-panel, .hb-xe10-layer[data-state="closed"] .hb-xe10-scrim { animation: none; }
  .hb-xe10-layer[data-state="closed"] { opacity: 0; }
  .hb-xe10-trigger { transition: none; }
}
`;

const focusable =
  'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])';

function useLayer(
  open: boolean,
  embedded: boolean,
  panel: React.RefObject<HTMLElement | null>,
  onClose: () => void,
  userOpened: React.RefObject<boolean>,
) {
  const closeRef = React.useRef(onClose);
  React.useEffect(() => {
    closeRef.current = onClose;
  });
  React.useEffect(() => {
    if (!open) return;
    const node = panel.current;
    const steal = !embedded || userOpened.current;
    const previous = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const overflow = html.style.overflow;
    if (!embedded) html.style.overflow = "hidden";
    if (steal && node) {
      const target = node.querySelector<HTMLElement>("[data-autofocus]") ?? node.querySelector<HTMLElement>(focusable) ?? node;
      target.focus({ preventScroll: true });
    }
    const onKey = (e: KeyboardEvent) => {
      if (!node) return;
      if (embedded && !node.contains(document.activeElement)) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(focusable)).filter((el) => el.getClientRects().length > 0);
      if (!items.length) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!node.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (!embedded) html.style.overflow = overflow;
      if (steal && previous && previous.isConnected && previous !== document.body) previous.focus({ preventScroll: true });
    };
  }, [open, embedded, panel, userOpened]);
}

interface Row {
  item: CommandPageItem;
  parent?: CommandPageItem;
}

function highlight(label: string, q: string) {
  if (!q) return label;
  const i = label.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return label;
  return (
    <>
      {label.slice(0, i)}
      <mark>{label.slice(i, i + q.length)}</mark>
      {label.slice(i + q.length)}
    </>
  );
}

export function ModalCommandPages({
  open,
  defaultOpen,
  onOpenChange,
  embedded = false,
  trigger = "Search or jump to…",
  items = defaultItems,
  placeholder = "Type a command or search",
  hotkey = true,
  onSelect,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: ModalCommandPagesProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const [present, setPresent] = React.useState(isOpen);
  const [stack, setStack] = React.useState<CommandPageItem[]>([]);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [dir, setDir] = React.useState<"push" | "pop">("push");
  const [bump, setBump] = React.useState<"a" | "b" | undefined>(undefined);
  const [choices, setChoices] = React.useState<Record<string, string>>({ theme: "theme-dark", language: "lang-en" });
  const [done, setDone] = React.useState("");
  const userOpened = React.useRef(false);
  const panel = React.useRef<HTMLDivElement>(null);
  const list = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef(0);
  const id = React.useId();

  if (isOpen && !present) setPresent(true);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) {
        userOpened.current = true;
        setStack([]);
        setQuery("");
        setActive(0);
        setDone("");
      }
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);

  React.useEffect(() => {
    if (isOpen || !present) return;
    const t = setTimeout(() => setPresent(false), 180);
    return () => clearTimeout(t);
  }, [isOpen, present]);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const openRef = React.useRef(setOpen);
  React.useEffect(() => {
    openRef.current = setOpen;
  });
  React.useEffect(() => {
    if (!hotkey || embedded) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openRef.current(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [hotkey, embedded]);

  const page = stack[stack.length - 1];
  const source = page?.children ?? items;
  const q = query.trim().toLowerCase();

  const rows: Row[] = React.useMemo(() => {
    const match = (it: CommandPageItem) =>
      it.label.toLowerCase().includes(q) || (it.keywords ?? []).some((k) => k.includes(q)) || (it.hint ?? "").toLowerCase().includes(q);
    if (!q) return source.map((item) => ({ item, parent: page }));
    const own = source.filter(match).map((item) => ({ item, parent: page }));
    if (page) return own;
    const deep: Row[] = [];
    for (const it of source) for (const c of it.children ?? []) if (c.label.toLowerCase().includes(q)) deep.push({ item: c, parent: it });
    return [...own, ...deep];
  }, [source, q, page]);

  const current = Math.min(active, Math.max(rows.length - 1, 0));

  React.useEffect(() => {
    list.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [current, rows]);

  function push(item: CommandPageItem) {
    setDir("push");
    setStack((s) => [...s, item]);
    setQuery("");
    setActive(Math.max(0, (item.children ?? []).findIndex((c) => c.id === choices[item.id])));
    setBump((b) => (b === "a" ? "b" : "a"));
  }

  function pop() {
    if (!stack.length) return;
    const leaving = stack[stack.length - 1];
    const parentList = stack[stack.length - 2]?.children ?? items;
    setDir("pop");
    setStack((s) => s.slice(0, -1));
    setActive(Math.max(0, parentList.findIndex((c) => c.id === leaving.id)));
  }

  function run(row: Row) {
    if (row.item.children) {
      push(row.item);
      return;
    }
    const path = [...stack.map((s) => s.id), ...(row.parent && !stack.includes(row.parent) ? [row.parent.id] : []), row.item.id];
    const parent = row.parent;
    if (parent) setChoices((c) => ({ ...c, [parent.id]: row.item.id }));
    onSelect?.(row.item, path);
    setDone(row.parent ? `${row.parent.label.replace("…", "")}: ${row.item.label}` : row.item.label);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (embedded) {
        setStack([]);
        setQuery("");
        setActive(0);
        setDone("");
      } else {
        setOpen(false);
      }
    }, 650);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!rows.length) return;
      setActive((current + (e.key === "ArrowDown" ? 1 : -1) + rows.length) % rows.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (rows[current]) run(rows[current]);
    } else if (e.key === "Backspace" && !query && stack.length) {
      e.preventDefault();
      pop();
    } else if (e.key === "ArrowRight" && rows[current]?.item.children && (e.currentTarget.selectionStart ?? 0) === query.length) {
      e.preventDefault();
      push(rows[current].item);
    } else if (e.key === "ArrowLeft" && !query && stack.length) {
      e.preventDefault();
      pop();
    }
  }

  useLayer(isOpen, embedded, panel, () => (stack.length ? pop() : close()), userOpened);

  const groupOf = (row?: Row) => (!row ? undefined : q && row.parent && !page ? row.parent.label.replace("…", "") : page ? undefined : row.item.group);
  const vars = { "--hb-xe10-accent": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-xe10 ${className}`} data-embedded={embedded || undefined} style={vars} {...rest}>
      <style href="hb-xe10-css" precedence="default">{css}</style>
      {trigger !== null && (
        <button type="button" className="hb-xe10-trigger" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setOpen(true)}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3 3" /></svg>
          <span>{trigger}</span>
          <span className="hb-xe10-keys" aria-hidden="true" style={{ flex: "none" }}><kbd>⌘</kbd><kbd>K</kbd></span>
        </button>
      )}
      {present && (
        <div className="hb-xe10-layer" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xe10-scrim" onClick={close} aria-hidden="true" />
          <div ref={panel} role="dialog" aria-modal="true" aria-label="Command menu" tabIndex={-1} className="hb-xe10-panel" data-bump={bump}>
            <div className="hb-xe10-search">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3 3" /></svg>
              {stack.map((s) => (
                <span key={s.id} className="hb-xe10-crumb">{s.label.replace("…", "")}</span>
              ))}
              <input
                className="hb-xe10-input"
                data-autofocus=""
                role="combobox"
                aria-expanded="true"
                aria-controls={`${id}-l`}
                aria-activedescendant={rows[current] ? `${id}-o-${current}` : undefined}
                aria-autocomplete="list"
                placeholder={page ? `Search ${page.label.replace("…", "").toLowerCase()}` : placeholder}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
              />
            </div>
            <div key={stack.length} ref={list} id={`${id}-l`} role="listbox" aria-label={page?.label ?? "Commands"} className="hb-xe10-list" data-dir={dir}>
              {rows.length === 0 && <div className="hb-xe10-empty">No results for “{query}”</div>}
              {rows.map((row, i) => {
                const group = groupOf(row);
                const showGroup = group && group !== groupOf(rows[i - 1]);
                const chosen = row.parent && choices[row.parent.id] === row.item.id;
                return (
                  <React.Fragment key={`${row.parent?.id ?? "root"}-${row.item.id}`}>
                    {showGroup && <div className="hb-xe10-group" role="presentation">{group}</div>}
                    <div
                      id={`${id}-o-${i}`}
                      role="option"
                      aria-selected={i === current}
                      className="hb-xe10-opt"
                      onMouseMove={() => i !== current && setActive(i)}
                      onClick={() => run(row)}
                    >
                      <span className="hb-xe10-ico" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d={row.item.icon ?? row.parent?.icon ?? icons.home} />
                        </svg>
                      </span>
                      <span className="hb-xe10-lab">{highlight(row.item.label, query.trim())}</span>
                      {row.item.hint && <span className="hb-xe10-hint">{row.item.hint}</span>}
                      {chosen && (
                        <svg className="hb-xe10-tick" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Current">
                          <path d="m3.5 8.4 3 3 6-6.4" />
                        </svg>
                      )}
                      {row.item.shortcut && (
                        <span className="hb-xe10-keys" aria-hidden="true">{row.item.shortcut.map((k) => <kbd key={k}>{k}</kbd>)}</span>
                      )}
                      {row.item.children && (
                        <svg className="hb-xe10-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" /></svg>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="hb-xe10-foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
              <span><kbd>↵</kbd> {rows[current]?.item.children ? "Open" : "Run"}</span>
              {stack.length > 0 ? <span><kbd>⌫</kbd> Back</span> : <span><kbd>esc</kbd> Close</span>}
              {done && <span className="hb-xe10-done" role="status">✓ {done}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
