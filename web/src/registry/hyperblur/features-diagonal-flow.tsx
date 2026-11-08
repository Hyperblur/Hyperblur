"use client";

import * as React from "react";

export interface FeaturesDiagonalFlowStep {
  title: string;
  body: string;
  meta: string;
}

export interface FeaturesDiagonalFlowProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: FeaturesDiagonalFlowStep[];
  footnote?: { value: string; label: string }[];
  cta?: { label: string; href: string } | null;
  accent?: string;
  duration?: number;
}

const css = `
@keyframes hb-wa4-run { from { stroke-dashoffset: .1; } to { stroke-dashoffset: -1; } }
@keyframes hb-wa4-lit { 0%, 30% { border-color: color-mix(in srgb, var(--hb-wa4-accent) 55%, transparent); box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-wa4-accent) 25%, transparent), 0 30px 60px -30px color-mix(in srgb, var(--hb-wa4-accent) 45%, transparent); } 40%, 100% { border-color: rgba(255, 255, 255, .08); box-shadow: 0 30px 60px -40px rgba(0, 0, 0, .9); } }
@keyframes hb-wa4-num { 0%, 30% { color: var(--hb-wa4-accent); -webkit-text-stroke-color: var(--hb-wa4-accent); } 40%, 100% { color: transparent; -webkit-text-stroke-color: #333; } }
@keyframes hb-wa4-plug { 0%, 100% { transform: translateX(0); } 40%, 70% { transform: translateX(10px); } }
@keyframes hb-wa4-spark { 0%, 38% { opacity: 0; transform: scale(.4); } 45% { opacity: 1; transform: scale(1.2); } 60%, 100% { opacity: 0; transform: scale(1.6); } }
@keyframes hb-wa4-map { 0%, 20% { stroke-dashoffset: 1; } 60%, 100% { stroke-dashoffset: 0; } }
@keyframes hb-wa4-spin { to { transform: rotate(360deg); } }
@keyframes hb-wa4-roll { 0% { transform: translateY(0); } 100% { transform: translateY(-75%); } }
@keyframes hb-wa4-rise { from { opacity: 0; transform: translate3d(0, 18px, 0); } to { opacity: 1; transform: none; } }
.hb-wa4 {
  --hb-wa4-accent: #22d3ee;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa4 *, .hb-wa4 *::before, .hb-wa4 *::after { box-sizing: border-box; }
.hb-wa4 em, .hb-wa4 i { font-style: normal; }
.hb-wa4::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(135deg, transparent 0 46px, rgba(255, 255, 255, .018) 46px 47px); mask-image: radial-gradient(80% 70% at 50% 50%, #000, transparent); }
.hb-wa4-in { position: relative; max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa4-grid { position: relative; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); grid-template-rows: auto auto auto; gap: 22px 18px; }
.hb-wa4-path { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.hb-wa4-path path { fill: none; vector-effect: non-scaling-stroke; }
.hb-wa4-base { stroke: #262626; stroke-width: 1.5; stroke-dasharray: 4 6; }
.hb-wa4-pulse { stroke: var(--hb-wa4-accent); stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: .1 .9; filter: drop-shadow(0 0 6px var(--hb-wa4-accent)); animation: hb-wa4-run var(--hb-wa4-d) linear infinite; }
.hb-wa4-head { grid-column: 7 / 13; grid-row: 1; align-self: start; padding-top: 6px; animation: hb-wa4-rise .7s cubic-bezier(.22, 1, .36, 1) both; }
.hb-wa4-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 14px; color: #a1a1a1; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; }
.hb-wa4-eyebrow b { width: 8px; height: 8px; border-radius: 2px; background: var(--hb-wa4-accent); transform: rotate(45deg); }
.hb-wa4-title { margin: 0; font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4.2cqi, 48px); font-weight: 600; line-height: 1.04; letter-spacing: -.035em; text-wrap: balance; }
.hb-wa4-sub { margin: 14px 0 0; max-width: 440px; color: #8f8f8f; font-size: 15px; line-height: 1.6; }
.hb-wa4-step { position: relative; z-index: 1; padding: 20px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 20px; background: linear-gradient(180deg, #141414, #0f0f0f); box-shadow: 0 30px 60px -40px rgba(0, 0, 0, .9); animation: hb-wa4-lit var(--hb-wa4-d) ease infinite, hb-wa4-rise .7s cubic-bezier(.22, 1, .36, 1) backwards; animation-delay: calc(var(--hb-wa4-d) * var(--i) / 3), calc(var(--i) * 120ms + 100ms); }
.hb-wa4-step[data-i="0"] { grid-column: 1 / 6; grid-row: 1; }
.hb-wa4-step[data-i="1"] { grid-column: 4 / 9; grid-row: 2; }
.hb-wa4-step[data-i="2"] { grid-column: 8 / 13; grid-row: 3; }
.hb-wa4-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.hb-wa4-num { font-family: var(--font-grotesk, inherit); font-size: 64px; font-weight: 700; line-height: .8; letter-spacing: -.05em; color: transparent; -webkit-text-stroke: 1.5px #333; animation: hb-wa4-num var(--hb-wa4-d) ease infinite; animation-delay: calc(var(--hb-wa4-d) * var(--i) / 3); }
.hb-wa4-meta { padding: 4px 8px; border: 1px solid rgba(255, 255, 255, .1); border-radius: 999px; color: #a1a1a1; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; white-space: nowrap; }
.hb-wa4-step h3 { margin: 16px 0 0; font-size: 19px; font-weight: 600; letter-spacing: -.015em; }
.hb-wa4-step p { margin: 6px 0 0; color: #8f8f8f; font-size: 14px; line-height: 1.55; }
.hb-wa4-ill { position: relative; height: 92px; margin-top: 16px; overflow: hidden; border: 1px solid rgba(255, 255, 255, .06); border-radius: 12px; background: #0b0b0b; }
.hb-wa4-src { position: absolute; top: 50%; display: grid; place-items: center; width: 44px; height: 44px; margin-top: -22px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, .1); background: #171717; font-size: 10px; font-weight: 700; color: #ededed; }
.hb-wa4-plug { animation: hb-wa4-plug 3s cubic-bezier(.65, 0, .35, 1) infinite; }
.hb-wa4-spark { position: absolute; left: 50%; top: 50%; width: 22px; height: 22px; margin: -11px 0 0 -11px; border-radius: 50%; border: 2px solid var(--hb-wa4-accent); animation: hb-wa4-spark 3s ease-out infinite; }
.hb-wa4-wire { position: absolute; top: 50%; height: 2px; margin-top: -1px; background: repeating-linear-gradient(90deg, #333 0 6px, transparent 6px 10px); }
.hb-wa4-fields { position: absolute; inset: 10px 14px; display: grid; grid-template-columns: 1fr 1fr; column-gap: 46px; row-gap: 6px; align-content: center; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; }
.hb-wa4-fields span { padding: 3px 7px; border-radius: 6px; background: #171717; color: #bdbdbd; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wa4-fields span:nth-child(even) { color: var(--hb-wa4-accent); background: color-mix(in srgb, var(--hb-wa4-accent) 10%, #111); }
.hb-wa4-maps { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-wa4-maps path { fill: none; stroke: color-mix(in srgb, var(--hb-wa4-accent) 70%, #fff); stroke-width: 1.2; stroke-dasharray: 1; animation: hb-wa4-map 3.6s ease infinite; }
.hb-wa4-sync { position: absolute; inset: 0; display: flex; align-items: center; gap: 16px; padding: 0 18px; }
.hb-wa4-sync svg { flex: none; color: var(--hb-wa4-accent); animation: hb-wa4-spin 2.4s linear infinite; }
.hb-wa4-count { display: grid; }
.hb-wa4-count small { color: #6f6f6f; font-size: 11px; }
.hb-wa4-roll { height: 28px; overflow: hidden; font-family: var(--font-grotesk, inherit); font-size: 24px; font-weight: 600; letter-spacing: -.03em; line-height: 28px; }
.hb-wa4-roll > span { display: block; animation: hb-wa4-roll 4s steps(3) infinite; }
.hb-wa4-roll > span > span { display: block; height: 28px; }
.hb-wa4-ok { margin-left: auto; padding: 4px 8px; border-radius: 6px; background: rgba(34, 197, 94, .12); color: #4ade80; font-size: 11px; font-weight: 600; }
.hb-wa4-foot { grid-column: 1 / 7; grid-row: 3; align-self: end; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 22px 32px; padding-bottom: 6px; }
.hb-wa4-foot div { display: grid; gap: 2px; }
.hb-wa4-foot b { font-family: var(--font-grotesk, inherit); font-size: 28px; font-weight: 600; letter-spacing: -.03em; }
.hb-wa4-foot span { color: #6f6f6f; font-size: 12.5px; }
.hb-wa4-cta { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 999px; background: #ededed; color: #0a0a0a; font-size: 14px; font-weight: 600; text-decoration: none; transition: transform .2s ease, background .2s ease; }
.hb-wa4-cta:hover { background: #fff; transform: translate3d(0, -1px, 0); }
.hb-wa4-cta:focus-visible { outline: 2px solid var(--hb-wa4-accent); outline-offset: 3px; }
@container (max-width: 820px) {
  .hb-wa4-grid { grid-template-columns: minmax(0, 1fr); padding-left: 26px; }
  .hb-wa4-head, .hb-wa4-step[data-i], .hb-wa4-foot { grid-column: 1; grid-row: auto; }
  .hb-wa4-head { margin-left: -26px; }
  .hb-wa4-foot { margin-left: -26px; }
  .hb-wa4-path { display: none; }
  .hb-wa4-step::before { content: ""; position: absolute; left: -19px; top: -22px; bottom: -22px; width: 2px; background: repeating-linear-gradient(#262626 0 4px, transparent 4px 10px); }
  .hb-wa4-step::after { content: ""; position: absolute; left: -23px; top: 26px; width: 10px; height: 10px; border-radius: 3px; background: var(--hb-wa4-accent); transform: rotate(45deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa4 *, .hb-wa4 *::before, .hb-wa4 *::after { animation: none !important; transition: none !important; }
  .hb-wa4-pulse { display: none; }
  .hb-wa4-maps path { stroke-dashoffset: 0; }
}
`;

