"use client";

import * as React from "react";

export interface DeckCity {
  city: string;
  country: string;
  time: string;
  temp: number;
  condition: string;
  night?: boolean;
  colors?: [string, string];
  forecast?: number[];
}

export interface CardFlipDeckProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  cards?: DeckCity[];
  index?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  height?: number;
  autoPlay?: number;
  unit?: "C" | "F";
  accent?: string;
}

const defaultCards: DeckCity[] = [
  { city: "Lisbon", country: "Portugal", time: "14:20", temp: 22, condition: "Clear, light wind", colors: ["#2b6cd9", "#ffc58a"], forecast: [22, 23, 21, 24, 25] },
  { city: "Reykjavik", country: "Iceland", time: "13:20", temp: 6, condition: "Low cloud, drizzle", colors: ["#4a5a6e", "#c7d3dd"], forecast: [6, 5, 7, 4, 6] },
  { city: "Kyoto", country: "Japan", time: "22:20", temp: 17, condition: "Calm, clear night", night: true, colors: ["#141a3d", "#5b4f9e"], forecast: [17, 19, 18, 16, 20] },
  { city: "Cape Town", country: "South Africa", time: "15:20", temp: 19, condition: "Sunny, strong breeze", colors: ["#1f8fb5", "#f6e1a5"], forecast: [19, 21, 20, 18, 22] },
  { city: "Vancouver", country: "Canada", time: "06:20", temp: 11, condition: "Sunrise, fog clearing", colors: ["#6a4f8f", "#ffb38a"], forecast: [11, 13, 12, 14, 12] },
  { city: "Marrakech", country: "Morocco", time: "14:20", temp: 31, condition: "Hot and dry", colors: ["#d0652f", "#ffd59a"], forecast: [31, 33, 32, 30, 34] },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const css = `
.hb-vl12 {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
  outline: none;
  touch-action: pan-x;
}
.hb-vl12 *, .hb-vl12 *::before, .hb-vl12 *::after { box-sizing: border-box; }
.hb-vl12:focus-visible .hb-vl12-stack { outline: 2px solid var(--hb-vl12-a); outline-offset: 6px; border-radius: 18px; }
.hb-vl12-stack {
  position: relative;
  width: 100%;
  height: calc(var(--hb-vl12-h) + 22px);
  perspective: 1100px;
  perspective-origin: 50% 0%;
  cursor: grab;
  user-select: none;
}
.hb-vl12-stack:active { cursor: grabbing; }
.hb-vl12-c {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--hb-vl12-h);
  overflow: hidden;
  border-radius: 18px;
  background: linear-gradient(170deg, var(--hb-vl12-c0), var(--hb-vl12-c1));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 20px 34px -18px rgba(0, 0, 0, 0.9);
  transform-origin: 50% 0%;
  transform: translateY(calc(var(--hb-vl12-k) * -7px)) scale(calc(1 - var(--hb-vl12-k) * 0.05));
  opacity: var(--hb-vl12-o);
  filter: brightness(calc(1 - var(--hb-vl12-k) * 0.18));
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: transform 0.6s cubic-bezier(0.34, 1.25, 0.64, 1), opacity 0.4s ease, filter 0.4s ease;
}
.hb-vl12-c[data-anim="out"] { animation: hb-vl12-out 0.72s cubic-bezier(0.55, 0.06, 0.3, 1); }
.hb-vl12-c[data-anim="in"] { animation: hb-vl12-in 0.72s cubic-bezier(0.22, 0.8, 0.3, 1); }
@keyframes hb-vl12-out {
  0% { transform: none; opacity: 1; filter: none; z-index: 50; }
  100% { transform: rotateX(-180deg) translateZ(30px); opacity: 1; filter: brightness(1.2); z-index: 50; }
}
@keyframes hb-vl12-in {
  0% { transform: rotateX(-180deg) translateZ(30px); opacity: 1; z-index: 50; }
  100% { transform: none; opacity: 1; z-index: 50; }
}
.hb-vl12-sky { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-vl12-body { position: absolute; inset: 0; display: flex; flex-direction: column; padding: 14px 16px; text-shadow: 0 1px 8px rgba(0, 0, 0, 0.25); }
.hb-vl12-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.hb-vl12-city { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 19px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; }
.hb-vl12-sub { margin: 2px 0 0; font-size: 11px; color: rgba(255, 255, 255, 0.78); }
.hb-vl12-temp { font-size: 34px; font-weight: 300; letter-spacing: -0.04em; line-height: 0.95; font-variant-numeric: tabular-nums; }
.hb-vl12-bot { display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; margin-top: auto; }
.hb-vl12-cond { font-size: 11.5px; color: rgba(255, 255, 255, 0.9); white-space: nowrap; }
.hb-vl12-fc { display: flex; gap: 8px; }
.hb-vl12-day { display: flex; flex-direction: column; align-items: center; gap: 1px; font-size: 9.5px; color: rgba(255, 255, 255, 0.72); }
.hb-vl12-day b { font-size: 11px; font-weight: 600; color: #ffffff; font-variant-numeric: tabular-nums; }
.hb-vl12-bar { display: flex; align-items: center; gap: 10px; }
.hb-vl12-btn {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #18181b;
  color: #d6d6da;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.09);
  transition: background 0.2s ease, transform 0.2s ease;
}
.hb-vl12-btn:hover { background: #222226; }
.hb-vl12-btn:active { transform: scale(0.9); }
.hb-vl12-btn:focus-visible { outline: 2px solid var(--hb-vl12-a); outline-offset: 2px; }
.hb-vl12-count { min-width: 54px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; text-align: center; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-vl12-count b { color: #ededed; font-weight: 500; }
.hb-vl12-dots { display: flex; gap: 4px; }
.hb-vl12-dots span { width: 4px; height: 4px; border-radius: 2px; background: rgba(255, 255, 255, 0.18); transition: width 0.4s cubic-bezier(0.34, 1.4, 0.64, 1), background 0.3s ease; }
.hb-vl12-dots span[data-on="true"] { width: 14px; background: var(--hb-vl12-a); }
@media (prefers-reduced-motion: reduce) {
  .hb-vl12 *, .hb-vl12 *::before, .hb-vl12 *::after { transition: none !important; animation: none !important; }
}
`;

function Sky({ night, uid }: { night?: boolean; uid: string }) {
  return (
    <svg className="hb-vl12-sky" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-s`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity={night ? 0.5 : 0.75} />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="248" cy="62" r="64" fill={`url(#${uid}-s)`} />
      <circle cx="248" cy="62" r={night ? 16 : 20} fill={night ? "#f2efe2" : "#fff4d8"} />
      {night && <circle cx="256" cy="56" r="14" fill="#1f2350" />}
      {night &&
        [
          [40, 30],
          [92, 52],
          [150, 22],
          [196, 40],
          [120, 70],
          [64, 84],
        ].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? 0.9 : 1.3} fill="#ffffff" opacity="0.8" />)}
      <path d="M0 150 C 60 128, 110 142, 160 134 S 260 120, 320 136 L320 180 L0 180 Z" fill="#000000" opacity="0.16" />
      <path d="M0 164 C 70 150, 140 162, 200 154 S 290 148, 320 156 L320 180 L0 180 Z" fill="#000000" opacity="0.2" />
    </svg>
  );
}

