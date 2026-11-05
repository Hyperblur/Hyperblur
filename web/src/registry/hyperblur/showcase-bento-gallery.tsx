"use client";

import * as React from "react";

export type ShowcaseBentoGalleryKind = "chart" | "board" | "calendar" | "chat" | "map" | "editor";

export interface ShowcaseBentoGalleryItem {
  title: string;
  caption: string;
  href: string;
  kind: ShowcaseBentoGalleryKind;
  tag?: string;
  image?: string;
}

export interface ShowcaseBentoGalleryProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: ShowcaseBentoGalleryItem[];
  cta?: { label: string; href: string } | null;
  onItemSelect?: (item: ShowcaseBentoGalleryItem, index: number) => void;
  accent?: string;
}

const css = `
.hb-yh7 {
  --hb-yh7-accent: #ff6b4a;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  overflow: hidden;
  padding: clamp(64px, 8cqi, 104px) 20px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yh7 *, .hb-yh7 *::before, .hb-yh7 *::after { box-sizing: border-box; }
.hb-yh7-in { position: relative; max-width: 1120px; margin: 0 auto; }
.hb-yh7-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; margin-bottom: 36px; }
.hb-yh7-eyebrow { display: inline-flex; align-items: center; gap: 8px; color: #a1a1a1; font-size: 13px; font-weight: 500; }
.hb-yh7-eyebrow i { width: 18px; height: 2px; border-radius: 2px; background: var(--hb-yh7-accent); }
.hb-yh7-title { margin: 12px 0 0; max-width: 560px; font-size: clamp(30px, 4.4cqi, 48px); font-weight: 650; letter-spacing: -.04em; line-height: 1.04; }
.hb-yh7-side { max-width: 340px; }
.hb-yh7-sub { margin: 0; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-yh7-cta { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; color: #ededed; font-size: 14px; font-weight: 600; text-decoration: none; }
.hb-yh7-cta svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .2s ease; }
.hb-yh7-cta:hover svg { transform: translateX(3px); }
.hb-yh7-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 200px;
  grid-template-areas: "a a b b" "a a c d" "e e f f";
  gap: 14px;
}
.hb-yh7-tile {
  position: relative;
  display: block;
  min-width: 0;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 20px;
  background: var(--hb-yh7-bg);
  color: #ededed;
  text-decoration: none;
  overflow: hidden;
  isolation: isolate;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
  clip-path: inset(100% 0 0 0 round 20px);
  animation: hb-yh7-reveal .9s cubic-bezier(.7,0,.2,1) forwards;
  animation-delay: calc(var(--hb-yh7-i) * 90ms);
}
.hb-yh7-tile:focus-visible { outline: 2px solid var(--hb-yh7-accent); outline-offset: 3px; }
.hb-yh7-tag { position: absolute; z-index: 3; top: 14px; left: 14px; height: 24px; padding: 0 10px; border: 1px solid rgba(255,255,255,.14); border-radius: 999px; background: rgba(10,10,10,.45); backdrop-filter: blur(8px); color: #ededed; font-size: 11.5px; font-weight: 600; line-height: 22px; }
.hb-yh7-shot {
  position: absolute;
  inset: 56px -2px -2px 18%;
  border: 1px solid rgba(255,255,255,.12);
  border-right: 0;
  border-bottom: 0;
  border-radius: 14px 0 0 0;
  background: #101012;
  box-shadow: 0 -10px 40px -10px rgba(0,0,0,.6);
  overflow: hidden;
  transform-origin: 30% 20%;
  transition: transform .7s cubic-bezier(.2,.8,.2,1);
}
.hb-yh7-tile[data-area="a"] .hb-yh7-shot { inset: 64px -2px -2px 10%; }
.hb-yh7-tile[data-area="c"] .hb-yh7-shot, .hb-yh7-tile[data-area="d"] .hb-yh7-shot { inset: 52px -2px -2px 14px; }
.hb-yh7-tile:hover .hb-yh7-shot, .hb-yh7-tile:focus-visible .hb-yh7-shot { transform: scale(1.06) translate(-6px, -6px); }
.hb-yh7-img { position: absolute; inset: 0; background-position: center top; background-size: cover; }
.hb-yh7-cap {
  position: absolute;
  z-index: 3;
  inset: auto 0 0;
  padding: 40px 18px 16px;
  background: linear-gradient(180deg, transparent, rgba(8,8,9,.85) 45%, rgba(8,8,9,.96));
  transform: translateY(calc(100% - 58px));
  transition: transform .45s cubic-bezier(.2,.8,.2,1);
}
.hb-yh7-tile:hover .hb-yh7-cap, .hb-yh7-tile:focus-visible .hb-yh7-cap { transform: none; }
.hb-yh7-ct { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 15px; font-weight: 650; letter-spacing: -.01em; }
.hb-yh7-ct svg { width: 26px; height: 26px; flex: none; padding: 6px; border-radius: 50%; background: #ededed; color: #0a0a0a; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transform: rotate(-45deg) scale(.6); opacity: 0; transition: transform .45s cubic-bezier(.3,1.4,.5,1), opacity .2s ease; }
.hb-yh7-tile:hover .hb-yh7-ct svg, .hb-yh7-tile:focus-visible .hb-yh7-ct svg { transform: none; opacity: 1; }
.hb-yh7-cd { margin: 8px 0 0; color: #a1a1a1; font-size: 13px; line-height: 1.5; }
.hb-yh7-bar { display: flex; align-items: center; gap: 5px; height: 26px; padding: 0 10px; border-bottom: 1px solid rgba(255,255,255,.06); }
.hb-yh7-bar i { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,.14); }
.hb-yh7-bar span { margin-left: 8px; color: #6f6f6f; font-size: 10px; }
.hb-yh7-body { position: relative; padding: 12px; height: calc(100% - 26px); }
.hb-yh7-kpis { display: flex; gap: 18px; }
.hb-yh7-k { color: #8f8f8f; font-size: 10px; }
.hb-yh7-k b { display: block; margin-top: 2px; color: #ededed; font-size: 18px; letter-spacing: -.02em; }
.hb-yh7-k em { color: #34d399; font-size: 10px; font-style: normal; }
.hb-yh7-svg { position: absolute; left: 12px; right: 12px; bottom: 12px; top: 64px; width: calc(100% - 24px); height: calc(100% - 76px); }
.hb-yh7-line { fill: none; stroke: var(--hb-yh7-accent); stroke-width: 2; stroke-dasharray: 600; stroke-dashoffset: 600; animation: hb-yh7-draw 2s ease .8s forwards; vector-effect: non-scaling-stroke; }
.hb-yh7-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.hb-yh7-col { display: grid; gap: 6px; align-content: start; }
.hb-yh7-ch { color: #8f8f8f; font-size: 9.5px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }
.hb-yh7-card { padding: 7px; border: 1px solid rgba(255,255,255,.06); border-radius: 8px; background: #17171a; }
.hb-yh7-card div { height: 5px; margin-top: 4px; border-radius: 3px; background: rgba(255,255,255,.1); }
.hb-yh7-card div:first-child { margin-top: 0; width: 80%; background: rgba(255,255,255,.22); }
.hb-yh7-card span { display: inline-block; margin-top: 6px; width: 26px; height: 5px; border-radius: 3px; }
.hb-yh7-cal { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; }
.hb-yh7-day { height: 22px; border-radius: 5px; background: rgba(255,255,255,.04); color: #6f6f6f; font-size: 9px; padding: 3px 4px; }
.hb-yh7-day[data-ev="1"] { background: color-mix(in srgb, var(--hb-yh7-accent) 22%, transparent); color: #fff; }
.hb-yh7-day[data-ev="2"] { background: rgba(56,189,248,.2); color: #fff; }
.hb-yh7-msg { max-width: 78%; margin-top: 7px; padding: 7px 10px; border-radius: 12px; background: #1b1b1f; color: #c4c4c4; font-size: 10.5px; line-height: 1.4; }
.hb-yh7-msg[data-me="true"] { margin-left: auto; background: var(--hb-yh7-accent); color: #fff; }
.hb-yh7-map { position: absolute; inset: 0; background: radial-gradient(circle at 30% 40%, rgba(255,255,255,.05), transparent 40%), repeating-linear-gradient(28deg, transparent 0 22px, rgba(255,255,255,.04) 22px 23px), repeating-linear-gradient(118deg, transparent 0 30px, rgba(255,255,255,.04) 30px 31px), #0f1512; }
.hb-yh7-route { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-yh7-route path { fill: none; stroke: var(--hb-yh7-accent); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 6 6; animation: hb-yh7-dash 1.6s linear infinite; }
.hb-yh7-pin { position: absolute; width: 14px; height: 14px; border: 3px solid #fff; border-radius: 50%; background: var(--hb-yh7-accent); box-shadow: 0 0 0 6px color-mix(in srgb, var(--hb-yh7-accent) 25%, transparent); }
.hb-yh7-code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10.5px; line-height: 1.75; color: #8f8f8f; white-space: pre; }
.hb-yh7-code b { color: #c084fc; font-weight: 500; }
.hb-yh7-code u { color: #7dd3fc; text-decoration: none; }
.hb-yh7-code s { color: #fbbf24; text-decoration: none; }
.hb-yh7-caret { display: inline-block; width: 6px; height: 12px; margin-left: 1px; vertical-align: -2px; background: var(--hb-yh7-accent); animation: hb-yh7-blink 1s steps(1) infinite; }
@keyframes hb-yh7-reveal { to { clip-path: inset(0 0 0 0 round 20px); } }
@keyframes hb-yh7-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-yh7-dash { to { stroke-dashoffset: -24; } }
@keyframes hb-yh7-blink { 50% { opacity: 0; } }
@container (max-width: 860px) {
  .hb-yh7-head { flex-direction: column; align-items: flex-start; gap: 16px; }
  .hb-yh7-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 210px; grid-template-areas: "a a" "a a" "b b" "c d" "e e" "f f"; }
}
@container (max-width: 480px) {
  .hb-yh7-grid { grid-template-columns: minmax(0, 1fr); grid-template-areas: "a" "b" "c" "d" "e" "f"; }
}
@media (hover: none) {
  .hb-yh7-cap { transform: none; }
  .hb-yh7-ct svg { transform: none; opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yh7 *, .hb-yh7 *::before, .hb-yh7 *::after { animation: none !important; transition: none !important; }
  .hb-yh7-tile { clip-path: none; }
  .hb-yh7-line { stroke-dashoffset: 0; }
}
`;

