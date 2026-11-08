"use client";

import * as React from "react";

export interface ContactPostcardOffice {
  city: string;
  code: string;
  country: string;
  timeZone: string;
  fallbackHour: number;
  address: string[];
  phone: string;
  email: string;
  opens: number;
  closes: number;
  hue: number;
}

export interface ContactOfficePostcardsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  offices?: ContactPostcardOffice[];
  defaultIndex?: number;
  onOfficeChange?: (office: ContactPostcardOffice) => void;
  accent?: string;
}

const defaultOffices: ContactPostcardOffice[] = [
  { city: "Lisbon", code: "LIS", country: "Portugal", timeZone: "Europe/Lisbon", fallbackHour: 14, address: ["Rua do Alecrim 72", "1200-018 Lisbon"], phone: "+351 21 340 8821", email: "lisbon@tessel.studio", opens: 9, closes: 18, hue: 28 },
  { city: "Montreal", code: "YUL", country: "Canada", timeZone: "America/Toronto", fallbackHour: 9, address: ["5455 Avenue de Gaspé, 1010", "Montreal, QC H2T 3B3"], phone: "+1 514 555 0172", email: "montreal@tessel.studio", opens: 9, closes: 17, hue: 205 },
  { city: "Seoul", code: "ICN", country: "South Korea", timeZone: "Asia/Seoul", fallbackHour: 22, address: ["17 Seongsuil-ro 8-gil", "Seongdong-gu, Seoul"], phone: "+82 2 6012 4408", email: "seoul@tessel.studio", opens: 10, closes: 19, hue: 268 },
  { city: "Cape Town", code: "CPT", country: "South Africa", timeZone: "Africa/Johannesburg", fallbackHour: 15, address: ["The Old Biscuit Mill, Unit 9", "Woodstock, Cape Town"], phone: "+27 21 447 3390", email: "capetown@tessel.studio", opens: 8, closes: 17, hue: 160 },
  { city: "Mexico City", code: "MEX", country: "Mexico", timeZone: "America/Mexico_City", fallbackHour: 7, address: ["Colima 124, Roma Norte", "06700 Mexico City"], phone: "+52 55 4170 2286", email: "cdmx@tessel.studio", opens: 9, closes: 18, hue: 340 },
];

function hash(n: number) {
  let x = (n * 2654435761) >>> 0;
  x ^= x >>> 16;
  x = Math.imul(x, 73244475) >>> 0;
  x ^= x >>> 16;
  return x >>> 0;
}

function seedOf(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) >>> 0;
  return h;
}

function skyline(city: string) {
  const seed = seedOf(city);
  const out: { x: number; w: number; h: number; win: { x: number; y: number; lit: boolean }[]; roof: number }[] = [];
  let x = -4;
  let i = 0;
  while (x < 320) {
    const r = hash(seed + i * 17);
    const w = 22 + (r % 26);
    const h = 34 + ((r >>> 5) % 72);
    const win: { x: number; y: number; lit: boolean }[] = [];
    for (let wy = 150 - h + 8; wy < 142; wy += 9) {
      for (let wx = x + 5; wx < x + w - 6; wx += 7) {
        const k = hash(seed + Math.round(wx * 31 + wy * 7));
        win.push({ x: wx, y: wy, lit: k % 3 !== 0 });
      }
    }
    out.push({ x, w, h, win, roof: (r >>> 11) % 4 });
    x += w + 2 + ((r >>> 9) % 5);
    i++;
  }
  return out;
}

function phase(h: number) {
  if (h >= 7 && h < 17) return "day";
  if ((h >= 17 && h < 20) || (h >= 5 && h < 7)) return "dusk";
  return "night";
}

