"use client";

import * as React from "react";

export interface CinemaMarqueeSignProps extends React.HTMLAttributes<HTMLElement> {
  venue?: string;
  sets?: string[][];
  interval?: number;
  tilt?: boolean;
  neon?: string;
  bulbs?: string;
  caption?: string;
}

const css = `
.hb-vc14 {
  --hb-vc14-neon: #ff3b6b;
  --hb-vc14-bulb: #ffd88a;
  --hb-vc14-rx: 0deg;
  --hb-vc14-ry: 0deg;
  position: relative;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 100%;
  height: 600px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background:
    radial-gradient(60% 50% at 50% 40%, color-mix(in srgb, var(--hb-vc14-neon) 16%, transparent), transparent 70%),
    linear-gradient(180deg, #07060b 0%, #0e0b14 62%, #050407 62.2%, #0b0910 100%);
  color: #fff;
  font-family: inherit;
  perspective: 1300px;
  -webkit-font-smoothing: antialiased;
}
.hb-vc14 *, .hb-vc14 *::before, .hb-vc14 *::after { box-sizing: border-box; }
.hb-vc14-wall {
  position: absolute;
  inset: 0 0 38%;
  background: repeating-linear-gradient(0deg, rgba(255, 255, 255, .018) 0 2px, transparent 2px 26px), repeating-linear-gradient(90deg, rgba(255, 255, 255, .015) 0 2px, transparent 2px 54px);
}
.hb-vc14-wet {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 38%;
  background: radial-gradient(40% 60% at 50% 0%, color-mix(in srgb, var(--hb-vc14-bulb) 22%, transparent), transparent 70%), radial-gradient(20% 50% at 20% 0%, color-mix(in srgb, var(--hb-vc14-neon) 26%, transparent), transparent 70%);
  filter: blur(6px);
}
.hb-vc14-rig {
  position: relative;
  width: min(84cqi, 760px);
  transform-style: preserve-3d;
  transform: translate3d(0, -4%, 0) rotateX(var(--hb-vc14-rx)) rotateY(var(--hb-vc14-ry));
  transition: transform .9s cubic-bezier(.2, .7, .2, 1);
}
.hb-vc14-idle { transform-style: preserve-3d; animation: hb-vc14-idle 9s ease-in-out infinite alternate; }
.hb-vc14[data-hover="true"] .hb-vc14-idle { animation-play-state: paused; }
@keyframes hb-vc14-idle {
  from { transform: rotateY(-7deg) rotateX(4deg); }
  to { transform: rotateY(7deg) rotateX(2deg); }
}
.hb-vc14-crown {
  position: relative;
  margin: 0 auto -2px;
  width: 64%;
  padding: 10px 0 12px;
  border: 2px solid #1d1822;
  border-bottom: 0;
  border-radius: 14px 14px 0 0;
  background: linear-gradient(180deg, #17121d, #0d0a11);
  text-align: center;
  transform: translateZ(18px);
}
.hb-vc14-venue {
  margin: 0;
  color: #fff4f7;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(20px, 4.6cqi, 44px);
  font-weight: 700;
  letter-spacing: .3em;
  padding-left: .3em;
  text-shadow: 0 0 4px #fff, 0 0 12px var(--hb-vc14-neon), 0 0 30px var(--hb-vc14-neon), 0 0 60px var(--hb-vc14-neon);
  animation: hb-vc14-neon 6s steps(1, end) infinite;
}
@keyframes hb-vc14-neon {
  0%, 18%, 22%, 62%, 64%, 100% { opacity: 1; }
  20%, 63% { opacity: .55; }
}
.hb-vc14-box {
  position: relative;
  padding: clamp(12px, 2.4cqi, 22px);
  border-radius: 12px;
  background: linear-gradient(180deg, #1f1925, #120e17);
  box-shadow: 0 0 0 2px #2a2231, 0 40px 80px -30px rgba(0, 0, 0, .9), 0 0 120px -30px color-mix(in srgb, var(--hb-vc14-bulb) 50%, transparent);
  transform: translateZ(30px);
  transform-style: preserve-3d;
}
.hb-vc14-box::after {
  content: "";
  position: absolute;
  left: 3%;
  right: 3%;
  top: 100%;
  height: 70px;
  background: linear-gradient(180deg, #2a2131, #0b090e);
  transform-origin: top;
  transform: rotateX(-78deg);
  box-shadow: inset 0 10px 30px rgba(255, 216, 138, .18);
}
.hb-vc14-bulbs { position: absolute; display: flex; justify-content: space-between; }
.hb-vc14-bulbs[data-edge="t"], .hb-vc14-bulbs[data-edge="b"] { left: 12px; right: 12px; height: 8px; }
.hb-vc14-bulbs[data-edge="t"] { top: 5px; }
.hb-vc14-bulbs[data-edge="b"] { bottom: 5px; }
.hb-vc14-bulbs[data-edge="l"], .hb-vc14-bulbs[data-edge="r"] { top: 22px; bottom: 22px; width: 8px; flex-direction: column; }
.hb-vc14-bulbs[data-edge="l"] { left: 5px; }
.hb-vc14-bulbs[data-edge="r"] { right: 5px; }
.hb-vc14-bulb {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff6dd;
  box-shadow: 0 0 6px 1px var(--hb-vc14-bulb), 0 0 14px 2px color-mix(in srgb, var(--hb-vc14-bulb) 60%, transparent);
  animation: hb-vc14-chase .9s steps(1, end) infinite;
}
.hb-vc14-bulb:nth-child(3n + 2) { animation-delay: -.3s; }
.hb-vc14-bulb:nth-child(3n) { animation-delay: -.6s; }
@keyframes hb-vc14-chase {
  0% { opacity: 1; }
  33.3% { opacity: .22; box-shadow: none; }
}
.hb-vc14-board {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(6px, 1.2cqi, 10px);
  padding: clamp(10px, 2cqi, 18px) clamp(8px, 2cqi, 18px);
  border-radius: 4px;
  background: linear-gradient(180deg, #fffdf6, #f3ecdb);
  box-shadow: inset 0 0 40px rgba(255, 230, 170, .5), inset 0 0 0 1px rgba(0, 0, 0, .1);
  overflow: hidden;
}
.hb-vc14-rail {
  position: relative;
  display: flex;
  justify-content: center;
  gap: .08em;
  width: 100%;
  min-height: 1.36em;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(13px, 3.3cqi, 30px);
  font-weight: 700;
  perspective: 400px;
}
.hb-vc14-rail::before {
  content: "";
  position: absolute;
  left: -20px;
  right: -20px;
  top: -2px;
  height: 2px;
  background: rgba(30, 24, 18, .25);
}
.hb-vc14-tile {
  display: grid;
  place-items: center;
  width: .86em;
  height: 1.3em;
  border-radius: 2px;
  background: #15110d;
  color: #fff8ea;
  line-height: 1;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .25);
  transform-origin: 50% 0;
  animation: hb-vc14-hang .9s cubic-bezier(.3, 1.6, .5, 1) both;
  animation-delay: calc(var(--hb-vc14-i) * 28ms);
}
.hb-vc14-tile[data-space] { background: transparent; box-shadow: none; width: .42em; }
@keyframes hb-vc14-hang {
  0% { opacity: 0; transform: translate3d(0, -140%, 0) rotateX(70deg); }
  45% { opacity: 1; transform: translate3d(0, 0, 0) rotateX(-18deg); }
  70% { transform: rotateX(8deg); }
  100% { opacity: 1; transform: none; }
}
.hb-vc14-blade {
  position: absolute;
  left: -14%;
  top: -22%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: clamp(38px, 7cqi, 64px);
  padding: 12px 0;
  border: 2px solid #2a2231;
  border-radius: 10px;
  background: linear-gradient(90deg, #120e17, #1c1622);
  transform: translateZ(60px) rotateY(24deg);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, .9);
}
.hb-vc14-bl {
  color: #fff;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(16px, 3.4cqi, 30px);
  font-weight: 700;
  line-height: 1.12;
  text-shadow: 0 0 4px #fff, 0 0 12px var(--hb-vc14-neon), 0 0 26px var(--hb-vc14-neon);
  opacity: .3;
  animation: hb-vc14-spell 4.2s ease-in-out infinite;
  animation-delay: calc(var(--hb-vc14-i) * 180ms);
}
@keyframes hb-vc14-spell {
  0%, 8% { opacity: .25; text-shadow: none; }
  14%, 80% { opacity: 1; }
  92%, 100% { opacity: .25; text-shadow: none; }
}
.hb-vc14-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.hb-vc14-caption {
  position: absolute;
  left: 50%;
  bottom: 22px;
  z-index: 2;
  margin: 0;
  color: rgba(255, 255, 255, .55);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: .2em;
  text-transform: uppercase;
  white-space: nowrap;
  transform: translateX(-50%);
}
.hb-vc14-dots { position: absolute; right: 22px; bottom: 20px; z-index: 2; display: flex; gap: 6px; }
.hb-vc14-dot {
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: grid;
  place-items: center;
}
.hb-vc14-dot::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: rgba(255, 255, 255, .25); transition: background .3s ease, transform .3s ease; }
.hb-vc14-dot[aria-pressed="true"]::before { background: var(--hb-vc14-bulb); transform: scale(1.3); box-shadow: 0 0 8px var(--hb-vc14-bulb); }
.hb-vc14-dot:focus-visible { outline: 2px solid var(--hb-vc14-bulb); outline-offset: 1px; border-radius: 50%; }
@container (max-width: 560px) {
  .hb-vc14-blade { display: none; }
  .hb-vc14-caption { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vc14-idle, .hb-vc14-venue, .hb-vc14-bulb, .hb-vc14-tile, .hb-vc14-bl { animation: none; opacity: 1; }
  .hb-vc14-rig { transition: none; transform: translate3d(0, -4%, 0); }
}
`;

