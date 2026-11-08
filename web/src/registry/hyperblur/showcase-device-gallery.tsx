"use client";

import * as React from "react";

export type DeviceGalleryKind = "watch" | "phone" | "tablet" | "laptop";

export interface DeviceGalleryDevice {
  id: DeviceGalleryKind;
  label: string;
  headline: string;
  detail: string;
}

export interface ShowcaseDeviceGalleryProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  appName?: string;
  devices?: DeviceGalleryDevice[];
  defaultDevice?: DeviceGalleryKind;
  device?: DeviceGalleryKind;
  onDeviceChange?: (device: DeviceGalleryKind) => void;
  autoPlay?: boolean;
  interval?: number;
  accent?: string;
}

const defaultDevices: DeviceGalleryDevice[] = [
  { id: "watch", label: "Watch", headline: "Today, at a glance", detail: "One photo from this day in past years, and a ring for how much of the trip you have logged." },
  { id: "phone", label: "Phone", headline: "Capture and sort", detail: "Two-column library with places detected on device. Swipe a photo into an album without opening it." },
  { id: "tablet", label: "Tablet", headline: "Lay out the story", detail: "Albums along the top, a four-column grid below. Drag across to build a trip spread in seconds." },
  { id: "laptop", label: "Laptop", headline: "Edit the whole trip", detail: "Sidebar with every album, a dense grid and batch actions for hundreds of photos at once." },
];

const places = ["Kyoto", "Lisbon", "Banff", "Oaxaca", "Hokkaido", "Porto", "Marrakesh", "Tromso", "Hoi An", "Cusco"];

