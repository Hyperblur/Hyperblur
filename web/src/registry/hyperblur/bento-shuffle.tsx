"use client";

import * as React from "react";

export interface BentoShuffleProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  interval?: number;
  layout?: number;
  onLayoutChange?: (index: number) => void;
  accent?: string;
}

type Box = [number, number, number, number];

const layouts: Box[][] = [
  [[0, 0, 2, 2], [2, 0, 1, 1], [3, 0, 1, 2], [2, 1, 1, 1], [0, 2, 1, 1], [1, 2, 3, 1]],
  [[1, 0, 3, 2], [0, 1, 1, 2], [0, 0, 1, 1], [1, 2, 1, 1], [2, 2, 1, 1], [3, 2, 1, 1]],
  [[1, 1, 2, 2], [0, 0, 1, 2], [3, 1, 1, 1], [3, 2, 1, 1], [0, 2, 1, 1], [1, 0, 3, 1]],
];

const layoutNames = ["Canvas", "Gallery", "Board"];

const css = `
@keyframes hb-wa11-drift { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(6%, -4%) scale(1.08); } }
@keyframes hb-wa11-rise { from { opacity: 0; transform: translate3d(0, 14px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-wa11-tick { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.hb-wa11 {
  --hb-wa11-accent: #6d28d9;
  --hb-wa11-g: 12px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #ffffff;
  color: #111;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa11 *, .hb-wa11 *::before, .hb-wa11 *::after { box-sizing: border-box; }
.hb-wa11 em, .hb-wa11 i { font-style: normal; }
.hb-wa11-in { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa11-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px 40px; flex-wrap: wrap; margin-bottom: clamp(22px, 3.4cqi, 36px); }
.hb-wa11-eyebrow { margin: 0 0 12px; color: var(--hb-wa11-accent); font-size: 13px; font-weight: 600; }
.hb-wa11-title { margin: 0; max-width: 600px; font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4.4cqi, 50px); font-weight: 600; line-height: 1.02; letter-spacing: -.04em; text-wrap: balance; }
.hb-wa11-sub { margin: 12px 0 0; max-width: 500px; color: #666; font-size: 15px; line-height: 1.6; }
.hb-wa11-ctrl { display: flex; align-items: center; gap: 6px; padding: 4px; border: 1px solid #ececec; border-radius: 999px; background: #fafafa; }
.hb-wa11-ctrl button { position: relative; display: inline-flex; align-items: center; gap: 6px; overflow: hidden; padding: 7px 12px; border: 0; border-radius: 999px; background: none; color: #666; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: background .25s ease, color .25s ease; }
.hb-wa11-ctrl button[aria-pressed="true"] { background: #111; color: #fff; }
.hb-wa11-ctrl button:focus-visible { outline: 2px solid var(--hb-wa11-accent); outline-offset: 2px; }
.hb-wa11-ctrl button i.hb-wa11-bar { position: absolute; left: 12px; right: 12px; bottom: 3px; height: 2px; border-radius: 2px; background: rgba(255, 255, 255, .7); transform-origin: left; animation: hb-wa11-tick var(--hb-wa11-t) linear both; }
.hb-wa11[data-paused="true"] .hb-wa11-bar { animation-play-state: paused; }
.hb-wa11-ctrl > span { width: 1px; height: 18px; background: #e5e5e5; }
.hb-wa11-stage { position: relative; aspect-ratio: 16 / 8.6; }
.hb-wa11-tile { position: absolute; container-type: size; left: calc(var(--x) * (100% + var(--hb-wa11-g)) / 4); top: calc(var(--y) * (100% + var(--hb-wa11-g)) / 3); width: calc(var(--w) * (100% + var(--hb-wa11-g)) / 4 - var(--hb-wa11-g)); height: calc(var(--h) * (100% + var(--hb-wa11-g)) / 3 - var(--hb-wa11-g)); overflow: hidden; border: 1px solid #ececec; border-radius: 20px; background: #f7f7f8; transition: left .8s cubic-bezier(.65, 0, .2, 1), top .8s cubic-bezier(.65, 0, .2, 1), width .8s cubic-bezier(.65, 0, .2, 1), height .8s cubic-bezier(.65, 0, .2, 1); transition-delay: calc(var(--i) * 40ms); animation: hb-wa11-rise .7s cubic-bezier(.22, 1, .36, 1) backwards; animation-delay: calc(var(--i) * 70ms); }
.hb-wa11-tile:hover { border-color: #d9d9d9; }
.hb-wa11-lab { position: absolute; left: 14px; bottom: 12px; z-index: 2; display: inline-flex; align-items: center; gap: 6px; padding: 4px 9px; border-radius: 999px; background: rgba(255, 255, 255, .85); backdrop-filter: blur(6px); color: #333; font-size: 11.5px; font-weight: 600; box-shadow: 0 1px 2px rgba(0, 0, 0, .06); }
.hb-wa11-art { position: absolute; inset: 0; overflow: hidden; background: #1b1033; }
.hb-wa11-art i { position: absolute; border-radius: 50%; filter: blur(30px); animation: hb-wa11-drift 9s ease-in-out infinite; }
.hb-wa11-art b { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(255, 255, 255, .05) 0 1px, transparent 1px 4px); mix-blend-mode: overlay; }
.hb-wa11-art span { position: absolute; left: 7cqw; top: 9cqh; color: #fff; font-family: var(--font-grotesk, inherit); font-size: clamp(22px, 11cqmin, 64px); font-weight: 600; line-height: .95; letter-spacing: -.04em; mix-blend-mode: difference; }
.hb-wa11-pal { position: absolute; inset: 12px 12px 46px; display: flex; gap: 6px; }
.hb-wa11-pal i { flex: 1; border-radius: 10px; background: var(--c); transition: flex .5s cubic-bezier(.22, 1, .36, 1); }
.hb-wa11-pal i:hover { flex: 2.2; }
@container (max-aspect-ratio: 1 / 1.2) { .hb-wa11-pal { flex-direction: column; } }
.hb-wa11-type { position: absolute; inset: 14px 16px 44px; display: flex; flex-direction: column; justify-content: space-between; }
.hb-wa11-type strong { font-family: var(--font-grotesk, inherit); font-size: clamp(40px, 46cqmin, 130px); font-weight: 600; line-height: .85; letter-spacing: -.05em; }
.hb-wa11-type small { color: #777; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; line-height: 1.6; }
@container (max-height: 160px) { .hb-wa11-type small { display: none; } }
.hb-wa11-exp { position: absolute; inset: 14px 14px 46px; display: flex; flex-wrap: wrap; align-content: flex-start; gap: 6px; }
.hb-wa11-exp span { padding: 5px 9px; border: 1px solid #e5e5e5; border-radius: 8px; background: #fff; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; color: #444; }
.hb-wa11-exp span:first-child { border-color: transparent; background: var(--hb-wa11-accent); color: #fff; }
.hb-wa11-layers { position: absolute; inset: 14px 14px 46px; display: flex; flex-direction: column; gap: 4px; font-size: 11.5px; color: #555; }
.hb-wa11-layers div { display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 7px; white-space: nowrap; overflow: hidden; }
.hb-wa11-layers div[data-on="true"] { background: color-mix(in srgb, var(--hb-wa11-accent) 12%, #fff); color: var(--hb-wa11-accent); font-weight: 600; }
.hb-wa11-layers i { flex: none; width: 10px; height: 10px; border-radius: 3px; border: 1.5px solid currentColor; }
.hb-wa11-quote { position: absolute; inset: 0; display: flex; align-items: center; gap: 4cqw; padding: 18px 20px 44px; background: #111; color: #fff; }
.hb-wa11-quote p { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(14px, 14cqh, 24px); font-weight: 500; line-height: 1.25; letter-spacing: -.015em; }
.hb-wa11-quote small { display: block; margin-top: 8px; color: #a3a3a3; font-family: var(--font-sans, inherit); font-size: 12px; font-weight: 400; }
.hb-wa11-avs { display: flex; flex: none; }
.hb-wa11-avs span { display: grid; place-items: center; width: 34px; height: 34px; margin-left: -8px; border: 2px solid #111; border-radius: 50%; color: #111; font-size: 11px; font-weight: 800; }
@container (max-width: 300px) { .hb-wa11-avs { display: none; } .hb-wa11-quote p { font-size: 14px; } }
.hb-wa11-quote .hb-wa11-lab { background: rgba(255, 255, 255, .12); color: #fff; box-shadow: none; }
@container (max-width: 640px) {
  .hb-wa11-ctrl { display: none; }
  .hb-wa11-stage { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 170px; gap: var(--hb-wa11-g); aspect-ratio: auto; }
  .hb-wa11-tile { position: relative; left: auto !important; top: auto !important; width: auto !important; height: auto !important; }
  .hb-wa11-tile[data-k="0"], .hb-wa11-tile[data-k="5"] { grid-column: span 2; }
  .hb-wa11-tile[data-k="0"] { height: 240px !important; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa11 *, .hb-wa11 *::before, .hb-wa11 *::after { animation: none !important; transition: none !important; }
}
`;

