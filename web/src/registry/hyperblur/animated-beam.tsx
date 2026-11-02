"use client";

import * as React from "react";

export interface BeamNode {
  icon: React.ReactNode;
  label: string;
}

export interface AnimatedBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  sources?: BeamNode[];
  hub?: BeamNode;
  output?: BeamNode;
  curvature?: number;
  duration?: number;
  color?: string;
}

const css = `
@keyframes hb-abm-tail { from { stroke-dashoffset: 34; } to { stroke-dashoffset: -106; } }
@keyframes hb-abm-body { from { stroke-dashoffset: 16; } to { stroke-dashoffset: -124; } }
@keyframes hb-abm-head { from { stroke-dashoffset: 6; } to { stroke-dashoffset: -134; } }
@keyframes hb-abm-ping {
  0%, 100% { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 0 0 color-mix(in srgb, var(--hb-abm-c) 0%, transparent); }
  50% { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-abm-c) 50%, transparent), 0 0 22px 2px color-mix(in srgb, var(--hb-abm-c) 40%, transparent); }
}
.hb-abm {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  container-type: inline-size;
  font-family: inherit;
  color: #ededed;
  --hb-abm-n: clamp(28px, 9cqw, 56px);
}
.hb-abm *, .hb-abm *::before, .hb-abm *::after { box-sizing: border-box; }
.hb-abm-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
.hb-abm-col {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 2.4cqw, 16px);
}
.hb-abm-node {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: var(--hb-abm-n);
  height: var(--hb-abm-n);
  border-radius: 50%;
  background: linear-gradient(160deg, #1b1b1e, #0d0d0f);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 6px 18px -8px rgba(0, 0, 0, 0.9);
  color: #d4d4d8;
  transition: color .2s ease, box-shadow .2s ease;
}
.hb-abm-node:hover { color: #ffffff; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-abm-c) 60%, transparent); }
.hb-abm-node svg { width: 46%; height: 46%; }
.hb-abm-node[data-kind="hub"] {
  width: calc(var(--hb-abm-n) * 1.6);
  height: calc(var(--hb-abm-n) * 1.6);
  border-radius: 30%;
  color: #ffffff;
  background: radial-gradient(120% 120% at 30% 0%, color-mix(in srgb, var(--hb-abm-c) 45%, #18181b), #0d0d10 70%);
  animation: hb-abm-ping var(--hb-abm-d) ease-in-out infinite;
}
.hb-abm-node[data-kind="output"] {
  width: calc(var(--hb-abm-n) * 1.15);
  height: calc(var(--hb-abm-n) * 1.15);
}
.hb-abm-base { fill: none; stroke: rgba(255, 255, 255, 0.09); stroke-width: 1.5; }
.hb-abm-pulse { fill: none; stroke-linecap: round; animation-duration: var(--hb-abm-d); animation-timing-function: cubic-bezier(.5, 0, .5, 1); animation-iteration-count: infinite; }
.hb-abm-pulse[data-l="tail"] { stroke: var(--hb-abm-c); stroke-opacity: .35; stroke-width: 2; stroke-dasharray: 34 300; animation-name: hb-abm-tail; }
.hb-abm-pulse[data-l="body"] { stroke: var(--hb-abm-c); stroke-width: 2; stroke-dasharray: 16 300; animation-name: hb-abm-body; filter: drop-shadow(0 0 3px var(--hb-abm-c)); }
.hb-abm-pulse[data-l="head"] { stroke: #ffffff; stroke-width: 2.2; stroke-dasharray: 6 300; animation-name: hb-abm-head; }
@media (prefers-reduced-motion: reduce) {
  .hb-abm-pulse { animation: none; stroke-dashoffset: -40; }
  .hb-abm-node[data-kind="hub"] { animation: none; }
}
`;

