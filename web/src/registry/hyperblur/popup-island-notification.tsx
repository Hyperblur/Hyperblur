"use client";

import * as React from "react";

export interface PopupIslandItem {
  id: string;
  from: string;
  context: string;
  time: string;
  message: string;
  tint?: string;
}

export interface PopupIslandNotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  notifications?: PopupIslandItem[];
  defaultExpanded?: boolean;
  duration?: number;
  position?: "top" | "bottom";
  onReply?: (id: string, text: string) => void;
  onMarkRead?: (id: string) => void;
  onExpandedChange?: (expanded: boolean) => void;
  loop?: boolean;
  embedded?: boolean;
  accent?: string;
}

const defaultNotifications: PopupIslandItem[] = [
  { id: "n1", from: "Priya Raman", context: "#design-review", time: "now", message: "Pushed the new onboarding frames. Can you check the empty states before standup?", tint: "#e0679a" },
  { id: "n2", from: "Diego Alvarez", context: "Pull request #318", time: "2m", message: "Approved with one nit: the retry delay should back off, not stay at 2s.", tint: "#4fa3ff" },
  { id: "n3", from: "Hana Sato", context: "Direct message", time: "9m", message: "Lunch at Tartine at 12:30? I booked a table for four.", tint: "#f2a53a" },
];

