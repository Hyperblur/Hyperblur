"use client";

import * as React from "react";

export interface BentoProductLink {
  label: string;
  href: string;
}

export interface BentoProductAutomation {
  label: string;
  detail?: string;
  enabled?: boolean;
}

export interface BentoProductPerson {
  name: string;
  status: string;
  color?: string;
}

export interface BentoProductProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: BentoProductLink | null;
  automations?: BentoProductAutomation[];
  people?: BentoProductPerson[];
  command?: string;
  onAutomationChange?: (index: number, enabled: boolean) => void;
  accent?: string;
}

const css = `
@keyframes hb-kb1-rise { from { opacity: 0; transform: translate3d(0, 18px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-kb1-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-kb1-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-kb1-type { 0% { width: 0; } 45%, 82% { width: calc(var(--hb-kb1-n) * 1ch); } 100% { width: 0; } }
@keyframes hb-kb1-caret { 50% { opacity: 0; } }
@keyframes hb-kb1-ping { 0% { transform: scale(1); opacity: .7; } 80%, 100% { transform: scale(2.4); opacity: 0; } }
@keyframes hb-kb1-roam {
  0%, 100% { transform: translate3d(12%, 10%, 0); }
  30% { transform: translate3d(58%, 34%, 0); }
  60% { transform: translate3d(30%, 62%, 0); }
  80% { transform: translate3d(66%, 14%, 0); }
}
.hb-kb1 {
  --hb-kb1-accent: #8b5cf6;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kb1 *, .hb-kb1 *::before, .hb-kb1 *::after { box-sizing: border-box; }
.hb-kb1::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(50% 40% at 20% 0%, color-mix(in srgb, var(--hb-kb1-accent) 16%, transparent), transparent 70%);
}
.hb-kb1-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px);
}
.hb-kb1-head {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  align-items: end;
  gap: 20px 48px;
  margin-bottom: clamp(28px, 4cqi, 44px);
  animation: hb-kb1-rise .7s cubic-bezier(.2, .8, .2, 1) backwards;
}
.hb-kb1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  padding: 5px 11px 5px 9px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: #a1a1a1;
  font-size: 12px;
  font-weight: 500;
}
.hb-kb1-eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-kb1-accent); box-shadow: 0 0 10px var(--hb-kb1-accent); }
.hb-kb1-title {
  margin: 0;
  font-size: clamp(30px, 4.4cqi, 48px);
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-kb1-side { display: grid; gap: 16px; justify-items: start; }
.hb-kb1-sub { margin: 0; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; text-wrap: pretty; }
.hb-kb1-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: transform .2s ease, background .2s ease;
}
.hb-kb1-cta:hover { background: #fff; transform: translate3d(0, -1px, 0); }
.hb-kb1-cta svg { transition: transform .2s ease; }
.hb-kb1-cta:hover svg { transform: translate3d(3px, 0, 0); }
.hb-kb1-cta:focus-visible { outline: 2px solid var(--hb-kb1-accent); outline-offset: 3px; }
.hb-kb1-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-areas:
    "chart chart cal tog"
    "chart chart cal pres"
    "cmd cmd cmd pres";
  gap: 12px;
}
.hb-kb1-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 18px;
  background: linear-gradient(180deg, #131313, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  animation: hb-kb1-rise .7s cubic-bezier(.2, .8, .2, 1) backwards;
  animation-delay: calc(var(--hb-kb1-i, 0) * 80ms + 120ms);
  transition: border-color .25s ease;
}
.hb-kb1-cell::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(60% 50% at 0% 0%, color-mix(in srgb, var(--hb-kb1-accent) 14%, transparent), transparent 70%);
  transition: opacity .35s ease;
}
.hb-kb1-cell:hover { border-color: rgba(255, 255, 255, .15); }
.hb-kb1-cell:hover::before { opacity: 1; }
.hb-kb1-cell > * { position: relative; }
.hb-kb1-cap { margin-top: auto; padding-top: 16px; }
.hb-kb1-cap h3 { margin: 0; font-size: 14.5px; font-weight: 600; letter-spacing: -.01em; }
.hb-kb1-cap p { margin: 4px 0 0; color: #8f8f8f; font-size: 13px; line-height: 1.5; }
.hb-kb1-label { color: #8f8f8f; font-size: 12px; font-weight: 500; }
.hb-kb1-chart { grid-area: chart; }
.hb-kb1-chead { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.hb-kb1-value { display: flex; align-items: baseline; gap: 10px; margin-top: 6px; }
.hb-kb1-value strong { font-size: clamp(24px, 3.2cqi, 34px); font-weight: 600; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
.hb-kb1-delta {
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, #22c55e 14%, transparent);
  color: #4ade80;
  font-size: 12px;
  font-weight: 600;
}
.hb-kb1-tabs { display: inline-flex; padding: 3px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 10px; background: #0b0b0b; }
.hb-kb1-tab {
  padding: 5px 10px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s ease, color .2s ease;
}
.hb-kb1-tab:hover { color: #ededed; }
.hb-kb1-tab[aria-pressed="true"] { background: #1f1f1f; color: #ededed; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06); }
.hb-kb1-tab:focus-visible { outline: 2px solid var(--hb-kb1-accent); outline-offset: 1px; }
.hb-kb1-plot { position: relative; flex: 1; min-height: 150px; margin-top: 18px; }
.hb-kb1-plot svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-kb1-gridline { stroke: rgba(255, 255, 255, .06); stroke-width: 1; vector-effect: non-scaling-stroke; }
.hb-kb1-area { animation: hb-kb1-fade 1.2s ease .3s both; }
.hb-kb1-line {
  fill: none;
  stroke: var(--hb-kb1-accent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 1;
  animation: hb-kb1-draw 1.4s cubic-bezier(.65, 0, .35, 1) .2s both;
}
.hb-kb1-cols { position: absolute; inset: 0; display: flex; }
.hb-kb1-col { position: relative; flex: 1; }
.hb-kb1-col::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: linear-gradient(transparent, rgba(255, 255, 255, .18), transparent);
  opacity: 0;
  transition: opacity .15s ease;
}
.hb-kb1-dot {
  position: absolute;
  left: 50%;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border: 2px solid #0e0e0e;
  border-radius: 50%;
  background: var(--hb-kb1-accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kb1-accent) 25%, transparent);
  opacity: 0;
  transform: scale(.4);
  transition: opacity .15s ease, transform .2s ease;
}
.hb-kb1-tip {
  position: absolute;
  left: 50%;
  z-index: 2;
  padding: 5px 8px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 8px;
  background: #1a1a1a;
  color: #ededed;
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, calc(-100% - 12px));
  transition: opacity .15s ease;
}
.hb-kb1-tip span { display: block; color: #8f8f8f; font-weight: 500; font-size: 10.5px; }
.hb-kb1-col:hover::before, .hb-kb1-col:hover .hb-kb1-dot, .hb-kb1-col:hover .hb-kb1-tip { opacity: 1; }
.hb-kb1-col:hover .hb-kb1-dot { transform: scale(1); }
.hb-kb1-col:first-child .hb-kb1-tip { transform: translate(-12%, calc(-100% - 12px)); }
.hb-kb1-col:last-child .hb-kb1-tip { transform: translate(-88%, calc(-100% - 12px)); }
.hb-kb1-minis { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, .06); }
.hb-kb1-minis div { min-width: 0; }
.hb-kb1-minis b { display: block; margin-top: 2px; font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-kb1-cal { grid-area: cal; }
.hb-kb1-calhead { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.hb-kb1-calhead strong { font-size: 13.5px; font-weight: 600; }
.hb-kb1-chip { padding: 2px 8px; border-radius: 999px; background: color-mix(in srgb, var(--hb-kb1-accent) 16%, transparent); color: color-mix(in srgb, var(--hb-kb1-accent) 60%, #fff); font-size: 11px; font-weight: 600; }
.hb-kb1-days { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 3px 0; text-align: center; font-size: 11px; font-variant-numeric: tabular-nums; }
.hb-kb1-days > span { position: relative; display: grid; place-items: center; height: 24px; color: #a1a1a1; }
.hb-kb1-days > span[data-h="true"] { color: #5c5c5c; font-size: 10px; font-weight: 600; }
.hb-kb1-days > span[data-r] { background: color-mix(in srgb, var(--hb-kb1-accent) 13%, transparent); color: #ededed; }
.hb-kb1-days > span[data-r="s"] { border-radius: 8px 0 0 8px; }
.hb-kb1-days > span[data-r="e"] { border-radius: 0 8px 8px 0; }
.hb-kb1-days > span[data-t="true"]::before {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: var(--hb-kb1-accent);
  z-index: -1;
}
.hb-kb1-days > span[data-t="true"] { color: #fff; font-weight: 600; z-index: 0; }
.hb-kb1-days > span[data-e="true"]::after { content: ""; position: absolute; bottom: 1px; width: 4px; height: 4px; border-radius: 50%; background: #f5a524; }
.hb-kb1-events { display: grid; gap: 6px; margin-top: 14px; }
.hb-kb1-event { display: grid; grid-template-columns: 3px minmax(0, 1fr) auto; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 10px; background: rgba(255, 255, 255, .03); font-size: 12px; }
.hb-kb1-event i { align-self: stretch; border-radius: 3px; background: var(--c); }
.hb-kb1-event span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-kb1-event small { color: #8f8f8f; font-size: 11px; font-variant-numeric: tabular-nums; }
.hb-kb1-tog { grid-area: tog; }
.hb-kb1-auto { display: grid; gap: 4px; margin: 10px 0 0; padding: 0; list-style: none; }
.hb-kb1-auto li { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 7px 0; border-bottom: 1px solid rgba(255, 255, 255, .05); }
.hb-kb1-auto li:last-child { border-bottom: 0; }
.hb-kb1-auto b { display: block; font-size: 12.5px; font-weight: 500; }
.hb-kb1-auto small { display: block; color: #6f6f6f; font-size: 11px; }
.hb-kb1-switch {
  position: relative;
  flex: none;
  width: 34px;
  height: 20px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: #262626;
  cursor: pointer;
  transition: background .25s ease, border-color .25s ease;
}
.hb-kb1-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #d4d4d4;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1), background .25s ease;
}
.hb-kb1-switch[aria-checked="true"] { background: var(--hb-kb1-accent); border-color: transparent; }
.hb-kb1-switch[aria-checked="true"]::after { transform: translateX(14px); background: #fff; }
.hb-kb1-switch:focus-visible { outline: 2px solid var(--hb-kb1-accent); outline-offset: 2px; }
.hb-kb1-pres { grid-area: pres; }
.hb-kb1-stage { position: relative; height: 74px; margin: 2px 0 10px; border-radius: 12px; background: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, .08) 1px, transparent 0) 0 0 / 12px 12px; }
.hb-kb1-cursor { position: absolute; inset: 0 30% 30% 0; animation: hb-kb1-roam 9s ease-in-out infinite; }
.hb-kb1-cursor > div { display: inline-flex; align-items: flex-start; }
.hb-kb1-cursor svg { flex: none; }
.hb-kb1-cursor span { margin: 12px 0 0 -2px; padding: 2px 7px; border-radius: 6px 6px 6px 2px; background: var(--hb-kb1-accent); color: #fff; font-size: 10.5px; font-weight: 600; white-space: nowrap; }
.hb-kb1-people { display: grid; gap: 9px; margin: 0; padding: 0; list-style: none; }
.hb-kb1-people li { display: flex; align-items: center; gap: 10px; min-width: 0; }
.hb-kb1-av { position: relative; flex: none; display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: var(--c); color: #0a0a0a; font-size: 10.5px; font-weight: 700; }
.hb-kb1-av::after { content: ""; position: absolute; right: -1px; bottom: -1px; width: 9px; height: 9px; border: 2px solid #101010; border-radius: 50%; background: var(--s, #22c55e); }
.hb-kb1-av i { position: absolute; right: 0; bottom: 0; width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: hb-kb1-ping 2s ease-out infinite; animation-delay: calc(var(--hb-kb1-i, 0) * 500ms); }
.hb-kb1-people div { min-width: 0; }
.hb-kb1-people b { display: block; font-size: 12.5px; font-weight: 500; }
.hb-kb1-people small { display: block; overflow: hidden; color: #7a7a7a; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
.hb-kb1-cmd { grid-area: cmd; flex-direction: row; align-items: center; gap: 24px; }
.hb-kb1-cmd .hb-kb1-cap { flex: 0 0 34%; margin: 0; padding: 0; }
.hb-kb1-palette { flex: 1; min-width: 0; border: 1px solid rgba(255, 255, 255, .1); border-radius: 14px; background: #0b0b0b; box-shadow: 0 20px 40px -24px rgba(0, 0, 0, .8), inset 0 1px 0 rgba(255, 255, 255, .04); }
.hb-kb1-input { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-bottom: 1px solid rgba(255, 255, 255, .07); color: #8f8f8f; font-size: 13px; }
.hb-kb1-typed { display: inline-block; overflow: hidden; width: calc(var(--hb-kb1-n) * 1ch); max-width: 100%; color: #ededed; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12.5px; white-space: nowrap; vertical-align: bottom; animation: hb-kb1-type 7s steps(var(--hb-kb1-n)) 1s infinite; }
.hb-kb1-caret { flex: none; width: 2px; height: 16px; margin-left: -8px; background: var(--hb-kb1-accent); animation: hb-kb1-caret 1s steps(1) infinite; }
.hb-kb1-kbd { margin-left: auto; padding: 2px 6px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 6px; color: #8f8f8f; font-size: 11px; font-family: var(--font-mono, ui-monospace, monospace); }
.hb-kb1-results { margin: 0; padding: 6px; list-style: none; }
.hb-kb1-results li { display: flex; align-items: center; gap: 10px; padding: 7px 8px; border-radius: 8px; color: #a1a1a1; font-size: 12.5px; }
.hb-kb1-results li[data-on="true"] { background: rgba(255, 255, 255, .05); color: #ededed; }
.hb-kb1-results li svg { flex: none; color: #6f6f6f; }
.hb-kb1-results li[data-on="true"] svg { color: var(--hb-kb1-accent); }
.hb-kb1-results li span { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-kb1-results li small { color: #5f5f5f; font-size: 11px; }
@container (max-width: 820px) {
  .hb-kb1-head { grid-template-columns: minmax(0, 1fr); }
  .hb-kb1-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-areas: "chart chart" "cal tog" "cal pres" "cmd cmd"; }
}
@container (max-width: 540px) {
  .hb-kb1-grid { grid-template-columns: minmax(0, 1fr); grid-template-areas: "chart" "cal" "tog" "pres" "cmd"; }
  .hb-kb1-cmd { flex-direction: column; align-items: stretch; gap: 14px; }
  .hb-kb1-cmd .hb-kb1-cap { order: 2; flex: none; }
  .hb-kb1-minis b { font-size: 13.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kb1 *, .hb-kb1 *::before, .hb-kb1 *::after { animation: none !important; transition: none !important; }
}
`;