const css = `
@keyframes hb-wd3-twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
@keyframes hb-wd3-drift { from { transform: translateX(-40px); } to { transform: translateX(360px); } }
@keyframes hb-wd3-in { from { opacity: 0; transform: translateY(24px) rotate(var(--hb-wd3-rot)); } to { opacity: 1; transform: rotate(var(--hb-wd3-rot)); } }
.hb-wd3 {
  --hb-wd3-accent: #f5a524;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: radial-gradient(70% 60% at 50% 0%, #151311, #0a0a0a 70%);
  color: #ededed;
  font-family: inherit;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
.hb-wd3 *, .hb-wd3 *::before, .hb-wd3 *::after { box-sizing: border-box; }
.hb-wd3-in { max-width: 1180px; margin: 0 auto; padding: 72px 0 84px; }
.hb-wd3-head { padding: 0 20px; display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-end; justify-content: space-between; margin-bottom: 34px; }
.hb-wd3-eyebrow { font: 500 12px/1 var(--font-mono, monospace); letter-spacing: 0.08em; text-transform: uppercase; color: var(--hb-wd3-accent); }
.hb-wd3-title { margin: 12px 0 10px; font: 600 clamp(30px, 4.6cqw, 48px)/1.04 var(--font-grotesk, inherit); letter-spacing: -0.03em; max-width: 18ch; }
.hb-wd3-sub { margin: 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; max-width: 46ch; }
.hb-wd3-nav { display: flex; gap: 8px; }
.hb-wd3-arrow { appearance: none; width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.12); background: #121212; color: #ededed; display: grid; place-items: center; cursor: pointer; transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }
.hb-wd3-arrow:hover:not(:disabled) { background: #1c1c1c; border-color: rgba(255,255,255,0.24); }
.hb-wd3-arrow:active:not(:disabled) { transform: scale(0.94); }
.hb-wd3-arrow:disabled { opacity: 0.35; cursor: default; }
.hb-wd3-arrow:focus-visible { outline: 2px solid var(--hb-wd3-accent); outline-offset: 3px; }
.hb-wd3-arrow svg { width: 16px; height: 16px; }
.hb-wd3-track { display: flex; gap: 22px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 18px 20px 30px; scroll-padding: 0 20px; scrollbar-width: none; outline: none; }
.hb-wd3-track::-webkit-scrollbar { display: none; }
.hb-wd3-track:focus-visible { box-shadow: inset 0 0 0 2px var(--hb-wd3-accent); border-radius: 12px; }
.hb-wd3-card { --hb-wd3-rot: 0deg; flex: none; width: min(380px, 84cqw); scroll-snap-align: start; border-radius: 6px; background: #f3efe6; color: #1b1a17; padding: 12px; box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 28px 50px -24px rgba(0,0,0,0.85), 0 2px 4px rgba(0,0,0,0.4); transform: rotate(var(--hb-wd3-rot)); transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.5, 1), box-shadow 0.4s ease, opacity 0.4s ease; animation: hb-wd3-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; opacity: 0.72; }
.hb-wd3-card:nth-child(odd) { --hb-wd3-rot: -1.4deg; }
.hb-wd3-card:nth-child(even) { --hb-wd3-rot: 1.1deg; }
.hb-wd3-card[data-active="true"], .hb-wd3-card:hover, .hb-wd3-card:focus-within { --hb-wd3-rot: 0deg; opacity: 1; box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 40px 70px -28px rgba(0,0,0,0.9), 0 0 0 1px color-mix(in srgb, var(--hb-wd3-accent) 50%, transparent); }
.hb-wd3-scene { position: relative; border-radius: 3px; overflow: hidden; aspect-ratio: 316 / 160; }
.hb-wd3-scene svg { display: block; width: 100%; height: 100%; }
.hb-wd3-star { animation: hb-wd3-twinkle 3s ease-in-out infinite; }
.hb-wd3-cloud { animation: hb-wd3-drift 38s linear infinite; }
.hb-wd3-stamp { position: absolute; top: 8px; right: 8px; width: 54px; height: 64px; padding: 3px; background: #f3efe6; border: 3px dotted rgba(10,10,10,0.35); background-clip: padding-box; box-shadow: 0 4px 10px -4px rgba(0,0,0,0.4); transform: rotate(4deg); }
.hb-wd3-stamp div { width: 100%; height: 100%; display: grid; place-items: center; align-content: center; gap: 2px; border: 1px solid rgba(27,26,23,0.25); }
.hb-wd3-stamp b { font: 700 15px/1 var(--font-grotesk, inherit); letter-spacing: 0.02em; }
.hb-wd3-stamp span { font: 500 7.5px/1 var(--font-mono, monospace); letter-spacing: 0.12em; color: #6b6760; }
.hb-wd3-mark { position: absolute; left: 10px; bottom: 10px; display: inline-flex; align-items: center; gap: 6px; padding: 5px 9px; border-radius: 999px; background: rgba(10,10,10,0.6); color: #fff; font: 600 11px/1 var(--font-mono, monospace); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.hb-wd3-mark svg { width: 12px; height: 12px; }
.hb-wd3-body { display: grid; grid-template-columns: 1fr auto; gap: 14px; padding: 16px 6px 6px; }
.hb-wd3-city { margin: 0; font: 600 24px/1 var(--font-grotesk, inherit); letter-spacing: -0.02em; }
.hb-wd3-country { margin: 5px 0 12px; font: 500 10.5px/1 var(--font-mono, monospace); letter-spacing: 0.14em; text-transform: uppercase; color: #8a857b; }
.hb-wd3-addr { margin: 0; font-size: 13px; line-height: 1.5; color: #3d3a34; }
.hb-wd3-lines { display: grid; gap: 6px; align-content: start; min-width: 120px; padding-left: 14px; border-left: 1px dashed rgba(27,26,23,0.2); }
.hb-wd3-lines a { font-size: 12.5px; color: #1b1a17; text-decoration: none; border-bottom: 1px solid rgba(27,26,23,0.18); padding-bottom: 5px; transition: color 0.2s ease, border-color 0.2s ease; }
.hb-wd3-lines a:hover { color: color-mix(in srgb, var(--hb-wd3-accent) 70%, #000); border-color: currentColor; }
.hb-wd3-lines a:focus-visible { outline: 2px solid var(--hb-wd3-accent); outline-offset: 2px; }
.hb-wd3-status { display: inline-flex; align-items: center; gap: 6px; font: 600 11px/1 var(--font-mono, monospace); margin-top: 4px; }
.hb-wd3-status::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #9a958b; }
.hb-wd3-status[data-open="true"] { color: #15803d; }
.hb-wd3-status[data-open="true"]::before { background: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
.hb-wd3-dots { display: flex; gap: 6px; justify-content: center; }
.hb-wd3-dot { appearance: none; border: 0; padding: 0; height: 6px; width: 6px; border-radius: 999px; background: #3a3a3a; cursor: pointer; transition: width 0.4s cubic-bezier(0.34, 1.3, 0.5, 1), background-color 0.3s ease; }
.hb-wd3-dot[aria-current="true"] { width: 26px; background: var(--hb-wd3-accent); }
.hb-wd3-dot:focus-visible { outline: 2px solid var(--hb-wd3-accent); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  .hb-wd3 *, .hb-wd3 *::before, .hb-wd3 *::after { animation: none !important; transition: none !important; }
  .hb-wd3-track { scroll-behavior: auto; }
}
`;

