"use client";

import * as React from "react";

export interface BorderStarOrbitProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: number;
  starSize?: number;
  duration?: number;
  color?: string;
  trailColor?: string;
  trail?: number;
  pauseOnHover?: boolean;
}

const css = `
.hb-qr4 {
  position: relative;
  box-sizing: border-box;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--hb-qr4-r);
  background: #111111;
  color: #ededed;
  font-family: inherit;
}
.hb-qr4-o {
  position: absolute;
  inset: -1px;
  pointer-events: none;
  display: none;
}
@supports (offset-path: path("M0 0")) {
  .hb-qr4-o { display: block; }
}
.hb-qr4-d,
.hb-qr4-h {
  position: absolute;
  left: 0;
  top: 0;
  offset-path: var(--hb-qr4-p);
  offset-rotate: 0deg;
  animation: hb-qr4-run var(--hb-qr4-t) linear infinite;
}
.hb-qr4-d {
  border-radius: 50%;
  background: var(--hb-qr4-b);
  box-shadow: 0 0 8px 1px color-mix(in srgb, var(--hb-qr4-a) 70%, transparent);
}
.hb-qr4-h {
  display: grid;
  place-items: center;
  width: var(--hb-qr4-z);
  height: var(--hb-qr4-z);
  filter: drop-shadow(0 0 5px var(--hb-qr4-a)) drop-shadow(0 0 12px var(--hb-qr4-a));
}
.hb-qr4-h > span {
  display: block;
  width: 100%;
  height: 100%;
  background: #ffffff;
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
  animation: hb-qr4-spin 3s linear infinite;
}
.hb-qr4[data-pause="true"]:hover .hb-qr4-d,
.hb-qr4[data-pause="true"]:hover .hb-qr4-h,
.hb-qr4[data-pause="true"]:hover .hb-qr4-h > span {
  animation-play-state: paused;
}
@keyframes hb-qr4-run {
  from { offset-distance: 0%; }
  to { offset-distance: 100%; }
}
@keyframes hb-qr4-spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qr4-d,
  .hb-qr4-h,
  .hb-qr4-h > span { animation: none; }
}
`;

function roundedRect(w: number, h: number, radius: number) {
  const i = 0.5;
  const r = Math.max(0, Math.min(radius - i, (w - 2 * i) / 2, (h - 2 * i) / 2));
  const x0 = i;
  const y0 = i;
  const x1 = w - i;
  const y1 = h - i;
  const f = (n: number) => n.toFixed(2);
  return [
    `M${f(x0 + r)} ${f(y0)}`,
    `H${f(x1 - r)}`,
    `A${f(r)} ${f(r)} 0 0 1 ${f(x1)} ${f(y0 + r)}`,
    `V${f(y1 - r)}`,
    `A${f(r)} ${f(r)} 0 0 1 ${f(x1 - r)} ${f(y1)}`,
    `H${f(x0 + r)}`,
    `A${f(r)} ${f(r)} 0 0 1 ${f(x0)} ${f(y1 - r)}`,
    `V${f(y0 + r)}`,
    `A${f(r)} ${f(r)} 0 0 1 ${f(x0 + r)} ${f(y0)}`,
    "Z",
  ].join(" ");
}

export function BorderStarOrbit({
  radius = 16,
  starSize = 14,
  duration = 4,
  color = "#7fb3ff",
  trailColor = "#2f7bff",
  trail = 14,
  pauseOnHover = false,
  className = "",
  style,
  children,
  ...rest
}: BorderStarOrbitProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [box, setBox] = React.useState({ w: 0, h: 0 });

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      setBox((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const count = Math.max(0, Math.min(30, Math.round(trail)));
  const ready = box.w > 0 && box.h > 0;
  const path = ready ? `path("${roundedRect(box.w, box.h, radius)}")` : "none";
  const dots = Array.from({ length: count }, (_, k) => {
    const i = k + 1;
    const f = i / (count + 1);
    const size = Math.max(2, starSize * 0.5 * (1 - f * 0.8));
    return {
      key: i,
      style: {
        width: size,
        height: size,
        opacity: Math.pow(1 - f, 1.6) * 0.9,
        animationDelay: `${(-duration * (1 - i * 0.007)).toFixed(3)}s`,
        ["--hb-qr4-b" as string]: `color-mix(in srgb, ${color} ${Math.round((1 - f) * 100)}%, ${trailColor})`,
      } as React.CSSProperties,
    };
  }).reverse();

  return (
    <div
      ref={rootRef}
      data-pause={pauseOnHover ? "true" : "false"}
      className={`hb-qr4 ${className}`.trim()}
      style={
        {
          ["--hb-qr4-r" as string]: `${radius}px`,
          ["--hb-qr4-z" as string]: `${starSize}px`,
          ["--hb-qr4-t" as string]: `${duration}s`,
          ["--hb-qr4-a" as string]: color,
          ["--hb-qr4-p" as string]: path,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-border-star-orbit" precedence="default">
        {css}
      </style>
      {children}
      {ready ? (
        <div className="hb-qr4-o" aria-hidden="true">
          {dots.map((d) => (
            <span key={d.key} className="hb-qr4-d" style={d.style} />
          ))}
          <span className="hb-qr4-h">
            <span />
          </span>
        </div>
      ) : null}
    </div>
  );
}
