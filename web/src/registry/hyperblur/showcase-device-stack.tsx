"use client";

import * as React from "react";

export interface ShowcaseDeviceStackFeature {
  title: string;
  description: string;
}

export interface ShowcaseDeviceStackLink {
  label: string;
  href: string;
}

export interface ShowcaseDeviceStackProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: ShowcaseDeviceStackLink | null;
  features?: ShowcaseDeviceStackFeature[];
  intensity?: number;
  accent?: string;
}

const css = `
@keyframes hb-kb8-rise { from { opacity: 0; transform: translate3d(0, 18px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-kb8-enter { from { opacity: 0; scale: .92; } to { opacity: 1; scale: 1; } }
@keyframes hb-kb8-bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -8px; } }
@keyframes hb-kb8-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-kb8-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-kb8-blink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
.hb-kb8 {
  --hb-kb8-accent: #a78bfa;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kb8 *, .hb-kb8 *::before, .hb-kb8 *::after { box-sizing: border-box; }
.hb-kb8::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(45% 40% at 50% 55%, color-mix(in srgb, var(--hb-kb8-accent) 22%, transparent), transparent 72%),
    radial-gradient(30% 30% at 20% 80%, rgba(56, 189, 248, .1), transparent 70%);
}
.hb-kb8-in { position: relative; max-width: 1120px; margin: 0 auto; padding: clamp(56px, 7cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-kb8-head { max-width: 680px; margin: 0 auto; text-align: center; animation: hb-kb8-rise .7s cubic-bezier(.2, .8, .2, 1) backwards; }
.hb-kb8-eyebrow { margin: 0 0 14px; color: var(--hb-kb8-accent); font-size: 13px; font-weight: 600; }
.hb-kb8-title { margin: 0; font-size: clamp(30px, 4.4cqi, 50px); font-weight: 600; line-height: 1.04; letter-spacing: -.04em; text-wrap: balance; }
.hb-kb8-sub { margin: 14px auto 0; max-width: 540px; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; text-wrap: pretty; }
.hb-kb8-cta { display: inline-flex; align-items: center; gap: 8px; margin-top: 22px; padding: 10px 18px; border-radius: 999px; background: #ededed; color: #0a0a0a; font-size: 14px; font-weight: 600; text-decoration: none; transition: background .2s ease, transform .2s ease; }
.hb-kb8-cta:hover { background: #fff; transform: translate3d(0, -1px, 0); }
.hb-kb8-cta:focus-visible { outline: 2px solid var(--hb-kb8-accent); outline-offset: 3px; }
.hb-kb8-stage {
  --px: 0;
  --py: 0;
  position: relative;
  width: 100%;
  max-width: 1000px;
  aspect-ratio: 16 / 8.6;
  margin: clamp(28px, 4cqi, 48px) auto 0;
  perspective: 1400px;
  touch-action: pan-y;
}
.hb-kb8-dev {
  position: absolute;
  transform: translate3d(calc(var(--px) * var(--d) * 1px), calc(var(--py) * var(--d) * 1px), 0) rotateY(calc(var(--px) * var(--r) * 1deg)) rotateX(calc(var(--py) * var(--r) * -1deg));
  transform-style: preserve-3d;
  transition: transform .5s cubic-bezier(.2, .8, .2, 1);
  animation: hb-kb8-enter .9s cubic-bezier(.2, .8, .2, 1) backwards, hb-kb8-bob 7s ease-in-out infinite;
  animation-delay: calc(var(--hb-kb8-i) * 140ms + 200ms), calc(var(--hb-kb8-i) * -2.3s);
}
.hb-kb8-laptop { left: 17%; top: 0; width: 66%; z-index: 1; --d: 10; --r: 5; }
.hb-kb8-tablet { left: 1%; top: 20%; width: 29%; z-index: 2; --d: 22; --r: 8; }
.hb-kb8-phone { right: 5%; top: 30%; width: 14.5%; z-index: 3; --d: 34; --r: 11; }
.hb-kb8-bezel { position: relative; padding: 1.4%; border: 1px solid rgba(255, 255, 255, .14); border-radius: 14px; background: linear-gradient(160deg, #26262b, #121214); box-shadow: 0 40px 80px -30px rgba(0, 0, 0, .9), inset 0 1px 0 rgba(255, 255, 255, .12); }
.hb-kb8-screen { position: relative; overflow: hidden; border-radius: 8px; background: #0d0d10; color: #ededed; font-size: clamp(5px, .92cqi, 10px); line-height: 1.3; }
.hb-kb8-laptop .hb-kb8-screen { aspect-ratio: 16 / 10; display: grid; grid-template-columns: 17% 1fr; }
.hb-kb8-base { position: relative; width: 114%; height: clamp(6px, 1.4cqi, 14px); margin-left: -7%; border-radius: 0 0 14px 14px; background: linear-gradient(#3a3a40, #1b1b1f); box-shadow: 0 20px 40px -14px rgba(0, 0, 0, .9); }
.hb-kb8-base::before { content: ""; position: absolute; top: 0; left: 42%; width: 16%; height: 40%; border-radius: 0 0 8px 8px; background: #141417; }
.hb-kb8-tablet .hb-kb8-bezel { padding: 3%; border-radius: 18px; }
.hb-kb8-tablet .hb-kb8-screen { aspect-ratio: 3 / 4; border-radius: 10px; padding: 8%; }
.hb-kb8-phone .hb-kb8-bezel { padding: 5%; border-radius: 22px; }
.hb-kb8-phone .hb-kb8-screen { aspect-ratio: 9 / 19; border-radius: 16px; padding: 12% 9% 9%; }
.hb-kb8-notch { position: absolute; top: 3.5%; left: 50%; width: 32%; height: 3.2%; border-radius: 999px; background: #000; transform: translateX(-50%); }
.hb-kb8-side { display: grid; align-content: start; gap: 6%; padding: 14% 12%; border-right: 1px solid rgba(255, 255, 255, .06); background: #0a0a0c; }
.hb-kb8-side b { display: flex; align-items: center; gap: 6%; margin-bottom: 18%; font-weight: 700; }
.hb-kb8-side b i { width: 1.2em; height: 1.2em; border-radius: .35em; background: linear-gradient(135deg, var(--hb-kb8-accent), #38bdf8); }
.hb-kb8-side span { padding: 6% 8%; border-radius: .5em; color: #8f8f8f; }
.hb-kb8-side span[data-on="true"] { background: rgba(255, 255, 255, .06); color: #ededed; }
.hb-kb8-main { display: flex; flex-direction: column; gap: 4%; min-width: 0; padding: 3.4% 4%; }
.hb-kb8-top { display: flex; align-items: center; justify-content: space-between; }
.hb-kb8-top strong { font-size: 1.5em; font-weight: 600; letter-spacing: -.02em; }
.hb-kb8-top span { padding: .4em .9em; border-radius: 999px; background: var(--hb-kb8-accent); color: #0a0a0a; font-weight: 600; }
.hb-kb8-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3%; }
.hb-kb8-kpi { padding: 6% 8%; border: 1px solid rgba(255, 255, 255, .07); border-radius: .7em; background: #121216; color: #8f8f8f; }
.hb-kb8-kpi b { display: block; margin-top: .3em; color: #ededed; font-size: 1.55em; font-weight: 600; letter-spacing: -.02em; }
.hb-kb8-kpi em { color: #4ade80; font-style: normal; }
.hb-kb8-chart { flex: 1; position: relative; min-height: 0; border: 1px solid rgba(255, 255, 255, .07); border-radius: .7em; background: #111115; }
.hb-kb8-chart svg { position: absolute; inset: 14% 4% 6%; width: 92%; height: 80%; overflow: visible; }
.hb-kb8-chart > span { position: absolute; top: 7%; left: 4%; color: #8f8f8f; }
.hb-kb8-line { fill: none; stroke: var(--hb-kb8-accent); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-dasharray: 1; animation: hb-kb8-draw 1.6s cubic-bezier(.65, 0, .35, 1) .8s both; }
.hb-kb8-line2 { fill: none; stroke: #38bdf8; stroke-width: 1.5; vector-effect: non-scaling-stroke; stroke-dasharray: 1; opacity: .7; animation: hb-kb8-draw 1.6s cubic-bezier(.65, 0, .35, 1) 1s both; }
.hb-kb8-rows { display: grid; gap: .5em; }
.hb-kb8-rows div { display: grid; grid-template-columns: 1.6em 1fr auto; align-items: center; gap: .6em; color: #a1a1a1; }
.hb-kb8-rows i { width: 1.6em; height: 1.6em; border-radius: 50%; background: var(--c); }
.hb-kb8-rows b { color: #ededed; font-weight: 500; }
.hb-kb8-tablet .hb-kb8-screen { display: flex; flex-direction: column; gap: 5%; font-size: clamp(5px, .85cqi, 9.5px); }
.hb-kb8-day { display: flex; align-items: baseline; justify-content: space-between; }
.hb-kb8-day strong { font-size: 1.9em; font-weight: 600; letter-spacing: -.03em; }
.hb-kb8-day span { color: #8f8f8f; }
.hb-kb8-week { display: grid; grid-template-columns: repeat(7, 1fr); gap: 3%; text-align: center; color: #8f8f8f; }
.hb-kb8-week span { padding: 14% 0; border-radius: .6em; }
.hb-kb8-week span[data-on="true"] { background: var(--hb-kb8-accent); color: #0a0a0a; font-weight: 700; }
.hb-kb8-agenda { display: grid; flex: 1; align-content: start; gap: 4%; }
.hb-kb8-ev { display: grid; gap: .2em; padding: 6% 7%; border-left: 2px solid var(--c); border-radius: .4em; background: color-mix(in srgb, var(--c) 12%, #111114); }
.hb-kb8-ev b { font-weight: 600; }
.hb-kb8-ev span { color: #8f8f8f; }
.hb-kb8-phone .hb-kb8-screen { display: flex; flex-direction: column; gap: 4%; font-size: clamp(4px, .62cqi, 7px); }
.hb-kb8-bal span { color: #8f8f8f; }
.hb-kb8-bal strong { display: block; margin-top: .2em; font-size: 2em; font-weight: 600; letter-spacing: -.03em; }
.hb-kb8-card { position: relative; aspect-ratio: 1.6; overflow: hidden; padding: 10%; border-radius: .9em; background: linear-gradient(135deg, var(--hb-kb8-accent), #38bdf8 120%); color: #0a0a0a; font-weight: 600; }
.hb-kb8-card::after { content: ""; position: absolute; right: -20%; bottom: -40%; width: 80%; aspect-ratio: 1; border-radius: 50%; background: rgba(255, 255, 255, .25); }
.hb-kb8-card span { position: absolute; bottom: 10%; left: 10%; letter-spacing: .1em; }
.hb-kb8-bars { display: flex; align-items: flex-end; gap: 6%; height: 18%; }
.hb-kb8-bars i { flex: 1; height: var(--h); border-radius: .3em .3em 0 0; background: color-mix(in srgb, var(--hb-kb8-accent) 55%, #1d1d22); transform-origin: bottom; animation: hb-kb8-grow .8s cubic-bezier(.2, .8, .2, 1) backwards; animation-delay: calc(var(--j) * 80ms + 1s); }
.hb-kb8-bars i:nth-child(5) { background: var(--hb-kb8-accent); }
.hb-kb8-tx { display: grid; gap: .5em; }
.hb-kb8-tx div { display: flex; justify-content: space-between; color: #a1a1a1; }
.hb-kb8-tx b { color: #ededed; font-weight: 500; }
.hb-kb8-sync { position: absolute; left: 50%; bottom: 2%; z-index: 4; display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border: 1px solid rgba(255, 255, 255, .14); border-radius: 999px; background: rgba(16, 16, 18, .85); color: #d4d4d4; font-size: 12px; white-space: nowrap; translate: -50% 0; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); animation: hb-kb8-rise .6s ease 1.2s backwards; }
.hb-kb8-sync i { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 8px #4ade80; animation: hb-kb8-blink 1.6s ease-in-out infinite; }
.hb-kb8-feats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin: clamp(28px, 4cqi, 44px) 0 0; padding: 0; list-style: none; border-top: 1px solid rgba(255, 255, 255, .08); }
.hb-kb8-feats li { min-width: 0; padding: 22px 20px 0; border-left: 1px solid rgba(255, 255, 255, .08); animation: hb-kb8-rise .6s cubic-bezier(.2, .8, .2, 1) backwards; animation-delay: calc(var(--hb-kb8-i) * 90ms + 600ms); }
.hb-kb8-feats li:first-child { border-left: 0; padding-left: 0; }
.hb-kb8-feats svg { color: var(--hb-kb8-accent); }
.hb-kb8-feats h3 { margin: 12px 0 0; font-size: 14.5px; font-weight: 600; }
.hb-kb8-feats p { margin: 5px 0 0; color: #8f8f8f; font-size: 13px; line-height: 1.55; }
@container (max-width: 760px) {
  .hb-kb8-feats { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 20px; }
  .hb-kb8-feats li:nth-child(3) { border-left: 0; padding-left: 0; }
  .hb-kb8-stage { aspect-ratio: 16 / 10; }
  .hb-kb8-laptop { left: 10%; width: 80%; }
  .hb-kb8-tablet { left: 0; top: 28%; width: 30%; }
  .hb-kb8-phone { right: 0; top: 38%; width: 16%; }
  .hb-kb8-sync { display: none; }
}
@container (max-width: 460px) {
  .hb-kb8-feats { grid-template-columns: minmax(0, 1fr); }
  .hb-kb8-feats li { border-left: 0; padding-left: 0; }
  .hb-kb8-stage { aspect-ratio: 1 / .82; }
  .hb-kb8-laptop { left: 4%; width: 92%; }
  .hb-kb8-tablet { top: 36%; width: 34%; }
  .hb-kb8-phone { top: 44%; width: 19%; }
  .hb-kb8-bezel { border-radius: 10px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kb8 *, .hb-kb8 *::before, .hb-kb8 *::after { animation: none !important; transition: none !important; }
  .hb-kb8-dev { transform: none; }
}
`;

