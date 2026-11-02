"use client";

import * as React from "react";

export interface ComparisonSliderStage {
  label: string;
  before: { start: number; wait?: number; length: number };
  after: { start: number; length: number };
}

export interface ComparisonSliderSide {
  label: string;
  caption: string;
  total: string;
}

export interface ComparisonSliderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  windowTitle?: string;
  span?: number;
  stages?: ComparisonSliderStage[];
  before?: ComparisonSliderSide;
  after?: ComparisonSliderSide;
  highlight?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (position: number) => void;
  accent?: string;
}

const defaultStages: ComparisonSliderStage[] = [
  { label: "Code freeze", before: { start: 0, length: 2 }, after: { start: 0, length: 0.3 } },
  { label: "Regression tests", before: { start: 2, wait: 1, length: 5 }, after: { start: 0.3, length: 0.6 } },
  { label: "Security review", before: { start: 8, wait: 2, length: 3 }, after: { start: 0.4, length: 0.6 } },
  { label: "Staging soak", before: { start: 13, length: 3 }, after: { start: 1, length: 0.8 } },
  { label: "Release notes", before: { start: 14, wait: 1, length: 2 }, after: { start: 1.3, length: 0.4 } },
  { label: "Rollout", before: { start: 17, wait: 0.5, length: 2.5 }, after: { start: 1.8, length: 0.7 } },
];

const defaultBefore: ComparisonSliderSide = { label: "Before", caption: "Manual QA and handoffs", total: "19.5 days, 4 handoffs" };
const defaultAfter: ComparisonSliderSide = { label: "After", caption: "Automated with Pipeline", total: "2.5 days, zero handoffs" };

