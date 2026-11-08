"use client";

import * as React from "react";

const PATHS = {
  scan: "M3.5 7V4.5a1 1 0 0 1 1-1H7M13 3.5h2.5a1 1 0 0 1 1 1V7M16.5 13v2.5a1 1 0 0 1-1 1H13M7 16.5H4.5a1 1 0 0 1-1-1V13M3.5 10h13",
  send: "M3.5 10l13-6-5 13-2-5.5z",
  card: "M3 5.5h14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zM2 8.5h16M5 12h3",
  gift: "M3.5 8h13v3h-13zM4.5 11h11v5.5h-11zM10 8v8.5M10 8c-1.5-3.5-5-3-4 0M10 8c1.5-3.5 5-3 4 0",
  home: "M3.5 9.2L10 3.8l6.5 5.4V16a.8.8 0 0 1-.8.8H12v-4.5H8v4.5H4.3a.8.8 0 0 1-.8-.8z",
  clock: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 6v4.2l2.8 1.8",
  chart: "M4 16V9M10 16V4M16 16v-5",
  shield: "M10 2.8l6 2.2v4.6c0 3.7-2.5 6.4-6 7.6-3.5-1.2-6-3.9-6-7.6V5zM7.5 10l1.8 1.8 3.4-3.6",
  help: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8 8a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2v.5M10 14v.1",
} as const;

export type MenuSideBottomSheetIconName = keyof typeof PATHS;

export interface MenuSideBottomSheetAction {
  id: string;
  label: string;
  icon?: MenuSideBottomSheetIconName | React.ReactNode;
  tint?: string;
}

export interface MenuSideBottomSheetLink {
  id: string;
  label: string;
  icon?: MenuSideBottomSheetIconName | React.ReactNode;
  meta?: string;
}

