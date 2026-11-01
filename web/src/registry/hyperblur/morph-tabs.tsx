"use client";

import * as React from "react";

export interface MorphTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface MorphTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  tabs: MorphTab[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  color?: string;
}

const css = `
.hb-mt { width: 100%; color: #ededed; }
.hb-mt:not([data-ready]) .hb-mt-tab[aria-selected="true"] {
  background: color-mix(in srgb, var(--hb-mt-c) 24%, transparent);
}
.hb-mt-list {
  position: relative;
  display: flex;
  gap: 2px;
  width: max-content;
  max-width: 100%;
  padding: 4px;
  overflow-x: auto;
  scrollbar-width: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.hb-mt-list::-webkit-scrollbar { display: none; }
.hb-mt-pill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  width: 0;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-mt-c) 24%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-mt-c) 60%, transparent), 0 0 18px color-mix(in srgb, var(--hb-mt-c) 28%, transparent);
  opacity: 0;
  pointer-events: none;
}
.hb-mt[data-ready] .hb-mt-pill {
  opacity: 1;
  transition: transform 0.4s cubic-bezier(.34, 1.3, .64, 1), width 0.4s cubic-bezier(.34, 1.3, .64, 1);
}
.hb-mt-tab {
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  padding: 7px 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.58);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.25s ease;
}
.hb-mt-tab:hover { color: rgba(255, 255, 255, 0.9); }
.hb-mt-tab[aria-selected="true"] { color: #fff; }
.hb-mt-tab:focus-visible { outline: 2px solid var(--hb-mt-c); outline-offset: 1px; }
.hb-mt-body {
  position: relative;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}
.hb-mt[data-ready] .hb-mt-body { transition: height 0.4s cubic-bezier(.22, 1, .36, 1); }
.hb-mt-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.75);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: scale(0.97);
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0s linear 0.25s;
}
.hb-mt-panel[data-active] {
  position: relative;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: none;
  transition: opacity 0.35s ease 0.1s, transform 0.4s cubic-bezier(.22, 1, .36, 1) 0.1s, visibility 0s;
}
@media (prefers-reduced-motion: reduce) {
  .hb-mt[data-ready] .hb-mt-pill { transition: none; }
  .hb-mt[data-ready] .hb-mt-body { transition: none; }
  .hb-mt-panel, .hb-mt-panel[data-active] { transform: none; transition: opacity 0.15s ease, visibility 0s linear 0.15s; }
  .hb-mt-panel[data-active] { transition: opacity 0.2s ease; }
  .hb-mt-tab { transition: none; }
}
`;

export function MorphTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: MorphTabsProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const pillRef = React.useRef<HTMLSpanElement>(null);
  const activePanel = React.useRef<HTMLDivElement>(null);
  const [inner, setInner] = React.useState(defaultValue ?? tabs[0]?.id ?? "");
  const [height, setHeight] = React.useState<number | null>(null);

  const requested = value ?? inner;
  const current = tabs.some((t) => t.id === requested) ? requested : (tabs[0]?.id ?? "");
  const currentIndex = tabs.findIndex((t) => t.id === current);

  function select(id: string) {
    if (value === undefined) setInner(id);
    if (id !== current) onChange?.(id);
  }

  React.useLayoutEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    const root = rootRef.current;
    if (!list || !pill || !root) return;
    const place = () => {
      const tab = list.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
      if (!tab) return;
      pill.style.width = `${tab.offsetWidth}px`;
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
    };
    place();
    const frame = requestAnimationFrame(() => root.setAttribute("data-ready", ""));
    const ro = new ResizeObserver(place);
    ro.observe(list);
    list.querySelectorAll("[role=tab]").forEach((el) => ro.observe(el));
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [current, tabs]);

  React.useEffect(() => {
    const el = activePanel.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [current]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const n = tabs.length;
    if (n === 0) return;
    let to = -1;
    if (e.key === "ArrowRight") to = (currentIndex + 1) % n;
    else if (e.key === "ArrowLeft") to = (currentIndex - 1 + n) % n;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = n - 1;
    if (to < 0) return;
    e.preventDefault();
    select(tabs[to].id);
    listRef.current?.querySelectorAll<HTMLElement>("[role=tab]")[to]?.focus();
  }

  const vars = { "--hb-mt-c": color, ...style } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-mt ${className}`} style={vars} {...rest}>
      <style href="hb-morph-tabs" precedence="default">{css}</style>
      <div className="hb-mt-list" role="tablist" ref={listRef} onKeyDown={handleKeyDown}>
        <span className="hb-mt-pill" ref={pillRef} aria-hidden="true" />
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            role="tab"
            id={`${uid}-t-${tab.id}`}
            aria-selected={tab.id === current}
            aria-controls={`${uid}-p-${tab.id}`}
            tabIndex={tab.id === current ? 0 : -1}
            className="hb-mt-tab"
            onClick={() => select(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="hb-mt-body" style={height === null ? undefined : { height }}>
        {tabs.map((tab) => {
          const active = tab.id === current;
          return (
            <div
              key={tab.id}
              ref={active ? activePanel : undefined}
              role="tabpanel"
              id={`${uid}-p-${tab.id}`}
              aria-labelledby={`${uid}-t-${tab.id}`}
              className="hb-mt-panel"
              data-active={active ? "" : undefined}
              aria-hidden={active ? undefined : true}
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
