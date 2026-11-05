"use client";

import * as React from "react";

export interface AppOnboardingStep {
  id: string;
  title: string;
  description: string;
  duration?: string;
  action?: string;
}

export interface AppOnboardingChecklistProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  steps?: AppOnboardingStep[];
  defaultCompleted?: string[];
  defaultOpenId?: string;
  userName?: string;
  product?: string;
  accent?: string;
  onStepComplete?: (id: string, done: boolean) => void;
  onComplete?: () => void;
  onSkip?: () => void;
  onDismiss?: () => void;
}

const defaultSteps: AppOnboardingStep[] = [
  { id: "workspace", title: "Name your workspace", description: "Pick a name and a URL your team will recognize. You can change both later in Settings.", duration: "1 min", action: "Edit workspace" },
  { id: "invite", title: "Invite your teammates", description: "Projects move faster together. Invite by email or share a link that expires in 7 days.", duration: "2 min", action: "Send invites" },
  { id: "connect", title: "Connect a data source", description: "Sync events from Postgres, Stripe or Segment. The first import usually finishes in under five minutes.", duration: "3 min", action: "Add source" },
  { id: "dashboard", title: "Build your first dashboard", description: "Start from the Revenue template or a blank canvas. Drag metrics in, then pin the ones you check every morning.", duration: "4 min", action: "Open templates" },
  { id: "alerts", title: "Set up an alert", description: "Get a message in Slack or email when a metric crosses a threshold, like churn above 3% in a week.", duration: "2 min", action: "Create alert" },
  { id: "mobile", title: "Install the mobile app", description: "Check numbers on the go. Scan the code in Settings or search for Northwind in your app store.", duration: "1 min", action: "Get the app" },
];

const confettiColors = ["#6d4aff", "#2f7bff", "#22c08a", "#f2a93b", "#ff6f5e", "#ec5f9c"];

function hash(n: number) {
  let x = (n + 1) * 2654435761;
  x = (x ^ (x >>> 15)) >>> 0;
  x = Math.imul(x, 2246822519) >>> 0;
  return (x ^ (x >>> 13)) >>> 0;
}

const pieces = Array.from({ length: 40 }, (_, i) => {
  const h = hash(i);
  const angle = ((i / 40) * Math.PI * 2) + ((h % 100) / 100 - 0.5) * 0.5;
  const dist = 90 + (h % 120);
  return {
    x: (Math.cos(angle) * dist).toFixed(1),
    y: (Math.sin(angle) * dist * 0.75 - 30).toFixed(1),
    r: ((h >>> 3) % 720 - 360).toFixed(0),
    w: 5 + (h % 4),
    h: 8 + ((h >>> 5) % 6),
    color: confettiColors[i % confettiColors.length],
    delay: (((h >>> 7) % 12) * 0.02).toFixed(2),
    round: i % 5 === 0,
  };
});

