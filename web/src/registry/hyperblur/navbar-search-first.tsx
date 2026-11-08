"use client";

import * as React from "react";

export interface NavbarSearchFirstItem {
  title: string;
  section: string;
  href: string;
  hint?: string;
}

export interface NavbarSearchFirstProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onSelect"> {
  brand?: string;
  placeholder?: string;
  items?: NavbarSearchFirstItem[];
  recent?: string[];
  links?: { label: string; href: string }[];
  signIn?: { label: string; href: string } | null;
  defaultQuery?: string;
  defaultOpen?: boolean;
  onQueryChange?: (query: string) => void;
  onSelect?: (item: NavbarSearchFirstItem) => void;
  accent?: string;
  showBackdrop?: boolean;
}

const defaultItems: NavbarSearchFirstItem[] = [
  { title: "Install the CLI", section: "Guides", href: "#install", hint: "2 min read" },
  { title: "Authentication with passkeys", section: "Guides", href: "#passkeys", hint: "Auth" },
  { title: "Deploying to the edge", section: "Guides", href: "#edge", hint: "Runtime" },
  { title: "Rate limits and quotas", section: "Guides", href: "#limits", hint: "Platform" },
  { title: "Webhooks", section: "API", href: "#webhooks", hint: "POST /hooks" },
  { title: "Create a payment intent", section: "API", href: "#intents", hint: "POST /v2/intents" },
  { title: "List invoices", section: "API", href: "#invoices", hint: "GET /v2/invoices" },
  { title: "Refund a charge", section: "API", href: "#refunds", hint: "POST /v2/refunds" },
  { title: "Checkout button", section: "Components", href: "#checkout-button", hint: "React" },
  { title: "Payment element", section: "Components", href: "#payment-element", hint: "React" },
  { title: "Address autocomplete", section: "Components", href: "#address", hint: "React" },
  { title: "Invoice PDF template", section: "Components", href: "#pdf", hint: "Server" },
];

const defaultRecent = ["webhook signatures", "test cards", "idempotency keys"];

const ease = "cubic-bezier(.22,1,.36,1)";

