"use client";

import * as React from "react";

export interface OdometerStat {
  value: string;
  label: string;
  note?: string;
  unit?: string;
}

export interface StatsOdometerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  stats?: OdometerStat[];
  duration?: number;
  accent?: string;
}

const css = `
.hb-wb6 {
  --hb-wb6-accent: #d9480f;
  --hb-wb6-fs: clamp(36px, 5.4cqw, 60px);
  box-sizing: border-box;
  position: relative;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: #161512;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wb6 *, .hb-wb6 *::before, .hb-wb6 *::after { box-sizing: border-box; }
.hb-wb6::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(22, 21, 18, .05) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 21, 18, .05) 1px, transparent 1px);
  background-size: 32px 32px;
  -webkit-mask: radial-gradient(80% 70% at 50% 30%, #000, transparent 80%);
  mask: radial-gradient(80% 70% at 50% 30%, #000, transparent 80%);
  pointer-events: none;
}
.hb-wb6-wrap { position: relative; max-width: 1120px; margin: 0 auto; padding: 72px 24px 88px; }
.hb-wb6-head { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 24px 48px; align-items: end; margin-bottom: 36px; }
.hb-wb6-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 14px; color: #6d6a62; font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; font-family: var(--font-mono, ui-monospace, monospace); }
.hb-wb6-eyebrow i { width: 7px; height: 7px; border-radius: 2px; background: var(--hb-wb6-accent); }
.hb-wb6-title { margin: 0; font-size: clamp(28px, 4.2cqw, 46px); font-weight: 600; line-height: 1.02; letter-spacing: -.04em; text-wrap: balance; }
.hb-wb6-sub { margin: 0; color: #6d6a62; font-size: 15px; line-height: 1.6; }
.hb-wb6-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin: 0; padding: 0; list-style: none; }
.hb-wb6-mod {
  position: relative;
  min-width: 0;
  padding: 22px 24px 20px;
  border: 1px solid rgba(22, 21, 18, .1);
  border-radius: 18px;
  background: linear-gradient(180deg, #fffdf8, #f1eee5);
  box-shadow: inset 0 1px 0 #fff, 0 1px 2px rgba(40, 30, 10, .06), 0 20px 40px -28px rgba(40, 30, 10, .35);
}
.hb-wb6-mod::before, .hb-wb6-mod::after {
  content: "";
  position: absolute;
  top: 12px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fff, #b9b4a7);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .12);
}
.hb-wb6-mod::before { left: 12px; }
.hb-wb6-mod::after { right: 12px; }
.hb-wb6-plate { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin: 0 0 14px; padding: 0 10px; color: #8a867c; font-size: 11px; letter-spacing: .1em; text-transform: uppercase; font-family: var(--font-mono, ui-monospace, monospace); }
.hb-wb6-plate span:last-child { color: var(--hb-wb6-accent); }
.hb-wb6-meter {
  display: flex;
  align-items: stretch;
  gap: 4px;
  width: max-content;
  max-width: 100%;
  padding: 8px;
  border-radius: 12px;
  background: #1a1916;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, .6), 0 1px 0 #fff;
  font-size: var(--hb-wb6-fs);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-weight: 500;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.hb-wb6-cell {
  position: relative;
  width: .78em;
  height: 1.24em;
  overflow: hidden;
  border-radius: 6px;
  background: linear-gradient(180deg, #2a2823, #f4f1e8 22%, #fffdf7 50%, #f4f1e8 78%, #2a2823);
  color: #161512;
}
.hb-wb6-cell::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, .55), transparent 28%, transparent 72%, rgba(0, 0, 0, .55));
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .25);
  border-radius: inherit;
  pointer-events: none;
}
.hb-wb6-cell::before { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: rgba(0, 0, 0, .08); z-index: 1; }
.hb-wb6-strip {
  display: flex;
  flex-direction: column;
  transform: translateY(0);
  transition: transform var(--hb-wb6-t) cubic-bezier(.16, .84, .3, 1);
  transition-delay: var(--hb-wb6-dl);
}
.hb-wb6-strip span { display: grid; place-items: center; height: 1.24em; }
.hb-wb6[data-on="true"] .hb-wb6-strip { transform: translateY(calc(var(--hb-wb6-idx) * -1.24em)); }
.hb-wb6-sep { display: grid; place-items: end center; width: .34em; padding-bottom: .16em; color: #f4f1e8; font-size: .7em; }
.hb-wb6-sep[data-wide] { width: auto; padding: 0 .12em .16em; place-items: end start; color: var(--hb-wb6-accent); font-size: .5em; }
.hb-wb6-foot { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 16px; padding: 0 2px; }
.hb-wb6-label { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: -.01em; }
.hb-wb6-note { color: #6d6a62; font-size: 12.5px; font-family: var(--font-mono, ui-monospace, monospace); white-space: nowrap; }
.hb-wb6-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 720px) {
  .hb-wb6-head { grid-template-columns: minmax(0, 1fr); }
  .hb-wb6-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-wb6 { --hb-wb6-fs: clamp(30px, 9cqw, 54px); }
}
@container (max-width: 420px) {
  .hb-wb6-wrap { padding: 56px 16px 64px; }
  .hb-wb6-mod { padding: 20px 14px 16px; }
  .hb-wb6-meter { gap: 3px; padding: 6px; }
  .hb-wb6-foot { flex-direction: column; gap: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wb6-strip { transition: none; transform: translateY(calc(var(--hb-wb6-idx) * -1.24em)); }
}
`;

