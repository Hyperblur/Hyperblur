"use client";

import * as React from "react";

export interface ButtonArchiveDiscardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  archiveLabel?: string;
  discardLabel?: string;
  archivedLabel?: string;
  discardedLabel?: string;
  accent?: string;
  archiveAccent?: string;
  resetAfter?: number;
  disabled?: boolean;
  onArchive?: () => void;
  onDiscard?: () => void;
}

const css = `
.hb-xd10 {
  display: flex;
  gap: 4px;
  box-sizing: border-box;
  width: 100%;
  max-width: 300px;
  padding: 4px;
  font-family: inherit;
  font-size: 0.8125rem;
  border-radius: 14px;
  background: linear-gradient(180deg, #0b0b0b, #111);
  border: 1px solid #222;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04);
}
.hb-xd10 *, .hb-xd10 *::before, .hb-xd10 *::after { box-sizing: border-box; }
.hb-xd10[data-disabled="true"] { opacity: 0.45; }
.hb-xd10-btn {
  --hb-xd10-k: #a1a1a1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  min-width: 40px;
  height: 2.5rem;
  margin: 0;
  padding: 0 10px;
  overflow: hidden;
  font: inherit;
  font-weight: 600;
  color: #d4d4d4;
  white-space: nowrap;
  background: linear-gradient(180deg, #1c1c1c, #151515);
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.4);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
  transition: flex-grow 0.55s cubic-bezier(0.3, 1.3, 0.4, 1), min-width 0.45s cubic-bezier(0.6, 0, 0.2, 1), padding 0.45s ease, color 0.25s ease, border-color 0.25s ease, opacity 0.3s ease, transform 0.15s ease;
}
.hb-xd10-btn:active:not(:disabled) { transform: scale(0.97); }
.hb-xd10-btn:focus-visible { outline: 2px solid var(--hb-xd10-k); outline-offset: 2px; }
.hb-xd10-btn:disabled { cursor: not-allowed; }
.hb-xd10-a { --hb-xd10-k: var(--hb-xd10-ac); }
.hb-xd10-d { --hb-xd10-k: var(--hb-xd10-c); }
.hb-xd10-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--hb-xd10-k) 30%, transparent), color-mix(in srgb, var(--hb-xd10-k) 12%, transparent) 70%);
  opacity: 0;
  transform: scale(0.4);
  border-radius: inherit;
  transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.2, 1, 0.3, 1);
}
.hb-xd10-btn[data-hot="true"] { flex-grow: 2.4; color: #fff; border-color: color-mix(in srgb, var(--hb-xd10-k) 45%, #2a2a2a); }
.hb-xd10-btn[data-hot="true"]::before { opacity: 1; transform: scale(1); }
.hb-xd10-lbl {
  display: inline-block;
  max-width: 9em;
  margin-left: 0.5em;
  overflow: hidden;
  text-overflow: clip;
  transition: max-width 0.45s cubic-bezier(0.6, 0, 0.2, 1), margin 0.45s ease, opacity 0.25s ease;
}
.hb-xd10-btn[data-cold="true"] .hb-xd10-lbl { max-width: 0; margin-left: 0; opacity: 0; }
.hb-xd10-btn[data-gone="true"] { flex-grow: 0; min-width: 0; padding: 0; border-width: 0; opacity: 0; pointer-events: none; }
.hb-xd10[data-result] { gap: 0; }
.hb-xd10-btn[data-picked="true"] { flex-grow: 1; color: #fff; border-color: color-mix(in srgb, var(--hb-xd10-k) 55%, #2a2a2a); cursor: default; }
.hb-xd10-btn[data-picked="true"]::before { opacity: 1; transform: scale(1.6); }
.hb-xd10-ic { flex: none; width: 17px; height: 17px; overflow: visible; color: var(--hb-xd10-k); }
.hb-xd10-boxlid { transform-box: fill-box; transform-origin: 50% 100%; transition: transform 0.45s cubic-bezier(0.3, 1.8, 0.5, 1); }
.hb-xd10-a[data-hot="true"] .hb-xd10-boxlid { transform: translateY(-3px) rotate(-6deg); }
.hb-xd10-a[data-picked="true"] .hb-xd10-boxlid { animation: hb-xd10-shut 0.6s cubic-bezier(0.3, 1.4, 0.5, 1); }
.hb-xd10-docin { opacity: 0; transform-box: fill-box; }
.hb-xd10-a[data-picked="true"] .hb-xd10-docin { animation: hb-xd10-doc 0.6s cubic-bezier(0.5, 0, 0.7, 0.4); }
.hb-xd10-x { transform-box: fill-box; transform-origin: 50% 50%; transition: transform 0.5s cubic-bezier(0.3, 1.6, 0.5, 1); }
.hb-xd10-d[data-hot="true"] .hb-xd10-x { transform: rotate(90deg) scale(1.08); }
.hb-xd10-d[data-picked="true"] .hb-xd10-x { animation: hb-xd10-crush 0.5s cubic-bezier(0.5, 0, 0.3, 1) forwards; }
.hb-xd10-chk { stroke-dasharray: 20; stroke-dashoffset: 20; }
.hb-xd10-btn[data-picked="true"] .hb-xd10-chk { animation: hb-xd10-draw 0.35s ease 0.4s forwards; }
.hb-xd10-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xd10-shut {
  0% { transform: translateY(-6px) rotate(-10deg); }
  60% { transform: translateY(0.5px) rotate(2deg); }
  100% { transform: none; }
}
@keyframes hb-xd10-doc {
  0% { opacity: 1; transform: translateY(-9px); }
  70% { opacity: 1; transform: translateY(3px); }
  100% { opacity: 0; transform: translateY(4px); }
}
@keyframes hb-xd10-crush { to { transform: rotate(180deg) scale(0); opacity: 0; } }
@keyframes hb-xd10-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xd10-btn, .hb-xd10-btn::before, .hb-xd10-lbl, .hb-xd10-boxlid, .hb-xd10-x { transition: none; }
  .hb-xd10-btn[data-picked="true"] .hb-xd10-boxlid, .hb-xd10-btn[data-picked="true"] .hb-xd10-docin { animation: none; }
  .hb-xd10-d[data-picked="true"] .hb-xd10-x { animation: none; opacity: 0; }
  .hb-xd10-btn[data-picked="true"] .hb-xd10-chk { animation: none; stroke-dashoffset: 0; }
}
`;