const css = `
.hb-we3 {
  --hb-we3-accent: #8b5cf6;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: radial-gradient(120% 80% at 80% 10%, #16121f 0%, #0a0a0a 60%);
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-we3 *, .hb-we3 *::before, .hb-we3 *::after { box-sizing: border-box; }
.hb-we3-inner { display: grid; gap: clamp(28px, 5cqi, 56px); align-items: center; max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(18px, 4cqi, 40px); }
.hb-we3-copy { display: grid; gap: 18px; min-width: 0; }
.hb-we3-eyebrow { margin: 0; color: var(--hb-we3-accent); font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; }
.hb-we3-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(30px, 4.6cqi, 50px); font-weight: 600; line-height: 1.04; letter-spacing: -.035em; text-wrap: balance; }
.hb-we3-sub { margin: 0; color: #a1a1a1; font-size: 15px; line-height: 1.6; max-width: 44ch; }
.hb-we3-picker { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); padding: 4px; border-radius: 14px; background: #121214; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08), inset 0 1px 0 rgba(255,255,255,.04); max-width: 420px; }
.hb-we3-pill {
  position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc((100% - 8px) / 4); border-radius: 10px;
  background: linear-gradient(180deg, #2a2a30, #1d1d22); box-shadow: inset 0 1px 0 rgba(255,255,255,.1), 0 6px 16px -6px rgba(0,0,0,.8);
  transform: translateX(calc(var(--hb-we3-i, 0) * 100%)); transition: transform .5s cubic-bezier(.3,1.3,.5,1);
}
.hb-we3-opt {
  position: relative; z-index: 1; display: grid; justify-items: center; gap: 6px; padding: 10px 4px; border: 0; background: none; cursor: pointer;
  color: #8f8f8f; font: inherit; font-size: 12px; font-weight: 500; border-radius: 10px; transition: color .25s ease;
}
.hb-we3-opt svg { width: 18px; height: 18px; }
.hb-we3-opt[aria-checked="true"] { color: #fff; }
.hb-we3-opt:hover { color: #ededed; }
.hb-we3-opt:focus-visible { outline: 2px solid var(--hb-we3-accent); outline-offset: 1px; }
.hb-we3-timer { position: absolute; left: 14px; right: 14px; bottom: 3px; height: 2px; border-radius: 2px; background: var(--hb-we3-accent); transform-origin: left; transform: scaleX(0); }
.hb-we3[data-play="true"] .hb-we3-opt[aria-checked="true"] .hb-we3-timer { animation: hb-we3-timer var(--hb-we3-dur, 3.6s) linear both; }
.hb-we3-detail { display: grid; gap: 6px; min-height: 92px; padding: 16px 18px; border-radius: 14px; background: rgba(255,255,255,.025); box-shadow: inset 0 0 0 1px rgba(255,255,255,.06); max-width: 420px; }
.hb-we3-detail h3 { margin: 0; font-size: 15px; font-weight: 600; }
.hb-we3-detail p { margin: 0; color: #a1a1a1; font-size: 13.5px; line-height: 1.55; }
.hb-we3-detail > * { animation: hb-we3-rise .5s cubic-bezier(.2,.8,.2,1) both; }
.hb-we3-stage { position: relative; width: 100%; aspect-ratio: 10 / 8; container-type: inline-size; min-width: 0; }
.hb-we3-glow { position: absolute; left: 50%; top: 46%; width: 70cqw; height: 50cqw; transform: translate(-50%, -50%); background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-we3-accent) 30%, transparent), transparent); filter: blur(10px); pointer-events: none; }
.hb-we3-floor { position: absolute; left: 12%; right: 12%; bottom: 6%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent); }
.hb-we3-frame {
  position: absolute; left: 50%; top: 45%; transform: translate(-50%, -50%);
  width: var(--hb-we3-w); height: var(--hb-we3-h); border-radius: var(--hb-we3-r); padding: var(--hb-we3-b);
  background: linear-gradient(160deg, #3a3a40, #17171a 40%, #0f0f11); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14), inset 0 1px 0 rgba(255,255,255,.2), 0 40px 80px -30px rgba(0,0,0,.9), 0 0 0 1px rgba(0,0,0,.6);
  transition: width .8s cubic-bezier(.65,0,.25,1), height .8s cubic-bezier(.65,0,.25,1), border-radius .8s cubic-bezier(.65,0,.25,1), padding .8s cubic-bezier(.65,0,.25,1), top .8s cubic-bezier(.65,0,.25,1);
}
.hb-we3-frame[data-d="watch"] { --hb-we3-w: 30cqw; --hb-we3-h: 36cqw; --hb-we3-r: 9cqw; --hb-we3-b: 2.2cqw; }
.hb-we3-frame[data-d="phone"] { --hb-we3-w: 33cqw; --hb-we3-h: 68cqw; --hb-we3-r: 6.4cqw; --hb-we3-b: 1.5cqw; top: 46%; }
.hb-we3-frame[data-d="tablet"] { --hb-we3-w: 74cqw; --hb-we3-h: 54cqw; --hb-we3-r: 4.4cqw; --hb-we3-b: 2cqw; }
.hb-we3-frame[data-d="laptop"] { --hb-we3-w: 82cqw; --hb-we3-h: 52cqw; --hb-we3-r: 2.2cqw; --hb-we3-b: 1.4cqw; top: 41%; }
.hb-we3-band { position: absolute; right: -1.2cqw; top: 30%; width: 1.2cqw; height: 9cqw; border-radius: 0 1cqw 1cqw 0; background: linear-gradient(90deg, #26262b, #3a3a42); opacity: 0; transition: opacity .4s ease; }
.hb-we3-frame[data-d="watch"] .hb-we3-band { opacity: 1; }
.hb-we3-base {
  position: absolute; left: 50%; top: calc(100% - .2cqw); width: 112%; height: 2.6cqw; transform: translateX(-50%) scaleX(.6); transform-origin: top;
  border-radius: 0 0 2cqw 2cqw; background: linear-gradient(180deg, #4a4a52, #1d1d21); box-shadow: 0 18px 30px -12px rgba(0,0,0,.9); opacity: 0;
  transition: opacity .45s ease, transform .8s cubic-bezier(.65,0,.25,1);
}
.hb-we3-base::after { content: ""; position: absolute; left: 50%; top: 0; width: 16%; height: 36%; transform: translateX(-50%); border-radius: 0 0 1cqw 1cqw; background: #141417; }
.hb-we3-frame[data-d="laptop"] .hb-we3-base { opacity: 1; transform: translateX(-50%) scaleX(1); transition-delay: .25s, 0s; }
.hb-we3-screen { position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: calc(var(--hb-we3-r) - var(--hb-we3-b) * .7); background: #0d0d10; transition: border-radius .8s cubic-bezier(.65,0,.25,1); }
.hb-we3-notch { position: absolute; left: 50%; top: 2.2%; z-index: 3; width: 30%; height: 3.4%; border-radius: 99px; background: #000; transform: translateX(-50%) scale(0); transition: transform .4s cubic-bezier(.3,1.4,.5,1); }
.hb-we3-frame[data-d="phone"] .hb-we3-notch { transform: translateX(-50%) scale(1); transition-delay: .5s; }
.hb-we3-app { position: absolute; inset: 0; display: flex; animation: hb-we3-swap .7s cubic-bezier(.2,.8,.2,1) both; }
.hb-we3-side { display: none; flex: none; width: 23%; padding: 4.2cqw 1.6cqw; border-right: 1px solid rgba(255,255,255,.06); background: #111114; }
.hb-we3-side b { display: block; margin-bottom: 1.6cqw; font-size: 1.6cqw; color: #fff; }
.hb-we3-side span { display: flex; align-items: center; gap: .8cqw; padding: .7cqw .8cqw; border-radius: .8cqw; color: #8f8f8f; font-size: 1.3cqw; }
.hb-we3-side span[data-on="true"] { background: rgba(255,255,255,.07); color: #fff; }
.hb-we3-side i { width: 1cqw; height: 1cqw; border-radius: .3cqw; font-style: normal; background: var(--hb-we3-accent); opacity: .8; }
.hb-we3-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1.4cqw; padding: 3cqw 2.4cqw; }
.hb-we3-bar { display: flex; align-items: center; justify-content: space-between; gap: 1cqw; }
.hb-we3-bar b { font-size: 2.2cqw; font-weight: 650; color: #fff; letter-spacing: -.02em; }
.hb-we3-bar span { font-size: 1.2cqw; color: #8f8f8f; }
.hb-we3-act { display: flex; gap: .8cqw; }
.hb-we3-act span { padding: .5cqw 1.1cqw; border-radius: 99px; background: rgba(255,255,255,.07); color: #ededed; }
.hb-we3-act span:last-child { background: var(--hb-we3-accent); color: #fff; }
.hb-we3-albums { display: none; gap: 1.2cqw; }
.hb-we3-album { flex: 1; height: 7cqw; border-radius: 1.2cqw; position: relative; overflow: hidden; }
.hb-we3-album em { position: absolute; left: 1cqw; bottom: .8cqw; font-style: normal; font-size: 1.3cqw; font-weight: 600; color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,.5); }
.hb-we3-grid { display: grid; grid-template-columns: repeat(var(--hb-we3-cols, 2), 1fr); gap: .9cqw; align-content: start; }
.hb-we3-tile { position: relative; aspect-ratio: 1; border-radius: .9cqw; overflow: hidden; animation: hb-we3-tile .6s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-we3-k) * 45ms + 200ms); }
.hb-we3-tile::after { content: ""; position: absolute; left: -10%; right: -10%; bottom: -20%; height: 60%; background: rgba(0,0,0,.35); border-radius: 50% 50% 0 0; transform: rotate(var(--hb-we3-rot)); }
.hb-we3-app[data-d="phone"] .hb-we3-main { padding: 7cqw 2cqw 2cqw; gap: 1.6cqw; }
.hb-we3-app[data-d="phone"] .hb-we3-bar b { font-size: 3cqw; }
.hb-we3-app[data-d="phone"] .hb-we3-act { display: none; }
.hb-we3-app[data-d="tablet"] { --hb-we3-cols: 4; }
.hb-we3-app[data-d="tablet"] .hb-we3-albums { display: flex; }
.hb-we3-app[data-d="laptop"] { --hb-we3-cols: 5; }
.hb-we3-app[data-d="laptop"] .hb-we3-side { display: block; }
.hb-we3-app[data-d="laptop"] .hb-we3-main { padding: 2.4cqw 2cqw; }
.hb-we3-app[data-d="laptop"] .hb-we3-bar b { font-size: 1.9cqw; }
.hb-we3-watch { position: absolute; inset: 0; display: grid; place-items: center; animation: hb-we3-swap .7s cubic-bezier(.2,.8,.2,1) both; }
.hb-we3-watch-photo { position: absolute; inset: 0; opacity: .55; }
.hb-we3-watch-ring { position: relative; width: 62%; aspect-ratio: 1; }
.hb-we3-watch-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-we3-watch-ring circle:last-child { stroke-dasharray: 100; stroke-dashoffset: 100; animation: hb-we3-ring 1.2s .3s cubic-bezier(.2,.8,.2,1) forwards; }
.hb-we3-watch-txt { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; }
.hb-we3-watch-txt b { font-size: 5.2cqw; font-weight: 650; color: #fff; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
.hb-we3-watch-txt span { font-size: 1.7cqw; color: rgba(255,255,255,.75); }
@keyframes hb-we3-swap { from { opacity: 0; filter: blur(6px); transform: scale(1.04); } to { opacity: 1; filter: blur(0); transform: scale(1); } }
@keyframes hb-we3-tile { from { opacity: 0; transform: translateY(10%) scale(.92); } to { opacity: 1; transform: none; } }
@keyframes hb-we3-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes hb-we3-ring { to { stroke-dashoffset: 28; } }
@keyframes hb-we3-timer { to { transform: scaleX(1); } }
@container (min-width: 860px) {
  .hb-we3-inner { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-we3 *, .hb-we3 *::before, .hb-we3 *::after { transition: none !important; animation: none !important; }
  .hb-we3-watch-ring circle:last-child { stroke-dashoffset: 28; }
}
`;

