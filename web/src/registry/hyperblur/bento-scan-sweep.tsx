"use client";

import * as React from "react";

export interface BentoScanSweepProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: { label: string; href: string } | null;
  accent?: string;
  cycle?: number;
}

const css = `
@keyframes hb-wa10-beam { 0% { left: -12%; opacity: 0; } 4% { opacity: 1; } 76% { opacity: 1; } 80%, 100% { left: 104%; opacity: 0; } }
@keyframes hb-wa10-edge { 0% { border-color: color-mix(in srgb, var(--hb-wa10-accent) 70%, transparent); box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-wa10-accent) 30%, transparent), 0 0 40px -10px var(--hb-wa10-accent); } 14%, 100% { border-color: rgba(255, 255, 255, .08); box-shadow: 0 0 0 0 transparent; } }
@keyframes hb-wa10-flash { 0% { opacity: 1; } 16% { opacity: 1; } 24%, 100% { opacity: 0; } }
@keyframes hb-wa10-hide { 0% { opacity: 0; } 16% { opacity: 0; } 24%, 100% { opacity: 1; } }
@keyframes hb-wa10-glow { 0% { color: var(--hb-wa10-accent); stroke: var(--hb-wa10-accent); } 20%, 100% { color: #3a3a3a; stroke: #3a3a3a; } }
@keyframes hb-wa10-row { 0% { background: color-mix(in srgb, var(--hb-wa10-accent) 18%, transparent); } 22%, 100% { background: transparent; } }
@keyframes hb-wa10-sweep { to { transform: rotate(360deg); } }
@keyframes hb-wa10-rise { from { opacity: 0; transform: translate3d(0, 14px, 0); } to { opacity: 1; transform: none; } }
.hb-wa10 {
  --hb-wa10-accent: #f43f5e;
  --hb-wa10-T: 6s;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #09090b;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa10 *, .hb-wa10 *::before, .hb-wa10 *::after { box-sizing: border-box; }
.hb-wa10 em, .hb-wa10 i { font-style: normal; }
.hb-wa10-in { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa10-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px 40px; flex-wrap: wrap; margin-bottom: clamp(24px, 3.6cqi, 40px); }
.hb-wa10-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 12px; color: #a1a1aa; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; }
.hb-wa10-eyebrow b { width: 14px; height: 14px; border: 1.5px solid var(--hb-wa10-accent); border-radius: 4px; }
.hb-wa10-title { margin: 0; max-width: 620px; font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4.4cqi, 48px); font-weight: 600; line-height: 1.04; letter-spacing: -.035em; text-wrap: balance; }
.hb-wa10-sub { margin: 12px 0 0; max-width: 520px; color: #8f8f96; font-size: 15px; line-height: 1.6; }
.hb-wa10-cta { display: inline-flex; padding: 10px 16px; border: 1px solid rgba(255, 255, 255, .14); border-radius: 10px; color: #ededed; font-size: 14px; font-weight: 600; text-decoration: none; transition: background .2s ease; }
.hb-wa10-cta:hover { background: rgba(255, 255, 255, .06); }
.hb-wa10-cta:focus-visible { outline: 2px solid var(--hb-wa10-accent); outline-offset: 3px; }
.hb-wa10-wrap { position: relative; }
.hb-wa10-beam { position: absolute; z-index: 3; top: -12px; bottom: -12px; width: 140px; margin-left: -70px; pointer-events: none; background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-wa10-accent) 10%, transparent) 45%, color-mix(in srgb, var(--hb-wa10-accent) 60%, transparent) 50%, color-mix(in srgb, var(--hb-wa10-accent) 10%, transparent) 55%, transparent); mix-blend-mode: screen; animation: hb-wa10-beam var(--hb-wa10-T) linear infinite; }
.hb-wa10-beam::after { content: ""; position: absolute; top: 0; bottom: 0; left: 50%; width: 1px; background: var(--hb-wa10-accent); box-shadow: 0 0 12px var(--hb-wa10-accent); }
.hb-wa10-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: 180px 180px 170px; grid-template-areas: "radar radar vault audit" "radar radar posture audit" "comp print keys keys"; gap: 12px; }
.hb-wa10-t { --d: calc((var(--x) + .12) / 1.16 * .8 * var(--hb-wa10-T)); position: relative; display: flex; flex-direction: column; min-width: 0; overflow: hidden; padding: 16px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 18px; background: #101012; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04); animation: hb-wa10-edge var(--hb-wa10-T) ease-out infinite var(--d), hb-wa10-rise .7s cubic-bezier(.22, 1, .36, 1) backwards; }
.hb-wa10-t h3 { margin: 0; font-size: 13.5px; font-weight: 600; }
.hb-wa10-t > p { margin: 3px 0 0; color: #7c7c84; font-size: 12px; line-height: 1.45; }
.hb-wa10-radar { grid-area: radar; }
.hb-wa10-scope { position: relative; flex: 1; margin-top: 12px; display: grid; place-items: center; }
.hb-wa10-disc { position: relative; height: 100%; max-height: 260px; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, transparent 0 24%, rgba(255, 255, 255, .06) 24.5% 25%, transparent 25.5% 49%, rgba(255, 255, 255, .06) 49.5% 50%, transparent 50.5% 74%, rgba(255, 255, 255, .06) 74.5% 75%, transparent 75.5%), #0b0b0d; border: 1px solid rgba(255, 255, 255, .08); overflow: hidden; }
.hb-wa10-disc::before, .hb-wa10-disc::after { content: ""; position: absolute; background: rgba(255, 255, 255, .06); }
.hb-wa10-disc::before { left: 50%; top: 0; bottom: 0; width: 1px; }
.hb-wa10-disc::after { top: 50%; left: 0; right: 0; height: 1px; }
.hb-wa10-arm { position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, color-mix(in srgb, var(--hb-wa10-accent) 40%, transparent), transparent 22%); animation: hb-wa10-sweep 3s linear infinite; }
.hb-wa10-blip { position: absolute; width: 8px; height: 8px; margin: -4px 0 0 -4px; border-radius: 50%; background: var(--hb-wa10-accent); box-shadow: 0 0 10px var(--hb-wa10-accent); opacity: 0; animation: hb-wa10-flash var(--hb-wa10-T) ease-out infinite; animation-delay: calc(var(--d) + var(--o, 0s)); }
.hb-wa10-blip[data-calm="true"] { background: #a1a1aa; box-shadow: none; opacity: .5; animation: none; }
.hb-wa10-legend { position: absolute; left: 0; bottom: 0; display: grid; gap: 6px; font-size: 11.5px; color: #8f8f96; }
.hb-wa10-legend b { color: #ededed; font-family: var(--font-grotesk, inherit); font-size: 26px; font-weight: 600; letter-spacing: -.03em; }
.hb-wa10-vault { grid-area: vault; }
.hb-wa10-secret { position: relative; display: grid; margin-top: auto; padding: 9px 10px; border-radius: 9px; background: #0b0b0d; border: 1px solid rgba(255, 255, 255, .06); font-family: var(--font-mono, ui-monospace, monospace); font-size: 11.5px; }
.hb-wa10-secret > span { grid-area: 1 / 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wa10-secret > span:first-child { color: #8f8f96; animation: hb-wa10-hide var(--hb-wa10-T) ease infinite var(--d); }
.hb-wa10-secret > span:last-child { color: var(--hb-wa10-accent); opacity: 0; animation: hb-wa10-flash var(--hb-wa10-T) ease infinite var(--d); }
.hb-wa10-secret + .hb-wa10-secret { margin-top: 6px; }
.hb-wa10-audit { grid-area: audit; }
.hb-wa10-log { display: grid; gap: 2px; margin: 10px 0 0; padding: 0; list-style: none; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; }
.hb-wa10-log li { display: grid; grid-template-columns: 38px minmax(0, 1fr); gap: 8px; padding: 6px 6px; border-radius: 6px; color: #a1a1aa; white-space: nowrap; }
.hb-wa10-log li span:first-child { color: #52525b; }
.hb-wa10-log li span:last-child { overflow: hidden; text-overflow: ellipsis; }
.hb-wa10-log li[data-hot="true"] { animation: hb-wa10-row var(--hb-wa10-T) ease infinite var(--d); }
.hb-wa10-log li[data-hot="true"] span:last-child { color: #fda4af; }
.hb-wa10-posture { grid-area: posture; }
.hb-wa10-dev { display: grid; gap: 6px; margin-top: auto; }
.hb-wa10-dev div { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 12px; color: #d4d4d8; }
.hb-wa10-dev small { padding: 1px 7px; border-radius: 999px; background: rgba(34, 197, 94, .12); color: #4ade80; font-size: 10.5px; font-weight: 600; }
.hb-wa10-dev small[data-bad="true"] { background: color-mix(in srgb, var(--hb-wa10-accent) 16%, transparent); color: var(--hb-wa10-accent); }
.hb-wa10-comp { grid-area: comp; }
.hb-wa10-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; }
.hb-wa10-badges span { padding: 5px 9px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 8px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; color: #3a3a3a; animation: hb-wa10-glow var(--hb-wa10-T) ease infinite var(--d); }
.hb-wa10-print { grid-area: print; align-items: center; text-align: center; }
.hb-wa10-fp { flex: 1; width: 100%; max-height: 92px; margin-top: 4px; }
.hb-wa10-fp path { fill: none; stroke: #3a3a3a; stroke-width: 1.6; stroke-linecap: round; animation: hb-wa10-glow var(--hb-wa10-T) ease infinite; animation-delay: calc(var(--d) + var(--o, 0s)); }
.hb-wa10-keys { grid-area: keys; }
.hb-wa10-rot { position: relative; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 6px; margin-top: auto; }
.hb-wa10-rot div { display: grid; gap: 4px; padding: 8px; border-radius: 10px; background: #0b0b0d; border: 1px solid rgba(255, 255, 255, .06); font-size: 10.5px; color: #8f8f96; }
.hb-wa10-rot div b { color: #ededed; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; font-weight: 500; }
.hb-wa10-rot div[data-now="true"] { border-color: color-mix(in srgb, var(--hb-wa10-accent) 50%, transparent); }
.hb-wa10-rot div[data-now="true"] b { color: var(--hb-wa10-accent); }
.hb-wa10-rot div[data-old="true"] { opacity: .45; }
@container (max-width: 820px) {
  .hb-wa10-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: 280px 180px 180px 170px auto; grid-template-areas: "radar radar" "vault audit" "posture audit" "comp print" "keys keys"; }
  .hb-wa10-rot { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@container (max-width: 520px) {
  .hb-wa10-grid { grid-template-columns: minmax(0, 1fr); grid-template-rows: none; grid-auto-rows: minmax(170px, auto); grid-template-areas: "radar" "vault" "audit" "posture" "comp" "print" "keys"; }
  .hb-wa10-radar { min-height: 280px; }
  .hb-wa10-beam { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa10 *, .hb-wa10 *::before, .hb-wa10 *::after { animation: none !important; transition: none !important; }
  .hb-wa10-beam, .hb-wa10-arm { display: none; }
  .hb-wa10-blip { opacity: 1; }
  .hb-wa10-secret > span:last-child { opacity: 0; }
}
`;

