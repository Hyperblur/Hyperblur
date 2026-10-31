"use client";

import * as React from "react";

export interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface FeaturesSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
  columns?: 2 | 3 | 4;
  layout?: "grid" | "list";
  accent?: string;
}

const css = `
.hb-fs {
  --hb-fs-accent: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  padding: 96px 24px;
  background: #07070a;
  color: #f2f2f5;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.hb-fs *, .hb-fs *::before, .hb-fs *::after { box-sizing: border-box; }
.hb-fs-wrap { max-width: 1120px; margin: 0 auto; }
.hb-fs-head { max-width: 640px; margin: 0 auto 56px; text-align: center; }
.hb-fs-eyebrow {
  display: inline-block;
  margin: 0 0 16px;
  padding: 5px 12px;
  border: 1px solid color-mix(in srgb, var(--hb-fs-accent) 45%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-fs-accent) 12%, transparent);
  color: color-mix(in srgb, var(--hb-fs-accent) 70%, #fff);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-fs-title {
  margin: 0;
  font-size: clamp(30px, 4.4vw, 46px);
  font-weight: 650;
  line-height: 1.1;
  letter-spacing: -.02em;
}
.hb-fs-sub {
  margin: 16px 0 0;
  font-size: clamp(15px, 1.6vw, 17px);
  line-height: 1.6;
  color: rgba(255, 255, 255, .62);
}
.hb-fs-grid {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.hb-fs-grid[data-cols="2"] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.hb-fs-grid[data-cols="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.hb-fs-grid[data-layout="list"] { grid-template-columns: minmax(0, 1fr); max-width: 760px; margin: 0 auto; }
.hb-fs-card {
  --hb-fs-x: 50%;
  --hb-fs-y: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  overflow: hidden;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 16px;
  background: rgba(255, 255, 255, .03);
  transition: transform .3s cubic-bezier(.22, .8, .24, 1), border-color .3s ease, box-shadow .3s ease;
}
.hb-fs-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(240px circle at var(--hb-fs-x) var(--hb-fs-y), color-mix(in srgb, var(--hb-fs-accent) 24%, transparent), transparent 70%);
  opacity: 0;
  transition: opacity .3s ease;
}
.hb-fs-card:hover {
  transform: translate3d(0, -4px, 0);
  border-color: rgba(255, 255, 255, .22);
  box-shadow: 0 18px 36px -16px rgba(0, 0, 0, .8);
}
.hb-fs-card:hover::before { opacity: 1; }
.hb-fs-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  margin-bottom: 6px;
  border: 1px solid color-mix(in srgb, var(--hb-fs-accent) 40%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, var(--hb-fs-accent) 14%, transparent);
  color: color-mix(in srgb, var(--hb-fs-accent) 75%, #fff);
}
.hb-fs-icon svg { width: 20px; height: 20px; }
.hb-fs-body { position: relative; min-width: 0; }
.hb-fs-card-title { margin: 0; font-size: 16px; font-weight: 600; line-height: 1.3; }
.hb-fs-card-desc { margin: 6px 0 0; font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, .6); }
.hb-fs-grid[data-layout="list"] .hb-fs-card { flex-direction: row; align-items: flex-start; gap: 16px; }
.hb-fs-grid[data-layout="list"] .hb-fs-icon { margin-bottom: 0; }
@media (max-width: 1023px) {
  .hb-fs-grid[data-cols="3"], .hb-fs-grid[data-cols="4"] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 767px) {
  .hb-fs { padding: 64px 16px; }
  .hb-fs-head { margin-bottom: 36px; }
  .hb-fs-grid, .hb-fs-grid[data-cols="2"], .hb-fs-grid[data-cols="3"], .hb-fs-grid[data-cols="4"] { grid-template-columns: minmax(0, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-fs-card, .hb-fs-card::before { transition: none; }
  .hb-fs-card:hover { transform: none; }
}
`;

function Glyph({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const defaultFeatures: FeatureItem[] = [
  {
    icon: (
      <Glyph>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </Glyph>
    ),
    title: "Lightning fast",
    description: "Pages render in milliseconds with edge caching and zero layout shift, so nothing ever feels slow.",
  },
  {
    icon: (
      <Glyph>
        <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </Glyph>
    ),
    title: "Secure by default",
    description: "Encryption in transit and at rest, audit logs and granular roles come built in on every plan.",
  },
  {
    icon: (
      <Glyph>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M15.5 14.2c3 0 5.5 2 5.5 5" />
      </Glyph>
    ),
    title: "Built for teams",
    description: "Share workspaces, leave comments and review changes together without stepping on each other.",
  },
  {
    icon: (
      <Glyph>
        <path d="M4 20V10" />
        <path d="M10 20V4" />
        <path d="M16 20v-8" />
        <path d="M22 20H2" />
      </Glyph>
    ),
    title: "Clear analytics",
    description: "Understand what works with live dashboards that surface the few numbers that actually matter.",
  },
  {
    icon: (
      <Glyph>
        <path d="M8 8l-5 4 5 4" />
        <path d="M16 8l5 4-5 4" />
        <path d="M14 5l-4 14" />
      </Glyph>
    ),
    title: "Developer friendly",
    description: "A typed API, copy-paste snippets and webhooks for every event keep integration painless.",
  },
  {
    icon: (
      <Glyph>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </Glyph>
    ),
    title: "Always in sync",
    description: "Changes propagate across devices instantly, and offline edits merge cleanly when you reconnect.",
  },
];

function FeatureCard({ feature }: { feature: FeatureItem }) {
  function handleMove(e: React.PointerEvent<HTMLLIElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hb-fs-x", `${(e.clientX - r.left).toFixed(1)}px`);
    el.style.setProperty("--hb-fs-y", `${(e.clientY - r.top).toFixed(1)}px`);
  }

  return (
    <li className="hb-fs-card" onPointerMove={handleMove}>
      {feature.icon != null && <span className="hb-fs-icon">{feature.icon}</span>}
      <div className="hb-fs-body">
        <h3 className="hb-fs-card-title">{feature.title}</h3>
        <p className="hb-fs-card-desc">{feature.description}</p>
      </div>
    </li>
  );
}

export function FeaturesSection({
  eyebrow = "Features",
  title = "Everything you need to ship faster",
  subtitle = "A focused set of tools that stay out of your way, so your team can spend its time on the work that matters.",
  features = defaultFeatures,
  columns = 3,
  layout = "grid",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: FeaturesSectionProps) {
  const uid = React.useId();
  const cols = columns === 2 || columns === 4 ? columns : 3;
  const vars = { "--hb-fs-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-fs ${className}`} style={vars} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-features-section" precedence="default">{css}</style>
      <div className="hb-fs-wrap">
        <header className="hb-fs-head">
          {eyebrow && <p className="hb-fs-eyebrow">{eyebrow}</p>}
          <h2 id={`${uid}-title`} className="hb-fs-title">{title}</h2>
          {subtitle && <p className="hb-fs-sub">{subtitle}</p>}
        </header>
        <ul className="hb-fs-grid" data-cols={cols} data-layout={layout}>
          {features.map((feature, i) => (
            <FeatureCard key={`${feature.title}-${i}`} feature={feature} />
          ))}
        </ul>
      </div>
    </section>
  );
}
