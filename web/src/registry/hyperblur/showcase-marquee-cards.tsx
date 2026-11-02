"use client";

import * as React from "react";

export interface ShowcaseMarqueeProject {
  title: string;
  tag: string;
  year: string;
  href: string;
  colors?: [string, string, string];
}

export interface ShowcaseMarqueeLink {
  label: string;
  href: string;
}

export interface ShowcaseMarqueeCardsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: ShowcaseMarqueeLink | null;
  items?: ShowcaseMarqueeProject[];
  duration?: number;
  accent?: string;
  background?: string;
}

const css = `
@keyframes hb-kb9-rise { from { opacity: 0; transform: translate3d(0, 18px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-kb9-slide { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-50%, 0, 0); } }
.hb-kb9 {
  --hb-kb9-accent: #2f7bff;
  --hb-kb9-bg: #ffffff;
  --hb-kb9-ink: #111113;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: var(--hb-kb9-bg);
  color: var(--hb-kb9-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kb9 *, .hb-kb9 *::before, .hb-kb9 *::after { box-sizing: border-box; }
.hb-kb9-in { position: relative; padding: clamp(56px, 8cqi, 104px) 0; }
.hb-kb9-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px 40px; max-width: 1120px; margin: 0 auto clamp(28px, 4cqi, 48px); padding: 0 clamp(16px, 5cqi, 48px); animation: hb-kb9-rise .7s cubic-bezier(.2, .8, .2, 1) backwards; }
.hb-kb9-head > div { max-width: 640px; }
.hb-kb9-eyebrow { display: inline-flex; align-items: center; gap: 10px; margin: 0 0 14px; color: #6b6b70; font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
.hb-kb9-eyebrow::before { content: ""; width: 18px; height: 2px; border-radius: 2px; background: var(--hb-kb9-accent); }
.hb-kb9-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(32px, 4.8cqi, 56px); font-weight: 600; line-height: 1; letter-spacing: -.045em; text-wrap: balance; }
.hb-kb9-sub { margin: 16px 0 0; color: #5b5b62; font-size: 15.5px; line-height: 1.6; text-wrap: pretty; }
.hb-kb9-cta { display: inline-flex; flex: none; align-items: center; gap: 8px; padding: 11px 18px; border-radius: 999px; background: var(--hb-kb9-ink); color: var(--hb-kb9-bg); font-size: 14px; font-weight: 600; text-decoration: none; transition: transform .2s ease, box-shadow .2s ease; }
.hb-kb9-cta:hover { transform: translate3d(0, -1px, 0); box-shadow: 0 12px 24px -12px rgba(0, 0, 0, .5); }
.hb-kb9-cta svg { transition: transform .2s ease; }
.hb-kb9-cta:hover svg { transform: translate3d(3px, 0, 0); }
.hb-kb9-cta:focus-visible { outline: 2px solid var(--hb-kb9-accent); outline-offset: 3px; }
.hb-kb9-rows { display: grid; gap: clamp(14px, 2cqi, 22px); }
.hb-kb9-row {
  overflow: hidden;
  padding: 10px 0 18px;
  mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
  animation: hb-kb9-rise .8s cubic-bezier(.2, .8, .2, 1) backwards;
  animation-delay: calc(var(--hb-kb9-r) * 120ms + 150ms);
}
.hb-kb9-track { display: flex; width: max-content; animation: hb-kb9-slide var(--hb-kb9-dur, 48s) linear infinite; }
.hb-kb9-row[data-dir="right"] .hb-kb9-track { animation-direction: reverse; }
.hb-kb9-row:hover .hb-kb9-track, .hb-kb9-row:focus-within .hb-kb9-track { animation-play-state: paused; }
.hb-kb9-group { display: flex; gap: clamp(12px, 1.8cqi, 20px); padding-right: clamp(12px, 1.8cqi, 20px); }
.hb-kb9-card {
  flex: none;
  display: block;
  width: clamp(220px, 27cqi, 300px);
  padding: 8px 8px 14px;
  border: 1px solid rgba(17, 17, 19, .08);
  border-radius: 18px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 1px 2px rgba(17, 17, 19, .04);
  transition: transform .35s cubic-bezier(.2, .8, .2, 1), box-shadow .35s ease, border-color .35s ease;
}
.hb-kb9-card:hover, .hb-kb9-card:focus-visible { transform: translate3d(0, -6px, 0); border-color: rgba(17, 17, 19, .14); box-shadow: 0 24px 40px -24px rgba(17, 17, 19, .35); }
.hb-kb9-card:focus-visible { outline: 2px solid var(--hb-kb9-accent); outline-offset: 3px; }
.hb-kb9-cover { position: relative; aspect-ratio: 4 / 3; overflow: hidden; border-radius: 12px; background: radial-gradient(70% 70% at 20% 20%, var(--c1), transparent 70%), radial-gradient(80% 80% at 90% 90%, var(--c3), transparent 70%), var(--c2); }
.hb-kb9-cover::after { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .25), inset 0 -40px 60px -40px rgba(0, 0, 0, .25); }
.hb-kb9-cover svg { position: absolute; inset: 0; width: 100%; height: 100%; transition: transform .8s cubic-bezier(.2, .8, .2, 1); }
.hb-kb9-card:hover .hb-kb9-cover svg { transform: scale(1.08) rotate(-2deg); }
.hb-kb9-badge { position: absolute; top: 10px; left: 10px; z-index: 1; padding: 4px 9px; border-radius: 999px; background: rgba(255, 255, 255, .82); color: #111113; font-size: 11px; font-weight: 600; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.hb-kb9-meta { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 6px 0; }
.hb-kb9-meta h3 { margin: 0; overflow: hidden; font-size: 15px; font-weight: 600; letter-spacing: -.01em; text-overflow: ellipsis; white-space: nowrap; }
.hb-kb9-meta div span { display: block; margin-top: 2px; color: #8a8a90; font-size: 12.5px; font-variant-numeric: tabular-nums; }
.hb-kb9-go { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: #f1f1f3; color: #111113; transition: background .25s ease, color .25s ease, transform .25s ease; }
.hb-kb9-card:hover .hb-kb9-go { background: var(--hb-kb9-accent); color: #fff; transform: rotate(-45deg); }
.hb-kb9-foot { display: flex; justify-content: center; gap: 28px; flex-wrap: wrap; max-width: 1120px; margin: clamp(24px, 3.5cqi, 40px) auto 0; padding: 0 clamp(16px, 5cqi, 48px); color: #6b6b70; font-size: 13.5px; }
.hb-kb9-foot b { color: var(--hb-kb9-ink); font-weight: 600; }
@container (max-width: 720px) {
  .hb-kb9-head { flex-direction: column; align-items: flex-start; }
  .hb-kb9-row { mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kb9 *, .hb-kb9 *::before, .hb-kb9 *::after { animation: none !important; transition: none !important; }
  .hb-kb9-row { overflow-x: auto; mask-image: none; -webkit-mask-image: none; }
  .hb-kb9-group[aria-hidden="true"] { display: none; }
}
`;