const defaultStats: OdometerStat[] = [
  { value: "2,481,906", label: "Parcels routed this year", note: "+18% vs 2025" },
  { value: "99.982", unit: "%", label: "On-time handoffs", note: "rolling 90 days" },
  { value: "14,320", label: "Drivers on the network", note: "in 212 cities" },
  { value: "38", unit: "min", label: "Median door-to-door", note: "down from 61" },
];

const ROUNDS = 3;

export function StatsOdometer({
  eyebrow = "Network counter",
  title = "The numbers behind every delivery window",
  subtitle = "Measured live from our dispatch ledger, not estimated. The counters reset each January and roll forward with every scan.",
  stats = defaultStats,
  duration = 2400,
  accent = "#d9480f",
  className = "",
  style,
  ...rest
}: StatsOdometerProps) {
  const uid = React.useId();
  const ref = React.useRef<HTMLElement>(null);
  const [on, setOn] = React.useState(false);

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

  const strip = Array.from({ length: ROUNDS * 10 }, (_, i) => i % 10);
  const vars = { "--hb-wb6-accent": accent, ...style } as React.CSSProperties;

  return (
    <section ref={ref} className={`hb-wb6 ${className}`} style={vars} data-on={on} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-stats-odometer" precedence="default">{css}</style>
      <div className="hb-wb6-wrap">
        <div className="hb-wb6-head">
          <div>
            <p className="hb-wb6-eyebrow"><i aria-hidden="true" />{eyebrow}</p>
            <h2 id={`${uid}-t`} className="hb-wb6-title">{title}</h2>
          </div>
          {subtitle && <p className="hb-wb6-sub">{subtitle}</p>}
        </div>
        <ul className="hb-wb6-grid">
          {stats.map((s, si) => {
            const chars = s.value.split("");
            const digitCount = chars.filter((c) => c >= "0" && c <= "9").length;
            let place = digitCount;
            return (
              <li key={`${s.label}-${si}`} className="hb-wb6-mod">
                <p className="hb-wb6-plate" aria-hidden="true">
                  <span>{`Unit ${String(si + 1).padStart(2, "0")}`}</span>
                  <span>Live</span>
                </p>
                <span className="hb-wb6-sr">{`${s.value}${s.unit ? ` ${s.unit}` : ""}`}</span>
                <div className="hb-wb6-meter" aria-hidden="true">
                  {chars.map((c, ci) => {
                    if (c >= "0" && c <= "9") {
                      place -= 1;
                      const d = Number(c);
                      const fromRight = place;
                      const spins = Math.max(0, ROUNDS - 1 - Math.min(fromRight, ROUNDS - 1));
                      const idx = spins * 10 + d;
                      const t = Math.round(duration * (0.55 + 0.45 * (1 - fromRight / Math.max(digitCount, 1))));
                      const dl = Math.round(si * 140 + fromRight * 40);
                      return (
                        <span key={ci} className="hb-wb6-cell">
                          <span
                            className="hb-wb6-strip"
                            style={{ "--hb-wb6-idx": idx, "--hb-wb6-t": `${t}ms`, "--hb-wb6-dl": `${dl}ms` } as React.CSSProperties}
                          >
                            {strip.map((v, k) => <span key={k}>{v}</span>)}
                          </span>
                        </span>
                      );
                    }
                    return <span key={ci} className="hb-wb6-sep">{c}</span>;
                  })}
                  {s.unit && <span className="hb-wb6-sep" data-wide="">{s.unit}</span>}
                </div>
                <div className="hb-wb6-foot">
                  <h3 className="hb-wb6-label">{s.label}</h3>
                  {s.note && <span className="hb-wb6-note">{s.note}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
