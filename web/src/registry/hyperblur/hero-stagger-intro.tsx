"use client";

import * as React from "react";

export interface HeroStaggerIntroLink {
  label: string;
  href: string;
}

export interface HeroStaggerIntroProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "title"> {
  eyebrow?: string;
  lines?: string[];
  subtitle?: string;
  primary?: HeroStaggerIntroLink;
  secondary?: HeroStaggerIntroLink | null;
  visual?: React.ReactNode;
  replay?: string | number;
  stagger?: number;
  duration?: number;
  accent?: string;
}

const css = `
.hb-zb6 {
  --hb-zb6-a: #3ddc97;
  --hb-zb6-st: 120ms;
  --hb-zb6-du: 900ms;
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
  container-type: inline-size;
  overflow: hidden;
  color: #ededed;
  font-family: inherit;
  background:
    radial-gradient(50% 60% at 82% 30%, color-mix(in srgb, var(--hb-zb6-a) 13%, transparent), transparent 70%),
    radial-gradient(40% 50% at 8% 100%, rgba(255, 255, 255, 0.04), transparent 70%);
}
.hb-zb6 *, .hb-zb6 *::before, .hb-zb6 *::after { box-sizing: border-box; font-family: inherit; }
.hb-zb6-in {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(24px, 5.5cqw, 64px);
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(36px, 7cqw, 96px) clamp(20px, 5cqw, 56px);
}
.hb-zb6-in[data-solo="true"] { grid-template-columns: minmax(0, 1fr); }
.hb-zb6-tx { display: flex; flex-direction: column; align-items: flex-start; min-width: 0; }
.hb-zb6-it {
  animation: hb-zb6-rise var(--hb-zb6-du) cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--hb-zb6-i, 0) * var(--hb-zb6-st));
}
.hb-zb6-vi {
  min-width: 0;
  animation: hb-zb6-vrise calc(var(--hb-zb6-du) * 1.25) cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--hb-zb6-i, 0) * var(--hb-zb6-st));
}
.hb-zb6-eb {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px 5px 9px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  font-size: 12px;
  font-weight: 500;
  color: #c9c9c9;
  margin-bottom: clamp(14px, 2.4cqw, 22px);
}
.hb-zb6-eb i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--hb-zb6-a);
  box-shadow: 0 0 10px var(--hb-zb6-a);
}
.hb-zb6-h {
  margin: 0;
  font-size: clamp(30px, 5.2cqw, 60px);
  font-weight: 650;
  line-height: 1.03;
  letter-spacing: -0.04em;
  color: #ffffff;
}
.hb-zb6-hl { display: block; }
.hb-zb6-hl[data-last="true"] {
  background: linear-gradient(95deg, #ffffff 0%, color-mix(in srgb, var(--hb-zb6-a) 70%, #ffffff) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-zb6-sub {
  margin: clamp(14px, 2.2cqw, 22px) 0 0;
  max-width: 42ch;
  font-size: clamp(14px, 1.9cqw, 18px);
  line-height: 1.55;
  color: #a1a1a1;
}
.hb-zb6-cta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: clamp(18px, 3cqw, 30px); }
.hb-zb6-b {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  color: #ededed;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, border-color 0.2s ease;
}
.hb-zb6-b:hover { transform: translateY(-2px); background: rgba(255, 255, 255, 0.09); border-color: rgba(255, 255, 255, 0.24); }
.hb-zb6-b:active { transform: scale(0.97); }
.hb-zb6-b:focus-visible { outline: 2px solid var(--hb-zb6-a); outline-offset: 3px; }
.hb-zb6-b[data-primary="true"] {
  color: #06130d;
  border-color: transparent;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-zb6-a) 60%, #ffffff), var(--hb-zb6-a));
  box-shadow: 0 8px 28px color-mix(in srgb, var(--hb-zb6-a) 38%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
.hb-zb6-b[data-primary="true"]:hover { filter: brightness(1.06); }
.hb-zb6-vis { position: relative; width: 100%; padding: 6px 0 18px; }
.hb-zb6-win {
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, #161616, #0f0f0f);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transform: perspective(1200px) rotateY(-7deg) rotateX(3deg);
}
.hb-zb6-wb { display: flex; align-items: center; gap: 6px; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); font-size: 11px; color: #8f8f8f; }
.hb-zb6-wb i { width: 8px; height: 8px; border-radius: 50%; background: rgba(255, 255, 255, 0.14); }
.hb-zb6-wb span { margin-left: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-zb6-k { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; background: rgba(255, 255, 255, 0.06); }
.hb-zb6-k div { display: flex; flex-direction: column; gap: 3px; padding: 11px 12px; background: #121212; }
.hb-zb6-k b { font-size: 15px; font-weight: 650; letter-spacing: -0.02em; color: #ffffff; white-space: nowrap; }
.hb-zb6-k span { font-size: 10.5px; color: #8f8f8f; white-space: nowrap; }
.hb-zb6-sp { display: block; width: 100%; height: 64px; }
.hb-zb6-rows { margin: 0; padding: 4px 0 6px; list-style: none; }
.hb-zb6-rows li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  font-size: 11.5px;
  color: #c9c9c9;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.hb-zb6-rows li:first-child { border-top: 0; }
.hb-zb6-rows em { flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-zb6-a); }
.hb-zb6-rows em[data-t="slow"] { background: #ffb454; }
.hb-zb6-rows code { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: ui-monospace, "Geist Mono", monospace; font-size: 11px; }
.hb-zb6-rows span { flex: none; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-zb6-chip {
  position: absolute;
  left: -4%;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(24, 24, 24, 0.92);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
  font-size: 11.5px;
  color: #c9c9c9;
  white-space: nowrap;
  animation: hb-zb6-float 5.5s ease-in-out 2s infinite;
}
.hb-zb6-chip i { width: 7px; height: 7px; border-radius: 50%; background: var(--hb-zb6-a); box-shadow: 0 0 8px var(--hb-zb6-a); }
.hb-zb6-chip b { color: var(--hb-zb6-a); font-weight: 650; }
@container (max-width: 640px) {
  .hb-zb6-in { grid-template-columns: minmax(0, 1fr); gap: 32px; padding: 40px 20px 36px; }
  .hb-zb6-h { font-size: clamp(30px, 9cqw, 44px); }
  .hb-zb6-sub { font-size: 15px; }
  .hb-zb6-win { transform: none; }
  .hb-zb6-chip { left: 8px; }
}
@keyframes hb-zb6-rise {
  from { opacity: 0; transform: translateY(26px); filter: blur(14px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes hb-zb6-vrise {
  from { opacity: 0; transform: translateY(44px) scale(0.94); filter: blur(18px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes hb-zb6-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-zb6-it, .hb-zb6-vi, .hb-zb6-chip { animation: none; }
  .hb-zb6-b { transition: none; }
}
`;