const palette: [string, string, string][] = [
  ["#9ec5ff", "#2f5bea", "#0b1f6b"],
  ["#ffd6a5", "#f08a4b", "#7a2e12"],
  ["#d9f99d", "#4d7c0f", "#1a2e05"],
  ["#fbcfe8", "#db2777", "#4a0d2a"],
  ["#c7d2fe", "#6d5dfc", "#1e1b4b"],
  ["#a7f3d0", "#0f9b8e", "#063b36"],
  ["#fde68a", "#e0a50b", "#5c3b00"],
  ["#e9d5ff", "#9333ea", "#2e1065"],
  ["#fecaca", "#ef4444", "#450a0a"],
  ["#bae6fd", "#0284c7", "#082f49"],
  ["#f5f5f4", "#a8a29e", "#292524"],
  ["#ddd6fe", "#4f46e5", "#111827"],
];

const defaultItems: ShowcaseMarqueeProject[] = [
  { title: "Tidal Banking", tag: "Fintech", year: "2026", href: "#" },
  { title: "Arcadia Hotels", tag: "Brand site", year: "2026", href: "#" },
  { title: "Fieldnote", tag: "Productivity", year: "2025", href: "#" },
  { title: "Kiln Ceramics", tag: "E-commerce", year: "2025", href: "#" },
  { title: "Northstar Health", tag: "Healthcare", year: "2026", href: "#" },
  { title: "Atlas Maps SDK", tag: "Developer tools", year: "2024", href: "#" },
  { title: "Halcyon Audio", tag: "Hardware", year: "2026", href: "#" },
  { title: "Mosaic Learning", tag: "Education", year: "2025", href: "#" },
  { title: "Pantry", tag: "Food delivery", year: "2024", href: "#" },
  { title: "Veloway Bikes", tag: "E-commerce", year: "2026", href: "#" },
  { title: "Lumen Studio", tag: "Portfolio", year: "2025", href: "#" },
  { title: "Quill Docs", tag: "SaaS", year: "2026", href: "#" },
];

