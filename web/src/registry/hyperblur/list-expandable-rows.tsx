"use client";

import * as React from "react";

const ICONS = {
  receipt: "M5 3h10v14l-2-1.3-1.5 1.3L10 15.7 8.5 17 7 15.7 5 17zM7.5 7.5h5M7.5 10.5h5",
  plane: "M3 11l14-6-4 11-3-4.5zM10 11.5L17 5",
  box: "M3.5 6.5L10 3l6.5 3.5v7L10 17l-6.5-3.5zM3.5 6.5L10 10l6.5-3.5M10 10v7",
  card: "M3.5 5.5h13a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zM2.5 8.5h15M5.5 12h3",
  user: "M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.8 16.5c.6-2.8 3-4.3 6.2-4.3s5.6 1.5 6.2 4.3",
  bolt: "M11 3L4.5 11h4.5l-1 6 6.5-8H10z",
} as const;

export type ExpandableRowIconName = keyof typeof ICONS;

export interface ExpandableRow {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  icon?: ExpandableRowIconName;
  color?: string;
  details?: React.ReactNode;
}

export interface ListExpandableRowsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children" | "defaultValue"> {
  items?: ExpandableRow[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (open: string[]) => void;
  multiple?: boolean;
  rowHeight?: number;
  accent?: string;
}

export interface ListExpandableDetailsProps {
  rows: { label: string; value: React.ReactNode }[];
}