function hash(n: number) {
  let x = (n * 2654435761) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x2c1b3c6d) >>> 0;
  x = Math.imul(x ^ (x >>> 12), 0x297a2d39) >>> 0;
  return (x ^ (x >>> 15)) >>> 0;
}

function photo(i: number): React.CSSProperties {
  const h = hash(i + 3);
  const hue = h % 360;
  const sx = 20 + ((h >>> 9) % 60);
  const sy = 18 + ((h >>> 15) % 30);
  return {
    background: `radial-gradient(circle at ${sx}% ${sy}%, hsl(${(hue + 40) % 360} 95% 78%) 0 7%, transparent 8%), linear-gradient(180deg, hsl(${hue} 60% 46%) 0%, hsl(${(hue + 30) % 360} 70% 26%) 100%)`,
    "--hb-we3-rot": `${(((h >>> 20) % 14) - 7).toFixed(0)}deg`,
  } as React.CSSProperties;
}

function DeviceIcon({ id }: { id: DeviceGalleryKind }) {
  if (id === "watch") return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="5" y="4.5" width="10" height="11" rx="3" stroke="currentColor" strokeWidth="1.4" /><path d="M7 4.5 7.6 2h4.8l.6 2.5M7 15.5l.6 2.5h4.8l.6-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>;
  if (id === "phone") return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="5.5" y="2" width="9" height="16" rx="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 4h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>;
  if (id === "tablet") return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="10" cy="5.8" r=".6" fill="currentColor" /></svg>;
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3.5" y="4" width="13" height="9" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><path d="M1.5 15.5h17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>;
}

