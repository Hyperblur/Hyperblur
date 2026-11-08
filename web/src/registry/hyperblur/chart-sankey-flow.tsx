"use client";

import * as React from "react";

export interface SankeyNode {
  id: string;
  label: string;
  color?: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface ChartSankeyFlowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  nodes?: SankeyNode[];
  links?: SankeyLink[];
  height?: number;
  title?: string;
  summary?: string;
  format?: (value: number) => string;
  nodeGap?: number;
  accent?: string;
  onNodeSelect?: (node: SankeyNode | null) => void;
}

const defaultNodes: SankeyNode[] = [
  { id: "search", label: "Search", color: "#2f7bff" },
  { id: "referral", label: "Referral", color: "#22c3a6" },
  { id: "partners", label: "Partners", color: "#a78bfa" },
  { id: "direct", label: "Direct", color: "#7fb3ff" },
  { id: "self", label: "Self-serve trial", color: "#5b9dff" },
  { id: "demo", label: "Sales demo", color: "#c084fc" },
  { id: "annual", label: "Paid annual", color: "#34d399" },
  { id: "monthly", label: "Paid monthly", color: "#86efac" },
  { id: "eval", label: "Evaluating", color: "#f5b544" },
  { id: "churn", label: "Churned", color: "#6b6b6b" },
];

const defaultLinks: SankeyLink[] = [
  { source: "search", target: "self", value: 3900 },
  { source: "search", target: "demo", value: 920 },
  { source: "referral", target: "self", value: 1640 },
  { source: "referral", target: "demo", value: 500 },
  { source: "partners", target: "self", value: 380 },
  { source: "partners", target: "demo", value: 980 },
  { source: "direct", target: "self", value: 1700 },
  { source: "direct", target: "demo", value: 280 },
  { source: "self", target: "monthly", value: 1480 },
  { source: "self", target: "annual", value: 620 },
  { source: "self", target: "eval", value: 1320 },
  { source: "self", target: "churn", value: 4200 },
  { source: "demo", target: "annual", value: 1140 },
  { source: "demo", target: "monthly", value: 260 },
  { source: "demo", target: "eval", value: 690 },
  { source: "demo", target: "churn", value: 590 },
];

const W = 640;
const H = 260;
const NW = 10;

interface LaidNode extends SankeyNode {
  depth: number;
  x: number;
  y: number;
  h: number;
  value: number;
  color: string;
}

interface LaidLink extends SankeyLink {
  i: number;
  sy: number;
  ty: number;
  t: number;
  d: string;
}

function layout(nodes: SankeyNode[], links: SankeyLink[], gap: number, fallback: string) {
  const depth = new Map<string, number>(nodes.map((n) => [n.id, 0]));
  for (let pass = 0; pass < nodes.length; pass++) {
    let changed = false;
    for (const l of links) {
      const next = (depth.get(l.source) ?? 0) + 1;
      if (next > (depth.get(l.target) ?? 0)) {
        depth.set(l.target, next);
        changed = true;
      }
    }
    if (!changed) break;
  }
  const cols = Math.max(1, ...depth.values()) + 1;
  const valueOf = (id: string) =>
    Math.max(
      links.filter((l) => l.source === id).reduce((a, l) => a + l.value, 0),
      links.filter((l) => l.target === id).reduce((a, l) => a + l.value, 0),
    );
  const columns: SankeyNode[][] = Array.from({ length: cols }, () => []);
  nodes.forEach((n) => columns[depth.get(n.id) ?? 0].push(n));
  let ky = Infinity;
  columns.forEach((c) => {
    const total = c.reduce((a, n) => a + valueOf(n.id), 0);
    if (total > 0) ky = Math.min(ky, (H - gap * Math.max(0, c.length - 1)) / total);
  });
  if (!Number.isFinite(ky)) ky = 1;
  const laid = new Map<string, LaidNode>();
  columns.forEach((c, ci) => {
    const used = c.reduce((a, n) => a + valueOf(n.id) * ky, 0) + gap * Math.max(0, c.length - 1);
    let y = (H - used) / 2;
    c.forEach((n) => {
      const v = valueOf(n.id);
      const h = Math.max(2, v * ky);
      laid.set(n.id, { ...n, depth: ci, x: cols === 1 ? 0 : (ci / (cols - 1)) * (W - NW), y, h, value: v, color: n.color ?? fallback });
      y += h + gap;
    });
  });
  const outOff = new Map<string, number>();
  const inOff = new Map<string, number>();
  const order = links.map((l, i) => ({ l, i }));
  const sortedOut = [...order].sort((a, b) => (laid.get(a.l.target)?.y ?? 0) - (laid.get(b.l.target)?.y ?? 0));
  const sortedIn = [...order].sort((a, b) => (laid.get(a.l.source)?.y ?? 0) - (laid.get(b.l.source)?.y ?? 0));
  const sy = new Map<number, number>();
  const ty = new Map<number, number>();
  sortedOut.forEach(({ l, i }) => {
    const s = laid.get(l.source);
    if (!s) return;
    const o = outOff.get(l.source) ?? 0;
    sy.set(i, s.y + o);
    outOff.set(l.source, o + l.value * ky);
  });
  sortedIn.forEach(({ l, i }) => {
    const t = laid.get(l.target);
    if (!t) return;
    const o = inOff.get(l.target) ?? 0;
    ty.set(i, t.y + o);
    inOff.set(l.target, o + l.value * ky);
  });
  const f = (n: number) => n.toFixed(2);
  const laidLinks: LaidLink[] = order
    .filter(({ l }) => laid.has(l.source) && laid.has(l.target))
    .map(({ l, i }) => {
      const s = laid.get(l.source) as LaidNode;
      const tg = laid.get(l.target) as LaidNode;
      const t = l.value * ky;
      const x0 = s.x + NW;
      const x1 = tg.x;
      const xm = (x0 + x1) / 2;
      const a = sy.get(i) ?? 0;
      const b = ty.get(i) ?? 0;
      const d = `M${f(x0)} ${f(a)} C${f(xm)} ${f(a)} ${f(xm)} ${f(b)} ${f(x1)} ${f(b)} L${f(x1)} ${f(b + t)} C${f(xm)} ${f(b + t)} ${f(xm)} ${f(a + t)} ${f(x0)} ${f(a + t)} Z`;
      return { ...l, i, sy: a, ty: b, t, d };
    });
  return { nodes: [...laid.values()], links: laidLinks, cols };
}