const areas = ["a", "b", "c", "d", "e", "f"];

const backgrounds = [
  "radial-gradient(90% 80% at 0% 0%, color-mix(in srgb, var(--hb-yh7-accent) 45%, transparent), transparent 60%), linear-gradient(160deg, #1d1210, #0e0e0f)",
  "radial-gradient(80% 90% at 100% 0%, rgba(56,189,248,.35), transparent 60%), linear-gradient(160deg, #0d1620, #0e0e0f)",
  "radial-gradient(90% 90% at 0% 100%, rgba(167,139,250,.35), transparent 60%), #111014",
  "radial-gradient(90% 90% at 100% 100%, rgba(52,211,153,.3), transparent 60%), #0e1210",
  "radial-gradient(70% 90% at 80% 0%, rgba(251,191,36,.28), transparent 60%), linear-gradient(160deg, #17140c, #0e0e0f)",
  "radial-gradient(70% 90% at 20% 0%, rgba(244,114,182,.28), transparent 60%), linear-gradient(160deg, #1a0f16, #0e0e0f)",
];

const defaultItems: ShowcaseBentoGalleryItem[] = [
  { title: "Revenue that explains itself", caption: "Every spike links to the deals, campaigns and refunds behind it.", href: "#", kind: "chart", tag: "Analytics" },
  { title: "Boards that move with the team", caption: "Drag cards across stages and owners get pinged automatically.", href: "#", kind: "board", tag: "Projects" },
  { title: "Shared calendars", caption: "See launches, sprints and time off on one grid.", href: "#", kind: "calendar" },
  { title: "Threaded chat", caption: "Discuss any record without leaving it.", href: "#", kind: "chat" },
  { title: "Live delivery routes", caption: "Drivers, stops and ETAs update every few seconds on the map.", href: "#", kind: "map", tag: "Logistics" },
  { title: "Scripts with autocomplete", caption: "Automate reports in TypeScript with typed access to every table.", href: "#", kind: "editor", tag: "Developers" },
];