const blips = [
  { l: 30, t: 34, o: 0 },
  { l: 64, t: 28, o: 0.15, calm: true },
  { l: 70, t: 62, o: 0.3 },
  { l: 40, t: 70, o: 0.1, calm: true },
  { l: 52, t: 46, o: 0.2 },
];

const fpPaths = [
  "M30 70 C 30 40, 70 40, 70 70",
  "M22 72 C 20 30, 80 30, 78 72",
  "M38 72 C 38 52, 62 52, 62 72 C 62 80, 58 86, 54 90",
  "M46 74 C 46 62, 54 62, 54 74 C 54 82, 50 88, 46 92",
  "M14 66 C 16 18, 84 18, 86 66",
];

export function BentoScanSweep({
  eyebrow = "wardline · continuous scanning",
  title = "One sweep, every surface, every six seconds",
  subtitle = "Wardline rescans your infrastructure end to end on a loop. Watch the beam: everything it touches is checked again.",
  cta = { label: "Run a free scan", href: "#" },
  accent = "#f43f5e",
  cycle = 6,
  className,
  style,
  ...rest
}: BentoScanSweepProps) {
  const x = (v: number, i: number) => ({ "--x": v, animationDelay: `var(--d), ${i * 70}ms` }) as React.CSSProperties;
  return (
    <section className={["hb-wa10", className].filter(Boolean).join(" ")} style={{ "--hb-wa10-accent": accent, "--hb-wa10-T": `${cycle}s`, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-bento-scan-sweep" precedence="default">{css}</style>
      <div className="hb-wa10-in">
        <div className="hb-wa10-head">
          <div>
            <p className="hb-wa10-eyebrow"><b />{eyebrow}</p>
            <h2 className="hb-wa10-title">{title}</h2>
            <p className="hb-wa10-sub">{subtitle}</p>
          </div>
          {cta && <a className="hb-wa10-cta" href={cta.href}>{cta.label}</a>}
        </div>
        <div className="hb-wa10-wrap">
          <i className="hb-wa10-beam" aria-hidden="true" />
          <div className="hb-wa10-grid">
            <article className="hb-wa10-t hb-wa10-radar" style={x(0.25, 0)}>
              <h3>Threat radar</h3>
              <p>Inbound traffic scored in real time.</p>
              <div className="hb-wa10-scope">
                <div className="hb-wa10-disc" aria-hidden="true">
                  <i className="hb-wa10-arm" />
                  {blips.map((b, j) => (
                    <i key={j} className="hb-wa10-blip" data-calm={b.calm ? "true" : undefined} style={{ left: `${b.l}%`, top: `${b.t}%`, "--o": `${b.o}s` } as React.CSSProperties} />
                  ))}
                </div>
                <div className="hb-wa10-legend">
                  <b>3</b>
                  flagged sources
                  <span>2 benign crawlers</span>
                </div>
              </div>
            </article>
            <article className="hb-wa10-t hb-wa10-vault" style={x(0.625, 1)}>
              <h3>Secrets vault</h3>
              <p>Leaked tokens caught before merge.</p>
              <div className="hb-wa10-secret">
                <span>whk_prod_••••••••••</span>
                <span>whk_prod_9c4e1a72f0 · exposed</span>
              </div>
              <div className="hb-wa10-secret">
                <span>db_ro_••••••••••</span>
                <span>db_ro_rotated 2m ago</span>
              </div>
            </article>
            <article className="hb-wa10-t hb-wa10-audit" style={x(0.875, 2)}>
              <h3>Audit stream</h3>
              <p>Signed and append-only.</p>
              <ul className="hb-wa10-log">
                <li><span>14:02</span><span>sso login · m.chen</span></li>
                <li><span>14:03</span><span>role change · ops</span></li>
                <li data-hot="true"><span>14:03</span><span>blocked · 185.22.x.x</span></li>
                <li><span>14:05</span><span>key rotated · db_ro</span></li>
                <li><span>14:06</span><span>policy push · v41</span></li>
                <li><span>14:08</span><span>device enrolled · #219</span></li>
                <li><span>14:09</span><span>export · audit.jsonl</span></li>
              </ul>
            </article>
            <article className="hb-wa10-t hb-wa10-posture" style={x(0.625, 3)}>
              <h3>Device posture</h3>
              <div className="hb-wa10-dev">
                <div>MacBook · Ana R. <small>Encrypted</small></div>
                <div>Pixel 9 · Joel K. <small data-bad="true">OS outdated</small></div>
                <div>ThinkPad · Mei C. <small>Encrypted</small></div>
              </div>
            </article>
            <article className="hb-wa10-t hb-wa10-comp" style={x(0.125, 4)}>
              <h3>Compliance</h3>
              <p>Evidence collected for you.</p>
              <div className="hb-wa10-badges">
                <span>SOC 2</span>
                <span>ISO 27001</span>
                <span>HIPAA</span>
                <span>GDPR</span>
              </div>
            </article>
            <article className="hb-wa10-t hb-wa10-print" style={x(0.375, 5)}>
              <h3>Passkeys only</h3>
              <svg className="hb-wa10-fp" viewBox="0 0 100 100" aria-hidden="true">
                {fpPaths.map((d, j) => (
                  <path key={d} d={d} style={{ "--o": `${(j * 0.06).toFixed(2)}s` } as React.CSSProperties} />
                ))}
              </svg>
              <p>No passwords to phish.</p>
            </article>
            <article className="hb-wa10-t hb-wa10-keys" style={x(0.75, 6)}>
              <h3>Automatic key rotation</h3>
              <p>Every credential replaced on schedule, with zero restarts.</p>
              <div className="hb-wa10-rot">
                {[["Jun", "k_7f2a"], ["Jul", "k_19bd"], ["Aug", "k_c04e"], ["Sep", "k_5a1f"], ["Oct", "k_e93c"], ["Nov", "k_2d70"]].map(([m, k], j) => (
                  <div key={m} data-old={j < 3} data-now={j === 5}>
                    {m}
                    <b>{k}</b>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