function Scene({ office, hour, uid }: { office: ContactPostcardOffice; hour: number; uid: string }) {
  const p = phase(hour);
  const b = React.useMemo(() => skyline(office.city), [office.city]);
  const sky = p === "day" ? [`hsl(${office.hue} 70% 72%)`, "#f6e7c8"] : p === "dusk" ? [`hsl(${(office.hue + 250) % 360} 45% 32%)`, "#f39a5b"] : ["#070a1a", `hsl(${office.hue} 40% 16%)`];
  const sunT = Math.min(1, Math.max(0, (hour - 6) / 12));
  const sx = (20 + sunT * 276).toFixed(1);
  const sy = (110 - Math.sin(sunT * Math.PI) * 80).toFixed(1);
  const id = `hb-wd3-sky-${uid}-${office.code}`;
  return (
    <svg viewBox="0 0 316 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width="316" height="160" fill={`url(#${id})`} />
      {p === "night" &&
        Array.from({ length: 28 }, (_, i) => {
          const r = hash(i + seedOf(office.code));
          return <circle key={i} className="hb-wd3-star" cx={(r % 316).toFixed(0)} cy={((r >>> 8) % 80).toFixed(0)} r={(0.5 + ((r >>> 4) % 10) / 10).toFixed(1)} fill="#fff" style={{ animationDelay: `${((r >>> 3) % 30) / 10}s` }} />;
        })}
      {p === "night" ? (
        <g>
          <circle cx="250" cy="34" r="13" fill="#f4f1e6" />
          <circle cx="256" cy="30" r="12" fill={sky[0]} />
        </g>
      ) : (
        <g>
          <circle cx={sx} cy={sy} r={p === "dusk" ? 20 : 15} fill={p === "dusk" ? "#ffcf8a" : "#fff6d8"} opacity="0.35" />
          <circle cx={sx} cy={sy} r={p === "dusk" ? 13 : 10} fill={p === "dusk" ? "#ffb35c" : "#fffaf0"} />
        </g>
      )}
      {p !== "night" && (
        <g className="hb-wd3-cloud" opacity={p === "day" ? 0.8 : 0.35}>
          <ellipse cx="40" cy="42" rx="26" ry="7" fill="#fff" />
          <ellipse cx="54" cy="37" rx="14" ry="8" fill="#fff" />
        </g>
      )}
      {b.map((bd, i) => {
        const top = 150 - bd.h;
        const fill = p === "day" ? `hsl(${office.hue} 18% ${30 + (i % 3) * 5}%)` : p === "dusk" ? `hsl(${(office.hue + 240) % 360} 25% ${14 + (i % 3) * 3}%)` : `hsl(${office.hue} 20% ${8 + (i % 3) * 2}%)`;
        return (
          <g key={i}>
            <rect x={bd.x} y={top} width={bd.w} height={bd.h + 10} fill={fill} />
            {bd.roof === 1 && <rect x={bd.x + bd.w / 2 - 1} y={top - 12} width="2" height="12" fill={fill} />}
            {bd.roof === 2 && <path d={`M${bd.x} ${top} L${bd.x + bd.w / 2} ${top - 9} L${bd.x + bd.w} ${top}z`} fill={fill} />}
            {bd.win.map((w, j) =>
              p === "day" ? (
                j % 2 === 0 ? <rect key={j} x={w.x} y={w.y} width="3" height="4" fill="rgba(255,255,255,0.18)" /> : null
              ) : w.lit || p === "dusk" ? (
                <rect key={j} x={w.x} y={w.y} width="3" height="4" fill={w.lit ? "#ffd27a" : "rgba(255,210,122,0.25)"} opacity={w.lit ? 0.9 : 1} />
              ) : null,
            )}
          </g>
        );
      })}
      <rect y="150" width="316" height="10" fill={p === "day" ? "#2b2a28" : "#0b0b0d"} />
    </svg>
  );
}

