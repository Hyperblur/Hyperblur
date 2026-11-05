"use client";

import * as React from "react";

export type MarketingPeriod = "7D" | "30D" | "QTD";

export interface DashboardMarketingProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  brand?: string;
  user?: string;
  campaign?: string;
  currency?: string;
  period?: MarketingPeriod;
  defaultPeriod?: MarketingPeriod;
  onPeriodChange?: (period: MarketingPeriod) => void;
}

const css = `
.hb-yd4 {
  --a: #ff6b57;
  container: hb-yd4 / inline-size;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #241f1f;
  border-radius: 18px;
  background:
    radial-gradient(1000px 360px at 60% -12%, color-mix(in srgb, var(--a) 9%, transparent), transparent 70%),
    #0b0a0a;
  color: #eeeae8;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  overflow: hidden;
  position: relative;
  -webkit-font-smoothing: antialiased;
}
.hb-yd4 *, .hb-yd4 *::before, .hb-yd4 *::after { box-sizing: border-box; }
.hb-yd4 button, .hb-yd4 input { font: inherit; color: inherit; }
.hb-yd4 button:focus-visible, .hb-yd4 [tabindex]:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }
.hb-yd4-app { display: grid; grid-template-columns: 244px minmax(0, 1fr); min-height: 720px; }
.hb-yd4-side { display: flex; flex-direction: column; gap: 4px; min-width: 0; padding: 16px 12px; border-right: 1px solid rgba(255, 255, 255, .06); background: rgba(14, 12, 12, .8); }
.hb-yd4-ws { display: flex; align-items: center; gap: 10px; padding: 4px 6px 14px; }
.hb-yd4-logo { display: grid; place-items: center; flex: none; width: 30px; height: 30px; border-radius: 9px; background: linear-gradient(140deg, var(--a), color-mix(in srgb, var(--a) 40%, #ffd166)); color: #1a0b07; box-shadow: 0 6px 18px -8px var(--a); }
.hb-yd4-ws b { display: block; font-size: 14px; font-weight: 650; letter-spacing: -.01em; }
.hb-yd4-ws span { display: block; color: #85807d; font-size: 11.5px; }
.hb-yd4-nav { display: flex; flex-direction: column; gap: 1px; margin: 0; padding: 0; list-style: none; }
.hb-yd4-link { display: flex; align-items: center; gap: 10px; width: 100%; height: 33px; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; color: #a39e9b; font-size: 13px; text-align: left; cursor: pointer; transition: background .15s ease, color .15s ease; }
.hb-yd4-link:hover { background: rgba(255, 255, 255, .04); color: #eeeae8; }
.hb-yd4-link[aria-current="page"] { background: rgba(255, 255, 255, .07); color: #ffffff; }
.hb-yd4-link[aria-current="page"] .hb-yd4-ico { color: var(--a); }
.hb-yd4-sh { display: flex; align-items: center; justify-content: space-between; padding: 16px 10px 6px; color: #6f6a67; font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-yd4-camp { display: grid; grid-template-columns: 8px minmax(0, 1fr) auto; align-items: center; gap: 9px; width: 100%; padding: 7px 10px; border: 0; border-radius: 8px; background: transparent; color: #a39e9b; font-size: 12.5px; text-align: left; cursor: pointer; transition: background .15s ease, color .15s ease; }
.hb-yd4-camp:hover { background: rgba(255, 255, 255, .04); color: #eeeae8; }
.hb-yd4-camp[aria-current="true"] { background: color-mix(in srgb, var(--a) 10%, transparent); color: #ffffff; }
.hb-yd4-camp i { width: 8px; height: 8px; border-radius: 50%; }
.hb-yd4-camp i[data-s="live"] { background: #4ade80; box-shadow: 0 0 0 3px rgba(74, 222, 128, .14); }
.hb-yd4-camp i[data-s="scheduled"] { background: #fbbf24; }
.hb-yd4-camp i[data-s="draft"] { background: #57534f; }
.hb-yd4-camp span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd4-camp em { color: #6f6a67; font-size: 11px; font-style: normal; font-variant-numeric: tabular-nums; }
.hb-yd4-up { margin-top: auto; padding: 14px; border: 1px solid rgba(255, 255, 255, .07); border-radius: 14px; background: linear-gradient(160deg, color-mix(in srgb, var(--a) 16%, #141111), #121010 60%); }
.hb-yd4-up b { display: block; font-size: 13px; font-weight: 600; }
.hb-yd4-up p { margin: 4px 0 10px; color: #a39e9b; font-size: 12px; }
.hb-yd4-up button { height: 28px; padding: 0 12px; border: 0; border-radius: 7px; background: #eeeae8; color: #141111; font-size: 12px; font-weight: 600; cursor: pointer; }
.hb-yd4-main { display: flex; flex-direction: column; min-width: 0; }
.hb-yd4-top { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 18px 24px; border-bottom: 1px solid rgba(255, 255, 255, .06); }
.hb-yd4-tt { min-width: 0; margin-right: auto; }
.hb-yd4-crumb { color: #85807d; font-size: 12px; }
.hb-yd4-tt h2 { display: flex; align-items: center; gap: 10px; margin: 2px 0 0; font-size: 20px; font-weight: 600; letter-spacing: -.02em; }
.hb-yd4-live { display: inline-flex; align-items: center; gap: 5px; height: 22px; padding: 0 8px; border-radius: 999px; background: rgba(74, 222, 128, .12); color: #4ade80; font-size: 11px; font-weight: 600; letter-spacing: 0; }
.hb-yd4-live i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: hb-yd4-blink 1.4s ease-in-out infinite; }
.hb-yd4-team { display: flex; }
.hb-yd4-team span + span { margin-left: -8px; }
.hb-yd4-av { display: grid; place-items: center; flex: none; border-radius: 50%; color: #ffffff; font-size: 10.5px; font-weight: 600; box-shadow: 0 0 0 2px #0b0a0a; }
.hb-yd4-seg { display: inline-flex; padding: 3px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 10px; background: rgba(0, 0, 0, .3); }
.hb-yd4-seg button { height: 28px; padding: 0 12px; border: 0; border-radius: 7px; background: transparent; color: #85807d; font-size: 12px; font-weight: 600; cursor: pointer; transition: background .15s ease, color .15s ease; }
.hb-yd4-seg button:hover { color: #ffffff; }
.hb-yd4-seg button[aria-pressed="true"] { background: rgba(255, 255, 255, .1); color: #ffffff; }
.hb-yd4-btn { display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 13px; border: 0; border-radius: 10px; background: var(--a); color: #1a0b07; font-size: 12.5px; font-weight: 650; cursor: pointer; box-shadow: 0 0 0 1px rgba(255, 255, 255, .2) inset; transition: filter .15s ease; }
.hb-yd4-btn:hover { filter: brightness(1.08); }
.hb-yd4-ico { display: block; flex: none; width: 16px; height: 16px; }
.hb-yd4-content { display: flex; flex-direction: column; gap: 16px; min-width: 0; padding: 20px 24px 24px; }
.hb-yd4-card { position: relative; min-width: 0; padding: 18px; border: 1px solid rgba(255, 255, 255, .07); border-radius: 16px; background: #121010; animation: hb-yd4-rise .6s cubic-bezier(.2, .7, .2, 1) both; animation-delay: calc(var(--d, 0) * 70ms); }
.hb-yd4-ch { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
.hb-yd4-ct { margin: 0; font-size: 13.5px; font-weight: 600; }
.hb-yd4-cs { margin: 2px 0 0; color: #85807d; font-size: 12px; }
.hb-yd4-band { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); padding: 0; overflow: hidden; }
.hb-yd4-band::before { content: ""; position: absolute; top: 0; right: 0; left: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--a), #ffd166, transparent); opacity: .8; }
.hb-yd4-kpi { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 10px; min-width: 0; padding: 18px; border-left: 1px solid rgba(255, 255, 255, .06); }
.hb-yd4-kpi:first-child { border-left: 0; }
.hb-yd4-kpi span { display: block; color: #85807d; font-size: 12px; }
.hb-yd4-kpi b { display: block; margin: 6px 0 4px; font-size: 26px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; line-height: 1; white-space: nowrap; }
.hb-yd4-kpi small { font-size: 12px; font-weight: 600; }
.hb-yd4-good { color: #4ade80; }
.hb-yd4-bad { color: #f87171; }
.hb-yd4-mb { display: flex; align-items: flex-end; gap: 3px; height: 36px; }
.hb-yd4-mb i { width: 5px; height: var(--h); border-radius: 2px; background: rgba(255, 255, 255, .14); transform-origin: bottom; animation: hb-yd4-grow .6s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd4-mb i:last-child { background: var(--a); }
.hb-yd4-row { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); gap: 16px; }
.hb-yd4-row2 { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; }
.hb-yd4-tbl { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.hb-yd4-tbl th { padding: 0 8px 10px; color: #6f6a67; font-size: 11.5px; font-weight: 500; text-align: right; white-space: nowrap; }
.hb-yd4-tbl th:first-child, .hb-yd4-tbl td:first-child { padding-left: 0; text-align: left; }
.hb-yd4-tbl th:last-child, .hb-yd4-tbl td:last-child { padding-right: 0; }
.hb-yd4-tbl th button { display: inline-flex; align-items: center; gap: 3px; padding: 0; border: 0; background: none; color: inherit; font-size: inherit; font-weight: inherit; cursor: pointer; }
.hb-yd4-tbl th button:hover, .hb-yd4-tbl th[aria-sort] button { color: #eeeae8; }
.hb-yd4-tbl th svg { width: 11px; height: 11px; }
.hb-yd4-tbl td { padding: 10px 8px; border-top: 1px solid rgba(255, 255, 255, .05); font-variant-numeric: tabular-nums; text-align: right; white-space: nowrap; }
.hb-yd4-tbl tbody tr { transition: background .15s ease; }
.hb-yd4-tbl tbody tr:hover { background: rgba(255, 255, 255, .025); }
.hb-yd4-tbl tfoot td { border-top: 1px solid rgba(255, 255, 255, .1); color: #a39e9b; font-weight: 600; }
.hb-yd4-chn { display: flex; align-items: center; gap: 9px; }
.hb-yd4-chn i { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 7px; background: color-mix(in srgb, var(--c) 18%, transparent); color: var(--c); font-size: 10px; font-style: normal; font-weight: 700; }
.hb-yd4-chn b { font-weight: 500; }
.hb-yd4-ib { display: inline-flex; align-items: center; justify-content: flex-end; gap: 8px; }
.hb-yd4-ib s { position: relative; display: block; width: 56px; height: 6px; border-radius: 999px; background: rgba(255, 255, 255, .06); overflow: hidden; text-decoration: none; }
.hb-yd4-ib s::after { content: ""; position: absolute; inset: 0 auto 0 0; width: var(--w); border-radius: inherit; background: var(--c, var(--a)); transform-origin: left; animation: hb-yd4-bar .9s cubic-bezier(.3, .7, .2, 1) both; animation-delay: inherit; }
.hb-yd4-fun { position: relative; }
.hb-yd4-fun svg { display: block; width: 100%; height: 150px; overflow: visible; }
.hb-yd4-fun-a { animation: hb-yd4-wipe 1.1s .2s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd4-fun-band { fill: rgba(255, 255, 255, 0); transition: fill .15s ease; cursor: pointer; }
.hb-yd4-fun-band[data-on="true"] { fill: rgba(255, 255, 255, .04); }
.hb-yd4-fun-sep { stroke: rgba(255, 255, 255, .12); stroke-dasharray: 2 3; vector-effect: non-scaling-stroke; }
.hb-yd4-fl { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); margin-top: 10px; }
.hb-yd4-fl button { min-width: 0; padding: 6px 4px; border: 0; border-radius: 8px; background: transparent; text-align: left; cursor: pointer; transition: background .15s ease; }
.hb-yd4-fl button[aria-pressed="true"], .hb-yd4-fl button:hover { background: rgba(255, 255, 255, .05); }
.hb-yd4-fl span { display: block; overflow: hidden; color: #85807d; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd4-fl b { display: block; font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-yd4-fl em { display: block; color: var(--a); font-size: 11px; font-style: normal; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-yd4-fsum { display: flex; justify-content: space-between; gap: 10px; margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, .06); color: #85807d; font-size: 12px; }
.hb-yd4-fsum b { color: #eeeae8; font-weight: 600; }
.hb-yd4-burn { display: grid; grid-template-columns: 168px minmax(0, 1fr); align-items: center; gap: 20px; }
.hb-yd4-rings { position: relative; width: 168px; height: 168px; }
.hb-yd4-rings svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-yd4-rings circle { fill: none; stroke-width: 9; stroke-linecap: round; }
.hb-yd4-rt { stroke: rgba(255, 255, 255, .06); }
.hb-yd4-rv { animation: hb-yd4-arc 1.2s cubic-bezier(.3, .7, .2, 1) both; transition: opacity .2s ease; }
.hb-yd4-rv[data-dim="true"] { opacity: .3; }
.hb-yd4-rc { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; pointer-events: none; }
.hb-yd4-rc b { font-size: 22px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; }
.hb-yd4-rc span { color: #85807d; font-size: 11px; }
.hb-yd4-bl { display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 0; list-style: none; }
.hb-yd4-bl li { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto; align-items: center; gap: 10px; padding: 8px; margin: 0 -8px; border-radius: 10px; cursor: default; transition: background .15s ease; }
.hb-yd4-bl li:hover { background: rgba(255, 255, 255, .04); }
.hb-yd4-bl i { width: 10px; height: 10px; border-radius: 50%; }
.hb-yd4-bl b { display: block; font-size: 12.5px; font-weight: 500; }
.hb-yd4-bl span { display: block; color: #85807d; font-size: 11.5px; font-variant-numeric: tabular-nums; }
.hb-yd4-pace { padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; white-space: nowrap; }
.hb-yd4-pace[data-p="on"] { background: rgba(74, 222, 128, .12); color: #4ade80; }
.hb-yd4-pace[data-p="over"] { background: rgba(248, 113, 113, .12); color: #f87171; }
.hb-yd4-pace[data-p="under"] { background: rgba(251, 191, 36, .12); color: #fbbf24; }
.hb-yd4-burn-f { margin-top: 12px; color: #85807d; font-size: 12px; }
.hb-yd4-burn-f b { color: #eeeae8; font-weight: 600; }
.hb-yd4-geo { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-yd4-geo li { display: grid; grid-template-columns: 30px minmax(0, 1fr) minmax(0, 1.2fr) 56px; align-items: center; gap: 10px; padding: 7px 8px; margin: 0 -8px; border-radius: 9px; transition: background .15s ease; }
.hb-yd4-geo li:hover { background: rgba(255, 255, 255, .04); }
.hb-yd4-cc { display: grid; place-items: center; height: 22px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 6px; background: rgba(255, 255, 255, .03); color: #c9c4c1; font-size: 10.5px; font-weight: 700; letter-spacing: .04em; }
.hb-yd4-gn { min-width: 0; overflow: hidden; font-size: 12.5px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd4-gb { position: relative; height: 6px; border-radius: 999px; background: rgba(255, 255, 255, .05); overflow: hidden; }
.hb-yd4-gb i { position: absolute; inset: 0 auto 0 0; width: var(--w); border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--a) 50%, transparent), var(--a)); transform-origin: left; animation: hb-yd4-bar .9s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd4-gv { font-size: 12px; font-variant-numeric: tabular-nums; text-align: right; }
.hb-yd4-gv span { display: block; color: #6f6a67; font-size: 11px; }
.hb-yd4-crs { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; }
.hb-yd4-cr { position: relative; display: flex; flex-direction: column; min-width: 0; padding: 0; border: 1px solid rgba(255, 255, 255, .07); border-radius: 14px; background: #0e0c0c; overflow: hidden; text-align: left; cursor: pointer; animation: hb-yd4-rise .5s cubic-bezier(.2, .7, .2, 1) both; transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
.hb-yd4-cr:hover, .hb-yd4-cr:focus-visible { border-color: rgba(255, 255, 255, .18); box-shadow: 0 18px 36px -18px rgba(0, 0, 0, .9); transform: translateY(-3px); }
.hb-yd4-art { position: relative; aspect-ratio: 4 / 5; overflow: hidden; }
.hb-yd4-art::after { content: ""; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, .22) 50%, transparent 65%); transform: translateX(-120%); transition: transform .7s ease; }
.hb-yd4-cr:hover .hb-yd4-art::after { transform: translateX(120%); }
.hb-yd4-art-t { position: absolute; right: 10px; bottom: 10px; left: 10px; color: #ffffff; font-size: 13px; font-weight: 700; letter-spacing: -.02em; line-height: 1.1; text-shadow: 0 2px 10px rgba(0, 0, 0, .35); }
.hb-yd4-art-t small { display: block; margin-bottom: 4px; font-size: 9.5px; font-weight: 600; letter-spacing: .12em; opacity: .85; text-transform: uppercase; }
.hb-yd4-fmt { position: absolute; top: 8px; left: 8px; padding: 2px 6px; border-radius: 5px; background: rgba(0, 0, 0, .45); color: #ffffff; font-size: 10px; font-weight: 600; -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }
.hb-yd4-win { position: absolute; top: 8px; right: 8px; padding: 2px 6px; border-radius: 5px; background: #ffd166; color: #1a1205; font-size: 10px; font-weight: 700; }
.hb-yd4-crm { display: flex; flex-direction: column; gap: 2px; padding: 10px 11px 11px; }
.hb-yd4-crm b { overflow: hidden; font-size: 12px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd4-crm span { display: flex; justify-content: space-between; gap: 6px; color: #85807d; font-size: 11px; font-variant-numeric: tabular-nums; }
.hb-yd4-crm span em { color: #eeeae8; font-style: normal; font-weight: 600; }
.hb-yd4-st { display: inline-flex; align-items: center; gap: 4px; }
.hb-yd4-st::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--c); }
@keyframes hb-yd4-rise { from { opacity: 0; transform: translate3d(0, 10px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-yd4-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-yd4-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-yd4-arc { from { stroke-dasharray: 0 100; } }
@keyframes hb-yd4-wipe { from { clip-path: inset(-10px 100% -10px -10px); } to { clip-path: inset(-10px -10px -10px -10px); } }
@keyframes hb-yd4-blink { 50% { opacity: .35; } }
@container hb-yd4 (max-width: 1099px) {
  .hb-yd4-crs { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@container hb-yd4 (max-width: 999px) {
  .hb-yd4-row, .hb-yd4-row2 { grid-template-columns: minmax(0, 1fr); }
  .hb-yd4-band { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-yd4-kpi:nth-child(3) { border-left: 0; }
  .hb-yd4-kpi:nth-child(n + 3) { border-top: 1px solid rgba(255, 255, 255, .06); }
}
@container hb-yd4 (max-width: 759px) {
  .hb-yd4-app { grid-template-columns: minmax(0, 1fr); min-height: 0; }
  .hb-yd4-side { flex-direction: row; align-items: center; gap: 4px; padding: 8px 12px; border-right: 0; border-bottom: 1px solid rgba(255, 255, 255, .06); overflow-x: auto; }
  .hb-yd4-ws { padding: 0 8px 0 0; }
  .hb-yd4-ws div, .hb-yd4-sh, .hb-yd4-camps, .hb-yd4-up, .hb-yd4-link-t { display: none; }
  .hb-yd4-nav { flex-direction: row; gap: 4px; }
  .hb-yd4-link { justify-content: center; width: 34px; padding: 0; }
  .hb-yd4-top { padding: 16px; }
  .hb-yd4-team { display: none; }
  .hb-yd4-content { padding: 16px; }
  .hb-yd4-hide-sm { display: none; }
  .hb-yd4-burn { grid-template-columns: minmax(0, 1fr); justify-items: center; }
  .hb-yd4-bl { width: 100%; }
}
@container hb-yd4 (max-width: 479px) {
  .hb-yd4-band { grid-template-columns: minmax(0, 1fr); }
  .hb-yd4-kpi { border-left: 0; }
  .hb-yd4-kpi:nth-child(n + 2) { border-top: 1px solid rgba(255, 255, 255, .06); }
  .hb-yd4-crs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-yd4-hide-xs { display: none; }
  .hb-yd4-geo li { grid-template-columns: 30px minmax(0, 1fr) 56px; }
  .hb-yd4-gb { display: none; }
  .hb-yd4-fl b { font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yd4 *, .hb-yd4 *::before, .hb-yd4 *::after { animation: none !important; transition: none !important; }
}
`;