export function ListExpandableDetails({ rows }: ListExpandableDetailsProps) {
  return (
    <dl className="hb-yc9-dl">
      {rows.map((row) => (
        <React.Fragment key={row.label}>
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

const defaultItems: ExpandableRow[] = [
  {
    id: "inv-1048",
    title: "Northwind Studio",
    subtitle: "INV-1048",
    meta: "$2,400.00",
    icon: "receipt",
    color: "#2f7bff",
    details: (
      <ListExpandableDetails
        rows={[
          { label: "Issued", value: "Oct 28, 2026" },
          { label: "Due", value: "Nov 12, 2026" },
          { label: "Paid with", value: "Visa ending 4821" },
        ]}
      />
    ),
  },
  {
    id: "inv-1047",
    title: "Fable Labs",
    subtitle: "INV-1047",
    meta: "$890.00",
    icon: "receipt",
    color: "#8b5cf6",
    details: (
      <ListExpandableDetails
        rows={[
          { label: "Issued", value: "Oct 14, 2026" },
          { label: "Due", value: "Oct 29, 2026" },
          { label: "Status", value: "Paid" },
        ]}
      />
    ),
  },
  {
    id: "inv-1046",
    title: "Atlas & Oak",
    subtitle: "INV-1046",
    meta: "$5,125.00",
    icon: "receipt",
    color: "#30a46c",
    details: (
      <ListExpandableDetails
        rows={[
          { label: "Issued", value: "Oct 02, 2026" },
          { label: "Due", value: "Oct 17, 2026" },
          { label: "Status", value: "Paid" },
        ]}
      />
    ),
  },
];

const css = `
.hb-yc9 {
  --hb-yc9-a: #2f7bff;
  --hb-yc9-row: 48px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
}
.hb-yc9 *, .hb-yc9 *::before, .hb-yc9 *::after { box-sizing: border-box; }
.hb-yc9-row {
  overflow: hidden;
  border: 1px solid #232323;
  border-radius: 12px;
  background: #121212;
  transition: background-color .2s ease, border-color .2s ease, box-shadow .25s ease;
}
.hb-yc9-row:hover { border-color: #2c2c2c; }
.hb-yc9-row[data-open="true"] {
  border-color: color-mix(in srgb, var(--hb-yc9-a) 38%, #232323);
  background: #141414;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .35);
}
.hb-yc9-head {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: var(--hb-yc9-row);
  margin: 0;
  padding: 0 12px 0 10px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.hb-yc9-head:focus-visible { outline: 2px solid var(--hb-yc9-a); outline-offset: -2px; border-radius: 11px; }
.hb-yc9-tile {
  display: grid;
  flex: none;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--hb-yc9-c, #2f7bff) 18%, transparent);
  color: var(--hb-yc9-c, #2f7bff);
  transition: transform .3s cubic-bezier(.3, 1.4, .5, 1), background-color .2s ease;
}
.hb-yc9-tile svg { width: 15px; height: 15px; }
.hb-yc9-row[data-open="true"] .hb-yc9-tile { transform: scale(1.06) rotate(-4deg); background: color-mix(in srgb, var(--hb-yc9-c, #2f7bff) 28%, transparent); }
.hb-yc9-txt { flex: 1; min-width: 0; }
.hb-yc9-name { display: block; overflow: hidden; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc9-sub { display: block; overflow: hidden; color: #77777f; font-size: 11.5px; line-height: 15px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yc9-meta { flex: none; color: #d4d4d4; font-size: 12.5px; font-variant-numeric: tabular-nums; font-weight: 600; }
.hb-yc9-chev { width: 14px; height: 14px; flex: none; color: #6f6f6f; transition: transform .32s cubic-bezier(.2, .9, .2, 1), color .15s ease; }
.hb-yc9-head:hover .hb-yc9-chev { color: #ededed; }
.hb-yc9-row[data-open="true"] .hb-yc9-chev { color: var(--hb-yc9-a); transform: rotate(180deg); }
.hb-yc9-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .32s cubic-bezier(.2, .9, .2, 1); }
.hb-yc9-row[data-open="true"] .hb-yc9-panel { grid-template-rows: 1fr; }
.hb-yc9-cut { min-height: 0; overflow: hidden; }
.hb-yc9-body {
  margin: 0 10px 10px 48px;
  padding-top: 8px;
  border-top: 1px solid #232323;
  color: #b4b4b4;
  font-size: 12px;
  line-height: 17px;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity .22s ease, transform .3s cubic-bezier(.2, .9, .2, 1);
}
.hb-yc9-row[data-open="true"] .hb-yc9-body { opacity: 1; transform: none; transition-delay: .07s; }
.hb-yc9-dl { display: grid; grid-template-columns: auto 1fr; gap: 3px 14px; margin: 0; }
.hb-yc9-dl dt { color: #77777f; }
.hb-yc9-dl dd { margin: 0; overflow: hidden; color: #ededed; text-align: right; text-overflow: ellipsis; white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-yc9-row, .hb-yc9-tile, .hb-yc9-chev, .hb-yc9-panel, .hb-yc9-body { transition: none; }
}
`;

export function ListExpandableRows({
  items = defaultItems,
  value,
  defaultValue = [],
  onChange,
  multiple = false,
  rowHeight = 48,
  accent = "#2f7bff",
  className = "",
  style,
  onKeyDown,
  ...rest
}: ListExpandableRowsProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [inner, setInner] = React.useState(defaultValue);
  const openIds = value ?? inner;

  function toggle(id: string) {
    const has = openIds.includes(id);
    const next = has ? openIds.filter((x) => x !== id) : multiple ? [...openIds, id] : [id];
    if (value === undefined) setInner(next);
    onChange?.(next);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const target = e.target as HTMLElement;
    if (!target.hasAttribute("data-yc9-head")) return;
    const id = target.dataset.yc9Head ?? "";
    if (e.key === "Escape") {
      if (openIds.includes(id)) {
        e.preventDefault();
        toggle(id);
      } else target.blur();
      return;
    }
    const heads = Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-yc9-head]") ?? []);
    const at = heads.indexOf(target);
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(heads.length - 1, at + 1);
    else if (e.key === "ArrowUp") next = Math.max(0, at - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = heads.length - 1;
    if (next >= 0) {
      e.preventDefault();
      heads[next]?.focus();
    }
  }

  const vars = { "--hb-yc9-a": accent, "--hb-yc9-row": `${rowHeight}px`, ...style } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-yc9 ${className}`} style={vars} onKeyDown={handleKeyDown} {...rest}>
      <style href="hb-list-expandable-rows" precedence="default">{css}</style>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const panelId = `${uid}-${item.id}`;
        const hasDetails = item.details !== undefined && item.details !== null;
        return (
          <div key={item.id} className="hb-yc9-row" data-open={isOpen && hasDetails}>
            <button
              type="button"
              className="hb-yc9-head"
              data-yc9-head={item.id}
              aria-expanded={hasDetails ? isOpen : undefined}
              aria-controls={hasDetails ? panelId : undefined}
              onClick={() => hasDetails && toggle(item.id)}
            >
              <span className="hb-yc9-tile" style={item.color ? ({ "--hb-yc9-c": item.color } as React.CSSProperties) : undefined} aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ICONS[item.icon ?? "receipt"]} />
                </svg>
              </span>
              <span className="hb-yc9-txt">
                <span className="hb-yc9-name">{item.title}</span>
                {item.subtitle ? <span className="hb-yc9-sub">{item.subtitle}</span> : null}
              </span>
              {item.meta ? <span className="hb-yc9-meta">{item.meta}</span> : null}
              {hasDetails ? (
                <svg className="hb-yc9-chev" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 5.5L7 9l3.5-3.5" />
                </svg>
              ) : null}
            </button>
            {hasDetails ? (
              <div id={panelId} className="hb-yc9-panel" role="region" aria-label={item.title}>
                <div className="hb-yc9-cut" inert={!isOpen}>
                  <div className="hb-yc9-body">{item.details}</div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
