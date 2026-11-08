"use client";

import * as React from "react";

export interface MicroReaction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface MicroReactionPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children" | "defaultValue"> {
  reactions?: MicroReaction[];
  value?: string | null;
  defaultValue?: string | null;
  count?: number;
  idle?: boolean;
  accent?: string;
  onChange?: (id: string | null) => void;
}

function Face({ mouth, brows, tear, from, to }: { mouth: React.ReactNode; brows?: React.ReactNode; tear?: boolean; from: string; to: string }) {
  const id = React.useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <radialGradient id={`g${id}`} cx="40%" cy="30%" r="75%">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill={`url(#g${id})`} />
      {brows}
      {mouth}
      {tear ? <path d="M22.5 17.5c1.6 2.4 1.9 3.6 1.2 4.6a1.6 1.6 0 0 1-2.6 0c-.6-1 .1-2.3 1.4-4.6z" fill="#7cc4ff" /> : null}
    </svg>
  );
}

export const defaultReactions: MicroReaction[] = [
  {
    id: "like",
    label: "Like",
    color: "#2f7bff",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="#2f7bff" />
        <path d="M10 15h3v8h-3zM14.5 15.2l3.2-5.4c.9-1.4 2.8-.6 2.5 1l-.6 3.2h3.6c1.2 0 2 1.1 1.7 2.2l-1.4 5.2c-.3 1-1.1 1.6-2.1 1.6h-6.9z" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "love",
    label: "Love",
    color: "#ff4d6d",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="#ff4d6d" />
        <path d="M16 23.2s-6.6-3.9-6.6-8.4c0-2.2 1.6-3.8 3.6-3.8 1.3 0 2.4.7 3 1.8.6-1.1 1.7-1.8 3-1.8 2 0 3.6 1.6 3.6 3.8 0 4.5-6.6 8.4-6.6 8.4z" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "haha",
    label: "Haha",
    color: "#ffb020",
    icon: (
      <Face
        from="#ffe27a"
        to="#ffb020"
        brows={<path d="M9.5 12.5l3 1.5-3 1.5M22.5 12.5l-3 1.5 3 1.5" fill="none" stroke="#5a3a00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
        mouth={<path d="M9.5 18.5h13a6.5 6.5 0 0 1-13 0z" fill="#5a3a00" />}
      />
    ),
  },
  {
    id: "wow",
    label: "Wow",
    color: "#ffb020",
    icon: (
      <Face
        from="#ffe27a"
        to="#ffb020"
        brows={
          <>
            <circle cx="11.5" cy="13.5" r="1.7" fill="#5a3a00" />
            <circle cx="20.5" cy="13.5" r="1.7" fill="#5a3a00" />
            <path d="M9 9.8l3-1M23 9.8l-3-1" stroke="#5a3a00" strokeWidth="1.4" strokeLinecap="round" />
          </>
        }
        mouth={<ellipse cx="16" cy="21" rx="3" ry="3.8" fill="#5a3a00" />}
      />
    ),
  },
  {
    id: "sad",
    label: "Sad",
    color: "#ffb020",
    icon: (
      <Face
        from="#ffe27a"
        to="#f2a01a"
        tear
        brows={
          <>
            <circle cx="11.5" cy="14.5" r="1.6" fill="#5a3a00" />
            <circle cx="20.5" cy="14.5" r="1.6" fill="#5a3a00" />
            <path d="M9 11.5l3.4-1.4M23 11.5l-3.4-1.4" stroke="#5a3a00" strokeWidth="1.4" strokeLinecap="round" />
          </>
        }
        mouth={<path d="M12 22.5c2.4-2.2 5.6-2.2 8 0" fill="none" stroke="#5a3a00" strokeWidth="1.8" strokeLinecap="round" />}
      />
    ),
  },
  {
    id: "fire",
    label: "Fire",
    color: "#ff6a2b",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="#2a1408" />
        <path d="M16 5.5c1 3.6 6.5 6.4 6.5 12a6.5 6.5 0 0 1-13 0c0-2.8 1.6-4.4 2.8-5.6.2 1.8.9 2.9 1.9 3.4-.2-3.6.6-6.6 1.8-9.8z" fill="#ff6a2b" />
        <path d="M16 14.5c.6 2 3.2 3.2 3.2 5.8a3.2 3.2 0 0 1-6.4 0c0-1.6 1-2.6 1.7-3.2.2 1 .6 1.4 1 1.6-.1-1.6.1-2.9.5-4.2z" fill="#ffd24a" />
      </svg>
    ),
  },
];

