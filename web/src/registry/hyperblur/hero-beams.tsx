"use client";

import * as React from "react";

export interface HeroBeamsAction {
  label: string;
  href: string;
}

export interface HeroBeamsStat {
  value: number;
  label: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export interface HeroBeamsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroBeamsAction | null;
  secondaryCta?: HeroBeamsAction | null;
  stats?: HeroBeamsStat[];
  accent?: string;
  beams?: number;
  seed?: number;
}

const css = `
@keyframes hb-hrb-up {
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hrb-fall {
  0% { transform: translate3d(0, -100%, 0); opacity: 0; }
  12% { opacity: var(--hb-hrb-o); }
  80% { opacity: var(--hb-hrb-o); }
  100% { transform: translate3d(0, 4%, 0); opacity: 0; }
}
@keyframes hb-hrb-breathe {
  0%, 100% { opacity: .75; transform: translateX(-50%) scaleX(1); }
  50% { opacity: 1; transform: translateX(-50%) scaleX(1.06); }
}
.hb-hrb {
  --hb-hrb-accent: #2f7bff;
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 560px;
  overflow: hidden;
  container-type: inline-size;
  background: radial-gradient(70% 55% at 50% 0%, #10131c, #060608 70%);
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hrb *, .hb-hrb *::before, .hb-hrb *::after { box-sizing: border-box; }
.hb-hrb-stage {
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 62%, transparent 86%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 62%, transparent 86%);
}
.hb-hrb-rail {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--hb-hrb-x);
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, .055) 25%, rgba(255, 255, 255, .055) 75%, transparent);
}
.hb-hrb-beam {
  position: absolute;
  top: 0;
  left: var(--hb-hrb-x);
  width: var(--hb-hrb-w, 1px);
  height: 100%;
  margin-left: calc(var(--hb-hrb-w, 1px) / -2 + .5px);
  background: linear-gradient(to bottom, transparent calc(100% - var(--hb-hrb-len)), color-mix(in srgb, var(--hb-hrb-accent) 75%, transparent) calc(100% - 14px), #ffffff 100%);
  opacity: 0;
  animation: hb-hrb-fall var(--hb-hrb-d) cubic-bezier(.45, 0, .7, 1) var(--hb-hrb-dl) infinite;
  will-change: transform, opacity;
}
.hb-hrb-beam::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ffffff;
  transform: translateX(-50%);
  box-shadow: 0 0 8px 2px var(--hb-hrb-accent), 0 0 26px 6px color-mix(in srgb, var(--hb-hrb-accent) 45%, transparent);
}
.hb-hrb-glow {
  position: absolute;
  left: 50%;
  bottom: 60px;
  z-index: -1;
  width: min(1100px, 120cqi);
  height: 320px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-hrb-accent) 34%, transparent), transparent);
  filter: blur(10px);
  transform: translateX(-50%);
  animation: hb-hrb-breathe 6s ease-in-out infinite;
}
.hb-hrb-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 72px 24px 0;
  text-align: center;
}
.hb-hrb-a {
  animation: hb-hrb-up .8s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(var(--hb-hrb-i, 0) * 80ms);
}
.hb-hrb-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  margin: 0 0 24px;
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .06), rgba(255, 255, 255, .02));
  color: #c4c6cc;
  font-size: 13px;
  line-height: 18px;
  backdrop-filter: blur(8px);
}
.hb-hrb-eyebrow span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-hrb-eyebrow svg { flex: none; color: color-mix(in srgb, var(--hb-hrb-accent) 50%, #ffffff); }
.hb-hrb-title {
  position: relative;
  max-width: 880px;
  margin: 0;
  color: #f4f5f7;
  font-size: clamp(34px, 7.2cqi, 72px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -.04em;
  text-wrap: balance;
  cursor: default;
}
.hb-hrb-title::before,
.hb-hrb-title::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  mix-blend-mode: screen;
  transition: transform .35s cubic-bezier(.2, .8, .2, 1), opacity .35s ease;
}
.hb-hrb-title::before { color: #ff3d7f; }
.hb-hrb-title::after { color: #33d6ff; }
.hb-hrb-title:hover::before { opacity: .85; transform: translate3d(-2.5px, -1px, 0); }
.hb-hrb-title:hover::after { opacity: .85; transform: translate3d(2.5px, 1px, 0); }
.hb-hrb-sub {
  max-width: 600px;
  margin: 22px 0 0;
  color: #9a9ca3;
  font-size: clamp(16px, 1.95cqi, 18.5px);
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-hrb-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
.hb-hrb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 999px;
  background: rgba(10, 10, 14, .55);
  color: #ededed;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  transition: transform .2s ease, background-color .2s ease, border-color .2s ease, box-shadow .25s ease;
}
.hb-hrb-btn:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .28); transform: translate3d(0, -1px, 0); }
.hb-hrb-btn:active { transform: scale(.98); }
.hb-hrb-btn:focus-visible { outline: 2px solid var(--hb-hrb-accent); outline-offset: 3px; }
.hb-hrb-btn svg { transition: transform .2s ease; }
.hb-hrb-btn:hover svg { transform: translate3d(3px, 0, 0); }
.hb-hrb-btn[data-primary="true"] {
  border-color: transparent;
  background: var(--hb-hrb-accent);
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .28), 0 0 0 1px color-mix(in srgb, var(--hb-hrb-accent) 70%, #ffffff), 0 12px 36px -8px var(--hb-hrb-accent);
}
.hb-hrb-btn[data-primary="true"]:hover {
  background: color-mix(in srgb, var(--hb-hrb-accent) 86%, #ffffff);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .32), 0 0 0 1px color-mix(in srgb, var(--hb-hrb-accent) 60%, #ffffff), 0 16px 44px -8px var(--hb-hrb-accent);
}
.hb-hrb-ground {
  position: relative;
  width: 100%;
  margin-top: auto;
  padding: 82px 24px 36px;
}
.hb-hrb-ground::before {
  content: "";
  position: absolute;
  top: 48px;
  left: 50%;
  z-index: -1;
  width: max(960px, 170cqi);
  aspect-ratio: 1;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(closest-side, #050507 92%, #08090d 100%);
  transform: translateX(-50%);
  box-shadow:
    inset 0 1.5px 0 color-mix(in srgb, var(--hb-hrb-accent) 45%, #ffffff),
    inset 0 22px 50px -24px color-mix(in srgb, var(--hb-hrb-accent) 70%, transparent),
    0 -2px 14px color-mix(in srgb, var(--hb-hrb-accent) 65%, transparent),
    0 -18px 70px color-mix(in srgb, var(--hb-hrb-accent) 40%, transparent);
}
.hb-hrb-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  max-width: 640px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}
.hb-hrb-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 0;
  padding: 0 12px;
}
.hb-hrb-stat + .hb-hrb-stat { border-left: 1px solid rgba(255, 255, 255, .08); }
.hb-hrb-num {
  color: #ffffff;
  font-size: clamp(22px, 3cqi, 30px);
  font-weight: 650;
  line-height: 1.1;
  letter-spacing: -.03em;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.hb-hrb-num small {
  margin-left: 1px;
  color: color-mix(in srgb, var(--hb-hrb-accent) 45%, #ffffff);
  font-size: .62em;
  font-weight: 600;
  letter-spacing: 0;
}
.hb-hrb-label {
  overflow: hidden;
  max-width: 100%;
  color: #7d7f87;
  font-size: 13px;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@container (max-width: 520px) {
  .hb-hrb-inner { padding-top: 60px; padding-left: 20px; padding-right: 20px; }
  .hb-hrb-actions { flex-direction: column; align-self: stretch; }
  .hb-hrb-btn { width: 100%; }
  .hb-hrb-ground { padding: 64px 12px 28px; }
  .hb-hrb-ground::before { top: 36px; }
  .hb-hrb-stat { padding: 0 6px; }
  .hb-hrb-label { font-size: 11.5px; white-space: normal; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hrb-a, .hb-hrb-glow { animation: none; }
  .hb-hrb-beam { animation: none; opacity: var(--hb-hrb-o); transform: translate3d(0, var(--hb-hrb-rest), 0); }
  .hb-hrb-title::before, .hb-hrb-title::after, .hb-hrb-btn, .hb-hrb-btn svg { transition: none; }
  .hb-hrb-btn:hover, .hb-hrb-btn:hover svg { transform: none; }
}
`;

