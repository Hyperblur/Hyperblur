"use client";

import * as React from "react";

export interface BentoTiltedPlaneProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: { label: string; href: string } | null;
  progress?: number;
  autoPlay?: boolean;
  accent?: string;
}

const css = `
@property --hb-wa12-p { syntax: "<number>"; inherits: true; initial-value: 0; }
@keyframes hb-wa12-loop { 0%, 12% { --hb-wa12-p: 0; } 46%, 66% { --hb-wa12-p: 1; } 100% { --hb-wa12-p: 0; } }
@keyframes hb-wa12-bar { from { transform: scaleY(.2); } to { transform: scaleY(1); } }
@keyframes hb-wa12-dash { to { stroke-dashoffset: -1; } }
@keyframes hb-wa12-blink { 50% { opacity: .3; } }
.hb-wa12 {
  --hb-wa12-accent: #8b5cf6;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #08070c;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa12[data-auto="true"] { animation: hb-wa12-loop 7s cubic-bezier(.65, 0, .35, 1) infinite; }
.hb-wa12 *, .hb-wa12 *::before, .hb-wa12 *::after { box-sizing: border-box; }
.hb-wa12 em, .hb-wa12 i { font-style: normal; }
.hb-wa12::before { content: ""; position: absolute; left: 50%; top: 30%; width: 900px; height: 600px; transform: translateX(-50%); background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-wa12-accent) 22%, transparent), transparent); pointer-events: none; }
.hb-wa12-in { position: relative; max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa12-head { max-width: 660px; margin: 0 auto; text-align: center; }
.hb-wa12-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 14px; padding: 4px 10px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 999px; color: #c4b5fd; font-size: 12.5px; font-weight: 500; }
.hb-wa12-eyebrow::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-wa12-accent); animation: hb-wa12-blink 1.6s ease infinite; }
.hb-wa12-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(30px, 4.8cqi, 54px); font-weight: 600; line-height: 1.02; letter-spacing: -.04em; text-wrap: balance; }
.hb-wa12-sub { margin: 14px auto 0; max-width: 520px; color: #8f8c99; font-size: 15.5px; line-height: 1.6; }
.hb-wa12-cta { display: inline-flex; margin-top: 22px; padding: 10px 18px; border-radius: 999px; background: #ededed; color: #08070c; font-size: 14px; font-weight: 600; text-decoration: none; transition: transform .2s ease, background .2s ease; }
.hb-wa12-cta:hover { background: #fff; transform: translate3d(0, -1px, 0); }
.hb-wa12-cta:focus-visible { outline: 2px solid var(--hb-wa12-accent); outline-offset: 3px; }
.hb-wa12-scene { margin-top: clamp(20px, 3cqi, 36px); perspective: 1400px; perspective-origin: 50% 0%; }
.hb-wa12-plane { --q: calc(1 - var(--hb-wa12-p)); display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: 200px 190px; grid-template-areas: "lat lat rps cache" "reg cold cold dep"; gap: 12px; transform-style: preserve-3d; transform-origin: 50% 30%; transform: rotateX(calc(var(--q) * 48deg)) rotateZ(calc(var(--q) * -14deg)) scale(calc(.82 + var(--hb-wa12-p) * .18)) translateY(calc(var(--q) * -40px)); will-change: transform; }
.hb-wa12-t { position: relative; display: flex; flex-direction: column; min-width: 0; overflow: hidden; padding: 16px; border: 1px solid rgba(255, 255, 255, .09); border-radius: 18px; background: linear-gradient(180deg, #14121b, #0e0d13); transform: translateZ(calc(var(--q) * var(--z) * 1px)); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 calc(var(--q) * var(--z) * .9px) calc(var(--q) * var(--z) * 1.2px + 10px) rgba(0, 0, 0, .55); }
.hb-wa12-t h3 { margin: 0; display: flex; justify-content: space-between; gap: 8px; color: #a8a4b5; font-size: 12px; font-weight: 500; }
.hb-wa12-t h3 small { color: #6b6878; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; }
.hb-wa12-big { margin-top: 6px; font-family: var(--font-grotesk, inherit); font-size: clamp(26px, 3.4cqi, 38px); font-weight: 600; letter-spacing: -.04em; }
.hb-wa12-big em { margin-left: 6px; color: #4ade80; font-family: var(--font-sans, inherit); font-size: 12px; font-weight: 500; letter-spacing: 0; }
.hb-wa12-lat { grid-area: lat; }
.hb-wa12-map { position: absolute; inset: 52px 0 0; width: 100%; height: calc(100% - 52px); }
.hb-wa12-map circle.hb-wa12-d { fill: #2a2734; }
.hb-wa12-map path { fill: none; stroke: var(--hb-wa12-accent); stroke-width: 1.2; stroke-linecap: round; stroke-dasharray: .05 .1; vector-effect: non-scaling-stroke; animation: hb-wa12-dash 3s linear infinite; }
.hb-wa12-map circle.hb-wa12-n { fill: var(--hb-wa12-accent); stroke: #08070c; stroke-width: 1.5; }
.hb-wa12-lat .hb-wa12-big { position: relative; z-index: 1; }
.hb-wa12-rps { grid-area: rps; }
.hb-wa12-bars { display: flex; align-items: flex-end; gap: 4px; flex: 1; margin-top: 8px; }
.hb-wa12-bars i { flex: 1; height: var(--h); border-radius: 3px; background: linear-gradient(180deg, var(--hb-wa12-accent), color-mix(in srgb, var(--hb-wa12-accent) 20%, #111)); transform-origin: bottom; animation: hb-wa12-bar 1.2s ease-in-out infinite alternate; animation-delay: calc(var(--j) * -110ms); }
.hb-wa12-cache { grid-area: cache; align-items: center; }
.hb-wa12-cache h3 { align-self: stretch; }
.hb-wa12-gauge { width: 100%; max-width: 170px; margin-top: auto; }
.hb-wa12-gauge path { fill: none; stroke-width: 10; stroke-linecap: round; }
.hb-wa12-gauge text { fill: #ededed; font-family: var(--font-grotesk, inherit); font-size: 22px; font-weight: 600; letter-spacing: -.03em; }
.hb-wa12-reg { grid-area: reg; }
.hb-wa12-rl { display: grid; gap: 7px; margin: 10px 0 0; padding: 0; list-style: none; font-size: 12px; }
.hb-wa12-rl li { display: grid; grid-template-columns: 8px minmax(0, 1fr) auto; align-items: center; gap: 8px; color: #d4d2dc; }
.hb-wa12-rl li::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #4ade80; }
.hb-wa12-rl li[data-warm="true"]::before { background: #fbbf24; }
.hb-wa12-rl small { color: #6b6878; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; }
.hb-wa12-cold { grid-area: cold; }
.hb-wa12-hb { display: grid; gap: 10px; margin-top: auto; }
.hb-wa12-hb div { display: grid; grid-template-columns: 86px minmax(0, 1fr) 46px; align-items: center; gap: 10px; font-size: 11.5px; color: #a8a4b5; }
.hb-wa12-hb span:last-child { color: #ededed; font-family: var(--font-mono, ui-monospace, monospace); text-align: right; }
.hb-wa12-hb i { height: 8px; border-radius: 4px; background: #1d1b25; overflow: hidden; }
.hb-wa12-hb i::after { content: ""; display: block; width: var(--w); height: 100%; border-radius: 4px; background: var(--c, var(--hb-wa12-accent)); }
.hb-wa12-dep { grid-area: dep; }
.hb-wa12-sha { margin-top: 8px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: #c4b5fd; }
.hb-wa12-dsteps { display: flex; gap: 4px; margin-top: auto; }
.hb-wa12-dsteps i { flex: 1; height: 6px; border-radius: 3px; background: var(--hb-wa12-accent); }
.hb-wa12-dsteps i:last-child { background: #2a2734; animation: hb-wa12-blink 1.2s ease infinite; }
.hb-wa12-dep p { margin: 10px 0 0; color: #8f8c99; font-size: 12px; }
@container (max-width: 820px) {
  .hb-wa12-plane { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: 200px 180px 180px; grid-template-areas: "lat lat" "rps cache" "reg dep"; }
  .hb-wa12-cold { display: none; }
}
@container (max-width: 520px) {
  .hb-wa12-plane { grid-template-columns: minmax(0, 1fr); grid-template-rows: none; grid-auto-rows: 180px; grid-template-areas: "lat" "rps" "cache" "reg" "dep"; transform: none; }
  .hb-wa12-t { transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa12, .hb-wa12 *, .hb-wa12 *::before, .hb-wa12 *::after { animation: none !important; transition: none !important; }
  .hb-wa12-plane { transform: none; }
  .hb-wa12-t { transform: none; }
}
`;

