"use client";

import * as React from "react";

export interface HudDetailMeta {
  label: string;
  value: string;
}

export interface HudDetailAction {
  id: string;
  label: string;
  primary?: boolean;
}

export interface HudDetailPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  kicker?: string;
  index?: string;
  title?: string;
  description?: string;
  meta?: HudDetailMeta[];
  actions?: HudDetailAction[];
  onAction?: (id: string) => void;
  accent?: string;
}

const defaultMeta: HudDetailMeta[] = [
  { label: "Stack", value: "WebGL" },
  { label: "Licence", value: "MIT" },
  { label: "Status", value: "Live" },
  { label: "Added", value: "2026.10" },
];

const defaultActions: HudDetailAction[] = [
  { id: "open", label: "Open", primary: true },
  { id: "source", label: "Source" },
  { id: "share", label: "Share" },
];

const css = `
.hb-ua7 {
  --hb-ua7-accent: #ff4d4d;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  color: #ededed;
  font-family: inherit;
}
.hb-ua7 *, .hb-ua7 *::before, .hb-ua7 *::after { box-sizing: border-box; }
.hb-ua7-in {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid rgba(255,255,255,.12);
  background: linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.015)), #0c0c0c;
}
.hb-ua7-k { position: absolute; width: 10px; height: 10px; border: 0 solid rgba(255,255,255,.6); pointer-events: none; }
.hb-ua7-k-tl { left: -1px; top: -1px; border-left-width: 1px; border-top-width: 1px; border-color: var(--hb-ua7-accent); }
.hb-ua7-k-tr { right: -1px; top: -1px; border-right-width: 1px; border-top-width: 1px; }
.hb-ua7-k-bl { left: -1px; bottom: -1px; border-left-width: 1px; border-bottom-width: 1px; }
.hb-ua7-k-br { right: -1px; bottom: -1px; border-right-width: 1px; border-bottom-width: 1px; }
.hb-ua7-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-ua7-top { display: flex; justify-content: space-between; gap: 10px; color: #8f8f8f; }
.hb-ua7-top span:first-child { color: var(--hb-ua7-accent); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ua7-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -.005em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hb-ua7-desc {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: #a1a1a1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hb-ua7-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 4px 0 4px;
  border-top: 1px solid rgba(255,255,255,.08);
  border-left: 1px solid rgba(255,255,255,.08);
}
.hb-ua7-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
  height: 23px;
  padding: 0 8px;
  border-right: 1px solid rgba(255,255,255,.08);
  border-bottom: 1px solid rgba(255,255,255,.08);
}
.hb-ua7-cell dt { margin: 0; color: #5f5f5f; font-size: 9px; }
.hb-ua7-cell dd { margin: 0; color: #ededed; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
@container (min-width: 520px) {
  .hb-ua7-grid { grid-template-columns: repeat(4, 1fr); }
  .hb-ua7-cell { flex-direction: column; align-items: flex-start; justify-content: center; gap: 3px; height: 44px; }
  .hb-ua7-title { font-size: 26px; }
}
.hb-ua7-actions { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-ua7-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 26px;
  margin: 0;
  padding: 0 12px;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 0;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color .18s ease, background-color .18s ease, box-shadow .2s ease, transform .1s ease;
}
.hb-ua7-btn::before { content: "["; color: #5f5f5f; }
.hb-ua7-btn::after { content: "]"; color: #5f5f5f; }
.hb-ua7-btn:hover { border-color: color-mix(in srgb, var(--hb-ua7-accent) 70%, transparent); background: color-mix(in srgb, var(--hb-ua7-accent) 8%, transparent); }
.hb-ua7-btn:active { transform: translateY(1px); }
.hb-ua7-btn:focus-visible { outline: 1px solid #ededed; outline-offset: 2px; }
.hb-ua7-btn[data-primary="true"] {
  border-color: var(--hb-ua7-accent);
  background: var(--hb-ua7-accent);
  color: #fff;
  box-shadow: 0 0 18px -4px color-mix(in srgb, var(--hb-ua7-accent) 80%, transparent);
}
.hb-ua7-btn[data-primary="true"]::before, .hb-ua7-btn[data-primary="true"]::after { color: rgba(255,255,255,.7); }
.hb-ua7-btn[data-primary="true"]:hover { background: color-mix(in srgb, var(--hb-ua7-accent) 85%, #fff); }
@media (prefers-reduced-motion: reduce) {
  .hb-ua7-btn { transition: none; }
}
`;

export function HudDetailPanel({
  kicker = "Experiment / Shader",
  index = "014",
  title = "Ion Drift",
  description = "Charged particles bending around the cursor in a slow magnetic field.",
  meta = defaultMeta,
  actions = defaultActions,
  onAction,
  accent = "#ff4d4d",
  className,
  style,
  ...rest
}: HudDetailPanelProps) {
  return (
    <div
      className={["hb-ua7", className].filter(Boolean).join(" ")}
      style={{ ["--hb-ua7-accent" as string]: accent, ...style }}
      {...rest}
    >
      <style href="hb-hud-detail-panel" precedence="default">{css}</style>
      <div className="hb-ua7-in">
        <span className="hb-ua7-k hb-ua7-k-tl" aria-hidden="true" />
        <span className="hb-ua7-k hb-ua7-k-tr" aria-hidden="true" />
        <span className="hb-ua7-k hb-ua7-k-bl" aria-hidden="true" />
        <span className="hb-ua7-k hb-ua7-k-br" aria-hidden="true" />
        <div className="hb-ua7-mono hb-ua7-top">
          <span>{kicker}</span>
          {index ? <span>{index}</span> : null}
        </div>
        <h3 className="hb-ua7-title">{title}</h3>
        {description ? <p className="hb-ua7-desc">{description}</p> : null}
        {meta.length ? (
          <dl className="hb-ua7-mono hb-ua7-grid">
            {meta.map((m) => (
              <div key={m.label} className="hb-ua7-cell">
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {actions.length ? (
          <div className="hb-ua7-actions">
            {actions.map((a) => (
              <button
                key={a.id}
                type="button"
                className="hb-ua7-btn"
                data-primary={a.primary ? "true" : "false"}
                onClick={() => onAction?.(a.id)}
              >
                {a.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HudDetailPanel;
