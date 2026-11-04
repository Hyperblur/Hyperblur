"use client";

import * as React from "react";

export type ShareRailIcon = "mail" | "message" | "send" | "code" | "link" | "share" | "copy";

export interface ShareRailItem {
  id: string;
  label: string;
  icon?: ShareRailIcon;
  href?: string;
  onSelect?: () => void;
}

export interface ShareFloatingRailProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  items?: ShareRailItem[];
  url?: string;
  title?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: "up" | "down";
  tooltipSide?: "left" | "right";
  size?: number;
  accent?: string;
  label?: string;
  onShare?: (id: string) => void;
}

const css = `
.hb-qba {
  --hb-qba-a: #2f7bff;
  position: relative;
  display: inline-block;
  width: var(--hb-qba-s);
  height: var(--hb-qba-s);
  box-sizing: border-box;
  font-family: inherit;
}
.hb-qba *, .hb-qba *::before, .hb-qba *::after { box-sizing: border-box; }
.hb-qba-trigger {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 1px solid #2e2e2e;
  border-radius: 50%;
  background: #ededed;
  color: #0a0a0a;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.12s ease;
}
.hb-qba-trigger:hover { background: #ffffff; }
.hb-qba-trigger:active { transform: scale(0.93); }
.hb-qba-trigger:focus-visible { outline: 2px solid var(--hb-qba-a); outline-offset: 3px; }
.hb-qba-trigger[aria-expanded="true"] { background: #171717; color: #ededed; border-color: #3a3a3a; }
.hb-qba-glyph {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--hb-qba-s) * 0.46);
  height: calc(var(--hb-qba-s) * 0.46);
  margin: calc(var(--hb-qba-s) * -0.23) 0 0 calc(var(--hb-qba-s) * -0.23);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: opacity 0.25s ease, transform 0.4s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.hb-qba-trigger[aria-expanded="true"] .hb-qba-share { opacity: 0; transform: rotate(90deg) scale(0.4); }
.hb-qba-trigger[aria-expanded="false"] .hb-qba-x { opacity: 0; transform: rotate(-90deg) scale(0.4); }
.hb-qba-rail { position: absolute; inset: 0; z-index: 1; }
.hb-qba-slot {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--hb-qba-s);
  height: var(--hb-qba-s);
  opacity: 0;
  pointer-events: none;
  transform: translate(0, 0) scale(0.3);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.8, 0.6) calc(var(--hb-qba-r) * 40ms), opacity 0.2s ease calc(var(--hb-qba-r) * 40ms);
}
.hb-qba[data-d="up"] .hb-qba-slot { bottom: 0; }
.hb-qba[data-d="down"] .hb-qba-slot { top: 0; }
.hb-qba[data-open="true"] .hb-qba-slot {
  opacity: 1;
  pointer-events: auto;
  transform: translate(var(--hb-qba-x), calc(var(--hb-qba-i) * var(--hb-qba-p) * var(--hb-qba-dir))) scale(1);
  transition: transform 0.55s cubic-bezier(0.3, 1.45, 0.5, 1) calc(var(--hb-qba-i) * 55ms), opacity 0.25s ease calc(var(--hb-qba-i) * 55ms);
}
.hb-qba[data-d="up"] { --hb-qba-dir: -1; }
.hb-qba[data-d="down"] { --hb-qba-dir: 1; }
.hb-qba-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--hb-qba-s) * 0.86);
  height: calc(var(--hb-qba-s) * 0.86);
  margin: 0;
  padding: 0;
  border: 1px solid #2a2a2a;
  border-radius: 50%;
  background: #171717;
  color: #cfcfcf;
  text-decoration: none;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.18s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.hb-qba-item:hover, .hb-qba-item:focus-visible {
  border-color: color-mix(in srgb, var(--hb-qba-a) 60%, #2a2a2a);
  background: color-mix(in srgb, var(--hb-qba-a) 16%, #171717);
  color: #ffffff;
  transform: scale(1.12);
}
.hb-qba-item:active { transform: scale(0.94); }
.hb-qba-item:focus-visible { outline: 2px solid var(--hb-qba-a); outline-offset: 2px; }
.hb-qba-item[data-done="true"] { border-color: #7ee787; color: #7ee787; }
.hb-qba-ico {
  display: block;
  width: calc(var(--hb-qba-s) * 0.4);
  height: calc(var(--hb-qba-s) * 0.4);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-qba-tip {
  position: absolute;
  top: 50%;
  padding: 5px 9px;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  background: #171717;
  color: #ededed;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.2s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.hb-qba[data-t="left"] .hb-qba-tip { right: calc(100% + 8px); transform: translate(6px, -50%); }
.hb-qba[data-t="right"] .hb-qba-tip { left: calc(100% + 8px); transform: translate(-6px, -50%); }
.hb-qba-slot:hover .hb-qba-tip, .hb-qba-slot:focus-within .hb-qba-tip, .hb-qba-tip[data-show="true"] { opacity: 1; }
.hb-qba[data-t="left"] .hb-qba-slot:hover .hb-qba-tip,
.hb-qba[data-t="left"] .hb-qba-slot:focus-within .hb-qba-tip,
.hb-qba[data-t="left"] .hb-qba-tip[data-show="true"] { transform: translate(0, -50%); }
.hb-qba[data-t="right"] .hb-qba-slot:hover .hb-qba-tip,
.hb-qba[data-t="right"] .hb-qba-slot:focus-within .hb-qba-tip,
.hb-qba[data-t="right"] .hb-qba-tip[data-show="true"] { transform: translate(0, -50%); }
.hb-qba-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qba-trigger, .hb-qba-glyph, .hb-qba-item, .hb-qba-tip { transition: none; }
  .hb-qba-slot, .hb-qba[data-open="true"] .hb-qba-slot { transition: none; }
}
`;