export function CardFlipDeck({
  cards = defaultCards,
  index,
  defaultIndex = 0,
  onChange,
  height = 168,
  autoPlay = 0,
  unit = "C",
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: CardFlipDeckProps) {
  const n = cards.length;
  const [inner, setInner] = React.useState(defaultIndex);
  const current = (((index ?? inner) % n) + n) % n;
  const [anim, setAnim] = React.useState<{ card: number; dir: "out" | "in"; nonce: number } | null>(null);
  const [paused, setPaused] = React.useState(false);
  const wheel = React.useRef({ sum: 0, lock: 0 });
  const drag = React.useRef<{ y: number; id: number } | null>(null);
  const uid = React.useId().replace(/:/g, "");

  const go = React.useCallback(
    (dir: 1 | -1) => {
      const next = (current + dir + n) % n;
      setAnim((prev) => ({ card: dir === 1 ? current : next, dir: dir === 1 ? "out" : "in", nonce: (prev?.nonce ?? 0) + 1 }));
      if (index === undefined) setInner(next);
      onChange?.(next);
    },
    [current, n, index, onChange],
  );

  React.useEffect(() => {
    if (!autoPlay || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => go(1), autoPlay);
    return () => window.clearInterval(t);
  }, [autoPlay, paused, go]);

  const toF = (c: number) => (unit === "F" ? Math.round((c * 9) / 5 + 32) : c);

  return (
    <div
      className={["hb-vl12", className].filter(Boolean).join(" ")}
      style={{ "--hb-vl12-a": accent, "--hb-vl12-h": `${height}px`, ...style } as React.CSSProperties}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="City weather"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown") {
          event.preventDefault();
          go(1);
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp") {
          event.preventDefault();
          go(-1);
        }
      }}
      {...rest}
    >
      <style href="hb-card-flip-deck" precedence="default">{css}</style>
      <div
        className="hb-vl12-stack"
        onWheel={(event) => {
          const now = event.timeStamp;
          if (now < wheel.current.lock) return;
          wheel.current.sum += event.deltaY;
          if (Math.abs(wheel.current.sum) > 40) {
            go(wheel.current.sum > 0 ? 1 : -1);
            wheel.current = { sum: 0, lock: now + 520 };
          }
        }}
        onPointerDown={(event) => {
          drag.current = { y: event.clientY, id: event.pointerId };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          const start = drag.current;
          drag.current = null;
          if (!start) return;
          const dy = event.clientY - start.y;
          if (dy < -30) go(1);
          else if (dy > 30) go(-1);
          else go(1);
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        {cards.map((card, i) => {
          const k = (i - current + n) % n;
          const animated = anim && anim.card === i ? anim : null;
          const [c0, c1] = card.colors ?? ["#2b6cd9", "#ffc58a"];
          return (
            <div
              key={animated ? `${i}-${animated.nonce}` : `${i}`}
              className="hb-vl12-c"
              data-anim={animated ? animated.dir : undefined}
              aria-hidden={k !== 0}
              onAnimationEnd={() => setAnim(null)}
              style={
                {
                  "--hb-vl12-k": Math.min(k, 3),
                  "--hb-vl12-o": k <= 2 ? 1 : 0,
                  "--hb-vl12-c0": c0,
                  "--hb-vl12-c1": c1,
                  zIndex: animated ? n + 1 : n - k,
                } as React.CSSProperties
              }
            >
              <Sky night={card.night} uid={`${uid}-${i}`} />
              <div className="hb-vl12-body">
                <div className="hb-vl12-top">
                  <div>
                    <p className="hb-vl12-city">{card.city}</p>
                    <p className="hb-vl12-sub">
                      {card.country} / {card.time}
                    </p>
                  </div>
                  <span className="hb-vl12-temp">
                    {toF(card.temp)}
                    <span style={{ fontSize: "0.5em", verticalAlign: "top" }}>&deg;</span>
                  </span>
                </div>
                <div className="hb-vl12-bot">
                  <span className="hb-vl12-cond">{card.condition}</span>
                  {card.forecast && (
                    <span className="hb-vl12-fc">
                      {card.forecast.slice(0, 5).map((t, d) => (
                        <span key={d} className="hb-vl12-day">
                          <b>{toF(t)}&deg;</b>
                          {days[d]}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hb-vl12-bar">
        <button type="button" className="hb-vl12-btn" aria-label="Previous city" onClick={() => go(-1)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M3 7.5L6 4.5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="hb-vl12-count" aria-live="polite">
          <b>{String(current + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}
        </span>
        <span className="hb-vl12-dots" aria-hidden="true">
          {cards.map((card, i) => (
            <span key={card.city + i} data-on={i === current ? "true" : "false"} />
          ))}
        </span>
        <button type="button" className="hb-vl12-btn" aria-label="Next city" onClick={() => go(1)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