function Scene({ kind }: { kind: ShowcaseBentoGalleryKind }) {
  const gid = `hb-yh7-g${React.useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  if (kind === "chart") {
    const pts = [62, 58, 64, 52, 55, 44, 47, 36, 40, 28, 31, 18];
    const d = pts.map((y, i) => `${i === 0 ? "M" : "L"}${((i / (pts.length - 1)) * 100).toFixed(2)} ${y}`).join(" ");
    return (
      <div className="hb-yh7-body">
        <div className="hb-yh7-kpis">
          <div className="hb-yh7-k">
            MRR<b>$184,920</b>
            <em>+12.4%</em>
          </div>
          <div className="hb-yh7-k">
            Net new<b>$21,300</b>
            <em>+8.1%</em>
          </div>
          <div className="hb-yh7-k">
            Churn<b>1.9%</b>
            <em>-0.4 pt</em>
          </div>
        </div>
        <svg className="hb-yh7-svg" viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--hb-yh7-accent)" stopOpacity=".35" />
              <stop offset="1" stopColor="var(--hb-yh7-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[17, 35, 52].map((y) => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(255,255,255,.06)" strokeWidth=".4" />
          ))}
          <path d={`${d} L100 70 L0 70 Z`} fill={`url(#${gid})`} />
          <path className="hb-yh7-line" d={d} />
        </svg>
      </div>
    );
  }
  if (kind === "board") {
    const cols = [
      ["Backlog", 3, "#64748b"],
      ["Doing", 2, "#38bdf8"],
      ["Done", 3, "#34d399"],
    ] as const;
    return (
      <div className="hb-yh7-body">
        <div className="hb-yh7-cols">
          {cols.map(([n, c, color]) => (
            <div key={n} className="hb-yh7-col">
              <span className="hb-yh7-ch">{n}</span>
              {Array.from({ length: c }, (_, i) => (
                <div key={i} className="hb-yh7-card">
                  <div />
                  <div style={{ width: `${55 + ((i * 17) % 35)}%` }} />
                  <span style={{ background: color }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "calendar") {
    return (
      <div className="hb-yh7-body">
        <div className="hb-yh7-cal">
          {Array.from({ length: 21 }, (_, i) => {
            const ev = (i * 7 + 3) % 5 === 0 ? "1" : (i * 11 + 2) % 7 === 0 ? "2" : "0";
            return (
              <div key={i} className="hb-yh7-day" data-ev={ev}>
                {i + 3}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  if (kind === "chat") {
    return (
      <div className="hb-yh7-body">
        <div className="hb-yh7-msg">Can we ship the onboarding fix today?</div>
        <div className="hb-yh7-msg" data-me="true">
          Yes, PR is green. Merging at 3.
        </div>
        <div className="hb-yh7-msg">Perfect, I will tell support.</div>
      </div>
    );
  }
  if (kind === "map") {
    return (
      <div className="hb-yh7-body" style={{ padding: 0 }}>
        <div className="hb-yh7-map" />
        <svg className="hb-yh7-route" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M20 80 C 60 78, 60 40, 100 44 S 150 20, 182 22" />
        </svg>
        <span className="hb-yh7-pin" style={{ left: "8%", top: "74%" }} />
        <span className="hb-yh7-pin" style={{ left: "88%", top: "16%" }} />
      </div>
    );
  }
  return (
    <div className="hb-yh7-body">
      <div className="hb-yh7-code">
        <b>export async function</b> <u>weeklyReport</u>() {"{"}
        {"\n"}
        {"  "}
        <b>const</b> rows = <b>await</b> db.<u>orders</u>
        {"\n"}
        {"    "}.where(<s>&quot;status&quot;</s>, <s>&quot;paid&quot;</s>)
        {"\n"}
        {"    "}.since(<s>&quot;7d&quot;</s>)
        <span className="hb-yh7-caret" />
        {"\n"}
        {"  "}
        <b>return</b> summarize(rows)
        {"\n"}
        {"}"}
      </div>
    </div>
  );
}

export function ShowcaseBentoGallery({
  eyebrow = "Product tour",
  title = "One workspace, every view your team needs",
  subtitle = "Real screens from the product. Hover any tile to see what it does, or open it to try the live demo.",
  items = defaultItems,
  cta = { label: "Open the interactive demo", href: "#" },
  onItemSelect,
  accent = "#ff6b4a",
  className = "",
  style,
  ...rest
}: ShowcaseBentoGalleryProps) {
  return (
    <section className={`hb-yh7 ${className}`} style={{ "--hb-yh7-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-showcase-bento-gallery" precedence="default">
        {css}
      </style>
      <div className="hb-yh7-in">
        <header className="hb-yh7-head">
          <div>
            <span className="hb-yh7-eyebrow">
              <i aria-hidden="true" />
              {eyebrow}
            </span>
            <h2 className="hb-yh7-title">{title}</h2>
          </div>
          <div className="hb-yh7-side">
            {subtitle && <p className="hb-yh7-sub">{subtitle}</p>}
            {cta && (
              <a href={cta.href} className="hb-yh7-cta">
                {cta.label}
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            )}
          </div>
        </header>
        <div className="hb-yh7-grid">
          {items.slice(0, 6).map((item, i) => (
            <a
              key={item.title}
              href={item.href}
              className="hb-yh7-tile"
              data-area={areas[i]}
              onClick={() => onItemSelect?.(item, i)}
              style={{ gridArea: areas[i], "--hb-yh7-i": i, "--hb-yh7-bg": backgrounds[i] } as React.CSSProperties}
            >
              {item.tag && <span className="hb-yh7-tag">{item.tag}</span>}
              <div className="hb-yh7-shot" aria-hidden="true">
                {item.image ? (
                  <span className="hb-yh7-img" style={{ backgroundImage: `url("${item.image}")` }} />
                ) : (
                  <>
                    <div className="hb-yh7-bar">
                      <i />
                      <i />
                      <i />
                      <span>{item.title}</span>
                    </div>
                    <Scene kind={item.kind} />
                  </>
                )}
              </div>
              <div className="hb-yh7-cap">
                <div className="hb-yh7-ct">
                  {item.title}
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>
                <p className="hb-yh7-cd">{item.caption}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
