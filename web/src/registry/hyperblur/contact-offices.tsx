"use client";

import * as React from "react";

export interface ContactOffice {
  id: string;
  city: string;
  country: string;
  label: string;
  address: string[];
  timeZone: string;
  email: string;
  lon: number;
  lat: number;
}

export interface ContactOfficesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  offices?: ContactOffice[];
  defaultActive?: string;
  footnote?: string;
  onOfficeSelect?: (office: ContactOffice) => void;
  accent?: string;
}

const css = `
@keyframes hb-kf6-pulse {
  0% { transform: translate(-50%, -50%) scale(.6); opacity: .8; }
  100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
}
@keyframes hb-kf6-flow { to { stroke-dashoffset: -24; } }
@keyframes hb-kf6-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-kf6-card {
  from { opacity: 0; filter: blur(4px); translate: 0 6px; }
  to { opacity: 1; filter: blur(0); translate: 0 0; }
}
@keyframes hb-kf6-rise {
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-kf6 {
  --hb-kf6-accent: #22d3ee;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 72px 16px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kf6 *, .hb-kf6 *::before, .hb-kf6 *::after { box-sizing: border-box; }
.hb-kf6-inner { max-width: 1120px; margin: 0 auto; }
.hb-kf6-head { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 36px; }
.hb-kf6-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 14px; color: #8f8f8f; font-size: 13px; font-weight: 550; }
.hb-kf6-eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-kf6-accent); box-shadow: 0 0 12px var(--hb-kf6-accent); }
.hb-kf6-title { margin: 0; font-size: clamp(30px, 5.4cqw, 48px); font-weight: 650; line-height: 1.04; letter-spacing: -.04em; text-wrap: balance; }
.hb-kf6-sub { max-width: 440px; margin: 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-kf6-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
.hb-kf6-mapcard {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: 20px 12px 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 22px;
  background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255, 255, 255, .03), transparent 70%), #0e0e0e;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
}
.hb-kf6-map { position: relative; width: 100%; aspect-ratio: 120 / 47; }
.hb-kf6-map > svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-kf6-land { stroke: rgba(255, 255, 255, .17); stroke-width: .56; stroke-linecap: round; }
.hb-kf6-arc { fill: none; stroke: rgba(255, 255, 255, .16); stroke-width: .18; stroke-dasharray: .6 .6; animation: hb-kf6-flow 6s linear infinite; }
.hb-kf6-arc[data-on="true"] { stroke: var(--hb-kf6-accent); stroke-width: .3; stroke-dasharray: 1; animation: hb-kf6-draw .8s cubic-bezier(.4, 0, .2, 1) both; filter: drop-shadow(0 0 1px var(--hb-kf6-accent)); }
.hb-kf6-pin {
  position: absolute;
  z-index: 1;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transform: translate(-50%, -50%);
}
.hb-kf6-pin::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  border: 2px solid #0a0a0a;
  border-radius: 50%;
  background: var(--hb-kf6-accent);
  box-shadow: 0 0 10px var(--hb-kf6-accent);
  transform: translate(-50%, -50%);
  transition: width .2s ease, height .2s ease, background .2s ease;
}
.hb-kf6-pin::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border: 1px solid var(--hb-kf6-accent);
  border-radius: 50%;
  animation: hb-kf6-pulse 2.6s ease-out infinite;
  animation-delay: calc(var(--hb-kf6-i) * -330ms);
}
.hb-kf6-pin[aria-pressed="true"] { z-index: 2; }
.hb-kf6-pin[aria-pressed="true"]::before { width: 12px; height: 12px; background: #fff; }
.hb-kf6-pin:focus-visible { outline: 2px solid var(--hb-kf6-accent); outline-offset: 2px; }
.hb-kf6-pop {
  position: absolute;
  z-index: 3;
  width: 230px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 14px;
  background: rgba(20, 20, 20, .88);
  box-shadow: 0 24px 50px -20px rgba(0, 0, 0, .9), inset 0 1px 0 rgba(255, 255, 255, .06);
  backdrop-filter: blur(12px);
  pointer-events: none;
  animation: hb-kf6-card .3s ease both;
}
.hb-kf6-pop-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
.hb-kf6-pop-city { font-size: 15px; font-weight: 650; letter-spacing: -.01em; }
.hb-kf6-tag { padding: 2px 8px; border: 1px solid color-mix(in srgb, var(--hb-kf6-accent) 35%, transparent); border-radius: 999px; background: color-mix(in srgb, var(--hb-kf6-accent) 10%, transparent); color: var(--hb-kf6-accent); font-size: 11px; font-weight: 600; white-space: nowrap; }
.hb-kf6-addr { margin: 0; color: #a1a1a1; font-size: 13px; font-style: normal; line-height: 1.5; }
.hb-kf6-addr span { display: block; }
.hb-kf6-pop-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, .08); color: #8f8f8f; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-kf6-open { display: inline-flex; align-items: center; gap: 6px; }
.hb-kf6-open::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #6f6f6f; }
.hb-kf6-open[data-open="true"] { color: #86efac; }
.hb-kf6-open[data-open="true"]::before { background: #4ade80; box-shadow: 0 0 8px #4ade80; }
.hb-kf6-mapfoot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 16px; margin-top: 14px; padding: 12px 8px 0; border-top: 1px solid rgba(255, 255, 255, .06); color: #6f6f6f; font-size: 12px; }
.hb-kf6-mapfoot strong { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-kf6-list { display: flex; flex-direction: column; gap: 4px; min-width: 0; margin: 0; padding: 6px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 22px; background: #0e0e0e; list-style: none; }
.hb-kf6-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 14px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  animation: hb-kf6-rise .5s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(var(--hb-kf6-i) * 50ms);
  transition: background .2s ease, border-color .2s ease;
}
.hb-kf6-item:hover { background: rgba(255, 255, 255, .03); }
.hb-kf6-item[aria-pressed="true"] { border-color: rgba(255, 255, 255, .08); background: linear-gradient(90deg, color-mix(in srgb, var(--hb-kf6-accent) 9%, transparent), rgba(255, 255, 255, .02)); }
.hb-kf6-item:focus-visible { outline: 2px solid var(--hb-kf6-accent); outline-offset: -2px; }
.hb-kf6-code {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 10px;
  background: #151515;
  color: #a1a1a1;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .04em;
  transition: color .2s ease, border-color .2s ease;
}
.hb-kf6-item[aria-pressed="true"] .hb-kf6-code { border-color: color-mix(in srgb, var(--hb-kf6-accent) 45%, transparent); color: var(--hb-kf6-accent); }
.hb-kf6-icity { display: block; font-size: 14px; font-weight: 600; }
.hb-kf6-irole { display: block; color: #8f8f8f; font-size: 12px; }
.hb-kf6-itime { color: #8f8f8f; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; font-variant-numeric: tabular-nums; }
.hb-kf6-detail { display: none; }
.hb-kf6-mail { color: #ededed; font-size: 13px; font-weight: 550; text-decoration: none; border-radius: 4px; }
.hb-kf6-mail:hover { color: var(--hb-kf6-accent); }
.hb-kf6-mail:focus-visible { outline: 2px solid var(--hb-kf6-accent); outline-offset: 2px; }
.hb-kf6-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 639px) {
  .hb-kf6-pop { display: none; }
  .hb-kf6-detail { display: block; margin-top: 12px; padding: 14px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 14px; background: #121212; }
  .hb-kf6-pin { width: 20px; height: 20px; }
}
@container (min-width: 760px) {
  .hb-kf6-head { grid-template-columns: 1.2fr 1fr; align-items: end; gap: 40px; }
}
@container (min-width: 960px) {
  .hb-kf6 { padding: 112px 32px; }
  .hb-kf6-grid { grid-template-columns: 1.75fr 1fr; }
  .hb-kf6-mapcard { padding: 28px 20px 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kf6-arc, .hb-kf6-arc[data-on="true"], .hb-kf6-pin::after, .hb-kf6-pop, .hb-kf6-item { animation: none; }
  .hb-kf6-pin::after { opacity: 0; }
  .hb-kf6-pin::before, .hb-kf6-item, .hb-kf6-code { transition: none; }
}
`;