const css = `
.hb-wi2 {
  --hb-wi2-a: #2f7bff;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  color: #ededed;
  font-family: inherit;
  font-size: 12px;
}
.hb-wi2 *, .hb-wi2 *::before, .hb-wi2 *::after { box-sizing: border-box; }
.hb-wi2-plot { position: relative; width: 100%; height: var(--hb-wi2-h, 260px); }
.hb-wi2-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; }
.hb-wi2-link {
  opacity: 0.38;
  clip-path: inset(0 100% 0 0);
  transition: opacity 0.25s ease;
  cursor: pointer;
  mix-blend-mode: screen;
}
.hb-wi2[data-in="true"] .hb-wi2-link {
  clip-path: inset(0 0 0 0);
  transition: clip-path 1.2s cubic-bezier(0.65, 0, 0.25, 1) var(--hb-wi2-d, 0ms), opacity 0.25s ease;
}
.hb-wi2[data-active="true"] .hb-wi2-link { opacity: 0.08; }
.hb-wi2[data-active="true"] .hb-wi2-link[data-on="true"] { opacity: 0.78; }
.hb-wi2-node {
  transform-box: fill-box;
  transform-origin: center;
  transform: scaleY(0);
  rx: 2px;
  transition: transform 0.7s cubic-bezier(0.34, 1.4, 0.64, 1) var(--hb-wi2-d, 0ms), opacity 0.25s ease;
}
.hb-wi2[data-in="true"] .hb-wi2-node { transform: scaleY(1); }
.hb-wi2[data-active="true"] .hb-wi2-node { opacity: 0.35; }
.hb-wi2[data-active="true"] .hb-wi2-node[data-on="true"] { opacity: 1; }
.hb-wi2-hit { fill: transparent; cursor: pointer; outline: none; }
.hb-wi2-hit:focus-visible { stroke: #ededed; stroke-width: 1.5; vector-effect: non-scaling-stroke; }
.hb-wi2-lab {
  position: absolute;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 2px 6px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  line-height: 1.15;
  opacity: 0;
  transition: opacity 0.5s ease var(--hb-wi2-d, 0ms), color 0.2s ease;
}
.hb-wi2[data-in="true"] .hb-wi2-lab { opacity: 1; }
.hb-wi2[data-active="true"] .hb-wi2-lab { opacity: 0.4; }
.hb-wi2[data-active="true"] .hb-wi2-lab[data-on="true"] { opacity: 1; }
.hb-wi2-lab[data-mid="true"] { background: rgba(10, 10, 10, 0.72); backdrop-filter: blur(4px); }
.hb-wi2-lab b { font-size: 11.5px; font-weight: 550; color: #ededed; }
.hb-wi2-lab span { font-size: 10.5px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-wi2-tip {
  position: absolute;
  z-index: 3;
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(17, 17, 17, 0.95);
  border: 1px solid #262626;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  pointer-events: none;
  white-space: nowrap;
  transform: translate(-50%, calc(-100% - 12px));
}
.hb-wi2-tip-p { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #a1a1a1; }
.hb-wi2-tip-p i { width: 6px; height: 6px; border-radius: 50%; }
.hb-wi2-tip-p svg { opacity: 0.5; }
.hb-wi2-tip-v { margin-top: 4px; font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-wi2-tip-v span { margin-left: 6px; font-size: 11px; font-weight: 500; color: #7fb3ff; }
.hb-wi2-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-wi2-link, .hb-wi2[data-in="true"] .hb-wi2-link { clip-path: none; transition: none; }
  .hb-wi2-node, .hb-wi2[data-in="true"] .hb-wi2-node { transform: none; transition: none; }
  .hb-wi2-lab { opacity: 1; transition: none; }
}
`;

