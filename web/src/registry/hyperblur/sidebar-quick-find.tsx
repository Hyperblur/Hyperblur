"use client";

import * as React from "react";

export interface SidebarQuickFindPage {
  id: string;
  label: string;
  keywords?: string[];
  badge?: string;
}

export interface SidebarQuickFindSection {
  id: string;
  label: string;
  pages: SidebarQuickFindPage[];
}

export interface SidebarQuickFindProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  sections?: SidebarQuickFindSection[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
  globalShortcut?: boolean;
  footer?: React.ReactNode;
  accent?: string;
}

const defaultSections: SidebarQuickFindSection[] = [
  {
    id: "account",
    label: "Account",
    pages: [
      { id: "profile", label: "Profile", keywords: ["avatar", "name", "email"] },
      { id: "security", label: "Security", keywords: ["password", "2fa", "sessions", "passkey"] },
      { id: "notifications", label: "Notifications", keywords: ["email", "digest", "push"] },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    pages: [
      { id: "members", label: "Members", keywords: ["invite", "roles", "seats"], badge: "8" },
      { id: "billing", label: "Billing", keywords: ["invoice", "card", "plan", "receipt"] },
      { id: "domains", label: "Domains", keywords: ["dns", "ssl", "custom domain"] },
    ],
  },
  {
    id: "developers",
    label: "Developers",
    pages: [
      { id: "api", label: "API tokens", keywords: ["keys", "secret", "token"] },
      { id: "webhooks", label: "Webhooks", keywords: ["events", "endpoint", "retry"] },
    ],
  },
];

const css = `
.hb-xk7 {
  --hb-xk7-a: #2f7bff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 8px;
  border-right: 1px solid #1f1f1f;
  background: #0e0e0e;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
}
.hb-xk7 *, .hb-xk7 *::before, .hb-xk7 *::after { box-sizing: border-box; }
.hb-xk7-search {
  position: relative;
  display: flex;
  flex: none;
  align-items: center;
  gap: 7px;
  height: 32px;
  margin: 0 2px 6px;
  padding: 0 6px 0 9px;
  border: 1px solid #262626;
  border-radius: 9px;
  background: linear-gradient(180deg, #141414, #111);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .03);
  color: #6f6f76;
  transition: border-color .2s ease, box-shadow .2s ease, color .2s ease;
}
.hb-xk7-search:focus-within { border-color: color-mix(in srgb, var(--hb-xk7-a) 65%, #262626); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xk7-a) 16%, transparent); color: var(--hb-xk7-a); }
.hb-xk7-search svg { flex: none; width: 14px; height: 14px; }
.hb-xk7-input { flex: 1; min-width: 0; height: 100%; margin: 0; padding: 0; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 12.5px; outline: none; }
.hb-xk7-input::placeholder { color: #5f5f66; }
.hb-xk7-input::-webkit-search-cancel-button { display: none; }
.hb-xk7-kbd { display: inline-grid; place-items: center; min-width: 18px; height: 18px; padding: 0 4px; border: 1px solid #2c2c2c; border-radius: 5px; background: #181818; color: #8f8f8f; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; }
.hb-xk7-clear { display: grid; place-items: center; width: 18px; height: 18px; margin: 0; padding: 0; border: 0; border-radius: 5px; background: #262626; color: #a1a1a1; cursor: pointer; animation: hb-xk7-pop .2s cubic-bezier(.22, 1, .36, 1); }
.hb-xk7-clear:hover { background: #333; color: #fff; }
.hb-xk7-clear:focus-visible { outline: 2px solid var(--hb-xk7-a); outline-offset: 1px; }
.hb-xk7-clear svg { width: 10px; height: 10px; }
.hb-xk7-body { position: relative; flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: none; }
.hb-xk7-body::-webkit-scrollbar { display: none; }
.hb-xk7-sec { display: grid; grid-template-rows: 1fr; transition: grid-template-rows .36s cubic-bezier(.22, 1, .36, 1), opacity .25s ease; }
.hb-xk7-sec[data-hidden="true"] { grid-template-rows: 0fr; opacity: 0; }
.hb-xk7-clip { min-height: 0; overflow: hidden; }
.hb-xk7-sh { display: flex; align-items: center; justify-content: space-between; height: 26px; padding: 6px 10px 0; color: #6f6f76; font-size: 10.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-xk7-sc { color: #55555c; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; font-weight: 500; letter-spacing: 0; text-transform: none; animation: hb-xk7-pop .25s cubic-bezier(.22, 1, .36, 1); }
.hb-xk7-list { margin: 0; padding: 0; list-style: none; }
.hb-xk7-li { display: grid; grid-template-rows: 1fr; transition: grid-template-rows .32s cubic-bezier(.22, 1, .36, 1), opacity .2s ease; }
.hb-xk7-li[data-hidden="true"] { grid-template-rows: 0fr; opacity: 0; }
.hb-xk7-li > div { min-height: 0; overflow: hidden; }
.hb-xk7-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 30px;
  margin: 1px 0;
  padding: 4px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #9a9aa1;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .14s ease, color .14s ease;
}
.hb-xk7-row:hover { background: rgba(255, 255, 255, .04); color: #ededed; }
.hb-xk7-row:focus-visible { outline: 2px solid var(--hb-xk7-a); outline-offset: -2px; }
.hb-xk7-row[data-first="true"] { background: rgba(255, 255, 255, .045); color: #ededed; }
.hb-xk7-row[aria-current="page"] { background: color-mix(in srgb, var(--hb-xk7-a) 14%, transparent); color: #fff; }
.hb-xk7-txt { display: flex; flex: 1; flex-direction: column; min-width: 0; }
.hb-xk7-name { overflow: hidden; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk7-name mark { border-radius: 3px; background: color-mix(in srgb, var(--hb-xk7-a) 30%, transparent); box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-xk7-a) 30%, transparent); color: #fff; }
.hb-xk7-why { display: flex; align-items: center; gap: 4px; color: #6f6f76; font-size: 10.5px; line-height: 15px; animation: hb-xk7-pop .22s cubic-bezier(.22, 1, .36, 1); }
.hb-xk7-why span { padding: 0 5px; border: 1px solid #2a2a2a; border-radius: 4px; color: #a1a1a1; }
.hb-xk7-badge { flex: none; padding: 0 6px; border-radius: 99px; background: #1f1f1f; color: #a1a1a1; font-size: 10.5px; line-height: 17px; }
.hb-xk7-enter { flex: none; color: #55555c; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; }
.hb-xk7-empty { padding: 18px 10px 0; color: #6f6f76; font-size: 12px; text-align: center; animation: hb-xk7-pop .25s cubic-bezier(.22, 1, .36, 1); }
.hb-xk7-empty b { color: #ededed; font-weight: 500; }
.hb-xk7-sugg { display: flex; flex-wrap: wrap; justify-content: center; gap: 5px; margin-top: 10px; }
.hb-xk7-chip { margin: 0; padding: 2px 9px; border: 1px solid #2a2a2a; border-radius: 99px; background: #151515; color: #a1a1a1; font: inherit; font-size: 11px; cursor: pointer; transition: border-color .15s ease, color .15s ease; }
.hb-xk7-chip:hover { border-color: #3a3a3a; color: #fff; }
.hb-xk7-chip:focus-visible { outline: 2px solid var(--hb-xk7-a); outline-offset: 1px; }
.hb-xk7-foot { display: flex; flex: none; align-items: center; justify-content: space-between; gap: 8px; height: 26px; margin-top: 4px; padding: 0 8px; border-top: 1px solid #1c1c1c; color: #55555c; font-size: 10.5px; }
@keyframes hb-xk7-pop { from { opacity: 0; transform: translateY(-3px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xk7 *, .hb-xk7 *::before, .hb-xk7 *::after { transition: none !important; animation: none !important; }
}
`;

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const at = text.toLowerCase().indexOf(q.toLowerCase());
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <mark>{text.slice(at, at + q.length)}</mark>
      {text.slice(at + q.length)}
    </>
  );
}