const css = `
.hb-xj4 {
  --hb-xj4-accent: #a78bfa;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xj4 *, .hb-xj4 *::before, .hb-xj4 *::after { box-sizing: border-box; }
.hb-xj4[data-backdrop="true"] { min-height: 620px; overflow: hidden; background: #0a0a0a; }
.hb-xj4-bar {
  position: relative;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 64px;
  padding: 0 20px;
  border-bottom: 1px solid #1f1f1f;
  background: rgba(10,10,10,.86);
  backdrop-filter: blur(14px) saturate(150%);
}
.hb-xj4-brand { display: inline-flex; align-items: center; gap: 10px; flex: none; color: #ededed; font-family: var(--font-grotesk, inherit); font-size: 16px; font-weight: 600; letter-spacing: -.02em; text-decoration: none; }
.hb-xj4-logo { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; background: #ededed; color: #0a0a0a; }
.hb-xj4-logo svg { width: 16px; height: 16px; }
.hb-xj4-zone { position: relative; flex: 1; display: flex; justify-content: center; min-width: 0; }
.hb-xj4-field {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 460px;
  height: 42px;
  padding: 0 8px 0 14px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: linear-gradient(180deg, #161616, #121212);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 1px 2px rgba(0,0,0,.4);
  transition: max-width .55s ${ease}, border-color .25s ease, box-shadow .3s ease, background-color .3s ease;
}
.hb-xj4-field:hover { border-color: #333; }
.hb-xj4[data-open="true"] .hb-xj4-field {
  max-width: 680px;
  border-color: color-mix(in srgb, var(--hb-xj4-accent) 55%, #262626);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 0 0 4px color-mix(in srgb, var(--hb-xj4-accent) 16%, transparent), 0 20px 40px -20px rgba(0,0,0,.8);
}
.hb-xj4-field > svg { width: 17px; height: 17px; flex: none; fill: none; stroke: #8f8f8f; stroke-width: 2; stroke-linecap: round; transition: stroke .2s ease; }
.hb-xj4[data-open="true"] .hb-xj4-field > svg { stroke: var(--hb-xj4-accent); }
.hb-xj4-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  outline: none;
  background: none;
  color: #ededed;
  font: inherit;
  font-size: 14.5px;
}
.hb-xj4-input::placeholder { color: #6f6f6f; }
.hb-xj4-input::-webkit-search-cancel-button { display: none; }
.hb-xj4-kbd {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 7px;
  border: 1px solid #2c2c2c;
  border-bottom-width: 2px;
  border-radius: 6px;
  background: #1b1b1b;
  color: #a1a1a1;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  white-space: nowrap;
}
.hb-xj4-clear {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border: 0;
  border-radius: 7px;
  background: #222;
  color: #a1a1a1;
  cursor: pointer;
}
.hb-xj4-clear svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; }
.hb-xj4-side { display: flex; align-items: center; gap: 4px; flex: none; overflow: hidden; max-width: 420px; transition: max-width .55s ${ease}, opacity .3s ease; }
.hb-xj4[data-open="true"] .hb-xj4-side { max-width: 0; opacity: 0; }
.hb-xj4-link { height: 34px; padding: 0 12px; border-radius: 8px; color: #a1a1a1; font-size: 14px; line-height: 34px; text-decoration: none; white-space: nowrap; transition: color .2s ease, background-color .2s ease; }
.hb-xj4-link:hover { color: #ededed; background: rgba(255,255,255,.05); }
.hb-xj4-sign { height: 34px; padding: 0 14px; border-radius: 8px; background: #ededed; color: #0a0a0a; font-size: 14px; font-weight: 600; line-height: 34px; text-decoration: none; white-space: nowrap; margin-left: 6px; }
.hb-xj4-mbtn, .hb-xj4-cancel { display: none; }
.hb-xj4-panel {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  width: 100%;
  max-width: 680px;
  border: 1px solid #262626;
  border-radius: 16px;
  background: linear-gradient(180deg, #151515, #101010);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 30px 70px -20px rgba(0,0,0,.9);
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -6px) scale(.985);
  transform-origin: 50% 0;
  transition: opacity .2s ease, transform .35s ${ease}, visibility 0s linear .35s;
}
.hb-xj4[data-open="true"] .hb-xj4-panel { opacity: 1; visibility: visible; transform: translate(-50%, 0) scale(1); transition: opacity .2s ease, transform .35s ${ease}, visibility 0s; }
.hb-xj4-scopes { display: flex; gap: 6px; padding: 12px 12px 10px; border-bottom: 1px solid #1f1f1f; overflow-x: auto; scrollbar-width: none; }
.hb-xj4-scope {
  height: 28px;
  padding: 0 11px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-size: 12.5px;
  white-space: nowrap;
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease, border-color .2s ease;
}
.hb-xj4-scope:hover { color: #ededed; border-color: #333; }
.hb-xj4-scope[aria-checked="true"] { color: #0a0a0a; background: #ededed; border-color: #ededed; }
.hb-xj4-scope span { margin-left: 6px; opacity: .55; font-variant-numeric: tabular-nums; }
.hb-xj4-list { max-height: 320px; margin: 0; padding: 6px; list-style: none; overflow-y: auto; overscroll-behavior: contain; }
.hb-xj4-group { padding: 10px 10px 6px; color: #6b6b6b; font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-xj4-opt {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 44px;
  padding: 0 10px;
  border-radius: 10px;
  color: #d4d4d4;
  font-size: 14px;
  cursor: pointer;
}
.hb-xj4-opt[data-active="true"] { background: rgba(255,255,255,.06); color: #fff; }
.hb-xj4-opt[data-active="true"]::before { content: ""; position: absolute; left: 0; top: 12px; bottom: 12px; width: 2px; border-radius: 2px; background: var(--hb-xj4-accent); }
.hb-xj4-ico { display: grid; place-items: center; width: 28px; height: 28px; flex: none; border: 1px solid #262626; border-radius: 8px; background: #181818; color: #a1a1a1; }
.hb-xj4-ico svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-xj4-t { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xj4-t mark { background: none; color: var(--hb-xj4-accent); font-weight: 600; }
.hb-xj4-hint { color: #6b6b6b; font-family: var(--font-mono, monospace); font-size: 11.5px; white-space: nowrap; }
.hb-xj4-enter { display: none; color: #8f8f8f; }
.hb-xj4-opt[data-active="true"] .hb-xj4-enter { display: inline-flex; }
.hb-xj4-opt[data-active="true"] .hb-xj4-hint { display: none; }
.hb-xj4-empty { padding: 28px 16px; color: #8f8f8f; font-size: 14px; text-align: center; }
.hb-xj4-empty b { color: #ededed; font-weight: 500; }
.hb-xj4-foot { display: flex; gap: 16px; padding: 10px 14px; border-top: 1px solid #1f1f1f; color: #6b6b6b; font-size: 12px; }
.hb-xj4-foot span { display: inline-flex; align-items: center; gap: 6px; }
.hb-xj4-foot .hb-xj4-kbd { height: 20px; padding: 0 5px; font-size: 10.5px; }
.hb-xj4 a:focus-visible, .hb-xj4 button:focus-visible { outline: 2px solid var(--hb-xj4-accent); outline-offset: 2px; }
@container (max-width: 640px) {
  .hb-xj4-bar { gap: 10px; padding: 0 14px; }
  .hb-xj4-side .hb-xj4-link { display: none; }
  .hb-xj4-zone { justify-content: flex-end; }
  .hb-xj4-field { display: none; }
  .hb-xj4-mbtn {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border: 1px solid #262626;
    border-radius: 10px;
    background: #141414;
    color: #ededed;
    cursor: pointer;
  }
  .hb-xj4-mbtn svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
  .hb-xj4[data-open="true"] .hb-xj4-zone {
    position: absolute;
    inset: 0;
    z-index: 2;
    align-items: center;
    gap: 8px;
    padding: 0 10px 0 12px;
    background: #0c0c0c;
    animation: hb-xj4-cover .4s ${ease};
  }
  .hb-xj4[data-open="true"] .hb-xj4-field { display: flex; max-width: none; height: 40px; }
  .hb-xj4[data-open="true"] .hb-xj4-mbtn { display: none; }
  .hb-xj4[data-open="true"] .hb-xj4-cancel {
    display: block;
    height: 40px;
    padding: 0 6px;
    border: 0;
    background: none;
    color: #ededed;
    font: inherit;
    font-size: 14px;
    cursor: pointer;
  }
  .hb-xj4-field .hb-xj4-kbd { display: none; }
  .hb-xj4-panel { position: fixed; top: 64px; left: 0; right: 0; max-width: none; border-radius: 0 0 16px 16px; border-left: 0; border-right: 0; transform: translateY(-6px); }
  .hb-xj4[data-backdrop="true"] .hb-xj4-panel { position: absolute; top: 64px; }
  .hb-xj4[data-open="true"] .hb-xj4-panel { transform: none; }
  .hb-xj4-foot { display: none; }
}
@keyframes hb-xj4-cover { from { clip-path: inset(0 0 0 calc(100% - 52px) round 10px); } to { clip-path: inset(0 0 0 0 round 0); } }
.hb-xj4-page { position: relative; z-index: 1; max-width: 920px; margin: 0 auto; padding: 56px 20px; display: grid; grid-template-columns: 200px 1fr; gap: 40px; }
.hb-xj4-toc { display: grid; gap: 10px; align-content: start; }
.hb-xj4-toc span { height: 10px; border-radius: 4px; background: #1a1a1a; }
.hb-xj4-toc span:nth-child(3n) { width: 70%; }
.hb-xj4-toc span:nth-child(2) { background: color-mix(in srgb, var(--hb-xj4-accent) 40%, #1a1a1a); width: 80%; }
.hb-xj4-doc h2 { margin: 0; font-size: 32px; font-weight: 600; letter-spacing: -.03em; }
.hb-xj4-doc p { margin: 12px 0 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; max-width: 560px; }
.hb-xj4-code { margin-top: 22px; padding: 16px 18px; border: 1px solid #1f1f1f; border-radius: 12px; background: #0f0f0f; color: #a1a1a1; font-family: var(--font-mono, monospace); font-size: 13px; line-height: 1.7; }
.hb-xj4-code b { color: var(--hb-xj4-accent); font-weight: 500; }
@container (max-width: 640px) { .hb-xj4-page { grid-template-columns: 1fr; padding: 32px 16px; } .hb-xj4-toc { display: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xj4 *, .hb-xj4 *::before, .hb-xj4 *::after { transition: none !important; animation: none !important; }
}
`;

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" />
      <path d="m13.2 13.2 3.3 3.3" />
    </svg>
  );
}

