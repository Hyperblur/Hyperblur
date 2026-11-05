"use client";

import * as React from "react";

export type SupportView = "all" | "mine" | "urgent" | "unassigned";
export type SupportPriority = "Urgent" | "High" | "Normal" | "Low";

export interface SupportTicket {
  id: string;
  subject: string;
  customer: string;
  priority: SupportPriority;
  assignees: string[];
  waiting: string;
  channel: "email" | "chat" | "phone";
  slaMinutes: number;
}

export interface DashboardSupportProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  brand?: string;
  user?: string;
  tickets?: SupportTicket[];
  view?: SupportView;
  defaultView?: SupportView;
  onViewChange?: (view: SupportView) => void;
  onTicketOpen?: (ticket: SupportTicket) => void;
}

const css = `
.hb-yd3 {
  --a: #8b7cff;
  container: hb-yd3 / inline-size;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #1f2024;
  border-radius: 16px;
  background: #0b0b0d;
  color: #ebebef;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  overflow: hidden;
  position: relative;
  -webkit-font-smoothing: antialiased;
}
.hb-yd3 *, .hb-yd3 *::before, .hb-yd3 *::after { box-sizing: border-box; }
.hb-yd3 button, .hb-yd3 input { font: inherit; color: inherit; }
.hb-yd3 button:focus-visible, .hb-yd3 input:focus-visible, .hb-yd3 [tabindex]:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }
.hb-yd3-app { display: grid; grid-template-columns: 236px minmax(0, 1fr); min-height: 700px; }
.hb-yd3-side { display: flex; flex-direction: column; gap: 6px; min-width: 0; padding: 14px 10px; border-right: 1px solid #1c1d21; background: #0e0e11; }
.hb-yd3-brand { display: flex; align-items: center; gap: 9px; height: 36px; padding: 0 8px; margin-bottom: 6px; font-size: 14px; font-weight: 600; }
.hb-yd3-mark { display: grid; place-items: center; flex: none; width: 24px; height: 24px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--a) 40%, #ffffff), var(--a) 60%); color: #ffffff; box-shadow: 0 0 16px -2px var(--a); }
.hb-yd3-new { display: flex; align-items: center; justify-content: center; gap: 6px; height: 34px; margin: 0 4px 10px; border: 1px solid color-mix(in srgb, var(--a) 45%, transparent); border-radius: 9px; background: color-mix(in srgb, var(--a) 14%, transparent); color: #ffffff; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: background .15s ease; }
.hb-yd3-new:hover { background: color-mix(in srgb, var(--a) 24%, transparent); }
.hb-yd3-grp { padding: 10px 10px 4px; color: #66676e; font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-yd3-views { display: flex; flex-direction: column; gap: 1px; margin: 0; padding: 0; list-style: none; }
.hb-yd3-vl { display: flex; align-items: center; gap: 9px; width: 100%; height: 32px; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; color: #a0a1a8; font-size: 13px; text-align: left; cursor: pointer; transition: background .15s ease, color .15s ease; }
.hb-yd3-vl:hover { background: #16171b; color: #ebebef; }
.hb-yd3-vl[aria-current="true"] { background: #1a1b20; color: #ffffff; }
.hb-yd3-vl[aria-current="true"] .hb-yd3-ico { color: var(--a); }
.hb-yd3-vl em { margin-left: auto; color: #66676e; font-size: 11.5px; font-style: normal; font-variant-numeric: tabular-nums; }
.hb-yd3-vl em[data-hot="true"] { padding: 0 6px; border-radius: 999px; background: rgba(251, 113, 133, .16); color: #fb7185; font-weight: 600; }
.hb-yd3-vl i { width: 8px; height: 8px; margin: 0 4px; border-radius: 3px; }
.hb-yd3-me { display: flex; align-items: center; gap: 10px; margin-top: auto; padding: 10px; border: 1px solid #1f2025; border-radius: 12px; background: #121216; }
.hb-yd3-me-t { min-width: 0; flex: 1; }
.hb-yd3-me-t b { display: block; overflow: hidden; font-size: 12.5px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd3-me-t span { color: #7a7b83; font-size: 11.5px; }
.hb-yd3-sw { position: relative; flex: none; width: 34px; height: 20px; padding: 0; border: 0; border-radius: 999px; background: #2a2b31; cursor: pointer; transition: background .2s ease; }
.hb-yd3-sw::after { content: ""; position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; border-radius: 50%; background: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, .4); transition: transform .2s cubic-bezier(.3, .7, .2, 1); }
.hb-yd3-sw[aria-checked="true"] { background: #34d399; }
.hb-yd3-sw[aria-checked="true"]::after { transform: translateX(14px); }
.hb-yd3-av { position: relative; display: grid; place-items: center; flex: none; border-radius: 50%; color: #ffffff; font-size: 10.5px; font-weight: 600; letter-spacing: .01em; }
.hb-yd3-av[data-on="true"]::after { content: ""; position: absolute; right: -1px; bottom: -1px; width: 8px; height: 8px; border: 2px solid #0e0e11; border-radius: 50%; background: #34d399; }
.hb-yd3-av[data-on="false"]::after { content: ""; position: absolute; right: -1px; bottom: -1px; width: 8px; height: 8px; border: 2px solid #0e0e11; border-radius: 50%; background: #66676e; }
.hb-yd3-main { display: flex; flex-direction: column; min-width: 0; }
.hb-yd3-top { display: flex; align-items: center; gap: 12px; height: 58px; padding: 0 22px; border-bottom: 1px solid #1c1d21; }
.hb-yd3-top h2 { margin: 0; overflow: hidden; font-size: 15px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd3-live { display: inline-flex; align-items: center; gap: 6px; flex: none; height: 24px; padding: 0 9px; border-radius: 999px; background: rgba(52, 211, 153, .1); color: #34d399; font-size: 11.5px; font-weight: 600; }
.hb-yd3-live i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: hb-yd3-ping 1.6s ease-out infinite; }
.hb-yd3-search { position: relative; width: 250px; margin-left: auto; color: #66676e; }
.hb-yd3-search svg { position: absolute; top: 50%; left: 10px; width: 15px; height: 15px; transform: translateY(-50%); pointer-events: none; }
.hb-yd3-search input { width: 100%; height: 34px; padding: 0 12px 0 32px; border: 1px solid #23242a; border-radius: 9px; background: #121216; font-size: 13px; }
.hb-yd3-search input::placeholder { color: #66676e; }
.hb-yd3-search input:focus-visible { border-color: var(--a); outline-offset: 0; }
.hb-yd3-ibtn { position: relative; display: grid; place-items: center; flex: none; width: 34px; height: 34px; border: 1px solid #23242a; border-radius: 9px; background: #121216; color: #a0a1a8; cursor: pointer; }
.hb-yd3-ibtn:hover { color: #ffffff; border-color: #33343b; }
.hb-yd3-ico { display: block; flex: none; width: 16px; height: 16px; }
.hb-yd3-content { display: flex; flex-direction: column; gap: 14px; min-width: 0; padding: 20px 22px 22px; }
.hb-yd3-card { min-width: 0; padding: 16px; border: 1px solid #1f2025; border-radius: 14px; background: #111114; animation: hb-yd3-rise .55s cubic-bezier(.2, .7, .2, 1) both; animation-delay: calc(var(--d, 0) * 65ms); }
.hb-yd3-ch { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
.hb-yd3-ct { margin: 0; font-size: 13px; font-weight: 600; }
.hb-yd3-cs { margin: 2px 0 0; color: #7a7b83; font-size: 12px; }
.hb-yd3-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.hb-yd3-kpi { display: flex; flex-direction: column; gap: 10px; }
.hb-yd3-kpi-h { display: flex; align-items: center; justify-content: space-between; color: #8a8b93; font-size: 12px; }
.hb-yd3-kpi-v { display: flex; align-items: baseline; gap: 8px; }
.hb-yd3-kpi-v b { font-size: 26px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; line-height: 1; }
.hb-yd3-kpi-v span { font-size: 12px; font-weight: 600; }
.hb-yd3-up { color: #34d399; }
.hb-yd3-dn { color: #fb7185; }
.hb-yd3-meter { display: grid; grid-template-columns: repeat(24, minmax(0, 1fr)); gap: 2px; height: 14px; }
.hb-yd3-meter i { border-radius: 2px; background: #222329; animation: hb-yd3-fade .4s both; }
.hb-yd3-meter i[data-on="true"] { background: var(--k); }
.hb-yd3-meter i[data-mark="true"] { box-shadow: 0 0 0 1px #ffffff inset; }
.hb-yd3-kpi-f { color: #66676e; font-size: 11.5px; }
.hb-yd3-row { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); gap: 14px; }
.hb-yd3-col { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.hb-yd3-leg { display: flex; flex-wrap: wrap; gap: 12px; color: #8a8b93; font-size: 12px; }
.hb-yd3-leg span { display: inline-flex; align-items: center; gap: 6px; }
.hb-yd3-leg i { width: 10px; height: 10px; border-radius: 3px; background: var(--a); }
.hb-yd3-leg i[data-k="fc"] { background: repeating-linear-gradient(135deg, color-mix(in srgb, var(--a) 55%, transparent) 0 2px, transparent 2px 4px); box-shadow: 0 0 0 1px color-mix(in srgb, var(--a) 45%, transparent) inset; }
.hb-yd3-leg i[data-k="lw"] { height: 2px; background: #c7c8cf; }
.hb-yd3-hours { position: relative; display: grid; grid-template-columns: repeat(24, minmax(0, 1fr)); grid-template-rows: 100%; align-items: end; gap: 4px; height: 190px; padding-top: 8px; border-bottom: 1px solid #26272d; background-image: linear-gradient(#1a1b1f 1px, transparent 1px); background-size: 100% 25%; }
.hb-yd3-hb { position: relative; height: 100%; min-width: 0; padding: 0; border: 0; background: none; cursor: pointer; }
.hb-yd3-hb span { position: absolute; right: 0; bottom: 0; left: 0; height: var(--h); border-radius: 4px 4px 1px 1px; background: linear-gradient(180deg, var(--a), color-mix(in srgb, var(--a) 55%, #0b0b0d)); transform-origin: bottom; animation: hb-yd3-grow .7s cubic-bezier(.3, .7, .2, 1) both; transition: filter .15s ease; }
.hb-yd3-hb[data-fc="true"] span { background: repeating-linear-gradient(135deg, color-mix(in srgb, var(--a) 40%, transparent) 0 2px, transparent 2px 5px); box-shadow: 0 0 0 1px color-mix(in srgb, var(--a) 35%, transparent) inset; }
.hb-yd3-hb[data-now="true"] span { box-shadow: 0 0 18px -2px var(--a); }
.hb-yd3-hb em { position: absolute; right: -1px; left: -1px; bottom: var(--l); height: 2px; border-radius: 2px; background: #c7c8cf; opacity: .75; }
.hb-yd3-hb:hover span, .hb-yd3-hb:focus-visible span { filter: brightness(1.3); }
.hb-yd3-hx { display: grid; grid-template-columns: repeat(24, minmax(0, 1fr)); gap: 4px; padding-top: 7px; color: #66676e; font-size: 10.5px; text-align: center; }
.hb-yd3-hx span:nth-child(3n + 2), .hb-yd3-hx span:nth-child(3n) { visibility: hidden; }
.hb-yd3-tt { position: absolute; z-index: 3; padding: 8px 10px; border: 1px solid #2c2d34; border-radius: 9px; background: rgba(20, 20, 24, .96); box-shadow: 0 14px 30px -10px rgba(0, 0, 0, .8); font-size: 12px; line-height: 1.5; white-space: nowrap; pointer-events: none; }
.hb-yd3-tt-d { color: #8a8b93; font-size: 11px; }
.hb-yd3-tt b { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-yd3-gauge { position: relative; max-width: 260px; margin: 0 auto; }
.hb-yd3-gauge svg { display: block; width: 100%; height: auto; overflow: visible; }
.hb-yd3-g-t { fill: none; stroke: #1e1f24; stroke-width: 12; stroke-linecap: round; }
.hb-yd3-g-v { fill: none; stroke-width: 12; stroke-linecap: round; animation: hb-yd3-dash 1.2s .2s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd3-g-tk { stroke: #2c2d33; stroke-width: 1.5; }
.hb-yd3-g-tg { stroke: #ffffff; stroke-width: 2; }
.hb-yd3-needle { transform-origin: 100px 100px; animation: hb-yd3-needle 1.3s .2s cubic-bezier(.3, 1.4, .4, 1) both; }
.hb-yd3-gc { position: absolute; right: 0; bottom: 0; left: 0; text-align: center; }
.hb-yd3-gc b { display: block; font-size: 30px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; line-height: 1; }
.hb-yd3-gc span { color: #7a7b83; font-size: 12px; }
.hb-yd3-gs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 16px; }
.hb-yd3-gs div { padding: 9px 10px; border: 1px solid #1f2025; border-radius: 10px; background: #0d0d10; }
.hb-yd3-gs span { display: flex; align-items: center; gap: 6px; color: #7a7b83; font-size: 11.5px; }
.hb-yd3-gs span i { width: 6px; height: 6px; border-radius: 50%; }
.hb-yd3-gs b { display: block; margin-top: 2px; font-size: 16px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-yd3-tabs { display: inline-flex; gap: 2px; padding: 3px; border: 1px solid #1f2025; border-radius: 9px; background: #0d0d10; }
.hb-yd3-tabs button { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; border: 0; border-radius: 6px; background: transparent; color: #8a8b93; font-size: 12px; font-weight: 500; cursor: pointer; transition: background .15s ease, color .15s ease; }
.hb-yd3-tabs button:hover { color: #ffffff; }
.hb-yd3-tabs button[aria-pressed="true"] { background: #222329; color: #ffffff; }
.hb-yd3-tabs em { color: #66676e; font-size: 11px; font-style: normal; font-variant-numeric: tabular-nums; }
.hb-yd3-q { display: flex; flex-direction: column; margin: 0 -8px; padding: 0; list-style: none; }
.hb-yd3-qr {
  display: grid;
  grid-template-columns: 62px minmax(0, 1fr) 78px 64px 92px;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 8px;
  border: 0;
  border-top: 1px solid #1a1b1f;
  border-radius: 9px;
  background: transparent;
  text-align: left;
  cursor: pointer;
  animation: hb-yd3-rise .4s cubic-bezier(.2, .7, .2, 1) both;
  transition: background .15s ease;
}
.hb-yd3-q li:first-child .hb-yd3-qr { border-top-color: transparent; }
.hb-yd3-qr:hover, .hb-yd3-qr:focus-visible { background: #17181c; }
.hb-yd3-qid { color: #66676e; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-yd3-qid svg { display: inline-block; width: 12px; height: 12px; margin-right: 4px; vertical-align: -1px; }
.hb-yd3-qs { min-width: 0; }
.hb-yd3-qs b { display: block; overflow: hidden; font-size: 13px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd3-qs span { display: block; overflow: hidden; color: #7a7b83; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd3-pri { display: inline-flex; align-items: center; gap: 5px; justify-self: start; height: 21px; padding: 0 8px; border-radius: 999px; font-size: 11px; font-weight: 600; }
.hb-yd3-pri i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.hb-yd3-pri[data-p="Urgent"] { background: rgba(251, 113, 133, .14); color: #fb7185; }
.hb-yd3-pri[data-p="High"] { background: rgba(251, 191, 36, .13); color: #fbbf24; }
.hb-yd3-pri[data-p="Normal"] { background: rgba(127, 179, 255, .12); color: #7fb3ff; }
.hb-yd3-pri[data-p="Low"] { background: #1e1f24; color: #a0a1a8; }
.hb-yd3-stack { display: flex; }
.hb-yd3-stack .hb-yd3-av { box-shadow: 0 0 0 2px #111114; }
.hb-yd3-stack .hb-yd3-av + .hb-yd3-av { margin-left: -7px; }
.hb-yd3-none { display: grid; place-items: center; width: 24px; height: 24px; border: 1px dashed #3a3b42; border-radius: 50%; color: #66676e; }
.hb-yd3-none svg { width: 12px; height: 12px; }
.hb-yd3-sla { justify-self: end; font-size: 11.5px; font-weight: 600; font-variant-numeric: tabular-nums; text-align: right; white-space: nowrap; }
.hb-yd3-sla span { display: block; color: #66676e; font-size: 11px; font-weight: 400; }
.hb-yd3-sla[data-s="ok"] { color: #a0a1a8; }
.hb-yd3-sla[data-s="risk"] { color: #fbbf24; }
.hb-yd3-sla[data-s="late"] { color: #fb7185; }
.hb-yd3-empty { padding: 28px 0; color: #7a7b83; text-align: center; }
.hb-yd3-csat { display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px; }
.hb-yd3-csat b { font-size: 24px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; }
.hb-yd3-csat span { font-size: 12px; font-weight: 600; }
.hb-yd3-cplot { position: relative; height: 92px; cursor: crosshair; touch-action: pan-y; }
.hb-yd3-cplot svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; animation: hb-yd3-wipe 1s .3s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd3-cl { fill: none; stroke: #34d399; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.hb-yd3-ctg { stroke: #2c2d33; stroke-dasharray: 3 3; stroke-width: 1; vector-effect: non-scaling-stroke; }
.hb-yd3-cdot { position: absolute; width: 10px; height: 10px; margin: -5px 0 0 -5px; border: 2px solid #34d399; border-radius: 50%; background: #111114; pointer-events: none; }
.hb-yd3-dist { display: flex; height: 6px; margin-top: 12px; border-radius: 999px; overflow: hidden; gap: 2px; }
.hb-yd3-dist i { height: 100%; transform-origin: left; animation: hb-yd3-bar .9s .4s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd3-distl { display: flex; justify-content: space-between; margin-top: 6px; color: #7a7b83; font-size: 11px; }
.hb-yd3-online { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: #8a8b93; font-size: 12px; }
.hb-yd3-feed { position: relative; display: flex; flex-direction: column; gap: 2px; height: 214px; margin: 0; padding: 0; list-style: none; overflow: hidden; }
.hb-yd3-feed::after { content: ""; position: absolute; right: 0; bottom: 0; left: 0; height: 36px; background: linear-gradient(transparent, #111114); pointer-events: none; }
.hb-yd3-feed li { display: grid; grid-template-columns: 26px minmax(0, 1fr) auto; align-items: center; gap: 9px; padding: 6px 0; font-size: 12.5px; }
.hb-yd3-feed li[data-new="true"] { animation: hb-yd3-slide .5s cubic-bezier(.2, .7, .2, 1) both; }
.hb-yd3-feed p { margin: 0; overflow: hidden; color: #a0a1a8; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd3-feed p b { color: #ebebef; font-weight: 500; }
.hb-yd3-feed p strong { color: var(--a); font-weight: 600; }
.hb-yd3-feed time { color: #66676e; font-size: 11px; font-variant-numeric: tabular-nums; }
.hb-yd3-eye { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: #1a1b20; color: #8a8b93; }
.hb-yd3-eye svg { width: 13px; height: 13px; }
@keyframes hb-yd3-rise { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-yd3-slide { from { opacity: 0; transform: translate3d(0, -14px, 0); max-height: 0; } to { opacity: 1; transform: none; max-height: 40px; } }
@keyframes hb-yd3-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-yd3-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-yd3-wipe { from { clip-path: inset(-8px 100% -8px -8px); } to { clip-path: inset(-8px -8px -8px -8px); } }
@keyframes hb-yd3-dash { from { stroke-dasharray: 0 100; } }
@keyframes hb-yd3-needle { from { transform: rotate(-90deg); } }
@keyframes hb-yd3-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-yd3-ping { 0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, .6); } 100% { box-shadow: 0 0 0 7px rgba(52, 211, 153, 0); } }
@container hb-yd3 (max-width: 1019px) {
  .hb-yd3-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-yd3-row { grid-template-columns: minmax(0, 1fr); }
}
@container hb-yd3 (max-width: 759px) {
  .hb-yd3-app { grid-template-columns: minmax(0, 1fr); min-height: 0; }
  .hb-yd3-side { flex-direction: row; align-items: center; gap: 4px; padding: 8px 12px; border-right: 0; border-bottom: 1px solid #1c1d21; overflow-x: auto; }
  .hb-yd3-brand { margin: 0; padding: 0 6px 0 0; }
  .hb-yd3-brand span:last-child, .hb-yd3-new, .hb-yd3-grp, .hb-yd3-me, .hb-yd3-teams, .hb-yd3-vl em, .hb-yd3-vl-t { display: none; }
  .hb-yd3-views { flex-direction: row; gap: 4px; }
  .hb-yd3-vl { justify-content: center; width: 34px; padding: 0; }
  .hb-yd3-top { padding: 0 16px; }
  .hb-yd3-search { display: none; }
  .hb-yd3-top .hb-yd3-ibtn { margin-left: auto; }
  .hb-yd3-content { padding: 16px; }
  .hb-yd3-qr { grid-template-columns: minmax(0, 1fr) auto auto; }
  .hb-yd3-qid, .hb-yd3-stack, .hb-yd3-qr .hb-yd3-none { display: none; }
}
@container hb-yd3 (max-width: 459px) {
  .hb-yd3-kpis { grid-template-columns: minmax(0, 1fr); }
  .hb-yd3-qr { grid-template-columns: minmax(0, 1fr) auto; }
  .hb-yd3-qr .hb-yd3-pri { display: none; }
  .hb-yd3-live { display: none; }
  .hb-yd3-hours { gap: 2px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yd3 *, .hb-yd3 *::before, .hb-yd3 *::after { animation: none !important; transition: none !important; }
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
  return `linear-gradient(135deg, hsl(${hue} 60% 55%), hsl(${(hue + 40) % 360} 58% 38%))`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
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

const icons: Record<string, string[]> = {
  inbox: ["M22 12h-6l-2 3h-4l-2-3H2", "M5.5 5h13L22 12v7H2v-7z"],
  user: ["M20 21a8 8 0 0 0-16 0", "M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"],
  flame: ["M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 2-5 5-5 8 0 4 3 7 7 7z"],
  clock: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M12 7v5l3 2"],
  check: ["M20 6L9 17l-5-5"],
  plus: ["M12 5v14", "M5 12h14"],
  search: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.3-4.3"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.7 21a2 2 0 0 1-3.4 0"],
  mail: ["M3 5h18v14H3z", "M3 6l9 7 9-7"],
  chat: ["M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"],
  phone: ["M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"],
  eye: ["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  reply: ["M9 17l-5-5 5-5", "M4 12h11a5 5 0 0 1 5 5v2"],
  dash: ["M5 12h14"],
};

function Ico({ n, className = "hb-yd3-ico" }: { n: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(icons[n] ?? []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

const DEFAULT_TICKETS: SupportTicket[] = [
  { id: "4821", subject: "Payment failed after updating card", customer: "Coastline Coffee", priority: "Urgent", assignees: ["Ines Duarte"], waiting: "12m", channel: "email", slaMinutes: 8 },
  { id: "4819", subject: "SSO login loops back to the sign-in page", customer: "Halvorsen Group", priority: "Urgent", assignees: [], waiting: "26m", channel: "chat", slaMinutes: -4 },
  { id: "4816", subject: "CSV export is missing custom columns", customer: "Brightwave Studio", priority: "High", assignees: ["Lucía Fernández"], waiting: "41m", channel: "email", slaMinutes: 19 },
  { id: "4812", subject: "Invoice needs our VAT number", customer: "Pemberton Legal", priority: "Normal", assignees: ["Ravi Menon"], waiting: "1h 05m", channel: "email", slaMinutes: 115 },
  { id: "4809", subject: "Webhook retries are not firing", customer: "Lumen Labs", priority: "High", assignees: [], waiting: "1h 22m", channel: "chat", slaMinutes: 23 },
  { id: "4803", subject: "How do I add a teammate to my plan?", customer: "Juniper Florals", priority: "Low", assignees: ["Lucía Fernández"], waiting: "2h 10m", channel: "chat", slaMinutes: 350 },
  { id: "4798", subject: "Android app crashes when opening reports", customer: "Northpeak Outfitters", priority: "High", assignees: ["Ines Duarte", "Ravi Menon"], waiting: "3h 02m", channel: "phone", slaMinutes: 58 },
  { id: "4790", subject: "Refund for a duplicate charge", customer: "Studio Kiln", priority: "Normal", assignees: ["Lucía Fernández"], waiting: "4h 15m", channel: "email", slaMinutes: 165 },
];

const AGENTS = ["Ines Duarte", "Ravi Menon", "Theo Laurent", "Amina Yusuf", "Jun Park", "Clara Moss"];

const ACTIVITY: { who: string; verb: string; ticket: string }[] = [
  { who: "Ines Duarte", verb: "is replying to", ticket: "#4821" },
  { who: "Ravi Menon", verb: "opened", ticket: "#4809" },
  { who: "Coastline Coffee", verb: "replied on", ticket: "#4821" },
  { who: "Theo Laurent", verb: "is viewing", ticket: "#4819" },
  { who: "Amina Yusuf", verb: "solved", ticket: "#4787" },
  { who: "Jun Park", verb: "added a note to", ticket: "#4798" },
  { who: "Lumen Labs", verb: "attached a log to", ticket: "#4809" },
  { who: "Clara Moss", verb: "is viewing", ticket: "#4816" },
  { who: "Ravi Menon", verb: "escalated", ticket: "#4798" },
  { who: "Theo Laurent", verb: "took", ticket: "#4819" },
  { who: "Amina Yusuf", verb: "is replying to", ticket: "#4812" },
  { who: "Ines Duarte", verb: "merged", ticket: "#4805 into #4821" },
];
const AGO = ["now", "14s", "38s", "1m", "2m", "3m", "4m"];

const NOW_HOUR = 14;
const HOURS = Array.from({ length: 24 }, (_, h) => {
  const curve = 3 + 40 * Math.exp(-((h - 10.5) ** 2) / 9) + 30 * Math.exp(-((h - 15) ** 2) / 7) + (h > 18 ? 6 : 0);
  const today = Math.round(curve * (0.9 + hash(h + 3) * 0.25));
  const last = Math.round(curve * (0.85 + hash(h + 70) * 0.22));
  return { today: h === NOW_HOUR ? Math.round(today * 0.62) : today, last, forecast: h > NOW_HOUR };
});
const CSAT = [92.1, 93.4, 92.8, 94.0, 93.1, 91.7, 92.9, 94.6, 95.2, 93.8, 94.1, 95.0, 93.6, 94.2];
const CSAT_DAYS = ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26", "Oct 27", "Oct 28", "Oct 29", "Oct 30", "Oct 31", "Nov 1", "Nov 2", "Nov 3", "Nov 4"];

const VIEWS: { id: SupportView; label: string }[] = [
  { id: "all", label: "All open" },
  { id: "mine", label: "Mine" },
  { id: "urgent", label: "Urgent" },
  { id: "unassigned", label: "Unassigned" },
];

function slaState(m: number) {
  if (m < 0) return { s: "late", text: `Breached ${Math.abs(m)}m` };
  if (m <= 30) return { s: "risk", text: `Due in ${m}m` };
  return { s: "ok", text: m >= 60 ? `Due in ${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m` : `Due in ${m}m` };
}

function hourLabel(h: number) {
  return `${String(h).padStart(2, "0")}:00`;
}

export function DashboardSupport({
  accent = "#8b7cff",
  brand = "Helpdeck",
  user = "Lucía Fernández",
  tickets = DEFAULT_TICKETS,
  view,
  defaultView = "all",
  onViewChange,
  onTicketOpen,
  className = "",
  style,
  ...rest
}: DashboardSupportProps) {
  const uid = React.useId().replace(/:/g, "");
  const [innerView, setInnerView] = React.useState<SupportView>(defaultView);
  const [online, setOnline] = React.useState(true);
  const [hour, setHour] = React.useState<number | null>(null);
  const [day, setDay] = React.useState<number | null>(null);
  const [tick, setTick] = React.useState(0);
  const v = view ?? innerView;

  React.useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 2800);
    return () => window.clearInterval(id);
  }, []);

  const pickView = (next: SupportView) => {
    setInnerView(next);
    onViewChange?.(next);
  };

  const filter = (id: SupportView) =>
    tickets.filter((t) =>
      id === "mine" ? t.assignees.includes(user) : id === "urgent" ? t.priority === "Urgent" : id === "unassigned" ? t.assignees.length === 0 : true,
    );
  const list = filter(v);

  const maxH = Math.max(...HOURS.map((h) => Math.max(h.today, h.last)));
  const top = Math.ceil(maxH / 10) * 10;
  const todayTotal = HOURS.filter((h) => !h.forecast).reduce((s, h) => s + h.today, 0);
  const fcTotal = HOURS.filter((h) => h.forecast).reduce((s, h) => s + h.today, 0);

  const sla = 92.6;
  const target = 95;
  const ang = (p: number) => Math.PI * (1 - p / 100);
  const gx = (p: number, r: number) => 100 + Math.cos(ang(p)) * r;
  const gy = (p: number, r: number) => 100 - Math.sin(ang(p)) * r;

  const lo = 90;
  const hi = 96;
  const cpts: Pt[] = CSAT.map((c, i) => [(i / (CSAT.length - 1)) * 100, 6 + (1 - (c - lo) / (hi - lo)) * 88]);
  const cline = smooth(cpts);
  const cdelta = CSAT[CSAT.length - 1] - CSAT[CSAT.length - 8];

  const feed = Array.from({ length: 6 }, (_, k) => ACTIVITY[(((tick - k) % ACTIVITY.length) + ACTIVITY.length) % ACTIVITY.length]);

  const kpis = [
    { label: "Open tickets", value: "142", delta: "-8%", good: true, fill: 14, mark: 18, color: "var(--a)", foot: "18 over capacity threshold" },
    { label: "First response", value: "14m", delta: "-3m", good: true, fill: 19, mark: 16, color: "#34d399", foot: "Median, target under 20m" },
    { label: "Time to resolve", value: "3h 12m", delta: "+11m", good: false, fill: 15, mark: 14, color: "#fbbf24", foot: "Median, target under 3h" },
    { label: "Solved today", value: "61", delta: "+12", good: true, fill: 17, mark: 20, color: "#7fb3ff", foot: "Goal 72 by end of shift" },
  ];

  const qKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const li = e.currentTarget.parentElement;
    const next = (e.key === "ArrowDown" ? li?.nextElementSibling : li?.previousElementSibling)?.querySelector("button");
    next?.focus();
  };

  const hourKey = (e: React.KeyboardEvent<HTMLButtonElement>, h: number) => {
    const n = e.key === "ArrowRight" ? Math.min(23, h + 1) : e.key === "ArrowLeft" ? Math.max(0, h - 1) : null;
    if (n === null) return;
    e.preventDefault();
    (e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus();
  };

  const csatMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    setDay(Math.max(0, Math.min(CSAT.length - 1, Math.round(((e.clientX - b.left) / b.width) * (CSAT.length - 1)))));
  };
  const csatKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") setDay((d) => Math.min(CSAT.length - 1, (d ?? -1) + 1));
    else if (e.key === "ArrowLeft") setDay((d) => Math.max(0, (d ?? CSAT.length) - 1));
    else if (e.key === "Escape") setDay(null);
    else return;
    e.preventDefault();
  };

  const vars = { "--a": accent, ...style } as React.CSSProperties;
  const hh = hour === null ? null : HOURS[hour];

  return (
    <div className={`hb-yd3 ${className}`} style={vars} {...rest}>
      <style href="hb-dashboard-support" precedence="default">
        {css}
      </style>
      <div className="hb-yd3-app">
        <aside className="hb-yd3-side">
          <div className="hb-yd3-brand">
            <span className="hb-yd3-mark" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                <path d="M4 14h3v5H4zM17 14h3v5h-3z" />
              </svg>
            </span>
            <span>{brand}</span>
          </div>
          <button type="button" className="hb-yd3-new">
            <Ico n="plus" />
            New ticket
          </button>
          <div className="hb-yd3-grp" aria-hidden="true">
            Views
          </div>
          <nav aria-label="Ticket views">
            <ul className="hb-yd3-views">
              {[
                { id: "all" as SupportView, label: "All open", icon: "inbox", n: tickets.length },
                { id: "mine" as SupportView, label: "My tickets", icon: "user", n: filter("mine").length },
                { id: "urgent" as SupportView, label: "Urgent", icon: "flame", n: filter("urgent").length, hot: true },
                { id: "unassigned" as SupportView, label: "Unassigned", icon: "clock", n: filter("unassigned").length },
              ].map((item) => (
                <li key={item.id}>
                  <button type="button" className="hb-yd3-vl" aria-label={item.label} aria-current={v === item.id ? "true" : undefined} onClick={() => pickView(item.id)}>
                    <Ico n={item.icon} />
                    <span className="hb-yd3-vl-t">{item.label}</span>
                    <em data-hot={item.hot && item.n > 0}>{item.n}</em>
                  </button>
                </li>
              ))}
              <li>
                <button type="button" className="hb-yd3-vl" aria-label="Solved today">
                  <Ico n="check" />
                  <span className="hb-yd3-vl-t">Solved today</span>
                  <em>61</em>
                </button>
              </li>
            </ul>
          </nav>
          <div className="hb-yd3-grp" aria-hidden="true">
            Teams
          </div>
          <ul className="hb-yd3-views hb-yd3-teams">
            {[
              { name: "Billing", c: "#fb7185", n: 38 },
              { name: "Technical", c: "#7fb3ff", n: 64 },
              { name: "Onboarding", c: "#34d399", n: 27 },
              { name: "Enterprise", c: "#fbbf24", n: 13 },
            ].map((g) => (
              <li key={g.name}>
                <button type="button" className="hb-yd3-vl">
                  <i style={{ background: g.c }} />
                  <span className="hb-yd3-vl-t">{g.name}</span>
                  <em>{g.n}</em>
                </button>
              </li>
            ))}
          </ul>
          <div className="hb-yd3-me">
            <span className="hb-yd3-av" data-on={online} style={{ width: 30, height: 30, background: tone(user) }}>
              {initials(user)}
            </span>
            <div className="hb-yd3-me-t">
              <b>{user}</b>
              <span>{online ? "Online, taking chats" : "Away"}</span>
            </div>
            <button type="button" role="switch" className="hb-yd3-sw" aria-checked={online} aria-label="Available for new chats" onClick={() => setOnline((o) => !o)} />
          </div>
        </aside>

        <div className="hb-yd3-main">
          <header className="hb-yd3-top">
            <h2>Support overview</h2>
            <span className="hb-yd3-live">
              <i />
              Live
            </span>
            <label className="hb-yd3-search">
              <Ico n="search" />
              <input type="search" placeholder="Search tickets, customers" aria-label="Search tickets" />
            </label>
            <button type="button" className="hb-yd3-ibtn" aria-label="Notifications">
              <Ico n="bell" />
            </button>
          </header>

          <div className="hb-yd3-content">
            <div className="hb-yd3-kpis">
              {kpis.map((k, i) => (
                <div className="hb-yd3-card hb-yd3-kpi" key={k.label} style={{ "--d": i, "--k": k.color } as React.CSSProperties}>
                  <div className="hb-yd3-kpi-h">
                    <span>{k.label}</span>
                  </div>
                  <div className="hb-yd3-kpi-v">
                    <b>{k.value}</b>
                    <span className={k.good ? "hb-yd3-up" : "hb-yd3-dn"}>{k.delta}</span>
                  </div>
                  <div className="hb-yd3-meter" aria-hidden="true">
                    {Array.from({ length: 24 }, (_, s) => (
                      <i key={s} data-on={s < k.fill} data-mark={s === k.mark} style={{ animationDelay: `${300 + s * 18}ms` }} />
                    ))}
                  </div>
                  <span className="hb-yd3-kpi-f">{k.foot}</span>
                </div>
              ))}
            </div>

            <div className="hb-yd3-row">
              <section className="hb-yd3-card" style={{ "--d": 4 } as React.CSSProperties} aria-label="Ticket volume by hour">
                <div className="hb-yd3-ch">
                  <div>
                    <h3 className="hb-yd3-ct">Ticket volume by hour</h3>
                    <p className="hb-yd3-cs">
                      {todayTotal} new so far today, {fcTotal} forecast by midnight
                    </p>
                  </div>
                  <div className="hb-yd3-leg">
                    <span>
                      <i />
                      Today
                    </span>
                    <span>
                      <i data-k="fc" />
                      Forecast
                    </span>
                    <span>
                      <i data-k="lw" />
                      Last Wednesday
                    </span>
                  </div>
                </div>
                <div className="hb-yd3-hours" onPointerLeave={() => setHour(null)}>
                  {HOURS.map((h, i) => (
                    <button
                      key={i}
                      type="button"
                      className="hb-yd3-hb"
                      data-fc={h.forecast}
                      data-now={i === NOW_HOUR}
                      aria-label={`${hourLabel(i)}, ${h.today} tickets${h.forecast ? " forecast" : ""}, last week ${h.last}`}
                      onPointerEnter={() => setHour(i)}
                      onFocus={() => setHour(i)}
                      onBlur={() => setHour(null)}
                      onKeyDown={(e) => hourKey(e, i)}
                    >
                      <span style={{ "--h": `${((h.today / top) * 100).toFixed(1)}%`, animationDelay: `${i * 25}ms` } as React.CSSProperties} />
                      <em style={{ "--l": `${((h.last / top) * 100).toFixed(1)}%` } as React.CSSProperties} />
                    </button>
                  ))}
                  {hh && hour !== null ? (
                    <div
                      className="hb-yd3-tt"
                      style={{
                        left: `${(((hour + 0.5) / 24) * 100).toFixed(2)}%`,
                        bottom: `calc(${((Math.max(hh.today, hh.last) / top) * 100).toFixed(1)}% + 12px)`,
                        transform: hour > 18 ? "translateX(-100%)" : hour < 4 ? "none" : "translateX(-50%)",
                      }}
                    >
                      <div className="hb-yd3-tt-d">
                        {hourLabel(hour)} to {hourLabel((hour + 1) % 24)}
                        {hour === NOW_HOUR ? ", in progress" : ""}
                      </div>
                      <div>
                        {hh.forecast ? "Forecast" : "Today"} <b>{hh.today}</b>
                      </div>
                      <div>
                        Last week <b>{hh.last}</b>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="hb-yd3-hx" aria-hidden="true">
                  {HOURS.map((_, i) => (
                    <span key={i}>{String(i).padStart(2, "0")}</span>
                  ))}
                </div>
              </section>

              <section className="hb-yd3-card" style={{ "--d": 5 } as React.CSSProperties} aria-label="SLA compliance">
                <div className="hb-yd3-ch">
                  <div>
                    <h3 className="hb-yd3-ct">SLA compliance</h3>
                    <p className="hb-yd3-cs">Tickets answered within policy, 7 days</p>
                  </div>
                </div>
                <div className="hb-yd3-gauge">
                  <svg viewBox="0 0 200 108" role="img" aria-label={`${sla} percent within SLA, target ${target} percent`}>
                    <defs>
                      <linearGradient id={`${uid}g`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#fb7185" />
                        <stop offset=".55" stopColor="#fbbf24" />
                        <stop offset="1" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    {Array.from({ length: 21 }, (_, k) => (
                      <line key={k} className="hb-yd3-g-tk" x1={gx(k * 5, 66).toFixed(2)} y1={gy(k * 5, 66).toFixed(2)} x2={gx(k * 5, 72).toFixed(2)} y2={gy(k * 5, 72).toFixed(2)} />
                    ))}
                    <path className="hb-yd3-g-t" d="M14 100A86 86 0 0 1 186 100" pathLength={100} />
                    <path className="hb-yd3-g-v" d="M14 100A86 86 0 0 1 186 100" pathLength={100} stroke={`url(#${uid}g)`} strokeDasharray={`${sla} 100`} />
                    <line className="hb-yd3-g-tg" x1={gx(target, 78).toFixed(2)} y1={gy(target, 78).toFixed(2)} x2={gx(target, 96).toFixed(2)} y2={gy(target, 96).toFixed(2)} />
                    <g className="hb-yd3-needle" style={{ transform: `rotate(${((sla / 100) * 180 - 90).toFixed(2)}deg)` }}>
                      <path d="M97 100L100 40L103 100Z" fill="#ebebef" />
                      <circle cx="100" cy="100" r="6" fill="#ebebef" />
                      <circle cx="100" cy="100" r="2.5" fill="#111114" />
                    </g>
                  </svg>
                </div>
                <div className="hb-yd3-gc" style={{ position: "static", marginTop: 6 }}>
                  <b>{sla.toFixed(1)}%</b>
                  <span>Target {target}% · {(target - sla).toFixed(1)} pts to go</span>
                </div>
                <div className="hb-yd3-gs">
                  <div>
                    <span>
                      <i style={{ background: "#34d399" }} />
                      Met
                    </span>
                    <b>1,184</b>
                  </div>
                  <div>
                    <span>
                      <i style={{ background: "#fbbf24" }} />
                      At risk
                    </span>
                    <b>7</b>
                  </div>
                  <div>
                    <span>
                      <i style={{ background: "#fb7185" }} />
                      Breached
                    </span>
                    <b>11</b>
                  </div>
                </div>
              </section>
            </div>

            <div className="hb-yd3-row">
              <section className="hb-yd3-card" style={{ "--d": 6 } as React.CSSProperties} aria-label="Queue">
                <div className="hb-yd3-ch">
                  <div>
                    <h3 className="hb-yd3-ct">Queue</h3>
                    <p className="hb-yd3-cs">Oldest first, sorted by SLA</p>
                  </div>
                  <div className="hb-yd3-tabs" role="group" aria-label="Queue filter">
                    {VIEWS.map((x) => (
                      <button key={x.id} type="button" aria-pressed={v === x.id} onClick={() => pickView(x.id)}>
                        {x.label}
                        <em>{filter(x.id).length}</em>
                      </button>
                    ))}
                  </div>
                </div>
                {list.length ? (
                  <ul className="hb-yd3-q" key={v}>
                    {[...list]
                      .sort((a, b) => a.slaMinutes - b.slaMinutes)
                      .map((t, i) => {
                        const s = slaState(t.slaMinutes);
                        return (
                          <li key={t.id}>
                            <button type="button" className="hb-yd3-qr" style={{ animationDelay: `${i * 45}ms` }} onClick={() => onTicketOpen?.(t)} onKeyDown={qKey}>
                              <span className="hb-yd3-qid">
                                <Ico n={t.channel === "email" ? "mail" : t.channel === "chat" ? "chat" : "phone"} className="" />
                                {t.id}
                              </span>
                              <span className="hb-yd3-qs">
                                <b>{t.subject}</b>
                                <span>
                                  {t.customer} · waiting {t.waiting}
                                </span>
                              </span>
                              <span className="hb-yd3-pri" data-p={t.priority}>
                                <i />
                                {t.priority}
                              </span>
                              {t.assignees.length ? (
                                <span className="hb-yd3-stack" title={t.assignees.join(", ")}>
                                  {t.assignees.map((a) => (
                                    <span key={a} className="hb-yd3-av" style={{ width: 24, height: 24, fontSize: 9.5, background: tone(a) }}>
                                      {initials(a)}
                                    </span>
                                  ))}
                                </span>
                              ) : (
                                <span className="hb-yd3-none" title="Unassigned">
                                  <Ico n="dash" className="" />
                                </span>
                              )}
                              <span className="hb-yd3-sla" data-s={s.s}>
                                {s.text}
                                <span>{t.channel}</span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                ) : (
                  <p className="hb-yd3-empty">Nothing in this view. Nice work.</p>
                )}
              </section>

              <div className="hb-yd3-col">
                <section className="hb-yd3-card" style={{ "--d": 7 } as React.CSSProperties} aria-label="Customer satisfaction">
                  <div className="hb-yd3-ch" style={{ marginBottom: 6 }}>
                    <div>
                      <h3 className="hb-yd3-ct">CSAT, 14 days</h3>
                      <p className="hb-yd3-cs">{day === null ? "1,206 ratings" : CSAT_DAYS[day]}</p>
                    </div>
                  </div>
                  <div className="hb-yd3-csat">
                    <b>{(day === null ? CSAT[CSAT.length - 1] : CSAT[day]).toFixed(1)}%</b>
                    {day === null ? <span className={cdelta >= 0 ? "hb-yd3-up" : "hb-yd3-dn"}>{cdelta >= 0 ? "+" : ""}{cdelta.toFixed(1)} pts vs last week</span> : null}
                  </div>
                  <div
                    className="hb-yd3-cplot"
                    role="img"
                    tabIndex={0}
                    aria-label="Daily customer satisfaction. Use arrow keys to inspect days."
                    onPointerMove={csatMove}
                    onPointerLeave={() => setDay(null)}
                    onKeyDown={csatKey}
                    onBlur={() => setDay(null)}
                  >
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id={`${uid}c`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#34d399" stopOpacity=".24" />
                          <stop offset="1" stopColor="#34d399" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <line className="hb-yd3-ctg" x1="0" x2="100" y1={(6 + (1 - (95 - lo) / (hi - lo)) * 88).toFixed(2)} y2={(6 + (1 - (95 - lo) / (hi - lo)) * 88).toFixed(2)} />
                      <path d={`${cline}L100 100L0 100Z`} fill={`url(#${uid}c)`} />
                      <path className="hb-yd3-cl" d={cline} />
                    </svg>
                    {day !== null ? <span className="hb-yd3-cdot" style={{ left: `${cpts[day][0].toFixed(2)}%`, top: `${cpts[day][1].toFixed(2)}%` }} /> : null}
                  </div>
                  <div className="hb-yd3-dist" aria-hidden="true">
                    <i style={{ width: "86%", background: "#34d399" }} />
                    <i style={{ width: "9%", background: "#fbbf24", animationDelay: ".5s" }} />
                    <i style={{ width: "5%", background: "#fb7185", animationDelay: ".6s" }} />
                  </div>
                  <div className="hb-yd3-distl">
                    <span>Great 86%</span>
                    <span>Okay 9%</span>
                    <span>Bad 5%</span>
                  </div>
                </section>

                <section className="hb-yd3-card" style={{ "--d": 8 } as React.CSSProperties} aria-label="Now viewing">
                  <div className="hb-yd3-ch" style={{ marginBottom: 10 }}>
                    <div>
                      <h3 className="hb-yd3-ct">Now viewing</h3>
                      <p className="hb-yd3-cs">Live agent and customer activity</p>
                    </div>
                  </div>
                  <div className="hb-yd3-online">
                    <span className="hb-yd3-stack">
                      {AGENTS.map((a, i) => (
                        <span key={a} className="hb-yd3-av" data-on={i < 5} style={{ width: 24, height: 24, fontSize: 9.5, background: tone(a) }} title={a}>
                          {initials(a)}
                        </span>
                      ))}
                    </span>
                    5 of 6 agents online
                  </div>
                  <ul className="hb-yd3-feed" aria-live="off">
                    {feed.map((f, k) => (
                      <li key={tick - k} data-new={k === 0 && tick > 0}>
                        {AGENTS.includes(f.who) ? (
                          <span className="hb-yd3-av" style={{ width: 26, height: 26, fontSize: 9.5, background: tone(f.who) }}>
                            {initials(f.who)}
                          </span>
                        ) : (
                          <span className="hb-yd3-eye">
                            <Ico n="reply" className="" />
                          </span>
                        )}
                        <p>
                          <b>{f.who}</b> {f.verb} <strong>{f.ticket}</strong>
                        </p>
                        <time>{AGO[k]}</time>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
