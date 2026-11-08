"use client";

import * as React from "react";

export interface CaseRailItem {
  client: string;
  title: string;
  sector: string;
  metric: string;
  metricLabel: string;
  hue: number;
  href: string;
}

export interface ShowcaseCaseRailProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  cases?: CaseRailItem[];
  accent?: string;
  onCaseSelect?: (item: CaseRailItem, index: number) => void;
}

const defaultCases: CaseRailItem[] = [
  { client: "Fieldnote", title: "Rebuilding onboarding for a field research app", sector: "SaaS", metric: "+38%", metricLabel: "week-one activation", hue: 18, href: "#" },
  { client: "Brightwater", title: "A utility bill people actually understand", sector: "Energy", metric: "-52%", metricLabel: "billing support calls", hue: 196, href: "#" },
  { client: "Kestrel Air", title: "Rebooking a missed flight in under a minute", sector: "Travel", metric: "47s", metricLabel: "median rebooking time", hue: 228, href: "#" },
  { client: "Oakline", title: "From paper forms to a mortgage in nine screens", sector: "Fintech", metric: "3.1x", metricLabel: "completed applications", hue: 142, href: "#" },
  { client: "Parcel & Pine", title: "A storefront that sells furniture by the room", sector: "Retail", metric: "+24%", metricLabel: "average order value", hue: 34, href: "#" },
  { client: "Lumen Schools", title: "Report cards parents read to the end", sector: "Education", metric: "91%", metricLabel: "parent open rate", hue: 280, href: "#" },
];

