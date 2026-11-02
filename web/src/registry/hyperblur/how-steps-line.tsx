"use client";

import * as React from "react";

export type HowStepsLineArt = "connect" | "configure" | "deploy" | "monitor";

export interface HowStepsLineStep {
  title: string;
  description: string;
  duration?: string;
  art?: HowStepsLineArt;
}

export interface HowStepsLineAction {
  label: string;
  href: string;
}

export interface HowStepsLineProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: HowStepsLineStep[];
  cta?: HowStepsLineAction | null;
  note?: string;
  accent?: string;
}

const css = `
@keyframes hb-kh1-dash { to { stroke-dashoffset: -14; } }
@keyframes hb-kh1-travel {
  0% { transform: translateX(0); opacity: 0; }
  12% { opacity: 1; }
  88% { opacity: 1; }
  100% { transform: translateX(56px); opacity: 0; }
}
@keyframes hb-kh1-ping {
  0% { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(1.9); opacity: 0; }
}
@keyframes hb-kh1-slide {
  0%, 18% { transform: translateX(calc(var(--a) * 112px)); }
  50%, 68% { transform: translateX(calc(var(--b) * 112px)); }
  100% { transform: translateX(calc(var(--a) * 112px)); }
}
@keyframes hb-kh1-grow {
  0%, 18% { transform: scaleX(var(--a)); }
  50%, 68% { transform: scaleX(var(--b)); }
  100% { transform: scaleX(var(--a)); }
}
@keyframes hb-kh1-load {
  0% { transform: scaleX(0); }
  58%, 100% { transform: scaleX(1); }
}
@keyframes hb-kh1-check {
  0%, 60% { opacity: 0; transform: scale(0.6); }
  70%, 92% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1); }
}
@keyframes hb-kh1-bar {
  0% { transform: scaleY(var(--a)); }
  100% { transform: scaleY(var(--b)); }
}
.hb-kh1 {
  --hb-kh1-accent: #8b7bff;
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
.hb-kh1 *, .hb-kh1 *::before, .hb-kh1 *::after { box-sizing: border-box; }
.hb-kh1-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(56% 42% at 50% 0%, color-mix(in srgb, var(--hb-kh1-accent) 20%, transparent), transparent 72%),
    radial-gradient(30% 30% at 88% 70%, color-mix(in srgb, var(--hb-kh1-accent) 8%, transparent), transparent 70%);
}
.hb-kh1-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(70% 60% at 50% 0%, #000 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(70% 60% at 50% 0%, #000 20%, transparent 75%);
}
.hb-kh1-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px 80px;
}
.hb-kh1-head {
  max-width: 660px;
  margin: 0 auto;
  text-align: center;
}
.hb-kh1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: #c4c4c4;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
.hb-kh1-eyebrow::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-kh1-accent);
  box-shadow: 0 0 10px var(--hb-kh1-accent);
}
.hb-kh1-title {
  margin: 18px 0 0;
  font-size: clamp(30px, 4.7cqw, 46px);
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: -0.035em;
  text-wrap: balance;
  background: linear-gradient(180deg, #ffffff 30%, #a9a9a9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-kh1-sub {
  max-width: 520px;
  margin: 16px auto 0;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kh1-flow {
  position: relative;
  margin: 52px 0 0;
  padding: 0 0 0 58px;
}
.hb-kh1-steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-kh1-track {
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 19px;
  width: 2px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.hb-kh1-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, var(--hb-kh1-accent), color-mix(in srgb, var(--hb-kh1-accent) 45%, #ffffff));
  box-shadow: 0 0 12px var(--hb-kh1-accent);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 1.9s cubic-bezier(0.65, 0, 0.35, 1) 0.15s;
}
.hb-kh1[data-in="true"] .hb-kh1-fill { transform: none; }
.hb-kh1-step { position: relative; min-width: 0; }
.hb-kh1-badge {
  position: absolute;
  top: 14px;
  left: -58px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  background: #0d0d0d;
  color: #8f8f8f;
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  transition: border-color 0.45s ease, color 0.45s ease, background-color 0.45s ease, box-shadow 0.45s ease;
  transition-delay: calc(var(--i) * 0.45s + 0.2s);
}
.hb-kh1[data-in="true"] .hb-kh1-badge {
  border-color: var(--hb-kh1-accent);
  background: color-mix(in srgb, var(--hb-kh1-accent) 20%, #0d0d0d);
  color: #ffffff;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kh1-accent) 12%, transparent), 0 0 24px color-mix(in srgb, var(--hb-kh1-accent) 45%, transparent);
}
.hb-kh1-card {
  position: relative;
  height: 100%;
  padding: 12px 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: linear-gradient(180deg, #141414, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 24px 48px -32px rgba(0, 0, 0, 0.9);
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.hb-kh1-card:hover {
  border-color: color-mix(in srgb, var(--hb-kh1-accent) 40%, rgba(255, 255, 255, 0.1));
  transform: translateY(-3px);
}
.hb-kh1-art {
  position: relative;
  height: 112px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  background:
    radial-gradient(80% 90% at 50% 120%, color-mix(in srgb, var(--hb-kh1-accent) 22%, transparent), transparent 70%),
    radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px) 0 0 / 12px 12px,
    #0b0b0b;
}
.hb-kh1-art svg { display: block; width: 100%; height: 100%; }
.hb-kh1-node { fill: #161616; stroke: rgba(255, 255, 255, 0.14); }
.hb-kh1-node-on { fill: color-mix(in srgb, var(--hb-kh1-accent) 22%, #161616); stroke: var(--hb-kh1-accent); }
.hb-kh1-ink { fill: none; stroke: #a1a1a1; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh1-ink-on { fill: none; stroke: #ffffff; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh1-dash { fill: none; stroke: var(--hb-kh1-accent); stroke-width: 1.5; stroke-dasharray: 3 4; animation: hb-kh1-dash 0.9s linear infinite; }
.hb-kh1-pkt { fill: #ffffff; animation: hb-kh1-travel 2s cubic-bezier(0.5, 0, 0.5, 1) infinite; filter: drop-shadow(0 0 4px var(--hb-kh1-accent)); }
.hb-kh1-ping { fill: none; stroke: var(--hb-kh1-accent); transform-box: fill-box; transform-origin: center; animation: hb-kh1-ping 2s ease-out infinite; }
.hb-kh1-rail { fill: rgba(255, 255, 255, 0.08); }
.hb-kh1-railfill { fill: var(--hb-kh1-accent); transform-box: fill-box; transform-origin: left center; animation: hb-kh1-grow 3.6s cubic-bezier(0.65, 0, 0.35, 1) infinite; animation-delay: var(--d); }
.hb-kh1-knob { fill: #ffffff; stroke: var(--hb-kh1-accent); stroke-width: 2; animation: hb-kh1-slide 3.6s cubic-bezier(0.65, 0, 0.35, 1) infinite; animation-delay: var(--d); }
.hb-kh1-win { fill: #141414; stroke: rgba(255, 255, 255, 0.12); }
.hb-kh1-skel { fill: rgba(255, 255, 255, 0.08); }
.hb-kh1-load { fill: var(--hb-kh1-accent); transform-box: fill-box; transform-origin: left center; animation: hb-kh1-load 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
.hb-kh1-check { transform-box: fill-box; transform-origin: center; animation: hb-kh1-check 3s ease infinite; }
.hb-kh1-check circle { fill: var(--hb-kh1-accent); }
.hb-kh1-check path { fill: none; stroke: #ffffff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh1-col { fill: color-mix(in srgb, var(--hb-kh1-accent) 70%, #ffffff); transform-box: fill-box; transform-origin: bottom; animation: hb-kh1-bar 1.6s ease-in-out infinite alternate; animation-delay: var(--d); }
.hb-kh1-col-dim { fill: rgba(255, 255, 255, 0.16); }
.hb-kh1-axis { stroke: rgba(255, 255, 255, 0.12); stroke-width: 1; }
.hb-kh1-live { fill: #34d399; }
.hb-kh1-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 18px 6px 0;
}
.hb-kh1-label {
  color: #8f8f8f;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.hb-kh1-chip {
  padding: 3px 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: #bdbdbd;
  font-size: 11.5px;
  white-space: nowrap;
}
.hb-kh1-name {
  margin: 10px 6px 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.015em;
}
.hb-kh1-desc {
  margin: 8px 6px 0;
  color: #8f8f8f;
  font-size: 14px;
  line-height: 1.55;
  text-wrap: pretty;
}
.hb-kh1-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px 18px;
  margin-top: 44px;
  color: #8f8f8f;
  font-size: 14px;
}
.hb-kh1-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 18px;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.hb-kh1-cta:hover { background: #ffffff; transform: translateY(-1px); }
.hb-kh1-cta:focus-visible { outline: 2px solid var(--hb-kh1-accent); outline-offset: 3px; }
.hb-kh1-cta svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.2s ease; }
.hb-kh1-cta:hover svg { transform: translateX(2px); }
@container (min-width: 720px) {
  .hb-kh1-in { padding: 96px 40px 108px; }
}
@container (min-width: 880px) {
  .hb-kh1-flow {
    margin-top: 48px;
    padding: 64px 0 0;
  }
  .hb-kh1-steps {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
  }
  .hb-kh1-track {
    top: 19px;
    bottom: auto;
    left: 12.5%;
    right: 12.5%;
    width: auto;
    height: 2px;
  }
  .hb-kh1-fill {
    background: linear-gradient(90deg, var(--hb-kh1-accent), color-mix(in srgb, var(--hb-kh1-accent) 45%, #ffffff));
    transform: scaleX(0);
    transform-origin: left;
  }
  .hb-kh1-badge {
    top: -64px;
    left: 50%;
    margin-left: -20px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kh1 *, .hb-kh1 *::before, .hb-kh1 *::after { animation: none !important; transition: none !important; }
  .hb-kh1-fill { transform: none; }
}
`;

