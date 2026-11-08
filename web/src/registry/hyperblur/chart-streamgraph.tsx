"use client";

import * as React from "react";

export interface StreamSeries {
  name: string;
  color: string;
  values: number[];
}

export interface ChartStreamgraphProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  series?: StreamSeries[];
  labels?: string[];
  baseline?: "center" | "zero";
  height?: number;
  title?: string;
  summary?: string;
  unit?: string;
  format?: (value: number) => string;
  showLegend?: boolean;
  defaultHidden?: string[];
  onSeriesToggle?: (name: string, visible: boolean) => void;
}

const defaultLabels = ["Aug 4", "Aug 11", "Aug 18", "Aug 25", "Sep 1", "Sep 8", "Sep 15", "Sep 22", "Sep 29", "Oct 6", "Oct 13", "Oct 20", "Oct 27", "Nov 3"];

const defaultSeries: StreamSeries[] = [
  { name: "Organic", color: "#2f7bff", values: [42, 44, 47, 45, 51, 56, 58, 61, 59, 64, 69, 72, 70, 76] },
  { name: "Direct", color: "#7fb3ff", values: [28, 27, 30, 32, 31, 33, 36, 35, 38, 37, 39, 41, 44, 43] },
  { name: "Referral", color: "#22c3a6", values: [12, 15, 14, 18, 24, 31, 27, 22, 19, 18, 21, 25, 29, 33] },
  { name: "Social", color: "#a78bfa", values: [9, 11, 18, 26, 21, 15, 13, 12, 16, 22, 30, 24, 19, 17] },
  { name: "Email", color: "#f5b544", values: [6, 14, 7, 6, 15, 7, 6, 16, 8, 7, 17, 8, 7, 19] },
  { name: "Paid", color: "#f472b6", values: [18, 17, 16, 14, 13, 13, 12, 14, 18, 21, 19, 16, 15, 14] },
];

const W = 600;

