"use client";

import * as React from "react";

export interface LoaderLiquidProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  color?: string;
  accent?: string;
  height?: number;
  duration?: number;
  showValue?: boolean;
  label?: string;
}

const curve: [number, number][] = [
  [0, 0],
  [0.16, 0.19],
  [0.3, 0.27],
  [0.52, 0.56],
  [0.66, 0.63],
  [0.86, 0.94],
  [0.92, 1],
  [1, 1],
];

function sample(t: number) {
  for (let i = 1; i < curve.length; i++) {
    const [t1, v1] = curve[i];
    const [t0, v0] = curve[i - 1];
    if (t <= t1) {
      const f = (t - t0) / (t1 - t0 || 1);
      const s = f * f * (3 - 2 * f);
      return v0 + (v1 - v0) * s;
    }
  }
  return 1;
}

const bubbles = [
  { x: 12, s: 4, d: 0 },
  { x: 31, s: 3, d: 0.9 },
  { x: 48, s: 5, d: 0.35 },
  { x: 66, s: 3, d: 1.4 },
  { x: 82, s: 4, d: 0.65 },
];

const css = `
.hb-vk4 {
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
}
.hb-vk4 *, .hb-vk4 *::before, .hb-vk4 *::after { box-sizing: border-box; }
.hb-vk4-l {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 1.3;
  color: #a1a1a1;
}
.hb-vk4-track {
  position: relative;
  height: var(--hb-vk4-h);
  border-radius: 999px;
  overflow: hidden;
  background: linear-gradient(180deg, #0c0c0c, #151515);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.7), inset 0 0 0 1px #232323, 0 1px 0 rgba(255,255,255,0.04);
  isolation: isolate;
}
.hb-vk4-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--hb-vk4-p);
  min-width: calc(var(--hb-vk4-h) * 0.5);
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-vk4-c) 70%, #0a0a0a), var(--hb-vk4-c) 55%, var(--hb-vk4-a));
  transition: width 260ms cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-vk4-fill::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 2px;
  height: 34%;
  border-radius: 999px;
  margin: 0 6px;
  background: linear-gradient(180deg, rgba(255,255,255,0.38), rgba(255,255,255,0));
}
.hb-vk4-edge {
  position: absolute;
  top: 0;
  right: calc(var(--hb-vk4-h) * -0.34);
  width: calc(var(--hb-vk4-h) * 0.36);
  height: 100%;
  overflow: hidden;
}
.hb-vk4-wave {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 200%;
  display: block;
  animation: hb-vk4-slosh 1.15s linear infinite;
}
.hb-vk4-bub {
  position: absolute;
  bottom: -6px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.55);
  background: rgba(255,255,255,0.12);
  animation: hb-vk4-rise 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.hb-vk4-txt {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--hb-vk4-h) * 0.42);
  font-weight: 600;
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  color: #a1a1a1;
  pointer-events: none;
}
.hb-vk4-txt[data-on="true"] {
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.35);
  clip-path: inset(0 calc(100% - var(--hb-vk4-p)) 0 0);
  transition: clip-path 260ms cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-vk4-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-vk4-slosh { to { transform: translateY(-50%); } }
@keyframes hb-vk4-rise {
  0% { transform: translateY(0) scale(0.6); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(calc(var(--hb-vk4-h) * -1.1)) scale(1); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vk4-wave, .hb-vk4-bub { animation: none; }
  .hb-vk4-bub { display: none; }
  .hb-vk4-fill, .hb-vk4-txt[data-on="true"] { transition: none; }
}
`;

const wavePath = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const y = (i / 40) * 200;
    const x = 50 + Math.sin((i / 40) * Math.PI * 8) * 38;
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M0 0L${pts.join("L")}L0 200Z`;
})();

export function LoaderLiquidProgress({
  value,
  color = "#2f7bff",
  accent = "#7fb3ff",
  height = 30,
  duration = 6000,
  showValue = true,
  label,
  className = "",
  style,
  ...rest
}: LoaderLiquidProgressProps) {
  const controlled = typeof value === "number" && Number.isFinite(value);
  const [loop, setLoop] = React.useState(0);

  React.useEffect(() => {
    if (controlled) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setLoop(68));
      return () => cancelAnimationFrame(raf);
    }
    let t0 = 0;
    const total = Math.max(1200, duration);
    function tick(now: number) {
      if (!t0) t0 = now;
      setLoop(Math.round(sample(((now - t0) % total) / total) * 1000) / 10);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [controlled, duration]);

  const pct = Math.min(100, Math.max(0, controlled ? (value as number) : loop));
  const shown = Math.floor(pct);
  const vars = {
    "--hb-vk4-p": `${pct.toFixed(1)}%`,
    "--hb-vk4-h": `${Math.max(12, height)}px`,
    "--hb-vk4-c": color,
    "--hb-vk4-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-liquid-progress" precedence="default">{css}</style>
      <div className={`hb-vk4 ${className}`} style={vars} {...rest}>
        {label ? <span className="hb-vk4-l">{label}</span> : null}
        <div
          className="hb-vk4-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={shown}
          aria-label={label ?? "Progress"}
        >
          <div className="hb-vk4-fill">
            {bubbles.map((b, i) => (
              <span
                key={i}
                className="hb-vk4-bub"
                style={{ left: `${b.x}%`, width: `${b.s}px`, height: `${b.s}px`, animationDelay: `${b.d}s` }}
              />
            ))}
            {pct < 100 ? (
              <span className="hb-vk4-edge" aria-hidden="true">
                <svg className="hb-vk4-wave" viewBox="0 0 100 200" preserveAspectRatio="none">
                  <path d={wavePath} fill={accent} />
                </svg>
              </span>
            ) : null}
          </div>
          {showValue ? (
            <>
              <span className="hb-vk4-txt" aria-hidden="true">{shown}%</span>
              <span className="hb-vk4-txt" data-on="true" aria-hidden="true">{shown}%</span>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
