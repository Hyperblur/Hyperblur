"use client";

import * as React from "react";

export interface TourStep {
  id: string;
  x: number;
  y: number;
  title: string;
  body: string;
}

export interface SiteHotspotTourProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  steps?: TourStep[];
  step?: number;
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  running?: boolean;
  defaultRunning?: boolean;
  onRunningChange?: (running: boolean) => void;
  onFinish?: () => void;
  onSkip?: () => void;
  popoverWidth?: number;
  replayLabel?: string;
  accent?: string;
}

const defaultSteps: TourStep[] = [
  { id: "search", x: 40, y: 12, title: "Search anything", body: "Jump to any report or teammate." },
  { id: "chart", x: 72, y: 28, title: "Live metrics", body: "Numbers refresh every minute." },
  { id: "nav", x: 14, y: 70, title: "Your workspaces", body: "Switch projects from here." },
  { id: "share", x: 88, y: 86, title: "Share a view", body: "Send a read-only link." },
];

const css = `
.hb-yf9 {
  --hb-yf9-pw: 176px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.35;
  color: #ededed;
  text-align: left;
  outline: none;
}
.hb-yf9 *, .hb-yf9 *::before, .hb-yf9 *::after { box-sizing: border-box; font-family: inherit; }
.hb-yf9-stage { position: absolute; inset: 0; transition: filter 0.3s ease; }
.hb-yf9[data-run="true"] .hb-yf9-stage { filter: saturate(0.7) brightness(0.72); }
.hb-yf9-mock { display: grid; grid-template-columns: 22% 1fr; grid-template-rows: 18% 1fr; width: 100%; height: 100%; background: #0d0d0d; }
.hb-yf9-mock > div { border: 0 solid #1f1f1f; }
.hb-yf9-mh { grid-column: 1 / 3; border-bottom-width: 1px !important; background: #111111; }
.hb-yf9-ms { border-right-width: 1px !important; background: #101010; padding: 10px; display: grid; align-content: start; gap: 8px; }
.hb-yf9-mm { padding: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; align-content: start; }
.hb-yf9-bar { display: block; height: 8px; border-radius: 4px; background: #222222; }
.hb-yf9-blk { min-height: 44px; border-radius: 8px; background: #161616; border: 1px solid #222222; }
.hb-yf9-spot {
  position: absolute;
  z-index: 3;
  left: calc(var(--hb-yf9-x) * 1%);
  top: calc(var(--hb-yf9-y) * 1%);
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin: -13px 0 0 -13px;
  padding: 0;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}
.hb-yf9-dot { position: relative; z-index: 1; width: 12px; height: 12px; background: var(--hb-yf9-a, #2f7bff); border: 2px solid #fff; border-radius: 50%; transition: transform 0.2s ease, background-color 0.2s ease; }
.hb-yf9-spot::before, .hb-yf9-spot::after { content: ""; position: absolute; inset: 3px; border: 2px solid var(--hb-yf9-a, #2f7bff); border-radius: 50%; opacity: 0; animation: hb-yf9-pulse 2.2s ease-out infinite; }
.hb-yf9-spot::after { animation-delay: 1.1s; }
.hb-yf9-spot[data-on="false"] { opacity: 0.75; }
.hb-yf9-spot[data-on="false"]::before, .hb-yf9-spot[data-on="false"]::after { animation-duration: 3.4s; }
.hb-yf9-spot[data-on="true"] .hb-yf9-dot { transform: scale(1.25); background: #fff; border-color: var(--hb-yf9-a, #2f7bff); }
.hb-yf9-spot:hover .hb-yf9-dot { transform: scale(1.25); }
.hb-yf9-spot:focus-visible { outline: 2px solid #fff; outline-offset: 1px; }
.hb-yf9-pop {
  position: absolute;
  z-index: 4;
  width: var(--hb-yf9-pw);
  left: clamp(8px, calc(var(--hb-yf9-x) * 1% - var(--hb-yf9-pw) / 2), calc(100% - var(--hb-yf9-pw) - 8px));
  padding: 10px 10px 8px 12px;
  background: #151515;
  border: 1px solid #333333;
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
  outline: none;
  animation: hb-yf9-pop 0.3s cubic-bezier(0.22, 1.2, 0.36, 1) both;
}
.hb-yf9-pop[data-side="below"] { top: calc(var(--hb-yf9-y) * 1% + 18px); }
.hb-yf9-pop[data-side="above"] { bottom: calc((100 - var(--hb-yf9-y)) * 1% + 18px); }
.hb-yf9-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.hb-yf9-title { margin: 0; font-size: 12.5px; font-weight: 600; letter-spacing: -0.005em; }
.hb-yf9-count { flex: none; font-size: 10.5px; font-variant-numeric: tabular-nums; color: #8f8f8f; }
.hb-yf9-body { margin: 3px 0 8px; font-size: 11px; line-height: 1.4; color: #a1a1a1; }
.hb-yf9-foot { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.hb-yf9-grp { display: flex; align-items: center; gap: 4px; }
.hb-yf9-btn { height: 24px; margin: 0; padding: 0 10px; font: inherit; font-size: 11px; font-weight: 600; color: #ededed; white-space: nowrap; background: transparent; border: 1px solid #333333; border-radius: 999px; cursor: pointer; transition: background-color 0.15s ease, transform 0.15s ease; }
.hb-yf9-btn:hover { background: rgba(255, 255, 255, 0.07); }
.hb-yf9-btn:active { transform: scale(0.96); }
.hb-yf9-btn:focus-visible { outline: 2px solid var(--hb-yf9-a, #2f7bff); outline-offset: 2px; }
.hb-yf9-btn[data-kind="ghost"] { border-color: transparent; color: #8f8f8f; padding: 0 6px; }
.hb-yf9-btn[data-kind="primary"] { color: #fff; background: var(--hb-yf9-a, #2f7bff); border-color: var(--hb-yf9-a, #2f7bff); }
.hb-yf9-btn[data-kind="primary"]:hover { background: color-mix(in srgb, var(--hb-yf9-a, #2f7bff) 86%, #fff); }
.hb-yf9-btn:disabled { opacity: 0.4; cursor: default; }
.hb-yf9-replay { position: absolute; z-index: 4; right: 8px; bottom: 8px; display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 12px; font: inherit; font-size: 11.5px; font-weight: 600; color: #ededed; background: #151515; border: 1px solid #333333; border-radius: 999px; cursor: pointer; animation: hb-yf9-pop 0.3s ease both; }
.hb-yf9-replay:hover { background: #1c1c1c; }
.hb-yf9-replay:focus-visible { outline: 2px solid var(--hb-yf9-a, #2f7bff); outline-offset: 2px; }
.hb-yf9-replay svg { width: 11px; height: 11px; }
@keyframes hb-yf9-pulse { 0% { transform: scale(0.55); opacity: 0.85; } 100% { transform: scale(1.6); opacity: 0; } }
@keyframes hb-yf9-pop { from { opacity: 0; transform: translateY(6px) scale(0.96); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-yf9-spot::before, .hb-yf9-spot::after { animation: none; opacity: 0.4; transform: scale(1.2); }
  .hb-yf9-pop, .hb-yf9-replay { animation: none; }
  .hb-yf9-dot, .hb-yf9-btn, .hb-yf9-stage { transition: none; }
}
`;

