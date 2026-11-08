"use client";

import * as React from "react";

export interface CtaBenefitPlaneBenefit {
  title: string;
  detail: string;
  icon?: "bolt" | "lock" | "globe" | "chart" | "sync" | "spark" | "shield" | "clock" | "users";
}

export interface CtaBenefitPlaneProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  benefits?: CtaBenefitPlaneBenefit[];
  speed?: number;
  accent?: string;
}

const css = `
.hb-wc7 {
  --hb-wc7-accent: #f59e0b;
  --hb-wc7-speed: 28s;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc7 *, .hb-wc7 *::before, .hb-wc7 *::after { box-sizing: border-box; }
.hb-wc7::before { content: ""; position: absolute; right: -10%; top: -30%; z-index: -1; width: 70%; height: 140%; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-wc7-accent) 20%, transparent), transparent); pointer-events: none; }
.hb-wc7-inner { position: relative; display: grid; max-width: 1200px; margin: 0 auto; min-height: 520px; }
.hb-wc7-copy { position: relative; z-index: 2; display: grid; align-content: center; gap: 0; padding: 72px 22px 24px; }
.hb-wc7-eyebrow { display: inline-flex; align-items: center; gap: 10px; margin: 0 0 18px; color: #a1a1a1; font-size: 13px; font-weight: 550; }
.hb-wc7-eyebrow b { padding: 3px 8px; border-radius: 6px; background: color-mix(in srgb, var(--hb-wc7-accent) 18%, transparent); color: var(--hb-wc7-accent); font-size: 11.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.hb-wc7-title { margin: 0; max-width: 13ch; font-size: clamp(36px, 6cqi, 64px); font-weight: 650; line-height: 1; letter-spacing: -.045em; text-wrap: balance; }
.hb-wc7-title span { background: linear-gradient(90deg, var(--hb-wc7-accent), color-mix(in srgb, var(--hb-wc7-accent) 40%, #fff)); background-clip: text; -webkit-background-clip: text; color: transparent; }
.hb-wc7-sub { margin: 20px 0 0; max-width: 420px; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-wc7-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
.hb-wc7-btn { display: inline-flex; align-items: center; gap: 10px; height: 46px; padding: 0 20px; border-radius: 12px; font-size: 15px; font-weight: 600; text-decoration: none; transition: transform .2s cubic-bezier(.3, 1.5, .5, 1), background .2s ease, border-color .2s ease; }
.hb-wc7-btn:focus-visible { outline: 2px solid var(--hb-wc7-accent); outline-offset: 3px; }
.hb-wc7-btn[data-kind="primary"] { background: var(--hb-wc7-accent); color: #1a1100; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .45), 0 14px 34px -14px var(--hb-wc7-accent); }
.hb-wc7-btn[data-kind="primary"]:hover { transform: translateY(-2px); }
.hb-wc7-btn[data-kind="secondary"] { border: 1px solid rgba(255, 255, 255, .12); color: #ededed; background: rgba(255, 255, 255, .03); }
.hb-wc7-btn[data-kind="secondary"]:hover { border-color: rgba(255, 255, 255, .25); background: rgba(255, 255, 255, .06); }
.hb-wc7-btn svg { width: 15px; height: 15px; transition: transform .3s cubic-bezier(.3, 1.5, .5, 1); }
.hb-wc7-btn:hover svg { transform: translateX(3px); }
.hb-wc7-view { position: relative; height: 380px; overflow: hidden; perspective: 1100px; mask-image: linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent); }
.hb-wc7-plane { position: absolute; left: 50%; top: 50%; display: grid; grid-template-columns: repeat(3, 220px); gap: 14px; transform: translate(-50%, -50%) rotateX(24deg) rotateZ(-14deg) rotateY(-10deg); transform-style: preserve-3d; }
.hb-wc7-col { display: flex; flex-direction: column; height: 760px; overflow: hidden; }
.hb-wc7-track { display: flex; flex-direction: column; gap: 14px; padding-bottom: 14px; animation: hb-wc7-up var(--hb-wc7-speed) linear infinite; }
.hb-wc7-col:nth-child(2) .hb-wc7-track { animation-name: hb-wc7-down; animation-duration: calc(var(--hb-wc7-speed) * 1.2); }
.hb-wc7-col:nth-child(3) .hb-wc7-track { animation-duration: calc(var(--hb-wc7-speed) * .9); }
.hb-wc7-view:hover .hb-wc7-track { animation-play-state: paused; }
.hb-wc7-card {
  display: grid;
  gap: 10px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 14px;
  background: linear-gradient(160deg, #181818, #101010);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 18px 30px -18px rgba(0, 0, 0, .9);
  transition: border-color .25s ease, transform .3s ease;
}
.hb-wc7-card:hover { border-color: color-mix(in srgb, var(--hb-wc7-accent) 55%, transparent); transform: translateZ(18px); }
.hb-wc7-ic { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 9px; background: color-mix(in srgb, var(--hb-wc7-accent) 14%, #141414); color: var(--hb-wc7-accent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-wc7-accent) 30%, transparent); }
.hb-wc7-ic svg { width: 16px; height: 16px; }
.hb-wc7-card b { font-size: 14.5px; font-weight: 620; letter-spacing: -.01em; }
.hb-wc7-card span { color: #8f8f8f; font-size: 12.5px; line-height: 1.45; }
.hb-wc7-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-wc7-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
@keyframes hb-wc7-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }
@container (min-width: 820px) {
  .hb-wc7-inner { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); min-height: 600px; }
  .hb-wc7-copy { padding: 96px 0 96px 40px; }
  .hb-wc7-view { height: auto; min-height: 600px; mask-image: linear-gradient(90deg, transparent, #000 22%, #000 90%, transparent), linear-gradient(180deg, transparent, #000 15%, #000 85%, transparent); mask-composite: intersect; -webkit-mask-composite: source-in; }
  .hb-wc7-plane { grid-template-columns: repeat(3, 230px); }
  .hb-wc7-col { height: 980px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc7 *, .hb-wc7 *::before, .hb-wc7 *::after { animation: none !important; transition: none !important; }
}
`;

