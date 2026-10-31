"use client";

import * as React from "react";

export interface StepperStep {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface StepperLabels {
  back: string;
  next: string;
  finish: string;
}

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  steps: StepperStep[];
  initialStep?: number;
  onStepChange?: (index: number) => void;
  onFinish?: () => void;
  labels?: Partial<StepperLabels>;
  allowClickNavigation?: boolean;
}

const css = `
@keyframes hb-st-fwd {
  from { opacity: 0; transform: translateX(28px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes hb-st-back {
  from { opacity: 0; transform: translateX(-28px); }
  to { opacity: 1; transform: translateX(0); }
}
.hb-st {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  color: #fff;
}
.hb-st-head { position: relative; }
.hb-st-line {
  position: absolute;
  top: 13px;
  left: calc(100% / (2 * var(--hb-n)));
  right: calc(100% / (2 * var(--hb-n)));
  height: 2px;
  overflow: hidden;
  border-radius: 2px;
  background: rgba(255, 255, 255, .15);
}
.hb-st-fill {
  display: block;
  width: 100%;
  height: 100%;
  background: #2f7bff;
  transform: scaleX(var(--hb-fill));
  transform-origin: left center;
  transition: transform .45s cubic-bezier(.2, .9, .2, 1);
}
.hb-st-list {
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-st-item {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.hb-st-dot {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 2px solid rgba(255, 255, 255, .22);
  border-radius: 50%;
  background: #121212;
  color: rgba(255, 255, 255, .55);
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  transition: background .3s ease, border-color .3s ease, color .3s ease, box-shadow .3s ease;
}
button.hb-st-dot { cursor: pointer; }
button.hb-st-dot:hover { border-color: #2f7bff; }
.hb-st-dot:focus-visible { outline: 2px solid #2f7bff; outline-offset: 3px; }
.hb-st-item[data-state="done"] .hb-st-dot { border-color: #2f7bff; background: #2f7bff; color: #fff; }
.hb-st-item[data-state="current"] .hb-st-dot {
  border-color: #2f7bff;
  color: #fff;
  box-shadow: 0 0 0 4px rgba(47, 123, 255, .22);
}
.hb-st-title {
  max-width: 100%;
  overflow: hidden;
  color: rgba(255, 255, 255, .5);
  font-size: 11px;
  line-height: 1.2;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color .3s ease;
}
.hb-st-item[data-state="current"] .hb-st-title,
.hb-st-item[data-state="done"] .hb-st-title { color: #fff; }
.hb-st-body { position: relative; overflow: hidden; padding: 2px; }
.hb-st-panel[data-dir="1"] { animation: hb-st-fwd .35s cubic-bezier(.2, .9, .2, 1) both; }
.hb-st-panel[data-dir="-1"] { animation: hb-st-back .35s cubic-bezier(.2, .9, .2, 1) both; }
.hb-st-actions { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.hb-st-btn {
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, .25);
  border-radius: 8px;
  background: transparent;
  color: #fff;
  font: inherit;
  font-size: 13px;
  line-height: 1.2;
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease, opacity .2s ease;
}
.hb-st-btn:hover:not(:disabled) { background: rgba(255, 255, 255, .1); }
.hb-st-btn:focus-visible { outline: 2px solid #2f7bff; outline-offset: 2px; }
.hb-st-btn:disabled { opacity: .35; cursor: default; }
.hb-st-btn[data-primary="true"] { border-color: #2f7bff; background: #2f7bff; }
.hb-st-btn[data-primary="true"]:hover:not(:disabled) { background: #5393ff; }
@media (prefers-reduced-motion: reduce) {
  .hb-st-panel[data-dir] { animation: none; }
  .hb-st-fill, .hb-st-dot, .hb-st-title, .hb-st-btn { transition: none; }
}
`;

const defaultLabels: StepperLabels = { back: "Back", next: "Next", finish: "Finish" };

export function Stepper({
  steps,
  initialStep = 0,
  onStepChange,
  onFinish,
  labels,
  allowClickNavigation = true,
  className = "",
  style,
  ...rest
}: StepperProps) {
  const total = steps.length;
  const last = Math.max(0, total - 1);
  const [current, setCurrent] = React.useState(() =>
    Math.min(Math.max(0, Math.round(initialStep) || 0), last),
  );
  const [dir, setDir] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  const text = { ...defaultLabels, ...labels };
  const index = Math.min(current, last);
  const step = steps[index];
  const isLast = index === last;

  function go(to: number) {
    const target = Math.min(Math.max(0, to), last);
    setFinished(false);
    if (target === index) return;
    setDir(target > index ? 1 : -1);
    setCurrent(target);
    onStepChange?.(target);
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      onFinish?.();
      return;
    }
    go(index + 1);
  }

  const vars = {
    "--hb-n": Math.max(1, total),
    "--hb-fill": finished ? 1 : last > 0 ? index / last : 0,
    ...style,
  } as React.CSSProperties;

  if (!step) return null;

  return (
    <div className={`hb-st ${className}`} style={vars} {...rest}>
      <style href="hb-stepper" precedence="default">{css}</style>
      <div className="hb-st-head">
        <div className="hb-st-line" aria-hidden="true">
          <i className="hb-st-fill" />
        </div>
        <ol className="hb-st-list">
          {steps.map((s, i) => {
            const done = finished || i < index;
            const state = done ? "done" : i === index ? "current" : "todo";
            const marker = done ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            ) : (
              i + 1
            );
            const clickable = allowClickNavigation && done && !(finished && i === last);
            return (
              <li
                className="hb-st-item"
                key={s.id}
                data-state={state}
                aria-current={i === index && !finished ? "step" : undefined}
              >
                {clickable ? (
                  <button
                    type="button"
                    className="hb-st-dot"
                    aria-label={`Go to step ${i + 1}: ${s.title}`}
                    onClick={() => go(i)}
                  >
                    {marker}
                  </button>
                ) : (
                  <span className="hb-st-dot">{marker}</span>
                )}
                <span className="hb-st-title">{s.title}</span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="hb-st-body" aria-live="polite">
        <div className="hb-st-panel" key={step.id} data-dir={dir}>
          {step.content}
        </div>
      </div>
      <div className="hb-st-actions">
        <button type="button" className="hb-st-btn" disabled={index === 0 && !finished} onClick={() => go(finished ? index : index - 1)}>
          {text.back}
        </button>
        <button type="button" className="hb-st-btn" data-primary="true" disabled={finished} onClick={handleNext}>
          {isLast ? text.finish : text.next}
        </button>
      </div>
    </div>
  );
}
