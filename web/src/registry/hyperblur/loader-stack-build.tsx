"use client";

import * as React from "react";

export interface LoaderStackBuildProps extends React.HTMLAttributes<HTMLSpanElement> {
  value?: number;
  layers?: number;
  size?: number;
  color?: string;
  accent?: string;
  interval?: number;
  unit?: string;
  label?: string;
}

const css = `
.hb-vk9 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-vk9 *, .hb-vk9 *::before, .hb-vk9 *::after { box-sizing: border-box; }
.hb-vk9-svg { display: block; width: var(--hb-vk9-s); height: var(--hb-vk9-s); overflow: visible; flex: none; }
.hb-vk9-top { fill: color-mix(in srgb, var(--hb-vk9-c) 55%, #ffffff); }
.hb-vk9-left { fill: var(--hb-vk9-c); }
.hb-vk9-right { fill: color-mix(in srgb, var(--hb-vk9-c) 55%, #05070d); }
.hb-vk9-rim { fill: none; stroke: rgba(255,255,255,0.55); stroke-width: 0.6; stroke-linejoin: round; }
.hb-vk9-layer {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: hb-vk9-drop 520ms cubic-bezier(0.3, 0, 0.2, 1) both;
}
.hb-vk9-layer[data-new="true"] .hb-vk9-top { fill: color-mix(in srgb, var(--hb-vk9-a) 70%, #ffffff); }
.hb-vk9-ghost {
  fill: none;
  stroke: color-mix(in srgb, var(--hb-vk9-a) 60%, transparent);
  stroke-width: 0.7;
  stroke-dasharray: 2 1.6;
  animation: hb-vk9-march 900ms linear infinite;
}
.hb-vk9-shadow { fill: color-mix(in srgb, var(--hb-vk9-c) 40%, transparent); filter: blur(3px); }
.hb-vk9-all { transition: transform 600ms cubic-bezier(0.5, 0, 0.75, 0), opacity 600ms ease; }
.hb-vk9[data-ship="true"] .hb-vk9-all { transform: translateY(-14px); opacity: 0; }
.hb-vk9-count {
  font-size: 11px;
  line-height: 1;
  color: #8f8f8f;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}
.hb-vk9-count b { color: var(--hb-vk9-a); font-weight: 600; }
.hb-vk9-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-vk9-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-vk9-drop {
  0% { transform: translateY(-26px); opacity: 0; }
  55% { transform: translateY(0) scaleY(1); opacity: 1; }
  70% { transform: translateY(0) scaleY(0.82); }
  85% { transform: translateY(-1.5px) scaleY(1.04); }
  100% { transform: translateY(0) scaleY(1); opacity: 1; }
}
@keyframes hb-vk9-march { to { stroke-dashoffset: -7.2; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vk9-layer, .hb-vk9-ghost { animation: none; }
  .hb-vk9-all { transition: none; }
}
`;

function faces(cy: number, w: number, h: number, t: number) {
  const l = 50 - w;
  const r = 50 + w;
  const p = (pts: number[][]) => pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  return {
    top: p([[50, cy - h], [r, cy], [50, cy + h], [l, cy]]),
    left: p([[l, cy], [50, cy + h], [50, cy + h + t], [l, cy + t]]),
    right: p([[50, cy + h], [r, cy], [r, cy + t], [50, cy + h + t]]),
    rim: p([[l, cy], [50, cy - h], [r, cy]]),
  };
}

export function LoaderStackBuild({
  value,
  layers = 5,
  size = 96,
  color = "#2f7bff",
  accent = "#7fb3ff",
  interval = 620,
  unit = "layers",
  label,
  className = "",
  style,
  ...rest
}: LoaderStackBuildProps) {
  const total = Math.max(2, Math.min(8, Math.round(layers)));
  const controlled = typeof value === "number" && Number.isFinite(value);
  const [auto, setAuto] = React.useState({ count: 0, ship: false });

  React.useEffect(() => {
    if (controlled) return;
    let id = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      id = window.setTimeout(() => setAuto({ count: total, ship: false }), 0);
      return () => window.clearTimeout(id);
    }
    let count = 0;
    const gap = Math.max(200, interval);
    function next() {
      if (count < total) {
        count += 1;
        setAuto({ count, ship: false });
        id = window.setTimeout(next, count === total ? gap * 2.2 : gap);
      } else {
        setAuto({ count, ship: true });
        id = window.setTimeout(() => {
          count = 0;
          setAuto({ count: 0, ship: false });
          id = window.setTimeout(next, gap * 0.8);
        }, 650);
      }
    }
    id = window.setTimeout(next, gap * 0.6);
    return () => window.clearTimeout(id);
  }, [controlled, total, interval]);

  const count = controlled ? Math.round((Math.min(100, Math.max(0, value as number)) / 100) * total) : auto.count;
  const ship = controlled ? false : auto.ship;
  const w = 28;
  const h = 14;
  const t = Math.max(4, Math.min(9, 40 / total));
  const step = t + 1.8;
  const baseCy = 50 + ((total - 1) * step) / 2 - t / 2 + 4;
  const vars = {
    "--hb-vk9-s": `${size}px`,
    "--hb-vk9-c": color,
    "--hb-vk9-a": accent,
    ...style,
  } as React.CSSProperties;
  const ghost = count < total ? faces(baseCy - count * step, w, h, t) : null;

  return (
    <>
      <style href="hb-loader-stack-build" precedence="default">{css}</style>
      <span role="status" className={`hb-vk9 ${className}`} data-ship={ship} style={vars} {...rest}>
        <svg className="hb-vk9-svg" viewBox="0 0 100 100" aria-hidden="true">
          <ellipse className="hb-vk9-shadow" cx="50" cy={(baseCy + h + t + 2).toFixed(2)} rx={w + 4} ry={h * 0.55} />
          {ghost ? <polygon className="hb-vk9-ghost" points={ghost.top} /> : null}
          <g className="hb-vk9-all">
            {Array.from({ length: count }, (_, i) => {
              const f = faces(baseCy - i * step, w, h, t);
              return (
                <g key={i} className="hb-vk9-layer" data-new={i === count - 1}>
                  <polygon className="hb-vk9-left" points={f.left} />
                  <polygon className="hb-vk9-right" points={f.right} />
                  <polygon className="hb-vk9-top" points={f.top} />
                  <polyline className="hb-vk9-rim" points={f.rim} />
                </g>
              );
            })}
          </g>
        </svg>
        <span className="hb-vk9-count" aria-hidden="true">
          <b>{count}</b> / {total} {unit}
        </span>
        <span className={label ? "hb-vk9-l" : "hb-vk9-sr"}>{label ?? "Building"}</span>
      </span>
    </>
  );
}
