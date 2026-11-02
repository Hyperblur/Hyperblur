"use client";

import * as React from "react";

export interface RankedItem {
  label: string;
  value: number;
  delta?: number;
}

export interface RankedBarsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: RankedItem[];
  limit?: number;
  color?: string;
  showShare?: boolean;
  showRank?: boolean;
  valueFormatter?: (n: number) => string;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  moreLabel?: string;
  lessLabel?: string;
  animate?: boolean;
}

const DEFAULT_ITEMS: RankedItem[] = [
  { label: "/pricing", value: 18420, delta: 12.4 },
  { label: "/docs/getting-started", value: 14260, delta: 4.1 },
  { label: "/blog/launch-week", value: 9810, delta: -6.8 },
  { label: "/changelog", value: 6540, delta: 0 },
  { label: "/customers", value: 4120, delta: 21.7 },
  { label: "/about", value: 2380, delta: -2.3 },
  { label: "/careers", value: 1760, delta: 8.9 },
];

const css = `
.hb-rkb { display: block; width: 100%; min-width: 0; box-sizing: border-box; container-type: inline-size; color: #ededed; font-family: inherit; --hb-rkb-c: #2f7bff; }
.hb-rkb *, .hb-rkb *::before, .hb-rkb *::after { box-sizing: border-box; }
.hb-rkb-list { display: flex; flex-direction: column; gap: 3px; margin: 0; padding: 0; list-style: none; }
.hb-rkb-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  min-height: 25px;
  padding: 0 8px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.3;
  overflow: hidden;
}
.hb-rkb-fill {
  position: absolute;
  inset: 0 auto 0 0;
  width: var(--hb-rkb-w, 0%);
  border-radius: 6px;
  background: var(--hb-rkb-c);
  opacity: .2;
  transform-origin: left center;
  transition: opacity .2s ease;
  animation: hb-rkb-grow .8s cubic-bezier(.22, .8, .24, 1) backwards;
  animation-delay: calc(var(--hb-rkb-i, 0) * 70ms);
}
.hb-rkb-row:hover .hb-rkb-fill { opacity: .34; }
.hb-rkb-more .hb-rkb-fill { animation: none; }
.hb-rkb-more[data-open="true"] .hb-rkb-fill {
  animation: hb-rkb-grow .8s cubic-bezier(.22, .8, .24, 1) backwards;
  animation-delay: calc(var(--hb-rkb-i, 0) * 70ms + 120ms);
}
.hb-rkb-rank {
  position: relative;
  flex: none;
  width: 14px;
  color: #6b6b6b;
  font-size: 11px;
  text-align: right;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-rkb-label {
  position: relative;
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ededed;
}
.hb-rkb-delta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex: none;
  padding: 1px 6px 1px 5px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: #8f8f8f;
  background: rgba(143, 143, 143, .14);
}
.hb-rkb-delta[data-dir="up"] { color: #34d399; background: rgba(52, 211, 153, .12); }
.hb-rkb-delta[data-dir="down"] { color: #fb7185; background: rgba(251, 113, 133, .12); }
.hb-rkb-delta svg { width: 7px; height: 7px; fill: currentColor; }
.hb-rkb-delta[data-dir="down"] svg { transform: rotate(180deg); }
.hb-rkb-val {
  position: relative;
  flex: none;
  color: #ededed;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-rkb-share {
  position: relative;
  flex: none;
  min-width: 38px;
  color: #8f8f8f;
  text-align: right;
  font-size: 11px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-rkb-more {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .4s cubic-bezier(.22, .8, .24, 1);
}
.hb-rkb-more[data-open="true"] { grid-template-rows: 1fr; }
.hb-rkb-more-in { min-height: 0; overflow: hidden; }
.hb-rkb-more .hb-rkb-list { padding-top: 3px; opacity: 0; transition: opacity .3s ease; }
.hb-rkb-more[data-open="true"] .hb-rkb-list { opacity: 1; transition-delay: .08s; }
.hb-rkb-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  padding: 3px 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 11.5px;
  line-height: 1.3;
  cursor: pointer;
  transition: color .15s ease, background-color .15s ease;
}
.hb-rkb-toggle:hover { color: #ededed; background: #1a1a1a; }
.hb-rkb-toggle:focus-visible { outline: 2px solid #7fb3ff; outline-offset: 1px; }
.hb-rkb-toggle svg { width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; transition: transform .3s ease; }
.hb-rkb-toggle[aria-expanded="true"] svg { transform: rotate(180deg); }
.hb-rkb[data-animate="false"] .hb-rkb-fill { animation: none !important; }
@keyframes hb-rkb-grow {
  from { transform: scaleX(0); }
}
@container (max-width: 260px) {
  .hb-rkb-share { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-rkb-fill { animation: none !important; }
  .hb-rkb-fill, .hb-rkb-more, .hb-rkb-more .hb-rkb-list, .hb-rkb-toggle, .hb-rkb-toggle svg { transition: none !important; }
}
`;