function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const defaultSources: BeamNode[] = [
  { icon: <Glyph d="M3 6h18v12H3zM3.5 7l8.5 6 8.5-6" />, label: "Email" },
  { icon: <Glyph d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" />, label: "Calendar" },
  { icon: <Glyph d="M5 5h14v10h-8l-4 4v-4H5z" />, label: "Chat" },
  { icon: <Glyph d="M12 4c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />, label: "Database" },
];

const defaultHub: BeamNode = {
  icon: <Glyph d="M13 3L5 14h6l-1 7 8-11h-6z" />,
  label: "Sync engine",
};

const defaultOutput: BeamNode = {
  icon: <Glyph d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0" />,
  label: "Workspace",
};

interface Layout {
  w: number;
  h: number;
  paths: string[];
}

function curve(x1: number, y1: number, x2: number, y2: number, k: number) {
  const c = (x2 - x1) * k;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} C${(x1 + c).toFixed(1)} ${y1.toFixed(1)} ${(x2 - c).toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function rnd(i: number) {
  let x = Math.imul(i + 1, 2654435761) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

export function AnimatedBeam({
  sources = defaultSources,
  hub = defaultHub,
  output = defaultOutput,
  curvature = 0.5,
  duration = 3,
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: AnimatedBeamProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const sourceRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const hubRef = React.useRef<HTMLSpanElement>(null);
  const outRef = React.useRef<HTMLSpanElement>(null);
  const [layout, setLayout] = React.useState<Layout | null>(null);
  const count = sources.length;
  const k = Math.min(1, Math.max(0, curvature));

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const box = root.getBoundingClientRect();
      const hubEl = hubRef.current;
      const outEl = outRef.current;
      if (!hubEl || !outEl || box.width === 0) return;
      const rect = (el: Element) => {
        const r = el.getBoundingClientRect();
        return { l: r.left - box.left, r: r.right - box.left, y: r.top - box.top + r.height / 2 };
      };
      const h = rect(hubEl);
      const o = rect(outEl);
      const paths: string[] = [];
      for (let i = 0; i < count; i++) {
        const el = sourceRefs.current[i];
        if (!el) continue;
        const s = rect(el);
        paths.push(curve(s.r, s.y, h.l, h.y, k));
      }
      paths.push(curve(h.r, h.y, o.l, o.y, k));
      const next: Layout = { w: box.width, h: box.height, paths };
      setLayout((prev) =>
        prev && prev.w === next.w && prev.h === next.h && prev.paths.join("|") === next.paths.join("|") ? prev : next,
      );
    };

    const ro = new ResizeObserver(measure);
    ro.observe(root);
    sourceRefs.current.forEach((el) => el && ro.observe(el));
    if (hubRef.current) ro.observe(hubRef.current);
    if (outRef.current) ro.observe(outRef.current);
    return () => ro.disconnect();
  }, [count, k]);

  const d = Math.max(0.4, duration);
  const vars = {
    "--hb-abm-c": color,
    "--hb-abm-d": `${d.toFixed(2)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-abm ${className}`} style={vars} role="group" aria-label={`${sources.map((s) => s.label).join(", ")} connected to ${hub.label}, sent to ${output.label}`} {...rest}>
      <style href="hb-animated-beam" precedence="default">{css}</style>
      {layout && (
        <svg className="hb-abm-svg" viewBox={`0 0 ${layout.w.toFixed(1)} ${layout.h.toFixed(1)}`} aria-hidden="true">
          {layout.paths.map((p, i) => (
            <path key={`b${i}`} className="hb-abm-base" d={p} />
          ))}
          {layout.paths.map((p, i) => {
            const last = i === layout.paths.length - 1;
            const delay = last ? -d * 0.35 : -(rnd(i) * d);
            const st = { animationDelay: `${delay.toFixed(3)}s` };
            return (
              <g key={`p${i}`}>
                <path className="hb-abm-pulse" data-l="tail" d={p} pathLength={100} style={st} />
                <path className="hb-abm-pulse" data-l="body" d={p} pathLength={100} style={st} />
                <path className="hb-abm-pulse" data-l="head" d={p} pathLength={100} style={st} />
              </g>
            );
          })}
        </svg>
      )}
      <div className="hb-abm-col">
        {sources.map((s, i) => (
          <span
            key={`${s.label}-${i}`}
            ref={(el) => {
              sourceRefs.current[i] = el;
            }}
            className="hb-abm-node"
            role="img"
            aria-label={s.label}
            title={s.label}
          >
            {s.icon}
          </span>
        ))}
      </div>
      <span ref={hubRef} className="hb-abm-node" data-kind="hub" role="img" aria-label={hub.label} title={hub.label}>
        {hub.icon}
      </span>
      <span ref={outRef} className="hb-abm-node" data-kind="output" role="img" aria-label={output.label} title={output.label}>
        {output.icon}
      </span>
    </div>
  );
}
