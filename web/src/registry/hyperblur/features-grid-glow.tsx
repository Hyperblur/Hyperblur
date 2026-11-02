"use client";

import * as React from "react";

export interface GlowFeature {
  icon?: React.ReactNode;
  title: string;
  description: string;
  meta?: string;
}

export interface FeaturesGridGlowProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: GlowFeature[];
  cta?: { label: string; href: string };
  accent?: string;
}

const css = `
.hb-ka1 {
  --hb-ka1-accent: #8b5cf6;
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
.hb-ka1 *, .hb-ka1 *::before, .hb-ka1 *::after { box-sizing: border-box; }
.hb-ka1::before {
  content: "";
  position: absolute;
  inset: -20% -10% auto;
  height: 520px;
  pointer-events: none;
  background:
    radial-gradient(520px 260px at 18% 0%, color-mix(in srgb, var(--hb-ka1-accent) 18%, transparent), transparent 70%),
    radial-gradient(420px 220px at 90% 10%, rgba(255, 255, 255, .05), transparent 70%);
}
.hb-ka1-wrap {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 88px 24px 104px;
}
.hb-ka1-head {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  align-items: end;
  gap: 32px 64px;
  margin-bottom: 48px;
}
.hb-ka1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  color: #a1a1a1;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .01em;
}
.hb-ka1-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-ka1-accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-ka1-accent) 22%, transparent);
}
.hb-ka1-title {
  margin: 0;
  max-width: 560px;
  font-size: clamp(30px, 4.6cqw, 48px);
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-ka1-side { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; }
.hb-ka1-sub {
  margin: 0;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
}
.hb-ka1-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  color: #ededed;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background .2s ease, border-color .2s ease;
}
.hb-ka1-link:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .2); }
.hb-ka1-link:focus-visible { outline: 2px solid var(--hb-ka1-accent); outline-offset: 3px; }
.hb-ka1-link svg { width: 14px; height: 14px; transition: transform .2s ease; }
.hb-ka1-link:hover svg { transform: translateX(2px); }
.hb-ka1-grid {
  --hb-ka1-o: .55;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-ka1-grid[data-active="true"] { --hb-ka1-o: 1; }
.hb-ka1-card {
  --hb-ka1-x: -400px;
  --hb-ka1-y: -400px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 212px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 18px;
  background: linear-gradient(180deg, #121214, #0d0d0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
  transition: transform .35s cubic-bezier(.2, .8, .2, 1), box-shadow .35s ease;
  isolation: isolate;
}
.hb-ka1-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  z-index: -1;
  padding: 1px;
  border-radius: inherit;
  background: radial-gradient(280px circle at var(--hb-ka1-x) var(--hb-ka1-y), var(--hb-ka1-accent), rgba(255, 255, 255, .12) 35%, transparent 65%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  opacity: var(--hb-ka1-o);
  transition: opacity .4s ease;
  pointer-events: none;
}
.hb-ka1-card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: radial-gradient(420px circle at var(--hb-ka1-x) var(--hb-ka1-y), color-mix(in srgb, var(--hb-ka1-accent) 13%, transparent), transparent 60%);
  opacity: var(--hb-ka1-o);
  transition: opacity .4s ease;
  pointer-events: none;
}
.hb-ka1-card:hover {
  transform: translateY(-4px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .07), 0 24px 48px -24px rgba(0, 0, 0, .9), 0 0 0 1px rgba(255, 255, 255, .04);
}
.hb-ka1-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin-bottom: 28px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .08), rgba(255, 255, 255, .02));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 8px 20px -8px color-mix(in srgb, var(--hb-ka1-accent) 50%, transparent);
  color: color-mix(in srgb, var(--hb-ka1-accent) 55%, #fff);
}
.hb-ka1-icon svg { width: 20px; height: 20px; }
.hb-ka1-card-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -.01em;
}
.hb-ka1-card-desc {
  margin: 8px 0 0;
  color: #8f8f8f;
  font-size: 14px;
  line-height: 1.6;
}
.hb-ka1-meta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 20px;
  color: #6f6f6f;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
}
.hb-ka1-meta::before {
  content: "";
  width: 14px;
  height: 1px;
  background: color-mix(in srgb, var(--hb-ka1-accent) 70%, transparent);
}
@container (max-width: 880px) {
  .hb-ka1-head { grid-template-columns: minmax(0, 1fr); gap: 20px; }
  .hb-ka1-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (max-width: 560px) {
  .hb-ka1-wrap { padding: 64px 16px 72px; }
  .hb-ka1-head { margin-bottom: 32px; }
  .hb-ka1-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-ka1-card { min-height: 0; padding: 20px; }
  .hb-ka1-icon { margin-bottom: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ka1-card, .hb-ka1-card::before, .hb-ka1-card::after, .hb-ka1-link, .hb-ka1-link svg { transition: none; }
  .hb-ka1-card:hover { transform: none; }
}
`;