const css = `
.hb-kc7 {
  --hb-kc7-accent: #6d5dfc;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #f7f5ef;
  color: #151515;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kc7 *, .hb-kc7 *::before, .hb-kc7 *::after { box-sizing: border-box; }
.hb-kc7-inner { max-width: 1120px; margin: 0 auto; padding: 72px 18px 64px; }
.hb-kc7-head { display: grid; gap: 14px; margin-bottom: 32px; }
.hb-kc7-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0; color: var(--hb-kc7-accent); font-size: 13px; font-weight: 650; }
.hb-kc7-eyebrow svg { width: 14px; height: 14px; }
.hb-kc7-title { margin: 0; max-width: 600px; font-size: clamp(30px, 5cqi, 48px); font-weight: 700; line-height: 1.04; letter-spacing: -.04em; text-wrap: balance; }
.hb-kc7-sub { margin: 0; max-width: 430px; color: #5c5a54; font-size: 16px; line-height: 1.6; text-wrap: pretty; }
.hb-kc7-frame {
  overflow: hidden;
  border: 1px solid rgba(21, 21, 21, .1);
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(21, 21, 21, .04), 0 30px 70px -36px rgba(21, 21, 21, .35);
}
.hb-kc7-bar { display: flex; align-items: center; gap: 12px; height: 44px; padding: 0 16px; border-bottom: 1px solid rgba(21, 21, 21, .08); background: #fbfaf7; }
.hb-kc7-dots { display: flex; gap: 6px; }
.hb-kc7-dots i { width: 10px; height: 10px; border-radius: 50%; background: #e3e0d8; }
.hb-kc7-wtitle { color: #6b6962; font-size: 12.5px; font-weight: 550; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-kc7-compare {
  position: relative;
  display: grid;
  cursor: ew-resize;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}
.hb-kc7-layer { grid-area: 1 / 1; padding: 50px 14px 16px; }
.hb-kc7-layer[data-k="before"] { background: #f3f1ea; }
.hb-kc7-layer[data-k="after"] { background: #fff; clip-path: inset(0 0 0 var(--hb-kc7-pos)); }
.hb-kc7-row { display: grid; grid-template-columns: 92px minmax(0, 1fr); align-items: center; gap: 10px; }
.hb-kc7-axis { height: 30px; }
.hb-kc7-ticks { position: relative; height: 100%; }
.hb-kc7-ticks span { position: absolute; top: 6px; color: #9a978f; font-size: 10.5px; font-weight: 550; transform: translateX(-50%); white-space: nowrap; }
.hb-kc7-ticks span:first-child { transform: none; }
.hb-kc7-ticks span:last-child { transform: translateX(-100%); }
.hb-kc7-name { overflow: hidden; color: #3b3a36; font-size: 12px; font-weight: 550; white-space: nowrap; text-overflow: ellipsis; }
.hb-kc7-track {
  position: relative;
  height: 38px;
  border-top: 1px solid rgba(21, 21, 21, .06);
  background-image: linear-gradient(90deg, rgba(21, 21, 21, .06) 1px, transparent 1px);
  background-size: calc(100% / var(--hb-kc7-cols)) 100%;
}
.hb-kc7-seg { position: absolute; top: 10px; height: 18px; min-width: 8px; border-radius: 6px; }
.hb-kc7-layer[data-k="before"] .hb-kc7-seg[data-t="wait"] {
  border-radius: 6px 0 0 6px;
  background: repeating-linear-gradient(135deg, rgba(196, 78, 60, .28) 0 3px, transparent 3px 7px);
  box-shadow: inset 0 0 0 1px rgba(196, 78, 60, .25);
}
.hb-kc7-layer[data-k="before"] .hb-kc7-seg[data-t="work"] { background: #b9b5aa; }
.hb-kc7-layer[data-k="before"] .hb-kc7-seg[data-t="work"][data-joined="true"] { border-radius: 0 6px 6px 0; }
.hb-kc7-layer[data-k="after"] .hb-kc7-seg {
  background: linear-gradient(90deg, var(--hb-kc7-accent), color-mix(in srgb, var(--hb-kc7-accent) 60%, #fff));
  box-shadow: 0 4px 12px -4px color-mix(in srgb, var(--hb-kc7-accent) 80%, transparent);
}
.hb-kc7-total { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 4px 12px; margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(21, 21, 21, .08); font-size: 12.5px; }
.hb-kc7-total span { color: #6b6962; }
.hb-kc7-total b { font-size: 14px; font-weight: 700; letter-spacing: -.01em; }
.hb-kc7-layer[data-k="before"] .hb-kc7-total b { color: #9c3d2e; }
.hb-kc7-layer[data-k="after"] .hb-kc7-total b { color: var(--hb-kc7-accent); }
.hb-kc7-hl {
  position: absolute;
  right: 18px;
  top: 50%;
  max-width: 46%;
  color: var(--hb-kc7-accent);
  font-size: clamp(22px, 4cqi, 40px);
  font-weight: 750;
  line-height: 1;
  letter-spacing: -.04em;
  text-align: right;
  transform: translateY(-60%);
  pointer-events: none;
}
.hb-kc7-hl small { display: block; margin-top: 8px; color: #8a877f; font-size: 13px; font-weight: 550; letter-spacing: 0; }
.hb-kc7-label {
  position: absolute;
  top: 12px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 650;
  white-space: nowrap;
  transition: opacity .25s ease;
  pointer-events: none;
}
.hb-kc7-label[data-k="before"] { left: 12px; background: rgba(21, 21, 21, .78); color: #fff; }
.hb-kc7-label[data-k="after"] { right: 12px; background: var(--hb-kc7-accent); color: #fff; box-shadow: 0 6px 16px -6px var(--hb-kc7-accent); }
.hb-kc7-label[data-hidden="true"] { opacity: 0; }
.hb-kc7-label em { display: none; font-style: normal; font-weight: 500; opacity: .75; }
.hb-kc7-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--hb-kc7-pos);
  z-index: 3;
  width: 2px;
  margin-left: -1px;
  background: var(--hb-kc7-accent);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .8), 0 0 18px color-mix(in srgb, var(--hb-kc7-accent) 60%, transparent);
  pointer-events: none;
}
.hb-kc7-handle {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: var(--hb-kc7-accent);
  box-shadow: 0 0 0 2px var(--hb-kc7-accent), 0 8px 20px -6px rgba(21, 21, 21, .45);
  transform: translate(-50%, -50%);
  cursor: ew-resize;
  pointer-events: auto;
  transition: transform .2s cubic-bezier(.3, 1.5, .5, 1), box-shadow .2s ease;
}
.hb-kc7-handle:hover, .hb-kc7-compare[data-drag="true"] .hb-kc7-handle { transform: translate(-50%, -50%) scale(1.1); }
.hb-kc7-handle:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--hb-kc7-accent), 0 0 0 6px color-mix(in srgb, var(--hb-kc7-accent) 30%, transparent), 0 8px 20px -6px rgba(21, 21, 21, .45); }
.hb-kc7-handle svg { width: 20px; height: 20px; }
.hb-kc7-compare[data-touched="false"] .hb-kc7-handle svg { animation: hb-kc7-nudge 1.8s ease-in-out infinite; }
.hb-kc7-legend { display: flex; flex-wrap: wrap; gap: 8px 18px; margin: 16px 2px 0; color: #6b6962; font-size: 12.5px; }
.hb-kc7-legend span { display: inline-flex; align-items: center; gap: 8px; }
.hb-kc7-legend i { width: 18px; height: 8px; border-radius: 3px; }
@keyframes hb-kc7-nudge {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}
@container (min-width: 720px) {
  .hb-kc7-inner { padding: 104px 32px 96px; }
  .hb-kc7-head { grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); align-items: end; gap: 40px; margin-bottom: 44px; }
  .hb-kc7-layer { padding: 62px 28px 20px; }
  .hb-kc7-row { grid-template-columns: 150px minmax(0, 1fr); gap: 18px; }
  .hb-kc7-name { font-size: 13.5px; }
  .hb-kc7-track { height: 46px; }
  .hb-kc7-seg { top: 13px; height: 20px; }
  .hb-kc7-label { top: 18px; height: 28px; font-size: 12px; }
  .hb-kc7-label em { display: inline; }
  .hb-kc7-label[data-k="before"] { left: 20px; }
  .hb-kc7-label[data-k="after"] { right: 20px; }
  .hb-kc7-total { font-size: 13.5px; }
  .hb-kc7-hl { right: 32px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kc7-handle, .hb-kc7-label { transition: none; }
  .hb-kc7-compare[data-touched="false"] .hb-kc7-handle svg { animation: none; }
}
`;

