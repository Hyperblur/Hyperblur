"use client";

import * as React from "react";

export interface VersusRow {
  label: string;
  unit?: string;
  prefix?: string;
  lowerIsBetter?: boolean;
  values: [number, number][];
}

export interface StatsVersusProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  them?: string;
  us?: string;
  scenarios?: string[];
  rows?: VersusRow[];
  defaultScenario?: number;
  footnote?: string;
  accent?: string;
  onScenarioChange?: (index: number) => void;
}

const css = `
.hb-wb9 {
  --hb-wb9-accent: #7c3aed;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  container-type: inline-size;
  background: #ffffff;
  color: #0f0f10;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wb9 *, .hb-wb9 *::before, .hb-wb9 *::after { box-sizing: border-box; }
.hb-wb9-wrap { max-width: 1040px; margin: 0 auto; padding: 80px 24px 88px; }
.hb-wb9-head { text-align: center; max-width: 640px; margin: 0 auto 32px; }
.hb-wb9-eyebrow { margin: 0 0 14px; color: var(--hb-wb9-accent); font-size: 13px; font-weight: 600; }
.hb-wb9-title { margin: 0; font-size: clamp(28px, 4cqw, 44px); font-weight: 600; line-height: 1.05; letter-spacing: -.04em; text-wrap: balance; }
.hb-wb9-sub { margin: 14px 0 0; color: #6b6b70; font-size: 15.5px; line-height: 1.6; }
.hb-wb9-bar-top { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; gap: 16px; margin-bottom: 18px; }
.hb-wb9-side { display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; }
.hb-wb9-side:first-child { justify-self: end; color: #6b6b70; }
.hb-wb9-side:last-child { justify-self: start; }
.hb-wb9-side i { width: 10px; height: 10px; border-radius: 3px; background: #d4d4d8; }
.hb-wb9-side:last-child i { background: var(--hb-wb9-accent); }
.hb-wb9-seg { position: relative; display: inline-flex; padding: 3px; border-radius: 999px; background: #f2f2f4; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .04); }
.hb-wb9-seg button { position: relative; z-index: 1; padding: 7px 14px; border: 0; border-radius: 999px; background: transparent; color: #6b6b70; font: inherit; font-size: 12.5px; font-weight: 500; white-space: nowrap; cursor: pointer; transition: color .25s ease; }
.hb-wb9-seg button[aria-pressed="true"] { color: #0f0f10; }
.hb-wb9-seg button:focus-visible { outline: 2px solid var(--hb-wb9-accent); outline-offset: 2px; }
.hb-wb9-pill { position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc((100% - 6px) / var(--hb-wb9-n)); border-radius: 999px; background: #fff; box-shadow: 0 1px 2px rgba(0, 0, 0, .08), 0 4px 10px -4px rgba(0, 0, 0, .12); transform: translateX(calc(var(--hb-wb9-s) * 100%)); transition: transform .45s cubic-bezier(.2, .8, .2, 1); }
.hb-wb9-rows { position: relative; margin: 0; padding: 0; list-style: none; }
.hb-wb9-rows::before { content: ""; position: absolute; left: 50%; top: -6px; bottom: -6px; width: 1px; background: linear-gradient(180deg, transparent, #e4e4e7 10%, #e4e4e7 90%, transparent); }
.hb-wb9-row { display: grid; grid-template-columns: minmax(0, 1fr) 168px minmax(0, 1fr); align-items: center; gap: 0; padding: 10px 0; }
.hb-wb9-row + .hb-wb9-row { border-top: 1px dashed #ececef; }
.hb-wb9-half { position: relative; display: flex; align-items: center; gap: 10px; height: 34px; min-width: 0; }
.hb-wb9-half[data-side="them"] { flex-direction: row-reverse; }
.hb-wb9-track { position: relative; flex: 1; height: 100%; }
.hb-wb9-fill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: var(--hb-wb9-w);
  border-radius: 8px;
  transform: scaleX(0);
  transition: width .9s cubic-bezier(.2, .8, .2, 1), transform 1.1s cubic-bezier(.2, .8, .2, 1);
  transition-delay: 0s, var(--hb-wb9-d);
}
.hb-wb9[data-on="true"] .hb-wb9-fill { transform: scaleX(1); }
.hb-wb9-half[data-side="them"] .hb-wb9-fill { right: 0; transform-origin: right; background: repeating-linear-gradient(-45deg, #e4e4e7 0 6px, #dcdce0 6px 12px); }
.hb-wb9-half[data-side="us"] .hb-wb9-fill { left: 0; transform-origin: left; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-wb9-accent) 70%, #fff), var(--hb-wb9-accent)); box-shadow: 0 8px 18px -10px var(--hb-wb9-accent), inset 0 1px 0 rgba(255, 255, 255, .35); }
.hb-wb9-val { position: absolute; top: 50%; white-space: nowrap; font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums; transform: translateY(-50%); transition: left .9s cubic-bezier(.2, .8, .2, 1), right .9s cubic-bezier(.2, .8, .2, 1), opacity .5s ease; opacity: 0; transition-delay: 0s, 0s, calc(var(--hb-wb9-d) + .6s); }
.hb-wb9[data-on="true"] .hb-wb9-val { opacity: 1; }
.hb-wb9-half[data-side="them"] .hb-wb9-val { right: calc(var(--hb-wb9-w) + 10px); color: #8a8a90; }
.hb-wb9-half[data-side="us"] .hb-wb9-val { left: calc(var(--hb-wb9-w) + 10px); color: #0f0f10; }
.hb-wb9-mid { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 0 12px; text-align: center; }
.hb-wb9-mid b { font-size: 13.5px; font-weight: 600; letter-spacing: -.01em; line-height: 1.2; }
.hb-wb9-chip { display: inline-flex; align-items: center; gap: 3px; padding: 2px 8px; border-radius: 999px; background: color-mix(in srgb, var(--hb-wb9-accent) 10%, #fff); color: var(--hb-wb9-accent); font-size: 11.5px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-wb9-foot { margin: 24px 0 0; color: #8a8a90; font-size: 12.5px; text-align: center; }
@container (max-width: 720px) {
  .hb-wb9-bar-top { grid-template-columns: 1fr 1fr; }
  .hb-wb9-bar-top .hb-wb9-seg { grid-column: span 2; grid-row: 1; justify-self: center; }
  .hb-wb9-side:first-child { justify-self: start; }
  .hb-wb9-side:last-child { justify-self: end; }
  .hb-wb9-rows::before { display: none; }
  .hb-wb9-row { grid-template-columns: minmax(0, 1fr); gap: 6px; padding: 14px 0; }
  .hb-wb9-mid { order: -1; flex-direction: row; justify-content: space-between; padding: 0; text-align: left; }
  .hb-wb9-half { height: 24px; }
  .hb-wb9-half[data-side="them"] { flex-direction: row; }
  .hb-wb9-half[data-side="them"] .hb-wb9-fill { right: auto; left: 0; transform-origin: left; }
  .hb-wb9-half[data-side="them"] .hb-wb9-val { right: auto; left: calc(var(--hb-wb9-w) + 10px); }
  .hb-wb9-fill { top: 3px; bottom: 3px; width: calc(var(--hb-wb9-w) * .8); }
  .hb-wb9-half .hb-wb9-val { font-size: 12px; }
  .hb-wb9-half[data-side] .hb-wb9-val { left: calc(var(--hb-wb9-w) * .8 + 8px); }
}
@container (max-width: 420px) {
  .hb-wb9-wrap { padding: 56px 16px 64px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wb9-fill { transition: none; transform: scaleX(1); }
  .hb-wb9-val { transition: none; opacity: 1; }
  .hb-wb9-pill, .hb-wb9-seg button { transition: none; }
}
`;

