"use client";

import * as React from "react";

export interface DataTableColumn {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  render?: (row: Record<string, unknown>) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn[];
  rows: Record<string, unknown>[];
  zebra?: boolean;
  maxHeight?: number;
  emptyText?: string;
  pageSize?: number;
  caption?: string;
}

const css = `
.hb-dt {
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-radius: 12px;
  border: 1px solid #262626;
  background: #111111;
  color: #ededed;
  overflow: hidden;
  font-size: 13px;
}
.hb-dt-scroll { overflow: auto; max-height: var(--hb-dt-h, 320px); outline: none; }
.hb-dt-scroll:focus-visible { box-shadow: inset 0 0 0 2px rgba(47, 123, 255, .6); }
.hb-dt-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.hb-dt-table caption {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
.hb-dt-th {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0;
  background: #171717;
  border-bottom: 1px solid #262626;
  color: #8f8f8f;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .04em;
  text-transform: uppercase;
  text-align: left;
  white-space: nowrap;
}
.hb-dt-th[data-align="right"] { text-align: right; }
.hb-dt-th[data-align="center"] { text-align: center; }
.hb-dt-h {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 9px 14px;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  text-align: inherit;
  cursor: default;
}
.hb-dt-th[data-align="right"] .hb-dt-h { justify-content: flex-end; }
.hb-dt-th[data-align="center"] .hb-dt-h { justify-content: center; }
.hb-dt-h[data-sortable="true"] { cursor: pointer; transition: color .15s ease; }
.hb-dt-h[data-sortable="true"]:hover { color: #ededed; }
.hb-dt-h:focus-visible { outline: 2px solid rgba(47, 123, 255, .7); outline-offset: -2px; border-radius: 4px; }
.hb-dt-th[aria-sort="ascending"], .hb-dt-th[aria-sort="descending"] { color: #ededed; }
.hb-dt-arrow { width: 8px; height: 10px; flex: none; opacity: .35; transition: opacity .15s ease, transform .2s ease; }
.hb-dt-th[aria-sort="ascending"] .hb-dt-arrow,
.hb-dt-th[aria-sort="descending"] .hb-dt-arrow { opacity: 1; }
.hb-dt-th[aria-sort="descending"] .hb-dt-arrow { transform: rotate(180deg); }
.hb-dt-td {
  padding: 10px 14px;
  border-bottom: 1px solid #1c1c1c;
  text-align: left;
  font-weight: 400;
  white-space: nowrap;
}
.hb-dt-td[data-align="right"] { text-align: right; font-variant-numeric: tabular-nums; }
.hb-dt-td[data-align="center"] { text-align: center; }
.hb-dt-tr:last-child .hb-dt-td { border-bottom: 0; }
.hb-dt[data-zebra="true"] .hb-dt-tr:nth-child(even) .hb-dt-td { background: rgba(255, 255, 255, .02); }
.hb-dt-tr { transition: background-color .15s ease; }
.hb-dt-tr:hover .hb-dt-td { background: rgba(255, 255, 255, .045); }
.hb-dt-empty { padding: 28px 14px; text-align: center; color: #8f8f8f; }
.hb-dt-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  border-top: 1px solid #262626;
  background: #131313;
  color: #8f8f8f;
  font-size: 12px;
}
.hb-dt-range { font-variant-numeric: tabular-nums; }
.hb-dt-pager { display: flex; align-items: center; gap: 6px; }
.hb-dt-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border-radius: 7px;
  border: 1px solid #262626;
  background: #171717;
  color: #ededed;
  cursor: pointer;
  transition: border-color .15s ease, background-color .15s ease, opacity .15s ease;
}
.hb-dt-btn:hover:not(:disabled) { border-color: #3a3a3a; background: #1f1f1f; }
.hb-dt-btn:focus-visible { outline: 2px solid rgba(47, 123, 255, .7); outline-offset: 1px; }
.hb-dt-btn:disabled { opacity: .35; cursor: default; }
.hb-dt-btn svg { width: 12px; height: 12px; }
.hb-dt-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 9px 2px 7px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--hb-pill);
  background: color-mix(in srgb, var(--hb-pill) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--hb-pill) 28%, transparent);
}
.hb-dt-pill::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
@media (prefers-reduced-motion: reduce) {
  .hb-dt-tr, .hb-dt-h, .hb-dt-arrow, .hb-dt-btn { transition: none !important; }
}
`;

const TONES: Record<string, string> = {
  paid: "#22c55e",
  active: "#22c55e",
  success: "#22c55e",
  succeeded: "#22c55e",
  completed: "#22c55e",
  delivered: "#22c55e",
  approved: "#22c55e",
  pending: "#f5b301",
  processing: "#f5b301",
  trial: "#f5b301",
  review: "#f5b301",
  draft: "#f5b301",
  failed: "#ef4444",
  cancelled: "#ef4444",
  canceled: "#ef4444",
  overdue: "#ef4444",
  declined: "#ef4444",
  error: "#ef4444",
  refunded: "#2f7bff",
  scheduled: "#2f7bff",
  new: "#2f7bff",
};

