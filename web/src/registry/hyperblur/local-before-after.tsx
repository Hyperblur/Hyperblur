"use client";

import * as React from "react";

export interface LocalBeforeAfterStat {
  value: string;
  label: string;
}

export interface LocalBeforeAfterProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  beforeLabel?: string;
  afterLabel?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  stats?: LocalBeforeAfterStat[];
  cta?: { label: string; href: string };
  accent?: string;
}

const defaultStats: LocalBeforeAfterStat[] = [
  { value: "6 weeks", label: "From demo to dinner party" },
  { value: "+40%", label: "More storage, same footprint" },
  { value: "$38,400", label: "Final cost, on budget" },
  { value: "4.9", label: "Average from 212 homeowners" },
];

const css = `
.hb-kl7 {
  --hb-kl7-accent: #d9a35b;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #121110;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kl7 *, .hb-kl7 *::before, .hb-kl7 *::after { box-sizing: border-box; }
.hb-kl7-wrap { max-width: 1120px; margin: 0 auto; padding: 88px 24px 96px; }
.hb-kl7-head { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); gap: 32px; align-items: end; margin-bottom: 36px; }
.hb-kl7-eyebrow { margin: 0 0 14px; color: var(--hb-kl7-accent); font-size: 12.5px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; }
.hb-kl7-title { margin: 0; font-family: var(--font-serif, Georgia, serif); font-weight: 400; font-size: clamp(38px, 5.4cqw, 62px); line-height: 1; letter-spacing: -.02em; color: #f4efe7; text-wrap: balance; }
.hb-kl7-side { color: #a39d93; font-size: 16px; line-height: 1.6; }
.hb-kl7-side p { margin: 0 0 18px; }
.hb-kl7-cta { display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; border-radius: 999px; background: #f4efe7; color: #121110; font-size: 14.5px; font-weight: 600; text-decoration: none; transition: background .2s, transform .2s; }
.hb-kl7-cta:hover { background: var(--hb-kl7-accent); transform: translateY(-1px); }
.hb-kl7-cta:focus-visible { outline: 2px solid var(--hb-kl7-accent); outline-offset: 3px; }
.hb-kl7-stage { position: relative; aspect-ratio: 16 / 8.2; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,.08); background: #1b1a18; user-select: none; touch-action: pan-y; cursor: ew-resize; box-shadow: 0 40px 80px -40px rgba(0,0,0,.8); }
.hb-kl7-layer { position: absolute; inset: 0; }
.hb-kl7-layer > svg { width: 100%; height: 100%; display: block; }
.hb-kl7-after { clip-path: inset(0 0 0 var(--hb-kl7-pos)); }
.hb-kl7-chip { position: absolute; top: 16px; padding: 7px 12px; border-radius: 999px; background: rgba(18, 17, 16, .72); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.12); color: #f4efe7; font-size: 12.5px; font-weight: 500; white-space: nowrap; pointer-events: none; transition: opacity .3s; }
.hb-kl7-chip b { color: var(--hb-kl7-accent); font-weight: 600; margin-right: 6px; }
.hb-kl7-chip-l { left: 16px; }
.hb-kl7-chip-r { right: 16px; }
.hb-kl7-line { position: absolute; top: 0; bottom: 0; left: var(--hb-kl7-pos); width: 2px; margin-left: -1px; background: #f4efe7; box-shadow: 0 0 20px rgba(0,0,0,.5); pointer-events: none; }
.hb-kl7-handle { position: absolute; top: 50%; left: var(--hb-kl7-pos); width: 52px; height: 52px; margin: -26px 0 0 -26px; display: grid; place-items: center; border: 0; border-radius: 50%; background: #f4efe7; color: #121110; cursor: ew-resize; box-shadow: 0 10px 30px rgba(0,0,0,.45); padding: 0; }
.hb-kl7-handle::before { content: ""; position: absolute; inset: -6px; border-radius: 50%; border: 2px solid rgba(244, 239, 231, .6); animation: hb-kl7-ring 2.2s ease-out infinite; }
@keyframes hb-kl7-ring { 0% { transform: scale(.85); opacity: 1; } 100% { transform: scale(1.35); opacity: 0; } }
.hb-kl7-handle:focus-visible { outline: 3px solid var(--hb-kl7-accent); outline-offset: 4px; }
.hb-kl7-handle svg { animation: hb-kl7-nudge 2.2s ease-in-out infinite; }
@keyframes hb-kl7-nudge { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-2px); } 75% { transform: translateX(2px); } }
.hb-kl7-stage[data-moved] .hb-kl7-handle::before, .hb-kl7-stage[data-moved] .hb-kl7-handle svg { animation: none; }
.hb-kl7-stats { margin: 16px 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1px; border-radius: 18px; overflow: hidden; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.08); }
.hb-kl7-stat { min-width: 0; padding: 20px 22px; background: #161513; animation: hb-kl7-in .6s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--hb-kl7-i) * 90ms + .2s); }
@keyframes hb-kl7-in { from { opacity: 0; transform: translateY(10px); } }
.hb-kl7-stat b { display: block; font-family: var(--font-serif, Georgia, serif); font-weight: 400; font-size: 32px; line-height: 1; color: #f4efe7; }
.hb-kl7-stat span { display: block; margin-top: 8px; color: #8f8a82; font-size: 13.5px; line-height: 1.4; }
@container (max-width: 820px) {
  .hb-kl7-head { grid-template-columns: minmax(0, 1fr); }
  .hb-kl7-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-kl7-stage { aspect-ratio: 4 / 3; }
  .hb-kl7-wrap { padding: 64px 20px 72px; }
}
@container (max-width: 400px) {
  .hb-kl7-chip { font-size: 11.5px; padding: 6px 10px; top: 10px; }
  .hb-kl7-chip-l { left: 10px; }
  .hb-kl7-chip-r { right: 10px; }
  .hb-kl7-stat { padding: 16px; }
  .hb-kl7-stat b { font-size: 26px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kl7 *, .hb-kl7 *::before, .hb-kl7 *::after { animation: none !important; transition: none !important; }
}
`;