const icons: Record<NonNullable<CtaBenefitPlaneBenefit["icon"]>, string> = {
  bolt: "M9 1.5L3.5 9H8l-1 5.5L12.5 7H8z",
  lock: "M4.5 7V5a3.5 3.5 0 017 0v2M3.5 7h9v6.5h-9z",
  globe: "M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM1.5 8h13M8 1.5c2 2 2 11 0 13M8 1.5c-2 2-2 11 0 13",
  chart: "M2 13.5h12M4 11V7M7 11V4M10 11V8M13 11V5",
  sync: "M13 6A5.5 5.5 0 003.3 4.5M3 10a5.5 5.5 0 009.7 1.5M3 2v3h3M13 14v-3h-3",
  spark: "M8 1.5v4M8 10.5v4M1.5 8h4M10.5 8h4M3.5 3.5l2.5 2.5M10 10l2.5 2.5M12.5 3.5L10 6M6 10l-2.5 2.5",
  shield: "M8 1.5l5.5 2v4.5c0 3.3-2.4 5.6-5.5 6.5-3.1-.9-5.5-3.2-5.5-6.5V3.5zM5.5 8l1.8 1.8L10.5 6.5",
  clock: "M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 4.5V8l2.5 1.5",
  users: "M6 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.5 13.5c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4M11 3a2.3 2.3 0 010 4.5M12.5 9.5c1.3.5 2 1.8 2 4",
};

const defaultBenefits: CtaBenefitPlaneBenefit[] = [
  { title: "Deploys in 41 seconds", detail: "Median build to live across 2.1M deploys last month.", icon: "bolt" },
  { title: "SOC 2 Type II", detail: "Audited yearly, with SSO and SCIM on every plan.", icon: "shield" },
  { title: "Edge in 38 regions", detail: "Requests land on the closest node, automatically.", icon: "globe" },
  { title: "Preview every branch", detail: "A shareable URL for each pull request.", icon: "sync" },
  { title: "Real-time analytics", detail: "Web vitals and traffic without a third-party script.", icon: "chart" },
  { title: "Instant rollbacks", detail: "Back to any previous build in one click.", icon: "clock" },
  { title: "Secrets, encrypted", detail: "Per-environment variables with audit history.", icon: "lock" },
  { title: "Unlimited teammates", detail: "Invite your whole team on the Pro plan.", icon: "users" },
  { title: "Image optimization", detail: "Modern formats served at the right size.", icon: "spark" },
];

function Card({ b }: { b: CtaBenefitPlaneBenefit }) {
  return (
    <div className="hb-wc7-card">
      <span className="hb-wc7-ic">
        <svg viewBox="0 0 16 16">
          <path d={icons[b.icon ?? "spark"]} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <b>{b.title}</b>
      <span>{b.detail}</span>
    </div>
  );
}

export function CtaBenefitPlane({
  eyebrow = "Pro trial",
  title = "Everything you need to ship, in one push.",
  subtitle = "Connect a repository and your first deploy is live before the coffee is ready. Every feature on the right is included from day one.",
  primary = { label: "Start deploying", href: "#" },
  secondary = { label: "Talk to sales", href: "#" },
  benefits = defaultBenefits,
  speed = 28,
  accent = "#f59e0b",
  className = "",
  style,
  ...rest
}: CtaBenefitPlaneProps) {
  const cols: CtaBenefitPlaneBenefit[][] = [[], [], []];
  benefits.forEach((b, i) => cols[i % 3].push(b));
  const words = title.split(" ");
  const tail = words.slice(-2).join(" ");
  const head = words.slice(0, -2).join(" ");
  const vars = { "--hb-wc7-accent": accent, "--hb-wc7-speed": `${Math.max(6, speed)}s`, ...style } as React.CSSProperties;

  return (
    <section className={`hb-wc7 ${className}`} style={vars} {...rest}>
      <style href="hb-cta-benefit-plane" precedence="default">{css}</style>
      <div className="hb-wc7-inner">
        <div className="hb-wc7-copy">
          {eyebrow ? (
            <p className="hb-wc7-eyebrow">
              <b>{eyebrow}</b>
              14 days, no card required
            </p>
          ) : null}
          <h2 className="hb-wc7-title">
            {head} <span>{tail}</span>
          </h2>
          {subtitle ? <p className="hb-wc7-sub">{subtitle}</p> : null}
          <div className="hb-wc7-actions">
            <a className="hb-wc7-btn" data-kind="primary" href={primary.href}>
              {primary.label}
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            {secondary ? (
              <a className="hb-wc7-btn" data-kind="secondary" href={secondary.href}>
                {secondary.label}
              </a>
            ) : null}
          </div>
          <ul className="hb-wc7-sr">
            {benefits.map((b) => (
              <li key={b.title}>
                {b.title}: {b.detail}
              </li>
            ))}
          </ul>
        </div>
        <div className="hb-wc7-view" aria-hidden="true">
          <div className="hb-wc7-plane">
            {cols.map((c, ci) => (
              <div key={ci} className="hb-wc7-col">
                <div className="hb-wc7-track">
                  {[...c, ...c, ...c, ...c].map((b, i) => (
                    <Card key={`${b.title}-${i}`} b={b} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
