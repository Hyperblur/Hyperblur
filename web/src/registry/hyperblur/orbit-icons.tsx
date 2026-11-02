"use client";

import * as React from "react";

export interface OrbitItem {
  icon: React.ReactNode;
  label: string;
}

export interface OrbitIconsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: OrbitItem[][];
  radii?: number[];
  duration?: number;
  accent?: string;
  children?: React.ReactNode;
}

const css = `
@keyframes hb-orb-spin { to { transform: rotate(360deg); } }
@keyframes hb-orb-unspin { to { transform: rotate(-360deg); } }
@keyframes hb-orb-breathe {
  0%, 100% { opacity: .55; transform: translate(-50%, -50%) scale(.92); }
  50% { opacity: .9; transform: translate(-50%, -50%) scale(1.06); }
}
.hb-orb {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 1 / 1;
  container-type: inline-size;
  font-family: inherit;
  color: #ededed;
}
.hb-orb *, .hb-orb *::before, .hb-orb *::after { box-sizing: border-box; }
.hb-orb-glow {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 46%;
  height: 46%;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-orb-a) 55%, transparent), color-mix(in srgb, var(--hb-orb-a) 0%, transparent));
  filter: blur(6px);
  transform: translate(-50%, -50%);
  animation: hb-orb-breathe 5s ease-in-out infinite;
  pointer-events: none;
}
.hb-orb-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--hb-orb-r) * 100%);
  height: calc(var(--hb-orb-r) * 100%);
  margin-left: calc(var(--hb-orb-r) * -50%);
  margin-top: calc(var(--hb-orb-r) * -50%);
  border-radius: 50%;
  animation: hb-orb-spin var(--hb-orb-d) linear infinite;
  animation-direction: var(--hb-orb-dir);
}
.hb-orb-ring::before, .hb-orb-ring::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  padding: 1px;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  pointer-events: none;
}
.hb-orb-ring::before {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.02) 75%);
}
.hb-orb-ring::after {
  background: conic-gradient(from var(--hb-orb-o), transparent 0deg, color-mix(in srgb, var(--hb-orb-a) 85%, transparent) 50deg, transparent 110deg, transparent 180deg, color-mix(in srgb, var(--hb-orb-a) 45%, transparent) 230deg, transparent 290deg);
  opacity: .8;
}
.hb-orb-arm {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  transform: rotate(var(--hb-orb-t)) translateX(calc(var(--hb-orb-r) * 50cqw)) rotate(calc(var(--hb-orb-t) * -1));
}
.hb-orb-tile {
  position: absolute;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
  width: clamp(24px, 11.5cqw, 60px);
  height: clamp(24px, 11.5cqw, 60px);
  margin: calc(clamp(24px, 11.5cqw, 60px) / -2) 0 0 calc(clamp(24px, 11.5cqw, 60px) / -2);
  border-radius: 28%;
  background: linear-gradient(160deg, #1c1c1f, #0e0e10);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 6px 18px -6px rgba(0, 0, 0, 0.8);
  color: #ededed;
  animation: hb-orb-unspin var(--hb-orb-d) linear infinite;
  animation-direction: var(--hb-orb-dir);
  transition: box-shadow .25s ease, color .25s ease;
}
.hb-orb-tile:hover {
  color: var(--hb-orb-a);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-orb-a) 60%, transparent), 0 0 18px -2px color-mix(in srgb, var(--hb-orb-a) 55%, transparent);
}
.hb-orb-tile svg { width: 48%; height: 48%; }
.hb-orb:hover .hb-orb-ring, .hb-orb:hover .hb-orb-tile { animation-play-state: paused; }
.hb-orb-hub {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  width: 24%;
  height: 24%;
}
.hb-orb-mark {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 30%;
  background: linear-gradient(150deg, color-mix(in srgb, var(--hb-orb-a) 85%, #ffffff), var(--hb-orb-a) 45%, color-mix(in srgb, var(--hb-orb-a) 60%, #000000));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 10px 30px -8px color-mix(in srgb, var(--hb-orb-a) 80%, transparent);
  color: #ffffff;
}
.hb-orb-mark svg { width: 52%; height: 52%; }
@media (prefers-reduced-motion: reduce) {
  .hb-orb-ring, .hb-orb-tile, .hb-orb-glow { animation: none; }
}
`;

function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export const orbitGlyphs = {
  bolt: "M13 3L5 14h6l-1 7 8-11h-6z",
  cube: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9",
  chat: "M5 5h14v10h-8l-4 4v-4H5z",
  cloud: "M7 18a4 4 0 0 1-.6-7.95A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5z",
  code: "M9 7l-5 5 5 5M15 7l5 5-5 5M13.5 5l-3 14",
  chart: "M4 20h16M7 16v-5M12 16V7M17 16v-8",
};

const defaultItems: OrbitItem[][] = [
  [
    { icon: <Glyph d={orbitGlyphs.bolt} />, label: "Automations" },
    { icon: <Glyph d={orbitGlyphs.code} />, label: "API" },
  ],
  [
    { icon: <Glyph d={orbitGlyphs.cube} />, label: "Packages" },
    { icon: <Glyph d={orbitGlyphs.chat} />, label: "Messages" },
  ],
  [
    { icon: <Glyph d={orbitGlyphs.cloud} />, label: "Storage" },
    { icon: <Glyph d={orbitGlyphs.chart} />, label: "Analytics" },
  ],
];

const defaultRadii = [0.44, 0.7, 0.96];

export function OrbitIcons({
  items = defaultItems,
  radii = defaultRadii,
  duration = 22,
  accent = "#2f7bff",
  children,
  className = "",
  style,
  ...rest
}: OrbitIconsProps) {
  const rings = Math.max(items.length, radii.length);
  const base = Math.max(1, duration);

  const vars = {
    "--hb-orb-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-orb ${className}`} style={vars} {...rest}>
      <style href="hb-orbit-icons" precedence="default">{css}</style>
      <div className="hb-orb-glow" aria-hidden="true" />
      {Array.from({ length: rings }, (_, ring) => {
        const r = Math.min(1, Math.max(0.1, radii[ring] ?? defaultRadii[Math.min(ring, defaultRadii.length - 1)]));
        const list = items[ring] ?? [];
        const offset = ring * 47;
        const d = base * (1 + ring * 0.55);
        return (
          <div
            key={ring}
            className="hb-orb-ring"
            role={list.length ? "list" : undefined}
            aria-hidden={list.length ? undefined : true}
            style={
              {
                "--hb-orb-r": r.toFixed(3),
                "--hb-orb-d": `${d.toFixed(2)}s`,
                "--hb-orb-dir": ring % 2 === 1 ? "reverse" : "normal",
                "--hb-orb-o": `${(offset * 3) % 360}deg`,
              } as React.CSSProperties
            }
          >
            {list.map((item, i) => (
              <span
                key={`${item.label}-${i}`}
                className="hb-orb-arm"
                role="listitem"
                style={{ "--hb-orb-t": `${((360 / list.length) * i + offset).toFixed(2)}deg` } as React.CSSProperties}
              >
                <span className="hb-orb-tile" role="img" aria-label={item.label} title={item.label}>
                  {item.icon}
                </span>
              </span>
            ))}
          </div>
        );
      })}
      <div className="hb-orb-hub">
        {children ?? (
          <span className="hb-orb-mark" role="img" aria-label="Hub">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5h3.2L7.6 19H4.4zM13.4 5h3.2L13 19H9.8zM18.8 5H22l-3.6 14h-3.2z" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
