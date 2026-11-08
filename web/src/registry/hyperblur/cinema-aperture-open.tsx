"use client";

import * as React from "react";

export interface CinemaApertureOpenAction {
  label: string;
  href: string;
}

export interface CinemaApertureOpenProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  kicker?: string;
  title?: string;
  subtitle?: string;
  cta?: CinemaApertureOpenAction | null;
  blades?: number;
  autoPlay?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  accent?: string;
  headingAs?: "h1" | "h2";
}

const css = `
.hb-vc4 {
  --hb-vc4-accent: #ff5fa2;
  position: relative;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 580px;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #000;
  color: #fff;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-vc4 *, .hb-vc4 *::before, .hb-vc4 *::after { box-sizing: border-box; }
.hb-vc4-scene { position: absolute; inset: 0; z-index: 0; }
.hb-vc4-scene svg { display: block; width: 100%; height: 100%; }
.hb-vc4-win { animation: hb-vc4-win 6s steps(1, end) infinite; }
@keyframes hb-vc4-win {
  0%, 100% { opacity: 1; }
  50% { opacity: .35; }
}
.hb-vc4-copy {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 720px;
  padding: 0 24px;
  text-align: center;
  transform: scale(calc(.92 + var(--hb-vc4-p, 1) * .08));
  opacity: calc(var(--hb-vc4-p, 1) * 1.4 - .3);
}
.hb-vc4-kicker {
  margin: 0 0 14px;
  color: rgba(255, 255, 255, .72);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: .32em;
  text-transform: uppercase;
}
.hb-vc4-title {
  margin: 0;
  font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  font-size: clamp(42px, 10cqi, 128px);
  font-weight: 700;
  line-height: .9;
  letter-spacing: -.035em;
  text-shadow: 0 0 60px color-mix(in srgb, var(--hb-vc4-accent) 45%, transparent);
}
.hb-vc4-sub {
  margin: 18px 0 0;
  color: rgba(255, 255, 255, .78);
  font-size: clamp(14px, 1.8cqi, 17px);
}
.hb-vc4-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  margin-top: 26px;
  padding: 0 20px;
  border-radius: 999px;
  background: #fff;
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 12px 40px -12px var(--hb-vc4-accent);
  transition: transform .2s ease, box-shadow .3s ease;
}
.hb-vc4-cta:hover { box-shadow: 0 16px 50px -10px var(--hb-vc4-accent); }
.hb-vc4-cta:active { transform: scale(.97); }
.hb-vc4-cta:focus-visible, .hb-vc4-ctrl:focus-visible { outline: 2px solid var(--hb-vc4-accent); outline-offset: 3px; }
.hb-vc4-iris {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}
.hb-vc4-iris svg { display: block; width: 100%; height: 100%; }
.hb-vc4-hud {
  position: absolute;
  top: 18px;
  left: clamp(14px, 3cqi, 28px);
  right: clamp(14px, 3cqi, 28px);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255, 255, 255, .7);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: .16em;
  text-transform: uppercase;
}
.hb-vc4-stop { display: inline-flex; align-items: baseline; gap: 10px; }
.hb-vc4-stop b {
  min-width: 4.2ch;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: .04em;
}
.hb-vc4-ticks { display: flex; gap: 3px; }
.hb-vc4-tick { width: 2px; height: 10px; background: rgba(255, 255, 255, .2); transition: background .2s ease; }
.hb-vc4-tick[data-on="true"] { background: var(--hb-vc4-accent); }
.hb-vc4-ctrl {
  position: absolute;
  bottom: 18px;
  right: clamp(14px, 3cqi, 28px);
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 999px;
  background: rgba(10, 10, 10, .55);
  color: #fff;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: border-color .2s ease, background .2s ease;
}
.hb-vc4-ctrl:hover { border-color: rgba(255, 255, 255, .45); background: rgba(30, 30, 30, .7); }
@media (prefers-reduced-motion: reduce) {
  .hb-vc4-iris { display: none; }
  .hb-vc4-copy { transform: none; opacity: 1; }
  .hb-vc4-win { animation: none; }
}
`;

const stops = ["22", "16", "11", "8", "5.6", "4", "2.8", "2", "1.4"];

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function windows() {
  const out: { x: number; y: number; on: boolean; blink: boolean }[] = [];
  const towers = [
    [60, 380, 90], [170, 300, 70], [260, 420, 110], [400, 260, 80], [500, 350, 120],
    [640, 210, 90], [750, 330, 100], [880, 280, 80], [980, 390, 120], [1120, 240, 90], [1230, 320, 110], [1360, 280, 100], [1480, 360, 90],
  ];
  towers.forEach(([x, y, w], ti) => {
    for (let r = 0; r < 14; r++) {
      for (let c = 0; c < Math.floor(w / 16); c++) {
        const h = Math.imul(ti * 997 + r * 131 + c * 17 + 7, 2654435761) >>> 0;
        if (y + 14 + r * 24 > 820) continue;
        out.push({ x: x + 8 + c * 16, y: y + 14 + r * 24, on: h % 5 < 2, blink: h % 97 === 3 });
      }
    }
  });
  return { towers, out };
}

const city = windows();

