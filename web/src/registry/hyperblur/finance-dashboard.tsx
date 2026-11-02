"use client";

import * as React from "react";

export type FinanceRange = "6M" | "12M";

export interface FinanceDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  brand?: string;
  owner?: string;
  range?: FinanceRange;
  defaultRange?: FinanceRange;
  onRangeChange?: (range: FinanceRange) => void;
  defaultHidden?: boolean;
}

const css = `
.hb-dfn {
  --a: #2f7bff;
  container: hb-dfn / inline-size;
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
.hb-dfn *, .hb-dfn *::before, .hb-dfn *::after { box-sizing: border-box; }
.hb-dfn button, .hb-dfn input, .hb-dfn select { font: inherit; color: inherit; }
.hb-dfn button:focus-visible, .hb-dfn input:focus-visible, .hb-dfn select:focus-visible, .hb-dfn [tabindex]:focus-visible {
  outline: 2px solid var(--a);
  outline-offset: 2px;
}
.hb-dfn-app { display: grid; grid-template-columns: 220px minmax(0, 1fr); min-height: 640px; }
.hb-dfn-side {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: 20px 12px 16px;
  border-right: 1px solid #1f1f1f;
  background: #0d0d0d;
}
.hb-dfn-brand { display: flex; align-items: center; gap: 10px; padding: 0 8px; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-dfn-mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--a), color-mix(in srgb, var(--a) 45%, #ffffff));
  color: #ffffff;
}
.hb-dfn-nav { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-dfn-nav-label { padding: 12px 8px 6px; color: #6b6b6b; font-size: 11px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
.hb-dfn-link {
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
.hb-dfn-link:hover { background: #161616; color: #ededed; }
.hb-dfn-link[aria-current="page"] { background: #1b1b1b; color: #ffffff; }
.hb-dfn-link[aria-current="page"] .hb-dfn-ico { color: var(--a); }
.hb-dfn-link-n {
  margin-left: auto;
  padding: 1px 7px;
  border-radius: 999px;
  background: #1f1f1f;
  color: #a1a1a1;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.hb-dfn-side-foot { margin-top: auto; }
.hb-dfn-main { display: flex; flex-direction: column; min-width: 0; }
.hb-dfn-top { display: flex; align-items: center; gap: 12px; height: 60px; padding: 0 24px; border-bottom: 1px solid #1f1f1f; }
.hb-dfn-crumb { min-width: 0; overflow: hidden; color: #8f8f8f; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.hb-dfn-crumb strong { color: #ededed; font-weight: 500; }
.hb-dfn-search { position: relative; width: 260px; margin-left: auto; color: #6b6b6b; }
.hb-dfn-search .hb-dfn-ico { position: absolute; top: 50%; left: 10px; width: 15px; height: 15px; transform: translateY(-50%); pointer-events: none; }
.hb-dfn-search input {
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
.hb-dfn-search input::placeholder { color: #6b6b6b; }
.hb-dfn-search input:hover { border-color: #333333; }
.hb-dfn-search input:focus-visible { border-color: var(--a); outline-offset: 0; }
.hb-dfn-kbd {
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
.hb-dfn-iconbtn {
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
.hb-dfn-iconbtn:hover { border-color: #333333; background: #171717; color: #ededed; }
.hb-dfn-dot { position: absolute; top: 8px; right: 9px; width: 7px; height: 7px; border: 2px solid #111111; border-radius: 50%; background: var(--a); box-sizing: content-box; margin: -2px; }
.hb-dfn-av {
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
.hb-dfn-content { display: flex; flex-direction: column; gap: 20px; min-width: 0; padding: 24px; }
.hb-dfn-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; }
.hb-dfn-title { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -.02em; line-height: 1.2; }
.hb-dfn-sub { margin: 4px 0 0; color: #8f8f8f; font-size: 13px; }
.hb-dfn-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.hb-dfn-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid #232323;
  border-radius: 12px;
  background: #111111;
  animation: hb-dfn-rise .55s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: calc(var(--d, 0) * 60ms);
}
.hb-dfn-card-h { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.hb-dfn-card-t { margin: 0; font-size: 13px; font-weight: 600; letter-spacing: -.005em; }
.hb-dfn-card-s { margin: 2px 0 0; color: #8f8f8f; font-size: 12px; }
.hb-dfn-seg { display: inline-flex; padding: 2px; border: 1px solid #262626; border-radius: 8px; background: #0d0d0d; }
.hb-dfn-seg button {
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
.hb-dfn-seg button:hover { color: #ededed; }
.hb-dfn-seg button[aria-pressed="true"] { background: #232323; color: #ffffff; }
.hb-dfn-btn {
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
.hb-dfn-btn:hover { border-color: #3a3a3a; background: #1c1c1c; }
.hb-dfn-btn:active { transform: translateY(1px); }
.hb-dfn-btn[data-p="true"] { border-color: var(--a); background: var(--a); color: #ffffff; }
.hb-dfn-btn[data-p="true"]:hover { background: color-mix(in srgb, var(--a) 85%, #ffffff); }
.hb-dfn-btn .hb-dfn-ico { width: 14px; height: 14px; }
.hb-dfn-ico { display: block; flex: none; width: 16px; height: 16px; }
.hb-dfn-pill {
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
.hb-dfn-pill .hb-dfn-ico { width: 11px; height: 11px; stroke-width: 2.4; }
.hb-dfn-pill[data-t="up"] { background: rgba(74, 222, 128, .12); color: #4ade80; }
.hb-dfn-pill[data-t="down"] { background: rgba(248, 113, 113, .12); color: #f87171; }
.hb-dfn-pill[data-t="flat"] { background: #1f1f1f; color: #a1a1a1; }
.hb-dfn-spark { display: block; width: 100%; height: 36px; color: var(--a); animation: hb-dfn-wipe .9s .15s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dfn-spark-l { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.hb-dfn-tt {
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
.hb-dfn-tt b { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-dfn-tt-d { color: #8f8f8f; font-size: 11px; }
@keyframes hb-dfn-rise { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-dfn-wipe { from { clip-path: inset(-6px 100% -6px -6px); } to { clip-path: inset(-6px -6px -6px -6px); } }
@keyframes hb-dfn-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-dfn-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-dfn-pulse { 0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, .55); } 100% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); } }
@keyframes hb-dfn-arc { from { stroke-dasharray: 0 100; } }
@container hb-dfn (max-width: 759px) {
  .hb-dfn-app { grid-template-columns: minmax(0, 1fr); min-height: 0; }
  .hb-dfn-side { flex-direction: row; align-items: center; gap: 8px; padding: 10px 12px; border-right: 0; border-bottom: 1px solid #1f1f1f; overflow-x: auto; }
  .hb-dfn-brand { padding: 0; }
  .hb-dfn-brand span:last-child, .hb-dfn-nav-label, .hb-dfn-link-t, .hb-dfn-link-n, .hb-dfn-side-foot, .hb-dfn-kbd { display: none; }
  .hb-dfn-nav { flex-direction: row; flex: 1; gap: 4px; }
  .hb-dfn-link { justify-content: center; width: 36px; padding: 0; }
  .hb-dfn-top { gap: 8px; padding: 0 16px; }
  .hb-dfn-crumb { display: none; }
  .hb-dfn-search { flex: 1; width: auto; margin-left: 0; }
  .hb-dfn-content { gap: 16px; padding: 16px; }
  .hb-dfn-title { font-size: 19px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-dfn *, .hb-dfn *::before, .hb-dfn *::after { animation: none !important; transition: none !important; }
}
.hb-dfn-safe { display: flex; align-items: flex-start; gap: 10px; padding: 12px; border: 1px solid #232323; border-radius: 10px; background: #111111; }
.hb-dfn-safe .hb-dfn-ico { margin-top: 1px; color: var(--a); }
.hb-dfn-safe strong { display: block; font-size: 12.5px; font-weight: 500; }
.hb-dfn-safe span { color: #8f8f8f; font-size: 11.5px; line-height: 1.4; }
.hb-dfn-hero { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 16px; }
.hb-dfn-bal { display: flex; flex-direction: column; justify-content: space-between; gap: 16px; padding: 20px; }
.hb-dfn-bal-l { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: #8f8f8f; font-size: 12px; }
.hb-dfn-bal-v { margin: 8px 0 0; font-size: 42px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.04em; line-height: 1; }
.hb-dfn-bal-v small { color: #6b6b6b; font-size: 22px; font-weight: 500; letter-spacing: -.02em; }
.hb-dfn-bal-d { display: flex; align-items: center; gap: 8px; margin-top: 12px; color: #8f8f8f; font-size: 12px; }
.hb-dfn-bal .hb-dfn-spark { height: 44px; margin: 0 -4px; }
.hb-dfn-accts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.hb-dfn-acct { display: flex; flex-direction: column; gap: 2px; padding: 10px 12px; border: 1px solid #232323; border-radius: 10px; background: #141414; }
.hb-dfn-acct span { display: flex; align-items: center; gap: 6px; color: #8f8f8f; font-size: 11.5px; }
.hb-dfn-acct span i { width: 6px; height: 6px; border-radius: 50%; background: var(--c); }
.hb-dfn-acct b { font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.01em; }
.hb-dfn-cc {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 1.586;
  margin: 0 auto;
  padding: 20px 22px;
  border-radius: 18px;
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(255, 255, 255, .3), transparent 52%),
    linear-gradient(135deg, var(--a) 0%, color-mix(in srgb, var(--a) 42%, #4c1d95) 100%);
  box-shadow: 0 28px 50px -26px var(--a), inset 0 1px 0 rgba(255, 255, 255, .28);
  color: #ffffff;
  overflow: hidden;
  animation: hb-dfn-rise .7s .1s cubic-bezier(.2, .7, .2, 1) both;
  transition: transform .5s cubic-bezier(.2, .7, .2, 1);
}
.hb-dfn-cc:hover { transform: translate3d(0, -4px, 0) rotate(-.6deg); }
.hb-dfn-cc::before, .hb-dfn-cc::after { content: ""; position: absolute; border: 1px solid rgba(255, 255, 255, .16); border-radius: 50%; pointer-events: none; }
.hb-dfn-cc::before { top: -90px; right: -70px; width: 260px; height: 260px; }
.hb-dfn-cc::after { top: -40px; right: -20px; width: 160px; height: 160px; }
.hb-dfn-cc-t { position: relative; display: flex; align-items: center; justify-content: space-between; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-dfn-cc-t .hb-dfn-ico { width: 20px; height: 20px; opacity: .85; }
.hb-dfn-chip-i { position: relative; width: 36px; height: 27px; border-radius: 6px; background: linear-gradient(135deg, #f4dd96, #c79d45); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15); overflow: hidden; }
.hb-dfn-chip-i::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 32%, rgba(0, 0, 0, .18) 32% 34%, transparent 34% 66%, rgba(0, 0, 0, .18) 66% 68%, transparent 68%), linear-gradient(0deg, transparent 44%, rgba(0, 0, 0, .18) 44% 47%, transparent 47% 53%, rgba(0, 0, 0, .18) 53% 56%, transparent 56%); }
.hb-dfn-cc-n { position: relative; margin: 0; font-size: 17px; font-variant-numeric: tabular-nums; letter-spacing: .14em; text-shadow: 0 1px 2px rgba(0, 0, 0, .25); }
.hb-dfn-cc-b { position: relative; display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; }
.hb-dfn-cc-b small { display: block; color: rgba(255, 255, 255, .65); font-size: 9.5px; letter-spacing: .08em; text-transform: uppercase; }
.hb-dfn-cc-b span { font-size: 12.5px; font-weight: 500; letter-spacing: .06em; }
.hb-dfn-cc-b div + div { text-align: left; }
.hb-dfn-cc-m { position: relative; display: block; width: 44px; height: 28px; }
.hb-dfn-cc-m i { position: absolute; top: 0; width: 28px; height: 28px; border-radius: 50%; }
.hb-dfn-cc-m i:first-child { left: 0; background: rgba(255, 255, 255, .92); }
.hb-dfn-cc-m i:last-child { right: 0; background: rgba(255, 255, 255, .45); mix-blend-mode: hard-light; }
.hb-dfn-row { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: 16px; }
.hb-dfn-row-b { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 16px; }
.hb-dfn-legend-k { display: flex; align-items: center; gap: 14px; color: #8f8f8f; font-size: 12px; }
.hb-dfn-legend-k span { display: inline-flex; align-items: center; gap: 6px; }
.hb-dfn-legend-k i { width: 10px; height: 10px; border-radius: 3px; background: var(--c); }
.hb-dfn-sum { display: flex; flex-wrap: wrap; gap: 24px; margin: -4px 0 16px; }
.hb-dfn-sum-i { display: flex; flex-direction: column; gap: 2px; color: #8f8f8f; font-size: 12px; }
.hb-dfn-sum-i b { color: #ededed; font-size: 18px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
.hb-dfn-gb { display: grid; grid-template-columns: 36px minmax(0, 1fr); grid-template-rows: 210px auto; column-gap: 8px; }
.hb-dfn-yl { position: relative; }
.hb-dfn-yl span { position: absolute; right: 0; color: #6b6b6b; font-size: 11px; font-variant-numeric: tabular-nums; transform: translateY(50%); }
.hb-dfn-plot { position: relative; }
.hb-dfn-gl { position: absolute; right: 0; left: 0; height: 1px; background: #1b1b1b; }
.hb-dfn-cols { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); }
.hb-dfn-col { display: flex; align-items: flex-end; justify-content: center; gap: 4px; padding: 0; border: 0; border-radius: 6px; background: transparent; cursor: pointer; transition: background .15s ease; }
.hb-dfn-col:hover, .hb-dfn-col[data-on="true"] { background: rgba(255, 255, 255, .035); }
.hb-dfn-bar { width: min(34%, 16px); border-radius: 5px 5px 2px 2px; transform-origin: bottom; animation: hb-dfn-grow .8s cubic-bezier(.3, .7, .2, 1) both; animation-delay: calc(var(--i) * 40ms); transition: filter .15s ease; }
.hb-dfn-bar[data-k="in"] { background: linear-gradient(180deg, var(--a), color-mix(in srgb, var(--a) 50%, #000000)); }
.hb-dfn-bar[data-k="out"] { background: linear-gradient(180deg, #8791a8, #4a5164); }
.hb-dfn-col:hover .hb-dfn-bar, .hb-dfn-col[data-on="true"] .hb-dfn-bar { filter: brightness(1.2); }
.hb-dfn-xl { grid-column: 2; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); padding-top: 10px; color: #6b6b6b; font-size: 11px; text-align: center; }
.hb-dfn-donut { position: relative; width: 148px; height: 148px; margin: 0 auto 16px; }
.hb-dfn-donut svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-dfn-donut-t { fill: none; stroke: #1b1b1b; stroke-width: 5; }
.hb-dfn-donut-s { fill: none; stroke-width: 5; transition: opacity .2s ease, stroke-width .2s ease; animation: hb-dfn-arc .9s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dfn-donut-s[data-hot="true"] { stroke-width: 6; }
.hb-dfn-donut-s[data-dim="true"] { opacity: .3; }
.hb-dfn-donut-c { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.hb-dfn-donut-c strong { font-size: 20px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; line-height: 1.1; }
.hb-dfn-donut-c span { color: #8f8f8f; font-size: 11px; }
.hb-dfn-cat { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-dfn-cat li { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto auto; align-items: center; gap: 8px; margin: 0 -6px; padding: 5px 6px; border-radius: 6px; color: #a1a1a1; font-size: 12.5px; transition: background .15s ease; }
.hb-dfn-cat li:hover { background: #171717; color: #ededed; }
.hb-dfn-cat i { width: 8px; height: 8px; border-radius: 3px; }
.hb-dfn-cat b { color: #ededed; font-weight: 500; font-variant-numeric: tabular-nums; }
.hb-dfn-cat em { min-width: 36px; color: #6b6b6b; font-size: 12px; font-style: normal; text-align: right; font-variant-numeric: tabular-nums; }
.hb-dfn-tx { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-dfn-tx li { display: grid; grid-template-columns: 36px minmax(0, 1fr) auto; align-items: center; gap: 12px; margin: 0 -8px; padding: 10px 8px; border-top: 1px solid #1b1b1b; border-radius: 8px; transition: background .15s ease; }
.hb-dfn-tx li:first-child { border-top-color: transparent; }
.hb-dfn-tx li:hover { background: #151515; }
.hb-dfn-tx-i { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: color-mix(in srgb, var(--c) 16%, transparent); color: var(--c); }
.hb-dfn-tx-n { min-width: 0; }
.hb-dfn-tx-n strong { display: block; overflow: hidden; font-size: 13px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.hb-dfn-tx-n span { color: #6b6b6b; font-size: 12px; }
.hb-dfn-tx-a { font-size: 13px; font-weight: 500; font-variant-numeric: tabular-nums; text-align: right; }
.hb-dfn-tx-a[data-in="true"] { color: #4ade80; }
.hb-dfn-goals { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-dfn-goal { display: flex; flex-direction: column; gap: 10px; padding: 14px 0; border-top: 1px solid #1b1b1b; }
.hb-dfn-goal:first-child { padding-top: 0; border-top: 0; }
.hb-dfn-goal:last-child { padding-bottom: 0; }
.hb-dfn-goal-r { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; font-size: 13px; font-weight: 500; }
.hb-dfn-goal-r span { color: #8f8f8f; font-size: 12px; font-weight: 400; font-variant-numeric: tabular-nums; }
.hb-dfn-goal-b { height: 6px; border-radius: 999px; background: #1b1b1b; overflow: hidden; }
.hb-dfn-goal-b i { display: block; width: var(--w); height: 100%; border-radius: 999px; background: linear-gradient(90deg, color-mix(in srgb, var(--c) 60%, #000000), var(--c)); transform-origin: left; animation: hb-dfn-bar .9s cubic-bezier(.3, .7, .2, 1) both; transition: width .5s cubic-bezier(.3, .7, .2, 1); }
.hb-dfn-goal-f { display: flex; align-items: center; justify-content: space-between; color: #8f8f8f; font-size: 12px; }
.hb-dfn-mini { height: 24px; padding: 0 9px; border: 1px solid #2a2a2a; border-radius: 6px; background: #151515; color: #ededed; font-size: 11.5px; font-weight: 500; cursor: pointer; transition: background .15s ease, border-color .15s ease; }
.hb-dfn-mini:hover:not(:disabled) { border-color: #3a3a3a; background: #1c1c1c; }
.hb-dfn-mini:disabled { color: #6b6b6b; cursor: default; }
@keyframes hb-dfn-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@container hb-dfn (max-width: 959px) {
  .hb-dfn-hero, .hb-dfn-row, .hb-dfn-row-b { grid-template-columns: minmax(0, 1fr); }
}
@container hb-dfn (max-width: 539px) {
  .hb-dfn-bal-v { font-size: 34px; }
  .hb-dfn-accts { grid-template-columns: minmax(0, 1fr); }
  .hb-dfn-cc { padding: 16px 18px; }
  .hb-dfn-cc-n { font-size: 14px; }
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
  sliders: ["M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.7 21a2 2 0 0 1-3.4 0"],
  search: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.3-4.3"],
  dollar: ["M12 1v22", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
  cart: ["M6 6h15l-2 9H8z", "M6 6L5 3H2", "M9 20a1 1 0 1 0 0 .01", "M18 20a1 1 0 1 0 0 .01"],
  card: ["M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "M2 10h20"],
  pie: ["M21 12A9 9 0 1 1 12 3v9z"],
  up: ["M12 19V5M5 12l7-7 7 7"],
  down: ["M12 5v14M19 12l-7 7-7-7"],
  chevr: ["M9 6l6 6-6 6"],
  out: ["M7 17L17 7M8 7h9v9"],
  shield: ["M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"],
  truck: ["M1 4h13v12H1zM14 8h4l3 3v5h-7z", "M5.5 18.5a1.5 1.5 0 1 0 0 .01", "M17.5 18.5a1.5 1.5 0 1 0 0 .01"],
  home: ["M3 11l9-8 9 8", "M5 10v10h5v-6h4v6h5V10"],
  wallet: ["M3 7a2 2 0 0 1 2-2h13v4", "M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z", "M16 14.5h.01"],
  send: ["M22 2L11 13", "M22 2l-7 20-4-9-9-4z"],
  target: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
  eye: ["M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  eyeoff: ["M17.9 17.9A10.9 10.9 0 0 1 12 19C5 19 1 12 1 12a18.5 18.5 0 0 1 5.1-5.9", "M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2", "M1 1l22 22"],
  receipt: ["M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z", "M9 8h6M9 12h6"],
  repeat: ["M17 2l4 4-4 4", "M3 11V9a3 3 0 0 1 3-3h15", "M7 22l-4-4 4-4", "M21 13v2a3 3 0 0 1-3 3H3"],
};

function Ico({ n }: { n: string }) {
  return (
    <svg className="hb-dfn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(icons[n] ?? []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function Spark({ values, id }: { values: number[]; id: string }) {
  const line = smooth(project(values, 100, 32, 3));
  return (
    <svg className="hb-dfn-spark" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".26" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line}L100 32L0 32Z`} fill={`url(#${id})`} />
      <path className="hb-dfn-spark-l" d={line} />
    </svg>
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
    <div className="hb-dfn-app">
      <aside className="hb-dfn-side">
        <div className="hb-dfn-brand">
          <span className="hb-dfn-mark" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18L10 6l4 8 2-4 4 8" />
            </svg>
          </span>
          <span>{brand}</span>
        </div>
        <nav aria-label="Main">
          <ul className="hb-dfn-nav">
            {nav.map((item) => (
              <React.Fragment key={item.id}>
                {item.section ? (
                  <li className="hb-dfn-nav-label" aria-hidden="true">
                    {item.section}
                  </li>
                ) : null}
                <li>
                  <button type="button" className="hb-dfn-link" aria-current={active === item.id ? "page" : undefined} aria-label={item.label} onClick={() => setActive(item.id)}>
                    <Ico n={item.icon} />
                    <span className="hb-dfn-link-t">{item.label}</span>
                    {item.count ? <span className="hb-dfn-link-n">{item.count}</span> : null}
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </nav>
        {foot ? <div className="hb-dfn-side-foot">{foot}</div> : null}
      </aside>
      <div className="hb-dfn-main">
        <header className="hb-dfn-top">
          <div className="hb-dfn-crumb">
            {crumb[0]} / <strong>{crumb[1]}</strong>
          </div>
          <label className="hb-dfn-search">
            <Ico n="search" />
            <input type="search" placeholder={placeholder} aria-label={placeholder} />
            <span className="hb-dfn-kbd">/</span>
          </label>
          <button type="button" className="hb-dfn-iconbtn" aria-label="Notifications">
            <Ico n="bell" />
            <span className="hb-dfn-dot" />
          </button>
          <span className="hb-dfn-av" style={{ background: tone(user), width: 34, height: 34 }} title={user}>
            {initials(user)}
          </span>
        </header>
        <div className="hb-dfn-content">{children}</div>
      </div>
    </div>
  );
}

const RANGE_KEYS: FinanceRange[] = ["6M", "12M"];
const MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const INCOME = [5200, 6100, 5400, 5300, 5600, 5500, 5900, 5700, 6000, 6200, 6100, 6400];
const EXPENSES = [3900, 4800, 3700, 3600, 3850, 4100, 4200, 3950, 4300, 4100, 4000, 3700];
const BALANCE_RAW = Array.from({ length: 30 }, (_, i) => 41200 + i * 98 + hash(i + 5) * 520);
const BALANCE = BALANCE_RAW.map((v, i) => v + (44260.5 - BALANCE_RAW[29]) * (i / 29));

const CATEGORIES = [
  { name: "Housing", amount: 1450, color: "var(--a)" },
  { name: "Food & dining", amount: 820, color: "#a78bfa" },
  { name: "Shopping", amount: 560, color: "#34d399" },
  { name: "Transport", amount: 410, color: "#fbbf24" },
  { name: "Subscriptions", amount: 190, color: "#fb7185" },
  { name: "Other", amount: 270, color: "#6b7280" },
];

const TRANSACTIONS = [
  { name: "Lumen Studio", note: "Payroll · Oct 28", amount: 4200, icon: "dollar", color: "#4ade80" },
  { name: "Harbor Market", note: "Groceries · Oct 28", amount: -86.42, icon: "cart", color: "#34d399" },
  { name: "Elm Street Properties", note: "Rent · Oct 27", amount: -1450, icon: "home", color: "#7fb3ff" },
  { name: "Greenline Transit", note: "Transport · Oct 26", amount: -42, icon: "truck", color: "#fbbf24" },
  { name: "Streamly", note: "Subscription · Oct 26", amount: -14.99, icon: "repeat", color: "#fb7185" },
  { name: "Okoro Design", note: "Invoice · Oct 25", amount: 860, icon: "receipt", color: "#4ade80" },
];

const GOALS = [
  { name: "Emergency fund", saved: 8400, target: 12000, color: "var(--a)" },
  { name: "Japan trip", saved: 2150, target: 4500, color: "#a78bfa" },
  { name: "New laptop", saved: 1320, target: 1800, color: "#34d399" },
];

const NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: "grid", section: "Banking" },
  { id: "accounts", label: "Accounts", icon: "wallet" },
  { id: "cards", label: "Cards", icon: "card", count: "2" },
  { id: "transfers", label: "Transfers", icon: "send" },
  { id: "savings", label: "Savings", icon: "target", section: "Plan" },
  { id: "insights", label: "Insights", icon: "pie" },
  { id: "settings", label: "Settings", icon: "sliders" },
];

