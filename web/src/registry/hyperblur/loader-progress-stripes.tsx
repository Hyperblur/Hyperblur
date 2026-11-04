"use client";

import * as React from "react";

export interface LoaderProgressStripesProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  size?: number;
  color?: string;
  accent?: string;
  showValue?: boolean;
  label?: string;
}

const css = `
.hb-qc5 {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
}
.hb-qc5 *, .hb-qc5 *::before, .hb-qc5 *::after { box-sizing: border-box; }
.hb-qc5-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  line-height: 1.3;
}
.hb-qc5-l { color: #a1a1a1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qc5-v { margin-left: auto; font-weight: 600; font-variant-numeric: tabular-nums; color: #ededed; }
.hb-qc5-track {
  position: relative;
  width: 100%;
  height: var(--hb-qc5-h);
  overflow: hidden;
  border-radius: 999px;
  background: #1f1f1f;
  box-shadow: inset 0 0 0 1px #262626;
}
.hb-qc5-fill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(var(--hb-qc5-p) * 1%);
  overflow: hidden;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--hb-qc5-c), var(--hb-qc5-a));
  transition: width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-qc5-fill::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.22) 0,
    rgba(255, 255, 255, 0.22) 6px,
    transparent 6px,
    transparent 12px
  );
  background-size: 17px 17px;
  animation: hb-qc5-slide 0.7s linear infinite;
}
.hb-qc5-fill::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 36px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55));
  filter: blur(2px);
  animation: hb-qc5-glint 1.6s ease-in-out infinite;
}
.hb-qc5-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@keyframes hb-qc5-slide { to { background-position: 17px 0; } }
@keyframes hb-qc5-glint {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qc5-fill { transition: none; }
  .hb-qc5-fill::before, .hb-qc5-fill::after { animation: none; }
}
`;

export function LoaderProgressStripes({
  value = 60,
  size = 10,
  color = "#2f7bff",
  accent = "#7fb3ff",
  showValue = true,
  label,
  className = "",
  style,
  ...rest
}: LoaderProgressStripesProps) {
  const pct = Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
  const rounded = Math.round(pct);
  const vars = {
    "--hb-qc5-h": `${size}px`,
    "--hb-qc5-c": color,
    "--hb-qc5-a": accent,
    "--hb-qc5-p": pct.toFixed(2),
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-progress-stripes" precedence="default">{css}</style>
      <div role="status" className={`hb-qc5 ${className}`} style={vars} {...rest}>
        {(label || showValue) && (
          <div className="hb-qc5-top" aria-hidden="true">
            {label ? <span className="hb-qc5-l">{label}</span> : null}
            {showValue ? <span className="hb-qc5-v">{rounded}%</span> : null}
          </div>
        )}
        <div
          className="hb-qc5-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rounded}
          aria-label={label ?? "Loading"}
        >
          <div className="hb-qc5-fill" />
        </div>
        <span className="hb-qc5-sr">{label ?? "Loading"}</span>
      </div>
    </>
  );
}