function hash(n: number) {
  let x = (n + 7) * 2654435761;
  x = (x ^ (x >>> 16)) >>> 0;
  x = Math.imul(x, 2246822519) >>> 0;
  return ((x ^ (x >>> 13)) >>> 0) / 4294967295;
}

const dots: [number, number][] = [];
for (let r = 0; r < 9; r++) {
  for (let c = 0; c < 40; c++) {
    if (hash(r * 40 + c) > 0.42 && Math.sin(c * 0.35 + r * 0.6) > -0.4) dots.push([6 + c * 10, 8 + r * 10]);
  }
}

const nodes: [number, number][] = [[70, 30], [190, 22], [214, 62], [330, 40], [120, 70], [366, 76]];

export function BentoTiltedPlane({
  eyebrow = "Cobalt Edge",
  title = "Infrastructure that lands flat in front of you",
  subtitle = "Scroll and the whole stack settles into place: latency, throughput, cache and every region, on one plane.",
  cta = { label: "Deploy to the edge", href: "#" },
  progress,
  autoPlay = false,
  accent = "#8b5cf6",
  className,
  style,
  ...rest
}: BentoTiltedPlaneProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [scrollP, setScrollP] = React.useState(0);
  const controlled = progress !== undefined;

  React.useEffect(() => {
    if (controlled || autoPlay) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const v = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.85)));
      setScrollP(Math.round(v * 1000) / 1000);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [controlled, autoPlay]);

  const p = controlled ? Math.max(0, Math.min(1, progress)) : scrollP;
  const rootStyle = { "--hb-wa12-accent": accent, ...(autoPlay ? {} : { "--hb-wa12-p": p }), ...style } as React.CSSProperties;
  const z = (v: number) => ({ "--z": v }) as React.CSSProperties;

  return (
    <section ref={ref} className={["hb-wa12", className].filter(Boolean).join(" ")} data-auto={autoPlay} style={rootStyle} {...rest}>
      <style href="hb-bento-tilted-plane" precedence="default">{css}</style>
      <div className="hb-wa12-in">
        <div className="hb-wa12-head">
          <p className="hb-wa12-eyebrow">{eyebrow}</p>
          <h2 className="hb-wa12-title">{title}</h2>
          <p className="hb-wa12-sub">{subtitle}</p>
          {cta && <a className="hb-wa12-cta" href={cta.href}>{cta.label}</a>}
        </div>
        <div className="hb-wa12-scene">
          <div className="hb-wa12-plane">
            <article className="hb-wa12-t hb-wa12-lat" style={z(60)}>
              <h3>Global p50 latency <small>6 regions</small></h3>
              <div className="hb-wa12-big">23 ms<em>−9 ms this week</em></div>
              <svg className="hb-wa12-map" viewBox="0 0 400 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {dots.map(([x, y], j) => (
                  <circle key={j} className="hb-wa12-d" cx={x} cy={y} r="1.6" />
                ))}
                <path d="M70 30 Q 130 0 190 22 T 330 40" pathLength={1} />
                <path d="M120 70 Q 170 90 214 62 T 366 76" pathLength={1} />
                {nodes.map(([x, y], j) => (
                  <circle key={j} className="hb-wa12-n" cx={x} cy={y} r="4" />
                ))}
              </svg>
            </article>
            <article className="hb-wa12-t hb-wa12-rps" style={z(110)}>
              <h3>Requests / sec <small>live</small></h3>
              <div className="hb-wa12-big">48.2k</div>
              <div className="hb-wa12-bars" aria-hidden="true">
                {[40, 62, 48, 70, 56, 82, 66, 90, 74, 96].map((h, j) => (
                  <i key={j} style={{ "--h": `${h}%`, "--j": j } as React.CSSProperties} />
                ))}
              </div>
            </article>
            <article className="hb-wa12-t hb-wa12-cache" style={z(150)}>
              <h3>Cache hit <small>24h</small></h3>
              <svg className="hb-wa12-gauge" viewBox="0 0 120 70" aria-hidden="true">
                <path d="M12 62 A 48 48 0 0 1 108 62" stroke="#1d1b25" />
                <path d="M12 62 A 48 48 0 0 1 108 62" stroke={accent} pathLength={100} strokeDasharray="91 100" />
                <text x="60" y="60" textAnchor="middle">91%</text>
              </svg>
            </article>
            <article className="hb-wa12-t hb-wa12-reg" style={z(90)}>
              <h3>Regions <small>all healthy</small></h3>
              <ul className="hb-wa12-rl">
                <li>Frankfurt <small>14 ms</small></li>
                <li>São Paulo <small>31 ms</small></li>
                <li>Singapore <small>19 ms</small></li>
                <li data-warm="true">Sydney <small>warming</small></li>
              </ul>
            </article>
            <article className="hb-wa12-t hb-wa12-cold" style={z(40)}>
              <h3>Cold start by runtime <small>p95</small></h3>
              <div className="hb-wa12-hb">
                {[["Edge (V8)", 8, "4 ms"], ["Node 24", 46, "112 ms"], ["Python 3.14", 72, "240 ms"]].map(([n, w, v], j) => (
                  <div key={String(n)}>
                    <span>{n}</span>
                    <i style={{ "--w": `${w}%`, "--c": j === 0 ? accent : "#4b4760" } as React.CSSProperties} />
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="hb-wa12-t hb-wa12-dep" style={z(130)}>
              <h3>Deploying <small>3/4</small></h3>
              <div className="hb-wa12-sha">main · 8e1f04c</div>
              <p>Propagating to Sydney, about 6 s left.</p>
              <div className="hb-wa12-dsteps" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