const css = `
.hb-xf11 { --hb-xf11-accent: #3ddc84; position: fixed; left: 50%; top: 12px; z-index: 950; transform: translateX(-50%); box-sizing: border-box; font-family: inherit; color: #ededed; }
.hb-xf11[data-pos="bottom"] { top: auto; bottom: 16px; }
.hb-xf11 *, .hb-xf11 *::before, .hb-xf11 *::after { box-sizing: border-box; }
.hb-xf11-embedded { position: relative; left: auto; top: auto; bottom: auto; transform: none; display: flex; justify-content: center; width: 100%; }
.hb-xf11-island { position: relative; width: var(--hb-xf11-w); height: var(--hb-xf11-h); max-width: calc(100vw - 24px); border-radius: var(--hb-xf11-r); background: #050505; box-shadow: inset 0 0 0 1px rgba(255,255,255,.07), inset 0 1px 0 rgba(255,255,255,.06), 0 20px 50px -20px rgba(0,0,0,.9), 0 0 0 1px rgba(0,0,0,.6); overflow: hidden; transition: width .55s cubic-bezier(.32,1.4,.46,1), height .55s cubic-bezier(.32,1.4,.46,1), border-radius .5s cubic-bezier(.32,1.2,.46,1); animation: hb-xf11-drop .6s cubic-bezier(.3,1.4,.5,1) both; }
.hb-xf11-embedded .hb-xf11-island { max-width: 100%; }
.hb-xf11-pill { all: unset; box-sizing: border-box; position: absolute; inset: 0; display: flex; align-items: center; gap: 8px; padding: 0 8px 0 6px; cursor: pointer; transition: opacity .2s ease; }
.hb-xf11-pill:focus-visible { outline: 2px solid var(--hb-xf11-accent); outline-offset: -2px; border-radius: inherit; }
.hb-xf11[data-mode="expanded"] .hb-xf11-pill, .hb-xf11[data-mode="reply"] .hb-xf11-pill { opacity: 0; pointer-events: none; }
.hb-xf11-mini { width: 26px; height: 26px; border-radius: 50%; flex: none; display: grid; place-items: center; font-size: 10px; font-weight: 600; color: #fff; background: radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--hb-xf11-tint) 70%, #fff), var(--hb-xf11-tint)); }
.hb-xf11-pilltext { flex: 1; min-width: 0; font-size: 12px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xf11-wave { display: flex; align-items: center; gap: 2px; height: 14px; }
.hb-xf11-wave i { font-style: normal; width: 2.5px; border-radius: 2px; background: var(--hb-xf11-accent); animation: hb-xf11-wave 1s ease-in-out infinite; }
.hb-xf11-wave i:nth-child(1) { height: 6px; }
.hb-xf11-wave i:nth-child(2) { height: 12px; animation-delay: .15s; }
.hb-xf11-wave i:nth-child(3) { height: 8px; animation-delay: .3s; }
.hb-xf11-count { min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px; display: grid; place-items: center; font-size: 11px; font-weight: 700; color: #0a0a0a; background: var(--hb-xf11-accent); font-variant-numeric: tabular-nums; }
.hb-xf11-done { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 12px; color: #d4d4d4; animation: hb-xf11-fade .4s ease .2s both; }
.hb-xf11-done svg { width: 14px; height: 14px; color: var(--hb-xf11-accent); }
.hb-xf11-card { position: absolute; left: 0; top: 0; width: min(360px, calc(100vw - 24px)); padding: 14px 14px 12px; opacity: 0; pointer-events: none; transform: scale(.94); transform-origin: 50% 0; filter: blur(4px); transition: opacity .25s ease, transform .45s cubic-bezier(.3,1.3,.5,1), filter .3s ease; }
.hb-xf11-embedded .hb-xf11-card { width: var(--hb-xf11-w); max-width: 100%; }
.hb-xf11[data-mode="expanded"] .hb-xf11-card, .hb-xf11[data-mode="reply"] .hb-xf11-card { opacity: 1; pointer-events: auto; transform: none; filter: none; transition-delay: .12s, .08s, .12s; }
.hb-xf11-row { display: flex; gap: 11px; }
.hb-xf11-ava { position: relative; width: 38px; height: 38px; border-radius: 50%; flex: none; display: grid; place-items: center; font-size: 13px; font-weight: 600; color: #fff; background: radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--hb-xf11-tint) 70%, #fff), var(--hb-xf11-tint)); }
.hb-xf11-ava::after { content: ""; position: absolute; right: -1px; bottom: -1px; width: 12px; height: 12px; border-radius: 50%; background: var(--hb-xf11-accent); box-shadow: 0 0 0 2.5px #050505; }
.hb-xf11-head { display: flex; align-items: baseline; gap: 6px; }
.hb-xf11-from { font-size: 13px; font-weight: 600; white-space: nowrap; }
.hb-xf11-ctx { flex: 1; min-width: 0; font-size: 11.5px; color: #7a7a7a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xf11-time { font-size: 11px; color: #6a6a6a; }
.hb-xf11-msg { margin: 3px 0 0; font-size: 12.5px; line-height: 1.42; color: #cfcfcf; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hb-xf11-actions { display: flex; gap: 6px; margin-top: 11px; }
.hb-xf11-btn { all: unset; box-sizing: border-box; flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 32px; border-radius: 999px; font-size: 12.5px; font-weight: 600; cursor: pointer; background: #1a1a1a; color: #ededed; transition: background .2s, transform .15s cubic-bezier(.3,.7,.4,1); }
.hb-xf11-btn:hover { background: #242424; }
.hb-xf11-btn:active { transform: scale(.96); }
.hb-xf11-btn:focus-visible { outline: 2px solid var(--hb-xf11-accent); outline-offset: 2px; }
.hb-xf11-btn svg { width: 13px; height: 13px; }
.hb-xf11-primary { background: #ededed; color: #0a0a0a; }
.hb-xf11-primary:hover { background: #fff; }
.hb-xf11-reply { display: flex; gap: 6px; margin-top: 11px; padding: 4px 4px 4px 12px; border-radius: 999px; background: #151515; border: 1px solid #262626; animation: hb-xf11-fade .3s ease both; }
.hb-xf11-reply:focus-within { border-color: color-mix(in srgb, var(--hb-xf11-accent) 50%, #262626); }
.hb-xf11-input { flex: 1; min-width: 0; height: 28px; border: 0; outline: 0; background: transparent; color: #ededed; font: inherit; font-size: 12.5px; }
.hb-xf11-input::placeholder { color: #5a5a5a; }
.hb-xf11-send { all: unset; box-sizing: border-box; width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; color: #0a0a0a; background: var(--hb-xf11-accent); cursor: pointer; transition: transform .15s cubic-bezier(.3,.7,.4,1), opacity .2s; }
.hb-xf11-send:disabled { opacity: .35; cursor: default; }
.hb-xf11-send:not(:disabled):active { transform: scale(.9); }
.hb-xf11-send:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xf11-send svg { width: 13px; height: 13px; }
.hb-xf11-timer { position: absolute; left: 20px; right: 20px; bottom: 0; height: 2px; border-radius: 2px; background: rgba(255,255,255,.06); overflow: hidden; opacity: 0; transition: opacity .3s; }
.hb-xf11[data-mode="expanded"] .hb-xf11-timer { opacity: 1; }
.hb-xf11-timer span { position: absolute; inset: 0; background: color-mix(in srgb, var(--hb-xf11-accent) 70%, transparent); transform-origin: left; animation: hb-xf11-timer var(--hb-xf11-ms) linear forwards; }
.hb-xf11[data-hold="true"] .hb-xf11-timer span { animation-play-state: paused; }
.hb-xf11-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-xf11-drop { from { opacity: 0; transform: translateY(-16px) scale(.6); } }
@keyframes hb-xf11-wave { 0%, 100% { transform: scaleY(.5); } 50% { transform: scaleY(1); } }
@keyframes hb-xf11-fade { from { opacity: 0; } }
@keyframes hb-xf11-timer { from { transform: scaleX(1); } to { transform: scaleX(0); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xf11 *, .hb-xf11 *::before, .hb-xf11 *::after { animation: none !important; transition: none !important; }
}
`;

