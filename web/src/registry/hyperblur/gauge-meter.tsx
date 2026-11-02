"use client";

import * as React from "react";

export interface GaugeZone {
  to: number;
  color: string;
  label?: string;
}

export interface GaugeMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  min?: number;
  max?: number;
  zones?: GaugeZone[];
  label?: string;
  unit?: string;
  decimals?: number;
  ticks?: number;
  showMinMax?: boolean;
  needleColor?: string;
  size?: number | string;
  valueFormatter?: (n: number) => string;
  animate?: boolean;
}

const DEFAULT_ZONES: GaugeZone[] = [
  { to: 40, color: "#fb7185", label: "Low" },
  { to: 70, color: "#fbbf24", label: "Fair" },
  { to: 100, color: "#34d399", label: "Great" },
];

const css = `
.hb-gau { display: block; min-width: 0; max-width: 100%; box-sizing: border-box; color: #ededed; font-family: inherit; }
.hb-gau *, .hb-gau *::before, .hb-gau *::after { box-sizing: border-box; }
.hb-gau-svg { display: block; width: 100%; height: auto; overflow: visible; }
.hb-gau-track { fill: none; stroke: #1c1c1c; stroke-width: 12; }
.hb-gau-zone {
  fill: none;
  stroke-width: 12;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: hb-gau-sweep .9s cubic-bezier(.22, .8, .24, 1) backwards;
  animation-delay: calc(var(--hb-gau-z, 0) * 160ms);
  transition: opacity .25s ease, stroke-width .2s ease;
}
.hb-gau-zone[data-on="false"] { opacity: .32; }
.hb-gau-tick { stroke: #3a3a3a; stroke-width: 1; }
.hb-gau-tick[data-major="true"] { stroke: #5a5a5a; stroke-width: 1.4; }
.hb-gau-needle {
  transition: transform 1.1s cubic-bezier(.22, .8, .24, 1);
}
.hb-gau-hub { fill: #0a0a0a; stroke-width: 2.5; }
.hb-gau-num {
  fill: #ededed;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -.02em;
  font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif);
  font-variant-numeric: tabular-nums;
}
.hb-gau-unit { fill: #8f8f8f; font-size: 13px; font-weight: 500; letter-spacing: 0; }
.hb-gau-lab { fill: #8f8f8f; font-size: 11px; font-family: inherit; }
.hb-gau-edge {
  fill: #6b6b6b;
  font-size: 10px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
.hb-gau[data-animate="false"] .hb-gau-zone { animation: none; }
@keyframes hb-gau-sweep {
  from { stroke-dashoffset: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-gau-zone { animation: none !important; }
  .hb-gau-zone, .hb-gau-needle { transition: none !important; }
}
`;

const CX = 100;
const CY = 98;
const R = 80;

function f(n: number) {
  return n.toFixed(2);
}

function pointAt(frac: number, r: number): [number, number] {
  const t = Math.PI * (1 - frac);
  return [CX + r * Math.cos(t), CY - r * Math.sin(t)];
}

function arc(a: number, b: number) {
  const [x0, y0] = pointAt(a, R);
  const [x1, y1] = pointAt(b, R);
  return `M${f(x0)},${f(y0)}A${R},${R} 0 0 1 ${f(x1)},${f(y1)}`;
}

