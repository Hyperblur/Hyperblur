"use client";

import * as React from "react";

export type OrderPayment = "Paid" | "Pending" | "Refunded" | "Failed";
export type OrderFulfillment = "Unfulfilled" | "Shipped" | "Delivered" | "Returned";
export type OrdersTab = "all" | "unfulfilled" | "shipped" | "returns";

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  city: string;
  items: OrderItem[];
  payment: OrderPayment;
  fulfillment: OrderFulfillment;
  day: number;
  time: number;
}

export interface OrdersDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  brand?: string;
  store?: string;
  user?: string;
  orders?: Order[];
  tab?: OrdersTab;
  defaultTab?: OrdersTab;
  onTabChange?: (tab: OrdersTab) => void;
  onOrderSelect?: (order: Order) => void;
}

const css = `
.hb-dor {
  --a: #2f7bff;
  container: hb-dor / inline-size;
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
.hb-dor *, .hb-dor *::before, .hb-dor *::after { box-sizing: border-box; }
.hb-dor button, .hb-dor input, .hb-dor select { font: inherit; color: inherit; }
.hb-dor button:focus-visible, .hb-dor input:focus-visible, .hb-dor select:focus-visible, .hb-dor [tabindex]:focus-visible {
  outline: 2px solid var(--a);
  outline-offset: 2px;
}
.hb-dor-app { display: grid; grid-template-columns: 220px minmax(0, 1fr); min-height: 640px; }
.hb-dor-side {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: 20px 12px 16px;
  border-right: 1px solid #1f1f1f;
  background: #0d0d0d;
}
.hb-dor-brand { display: flex; align-items: center; gap: 10px; padding: 0 8px; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-dor-mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--a), color-mix(in srgb, var(--a) 45%, #ffffff));
  color: #ffffff;
}
.hb-dor-nav { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-dor-nav-label { padding: 12px 8px 6px; color: #6b6b6b; font-size: 11px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
.hb-dor-link {
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
.hb-dor-link:hover { background: #161616; color: #ededed; }
.hb-dor-link[aria-current="page"] { background: #1b1b1b; color: #ffffff; }
.hb-dor-link[aria-current="page"] .hb-dor-ico { color: var(--a); }
.hb-dor-link-n {
  margin-left: auto;
  padding: 1px 7px;
  border-radius: 999px;
  background: #1f1f1f;
  color: #a1a1a1;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.hb-dor-side-foot { margin-top: auto; }
.hb-dor-main { display: flex; flex-direction: column; min-width: 0; }
.hb-dor-top { display: flex; align-items: center; gap: 12px; height: 60px; padding: 0 24px; border-bottom: 1px solid #1f1f1f; }
.hb-dor-crumb { min-width: 0; overflow: hidden; color: #8f8f8f; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.hb-dor-crumb strong { color: #ededed; font-weight: 500; }
.hb-dor-search { position: relative; width: 260px; margin-left: auto; color: #6b6b6b; }
.hb-dor-search .hb-dor-ico { position: absolute; top: 50%; left: 10px; width: 15px; height: 15px; transform: translateY(-50%); pointer-events: none; }
.hb-dor-search input {
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
.hb-dor-search input::placeholder { color: #6b6b6b; }
.hb-dor-search input:hover { border-color: #333333; }
.hb-dor-search input:focus-visible { border-color: var(--a); outline-offset: 0; }
.hb-dor-kbd {
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
.hb-dor-iconbtn {
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
.hb-dor-iconbtn:hover { border-color: #333333; background: #171717; color: #ededed; }
.hb-dor-dot { position: absolute; top: 8px; right: 9px; width: 7px; height: 7px; border: 2px solid #111111; border-radius: 50%; background: var(--a); box-sizing: content-box; margin: -2px; }
.hb-dor-av {
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
.hb-dor-content { display: flex; flex-direction: column; gap: 20px; min-width: 0; padding: 24px; }
.hb-dor-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; }
.hb-dor-title { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -.02em; line-height: 1.2; }
.hb-dor-sub { margin: 4px 0 0; color: #8f8f8f; font-size: 13px; }
.hb-dor-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.hb-dor-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid #232323;
  border-radius: 12px;
  background: #111111;
  animation: hb-dor-rise .55s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: calc(var(--d, 0) * 60ms);
}
.hb-dor-card-h { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.hb-dor-card-t { margin: 0; font-size: 13px; font-weight: 600; letter-spacing: -.005em; }
.hb-dor-card-s { margin: 2px 0 0; color: #8f8f8f; font-size: 12px; }
.hb-dor-seg { display: inline-flex; padding: 2px; border: 1px solid #262626; border-radius: 8px; background: #0d0d0d; }
.hb-dor-seg button {
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
.hb-dor-seg button:hover { color: #ededed; }
.hb-dor-seg button[aria-pressed="true"] { background: #232323; color: #ffffff; }
.hb-dor-btn {
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
.hb-dor-btn:hover { border-color: #3a3a3a; background: #1c1c1c; }
.hb-dor-btn:active { transform: translateY(1px); }
.hb-dor-btn[data-p="true"] { border-color: var(--a); background: var(--a); color: #ffffff; }
.hb-dor-btn[data-p="true"]:hover { background: color-mix(in srgb, var(--a) 85%, #ffffff); }
.hb-dor-btn .hb-dor-ico { width: 14px; height: 14px; }
.hb-dor-ico { display: block; flex: none; width: 16px; height: 16px; }
.hb-dor-pill {
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
.hb-dor-pill .hb-dor-ico { width: 11px; height: 11px; stroke-width: 2.4; }
.hb-dor-pill[data-t="up"] { background: rgba(74, 222, 128, .12); color: #4ade80; }
.hb-dor-pill[data-t="down"] { background: rgba(248, 113, 113, .12); color: #f87171; }
.hb-dor-pill[data-t="flat"] { background: #1f1f1f; color: #a1a1a1; }
.hb-dor-spark { display: block; width: 100%; height: 36px; color: var(--a); animation: hb-dor-wipe .9s .15s cubic-bezier(.3, .7, .2, 1) both; }
.hb-dor-spark-l { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.hb-dor-tt {
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
.hb-dor-tt b { font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-dor-tt-d { color: #8f8f8f; font-size: 11px; }
@keyframes hb-dor-rise { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-dor-wipe { from { clip-path: inset(-6px 100% -6px -6px); } to { clip-path: inset(-6px -6px -6px -6px); } }
@keyframes hb-dor-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-dor-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-dor-pulse { 0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, .55); } 100% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); } }
@keyframes hb-dor-arc { from { stroke-dasharray: 0 100; } }
@container hb-dor (max-width: 759px) {
  .hb-dor-app { grid-template-columns: minmax(0, 1fr); min-height: 0; }
  .hb-dor-side { flex-direction: row; align-items: center; gap: 8px; padding: 10px 12px; border-right: 0; border-bottom: 1px solid #1f1f1f; overflow-x: auto; }
  .hb-dor-brand { padding: 0; }
  .hb-dor-brand span:last-child, .hb-dor-nav-label, .hb-dor-link-t, .hb-dor-link-n, .hb-dor-side-foot, .hb-dor-kbd { display: none; }
  .hb-dor-nav { flex-direction: row; flex: 1; gap: 4px; }
  .hb-dor-link { justify-content: center; width: 36px; padding: 0; }
  .hb-dor-top { gap: 8px; padding: 0 16px; }
  .hb-dor-crumb { display: none; }
  .hb-dor-search { flex: 1; width: auto; margin-left: 0; }
  .hb-dor-content { gap: 16px; padding: 16px; }
  .hb-dor-title { font-size: 19px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-dor *, .hb-dor *::before, .hb-dor *::after { animation: none !important; transition: none !important; }
}
.hb-dor-store { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid #232323; border-radius: 10px; background: #111111; }
.hb-dor-store i { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: hb-dor-pulse 1.8s ease-out infinite; }
.hb-dor-store strong { display: block; font-size: 12.5px; font-weight: 500; }
.hb-dor-store span { color: #8f8f8f; font-size: 11.5px; }
.hb-dor-tiles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.hb-dor-tile { display: flex; flex-direction: column; gap: 8px; padding-bottom: 8px; overflow: hidden; }
.hb-dor-tile-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: #8f8f8f; font-size: 12px; }
.hb-dor-tile-l { display: flex; align-items: center; gap: 8px; }
.hb-dor-tile-i { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 7px; background: color-mix(in srgb, var(--k) 16%, transparent); color: var(--k); }
.hb-dor-tile-i .hb-dor-ico { width: 14px; height: 14px; }
.hb-dor-tile-row { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; }
.hb-dor-tile-v { margin: 0; font-size: 26px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.03em; line-height: 1.1; }
.hb-dor-tile .hb-dor-spark { width: calc(100% + 16px); margin: 4px -8px -8px; color: var(--k); }
.hb-dor-lay { display: grid; grid-template-columns: minmax(0, 1fr) 272px; gap: 12px; align-items: start; }
.hb-dor-tcard { padding: 0; overflow: hidden; }
.hb-dor-tabs { display: flex; gap: 4px; padding: 0 12px; border-bottom: 1px solid #1d1d1d; overflow-x: auto; }
.hb-dor-tab {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 12px;
  border: 0;
  background: none;
  color: #8f8f8f;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: color .15s ease;
}
.hb-dor-tab::after { content: ""; position: absolute; right: 12px; bottom: -1px; left: 12px; height: 2px; border-radius: 2px 2px 0 0; background: var(--a); transform: scaleX(0); transition: transform .28s cubic-bezier(.3, .8, .3, 1); }
.hb-dor-tab:hover { color: #ededed; }
.hb-dor-tab[aria-selected="true"] { color: #ffffff; }
.hb-dor-tab[aria-selected="true"]::after { transform: scaleX(1); }
.hb-dor-tab span { padding: 1px 7px; border-radius: 999px; background: #1b1b1b; color: #a1a1a1; font-size: 11px; font-variant-numeric: tabular-nums; }
.hb-dor-tab[aria-selected="true"] span { background: color-mix(in srgb, var(--a) 18%, transparent); color: color-mix(in srgb, var(--a) 55%, #ffffff); }
.hb-dor-tw { overflow-x: auto; }
.hb-dor-ot { width: 100%; min-width: 520px; table-layout: fixed; border-collapse: collapse; }
.hb-dor-ot th {
  height: 38px;
  padding: 0 6px;
  border-bottom: 1px solid #1d1d1d;
  background: #0e0e0e;
  color: #8f8f8f;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .04em;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
}
.hb-dor-ot th:first-child, .hb-dor-ot td:first-child { padding-left: 12px; }
.hb-dor-ot th:last-child, .hb-dor-ot td:last-child { padding-right: 12px; }
.hb-dor-ot td { padding: 11px 6px; border-bottom: 1px solid #181818; overflow: hidden; font-size: 12.5px; font-variant-numeric: tabular-nums; text-overflow: ellipsis; white-space: nowrap; vertical-align: middle; }
.hb-dor-ot tbody tr { cursor: pointer; transition: background .15s ease; }
.hb-dor-ot tbody tr:hover td { background: #151515; }
.hb-dor-ot tbody tr[aria-current="true"] td { background: color-mix(in srgb, var(--a) 10%, transparent); }
.hb-dor-ot tbody tr[aria-current="true"] td:first-child { box-shadow: inset 2px 0 0 var(--a); }
.hb-dor-ot tbody tr:focus-visible { outline: none; }
.hb-dor-ot tbody tr:focus-visible td:first-child { box-shadow: inset 2px 0 0 #ffffff; }
.hb-dor-oid { color: #ededed; font-weight: 500; }
.hb-dor-ocust { display: block; overflow: hidden; font-weight: 500; text-overflow: ellipsis; }
.hb-dor-dim { color: #8f8f8f; }
.hb-dor-tag { display: inline-flex; align-items: center; gap: 6px; padding: 2px 8px; border: 1px solid color-mix(in srgb, var(--c) 26%, transparent); border-radius: 999px; background: color-mix(in srgb, var(--c) 12%, transparent); color: var(--c); font-size: 11px; font-weight: 500; line-height: 1.5; }
.hb-dor-tag i { width: 5px; height: 5px; border-radius: 50%; background: var(--c); }
.hb-dor-empty { padding: 56px 16px; color: #8f8f8f; text-align: center; }
.hb-dor-empty strong { display: block; margin-bottom: 4px; color: #ededed; font-size: 14px; font-weight: 500; }
.hb-dor-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; color: #8f8f8f; font-size: 12.5px; }
.hb-dor-pn { display: flex; flex-direction: column; gap: 18px; }
.hb-dor-pn-h { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.hb-dor-pn-h h3 { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: -.01em; }
.hb-dor-pn-h div span { display: block; margin-top: 2px; color: #8f8f8f; font-size: 12px; }
.hb-dor-pn-c { display: flex; align-items: center; gap: 10px; padding: 10px; border: 1px solid #1f1f1f; border-radius: 10px; background: #0e0e0e; }
.hb-dor-pn-c .hb-dor-av { width: 34px; height: 34px; }
.hb-dor-pn-c strong { display: block; font-size: 13px; font-weight: 500; }
.hb-dor-pn-c div span { display: block; overflow: hidden; color: #8f8f8f; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-dor-pn-c div { min-width: 0; }
.hb-dor-pn-s { margin: 0 0 10px; color: #6b6b6b; font-size: 11px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
.hb-dor-li { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; list-style: none; font-size: 12.5px; }
.hb-dor-li li { display: flex; justify-content: space-between; gap: 12px; }
.hb-dor-li li span:last-child { color: #a1a1a1; font-variant-numeric: tabular-nums; }
.hb-dor-li li[data-sum="true"] { margin-top: 4px; padding-top: 10px; border-top: 1px solid #1f1f1f; color: #ededed; font-weight: 600; }
.hb-dor-li li[data-sum="true"] span:last-child { color: #ededed; }
.hb-dor-tl { margin: 0; padding: 0; list-style: none; }
.hb-dor-tl li { position: relative; display: grid; grid-template-columns: 20px minmax(0, 1fr); gap: 12px; padding-bottom: 16px; }
.hb-dor-tl li:last-child { padding-bottom: 0; }
.hb-dor-tl li::before { content: ""; position: absolute; top: 22px; bottom: 2px; left: 9px; width: 2px; background: #232323; }
.hb-dor-tl li:last-child::before { display: none; }
.hb-dor-tl li[data-s="done"]::before { background: color-mix(in srgb, var(--a) 65%, #232323); }
.hb-dor-tl-d { display: grid; place-items: center; width: 20px; height: 20px; border: 2px solid #2a2a2a; border-radius: 50%; background: #0f0f0f; color: transparent; }
.hb-dor-tl-d .hb-dor-ico { width: 11px; height: 11px; stroke-width: 3.2; }
.hb-dor-tl li[data-s="done"] .hb-dor-tl-d { border-color: var(--a); background: var(--a); color: #ffffff; }
.hb-dor-tl li[data-s="current"] .hb-dor-tl-d { border-color: var(--a); animation: hb-dor-ring 1.8s ease-out infinite; }
.hb-dor-tl li[data-s="current"] .hb-dor-tl-d::after { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--a); }
.hb-dor-tl li[data-s="fail"] .hb-dor-tl-d { border-color: #f87171; background: #f87171; color: #0a0a0a; }
.hb-dor-tl strong { display: block; font-size: 12.5px; font-weight: 500; line-height: 1.4; }
.hb-dor-tl li[data-s="todo"] strong { color: #6b6b6b; }
.hb-dor-tl div span { display: block; color: #8f8f8f; font-size: 12px; line-height: 1.45; }
.hb-dor-pn-a { display: flex; gap: 8px; }
.hb-dor-pn-a .hb-dor-btn { flex: 1; }
@keyframes hb-dor-ring { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--a) 55%, transparent); } 100% { box-shadow: 0 0 0 8px transparent; } }
@container hb-dor (max-width: 999px) {
  .hb-dor-lay { grid-template-columns: minmax(0, 1fr); }
}
@container hb-dor (max-width: 959px) {
  .hb-dor-tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container hb-dor (max-width: 419px) {
  .hb-dor-tiles { grid-template-columns: minmax(0, 1fr); }
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
  bars: ["M18 20V10M12 20V4M6 20v-6"],
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"],
  sliders: ["M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.7 21a2 2 0 0 1-3.4 0"],
  search: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.3-4.3"],
  cart: ["M6 6h15l-2 9H8z", "M6 6L5 3H2", "M9 20a1 1 0 1 0 0 .01", "M18 20a1 1 0 1 0 0 .01"],
  box: ["M21 8l-9-5-9 5v8l9 5 9-5z", "M3 8l9 5 9-5M12 13v9"],
  check: ["M5 12.5l4.5 4.5L19 7.5"],
  up: ["M12 19V5M5 12l7-7 7 7"],
  down: ["M12 5v14M19 12l-7 7-7-7"],
  x: ["M18 6L6 18M6 6l12 12"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5M12 15V3"],
  clock: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M12 7v5l3 2"],
  truck: ["M1 4h13v12H1zM14 8h4l3 3v5h-7z", "M5.5 18.5a1.5 1.5 0 1 0 0 .01", "M17.5 18.5a1.5 1.5 0 1 0 0 .01"],
  refund: ["M3 12a9 9 0 1 0 3-6.7L3 8", "M3 3v5h5"],
  plus: ["M12 5v14M5 12h14"],
  tag: ["M20 12l-8 8-9-9V3h8z", "M7.5 7.5h.01"],
  receipt: ["M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z", "M9 8h6M9 12h6"],
};

function Ico({ n }: { n: string }) {
  return (
    <svg className="hb-dor-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(icons[n] ?? []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function Spark({ values, id }: { values: number[]; id: string }) {
  const line = smooth(project(values, 100, 32, 3));
  return (
    <svg className="hb-dor-spark" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".26" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line}L100 32L0 32Z`} fill={`url(#${id})`} />
      <path className="hb-dor-spark-l" d={line} />
    </svg>
  );
}

