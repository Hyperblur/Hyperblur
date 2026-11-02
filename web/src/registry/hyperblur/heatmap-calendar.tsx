"use client";

import * as React from "react";

export interface HeatmapCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  values?: Record<string, number> | number[];
  endDate?: string;
  weeks?: number;
  colors?: string[];
  unit?: string;
  showTotal?: boolean;
  showLegend?: boolean;
  animate?: boolean;
}

const DAY = 86400000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const LEVELS = ["#171717", "#112a52", "#1a4a94", "#2f7bff", "#8dbcff"];

const css = `
.hb-hmc { position: relative; display: block; width: 100%; min-width: 0; box-sizing: border-box; color: #ededed; font-family: inherit; }
.hb-hmc *, .hb-hmc *::before, .hb-hmc *::after { box-sizing: border-box; }
.hb-hmc-svg { display: block; max-width: 100%; overflow: visible; outline: none; }
.hb-hmc-lab {
  fill: #8f8f8f;
  font-size: 10px;
  font-family: inherit;
}
.hb-hmc-col {
  animation: hb-hmc-in .5s cubic-bezier(.22, .8, .24, 1) backwards;
  animation-delay: calc(var(--hb-hmc-c, 0) * 14ms);
}
.hb-hmc-cell { outline: none; cursor: pointer; stroke: transparent; stroke-width: 1; transition: stroke .12s ease; }
.hb-hmc-cell[data-on="true"] { stroke: #ededed; }
.hb-hmc-cell:focus-visible { stroke: #7fb3ff; stroke-width: 1.5; }
.hb-hmc-tip {
  position: absolute;
  z-index: 2;
  padding: 6px 9px;
  border-radius: 8px;
  border: 1px solid #262626;
  background: #171717;
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, .8);
  font-size: 11px;
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
  transform: translate(-50%, calc(-100% - 8px));
}
.hb-hmc-tip-v { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-hmc-tip-d { color: #8f8f8f; }
.hb-hmc-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 8px; font-size: 11px; color: #8f8f8f; }
.hb-hmc-total { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-variant-numeric: tabular-nums; }
.hb-hmc-total b { color: #ededed; font-weight: 600; }
.hb-hmc-legend { display: flex; align-items: center; gap: 4px; margin-left: auto; flex: none; }
.hb-hmc-sw { width: 10px; height: 10px; border-radius: 3px; }
.hb-hmc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.hb-hmc[data-animate="false"] .hb-hmc-col { animation: none; }
@keyframes hb-hmc-in {
  from { opacity: 0; transform: translateY(6px); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hmc-col { animation: none !important; }
  .hb-hmc-cell { transition: none !important; }
}
`;

function hash(n: number) {
  let x = (n + 0x9e3779b9) | 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return (x ^ (x >>> 16)) >>> 0;
}

