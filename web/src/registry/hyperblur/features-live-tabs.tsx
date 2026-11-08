"use client";

import * as React from "react";

export interface FeaturesLiveTabsItem {
  label: string;
  title: string;
  body: string;
  stat: string;
}

export interface FeaturesLiveTabsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FeaturesLiveTabsItem[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  autoPlay?: boolean;
  interval?: number;
  accent?: string;
}

const css = `
@keyframes hb-wa2-zoom { from { opacity: 0; transform: translate3d(0, 10%, 0) scale(.34); } to { opacity: 1; transform: none; } }
@keyframes hb-wa2-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-wa2-fade { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-wa2-cur1 { 0%, 100% { left: 18%; top: 62%; } 30% { left: 44%; top: 30%; } 55% { left: 44%; top: 30%; } 80% { left: 30%; top: 70%; } }
@keyframes hb-wa2-cur2 { 0%, 100% { left: 78%; top: 24%; } 40% { left: 64%; top: 58%; } 70% { left: 70%; top: 40%; } }
@keyframes hb-wa2-pop { 0%, 20% { opacity: 0; transform: scale(.4); } 30%, 88% { opacity: 1; transform: none; } 100% { opacity: 0; transform: scale(.9); } }
@keyframes hb-wa2-fan { 0%, 15% { transform: translate(0, 0) rotate(0); } 45%, 85% { transform: translate(var(--dx), var(--dy)) rotate(var(--r)); } 100% { transform: translate(0, 0) rotate(0); } }
@keyframes hb-wa2-measure { 0%, 20% { transform: scaleX(0); opacity: 0; } 35%, 90% { transform: scaleX(1); opacity: 1; } 100% { opacity: 0; } }
@keyframes hb-wa2-measurev { 0%, 30% { transform: scaleY(0); opacity: 0; } 45%, 90% { transform: scaleY(1); opacity: 1; } 100% { opacity: 0; } }
@keyframes hb-wa2-draw { 0%, 15% { stroke-dashoffset: 1; } 50%, 100% { stroke-dashoffset: 0; } }
@keyframes hb-wa2-tap { 0%, 55% { transform: scale(0); opacity: .7; } 75% { transform: scale(2.6); opacity: 0; } 100% { opacity: 0; } }
.hb-wa2 {
  --hb-wa2-accent: #ff5a36;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: #131313;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa2 *, .hb-wa2 *::before, .hb-wa2 *::after { box-sizing: border-box; }
.hb-wa2 em, .hb-wa2 i { font-style: normal; }
.hb-wa2-in { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa2-head { max-width: 680px; margin: 0 auto clamp(28px, 4cqi, 44px); text-align: center; }
.hb-wa2-eyebrow { display: inline-block; margin: 0 0 14px; padding: 4px 10px; border: 1px solid rgba(0, 0, 0, .1); border-radius: 999px; background: #fff; color: #555; font-size: 12.5px; font-weight: 500; }
.hb-wa2-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(30px, 4.6cqi, 52px); font-weight: 600; line-height: 1.04; letter-spacing: -.035em; text-wrap: balance; }
.hb-wa2-sub { margin: 14px auto 0; max-width: 560px; color: #6b6b6b; font-size: 15.5px; line-height: 1.6; text-wrap: pretty; }
.hb-wa2-tabs { display: grid; grid-template-columns: repeat(var(--hb-wa2-n), minmax(0, 1fr)); gap: 10px; margin-bottom: 14px; }
.hb-wa2-tab { position: relative; display: grid; gap: 10px; padding: 8px 8px 12px; border: 1px solid rgba(0, 0, 0, .08); border-radius: 16px; background: rgba(255, 255, 255, .55); color: inherit; font: inherit; text-align: left; cursor: pointer; transition: background .3s ease, border-color .3s ease, transform .3s cubic-bezier(.22, 1, .36, 1), box-shadow .3s ease; }
.hb-wa2-tab:hover { background: #fff; transform: translate3d(0, -2px, 0); }
.hb-wa2-tab[aria-selected="true"] { background: #fff; border-color: rgba(0, 0, 0, .14); box-shadow: 0 1px 0 rgba(0, 0, 0, .04), 0 18px 30px -20px rgba(0, 0, 0, .35); }
.hb-wa2-tab:focus-visible { outline: 2px solid var(--hb-wa2-accent); outline-offset: 3px; }
.hb-wa2-mini { overflow: hidden; border-radius: 10px; filter: saturate(.4); opacity: .75; transition: filter .3s ease, opacity .3s ease; }
.hb-wa2-tab[aria-selected="true"] .hb-wa2-mini, .hb-wa2-tab:hover .hb-wa2-mini { filter: none; opacity: 1; }
.hb-wa2-tlabel { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 0 4px; font-size: 13.5px; font-weight: 600; }
.hb-wa2-tlabel small { color: #8a8a8a; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; font-weight: 500; }
.hb-wa2-prog { position: absolute; left: 12px; right: 12px; bottom: 5px; height: 2px; overflow: hidden; border-radius: 2px; background: rgba(0, 0, 0, .06); opacity: 0; }
.hb-wa2-tab[aria-selected="true"] .hb-wa2-prog { opacity: 1; }
.hb-wa2-prog i { display: block; height: 100%; background: var(--hb-wa2-accent); transform-origin: left; transform: scaleX(1); }
.hb-wa2[data-auto="true"] .hb-wa2-prog i { animation: hb-wa2-fill var(--hb-wa2-t) linear both; }
.hb-wa2[data-paused="true"] .hb-wa2-prog i { animation-play-state: paused; }
.hb-wa2-stage { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr); gap: 10px; }
.hb-wa2-view { position: relative; overflow: hidden; padding: clamp(10px, 2cqi, 18px); border: 1px solid rgba(0, 0, 0, .08); border-radius: 22px; background: #fff; box-shadow: 0 30px 60px -40px rgba(0, 0, 0, .35); }
.hb-wa2-zoom { transform-origin: var(--hb-wa2-x) 0; animation: hb-wa2-zoom .7s cubic-bezier(.22, 1, .36, 1) both; }
.hb-wa2-copy { display: flex; flex-direction: column; justify-content: space-between; gap: 24px; padding: clamp(18px, 3cqi, 30px); border: 1px solid rgba(0, 0, 0, .08); border-radius: 22px; background: #131313; color: #f2f2f2; }
.hb-wa2-copy > div { animation: hb-wa2-fade .5s cubic-bezier(.22, 1, .36, 1) both; }
.hb-wa2-copy h3 { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(20px, 2.4cqi, 28px); font-weight: 600; line-height: 1.15; letter-spacing: -.02em; }
.hb-wa2-copy p { margin: 12px 0 0; color: #a3a3a3; font-size: 14.5px; line-height: 1.65; }
.hb-wa2-stat { display: flex; align-items: baseline; gap: 10px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, .1); color: #a3a3a3; font-size: 13px; }
.hb-wa2-stat b { color: var(--hb-wa2-accent); font-family: var(--font-grotesk, inherit); font-size: 30px; font-weight: 600; letter-spacing: -.03em; }
.hb-wa2-scene { position: relative; container-type: inline-size; aspect-ratio: 2 / 1; overflow: hidden; border-radius: 12px; background: #f1efe9; background-image: radial-gradient(rgba(0, 0, 0, .09) 1px, transparent 1px); background-size: 4cqi 4cqi; font-size: 2.4cqi; }
.hb-wa2-frame { position: absolute; border-radius: 1.6cqi; background: #fff; box-shadow: 0 .6cqi 2cqi rgba(0, 0, 0, .1); }
.hb-wa2-ln { position: absolute; height: 1.4cqi; border-radius: 1cqi; background: #e7e5df; }
.hb-wa2-cur { position: absolute; width: 3cqi; height: 3cqi; }
.hb-wa2-cur span { position: absolute; left: 2.4cqi; top: 2.4cqi; padding: .3cqi 1cqi; border-radius: 1cqi; color: #fff; font-size: 1.8cqi; font-weight: 600; white-space: nowrap; }
.hb-wa2-c1 { animation: hb-wa2-cur1 6s cubic-bezier(.65, 0, .35, 1) infinite; }
.hb-wa2-c2 { animation: hb-wa2-cur2 7s cubic-bezier(.65, 0, .35, 1) infinite; }
.hb-wa2-pin { position: absolute; display: grid; place-items: center; width: 4cqi; height: 4cqi; border-radius: 50% 50% 50% 0; background: var(--hb-wa2-accent); color: #fff; font-size: 1.8cqi; font-weight: 700; animation: hb-wa2-pop 6s ease infinite; }
.hb-wa2-bubble { position: absolute; padding: 1.2cqi 1.6cqi; border-radius: 1.4cqi; background: #131313; color: #fff; font-size: 1.9cqi; line-height: 1.35; box-shadow: 0 1cqi 3cqi rgba(0, 0, 0, .2); animation: hb-wa2-pop 6s ease infinite; animation-delay: .5s; }
.hb-wa2-bubble b { display: block; color: #ffb4a3; font-size: 1.6cqi; }
.hb-wa2-sheet { position: absolute; left: 36%; top: 16%; width: 28%; height: 68%; border-radius: 1.4cqi; background: #fff; box-shadow: 0 .8cqi 2.4cqi rgba(0, 0, 0, .12); animation: hb-wa2-fan 5s cubic-bezier(.65, 0, .35, 1) infinite; }
.hb-wa2-sheet span { position: absolute; left: 8%; bottom: 7%; padding: .4cqi 1cqi; border-radius: 1cqi; background: #f1efe9; color: #555; font-family: var(--font-mono, ui-monospace, monospace); font-size: 1.7cqi; }
.hb-wa2-sheet[data-top="true"] span { background: var(--hb-wa2-accent); color: #fff; }
.hb-wa2-hero { position: absolute; left: 8%; right: 8%; top: 9%; height: 38%; border-radius: 1cqi; background: linear-gradient(135deg, var(--g1), var(--g2)); }
.hb-wa2-btn { position: absolute; left: 30%; top: 38%; width: 30%; height: 20%; display: grid; place-items: center; border-radius: 2cqi; background: #131313; color: #fff; font-size: 2.4cqi; font-weight: 600; }
.hb-wa2-rule { position: absolute; background: var(--hb-wa2-accent); }
.hb-wa2-rule span { position: absolute; padding: .2cqi .8cqi; border-radius: .8cqi; background: var(--hb-wa2-accent); color: #fff; font-family: var(--font-mono, ui-monospace, monospace); font-size: 1.6cqi; white-space: nowrap; }
.hb-wa2-rh { left: 30%; width: 30%; top: 64%; height: .3cqi; transform-origin: left; animation: hb-wa2-measure 5s ease infinite; }
.hb-wa2-rh span { left: 50%; top: 1cqi; transform: translateX(-50%); }
.hb-wa2-rv { left: 63%; top: 38%; height: 20%; width: .3cqi; transform-origin: top; animation: hb-wa2-measurev 5s ease infinite; }
.hb-wa2-rv span { left: 1.2cqi; top: 50%; transform: translateY(-50%); }
.hb-wa2-spec { position: absolute; right: 4%; top: 10%; bottom: 10%; width: 24%; padding: 1.6cqi; border-radius: 1.4cqi; background: #131313; color: #d4d4d4; font-family: var(--font-mono, ui-monospace, monospace); font-size: 1.7cqi; line-height: 2; }
.hb-wa2-spec b { color: #fff; font-weight: 600; }
.hb-wa2-spec i { display: inline-block; width: 1.6cqi; height: 1.6cqi; margin-right: .6cqi; border-radius: .4cqi; background: var(--hb-wa2-accent); vertical-align: -.2cqi; }
.hb-wa2-phone { position: absolute; top: 12%; width: 18%; height: 76%; padding: 1cqi; border: .4cqi solid #131313; border-radius: 2.4cqi; background: #fff; }
.hb-wa2-phone .hb-wa2-ln { position: relative; display: block; margin-bottom: 1cqi; }
.hb-wa2-tile { height: 32%; margin-bottom: 1.2cqi; border-radius: 1cqi; background: linear-gradient(135deg, var(--g1), var(--g2)); }
.hb-wa2-flow { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-wa2-flow path { fill: none; stroke: var(--hb-wa2-accent); stroke-width: .5; stroke-linecap: round; stroke-dasharray: 1; animation: hb-wa2-draw 4s cubic-bezier(.65, 0, .35, 1) infinite; }
.hb-wa2-flow path + path { animation-delay: .9s; }
.hb-wa2-tap { position: absolute; width: 4cqi; height: 4cqi; margin: -2cqi 0 0 -2cqi; border-radius: 50%; background: var(--hb-wa2-accent); animation: hb-wa2-tap 4s ease-out infinite; }
@container (max-width: 820px) {
  .hb-wa2-stage { grid-template-columns: minmax(0, 1fr); }
}
@container (max-width: 640px) {
  .hb-wa2-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa2 *, .hb-wa2 *::before, .hb-wa2 *::after { animation: none !important; transition: none !important; }
  .hb-wa2-pin, .hb-wa2-bubble, .hb-wa2-rule { opacity: 1; transform: none; }
  .hb-wa2-flow path { stroke-dashoffset: 0; }
  .hb-wa2-tap { display: none; }
}
`;

