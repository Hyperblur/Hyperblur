"use client";

import * as React from "react";

export type AdminRole = "Admin" | "Editor" | "Viewer" | "Billing";
export type AdminStatus = "Active" | "Pending" | "Suspended";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  lastActive: number;
  team: string;
  location: string;
  joined: string;
  twoFactor: boolean;
}

export interface AdminDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  brand?: string;
  user?: string;
  workspace?: string;
  users?: AdminUser[];
  pageSize?: number;
  defaultSelected?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

const css = `
.hb-dad {
  --a: #2f7bff;
  container: hb-dad / inline-size;
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
.hb-dad *, .hb-dad *::before, .hb-dad *::after { box-sizing: border-box; }
.hb-dad button, .hb-dad input, .hb-dad select { font: inherit; color: inherit; }
.hb-dad button:focus-visible, .hb-dad input:focus-visible, .hb-dad select:focus-visible, .hb-dad [tabindex]:focus-visible {
  outline: 2px solid var(--a);
  outline-offset: 2px;
}
.hb-dad-app { display: grid; grid-template-columns: 220px minmax(0, 1fr); min-height: 640px; }
.hb-dad-side {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: 20px 12px 16px;
  border-right: 1px solid #1f1f1f;
  background: #0d0d0d;
}
.hb-dad-brand { display: flex; align-items: center; gap: 10px; padding: 0 8px; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-dad-mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--a), color-mix(in srgb, var(--a) 45%, #ffffff));
  color: #ffffff;
}
.hb-dad-nav { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-dad-nav-label { padding: 12px 8px 6px; color: #6b6b6b; font-size: 11px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
.hb-dad-link {
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
.hb-dad-link:hover { background: #161616; color: #ededed; }
.hb-dad-link[aria-current="page"] { background: #1b1b1b; color: #ffffff; }
.hb-dad-link[aria-current="page"] .hb-dad-ico { color: var(--a); }
.hb-dad-link-n {
  margin-left: auto;
  padding: 1px 7px;
  border-radius: 999px;
  background: #1f1f1f;
  color: #a1a1a1;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.hb-dad-side-foot { margin-top: auto; }
.hb-dad-main { display: flex; flex-direction: column; min-width: 0; }
.hb-dad-top { display: flex; align-items: center; gap: 12px; height: 60px; padding: 0 24px; border-bottom: 1px solid #1f1f1f; }
.hb-dad-crumb { min-width: 0; overflow: hidden; color: #8f8f8f; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.hb-dad-crumb strong { color: #ededed; font-weight: 500; }
.hb-dad-search { position: relative; width: 260px; margin-left: auto; color: #6b6b6b; }
.hb-dad-search .hb-dad-ico { position: absolute; top: 50%; left: 10px; width: 15px; height: 15px; transform: translateY(-50%); pointer-events: none; }
.hb-dad-search input {
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
.hb-dad-search input::placeholder { color: #6b6b6b; }
.hb-dad-search input:hover { border-color: #333333; }
.hb-dad-search input:focus-visible { border-color: var(--a); outline-offset: 0; }
.hb-dad-kbd {
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
.hb-dad-iconbtn {
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
.hb-dad-iconbtn:hover { border-color: #333333; background: #171717; color: #ededed; }
.hb-dad-dot { position: absolute; top: 8px; right: 9px; width: 7px; height: 7px; border: 2px solid #111111; border-radius: 50%; background: var(--a); box-sizing: content-box; margin: -2px; }
.hb-dad-av {
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
.hb-dad-content { display: flex; flex-direction: column; gap: 20px; min-width: 0; padding: 24px; }
.hb-dad-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; }
.hb-dad-title { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -.02em; line-height: 1.2; }
.hb-dad-sub { margin: 4px 0 0; color: #8f8f8f; font-size: 13px; }
.hb-dad-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.hb-dad-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid #232323;
  border-radius: 12px;
  background: #111111;
  animation: hb-dad-rise .55s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: calc(var(--d, 0) * 60ms);
}
.hb-dad-card-h { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.hb-dad-card-t { margin: 0; font-size: 13px; font-weight: 600; letter-spacing: -.005em; }
.hb-dad-card-s { margin: 2px 0 0; color: #8f8f8f; font-size: 12px; }
.hb-dad-seg { display: inline-flex; padding: 2px; border: 1px solid #262626; border-radius: 8px; background: #0d0d0d; }
.hb-dad-seg button {
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
.hb-dad-seg button:hover { color: #ededed; }
.hb-dad-seg button[aria-pressed="true"] { background: #232323; color: #ffffff; }
.hb-dad-btn {
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
.hb-dad-btn:hover { border-color: #3a3a3a; background: #1c1c1c; }
.hb-dad-btn:active { transform: translateY(1px); }
.hb-dad-btn[data-p="true"] { border-color: var(--a); background: var(--a); color: #ffffff; }
.hb-dad-btn[data-p="true"]:hover { background: color-mix(in srgb, var(--a) 85%, #ffffff); }
.hb-dad-btn .hb-dad-ico { width: 14px; height: 14px; }
.hb-dad-ico { display: block; flex: none; width: 16px; height: 16px; }
.hb-dad-pill {
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
.hb-dad-pill .hb-dad-ico { width: 11px; height: 11px; stroke-width: 2.4; }
.hb-dad-pill[data-t="up"] { background: rgba(74, 222, 128, .12); color: #4ade80; }
.hb-dad-pill[data-t="down"] { background: rgba(248, 113, 113, .12); color: #f87171; }
.hb-dad-pill[data-t="flat"] { background: #1f1f1f; color: #a1a1a1; }
.hb-dad-spark { display: block; width: 100%; height: 36px; color: var(--a); animation: hb-dad-wipe .9s .15s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dad-spark-l { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.hb-dad-tt {
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
.hb-dad-tt b { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-dad-tt-d { color: #8f8f8f; font-size: 11px; }
@keyframes hb-dad-rise { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-dad-wipe { from { clip-path: inset(-6px 100% -6px -6px); } to { clip-path: inset(-6px -6px -6px -6px); } }
@keyframes hb-dad-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-dad-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-dad-pulse { 0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, .55); } 100% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); } }
@keyframes hb-dad-arc { from { stroke-dasharray: 0 100; } }
@container hb-dad (max-width: 759px) {
  .hb-dad-app { grid-template-columns: minmax(0, 1fr); min-height: 0; }
  .hb-dad-side { flex-direction: row; align-items: center; gap: 8px; padding: 10px 12px; border-right: 0; border-bottom: 1px solid #1f1f1f; overflow-x: auto; }
  .hb-dad-brand { padding: 0; }
  .hb-dad-brand span:last-child, .hb-dad-nav-label, .hb-dad-link-t, .hb-dad-link-n, .hb-dad-side-foot, .hb-dad-kbd { display: none; }
  .hb-dad-nav { flex-direction: row; flex: 1; gap: 4px; }
  .hb-dad-link { justify-content: center; width: 36px; padding: 0; }
  .hb-dad-top { gap: 8px; padding: 0 16px; }
  .hb-dad-crumb { display: none; }
  .hb-dad-search { flex: 1; width: auto; margin-left: 0; }
  .hb-dad-content { gap: 16px; padding: 16px; }
  .hb-dad-title { font-size: 19px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-dad *, .hb-dad *::before, .hb-dad *::after { animation: none !important; transition: none !important; }
}
.hb-dad-plan { padding: 12px; border: 1px solid #232323; border-radius: 10px; background: #111111; }
.hb-dad-plan strong { display: block; font-size: 12.5px; font-weight: 500; }
.hb-dad-plan span { display: block; margin: 2px 0 10px; color: #8f8f8f; font-size: 11.5px; }
.hb-dad-plan-b { height: 5px; border-radius: 999px; background: #1b1b1b; overflow: hidden; }
.hb-dad-plan-b i { display: block; width: var(--w); height: 100%; border-radius: 999px; background: var(--a); transform-origin: left; animation: hb-dad-bar .9s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dad-ucard { padding: 0; overflow: hidden; }
.hb-dad-bar-t { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #1d1d1d; }
.hb-dad-find { position: relative; flex: 1 1 200px; max-width: 300px; color: #6b6b6b; }
.hb-dad-find .hb-dad-ico { position: absolute; top: 50%; left: 10px; width: 15px; height: 15px; transform: translateY(-50%); pointer-events: none; }
.hb-dad-find input, .hb-dad-sel select {
  width: 100%;
  height: 34px;
  border: 1px solid #242424;
  border-radius: 8px;
  background: #0d0d0d;
  color: #ededed;
  font-size: 13px;
  transition: border-color .15s ease;
}
.hb-dad-find input { padding: 0 12px 0 32px; }
.hb-dad-find input::placeholder { color: #6b6b6b; }
.hb-dad-find input:hover, .hb-dad-sel select:hover { border-color: #333333; }
.hb-dad-find input:focus-visible, .hb-dad-sel select:focus-visible { border-color: var(--a); outline-offset: 0; }
.hb-dad-sel { position: relative; flex: none; color: #8f8f8f; }
.hb-dad-sel select { appearance: none; padding: 0 30px 0 12px; cursor: pointer; }
.hb-dad-sel select option { background: #151515; color: #ededed; }
.hb-dad-sel .hb-dad-ico { position: absolute; top: 50%; right: 10px; width: 14px; height: 14px; transform: translateY(-50%); pointer-events: none; }
.hb-dad-fchips { display: flex; flex-wrap: wrap; gap: 6px; margin-left: auto; }
.hb-dad-fchip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: transparent;
  color: #a1a1a1;
  font-size: 12.5px;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, color .15s ease;
}
.hb-dad-fchip span { color: #6b6b6b; font-size: 11px; font-variant-numeric: tabular-nums; }
.hb-dad-fchip:hover { border-color: #3a3a3a; color: #ededed; }
.hb-dad-fchip[aria-pressed="true"] { border-color: color-mix(in srgb, var(--a) 55%, #262626); background: color-mix(in srgb, var(--a) 14%, transparent); color: #ffffff; }
.hb-dad-fchip[aria-pressed="true"] span { color: color-mix(in srgb, var(--a) 60%, #ffffff); }
.hb-dad-bulk {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--a) 30%, #1d1d1d);
  background: color-mix(in srgb, var(--a) 11%, #0e0e0e);
  animation: hb-dad-drop .28s cubic-bezier(.2, .8, .2, 1) both;
}
.hb-dad-bulk strong { margin-right: auto; font-size: 13px; font-weight: 500; }
.hb-dad-bulk .hb-dad-sel select { width: auto; height: 32px; }
.hb-dad-btn[data-d="true"] { border-color: rgba(248, 113, 113, .35); color: #f87171; }
.hb-dad-btn[data-d="true"]:hover { border-color: rgba(248, 113, 113, .6); background: rgba(248, 113, 113, .1); }
.hb-dad-tw { overflow-x: auto; }
.hb-dad-ut { width: 100%; min-width: 580px; border-collapse: collapse; }
.hb-dad-ut th {
  height: 40px;
  padding: 0 16px;
  border-bottom: 1px solid #1d1d1d;
  background: #0e0e0e;
  color: #8f8f8f;
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: .04em;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
}
.hb-dad-th-b { display: inline-flex; align-items: center; gap: 4px; padding: 0; border: 0; background: none; font: inherit; letter-spacing: inherit; text-transform: inherit; color: inherit; cursor: pointer; transition: color .15s ease; }
.hb-dad-th-b:hover { color: #ededed; }
.hb-dad-th-b .hb-dad-ico { width: 12px; height: 12px; opacity: 0; }
.hb-dad-ut th[aria-sort] .hb-dad-th-b { color: #ededed; }
.hb-dad-ut th[aria-sort] .hb-dad-ico { opacity: 1; }
.hb-dad-ut td { padding: 10px 16px; border-bottom: 1px solid #181818; vertical-align: middle; }
.hb-dad-ut tbody tr { cursor: pointer; transition: background .15s ease; }
.hb-dad-ut tbody tr:hover td { background: #151515; }
.hb-dad-ut tbody tr[data-sel="true"] td { background: color-mix(in srgb, var(--a) 8%, transparent); }
.hb-dad-ut tbody tr[data-open="true"] td { background: color-mix(in srgb, var(--a) 13%, transparent); }
.hb-dad-ck { width: 44px; padding-right: 0 !important; }
.hb-dad-ck input { display: block; width: 16px; height: 16px; margin: 0; accent-color: var(--a); cursor: pointer; }
.hb-dad-ucell { display: flex; align-items: center; gap: 12px; min-width: 0; padding: 0; border: 0; background: none; text-align: left; cursor: pointer; }
.hb-dad-ucell .hb-dad-av { width: 34px; height: 34px; }
.hb-dad-ucell strong { display: block; font-size: 13px; font-weight: 500; white-space: nowrap; }
.hb-dad-ucell div span { display: block; max-width: 220px; overflow: hidden; color: #6b6b6b; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-dad-role { display: inline-block; padding: 2px 8px; border-radius: 6px; background: color-mix(in srgb, var(--c) 14%, transparent); color: var(--c); font-size: 11.5px; font-weight: 500; }
.hb-dad-st { display: inline-flex; align-items: center; gap: 7px; color: #cfcfcf; font-size: 12.5px; }
.hb-dad-st i { width: 7px; height: 7px; border-radius: 50%; background: var(--c); box-shadow: 0 0 8px -1px var(--c); }
.hb-dad-la { color: #8f8f8f; font-size: 12.5px; white-space: nowrap; }
.hb-dad-rowbtn { display: grid; place-items: center; width: 30px; height: 30px; border: 0; border-radius: 7px; background: transparent; color: #8f8f8f; cursor: pointer; transition: background .15s ease, color .15s ease; }
.hb-dad-rowbtn .hb-dad-ico { stroke-width: 3.4; }
.hb-dad-rowbtn:hover { background: #1f1f1f; color: #ededed; }
.hb-dad-empty { padding: 56px 16px; color: #8f8f8f; text-align: center; }
.hb-dad-empty strong { display: block; margin-bottom: 4px; color: #ededed; font-size: 14px; font-weight: 500; }
.hb-dad-pager { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; color: #8f8f8f; font-size: 12.5px; }
.hb-dad-pgs { display: flex; align-items: center; gap: 4px; }
.hb-dad-pg {
  display: grid;
  place-items: center;
  min-width: 30px;
  height: 30px;
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: #a1a1a1;
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.hb-dad-pg:hover:not(:disabled) { background: #181818; color: #ededed; }
.hb-dad-pg[aria-current="page"] { border-color: #2a2a2a; background: #1b1b1b; color: #ffffff; }
.hb-dad-pg:disabled { opacity: .35; cursor: default; }
.hb-dad-scrim { position: absolute; inset: 0; z-index: 5; background: rgba(0, 0, 0, .55); opacity: 0; pointer-events: none; transition: opacity .3s ease; }
.hb-dad-scrim[data-open="true"] { opacity: 1; pointer-events: auto; }
.hb-dad-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 6;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: min(380px, 100%);
  padding: 20px;
  border-left: 1px solid #262626;
  background: #0f0f0f;
  box-shadow: -24px 0 48px -16px rgba(0, 0, 0, .7);
  overflow-y: auto;
  transform: translate3d(100%, 0, 0);
  visibility: hidden;
  transition: transform .38s cubic-bezier(.2, .8, .2, 1), visibility 0s linear .38s;
}
.hb-dad-panel[data-open="true"] { transform: none; visibility: visible; transition-delay: 0s; }
.hb-dad-pn-h { display: flex; align-items: center; justify-content: space-between; }
.hb-dad-pn-h h3 { margin: 0; font-size: 13px; font-weight: 600; }
.hb-dad-pn-id { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
.hb-dad-pn-id .hb-dad-av { width: 64px; height: 64px; margin-bottom: 4px; font-size: 20px; }
.hb-dad-pn-id strong { font-size: 17px; font-weight: 600; letter-spacing: -.01em; }
.hb-dad-pn-id p { margin: 0; color: #8f8f8f; font-size: 12.5px; }
.hb-dad-pn-tags { display: flex; justify-content: center; gap: 8px; margin-top: 6px; }
.hb-dad-pn-act { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.hb-dad-pn-act .hb-dad-btn { width: 100%; }
.hb-dad-pn-s { margin: 0 0 10px; color: #6b6b6b; font-size: 11px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
.hb-dad-kv { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 10px 16px; margin: 0; font-size: 12.5px; }
.hb-dad-kv dt { color: #8f8f8f; }
.hb-dad-kv dd { margin: 0; text-align: right; }
.hb-dad-kv .hb-dad-sel { display: inline-block; width: 120px; }
.hb-dad-kv .hb-dad-sel select { height: 28px; font-size: 12.5px; }
.hb-dad-act { display: flex; flex-direction: column; gap: 14px; margin: 0; padding: 0; list-style: none; }
.hb-dad-act li { position: relative; display: grid; grid-template-columns: 10px minmax(0, 1fr) auto; align-items: center; gap: 10px; font-size: 12.5px; }
.hb-dad-act i { width: 7px; height: 7px; border-radius: 50%; background: #3a3a3a; }
.hb-dad-act li:first-child i { background: var(--a); box-shadow: 0 0 8px -1px var(--a); }
.hb-dad-act span { color: #6b6b6b; font-size: 12px; white-space: nowrap; }
.hb-dad-pn-f { margin-top: auto; }
.hb-dad-pn-f .hb-dad-btn { width: 100%; }
@keyframes hb-dad-drop { from { opacity: 0; transform: translate3d(0, -6px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-dad-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@container hb-dad (max-width: 759px) {
  .hb-dad-fchips { margin-left: 0; }
  .hb-dad-find { max-width: none; }
}
@container hb-dad (max-width: 539px) {
  .hb-dad-hide { display: none; }
  .hb-dad-ut { min-width: 0; }
  .hb-dad-ucell div span { max-width: 130px; }
  .hb-dad-pn-act { grid-template-columns: minmax(0, 1fr); }
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
  card: ["M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "M2 10h20"],
  more: ["M5 12h.01M12 12h.01M19 12h.01"],
  up: ["M12 19V5M5 12l7-7 7 7"],
  down: ["M12 5v14M19 12l-7 7-7-7"],
  chevd: ["M6 9l6 6 6-6"],
  chevr: ["M9 6l6 6-6 6"],
  chevl: ["M15 6l-6 6 6 6"],
  x: ["M18 6L6 18M6 6l12 12"],
  mail: ["M3 5h18v14H3z", "M3 6l9 7 9-7"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5M12 15V3"],
  trash: ["M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"],
  shield: ["M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"],
  plus: ["M12 5v14M5 12h14"],
  lock: ["M5 11h14v10H5z", "M8 11V7a4 4 0 0 1 8 0v4"],
};

function Ico({ n }: { n: string }) {
  return (
    <svg className="hb-dad-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(icons[n] ?? []).map((d, i) => (
        <path key={i} d={d} />
      ))}
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
    <div className="hb-dad-app">
      <aside className="hb-dad-side">
        <div className="hb-dad-brand">
          <span className="hb-dad-mark" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18L10 6l4 8 2-4 4 8" />
            </svg>
          </span>
          <span>{brand}</span>
        </div>
        <nav aria-label="Main">
          <ul className="hb-dad-nav">
            {nav.map((item) => (
              <React.Fragment key={item.id}>
                {item.section ? (
                  <li className="hb-dad-nav-label" aria-hidden="true">
                    {item.section}
                  </li>
                ) : null}
                <li>
                  <button type="button" className="hb-dad-link" aria-current={active === item.id ? "page" : undefined} aria-label={item.label} onClick={() => setActive(item.id)}>
                    <Ico n={item.icon} />
                    <span className="hb-dad-link-t">{item.label}</span>
                    {item.count ? <span className="hb-dad-link-n">{item.count}</span> : null}
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </nav>
        {foot ? <div className="hb-dad-side-foot">{foot}</div> : null}
      </aside>
      <div className="hb-dad-main">
        <header className="hb-dad-top">
          <div className="hb-dad-crumb">
            {crumb[0]} / <strong>{crumb[1]}</strong>
          </div>
          <label className="hb-dad-search">
            <Ico n="search" />
            <input type="search" placeholder={placeholder} aria-label={placeholder} />
            <span className="hb-dad-kbd">/</span>
          </label>
          <button type="button" className="hb-dad-iconbtn" aria-label="Notifications">
            <Ico n="bell" />
            <span className="hb-dad-dot" />
          </button>
          <span className="hb-dad-av" style={{ background: tone(user), width: 34, height: 34 }} title={user}>
            {initials(user)}
          </span>
        </header>
        <div className="hb-dad-content">{children}</div>
      </div>
    </div>
  );
}

const ROLES: AdminRole[] = ["Admin", "Editor", "Viewer", "Billing"];
const STATUSES: AdminStatus[] = ["Active", "Pending", "Suspended"];
const ROLE_COLOR: Record<AdminRole, string> = { Admin: "#a78bfa", Editor: "#7fb3ff", Viewer: "#a1a1a1", Billing: "#fbbf24" };
const STATUS_COLOR: Record<AdminStatus, string> = { Active: "#4ade80", Pending: "#fbbf24", Suspended: "#f87171" };
const JOINED = ["Feb 2023", "Jun 2023", "Sep 2023", "Jan 2024", "Apr 2024", "Aug 2024", "Nov 2024", "Mar 2025"];
const ACTIVITY = ["Signed in from Chrome on macOS", "Updated billing contacts", "Exported the audit log", "Invited two teammates", "Changed a dashboard filter", "Rotated an API key"];
const WHEN = ["Today", "Yesterday", "3 days ago"];

type Row = [string, AdminRole, AdminStatus, number, string, string];

const ROWS: Row[] = [
  ["Amara Okafor", "Admin", "Active", 4, "Platform", "Lagos"],
  ["Ben Hartley", "Editor", "Active", 1500, "Design", "Leeds"],
  ["Chloe Tran", "Editor", "Active", 95, "Marketing", "Ho Chi Minh City"],
  ["Dario Silva", "Viewer", "Pending", -1, "Sales", "Lisbon"],
  ["Elin Berg", "Admin", "Active", 8, "Platform", "Stockholm"],
  ["Farah Nasser", "Billing", "Active", 1700, "Finance", "Dubai"],
  ["Gabe Moreau", "Viewer", "Suspended", 12000, "Support", "Montreal"],
  ["Hana Ito", "Editor", "Active", 40, "Design", "Osaka"],
  ["Idris Bello", "Viewer", "Active", 300, "Sales", "Accra"],
  ["Jules Martin", "Editor", "Pending", -1, "Marketing", "Lyon"],
  ["Kira Volkov", "Admin", "Active", 61, "Security", "Tallinn"],
  ["Liam O'Connor", "Viewer", "Active", 4300, "Support", "Dublin"],
  ["Mina Park", "Billing", "Active", 2900, "Finance", "Seoul"],
  ["Noah Fischer", "Editor", "Active", 15, "Platform", "Berlin"],
  ["Olu Adeyemi", "Viewer", "Suspended", 21000, "Sales", "Lagos"],
  ["Priya Raman", "Editor", "Active", 130, "Data", "Bengaluru"],
  ["Quinn Ellis", "Viewer", "Active", 700, "Support", "Austin"],
  ["Rosa Mendes", "Editor", "Pending", -1, "Design", "Sao Paulo"],
  ["Sven Larsen", "Admin", "Active", 2, "Platform", "Oslo"],
  ["Tala Haddad", "Viewer", "Active", 5100, "Marketing", "Amman"],
  ["Uma Patel", "Editor", "Active", 18, "Data", "Pune"],
  ["Victor Nguyen", "Viewer", "Active", 9800, "Sales", "Hanoi"],
  ["Wren Calloway", "Billing", "Active", 360, "Finance", "Denver"],
  ["Yusuf Demir", "Editor", "Suspended", 30000, "Support", "Istanbul"],
];

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z ]/g, "")
    .trim()
    .replace(/ +/g, "-");
}

const DEFAULT_USERS: AdminUser[] = ROWS.map(([name, role, status, lastActive, team, location], i) => ({
  id: slug(name),
  name,
  email: `${slug(name).replace("-", ".")}@northwind.io`,
  role,
  status,
  lastActive,
  team,
  location,
  joined: JOINED[i % JOINED.length],
  twoFactor: hash(i + 31) > 0.35,
}));

const NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid", section: "Admin" },
  { id: "users", label: "Users", icon: "users", count: "24" },
  { id: "roles", label: "Roles", icon: "shield" },
  { id: "billing", label: "Billing", icon: "card" },
  { id: "audit", label: "Audit log", icon: "file", section: "Security" },
  { id: "keys", label: "API keys", icon: "lock" },
  { id: "settings", label: "Settings", icon: "sliders" },
];

type SortKey = "name" | "role" | "status" | "lastActive";

function ago(m: number) {
  if (m < 0) return "Never";
  if (m < 5) return "Just now";
  if (m < 60) return `${m} min ago`;
  if (m < 1440) return `${Math.round(m / 60)} h ago`;
  if (m < 2880) return "Yesterday";
  return `${Math.round(m / 1440)} d ago`;
}

function sortValue(u: AdminUser, key: SortKey) {
  if (key === "lastActive") return u.lastActive < 0 ? 1e9 : u.lastActive;
  return u[key];
}

export function AdminDashboard({
  accent = "#2f7bff",
  brand = "Control",
  user = "Amara Okafor",
  workspace = "Northwind",
  users: usersProp,
  pageSize = 8,
  defaultSelected = [],
  onSelectionChange,
  onKeyDown,
  className = "",
  style,
  ...rest
}: AdminDashboardProps) {
  const [users, setUsers] = React.useState<AdminUser[]>(usersProp ?? DEFAULT_USERS);
  const [query, setQuery] = React.useState("");
  const [role, setRole] = React.useState<AdminRole | "All">("All");
  const [status, setStatus] = React.useState<AdminStatus | "All">("All");
  const [sort, setSort] = React.useState<{ key: SortKey; dir: 1 | -1 }>({ key: "lastActive", dir: 1 });
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState<string[]>(defaultSelected);
  const [openId, setOpenId] = React.useState<string | null>(null);
  const trigger = React.useRef<HTMLElement | null>(null);
  const closeBtn = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (openId) closeBtn.current?.focus();
  }, [openId]);

  const q = query.trim().toLowerCase();
  const filtered = users
    .filter((u) => (role === "All" || u.role === role) && (status === "All" || u.status === status) && (!q || u.name.toLowerCase().includes(q) || u.email.includes(q)))
    .sort((a, b) => {
      const x = sortValue(a, sort.key);
      const y = sortValue(b, sort.key);
      const cmp = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return cmp * sort.dir || a.name.localeCompare(b.name);
    });

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageIdx = Math.min(page, pageCount - 1);
  const rows = filtered.slice(pageIdx * pageSize, pageIdx * pageSize + pageSize);
  const allOnPage = rows.length > 0 && rows.every((u) => selected.includes(u.id));
  const someOnPage = rows.some((u) => selected.includes(u.id));
  const counts = (s: AdminStatus | "All") => (s === "All" ? users.length : users.filter((u) => u.status === s).length);
  const open = users.find((u) => u.id === openId) ?? null;

  const commit = (next: string[]) => {
    setSelected(next);
    onSelectionChange?.(next);
  };

  const toggleRow = (id: string) => commit(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);

  const toggleAll = () => {
    const ids = rows.map((u) => u.id);
    commit(allOnPage ? selected.filter((x) => !ids.includes(x)) : [...selected, ...ids.filter((x) => !selected.includes(x))]);
  };

  const toggleSort = (key: SortKey) => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }));

  const patch = (ids: string[], change: Partial<AdminUser>) => setUsers((list) => list.map((u) => (ids.includes(u.id) ? { ...u, ...change } : u)));

  const remove = (ids: string[]) => {
    setUsers((list) => list.filter((u) => !ids.includes(u.id)));
    commit(selected.filter((x) => !ids.includes(x)));
    if (openId && ids.includes(openId)) setOpenId(null);
  };

  const openUser = (id: string, el: HTMLElement | null) => {
    trigger.current = el;
    setOpenId(id);
  };

  const close = () => {
    setOpenId(null);
    trigger.current?.focus();
  };

  const th = (key: SortKey, label: string, cls?: string) => (
    <th className={cls} aria-sort={sort.key === key ? (sort.dir === 1 ? "ascending" : "descending") : undefined}>
      <button type="button" className="hb-dad-th-b" onClick={() => toggleSort(key)}>
        {label}
        <Ico n={sort.key === key && sort.dir === -1 ? "down" : "up"} />
      </button>
    </th>
  );

  const vars = { "--a": accent, ...style } as React.CSSProperties;
  const activity = open
    ? open.status === "Pending"
      ? [["Invitation sent", "Waiting"]]
      : [0, 1, 2].map((k) => [ACTIVITY[Math.floor(hash(users.indexOf(open) * 7 + k) * ACTIVITY.length)], WHEN[k]])
    : [];

  return (
    <div
      className={`hb-dad ${className}`}
      style={vars}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Escape" && openId) close();
      }}
      {...rest}
    >
      <style href="hb-admin-dashboard" precedence="default">
        {css}
      </style>
      <Shell
        brand={brand}
        nav={NAV}
        defaultActive="users"
        crumb={[workspace, "Users"]}
        placeholder="Search anything"
        user={user}
        foot={
          <div className="hb-dad-plan">
            <strong>Team plan</strong>
            <span>
              {users.length} of 50 seats used
            </span>
            <div className="hb-dad-plan-b">
              <i style={{ "--w": `${Math.min((users.length / 50) * 100, 100).toFixed(0)}%` } as React.CSSProperties} />
            </div>
          </div>
        }
      >
        <div className="hb-dad-head">
          <div>
            <h2 className="hb-dad-title">Users</h2>
            <p className="hb-dad-sub">
              {users.length} members in the {workspace} workspace
            </p>
          </div>
          <div className="hb-dad-tools">
            <button type="button" className="hb-dad-btn">
              <Ico n="download" />
              Export
            </button>
            <button type="button" className="hb-dad-btn" data-p="true">
              <Ico n="plus" />
              Invite user
            </button>
          </div>
        </div>

        <div className="hb-dad-card hb-dad-ucard" style={{ "--d": 0 } as React.CSSProperties}>
          <div className="hb-dad-bar-t">
            <label className="hb-dad-find">
              <Ico n="search" />
              <input
                type="search"
                placeholder="Search by name or email"
                aria-label="Search users"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(0);
                }}
              />
            </label>
            <label className="hb-dad-sel">
              <select
                aria-label="Filter by role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value as AdminRole | "All");
                  setPage(0);
                }}
              >
                <option value="All">All roles</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <Ico n="chevd" />
            </label>
            <div className="hb-dad-fchips" role="group" aria-label="Filter by status">
              {(["All", ...STATUSES] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  className="hb-dad-fchip"
                  aria-pressed={status === s}
                  onClick={() => {
                    setStatus(s);
                    setPage(0);
                  }}
                >
                  {s}
                  <span>{counts(s)}</span>
                </button>
              ))}
            </div>
          </div>

          {selected.length > 0 ? (
            <div className="hb-dad-bulk" role="region" aria-label="Bulk actions">
              <strong>{selected.length} selected</strong>
              <label className="hb-dad-sel">
                <select
                  aria-label="Set role for selected users"
                  value=""
                  onChange={(e) => {
                    if (e.target.value) patch(selected, { role: e.target.value as AdminRole });
                  }}
                >
                  <option value="">Set role</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <Ico n="chevd" />
              </label>
              <button type="button" className="hb-dad-btn" onClick={() => patch(selected, { status: "Suspended" })}>
                <Ico n="lock" />
                Suspend
              </button>
              <button type="button" className="hb-dad-btn" data-d="true" onClick={() => remove(selected)}>
                <Ico n="trash" />
                Delete
              </button>
              <button type="button" className="hb-dad-btn" onClick={() => commit([])}>
                Clear
              </button>
            </div>
          ) : null}

          {rows.length > 0 ? (
            <div className="hb-dad-tw">
              <table className="hb-dad-ut">
                <thead>
                  <tr>
                    <th className="hb-dad-ck">
                      <input
                        type="checkbox"
                        aria-label="Select all users on this page"
                        checked={allOnPage}
                        ref={(el) => {
                          if (el) el.indeterminate = someOnPage && !allOnPage;
                        }}
                        onChange={toggleAll}
                      />
                    </th>
                    {th("name", "User")}
                    {th("role", "Role", "hb-dad-hide")}
                    {th("status", "Status")}
                    {th("lastActive", "Last active", "hb-dad-hide")}
                    <th aria-label="Actions" style={{ width: 52 }} />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((u) => (
                    <tr key={u.id} data-sel={selected.includes(u.id)} data-open={openId === u.id} onClick={() => openUser(u.id, null)}>
                      <td className="hb-dad-ck" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" aria-label={`Select ${u.name}`} checked={selected.includes(u.id)} onChange={() => toggleRow(u.id)} />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="hb-dad-ucell"
                          onClick={(e) => {
                            e.stopPropagation();
                            openUser(u.id, e.currentTarget);
                          }}
                        >
                          <span className="hb-dad-av" style={{ background: tone(u.name) }}>
                            {initials(u.name)}
                          </span>
                          <div>
                            <strong>{u.name}</strong>
                            <span>{u.email}</span>
                          </div>
                        </button>
                      </td>
                      <td className="hb-dad-hide">
                        <span className="hb-dad-role" style={{ "--c": ROLE_COLOR[u.role] } as React.CSSProperties}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <span className="hb-dad-st" style={{ "--c": STATUS_COLOR[u.status] } as React.CSSProperties}>
                          <i />
                          {u.status}
                        </span>
                      </td>
                      <td className="hb-dad-hide hb-dad-la">{ago(u.lastActive)}</td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="hb-dad-rowbtn" aria-label={`More actions for ${u.name}`} onClick={() => openUser(u.id, null)}>
                          <Ico n="more" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="hb-dad-empty">
              <strong>No users match</strong>
              Try a different name or clear the filters.
            </div>
          )}

          <div className="hb-dad-pager">
            <span>
              {filtered.length === 0 ? "No results" : `Showing ${pageIdx * pageSize + 1}–${pageIdx * pageSize + rows.length} of ${filtered.length}`}
            </span>
            <div className="hb-dad-pgs" role="navigation" aria-label="Pagination">
              <button type="button" className="hb-dad-pg" aria-label="Previous page" disabled={pageIdx === 0} onClick={() => setPage(pageIdx - 1)}>
                <Ico n="chevl" />
              </button>
              {Array.from({ length: pageCount }, (_, i) => (
                <button key={i} type="button" className="hb-dad-pg" aria-current={i === pageIdx ? "page" : undefined} onClick={() => setPage(i)}>
                  {i + 1}
                </button>
              ))}
              <button type="button" className="hb-dad-pg" aria-label="Next page" disabled={pageIdx >= pageCount - 1} onClick={() => setPage(pageIdx + 1)}>
                <Ico n="chevr" />
              </button>
            </div>
          </div>
        </div>
      </Shell>

      <div className="hb-dad-scrim" data-open={open !== null} onClick={close} aria-hidden="true" />
      <aside className="hb-dad-panel" data-open={open !== null} role="dialog" aria-label="User details" inert={open === null}>
        {open ? (
          <>
            <div className="hb-dad-pn-h">
              <h3>User details</h3>
              <button ref={closeBtn} type="button" className="hb-dad-iconbtn" aria-label="Close details" onClick={close}>
                <Ico n="x" />
              </button>
            </div>
            <div className="hb-dad-pn-id">
              <span className="hb-dad-av" style={{ background: tone(open.name) }}>
                {initials(open.name)}
              </span>
              <strong>{open.name}</strong>
              <p>{open.email}</p>
              <div className="hb-dad-pn-tags">
                <span className="hb-dad-role" style={{ "--c": ROLE_COLOR[open.role] } as React.CSSProperties}>
                  {open.role}
                </span>
                <span className="hb-dad-st" style={{ "--c": STATUS_COLOR[open.status] } as React.CSSProperties}>
                  <i />
                  {open.status}
                </span>
              </div>
            </div>
            <div className="hb-dad-pn-act">
              <button type="button" className="hb-dad-btn">
                <Ico n="mail" />
                Message
              </button>
              <button
                type="button"
                className="hb-dad-btn"
                onClick={() => patch([open.id], { status: open.status === "Suspended" ? "Active" : "Suspended" })}
              >
                <Ico n="lock" />
                {open.status === "Suspended" ? "Reactivate" : "Suspend"}
              </button>
            </div>
            <div>
              <p className="hb-dad-pn-s">Profile</p>
              <dl className="hb-dad-kv">
                <dt>Role</dt>
                <dd>
                  <label className="hb-dad-sel">
                    <select aria-label="Role" value={open.role} onChange={(e) => patch([open.id], { role: e.target.value as AdminRole })}>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <Ico n="chevd" />
                  </label>
                </dd>
                <dt>Team</dt>
                <dd>{open.team}</dd>
                <dt>Location</dt>
                <dd>{open.location}</dd>
                <dt>Joined</dt>
                <dd>{open.joined}</dd>
                <dt>Last active</dt>
                <dd>{ago(open.lastActive)}</dd>
                <dt>Two-factor</dt>
                <dd>
                  <span className="hb-dad-pill" data-t={open.twoFactor ? "up" : "down"}>
                    {open.twoFactor ? "Enabled" : "Off"}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <p className="hb-dad-pn-s">Recent activity</p>
              <ul className="hb-dad-act">
                {activity.map(([text, when], i) => (
                  <li key={i}>
                    <i />
                    {text}
                    <span>{when}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hb-dad-pn-f">
              <button type="button" className="hb-dad-btn" data-d="true" onClick={() => remove([open.id])}>
                <Ico n="trash" />
                Remove user
              </button>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}
