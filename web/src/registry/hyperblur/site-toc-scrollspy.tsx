"use client";

import * as React from "react";

export interface TocItem {
  id: string;
  label: string;
  level?: 1 | 2;
}

export interface SiteTocScrollspyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "title"> {
  items?: TocItem[];
  root?: React.RefObject<HTMLElement | null> | HTMLElement | null;
  activeId?: string;
  defaultActiveId?: string;
  onActiveChange?: (id: string) => void;
  offset?: number;
  title?: string;
  sticky?: boolean;
  stickyTop?: number;
  accent?: string;
}

const defaultItems: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "install", label: "Installation" },
  { id: "usage", label: "Usage" },
  { id: "props", label: "Props", level: 2 },
  { id: "faq", label: "FAQ" },
];

const css = `
.hb-yf7 {
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.35;
  color: #ededed;
}
.hb-yf7 *, .hb-yf7 *::before, .hb-yf7 *::after { box-sizing: border-box; font-family: inherit; }
.hb-yf7[data-sticky="true"] { position: sticky; top: var(--hb-yf7-top, 24px); align-self: flex-start; }
.hb-yf7-title { display: flex; align-items: center; gap: 7px; margin: 0 0 10px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #8f8f8f; }
.hb-yf7-title svg { width: 12px; height: 12px; }
.hb-yf7-list { position: relative; }
.hb-yf7-ul { margin: 0; padding: 0; list-style: none; }
.hb-yf7-list::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: #262626; }
.hb-yf7-ind {
  position: absolute;
  left: -1px;
  top: 0;
  width: 3px;
  height: 0;
  border-radius: 3px;
  background: var(--hb-yf7-a, #2f7bff);
  box-shadow: 0 0 12px color-mix(in srgb, var(--hb-yf7-a, #2f7bff) 70%, transparent);
  opacity: 0;
  transform: translateY(0);
  transition: transform 0.35s cubic-bezier(0.34, 1.2, 0.5, 1), height 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease;
}
.hb-yf7-ind[data-ready="true"] { opacity: 1; }
.hb-yf7-link {
  display: block;
  padding: 5px 8px 5px 14px;
  color: #8f8f8f;
  text-decoration: none;
  border-radius: 0 6px 6px 0;
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.25s ease;
}
.hb-yf7-link[data-level="2"] { padding-left: 26px; font-size: 12.5px; }
.hb-yf7-link:hover { color: #ededed; }
.hb-yf7-link[aria-current="location"] { color: #ededed; font-weight: 500; transform: translateX(2px); }
.hb-yf7-link:focus-visible { outline: 2px solid var(--hb-yf7-a, #2f7bff); outline-offset: -2px; }
@media (prefers-reduced-motion: reduce) {
  .hb-yf7-ind, .hb-yf7-link { transition: none; }
}
`;

function resolveRoot(root: SiteTocScrollspyProps["root"]): HTMLElement | null {
  if (!root) return null;
  if (typeof (root as HTMLElement).getBoundingClientRect === "function") return root as HTMLElement;
  return (root as React.RefObject<HTMLElement | null>).current ?? null;
}

const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

export function SiteTocScrollspy({
  items = defaultItems,
  root,
  activeId,
  defaultActiveId,
  onActiveChange,
  offset = 16,
  title = "On this page",
  sticky = true,
  stickyTop = 24,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: SiteTocScrollspyProps) {
  const [inner, setInner] = React.useState(defaultActiveId ?? items[0]?.id ?? "");
  const controlled = activeId !== undefined;
  const active = controlled ? activeId : inner;
  const listRef = React.useRef<HTMLDivElement>(null);
  const indRef = React.useRef<HTMLSpanElement>(null);
  const last = React.useRef(active);
  const notify = React.useRef(onActiveChange);
  const linkRefs = React.useRef(new Map<string, HTMLAnchorElement>());

  React.useEffect(() => {
    notify.current = onActiveChange;
  }, [onActiveChange]);

  React.useEffect(() => {
    last.current = active;
  }, [active]);

  React.useLayoutEffect(() => {
    const list = listRef.current;
    const ind = indRef.current;
    if (!list || !ind) return;
    function place() {
      const el = linkRefs.current.get(active)?.parentElement;
      if (!el || !ind) return;
      ind.style.transform = `translateY(${el.offsetTop}px)`;
      ind.style.height = `${el.offsetHeight}px`;
      ind.dataset.ready = "true";
    }
    place();
    const ro = new ResizeObserver(place);
    ro.observe(list);
    return () => ro.disconnect();
  }, [active, items]);

  React.useEffect(() => {
    const rootEl = resolveRoot(root);
    const scope: ParentNode = rootEl ?? document;
    const targets = items
      .map((it) => ({ id: it.id, el: scope.querySelector<HTMLElement>(`#${CSS.escape(it.id)}`) }))
      .filter((t): t is { id: string; el: HTMLElement } => t.el !== null);
    if (targets.length === 0) return;

    function compute() {
      const top = (rootEl ? rootEl.getBoundingClientRect().top : 0) + offset;
      let current = targets[0].id;
      for (const t of targets) {
        if (t.el.getBoundingClientRect().top <= top + 1) current = t.id;
        else break;
      }
      const scroller = rootEl ?? document.scrollingElement;
      if (scroller && scroller.scrollTop > 0 && scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2) {
        current = targets[targets.length - 1].id;
      }
      if (current === last.current) return;
      last.current = current;
      setInner(current);
      notify.current?.(current);
    }

    const io = new IntersectionObserver(compute, { root: rootEl, threshold: thresholds });
    targets.forEach((t) => io.observe(t.el));
    const target: HTMLElement | Window = rootEl ?? window;
    target.addEventListener("scroll", compute, { passive: true });
    return () => {
      io.disconnect();
      target.removeEventListener("scroll", compute);
    };
  }, [items, root, offset]);

  function go(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const rootEl = resolveRoot(root);
    const el = (rootEl ?? document).querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
    if (rootEl) {
      const delta = el.getBoundingClientRect().top - rootEl.getBoundingClientRect().top - offset;
      rootEl.scrollTo({ top: rootEl.scrollTop + delta, behavior });
    } else {
      window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - offset, behavior });
    }
    if (!controlled) setInner(id);
    last.current = id;
    notify.current?.(id);
  }

  return (
    <>
      <style href="hb-site-toc-scrollspy" precedence="default">{css}</style>
      <nav
        aria-label={title}
        className={`hb-yf7 ${className}`}
        data-sticky={sticky}
        style={{ "--hb-yf7-a": accent, "--hb-yf7-top": `${stickyTop}px`, ...style } as React.CSSProperties}
        {...rest}
      >
        <p className="hb-yf7-title">
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1.5 3h9M1.5 6h6M1.5 9h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {title}
        </p>
        <div className="hb-yf7-list" ref={listRef}>
          <span className="hb-yf7-ind" ref={indRef} aria-hidden="true" />
          <ul className="hb-yf7-ul">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className="hb-yf7-link"
                data-level={it.level ?? 1}
                aria-current={it.id === active ? "location" : undefined}
                ref={(node) => {
                  if (node) linkRefs.current.set(it.id, node);
                  else linkRefs.current.delete(it.id);
                }}
                onClick={(e) => go(e, it.id)}
              >
                {it.label}
              </a>
            </li>
          ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