const css = `
.hb-wf5 {
  --hb-wf5-c: #2f7bff;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
}
.hb-wf5 *, .hb-wf5 *::before, .hb-wf5 *::after { box-sizing: border-box; }
.hb-wf5-tr {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 13px 0 9px;
  margin: 0;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  background: linear-gradient(180deg, #1c1c1c, #151515);
  color: #bdbdbd;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.25s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.hb-wf5-tr:hover { border-color: #3a3a3a; color: #fff; }
.hb-wf5-tr:active { transform: scale(0.95); }
.hb-wf5-tr:focus-visible { outline: 2px solid var(--hb-wf5-c); outline-offset: 3px; }
.hb-wf5-tr[data-set="true"] { color: var(--hb-wf5-rc); border-color: color-mix(in srgb, var(--hb-wf5-rc) 40%, #2a2a2a); background: color-mix(in srgb, var(--hb-wf5-rc) 10%, #151515); }
.hb-wf5-ti { display: grid; place-items: center; width: 20px; height: 20px; }
.hb-wf5-ti svg { width: 100%; height: 100%; display: block; }
.hb-wf5-ti[data-pop="true"] { animation: hb-wf5-pop 0.55s cubic-bezier(0.2, 1.8, 0.4, 1); }
@keyframes hb-wf5-pop { 0% { transform: scale(0.2) rotate(-25deg); } 60% { transform: scale(1.35) rotate(8deg); } 100% { transform: none; } }
.hb-wf5-ct { font-family: var(--font-mono), ui-monospace, monospace; font-size: 11.5px; color: #8a8a8a; font-variant-numeric: tabular-nums; }
.hb-wf5-tray {
  position: absolute;
  left: -4px;
  bottom: calc(100% + 10px);
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 48px;
  padding: 6px;
  border-radius: 999px;
  background: linear-gradient(180deg, #1f1f1f, #161616);
  border: 1px solid #2c2c2c;
  box-shadow: 0 16px 34px -10px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06);
  transform-origin: 24px 100%;
  transform: translateY(8px) scale(0.6);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.32s cubic-bezier(0.3, 1.5, 0.5, 1), opacity 0.18s ease;
  z-index: 5;
}
.hb-wf5[data-open="true"] .hb-wf5-tray { transform: none; opacity: 1; pointer-events: auto; }
.hb-wf5-it {
  position: relative;
  flex: none;
  width: 36px;
  height: 36px;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  cursor: pointer;
  transform-origin: 50% 100%;
  transition: transform 0.18s cubic-bezier(0.3, 1.4, 0.5, 1);
  opacity: 0;
}
.hb-wf5[data-open="true"] .hb-wf5-it { animation: hb-wf5-in 0.42s cubic-bezier(0.2, 1.6, 0.4, 1) both; animation-delay: calc(var(--hb-wf5-i) * 35ms); }
@keyframes hb-wf5-in { from { opacity: 0; translate: 0 14px; } to { opacity: 1; translate: 0 0; } }
.hb-wf5-it svg { width: 100%; height: 100%; display: block; filter: drop-shadow(0 3px 4px rgba(0,0,0,0.45)); }
.hb-wf5-it:focus-visible { outline: 2px solid var(--hb-wf5-c); outline-offset: 2px; border-radius: 50%; }
.hb-wf5-lb {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  padding: 3px 7px;
  border-radius: 6px;
  background: rgba(10,10,10,0.92);
  border: 1px solid #2c2c2c;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  transform: translateX(-50%) scale(0.8);
  opacity: 0;
  transition: opacity 0.12s ease, transform 0.18s ease;
  pointer-events: none;
}
.hb-wf5-it[data-hot="true"] .hb-wf5-lb { opacity: 1; transform: translateX(-50%) scale(1); }
@media (prefers-reduced-motion: reduce) {
  .hb-wf5-tray, .hb-wf5-it, .hb-wf5-tr, .hb-wf5-lb { transition: none; }
  .hb-wf5[data-open="true"] .hb-wf5-it { animation: none; opacity: 1; }
  .hb-wf5-ti[data-pop="true"] { animation: none; }
}
`;

const slot = 40;