type Choice = "archive" | "discard";

export function ButtonArchiveDiscard({
  archiveLabel = "Archive",
  discardLabel = "Discard",
  archivedLabel = "Archived to Done",
  discardedLabel = "Draft discarded",
  accent = "#ef4444",
  archiveAccent = "#a1a1a1",
  resetAfter = 2400,
  disabled = false,
  onArchive,
  onDiscard,
  className = "",
  style,
  ...rest
}: ButtonArchiveDiscardProps) {
  const [hot, setHot] = React.useState<Choice | null>(null);
  const [result, setResult] = React.useState<Choice | null>(null);
  const refs = React.useRef<Record<Choice, HTMLButtonElement | null>>({ archive: null, discard: null });
  const latest = React.useRef({ onArchive, onDiscard });

  React.useEffect(() => {
    latest.current = { onArchive, onDiscard };
  }, [onArchive, onDiscard]);

  React.useEffect(() => {
    if (!result || resetAfter <= 0) return;
    const t = window.setTimeout(() => {
      setResult(null);
      setHot(null);
    }, resetAfter);
    return () => window.clearTimeout(t);
  }, [result, resetAfter]);

  const pick = (c: Choice) => {
    if (disabled || result) return;
    setResult(c);
    if (c === "archive") latest.current.onArchive?.();
    else latest.current.onDiscard?.();
  };

  const attrs = (c: Choice) => ({
    "data-hot": !result && hot === c,
    "data-cold": !result && hot !== null && hot !== c,
    "data-picked": result === c,
    "data-gone": result !== null && result !== c,
  });

  const keys = (e: React.KeyboardEvent, c: Choice) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      refs.current[c === "archive" ? "discard" : "archive"]?.focus();
    }
  };

  return (
    <div
      role="group"
      aria-label="Archive or discard"
      className={`hb-xd10 ${className}`.trim()}
      data-result={result ?? undefined}
      data-disabled={disabled}
      style={{ "--hb-xd10-c": accent, "--hb-xd10-ac": archiveAccent, ...style } as React.CSSProperties}
      onPointerLeave={() => setHot(null)}
      {...rest}
    >
      <style href="hb-button-archive-discard" precedence="default">{css}</style>
      <button
        ref={(el) => {
          refs.current.archive = el;
        }}
        type="button"
        className="hb-xd10-btn hb-xd10-a"
        disabled={disabled}
        tabIndex={result === "discard" ? -1 : 0}
        aria-hidden={result === "discard" || undefined}
        onPointerEnter={() => setHot("archive")}
        onFocus={() => setHot("archive")}
        onBlur={() => setHot(null)}
        onKeyDown={(e) => keys(e, "archive")}
        onClick={() => pick("archive")}
        {...attrs("archive")}
      >
        <svg className="hb-xd10-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect className="hb-xd10-docin" x="9" y="4" width="6" height="6" rx="1" />
          <path className="hb-xd10-boxlid" d="M3 5.5h18v3.5H3z" />
          <path d="M5 9v9.5c0 .8.7 1.5 1.5 1.5h11c.8 0 1.5-.7 1.5-1.5V9" />
          <path d="M10 13h4" />
        </svg>
        <span className="hb-xd10-lbl">{result === "archive" ? archivedLabel : archiveLabel}</span>
      </button>
      <button
        ref={(el) => {
          refs.current.discard = el;
        }}
        type="button"
        className="hb-xd10-btn hb-xd10-d"
        disabled={disabled}
        tabIndex={result === "archive" ? -1 : 0}
        aria-hidden={result === "archive" || undefined}
        onPointerEnter={() => setHot("discard")}
        onFocus={() => setHot("discard")}
        onBlur={() => setHot(null)}
        onKeyDown={(e) => keys(e, "discard")}
        onClick={() => pick("discard")}
        {...attrs("discard")}
      >
        <svg className="hb-xd10-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <g className="hb-xd10-x">
            <path d="M7 7l10 10M17 7L7 17" />
          </g>
          {result === "discard" && <path className="hb-xd10-chk" d="M5 12.5l4.5 4.5L19 7.5" pathLength={20} />}
        </svg>
        <span className="hb-xd10-lbl">{result === "discard" ? discardedLabel : discardLabel}</span>
      </button>
      <span className="hb-xd10-sr" role="status" aria-live="polite">
        {result === "archive" ? archivedLabel : result === "discard" ? discardedLabel : ""}
      </span>
    </div>
  );
}
