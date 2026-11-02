"use client";

import * as React from "react";

export type ProjectSprint = "current" | "previous";

export interface ProjectDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  brand?: string;
  user?: string;
  sprint?: ProjectSprint;
  defaultSprint?: ProjectSprint;
  onSprintChange?: (sprint: ProjectSprint) => void;
}

const css = `
.hb-dpr {
  --a: #2f7bff;
  container: hb-dpr / inline-size;
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
.hb-dpr *, .hb-dpr *::before, .hb-dpr *::after { box-sizing: border-box; }
.hb-dpr button, .hb-dpr input, .hb-dpr select { font: inherit; color: inherit; }
.hb-dpr button:focus-visible, .hb-dpr input:focus-visible, .hb-dpr select:focus-visible, .hb-dpr [tabindex]:focus-visible {
  outline: 2px solid var(--a);
  outline-offset: 2px;
}
.hb-dpr-app { display: grid; grid-template-columns: 220px minmax(0, 1fr); min-height: 640px; }
.hb-dpr-side {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: 20px 12px 16px;
  border-right: 1px solid #1f1f1f;
  background: #0d0d0d;
}
.hb-dpr-brand { display: flex; align-items: center; gap: 10px; padding: 0 8px; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-dpr-mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--a), color-mix(in srgb, var(--a) 45%, #ffffff));
  color: #ffffff;
}
.hb-dpr-nav { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-dpr-nav-label { padding: 12px 8px 6px; color: #6b6b6b; font-size: 11px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
.hb-dpr-link {
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
.hb-dpr-link:hover { background: #161616; color: #ededed; }
.hb-dpr-link[aria-current="page"] { background: #1b1b1b; color: #ffffff; }
.hb-dpr-link[aria-current="page"] .hb-dpr-ico { color: var(--a); }
.hb-dpr-link-n {
  margin-left: auto;
  padding: 1px 7px;
  border-radius: 999px;
  background: #1f1f1f;
  color: #a1a1a1;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.hb-dpr-side-foot { margin-top: auto; }
.hb-dpr-main { display: flex; flex-direction: column; min-width: 0; }
.hb-dpr-top { display: flex; align-items: center; gap: 12px; height: 60px; padding: 0 24px; border-bottom: 1px solid #1f1f1f; }
.hb-dpr-crumb { min-width: 0; overflow: hidden; color: #8f8f8f; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.hb-dpr-crumb strong { color: #ededed; font-weight: 500; }
.hb-dpr-search { position: relative; width: 260px; margin-left: auto; color: #6b6b6b; }
.hb-dpr-search .hb-dpr-ico { position: absolute; top: 50%; left: 10px; width: 15px; height: 15px; transform: translateY(-50%); pointer-events: none; }
.hb-dpr-search input {
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
.hb-dpr-search input::placeholder { color: #6b6b6b; }
.hb-dpr-search input:hover { border-color: #333333; }
.hb-dpr-search input:focus-visible { border-color: var(--a); outline-offset: 0; }
.hb-dpr-kbd {
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
.hb-dpr-iconbtn {
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
.hb-dpr-iconbtn:hover { border-color: #333333; background: #171717; color: #ededed; }
.hb-dpr-dot { position: absolute; top: 8px; right: 9px; width: 7px; height: 7px; border: 2px solid #111111; border-radius: 50%; background: var(--a); box-sizing: content-box; margin: -2px; }
.hb-dpr-av {
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
.hb-dpr-content { display: flex; flex-direction: column; gap: 20px; min-width: 0; padding: 24px; }
.hb-dpr-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; }
.hb-dpr-title { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -.02em; line-height: 1.2; }
.hb-dpr-sub { margin: 4px 0 0; color: #8f8f8f; font-size: 13px; }
.hb-dpr-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.hb-dpr-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid #232323;
  border-radius: 12px;
  background: #111111;
  animation: hb-dpr-rise .55s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: calc(var(--d, 0) * 60ms);
}
.hb-dpr-card-h { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.hb-dpr-card-t { margin: 0; font-size: 13px; font-weight: 600; letter-spacing: -.005em; }
.hb-dpr-card-s { margin: 2px 0 0; color: #8f8f8f; font-size: 12px; }
.hb-dpr-seg { display: inline-flex; padding: 2px; border: 1px solid #262626; border-radius: 8px; background: #0d0d0d; }
.hb-dpr-seg button {
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
.hb-dpr-seg button:hover { color: #ededed; }
.hb-dpr-seg button[aria-pressed="true"] { background: #232323; color: #ffffff; }
.hb-dpr-btn {
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
.hb-dpr-btn:hover { border-color: #3a3a3a; background: #1c1c1c; }
.hb-dpr-btn:active { transform: translateY(1px); }
.hb-dpr-btn[data-p="true"] { border-color: var(--a); background: var(--a); color: #ffffff; }
.hb-dpr-btn[data-p="true"]:hover { background: color-mix(in srgb, var(--a) 85%, #ffffff); }
.hb-dpr-btn .hb-dpr-ico { width: 14px; height: 14px; }
.hb-dpr-ico { display: block; flex: none; width: 16px; height: 16px; }
.hb-dpr-pill {
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
.hb-dpr-pill .hb-dpr-ico { width: 11px; height: 11px; stroke-width: 2.4; }
.hb-dpr-pill[data-t="up"] { background: rgba(74, 222, 128, .12); color: #4ade80; }
.hb-dpr-pill[data-t="down"] { background: rgba(248, 113, 113, .12); color: #f87171; }
.hb-dpr-pill[data-t="flat"] { background: #1f1f1f; color: #a1a1a1; }
.hb-dpr-spark { display: block; width: 100%; height: 36px; color: var(--a); animation: hb-dpr-wipe .9s .15s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dpr-spark-l { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.hb-dpr-tt {
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
.hb-dpr-tt b { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-dpr-tt-d { color: #8f8f8f; font-size: 11px; }
@keyframes hb-dpr-rise { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-dpr-wipe { from { clip-path: inset(-6px 100% -6px -6px); } to { clip-path: inset(-6px -6px -6px -6px); } }
@keyframes hb-dpr-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-dpr-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-dpr-pulse { 0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, .55); } 100% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); } }
@keyframes hb-dpr-arc { from { stroke-dasharray: 0 100; } }
@container hb-dpr (max-width: 759px) {
  .hb-dpr-app { grid-template-columns: minmax(0, 1fr); min-height: 0; }
  .hb-dpr-side { flex-direction: row; align-items: center; gap: 8px; padding: 10px 12px; border-right: 0; border-bottom: 1px solid #1f1f1f; overflow-x: auto; }
  .hb-dpr-brand { padding: 0; }
  .hb-dpr-brand span:last-child, .hb-dpr-nav-label, .hb-dpr-link-t, .hb-dpr-link-n, .hb-dpr-side-foot, .hb-dpr-kbd { display: none; }
  .hb-dpr-nav { flex-direction: row; flex: 1; gap: 4px; }
  .hb-dpr-link { justify-content: center; width: 36px; padding: 0; }
  .hb-dpr-top { gap: 8px; padding: 0 16px; }
  .hb-dpr-crumb { display: none; }
  .hb-dpr-search { flex: 1; width: auto; margin-left: 0; }
  .hb-dpr-content { gap: 16px; padding: 16px; }
  .hb-dpr-title { font-size: 19px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-dpr *, .hb-dpr *::before, .hb-dpr *::after { animation: none !important; transition: none !important; }
}
.hb-dpr-proj { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid #232323; border-radius: 10px; background: #111111; }
.hb-dpr-proj b { display: grid; place-items: center; flex: none; width: 28px; height: 28px; border-radius: 8px; background: color-mix(in srgb, var(--a) 18%, transparent); color: var(--a); font-size: 10.5px; font-weight: 600; letter-spacing: .02em; }
.hb-dpr-proj strong { display: block; font-size: 12.5px; font-weight: 500; }
.hb-dpr-proj span { color: #8f8f8f; font-size: 11.5px; }
.hb-dpr-prog { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 28px; }
.hb-dpr-prog-p { margin: 0; font-size: 36px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.04em; line-height: 1; }
.hb-dpr-prog-l { margin-top: 6px; color: #8f8f8f; font-size: 12px; white-space: nowrap; }
.hb-dpr-prog-bar { position: relative; height: 10px; border-radius: 999px; background: #1b1b1b; }
.hb-dpr-prog-bar i {
  display: block;
  width: var(--w);
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--a) 55%, #000000), var(--a));
  box-shadow: 0 0 14px -2px color-mix(in srgb, var(--a) 70%, transparent);
  transform-origin: left;
  animation: hb-dpr-bar 1s cubic-bezier(.3, .7, .2, 1) both;
}
.hb-dpr-prog-bar b { position: absolute; top: -4px; bottom: -4px; left: var(--ideal); width: 2px; margin-left: -1px; border-radius: 1px; background: #ededed; }
.hb-dpr-prog-m { display: flex; justify-content: space-between; gap: 12px; margin-top: 10px; color: #8f8f8f; font-size: 12px; }
.hb-dpr-prog-r { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.hb-dpr-faces { display: flex; }
.hb-dpr-faces .hb-dpr-av { width: 30px; height: 30px; margin-left: -8px; border: 2px solid #111111; }
.hb-dpr-faces .hb-dpr-av:first-child { margin-left: 0; }
.hb-dpr-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 22px;
  padding: 0 8px;
  border-radius: 6px;
  background: #1c1c1c;
  color: #cfcfcf;
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
}
.hb-dpr-chip .hb-dpr-ico { width: 12px; height: 12px; }
.hb-dpr-chip[data-t="amber"] { background: rgba(251, 191, 36, .12); color: #fbbf24; }
.hb-dpr-chip[data-t="blue"] { background: color-mix(in srgb, var(--a) 16%, transparent); color: color-mix(in srgb, var(--a) 60%, #ffffff); }
.hb-dpr-chip[data-t="red"] { background: rgba(248, 113, 113, .12); color: #f87171; }
.hb-dpr-chip[data-t="green"] { background: rgba(74, 222, 128, .12); color: #4ade80; }
.hb-dpr-tiles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.hb-dpr-tile { display: flex; flex-direction: column; gap: 12px; }
.hb-dpr-tile-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: #8f8f8f; font-size: 12px; }
.hb-dpr-tile-top span { display: flex; align-items: center; gap: 8px; }
.hb-dpr-tile-top i { width: 8px; height: 8px; border-radius: 50%; background: var(--k); box-shadow: 0 0 10px -1px var(--k); }
.hb-dpr-tile-v { margin: 0; font-size: 28px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; line-height: 1; }
.hb-dpr-tile-v small { margin-left: 6px; color: #6b6b6b; font-size: 12px; font-weight: 400; letter-spacing: 0; }
.hb-dpr-tile-b { height: 4px; border-radius: 999px; background: #1b1b1b; overflow: hidden; }
.hb-dpr-tile-b i { display: block; width: var(--w); height: 100%; border-radius: 999px; background: var(--k); transform-origin: left; animation: hb-dpr-bar .9s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dpr-row { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); gap: 16px; }
.hb-dpr-legend-k { display: flex; align-items: center; gap: 14px; color: #8f8f8f; font-size: 12px; }
.hb-dpr-legend-k span { display: inline-flex; align-items: center; gap: 6px; }
.hb-dpr-legend-k i { width: 10px; height: 3px; border-radius: 2px; background: var(--a); }
.hb-dpr-legend-k i[data-prev="true"] { background: repeating-linear-gradient(90deg, #6b6b6b 0 3px, transparent 3px 6px); }
.hb-dpr-chart { display: grid; grid-template-columns: 30px minmax(0, 1fr); grid-template-rows: 230px auto; column-gap: 8px; }
.hb-dpr-yl { position: relative; }
.hb-dpr-yl span { position: absolute; right: 0; color: #6b6b6b; font-size: 11px; font-variant-numeric: tabular-nums; transform: translateY(50%); }
.hb-dpr-plot { position: relative; cursor: crosshair; touch-action: pan-y; }
.hb-dpr-plot svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; animation: hb-dpr-wipe 1.1s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dpr-gl { stroke: #1d1d1d; stroke-width: 1; vector-effect: non-scaling-stroke; }
.hb-dpr-line { fill: none; stroke: var(--a); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.hb-dpr-prev { fill: none; stroke: #5a5a5a; stroke-width: 1.5; stroke-dasharray: 4 4; vector-effect: non-scaling-stroke; }
.hb-dpr-today { position: absolute; top: 0; bottom: 0; border-left: 1px dashed #4a4a4a; pointer-events: none; }
.hb-dpr-today span { position: absolute; top: -2px; left: 6px; padding: 1px 6px; border-radius: 5px; background: #1b1b1b; color: #a1a1a1; font-size: 10.5px; }
.hb-dpr-hl { position: absolute; top: 0; bottom: 0; width: 1px; background: #3a3a3a; pointer-events: none; }
.hb-dpr-hd { position: absolute; width: 12px; height: 12px; margin: -6px 0 0 -6px; border: 2px solid var(--a); border-radius: 50%; background: #0a0a0a; pointer-events: none; }
.hb-dpr-xl { grid-column: 2; display: flex; justify-content: space-between; padding-top: 10px; color: #6b6b6b; font-size: 11px; }
.hb-dpr-work { display: flex; flex-direction: column; gap: 16px; margin: 0; padding: 0; list-style: none; }
.hb-dpr-work li { display: grid; grid-template-columns: 30px minmax(0, 1fr) auto; align-items: center; gap: 12px; }
.hb-dpr-work-n { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; font-size: 12.5px; font-weight: 500; }
.hb-dpr-work-n span { color: #8f8f8f; font-weight: 400; font-variant-numeric: tabular-nums; }
.hb-dpr-work-b { height: 6px; border-radius: 999px; background: #1b1b1b; overflow: hidden; }
.hb-dpr-work-b i { display: block; width: var(--w); height: 100%; border-radius: 999px; background: var(--c); transform-origin: left; animation: hb-dpr-bar .9s cubic-bezier(.3, .7, .2, 1) both; animation-delay: calc(var(--i) * 70ms); }
.hb-dpr-board { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.hb-dpr-colm { display: flex; flex-direction: column; gap: 8px; min-width: 0; padding: 8px; border: 1px solid #1d1d1d; border-radius: 10px; background: #0d0d0d; }
.hb-dpr-colm-h { display: flex; align-items: center; justify-content: space-between; padding: 2px 4px 6px; font-size: 12.5px; font-weight: 500; }
.hb-dpr-colm-h span { display: flex; align-items: center; gap: 8px; }
.hb-dpr-colm-h i { width: 8px; height: 8px; border-radius: 50%; background: var(--k); }
.hb-dpr-colm-h em { padding: 1px 8px; border-radius: 999px; background: #1b1b1b; color: #a1a1a1; font-size: 11px; font-style: normal; font-variant-numeric: tabular-nums; }
.hb-dpr-task { display: flex; flex-direction: column; gap: 10px; padding: 10px 12px; border: 1px solid #232323; border-radius: 8px; background: #141414; transition: border-color .15s ease, transform .15s ease; }
.hb-dpr-task:hover { border-color: #3a3a3a; transform: translate3d(0, -1px, 0); }
.hb-dpr-task p { margin: 0; font-size: 12.5px; font-weight: 500; line-height: 1.4; }
.hb-dpr-task-f { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.hb-dpr-tag { padding: 1px 7px; border-radius: 5px; background: color-mix(in srgb, var(--c) 15%, transparent); color: var(--c); font-size: 11px; font-weight: 500; }
.hb-dpr-pts { display: inline-flex; align-items: center; gap: 6px; color: #8f8f8f; font-size: 11.5px; font-variant-numeric: tabular-nums; }
.hb-dpr-pts .hb-dpr-av { width: 20px; height: 20px; font-size: 8.5px; }
.hb-dpr-due { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 0; padding: 0; list-style: none; }
.hb-dpr-dl {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  height: 100%;
  padding: 12px;
  border: 1px solid #232323;
  border-radius: 10px;
  background: #141414;
  text-align: left;
  cursor: pointer;
  transition: border-color .15s ease, opacity .2s ease;
}
.hb-dpr-dl:hover { border-color: #3a3a3a; }
.hb-dpr-dl-d { display: flex; flex: none; flex-direction: column; align-items: center; justify-content: center; width: 40px; height: 46px; border-radius: 8px; background: #1b1b1b; }
.hb-dpr-dl-d small { color: #8f8f8f; font-size: 10px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
.hb-dpr-dl-d b { font-size: 17px; font-weight: 600; line-height: 1.1; }
.hb-dpr-dl-x { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; min-width: 0; }
.hb-dpr-dl-x strong { font-size: 12.5px; font-weight: 500; line-height: 1.35; }
.hb-dpr-dl-x span { color: #8f8f8f; font-size: 11.5px; }
.hb-dpr-dl[aria-pressed="true"] { opacity: .5; }
.hb-dpr-dl[aria-pressed="true"] strong { text-decoration: line-through; }
.hb-dpr-dl-k { margin-left: auto; display: grid; place-items: center; flex: none; width: 18px; height: 18px; border: 1.5px solid #3a3a3a; border-radius: 50%; color: transparent; transition: background .15s ease, border-color .15s ease, color .15s ease; }
.hb-dpr-dl-k .hb-dpr-ico { width: 11px; height: 11px; stroke-width: 3; }
.hb-dpr-dl[aria-pressed="true"] .hb-dpr-dl-k { border-color: #4ade80; background: #4ade80; color: #0a0a0a; }
@keyframes hb-dpr-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@container hb-dpr (max-width: 959px) {
  .hb-dpr-tiles, .hb-dpr-board, .hb-dpr-due { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-dpr-row { grid-template-columns: minmax(0, 1fr); }
  .hb-dpr-prog { grid-template-columns: minmax(0, 1fr); gap: 16px; }
  .hb-dpr-prog-r { align-items: flex-start; flex-direction: row; flex-wrap: wrap; }
}
@container hb-dpr (max-width: 539px) {
  .hb-dpr-board, .hb-dpr-due { grid-template-columns: minmax(0, 1fr); }
  .hb-dpr-tile-v { font-size: 24px; }
}
`;

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
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.7 21a2 2 0 0 1-3.4 0"],
  search: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.3-4.3"],
  check: ["M5 12.5l4.5 4.5L19 7.5"],
  board: ["M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v13h-4z"],
  up: ["M12 19V5M5 12l7-7 7 7"],
  down: ["M12 5v14M19 12l-7 7-7-7"],
  chevr: ["M9 6l6 6-6 6"],
  clock: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M12 7v5l3 2"],
  plus: ["M12 5v14M5 12h14"],
  flag: ["M4 22V4", "M4 4h13l-2 4 2 4H4"],
  stack: ["M12 2l10 5-10 5L2 7z", "M2 12l10 5 10-5", "M2 17l10 5 10-5"],
  repeat: ["M17 2l4 4-4 4", "M3 11V9a3 3 0 0 1 3-3h15", "M7 22l-4-4 4-4", "M21 13v2a3 3 0 0 1-3 3H3"],
};