export function PopupIslandNotification({
  notifications = defaultNotifications,
  defaultExpanded,
  duration = 6000,
  position = "top",
  onReply,
  onMarkRead,
  onExpandedChange,
  loop = false,
  embedded = false,
  accent = "#3ddc84",
  className = "",
  style,
  ...rest
}: PopupIslandNotificationProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [queue, setQueue] = React.useState(notifications);
  const [mode, setMode] = React.useState<"collapsed" | "expanded" | "reply">((defaultExpanded ?? embedded) ? "expanded" : "collapsed");
  const [draft, setDraft] = React.useState("");
  const [hold, setHold] = React.useState(false);
  const [sent, setSent] = React.useState("");
  const pillRef = React.useRef<HTMLButtonElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const focusPill = React.useRef(false);
  const item = queue[0];

  const change = React.useCallback(
    (next: "collapsed" | "expanded" | "reply") => {
      setMode(next);
      onExpandedChange?.(next !== "collapsed");
    },
    [onExpandedChange],
  );

  React.useEffect(() => {
    if (mode === "reply") {
      const f = requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
      return () => cancelAnimationFrame(f);
    }
    if (mode === "collapsed" && focusPill.current) {
      focusPill.current = false;
      pillRef.current?.focus({ preventScroll: true });
    }
  }, [mode]);

  React.useEffect(() => {
    if (mode !== "expanded" || hold || !item) return;
    const t = window.setTimeout(() => change("collapsed"), duration);
    return () => window.clearTimeout(t);
  }, [mode, hold, item, duration, change]);

  const next = () => {
    if (!item) return;
    onMarkRead?.(item.id);
    const rest = queue.slice(1);
    focusPill.current = cardRef.current?.contains(document.activeElement) ?? false;
    change("collapsed");
    window.setTimeout(() => {
      setQueue(rest);
      setDraft("");
      if (rest.length) window.setTimeout(() => change("expanded"), 380);
      else if (loop)
        window.setTimeout(() => {
          setQueue(notifications);
          window.setTimeout(() => change("expanded"), 420);
        }, 2400);
    }, 300);
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !draft.trim()) return;
    onReply?.(item.id, draft.trim());
    setSent(`Reply sent to ${item.from}`);
    next();
  };

  const sizes = !item
    ? { w: 168, h: 36, r: 18 }
    : mode === "collapsed"
      ? { w: 216, h: 38, r: 19 }
      : { w: 360, h: 140, r: 28 };
  const initials = item ? item.from.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase() : "";
  const vars = {
    "--hb-xf11-accent": accent,
    "--hb-xf11-tint": item?.tint ?? accent,
    "--hb-xf11-w": `${sizes.w}px`,
    "--hb-xf11-h": `${sizes.h}px`,
    "--hb-xf11-r": `${sizes.r}px`,
    "--hb-xf11-ms": `${duration}ms`,
  } as React.CSSProperties;

  return (
    <div
      className={`hb-xf11 ${embedded ? "hb-xf11-embedded" : ""} ${className}`}
      data-mode={item ? mode : "empty"}
      data-pos={position}
      data-hold={hold}
      style={{ ...vars, ...style }}
      role="region"
      aria-label="Notifications"
      onPointerEnter={() => setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && mode !== "collapsed") {
          e.stopPropagation();
          focusPill.current = true;
          change("collapsed");
        }
      }}
      {...rest}
    >
      <style href="hb-popup-island-notification" precedence="default">{css}</style>
      <span className="hb-xf11-sr" aria-live="polite">{item ? `New message from ${item.from}: ${item.message}` : sent || "All caught up"}</span>
      <div className="hb-xf11-island">
        {item ? (
          <>
            <button
              ref={pillRef}
              type="button"
              className="hb-xf11-pill"
              aria-expanded={mode !== "collapsed"}
              aria-controls={`${uid}-card`}
              tabIndex={mode === "collapsed" ? 0 : -1}
              onClick={() => change("expanded")}
            >
              <span className="hb-xf11-mini" aria-hidden="true">{initials}</span>
              <span className="hb-xf11-pilltext">{item.from}</span>
              <span className="hb-xf11-wave" aria-hidden="true"><i /><i /><i /></span>
              <span className="hb-xf11-count" aria-label={`${queue.length} unread`}>{queue.length}</span>
            </button>
            <div ref={cardRef} id={`${uid}-card`} className="hb-xf11-card" inert={mode === "collapsed"}>
              <div className="hb-xf11-row">
                <span className="hb-xf11-ava" aria-hidden="true">{initials}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="hb-xf11-head">
                    <span className="hb-xf11-from">{item.from}</span>
                    <span className="hb-xf11-ctx">{item.context}</span>
                    <span className="hb-xf11-time">{item.time}</span>
                  </div>
                  <p className="hb-xf11-msg">{item.message}</p>
                </div>
              </div>
              {mode === "reply" ? (
                <form className="hb-xf11-reply" onSubmit={send}>
                  <input
                    ref={inputRef}
                    className="hb-xf11-input"
                    value={draft}
                    placeholder={`Reply to ${item.from.split(" ")[0]}`}
                    aria-label={`Reply to ${item.from}`}
                    onChange={(e) => setDraft(e.target.value)}
                  />
                  <button type="submit" className="hb-xf11-send" aria-label="Send reply" disabled={!draft.trim()}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" /></svg>
                  </button>
                </form>
              ) : (
                <div className="hb-xf11-actions">
                  <button type="button" className="hb-xf11-btn" onClick={() => change("reply")}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6.5 4 3 7.5 6.5 11M3 7.5h6.5a3.5 3.5 0 0 1 3.5 3.5v1" /></svg>
                    Reply
                  </button>
                  <button type="button" className="hb-xf11-btn hb-xf11-primary" onClick={next}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.3 3 3 6-6.6" /></svg>
                    Mark read
                  </button>
                </div>
              )}
            </div>
            {mode === "expanded" && (
              <span className="hb-xf11-timer" aria-hidden="true"><span key={item.id} /></span>
            )}
          </>
        ) : (
          <span className="hb-xf11-done">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.3 3 3 6-6.6" /></svg>
            All caught up
          </span>
        )}
      </div>
    </div>
  );
}
