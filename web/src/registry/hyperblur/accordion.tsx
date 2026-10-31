"use client";

import * as React from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultOpen?: string[];
  collapsible?: boolean;
}

const css = `
.hb-ac { width: 100%; color: inherit; }
.hb-ac-item { border-bottom: 1px solid rgba(255,255,255,.14); }
.hb-ac-item:first-child { border-top: 1px solid rgba(255,255,255,.14); }
.hb-ac-head { margin: 0; font: inherit; }
.hb-ac-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 14px 4px;
  border: 0;
  border-radius: 6px;
  color: inherit;
  font: inherit;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  background: transparent;
  -webkit-tap-highlight-color: transparent;
}
.hb-ac-trigger:focus-visible { outline: 2px solid #2f7bff; outline-offset: -2px; }
.hb-ac-chevron {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  opacity: .7;
  transition: transform .35s cubic-bezier(.2, .9, .2, 1), opacity .2s ease;
}
.hb-ac-trigger[aria-expanded="true"] .hb-ac-chevron { transform: rotate(180deg); opacity: 1; }
.hb-ac-panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows .35s cubic-bezier(.2, .9, .2, 1), visibility 0s linear .35s;
}
.hb-ac-item[data-open="true"] > .hb-ac-panel {
  grid-template-rows: 1fr;
  visibility: visible;
  transition: grid-template-rows .35s cubic-bezier(.2, .9, .2, 1), visibility 0s linear 0s;
}
.hb-ac-inner { min-height: 0; overflow: hidden; }
.hb-ac-body {
  padding: 0 4px 14px;
  color: rgba(255,255,255,.65);
  font-size: .9em;
  line-height: 1.55;
}
@media (prefers-reduced-motion: reduce) {
  .hb-ac-panel, .hb-ac-item[data-open="true"] > .hb-ac-panel { transition: none; }
  .hb-ac-chevron { transition: none; }
}
`;

export function Accordion({
  items,
  type = "single",
  defaultOpen,
  collapsible = true,
  className = "",
  ...rest
}: AccordionProps) {
  const uid = React.useId();
  const [open, setOpen] = React.useState<string[]>(() => {
    const start = defaultOpen ?? [];
    return type === "single" ? start.slice(0, 1) : start;
  });

  function toggle(id: string) {
    setOpen((prev) => {
      if (prev.includes(id)) {
        if (!collapsible && prev.length === 1) return prev;
        return prev.filter((x) => x !== id);
      }
      return type === "single" ? [id] : [...prev, id];
    });
  }

  return (
    <div className={`hb-ac ${className}`} {...rest}>
      <style href="hb-accordion" precedence="default">{css}</style>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const triggerId = `${uid}-trigger-${item.id}`;
        const panelId = `${uid}-panel-${item.id}`;
        return (
          <div className="hb-ac-item" data-open={isOpen} key={item.id}>
            <h3 className="hb-ac-head">
              <button
                id={triggerId}
                className="hb-ac-trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <svg
                  className="hb-ac-chevron"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3.5 6l4.5 4.5L12.5 6" />
                </svg>
              </button>
            </h3>
            <div id={panelId} className="hb-ac-panel" role="region" aria-labelledby={triggerId}>
              <div className="hb-ac-inner">
                <div className="hb-ac-body">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