function Ico({ n }: { n: string }) {
  return (
    <svg className="hb-dpr-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(icons[n] ?? []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function Delta({ value, good = true, suffix = "%" }: { value: number; good?: boolean; suffix?: string }) {
  const up = value >= 0;
  const t = value === 0 ? "flat" : up === good ? "up" : "down";
  return (
    <span className="hb-dpr-pill" data-t={t}>
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
    <div className="hb-dpr-app">
      <aside className="hb-dpr-side">
        <div className="hb-dpr-brand">
          <span className="hb-dpr-mark" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18L10 6l4 8 2-4 4 8" />
            </svg>
          </span>
          <span>{brand}</span>
        </div>
        <nav aria-label="Main">
          <ul className="hb-dpr-nav">
            {nav.map((item) => (
              <React.Fragment key={item.id}>
                {item.section ? (
                  <li className="hb-dpr-nav-label" aria-hidden="true">
                    {item.section}
                  </li>
                ) : null}
                <li>
                  <button type="button" className="hb-dpr-link" aria-current={active === item.id ? "page" : undefined} aria-label={item.label} onClick={() => setActive(item.id)}>
                    <Ico n={item.icon} />
                    <span className="hb-dpr-link-t">{item.label}</span>
                    {item.count ? <span className="hb-dpr-link-n">{item.count}</span> : null}
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </nav>
        {foot ? <div className="hb-dpr-side-foot">{foot}</div> : null}
      </aside>
      <div className="hb-dpr-main">
        <header className="hb-dpr-top">
          <div className="hb-dpr-crumb">
            {crumb[0]} / <strong>{crumb[1]}</strong>
          </div>
          <label className="hb-dpr-search">
            <Ico n="search" />
            <input type="search" placeholder={placeholder} aria-label={placeholder} />
            <span className="hb-dpr-kbd">/</span>
          </label>
          <button type="button" className="hb-dpr-iconbtn" aria-label="Notifications">
            <Ico n="bell" />
            <span className="hb-dpr-dot" />
          </button>
          <span className="hb-dpr-av" style={{ background: tone(user), width: 34, height: 34 }} title={user}>
            {initials(user)}
          </span>
        </header>
        <div className="hb-dpr-content">{children}</div>
      </div>
    </div>
  );
}

const SPRINT_KEYS: ProjectSprint[] = ["current", "previous"];
const SPRINT_LABEL: Record<ProjectSprint, string> = { current: "This sprint", previous: "Last sprint" };
const DAY_LABELS = ["Start", "Oct 21", "Oct 22", "Oct 23", "Oct 26", "Oct 27", "Oct 28", "Oct 29", "Oct 30", "Nov 2", "Nov 3"];
const LABEL_AT = [0, 2, 4, 6, 8, 10];

interface Task {
  title: string;
  tag: string;
  color: string;
  points: number;
  who: string;
}

interface SprintData {
  name: string;
  goal: string;
  range: string;
  left: string;
  total: number;
  actual: number[];
  tiles: [number, number, number, number];
  deltas: [number, number, number, number];
  cols: [number, number, number, number];
  cards: [Task[], Task[], Task[], Task[]];
  team: { name: string; tasks: number; cap: number }[];
}

const BLUE = "#7fb3ff";
const VIOLET = "#a78bfa";
const AMBER = "#fbbf24";
const TEAL = "#34d399";
const ROSE = "#fb7185";

const SPRINTS: Record<ProjectSprint, SprintData> = {
  current: {
    name: "Sprint 24",
    goal: "Checkout redesign",
    range: "Oct 21 – Nov 3",
    left: "4 days left",
    total: 58,
    actual: [58, 57, 53, 49, 44, 36, 28],
    tiles: [28, 11, 6, 3],
    deltas: [12, 3, 8, -40],
    cols: [9, 11, 6, 28],
    cards: [
      [
        { title: "Add Apple Pay to express checkout", tag: "Feature", color: BLUE, points: 5, who: "Maya Reyes" },
        { title: "Audit cart empty states", tag: "Design", color: VIOLET, points: 2, who: "Sara Haddad" },
      ],
      [
        { title: "Rebuild shipping step form", tag: "Frontend", color: TEAL, points: 8, who: "Jonas Weber" },
        { title: "Fix address autocomplete lag", tag: "Bug", color: ROSE, points: 3, who: "Aiko Tanaka" },
      ],
      [
        { title: "Sticky order summary sidebar", tag: "Frontend", color: TEAL, points: 5, who: "Leo Park" },
        { title: "Tax calculation edge cases", tag: "Backend", color: AMBER, points: 5, who: "Maya Reyes" },
      ],
      [
        { title: "Promo code field redesign", tag: "Design", color: VIOLET, points: 3, who: "Sara Haddad" },
        { title: "Guest checkout flow", tag: "Feature", color: BLUE, points: 8, who: "Jonas Weber" },
      ],
    ],
    team: [
      { name: "Maya Reyes", tasks: 9, cap: 8 },
      { name: "Jonas Weber", tasks: 7, cap: 8 },
      { name: "Aiko Tanaka", tasks: 8, cap: 8 },
      { name: "Leo Park", tasks: 5, cap: 8 },
      { name: "Sara Haddad", tasks: 6, cap: 8 },
    ],
  },
  previous: {
    name: "Sprint 23",
    goal: "Onboarding revamp",
    range: "Oct 7 – Oct 20",
    left: "Completed",
    total: 54,
    actual: [54, 54, 50, 47, 45, 39, 34, 28, 19, 9, 0],
    tiles: [41, 2, 1, 0],
    deltas: [6, 4, 0, 0],
    cols: [0, 2, 1, 41],
    cards: [
      [
        { title: "Carry over: usage emails", tag: "Backend", color: AMBER, points: 3, who: "Leo Park" },
        { title: "Carry over: tour tooltips", tag: "Design", color: VIOLET, points: 2, who: "Sara Haddad" },
      ],
      [
        { title: "Invite teammates modal", tag: "Frontend", color: TEAL, points: 5, who: "Jonas Weber" },
        { title: "Checklist progress API", tag: "Backend", color: AMBER, points: 3, who: "Maya Reyes" },
      ],
      [
        { title: "Welcome survey step", tag: "Feature", color: BLUE, points: 3, who: "Aiko Tanaka" },
        { title: "Role picker copy pass", tag: "Design", color: VIOLET, points: 1, who: "Sara Haddad" },
      ],
      [
        { title: "Workspace setup wizard", tag: "Feature", color: BLUE, points: 8, who: "Maya Reyes" },
        { title: "Fix signup redirect loop", tag: "Bug", color: ROSE, points: 2, who: "Leo Park" },
      ],
    ],
    team: [
      { name: "Maya Reyes", tasks: 8, cap: 8 },
      { name: "Jonas Weber", tasks: 10, cap: 8 },
      { name: "Aiko Tanaka", tasks: 7, cap: 8 },
      { name: "Leo Park", tasks: 7, cap: 8 },
      { name: "Sara Haddad", tasks: 8, cap: 8 },
    ],
  },
};

const TILE_DEFS = [
  { label: "Done", color: "#4ade80", good: true },
  { label: "In progress", color: "var(--a)", good: true },
  { label: "In review", color: "#a78bfa", good: true },
  { label: "Blocked", color: "#f87171", good: false },
];

const COLUMN_DEFS = [
  { label: "To do", color: "#6b6b6b" },
  { label: "In progress", color: "var(--a)" },
  { label: "In review", color: "#a78bfa" },
  { label: "Done", color: "#4ade80" },
];

const DEADLINES = [
  { id: 1, month: "Oct", day: "30", title: "Payment provider sign-off", who: "Jonas Weber", due: "In 2 days", tone: "amber" },
  { id: 2, month: "Nov", day: "3", title: "Sprint review demo", who: "Maya Reyes", due: "In 6 days", tone: "blue" },
  { id: 3, month: "Nov", day: "5", title: "Accessibility audit report", who: "Aiko Tanaka", due: "In 8 days", tone: "flat" },
  { id: 4, month: "Nov", day: "9", title: "Release 2.8 candidate", who: "Leo Park", due: "In 12 days", tone: "flat" },
];

const NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: "grid", section: "Project" },
  { id: "board", label: "Board", icon: "board", count: "48" },
  { id: "sprints", label: "Sprints", icon: "repeat" },
  { id: "backlog", label: "Backlog", icon: "stack" },
  { id: "roadmap", label: "Roadmap", icon: "flag", section: "Plan" },
  { id: "team", label: "Team", icon: "users" },
  { id: "reports", label: "Reports", icon: "bars" },
];

export function ProjectDashboard({
  accent = "#2f7bff",
  brand = "Cadence",
  user = "Maya Reyes",
  sprint,
  defaultSprint = "current",
  onSprintChange,
  className = "",
  style,
  ...rest
}: ProjectDashboardProps) {
  const uid = React.useId().replace(/:/g, "");
  const [inner, setInner] = React.useState<ProjectSprint>(defaultSprint);
  const [hover, setHover] = React.useState<number | null>(null);
  const [done, setDone] = React.useState<number[]>([]);
  const current = sprint ?? inner;
  const data = SPRINTS[current];
  const last = data.actual.length - 1;
  const live = last < 10;
  const remaining = data.actual[last];
  const finished = data.total - remaining;
  const percent = (finished / data.total) * 100;
  const ideal = Array.from({ length: 11 }, (_, i) => data.total * (1 - i / 10));
  const top = Math.ceil(data.total / 20) * 20;
  const gridCount = top / 20;
  const idealPts = project(ideal, 100, 100, 0, 0, top);
  const actualPts = project(data.actual, 100, 100, 0, 0, top).map(([, y], i): Pt => [i * 10, y]);
  const line = smooth(actualPts);
  const pace = remaining - ideal[last];
  const idealDone = ((data.total - ideal[last]) / data.total) * 100;
  const taskTotal = data.tiles.reduce((t, v) => t + v, 0);

  const pick = (s: ProjectSprint) => {
    setInner(s);
    setHover(null);
    onSprintChange?.(s);
  };

  const moveTo = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHover(Math.max(0, Math.min(10, Math.round(((e.clientX - r.left) / r.width) * 10))));
  };

  const keyMove = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") setHover((h) => Math.min(10, (h ?? -1) + 1));
    else if (e.key === "ArrowLeft") setHover((h) => Math.max(0, (h ?? 11) - 1));
    else if (e.key === "Escape") setHover(null);
    else return;
    e.preventDefault();
  };

  const toggle = (id: number) => setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
  const vars = { "--a": accent, ...style } as React.CSSProperties;
  const hx = hover === null ? 0 : hover * 10;

  return (
    <div className={`hb-dpr ${className}`} style={vars} {...rest}>
      <style href="hb-project-dashboard" precedence="default">
        {css}
      </style>
      <Shell
        brand={brand}
        nav={NAV}
        defaultActive="overview"
        crumb={["Checkout v2", "Overview"]}
        placeholder="Search tasks"
        user={user}
        foot={
          <div className="hb-dpr-proj">
            <b>CHK</b>
            <div>
              <strong>Checkout v2</strong>
              <span>5 members</span>
            </div>
          </div>
        }
      >
        <div className="hb-dpr-head">
          <div>
            <h2 className="hb-dpr-title">{data.goal}</h2>
            <p className="hb-dpr-sub">
              {data.name} · {data.range}
            </p>
          </div>
          <div className="hb-dpr-tools">
            <div className="hb-dpr-seg" role="group" aria-label="Sprint">
              {SPRINT_KEYS.map((s) => (
                <button key={s} type="button" aria-pressed={current === s} onClick={() => pick(s)}>
                  {SPRINT_LABEL[s]}
                </button>
              ))}
            </div>
            <button type="button" className="hb-dpr-btn" data-p="true">
              <Ico n="plus" />
              New task
            </button>
          </div>
        </div>

        <div className="hb-dpr-card hb-dpr-prog" style={{ "--d": 0 } as React.CSSProperties}>
          <div>
            <p className="hb-dpr-prog-p">{percent.toFixed(0)}%</p>
            <div className="hb-dpr-prog-l">
              {finished} of {data.total} points done
            </div>
          </div>
          <div>
            <div className="hb-dpr-prog-bar" role="progressbar" aria-valuenow={Math.round(percent)} aria-valuemin={0} aria-valuemax={100} aria-label="Sprint progress">
              <i key={current} style={{ "--w": `${percent.toFixed(1)}%` } as React.CSSProperties} />
              {live ? <b style={{ "--ideal": `${idealDone.toFixed(1)}%` } as React.CSSProperties} title="Ideal pace" /> : null}
            </div>
            <div className="hb-dpr-prog-m">
              <span>{live ? (pace > 0 ? `${pace.toFixed(0)} points behind the ideal pace` : "Ahead of the ideal pace") : "Finished with zero points left"}</span>
              <span>{remaining} points left</span>
            </div>
          </div>
          <div className="hb-dpr-prog-r">
            <span className="hb-dpr-chip" data-t={live ? "amber" : "green"}>
              <Ico n="clock" />
              {data.left}
            </span>
            <div className="hb-dpr-faces">
              {data.team.map((m) => (
                <span key={m.name} className="hb-dpr-av" style={{ background: tone(m.name) }} title={m.name}>
                  {initials(m.name)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hb-dpr-tiles">
          {TILE_DEFS.map((t, i) => (
            <div className="hb-dpr-card hb-dpr-tile" key={t.label} style={{ "--k": t.color, "--d": i + 1 } as React.CSSProperties}>
              <div className="hb-dpr-tile-top">
                <span>
                  <i />
                  {t.label}
                </span>
                <Delta value={data.deltas[i]} good={t.good} />
              </div>
              <p className="hb-dpr-tile-v">
                {data.tiles[i]}
                <small>tasks</small>
              </p>
              <div className="hb-dpr-tile-b">
                <i key={current} style={{ "--w": `${((data.tiles[i] / taskTotal) * 100).toFixed(1)}%` } as React.CSSProperties} />
              </div>
            </div>
          ))}
        </div>

        <div className="hb-dpr-row">
          <div className="hb-dpr-card" style={{ "--d": 5 } as React.CSSProperties}>
            <div className="hb-dpr-card-h">
              <div>
                <h3 className="hb-dpr-card-t">Burndown</h3>
                <p className="hb-dpr-card-s">Story points remaining</p>
              </div>
              <div className="hb-dpr-legend-k">
                <span>
                  <i />
                  Actual
                </span>
                <span>
                  <i data-prev="true" />
                  Ideal
                </span>
              </div>
            </div>
            <div className="hb-dpr-chart">
              <div className="hb-dpr-yl" aria-hidden="true">
                {Array.from({ length: gridCount + 1 }, (_, k) => (
                  <span key={k} style={{ bottom: `${((k / gridCount) * 100).toFixed(2)}%` }}>
                    {k * 20}
                  </span>
                ))}
              </div>
              <div
                className="hb-dpr-plot"
                role="img"
                tabIndex={0}
                aria-label={`Burndown for ${data.name}: ${remaining} of ${data.total} points remaining. Use arrow keys to inspect days.`}
                onPointerMove={moveTo}
                onPointerLeave={() => setHover(null)}
                onKeyDown={keyMove}
                onBlur={() => setHover(null)}
              >
                <svg key={current} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id={`${uid}a`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--a)" stopOpacity=".26" />
                      <stop offset="1" stopColor="var(--a)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {Array.from({ length: gridCount + 1 }, (_, k) => (
                    <line key={k} className="hb-dpr-gl" x1="0" x2="100" y1={(100 - (k / gridCount) * 100).toFixed(2)} y2={(100 - (k / gridCount) * 100).toFixed(2)} />
                  ))}
                  <path d={`${line}L${actualPts[last][0].toFixed(1)} 100L0 100Z`} fill={`url(#${uid}a)`} />
                  <path className="hb-dpr-prev" d={`M${idealPts[0][0].toFixed(1)} ${idealPts[0][1].toFixed(1)}L${idealPts[10][0].toFixed(1)} ${idealPts[10][1].toFixed(1)}`} />
                  <path className="hb-dpr-line" d={line} />
                </svg>
                {live ? (
                  <div className="hb-dpr-today" style={{ left: `${actualPts[last][0].toFixed(1)}%` }}>
                    <span>Today</span>
                  </div>
                ) : null}
                {hover !== null ? (
                  <>
                    <div className="hb-dpr-hl" style={{ left: `${hx}%` }} />
                    {hover <= last ? <div className="hb-dpr-hd" style={{ left: `${hx}%`, top: `${actualPts[hover][1].toFixed(2)}%` }} /> : null}
                    <div className="hb-dpr-tt" style={{ top: 4, left: `${hx}%`, transform: hx > 62 ? "translateX(calc(-100% - 14px))" : "translateX(14px)" }}>
                      <div className="hb-dpr-tt-d">{DAY_LABELS[hover]}</div>
                      <div>
                        Ideal <b>{ideal[hover].toFixed(0)}</b>
                      </div>
                      {hover <= last ? (
                        <div>
                          Actual <b>{data.actual[hover]}</b>
                        </div>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </div>
              <div className="hb-dpr-xl" aria-hidden="true">
                {LABEL_AT.map((i) => (
                  <span key={i}>{DAY_LABELS[i]}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="hb-dpr-card" style={{ "--d": 6 } as React.CSSProperties}>
            <div className="hb-dpr-card-h">
              <div>
                <h3 className="hb-dpr-card-t">Team workload</h3>
                <p className="hb-dpr-card-s">Tasks vs capacity</p>
              </div>
            </div>
            <ul className="hb-dpr-work">
              {data.team.map((m, i) => {
                const ratio = m.tasks / m.cap;
                const color = ratio > 1 ? "#fbbf24" : ratio === 1 ? "var(--a)" : "color-mix(in srgb, var(--a) 60%, #3a3a3a)";
                return (
                  <li key={m.name}>
                    <span className="hb-dpr-av" style={{ background: tone(m.name) }}>
                      {initials(m.name)}
                    </span>
                    <div>
                      <div className="hb-dpr-work-n">
                        {m.name}
                        <span>
                          {m.tasks} / {m.cap}
                        </span>
                      </div>
                      <div className="hb-dpr-work-b">
                        <i key={current} style={{ "--w": `${Math.min(ratio * 100, 100).toFixed(1)}%`, "--c": color, "--i": i } as React.CSSProperties} />
                      </div>
                    </div>
                    {ratio > 1 ? (
                      <span className="hb-dpr-chip" data-t="amber">
                        Over
                      </span>
                    ) : (
                      <span className="hb-dpr-chip" style={{ visibility: "hidden" }}>
                        Over
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="hb-dpr-card" style={{ "--d": 7 } as React.CSSProperties}>
          <div className="hb-dpr-card-h">
            <div>
              <h3 className="hb-dpr-card-t">Board summary</h3>
              <p className="hb-dpr-card-s">Latest cards in each column</p>
            </div>
            <button type="button" className="hb-dpr-btn">
              Open board
              <Ico n="chevr" />
            </button>
          </div>
          <div className="hb-dpr-board" key={current}>
            {COLUMN_DEFS.map((c, ci) => (
              <div className="hb-dpr-colm" key={c.label} style={{ "--k": c.color } as React.CSSProperties}>
                <div className="hb-dpr-colm-h">
                  <span>
                    <i />
                    {c.label}
                  </span>
                  <em>{data.cols[ci]}</em>
                </div>
                {data.cards[ci].map((t) => (
                  <div className="hb-dpr-task" key={t.title}>
                    <p>{t.title}</p>
                    <div className="hb-dpr-task-f">
                      <span className="hb-dpr-tag" style={{ "--c": t.color } as React.CSSProperties}>
                        {t.tag}
                      </span>
                      <span className="hb-dpr-pts">
                        {t.points} pts
                        <span className="hb-dpr-av" style={{ background: tone(t.who) }} title={t.who}>
                          {initials(t.who)}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="hb-dpr-card" style={{ "--d": 8 } as React.CSSProperties}>
          <div className="hb-dpr-card-h">
            <div>
              <h3 className="hb-dpr-card-t">Upcoming deadlines</h3>
              <p className="hb-dpr-card-s">Click to mark as done</p>
            </div>
            <span className="hb-dpr-chip">
              {DEADLINES.length - done.length} open
            </span>
          </div>
          <ul className="hb-dpr-due">
            {DEADLINES.map((d) => {
              const isDone = done.includes(d.id);
              return (
                <li key={d.id}>
                  <button type="button" className="hb-dpr-dl" aria-pressed={isDone} onClick={() => toggle(d.id)}>
                    <span className="hb-dpr-dl-d">
                      <small>{d.month}</small>
                      <b>{d.day}</b>
                    </span>
                    <span className="hb-dpr-dl-x">
                      <strong>{d.title}</strong>
                      <span>{d.who}</span>
                      <span className="hb-dpr-chip" data-t={isDone ? "green" : d.tone}>
                        {isDone ? "Done" : d.due}
                      </span>
                    </span>
                    <span className="hb-dpr-dl-k" aria-hidden="true">
                      <Ico n="check" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Shell>
    </div>
  );
}
