"use client";

import * as React from "react";

export interface OrbitItem {
  label: string;
  icon?: React.ReactNode;
  ring?: "inner" | "outer";
}

export interface OrbitCaption {
  title: string;
  description: string;
}

export interface FeaturesOrbitProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: OrbitItem[];
  captions?: OrbitCaption[];
  primaryCta?: { label: string; href: string } | null;
  secondaryCta?: { label: string; href: string } | null;
  mark?: React.ReactNode;
  speed?: number;
  onItemSelect?: (item: OrbitItem, index: number) => void;
  accent?: string;
}

const css = `
.hb-ka5 {
  --hb-ka5-accent: #22d3ee;
  --hb-ka5-speed: 60s;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ka5 *, .hb-ka5 *::before, .hb-ka5 *::after { box-sizing: border-box; }
.hb-ka5-wrap { position: relative; max-width: 1120px; margin: 0 auto; padding: 80px 24px 96px; }
.hb-ka5-top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  align-items: center;
  gap: 40px;
}
.hb-ka5-eyebrow {
  margin: 0 0 18px;
  color: var(--hb-ka5-accent);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .02em;
}
.hb-ka5-title {
  margin: 0;
  font-size: clamp(30px, 4.6cqw, 50px);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-ka5-sub { margin: 18px 0 0; max-width: 460px; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-ka5-ctas { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px; }
.hb-ka5-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  color: #ededed;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background .2s ease, border-color .2s ease, transform .2s ease;
}
.hb-ka5-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .2); }
.hb-ka5-btn:active { transform: scale(.98); }
.hb-ka5-btn:focus-visible { outline: 2px solid var(--hb-ka5-accent); outline-offset: 3px; }
.hb-ka5-btn[data-primary="true"] { border-color: transparent; background: #ededed; color: #0a0a0a; }
.hb-ka5-btn[data-primary="true"]:hover { background: #fff; }
.hb-ka5-stage {
  position: relative;
  width: min(100%, 520px);
  aspect-ratio: 1;
  margin: 0 auto;
  container-type: inline-size;
}
.hb-ka5-glow {
  position: absolute;
  inset: 18%;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-ka5-accent) 22%, transparent), transparent);
  filter: blur(10px);
}
.hb-ka5-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 50%;
  animation: hb-ka5-spin var(--hb-ka5-speed) linear infinite;
}
.hb-ka5-ring[data-ring="inner"] { width: 58cqw; height: 58cqw; margin: -29cqw 0 0 -29cqw; animation-duration: calc(var(--hb-ka5-speed) * .7); }
.hb-ka5-ring[data-ring="outer"] { width: 88cqw; height: 88cqw; margin: -44cqw 0 0 -44cqw; border-style: dashed; border-color: rgba(255, 255, 255, .09); animation-direction: reverse; }
.hb-ka5-ring::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0 78%, color-mix(in srgb, var(--hb-ka5-accent) 70%, transparent) 96%, transparent 100%);
  -webkit-mask: radial-gradient(closest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px));
  mask: radial-gradient(closest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px));
  pointer-events: none;
}
.hb-ka5-slot { position: absolute; top: 50%; left: 50%; width: 0; height: 0; }
.hb-ka5-slot:hover, .hb-ka5-slot:focus-within { z-index: 3; }
.hb-ka5-counter {
  position: absolute;
  top: 0;
  left: 0;
  animation: hb-ka5-spin var(--hb-ka5-speed) linear infinite reverse;
}
.hb-ka5-ring[data-ring="inner"] .hb-ka5-counter { animation-duration: calc(var(--hb-ka5-speed) * .7); }
.hb-ka5-ring[data-ring="outer"] .hb-ka5-counter { animation-direction: normal; }
.hb-ka5-stage:hover .hb-ka5-ring, .hb-ka5-stage:hover .hb-ka5-counter,
.hb-ka5-stage:focus-within .hb-ka5-ring, .hb-ka5-stage:focus-within .hb-ka5-counter { animation-play-state: paused; }
@keyframes hb-ka5-spin { to { transform: rotate(360deg); } }
.hb-ka5-chip {
  position: absolute;
  top: -23px;
  left: -23px;
  display: flex;
  align-items: center;
  height: 46px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: linear-gradient(180deg, #1a1a1d, #111113);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 10px 24px -10px rgba(0, 0, 0, .9);
  color: #d4d4d4;
  font: inherit;
  cursor: pointer;
  transition: border-color .25s ease, box-shadow .25s ease, background .25s ease;
}
.hb-ka5-chip:focus-visible { outline: 2px solid var(--hb-ka5-accent); outline-offset: 3px; }
.hb-ka5-ico { display: flex; align-items: center; justify-content: center; flex: none; width: 44px; height: 44px; }
.hb-ka5-ico svg { width: 20px; height: 20px; }
.hb-ka5-label {
  max-width: 0;
  overflow: hidden;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  transition: max-width .35s cubic-bezier(.2, .8, .2, 1), opacity .25s ease, padding .35s ease;
}
.hb-ka5-chip:hover, .hb-ka5-chip:focus-visible {
  border-color: color-mix(in srgb, var(--hb-ka5-accent) 60%, transparent);
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-ka5-accent) 16%, #1a1a1d), #111113);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 0 0 4px color-mix(in srgb, var(--hb-ka5-accent) 12%, transparent), 0 14px 30px -10px rgba(0, 0, 0, .9);
  color: #fff;
}
.hb-ka5-chip:hover .hb-ka5-label, .hb-ka5-chip:focus-visible .hb-ka5-label { max-width: 160px; padding-right: 16px; opacity: 1; }
.hb-ka5-core {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22cqw;
  height: 22cqw;
  margin: -11cqw 0 0 -11cqw;
  border: 1px solid color-mix(in srgb, var(--hb-ka5-accent) 50%, rgba(255, 255, 255, .2));
  border-radius: 28%;
  background:
    radial-gradient(120% 120% at 30% 0%, rgba(255, 255, 255, .22), transparent 50%),
    linear-gradient(160deg, color-mix(in srgb, var(--hb-ka5-accent) 75%, #0a0a0a), color-mix(in srgb, var(--hb-ka5-accent) 25%, #0a0a0a));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 0 0 8px rgba(255, 255, 255, .02), 0 20px 60px -10px color-mix(in srgb, var(--hb-ka5-accent) 55%, transparent);
  color: #fff;
  animation: hb-ka5-breathe 4s ease-in-out infinite;
}
.hb-ka5-core svg { width: 46%; height: 46%; }
@keyframes hb-ka5-breathe {
  0%, 100% { box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 0 0 8px rgba(255, 255, 255, .02), 0 20px 60px -10px color-mix(in srgb, var(--hb-ka5-accent) 55%, transparent); }
  50% { box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 0 0 14px rgba(255, 255, 255, .025), 0 20px 80px -6px color-mix(in srgb, var(--hb-ka5-accent) 75%, transparent); }
}
.hb-ka5-caps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin: 56px 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid rgba(255, 255, 255, .08);
}
.hb-ka5-cap { padding: 24px 24px 0 0; }
.hb-ka5-cap + .hb-ka5-cap { padding-left: 24px; border-left: 1px solid rgba(255, 255, 255, .08); }
.hb-ka5-cap-title { display: flex; align-items: center; gap: 8px; margin: 0; font-size: 15px; font-weight: 600; }
.hb-ka5-cap-title::before { content: ""; width: 6px; height: 6px; border-radius: 2px; background: var(--hb-ka5-accent); }
.hb-ka5-cap-desc { margin: 8px 0 0; color: #8f8f8f; font-size: 14px; line-height: 1.6; }
@container (max-width: 820px) {
  .hb-ka5-top { grid-template-columns: minmax(0, 1fr); gap: 48px; }
  .hb-ka5-stage { width: min(100%, 460px); }
  .hb-ka5-caps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-ka5-cap:nth-child(3) { padding-left: 0; border-left: 0; }
  .hb-ka5-cap:nth-child(n + 3) { padding-top: 28px; }
}
@container (max-width: 480px) {
  .hb-ka5-wrap { padding: 64px 16px 72px; }
  .hb-ka5-caps { grid-template-columns: minmax(0, 1fr); margin-top: 40px; }
  .hb-ka5-cap, .hb-ka5-cap + .hb-ka5-cap { padding: 20px 0 0; border-left: 0; }
  .hb-ka5-chip { top: -18px; left: -18px; height: 36px; }
  .hb-ka5-ico { width: 34px; height: 34px; }
  .hb-ka5-ico svg { width: 16px; height: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ka5-ring, .hb-ka5-counter, .hb-ka5-core { animation: none; }
  .hb-ka5-label, .hb-ka5-chip, .hb-ka5-btn { transition: none; }
}
`;

