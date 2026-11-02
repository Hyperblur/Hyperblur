import type { CSSProperties } from "react";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Em, SectionHeading } from "./ui";

type Pt = [number, number];

const land: Pt[][] = [
  [[-165, 65], [-160, 71], [-140, 70], [-120, 74], [-95, 72], [-80, 73], [-62, 66], [-55, 52], [-66, 45], [-70, 42], [-76, 35], [-81, 30], [-80, 25], [-82, 28], [-84, 30], [-90, 29], [-97, 26], [-97, 20], [-92, 18], [-87, 21], [-88, 16], [-83, 10], [-79, 8], [-85, 11], [-92, 14], [-105, 20], [-110, 24], [-112, 30], [-117, 33], [-124, 40], [-124, 48], [-131, 54], [-140, 60], [-150, 60], [-158, 57], [-165, 60]],
  [[-55, 60], [-44, 60], [-20, 70], [-18, 80], [-40, 83], [-65, 80], [-58, 75], [-52, 68]],
  [[-80, 8], [-77, 8], [-62, 10], [-52, 5], [-35, -5], [-35, -9], [-39, -15], [-41, -22], [-48, -26], [-53, -34], [-58, -38], [-65, -42], [-66, -47], [-68, -52], [-72, -54], [-75, -50], [-73, -40], [-71, -30], [-70, -18], [-76, -14], [-81, -6], [-80, -1], [-77, 4]],
  [[-10, 36], [-9, 43], [-2, 44], [-4, 48], [2, 51], [8, 54], [10, 58], [5, 59], [5, 62], [14, 68], [25, 71], [40, 68], [60, 70], [70, 73], [80, 73], [100, 77], [115, 74], [130, 72], [140, 72], [160, 70], [180, 68], [180, 65], [170, 60], [163, 57], [156, 51], [155, 59], [143, 59], [135, 55], [141, 47], [135, 43], [129, 41], [127, 35], [122, 38], [118, 38], [122, 32], [121, 28], [117, 24], [110, 21], [107, 17], [109, 12], [105, 9], [100, 13], [100, 8], [103, 1], [98, 8], [98, 16], [94, 17], [92, 22], [87, 21], [80, 15], [77, 8], [73, 18], [73, 21], [67, 24], [62, 25], [57, 26], [56, 24], [59, 22], [52, 16], [45, 13], [43, 15], [37, 22], [34, 28], [32, 31], [35, 36], [30, 36], [27, 37], [26, 40], [23, 38], [22, 40], [19, 42], [13, 45], [16, 41], [18, 40], [16, 38], [12, 42], [8, 44], [3, 43], [0, 39], [-2, 37], [-6, 36]],
  [[-17, 21], [-16, 28], [-10, 30], [-6, 36], [10, 37], [11, 33], [20, 31], [32, 31], [34, 28], [43, 12], [51, 12], [51, 10], [44, 0], [40, -5], [40, -15], [35, -24], [33, -26], [28, -33], [20, -35], [18, -32], [12, -18], [13, -10], [9, -1], [9, 4], [5, 6], [-4, 5], [-8, 4], [-13, 8], [-17, 14]],
  [[44, -25], [47, -25], [50, -15], [49, -12], [44, -17]],
  [[-5, 50], [1, 51], [2, 53], [-2, 57], [-5, 58], [-6, 55], [-3, 54]],
  [[-10, 52], [-6, 52], [-6, 55], [-8, 55]],
  [[130, 31], [135, 34], [140, 35], [142, 40], [141, 45], [144, 44], [140, 41], [136, 37], [132, 35]],
  [[95, 5], [98, 4], [104, -2], [106, -6], [102, -4]],
  [[109, 1], [111, -3], [116, -4], [119, 1], [117, 7], [113, 3]],
  [[106, -6], [114, -7], [114, -8.5], [106, -7.5]],
  [[131, -1], [141, -3], [150, -10], [143, -9], [138, -8]],
  [[114, -22], [114, -34], [118, -35], [124, -33], [131, -31], [137, -35], [140, -38], [147, -39], [150, -37], [153, -32], [153, -26], [146, -19], [142, -11], [141, -17], [137, -16], [136, -12], [131, -11], [126, -14], [122, -18]],
  [[172, -34], [178, -38], [174, -41], [170, -46], [167, -46], [172, -41]],
  [[-24, 64], [-14, 64], [-14, 66], [-22, 66]],
];

