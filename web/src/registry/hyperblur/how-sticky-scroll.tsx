"use client";

import * as React from "react";

export interface HowStickyScrollStep {
  title: string;
  description: string;
  points?: string[];
}

export interface HowStickyScrollProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: HowStickyScrollStep[];
  defaultStep?: number;
  onStepChange?: (index: number) => void;
  accent?: string;
}

const css = `
@keyframes hb-kh2-in {
  from { opacity: 0; transform: translate3d(0, 10px, 0); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-kh2-blink { 50% { opacity: 0; } }
@keyframes hb-kh2-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-kh2-accent) 55%, transparent); }
  100% { box-shadow: 0 0 0 8px transparent; }
}
.hb-kh2 {
  --hb-kh2-accent: #34d399;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kh2 *, .hb-kh2 *::before, .hb-kh2 *::after { box-sizing: border-box; }
.hb-kh2-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px 80px;
}
.hb-kh2-head { max-width: 620px; }
.hb-kh2-eyebrow {
  color: var(--hb-kh2-accent);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.hb-kh2-title {
  margin: 12px 0 0;
  font-size: clamp(30px, 4.4cqw, 44px);
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: -0.035em;
  text-wrap: balance;
}
.hb-kh2-sub {
  margin: 14px 0 0;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kh2-body {
  display: flex;
  flex-direction: column-reverse;
  gap: 28px;
  margin-top: 40px;
}
.hb-kh2-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-kh2-step {
  position: relative;
  display: block;
  width: 100%;
  margin: 0;
  padding: 18px 18px 20px 22px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.35s ease, background-color 0.35s ease, border-color 0.35s ease;
}
.hb-kh2-step::before {
  content: "";
  position: absolute;
  top: 18px;
  bottom: 18px;
  left: 0;
  width: 2px;
  border-radius: 2px;
  background: var(--hb-kh2-accent);
  transform: scaleY(0);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-kh2-step:hover { opacity: 0.8; }
.hb-kh2-step[data-active="true"] {
  opacity: 1;
  border-color: rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.01));
}
.hb-kh2-step[data-active="true"]::before { transform: scaleY(1); }
.hb-kh2-step:focus-visible { outline: 2px solid var(--hb-kh2-accent); outline-offset: 2px; }
.hb-kh2-num {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #8f8f8f;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  font-variant-numeric: tabular-nums;
}
.hb-kh2-step[data-active="true"] .hb-kh2-num { color: var(--hb-kh2-accent); }
.hb-kh2-name {
  display: block;
  margin-top: 8px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.hb-kh2-desc {
  display: block;
  margin-top: 8px;
  color: #9a9a9a;
  font-size: 15px;
  line-height: 1.6;
}
.hb-kh2-points {
  display: grid;
  gap: 8px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}
.hb-kh2-point {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #c9c9c9;
  font-size: 14px;
  line-height: 1.45;
}
.hb-kh2-points svg {
  flex: none;
  width: 16px;
  height: 16px;
  margin-top: 1px;
  fill: none;
  stroke: var(--hb-kh2-accent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-kh2-stage { position: relative; min-width: 0; }
.hb-kh2-mock {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 18px;
  background: linear-gradient(180deg, #131313, #0d0d0d);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 40px 80px -40px rgba(0, 0, 0, 0.9), 0 0 0 6px rgba(255, 255, 255, 0.02);
}
.hb-kh2-mock::before {
  content: "";
  position: absolute;
  inset: -40% -20% auto;
  height: 70%;
  pointer-events: none;
  background: radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--hb-kh2-accent) 18%, transparent), transparent 70%);
  transform: translateX(var(--hb-kh2-glow, -20%));
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-kh2-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.hb-kh2-dots { display: flex; gap: 6px; }
.hb-kh2-dots i { width: 9px; height: 9px; border-radius: 50%; background: #262626; }
.hb-kh2-url {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  color: #8f8f8f;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-kh2-progress { display: flex; gap: 4px; }
.hb-kh2-progress i {
  width: 18px;
  height: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.12);
  transition: background-color 0.3s ease;
}
.hb-kh2-progress i[data-on="true"] { background: var(--hb-kh2-accent); }
.hb-kh2-screen {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  min-height: 430px;
}
.hb-kh2-side {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 14px 10px;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}
.hb-kh2-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  color: #8f8f8f;
  font-size: 12.5px;
}
.hb-kh2-nav[data-on="true"] { background: rgba(255, 255, 255, 0.05); color: #ededed; }
.hb-kh2-nav b { font-weight: 500; color: #8f8f8f; font-size: 11px; }
.hb-kh2-panes { position: relative; min-width: 0; }
.hb-kh2-pane {
  position: absolute;
  inset: 0;
  overflow: hidden;
  padding: 16px;
  opacity: 0;
  visibility: hidden;
  transform: translate3d(0, 12px, 0) scale(0.985);
  transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0s linear 0.45s;
}
.hb-kh2-pane[data-active="true"] {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition: opacity 0.45s ease 0.08s, transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) 0.08s, visibility 0s;
}
.hb-kh2-pane-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 600;
}
.hb-kh2-meta { color: #8f8f8f; font-weight: 500; font-size: 12px; }
.hb-kh2-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #8f8f8f;
  font-size: 12px;
  font-weight: 500;
}
.hb-kh2-live::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-kh2-accent);
  animation: hb-kh2-pulse 1.6s ease-out infinite;
}
.hb-kh2-rows { display: grid; gap: 8px; }
.hb-kh2-row {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  background: #121212;
}
.hb-kh2-pane[data-active="true"] .hb-kh2-row { animation: hb-kh2-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-delay: calc(var(--i) * 70ms + 120ms); }
.hb-kh2-av {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #0a0a0a;
  font-size: 11px;
  font-weight: 700;
}
.hb-kh2-txt { min-width: 0; }
.hb-kh2-txt strong, .hb-kh2-txt span {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-kh2-txt strong { font-size: 13px; font-weight: 600; }
.hb-kh2-txt span { margin-top: 2px; color: #8f8f8f; font-size: 12px; }
.hb-kh2-time { color: #6f6f6f; font-size: 11.5px; font-variant-numeric: tabular-nums; }
.hb-kh2-tags { display: flex; align-items: center; gap: 6px; }
.hb-kh2-tag {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}
.hb-kh2-owner {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border: 2px solid #121212;
  border-radius: 50%;
  color: #0a0a0a;
  font-size: 9px;
  font-weight: 700;
}
.hb-kh2-rule {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding: 9px 12px;
  border: 1px dashed color-mix(in srgb, var(--hb-kh2-accent) 45%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--hb-kh2-accent) 7%, transparent);
  color: #d6d6d6;
  font-size: 12px;
}
.hb-kh2-rule code {
  padding: 1px 6px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.07);
  color: #ededed;
  font-family: var(--font-mono, ui-monospace), SFMono-Regular, Menlo, monospace;
  font-size: 11px;
}
.hb-kh2-thread {
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  background: #121212;
  font-size: 13px;
  line-height: 1.5;
  color: #c9c9c9;
}
.hb-kh2-thread strong { color: #ededed; font-weight: 600; }
.hb-kh2-compose {
  margin-top: 10px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--hb-kh2-accent) 40%, rgba(255, 255, 255, 0.1));
  border-radius: 12px;
  background: #101010;
  font-size: 13px;
  line-height: 1.55;
  color: #ededed;
}
.hb-kh2-compose em {
  display: block;
  margin-bottom: 6px;
  color: var(--hb-kh2-accent);
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.hb-kh2-caret {
  display: inline-block;
  width: 2px;
  height: 14px;
  margin-left: 2px;
  vertical-align: -2px;
  background: var(--hb-kh2-accent);
  animation: hb-kh2-blink 1s steps(1) infinite;
}
.hb-kh2-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 10px;
}
.hb-kh2-stat { color: #8f8f8f; font-size: 12px; }
.hb-kh2-stat b { color: #ededed; font-weight: 600; }
.hb-kh2-send {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: var(--hb-kh2-accent);
  color: #04130d;
  font-size: 12px;
  font-weight: 700;
}
.hb-kh2-resolved {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-kh2-accent) 16%, transparent);
  color: var(--hb-kh2-accent);
  font-size: 11px;
  font-weight: 600;
}
@container (min-width: 520px) {
  .hb-kh2-screen { grid-template-columns: 150px minmax(0, 1fr); min-height: 380px; }
  .hb-kh2-side { display: flex; }
}
@container (min-width: 720px) {
  .hb-kh2-in { padding: 96px 40px 112px; }
}
@container (min-width: 880px) {
  .hb-kh2-body {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: start;
    gap: 56px;
    margin-top: 48px;
  }
  .hb-kh2-steps { gap: 0; padding: 4px 0 18vh; }
  .hb-kh2-steps > li { min-height: 44vh; }
  .hb-kh2-steps > li:first-child { min-height: 30vh; }
  .hb-kh2-step { border-color: transparent; background: transparent; }
  .hb-kh2-step[data-active="true"] { border-color: transparent; background: transparent; }
  .hb-kh2-stage { position: sticky; top: 88px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kh2 *, .hb-kh2 *::before, .hb-kh2 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultSteps: HowStickyScrollStep[] = [
  {
    title: "Capture every request",
    description: "Email, chat and form submissions land in one shared inbox the moment they arrive.",
    points: ["Forward support@ in under a minute", "Chat widget and web forms included"],
  },
  {
    title: "Route it automatically",
    description: "Rules read each message, tag it and hand it to the right owner before anyone triages.",
    points: ["Match on plan, keyword or sentiment", "Round-robin across on-call agents"],
  },
  {
    title: "Resolve with one reply",
    description: "Suggested replies pull from your help center, so most tickets close in a single send.",
    points: ["Drafts cite the article they used", "Median first response drops to 4 minutes"],
  },
];

const people = [
  { n: "Maya Chen", c: "#7dd3fc", s: "Can't export invoices to CSV", t: "now", tag: "Billing", tc: "#fbbf24", o: "JR", oc: "#c4b5fd" },
  { n: "Omar Haddad", c: "#fca5a5", s: "SSO login loops back to start", t: "2m", tag: "Urgent", tc: "#f87171", o: "AL", oc: "#86efac" },
  { n: "Lena Fischer", c: "#fde68a", s: "How do I add a teammate?", t: "6m", tag: "How-to", tc: "#7dd3fc", o: "JR", oc: "#c4b5fd" },
  { n: "Diego Ramos", c: "#a7f3d0", s: "Upgrade to annual plan", t: "11m", tag: "Sales", tc: "#34d399", o: "SK", oc: "#fda4af" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function tint(color: string) {
  return { color, background: `color-mix(in srgb, ${color} 14%, transparent)` } as React.CSSProperties;
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

export function HowStickyScroll({
  eyebrow = "How Tandem works",
  title = "Support that sorts itself, from first message to resolved",
  subtitle = "Three steps replace the morning triage meeting. Scroll to see each one in the product.",
  steps = defaultSteps,
  defaultStep = 0,
  onStepChange,
  accent = "#34d399",
  className,
  style,
  ...rest
}: HowStickyScrollProps) {
  const [active, setActive] = React.useState(defaultStep);
  const itemRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const changeRef = React.useRef(onStepChange);
  const lastRef = React.useRef(defaultStep);

  React.useEffect(() => {
    changeRef.current = onStepChange;
  }, [onStepChange]);

  React.useEffect(() => {
    if (lastRef.current === active) return;
    lastRef.current = active;
    changeRef.current?.(active);
  }, [active]);

  const select = React.useCallback((i: number) => setActive(i), []);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const nodes = itemRefs.current.filter((n): n is HTMLLIElement => Boolean(n));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(i)) select(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [select, steps.length]);

  const glow = ["-25%", "0%", "25%"][active % 3];

  return (
    <section
      className={["hb-kh2", className].filter(Boolean).join(" ")}
      style={{ ["--hb-kh2-accent" as string]: accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-how-sticky-scroll" precedence="default">{css}</style>
      <div className="hb-kh2-in">
        <header className="hb-kh2-head">
          {eyebrow ? <div className="hb-kh2-eyebrow">{eyebrow}</div> : null}
          <h2 className="hb-kh2-title">{title}</h2>
          {subtitle ? <p className="hb-kh2-sub">{subtitle}</p> : null}
        </header>
        <div className="hb-kh2-body">
          <ol className="hb-kh2-steps">
            {steps.map((step, i) => (
              <li
                key={step.title + i}
                data-index={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
              >
                <button
                  type="button"
                  className="hb-kh2-step"
                  data-active={active === i ? "true" : "false"}
                  aria-current={active === i ? "step" : undefined}
                  onClick={() => select(i)}
                >
                  <span className="hb-kh2-num">{String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
                  <span className="hb-kh2-name">{step.title}</span>
                  <span className="hb-kh2-desc">{step.description}</span>
                  {step.points && step.points.length ? (
                    <span className="hb-kh2-points" role="list">
                      {step.points.map((p) => (
                        <span key={p} role="listitem" className="hb-kh2-point">
                          <Check />
                          {p}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ol>
          <div className="hb-kh2-stage">
            <div className="hb-kh2-mock" style={{ ["--hb-kh2-glow" as string]: glow } as React.CSSProperties} aria-live="polite">
              <div className="hb-kh2-bar">
                <span className="hb-kh2-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="hb-kh2-url">app.tandem.so/inbox</span>
                <span className="hb-kh2-progress" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <i key={i} data-on={i <= active ? "true" : "false"} />
                  ))}
                </span>
              </div>
              <div className="hb-kh2-screen">
                <div className="hb-kh2-side" aria-hidden="true">
                  <div className="hb-kh2-nav" data-on={active === 0 ? "true" : "false"}>
                    Inbox <b>{active === 0 ? 24 : active === 1 ? 6 : 2}</b>
                  </div>
                  <div className="hb-kh2-nav" data-on={active === 1 ? "true" : "false"}>
                    Rules <b>8</b>
                  </div>
                  <div className="hb-kh2-nav" data-on={active === 2 ? "true" : "false"}>
                    Resolved <b>{active === 2 ? 141 : 118}</b>
                  </div>
                  <div className="hb-kh2-nav">Reports</div>
                  <div className="hb-kh2-nav">Settings</div>
                </div>
                <div className="hb-kh2-panes">
                  <div className="hb-kh2-pane" data-active={active === 0 ? "true" : "false"} aria-hidden={active !== 0}>
                    <div className="hb-kh2-pane-head">
                      All requests <span className="hb-kh2-live">Receiving</span>
                    </div>
                    <div className="hb-kh2-rows">
                      {people.map((p, i) => (
                        <div key={p.n} className="hb-kh2-row" style={{ ["--i" as string]: i } as React.CSSProperties}>
                          <span className="hb-kh2-av" style={{ background: p.c }}>{initials(p.n)}</span>
                          <span className="hb-kh2-txt">
                            <strong>{p.n}</strong>
                            <span>{p.s}</span>
                          </span>
                          <span className="hb-kh2-time">{p.t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hb-kh2-pane" data-active={active === 1 ? "true" : "false"} aria-hidden={active !== 1}>
                    <div className="hb-kh2-pane-head">
                      Auto-routed <span className="hb-kh2-meta">4 of 4 assigned</span>
                    </div>
                    <div className="hb-kh2-rule">
                      If subject has <code>invoice</code> then tag <code>Billing</code> and assign Jordan
                    </div>
                    <div className="hb-kh2-rows">
                      {people.map((p, i) => (
                        <div key={p.n} className="hb-kh2-row" style={{ ["--i" as string]: i } as React.CSSProperties}>
                          <span className="hb-kh2-av" style={{ background: p.c }}>{initials(p.n)}</span>
                          <span className="hb-kh2-txt">
                            <strong>{p.s}</strong>
                            <span>{p.n}</span>
                          </span>
                          <span className="hb-kh2-tags">
                            <span className="hb-kh2-tag" style={tint(p.tc)}>{p.tag}</span>
                            <span className="hb-kh2-owner" style={{ background: p.oc }}>{p.o}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hb-kh2-pane" data-active={active === 2 ? "true" : "false"} aria-hidden={active !== 2}>
                    <div className="hb-kh2-pane-head">
                      Can&apos;t export invoices to CSV <span className="hb-kh2-resolved">Resolved</span>
                    </div>
                    <div className="hb-kh2-thread">
                      <strong>Maya Chen</strong> · Hi! The export button on the Invoices page is greyed out for me. We need last quarter&apos;s CSV for our accountant today.
                    </div>
                    <div className="hb-kh2-compose">
                      <em>Suggested reply · from Exporting invoices</em>
                      Hi Maya, exports unlock for Admins only. I&apos;ve upgraded your role, so the button should be live now. Choose Q3 in the date filter and hit Export.
                      <span className="hb-kh2-caret" aria-hidden="true" />
                    </div>
                    <div className="hb-kh2-actions">
                      <span className="hb-kh2-stat">
                        First response <b>3m 48s</b>
                      </span>
                      <span className="hb-kh2-send">Send and resolve</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
