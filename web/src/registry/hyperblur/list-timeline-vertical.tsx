"use client";

import * as React from "react";

const ICONS = {
  check: "M4.5 10.5l3.5 3.5 7.5-8",
  box: "M3.5 6.5L10 3l6.5 3.5v7L10 17l-6.5-3.5zM3.5 6.5L10 10l6.5-3.5M10 10v7",
  truck: "M2.5 5.5h8v8h-8zM10.5 8h4l3 3v2.5h-7M5.5 15.5a1.4 1.4 0 1 0 0-.01zM13.5 15.5a1.4 1.4 0 1 0 0-.01z",
  pin: "M10 17.5s5-4.4 5-8.5a5 5 0 1 0-10 0c0 4.1 5 8.5 5 8.5zM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  card: "M3.5 5.5h13a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zM2.5 8.5h15M5.5 12h3",
  mail: "M3.5 5h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3 6l7 5 7-5",
  flag: "M5 17V3.5M5 4.5h9l-1.8 3 1.8 3H5",
  clock: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 6.5V10l2.5 1.5",
  user: "M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.8 16.5c.6-2.8 3-4.3 6.2-4.3s5.6 1.5 6.2 4.3",
} as const;

export type TimelineIconName = keyof typeof ICONS;
export type TimelineTone = "done" | "active" | "pending";

