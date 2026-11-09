"use client";

import * as React from "react";

export interface HeroDotEarthLink {
  label: string;
  href: string;
}

export interface HeroDotEarthProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  caption?: string;
  command?: string;
  primaryCta?: HeroDotEarthLink | null;
  brand?: string;
  nav?: HeroDotEarthLink[];
  navCta?: HeroDotEarthLink | null;
  learnMore?: HeroDotEarthLink | null;
  accent?: string;
  density?: number;
  speed?: number;
  oceanDots?: number;
  headingAs?: "h1" | "h2";
  onSearch?: () => void;
}

const css = `
@keyframes hb-ze-up {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-ze-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
}
.hb-ze {
  --hb-ze-accent: #ffb84d;
  --hb-ze-ink: #140d02;
  --hb-ze-mono: ui-monospace, "Geist Mono", SFMono-Regular, Menlo, Consolas, monospace;
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 620px;
  overflow: hidden;
  container-type: inline-size;
  background:
    radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--hb-ze-accent) 6%, transparent), transparent 70%),
    #020202;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ze *, .hb-ze *::before, .hb-ze *::after { box-sizing: border-box; }
.hb-ze-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hb-ze::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 52%;
  pointer-events: none;
  background: linear-gradient(to top, #020202 0%, rgba(2, 2, 2, .86) 38%, rgba(2, 2, 2, 0) 100%);
}
.hb-ze-bar {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 18px 32px;
}
.hb-ze-brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  justify-self: start;
  color: #f4f4f4;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  border-radius: 6px;
}
.hb-ze-mark { flex: none; color: var(--hb-ze-accent); }
.hb-ze-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-ze-link {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--hb-ze-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: color .2s ease, background-color .2s ease;
}
.hb-ze-link:hover { color: #ededed; background: rgba(255, 255, 255, .05); }
.hb-ze-tools {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}
.hb-ze-search {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-ze-search:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-ze-outline {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 999px;
  color: #ededed;
  font-family: var(--hb-ze-mono);
  font-size: 12px;
  letter-spacing: .02em;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .2s ease, background-color .2s ease;
}
.hb-ze-outline:hover { border-color: rgba(255, 255, 255, .34); background: rgba(255, 255, 255, .04); }
.hb-ze-stage {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 240px;
}
.hb-ze-foot {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 28px 40px;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 32px 76px;
}
.hb-ze-copy { min-width: 0; }
.hb-ze-title {
  max-width: 11em;
  margin: 0;
  color: #f5f5f5;
  font-size: clamp(28px, 5.4cqi, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -.045em;
  text-wrap: balance;
  animation: hb-ze-up .8s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-ze-sub {
  max-width: 34em;
  margin: 16px 0 0;
  color: #8f8f8f;
  font-size: 15px;
  line-height: 1.55;
  text-wrap: pretty;
  animation: hb-ze-up .8s .08s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-ze-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  animation: hb-ze-up .8s .16s cubic-bezier(.2, .7, .2, 1) both;
}
.hb-ze-caption {
  margin: 0;
  color: #6f6f6f;
  font-family: var(--hb-ze-mono);
  font-size: 11.5px;
  letter-spacing: .04em;
}
.hb-ze-caption b { color: var(--hb-ze-accent); font-weight: 500; }
.hb-ze-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  max-width: 100%;
}
.hb-ze-cmd {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  height: 42px;
  padding: 0 6px 0 14px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 10px;
  background: rgba(14, 14, 14, .82);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.hb-ze-prompt { flex: none; color: var(--hb-ze-accent); font-family: var(--hb-ze-mono); font-size: 12px; }
.hb-ze-code {
  min-width: 0;
  overflow: hidden;
  color: #d6d6d6;
  font-family: var(--hb-ze-mono);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-ze-copybtn {
  position: relative;
  display: inline-grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hb-ze-copybtn:hover { color: #ededed; background: rgba(255, 255, 255, .07); }
.hb-ze-copybtn[data-done="true"] { color: var(--hb-ze-accent); }
.hb-ze-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px 0 18px;
  border-radius: 10px;
  background: var(--hb-ze-accent);
  color: var(--hb-ze-ink);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.01em;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 8px 28px -10px var(--hb-ze-accent);
  transition: filter .2s ease, transform .2s ease;
}
.hb-ze-cta:hover { filter: brightness(1.08); }
.hb-ze-cta svg { transition: transform .2s ease; }
.hb-ze-cta:hover svg { transform: translateX(2px); }
.hb-ze-more {
  position: absolute;
  left: 50%;
  bottom: 18px;
  z-index: 2;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px 8px;
  border-radius: 6px;
  color: #6f6f6f;
  font-family: var(--hb-ze-mono);
  font-size: 10.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateX(-50%);
  transition: color .2s ease;
}
.hb-ze-more:hover { color: #ededed; }
.hb-ze-more svg { animation: hb-ze-bob 1.8s ease-in-out infinite; }
.hb-ze a:focus-visible, .hb-ze button:focus-visible {
  outline: 2px solid var(--hb-ze-accent);
  outline-offset: 2px;
}
.hb-ze-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@container (max-width: 760px) {
  .hb-ze-foot { grid-template-columns: minmax(0, 1fr); padding: 0 24px 72px; }
  .hb-ze-bar { padding: 16px 24px; }
}
@container (max-width: 640px) {
  .hb-ze-bar { grid-template-columns: 1fr auto; }
  .hb-ze-links, .hb-ze-search { display: none; }
  .hb-ze-stage { min-height: calc(80cqi + 24px); }
  .hb-ze-sub { font-size: 14px; }
  .hb-ze-side, .hb-ze-row { align-self: stretch; }
  .hb-ze-row { flex-direction: column; }
  .hb-ze-cta { width: 100%; }
}
@container (max-width: 360px) {
  .hb-ze-bar { padding: 14px 18px; }
  .hb-ze-foot { padding: 0 18px 68px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ze-title, .hb-ze-sub, .hb-ze-side, .hb-ze-more svg { animation: none; }
  .hb-ze-link, .hb-ze-search, .hb-ze-outline, .hb-ze-copybtn, .hb-ze-cta, .hb-ze-cta svg, .hb-ze-more { transition: none; }
  .hb-ze-cta:hover svg { transform: none; }
}
`;

