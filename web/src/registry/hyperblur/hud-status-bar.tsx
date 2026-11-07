"use client";

import * as React from "react";

export interface HudStatusItem {
  label: string;
  value: string;
}

export interface HudStatusHint {
  keys: string;
  label: string;
}

export interface HudStatusBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  code?: string;
  items?: HudStatusItem[];
  hints?: HudStatusHint[];
  accent?: string;
}

const defaultItems: HudStatusItem[] = [
  { label: "Stack", value: "WebGL" },
  { label: "Licence", value: "MIT" },
  { label: "Status", value: "Live" },
  { label: "Added", value: "2026.10" },
];

const defaultHints: HudStatusHint[] = [
  { keys: "← →", label: "Browse" },
  { keys: "/", label: "Search" },
  { keys: "↵", label: "Open" },
];

const css = `
.hb-ua6 {
  --hb-ua6-accent: #ff4d4d;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  color: #ededed;
}
.hb-ua6 *, .hb-ua6 *::before, .hb-ua6 *::after { box-sizing: border-box; }
.hb-ua6-in {
  position: relative;
  display: flex;
  align-items: stretch;
  min-height: 40px;
  border-top: 1px solid rgba(255,255,255,.12);
  border-bottom: 1px solid rgba(255,255,255,.06);
  background: rgba(255,255,255,.025);
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-ua6-in::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  width: 36px;
  height: 1px;
  background: var(--hb-ua6-accent);
  box-shadow: 0 0 8px var(--hb-ua6-accent);
}
.hb-ua6-key {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 0 14px 0 10px;
  border-right: 1px solid rgba(255,255,255,.1);
}
.hb-ua6-sq { flex: 0 0 auto; width: 6px; height: 6px; background: var(--hb-ua6-accent); box-shadow: 0 0 8px var(--hb-ua6-accent); }
.hb-ua6-title { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: #fff; }
.hb-ua6-code { color: #5f5f5f; white-space: nowrap; }
.hb-ua6-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  min-width: 0;
  padding: 0 12px;
  border-right: 1px solid rgba(255,255,255,.1);
}
.hb-ua6-label { color: #5f5f5f; font-size: 9px; white-space: nowrap; }
.hb-ua6-val { position: relative; display: block; overflow: hidden; height: 13px; line-height: 13px; white-space: nowrap; color: #ededed; }
.hb-ua6-val span { display: block; animation: hb-ua6-up .42s cubic-bezier(.2, .8, .2, 1) both; }
.hb-ua6-gap { flex: 1 1 auto; }
.hb-ua6-hints { display: flex; align-items: center; gap: 12px; padding: 0 10px 0 12px; color: #8f8f8f; }
.hb-ua6-hint { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
.hb-ua6-kbd {
  display: inline-grid;
  place-items: center;
  min-width: 18px;
  height: 16px;
  padding: 0 4px;
  border: 1px solid rgba(255,255,255,.18);
  color: #ededed;
  font: inherit;
  font-size: 9px;
  letter-spacing: .04em;
}
@keyframes hb-ua6-up {
  from { transform: translateY(100%); opacity: 0; color: var(--hb-ua6-accent); }
  60% { color: var(--hb-ua6-accent); }
  to { transform: none; opacity: 1; }
}
@container (max-width: 640px) {
  .hb-ua6-hint:nth-child(n+2) { display: none; }
}
@container (max-width: 470px) {
  .hb-ua6-item:nth-of-type(n+5) { display: none; }
  .hb-ua6-code { display: none; }
}
@container (max-width: 360px) {
  .hb-ua6-item:nth-of-type(n+4) { display: none; }
  .hb-ua6-hint span:last-child { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ua6-val span { animation: none; }
}
`;

export function HudStatusBar({
  title = "Ion Drift",
  code = "EXP 014",
  items = defaultItems,
  hints = defaultHints,
  accent = "#ff4d4d",
  className,
  style,
  ...rest
}: HudStatusBarProps) {
  return (
    <div
      className={["hb-ua6", className].filter(Boolean).join(" ")}
      style={{ ["--hb-ua6-accent" as string]: accent, ...style }}
      {...rest}
    >
      <style href="hb-hud-status-bar" precedence="default">{css}</style>
      <div className="hb-ua6-in">
        <div className="hb-ua6-key">
          <span className="hb-ua6-sq" aria-hidden="true" />
          <span className="hb-ua6-title">{title}</span>
          {code ? <span className="hb-ua6-code">{code}</span> : null}
        </div>
        {items.map((item) => (
          <div key={item.label} className="hb-ua6-item">
            <span className="hb-ua6-label">{item.label}</span>
            <span className="hb-ua6-val">
              <span key={item.value}>{item.value}</span>
            </span>
          </div>
        ))}
        <span className="hb-ua6-gap" />
        {hints.length ? (
          <div className="hb-ua6-hints" aria-label="Keyboard shortcuts">
            {hints.map((h) => (
              <span key={h.label} className="hb-ua6-hint">
                <kbd className="hb-ua6-kbd">{h.keys}</kbd>
                <span>{h.label}</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HudStatusBar;