export function pill(status: string) {
  const tone = TONES[String(status).trim().toLowerCase()] ?? "#8f8f8f";
  return (
    <span className="hb-dt-pill" style={{ ["--hb-pill" as string]: tone }}>
      <style href="hb-data-table" precedence="default">{css}</style>
      {status}
    </span>
  );
}

function compare(a: unknown, b: unknown) {
  const aNil = a === null || a === undefined || a === "";
  const bNil = b === null || b === undefined || b === "";
  if (aNil || bNil) return aNil === bNil ? 0 : aNil ? 1 : -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === "boolean" && typeof b === "boolean") return Number(a) - Number(b);
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

function cellText(value: unknown) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

export function DataTable({
  columns,
  rows,
  zebra = true,
  maxHeight = 320,
  emptyText = "No results",
  pageSize,
  caption = "Data table",
  className = "",
  style,
  ...rest
}: DataTableProps) {
  const [sort, setSort] = React.useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = React.useState(0);

  const sorted = React.useMemo(() => {
    const indexed = rows.map((row, i) => ({ row, i }));
    if (!sort) return indexed;
    const sign = sort.dir === "asc" ? 1 : -1;
    return indexed.sort((x, y) => {
      const a = x.row[sort.key];
      const b = y.row[sort.key];
      const aNil = a === null || a === undefined || a === "";
      const bNil = b === null || b === undefined || b === "";
      if (aNil || bNil) return compare(a, b) || x.i - y.i;
      return compare(a, b) * sign || x.i - y.i;
    });
  }, [rows, sort]);

  const paged = typeof pageSize === "number" && pageSize > 0;
  const size = paged ? Math.floor(pageSize) : sorted.length;
  const pageCount = paged ? Math.max(1, Math.ceil(sorted.length / size)) : 1;
  const current = Math.min(page, pageCount - 1);
  const visible = paged ? sorted.slice(current * size, current * size + size) : sorted;
  const from = sorted.length === 0 ? 0 : current * size + 1;
  const to = paged ? Math.min(sorted.length, current * size + size) : sorted.length;

  const toggle = (key: string) => {
    setPage(0);
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  };

  return (
    <div
      className={`hb-dt ${className}`}
      data-zebra={zebra ? "true" : "false"}
      style={{ ["--hb-dt-h" as string]: `${maxHeight}px`, ...style }}
      {...rest}
    >
      <style href="hb-data-table" precedence="default">{css}</style>
      <div className="hb-dt-scroll" role="region" aria-label={caption} tabIndex={0}>
        <table className="hb-dt-table">
          <caption>{caption}</caption>
          <thead>
            <tr>
              {columns.map((col) => {
                const sortable = col.sortable !== false;
                const dir = sort && sort.key === col.key ? sort.dir : null;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className="hb-dt-th"
                    data-align={col.align ?? "left"}
                    aria-sort={sortable ? (dir === "asc" ? "ascending" : dir === "desc" ? "descending" : "none") : undefined}
                  >
                    {sortable ? (
                      <button type="button" className="hb-dt-h" data-sortable="true" onClick={() => toggle(col.key)}>
                        {col.header}
                        <svg className="hb-dt-arrow" viewBox="0 0 8 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 9V1.5M1.2 4.2 4 1.4l2.8 2.8" />
                        </svg>
                      </button>
                    ) : (
                      <span className="hb-dt-h">{col.header}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td className="hb-dt-empty" colSpan={Math.max(1, columns.length)}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              visible.map(({ row, i }) => (
                <tr key={i} className="hb-dt-tr">
                  {columns.map((col, c) => {
                    const content = col.render ? col.render(row) : cellText(row[col.key]);
                    return c === 0 ? (
                      <th key={col.key} scope="row" className="hb-dt-td" data-align={col.align ?? "left"}>
                        {content}
                      </th>
                    ) : (
                      <td key={col.key} className="hb-dt-td" data-align={col.align ?? "left"}>
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {paged ? (
        <div className="hb-dt-foot">
          <span className="hb-dt-range" aria-live="polite">
            {from}-{to} of {sorted.length}
          </span>
          <div className="hb-dt-pager">
            <button
              type="button"
              className="hb-dt-btn"
              aria-label="Previous page"
              disabled={current === 0}
              onClick={() => setPage(current - 1)}
            >
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7.5 2.5 4 6l3.5 3.5" />
              </svg>
            </button>
            <button
              type="button"
              className="hb-dt-btn"
              aria-label="Next page"
              disabled={current >= pageCount - 1}
              onClick={() => setPage(current + 1)}
            >
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4.5 2.5 8 6l-3.5 3.5" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