export function ChartSankeyFlow({
  nodes = defaultNodes,
  links = defaultLinks,
  height = 260,
  title = "Trial journeys, Q3",
  summary,
  format,
  nodeGap = 10,
  accent = "#2f7bff",
  onNodeSelect,
  className,
  style,
  ...rest
}: ChartSankeyFlowProps) {
  const id = React.useId().replace(/:/g, "");
  const [inView, setInView] = React.useState(false);
  const [hoverNode, setHoverNode] = React.useState<string | null>(null);
  const [pinned, setPinned] = React.useState<string | null>(null);
  const [hoverLink, setHoverLink] = React.useState<{ i: number; x: number; y: number } | null>(null);
  const plotRef = React.useRef<HTMLDivElement>(null);
  const fmt = format ?? ((v: number) => v.toLocaleString("en-US"));

  React.useEffect(() => {
    const t = window.setTimeout(() => setInView(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const g = React.useMemo(() => layout(nodes, links, nodeGap, accent), [nodes, links, nodeGap, accent]);
  const focusNode = hoverNode ?? pinned;

  const connected = React.useMemo(() => {
    if (!focusNode) return null;
    const set = new Set<number>();
    const nodeSet = new Set<string>([focusNode]);
    const walk = (nid: string, dir: "up" | "down") => {
      g.links.forEach((l) => {
        const from = dir === "down" ? l.source : l.target;
        const to = dir === "down" ? l.target : l.source;
        if (from === nid && !set.has(l.i)) {
          set.add(l.i);
          nodeSet.add(to);
          walk(to, dir);
        }
      });
    };
    walk(focusNode, "down");
    walk(focusNode, "up");
    return { links: set, nodes: nodeSet };
  }, [focusNode, g.links]);

  const linkOn = (l: LaidLink) => (hoverLink ? hoverLink.i === l.i : connected ? connected.links.has(l.i) : false);
  const nodeOn = (n: LaidNode) => {
    if (hoverLink) {
      const l = g.links.find((k) => k.i === hoverLink.i);
      return l ? l.source === n.id || l.target === n.id : false;
    }
    return connected ? connected.nodes.has(n.id) : false;
  };
  const active = hoverLink !== null || connected !== null;

  const select = (n: LaidNode) => {
    const next = pinned === n.id ? null : n.id;
    setPinned(next);
    onNodeSelect?.(next ? n : null);
  };

  const sources = g.nodes.filter((n) => n.depth === 0);
  const totalIn = sources.reduce((a, n) => a + n.value, 0);
  const tipLink = hoverLink ? g.links.find((l) => l.i === hoverLink.i) : null;
  const tipSrc = tipLink ? g.nodes.find((n) => n.id === tipLink.source) : null;
  const tipTgt = tipLink ? g.nodes.find((n) => n.id === tipLink.target) : null;
  const desc =
    summary ??
    `Flow diagram across ${g.cols} stages. ${fmt(totalIn)} entries from ${sources.map((s) => s.label).join(", ")}. ` +
      g.nodes
        .filter((n) => n.depth === g.cols - 1)
        .map((n) => `${n.label} ${fmt(n.value)}`)
        .join(", ") +
      ".";

  const announce = focusNode ? g.nodes.find((n) => n.id === focusNode) : null;

  return (
    <div
      {...rest}
      className={["hb-wi2", className].filter(Boolean).join(" ")}
      style={{ ...style, ["--hb-wi2-a" as string]: accent, ["--hb-wi2-h" as string]: `${height}px` } as React.CSSProperties}
      data-in={inView}
      data-active={active}
    >
      <style href="hb-chart-sankey-flow" precedence="default">{css}</style>
      <div ref={plotRef} className="hb-wi2-plot" onPointerLeave={() => { setHoverLink(null); setHoverNode(null); }}>
        <svg className="hb-wi2-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-labelledby={`${id}-t ${id}-d`}>
          <title id={`${id}-t`}>{title}</title>
          <desc id={`${id}-d`}>{desc}</desc>
          <defs>
            {g.links.map((l) => {
              const s = g.nodes.find((n) => n.id === l.source) as LaidNode;
              const t = g.nodes.find((n) => n.id === l.target) as LaidNode;
              return (
                <linearGradient key={l.i} id={`${id}-g${l.i}`} gradientUnits="userSpaceOnUse" x1={(s.x + NW).toFixed(2)} x2={t.x.toFixed(2)} y1="0" y2="0">
                  <stop offset="0" stopColor={s.color} />
                  <stop offset="1" stopColor={t.color} />
                </linearGradient>
              );
            })}
          </defs>
          {g.links.map((l) => {
            const s = g.nodes.find((n) => n.id === l.source) as LaidNode;
            return (
              <path
                key={l.i}
                className="hb-wi2-link"
                d={l.d}
                fill={`url(#${id}-g${l.i})`}
                data-on={linkOn(l)}
                style={{ ["--hb-wi2-d" as string]: `${200 + s.depth * 380}ms` } as React.CSSProperties}
                onPointerMove={(e) => {
                  const r = plotRef.current?.getBoundingClientRect();
                  if (r) setHoverLink({ i: l.i, x: e.clientX - r.left, y: e.clientY - r.top });
                }}
                onPointerLeave={() => setHoverLink(null)}
              />
            );
          })}
          {g.nodes.map((n) => (
            <g key={n.id}>
              <rect className="hb-wi2-node" x={n.x.toFixed(2)} y={n.y.toFixed(2)} width={NW} height={n.h.toFixed(2)} fill={n.color} data-on={nodeOn(n)} style={{ ["--hb-wi2-d" as string]: `${n.depth * 380}ms` } as React.CSSProperties} />
              <rect
                className="hb-wi2-hit"
                x={(n.x - 6).toFixed(2)}
                y={n.y.toFixed(2)}
                width={NW + 12}
                height={n.h.toFixed(2)}
                tabIndex={0}
                role="button"
                aria-pressed={pinned === n.id}
                aria-label={`${n.label}, ${fmt(n.value)}`}
                onPointerEnter={() => setHoverNode(n.id)}
                onPointerLeave={() => setHoverNode(null)}
                onFocus={() => setHoverNode(n.id)}
                onBlur={() => setHoverNode(null)}
                onClick={() => select(n)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(n);
                  } else if (e.key === "Escape") {
                    setPinned(null);
                    onNodeSelect?.(null);
                  }
                }}
              />
            </g>
          ))}
        </svg>
        {g.nodes.map((n) => {
          const last = n.depth === g.cols - 1;
          const mid = n.depth > 0 && !last;
          const share = totalIn > 0 ? Math.round((n.value / totalIn) * 100) : 0;
          return (
            <div
              key={n.id}
              className="hb-wi2-lab"
              data-on={nodeOn(n)}
              data-mid={mid}
              style={{
                top: `${(((n.y + n.h / 2) / H) * 100).toFixed(2)}%`,
                left: last ? undefined : `calc(${(((n.x + NW) / W) * 100).toFixed(2)}% + 4px)`,
                right: last ? `calc(${((1 - n.x / W) * 100).toFixed(2)}% + 4px)` : undefined,
                textAlign: last ? "right" : "left",
                ["--hb-wi2-d" as string]: `${300 + n.depth * 380}ms`,
              } as React.CSSProperties}
            >
              <b>{n.label}</b>
              <span>
                {fmt(n.value)}
                {n.depth > 0 ? ` · ${share}%` : ""}
              </span>
            </div>
          );
        })}
        {tipLink && tipSrc && tipTgt && hoverLink ? (
          <div className="hb-wi2-tip" style={{ left: hoverLink.x, top: hoverLink.y }}>
            <div className="hb-wi2-tip-p">
              <i style={{ background: tipSrc.color }} />
              {tipSrc.label}
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1 5h7M5.5 2 8.5 5l-3 3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <i style={{ background: tipTgt.color }} />
              {tipTgt.label}
            </div>
            <div className="hb-wi2-tip-v">
              {fmt(tipLink.value)}
              <span>{tipSrc.value > 0 ? Math.round((tipLink.value / tipSrc.value) * 100) : 0}% of {tipSrc.label}</span>
            </div>
          </div>
        ) : null}
        <div className="hb-wi2-sr" aria-live="polite">
          {announce ? `${announce.label}: ${fmt(announce.value)}` : ""}
        </div>
      </div>
    </div>
  );
}
