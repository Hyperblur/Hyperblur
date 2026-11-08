"use client";

import * as React from "react";

export interface PopoverRadialItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
}

export interface PopoverRadialMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: PopoverRadialItem[];
  children?: React.ReactNode;
  radius?: number;
  longPress?: number;
  onSelect?: (id: string) => void;
  onOpenChange?: (open: boolean) => void;
  label?: string;
  embedded?: boolean;
  accent?: string;
}

const glyphs: Record<string, string> = {
  copy: "M9 9h10v10H9zM5 15V5h10",
  duplicate: "M8 8h12v12H8zM14 11v6M11 14h6M4 16V4h12",
  share: "M12 3v12M7 8l5-5 5 5M5 13v6h14v-6",
  favorite: "M12 4l2.5 5.2 5.5.7-4 3.9 1 5.6L12 16.8 7 19.4l1-5.6-4-3.9 5.5-.7z",
  rename: "M4 20h4L19 9l-4-4L4 16zM13 7l4 4",
  delete: "M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13",
};

const defaultItems: PopoverRadialItem[] = [
  { id: "copy", label: "Copy", shortcut: "⌘C" },
  { id: "duplicate", label: "Duplicate", shortcut: "⌘D" },
  { id: "share", label: "Share", shortcut: "⇧S" },
  { id: "favorite", label: "Favorite", shortcut: "F" },
  { id: "rename", label: "Rename", shortcut: "↵" },
  { id: "delete", label: "Delete", shortcut: "⌫", danger: true },
];