const defaultSteps: HowStepsLineStep[] = [
  {
    title: "Connect your repo",
    description: "Install the GitHub app and pick the repositories Relay should watch. No YAML to write.",
    duration: "2 min",
    art: "connect",
  },
  {
    title: "Set your rules",
    description: "Choose which checks run on every pull request and who gets pinged when one fails.",
    duration: "5 min",
    art: "configure",
  },
  {
    title: "Ship a preview",
    description: "Every branch gets its own URL with seeded data, so reviewers click instead of pulling.",
    duration: "Every push",
    art: "deploy",
  },
  {
    title: "Watch it live",
    description: "Error rates, p95 latency and deploy health stream into one timeline the team shares.",
    duration: "Always on",
    art: "monitor",
  },
];

const arts: HowStepsLineArt[] = ["connect", "configure", "deploy", "monitor"];

function hash(n: number) {
  let x = (n + 1) * 374761393;
  x = (x ^ (x >>> 13)) * 1274126177;
  x = x ^ (x >>> 16);
  return (x >>> 0) / 4294967295;
}

function v(name: string, value: string) {
  return { [name]: value } as React.CSSProperties;
}

function ConnectArt() {
  return (
    <svg viewBox="0 0 220 112" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect className="hb-kh1-node" x="38" y="34" width="44" height="44" rx="12" />
      <circle className="hb-kh1-ink" cx="53" cy="47" r="3.5" />
      <circle className="hb-kh1-ink" cx="53" cy="65" r="3.5" />
      <circle className="hb-kh1-ink" cx="68" cy="52" r="3.5" />
      <path className="hb-kh1-ink" d="M53 50.5v11M68 55.5c0 5-4 6.5-11 7.5" />
      <path className="hb-kh1-dash" d="M84 56H136" />
      <circle className="hb-kh1-pkt" cx="82" cy="56" r="3" />
      <circle className="hb-kh1-ping" cx="160" cy="56" r="22" />
      <rect className="hb-kh1-node-on" x="138" y="34" width="44" height="44" rx="12" />
      <path className="hb-kh1-ink-on" d="M152 56l5 5 10-11" />
    </svg>
  );
}