export interface MenuSideBottomSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "title"> {
  actions?: MenuSideBottomSheetAction[];
  links?: MenuSideBottomSheetLink[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  onAction?: (id: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  snaps?: number[];
  user?: { name: string; detail?: string; color?: string };
  triggerLabel?: string;
  embedded?: boolean;
  accent?: string;
}

const defaultActions: MenuSideBottomSheetAction[] = [
  { id: "scan", label: "Scan", icon: "scan", tint: "#2f7bff" },
  { id: "send", label: "Send", icon: "send", tint: "#8b5cf6" },
  { id: "cards", label: "Cards", icon: "card", tint: "#30a46c" },
  { id: "rewards", label: "Rewards", icon: "gift", tint: "#f5a623" },
];

const defaultLinks: MenuSideBottomSheetLink[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "activity", label: "Activity", icon: "clock", meta: "3 new" },
  { id: "insights", label: "Insights", icon: "chart" },
  { id: "security", label: "Security", icon: "shield" },
  { id: "help", label: "Help center", icon: "help" },
];

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

const css = `
.hb-xk10 {
  --hb-xk10-a: #2f7bff;
  --hb-xk10-max: .92;
  --hb-xk10-s: 0;
  position: fixed;
  inset: 0;
  z-index: 60;
  box-sizing: border-box;
  height: 100dvh;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 18px;
  pointer-events: none;
}
.hb-xk10[data-embedded="true"] { position: absolute; z-index: 5; height: 100%; overflow: hidden; border-radius: inherit; }
.hb-xk10 *, .hb-xk10 *::before, .hb-xk10 *::after { box-sizing: border-box; }
.hb-xk10-dim {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: rgba(0, 0, 0, .62);
  opacity: calc(var(--hb-xk10-s) / var(--hb-xk10-max));
  cursor: default;
  transition: opacity .45s cubic-bezier(.32, .72, 0, 1);
}
.hb-xk10[data-open="true"] .hb-xk10-dim { pointer-events: auto; }
.hb-xk10[data-drag="true"] .hb-xk10-dim, .hb-xk10[data-drag="true"] .hb-xk10-sheet { transition: none; }
.hb-xk10-sheet {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: calc(var(--hb-xk10-max) * 100%);
  border: 1px solid #262626;
  border-bottom: 0;
  border-radius: 22px 22px 0 0;
  background: linear-gradient(180deg, #181818, #111 120px);
  box-shadow: 0 -20px 60px -10px rgba(0, 0, 0, .8), inset 0 1px 0 rgba(255, 255, 255, .06);
  transform: translateY(calc((1 - var(--hb-xk10-s) / var(--hb-xk10-max)) * 100%));
  transition: transform .5s cubic-bezier(.32, .72, 0, 1);
  pointer-events: auto;
  outline: none;
}
.hb-xk10[data-open="false"] .hb-xk10-sheet { pointer-events: none; }
.hb-xk10-grab {
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  margin: 0;
  padding: 8px 16px 10px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: grab;
  touch-action: none;
  user-select: none;
}
.hb-xk10[data-drag="true"] .hb-xk10-grab { cursor: grabbing; }
.hb-xk10-grab:focus-visible { outline: none; }
.hb-xk10-grab:focus-visible .hb-xk10-pill { background: var(--hb-xk10-a); }
.hb-xk10-pill { align-self: center; width: 38px; height: 5px; margin-bottom: 12px; border-radius: 99px; background: #3a3a3a; transition: background-color .2s ease, width .3s cubic-bezier(.22, 1, .36, 1); }
.hb-xk10-grab:hover .hb-xk10-pill, .hb-xk10[data-drag="true"] .hb-xk10-pill { width: 46px; background: #555; }
.hb-xk10-me { display: flex; align-items: center; gap: 10px; }
.hb-xk10-av { display: grid; flex: none; place-items: center; width: 36px; height: 36px; border-radius: 99px; background: var(--hb-xk10-uc); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3), 0 0 0 1px rgba(255, 255, 255, .06); color: #fff; font-size: 13px; font-weight: 700; }
.hb-xk10-mt { display: flex; flex: 1; padding-right: 36px; flex-direction: column; min-width: 0; }
.hb-xk10-mt b { overflow: hidden; font-size: 14px; font-weight: 600; letter-spacing: -.01em; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk10-mt span { color: #8f8f8f; font-size: 11.5px; }
.hb-xk10-x { position: absolute; top: 25px; right: 14px; display: grid; flex: none; place-items: center; width: 30px; height: 30px; margin: 0; padding: 0; border: 0; border-radius: 99px; background: #222; color: #a1a1a1; cursor: pointer; transition: background-color .15s ease, color .15s ease, transform .15s ease; }
.hb-xk10-x:hover { background: #2c2c2c; color: #fff; }
.hb-xk10-x:active { transform: scale(.92); }
.hb-xk10-x:focus-visible, .hb-xk10-tile:focus-visible, .hb-xk10-row:focus-visible, .hb-xk10-trig:focus-visible { outline: 2px solid var(--hb-xk10-a); outline-offset: 2px; }
.hb-xk10-x svg { width: 12px; height: 12px; }
.hb-xk10-body { flex: 1; min-height: 0; padding: 0 12px 16px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: none; }
.hb-xk10-body::-webkit-scrollbar { display: none; }
.hb-xk10-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 0 0 12px; padding: 0; list-style: none; }
.hb-xk10-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  margin: 0;
  padding: 10px 0 8px;
  border: 1px solid #242424;
  border-radius: 14px;
  background: linear-gradient(180deg, #1b1b1b, #151515);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  color: #c4c4c9;
  font: inherit;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: transform .2s cubic-bezier(.22, 1, .36, 1), border-color .2s ease;
}
.hb-xk10-tile:hover { border-color: #333; }
.hb-xk10-tile:active { transform: scale(.94); }
.hb-xk10-ti { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 10px; background: color-mix(in srgb, var(--hb-xk10-t) 20%, transparent); color: color-mix(in srgb, var(--hb-xk10-t) 55%, #fff); }
.hb-xk10-ti svg { width: 17px; height: 17px; }
.hb-xk10-list { margin: 0; padding: 4px; border: 1px solid #222; border-radius: 16px; background: #141414; list-style: none; }
.hb-xk10-row { display: flex; align-items: center; gap: 12px; width: 100%; height: 42px; margin: 0; padding: 0 10px; border: 0; border-radius: 12px; background: transparent; color: #c4c4c9; font: inherit; font-size: 13.5px; font-weight: 500; text-align: left; cursor: pointer; transition: background-color .15s ease, color .15s ease; }
.hb-xk10-row svg { flex: none; width: 18px; height: 18px; color: #77777f; }
.hb-xk10-row:hover { background: rgba(255, 255, 255, .04); color: #fff; }
.hb-xk10-row[aria-current="page"] { background: color-mix(in srgb, var(--hb-xk10-a) 14%, transparent); color: #fff; }
.hb-xk10-row[aria-current="page"] svg { color: var(--hb-xk10-a); }
.hb-xk10-rl { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xk10-meta { padding: 1px 7px; border-radius: 99px; background: var(--hb-xk10-a); color: #fff; font-size: 10.5px; font-weight: 600; }
.hb-xk10-chev { width: 14px !important; height: 14px !important; color: #4a4a50 !important; }
.hb-xk10-li + .hb-xk10-li { border-top: 1px solid #1c1c1c; }
.hb-xk10-trig {
  position: absolute;
  bottom: max(16px, env(safe-area-inset-bottom));
  left: 50%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  margin: 0;
  padding: 0 18px 0 14px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 99px;
  background: rgba(24, 24, 24, .9);
  box-shadow: 0 14px 30px -10px rgba(0, 0, 0, .9), inset 0 1px 0 rgba(255, 255, 255, .08);
  color: #ededed;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  pointer-events: auto;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transform: translateX(-50%);
  transition: opacity .3s ease, transform .4s cubic-bezier(.32, .72, 0, 1);
}
.hb-xk10-trig svg { width: 16px; height: 16px; }
.hb-xk10[data-open="true"] .hb-xk10-trig { opacity: 0; pointer-events: none; transform: translate(-50%, 20px); }
@media (prefers-reduced-motion: reduce) {
  .hb-xk10 *, .hb-xk10 *::before, .hb-xk10 *::after { transition: none !important; }
}
`;

function Glyph({ icon, fallback }: { icon?: MenuSideBottomSheetIconName | React.ReactNode; fallback: MenuSideBottomSheetIconName }) {
  if (typeof icon === "string" || icon === undefined) {
    const d = PATHS[(icon as MenuSideBottomSheetIconName | undefined) ?? fallback] ?? PATHS[fallback];
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    );
  }
  return <>{icon}</>;
}

