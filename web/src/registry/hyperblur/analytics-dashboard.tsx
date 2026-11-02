"use client";

import * as React from "react";

export type AnalyticsRange = "7D" | "30D" | "90D";

export interface AnalyticsDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  brand?: string;
  site?: string;
  user?: string;
  range?: AnalyticsRange;
  defaultRange?: AnalyticsRange;
  onRangeChange?: (range: AnalyticsRange) => void;
}

const css = `
.hb-dan {
  --a: #2f7bff;
  container: hb-dan / inline-size;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #262626;
  border-radius: 16px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  overflow: hidden;
  position: relative;
  -webkit-font-smoothing: antialiased;
}
.hb-dan *, .hb-dan *::before, .hb-dan *::after { box-sizing: border-box; }
.hb-dan button, .hb-dan input, .hb-dan select { font: inherit; color: inherit; }
.hb-dan button:focus-visible, .hb-dan input:focus-visible, .hb-dan select:focus-visible, .hb-dan [tabindex]:focus-visible {
  outline: 2px solid var(--a);
  outline-offset: 2px;
}
.hb-dan-app { display: grid; grid-template-columns: 220px minmax(0, 1fr); min-height: 640px; }
.hb-dan-side {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: 20px 12px 16px;
  border-right: 1px solid #1f1f1f;
  background: #0d0d0d;
}
.hb-dan-brand { display: flex; align-items: center; gap: 10px; padding: 0 8px; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-dan-mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--a), color-mix(in srgb, var(--a) 45%, #ffffff));
  color: #ffffff;
}
.hb-dan-nav { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-dan-nav-label { padding: 12px 8px 6px; color: #6b6b6b; font-size: 11px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
.hb-dan-link {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 34px;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #a1a1a1;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.hb-dan-link:hover { background: #161616; color: #ededed; }
.hb-dan-link[aria-current="page"] { background: #1b1b1b; color: #ffffff; }
.hb-dan-link[aria-current="page"] .hb-dan-ico { color: var(--a); }
.hb-dan-link-n {
  margin-left: auto;
  padding: 1px 7px;
  border-radius: 999px;
  background: #1f1f1f;
  color: #a1a1a1;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.hb-dan-side-foot { margin-top: auto; }
.hb-dan-main { display: flex; flex-direction: column; min-width: 0; }
.hb-dan-top { display: flex; align-items: center; gap: 12px; height: 60px; padding: 0 24px; border-bottom: 1px solid #1f1f1f; }
.hb-dan-crumb { min-width: 0; overflow: hidden; color: #8f8f8f; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.hb-dan-crumb strong { color: #ededed; font-weight: 500; }
.hb-dan-search { position: relative; width: 260px; margin-left: auto; color: #6b6b6b; }
.hb-dan-search .hb-dan-ico { position: absolute; top: 50%; left: 10px; width: 15px; height: 15px; transform: translateY(-50%); pointer-events: none; }
.hb-dan-search input {
  width: 100%;
  height: 34px;
  padding: 0 40px 0 32px;
  border: 1px solid #242424;
  border-radius: 8px;
  background: #111111;
  color: #ededed;
  font-size: 13px;
  transition: border-color .15s ease, background .15s ease;
}
.hb-dan-search input::placeholder { color: #6b6b6b; }
.hb-dan-search input:hover { border-color: #333333; }
.hb-dan-search input:focus-visible { border-color: var(--a); outline-offset: 0; }
.hb-dan-kbd {
  position: absolute;
  top: 50%;
  right: 8px;
  padding: 1px 6px;
  border: 1px solid #2a2a2a;
  border-radius: 5px;
  background: #171717;
  color: #8f8f8f;
  font-size: 11px;
  transform: translateY(-50%);
  pointer-events: none;
}
.hb-dan-iconbtn {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 34px;
  height: 34px;
  border: 1px solid #242424;
  border-radius: 8px;
  background: #111111;
  color: #a1a1a1;
  cursor: pointer;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.hb-dan-iconbtn:hover { border-color: #333333; background: #171717; color: #ededed; }
.hb-dan-dot { position: absolute; top: 8px; right: 9px; width: 7px; height: 7px; border: 2px solid #111111; border-radius: 50%; background: var(--a); box-sizing: content-box; margin: -2px; }
.hb-dan-av {
  display: grid;
  place-items: center;
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .01em;
}
.hb-dan-content { display: flex; flex-direction: column; gap: 20px; min-width: 0; padding: 24px; }
.hb-dan-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; }
.hb-dan-title { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -.02em; line-height: 1.2; }
.hb-dan-sub { margin: 4px 0 0; color: #8f8f8f; font-size: 13px; }
.hb-dan-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.hb-dan-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid #232323;
  border-radius: 12px;
  background: #111111;
  animation: hb-dan-rise .55s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: calc(var(--d, 0) * 60ms);
}
.hb-dan-card-h { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.hb-dan-card-t { margin: 0; font-size: 13px; font-weight: 600; letter-spacing: -.005em; }
.hb-dan-card-s { margin: 2px 0 0; color: #8f8f8f; font-size: 12px; }
.hb-dan-seg { display: inline-flex; padding: 2px; border: 1px solid #262626; border-radius: 8px; background: #0d0d0d; }
.hb-dan-seg button {
  height: 26px;
  padding: 0 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #8f8f8f;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.hb-dan-seg button:hover { color: #ededed; }
.hb-dan-seg button[aria-pressed="true"] { background: #232323; color: #ffffff; }
.hb-dan-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  background: #151515;
  color: #ededed;
  font-size: 12.5px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, transform .15s ease;
}
.hb-dan-btn:hover { border-color: #3a3a3a; background: #1c1c1c; }
.hb-dan-btn:active { transform: translateY(1px); }
.hb-dan-btn[data-p="true"] { border-color: var(--a); background: var(--a); color: #ffffff; }
.hb-dan-btn[data-p="true"]:hover { background: color-mix(in srgb, var(--a) 85%, #ffffff); }
.hb-dan-btn .hb-dan-ico { width: 14px; height: 14px; }
.hb-dan-ico { display: block; flex: none; width: 16px; height: 16px; }
.hb-dan-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 20px;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.hb-dan-pill .hb-dan-ico { width: 11px; height: 11px; stroke-width: 2.4; }
.hb-dan-pill[data-t="up"] { background: rgba(74, 222, 128, .12); color: #4ade80; }
.hb-dan-pill[data-t="down"] { background: rgba(248, 113, 113, .12); color: #f87171; }
.hb-dan-pill[data-t="flat"] { background: #1f1f1f; color: #a1a1a1; }
.hb-dan-spark { display: block; width: 100%; height: 36px; color: var(--a); animation: hb-dan-wipe .9s .15s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dan-spark-l { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.hb-dan-tt {
  position: absolute;
  z-index: 3;
  padding: 7px 10px;
  border: 1px solid #2c2c2c;
  border-radius: 8px;
  background: rgba(22, 22, 22, .96);
  box-shadow: 0 12px 32px -8px rgba(0, 0, 0, .7);
  color: #ededed;
  font-size: 12px;
  line-height: 1.5;
  white-space: nowrap;
  pointer-events: none;
}
.hb-dan-tt b { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-dan-tt-d { color: #8f8f8f; font-size: 11px; }
@keyframes hb-dan-rise { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-dan-wipe { from { clip-path: inset(-6px 100% -6px -6px); } to { clip-path: inset(-6px -6px -6px -6px); } }
@keyframes hb-dan-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-dan-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-dan-pulse { 0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, .55); } 100% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); } }
@keyframes hb-dan-arc { from { stroke-dasharray: 0 100; } }
@container hb-dan (max-width: 759px) {
  .hb-dan-app { grid-template-columns: minmax(0, 1fr); min-height: 0; }
  .hb-dan-side { flex-direction: row; align-items: center; gap: 8px; padding: 10px 12px; border-right: 0; border-bottom: 1px solid #1f1f1f; overflow-x: auto; }
  .hb-dan-brand { padding: 0; }
  .hb-dan-brand span:last-child, .hb-dan-nav-label, .hb-dan-link-t, .hb-dan-link-n, .hb-dan-side-foot, .hb-dan-kbd { display: none; }
  .hb-dan-nav { flex-direction: row; flex: 1; gap: 4px; }
  .hb-dan-link { justify-content: center; width: 36px; padding: 0; }
  .hb-dan-top { gap: 8px; padding: 0 16px; }
  .hb-dan-crumb { display: none; }
  .hb-dan-search { flex: 1; width: auto; margin-left: 0; }
  .hb-dan-content { gap: 16px; padding: 16px; }
  .hb-dan-title { font-size: 19px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-dan *, .hb-dan *::before, .hb-dan *::after { animation: none !important; transition: none !important; }
}
.hb-dan-live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #232323;
  border-radius: 999px;
  background: #111111;
  color: #a1a1a1;
  font-size: 12.5px;
}
.hb-dan-live b { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-dan-live-d { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: hb-dan-pulse 1.8s ease-out infinite; }
.hb-dan-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.hb-dan-kpi { display: flex; flex-direction: column; gap: 8px; padding-bottom: 8px; overflow: hidden; }
.hb-dan-kpi-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: #8f8f8f; font-size: 12px; }
.hb-dan-kpi-l { display: flex; align-items: center; gap: 8px; }
.hb-dan-kpi-i {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: color-mix(in srgb, var(--k) 16%, transparent);
  color: var(--k);
}
.hb-dan-kpi-i .hb-dan-ico { width: 14px; height: 14px; }
.hb-dan-kpi-row { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; }
.hb-dan-kpi-v { margin: 0; font-size: 26px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; line-height: 1.1; }
.hb-dan-kpi .hb-dan-spark { width: calc(100% + 16px); margin: 4px -8px -8px; color: var(--k); }
.hb-dan-row { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 16px; }
.hb-dan-legend-k { display: flex; align-items: center; gap: 14px; color: #8f8f8f; font-size: 12px; }
.hb-dan-legend-k span { display: inline-flex; align-items: center; gap: 6px; }
.hb-dan-legend-k i { width: 10px; height: 3px; border-radius: 2px; background: var(--a); }
.hb-dan-legend-k i[data-prev="true"] { background: repeating-linear-gradient(90deg, #6b6b6b 0 3px, transparent 3px 6px); }
.hb-dan-chart { display: grid; grid-template-columns: 36px minmax(0, 1fr); grid-template-rows: 240px auto; column-gap: 8px; }
.hb-dan-yl { position: relative; }
.hb-dan-yl span { position: absolute; right: 0; color: #6b6b6b; font-size: 11px; font-variant-numeric: tabular-nums; transform: translateY(50%); }
.hb-dan-plot { position: relative; cursor: crosshair; touch-action: pan-y; }
.hb-dan-plot svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; animation: hb-dan-wipe 1s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dan-gl { stroke: #1d1d1d; stroke-width: 1; vector-effect: non-scaling-stroke; }
.hb-dan-line { fill: none; stroke: var(--a); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.hb-dan-prev { fill: none; stroke: #5a5a5a; stroke-width: 1.5; stroke-dasharray: 4 4; vector-effect: non-scaling-stroke; }
.hb-dan-hl { position: absolute; top: 0; bottom: 0; width: 1px; background: #3a3a3a; pointer-events: none; }
.hb-dan-hd {
  position: absolute;
  width: 12px;
  height: 12px;
  margin: -6px 0 0 -6px;
  border: 2px solid var(--a);
  border-radius: 50%;
  background: #0a0a0a;
  pointer-events: none;
}
.hb-dan-xl { grid-column: 2; display: flex; justify-content: space-between; padding-top: 10px; color: #6b6b6b; font-size: 11px; }
.hb-dan-donut { position: relative; width: 148px; height: 148px; margin: 0 auto 16px; }
.hb-dan-donut svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-dan-donut-t { fill: none; stroke: #1b1b1b; stroke-width: 5; }
.hb-dan-donut-s { fill: none; stroke-width: 5; transition: opacity .2s ease, stroke-width .2s ease; animation: hb-dan-arc .9s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dan-donut-s[data-hot="true"] { stroke-width: 6; }
.hb-dan-donut-s[data-dim="true"] { opacity: .3; }
.hb-dan-donut-c { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.hb-dan-donut-c strong { font-size: 22px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; line-height: 1.1; }
.hb-dan-donut-c span { color: #8f8f8f; font-size: 11px; }
.hb-dan-src { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-dan-src li {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 8px;
  padding: 5px 6px;
  margin: 0 -6px;
  border-radius: 6px;
  color: #a1a1a1;
  font-size: 12.5px;
  cursor: default;
  transition: background .15s ease;
}
.hb-dan-src li:hover { background: #171717; color: #ededed; }
.hb-dan-src i { width: 8px; height: 8px; border-radius: 3px; }
.hb-dan-src b { color: #ededed; font-weight: 500; font-variant-numeric: tabular-nums; }
.hb-dan-src em { min-width: 40px; color: #6b6b6b; font-size: 12px; font-style: normal; text-align: right; font-variant-numeric: tabular-nums; }
.hb-dan-pages { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-dan-page {
  display: grid;
  grid-template-columns: 20px minmax(0, 1.1fr) minmax(0, 2fr) 76px 64px;
  align-items: center;
  gap: 16px;
  padding: 10px 8px;
  margin: 0 -8px;
  border-top: 1px solid #1b1b1b;
  border-radius: 8px;
  transition: background .15s ease;
}
.hb-dan-page:first-child { border-top-color: transparent; }
.hb-dan-page:hover { background: #151515; }
.hb-dan-page-n { color: #6b6b6b; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-dan-page-t { min-width: 0; }
.hb-dan-page-t strong { display: block; overflow: hidden; font-size: 13px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.hb-dan-page-t span { display: block; overflow: hidden; color: #6b6b6b; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-dan-page-b { height: 6px; border-radius: 999px; background: #1b1b1b; overflow: hidden; }
.hb-dan-page-b i {
  display: block;
  width: var(--w);
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--a) 70%, #000000), var(--a));
  transform-origin: left;
  animation: hb-dan-bar .9s cubic-bezier(.3, .7, .2, 1) both;
  transition: filter .15s ease;
}
.hb-dan-page:hover .hb-dan-page-b i { filter: brightness(1.25); }
.hb-dan-page-v { font-size: 13px; font-weight: 500; font-variant-numeric: tabular-nums; text-align: right; }
.hb-dan-page-d { justify-self: end; }
@keyframes hb-dan-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@container hb-dan (max-width: 959px) {
  .hb-dan-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-dan-row { grid-template-columns: minmax(0, 1fr); }
}
@container hb-dan (max-width: 539px) {
  .hb-dan-page { grid-template-columns: 16px minmax(0, 1fr) 64px; gap: 10px; }
  .hb-dan-page-b, .hb-dan-page-d { display: none; }
  .hb-dan-kpi-v { font-size: 22px; }
}
@container hb-dan (max-width: 419px) {
  .hb-dan-kpis { grid-template-columns: minmax(0, 1fr); }
}
`;

