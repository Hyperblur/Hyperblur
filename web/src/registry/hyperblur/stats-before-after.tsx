"use client";

import * as React from "react";

export interface StatsBeforeAfterItem {
  label: string;
  before: number;
  after: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  better: "higher" | "lower";
}

export interface StatsBeforeAfterProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: StatsBeforeAfterItem[];
  beforeLabel?: string;
  afterLabel?: string;
  quote?: { text: string; name: string; role: string } | null;
  autoPlay?: boolean;
  onChange?: (progress: number) => void;
  accent?: string;
}

const defaultItems: StatsBeforeAfterItem[] = [
  { label: "Deploys per week", before: 3, after: 41, better: "higher" },
  { label: "Lead time for a change", before: 9.5, after: 1.2, decimals: 1, suffix: " days", better: "lower" },
  { label: "Time to recover from incidents", before: 372, after: 38, suffix: " min", better: "lower" },
  { label: "Cloud spend per month", before: 48200, after: 29700, prefix: "$", better: "lower" },
];

const css = `
.hb-yic {
  --hb-yic-accent: #4f46e5;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #fbfaf7;
  color: #131316;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yic *, .hb-yic *::before, .hb-yic *::after { box-sizing: border-box; }
.hb-yic::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, rgba(19, 19, 22, .04) 1px, transparent 1px) 0 0 / calc(100% / 12) 100%;
  mask-image: linear-gradient(180deg, #000, transparent 60%);
}
.hb-yic-inner { position: relative; max-width: 1120px; margin: 0 auto; padding: 72px 20px 80px; }
.hb-yic-head { display: grid; gap: 24px; align-items: end; }
.hb-yic-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 14px; padding: 5px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; color: var(--hb-yic-accent); background: color-mix(in srgb, var(--hb-yic-accent) 8%, #fff); border: 1px solid color-mix(in srgb, var(--hb-yic-accent) 18%, transparent); }
.hb-yic-title { margin: 0; font-size: clamp(30px, 5cqi, 52px); line-height: 1.03; letter-spacing: -.045em; font-weight: 650; max-width: 17ch; }
.hb-yic-sub { margin: 14px 0 0; max-width: 480px; font-size: 16px; line-height: 1.6; color: #64646c; }
.hb-yic-ctrl { display: grid; gap: 10px; min-width: 0; }
.hb-yic-seg { display: inline-flex; padding: 4px; border-radius: 12px; background: #fff; border: 1px solid rgba(19, 19, 22, .1); box-shadow: 0 1px 2px rgba(19, 19, 22, .04); justify-self: start; }
.hb-yic-seg button { height: 34px; padding: 0 16px; border: 0; border-radius: 9px; background: transparent; color: #64646c; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: background .2s, color .2s; }
.hb-yic-seg button[aria-pressed="true"] { background: #131316; color: #fff; }
.hb-yic-seg button:focus-visible, .hb-yic-range:focus-visible { outline: 2px solid var(--hb-yic-accent); outline-offset: 2px; }
.hb-yic-scrub { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 12px; font-size: 12px; font-weight: 600; color: #8a8a92; }
.hb-yic-range { -webkit-appearance: none; appearance: none; width: 100%; min-width: 120px; height: 24px; margin: 0; background: transparent; cursor: ew-resize; }
.hb-yic-range::-webkit-slider-runnable-track { height: 4px; border-radius: 4px; background: linear-gradient(90deg, var(--hb-yic-accent) calc(var(--hb-yic-t) * 100%), #e4e3de 0); }
.hb-yic-range::-moz-range-track { height: 4px; border-radius: 4px; background: linear-gradient(90deg, var(--hb-yic-accent) calc(var(--hb-yic-t) * 100%), #e4e3de 0); }
.hb-yic-range::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; margin-top: -7px; border-radius: 6px; background: #fff; border: 2px solid var(--hb-yic-accent); box-shadow: 0 2px 6px rgba(19, 19, 22, .2); }
.hb-yic-range::-moz-range-thumb { width: 14px; height: 14px; border-radius: 6px; background: #fff; border: 2px solid var(--hb-yic-accent); box-shadow: 0 2px 6px rgba(19, 19, 22, .2); }
.hb-yic-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 40px; }
.hb-yic-card {
  position: relative; padding: 22px; border-radius: 18px; background: #fff; border: 1px solid rgba(19, 19, 22, .08);
  box-shadow: 0 1px 0 #fff inset, 0 18px 40px -30px rgba(19, 19, 22, .35); display: flex; flex-direction: column; min-width: 0;
  animation: hb-yic-rise .6s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-yic-i) * 80ms);
}
.hb-yic-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
.hb-yic-label { margin: 0; font-size: 14px; color: #44444c; line-height: 1.35; }
.hb-yic-delta {
  display: inline-flex; align-items: center; gap: 4px; flex: none; padding: 3px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums;
  transition: background .3s, color .3s;
}
.hb-yic-delta[data-good="true"] { color: #0b7a4b; background: #dcf5e8; }
.hb-yic-delta[data-good="false"] { color: #b4321f; background: #fde4df; }
.hb-yic-delta[data-zero="true"] { color: #8a8a92; background: #f0efea; }
.hb-yic-delta svg { width: 12px; height: 12px; transition: transform .4s cubic-bezier(.3, 1.4, .5, 1); }
.hb-yic-delta[data-dir="down"] svg { transform: rotate(180deg); }
.hb-yic-num { margin: 22px 0 0; font-size: clamp(34px, 4cqi, 46px); line-height: 1; letter-spacing: -.045em; font-weight: 650; font-variant-numeric: tabular-nums; white-space: nowrap; }
.hb-yic-num small { font-size: .42em; letter-spacing: -.01em; color: #8a8a92; font-weight: 600; }
.hb-yic-was { margin: 8px 0 0; font-size: 13px; color: #8a8a92; font-variant-numeric: tabular-nums; }
.hb-yic-was s { text-decoration-color: rgba(19, 19, 22, .35); }
.hb-yic-cmp { display: grid; gap: 6px; margin-top: 18px; }
.hb-yic-cmp div { display: grid; grid-template-columns: 44px minmax(0, 1fr); align-items: center; gap: 8px; font-size: 11px; color: #8a8a92; font-weight: 600; }
.hb-yic-cmp i { display: block; height: 8px; border-radius: 4px; background: #f0efea; overflow: hidden; }
.hb-yic-cmp b { display: block; height: 100%; border-radius: 4px; background: #c9c8c2; }
.hb-yic-cmp div + div b { background: var(--hb-yic-accent); }
.hb-yic-quote { display: grid; gap: 16px; margin-top: 16px; padding: 24px; border-radius: 18px; background: #131316; color: #f3f3f5; }
.hb-yic-quote p { margin: 0; font-size: clamp(17px, 2.2cqi, 21px); line-height: 1.45; letter-spacing: -.015em; }
.hb-yic-who { display: flex; align-items: center; gap: 12px; font-size: 14px; }
.hb-yic-who i { width: 36px; height: 36px; border-radius: 50%; flex: none; background: linear-gradient(135deg, var(--hb-yic-accent), #f472b6); display: grid; place-items: center; font-style: normal; font-weight: 700; font-size: 13px; }
.hb-yic-who span { color: #9a9aa2; display: block; font-size: 13px; }
.hb-yic-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-yic-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@container (min-width: 600px) {
  .hb-yic-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (min-width: 920px) {
  .hb-yic-inner { padding: 104px 32px 112px; }
  .hb-yic-head { grid-template-columns: minmax(0, 1fr) minmax(0, 380px); }
  .hb-yic-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
  .hb-yic-quote { grid-template-columns: minmax(0, 1fr) auto; align-items: center; padding: 28px 32px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yic-card { animation: none; }
  .hb-yic-delta, .hb-yic-delta svg, .hb-yic-seg button { transition: none; }
}
`;

