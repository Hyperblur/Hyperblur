"use client";

import * as React from "react";

export type SharePopoverIcon = "mail" | "message" | "send" | "code" | "link" | "share";

export interface SharePopoverChannel {
  id: string;
  label: string;
  icon?: SharePopoverIcon;
  href?: string;
  onSelect?: () => void;
}

export interface SharePopoverProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  url?: string;
  title?: string;
  channels?: SharePopoverChannel[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: "bottom" | "top";
  align?: "start" | "end";
  triggerLabel?: string;
  accent?: string;
  onShare?: (id: string) => void;
}

const css = `
.hb-qb8 {
  --hb-qb8-a: #2f7bff;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-qb8 *, .hb-qb8 *::before, .hb-qb8 *::after { box-sizing: border-box; }
.hb-qb8-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  margin: 0;
  padding: 0 14px 0 11px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #171717;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.12s ease;
}
.hb-qb8-trigger:hover { border-color: #3a3a3a; background: #1c1c1c; }
.hb-qb8-trigger:active { transform: scale(0.96); }
.hb-qb8-trigger[aria-expanded="true"] {
  border-color: color-mix(in srgb, var(--hb-qb8-a) 55%, #262626);
  background: color-mix(in srgb, var(--hb-qb8-a) 10%, #171717);
}
.hb-qb8-trigger:focus-visible { outline: 2px solid var(--hb-qb8-a); outline-offset: 2px; }
.hb-qb8-ico {
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
.hb-qb8-panel {
  position: absolute;
  z-index: 20;
  width: 304px;
  max-width: calc(100vw - 24px);
  padding: 12px;
  border: 1px solid #262626;
  border-radius: 16px;
  background: #121212;
  color: #ededed;
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.02) inset;
  outline: none;
  animation: hb-qb8-in 0.22s cubic-bezier(0.2, 0.9, 0.3, 1);
}
.hb-qb8-panel[data-p="bottom"] { top: calc(100% + 8px); }
.hb-qb8-panel[data-p="top"] { bottom: calc(100% + 8px); }
.hb-qb8-panel[data-al="start"] { left: 0; }
.hb-qb8-panel[data-al="end"] { right: 0; }
.hb-qb8-panel[data-p="bottom"][data-al="start"] { transform-origin: 18px 0; }
.hb-qb8-panel[data-p="bottom"][data-al="end"] { transform-origin: calc(100% - 18px) 0; }
.hb-qb8-panel[data-p="top"][data-al="start"] { transform-origin: 18px 100%; }
.hb-qb8-panel[data-p="top"][data-al="end"] { transform-origin: calc(100% - 18px) 100%; }
@keyframes hb-qb8-in {
  from { opacity: 0; transform: translateY(-6px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.hb-qb8-panel[data-p="top"] { animation-name: hb-qb8-in-up; }
@keyframes hb-qb8-in-up {
  from { opacity: 0; transform: translateY(6px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.hb-qb8-field {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 3px 3px 10px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #0a0a0a;
  transition: border-color 0.2s ease;
}
.hb-qb8-field:focus-within { border-color: color-mix(in srgb, var(--hb-qb8-a) 60%, #262626); }
.hb-qb8-lead { display: inline-flex; color: #6f6f6f; }
.hb-qb8-input {
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
.hb-qb8-copy {
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
.hb-qb8-copy:hover { background: #ffffff; }
.hb-qb8-copy:active { transform: scale(0.95); }
.hb-qb8-copy:focus-visible { outline: 2px solid var(--hb-qb8-a); outline-offset: 2px; }
.hb-qb8-copy[data-done="true"] { background: #7ee787; color: #06280d; }
.hb-qb8-tick {
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
  animation: hb-qb8-draw 0.35s ease-out forwards;
}
@keyframes hb-qb8-draw { to { stroke-dashoffset: 0; } }
.hb-qb8-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  margin-top: 10px;
}
.hb-qb8-ch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 0;
  margin: 0;
  padding: 4px 0 2px;
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
.hb-qb8-ch:hover, .hb-qb8-ch:focus-visible { color: #ededed; }
.hb-qb8-ch:focus-visible { outline: 2px solid var(--hb-qb8-a); outline-offset: 1px; }
.hb-qb8-chi {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #1a1a1a;
  color: #ededed;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.18s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-qb8-ch:hover .hb-qb8-chi, .hb-qb8-ch:focus-visible .hb-qb8-chi {
  border-color: color-mix(in srgb, var(--hb-qb8-a) 55%, #262626);
  background: color-mix(in srgb, var(--hb-qb8-a) 14%, #1a1a1a);
  transform: translateY(-2px);
}
.hb-qb8-ch:active .hb-qb8-chi { transform: scale(0.94); }
.hb-qb8-chl {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-qb8-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qb8-trigger, .hb-qb8-copy, .hb-qb8-chi, .hb-qb8-field, .hb-qb8-ch { transition: none; }
  .hb-qb8-panel { animation: none; }
  .hb-qb8-tick { animation: none; stroke-dashoffset: 0; }
}
`;