function pct(n: number, span: number) {
  return `${((n / span) * 100).toFixed(3)}%`;
}

function Layer({ kind, stages, span, side, ticks, highlight }: {
  kind: "before" | "after";
  stages: ComparisonSliderStage[];
  span: number;
  side: ComparisonSliderSide;
  ticks: number[];
  highlight?: string;
}) {
  return (
    <div className="hb-kc7-layer" data-k={kind} aria-hidden={kind === "after" ? undefined : true}>
      <div className="hb-kc7-row hb-kc7-axis">
        <span />
        <div className="hb-kc7-ticks">
          {ticks.map((t) => (
            <span key={t} style={{ left: pct(t, span) }}>{`Day ${t}`}</span>
          ))}
        </div>
      </div>
      {stages.map((s) => (
        <div key={s.label} className="hb-kc7-row">
          <span className="hb-kc7-name">{s.label}</span>
          <div className="hb-kc7-track">
            {kind === "before" ? (
              <>
                {s.before.wait ? (
                  <span className="hb-kc7-seg" data-t="wait" style={{ left: pct(s.before.start, span), width: pct(s.before.wait, span) }} />
                ) : null}
                <span
                  className="hb-kc7-seg"
                  data-t="work"
                  data-joined={s.before.wait ? "true" : "false"}
                  style={{ left: pct(s.before.start + (s.before.wait ?? 0), span), width: pct(s.before.length, span) }}
                />
              </>
            ) : (
              <span className="hb-kc7-seg" data-t="work" style={{ left: pct(s.after.start, span), width: pct(s.after.length, span) }} />
            )}
          </div>
        </div>
      ))}
      <div className="hb-kc7-total">
        <span>{side.caption}</span>
        <b>{side.total}</b>
      </div>
      {kind === "after" && highlight ? (
        <div className="hb-kc7-hl">
          {highlight}
          <small>{side.total}</small>
        </div>
      ) : null}
    </div>
  );
}