export function MicroReactionPicker({
  reactions = defaultReactions,
  value,
  defaultValue = null,
  count = 0,
  idle = false,
  accent = "#2f7bff",
  onChange,
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: MicroReactionPickerProps) {
  const [inner, setInner] = React.useState<string | null>(defaultValue);
  const cur = value === undefined ? inner : value;
  const [open, setOpen] = React.useState(false);
  const [px, setPx] = React.useState<number | null>(null);
  const [focusIdx, setFocusIdx] = React.useState(-1);
  const [pop, setPop] = React.useState(0);
  const [awake, setAwake] = React.useState(false);
  const trayRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const timers = React.useRef({ open: 0, close: 0, hold: false, held: false });

  const active = reactions.find((r) => r.id === cur) ?? null;

  const pick = (id: string | null) => {
    if (value === undefined) setInner(id);
    onChange?.(id);
    setOpen(false);
    setPx(null);
    setFocusIdx(-1);
    if (id) setPop((n) => n + 1);
  };

  React.useEffect(() => {
    if (!idle || awake) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const id = window.setInterval(() => {
      t += 1;
      const phase = t % 90;
      if (phase === 10) setOpen(true);
      if (phase > 18 && phase < 62) {
        const k = (phase - 18) / 44;
        setPx(6 + 18 + (reactions.length - 1) * slot * (0.5 - 0.5 * Math.cos(k * Math.PI)));
      }
      if (phase === 66) {
        setPx(null);
        setOpen(false);
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [idle, awake, reactions.length]);

  const wake = () => {
    if (!awake) {
      setAwake(true);
      setOpen(false);
      setPx(null);
    }
  };

  const hotIndex = (x: number | null) => {
    if (x === null) return -1;
    const i = Math.floor((x - 6) / slot);
    return i >= 0 && i < reactions.length ? i : -1;
  };

  const relX = (clientX: number) => {
    const el = trayRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return clientX - r.left;
  };

  const hot = focusIdx >= 0 ? focusIdx : hotIndex(px);

  return (
    <div
      className={`hb-wf5 ${className}`}
      data-open={open}
      style={{ ...style, ["--hb-wf5-c" as string]: accent, ["--hb-wf5-rc" as string]: active?.color ?? accent }}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        wake();
        if (e.pointerType !== "mouse") return;
        window.clearTimeout(timers.current.close);
        timers.current.open = window.setTimeout(() => setOpen(true), 380);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        window.clearTimeout(timers.current.open);
        if (timers.current.hold) return;
        timers.current.close = window.setTimeout(() => {
          setOpen(false);
          setPx(null);
        }, 260);
      }}
      onKeyDown={(e) => {
        if (!open) return;
        if (e.key === "Escape") {
          e.preventDefault();
          setOpen(false);
          setFocusIdx(-1);
        }
      }}
      {...rest}
    >
      <style href="hb-micro-reaction-picker" precedence="default">
        {css}
      </style>
      <div ref={trayRef} className="hb-wf5-tray" role="menu" aria-label="Reactions" onPointerMove={(e) => setPx(relX(e.clientX))} onPointerLeave={() => setPx(null)}>
        {reactions.map((r, i) => {
          const center = 6 + i * slot + 18;
          const d = px === null ? 999 : Math.abs(px - center);
          const s = focusIdx >= 0 ? (i === focusIdx ? 1.45 : 1) : 1 + 0.55 * Math.max(0, 1 - d / 62);
          return (
            <button
              key={r.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={cur === r.id}
              aria-label={r.label}
              tabIndex={open ? 0 : -1}
              className="hb-wf5-it"
              data-hot={hot === i}
              style={{ ["--hb-wf5-i" as string]: i, transform: `translateY(${(-(s - 1) * 14).toFixed(2)}px) scale(${s.toFixed(3)})` }}
              onClick={() => pick(cur === r.id ? null : r.id)}
              onFocus={() => setFocusIdx(i)}
              onBlur={() => setFocusIdx(-1)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const n = (i + (e.key === "ArrowRight" ? 1 : -1) + reactions.length) % reactions.length;
                  itemRefs.current[n]?.focus();
                }
              }}
            >
              {r.icon}
              <span className="hb-wf5-lb">{r.label}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="hb-wf5-tr"
        data-set={!!active}
        aria-haspopup="menu"
        aria-expanded={open}
        onPointerDown={(e) => {
          wake();
          if (e.pointerType === "mouse") return;
          e.currentTarget.setPointerCapture(e.pointerId);
          timers.current.hold = true;
          timers.current.held = false;
          timers.current.open = window.setTimeout(() => {
            timers.current.held = true;
            setOpen(true);
          }, 320);
        }}
        onPointerMove={(e) => {
          if (timers.current.hold && timers.current.held) setPx(relX(e.clientX));
        }}
        onPointerUp={(e) => {
          if (!timers.current.hold) return;
          timers.current.hold = false;
          window.clearTimeout(timers.current.open);
          if (timers.current.held) {
            e.preventDefault();
            const i = hotIndex(px);
            if (i >= 0) pick(reactions[i].id);
            else {
              setOpen(false);
              setPx(null);
            }
          }
        }}
        onClick={(e) => {
          if (timers.current.held) {
            timers.current.held = false;
            e.preventDefault();
            return;
          }
          pick(cur ? null : reactions[0].id);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            wake();
            setOpen(true);
            window.setTimeout(() => itemRefs.current[0]?.focus(), 30);
          }
        }}
      >
        <span key={pop} className="hb-wf5-ti" data-pop={pop > 0}>
          {active ? (
            active.icon
          ) : (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="10" cy="10" r="7.5" />
              <path d="M7 12c1.6 1.7 4.4 1.7 6 0" />
              <circle cx="7.5" cy="8.2" r="0.6" fill="currentColor" />
              <circle cx="12.5" cy="8.2" r="0.6" fill="currentColor" />
            </svg>
          )}
        </span>
        {active ? active.label : "React"}
        {count > 0 ? <span className="hb-wf5-ct">{count + (active ? 1 : 0)}</span> : null}
      </button>
    </div>
  );
}