function SectionIcon({ section }: { section: string }) {
  if (section === "API")
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M5.5 4 2 8l3.5 4M10.5 4 14 8l-3.5 4" />
      </svg>
    );
  if (section === "Components")
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" />
        <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" />
        <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" />
        <rect x="9" y="9" width="4.5" height="4.5" rx="2.25" />
      </svg>
    );
  if (section === "Recent")
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" />
        <path d="M8 5v3l2 1.5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 2.5h6l3 3v8h-9z" />
      <path d="M6 8.5h4M6 11h3" />
    </svg>
  );
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const at = text.toLowerCase().indexOf(q.toLowerCase());
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark>{text.slice(at, at + q.length)}</mark>
      {text.slice(at + q.length)}
    </>
  );
}

export function NavbarSearchFirst({
  brand = "Ledgerline",
  placeholder = "Search docs, API and components",
  items = defaultItems,
  recent = defaultRecent,
  links = [
    { label: "Docs", href: "#docs" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#changelog" },
  ],
  signIn = { label: "Dashboard", href: "#dashboard" },
  defaultQuery = "",
  defaultOpen = false,
  onQueryChange,
  onSelect,
  accent = "#a78bfa",
  showBackdrop = true,
  className,
  style,
  ...rest
}: NavbarSearchFirstProps) {
  const [query, setQuery] = React.useState(defaultQuery);
  const [open, setOpen] = React.useState(defaultOpen);
  const [scope, setScope] = React.useState("All");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const mbtnRef = React.useRef<HTMLButtonElement>(null);
  const baseId = React.useId();
  const listId = `${baseId}-list`;

  const sections = React.useMemo(() => Array.from(new Set(items.map((i) => i.section))), [items]);
  const q = query.trim();

  const results = React.useMemo(() => {
    if (!q) {
      return recent.map((r) => ({ title: r, section: "Recent", href: `#search=${encodeURIComponent(r)}` }) as NavbarSearchFirstItem);
    }
    const lower = q.toLowerCase();
    return items
      .filter((i) => (scope === "All" || i.section === scope) && (i.title.toLowerCase().includes(lower) || i.section.toLowerCase().includes(lower) || (i.hint ?? "").toLowerCase().includes(lower)))
      .slice(0, 8);
  }, [q, items, recent, scope]);

  const counts = React.useMemo(() => {
    const lower = q.toLowerCase();
    const map: Record<string, number> = {};
    for (const i of items) {
      if (q && !i.title.toLowerCase().includes(lower) && !i.section.toLowerCase().includes(lower) && !(i.hint ?? "").toLowerCase().includes(lower)) continue;
      map[i.section] = (map[i.section] ?? 0) + 1;
      map.All = (map.All ?? 0) + 1;
    }
    return map;
  }, [q, items]);

  const active = Math.min(activeIndex, Math.max(0, results.length - 1));

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.querySelector(".hb-xj4-zone")?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const change = (v: string) => {
    setQuery(v);
    setActiveIndex(0);
    setOpen(true);
    onQueryChange?.(v);
  };

  const choose = (item: NavbarSearchFirstItem) => {
    if (item.section === "Recent") {
      change(item.title);
      inputRef.current?.focus();
      return;
    }
    onSelect?.(item);
    setOpen(false);
    inputRef.current?.blur();
  };

  const close = () => {
    setOpen(false);
    inputRef.current?.blur();
    if (mbtnRef.current && mbtnRef.current.offsetParent !== null) mbtnRef.current.focus();
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      if (!results.length) return;
      setActiveIndex((active + (e.key === "ArrowDown" ? 1 : -1) + results.length) % results.length);
    } else if (e.key === "Enter") {
      const item = results[active];
      if (open && item) {
        e.preventDefault();
        choose(item);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (query) change("");
      else close();
    }
  };

  const openMobile = () => {
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <header
      ref={rootRef}
      className={["hb-xj4", className].filter(Boolean).join(" ")}
      data-open={open ? "true" : "false"}
      data-backdrop={showBackdrop ? "true" : "false"}
      style={{ "--hb-xj4-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-navbar-search-first" precedence="default">
        {css}
      </style>
      <nav className="hb-xj4-bar" aria-label="Main">
        <a className="hb-xj4-brand" href="#top">
          <span className="hb-xj4-logo" aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M3 3h4v10H3zM9 6h4v7H9z" fill="currentColor" />
            </svg>
          </span>
          {brand}
        </a>
        <div className="hb-xj4-zone">
          <button ref={mbtnRef} type="button" className="hb-xj4-mbtn" aria-label="Search" onClick={openMobile}>
            <SearchIcon />
          </button>
          <div className="hb-xj4-field">
            <SearchIcon />
            <input
              ref={inputRef}
              className="hb-xj4-input"
              type="search"
              role="combobox"
              aria-label={placeholder}
              aria-expanded={open}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={open && results[active] ? `${baseId}-o${active}` : undefined}
              placeholder={placeholder}
              value={query}
              autoComplete="off"
              spellCheck={false}
              onChange={(e) => change(e.target.value)}
              onFocus={() => setOpen(true)}
              onKeyDown={onInputKey}
            />
            {query ? (
              <button type="button" className="hb-xj4-clear" aria-label="Clear search" onClick={() => { change(""); inputRef.current?.focus(); }}>
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="m3 3 6 6M9 3 3 9" />
                </svg>
              </button>
            ) : (
              <kbd className="hb-xj4-kbd">⌘ K</kbd>
            )}
          </div>
          <button type="button" className="hb-xj4-cancel" onClick={close}>
            Cancel
          </button>
          <div className="hb-xj4-panel">
            <div className="hb-xj4-scopes" role="radiogroup" aria-label="Search in">
              {["All", ...sections].map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={scope === s}
                  className="hb-xj4-scope"
                  onClick={() => {
                    setScope(s);
                    setActiveIndex(0);
                    inputRef.current?.focus();
                  }}
                >
                  {s}
                  <span>{counts[s] ?? 0}</span>
                </button>
              ))}
            </div>
            <ul className="hb-xj4-list" id={listId} role="listbox" aria-label="Results">
              {results.length === 0 && (
                <li className="hb-xj4-empty" role="presentation">
                  No results for <b>“{q}”</b>. Try a shorter term.
                </li>
              )}
              {results.map((item, i) => {
                const head = i === 0 || results[i - 1].section !== item.section;
                return (
                  <React.Fragment key={item.href + i}>
                    {head && (
                      <li className="hb-xj4-group" role="presentation">
                        {item.section === "Recent" ? "Recent searches" : item.section}
                      </li>
                    )}
                    <li
                      id={`${baseId}-o${i}`}
                      role="option"
                      aria-selected={i === active}
                      data-active={i === active ? "true" : "false"}
                      className="hb-xj4-opt"
                      onPointerMove={() => i !== active && setActiveIndex(i)}
                      onPointerDown={(e) => e.preventDefault()}
                      onClick={() => choose(item)}
                    >
                      <span className="hb-xj4-ico">
                        <SectionIcon section={item.section} />
                      </span>
                      <span className="hb-xj4-t">{highlight(item.title, q)}</span>
                      {item.hint && <span className="hb-xj4-hint">{item.hint}</span>}
                      <span className="hb-xj4-enter">
                        <kbd className="hb-xj4-kbd">↵</kbd>
                      </span>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
            <div className="hb-xj4-foot" aria-hidden="true">
              <span>
                <kbd className="hb-xj4-kbd">↑</kbd>
                <kbd className="hb-xj4-kbd">↓</kbd> navigate
              </span>
              <span>
                <kbd className="hb-xj4-kbd">↵</kbd> open
              </span>
              <span>
                <kbd className="hb-xj4-kbd">esc</kbd> close
              </span>
            </div>
          </div>
        </div>
        <div className="hb-xj4-side">
          {links.map((l) => (
            <a key={l.href} className="hb-xj4-link" href={l.href}>
              {l.label}
            </a>
          ))}
          {signIn && (
            <a className="hb-xj4-sign" href={signIn.href}>
              {signIn.label}
            </a>
          )}
        </div>
      </nav>
      {showBackdrop && (
        <div className="hb-xj4-page" aria-hidden="true">
          <div className="hb-xj4-toc">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hb-xj4-doc">
            <h2>Accept your first payment</h2>
            <p>Create a payment intent on your server, confirm it on the client and listen for the webhook that tells you the money arrived.</p>
            <div className="hb-xj4-code">
              <div>
                <b>const</b> intent = <b>await</b> ledger.intents.create({"{"}
              </div>
              <div>&nbsp;&nbsp;amount: 4900, currency: &quot;usd&quot;,</div>
              <div>{"}"});</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
