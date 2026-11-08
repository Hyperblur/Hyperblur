"use client";

import * as React from "react";

export interface PopupTourStep {
  target: string;
  title: string;
  body: string;
}

export interface PopupTourSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: PopupTourStep[];
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultStep?: number;
  onStepChange?: (index: number) => void;
  onFinish?: (completed: boolean) => void;
  padding?: number;
  showTrigger?: boolean;
  triggerLabel?: string;
  embedded?: boolean;
  accent?: string;
}

const defaultSteps: PopupTourStep[] = [
  { target: "[data-tour='search']", title: "Find anything", body: "Press / to search projects, people and files from any screen." },
  { target: "[data-tour='new']", title: "Start a project", body: "Briefs, sprints and launch checklists are one click away." },
  { target: "[data-tour='insights']", title: "Watch the numbers", body: "Weekly throughput updates live as your team closes tasks." },
  { target: "[data-tour='team']", title: "Bring your team", body: "Invite teammates. Guests only see the projects you share." },
];

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const css = `
.hb-xf8 { --hb-xf8-accent: #2f7bff; position: relative; box-sizing: border-box; width: 100%; overflow: hidden; border-radius: 16px; font-family: inherit; color: #ededed; isolation: isolate; }
.hb-xf8 *, .hb-xf8 *::before, .hb-xf8 *::after { box-sizing: border-box; }
.hb-xf8-layer { position: absolute; inset: 0; z-index: 20; }
.hb-xf8-hole { position: absolute; border-radius: 12px; box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-xf8-accent) 70%, transparent), 0 0 0 6px color-mix(in srgb, var(--hb-xf8-accent) 18%, transparent), 0 0 0 200vmax rgba(3,3,5,.66); transition: top .55s cubic-bezier(.65,0,.2,1.15), left .55s cubic-bezier(.65,0,.2,1.15), width .55s cubic-bezier(.65,0,.2,1.15), height .55s cubic-bezier(.65,0,.2,1.15); pointer-events: none; animation: hb-xf8-fade .35s ease both; }
.hb-xf8-hole::after { content: ""; position: absolute; inset: -6px; border-radius: 16px; border: 1.5px solid var(--hb-xf8-accent); opacity: 0; animation: hb-xf8-pulse 2s cubic-bezier(.2,.7,.3,1) .6s infinite; }
.hb-xf8-card { position: absolute; width: min(272px, calc(100% - 16px)); padding: 14px 14px 12px; border-radius: 16px; background: linear-gradient(180deg, #1a1a1a, #121212); border: 1px solid #2c2c2c; box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 24px 48px -16px rgba(0,0,0,.85); outline: none; transition: top .55s cubic-bezier(.65,0,.2,1.1), left .55s cubic-bezier(.65,0,.2,1.1); animation: hb-xf8-in .45s cubic-bezier(.16,1,.3,1) both; }
.hb-xf8-card[data-ready="false"] { visibility: hidden; }
.hb-xf8-tail { position: absolute; width: 12px; height: 12px; background: #1a1a1a; border: 1px solid #2c2c2c; transform: rotate(45deg); transition: left .55s cubic-bezier(.65,0,.2,1.1); }
.hb-xf8-card[data-side="below"] .hb-xf8-tail { top: -6.5px; border-right: 0; border-bottom: 0; border-radius: 3px 0 0 0; }
.hb-xf8-card[data-side="above"] .hb-xf8-tail { bottom: -6.5px; border-left: 0; border-top: 0; background: #121212; border-radius: 0 0 3px 0; }
.hb-xf8-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.hb-xf8-count { font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; letter-spacing: .08em; color: color-mix(in srgb, var(--hb-xf8-accent) 70%, #fff); }
.hb-xf8-skip { all: unset; font-size: 11.5px; color: #7a7a7a; cursor: pointer; border-radius: 4px; transition: color .2s; }
.hb-xf8-skip:hover { color: #ededed; }
.hb-xf8-skip:focus-visible { outline: 2px solid var(--hb-xf8-accent); outline-offset: 2px; }
.hb-xf8-text { animation: hb-xf8-swap .4s cubic-bezier(.2,.8,.2,1) both; }
.hb-xf8-title { margin: 0; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-xf8-body { margin: 4px 0 0; font-size: 12.5px; line-height: 1.45; color: #a1a1a1; }
.hb-xf8-foot { display: flex; align-items: center; gap: 8px; margin-top: 12px; }
.hb-xf8-dots { display: flex; gap: 4px; flex: 1; }
.hb-xf8-dot { height: 4px; width: 8px; border-radius: 999px; background: #2e2e2e; transition: width .4s cubic-bezier(.3,1.3,.5,1), background .3s; }
.hb-xf8-dot[data-on="true"] { width: 20px; background: var(--hb-xf8-accent); }
.hb-xf8-dot[data-past="true"] { background: color-mix(in srgb, var(--hb-xf8-accent) 45%, #2e2e2e); }
.hb-xf8-btn { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 12px; border-radius: 9px; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: background .2s, transform .15s cubic-bezier(.3,.7,.4,1), filter .2s; white-space: nowrap; }
.hb-xf8-btn:active { transform: scale(.96); }
.hb-xf8-btn:focus-visible { outline: 2px solid var(--hb-xf8-accent); outline-offset: 2px; }
.hb-xf8-back { color: #a1a1a1; }
.hb-xf8-back:hover { background: #222; color: #ededed; }
.hb-xf8-next { color: #fff; background: var(--hb-xf8-accent); box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 6px 16px -8px var(--hb-xf8-accent); }
.hb-xf8-next:hover { filter: brightness(1.1); }
.hb-xf8-next svg { width: 12px; height: 12px; }
.hb-xf8-start { all: unset; box-sizing: border-box; position: absolute; right: 12px; bottom: 12px; z-index: 5; display: inline-flex; align-items: center; gap: 7px; height: 32px; padding: 0 12px 0 10px; border-radius: 999px; font-size: 12.5px; font-weight: 600; color: #fff; background: var(--hb-xf8-accent); box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 10px 24px -10px var(--hb-xf8-accent); cursor: pointer; animation: hb-xf8-in .4s cubic-bezier(.16,1,.3,1) both; transition: transform .15s cubic-bezier(.3,.7,.4,1); }
.hb-xf8-start:active { transform: scale(.96); }
.hb-xf8-start:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xf8-start svg { width: 14px; height: 14px; }
.hb-xf8-app { display: grid; grid-template-columns: 112px 1fr; min-height: 300px; background: #0c0c0c; border: 1px solid #1f1f1f; border-radius: 16px; overflow: hidden; }
.hb-xf8-side { padding: 12px 8px; border-right: 1px solid #1c1c1c; background: #0e0e0e; display: grid; align-content: start; gap: 2px; }
.hb-xf8-brand { display: flex; align-items: center; gap: 7px; padding: 0 6px 10px; font-size: 12px; font-weight: 600; }
.hb-xf8-brand i { font-style: normal; width: 16px; height: 16px; border-radius: 5px; background: linear-gradient(135deg, var(--hb-xf8-accent), #9b6bff); }
.hb-xf8-nav { display: flex; align-items: center; gap: 7px; height: 26px; padding: 0 6px; border-radius: 7px; font-size: 11.5px; color: #8f8f8f; }
.hb-xf8-nav[data-on="true"] { color: #ededed; background: #181818; }
.hb-xf8-nav span { width: 10px; height: 10px; border-radius: 3px; border: 1.5px solid currentColor; opacity: .7; }
.hb-xf8-main { padding: 12px; display: grid; align-content: start; gap: 10px; min-width: 0; }
.hb-xf8-bar { display: flex; align-items: center; gap: 8px; }
.hb-xf8-search { flex: 1; min-width: 0; display: flex; align-items: center; gap: 7px; height: 30px; padding: 0 9px; border-radius: 9px; background: #141414; border: 1px solid #222; font-size: 11.5px; color: #6f6f6f; }
.hb-xf8-search svg { width: 12px; height: 12px; flex: none; }
.hb-xf8-search kbd { margin-left: auto; font-family: var(--font-mono), ui-monospace, monospace; font-size: 10px; padding: 1px 5px; border-radius: 4px; border: 1px solid #2a2a2a; color: #8f8f8f; }
.hb-xf8-new { display: inline-flex; align-items: center; gap: 5px; height: 30px; padding: 0 10px; border-radius: 9px; font-size: 11.5px; font-weight: 600; color: #0a0a0a; background: #ededed; white-space: nowrap; }
.hb-xf8-team { display: flex; }
.hb-xf8-team span { width: 24px; height: 24px; border-radius: 50%; margin-left: -6px; box-shadow: 0 0 0 2px #0c0c0c; display: grid; place-items: center; font-size: 9px; font-weight: 600; color: #fff; }
.hb-xf8-cards { display: grid; grid-template-columns: 1.4fr 1fr; gap: 10px; }
.hb-xf8-panel { border-radius: 12px; background: #121212; border: 1px solid #1f1f1f; padding: 10px; min-width: 0; }
.hb-xf8-ptitle { font-size: 10.5px; color: #8f8f8f; }
.hb-xf8-pval { margin-top: 2px; font-size: 18px; font-weight: 600; letter-spacing: -.02em; }
.hb-xf8-pval small { font-size: 10.5px; color: #3ddc84; font-weight: 500; margin-left: 4px; }
.hb-xf8-chart { display: flex; align-items: flex-end; gap: 4px; height: 70px; margin-top: 8px; }
.hb-xf8-chart span { flex: 1; border-radius: 3px 3px 1px 1px; background: linear-gradient(color-mix(in srgb, var(--hb-xf8-accent) 80%, #fff 0%), color-mix(in srgb, var(--hb-xf8-accent) 30%, #121212)); }
.hb-xf8-task { display: flex; align-items: center; gap: 7px; padding: 6px 0; font-size: 11px; color: #bdbdbd; border-bottom: 1px solid #1a1a1a; }
.hb-xf8-task:last-child { border-bottom: 0; }
.hb-xf8-task i { font-style: normal; width: 10px; height: 10px; border-radius: 50%; border: 1.5px solid #3a3a3a; flex: none; }
.hb-xf8-task[data-done="true"] i { background: #3ddc84; border-color: #3ddc84; }
.hb-xf8-task[data-done="true"] { color: #6f6f6f; text-decoration: line-through; }
@keyframes hb-xf8-fade { from { opacity: 0; } }
@keyframes hb-xf8-in { from { opacity: 0; transform: translateY(6px) scale(.97); } }
@keyframes hb-xf8-swap { from { opacity: 0; transform: translateY(4px); } }
@keyframes hb-xf8-pulse { 0% { opacity: .9; transform: scale(.98); } 80%, 100% { opacity: 0; transform: scale(1.08); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xf8 *, .hb-xf8 *::after { animation: none !important; transition: none !important; }
}
`;