function Glyph({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const defaultFeatures: GlowFeature[] = [
  {
    icon: (
      <Glyph>
        <path d="M12 3v4" />
        <path d="M12 17v4" />
        <path d="M5 12H3" />
        <path d="M21 12h-2" />
        <circle cx="12" cy="12" r="5" />
      </Glyph>
    ),
    title: "Edge deploys in 9 seconds",
    description: "Push to main and your build lands in 34 regions before the pull request tab finishes loading.",
    meta: "p95 build 8.7s",
  },
  {
    icon: (
      <Glyph>
        <path d="M6 3v12" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="6" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </Glyph>
    ),
    title: "A preview for every branch",
    description: "Each branch gets its own URL with seeded data, so reviewers click through the change instead of reading it.",
    meta: "1,240 previews / day",
  },
  {
    icon: (
      <Glyph>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
        <path d="M12 8v4l3 2" />
      </Glyph>
    ),
    title: "Instant rollbacks",
    description: "Every deploy is immutable. Point traffic back to any previous version with one click or one CLI command.",
    meta: "median 0.8s",
  },
  {
    icon: (
      <Glyph>
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
      </Glyph>
    ),
    title: "Observability built in",
    description: "Logs, traces and Web Vitals for every route, sampled at full fidelity and kept for 30 days.",
    meta: "30-day retention",
  },
  {
    icon: (
      <Glyph>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </Glyph>
    ),
    title: "Roles that match your org",
    description: "SAML single sign-on, SCIM provisioning and per-project roles, with an audit trail for every change.",
    meta: "SOC 2 Type II",
  },
  {
    icon: (
      <Glyph>
        <path d="M4 7h16" />
        <path d="M4 12h10" />
        <path d="M4 17h6" />
        <path d="M17 14l3 3-3 3" />
      </Glyph>
    ),
    title: "Pay for what runs",
    description: "Usage is metered per request and per gigabyte, with spend alerts before anything surprises finance.",
    meta: "from $0.40 / 1M req",
  },
];

export function FeaturesGridGlow({
  eyebrow = "Platform",
  title = "Everything between git push and a happy customer",
  subtitle = "Build, preview, ship and observe on one platform. No glue scripts, no YAML archaeology, no waiting on the ops channel.",
  features = defaultFeatures,
  cta = { label: "Explore the platform", href: "#" },
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: FeaturesGridGlowProps) {
  const uid = React.useId();
  const gridRef = React.useRef<HTMLUListElement>(null);

  const place = React.useCallback((clientX: number | null, clientY: number | null) => {
    const grid = gridRef.current;
    if (!grid) return;
    const g = grid.getBoundingClientRect();
    const px = clientX ?? g.left + g.width * 0.3;
    const py = clientY ?? g.top + g.height * 0.08;
    grid.querySelectorAll<HTMLElement>(".hb-ka1-card").forEach((card) => {
      const r = card.getBoundingClientRect();
      const sx = card.offsetWidth ? r.width / card.offsetWidth : 1;
      card.style.setProperty("--hb-ka1-x", `${((px - r.left) / sx).toFixed(1)}px`);
      card.style.setProperty("--hb-ka1-y", `${((py - r.top) / sx).toFixed(1)}px`);
    });
  }, []);

  React.useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    place(null, null);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      if (grid.dataset.active !== "true") place(null, null);
    });
    ro.observe(grid);
    return () => ro.disconnect();
  }, [place, features.length]);

  function handleMove(e: React.PointerEvent<HTMLUListElement>) {
    e.currentTarget.dataset.active = "true";
    place(e.clientX, e.clientY);
  }

  function handleLeave(e: React.PointerEvent<HTMLUListElement>) {
    e.currentTarget.dataset.active = "false";
  }

  const vars = { "--hb-ka1-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-ka1 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-features-grid-glow" precedence="default">{css}</style>
      <div className="hb-ka1-wrap">
        <header className="hb-ka1-head">
          <div>
            {eyebrow && (
              <p className="hb-ka1-eyebrow">
                <span className="hb-ka1-dot" aria-hidden="true" />
                {eyebrow}
              </p>
            )}
            <h2 id={`${uid}-t`} className="hb-ka1-title">{title}</h2>
          </div>
          <div className="hb-ka1-side">
            {subtitle && <p className="hb-ka1-sub">{subtitle}</p>}
            {cta && (
              <a className="hb-ka1-link" href={cta.href}>
                {cta.label}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            )}
          </div>
        </header>
        <ul ref={gridRef} className="hb-ka1-grid" onPointerMove={handleMove} onPointerLeave={handleLeave}>
          {features.map((f, i) => (
            <li key={`${f.title}-${i}`} className="hb-ka1-card">
              {f.icon != null && <span className="hb-ka1-icon">{f.icon}</span>}
              <h3 className="hb-ka1-card-title">{f.title}</h3>
              <p className="hb-ka1-card-desc">{f.description}</p>
              {f.meta && <span className="hb-ka1-meta">{f.meta}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
