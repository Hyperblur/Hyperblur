"use client";

import * as React from "react";

export type SocialSubscribeBellMode = "all" | "personalized" | "none";

export interface SocialSubscribeBellProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  subscribed?: boolean;
  defaultSubscribed?: boolean;
  onSubscribedChange?: (subscribed: boolean) => void;
  mode?: SocialSubscribeBellMode;
  defaultMode?: SocialSubscribeBellMode;
  onModeChange?: (mode: SocialSubscribeBellMode) => void;
  count?: number;
  locale?: string;
  accent?: string;
  subscribeLabel?: string;
  subscribedLabel?: string;
  countLabel?: string;
}

const css = `
.hb-xc11 { --hb-xc11-a: #ff4d4f; position: relative; display: inline-flex; flex-direction: column; align-items: flex-start; gap: 6px; box-sizing: border-box; font-family: inherit; color: #ededed; }
.hb-xc11 *, .hb-xc11 *::before, .hb-xc11 *::after { box-sizing: border-box; }
.hb-xc11-row { position: relative; display: inline-flex; align-items: center; height: 38px; }
.hb-xc11-sub {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  margin: 0;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xc11-a) 80%, #ffffff), var(--hb-xc11-a));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 8px 20px -8px color-mix(in srgb, var(--hb-xc11-a) 75%, transparent);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, padding 0.45s cubic-bezier(0.65, 0, 0.25, 1), border-radius 0.45s cubic-bezier(0.65, 0, 0.25, 1), transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xc11-sub:active { transform: scale(0.95); }
.hb-xc11-sub:focus-visible, .hb-xc11-bell:focus-visible, .hb-xc11-opt:focus-visible { outline: 2px solid #ededed; outline-offset: 2px; }
.hb-xc11[data-on="true"] .hb-xc11-sub { padding: 0 16px 0 14px; border-radius: 999px 0 0 999px; color: #ededed; background: #1f1f1f; box-shadow: inset 0 0 0 1px #2e2e2e, inset 0 1px 0 rgba(255, 255, 255, 0.05); }
.hb-xc11-tx { display: grid; }
.hb-xc11-tx > span { grid-area: 1 / 1; white-space: nowrap; transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease; }
.hb-xc11-tx > span + span { opacity: 0; transform: translateY(80%); }
.hb-xc11[data-on="true"] .hb-xc11-tx > span:first-child { opacity: 0; transform: translateY(-80%); }
.hb-xc11[data-on="true"] .hb-xc11-tx > span + span { opacity: 1; transform: none; }
.hb-xc11-bw { display: grid; grid-template-columns: 0fr; transition: grid-template-columns 0.45s cubic-bezier(0.65, 0, 0.25, 1); }
.hb-xc11[data-on="true"] .hb-xc11-bw { grid-template-columns: 1fr; }
.hb-xc11-bw > div { min-width: 0; overflow: hidden; }
.hb-xc11-bell {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 38px;
  margin: 0 0 0 2px;
  padding: 0 11px 0 12px;
  border: 0;
  border-radius: 0 999px 999px 0;
  font: inherit;
  color: #ededed;
  background: #1f1f1f;
  box-shadow: inset 0 0 0 1px #2e2e2e, inset 0 1px 0 rgba(255, 255, 255, 0.05);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.25s ease;
}
.hb-xc11-bell:hover, .hb-xc11-bell[aria-expanded="true"] { background: #262626; }
.hb-xc11-bi { display: inline-flex; width: 18px; height: 18px; transform-origin: 50% 3px; }
.hb-xc11-bi svg { width: 18px; height: 18px; display: block; }
.hb-xc11-bi[data-ring="true"] { animation: hb-xc11-ring 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
.hb-xc11-car { width: 12px; height: 12px; color: #8f8f8f; transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xc11-bell[aria-expanded="true"] .hb-xc11-car { transform: rotate(180deg); }
.hb-xc11-menu {
  position: absolute;
  z-index: 20;
  top: calc(100% + 6px);
  right: 0;
  min-width: 196px;
  margin: 0;
  padding: 4px;
  list-style: none;
  border-radius: 13px;
  background: rgba(22, 22, 22, 0.96);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  box-shadow: inset 0 0 0 1px #2c2c2c, inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 18px 40px -12px rgba(0, 0, 0, 0.9);
  transform-origin: top right;
  animation: hb-xc11-pop 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xc11-opt {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  color: #d4d4d4;
  background: transparent;
  cursor: pointer;
  text-align: left;
}
.hb-xc11-opt:hover, .hb-xc11-opt:focus-visible { color: #ffffff; background: #242424; }
.hb-xc11-opt:focus-visible { outline-offset: -2px; }
.hb-xc11-opt svg { width: 16px; height: 16px; flex: none; }
.hb-xc11-opt span:not(.hb-xc11-dot) { flex: 1; }
.hb-xc11-opt[aria-checked="true"] { color: #ffffff; }
.hb-xc11-dot { width: 6px; height: 6px; flex: none; border-radius: 50%; background: var(--hb-xc11-a); }
.hb-xc11-sep { height: 1px; margin: 4px 6px; background: #2a2a2a; }
.hb-xc11-opt[data-danger="true"] { color: #ff8a8e; }
.hb-xc11-cnt { position: relative; height: 16px; overflow: hidden; font-size: 12px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-xc11-cnt span { display: block; white-space: nowrap; animation: hb-xc11-up 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xc11-cnt b { font-weight: 600; color: #d4d4d4; }
@keyframes hb-xc11-ring { 0% { transform: rotate(0); } 15% { transform: rotate(18deg); } 30% { transform: rotate(-15deg); } 45% { transform: rotate(10deg); } 60% { transform: rotate(-6deg); } 75% { transform: rotate(3deg); } 100% { transform: rotate(0); } }
@keyframes hb-xc11-pop { from { opacity: 0; transform: translateY(-4px) scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes hb-xc11-up { from { opacity: 0; transform: translateY(70%); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xc11-sub, .hb-xc11-tx > span, .hb-xc11-bw, .hb-xc11-car { transition: none; }
  .hb-xc11-bi[data-ring="true"], .hb-xc11-menu, .hb-xc11-cnt span { animation: none; }
}
`;