export function CinemaApertureOpen({
  kicker = "A film by Rafa Moreno",
  title = "Glass Harbor",
  subtitle = "Premiere screening · Friday, 9:00 PM · Screen 2",
  cta = { label: "Reserve seats", href: "#" },
  blades = 9,
  autoPlay = true,
  open,
  defaultOpen = false,
  onOpenChange,
  accent = "#ff5fa2",
  headingAs = "h1",
  className,
  style,
  ...rest
}: CinemaApertureOpenProps) {
  const Heading = headingAs;
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const [manual, setManual] = React.useState(false);
  const isOpen = open ?? innerOpen;
  const [p, setP] = React.useState(defaultOpen ? 1 : 0);
  const pRef = React.useRef(p);
  const changeRef = React.useRef(onOpenChange);

  React.useEffect(() => {
    changeRef.current = onOpenChange;
  }, [onOpenChange]);

  React.useEffect(() => {
    let raf = 0;
    const from = pRef.current;
    const to = isOpen ? 1 : 0;
    const dur = isOpen ? 1700 : 1100;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / dur);
      const v = from + (to - from) * ease(k);
      pRef.current = v;
      setP(v);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  React.useEffect(() => {
    if (!autoPlay || manual || open !== undefined) return;
    const t = window.setTimeout(() => {
      setInnerOpen((o) => !o);
    }, innerOpen ? 5200 : 1300);
    return () => window.clearTimeout(t);
  }, [autoPlay, manual, open, innerOpen]);

  const toggle = () => {
    const next = !isOpen;
    setManual(true);
    if (open === undefined) setInnerOpen(next);
    changeRef.current?.(next);
  };

  const n = Math.max(5, Math.min(14, Math.round(blades)));
  const twist = 70;
  const reach = 150;
  const stopIndex = Math.round(p * (stops.length - 1));
  const vars = { "--hb-vc4-accent": accent, "--hb-vc4-p": p.toFixed(3), ...style } as React.CSSProperties;

  return (
    <section className={["hb-vc4", className].filter(Boolean).join(" ")} style={vars} {...rest}>
      <style href="hb-cinema-aperture-open" precedence="default">{css}</style>
      <div className="hb-vc4-scene" aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`hb-vc4-sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b0618" />
              <stop offset=".45" stopColor="#3a1240" />
              <stop offset=".72" stopColor="#c2456b" />
              <stop offset=".86" stopColor="#ff9a6a" />
              <stop offset="1" stopColor="#1a0a14" />
            </linearGradient>
            <linearGradient id={`hb-vc4-sea-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a0f28" />
              <stop offset="1" stopColor="#05030a" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill={`url(#hb-vc4-sky-${uid})`} />
          <circle cx="1080" cy="560" r="120" fill="#ffd2a8" opacity=".5" />
          {city.towers.map(([x, y, w], i) => (
            <rect key={i} x={x} y={y} width={w} height={820 - y} fill="#0d0714" />
          ))}
          {city.out.map((wv, i) =>
            wv.on ? (
              <rect key={i} className={wv.blink ? "hb-vc4-win" : undefined} x={wv.x} y={wv.y} width="7" height="10" fill="#ffc78a" opacity=".78" />
            ) : null,
          )}
          <rect y="820" width="1600" height="80" fill={`url(#hb-vc4-sea-${uid})`} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={1040 - i * 14} y={830 + i * 13} width={80 + i * 28} height="2" fill="#ffc9a0" opacity={(0.5 - i * 0.08).toFixed(2)} />
          ))}
        </svg>
      </div>
      <div className="hb-vc4-copy">
        {kicker ? <p className="hb-vc4-kicker">{kicker}</p> : null}
        <Heading className="hb-vc4-title">{title}</Heading>
        {subtitle ? <p className="hb-vc4-sub">{subtitle}</p> : null}
        {cta ? (
          <a className="hb-vc4-cta" href={cta.href} tabIndex={p < 0.5 ? -1 : undefined}>
            {cta.label}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        ) : null}
      </div>
      <div className="hb-vc4-iris" aria-hidden="true">
        <svg viewBox="-100 -100 200 200" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`hb-vc4-blade-${uid}`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#2b2b30" />
              <stop offset=".04" stopColor="#141417" />
              <stop offset="1" stopColor="#050506" />
            </linearGradient>
            <radialGradient id={`hb-vc4-shade-${uid}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(130)">
              <stop offset="0" stopColor="#000" stopOpacity="0" />
              <stop offset=".55" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity=".7" />
            </radialGradient>
          </defs>
          {Array.from({ length: n }, (_, i) => {
            const rot = (i * 360) / n + twist * p;
            const h = -6 + reach * p;
            return (
              <g key={i} transform={`rotate(${rot.toFixed(2)})`}>
                <g transform={`translate(0 ${(-h).toFixed(2)})`}>
                  <path d="M-400 -400 H400 V0 H-400Z" fill={`url(#hb-vc4-blade-${uid})`} />
                  <path d="M-400 0 H400" stroke="#fff" strokeOpacity=".12" strokeWidth=".35" />
                  <path d="M-400 -.6 H400" stroke="#000" strokeOpacity=".8" strokeWidth=".6" />
                </g>
              </g>
            );
          })}
          <rect x="-400" y="-400" width="800" height="800" fill={`url(#hb-vc4-shade-${uid})`} />
        </svg>
      </div>
      <div className="hb-vc4-hud" aria-hidden="true">
        <span className="hb-vc4-stop">Aperture <b>f/{stops[stopIndex]}</b></span>
        <span className="hb-vc4-ticks">
          {stops.map((s, i) => (
            <span key={s} className="hb-vc4-tick" data-on={i <= stopIndex ? "true" : "false"} />
          ))}
        </span>
      </div>
      <button type="button" className="hb-vc4-ctrl" onClick={toggle} aria-pressed={isOpen}>
        {isOpen ? "Close iris" : "Open iris"}
      </button>
    </section>
  );
}