function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const defaultItems: OrbitItem[] = [
  { label: "Two-way sync", ring: "inner", icon: <Glyph d="M4 9h13l-3-3M20 15H7l3 3" /> },
  { label: "Search", ring: "inner", icon: <Glyph d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4" /> },
  { label: "Webhooks", ring: "inner", icon: <Glyph d="M9 7a3 3 0 1 1 4.5 2.6L16 15M7 17a3 3 0 1 1 2-5.2M17 18a3 3 0 1 1-.2-5.9L9.5 12" /> },
  { label: "Audit log", ring: "inner", icon: <Glyph d="M6 3h9l4 4v14H6zM9 12h7M9 16h7M9 8h3" /> },
  { label: "Single sign-on", ring: "outer", icon: <Glyph d="M5 11h14v10H5zM8 11V8a4 4 0 0 1 8 0v3" /> },
  { label: "Daily backups", ring: "outer", icon: <Glyph d="M4 7c0-2 3.6-3 8-3s8 1 8 3-3.6 3-8 3-8-1-8-3zM4 7v10c0 2 3.6 3 8 3s8-1 8-3V7M4 12c0 2 3.6 3 8 3s8-1 8-3" /> },
  { label: "Analytics", ring: "outer", icon: <Glyph d="M4 20V10M10 20V4M16 20v-7M22 20H2" /> },
  { label: "Automations", ring: "outer", icon: <Glyph d="M13 2L4 14h7l-1 8 9-12h-7z" /> },
  { label: "140 integrations", ring: "outer", icon: <Glyph d="M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-12 0zM12 18v3" /> },
  { label: "REST and GraphQL", ring: "outer", icon: <Glyph d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /> },
];

const defaultCaptions: OrbitCaption[] = [
  { title: "Real-time sync", description: "Changes flow both ways in under 300 ms, with conflict rules you can read and audit." },
  { title: "Typed schema", description: "One schema for every connected tool, versioned like code and checked on every write." },
  { title: "Granular access", description: "Scope tokens to a table, a field or a single record, and rotate them without downtime." },
  { title: "Replay anything", description: "Every event is kept for 90 days, so a broken sync is a replay away from fixed." },
];

const defaultMark = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.3 5.3l2.8 2.8M15.9 15.9l2.8 2.8M18.7 5.3l-2.8 2.8M8.1 15.9l-2.8 2.8" />
  </svg>
);