const defaultSteps: FeaturesDiagonalFlowStep[] = [
  { title: "Connect your sources", body: "Authorize Postgres, Stripe and HubSpot in a few clicks. Credentials stay encrypted in your own region.", meta: "~2 min" },
  { title: "Map the fields once", body: "Tidewater suggests matches between schemas. Accept, tweak or write a transform in plain SQL.", meta: "38 suggestions" },
  { title: "Sync on every change", body: "Rows stream to every destination within seconds, with retries, ordering and a full replay log.", meta: "p95 1.8 s" },
];

const defaultFootnote = [
  { value: "2.4B", label: "rows synced last month" },
  { value: "140+", label: "connectors" },
];

function IllConnect() {
  return (
    <div className="hb-wa4-ill" aria-hidden="true">
      <i className="hb-wa4-wire" style={{ left: "64px", right: "64px" }} />
      <span className="hb-wa4-src hb-wa4-plug" style={{ left: "16px" }}>PG</span>
      <i className="hb-wa4-spark" />
      <span className="hb-wa4-src" style={{ right: "16px", borderColor: "rgba(34,211,238,.45)" }}>TW</span>
    </div>
  );
}

function IllMap() {
  const pairs = [["cust_email", "email"], ["amount_cents", "mrr"], ["created", "signup_at"], ["plan_tier", "segment"]];
  return (
    <div className="hb-wa4-ill" aria-hidden="true">
      <svg className="hb-wa4-maps" viewBox="0 0 100 92" preserveAspectRatio="none">
        <path d="M44 20 C 50 20, 50 20, 56 20" pathLength={1} />
        <path d="M44 38 C 50 38, 50 56, 56 56" pathLength={1} style={{ animationDelay: ".3s" }} />
        <path d="M44 56 C 50 56, 50 38, 56 38" pathLength={1} style={{ animationDelay: ".6s" }} />
        <path d="M44 74 C 50 74, 50 74, 56 74" pathLength={1} style={{ animationDelay: ".9s" }} />
      </svg>
      <div className="hb-wa4-fields">
        {pairs.map(([a, b]) => (
          <React.Fragment key={a}>
            <span>{a}</span>
            <span>{b}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function IllSync() {
  return (
    <div className="hb-wa4-ill" aria-hidden="true">
      <div className="hb-wa4-sync">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M20 12a8 8 0 0 1-13.7 5.6M4 12a8 8 0 0 1 13.7-5.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="hb-wa4-count">
          <small>rows this minute</small>
          <div className="hb-wa4-roll">
            <span>
              <span>18,204</span>
              <span>18,961</span>
              <span>19,437</span>
              <span>18,204</span>
            </span>
          </div>
        </div>
        <span className="hb-wa4-ok">Healthy</span>
      </div>
    </div>
  );
}

const ills = [IllConnect, IllMap, IllSync];

export function FeaturesDiagonalFlow({
  eyebrow = "Tidewater · how it works",
  title = "Three moves from scattered data to one source of truth",
  subtitle = "No pipelines to babysit. Set it up once over coffee and every tool your team uses stays in step.",
  steps = defaultSteps,
  footnote = defaultFootnote,
  cta = { label: "Start a free sync", href: "#" },
  accent = "#22d3ee",
  duration = 9,
  className,
  style,
  ...rest
}: FeaturesDiagonalFlowProps) {
  const shown = steps.slice(0, 3);
  return (
    <section className={["hb-wa4", className].filter(Boolean).join(" ")} style={{ "--hb-wa4-accent": accent, "--hb-wa4-d": `${duration}s`, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-features-diagonal-flow" precedence="default">{css}</style>
      <div className="hb-wa4-in">
        <div className="hb-wa4-grid">
          <svg className="hb-wa4-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="hb-wa4-base" d="M22 18 C 22 34, 52 30, 54 50 C 56 70, 84 66, 84 84" />
            <path className="hb-wa4-pulse" d="M22 18 C 22 34, 52 30, 54 50 C 56 70, 84 66, 84 84" pathLength={1} />
          </svg>
          <div className="hb-wa4-head">
            <p className="hb-wa4-eyebrow"><b />{eyebrow}</p>
            <h2 className="hb-wa4-title">{title}</h2>
            <p className="hb-wa4-sub">{subtitle}</p>
          </div>
          <ol style={{ display: "contents" }}>
            {shown.map((s, i) => {
              const Ill = ills[i];
              return (
                <li key={s.title} className="hb-wa4-step" data-i={i} style={{ "--i": i, listStyle: "none" } as React.CSSProperties}>
                  <div className="hb-wa4-top">
                    <span className="hb-wa4-num" aria-hidden="true">0{i + 1}</span>
                    <span className="hb-wa4-meta">{s.meta}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <Ill />
                </li>
              );
            })}
          </ol>
          <div className="hb-wa4-foot">
            {footnote.map((f) => (
              <div key={f.label}>
                <b>{f.value}</b>
                <span>{f.label}</span>
              </div>
            ))}
            {cta && <a className="hb-wa4-cta" href={cta.href}>{cta.label}</a>}
          </div>
        </div>
      </div>
    </section>
  );
}
