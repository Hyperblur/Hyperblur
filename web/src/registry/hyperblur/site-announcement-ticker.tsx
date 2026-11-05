"use client";

import * as React from "react";

export interface TickerItem {
  text: string;
  href?: string;
  tag?: string;
}

export interface SiteAnnouncementTickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: TickerItem[];
  interval?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
  pauseOnHover?: boolean;
  label?: string;
  accent?: string;
}

const defaultItems: TickerItem[] = [
  { tag: "New", text: "Workspaces 2.0 is live", href: "#" },
  { tag: "Event", text: "Product keynote, Nov 18", href: "#" },
  { tag: "Offer", text: "25% off annual billing", href: "#" },
];

const css = `
.hb-yfa {
  position: relative;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr;
  width: 100%;
  font-family: inherit;
  font-size: 12.5px;
  color: #ededed;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
}
.hb-yfa *, .hb-yfa *::before, .hb-yfa *::after { box-sizing: border-box; font-family: inherit; }
.hb-yfa[data-closing="true"] { grid-template-rows: 0fr; opacity: 0; }
.hb-yfa-clip { min-height: 0; overflow: hidden; }
.hb-yfa-bar {
  position: relative;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) 56px;
  align-items: center;
  height: 36px;
  background: #111111;
  border-bottom: 1px solid #262626;
}
.hb-yfa-view { position: relative; height: 36px; overflow: hidden; }
.hb-yfa-row { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 0 4px; white-space: nowrap; }
.hb-yfa-row[data-role="in"] { animation: hb-yfa-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.hb-yfa-row[data-role="in"][data-first="true"] { animation: none; }
.hb-yfa-row[data-role="out"] { animation: hb-yfa-out 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; pointer-events: none; }
.hb-yfa-tag { flex: none; padding: 0 7px; font-size: 10px; font-weight: 600; line-height: 16px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--hb-yfa-a, #7fb3ff); background: color-mix(in srgb, var(--hb-yfa-a, #2f7bff) 16%, transparent); border: 1px solid color-mix(in srgb, var(--hb-yfa-a, #2f7bff) 38%, transparent); border-radius: 999px; }
.hb-yfa-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; color: #d4d4d4; }
.hb-yfa-link { display: flex; align-items: center; gap: 8px; min-width: 0; color: inherit; text-decoration: none; border-radius: 6px; }
.hb-yfa-link:hover .hb-yfa-text { color: #ffffff; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #555555; }
.hb-yfa-link:focus-visible { outline: 2px solid var(--hb-yfa-a, #2f7bff); outline-offset: 3px; }
.hb-yfa-arrow { flex: none; width: 11px; height: 11px; color: #8f8f8f; transition: transform 0.2s ease; }
.hb-yfa-link:hover .hb-yfa-arrow { transform: translateX(2px); color: #ededed; }
.hb-yfa-count { justify-self: start; padding-left: 14px; font-family: var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 10.5px; font-variant-numeric: tabular-nums; color: #6b6b6b; }
.hb-yfa-end { justify-self: end; padding-right: 8px; }
.hb-yfa-close { display: grid; place-items: center; width: 24px; height: 24px; margin: 0; padding: 0; color: #8f8f8f; background: transparent; border: 0; border-radius: 8px; cursor: pointer; transition: background-color 0.15s ease, color 0.15s ease; }
.hb-yfa-close:hover { color: #ededed; background: rgba(255, 255, 255, 0.08); }
.hb-yfa-close:focus-visible { outline: 2px solid var(--hb-yfa-a, #2f7bff); outline-offset: 1px; }
.hb-yfa-close svg { width: 10px; height: 10px; }
.hb-yfa-prog { position: absolute; left: 0; bottom: -1px; height: 2px; width: 100%; background: var(--hb-yfa-a, #2f7bff); opacity: 0.55; transform-origin: left center; animation: hb-yfa-prog linear both; }
.hb-yfa[data-paused="true"] .hb-yfa-prog { animation-play-state: paused; }
@keyframes hb-yfa-in { from { transform: translateY(100%); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes hb-yfa-out { from { transform: none; opacity: 1; } to { transform: translateY(-100%); opacity: 0; } }
@keyframes hb-yfa-prog { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-yfa { transition: none; }
  .hb-yfa-row[data-role="in"] { animation: none; }
  .hb-yfa-row[data-role="out"] { display: none; }
  .hb-yfa-arrow, .hb-yfa-close { transition: none; }
}
`;

function Row({ item, role, first }: { item: TickerItem; role: "in" | "out"; first?: boolean }) {
  const body = (
    <>
      {item.tag ? <span className="hb-yfa-tag">{item.tag}</span> : null}
      <span className="hb-yfa-text">{item.text}</span>
    </>
  );
  return (
    <div className="hb-yfa-row" data-role={role} data-first={first} aria-hidden={role === "out" ? true : undefined}>
      {item.href && role === "in" ? (
        <a className="hb-yfa-link" href={item.href}>
          {body}
          <svg className="hb-yfa-arrow" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      ) : (
        <span className="hb-yfa-link">{body}</span>
      )}
    </div>
  );
}

export function SiteAnnouncementTicker({
  items = defaultItems,
  interval = 3200,
  dismissible = true,
  onDismiss,
  pauseOnHover = true,
  label = "Announcements",
  accent = "#2f7bff",
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: SiteAnnouncementTickerProps) {
  const n = items.length;
  const [pos, setPos] = React.useState({ index: 0, prev: 0, cycle: 0 });
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const [gone, setGone] = React.useState(false);
  const timer = React.useRef(0);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  if (n === 0 || gone) return null;

  const index = Math.min(pos.index, n - 1);
  const paused = pauseOnHover && (hover || focus);

  function advance() {
    setPos((p) => ({ index: (p.index + 1) % n, prev: p.index, cycle: p.cycle + 1 }));
  }

  function dismiss() {
    setClosing(true);
    onDismiss?.();
    timer.current = window.setTimeout(() => setGone(true), 320);
  }

  return (
    <>
      <style href="hb-site-announcement-ticker" precedence="default">{css}</style>
      <div
        role="region"
        aria-label={label}
        data-paused={paused}
        data-closing={closing}
        className={`hb-yfa ${className}`}
        style={{ "--hb-yfa-a": accent, ...style } as React.CSSProperties}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          setHover(true);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          setHover(false);
        }}
        onFocus={(e) => {
          onFocus?.(e);
          setFocus(true);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocus(false);
        }}
        {...rest}
      >
        <div className="hb-yfa-clip">
          <div className="hb-yfa-bar">
            <span className="hb-yfa-count" aria-hidden="true">
              {n > 1 ? `${index + 1}/${n}` : ""}
            </span>
            <div className="hb-yfa-view" aria-live="off">
              {pos.cycle > 0 ? <Row key={`o-${pos.cycle}`} item={items[Math.min(pos.prev, n - 1)]} role="out" /> : null}
              <Row key={`i-${pos.cycle}`} item={items[index]} role="in" first={pos.cycle === 0} />
            </div>
            <span className="hb-yfa-end">
              {dismissible ? (
                <button type="button" className="hb-yfa-close" aria-label="Dismiss announcements" onClick={dismiss}>
                  <svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1.8 1.8l6.4 6.4M8.2 1.8l-6.4 6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              ) : null}
            </span>
            {n > 1 && !closing ? (
              <span
                key={pos.cycle}
                className="hb-yfa-prog"
                aria-hidden="true"
                style={{ animationDuration: `${Math.max(600, interval)}ms` }}
                onAnimationEnd={advance}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