function slotTransform(angle: number, radius: string) {
  return `rotate(${angle.toFixed(2)}deg) translateX(${radius}) rotate(${(-angle).toFixed(2)}deg)`;
}

export function FeaturesOrbit({
  eyebrow = "The Nimbus core",
  title = "One source of truth. Every tool your team already uses.",
  subtitle = "Nimbus sits in the middle of your stack and keeps records, permissions and events consistent everywhere they show up.",
  items = defaultItems,
  captions = defaultCaptions,
  primaryCta = { label: "Browse integrations", href: "#" },
  secondaryCta = { label: "Read the docs", href: "#" },
  mark = defaultMark,
  speed = 60,
  onItemSelect,
  accent = "#22d3ee",
  className = "",
  style,
  ...rest
}: FeaturesOrbitProps) {
  const uid = React.useId();
  const inner = items.map((item, index) => ({ item, index })).filter((e) => (e.item.ring ?? "outer") === "inner");
  const outer = items.map((item, index) => ({ item, index })).filter((e) => (e.item.ring ?? "outer") !== "inner");
  const vars = { "--hb-ka5-accent": accent, "--hb-ka5-speed": `${Math.max(speed, 4)}s`, ...style } as React.CSSProperties;

  function ring(list: { item: OrbitItem; index: number }[], name: "inner" | "outer", radius: string, offset: number) {
    return (
      <div className="hb-ka5-ring" data-ring={name}>
        {list.map(({ item, index }, k) => {
          const angle = offset + (360 / list.length) * k;
          return (
            <div key={`${item.label}-${index}`} className="hb-ka5-slot" style={{ transform: slotTransform(angle, radius) }}>
              <div className="hb-ka5-counter">
                <button type="button" className="hb-ka5-chip" aria-label={item.label} onClick={() => onItemSelect?.(item, index)}>
                  <span className="hb-ka5-ico">{item.icon ?? <Glyph d="M12 5v14M5 12h14" />}</span>
                  <span className="hb-ka5-label" aria-hidden="true">{item.label}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section className={`hb-ka5 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-features-orbit" precedence="default">{css}</style>
      <div className="hb-ka5-wrap">
        <div className="hb-ka5-top">
          <div>
            {eyebrow && <p className="hb-ka5-eyebrow">{eyebrow}</p>}
            <h2 id={`${uid}-t`} className="hb-ka5-title">{title}</h2>
            {subtitle && <p className="hb-ka5-sub">{subtitle}</p>}
            {(primaryCta || secondaryCta) && (
              <div className="hb-ka5-ctas">
                {primaryCta && (
                  <a className="hb-ka5-btn" data-primary="true" href={primaryCta.href}>
                    {primaryCta.label}
                  </a>
                )}
                {secondaryCta && (
                  <a className="hb-ka5-btn" href={secondaryCta.href}>
                    {secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="hb-ka5-stage" role="group" aria-label="Capabilities">
            <div className="hb-ka5-glow" aria-hidden="true" />
            {ring(outer, "outer", "44cqw", -90)}
            {ring(inner, "inner", "29cqw", -45)}
            <div className="hb-ka5-core">{mark}</div>
          </div>
        </div>
        {captions.length > 0 && (
          <ul className="hb-ka5-caps">
            {captions.map((c) => (
              <li key={c.title} className="hb-ka5-cap">
                <h3 className="hb-ka5-cap-title">{c.title}</h3>
                <p className="hb-ka5-cap-desc">{c.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