const noop = () => () => {};

function Glyph({ name, className = "hb-qba-ico" }: { name: ShareRailIcon | "tick"; className?: string }) {
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

const defaultItems: ShareRailItem[] = [
  { id: "copy", label: "Copy link", icon: "copy" },
  { id: "email", label: "Email", icon: "mail" },
  { id: "message", label: "Message", icon: "message" },
  { id: "native", label: "More", icon: "send" },
];

export function ShareFloatingRail({
  items = defaultItems,
  url = "",
  title = "",
  open,
  defaultOpen = false,
  onOpenChange,
  direction = "up",
  tooltipSide = "left",
  size = 44,
  accent = "#2f7bff",
  label = "Share",
  onShare,
  className = "",
  style,
  ...rest
}: ShareFloatingRailProps) {
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
  const railRef = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const viaKey = React.useRef(false);

  function setOpen(next: boolean) {
    if (!openControlled) setInnerOpen(next);
    onOpenChange?.(next);
  }

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  React.useEffect(() => {
    if (isOpen && viaKey.current) {
      railRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
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

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!isOpen) return;
    const outward = direction === "up" ? "ArrowUp" : "ArrowDown";
    const inward = direction === "up" ? "ArrowDown" : "ArrowUp";
    if (e.key !== outward && e.key !== inward) return;
    const list = [
      triggerRef.current,
      ...Array.from(railRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
    ].filter((n): n is HTMLElement => n !== null);
    const at = list.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    e.preventDefault();
    const next = e.key === outward ? Math.min(list.length - 1, at + 1) : Math.max(0, at - 1);
    list[next]?.focus();
  }

  function flash(id: string) {
    setDone(id);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(null), 1600);
  }

  async function run(item: ShareRailItem) {
    onShare?.(item.id);
    if (item.onSelect) {
      item.onSelect();
      return;
    }
    if (item.id === "copy") {
      await copyText(shareUrl);
      flash(item.id);
      return;
    }
    if (item.id === "native") {
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ title: title || undefined, url: shareUrl });
        } catch {
          return;
        }
        setOpen(false);
      } else {
        await copyText(shareUrl);
        flash(item.id);
      }
    }
  }

  function hrefFor(item: ShareRailItem) {
    if (item.href) return item.href;
    if (item.id === "email") {
      return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`;
    }
    if (item.id === "message") {
      return `sms:?&body=${encodeURIComponent([title, shareUrl].filter(Boolean).join(" "))}`;
    }
    return undefined;
  }

  const pitch = size + 8;
  const sign = tooltipSide === "left" ? 1 : -1;
  const vars = {
    "--hb-qba-a": accent,
    "--hb-qba-s": `${size}px`,
    "--hb-qba-p": `${pitch}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`hb-qba ${className}`}
      style={vars}
      data-open={isOpen ? "true" : "false"}
      data-d={direction}
      data-t={tooltipSide}
      onKeyDown={onKeyDown}
      {...rest}
    >
      <style href="hb-share-floating-rail" precedence="default">{css}</style>
      <button
        ref={triggerRef}
        type="button"
        className="hb-qba-trigger"
        aria-expanded={isOpen}
        aria-label={isOpen ? `Close ${label.toLowerCase()} options` : label}
        onClick={(e) => {
          viaKey.current = e.detail === 0;
          setOpen(!isOpen);
        }}
      >
        <svg className="hb-qba-glyph hb-qba-share" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="17.5" cy="6" r="2.5" />
          <circle cx="17.5" cy="18" r="2.5" />
          <path d="M8.3 10.8l7-3.6M8.3 13.2l7 3.6" />
        </svg>
        <svg className="hb-qba-glyph hb-qba-x" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
        </svg>
      </button>
      <div ref={railRef} className="hb-qba-rail" role="group" aria-label={`${label} options`} inert={!isOpen}>
        {items.map((item, index) => {
          const href = hrefFor(item);
          const copied = done === item.id;
          const slot = {
            "--hb-qba-i": index + 1,
            "--hb-qba-r": items.length - index,
            "--hb-qba-x": `${(Math.sin(((index + 1) / (items.length + 1)) * Math.PI) * 7 * sign).toFixed(2)}px`,
          } as React.CSSProperties;
          const inner = (
            <>
              <Glyph name={copied ? "tick" : (item.icon ?? "send")} />
              <span className="hb-qba-sr">{item.label}</span>
            </>
          );
          return (
            <span key={item.id} className="hb-qba-slot" style={slot}>
              {href && !item.onSelect ? (
                <a
                  className="hb-qba-item"
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => {
                    onShare?.(item.id);
                    setOpen(false);
                  }}
                >
                  {inner}
                </a>
              ) : (
                <button type="button" className="hb-qba-item" data-done={copied ? "true" : "false"} onClick={() => run(item)}>
                  {inner}
                </button>
              )}
              <span className="hb-qba-tip" data-show={copied ? "true" : "false"} aria-hidden="true">
                {copied ? "Copied" : item.label}
              </span>
            </span>
          );
        })}
      </div>
      <span className="hb-qba-sr" role="status" aria-live="polite">
        {done ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
