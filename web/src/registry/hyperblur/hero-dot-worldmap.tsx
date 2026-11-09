"use client";

import * as React from "react";

export interface HeroDotWorldmapLink {
  label: string;
  href: string;
}

export interface HeroDotWorldmapNode {
  name: string;
  lon: number;
  lat: number;
}

export interface HeroDotWorldmapProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotWorldmapLink | null;
  brand?: string;
  nav?: HeroDotWorldmapLink[];
  navCta?: HeroDotWorldmapLink | null;
  learnMore?: HeroDotWorldmapLink | null;
  accent?: string;
  alert?: string;
  density?: number;
  speed?: number;
  nodes?: HeroDotWorldmapNode[];
  routes?: [string, string][];
  rate?: number;
  showFeed?: boolean;
  showStats?: boolean;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
  showBar?: boolean;
}

interface FeedEvent {
  key: number;
  from: string;
  to: string;
  tag: string;
  hot: boolean;
  ms: number;
}

const css = `
@keyframes hb-hh10-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh10-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
@keyframes hb-hh10-in {
  from { opacity: 0; transform: translate3d(0, -6px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hh10-beat {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-hh10-accent) 70%, transparent); }
  70%, 100% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--hb-hh10-accent) 0%, transparent); }
}
.hb-hh10 {
  --hb-hh10-accent: #ffc857;
  --hb-hh10-alert: #ff7a66;
  --hb-hh10-ink: #0a2540;
  --hb-hh10-line: rgba(176, 224, 255, .22);
  --hb-hh10-panel: rgba(5, 36, 70, .66);
  --hb-hh10-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 820px;
  padding-top: 40px;
  overflow: hidden;
  container-type: inline-size;
  background:
    radial-gradient(60% 55% at 62% 36%, rgba(70, 160, 235, .3), transparent 70%),
    linear-gradient(180deg, #06284a 0%, #08396c 55%, #0a4a8a 100%);
  color: #eaf6ff;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hh10 *, .hb-hh10 *::before, .hb-hh10 *::after { box-sizing: border-box; }
.hb-hh10-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-hh10-bar {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: calc(100% - 48px);
  max-width: 1180px;
  margin: 18px auto 0;
  padding: 8px 8px 8px 16px;
  border: 1px solid var(--hb-hh10-line);
  border-radius: 8px;
  background: rgba(5, 36, 70, .55);
  box-shadow: 0 18px 40px -22px rgba(2, 16, 36, .8);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
.hb-hh10-brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -.01em;
  text-decoration: none;
  border-radius: 8px;
}
.hb-hh10-mark { flex: none; color: var(--hb-hh10-accent); }
.hb-hh10-links {
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hh10-link {
  display: inline-flex;
  padding: 7px 12px;
  border-radius: 8px;
  color: rgba(214, 238, 255, .78);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh10-link:hover { color: #fff; background: rgba(176, 224, 255, .12); }
.hb-hh10-tools {
  display: flex;
  align-items: center;
  gap: 6px;
}
.hb-hh10-search {
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: rgba(214, 238, 255, .78);
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh10-search:hover { color: #fff; background: rgba(176, 224, 255, .12); }
.hb-hh10-outline {
  display: inline-flex;
  align-items: center;
  height: 34px;
  padding: 0 14px;
  border-radius: 8px;
  background: var(--hb-hh10-accent);
  color: var(--hb-hh10-ink);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: filter .2s ease;
}
.hb-hh10-outline:hover { filter: brightness(1.07); }
.hb-hh10-hud {
  position: absolute;
  right: 32px;
  bottom: 36px;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  pointer-events: none;
}
.hb-hh10-panel {
  border: 1px solid var(--hb-hh10-line);
  border-radius: 8px;
  background: var(--hb-hh10-panel);
  box-shadow: 0 18px 40px -24px rgba(2, 16, 36, .9);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  animation: hb-hh10-up .8s .2s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh10-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 212px;
  padding: 11px 13px 12px;
}
.hb-hh10-live {
  display: flex;
  align-items: center;
  gap: 7px;
  color: rgba(214, 238, 255, .75);
  font-family: var(--hb-hh10-mono);
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-hh10-dot {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 2px;
  background: var(--hb-hh10-accent);
  animation: hb-hh10-beat 1.6s ease-out infinite;
}
.hb-hh10-num {
  display: flex;
  align-items: baseline;
  gap: 7px;
  margin: 0;
  white-space: nowrap;
}
.hb-hh10-num b {
  color: #fff;
  font-family: var(--hb-hh10-mono);
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -.02em;
  font-variant-numeric: tabular-nums;
}
.hb-hh10-num span { color: rgba(214, 238, 255, .6); font-family: var(--hb-hh10-mono); font-size: 10.5px; letter-spacing: .04em; }
.hb-hh10-kv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 0;
  padding-top: 8px;
  border-top: 1px solid var(--hb-hh10-line);
}
.hb-hh10-kv div { min-width: 0; }
.hb-hh10-kv dt { margin: 0; color: rgba(214, 238, 255, .6); font-family: var(--hb-hh10-mono); font-size: 9.5px; letter-spacing: .1em; text-transform: uppercase; }
.hb-hh10-kv dd { margin: 2px 0 0; color: #eaf6ff; font-family: var(--hb-hh10-mono); font-size: 12.5px; font-variant-numeric: tabular-nums; }
.hb-hh10-kv dd[data-hot="true"] { color: var(--hb-hh10-alert); }
.hb-hh10-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin: 0;
  padding: 0;
  list-style: none;
  color: rgba(214, 238, 255, .7);
  font-family: var(--hb-hh10-mono);
  font-size: 10px;
  letter-spacing: .04em;
}
.hb-hh10-legend li { display: inline-flex; align-items: center; gap: 6px; }
.hb-hh10-sw { width: 6px; height: 6px; border-radius: 1px; background: var(--hb-hh10-accent); }
.hb-hh10-sw[data-kind="hot"] { background: var(--hb-hh10-alert); }
.hb-hh10-sw[data-kind="node"] { background: transparent; border: 1px solid #eaf6ff; border-radius: 2px; }
.hb-hh10-latest {
  display: none;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: rgba(214, 238, 255, .8);
  font-family: var(--hb-hh10-mono);
  font-size: 10.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh10-latest b { font-weight: 500; color: var(--hb-hh10-accent); }
.hb-hh10-latest b[data-hot="true"] { color: var(--hb-hh10-alert); }
.hb-hh10-feed {
  width: 248px;
  padding: 10px 6px 6px;
}
.hb-hh10-feedhead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7px 7px;
  color: rgba(214, 238, 255, .75);
  font-family: var(--hb-hh10-mono);
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-hh10-feedhead span:last-child { color: rgba(214, 238, 255, .45); letter-spacing: .06em; }
.hb-hh10-list { margin: 0; padding: 0; list-style: none; }
.hb-hh10-row {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  height: 21px;
  padding: 0 7px;
  border-radius: 6px;
  font-family: var(--hb-hh10-mono);
  font-size: 10.5px;
  animation: hb-hh10-in .45s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh10-row:first-child { background: rgba(176, 224, 255, .08); }
.hb-hh10-tag {
  justify-self: start;
  padding: 1px 5px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--hb-hh10-accent) 18%, transparent);
  color: var(--hb-hh10-accent);
  font-size: 9px;
  letter-spacing: .06em;
}
.hb-hh10-row[data-hot="true"] .hb-hh10-tag {
  background: color-mix(in srgb, var(--hb-hh10-alert) 20%, transparent);
  color: var(--hb-hh10-alert);
}
.hb-hh10-route { min-width: 0; overflow: hidden; color: #eaf6ff; white-space: nowrap; text-overflow: ellipsis; }
.hb-hh10-ms { color: rgba(214, 238, 255, .6); font-variant-numeric: tabular-nums; }
.hb-hh10-row[data-hot="true"] .hb-hh10-ms { color: color-mix(in srgb, var(--hb-hh10-alert) 80%, #eaf6ff); }
.hb-hh10-row[data-empty="true"] { animation: none; }
.hb-hh10-row[data-empty="true"] .hb-hh10-route {
  height: 5px;
  border-radius: 3px;
  background: rgba(176, 224, 255, .1);
}
.hb-hh10-tip {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  transition: opacity .15s ease;
}
.hb-hh10-tip[data-on="true"] { opacity: 1; }
.hb-hh10-tipbox {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 9px;
  border: 1px solid color-mix(in srgb, var(--hb-hh10-accent) 55%, transparent);
  border-radius: 8px;
  background: rgba(5, 36, 70, .92);
  white-space: nowrap;
  transform: translate(-50%, calc(-100% - 14px));
}
.hb-hh10-tipbox b { color: #fff; font-size: 12px; font-weight: 600; }
.hb-hh10-tipbox span { color: rgba(214, 238, 255, .75); font-family: var(--hb-hh10-mono); font-size: 10px; }
.hb-hh10-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  width: 100%;
  min-height: 300px;
}
.hb-hh10-foot {
  position: absolute;
  left: 48px;
  bottom: 44px;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 22px;
  width: min(430px, 40%);
}
.hb-hh10-copy { min-width: 0; }
.hb-hh10-title {
  margin: 0;
  color: #fff;
  font-size: clamp(30px, 4.4cqi, 62px);
  font-weight: 700;
  line-height: .99;
  letter-spacing: -.045em;
  text-wrap: balance;
  text-shadow: 0 2px 24px rgba(3, 22, 46, .55);
  animation: hb-hh10-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh10-sub {
  max-width: 26em;
  margin: 14px 0 0;
  color: rgba(226, 243, 255, .9);
  font-size: 14.5px;
  line-height: 1.55;
  text-wrap: pretty;
  text-shadow: 0 1px 14px rgba(3, 22, 46, .6);
  animation: hb-hh10-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh10-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-hh10-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-hh10-caption {
  margin: 0;
  color: var(--hb-hh10-accent);
  font-family: var(--hb-hh10-mono);
  font-size: 11px;
  letter-spacing: .06em;
}
.hb-hh10-row2 {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-hh10-cmd {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  height: 42px;
  padding: 0 6px 0 12px;
  border: 1px solid var(--hb-hh10-line);
  border-radius: 8px;
  background: var(--hb-hh10-panel);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.hb-hh10-prompt { flex: none; color: var(--hb-hh10-accent); font-family: var(--hb-hh10-mono); font-size: 12px; }
.hb-hh10-code {
  min-width: 0;
  overflow: hidden;
  color: #eaf6ff;
  font-family: var(--hb-hh10-mono);
  font-size: 11.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-hh10-copybtn {
  position: relative;
  display: inline-grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: rgba(214, 238, 255, .75);
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-hh10-copybtn:hover { color: #fff; background: rgba(176, 224, 255, .14); }
.hb-hh10-copybtn[data-done="true"] { color: var(--hb-hh10-accent); }
.hb-hh10-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 8px;
  background: var(--hb-hh10-accent);
  color: var(--hb-hh10-ink);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 12px 28px -12px rgba(2, 16, 36, .8);
  transition: filter .2s ease;
}
.hb-hh10-cta:hover { filter: brightness(1.07); }
.hb-hh10-cta svg { transition: transform .2s ease; }
.hb-hh10-cta:hover svg { transform: translateX(2px); }
.hb-hh10-more {
  position: absolute;
  left: 50%;
  bottom: 12px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 8px;
  color: rgba(214, 238, 255, .7);
  font-family: var(--hb-hh10-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-hh10-more:hover { color: #fff; }
.hb-hh10-more svg { animation: hb-hh10-bob 1.8s ease-in-out infinite; }
.hb-hh10 a:focus-visible, .hb-hh10 button:focus-visible {
  outline: 2px solid var(--hb-hh10-accent);
  outline-offset: 2px;
}
.hb-hh10-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 1140px) {
  .hb-hh10-feed { display: none; }
  .hb-hh10-latest { display: block; flex: 1 1 auto; }
  .hb-hh10-stats {
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: auto;
    max-width: 420px;
    padding: 8px 12px;
  }
  .hb-hh10-live span:last-child, .hb-hh10-kv, .hb-hh10-legend { display: none; }
  .hb-hh10-num { gap: 5px; }
  .hb-hh10-num b { font-size: 14px; }
  .hb-hh10-num span { font-size: 9.5px; }
  .hb-hh10-hud { right: 24px; bottom: 28px; }
  .hb-hh10-foot { left: 32px; }
}
@container (max-width: 760px) {
  .hb-hh10 { min-height: 0; padding-top: 20px; }
  .hb-hh10-hud { position: relative; right: auto; bottom: auto; order: 2; padding: 0 24px; margin-top: 10px; }
  .hb-hh10-stats { max-width: 100%; }
  .hb-hh10-stage { order: 3; min-height: calc(62cqi + 10px); flex: 1 1 auto; }
  .hb-hh10-foot { position: relative; left: auto; bottom: auto; order: 4; width: 100%; padding: 8px 24px 64px; }
  .hb-hh10-title { font-size: clamp(32px, 10.5cqi, 48px); }
  .hb-hh10-sub { font-size: 14px; }
  .hb-hh10-bar { width: calc(100% - 32px); margin-top: 16px; }
}
@container (max-width: 640px) {
  .hb-hh10-links, .hb-hh10-search { display: none; }
  .hb-hh10-side, .hb-hh10-row2 { align-self: stretch; }
  .hb-hh10-row2 { flex-direction: column; }
  .hb-hh10-cta { width: 100%; }
  .hb-hh10-more { display: none; }
}
@container (max-width: 360px) {
  .hb-hh10-foot { padding: 8px 18px 56px; }
  .hb-hh10-hud { padding: 0 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hh10-title, .hb-hh10-sub, .hb-hh10-side, .hb-hh10-panel, .hb-hh10-row, .hb-hh10-dot, .hb-hh10-more svg { animation: none; }
  .hb-hh10-link, .hb-hh10-search, .hb-hh10-outline, .hb-hh10-copybtn, .hb-hh10-cta, .hb-hh10-cta svg, .hb-hh10-more, .hb-hh10-tip { transition: none; }
  .hb-hh10-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotWorldmapLink[] = [
  { label: "Network", href: "#" },
  { label: "Routes", href: "#" },
  { label: "Docs", href: "#" },
];
const defaultNavCta: HeroDotWorldmapLink = { label: "Sign in", href: "#" };
const defaultPrimary: HeroDotWorldmapLink = { label: "Open console", href: "#" };
const defaultMore: HeroDotWorldmapLink = { label: "Learn more", href: "#" };

export const heroDotWorldmapCities: HeroDotWorldmapNode[] = [
  { name: "San Francisco", lon: -122.42, lat: 37.77 },
  { name: "Mexico City", lon: -99.13, lat: 19.43 },
  { name: "Chicago", lon: -87.63, lat: 41.88 },
  { name: "New York", lon: -74.0, lat: 40.71 },
  { name: "Miami", lon: -80.19, lat: 25.76 },
  { name: "Bogota", lon: -74.07, lat: 4.71 },
  { name: "Lima", lon: -77.04, lat: -12.05 },
  { name: "Sao Paulo", lon: -46.63, lat: -23.55 },
  { name: "Buenos Aires", lon: -58.38, lat: -34.6 },
  { name: "Santiago", lon: -70.67, lat: -33.45 },
  { name: "London", lon: -0.13, lat: 51.51 },
  { name: "Madrid", lon: -3.7, lat: 40.42 },
  { name: "Frankfurt", lon: 8.68, lat: 50.11 },
  { name: "Stockholm", lon: 18.07, lat: 59.33 },
  { name: "Moscow", lon: 37.62, lat: 55.76 },
  { name: "Istanbul", lon: 28.98, lat: 41.01 },
  { name: "Cairo", lon: 31.24, lat: 30.04 },
  { name: "Lagos", lon: 3.38, lat: 6.52 },
  { name: "Nairobi", lon: 36.82, lat: -1.29 },
  { name: "Johannesburg", lon: 28.05, lat: -26.2 },
  { name: "Dubai", lon: 55.27, lat: 25.2 },
  { name: "Mumbai", lon: 72.88, lat: 19.08 },
  { name: "Delhi", lon: 77.21, lat: 28.61 },
  { name: "Singapore", lon: 103.82, lat: 1.35 },
  { name: "Hong Kong", lon: 114.17, lat: 22.32 },
  { name: "Seoul", lon: 126.98, lat: 37.57 },
  { name: "Tokyo", lon: 139.69, lat: 35.69 },
  { name: "Sydney", lon: 151.21, lat: -33.87 },
];

const LAND: number[][] = [
  [-168,65.6,-166,68.4,-163,69.6,-161,70.4,-156.5,71.3,-152,70.8,-148,70.4,-143,70.1,-139,69.6,-135,69.5,-130,70,-127,70.2,-124,69.6,-120,69.4,-115,68.5,-110,68.2,-106,68.6,-101,67.8,-97,68.2,-95,68.5,-94,71.5,-92,70.5,-89,69.5,-86,69.8,-82,69,-81.5,67.5,-84,66.2,-87,64.3,-90.5,63.3,-93.5,61.4,-94.6,59.5,-94,58.5,-92.5,57.2,-90,57,-86,55.6,-82.5,55,-82,53,-80.5,51.6,-79.2,51.7,-79,54,-77,55.8,-76.6,57.6,-77.6,59.5,-77.6,60.8,-78,62.4,-76,62.3,-73,62.1,-71,61.2,-69.5,60,-69.5,58.8,-67.5,58.3,-65.5,59.8,-64,60.1,-62,58,-61.5,56.5,-59.5,55.2,-57.5,54.2,-56,52.5,-56,51.6,-58.5,51.2,-60.5,50.2,-64,50.2,-66.5,50,-68.5,49.2,-70.5,47.5,-69,48.5,-66.5,49.1,-64.5,49,-64.3,48.1,-65.5,47.5,-64.6,46.6,-63,45.8,-61,45.3,-61.5,45.7,-60,46,-60.5,47,-61.5,45.2,-63.5,44.6,-65.5,43.5,-66.2,44.4,-64.8,45.3,-67,44.8,-68.5,44.2,-70,43.7,-70.7,42.5,-70,41.9,-70.5,41.5,-71.8,41.3,-73.5,40.9,-74,40.5,-74.1,39.6,-75,38.9,-75.1,38.3,-76,37,-75.8,36,-75.5,35.2,-76.5,34.7,-77.9,33.9,-79.2,33.2,-80.6,32.2,-81.4,30.7,-81.2,29.5,-80.5,28.1,-80,26.8,-80.2,25.3,-81.1,25.2,-81.8,26.2,-82.6,27.5,-82.8,28.6,-83.6,29.9,-85,29.6,-86.5,30.4,-88.5,30.4,-89.6,30.2,-89.3,29.2,-90.5,29.1,-92,29.6,-94,29.6,-95.3,28.8,-97,27.8,-97.4,26,-97.7,24,-97.8,22.4,-97.2,21,-96.4,19.5,-95.2,18.7,-94.5,18.2,-92.8,18.6,-91.4,18.8,-90.8,19.9,-90.4,21.1,-88.6,21.5,-87,21.5,-86.8,20.2,-87.5,19,-88.2,17.6,-88.3,16.2,-87.6,15.9,-86,15.9,-84.8,15.8,-83.4,15.2,-83.2,14,-83.6,12.4,-83.7,11.2,-83,10,-82.2,9.1,-81,8.8,-79.6,9.6,-78.4,9.4,-77.6,8.6,-77.3,7.9,-78.2,7.5,-79,8.4,-80.1,7.4,-80.9,7.3,-81.8,8.2,-83,8.3,-83.7,9.3,-85.7,9.9,-85.8,11.2,-87.3,12.9,-88.5,13.2,-89.8,13.5,-91.4,13.9,-92.8,14.6,-93.9,15.9,-95,16.2,-96.5,15.7,-98.2,16.3,-99.6,16.8,-101.5,17.8,-103.5,18.3,-105.3,19.5,-105.6,20.6,-105.3,21.6,-105.7,22.6,-106.9,23.8,-108.5,25.3,-109.4,26.3,-110.6,27.8,-111.9,29,-112.8,30.4,-114.4,31.5,-114.8,31,-114.4,30,-113.2,28.9,-112.2,27.2,-111.6,26,-110.6,24.7,-110,23.2,-109.4,23.2,-110.2,24.3,-111.4,25.8,-112.2,26.8,-113.4,27.8,-114.3,28.8,-115.4,29.8,-116.2,31,-117.1,32.5,-117.4,33.2,-118.5,34,-119.6,34.4,-120.6,34.6,-120.9,35.5,-121.9,36.6,-122.5,37.6,-123,38.2,-123.8,39.3,-124.4,40.4,-124.1,41.8,-124.5,43,-124,44.6,-124,46.2,-124.2,47.3,-124.7,48.4,-123.1,48.9,-123.5,49.5,-125,50.2,-126.5,50.8,-127.8,51.5,-128.3,52.5,-129.8,53.6,-130.5,54.6,-130.2,55.7,-132,57,-133.6,58.3,-135.5,59.2,-137.6,58.8,-139.8,59.8,-142.5,60.1,-145.5,60.5,-148,60.8,-149.8,59.7,-151.8,59.2,-151.4,60.6,-153.5,59.2,-154.3,58.1,-156.4,57.2,-158.7,56,-161.5,55.4,-164.5,54.5,-162.6,55.7,-160,56.8,-158,58.6,-161.9,58.6,-162.3,60,-165.2,60.8,-165,61.8,-166,62.5,-164.6,63.2,-161,64.4,-163.6,64.6,-166.2,64.6,-167.8,65.4],
  [-80.3,73.7,-76.5,72.7,-72.5,71.6,-69.5,70.5,-67.5,69.6,-66.8,68.6,-63.5,67.5,-61.8,66.7,-63,65.8,-64.7,65.3,-65.7,64.3,-64.6,63.3,-65.5,62.5,-67.4,62.7,-69.5,63.3,-71.4,63.9,-73.3,64.5,-75.8,64.4,-77.5,64.6,-76.8,65.4,-73.8,65.6,-73.2,66.9,-73.5,67.8,-75,68.5,-77.2,69.4,-79.5,69.9,-82,69.8,-84.6,70.2,-87.5,70.4,-89.5,71.2,-90,72.5,-89,73.5,-85.8,73.6,-83,73.8],
  [-62,82.4,-66,82.9,-72,83.1,-80,82.9,-86,82.3,-89.5,81.2,-86.6,80.4,-84.6,79.6,-86.8,78.6,-89,77.6,-87.8,76.7,-83,76.3,-79.5,76.5,-78.4,77.4,-75.6,78.3,-73.2,78.9,-71.5,79.9,-68.5,80.5,-65,81.3],
  [-96.2,80.4,-91.5,81.2,-87.8,80.5,-88.2,79.4,-91,78.4,-94.6,78.8],
  [-80.6,74.6,-81.4,75.8,-85.5,76.6,-90,76.6,-93.6,76.3,-96.2,75.7,-93.2,75.1,-89.2,74.6,-84.8,74.5],
  [-95.6,74.1,-92,74.1,-90.4,73.3,-93.3,72.4,-95.7,73],
  [-97,73.9,-100.2,73.9,-102.6,73,-101.2,72,-98.2,71.4,-96.6,72.2],
  [-104.2,76.4,-99.2,76.6,-97.6,75.5,-99,75,-102.8,75.3],
  [-117.2,76.2,-112.2,76.6,-106.4,76,-105.5,75.2,-109.8,74.7,-115,74.5,-117.6,75.3],
  [-118.6,71.2,-117.4,72.7,-114.2,73.3,-109.2,73,-105.2,73.3,-102.2,72.6,-101.6,70.6,-104,69.2,-107,68.9,-111.8,68.6,-115.2,69.3,-117.6,69.7,-119,70.4],
  [-125.3,71.8,-124,73.6,-120.4,74.4,-116,74.2,-115.3,73.3,-117.6,72,-121,71.2,-124,71.2],
  [-87,64.6,-85.2,65.9,-82.2,65.5,-80.4,64,-83,62.4,-86,63.4],
  [-72.4,78.2,-68,79.6,-64,80.6,-60,81.6,-52,82.3,-44,83.2,-34,83.6,-26,83.3,-20,82.3,-12,81.6,-16,80.2,-19,79,-18.5,77,-20,75.6,-19.5,74,-22,72.6,-22,71,-24.5,70,-26,68.8,-30,68.2,-32.5,67.6,-35,66.3,-37.5,65.7,-40,64.8,-41,63.5,-42.5,61.5,-43,60.2,-44.5,59.8,-46,60.6,-48.5,61.2,-50,62.5,-51.2,64,-52.5,65.5,-53.5,66.8,-53,68.5,-51.5,69.6,-54,70.6,-54.5,71.5,-55.8,72.8,-57,74.2,-58.5,75.4,-61.5,76.1,-66.5,76.1,-69,76.7,-71.5,77.4],
  [-59.3,47.7,-58.4,49.2,-57,50.7,-55.6,51.6,-55.8,49.9,-53.6,49.5,-53.2,48.2,-52.6,47.5,-53.2,46.7,-54.4,47.4,-55.8,46.9,-56.2,47.6,-58.2,47.6],
  [-128.4,50.8,-127,50.8,-125,50.1,-123.3,48.4,-124.6,48.5,-126.5,49.4,-128,50.2],
  [-133,54.2,-131.6,54.1,-131.2,52.6,-131.8,52.2,-132.8,53.1],
  [-84.9,21.9,-84,22.7,-82.5,23.1,-80.5,23.1,-79,22.6,-77.5,21.8,-76,21.2,-74.2,20.3,-74.6,20,-77.2,19.9,-77.7,20.7,-78.5,21.5,-80.5,22,-81.7,22.3,-83,22.2,-84.3,21.8],
  [-74.4,18.4,-72.8,19.9,-71,19.9,-69.5,19.4,-68.3,18.6,-68.8,18.2,-70.5,18.2,-71.4,17.6,-72.8,18.1,-74.2,18.1],
  [-78.4,18.4,-77,18.5,-76.2,18,-77.2,17.8,-78.3,18.2],
  [-67.3,18.5,-65.6,18.4,-65.7,18,-67.2,18],
  [-180,69.4,-176,69.8,-172,69.2,-170,68.6,-169.7,66.2,-171.6,65.5,-172.5,64.4,-175,64.8,-177.5,64.9,-178.8,65.6,-180,65.4],
  [-77.4,8.6,-76,10.4,-75.3,10.9,-74.2,11.3,-72.2,11.9,-71.5,12.4,-71.7,11.3,-71.9,10.4,-71,9.7,-71.3,11,-70,11.9,-68.6,11.5,-68,10.6,-66,10.6,-64,10.6,-62.5,10.7,-61.5,10.5,-62.2,10,-60.8,8.6,-59.5,8,-58.3,7,-57,6,-55,6,-53,5.6,-51.6,4.3,-51,3.5,-50.2,1.8,-49.9,1,-50.6,0.2,-48.5,-0.6,-47,-0.7,-44.6,-1.6,-43,-2.4,-41,-2.9,-39,-3.8,-37.2,-4.9,-35.4,-5.3,-34.8,-7.2,-35,-9,-36.4,-10.5,-37.6,-12.1,-38.6,-13,-39,-15.4,-38.9,-17.6,-39.7,-19.6,-40.9,-21.6,-41.9,-22.9,-44.6,-23.3,-46.8,-24.2,-48.3,-25.6,-48.6,-28,-49.7,-29,-51,-30.8,-52.1,-32.2,-53.4,-33.7,-54.9,-34.9,-56.6,-34.6,-58.4,-34,-57.6,-35.3,-57,-36.4,-57.6,-37.9,-59.2,-38.7,-62.1,-38.9,-62.3,-40.6,-63.7,-41.1,-65.1,-41,-64.4,-42.4,-63.6,-42.8,-64.6,-43,-65.3,-44.4,-66.6,-45.1,-67.6,-46.4,-66.1,-47.2,-65.9,-48.1,-67.7,-49.5,-68.6,-50.4,-69.1,-51.6,-68.4,-52.4,-69.5,-52.6,-68.6,-53.2,-67.2,-54.6,-68.6,-55,-70.2,-55.1,-71.9,-54.4,-73.5,-53.4,-74.6,-52.2,-75.1,-50.4,-75.6,-48.6,-74.4,-46.8,-75.4,-46,-74,-44.6,-73.6,-43.4,-73.7,-41.8,-73.9,-40.2,-73.4,-38.5,-73.6,-37.2,-72.6,-35.6,-71.6,-33.4,-71.5,-31.6,-71.3,-29.2,-70.8,-27.3,-70.4,-25.3,-70.4,-23.4,-70.1,-21.4,-70.2,-19.4,-70.9,-18.2,-72.6,-17,-74.9,-15.6,-76.3,-13.7,-77.1,-12.1,-78.2,-10.1,-79.4,-7.9,-80.8,-6.2,-81.2,-5,-80.3,-3.4,-80.2,-2.6,-80.9,-2.1,-80.4,-0.6,-80,0.8,-79,1.4,-78.6,2.4,-77.4,4,-77.4,5.7,-77.8,7,-77.9,7.6],
  [-61.4,-51.1,-58,-51.2,-57.8,-51.9,-60.4,-52.3],
  [-9.4,36.9,-8.9,38.4,-9.5,38.8,-9,40.2,-8.7,41.8,-9.3,43.1,-8,43.7,-5.9,43.6,-4,43.4,-1.8,43.4,-1.2,44.6,-1.2,46.1,-2.3,47.1,-4.6,47.9,-4.7,48.6,-3,48.8,-1.6,48.7,-1.4,49.7,0.2,49.5,1.5,50.2,1.7,50.9,3,51.2,4,51.6,4.6,52.4,5.1,53.3,6.9,53.4,8.4,53.6,8.6,54.9,8.3,55.6,8.1,56.6,8.6,57.1,10.6,57.7,10.4,56.6,10.9,56.4,10,55.1,10.9,54.3,12.5,54.3,14.2,53.9,16.5,54.6,18.6,54.6,19.9,54.4,21.2,55.2,21,56.4,21.6,57.4,22.6,57.6,23.5,57,24.4,57.2,24.3,58.3,23.4,59.2,25.4,59.5,28,59.6,29.8,60,28.4,60.6,26.5,60.4,23.4,59.9,22.4,60.4,21.4,60.7,21.4,61.8,21.1,62.7,22.2,63.4,24.4,64.6,25.4,65.2,24.6,65.8,22.4,65.8,21.4,64.8,20.8,63.8,19,63.4,17.8,62.4,17.4,61.6,17.2,60.7,18.6,60.2,18.4,59.3,16.8,58.6,16.6,57.4,16,56.2,14.4,55.6,12.9,55.4,12.6,56.1,11.9,57.6,11.2,58.9,10.6,59.9,10.4,59.1,9.6,59,8.2,58.1,6.6,58.1,5.6,58.6,5,60,5,61.5,5.4,62.4,7.2,63,8.6,63.4,10.6,64.4,12.4,65.8,13.4,67.2,15,68.2,16.6,68.8,18.5,69.8,20.6,70.1,23.2,70.5,25.8,71.1,28.4,71,30.6,70.4,31.2,69.8,33.4,69.3,36.6,69,40,67.8,41.2,66.7,40.2,65.8,38,66.1,35.2,66.3,34.4,65.1,35.2,64.3,37,63.9,37.6,64.6,36.4,65,38.4,65.2,40.5,64.5,42,66.4,43.8,66.1,44.4,67.6,43.8,68.4,46.2,68.2,48.2,67.6,50.4,68.2,53.6,68.8,56,68.4,58.4,68.8,60.4,69.6,64.4,69.3,67.4,68.4,68.6,68.9,67,69.9,66.8,71.1,68.6,72.6,69.6,72.9,72.6,72.7,72.8,71.6,71.8,71,72.6,70,73.6,68.6,72.6,67,74.6,67.7,74.8,69,73.6,69.7,74.4,70.8,73,71.6,74.8,72.4,76.5,71.3,78.4,72.4,80.5,73.6,83.6,74.1,86.5,74.6,87,75.4,89.6,75.6,93,76.1,96.4,76.2,100,76.6,104.2,77.7,106.8,77,107.6,76.5,111,76.7,113.6,75.6,113,74.2,112,73.6,113.6,73.6,116.6,73.8,119.8,73.1,123.4,73.6,126.6,72.6,128.6,72.9,129.6,71.8,131.8,70.8,133.6,71.4,137,71.5,139.4,71.6,140.2,72.4,144,72.4,147.4,72.3,150.4,71.5,152.6,70.8,156.6,71,159.8,70.6,160.8,69.6,164,69.7,167.8,69.6,170.6,70.1,173.6,69.8,176.4,69.6,180,68.9,180,65.2,178.6,64.6,177.6,64.2,178.6,63.2,176.8,62.6,174.6,61.8,172,60.8,170.2,59.9,166.2,60.3,164.8,59.8,163.6,59.6,162.2,58.4,161.8,57.6,163.2,56.2,162.4,55.4,161.6,54.8,160.2,54.2,158.4,52.8,156.6,51,155.8,53.6,155.6,55.8,156.2,57.4,157.6,58,159,58.6,160.8,60.4,163,61.6,160.2,61.8,159.4,61.2,156.6,61.6,154.2,59.8,152.4,59.2,149.2,59.6,147.2,59.4,145,59.4,143.4,59.4,142,58.6,139.8,57.6,137.8,56.6,136.4,55.4,135,54.8,137,53.8,138.6,53.8,140.2,53.4,141.4,52.2,141.2,50.6,140.4,48.6,138.6,47.2,137.2,45.8,135.4,44.4,133.8,43.2,132.2,43.2,130.8,42.6,129.8,41.2,129.6,40.4,128.2,39.4,129.4,37.6,129.4,36,128.6,35.2,127.4,34.7,126.4,34.4,126.2,35.3,126.6,36.4,126.2,37.2,126.6,37.8,125.4,37.8,124.8,38.6,125.4,39.4,124.6,39.8,122.8,40.4,121.6,39.4,121.2,38.8,121.8,40,121.2,40.9,119.6,39.9,118.6,39.2,117.6,38.8,118.6,37.6,119.2,37.2,120.6,37.8,122.4,37.4,122.4,36.8,120.6,36.1,119.4,35.2,119.6,34.4,120.6,33.4,121.4,32.2,121.8,31.6,121.6,30.8,122,29.8,121.6,28.8,121.4,28.2,120.6,27.2,119.8,26.4,119.4,25.4,118.4,24.6,117.2,23.6,116.2,22.8,114.8,22.6,113.6,22.2,112.4,21.8,110.8,21.4,110.4,20.4,109.8,21.4,108.6,21.6,107.4,21.2,106.6,20.4,105.8,19.4,105.6,18.6,106.6,17.6,107.6,16.4,108.6,15.4,109.2,13.8,109.2,11.6,108.6,11,107.2,10.4,106.6,9.8,105.2,8.6,104.8,9.6,104.8,10.4,103.6,10.6,102.6,12,101.2,12.6,100.6,13.4,100,12.2,99.2,10,99.6,8.8,100.4,7.2,101.6,6.8,102.4,6.1,103.4,4.8,103.4,3,104.2,1.4,103.4,1.3,102.2,2.2,101.2,2.9,100.4,4.2,100.4,5.6,99.6,6.6,98.6,8,98.4,9.4,98.8,10.8,98.6,12.6,98.2,14,97.8,15.4,97.6,16.6,96.4,16.6,95.2,15.8,94.4,16.4,94.6,17.8,94,19.4,93.4,20.4,92.4,21.4,91.8,22.4,90.6,22.6,89.6,21.8,88.6,21.6,87.4,21.4,86.6,20.2,85,19.4,84,18.2,82.4,17,81.4,16.2,80.6,15.4,80.2,13.6,80.2,12.2,79.8,10.6,79.2,10.2,78.4,9,77.6,8.1,77,8.4,76.4,9.4,75.6,11.6,74.8,12.8,74.4,14.6,73.6,16,73.2,17.6,72.8,19,72.8,20.4,72.6,21.4,72.2,21.2,70.8,20.6,69.4,21.8,69.2,22.6,70.4,23,68.8,23.4,68,23.8,66.8,24.8,65.2,25.3,63.6,25.3,61.6,25.2,59.6,25.5,58,25.7,57.2,27.2,56.2,27.2,54.8,26.6,53.4,26.9,51.6,27.8,50.6,29.2,50,30.2,48.6,30.1,48,29.8,48.4,28.4,49.2,27.2,50.2,26.4,50.6,25.8,51.4,26,51.6,24.8,52.2,24,53.6,24.2,55,24.6,56,25.6,56.4,26.4,56.4,25.2,56.6,24.4,57.6,23.8,58.8,23.4,59.8,22.4,59.4,21.4,58.4,20.4,57.8,19,56.8,18.8,55.6,17.8,54.2,17,52.2,16.2,50.2,15.4,48.6,14,46.8,13.4,45,12.8,43.6,12.6,43.2,13.4,42.8,14.8,42.6,16.4,41.8,17.6,40.8,19.4,39.6,20.6,39,21.8,38.6,23.6,37.4,24.8,36.6,26.2,35.6,27.6,34.8,28.6,34.6,29.6,34,28,33.4,28.6,32.6,29.8,32.4,31.2,34.2,31.3,34.8,32.6,35.2,33.4,35.6,34.6,35.8,35.8,36,36.6,34.6,36.8,32.8,36.2,31.2,36.6,29.6,36.2,28.2,36.8,27.4,37.4,26.6,38.4,26.8,39.4,26.2,40,26.6,40.6,28,41,29.2,41.2,31.2,41.1,33.2,41.9,35.2,42,36.8,41.4,38.4,40.9,40.2,41,41.6,41.6,41.6,42.4,40.4,43.2,39,44,37.6,44.6,36.8,45.2,35.4,45.2,35.4,44.6,33.6,44.4,32.6,45.4,33.6,45.9,32,46.2,31,46.6,30.2,45.6,29.6,45,29,44.4,28.6,43.2,28,42.2,28,41.4,29,41.2,28.2,40.8,26.6,40.6,26.2,40.4,24.2,40.8,23.4,40.4,22.6,40.2,23.4,39.4,22.6,38.2,23.8,38,24.2,37.6,23.4,37.2,22.8,36.4,21.8,36.8,21.6,37.6,21,38.4,20.8,39.4,20,39.8,19.4,41.6,19.6,42.2,18.6,42.6,17.6,43,16.6,43.4,15.8,44.2,14.4,45.4,13.6,45.8,12.4,45.4,12.2,44.6,12.4,44,13.6,43.4,14,42.4,15.4,41.8,16.2,41.6,18,40.6,18.4,40,17.4,40.4,16.8,40.2,16.6,39.6,17.2,39,16.6,38.2,15.6,38,15.8,38.8,16,39.6,15.6,40.2,14.6,40.6,14,41.2,12.6,41.6,11.4,42.4,10.4,43,9.6,44.2,8.4,44.2,7,43.6,6.2,43.1,5,43.4,3.8,43.4,3.2,42.6,3.2,41.8,2,41.2,0.8,40.8,0,39.8,-0.4,39.2,0.2,38.8,-0.6,38.2,-0.8,37.6,-1.8,37.2,-2.4,36.8,-4.4,36.7,-5,36.2,-5.6,36,-6.2,36.4,-6.4,36.8,-7.4,37.2,-8.8,37],
  [-5.7,50.1,-4.2,50.4,-3,50.7,-1,50.8,0.3,50.8,1.4,51.1,1.4,51.5,1.7,52.6,0.3,53,0.1,53.6,-1,54.5,-1.6,55.5,-2.1,56,-2.6,56.4,-2,57.1,-1.8,57.6,-3.5,57.7,-3,58.6,-5,58.6,-5.4,58,-5.8,57.3,-5.6,56.6,-5.6,56.1,-5.6,55.3,-4.8,55.5,-5,54.8,-3.3,54.9,-3.4,54.3,-2.9,53.8,-3.1,53.3,-4.6,53.3,-4.2,52.9,-4.1,52.4,-5.3,51.9,-4.2,51.6,-3.2,51.4,-4.2,51.2,-5,50.7],
  [-10,51.6,-8.5,51.6,-6.3,52.2,-6,53,-6.2,54,-5.5,54.4,-5.8,55.2,-7.3,55.4,-8.3,55.2,-8.6,54.6,-10,54.2,-9.9,53.5,-10.3,52.9,-9.4,52.6,-10.4,52.1],
  [-24.5,65.5,-22,66.4,-18,66.2,-15,66.5,-13.5,65.3,-14.5,64.4,-17,63.8,-20,63.5,-22.7,63.8,-21.8,64.5,-24,64.9],
  [10.8,79.7,15,80,18,79.7,20,80.4,24,80.4,27.2,80,23,79.2,21.5,78.6,22,77.6,19,77,16.5,76.5,14,77.2,12.5,78,11.5,78.6],
  [52,71.5,53,72.5,54,73.5,56,74.5,58,75.5,61,76.3,65,76.9,69,77,68,76.3,64,75.6,61,75,58.5,74,56.8,73,56,72,57.5,70.6,55,70.5,53,70.6],
  [91,79.5,96,81.2,100,80.8,104,79.3,100,78.3,95,78.6],
  [136.2,75.6,140,76.1,143,75.9,149,75.2,145,74.5,140,74.6,137.2,74.9],
  [8.6,41.4,9.4,41.4,9.6,42.6,9.4,43,8.6,42.4],
  [8.2,41,9.7,41,9.8,40,9.6,39,8.4,39,8.4,40],
  [12.4,38.1,15.6,38.3,15.1,36.7,12.5,37.6],
  [23.5,35.6,26.3,35.3,26,35,23.5,35.2],
  [32.3,35.1,34.6,35.7,34,34.6,32.5,34.7],
  [32.4,31.3,30,31.4,28,31.1,25.2,31.6,23,32.6,21,32.8,20,32,19.6,30.6,18,30.8,16,31.3,15.2,32.3,13,32.9,11.2,33.2,10.2,33.8,11,35.2,10.6,36.8,11.1,37.1,10,37.3,8.6,36.9,6.4,37.1,5,36.8,3,36.8,1,36.5,-1,35.4,-2.2,35.2,-5.3,35.9,-6,35.4,-6.8,34,-8.4,33.4,-9.6,32.4,-9.8,30.6,-10,29.4,-11.4,28.2,-12.9,27.8,-14.4,26.2,-15,24.6,-16.2,23.6,-16.9,22.2,-17.1,20.8,-16.4,19.6,-16.2,18.2,-16.4,16.6,-16.8,15.4,-17.4,14.8,-16.8,13.6,-16.8,12.4,-16.2,11.8,-15.2,11,-14.6,10.4,-13.6,9.6,-13.2,8.8,-12.4,7.6,-11.4,6.9,-10.2,6.2,-8.8,5,-7.4,4.4,-6,4.8,-4.6,5.2,-3.2,5.1,-2,4.7,-0.8,5.4,0.6,5.8,1.6,6.2,2.8,6.4,4.4,6.3,5.6,5.2,6.2,4.3,7.4,4.4,8.4,4.6,9,3.8,9.6,3,9.8,2,9.4,1,9.2,-0.2,8.8,-1,9.8,-2.6,11,-3.8,11.8,-5,12.4,-6,13.2,-8.4,13.4,-9.8,13.6,-11.6,13,-12.6,12.4,-14,11.8,-16,11.6,-17.2,12,-18.6,13,-20.4,14.2,-22.6,14.4,-24.4,15,-26.4,15.8,-27.8,16.4,-28.6,17,-29.6,17.8,-31.2,18.4,-32.8,18.2,-33.6,18.4,-34.1,19.4,-34.6,20,-34.8,21.4,-34.4,22.6,-33.9,24,-34,25.6,-33.8,26.6,-33.6,27.8,-33,29,-32,30,-31.2,30.8,-30,31.4,-29.2,32.2,-28.4,32.6,-27,32.8,-26.2,32.8,-25.6,33.4,-25.2,35,-24.6,35.4,-23.6,35.4,-22.4,35.6,-21.2,35.2,-20,34.8,-19.2,35.6,-18.4,36.6,-17.6,38,-17,39.4,-16.4,40.4,-15.4,40.6,-14,40.6,-12.6,40.4,-11.2,40,-10.2,39.6,-9,39.4,-7.8,39.2,-6.6,38.8,-5.8,39.2,-4.8,39.6,-3.6,40.2,-2.6,40.8,-1.8,41.6,-1,42.4,0,43.4,1.4,44.6,2.6,45.8,4,47.4,5.6,48.8,7.6,49.6,9.4,50.8,10.6,51.2,11.6,51,12,49,11.4,47,11,45.4,10.6,44,10.6,43.2,11.6,42.6,12.6,41.8,14.4,41,15,40.2,16,39.4,17.4,38.6,18.6,38,20.4,37.2,22,36.8,23.4,35.6,25.2,34.8,26.8,34,28,33.6,29,32.8,30.4,32.6,31.2],
  [49.3,-12,50.4,-15.4,49.8,-16.8,49.4,-18.2,48.6,-20.4,47.8,-23,47.2,-24.9,45.4,-25.6,44,-25,43.4,-23.4,43.6,-21.6,44.4,-20,44.2,-18,44,-16.6,45.4,-16,46.6,-15.6,48,-14.2,48.6,-13.4],
  [129.7,33.5,131,33.9,132,33.3,131.6,32,131.1,31.2,130.3,31.1,130.1,32.2,129.7,32.6],
  [132.2,33.4,133.5,34.3,134.6,34.2,134.7,33.8,134.2,33.3,133,32.8],
  [130.9,34.3,132.6,35.4,134.3,35.6,135.8,35.6,136.1,36.3,136.7,37.4,137.3,37.2,138.6,37.6,139.4,38.2,140,39.5,140.1,40.6,140.4,41.3,141.5,41.4,141.5,40.4,142,39.5,141.6,38.4,141,37.8,140.9,36.9,140.8,35.7,140.2,35,139.6,35.2,138.9,34.6,137.9,34.6,137,34.6,136.9,34.3,135.8,33.45,135.1,33.9,135.3,34.6,134,34.7,132.6,34.3,131.3,33.95],
  [139.8,42.2,140.3,41.4,141.2,41.8,143.2,41.9,144.5,42.95,145.8,43.4,145.2,44.2,143.5,44.2,142,45.5,141.6,44.7,141.4,43.5,140.4,43.3,139.9,42.6],
  [142,46,143.5,49,144.6,49,143,51,143.2,53.6,142.6,54.4,142.2,53.4,141.8,51.6,142.2,49.4,141.8,47.6],
  [120.1,23,120.8,21.9,121.9,25,121,25.3],
  [108.7,19.2,110.5,20,111,19.5,110,18.3,109,18.4],
  [80,9.8,81.9,7.5,81.2,6,80,6.2,79.8,8],
  [120.4,18.6,122.3,18.5,122.2,17,121.6,15.8,122.4,14.2,124.1,13.1,123.2,13,122,13.8,120.6,14.2,120.2,16.2],
  [121.9,11.9,123.2,11.9,124.4,12.6,125.6,12.4,125.6,11,125,10,123.2,9.1,122.4,9.8,122,10.6],
  [117.2,8.4,118.2,9.2,119.4,10.6,119.4,11.4,119.1,10.9,117.9,9.6],
  [122,8,123.4,8.7,125,9.4,126.5,9.3,126.3,6.5,125.5,5.8,124,6.8,123,7.6],
  [109,1.5,110,2,111.5,1.5,113,3.2,115,5,116.7,7,117.8,6.2,119.2,5.2,118.4,4.4,117.8,2.4,119,1,118,0.6,117.6,-0.6,116.5,-1.5,116.2,-3.5,114.5,-4,113,-3.2,111.6,-3.4,110.2,-2.9,109.6,-1.4,109.2,-0.4],
  [95.3,5.6,97.4,5.2,98.4,4.2,99.8,2.8,100.6,2,101.6,1.6,103.4,0,103.7,-1,104.6,-2,105.8,-3,106,-4.6,105.9,-5.8,104.6,-5.9,103.4,-4.8,102.2,-3.9,101,-2.4,100.4,-1,99.6,0.4,98.8,1.6,97.6,2.6,96.4,3.6,95.6,4.6],
  [105.2,-6.8,106.5,-6,108.5,-6.5,110.8,-6.4,112.7,-6.9,114.5,-7.8,114.5,-8.7,111,-8.3,108,-7.8,105.3,-6.9],
  [114.5,-8,117,-8.1,119,-8.2,121,-8.3,123,-8.2,122.8,-8.7,121,-8.9,119,-8.9,117,-9,115,-8.8],
  [123.5,-10.3,125,-9.2,127.3,-8.4,126.8,-8.9,125,-9.8,124,-10.4],
  [119.4,-5.6,119.5,-3.6,118.8,-2.8,119.5,-0.5,120.1,0.8,121,1.3,122.5,1,124.5,1.6,125.2,1.5,124.3,0.4,123,0.5,121.5,0.5,120.3,0.2,120.2,-0.8,121.6,-0.8,123.4,-0.9,123.2,-1.6,121.6,-1.8,122.2,-3,123.2,-4.6,122.6,-5.2,121.6,-4.6,121,-3,120.4,-3,120.5,-5.5],
  [127.5,2,128.5,1.5,128.8,0.5,128,0.2,127.5,-0.6,127.8,1],
  [127.9,-3.2,130.8,-3,130.6,-3.8,128.5,-3.6],
  [131,-0.8,132.4,-0.4,134,-0.9,135.4,-3.2,137.6,-1.6,139.6,-2.2,141,-2.6,143,-3.4,144.6,-3.9,145.8,-5,146.8,-6.4,147.6,-6.6,147.8,-8,149.2,-9.4,150.6,-10.4,149,-10.4,147.2,-10.1,146,-8.8,144.6,-7.8,143.6,-8.4,143,-9.2,141.2,-9.2,140.2,-8.2,138.8,-8.2,138,-7.4,138.6,-6.6,137.6,-5.4,135.6,-4.4,134,-3.8,132.8,-4,132,-2.8,133.2,-2.4,132.2,-2.2,131,-1.4],
  [148.3,-5.5,150,-5.2,151.5,-4.2,152.2,-4.3,151,-5.8,149,-6.2],
  [164.1,-20.2,165,-20.5,167,-22.1,166.5,-22.4,165,-21.4],
  [113.5,-22,113.6,-24.6,114.2,-26.4,113.4,-26.6,114.6,-28.8,115,-30.6,115.6,-32.6,115.2,-34.2,116.6,-35,118.2,-35,119.8,-34.4,121.8,-33.8,123.6,-33.9,124.4,-33,126.2,-32.3,128.8,-31.6,131.2,-31.5,132.6,-32,134.2,-32.8,135.2,-34.6,136,-34.8,137.4,-34,137.8,-33,138,-34.4,137.6,-35.6,138.6,-35.6,139.6,-36.6,140.6,-38,142.4,-38.4,143.6,-38.8,144.8,-38.2,146.4,-39.1,147.6,-38,149.8,-37.6,150.2,-36.2,150.8,-35,151.4,-33.6,152.4,-32.4,153.2,-30.6,153.6,-28.6,153.2,-27,153,-25.2,152,-24.6,151,-23.4,150,-22.2,149.4,-21,148.6,-20.2,147.4,-19.4,146.2,-18.6,146,-17,145.4,-15.6,145.2,-14.8,144.4,-14.2,143.6,-13.6,143.4,-12.2,142.6,-10.8,142,-11.6,141.6,-13.4,141.6,-15.4,141,-16.8,140.2,-17.6,139.2,-17.2,137.8,-16.2,136.6,-15.6,135.4,-14.8,135.8,-13.4,136.8,-12.2,136,-11.8,134.6,-12,133.4,-11.6,132.6,-11.4,131.8,-11.4,130.4,-12.4,129.6,-14.6,128.4,-15,127.4,-14,126.2,-14.2,125,-15,124.4,-16.4,123.6,-17.2,122.4,-17.6,122.2,-18.4,121.2,-19.4,119.6,-20,118.2,-20.4,117,-20.6,115.6,-21.2,114.6,-21.8],
  [144.7,-40.7,148.3,-40.9,148,-43,146.5,-43.6,145.2,-42.2],
  [172.7,-34.5,173.6,-35,174.6,-36.2,175.4,-37,175.8,-36.8,176.2,-37.6,177.4,-38,178.5,-37.7,177.9,-39.2,177,-39.4,176.8,-40.2,175.8,-41.4,175,-41.6,174.6,-41.2,175.2,-40.4,174.6,-39.8,173.8,-39.2,174.6,-38.4,174.6,-37.4],
  [172.7,-40.5,174.2,-41.2,174.2,-41.8,173.4,-42.8,172.6,-43.8,171.2,-44.4,170.6,-45.8,169.4,-46.6,168,-46.6,166.6,-46,166.6,-45.2,168,-44.2,170.2,-43.2,171.4,-41.8,172,-40.8],
];

const WATER: number[][] = [
  [47,44.3,47.3,45.7,49.3,46.6,51.5,47,53.1,46.6,53,45.3,51,44.4,51.3,43.2,52.7,42,52.9,41,54,40.8,53.8,39.5,53.9,37.4,51,36.7,49.5,37.5,48.9,38.5,49.4,40.3,48.5,41.9,47.5,43],
  [-92.1,46.7,-90,46.6,-86.5,46.4,-84.5,46.5,-84.8,47.5,-86,48.6,-88.5,48.4,-90,47.8],
  [-87.9,41.7,-86.6,41.8,-86.2,43.5,-85.5,45.3,-84.8,45.8,-86.5,45.9,-87.6,44.8,-87.8,43.5],
  [-84.6,45.9,-83.5,46.1,-81,46.1,-80.2,45.2,-80.6,44.5,-81.7,44.3,-82.4,43,-83.3,44,-83.4,44.9,-84.4,45.5],
  [-83.4,41.7,-81,41.6,-79,42.5,-79.5,42.9,-81.5,42.6,-83.1,42.1],
  [-79.8,43.3,-76.2,43.4,-76.3,44.2,-79,43.9],
  [31.6,-1,33,-0.3,34,-0.2,34.5,-1,33.5,-2.6,32,-2.6],
  [58.4,46.6,61.2,46.6,61.8,45,60.4,43.8,58.6,44.4],
  [103.8,51.6,105.6,51.8,108.6,53.6,109.8,55.6,108.4,55.2,106,52.6],
];

const TAU = Math.PI * 2;
const LAT_TOP = 84;
const LAT_BOT = -56;
const LAT_SPAN = LAT_TOP - LAT_BOT;
const LAT_MID = (LAT_TOP + LAT_BOT) / 2;
const MR = 2;
const MASK_W = 360 * MR;
const MASK_H = LAT_SPAN * MR;
const WARM: [number, number, number] = [222, 247, 255];
const ALPHAS = [0.06, 0.16, 0.3, 0.46, 0.64, 0.82, 1];
const TONES = 4;
const NORMAL_TAGS = ["HTTPS", "API", "SYNC", "EDGE", "WS"];
const HOT_TAGS = ["DDOS", "SCAN", "BRUTE", "BOT"];
let maskCache: Uint8Array | null = null;

function fillSpan(row: Uint8Array, poly: number[], lat: number, val: number, xs: number[]) {
  xs.length = 0;
  const n = poly.length / 2;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const yi = poly[i * 2 + 1];
    const yj = poly[j * 2 + 1];
    if (yi > lat !== yj > lat) {
      const xi = poly[i * 2];
      const xj = poly[j * 2];
      xs.push(xi + ((lat - yi) * (xj - xi)) / (yj - yi));
    }
  }
  xs.sort((a, b) => a - b);
  for (let k = 0; k + 1 < xs.length; k += 2) {
    const q0 = Math.max(0, Math.ceil((xs[k] + 180) * MR - 0.5));
    const q1 = Math.min(MASK_W - 1, Math.floor((xs[k + 1] + 180) * MR - 0.5));
    for (let q = q0; q <= q1; q++) row[q] = val;
  }
}

export function heroDotWorldmapMask() {
  if (maskCache) return maskCache;
  const m = new Uint8Array(MASK_W * MASK_H);
  const xs: number[] = [];
  for (let r = 0; r < MASK_H; r++) {
    const lat = LAT_TOP - (r + 0.5) / MR;
    const row = m.subarray(r * MASK_W, (r + 1) * MASK_W);
    for (let k = 0; k < LAND.length; k++) fillSpan(row, LAND[k], lat, 1, xs);
    for (let k = 0; k < WATER.length; k++) fillSpan(row, WATER[k], lat, 0, xs);
  }
  maskCache = m;
  return m;
}

function maskAt(mask: Uint8Array, lon: number, lat: number) {
  const r = Math.floor((LAT_TOP - lat) * MR);
  if (r < 0 || r >= MASK_H) return 0;
  let q = Math.floor((lon + 180) * MR);
  q = ((q % MASK_W) + MASK_W) % MASK_W;
  return mask[r * MASK_W + q];
}

export function heroDotWorldmapSnap(mask: Uint8Array, node: HeroDotWorldmapNode): HeroDotWorldmapNode {
  const interior = (lon: number, lat: number) =>
    maskAt(mask, lon, lat) === 1 &&
    maskAt(mask, lon + 0.5, lat) === 1 &&
    maskAt(mask, lon - 0.5, lat) === 1 &&
    maskAt(mask, lon, lat + 0.5) === 1 &&
    maskAt(mask, lon, lat - 0.5) === 1;
  if (interior(node.lon, node.lat)) return node;
  let best: [number, number] | null = null;
  let bestD = Infinity;
  let fallback: [number, number] | null = null;
  let fallD = Infinity;
  for (let dy = -8; dy <= 8; dy++) {
    for (let dx = -8; dx <= 8; dx++) {
      const lon = node.lon + dx * 0.5;
      const lat = node.lat + dy * 0.5;
      const d = dx * dx + dy * dy;
      if (maskAt(mask, lon, lat) !== 1) continue;
      if (d < fallD) {
        fallD = d;
        fallback = [lon, lat];
      }
      if (d < bestD && interior(lon, lat)) {
        bestD = d;
        best = [lon, lat];
      }
    }
  }
  const pick = best && bestD <= fallD + 8 ? best : fallback;
  return pick ? { name: node.name, lon: pick[0], lat: pick[1] } : node;
}

function hash(i: number, salt: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) ^ Math.imul(salt + 11, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

function hexRgb(value: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function resolveRgb(value: string, ctx: CanvasRenderingContext2D, fallback: [number, number, number]): [number, number, number] {
  const direct = hexRgb(value);
  if (direct) return direct;
  ctx.fillStyle = "#000000";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const hex = hexRgb(out);
  if (hex) return hex;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return fallback;
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#0a2540";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#0a2540" : "#ffffff";
}

function group(n: number) {
  return String(Math.max(0, Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function heroDotWorldmapRoutes(nodes: HeroDotWorldmapNode[], routes?: [string, string][]) {
  const out: [number, number][] = [];
  const seen = new Set<number>();
  const n = nodes.length;
  const add = (a: number, b: number) => {
    if (a < 0 || b < 0 || a === b) return;
    const key = Math.min(a, b) * 4096 + Math.max(a, b);
    if (seen.has(key)) return;
    seen.add(key);
    out.push([a, b]);
  };
  if (routes && routes.length) {
    const index = new Map<string, number>();
    nodes.forEach((node, i) => index.set(node.name.toLowerCase(), i));
    for (const [a, b] of routes) add(index.get(String(a).toLowerCase()) ?? -1, index.get(String(b).toLowerCase()) ?? -1);
    return out;
  }
  for (let i = 0; i < n; i++) {
    let made = 0;
    for (let t = 0; t < 24 && made < 3; t++) {
      const j = Math.floor(hash(i * 31 + t, 61) * n);
      if (j === i) continue;
      const dl = Math.abs(nodes[i].lon - nodes[j].lon);
      const dd = Math.hypot(Math.min(dl, 360 - dl), nodes[i].lat - nodes[j].lat);
      if (dd < 28) continue;
      add(i, j);
      made++;
    }
  }
  return out;
}

export interface HeroDotWorldmapArc {
  from: number;
  to: number;
  hot: boolean;
  start: number;
  travel: number;
  lift: number;
  tag: string;
  ms: number;
}

export function heroDotWorldmapArc(k: number, rate: number, nodes: HeroDotWorldmapNode[], pairs: [number, number][]): HeroDotWorldmapArc | null {
  if (!pairs.length || !nodes.length) return null;
  const p = pairs[Math.floor(hash(k, 1) * pairs.length) % pairs.length];
  const flip = hash(k, 2) < 0.5;
  const from = flip ? p[1] : p[0];
  const to = flip ? p[0] : p[1];
  const a = nodes[from];
  const b = nodes[to];
  const du = (b.lon - a.lon) / 360;
  const dv = (b.lat - a.lat) / 360;
  const dist = Math.hypot(du, dv);
  const hot = hash(k, 3) < 0.28;
  const tags = hot ? HOT_TAGS : NORMAL_TAGS;
  return {
    from,
    to,
    hot,
    start: (k + 0.15 + hash(k, 4) * 0.7) / rate,
    travel: 2.3 + dist * 3.9,
    lift: Math.min(0.17, 0.035 + dist * 0.3),
    tag: tags[Math.floor(hash(k, 5) * tags.length) % tags.length],
    ms: Math.round(14 + hash(k, 6) * hash(k, 7) * 220 + dist * 120),
  };
}

function epsAt(tick: number, rate: number) {
  const base = 8800 * Math.max(0.2, rate);
  return Math.round(base * (1 + 0.05 * Math.sin(tick * 0.9) + 0.035 * Math.sin(tick * 2.3 + 1)) + hash(tick, 90) * 140);
}

function makeGlow(rgb: [number, number, number]) {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const g = c.getContext("2d");
  if (!g) return c;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.9)`);
  grad.addColorStop(0.25, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.35)`);
  grad.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
}

function Mark() {
  return (
    <svg className="hb-hh10-mark" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1.2 2.1" strokeLinecap="round" />
      <path d="M6.5 15c2.5-6 8.5-6 11 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="6.5" cy="15" r="1.7" fill="currentColor" />
      <circle cx="17.5" cy="15" r="1.7" fill="currentColor" />
    </svg>
  );
}

const SLOTS = [0, 1, 2, 3, 4];

export function HeroDotWorldmap({
  title = "Every route, live on one map.",
  subtitle = "Live traffic and threat telemetry from 28 regions on a single flat map. Built for status pages, NOC walls and security consoles.",
  caption = "28 regions · live arcs · MIT licensed",
  command = "npx shadcn@latest add https://hyperblur.dev/r/hero-dot-worldmap.json",
  primaryCta = defaultPrimary,
  brand = "Your brand",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#ffc857",
  alert = "#ff7a66",
  density = 1,
  speed = 1,
  nodes = heroDotWorldmapCities,
  routes,
  rate = 1.4,
  showFeed = true,
  showStats = true,
  headingAs = "h1",
  onSearch,
  showBar = false,
  className = "",
  style,
  ...rest
}: HeroDotWorldmapProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const statsRef = React.useRef<HTMLDivElement>(null);
  const tipRef = React.useRef<HTMLDivElement>(null);
  const tipNameRef = React.useRef<HTMLElement>(null);
  const tipMetaRef = React.useRef<HTMLSpanElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const queueRef = React.useRef<FeedEvent[]>([]);
  const aliveRef = React.useRef(0);
  const hotRef = React.useRef(0);
  const runRef = React.useRef(0);
  const [copied, setCopied] = React.useState(false);
  const [feed, setFeed] = React.useState<FeedEvent[]>([]);
  const [tick, setTick] = React.useState(0);
  const [alive, setAlive] = React.useState(() => Math.round(Math.max(0.2, rate) * 4.8));
  const [blocked, setBlocked] = React.useState(18240);

  const safeRate = Math.min(6, Math.max(0.2, Number.isFinite(rate) ? rate : 1.4));
  const routeJson = routes ? JSON.stringify(routes) : "";
  const nodeJson = JSON.stringify(nodes);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !stage || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mult = Math.min(2, Math.max(0.2, Number.isFinite(density) ? density : 1));
    const pace = Math.max(0, Number.isFinite(speed) ? speed : 1);
    const mask = heroDotWorldmapMask();
    runRef.current++;
    const run = runRef.current;
    const parsed = JSON.parse(nodeJson) as HeroDotWorldmapNode[];
    const list = parsed.filter((n) => Number.isFinite(n.lon) && Number.isFinite(n.lat)).map((n) => heroDotWorldmapSnap(mask, n));
    const pairs = heroDotWorldmapRoutes(list, routeJson ? (JSON.parse(routeJson) as [string, string][]) : undefined);
    const nN = list.length;
    const nu = new Float32Array(nN);
    const nv = new Float32Array(nN);
    const nph = new Float32Array(nN);
    const nRoutes = new Int32Array(nN);
    for (let i = 0; i < nN; i++) {
      nu[i] = list[i].lon / 360;
      nv[i] = (list[i].lat - LAT_MID) / 360;
      nph[i] = hash(i, 20);
    }
    for (const [a, b] of pairs) {
      nRoutes[a]++;
      nRoutes[b]++;
    }
    const nsx = new Float32Array(nN);
    const nsy = new Float32Array(nN);
    const nHit = new Float32Array(nN).fill(-99);

    const acc = resolveRgb(accent, ctx, [255, 200, 87]);
    const hot = resolveRgb(alert, ctx, [255, 122, 102]);
    const fills: string[] = [];
    for (let b = 0; b < ALPHAS.length; b++) {
      for (let t = 0; t < TONES; t++) {
        const m = t / (TONES - 1);
        const r = Math.round(WARM[0] + (acc[0] - WARM[0]) * m);
        const g = Math.round(WARM[1] + (acc[1] - WARM[1]) * m);
        const bl = Math.round(WARM[2] + (acc[2] - WARM[2]) * m);
        fills.push(`rgba(${r}, ${g}, ${bl}, ${ALPHAS[b].toFixed(3)})`);
      }
    }
    const accCss = `rgb(${acc[0]}, ${acc[1]}, ${acc[2]})`;
    const hotCss = `rgb(${hot[0]}, ${hot[1]}, ${hot[2]})`;
    const warmCss = `rgb(${WARM[0]}, ${WARM[1]}, ${WARM[2]})`;
    const glowAcc = makeGlow(acc);
    const glowHot = makeGlow(hot);
    const glowWarm = makeGlow(WARM);

    let du = new Float32Array(0);
    let dv = new Float32Array(0);
    let dbase = new Float32Array(0);
    let dtone = new Uint8Array(0);
    let dsize = new Float32Array(0);
    let sx = new Float32Array(0);
    let sy = new Float32Array(0);
    let ss = new Float32Array(0);
    let bucket = new Uint8Array(0);
    let order = new Int32Array(0);
    let total = 0;
    const buckets = ALPHAS.length * TONES;
    const counts = new Int32Array(buckets);
    const starts = new Int32Array(buckets);

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let mapW = 0;
    let small = false;
    let dpr = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = reduce ? 14 : 9;
    let pointer = false;
    let ptx = 0;
    let pty = 0;
    let mx = -9999;
    let my = -9999;
    let curX = 0;
    let curY = 0;
    let hover = -1;
    let tipShown = false;
    let lastK = Math.floor(time * safeRate);
    while (lastK > -50) {
      const arc = heroDotWorldmapArc(lastK, safeRate, list, pairs);
      if (!arc || arc.start <= time) break;
      lastK--;
    }

    function pushEvent(k: number) {
      const arc = heroDotWorldmapArc(k, safeRate, list, pairs);
      if (!arc) return;
      if (arc.hot) hotRef.current++;
      queueRef.current.push({ key: run * 1000000 + k, from: list[arc.from].name, to: list[arc.to].name, tag: arc.tag, hot: arc.hot, ms: arc.ms });
      if (queueRef.current.length > 12) queueRef.current.splice(0, queueRef.current.length - 12);
    }
    queueRef.current = [];
    for (let k = lastK - 4; k <= lastK; k++) pushEvent(k);
    hotRef.current = 0;

    let tiltC = 1;
    let tiltS = 0;
    let yawC = 1;
    let yawS = 0;
    let focal = 1;
    let liftK = 1;
    let pz = 0;
    let pScale = 1;
    let qx = 0;
    let qy = 0;

    function project(u: number, v: number, lift: number) {
      const x = u * mapW;
      const y = v * mapW;
      const hh = lift * mapW * liftK;
      const up = y * tiltC + hh;
      const z0 = y * tiltS - hh * 0.45;
      const xr = x * yawC + z0 * yawS;
      const zr = -x * yawS + z0 * yawC;
      const p = focal / (focal + zr);
      pz = zr;
      pScale = p;
      qx = cx + curX * mapW * 0.012 + xr * p;
      qy = cy + curY * mapW * 0.008 - up * p;
    }

    function buildGrid() {
      const pitch = (small ? 4.2 : 5) / Math.sqrt(mult);
      const cols = Math.max(84, Math.min(400, Math.round(mapW / pitch)));
      const rows = Math.max(30, Math.round((cols * LAT_SPAN) / 360));
      const land = new Uint8Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        const lat = LAT_TOP - ((r + 0.5) * LAT_SPAN) / rows;
        for (let c = 0; c < cols; c++) {
          const lon = -180 + ((c + 0.5) * 360) / cols;
          land[r * cols + c] = maskAt(mask, lon, lat);
        }
      }
      const cap = cols * rows;
      const tu = new Float32Array(cap);
      const tv = new Float32Array(cap);
      const tb = new Float32Array(cap);
      const tt = new Uint8Array(cap);
      const ts = new Float32Array(cap);
      const dotPx = Math.min(3.4, Math.max(1.6, (mapW / cols) * 0.56));
      const sigma = 2 * 6.5 * 6.5;
      let n = 0;
      for (let r = 0; r < rows; r++) {
        const lat = LAT_TOP - ((r + 0.5) * LAT_SPAN) / rows;
        for (let c = 0; c < cols; c++) {
          const lon = -180 + ((c + 0.5) * 360) / cols;
          const idx = r * cols + c;
          const isLand = land[idx] === 1;
          if (!isLand) {
            if (r % 4 !== 2 || c % 4 !== 2) continue;
            tu[n] = lon / 360;
            tv[n] = (lat - LAT_MID) / 360;
            tb[n] = 0.12;
            tt[n] = 0;
            ts[n] = dotPx * 0.55;
            n++;
            continue;
          }
          let coast = 0;
          if (c > 0 && !land[idx - 1]) coast++;
          if (c < cols - 1 && !land[idx + 1]) coast++;
          if (r > 0 && !land[idx - cols]) coast++;
          if (r < rows - 1 && !land[idx + cols]) coast++;
          const edge = coast > 0 ? 1 : 0;
          let heat = 0;
          for (let i = 0; i < nN; i++) {
            const dl = lon - list[i].lon;
            const dd = lat - list[i].lat;
            const e = Math.exp(-(dl * dl + dd * dd) / sigma);
            if (e > heat) heat = e;
          }
          const grain = hash(idx, 33);
          tu[n] = lon / 360;
          tv[n] = (lat - LAT_MID) / 360;
          tb[n] = 0.62 + 0.2 * edge + 0.14 * heat + 0.16 * grain;
          let tone = Math.floor(heat * 0.95 * TONES);
          if (tone >= TONES) tone = TONES - 1;
          tt[n] = tone;
          ts[n] = dotPx * (1 + 0.1 * edge + 0.14 * heat);
          n++;
        }
      }
      total = n;
      du = tu;
      dv = tv;
      dbase = tb;
      dtone = tt;
      dsize = ts;
      sx = new Float32Array(n);
      sy = new Float32Array(n);
      ss = new Float32Array(n);
      bucket = new Uint8Array(n);
      order = new Int32Array(n);
    }

    function layout() {
      if (!root || !canvas || !stage || !ctx) return;
      const rect = root.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      const st = stage.getBoundingClientRect();
      const stTop = st.top - rect.top;
      const stH = st.height;
      const aspect = 360 / LAT_SPAN;
      const prevW = mapW;
      const wasSmall = small;
      small = w < 640;
      cx = w / 2;
      if (small) {
        mapW = w * 1.5;
        cy = stTop + stH / 2;
      } else {
        mapW = w;
        cy = Math.max(stTop + mapW / aspect / 2 + 6, 0);
      }
      liftK = small ? 0.75 : 1;
      focal = mapW * 2.4;
      if (Math.abs(prevW - mapW) > 0.5 || wasSmall !== small || !total) buildGrid();
    }

    function ringDots(x: number, y: number, r: number, count: number, squash: number, size: number, phase: number) {
      if (!ctx) return;
      for (let q = 0; q < count; q++) {
        const a = phase + (q / count) * TAU;
        ctx.fillRect(x + Math.cos(a) * r - size / 2, y + Math.sin(a) * r * squash - size / 2, size, size);
      }
    }

    function curve(a: number, b: number, lift: number, t: number) {
      const u = nu[a] + (nu[b] - nu[a]) * t;
      const v = nv[a] + (nv[b] - nv[a]) * t;
      project(u, v, 4 * t * (1 - t) * lift);
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const tilt = 0.05 + curY * 0.02;
      const yaw = curX * 0.015;
      tiltC = Math.cos(tilt);
      tiltS = Math.sin(tilt);
      yawC = Math.cos(yaw);
      yawS = Math.sin(yaw);
      const sc = Math.min(1.25, Math.max(0.55, mapW / 1300));
      const squash = 0.6;

      const flick = 1;

      counts.fill(0);
      const depthNorm = 1 / (mapW * 0.06);
      for (let i = 0; i < total; i++) {
        project(du[i], dv[i], 0);
        sx[i] = qx;
        sy[i] = qy;
        const near = Math.max(-1, Math.min(1, -pz * depthNorm));
        ss[i] = dsize[i] * pScale * (1 + 0.1 * near);
        let b = dbase[i] * (1 + 0.22 * near);
        const au = Math.abs(du[i]) * 2;
        if (au > 0.78) b *= 1 - ((au - 0.78) / 0.22) * 0.3;
        if (b > 0.999) b = 0.999;
        if (b < 0) b = 0;
        const bi = Math.floor(b * ALPHAS.length);
        const k = bi * TONES + dtone[i];
        bucket[i] = k;
        counts[k]++;
      }
      let acc0 = 0;
      for (let k = 0; k < buckets; k++) {
        starts[k] = acc0;
        acc0 += counts[k];
      }
      for (let i = 0; i < total; i++) order[starts[bucket[i]]++] = i;
      ctx.globalAlpha = flick;
      let pos = 0;
      for (let k = 0; k < buckets; k++) {
        const n = counts[k];
        if (!n) continue;
        ctx.fillStyle = fills[k];
        ctx.beginPath();
        for (let q = pos; q < pos + n; q++) {
          const i = order[q];
          const s = ss[i];
          ctx.rect(sx[i] - s / 2, sy[i] - s / 2, s, s);
        }
        ctx.fill();
        pos += n;
      }

      for (let i = 0; i < nN; i++) {
        project(nu[i], nv[i], 0);
        nsx[i] = qx;
        nsy[i] = qy;
      }

      hover = -1;
      if (pointer || reduce) {
        let best = (small ? 26 : 20) ** 2;
        for (let i = 0; i < nN; i++) {
          const d = (nsx[i] - mx) ** 2 + (nsy[i] - my) ** 2;
          if (d < best) {
            best = d;
            hover = i;
          }
        }
      }

      if (hover >= 0) {
        ctx.fillStyle = accCss;
        const march = reduce ? 0 : time * 0.35;
        for (const [a, b] of pairs) {
          if (a !== hover && b !== hover) continue;
          const from = hover;
          const to = a === hover ? b : a;
          const dist = Math.hypot(nu[to] - nu[from], nv[to] - nv[from]);
          const lift = Math.min(0.17, 0.035 + dist * 0.3);
          const len = mapW * (dist + lift * 1.3);
          const steps = Math.max(8, Math.floor(len / 6));
          for (let q = 0; q < steps; q++) {
            const t = ((q + (march * steps) / 3) % steps) / steps;
            curve(from, to, lift, t);
            ctx.globalAlpha = (0.16 + 0.3 * Math.sin(Math.PI * t)) * flick;
            const s = 1 * pScale;
            ctx.fillRect(qx - s / 2, qy - s / 2, s, s);
          }
        }
      }

      const kNow = Math.floor(time * safeRate);
      const kMin = Math.floor((time - 12) * safeRate) - 1;
      let liveCount = 0;
      for (let k = kMin; k <= kNow + 1; k++) {
        const arc = heroDotWorldmapArc(k, safeRate, list, pairs);
        if (!arc) break;
        const age = time - arc.start;
        const life = arc.travel * 1.52 + 1.2;
        if (age < 0 || age > life) continue;
        liveCount++;
        const dim = hover >= 0 && arc.from !== hover && arc.to !== hover ? 0.28 : 1;
        const pr = Math.min(1, age / arc.travel);
        const head = pr * pr * (3 - 2 * pr) * 0.55 + pr * 0.45;
        const trailLen = 0.5;
        const tailRaw = Math.min(1, age / arc.travel - trailLen);
        const tail = Math.max(0, tailRaw);
        const dist = Math.hypot(nu[arc.to] - nu[arc.from], nv[arc.to] - nv[arc.from]);
        const len = mapW * (dist + arc.lift * 1.3);
        const color = arc.hot ? hotCss : accCss;
        ctx.fillStyle = color;

        const fadeIn = Math.min(1, age / 0.35);
        const fadeOut = tailRaw >= 1 ? Math.max(0, 1 - (age - arc.travel * (1 + trailLen)) / 0.5) : 1;
        const ghostA = 0.32 * fadeIn * fadeOut * dim * flick;
        if (ghostA > 0.005) {
          const gSteps = Math.max(12, Math.floor(len / 4.2));
          ctx.globalAlpha = ghostA;
          for (let q = 0; q <= gSteps; q++) {
            const t = q / gSteps;
            if (t < tail) continue;
            curve(arc.from, arc.to, arc.lift, t);
            const s = 1.2 * pScale;
            ctx.fillRect(qx - s / 2, qy - s / 2, s, s);
          }
        }

        if (head > tail) {
          const span = head - tail;
          const tSteps = Math.max(8, Math.floor((len * span) / 1.8));
          for (let q = 0; q <= tSteps; q++) {
            const f = q / tSteps;
            const t = tail + span * f;
            curve(arc.from, arc.to, arc.lift, t);
            const ramp = Math.pow(f, 1.7);
            ctx.globalAlpha = Math.min(1, 0.08 + 0.95 * ramp) * dim * flick * fadeOut;
            const s = (0.95 + 0.85 * ramp) * pScale * Math.min(1.15, sc + 0.3);
            ctx.fillRect(qx - s / 2, qy - s / 2, s, s);
          }
        }

        if (pr < 1) {
          curve(arc.from, arc.to, arc.lift, head);
          const hx = qx;
          const hy = qy;
          const g = (arc.hot ? 42 : 38) * sc * pScale;
          ctx.globalAlpha = dim * flick;
          ctx.drawImage(arc.hot ? glowHot : glowAcc, hx - g / 2, hy - g / 2, g, g);
          ctx.drawImage(arc.hot ? glowHot : glowAcc, hx - g / 4, hy - g / 4, g / 2, g / 2);
          ctx.drawImage(glowWarm, hx - g / 6, hy - g / 6, g / 3, g / 3);
          ctx.fillStyle = warmCss;
          ctx.globalAlpha = dim * flick;
          const s = 2.8 * pScale;
          ctx.fillRect(hx - s / 2, hy - s / 2, s, s);
          ctx.fillStyle = color;
        } else {
          const ia = age - arc.travel;
          if (ia < 1.1) {
            const ip = ia / 1.1;
            const arrival = arc.start + arc.travel;
            if (nHit[arc.to] < arrival) nHit[arc.to] = arrival;
            const x = nsx[arc.to];
            const y = nsy[arc.to];
            const ease = 1 - Math.pow(1 - ip, 3);
            const fade = Math.pow(1 - ip, 1.4);
            ctx.globalAlpha = 0.9 * fade * dim * flick;
            ringDots(x, y, (3 + ease * 24) * sc, 26, squash, 1.4, ip * 0.6);
            ctx.globalAlpha = 0.5 * fade * dim * flick;
            ringDots(x, y, (2 + ease * 13) * sc, 16, squash, 1.2, -ip * 0.8);
            const g = 44 * sc * (0.6 + 0.4 * (1 - ip));
            ctx.globalAlpha = 0.8 * fade * dim * flick;
            ctx.drawImage(arc.hot ? glowHot : glowAcc, x - g / 2, y - g / 2, g, g);
          }
        }

        if (age < 0.5) {
          const lp = age / 0.5;
          const g = 18 * sc;
          ctx.globalAlpha = 0.7 * (1 - lp) * dim * flick;
          ctx.drawImage(arc.hot ? glowHot : glowAcc, nsx[arc.from] - g / 2, nsy[arc.from] - g / 2, g, g);
        }
      }
      aliveRef.current = liveCount;

      for (let i = 0; i < nN; i++) {
        const x = nsx[i];
        const y = nsy[i];
        const isHover = i === hover;
        const sinceHit = time - nHit[i];
        const warm = sinceHit < 2.4 ? 1 - sinceHit / 2.4 : 0;
        ctx.fillStyle = accCss;
        for (let r = 0; r < 3; r++) {
          const ph = reduce ? 0.2 + r * 0.3 : (time / 2.6 + nph[i] + r / 3) % 1;
          ctx.globalAlpha = Math.min(1, Math.pow(1 - ph, 1.6) * (0.72 + 0.3 * warm)) * flick;
          ringDots(x, y, (3 + ph * 15) * sc, 16, squash, 1.3, nph[i] * TAU);
        }
        if (isHover) {
          ctx.globalAlpha = 0.9;
          ringDots(x, y, 9 * sc + 3, 20, squash, 1.2, reduce ? 0 : time * 0.6);
        }
        const g = (isHover ? 36 : 22 + warm * 14) * sc;
        ctx.globalAlpha = (isHover ? 1 : 0.8 + 0.2 * warm) * flick;
        ctx.drawImage(glowWarm, x - g / 2, y - g / 2, g, g);
        ctx.fillStyle = warmCss;
        ctx.globalAlpha = flick;
        const s = isHover ? 3 : 2.4;
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      const tip = tipRef.current;
      if (tip) {
        if (hover >= 0) {
          const node = list[hover];
          if (tipNameRef.current) tipNameRef.current.textContent = node.name;
          if (tipMetaRef.current) {
            const ns = node.lat >= 0 ? "N" : "S";
            const ew = node.lon >= 0 ? "E" : "W";
            tipMetaRef.current.textContent = `${Math.abs(node.lat).toFixed(1)}°${ns} ${Math.abs(node.lon).toFixed(1)}°${ew} · ${nRoutes[hover]} routes`;
          }
          const tx = Math.max(84, Math.min(w - 84, nsx[hover]));
          tip.style.transform = `translate3d(${tx.toFixed(1)}px, ${nsy[hover].toFixed(1)}px, 0)`;
          if (!tipShown) {
            tip.setAttribute("data-on", "true");
            tipShown = true;
          }
        } else if (tipShown) {
          tip.setAttribute("data-on", "false");
          tipShown = false;
        }
      }
    }

    function frame(now: number) {
      raf = 0;
      const step = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      time += step * pace;
      let tx = ptx;
      let ty = pty;
      if (!pointer) {
        tx = Math.sin(now * 0.00017) * 0.5;
        ty = Math.sin(now * 0.00011 + 1.2) * 0.35;
      }
      const ease = Math.min(1, step * 2.2);
      curX += (tx - curX) * ease;
      curY += (ty - curY) * ease;
      for (;;) {
        const arc = heroDotWorldmapArc(lastK + 1, safeRate, list, pairs);
        if (!arc || arc.start > time) break;
        lastK++;
        pushEvent(lastK);
      }
      draw();
      schedule();
    }

    function schedule() {
      if (reduce || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    }

    function onMove(e: PointerEvent) {
      if (!root) return;
      const rect = root.getBoundingClientRect();
      pointer = true;
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      ptx = Math.max(-1, Math.min(1, (mx / rect.width) * 2 - 1));
      pty = Math.max(-1, Math.min(1, (my / rect.height) * 2 - 1));
      if (reduce) draw();
    }
    function onLeave() {
      pointer = false;
      mx = -9999;
      my = -9999;
      if (reduce) draw();
    }
    function onVisibility() {
      if (document.hidden) stop();
      else schedule();
    }

    layout();
    draw();

    const ro = new ResizeObserver(() => {
      layout();
      draw();
    });
    ro.observe(root);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) schedule();
      else stop();
    });
    io.observe(root);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    schedule();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [accent, alert, density, speed, safeRate, routeJson, nodeJson]);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    const flush = () => {
      const q = queueRef.current;
      if (q.length) {
        const fresh = q.splice(0, q.length).reverse();
        setFeed((prev) => fresh.concat(prev).slice(0, 5));
      }
      setAlive(aliveRef.current);
      setBlocked(18240 + hotRef.current);
    };
    const first = setTimeout(flush, 40);
    if (reduce) return () => clearTimeout(first);
    const id = setInterval(() => {
      n++;
      setTick(n);
      flush();
    }, 900);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function copy() {
    navigator.clipboard?.writeText(command).catch(() => undefined);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1600);
  }

  const Heading = headingAs;
  const vars = {
    "--hb-hh10-accent": accent,
    "--hb-hh10-alert": alert,
    "--hb-hh10-ink": inkFor(accent),
    ...style,
  } as React.CSSProperties;
  const latest = feed[0];

  return (
    <section ref={rootRef} className={`hb-hh10 ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-worldmap" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-hh10-canvas" aria-hidden="true" />
      {showBar ? (
      <header className="hb-hh10-bar">
        <a className="hb-hh10-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-hh10-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-hh10-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span />
        )}
        <div className="hb-hh10-tools">
          <button type="button" className="hb-hh10-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-hh10-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      ) : null}
      {showStats || showFeed ? (
        <div className="hb-hh10-hud">
          {showStats ? (
            <div ref={statsRef} className="hb-hh10-panel hb-hh10-stats" role="group" aria-label="Network activity">
              <div className="hb-hh10-live">
                <span className="hb-hh10-dot" aria-hidden="true" />
                <span>Live · global</span>
              </div>
              <p className="hb-hh10-num">
                <b>{group(epsAt(tick, safeRate))}</b>
                <span>events / s</span>
              </p>
              <dl className="hb-hh10-kv">
                <div>
                  <dt>Routes</dt>
                  <dd>{alive}</dd>
                </div>
                <div>
                  <dt>Blocked</dt>
                  <dd data-hot="true">{group(blocked)}</dd>
                </div>
              </dl>
              <ul className="hb-hh10-legend" aria-label="Legend">
                <li>
                  <span className="hb-hh10-sw" aria-hidden="true" />
                  Traffic
                </li>
                <li>
                  <span className="hb-hh10-sw" data-kind="hot" aria-hidden="true" />
                  Threat
                </li>
                <li>
                  <span className="hb-hh10-sw" data-kind="node" aria-hidden="true" />
                  Region
                </li>
              </ul>
              <p className="hb-hh10-latest">
                {latest ? (
                  <>
                    <b data-hot={latest.hot}>{latest.tag}</b> {latest.from} → {latest.to}
                  </>
                ) : (
                  "Listening for events"
                )}
              </p>
            </div>
          ) : (
            <span />
          )}
          {showFeed ? (
            <div className="hb-hh10-panel hb-hh10-feed" role="group" aria-label="Live event feed">
              <div className="hb-hh10-feedhead">
                <span>Live feed</span>
                <span>last 5</span>
              </div>
              <ol className="hb-hh10-list">
                {SLOTS.map((slot) => {
                  const ev = feed[slot];
                  if (!ev) {
                    return (
                      <li key={`empty-${slot}`} className="hb-hh10-row" data-empty="true">
                        <span className="hb-hh10-tag">····</span>
                        <span className="hb-hh10-route" />
                        <span className="hb-hh10-ms" />
                      </li>
                    );
                  }
                  return (
                    <li key={ev.key} className="hb-hh10-row" data-hot={ev.hot}>
                      <span className="hb-hh10-tag">{ev.tag}</span>
                      <span className="hb-hh10-route">
                        {ev.from} → {ev.to}
                      </span>
                      <span className="hb-hh10-ms">{ev.hot ? "blocked" : `${ev.ms} ms`}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : null}
        </div>
      ) : null}
      <div ref={tipRef} className="hb-hh10-tip" data-on="false" aria-hidden="true">
        <div className="hb-hh10-tipbox">
          <b ref={tipNameRef} />
          <span ref={tipMetaRef} />
        </div>
      </div>
      <div ref={stageRef} className="hb-hh10-stage" aria-hidden="true" />
      <div className="hb-hh10-foot">
        <div className="hb-hh10-copy">
          <Heading className="hb-hh10-title">{title}</Heading>
          {subtitle ? <p className="hb-hh10-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-hh10-side">
            {caption ? <p className="hb-hh10-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-hh10-row2">
                {command ? (
                  <div className="hb-hh10-cmd">
                    <span className="hb-hh10-prompt" aria-hidden="true">$</span>
                    <code className="hb-hh10-code">{command}</code>
                    <button type="button" className="hb-hh10-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
                      {copied ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="8.5" y="8.5" width="11" height="11" rx="2.2" />
                          <path d="M15.5 8.5V6.7a2.2 2.2 0 0 0-2.2-2.2H6.7a2.2 2.2 0 0 0-2.2 2.2v6.6a2.2 2.2 0 0 0 2.2 2.2h1.8" />
                        </svg>
                      )}
                      <span className="hb-hh10-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-hh10-cta" href={primaryCta.href}>
                    {primaryCta.label}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {learnMore ? (
        <a className="hb-hh10-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}