export function ShowcaseDeviceGallery({
  eyebrow = "One library, every screen",
  title = "Your trip, shaped to whatever you are holding",
  subtitle = "Wander keeps the same photos everywhere and rearranges the interface around the screen in your hand. Pick a device and watch it reflow.",
  appName = "Wander",
  devices = defaultDevices,
  defaultDevice = "phone",
  device,
  onDeviceChange,
  autoPlay = true,
  interval = 3600,
  accent = "#8b5cf6",
  className,
  style,
  ...rest
}: ShowcaseDeviceGalleryProps) {
  const [inner, setInner] = React.useState<DeviceGalleryKind>(defaultDevice);
  const current = device ?? inner;
  const [paused, setPaused] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const optRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const idx = Math.max(0, devices.findIndex((d) => d.id === current));
  const info = devices[idx] ?? devices[0];

  const choose = React.useCallback(
    (id: DeviceGalleryKind) => {
      if (device === undefined) setInner(id);
      onDeviceChange?.(id);
    },
    [device, onDeviceChange],
  );

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    const t = window.setTimeout(on, 0);
    mq.addEventListener("change", on);
    return () => {
      window.clearTimeout(t);
      mq.removeEventListener("change", on);
    };
  }, []);

  const playing = autoPlay && !paused && !reduced && devices.length > 1;

  React.useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => {
      choose(devices[(idx + 1) % devices.length].id);
    }, interval);
    return () => window.clearTimeout(t);
  }, [playing, idx, interval, devices, choose]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % devices.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + devices.length) % devices.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = devices.length - 1;
    if (n < 0) return;
    e.preventDefault();
    choose(devices[n].id);
    optRefs.current[n]?.focus();
  };

  const tileCount = current === "laptop" ? 15 : current === "tablet" ? 8 : 6;

  return (
    <section
      className={["hb-we3", className].filter(Boolean).join(" ")}
      style={{ "--hb-we3-accent": accent, "--hb-we3-dur": `${interval}ms`, ...style } as React.CSSProperties}
      data-play={playing ? "true" : "false"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      {...rest}
    >
      <style href="hb-showcase-device-gallery" precedence="default">{css}</style>
      <div className="hb-we3-inner">
        <div className="hb-we3-copy">
          {eyebrow ? <p className="hb-we3-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-we3-title">{title}</h2>
          {subtitle ? <p className="hb-we3-sub">{subtitle}</p> : null}
          <div className="hb-we3-picker" role="radiogroup" aria-label="Device" style={{ "--hb-we3-i": idx } as React.CSSProperties}>
            <span className="hb-we3-pill" aria-hidden="true" />
            {devices.map((d, i) => (
              <button
                key={d.id}
                ref={(el) => {
                  optRefs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={d.id === current}
                tabIndex={d.id === current ? 0 : -1}
                className="hb-we3-opt"
                onClick={() => choose(d.id)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <DeviceIcon id={d.id} />
                {d.label}
                <span className="hb-we3-timer" key={`${d.id}-${current}`} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="hb-we3-detail" key={current} aria-live="polite">
            <h3>{info.headline}</h3>
            <p>{info.detail}</p>
          </div>
        </div>
        <div className="hb-we3-stage" aria-label={`${appName} on ${info.label}`} role="img">
          <div className="hb-we3-glow" />
          <div className="hb-we3-floor" />
          <div className="hb-we3-frame" data-d={current}>
            <span className="hb-we3-band" />
            <span className="hb-we3-base" />
            <div className="hb-we3-screen">
              <span className="hb-we3-notch" />
              {current === "watch" ? (
                <div className="hb-we3-watch" key="watch">
                  <div className="hb-we3-watch-photo" style={photo(4)} />
                  <div className="hb-we3-watch-ring">
                    <svg viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="15.9" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="3" />
                      <circle cx="20" cy="20" r="15.9" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" pathLength={100} />
                    </svg>
                    <div className="hb-we3-watch-txt">
                      <b>10:09</b>
                      <span>Day 3 · Kyoto</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hb-we3-app" data-d={current} key={current}>
                  <aside className="hb-we3-side">
                    <b>{appName}</b>
                    {["Library", "Kyoto 2026", "Lisbon", "Favorites", "Shared"].map((s, i) => (
                      <span key={s} data-on={i === 1 ? "true" : "false"}><i />{s}</span>
                    ))}
                  </aside>
                  <div className="hb-we3-main">
                    <div className="hb-we3-bar">
                      <div>
                        <b>{current === "phone" ? "Library" : "Kyoto 2026"}</b>
                        <br />
                        <span>{current === "phone" ? "1,284 photos" : "214 photos · 9 days"}</span>
                      </div>
                      <div className="hb-we3-act">
                        <span>Select</span>
                        <span>Share</span>
                      </div>
                    </div>
                    <div className="hb-we3-albums">
                      {[0, 1, 2].map((k) => (
                        <div key={k} className="hb-we3-album" style={photo(20 + k)}>
                          <em>{places[k + 3]}</em>
                        </div>
                      ))}
                    </div>
                    <div className="hb-we3-grid">
                      {Array.from({ length: tileCount }, (_, k) => (
                        <div key={k} className="hb-we3-tile" style={{ ...photo(k), "--hb-we3-k": k } as React.CSSProperties} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