const land: number[][] = [
  [-168,66,-162,70,-156,71.5,-140,70,-128,70.5,-115,68.5,-95,72,-85,70,-80,73,-68,70,-62,66,-64,60,-56,52,-60,47,-66,44.5,-70,42,-75,38,-76,35,-81,31,-80,25.5,-82,27,-84,30,-89,30,-94,29.5,-97,27,-97.5,22,-95,18.5,-91,18.5,-88,21,-87,16,-83.5,15,-83,10,-79.5,9,-77.5,8,-80,7.5,-82,8.5,-86,11.5,-88,13.5,-92,14.5,-96,15.8,-101,17.5,-105.5,20,-105.5,23,-109,26,-112.5,29.5,-114.8,31.8,-117,32.5,-120.5,34.5,-122.5,37.5,-124,40.5,-124.5,43,-124,46.5,-124.7,48.4,-123,49,-127,50.5,-130,54,-134,57,-137,59,-141,60,-146,61,-150,59.5,-152,58,-157,57,-162,55,-164,54.5,-158,58.5,-162,59.8,-165,61,-166,63,-164,64,-168,66],
  [-73,78,-60,82,-30,83.5,-18,81,-20,75,-22,70,-32,68,-40,65,-43,60,-48,61,-52,64.5,-54,68,-56,72,-66,76,-73,78],
  [-120,72,-115,76,-100,78,-90,81,-70,82.5,-62,82,-75,79,-80,76,-90,74,-100,73,-110,71.5,-120,72],
  [-81,-5,-80,0,-78,2,-77.5,7,-73,11.5,-71.5,12.5,-67,10.7,-62,10.7,-60,8.5,-57,6,-52,5,-50,1,-48,-1,-44,-2.5,-38.5,-4,-35,-6,-35,-9,-37,-12,-39,-15,-39.5,-19,-41,-22,-44,-23,-48,-26,-48.5,-28.5,-52,-32,-53.5,-34,-57,-35,-57.5,-38,-62,-39,-65,-41,-64.5,-43,-67.5,-46,-66,-48,-69,-51,-68.5,-53,-71,-54,-74,-52,-75.5,-48,-74,-44,-73.5,-40,-73.5,-37,-71.5,-32,-71.5,-28,-70.5,-23,-70.2,-18.5,-75,-15,-77,-12,-79.5,-7.5,-81,-5],
  [-9.5,43,-9,39,-9,37,-6,36.2,-2,36.7,0,38.7,0.5,40.5,3.2,42,3.5,43.3,6,43.1,8.5,44.3,10.5,43,12.5,41.5,15.6,38,16,38.5,17,40.5,18.5,40,15.5,42,13,44,12.5,45.5,14,45.3,15.5,44,19.5,41.8,19.5,40,21,38,22.5,36.5,23,38,24,40.5,26,40.8,28.5,41,26.5,40,26,39,27,37,29,36.5,32,36.2,36,36.5,36,34.5,35,33,34.3,31.3,34.5,29.5,35,28,37,25,39,21.5,42.5,15,43.5,12.7,45,13,49,14.5,52,16,55,17.5,57,18.8,59.8,22.5,58.5,23.7,56.5,24.5,56,26,54,24.2,51.5,24.5,51,26,50,26.5,48.5,28.5,48,30,50,30,51.5,27.8,54.5,26.5,57,25.7,61.5,25.2,66.5,25.4,68,23.7,70,21,72.8,21,73,18,74,14.5,75.5,11,77,8.2,78.2,8.9,79.8,10.3,80.2,13.5,80,15.5,82,17,85,19.5,87,21.5,89,22,91.5,22.5,92.3,20.7,94,18,94.5,16,97.5,16.5,98.5,13,98.5,10,98.3,8,100.3,6.5,101,3,103.5,1.3,104.2,1.4,103.4,4.5,102.5,6,101,6.8,100,9,99.2,10.5,100,13.4,101,12.7,103,11,104.5,10.4,105,8.6,106.8,10.4,109,11.5,109.3,13.5,108.7,15.5,106.5,17.5,106,19.8,108,21.6,110,21,111,21.5,113.5,22.2,116.5,22.9,119,25,120,26.8,121.5,28.5,122,30,121,31.6,120.5,33,119.2,34.8,120.3,36.2,122.5,37,121,37.8,118.8,37.5,118,38.5,117.6,39,119,39.3,121,40.8,122,40.5,121.5,39,124,39.8,125.3,37.7,126.6,34.5,129.3,35.3,129.5,37,128.3,38.6,127.5,39.8,129.7,41,130.7,42.3,133,42.8,135.5,43.8,138.5,47,140.3,48.5,140.5,51,141.4,53,139,54.2,136.8,54.6,137.5,56,140,57.5,143,59.3,148,59.4,152,59,155,59.3,156.7,61.5,160,61.8,163.3,62.5,162,58,160,54.5,156.7,51,156,53,155.5,56.5,156.8,57.8,161.8,60.3,165,60.5,170,60,173,61.5,178,62.5,180,65,180,69,176,69.9,170,70,165,69.5,160,70.5,155,71,150,71.4,143,72.6,140,72.4,135,71.5,130,71,128,72.8,122,73,114,73.6,112,76,106,77,104,77.7,98,76,94,75.7,88,75.2,86,74,82,73.5,80.5,72.4,75,72.7,72.8,72.2,72,69,68,69,67,70,68.4,72.7,65,69.3,60,69.8,57,68.5,53,68.6,48.5,67.7,44,68.4,43.5,66.2,40,66.4,41,67.6,38,68.6,33,69.3,30,70,28,71,25,71.1,21,70,17,69,14.5,68,12.5,66,10.6,64,8,63,5.2,62,5,60,5.6,58.5,7,58,8.5,58.2,10.5,59.3,11.5,58.4,12.5,56.4,14,55.5,16,56.2,16.6,57.8,18.8,59.6,17.2,61.4,17.5,62.5,20.3,63.8,21.5,65,24,65.8,25.4,64.9,22.3,63.3,21.3,61.5,22.5,60.2,25,60.3,28.8,60.5,29.7,59.9,28,59.5,23.5,59.2,23.5,58.1,24.3,57.3,21.5,57.5,21,56,19.8,54.5,18.5,54.8,16,54.3,14,54,11,54,10.8,53.9,9,54.8,8.6,56.5,10.3,57.6,10.5,56.3,10.7,54.5,8.7,53.9,7,53.5,5,53.3,4,51.8,2.5,51.1,1.6,50.2,0,49.6,-1.3,49.6,-1.6,48.7,-4.6,48.6,-4.4,47.8,-2.2,47.1,-1.2,46,-1.5,43.4,-4.5,43.4,-8,43.7,-9.5,43],
  [-17,14.7,-16.5,19.5,-16,23.5,-13,27.5,-9.8,30,-9.3,32.5,-6.5,34,-5.9,35.8,-2,35.1,1,36.5,5,36.8,9.8,37.3,11,36.8,10.2,35,11,33.3,15.3,32.2,19,30.3,20,31,20.5,32.8,23.2,32.2,25,31.6,29,30.9,32,31.2,34.3,31.3,34.5,29,33,28,35.5,24,37.2,21,38.5,18,39.5,15.5,41.5,13.5,43.3,12,44.5,10.5,51,11.8,51.2,10.5,50,8,48,4.5,46,2,43,-0.5,41.5,-2,40,-3.5,39.2,-5,39.5,-7,39,-8.5,40.5,-10.5,40.5,-15,37,-17.5,35,-20,35.5,-23,32.8,-25.8,32.5,-28.5,30.5,-31,27.5,-33.5,25,-34,22,-34.3,18.5,-34.2,17.8,-32,15.2,-26.5,14.4,-22.5,11.8,-17.2,13.5,-12,13,-9,12,-6,12.3,-4.5,9.5,-1,9.8,3,8.8,4.4,6,4.3,4.5,6.3,1.5,6.1,-2,4.8,-7.5,4.4,-9.5,5.8,-12.5,7.5,-13.5,9.5,-15,11,-16.7,12.4,-17,14.7],
  [44,-25,43.3,-22,44.4,-19.5,44,-17,46.3,-15.7,49.3,-12,50.5,-15.5,49.4,-17.8,47.6,-24,45.2,-25.6,44,-25],
  [-5.7,50,-3,50.6,1.5,51.2,1.7,52.7,0.2,53.4,-0.4,54.5,-2,55.9,-1.8,57.5,-4,58.6,-5,58.6,-6.2,57.5,-5.6,56.3,-4.9,55,-3.1,54.9,-3.3,53.9,-4.6,53.3,-4.6,52.1,-5.2,51.7,-4.2,51.3,-5.7,50],
  [-10,51.6,-6,52.2,-6,53.8,-5.6,54.6,-7.3,55.3,-8.5,54.4,-10.2,54,-9.8,53,-10,51.6],
  [-24,65.5,-22,66.5,-16,66.5,-13.5,65.2,-15,64.3,-19,63.4,-22.5,63.8,-24,65.5],
  [130,31,131.5,31.5,132,33.8,135,33.5,137,34.5,140,35,140.8,37,141.5,39,142,40.5,141,41.5,140,40.5,139.5,38.5,138.5,37.5,137,36.8,135.5,35.6,133,35.5,131,34.4,130,33,130,31],
  [140,42,141,41.5,143.5,42,145.5,43.3,142,45.4,141.5,44,140,42],
  [120,18.5,122.3,18.5,122,16,124,13,126,9,126,6.5,125,6,123.8,7.6,122,7,122.5,9.5,121,11.5,120.5,14.5,120,16.5,120,18.5],
  [95.2,5.6,98,4,100.5,1.5,103.8,-1,106,-3,105.8,-5.8,104.5,-5.8,102,-4,100,-1,98.5,1.5,95.2,5.6],
  [105.2,-6.8,108,-6.3,111,-6.5,114.5,-7.7,114.4,-8.7,110,-8.1,106,-7.4,105.2,-6.8],
  [109,1.5,109.6,-1,110.2,-3,114,-4,116.2,-3.8,116.8,-1,118,1,119,5,117.5,6.9,116,6.7,115,5,113,3.2,111,1.6,109,1.5],
  [131,-1,134,-1,138,-1.5,141,-2.6,144.5,-3.8,146,-5,147.5,-6,150,-10.5,147,-10,144,-7.8,141,-9.1,138.5,-8.3,137.8,-5.3,135,-4.4,132,-2.8,131,-1],
  [113.5,-22,114,-26,115,-30,115,-34,117.9,-35,121,-33.8,124,-32.8,126,-32.3,129,-31.6,131.2,-31.5,134,-32.7,135.6,-34.8,137.5,-35,138.5,-34.7,139.6,-37,141.5,-38.4,144,-38.3,146.3,-39,148,-37.8,150,-37,150.8,-34.5,152.5,-32,153.5,-29,153,-25.5,150.8,-22.6,149,-20.5,146.3,-19,145.4,-15,143.6,-14,142.5,-10.8,141.5,-13.5,141.5,-17,140,-17.7,137.7,-16.2,135.5,-14.8,136.7,-12.2,132.6,-11.5,130,-13,129.4,-14.9,127,-13.8,125,-15,122.2,-17.5,121,-19.5,117,-20.6,114.6,-21.8,113.5,-22],
  [144.6,-40.7,148.3,-40.9,148,-43.2,146,-43.6,144.6,-40.7],
  [172.7,-34.4,174.5,-36,176,-37.5,178.5,-37.7,177,-39.5,175,-41.5,174.6,-39.8,173.8,-39.2,174.5,-38,172.7,-34.4],
  [172.7,-40.5,174.3,-41.7,173,-43.5,171,-45,169,-46.6,166.5,-46,168,-44,171,-42,172.7,-40.5],
  [79.8,6,80,9.8,81.3,8.5,81.8,7,80.6,5.9,79.8,6],
  [-85,21.9,-82,23.2,-77,22.5,-74.2,20.2,-77.7,19.9,-80,21.7,-85,21.9],
  [-74.4,18.5,-72.8,19.9,-69.9,19.7,-68.4,18.6,-71.7,17.7,-74.4,18.5],
];