function hash(n: number) {
  let x = Math.imul(n + 1, 2654435761) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519) >>> 0;
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

type Pt = [number, number];

function smooth(pts: Pt[]) {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

function project(values: number[], w: number, h: number, padY: number, lo?: number, hi?: number): Pt[] {
  const min = lo ?? Math.min(...values);
  const max = hi ?? Math.max(...values);
  const span = max - min || 1;
  return values.map((v, i) => [
    values.length === 1 ? w / 2 : (i / (values.length - 1)) * w,
    padY + (1 - (v - min) / span) * (h - padY * 2),
  ]);
}

function tone(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return `linear-gradient(135deg, hsl(${hue} 62% 52%), hsl(${(hue + 48) % 360} 62% 36%))`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const icons: Record<string, string[]> = {
  grid: ["M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"],
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"],
  file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
  sliders: ["M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.7 21a2 2 0 0 1-3.4 0"],
  search: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.3-4.3"],
  up: ["M12 19V5M5 12l7-7 7 7"],
  down: ["M12 5v14M19 12l-7 7-7-7"],
  chevr: ["M9 6l6 6-6 6"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5M12 15V3"],
  clock: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M12 7v5l3 2"],
  refund: ["M3 12a9 9 0 1 0 3-6.7L3 8", "M3 3v5h5"],
  target: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
  globe: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M3 12h18", "M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"],
  flag: ["M4 22V4", "M4 4h13l-2 4 2 4H4"],
};

function Ico({ n }: { n: string }) {
  return (
    <svg className="hb-dan-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(icons[n] ?? []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function Spark({ values, id }: { values: number[]; id: string }) {
  const line = smooth(project(values, 100, 32, 3));
  return (
    <svg className="hb-dan-spark" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".26" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line}L100 32L0 32Z`} fill={`url(#${id})`} />
      <path className="hb-dan-spark-l" d={line} />
    </svg>
  );
}

function Delta({ value, good = true, suffix = "%" }: { value: number; good?: boolean; suffix?: string }) {
  const up = value >= 0;
  const t = value === 0 ? "flat" : up === good ? "up" : "down";
  return (
    <span className="hb-dan-pill" data-t={t}>
      <Ico n={up ? "up" : "down"} />
      {Math.abs(value).toFixed(1)}
      {suffix}
    </span>
  );
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  count?: string;
  section?: string;
}
function Shell({
  brand,
  nav,
  defaultActive,
  crumb,
  placeholder,
  user,
  foot,
  children,
}: {
  brand: string;
  nav: NavItem[];
  defaultActive: string;
  crumb: [string, string];
  placeholder: string;
  user: string;
  foot?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [active, setActive] = React.useState(defaultActive);
  return (
    <div className="hb-dan-app">
      <aside className="hb-dan-side">
        <div className="hb-dan-brand">
          <span className="hb-dan-mark" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18L10 6l4 8 2-4 4 8" />
            </svg>
          </span>
          <span>{brand}</span>
        </div>
        <nav aria-label="Main">
          <ul className="hb-dan-nav">
            {nav.map((item) => (
              <React.Fragment key={item.id}>
                {item.section ? (
                  <li className="hb-dan-nav-label" aria-hidden="true">
                    {item.section}
                  </li>
                ) : null}
                <li>
                  <button type="button" className="hb-dan-link" aria-current={active === item.id ? "page" : undefined} aria-label={item.label} onClick={() => setActive(item.id)}>
                    <Ico n={item.icon} />
                    <span className="hb-dan-link-t">{item.label}</span>
                    {item.count ? <span className="hb-dan-link-n">{item.count}</span> : null}
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </nav>
        {foot ? <div className="hb-dan-side-foot">{foot}</div> : null}
      </aside>
      <div className="hb-dan-main">
        <header className="hb-dan-top">
          <div className="hb-dan-crumb">
            {crumb[0]} / <strong>{crumb[1]}</strong>
          </div>
          <label className="hb-dan-search">
            <Ico n="search" />
            <input type="search" placeholder={placeholder} aria-label={placeholder} />
            <span className="hb-dan-kbd">/</span>
          </label>
          <button type="button" className="hb-dan-iconbtn" aria-label="Notifications">
            <Ico n="bell" />
            <span className="hb-dan-dot" />
          </button>
          <span className="hb-dan-av" style={{ background: tone(user), width: 34, height: 34 }} title={user}>
            {initials(user)}
          </span>
        </header>
        <div className="hb-dan-content">{children}</div>
      </div>
    </div>
  );
}

const RANGES: Record<AnalyticsRange, number> = { "7D": 7, "30D": 30, "90D": 90 };
const RANGE_KEYS: AnalyticsRange[] = ["7D", "30D", "90D"];
const DAYS = 180;
const WEEKLY = [0.8, 1, 1.1, 1.08, 1.05, 0.95, 0.78];
const MONTHS: [string, number][] = [
  ["Oct", 31],
  ["Sep", 30],
  ["Aug", 31],
  ["Jul", 31],
  ["Jun", 30],
  ["May", 31],
  ["Apr", 30],
];

const visitorsAll = Array.from({ length: DAYS }, (_, i) =>
  Math.round((2300 + i * 7 + (i > 150 ? (i - 150) * 12 : 0)) * WEEKLY[(i + 2) % 7] + (hash(i) - 0.5) * 380),
);
const viewsAll = visitorsAll.map((v, i) => Math.round(v * (2.5 + hash(i + 400) * 0.5)));
const bounceAll = Array.from({ length: DAYS }, (_, i) => 43.5 - i * 0.012 + (hash(i + 900) - 0.5) * 5);
const sessionAll = Array.from({ length: DAYS }, (_, i) => 188 + i * 0.12 + (hash(i + 1300) - 0.5) * 36);

const SOURCES = [
  { name: "Direct", share: 38.4, color: "var(--a)" },
  { name: "Organic search", share: 28.9, color: "#7fb3ff" },
  { name: "Social", share: 15.2, color: "#a78bfa" },
  { name: "Referral", share: 10.6, color: "#34d399" },
  { name: "Email", share: 6.9, color: "#fbbf24" },
];

const PAGES = [
  { name: "Homepage", path: "/", share: 24.1, delta: 3.2 },
  { name: "Pricing", path: "/pricing", share: 14.6, delta: 8.4 },
  { name: "Designing for dark mode", path: "/blog/designing-for-dark-mode", share: 11.2, delta: 12.9 },
  { name: "Getting started", path: "/docs/getting-started", share: 9.8, delta: -1.8 },
  { name: "Workflow automation", path: "/features/automation", share: 7.9, delta: 4.1 },
  { name: "Changelog", path: "/changelog", share: 5.4, delta: -3.3 },
];

const NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: "grid", section: "Analytics" },
  { id: "realtime", label: "Realtime", icon: "clock" },
  { id: "pages", label: "Pages", icon: "file" },
  { id: "sources", label: "Sources", icon: "globe" },
  { id: "audience", label: "Audience", icon: "users", section: "Reports" },
  { id: "campaigns", label: "Campaigns", icon: "target", count: "4" },
  { id: "goals", label: "Goals", icon: "flag" },
  { id: "settings", label: "Settings", icon: "sliders", section: "Workspace" },
];

function dayLabel(back: number) {
  let day = 31 - back;
  let m = 0;
  while (day < 1) {
    m++;
    day += MONTHS[m][1];
  }
  return `${MONTHS[m][0]} ${day}`;
}

function sum(a: number[]) {
  return a.reduce((t, v) => t + v, 0);
}

function avg(a: number[]) {
  return sum(a) / a.length;
}

function fmtK(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}K` : String(Math.round(n));
}

function fmtNum(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

function fmtTime(sec: number) {
  return `${Math.floor(sec / 60)}m ${String(Math.round(sec % 60)).padStart(2, "0")}s`;
}

function pct(cur: number, prev: number) {
  return ((cur - prev) / prev) * 100;
}

export function AnalyticsDashboard({
  accent = "#2f7bff",
  brand = "Pulse",
  site = "acme.studio",
  user = "Maya Reyes",
  range,
  defaultRange = "30D",
  onRangeChange,
  className = "",
  style,
  ...rest
}: AnalyticsDashboardProps) {
  const uid = React.useId().replace(/:/g, "");
  const [inner, setInner] = React.useState<AnalyticsRange>(defaultRange);
  const [hover, setHover] = React.useState<number | null>(null);
  const [hot, setHot] = React.useState<number | null>(null);
  const [tick, setTick] = React.useState(0);
  const current = range ?? inner;
  const n = RANGES[current];

  React.useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 2600);
    return () => window.clearInterval(id);
  }, []);

  const pick = (r: AnalyticsRange) => {
    setInner(r);
    setHover(null);
    onRangeChange?.(r);
  };

  const cut = (a: number[]) => a.slice(DAYS - n);
  const before = (a: number[]) => a.slice(DAYS - 2 * n, DAYS - n);
  const visitors = cut(visitorsAll);
  const prevVisitors = before(visitorsAll);
  const views = cut(viewsAll);
  const bounce = cut(bounceAll);
  const session = cut(sessionAll);
  const totalVisitors = sum(visitors);
  const totalViews = sum(views);

  const kpis = [
    { label: "Visitors", icon: "users", color: "var(--a)", value: fmtK(totalVisitors), delta: pct(totalVisitors, sum(prevVisitors)), good: true, series: visitors },
    { label: "Page views", icon: "file", color: "#a78bfa", value: fmtK(totalViews), delta: pct(totalViews, sum(before(viewsAll))), good: true, series: views },
    { label: "Bounce rate", icon: "refund", color: "#fbbf24", value: `${avg(bounce).toFixed(1)}%`, delta: pct(avg(bounce), avg(before(bounceAll))), good: false, series: bounce },
    { label: "Avg. session", icon: "clock", color: "#34d399", value: fmtTime(avg(session)), delta: pct(avg(session), avg(before(sessionAll))), good: true, series: session },
  ];

  const top = Math.ceil(Math.max(...visitors, ...prevVisitors) / 1000) * 1000;
  const gridCount = top / 1000;
  const toPts = (a: number[]) => project(a, 100, 100, 0, 0, top);
  const curPts = toPts(visitors);
  const line = smooth(curPts);
  const xs = Array.from({ length: 6 }, (_, k) => Math.round((k * (n - 1)) / 5));

  const moveTo = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    setHover(Math.max(0, Math.min(n - 1, Math.round(x * (n - 1)))));
  };

  const keyMove = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") setHover((h) => Math.min(n - 1, (h ?? -1) + 1));
    else if (e.key === "ArrowLeft") setHover((h) => Math.max(0, (h ?? n) - 1));
    else if (e.key === "Escape") setHover(null);
    else return;
    e.preventDefault();
  };

  const arcs = SOURCES.map((s, i) => ({
    ...s,
    len: Math.max(s.share - 1.2, 0.5),
    offset: SOURCES.slice(0, i).reduce((t, x) => t + x.share, 0) + 0.6,
  }));

  const online = 1180 + Math.round(hash(tick) * 140);
  const vars = { "--a": accent, ...style } as React.CSSProperties;
  const hp = hover === null ? null : curPts[hover];

  return (
    <div className={`hb-dan ${className}`} style={vars} {...rest}>
      <style href="hb-analytics-dashboard" precedence="default">
        {css}
      </style>
      <Shell
        brand={brand}
        nav={NAV}
        defaultActive="overview"
        crumb={["Websites", site]}
        placeholder="Search reports"
        user={user}
        foot={
          <div className="hb-dan-card" style={{ padding: 12 }}>
            <p className="hb-dan-card-t">Starter plan</p>
            <p className="hb-dan-card-s" style={{ marginBottom: 10 }}>
              {fmtNum(41200)} of {fmtNum(100000)} events
            </p>
            <div className="hb-dan-page-b">
              <i style={{ "--w": "41%" } as React.CSSProperties} />
            </div>
          </div>
        }
      >
        <div className="hb-dan-head">
          <div>
            <h2 className="hb-dan-title">Overview</h2>
            <p className="hb-dan-sub">
              {site} · last {n} days
            </p>
          </div>
          <div className="hb-dan-tools">
            <span className="hb-dan-live" aria-live="off">
              <span className="hb-dan-live-d" />
              <b>{fmtNum(online)}</b> online now
            </span>
            <div className="hb-dan-seg" role="group" aria-label="Date range">
              {RANGE_KEYS.map((r) => (
                <button key={r} type="button" aria-pressed={current === r} onClick={() => pick(r)}>
                  {r}
                </button>
              ))}
            </div>
            <button type="button" className="hb-dan-btn">
              <Ico n="download" />
              Export
            </button>
          </div>
        </div>

        <div className="hb-dan-kpis">
          {kpis.map((k, i) => (
            <div className="hb-dan-card hb-dan-kpi" key={k.label} style={{ "--k": k.color, "--d": i } as React.CSSProperties}>
              <div className="hb-dan-kpi-top">
                <span className="hb-dan-kpi-l">
                  <span className="hb-dan-kpi-i">
                    <Ico n={k.icon} />
                  </span>
                  {k.label}
                </span>
              </div>
              <div className="hb-dan-kpi-row">
                <p className="hb-dan-kpi-v">{k.value}</p>
                <Delta value={k.delta} good={k.good} />
              </div>
              <Spark key={`${current}${k.label}`} values={k.series} id={`${uid}${i}`} />
            </div>
          ))}
        </div>

        <div className="hb-dan-row">
          <div className="hb-dan-card" style={{ "--d": 4 } as React.CSSProperties}>
            <div className="hb-dan-card-h">
              <div>
                <h3 className="hb-dan-card-t">Visitors over time</h3>
                <p className="hb-dan-card-s">Unique visitors per day</p>
              </div>
              <div className="hb-dan-legend-k">
                <span>
                  <i />
                  This period
                </span>
                <span>
                  <i data-prev="true" />
                  Previous
                </span>
              </div>
            </div>
            <div className="hb-dan-chart">
              <div className="hb-dan-yl" aria-hidden="true">
                {Array.from({ length: gridCount + 1 }, (_, k) => (
                  <span key={k} style={{ bottom: `${((k / gridCount) * 100).toFixed(2)}%` }}>
                    {k === 0 ? "0" : fmtK(k * 1000)}
                  </span>
                ))}
              </div>
              <div
                className="hb-dan-plot"
                role="img"
                tabIndex={0}
                aria-label={`Visitors per day, ${fmtNum(totalVisitors)} in total over ${n} days. Use arrow keys to inspect days.`}
                onPointerMove={moveTo}
                onPointerLeave={() => setHover(null)}
                onKeyDown={keyMove}
                onBlur={() => setHover(null)}
              >
                <svg key={current} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id={`${uid}a`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--a)" stopOpacity=".28" />
                      <stop offset="1" stopColor="var(--a)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {Array.from({ length: gridCount + 1 }, (_, k) => (
                    <line key={k} className="hb-dan-gl" x1="0" x2="100" y1={(100 - (k / gridCount) * 100).toFixed(2)} y2={(100 - (k / gridCount) * 100).toFixed(2)} />
                  ))}
                  <path d={`${line}L100 100L0 100Z`} fill={`url(#${uid}a)`} />
                  <path className="hb-dan-prev" d={smooth(toPts(prevVisitors))} />
                  <path className="hb-dan-line" d={line} />
                </svg>
                {hp && hover !== null ? (
                  <>
                    <div className="hb-dan-hl" style={{ left: `${hp[0].toFixed(2)}%` }} />
                    <div className="hb-dan-hd" style={{ left: `${hp[0].toFixed(2)}%`, top: `${hp[1].toFixed(2)}%` }} />
                    <div
                      className="hb-dan-tt"
                      style={{
                        top: 4,
                        left: `${hp[0].toFixed(2)}%`,
                        transform: hp[0] > 68 ? "translateX(calc(-100% - 14px))" : "translateX(14px)",
                      }}
                    >
                      <div className="hb-dan-tt-d">{dayLabel(n - 1 - hover)}</div>
                      <div>
                        Visitors <b>{fmtNum(visitors[hover])}</b>
                      </div>
                      <div>
                        Previous <b>{fmtNum(prevVisitors[hover])}</b>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="hb-dan-xl" aria-hidden="true">
                {xs.map((x) => (
                  <span key={x}>{dayLabel(n - 1 - x)}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="hb-dan-card" style={{ "--d": 5 } as React.CSSProperties}>
            <div className="hb-dan-card-h">
              <div>
                <h3 className="hb-dan-card-t">Traffic sources</h3>
                <p className="hb-dan-card-s">Where visitors come from</p>
              </div>
            </div>
            <div className="hb-dan-donut">
              <svg viewBox="0 0 42 42" role="img" aria-label="Traffic sources share">
                <circle className="hb-dan-donut-t" cx="21" cy="21" r="15.9155" />
                {arcs.map((s, i) => (
                  <circle
                    key={`${current}${s.name}`}
                    className="hb-dan-donut-s"
                    cx="21"
                    cy="21"
                    r="15.9155"
                    pathLength={100}
                    data-hot={hot === i}
                    data-dim={hot !== null && hot !== i}
                    style={{ stroke: s.color, strokeDasharray: `${s.len.toFixed(2)} ${(100 - s.len).toFixed(2)}`, strokeDashoffset: -s.offset }}
                  />
                ))}
              </svg>
              <div className="hb-dan-donut-c">
                <strong>{hot === null ? fmtK(totalVisitors) : `${SOURCES[hot].share.toFixed(1)}%`}</strong>
                <span>{hot === null ? "visitors" : SOURCES[hot].name}</span>
              </div>
            </div>
            <ul className="hb-dan-src">
              {SOURCES.map((s, i) => (
                <li key={s.name} onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)}>
                  <i style={{ background: s.color }} />
                  <span>{s.name}</span>
                  <b>{fmtK((totalVisitors * s.share) / 100)}</b>
                  <em>{s.share.toFixed(1)}%</em>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hb-dan-card" style={{ "--d": 6 } as React.CSSProperties}>
          <div className="hb-dan-card-h">
            <div>
              <h3 className="hb-dan-card-t">Top pages</h3>
              <p className="hb-dan-card-s">Ranked by page views</p>
            </div>
            <button type="button" className="hb-dan-btn">
              View all
              <Ico n="chevr" />
            </button>
          </div>
          <ol className="hb-dan-pages">
            {PAGES.map((p, i) => (
              <li className="hb-dan-page" key={p.path}>
                <span className="hb-dan-page-n">{i + 1}</span>
                <div className="hb-dan-page-t">
                  <strong>{p.name}</strong>
                  <span>{p.path}</span>
                </div>
                <div className="hb-dan-page-b">
                  <i key={current} style={{ "--w": `${((p.share / PAGES[0].share) * 100).toFixed(1)}%`, animationDelay: `${i * 70}ms` } as React.CSSProperties} />
                </div>
                <span className="hb-dan-page-v">{fmtK((totalViews * p.share) / 100)}</span>
                <span className="hb-dan-page-d">
                  <Delta value={p.delta} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Shell>
    </div>
  );
}