const defaultItems: FeaturesLiveTabsItem[] = [
  { label: "Comments", title: "Feedback pinned to the pixel", body: "Drop a comment anywhere on the canvas. Threads follow the layer when it moves, and resolve themselves when the change ships.", stat: "3.2x faster review rounds" },
  { label: "Versions", title: "Every save is a version you can name", body: "Branch a frame, try something bold, and compare it side by side with main. Restoring is one click, not an archaeology dig.", stat: "Unlimited history on every plan" },
  { label: "Handoff", title: "Specs that write themselves", body: "Spacing, radii and tokens appear the moment a developer hovers a layer. Copy the CSS or jump straight to the token in your library.", stat: "41% fewer questions in review" },
  { label: "Prototype", title: "Link screens by drawing a line", body: "Drag from a button to a screen and the flow is live. Share a link and watch where people tap, in real time.", stat: "12,000 teams prototype here" },
];

function SceneComments() {
  return (
    <div className="hb-wa2-scene">
      <div className="hb-wa2-frame" style={{ left: "12%", top: "12%", width: "52%", height: "76%" }}>
        <div className="hb-wa2-hero" style={{ "--g1": "#ffd2c4", "--g2": "#ff8a6b", height: "34%" } as React.CSSProperties} />
        <i className="hb-wa2-ln" style={{ left: "8%", top: "52%", width: "60%" }} />
        <i className="hb-wa2-ln" style={{ left: "8%", top: "62%", width: "44%" }} />
        <i className="hb-wa2-ln" style={{ left: "8%", top: "76%", width: "30%", height: "8%", background: "#131313" }} />
      </div>
      <span className="hb-wa2-pin" style={{ left: "44%", top: "22%" }}>2</span>
      <div className="hb-wa2-bubble" style={{ left: "60%", top: "14%", width: "32%" }}>
        <b>Maya Okafor</b>
        Can the hero crop tighter on mobile?
      </div>
      <span className="hb-wa2-cur hb-wa2-c1">
        <svg viewBox="0 0 12 12" width="100%" height="100%" aria-hidden="true"><path d="M1 1l9 4-4 1.2L4.6 11z" fill="#2563eb" stroke="#fff" strokeWidth=".8" /></svg>
        <span style={{ background: "#2563eb" }}>Maya</span>
      </span>
      <span className="hb-wa2-cur hb-wa2-c2">
        <svg viewBox="0 0 12 12" width="100%" height="100%" aria-hidden="true"><path d="M1 1l9 4-4 1.2L4.6 11z" fill="#16a34a" stroke="#fff" strokeWidth=".8" /></svg>
        <span style={{ background: "#16a34a" }}>Theo</span>
      </span>
    </div>
  );
}

