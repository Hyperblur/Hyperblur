"use client";

import * as React from "react";

export type AnnouncementVariant = "solid" | "gradient" | "subtle";

export interface AnnouncementMessage {
  text: string;
  badge?: string;
  cta?: string;
  href?: string;
}

export interface AnnouncementBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  messages?: AnnouncementMessage[];
  variant?: AnnouncementVariant;
  interval?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
  accent?: string;
}

const defaultMessages: AnnouncementMessage[] = [
  { badge: "New", text: "Acme 2.0 is here with live team cursors.", cta: "See what changed", href: "#" },
  { text: "Join our free webinar on shipping faster, Nov 14.", cta: "Save your seat", href: "#" },
  { text: "SOC 2 Type II certification is now complete.", cta: "Read the report", href: "#" },
];

const css = `
.hb-anb {
  --hb-anb-a: #2f7bff;
  --hb-anb-bg: var(--hb-anb-a);
  --hb-anb-fg: #fff;
  --hb-anb-mut: rgba(255, 255, 255, 0.82);
  --hb-anb-line: rgba(255, 255, 255, 0.2);
  container: hb-anb / inline-size;
  display: grid;
  grid-template-rows: 1fr;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  transition: grid-template-rows 0.35s cubic-bezier(0.2, 0.9, 0.2, 1);
}
.hb-anb *, .hb-anb *::before, .hb-anb *::after { box-sizing: border-box; }
.hb-anb[data-dismissed="true"] { grid-template-rows: 0fr; visibility: hidden; transition: grid-template-rows 0.35s cubic-bezier(0.2, 0.9, 0.2, 1), visibility 0s linear 0.35s; }
.hb-anb[data-variant="gradient"] {
  --hb-anb-bg: linear-gradient(100deg, color-mix(in srgb, var(--hb-anb-a) 75%, #000), var(--hb-anb-a) 45%, color-mix(in srgb, var(--hb-anb-a) 55%, #b06bff));
}
.hb-anb[data-variant="subtle"] {
  --hb-anb-bg: #111111;
  --hb-anb-fg: #ededed;
  --hb-anb-mut: #a1a1a1;
  --hb-anb-line: #262626;
}
.hb-anb-clip { min-height: 0; overflow: hidden; }
.hb-anb-bar {
  position: relative;
  height: 40px;
  background: var(--hb-anb-bg);
  box-shadow: inset 0 -1px 0 var(--hb-anb-line);
  color: var(--hb-anb-fg);
  font-size: 13.5px;
  overflow: hidden;
}
.hb-anb[data-variant="gradient"] .hb-anb-bar::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent 30%, rgba(255, 255, 255, 0.16) 50%, transparent 70%);
  transform: translateX(-100%);
  animation: hb-anb-shine 5s ease-in-out infinite;
  pointer-events: none;
}
.hb-anb-msg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 44px;
  min-width: 0;
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.35s ease;
}
.hb-anb-msg[data-pos="active"] { opacity: 1; transform: none; }
.hb-anb-msg[data-pos="prev"] { transform: translateY(-100%); }
.hb-anb-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 450;
  line-height: 1.2;
}
.hb-anb-badge {
  flex: none;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  color: inherit;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  line-height: 1;
  text-transform: uppercase;
}
.hb-anb[data-variant="subtle"] .hb-anb-badge {
  background: color-mix(in srgb, var(--hb-anb-a) 18%, transparent);
  color: color-mix(in srgb, var(--hb-anb-a) 45%, #fff);
}
.hb-anb-cta {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 5px;
  color: inherit;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
}
.hb-anb[data-variant="subtle"] .hb-anb-cta { color: color-mix(in srgb, var(--hb-anb-a) 50%, #fff); }
.hb-anb-cta span { text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 3px; transition: text-decoration-color 0.2s ease; }
.hb-anb-cta:hover span { text-decoration-color: currentColor; }
.hb-anb-cta svg { width: 14px; height: 14px; transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.2, 1); }
.hb-anb-cta:hover svg { transform: translateX(3px); }
.hb-anb-cta:focus-visible,
.hb-anb-x:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 6px;
}
.hb-anb-x {
  position: absolute;
  top: 50%;
  right: 10px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--hb-anb-mut);
  cursor: pointer;
  transform: translateY(-50%);
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-anb-x:hover { background: rgba(255, 255, 255, 0.14); color: var(--hb-anb-fg); }
.hb-anb-x svg { width: 14px; height: 14px; }
@keyframes hb-anb-shine {
  0%, 55% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@container hb-anb (max-width: 479px) {
  .hb-anb-msg { gap: 8px; padding: 0 38px 0 14px; justify-content: flex-start; font-size: 13px; }
  .hb-anb-badge { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-anb, .hb-anb-msg, .hb-anb-cta svg, .hb-anb-x { transition: none; }
  .hb-anb[data-variant="gradient"] .hb-anb-bar::after { animation: none; display: none; }
}
`;

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function AnnouncementBar({
  messages = defaultMessages,
  variant = "solid",
  interval = 4500,
  dismissible = true,
  onDismiss,
  accent = "#2f7bff",
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: AnnouncementBarProps) {
  const count = messages.length;
  const [index, setIndex] = React.useState(0);
  const [prev, setPrev] = React.useState(-1);
  const [paused, setPaused] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const active = count > 0 ? index % count : 0;

  React.useEffect(() => {
    if (count < 2 || paused || dismissed || interval <= 0) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      setPrev(active);
      setIndex((active + 1) % count);
    }, interval);
    return () => window.clearTimeout(id);
  }, [active, count, paused, dismissed, interval]);

  function dismiss() {
    setDismissed(true);
    onDismiss?.();
  }

  const rootStyle = { "--hb-anb-a": accent, ...style } as React.CSSProperties;
  const rotating = count > 1 && !paused;

  return (
    <div
      className={`hb-anb ${className}`}
      data-variant={variant}
      data-dismissed={dismissed ? "true" : "false"}
      style={rootStyle}
      role="region"
      aria-roledescription="announcement"
      aria-label="Announcements"
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        setPaused(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setPaused(false);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        setPaused(true);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        setPaused(false);
      }}
      {...rest}
    >
      <style href="hb-announcement-bar" precedence="default">{css}</style>
      <div className="hb-anb-clip">
        <div className="hb-anb-bar" aria-live={rotating ? "off" : "polite"} aria-atomic="true">
          {messages.map((m, i) => {
            const pos = i === active ? "active" : i === prev ? "prev" : "next";
            return (
              <div
                key={`${i}-${m.text}`}
                className="hb-anb-msg"
                data-pos={pos}
                aria-hidden={pos !== "active"}
                inert={pos !== "active"}
              >
                {m.badge && <span className="hb-anb-badge">{m.badge}</span>}
                <span className="hb-anb-text">{m.text}</span>
                {m.cta && (
                  <a className="hb-anb-cta" href={m.href ?? "#"}>
                    <span>{m.cta}</span>
                    <Arrow />
                  </a>
                )}
              </div>
            );
          })}
          {dismissible && (
            <button type="button" className="hb-anb-x" aria-label="Dismiss announcement" onClick={dismiss}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <path d="m4 4 8 8M12 4l-8 8" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