const defaultRows: VersusRow[] = [
  { label: "Time to deploy", unit: " min", lowerIsBetter: true, values: [[38, 4], [64, 6]] },
  { label: "Deploys per week", values: [[3, 41], [9, 186]] },
  { label: "Monthly cloud bill", prefix: "$", lowerIsBetter: true, values: [[6400, 2900], [118000, 61500]] },
  { label: "Incidents per quarter", lowerIsBetter: true, values: [[11, 2], [37, 6]] },
  { label: "Days to first commit", lowerIsBetter: true, values: [[9, 1], [21, 2]] },
];

function fmt(v: number, prefix = "", unit = "") {
  const s = v >= 10000 ? `${(v / 1000).toFixed(v >= 100000 ? 0 : 1)}k` : v.toLocaleString("en-US");
  return `${prefix}${s}${unit}`;
}

export function StatsVersus({
  eyebrow = "Measured after migration",
  title = "Same team, same product, a different week",
  subtitle = "What changes when engineering moves from a hand-built pipeline to Tessera. Pick a team size to see the median result.",
  them = "Hand-built pipeline",
  us = "With Tessera",
  scenarios = ["Team of 12", "Team of 240"],
  rows = defaultRows,
  defaultScenario = 0,
  footnote = "Median of 312 customer migrations between January and September 2026.",
  accent = "#7c3aed",
  onScenarioChange,
  className = "",
  style,
  ...rest
}: StatsVersusProps) {
  const uid = React.useId();
  const ref = React.useRef<HTMLElement>(null);
  const [on, setOn] = React.useState(false);
  const [sc, setSc] = React.useState(Math.max(0, Math.min(defaultScenario, scenarios.length - 1)));

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setOn(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const choose = (i: number) => {
    setSc(i);
    onScenarioChange?.(i);
  };

  const vars = { "--hb-wb9-accent": accent, "--hb-wb9-n": scenarios.length, "--hb-wb9-s": sc, ...style } as React.CSSProperties;

  return (
    <section ref={ref} className={`hb-wb9 ${className}`} style={vars} data-on={on} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-stats-versus" precedence="default">{css}</style>
      <div className="hb-wb9-wrap">
        <div className="hb-wb9-head">
          <p className="hb-wb9-eyebrow">{eyebrow}</p>
          <h2 id={`${uid}-t`} className="hb-wb9-title">{title}</h2>
          {subtitle && <p className="hb-wb9-sub">{subtitle}</p>}
        </div>
        <div className="hb-wb9-bar-top">
          <span className="hb-wb9-side"><i aria-hidden="true" />{them}</span>
          {scenarios.length > 1 ? (
            <div className="hb-wb9-seg" role="group" aria-label="Team size">
              <span className="hb-wb9-pill" aria-hidden="true" />
              {scenarios.map((s, i) => (
                <button key={s} type="button" aria-pressed={i === sc} onClick={() => choose(i)}>{s}</button>
              ))}
            </div>
          ) : <span />}
          <span className="hb-wb9-side"><i aria-hidden="true" />{us}</span>
        </div>
        <ul className="hb-wb9-rows">
          {rows.map((r, i) => {
            const pair = r.values[Math.min(sc, r.values.length - 1)] ?? [0, 0];
            const [a, b] = pair;
            const max = Math.max(a, b, 1e-9);
            const wa = (a / max) * 82;
            const wb = (b / max) * 82;
            let chip = "";
            if (r.lowerIsBetter) {
              chip = b > 0 && a / b >= 2 ? `${(a / b).toFixed(1)}x less` : `-${Math.round((1 - b / Math.max(a, 1e-9)) * 100)}%`;
            } else {
              chip = a > 0 ? `${(b / a).toFixed(1)}x more` : "new";
            }
            const d = `${(i * 0.09).toFixed(2)}s`;
            return (
              <li key={`${r.label}-${i}`} className="hb-wb9-row" aria-label={`${r.label}: ${them} ${fmt(a, r.prefix, r.unit)}, ${us} ${fmt(b, r.prefix, r.unit)}`}>
                <div className="hb-wb9-half" data-side="them" aria-hidden="true">
                  <div className="hb-wb9-track" style={{ "--hb-wb9-w": `${wa.toFixed(2)}%`, "--hb-wb9-d": d } as React.CSSProperties}>
                    <span className="hb-wb9-fill" />
                    <span className="hb-wb9-val">{fmt(a, r.prefix, r.unit)}</span>
                  </div>
                </div>
                <div className="hb-wb9-mid">
                  <b>{r.label}</b>
                  <span className="hb-wb9-chip" aria-hidden="true">{chip}</span>
                </div>
                <div className="hb-wb9-half" data-side="us" aria-hidden="true">
                  <div className="hb-wb9-track" style={{ "--hb-wb9-w": `${wb.toFixed(2)}%`, "--hb-wb9-d": d } as React.CSSProperties}>
                    <span className="hb-wb9-fill" />
                    <span className="hb-wb9-val">{fmt(b, r.prefix, r.unit)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {footnote && <p className="hb-wb9-foot">{footnote}</p>}
      </div>
    </section>
  );
}
