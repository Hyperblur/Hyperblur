"use client";

import * as React from "react";

export interface AccountRow {
  id: string;
  name: string;
  domain: string;
  plan: "Starter" | "Growth" | "Scale" | "Enterprise";
  seats: number;
  arr: number;
  health: number;
  owner: string;
  renewal: string;
  usage: number[];
  note?: string;
}

export type AccountSortKey = "name" | "plan" | "seats" | "arr" | "health";

export interface ListSortableExpandProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  rows?: AccountRow[];
  accent?: string;
  defaultSort?: { key: AccountSortKey; dir: "asc" | "desc" };
  onSortChange?: (sort: { key: AccountSortKey; dir: "asc" | "desc" }) => void;
  multiple?: boolean;
  defaultExpanded?: string[];
  onExpandChange?: (ids: string[]) => void;
  currency?: string;
  compact?: boolean;
}

const defaultRows: AccountRow[] = [
  { id: "a1", name: "Larkspur Health", domain: "larkspur.health", plan: "Enterprise", seats: 640, arr: 412000, health: 92, owner: "Maya Chen", renewal: "Mar 14, 2027", usage: [62, 64, 66, 70, 69, 74, 78, 81, 80, 84, 88, 91], note: "Expanding to the claims team in Q1." },
  { id: "a2", name: "Tidewater Freight", domain: "tidewater.co", plan: "Scale", seats: 210, arr: 126000, health: 48, owner: "Jonah Reyes", renewal: "Dec 2, 2026", usage: [80, 78, 74, 75, 70, 66, 61, 58, 55, 52, 50, 47], note: "Champion left in September. Exec sponsor call booked." },
  { id: "a3", name: "Quill & Ledger", domain: "quillledger.com", plan: "Growth", seats: 58, arr: 34800, health: 76, owner: "Priya Raman", renewal: "Jun 30, 2027", usage: [30, 34, 33, 38, 41, 40, 44, 47, 46, 49, 52, 55] },
  { id: "a4", name: "Northbeam Labs", domain: "northbeam.io", plan: "Scale", seats: 184, arr: 110400, health: 84, owner: "Maya Chen", renewal: "Feb 8, 2027", usage: [50, 52, 55, 54, 58, 61, 60, 64, 66, 65, 69, 72] },
  { id: "a5", name: "Cobalt Studio", domain: "cobalt.studio", plan: "Starter", seats: 12, arr: 4320, health: 63, owner: "Leo Marsh", renewal: "Nov 21, 2026", usage: [40, 42, 39, 41, 38, 40, 43, 41, 39, 42, 40, 41] },
  { id: "a6", name: "Meridian Civic", domain: "meridiancivic.org", plan: "Enterprise", seats: 920, arr: 538000, health: 71, owner: "Jonah Reyes", renewal: "Aug 1, 2027", usage: [70, 72, 71, 69, 72, 74, 73, 71, 74, 76, 75, 77], note: "Security review for SSO scopes is open." },
];

const planRank: Record<AccountRow["plan"], number> = { Starter: 0, Growth: 1, Scale: 2, Enterprise: 3 };

