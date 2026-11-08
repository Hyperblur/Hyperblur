"use client";

import * as React from "react";

export type HoverPlayTilesScene = "tide" | "orbit" | "city" | "pulse";

export interface HoverPlayTilesItem {
  title: string;
  duration: number;
  scene: HoverPlayTilesScene;
}

export interface HoverPlayTilesProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: HoverPlayTilesItem[];
  columns?: number;
  autoPlay?: boolean;
  accent?: string;
  onPlayChange?: (index: number, playing: boolean) => void;
}

const defaults: HoverPlayTilesItem[] = [
  { title: "Swell report", duration: 24, scene: "tide" },
  { title: "Moonrise", duration: 18, scene: "orbit" },
  { title: "Night shift", duration: 32, scene: "city" },
  { title: "Live set", duration: 15, scene: "pulse" },
];

const css = `
.hb-wg10 { --hb-wg10-accent: #2f7bff; box-sizing: border-box; width: 100%; display: grid; grid-template-columns: repeat(var(--hb-wg10-cols), minmax(0, 1fr)); gap: 8px; font-family: inherit; color: #ededed; }
.hb-wg10 *, .hb-wg10 *::before, .hb-wg10 *::after { box-sizing: border-box; }
.hb-wg10-tile { appearance: none; border: 0; margin: 0; padding: 0; font: inherit; color: inherit; cursor: pointer; position: relative; aspect-ratio: 16 / 10; border-radius: 10px; overflow: hidden; background: #111; box-shadow: inset 0 0 0 1px rgba(255,255,255,.07), 0 12px 24px -16px rgba(0,0,0,.9); outline: none; text-align: left; transition: transform .45s cubic-bezier(.2,.9,.25,1), box-shadow .3s ease; -webkit-tap-highlight-color: transparent; }
.hb-wg10-tile[data-playing="true"] { transform: scale(1.03); box-shadow: inset 0 0 0 1px rgba(255,255,255,.16), 0 18px 30px -16px rgba(0,0,0,.95); z-index: 1; }
.hb-wg10-tile:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-wg10-accent); }
.hb-wg10-scene { position: absolute; inset: 0; overflow: hidden; }
.hb-wg10-scene * { animation-play-state: paused !important; }
.hb-wg10-tile[data-playing="true"] .hb-wg10-scene * { animation-play-state: running !important; }
.hb-wg10-tide { background: linear-gradient(180deg, #ffcf9a 0%, #ff8a6a 40%, #2a4f7a 41%, #0c2240 100%); }
.hb-wg10-sun { position: absolute; left: 50%; top: 18%; width: 26%; aspect-ratio: 1; margin-left: -13%; border-radius: 50%; background: radial-gradient(circle, #fff3d1 0 45%, #ffbf7a 70%, transparent 72%); }
.hb-wg10-wave { position: absolute; left: -50%; width: 200%; height: 22%; background: repeating-radial-gradient(ellipse 14px 7px at 50% 0%, rgba(255,255,255,.28) 0 1px, transparent 1.5px 7px); background-size: 28px 100%; animation: hb-wg10-slide 3.2s linear infinite; }
.hb-wg10-wave:nth-child(2) { top: 46%; opacity: .7; }
.hb-wg10-wave:nth-child(3) { top: 62%; animation-duration: 2.3s; animation-direction: reverse; }
.hb-wg10-wave:nth-child(4) { top: 80%; animation-duration: 1.8s; opacity: .6; }
.hb-wg10-orbit { background: radial-gradient(circle at 50% 50%, #1a1d3a 0%, #07080f 75%); }
.hb-wg10-stars { position: absolute; inset: 0; background-image: radial-gradient(1px 1px at 12% 20%, #fff, transparent), radial-gradient(1px 1px at 80% 30%, #fff, transparent), radial-gradient(1px 1px at 30% 80%, #cfd8ff, transparent), radial-gradient(1px 1px at 66% 70%, #fff, transparent), radial-gradient(1px 1px at 90% 85%, #cfd8ff, transparent); animation: hb-wg10-twinkle 2.4s ease-in-out infinite alternate; }
.hb-wg10-planet { position: absolute; left: 50%; top: 50%; width: 34%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(circle at 35% 30%, #a8c4ff 0%, #4c6fd8 45%, #1a2560 100%); box-shadow: inset -8px -6px 14px rgba(0,0,0,.55), 0 0 22px rgba(90,130,255,.35); }
.hb-wg10-moon-path { position: absolute; left: 50%; top: 50%; width: 70%; aspect-ratio: 1; margin: -35% 0 0 -35%; animation: hb-wg10-spin 4.5s linear infinite; }
.hb-wg10-moon { position: absolute; left: 0; top: 50%; width: 9%; aspect-ratio: 1; margin-top: -4.5%; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff, #a0a0a8); }
.hb-wg10-city { background: linear-gradient(180deg, #0f1430 0%, #3a1f4f 70%, #6a2f4f 100%); }
.hb-wg10-sky { position: absolute; left: 0; bottom: 0; width: 200%; height: 70%; display: flex; align-items: flex-end; animation: hb-wg10-slide 7s linear infinite; }
.hb-wg10-bld { flex: 0 0 auto; margin-right: 3px; background: #0a0c1a; background-image: repeating-linear-gradient(0deg, transparent 0 5px, rgba(255,206,110,.55) 5px 6.5px), repeating-linear-gradient(90deg, transparent 0 4px, #0a0c1a 4px 7px); box-shadow: inset 0 1px 0 rgba(255,255,255,.08); }
.hb-wg10-pulse { background: radial-gradient(90% 70% at 50% 100%, #3b0f45 0%, #0b0610 70%); display: flex; align-items: flex-end; justify-content: center; gap: 4%; padding: 0 12% 18%; }
.hb-wg10-eq { width: 7%; height: 70%; border-radius: 3px 3px 1px 1px; background: linear-gradient(180deg, #ff6ad5, #7a5cff); transform-origin: 50% 100%; animation: hb-wg10-eq .9s cubic-bezier(.4,0,.2,1) infinite alternate; }
.hb-wg10-poster { position: absolute; inset: 0; display: grid; place-items: center; background: linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.45)); transition: opacity .35s ease; }
.hb-wg10-tile[data-playing="true"] .hb-wg10-poster { opacity: 0; }
.hb-wg10-play { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; background: rgba(10,10,10,.55); box-shadow: 0 0 0 1px rgba(255,255,255,.22), inset 0 1px 0 rgba(255,255,255,.12); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); transition: transform .4s cubic-bezier(.3,1.5,.4,1); }
.hb-wg10-play svg { width: 11px; height: 11px; margin-left: 2px; fill: #ededed; }
.hb-wg10-tile:hover .hb-wg10-play { transform: scale(1.12); }
.hb-wg10-info { position: absolute; left: 7px; right: 7px; bottom: 7px; display: flex; align-items: center; justify-content: space-between; gap: 6px; pointer-events: none; }
.hb-wg10-name { font-size: 10.5px; font-weight: 600; text-shadow: 0 1px 6px rgba(0,0,0,.7); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wg10-time { flex: none; padding: 1px 5px; border-radius: 4px; background: rgba(10,10,10,.7); font-family: var(--font-mono, ui-monospace, monospace); font-size: 9px; color: #ededed; font-variant-numeric: tabular-nums; }
.hb-wg10-bar { position: absolute; left: 0; right: 0; bottom: 0; height: 2.5px; background: rgba(255,255,255,.14); }
.hb-wg10-fill { display: block; height: 100%; width: 100%; background: var(--hb-wg10-accent); transform-origin: 0 50%; transform: scaleX(var(--hb-wg10-p, 0)); box-shadow: 0 0 8px var(--hb-wg10-accent); }
.hb-wg10-live { position: absolute; left: 7px; top: 7px; display: inline-flex; align-items: center; gap: 4px; padding: 1px 5px; border-radius: 4px; background: rgba(10,10,10,.6); font-size: 8.5px; letter-spacing: .08em; text-transform: uppercase; opacity: 0; transform: translateY(-3px); transition: opacity .3s ease, transform .35s ease; }
.hb-wg10-live::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: #ff4d4f; }
.hb-wg10-tile[data-playing="true"] .hb-wg10-live { opacity: 1; transform: none; }
@keyframes hb-wg10-slide { to { transform: translateX(-50%); } }
@keyframes hb-wg10-spin { to { transform: rotate(360deg); } }
@keyframes hb-wg10-twinkle { to { opacity: .45; } }
@keyframes hb-wg10-eq { 0% { transform: scaleY(.2); } 100% { transform: scaleY(1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-wg10-scene * { animation: none !important; }
  .hb-wg10-tile, .hb-wg10-poster, .hb-wg10-play, .hb-wg10-live { transition: none; }
}
`;

