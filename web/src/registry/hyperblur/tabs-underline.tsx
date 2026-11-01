"use client";

import * as React from "react";

export interface TabsUnderlineTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number | string;
  content: React.ReactNode;
}

export interface TabsUnderlineProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children" | "defaultValue"> {
  tabs: TabsUnderlineTab[];
  defaultValue?: string;
  value?: string;
  onChange?: (id: string) => void;
  fitted?: boolean;
  color?: string;
}

const css = `
.hb-tu {
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  --hb-tu-accent: #2f7bff;
}
.hb-tu-list {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 4px;
  border-bottom: 1px solid #262626;
}
.hb-tu[data-fitted="true"] .hb-tu-list { gap: 0; }
.hb-tu-bar {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: var(--hb-tu-w, 0px);
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: var(--hb-tu-accent);
  opacity: 0;
  pointer-events: none;
  transform: translate3d(var(--hb-tu-x, 0px), 0, 0);
  transition: transform .32s cubic-bezier(.2, .9, .2, 1), width .32s cubic-bezier(.2, .9, .2, 1), opacity .2s ease;
}
.hb-tu-bar[data-ready="true"] { opacity: 1; }
.hb-tu-tab {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
  margin: 0;
  padding: 10px 12px;
  border: 0;
  border-radius: 8px 8px 0 0;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  cursor: pointer;
  transition: color .15s ease, background-color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-tu[data-fitted="true"] .hb-tu-tab { flex: 1; }
.hb-tu-tab:hover { color: #ededed; }
.hb-tu-tab[aria-selected="true"] { color: #ededed; }
.hb-tu-tab:focus-visible { outline: 2px solid var(--hb-tu-accent); outline-offset: -2px; }
.hb-tu-icon { display: grid; flex: none; place-items: center; width: 16px; height: 16px; }
.hb-tu-icon svg { width: 16px; height: 16px; }
.hb-tu-count {
  min-width: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: #1f1f1f;
  color: #8f8f8f;
  font-size: 11px;
  line-height: 18px;
  text-align: center;
  transition: background-color .15s ease, color .15s ease;
}
.hb-tu-tab[aria-selected="true"] .hb-tu-count { background: #262626; color: #ededed; }
.hb-tu-panel { padding-top: 14px; font-size: 13px; line-height: 1.55; animation: hb-tu-in .2s ease both; }
.hb-tu-panel:focus-visible { outline: 2px solid var(--hb-tu-accent); outline-offset: 2px; border-radius: 6px; }
@keyframes hb-tu-in {
  from { opacity: 0; transform: translate3d(0, 4px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-tu-bar { transition: opacity .01s linear; }
  .hb-tu-tab, .hb-tu-count { transition: none; }
  .hb-tu-panel { animation: none; }
}
`;

export function TabsUnderline({
  tabs,
  defaultValue,
  value,
  onChange,
  fitted = false,
  color = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: TabsUnderlineProps) {
  const uid = React.useId();
  const listRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLSpanElement>(null);
  const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const placedRef = React.useRef(false);
  const [inner, setInner] = React.useState(defaultValue ?? tabs[0]?.id ?? "");
  const current = value ?? inner;
  const currentRef = React.useRef(current);

  const place = React.useCallback((instant: boolean) => {
    const bar = barRef.current;
    if (!bar) return;
    const el = tabRefs.current.get(currentRef.current);
    if (!el) {
      bar.dataset.ready = "false";
      return;
    }
    if (instant) bar.style.transition = "none";
    bar.style.setProperty("--hb-tu-w", `${el.offsetWidth}px`);
    bar.style.setProperty("--hb-tu-x", `${el.offsetLeft}px`);
    bar.dataset.ready = "true";
    if (instant) {
      void bar.offsetWidth;
      bar.style.transition = "";
    }
  }, []);

  React.useEffect(() => {
    currentRef.current = current;
    place(!placedRef.current);
    placedRef.current = true;
  }, [current, tabs, fitted, place]);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => place(true);
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
    const ro = new ResizeObserver(update);
    ro.observe(list);
    return () => ro.disconnect();
  }, [place]);

  function select(id: string) {
    if (value === undefined) setInner(id);
    onChange?.(id);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented || tabs.length === 0) return;
    const n = tabs.length;
    const idx = Math.max(0, tabs.findIndex((t) => t.id === current));
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % n;
    else if (e.key === "ArrowLeft") next = (idx - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    const id = tabs[next].id;
    select(id);
    tabRefs.current.get(id)?.focus();
  }

  const tabStop = tabs.some((t) => t.id === current) ? current : tabs[0]?.id;
  const vars = { "--hb-tu-accent": color, ...style } as React.CSSProperties;

  return (
    <div className={`hb-tu ${className}`} data-fitted={fitted} style={vars} {...rest}>
      <style href="hb-tabs-underline" precedence="default">{css}</style>
      <div
        ref={listRef}
        className="hb-tu-list"
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
      >
        <span ref={barRef} className="hb-tu-bar" aria-hidden="true" />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
              else tabRefs.current.delete(tab.id);
            }}
            id={`${uid}-tab-${tab.id}`}
            type="button"
            role="tab"
            className="hb-tu-tab"
            aria-selected={tab.id === current}
            aria-controls={`${uid}-panel-${tab.id}`}
            tabIndex={tab.id === tabStop ? 0 : -1}
            onClick={() => select(tab.id)}
          >
            {tab.icon ? (
              <span className="hb-tu-icon" aria-hidden="true">
                {tab.icon}
              </span>
            ) : null}
            <span>{tab.label}</span>
            {tab.count !== undefined ? <span className="hb-tu-count">{tab.count}</span> : null}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${uid}-panel-${tab.id}`}
          role="tabpanel"
          className="hb-tu-panel"
          aria-labelledby={`${uid}-tab-${tab.id}`}
          tabIndex={0}
          hidden={tab.id !== current}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
