"use client";

import * as React from "react";

export interface BgFlowPathsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  count?: number;
  pinch?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd2 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; background: var(--hb-vd2-bg); }
.hb-vd2 *, .hb-vd2 *::before, .hb-vd2 *::after { box-sizing: border-box; }
.hb-vd2-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; -webkit-mask-image: radial-gradient(120% 95% at 50% 50%, #000 55%, transparent 100%); mask-image: radial-gradient(120% 95% at 50% 50%, #000 55%, transparent 100%); }
.hb-vd2-sway { transform-box: view-box; transform-origin: 50% 50%; animation: hb-vd2-sway calc(19s * var(--hb-vd2-k)) cubic-bezier(0.45, 0, 0.55, 1) infinite alternate; }
.hb-vd2-glint { stroke-dasharray: 0.13 1.01; stroke-dashoffset: 0; animation: hb-vd2-run calc(var(--d) * var(--hb-vd2-k)) cubic-bezier(0.55, 0.08, 0.4, 0.95) infinite; animation-delay: var(--dl); }
.hb-vd2-halo { stroke-dasharray: 0.13 1.01; animation: hb-vd2-run calc(var(--d) * var(--hb-vd2-k)) cubic-bezier(0.55, 0.08, 0.4, 0.95) infinite; animation-delay: var(--dl); }
.hb-vd2-shade { position: absolute; inset: 0; background: radial-gradient(60% 50% at 50% 50%, color-mix(in srgb, var(--hb-vd2-a) 14%, transparent), transparent 70%); }
.hb-vd2-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
@keyframes hb-vd2-run { from { stroke-dashoffset: 0.13; } to { stroke-dashoffset: -1.01; } }
@keyframes hb-vd2-sway { from { transform: translateY(-1.6%) scaleY(0.97); } to { transform: translateY(1.6%) scaleY(1.04); } }
@media (prefers-reduced-motion: reduce) {
  .hb-vd2-sway { animation: none; }
  .hb-vd2-glint, .hb-vd2-halo { animation: none; stroke-dashoffset: var(--o); }
}
`;

function hash(i: number) {
  let x = Math.imul(i ^ 0x2c1b3c6d, 0x297a2d39);
  x ^= x >>> 15;
  x = Math.imul(x, 0x8f8fc5ad);
  x ^= x >>> 14;
  return (x >>> 0) / 4294967296;
}

export function BgFlowPaths({
  color = "#7fb3ff",
  accent = "#2f7bff",
  background = "#05070c",
  count = 28,
  pinch = 0.6,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgFlowPathsProps) {
  const rawId = React.useId();
  const id = `hb-vd2-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const n = Math.max(4, Math.min(80, Math.round(count)));
  const p = Math.max(0, Math.min(1, pinch));
  const paths = React.useMemo(() => {
    return Array.from({ length: n }, (_, i) => {
      const u = i / (n - 1);
      const y0 = 30 + u * 540 + (hash(i * 5 + 1) - 0.5) * 36;
      const y1 = 570 - u * 540 + (hash(i * 5 + 2) - 0.5) * 36;
      const yc = 300 + (u - 0.5) * 540 * (1 - p) * 0.9 + (hash(i * 5 + 3) - 0.5) * 14;
      const xc = 470 + (hash(i * 5 + 4) - 0.5) * 80;
      const d = `M-40 ${y0.toFixed(1)} C${(210 + 40 * hash(i + 90)).toFixed(1)} ${y0.toFixed(1)} ${(xc - 150).toFixed(1)} ${yc.toFixed(1)} ${xc.toFixed(1)} ${yc.toFixed(1)} S${(800 - 40 * hash(i + 91)).toFixed(1)} ${y1.toFixed(1)} 1040 ${y1.toFixed(1)}`;
      const depth = hash(i * 5 + 5);
      return {
        d,
        width: (0.5 + depth * 1.1).toFixed(2),
        opacity: (0.08 + depth * 0.22).toFixed(3),
        glint: hash(i * 7 + 11) > 0.35,
        dur: (6 + hash(i * 7 + 12) * 9).toFixed(2),
        delay: (-hash(i * 7 + 13) * 15).toFixed(2),
        off: (-hash(i * 7 + 14) * 1.1).toFixed(3),
      };
    });
  }, [n, p]);

  return (
    <div
      className={`hb-vd2 ${className}`}
      style={{ "--hb-vd2-bg": background, "--hb-vd2-a": accent, "--hb-vd2-k": (1 / Math.max(0.05, speed)).toFixed(3), ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-bg-flow-paths" precedence="default">{css}</style>
      <div className="hb-vd2-shade" aria-hidden="true" />
      <svg className="hb-vd2-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-base`} x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={color} stopOpacity="0.4" />
            <stop offset="0.48" stopColor={color} stopOpacity="1" />
            <stop offset="1" stopColor={accent} stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id={`${id}-hot`} x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={accent} />
            <stop offset="0.5" stopColor="#ffffff" />
            <stop offset="1" stopColor={accent} />
          </linearGradient>
        </defs>
        <g className="hb-vd2-sway">
          {paths.map((q, i) => (
            <path key={i} d={q.d} stroke={`url(#${id}-base)`} strokeWidth={q.width} strokeOpacity={q.opacity} />
          ))}
          {paths.map((q, i) =>
            q.glint ? (
              <path
                key={`h${i}`}
                className="hb-vd2-halo"
                d={q.d}
                pathLength={1}
                stroke={accent}
                strokeOpacity="0.22"
                strokeWidth={(Number(q.width) * 4).toFixed(2)}
                strokeLinecap="round"
                style={{ "--d": `${q.dur}s`, "--dl": `${q.delay}s`, "--o": q.off } as React.CSSProperties}
              />
            ) : null,
          )}
          {paths.map((q, i) =>
            q.glint ? (
              <path
                key={`g${i}`}
                className="hb-vd2-glint"
                d={q.d}
                pathLength={1}
                stroke={`url(#${id}-hot)`}
                strokeWidth={(Number(q.width) * 1.4).toFixed(2)}
                strokeLinecap="round"
                style={{ "--d": `${q.dur}s`, "--dl": `${q.delay}s`, "--o": q.off } as React.CSSProperties}
              />
            ) : null,
          )}
        </g>
      </svg>
      {children ? <div className="hb-vd2-in">{children}</div> : null}
    </div>
  );
}