function BeforeKitchen() {
  return (
    <svg viewBox="0 0 800 410" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="410" fill="#cdbf9f" />
      <g opacity=".35" stroke="#a8996f" strokeWidth="1">
        {Array.from({ length: 21 }, (_, i) => <path key={i} d={`M${i * 40} 0 V 260`} />)}
      </g>
      <rect x="0" y="0" width="800" height="18" fill="#b9ab88" />
      <rect x="300" y="18" width="200" height="10" rx="3" fill="#efeee2" />
      <rect x="310" y="28" width="180" height="6" fill="#fffde8" opacity=".8" />
      <rect x="60" y="50" width="260" height="110" fill="#7a5532" stroke="#5e3f22" strokeWidth="3" />
      {[0, 1, 2].map((i) => <rect key={i} x={70 + i * 84} y="60" width="74" height="90" fill="#8a6239" stroke="#5e3f22" strokeWidth="2" />)}
      <rect x="480" y="50" width="260" height="110" fill="#7a5532" stroke="#5e3f22" strokeWidth="3" />
      {[0, 1, 2].map((i) => <rect key={i} x={490 + i * 84} y="60" width="74" height="90" fill="#8a6239" stroke="#5e3f22" strokeWidth="2" />)}
      <rect x="340" y="56" width="120" height="100" fill="#b9d3d6" stroke="#efeee2" strokeWidth="8" />
      <path d="M400 56 V 156 M340 106 H 460" stroke="#efeee2" strokeWidth="5" />
      <rect x="0" y="240" width="800" height="18" fill="#d8c79a" />
      <g opacity=".5">{Array.from({ length: 20 }, (_, i) => <rect key={i} x={i * 40} y="160" width="40" height="80" fill="none" stroke="#e8dcc0" strokeWidth="1.5" />)}</g>
      <rect x="0" y="258" width="800" height="152" fill="#6d4a2b" />
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x={20 + i * 130} y="272" width="116" height="120" fill="#7a5532" stroke="#5e3f22" strokeWidth="3" />
          <circle cx={i % 2 ? 40 + i * 130 : 116 + i * 130} cy="332" r="5" fill="#c9a86a" />
        </g>
      ))}
      <rect x="150" y="214" width="34" height="28" rx="4" fill="#e9e3cf" />
      <rect x="560" y="200" width="60" height="42" rx="6" fill="#bfbfb4" />
      <rect x="566" y="206" width="38" height="28" fill="#55574f" />
      <circle cx="230" cy="232" r="10" fill="#a0442c" />
      <rect x="650" y="220" width="20" height="22" fill="#d9d3be" />
      <rect x="0" y="392" width="800" height="18" fill="#a59673" />
      <rect width="800" height="410" fill="#e8d27a" opacity=".12" />
    </svg>
  );
}

