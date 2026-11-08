"use client";

import * as React from "react";

export interface BulletMetric {
  label: string;
  hint?: string;
  value: number;
  target: number;
  previous?: number;
  projected?: number;
  ranges: [number, number, number];
  inverse?: boolean;
  format?: "currency" | "percent" | "number" | "hours";
}

export interface ChartBulletSetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  metrics?: BulletMetric[];
  title?: string;
  period?: string;
  accent?: string;
  mode?: "actual" | "projected";
  defaultMode?: "actual" | "projected";
  onModeChange?: (mode: "actual" | "projected") => void;
  showToggle?: boolean;
}

const defaultMetrics: BulletMetric[] = [
  { label: "Revenue", hint: "Net new, USD", value: 1840000, target: 2200000, previous: 1620000, projected: 2310000, ranges: [1500000, 2000000, 2600000], format: "currency" },
  { label: "New customers", hint: "Paid accounts", value: 412, target: 500, previous: 368, projected: 538, ranges: [350, 450, 600], format: "number" },
  { label: "Net retention", hint: "Trailing 12 months", value: 108, target: 115, previous: 104, projected: 111, ranges: [100, 110, 125], format: "percent" },
  { label: "Gross margin", hint: "Blended", value: 71, target: 75, previous: 69, projected: 72, ranges: [60, 70, 85], format: "percent" },
  { label: "First response", hint: "Median, lower is better", value: 3.2, target: 2, previous: 4.1, projected: 2.6, ranges: [6, 4, 2.5], inverse: true, format: "hours" },
];