const css = `
.hb-we2 {
  --hb-we2-accent: #ff5a1f;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f4f1ea;
  color: #141414;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}
.hb-we2 *, .hb-we2 *::before, .hb-we2 *::after { box-sizing: border-box; }
.hb-we2-inner { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(18px, 4cqi, 40px) 0; }
.hb-we2-top { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 20px; }
.hb-we2-eyebrow { margin: 0 0 14px; color: #6b665c; font-size: 13px; font-weight: 500; }
.hb-we2-title { margin: 0; max-width: 18ch; font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4.6cqi, 50px); font-weight: 600; line-height: 1.04; letter-spacing: -.035em; text-wrap: balance; }
.hb-we2-nav { display: flex; align-items: center; gap: 10px; }
.hb-we2-count { min-width: 64px; color: #6b665c; font-family: var(--font-mono, ui-monospace, monospace); font-size: 13px; font-variant-numeric: tabular-nums; }
.hb-we2-count b { color: #141414; font-weight: 600; }
.hb-we2-btn {
  width: 44px; height: 44px; border: 0; border-radius: 50%; display: grid; place-items: center; cursor: pointer;
  background: #fff; color: #141414; box-shadow: 0 1px 0 rgba(0,0,0,.04), 0 0 0 1px rgba(20,20,20,.1), 0 8px 20px -10px rgba(20,20,20,.3);
  transition: transform .25s cubic-bezier(.2,.8,.2,1), background .2s ease, color .2s ease, opacity .2s ease;
}
.hb-we2-btn:hover:not(:disabled) { background: #141414; color: #f4f1ea; transform: translateY(-1px); }
.hb-we2-btn:active:not(:disabled) { transform: scale(.94); }
.hb-we2-btn:disabled { opacity: .35; cursor: default; }
.hb-we2-btn:focus-visible { outline: 2px solid var(--hb-we2-accent); outline-offset: 3px; }
.hb-we2-btn svg { width: 16px; height: 16px; }
.hb-we2-chapters { position: relative; display: flex; gap: clamp(12px, 3cqi, 28px); margin-top: clamp(26px, 4cqi, 40px); padding-bottom: 12px; border-bottom: 1px solid rgba(20,20,20,.12); overflow-x: auto; scrollbar-width: none; }
.hb-we2-chapters::-webkit-scrollbar { display: none; }
.hb-we2-chap {
  flex: none; display: inline-flex; align-items: baseline; gap: 8px; padding: 0; border: 0; background: none; cursor: pointer;
  color: #8a857a; font: inherit; font-size: 13px; font-weight: 500; white-space: nowrap; transition: color .25s ease;
}
.hb-we2-chap span { font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; }
.hb-we2-chap[aria-current="true"] { color: #141414; }
.hb-we2-chap:hover { color: #141414; }
.hb-we2-chap:focus-visible { outline: 2px solid var(--hb-we2-accent); outline-offset: 4px; border-radius: 3px; }
.hb-we2-bar { position: absolute; left: 0; bottom: -1px; height: 2px; width: var(--hb-we2-w, 40px); background: var(--hb-we2-accent); transform: translateX(var(--hb-we2-l, 0px)); border-radius: 2px; }
.hb-we2-rail {
  position: relative; display: flex; gap: clamp(14px, 2cqi, 22px); overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; cursor: grab;
  padding: clamp(28px, 4cqi, 40px) max(clamp(18px, 4cqi, 40px), calc((100cqi - 1120px) / 2 + 40px)) clamp(56px, 8cqi, 104px);
  scroll-padding-inline: max(clamp(18px, 4cqi, 40px), calc((100cqi - 1120px) / 2 + 40px));
  outline: none;
}
.hb-we2-rail::-webkit-scrollbar { display: none; }
.hb-we2-rail[data-drag="true"] { cursor: grabbing; scroll-snap-type: none; user-select: none; }
.hb-we2-rail:focus-visible { box-shadow: inset 0 0 0 2px var(--hb-we2-accent); }
.hb-we2-card {
  flex: none; width: clamp(272px, 42cqi, 460px); scroll-snap-align: start; display: flex; flex-direction: column;
  border-radius: 22px; background: #fff; color: inherit; text-decoration: none; overflow: hidden;
  box-shadow: 0 0 0 1px rgba(20,20,20,.08), 0 1px 0 rgba(0,0,0,.03), 0 26px 50px -34px rgba(20,20,20,.45);
  transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s ease;
}
.hb-we2-card:hover { transform: translateY(-6px); box-shadow: 0 0 0 1px rgba(20,20,20,.1), 0 34px 60px -30px rgba(20,20,20,.5); }
.hb-we2-card:focus-visible { outline: 2px solid var(--hb-we2-accent); outline-offset: 4px; }
.hb-we2-art { position: relative; aspect-ratio: 16 / 11; overflow: hidden; background: hsl(var(--hb-we2-h) 50% 88%); }
.hb-we2-layer { position: absolute; inset: -8% -14%; transform: translateX(calc(var(--hb-we2-p, 0) * var(--hb-we2-d, 20px))); transition: transform .12s linear; }
.hb-we2-layer svg { width: 100%; height: 100%; display: block; }
.hb-we2-chip {
  position: absolute; left: 14px; top: 14px; height: 26px; padding: 0 11px; border-radius: 999px; background: rgba(255,255,255,.82);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #141414; font-size: 12px; font-weight: 500; line-height: 26px;
}
.hb-we2-body { display: grid; gap: 16px; padding: 20px 22px 22px; }
.hb-we2-client { display: flex; align-items: center; justify-content: space-between; color: #6b665c; font-size: 13px; font-weight: 500; }
.hb-we2-client svg { width: 16px; height: 16px; transition: transform .35s cubic-bezier(.2,.8,.2,1); }
.hb-we2-card:hover .hb-we2-client svg { transform: translate(3px, -3px); }
.hb-we2-ctitle { margin: 0; font-size: clamp(17px, 1.9cqi, 20px); font-weight: 600; line-height: 1.3; letter-spacing: -.015em; text-wrap: balance; }
.hb-we2-metric { display: flex; align-items: baseline; gap: 10px; padding-top: 14px; border-top: 1px dashed rgba(20,20,20,.14); }
.hb-we2-metric b { font-family: var(--font-grotesk, inherit); font-size: clamp(30px, 4cqi, 40px); font-weight: 600; letter-spacing: -.04em; color: hsl(var(--hb-we2-h) 70% 34%); }
.hb-we2-metric span { color: #6b665c; font-size: 13px; }
@media (prefers-reduced-motion: reduce) {
  .hb-we2 *, .hb-we2 *::before, .hb-we2 *::after { transition: none !important; animation: none !important; }
  .hb-we2-layer { transform: none; }
}
`;