function sum(a: number[]) {
  return a.reduce((t, v) => t + v, 0);
}

function usd(n: number, digits = 2) {
  return `$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

export function FinanceDashboard({
  accent = "#2f7bff",
  brand = "Marlow",
  owner = "Dana Reyes",
  range,
  defaultRange = "6M",
  onRangeChange,
  defaultHidden = false,
  className = "",
  style,
  ...rest
}: FinanceDashboardProps) {
  const uid = React.useId().replace(/:/g, "");
  const [inner, setInner] = React.useState<FinanceRange>(defaultRange);
  const [hidden, setHidden] = React.useState(defaultHidden);
  const [hover, setHover] = React.useState<number | null>(null);
  const [hot, setHot] = React.useState<number | null>(null);
  const [added, setAdded] = React.useState<number[]>([0, 0, 0]);
  const current = range ?? inner;
  const n = current === "6M" ? 6 : 12;
  const months = MONTHS.slice(12 - n);
  const income = INCOME.slice(12 - n);
  const expenses = EXPENSES.slice(12 - n);
  const top = Math.ceil(Math.max(...income, ...expenses) / 2000) * 2000;
  const ticks = top / 2000;
  const totalIn = sum(income);
  const totalOut = sum(expenses);
  const spent = sum(CATEGORIES.map((c) => c.amount));
  const first = BALANCE[0];
  const checking = 12840.5;
  const savings = 31420;
  const total = checking + savings;
  const mask = (s: string) => (hidden ? "••••••" : s);
  const [whole, cents] = usd(total).slice(1).split(".");

  const pick = (r: FinanceRange) => {
    setInner(r);
    setHover(null);
    onRangeChange?.(r);
  };

  const arcs = CATEGORIES.map((c, i) => {
    const share = (c.amount / spent) * 100;
    return {
      ...c,
      share,
      len: Math.max(share - 1.2, 0.5),
      offset: CATEGORIES.slice(0, i).reduce((t, x) => t + (x.amount / spent) * 100, 0) + 0.6,
    };
  });

  const bump = (i: number) =>
    setAdded((a) => {
      const next = [...a];
      next[i] = Math.min(next[i] + 50, GOALS[i].target - GOALS[i].saved);
      return next;
    });

  const hp = hover === null ? null : ((hover + 0.5) / n) * 100;
  const vars = { "--a": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-dfn ${className}`} style={vars} {...rest}>
      <style href="hb-finance-dashboard" precedence="default">
        {css}
      </style>
      <Shell
        brand={brand}
        nav={NAV}
        defaultActive="overview"
        crumb={["Banking", "Overview"]}
        placeholder="Search transactions"
        user={owner}
        foot={
          <div className="hb-dfn-safe">
            <Ico n="shield" />
            <div>
              <strong>Protected</strong>
              <span>Deposits insured up to $250,000</span>
            </div>
          </div>
        }
      >
        <div className="hb-dfn-head">
          <div>
            <h2 className="hb-dfn-title">Good morning, {owner.split(" ")[0]}</h2>
            <p className="hb-dfn-sub">Here is how your money moved in October</p>
          </div>
          <div className="hb-dfn-tools">
            <button type="button" className="hb-dfn-btn" aria-pressed={hidden} onClick={() => setHidden((h) => !h)}>
              <Ico n={hidden ? "eye" : "eyeoff"} />
              {hidden ? "Show balances" : "Hide balances"}
            </button>
            <button type="button" className="hb-dfn-btn" data-p="true">
              <Ico n="send" />
              Send money
            </button>
          </div>
        </div>

        <div className="hb-dfn-hero">
          <div className="hb-dfn-card hb-dfn-bal" style={{ "--d": 0 } as React.CSSProperties}>
            <div>
              <div className="hb-dfn-bal-l">
                <span>Total balance</span>
                <span className="hb-dfn-pill" data-t="up">
                  <Ico n="up" />
                  {(((total - first) / first) * 100).toFixed(1)}%
                </span>
              </div>
              <p className="hb-dfn-bal-v">
                {hidden ? (
                  "$••••••"
                ) : (
                  <>
                    ${whole}
                    <small>.{cents}</small>
                  </>
                )}
              </p>
              <div className="hb-dfn-bal-d">{mask(`+${usd(total - first, 2)}`)} since Oct 1</div>
            </div>
            <Spark values={BALANCE} id={`${uid}b`} />
            <div className="hb-dfn-accts">
              <div className="hb-dfn-acct" style={{ "--c": "var(--a)" } as React.CSSProperties}>
                <span>
                  <i />
                  Checking
                </span>
                <b>{mask(usd(checking))}</b>
              </div>
              <div className="hb-dfn-acct" style={{ "--c": "#34d399" } as React.CSSProperties}>
                <span>
                  <i />
                  Savings
                </span>
                <b>{mask(usd(savings))}</b>
              </div>
            </div>
          </div>

          <div className="hb-dfn-cc" role="img" aria-label={`Debit card ending in 4821 for ${owner}`}>
            <div className="hb-dfn-cc-t">
              <span>{brand}</span>
              <svg className="hb-dfn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M8 8.5a5 5 0 0 1 0 7M12 6a9 9 0 0 1 0 12M16 3.5a13 13 0 0 1 0 17" />
              </svg>
            </div>
            <span className="hb-dfn-chip-i" />
            <p className="hb-dfn-cc-n">•••• •••• •••• 4821</p>
            <div className="hb-dfn-cc-b">
              <div>
                <small>Card holder</small>
                <span>{owner.toUpperCase()}</span>
              </div>
              <div>
                <small>Expires</small>
                <span>09/29</span>
              </div>
              <span className="hb-dfn-cc-m">
                <i />
                <i />
              </span>
            </div>
          </div>
        </div>

        <div className="hb-dfn-row">
          <div className="hb-dfn-card" style={{ "--d": 2 } as React.CSSProperties}>
            <div className="hb-dfn-card-h">
              <div>
                <h3 className="hb-dfn-card-t">Income vs expenses</h3>
                <p className="hb-dfn-card-s">Last {n} months</p>
              </div>
              <div className="hb-dfn-seg" role="group" aria-label="Range">
                {RANGE_KEYS.map((r) => (
                  <button key={r} type="button" aria-pressed={current === r} onClick={() => pick(r)}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="hb-dfn-sum">
              <div className="hb-dfn-sum-i">
                Income
                <b>{mask(usd(totalIn, 0))}</b>
              </div>
              <div className="hb-dfn-sum-i">
                Expenses
                <b>{mask(usd(totalOut, 0))}</b>
              </div>
              <div className="hb-dfn-sum-i">
                Net saved
                <b style={{ color: "#4ade80" }}>{mask(`+${usd(totalIn - totalOut, 0)}`)}</b>
              </div>
              <div className="hb-dfn-legend-k" style={{ marginLeft: "auto", alignSelf: "flex-end" }}>
                <span style={{ "--c": "var(--a)" } as React.CSSProperties}>
                  <i />
                  Income
                </span>
                <span style={{ "--c": "#8791a8" } as React.CSSProperties}>
                  <i />
                  Expenses
                </span>
              </div>
            </div>
            <div className="hb-dfn-gb" style={{ "--n": n } as React.CSSProperties}>
              <div className="hb-dfn-yl" aria-hidden="true">
                {Array.from({ length: ticks + 1 }, (_, k) => (
                  <span key={k} style={{ bottom: `${((k / ticks) * 100).toFixed(2)}%` }}>
                    {k === 0 ? "0" : `${k * 2}K`}
                  </span>
                ))}
              </div>
              <div className="hb-dfn-plot" onPointerLeave={() => setHover(null)}>
                {Array.from({ length: ticks + 1 }, (_, k) => (
                  <div key={k} className="hb-dfn-gl" style={{ bottom: `${((k / ticks) * 100).toFixed(2)}%` }} />
                ))}
                <div className="hb-dfn-cols" key={current}>
                  {months.map((m, i) => (
                    <button
                      key={m}
                      type="button"
                      className="hb-dfn-col"
                      data-on={hover === i}
                      aria-label={`${m}: income ${usd(income[i], 0)}, expenses ${usd(expenses[i], 0)}`}
                      onPointerEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                    >
                      <span className="hb-dfn-bar" data-k="in" style={{ height: `${((income[i] / top) * 100).toFixed(2)}%`, "--i": i } as React.CSSProperties} />
                      <span className="hb-dfn-bar" data-k="out" style={{ height: `${((expenses[i] / top) * 100).toFixed(2)}%`, "--i": i } as React.CSSProperties} />
                    </button>
                  ))}
                </div>
                {hover !== null && hp !== null ? (
                  <div className="hb-dfn-tt" style={{ top: 4, left: `${hp.toFixed(2)}%`, transform: hp > 62 ? "translateX(calc(-100% - 22px))" : "translateX(22px)" }}>
                    <div className="hb-dfn-tt-d">{months[hover]}</div>
                    <div>
                      Income <b>{mask(usd(income[hover], 0))}</b>
                    </div>
                    <div>
                      Expenses <b>{mask(usd(expenses[hover], 0))}</b>
                    </div>
                    <div>
                      Saved <b style={{ color: "#4ade80" }}>{mask(usd(income[hover] - expenses[hover], 0))}</b>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="hb-dfn-xl" aria-hidden="true">
                {months.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="hb-dfn-card" style={{ "--d": 3 } as React.CSSProperties}>
            <div className="hb-dfn-card-h">
              <div>
                <h3 className="hb-dfn-card-t">Spending by category</h3>
                <p className="hb-dfn-card-s">October</p>
              </div>
            </div>
            <div className="hb-dfn-donut">
              <svg viewBox="0 0 42 42" role="img" aria-label="Spending by category">
                <circle className="hb-dfn-donut-t" cx="21" cy="21" r="15.9155" />
                {arcs.map((s, i) => (
                  <circle
                    key={s.name}
                    className="hb-dfn-donut-s"
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
              <div className="hb-dfn-donut-c">
                <strong>{mask(hot === null ? usd(spent, 0) : usd(CATEGORIES[hot].amount, 0))}</strong>
                <span>{hot === null ? "spent" : CATEGORIES[hot].name}</span>
              </div>
            </div>
            <ul className="hb-dfn-cat">
              {arcs.map((s, i) => (
                <li key={s.name} onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)}>
                  <i style={{ background: s.color }} />
                  <span>{s.name}</span>
                  <b>{mask(usd(s.amount, 0))}</b>
                  <em>{s.share.toFixed(0)}%</em>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hb-dfn-row-b">
          <div className="hb-dfn-card" style={{ "--d": 4 } as React.CSSProperties}>
            <div className="hb-dfn-card-h">
              <div>
                <h3 className="hb-dfn-card-t">Recent transactions</h3>
                <p className="hb-dfn-card-s">Across all accounts</p>
              </div>
              <button type="button" className="hb-dfn-btn">
                View all
                <Ico n="chevr" />
              </button>
            </div>
            <ul className="hb-dfn-tx">
              {TRANSACTIONS.map((t) => (
                <li key={t.name}>
                  <span className="hb-dfn-tx-i" style={{ "--c": t.color } as React.CSSProperties}>
                    <Ico n={t.icon} />
                  </span>
                  <div className="hb-dfn-tx-n">
                    <strong>{t.name}</strong>
                    <span>{t.note}</span>
                  </div>
                  <span className="hb-dfn-tx-a" data-in={t.amount > 0}>
                    {mask(`${t.amount > 0 ? "+" : "-"}${usd(t.amount)}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hb-dfn-card" style={{ "--d": 5 } as React.CSSProperties}>
            <div className="hb-dfn-card-h">
              <div>
                <h3 className="hb-dfn-card-t">Savings goals</h3>
                <p className="hb-dfn-card-s">Add a little each week</p>
              </div>
            </div>
            <ul className="hb-dfn-goals">
              {GOALS.map((g, i) => {
                const saved = g.saved + added[i];
                const ratio = (saved / g.target) * 100;
                return (
                  <li className="hb-dfn-goal" key={g.name} style={{ "--c": g.color } as React.CSSProperties}>
                    <div className="hb-dfn-goal-r">
                      {g.name}
                      <span>
                        {mask(usd(saved, 0))} of {mask(usd(g.target, 0))}
                      </span>
                    </div>
                    <div className="hb-dfn-goal-b" role="progressbar" aria-valuenow={Math.round(ratio)} aria-valuemin={0} aria-valuemax={100} aria-label={g.name}>
                      <i style={{ "--w": `${ratio.toFixed(1)}%` } as React.CSSProperties} />
                    </div>
                    <div className="hb-dfn-goal-f">
                      <span>{ratio >= 100 ? "Goal reached" : `${ratio.toFixed(0)}% complete`}</span>
                      <button type="button" className="hb-dfn-mini" disabled={saved >= g.target} onClick={() => bump(i)} aria-label={`Add $50 to ${g.name}`}>
                        + $50
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Shell>
    </div>
  );
}
