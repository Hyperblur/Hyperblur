"use client";

import * as React from "react";

export type MicroStatus = "idle" | "loading" | "success" | "warning" | "error";

export interface MicroStatusMarkProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  status?: MicroStatus;
  size?: number;
  label?: string;
  labels?: Partial<Record<MicroStatus, string>>;
  showLabel?: boolean;
  colors?: Partial<Record<MicroStatus, string>>;
  duration?: number;
}

const defaultColors: Record<MicroStatus, string> = {
  idle: "#8f8f8f",
  loading: "#2f7bff",
  success: "#34d27b",
  warning: "#f5b83d",
  error: "#ff5468",
};

const defaultLabels: Record<MicroStatus, string> = {
  idle: "Idle",
  loading: "Loading",
  success: "Success",
  warning: "Warning",
  error: "Error",
};

const css = `
.hb-qr7 {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 13px;
  line-height: 1;
  color: var(--hb-qr7-c);
  transition: color 0.35s ease;
}
.hb-qr7-s {
  flex: none;
  display: block;
  overflow: visible;
}
.hb-qr7-g {
  transform-box: view-box;
  transform-origin: 50% 50%;
}
.hb-qr7[data-status="loading"] .hb-qr7-g { animation: hb-qr7-spin 0.9s linear infinite; }
.hb-qr7-p {
  fill: color-mix(in srgb, currentColor 14%, transparent);
  stroke: currentColor;
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 100 0;
  transition: fill 0.35s ease, stroke-dasharray 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.hb-qr7[data-status="loading"] .hb-qr7-p {
  fill: transparent;
  stroke-dasharray: 28 72;
}
.hb-qr7-i,
.hb-qr7-k,
.hb-qr7-w,
.hb-qr7-e {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transform: scale(0.4);
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.hb-qr7-i { fill: currentColor; stroke: none; }
.hb-qr7-w circle { fill: currentColor; stroke: none; }
.hb-qr7-k { stroke-dasharray: 1; stroke-dashoffset: 1; }
.hb-qr7[data-status="idle"] .hb-qr7-i,
.hb-qr7[data-status="success"] .hb-qr7-k,
.hb-qr7[data-status="warning"] .hb-qr7-w,
.hb-qr7[data-status="error"] .hb-qr7-e {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.2s ease 0.12s, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s, stroke-dashoffset 0.32s ease 0.22s;
}
.hb-qr7[data-status="success"] .hb-qr7-k { stroke-dashoffset: 0; }
.hb-qr7-l {
  color: #d4d4d4;
  white-space: nowrap;
}
@keyframes hb-qr7-spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qr7,
  .hb-qr7-p,
  .hb-qr7-i,
  .hb-qr7-k,
  .hb-qr7-w,
  .hb-qr7-e { transition: none !important; }
  .hb-qr7[data-status="loading"] .hb-qr7-g { animation: none; }
}
`;

type Shape = number[];

function line(ax: number, ay: number, bx: number, by: number): number[] {
  return [
    ax + (bx - ax) / 3,
    ay + (by - ay) / 3,
    ax + ((bx - ax) * 2) / 3,
    ay + ((by - ay) * 2) / 3,
    bx,
    by,
  ];
}

function blob(k: number): Shape {
  return [
    12, 3,
    12 + k, 3, 21, 12 - k, 21, 12,
    21, 12 + k, 12 + k, 21, 12, 21,
    12 - k, 21, 3, 12 + k, 3, 12,
    3, 12 - k, 12 - k, 3, 12, 3,
  ];
}

const circle = blob(4.97);
const squircle = blob(7.6);
const triangle: Shape = [
  12, 3.5,
  ...line(12, 3.5, 21, 19.5),
  ...line(21, 19.5, 12, 19.5),
  ...line(12, 19.5, 3, 19.5),
  ...line(3, 19.5, 12, 3.5),
];

function shapeFor(status: MicroStatus): Shape {
  if (status === "warning") return triangle;
  if (status === "error") return squircle;
  return circle;
}

function toPath(n: Shape) {
  const f = (v: number) => v.toFixed(2);
  let d = `M${f(n[0])} ${f(n[1])}`;
  for (let s = 0; s < 4; s += 1) {
    const o = 2 + s * 6;
    d += `C${f(n[o])} ${f(n[o + 1])} ${f(n[o + 2])} ${f(n[o + 3])} ${f(n[o + 4])} ${f(n[o + 5])}`;
  }
  return `${d}Z`;
}

function easeOutBack(t: number) {
  const c1 = 1.3;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export function MicroStatusMark({
  status = "idle",
  size = 28,
  label,
  labels,
  showLabel = false,
  colors,
  duration = 480,
  className = "",
  style,
  ...rest
}: MicroStatusMarkProps) {
  const pathRef = React.useRef<SVGPathElement>(null);
  const shape = React.useRef<Shape>(shapeFor(status));
  const text = label ?? labels?.[status] ?? defaultLabels[status];
  const color = colors?.[status] ?? defaultColors[status];

  React.useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const target = shapeFor(status);
    const from = shape.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || duration <= 0 || from === target) {
      shape.current = target;
      path.setAttribute("d", toPath(target));
      return;
    }
    let raf = 0;
    let begin = 0;
    const step = (ts: number) => {
      if (!begin) begin = ts;
      const p = Math.min(1, (ts - begin) / duration);
      const e = easeOutBack(p);
      const next = target.map((v, i) => from[i] + (v - from[i]) * e);
      shape.current = p < 1 ? next : target;
      path.setAttribute("d", toPath(shape.current));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [status, duration]);

  return (
    <span
      role="status"
      aria-label={showLabel ? undefined : text}
      data-status={status}
      className={`hb-qr7 ${className}`.trim()}
      style={{ ["--hb-qr7-c" as string]: color, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-micro-status-mark" precedence="default">
        {css}
      </style>
      <svg className="hb-qr7-s" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <g className="hb-qr7-g">
          <path ref={pathRef} className="hb-qr7-p" d={toPath(shapeFor(status))} pathLength={100} />
        </g>
        <circle className="hb-qr7-i" cx="12" cy="12" r="2.3" />
        <path className="hb-qr7-k" d="M7.8 12.4 10.9 15.5 16.4 9" pathLength={1} />
        <g className="hb-qr7-w">
          <path d="M12 9.4v4.2" />
          <circle cx="12" cy="16.5" r="1" />
        </g>
        <g className="hb-qr7-e">
          <path d="M8.9 8.9 15.1 15.1M15.1 8.9 8.9 15.1" />
        </g>
      </svg>
      {showLabel ? <span className="hb-qr7-l">{text}</span> : null}
    </span>
  );
}
