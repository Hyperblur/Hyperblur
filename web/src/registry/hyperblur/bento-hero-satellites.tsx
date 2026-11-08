"use client";

import * as React from "react";

export interface BentoHeroSatellite {
  label: string;
  value: string;
  note: string;
  level: number;
  trend: number[];
  icon?: "sun" | "battery" | "grid" | "car" | "heat" | "coin";
}

export interface BentoHeroSatellitesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  satellites?: BentoHeroSatellite[];
  defaultIndex?: number;
  onItemSelect?: (index: number) => void;
  accent?: string;
}

const css = `
@keyframes hb-wa8-rise { from { opacity: 0; transform: translate3d(0, 14px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-wa8-swap { from { opacity: 0; transform: translate3d(0, 8px, 0); filter: blur(4px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes hb-wa8-flow { from { background-position: 0 0; } to { background-position: 24px 0; } }
@keyframes hb-wa8-flowv { from { background-position: 0 0; } to { background-position: 0 24px; } }
@keyframes hb-wa8-spin { to { transform: rotate(360deg); } }
@keyframes hb-wa8-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
.hb-wa8 {
  --hb-wa8-accent: #16a34a;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: #141414;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa8 *, .hb-wa8 *::before, .hb-wa8 *::after { box-sizing: border-box; }
.hb-wa8 em, .hb-wa8 i { font-style: normal; }
.hb-wa8-in { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa8-head { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, .8fr); align-items: end; gap: 14px 48px; margin-bottom: clamp(24px, 3.6cqi, 40px); }
.hb-wa8-eyebrow { margin: 0 0 12px; color: var(--hb-wa8-accent); font-size: 13px; font-weight: 600; }
.hb-wa8-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4.4cqi, 50px); font-weight: 600; line-height: 1.04; letter-spacing: -.035em; text-wrap: balance; }
.hb-wa8-sub { margin: 0; color: #66625a; font-size: 15.5px; line-height: 1.6; }
.hb-wa8-grid { --g: 14px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: 172px 172px 132px; grid-template-areas: "s0 hero hero s1" "s2 hero hero s3" "s4 s4 s5 s5"; gap: var(--g); }
.hb-wa8-hero { grid-area: hero; position: relative; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; gap: 20px; overflow: hidden; padding: clamp(18px, 2.6cqi, 28px); border-radius: 24px; background: #111; color: #f5f5f4; box-shadow: 0 30px 60px -30px rgba(0, 0, 0, .5), inset 0 1px 0 rgba(255, 255, 255, .08); animation: hb-wa8-rise .7s cubic-bezier(.22, 1, .36, 1) both; }
.hb-wa8-hero::before { content: ""; position: absolute; inset: -30% -10% auto auto; width: 70%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--hb-wa8-accent) 40%, transparent), transparent 70%); pointer-events: none; transition: background .5s ease; }
.hb-wa8-dial { position: relative; width: 100%; max-width: 230px; aspect-ratio: 1; justify-self: center; }
.hb-wa8-dial svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-wa8-dial circle { fill: none; stroke-width: 9; }
.hb-wa8-track { stroke: rgba(255, 255, 255, .08); }
.hb-wa8-arc { stroke: var(--hb-wa8-accent); stroke-linecap: round; stroke-dasharray: var(--hb-wa8-l) 100; transition: stroke-dasharray .9s cubic-bezier(.22, 1, .36, 1); filter: drop-shadow(0 0 8px color-mix(in srgb, var(--hb-wa8-accent) 60%, transparent)); }
.hb-wa8-ticks { position: absolute; inset: 8%; border-radius: 50%; background: repeating-conic-gradient(from 0deg, rgba(255, 255, 255, .18) 0 1deg, transparent 1deg 7.5deg); mask: radial-gradient(circle, transparent 62%, #000 63%, #000 70%, transparent 71%); animation: hb-wa8-spin 60s linear infinite; }
.hb-wa8-dval { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; }
.hb-wa8-dval strong { font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4cqi, 42px); font-weight: 600; letter-spacing: -.04em; animation: hb-wa8-swap .5s cubic-bezier(.22, 1, .36, 1) both; }
.hb-wa8-dval small { color: #a3a3a3; font-size: 12px; }
.hb-wa8-info { position: relative; display: grid; gap: 10px; animation: hb-wa8-swap .5s cubic-bezier(.22, 1, .36, 1) both; }
.hb-wa8-info small { color: #a3a3a3; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; }
.hb-wa8-info h3 { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(20px, 2.6cqi, 28px); font-weight: 600; letter-spacing: -.02em; line-height: 1.1; }
.hb-wa8-info p { margin: 0; color: #a3a3a3; font-size: 13.5px; line-height: 1.55; }
.hb-wa8-spark { width: 100%; height: 48px; overflow: visible; }
.hb-wa8-spark path { fill: none; stroke: var(--hb-wa8-accent); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; stroke-dasharray: 1; animation: hb-wa8-draw .9s cubic-bezier(.22, 1, .36, 1) both; }
.hb-wa8-spark line { stroke: rgba(255, 255, 255, .08); vector-effect: non-scaling-stroke; }
.hb-wa8-sat { position: relative; display: flex; flex-direction: column; justify-content: space-between; gap: 8px; min-width: 0; padding: 16px; border: 1px solid rgba(0, 0, 0, .08); border-radius: 20px; background: #fff; color: inherit; font: inherit; text-align: left; cursor: pointer; box-shadow: 0 1px 0 rgba(0, 0, 0, .03); animation: hb-wa8-rise .7s cubic-bezier(.22, 1, .36, 1) backwards; animation-delay: calc(var(--i) * 70ms + 120ms); transition: border-color .25s ease, box-shadow .3s ease, transform .3s cubic-bezier(.22, 1, .36, 1); }
.hb-wa8-sat:hover { transform: translate3d(0, -2px, 0); box-shadow: 0 16px 30px -20px rgba(0, 0, 0, .35); }
.hb-wa8-sat[aria-pressed="true"] { border-color: color-mix(in srgb, var(--hb-wa8-accent) 55%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wa8-accent) 14%, transparent), 0 16px 30px -20px rgba(0, 0, 0, .35); }
.hb-wa8-sat:focus-visible { outline: 2px solid var(--hb-wa8-accent); outline-offset: 3px; }
.hb-wa8-sat::after { content: ""; position: absolute; z-index: 1; background-color: transparent; opacity: .35; transition: opacity .3s ease; pointer-events: none; }
.hb-wa8-sat[data-side="r"]::after, .hb-wa8-sat[data-side="l"]::after { top: 50%; width: calc(var(--g) + 2px); height: 2px; margin-top: -1px; background-image: linear-gradient(90deg, var(--hb-wa8-accent) 0 6px, transparent 6px 12px); background-size: 12px 2px; }
.hb-wa8-sat[data-side="r"]::after { left: 100%; }
.hb-wa8-sat[data-side="l"]::after { right: 100%; }
.hb-wa8-sat[data-side="t"]::after { bottom: 100%; left: 50%; width: 2px; height: calc(var(--g) + 2px); margin-left: -1px; background-image: linear-gradient(var(--hb-wa8-accent) 0 6px, transparent 6px 12px); background-size: 2px 12px; }
.hb-wa8-sat[aria-pressed="true"]::after { opacity: 1; animation: hb-wa8-flow .6s linear infinite; }
.hb-wa8-sat[data-side="l"][aria-pressed="true"]::after { animation-direction: reverse; }
.hb-wa8-sat[data-side="t"][aria-pressed="true"]::after { animation: hb-wa8-flowv .6s linear infinite reverse; }
.hb-wa8-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.hb-wa8-ic { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 10px; background: #f3f1ea; color: #3f3c36; transition: background .3s ease, color .3s ease; }
.hb-wa8-sat[aria-pressed="true"] .hb-wa8-ic { background: var(--hb-wa8-accent); color: #fff; }
.hb-wa8-lvl { width: 46px; height: 4px; overflow: hidden; border-radius: 4px; background: #ece9e1; }
.hb-wa8-lvl i { display: block; height: 100%; width: var(--w); background: var(--hb-wa8-accent); border-radius: 4px; }
.hb-wa8-sat b { display: block; font-family: var(--font-grotesk, inherit); font-size: 22px; font-weight: 600; letter-spacing: -.03em; }
.hb-wa8-sat span.hb-wa8-lab { display: block; color: #66625a; font-size: 12.5px; }
.hb-wa8-sat[data-wide="true"] { flex-direction: row; align-items: center; }
.hb-wa8-sat[data-wide="true"] .hb-wa8-row { flex-direction: column; align-items: flex-start; gap: 10px; }
@container (max-width: 820px) {
  .hb-wa8-head { grid-template-columns: minmax(0, 1fr); }
  .hb-wa8-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: auto; grid-template-areas: "hero hero" "s0 s1" "s2 s3" "s4 s5"; }
  .hb-wa8-sat { min-height: 132px; }
  .hb-wa8-sat::after { display: none; }
}
@container (max-width: 520px) {
  .hb-wa8-hero { grid-template-columns: minmax(0, 1fr); }
  .hb-wa8-dial { max-width: 180px; }
  .hb-wa8-sat[data-wide="true"] { flex-direction: column; align-items: stretch; }
  .hb-wa8-sat[data-wide="true"] .hb-wa8-row { flex-direction: row; align-items: center; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa8 *, .hb-wa8 *::before, .hb-wa8 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultSatellites: BentoHeroSatellite[] = [
  { label: "Solar now", value: "4.2 kW", note: "Panels are running at 78% of peak under thin cloud. Expected 31 kWh by sunset.", level: 78, trend: [2, 6, 14, 25, 38, 52, 64, 72, 78, 74, 70, 66], icon: "sun" },
  { label: "Home battery", value: "86%", note: "Charged from the sun since 10:40. Enough to run the house until 07:00 tomorrow.", level: 86, trend: [40, 38, 36, 40, 48, 58, 66, 74, 80, 84, 86, 86], icon: "battery" },
  { label: "Grid export", value: "1.6 kW", note: "Selling surplus at the afternoon rate of 18¢ per kWh. 9.4 kWh exported today.", level: 42, trend: [0, 0, 4, 10, 18, 26, 34, 40, 44, 42, 40, 42], icon: "grid" },
  { label: "EV charging", value: "64%", note: "Topping up the car with solar only. Reaches 80% by 16:20 without touching the grid.", level: 64, trend: [30, 30, 32, 36, 42, 48, 52, 56, 60, 62, 63, 64], icon: "car" },
  { label: "Heat pump", value: "21.5°", note: "Pre-heating the house while power is free, then coasting through the evening peak.", level: 58, trend: [40, 44, 50, 56, 60, 62, 60, 58, 58, 57, 58, 58], icon: "heat" },
  { label: "Saved this month", value: "$148", note: "Compared with the same month on grid power only. On track for $1,620 this year.", level: 71, trend: [5, 12, 22, 30, 41, 52, 60, 74, 88, 104, 126, 148], icon: "coin" },
];

const areas = ["s0", "s1", "s2", "s3", "s4", "s5"];
const sides = ["r", "l", "r", "l", "t", "t"];

function Icon({ name }: { name: BentoHeroSatellite["icon"] }) {
  const p = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "battery":
      return <svg {...p}><rect x="3" y="7" width="16" height="10" rx="2.5" /><path d="M21 10.5v3M7 10.5v3M10.5 10.5v3" /></svg>;
    case "grid":
      return <svg {...p}><path d="M12 3 7 21M12 3l5 18M8.5 15h7M9.8 10h4.4M5 7h14" /></svg>;
    case "car":
      return <svg {...p}><path d="M5 16V11l2-5h10l2 5v5M3 16h18M7.5 16v2M16.5 16v2M5 11h14" /></svg>;
    case "heat":
      return <svg {...p}><path d="M12 14V4a2 2 0 1 0-4 0v10a4 4 0 1 0 4 0zM16 6h4M16 10h3" /></svg>;
    case "coin":
      return <svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.7-2.5 1.9 0 2.7 5 1.4 5 4.1 0 1.2-1.1 2-2.5 2-1.2 0-2.1-.5-2.6-1.3M12 6.5V8M12 16v1.5" /></svg>;
    default:
      return <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
  }
}

export function BentoHeroSatellites({
  eyebrow = "Aster home hub",
  title = "Every source of power in your home, orbiting one screen",
  subtitle = "Point at any tile and the hub in the middle tells you what it is doing, why, and what it will do next.",
  satellites = defaultSatellites,
  defaultIndex = 0,
  onItemSelect,
  accent = "#16a34a",
  className,
  style,
  ...rest
}: BentoHeroSatellitesProps) {
  const [active, setActive] = React.useState(defaultIndex);
  const list = satellites.slice(0, 6);
  const cur = list[Math.min(active, list.length - 1)];

  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    onItemSelect?.(i);
  };

  const max = Math.max(...cur.trend, 1);
  const d = cur.trend.map((v, i) => `${i === 0 ? "M" : "L"}${((i / (cur.trend.length - 1)) * 100).toFixed(2)} ${(44 - (v / max) * 40).toFixed(2)}`).join(" ");

  return (
    <section className={["hb-wa8", className].filter(Boolean).join(" ")} style={{ "--hb-wa8-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-bento-hero-satellites" precedence="default">{css}</style>
      <div className="hb-wa8-in">
        <div className="hb-wa8-head">
          <div>
            <p className="hb-wa8-eyebrow">{eyebrow}</p>
            <h2 className="hb-wa8-title">{title}</h2>
          </div>
          <p className="hb-wa8-sub">{subtitle}</p>
        </div>
        <div className="hb-wa8-grid">
          <div className="hb-wa8-hero" aria-live="polite" style={{ "--hb-wa8-l": cur.level } as React.CSSProperties}>
            <div className="hb-wa8-dial">
              <span className="hb-wa8-ticks" aria-hidden="true" />
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle className="hb-wa8-track" cx="50" cy="50" r="38" />
                <circle className="hb-wa8-arc" cx="50" cy="50" r="38" pathLength={100} />
              </svg>
              <div className="hb-wa8-dval">
                <strong key={active}>{cur.value}</strong>
                <small>{cur.level}% of capacity</small>
              </div>
            </div>
            <div key={active} className="hb-wa8-info">
              <small>Now showing</small>
              <h3>{cur.label}</h3>
              <p>{cur.note}</p>
              <svg className="hb-wa8-spark" viewBox="0 0 100 48" preserveAspectRatio="none" aria-hidden="true">
                <line x1="0" x2="100" y1="46" y2="46" />
                <path d={d} pathLength={1} />
              </svg>
            </div>
          </div>
          {list.map((s, i) => (
            <button
              key={s.label}
              type="button"
              className="hb-wa8-sat"
              data-side={sides[i]}
              data-wide={i >= 4}
              aria-pressed={i === active}
              style={{ gridArea: areas[i], "--i": i } as React.CSSProperties}
              onPointerEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
            >
              <span className="hb-wa8-row">
                <span className="hb-wa8-ic"><Icon name={s.icon} /></span>
                <span className="hb-wa8-lvl" aria-hidden="true"><i style={{ "--w": `${s.level}%` } as React.CSSProperties} /></span>
              </span>
              <span>
                <b>{s.value}</b>
                <span className="hb-wa8-lab">{s.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