const ranges = [
  { id: "7D", total: "$31,870", delta: "+6.4%", labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], data: [3920, 4310, 4080, 4720, 5160, 4890, 4790] },
  { id: "30D", total: "$128,430", delta: "+18.2%", labels: ["Oct 3", "Oct 6", "Oct 9", "Oct 12", "Oct 15", "Oct 18", "Oct 21", "Oct 24", "Oct 27", "Oct 30"], data: [9800, 11200, 10650, 12900, 12100, 14300, 13600, 15800, 16900, 18400] },
  { id: "90D", total: "$362,915", delta: "+41.0%", labels: ["Aug 4", "Aug 18", "Sep 1", "Sep 15", "Sep 29", "Oct 13", "Oct 20", "Oct 27"], data: [31200, 34800, 33100, 39600, 42900, 47800, 51200, 56300] },
];

const defaultAutomations: BentoProductAutomation[] = [
  { label: "Auto-assign reviews", detail: "Round robin, design team", enabled: true },
  { label: "Nightly digest", detail: "Slack at 6:00 pm", enabled: false },
  { label: "Close stale issues", detail: "After 30 days idle", enabled: true },
];

const defaultPeople: BentoProductPerson[] = [
  { name: "Maya Chen", status: "Editing Q4 Roadmap", color: "#c4b5fd" },
  { name: "Jonas Berg", status: "In Design review", color: "#fcd34d" },
  { name: "Priya Raman", status: "Commenting on Launch plan", color: "#86efac" },
  { name: "Leo Navarro", status: "Away for 12 min", color: "#fda4af" },
];

