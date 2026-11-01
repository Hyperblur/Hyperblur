"use client";

import * as React from "react";

export interface AgentStep {
  id: string;
  title: string;
  detail?: string;
  status?: "pending" | "active" | "done" | "failed";
}

export interface AgentStepsProps extends Omit<React.HTMLAttributes<HTMLOListElement>, "children"> {
  steps?: AgentStep[];
  activeIndex?: number;
  color?: string;
  compact?: boolean;
}

const css = `
@keyframes hb-as-spin { to { transform: rotate(360deg); } }
@keyframes hb-as-draw { from { stroke-dashoffset: 16; } to { stroke-dashoffset: 0; } }
@keyframes hb-as-pulse {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-as-color, #2f7bff) 45%, transparent); }
  50% { box-shadow: 0 0 0 5px transparent; }
}
.hb-as {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
  color: #ededed;
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  line-height: 1.45;
}
.hb-as-item {
  position: relative;
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr);
  gap: 10px;
  padding-bottom: 16px;
}
.hb-as-item:last-child { padding-bottom: 0; }
.hb-as[data-compact="true"] .hb-as-item { gap: 8px; padding-bottom: 9px; }
.hb-as[data-compact="true"] { font-size: 12px; }
.hb-as-line {
  position: absolute;
  top: 24px;
  bottom: 4px;
  left: 9px;
  width: 2px;
  overflow: hidden;
  border-radius: 1px;
  background: #262626;
}
.hb-as[data-compact="true"] .hb-as-line { top: 22px; bottom: 2px; }
.hb-as-line::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--hb-as-color, #2f7bff);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform .6s cubic-bezier(.2, .9, .2, 1);
}
.hb-as-item[data-status="done"] .hb-as-line::after { transform: scaleY(1); }
.hb-as-mark {
  position: relative;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border: 1.5px solid #333333;
  border-radius: 50%;
  color: #ffffff;
  background: #111111;
  transition: background .3s ease, border-color .3s ease;
}
.hb-as[data-compact="true"] .hb-as-mark { width: 18px; height: 18px; }
.hb-as[data-compact="true"] .hb-as-line { left: 8px; }
.hb-as[data-compact="true"] .hb-as-item { grid-template-columns: 18px minmax(0, 1fr); }
.hb-as-item[data-status="done"] .hb-as-mark {
  border-color: var(--hb-as-color, #2f7bff);
  background: var(--hb-as-color, #2f7bff);
}
.hb-as-item[data-status="failed"] .hb-as-mark { border-color: #ef4444; background: #ef4444; }
.hb-as-item[data-status="active"] .hb-as-mark {
  border-color: color-mix(in srgb, var(--hb-as-color, #2f7bff) 30%, transparent);
  animation: hb-as-pulse 1.8s ease-in-out infinite;
}
.hb-as-spin {
  position: absolute;
  inset: -1.5px;
  border: 1.5px solid transparent;
  border-top-color: var(--hb-as-color, #2f7bff);
  border-radius: 50%;
  animation: hb-as-spin .8s linear infinite;
}
.hb-as-mark svg { width: 11px; height: 11px; }
.hb-as-check { stroke-dasharray: 16; animation: hb-as-draw .4s ease both; }
.hb-as-dot { width: 5px; height: 5px; border-radius: 50%; background: #444444; }
.hb-as-body { min-width: 0; padding-top: 1px; }
.hb-as-title { margin: 0; font-weight: 500; color: #ededed; overflow-wrap: anywhere; }
.hb-as-item[data-status="pending"] .hb-as-title { color: #8f8f8f; font-weight: 400; }
.hb-as-item[data-status="failed"] .hb-as-title { color: #f87171; }
.hb-as-detail { margin: 2px 0 0; color: #8f8f8f; font-size: .92em; overflow-wrap: anywhere; }
.hb-as-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-as-spin { animation-duration: 2.4s; }
  .hb-as-item[data-status="active"] .hb-as-mark { animation: none; }
  .hb-as-check { animation: none; }
  .hb-as-line::after, .hb-as-mark { transition: none; }
}
`;

const LABELS = { pending: "Pending", active: "In progress", done: "Done", failed: "Failed" } as const;

export function AgentSteps({
  steps = [],
  activeIndex,
  color = "#2f7bff",
  compact = false,
  className = "",
  style,
  ...rest
}: AgentStepsProps) {
  return (
    <ol
      className={`hb-as ${className}`}
      style={{ "--hb-as-color": color, ...style } as React.CSSProperties}
      data-compact={compact}
      aria-label="Progress"
      {...rest}
    >
      <style href="hb-agent-steps" precedence="default">{css}</style>
      {steps.map((step, i) => {
        const status: NonNullable<AgentStep["status"]> =
          step.status ??
          (activeIndex === undefined ? "pending" : i < activeIndex ? "done" : i === activeIndex ? "active" : "pending");
        return (
          <li
            key={step.id}
            className="hb-as-item"
            data-status={status}
            aria-current={status === "active" ? "step" : undefined}
          >
            {i < steps.length - 1 ? <span className="hb-as-line" aria-hidden="true" /> : null}
            <span className="hb-as-mark" aria-hidden="true">
              {status === "active" ? <span className="hb-as-spin" /> : null}
              {status === "done" ? (
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path className="hb-as-check" d="M3 8.5l3.2 3.2L13 4.8" />
                </svg>
              ) : status === "failed" ? (
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              ) : status === "pending" ? (
                <span className="hb-as-dot" />
              ) : null}
            </span>
            <div className="hb-as-body">
              <p className="hb-as-title">
                {step.title}
                <span className="hb-as-sr"> ({LABELS[status]})</span>
              </p>
              {step.detail ? <p className="hb-as-detail">{step.detail}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
