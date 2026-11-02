"use client";

import * as React from "react";

export type SalesPeriod = "H1" | "H2" | "FY";

export interface SalesDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  brand?: string;
  user?: string;
  currency?: string;
  period?: SalesPeriod;
  defaultPeriod?: SalesPeriod;
  onPeriodChange?: (period: SalesPeriod) => void;
}

const css = `
.hb-dsl {
  --a: #2f7bff;
  container: hb-dsl / inline-size;
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
.hb-dsl *, .hb-dsl *::before, .hb-dsl *::after { box-sizing: border-box; }
.hb-dsl button, .hb-dsl input, .hb-dsl select { font: inherit; color: inherit; }
.hb-dsl button:focus-visible, .hb-dsl input:focus-visible, .hb-dsl select:focus-visible, .hb-dsl [tabindex]:focus-visible {
  outline: 2px solid var(--a);
  outline-offset: 2px;
}
.hb-dsl-app { display: grid; grid-template-columns: 220px minmax(0, 1fr); min-height: 640px; }
.hb-dsl-side {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: 20px 12px 16px;
  border-right: 1px solid #1f1f1f;
  background: #0d0d0d;
}
.hb-dsl-brand { display: flex; align-items: center; gap: 10px; padding: 0 8px; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-dsl-mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--a), color-mix(in srgb, var(--a) 45%, #ffffff));
  color: #ffffff;
}
.hb-dsl-nav { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-dsl-nav-label { padding: 12px 8px 6px; color: #6b6b6b; font-size: 11px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
.hb-dsl-link {
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
.hb-dsl-link:hover { background: #161616; color: #ededed; }
.hb-dsl-link[aria-current="page"] { background: #1b1b1b; color: #ffffff; }
.hb-dsl-link[aria-current="page"] .hb-dsl-ico { color: var(--a); }
.hb-dsl-link-n {
  margin-left: auto;
  padding: 1px 7px;
  border-radius: 999px;
  background: #1f1f1f;
  color: #a1a1a1;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.hb-dsl-side-foot { margin-top: auto; }
.hb-dsl-main { display: flex; flex-direction: column; min-width: 0; }
.hb-dsl-top { display: flex; align-items: center; gap: 12px; height: 60px; padding: 0 24px; border-bottom: 1px solid #1f1f1f; }
.hb-dsl-crumb { min-width: 0; overflow: hidden; color: #8f8f8f; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.hb-dsl-crumb strong { color: #ededed; font-weight: 500; }
.hb-dsl-search { position: relative; width: 260px; margin-left: auto; color: #6b6b6b; }
.hb-dsl-search .hb-dsl-ico { position: absolute; top: 50%; left: 10px; width: 15px; height: 15px; transform: translateY(-50%); pointer-events: none; }
.hb-dsl-search input {
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
.hb-dsl-search input::placeholder { color: #6b6b6b; }
.hb-dsl-search input:hover { border-color: #333333; }
.hb-dsl-search input:focus-visible { border-color: var(--a); outline-offset: 0; }
.hb-dsl-kbd {
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
.hb-dsl-iconbtn {
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
.hb-dsl-iconbtn:hover { border-color: #333333; background: #171717; color: #ededed; }
.hb-dsl-dot { position: absolute; top: 8px; right: 9px; width: 7px; height: 7px; border: 2px solid #111111; border-radius: 50%; background: var(--a); box-sizing: content-box; margin: -2px; }
.hb-dsl-av {
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
.hb-dsl-content { display: flex; flex-direction: column; gap: 20px; min-width: 0; padding: 24px; }
.hb-dsl-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; }
.hb-dsl-title { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -.02em; line-height: 1.2; }
.hb-dsl-sub { margin: 4px 0 0; color: #8f8f8f; font-size: 13px; }
.hb-dsl-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.hb-dsl-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid #232323;
  border-radius: 12px;
  background: #111111;
  animation: hb-dsl-rise .55s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: calc(var(--d, 0) * 60ms);
}
.hb-dsl-card-h { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.hb-dsl-card-t { margin: 0; font-size: 13px; font-weight: 600; letter-spacing: -.005em; }
.hb-dsl-card-s { margin: 2px 0 0; color: #8f8f8f; font-size: 12px; }
.hb-dsl-seg { display: inline-flex; padding: 2px; border: 1px solid #262626; border-radius: 8px; background: #0d0d0d; }
.hb-dsl-seg button {
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
.hb-dsl-seg button:hover { color: #ededed; }
.hb-dsl-seg button[aria-pressed="true"] { background: #232323; color: #ffffff; }
.hb-dsl-btn {
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
.hb-dsl-btn:hover { border-color: #3a3a3a; background: #1c1c1c; }
.hb-dsl-btn:active { transform: translateY(1px); }
.hb-dsl-btn[data-p="true"] { border-color: var(--a); background: var(--a); color: #ffffff; }
.hb-dsl-btn[data-p="true"]:hover { background: color-mix(in srgb, var(--a) 85%, #ffffff); }
.hb-dsl-btn .hb-dsl-ico { width: 14px; height: 14px; }
.hb-dsl-ico { display: block; flex: none; width: 16px; height: 16px; }
.hb-dsl-pill {
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
.hb-dsl-pill .hb-dsl-ico { width: 11px; height: 11px; stroke-width: 2.4; }
.hb-dsl-pill[data-t="up"] { background: rgba(74, 222, 128, .12); color: #4ade80; }
.hb-dsl-pill[data-t="down"] { background: rgba(248, 113, 113, .12); color: #f87171; }
.hb-dsl-pill[data-t="flat"] { background: #1f1f1f; color: #a1a1a1; }
.hb-dsl-spark { display: block; width: 100%; height: 36px; color: var(--a); animation: hb-dsl-wipe .9s .15s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dsl-spark-l { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.hb-dsl-tt {
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
.hb-dsl-tt b { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-dsl-tt-d { color: #8f8f8f; font-size: 11px; }
@keyframes hb-dsl-rise { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-dsl-wipe { from { clip-path: inset(-6px 100% -6px -6px); } to { clip-path: inset(-6px -6px -6px -6px); } }
@keyframes hb-dsl-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-dsl-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-dsl-pulse { 0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, .55); } 100% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); } }
@keyframes hb-dsl-arc { from { stroke-dasharray: 0 100; } }
@container hb-dsl (max-width: 759px) {
  .hb-dsl-app { grid-template-columns: minmax(0, 1fr); min-height: 0; }
  .hb-dsl-side { flex-direction: row; align-items: center; gap: 8px; padding: 10px 12px; border-right: 0; border-bottom: 1px solid #1f1f1f; overflow-x: auto; }
  .hb-dsl-brand { padding: 0; }
  .hb-dsl-brand span:last-child, .hb-dsl-nav-label, .hb-dsl-link-t, .hb-dsl-link-n, .hb-dsl-side-foot, .hb-dsl-kbd { display: none; }
  .hb-dsl-nav { flex-direction: row; flex: 1; gap: 4px; }
  .hb-dsl-link { justify-content: center; width: 36px; padding: 0; }
  .hb-dsl-top { gap: 8px; padding: 0 16px; }
  .hb-dsl-crumb { display: none; }
  .hb-dsl-search { flex: 1; width: auto; margin-left: 0; }
  .hb-dsl-content { gap: 16px; padding: 16px; }
  .hb-dsl-title { font-size: 19px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-dsl *, .hb-dsl *::before, .hb-dsl *::after { animation: none !important; transition: none !important; }
}
.hb-dsl-status { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid #232323; border-radius: 10px; background: #111111; }
.hb-dsl-status i { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: hb-dsl-pulse 1.8s ease-out infinite; }
.hb-dsl-status strong { display: block; font-size: 12.5px; font-weight: 500; }
.hb-dsl-status span { color: #8f8f8f; font-size: 11.5px; }
.hb-dsl-top3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.hb-dsl-kpi { display: flex; flex-direction: column; gap: 8px; padding-bottom: 8px; overflow: hidden; }
.hb-dsl-kpi-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: #8f8f8f; font-size: 12px; }
.hb-dsl-kpi-l { display: flex; align-items: center; gap: 8px; }
.hb-dsl-kpi-i {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: color-mix(in srgb, var(--k) 16%, transparent);
  color: var(--k);
}
.hb-dsl-kpi-i .hb-dsl-ico { width: 14px; height: 14px; }
.hb-dsl-kpi-v { margin: 0; font-size: 28px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; line-height: 1.1; }
.hb-dsl-kpi-n { color: #6b6b6b; font-size: 12px; }
.hb-dsl-kpi .hb-dsl-spark { width: calc(100% + 16px); margin: 4px -8px -8px; color: var(--k); }
.hb-dsl-ringc { display: flex; align-items: center; gap: 16px; }
.hb-dsl-ring { position: relative; flex: none; width: 96px; height: 96px; }
.hb-dsl-ring svg { display: block; width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-dsl-ring-t { fill: none; stroke: #1d1d1d; stroke-width: 4; }
.hb-dsl-ring-p { fill: none; stroke: var(--a); stroke-width: 4; stroke-linecap: round; animation: hb-dsl-arc 1.2s cubic-bezier(.3, .7, .2, 1) both; filter: drop-shadow(0 0 6px color-mix(in srgb, var(--a) 60%, transparent)); }
.hb-dsl-ring-v { position: absolute; inset: 0; display: grid; place-items: center; font-size: 20px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; }
.hb-dsl-ringc-x { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.hb-dsl-ringc-x p { margin: 0; color: #8f8f8f; font-size: 12px; line-height: 1.45; }
.hb-dsl-ringc-x p b { color: #ededed; font-weight: 500; }
.hb-dsl-row { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); gap: 16px; }
.hb-dsl-legend-k { display: flex; align-items: center; gap: 14px; color: #8f8f8f; font-size: 12px; }
.hb-dsl-legend-k span { display: inline-flex; align-items: center; gap: 6px; }
.hb-dsl-legend-k i { width: 10px; height: 10px; border-radius: 3px; background: var(--a); }
.hb-dsl-legend-k i[data-line="true"] { height: 0; border-top: 2px dashed #cfcfcf; border-radius: 0; background: transparent; }
.hb-dsl-combo { display: grid; grid-template-columns: 40px minmax(0, 1fr); grid-template-rows: 250px auto; column-gap: 8px; }
.hb-dsl-yl { position: relative; }
.hb-dsl-yl span { position: absolute; right: 0; color: #6b6b6b; font-size: 11px; font-variant-numeric: tabular-nums; transform: translateY(50%); }
.hb-dsl-plot { position: relative; }
.hb-dsl-gl { position: absolute; right: 0; left: 0; height: 1px; background: #1b1b1b; }
.hb-dsl-cols { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); }
.hb-dsl-col {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: background .15s ease;
}
.hb-dsl-col:hover, .hb-dsl-col[data-on="true"] { background: rgba(255, 255, 255, .035); }
.hb-dsl-bar {
  width: min(62%, 30px);
  border-radius: 6px 6px 2px 2px;
  background: linear-gradient(180deg, var(--a), color-mix(in srgb, var(--a) 50%, #000000));
  transform-origin: bottom;
  animation: hb-dsl-grow .8s cubic-bezier(.3, .7, .2, 1) both;
  animation-delay: calc(var(--i) * 40ms);
  transition: filter .15s ease;
}
.hb-dsl-bar[data-hit="false"] { background: linear-gradient(180deg, color-mix(in srgb, var(--a) 50%, #4a4a4a), color-mix(in srgb, var(--a) 25%, #222222)); }
.hb-dsl-col:hover .hb-dsl-bar, .hb-dsl-col[data-on="true"] .hb-dsl-bar { filter: brightness(1.2); }
.hb-dsl-target { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; animation: hb-dsl-wipe 1.1s .3s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dsl-target path { fill: none; stroke: #e6e6e6; stroke-opacity: .8; stroke-width: 1.5; stroke-dasharray: 5 4; vector-effect: non-scaling-stroke; }
.hb-dsl-xl { grid-column: 2; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); padding-top: 10px; color: #6b6b6b; font-size: 11px; text-align: center; }
.hb-dsl-reg { display: flex; flex-direction: column; gap: 16px; margin: 0; padding: 0; list-style: none; }
.hb-dsl-reg li { display: flex; flex-direction: column; gap: 8px; padding: 4px 8px; margin: -4px -8px; border-radius: 8px; transition: background .15s ease; }
.hb-dsl-reg li:hover { background: #151515; }
.hb-dsl-reg-r { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.hb-dsl-reg-n { display: flex; align-items: center; gap: 8px; font-weight: 500; }
.hb-dsl-reg-n span { color: #6b6b6b; font-size: 12px; font-weight: 400; }
.hb-dsl-reg-v { display: flex; align-items: center; gap: 10px; font-variant-numeric: tabular-nums; }
.hb-dsl-reg-m { display: flex; align-items: center; gap: 10px; }
.hb-dsl-reg-m .hb-dsl-reg-b { flex: 1; }
.hb-dsl-reg-b { height: 6px; border-radius: 999px; background: #1b1b1b; overflow: hidden; }
.hb-dsl-reg-b i {
  display: block;
  width: var(--w);
  height: 100%;
  border-radius: 999px;
  background: var(--c);
  transform-origin: left;
  animation: hb-dsl-bar .9s cubic-bezier(.3, .7, .2, 1) both;
}
.hb-dsl-fun { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); }
.hb-dsl-fs { min-width: 0; padding: 0 16px; border-left: 1px solid #1d1d1d; }
.hb-dsl-fs:first-child { padding-left: 0; border-left: 0; }
.hb-dsl-fs:last-child { padding-right: 0; }
.hb-dsl-fs-l { color: #8f8f8f; font-size: 12px; }
.hb-dsl-fs-v { margin: 4px 0 12px; font-size: 20px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
.hb-dsl-fs-b { height: 28px; border-radius: 6px; background: #161616; overflow: hidden; }
.hb-dsl-fs-b i {
  display: block;
  width: var(--w);
  height: 100%;
  border-radius: 6px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--a) 55%, #000000), var(--a));
  opacity: var(--o);
  transform-origin: left;
  animation: hb-dsl-bar 1s cubic-bezier(.3, .7, .2, 1) both;
  animation-delay: calc(var(--i) * 90ms);
}
.hb-dsl-fs-c { margin-top: 8px; color: #8f8f8f; font-size: 11.5px; }
.hb-dsl-fs-c b { color: #ededed; font-weight: 500; }
.hb-dsl-tw { margin: 0 -16px -16px; overflow-x: auto; }
.hb-dsl-tb { width: 100%; min-width: 560px; border-collapse: collapse; }
.hb-dsl-tb th {
  height: 36px;
  padding: 0 16px;
  border-bottom: 1px solid #1d1d1d;
  color: #8f8f8f;
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: .04em;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
}
.hb-dsl-tb th[data-r="true"], .hb-dsl-tb td[data-r="true"] { text-align: right; }
.hb-dsl-th-b {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  color: inherit;
  cursor: pointer;
  transition: color .15s ease;
}
.hb-dsl-th-b:hover { color: #ededed; }
.hb-dsl-th-b .hb-dsl-ico { width: 12px; height: 12px; opacity: 0; }
.hb-dsl-tb th[aria-sort] .hb-dsl-th-b { color: #ededed; }
.hb-dsl-tb th[aria-sort] .hb-dsl-ico { opacity: 1; }
.hb-dsl-tb td { padding: 10px 16px; border-bottom: 1px solid #181818; font-variant-numeric: tabular-nums; vertical-align: middle; }
.hb-dsl-tb tbody tr:last-child td { border-bottom: 0; }
.hb-dsl-tb tbody tr:hover td { background: #151515; }
.hb-dsl-prod { display: flex; align-items: center; gap: 12px; min-width: 0; }
.hb-dsl-prod-i { display: grid; place-items: center; flex: none; width: 32px; height: 32px; border-radius: 8px; color: #ffffff; font-size: 11px; font-weight: 600; }
.hb-dsl-prod strong { display: block; font-weight: 500; white-space: nowrap; }
.hb-dsl-prod div span { color: #6b6b6b; font-size: 12px; }
.hb-dsl-tr { width: 110px; }
.hb-dsl-tr .hb-dsl-spark { height: 28px; color: inherit; }
@keyframes hb-dsl-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@container hb-dsl (max-width: 959px) {
  .hb-dsl-top3 { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .hb-dsl-top3 > :last-child { grid-column: 1 / -1; }
  .hb-dsl-row { grid-template-columns: minmax(0, 1fr); }
}
@container hb-dsl (max-width: 539px) {
  .hb-dsl-top3 { grid-template-columns: minmax(0, 1fr); }
  .hb-dsl-fun { grid-template-columns: minmax(0, 1fr); gap: 16px; }
  .hb-dsl-fs { padding: 0; border-left: 0; }
  .hb-dsl-combo { grid-template-columns: 32px minmax(0, 1fr); }
  .hb-dsl-kpi-v { font-size: 24px; }
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
  bars: ["M18 20V10M12 20V4M6 20v-6"],
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"],
  sliders: ["M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.7 21a2 2 0 0 1-3.4 0"],
  search: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.3-4.3"],
  trend: ["M22 7l-8.5 8.5-5-5L2 17", "M16 7h6v6"],
  dollar: ["M12 1v22", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
  cart: ["M6 6h15l-2 9H8z", "M6 6L5 3H2", "M9 20a1 1 0 1 0 0 .01", "M18 20a1 1 0 1 0 0 .01"],
  box: ["M21 8l-9-5-9 5v8l9 5 9-5z", "M3 8l9 5 9-5M12 13v9"],
  up: ["M12 19V5M5 12l7-7 7 7"],
  down: ["M12 5v14M19 12l-7 7-7-7"],
  chevr: ["M9 6l6 6-6 6"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5M12 15V3"],
  plus: ["M12 5v14M5 12h14"],
};

function Ico({ n }: { n: string }) {
  return (
    <svg className="hb-dsl-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(icons[n] ?? []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function Spark({ values, id }: { values: number[]; id: string }) {
  const line = smooth(project(values, 100, 32, 3));
  return (
    <svg className="hb-dsl-spark" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".26" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line}L100 32L0 32Z`} fill={`url(#${id})`} />
      <path className="hb-dsl-spark-l" d={line} />
    </svg>
  );
}