const defaultSets = [
  ["Now playing", "Salt & Static", "7:15   9:40"],
  ["Midnight show", "The Long Quiet", "Fri & Sat 11:45"],
  ["Opening Thursday", "Deep Relay", "Tickets on sale"],
];

export function CinemaMarqueeSign({
  venue = "Orpheum",
  sets = defaultSets,
  interval = 4600,
  tilt = true,
  neon = "#ff3b6b",
  bulbs = "#ffd88a",
  caption = "Since 1928 · 412 Alder Street",
  className,
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: CinemaMarqueeSignProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [index, setIndex] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const [manual, setManual] = React.useState(false);
  const count = sets.length;

  React.useEffect(() => {
    if (count < 2 || manual) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [count, interval, manual]);

  const move = (e: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(e);
    if (!tilt || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--hb-vc14-ry", `${(x * 18).toFixed(2)}deg`);
    el.style.setProperty("--hb-vc14-rx", `${(-y * 12).toFixed(2)}deg`);
    if (!hover) setHover(true);
  };

  const leave = (e: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(e);
    ref.current?.style.setProperty("--hb-vc14-ry", "0deg");
    ref.current?.style.setProperty("--hb-vc14-rx", "0deg");
    setHover(false);
  };

  const lines = sets[index % Math.max(1, count)] ?? [];
  const bulbRow = (n: number) => Array.from({ length: n }, (_, i) => <span key={i} className="hb-vc14-bulb" />);
  const vars = { "--hb-vc14-neon": neon, "--hb-vc14-bulb": bulbs, ...style } as React.CSSProperties;
  let tileIndex = 0;

  return (
    <section
      ref={ref}
      className={["hb-vc14", className].filter(Boolean).join(" ")}
      style={vars}
      data-hover={hover ? "true" : "false"}
      aria-label={`${venue} marquee`}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      <style href="hb-cinema-marquee-sign" precedence="default">{css}</style>
      <span className="hb-vc14-wall" aria-hidden="true" />
      <span className="hb-vc14-wet" aria-hidden="true" />
      <div className="hb-vc14-rig">
        <div className="hb-vc14-idle">
          <div className="hb-vc14-blade" aria-hidden="true">
            {venue.toUpperCase().split("").map((ch, i) => (
              <span key={i} className="hb-vc14-bl" style={{ "--hb-vc14-i": String(i) } as React.CSSProperties}>{ch}</span>
            ))}
          </div>
          <div className="hb-vc14-crown">
            <p className="hb-vc14-venue">{venue.toUpperCase()}</p>
          </div>
          <div className="hb-vc14-box">
            <span className="hb-vc14-bulbs" data-edge="t" aria-hidden="true">{bulbRow(30)}</span>
            <span className="hb-vc14-bulbs" data-edge="b" aria-hidden="true">{bulbRow(30)}</span>
            <span className="hb-vc14-bulbs" data-edge="l" aria-hidden="true">{bulbRow(6)}</span>
            <span className="hb-vc14-bulbs" data-edge="r" aria-hidden="true">{bulbRow(6)}</span>
            <div className="hb-vc14-board" aria-live="polite">
              {lines.map((line, li) => (
                <div key={`${index}-${li}`} className="hb-vc14-rail">
                  <span className="hb-vc14-sr">{line}</span>
                  {line.toUpperCase().split("").map((ch, ci) => {
                    const i = tileIndex++;
                    return ch === " " ? (
                      <span key={ci} className="hb-vc14-tile" data-space="" aria-hidden="true" style={{ "--hb-vc14-i": String(i) } as React.CSSProperties} />
                    ) : (
                      <span key={ci} className="hb-vc14-tile" aria-hidden="true" style={{ "--hb-vc14-i": String(i) } as React.CSSProperties}>{ch}</span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {caption ? <p className="hb-vc14-caption">{caption}</p> : null}
      {count > 1 ? (
        <div className="hb-vc14-dots">
          {sets.map((s, i) => (
            <button
              key={i}
              type="button"
              className="hb-vc14-dot"
              aria-label={`Show ${s[1] ?? s[0]}`}
              aria-pressed={i === index}
              onClick={() => {
                setManual(true);
                setIndex(i);
              }}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