function BellIcon({ mode }: { mode: SocialSubscribeBellMode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z" fill={mode === "all" ? "currentColor" : "none"} />
      <path d="M10 21h4" />
      {mode === "all" ? <path d="M3 9.5a9 9 0 0 1 2.2-4.7M21 9.5a9 9 0 0 0-2.2-4.7" /> : null}
      {mode === "none" ? <path d="M4 4l16 16" /> : null}
    </svg>
  );
}

const MODES: { id: SocialSubscribeBellMode; label: string }[] = [
  { id: "all", label: "All uploads" },
  { id: "personalized", label: "Highlights only" },
  { id: "none", label: "No notifications" },
];

export function SocialSubscribeBell({
  subscribed: subProp,
  defaultSubscribed = false,
  onSubscribedChange,
  mode: modeProp,
  defaultMode = "all",
  onModeChange,
  count = 48213,
  locale = "en-US",
  accent = "#ff4d4f",
  subscribeLabel = "Subscribe",
  subscribedLabel = "Subscribed",
  countLabel = "subscribers",
  className = "",
  style,
  ...rest
}: SocialSubscribeBellProps) {
  const [subInner, setSubInner] = React.useState(defaultSubscribed);
  const [modeInner, setModeInner] = React.useState<SocialSubscribeBellMode>(defaultMode);
  const [menu, setMenu] = React.useState(false);
  const [ring, setRing] = React.useState(0);
  const on = subProp ?? subInner;
  const mode = modeProp ?? modeInner;
  const startOn = subProp ?? defaultSubscribed;
  const value = (startOn ? count - 1 : count) + (on ? 1 : 0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const bellRef = React.useRef<HTMLButtonElement>(null);
  const optRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = React.useId();

  React.useEffect(() => {
    if (!menu) return;
    function away(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setMenu(false);
    }
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [menu]);

  function setSub(next: boolean) {
    if (subProp === undefined) setSubInner(next);
    onSubscribedChange?.(next);
    if (next) setRing((r) => r + 1);
  }

  function setMode(next: SocialSubscribeBellMode) {
    if (modeProp === undefined) setModeInner(next);
    onModeChange?.(next);
    if (next === "all") setRing((r) => r + 1);
  }

  function openMenu(focusIdx: number) {
    setMenu(true);
    window.requestAnimationFrame(() => optRefs.current[focusIdx]?.focus());
  }

  function closeMenu() {
    setMenu(false);
    bellRef.current?.focus();
  }

  function onMenuKey(e: React.KeyboardEvent<HTMLDivElement>) {
    const list = optRefs.current.filter(Boolean) as HTMLButtonElement[];
    const i = list.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      list[(i + 1) % list.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      list[(i - 1 + list.length) % list.length]?.focus();
    } else if (e.key === "Tab") {
      setMenu(false);
    }
  }

  const fmt = new Intl.NumberFormat(locale);

  return (
    <>
      <style href="hb-social-subscribe-bell" precedence="default">{css}</style>
      <div
        ref={rootRef}
        className={`hb-xc11 ${className}`}
        style={{ "--hb-xc11-a": accent, ...style } as React.CSSProperties}
        data-on={on ? "true" : undefined}
        {...rest}
      >
        <div className="hb-xc11-row">
          <button
            type="button"
            className="hb-xc11-sub"
            aria-pressed={on}
            onClick={() => {
              if (!on) setSub(true);
              else openMenu(0);
            }}
          >
            <span className="hb-xc11-tx">
              <span aria-hidden={on || undefined}>{subscribeLabel}</span>
              <span aria-hidden={!on || undefined}>{subscribedLabel}</span>
            </span>
          </button>
          <div className="hb-xc11-bw" aria-hidden={on ? undefined : true}>
            <div>
              <button
                ref={bellRef}
                type="button"
                className="hb-xc11-bell"
                tabIndex={on ? 0 : -1}
                aria-haspopup="menu"
                aria-expanded={menu}
                aria-controls={menu ? menuId : undefined}
                aria-label={`Notifications: ${MODES.find((m) => m.id === mode)?.label ?? mode}`}
                onClick={() => (menu ? setMenu(false) : openMenu(Math.max(0, MODES.findIndex((m) => m.id === mode))))}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" && !menu) {
                    e.preventDefault();
                    openMenu(0);
                  }
                }}
              >
                <span className="hb-xc11-bi" data-ring={ring > 0 ? "true" : undefined} key={ring}>
                  <BellIcon mode={mode} />
                </span>
                <svg className="hb-xc11-car" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </button>
            </div>
          </div>
          {menu ? (
            <div id={menuId} className="hb-xc11-menu" role="menu" aria-label="Notification settings" onKeyDown={onMenuKey}>
              {MODES.map((m, i) => (
                <button
                  key={m.id}
                  ref={(el) => {
                    optRefs.current[i] = el;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={mode === m.id}
                  className="hb-xc11-opt"
                  onClick={() => {
                    setMode(m.id);
                    closeMenu();
                  }}
                >
                  <BellIcon mode={m.id} />
                  <span>{m.label}</span>
                  {mode === m.id ? <span className="hb-xc11-dot" aria-hidden="true" /> : null}
                </button>
              ))}
              <div className="hb-xc11-sep" role="separator" />
              <button
                ref={(el) => {
                  optRefs.current[MODES.length] = el;
                }}
                type="button"
                role="menuitem"
                className="hb-xc11-opt"
                data-danger="true"
                onClick={() => {
                  setSub(false);
                  setMenu(false);
                  rootRef.current?.querySelector<HTMLButtonElement>(".hb-xc11-sub")?.focus();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" aria-hidden="true">
                  <path d="M6 12h12" />
                </svg>
                <span>Unsubscribe</span>
              </button>
            </div>
          ) : null}
        </div>
        <div className="hb-xc11-cnt">
          <span key={value}>
            <b>{fmt.format(value)}</b> {countLabel}
          </span>
        </div>
      </div>
    </>
  );
}
