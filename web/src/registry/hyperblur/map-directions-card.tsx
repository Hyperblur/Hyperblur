"use client";

import * as React from "react";

export interface MapDirectionsLabels {
  openMaps: string;
  openWaze: string;
  mapLabel: string;
  you: string;
}

export interface MapDirectionsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  address?: string;
  lat?: number;
  lng?: number;
  hours?: string;
  status?: "open" | "closing" | "closed";
  distance?: string;
  streets?: string[];
  showRoute?: boolean;
  appearance?: "dark" | "light";
  accent?: string;
  labels?: Partial<MapDirectionsLabels>;
  onDirections?: (app: "maps" | "waze", href: string) => void;
}

const defaultLabels: MapDirectionsLabels = {
  openMaps: "Open in Maps",
  openWaze: "Open in Waze",
  mapLabel: "Map showing {name}",
  you: "You",
};

export function buildMapsHref(address: string, lat?: number, lng?: number): string {
  const query = typeof lat === "number" && typeof lng === "number" ? `${lat},${lng}` : address;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function buildWazeHref(address: string, lat?: number, lng?: number): string {
  if (typeof lat === "number" && typeof lng === "number") {
    return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  }
  return `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;
}

const css = `
.hb-od2 {
  --hb-od2-accent: #2f7bff;
  --hb-od2-bg: #111111;
  --hb-od2-line: #262626;
  --hb-od2-text: #ededed;
  --hb-od2-muted: #8f8f8f;
  --hb-od2-land: #15171c;
  --hb-od2-block: #1c1f26;
  --hb-od2-road: #2b2f39;
  --hb-od2-major: #3a3f4b;
  --hb-od2-park: #17291f;
  --hb-od2-water: #142235;
  --hb-od2-label: #6c7280;
  box-sizing: border-box;
  container-type: inline-size;
  width: 100%;
  color: var(--hb-od2-text);
  font-family: inherit;
  font-size: 12px;
  line-height: 1.4;
}
.hb-od2[data-appearance="light"] {
  --hb-od2-bg: #ffffff;
  --hb-od2-line: #e6e4de;
  --hb-od2-text: #151515;
  --hb-od2-muted: #6d6d6d;
  --hb-od2-land: #f1efe9;
  --hb-od2-block: #e6e3da;
  --hb-od2-road: #ffffff;
  --hb-od2-major: #ffffff;
  --hb-od2-park: #d7ebd2;
  --hb-od2-water: #cfe2f5;
  --hb-od2-label: #8a877f;
}
.hb-od2 *, .hb-od2 *::before, .hb-od2 *::after { box-sizing: border-box; }
.hb-od2-card {
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;
  border: 1px solid var(--hb-od2-line);
  border-radius: 18px;
  background: var(--hb-od2-bg);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
.hb-od2-map {
  position: relative;
  min-height: 132px;
  overflow: hidden;
  background: var(--hb-od2-land);
}
.hb-od2-map > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.hb-od2-route {
  fill: none;
  stroke: var(--hb-od2-accent);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 220;
  stroke-dashoffset: 220;
  animation: hb-od2-draw 1.4s 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.hb-od2-glow { fill: none; stroke: var(--hb-od2-accent); stroke-width: 7; stroke-linecap: round; opacity: 0.16; }
.hb-od2-me { fill: #ffffff; stroke: var(--hb-od2-accent); stroke-width: 2.4; }
.hb-od2-mehalo { fill: var(--hb-od2-accent); opacity: 0.18; }
.hb-od2-pinbody {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.35));
  animation: hb-od2-drop 0.7s 0.15s cubic-bezier(0.3, 1.5, 0.5, 1) both;
}
.hb-od2-shadow {
  fill: rgba(0, 0, 0, 0.35);
  transform-box: fill-box;
  transform-origin: center;
  animation: hb-od2-shade 0.7s 0.15s cubic-bezier(0.3, 1.5, 0.5, 1) both;
}
.hb-od2-ring {
  fill: none;
  stroke: var(--hb-od2-accent);
  stroke-width: 1.2;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: hb-od2-ring 2.4s 1s ease-out infinite;
}
.hb-od2-chip {
  position: absolute;
  left: 10px;
  top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  padding: 0 9px;
  border: 1px solid color-mix(in srgb, var(--hb-od2-text) 12%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-od2-bg) 82%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--hb-od2-text);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.hb-od2-chip svg { color: var(--hb-od2-accent); }
.hb-od2-info {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
  padding: 12px 13px;
}
.hb-od2-name {
  margin: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-od2-addr {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: var(--hb-od2-muted);
  font-size: 11.5px;
  font-style: normal;
  line-height: 1.45;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.hb-od2-hours {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  white-space: nowrap;
}
.hb-od2-hours span:last-child { overflow: hidden; text-overflow: ellipsis; }
.hb-od2-dot {
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px color-mix(in srgb, #22c55e 20%, transparent);
}
.hb-od2-hours[data-status="closing"] .hb-od2-dot { background: #f59e0b; box-shadow: 0 0 0 3px color-mix(in srgb, #f59e0b 22%, transparent); }
.hb-od2-hours[data-status="closed"] .hb-od2-dot { background: #ef4444; box-shadow: 0 0 0 3px color-mix(in srgb, #ef4444 20%, transparent); }
.hb-od2-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
  margin-top: auto;
  padding-top: 2px;
}
.hb-od2-btn {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 29px;
  padding: 0 12px;
  border: 1px solid var(--hb-od2-line);
  border-radius: 999px;
  color: var(--hb-od2-text);
  font-size: 11.5px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.18s ease, border-color 0.18s ease, transform 0.12s ease;
}
.hb-od2-btn:hover { border-color: color-mix(in srgb, var(--hb-od2-text) 30%, transparent); background: color-mix(in srgb, var(--hb-od2-text) 5%, transparent); }
.hb-od2-btn:active { transform: scale(0.97); }
.hb-od2-btn:focus-visible { outline: 2px solid var(--hb-od2-accent); outline-offset: 2px; }
.hb-od2-btn[data-primary="true"] { border-color: transparent; background: var(--hb-od2-accent); color: #ffffff; }
.hb-od2-btn[data-primary="true"]:hover { background: color-mix(in srgb, var(--hb-od2-accent) 86%, #ffffff); }
.hb-od2-btn svg { flex: none; }
@container (min-width: 320px) {
  .hb-od2-card { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr); }
  .hb-od2-map { min-height: 168px; }
}
@container (min-width: 560px) {
  .hb-od2-card { grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); }
  .hb-od2-map { min-height: 240px; }
  .hb-od2-info { gap: 10px; padding: 22px; }
  .hb-od2-name { font-size: 17px; }
  .hb-od2-addr, .hb-od2-hours { font-size: 13px; }
  .hb-od2-actions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-od2-btn { height: 38px; font-size: 12.5px; }
}
@keyframes hb-od2-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-od2-drop {
  0% { opacity: 0; transform: translateY(-36px) scale(0.9); }
  60% { opacity: 1; }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes hb-od2-shade {
  0% { opacity: 0; transform: scale(0.3); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes hb-od2-ring {
  0% { opacity: 0.7; transform: scale(0.4); }
  100% { opacity: 0; transform: scale(1.8); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-od2-route { animation: none; stroke-dashoffset: 0; }
  .hb-od2-pinbody, .hb-od2-shadow { animation: none; }
  .hb-od2-ring { animation: none; opacity: 0; }
  .hb-od2-btn { transition: none; }
}
`;

function hash(n: number): number {
  let x = (n + 0x9e3779b9) | 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

const cols = [0, 34, 70, 108, 146, 186];
const rows = [0, 30, 62, 98, 132];

function MapArt({ streets, showRoute, you }: { streets: string[]; showRoute: boolean; you: string }) {
  const blocks: React.ReactNode[] = [];
  for (let r = 0; r < rows.length - 1; r++) {
    for (let c = 0; c < cols.length - 1; c++) {
      const i = r * 10 + c;
      if ((r === 0 && c >= 3) || (r === 1 && c === 4)) continue;
      const x = cols[c] + 5;
      const y = rows[r] + 5;
      const w = cols[c + 1] - cols[c] - 10;
      const h = rows[r + 1] - rows[r] - 10;
      const split = hash(i) > 0.55;
      if (split) {
        const cut = (w * (0.4 + hash(i + 50) * 0.2)).toFixed(1);
        blocks.push(<rect key={`${i}a`} x={x} y={y} width={cut} height={h} rx="2" />);
        blocks.push(<rect key={`${i}b`} x={(x + Number(cut) + 3).toFixed(1)} y={y} width={(w - Number(cut) - 3).toFixed(1)} height={h} rx="2" />);
      } else {
        blocks.push(<rect key={i} x={x} y={y} width={w} height={h} rx="2" />);
      }
    }
  }
  return (
    <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="200" height="160" fill="var(--hb-od2-land)" />
      <g fill="var(--hb-od2-block)">{blocks}</g>
      <path d="M113 5h70v53h-36z" fill="var(--hb-od2-park)" />
      <circle cx="160" cy="22" r="5" fill="var(--hb-od2-park)" stroke="color-mix(in srgb, #3fa45b 40%, transparent)" strokeWidth="1" />
      <circle cx="172" cy="40" r="4" fill="var(--hb-od2-park)" stroke="color-mix(in srgb, #3fa45b 40%, transparent)" strokeWidth="1" />
      <path d="M-5 152 C 40 136, 70 160, 110 146 S 170 128, 210 140 V 170 H -5 Z" fill="var(--hb-od2-water)" />
      <g stroke="var(--hb-od2-road)" strokeWidth="4" fill="none">
        {cols.slice(1, -1).map((x) => (
          <path key={`c${x}`} d={`M${x} -5V140`} />
        ))}
        {rows.slice(1).map((y) => (
          <path key={`r${y}`} d={`M-5 ${y}H205`} />
        ))}
      </g>
      <path d="M-5 128 L 205 18" stroke="var(--hb-od2-major)" strokeWidth="7" fill="none" />
      <path d="M70 -5V145" stroke="var(--hb-od2-major)" strokeWidth="6" fill="none" />
      <g fill="var(--hb-od2-label)" fontSize="5.4" fontWeight="600" letterSpacing="0.4" fontFamily="inherit">
        {streets[0] ? (
          <text x="74" y="56" transform="rotate(90 74 56)">
            {streets[0].toUpperCase()}
          </text>
        ) : null}
        {streets[1] ? (
          <text x="128" y="54" transform="rotate(-27.6 128 54)">
            {streets[1].toUpperCase()}
          </text>
        ) : null}
        {streets[2] ? (
          <text x="8" y="95.5">
            {streets[2].toUpperCase()}
          </text>
        ) : null}
      </g>
      {showRoute ? (
        <g>
          <path className="hb-od2-glow" d="M146 98 V62 H108 V82" />
          <path className="hb-od2-route" d="M146 98 V62 H108 V82" />
          <circle className="hb-od2-mehalo" cx="146" cy="98" r="8" />
          <circle className="hb-od2-me" cx="146" cy="98" r="3.6" />
          <text x="152" y="109" fill="var(--hb-od2-label)" fontSize="6" fontWeight="700" fontFamily="inherit">
            {you}
          </text>
        </g>
      ) : null}
      <g transform="translate(108 82)">
        <ellipse className="hb-od2-ring" cx="0" cy="0" rx="8" ry="4" />
        <ellipse className="hb-od2-shadow" cx="0" cy="0.5" rx="4.5" ry="1.8" />
        <g transform="scale(0.62)">
          <g className="hb-od2-pinbody">
            <g transform="translate(-13 -33)">
              <path d="M13 33c-1.2-3.6-11-11.5-11-19.5a11 11 0 0 1 22 0c0 8-9.8 15.9-11 19.5z" fill="var(--hb-od2-accent)" stroke="#ffffff" strokeWidth="1.6" />
              <circle cx="13" cy="13.2" r="5.2" fill="#ffffff" />
              <path d="M10.6 10.6v3.2a2.4 2.4 0 0 0 4.8 0v-3.2M13 10.6v6" stroke="var(--hb-od2-accent)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function MapDirectionsCard({
  name = "Corner Kitchen",
  address = "418 Maple Avenue, Brooklyn, NY 11215",
  lat,
  lng,
  hours = "Open today · 11 am to 10 pm",
  status = "open",
  distance = "1.2 mi · 6 min",
  streets = ["Maple Ave", "Union Blvd", "8th St"],
  showRoute = true,
  appearance = "dark",
  accent = "#2f7bff",
  labels,
  onDirections,
  className = "",
  style,
  ...rest
}: MapDirectionsCardProps) {
  const l = { ...defaultLabels, ...labels };
  const maps = buildMapsHref(address, lat, lng);
  const waze = buildWazeHref(address, lat, lng);

  return (
    <div
      className={`hb-od2 ${className}`}
      data-appearance={appearance}
      style={{ "--hb-od2-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-map-directions-card" precedence="default">{css}</style>
      <div className="hb-od2-card">
        <div className="hb-od2-map" role="img" aria-label={l.mapLabel.replace("{name}", name)}>
          <MapArt streets={streets} showRoute={showRoute} you={l.you} />
          {distance ? (
            <span className="hb-od2-chip">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 11l18-8-8 18-2-8z" />
              </svg>
              {distance}
            </span>
          ) : null}
        </div>
        <div className="hb-od2-info">
          <h3 className="hb-od2-name">{name}</h3>
          <address className="hb-od2-addr">{address}</address>
          {hours ? (
            <div className="hb-od2-hours" data-status={status}>
              <span className="hb-od2-dot" aria-hidden="true" />
              <span>{hours}</span>
            </div>
          ) : null}
          <div className="hb-od2-actions">
            <a
              className="hb-od2-btn"
              data-primary="true"
              href={maps}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onDirections?.("maps", maps)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 4L3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5L9 4zM9 4v13.5M15 6.5V20" />
              </svg>
              {l.openMaps}
            </a>
            <a
              className="hb-od2-btn"
              href={waze}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onDirections?.("waze", waze)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l7 18-7-4-7 4z" />
              </svg>
              {l.openWaze}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