function hash(n: number) {
  let x = Math.imul(n + 1, 2654435761) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519) >>> 0;
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

function tone(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return `linear-gradient(135deg, hsl(${hue} 62% 56%), hsl(${(hue + 44) % 360} 58% 38%))`;
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
  mega: ["M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z", "M17 9a4 4 0 0 1 0 6", "M20 6a8 8 0 0 1 0 12"],
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"],
  image: ["M3 4h18v16H3z", "M8.5 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z", "M21 15l-5-5L5 20"],
  chart: ["M3 3v18h18", "M7 15l4-4 3 3 5-6"],
  plug: ["M9 2v6M15 2v6", "M6 8h12v4a6 6 0 0 1-12 0z", "M12 18v4"],
  share: ["M4 12v8h16v-8", "M16 6l-4-4-4 4", "M12 2v13"],
  sort: ["M8 10l4-4 4 4", "M8 14l4 4 4-4"],
  sortd: ["M8 10l4 4 4-4"],
  sortu: ["M8 14l4-4 4 4"],
};

function Ico({ n, className = "hb-yd4-ico" }: { n: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(icons[n] ?? []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

const PERIODS: MarketingPeriod[] = ["7D", "30D", "QTD"];
const SCALE: Record<MarketingPeriod, number> = { "7D": 0.24, "30D": 1, QTD: 1.38 };
const RANGE_LABEL: Record<MarketingPeriod, string> = { "7D": "Oct 29 to Nov 4", "30D": "Oct 6 to Nov 4", QTD: "Oct 1 to Nov 4" };

const CHANNELS = [
  { name: "Paid search", code: "PS", color: "#ff6b57", spend: 14820, impr: 612000, clicks: 31400, conv: 1412, revenue: 71600 },
  { name: "Paid social", code: "SO", color: "#c084fc", spend: 12260, impr: 1480000, clicks: 28900, conv: 986, revenue: 49800 },
  { name: "Email", code: "EM", color: "#4ade80", spend: 1940, impr: 96000, clicks: 18300, conv: 1128, revenue: 46200 },
  { name: "Affiliates", code: "AF", color: "#ffd166", spend: 6410, impr: 210000, clicks: 7800, conv: 402, revenue: 24100 },
  { name: "Display", code: "DI", color: "#7fb3ff", spend: 8150, impr: 640000, clicks: 4600, conv: 158, revenue: 7900 },
  { name: "Podcasts", code: "PO", color: "#f472b6", spend: 4620, impr: 90000, clicks: 1400, conv: 211, revenue: 15300 },
];

const FUNNEL = [
  { name: "Impressions", base: 3128000 },
  { name: "Clicks", base: 92400 },
  { name: "Sessions", base: 81700 },
  { name: "Sign-ups", base: 9860 },
  { name: "Purchases", base: 4297 },
];

const BUDGETS = [
  { name: "Paid search", spent: 14820, budget: 22000, color: "#ff6b57" },
  { name: "Paid social", spent: 12260, budget: 16000, color: "#c084fc" },
  { name: "Everything else", spent: 21120, budget: 36000, color: "#ffd166" },
];
const MONTH_ELAPSED = 0.62;

const GEO = [
  { code: "US", name: "United States", share: 38.2, conv: 1663 },
  { code: "GB", name: "United Kingdom", share: 13.9, conv: 605 },
  { code: "DE", name: "Germany", share: 10.7, conv: 466 },
  { code: "CA", name: "Canada", share: 8.6, conv: 374 },
  { code: "AU", name: "Australia", share: 7.1, conv: 309 },
  { code: "FR", name: "France", share: 5.8, conv: 252 },
  { code: "BR", name: "Brazil", share: 4.9, conv: 213 },
];

const CREATIVES = [
  { title: "Gifts they will actually use", kicker: "Holiday edit", fmt: "1:1", channel: "Paid social", ctr: 3.84, spend: 4210, status: "Winning", art: "radial-gradient(circle at 75% 25%, #ffd166 0 16%, transparent 17%), radial-gradient(circle at 20% 80%, rgba(255,255,255,.18) 0 22%, transparent 23%), linear-gradient(160deg, #ff6b57, #c2185b)" },
  { title: "Wrap up 30% off", kicker: "Ends Sunday", fmt: "9:16", channel: "Stories", ctr: 2.91, spend: 3380, status: "Learning", art: "repeating-linear-gradient(45deg, rgba(255,255,255,.12) 0 10px, transparent 10px 20px), linear-gradient(200deg, #7c3aed, #0ea5e9)" },
  { title: "The cozy collection is back", kicker: "New arrivals", fmt: "4:5", channel: "Paid social", ctr: 2.47, spend: 2960, status: "Learning", art: "radial-gradient(120% 80% at 50% 110%, #fb923c 0 35%, transparent 36%), radial-gradient(circle at 30% 30%, #fde68a 0 10%, transparent 11%), linear-gradient(180deg, #1e293b, #334155)" },
  { title: "Free shipping on every order", kicker: "Search ad", fmt: "Banner", channel: "Display", ctr: 0.71, spend: 2140, status: "Paused", art: "linear-gradient(90deg, rgba(0,0,0,.25) 0 1px, transparent 1px) 0 0 / 18px 18px, linear-gradient(0deg, rgba(0,0,0,.25) 0 1px, transparent 1px) 0 0 / 18px 18px, linear-gradient(135deg, #22c55e, #065f46)" },
  { title: "Your cart misses you", kicker: "Retargeting", fmt: "1:1", channel: "Email", ctr: 5.12, spend: 380, status: "Winning", art: "radial-gradient(circle at 50% 45%, #fff1f2 0 18%, #fda4af 19% 30%, transparent 31%), linear-gradient(150deg, #be123c, #4c0519)" },
  { title: "Build the perfect bundle", kicker: "Gift guide", fmt: "16:9", channel: "Podcasts", ctr: 1.96, spend: 1720, status: "Learning", art: "conic-gradient(from 200deg at 70% 60%, #ffd166, #ff6b57, #c084fc, #7fb3ff, #ffd166)" },
];
const STATUS_COLOR: Record<string, string> = { Winning: "#4ade80", Learning: "#fbbf24", Paused: "#85807d" };

const CAMPAIGNS = [
  { name: "Holiday Launch 2026", s: "live", n: "$48K" },
  { name: "Black Friday Retargeting", s: "live", n: "$19K" },
  { name: "Brand Search Always-on", s: "live", n: "$11K" },
  { name: "Winter Newsletter", s: "scheduled", n: "Nov 12" },
  { name: "Spring Teaser", s: "draft", n: "Draft" },
];

const NAV = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "campaigns", label: "Campaigns", icon: "mega" },
  { id: "audiences", label: "Audiences", icon: "users" },
  { id: "creatives", label: "Creatives", icon: "image" },
  { id: "reports", label: "Reports", icon: "chart" },
  { id: "integrations", label: "Integrations", icon: "plug" },
];

type SortKey = "spend" | "conv" | "roas";

function fmtK(n: number, cur = "") {
  if (n >= 1000000) return `${cur}${(n / 1000000).toFixed(2)}M`;
  if (n >= 10000) return `${cur}${(n / 1000).toFixed(1)}K`;
  return `${cur}${Math.round(n).toLocaleString("en-US")}`;
}

export function DashboardMarketing({
  accent = "#ff6b57",
  brand = "Flare",
  user = "Daniel Brooks",
  campaign = "Holiday Launch 2026",
  currency = "$",
  period,
  defaultPeriod = "30D",
  onPeriodChange,
  className = "",
  style,
  ...rest
}: DashboardMarketingProps) {
  const uid = React.useId().replace(/:/g, "");
  const [innerPeriod, setInnerPeriod] = React.useState<MarketingPeriod>(defaultPeriod);
  const [nav, setNav] = React.useState("campaigns");
  const [camp, setCamp] = React.useState(0);
  const [stage, setStage] = React.useState<number | null>(null);
  const [ring, setRing] = React.useState<number | null>(null);
  const [sort, setSort] = React.useState<{ key: SortKey; desc: boolean }>({ key: "spend", desc: true });
  const p = period ?? innerPeriod;
  const k = SCALE[p];

  const pickPeriod = (next: MarketingPeriod) => {
    setInnerPeriod(next);
    setStage(null);
    onPeriodChange?.(next);
  };

  const pi = PERIODS.indexOf(p);
  const rows = CHANNELS.map((c, i) => {
    const wobble = 1 + (hash(i * 11 + pi * 5) - 0.5) * 0.12;
    const spend = c.spend * k;
    const clicks = c.clicks * k * wobble;
    const conv = c.conv * k * wobble;
    const revenue = c.revenue * k * wobble;
    return { ...c, spend, clicks, conv, revenue, impr: c.impr * k, ctr: (clicks / (c.impr * k)) * 100, cpa: spend / conv, roas: revenue / spend };
  });
  const sorted = [...rows].sort((a, b) => (sort.desc ? b[sort.key] - a[sort.key] : a[sort.key] - b[sort.key]));
  const toggleSort = (key: SortKey) => setSort((s) => (s.key === key ? { key, desc: !s.desc } : { key, desc: true }));
  const spendT = rows.reduce((s, r) => s + r.spend, 0);
  const imprT = rows.reduce((s, r) => s + r.impr, 0);
  const clicksT = rows.reduce((s, r) => s + r.clicks, 0);
  const convT = rows.reduce((s, r) => s + r.conv, 0);
  const revT = rows.reduce((s, r) => s + r.revenue, 0);
  const maxSpend = Math.max(...rows.map((r) => r.spend));
  const maxRoas = Math.max(...rows.map((r) => r.roas));

  const kpis = [
    { label: "Spend", value: fmtK(spendT, currency), delta: "+12.4%", good: true, seed: 1 },
    { label: "Impressions", value: fmtK(imprT), delta: "+18.1%", good: true, seed: 2 },
    { label: "Conversions", value: fmtK(convT), delta: "+9.7%", good: true, seed: 3 },
    { label: "ROAS", value: `${(revT / spendT).toFixed(2)}x`, delta: "-0.3x", good: false, seed: 4 },
  ];

  const funnel = FUNNEL.map((f, i) => ({ ...f, value: f.base * k * (i === 0 ? 1 : 1 + (hash(i + pi * 9) - 0.5) * 0.06) }));
  const logMax = Math.log10(funnel[0].value);
  const logMin = Math.log10(funnel[funnel.length - 1].value) - 0.6;
  const fh = funnel.map((f) => 16 + ((Math.log10(f.value) - logMin) / (logMax - logMin)) * 84);
  const fx = funnel.map((_, i) => (i + 0.5) * 20);
  let ftop = `M0 ${(50 - fh[0] / 2).toFixed(2)}L${fx[0].toFixed(2)} ${(50 - fh[0] / 2).toFixed(2)}`;
  let fbot = "";
  for (let i = 0; i < fh.length - 1; i++) {
    const mx = (fx[i] + fx[i + 1]) / 2;
    ftop += `C${mx.toFixed(2)} ${(50 - fh[i] / 2).toFixed(2)} ${mx.toFixed(2)} ${(50 - fh[i + 1] / 2).toFixed(2)} ${fx[i + 1].toFixed(2)} ${(50 - fh[i + 1] / 2).toFixed(2)}`;
  }
  ftop += `L100 ${(50 - fh[fh.length - 1] / 2).toFixed(2)}L100 ${(50 + fh[fh.length - 1] / 2).toFixed(2)}L${fx[fh.length - 1].toFixed(2)} ${(50 + fh[fh.length - 1] / 2).toFixed(2)}`;
  for (let i = fh.length - 1; i > 0; i--) {
    const mx = (fx[i] + fx[i - 1]) / 2;
    fbot += `C${mx.toFixed(2)} ${(50 + fh[i] / 2).toFixed(2)} ${mx.toFixed(2)} ${(50 + fh[i - 1] / 2).toFixed(2)} ${fx[i - 1].toFixed(2)} ${(50 + fh[i - 1] / 2).toFixed(2)}`;
  }
  const fpath = `${ftop}${fbot}L0 ${(50 + fh[0] / 2).toFixed(2)}Z`;

  const radii = [44, 33, 22];
  const spentAll = BUDGETS.reduce((s, b) => s + b.spent, 0);
  const budgetAll = BUDGETS.reduce((s, b) => s + b.budget, 0);

  const vars = { "--a": accent, ...style } as React.CSSProperties;
  const sortIco = (key: SortKey) => <Ico n={sort.key === key ? (sort.desc ? "sortd" : "sortu") : "sort"} className="" />;
  const ariaSort = (key: SortKey) => (sort.key === key ? (sort.desc ? "descending" : "ascending") : undefined);

  return (
    <div className={`hb-yd4 ${className}`} style={vars} {...rest}>
      <style href="hb-dashboard-marketing" precedence="default">
        {css}
      </style>
      <div className="hb-yd4-app">
        <aside className="hb-yd4-side">
          <div className="hb-yd4-ws">
            <span className="hb-yd4-logo" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z" />
              </svg>
            </span>
            <div>
              <b>{brand}</b>
              <span>Growth team</span>
            </div>
          </div>
          <nav aria-label="Main">
            <ul className="hb-yd4-nav">
              {NAV.map((item) => (
                <li key={item.id}>
                  <button type="button" className="hb-yd4-link" aria-label={item.label} aria-current={nav === item.id ? "page" : undefined} onClick={() => setNav(item.id)}>
                    <Ico n={item.icon} />
                    <span className="hb-yd4-link-t">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hb-yd4-sh">
            <span>Campaigns</span>
            <span>{CAMPAIGNS.length}</span>
          </div>
          <ul className="hb-yd4-nav hb-yd4-camps">
            {CAMPAIGNS.map((c, i) => (
              <li key={c.name}>
                <button type="button" className="hb-yd4-camp" aria-current={camp === i ? "true" : undefined} onClick={() => setCamp(i)}>
                  <i data-s={c.s} title={c.s} />
                  <span>{i === 0 ? campaign : c.name}</span>
                  <em>{c.n}</em>
                </button>
              </li>
            ))}
          </ul>
          <div className="hb-yd4-up">
            <b>Weekly digest</b>
            <p>Send this report to the growth channel every Monday at 9:00.</p>
            <button type="button">Schedule</button>
          </div>
        </aside>

        <div className="hb-yd4-main">
          <header className="hb-yd4-top">
            <div className="hb-yd4-tt">
              <div className="hb-yd4-crumb">Campaigns · {RANGE_LABEL[p]}</div>
              <h2>
                {camp === 0 ? campaign : CAMPAIGNS[camp].name}
                <span className="hb-yd4-live">
                  <i />
                  Live
                </span>
              </h2>
            </div>
            <div className="hb-yd4-team" aria-label="Collaborators">
              {[user, "Yara Haddad", "Leo Okafor"].map((n) => (
                <span key={n} className="hb-yd4-av" style={{ width: 28, height: 28, background: tone(n) }} title={n}>
                  {initials(n)}
                </span>
              ))}
            </div>
            <div className="hb-yd4-seg" role="group" aria-label="Period">
              {PERIODS.map((x) => (
                <button key={x} type="button" aria-pressed={p === x} onClick={() => pickPeriod(x)}>
                  {x}
                </button>
              ))}
            </div>
            <button type="button" className="hb-yd4-btn">
              <Ico n="share" />
              Share report
            </button>
          </header>

          <div className="hb-yd4-content">
            <section className="hb-yd4-card hb-yd4-band" aria-label="Campaign totals" style={{ "--d": 0 } as React.CSSProperties}>
              {kpis.map((m) => (
                <div className="hb-yd4-kpi" key={m.label}>
                  <div>
                    <span>{m.label}</span>
                    <b>{m.value}</b>
                    <small className={m.good ? "hb-yd4-good" : "hb-yd4-bad"}>{m.delta} vs previous</small>
                  </div>
                  <div className="hb-yd4-mb" aria-hidden="true" key={p}>
                    {Array.from({ length: 8 }, (_, j) => (
                      <i key={j} style={{ "--h": `${(30 + j * 6 + hash(m.seed * 40 + j + pi * 7) * 30).toFixed(0)}%`, animationDelay: `${200 + j * 40}ms` } as React.CSSProperties} />
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <div className="hb-yd4-row">
              <section className="hb-yd4-card" style={{ "--d": 1 } as React.CSSProperties} aria-label="Channel performance">
                <div className="hb-yd4-ch">
                  <div>
                    <h3 className="hb-yd4-ct">Channel performance</h3>
                    <p className="hb-yd4-cs">Last-click attribution, {RANGE_LABEL[p]}</p>
                  </div>
                </div>
                <table className="hb-yd4-tbl">
                  <thead>
                    <tr>
                      <th scope="col">Channel</th>
                      <th scope="col" aria-sort={ariaSort("spend")}>
                        <button type="button" onClick={() => toggleSort("spend")}>
                          Spend
                          {sortIco("spend")}
                        </button>
                      </th>
                      <th scope="col" className="hb-yd4-hide-xs">
                        CTR
                      </th>
                      <th scope="col" className="hb-yd4-hide-sm" aria-sort={ariaSort("conv")}>
                        <button type="button" onClick={() => toggleSort("conv")}>
                          Conv.
                          {sortIco("conv")}
                        </button>
                      </th>
                      <th scope="col" className="hb-yd4-hide-sm">
                        CPA
                      </th>
                      <th scope="col" aria-sort={ariaSort("roas")}>
                        <button type="button" onClick={() => toggleSort("roas")}>
                          ROAS
                          {sortIco("roas")}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody key={p}>
                    {sorted.map((r, i) => (
                      <tr key={r.name}>
                        <td>
                          <span className="hb-yd4-chn" style={{ "--c": r.color } as React.CSSProperties}>
                            <i>{r.code}</i>
                            <b>{r.name}</b>
                          </span>
                        </td>
                        <td>
                          <span className="hb-yd4-ib">
                            <s className="hb-yd4-hide-xs" style={{ "--w": `${((r.spend / maxSpend) * 100).toFixed(1)}%`, "--c": r.color, animationDelay: `${i * 60}ms` } as React.CSSProperties} />
                            {fmtK(r.spend, currency)}
                          </span>
                        </td>
                        <td className="hb-yd4-hide-xs">{r.ctr.toFixed(2)}%</td>
                        <td className="hb-yd4-hide-sm">{Math.round(r.conv).toLocaleString("en-US")}</td>
                        <td className="hb-yd4-hide-sm">
                          {currency}
                          {r.cpa.toFixed(2)}
                        </td>
                        <td>
                          <span className="hb-yd4-ib">
                            <s className="hb-yd4-hide-xs" style={{ "--w": `${((r.roas / maxRoas) * 100).toFixed(1)}%`, "--c": r.roas >= 3 ? "#4ade80" : r.roas >= 1.5 ? "#ffd166" : "#f87171", animationDelay: `${i * 60 + 120}ms` } as React.CSSProperties} />
                            <span className={r.roas >= 3 ? "hb-yd4-good" : r.roas < 1.5 ? "hb-yd4-bad" : undefined}>{r.roas.toFixed(1)}x</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Total</td>
                      <td>{fmtK(spendT, currency)}</td>
                      <td className="hb-yd4-hide-xs">{((clicksT / imprT) * 100).toFixed(2)}%</td>
                      <td className="hb-yd4-hide-sm">{Math.round(convT).toLocaleString("en-US")}</td>
                      <td className="hb-yd4-hide-sm">
                        {currency}
                        {(spendT / convT).toFixed(2)}
                      </td>
                      <td>{(revT / spendT).toFixed(1)}x</td>
                    </tr>
                  </tfoot>
                </table>
              </section>

              <section className="hb-yd4-card" style={{ "--d": 2 } as React.CSSProperties} aria-label="Conversion funnel">
                <div className="hb-yd4-ch">
                  <div>
                    <h3 className="hb-yd4-ct">Conversion funnel</h3>
                    <p className="hb-yd4-cs">From first view to purchase, log scale</p>
                  </div>
                </div>
                <div className="hb-yd4-fun" onPointerLeave={() => setStage(null)}>
                  <svg key={p} viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label={`Funnel: ${funnel.map((f) => `${f.name} ${Math.round(f.value)}`).join(", ")}`}>
                    <defs>
                      <linearGradient id={`${uid}f`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="var(--a)" stopOpacity=".95" />
                        <stop offset=".6" stopColor="color-mix(in srgb, var(--a) 60%, #ffd166)" stopOpacity=".8" />
                        <stop offset="1" stopColor="#ffd166" stopOpacity=".7" />
                      </linearGradient>
                    </defs>
                    {funnel.map((f, i) => (
                      <rect key={f.name} className="hb-yd4-fun-band" data-on={stage === i} x={i * 20} y="0" width="20" height="100" onPointerEnter={() => setStage(i)} />
                    ))}
                    <path className="hb-yd4-fun-a" d={fpath} fill={`url(#${uid}f)`} pointerEvents="none" />
                    {[1, 2, 3, 4].map((i) => (
                      <line key={i} className="hb-yd4-fun-sep" x1={i * 20} x2={i * 20} y1="0" y2="100" pointerEvents="none" />
                    ))}
                  </svg>
                </div>
                <div className="hb-yd4-fl">
                  {funnel.map((f, i) => (
                    <button
                      key={f.name}
                      type="button"
                      aria-pressed={stage === i}
                      onPointerEnter={() => setStage(i)}
                      onPointerLeave={() => setStage(null)}
                      onFocus={() => setStage(i)}
                      onBlur={() => setStage(null)}
                    >
                      <span>{f.name}</span>
                      <b>{fmtK(f.value)}</b>
                      <em>{i === 0 ? "Start" : `${((f.value / funnel[i - 1].value) * 100).toFixed(1)}%`}</em>
                    </button>
                  ))}
                </div>
                <div className="hb-yd4-fsum">
                  <span>
                    View to purchase <b>{((funnel[4].value / funnel[0].value) * 100).toFixed(3)}%</b>
                  </span>
                  <span>
                    Biggest drop <b>Sessions to sign-ups</b>
                  </span>
                </div>
              </section>
            </div>

            <div className="hb-yd4-row2">
              <section className="hb-yd4-card" style={{ "--d": 3 } as React.CSSProperties} aria-label="Budget burn">
                <div className="hb-yd4-ch">
                  <div>
                    <h3 className="hb-yd4-ct">Budget burn</h3>
                    <p className="hb-yd4-cs">November budgets, {Math.round(MONTH_ELAPSED * 100)}% of the month elapsed</p>
                  </div>
                </div>
                <div className="hb-yd4-burn">
                  <div className="hb-yd4-rings">
                    <svg viewBox="0 0 100 100" role="img" aria-label={`${Math.round((spentAll / budgetAll) * 100)} percent of total budget spent`}>
                      {BUDGETS.map((b, i) => {
                        const r = radii[i];
                        const pct = Math.min(100, (b.spent / b.budget) * 100);
                        return (
                          <React.Fragment key={b.name}>
                            <circle className="hb-yd4-rt" cx="50" cy="50" r={r} />
                            <circle
                              className="hb-yd4-rv"
                              cx="50"
                              cy="50"
                              r={r}
                              pathLength={100}
                              data-dim={ring !== null && ring !== i}
                              style={{ stroke: b.color, strokeDasharray: `${pct.toFixed(2)} 100`, animationDelay: `${i * 150}ms` }}
                            />
                          </React.Fragment>
                        );
                      })}
                    </svg>
                    <div className="hb-yd4-rc">
                      <b>{ring === null ? `${Math.round((spentAll / budgetAll) * 100)}%` : `${Math.round((BUDGETS[ring].spent / BUDGETS[ring].budget) * 100)}%`}</b>
                      <span>{ring === null ? "of budget used" : BUDGETS[ring].name}</span>
                    </div>
                  </div>
                  <ul className="hb-yd4-bl">
                    {BUDGETS.map((b, i) => {
                      const used = b.spent / b.budget;
                      const pace = used > MONTH_ELAPSED + 0.04 ? "over" : used < MONTH_ELAPSED - 0.06 ? "under" : "on";
                      return (
                        <li key={b.name} tabIndex={0} onPointerEnter={() => setRing(i)} onPointerLeave={() => setRing(null)} onFocus={() => setRing(i)} onBlur={() => setRing(null)}>
                          <i style={{ background: b.color }} />
                          <div>
                            <b>{b.name}</b>
                            <span>
                              {fmtK(b.spent, currency)} of {fmtK(b.budget, currency)}
                            </span>
                          </div>
                          <span className="hb-yd4-pace" data-p={pace}>
                            {pace === "over" ? "Overspending" : pace === "under" ? "Underspent" : "On pace"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <p className="hb-yd4-burn-f">
                  Projected month end <b>{fmtK(spentAll / MONTH_ELAPSED, currency)}</b> against <b>{fmtK(budgetAll, currency)}</b>
                </p>
              </section>

              <section className="hb-yd4-card" style={{ "--d": 4 } as React.CSSProperties} aria-label="Top regions">
                <div className="hb-yd4-ch">
                  <div>
                    <h3 className="hb-yd4-ct">Top regions</h3>
                    <p className="hb-yd4-cs">Share of conversions by country</p>
                  </div>
                </div>
                <ol className="hb-yd4-geo">
                  {GEO.map((g, i) => (
                    <li key={g.code}>
                      <span className="hb-yd4-cc">{g.code}</span>
                      <span className="hb-yd4-gn">{g.name}</span>
                      <span className="hb-yd4-gb">
                        <i key={p} style={{ "--w": `${((g.share / GEO[0].share) * 100).toFixed(1)}%`, animationDelay: `${i * 60}ms` } as React.CSSProperties} />
                      </span>
                      <span className="hb-yd4-gv">
                        {g.share.toFixed(1)}%<span>{Math.round(g.conv * k).toLocaleString("en-US")} conv.</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <section className="hb-yd4-card" style={{ "--d": 5 } as React.CSSProperties} aria-label="Creatives">
              <div className="hb-yd4-ch">
                <div>
                  <h3 className="hb-yd4-ct">Creatives</h3>
                  <p className="hb-yd4-cs">Ranked by click-through rate</p>
                </div>
              </div>
              <div className="hb-yd4-crs">
                {CREATIVES.map((c, i) => (
                  <button key={c.title} type="button" className="hb-yd4-cr" style={{ animationDelay: `${300 + i * 60}ms` }} aria-label={`${c.title}, ${c.channel}, CTR ${c.ctr}%, ${c.status}`}>
                    <span className="hb-yd4-art" style={{ background: c.art }}>
                      <span className="hb-yd4-fmt">{c.fmt}</span>
                      {i === 4 ? <span className="hb-yd4-win">Top CTR</span> : null}
                      <span className="hb-yd4-art-t">
                        <small>{c.kicker}</small>
                        {c.title}
                      </span>
                    </span>
                    <span className="hb-yd4-crm">
                      <b>{c.channel}</b>
                      <span>
                        CTR <em>{c.ctr.toFixed(2)}%</em>
                      </span>
                      <span>
                        <span className="hb-yd4-st" style={{ "--c": STATUS_COLOR[c.status] } as React.CSSProperties}>
                          {c.status}
                        </span>
                        {fmtK(c.spend * k, currency)}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
