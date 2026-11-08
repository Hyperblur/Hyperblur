"use client";

import * as React from "react";

export interface CinemaSplitSide {
  name: string;
  role: string;
  quote: string;
  accent: string;
}

export type CinemaSplitActive = "left" | "right" | null;

export interface CinemaSplitRevealProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  tagline?: string;
  left?: CinemaSplitSide;
  right?: CinemaSplitSide;
  autoPlay?: boolean;
  interval?: number;
  slant?: number;
  onSideChange?: (side: CinemaSplitActive) => void;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vc8 {
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 580px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #000;
  color: #fff;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc8 *, .hb-vc8 *::before, .hb-vc8 *::after { box-sizing: border-box; }
.hb-vc8-half {
  position: absolute;
  inset: 0;
  transition: clip-path 1.1s cubic-bezier(.76, 0, .24, 1);
}
.hb-vc8-half[data-side="left"] { background: linear-gradient(180deg, #050b18 0%, #0c1c36 55%, #13294a 75%, #060a12 100%); }
.hb-vc8-half[data-side="right"] { background: linear-gradient(180deg, #1c0c06 0%, #6b2a10 45%, #e0773a 68%, #3a1608 100%); }
.hb-vc8-art { position: absolute; inset: 0; transition: transform 1.4s cubic-bezier(.2, .7, .2, 1); }
.hb-vc8-art svg { display: block; width: 100%; height: 100%; }
.hb-vc8-half[data-state="grow"] .hb-vc8-art { transform: scale(1.06); }
.hb-vc8-rain {
  position: absolute;
  inset: -20% 0 0;
  background: repeating-linear-gradient(100deg, transparent 0 18px, rgba(170, 200, 255, .12) 18px 19px, transparent 19px 41px);
  animation: hb-vc8-rain .6s linear infinite;
}
@keyframes hb-vc8-rain {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-12px, 20%, 0); }
}
.hb-vc8-heat {
  position: absolute;
  inset: 0;
  background: radial-gradient(50% 30% at 70% 66%, rgba(255, 220, 160, .35), transparent 70%);
  animation: hb-vc8-heat 4s ease-in-out infinite alternate;
}
@keyframes hb-vc8-heat {
  from { opacity: .6; transform: translate3d(0, 0, 0); }
  to { opacity: 1; transform: translate3d(0, -6px, 0); }
}
.hb-vc8-shade { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0, 0, 0, .7), transparent 45%); }
.hb-vc8-card {
  position: absolute;
  bottom: clamp(26px, 6cqi, 56px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  max-width: min(320px, 38cqi);
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: inherit;
  cursor: pointer;
  transition: opacity .6s ease, transform .9s cubic-bezier(.2, .7, .2, 1);
}
.hb-vc8-card:focus-visible { outline: 2px solid var(--hb-vc8-c); outline-offset: 8px; border-radius: 6px; }
.hb-vc8-half[data-side="left"] .hb-vc8-card { left: clamp(20px, 5cqi, 56px); text-align: left; align-items: flex-start; }
.hb-vc8-half[data-side="right"] .hb-vc8-card { right: clamp(20px, 5cqi, 56px); text-align: right; align-items: flex-end; }
.hb-vc8-half[data-state="shrink"] .hb-vc8-card { opacity: .18; }
.hb-vc8-half[data-state="grow"] .hb-vc8-card { transform: translate3d(0, -6px, 0); }
.hb-vc8-role {
  color: var(--hb-vc8-c);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: .24em;
  text-transform: uppercase;
}
.hb-vc8-name {
  margin-top: 8px;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(26px, 4.4cqi, 48px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -.02em;
  text-transform: uppercase;
}
.hb-vc8-quote {
  max-height: 0;
  margin-top: 0;
  overflow: hidden;
  color: rgba(255, 255, 255, .78);
  font-size: 14px;
  line-height: 1.5;
  opacity: 0;
  transition: max-height .8s cubic-bezier(.2, .7, .2, 1), opacity .5s ease, margin-top .6s ease;
}
.hb-vc8-half[data-state="grow"] .hb-vc8-quote { max-height: 80px; margin-top: 10px; opacity: 1; }
.hb-vc8-hint {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  color: rgba(255, 255, 255, .6);
  font-size: 12px;
}
.hb-vc8-hint::before { content: ""; width: 18px; height: 1px; background: var(--hb-vc8-c); }
.hb-vc8-title {
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  z-index: 1;
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(48px, 12.5cqi, 168px);
  font-weight: 700;
  line-height: .9;
  letter-spacing: -.05em;
  text-align: center;
  text-transform: uppercase;
  transform: translateY(-50%);
  pointer-events: none;
}
.hb-vc8-half[data-side="left"] .hb-vc8-title { color: #dbe8ff; text-shadow: 0 0 60px rgba(90, 150, 255, .45); }
.hb-vc8-half[data-side="right"] .hb-vc8-title { color: #fff1e0; text-shadow: 0 0 60px rgba(255, 140, 60, .45); }
.hb-vc8-tag {
  position: absolute;
  left: 50%;
  top: 18px;
  z-index: 4;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, .18);
  border-radius: 999px;
  background: rgba(0, 0, 0, .4);
  color: rgba(255, 255, 255, .82);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: .18em;
  text-transform: uppercase;
  white-space: nowrap;
  transform: translateX(-50%);
  backdrop-filter: blur(8px);
}
.hb-vc8-seam {
  position: absolute;
  inset: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}
.hb-vc8-seam line {
  stroke: #ffffff;
  stroke-width: 1.5;
  vector-effect: non-scaling-stroke;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, .8));
  transition: transform 1.1s cubic-bezier(.76, 0, .24, 1);
}
@container (max-width: 560px) {
  .hb-vc8-card { max-width: 44cqi; }
  .hb-vc8-quote { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vc8-half, .hb-vc8-art, .hb-vc8-card, .hb-vc8-quote, .hb-vc8-seam line { transition: none; }
  .hb-vc8-rain, .hb-vc8-heat { animation: none; }
}
`;

const defaultLeft: CinemaSplitSide = {
  name: "Mara",
  role: "Harbor police · Night shift",
  quote: "She has been chasing the same signal across the bay for nine years.",
  accent: "#6fa8ff",
};

const defaultRight: CinemaSplitSide = {
  name: "Elias",
  role: "Salvage pilot · Day crew",
  quote: "He knows exactly where it comes from, and why it must never be found.",
  accent: "#ffa04d",
};

const drops = Array.from({ length: 26 }, (_, i) => {
  const h = Math.imul(i + 5, 2654435761) >>> 0;
  return { x: (h % 1600), y: 420 + ((h >>> 7) % 380), w: 20 + ((h >>> 3) % 60), o: (0.15 + ((h >>> 11) % 40) / 100).toFixed(2) };
});

export function CinemaSplitReveal({
  title = "Two Shores",
  tagline = "A Coldwater original · Season one",
  left = defaultLeft,
  right = defaultRight,
  autoPlay = true,
  interval = 2600,
  slant = 6,
  onSideChange,
  headingAs = "h1",
  className,
  style,
  ...rest
}: CinemaSplitRevealProps) {
  const Heading = headingAs;
  const [active, setActive] = React.useState<CinemaSplitActive>(null);
  const [touched, setTouched] = React.useState(false);
  const changeRef = React.useRef(onSideChange);

  React.useEffect(() => {
    changeRef.current = onSideChange;
  }, [onSideChange]);

  React.useEffect(() => {
    if (!autoPlay || touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const order: CinemaSplitActive[] = [null, "left", null, "right"];
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % order.length;
      setActive(order[i]);
    }, interval);
    return () => window.clearInterval(id);
  }, [autoPlay, touched, interval]);

  const choose = (side: CinemaSplitActive) => {
    setTouched(true);
    setActive(side);
    changeRef.current?.(side);
  };

  const s = active === "left" ? 70 : active === "right" ? 30 : 50;
  const leftClip = `polygon(0% 0%, ${s + slant}% 0%, ${s - slant}% 100%, 0% 100%)`;
  const rightClip = `polygon(${s + slant}% 0%, 100% 0%, 100% 100%, ${s - slant}% 100%)`;
  const stateOf = (side: "left" | "right") => (active === null ? "idle" : active === side ? "grow" : "shrink");

  const sides: { key: "left" | "right"; data: CinemaSplitSide; clip: string }[] = [
    { key: "left", data: left, clip: leftClip },
    { key: "right", data: right, clip: rightClip },
  ];

  return (
    <section
      className={["hb-vc8", className].filter(Boolean).join(" ")}
      style={style}
      onPointerLeave={() => {
        if (touched) {
          setActive(null);
          changeRef.current?.(null);
        }
      }}
      {...rest}
    >
      <style href="hb-cinema-split-reveal" precedence="default">{css}</style>
      {sides.map(({ key, data, clip }) => (
        <div
          key={key}
          className="hb-vc8-half"
          data-side={key}
          data-state={stateOf(key)}
          style={{ clipPath: clip, "--hb-vc8-c": data.accent } as React.CSSProperties}
          onPointerEnter={(e) => {
            if (e.pointerType !== "touch") choose(key);
          }}
        >
          <div className="hb-vc8-art" aria-hidden="true">
            {key === "left" ? (
              <>
                <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
                  {[[40, 300, 120], [170, 220, 90], [270, 340, 130], [420, 180, 110], [540, 280, 100], [650, 380, 140]].map(([x, y, w], i) => (
                    <g key={i}>
                      <rect x={x} y={y} width={w} height={720 - y} fill="#081224" />
                      {Array.from({ length: 10 }, (_, r) => (
                        <rect key={r} x={x + 12} y={y + 20 + r * 34} width={w - 24} height="3" fill="#6fa8ff" opacity={((Math.imul(i * 13 + r, 2654435761) >>> 0) % 3 === 0 ? 0.5 : 0.08).toFixed(2)} />
                      ))}
                    </g>
                  ))}
                  <rect y="720" width="1600" height="180" fill="#050a14" />
                  {drops.map((d, i) => (
                    <rect key={i} x={d.x} y={d.y + 320} width={d.w} height="2" fill="#6fa8ff" opacity={d.o} />
                  ))}
                </svg>
                <span className="hb-vc8-rain" />
              </>
            ) : (
              <>
                <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
                  <circle cx="1150" cy="560" r="90" fill="#ffe2b0" opacity=".9" />
                  <path d="M800 660 C980 600 1140 640 1300 620 C1420 606 1520 630 1600 640 L1600 900 L800 900Z" fill="#8a3a14" />
                  <path d="M800 720 C960 690 1120 740 1280 712 C1400 694 1500 716 1600 726 L1600 900 L800 900Z" fill="#4a1c08" />
                  <path d="M800 800 C1000 770 1200 820 1600 790 L1600 900 L800 900Z" fill="#200b04" />
                  <path d="M1240 700 L1246 640 L1252 700Z" fill="#1a0803" />
                </svg>
                <span className="hb-vc8-heat" />
              </>
            )}
            <span className="hb-vc8-shade" />
          </div>
          {key === "left" ? <Heading className="hb-vc8-title">{title}</Heading> : <div className="hb-vc8-title" aria-hidden="true">{title}</div>}
          <button
            type="button"
            className="hb-vc8-card"
            aria-pressed={active === key}
            onClick={() => choose(active === key ? null : key)}
            onFocus={() => choose(key)}
          >
            <span className="hb-vc8-role">{data.role}</span>
            <span className="hb-vc8-name">{data.name}</span>
            <span className="hb-vc8-quote">{data.quote}</span>
            <span className="hb-vc8-hint">Follow {data.name}</span>
          </button>
        </div>
      ))}
      <svg className="hb-vc8-seam" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1={50 + slant} y1="0" x2={50 - slant} y2="100" style={{ transform: `translateX(${s - 50}px)` }} />
      </svg>
      {tagline ? <span className="hb-vc8-tag">{tagline}</span> : null}
    </section>
  );
}