function ConfigureArt() {
  const rows = [
    { y: 34, a: 0.25, b: 0.78, d: "0s" },
    { y: 56, a: 0.7, b: 0.35, d: "-0.6s" },
    { y: 78, a: 0.45, b: 0.9, d: "-1.4s" },
  ];
  return (
    <svg viewBox="0 0 220 112" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {rows.map((r, i) => (
        <g key={i} style={{ ...v("--a", r.a.toFixed(2)), ...v("--b", r.b.toFixed(2)), ...v("--d", r.d) }}>
          <rect className="hb-kh1-rail" x="54" y={r.y - 2} width="112" height="4" rx="2" />
          <rect className="hb-kh1-railfill" x="54" y={r.y - 2} width="112" height="4" rx="2" />
          <circle className="hb-kh1-knob" cx="54" cy={r.y} r="6" />
        </g>
      ))}
    </svg>
  );
}

function DeployArt() {
  return (
    <svg viewBox="0 0 220 112" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect className="hb-kh1-win" x="46" y="20" width="128" height="74" rx="10" />
      <circle className="hb-kh1-skel" cx="58" cy="31" r="2.5" />
      <circle className="hb-kh1-skel" cx="66" cy="31" r="2.5" />
      <circle className="hb-kh1-skel" cx="74" cy="31" r="2.5" />
      <rect className="hb-kh1-skel" x="58" y="46" width="62" height="6" rx="3" />
      <rect className="hb-kh1-skel" x="58" y="58" width="40" height="6" rx="3" />
      <rect className="hb-kh1-rail" x="58" y="76" width="104" height="5" rx="2.5" />
      <rect className="hb-kh1-load" x="58" y="76" width="104" height="5" rx="2.5" />
      <g className="hb-kh1-check">
        <circle cx="152" cy="52" r="11" />
        <path d="M147 52l3.5 3.5 6.5-7" />
      </g>
    </svg>
  );
}

