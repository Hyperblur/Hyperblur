"use client";

import * as React from "react";

export interface CinemaDepthFogAction {
  label: string;
  href: string;
}

export interface CinemaDepthFogProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  kicker?: string;
  title?: string;
  subtitle?: string;
  cta?: CinemaDepthFogAction | null;
  altitudes?: string[];
  tint?: string;
  fog?: number;
  depth?: number;
  speed?: number;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vc7 {
  --hb-vc7-tint: #7fa6c4;
  --hb-vc7-fog: .7;
  --hb-vc7-depth: 1;
  --hb-vc7-speed: 1;
  --hb-vc7-px: 0;
  --hb-vc7-py: 0;
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 600px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: linear-gradient(180deg, #0b1118 0%, color-mix(in srgb, var(--hb-vc7-tint) 32%, #0b1118) 55%, color-mix(in srgb, var(--hb-vc7-tint) 55%, #1a2230) 72%, #05070a 100%);
  color: #eef3f7;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc7 *, .hb-vc7 *::before, .hb-vc7 *::after { box-sizing: border-box; }
.hb-vc7-sway {
  position: absolute;
  inset: -4% -6%;
  animation: hb-vc7-sway calc(22s / var(--hb-vc7-speed)) ease-in-out infinite alternate;
}
@keyframes hb-vc7-sway {
  from { transform: translate3d(-1.2%, .4%, 0) scale(1.02); }
  to { transform: translate3d(1.2%, -.4%, 0) scale(1.05); }
}
.hb-vc7-sun {
  position: absolute;
  left: 58%;
  top: 22%;
  width: clamp(120px, 20cqi, 220px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, #fdf6e8 0 34%, color-mix(in srgb, #fdf6e8 40%, transparent) 36%, transparent 70%);
  opacity: .8;
  transform: translate3d(calc(var(--hb-vc7-px) * -6px * var(--hb-vc7-depth)), calc(var(--hb-vc7-py) * -4px * var(--hb-vc7-depth)), 0);
  transition: transform .9s cubic-bezier(.2, .7, .2, 1);
}
.hb-vc7-layer {
  position: absolute;
  left: -4%;
  right: -4%;
  bottom: 0;
  height: 100%;
  transform: translate3d(calc(var(--hb-vc7-px) * var(--hb-vc7-d) * 34px * var(--hb-vc7-depth)), calc(var(--hb-vc7-py) * var(--hb-vc7-d) * 14px * var(--hb-vc7-depth)), 0);
  transition: transform 1s cubic-bezier(.2, .7, .2, 1);
}
.hb-vc7-layer svg { display: block; width: 100%; height: 100%; }
.hb-vc7-fog {
  position: absolute;
  left: 0;
  width: 200%;
  height: 26%;
  pointer-events: none;
  background:
    radial-gradient(18% 50% at 12% 50%, rgba(220, 232, 242, var(--hb-vc7-a)), transparent 70%),
    radial-gradient(22% 60% at 36% 55%, rgba(220, 232, 242, var(--hb-vc7-a)), transparent 70%),
    radial-gradient(16% 50% at 62% 45%, rgba(220, 232, 242, var(--hb-vc7-a)), transparent 70%),
    radial-gradient(20% 55% at 86% 52%, rgba(220, 232, 242, var(--hb-vc7-a)), transparent 70%);
  filter: blur(14px);
  opacity: var(--hb-vc7-fog);
  animation: hb-vc7-fog var(--hb-vc7-t) linear infinite;
}
@keyframes hb-vc7-fog {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
.hb-vc7-bird {
  position: absolute;
  color: rgba(10, 14, 20, .7);
  animation: hb-vc7-bird calc(26s / var(--hb-vc7-speed)) linear infinite;
}
@keyframes hb-vc7-bird {
  from { transform: translate3d(-10cqi, 0, 0); }
  to { transform: translate3d(110cqi, -40px, 0); }
}
.hb-vc7-shade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(5, 8, 12, .78), rgba(5, 8, 12, .2) 50%, transparent), linear-gradient(0deg, rgba(4, 6, 9, .9), transparent 30%);
}
.hb-vc7-copy {
  position: absolute;
  left: clamp(22px, 6cqi, 72px);
  top: 50%;
  z-index: 3;
  max-width: 500px;
  padding-right: 22px;
  transform: translateY(-58%);
}
.hb-vc7-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  color: color-mix(in srgb, var(--hb-vc7-tint) 50%, #ffffff);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: .28em;
  text-transform: uppercase;
}
.hb-vc7-kicker::before { content: ""; width: 26px; height: 1px; background: currentColor; }
.hb-vc7-title {
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(40px, 7.6cqi, 96px);
  font-weight: 600;
  line-height: .92;
  letter-spacing: -.04em;
  text-shadow: 0 8px 40px rgba(0, 0, 0, .35);
}
.hb-vc7-sub {
  max-width: 400px;
  margin: 18px 0 0;
  color: rgba(238, 243, 247, .74);
  font-size: clamp(14px, 1.7cqi, 16px);
  line-height: 1.6;
}
.hb-vc7-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 46px;
  margin-top: 26px;
  padding: 0 8px 0 20px;
  border-radius: 999px;
  background: #eef3f7;
  color: #0a0f14;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: transform .2s ease, background .25s ease;
}
.hb-vc7-cta span {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #0a0f14;
  color: #eef3f7;
}
.hb-vc7-cta:hover { background: #ffffff; }
.hb-vc7-cta:active { transform: scale(.97); }
.hb-vc7-cta:focus-visible { outline: 2px solid var(--hb-vc7-tint); outline-offset: 3px; }
.hb-vc7-alt {
  position: absolute;
  right: clamp(16px, 4cqi, 44px);
  top: 50%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0;
  padding: 0 0 0 14px;
  border-left: 1px solid rgba(238, 243, 247, .18);
  list-style: none;
  transform: translateY(-50%);
}
.hb-vc7-alt li {
  position: relative;
  color: rgba(238, 243, 247, .5);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: .12em;
  font-variant-numeric: tabular-nums;
}
.hb-vc7-alt li::before {
  content: "";
  position: absolute;
  left: -18px;
  top: 50%;
  width: 7px;
  height: 1px;
  background: rgba(238, 243, 247, .5);
}
.hb-vc7-alt li:first-child { color: #eef3f7; }
@container (max-width: 620px) {
  .hb-vc7-alt { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vc7-sway, .hb-vc7-fog, .hb-vc7-bird { animation: none; }
  .hb-vc7-layer, .hb-vc7-sun { transition: none; transform: none; }
}
`;

function ridge(seed: number, base: number, amp: number, rough: number) {
  const pts: [number, number][] = [];
  for (let x = -80, i = 0; x <= 1680; x += 80, i++) {
    const h1 = (Math.imul(seed * 977 + i * 131 + 3, 2654435761) >>> 0) % 1000;
    const h2 = (Math.imul(seed * 389 + (i >> 1) * 71 + 9, 2246822519) >>> 0) % 1000;
    const y = base - (h1 / 1000) * amp * rough - (h2 / 1000) * amp;
    pts.push([x, y]);
  }
  let d = `M${pts[0][0]} 900 L${pts[0][0]} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    d += ` Q${x0} ${y0.toFixed(1)} ${((x0 + x1) / 2).toFixed(1)} ${((y0 + y1) / 2).toFixed(1)}`;
  }
  d += ` L1680 900Z`;
  return d;
}

const layers = [
  { d: ridge(1, 520, 170, 0.6), mix: 52, depth: 0.15 },
  { d: ridge(2, 600, 150, 0.8), mix: 38, depth: 0.32 },
  { d: ridge(3, 680, 140, 1), mix: 24, depth: 0.55 },
  { d: ridge(4, 760, 120, 1.2), mix: 12, depth: 0.8 },
  { d: ridge(5, 850, 110, 1.6), mix: 3, depth: 1.15 },
];

const fogs = [
  { top: 46, a: 0.5, t: 70 },
  { top: 56, a: 0.45, t: 54 },
  { top: 66, a: 0.42, t: 40 },
  { top: 78, a: 0.36, t: 30 },
];

export function CinemaDepthFog({
  kicker = "A documentary in five altitudes",
  title = "Above the Treeline",
  subtitle = "Two winters with the last fire lookouts of the northern range, where the fog decides what you get to see.",
  cta = { label: "Watch the first chapter", href: "#" },
  altitudes = ["3,240 m", "2,610 m", "1,980 m", "1,150 m", "620 m"],
  tint = "#7fa6c4",
  fog = 0.7,
  depth = 1,
  speed = 1,
  headingAs = "h1",
  className,
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: CinemaDepthFogProps) {
  const Heading = headingAs;
  const ref = React.useRef<HTMLElement>(null);

  const move = (e: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(e);
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hb-vc7-px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--hb-vc7-py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const leave = (e: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(e);
    ref.current?.style.setProperty("--hb-vc7-px", "0");
    ref.current?.style.setProperty("--hb-vc7-py", "0");
  };

  const vars = {
    "--hb-vc7-tint": tint,
    "--hb-vc7-fog": String(fog),
    "--hb-vc7-depth": String(depth),
    "--hb-vc7-speed": String(speed),
    ...style,
  } as React.CSSProperties;

  return (
    <section
      ref={ref}
      className={["hb-vc7", className].filter(Boolean).join(" ")}
      style={vars}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      <style href="hb-cinema-depth-fog" precedence="default">{css}</style>
      <div className="hb-vc7-sway" aria-hidden="true">
        <span className="hb-vc7-sun" />
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            className="hb-vc7-bird"
            width="16"
            height="8"
            viewBox="0 0 16 8"
            style={{ top: `${18 + i * 5}%`, left: 0, animationDelay: `${-i * 7}s` }}
          >
            <path d="M0 4 Q4 0 8 5 Q12 0 16 4" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
        ))}
        {layers.map((l, i) => (
          <React.Fragment key={i}>
            <div className="hb-vc7-layer" style={{ "--hb-vc7-d": String(l.depth) } as React.CSSProperties}>
              <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
                <path d={l.d} style={{ fill: `color-mix(in srgb, var(--hb-vc7-tint) ${l.mix}%, #06090d)` }} />
              </svg>
            </div>
            {fogs[i] ? (
              <span
                className="hb-vc7-fog"
                style={{
                  top: `${fogs[i].top}%`,
                  "--hb-vc7-a": String(fogs[i].a),
                  "--hb-vc7-t": `${(fogs[i].t / speed).toFixed(1)}s`,
                } as React.CSSProperties}
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <div className="hb-vc7-shade" aria-hidden="true" />
      <div className="hb-vc7-copy">
        {kicker ? <p className="hb-vc7-kicker">{kicker}</p> : null}
        <Heading className="hb-vc7-title">{title}</Heading>
        {subtitle ? <p className="hb-vc7-sub">{subtitle}</p> : null}
        {cta ? (
          <a className="hb-vc7-cta" href={cta.href}>
            {cta.label}
            <span aria-hidden="true">
              <svg width="10" height="11" viewBox="0 0 8 9"><path d="M0 0 L8 4.5 L0 9Z" fill="currentColor" /></svg>
            </span>
          </a>
        ) : null}
      </div>
      {altitudes.length ? (
        <ul className="hb-vc7-alt" aria-label="Altitudes">
          {altitudes.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