function CaseArt({ item, index }: { item: CaseRailItem; index: number }) {
  const h = item.hue;
  const deep = `hsl(${h} 55% 30%)`;
  const mid = `hsl(${h} 70% 55%)`;
  const soft = `hsl(${h} 60% 76%)`;
  const kind = index % 3;
  return (
    <svg viewBox="0 0 520 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <circle cx="430" cy="60" r="120" fill={soft} />
      <circle cx="80" cy="320" r="90" fill={soft} opacity=".7" />
      {kind === 0 && (
        <g>
          <rect x="150" y="56" width="220" height="300" rx="30" fill="#141414" />
          <rect x="164" y="72" width="192" height="270" rx="20" fill="#fafaf7" />
          <rect x="184" y="100" width="90" height="10" rx="5" fill={deep} />
          <rect x="184" y="120" width="140" height="7" rx="3.5" fill="#d9d5cb" />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x="184" y={150 + k * 48} width="152" height="38" rx="10" fill={k === 0 ? mid : "#efece4"} />
              <circle cx="202" cy={169 + k * 48} r="7" fill={k === 0 ? "#fff" : soft} />
              <rect x="216" y={165 + k * 48} width={70 - k * 12} height="7" rx="3.5" fill={k === 0 ? "#fff" : "#bdb8ac"} />
            </g>
          ))}
        </g>
      )}
      {kind === 1 && (
        <g>
          <rect x="70" y="70" width="380" height="230" rx="18" fill="#fafaf7" stroke="rgba(0,0,0,.08)" />
          <rect x="70" y="70" width="380" height="34" rx="18" fill="#efece4" />
          <circle cx="92" cy="87" r="5" fill="#d9d5cb" />
          <circle cx="108" cy="87" r="5" fill="#d9d5cb" />
          {[0, 1, 2, 3, 4, 5, 6].map((k) => {
            const hgt = [60, 92, 74, 120, 102, 140, 128][k];
            return <rect key={k} x={104 + k * 46} y={270 - hgt} width="28" height={hgt} rx="6" fill={k === 5 ? mid : soft} />;
          })}
          <path d="M104 210 L150 186 L196 196 L242 150 L288 162 L334 120 L380 128" fill="none" stroke={deep} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {kind === 2 && (
        <g>
          <rect x="90" y="96" width="250" height="160" rx="18" fill={deep} />
          <rect x="112" y="122" width="44" height="32" rx="7" fill={soft} />
          <rect x="112" y="200" width="150" height="10" rx="5" fill="rgba(255,255,255,.55)" />
          <rect x="112" y="220" width="96" height="8" rx="4" fill="rgba(255,255,255,.3)" />
          <rect x="250" y="150" width="190" height="130" rx="18" fill="#fafaf7" stroke="rgba(0,0,0,.08)" />
          <circle cx="345" cy="205" r="34" fill="none" stroke="#e7e3da" strokeWidth="10" />
          <circle cx="345" cy="205" r="34" fill="none" stroke={mid} strokeWidth="10" strokeDasharray="160 214" strokeLinecap="round" transform="rotate(-90 345 205)" />
        </g>
      )}
    </svg>
  );
}