function money(v: number, c: string) {
  if (v >= 1e6) return `${c}${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `${c}${(v / 1e3).toFixed(v >= 1e5 ? 0 : 1)}k`;
  return `${c}${v}`;
}

function hue(name: string) {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) h = Math.imul(h ^ name.charCodeAt(i), 16777619);
  return (h >>> 0) % 360;
}

function spark(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = Math.max(1, max - min);
  const pts = values.map((v, i) => [(i / Math.max(1, values.length - 1)) * 100, 30 - ((v - min) / span) * 26 - 2]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
  return { line, area: `${line} L100 32 L0 32 Z`, last: pts[pts.length - 1] };
}

const css = `
.hb-wi5 {
  --hb-wi5-a: #2f7bff;
  container-type: inline-size;
  width: 100%;
  box-sizing: border-box;
  color: #ededed;
  font-family: inherit;
  font-size: 12.5px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: linear-gradient(#111, #0d0d0d);
  overflow: hidden;
}
.hb-wi5 *, .hb-wi5 *::before, .hb-wi5 *::after { box-sizing: border-box; }
.hb-wi5-grid { display: grid; grid-template-columns: 28px minmax(0, 1.8fr) 0.9fr 0.6fr 0.8fr 1fr; align-items: center; column-gap: 10px; padding: 0 12px 0 8px; }
.hb-wi5-head { height: 34px; border-bottom: 1px solid #1f1f1f; background: #0f0f0f; }
.hb-wi5-th {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 26px;
  margin-left: -6px;
  padding: 0 6px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s ease, background 0.2s ease;
}
.hb-wi5-th:hover { color: #ededed; background: #171717; }
.hb-wi5-th:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); }
.hb-wi5-th[data-on="true"] { color: #ededed; }
.hb-wi5-th svg { opacity: 0.35; transition: transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.2s ease; }
.hb-wi5-th[data-on="true"] svg { opacity: 1; color: var(--hb-wi5-a); }
.hb-wi5-th[data-dir="asc"] svg { transform: rotate(180deg); }
.hb-wi5-r { text-align: right; justify-self: end; }
.hb-wi5-th.hb-wi5-r { margin-left: 0; margin-right: -6px; }
.hb-wi5-body { position: relative; }
.hb-wi5-item { position: relative; border-bottom: 1px solid #1a1a1a; background: transparent; will-change: transform; }
.hb-wi5-item:last-child { border-bottom: 0; }
.hb-wi5-item[data-open="true"] { background: #131313; }
.hb-wi5-item[data-open="true"]::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--hb-wi5-a); box-shadow: 0 0 10px var(--hb-wi5-a); }
.hb-wi5-row { height: 46px; cursor: pointer; transition: background 0.18s ease; }
.hb-wi5-row:hover { background: rgba(255, 255, 255, 0.025); }
.hb-wi5-tg {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-wi5-tg:hover { background: #1f1f1f; color: #ededed; }
.hb-wi5-tg:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); }
.hb-wi5-tg svg { transition: transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1); }
.hb-wi5-item[data-open="true"] .hb-wi5-tg svg { transform: rotate(90deg); color: #ededed; }
.hb-wi5-acct { display: flex; align-items: center; gap: 9px; min-width: 0; }
.hb-wi5-logo { width: 26px; height: 26px; flex: none; border-radius: 7px; display: grid; place-items: center; font-size: 10.5px; font-weight: 700; color: #fff; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.4); }
.hb-wi5-nm { display: flex; flex-direction: column; min-width: 0; line-height: 1.2; }
.hb-wi5-nm b { font-weight: 550; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wi5-nm span { font-size: 11px; color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wi5-plan { display: inline-flex; align-items: center; height: 20px; padding: 0 7px; border-radius: 6px; font-size: 11px; font-weight: 500; border: 1px solid #2a2a2a; color: #c8c8c8; background: #161616; white-space: nowrap; }
.hb-wi5-plan[data-p="Enterprise"] { color: #c4b5fd; border-color: rgba(167, 139, 250, 0.3); background: rgba(167, 139, 250, 0.08); }
.hb-wi5-plan[data-p="Scale"] { color: #93c5fd; border-color: rgba(96, 165, 250, 0.28); background: rgba(96, 165, 250, 0.08); }
.hb-wi5-num { font-variant-numeric: tabular-nums; }
.hb-wi5-hl { display: flex; align-items: center; gap: 8px; justify-self: stretch; }
.hb-wi5-meter { position: relative; flex: 1; height: 5px; border-radius: 3px; background: #1f1f1f; overflow: hidden; }
.hb-wi5-meter i { position: absolute; inset: 0 auto 0 0; border-radius: 3px; transform-origin: left; animation: hb-wi5-grow 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; }
.hb-wi5-hl span { width: 22px; text-align: right; font-size: 11.5px; font-variant-numeric: tabular-nums; color: #a1a1a1; }
@keyframes hb-wi5-grow { from { transform: scaleX(0); } }
.hb-wi5-x { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.42s cubic-bezier(0.65, 0, 0.25, 1); }
.hb-wi5-item[data-open="true"] .hb-wi5-x { grid-template-rows: 1fr; }
.hb-wi5-xi { min-height: 0; overflow: hidden; }
.hb-wi5-panel {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 14px;
  padding: 2px 14px 14px 46px;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.hb-wi5-item[data-open="true"] .hb-wi5-panel { opacity: 1; transform: none; transition-delay: 0.08s; }
.hb-wi5-card { padding: 10px 12px; border-radius: 10px; border: 1px solid #222; background: #0e0e0e; }
.hb-wi5-card h4 { display: flex; justify-content: space-between; margin: 0 0 6px; font-size: 11px; font-weight: 500; color: #8f8f8f; }
.hb-wi5-card h4 b { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-wi5-spark { width: 100%; height: 40px; display: block; overflow: visible; }
.hb-wi5-dl { display: grid; grid-template-columns: auto 1fr; gap: 5px 12px; margin: 0; font-size: 11.5px; }
.hb-wi5-dl dt { color: #6f6f6f; }
.hb-wi5-dl dd { margin: 0; text-align: right; color: #d4d4d4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wi5-note { grid-column: 1 / -1; display: flex; gap: 8px; align-items: flex-start; padding: 8px 10px; border-radius: 8px; background: rgba(245, 181, 68, 0.06); border: 1px solid rgba(245, 181, 68, 0.16); color: #e7cf9f; font-size: 11.5px; line-height: 1.4; }
.hb-wi5[data-compact="true"] .hb-wi5-row { height: 40px; }
@container (max-width: 560px) {
  .hb-wi5-grid { grid-template-columns: 26px minmax(0, 1fr) 0.7fr 0.9fr; }
  .hb-wi5-c-plan, .hb-wi5-c-seats { display: none; }
  .hb-wi5-panel { grid-template-columns: 1fr; padding-left: 14px; }
}
@container (max-width: 360px) {
  .hb-wi5-grid { grid-template-columns: 24px minmax(0, 1fr) 0.8fr; }
  .hb-wi5-c-health { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wi5-x, .hb-wi5-panel, .hb-wi5-tg svg, .hb-wi5-th svg { transition: none; }
  .hb-wi5-meter i { animation: none; }
}
`;

const cols: { key: AccountSortKey; label: string; cls: string; right?: boolean }[] = [
  { key: "name", label: "Account", cls: "" },
  { key: "plan", label: "Plan", cls: "hb-wi5-c-plan" },
  { key: "seats", label: "Seats", cls: "hb-wi5-c-seats", right: true },
  { key: "arr", label: "ARR", cls: "hb-wi5-c-arr", right: true },
  { key: "health", label: "Health", cls: "hb-wi5-c-health" },
];

export function ListSortableExpand({
  rows = defaultRows,
  accent = "#2f7bff",
  defaultSort = { key: "arr", dir: "desc" },
  onSortChange,
  multiple = false,
  defaultExpanded = [],
  onExpandChange,
  currency = "$",
  compact = false,
  className,
  style,
  ...rest
}: ListSortableExpandProps) {
  const [sort, setSort] = React.useState(defaultSort);
  const [open, setOpen] = React.useState<string[]>(defaultExpanded);
  const refs = React.useRef(new Map<string, HTMLDivElement>());
  const tops = React.useRef(new Map<string, number>());
  const uid = React.useId().replace(/:/g, "");

  const sorted = React.useMemo(() => {
    const list = [...rows];
    const m = sort.dir === "asc" ? 1 : -1;
    list.sort((a, b) => {
      if (sort.key === "name") return a.name.localeCompare(b.name) * m;
      if (sort.key === "plan") return (planRank[a.plan] - planRank[b.plan] || b.arr - a.arr) * m;
      return (a[sort.key] - b[sort.key]) * m;
    });
    return list;
  }, [rows, sort]);

  React.useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = new Map<string, number>();
    refs.current.forEach((el, key) => next.set(key, el.offsetTop));
    if (!reduce) {
      refs.current.forEach((el, key) => {
        const before = tops.current.get(key);
        const after = next.get(key);
        if (before === undefined || after === undefined || before === after) return;
        el.animate([{ transform: `translateY(${before - after}px)`, zIndex: 2 }, { transform: "translateY(0)", zIndex: 2 }], { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
      });
    }
    tops.current = next;
  }, [sorted]);

  const changeSort = (key: AccountSortKey) => {
    refs.current.forEach((el, k) => tops.current.set(k, el.offsetTop));
    const next = sort.key === key ? { key, dir: sort.dir === "asc" ? ("desc" as const) : ("asc" as const) } : { key, dir: key === "name" ? ("asc" as const) : ("desc" as const) };
    setSort(next);
    onSortChange?.(next);
  };

  const toggle = (id: string) => {
    setOpen((o) => {
      const next = o.includes(id) ? o.filter((x) => x !== id) : multiple ? [...o, id] : [id];
      onExpandChange?.(next);
      return next;
    });
  };

  const healthColor = (h: number) => (h >= 80 ? "#4ade80" : h >= 60 ? "#7fb3ff" : h >= 50 ? "#f5b544" : "#ff7a6b");

  return (
    <div
      {...rest}
      className={["hb-wi5", className].filter(Boolean).join(" ")}
      style={{ ...style, ["--hb-wi5-a" as string]: accent } as React.CSSProperties}
      data-compact={compact}
      role="table"
      aria-label="Accounts"
      aria-rowcount={sorted.length + 1}
    >
      <style href="hb-list-sortable-expand" precedence="default">{css}</style>
      <div className="hb-wi5-grid hb-wi5-head" role="row">
        <span role="columnheader" aria-label="Expand" />
        {cols.map((c) => (
          <span key={c.key} role="columnheader" className={[c.cls, c.right ? "hb-wi5-r" : ""].join(" ")} aria-sort={sort.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
            <button type="button" className={["hb-wi5-th", c.right ? "hb-wi5-r" : ""].join(" ")} data-on={sort.key === c.key} data-dir={sort.key === c.key ? sort.dir : undefined} onClick={() => changeSort(c.key)}>
              {c.label}
              <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </span>
        ))}
      </div>
      <div className="hb-wi5-body" role="rowgroup">
        {sorted.map((r) => {
          const isOpen = open.includes(r.id);
          const sp = spark(r.usage);
          const trend = r.usage[r.usage.length - 1] - r.usage[0];
          const h = hue(r.name);
          const panelId = `${uid}-${r.id}`;
          return (
            <div
              key={r.id}
              className="hb-wi5-item"
              data-open={isOpen}
              ref={(el) => {
                if (el) refs.current.set(r.id, el);
                else refs.current.delete(r.id);
              }}
            >
              <div className="hb-wi5-grid hb-wi5-row" role="row" onClick={() => toggle(r.id)}>
                <span role="cell">
                  <button
                    type="button"
                    className="hb-wi5-tg"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${r.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(r.id);
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                      <path d="M3.5 2 6.5 5 3.5 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </span>
                <span role="cell" className="hb-wi5-acct">
                  <span className="hb-wi5-logo" style={{ background: `linear-gradient(135deg, hsl(${h} 70% 55%), hsl(${(h + 40) % 360} 65% 40%))` }} aria-hidden="true">
                    {r.name
                      .split(/\s+/)
                      .filter((w) => /[A-Za-z]/.test(w))
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span className="hb-wi5-nm">
                    <b>{r.name}</b>
                    <span>{r.domain}</span>
                  </span>
                </span>
                <span role="cell" className="hb-wi5-c-plan">
                  <span className="hb-wi5-plan" data-p={r.plan}>
                    {r.plan}
                  </span>
                </span>
                <span role="cell" className="hb-wi5-c-seats hb-wi5-r hb-wi5-num">
                  {r.seats.toLocaleString("en-US")}
                </span>
                <span role="cell" className="hb-wi5-c-arr hb-wi5-r hb-wi5-num">
                  {money(r.arr, currency)}
                </span>
                <span role="cell" className="hb-wi5-c-health hb-wi5-hl">
                  <span className="hb-wi5-meter" aria-hidden="true">
                    <i style={{ width: `${r.health}%`, background: healthColor(r.health) }} />
                  </span>
                  <span>{r.health}</span>
                </span>
              </div>
              <div className="hb-wi5-x" id={panelId} role="region" aria-label={`${r.name} details`} inert={!isOpen}>
                <div className="hb-wi5-xi">
                  <div className="hb-wi5-panel">
                    <div className="hb-wi5-card">
                      <h4>
                        Weekly active seats, 12 weeks
                        <b style={{ color: trend >= 0 ? "#4ade80" : "#ff7a6b" }}>
                          {trend >= 0 ? "+" : ""}
                          {trend}%
                        </b>
                      </h4>
                      <svg className="hb-wi5-spark" viewBox="0 0 100 32" preserveAspectRatio="none" role="img" aria-label={`Usage trend ${trend >= 0 ? "up" : "down"} ${Math.abs(trend)} percent`}>
                        <defs>
                          <linearGradient id={`${panelId}-g`} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" stopColor={trend >= 0 ? accent : "#ff7a6b"} stopOpacity="0.35" />
                            <stop offset="1" stopColor={trend >= 0 ? accent : "#ff7a6b"} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d={sp.area} fill={`url(#${panelId}-g)`} />
                        <path d={sp.line} fill="none" stroke={trend >= 0 ? accent : "#ff7a6b"} strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="hb-wi5-card">
                      <dl className="hb-wi5-dl">
                        <dt>Owner</dt>
                        <dd>{r.owner}</dd>
                        <dt>Renewal</dt>
                        <dd>{r.renewal}</dd>
                        <dt>Seat price</dt>
                        <dd>{money(Math.round(r.arr / Math.max(1, r.seats) / 12), currency)}/mo</dd>
                        <dt>Plan</dt>
                        <dd>{r.plan}</dd>
                      </dl>
                    </div>
                    {r.note ? (
                      <div className="hb-wi5-note">
                        <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" style={{ flex: "none", marginTop: 1 }}>
                          <path d="M7 1.5 13 12H1z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                          <path d="M7 5.5v3M7 10.2v.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                        {r.note}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