function format(v: number, decimals: number) {
  const fixed = v.toFixed(decimals);
  const [whole, frac] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return frac ? `${grouped}.${frac}` : grouped;
}

export function StatsBeforeAfter({
  eyebrow = "Case study · Northwind Freight",
  title = "Twelve months after moving to Relay.",
  subtitle = "Northwind's platform team of nine replaced four internal tools. Drag the timeline to compare the numbers they reported.",
  items = defaultItems,
  beforeLabel = "Q3 2025",
  afterLabel = "Q3 2026",
  quote = { text: "We ship on Fridays now. Nobody on the team remembers when that stopped being scary.", name: "Dana Whitlock", role: "VP Engineering, Northwind" },
  autoPlay = true,
  onChange,
  accent = "#4f46e5",
  className = "",
  style,
  ...rest
}: StatsBeforeAfterProps) {
  const [t, setT] = React.useState(autoPlay ? 0 : 1);
  const raf = React.useRef(0);
  const tRef = React.useRef(t);
  const id = React.useId();

  const animateTo = React.useCallback((target: number, delay = 0) => {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf.current = requestAnimationFrame(() => {
        tRef.current = target;
        setT(target);
      });
      return;
    }
    const from = tRef.current;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now + delay;
      const k = Math.max(0, Math.min(1, (now - start) / 1400));
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      const v = from + (target - from) * e;
      tRef.current = v;
      setT(v);
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  React.useEffect(() => {
    if (autoPlay) animateTo(1, 500);
    const r = raf;
    return () => cancelAnimationFrame(r.current);
  }, [autoPlay, animateTo]);

  const snap = (target: number) => {
    animateTo(target);
    onChange?.(target);
  };

  const scrub = (v: number) => {
    cancelAnimationFrame(raf.current);
    tRef.current = v;
    setT(v);
    onChange?.(v);
  };

  const vars = { "--hb-yic-accent": accent, "--hb-yic-t": t.toFixed(4), ...style } as React.CSSProperties;

  return (
    <section className={`hb-yic ${className}`} style={vars} {...rest}>
      <style href="hb-stats-before-after" precedence="default">{css}</style>
      <div className="hb-yic-inner">
        <div className="hb-yic-head">
          <div>
            {eyebrow ? <p className="hb-yic-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-yic-title">{title}</h2>
            {subtitle ? <p className="hb-yic-sub">{subtitle}</p> : null}
          </div>
          <div className="hb-yic-ctrl">
            <div className="hb-yic-seg" role="group" aria-label="Compare">
              <button type="button" aria-pressed={t < 0.5} onClick={() => snap(0)}>
                {`Before · ${beforeLabel}`}
              </button>
              <button type="button" aria-pressed={t >= 0.5} onClick={() => snap(1)}>
                {`After · ${afterLabel}`}
              </button>
            </div>
            <div className="hb-yic-scrub">
              <span aria-hidden="true">{beforeLabel}</span>
              <input
                id={`${id}-t`}
                className="hb-yic-range"
                type="range"
                min={0}
                max={1000}
                value={Math.round(t * 1000)}
                aria-label="Timeline from before to after"
                aria-valuetext={`${Math.round(t * 100)}% of the way to ${afterLabel}`}
                onChange={(e) => scrub(Number(e.target.value) / 1000)}
              />
              <span aria-hidden="true">{afterLabel}</span>
            </div>
          </div>
        </div>

        <div className="hb-yic-grid">
          {items.map((it, i) => {
            const decimals = it.decimals ?? 0;
            const now = it.before + (it.after - it.before) * t;
            const change = it.before === 0 ? 0 : (now - it.before) / it.before;
            const dir = change >= 0 ? "up" : "down";
            const good = it.better === "higher" ? change >= 0 : change <= 0;
            const zero = Math.abs(change) < 0.005;
            const peak = Math.max(it.before, it.after) || 1;
            const pct = Math.abs(change * 100);
            return (
              <article key={it.label} className="hb-yic-card" style={{ "--hb-yic-i": i } as React.CSSProperties}>
                <div className="hb-yic-top">
                  <p className="hb-yic-label">{it.label}</p>
                  <span className="hb-yic-delta" data-good={good} data-zero={zero} data-dir={dir}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                    {`${pct >= 100 ? pct.toFixed(0) : pct.toFixed(1)}%`}
                  </span>
                </div>
                <p className="hb-yic-num">
                  <span className="hb-yic-sr">{`${it.label}: ${it.prefix ?? ""}${format(it.before, decimals)}${it.suffix ?? ""} before, ${it.prefix ?? ""}${format(it.after, decimals)}${it.suffix ?? ""} after`}</span>
                  <span aria-hidden="true">
                    {it.prefix}
                    {format(now, decimals)}
                    {it.suffix ? <small>{it.suffix}</small> : null}
                  </span>
                </p>
                <p className="hb-yic-was" aria-hidden="true">
                  {"Was "}
                  <s>{`${it.prefix ?? ""}${format(it.before, decimals)}${it.suffix ?? ""}`}</s>
                </p>
                <div className="hb-yic-cmp" aria-hidden="true">
                  <div>
                    <span>Before</span>
                    <i>
                      <b style={{ width: `${((it.before / peak) * 100).toFixed(1)}%` }} />
                    </i>
                  </div>
                  <div>
                    <span>Now</span>
                    <i>
                      <b style={{ width: `${((now / peak) * 100).toFixed(1)}%` }} />
                    </i>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {quote ? (
          <figure className="hb-yic-quote" style={{ margin: "16px 0 0" }}>
            <blockquote style={{ margin: 0 }}>
              <p>{`"${quote.text}"`}</p>
            </blockquote>
            <figcaption className="hb-yic-who">
              <i aria-hidden="true">
                {quote.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </i>
              <div>
                {quote.name}
                <span>{quote.role}</span>
              </div>
            </figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