function DefaultMock() {
  return (
    <div className="hb-yf9-mock">
      <div className="hb-yf9-mh" />
      <div className="hb-yf9-ms">
        <span className="hb-yf9-bar" />
        <span className="hb-yf9-bar" style={{ width: "70%" }} />
        <span className="hb-yf9-bar" style={{ width: "85%" }} />
      </div>
      <div className="hb-yf9-mm">
        <span className="hb-yf9-blk" />
        <span className="hb-yf9-blk" />
        <span className="hb-yf9-blk" style={{ gridColumn: "1 / 3" }} />
      </div>
    </div>
  );
}

export function SiteHotspotTour({
  steps = defaultSteps,
  step,
  defaultStep = 0,
  onStepChange,
  running,
  defaultRunning = true,
  onRunningChange,
  onFinish,
  onSkip,
  popoverWidth = 176,
  replayLabel = "Replay tour",
  accent = "#2f7bff",
  className = "",
  style,
  children,
  onKeyDown,
  ...rest
}: SiteHotspotTourProps) {
  const [innerStep, setInnerStep] = React.useState(defaultStep);
  const [innerRun, setInnerRun] = React.useState(defaultRunning);
  const popRef = React.useRef<HTMLDivElement>(null);
  const interacted = React.useRef(false);
  const stepControlled = step !== undefined;
  const runControlled = running !== undefined;
  const count = steps.length;
  const index = Math.min(Math.max(0, stepControlled ? step : innerStep), Math.max(0, count - 1));
  const isRunning = (runControlled ? running : innerRun) && count > 0;
  const current = steps[index];

  React.useEffect(() => {
    if (interacted.current && isRunning) popRef.current?.focus({ preventScroll: true });
  }, [index, isRunning]);

  function setStep(next: number) {
    interacted.current = true;
    if (!stepControlled) setInnerStep(next);
    onStepChange?.(next);
  }

  function setRun(next: boolean) {
    if (!runControlled) setInnerRun(next);
    onRunningChange?.(next);
  }

  function next() {
    if (index >= count - 1) {
      setRun(false);
      onFinish?.();
      return;
    }
    setStep(index + 1);
  }

  function back() {
    if (index > 0) setStep(index - 1);
  }

  function skip() {
    setRun(false);
    onSkip?.();
  }

  function replay() {
    interacted.current = true;
    if (!stepControlled) setInnerStep(0);
    onStepChange?.(0);
    setRun(true);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (!isRunning) return;
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      back();
    } else if (e.key === "Escape") {
      e.stopPropagation();
      skip();
    }
  }

  return (
    <>
      <style href="hb-site-hotspot-tour" precedence="default">{css}</style>
      <div
        role="group"
        aria-label="Product tour"
        tabIndex={-1}
        data-run={isRunning}
        className={`hb-yf9 ${className}`}
        style={{ "--hb-yf9-a": accent, "--hb-yf9-pw": `${popoverWidth}px`, ...style } as React.CSSProperties}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <div className="hb-yf9-stage">{children ?? <DefaultMock />}</div>
        {isRunning
          ? steps.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="hb-yf9-spot"
                data-on={i === index}
                aria-label={`Step ${i + 1} of ${count}: ${s.title}`}
                aria-current={i === index ? "step" : undefined}
                style={{ "--hb-yf9-x": s.x, "--hb-yf9-y": s.y } as React.CSSProperties}
                onClick={() => setStep(i)}
              >
                <span className="hb-yf9-dot" />
              </button>
            ))
          : null}
        {isRunning && current ? (
          <div
            key={current.id}
            ref={popRef}
            role="dialog"
            aria-label={current.title}
            tabIndex={-1}
            className="hb-yf9-pop"
            data-side={current.y > 52 ? "above" : "below"}
            style={{ "--hb-yf9-x": current.x, "--hb-yf9-y": current.y } as React.CSSProperties}
          >
            <div className="hb-yf9-top">
              <h3 className="hb-yf9-title">{current.title}</h3>
              <span className="hb-yf9-count" aria-live="polite">{index + 1} / {count}</span>
            </div>
            <p className="hb-yf9-body">{current.body}</p>
            <div className="hb-yf9-foot">
              <button type="button" className="hb-yf9-btn" data-kind="ghost" onClick={skip}>
                Skip
              </button>
              <span className="hb-yf9-grp">
                <button type="button" className="hb-yf9-btn" onClick={back} disabled={index === 0}>
                  Back
                </button>
                <button type="button" className="hb-yf9-btn" data-kind="primary" onClick={next}>
                  {index === count - 1 ? "Done" : "Next"}
                </button>
              </span>
            </div>
          </div>
        ) : null}
        {!isRunning && count > 0 ? (
          <button type="button" className="hb-yf9-replay" onClick={replay}>
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M10 6a4 4 0 1 1-1.2-2.8M10 1.8v2.4H7.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {replayLabel}
          </button>
        ) : null}
      </div>
    </>
  );
}