const water: number[][] = [
  [-94.5,59,-93,61.5,-88,64,-82,64.5,-78,62,-77,58,-79,54,-82,52.5,-87,55.5,-92,57],
  [28,41.2,28.6,43.5,30,45.8,31.5,46.6,33.5,44.5,36.5,45.3,38.5,47,39.5,44.2,41.5,41.5,37,41.1,34.5,42,31,41.1],
  [47,44.5,49,46.5,53,47,53,45,51,44.5,51.8,42.2,53,41,54,37.5,51,36.7,49,37.6,49.5,40.4,47.5,42.5],
];

function inside(poly: number[], x: number, y: number) {
  let hit = false;
  for (let i = 0, j = poly.length - 2; i < poly.length; j = i, i += 2) {
    const xi = poly[i];
    const yi = poly[i + 1];
    const xj = poly[j];
    const yj = poly[j + 1];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const COLS = 120;
const ROWS = 47;
const STEP = 3;
const TOP = 82;

function buildDots() {
  let d = "";
  for (let r = 0; r < ROWS; r++) {
    const lat = TOP - r * STEP;
    for (let c = 0; c < COLS; c++) {
      const lon = -180 + STEP / 2 + c * STEP;
      if (land.some((p) => inside(p, lon, lat)) && !water.some((p) => inside(p, lon, lat))) d += `M${c + 0.5} ${r + 0.5}h0`;
    }
  }
  return d;
}

const DOTS = buildDots();

function project(lon: number, lat: number) {
  return { x: (lon + 180) / STEP, y: (TOP + STEP / 2 - lat) / STEP };
}

function arcPath(from: ContactOffice, to: ContactOffice) {
  const a = project(from.lon, from.lat);
  const b = project(to.lon, to.lat);
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const cx = (a.x + b.x) / 2;
  const cy = Math.min(a.y, b.y) - dist * 0.28;
  return `M${a.x.toFixed(2)} ${a.y.toFixed(2)}Q${cx.toFixed(2)} ${cy.toFixed(2)} ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

const defaultOffices: ContactOffice[] = [
  { id: "sf", city: "San Francisco", country: "United States", label: "Headquarters", address: ["500 Howard Street, Floor 4", "San Francisco, CA 94105"], timeZone: "America/Los_Angeles", email: "sf@northwind.io", lon: -122.42, lat: 37.77 },
  { id: "nyc", city: "New York", country: "United States", label: "Sales", address: ["85 Broad Street, 17th Floor", "New York, NY 10004"], timeZone: "America/New_York", email: "nyc@northwind.io", lon: -74, lat: 40.71 },
  { id: "sao", city: "São Paulo", country: "Brazil", label: "Customer success", address: ["Av. Paulista 1842, Suite 155", "São Paulo, SP 01310-200"], timeZone: "America/Sao_Paulo", email: "saopaulo@northwind.io", lon: -46.63, lat: -23.55 },
  { id: "lon", city: "London", country: "United Kingdom", label: "EMEA hub", address: ["20 Farringdon Road", "London EC1M 3HE"], timeZone: "Europe/London", email: "london@northwind.io", lon: -0.1, lat: 51.5 },
  { id: "ber", city: "Berlin", country: "Germany", label: "Engineering", address: ["Torstraße 140", "10119 Berlin"], timeZone: "Europe/Berlin", email: "berlin@northwind.io", lon: 13.4, lat: 52.52 },
  { id: "sin", city: "Singapore", country: "Singapore", label: "APAC hub", address: ["1 George Street, #10-01", "Singapore 049145"], timeZone: "Asia/Singapore", email: "sg@northwind.io", lon: 103.85, lat: 1.29 },
  { id: "tyo", city: "Tokyo", country: "Japan", label: "Engineering", address: ["1-11-1 Marunouchi, Chiyoda-ku", "Tokyo 100-6590"], timeZone: "Asia/Tokyo", email: "tokyo@northwind.io", lon: 139.76, lat: 35.68 },
  { id: "syd", city: "Sydney", country: "Australia", label: "Support", address: ["1 Martin Place, Level 12", "Sydney NSW 2000"], timeZone: "Australia/Sydney", email: "sydney@northwind.io", lon: 151.21, lat: -33.87 },
];

function localTime(now: number | null, timeZone: string) {
  if (now === null) return { text: "--:--", open: false };
  try {
    const parts = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: false, timeZone, weekday: "short" }).formatToParts(new Date(now));
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0") % 24;
    const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
    const open = hour >= 9 && hour < 18 && weekday !== "Sat" && weekday !== "Sun";
    return { text: `${hour.toString().padStart(2, "0")}:${minute}`, open };
  } catch {
    return { text: "--:--", open: false };
  }
}

function cityCode(office: ContactOffice) {
  return office.id.slice(0, 3).toUpperCase();
}

function Detail({ office, time }: { office: ContactOffice; time: { text: string; open: boolean } }) {
  return (
    <>
      <div className="hb-kf6-pop-top">
        <span className="hb-kf6-pop-city">{office.city}</span>
        <span className="hb-kf6-tag">{office.label}</span>
      </div>
      <address className="hb-kf6-addr">
        {office.address.map((line) => (
          <span key={line}>{line}</span>
        ))}
        <span>{office.country}</span>
      </address>
      <div className="hb-kf6-pop-meta">
        <span className="hb-kf6-open" data-open={time.open ? "true" : undefined}>
          {time.open ? "Open now" : "Closed"}
        </span>
        <span>{time.text} local</span>
      </div>
    </>
  );
}

export function ContactOffices({
  eyebrow = "Offices",
  title = "Eight cities, one team",
  subtitle = "Drop by for coffee or a whiteboard session. Every office keeps a desk free for customers and a fridge full of cold brew.",
  offices = defaultOffices,
  defaultActive,
  footnote = "Plus 140 people working remotely across 23 countries",
  onOfficeSelect,
  accent = "#22d3ee",
  className = "",
  style,
  ...rest
}: ContactOfficesProps) {
  const uid = React.useId();
  const [activeId, setActiveId] = React.useState(defaultActive ?? offices[0]?.id ?? "");
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const active = offices.find((o) => o.id === activeId) ?? offices[0];
  const hq = offices[0];

  function select(office: ContactOffice) {
    if (office.id === activeId) return;
    setActiveId(office.id);
    onOfficeSelect?.(office);
  }

  function handleListKey(event: React.KeyboardEvent<HTMLUListElement>) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = offices.findIndex((o) => o.id === activeId);
    const next =
      event.key === "Home" ? 0 : event.key === "End" ? offices.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + offices.length) % offices.length;
    select(offices[next]);
    event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  }

  const pos = active ? project(active.lon, active.lat) : { x: 0, y: 0 };
  const px = pos.x / COLS;
  const py = pos.y / ROWS;
  const popStyle: React.CSSProperties = {
    left: `${(px * 100).toFixed(2)}%`,
    top: `${(py * 100).toFixed(2)}%`,
    transform: `translate(${px > 0.55 ? "calc(-100% - 18px)" : "18px"}, ${py < 0.3 ? "-12%" : py > 0.62 ? "-88%" : "-50%"})`,
  };
  const activeTime = active ? localTime(now, active.timeZone) : { text: "--:--", open: false };
  const vars = { "--hb-kf6-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kf6 ${className}`} style={vars} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-contact-offices" precedence="default">{css}</style>
      <div className="hb-kf6-inner">
        <header className="hb-kf6-head">
          <div>
            {eyebrow ? (
              <p className="hb-kf6-eyebrow">
                <i aria-hidden="true" />
                {eyebrow}
              </p>
            ) : null}
            <h2 className="hb-kf6-title" id={`${uid}-title`}>
              {title}
            </h2>
          </div>
          {subtitle ? <p className="hb-kf6-sub">{subtitle}</p> : null}
        </header>
        <div className="hb-kf6-grid">
          <div className="hb-kf6-mapcard">
            <div className="hb-kf6-map">
              <svg viewBox={`0 0 ${COLS} ${ROWS}`} aria-hidden="true" focusable="false">
                <path className="hb-kf6-land" d={DOTS} />
                {hq
                  ? offices.slice(1).map((office) => (
                      <path
                        key={`${office.id}-${office.id === activeId ? "on" : "off"}`}
                        className="hb-kf6-arc"
                        data-on={office.id === activeId ? "true" : undefined}
                        pathLength={office.id === activeId ? 1 : undefined}
                        d={arcPath(hq, office)}
                      />
                    ))
                  : null}
              </svg>
              {offices.map((office, i) => {
                const p = project(office.lon, office.lat);
                return (
                  <button
                    type="button"
                    key={office.id}
                    className="hb-kf6-pin"
                    aria-label={`${office.city} office, ${office.label}`}
                    aria-pressed={office.id === activeId}
                    style={{ left: `${((p.x / COLS) * 100).toFixed(2)}%`, top: `${((p.y / ROWS) * 100).toFixed(2)}%`, "--hb-kf6-i": i } as React.CSSProperties}
                    onPointerEnter={() => select(office)}
                    onFocus={() => select(office)}
                    onClick={() => select(office)}
                  />
                );
              })}
              {active ? (
                <div className="hb-kf6-pop" style={popStyle} key={active.id} aria-hidden="true">
                  <Detail office={active} time={activeTime} />
                </div>
              ) : null}
            </div>
            {active ? (
              <div className="hb-kf6-detail" aria-live="polite">
                <Detail office={active} time={activeTime} />
              </div>
            ) : null}
            <div className="hb-kf6-mapfoot">
              {active ? (
                <span>
                  Reach {active.city} at{" "}
                  <a className="hb-kf6-mail" href={`mailto:${active.email}`}>
                    {active.email}
                  </a>
                </span>
              ) : null}
              {footnote ? <span>{footnote}</span> : null}
            </div>
          </div>
          <ul className="hb-kf6-list" aria-label="Office locations" onKeyDown={handleListKey}>
            {offices.map((office, i) => {
              const time = localTime(now, office.timeZone);
              return (
                <li key={office.id}>
                  <button
                    type="button"
                    className="hb-kf6-item"
                    aria-pressed={office.id === activeId}
                    aria-describedby={office.id === activeId ? `${uid}-addr` : undefined}
                    style={{ "--hb-kf6-i": i } as React.CSSProperties}
                    onPointerEnter={() => select(office)}
                    onClick={() => select(office)}
                  >
                    <span className="hb-kf6-code" aria-hidden="true">
                      {cityCode(office)}
                    </span>
                    <span>
                      <span className="hb-kf6-icity">{office.city}</span>
                      <span className="hb-kf6-irole">
                        {office.label} · {office.country}
                      </span>
                    </span>
                    <span className="hb-kf6-itime">
                      <span className="hb-kf6-sr">Local time </span>
                      {time.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {active ? (
            <p className="hb-kf6-sr" id={`${uid}-addr`}>
              {active.address.join(", ")}, {active.country}. {activeTime.open ? "Open now." : "Closed now."}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
