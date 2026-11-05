"use client";

import * as React from "react";

export type CryptoRange = "24H" | "7D" | "30D" | "1Y";

export interface CryptoHolding {
  symbol: string;
  name: string;
  amount: number;
  price: number;
  change: number;
  color: string;
}

export interface DashboardCryptoProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  brand?: string;
  user?: string;
  currency?: string;
  holdings?: CryptoHolding[];
  range?: CryptoRange;
  defaultRange?: CryptoRange;
  onRangeChange?: (range: CryptoRange) => void;
  asset?: string;
  defaultAsset?: string;
  onAssetChange?: (symbol: string) => void;
}

const css = `
.hb-yd1 {
  --a: #f5b544;
  --hb-yd1-up: #34d399;
  --hb-yd1-down: #f87171;
  container: hb-yd1 / inline-size;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #202326;
  border-radius: 18px;
  background:
    radial-gradient(900px 420px at 100% -10%, color-mix(in srgb, var(--a) 10%, transparent), transparent 60%),
    radial-gradient(700px 380px at -10% 110%, rgba(52, 211, 153, .05), transparent 60%),
    #07090b;
  color: #ececec;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  overflow: hidden;
  position: relative;
  -webkit-font-smoothing: antialiased;
}
.hb-yd1 *, .hb-yd1 *::before, .hb-yd1 *::after { box-sizing: border-box; }
.hb-yd1 button, .hb-yd1 input { font: inherit; color: inherit; }
.hb-yd1 button:focus-visible, .hb-yd1 input:focus-visible, .hb-yd1 [tabindex]:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }
.hb-yd1-num { font-family: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace; font-variant-numeric: tabular-nums; letter-spacing: -.01em; }
.hb-yd1-app { display: grid; grid-template-columns: 68px minmax(0, 1fr); min-height: 680px; }
.hb-yd1-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 0;
  padding: 16px 0;
  border-right: 1px solid rgba(255, 255, 255, .06);
  background: rgba(10, 12, 14, .7);
}
.hb-yd1-logo {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin-bottom: 14px;
  border-radius: 11px;
  background: conic-gradient(from 210deg, var(--a), color-mix(in srgb, var(--a) 40%, #ffffff), var(--a));
  color: #120d02;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .12) inset, 0 8px 24px -8px var(--a);
}
.hb-yd1-rbtn {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #7c8086;
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.hb-yd1-rbtn:hover { background: rgba(255, 255, 255, .05); color: #ececec; }
.hb-yd1-rbtn[aria-current="page"] { background: color-mix(in srgb, var(--a) 14%, transparent); color: var(--a); }
.hb-yd1-rbtn[aria-current="page"]::before {
  content: "";
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: -14px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--a);
}
.hb-yd1-rail-foot { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: auto; }
.hb-yd1-av { display: grid; place-items: center; flex: none; border-radius: 50%; color: #ffffff; font-size: 11px; font-weight: 600; }
.hb-yd1-main { display: flex; flex-direction: column; min-width: 0; }
.hb-yd1-top { display: flex; align-items: center; gap: 12px; padding: 18px 24px 14px; }
.hb-yd1-ttl { min-width: 0; margin-right: auto; }
.hb-yd1-ttl h2 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -.02em; }
.hb-yd1-ttl p { margin: 2px 0 0; overflow: hidden; color: #868a90; font-size: 12.5px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd1-search { position: relative; width: 220px; color: #6c7076; }
.hb-yd1-search svg { position: absolute; top: 50%; left: 11px; width: 15px; height: 15px; transform: translateY(-50%); pointer-events: none; }
.hb-yd1-search input {
  width: 100%;
  height: 36px;
  padding: 0 12px 0 34px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  font-size: 13px;
  transition: border-color .15s ease, background .15s ease;
}
.hb-yd1-search input::placeholder { color: #6c7076; }
.hb-yd1-search input:focus-visible { border-color: var(--a); outline-offset: 0; }
.hb-yd1-ibtn {
  display: grid;
  place-items: center;
  flex: none;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: #a3a7ad;
  cursor: pointer;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.hb-yd1-ibtn:hover { border-color: rgba(255, 255, 255, .16); color: #ffffff; }
.hb-yd1-ibtn[aria-pressed="true"] { border-color: color-mix(in srgb, var(--a) 50%, transparent); color: var(--a); }
.hb-yd1-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  height: 36px;
  padding: 0 16px 0 12px;
  border: 0;
  border-radius: 999px;
  background: var(--a);
  color: #120d02;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .2) inset, 0 6px 20px -8px var(--a);
  transition: filter .15s ease, transform .15s ease;
}
.hb-yd1-cta:hover { filter: brightness(1.08); }
.hb-yd1-cta:active { transform: translateY(1px); }
.hb-yd1-ico { display: block; flex: none; width: 16px; height: 16px; }
.hb-yd1-tick {
  position: relative;
  display: flex;
  margin: 0 24px;
  border-top: 1px solid rgba(255, 255, 255, .06);
  border-bottom: 1px solid rgba(255, 255, 255, .06);
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}
.hb-yd1-tick-track { display: flex; flex: none; animation: hb-yd1-marq 38s linear infinite; }
.hb-yd1-tick:hover .hb-yd1-tick-track { animation-play-state: paused; }
.hb-yd1-tick-copy { display: flex; flex: none; }
.hb-yd1-tick-i { display: flex; align-items: center; gap: 10px; flex: none; padding: 10px 22px; border-right: 1px solid rgba(255, 255, 255, .05); font-size: 12px; white-space: nowrap; }
.hb-yd1-tick-i b { font-weight: 600; letter-spacing: .02em; }
.hb-yd1-tick-i span { color: #b9bdc2; }
.hb-yd1-tick-i em { font-style: normal; font-weight: 600; }
.hb-yd1-tick-i svg { width: 44px; height: 16px; }
.hb-yd1 [data-dir="up"] { color: var(--hb-yd1-up); }
.hb-yd1 [data-dir="down"] { color: var(--hb-yd1-down); }
.hb-yd1-content { display: flex; flex-direction: column; gap: 16px; min-width: 0; padding: 18px 24px 24px; }
.hb-yd1-row { display: grid; grid-template-columns: minmax(0, 1.75fr) minmax(0, 1fr); gap: 16px; }
.hb-yd1-card {
  position: relative;
  min-width: 0;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .035), rgba(255, 255, 255, .012));
  box-shadow: 0 1px 0 rgba(255, 255, 255, .05) inset;
  animation: hb-yd1-rise .6s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: calc(var(--d, 0) * 70ms);
}
.hb-yd1-ch { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
.hb-yd1-ct { margin: 0; font-size: 13px; font-weight: 600; }
.hb-yd1-cs { margin: 2px 0 0; color: #7c8086; font-size: 12px; }
.hb-yd1-bal { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 18px; }
.hb-yd1-bal-l { min-width: 0; }
.hb-yd1-eyebrow { display: flex; align-items: center; gap: 8px; color: #868a90; font-size: 12px; }
.hb-yd1-big { margin: 8px 0 6px; font-size: 40px; font-weight: 600; letter-spacing: -.04em; line-height: 1; white-space: nowrap; }
.hb-yd1-big small { color: #6c7076; font-size: 24px; letter-spacing: -.02em; }
.hb-yd1-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
}
.hb-yd1-pill[data-dir="up"] { background: rgba(52, 211, 153, .12); }
.hb-yd1-pill[data-dir="down"] { background: rgba(248, 113, 113, .12); }
.hb-yd1-pill svg { width: 11px; height: 11px; }
.hb-yd1-bal-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; color: #868a90; font-size: 12.5px; }
.hb-yd1-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; margin-top: 18px; border: 1px solid rgba(255, 255, 255, .06); border-radius: 12px; background: rgba(255, 255, 255, .06); overflow: hidden; }
.hb-yd1-stat { min-width: 0; padding: 10px 12px; background: #0b0d10; }
.hb-yd1-stat span { display: block; color: #7c8086; font-size: 11.5px; }
.hb-yd1-stat b { display: block; margin-top: 3px; overflow: hidden; font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd1-acts { display: flex; flex-direction: column; gap: 8px; }
.hb-yd1-act {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 14px 0 10px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 10px;
  background: rgba(255, 255, 255, .03);
  color: #d6d9dd;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color .15s ease, background .15s ease;
}
.hb-yd1-act:hover { border-color: rgba(255, 255, 255, .18); background: rgba(255, 255, 255, .06); }
.hb-yd1-act svg { width: 15px; height: 15px; color: var(--a); }
.hb-yd1-bspark { display: block; width: calc(100% + 36px); height: 84px; margin: 16px -18px -18px; color: var(--a); animation: hb-yd1-wipe 1.1s .2s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd1-bspark path:last-child { fill: none; stroke: currentColor; stroke-width: 1.8; vector-effect: non-scaling-stroke; }
.hb-yd1-donut { position: relative; width: 156px; height: 156px; margin: 4px auto 14px; }
.hb-yd1-donut svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-yd1-donut circle { fill: none; stroke-width: 4.2; }
.hb-yd1-dseg { cursor: pointer; transition: opacity .2s ease, stroke-width .2s ease; animation: hb-yd1-arc 1s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd1-dseg[data-hot="true"] { stroke-width: 5.4; }
.hb-yd1-dseg[data-dim="true"] { opacity: .28; }
.hb-yd1-dc { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; text-align: center; }
.hb-yd1-dc strong { font-size: 19px; font-weight: 600; letter-spacing: -.02em; }
.hb-yd1-dc span { color: #7c8086; font-size: 11px; }
.hb-yd1-leg { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px 10px; margin: 0; padding: 0; list-style: none; }
.hb-yd1-leg button {
  display: grid;
  grid-template-columns: 8px minmax(0, 1fr) auto;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 5px 6px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #b9bdc2;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}
.hb-yd1-leg button:hover, .hb-yd1-leg button[aria-pressed="true"] { background: rgba(255, 255, 255, .05); color: #ffffff; }
.hb-yd1-leg i { width: 8px; height: 8px; border-radius: 50%; }
.hb-yd1-leg em { color: #7c8086; font-style: normal; }
.hb-yd1-seg { display: inline-flex; padding: 3px; border: 1px solid rgba(255, 255, 255, .07); border-radius: 999px; background: rgba(0, 0, 0, .35); }
.hb-yd1-seg button {
  height: 26px;
  padding: 0 11px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #868a90;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.hb-yd1-seg button:hover { color: #ffffff; }
.hb-yd1-seg button[aria-pressed="true"] { background: rgba(255, 255, 255, .1); color: #ffffff; }
.hb-yd1-pair { display: flex; align-items: center; gap: 10px; min-width: 0; }
.hb-yd1-coin { display: grid; place-items: center; flex: none; width: 30px; height: 30px; border-radius: 50%; color: #ffffff; font-size: 10px; font-weight: 700; letter-spacing: .02em; box-shadow: 0 0 0 1px rgba(255, 255, 255, .14) inset; }
.hb-yd1-pair-p { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px; }
.hb-yd1-pair-p b { font-size: 18px; font-weight: 600; }
.hb-yd1-chart { display: grid; grid-template-columns: minmax(0, 1fr) 64px; grid-template-rows: 250px auto; }
.hb-yd1-plot { position: relative; cursor: crosshair; touch-action: pan-y; }
.hb-yd1-plot > svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-yd1-gl { stroke: rgba(255, 255, 255, .05); stroke-width: 1; vector-effect: non-scaling-stroke; }
.hb-yd1-cdl { transform-box: fill-box; transform-origin: center; animation: hb-yd1-grow .5s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd1-cdl line { stroke-width: 1; vector-effect: non-scaling-stroke; }
.hb-yd1-cdl[data-dir="up"] rect, .hb-yd1-cdl[data-dir="up"] line { fill: var(--hb-yd1-up); stroke: var(--hb-yd1-up); }
.hb-yd1-cdl[data-dir="down"] rect, .hb-yd1-cdl[data-dir="down"] line { fill: var(--hb-yd1-down); stroke: var(--hb-yd1-down); }
.hb-yd1-cdl rect { stroke-width: 0; }
.hb-yd1-cdl[data-hot="true"] rect { filter: brightness(1.35); }
.hb-yd1-vol { transform-box: fill-box; transform-origin: bottom; animation: hb-yd1-grow .6s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd1-vol[data-dir="up"] { fill: rgba(52, 211, 153, .22); }
.hb-yd1-vol[data-dir="down"] { fill: rgba(248, 113, 113, .22); }
.hb-yd1-last { stroke: var(--a); stroke-width: 1; stroke-dasharray: 3 3; vector-effect: non-scaling-stroke; }
.hb-yd1-yax { position: relative; }
.hb-yd1-yax span { position: absolute; left: 10px; color: #6c7076; font-size: 11px; transform: translateY(-50%); }
.hb-yd1-ytag { position: absolute; left: 6px; padding: 2px 6px; border-radius: 5px; background: var(--a); color: #120d02 !important; font-size: 11px; font-weight: 600; transform: translateY(-50%); }
.hb-yd1-xax { display: flex; justify-content: space-between; padding-top: 8px; color: #6c7076; font-size: 11px; }
.hb-yd1-cross { position: absolute; top: 0; bottom: 0; width: 1px; background: rgba(255, 255, 255, .22); pointer-events: none; }
.hb-yd1-tt {
  position: absolute;
  top: 6px;
  z-index: 3;
  display: grid;
  grid-template-columns: auto auto;
  gap: 2px 12px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 10px;
  background: rgba(14, 16, 19, .95);
  box-shadow: 0 16px 36px -10px rgba(0, 0, 0, .8);
  font-size: 11.5px;
  white-space: nowrap;
  pointer-events: none;
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}
.hb-yd1-tt-d { grid-column: 1 / -1; margin-bottom: 3px; color: #868a90; }
.hb-yd1-tt span { color: #7c8086; }
.hb-yd1-tt b { font-weight: 600; text-align: right; }
.hb-yd1-feed { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-yd1-feed li { display: grid; grid-template-columns: 32px minmax(0, 1fr) auto; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid rgba(255, 255, 255, .05); animation: hb-yd1-rise .5s cubic-bezier(.2, .7, .2, 1) both; }
.hb-yd1-feed li:first-child { border-top: 0; padding-top: 0; }
.hb-yd1-fi { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 10px; background: rgba(255, 255, 255, .05); color: #b9bdc2; }
.hb-yd1-fi[data-k="buy"] { background: rgba(52, 211, 153, .12); color: var(--hb-yd1-up); }
.hb-yd1-fi[data-k="sell"] { background: rgba(248, 113, 113, .12); color: var(--hb-yd1-down); }
.hb-yd1-fi[data-k="stake"] { background: color-mix(in srgb, var(--a) 14%, transparent); color: var(--a); }
.hb-yd1-fi svg { width: 15px; height: 15px; }
.hb-yd1-ft { min-width: 0; }
.hb-yd1-ft b { display: block; overflow: hidden; font-size: 12.5px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd1-ft span { color: #6c7076; font-size: 11.5px; }
.hb-yd1-fv { text-align: right; font-size: 12.5px; }
.hb-yd1-fv span { display: block; color: #6c7076; font-size: 11px; }
.hb-yd1-tbl { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.hb-yd1-tbl th { padding: 0 10px 10px; color: #6c7076; font-size: 11.5px; font-weight: 500; text-align: right; white-space: nowrap; }
.hb-yd1-tbl th:first-child, .hb-yd1-tbl td:first-child { padding-left: 0; text-align: left; }
.hb-yd1-tbl th:last-child, .hb-yd1-tbl td:last-child { padding-right: 0; }
.hb-yd1-tbl th button { display: inline-flex; align-items: center; gap: 4px; padding: 0; border: 0; background: none; color: inherit; font-size: inherit; font-weight: inherit; cursor: pointer; }
.hb-yd1-tbl th button:hover, .hb-yd1-tbl th[aria-sort] button { color: #ececec; }
.hb-yd1-tbl th svg { width: 11px; height: 11px; }
.hb-yd1-tbl td { padding: 10px; border-top: 1px solid rgba(255, 255, 255, .05); text-align: right; white-space: nowrap; }
.hb-yd1-tbl tbody tr { cursor: pointer; transition: background .15s ease; }
.hb-yd1-tbl tbody tr:hover { background: rgba(255, 255, 255, .025); }
.hb-yd1-tbl tbody tr[data-on="true"] { background: color-mix(in srgb, var(--a) 7%, transparent); }
.hb-yd1-tbl tbody tr[data-on="true"] td:first-child { box-shadow: inset 2px 0 0 var(--a); }
.hb-yd1-asset { display: flex; align-items: center; gap: 10px; padding: 0 0 0 8px; border: 0; background: none; text-align: left; cursor: pointer; }
.hb-yd1-asset b { display: block; font-size: 13px; font-weight: 600; }
.hb-yd1-asset span { display: block; color: #6c7076; font-size: 11.5px; }
.hb-yd1-alloc { display: inline-flex; align-items: center; gap: 8px; }
.hb-yd1-alloc i { position: relative; display: block; width: 64px; height: 5px; border-radius: 999px; background: rgba(255, 255, 255, .07); overflow: hidden; }
.hb-yd1-alloc i::after { content: ""; position: absolute; inset: 0 auto 0 0; width: var(--w); border-radius: inherit; background: var(--c); transform-origin: left; animation: hb-yd1-bar .9s cubic-bezier(.3, .7, .2, 1) both; animation-delay: inherit; }
.hb-yd1-msp { display: inline-block; width: 72px; height: 22px; vertical-align: middle; }
.hb-yd1-msp path { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; vector-effect: non-scaling-stroke; }
.hb-yd1-mask { letter-spacing: .12em; }
@keyframes hb-yd1-rise { from { opacity: 0; transform: translate3d(0, 10px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-yd1-wipe { from { clip-path: inset(-6px 100% -6px -6px); } to { clip-path: inset(-6px -6px -6px -6px); } }
@keyframes hb-yd1-grow { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
@keyframes hb-yd1-arc { from { stroke-dasharray: 0 100; } }
@keyframes hb-yd1-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-yd1-marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@container hb-yd1 (max-width: 979px) {
  .hb-yd1-row { grid-template-columns: minmax(0, 1fr); }
  .hb-yd1-hide-md { display: none; }
}
@container hb-yd1 (max-width: 759px) {
  .hb-yd1-app { grid-template-columns: minmax(0, 1fr); min-height: 0; }
  .hb-yd1-rail { flex-direction: row; padding: 10px 14px; border-right: 0; border-bottom: 1px solid rgba(255, 255, 255, .06); overflow-x: auto; }
  .hb-yd1-logo { margin: 0 8px 0 0; }
  .hb-yd1-rbtn[aria-current="page"]::before { top: auto; right: 10px; bottom: -11px; left: 10px; width: auto; height: 3px; border-radius: 3px 3px 0 0; }
  .hb-yd1-rail-foot { flex-direction: row; margin: 0 0 0 auto; }
  .hb-yd1-search { display: none; }
  .hb-yd1-top { flex-wrap: wrap; padding: 16px; }
  .hb-yd1-tick { margin: 0 16px; }
  .hb-yd1-content { padding: 16px; }
  .hb-yd1-bal { grid-template-columns: minmax(0, 1fr); }
  .hb-yd1-acts { flex-direction: row; flex-wrap: wrap; }
  .hb-yd1-hide-sm { display: none; }
}
@container hb-yd1 (max-width: 479px) {
  .hb-yd1-big { font-size: 30px; }
  .hb-yd1-big small { font-size: 18px; }
  .hb-yd1-stats { grid-template-columns: minmax(0, 1fr); }
  .hb-yd1-hide-xs { display: none; }
  .hb-yd1-chart { grid-template-columns: minmax(0, 1fr) 52px; grid-template-rows: 200px auto; }
  .hb-yd1-rail-foot .hb-yd1-rbtn { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yd1 *, .hb-yd1 *::before, .hb-yd1 *::after { animation: none !important; transition: none !important; }
}
`;