export function ComparisonSlider({
  eyebrow = "Release timeline",
  title = "Drag to see three weeks become two days",
  subtitle = "The same six release stages for a mobile banking app, before and after Pipeline took over the waiting.",
  windowTitle = "Release plan, Ledger iOS 4.2",
  span = 20,
  stages = defaultStages,
  before = defaultBefore,
  after = defaultAfter,
  highlight = "17 days back",
  value,
  defaultValue = 52,
  onChange,
  accent = "#6d5dfc",
  className = "",
  style,
  ...rest
}: ComparisonSliderProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [drag, setDrag] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const area = React.useRef<HTMLDivElement>(null);
  const pos = Math.min(100, Math.max(0, value ?? inner));

  const set = (next: number) => {
    const clamped = Math.min(100, Math.max(0, next));
    setTouched(true);
    if (value === undefined) setInner(clamped);
    onChange?.(clamped);
  };

  const fromPointer = (clientX: number) => {
    const el = area.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    set(((clientX - r.left) / Math.max(1, r.width)) * 100);
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 10 : 2;
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = pos - step;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = pos + step;
    if (e.key === "PageDown") next = pos - 10;
    if (e.key === "PageUp") next = pos + 10;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    set(next);
  };

  const ticks = [0, Math.round(span / 4), Math.round(span / 2), Math.round((span * 3) / 4), span];
  const vars = {
    "--hb-kc7-accent": accent,
    "--hb-kc7-pos": `${pos.toFixed(2)}%`,
    "--hb-kc7-cols": String(Math.max(1, Math.round(span / 2))),
    ...style,
  } as React.CSSProperties;

  return (
    <section className={`hb-kc7 ${className}`} style={vars} {...rest}>
      <style href="hb-comparison-slider" precedence="default">{css}</style>
      <div className="hb-kc7-inner">
        <div className="hb-kc7-head">
          <div>
            {eyebrow ? (
              <p className="hb-kc7-eyebrow">
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M1.5 7h11M4.5 4l-3 3 3 3M9.5 4l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {eyebrow}
              </p>
            ) : null}
            <h2 className="hb-kc7-title" style={{ marginTop: eyebrow ? 14 : 0 }}>{title}</h2>
          </div>
          {subtitle ? <p className="hb-kc7-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-kc7-frame">
          <div className="hb-kc7-bar">
            <span className="hb-kc7-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="hb-kc7-wtitle">{windowTitle}</span>
          </div>
          <div
            ref={area}
            className="hb-kc7-compare"
            data-drag={drag ? "true" : "false"}
            data-touched={touched ? "true" : "false"}
            onPointerDown={(e) => {
              if (e.button !== 0) return;
              e.currentTarget.setPointerCapture(e.pointerId);
              setDrag(true);
              fromPointer(e.clientX);
            }}
            onPointerMove={(e) => {
              if (drag) fromPointer(e.clientX);
            }}
            onPointerUp={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
              setDrag(false);
            }}
            onPointerCancel={() => setDrag(false)}
          >
            <Layer kind="before" stages={stages} span={span} side={before} ticks={ticks} />
            <Layer kind="after" stages={stages} span={span} side={after} ticks={ticks} highlight={highlight} />
            <span className="hb-kc7-label" data-k="before" data-hidden={pos < 22 ? "true" : "false"}>
              {before.label}
              <em>{before.caption}</em>
            </span>
            <span className="hb-kc7-label" data-k="after" data-hidden={pos > 78 ? "true" : "false"}>
              {after.label}
              <em>{after.caption}</em>
            </span>
            <div className="hb-kc7-divider">
              <button
                type="button"
                className="hb-kc7-handle"
                role="slider"
                aria-label={`Compare ${before.label.toLowerCase()} and ${after.label.toLowerCase()}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                aria-valuetext={`${Math.round(pos)}% ${before.label}, ${100 - Math.round(pos)}% ${after.label}`}
                onKeyDown={onKey}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M7.5 5.5L3 10l4.5 4.5M12.5 5.5L17 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="hb-kc7-legend" aria-hidden="true">
          <span>
            <i style={{ background: "repeating-linear-gradient(135deg, rgba(196, 78, 60, .35) 0 3px, transparent 3px 7px)", boxShadow: "inset 0 0 0 1px rgba(196, 78, 60, .3)" }} />
            Waiting on someone
          </span>
          <span>
            <i style={{ background: "#b9b5aa" }} />
            Manual work
          </span>
          <span>
            <i style={{ background: accent }} />
            Automated
          </span>
        </div>
      </div>
    </section>
  );
}