const defaultNav: HeroDotEarthLink[] = [
  { label: "Docs", href: "#" },
  { label: "Examples", href: "#" },
  { label: "Kit", href: "#" },
];
const defaultNavCta: HeroDotEarthLink = { label: "Sign in", href: "#" };
const defaultPrimary: HeroDotEarthLink = { label: "Get started", href: "#" };
const defaultMore: HeroDotEarthLink = { label: "Learn more", href: "#" };

const TAU = Math.PI * 2;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const WARM: [number, number, number] = [255, 243, 224];
const ALPHAS = [0.08, 0.2, 0.36, 0.55, 0.76, 0.96];
const TONES = 4;

const LAND: number[][] = [
  [-168,66,-162,70,-156,71.3,-141,70,-128,70,-115,68.5,-108,68,-95,68.5,-94,72,-88,69.5,-82,69,-82,66,-87,64,-94,60,-93,58,-88,56.5,-82,55,-80,52,-79,55,-77,60,-78,62.2,-72,61.5,-70,59.5,-65,60,-62,57,-58,54,-56,52,-60,50,-66,50,-65,48,-61,46,-66,44.5,-70,43.5,-70,41.7,-74,40.5,-76,38,-76,35,-81,31.5,-80,27,-80,25.2,-82,26.5,-83,29.5,-86,30,-89,30,-90,29,-94,29.5,-97,27.5,-97.5,22,-96,19,-94,18.2,-91,18.5,-90.5,21,-87,21.5,-87.5,18,-88,16,-84,15.8,-83,14.5,-83.5,11,-81,9,-79,9.5,-77.5,8.5,-78,7.2,-80,7.3,-82.5,8.2,-85.5,10,-87.5,13,-91,14,-94,16,-97,15.8,-102,18,-105.5,20.5,-105.3,23.2,-109,25.5,-112,29,-114.7,31.7,-113.5,29.5,-111,26,-109.5,23,-110.5,24,-112.5,26,-114.5,28,-116.5,31,-117.1,32.5,-118.5,34,-120.6,34.5,-122.5,37.5,-124,40.5,-124,46,-124.7,48.3,-125.5,50,-128,51.5,-130,54.5,-134,57,-137,58.5,-140,59.7,-144,60,-148,60.5,-152,59.3,-154,57.5,-158,56.5,-163,54.8,-161,57.5,-165,60.5,-166,62.5,-161,64.5,-166,65],
  [-80,73.5,-72,71.5,-65,67,-62,66,-67,62.5,-72,64,-78,65,-85,70,-90,73],
  [-85,72,-80,73.5,-90,74,-100,73,-100,70,-92,72],
  [-125,72,-115,73,-105,73,-100,71,-110,69,-118,70,-124,70],
  [-73,78,-60,82,-30,83.5,-20,81,-18,76,-20,70,-24,69.5,-32,68,-40,65,-43,60,-48,61,-52,64.5,-54,68,-58,75,-68,76.5],
  [-77.4,8.6,-75.5,10.6,-72,12,-68,10.6,-64,10.5,-61,10.7,-60,8.5,-57,6,-52,5,-50,1.5,-50,0,-46,-1,-43,-2.5,-39,-3.7,-35.2,-5.5,-34.8,-8,-37,-12,-39,-17.5,-40.5,-22,-44,-23,-48,-26,-48.5,-28.5,-53,-34,-58,-34.5,-57.5,-37.5,-62,-39,-62.5,-41,-65,-41,-64.5,-43,-66,-46,-67.5,-46.5,-66,-48,-68.5,-50.5,-69,-52,-68.3,-53.3,-68,-55.2,-72,-54,-75,-50,-75.5,-47,-73.5,-43,-73.8,-39,-71.7,-33,-71.5,-30,-70.3,-23,-70.3,-18.3,-75.5,-14.5,-79,-8,-81.2,-6,-80.2,-3.5,-80.5,-1,-80,1,-78.8,1.8,-77.4,4,-77.8,7],
  [-9,37,-8.8,38.7,-9.5,38.7,-8.8,41.5,-9,43,-2,43.5,-1.5,46,-4.5,48.5,-1.5,49.5,1.5,50.5,4,51.5,5,53.3,8,55,8.2,57,10.6,57.7,10,55,11,54,14,54,19,54.5,21,55.5,21,57,24,57.2,23.5,59.3,28,59.8,30,60,23,60,21.5,61,21.3,63,25,65,24.8,65.8,22,65.7,21.5,64,17.5,62.5,17,60.5,19,59.5,16.5,57,14.5,56,13,55.5,12.5,56.5,11.5,58.8,10.5,59.5,8,58,5.5,59,5,61,7,63,10.5,64.5,14,67,16.5,69,21,70.2,26,71,31,70.3,33,69.4,41,67.3,44,66.5,44,68.5,53,68.5,60,69,68,69,68,72.5,70,73,73,72,80,73.5,88,75.3,100,77,105,77.5,113,73.8,125,73.5,130,71,140,72.5,150,71.5,160,69.7,170,70,180,69,180,65,177,62.5,170,60,164,60,162,57,162.5,55,160,53,156.7,50.9,155.5,55.5,156,57.5,160,61.5,155,59.3,150,59.5,143,59.3,136,54.7,140,53,141,51,140.5,48.5,137,46,133,43,131,42.5,129.5,40.5,128,38.6,129.4,36.5,129,35,126.5,34.5,126.5,37.2,125,39.5,124.3,40,122,40.5,121,39,122.5,37.2,119,37.2,120.7,36.5,119.2,34.8,121,32,122,30,121.5,28,119.5,25.5,117,23.2,114,22.3,110.5,21.3,109.9,20.3,108.5,21.7,106.7,20.5,105.8,19,108.5,15.5,109.3,12,107,10.4,105,8.7,104.8,10.3,103,10.5,102.5,12,100.8,13.3,99.5,10.8,100.3,7,101.5,6.8,103.5,4.5,103.5,1.5,104.2,1.4,101.3,2.8,100.4,5.5,98.3,8.5,98.6,11,97.7,16.5,94.5,17,94.3,20,92.3,21.5,91.5,22.7,89,21.9,87,21.5,86.5,19.8,84.5,18.3,82.2,16.5,80.3,15.5,80.3,13,79.9,10.3,78.5,8.9,77.4,8.1,76.2,9.7,74.8,12.7,73,17.3,72.8,19.1,72.7,21.2,70.5,20.8,69,22.3,70.5,23,68.5,23.5,67,24.8,66.5,25.4,62,25.2,57,26.5,56.3,27.2,54,26.7,51.5,27.8,50.2,30,48.5,30,48,29.4,49.8,26.5,50.2,25.3,51.5,24.3,52.5,24.2,54.5,24.4,56.3,26.2,56.4,24.8,58.6,23.5,59.8,22.5,58.5,20.5,57,18.9,55.5,17.5,52.5,16.3,49,14.2,45,12.8,43.3,12.7,42.8,15,41.5,18.5,39,21.5,38,24.5,35,28,34.8,29.5,34.2,27.8,33.3,28.5,32.6,29.9,32.3,31.3,34.2,31.3,35,33,36,35.5,36,36.6,33,36.2,30.5,36.6,29,36.5,27.5,37,26.4,38.5,26.2,40,29,41,31.5,41.2,35,42,38,41,41.5,41.5,41.5,42.5,40,43.4,38,44.5,37.3,45,35.5,45.2,33.5,44.5,32.5,45.4,33.5,46,31,46.6,30,45.5,29.6,45.2,28.8,44,28,42.7,27.9,41.9,29,41.2,26.2,40.2,25.5,40.9,24,40,23,40.3,22.8,39,24,38.2,23,36.5,22,36.5,21,38.3,20.2,39.7,19.5,41.5,18.5,42.5,16,43.5,14.5,45.2,13.7,45.6,12.3,45.3,12.4,44.3,13.6,43.5,14.5,42.2,16.1,41.9,18.5,40.2,17.2,40.3,16.6,39.7,17.1,39,16.5,38.4,15.8,38,16.1,39,15.6,40,14.8,40.7,14.2,40.8,12.5,41.5,10.5,42.8,9,44.3,7.5,43.8,6,43,4,43.4,3,42.5,3.2,41.9,0.8,41,-0.3,39.5,0.2,38.8,-0.7,37.6,-2,36.8,-4.5,36.7,-5.5,36,-6.4,36.8,-7.5,37.2],
  [32.5,31.3,30,31.2,25,31.6,20,32.8,19,30.3,16,31.2,11,33.2,10.3,33.9,11,37.1,10,37.3,8,36.9,3,36.8,-1,35.4,-5.3,35.9,-6,35.5,-9.5,32.5,-9.8,30,-13,27.5,-15,23.7,-16.5,20,-17.2,14.7,-16.5,12.3,-13.7,9.5,-11.5,7,-8,4.5,-4,5.2,1,6,3.5,6.3,6,4.3,8.5,4.5,9.8,3.5,9.5,1,9,-1,9.3,-1,11.8,-4.5,12.3,-6,13.3,-9,13.8,-11.5,13.5,-16,11.8,-17.2,12,-22,14.5,-23,15,-26.5,16.5,-28.6,18.4,-32,18.4,-34.4,20,-34.8,22.5,-34,25.6,-34,27,-33.5,30,-31.5,32.8,-27,32.8,-25.5,35.3,-24,35.5,-21.5,34.7,-19.7,40.5,-15,40.7,-10.5,39.2,-7,38.8,-5,40.2,-2.7,41.5,-1.8,43.5,1,46,2.1,48,5,51.3,10.5,51,11.9,48,11.2,44,10.4,43.1,11.6,43.4,12.7,41.8,14.5,39.5,15.5,38.5,18,37.2,21,36,23.5,34,27,32.6,29.9],
  [49.3,-12,50.5,-15.5,49.5,-19.5,47.2,-24.9,45,-25.6,43.4,-23.5,44.3,-20,44.5,-16.2,47,-15],
  [-5.5,50,1.5,51,1.7,52.8,0,53.5,-2,55.8,-2,57.5,-3.5,58.6,-5,58.6,-6,57,-5.5,55,-3,54.8,-3,53.3,-4.8,52.5,-5,51.7,-3,51.3],
  [-10,51.7,-6,52,-6,54.2,-8,55.2,-10,54.2],
  [-24,65.5,-22,66.4,-15,66.3,-13.5,65,-18,63.4,-22,63.8],
  [130.2,33.5,131.5,31.2,132.5,33,134.7,33.7,135.7,33.5,137,34.6,139.5,35,140.9,35.7,141.8,38.3,142,40,141.2,41.4,140,41,139.8,39.5,139,38,137,37,136.5,36.2,135.5,35.7,133,35.5,131,34.6],
  [140,42,141.5,41.8,145.5,43.3,143.5,44.2,141.5,45.4,141.5,43.5],
  [142,46,143.5,49,143,54,142.5,54,142,50],
  [120.1,23,121,22,121.9,25,121,25.3],
  [108.7,19.2,110.5,20,111,19.5,110,18.3,109,18.4],
  [80,9.8,81.9,7.5,81.2,6,80,6.2,79.8,8],
  [120.4,18.6,122.3,18.5,121.8,16,124.1,13.1,122,13.8,120.6,14.2,120.2,16.2],
  [122,8,123.4,8.7,126.5,9.3,126.3,6.5,125.5,5.8,124,6.8,123,7.6],
  [109,1.5,110,2,111.5,1.5,113,3.2,115,5,116.7,7,119,5.2,118,1,116.5,-1.5,116,-3.5,114.5,-4,112,-3.3,110.2,-2.9,109.2,-0.8],
  [95.3,5.6,98,4,100.5,2.2,103.7,-1,106,-3,105.9,-5.8,104.5,-5.9,102.2,-3.9,100.5,-1,98.7,1.7,95.8,3.8],
  [105.2,-6.8,106.5,-6,108.5,-6.5,111,-6.5,112.7,-6.9,114.5,-7.8,114.5,-8.7,111,-8.3,108,-7.8,105.3,-6.9],
  [119.4,-5.5,118.9,-2.8,119.8,0.3,121,1.2,125,1.5,122,-0.7,123.3,-1.2,122.8,-4.7,121.4,-4.5,120.4,-5.5],
  [131,-0.8,134,-0.9,138,-1.7,141,-2.7,145.5,-5.3,147.5,-6,147.8,-7.8,150.5,-10.3,147,-10,144,-8,141,-9.1,138,-8.3,137.8,-5.5,135,-4.4,133,-4,132,-2.7],
  [113.5,-22,114,-26,115,-34,118,-35,123.5,-34,126,-32.3,131,-31.5,134,-32.8,135.7,-34.8,137.8,-33,138,-35.5,139.5,-36.9,141,-38.2,144,-38.3,146,-39,147.5,-38,150,-37.5,151.2,-33.9,153.2,-30,153.5,-28,153,-25,150.8,-22.5,149,-20.5,146.2,-19,145.4,-15,143.5,-14,142.5,-10.7,141.6,-13.5,141.3,-16.5,139.5,-17.5,136,-15,136.8,-12.2,133,-11.5,131,-12.3,129.5,-15,126,-14,123,-17,122.2,-18.3,121,-19.7,116.5,-20.7],
  [144.7,-40.7,148.3,-40.9,148,-43,146.5,-43.6,145.2,-42.2],
  [172.7,-34.5,175.5,-37,178.5,-37.7,176,-39.5,175,-41.6,174.8,-39.5,173.8,-39.2,174.6,-37.5],
  [172.7,-40.5,174.2,-41.5,173,-43.5,171,-44.5,169,-46.6,166.5,-46,168,-44,171.5,-41.8],
  [12.5,38,15.6,38.2,15.1,36.7,12.5,37.6],
  [8.2,41,9.7,41,9.6,39,8.4,39],
];

