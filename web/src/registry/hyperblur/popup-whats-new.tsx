"use client";

import * as React from "react";

export interface PopupWhatsNewItem {
  title: string;
  body: string;
  tag?: string;
  art?: "previews" | "command" | "sync" | React.ReactNode;
  href?: string;
}

export interface PopupWhatsNewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  version?: string;
  date?: string;
  items?: PopupWhatsNewItem[];
  interval?: number;
  autoPlay?: boolean;
  onDone?: (dontShowAgain: boolean) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
  triggerLabel?: string;
  embedded?: boolean;
  accent?: string;
}

const defaultItems: PopupWhatsNewItem[] = [
  { tag: "New", title: "Preview every branch", body: "Each pull request now gets its own live URL with comments pinned to the page.", art: "previews", href: "#changelog" },
  { tag: "Improved", title: "A command bar for everything", body: "Press ⌘K to jump to any project, run actions and switch teams without the mouse.", art: "command", href: "#changelog" },
  { tag: "Faster", title: "Sync in under 200 ms", body: "Edits now reach every device almost instantly, even on hotel Wi-Fi.", art: "sync", href: "#changelog" },
];

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useModal(active: boolean, panelRef: React.RefObject<HTMLElement | null>, onClose: () => void) {
  const closeRef = React.useRef(onClose);
  React.useEffect(() => {
    closeRef.current = onClose;
  });
  React.useEffect(() => {
    if (!active) return;
    const panel = panelRef.current;
    if (!panel) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    (panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel).focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(focusable)).filter((n) => n.getClientRects().length > 0);
      if (!nodes.length) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const cur = document.activeElement;
      if (e.shiftKey && (cur === first || cur === panel || !panel.contains(cur))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (cur === last || !panel.contains(cur))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [active, panelRef]);
}

function usePresence(open: boolean, ms: number) {
  const [mounted, setMounted] = React.useState(open);
  if (open && !mounted) setMounted(true);
  React.useEffect(() => {
    if (open || !mounted) return;
    const t = window.setTimeout(() => setMounted(false), ms);
    return () => window.clearTimeout(t);
  }, [open, mounted, ms]);
  return mounted;
}

const css = `
.hb-xf9 { --hb-xf9-accent: #34d6b4; box-sizing: border-box; font-family: inherit; color: #ededed; }
.hb-xf9 *, .hb-xf9 *::before, .hb-xf9 *::after { box-sizing: border-box; }
.hb-xf9-embedded { position: relative; width: 100%; height: 100%; display: grid; place-items: center; }
.hb-xf9-trigger { all: unset; box-sizing: border-box; position: relative; display: inline-flex; align-items: center; gap: 8px; height: 34px; padding: 0 14px 0 12px; border-radius: 999px; font-size: 13px; font-weight: 500; color: #ededed; background: #161616; border: 1px solid #2a2a2a; cursor: pointer; transition: border-color .2s, transform .15s cubic-bezier(.3,.7,.4,1); }
.hb-xf9-trigger:hover { border-color: #3a3a3a; }
.hb-xf9-trigger:active { transform: scale(.97); }
.hb-xf9-trigger:focus-visible { outline: 2px solid var(--hb-xf9-accent); outline-offset: 2px; }
.hb-xf9-trigger i { font-style: normal; width: 7px; height: 7px; border-radius: 50%; background: var(--hb-xf9-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xf9-accent) 25%, transparent); }
.hb-xf9-overlay { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 16px; min-height: 100dvh; }
.hb-xf9-embedded .hb-xf9-overlay { position: relative; inset: auto; min-height: 0; padding: 0; width: 100%; }
.hb-xf9-scrim { position: absolute; inset: 0; background: rgba(0,0,0,.74); backdrop-filter: blur(6px); animation: hb-xf9-fade .3s ease both; }
.hb-xf9-embedded .hb-xf9-scrim { display: none; }
.hb-xf9-overlay[data-state="closed"] .hb-xf9-scrim { animation: hb-xf9-fade .2s ease reverse both; }
.hb-xf9-panel { position: relative; width: min(420px, 100%); max-height: calc(100dvh - 32px); overflow: auto; border-radius: 22px; background: #101010; border: 1px solid #2a2a2a; box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 40px 80px -30px rgba(0,0,0,.9); outline: none; animation: hb-xf9-in .5s cubic-bezier(.16,1,.3,1) both; }
.hb-xf9-overlay[data-state="closed"] .hb-xf9-panel { animation: hb-xf9-out .2s cubic-bezier(.4,0,1,1) both; }
.hb-xf9-stage { position: relative; height: 196px; overflow: hidden; background: radial-gradient(80% 90% at 50% 100%, color-mix(in srgb, var(--hb-xf9-accent) 22%, #101010), #121212 70%); border-bottom: 1px solid #1f1f1f; }
.hb-xf9-stage::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 22px 22px; mask-image: linear-gradient(transparent, #000 30%, #000 70%, transparent); }
.hb-xf9-bars { position: absolute; top: 12px; left: 14px; right: 50px; z-index: 3; display: flex; gap: 4px; }
.hb-xf9-seg { position: relative; flex: 1; height: 3px; border-radius: 3px; background: rgba(255,255,255,.16); overflow: hidden; }
.hb-xf9-seg span { position: absolute; inset: 0; border-radius: inherit; background: #fff; transform-origin: left; transform: scaleX(0); }
.hb-xf9-seg[data-s="past"] span { transform: scaleX(1); }
.hb-xf9-seg[data-s="now"] span { animation: hb-xf9-bar var(--hb-xf9-ms) linear forwards; }
.hb-xf9[data-paused="true"] .hb-xf9-seg[data-s="now"] span { animation-play-state: paused; }
.hb-xf9[data-auto="false"] .hb-xf9-seg[data-s="now"] span { animation: none; transform: scaleX(1); }
.hb-xf9-close { all: unset; position: absolute; top: 4px; right: 8px; z-index: 4; display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; color: #bdbdbd; cursor: pointer; transition: background .2s, color .2s; }
.hb-xf9-close:hover { background: rgba(255,255,255,.08); color: #fff; }
.hb-xf9-close:focus-visible { outline: 2px solid var(--hb-xf9-accent); }
.hb-xf9-close svg { width: 14px; height: 14px; }
.hb-xf9-art { position: absolute; inset: 26px 0 0; display: grid; place-items: center; }
.hb-xf9-art svg { width: 260px; max-width: 86%; height: auto; overflow: visible; }
.hb-xf9-art[data-dir="1"] { animation: hb-xf9-artR .6s cubic-bezier(.16,1,.3,1) both; }
.hb-xf9-art[data-dir="-1"] { animation: hb-xf9-artL .6s cubic-bezier(.16,1,.3,1) both; }
.hb-xf9-tap { all: unset; position: absolute; top: 26px; bottom: 0; z-index: 2; width: 30%; cursor: pointer; }
.hb-xf9-tap:focus-visible { outline: 2px solid var(--hb-xf9-accent); outline-offset: -4px; border-radius: 10px; }
.hb-xf9-tap[data-side="prev"] { left: 0; }
.hb-xf9-tap[data-side="next"] { right: 0; }
.hb-xf9-copy { padding: 16px 20px 6px; min-height: 128px; }
.hb-xf9-copy[data-dir="1"] { animation: hb-xf9-txtR .5s cubic-bezier(.16,1,.3,1) .05s both; }
.hb-xf9-copy[data-dir="-1"] { animation: hb-xf9-txtL .5s cubic-bezier(.16,1,.3,1) .05s both; }
.hb-xf9-meta { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #7a7a7a; }
.hb-xf9-tag { height: 20px; padding: 0 8px; display: inline-grid; place-items: center; border-radius: 999px; font-size: 10.5px; font-weight: 600; color: var(--hb-xf9-accent); background: color-mix(in srgb, var(--hb-xf9-accent) 12%, transparent); border: 1px solid color-mix(in srgb, var(--hb-xf9-accent) 28%, transparent); }
.hb-xf9-ver { font-family: var(--font-mono), ui-monospace, monospace; }
.hb-xf9-title { margin: 10px 0 0; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: 19px; font-weight: 600; letter-spacing: -.02em; }
.hb-xf9-body { margin: 5px 0 0; font-size: 13px; line-height: 1.5; color: #a1a1a1; }
.hb-xf9-more { display: inline-flex; align-items: center; gap: 4px; margin-top: 8px; font-size: 12px; font-weight: 500; color: color-mix(in srgb, var(--hb-xf9-accent) 75%, #fff); text-decoration: none; border-radius: 4px; }
.hb-xf9-more:hover { text-decoration: underline; text-underline-offset: 3px; }
.hb-xf9-more:focus-visible { outline: 2px solid var(--hb-xf9-accent); outline-offset: 2px; }
.hb-xf9-foot { display: flex; align-items: center; gap: 8px; padding: 12px 20px 18px; }
.hb-xf9-check { display: inline-flex; align-items: center; gap: 8px; margin-right: auto; font-size: 12px; color: #8f8f8f; cursor: pointer; user-select: none; }
.hb-xf9-check input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.hb-xf9-box { width: 16px; height: 16px; border-radius: 5px; border: 1.5px solid #3a3a3a; display: grid; place-items: center; transition: all .2s; }
.hb-xf9-box svg { width: 10px; height: 10px; color: #0a0a0a; opacity: 0; transform: scale(.5); transition: all .25s cubic-bezier(.3,1.6,.5,1); }
.hb-xf9-check input:checked + .hb-xf9-box { background: var(--hb-xf9-accent); border-color: var(--hb-xf9-accent); }
.hb-xf9-check input:checked + .hb-xf9-box svg { opacity: 1; transform: none; }
.hb-xf9-check input:focus-visible + .hb-xf9-box { outline: 2px solid var(--hb-xf9-accent); outline-offset: 2px; }
.hb-xf9-btn { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; height: 34px; padding: 0 14px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background .2s, transform .15s cubic-bezier(.3,.7,.4,1), filter .2s; }
.hb-xf9-btn:active { transform: scale(.97); }
.hb-xf9-btn:focus-visible { outline: 2px solid var(--hb-xf9-accent); outline-offset: 2px; }
.hb-xf9-back { color: #a1a1a1; }
.hb-xf9-back:hover { color: #ededed; background: #1a1a1a; }
.hb-xf9-next { min-width: 84px; color: #0a0a0a; background: linear-gradient(#f5f5f5, #dadada); box-shadow: inset 0 -1px 0 rgba(0,0,0,.2); }
.hb-xf9-next:hover { background: #fff; }
.hb-xf9-a-float { animation: hb-xf9-float 4s ease-in-out infinite; }
.hb-xf9-a-row { animation: hb-xf9-row 3.6s cubic-bezier(.65,0,.35,1) infinite; }
.hb-xf9-a-dot { animation: hb-xf9-flow 1.6s linear infinite; }
.hb-xf9-a-pop { transform-box: fill-box; transform-origin: center; animation: hb-xf9-pop .5s cubic-bezier(.3,1.6,.5,1) .5s both; }
@keyframes hb-xf9-fade { from { opacity: 0; } }
@keyframes hb-xf9-in { from { opacity: 0; transform: translateY(16px) scale(.97); } }
@keyframes hb-xf9-out { to { opacity: 0; transform: scale(.97); } }
@keyframes hb-xf9-bar { to { transform: scaleX(1); } }
@keyframes hb-xf9-artR { from { opacity: 0; transform: translateX(40px) scale(.96); } }
@keyframes hb-xf9-artL { from { opacity: 0; transform: translateX(-40px) scale(.96); } }
@keyframes hb-xf9-txtR { from { opacity: 0; transform: translateX(14px); } }
@keyframes hb-xf9-txtL { from { opacity: 0; transform: translateX(-14px); } }
@keyframes hb-xf9-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes hb-xf9-row { 0%, 20% { transform: translateY(0); } 33%, 53% { transform: translateY(22px); } 66%, 86% { transform: translateY(44px); } 100% { transform: translateY(0); } }
@keyframes hb-xf9-flow { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
@keyframes hb-xf9-pop { from { opacity: 0; transform: scale(.3); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xf9 *, .hb-xf9 *::before { animation: none !important; transition: none !important; }
  .hb-xf9-seg[data-s="now"] span { transform: scaleX(1); }
}
`;

function Art({ kind, accent }: { kind: string; accent: string }) {
  if (kind === "command") {
    return (
      <svg viewBox="0 0 260 140" aria-hidden="true">
        <g className="hb-xf9-a-float">
          <rect x="30" y="8" width="200" height="124" rx="14" fill="#161616" stroke="#2c2c2c" />
          <rect x="44" y="22" width="172" height="24" rx="7" fill="#0e0e0e" stroke="#262626" />
          <circle cx="57" cy="34" r="4.5" fill="none" stroke="#6f6f6f" strokeWidth="1.6" />
          <rect x="68" y="31" width="64" height="6" rx="3" fill="#3a3a3a" />
          <rect x="188" y="28" width="20" height="12" rx="3" fill="none" stroke="#3a3a3a" />
          <g className="hb-xf9-a-row">
            <rect x="40" y="54" width="180" height="20" rx="6" fill={accent} opacity=".16" />
            <rect x="40" y="54" width="3" height="20" rx="1.5" fill={accent} />
          </g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="50" y={59 + i * 22} width="10" height="10" rx="3" fill="#2c2c2c" />
              <rect x="68" y={61 + i * 22} width={[70, 92, 58][i]} height="6" rx="3" fill="#4a4a4a" />
              <rect x="190" y={60 + i * 22} width="22" height="8" rx="2.5" fill="#222" />
            </g>
          ))}
        </g>
      </svg>
    );
  }
  if (kind === "sync") {
    return (
      <svg viewBox="0 0 260 140" aria-hidden="true">
        <rect x="18" y="20" width="120" height="84" rx="10" fill="#161616" stroke="#2c2c2c" />
        <rect x="28" y="30" width="100" height="64" rx="5" fill="#0e0e0e" />
        <rect x="36" y="40" width="50" height="6" rx="3" fill={accent} />
        <rect x="36" y="52" width="80" height="5" rx="2.5" fill="#3a3a3a" />
        <rect x="36" y="62" width="70" height="5" rx="2.5" fill="#3a3a3a" />
        <path d="M8 108h140l-6 8H14Z" fill="#1d1d1d" />
        <rect x="190" y="30" width="54" height="96" rx="12" fill="#161616" stroke="#2c2c2c" />
        <rect x="197" y="40" width="40" height="76" rx="6" fill="#0e0e0e" />
        <rect x="203" y="48" width="22" height="5" rx="2.5" fill={accent} />
        <rect x="203" y="58" width="28" height="4" rx="2" fill="#3a3a3a" />
        <rect x="203" y="66" width="24" height="4" rx="2" fill="#3a3a3a" />
        <path d="M140 62 C160 62 168 78 188 78" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 8" className="hb-xf9-a-dot" />
        <path d="M188 92 C168 92 160 76 140 76" fill="none" stroke="#4a4a4a" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 8" className="hb-xf9-a-dot" />
        <g className="hb-xf9-a-pop">
          <rect x="146" y="8" width="44" height="20" rx="10" fill="#0e0e0e" stroke={accent} />
          <text x="168" y="22" textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill={accent}>180ms</text>
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 260 140" aria-hidden="true">
      <g className="hb-xf9-a-float">
        <rect x="26" y="10" width="208" height="122" rx="12" fill="#161616" stroke="#2c2c2c" />
        <circle cx="40" cy="22" r="3" fill="#ff5f57" />
        <circle cx="50" cy="22" r="3" fill="#febc2e" />
        <circle cx="60" cy="22" r="3" fill="#28c840" />
        <rect x="74" y="16" width="112" height="12" rx="6" fill="#0e0e0e" />
        <text x="82" y="25" fontSize="7.5" fontFamily="ui-monospace, monospace" fill="#8f8f8f">feat-checkout.acme.dev</text>
        <rect x="38" y="40" width="96" height="10" rx="4" fill="#3a3a3a" />
        <rect x="38" y="56" width="140" height="6" rx="3" fill="#2a2a2a" />
        <rect x="38" y="68" width="120" height="6" rx="3" fill="#2a2a2a" />
        <rect x="38" y="84" width="84" height="36" rx="7" fill="#1f1f1f" />
        <rect x="130" y="84" width="92" height="36" rx="7" fill="#1f1f1f" />
      </g>
      <g className="hb-xf9-a-pop">
        <circle cx="168" cy="90" r="11" fill={accent} />
        <text x="168" y="94" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0a0a0a">3</text>
      </g>
      <g className="hb-xf9-a-pop" style={{ animationDelay: ".8s" }}>
        <rect x="178" y="98" width="70" height="26" rx="8" fill="#0e0e0e" stroke="#2c2c2c" />
        <rect x="186" y="106" width="40" height="4" rx="2" fill="#5a5a5a" />
        <rect x="186" y="114" width="28" height="4" rx="2" fill="#3a3a3a" />
      </g>
    </svg>
  );
}