function useAnimatedValue(target: number, from: number, animate: boolean) {
  const [shown, setShown] = React.useState(from);
  const ref = React.useRef(from);
  React.useEffect(() => {
    if (!animate) return;
    const reduce =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 0 : 1100;
    const start = ref.current;
    const t0 = performance.now();
    let id = 0;
    const tick = (now: number) => {
      const p = duration === 0 ? 1 : Math.min(1, (now - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      const v = start + (target - start) * e;
      ref.current = v;
      setShown(v);
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, animate]);
  return animate ? shown : target;
}

export function GaugeMeter({
  value = 72,
  min = 0,
  max = 100,
  zones = DEFAULT_ZONES,
  label,
  unit = "",
  decimals = 0,
  ticks = 11,
  showMinMax = true,
  needleColor = "#ededed",
  size = "100%",
  valueFormatter,
  animate = true,
  className = "",
  style,
  ...rest
}: GaugeMeterProps) {
  const span = max > min ? max - min : 1;
  const clamped = Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
  const shown = useAnimatedValue(clamped, min, animate);

  const [mounted, setMounted] = React.useState(!animate);
  React.useEffect(() => {
    if (!animate) return;
    const a = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(a);
  }, [animate]);

  const sorted = [...zones].sort((a, b) => a.to - b.to);
  const segs = sorted.map((z, i) => {
    const from = i === 0 ? min : sorted[i - 1].to;
    const a = Math.min(1, Math.max(0, (from - min) / span));
    const b = Math.min(1, Math.max(0, (z.to - min) / span));
    return { ...z, i, a, b };
  });
  const current = segs.find((s) => clamped <= s.to && clamped >= min + s.a * span) ?? segs[segs.length - 1];
  const activeIdx = current ? current.i : -1;

  const frac = (clamped - min) / span;
  const deg = mounted ? -90 + frac * 180 : -90;
  const fmt = valueFormatter ?? ((n: number) => n.toFixed(Math.max(0, decimals)));
  const sub = label ?? current?.label ?? "";
  const tickCount = Math.max(0, Math.round(ticks));

  const text = `Gauge: ${fmt(clamped)}${unit} on a scale from ${fmt(min)} to ${fmt(max)}${
    current?.label ? `, ${current.label}` : ""
  }${label ? `, ${label}` : ""}.`;

  return (
    <div
      className={`hb-gau ${className}`}
      data-animate={animate ? "true" : "false"}
      style={{ width: size, ...style }}
      {...rest}
    >
      <style href="hb-gauge-meter" precedence="default">{css}</style>
      <svg className="hb-gau-svg" viewBox="0 0 200 152" role="img" aria-label={text}>
        <path className="hb-gau-track" d={arc(0, 1)} />
        {segs.map((s) => {
          const gap = segs.length > 1 ? 0.006 : 0;
          const a = s.a + (s.i === 0 ? 0 : gap);
          const b = s.b - (s.i === segs.length - 1 ? 0 : gap);
          if (b <= a) return null;
          return (
            <path
              key={s.i}
              className="hb-gau-zone"
              data-on={s.i === activeIdx ? "true" : "false"}
              d={arc(a, b)}
              pathLength={1}
              stroke={s.color}
              style={{ ["--hb-gau-z" as string]: s.i }}
            />
          );
        })}
        {Array.from({ length: tickCount }, (_, k) => {
          const t = tickCount > 1 ? k / (tickCount - 1) : 0;
          const major = k % 5 === 0 || k === tickCount - 1;
          const [x0, y0] = pointAt(t, R - 13);
          const [x1, y1] = pointAt(t, R - (major ? 20 : 17));
          return (
            <line
              key={k}
              className="hb-gau-tick"
              data-major={major ? "true" : "false"}
              x1={f(x0)}
              y1={f(y0)}
              x2={f(x1)}
              y2={f(y1)}
            />
          );
        })}
        <g
          className="hb-gau-needle"
          style={{ transform: `rotate(${deg.toFixed(2)}deg)`, transformOrigin: `${CX}px ${CY}px` }}
        >
          <path
            d={`M${CX - 3.5},${CY}L${CX},${CY - (R - 24)}L${CX + 3.5},${CY}Z`}
            fill={needleColor}
          />
          <circle className="hb-gau-hub" cx={CX} cy={CY} r={6} stroke={needleColor} />
        </g>
        <text className="hb-gau-num" x={CX} y={CY + 33} textAnchor="middle">
          {fmt(shown)}
          {unit ? (
            <tspan className="hb-gau-unit" dx={2}>
              {unit}
            </tspan>
          ) : null}
        </text>
        {sub ? (
          <text className="hb-gau-lab" x={CX} y={CY + 49} textAnchor="middle">
            {sub}
          </text>
        ) : null}
        {showMinMax ? (
          <>
            <text className="hb-gau-edge" x={CX - R} y={CY + 16} textAnchor="middle">
              {fmt(min)}
            </text>
            <text className="hb-gau-edge" x={CX + R} y={CY + 16} textAnchor="middle">
              {fmt(max)}
            </text>
          </>
        ) : null}
      </svg>
    </div>
  );
}
