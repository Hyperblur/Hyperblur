"use client";

import * as React from "react";

export interface BgBeaconRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  rings?: number;
  x?: number;
  y?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd8 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; background: radial-gradient(70% 70% at var(--hb-vd8-x) var(--hb-vd8-y), color-mix(in srgb, var(--hb-vd8-a) 16%, var(--hb-vd8-bg)) 0%, var(--hb-vd8-bg) 70%); container-type: size; }
.hb-vd8 *, .hb-vd8 *::before, .hb-vd8 *::after { box-sizing: border-box; }
.hb-vd8-guide, .hb-vd8-ring { position: absolute; left: var(--hb-vd8-x); top: var(--hb-vd8-y); aspect-ratio: 1; translate: -50% -50%; }
.hb-vd8-guide { width: var(--s); border-radius: 50%; border: 1px solid color-mix(in srgb, var(--hb-vd8-c) 9%, transparent); }
.hb-vd8-ring { width: 150cqmax; opacity: 0; animation: hb-vd8-grow calc(var(--d) * var(--hb-vd8-k)) cubic-bezier(0.22, 0.61, 0.36, 1) infinite; animation-delay: var(--dl); }
.hb-vd8-ring svg { width: 100%; height: 100%; display: block; overflow: visible; }
.hb-vd8-cross { position: absolute; left: var(--hb-vd8-x); top: var(--hb-vd8-y); width: 46cqmin; height: 46cqmin; translate: -50% -50%; background: linear-gradient(90deg, transparent calc(50% - 0.5px), color-mix(in srgb, var(--hb-vd8-c) 16%, transparent) calc(50% - 0.5px), color-mix(in srgb, var(--hb-vd8-c) 16%, transparent) calc(50% + 0.5px), transparent calc(50% + 0.5px)), linear-gradient(0deg, transparent calc(50% - 0.5px), color-mix(in srgb, var(--hb-vd8-c) 16%, transparent) calc(50% - 0.5px), color-mix(in srgb, var(--hb-vd8-c) 16%, transparent) calc(50% + 0.5px), transparent calc(50% + 0.5px)); -webkit-mask-image: radial-gradient(closest-side, #000 20%, transparent); mask-image: radial-gradient(closest-side, #000 20%, transparent); }
.hb-vd8-core { position: absolute; left: var(--hb-vd8-x); top: var(--hb-vd8-y); width: 9px; height: 9px; translate: -50% -50%; border-radius: 50%; background: #fff; box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-vd8-a) 40%, transparent), 0 0 18px 4px var(--hb-vd8-a), 0 0 60px 14px color-mix(in srgb, var(--hb-vd8-a) 45%, transparent); animation: hb-vd8-pulse calc(var(--hb-vd8-p) * var(--hb-vd8-k)) cubic-bezier(0.3, 0, 0.2, 1) infinite; }
.hb-vd8-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
@keyframes hb-vd8-grow {
  0% { transform: scale(0.015) rotate(0deg); opacity: 0; }
  6% { opacity: 1; }
  70% { opacity: 0.35; }
  100% { transform: scale(1) rotate(var(--rot)); opacity: 0; }
}
@keyframes hb-vd8-pulse {
  0%, 100% { transform: scale(1); }
  8% { transform: scale(1.5); }
  30% { transform: scale(0.92); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vd8-ring { animation: none; opacity: var(--ro); transform: scale(var(--rs)); }
  .hb-vd8-core { animation: none; }
}
`;

const styles = [
  { dash: "none", width: 1.2 },
  { dash: "3 5", width: 1.4 },
  { dash: "46 10 8 10", width: 1.1 },
  { dash: "0.8 4.2", width: 5 },
  { dash: "90 30", width: 2 },
  { dash: "1.5 2.5", width: 1 },
];

export function BgBeaconRings({
  color = "#7fb3ff",
  accent = "#2f7bff",
  background = "#04060b",
  rings = 6,
  x = 50,
  y = 50,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgBeaconRingsProps) {
  const n = Math.max(2, Math.min(12, Math.round(rings)));
  const period = 9;
  const list = Array.from({ length: n }, (_, i) => {
    const st = styles[i % styles.length];
    const rot = (i % 2 ? -1 : 1) * (40 + ((i * 37) % 70));
    return {
      ...st,
      rot,
      dl: -((i * period) / n),
      rs: ((i + 1) / (n + 1)).toFixed(3),
      ro: (0.55 - (0.4 * (i + 1)) / (n + 1)).toFixed(3),
    };
  });

  return (
    <div
      className={`hb-vd8 ${className}`}
      style={
        {
          "--hb-vd8-bg": background,
          "--hb-vd8-a": accent,
          "--hb-vd8-c": color,
          "--hb-vd8-x": `${x}%`,
          "--hb-vd8-y": `${y}%`,
          "--hb-vd8-p": `${(period / n).toFixed(3)}s`,
          "--hb-vd8-k": (1 / Math.max(0.05, speed)).toFixed(3),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-bg-beacon-rings" precedence="default">{css}</style>
      <span className="hb-vd8-guide" aria-hidden="true" style={{ "--s": "22cqmin" } as React.CSSProperties} />
      <span className="hb-vd8-guide" aria-hidden="true" style={{ "--s": "48cqmin" } as React.CSSProperties} />
      <span className="hb-vd8-guide" aria-hidden="true" style={{ "--s": "82cqmin" } as React.CSSProperties} />
      <span className="hb-vd8-cross" aria-hidden="true" />
      {list.map((r, i) => (
        <span
          key={i}
          className="hb-vd8-ring"
          aria-hidden="true"
          style={{ "--d": `${period}s`, "--dl": `${r.dl.toFixed(3)}s`, "--rot": `${r.rot}deg`, "--rs": r.rs, "--ro": r.ro } as React.CSSProperties}
        >
          <svg viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="49.5"
              fill="none"
              stroke={i % 3 === 0 ? accent : color}
              strokeWidth={r.width}
              strokeDasharray={r.dash}
              pathLength={360}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>
      ))}
      <span className="hb-vd8-core" aria-hidden="true" />
      {children ? <div className="hb-vd8-in">{children}</div> : null}
    </div>
  );
}