export function PopupWhatsNew({
  version = "v4.2",
  date = "Nov 6",
  items = defaultItems,
  interval = 6000,
  autoPlay = true,
  onDone,
  open,
  defaultOpen,
  onOpenChange,
  showTrigger = true,
  triggerLabel = "What's new",
  embedded = false,
  accent = "#34d6b4",
  className = "",
  style,
  ...rest
}: PopupWhatsNewProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [inner, setInner] = React.useState(defaultOpen ?? embedded);
  const isOpen = open ?? inner;
  const mounted = usePresence(isOpen, 220);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const touched = React.useRef(false);
  const [index, setIndex] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const [hover, setHover] = React.useState(false);
  const [focusIn, setFocusIn] = React.useState(false);
  const [dontShow, setDontShow] = React.useState(false);
  const count = items.length;
  const item = items[Math.min(index, count - 1)];
  const last = index >= count - 1;

  const setOpen = React.useCallback(
    (value: boolean) => {
      touched.current = true;
      if (open === undefined) setInner(value);
      onOpenChange?.(value);
    },
    [open, onOpenChange],
  );
  const close = React.useCallback(() => setOpen(false), [setOpen]);
  useModal(isOpen && !embedded, panelRef, close);

  React.useEffect(() => {
    if (!embedded || !touched.current) return;
    if (isOpen) panelRef.current?.focus({ preventScroll: true });
    else triggerRef.current?.focus({ preventScroll: true });
  }, [embedded, isOpen]);

  const go = (next: number) => {
    if (next < 0 || next >= count) return;
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const done = () => {
    onDone?.(dontShow);
    close();
  };

  if (!item) return null;
  const kind = typeof item.art === "string" ? item.art : "previews";
  const custom = item.art !== undefined && typeof item.art !== "string" ? item.art : null;

  return (
    <div
      className={`hb-xf9 ${embedded ? "hb-xf9-embedded" : ""} ${className}`}
      data-paused={hover || focusIn ? "true" : "false"}
      data-auto={autoPlay ? "true" : "false"}
      style={{ "--hb-xf9-accent": accent, "--hb-xf9-ms": `${interval}ms`, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (embedded && e.key === "Escape" && isOpen) {
          e.stopPropagation();
          close();
        }
      }}
      {...rest}
    >
      <style href="hb-popup-whats-new" precedence="default">{css}</style>
      {showTrigger && (!embedded || !mounted) && (
        <button ref={triggerRef} type="button" className="hb-xf9-trigger" aria-haspopup="dialog" onClick={() => { setIndex(0); setOpen(true); }}>
          <i aria-hidden="true" />
          {triggerLabel}
        </button>
      )}
      {mounted && (
        <div className="hb-xf9-overlay" data-state={isOpen ? "open" : "closed"}>
          <div className="hb-xf9-scrim" onClick={close} aria-hidden="true" />
          <div
            ref={panelRef}
            className="hb-xf9-panel"
            role="dialog"
            aria-modal={embedded ? undefined : true}
            aria-roledescription="announcement"
            aria-labelledby={`${uid}-t`}
            aria-describedby={`${uid}-b`}
            tabIndex={-1}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            onFocus={(e) => setFocusIn(e.target !== e.currentTarget && e.target.matches(":focus-visible"))}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusIn(false);
            }}
            onKeyDown={(e) => {
              if (e.target instanceof HTMLInputElement) return;
              if (e.key === "ArrowRight") go(index + 1);
              if (e.key === "ArrowLeft") go(index - 1);
            }}
          >
            <div className="hb-xf9-stage">
              <div className="hb-xf9-bars" aria-hidden="true">
                {items.map((it, i) => (
                  <span key={it.title} className="hb-xf9-seg" data-s={i < index ? "past" : i === index ? "now" : "next"}>
                    <span
                      key={i === index ? `${index}-now` : i}
                      onAnimationEnd={() => {
                        if (i === index && !last) go(index + 1);
                      }}
                    />
                  </span>
                ))}
              </div>
              <button type="button" className="hb-xf9-close" aria-label="Close" onClick={close}>
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m3 3 8 8M11 3l-8 8" /></svg>
              </button>
              <div className="hb-xf9-art" key={`a${index}`} data-dir={dir} aria-hidden="true">
                {custom ?? <Art kind={kind} accent={accent} />}
              </div>
              {index > 0 && <button type="button" className="hb-xf9-tap" data-side="prev" tabIndex={-1} aria-label="Previous update" onClick={() => go(index - 1)} />}
              {!last && <button type="button" className="hb-xf9-tap" data-side="next" tabIndex={-1} aria-label="Next update" onClick={() => go(index + 1)} />}
            </div>
            <div className="hb-xf9-copy" key={`c${index}`} data-dir={dir} aria-live="polite">
              <div className="hb-xf9-meta">
                {item.tag && <span className="hb-xf9-tag">{item.tag}</span>}
                <span className="hb-xf9-ver">{version}</span>
                <span aria-hidden="true">·</span>
                <span>{date}</span>
                <span style={{ marginLeft: "auto" }}>{index + 1} of {count}</span>
              </div>
              <h2 className="hb-xf9-title" id={`${uid}-t`}>{item.title}</h2>
              <p className="hb-xf9-body" id={`${uid}-b`}>{item.body}</p>
              {item.href && (
                <a className="hb-xf9-more" href={item.href}>
                  Read the changelog
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 6h7M6.5 3l3 3-3 3" /></svg>
                </a>
              )}
            </div>
            <div className="hb-xf9-foot">
              <label className="hb-xf9-check">
                <input type="checkbox" checked={dontShow} onChange={(e) => setDontShow(e.target.checked)} />
                <span className="hb-xf9-box" aria-hidden="true">
                  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 5.2 2 2 4-4.4" /></svg>
                </span>
                Don&apos;t show again
              </label>
              {index > 0 && <button type="button" className="hb-xf9-btn hb-xf9-back" onClick={() => go(index - 1)}>Back</button>}
              <button type="button" className="hb-xf9-btn hb-xf9-next" data-autofocus onClick={() => (last ? done() : go(index + 1))}>
                {last ? "Got it" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