function Delta({ value, good = true, suffix = "%" }: { value: number; good?: boolean; suffix?: string }) {
  const up = value >= 0;
  const t = value === 0 ? "flat" : up === good ? "up" : "down";
  return (
    <span className="hb-dsl-pill" data-t={t}>
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
    <div className="hb-dsl-app">
      <aside className="hb-dsl-side">
        <div className="hb-dsl-brand">
          <span className="hb-dsl-mark" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18L10 6l4 8 2-4 4 8" />
            </svg>
          </span>
          <span>{brand}</span>
        </div>
        <nav aria-label="Main">
          <ul className="hb-dsl-nav">
            {nav.map((item) => (
              <React.Fragment key={item.id}>
                {item.section ? (
                  <li className="hb-dsl-nav-label" aria-hidden="true">
                    {item.section}
                  </li>
                ) : null}
                <li>
                  <button type="button" className="hb-dsl-link" aria-current={active === item.id ? "page" : undefined} aria-label={item.label} onClick={() => setActive(item.id)}>
                    <Ico n={item.icon} />
                    <span className="hb-dsl-link-t">{item.label}</span>
                    {item.count ? <span className="hb-dsl-link-n">{item.count}</span> : null}
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </nav>
        {foot ? <div className="hb-dsl-side-foot">{foot}</div> : null}
      </aside>
      <div className="hb-dsl-main">
        <header className="hb-dsl-top">
          <div className="hb-dsl-crumb">
            {crumb[0]} / <strong>{crumb[1]}</strong>
          </div>
          <label className="hb-dsl-search">
            <Ico n="search" />
            <input type="search" placeholder={placeholder} aria-label={placeholder} />
            <span className="hb-dsl-kbd">/</span>
          </label>
          <button type="button" className="hb-dsl-iconbtn" aria-label="Notifications">
            <Ico n="bell" />
            <span className="hb-dsl-dot" />
          </button>
          <span className="hb-dsl-av" style={{ background: tone(user), width: 34, height: 34 }} title={user}>
            {initials(user)}
          </span>
        </header>
        <div className="hb-dsl-content">{children}</div>
      </div>
    </div>
  );
}

const PERIODS: SalesPeriod[] = ["H1", "H2", "FY"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const REVENUE = [212, 238, 261, 254, 289, 322, 310, 348, 371, 392, 428, 471];
const TARGET = [240, 260, 280, 295, 310, 330, 345, 360, 380, 400, 420, 440];
const AOV = [82, 84, 83, 86, 85, 88, 87, 89, 91, 90, 93, 96];
const PREV = REVENUE.map((v, i) => v * (0.76 + hash(i + 70) * 0.1));
const RANGE: Record<SalesPeriod, [number, number]> = { H1: [0, 6], H2: [6, 12], FY: [0, 12] };

const REGIONS = [
  { name: "North America", detail: "US, Canada", share: 38.2, delta: 11.4 },
  { name: "Europe", detail: "EU, UK", share: 27.6, delta: 7.9 },
  { name: "Asia Pacific", detail: "JP, AU, SG", share: 20.8, delta: 16.2 },
  { name: "Latin America", detail: "BR, MX, CL", share: 9.4, delta: 4.3 },
  { name: "Middle East & Africa", detail: "AE, ZA", share: 4.0, delta: -2.1 },
];

const PRODUCTS = [
  { name: "Aero Desk Lamp", cat: "Lighting", units: 4820, price: 64, growth: 18.4 },
  { name: "Fieldnote Journal", cat: "Stationery", units: 9310, price: 24, growth: 9.2 },
  { name: "Halo Wireless Charger", cat: "Electronics", units: 3660, price: 49, growth: -4.1 },
  { name: "Ridge Travel Mug", cat: "Drinkware", units: 6140, price: 32, growth: 22.7 },
  { name: "Tern Laptop Sleeve", cat: "Accessories", units: 2890, price: 58, growth: 6.5 },
  { name: "Drift Desk Mat", cat: "Workspace", units: 3310, price: 39, growth: -1.3 },
].map((p, i) => ({
  ...p,
  trend: Array.from({ length: 8 }, (_, k) => 50 + k * p.growth * 0.5 + hash(i * 11 + k) * 16),
}));

const NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: "grid", section: "Sales" },
  { id: "orders", label: "Orders", icon: "cart", count: "128" },
  { id: "products", label: "Products", icon: "box" },
  { id: "customers", label: "Customers", icon: "users" },
  { id: "reports", label: "Reports", icon: "bars", section: "Insights" },
  { id: "forecast", label: "Forecast", icon: "trend" },
  { id: "settings", label: "Settings", icon: "sliders", section: "Workspace" },
];

type SortKey = "units" | "revenue" | "growth";

function sum(a: number[]) {
  return a.reduce((t, v) => t + v, 0);
}

function pct(cur: number, prev: number) {
  return ((cur - prev) / prev) * 100;
}

function money(k: number, c: string) {
  return k >= 1000 ? `${c}${(k / 1000).toFixed(2)}M` : `${c}${Math.round(k)}K`;
}

function count(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

function short(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}K` : String(Math.round(n));
}

export function SalesDashboard({
  accent = "#2f7bff",
  brand = "Ledgerly",
  user = "Priya Nair",
  currency = "$",
  period,
  defaultPeriod = "FY",
  onPeriodChange,
  className = "",
  style,
  ...rest
}: SalesDashboardProps) {
  const uid = React.useId().replace(/:/g, "");
  const [inner, setInner] = React.useState<SalesPeriod>(defaultPeriod);
  const [hover, setHover] = React.useState<number | null>(null);
  const [sort, setSort] = React.useState<{ key: SortKey; dir: 1 | -1 }>({ key: "revenue", dir: -1 });
  const current = period ?? inner;
  const [from, to] = RANGE[current];
  const months = MONTHS.slice(from, to);
  const rev = REVENUE.slice(from, to);
  const tgt = TARGET.slice(from, to);
  const ords = rev.map((v, i) => (v * 1000) / AOV[from + i]);
  const prevOrds = PREV.slice(from, to).map((v, i) => (v * 1000) / (AOV[from + i] - 4));
  const totalRev = sum(rev);
  const totalTgt = sum(tgt);
  const totalOrders = sum(ords);
  const progress = (totalRev / totalTgt) * 100;
  const n = rev.length;
  const top = Math.ceil(Math.max(...rev, ...tgt) / 100) * 100;
  const ticks = top / 100;
  const factor = totalRev / sum(REVENUE);

  const pick = (p: SalesPeriod) => {
    setInner(p);
    setHover(null);
    onPeriodChange?.(p);
  };

  const targetLine = smooth(tgt.map((v, i): Pt => [((i + 0.5) / n) * 100, (1 - v / top) * 100]));

  const orders = Math.round(totalOrders);
  const stages = [
    { label: "Store visits", value: orders / 0.0499 },
    { label: "Product views", value: orders / 0.0499 / 2.2 },
    { label: "Added to cart", value: orders / 0.66 / 0.59 },
    { label: "Checkout started", value: orders / 0.66 },
    { label: "Purchased", value: orders },
  ];

  const rows = PRODUCTS.map((p) => ({ ...p, units: p.units * factor, revenue: p.units * factor * p.price }));
  rows.sort((a, b) => (a[sort.key] - b[sort.key]) * sort.dir);

  const toggleSort = (key: SortKey) => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: -1 }));
  const th = (key: SortKey, label: string) => (
    <th data-r="true" aria-sort={sort.key === key ? (sort.dir === 1 ? "ascending" : "descending") : undefined}>
      <button type="button" className="hb-dsl-th-b" onClick={() => toggleSort(key)}>
        {label}
        <Ico n={sort.key === key && sort.dir === 1 ? "up" : "down"} />
      </button>
    </th>
  );

  const hp = hover === null ? null : ((hover + 0.5) / n) * 100;
  const vars = { "--a": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-dsl ${className}`} style={vars} {...rest}>
      <style href="hb-sales-dashboard" precedence="default">
        {css}
      </style>
      <Shell
        brand={brand}
        nav={NAV}
        defaultActive="overview"
        crumb={["Sales", "Overview"]}
        placeholder="Search orders, products"
        user={user}
        foot={
          <div className="hb-dsl-status">
            <i />
            <div>
              <strong>Store is live</strong>
              <span>Synced 2 min ago</span>
            </div>
          </div>
        }
      >
        <div className="hb-dsl-head">
          <div>
            <h2 className="hb-dsl-title">Revenue overview</h2>
            <p className="hb-dsl-sub">Fiscal year 2025 · all channels</p>
          </div>
          <div className="hb-dsl-tools">
            <div className="hb-dsl-seg" role="group" aria-label="Period">
              {PERIODS.map((p) => (
                <button key={p} type="button" aria-pressed={current === p} onClick={() => pick(p)}>
                  {p}
                </button>
              ))}
            </div>
            <button type="button" className="hb-dsl-btn">
              <Ico n="download" />
              Export
            </button>
            <button type="button" className="hb-dsl-btn" data-p="true">
              <Ico n="plus" />
              New report
            </button>
          </div>
        </div>

        <div className="hb-dsl-top3">
          <div className="hb-dsl-card hb-dsl-kpi" style={{ "--k": "var(--a)", "--d": 0 } as React.CSSProperties}>
            <div className="hb-dsl-kpi-top">
              <span className="hb-dsl-kpi-l">
                <span className="hb-dsl-kpi-i">
                  <Ico n="dollar" />
                </span>
                Total revenue
              </span>
              <Delta value={pct(totalRev, sum(PREV.slice(from, to)))} />
            </div>
            <p className="hb-dsl-kpi-v">{money(totalRev, currency)}</p>
            <Spark key={`r${current}`} values={rev} id={`${uid}r`} />
          </div>
          <div className="hb-dsl-card hb-dsl-kpi" style={{ "--k": "#a78bfa", "--d": 1 } as React.CSSProperties}>
            <div className="hb-dsl-kpi-top">
              <span className="hb-dsl-kpi-l">
                <span className="hb-dsl-kpi-i">
                  <Ico n="cart" />
                </span>
                Orders
              </span>
              <Delta value={pct(totalOrders, sum(prevOrds))} />
            </div>
            <p className="hb-dsl-kpi-v">{count(orders)}</p>
            <Spark key={`o${current}`} values={ords} id={`${uid}o`} />
          </div>
          <div className="hb-dsl-card" style={{ "--d": 2 } as React.CSSProperties}>
            <div className="hb-dsl-card-h" style={{ marginBottom: 12 }}>
              <h3 className="hb-dsl-card-t">Goal progress</h3>
              <span className="hb-dsl-pill" data-t={progress >= 100 ? "up" : "flat"}>
                {progress >= 100 ? "Goal reached" : "On track"}
              </span>
            </div>
            <div className="hb-dsl-ringc">
              <div className="hb-dsl-ring">
                <svg viewBox="0 0 42 42" role="img" aria-label={`${progress.toFixed(0)} percent of target`}>
                  <circle className="hb-dsl-ring-t" cx="21" cy="21" r="15.9155" />
                  <circle
                    key={current}
                    className="hb-dsl-ring-p"
                    cx="21"
                    cy="21"
                    r="15.9155"
                    pathLength={100}
                    style={{ strokeDasharray: `${Math.min(progress, 100).toFixed(2)} 100` }}
                  />
                </svg>
                <span className="hb-dsl-ring-v">{progress.toFixed(0)}%</span>
              </div>
              <div className="hb-dsl-ringc-x">
                <p>
                  <b>{money(totalRev, currency)}</b> of {money(totalTgt, currency)} target
                </p>
                <p>{progress >= 100 ? `${money(totalRev - totalTgt, currency)} above plan` : `${money(totalTgt - totalRev, currency)} to go`}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hb-dsl-row">
          <div className="hb-dsl-card" style={{ "--d": 3 } as React.CSSProperties}>
            <div className="hb-dsl-card-h">
              <div>
                <h3 className="hb-dsl-card-t">Revenue vs target</h3>
                <p className="hb-dsl-card-s">Monthly, in thousands</p>
              </div>
              <div className="hb-dsl-legend-k">
                <span>
                  <i />
                  Revenue
                </span>
                <span>
                  <i data-line="true" />
                  Target
                </span>
              </div>
            </div>
            <div className="hb-dsl-combo" style={{ "--n": n } as React.CSSProperties}>
              <div className="hb-dsl-yl" aria-hidden="true">
                {Array.from({ length: ticks + 1 }, (_, k) => (
                  <span key={k} style={{ bottom: `${((k / ticks) * 100).toFixed(2)}%` }}>
                    {k === 0 ? "0" : `${currency}${k * 100}K`}
                  </span>
                ))}
              </div>
              <div className="hb-dsl-plot" onPointerLeave={() => setHover(null)}>
                {Array.from({ length: ticks + 1 }, (_, k) => (
                  <div key={k} className="hb-dsl-gl" style={{ bottom: `${((k / ticks) * 100).toFixed(2)}%` }} />
                ))}
                <div className="hb-dsl-cols" key={current}>
                  {rev.map((v, i) => (
                    <button
                      key={months[i]}
                      type="button"
                      className="hb-dsl-col"
                      data-on={hover === i}
                      aria-label={`${months[i]}: revenue ${currency}${v}K, target ${currency}${tgt[i]}K`}
                      onPointerEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                    >
                      <span className="hb-dsl-bar" data-hit={v >= tgt[i]} style={{ height: `${((v / top) * 100).toFixed(2)}%`, "--i": i } as React.CSSProperties} />
                    </button>
                  ))}
                </div>
                <svg className="hb-dsl-target" key={`t${current}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path d={targetLine} />
                </svg>
                {hover !== null && hp !== null ? (
                  <div className="hb-dsl-tt" style={{ top: 4, left: `${hp.toFixed(2)}%`, transform: hp > 62 ? "translateX(calc(-100% - 22px))" : "translateX(22px)" }}>
                    <div className="hb-dsl-tt-d">{months[hover]} 2025</div>
                    <div>
                      Revenue <b>{currency}{rev[hover]}K</b>
                    </div>
                    <div>
                      Target <b>{currency}{tgt[hover]}K</b>
                    </div>
                    <div>
                      <Delta value={pct(rev[hover], tgt[hover])} />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="hb-dsl-xl" aria-hidden="true">
                {months.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="hb-dsl-card" style={{ "--d": 4 } as React.CSSProperties}>
            <div className="hb-dsl-card-h">
              <div>
                <h3 className="hb-dsl-card-t">Sales by region</h3>
                <p className="hb-dsl-card-s">Share of revenue</p>
              </div>
            </div>
            <ul className="hb-dsl-reg">
              {REGIONS.map((r, i) => (
                <li key={r.name}>
                  <div className="hb-dsl-reg-r">
                    <span className="hb-dsl-reg-n" title={r.detail}>
                      {r.name}
                    </span>
                    <span className="hb-dsl-reg-v">{money((totalRev * r.share) / 100, currency)}</span>
                  </div>
                  <div className="hb-dsl-reg-m">
                    <div className="hb-dsl-reg-b">
                    <i
                      key={current}
                      style={{
                        "--w": `${((r.share / REGIONS[0].share) * 100).toFixed(1)}%`,
                        "--c": `color-mix(in srgb, var(--a) ${100 - i * 16}%, #2a2a2a)`,
                        animationDelay: `${i * 80}ms`,
                      } as React.CSSProperties}
                    />
                    </div>
                    <Delta value={r.delta} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hb-dsl-card" style={{ "--d": 5 } as React.CSSProperties}>
          <div className="hb-dsl-card-h">
            <div>
              <h3 className="hb-dsl-card-t">Conversion funnel</h3>
              <p className="hb-dsl-card-s">From first visit to paid order</p>
            </div>
            <span className="hb-dsl-pill" data-t="up">
              {((stages[4].value / stages[0].value) * 100).toFixed(2)}% overall
            </span>
          </div>
          <div className="hb-dsl-fun" key={current}>
            {stages.map((s, i) => (
              <div className="hb-dsl-fs" key={s.label}>
                <div className="hb-dsl-fs-l">{s.label}</div>
                <div className="hb-dsl-fs-v">{short(s.value)}</div>
                <div className="hb-dsl-fs-b">
                  <i style={{ "--w": `${((s.value / stages[0].value) * 100).toFixed(1)}%`, "--o": (1 - i * 0.12).toFixed(2), "--i": i } as React.CSSProperties} />
                </div>
                <div className="hb-dsl-fs-c">{i === 0 ? "Entry point" : <><b>{((s.value / stages[i - 1].value) * 100).toFixed(1)}%</b> of previous</>}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hb-dsl-card" style={{ "--d": 6 } as React.CSSProperties}>
          <div className="hb-dsl-card-h">
            <div>
              <h3 className="hb-dsl-card-t">Top products</h3>
              <p className="hb-dsl-card-s">Click a column to sort</p>
            </div>
            <button type="button" className="hb-dsl-btn">
              View catalog
              <Ico n="chevr" />
            </button>
          </div>
          <div className="hb-dsl-tw">
            <table className="hb-dsl-tb">
              <thead>
                <tr>
                  <th>Product</th>
                  {th("units", "Units")}
                  {th("revenue", "Revenue")}
                  {th("growth", "Growth")}
                  <th className="hb-dsl-tr">Trend</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p, i) => (
                  <tr key={p.name}>
                    <td>
                      <div className="hb-dsl-prod">
                        <span className="hb-dsl-prod-i" style={{ background: tone(p.name) }}>
                          {initials(p.name)}
                        </span>
                        <div>
                          <strong>{p.name}</strong>
                          <span>{p.cat}</span>
                        </div>
                      </div>
                    </td>
                    <td data-r="true">{count(p.units)}</td>
                    <td data-r="true">{money(p.revenue / 1000, currency)}</td>
                    <td data-r="true">
                      <Delta value={p.growth} />
                    </td>
                    <td className="hb-dsl-tr">
                      <div style={{ color: p.growth >= 0 ? "#4ade80" : "#f87171" }}>
                        <Spark values={p.trend} id={`${uid}p${i}`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Shell>
    </div>
  );
}