const defaultFeatures: ShowcaseDeviceStackFeature[] = [
  { title: "Responsive by default", description: "Layouts adapt from a 4-inch phone to a 32-inch display." },
  { title: "Syncs in real time", description: "Changes land on every device in under 200 ms." },
  { title: "Works offline", description: "Keep editing on a plane and merge cleanly when you land." },
  { title: "Feels native", description: "Gestures, haptics and shortcuts tuned for each platform." },
];

const featureIcons = [
  "M2 4.5h9v7H2zM13 6.5h3v6.5h-3zM5 14h3",
  "M3 9a6 6 0 0110-4.4M15 9a6 6 0 01-10 4.4M13 2.5v2.5h-2.5M5 15.5V13h2.5",
  "M4.5 13.5h9a3 3 0 00.4-6 4.5 4.5 0 00-8.7-1A3.5 3.5 0 004.5 13.5zM9 8v4M7.2 10.2L9 12l1.8-1.8",
  "M9 2.5v3M9 12.5v3M2.5 9h3M12.5 9h3M4.5 4.5l2 2M11.5 11.5l2 2M13.5 4.5l-2 2M6.5 11.5l-2 2",
];

export function ShowcaseDeviceStack({
  eyebrow = "One account, every screen",
  title = "Start on your laptop, finish on your phone",
  subtitle = "Orbit keeps your dashboards, calendar and wallet in lockstep across every device, with nothing to configure.",
  cta = { label: "Download Orbit", href: "#" },
  features = defaultFeatures,
  intensity = 1,
  accent = "#a78bfa",
  className,
  style,
  ...rest
}: ShowcaseDeviceStackProps) {
  const stage = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef(0);

  React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2 * intensity;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2 * intensity;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    });
  };

  const onLeave = () => {
    const el = stage.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  return (
    <section
      className={["hb-kb8", className].filter(Boolean).join(" ")}
      style={{ "--hb-kb8-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-showcase-device-stack" precedence="default">{css}</style>
      <div className="hb-kb8-in">
        <header className="hb-kb8-head">
          {eyebrow ? <p className="hb-kb8-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-kb8-title">{title}</h2>
          {subtitle ? <p className="hb-kb8-sub">{subtitle}</p> : null}
          {cta ? (
            <a className="hb-kb8-cta" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v8M4.5 7.5L8 11l3.5-3.5M3 13.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
        </header>

        <div ref={stage} className="hb-kb8-stage" onPointerMove={onMove} onPointerLeave={onLeave} role="img" aria-label="Orbit running on a laptop, a tablet and a phone">
          <div className="hb-kb8-dev hb-kb8-laptop" style={{ "--hb-kb8-i": 0 } as React.CSSProperties} aria-hidden="true">
            <div className="hb-kb8-bezel">
              <div className="hb-kb8-screen">
                <div className="hb-kb8-side">
                  <b>
                    <i />
                    Orbit
                  </b>
                  <span data-on="true">Overview</span>
                  <span>Calendar</span>
                  <span>Wallet</span>
                  <span>Reports</span>
                  <span>Settings</span>
                </div>
                <div className="hb-kb8-main">
                  <div className="hb-kb8-top">
                    <strong>Good morning, Ava</strong>
                    <span>New report</span>
                  </div>
                  <div className="hb-kb8-kpis">
                    <div className="hb-kb8-kpi">
                      Revenue
                      <b>$48.2k</b>
                      <em>+12.8%</em>
                    </div>
                    <div className="hb-kb8-kpi">
                      Active users
                      <b>9,416</b>
                      <em>+4.1%</em>
                    </div>
                    <div className="hb-kb8-kpi">
                      Sessions
                      <b>31.7k</b>
                      <em>+9.3%</em>
                    </div>
                  </div>
                  <div className="hb-kb8-chart">
                    <span>Last 30 days</span>
                    <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                      <path className="hb-kb8-line2" d="M0 30 C10 28 16 31 25 27 S40 24 50 25 S66 20 75 21 S90 16 100 17" pathLength={1} />
                      <path className="hb-kb8-line" d="M0 34 C10 30 16 32 25 24 S40 22 50 16 S66 18 75 11 S90 7 100 4" pathLength={1} />
                    </svg>
                  </div>
                  <div className="hb-kb8-rows">
                    <div>
                      <i style={{ "--c": "#f9a8d4" } as React.CSSProperties} />
                      <b>Northwind renewal</b>
                      <span>$12,400</span>
                    </div>
                    <div>
                      <i style={{ "--c": "#fcd34d" } as React.CSSProperties} />
                      <b>Acme expansion</b>
                      <span>$8,950</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hb-kb8-base" />
          </div>

          <div className="hb-kb8-dev hb-kb8-tablet" style={{ "--hb-kb8-i": 1 } as React.CSSProperties} aria-hidden="true">
            <div className="hb-kb8-bezel">
              <div className="hb-kb8-screen">
                <div className="hb-kb8-day">
                  <strong>Thursday</strong>
                  <span>Nov 6</span>
                </div>
                <div className="hb-kb8-week">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span key={i} data-on={i === 3 ? "true" : undefined}>
                      {d}
                    </span>
                  ))}
                </div>
                <div className="hb-kb8-agenda">
                  <div className="hb-kb8-ev" style={{ "--c": accent } as React.CSSProperties}>
                    <b>Product review</b>
                    <span>9:30 to 10:15 · Room 4</span>
                  </div>
                  <div className="hb-kb8-ev" style={{ "--c": "#38bdf8" } as React.CSSProperties}>
                    <b>Lunch with Noah</b>
                    <span>12:30 · Café Lisboa</span>
                  </div>
                  <div className="hb-kb8-ev" style={{ "--c": "#f9a8d4" } as React.CSSProperties}>
                    <b>Board prep</b>
                    <span>15:00 to 16:30</span>
                  </div>
                  <div className="hb-kb8-ev" style={{ "--c": "#4ade80" } as React.CSSProperties}>
                    <b>Run club</b>
                    <span>18:45 · Riverside</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hb-kb8-dev hb-kb8-phone" style={{ "--hb-kb8-i": 2 } as React.CSSProperties} aria-hidden="true">
            <div className="hb-kb8-bezel">
              <div className="hb-kb8-screen">
                <span className="hb-kb8-notch" />
                <div className="hb-kb8-bal">
                  <span>Balance</span>
                  <strong>$12,480</strong>
                </div>
                <div className="hb-kb8-card">
                  Orbit Card
                  <span>•••• 4021</span>
                </div>
                <div className="hb-kb8-bars">
                  {[40, 65, 50, 80, 100, 55, 70].map((h, j) => (
                    <i key={j} style={{ "--h": `${h}%`, "--j": j } as React.CSSProperties} />
                  ))}
                </div>
                <div className="hb-kb8-tx">
                  <div>
                    <b>Spotless Café</b>
                    <span>−$6.40</span>
                  </div>
                  <div>
                    <b>Salary</b>
                    <span>+$4,200</span>
                  </div>
                  <div>
                    <b>Metro</b>
                    <span>−$2.90</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hb-kb8-sync" aria-hidden="true">
            <i />
            Synced across 3 devices · just now
          </div>
        </div>

        <ul className="hb-kb8-feats">
          {features.slice(0, 4).map((f, i) => (
            <li key={f.title} style={{ "--hb-kb8-i": i } as React.CSSProperties}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d={featureIcons[i % featureIcons.length]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