const defaultPrimary: HeroBeamsAction = { label: "Deploy now", href: "#" };
const defaultSecondary: HeroBeamsAction = { label: "Talk to sales", href: "#" };
const defaultStats: HeroBeamsStat[] = [
  { value: 310, suffix: "+", label: "Edge regions" },
  { value: 38, suffix: "ms", label: "Median cold start" },
  { value: 99.99, decimals: 2, suffix: "%", label: "Uptime, last 12 months" },
];

function hash(seed: number, i: number) {
  let x = (Math.imul(i + 1, 0x9e3779b1) ^ Math.imul((seed | 0) + 3, 0x85ebca6b)) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b) >>> 0;
  x = ((x >>> 16) ^ x) >>> 0;
  return x / 4294967296;
}

function delay(index: number) {
  return { "--hb-hrb-i": index } as React.CSSProperties;
}

function format(stat: HeroBeamsStat, value: number) {
  const d = Math.max(0, Math.min(4, stat.decimals ?? 0));
  return value.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}

function HeroBeamsStats({ stats }: { stats: HeroBeamsStat[] }) {
  const ref = React.useRef<HTMLUListElement>(null);
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let begin = 0;
    const duration = 1700;

    function tick(now: number) {
      if (!begin) begin = now;
      const t = Math.min(1, (now - begin) / duration);
      setP(1 - Math.pow(1 - t, 4));
      if (t < 1) raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        if (reduce) setP(1);
        else raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ul ref={ref} className="hb-hrb-stats">
      {stats.map((stat) => {
        const final = `${stat.prefix ?? ""}${format(stat, stat.value)}${stat.suffix ?? ""}`;
        return (
          <li key={stat.label} className="hb-hrb-stat">
            <span className="hb-hrb-num" aria-hidden="true">
              {stat.prefix ? <small>{stat.prefix}</small> : null}
              {format(stat, stat.value * p)}
              {stat.suffix ? <small>{stat.suffix}</small> : null}
            </span>
            <span className="hb-hrb-label">
              <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{final} </span>
              {stat.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function HeroBeams({
  eyebrow = "Relay 3.0 is here with streaming logs",
  title = "Ship to the edge at the speed of light",
  subtitle = "Deploy APIs and full-stack apps to every region in seconds, with preview URLs for every branch and instant rollbacks.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  stats = defaultStats,
  accent = "#2f7bff",
  beams = 18,
  seed = 4,
  className = "",
  style,
  ...rest
}: HeroBeamsProps) {
  const count = Math.max(0, Math.min(48, Math.floor(beams)));
  const lanes = Array.from({ length: count }, (_, i) => {
    const jitter = (hash(seed, i * 5 + 1) - 0.5) * (70 / Math.max(1, count));
    const x = Math.min(98, Math.max(2, ((i + 0.5) / Math.max(1, count)) * 100 + jitter));
    const center = 1 - Math.abs(x - 50) / 50;
    return {
      x: x.toFixed(2),
      d: (3.6 + hash(seed, i * 5 + 2) * 4.2).toFixed(2),
      dl: (-hash(seed, i * 5 + 3) * 8).toFixed(2),
      len: Math.round(70 + hash(seed, i * 5 + 4) * 150),
      o: (0.35 + center * 0.4 + hash(seed, i * 5 + 5) * 0.25).toFixed(2),
      w: hash(seed, i * 5 + 6) > 0.72 ? 2 : 1,
      rest: (-20 - hash(seed, i * 5 + 7) * 60).toFixed(1),
    };
  });

  const vars = { "--hb-hrb-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-hrb ${className}`} style={vars} {...rest}>
      <style href="hb-hero-beams" precedence="default">{css}</style>
      <div className="hb-hrb-stage" aria-hidden="true">
        {lanes.map((lane, i) => (
          <React.Fragment key={i}>
            <span className="hb-hrb-rail" style={{ "--hb-hrb-x": `${lane.x}%` } as React.CSSProperties} />
            <span
              className="hb-hrb-beam"
              style={
                {
                  "--hb-hrb-x": `${lane.x}%`,
                  "--hb-hrb-d": `${lane.d}s`,
                  "--hb-hrb-dl": `${lane.dl}s`,
                  "--hb-hrb-len": `${lane.len}px`,
                  "--hb-hrb-o": lane.o,
                  "--hb-hrb-w": `${lane.w}px`,
                  "--hb-hrb-rest": `${lane.rest}%`,
                } as React.CSSProperties
              }
            />
          </React.Fragment>
        ))}
      </div>
      <div className="hb-hrb-glow" aria-hidden="true" />
      <div className="hb-hrb-inner">
        {eyebrow ? (
          <p className="hb-hrb-eyebrow hb-hrb-a" style={delay(0)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13.2 2.5 4.8 13.4a.6.6 0 0 0 .48.96H11l-1.2 7.1c-.1.58.64.9 1 .43l8.4-10.9a.6.6 0 0 0-.48-.96H13l1.2-7.1c.1-.58-.64-.9-1-.43z" />
            </svg>
            <span>{eyebrow}</span>
          </p>
        ) : null}
        <h1 className="hb-hrb-title hb-hrb-a" style={delay(1)} data-text={title}>
          {title}
        </h1>
        {subtitle ? (
          <p className="hb-hrb-sub hb-hrb-a" style={delay(2)}>
            {subtitle}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-hrb-actions hb-hrb-a" style={delay(3)}>
            {primaryCta ? (
              <a className="hb-hrb-btn" data-primary="true" href={primaryCta.href}>
                {primaryCta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-hrb-btn" href={secondaryCta.href}>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="hb-hrb-ground">
        {stats.length > 0 ? <HeroBeamsStats stats={stats} /> : null}
      </div>
    </section>
  );
}