export function MenuSideBottomSheet({
  actions = defaultActions,
  links = defaultLinks,
  active,
  defaultActive,
  onChange,
  onAction,
  open,
  defaultOpen = false,
  onOpenChange,
  snaps = [0.56, 0.92],
  user = { name: "Jordan Ellis", detail: "Personal account", color: "#2f7bff" },
  triggerLabel = "Menu",
  embedded = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: MenuSideBottomSheetProps) {
  const snapKey = snaps.join(",");
  const points = React.useMemo(() => {
    const list = snapKey.split(",").map(Number).filter((n) => n > 0 && n <= 1);
    return list.length ? list.sort((x, y) => x - y) : [0.92];
  }, [snapKey]);
  const maxSnap = points[points.length - 1];
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const [inner, setInner] = React.useState(defaultActive ?? links[0]?.id ?? "");
  const [snap, setSnap] = React.useState(points[0]);
  const [live, setLive] = React.useState<number | null>(null);
  const isOpen = open ?? innerOpen;
  const current = active ?? inner;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const trigRef = React.useRef<HTMLButtonElement>(null);
  const drag = React.useRef<{ y: number; s: number; h: number; lastY: number; lastT: number; v: number } | null>(null);
  const titleId = React.useId();
  const touched = React.useRef(false);

  const setOpen = React.useCallback(
    (v: boolean) => {
      touched.current = true;
      if (v) setSnap(points[0]);
      if (open === undefined) setInnerOpen(v);
      onOpenChange?.(v);
    },
    [open, onOpenChange, points],
  );

  React.useEffect(() => {
    if (!isOpen || embedded) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const opener = trigRef.current;
    const t = window.setTimeout(() => sheetRef.current?.querySelector<HTMLElement>("[data-xk10-first]")?.focus({ preventScroll: true }), 60);
    return () => {
      window.clearTimeout(t);
      html.style.overflow = prev;
      if (touched.current) opener?.focus({ preventScroll: true });
    };
  }, [isOpen, embedded]);

  function close() {
    setOpen(false);
    if (embedded) trigRef.current?.focus({ preventScroll: true });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    rest.onKeyDown?.(e);
    if (!isOpen || e.defaultPrevented) return;
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== "Tab" || embedded) return;
    const nodes = Array.from(sheetRef.current?.querySelectorAll<HTMLElement>(focusable) ?? []);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function onDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.button !== 0) return;
    const h = rootRef.current?.clientHeight ?? 600;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { y: e.clientY, s: snap, h, lastY: e.clientY, lastT: e.timeStamp, v: 0 };
  }

  function onMove(e: React.PointerEvent<HTMLButtonElement>) {
    const d = drag.current;
    if (!d) return;
    const dt = Math.max(1, e.timeStamp - d.lastT);
    d.v = (e.clientY - d.lastY) / dt;
    d.lastY = e.clientY;
    d.lastT = e.timeStamp;
    let s = d.s - (e.clientY - d.y) / d.h;
    if (s > maxSnap) s = maxSnap + (s - maxSnap) * 0.2;
    if (Math.abs(e.clientY - d.y) > 3) setLive(Math.max(0, s));
  }

  function onUp() {
    const d = drag.current;
    drag.current = null;
    if (live === null || !d) {
      setLive(null);
      return;
    }
    const projected = live - d.v * 0.18;
    setLive(null);
    if (projected < points[0] * 0.55) {
      close();
      return;
    }
    let best = points[0];
    for (const p of points) if (Math.abs(p - projected) < Math.abs(best - projected)) best = p;
    setSnap(best);
  }

  function onGrabKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    const i = points.indexOf(snap);
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSnap(points[Math.min(points.length - 1, i + 1)]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (i <= 0) close();
      else setSnap(points[i - 1]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSnap(points[(i + 1) % points.length]);
    }
  }

  const shown = isOpen ? live ?? snap : 0;
  const initials = user.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();

  const vars = {
    "--hb-xk10-a": accent,
    "--hb-xk10-max": maxSnap,
    "--hb-xk10-s": shown.toFixed(4),
    "--hb-xk10-uc": user.color ?? accent,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      {...rest}
      className={`hb-xk10 ${className}`}
      data-open={isOpen}
      data-embedded={embedded}
      data-drag={live !== null}
      style={vars}
      onKeyDown={onKeyDown}
    >
      <style href="hb-menu-side-bottom-sheet" precedence="default">{css}</style>
      <button ref={trigRef} type="button" className="hb-xk10-trig" aria-haspopup="dialog" aria-expanded={isOpen} tabIndex={isOpen ? -1 : 0} onClick={() => setOpen(true)}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M3 5h10M3 8h10M3 11h6" />
        </svg>
        {triggerLabel}
      </button>
      <button type="button" className="hb-xk10-dim" tabIndex={-1} aria-hidden="true" onClick={close} />
      <div
        ref={sheetRef}
        className="hb-xk10-sheet"
        role="dialog"
        aria-modal={isOpen && !embedded ? true : undefined}
        aria-labelledby={titleId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        tabIndex={-1}
      >
        <button
          type="button"
          className="hb-xk10-grab"
          aria-label={`Resize menu, ${Math.round((live ?? snap) * 100)} percent`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={onGrabKey}
        >
          <span className="hb-xk10-pill" aria-hidden="true" />
          <span className="hb-xk10-me" aria-hidden="true">
            <span className="hb-xk10-av">{initials}</span>
            <span className="hb-xk10-mt">
              <b id={titleId}>{user.name}</b>
              {user.detail ? <span>{user.detail}</span> : null}
            </span>
          </span>
        </button>
        <button type="button" className="hb-xk10-x" aria-label="Close menu" onClick={close}>
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </button>
        <div className="hb-xk10-body">
          <ul className="hb-xk10-grid" role="list">
            {actions.map((a, i) => (
              <li key={a.id}>
                <button
                  type="button"
                  className="hb-xk10-tile"
                  data-xk10-first={i === 0 ? "" : undefined}
                  style={{ "--hb-xk10-t": a.tint ?? accent } as React.CSSProperties}
                  onClick={() => onAction?.(a.id)}
                >
                  <span className="hb-xk10-ti">
                    <Glyph icon={a.icon} fallback="scan" />
                  </span>
                  {a.label}
                </button>
              </li>
            ))}
          </ul>
          <ul className="hb-xk10-list" role="list">
            {links.map((l) => (
              <li key={l.id} className="hb-xk10-li">
                <button
                  type="button"
                  className="hb-xk10-row"
                  aria-current={l.id === current ? "page" : undefined}
                  onClick={() => {
                    if (active === undefined) setInner(l.id);
                    onChange?.(l.id);
                  }}
                >
                  <Glyph icon={l.icon} fallback="home" />
                  <span className="hb-xk10-rl">{l.label}</span>
                  {l.meta ? <span className="hb-xk10-meta">{l.meta}</span> : null}
                  <svg className="hb-xk10-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