const noop = () => () => {};

function Glyph({ name, className = "hb-qb8-ico" }: { name: SharePopoverIcon | "copy" | "tick"; className?: string }) {
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

const defaultChannels: SharePopoverChannel[] = [
  { id: "email", label: "Email", icon: "mail" },
  { id: "message", label: "Message", icon: "message" },
  { id: "embed", label: "Embed", icon: "code" },
  { id: "native", label: "More", icon: "share" },
];

export function SharePopover({
  url = "",
  title = "",
  channels = defaultChannels,
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom",
  align = "start",
  triggerLabel = "Share",
  accent = "#2f7bff",
  onShare,
  className = "",
  style,
  ...rest
}: SharePopoverProps) {
  const openControlled = open !== undefined;
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const isOpen = openControlled ? open : innerOpen;
  const [done, setDone] = React.useState<string | null>(null);

  const here = React.useSyncExternalStore(
    noop,
    () => window.location.href,
    () => "",
  );
  const shareUrl = url || here;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const viaKey = React.useRef(false);

  function setOpen(next: boolean) {
    if (!openControlled) setInnerOpen(next);
    onOpenChange?.(next);
  }

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  React.useEffect(() => {
    if (isOpen && viaKey.current) {
      panelRef.current?.focus({ preventScroll: true });
    }
    viaKey.current = false;
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    function down(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        if (!openControlled) setInnerOpen(false);
        onOpenChange?.(false);
      }
    }
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (!openControlled) setInnerOpen(false);
        onOpenChange?.(false);
        if (rootRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [isOpen, openControlled, onOpenChange]);

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

  async function run(channel: SharePopoverChannel) {
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

  function hrefFor(channel: SharePopoverChannel) {
    if (channel.href) return channel.href;
    if (channel.id === "email") {
      return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`;
    }
    if (channel.id === "message") {
      return `sms:?&body=${encodeURIComponent([title, shareUrl].filter(Boolean).join(" "))}`;
    }
    return undefined;
  }

  const vars = { "--hb-qb8-a": accent, ...style } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-qb8 ${className}`} style={vars} {...rest}>
      <style href="hb-share-popover" precedence="default">{css}</style>
      <button
        ref={triggerRef}
        type="button"
        className="hb-qb8-trigger"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={(e) => {
          viaKey.current = e.detail === 0;
          setOpen(!isOpen);
        }}
      >
        <Glyph name="share" />
        {triggerLabel}
      </button>
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Share"
          tabIndex={-1}
          className="hb-qb8-panel"
          data-p={placement}
          data-al={align}
        >
          <div className="hb-qb8-field">
            <span className="hb-qb8-lead">
              <Glyph name="link" />
            </span>
            <input
              className="hb-qb8-input"
              readOnly
              value={shareUrl}
              aria-label="Link"
              onFocus={(e) => e.currentTarget.select()}
            />
            <button type="button" className="hb-qb8-copy" data-done={done === "link" ? "true" : "false"} onClick={copyLink}>
              {done === "link" ? <Glyph name="tick" className="hb-qb8-tick" /> : <Glyph name="copy" className="hb-qb8-ico" />}
              {done === "link" ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="hb-qb8-grid" role="group" aria-label="Share channels">
            {channels.map((channel) => {
              const href = hrefFor(channel);
              const inner = (
                <>
                  <span className="hb-qb8-chi">
                    <Glyph name={done === channel.id ? "tick" : (channel.icon ?? "send")} />
                  </span>
                  <span className="hb-qb8-chl">{done === channel.id ? "Copied" : channel.label}</span>
                </>
              );
              return href && !channel.onSelect ? (
                <a
                  key={channel.id}
                  className="hb-qb8-ch"
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => onShare?.(channel.id)}
                >
                  {inner}
                </a>
              ) : (
                <button key={channel.id} type="button" className="hb-qb8-ch" onClick={() => run(channel)}>
                  {inner}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <span className="hb-qb8-sr" role="status" aria-live="polite">
        {done ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
