"use client";

import * as React from "react";

const PATHS = {
  rocket: "M11.5 3.5c2.6-.6 4.6-.5 5 0 .5.4.6 2.4 0 5L12 13l-5-5zM7 8l-3 .5L2.8 10l3.4 1M12 13l-.5 3-1.5 1.2-1-3.4M5.5 14.5l-2 2",
  book: "M4 4.5A1.5 1.5 0 0 1 5.5 3H16v12H5.5A1.5 1.5 0 0 0 4 16.5zM4 16.5A1.5 1.5 0 0 0 5.5 18H16M7.5 6.5h5",
  plug: "M7 3v4M13 3v4M5.5 7h9v2.5a4.5 4.5 0 0 1-9 0zM10 14v3.5",
  shield: "M10 2.8l6 2.2v4.6c0 3.7-2.5 6.4-6 7.6-3.5-1.2-6-3.9-6-7.6V5zM7.5 10l1.8 1.8 3.4-3.6",
  card: "M3 5.5h14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zM2 8.5h16M5 12h3",
  terminal: "M3.5 4h13a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM6 8l2.5 2L6 12M10.5 12.5h3.5",
} as const;

export type SidebarAccordionRailIconName = keyof typeof PATHS;

export interface SidebarAccordionRailLink {
  id: string;
  label: string;
  badge?: string;
}

export interface SidebarAccordionRailGroup {
  id: string;
  label: string;
  icon?: SidebarAccordionRailIconName | React.ReactNode;
  items: SidebarAccordionRailLink[];
}