const css = `
.hb-xf10 { --hb-xf10-accent: #2f7bff; position: relative; box-sizing: border-box; width: 100%; font-family: inherit; color: #ededed; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; touch-action: manipulation; outline: none; border-radius: 16px; }
.hb-xf10 *, .hb-xf10 *::before, .hb-xf10 *::after { box-sizing: border-box; }
.hb-xf10:focus-visible { box-shadow: 0 0 0 2px var(--hb-xf10-accent); }
.hb-xf10-canvas { position: relative; height: 280px; border-radius: 16px; overflow: hidden; border: 1px solid #222; background: linear-gradient(180deg, #1d2a3f 0%, #3b3552 45%, #c0745a 78%, #2a1d1b 100%); }
.hb-xf10-canvas svg { position: absolute; inset: auto 0 0; width: 100%; height: 62%; }
.hb-xf10-sun { position: absolute; left: 62%; top: 34%; width: 56px; height: 56px; border-radius: 50%; background: radial-gradient(circle, #ffd9a0, #ff9a6a 60%, transparent 70%); filter: blur(.5px); }
.hb-xf10-cap { position: absolute; left: 12px; right: 12px; bottom: 12px; display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 11.5px; }
.hb-xf10-file { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; border-radius: 999px; background: rgba(10,10,10,.55); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.1); font-family: var(--font-mono), ui-monospace, monospace; }
.hb-xf10-hint { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; border-radius: 999px; background: rgba(10,10,10,.55); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.1); color: #d4d4d4; white-space: nowrap; }
.hb-xf10-hint kbd { font-family: var(--font-mono), ui-monospace, monospace; font-size: 10px; padding: 0 4px; border-radius: 4px; border: 1px solid rgba(255,255,255,.2); }
.hb-xf10-menu { position: absolute; z-index: 40; outline: none; transform: translate(-50%, -50%); }
.hb-xf10-menu svg { display: block; overflow: visible; filter: drop-shadow(0 18px 30px rgba(0,0,0,.6)); }
.hb-xf10-ring { transform-origin: center; transform-box: view-box; animation: hb-xf10-open .42s cubic-bezier(.2,1.3,.4,1) both; }
.hb-xf10-menu[data-state="closing"] .hb-xf10-ring { animation: hb-xf10-close .2s cubic-bezier(.4,0,1,1) both; }
.hb-xf10-wedge { fill: rgba(22,22,22,.92); stroke: #2e2e2e; stroke-width: 1; transition: fill .18s ease, transform .25s cubic-bezier(.3,1.4,.5,1); transform-box: view-box; transform-origin: center; cursor: pointer; }
.hb-xf10-item[data-active="true"] .hb-xf10-wedge { fill: color-mix(in srgb, var(--hb-xf10-accent) 30%, #161616); stroke: color-mix(in srgb, var(--hb-xf10-accent) 70%, #2e2e2e); }
.hb-xf10-item[data-danger="true"][data-active="true"] .hb-xf10-wedge { fill: color-mix(in srgb, #ff4d4d 28%, #161616); stroke: #ff5d5d; }
.hb-xf10-item[data-fired="true"] .hb-xf10-wedge { animation: hb-xf10-fire .35s ease both; }
.hb-xf10-icon { fill: none; stroke: #bdbdbd; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; transition: stroke .18s; pointer-events: none; }
.hb-xf10-item[data-active="true"] .hb-xf10-icon { stroke: #fff; }
.hb-xf10-item[data-danger="true"] .hb-xf10-icon { stroke: #ff8a8a; }
.hb-xf10-hub { fill: #0f0f0f; stroke: #2e2e2e; }
.hb-xf10-pointer { fill: var(--hb-xf10-accent); transition: transform .25s cubic-bezier(.3,1.3,.5,1); transform-box: view-box; transform-origin: center; }
.hb-xf10-hublabel { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); display: grid; justify-items: center; gap: 2px; pointer-events: none; text-align: center; }
.hb-xf10-hublabel b { font-size: 11.5px; font-weight: 600; white-space: nowrap; }
.hb-xf10-hublabel span { font-family: var(--font-mono), ui-monospace, monospace; font-size: 10px; color: #8f8f8f; }
.hb-xf10-toast { position: absolute; left: 50%; top: 14px; z-index: 41; transform: translateX(-50%); display: inline-flex; align-items: center; gap: 7px; height: 30px; padding: 0 12px; border-radius: 999px; font-size: 12px; background: rgba(15,15,15,.88); backdrop-filter: blur(10px); border: 1px solid #2a2a2a; white-space: nowrap; animation: hb-xf10-toast 1.8s cubic-bezier(.2,.8,.2,1) both; }
.hb-xf10-toast i { font-style: normal; width: 7px; height: 7px; border-radius: 50%; background: #3ddc84; }
@keyframes hb-xf10-open { from { opacity: 0; transform: scale(.4) rotate(-40deg); } to { opacity: 1; transform: none; } }
@keyframes hb-xf10-close { to { opacity: 0; transform: scale(.7) rotate(12deg); } }
@keyframes hb-xf10-fire { 50% { transform: scale(1.07); } }
@keyframes hb-xf10-toast { 0% { opacity: 0; transform: translate(-50%, -8px); } 15%, 80% { opacity: 1; transform: translate(-50%, 0); } 100% { opacity: 0; transform: translate(-50%, -4px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xf10 *, .hb-xf10 *::before { animation: none !important; transition: none !important; }
}
`;

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function sector(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const [x0, y0] = polar(cx, cy, r1, a0);
  const [x1, y1] = polar(cx, cy, r1, a1);
  const [x2, y2] = polar(cx, cy, r0, a1);
  const [x3, y3] = polar(cx, cy, r0, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  const f = (n: number) => n.toFixed(2);
  return `M${f(x0)} ${f(y0)} A${r1} ${r1} 0 ${large} 1 ${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)} A${r0} ${r0} 0 ${large} 0 ${f(x3)} ${f(y3)} Z`;
}

function DefaultCanvas() {
  return (
    <div className="hb-xf10-canvas">
      <span className="hb-xf10-sun" aria-hidden="true" />
      <svg viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 90 L60 50 L110 80 L170 30 L230 76 L290 44 L350 70 L400 52 V160 H0Z" fill="#2b2338" />
        <path d="M0 120 L80 84 L150 110 L220 78 L300 108 L360 90 L400 104 V160 H0Z" fill="#1b1622" />
        <path d="M0 140 Q100 124 200 138 T400 132 V160 H0Z" fill="#0f0c12" />
      </svg>
      <div className="hb-xf10-cap">
        <span className="hb-xf10-file">IMG_2041.heic</span>
        <span className="hb-xf10-hint">Right-click or hold <kbd>⇧F10</kbd></span>
      </div>
    </div>
  );
}

export function PopoverRadialMenu({
  items = defaultItems,
  children,
  radius = 92,
  longPress = 450,
  onSelect,
  onOpenChange,
  label = "Photo actions",
  embedded = false,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: PopoverRadialMenuProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const rootRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [menu, setMenu] = React.useState<{ x: number; y: number } | null>(embedded ? { x: -1, y: -1 } : null);
  const [closing, setClosing] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [fired, setFired] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<{ text: string; n: number } | null>(null);
  const press = React.useRef(0);
  const timers = React.useRef<number[]>([]);
  const n = Math.max(1, items.length);
  const r0 = Math.round(radius * 0.4);
  const size = (radius + 8) * 2;
  const c = size / 2;
  const step = 360 / n;

  React.useEffect(() => {
    const list = timers.current;
    return () => {
      list.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(press.current);
    };
  }, []);

  const openAt = React.useCallback(
    (clientX: number | null, clientY: number | null) => {
      const root = rootRef.current;
      if (!root) return;
      const rr = root.getBoundingClientRect();
      const k = rr.width / (root.offsetWidth || 1) || 1;
      const w = root.offsetWidth;
      const h = root.offsetHeight;
      const pad = radius + 10;
      let x = clientX === null ? w / 2 : (clientX - rr.left) / k;
      let y = clientY === null ? h / 2 : (clientY - rr.top) / k;
      x = w > pad * 2 ? Math.min(Math.max(x, pad), w - pad) : w / 2;
      y = h > pad * 2 ? Math.min(Math.max(y, pad), h - pad) : h / 2;
      setClosing(false);
      setActive(0);
      setMenu({ x, y });
      onOpenChange?.(true);
      requestAnimationFrame(() => menuRef.current?.focus({ preventScroll: true }));
    },
    [radius, onOpenChange],
  );

  const close = React.useCallback(
    (refocus: boolean) => {
      setClosing(true);
      timers.current.push(
        window.setTimeout(() => {
          setMenu(null);
          setClosing(false);
          setFired(null);
          onOpenChange?.(false);
          if (refocus) rootRef.current?.focus({ preventScroll: true });
        }, 200),
      );
    },
    [onOpenChange],
  );

  React.useEffect(() => {
    if (!menu || embedded) return;
    const onDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close(false);
    };
    const onScroll = () => close(false);
    document.addEventListener("pointerdown", onDown, true);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [menu, embedded, close]);

  const fire = (i: number) => {
    const item = items[i];
    if (!item || closing) return;
    setFired(item.id);
    onSelect?.(item.id);
    setToast((t) => ({ text: item.label, n: (t?.n ?? 0) + 1 }));
    timers.current.push(window.setTimeout(() => close(true), 160));
  };

  const pick = (e: React.PointerEvent) => {
    const el = menuRef.current;
    if (!el) return -1;
    const b = el.getBoundingClientRect();
    const k = b.width / (el.offsetWidth || 1) || 1;
    const dx = (e.clientX - (b.left + b.width / 2)) / k;
    const dy = (e.clientY - (b.top + b.height / 2)) / k;
    if (Math.hypot(dx, dy) < r0) return -1;
    const deg = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + step / 2 + 720) % 360;
    return Math.floor(deg / step) % n;
  };

  const onMenuKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % n);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + n) % n);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(n - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fire(active);
    } else if (e.key === "Escape" || e.key === "Tab") {
      if (e.key === "Escape") e.preventDefault();
      e.stopPropagation();
      close(e.key === "Escape");
    }
  };

  const cur = items[active];
  const pos = menu && menu.x < 0 ? { left: "50%", top: "50%" } : menu ? { left: menu.x, top: menu.y } : undefined;
  const mid = -90 + active * step;

  return (
    <div
      ref={rootRef}
      className={`hb-xf10 ${className}`}
      tabIndex={0}
      aria-label={`${label}. Press Shift F10 for actions`}
      aria-haspopup="menu"
      aria-expanded={Boolean(menu)}
      style={{ "--hb-xf10-accent": accent, ...style } as React.CSSProperties}
      onContextMenu={(e) => {
        e.preventDefault();
        openAt(e.clientX, e.clientY);
      }}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if ((e.shiftKey && e.key === "F10") || e.key === "ContextMenu" || e.key === "Enter") {
          e.preventDefault();
          openAt(null, null);
        }
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== "touch" || menu) return;
        const { clientX, clientY } = e;
        window.clearTimeout(press.current);
        press.current = window.setTimeout(() => openAt(clientX, clientY), longPress);
      }}
      onPointerUp={() => window.clearTimeout(press.current)}
      onPointerCancel={() => window.clearTimeout(press.current)}
      onPointerMove={(e) => {
        if (e.pointerType === "touch" && !menu) window.clearTimeout(press.current);
      }}
      {...rest}
    >
      <style href="hb-popover-radial-menu" precedence="default">{css}</style>
      {children ?? <DefaultCanvas />}
      {toast && (
        <span className="hb-xf10-toast" key={toast.n} role="status">
          <i aria-hidden="true" />
          {toast.text} · done
        </span>
      )}
      {menu && pos && (
        <div
          ref={menuRef}
          className="hb-xf10-menu"
          role="menu"
          aria-label={label}
          aria-activedescendant={`${uid}-i${active}`}
          tabIndex={-1}
          data-state={closing ? "closing" : "open"}
          style={{ ...pos, width: size, height: size }}
          onKeyDown={onMenuKey}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onPointerMove={(e) => {
            const i = pick(e);
            if (i >= 0 && i !== active) setActive(i);
          }}
          onClick={(e) => {
            e.stopPropagation();
            const i = pick(e as unknown as React.PointerEvent);
            if (i >= 0) fire(i);
            else close(true);
          }}
        >
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <g className="hb-xf10-ring">
              {items.map((it, i) => {
                const a0 = -90 - step / 2 + i * step + 1.6;
                const a1 = a0 + step - 3.2;
                const [ix, iy] = polar(c, c, (r0 + radius) / 2, -90 + i * step);
                const glyph = glyphs[it.id];
                return (
                  <g
                    key={it.id}
                    id={`${uid}-i${i}`}
                    className="hb-xf10-item"
                    role="menuitem"
                    aria-label={it.shortcut ? `${it.label}, ${it.shortcut}` : it.label}
                    data-active={i === active}
                    data-danger={it.danger ? "true" : "false"}
                    data-fired={fired === it.id}
                  >
                    <path className="hb-xf10-wedge" d={sector(c, c, r0, radius, a0, a1)} />
                    {it.icon ? (
                      <foreignObject x={(ix - 10).toFixed(2)} y={(iy - 10).toFixed(2)} width="20" height="20" style={{ pointerEvents: "none", color: it.danger ? "#ff8a8a" : "#ededed" }}>
                        {it.icon}
                      </foreignObject>
                    ) : (
                      <path className="hb-xf10-icon" d={glyph ?? "M8 12h8M12 8v8"} transform={`translate(${(ix - 9).toFixed(2)} ${(iy - 9).toFixed(2)}) scale(.75)`} />
                    )}
                  </g>
                );
              })}
              <circle className="hb-xf10-hub" cx={c} cy={c} r={r0 - 4} />
              <path
                className="hb-xf10-pointer"
                d={`M${c - 5} ${(c - r0 + 9).toFixed(2)} L${c} ${(c - r0 + 3).toFixed(2)} L${c + 5} ${(c - r0 + 9).toFixed(2)} Z`}
                style={{ transform: `rotate(${(mid + 90).toFixed(2)}deg)` }}
              />
            </g>
          </svg>
          {cur && (
            <span className="hb-xf10-hublabel" aria-hidden="true">
              <b style={cur.danger ? { color: "#ff8a8a" } : undefined}>{cur.label}</b>
              {cur.shortcut && <span>{cur.shortcut}</span>}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