function hash(n: number) {
  let x = Math.imul(n + 1, 2654435761) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519) >>> 0;
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

function seedOf(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 100000;
}

type Pt = [number, number];

function smooth(pts: Pt[]) {
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(2)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(2)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(2)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

function project(values: number[], w: number, h: number, pad: number): Pt[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v, i) => [(i / Math.max(1, values.length - 1)) * w, pad + (1 - (v - min) / span) * (h - pad * 2)]);
}

function walk(seed: number, n: number, last: number, vol: number) {
  const out: number[] = [];
  let v = 100;
  for (let i = 0; i < n; i++) {
    v *= 1 + (hash(seed + i * 7) - 0.47) * vol;
    out.push(v);
  }
  const k = last / out[n - 1];
  return out.map((x) => x * k);
}

interface Candle {
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

function makeCandles(seed: number, n: number, last: number, vol: number): Candle[] {
  const opens: number[] = [];
  const closes: number[] = [];
  const rets: number[] = [];
  let v = 100;
  for (let i = 0; i < n; i++) {
    const r = (hash(seed + i * 7) - 0.47) * vol;
    rets.push(r);
    opens.push(v);
    v *= 1 + r;
    closes.push(v);
  }
  const k = last / closes[n - 1];
  return closes.map((c, i) => {
    const o = opens[i] * k;
    const cc = c * k;
    return {
      o,
      c: cc,
      h: Math.max(o, cc) * (1 + hash(seed + i * 13 + 5) * vol * 0.55),
      l: Math.min(o, cc) * (1 - hash(seed + i * 17 + 9) * vol * 0.55),
      v: 0.25 + hash(seed + i * 19 + 3) * 0.55 + Math.min(0.2, Math.abs(rets[i]) / vol / 3),
    };
  });
}

const MLEN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MNAME = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DNAME = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function stamp(minutesBack: number) {
  const total = 14 * 60 - minutesBack;
  const dayShift = Math.floor(total / 1440);
  const minute = total - dayShift * 1440;
  let m = 10;
  let y = 2026;
  let d = 4 + dayShift;
  while (d < 1) {
    m--;
    if (m < 0) {
      m = 11;
      y--;
    }
    d += MLEN[m];
  }
  const dow = (((3 + dayShift) % 7) + 7) % 7;
  const hh = String(Math.floor(minute / 60)).padStart(2, "0");
  const mm = String(minute % 60).padStart(2, "0");
  return { m, d, y, dow, time: `${hh}:${mm}` };
}

const RANGES: Record<CryptoRange, { n: number; step: number; vol: number; label: string }> = {
  "24H": { n: 48, step: 30, vol: 0.007, label: "30m candles" },
  "7D": { n: 42, step: 240, vol: 0.016, label: "4h candles" },
  "30D": { n: 30, step: 1440, vol: 0.032, label: "Daily candles" },
  "1Y": { n: 52, step: 10080, vol: 0.075, label: "Weekly candles" },
};
const RANGE_KEYS: CryptoRange[] = ["24H", "7D", "30D", "1Y"];

function axisLabel(r: CryptoRange, back: number) {
  const s = stamp(back * RANGES[r].step);
  if (r === "24H") return s.time;
  if (r === "7D") return `${DNAME[s.dow]} ${s.d}`;
  if (r === "30D") return `${MNAME[s.m]} ${s.d}`;
  return `${MNAME[s.m]} ${String(s.y).slice(2)}`;
}

function tipLabel(r: CryptoRange, back: number) {
  const s = stamp(back * RANGES[r].step);
  if (r === "1Y") return `Week of ${MNAME[s.m]} ${s.d}, ${s.y}`;
  if (r === "30D") return `${DNAME[s.dow]}, ${MNAME[s.m]} ${s.d}`;
  return `${MNAME[s.m]} ${s.d}, ${s.time}`;
}

const DEFAULT_HOLDINGS: CryptoHolding[] = [
  { symbol: "HLCN", name: "Halcyon", amount: 1.842, price: 48210.55, change: 2.84, color: "#f5b544" },
  { symbol: "MRDN", name: "Meridian", amount: 24.15, price: 2904.12, change: -1.37, color: "#8b7cff" },
  { symbol: "TSRA", name: "Tessera", amount: 310.5, price: 142.78, change: 6.12, color: "#22d3ee" },
  { symbol: "QUIL", name: "Quill", amount: 52000, price: 0.3815, change: 11.4, color: "#f472b6" },
  { symbol: "EMBR", name: "Ember", amount: 1250, price: 8.64, change: -4.71, color: "#fb7185" },
  { symbol: "CRVD", name: "Corvid Dollar", amount: 8420, price: 1.0004, change: 0.02, color: "#34d399" },
];

const TICKER_EXTRA = [
  { symbol: "PYLN", price: 23.41, change: 3.9 },
  { symbol: "SABL", price: 0.0841, change: -2.2 },
  { symbol: "VIRO", price: 611.2, change: 1.15 },
  { symbol: "KSTL", price: 4.072, change: -0.84 },
];

const FEED = [
  { k: "buy", title: "Bought 0.120 HLCN", sub: "Limit order filled", value: "+$5,785.27", meta: "4 min ago" },
  { k: "stake", title: "Staked 120 TSRA", sub: "Validator Northgate, 6.8% APR", value: "$17,133.60", meta: "1 h ago" },
  { k: "recv", title: "Received 2,400 CRVD", sub: "From 0x7a3f...91c2", value: "+$2,400.96", meta: "3 h ago" },
  { k: "sell", title: "Sold 300 EMBR", sub: "Market order", value: "-$2,592.00", meta: "Yesterday" },
  { k: "swap", title: "Swapped MRDN to QUIL", sub: "1.2 MRDN for 9,134 QUIL", value: "$3,484.94", meta: "Nov 2" },
];

const icons: Record<string, string[]> = {
  home: ["M3 11l9-7 9 7", "M5 10v10h14V10"],
  wallet: ["M3 7a2 2 0 0 1 2-2h13v4", "M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z", "M16 14.5h.01"],
  chart: ["M3 3v18h18", "M7 15l4-4 3 3 5-6"],
  swap: ["M7 4L3 8l4 4", "M3 8h14", "M17 20l4-4-4-4", "M21 16H7"],
  layers: ["M12 3l9 5-9 5-9-5 9-5z", "M3 13l9 5 9-5"],
  gear: ["M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.7 21a2 2 0 0 1-3.4 0"],
  search: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.3-4.3"],
  eye: ["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  eyeoff: ["M3 3l18 18", "M10.6 6.1A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9", "M6.6 7.6A17 17 0 0 0 2 12s3.5 6 10 6a9.7 9.7 0 0 0 4.4-1"],
  up: ["M7 17L17 7", "M8 7h9v9"],
  down: ["M17 7L7 17", "M16 17H7V8"],
  plus: ["M12 5v14", "M5 12h14"],
  send: ["M22 2L11 13", "M22 2l-7 20-4-9-9-4 20-7z"],
  recv: ["M12 4v12", "M6 10l6 6 6-6", "M4 20h16"],
  sort: ["M8 10l4-4 4 4", "M8 14l4 4 4-4"],
  sortd: ["M8 10l4 4 4-4"],
  sortu: ["M8 14l4-4 4 4"],
};

function Ico({ n, className = "hb-yd1-ico" }: { n: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(icons[n] ?? []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function fmtPrice(n: number, cur: string) {
  const digits = n >= 1 ? 2 : 4;
  return `${cur}${n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

function fmtMoney(n: number, cur: string) {
  const sign = n < 0 ? "-" : "";
  return `${sign}${cur}${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtAmount(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: n >= 100 ? 0 : 3 });
}

function Change({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span className="hb-yd1-pill hb-yd1-num" data-dir={up ? "up" : "down"}>
      <Ico n={up ? "up" : "down"} className="" />
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}

function MiniSpark({ values, className }: { values: number[]; className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
      <path d={smooth(project(values, 100, 30, 3))} />
    </svg>
  );
}

const NAV = [
  { id: "home", label: "Overview", icon: "home" },
  { id: "wallet", label: "Wallets", icon: "wallet" },
  { id: "markets", label: "Markets", icon: "chart" },
  { id: "swap", label: "Swap", icon: "swap" },
  { id: "earn", label: "Staking", icon: "layers" },
];

type SortKey = "value" | "change" | "price";

export function DashboardCrypto({
  accent = "#f5b544",
  brand = "Vaultline",
  user = "Kenji Watanabe",
  currency = "$",
  holdings = DEFAULT_HOLDINGS,
  range,
  defaultRange = "7D",
  onRangeChange,
  asset,
  defaultAsset,
  onAssetChange,
  className = "",
  style,
  ...rest
}: DashboardCryptoProps) {
  const uid = React.useId().replace(/:/g, "");
  const [innerRange, setInnerRange] = React.useState<CryptoRange>(defaultRange);
  const [innerAsset, setInnerAsset] = React.useState<string>(defaultAsset ?? holdings[0]?.symbol ?? "");
  const [nav, setNav] = React.useState("home");
  const [masked, setMasked] = React.useState(false);
  const [hover, setHover] = React.useState<number | null>(null);
  const [hot, setHot] = React.useState<number | null>(null);
  const [sort, setSort] = React.useState<{ key: SortKey; desc: boolean }>({ key: "value", desc: true });

  const r = range ?? innerRange;
  const sym = asset ?? innerAsset;
  const cfg = RANGES[r];
  const sel = holdings.find((h) => h.symbol === sym) ?? holdings[0];

  const pickRange = (next: CryptoRange) => {
    setInnerRange(next);
    setHover(null);
    onRangeChange?.(next);
  };
  const pickAsset = (next: string) => {
    setInnerAsset(next);
    setHover(null);
    onAssetChange?.(next);
  };

  const rows = holdings.map((h) => {
    const value = h.amount * h.price;
    return { ...h, value, prev: value / (1 + h.change / 100), week: walk(seedOf(h.symbol) + 71, 28, h.price, 0.05) };
  });
  const total = rows.reduce((t, h) => t + h.value, 0);
  const prevTotal = rows.reduce((t, h) => t + h.prev, 0);
  const dayPl = total - prevTotal;
  const dayPct = (dayPl / prevTotal) * 100;
  const balSeries = walk(9137, 64, total, 0.018);
  const weekAgo = balSeries[0];

  const sorted = [...rows].sort((a, b) => (sort.desc ? b[sort.key] - a[sort.key] : a[sort.key] - b[sort.key]));
  const toggleSort = (key: SortKey) => setSort((s) => (s.key === key ? { key, desc: !s.desc } : { key, desc: true }));

  const shares = rows.map((h) => (h.value / total) * 100);
  const arcs = rows.map((h, i) => ({
    color: h.color,
    len: Math.max(shares[i] - 1.4, 0.4),
    offset: shares.slice(0, i).reduce((t, x) => t + x, 0) + 0.7,
  }));

  const candles = sel ? makeCandles(seedOf(sel.symbol + r), cfg.n, sel.price, cfg.vol) : [];
  const hi = Math.max(...candles.map((c) => c.h));
  const lo = Math.min(...candles.map((c) => c.l));
  const pad = (hi - lo) * 0.08;
  const top = hi + pad;
  const bot = lo - pad;
  const y = (v: number) => 2 + (1 - (v - bot) / (top - bot)) * 72;
  const slot = 100 / cfg.n;
  const rangeChange = candles.length ? ((candles[candles.length - 1].c - candles[0].o) / candles[0].o) * 100 : 0;
  const ticks = Array.from({ length: 5 }, (_, k) => bot + ((top - bot) * (4 - k + 0.5)) / 5);
  const xs = Array.from({ length: 5 }, (_, k) => Math.round((k * (cfg.n - 1)) / 4));
  const hc = hover === null ? null : candles[hover];

  const moveTo = (e: React.PointerEvent<HTMLDivElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    setHover(Math.max(0, Math.min(cfg.n - 1, Math.floor(((e.clientX - b.left) / b.width) * cfg.n))));
  };
  const keyMove = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") setHover((h) => Math.min(cfg.n - 1, (h ?? -1) + 1));
    else if (e.key === "ArrowLeft") setHover((h) => Math.max(0, (h ?? cfg.n) - 1));
    else if (e.key === "Escape") setHover(null);
    else return;
    e.preventDefault();
  };

  const money = (n: number) => (masked ? <span className="hb-yd1-mask">{currency}••••••</span> : fmtMoney(n, currency));
  const [whole, cents] = fmtMoney(total, currency).split(".");
  const ticker = [
    ...rows.map((h) => ({ symbol: h.symbol, price: h.price, change: h.change, series: h.week })),
    ...TICKER_EXTRA.map((t) => ({ ...t, series: walk(seedOf(t.symbol), 24, t.price, 0.05) })),
  ];

  const vars = { "--a": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-yd1 ${className}`} style={vars} {...rest}>
      <style href="hb-dashboard-crypto" precedence="default">
        {css}
      </style>
      <div className="hb-yd1-app">
        <aside className="hb-yd1-rail" aria-label={brand}>
          <span className="hb-yd1-logo" title={brand}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2l8 5v10l-8 5-8-5V7z" />
              <path d="M12 8v8M8.5 10l3.5-2 3.5 2" />
            </svg>
          </span>
          <nav aria-label="Main" style={{ display: "contents" }}>
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className="hb-yd1-rbtn"
                aria-label={item.label}
                title={item.label}
                aria-current={nav === item.id ? "page" : undefined}
                onClick={() => setNav(item.id)}
              >
                <Ico n={item.icon} />
              </button>
            ))}
          </nav>
          <div className="hb-yd1-rail-foot">
            <button type="button" className="hb-yd1-rbtn" aria-label="Settings" title="Settings">
              <Ico n="gear" />
            </button>
            <span className="hb-yd1-av" style={{ width: 32, height: 32, background: "linear-gradient(135deg, #8b7cff, #22d3ee)" }} title={user}>
              {initials(user)}
            </span>
          </div>
        </aside>

        <div className="hb-yd1-main">
          <header className="hb-yd1-top">
            <div className="hb-yd1-ttl">
              <h2>Portfolio</h2>
              <p>
                Main wallet · {holdings.length} assets · synced 12s ago
              </p>
            </div>
            <label className="hb-yd1-search">
              <Ico n="search" />
              <input type="search" placeholder="Search assets" aria-label="Search assets" />
            </label>
            <button type="button" className="hb-yd1-ibtn" aria-label={masked ? "Show balances" : "Hide balances"} aria-pressed={masked} onClick={() => setMasked((m) => !m)}>
              <Ico n={masked ? "eyeoff" : "eye"} />
            </button>
            <button type="button" className="hb-yd1-ibtn" aria-label="Notifications">
              <Ico n="bell" />
            </button>
            <button type="button" className="hb-yd1-cta">
              <Ico n="plus" />
              Deposit
            </button>
          </header>

          <div className="hb-yd1-tick" role="region" aria-label="Market prices">
            <div className="hb-yd1-tick-track">
              {[0, 1].map((copy) => (
                <div className="hb-yd1-tick-copy" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                  {ticker.map((t) => {
                    const dir = t.change >= 0 ? "up" : "down";
                    return (
                      <div className="hb-yd1-tick-i" key={t.symbol}>
                        <b>{t.symbol}</b>
                        <span className="hb-yd1-num">{fmtPrice(t.price, currency)}</span>
                        <em className="hb-yd1-num" data-dir={dir}>
                          {t.change >= 0 ? "+" : "-"}
                          {Math.abs(t.change).toFixed(2)}%
                        </em>
                        <svg viewBox="0 0 100 30" preserveAspectRatio="none" data-dir={dir} aria-hidden="true">
                          <path d={smooth(project(t.series, 100, 30, 4))} fill="none" stroke="currentColor" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="hb-yd1-content">
            <div className="hb-yd1-row">
              <section className="hb-yd1-card" style={{ "--d": 0, overflow: "hidden" } as React.CSSProperties} aria-label="Total balance">
                <div className="hb-yd1-bal">
                  <div className="hb-yd1-bal-l">
                    <div className="hb-yd1-eyebrow">Total balance</div>
                    <p className="hb-yd1-big hb-yd1-num">
                      {masked ? (
                        <span className="hb-yd1-mask">{currency}••••••</span>
                      ) : (
                        <>
                          {whole}
                          <small>.{cents}</small>
                        </>
                      )}
                    </p>
                    <div className="hb-yd1-bal-row">
                      <Change value={dayPct} />
                      <span className="hb-yd1-num" data-dir={dayPl >= 0 ? "up" : "down"}>
                        {dayPl >= 0 ? "+" : ""}
                        {masked ? "••••" : fmtMoney(dayPl, currency)}
                      </span>
                      <span>today</span>
                    </div>
                  </div>
                  <div className="hb-yd1-acts">
                    <button type="button" className="hb-yd1-act">
                      <Ico n="send" />
                      Send
                    </button>
                    <button type="button" className="hb-yd1-act">
                      <Ico n="recv" />
                      Receive
                    </button>
                    <button type="button" className="hb-yd1-act">
                      <Ico n="swap" />
                      Swap
                    </button>
                  </div>
                </div>
                <div className="hb-yd1-stats">
                  <div className="hb-yd1-stat">
                    <span>7 day change</span>
                    <b className="hb-yd1-num" data-dir={total >= weekAgo ? "up" : "down"}>
                      {total >= weekAgo ? "+" : ""}
                      {(((total - weekAgo) / weekAgo) * 100).toFixed(2)}%
                    </b>
                  </div>
                  <div className="hb-yd1-stat">
                    <span>Staking rewards</span>
                    <b className="hb-yd1-num">{money(1284.62)}</b>
                  </div>
                  <div className="hb-yd1-stat">
                    <span>Unrealized gain</span>
                    <b className="hb-yd1-num">{money(total * 0.214)}</b>
                  </div>
                </div>
                <svg className="hb-yd1-bspark" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id={`${uid}b`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="currentColor" stopOpacity=".28" />
                      <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${smooth(project(balSeries, 100, 40, 4))}L100 40L0 40Z`} fill={`url(#${uid}b)`} />
                  <path d={smooth(project(balSeries, 100, 40, 4))} />
                </svg>
              </section>

              <section className="hb-yd1-card" style={{ "--d": 1 } as React.CSSProperties} aria-label="Allocation">
                <div className="hb-yd1-ch">
                  <div>
                    <h3 className="hb-yd1-ct">Allocation</h3>
                    <p className="hb-yd1-cs">Share of portfolio value</p>
                  </div>
                </div>
                <div className="hb-yd1-donut">
                  <svg viewBox="0 0 42 42" role="img" aria-label="Allocation by asset">
                    <circle cx="21" cy="21" r="15.9155" stroke="rgba(255,255,255,.05)" />
                    {arcs.map((a, i) => (
                      <circle
                        key={rows[i].symbol}
                        className="hb-yd1-dseg"
                        cx="21"
                        cy="21"
                        r="15.9155"
                        pathLength={100}
                        data-hot={hot === i}
                        data-dim={hot !== null && hot !== i}
                        style={{ stroke: a.color, strokeDasharray: `${a.len.toFixed(2)} ${(100 - a.len).toFixed(2)}`, strokeDashoffset: -Number(a.offset.toFixed(2)) }}
                        onPointerEnter={() => setHot(i)}
                        onPointerLeave={() => setHot(null)}
                        onClick={() => pickAsset(rows[i].symbol)}
                      />
                    ))}
                  </svg>
                  <div className="hb-yd1-dc">
                    <strong className="hb-yd1-num">{hot === null ? `${holdings.length}` : `${shares[hot].toFixed(1)}%`}</strong>
                    <span>{hot === null ? "assets held" : rows[hot].name}</span>
                  </div>
                </div>
                <ul className="hb-yd1-leg">
                  {rows.map((h, i) => (
                    <li key={h.symbol}>
                      <button
                        type="button"
                        aria-pressed={sym === h.symbol}
                        onPointerEnter={() => setHot(i)}
                        onPointerLeave={() => setHot(null)}
                        onFocus={() => setHot(i)}
                        onBlur={() => setHot(null)}
                        onClick={() => pickAsset(h.symbol)}
                      >
                        <i style={{ background: h.color }} />
                        <span>{h.symbol}</span>
                        <em className="hb-yd1-num">{shares[i].toFixed(1)}%</em>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="hb-yd1-row">
              <section className="hb-yd1-card" style={{ "--d": 2 } as React.CSSProperties} aria-label="Price chart">
                <div className="hb-yd1-ch">
                  <div className="hb-yd1-pair">
                    <span className="hb-yd1-coin" style={{ background: `linear-gradient(135deg, ${sel?.color ?? accent}, #1a1d22)` }}>
                      {sel?.symbol.slice(0, 2)}
                    </span>
                    <div>
                      <div className="hb-yd1-pair-p">
                        <b className="hb-yd1-num">{fmtPrice(sel?.price ?? 0, currency)}</b>
                        <Change value={rangeChange} />
                      </div>
                      <p className="hb-yd1-cs">
                        {sel?.name} / USD · {cfg.label}
                      </p>
                    </div>
                  </div>
                  <div className="hb-yd1-seg" role="group" aria-label="Chart range">
                    {RANGE_KEYS.map((k) => (
                      <button key={k} type="button" aria-pressed={r === k} onClick={() => pickRange(k)}>
                        {k}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="hb-yd1-chart">
                  <div
                    className="hb-yd1-plot"
                    role="img"
                    tabIndex={0}
                    aria-label={`${sel?.name} price, ${cfg.n} candles over ${r}, ${rangeChange >= 0 ? "up" : "down"} ${Math.abs(rangeChange).toFixed(2)} percent. Use arrow keys to inspect candles.`}
                    onPointerMove={moveTo}
                    onPointerLeave={() => setHover(null)}
                    onKeyDown={keyMove}
                    onBlur={() => setHover(null)}
                  >
                    <svg key={`${sym}${r}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      {ticks.map((t, k) => (
                        <line key={k} className="hb-yd1-gl" x1="0" x2="100" y1={y(t).toFixed(2)} y2={y(t).toFixed(2)} />
                      ))}
                      {candles.map((c, i) => {
                        const vh = c.v * 18;
                        return (
                          <rect
                            key={`v${i}`}
                            className="hb-yd1-vol"
                            data-dir={c.c >= c.o ? "up" : "down"}
                            x={(i * slot + slot * 0.18).toFixed(3)}
                            width={(slot * 0.64).toFixed(3)}
                            y={(100 - vh).toFixed(2)}
                            height={vh.toFixed(2)}
                            style={{ animationDelay: `${i * 10}ms` }}
                          />
                        );
                      })}
                      {candles.map((c, i) => {
                        const x = i * slot + slot / 2;
                        const yt = y(Math.max(c.o, c.c));
                        const yb = y(Math.min(c.o, c.c));
                        return (
                          <g key={i} className="hb-yd1-cdl" data-dir={c.c >= c.o ? "up" : "down"} data-hot={hover === i} style={{ animationDelay: `${i * 12}ms` }}>
                            <line x1={x.toFixed(3)} x2={x.toFixed(3)} y1={y(c.h).toFixed(2)} y2={y(c.l).toFixed(2)} />
                            <rect x={(i * slot + slot * 0.18).toFixed(3)} width={(slot * 0.64).toFixed(3)} y={yt.toFixed(2)} height={Math.max(0.5, yb - yt).toFixed(2)} rx="0.15" />
                          </g>
                        );
                      })}
                      {sel ? <line className="hb-yd1-last" x1="0" x2="100" y1={y(sel.price).toFixed(2)} y2={y(sel.price).toFixed(2)} /> : null}
                    </svg>
                    {hc && hover !== null ? (
                      <>
                        <div className="hb-yd1-cross" style={{ left: `${(hover * slot + slot / 2).toFixed(2)}%` }} />
                        <div
                          className="hb-yd1-tt hb-yd1-num"
                          style={{
                            left: `${(hover * slot + slot / 2).toFixed(2)}%`,
                            transform: hover * slot > 62 ? "translateX(calc(-100% - 12px))" : "translateX(12px)",
                          }}
                        >
                          <div className="hb-yd1-tt-d">{tipLabel(r, cfg.n - 1 - hover)}</div>
                          <span>Open</span>
                          <b>{fmtPrice(hc.o, currency)}</b>
                          <span>High</span>
                          <b>{fmtPrice(hc.h, currency)}</b>
                          <span>Low</span>
                          <b>{fmtPrice(hc.l, currency)}</b>
                          <span>Close</span>
                          <b data-dir={hc.c >= hc.o ? "up" : "down"}>{fmtPrice(hc.c, currency)}</b>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="hb-yd1-yax hb-yd1-num" aria-hidden="true">
                    {ticks.map((t, k) => (
                      <span key={k} style={{ top: `${y(t).toFixed(2)}%` }}>
                        {fmtPrice(t, "")}
                      </span>
                    ))}
                    {sel ? (
                      <span className="hb-yd1-ytag" style={{ top: `${y(sel.price).toFixed(2)}%` }}>
                        {fmtPrice(sel.price, "")}
                      </span>
                    ) : null}
                  </div>
                  <div className="hb-yd1-xax" aria-hidden="true">
                    {xs.map((x) => (
                      <span key={x}>{axisLabel(r, cfg.n - 1 - x)}</span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="hb-yd1-card" style={{ "--d": 3 } as React.CSSProperties} aria-label="Recent activity">
                <div className="hb-yd1-ch">
                  <div>
                    <h3 className="hb-yd1-ct">Recent activity</h3>
                    <p className="hb-yd1-cs">Trades, transfers and rewards</p>
                  </div>
                </div>
                <ul className="hb-yd1-feed">
                  {FEED.map((f, i) => (
                    <li key={f.title} style={{ animationDelay: `${300 + i * 70}ms` }}>
                      <span className="hb-yd1-fi" data-k={f.k}>
                        <Ico n={f.k === "buy" ? "plus" : f.k === "sell" ? "send" : f.k === "stake" ? "layers" : f.k === "recv" ? "recv" : "swap"} />
                      </span>
                      <div className="hb-yd1-ft">
                        <b>{f.title}</b>
                        <span>{f.sub}</span>
                      </div>
                      <div className="hb-yd1-fv hb-yd1-num">
                        {masked ? "••••" : f.value}
                        <span>{f.meta}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="hb-yd1-card" style={{ "--d": 4 } as React.CSSProperties} aria-label="Holdings">
              <div className="hb-yd1-ch">
                <div>
                  <h3 className="hb-yd1-ct">Holdings</h3>
                  <p className="hb-yd1-cs">Select an asset to chart it</p>
                </div>
              </div>
              <table className="hb-yd1-tbl">
                <thead>
                  <tr>
                    <th scope="col">Asset</th>
                    <th scope="col" className="hb-yd1-hide-xs" aria-sort={sort.key === "price" ? (sort.desc ? "descending" : "ascending") : undefined}>
                      <button type="button" onClick={() => toggleSort("price")}>
                        Price
                        <Ico n={sort.key === "price" ? (sort.desc ? "sortd" : "sortu") : "sort"} className="" />
                      </button>
                    </th>
                    <th scope="col" aria-sort={sort.key === "change" ? (sort.desc ? "descending" : "ascending") : undefined}>
                      <button type="button" onClick={() => toggleSort("change")}>
                        24h
                        <Ico n={sort.key === "change" ? (sort.desc ? "sortd" : "sortu") : "sort"} className="" />
                      </button>
                    </th>
                    <th scope="col" className="hb-yd1-hide-sm">
                      Holdings
                    </th>
                    <th scope="col" aria-sort={sort.key === "value" ? (sort.desc ? "descending" : "ascending") : undefined}>
                      <button type="button" onClick={() => toggleSort("value")}>
                        Value
                        <Ico n={sort.key === "value" ? (sort.desc ? "sortd" : "sortu") : "sort"} className="" />
                      </button>
                    </th>
                    <th scope="col" className="hb-yd1-hide-md">
                      Allocation
                    </th>
                    <th scope="col" className="hb-yd1-hide-sm">
                      7 days
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((h, i) => {
                    const dir = h.change >= 0 ? "up" : "down";
                    return (
                      <tr key={h.symbol} data-on={sym === h.symbol} onClick={() => pickAsset(h.symbol)}>
                        <td>
                          <button type="button" className="hb-yd1-asset" aria-pressed={sym === h.symbol} onClick={(e) => { e.stopPropagation(); pickAsset(h.symbol); }}>
                            <span className="hb-yd1-coin" style={{ background: `linear-gradient(135deg, ${h.color}, #1a1d22)` }}>
                              {h.symbol.slice(0, 2)}
                            </span>
                            <span>
                              <b>{h.name}</b>
                              <span>{h.symbol}</span>
                            </span>
                          </button>
                        </td>
                        <td className="hb-yd1-num hb-yd1-hide-xs">{fmtPrice(h.price, currency)}</td>
                        <td>
                          <Change value={h.change} />
                        </td>
                        <td className="hb-yd1-num hb-yd1-hide-sm">
                          {masked ? "••••" : fmtAmount(h.amount)} <span style={{ color: "#6c7076" }}>{h.symbol}</span>
                        </td>
                        <td className="hb-yd1-num">{money(h.value)}</td>
                        <td className="hb-yd1-hide-md">
                          <span className="hb-yd1-alloc hb-yd1-num">
                            <i style={{ "--w": `${((h.value / total) * 100).toFixed(1)}%`, "--c": h.color, animationDelay: `${i * 60}ms` } as React.CSSProperties} />
                            {((h.value / total) * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="hb-yd1-hide-sm" data-dir={dir}>
                          <MiniSpark values={h.week} className="hb-yd1-msp" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