export function SidebarQuickFind({
  sections = defaultSections,
  active,
  defaultActive,
  onChange,
  query,
  defaultQuery = "",
  onQueryChange,
  placeholder = "Find a setting",
  suggestions = ["invoice", "password", "webhook"],
  globalShortcut = false,
  footer,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: SidebarQuickFindProps) {
  const [inner, setInner] = React.useState(defaultActive ?? sections[0]?.pages[0]?.id ?? "");
  const [innerQ, setInnerQ] = React.useState(defaultQuery);
  const current = active ?? inner;
  const q = (query ?? innerQ).trim();
  const raw = query ?? innerQ;
  const rootRef = React.useRef<HTMLElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function setQ(v: string) {
    if (query === undefined) setInnerQ(v);
    onQueryChange?.(v);
  }

  React.useEffect(() => {
    if (!globalShortcut) return;
    const onWin = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || !t) return;
      if (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT") return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onWin);
    return () => window.removeEventListener("keydown", onWin);
  }, [globalShortcut]);

  const lower = q.toLowerCase();
  const results = sections.map((s) => {
    const pages = s.pages.map((p) => {
      if (!lower) return { page: p, hit: true, why: "" };
      if (p.label.toLowerCase().includes(lower)) return { page: p, hit: true, why: "" };
      const kw = p.keywords?.find((k) => k.toLowerCase().includes(lower));
      return { page: p, hit: !!kw, why: kw ?? "" };
    });
    return { section: s, pages, count: pages.filter((p) => p.hit).length };
  });
  const total = results.reduce((n, r) => n + r.count, 0);
  const firstHit = lower ? results.flatMap((r) => r.pages.filter((p) => p.hit))[0]?.page.id : undefined;

  function pick(id: string) {
    if (active === undefined) setInner(id);
    onChange?.(id);
  }

  function visibleRows() {
    return Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[data-xk7-row]:not([tabindex="-1"])') ?? []);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const onInput = e.target === inputRef.current;
    if (onInput) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        visibleRows()[0]?.focus();
      } else if (e.key === "Enter" && firstHit) {
        e.preventDefault();
        pick(firstHit);
      } else if (e.key === "Escape" && raw) {
        e.preventDefault();
        setQ("");
      }
      return;
    }
    if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      inputRef.current?.focus();
      return;
    }
    const list = visibleRows();
    const at = list.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      list[Math.min(list.length - 1, at + 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (at === 0) inputRef.current?.focus();
      else list[at - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      inputRef.current?.focus();
    }
  }

  const vars = { "--hb-xk7-a": accent, ...style } as React.CSSProperties;

  return (
    <nav ref={rootRef} aria-label="Settings" className={`hb-xk7 ${className}`} style={vars} onKeyDown={handleKeyDown} {...rest}>
      <style href="hb-sidebar-quick-find" precedence="default">{css}</style>
      <label className="hb-xk7-search">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM10.8 10.8L14 14" />
        </svg>
        <input
          ref={inputRef}
          className="hb-xk7-input"
          type="search"
          value={raw}
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => setQ(e.target.value)}
        />
        {raw ? (
          <button
            type="button"
            className="hb-xk7-clear"
            aria-label="Clear search"
            onClick={() => {
              setQ("");
              inputRef.current?.focus();
            }}
          >
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" />
            </svg>
          </button>
        ) : (
          <kbd className="hb-xk7-kbd" aria-hidden="true">/</kbd>
        )}
      </label>
      <div className="hb-xk7-body">
        {results.map((r) => (
          <div key={r.section.id} className="hb-xk7-sec" data-hidden={r.count === 0} inert={r.count === 0}>
            <div className="hb-xk7-clip">
              <div className="hb-xk7-sh">
                <span>{r.section.label}</span>
                {lower ? (
                  <span key={`${r.count}/${r.pages.length}`} className="hb-xk7-sc">
                    {r.count} of {r.pages.length}
                  </span>
                ) : null}
              </div>
              <ul className="hb-xk7-list" role="list">
                {r.pages.map(({ page, hit, why }) => (
                  <li key={page.id} className="hb-xk7-li" data-hidden={!hit}>
                    <div>
                      <button
                        type="button"
                        className="hb-xk7-row"
                        data-xk7-row=""
                        data-first={page.id === firstHit}
                        tabIndex={hit ? 0 : -1}
                        aria-hidden={!hit}
                        aria-current={page.id === current ? "page" : undefined}
                        onClick={() => pick(page.id)}
                      >
                        <span className="hb-xk7-txt">
                          <span className="hb-xk7-name">
                            <Highlight text={page.label} q={q} />
                          </span>
                          {why ? (
                            <span className="hb-xk7-why">
                              matches <span>{why}</span>
                            </span>
                          ) : null}
                        </span>
                        {page.id === firstHit ? (
                          <span className="hb-xk7-enter" aria-hidden="true">enter</span>
                        ) : page.badge ? (
                          <span className="hb-xk7-badge">{page.badge}</span>
                        ) : null}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {lower && total === 0 ? (
          <div className="hb-xk7-empty" role="status">
            No settings match <b>{q}</b>
            {suggestions.length ? (
              <div className="hb-xk7-sugg">
                {suggestions.map((s) => (
                  <button key={s} type="button" className="hb-xk7-chip" onClick={() => setQ(s)}>
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {footer !== undefined ? (
        footer
      ) : (
        <div className="hb-xk7-foot" aria-live="polite">
          <span>{lower ? `${total} ${total === 1 ? "result" : "results"}` : `${sections.reduce((n, s) => n + s.pages.length, 0)} pages`}</span>
          <span>{lower ? "esc to clear" : "/ to search"}</span>
        </div>
      )}
    </nav>
  );
}