const defaultLines = ["Know what broke", "before users do."];

function Visual() {
  const uid = React.useId().replace(/:/g, "");
  return (
    <div className="hb-zb6-vis">
      <div className="hb-zb6-win">
        <div className="hb-zb6-wb">
          <i />
          <i />
          <i />
          <span>api.plume.dev / overview</span>
        </div>
        <div className="hb-zb6-k">
          <div>
            <b>99.98%</b>
            <span>Uptime</span>
          </div>
          <div>
            <b>182 ms</b>
            <span>p95 latency</span>
          </div>
          <div>
            <b>0.04%</b>
            <span>Error rate</span>
          </div>
        </div>
        <svg className="hb-zb6-sp" viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: "var(--hb-zb6-a)", stopOpacity: 0.3 }} />
              <stop offset="1" style={{ stopColor: "var(--hb-zb6-a)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path
            d="M0 46 C20 42 30 50 50 38 S80 26 100 33 S130 16 150 22 S190 10 210 18 S250 6 300 10 V64 H0 Z"
            fill={`url(#${uid}-g)`}
          />
          <path
            d="M0 46 C20 42 30 50 50 38 S80 26 100 33 S130 16 150 22 S190 10 210 18 S250 6 300 10"
            fill="none"
            style={{ stroke: "var(--hb-zb6-a)", strokeWidth: 2, vectorEffect: "non-scaling-stroke" }}
          />
        </svg>
        <ul className="hb-zb6-rows">
          <li>
            <em />
            <code>POST /v1/checkout</code>
            <span>112 ms</span>
          </li>
          <li>
            <em />
            <code>GET /v1/orders</code>
            <span>94 ms</span>
          </li>
          <li>
            <em data-t="slow" />
            <code>POST /v1/webhooks</code>
            <span>640 ms</span>
          </li>
        </ul>
      </div>
      <div className="hb-zb6-chip">
        <i />
        Deploy 4f2a9c <b>p95 down 24%</b>
      </div>
    </div>
  );
}

export function HeroStaggerIntro({
  eyebrow = "Plume 2.0 is live",
  lines = defaultLines,
  subtitle = "Plume watches every endpoint, trace and deploy, then tells you what changed in plain words.",
  primary = { label: "Start free", href: "#" },
  secondary = { label: "Watch the demo", href: "#" },
  visual,
  replay = 0,
  stagger = 120,
  duration = 900,
  accent = "#3ddc97",
  className = "",
  style,
  ...rest
}: HeroStaggerIntroProps) {
  const L = lines.length;
  let order = 0;
  const at = (i: number) => ({ "--hb-zb6-i": i }) as React.CSSProperties;
  const eyebrowIndex = order++;
  const lineIndex = lines.map(() => order++);
  const subIndex = order++;
  const ctaIndex = order++;
  const visIndex = order++;
  const showVisual = visual !== null;

  return (
    <section
      className={`hb-zb6 ${className}`.trim()}
      style={{ "--hb-zb6-a": accent, "--hb-zb6-st": `${stagger}ms`, "--hb-zb6-du": `${duration}ms`, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-hero-stagger-intro" precedence="default">{css}</style>
      <div className="hb-zb6-in" key={String(replay)} data-solo={showVisual ? "false" : "true"}>
        <div className="hb-zb6-tx">
          {eyebrow ? (
            <span className="hb-zb6-it hb-zb6-eb" style={at(eyebrowIndex)}>
              <i aria-hidden="true" />
              {eyebrow}
            </span>
          ) : null}
          <h1 className="hb-zb6-h">
            {lines.map((line, i) => (
              <span key={i} className="hb-zb6-it hb-zb6-hl" data-last={i === L - 1 && L > 1 ? "true" : "false"} style={at(lineIndex[i])}>
                {line}
              </span>
            ))}
          </h1>
          {subtitle ? (
            <p className="hb-zb6-it hb-zb6-sub" style={at(subIndex)}>
              {subtitle}
            </p>
          ) : null}
          <div className="hb-zb6-it hb-zb6-cta" style={at(ctaIndex)}>
            <a className="hb-zb6-b" data-primary="true" href={primary.href}>
              {primary.label}
            </a>
            {secondary ? (
              <a className="hb-zb6-b" href={secondary.href}>
                {secondary.label}
              </a>
            ) : null}
          </div>
        </div>
        {showVisual ? (
          <div className="hb-zb6-vi" style={at(visIndex)}>
            {visual ?? <Visual />}
          </div>
        ) : null}
      </div>
    </section>
  );
}