const W = 1000;
const TOP = 78;
const BOTTOM = -56;
const H = ((TOP - BOTTOM) / 360) * W;

function project(lon: number, lat: number): Pt {
  return [((lon + 180) / 360) * W, ((TOP - lat) / 360) * W];
}

function inside(x: number, y: number, poly: Pt[]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

function buildDots() {
  const parts: string[] = [];
  for (let lat = TOP; lat >= BOTTOM; lat -= 3) {
    for (let lon = -180; lon < 180; lon += 3) {
      if (land.some((p) => inside(lon, lat, p))) {
        const [x, y] = project(lon + 1.5, lat);
        parts.push(`M${x.toFixed(1)} ${y.toFixed(1)}h0`);
      }
    }
  }
  return parts.join("");
}

const dots = buildDots();

const cities: Record<string, { lon: number; lat: number; label: string; dx?: number; dy?: number; anchor?: "start" | "end" | "middle" }> = {
  sf: { lon: -122.4, lat: 37.8, label: "San Francisco", dx: -8, dy: 4, anchor: "end" },
  ny: { lon: -74, lat: 40.7, label: "New York", dx: 8, dy: -6 },
  mx: { lon: -99.1, lat: 19.4, label: "Mexico City", dx: -8, dy: 4, anchor: "end" },
  sp: { lon: -46.6, lat: -23.5, label: "São Paulo", dx: 8, dy: 4 },
  ld: { lon: -0.1, lat: 51.5, label: "London", dx: -8, dy: -6, anchor: "end" },
  ls: { lon: -9.1, lat: 38.7, label: "Lisbon", dx: -8, dy: 6, anchor: "end" },
  lg: { lon: 3.4, lat: 6.5, label: "Lagos", dx: -8, dy: 4, anchor: "end" },
  nb: { lon: 36.8, lat: -1.3, label: "Nairobi", dx: 8, dy: 4 },
  db: { lon: 55.3, lat: 25.2, label: "Dubai", dx: 0, dy: -10, anchor: "middle" },
  mb: { lon: 72.8, lat: 19.1, label: "Mumbai", dx: -6, dy: 14, anchor: "middle" },
  sg: { lon: 103.8, lat: 1.35, label: "Singapore", dx: -8, dy: 12, anchor: "end" },
  tk: { lon: 139.7, lat: 35.7, label: "Tokyo", dx: 8, dy: 4 },
  sy: { lon: 151.2, lat: -33.9, label: "Sydney", dx: 8, dy: 4 },
};

const routes: [string, string][] = [
  ["sf", "ld"],
  ["ny", "sp"],
  ["ny", "ld"],
  ["mx", "ny"],
  ["ls", "sp"],
  ["ld", "lg"],
  ["ld", "db"],
  ["db", "mb"],
  ["nb", "db"],
  ["mb", "sg"],
  ["sg", "tk"],
  ["sg", "sy"],
];

function arc(a: string, b: string) {
  const [x1, y1] = project(cities[a].lon, cities[a].lat);
  const [x2, y2] = project(cities[b].lon, cities[b].lat);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const cy = my - dist * 0.32;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

const corridors = [
  { from: "US", to: "Brazil", rail: "Pix", time: "0.6s", width: 94 },
  { from: "UK", to: "Nigeria", rail: "NIP", time: "1.4s", width: 82 },
  { from: "EU", to: "India", rail: "IMPS", time: "0.9s", width: 89 },
  { from: "US", to: "Mexico", rail: "SPEI", time: "1.1s", width: 86 },
  { from: "Singapore", to: "Australia", rail: "NPP", time: "0.7s", width: 92 },
];

function WorldMap() {
  return (
    <svg viewBox={`0 -20 ${W} ${(H + 40).toFixed(0)}`} className="hbl-fn-map" role="img" aria-label="Map of live payout corridors between thirteen cities">
      <defs>
        <linearGradient id="hbl-fn-route-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6ee7b7" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
        <radialGradient id="hbl-fn-map-fade" cx="50%" cy="45%" r="60%">
          <stop offset="0.6" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
        </radialGradient>
        <mask id="hbl-fn-map-mask">
          <rect x="0" y="-20" width={W} height={H + 40} fill="url(#hbl-fn-map-fade)" />
        </mask>
      </defs>
      <path d={dots} className="hbl-fn-map-dots" strokeWidth="3.6" mask="url(#hbl-fn-map-mask)" />
      {routes.map(([a, b]) => (
        <path key={`b-${a}-${b}`} d={arc(a, b)} className="hbl-fn-route" pathLength={1} />
      ))}
      {routes.map(([a, b], i) => (
        <path
          key={`p-${a}-${b}`}
          d={arc(a, b)}
          className="hbl-fn-packet"
          pathLength={1}
          style={{ "--hbl-fn-delay": `${((i * 0.53) % 3.2).toFixed(2)}s`, "--hbl-fn-d": `${(2.6 + (i % 4) * 0.35).toFixed(2)}s` } as CSSProperties}
        />
      ))}
      {Object.entries(cities).map(([key, c], i) => {
        const [x, y] = project(c.lon, c.lat);
        return (
          <g key={key}>
            <circle cx={x} cy={y} r="4" className="hbl-fn-city-ring" style={{ "--hbl-fn-delay": `${((i * 0.37) % 2.6).toFixed(2)}s` } as CSSProperties} />
            <circle cx={x} cy={y} r="3" className="hbl-fn-city" />
            <text x={x + (c.dx ?? 8)} y={y + (c.dy ?? 4)} textAnchor={c.anchor ?? "start"} className="hbl-fn-city-label hidden sm:block">
              {c.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Payouts() {
  return (
    <section id="payouts" aria-labelledby="hbl-fn-payouts-title" className="hbl-fn-section hbl-fn-hair overflow-hidden">
      <div className="hbl-fn-glow left-1/2 top-[30%] h-[420px] w-[760px] -translate-x-1/2 bg-[#0f766e]" aria-hidden="true" />
      <div className="hbl-fn-wrap relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <FadeInView direction="right" className="min-w-0">
            <SectionHeading
              id="hbl-fn-payouts-title"
              align="left"
              eyebrow="Pay out"
              title={
                <>
                  Sellers paid <Em>before</Em> they refresh.
                </>
              }
              lead="Meridian holds licenses and local accounts in 62 countries, so payouts move over domestic instant rails instead of correspondent chains. No pre-funding per country, no batch windows."
            />
            <div className="hbl-fn-card mt-10 px-5 py-2">
              <div className="flex items-center justify-between border-b border-[rgba(148,163,184,0.16)] py-3 text-[12px] uppercase tracking-[0.08em] text-[#8193ab]">
                <span>Corridor</span>
                <span>Median settle</span>
              </div>
              {corridors.map((c) => (
                <div key={`${c.from}-${c.to}`} className="hbl-fn-corridor">
                  <span className="min-w-0 truncate text-[#eaf2ff]">
                    {c.from} <span className="text-[#6ee7b7]">→</span> {c.to}
                    <span className="ml-2 text-[12px] text-[#7d8ea8]">{c.rail}</span>
                  </span>
                  <span className="hbl-fn-bar" aria-hidden="true">
                    <span style={{ width: `${c.width}%` }} />
                  </span>
                  <span className="hbl-fn-num w-10 text-right text-[#c8d4e6]">{c.time}</span>
                </div>
              ))}
            </div>
          </FadeInView>
          <FadeInView direction="left" delay={0.1} className="min-w-0">
            <div className="relative">
              <WorldMap />
              <div className="mt-6 grid grid-cols-3 gap-3 text-center sm:mt-2">
                <div className="hbl-fn-card px-3 py-4">
                  <p className="hbl-fn-num text-[22px] font-semibold tracking-[-0.03em]">62</p>
                  <p className="mt-1 text-[12px] text-[#8193ab]">Countries</p>
                </div>
                <div className="hbl-fn-card px-3 py-4">
                  <p className="hbl-fn-num text-[22px] font-semibold tracking-[-0.03em]">24/7</p>
                  <p className="mt-1 text-[12px] text-[#8193ab]">Including holidays</p>
                </div>
                <div className="hbl-fn-card px-3 py-4">
                  <p className="hbl-fn-num text-[22px] font-semibold tracking-[-0.03em]">$0.10</p>
                  <p className="mt-1 text-[12px] text-[#8193ab]">Per payout on Scale</p>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
