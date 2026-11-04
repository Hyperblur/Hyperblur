"use client";

import * as React from "react";

export interface LoaderPercentageProps extends React.HTMLAttributes<HTMLSpanElement> {
  value?: number;
  size?: number;
  color?: string;
  accent?: string;
  thickness?: number;
  duration?: number;
  label?: string;
}

const css = `
.hb-qc6 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7em;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-qc6 *, .hb-qc6 *::before, .hb-qc6 *::after { box-sizing: border-box; }
.hb-qc6-g {
  position: relative;
  flex: none;
  width: var(--hb-qc6-s);
  height: var(--hb-qc6-s);
}
.hb-qc6-svg { display: block; width: 100%; height: 100%; transform: rotate(-90deg); overflow: visible; }
.hb-qc6-bg { fill: none; stroke: #262626; }
.hb-qc6-fg { fill: none; stroke-linecap: round; filter: drop-shadow(0 0 4px color-mix(in srgb, var(--hb-qc6-c) 55%, transparent)); }
.hb-qc6-n {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--hb-qc6-s) * 0.26);
  font-weight: 600;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
.hb-qc6-n small { margin-left: 0.08em; font-size: 0.5em; font-weight: 500; color: #8f8f8f; letter-spacing: 0; }
.hb-qc6-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-qc6-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
`;

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function LoaderPercentage({
  value,
  size = 112,
  color = "#2f7bff",
  accent = "#7fb3ff",
  thickness = 6,
  duration = 4200,
  label,
  className = "",
  style,
  ...rest
}: LoaderPercentageProps) {
  const gid = React.useId();
  const [loop, setLoop] = React.useState(0);
  const controlled = typeof value === "number" && Number.isFinite(value);

  React.useEffect(() => {
    if (controlled) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setLoop(72));
      return () => cancelAnimationFrame(raf);
    }
    let t0 = 0;
    const hold = 900;
    const total = Math.max(600, duration);
    function tick(now: number) {
      if (!t0) t0 = now;
      const t = (now - t0) % (total + hold);
      setLoop(t >= total ? 100 : Math.round(ease(t / total) * 100));
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [controlled, duration]);

  const pct = Math.min(100, Math.max(0, controlled ? (value as number) : loop));
  const r = 44;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  const stroke = (thickness / size) * 100;
  const vars = {
    "--hb-qc6-s": `${size}px`,
    "--hb-qc6-c": color,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-percentage" precedence="default">{css}</style>
      <span role="status" className={`hb-qc6 ${className}`} style={vars} {...rest}>
        <span
          className="hb-qc6-g"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          aria-label={label ?? "Loading"}
        >
          <svg className="hb-qc6-svg" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <linearGradient id={`${gid}g`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={accent} />
                <stop offset="100%" stopColor={color} />
              </linearGradient>
            </defs>
            <circle className="hb-qc6-bg" cx="50" cy="50" r={r} strokeWidth={stroke.toFixed(2)} />
            <circle
              className="hb-qc6-fg"
              cx="50"
              cy="50"
              r={r}
              strokeWidth={stroke.toFixed(2)}
              stroke={`url(#${gid}g)`}
              strokeDasharray={c.toFixed(3)}
              strokeDashoffset={offset.toFixed(3)}
            />
          </svg>
          <span className="hb-qc6-n" aria-hidden="true">
            {Math.round(pct)}
            <small>%</small>
          </span>
        </span>
        <span className={label ? "hb-qc6-l" : "hb-qc6-sr"}>{label ?? "Loading"}</span>
      </span>
    </>
  );
}
