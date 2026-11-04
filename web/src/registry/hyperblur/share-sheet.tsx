"use client";

import * as React from "react";

export type ShareSheetIcon = "mail" | "message" | "send" | "code" | "link" | "share";

export interface ShareSheetChannel {
  id: string;
  label: string;
  icon?: ShareSheetIcon;
  href?: string;
  onSelect?: () => void;
}

export interface ShareSheetApi {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface ShareSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  children?: React.ReactNode | ((api: ShareSheetApi) => React.ReactNode);
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  url?: string;
  title?: string;
  heading?: string;
  channels?: ShareSheetChannel[];
  height?: number | string;
  accent?: string;
  onShare?: (id: string) => void;
}

const css = `
.hb-qb9 {
  --hb-qb9-a: #2f7bff;
  position: relative;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  border-radius: inherit;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-qb9 *, .hb-qb9 *::before, .hb-qb9 *::after { box-sizing: border-box; }
.hb-qb9-page { position: relative; width: 100%; height: 100%; }
.hb-qb9-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.58);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
}
.hb-qb9-scrim[data-open="true"] { opacity: 1; pointer-events: auto; }
.hb-qb9-sheet {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  max-height: calc(100% - 8px);
  overflow: auto;
  padding: 0 14px 14px;
  border-top: 1px solid #2a2a2a;
  border-radius: 18px 18px 0 0;
  background: #121212;
  color: #ededed;
  box-shadow: 0 -18px 40px rgba(0, 0, 0, 0.5);
  outline: none;
  transform: translateY(102%);
  visibility: hidden;
  transition: transform 0.42s cubic-bezier(0.2, 0.9, 0.25, 1), visibility 0s linear 0.42s;
}
.hb-qb9-sheet[data-open="true"] {
  transform: translateY(0);
  visibility: visible;
  transition: transform 0.42s cubic-bezier(0.2, 0.9, 0.25, 1), visibility 0s;
}
.hb-qb9-sheet[data-drag="true"] { transition: none; }
.hb-qb9-head {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 8px;
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}
.hb-qb9-head:active { cursor: grabbing; }
.hb-qb9-bar {
  position: absolute;
  left: 50%;
  top: 6px;
  width: 36px;
  height: 4px;
  margin-left: -18px;
  border-radius: 4px;
  background: #3a3a3a;
  transition: background-color 0.2s ease, width 0.2s ease, margin-left 0.2s ease;
}
.hb-qb9-head:hover .hb-qb9-bar { background: #555555; width: 44px; margin-left: -22px; }
.hb-qb9-title { margin: 0; font-size: 13px; font-weight: 600; line-height: 1; letter-spacing: 0.01em; }
.hb-qb9-x {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #222222;
  color: #a1a1a1;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.hb-qb9-x:hover { background: #2e2e2e; color: #ededed; }
.hb-qb9-x:focus-visible { outline: 2px solid var(--hb-qb9-a); outline-offset: 2px; }
.hb-qb9-ico {
  display: block;
  width: 16px;
  height: 16px;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-qb9-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
}
.hb-qb9-ch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 0;
  margin: 0;
  padding: 3px 0 2px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #a1a1a1;
  font: inherit;
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.2s ease;
}
.hb-qb9-ch:hover, .hb-qb9-ch:focus-visible { color: #ededed; }
.hb-qb9-ch:focus-visible { outline: 2px solid var(--hb-qb9-a); outline-offset: 1px; }
.hb-qb9-chi {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #262626;
  border-radius: 50%;
  background: #1a1a1a;
  color: #ededed;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.18s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-qb9-ch:hover .hb-qb9-chi, .hb-qb9-ch:focus-visible .hb-qb9-chi {
  border-color: color-mix(in srgb, var(--hb-qb9-a) 55%, #262626);
  background: color-mix(in srgb, var(--hb-qb9-a) 14%, #1a1a1a);
  transform: translateY(-2px);
}
.hb-qb9-ch:active .hb-qb9-chi { transform: scale(0.94); }
.hb-qb9-chl { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qb9-field {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 3px 3px 3px 10px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #0a0a0a;
  transition: border-color 0.2s ease;
}
.hb-qb9-field:focus-within { border-color: color-mix(in srgb, var(--hb-qb9-a) 60%, #262626); }
.hb-qb9-lead { display: inline-flex; color: #6f6f6f; }
.hb-qb9-input {
  flex: 1;
  min-width: 0;
  height: 28px;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: #cfcfcf;
  font: inherit;
  font-size: 12px;
  text-overflow: ellipsis;
}
.hb-qb9-copy {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  margin: 0;
  padding: 0 11px;
  border: 0;
  border-radius: 9px;
  background: #ededed;
  color: #0a0a0a;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.12s ease;
}
.hb-qb9-copy:hover { background: #ffffff; }
.hb-qb9-copy:active { transform: scale(0.95); }
.hb-qb9-copy:focus-visible { outline: 2px solid var(--hb-qb9-a); outline-offset: 2px; }
.hb-qb9-copy[data-done="true"] { background: #7ee787; color: #06280d; }
.hb-qb9-tick {
  display: block;
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  animation: hb-qb9-draw 0.35s ease-out forwards;
}
@keyframes hb-qb9-draw { to { stroke-dashoffset: 0; } }
.hb-qb9-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qb9-scrim, .hb-qb9-sheet, .hb-qb9-sheet[data-open="true"], .hb-qb9-chi, .hb-qb9-copy, .hb-qb9-bar { transition: none; }
  .hb-qb9-tick { animation: none; stroke-dashoffset: 0; }
}
`;