const css = `
.hb-ye7 {
  --hb-ye7-accent: #6d4aff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  border: 1px solid rgba(18,22,34,.08);
  border-radius: 16px;
  background: #f7f5ef;
  color: #121622;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.45;
}
.hb-ye7 *, .hb-ye7 *::before, .hb-ye7 *::after { box-sizing: border-box; }
.hb-ye7 button:focus-visible, .hb-ye7 a:focus-visible { outline: 2px solid var(--hb-ye7-accent); outline-offset: 2px; }
.hb-ye7-shell { display: grid; grid-template-columns: 1fr; gap: 18px; padding: 20px; }
.hb-ye7-main { min-width: 0; padding: 20px; border: 1px solid rgba(18,22,34,.08); border-radius: 16px; background: #fff; box-shadow: 0 1px 2px rgba(18,22,34,.04), 0 12px 32px rgba(18,22,34,.05); animation: hb-ye7-in .45s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye7-head { position: relative; display: flex; align-items: center; gap: 18px; padding-bottom: 18px; border-bottom: 1px solid rgba(18,22,34,.07); }
.hb-ye7-ring { position: relative; flex: none; width: 76px; height: 76px; }
.hb-ye7-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-ye7-ring circle { fill: none; stroke-width: 7; }
.hb-ye7-ring-bg { stroke: #efece4; }
.hb-ye7-ring-fg { stroke: var(--hb-ye7-accent); stroke-linecap: round; transition: stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1); animation: hb-ye7-ring 1.1s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye7-ring-n { position: absolute; inset: 0; display: grid; place-items: center; font-size: 17px; font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
.hb-ye7-ring-n small { display: block; margin-top: -4px; color: #8a8d96; font-size: 10.5px; font-weight: 500; text-align: center; letter-spacing: 0; }
.hb-ye7-titles { flex: 1; min-width: 0; }
.hb-ye7-eyebrow { color: var(--hb-ye7-accent); font-size: 12px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
.hb-ye7-title { margin: 2px 0 0; font-size: 21px; font-weight: 650; letter-spacing: -.02em; line-height: 1.2; }
.hb-ye7-sub { margin: 4px 0 0; color: #5c606b; font-size: 13.5px; }
.hb-ye7-headacts { display: flex; align-items: center; gap: 6px; align-self: flex-start; }
.hb-ye7-link { margin: 0; padding: 6px 10px; border: 0; border-radius: 8px; background: transparent; color: #5c606b; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; white-space: nowrap; }
.hb-ye7-link:hover { background: #f2f0ea; color: #121622; }
.hb-ye7-x { display: grid; place-items: center; width: 30px; height: 30px; margin: 0; padding: 0; border: 0; border-radius: 8px; background: transparent; color: #8a8d96; cursor: pointer; }
.hb-ye7-x:hover { background: #f2f0ea; color: #121622; }
.hb-ye7-x svg { width: 16px; height: 16px; }
.hb-ye7-steps { display: flex; flex-direction: column; gap: 6px; margin: 14px 0 0; padding: 0; list-style: none; }
.hb-ye7-step { border: 1px solid transparent; border-radius: 12px; transition: background-color .2s ease, border-color .2s ease, box-shadow .2s ease; animation: hb-ye7-in .4s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye7-step[data-open="true"] { border-color: rgba(18,22,34,.08); background: #fbfaf7; box-shadow: 0 1px 0 rgba(18,22,34,.03); }
.hb-ye7-row { display: flex; align-items: center; gap: 12px; padding: 10px 12px; }
.hb-ye7-check { position: relative; display: grid; place-items: center; width: 24px; height: 24px; flex: none; margin: 0; padding: 0; border: 1.5px solid #cfccc3; border-radius: 999px; background: #fff; color: #fff; cursor: pointer; transition: background-color .2s ease, border-color .2s ease, transform .2s ease; }
.hb-ye7-check:hover { border-color: var(--hb-ye7-accent); }
.hb-ye7-check[aria-checked="true"] { border-color: var(--hb-ye7-accent); background: var(--hb-ye7-accent); animation: hb-ye7-tick .35s cubic-bezier(.2,1.6,.4,1) both; }
.hb-ye7-check svg { width: 14px; height: 14px; stroke-dasharray: 20; stroke-dashoffset: 20; transition: stroke-dashoffset .3s ease .05s; }
.hb-ye7-check[aria-checked="true"] svg { stroke-dashoffset: 0; }
.hb-ye7-toggle { display: flex; flex: 1; align-items: center; gap: 10px; min-width: 0; margin: 0; padding: 2px 0; border: 0; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.hb-ye7-stitle { flex: 1; min-width: 0; font-size: 14px; font-weight: 550; transition: color .2s ease; }
.hb-ye7-step[data-done="true"] .hb-ye7-stitle { color: #8a8d96; text-decoration: line-through; text-decoration-color: #cfccc3; }
.hb-ye7-dur { flex: none; padding: 2px 8px; border-radius: 999px; background: #f2f0ea; color: #6b6f7a; font-size: 11.5px; font-weight: 500; }
.hb-ye7-chev { width: 16px; height: 16px; flex: none; color: #8a8d96; transition: transform .25s ease; }
.hb-ye7-step[data-open="true"] .hb-ye7-chev { transform: rotate(180deg); }
.hb-ye7-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .32s cubic-bezier(.2,.8,.2,1); }
.hb-ye7-step[data-open="true"] .hb-ye7-body { grid-template-rows: 1fr; }
.hb-ye7-body-in { min-height: 0; overflow: hidden; }
.hb-ye7-body-pad { display: grid; grid-template-columns: 1fr; gap: 14px; padding: 0 12px 14px 48px; }
.hb-ye7-desc { margin: 0; color: #5c606b; font-size: 13.5px; line-height: 1.55; }
.hb-ye7-btns { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.hb-ye7-btn { display: inline-flex; align-items: center; gap: 6px; height: 32px; margin: 0; padding: 0 13px; border: 1px solid rgba(18,22,34,.12); border-radius: 999px; background: #fff; color: #121622; font: inherit; font-size: 13px; font-weight: 550; cursor: pointer; transition: transform .15s ease, box-shadow .15s ease, background-color .15s ease; }
.hb-ye7-btn:hover { box-shadow: 0 2px 8px rgba(18,22,34,.08); }
.hb-ye7-btn:active { transform: scale(.97); }
.hb-ye7-btn[data-tone="primary"] { border-color: transparent; background: #121622; color: #fff; }
.hb-ye7-btn svg { width: 14px; height: 14px; }
.hb-ye7-illo { display: none; height: 92px; border: 1px solid rgba(18,22,34,.07); border-radius: 10px; background: #fff; overflow: hidden; }
.hb-ye7-illo svg { width: 100%; height: 100%; }
.hb-ye7-side { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.hb-ye7-card { padding: 16px; border: 1px solid rgba(18,22,34,.08); border-radius: 14px; background: #fff; animation: hb-ye7-in .5s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye7-card-h { font-size: 14px; font-weight: 600; }
.hb-ye7-card-p { margin: 4px 0 12px; color: #5c606b; font-size: 12.5px; }
.hb-ye7-help { display: flex; align-items: center; gap: 10px; width: 100%; margin: 0 0 6px; padding: 9px 10px; border: 1px solid rgba(18,22,34,.07); border-radius: 10px; background: #fbfaf7; color: inherit; font: inherit; font-size: 13px; text-align: left; cursor: pointer; transition: border-color .15s ease, transform .15s ease; }
.hb-ye7-help:hover { border-color: color-mix(in srgb, var(--hb-ye7-accent) 45%, transparent); transform: translateX(2px); }
.hb-ye7-help i { display: grid; place-items: center; width: 28px; height: 28px; flex: none; border-radius: 8px; background: color-mix(in srgb, var(--hb-ye7-accent) 12%, #fff); color: var(--hb-ye7-accent); }
.hb-ye7-help i svg { width: 15px; height: 15px; }
.hb-ye7-help small { display: block; color: #8a8d96; font-size: 11.5px; }
.hb-ye7-team { display: flex; align-items: center; }
.hb-ye7-av { display: grid; place-items: center; width: 30px; height: 30px; margin-left: -8px; border: 2px solid #fff; border-radius: 999px; color: #fff; font-size: 10.5px; font-weight: 700; }
.hb-ye7-av:first-child { margin-left: 0; }
.hb-ye7-av[data-empty="true"] { border: 1.5px dashed #cfccc3; background: #fbfaf7; color: #8a8d96; font-size: 15px; font-weight: 400; }
.hb-ye7-done { position: relative; display: flex; align-items: center; gap: 12px; margin-top: 14px; padding: 14px 16px; border-radius: 12px; background: linear-gradient(120deg, color-mix(in srgb, var(--hb-ye7-accent) 12%, #fff), #fff); animation: hb-ye7-in .45s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye7-done b { display: block; font-size: 14px; }
.hb-ye7-done span { color: #5c606b; font-size: 13px; }
.hb-ye7-confetti { position: absolute; left: 38px; top: 38px; z-index: 4; width: 0; height: 0; pointer-events: none; }
.hb-ye7-confetti i { position: absolute; left: 0; top: 0; border-radius: 2px; opacity: 0; animation: hb-ye7-burst 1.4s cubic-bezier(.15,.7,.3,1) both; }
.hb-ye7-mini { display: flex; align-items: center; gap: 12px; max-width: 460px; margin: 0 auto; padding: 10px 10px 10px 14px; border: 1px solid rgba(18,22,34,.08); border-radius: 999px; background: #fff; box-shadow: 0 10px 30px rgba(18,22,34,.08); animation: hb-ye7-in .35s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye7-mini-bar { flex: 1; height: 6px; border-radius: 999px; background: #efece4; overflow: hidden; }
.hb-ye7-mini-bar i { display: block; height: 100%; border-radius: inherit; background: var(--hb-ye7-accent); transition: width .5s ease; }
.hb-ye7-mini-t { color: #5c606b; font-size: 13px; white-space: nowrap; }
.hb-ye7-wrap { display: grid; place-items: center; min-height: 600px; padding: 20px; }
.hb-ye7-gone { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; color: #5c606b; font-size: 13.5px; }
@keyframes hb-ye7-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes hb-ye7-ring { from { stroke-dashoffset: var(--hb-ye7-c); } }
@keyframes hb-ye7-tick { 0% { transform: scale(.8); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
@keyframes hb-ye7-burst { 0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(.4); } 70% { opacity: 1; } 100% { opacity: 0; transform: translate(var(--x), calc(var(--y) + 60px)) rotate(var(--r)) scale(1); } }
@container (min-width: 560px) {
  .hb-ye7-body-pad { grid-template-columns: 1fr 180px; align-items: start; }
  .hb-ye7-illo { display: block; }
}
@container (min-width: 820px) {
  .hb-ye7-shell { grid-template-columns: 1fr 280px; gap: 20px; padding: 28px; }
  .hb-ye7-main { padding: 24px 24px 18px; }
}
@container (max-width: 520px) {
  .hb-ye7-head { flex-wrap: wrap; }
  .hb-ye7-headacts { order: -1; width: 100%; justify-content: flex-end; }
  .hb-ye7-dur { display: none; }
  .hb-ye7-body-pad { padding-left: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ye7 *, .hb-ye7 *::before, .hb-ye7 *::after { animation: none !important; transition: none !important; }
  .hb-ye7-confetti { display: none; }
}
`;

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Illustration({ index }: { index: number }) {
  const v = index % 3;
  return (
    <svg viewBox="0 0 180 92" aria-hidden="true">
      <rect width="180" height="92" fill="#fbfaf7" />
      {v === 0 && (
        <g>
          <rect x="14" y="14" width="152" height="64" rx="8" fill="#fff" stroke="#ece9e1" />
          <rect x="24" y="24" width="40" height="22" rx="4" fill="var(--hb-ye7-accent)" opacity=".16" />
          <path d="M28 40 L36 33 L44 37 L52 28 L60 31" fill="none" stroke="var(--hb-ye7-accent)" strokeWidth="2" strokeLinecap="round" />
          <rect x="72" y="24" width="84" height="22" rx="4" fill="#f2f0ea" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={(76 + i * 11).toFixed(0)} y={(42 - ((hash(i) % 12) + 4)).toFixed(0)} width="6" height={((hash(i) % 12) + 4).toFixed(0)} rx="1.5" fill={i === 5 ? "var(--hb-ye7-accent)" : "#d9d5cb"} />
          ))}
          <rect x="24" y="54" width="132" height="6" rx="3" fill="#f2f0ea" />
          <rect x="24" y="64" width="90" height="6" rx="3" fill="#f2f0ea" />
        </g>
      )}
      {v === 1 && (
        <g>
          <rect x="30" y="20" width="120" height="52" rx="10" fill="#fff" stroke="#ece9e1" />
          <circle cx="50" cy="46" r="10" fill="var(--hb-ye7-accent)" opacity=".2" />
          <path d="M45 46l3.5 3.5L56 42" fill="none" stroke="var(--hb-ye7-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="68" y="38" width="62" height="6" rx="3" fill="#e6e2d8" />
          <rect x="68" y="50" width="42" height="5" rx="2.5" fill="#f2f0ea" />
          <circle cx="150" cy="22" r="8" fill="#ff6f5e" />
          <text x="150" y="25.5" fill="#fff" fontSize="9" fontWeight="700" textAnchor="middle">3</text>
        </g>
      )}
      {v === 2 && (
        <g>
          <circle cx="56" cy="46" r="16" fill="#fff" stroke="#ece9e1" />
          <circle cx="124" cy="46" r="16" fill="var(--hb-ye7-accent)" opacity=".16" />
          <path d="M72 46 H108" stroke="var(--hb-ye7-accent)" strokeWidth="2" strokeDasharray="4 4" />
          <rect x="49" y="39" width="14" height="14" rx="3" fill="#d9d5cb" />
          <path d="M118 46l4 4 8-8" fill="none" stroke="var(--hb-ye7-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}

export function AppOnboardingChecklist({
  steps = defaultSteps,
  defaultCompleted = [],
  defaultOpenId,
  userName = "Maya",
  product = "Northwind",
  accent = "#6d4aff",
  onStepComplete,
  onComplete,
  onSkip,
  onDismiss,
  className,
  style,
  ...rest
}: AppOnboardingChecklistProps) {
  const id = React.useId();
  const [done, setDone] = React.useState<Set<string>>(() => new Set(defaultCompleted));
  const [open, setOpen] = React.useState<string | null>(() => defaultOpenId ?? steps.find((s) => !defaultCompleted.includes(s.id))?.id ?? null);
  const [mode, setMode] = React.useState<"active" | "skipped" | "dismissed">("active");
  const [burst, setBurst] = React.useState(0);
  const headRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const count = steps.filter((s) => done.has(s.id)).length;
  const total = steps.length;
  const all = total > 0 && count === total;
  const remaining = steps.filter((s) => !done.has(s.id)).reduce((n, s) => n + (parseInt(s.duration ?? "0", 10) || 0), 0);
  const R = 31;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - (total ? count / total : 0));

  const setStep = (stepId: string, value: boolean) => {
    const next = new Set(done);
    if (value) next.add(stepId);
    else next.delete(stepId);
    setDone(next);
    onStepComplete?.(stepId, value);
    if (value) {
      const nextOpen = steps.find((s) => !next.has(s.id));
      setOpen(nextOpen ? nextOpen.id : null);
      if (steps.every((s) => next.has(s.id))) {
        setBurst((b) => b + 1);
        onComplete?.();
      }
    }
  };

  const onHeadKey = (e: React.KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === "ArrowDown") n = Math.min(steps.length - 1, i + 1);
    if (e.key === "ArrowUp") n = Math.max(0, i - 1);
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = steps.length - 1;
    if (n < 0) return;
    e.preventDefault();
    headRefs.current[n]?.focus();
  };

  const rootProps = {
    className: ["hb-ye7", className].filter(Boolean).join(" "),
    style: { "--hb-ye7-accent": accent, ...style } as React.CSSProperties,
    ...rest,
  };
  const styleTag = <style href="hb-app-onboarding-checklist" precedence="default">{css}</style>;

  if (mode === "dismissed") {
    return (
      <div {...rootProps}>
        {styleTag}
        <div className="hb-ye7-wrap">
          <div className="hb-ye7-gone" role="status">
            <span>The checklist is hidden. You can bring it back any time from Help.</span>
            <button type="button" className="hb-ye7-btn" onClick={() => setMode("active")}>Undo</button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "skipped") {
    return (
      <div {...rootProps}>
        {styleTag}
        <div className="hb-ye7-wrap">
          <div className="hb-ye7-mini" role="region" aria-label="Setup progress">
            <span className="hb-ye7-mini-t"><b style={{ color: "#121622" }}>Setup paused</b> · {count} of {total}</span>
            <span className="hb-ye7-mini-bar" aria-hidden="true"><i style={{ width: `${((count / Math.max(1, total)) * 100).toFixed(1)}%` }} /></span>
            <button type="button" className="hb-ye7-btn" data-tone="primary" onClick={() => setMode("active")}>Resume</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div {...rootProps}>
      {styleTag}
      <div className="hb-ye7-shell">
        <section className="hb-ye7-main" aria-labelledby={`${id}-title`}>
          <div className="hb-ye7-head">
            <div className="hb-ye7-ring" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={count} aria-label="Setup progress">
              <svg viewBox="0 0 76 76" aria-hidden="true">
                <circle className="hb-ye7-ring-bg" cx="38" cy="38" r={R} />
                <circle
                  className="hb-ye7-ring-fg"
                  cx="38"
                  cy="38"
                  r={R}
                  strokeDasharray={C.toFixed(2)}
                  strokeDashoffset={offset.toFixed(2)}
                  style={{ "--hb-ye7-c": C.toFixed(2) } as React.CSSProperties}
                />
              </svg>
              <span className="hb-ye7-ring-n"><span>{count}/{total}<small>done</small></span></span>
            </div>
            {burst > 0 && (
              <span className="hb-ye7-confetti" key={burst} aria-hidden="true">
                {pieces.map((p, i) => (
                  <i
                    key={i}
                    style={{
                      width: p.w,
                      height: p.round ? p.w : p.h,
                      borderRadius: p.round ? 999 : 2,
                      background: p.color,
                      animationDelay: `${p.delay}s`,
                      "--x": `${p.x}px`,
                      "--y": `${p.y}px`,
                      "--r": `${p.r}deg`,
                    } as React.CSSProperties}
                  />
                ))}
              </span>
            )}
            <div className="hb-ye7-titles">
              <div className="hb-ye7-eyebrow">Getting started</div>
              <h2 className="hb-ye7-title" id={`${id}-title`}>{all ? `You are all set, ${userName}` : `Welcome to ${product}, ${userName}`}</h2>
              <p className="hb-ye7-sub" aria-live="polite">
                {all ? "Every step is done. Your workspace is ready for the whole team." : `${total - count} step${total - count === 1 ? "" : "s"} left · about ${remaining} minutes`}
              </p>
            </div>
            <div className="hb-ye7-headacts">
              {!all && <button type="button" className="hb-ye7-link" onClick={() => { setMode("skipped"); onSkip?.(); }}>Skip for now</button>}
              <button type="button" className="hb-ye7-x" aria-label="Dismiss checklist" onClick={() => { setMode("dismissed"); onDismiss?.(); }}><Icon d="M6 6l12 12M18 6 6 18" /></button>
            </div>
          </div>
          {all && (
            <div className="hb-ye7-done" role="status">
              <span style={{ display: "grid", placeItems: "center", width: 36, height: 36, borderRadius: 999, background: accent, color: "#fff", flex: "none" }}><Icon d="M5 12.5l4.5 4.5L19 7.5" /></span>
              <div><b>Setup complete</b><span>Invite more people or explore templates whenever you like.</span></div>
            </div>
          )}
          <ol className="hb-ye7-steps">
            {steps.map((s, i) => {
              const isDone = done.has(s.id);
              const isOpen = open === s.id;
              return (
                <li key={s.id} className="hb-ye7-step" data-open={isOpen} data-done={isDone} style={{ animationDelay: `${(0.05 + i * 0.05).toFixed(2)}s` }}>
                  <div className="hb-ye7-row">
                    <button type="button" role="checkbox" aria-checked={isDone} aria-label={`Mark "${s.title}" as ${isDone ? "not done" : "done"}`} className="hb-ye7-check" onClick={() => setStep(s.id, !isDone)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </button>
                    <button
                      type="button"
                      ref={(el) => { headRefs.current[i] = el; }}
                      className="hb-ye7-toggle"
                      aria-expanded={isOpen}
                      aria-controls={`${id}-body-${s.id}`}
                      onClick={() => setOpen(isOpen ? null : s.id)}
                      onKeyDown={(e) => onHeadKey(e, i)}
                    >
                      <span className="hb-ye7-stitle">{s.title}</span>
                      {s.duration && <span className="hb-ye7-dur">{s.duration}</span>}
                      <svg className="hb-ye7-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                  </div>
                  <div className="hb-ye7-body" id={`${id}-body-${s.id}`} role="region" aria-label={s.title}>
                    <div className="hb-ye7-body-in" inert={!isOpen}>
                      <div className="hb-ye7-body-pad">
                        <div>
                          <p className="hb-ye7-desc">{s.description}</p>
                          <div className="hb-ye7-btns">
                            {!isDone && s.action && <button type="button" className="hb-ye7-btn" data-tone="primary" onClick={() => setStep(s.id, true)}>{s.action}<Icon d="M5 12h14m-6-6 6 6-6 6" /></button>}
                            <button type="button" className="hb-ye7-btn" onClick={() => setStep(s.id, !isDone)}>{isDone ? "Mark as not done" : "Mark as done"}</button>
                          </div>
                        </div>
                        <div className="hb-ye7-illo"><Illustration index={i} /></div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
        <aside className="hb-ye7-side" aria-label="Help">
          <div className="hb-ye7-card" style={{ animationDelay: ".1s" }}>
            <div className="hb-ye7-card-h">Need a hand?</div>
            <p className="hb-ye7-card-p">Most teams finish setup in one sitting.</p>
            <button type="button" className="hb-ye7-help"><i><Icon d="M4 6h16v14H4V6Zm0 4h16M9 3v4m6-4v4" /></i><span>Book a walkthrough<small>15 minutes with our team</small></span></button>
            <button type="button" className="hb-ye7-help"><i><Icon d="M4 5h7v14H4V5Zm9 0h7v6h-7V5Zm0 8h7v6h-7v-6Z" /></i><span>Browse templates<small>32 ready-made dashboards</small></span></button>
            <button type="button" className="hb-ye7-help" style={{ marginBottom: 0 }}><i><Icon d="M7 3h7l5 5v13H7V3Zm7 0v5h5" /></i><span>Read the guide<small>Setup in five steps</small></span></button>
          </div>
          <div className="hb-ye7-card" style={{ animationDelay: ".18s" }}>
            <div className="hb-ye7-card-h">Your team</div>
            <p className="hb-ye7-card-p">3 people joined, 2 invites pending.</p>
            <div className="hb-ye7-team">
              {[["MO", "#6d4aff"], ["LP", "#2f7bff"], ["DR", "#22c08a"]].map(([t, c]) => <span key={t} className="hb-ye7-av" style={{ background: c }}>{t}</span>)}
              <span className="hb-ye7-av" data-empty="true" aria-hidden="true">+</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AppOnboardingChecklist;
