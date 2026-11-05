"use client";

import * as React from "react";

export type HrTeam = "All" | "Engineering" | "Design" | "Sales" | "Operations";

export interface DashboardHrProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  brand?: string;
  company?: string;
  user?: string;
  team?: HrTeam;
  defaultTeam?: HrTeam;
  onTeamChange?: (team: HrTeam) => void;
}

const css = `
.hb-yd2 {
  --a: #c4572a;
  --hb-yd2-ink: #1d1c1a;
  --hb-yd2-mute: #6f6a60;
  --hb-yd2-line: #e5e0d4;
  container: hb-yd2 / inline-size;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #e2ddd0;
  border-radius: 18px;
  background: #f7f5ef;
  color: var(--hb-yd2-ink);
  font-family: inherit;
  font-size: 13px;
  line-height: 1.45;
  overflow: hidden;
  position: relative;
  -webkit-font-smoothing: antialiased;
}
.hb-yd2 *, .hb-yd2 *::before, .hb-yd2 *::after { box-sizing: border-box; }
.hb-yd2 button, .hb-yd2 input { font: inherit; color: inherit; }
.hb-yd2 button:focus-visible, .hb-yd2 input:focus-visible, .hb-yd2 [tabindex]:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }
.hb-yd2-app { display: grid; grid-template-columns: 232px minmax(0, 1fr); min-height: 700px; }
.hb-yd2-side { display: flex; flex-direction: column; gap: 18px; min-width: 0; padding: 18px 14px; border-right: 1px solid var(--hb-yd2-line); background: #efebe1; }
.hb-yd2-brand { display: flex; align-items: center; gap: 10px; padding: 0 6px; font-size: 15px; font-weight: 650; letter-spacing: -.015em; }
.hb-yd2-mark { display: grid; place-items: center; flex: none; width: 28px; height: 28px; border-radius: 9px; background: var(--a); color: #fffaf3; box-shadow: 0 1px 0 rgba(255, 255, 255, .35) inset, 0 4px 10px -4px var(--a); }
.hb-yd2-org {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--hb-yd2-line);
  border-radius: 12px;
  background: #fbfaf6;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(60, 50, 30, .05);
  transition: border-color .15s ease;
}
.hb-yd2-org:hover { border-color: #d3ccbb; }
.hb-yd2-org-l { display: grid; place-items: center; flex: none; width: 30px; height: 30px; border-radius: 8px; background: #1d1c1a; color: #f7f5ef; font-size: 12px; font-weight: 700; }
.hb-yd2-org b { display: block; font-size: 13px; font-weight: 600; }
.hb-yd2-org span { display: block; color: var(--hb-yd2-mute); font-size: 11.5px; }
.hb-yd2-org svg { margin-left: auto; color: var(--hb-yd2-mute); }
.hb-yd2-nav { display: flex; flex-direction: column; gap: 1px; margin: 0; padding: 0; list-style: none; }
.hb-yd2-nav-h { padding: 12px 10px 6px; color: #8d877b; font-size: 11px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; }
.hb-yd2-link {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #4d4941;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.hb-yd2-link:hover { background: rgba(29, 28, 26, .05); color: var(--hb-yd2-ink); }
.hb-yd2-link[aria-current="page"] { background: #fbfaf6; color: var(--hb-yd2-ink); font-weight: 600; box-shadow: 0 1px 2px rgba(60, 50, 30, .08), 0 0 0 1px var(--hb-yd2-line); }
.hb-yd2-link[aria-current="page"] .hb-yd2-ico { color: var(--a); }
.hb-yd2-link em { margin-left: auto; padding: 0 7px; border-radius: 999px; background: rgba(29, 28, 26, .07); color: var(--hb-yd2-mute); font-size: 11px; font-style: normal; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-yd2-note { margin-top: auto; padding: 14px; border-radius: 14px; background: #1d1c1a; color: #f2efe7; }
.hb-yd2-note b { display: block; font-size: 13px; font-weight: 600; }
.hb-yd2-note p { margin: 4px 0 12px; color: #b5afa3; font-size: 12px; }
.hb-yd2-note-bar { height: 5px; margin-bottom: 12px; border-radius: 999px; background: rgba(255, 255, 255, .12); overflow: hidden; }
.hb-yd2-note-bar i { display: block; width: 68%; height: 100%; border-radius: inherit; background: var(--a); transform-origin: left; animation: hb-yd2-bar 1s .3s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd2-note button { width: 100%; height: 30px; border: 0; border-radius: 8px; background: #f7f5ef; color: #1d1c1a; font-size: 12px; font-weight: 600; cursor: pointer; }
.hb-yd2-note button:hover { background: #ffffff; }
.hb-yd2-main { display: flex; flex-direction: column; min-width: 0; }
.hb-yd2-top { display: flex; align-items: center; gap: 12px; padding: 20px 28px 0; }
.hb-yd2-hello { min-width: 0; margin-right: auto; }
.hb-yd2-hello h2 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -.025em; line-height: 1.2; }
.hb-yd2-hello p { margin: 3px 0 0; color: var(--hb-yd2-mute); font-size: 13px; }
.hb-yd2-search { position: relative; width: 230px; color: #8d877b; }
.hb-yd2-search svg { position: absolute; top: 50%; left: 11px; width: 15px; height: 15px; transform: translateY(-50%); pointer-events: none; }
.hb-yd2-search input { width: 100%; height: 36px; padding: 0 12px 0 34px; border: 1px solid var(--hb-yd2-line); border-radius: 10px; background: #fffefb; font-size: 13px; }
.hb-yd2-search input::placeholder { color: #9a9488; }
.hb-yd2-search input:focus-visible { border-color: var(--a); outline-offset: 0; }
.hb-yd2-ibtn { position: relative; display: grid; place-items: center; flex: none; width: 36px; height: 36px; border: 1px solid var(--hb-yd2-line); border-radius: 10px; background: #fffefb; color: #4d4941; cursor: pointer; transition: border-color .15s ease; }
.hb-yd2-ibtn:hover { border-color: #cfc8b7; }
.hb-yd2-ibtn i { position: absolute; top: 7px; right: 8px; width: 7px; height: 7px; border: 2px solid #fffefb; border-radius: 50%; background: var(--a); box-sizing: content-box; margin: -2px; }
.hb-yd2-cta { display: inline-flex; align-items: center; gap: 6px; flex: none; height: 36px; padding: 0 14px 0 11px; border: 0; border-radius: 10px; background: var(--a); color: #fffaf3; font-size: 13px; font-weight: 600; cursor: pointer; box-shadow: 0 1px 0 rgba(255, 255, 255, .25) inset, 0 4px 12px -6px var(--a); transition: filter .15s ease, transform .15s ease; }
.hb-yd2-cta:hover { filter: brightness(1.06); }
.hb-yd2-cta:active { transform: translateY(1px); }
.hb-yd2-ico { display: block; flex: none; width: 16px; height: 16px; }
.hb-yd2-content { display: flex; flex-direction: column; gap: 16px; min-width: 0; padding: 18px 28px 28px; }
.hb-yd2-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }
.hb-yd2-tabs { display: inline-flex; flex-wrap: wrap; gap: 4px; padding: 3px; border: 1px solid var(--hb-yd2-line); border-radius: 11px; background: #efebe1; }
.hb-yd2-tabs button { height: 28px; padding: 0 12px; border: 0; border-radius: 8px; background: transparent; color: #5e594f; font-size: 12.5px; font-weight: 500; cursor: pointer; transition: background .15s ease, color .15s ease, box-shadow .15s ease; }
.hb-yd2-tabs button:hover { color: var(--hb-yd2-ink); }
.hb-yd2-tabs button[aria-pressed="true"] { background: #fffefb; color: var(--hb-yd2-ink); font-weight: 600; box-shadow: 0 1px 2px rgba(60, 50, 30, .12); }
.hb-yd2-meta { color: var(--hb-yd2-mute); font-size: 12.5px; }
.hb-yd2-card {
  min-width: 0;
  padding: 18px;
  border: 1px solid var(--hb-yd2-line);
  border-radius: 16px;
  background: #fffefb;
  box-shadow: 0 1px 2px rgba(60, 50, 30, .04), 0 8px 24px -16px rgba(60, 50, 30, .18);
  animation: hb-yd2-rise .6s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: calc(var(--d, 0) * 70ms);
}
.hb-yd2-ch { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
.hb-yd2-ct { margin: 0; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-yd2-cs { margin: 2px 0 0; color: var(--hb-yd2-mute); font-size: 12px; }
.hb-yd2-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); padding: 0; overflow: hidden; }
.hb-yd2-kpi { min-width: 0; padding: 16px 18px; border-left: 1px solid var(--hb-yd2-line); }
.hb-yd2-kpi:first-child { border-left: 0; }
.hb-yd2-kpi span { display: block; color: var(--hb-yd2-mute); font-size: 12px; }
.hb-yd2-kpi b { display: block; margin: 6px 0 4px; font-size: 28px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.035em; line-height: 1; }
.hb-yd2-kpi small { display: inline-flex; align-items: center; gap: 4px; color: var(--hb-yd2-mute); font-size: 12px; }
.hb-yd2-kpi small i { font-style: normal; font-weight: 600; }
.hb-yd2-good { color: #2f7a55; }
.hb-yd2-bad { color: #b4412b; }
.hb-yd2-row { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr); gap: 16px; }
.hb-yd2-leg { display: flex; flex-wrap: wrap; gap: 4px 12px; color: var(--hb-yd2-mute); font-size: 12px; }
.hb-yd2-leg span { display: inline-flex; align-items: center; gap: 6px; transition: opacity .2s ease; }
.hb-yd2-leg span[data-dim="true"] { opacity: .35; }
.hb-yd2-leg i { width: 9px; height: 9px; border-radius: 3px; }
.hb-yd2-hc { display: grid; grid-template-columns: 30px minmax(0, 1fr); grid-template-rows: 220px auto; column-gap: 8px; }
.hb-yd2-yl { position: relative; }
.hb-yd2-yl span { position: absolute; right: 0; color: #9a9488; font-size: 11px; font-variant-numeric: tabular-nums; transform: translateY(50%); }
.hb-yd2-cols { position: relative; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); grid-template-rows: 100%; align-items: end; gap: 8px; height: 100%; padding: 0 2px; background-image: linear-gradient(var(--hb-yd2-line) 1px, transparent 1px); background-size: 100% 25%; background-position: 0 -1px; border-bottom: 1px solid #d6d0c2; }
.hb-yd2-col { position: relative; display: flex; flex-direction: column-reverse; height: var(--h); min-width: 0; border: 0; padding: 0; background: none; cursor: pointer; transform-origin: bottom; animation: hb-yd2-grow .7s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd2-col i { display: block; width: 100%; height: var(--s); background: var(--c); transition: opacity .2s ease, filter .2s ease; }
.hb-yd2-col i:last-child { border-radius: 5px 5px 0 0; }
.hb-yd2-col i[data-dim="true"] { opacity: .2; }
.hb-yd2-col:hover i, .hb-yd2-col:focus-visible i { filter: brightness(1.08) saturate(1.1); }
.hb-yd2-col[data-on="true"]::after { content: ""; position: absolute; inset: -4px -3px auto; height: calc(100% + 4px); border-radius: 7px; background: rgba(29, 28, 26, .04); z-index: -1; }
.hb-yd2-xl { grid-column: 2; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 8px; padding: 8px 2px 0; color: #9a9488; font-size: 11px; text-align: center; }
.hb-yd2-tt { position: absolute; z-index: 4; min-width: 150px; padding: 9px 11px; border-radius: 10px; background: #1d1c1a; color: #f2efe7; box-shadow: 0 14px 30px -12px rgba(30, 25, 15, .55); font-size: 12px; pointer-events: none; }
.hb-yd2-tt-h { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 5px; font-weight: 600; }
.hb-yd2-tt-r { display: grid; grid-template-columns: 8px minmax(0, 1fr) auto; align-items: center; gap: 7px; color: #c9c3b6; }
.hb-yd2-tt-r i { width: 8px; height: 8px; border-radius: 2px; }
.hb-yd2-tt-r b { color: #ffffff; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-yd2-fun { display: flex; flex-direction: column; gap: 6px; margin: 0; padding: 0; list-style: none; }
.hb-yd2-fun li { display: grid; grid-template-columns: 86px minmax(0, 1fr) 48px; align-items: center; gap: 10px; padding: 4px 6px; margin: 0 -6px; border-radius: 9px; transition: background .15s ease; }
.hb-yd2-fun li:hover { background: #f4f1e9; }
.hb-yd2-fun-l { color: #4d4941; font-size: 12.5px; }
.hb-yd2-fun-t { position: relative; display: flex; justify-content: center; height: 30px; }
.hb-yd2-fun-b { display: flex; align-items: center; justify-content: center; width: var(--w); height: 100%; border-radius: 8px; background: color-mix(in srgb, var(--a) var(--o), #fffefb); color: var(--hb-yd2-ink); font-size: 12px; font-weight: 650; font-variant-numeric: tabular-nums; animation: hb-yd2-spread .8s cubic-bezier(.3, .7, .2, 1) both; }
.hb-yd2-fun-b[data-strong="true"] { color: #fffaf3; }
.hb-yd2-fun-c { color: var(--hb-yd2-mute); font-size: 11.5px; font-variant-numeric: tabular-nums; text-align: right; }
.hb-yd2-fun-f { display: flex; justify-content: space-between; gap: 8px; margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--hb-yd2-line); color: var(--hb-yd2-mute); font-size: 12px; }
.hb-yd2-fun-f b { color: var(--hb-yd2-ink); font-weight: 600; }
.hb-yd2-cal { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 18px; }
.hb-yd2-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 5px; }
.hb-yd2-wd { padding-bottom: 2px; color: #9a9488; font-size: 11px; font-weight: 600; text-align: center; }
.hb-yd2-day {
  position: relative;
  aspect-ratio: 1.15;
  min-width: 0;
  padding: 4px 5px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: color-mix(in srgb, var(--a) var(--o), #f4f1e9);
  color: var(--hb-yd2-ink);
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  text-align: left;
  cursor: pointer;
  animation: hb-yd2-pop .45s cubic-bezier(.3, .7, .2, 1) both;
  transition: transform .15s ease, border-color .15s ease;
}
.hb-yd2-day[data-hi="true"] { color: #fffaf3; }
.hb-yd2-day[data-wk="true"] { background: repeating-linear-gradient(135deg, #f1ede4 0 4px, #ece7dc 4px 8px); color: #a49e91; }
.hb-yd2-day[data-hol="true"] { background: #1d1c1a; color: #f7f5ef; }
.hb-yd2-day[data-today="true"] { border-color: var(--hb-yd2-ink); }
.hb-yd2-day[aria-pressed="true"] { box-shadow: 0 0 0 2px #fffefb, 0 0 0 4px var(--a); }
.hb-yd2-day:hover { transform: translateY(-1px); }
.hb-yd2-day em { position: absolute; right: 5px; bottom: 3px; font-size: 10px; font-style: normal; font-weight: 500; opacity: .8; }
.hb-yd2-scale { display: flex; align-items: center; gap: 4px; margin-top: 10px; color: #9a9488; font-size: 11px; }
.hb-yd2-scale i { width: 14px; height: 10px; border-radius: 3px; }
.hb-yd2-det { display: flex; flex-direction: column; min-width: 0; padding: 14px; border-radius: 12px; background: #f4f1e9; }
.hb-yd2-det h4 { margin: 0; font-size: 13px; font-weight: 600; }
.hb-yd2-det > p { margin: 2px 0 10px; color: var(--hb-yd2-mute); font-size: 12px; }
.hb-yd2-det ul { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-yd2-det li { display: flex; align-items: center; gap: 9px; min-width: 0; font-size: 12.5px; animation: hb-yd2-rise .35s cubic-bezier(.2, .7, .2, 1) both; }
.hb-yd2-det li span:last-child { margin-left: auto; color: var(--hb-yd2-mute); font-size: 11.5px; white-space: nowrap; }
.hb-yd2-det li b { overflow: hidden; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd2-av { display: grid; place-items: center; flex: none; border-radius: 50%; color: #ffffff; font-size: 11px; font-weight: 650; letter-spacing: .01em; }
.hb-yd2-empty { color: var(--hb-yd2-mute); font-size: 12.5px; }
.hb-yd2-rev { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-yd2-rev li { display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; align-items: center; gap: 11px; padding: 10px 0; border-top: 1px solid #efebe1; }
.hb-yd2-rev li:first-child { border-top: 0; padding-top: 0; }
.hb-yd2-rev-t { min-width: 0; }
.hb-yd2-rev-t b { display: block; overflow: hidden; font-size: 13px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd2-rev-t span { display: block; overflow: hidden; color: var(--hb-yd2-mute); font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd2-steps { display: inline-flex; gap: 3px; margin-top: 5px; }
.hb-yd2-steps i { width: 18px; height: 4px; border-radius: 999px; background: #e7e2d6; }
.hb-yd2-steps i[data-on="true"] { background: var(--a); }
.hb-yd2-date { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 46px; height: 46px; border: 1px solid var(--hb-yd2-line); border-radius: 11px; background: #fbfaf6; line-height: 1.1; }
.hb-yd2-date span { color: var(--a); font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.hb-yd2-date b { font-size: 17px; font-weight: 650; font-variant-numeric: tabular-nums; }
.hb-yd2-dir { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.hb-yd2-person {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  padding: 14px;
  border: 1px solid var(--hb-yd2-line);
  border-radius: 14px;
  background: linear-gradient(180deg, #fffefb, #fbf9f4);
  animation: hb-yd2-rise .5s cubic-bezier(.2, .7, .2, 1) both;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.hb-yd2-person:hover { border-color: #d6cfbe; box-shadow: 0 12px 26px -16px rgba(60, 50, 30, .35); transform: translateY(-2px); }
.hb-yd2-person-av { position: relative; margin-bottom: 10px; }
.hb-yd2-person-av i { position: absolute; right: -1px; bottom: -1px; width: 12px; height: 12px; border: 2px solid #fffefb; border-radius: 50%; }
.hb-yd2-person b { max-width: 100%; overflow: hidden; font-size: 13px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd2-person > span { max-width: 100%; overflow: hidden; color: var(--hb-yd2-mute); font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-yd2-tag { display: inline-flex; align-items: center; gap: 5px; margin-top: 10px; padding: 2px 8px; border-radius: 999px; background: color-mix(in srgb, var(--c) 12%, #fffefb); color: color-mix(in srgb, var(--c) 80%, #1d1c1a); font-size: 11px; font-weight: 600; }
.hb-yd2-person-f { display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; margin-top: 12px; padding-top: 10px; border-top: 1px solid #efebe1; color: var(--hb-yd2-mute); font-size: 11.5px; }
.hb-yd2-person-f div { display: flex; gap: 4px; }
.hb-yd2-sbtn { display: grid; place-items: center; width: 26px; height: 26px; border: 1px solid var(--hb-yd2-line); border-radius: 7px; background: #fffefb; color: #5e594f; cursor: pointer; transition: border-color .15s ease, color .15s ease; }
.hb-yd2-sbtn:hover { border-color: var(--a); color: var(--a); }
.hb-yd2-sbtn svg { width: 13px; height: 13px; }
.hb-yd2-link-btn { display: inline-flex; align-items: center; gap: 4px; height: 30px; padding: 0 10px; border: 1px solid var(--hb-yd2-line); border-radius: 9px; background: #fffefb; color: #4d4941; font-size: 12px; font-weight: 500; cursor: pointer; }
.hb-yd2-link-btn:hover { border-color: #cfc8b7; color: var(--hb-yd2-ink); }
.hb-yd2-link-btn svg { width: 13px; height: 13px; }
@keyframes hb-yd2-rise { from { opacity: 0; transform: translate3d(0, 10px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-yd2-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-yd2-spread { from { transform: scaleX(.1); opacity: 0; } to { transform: scaleX(1); opacity: 1; } }
@keyframes hb-yd2-pop { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: none; } }
@keyframes hb-yd2-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@container hb-yd2 (max-width: 1079px) {
  .hb-yd2-dir { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@container hb-yd2 (max-width: 979px) {
  .hb-yd2-row { grid-template-columns: minmax(0, 1fr); }
  .hb-yd2-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-yd2-kpi:nth-child(3) { border-left: 0; }
  .hb-yd2-kpi:nth-child(n + 3) { border-top: 1px solid var(--hb-yd2-line); }
}
@container hb-yd2 (max-width: 759px) {
  .hb-yd2-app { grid-template-columns: minmax(0, 1fr); min-height: 0; }
  .hb-yd2-side { flex-direction: row; align-items: center; gap: 8px; padding: 10px 14px; border-right: 0; border-bottom: 1px solid var(--hb-yd2-line); overflow-x: auto; }
  .hb-yd2-brand span:last-child, .hb-yd2-org, .hb-yd2-nav-h, .hb-yd2-link-t, .hb-yd2-link em, .hb-yd2-note { display: none; }
  .hb-yd2-nav { flex-direction: row; flex: 1; gap: 4px; }
  .hb-yd2-link { justify-content: center; width: 36px; padding: 0; }
  .hb-yd2-top { flex-wrap: wrap; padding: 16px 16px 0; }
  .hb-yd2-search { display: none; }
  .hb-yd2-content { padding: 16px; }
  .hb-yd2-cal { grid-template-columns: minmax(0, 1fr); }
  .hb-yd2-dir { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-yd2-cols, .hb-yd2-xl { gap: 4px; }
}
@container hb-yd2 (max-width: 479px) {
  .hb-yd2-hello h2 { font-size: 20px; }
  .hb-yd2-cta span { display: none; }
  .hb-yd2-kpi b { font-size: 22px; }
  .hb-yd2-dir { grid-template-columns: minmax(0, 1fr); }
  .hb-yd2-fun li { grid-template-columns: 70px minmax(0, 1fr) 40px; gap: 6px; }
  .hb-yd2-xl span:nth-child(even) { visibility: hidden; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yd2 *, .hb-yd2 *::before, .hb-yd2 *::after { animation: none !important; transition: none !important; }
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
  return `linear-gradient(135deg, hsl(${hue} 46% 58%), hsl(${(hue + 36) % 360} 44% 40%))`;
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
  home: ["M3 11l9-7 9 7", "M5 10v10h14V10"],
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"],
  brief: ["M3 8h18v12H3z", "M8 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3", "M3 13h18"],
  sun: ["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"],
  star: ["M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"],
  card: ["M2 6h20v12H2z", "M2 10h20", "M6 15h4"],
  chart: ["M3 3v18h18", "M8 17v-5M13 17V8M18 17v-9"],
  org: ["M9 3h6v5H9z", "M4 16h6v5H4zM14 16h6v5h-6z", "M12 8v4M7 16v-2h10v2"],
  search: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.3-4.3"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.7 21a2 2 0 0 1-3.4 0"],
  plus: ["M12 5v14", "M5 12h14"],
  chev: ["M8 9l4-4 4 4", "M8 15l4 4 4-4"],
  mail: ["M3 5h18v14H3z", "M3 6l9 7 9-7"],
  chat: ["M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"],
  pin: ["M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z", "M12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"],
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
};

function Ico({ n, className = "hb-yd2-ico" }: { n: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(icons[n] ?? []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

const TEAMS: HrTeam[] = ["All", "Engineering", "Design", "Sales", "Operations"];
type Dept = Exclude<HrTeam, "All">;
const DEPTS: Dept[] = ["Engineering", "Design", "Sales", "Operations"];
const DEPT_COLOR: Record<Dept, string> = { Engineering: "#3b5b92", Design: "#b4637a", Sales: "#c99a2e", Operations: "#5b8a72" };
const MONTHS = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
const HEAD: Record<Dept, number[]> = {
  Engineering: [78, 79, 81, 82, 84, 86, 87, 89, 91, 92, 94, 96],
  Design: [18, 18, 19, 19, 20, 21, 21, 22, 22, 23, 23, 24],
  Sales: [52, 51, 53, 54, 53, 55, 56, 55, 57, 57, 58, 58],
  Operations: [30, 30, 31, 31, 32, 32, 33, 34, 34, 35, 35, 36],
};
const TEAM_STATS: Record<HrTeam, { hires: number; attrition: number; enps: number; roles: number }> = {
  All: { hires: 14, attrition: 7.4, enps: 42, roles: 12 },
  Engineering: { hires: 7, attrition: 5.9, enps: 47, roles: 6 },
  Design: { hires: 2, attrition: 4.2, enps: 51, roles: 1 },
  Sales: { hires: 3, attrition: 12.8, enps: 31, roles: 3 },
  Operations: { hires: 2, attrition: 6.1, enps: 39, roles: 2 },
};
const PIPELINE: Record<HrTeam, number[]> = {
  All: [1284, 412, 138, 26, 19],
  Engineering: [702, 214, 71, 13, 9],
  Design: [188, 61, 19, 4, 3],
  Sales: [276, 96, 33, 6, 5],
  Operations: [118, 41, 15, 3, 2],
};
const STAGES = ["Applied", "Screened", "Interviewed", "Offer", "Hired"];

type Status = "office" | "remote" | "off";
interface Person {
  name: string;
  role: string;
  dept: Dept;
  city: string;
  time: string;
  status: Status;
}

const PEOPLE: Person[] = [
  { name: "Lena Hoffmann", role: "Staff Engineer", dept: "Engineering", city: "Berlin", time: "15:42", status: "office" },
  { name: "Kai Nakamura", role: "Design Lead", dept: "Design", city: "Tokyo", time: "23:42", status: "remote" },
  { name: "Marcus Hale", role: "Account Executive", dept: "Sales", city: "Chicago", time: "08:42", status: "office" },
  { name: "Grace Whitfield", role: "People Partner", dept: "Operations", city: "Austin", time: "08:42", status: "office" },
  { name: "Tomás Rivera", role: "Frontend Engineer", dept: "Engineering", city: "Lisbon", time: "14:42", status: "remote" },
  { name: "Sofia Lindqvist", role: "Product Designer", dept: "Design", city: "Stockholm", time: "15:42", status: "off" },
  { name: "Elena Petrova", role: "Sales Director", dept: "Sales", city: "London", time: "14:42", status: "remote" },
  { name: "Noor Haddad", role: "Finance Lead", dept: "Operations", city: "Dubai", time: "18:42", status: "remote" },
  { name: "Priya Raman", role: "Engineering Manager", dept: "Engineering", city: "Toronto", time: "09:42", status: "office" },
  { name: "Jonah Mbeki", role: "Site Reliability Engineer", dept: "Engineering", city: "Cape Town", time: "16:42", status: "off" },
  { name: "Mira Castellanos", role: "Brand Designer", dept: "Design", city: "Barcelona", time: "15:42", status: "office" },
  { name: "Diego Alvarez", role: "Solutions Engineer", dept: "Sales", city: "Mexico City", time: "07:42", status: "office" },
  { name: "Owen Brennan", role: "IT Specialist", dept: "Operations", city: "Dublin", time: "14:42", status: "off" },
  { name: "Hana Sato", role: "Backend Engineer", dept: "Engineering", city: "Osaka", time: "23:42", status: "remote" },
  { name: "Ruth Adeyemi", role: "Sales Development Rep", dept: "Sales", city: "Lagos", time: "15:42", status: "office" },
  { name: "Felix Navarro", role: "Recruiter", dept: "Operations", city: "Madrid", time: "15:42", status: "office" },
];

const STATUS_LABEL: Record<Status, string> = { office: "In office", remote: "Remote", off: "Off today" };
const STATUS_COLOR: Record<Status, string> = { office: "#3f9b6e", remote: "#3b5b92", off: "#c99a2e" };

const REVIEWS = [
  { name: "Tomás Rivera", type: "Probation check-in", role: "Frontend Engineer", m: "Nov", d: 6, step: 2 },
  { name: "Elena Petrova", type: "Promotion review", role: "Sales Director", m: "Nov", d: 10, step: 1 },
  { name: "Mira Castellanos", type: "Annual review", role: "Brand Designer", m: "Nov", d: 13, step: 3 },
  { name: "Owen Brennan", type: "Mid-year review", role: "IT Specialist", m: "Nov", d: 18, step: 1 },
  { name: "Hana Sato", type: "Annual review", role: "Backend Engineer", m: "Nov", d: 24, step: 0 },
];

const LEAVE_KIND = ["Vacation", "Sick leave", "Parental leave", "Personal day", "Vacation", "Conference"];

const NOV_START = 6;
const HOLIDAYS: Record<number, string> = { 26: "Thanksgiving", 27: "Day after Thanksgiving" };
const TODAY = 4;

function offOn(day: number) {
  const dow = (NOV_START + day - 1) % 7;
  if (dow >= 5 || HOLIDAYS[day]) return [] as { p: Person; kind: string }[];
  const base = Math.floor(hash(day * 3 + 11) * 5) + (day >= 20 && day <= 25 ? 4 : 0) + (day === 4 ? 1 : 0);
  const out: { p: Person; kind: string }[] = [];
  for (let k = 0; k < base; k++) {
    const p = PEOPLE[Math.floor(hash(day * 31 + k * 7) * PEOPLE.length)];
    if (!out.some((o) => o.p.name === p.name)) out.push({ p, kind: LEAVE_KIND[Math.floor(hash(day * 13 + k) * LEAVE_KIND.length)] });
  }
  return out;
}

const OFF = Array.from({ length: 30 }, (_, i) => offOn(i + 1));
const DOW = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const NAV = [
  { id: "home", label: "Home", icon: "home", section: "Workspace" },
  { id: "people", label: "People", icon: "users", count: "214" },
  { id: "hiring", label: "Hiring", icon: "brief", count: "12" },
  { id: "time", label: "Time off", icon: "sun" },
  { id: "reviews", label: "Reviews", icon: "star", count: "5" },
  { id: "payroll", label: "Payroll", icon: "card" },
  { id: "reports", label: "Reports", icon: "chart", section: "Insights" },
  { id: "org", label: "Org chart", icon: "org" },
];

export function DashboardHr({
  accent = "#c4572a",
  brand = "Hearth",
  company = "Northwind",
  user = "Amara Okafor",
  team,
  defaultTeam = "All",
  onTeamChange,
  className = "",
  style,
  ...rest
}: DashboardHrProps) {
  const [innerTeam, setInnerTeam] = React.useState<HrTeam>(defaultTeam);
  const [nav, setNav] = React.useState("home");
  const [col, setCol] = React.useState<number | null>(null);
  const [day, setDay] = React.useState(TODAY);
  const t = team ?? innerTeam;

  const pickTeam = (next: HrTeam) => {
    setInnerTeam(next);
    setCol(null);
    onTeamChange?.(next);
  };

  const depts = t === "All" ? DEPTS : [t];
  const headAt = (i: number) => depts.reduce((s, d) => s + HEAD[d][i], 0);
  const headNow = headAt(11);
  const headStart = headAt(0);
  const stats = TEAM_STATS[t];
  const totals = MONTHS.map((_, i) => DEPTS.reduce((s, d) => s + HEAD[d][i], 0));
  const maxY = 240;
  const pipe = PIPELINE[t];
  const people = (t === "All" ? PEOPLE : PEOPLE.filter((p) => p.dept === t)).slice(0, 8);
  const sel = OFF[day - 1];
  const selDow = DOW[(NOV_START + day - 1) % 7];
  const firstName = user.split(" ")[0];

  const kpis = [
    { label: "Headcount", value: String(headNow), note: `+${headNow - headStart} since Dec`, good: true },
    { label: "New hires, 90 days", value: String(stats.hires), note: `${stats.roles} roles open`, good: true },
    { label: "Attrition, 12 months", value: `${stats.attrition.toFixed(1)}%`, note: stats.attrition > 10 ? "Above 10% target" : "Below 10% target", good: stats.attrition <= 10 },
    { label: "eNPS", value: `+${stats.enps}`, note: "Pulse survey, Oct", good: stats.enps >= 40 },
  ];

  const colKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = Math.min(11, i + 1);
    else if (e.key === "ArrowLeft") next = Math.max(0, i - 1);
    else return;
    e.preventDefault();
    const sib = e.currentTarget.parentElement?.children[next] as HTMLElement | undefined;
    sib?.focus();
  };

  const vars = { "--a": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-yd2 ${className}`} style={vars} {...rest}>
      <style href="hb-dashboard-hr" precedence="default">
        {css}
      </style>
      <div className="hb-yd2-app">
        <aside className="hb-yd2-side">
          <div className="hb-yd2-brand">
            <span className="hb-yd2-mark" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 11l8-7 8 7v9H4z" />
                <path d="M10 20v-5h4v5" />
              </svg>
            </span>
            <span>{brand}</span>
          </div>
          <button type="button" className="hb-yd2-org" aria-label={`Switch workspace, current ${company}`}>
            <span className="hb-yd2-org-l">{company.slice(0, 1)}</span>
            <span>
              <b>{company}</b>
              <span>214 people · 9 countries</span>
            </span>
            <Ico n="chev" />
          </button>
          <nav aria-label="Main">
            <ul className="hb-yd2-nav">
              {NAV.map((item) => (
                <React.Fragment key={item.id}>
                  {item.section ? (
                    <li className="hb-yd2-nav-h" aria-hidden="true">
                      {item.section}
                    </li>
                  ) : null}
                  <li>
                    <button type="button" className="hb-yd2-link" aria-label={item.label} aria-current={nav === item.id ? "page" : undefined} onClick={() => setNav(item.id)}>
                      <Ico n={item.icon} />
                      <span className="hb-yd2-link-t">{item.label}</span>
                      {item.count ? <em>{item.count}</em> : null}
                    </button>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </nav>
          <div className="hb-yd2-note">
            <b>Open enrollment</b>
            <p>146 of 214 people have picked a 2027 benefits plan. Closes Nov 21.</p>
            <div className="hb-yd2-note-bar">
              <i />
            </div>
            <button type="button">Send reminder</button>
          </div>
        </aside>

        <div className="hb-yd2-main">
          <header className="hb-yd2-top">
            <div className="hb-yd2-hello">
              <h2>Good morning, {firstName}</h2>
              <p>Wednesday, November 4 · 3 people start next Monday</p>
            </div>
            <label className="hb-yd2-search">
              <Ico n="search" />
              <input type="search" placeholder="Search people, roles, teams" aria-label="Search people" />
            </label>
            <button type="button" className="hb-yd2-ibtn" aria-label="Notifications, 4 unread">
              <Ico n="bell" />
              <i />
            </button>
            <span className="hb-yd2-av" style={{ width: 36, height: 36, background: tone(user) }} title={user}>
              {initials(user)}
            </span>
            <button type="button" className="hb-yd2-cta">
              <Ico n="plus" />
              <span>Add person</span>
            </button>
          </header>

          <div className="hb-yd2-content">
            <div className="hb-yd2-bar">
              <div className="hb-yd2-tabs" role="group" aria-label="Team">
                {TEAMS.map((k) => (
                  <button key={k} type="button" aria-pressed={t === k} onClick={() => pickTeam(k)}>
                    {k === "All" ? "All teams" : k}
                  </button>
                ))}
              </div>
              <span className="hb-yd2-meta">Updated 9:12 AM from payroll sync</span>
            </div>

            <section className="hb-yd2-card hb-yd2-kpis" aria-label="Key numbers" style={{ "--d": 0 } as React.CSSProperties}>
              {kpis.map((k) => (
                <div className="hb-yd2-kpi" key={k.label}>
                  <span>{k.label}</span>
                  <b>{k.value}</b>
                  <small>
                    <i className={k.good ? "hb-yd2-good" : "hb-yd2-bad"}>●</i>
                    {k.note}
                  </small>
                </div>
              ))}
            </section>

            <div className="hb-yd2-row">
              <section className="hb-yd2-card" style={{ "--d": 1 } as React.CSSProperties} aria-label="Headcount trend">
                <div className="hb-yd2-ch">
                  <div>
                    <h3 className="hb-yd2-ct">Headcount trend</h3>
                    <p className="hb-yd2-cs">Active employees at month end, last 12 months</p>
                  </div>
                  <div className="hb-yd2-leg">
                    {DEPTS.map((d) => (
                      <span key={d} data-dim={t !== "All" && t !== d}>
                        <i style={{ background: DEPT_COLOR[d] }} />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hb-yd2-hc">
                  <div className="hb-yd2-yl" aria-hidden="true">
                    {[0, 60, 120, 180, 240].map((v) => (
                      <span key={v} style={{ bottom: `${((v / maxY) * 100).toFixed(1)}%` }}>
                        {v}
                      </span>
                    ))}
                  </div>
                  <div className="hb-yd2-cols" onPointerLeave={() => setCol(null)}>
                    {MONTHS.map((m, i) => (
                      <button
                        key={m}
                        type="button"
                        className="hb-yd2-col"
                        data-on={col === i}
                        aria-label={`${m}: ${totals[i]} people. ${DEPTS.map((d) => `${d} ${HEAD[d][i]}`).join(", ")}`}
                        style={{ "--h": `${((totals[i] / maxY) * 100).toFixed(2)}%`, animationDelay: `${i * 45}ms` } as React.CSSProperties}
                        onPointerEnter={() => setCol(i)}
                        onFocus={() => setCol(i)}
                        onBlur={() => setCol(null)}
                        onKeyDown={(e) => colKey(e, i)}
                      >
                        {DEPTS.map((d) => (
                          <i
                            key={d}
                            data-dim={t !== "All" && t !== d}
                            style={{ "--s": `${((HEAD[d][i] / totals[i]) * 100).toFixed(2)}%`, "--c": DEPT_COLOR[d] } as React.CSSProperties}
                          />
                        ))}
                      </button>
                    ))}
                    {col !== null ? (
                      <div
                        className="hb-yd2-tt"
                        style={{
                          left: `${(((col + 0.5) / 12) * 100).toFixed(2)}%`,
                          bottom: `calc(${((totals[col] / maxY) * 100).toFixed(2)}% + 10px)`,
                          transform: col > 8 ? "translateX(-100%)" : col < 3 ? "none" : "translateX(-50%)",
                        }}
                      >
                        <div className="hb-yd2-tt-h">
                          <span>{MONTHS[col]} {col === 0 ? 2025 : 2026}</span>
                          <span>{t === "All" ? totals[col] : headAt(col)}</span>
                        </div>
                        {DEPTS.map((d) => (
                          <div className="hb-yd2-tt-r" key={d} style={{ opacity: t !== "All" && t !== d ? 0.45 : 1 }}>
                            <i style={{ background: DEPT_COLOR[d] }} />
                            <span>{d}</span>
                            <b>{HEAD[d][col]}</b>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="hb-yd2-xl" aria-hidden="true">
                    {MONTHS.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="hb-yd2-card" style={{ "--d": 2 } as React.CSSProperties} aria-label="Hiring pipeline">
                <div className="hb-yd2-ch">
                  <div>
                    <h3 className="hb-yd2-ct">Hiring pipeline</h3>
                    <p className="hb-yd2-cs">Candidates by stage, this quarter</p>
                  </div>
                  <button type="button" className="hb-yd2-link-btn">
                    Open roles
                    <Ico n="arrow" className="" />
                  </button>
                </div>
                <ol className="hb-yd2-fun">
                  {STAGES.map((s, i) => {
                    const w = 22 + 78 * Math.pow(pipe[i] / pipe[0], 0.42);
                    const o = 18 + i * 19;
                    return (
                      <li key={`${t}${s}`}>
                        <span className="hb-yd2-fun-l">{s}</span>
                        <span className="hb-yd2-fun-t">
                          <span
                            className="hb-yd2-fun-b"
                            data-strong={o > 50}
                            style={{ "--w": `${w.toFixed(1)}%`, "--o": `${o}%`, animationDelay: `${i * 90}ms` } as React.CSSProperties}
                          >
                            {pipe[i].toLocaleString("en-US")}
                          </span>
                        </span>
                        <span className="hb-yd2-fun-c">{i === 0 ? "100%" : `${((pipe[i] / pipe[i - 1]) * 100).toFixed(0)}%`}</span>
                      </li>
                    );
                  })}
                </ol>
                <div className="hb-yd2-fun-f">
                  <span>
                    Time to hire <b>31 days</b>
                  </span>
                  <span>
                    Offer acceptance <b>{((pipe[4] / pipe[3]) * 100).toFixed(0)}%</b>
                  </span>
                </div>
              </section>
            </div>

            <div className="hb-yd2-row">
              <section className="hb-yd2-card" style={{ "--d": 3 } as React.CSSProperties} aria-label="Time off calendar">
                <div className="hb-yd2-ch">
                  <div>
                    <h3 className="hb-yd2-ct">Time off, November</h3>
                    <p className="hb-yd2-cs">Approved leave per working day</p>
                  </div>
                </div>
                <div className="hb-yd2-cal">
                  <div>
                    <div className="hb-yd2-grid">
                      {["M", "T", "W", "T", "F", "S", "S"].map((w, i) => (
                        <span key={i} className="hb-yd2-wd" aria-hidden="true">
                          {w}
                        </span>
                      ))}
                      {Array.from({ length: NOV_START }, (_, i) => (
                        <span key={`e${i}`} aria-hidden="true" />
                      ))}
                      {OFF.map((list, i) => {
                        const d = i + 1;
                        const dow = (NOV_START + i) % 7;
                        const wk = dow >= 5;
                        const hol = HOLIDAYS[d];
                        const o = Math.min(88, list.length * 13 + (list.length ? 8 : 0));
                        return (
                          <button
                            key={d}
                            type="button"
                            className="hb-yd2-day"
                            data-wk={wk}
                            data-hol={Boolean(hol)}
                            data-hi={o > 45}
                            data-today={d === TODAY}
                            aria-pressed={day === d}
                            aria-label={`November ${d}${hol ? `, ${hol}` : wk ? ", weekend" : `, ${list.length} ${list.length === 1 ? "person" : "people"} off`}`}
                            style={{ "--o": `${o}%`, animationDelay: `${(Math.floor((NOV_START + i) / 7) + dow) * 35}ms` } as React.CSSProperties}
                            onPointerEnter={() => setDay(d)}
                            onFocus={() => setDay(d)}
                            onClick={() => setDay(d)}
                          >
                            {d}
                            {list.length && !wk ? <em>{list.length}</em> : null}
                          </button>
                        );
                      })}
                    </div>
                    <div className="hb-yd2-scale" aria-hidden="true">
                      Fewer
                      {[0, 21, 47, 73].map((o) => (
                        <i key={o} style={{ background: `color-mix(in srgb, var(--a) ${o}%, #f4f1e9)` }} />
                      ))}
                      More
                      <i style={{ marginLeft: 10, background: "#1d1c1a" }} />
                      Holiday
                    </div>
                  </div>
                  <div className="hb-yd2-det" aria-live="polite">
                    <h4>
                      {selDow}, November {day}
                      {day === TODAY ? " · Today" : ""}
                    </h4>
                    <p>{HOLIDAYS[day] ? `Company holiday: ${HOLIDAYS[day]}` : sel.length ? `${sel.length} ${sel.length === 1 ? "person" : "people"} away` : "Everyone is in"}</p>
                    {sel.length ? (
                      <ul key={day}>
                        {sel.slice(0, 5).map((o, k) => (
                          <li key={o.p.name} style={{ animationDelay: `${k * 40}ms` }}>
                            <span className="hb-yd2-av" style={{ width: 26, height: 26, fontSize: 10, background: tone(o.p.name) }}>
                              {initials(o.p.name)}
                            </span>
                            <b>{o.p.name}</b>
                            <span>{o.kind}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="hb-yd2-empty">{HOLIDAYS[day] ? "Offices are closed." : "No approved leave on this day."}</span>
                    )}
                  </div>
                </div>
              </section>

              <section className="hb-yd2-card" style={{ "--d": 4 } as React.CSSProperties} aria-label="Upcoming reviews">
                <div className="hb-yd2-ch">
                  <div>
                    <h3 className="hb-yd2-ct">Upcoming reviews</h3>
                    <p className="hb-yd2-cs">Self review, peer feedback, manager review</p>
                  </div>
                </div>
                <ul className="hb-yd2-rev">
                  {REVIEWS.map((r) => (
                    <li key={r.name}>
                      <span className="hb-yd2-av" style={{ width: 34, height: 34, background: tone(r.name) }}>
                        {initials(r.name)}
                      </span>
                      <div className="hb-yd2-rev-t">
                        <b>{r.name}</b>
                        <span>
                          {r.type} · {r.role}
                        </span>
                        <span className="hb-yd2-steps" role="img" aria-label={`${r.step} of 3 steps complete`}>
                          {[0, 1, 2].map((k) => (
                            <i key={k} data-on={k < r.step} />
                          ))}
                        </span>
                      </div>
                      <span className="hb-yd2-date">
                        <span>{r.m}</span>
                        <b>{r.d}</b>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="hb-yd2-card" style={{ "--d": 5 } as React.CSSProperties} aria-label="Team directory">
              <div className="hb-yd2-ch">
                <div>
                  <h3 className="hb-yd2-ct">Team directory</h3>
                  <p className="hb-yd2-cs">
                    {t === "All" ? "Recently active across all teams" : `${t}, ${headNow} people`}
                  </p>
                </div>
                <button type="button" className="hb-yd2-link-btn">
                  View all {t === "All" ? 214 : headNow}
                  <Ico n="arrow" className="" />
                </button>
              </div>
              <div className="hb-yd2-dir">
                {people.map((p, i) => (
                  <article className="hb-yd2-person" key={p.name} style={{ animationDelay: `${i * 50}ms` }}>
                    <span className="hb-yd2-person-av">
                      <span className="hb-yd2-av" style={{ width: 42, height: 42, fontSize: 13, background: tone(p.name) }}>
                        {initials(p.name)}
                      </span>
                      <i style={{ background: STATUS_COLOR[p.status] }} title={STATUS_LABEL[p.status]} />
                    </span>
                    <b>{p.name}</b>
                    <span>{p.role}</span>
                    <span className="hb-yd2-tag" style={{ "--c": DEPT_COLOR[p.dept] } as React.CSSProperties}>
                      {p.dept}
                    </span>
                    <div className="hb-yd2-person-f">
                      <span>
                        {p.city} · {p.time}
                      </span>
                      <div>
                        <button type="button" className="hb-yd2-sbtn" aria-label={`Email ${p.name}`}>
                          <Ico n="mail" className="" />
                        </button>
                        <button type="button" className="hb-yd2-sbtn" aria-label={`Message ${p.name}`}>
                          <Ico n="chat" className="" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