function SceneVersions() {
  const sheets = [
    { v: "v12", dx: "-62%", dy: "4%", r: "-8deg", g1: "#e0e7ff", g2: "#a5b4fc" },
    { v: "v13", dx: "62%", dy: "4%", r: "8deg", g1: "#dcfce7", g2: "#86efac" },
    { v: "v14 · main", dx: "0%", dy: "-4%", r: "0deg", g1: "#ffd2c4", g2: "#ff8a6b", top: true },
  ];
  return (
    <div className="hb-wa2-scene">
      {sheets.map((s) => (
        <div key={s.v} className="hb-wa2-sheet" data-top={s.top ? "true" : undefined} style={{ "--dx": s.dx, "--dy": s.dy, "--r": s.r } as React.CSSProperties}>
          <div className="hb-wa2-hero" style={{ "--g1": s.g1, "--g2": s.g2 } as React.CSSProperties} />
          <i className="hb-wa2-ln" style={{ left: "8%", top: "56%", width: "70%" }} />
          <i className="hb-wa2-ln" style={{ left: "8%", top: "66%", width: "48%" }} />
          <span>{s.v}</span>
        </div>
      ))}
    </div>
  );
}

function SceneHandoff() {
  return (
    <div className="hb-wa2-scene">
      <div className="hb-wa2-frame" style={{ left: "6%", top: "10%", width: "62%", height: "80%" }}>
        <div className="hb-wa2-btn" style={{ left: "35%", top: "30%", width: "34%", height: "24%" }}>Start trial</div>
        <i className="hb-wa2-rule hb-wa2-rh" style={{ left: "35%", width: "34%", top: "62%" }}><span>184</span></i>
        <i className="hb-wa2-rule hb-wa2-rv" style={{ left: "72%", top: "30%", height: "24%" }}><span>48</span></i>
      </div>
      <div className="hb-wa2-spec">
        <b>Button / Primary</b>
        <br />padding 14 24
        <br />radius 12
        <br /><i />accent/600
        <br />Geist 15 / 600
      </div>
    </div>
  );
}