export function ShowcaseCaseRail({
  eyebrow = "Case studies",
  title = "Six problems, six measurable outcomes",
  cases = defaultCases,
  accent = "#ff5a1f",
  onCaseSelect,
  className,
  style,
  ...rest
}: ShowcaseCaseRailProps) {
  const railRef = React.useRef<HTMLDivElement | null>(null);
  const chapRef = React.useRef<HTMLDivElement | null>(null);
  const barRef = React.useRef<HTMLSpanElement | null>(null);
  const drag = React.useRef({ on: false, x: 0, left: 0, moved: false });
  const [index, setIndex] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [edges, setEdges] = React.useState({ start: true, end: false });

  const sync = React.useCallback(() => {
    const rail = railRef.current;
    const chaps = chapRef.current;
    const bar = barRef.current;
    if (!rail) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-hb-we2-card]"));
    if (!cards.length) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const f = max > 0 ? Math.max(0, Math.min(1, rail.scrollLeft / max)) * (cards.length - 1) : 0;
    const center = rail.scrollLeft + rail.clientWidth / 2;
    cards.forEach((c) => {
      const mid = c.offsetLeft + c.offsetWidth / 2;
      const p = Math.max(-1.5, Math.min(1.5, (mid - center) / rail.clientWidth));
      c.style.setProperty("--hb-we2-p", p.toFixed(3));
    });
    if (chaps && bar) {
      const btns = Array.from(chaps.querySelectorAll<HTMLElement>("[data-hb-we2-chap]"));
      const a = Math.floor(f);
      const b = Math.min(btns.length - 1, a + 1);
      const t = f - a;
      if (btns[a] && btns[b]) {
        const l = btns[a].offsetLeft + (btns[b].offsetLeft - btns[a].offsetLeft) * t;
        const w = btns[a].offsetWidth + (btns[b].offsetWidth - btns[a].offsetWidth) * t;
        bar.style.setProperty("--hb-we2-l", `${l.toFixed(1)}px`);
        bar.style.setProperty("--hb-we2-w", `${w.toFixed(1)}px`);
      }
    }
    const next = Math.round(f);
    setIndex((v) => (v === next ? v : next));
    const start = rail.scrollLeft < 4;
    const end = rail.scrollLeft > max - 4;
    setEdges((e) => (e.start === start && e.end === end ? e : { start, end }));
  }, []);

  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let raf = 0;
    const on = () => {
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        sync();
      });
    };
    on();
    rail.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      rail.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [sync]);

  const goTo = (i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = rail.querySelectorAll<HTMLElement>("[data-hb-we2-card]");
    const c = cards[Math.max(0, Math.min(cards.length - 1, i))];
    if (!c) return;
    const pad = parseFloat(getComputedStyle(rail).paddingLeft) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: c.offsetLeft - pad, behavior: reduce ? "auto" : "smooth" });
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const rail = railRef.current;
    if (!rail) return;
    drag.current = { on: true, x: e.clientX, left: rail.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const rail = railRef.current;
    if (!d.on || !rail) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      rail.setPointerCapture(e.pointerId);
    }
    if (d.moved) rail.scrollLeft = d.left - dx;
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    if (d.moved) {
      setDragging(false);
      const rail = railRef.current;
      if (rail && rail.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
      if (rail) {
        const max = rail.scrollWidth - rail.clientWidth;
        goTo(max > 0 ? Math.round((rail.scrollLeft / max) * (cases.length - 1)) : 0);
      }
    }
  };

  return (
    <section
      className={["hb-we2", className].filter(Boolean).join(" ")}
      style={{ "--hb-we2-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-showcase-case-rail" precedence="default">{css}</style>
      <div className="hb-we2-inner">
        <div className="hb-we2-top">
          <div>
            {eyebrow ? <p className="hb-we2-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-we2-title">{title}</h2>
          </div>
          <div className="hb-we2-nav">
            <span className="hb-we2-count" aria-live="polite">
              <b>{String(index + 1).padStart(2, "0")}</b> / {String(cases.length).padStart(2, "0")}
            </span>
            <button type="button" className="hb-we2-btn" aria-label="Previous case" disabled={edges.start} onClick={() => goTo(index - 1)}>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3m4-4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className="hb-we2-btn" aria-label="Next case" disabled={edges.end} onClick={() => goTo(index + 1)}>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
        <div ref={chapRef} className="hb-we2-chapters" role="group" aria-label="Jump to a case">
          {cases.map((c, i) => (
            <button key={c.client} type="button" data-hb-we2-chap="" className="hb-we2-chap" aria-current={index === i ? "true" : undefined} onClick={() => goTo(i)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {c.client}
            </button>
          ))}
          <span ref={barRef} className="hb-we2-bar" aria-hidden="true" />
        </div>
      </div>
      <div
        ref={railRef}
        className="hb-we2-rail"
        data-drag={dragging ? "true" : "false"}
        tabIndex={0}
        role="region"
        aria-label="Case studies, scroll horizontally"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(index + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(index - 1);
          }
        }}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
      >
        {cases.map((c, i) => (
          <a
            key={c.client}
            data-hb-we2-card=""
            className="hb-we2-card"
            href={c.href}
            draggable={false}
            style={{ "--hb-we2-h": c.hue } as React.CSSProperties}
            onClick={() => onCaseSelect?.(c, i)}
          >
            <div className="hb-we2-art">
              <div className="hb-we2-layer" style={{ "--hb-we2-d": "-40px" } as React.CSSProperties}>
                <CaseArt item={c} index={i} />
              </div>
              <span className="hb-we2-chip">{c.sector}</span>
            </div>
            <div className="hb-we2-body">
              <div className="hb-we2-client">
                <span>{c.client}</span>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 11l6-6M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h3 className="hb-we2-ctitle">{c.title}</h3>
              <div className="hb-we2-metric">
                <b>{c.metric}</b>
                <span>{c.metricLabel}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