function Shape({ kind }: { kind: number }) {
  const w = "rgba(255,255,255,.9)";
  switch (kind % 6) {
    case 0:
      return (
        <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="98" cy="62" r="34" fill={w} fillOpacity=".85" />
          <circle cx="70" cy="62" r="34" fill="none" stroke={w} strokeWidth="2" />
          <circle cx="126" cy="62" r="34" fill="none" stroke={w} strokeOpacity=".5" strokeWidth="2" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M40 110V64a40 40 0 0180 0v46" fill="none" stroke={w} strokeWidth="14" />
          <path d="M62 110V66a18 18 0 0136 0v44" fill={w} fillOpacity=".35" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {Array.from({ length: 48 }, (_, i) => {
            const x = 28 + (i % 8) * 15;
            const y = 22 + Math.floor(i / 8) * 15;
            const r = 1.5 + ((i * 7) % 5) * 0.7;
            return <circle key={i} cx={x} cy={y} r={r.toFixed(1)} fill={w} fillOpacity={(0.4 + ((i * 3) % 6) * 0.1).toFixed(2)} />;
          })}
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M0 78 C30 58 50 98 80 78 S130 58 160 78" fill="none" stroke={w} strokeWidth="3" />
          <path d="M0 92 C30 72 50 112 80 92 S130 72 160 92" fill="none" stroke={w} strokeOpacity=".6" strokeWidth="3" />
          <path d="M0 64 C30 44 50 84 80 64 S130 44 160 64" fill="none" stroke={w} strokeOpacity=".35" strokeWidth="3" />
          <circle cx="118" cy="34" r="12" fill={w} />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect x="44" y="24" width="72" height="72" rx="18" fill="none" stroke={w} strokeWidth="2" transform="rotate(12 80 60)" />
          <rect x="54" y="34" width="52" height="52" rx="12" fill={w} fillOpacity=".3" transform="rotate(-8 80 60)" />
          <rect x="66" y="46" width="28" height="28" rx="7" fill={w} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={30 + i * 15} y={96 - (18 + ((i * 37) % 50))} width="9" height={18 + ((i * 37) % 50)} rx="4.5" fill={w} fillOpacity={(0.45 + i * 0.07).toFixed(2)} />
          ))}
        </svg>
      );
  }
}

function Card({ item, index, hidden }: { item: ShowcaseMarqueeProject; index: number; hidden: boolean }) {
  const colors = item.colors ?? palette[index % palette.length];
  return (
    <a className="hb-kb9-card" href={item.href} tabIndex={hidden ? -1 : undefined}>
      <div className="hb-kb9-cover" style={{ "--c1": colors[0], "--c2": colors[1], "--c3": colors[2] } as React.CSSProperties}>
        <span className="hb-kb9-badge">{item.tag}</span>
        <Shape kind={index} />
      </div>
      <div className="hb-kb9-meta">
        <div style={{ minWidth: 0 }}>
          <h3>{item.title}</h3>
          <span>{item.year}</span>
        </div>
        <span className="hb-kb9-go" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </a>
  );
}

export function ShowcaseMarqueeCards({
  eyebrow = "Selected work",
  title = "Products our clients actually shipped",
  subtitle = "Eighty-six launches across fintech, health and commerce. Hover a row to pause it and take a closer look.",
  cta = { label: "View all projects", href: "#" },
  items = defaultItems,
  duration = 48,
  accent = "#2f7bff",
  background = "#ffffff",
  className,
  style,
  ...rest
}: ShowcaseMarqueeCardsProps) {
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)].filter((r) => r.length);

  return (
    <section
      className={["hb-kb9", className].filter(Boolean).join(" ")}
      style={{ "--hb-kb9-accent": accent, "--hb-kb9-bg": background, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-showcase-marquee-cards" precedence="default">{css}</style>
      <div className="hb-kb9-in">
        <header className="hb-kb9-head">
          <div>
            {eyebrow ? <p className="hb-kb9-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-kb9-title">{title}</h2>
            {subtitle ? <p className="hb-kb9-sub">{subtitle}</p> : null}
          </div>
          {cta ? (
            <a className="hb-kb9-cta" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
        </header>

        <div className="hb-kb9-rows">
          {rows.map((row, r) => (
            <div
              key={r}
              className="hb-kb9-row"
              data-dir={r % 2 ? "right" : "left"}
              style={{ "--hb-kb9-r": r, "--hb-kb9-dur": `${(duration * (r % 2 ? 1.15 : 1)).toFixed(1)}s` } as React.CSSProperties}
            >
              <div className="hb-kb9-track">
                {[0, 1].map((copy) => (
                  <div key={copy} className="hb-kb9-group" aria-hidden={copy === 1 ? "true" : undefined}>
                    {row.map((item, i) => (
                      <Card key={`${copy}-${item.title}`} item={item} index={r * half + i} hidden={copy === 1} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hb-kb9-foot">
          <span>
            <b>86</b> launches
          </span>
          <span>
            <b>14</b> industries
          </span>
          <span>
            <b>4.9</b> average client rating
          </span>
        </div>
      </div>
    </section>
  );
}
