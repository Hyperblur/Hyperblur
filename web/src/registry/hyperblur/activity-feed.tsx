"use client";

import * as React from "react";

export type ActivityTone = "default" | "success" | "warning" | "danger";

export interface ActivityFeedItem {
  id: string;
  actor: string;
  action: string;
  target?: string;
  time: string;
  avatar?: React.ReactNode;
  detail?: React.ReactNode;
  tone?: ActivityTone;
}

export interface ActivityFeedProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: ActivityFeedItem[];
  maxHeight?: number;
  showLine?: boolean;
  color?: string;
}

const css = `
.hb-af {
  position: relative;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  font-size: 13px;
  line-height: 1.45;
  --hb-af-accent: #2f7bff;
}
.hb-af-scroll {
  max-height: var(--hb-af-max, none);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: #2a2a2a transparent;
}
.hb-af-list { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-af-item {
  position: relative;
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  column-gap: 12px;
  padding-bottom: 16px;
  animation: hb-af-in .5s cubic-bezier(.22, .8, .24, 1) both;
  animation-delay: var(--hb-af-d, 0s);
}
.hb-af-item:last-child { padding-bottom: 0; }
.hb-af[data-line="true"] .hb-af-item::before {
  content: "";
  position: absolute;
  left: 13px;
  top: 34px;
  bottom: 6px;
  width: 1px;
  background: #262626;
}
.hb-af[data-line="true"] .hb-af-item:last-child::before { display: none; }
.hb-af-avatar {
  position: relative;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--hb-af-bg, #262626);
  color: #ededed;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .02em;
}
.hb-af-avatar > img, .hb-af-avatar > svg { width: 100%; height: 100%; object-fit: cover; }
.hb-af-dot {
  position: absolute;
  right: -1px;
  bottom: -1px;
  z-index: 1;
  width: 9px;
  height: 9px;
  border: 2px solid var(--hb-af-surface, #111111);
  border-radius: 999px;
  background: var(--hb-af-tone, var(--hb-af-accent));
  box-sizing: content-box;
}
.hb-af-wrap { position: relative; width: 28px; height: 28px; }
.hb-af-body { min-width: 0; padding-top: 4px; }
.hb-af-line { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 6px; }
.hb-af-text { min-width: 0; color: #8f8f8f; overflow-wrap: anywhere; }
.hb-af-actor { color: #ededed; font-weight: 500; }
.hb-af-target { color: #ededed; font-weight: 500; }
.hb-af-time { flex: none; color: #8f8f8f; font-size: 12px; white-space: nowrap; }
.hb-af-detail {
  margin-top: 8px;
  padding: 10px 12px;
  border: 1px solid #262626;
  border-radius: 10px;
  background: #111111;
  color: #ededed;
  font-size: 12.5px;
}
@keyframes hb-af-in {
  from { opacity: 0; transform: translate3d(0, 10px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-af-item { animation: none; }
}
`;

const TONES: Record<ActivityTone, string> = {
  default: "var(--hb-af-accent)",
  success: "#3ecf8e",
  warning: "#f5a524",
  danger: "#f4525e",
};

const SWATCHES = ["#1d3a6e", "#3b2a63", "#14463a", "#5a3217", "#5b2230", "#2b3a45"];

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function swatch(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return SWATCHES[sum % SWATCHES.length];
}

export function ActivityFeed({
  items,
  maxHeight,
  showLine = true,
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: ActivityFeedProps) {
  const vars = {
    "--hb-af-accent": color,
    "--hb-af-max": maxHeight === undefined ? "none" : `${Math.max(0, maxHeight)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-af ${className}`} data-line={showLine} style={vars} {...rest}>
      <style href="hb-activity-feed" precedence="default">{css}</style>
      <div className="hb-af-scroll">
        <ol className="hb-af-list">
          {items.map((item, i) => {
            const tone = item.tone ?? "default";
            return (
              <li
                key={item.id}
                className="hb-af-item"
                style={{ "--hb-af-d": `${Math.min(i, 10) * 0.07}s`, "--hb-af-tone": TONES[tone] } as React.CSSProperties}
              >
                <div className="hb-af-wrap">
                  <span
                    className="hb-af-avatar"
                    style={{ "--hb-af-bg": swatch(item.actor) } as React.CSSProperties}
                    aria-hidden="true"
                  >
                    {item.avatar ?? initials(item.actor)}
                  </span>
                  <span className="hb-af-dot" aria-hidden="true" />
                </div>
                <div className="hb-af-body">
                  <div className="hb-af-line">
                    <span className="hb-af-text">
                      <span className="hb-af-actor">{item.actor}</span> {item.action}
                      {item.target ? (
                        <>
                          {" "}
                          <span className="hb-af-target">{item.target}</span>
                        </>
                      ) : null}
                    </span>
                    <span className="hb-af-time">{item.time}</span>
                  </div>
                  {item.detail ? <div className="hb-af-detail">{item.detail}</div> : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
