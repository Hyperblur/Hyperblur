"use client";

import * as React from "react";

export interface ThinkingIndicatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  phrases?: string[];
  interval?: number;
  showTimer?: boolean;
  variant?: "dots" | "shimmer";
  color?: string;
}

const css = `
@keyframes hb-ti-breathe {
  0%, 100% { opacity: .35; transform: scale(.7); }
  50% { opacity: 1; transform: scale(1); }
}
@keyframes hb-ti-sheen {
  from { background-position: 100% 0; }
  to { background-position: 0 0; }
}
@keyframes hb-ti-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
}
.hb-ti {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #8f8f8f;
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  line-height: 1.4;
}
.hb-ti-dots { display: inline-flex; gap: 4px; align-items: center; }
.hb-ti-dots i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-ti-color, #2f7bff);
  animation: hb-ti-breathe 1.4s ease-in-out infinite;
}
.hb-ti-dots i:nth-child(2) { animation-delay: .18s; }
.hb-ti-dots i:nth-child(3) { animation-delay: .36s; }
.hb-ti-label { display: inline-block; animation: hb-ti-in .35s ease both; }
.hb-ti[data-variant="shimmer"] .hb-ti-label {
  color: transparent;
  background-image: linear-gradient(90deg, #6b6b6b 0%, #6b6b6b 38%, #ededed 50%, #6b6b6b 62%, #6b6b6b 100%);
  background-size: 260% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: hb-ti-in .35s ease both, hb-ti-sheen 2s linear infinite;
}
.hb-ti-time {
  padding: 1px 6px;
  border: 1px solid #262626;
  border-radius: 999px;
  color: #8f8f8f;
  font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  background: #111111;
}
.hb-ti-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-ti-dots i { animation: none; opacity: .8; transform: none; }
  .hb-ti-label, .hb-ti[data-variant="shimmer"] .hb-ti-label { animation: none; }
  .hb-ti[data-variant="shimmer"] .hb-ti-label { color: #b5b5b5; background: none; }
}
`;

function formatElapsed(total: number) {
  if (total < 60) return `${total}s`;
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function ThinkingIndicator({
  phrases = ["Thinking", "Searching", "Writing"],
  interval = 1800,
  showTimer = false,
  variant = "shimmer",
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: ThinkingIndicatorProps) {
  const [index, setIndex] = React.useState(0);
  const [elapsed, setElapsed] = React.useState(0);
  const key = phrases.join("\u0001");
  const count = phrases.length;

  React.useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), Math.max(300, interval));
    return () => window.clearInterval(id);
  }, [key, count, interval]);

  React.useEffect(() => {
    if (!showTimer) return;
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [showTimer]);

  const current = count > 0 ? phrases[index % count] : "Thinking";

  return (
    <div
      className={`hb-ti ${className}`}
      style={{ "--hb-ti-color": color, ...style } as React.CSSProperties}
      data-variant={variant}
      role="status"
      {...rest}
    >
      <style href="hb-thinking-indicator" precedence="default">{css}</style>
      <span className="hb-ti-sr">{count > 0 ? phrases[0] : "Thinking"}</span>
      {variant === "dots" ? (
        <span className="hb-ti-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      ) : null}
      <span className="hb-ti-label" key={index} aria-hidden="true">
        {current}
        {variant === "shimmer" ? "..." : ""}
      </span>
      {showTimer ? (
        <span className="hb-ti-time" aria-hidden="true">
          {formatElapsed(elapsed)}
        </span>
      ) : null}
    </div>
  );
}
