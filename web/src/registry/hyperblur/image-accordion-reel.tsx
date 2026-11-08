"use client";

import * as React from "react";

export interface ReelPanel {
  title: string;
  place: string;
  caption: string;
  colors?: [string, string, string, string];
}

export interface ImageAccordionReelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: ReelPanel[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  autoPlay?: boolean;
  interval?: number;
  height?: number;
  accent?: string;
}

const defaultItems: ReelPanel[] = [
  {
    title: "Lofoten",
    place: "Norway / 68.2 N",
    caption: "Fishing villages under granite walls, and a June sun that never quite sets.",
    colors: ["#1b2847", "#f2a46f", "#22314f", "#ffe1b0"],
  },
  {
    title: "Atacama",
    place: "Chile / 23.6 S",
    caption: "The driest desert on Earth, salt flats glowing pink an hour after dusk.",
    colors: ["#3a1838", "#ff8a6b", "#5a2433", "#ffd2a8"],
  },
  {
    title: "Arashiyama",
    place: "Japan / 35.0 N",
    caption: "Cedar ridges folding into mist above the Hozu river at first light.",
    colors: ["#0f2a2a", "#9fd6b8", "#16403a", "#f4fff0"],
  },
  {
    title: "Dolomites",
    place: "Italy / 46.4 N",
    caption: "Limestone towers that blush red at sunset, locals call it enrosadira.",
    colors: ["#24204a", "#f6a3b8", "#332a5c", "#ffe4ec"],
  },
  {
    title: "Namib",
    place: "Namibia / 24.7 S",
    caption: "Star dunes taller than towers, shifting a few meters with every storm.",
    colors: ["#2a1606", "#ffb35c", "#7a3a12", "#fff0c8"],
  },
];

function hash(n: number) {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35) >>> 0;
  return ((x ^ (x >>> 16)) >>> 0) / 4294967295;
}

function mix(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (s: number) => {
    const ca = (pa >> s) & 255;
    const cb = (pb >> s) & 255;
    return Math.round(ca + (cb - ca) * t);
  };
  return `#${((1 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).slice(1)}`;
}

function ridge(seed: number, base: number, amp: number, steps: number) {
  let d = `M-20 320 L-20 ${base.toFixed(1)}`;
  for (let i = 0; i <= steps; i++) {
    const x = -20 + (440 / steps) * i;
    const y = base - amp * (0.35 + hash(seed * 31 + i) * 0.65);
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d} L420 320 Z`;
}

const css = `
.hb-vl1 {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-vl1 *, .hb-vl1 *::before, .hb-vl1 *::after { box-sizing: border-box; }
.hb-vl1-bar { display: flex; gap: 4px; padding: 0 2px; }
.hb-vl1-seg {
  position: relative;
  flex: 1 1 0;
  height: 2px;
  overflow: hidden;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.14);
}
.hb-vl1-fill {
  position: absolute;
  inset: 0;
  background: #ededed;
  transform: scaleX(0);
  transform-origin: left center;
}
.hb-vl1-seg[data-state="done"] .hb-vl1-fill { transform: scaleX(1); background: rgba(237, 237, 237, 0.55); }
.hb-vl1-seg[data-state="still"] .hb-vl1-fill { transform: scaleX(1); }
.hb-vl1-seg[data-state="live"] .hb-vl1-fill { animation: hb-vl1-fill var(--hb-vl1-t) linear forwards; }
.hb-vl1[data-paused="true"] .hb-vl1-fill { animation-play-state: paused; }
@keyframes hb-vl1-fill { to { transform: scaleX(1); } }
.hb-vl1-row { display: flex; gap: 6px; height: var(--hb-vl1-h); }
.hb-vl1-p {
  position: relative;
  flex: 1 1 0;
  min-width: 40px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 16px;
  background: #111111;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  container-type: inline-size;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transition: flex-grow 0.85s cubic-bezier(0.65, 0, 0.35, 1);
  -webkit-tap-highlight-color: transparent;
}
.hb-vl1-p[data-active="true"] { flex-grow: 5; }
.hb-vl1-p:not([data-active="true"]):hover { flex-grow: 1.4; }
.hb-vl1-p:focus-visible { outline: 2px solid var(--hb-vl1-a); outline-offset: 2px; }
.hb-vl1-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.18);
  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-vl1-p[data-active="true"] .hb-vl1-svg { transform: scale(1); }
.hb-vl1-l { transition: transform 1.3s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-vl1-l1 { transform: translateY(26px); }
.hb-vl1-l2 { transform: translateY(16px); }
.hb-vl1-l3 { transform: translateY(8px); }
.hb-vl1-sun { transform: translateY(40px); transition: transform 1.5s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-vl1-p[data-active="true"] .hb-vl1-l, .hb-vl1-p[data-active="true"] .hb-vl1-sun { transform: none; }
.hb-vl1-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6, 6, 10, 0.25) 0%, rgba(6, 6, 10, 0) 30%, rgba(6, 6, 10, 0) 45%, rgba(6, 6, 10, 0.82) 100%);
  pointer-events: none;
}
.hb-vl1-p:not([data-active="true"]) .hb-vl1-shade { background: rgba(6, 6, 10, 0.38); }
.hb-vl1-num {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.78);
}
.hb-vl1-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--hb-vl1-a);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-vl1-a) 25%, transparent);
  opacity: 0;
  transform: scale(0.4);
  transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-vl1-p[data-active="true"] .hb-vl1-dot { opacity: 1; transform: none; }