const noop = () => () => {};

function Glyph({ name, className = "hb-qb9-ico" }: { name: ShareSheetIcon | "copy" | "tick" | "close"; className?: string }) {
  let body: React.ReactNode;
  switch (name) {
    case "mail":
      body = (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M3.5 7.5l8.5 6 8.5-6" />
        </>
      );
      break;
    case "message":
      body = <path d="M5 4.5h14a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5h-7.5L7 20.5V16.5H5A1.5 1.5 0 013.5 15V6A1.5 1.5 0 015 4.5z" />;
      break;
    case "send":
      body = <path d="M20.5 3.5L10 14M20.5 3.5L14 20.5l-4-6.5-6.5-4z" />;
      break;
    case "code":
      body = <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.6 6l-3.2 12" />;
      break;
    case "link":
      body = (
        <>
          <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
          <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
        </>
      );
      break;
    case "copy":
      body = (
        <>
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" />
        </>
      );
      break;
    case "tick":
      body = <path d="M5 12.5l4.5 4.5L19 7.5" />;
      break;
    case "close":
      body = <path d="M7 7l10 10M17 7L7 17" />;
      break;
    default:
      body = (
        <>
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="17.5" cy="6" r="2.5" />
          <circle cx="17.5" cy="18" r="2.5" />
          <path d="M8.3 10.8l7-3.6M8.3 13.2l7 3.6" />
        </>
      );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {body}
    </svg>
  );
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

const defaultChannels: ShareSheetChannel[] = [
  { id: "message", label: "Messages", icon: "message" },
  { id: "email", label: "Email", icon: "mail" },
  { id: "embed", label: "Embed", icon: "code" },
  { id: "native", label: "More", icon: "share" },
];

export function ShareSheet({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  url = "",
  title = "",
  heading = "Share",
  channels = defaultChannels,
  height = 320,
  accent = "#2f7bff",
  onShare,
  className = "",
  style,
  ...rest
}: ShareSheetProps) {
  const openControlled = open !== undefined;
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const isOpen = openControlled ? open : innerOpen;
  const [drag, setDrag] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [done, setDone] = React.useState<string | null>(null);

  const here = React.useSyncExternalStore(
    noop,
    () => window.location.href,
    () => "",
  );
  const shareUrl = url || here;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const opener = React.useRef<HTMLElement | null>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const gesture = React.useRef({ y: 0, t: 0, dy: 0, id: -1 });

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!openControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [openControlled, onOpenChange],
  );

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  React.useEffect(() => {
    const root = rootRef.current;
    const sheet = sheetRef.current;
    const active = document.activeElement;
    if (isOpen) {
      if (root && active && active !== document.body && root.contains(active)) {
        opener.current = active as HTMLElement;
        sheet?.focus({ preventScroll: true });
      }
    } else if (opener.current) {
      if (active === document.body || sheet?.contains(active)) {
        opener.current.focus({ preventScroll: true });
      }
      opener.current = null;
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [isOpen, setOpen]);

  function down(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    gesture.current = { y: e.clientY, t: e.timeStamp, dy: 0, id: e.pointerId };
    setDragging(true);
  }

  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (gesture.current.id !== e.pointerId) return;
    const dy = Math.max(0, e.clientY - gesture.current.y);
    gesture.current.dy = dy;
    setDrag(dy);
  }

  function up(e: React.PointerEvent<HTMLDivElement>) {
    if (gesture.current.id !== e.pointerId) return;
    const { dy, t } = gesture.current;
    const speed = dy / Math.max(1, e.timeStamp - t);
    gesture.current.id = -1;
    setDragging(false);
    setDrag(0);
    if (dy > 70 || (dy > 18 && speed > 0.6)) setOpen(false);
  }

  function flash(id: string) {
    setDone(id);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(null), 1600);
  }

  async function copyLink() {
    await copyText(shareUrl);
    flash("link");
    onShare?.("copy");
  }

  async function run(channel: ShareSheetChannel) {
    onShare?.(channel.id);
    if (channel.onSelect) {
      channel.onSelect();
      return;
    }
    if (channel.id === "embed") {
      await copyText(`<iframe src="${shareUrl}" width="560" height="315" frameborder="0"></iframe>`);
      flash(channel.id);
      return;
    }
    if (channel.id === "native") {
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ title: title || undefined, url: shareUrl });
        } catch {
          return;
        }
      } else {
        await copyText(shareUrl);
        flash(channel.id);
      }
    }
  }

  function hrefFor(channel: ShareSheetChannel) {
    if (channel.href) return channel.href;
    if (channel.id === "email") {
      return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`;
    }
    if (channel.id === "message") {
      return `sms:?&body=${encodeURIComponent([title, shareUrl].filter(Boolean).join(" "))}`;
    }
    return undefined;
  }

  const vars = { "--hb-qb9-a": accent, height, ...style } as React.CSSProperties;
  const api: ShareSheetApi = { open: isOpen, setOpen };
  const sheetStyle: React.CSSProperties | undefined =
    isOpen && drag > 0 ? { transform: `translateY(${drag.toFixed(1)}px)` } : undefined;

  return (
    <div ref={rootRef} className={`hb-qb9 ${className}`} style={vars} {...rest}>
      <style href="hb-share-sheet" precedence="default">{css}</style>
      <div className="hb-qb9-page">{typeof children === "function" ? children(api) : children}</div>
      <div className="hb-qb9-scrim" data-open={isOpen ? "true" : "false"} aria-hidden="true" onClick={() => setOpen(false)} />
      <div
        ref={sheetRef}
        role="dialog"
        aria-label={heading}
        tabIndex={-1}
        className="hb-qb9-sheet"
        data-open={isOpen ? "true" : "false"}
        data-drag={dragging ? "true" : "false"}
        style={sheetStyle}
        inert={!isOpen}
      >
        <div className="hb-qb9-head" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
          <span className="hb-qb9-bar" aria-hidden="true" />
          <h2 className="hb-qb9-title">{heading}</h2>
          <button type="button" className="hb-qb9-x" aria-label="Close" onClick={() => setOpen(false)}>
            <Glyph name="close" className="hb-qb9-ico" />
          </button>
        </div>
        <div className="hb-qb9-grid" role="group" aria-label="Share channels">
          {channels.map((channel) => {
            const href = hrefFor(channel);
            const inner = (
              <>
                <span className="hb-qb9-chi">
                  <Glyph name={done === channel.id ? "tick" : (channel.icon ?? "send")} />
                </span>
                <span className="hb-qb9-chl">{done === channel.id ? "Copied" : channel.label}</span>
              </>
            );
            return href && !channel.onSelect ? (
              <a
                key={channel.id}
                className="hb-qb9-ch"
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => onShare?.(channel.id)}
              >
                {inner}
              </a>
            ) : (
              <button key={channel.id} type="button" className="hb-qb9-ch" onClick={() => run(channel)}>
                {inner}
              </button>
            );
          })}
        </div>
        <div className="hb-qb9-field">
          <span className="hb-qb9-lead">
            <Glyph name="link" />
          </span>
          <input
            className="hb-qb9-input"
            readOnly
            value={shareUrl}
            aria-label="Link"
            onFocus={(e) => e.currentTarget.select()}
          />
          <button type="button" className="hb-qb9-copy" data-done={done === "link" ? "true" : "false"} onClick={copyLink}>
            {done === "link" ? <Glyph name="tick" className="hb-qb9-tick" /> : <Glyph name="copy" />}
            {done === "link" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <span className="hb-qb9-sr" role="status" aria-live="polite">
        {done ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