function DefaultApp() {
  const bars = [38, 52, 44, 61, 57, 72, 66, 84, 78, 92];
  return (
    <div className="hb-xf8-app">
      <div className="hb-xf8-side">
        <div className="hb-xf8-brand"><i aria-hidden="true" />Northwind</div>
        {["Home", "Projects", "Inbox", "Reports", "Settings"].map((n, i) => (
          <div key={n} className="hb-xf8-nav" data-on={i === 1}><span aria-hidden="true" />{n}</div>
        ))}
      </div>
      <div className="hb-xf8-main">
        <div className="hb-xf8-bar">
          <div className="hb-xf8-search" data-tour="search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
            Search projects
            <kbd>/</kbd>
          </div>
          <div className="hb-xf8-new" data-tour="new">+ New</div>
          <div className="hb-xf8-team" data-tour="team" style={{ paddingLeft: 6 }}>
            <span style={{ background: "#c2456e" }}>AK</span>
            <span style={{ background: "#2f7bff" }}>JM</span>
            <span style={{ background: "#d08a2a" }}>RS</span>
          </div>
        </div>
        <div className="hb-xf8-cards">
          <div className="hb-xf8-panel" data-tour="insights">
            <div className="hb-xf8-ptitle">Tasks closed this week</div>
            <div className="hb-xf8-pval">148<small>+18%</small></div>
            <div className="hb-xf8-chart" aria-hidden="true">
              {bars.map((b, i) => (
                <span key={i} style={{ height: `${b}%` }} />
              ))}
            </div>
          </div>
          <div className="hb-xf8-panel">
            <div className="hb-xf8-ptitle">Today</div>
            {[
              ["Review launch copy", true],
              ["Sync with design", true],
              ["QA checkout flow", false],
              ["Ship v2.4 notes", false],
            ].map(([t, d]) => (
              <div key={String(t)} className="hb-xf8-task" data-done={d ? "true" : "false"}><i aria-hidden="true" />{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type Box = { top: number; left: number; width: number; height: number };

export function PopupTourSpotlight({
  steps = defaultSteps,
  children,
  open,
  defaultOpen,
  onOpenChange,
  defaultStep = 0,
  onStepChange,
  onFinish,
  padding = 6,
  showTrigger = true,
  triggerLabel = "Take the tour",
  embedded = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PopupTourSpotlightProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const active = (open ?? inner) && steps.length > 0;
  const [index, setIndex] = React.useState(Math.min(defaultStep, Math.max(0, steps.length - 1)));
  const [hole, setHole] = React.useState<Box | null>(null);
  const [card, setCard] = React.useState({ top: 0, left: 0, tail: 24, side: "below" as "below" | "above" });
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const startRef = React.useRef<HTMLButtonElement>(null);
  const touched = React.useRef(false);
  const finishRef = React.useRef(onFinish);
  const step = steps[Math.min(index, steps.length - 1)];

  React.useEffect(() => {
    finishRef.current = onFinish;
  });

  const setOpen = React.useCallback(
    (value: boolean) => {
      touched.current = true;
      if (open === undefined) setInner(value);
      onOpenChange?.(value);
    },
    [open, onOpenChange],
  );

  const finish = React.useCallback(
    (completed: boolean) => {
      finishRef.current?.(completed);
      setOpen(false);
    },
    [setOpen],
  );

  const go = (next: number) => {
    if (next >= steps.length) {
      finish(true);
      return;
    }
    const v = Math.max(0, next);
    setIndex(v);
    onStepChange?.(v);
  };

  const measure = React.useCallback(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || !step) return;
    const el = stage.querySelector<HTMLElement>(step.target);
    const rr = root.getBoundingClientRect();
    const k = rr.width / (root.offsetWidth || 1) || 1;
    const r = { width: root.offsetWidth, height: root.offsetHeight };
    const box: Box = el
      ? (() => {
          const t = el.getBoundingClientRect();
          return { top: (t.top - rr.top) / k - padding, left: (t.left - rr.left) / k - padding, width: t.width / k + padding * 2, height: t.height / k + padding * 2 };
        })()
      : { top: r.height / 2, left: r.width / 2, width: 0, height: 0 };
    setHole(box);
    const cw = cardRef.current?.offsetWidth ?? 272;
    const ch = cardRef.current?.offsetHeight ?? 150;
    const gap = 14;
    const below = r.height - (box.top + box.height) >= ch + gap + 8 || box.top < ch + gap + 8;
    const top = below ? Math.min(box.top + box.height + gap, r.height - ch - 8) : box.top - gap - ch;
    const center = box.left + box.width / 2;
    const left = Math.max(8, Math.min(r.width - cw - 8, center - cw / 2));
    const tail = Math.max(16, Math.min(cw - 28, center - left - 6));
    setCard({ top: Math.round(Math.max(8, top)), left: Math.round(left), tail: Math.round(tail), side: below ? "below" : "above" });
  }, [step, padding]);

  React.useEffect(() => {
    if (!active) return;
    const a = requestAnimationFrame(() => {
      measure();
      requestAnimationFrame(measure);
    });
    const ro = new ResizeObserver(() => measure());
    if (rootRef.current) ro.observe(rootRef.current);
    return () => {
      cancelAnimationFrame(a);
      ro.disconnect();
    };
  }, [active, measure]);

  React.useEffect(() => {
    if (!active || embedded) return;
    const panel = cardRef.current;
    if (!panel) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const fallback = startRef;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    panel.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        finish(false);
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(focusable));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const cur = document.activeElement;
      if (e.shiftKey && (cur === first || cur === panel || !panel.contains(cur))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (cur === last || !panel.contains(cur))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      if (opener && opener.isConnected) opener.focus({ preventScroll: true });
      else requestAnimationFrame(() => fallback.current?.focus({ preventScroll: true }));
    };
  }, [active, embedded, finish]);

  React.useEffect(() => {
    if (!embedded || !touched.current) return;
    if (active) cardRef.current?.focus({ preventScroll: true });
    else startRef.current?.focus({ preventScroll: true });
  }, [embedded, active]);

  const onCardKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "Escape" && embedded) {
      e.stopPropagation();
      finish(false);
    }
  };

  const last = index >= steps.length - 1;

  return (
    <div ref={rootRef} className={`hb-xf8 ${className}`} style={{ "--hb-xf8-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-popup-tour-spotlight" precedence="default">{css}</style>
      <div ref={stageRef} inert={active}>
        {children ?? <DefaultApp />}
      </div>
      {active && step && (
        <div className="hb-xf8-layer">
          {hole && <div className="hb-xf8-hole" style={{ top: hole.top, left: hole.left, width: hole.width, height: hole.height }} aria-hidden="true" />}
          <div
            ref={cardRef}
            className="hb-xf8-card"
            role="dialog"
            aria-modal={embedded ? undefined : true}
            aria-labelledby={`${uid}-t`}
            aria-describedby={`${uid}-b`}
            tabIndex={-1}
            data-side={card.side}
            data-ready={hole ? "true" : "false"}
            style={{ top: card.top, left: card.left }}
            onKeyDown={onCardKey}
          >
            <span className="hb-xf8-tail" style={{ left: card.tail }} aria-hidden="true" />
            <div className="hb-xf8-meta">
              <span className="hb-xf8-count">STEP {index + 1} / {steps.length}</span>
              <button type="button" className="hb-xf8-skip" onClick={() => finish(false)}>Skip tour</button>
            </div>
            <div className="hb-xf8-text" key={index} aria-live="polite">
              <h3 className="hb-xf8-title" id={`${uid}-t`}>{step.title}</h3>
              <p className="hb-xf8-body" id={`${uid}-b`}>{step.body}</p>
            </div>
            <div className="hb-xf8-foot">
              <div className="hb-xf8-dots" aria-hidden="true">
                {steps.map((s, i) => (
                  <span key={s.target + i} className="hb-xf8-dot" data-on={i === index} data-past={i < index} />
                ))}
              </div>
              {index > 0 && (
                <button type="button" className="hb-xf8-btn hb-xf8-back" onClick={() => go(index - 1)}>Back</button>
              )}
              <button type="button" className="hb-xf8-btn hb-xf8-next" onClick={() => go(index + 1)}>
                {last ? "Finish" : "Next"}
                {!last && (
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 6h7M6.5 3l3 3-3 3" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {!active && showTrigger && (
        <button
          ref={startRef}
          type="button"
          className="hb-xf8-start"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="m10 8.5 5 3.5-5 3.5z" fill="currentColor" /></svg>
          {triggerLabel}
        </button>
      )}
    </div>
  );
}
