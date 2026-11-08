"use client";

import * as React from "react";

export interface NavbarCommandLink {
  label: string;
  href: string;
}

export interface NavbarCommandItem {
  id: string;
  label: string;
  group: string;
  hint?: string;
  shortcut?: string;
  href?: string;
}

export interface NavbarCommandProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onSelect"> {
  brand?: string;
  links?: NavbarCommandLink[];
  items?: NavbarCommandItem[];
  recent?: string[];
  placeholder?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultQuery?: string;
  onSelect?: (item: NavbarCommandItem) => void;
  user?: { name: string } | null;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-xi7 {
  --hb-xi7-accent: #a78bfa;
  --hb-xi7-ease: cubic-bezier(.22,1,.36,1);
  position: relative;
  z-index: 40;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0b;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xi7 *, .hb-xi7 *::before, .hb-xi7 *::after { box-sizing: border-box; }
.hb-xi7-bar { position: relative; z-index: 3; border-bottom: 1px solid #1e1e22; background: #0a0a0b; }
.hb-xi7-row { position: relative; display: flex; align-items: center; gap: 16px; max-width: 1140px; height: 60px; margin: 0 auto; padding: 0 20px; }
.hb-xi7-brand { display: inline-flex; flex: none; align-items: center; gap: 9px; color: #fff; font-size: 15px; font-weight: 650; letter-spacing: -.02em; text-decoration: none; border-radius: 6px; transition: opacity .3s ease, transform .45s var(--hb-xi7-ease); }
.hb-xi7-mark { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 7px; background: linear-gradient(135deg, var(--hb-xi7-accent), color-mix(in srgb, var(--hb-xi7-accent) 40%, #1e1b4b)); box-shadow: 0 0 0 1px rgba(255,255,255,.2) inset; }
.hb-xi7-mark svg { width: 12px; height: 12px; fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-xi7-links { display: flex; flex: none; align-items: center; gap: 2px; margin: 0; padding: 0; list-style: none; transition: opacity .25s ease, transform .45s var(--hb-xi7-ease), max-width .5s var(--hb-xi7-ease); max-width: 520px; overflow: hidden; }
.hb-xi7-link { display: inline-flex; align-items: center; height: 34px; padding: 0 11px; border-radius: 8px; color: #9d9da6; font-size: 13.5px; font-weight: 500; white-space: nowrap; text-decoration: none; transition: color .2s ease, background-color .2s ease; }
.hb-xi7-link:hover { color: #fff; background: rgba(255,255,255,.05); }
.hb-xi7-box { position: relative; flex: 1 1 auto; display: flex; justify-content: flex-end; min-width: 0; }
.hb-xi7-field {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 260px;
  height: 38px;
  padding: 0 8px 0 12px;
  border-radius: 10px;
  background: #141416;
  box-shadow: 0 0 0 1px #26262b inset;
  color: #8b8b94;
  cursor: text;
  transition: width .55s var(--hb-xi7-ease), box-shadow .25s ease, background-color .25s ease;
}
.hb-xi7-field:hover { box-shadow: 0 0 0 1px #34343a inset; }
.hb-xi7[data-open="true"] .hb-xi7-field { width: 100%; background: #111113; box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-xi7-accent) 55%, transparent) inset, 0 0 0 4px color-mix(in srgb, var(--hb-xi7-accent) 14%, transparent); }
.hb-xi7[data-open="true"] .hb-xi7-links { max-width: 0; opacity: 0; transform: translateX(-12px); pointer-events: none; }
.hb-xi7-field svg { flex: none; width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
.hb-xi7-input { flex: 1; min-width: 0; height: 100%; margin: 0; padding: 0; border: 0; outline: none; background: transparent; color: #fafafa; font: inherit; font-size: 14px; }
.hb-xi7-input::placeholder { color: #6e6e78; }
.hb-xi7-keys { display: inline-flex; flex: none; gap: 3px; }
.hb-xi7-keys kbd { display: grid; place-items: center; min-width: 22px; height: 22px; padding: 0 5px; border-radius: 6px; background: #1d1d21; box-shadow: 0 -1px 0 rgba(0,0,0,.4) inset, 0 0 0 1px #2a2a30 inset; color: #9d9da6; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; }
.hb-xi7-drop {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 5;
  max-height: 360px;
  padding: 6px;
  overflow-y: auto;
  border-radius: 14px;
  background: #111113;
  box-shadow: 0 0 0 1px #24242a inset, 0 30px 60px -24px rgba(0,0,0,.9), 0 10px 20px -10px rgba(0,0,0,.6);
  transform-origin: 50% 0;
  animation: hb-xi7-in .32s var(--hb-xi7-ease) both;
}
.hb-xi7-group { padding: 10px 10px 6px; color: #6e6e78; font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-xi7-opt { position: relative; display: flex; align-items: center; gap: 12px; height: 42px; padding: 0 10px; border-radius: 9px; color: #d4d4d8; font-size: 14px; cursor: pointer; transition: background-color .12s ease, color .12s ease; }
.hb-xi7-opt[aria-selected="true"] { background: rgba(255,255,255,.06); color: #fff; }
.hb-xi7-opt[aria-selected="true"]::before { content: ""; position: absolute; left: 0; top: 10px; bottom: 10px; width: 2px; border-radius: 2px; background: var(--hb-xi7-accent); box-shadow: 0 0 10px var(--hb-xi7-accent); }
.hb-xi7-oi { display: grid; flex: none; place-items: center; width: 26px; height: 26px; border-radius: 7px; background: #1a1a1e; box-shadow: 0 0 0 1px #26262b inset; color: #9d9da6; }
.hb-xi7-opt[aria-selected="true"] .hb-xi7-oi { color: var(--hb-xi7-accent); }
.hb-xi7-oi svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-xi7-ol { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.hb-xi7-ol mark { background: none; color: var(--hb-xi7-accent); font-weight: 600; }
.hb-xi7-hint { color: #6e6e78; font-size: 12.5px; }
.hb-xi7-sc { display: inline-flex; gap: 3px; }
.hb-xi7-sc kbd { display: grid; place-items: center; min-width: 20px; height: 20px; padding: 0 4px; border-radius: 5px; background: #1a1a1e; color: #8b8b94; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; }
.hb-xi7-empty { padding: 26px 12px; color: #8b8b94; font-size: 13.5px; text-align: center; }
.hb-xi7-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 10px 8px; }
.hb-xi7-chip { display: inline-flex; align-items: center; gap: 6px; height: 28px; margin: 0; padding: 0 10px; border: 0; border-radius: 999px; background: #1a1a1e; color: #b4b4bc; font: inherit; font-size: 12.5px; cursor: pointer; box-shadow: 0 0 0 1px #26262b inset; transition: background-color .15s ease, color .15s ease; }
.hb-xi7-chip:hover { background: #222227; color: #fff; }
.hb-xi7-chip svg { width: 11px; height: 11px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
.hb-xi7-foot { display: flex; gap: 16px; margin-top: 4px; padding: 10px 10px 4px; border-top: 1px solid #1e1e22; color: #6e6e78; font-size: 11.5px; }
.hb-xi7-foot span { display: inline-flex; align-items: center; gap: 6px; }
.hb-xi7-foot kbd { padding: 1px 5px; border-radius: 4px; background: #1a1a1e; color: #9d9da6; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; }
.hb-xi7-end { display: flex; flex: none; align-items: center; gap: 8px; }
.hb-xi7-bell { position: relative; display: grid; place-items: center; width: 36px; height: 36px; margin: 0; padding: 0; border: 0; border-radius: 9px; background: transparent; color: #9d9da6; cursor: pointer; transition: background-color .2s ease, color .2s ease; }
.hb-xi7-bell:hover { background: rgba(255,255,255,.05); color: #fff; }
.hb-xi7-bell svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.hb-xi7-bell::after { content: ""; position: absolute; top: 8px; right: 9px; width: 7px; height: 7px; border-radius: 50%; background: var(--hb-xi7-accent); box-shadow: 0 0 0 2px #0a0a0b; }
.hb-xi7-av { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #f472b6, #a78bfa); color: #fff; font-size: 12px; font-weight: 700; box-shadow: 0 0 0 2px #0a0a0b, 0 0 0 3px #26262b; }
.hb-xi7-mobq { display: none; }
.hb-xi7 a:focus-visible, .hb-xi7 button:focus-visible { outline: 2px solid var(--hb-xi7-accent); outline-offset: 2px; }
.hb-xi7-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.hb-xi7-stage { position: relative; z-index: 1; height: 620px; overflow: hidden; }
.hb-xi7-app { display: grid; grid-template-columns: 220px 1fr; max-width: 1140px; margin: 0 auto; height: 100%; }
.hb-xi7-side { padding: 24px 20px; border-right: 1px solid #18181b; }
.hb-xi7-side div { height: 10px; margin-bottom: 18px; border-radius: 5px; background: #17171a; }
.hb-xi7-main { padding: 28px 32px; }
.hb-xi7-main h2 { margin: 0 0 6px; font-size: 24px; font-weight: 600; letter-spacing: -.03em; }
.hb-xi7-main p { margin: 0 0 24px; color: #8b8b94; font-size: 14px; }
.hb-xi7-rows { display: grid; gap: 10px; }
.hb-xi7-r { display: grid; grid-template-columns: 10px 1fr 120px 80px; align-items: center; gap: 14px; height: 52px; padding: 0 16px; border: 1px solid #18181b; border-radius: 12px; background: #0d0d0f; color: #b4b4bc; font-size: 13.5px; }
.hb-xi7-r i { width: 8px; height: 8px; border-radius: 50%; font-style: normal; }
.hb-xi7-r small { color: #6e6e78; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; }
@keyframes hb-xi7-in { from { opacity: 0; transform: translateY(-6px) scale(.98); } to { opacity: 1; transform: none; } }
@container (max-width: 760px) {
  .hb-xi7-links, .hb-xi7-bell { display: none; }
  .hb-xi7-row { gap: 10px; padding: 0 14px; height: 56px; }
  .hb-xi7-field { width: 38px; padding: 0; justify-content: center; }
  .hb-xi7-field .hb-xi7-input, .hb-xi7-field .hb-xi7-keys { display: none; }
  .hb-xi7[data-open="true"] .hb-xi7-brand { max-width: 0; opacity: 0; overflow: hidden; transform: translateX(-10px); }
  .hb-xi7[data-open="true"] .hb-xi7-field { padding: 0 10px 0 12px; justify-content: flex-start; }
  .hb-xi7[data-open="true"] .hb-xi7-field .hb-xi7-input { display: block; }
  .hb-xi7[data-open="true"] .hb-xi7-end { display: none; }
  .hb-xi7-mobq { display: none; }
  .hb-xi7[data-open="true"] .hb-xi7-mobq { display: inline-flex; flex: none; height: 30px; margin: 0; padding: 0 10px; border: 0; border-radius: 8px; background: #1a1a1e; color: #d4d4d8; font: inherit; font-size: 13px; align-items: center; cursor: pointer; }
  .hb-xi7-box { position: static; }
  .hb-xi7-drop { position: absolute; top: calc(100% + 1px); left: 8px; right: 8px; }
  .hb-xi7-app { grid-template-columns: 1fr; }
  .hb-xi7-side { display: none; }
  .hb-xi7-r { grid-template-columns: 10px 1fr 70px; }
  .hb-xi7-r small:last-child { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xi7 *, .hb-xi7 *::before, .hb-xi7 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultLinks: NavbarCommandLink[] = [
  { label: "Projects", href: "#" },
  { label: "Deployments", href: "#" },
  { label: "Analytics", href: "#" },
  { label: "Settings", href: "#" },
];

const defaultItems: NavbarCommandItem[] = [
  { id: "p1", label: "relay-web", group: "Projects", hint: "Production · 2m ago" },
  { id: "p2", label: "relay-api", group: "Projects", hint: "Preview · 18m ago" },
  { id: "p3", label: "docs-site", group: "Projects", hint: "Production · 3d ago" },
  { id: "d1", label: "Deploy relay-web to production", group: "Actions", shortcut: "D" },
  { id: "d2", label: "Roll back last deployment", group: "Actions", shortcut: "R" },
  { id: "d3", label: "Invite a teammate", group: "Actions", shortcut: "I" },
  { id: "d4", label: "Open deployment logs", group: "Actions", shortcut: "L" },
  { id: "g1", label: "Domains", group: "Settings", hint: "Settings" },
  { id: "g2", label: "Environment variables", group: "Settings", hint: "Settings" },
  { id: "g3", label: "Billing and usage", group: "Settings", hint: "Team" },
];

const groupIcons: Record<string, React.ReactNode> = {
  Projects: <path d="M2.5 4.5h4l1.5 1.5h5.5v6.5h-11z" />,
  Actions: <path d="M8.5 2L4 9h4l-.5 5L12 7H8z" />,
  Settings: <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8 1.8v1.7M8 12.5v1.7M1.8 8h1.7M12.5 8h1.7M3.6 3.6l1.2 1.2M11.2 11.2l1.2 1.2M3.6 12.4l1.2-1.2M11.2 4.8l1.2-1.2" />,
};

function highlight(label: string, q: string) {
  if (!q) return label;
  const at = label.toLowerCase().indexOf(q.toLowerCase());
  if (at < 0) return label;
  return (
    <>
      {label.slice(0, at)}
      <mark>{label.slice(at, at + q.length)}</mark>
      {label.slice(at + q.length)}
    </>
  );
}

export function NavbarCommand({
  brand = "Relay",
  links = defaultLinks,
  items = defaultItems,
  recent = ["relay-web", "Environment variables", "Roll back"],
  placeholder = "Search or jump to...",
  open,
  defaultOpen = false,
  onOpenChange,
  defaultQuery = "",
  onSelect,
  user = { name: "Maya Chen" },
  accent = "#a78bfa",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavbarCommandProps) {
  const uid = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const rootRef = React.useRef<HTMLElement>(null);
  const [inner, setInner] = React.useState(defaultOpen);
  const [query, setQuery] = React.useState(defaultQuery);
  const [cursor, setCursor] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const isOpen = open ?? inner;

  const setOpen = React.useCallback(
    (v: boolean) => {
      if (open === undefined) setInner(v);
      onOpenChange?.(v);
    },
    [open, onOpenChange],
  );

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((it) => it.label.toLowerCase().includes(q) || it.group.toLowerCase().includes(q)) : items.slice(0, 6);
  }, [items, query]);

  const { groups, ordered } = React.useMemo(() => {
    const map = new Map<string, NavbarCommandItem[]>();
    results.forEach((it) => map.set(it.group, [...(map.get(it.group) ?? []), it]));
    let k = 0;
    const out = [...map].map(([group, list]) => [group, list.map((it) => ({ it, idx: k++ }))] as const);
    return { groups: out, ordered: out.flatMap(([, list]) => list.map((x) => x.it)) };
  }, [results]);

  const active = Math.min(cursor, Math.max(0, ordered.length - 1));

  const choose = (it: NavbarCommandItem) => {
    setPicked(it.label);
    onSelect?.(it);
    setQuery("");
    setCursor(0);
    setOpen(false);
    inputRef.current?.blur();
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) setOpen(true);
      const n = ordered.length || 1;
      setCursor((active + (e.key === "ArrowDown" ? 1 : -1) + n) % n);
    } else if (e.key === "Enter") {
      const it = ordered[active];
      if (it) {
        e.preventDefault();
        choose(it);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (query) setQuery("");
      else {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const el = rootRef.current?.querySelector<HTMLElement>(`[data-hb-xi7-opt="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active, isOpen]);

  const initials = user ? user.name.split(" ").map((p) => p[0]).join("").slice(0, 2) : "";

  return (
    <header
      ref={rootRef}
      className={`hb-xi7 ${className}`}
      data-open={isOpen ? "true" : "false"}
      style={{ "--hb-xi7-accent": accent, ...style } as React.CSSProperties}
      onBlur={(e) => {
        if (isOpen && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      {...rest}
    >
      <style href="hb-navbar-command" precedence="default">
        {css}
      </style>
      <div className="hb-xi7-bar">
        <nav className="hb-xi7-row" aria-label="Main">
          <a href="#" className="hb-xi7-brand" aria-label={`${brand} home`}>
            <span className="hb-xi7-mark" aria-hidden="true">
              <svg viewBox="0 0 12 12">
                <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" />
              </svg>
            </span>
            {brand}
          </a>
          <ul className="hb-xi7-links">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hb-xi7-link" tabIndex={isOpen ? -1 : undefined}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hb-xi7-box">
            <div
              className="hb-xi7-field"
              onClick={() => {
                setOpen(true);
                inputRef.current?.focus();
              }}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" />
              </svg>
              <input
                ref={inputRef}
                className="hb-xi7-input"
                role="combobox"
                aria-expanded={isOpen}
                aria-controls={`${uid}-list`}
                aria-activedescendant={isOpen && ordered[active] ? `${uid}-o${active}` : undefined}
                aria-autocomplete="list"
                aria-label="Search"
                placeholder={placeholder}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                  if (!isOpen) setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKey}
              />
              {!isOpen && (
                <span className="hb-xi7-keys" aria-hidden="true">
                  <kbd>⌘</kbd>
                  <kbd>K</kbd>
                </span>
              )}
            </div>
            {isOpen && (
              <div className="hb-xi7-drop" onMouseDown={(e) => e.preventDefault()}>
                <div id={`${uid}-list`} role="listbox" aria-label="Results">
                  {!query && recent.length > 0 && (
                    <>
                      <div className="hb-xi7-group">Recent</div>
                      <div className="hb-xi7-chips">
                        {recent.map((r) => (
                          <button
                            key={r}
                            type="button"
                            className="hb-xi7-chip"
                            tabIndex={-1}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setQuery(r);
                              inputRef.current?.focus();
                            }}
                          >
                            <svg viewBox="0 0 12 12" aria-hidden="true">
                              <path d="M6 2.5a3.5 3.5 0 1 1-3.3 2.3M2.5 2v2.8h2.8" />
                            </svg>
                            {r}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {groups.map(([group, list]) => (
                    <div key={group} role="group" aria-label={group}>
                      <div className="hb-xi7-group" aria-hidden="true">
                        {group}
                      </div>
                      {list.map(({ it, idx }) => {
                        return (
                          <div
                            key={it.id}
                            id={`${uid}-o${idx}`}
                            role="option"
                            aria-selected={idx === active}
                            data-hb-xi7-opt={idx}
                            className="hb-xi7-opt"
                            onMouseDown={(e) => e.preventDefault()}
                            onPointerMove={() => idx !== active && setCursor(idx)}
                            onClick={() => choose(it)}
                          >
                            <span className="hb-xi7-oi" aria-hidden="true">
                              <svg viewBox="0 0 16 16">{groupIcons[it.group] ?? groupIcons.Projects}</svg>
                            </span>
                            <span className="hb-xi7-ol">{highlight(it.label, query.trim())}</span>
                            {it.hint && <span className="hb-xi7-hint">{it.hint}</span>}
                            {it.shortcut && (
                              <span className="hb-xi7-sc" aria-hidden="true">
                                <kbd>G</kbd>
                                <kbd>{it.shortcut}</kbd>
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  {results.length === 0 && <div className="hb-xi7-empty">No results for &quot;{query}&quot;. Try a project name or an action.</div>}
                </div>
                <div className="hb-xi7-foot" aria-hidden="true">
                  <span>
                    <kbd>↑</kbd>
                    <kbd>↓</kbd> navigate
                  </span>
                  <span>
                    <kbd>↵</kbd> open
                  </span>
                  <span>
                    <kbd>esc</kbd> close
                  </span>
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            className="hb-xi7-mobq"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
          >
            Cancel
          </button>
          <div className="hb-xi7-end">
            <button type="button" className="hb-xi7-bell" aria-label="Notifications, 3 unread">
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <path d="M4.5 12.5V8a4.5 4.5 0 0 1 9 0v4.5l1.2 1.5H3.3zM7.3 15.5a1.8 1.8 0 0 0 3.4 0" />
              </svg>
            </button>
            {user && (
              <span className="hb-xi7-av" role="img" aria-label={user.name}>
                {initials}
              </span>
            )}
          </div>
        </nav>
        <span className="hb-xi7-sr" aria-live="polite">
          {isOpen ? `${results.length} results` : picked ? `Opened ${picked}` : ""}
        </span>
      </div>
      {showBackdrop && (
        <div className="hb-xi7-stage" aria-hidden="true">
          <div className="hb-xi7-app">
            <div className="hb-xi7-side">
              <div style={{ width: "70%" }} />
              <div style={{ width: "54%" }} />
              <div style={{ width: "82%" }} />
              <div style={{ width: "60%" }} />
              <div style={{ width: "48%" }} />
            </div>
            <div className="hb-xi7-main">
              <h2>Deployments</h2>
              <p>Every push to main ships to production after checks pass.</p>
              <div className="hb-xi7-rows">
                <div className="hb-xi7-r">
                  <i style={{ background: "#34d399" }} />
                  <span>feat: streaming checkout summary</span>
                  <small>relay-web</small>
                  <small>2m ago</small>
                </div>
                <div className="hb-xi7-r">
                  <i style={{ background: "#f5a524" }} />
                  <span>fix: retry webhook signature check</span>
                  <small>relay-api</small>
                  <small>18m ago</small>
                </div>
                <div className="hb-xi7-r">
                  <i style={{ background: "#34d399" }} />
                  <span>chore: bump edge runtime to 4.2</span>
                  <small>relay-web</small>
                  <small>1h ago</small>
                </div>
                <div className="hb-xi7-r">
                  <i style={{ background: "#f87171" }} />
                  <span>feat: team billing dashboard</span>
                  <small>relay-web</small>
                  <small>3h ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
