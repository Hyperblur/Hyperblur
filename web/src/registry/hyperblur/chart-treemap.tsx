"use client";

import * as React from "react";

export interface TreemapLeaf {
  name: string;
  value: number;
  change?: number;
}

export interface TreemapGroup {
  name: string;
  children: TreemapLeaf[];
}

export interface ChartTreemapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title" | "onSelect"> {
  data?: TreemapGroup[];
  height?: number;
  title?: string;
  summary?: string;
  format?: (value: number) => string;
  rootLabel?: string;
  colorBy?: "change" | "group";
  increaseColor?: string;
  decreaseColor?: string;
  palette?: string[];
  onZoom?: (group: string | null) => void;
  onSelect?: (leaf: TreemapLeaf & { group: string }) => void;
}

const defaultData: TreemapGroup[] = [
  {
    name: "Compute",
    children: [
      { name: "Instances", value: 18400, change: 6.2 },
      { name: "Kubernetes", value: 12900, change: 14.8 },
      { name: "GPU jobs", value: 7600, change: 31 },
      { name: "Functions", value: 3100, change: -8.4 },
    ],
  },
  {
    name: "Data",
    children: [
      { name: "Warehouse", value: 9800, change: 4.1 },
      { name: "Postgres", value: 6200, change: -2.3 },
      { name: "Cache", value: 2400, change: 0.6 },
      { name: "Search", value: 1900, change: 9.7 },
    ],
  },
  {
    name: "Storage",
    children: [
      { name: "Object storage", value: 5600, change: 3.2 },
      { name: "Block volumes", value: 3900, change: -11.5 },
      { name: "Backups", value: 1700, change: 1.1 },
    ],
  },
  {
    name: "Network",
    children: [
      { name: "Egress", value: 4800, change: 18.9 },
      { name: "CDN", value: 2900, change: -4.6 },
      { name: "Load balancers", value: 1300, change: 0 },
    ],
  },
  {
    name: "Observability",
    children: [
      { name: "Logs", value: 3600, change: 22.4 },
      { name: "Metrics", value: 1800, change: -6.1 },
      { name: "Traces", value: 1100, change: 3.5 },
    ],
  },
];

const defaultPalette = ["#2f7bff", "#22c3a6", "#a78bfa", "#f5b544", "#f472b6", "#7fb3ff"];

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

function worst(row: number[], side: number) {
  const sum = row.reduce((a, b) => a + b, 0);
  const max = Math.max(...row);
  const min = Math.min(...row);
  const s2 = side * side;
  return Math.max((s2 * max) / (sum * sum), (sum * sum) / (s2 * min));
}

function squarify(values: number[], box: Box): Box[] {
  const out: Box[] = new Array(values.length);
  const total = values.reduce((a, b) => a + b, 0);
  if (total <= 0 || box.w <= 0 || box.h <= 0) return values.map(() => ({ x: box.x, y: box.y, w: 0, h: 0 }));
  const order = values.map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v);
  const scale = (box.w * box.h) / total;
  let { x, y, w, h } = box;
  let k = 0;
  while (k < order.length) {
    const side = Math.min(w, h);
    const row = [order[k]];
    let j = k + 1;
    while (j < order.length) {
      const a = row.map((r) => r.v * scale);
      const b = [...a, order[j].v * scale];
      if (worst(b, side) <= worst(a, side)) {
        row.push(order[j]);
        j++;
      } else break;
    }
    const area = row.reduce((acc, r) => acc + r.v * scale, 0);
    if (w >= h) {
      const cw = h > 0 ? area / h : 0;
      let cy = y;
      row.forEach((r) => {
        const rh = cw > 0 ? (r.v * scale) / cw : 0;
        out[r.i] = { x, y: cy, w: cw, h: rh };
        cy += rh;
      });
      x += cw;
      w -= cw;
    } else {
      const rh = w > 0 ? area / w : 0;
      let cx = x;
      row.forEach((r) => {
        const cw = rh > 0 ? (r.v * scale) / rh : 0;
        out[r.i] = { x: cx, y, w: cw, h: rh };
        cx += cw;
      });
      y += rh;
      h -= rh;
    }
    k = j;
  }
  return out;
}

function hexRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.padEnd(6, "0");
  const n = parseInt(full.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: string, b: string, t: number) {
  const x = hexRgb(a);
  const y = hexRgb(b);
  const c = x.map((v, i) => Math.round(v + (y[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

const css = `
.hb-wi3 {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  color: #ededed;
  font-family: inherit;
  font-size: 12px;
}
.hb-wi3 *, .hb-wi3 *::before, .hb-wi3 *::after { box-sizing: border-box; }
.hb-wi3-bar { display: flex; align-items: center; justify-content: space-between; gap: 10px; height: 26px; margin-bottom: 8px; }
.hb-wi3-crumbs { display: flex; align-items: center; gap: 4px; min-width: 0; font-size: 12px; }
.hb-wi3-crumb {
  height: 24px;
  padding: 0 8px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-wi3-crumb:hover { background: #171717; color: #ededed; }
.hb-wi3-crumb:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); }
.hb-wi3-crumb[aria-current="page"] { color: #ededed; font-weight: 550; cursor: default; background: transparent; }
.hb-wi3-sep { color: #4a4a4a; }
.hb-wi3-scale { display: flex; align-items: center; gap: 6px; font-size: 10.5px; color: #8f8f8f; white-space: nowrap; }
.hb-wi3-ramp { width: 64px; height: 6px; border-radius: 3px; }
.hb-wi3-plot { position: relative; width: 100%; height: var(--hb-wi3-h, 260px); overflow: hidden; border-radius: 10px; background: #0d0d0d; }
.hb-wi3-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.hb-wi3-rect {
  transition: transform 0.65s cubic-bezier(0.65, 0, 0.25, 1), opacity 0.4s ease, filter 0.2s ease;
}
.hb-wi3[data-in="false"] .hb-wi3-rect { transition: none; }
.hb-wi3-rect[data-dim="true"] { opacity: 0; }
.hb-wi3-rect[data-hot="true"] { filter: brightness(1.25); }
.hb-wi3-tile {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1px;
  padding: 6px 7px;
  border: 0;
  margin: 0;
  background: transparent;
  color: #fff;
  font: inherit;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
  transition: left 0.65s cubic-bezier(0.65, 0, 0.25, 1), top 0.65s cubic-bezier(0.65, 0, 0.25, 1), width 0.65s cubic-bezier(0.65, 0, 0.25, 1), height 0.65s cubic-bezier(0.65, 0, 0.25, 1), opacity 0.4s ease;
}
.hb-wi3[data-in="false"] .hb-wi3-tile { transition: none; }
.hb-wi3-tile:focus-visible { outline: none; box-shadow: inset 0 0 0 2px #ededed; }
.hb-wi3-tile[data-dim="true"] { opacity: 0; pointer-events: none; }
.hb-wi3-tile b { font-size: 11.5px; font-weight: 600; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35); }
.hb-wi3-tile span { font-size: 10.5px; color: rgba(255, 255, 255, 0.78); font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-wi3-tile [data-hide="true"] { display: none; }
.hb-wi3-tile > * { opacity: 0; transform: translateY(4px); transition: opacity 0.35s ease, transform 0.35s ease; transition-delay: var(--hb-wi3-d, 0ms); }
.hb-wi3[data-in="true"] .hb-wi3-tile > * { opacity: 1; transform: none; }
.hb-wi3-head {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 18px;
  padding: 0 6px;
  border: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  cursor: zoom-in;
  transition: opacity 0.3s ease;
}
.hb-wi3-head em { font-style: normal; font-weight: 500; color: #8f8f8f; text-transform: none; letter-spacing: 0; font-variant-numeric: tabular-nums; }
.hb-wi3-head:focus-visible { outline: none; box-shadow: inset 0 0 0 1.5px rgba(127, 179, 255, 0.8); border-radius: 4px; }
.hb-wi3-head[data-dim="true"] { opacity: 0; pointer-events: none; }
.hb-wi3-tip {
  position: absolute;
  z-index: 4;
  min-width: 150px;
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(17, 17, 17, 0.95);
  border: 1px solid #262626;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  pointer-events: none;
  white-space: nowrap;
}
.hb-wi3-tip small { display: block; font-size: 10.5px; color: #8f8f8f; }
.hb-wi3-tip strong { display: block; margin-top: 2px; font-size: 12.5px; font-weight: 600; }
.hb-wi3-tip div { display: flex; justify-content: space-between; gap: 14px; margin-top: 5px; font-size: 11.5px; font-variant-numeric: tabular-nums; color: #a1a1a1; }
.hb-wi3-tip div b { color: #ededed; font-weight: 550; }
.hb-wi3-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-wi3-rect, .hb-wi3-tile, .hb-wi3-tile > *, .hb-wi3-head { transition: none !important; }
  .hb-wi3-tile > * { opacity: 1; transform: none; }
}
`;

export function ChartTreemap({
  data = defaultData,
  height = 260,
  title = "Cloud spend by service, October",
  summary,
  format,
  rootLabel = "All services",
  colorBy = "change",
  increaseColor = "#ff6b5b",
  decreaseColor = "#22c3a6",
  palette = defaultPalette,
  onZoom,
  onSelect,
  className,
  style,
  ...rest
}: ChartTreemapProps) {
  const id = React.useId().replace(/:/g, "");
  const plotRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(600);
  const [inView, setInView] = React.useState(false);
  const [zoom, setZoom] = React.useState<string | null>(null);
  const [hot, setHot] = React.useState<string | null>(null);
  const [tip, setTip] = React.useState<{ key: string; x: number; y: number } | null>(null);
  const fmt = format ?? ((v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k` : `$${Math.round(v)}`));

  React.useEffect(() => {
    const el = plotRef.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(120, el.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const t = window.setTimeout(() => setInView(true), 80);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const H = height;
  const total = data.reduce((a, g) => a + g.children.reduce((b, c) => b + c.value, 0), 0);

  const layout = React.useMemo(() => {
    const groupTotals = data.map((g) => g.children.reduce((a, c) => a + c.value, 0));
    const groupBoxes = squarify(groupTotals, { x: 0, y: 0, w: width, h: H });
    const leaves: { key: string; group: string; gi: number; leaf: TreemapLeaf; root: Box; zoomed: Box | null }[] = [];
    const heads: { name: string; box: Box; total: number; showHead: boolean }[] = [];
    data.forEach((g, gi) => {
      const gb = groupBoxes[gi];
      const showHead = gb.h > 46 && gb.w > 70;
      const inner = showHead ? { x: gb.x + 2, y: gb.y + 20, w: gb.w - 4, h: gb.h - 22 } : { x: gb.x + 2, y: gb.y + 2, w: gb.w - 4, h: gb.h - 4 };
      heads.push({ name: g.name, box: gb, total: groupTotals[gi], showHead });
      const rb = squarify(g.children.map((c) => c.value), inner);
      const zb = zoom === g.name ? squarify(g.children.map((c) => c.value), { x: 0, y: 0, w: width, h: H }) : null;
      g.children.forEach((c, ci) => leaves.push({ key: `${g.name}/${c.name}`, group: g.name, gi, leaf: c, root: rb[ci], zoomed: zb ? zb[ci] : null }));
    });
    const zg = zoom ? heads.find((h) => h.name === zoom) : null;
    const map = (b: Box): Box => {
      if (!zg || zg.box.w <= 0 || zg.box.h <= 0) return b;
      const sx = width / zg.box.w;
      const sy = H / zg.box.h;
      return { x: (b.x - zg.box.x) * sx, y: (b.y - zg.box.y) * sy, w: b.w * sx, h: b.h * sy };
    };
    return {
      leaves: leaves.map((l) => ({ ...l, box: l.zoomed ?? map(l.root) })),
      heads: heads.map((h) => ({ ...h, view: map(h.box) })),
    };
  }, [data, width, H, zoom]);

  const colorOf = (leaf: TreemapLeaf, gi: number) => {
    if (colorBy === "group") return mix("#141414", palette[gi % palette.length], 0.72);
    const c = leaf.change ?? 0;
    const t = Math.min(1, Math.abs(c) / 25);
    if (Math.abs(c) < 0.5) return "#2a2a2a";
    return mix("#1c1c1c", c > 0 ? increaseColor : decreaseColor, 0.28 + t * 0.62);
  };

  const goZoom = (g: string | null) => {
    setZoom(g);
    setTip(null);
    onZoom?.(g);
  };

  const f = (n: number) => n.toFixed(2);
  const tipLeaf = tip ? layout.leaves.find((l) => l.key === tip.key) : null;
  const desc =
    summary ??
    `Treemap of ${fmt(total)} across ${data.length} groups: ${data.map((g) => `${g.name} ${fmt(g.children.reduce((a, c) => a + c.value, 0))}`).join(", ")}.`;

  return (
    <div
      {...rest}
      className={["hb-wi3", className].filter(Boolean).join(" ")}
      style={{ ...style, ["--hb-wi3-h" as string]: `${H}px` } as React.CSSProperties}
      data-in={inView}
      onKeyDown={(e) => {
        if (e.key === "Escape" && zoom) goZoom(null);
      }}
    >
      <style href="hb-chart-treemap" precedence="default">{css}</style>
      <div className="hb-wi3-bar">
        <nav className="hb-wi3-crumbs" aria-label="Treemap level">
          <button type="button" className="hb-wi3-crumb" aria-current={zoom ? undefined : "page"} onClick={() => zoom && goZoom(null)}>
            {rootLabel}
          </button>
          {zoom ? (
            <>
              <span className="hb-wi3-sep" aria-hidden="true">/</span>
              <button type="button" className="hb-wi3-crumb" aria-current="page">
                {zoom}
              </button>
            </>
          ) : null}
        </nav>
        {colorBy === "change" ? (
          <div className="hb-wi3-scale" aria-hidden="true">
            <span>-25%</span>
            <span className="hb-wi3-ramp" style={{ background: `linear-gradient(90deg, ${decreaseColor}, #2a2a2a 50%, ${increaseColor})` }} />
            <span>+25%</span>
          </div>
        ) : null}
      </div>
      <div ref={plotRef} className="hb-wi3-plot" onPointerLeave={() => { setTip(null); setHot(null); }}>
        <svg className="hb-wi3-svg" viewBox={`0 0 ${width} ${H}`} preserveAspectRatio="none" role="img" aria-labelledby={`${id}-t ${id}-d`}>
          <title id={`${id}-t`}>{title}</title>
          <desc id={`${id}-d`}>{desc}</desc>
          {layout.leaves.map((l) => {
            const b = l.box;
            const x = b.x + 1;
            const y = b.y + 1;
            const w = Math.max(0, b.w - 2);
            const h = Math.max(0, b.h - 2);
            const transform = inView ? `translate(${f(x)}px, ${f(y)}px) scale(${f(w)}, ${f(h)})` : `translate(${f(x + w / 2)}px, ${f(y + h / 2)}px) scale(0, 0)`;
            return <rect key={l.key} className="hb-wi3-rect" x={0} y={0} width={1} height={1} fill={colorOf(l.leaf, l.gi)} data-dim={zoom !== null && l.group !== zoom} data-hot={hot === l.key} style={{ transform }} />;
          })}
        </svg>
        {layout.heads.map((h) =>
          h.showHead ? (
            <button
              key={h.name}
              type="button"
              className="hb-wi3-head"
              data-dim={zoom !== null}
              tabIndex={zoom ? -1 : 0}
              aria-label={`Zoom into ${h.name}, ${fmt(h.total)}`}
              style={{ left: h.view.x + 2, top: h.view.y + 1, maxWidth: Math.max(0, h.view.w - 4) }}
              onClick={() => goZoom(h.name)}
            >
              {h.name}
              <em>{fmt(h.total)}</em>
            </button>
          ) : null,
        )}
        {layout.leaves.map((l, i) => {
          const b = l.box;
          const big = b.w > 62 && b.h > 34;
          const med = b.w > 44 && b.h > 20;
          const c = l.leaf.change ?? 0;
          return (
            <button
              key={l.key}
              type="button"
              className="hb-wi3-tile"
              data-dim={zoom !== null && l.group !== zoom}
              tabIndex={zoom !== null && l.group !== zoom ? -1 : 0}
              aria-label={`${l.leaf.name}, ${l.group}, ${fmt(l.leaf.value)}, ${c >= 0 ? "up" : "down"} ${Math.abs(c).toFixed(1)} percent`}
              style={{ left: b.x + 1, top: b.y + 1, width: Math.max(0, b.w - 2), height: Math.max(0, b.h - 2), ["--hb-wi3-d" as string]: `${300 + i * 35}ms` } as React.CSSProperties}
              onPointerEnter={() => setHot(l.key)}
              onPointerMove={(e) => {
                const r = plotRef.current?.getBoundingClientRect();
                if (!r) return;
                const px = e.clientX - r.left;
                const py = e.clientY - r.top;
                setTip({ key: l.key, x: px > r.width - 170 ? px - 162 : px + 12, y: py > r.height - 90 ? py - 84 : py + 12 });
              }}
              onPointerLeave={() => {
                setHot(null);
                setTip(null);
              }}
              onFocus={() => setHot(l.key)}
              onBlur={() => setHot(null)}
              onClick={() => {
                if (zoom === null) goZoom(l.group);
                else onSelect?.({ ...l.leaf, group: l.group });
              }}
            >
              <b data-hide={!med}>{l.leaf.name}</b>
              <span data-hide={!big}>
                {fmt(l.leaf.value)} · {c > 0 ? "+" : ""}
                {c.toFixed(1)}%
              </span>
            </button>
          );
        })}
        {tipLeaf && tip ? (
          <div className="hb-wi3-tip" style={{ left: tip.x, top: tip.y }}>
            <small>{tipLeaf.group}</small>
            <strong>{tipLeaf.leaf.name}</strong>
            <div>
              <span>Spend</span>
              <b>{fmt(tipLeaf.leaf.value)}</b>
            </div>
            <div>
              <span>vs September</span>
              <b style={{ color: (tipLeaf.leaf.change ?? 0) > 0 ? increaseColor : (tipLeaf.leaf.change ?? 0) < 0 ? decreaseColor : "#ededed" }}>
                {(tipLeaf.leaf.change ?? 0) > 0 ? "+" : ""}
                {(tipLeaf.leaf.change ?? 0).toFixed(1)}%
              </b>
            </div>
            <div>
              <span>Share of total</span>
              <b>{total > 0 ? ((tipLeaf.leaf.value / total) * 100).toFixed(1) : "0"}%</b>
            </div>
          </div>
        ) : null}
        <div className="hb-wi3-sr" aria-live="polite">
          {zoom ? `Showing ${zoom}` : `Showing ${rootLabel}`}
        </div>
      </div>
    </div>
  );
}