function ScenePrototype() {
  return (
    <div className="hb-wa2-scene">
      {[8, 41, 74].map((l, j) => (
        <div key={l} className="hb-wa2-phone" style={{ left: `${l}%` }}>
          <div className="hb-wa2-tile" style={{ "--g1": ["#ffd2c4", "#e0e7ff", "#dcfce7"][j], "--g2": ["#ff8a6b", "#a5b4fc", "#86efac"][j] } as React.CSSProperties} />
          <i className="hb-wa2-ln" style={{ width: "80%" }} />
          <i className="hb-wa2-ln" style={{ width: "56%" }} />
          <i className="hb-wa2-ln" style={{ width: "40%", height: "3cqi", marginTop: "2cqi", background: "#131313" }} />
        </div>
      ))}
      <svg className="hb-wa2-flow" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true">
        <path d="M22 33 C 30 33, 33 16, 42 16" pathLength={1} />
        <path d="M55 33 C 63 33, 66 16, 75 16" pathLength={1} />
      </svg>
      <i className="hb-wa2-tap" style={{ left: "18%", top: "68%" }} />
    </div>
  );
}

const scenes = [SceneComments, SceneVersions, SceneHandoff, ScenePrototype];

export function FeaturesLiveTabs({
  eyebrow = "Plyform 4.0",
  title = "The whole design loop, live in every tab",
  subtitle = "Each tab is a working preview. Pick one to open it full size, or let the tour run on its own.",
  items = defaultItems,
  value,
  defaultValue = 0,
  onChange,
  autoPlay = true,
  interval = 5000,
  accent = "#ff5a36",
  className,
  style,
  ...rest
}: FeaturesLiveTabsProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [paused, setPaused] = React.useState(false);
  const active = Math.min(value ?? inner, items.length - 1);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const tabsId = React.useId();

  const go = (i: number, focus = false) => {
    const n = (i + items.length) % items.length;
    if (value === undefined) setInner(n);
    onChange?.(n);
    if (focus) refs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(active + 1, true); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(active - 1, true); }
    else if (e.key === "Home") { e.preventDefault(); go(0, true); }
    else if (e.key === "End") { e.preventDefault(); go(items.length - 1, true); }
  };

  const Scene = scenes[active % scenes.length];
  const item = items[active];

  return (
    <section
      className={["hb-wa2", className].filter(Boolean).join(" ")}
      data-auto={autoPlay}
      data-paused={paused}
      style={{ "--hb-wa2-accent": accent, "--hb-wa2-n": items.length, "--hb-wa2-t": `${interval}ms`, "--hb-wa2-x": `${(((active + 0.5) / items.length) * 100).toFixed(2)}%`, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-features-live-tabs" precedence="default">{css}</style>
      <div className="hb-wa2-in" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <div className="hb-wa2-head">
          <p className="hb-wa2-eyebrow">{eyebrow}</p>
          <h2 className="hb-wa2-title">{title}</h2>
          <p className="hb-wa2-sub">{subtitle}</p>
        </div>
        <div className="hb-wa2-tabs" role="tablist" aria-label={title} onKeyDown={onKey}>
          {items.map((it, i) => {
            const Mini = scenes[i % scenes.length];
            return (
              <button
                key={it.label}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${tabsId}-t${i}`}
                aria-selected={i === active}
                aria-controls={`${tabsId}-p`}
                tabIndex={i === active ? 0 : -1}
                className="hb-wa2-tab"
                onClick={() => go(i)}
              >
                <span className="hb-wa2-mini" aria-hidden="true">
                  <Mini />
                </span>
                <span className="hb-wa2-tlabel">
                  {it.label}
                  <small>0{i + 1}</small>
                </span>
                <span className="hb-wa2-prog" aria-hidden="true">
                  {i === active && <i key={active} onAnimationEnd={() => autoPlay && go(active + 1)} />}
                </span>
              </button>
            );
          })}
        </div>
        <div className="hb-wa2-stage" role="tabpanel" id={`${tabsId}-p`} aria-labelledby={`${tabsId}-t${active}`}>
          <div className="hb-wa2-view">
            <div key={active} className="hb-wa2-zoom">
              <Scene />
            </div>
          </div>
          <div className="hb-wa2-copy">
            <div key={active}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
            <div className="hb-wa2-stat">
              <b>{item.stat.split(" ")[0]}</b>
              {item.stat.split(" ").slice(1).join(" ")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