function money(n: number) {
  return "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}

function buildPath(data: number[]) {
  const min = Math.min(...data) * 0.9;
  const max = Math.max(...data) * 1.04;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((v - min) / (max - min)) * 100;
    return [x, y] as const;
  });
  let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx.toFixed(2)},${y0.toFixed(2)} ${mx.toFixed(2)},${y1.toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)}`;
  }
  return { line: d, area: `${d} L100,100 L0,100 Z`, pts };
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function BentoProduct({
  eyebrow = "Workspace",
  title = "Plan, ship and stay in sync from one calm workspace",
  subtitle = "Northwind brings revenue, schedules, automations and your whole team into a single surface that updates the moment anything changes.",
  cta = { label: "Explore the platform", href: "#" },
  automations = defaultAutomations,
  people = defaultPeople,
  command = "Create issue in Q4 Launch",
  onAutomationChange,
  accent = "#8b5cf6",
  className,
  style,
  ...rest
}: BentoProductProps) {
  const [range, setRange] = React.useState(1);
  const [enabled, setEnabled] = React.useState<boolean[]>(() => automations.map((a) => Boolean(a.enabled)));
  const current = ranges[range];
  const chart = buildPath(current.data);
  const gid = React.useId().replace(/:/g, "");

  const toggle = (i: number) => {
    const next = !enabled[i];
    setEnabled((prev) => prev.map((v, j) => (j === i ? next : v)));
    onAutomationChange?.(i, next);
  };

  const days: { label: string; head?: boolean; today?: boolean; event?: boolean; r?: string }[] = [
    ..."MTWTFSS".split("").map((d) => ({ label: d, head: true })),
    ...Array.from({ length: 6 }, () => ({ label: "" })),
    ...Array.from({ length: 30 }, (_, i) => {
      const n = i + 1;
      return {
        label: String(n),
        today: n === 2,
        event: n === 4 || n === 12 || n === 18 || n === 24,
        r: n === 9 ? "s" : n === 13 ? "e" : n > 9 && n < 13 ? "m" : undefined,
      };
    }),
  ];

  return (
    <section
      className={["hb-kb1", className].filter(Boolean).join(" ")}
      style={{ "--hb-kb1-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-bento-product" precedence="default">{css}</style>
      <div className="hb-kb1-in">
        <header className="hb-kb1-head">
          <div>
            {eyebrow ? (
              <p className="hb-kb1-eyebrow">
                <i aria-hidden="true" />
                {eyebrow}
              </p>
            ) : null}
            <h2 className="hb-kb1-title">{title}</h2>
          </div>
          <div className="hb-kb1-side">
            {subtitle ? <p className="hb-kb1-sub">{subtitle}</p> : null}
            {cta ? (
              <a className="hb-kb1-cta" href={cta.href}>
                {cta.label}
                <Arrow />
              </a>
            ) : null}
          </div>
        </header>

        <div className="hb-kb1-grid">
          <article className="hb-kb1-cell hb-kb1-chart" style={{ "--hb-kb1-i": 0 } as React.CSSProperties}>
            <div className="hb-kb1-chead">
              <div>
                <span className="hb-kb1-label">Net revenue</span>
                <div className="hb-kb1-value">
                  <strong>{current.total}</strong>
                  <span className="hb-kb1-delta">{current.delta}</span>
                </div>
              </div>
              <div className="hb-kb1-tabs" role="group" aria-label="Date range">
                {ranges.map((r, i) => (
                  <button key={r.id} type="button" className="hb-kb1-tab" aria-pressed={i === range} onClick={() => setRange(i)}>
                    {r.id}
                  </button>
                ))}
              </div>
            </div>
            <div className="hb-kb1-plot">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id={`${gid}-a`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={accent} stopOpacity=".32" />
                    <stop offset="1" stopColor={accent} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 45, 70, 95].map((y) => (
                  <line key={y} className="hb-kb1-gridline" x1="0" x2="100" y1={y} y2={y} />
                ))}
                <g key={current.id}>
                  <path className="hb-kb1-area" d={chart.area} fill={`url(#${gid}-a)`} />
                  <path className="hb-kb1-line" d={chart.line} pathLength={1} />
                </g>
              </svg>
              <div className="hb-kb1-cols">
                {chart.pts.map(([, y], i) => (
                  <div key={`${current.id}-${i}`} className="hb-kb1-col">
                    <span className="hb-kb1-dot" style={{ top: `${y.toFixed(2)}%` }} />
                    <span className="hb-kb1-tip" style={{ top: `${y.toFixed(2)}%` }}>
                      <span>{current.labels[i]}</span>
                      {money(current.data[i])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hb-kb1-minis">
              <div>
                <span className="hb-kb1-label">Orders</span>
                <b>3,218</b>
              </div>
              <div>
                <span className="hb-kb1-label">Avg. order</span>
                <b>$39.90</b>
              </div>
              <div>
                <span className="hb-kb1-label">Refunds</span>
                <b>0.6%</b>
              </div>
            </div>
          </article>

          <article className="hb-kb1-cell hb-kb1-cal" style={{ "--hb-kb1-i": 1 } as React.CSSProperties}>
            <div className="hb-kb1-calhead">
              <strong>November 2026</strong>
              <span className="hb-kb1-chip">Sprint 14</span>
            </div>
            <div className="hb-kb1-days" aria-hidden="true">
              {days.map((d, i) => (
                <span key={i} data-h={d.head ? "true" : undefined} data-t={d.today ? "true" : undefined} data-e={d.event ? "true" : undefined} data-r={d.r}>
                  {d.label}
                </span>
              ))}
            </div>
            <div className="hb-kb1-events">
              <div className="hb-kb1-event" style={{ "--c": accent } as React.CSSProperties}>
                <i />
                <span>Design review</span>
                <small>10:00</small>
              </div>
              <div className="hb-kb1-event" style={{ "--c": "#f5a524" } as React.CSSProperties}>
                <i />
                <span>Launch sync</span>
                <small>14:30</small>
              </div>
            </div>
            <div className="hb-kb1-cap">
              <h3>Plans that line up</h3>
              <p>Sprints, reviews and launches on one shared calendar.</p>
            </div>
          </article>

          <article className="hb-kb1-cell hb-kb1-tog" style={{ "--hb-kb1-i": 2 } as React.CSSProperties}>
            <span className="hb-kb1-label">Automations</span>
            <ul className="hb-kb1-auto">
              {automations.map((a, i) => (
                <li key={a.label}>
                  <div>
                    <b>{a.label}</b>
                    {a.detail ? <small>{a.detail}</small> : null}
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={Boolean(enabled[i])}
                    aria-label={a.label}
                    className="hb-kb1-switch"
                    onClick={() => toggle(i)}
                  />
                </li>
              ))}
            </ul>
          </article>

          <article className="hb-kb1-cell hb-kb1-pres" style={{ "--hb-kb1-i": 3 } as React.CSSProperties}>
            <div className="hb-kb1-stage" aria-hidden="true">
              <div className="hb-kb1-cursor">
                <div>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M2 1.5l11 5.2-4.6 1.3L6.6 13 2 1.5z" fill={accent} stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
                  </svg>
                  <span>{people[0]?.name.split(" ")[0] ?? "Maya"}</span>
                </div>
              </div>
            </div>
            <ul className="hb-kb1-people">
              {people.map((p, i) => (
                <li key={p.name}>
                  <span
                    className="hb-kb1-av"
                    style={{ "--c": p.color ?? "#d4d4d4", "--s": i === people.length - 1 ? "#f5a524" : "#22c55e", "--hb-kb1-i": i } as React.CSSProperties}
                  >
                    {initials(p.name)}
                    {i < people.length - 1 ? <i aria-hidden="true" /> : null}
                  </span>
                  <div>
                    <b>{p.name}</b>
                    <small>{p.status}</small>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hb-kb1-cap">
              <h3>Know who is around</h3>
              <p>Live presence and cursors on every doc.</p>
            </div>
          </article>

          <article className="hb-kb1-cell hb-kb1-cmd" style={{ "--hb-kb1-i": 4 } as React.CSSProperties}>
            <div className="hb-kb1-cap">
              <h3>Everything is one keystroke away</h3>
              <p>Jump to any project, run an action or invite a teammate without touching the mouse.</p>
            </div>
            <div className="hb-kb1-palette" aria-hidden="true">
              <div className="hb-kb1-input">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="hb-kb1-typed" style={{ "--hb-kb1-n": command.length } as React.CSSProperties}>
                  {command}
                </span>
                <span className="hb-kb1-caret" />
                <span className="hb-kb1-kbd">⌘K</span>
              </div>
              <ul className="hb-kb1-results">
                <li data-on="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 5.5v5M5.5 8h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span>Create issue in Q4 Launch</span>
                  <small>↵</small>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2.5" y="2.5" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2.5 6.5h11" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span>Open Q4 Launch board</span>
                  <small>G then B</small>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M1.5 13.5c.6-2.3 2.3-3.5 4.5-3.5s3.9 1.2 4.5 3.5M12 5v4M10 7h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span>Invite teammate</span>
                  <small>I</small>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