const MASK_W = 180;
const MASK_H = 90;
let maskCache: Uint8Array | null = null;

function insidePoly(poly: number[], lon: number, lat: number) {
  let c = false;
  const n = poly.length / 2;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = poly[i * 2];
    const yi = poly[i * 2 + 1];
    const xj = poly[j * 2];
    const yj = poly[j * 2 + 1];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

function landMask() {
  if (maskCache) return maskCache;
  const m = new Uint8Array(MASK_W * MASK_H);
  for (let r = 0; r < MASK_H; r++) {
    const lat = 90 - (r + 0.5) * (180 / MASK_H);
    for (let q = 0; q < MASK_W; q++) {
      const lon = -180 + (q + 0.5) * (360 / MASK_W);
      let land = lat < -71;
      for (let k = 0; !land && k < LAND.length; k++) if (insidePoly(LAND[k], lon, lat)) land = true;
      m[r * MASK_W + q] = land ? 1 : 0;
    }
  }
  maskCache = m;
  return m;
}

function isLand(mask: Uint8Array, x: number, y: number, z: number) {
  const lat = Math.asin(Math.max(-1, Math.min(1, y))) * (180 / Math.PI);
  const lon = -Math.atan2(z, x) * (180 / Math.PI);
  let r = Math.floor(((90 - lat) / 180) * MASK_H);
  let q = Math.floor(((lon + 180) / 360) * MASK_W);
  if (r < 0) r = 0;
  if (r >= MASK_H) r = MASK_H - 1;
  q = ((q % MASK_W) + MASK_W) % MASK_W;
  return mask[r * MASK_W + q] === 1;
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

function resolveRgb(value: string, ctx: CanvasRenderingContext2D): [number, number, number] {
  const direct = hexRgb(value);
  if (direct) return direct;
  ctx.fillStyle = "#ffb84d";
  ctx.fillStyle = value;
  const out = String(ctx.fillStyle);
  const hex = hexRgb(out);
  if (hex) return hex;
  const nums = out.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
  return [255, 184, 77];
}

function inkFor(accent: string) {
  const rgb = hexRgb(accent);
  if (!rgb) return "#140d02";
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return lum > 0.55 ? "#140d02" : "#ffffff";
}

function Mark() {
  return (
    <svg className="hb-ze-mark" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" strokeDasharray="1.4 2.2" strokeLinecap="round" />
      <ellipse cx="12" cy="12" rx="9" ry="3.2" stroke="currentColor" strokeWidth="1.6" transform="rotate(-18 12 12)" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function HeroDotEarth({
  title = "Software that reaches every continent.",
  subtitle = "Deploy once and serve every region from the nearest point of presence. Plain source you own, no runtime and no lock-in.",
  caption = "6 continents · 40 edge regions · MIT licensed",
  command = "npx shadcn@latest add https://hyperblur.dev/r/hero-dot-earth.json",
  primaryCta = defaultPrimary,
  brand = "Meridian",
  nav = defaultNav,
  navCta = defaultNavCta,
  learnMore = defaultMore,
  accent = "#ffb84d",
  density = 1,
  speed = 1,
  oceanDots = 0.14,
  headingAs = "h1",
  onSearch,
  className = "",
  style,
  ...rest
}: HeroDotEarthProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !stage || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mult = Math.min(2, Math.max(0.2, Number.isFinite(density) ? density : 1));
    const oceanKeep = Math.min(1, Math.max(0, Number.isFinite(oceanDots) ? oceanDots : 0.14));
    const pace = Math.max(0, Number.isFinite(speed) ? speed : 1);

    const nGen = Math.round(14000 * mult);
    const nDust = Math.round(240 * Math.min(1.4, mult));
    const mask = landMask();
    const gx = new Float32Array(nGen);
    const gy = new Float32Array(nGen);
    const gz = new Float32Array(nGen);
    const gl = new Uint8Array(nGen);
    let kept = 0;
    for (let i = 0; i < nGen; i++) {
      const yy = 1 - (2 * (i + 0.5)) / nGen;
      const r = Math.sqrt(Math.max(0, 1 - yy * yy));
      const th = i * GOLDEN;
      const px = Math.cos(th) * r;
      const pz = Math.sin(th) * r;
      const land = isLand(mask, px, yy, pz);
      if (!land && hash(i, 7) > oceanKeep) continue;
      gx[kept] = px;
      gy[kept] = yy;
      gz[kept] = pz;
      gl[kept] = land ? 1 : 0;
      kept++;
    }
    const nBase = kept;
    const total = nBase;

    const bx = gx;
    const by = gy;
    const bz = gz;
    const bl = gl;
    const bs = new Float32Array(total);
    for (let i = 0; i < nBase; i++) bs[i] = 0.75 + hash(i, 3) * 0.45;
    const da = new Float32Array(nDust);
    const dr = new Float32Array(nDust);
    const dz = new Float32Array(nDust);
    const dp = new Float32Array(nDust);
    const dt = new Float32Array(nDust);
    for (let k = 0; k < nDust; k++) {
      da[k] = hash(k, 41) * TAU;
      const u = hash(k, 42);
      dr[k] = 1.08 + u * u * 1.25;
      dz[k] = 0.25 + hash(k, 43) * 0.75;
      dp[k] = hash(k, 44) * TAU;
      dt[k] = 0.4 + hash(k, 45) * 1.4;
    }

    const sx = new Float32Array(total);
    const sy = new Float32Array(total);
    const ss = new Float32Array(total);
    const bucket = new Uint8Array(total);
    const order = new Int32Array(total);
    const buckets = ALPHAS.length * TONES;
    const counts = new Int32Array(buckets);
    const starts = new Int32Array(buckets);

    const acc = resolveRgb(accent, ctx);
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
    const glowA = `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0.10)`;
    const glowB = `rgba(${acc[0]}, ${acc[1]}, ${acc[2]}, 0)`;

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let dpr = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = 0;
    let pointer = false;
    let ptx = 0;
    let pty = 0;
    let curX = 0;
    let curY = 0;

    function layout() {
      if (!root || !canvas || !stage || !ctx) return;
      const rect = root.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      cx = w / 2;
      if (w < 640) {
        const st = stage.getBoundingClientRect();
        R = w * 0.38;
        cy = st.top - rect.top + st.height / 2;
      } else {
        R = Math.min(w * 0.3, h * 0.42);
        cy = h * 0.44;
      }
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.45);
      glow.addColorStop(0, glowA);
      glow.addColorStop(1, glowB);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const spin = -1.15 + time * 0.09 * pace + curX * 0.45;
      const tiltX = 0.34 + curY * 0.3;
      const tiltZ = 0.4;
      const cY = Math.cos(spin);
      const sY = Math.sin(spin);
      const cX = Math.cos(tiltX);
      const sX = Math.sin(tiltX);
      const cZ = Math.cos(tiltZ);
      const sZ = Math.sin(tiltZ);
      const ox = curX * R * 0.05;
      const oy = curY * R * 0.04;

      counts.fill(0);
      for (let i = 0; i < total; i++) {
        const x = bx[i];
        const y = by[i];
        const z = bz[i];
        const x1 = x * cY + z * sY;
        const z1 = -x * sY + z * cY;
        const y2 = y * cX - z1 * sX;
        const z2 = y * sX + z1 * cX;
        const x3 = x1 * cZ - y2 * sZ;
        const y3 = x1 * sZ + y2 * cZ;
        const p = 1 + z2 * 0.07;
        sx[i] = cx + ox + x3 * R * p;
        sy[i] = cy + oy - y3 * R * p;
        const front = (z2 + 1) * 0.5;
        const rim = z2 > -0.08 ? Math.exp(-(z2 * z2) / 0.01) : 0;
        let b = bl[i] ? 0.34 + 0.5 * front + 0.5 * rim : (0.04 + 0.62 * front * front + 0.5 * rim) * 0.3;
        if (b > 0.999) b = 0.999;
        const bi = Math.floor(b * ALPHAS.length);
        const rr = x3 * x3 + y3 * y3;
        let ti = Math.floor(rr * rr * TONES);
        if (ti >= TONES) ti = TONES - 1;
        let s = bs[i] * (0.62 + 0.55 * front + 0.25 * rim);
        s *= bl[i] ? 1.18 : 0.8;
        if (s > 1.4) s = 1.4;
        if (s < 0.6) s = 0.6;
        ss[i] = s;
        const k = bi * TONES + ti;
        bucket[i] = k;
        counts[k]++;
      }
      let acc0 = 0;
      for (let k = 0; k < buckets; k++) {
        starts[k] = acc0;
        acc0 += counts[k];
      }
      for (let i = 0; i < total; i++) order[starts[bucket[i]]++] = i;

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

      ctx.fillStyle = "rgb(236, 226, 210)";
      const swirl = time * 0.012 * pace;
      for (let k = 0; k < nDust; k++) {
        const a = da[k] + swirl * (1.6 - dr[k] * 0.5);
        const px = cx + Math.cos(a) * dr[k] * R + curX * dz[k] * 18;
        const py = cy + Math.sin(a) * dr[k] * R * 0.92 + curY * dz[k] * 12;
        if (px < -4 || px > w + 4 || py < -4 || py > h + 4) continue;
        const twinkle = reduce ? 1 : 0.55 + 0.45 * Math.sin(time * dt[k] + dp[k]);
        ctx.globalAlpha = (0.08 + 0.32 * dz[k]) * twinkle;
        const s = 0.6 + dz[k] * 0.7;
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    }

    function frame(now: number) {
      raf = 0;
      const step = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      time += step;
      let tx = ptx;
      let ty = pty;
      if (!pointer) {
        tx = Math.sin(time * 0.21) * 0.45;
        ty = Math.sin(time * 0.13 + 1.2) * 0.25;
      }
      const ease = Math.min(1, step * 2.4);
      curX += (tx - curX) * ease;
      curY += (ty - curY) * ease;
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
      ptx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      pty = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
    }
    function onLeave() {
      pointer = false;
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
  }, [accent, density, speed, oceanDots]);

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
  const vars = { "--hb-ze-accent": accent, "--hb-ze-ink": inkFor(accent), ...style } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-ze ${className}`} style={vars} {...rest}>
      <style href="hb-hero-dot-earth" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-ze-canvas" aria-hidden="true" />
      <header className="hb-ze-bar">
        <a className="hb-ze-brand" href="#">
          <Mark />
          <span>{brand}</span>
        </a>
        {nav.length ? (
          <nav aria-label="Primary">
            <ul className="hb-ze-links">
              {nav.map((item) => (
                <li key={item.label}>
                  <a className="hb-ze-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span />
        )}
        <div className="hb-ze-tools">
          <button type="button" className="hb-ze-search" aria-label="Search" onClick={onSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </button>
          {navCta ? (
            <a className="hb-ze-outline" href={navCta.href}>
              {navCta.label}
            </a>
          ) : null}
        </div>
      </header>
      <div ref={stageRef} className="hb-ze-stage" aria-hidden="true" />
      <div className="hb-ze-foot">
        <div className="hb-ze-copy">
          <Heading className="hb-ze-title">{title}</Heading>
          {subtitle ? <p className="hb-ze-sub">{subtitle}</p> : null}
        </div>
        {caption || command || primaryCta ? (
          <div className="hb-ze-side">
            {caption ? <p className="hb-ze-caption">{caption}</p> : null}
            {command || primaryCta ? (
              <div className="hb-ze-row">
                {command ? (
                  <div className="hb-ze-cmd">
                    <span className="hb-ze-prompt" aria-hidden="true">$</span>
                    <code className="hb-ze-code">{command}</code>
                    <button type="button" className="hb-ze-copybtn" data-done={copied} onClick={copy} aria-label={copied ? "Copied" : "Copy command"}>
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
                      <span className="hb-ze-sr" aria-live="polite">{copied ? "Copied" : ""}</span>
                    </button>
                  </div>
                ) : null}
                {primaryCta ? (
                  <a className="hb-ze-cta" href={primaryCta.href}>
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
        <a className="hb-ze-more" href={learnMore.href}>
          <span>{learnMore.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      ) : null}
    </section>
  );
}