function hash(n: number) {
  let x = Math.imul((n | 0) ^ 0x2545f491, 0x9e3779b1) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 0x85ebca6b) >>> 0;
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

function Scene({ scene }: { scene: HoverPlayTilesScene }) {
  if (scene === "tide")
    return (
      <div className="hb-wg10-scene hb-wg10-tide">
        <span className="hb-wg10-sun" />
        <span className="hb-wg10-wave" />
        <span className="hb-wg10-wave" />
        <span className="hb-wg10-wave" />
      </div>
    );
  if (scene === "orbit")
    return (
      <div className="hb-wg10-scene hb-wg10-orbit">
        <span className="hb-wg10-stars" />
        <span className="hb-wg10-planet" />
        <span className="hb-wg10-moon-path">
          <span className="hb-wg10-moon" />
        </span>
      </div>
    );
  if (scene === "city")
    return (
      <div className="hb-wg10-scene hb-wg10-city">
        <div className="hb-wg10-sky">
          {Array.from({ length: 28 }, (_, i) => (
            <span
              key={i}
              className="hb-wg10-bld"
              style={{ width: `${(4 + hash(i % 14) * 5).toFixed(2)}%`, height: `${(30 + hash((i % 14) + 40) * 65).toFixed(1)}%` }}
            />
          ))}
        </div>
      </div>
    );
  return (
    <div className="hb-wg10-scene hb-wg10-pulse">
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className="hb-wg10-eq" style={{ animationDelay: `${(-hash(i + 3) * 0.9).toFixed(2)}s`, animationDuration: `${(0.5 + hash(i + 9) * 0.6).toFixed(2)}s` }} />
      ))}
    </div>
  );
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function HoverPlayTiles({
  items = defaults,
  columns = 2,
  autoPlay = true,
  accent = "#2f7bff",
  onPlayChange,
  className = "",
  style,
  ...rest
}: HoverPlayTilesProps) {
  const [playing, setPlaying] = React.useState(-1);
  const [auto, setAuto] = React.useState(-1);
  const [engaged, setEngaged] = React.useState(false);
  const tileRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const timeRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const pos = React.useRef<number[]>([]);
  const lastPointer = React.useRef("mouse");
  const n = items.length;
  const active = engaged ? playing : playing >= 0 ? playing : auto;
  const cb = React.useRef(onPlayChange);
  React.useEffect(() => {
    cb.current = onPlayChange;
  }, [onPlayChange]);

  React.useEffect(() => {
    if (!autoPlay || engaged || n === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const kick = window.setTimeout(() => setAuto(0), 600);
    const id = window.setInterval(() => {
      i = (i + 1) % n;
      setAuto(i);
    }, 2600);
    return () => {
      window.clearTimeout(kick);
      window.clearInterval(id);
    };
  }, [autoPlay, engaged, n]);

  React.useEffect(() => {
    if (active < 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = tileRefs.current[active];
    const tm = timeRefs.current[active];
    const item = items[active];
    if (!el || !tm || !item) return;
    cb.current?.(active, true);
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const cur = ((pos.current[active] ?? 0) + (reduce ? 0 : dt)) % item.duration;
      pos.current[active] = cur;
      el.style.setProperty("--hb-wg10-p", (cur / item.duration).toFixed(4));
      tm.textContent = `${fmt(cur)} / ${fmt(item.duration)}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      tm.textContent = fmt(item.duration);
      cb.current?.(active, false);
    };
  }, [active, items]);

  return (
    <div
      className={`hb-wg10 ${className}`}
      style={{ "--hb-wg10-accent": accent, "--hb-wg10-cols": Math.max(1, columns), ...style } as React.CSSProperties}
      role="list"
      {...rest}
    >
      <style href="hb-hover-play-tiles" precedence="default">{css}</style>
      {items.map((item, i) => (
        <div role="listitem" key={`${item.title}-${i}`} style={{ display: "contents" }}>
          <button
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            type="button"
            className="hb-wg10-tile"
            data-playing={active === i ? "true" : "false"}
            aria-pressed={active === i}
            aria-label={`${item.title}, ${fmt(item.duration)}. ${active === i ? "Pause" : "Play"} preview`}
            onPointerDown={(e) => {
              lastPointer.current = e.pointerType;
            }}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              setEngaged(true);
              setPlaying(i);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType !== "mouse") return;
              setPlaying((p) => (p === i ? -1 : p));
            }}
            onFocus={() => {
              setEngaged(true);
              setPlaying(i);
            }}
            onBlur={() => setPlaying((p) => (p === i ? -1 : p))}
            onClick={() => {
              if (lastPointer.current === "mouse") return;
              setEngaged(true);
              setPlaying((p) => (p === i ? -1 : i));
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setPlaying(-1);
              if (e.key === "Enter" || e.key === " ") lastPointer.current = "key";
            }}
          >
            <Scene scene={item.scene} />
            <span className="hb-wg10-poster" aria-hidden="true">
              <span className="hb-wg10-play">
                <svg viewBox="0 0 12 12">
                  <path d="M2.5 1.5v9l8-4.5z" />
                </svg>
              </span>
            </span>
            <span className="hb-wg10-live" aria-hidden="true">Preview</span>
            <span className="hb-wg10-info" aria-hidden="true">
              <span className="hb-wg10-name">{item.title}</span>
              <span
                ref={(el) => {
                  timeRefs.current[i] = el;
                }}
                className="hb-wg10-time"
              >
                {fmt(item.duration)}
              </span>
            </span>
            <span className="hb-wg10-bar" aria-hidden="true">
              <span className="hb-wg10-fill" />
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
