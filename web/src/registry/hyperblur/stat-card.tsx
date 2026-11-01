"use client";

import * as React from "react";

export interface StatCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  label: string;
  value: string | number;
  delta?: number;
  caption?: string;
  data?: number[];
  color?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  locale?: string;
}

const css = `
.hb-sc {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid #262626;
  background: #111111;
  color: #ededed;
  overflow: hidden;
}
.hb-sc-label { font-size: 12px; font-weight: 500; line-height: 1.2; color: #8f8f8f; letter-spacing: .01em; }
.hb-sc-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 10px; }
.hb-sc-value {
  font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif);
  font-size: 30px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -.02em;
  font-variant-numeric: tabular-nums;
  white-space: pre;
}
.hb-sc-delta {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 7px 2px 5px;
  border-radius: 999px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
  font-variant-numeric: tabular-nums;
  color: var(--hb-sc-tone);
  background: color-mix(in srgb, var(--hb-sc-tone) 14%, transparent);
}
.hb-sc-delta svg { display: block; width: 10px; height: 10px; }
.hb-sc-caption { font-size: 12px; line-height: 1.3; color: #8f8f8f; }
.hb-sc-spark { margin-top: auto; position: relative; width: 100%; line-height: 0; }
.hb-sc-svg { display: block; width: 100%; overflow: visible; }
.hb-sc-line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1.1s cubic-bezier(.22, .8, .24, 1), opacity .15s ease;
}
.hb-sc-area { transition: opacity .7s ease .35s; }
.hb-sc-dot { transition: opacity .3s ease .95s; }
.hb-sc[data-ready="false"] .hb-sc-line { stroke-dashoffset: 1; opacity: 0; }
.hb-sc[data-ready="false"] .hb-sc-area,
.hb-sc[data-ready="false"] .hb-sc-dot { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .hb-sc-line, .hb-sc-area, .hb-sc-dot { transition: none !important; }
  .hb-sc[data-ready="false"] .hb-sc-line { stroke-dashoffset: 0 !important; opacity: 1 !important; }
  .hb-sc[data-ready="false"] .hb-sc-area,
  .hb-sc[data-ready="false"] .hb-sc-dot { opacity: 1 !important; }
}
`;

function r(n: number) {
  return Math.round(n * 100) / 100;
}

function monotone(pts: [number, number][]) {
  const n = pts.length;
  if (n < 2) return "";
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const dx = pts[i + 1][0] - pts[i][0];
    m.push(dx === 0 ? 0 : (pts[i + 1][1] - pts[i][1]) / dx);
  }
  const t: number[] = new Array(n).fill(0);
  t[0] = m[0];
  t[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) {
    t[i] = m[i - 1] * m[i] <= 0 ? 0 : (2 * m[i - 1] * m[i]) / (m[i - 1] + m[i]);
  }
  let d = `M${r(pts[0][0])},${r(pts[0][1])}`;
  for (let i = 0; i < n - 1; i++) {
    const dx = (pts[i + 1][0] - pts[i][0]) / 3;
    d += `C${r(pts[i][0] + dx)},${r(pts[i][1] + t[i] * dx)} ${r(pts[i + 1][0] - dx)},${r(pts[i + 1][1] - t[i + 1] * dx)} ${r(pts[i + 1][0])},${r(pts[i + 1][1])}`;
  }
  return d;
}