export interface SidebarAccordionRailProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "children" | "defaultValue"> {
  groups?: SidebarAccordionRailGroup[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  openGroup?: string | null;
  defaultOpenGroup?: string | null;
  onOpenGroupChange?: (id: string | null) => void;
  heading?: string;
  caption?: string;
  rowHeight?: number;
  footer?: React.ReactNode;
  accent?: string;
}

const defaultGroups: SidebarAccordionRailGroup[] = [
  {
    id: "start",
    label: "Getting started",
    icon: "rocket",
    items: [
      { id: "intro", label: "Introduction" },
      { id: "quickstart", label: "Quickstart" },
      { id: "keys", label: "API keys" },
      { id: "sdks", label: "SDKs", badge: "New" },
    ],
  },
  {
    id: "guides",
    label: "Guides",
    icon: "book",
    items: [
      { id: "webhooks", label: "Webhooks" },
      { id: "pagination", label: "Pagination" },
      { id: "errors", label: "Error handling" },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    icon: "card",
    items: [
      { id: "plans", label: "Plans and seats" },
      { id: "invoices", label: "Invoices" },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: "shield",
    items: [
      { id: "sso", label: "Single sign-on" },
      { id: "audit", label: "Audit log", badge: "Beta" },
    ],
  },
];

const css = `
.hb-xk3 {
  --hb-xk3-a: #2f7bff;
  --hb-xk3-h: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 12px 10px;
  border-right: 1px solid #1f1f1f;
  background: #0d0d0d;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
}
.hb-xk3 *, .hb-xk3 *::before, .hb-xk3 *::after { box-sizing: border-box; }
.hb-xk3-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; height: 26px; margin: 0 4px 10px 6px; }
.hb-xk3-title { overflow: hidden; font-size: 13.5px; font-weight: 600; letter-spacing: -.01em; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk3-cap { flex: none; padding: 1px 7px; border: 1px solid #2a2a2a; border-radius: 99px; background: #141414; color: #8f8f8f; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; line-height: 16px; }
.hb-xk3-groups { display: flex; flex: 1; flex-direction: column; gap: 2px; min-height: 0; overflow-y: auto; scrollbar-width: none; }
.hb-xk3-groups::-webkit-scrollbar { display: none; }
.hb-xk3-head {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  height: 32px;
  margin: 0;
  padding: 0 8px 0 4px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background-color .16s ease, color .16s ease;
}
.hb-xk3-head:hover { background: rgba(255, 255, 255, .04); color: #ededed; }
.hb-xk3-head:focus-visible, .hb-xk3-link:focus-visible { outline: 2px solid var(--hb-xk3-a); outline-offset: -2px; }
.hb-xk3-group[data-open="true"] .hb-xk3-head { color: #fff; }
.hb-xk3-tile {
  display: grid;
  flex: none;
  place-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid #262626;
  border-radius: 7px;
  background: linear-gradient(180deg, #1a1a1a, #121212);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
  color: #8f8f8f;
  transition: color .2s ease, border-color .2s ease, background .2s ease;
}
.hb-xk3-tile svg { width: 14px; height: 14px; }
.hb-xk3-group[data-open="true"] .hb-xk3-tile {
  border-color: color-mix(in srgb, var(--hb-xk3-a) 45%, #262626);
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xk3-a) 28%, #151515), #121212);
  color: color-mix(in srgb, var(--hb-xk3-a) 40%, #fff);
}
.hb-xk3-hl { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk3-has { width: 6px; height: 6px; border-radius: 99px; background: var(--hb-xk3-a); box-shadow: 0 0 8px var(--hb-xk3-a); animation: hb-xk3-in .3s cubic-bezier(.22, 1, .36, 1); }
.hb-xk3-count { color: #5f5f66; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; }
.hb-xk3-chev { flex: none; width: 14px; height: 14px; color: #5f5f66; transition: transform .35s cubic-bezier(.22, 1, .36, 1); }
.hb-xk3-group[data-open="true"] .hb-xk3-chev { transform: rotate(90deg); color: #a1a1a1; }
.hb-xk3-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .42s cubic-bezier(.22, 1, .36, 1); }
.hb-xk3-group[data-open="true"] .hb-xk3-body { grid-template-rows: 1fr; }
.hb-xk3-clip { min-height: 0; overflow: hidden; }
.hb-xk3-track { position: relative; margin: 2px 0 6px; padding-left: 30px; }
.hb-xk3-line, .hb-xk3-fill { position: absolute; top: 0; left: 16px; width: 1.5px; border-radius: 2px; }
.hb-xk3-line { height: calc(var(--hb-xk3-n) * var(--hb-xk3-h) - var(--hb-xk3-h) / 2); background: #262626; }
.hb-xk3-fill {
  height: calc(var(--hb-xk3-ix) * var(--hb-xk3-h) + var(--hb-xk3-h) / 2);
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xk3-a) 10%, transparent), var(--hb-xk3-a));
  transition: height .5s cubic-bezier(.22, 1, .36, 1), opacity .3s ease;
}
.hb-xk3-bead {
  position: absolute;
  top: 0;
  left: 12.75px;
  width: 8px;
  height: 8px;
  border: 1.5px solid #0d0d0d;
  border-radius: 99px;
  background: var(--hb-xk3-a);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xk3-a) 25%, transparent), 0 0 14px var(--hb-xk3-a);
  transform: translateY(calc(var(--hb-xk3-ix) * var(--hb-xk3-h) + var(--hb-xk3-h) / 2 - 4px));
  transition: transform .5s cubic-bezier(.34, 1.4, .5, 1), opacity .3s ease;
}
.hb-xk3-track[data-on="false"] .hb-xk3-fill, .hb-xk3-track[data-on="false"] .hb-xk3-bead { opacity: 0; }
.hb-xk3-list { margin: 0; padding: 0; list-style: none; }
.hb-xk3-li { position: relative; height: var(--hb-xk3-h); }
.hb-xk3-li::before {
  content: "";
  position: absolute;
  top: 0;
  left: -14px;
  width: 10px;
  height: 50%;
  border-bottom: 1.5px solid #262626;
  border-left: 1.5px solid transparent;
  border-bottom-left-radius: 7px;
  transition: border-color .3s ease;
}
.hb-xk3-li[data-past="true"]::before { border-bottom-color: color-mix(in srgb, var(--hb-xk3-a) 45%, #262626); }
.hb-xk3-li[data-current="true"]::before { border-bottom-color: var(--hb-xk3-a); }
.hb-xk3-link {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #8a8a90;
  font: inherit;
  font-size: 12.5px;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  opacity: 0;
  transform: translateY(-4px);
  transition: color .16s ease, background-color .16s ease, opacity .2s ease, transform .3s cubic-bezier(.22, 1, .36, 1);
}
.hb-xk3-group[data-open="true"] .hb-xk3-link { opacity: 1; transform: none; transition-delay: 0s, 0s, calc(var(--hb-xk3-i) * 35ms + 80ms), calc(var(--hb-xk3-i) * 35ms + 80ms); }
.hb-xk3-link:hover { background: rgba(255, 255, 255, .04); color: #ededed; }
.hb-xk3-li[data-past="true"] .hb-xk3-link { color: #b4b4ba; }
.hb-xk3-link[aria-current="page"] { color: #fff; font-weight: 500; }
.hb-xk3-ll { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.hb-xk3-badge { flex: none; padding: 0 6px; border-radius: 99px; background: color-mix(in srgb, var(--hb-xk3-a) 18%, transparent); color: color-mix(in srgb, var(--hb-xk3-a) 45%, #fff); font-size: 9.5px; font-weight: 600; line-height: 16px; }
.hb-xk3-foot { flex: none; margin-top: 8px; }
@keyframes hb-xk3-in { from { opacity: 0; transform: scale(.4); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xk3 *, .hb-xk3 *::before, .hb-xk3 *::after { transition: none !important; animation: none !important; }
}
`;

function Glyph({ icon }: { icon?: SidebarAccordionRailIconName | React.ReactNode }) {
  if (typeof icon === "string" || icon === undefined) {
    const d = PATHS[(icon as SidebarAccordionRailIconName | undefined) ?? "book"] ?? PATHS.book;
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    );
  }
  return <>{icon}</>;
}

export function SidebarAccordionRail({
  groups = defaultGroups,
  active,
  defaultActive,
  onChange,
  openGroup,
  defaultOpenGroup,
  onOpenGroupChange,
  heading = "Relay API",
  caption = "v4.2",
  rowHeight = 30,
  footer,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: SidebarAccordionRailProps) {
  const firstActive = defaultActive ?? groups[0]?.items[0]?.id ?? "";
  const [inner, setInner] = React.useState(firstActive);
  const current = active ?? inner;
  const owner = groups.find((g) => g.items.some((i) => i.id === current))?.id ?? null;
  const [innerOpen, setInnerOpen] = React.useState<string | null>(defaultOpenGroup !== undefined ? defaultOpenGroup : owner);
  const opened = openGroup !== undefined ? openGroup : innerOpen;
  const rootRef = React.useRef<HTMLElement>(null);
  const uid = React.useId();

  function setOpened(id: string | null) {
    if (openGroup === undefined) setInnerOpen(id);
    onOpenGroupChange?.(id);
  }

  function pick(id: string) {
    if (active === undefined) setInner(id);
    onChange?.(id);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    const nodes = Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-xk3-nav]") ?? []).filter(
      (n) => n.getAttribute("data-xk3-nav") === "head" || n.closest('[data-open="true"]'),
    );
    const at = nodes.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    e.preventDefault();
    let n = at;
    if (e.key === "ArrowDown") n = Math.min(nodes.length - 1, at + 1);
    else if (e.key === "ArrowUp") n = Math.max(0, at - 1);
    else if (e.key === "Home") n = 0;
    else n = nodes.length - 1;
    nodes[n]?.focus();
  }

  const vars = { "--hb-xk3-a": accent, "--hb-xk3-h": `${rowHeight}px`, ...style } as React.CSSProperties;

  return (
    <nav ref={rootRef} aria-label={heading || "Sections"} className={`hb-xk3 ${className}`} style={vars} onKeyDown={handleKeyDown} {...rest}>
      <style href="hb-sidebar-accordion-rail" precedence="default">{css}</style>
      {heading || caption ? (
        <div className="hb-xk3-top">
          <span className="hb-xk3-title">{heading}</span>
          {caption ? <span className="hb-xk3-cap">{caption}</span> : null}
        </div>
      ) : null}
      <div className="hb-xk3-groups">
        {groups.map((group) => {
          const isOpen = opened === group.id;
          const idx = group.items.findIndex((i) => i.id === current);
          const bodyId = `${uid}-${group.id}`;
          return (
            <div key={group.id} className="hb-xk3-group" data-open={isOpen}>
              <button
                type="button"
                className="hb-xk3-head"
                data-xk3-nav="head"
                aria-expanded={isOpen}
                aria-controls={bodyId}
                onClick={() => setOpened(isOpen ? null : group.id)}
              >
                <span className="hb-xk3-tile">
                  <Glyph icon={group.icon} />
                </span>
                <span className="hb-xk3-hl">{group.label}</span>
                {!isOpen && idx >= 0 ? <span className="hb-xk3-has" aria-label="Contains current page" /> : null}
                <span className="hb-xk3-count" aria-hidden="true">{group.items.length}</span>
                <svg className="hb-xk3-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </button>
              <div id={bodyId} className="hb-xk3-body" role="region" aria-label={group.label} inert={!isOpen}>
                <div className="hb-xk3-clip">
                  <div
                    className="hb-xk3-track"
                    data-on={idx >= 0}
                    style={{ "--hb-xk3-n": group.items.length, "--hb-xk3-ix": Math.max(0, idx) } as React.CSSProperties}
                  >
                    <span className="hb-xk3-line" aria-hidden="true" />
                    <span className="hb-xk3-fill" aria-hidden="true" />
                    <span className="hb-xk3-bead" aria-hidden="true" />
                    <ul className="hb-xk3-list" role="list">
                      {group.items.map((item, i) => (
                        <li
                          key={item.id}
                          className="hb-xk3-li"
                          data-past={idx >= 0 && i < idx}
                          data-current={i === idx}
                          style={{ "--hb-xk3-i": i } as React.CSSProperties}
                        >
                          <button
                            type="button"
                            className="hb-xk3-link"
                            data-xk3-nav="link"
                            aria-current={i === idx ? "page" : undefined}
                            onClick={() => pick(item.id)}
                          >
                            <span className="hb-xk3-ll">{item.label}</span>
                            {item.badge ? <span className="hb-xk3-badge">{item.badge}</span> : null}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {footer ? <div className="hb-xk3-foot">{footer}</div> : null}
    </nav>
  );
}