export function ContactOfficePostcards({
  eyebrow = "Studios",
  title = "Five rooms, one team, always someone awake",
  subtitle = "Drop by any of our studios or write to the one closest to you. The sky on each card follows the local time.",
  offices = defaultOffices,
  defaultIndex = 0,
  onOfficeChange,
  accent = "#f5a524",
  className = "",
  style,
  ...rest
}: ContactOfficePostcardsProps) {
  const uid = React.useId().replace(/:/g, "");
  const track = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(Math.min(defaultIndex, offices.length - 1));
  const [hours, setHours] = React.useState<Record<string, { h: number; label: string }>>({});
  const changeRef = React.useRef(onOfficeChange);
  React.useEffect(() => {
    changeRef.current = onOfficeChange;
  });

  React.useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next: Record<string, { h: number; label: string }> = {};
      for (const o of offices) {
        try {
          const label = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: o.timeZone, hourCycle: "h23" }).format(now);
          const [hh, mm] = label.split(":").map(Number);
          next[o.code] = { h: hh + mm / 60, label };
        } catch {
          next[o.code] = { h: o.fallbackHour, label: `${String(o.fallbackHour).padStart(2, "0")}:00` };
        }
      }
      setHours(next);
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, [offices]);

  const go = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 20, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    let best = 0;
    let dist = Infinity;
    kids.forEach((k, i) => {
      const d = Math.abs(k.offsetLeft - el.offsetLeft - 20 - el.scrollLeft);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    if (best !== active) {
      setActive(best);
      changeRef.current?.(offices[best]);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(Math.min(offices.length - 1, active + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(Math.max(0, active - 1));
    }
  };

  return (
    <section className={`hb-wd3 ${className}`} style={{ "--hb-wd3-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-contact-office-postcards" precedence="default">{css}</style>
      <div className="hb-wd3-in">
        <div className="hb-wd3-head">
          <div>
            <div className="hb-wd3-eyebrow">{eyebrow}</div>
            <h2 className="hb-wd3-title">{title}</h2>
            <p className="hb-wd3-sub">{subtitle}</p>
          </div>
          <div className="hb-wd3-nav">
            <button type="button" className="hb-wd3-arrow" aria-label="Previous studio" disabled={active === 0} onClick={() => go(active - 1)}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5" /></svg>
            </button>
            <button type="button" className="hb-wd3-arrow" aria-label="Next studio" disabled={active === offices.length - 1} onClick={() => go(active + 1)}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5" /></svg>
            </button>
          </div>
        </div>
        <div ref={track} className="hb-wd3-track" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Studios" onScroll={onScroll} onKeyDown={onKey}>
          {offices.map((o, i) => {
            const t = hours[o.code];
            const h = t?.h ?? o.fallbackHour;
            const open = h >= o.opens && h < o.closes;
            return (
              <article key={o.code} className="hb-wd3-card" data-active={i === active} aria-roledescription="slide" aria-label={`${o.city}, ${i + 1} of ${offices.length}`} style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }}>
                <div className="hb-wd3-scene">
                  <Scene office={o} hour={h} uid={uid} />
                  <div className="hb-wd3-stamp" aria-hidden="true">
                    <div>
                      <b>{o.code}</b>
                      <span>TESSEL</span>
                    </div>
                  </div>
                  <span className="hb-wd3-mark">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><circle cx="6" cy="6" r="4.6" /><path d="M6 3.4V6l1.8 1.2" /></svg>
                    {t?.label ?? `${String(o.fallbackHour).padStart(2, "0")}:00`} local
                  </span>
                </div>
                <div className="hb-wd3-body">
                  <div>
                    <h3 className="hb-wd3-city">{o.city}</h3>
                    <p className="hb-wd3-country">{o.country}</p>
                    {o.address.map((a) => (
                      <p key={a} className="hb-wd3-addr">{a}</p>
                    ))}
                    <span className="hb-wd3-status" data-open={open}>
                      {open ? `Open until ${o.closes}:00` : `Opens at ${String(o.opens).padStart(2, "0")}:00`}
                    </span>
                  </div>
                  <div className="hb-wd3-lines">
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`}>{o.phone}</a>
                    <a href={`mailto:${o.email}`}>{o.email.split("@")[0]}@</a>
                    <a href="#">Directions</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="hb-wd3-dots">
          {offices.map((o, i) => (
            <button key={o.code} type="button" className="hb-wd3-dot" aria-label={`Show ${o.city}`} aria-current={i === active} onClick={() => go(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