const palette = ["#1b1033", "#6d28d9", "#c084fc", "#f0abfc", "#fde68a"];

export function BentoShuffle({
  eyebrow = "Glasswing for brand teams",
  title = "A board that rearranges itself around the work",
  subtitle = "Artwork, palette, type and exports live on one canvas. Switch views and every tile finds its new place.",
  autoPlay = true,
  interval = 3600,
  layout,
  onLayoutChange,
  accent = "#6d28d9",
  className,
  style,
  ...rest
}: BentoShuffleProps) {
  const [inner, setInner] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const active = (layout ?? inner) % layouts.length;

  const go = (i: number) => {
    const n = ((i % layouts.length) + layouts.length) % layouts.length;
    if (layout === undefined) setInner(n);
    onLayoutChange?.(n);
  };

  const boxes = layouts[active];

  const tiles: React.ReactNode[] = [
    <>
      <div className="hb-wa11-art" aria-hidden="true">
        <i style={{ left: "-10%", top: "-20%", width: "70%", height: "90%", background: "#7c3aed" }} />
        <i style={{ right: "-15%", top: "10%", width: "60%", height: "80%", background: "#f0abfc", animationDelay: "-3s" }} />
        <i style={{ left: "20%", bottom: "-30%", width: "60%", height: "70%", background: "#fbbf24", animationDelay: "-6s" }} />
        <b />
        <span>Fall<br />Campaign</span>
      </div>
      <span className="hb-wa11-lab">Artboard · 1920×1080</span>
    </>,
    <>
      <div className="hb-wa11-pal" aria-hidden="true">
        {palette.map((c) => (
          <i key={c} style={{ "--c": c } as React.CSSProperties} />
        ))}
      </div>
      <span className="hb-wa11-lab">Palette · 5 tokens</span>
    </>,
    <>
      <div className="hb-wa11-type">
        <strong>Aa</strong>
        <small>Grotesk 600<br />-4% tracking<br />Display / 64</small>
      </div>
      <span className="hb-wa11-lab">Type scale</span>
    </>,
    <>
      <div className="hb-wa11-exp">
        {["PNG", "SVG", "PDF", "MP4", "Lottie", "WebP"].map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
      <span className="hb-wa11-lab">Export</span>
    </>,
    <>
      <div className="hb-wa11-layers">
        <div><i />Headline</div>
        <div data-on="true"><i />Gradient blob</div>
        <div><i />Grain</div>
      </div>
      <span className="hb-wa11-lab">Layers · 14</span>
    </>,
    <>
      <div className="hb-wa11-quote">
        <span className="hb-wa11-avs" aria-hidden="true">
          {[["RV", "#f0abfc"], ["DK", "#fde68a"], ["AO", "#a7f3d0"]].map(([n, c]) => (
            <span key={n} style={{ background: c }}>{n}</span>
          ))}
        </span>
        <p>
          We shipped the whole fall campaign from one board, without a single handoff file.
          <small>Rosa Vidal, Brand Lead at Fernwood</small>
        </p>
        <span className="hb-wa11-lab">3 editing now</span>
      </div>
    </>,
  ];

  return (
    <section
      className={["hb-wa11", className].filter(Boolean).join(" ")}
      data-paused={paused || hover || !autoPlay}
      style={{ "--hb-wa11-accent": accent, "--hb-wa11-t": `${interval}ms`, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-bento-shuffle" precedence="default">{css}</style>
      <div className="hb-wa11-in">
        <div className="hb-wa11-head">
          <div>
            <p className="hb-wa11-eyebrow">{eyebrow}</p>
            <h2 className="hb-wa11-title">{title}</h2>
            <p className="hb-wa11-sub">{subtitle}</p>
          </div>
          <div className="hb-wa11-ctrl" role="group" aria-label="Board layout">
            {layoutNames.map((n, i) => (
              <button key={n} type="button" aria-pressed={i === active} onClick={() => go(i)}>
                {n}
                {i === active && autoPlay && <i key={active} className="hb-wa11-bar" aria-hidden="true" onAnimationEnd={() => go(active + 1)} />}
              </button>
            ))}
            <span aria-hidden="true" />
            <button type="button" aria-pressed={paused} aria-label={paused ? "Resume shuffle" : "Pause shuffle"} onClick={() => setPaused((p) => !p)}>
              {paused ? (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 2v8l7-4z" fill="currentColor" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 2h2v8H3zM7 2h2v8H7z" fill="currentColor" /></svg>
              )}
            </button>
          </div>
        </div>
        <div className="hb-wa11-stage" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
          {tiles.map((t, i) => {
            const [x, y, w, h] = boxes[i];
            return (
              <div key={i} className="hb-wa11-tile" data-k={i} style={{ "--x": x, "--y": y, "--w": w, "--h": h, "--i": i } as React.CSSProperties}>
                {t}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