export function TimelineIcon({ name }: { name: TimelineIconName }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export interface TimelineEvent {
  id: string;
  title: string;
  time: string;
  icon?: TimelineIconName;
  tone?: TimelineTone;
  description?: string;
  details?: React.ReactNode;
}

export interface ListTimelineVerticalProps
  extends Omit<React.HTMLAttributes<HTMLOListElement>, "onChange" | "children" | "defaultValue"> {
  items?: TimelineEvent[];
  open?: string[];
  defaultOpen?: string[];
  onOpenChange?: (open: string[]) => void;
  multiple?: boolean;
  gap?: number;
  accent?: string;
}

const defaultItems: TimelineEvent[] = [
  {
    id: "placed",
    title: "Order placed",
    time: "3 days ago",
    icon: "card",
    tone: "done",
    description: "Order #48213 confirmed.",
    details: "Paid with Visa ending 4821. A receipt was sent to maya@northwind.io.",
  },
  {
    id: "packed",
    title: "Packed at Reno warehouse",
    time: "2 days ago",
    icon: "box",
    tone: "done",
    details: "Two items packed in one box and handed to Northline Freight.",
  },
  {
    id: "shipped",
    title: "Left the regional hub",
    time: "Yesterday",
    icon: "truck",
    tone: "done",
  },
  {
    id: "delivery",
    title: "Out for delivery",
    time: "2 hours ago",
    icon: "pin",
    tone: "active",
    description: "Your driver is on the way.",
    details: "Marcus is 6 stops away. Estimated arrival is 4:30 PM.",
  },
  {
    id: "delivered",
    title: "Delivered",
    time: "Expected today",
    icon: "flag",
    tone: "pending",
  },
];

const css = `
.hb-yc6 {
  --hb-yc6-a: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
}
.hb-yc6 *, .hb-yc6 *::before, .hb-yc6 *::after { box-sizing: border-box; }
.hb-yc6-li { display: grid; grid-template-columns: 28px minmax(0, 1fr); column-gap: 12px; }
.hb-yc6-rail { position: relative; }
.hb-yc6-node {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  background: #151515;
  color: #6f6f6f;
  animation: hb-yc6-pop .5s cubic-bezier(.3, 1.4, .5, 1) both;
  animation-delay: calc(var(--hb-yc6-i, 0) * 170ms);
}
.hb-yc6-node svg { width: 15px; height: 15px; }
.hb-yc6-li[data-tone="done"] .hb-yc6-node {
  border-color: var(--hb-yc6-a);
  background: var(--hb-yc6-a);
  color: #ffffff;
  box-shadow: 0 4px 14px color-mix(in srgb, var(--hb-yc6-a) 40%, transparent);
}
.hb-yc6-li[data-tone="active"] .hb-yc6-node {
  border-color: var(--hb-yc6-a);
  background: color-mix(in srgb, var(--hb-yc6-a) 14%, #111111);
  color: var(--hb-yc6-a);
}
.hb-yc6-li[data-tone="active"] .hb-yc6-node::after {
  content: "";
  position: absolute;
  inset: -1px;
  border: 1px solid var(--hb-yc6-a);
  border-radius: inherit;
  animation: hb-yc6-ping 2.4s ease-out infinite;
  animation-delay: calc(var(--hb-yc6-i, 0) * 170ms + 600ms);
}
.hb-yc6-line {
  position: absolute;
  top: 32px;
  bottom: 4px;
  left: 13px;
  width: 2px;
  border-radius: 2px;
  background: #2a2a2a;
  transform-origin: top;
  animation: hb-yc6-draw .55s cubic-bezier(.4, 0, .2, 1) both;
  animation-delay: calc(var(--hb-yc6-i, 0) * 170ms + 150ms);
}
.hb-yc6-li[data-tone="done"] .hb-yc6-line { background: linear-gradient(var(--hb-yc6-a), color-mix(in srgb, var(--hb-yc6-a) 45%, #2a2a2a)); }
.hb-yc6-li[data-tone="active"] .hb-yc6-line { background: repeating-linear-gradient(#2a2a2a 0 4px, transparent 4px 8px); }
.hb-yc6-li[data-tone="pending"] .hb-yc6-line { background: repeating-linear-gradient(#232323 0 4px, transparent 4px 8px); }
.hb-yc6-li[data-last="true"] .hb-yc6-line { display: none; }
.hb-yc6-main { min-width: 0; padding-bottom: var(--hb-yc6-gap, 14px); animation: hb-yc6-in .5s cubic-bezier(.2, .9, .2, 1) both; animation-delay: calc(var(--hb-yc6-i, 0) * 170ms + 80ms); }
.hb-yc6-li[data-last="true"] .hb-yc6-main { padding-bottom: 0; }
.hb-yc6-head {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 28px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
}
button.hb-yc6-head { margin-left: -6px; width: calc(100% + 6px); padding: 0 6px; border-radius: 8px; cursor: pointer; transition: background-color .15s ease; }
button.hb-yc6-head:hover { background: #161616; }
button.hb-yc6-head:focus-visible { outline: 2px solid var(--hb-yc6-a); outline-offset: 0; }
.hb-yc6-ttl { flex: 1; min-width: 0; overflow: hidden; font-size: 13px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc6-li[data-tone="pending"] .hb-yc6-ttl { color: #8f8f8f; font-weight: 500; }
.hb-yc6-time { flex: none; color: #77777f; font-size: 11.5px; line-height: 16px; white-space: nowrap; }
.hb-yc6-chev { width: 14px; height: 14px; flex: none; color: #6f6f6f; transition: transform .28s cubic-bezier(.2, .9, .2, 1), color .15s ease; }
.hb-yc6-li[data-open="true"] .hb-yc6-chev { color: #ededed; transform: rotate(180deg); }
.hb-yc6-desc { margin: 0; color: #8f8f8f; font-size: 12px; line-height: 17px; }
.hb-yc6-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s cubic-bezier(.2, .9, .2, 1); }
.hb-yc6-li[data-open="true"] .hb-yc6-panel { grid-template-rows: 1fr; }
.hb-yc6-in { min-height: 0; overflow: hidden; }
.hb-yc6-box {
  margin-top: 6px;
  padding: 8px 10px;
  border: 1px solid #232323;
  border-radius: 9px;
  background: #121212;
  color: #b4b4b4;
  font-size: 12px;
  line-height: 17px;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity .25s ease, transform .3s cubic-bezier(.2, .9, .2, 1);
}
.hb-yc6-li[data-open="true"] .hb-yc6-box { opacity: 1; transform: none; transition-delay: .06s; }
@keyframes hb-yc6-pop {
  from { opacity: 0; transform: scale(.4); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-yc6-draw {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@keyframes hb-yc6-in {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-yc6-ping {
  0% { opacity: .7; transform: scale(1); }
  70%, 100% { opacity: 0; transform: scale(1.7); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yc6-node, .hb-yc6-line, .hb-yc6-main, .hb-yc6-li[data-tone="active"] .hb-yc6-node::after { animation: none; }
  .hb-yc6-panel, .hb-yc6-box, .hb-yc6-chev, button.hb-yc6-head { transition: none; }
}
`;

export function ListTimelineVertical({
  items = defaultItems,
  open,
  defaultOpen = [],
  onOpenChange,
  multiple = false,
  gap = 14,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: ListTimelineVerticalProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLOListElement>(null);
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const openIds = open ?? innerOpen;

  function toggle(id: string) {
    const has = openIds.includes(id);
    const next = has ? openIds.filter((x) => x !== id) : multiple ? [...openIds, id] : [id];
    if (open === undefined) setInnerOpen(next);
    onOpenChange?.(next);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLOListElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const target = e.target as HTMLElement;
    if (!target.hasAttribute("data-yc6-head")) return;
    const id = target.dataset.yc6Head ?? "";
    if (e.key === "Escape") {
      if (openIds.includes(id)) {
        e.preventDefault();
        toggle(id);
      } else target.blur();
      return;
    }
    const list = Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-yc6-head]") ?? []);
    const at = list.indexOf(target);
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(list.length - 1, at + 1);
    else if (e.key === "ArrowUp") next = Math.max(0, at - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = list.length - 1;
    if (next >= 0) {
      e.preventDefault();
      list[next]?.focus();
    }
  }

  const vars = { "--hb-yc6-a": accent, "--hb-yc6-gap": `${gap}px`, ...style } as React.CSSProperties;

  return (
    <ol ref={rootRef} className={`hb-yc6 ${className}`} style={vars} onKeyDown={handleKeyDown} {...rest}>
      <style href="hb-list-timeline-vertical" precedence="default">{css}</style>
      {items.map((item, i) => {
        const tone = item.tone ?? "done";
        const iconName: TimelineIconName = item.icon ?? (tone === "done" ? "check" : tone === "active" ? "clock" : "flag");
        const isOpen = openIds.includes(item.id);
        const hasDetails = item.details !== undefined && item.details !== null && item.details !== "";
        const panelId = `${uid}-${item.id}`;
        const head = (
          <>
            <span className="hb-yc6-ttl">{item.title}</span>
            <span className="hb-yc6-time">{item.time}</span>
            {hasDetails ? (
              <svg className="hb-yc6-chev" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.5 5.5L7 9l3.5-3.5" />
              </svg>
            ) : null}
          </>
        );
        return (
          <li
            key={item.id}
            className="hb-yc6-li"
            data-tone={tone}
            data-open={isOpen}
            data-last={i === items.length - 1}
            style={{ "--hb-yc6-i": i } as React.CSSProperties}
          >
            <div className="hb-yc6-rail">
              <span className="hb-yc6-node">
                <TimelineIcon name={iconName} />
              </span>
              <span className="hb-yc6-line" aria-hidden="true" />
            </div>
            <div className="hb-yc6-main">
              {hasDetails ? (
                <button type="button" className="hb-yc6-head" data-yc6-head={item.id} aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(item.id)}>
                  {head}
                </button>
              ) : (
                <div className="hb-yc6-head">{head}</div>
              )}
              {item.description ? <p className="hb-yc6-desc">{item.description}</p> : null}
              {hasDetails ? (
                <div id={panelId} className="hb-yc6-panel" role="region" aria-label={item.title}>
                  <div className="hb-yc6-in" inert={!isOpen}>
                    <div className="hb-yc6-box">{item.details}</div>
                  </div>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