function Delta({ value, good = true, suffix = "%" }: { value: number; good?: boolean; suffix?: string }) {
  const up = value >= 0;
  const t = value === 0 ? "flat" : up === good ? "up" : "down";
  return (
    <span className="hb-dor-pill" data-t={t}>
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
    <div className="hb-dor-app">
      <aside className="hb-dor-side">
        <div className="hb-dor-brand">
          <span className="hb-dor-mark" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18L10 6l4 8 2-4 4 8" />
            </svg>
          </span>
          <span>{brand}</span>
        </div>
        <nav aria-label="Main">
          <ul className="hb-dor-nav">
            {nav.map((item) => (
              <React.Fragment key={item.id}>
                {item.section ? (
                  <li className="hb-dor-nav-label" aria-hidden="true">
                    {item.section}
                  </li>
                ) : null}
                <li>
                  <button type="button" className="hb-dor-link" aria-current={active === item.id ? "page" : undefined} aria-label={item.label} onClick={() => setActive(item.id)}>
                    <Ico n={item.icon} />
                    <span className="hb-dor-link-t">{item.label}</span>
                    {item.count ? <span className="hb-dor-link-n">{item.count}</span> : null}
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </nav>
        {foot ? <div className="hb-dor-side-foot">{foot}</div> : null}
      </aside>
      <div className="hb-dor-main">
        <header className="hb-dor-top">
          <div className="hb-dor-crumb">
            {crumb[0]} / <strong>{crumb[1]}</strong>
          </div>
          <label className="hb-dor-search">
            <Ico n="search" />
            <input type="search" placeholder={placeholder} aria-label={placeholder} />
            <span className="hb-dor-kbd">/</span>
          </label>
          <button type="button" className="hb-dor-iconbtn" aria-label="Notifications">
            <Ico n="bell" />
            <span className="hb-dor-dot" />
          </button>
          <span className="hb-dor-av" style={{ background: tone(user), width: 34, height: 34 }} title={user}>
            {initials(user)}
          </span>
        </header>
        <div className="hb-dor-content">{children}</div>
      </div>
    </div>
  );
}

const TABS: { id: OrdersTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unfulfilled", label: "Unfulfilled" },
  { id: "shipped", label: "Shipped" },
  { id: "returns", label: "Returns" },
];

const PAYMENT_COLOR: Record<OrderPayment, string> = { Paid: "#4ade80", Pending: "#fbbf24", Refunded: "#7fb3ff", Failed: "#f87171" };
const FULFILL_COLOR: Record<OrderFulfillment, string> = { Unfulfilled: "#fbbf24", Shipped: "#7fb3ff", Delivered: "#4ade80", Returned: "#a78bfa" };

const SHOP = {
  fern: { name: "Boston fern", price: 34 },
  pot: { name: "Clay pot, 6 in", price: 18 },
  pole: { name: "Moss pole", price: 12 },
  shears: { name: "Pruning shears", price: 26 },
  can: { name: "Copper watering can", price: 38 },
  saucer: { name: "Saucer set", price: 14 },
  lily: { name: "Peace lily", price: 29 },
  mister: { name: "Plant mister", price: 16 },
  soil: { name: "Potting mix, 10 L", price: 21 },
  snake: { name: "Snake plant", price: 31 },
};

type ShopKey = keyof typeof SHOP;

function line(key: ShopKey, qty = 1): OrderItem {
  return { name: SHOP[key].name, qty, price: SHOP[key].price };
}

const DEFAULT_ORDERS: Order[] = [
  { id: "10482", customer: "Maya Johnson", email: "maya.johnson@mail.example", city: "Portland, OR", items: [line("fern"), line("pot")], payment: "Paid", fulfillment: "Unfulfilled", day: 32, time: 582 },
  { id: "10481", customer: "Tomas Reyes", email: "tomas.reyes@mail.example", city: "Austin, TX", items: [line("snake", 2), line("soil")], payment: "Paid", fulfillment: "Unfulfilled", day: 31, time: 1275 },
  { id: "10480", customer: "Aisha Rahman", email: "aisha.rahman@mail.example", city: "Toronto, ON", items: [line("can")], payment: "Pending", fulfillment: "Unfulfilled", day: 31, time: 1083 },
  { id: "10479", customer: "Lars Eriksson", email: "lars.eriksson@mail.example", city: "Seattle, WA", items: [line("lily"), line("mister"), line("saucer", 2)], payment: "Paid", fulfillment: "Shipped", day: 30, time: 687 },
  { id: "10478", customer: "Hannah Cho", email: "hannah.cho@mail.example", city: "Denver, CO", items: [line("shears"), line("pole", 3)], payment: "Paid", fulfillment: "Shipped", day: 30, time: 530 },
  { id: "10477", customer: "Diego Alvarez", email: "diego.alvarez@mail.example", city: "Miami, FL", items: [line("fern", 2)], payment: "Paid", fulfillment: "Delivered", day: 28, time: 980 },
  { id: "10476", customer: "Priya Menon", email: "priya.menon@mail.example", city: "Chicago, IL", items: [line("pot", 3), line("soil", 2)], payment: "Refunded", fulfillment: "Returned", day: 27, time: 791 },
  { id: "10475", customer: "Oliver Grant", email: "oliver.grant@mail.example", city: "Boston, MA", items: [line("snake")], payment: "Paid", fulfillment: "Delivered", day: 27, time: 605 },
  { id: "10474", customer: "Sofia Marino", email: "sofia.marino@mail.example", city: "Phoenix, AZ", items: [line("pole", 2), line("mister")], payment: "Failed", fulfillment: "Unfulfilled", day: 26, time: 1184 },
  { id: "10473", customer: "Kenji Watanabe", email: "kenji.watanabe@mail.example", city: "San Diego, CA", items: [line("lily", 2), line("pot", 2)], payment: "Paid", fulfillment: "Delivered", day: 25, time: 750 },
  { id: "10472", customer: "Grace Lindqvist", email: "grace.lindqvist@mail.example", city: "Minneapolis, MN", items: [line("can"), line("shears")], payment: "Refunded", fulfillment: "Returned", day: 24, time: 952 },
  { id: "10471", customer: "Marcus Bell", email: "marcus.bell@mail.example", city: "Atlanta, GA", items: [line("fern"), line("saucer")], payment: "Paid", fulfillment: "Delivered", day: 24, time: 558 },
];

const NAV: NavItem[] = [
  { id: "orders", label: "Orders", icon: "box", count: "38", section: "Store" },
  { id: "products", label: "Products", icon: "tag" },
  { id: "customers", label: "Customers", icon: "users" },
  { id: "shipping", label: "Shipping", icon: "truck" },
  { id: "discounts", label: "Discounts", icon: "receipt", section: "Marketing" },
  { id: "analytics", label: "Analytics", icon: "bars" },
  { id: "settings", label: "Settings", icon: "sliders" },
];

const TILES = [
  { label: "New orders", icon: "cart", color: "var(--a)", delta: 12.4, good: true },
  { label: "Pending", icon: "clock", color: "#fbbf24", delta: -6.1, good: false },
  { label: "Shipped", icon: "truck", color: "#34d399", delta: 8.7, good: true },
  { label: "Refunds", icon: "refund", color: "#f87171", delta: 14.2, good: false },
];

interface Step {
  title: string;
  detail?: string;
  time?: string;
  state: "done" | "current" | "todo" | "fail";
}

function stamp(day: number, minutes: number) {
  const d = day + Math.floor(minutes / 1440);
  const m = minutes % 1440;
  const h = Math.floor(m / 60);
  const label = d > 31 ? `Nov ${d - 31}` : `Oct ${d}`;
  return `${label}, ${h % 12 === 0 ? 12 : h % 12}:${String(m % 60).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

function shortDate(day: number) {
  return day > 31 ? `Nov ${day - 31}` : `Oct ${day}`;
}

function subtotal(o: Order) {
  return o.items.reduce((t, i) => t + i.qty * i.price, 0);
}

function shipping(o: Order) {
  return subtotal(o) >= 60 ? 0 : 6.5;
}

function total(o: Order) {
  return subtotal(o) + shipping(o);
}

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

function units(o: Order) {
  return o.items.reduce((t, i) => t + i.qty, 0);
}

function timeline(o: Order): Step[] {
  const at = (mins: number) => stamp(o.day, o.time + mins);
  const steps: Step[] = [{ title: "Order placed", detail: `${o.customer} checked out`, time: at(0), state: "done" }];
  if (o.payment === "Failed") {
    steps.push({ title: "Payment failed", detail: "The card was declined", time: at(1), state: "fail" });
    steps.push({ title: "Reminder sent", detail: "Customer can retry from the email link", state: "current" });
    steps.push({ title: "Packed", state: "todo" }, { title: "Shipped", state: "todo" });
    return steps;
  }
  if (o.payment === "Pending") {
    steps.push({ title: "Awaiting payment", detail: "Bank transfer not received yet", state: "current" });
    steps.push({ title: "Packed", state: "todo" }, { title: "Shipped", state: "todo" }, { title: "Delivered", state: "todo" });
    return steps;
  }
  steps.push({ title: "Payment confirmed", detail: money(total(o)), time: at(1), state: "done" });
  if (o.fulfillment === "Unfulfilled") {
    steps.push({ title: "Packing in progress", detail: "Ready to ship within 24 hours", state: "current" });
    steps.push({ title: "Shipped", state: "todo" }, { title: "Delivered", state: "todo" });
    return steps;
  }
  steps.push({ title: "Packed", time: at(360), state: "done" });
  steps.push({ title: "Shipped", detail: "Tracking 1Z84 F330 0344 21", time: at(1200), state: "done" });
  if (o.fulfillment === "Shipped") {
    steps.push({ title: "In transit", detail: "Arrived at the regional hub", state: "current" });
    steps.push({ title: "Delivered", detail: `Expected ${shortDate(o.day + 3)}`, state: "todo" });
    return steps;
  }
  steps.push({ title: "Delivered", time: at(4320), state: "done" });
  if (o.fulfillment === "Returned") {
    steps.push({ title: "Return requested", detail: "Plant arrived damaged", time: at(5400), state: "done" });
    steps.push(o.payment === "Refunded" ? { title: "Refund issued", detail: money(total(o)), time: at(7200), state: "done" } : { title: "Refund pending", state: "current" });
  }
  return steps;
}

export function OrdersDashboard({
  accent = "#2f7bff",
  brand = "Parcel",
  store = "Fernhill Goods",
  user = "Nora Whitfield",
  orders: ordersProp,
  tab,
  defaultTab = "all",
  onTabChange,
  onOrderSelect,
  className = "",
  style,
  ...rest
}: OrdersDashboardProps) {
  const uid = React.useId().replace(/:/g, "");
  const [orders, setOrders] = React.useState<Order[]>(ordersProp ?? DEFAULT_ORDERS);
  const [inner, setInner] = React.useState<OrdersTab>(defaultTab);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const current = tab ?? inner;

  const inTab = (o: Order, t: OrdersTab) =>
    t === "all" || (t === "unfulfilled" && o.fulfillment === "Unfulfilled") || (t === "shipped" && (o.fulfillment === "Shipped" || o.fulfillment === "Delivered")) || (t === "returns" && o.fulfillment === "Returned");

  const rows = orders.filter((o) => inTab(o, current));
  const active = rows.find((o) => o.id === selectedId) ?? rows[0] ?? null;
  const steps = active ? timeline(active) : [];
  const counts = (t: OrdersTab) => orders.filter((o) => inTab(o, t)).length;
  const pendingNow = 11 + counts("unfulfilled");
  const shippedNow = 120 + counts("shipped");
  const refundsNow = 3 + counts("returns");
  const values = [38, pendingNow, shippedNow, refundsNow];

  const pickTab = (t: OrdersTab) => {
    setInner(t);
    onTabChange?.(t);
  };

  const select = (o: Order) => {
    setSelectedId(o.id);
    onOrderSelect?.(o);
  };

  const advance = (o: Order) => {
    const next: OrderFulfillment = o.fulfillment === "Unfulfilled" ? "Shipped" : "Delivered";
    setOrders((list) => list.map((x) => (x.id === o.id ? { ...x, fulfillment: next } : x)));
  };

  const tabKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const move = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!move) return;
    e.preventDefault();
    const next = (i + move + TABS.length) % TABS.length;
    pickTab(TABS[next].id);
    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };

  const rowKey = (e: React.KeyboardEvent<HTMLTableRowElement>, o: Order, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(o);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const target = rows[i + (e.key === "ArrowDown" ? 1 : -1)];
      if (!target) return;
      select(target);
      const sib = e.key === "ArrowDown" ? e.currentTarget.nextElementSibling : e.currentTarget.previousElementSibling;
      (sib as HTMLElement | null)?.focus();
    }
  };

  const vars = { "--a": accent, ...style } as React.CSSProperties;
  const nextLabel = active ? (active.payment === "Paid" && active.fulfillment === "Unfulfilled" ? "Mark as shipped" : active.fulfillment === "Shipped" ? "Mark as delivered" : null) : null;

  return (
    <div className={`hb-dor ${className}`} style={vars} {...rest}>
      <style href="hb-orders-dashboard" precedence="default">
        {css}
      </style>
      <Shell
        brand={brand}
        nav={NAV}
        defaultActive="orders"
        crumb={[store, "Orders"]}
        placeholder="Search orders"
        user={user}
        foot={
          <div className="hb-dor-store">
            <i />
            <div>
              <strong>{store}</strong>
              <span>Storefront is live</span>
            </div>
          </div>
        }
      >
        <div className="hb-dor-head">
          <div>
            <h2 className="hb-dor-title">Orders</h2>
            <p className="hb-dor-sub">{store} · updated 2 minutes ago</p>
          </div>
          <div className="hb-dor-tools">
            <button type="button" className="hb-dor-btn">
              <Ico n="download" />
              Export
            </button>
            <button type="button" className="hb-dor-btn" data-p="true">
              <Ico n="plus" />
              Create order
            </button>
          </div>
        </div>

        <div className="hb-dor-tiles">
          {TILES.map((t, i) => (
            <div className="hb-dor-card hb-dor-tile" key={t.label} style={{ "--k": t.color, "--d": i } as React.CSSProperties}>
              <div className="hb-dor-tile-top">
                <span className="hb-dor-tile-l">
                  <span className="hb-dor-tile-i">
                    <Ico n={t.icon} />
                  </span>
                  {t.label}
                </span>
              </div>
              <div className="hb-dor-tile-row">
                <p className="hb-dor-tile-v">{values[i]}</p>
                <Delta value={t.delta} good={t.good} />
              </div>
              <Spark values={Array.from({ length: 14 }, (_, k) => 40 + k * (t.delta > 0 ? 2.2 : -1.2) + hash(i * 17 + k) * 22)} id={`${uid}${i}`} />
            </div>
          ))}
        </div>

        <div className="hb-dor-lay">
          <div className="hb-dor-card hb-dor-tcard" style={{ "--d": 4 } as React.CSSProperties}>
            <div className="hb-dor-tabs" role="tablist" aria-label="Order status">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${t.id}`}
                  aria-selected={current === t.id}
                  aria-controls={`${uid}-panel`}
                  tabIndex={current === t.id ? 0 : -1}
                  className="hb-dor-tab"
                  onClick={() => pickTab(t.id)}
                  onKeyDown={(e) => tabKey(e, i)}
                >
                  {t.label}
                  <span>{counts(t.id)}</span>
                </button>
              ))}
            </div>
            <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${current}`}>
              {rows.length > 0 ? (
                <div className="hb-dor-tw">
                  <table className="hb-dor-ot">
                    <colgroup>
                      <col style={{ width: "13%" }} />
                      <col style={{ width: "19%" }} />
                      <col style={{ width: "8%" }} />
                      <col style={{ width: "11%" }} />
                      <col style={{ width: "16%" }} />
                      <col style={{ width: "18%" }} />
                      <col style={{ width: "15%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Fulfillment</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((o, i) => (
                        <tr key={o.id} tabIndex={0} aria-current={active?.id === o.id} onClick={() => select(o)} onKeyDown={(e) => rowKey(e, o, i)}>
                          <td className="hb-dor-oid">#{o.id}</td>
                          <td>
                            <span className="hb-dor-ocust">{o.customer}</span>
                          </td>
                          <td className="hb-dor-dim">{units(o)}</td>
                          <td>{money(total(o))}</td>
                          <td>
                            <span className="hb-dor-tag" style={{ "--c": PAYMENT_COLOR[o.payment] } as React.CSSProperties}>
                              <i />
                              {o.payment}
                            </span>
                          </td>
                          <td>
                            <span className="hb-dor-tag" style={{ "--c": FULFILL_COLOR[o.fulfillment] } as React.CSSProperties}>
                              <i />
                              {o.fulfillment}
                            </span>
                          </td>
                          <td className="hb-dor-dim">{shortDate(o.day)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="hb-dor-empty">
                  <strong>No orders here</strong>
                  Orders matching this tab will show up as they come in.
                </div>
              )}
            </div>
            <div className="hb-dor-foot">
              <span>
                {rows.length} {rows.length === 1 ? "order" : "orders"}
              </span>
              <span>Select a row to see its timeline</span>
            </div>
          </div>

          <aside className="hb-dor-card" style={{ "--d": 5 } as React.CSSProperties} aria-label="Order timeline">
            {active ? (
              <div className="hb-dor-pn" key={active.id}>
                <div className="hb-dor-pn-h">
                  <div>
                    <h3>Order #{active.id}</h3>
                    <span>{stamp(active.day, active.time)}</span>
                  </div>
                  <span className="hb-dor-tag" style={{ "--c": FULFILL_COLOR[active.fulfillment], margin: 0 } as React.CSSProperties}>
                    <i />
                    {active.fulfillment}
                  </span>
                </div>
                <div className="hb-dor-pn-c">
                  <span className="hb-dor-av" style={{ background: tone(active.customer) }}>
                    {initials(active.customer)}
                  </span>
                  <div>
                    <strong>{active.customer}</strong>
                    <span>{active.email}</span>
                    <span>{active.city}</span>
                  </div>
                </div>
                <div>
                  <p className="hb-dor-pn-s">Items</p>
                  <ul className="hb-dor-li">
                    {active.items.map((i) => (
                      <li key={i.name}>
                        <span>
                          {i.qty} × {i.name}
                        </span>
                        <span>{money(i.qty * i.price)}</span>
                      </li>
                    ))}
                    <li>
                      <span>Shipping</span>
                      <span>{shipping(active) === 0 ? "Free" : money(shipping(active))}</span>
                    </li>
                    <li data-sum="true">
                      <span>Total</span>
                      <span>{money(total(active))}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="hb-dor-pn-s">Timeline</p>
                  <ol className="hb-dor-tl">
                    {steps.map((s) => (
                      <li key={s.title} data-s={s.state}>
                        <span className="hb-dor-tl-d">{s.state === "done" ? <Ico n="check" /> : s.state === "fail" ? <Ico n="x" /> : null}</span>
                        <div>
                          <strong>{s.title}</strong>
                          {s.detail ? <span>{s.detail}</span> : null}
                          {s.time ? <span>{s.time}</span> : null}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="hb-dor-pn-a">
                  <button type="button" className="hb-dor-btn">
                    <Ico n="receipt" />
                    Invoice
                  </button>
                  {nextLabel ? (
                    <button type="button" className="hb-dor-btn" data-p="true" onClick={() => advance(active)}>
                      <Ico n="truck" />
                      {nextLabel}
                    </button>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="hb-dor-empty">
                <strong>Nothing selected</strong>
                Pick an order to follow it step by step.
              </div>
            )}
          </aside>
        </div>
      </Shell>
    </div>
  );
}