function smooth(points: [number, number][], move: boolean) {
  if (!points.length) return "";
  const f = (n: number) => n.toFixed(2);
  let d = `${move ? "M" : "L"}${f(points[0][0])} ${f(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

const css = `
.hb-wi1 {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  color: #ededed;
  font-family: inherit;
  font-size: 12px;
}
.hb-wi1 *, .hb-wi1 *::before, .hb-wi1 *::after { box-sizing: border-box; }
.hb-wi1-plot {
  position: relative;
  width: 100%;
  height: var(--hb-wi1-h, 220px);
  outline: none;
  cursor: crosshair;
  touch-action: pan-y;
  border-radius: 10px;
}
.hb-wi1-plot:focus-visible { box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); }
.hb-wi1-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; }
.hb-wi1-guide { stroke: rgba(255, 255, 255, 0.05); stroke-width: 1; vector-effect: non-scaling-stroke; }
.hb-wi1-axis { stroke: rgba(255, 255, 255, 0.14); stroke-width: 1; stroke-dasharray: 2 4; vector-effect: non-scaling-stroke; }
.hb-wi1-layer {
  transform-box: view-box;
  transform-origin: 50% var(--hb-wi1-o, 50%);
  transform: scaleY(0);
  opacity: 0;
  stroke: rgba(10, 10, 10, 0.55);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  transition: d 0.7s cubic-bezier(0.65, 0, 0.25, 1), opacity 0.25s ease, filter 0.25s ease;
}
.hb-wi1[data-in="true"] .hb-wi1-layer {
  transform: scaleY(1);
  opacity: 1;
  transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--hb-wi1-d, 0ms), opacity 0.5s ease var(--hb-wi1-d, 0ms), d 0.7s cubic-bezier(0.65, 0, 0.25, 1), filter 0.25s ease;
}
.hb-wi1[data-focus="true"] .hb-wi1-layer { opacity: 0.22; }
.hb-wi1[data-focus="true"] .hb-wi1-layer[data-on="true"] { opacity: 1; filter: brightness(1.12) saturate(1.1); }
.hb-wi1-cursor {
  position: absolute;
  top: 6px;
  bottom: 6px;
  width: 1px;
  margin-left: -0.5px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.55) 18%, rgba(255, 255, 255, 0.55) 82%, transparent);
  pointer-events: none;
  transition: left 0.16s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease;
}
.hb-wi1-tip {
  position: absolute;
  top: 8px;
  z-index: 2;
  min-width: 148px;
  padding: 9px 10px 8px;
  border-radius: 10px;
  background: rgba(17, 17, 17, 0.94);
  border: 1px solid #262626;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  pointer-events: none;
  transition: left 0.16s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease, transform 0.2s ease;
}
.hb-wi1-tip-h { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 6px; font-size: 11px; color: #8f8f8f; }
.hb-wi1-tip-h b { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-wi1-row { display: flex; align-items: center; gap: 7px; padding: 1.5px 0; font-size: 11.5px; color: #a1a1a1; }
.hb-wi1-row[data-on="true"] { color: #ededed; }
.hb-wi1-row i { width: 7px; height: 7px; border-radius: 2px; flex: none; }
.hb-wi1-row span { flex: 1; }
.hb-wi1-row b { font-weight: 500; font-variant-numeric: tabular-nums; }
.hb-wi1-x { position: relative; height: 22px; margin-top: 6px; }
.hb-wi1-xl {
  position: absolute;
  top: 4px;
  transform: translateX(-50%);
  font-size: 10.5px;
  color: #6f6f6f;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  transition: color 0.2s ease;
}
.hb-wi1-xl[data-on="true"] { color: #ededed; }
.hb-wi1-legend { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.hb-wi1-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  padding: 0 9px 0 7px;
  border-radius: 999px;
  border: 1px solid #262626;
  background: #111;
  color: #ededed;
  font: inherit;
  font-size: 11px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}
.hb-wi1-chip:hover { background: #171717; border-color: #333; }
.hb-wi1-chip:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); }
.hb-wi1-chip i { width: 8px; height: 8px; border-radius: 50%; transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease; }
.hb-wi1-chip[aria-pressed="false"] { color: #6f6f6f; }
.hb-wi1-chip[aria-pressed="false"] i { background: transparent !important; box-shadow: inset 0 0 0 1.5px #4a4a4a; transform: scale(0.85); }
.hb-wi1-chip em { font-style: normal; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-wi1-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-wi1-layer, .hb-wi1[data-in="true"] .hb-wi1-layer { transform: none; opacity: 1; transition: none; }
  .hb-wi1-cursor, .hb-wi1-tip, .hb-wi1-chip, .hb-wi1-chip i { transition: none; }
}
`;

export function ChartStreamgraph({
  series = defaultSeries,
  labels = defaultLabels,
  baseline = "center",
  height = 220,
  title = "Sessions by channel",
  summary,
  unit = "k",
  format,
  showLegend = true,
  defaultHidden = [],
  onSeriesToggle,
  className,
  style,
  ...rest
}: ChartStreamgraphProps) {
  const id = React.useId().replace(/:/g, "");
  const [inView, setInView] = React.useState(false);
  const [hidden, setHidden] = React.useState<string[]>(defaultHidden);
  const [col, setCol] = React.useState<number | null>(null);
  const [layer, setLayer] = React.useState<string | null>(null);
  const plotRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const t = window.setTimeout(() => setInView(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const n = Math.max(2, labels.length);
  const fmt = format ?? ((v: number) => `${Math.round(v)}${unit}`);
  const H = 240;
  const pad = 12;

  const geometry = React.useMemo(() => {
    const vis = series.map((s) => (hidden.includes(s.name) ? 0 : 1));
    const totals = Array.from({ length: n }, (_, j) => series.reduce((acc, s, i) => acc + (s.values[j] ?? 0) * vis[i], 0));
    const allTotals = Array.from({ length: n }, (_, j) => series.reduce((acc, s) => acc + (s.values[j] ?? 0), 0));
    const max = Math.max(1, ...allTotals);
    const scale = (H - pad * 2) / max;
    const xs = Array.from({ length: n }, (_, j) => (j / (n - 1)) * W);
    const cum = Array.from({ length: n }, (_, j) => (baseline === "center" ? -totals[j] / 2 : 0));
    const toY = (v: number) => (baseline === "center" ? H / 2 - v * scale : H - pad - v * scale);
    const paths = series.map((s, i) => {
      const lower: [number, number][] = [];
      const upper: [number, number][] = [];
      for (let j = 0; j < n; j++) {
        const v = (s.values[j] ?? 0) * vis[i];
        lower.push([xs[j], toY(cum[j])]);
        cum[j] += v;
        upper.push([xs[j], toY(cum[j])]);
      }
      return `${smooth(upper, true)} ${smooth(lower.reverse(), false)} Z`;
    });
    return { paths, xs, totals };
  }, [series, hidden, n, baseline]);

  const pick = (clientX: number) => {
    const el = plotRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    setCol(Math.round(t * (n - 1)));
  };

  const toggle = (name: string) => {
    setHidden((h) => {
      const visibleNow = !h.includes(name);
      if (visibleNow && series.length - h.length <= 1) return h;
      onSeriesToggle?.(name, !visibleNow);
      return visibleNow ? [...h, name] : h.filter((x) => x !== name);
    });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      setCol((c) => Math.min(n - 1, Math.max(0, (c ?? (dir > 0 ? -1 : n)) + dir)));
    } else if (e.key === "Home") {
      e.preventDefault();
      setCol(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setCol(n - 1);
    } else if (e.key === "Escape") {
      setCol(null);
    }
  };

  const tipLeft = col === null ? 0 : (col / (n - 1)) * 100;
  const tipSide = tipLeft > 58 ? "left" : "right";
  const step = n > 10 ? 2 : 1;
  const rows = col === null ? [] : series.map((s) => ({ s, v: hidden.includes(s.name) ? null : s.values[col] ?? 0 })).filter((r) => r.v !== null).sort((a, b) => (b.v ?? 0) - (a.v ?? 0));
  const desc =
    summary ??
    `Stacked stream of ${series.length} series over ${n} periods, from ${labels[0]} to ${labels[n - 1]}. Latest total ${fmt(geometry.totals[n - 1] ?? 0)}.`;

  return (
    <div
      {...rest}
      className={["hb-wi1", className].filter(Boolean).join(" ")}
      style={{ ...style, ["--hb-wi1-h" as string]: `${height}px`, ["--hb-wi1-o" as string]: baseline === "center" ? "50%" : "100%" } as React.CSSProperties}
      data-in={inView}
      data-focus={layer !== null}
    >
      <style href="hb-chart-streamgraph" precedence="default">{css}</style>
      <div
        ref={plotRef}
        className="hb-wi1-plot"
        tabIndex={0}
        role="group"
        aria-label={`${title}. Use left and right arrows to read each period.`}
        onPointerMove={(e) => pick(e.clientX)}
        onPointerLeave={() => {
          setCol(null);
          setLayer(null);
        }}
        onKeyDown={onKey}
        onBlur={() => setCol(null)}
      >
        <svg className="hb-wi1-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-labelledby={`${id}-t ${id}-d`}>
          <title id={`${id}-t`}>{title}</title>
          <desc id={`${id}-d`}>{desc}</desc>
          {geometry.xs.map((x, j) => (j % step === 0 ? <line key={j} className="hb-wi1-guide" x1={x.toFixed(2)} x2={x.toFixed(2)} y1={0} y2={H} /> : null))}
          {baseline === "center" ? <line className="hb-wi1-axis" x1={0} x2={W} y1={H / 2} y2={H / 2} /> : <line className="hb-wi1-axis" x1={0} x2={W} y1={H - pad} y2={H - pad} />}
          {series.map((s, i) => (
            <path
              key={s.name}
              className="hb-wi1-layer"
              d={geometry.paths[i]}
              fill={s.color}
              data-on={layer === s.name}
              style={{ d: `path("${geometry.paths[i]}")`, ["--hb-wi1-d" as string]: `${i * 90}ms` } as React.CSSProperties}
              onPointerEnter={() => setLayer(s.name)}
              onPointerLeave={() => setLayer(null)}
            />
          ))}
        </svg>
        <div className="hb-wi1-cursor" style={{ left: `${tipLeft.toFixed(2)}%`, opacity: col === null ? 0 : 1 }} />
        <div
          className="hb-wi1-tip"
          aria-hidden={col === null}
          style={{
            left: `${tipLeft.toFixed(2)}%`,
            opacity: col === null ? 0 : 1,
            transform: tipSide === "right" ? "translateX(12px)" : "translateX(calc(-100% - 12px))",
          }}
        >
          {col !== null ? (
            <>
              <div className="hb-wi1-tip-h">
                <span>{labels[col]}</span>
                <b>{fmt(geometry.totals[col] ?? 0)}</b>
              </div>
              {rows.map(({ s, v }) => (
                <div key={s.name} className="hb-wi1-row" data-on={layer === null || layer === s.name}>
                  <i style={{ background: s.color }} />
                  <span>{s.name}</span>
                  <b>{fmt(v ?? 0)}</b>
                </div>
              ))}
            </>
          ) : null}
        </div>
        <div className="hb-wi1-sr" aria-live="polite">
          {col !== null ? `${labels[col]}: total ${fmt(geometry.totals[col] ?? 0)}. ${rows.map((r) => `${r.s.name} ${fmt(r.v ?? 0)}`).join(", ")}` : ""}
        </div>
      </div>
      <div className="hb-wi1-x" aria-hidden="true">
        {labels.map((l, j) =>
          j % step === 0 ? (
            <span key={l + j} className="hb-wi1-xl" data-on={col === j} style={{ left: `${((j / (n - 1)) * 100).toFixed(2)}%`, transform: j === 0 ? "none" : j === n - 1 ? "translateX(-100%)" : undefined }}>
              {l}
            </span>
          ) : null,
        )}
      </div>
      {showLegend ? (
        <div className="hb-wi1-legend">
          {series.map((s) => {
            const on = !hidden.includes(s.name);
            const last = s.values[n - 1] ?? 0;
            return (
              <button key={s.name} type="button" className="hb-wi1-chip" aria-pressed={on} onClick={() => toggle(s.name)} onPointerEnter={() => on && setLayer(s.name)} onPointerLeave={() => setLayer(null)} onFocus={() => on && setLayer(s.name)} onBlur={() => setLayer(null)}>
                <i style={{ background: s.color }} />
                {s.name}
                <em>{fmt(last)}</em>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
