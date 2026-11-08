"use client";

import * as React from "react";

export interface LoaderFileMorphProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  labels?: [string, string, string, string];
  label?: string;
}

type Pt = [number, number];

const N = 64;

function samplePolygon(vertices: Pt[]): Pt[] {
  const closed = [...vertices, vertices[0]];
  const lengths: number[] = [];
  let total = 0;
  for (let i = 0; i < vertices.length; i++) {
    const [x1, y1] = closed[i];
    const [x2, y2] = closed[i + 1];
    const l = Math.hypot(x2 - x1, y2 - y1);
    lengths.push(l);
    total += l;
  }
  const out: Pt[] = [];
  for (let k = 0; k < N; k++) {
    let d = (k / N) * total;
    let i = 0;
    while (d > lengths[i] && i < lengths.length - 1) {
      d -= lengths[i];
      i++;
    }
    const f = lengths[i] ? d / lengths[i] : 0;
    const [x1, y1] = closed[i];
    const [x2, y2] = closed[i + 1];
    out.push([x1 + (x2 - x1) * f, y1 + (y2 - y1) * f]);
  }
  return out;
}

function sampleCircle(cx: number, cy: number, r: number): Pt[] {
  const out: Pt[] = [];
  for (let k = 0; k < N; k++) {
    const a = (-135 + (k / N) * 360) * (Math.PI / 180);
    out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return out;
}

const shapes: Pt[][] = [
  samplePolygon([
    [29, 13],
    [58, 13],
    [72, 27],
    [72, 87],
    [29, 87],
  ]),
  samplePolygon([
    [14, 25],
    [86, 25],
    [86, 75],
    [14, 75],
  ]),
  sampleCircle(50, 50, 35),
  samplePolygon([
    [31, 19],
    [69, 19],
    [87, 50],
    [69, 81],
    [31, 81],
    [13, 50],
  ]),
];

function toPath(points: Pt[]) {
  return `M${points.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")}Z`;
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const css = `
.hb-vk2 {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7em;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-vk2 *, .hb-vk2 *::before, .hb-vk2 *::after { box-sizing: border-box; }
.hb-vk2-stage {
  position: relative;
  width: var(--hb-vk2-s);
  height: var(--hb-vk2-s);
  flex: none;
}
.hb-vk2-stage::after {
  content: "";
  position: absolute;
  left: 18%;
  right: 18%;
  bottom: -2%;
  height: 8%;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-vk2-c) 45%, transparent), transparent);
  filter: blur(2px);
}
.hb-vk2-svg { display: block; width: 100%; height: 100%; overflow: visible; }
.hb-vk2-shape { filter: drop-shadow(0 6px 14px color-mix(in srgb, var(--hb-vk2-c) 40%, transparent)); }
.hb-vk2-glyph { fill: none; stroke: rgba(255,255,255,0.92); stroke-width: 3.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-vk2-steps { display: inline-flex; gap: 5px; }
.hb-vk2-step {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: #2a2a2a;
  transition: width 420ms cubic-bezier(0.22, 1, 0.36, 1), background-color 420ms ease;
}
.hb-vk2-step[data-on="true"] { width: 16px; background: var(--hb-vk2-a); }
.hb-vk2-l {
  font-size: 12px;
  line-height: 1.3;
  color: #a1a1a1;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.hb-vk2-l b { color: #ededed; font-weight: 500; }
.hb-vk2-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
`;

export function LoaderFileMorph({
  size = 72,
  color = "#2f7bff",
  accent = "#7fb3ff",
  speed = 1.6,
  labels = ["Document", "Image", "Audio", "Code"],
  label,
  className = "",
  style,
  ...rest
}: LoaderFileMorphProps) {
  const gid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [t, setT] = React.useState(0);
  const period = Math.max(0.6, speed) * 1000;

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let t0 = 0;
    function tick(now: number) {
      if (!t0) t0 = now;
      setT((now - t0) / period);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [period]);

  const seg = Math.floor(t) % 4;
  const next = (seg + 1) % 4;
  const local = t - Math.floor(t);
  const k = easeInOut(Math.min(1, Math.max(0, (local - 0.6) / 0.4)));
  const a = shapes[seg];
  const b = shapes[next];
  const points: Pt[] = a.map(([x, y], i) => [x + (b[i][0] - x) * k, y + (b[i][1] - y) * k]);
  const squash = 1 - 0.07 * Math.sin(Math.PI * k);
  const tilt = 8 * Math.sin(Math.PI * k) * (seg % 2 ? -1 : 1);
  const glyph = (i: number) => (i === seg ? Math.max(0, 1 - k * 2.2) : i === next ? Math.max(0, (k - 0.55) * 2.2) : 0);
  const active = k > 0.5 ? next : seg;

  const vars = {
    "--hb-vk2-s": `${size}px`,
    "--hb-vk2-c": color,
    "--hb-vk2-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-file-morph" precedence="default">{css}</style>
      <span role="status" className={`hb-vk2 ${className}`} style={vars} {...rest}>
        <span className="hb-vk2-stage" aria-hidden="true">
          <svg className="hb-vk2-svg" viewBox="0 0 100 100">
            <defs>
              <linearGradient id={`${gid}f`} x1="0" y1="0" x2="0.6" y2="1">
                <stop offset="0%" stopColor={accent} />
                <stop offset="100%" stopColor={color} />
              </linearGradient>
              <linearGradient id={`${gid}h`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g transform={`translate(50 50) rotate(${tilt.toFixed(2)}) scale(${(2 - squash).toFixed(3)} ${squash.toFixed(3)}) translate(-50 -50)`}>
              <path className="hb-vk2-shape" d={toPath(points)} fill={`url(#${gid}f)`} strokeLinejoin="round" />
              <path d={toPath(points)} fill="none" stroke={`url(#${gid}h)`} strokeWidth="1.4" />
              <g className="hb-vk2-glyph" opacity={glyph(0).toFixed(3)}>
                <path d="M38 40h20M38 51h24M38 62h16" />
              </g>
              <g className="hb-vk2-glyph" opacity={glyph(1).toFixed(3)}>
                <circle cx="66" cy="39" r="4.5" />
                <path d="M24 66l15-15 11 10 7-6 15 11" />
              </g>
              <g className="hb-vk2-glyph" opacity={glyph(2).toFixed(3)}>
                <path d="M34 46v8M42 39v22M50 33v34M58 41v18M66 47v6" />
              </g>
              <g className="hb-vk2-glyph" opacity={glyph(3).toFixed(3)}>
                <path d="M39 40l-10 10 10 10M61 40l10 10-10 10M54 36l-8 28" />
              </g>
            </g>
          </svg>
        </span>
        <span className="hb-vk2-steps" aria-hidden="true">
          {labels.map((l, i) => (
            <span key={l + i} className="hb-vk2-step" data-on={i === active} />
          ))}
        </span>
        {label ? (
          <span className="hb-vk2-l" aria-hidden="true">
            {label} <b>{labels[active]}</b>
          </span>
        ) : null}
        <span className="hb-vk2-sr">{label ?? "Converting"}</span>
      </span>
    </>
  );
}