function AfterKitchen({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 410" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="hb-kl7-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2eee6" />
          <stop offset="100%" stopColor="#e4ddd0" />
        </linearGradient>
        <radialGradient id="hb-kl7-lamp" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#ffe2b0" stopOpacity=".7" />
          <stop offset="100%" stopColor="#ffe2b0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="410" fill="url(#hb-kl7-wall)" />
      <rect x="250" y="40" width="300" height="140" rx="4" fill="#bcd2cf" />
      <rect x="250" y="40" width="300" height="140" rx="4" fill="none" stroke="#1f2a26" strokeWidth="6" />
      <path d="M400 40 V 180" stroke="#1f2a26" strokeWidth="4" />
      <path d="M270 160 C 300 120, 330 150, 360 110 S 420 120, 440 90 S 510 110, 530 80 L 530 175 L 270 175 Z" fill="#9db8ad" opacity=".6" />
      <rect x="40" y="40" width="180" height="160" rx="3" fill="#2f4a3e" />
      <rect x="580" y="40" width="180" height="160" rx="3" fill="#2f4a3e" />
      {[40, 130, 580, 670].map((x) => <rect key={x} x={x + 8} y="48" width="74" height="144" rx="2" fill="#35554a" />)}
      {[118, 132, 658, 672].map((x) => <rect key={x} x={x - 1} y="110" width="2" height="28" rx="1" fill={accent} />)}
      <rect x="0" y="200" width="800" height="50" fill="#f7f4ee" />
      <g stroke="#e3ddd2" strokeWidth="1">{Array.from({ length: 27 }, (_, i) => <path key={i} d={`M${i * 30} 200 V 250`} />)}<path d="M0 225 H 800" /></g>
      {[240, 400, 560].map((x) => (
        <g key={x}>
          <path d={`M${x} 0 V 54`} stroke="#1f2a26" strokeWidth="2" />
          <path d={`M${x - 22} 74 Q ${x} 46 ${x + 22} 74 Z`} fill={accent} />
          <ellipse cx={x} cy="150" rx="90" ry="110" fill="url(#hb-kl7-lamp)" />
        </g>
      ))}
      <rect x="0" y="246" width="800" height="14" fill="#d8c4a2" />
      <rect x="0" y="260" width="800" height="150" fill="#2f4a3e" />
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <rect x={16 + i * 156} y="272" width="146" height="126" rx="3" fill="#35554a" />
          <rect x={60 + i * 156} y="282" width="58" height="3" rx="1.5" fill={accent} />
        </g>
      ))}
      <path d="M520 246 Q 524 214 548 214 Q 572 214 572 236" stroke="#c9c2b4" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="170" cy="236" rx="30" ry="10" fill="#e9e1d1" />
      <path d="M150 236 Q 170 206 190 236" fill="#7a9a5b" />
      <rect x="650" y="206" width="16" height="40" rx="3" fill="#c9b08a" />
      <rect x="672" y="214" width="14" height="32" rx="3" fill="#8a9a8f" />
      <rect x="0" y="398" width="800" height="12" fill="#c7b08c" />
    </svg>
  );
}