function ease(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const SPARK_H = 40;

export function StatCard({
  label,
  value,
  delta,
  caption,
  data,
  color = "#2f7bff",
  prefix = "",
  suffix = "",
  decimals = 0,
  locale = "en-US",
  className = "",
  style,
  ...rest
}: StatCardProps) {
  const [ready, setReady] = React.useState(false);
  const [counted, setCounted] = React.useState<number | null>(null);
  const [width, setWidth] = React.useState(280);
  const sparkRef = React.useRef<HTMLDivElement>(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");

  const format = React.useMemo(() => {
    const nf = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return (n: number) => `${prefix}${nf.format(n)}${suffix}`;
  }, [locale, decimals, prefix, suffix]);

  React.useEffect(() => {
    let a = 0;
    let b = 0;
    a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, []);

  React.useEffect(() => {
    const el = sparkRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width);
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [data]);

  React.useEffect(() => {
    if (typeof value !== "number" || !Number.isFinite(value)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const duration = 1200;
    const begin = requestAnimationFrame((start) => {
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        if (t >= 1) {
          setCounted(null);
          return;
        }
        setCounted(value * ease(t));
        raf = requestAnimationFrame(tick);
      };
      setCounted(0);
      raf = requestAnimationFrame(tick);
    });
    return () => {
      cancelAnimationFrame(begin);
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const shown = typeof value === "number" ? format(counted ?? value) : `${prefix}${value}${suffix}`;
  const finalText = typeof value === "number" ? format(value) : `${prefix}${value}${suffix}`;

  const vals = (data ?? []).filter((v) => Number.isFinite(v));
  const dotR = 3.5;
  const pad = dotR + 1;
  const min = vals.length ? Math.min(...vals) : 0;
  const max = vals.length ? Math.max(...vals) : 0;
  const span = max - min;
  const innerW = Math.max(1, width - pad * 2);
  const innerH = SPARK_H - pad * 2;
  const pts: [number, number][] = vals.map((v, i) => [
    pad + (i / Math.max(1, vals.length - 1)) * innerW,
    span === 0 ? SPARK_H / 2 : pad + (1 - (v - min) / span) * innerH,
  ]);
  const line = monotone(pts);
  const last = pts[pts.length - 1];
  const first = pts[0];
  const area = line ? `${line}L${r(last[0])},${SPARK_H}L${r(first[0])},${SPARK_H}Z` : "";

  const deltaTone = delta === undefined || delta === 0 ? "#8f8f8f" : delta > 0 ? "#22c55e" : "#ef4444";
  const deltaText =
    delta === undefined
      ? ""
      : `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(Math.abs(delta))}%`;
  const deltaWord = delta === undefined ? "" : delta > 0 ? "up" : delta < 0 ? "down" : "flat";

  const summary = [
    `${label}: ${finalText}`,
    delta === undefined ? "" : `${deltaWord} ${deltaText}`,
    caption ?? "",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`hb-sc ${className}`}
      data-ready={ready ? "true" : "false"}
      role="group"
      aria-label={summary}
      style={{ ["--hb-sc-tone" as string]: deltaTone, ...style }}
      {...rest}
    >
      <style href="hb-stat-card" precedence="default">{css}</style>
      <div className="hb-sc-label" aria-hidden="true">{label}</div>
      <div className="hb-sc-row" aria-hidden="true">
        <span className="hb-sc-value">{shown}</span>
        {delta !== undefined ? (
          <span className="hb-sc-delta">
            {delta !== 0 ? (
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {delta > 0 ? <path d="M5 8.5V1.8M2 4.6 5 1.6l3 3" /> : <path d="M5 1.5v6.7M2 5.4l3 3 3-3" />}
              </svg>
            ) : null}
            {deltaText}
          </span>
        ) : null}
        {caption ? <span className="hb-sc-caption">{caption}</span> : null}
      </div>
      {vals.length > 1 ? (
        <div className="hb-sc-spark" ref={sparkRef} style={{ height: SPARK_H }}>
          <svg
            className="hb-sc-svg"
            viewBox={`0 0 ${width} ${SPARK_H}`}
            width={width}
            height={SPARK_H}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`hb-sc-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.32" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="hb-sc-area" d={area} fill={`url(#hb-sc-${uid})`} />
            <path className="hb-sc-line" d={line} pathLength={1} stroke={color} strokeWidth={2} />
            <g className="hb-sc-dot">
              <circle cx={last[0]} cy={last[1]} r={dotR * 2} fill={color} opacity="0.18" />
              <circle cx={last[0]} cy={last[1]} r={dotR} fill={color} stroke="#111111" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      ) : null}
    </div>
  );
}
