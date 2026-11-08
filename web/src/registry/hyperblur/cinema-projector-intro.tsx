"use client";

import * as React from "react";

export interface CinemaProjectorIntroAction {
  label: string;
  href: string;
}

export interface CinemaProjectorIntroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  presenter?: string;
  reelLabel?: string;
  title?: string;
  schedule?: string;
  cta?: CinemaProjectorIntroAction | null;
  duration?: number;
  loop?: boolean;
  beam?: string;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vc6 {
  --hb-vc6-beam: #cfe2ff;
  --hb-vc6-dur: 12s;
  --hb-vc6-iter: infinite;
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 600px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: radial-gradient(80% 60% at 50% 30%, #12141a, #040405 75%);
  color: #f3f0ea;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc6 *, .hb-vc6 *::before, .hb-vc6 *::after { box-sizing: border-box; }
.hb-vc6-curtain {
  position: absolute;
  top: 0;
  bottom: 22%;
  z-index: 0;
  width: 13%;
  background: repeating-linear-gradient(90deg, #2a0c10 0 14px, #3d1218 14px 22px, #1c080b 22px 30px);
  box-shadow: inset 0 -40px 60px rgba(0, 0, 0, .7);
}
.hb-vc6-curtain[data-side="l"] { left: 0; -webkit-mask-image: linear-gradient(90deg, #000 60%, transparent); mask-image: linear-gradient(90deg, #000 60%, transparent); }
.hb-vc6-curtain[data-side="r"] { right: 0; -webkit-mask-image: linear-gradient(270deg, #000 60%, transparent); mask-image: linear-gradient(270deg, #000 60%, transparent); }
.hb-vc6-beam {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  clip-path: polygon(49.3% 86%, 15% 64%, 15% 7%, 85% 7%, 85% 64%, 50.7% 86%);
  background:
    radial-gradient(70% 90% at 50% 88%, color-mix(in srgb, var(--hb-vc6-beam) 34%, transparent), transparent 70%),
    linear-gradient(0deg, color-mix(in srgb, var(--hb-vc6-beam) 22%, transparent), color-mix(in srgb, var(--hb-vc6-beam) 6%, transparent));
  mix-blend-mode: screen;
  animation: hb-vc6-ignite var(--hb-vc6-dur) linear var(--hb-vc6-iter) both, hb-vc6-pulse .18s steps(2, end) infinite;
}
@keyframes hb-vc6-ignite {
  0%, 5% { opacity: 0; }
  6% { opacity: .6; }
  7% { opacity: .1; }
  9% { opacity: 1; }
  100% { opacity: 1; }
}
@keyframes hb-vc6-pulse {
  0% { filter: brightness(1); }
  100% { filter: brightness(.88); }
}
.hb-vc6-mote {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #fff;
  opacity: .55;
  animation: hb-vc6-mote var(--hb-vc6-m, 9s) ease-in-out infinite alternate;
}
@keyframes hb-vc6-mote {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(var(--hb-vc6-dx, 10px), var(--hb-vc6-dy, -20px), 0); }
}
.hb-vc6-screen {
  position: absolute;
  left: 15%;
  right: 15%;
  top: 7%;
  height: 57%;
  z-index: 2;
  overflow: hidden;
  border-radius: 3px;
  background: #0a0a0b;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .04), 0 30px 120px -20px color-mix(in srgb, var(--hb-vc6-beam) 30%, transparent);
}
.hb-vc6-cycle {
  position: absolute;
  inset: 0;
}
.hb-vc6[data-loop="true"] .hb-vc6-cycle { animation: hb-vc6-cycle var(--hb-vc6-dur) linear infinite; }
@keyframes hb-vc6-cycle {
  0%, 92% { opacity: 1; }
  98%, 100% { opacity: 0; }
}
.hb-vc6-film {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: radial-gradient(90% 90% at 50% 50%, #f3eee4, #b9b2a4 80%, #6d675c);
  animation: hb-vc6-film var(--hb-vc6-dur) linear var(--hb-vc6-iter) both, hb-vc6-flicker .2s steps(3, end) infinite;
}
@keyframes hb-vc6-film {
  0%, 8% { opacity: 0; }
  9% { opacity: 1; }
  100% { opacity: 1; }
}
@keyframes hb-vc6-flicker {
  0% { filter: brightness(1) contrast(1.05); }
  33% { filter: brightness(.9) contrast(1.1); }
  66% { filter: brightness(1.04) contrast(1); }
}
.hb-vc6-reel {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #1a1814;
  opacity: 0;
  animation: hb-vc6-reel var(--hb-vc6-dur) linear var(--hb-vc6-iter) both;
}
@keyframes hb-vc6-reel {
  0%, 10% { opacity: 0; }
  11%, 30% { opacity: 1; }
  31%, 100% { opacity: 0; }
}
.hb-vc6-reel-in { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.hb-vc6-reel-ring {
  display: grid;
  place-items: center;
  width: clamp(60px, 12cqi, 120px);
  aspect-ratio: 1;
  border: 2px solid currentColor;
  border-radius: 50%;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(28px, 6cqi, 60px);
  font-weight: 700;
}
.hb-vc6-reel-label {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9px, 1.2cqi, 12px);
  letter-spacing: .4em;
  text-transform: uppercase;
}
.hb-vc6-title-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 6%;
  color: #15130f;
  text-align: center;
  animation: hb-vc6-title var(--hb-vc6-dur) cubic-bezier(.2, .7, .2, 1) var(--hb-vc6-iter) both;
}
@keyframes hb-vc6-title {
  0%, 31% { opacity: 0; transform: scale(1.04); filter: blur(3px); }
  38%, 100% { opacity: 1; transform: none; filter: blur(0); }
}
.hb-vc6-presenter {
  margin: 0 0 10px;
  font-size: clamp(9px, 1.15cqi, 12px);
  font-weight: 600;
  letter-spacing: .38em;
  text-transform: uppercase;
  opacity: .72;
}
.hb-vc6-title {
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(30px, 7.4cqi, 92px);
  font-weight: 700;
  line-height: .88;
  letter-spacing: -.035em;
  text-transform: uppercase;
}
.hb-vc6-schedule {
  margin: 12px 0 0;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(9.5px, 1.25cqi, 13px);
  letter-spacing: .14em;
  text-transform: uppercase;
  opacity: .78;
}
.hb-vc6-scratch {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(30, 26, 20, .55);
  opacity: 0;
  animation: hb-vc6-scratch 1.7s steps(1, end) infinite;
}
.hb-vc6-scratch:nth-of-type(2) { animation-duration: 2.3s; animation-delay: -.7s; }
.hb-vc6-scratch:nth-of-type(3) { animation-duration: 3.1s; animation-delay: -1.9s; background: rgba(255, 255, 255, .6); }
@keyframes hb-vc6-scratch {
  0% { opacity: .9; left: 22%; }
  8% { opacity: 0; }
  31% { opacity: .7; left: 71%; }
  36% { opacity: 0; }
  58% { opacity: .8; left: 43%; }
  62% { opacity: 0; }
  83% { opacity: .5; left: 88%; }
  86% { opacity: 0; }
}
.hb-vc6-vig {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(100% 100% at 50% 50%, transparent 55%, rgba(0, 0, 0, .55));
}
.hb-vc6-crowd {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  height: 30%;
  pointer-events: none;
}
.hb-vc6-crowd svg { display: block; width: 100%; height: 100%; }
.hb-vc6-source {
  position: absolute;
  left: 50%;
  top: 86%;
  z-index: 2;
  width: 26px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 20px 8px color-mix(in srgb, var(--hb-vc6-beam) 70%, transparent), 0 0 60px 20px color-mix(in srgb, var(--hb-vc6-beam) 30%, transparent);
  transform: translate(-50%, -50%);
  animation: hb-vc6-ignite var(--hb-vc6-dur) linear var(--hb-vc6-iter) both;
}
.hb-vc6-cta {
  position: absolute;
  left: 50%;
  bottom: 22px;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 42px;
  padding: 0 20px;
  border: 1px solid rgba(243, 240, 234, .2);
  border-radius: 999px;
  background: rgba(12, 12, 14, .7);
  color: #f3f0ea;
  font-size: 13.5px;
  font-weight: 550;
  text-decoration: none;
  white-space: nowrap;
  transform: translateX(-50%);
  backdrop-filter: blur(10px);
  transition: border-color .25s ease, background .25s ease;
}
.hb-vc6-cta:hover { border-color: rgba(243, 240, 234, .45); background: rgba(30, 30, 34, .8); }
.hb-vc6-cta:focus-visible { outline: 2px solid var(--hb-vc6-beam); outline-offset: 3px; }
.hb-vc6-cta i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff5a4a;
  font-style: normal;
  box-shadow: 0 0 10px #ff5a4a;
}
@container (max-width: 600px) {
  .hb-vc6-screen { left: 6%; right: 6%; }
  .hb-vc6-beam { clip-path: polygon(49.3% 86%, 6% 64%, 6% 7%, 94% 7%, 94% 64%, 50.7% 86%); }
  .hb-vc6-curtain { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vc6-beam, .hb-vc6-film, .hb-vc6-title-wrap, .hb-vc6-source, .hb-vc6-mote, .hb-vc6-scratch { animation: none !important; }
  .hb-vc6[data-loop="true"] .hb-vc6-cycle { animation: none; }
  .hb-vc6-reel { animation: none; opacity: 0; }
}
`;

const motes = Array.from({ length: 34 }, (_, i) => {
  const h = Math.imul(i + 3, 2654435761) >>> 0;
  const h2 = Math.imul(i + 41, 2246822519) >>> 0;
  return {
    left: (20 + (h % 6000) / 100).toFixed(2),
    top: (14 + (h2 % 6800) / 100).toFixed(2),
    dx: ((h >>> 8) % 40) - 20,
    dy: -(((h2 >>> 6) % 50) + 10),
    m: (6 + ((h >>> 4) % 70) / 10).toFixed(1),
    s: (1 + ((h2 >>> 3) % 3) * 0.5).toFixed(1),
  };
});

const heads = (row: number) =>
  Array.from({ length: 14 }, (_, i) => {
    const h = Math.imul(i * 7 + row * 31 + 5, 2654435761) >>> 0;
    const x = i * 118 + (row ? 60 : 0) + (h % 30) - 15;
    const r = 34 + (h % 9) + row * 6;
    return { x, r, y: row ? 270 : 220 + ((h >>> 5) % 14) };
  });

export function CinemaProjectorIntro({
  presenter = "The Northern Light Film Society presents",
  reelLabel = "Reel",
  title = "Midnight Matinee",
  schedule = "Restored prints · Every Friday · 11:45 PM",
  cta = { label: "See this month's program", href: "#" },
  duration = 12,
  loop = true,
  beam = "#cfe2ff",
  headingAs = "h1",
  className,
  style,
  ...rest
}: CinemaProjectorIntroProps) {
  const Heading = headingAs;
  const vars = {
    "--hb-vc6-beam": beam,
    "--hb-vc6-dur": `${duration}s`,
    "--hb-vc6-iter": loop ? "infinite" : "1",
    ...style,
  } as React.CSSProperties;

  return (
    <section className={["hb-vc6", className].filter(Boolean).join(" ")} style={vars} data-loop={loop ? "true" : "false"} {...rest}>
      <style href="hb-cinema-projector-intro" precedence="default">{css}</style>
      <span className="hb-vc6-curtain" data-side="l" aria-hidden="true" />
      <span className="hb-vc6-curtain" data-side="r" aria-hidden="true" />
      <div className="hb-vc6-beam" aria-hidden="true">
        {motes.map((m, i) => (
          <span
            key={i}
            className="hb-vc6-mote"
            style={{
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: `${m.s}px`,
              height: `${m.s}px`,
              "--hb-vc6-dx": `${m.dx}px`,
              "--hb-vc6-dy": `${m.dy}px`,
              "--hb-vc6-m": `${m.m}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="hb-vc6-screen">
        <div className="hb-vc6-cycle">
          <div className="hb-vc6-film">
            <div className="hb-vc6-reel" aria-hidden="true">
              <div className="hb-vc6-reel-in">
                <span className="hb-vc6-reel-ring">1</span>
                <span className="hb-vc6-reel-label">{reelLabel} one</span>
              </div>
            </div>
            <div className="hb-vc6-title-wrap">
              {presenter ? <p className="hb-vc6-presenter">{presenter}</p> : null}
              <Heading className="hb-vc6-title">{title}</Heading>
              {schedule ? <p className="hb-vc6-schedule">{schedule}</p> : null}
            </div>
            <span className="hb-vc6-scratch" aria-hidden="true" />
            <span className="hb-vc6-scratch" aria-hidden="true" />
            <span className="hb-vc6-scratch" aria-hidden="true" />
            <span className="hb-vc6-vig" aria-hidden="true" />
          </div>
        </div>
      </div>
      <span className="hb-vc6-source" aria-hidden="true" />
      <div className="hb-vc6-crowd" aria-hidden="true">
        <svg viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice">
          {[0, 1].map((row) => (
            <g key={row} fill={row ? "#020203" : "#08080a"}>
              {heads(row).map((hd, i) => (
                <g key={i}>
                  <ellipse cx={hd.x} cy={hd.y - hd.r * 0.9} rx={hd.r * 0.62} ry={hd.r * 0.78} />
                  <path d={`M${hd.x - hd.r * 1.5} 300 C${hd.x - hd.r * 1.4} ${hd.y - 4} ${hd.x - hd.r * 0.8} ${hd.y - hd.r * 0.25} ${hd.x} ${hd.y - hd.r * 0.25} C${hd.x + hd.r * 0.8} ${hd.y - hd.r * 0.25} ${hd.x + hd.r * 1.4} ${hd.y - 4} ${hd.x + hd.r * 1.5} 300Z`} />
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>
      {cta ? (
        <a className="hb-vc6-cta" href={cta.href}>
          <i aria-hidden="true" />
          {cta.label}
        </a>
      ) : null}
    </section>
  );
}