function fmtValue(v: number, f: BulletMetric["format"]) {
  if (f === "currency") {
    if (Math.abs(v) >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
    if (Math.abs(v) >= 1e3) return `$${(v / 1e3).toFixed(0)}k`;
    return `$${v.toFixed(0)}`;
  }
  if (f === "percent") return `${v.toFixed(v % 1 ? 1 : 0)}%`;
  if (f === "hours") return `${v.toFixed(1)}h`;
  return v.toLocaleString("en-US");
}

function statusOf(m: BulletMetric, v: number) {
  const ratio = m.inverse ? m.target / Math.max(0.0001, v) : v / Math.max(0.0001, m.target);
  if (ratio >= 1) return { key: "hit", label: "Target hit" };
  if (ratio >= 0.9) return { key: "track", label: "On track" };
  if (ratio >= 0.8) return { key: "risk", label: "At risk" };
  return { key: "behind", label: "Behind" };
}

const css = `
.hb-wi4 {
  --hb-wi4-a: #2f7bff;
  container-type: inline-size;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  color: #ededed;
  font-family: inherit;
  font-size: 12px;
}
.hb-wi4 *, .hb-wi4 *::before, .hb-wi4 *::after { box-sizing: border-box; }
.hb-wi4-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
.hb-wi4-title { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.hb-wi4-title b { font-size: 13px; font-weight: 600; letter-spacing: -0.01em; }
.hb-wi4-title span { font-size: 11px; color: #8f8f8f; }
.hb-wi4-seg {
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  padding: 2px;
  border-radius: 8px;
  background: #111;
  border: 1px solid #262626;
  flex: none;
}
.hb-wi4-seg::before {
  content: "";
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 2px;
  width: calc(50% - 2px);
  border-radius: 6px;
  background: linear-gradient(#262626, #1d1d1d);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.35s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.hb-wi4-seg[data-mode="projected"]::before { transform: translateX(100%); }
.hb-wi4-seg button {
  position: relative;
  height: 24px;
  padding: 0 10px;
  border: 0;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: color 0.2s ease;
}
.hb-wi4-seg button[aria-pressed="true"] { color: #ededed; }
.hb-wi4-seg button:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); }
.hb-wi4-list { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-wi4-row {
  display: grid;
  grid-template-columns: minmax(92px, 26%) 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 7px 8px;
  border-radius: 9px;
  outline: none;
  transition: background 0.2s ease;
}
.hb-wi4-row:hover, .hb-wi4-row:focus-visible { background: #121212; }
.hb-wi4-row:focus-visible { box-shadow: inset 0 0 0 1px rgba(127, 179, 255, 0.55); }
.hb-wi4-lab { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.hb-wi4-lab b { font-size: 12px; font-weight: 550; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wi4-lab span { font-size: 10.5px; color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wi4-track { position: relative; height: 22px; }
.hb-wi4-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; }
.hb-wi4-band { transition: opacity 0.2s ease; }
.hb-wi4-bar {
  fill: var(--hb-wi4-a);
  transform-box: view-box;
  transform-origin: 0 0;
  transform: scaleX(0);
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) var(--hb-wi4-d, 0ms);
}
.hb-wi4-ghost {
  opacity: 0;
  transform-box: view-box;
  transform-origin: 0 0;
  transition: opacity 0.4s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.hb-wi4[data-mode="projected"] .hb-wi4-ghost { opacity: 1; }
.hb-wi4-tgt { stroke: #ededed; stroke-width: 2; stroke-linecap: round; vector-effect: non-scaling-stroke; opacity: 0; transition: opacity 0.4s ease calc(var(--hb-wi4-d, 0ms) + 500ms); }
.hb-wi4-prev { fill: #0a0a0a; stroke: #a1a1a1; stroke-width: 1.4; vector-effect: non-scaling-stroke; opacity: 0; transition: opacity 0.4s ease calc(var(--hb-wi4-d, 0ms) + 700ms); }
.hb-wi4[data-in="true"] .hb-wi4-tgt, .hb-wi4[data-in="true"] .hb-wi4-prev { opacity: 1; }
.hb-wi4-val { display: flex; align-items: center; gap: 8px; justify-content: flex-end; min-width: 120px; }
.hb-wi4-num { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; font-variant-numeric: tabular-nums; }
.hb-wi4-num b { font-size: 12.5px; font-weight: 600; transition: color 0.3s ease; }
.hb-wi4-num span { font-size: 10.5px; color: #6f6f6f; }
.hb-wi4-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 20px;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid transparent;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
.hb-wi4-pill::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.hb-wi4-pill[data-s="hit"] { color: #4ade80; background: rgba(74, 222, 128, 0.1); border-color: rgba(74, 222, 128, 0.2); }
.hb-wi4-pill[data-s="track"] { color: #7fb3ff; background: rgba(127, 179, 255, 0.1); border-color: rgba(127, 179, 255, 0.2); }
.hb-wi4-pill[data-s="risk"] { color: #f5b544; background: rgba(245, 181, 68, 0.1); border-color: rgba(245, 181, 68, 0.2); }
.hb-wi4-pill[data-s="behind"] { color: #ff7a6b; background: rgba(255, 122, 107, 0.1); border-color: rgba(255, 122, 107, 0.2); }
.hb-wi4-key { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 10px; padding: 0 8px; font-size: 10.5px; color: #8f8f8f; }
.hb-wi4-key span { display: inline-flex; align-items: center; gap: 5px; }
.hb-wi4-key i { display: inline-block; }
@container (max-width: 440px) {
  .hb-wi4-row { grid-template-columns: 1fr auto; gap: 4px 10px; padding: 5px 8px; }
  .hb-wi4-lab span { display: none; }
  .hb-wi4-track { grid-column: 1 / -1; grid-row: 2; height: 14px; }
  .hb-wi4-val { min-width: 0; }
  .hb-wi4-num span { display: none; }
  .hb-wi4-key { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wi4-bar, .hb-wi4-ghost, .hb-wi4-tgt, .hb-wi4-prev, .hb-wi4-seg::before, .hb-wi4-pill { transition: none !important; }
}
`;

export function ChartBulletSet({
  metrics = defaultMetrics,
  title = "Q4 scorecard",
  period = "Day 58 of 92",
  accent = "#2f7bff",
  mode,
  defaultMode = "actual",
  onModeChange,
  showToggle = true,
  className,
  style,
  ...rest
}: ChartBulletSetProps) {
  const id = React.useId().replace(/:/g, "");
  const [inner, setInner] = React.useState(defaultMode);
  const [inView, setInView] = React.useState(false);
  const current = mode ?? inner;

  React.useEffect(() => {
    const t = window.setTimeout(() => setInView(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const setMode = (m: "actual" | "projected") => {
    if (mode === undefined) setInner(m);
    onModeChange?.(m);
  };

  const VW = 300;

  return (
    <div
      {...rest}
      className={["hb-wi4", className].filter(Boolean).join(" ")}
      style={{ ...style, ["--hb-wi4-a" as string]: accent } as React.CSSProperties}
      data-in={inView}
      data-mode={current}
    >
      <style href="hb-chart-bullet-set" precedence="default">{css}</style>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <pattern id={`${id}-hatch`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="5" height="5" fill={accent} opacity="0.18" />
            <line x1="0" y1="0" x2="0" y2="5" stroke={accent} strokeWidth="2.2" opacity="0.75" />
          </pattern>
        </defs>
      </svg>
      <div className="hb-wi4-top">
        <div className="hb-wi4-title">
          <b>{title}</b>
          <span>{period}</span>
        </div>
        {showToggle ? (
          <div className="hb-wi4-seg" data-mode={current} role="group" aria-label="Show values">
            <button type="button" aria-pressed={current === "actual"} onClick={() => setMode("actual")}>
              Actual
            </button>
            <button type="button" aria-pressed={current === "projected"} onClick={() => setMode("projected")}>
              Projected
            </button>
          </div>
        ) : null}
      </div>
      <ul className="hb-wi4-list">
        {metrics.map((m, i) => {
          const max = Math.max(...m.ranges, m.target, m.value, m.projected ?? 0, m.previous ?? 0) * 1.02;
          const sc = (v: number) => (m.inverse ? (1 - v / max) * VW : (v / max) * VW);
          const bands = m.ranges.map((r) => Math.max(0, sc(r))).sort((a, b) => b - a);
          const shown = current === "projected" && m.projected !== undefined ? m.projected : m.value;
          const st = statusOf(m, shown);
          const actualW = Math.max(0, sc(m.value));
          const projW = m.projected !== undefined ? sc(m.projected) : actualW;
          const delta = m.previous !== undefined ? shown - m.previous : null;
          const better = delta === null ? null : m.inverse ? delta < 0 : delta > 0;
          return (
            <li
              key={m.label}
              className="hb-wi4-row"
              tabIndex={0}
              aria-label={`${m.label}: ${fmtValue(shown, m.format)}${current === "projected" ? " projected" : ""}, target ${fmtValue(m.target, m.format)}, ${st.label}`}
            >
              <div className="hb-wi4-lab">
                <b>{m.label}</b>
                {m.hint ? <span>{m.hint}</span> : null}
              </div>
              <div className="hb-wi4-track">
                <svg className="hb-wi4-svg" viewBox={`0 0 ${VW} 22`} preserveAspectRatio="none" role="img" aria-labelledby={`${id}-${i}`}>
                  <title id={`${id}-${i}`}>{`${m.label} ${fmtValue(m.value, m.format)} of ${fmtValue(m.target, m.format)} target`}</title>
                  {bands.map((w, k) => (
                    <rect key={k} className="hb-wi4-band" x={0} y={1} width={w.toFixed(2)} height={20} rx={3} fill={["#1a1a1a", "#222", "#2c2c2c"][k] ?? "#2c2c2c"} />
                  ))}
                  {m.projected !== undefined ? (
                    <rect className="hb-wi4-ghost" fill={`url(#${id}-hatch)`} x={0} y={7} width={Math.max(0, projW).toFixed(2)} height={8} rx={1.5} />
                  ) : null}
                  <rect
                    className="hb-wi4-bar"
                    x={0}
                    y={7}
                    width={Math.max(0, actualW).toFixed(2)}
                    height={8}
                    rx={1.5}
                    style={{ transform: inView ? "scaleX(1)" : "scaleX(0)", ["--hb-wi4-d" as string]: `${120 + i * 110}ms` } as React.CSSProperties}
                  />
                  <line className="hb-wi4-tgt" x1={sc(m.target).toFixed(2)} x2={sc(m.target).toFixed(2)} y1={3} y2={19} style={{ ["--hb-wi4-d" as string]: `${120 + i * 110}ms` } as React.CSSProperties} />
                  {m.previous !== undefined ? (
                    <circle className="hb-wi4-prev" cx={sc(m.previous).toFixed(2)} cy={11} r={2.6} style={{ ["--hb-wi4-d" as string]: `${120 + i * 110}ms` } as React.CSSProperties} />
                  ) : null}
                </svg>
              </div>
              <div className="hb-wi4-val">
                <div className="hb-wi4-num">
                  <b>{fmtValue(shown, m.format)}</b>
                  <span>
                    of {fmtValue(m.target, m.format)}
                    {delta !== null ? (
                      <span style={{ color: better ? "#4ade80" : "#ff7a6b", marginLeft: 4 }}>
                        {delta > 0 ? "+" : ""}
                        {m.format === "currency" ? fmtValue(delta, "currency") : m.format === "hours" ? `${delta.toFixed(1)}h` : m.format === "percent" ? `${delta.toFixed(1)}pt` : delta.toLocaleString("en-US")}
                      </span>
                    ) : null}
                  </span>
                </div>
                <span className="hb-wi4-pill" data-s={st.key}>
                  {st.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="hb-wi4-key" aria-hidden="true">
        <span>
          <i style={{ width: 12, height: 4, borderRadius: 1, background: accent }} />
          Actual
        </span>
        <span>
          <i style={{ width: 2, height: 10, borderRadius: 1, background: "#ededed" }} />
          Target
        </span>
        <span>
          <i style={{ width: 6, height: 6, borderRadius: "50%", border: "1.4px solid #a1a1a1" }} />
          Last quarter
        </span>
        <span>
          <i style={{ width: 12, height: 4, borderRadius: 1, background: `repeating-linear-gradient(45deg, ${accent} 0 2px, transparent 2px 4px)` }} />
          Projected
        </span>
      </div>
    </div>
  );
}