function pad2(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function parseDate(s: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (!m) return Date.UTC(2026, 9, 31);
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function iso(ms: number) {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

function group(n: number) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function sampleActivity(endDate = "2026-10-31", weeks = 52): Record<string, number> {
  const endMs = parseDate(endDate);
  const days = Math.max(1, Math.round(weeks)) * 7;
  const out: Record<string, number> = {};
  for (let i = 0; i < days; i++) {
    const ms = endMs - (days - 1 - i) * DAY;
    const dow = new Date(ms).getUTCDay();
    const burst = hash(Math.floor(i / 6) + 101) % 5;
    const roll = hash(i * 7 + 3) % 100;
    let v = 0;
    if (dow === 0 || dow === 6) {
      if (roll < 14) v = 1 + (hash(i + 17) % 3);
    } else if (burst > 0 && roll < 78) {
      v = 1 + (hash(i + 29) % (4 * burst));
    } else if (roll < 22) {
      v = 1 + (hash(i + 41) % 3);
    }
    out[iso(ms)] = v;
  }
  return out;
}

function useWidth(fallback: number) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(fallback);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width);
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

export function HeatmapCalendar({
  values,
  endDate = "2026-10-31",
  weeks = 52,
  colors = LEVELS,
  unit = "contribution",
  showTotal = true,
  showLegend = true,
  animate = true,
  className = "",
  ...rest
}: HeatmapCalendarProps) {
  const [ref, width] = useWidth(720);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [active, setActive] = React.useState<number | null>(null);
  const [tab, setTab] = React.useState<number | null>(null);

  const cols = Math.max(1, Math.round(weeks));
  const endMs = parseDate(endDate);
  const endDow = new Date(endMs).getUTCDay();
  const startMs = endMs - endDow * DAY - (cols - 1) * 7 * DAY;
  const lastIdx = (cols - 1) * 7 + endDow;

  const map = React.useMemo(() => {
    if (!values) return sampleActivity(endDate, cols);
    if (Array.isArray(values)) {
      const m: Record<string, number> = {};
      values.forEach((v, j) => {
        m[iso(endMs - (values.length - 1 - j) * DAY)] = v;
      });
      return m;
    }
    return values;
  }, [values, endDate, endMs, cols]);

  const cells = React.useMemo(() => {
    const out: { idx: number; ms: number; v: number }[] = [];
    for (let idx = 0; idx <= lastIdx; idx++) {
      const ms = startMs + idx * DAY;
      const raw = map[iso(ms)];
      out.push({ idx, ms, v: Number.isFinite(raw) && raw > 0 ? raw : 0 });
    }
    return out;
  }, [map, startMs, lastIdx]);

  const peak = Math.max(1, ...cells.map((c) => c.v));
  const total = cells.reduce((s, c) => s + c.v, 0);
  const level = (v: number) => (v <= 0 ? 0 : Math.min(colors.length - 1, Math.ceil((v / peak) * (colors.length - 1))));

  const labelW = 28;
  const monthH = 16;
  const pitch = Math.max(5, Math.min(16, (width - labelW) / cols));
  const gap = Math.min(3, pitch * 0.22);
  const cell = pitch - gap;
  const gridW = labelW + cols * pitch - gap;
  const gridH = monthH + 7 * pitch - gap;
  const showWeekdays = pitch >= 9;

  const months: { c: number; name: string }[] = [];
  let lastCol = -10;
  for (let c = 0; c < cols; c++) {
    const d = new Date(startMs + c * 7 * DAY);
    if (d.getUTCDate() <= 7 && c - lastCol >= 3) {
      months.push({ c, name: MONTHS[d.getUTCMonth()] });
      lastCol = c;
    }
  }

  const tabIdx = tab ?? lastIdx;
  const word = unit.endsWith("s") ? unit : `${unit}s`;

  const fmtDate = (ms: number) => {
    const d = new Date(ms);
    return `${WEEKDAYS[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  };

  const move = (to: number) => {
    if (to < 0 || to > lastIdx) return;
    setTab(to);
    setActive(to);
    const el = svgRef.current?.querySelector<SVGRectElement>(`[data-i="${to}"]`);
    el?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const base = active ?? tabIdx;
    const next: Record<string, number> = {
      ArrowLeft: base - 7,
      ArrowRight: base + 7,
      ArrowUp: base - 1,
      ArrowDown: base + 1,
      Home: 0,
      End: lastIdx,
    };
    if (e.key in next) {
      e.preventDefault();
      move(next[e.key]);
    } else if (e.key === "Escape") {
      setActive(null);
    }
  };

  const act = active === null ? null : cells[active];
  let tip: React.ReactNode = null;
  if (act) {
    const col = Math.floor(act.idx / 7);
    const row = act.idx % 7;
    const left = labelW + col * pitch + cell / 2;
    const top = monthH + row * pitch;
    tip = (
      <div
        className="hb-hmc-tip"
        aria-hidden="true"
        style={{ left: Math.min(Math.max(left, 74), Math.max(74, gridW - 74)), top }}
      >
        <div className="hb-hmc-tip-v">
          {group(act.v)} {act.v === 1 ? unit : word}
        </div>
        <div className="hb-hmc-tip-d">{fmtDate(act.ms)}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`hb-hmc ${className}`}
      data-animate={animate ? "true" : "false"}
      {...rest}
    >
      <style href="hb-heatmap-calendar" precedence="default">{css}</style>
      <div style={{ position: "relative", width: gridW, maxWidth: "100%" }} onMouseLeave={() => setActive(null)}>
        <svg
          ref={svgRef}
          className="hb-hmc-svg"
          width={gridW}
          height={gridH}
          viewBox={`0 0 ${gridW.toFixed(2)} ${gridH.toFixed(2)}`}
          role="img"
          aria-label={`Activity heatmap for ${cols} weeks ending ${endDate}: ${group(total)} ${word} in total, busiest day ${group(peak)}.`}
          onKeyDown={onKeyDown}
        >
          {months.map((m) => (
            <text key={m.c} className="hb-hmc-lab" x={(labelW + m.c * pitch).toFixed(2)} y={10}>
              {m.name}
            </text>
          ))}
          {showWeekdays
            ? [1, 3, 5].map((r) => (
                <text
                  key={r}
                  className="hb-hmc-lab"
                  x={0}
                  y={(monthH + r * pitch + cell / 2).toFixed(2)}
                  dominantBaseline="middle"
                >
                  {WEEKDAYS[r]}
                </text>
              ))
            : null}
          {Array.from({ length: cols }, (_, c) => (
            <g key={c} className="hb-hmc-col" style={{ ["--hb-hmc-c" as string]: c }}>
              {cells.slice(c * 7, c * 7 + 7).map((d) => (
                <rect
                  key={d.idx}
                  className="hb-hmc-cell"
                  data-i={d.idx}
                  data-on={active === d.idx ? "true" : "false"}
                  x={(labelW + c * pitch).toFixed(2)}
                  y={(monthH + (d.idx % 7) * pitch).toFixed(2)}
                  width={cell.toFixed(2)}
                  height={cell.toFixed(2)}
                  rx={Math.min(2.5, cell / 4).toFixed(2)}
                  fill={colors[level(d.v)]}
                  tabIndex={d.idx === tabIdx ? 0 : -1}
                  aria-label={`${group(d.v)} ${d.v === 1 ? unit : word} on ${fmtDate(d.ms)}`}
                  onMouseEnter={() => setActive(d.idx)}
                  onFocus={() => {
                    setActive(d.idx);
                    setTab(d.idx);
                  }}
                  onBlur={() => setActive(null)}
                />
              ))}
            </g>
          ))}
        </svg>
        {tip}
      </div>
      {showTotal || showLegend ? (
        <div className="hb-hmc-foot" style={{ width: gridW, maxWidth: "100%" }}>
          {showTotal ? (
            <span className="hb-hmc-total">
              <b>{group(total)}</b> {word} in {cols} weeks
            </span>
          ) : null}
          {showLegend ? (
            <span className="hb-hmc-legend" aria-hidden="true">
              <span>Less</span>
              {colors.map((c, i) => (
                <span key={i} className="hb-hmc-sw" style={{ background: c }} />
              ))}
              <span>More</span>
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