.hb-vl1-cap {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 150px;
}
.hb-vl1-cap > * {
  margin: 0;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.hb-vl1-p[data-active="true"] .hb-vl1-cap > * {
  opacity: 1;
  transform: none;
  transition: opacity 0.6s ease, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-vl1-p[data-active="true"] .hb-vl1-cap > :nth-child(1) { transition-delay: 0.3s; }
.hb-vl1-p[data-active="true"] .hb-vl1-cap > :nth-child(2) { transition-delay: 0.38s; }
.hb-vl1-p[data-active="true"] .hb-vl1-cap > :nth-child(3) { transition-delay: 0.46s; }
.hb-vl1-place {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
  white-space: nowrap;
}
.hb-vl1-title {
  font-size: 26px;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.025em;
  white-space: nowrap;
}
.hb-vl1-text {
  max-width: 34ch;
  font-size: 12.5px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.78);
}
@container (max-width: 240px) {
  .hb-vl1-text { display: none; }
  .hb-vl1-title { font-size: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vl1 *, .hb-vl1 *::before, .hb-vl1 *::after { transition: none !important; animation: none !important; }
}
`;

export function ImageAccordionReel({
  items = defaultItems,
  value,
  defaultValue = 0,
  onChange,
  autoPlay = true,
  interval = 5000,
  height = 360,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: ImageAccordionReelProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [paused, setPaused] = React.useState(false);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const uid = React.useId().replace(/:/g, "");
  const count = items.length;
  const active = Math.min(Math.max(value ?? inner, 0), Math.max(count - 1, 0));

  const select = (index: number) => {
    const next = ((index % count) + count) % count;
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  const onKey = (event: React.KeyboardEvent, index: number) => {
    let next = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % count;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next < 0) return;
    event.preventDefault();
    select(next);
    refs.current[next]?.focus();
  };

  const rootStyle = {
    "--hb-vl1-a": accent,
    "--hb-vl1-h": `${height}px`,
    "--hb-vl1-t": `${interval}ms`,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={["hb-vl1", className].filter(Boolean).join(" ")}
      style={rootStyle}
      data-paused={paused ? "true" : "false"}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      {...rest}
    >
      <style href="hb-image-accordion-reel" precedence="default">{css}</style>
      <div className="hb-vl1-bar" aria-hidden="true">
        {items.map((item, i) => {
          const state = i < active ? "done" : i === active ? (autoPlay ? "live" : "still") : "idle";
          return (
            <span key={item.title + i} className="hb-vl1-seg" data-state={state}>
              <span
                key={i === active ? `live-${active}` : "rest"}
                className="hb-vl1-fill"
                onAnimationEnd={i === active && autoPlay ? () => select(active + 1) : undefined}
              />
            </span>
          );
        })}
      </div>
      <div className="hb-vl1-row" role="tablist" aria-label="Destinations" aria-orientation="horizontal">
        {items.map((item, i) => {
          const [skyTop, skyLow, land, sun] = item.colors ?? ["#1b2847", "#f2a46f", "#22314f", "#ffe1b0"];
          const on = i === active;
          const grad = `${uid}-g${i}`;
          return (
            <button
              key={item.title + i}
              ref={(node) => {
                refs.current[i] = node;
              }}
              type="button"
              role="tab"
              aria-selected={on}
              aria-label={`${item.title}, ${item.place}`}
              tabIndex={on ? 0 : -1}
              className="hb-vl1-p"
              data-active={on ? "true" : "false"}
              onClick={() => select(i)}
              onKeyDown={(event) => onKey(event, i)}
            >
              <svg className="hb-vl1-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={skyTop} />
                    <stop offset="0.72" stopColor={skyLow} />
                  </linearGradient>
                </defs>
                <rect width="400" height="300" fill={`url(#${grad})`} />
                <g className="hb-vl1-sun">
                  <circle cx={(120 + hash(i * 7 + 3) * 160).toFixed(1)} cy="150" r="64" fill={sun} opacity="0.18" />
                  <circle cx={(120 + hash(i * 7 + 3) * 160).toFixed(1)} cy="150" r="34" fill={sun} />
                </g>
                <path className="hb-vl1-l hb-vl1-l3" d={ridge(i * 3 + 1, 205, 70, 7)} fill={mix(land, skyLow, 0.55)} />
                <path className="hb-vl1-l hb-vl1-l2" d={ridge(i * 3 + 2, 238, 58, 9)} fill={mix(land, skyLow, 0.25)} />
                <path className="hb-vl1-l hb-vl1-l1" d={ridge(i * 3 + 3, 272, 44, 12)} fill={mix(land, "#05060a", 0.35)} />
              </svg>
              <span className="hb-vl1-shade" />
              <span className="hb-vl1-num">
                <span className="hb-vl1-dot" />
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="hb-vl1-cap" aria-hidden={!on}>
                <span className="hb-vl1-place">{item.place}</span>
                <span className="hb-vl1-title">{item.title}</span>
                <span className="hb-vl1-text">{item.caption}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