export function LocalBeforeAfter({
  eyebrow = "Hollis & Co. Renovation",
  title = "Same kitchen. Whole new morning.",
  subtitle = "A 1987 galley kitchen in Cobble Hill, opened up with sage cabinetry, white oak and three warm pendants. Drag to compare.",
  beforeLabel = "1987 original",
  afterLabel = "Six weeks later",
  before,
  after,
  value,
  defaultValue = 46,
  onChange,
  stats = defaultStats,
  cta = { label: "Book a free home visit", href: "#visit" },
  accent = "#d9a35b",
  className,
  style,
  ...rest
}: LocalBeforeAfterProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [moved, setMoved] = React.useState(false);
  const pos = Math.min(100, Math.max(0, value ?? inner));
  const stageRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const update = (next: number) => {
    const v = Math.round(Math.min(100, Math.max(0, next)) * 10) / 10;
    if (value === undefined) setInner(v);
    setMoved(true);
    onChange?.(v);
  };

  const fromPointer = (clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    update(((clientX - rect.left) / rect.width) * 100);
  };

  const onKey = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 2;
    let next: number | null = null;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = pos - step;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next = pos + step;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 100;
    if (event.key === "PageDown") next = pos - 10;
    if (event.key === "PageUp") next = pos + 10;
    if (next === null) return;
    event.preventDefault();
    update(next);
  };

  return (
    <section
      className={["hb-kl7", className].filter(Boolean).join(" ")}
      style={{ "--hb-kl7-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-local-before-after" precedence="default">{css}</style>
      <div className="hb-kl7-wrap">
        <div className="hb-kl7-head">
          <div>
            <p className="hb-kl7-eyebrow">{eyebrow}</p>
            <h2 className="hb-kl7-title">{title}</h2>
          </div>
          <div className="hb-kl7-side">
            <p>{subtitle}</p>
            {cta ? (
              <a className="hb-kl7-cta" href={cta.href}>
                {cta.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ) : null}
          </div>
        </div>
        <div
          ref={stageRef}
          className="hb-kl7-stage"
          data-moved={moved ? "" : undefined}
          style={{ "--hb-kl7-pos": `${pos.toFixed(1)}%` } as React.CSSProperties}
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            fromPointer(e.clientX);
          }}
          onPointerMove={(e) => { if (dragging.current) fromPointer(e.clientX); }}
          onPointerUp={() => { dragging.current = false; }}
          onPointerCancel={() => { dragging.current = false; }}
        >
          <div className="hb-kl7-layer">{before ?? <BeforeKitchen />}</div>
          <div className="hb-kl7-layer hb-kl7-after">{after ?? <AfterKitchen accent={accent} />}</div>
          <span className="hb-kl7-chip hb-kl7-chip-l" style={{ opacity: pos < 18 ? 0 : 1 }}><b>Before</b>{beforeLabel}</span>
          <span className="hb-kl7-chip hb-kl7-chip-r" style={{ opacity: pos > 82 ? 0 : 1 }}><b>After</b>{afterLabel}</span>
          <span className="hb-kl7-line" aria-hidden="true" />
          <button
            type="button"
            className="hb-kl7-handle"
            role="slider"
            aria-label="Compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
            onKeyDown={onKey}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {stats.length ? (
          <ul className="hb-kl7-stats">
            {stats.map((s, i) => (
              <li key={s.label} className="hb-kl7-stat" style={{ "--hb-kl7-i": i } as React.CSSProperties}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
