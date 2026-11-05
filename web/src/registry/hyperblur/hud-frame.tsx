"use client";

import * as React from "react";

export type HudFrameTone = "live" | "idle" | "warn";

export interface HudFrameProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  label?: string;
  code?: string;
  status?: string;
  tone?: HudFrameTone;
  scan?: boolean;
  accent?: string;
  children?: React.ReactNode;
}

const css = `
.hb-ua2 {
  --hb-ua2-accent: #ff4d4d;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.12);
  background:
    linear-gradient(rgba(255,255,255,.025), rgba(255,255,255,.025)),
    radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1.2px) 0 0 / 12px 12px,
    #0a0a0a;
  color: #ededed;
  font-family: inherit;
}
.hb-ua2 *, .hb-ua2 *::before, .hb-ua2 *::after { box-sizing: border-box; }
.hb-ua2-k {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 0 solid var(--hb-ua2-accent);
  pointer-events: none;
  z-index: 3;
}
.hb-ua2-k-tl { left: -1px; top: -1px; border-left-width: 1px; border-top-width: 1px; }
.hb-ua2-k-tr { right: -1px; top: -1px; border-right-width: 1px; border-top-width: 1px; }
.hb-ua2-k-bl { left: -1px; bottom: -1px; border-left-width: 1px; border-bottom-width: 1px; }
.hb-ua2-k-br { right: -1px; bottom: -1px; border-right-width: 1px; border-bottom-width: 1px; }
.hb-ua2-head {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 30px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(255,255,255,.08);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-ua2-label {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: #a1a1a1;
}
.hb-ua2-label span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-ua2-code { color: #5f5f5f; white-space: nowrap; }
.hb-ua2-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
  padding: 3px 7px;
  border: 1px solid rgba(255,255,255,.14);
  color: #ededed;
  white-space: nowrap;
}
.hb-ua2-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #8f8f8f;
}
.hb-ua2-chip[data-tone="live"] { border-color: color-mix(in srgb, var(--hb-ua2-accent) 55%, transparent); }
.hb-ua2-chip[data-tone="live"] .hb-ua2-dot { background: var(--hb-ua2-accent); box-shadow: 0 0 8px var(--hb-ua2-accent); animation: hb-ua2-blink 1.6s steps(2, jump-none) infinite; }
.hb-ua2-chip[data-tone="warn"] { border-color: rgba(255, 196, 77, .5); }
.hb-ua2-chip[data-tone="warn"] .hb-ua2-dot { background: #ffc44d; }
.hb-ua2-body {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 0;
  padding: 12px;
}
.hb-ua2-scan {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 38%;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--hb-ua2-accent) 9%, transparent) 85%, color-mix(in srgb, var(--hb-ua2-accent) 55%, transparent) 100%);
  border-bottom: 1px solid color-mix(in srgb, var(--hb-ua2-accent) 40%, transparent);
  transform: translateY(-100%);
  animation: hb-ua2-scan 4.2s cubic-bezier(.45, 0, .55, 1) infinite;
}
@keyframes hb-ua2-scan {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(270%); opacity: 0; }
}
@keyframes hb-ua2-blink { 50% { opacity: .35; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ua2-scan { display: none; }
  .hb-ua2-chip[data-tone="live"] .hb-ua2-dot { animation: none; }
}
`;

export function HudFrame({
  label = "Telemetry",
  code = "SYS-04",
  status = "Live",
  tone = "live",
  scan = true,
  accent = "#ff4d4d",
  children,
  className,
  style,
  ...rest
}: HudFrameProps) {
  return (
    <div
      className={["hb-ua2", className].filter(Boolean).join(" ")}
      style={{ ["--hb-ua2-accent" as string]: accent, ...style }}
      {...rest}
    >
      <style href="hb-hud-frame" precedence="default">{css}</style>
      <span className="hb-ua2-k hb-ua2-k-tl" aria-hidden="true" />
      <span className="hb-ua2-k hb-ua2-k-tr" aria-hidden="true" />
      <span className="hb-ua2-k hb-ua2-k-bl" aria-hidden="true" />
      <span className="hb-ua2-k hb-ua2-k-br" aria-hidden="true" />
      {scan ? <span className="hb-ua2-scan" aria-hidden="true" /> : null}
      <div className="hb-ua2-head">
        <span className="hb-ua2-label">
          <span>{label}</span>
          {code ? <span className="hb-ua2-code">{code}</span> : null}
        </span>
        {status ? (
          <span className="hb-ua2-chip" data-tone={tone}>
            <span className="hb-ua2-dot" aria-hidden="true" />
            {status}
          </span>
        ) : null}
      </div>
      <div className="hb-ua2-body">{children}</div>
    </div>
  );
}

export default HudFrame;