function MonitorArt() {
  const bars = Array.from({ length: 8 }, (_, i) => {
    const a = 0.25 + hash(i) * 0.45;
    const b = 0.5 + hash(i + 11) * 0.5;
    return { x: 50 + i * 16, a: a.toFixed(2), b: b.toFixed(2), d: `${(-hash(i + 23) * 1.6).toFixed(2)}s` };
  });
  return (
    <svg viewBox="0 0 220 112" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <line className="hb-kh1-axis" x1="44" y1="88" x2="178" y2="88" />
      {bars.map((b, i) => (
        <rect
          key={i}
          className={i === 5 ? "hb-kh1-col hb-kh1-col-dim" : "hb-kh1-col"}
          x={b.x}
          y="30"
          width="9"
          height="56"
          rx="2.5"
          style={{ ...v("--a", b.a), ...v("--b", b.b), ...v("--d", b.d) }}
        />
      ))}
      <circle className="hb-kh1-ping" cx="176" cy="24" r="6" />
      <circle className="hb-kh1-live" cx="176" cy="24" r="3" />
    </svg>
  );
}

function Art({ kind }: { kind: HowStepsLineArt }) {
  if (kind === "configure") return <ConfigureArt />;
  if (kind === "deploy") return <DeployArt />;
  if (kind === "monitor") return <MonitorArt />;
  return <ConnectArt />;
}

export function HowStepsLine({
  eyebrow = "How it works",
  title = "From first commit to production in four steps",
  subtitle = "Relay plugs into the tools your team already uses. Most teams ship their first preview before lunch.",
  steps = defaultSteps,
  cta = { label: "Read the setup guide", href: "#" },
  note = "Average setup time: 11 minutes",
  accent = "#8b7bff",
  className,
  style,
  ...rest
}: HowStepsLineProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      const t = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={["hb-kh1", className].filter(Boolean).join(" ")}
      data-in={inView ? "true" : "false"}
      style={{ ...v("--hb-kh1-accent", accent), ...style }}
      {...rest}
    >
      <style href="hb-how-steps-line" precedence="default">{css}</style>
      <div className="hb-kh1-bg" aria-hidden="true" />
      <div className="hb-kh1-grid" aria-hidden="true" />
      <div className="hb-kh1-in">
        <header className="hb-kh1-head">
          {eyebrow ? <span className="hb-kh1-eyebrow">{eyebrow}</span> : null}
          <h2 className="hb-kh1-title">{title}</h2>
          {subtitle ? <p className="hb-kh1-sub">{subtitle}</p> : null}
        </header>
        <div className="hb-kh1-flow">
          <span className="hb-kh1-track" aria-hidden="true">
            <span className="hb-kh1-fill" />
          </span>
          <ol className="hb-kh1-steps">
          {steps.map((step, i) => (
            <li key={step.title + i} className="hb-kh1-step" style={v("--i", String(i))}>
              <span className="hb-kh1-badge" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="hb-kh1-card">
                <div className="hb-kh1-art">
                  <Art kind={step.art ?? arts[i % arts.length]} />
                </div>
                <div className="hb-kh1-meta">
                  <span className="hb-kh1-label">Step {i + 1}</span>
                  {step.duration ? <span className="hb-kh1-chip">{step.duration}</span> : null}
                </div>
                <h3 className="hb-kh1-name">{step.title}</h3>
                <p className="hb-kh1-desc">{step.description}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
        {cta || note ? (
          <div className="hb-kh1-foot">
            {cta ? (
              <a className="hb-kh1-cta" href={cta.href}>
                {cta.label}
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            ) : null}
            {note ? <span>{note}</span> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