const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

function pct(x: number) {
  return `${(Math.round(x * 1000) / 10).toFixed(1)}%`;
}

export function RankedBars({
  items = DEFAULT_ITEMS,
  limit = 5,
  color = "#2f7bff",
  showShare = true,
  showRank = true,
  valueFormatter,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  moreLabel,
  lessLabel = "Show less",
  animate = true,
  className = "",
  style,
  ...rest
}: RankedBarsProps) {
  const uid = React.useId();
  const [inner, setInner] = React.useState(defaultExpanded);
  const open = expanded ?? inner;

  const fmt = valueFormatter ?? ((n: number) => (n >= 10000 ? compact.format(n) : nf.format(n)));
  const rows = items.map((it, i) => ({ ...it, i, v: Number.isFinite(it.value) ? Math.max(0, it.value) : 0 }));
  const total = rows.reduce((s, r) => s + r.v, 0) || 1;
  const peak = Math.max(1, ...rows.map((r) => r.v));
  const cut = Math.max(1, Math.round(limit));
  const head = rows.slice(0, cut);
  const tail = rows.slice(cut);

  const setOpen = (next: boolean) => {
    if (expanded === undefined) setInner(next);
    onExpandedChange?.(next);
  };

  const renderRow = (r: (typeof rows)[number], k: number) => (
    <li
      key={r.i}
      className="hb-rkb-row"
      title={`${r.label}: ${nf.format(r.v)}, ${pct(r.v / total)} of total`}
      style={{ ["--hb-rkb-w" as string]: `${((r.v / peak) * 100).toFixed(2)}%`, ["--hb-rkb-i" as string]: k }}
    >
      <span className="hb-rkb-fill" aria-hidden="true" />
      {showRank ? <span className="hb-rkb-rank">{r.i + 1}</span> : null}
      <span className="hb-rkb-label">{r.label}</span>
      {typeof r.delta === "number" && Number.isFinite(r.delta) ? (
        <span
          className="hb-rkb-delta"
          data-dir={r.delta > 0 ? "up" : r.delta < 0 ? "down" : "flat"}
          aria-label={`${r.delta > 0 ? "Up" : r.delta < 0 ? "Down" : "Unchanged"} ${nf.format(Math.abs(r.delta))} percent`}
        >
          {r.delta !== 0 ? (
            <svg viewBox="0 0 8 8" aria-hidden="true">
              <path d="M4 1.2 7.4 6.6H.6z" />
            </svg>
          ) : null}
          {nf.format(Math.abs(r.delta))}%
        </span>
      ) : null}
      <span className="hb-rkb-val">{fmt(r.v)}</span>
      {showShare ? <span className="hb-rkb-share">{pct(r.v / total)}</span> : null}
    </li>
  );

  return (
    <div
      className={`hb-rkb ${className}`}
      data-animate={animate ? "true" : "false"}
      style={{ ["--hb-rkb-c" as string]: color, ...style }}
      {...rest}
    >
      <style href="hb-ranked-bars" precedence="default">{css}</style>
      <ol className="hb-rkb-list">{head.map((r, k) => renderRow(r, k))}</ol>
      {tail.length ? (
        <>
          <div id={`${uid}-more`} className="hb-rkb-more" data-open={open ? "true" : "false"}>
            <div className="hb-rkb-more-in" inert={!open}>
              <ol className="hb-rkb-list" start={cut + 1}>
                {tail.map((r, k) => renderRow(r, k))}
              </ol>
            </div>
          </div>
          <button
            type="button"
            className="hb-rkb-toggle"
            aria-expanded={open}
            aria-controls={`${uid}-more`}
            onClick={() => setOpen(!open)}
          >
            {open ? lessLabel : (moreLabel ?? `Show ${tail.length} more`)}
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 3.8 5 6.8 8 3.8" />
            </svg>
          </button>
        </>
      ) : null}
    </div>
  );
}
