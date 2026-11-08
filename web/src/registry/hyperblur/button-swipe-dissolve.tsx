"use client";

import * as React from "react";

export interface ButtonSwipeDissolveProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  title?: string;
  subtitle?: string;
  meta?: string;
  initials?: string;
  avatarColor?: string;
  threshold?: number;
  accent?: string;
  resetAfter?: number;
  disabled?: boolean;
  onDelete?: () => void;
}

const css = `
@property --hb-xd11-m {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 112%;
}
.hb-xd11 {
  --hb-xd11-x: 0px;
  --hb-xd11-p: 0;
  display: grid;
  grid-template-rows: 1fr;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  font-size: 0.8125rem;
  color: #ededed;
  transition: grid-template-rows 0.38s cubic-bezier(0.6, 0, 0.2, 1), opacity 0.3s ease;
}
.hb-xd11 *, .hb-xd11 *::before, .hb-xd11 *::after { box-sizing: border-box; }
.hb-xd11[data-phase="gone"] { grid-template-rows: 0fr; opacity: 0; }
.hb-xd11-clip { position: relative; min-height: 0; overflow: hidden; border-radius: 12px; }
.hb-xd11-well {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding-right: 18px;
  font-weight: 600;
  color: #fff;
  border-radius: 12px;
  background:
    radial-gradient(80% 140% at 100% 50%, color-mix(in srgb, var(--hb-xd11-c) 85%, #fff 0%), transparent 75%),
    linear-gradient(90deg, color-mix(in srgb, var(--hb-xd11-c) 10%, #120808), color-mix(in srgb, var(--hb-xd11-c) 70%, #200a0b));
  opacity: calc(0.25 + var(--hb-xd11-p) * 0.75);
}
.hb-xd11[data-phase="dissolving"] .hb-xd11-well { opacity: 0; transition: opacity 0.5s ease 0.2s; }
.hb-xd11-hint {
  opacity: 0;
  transform: translateX(8px);
  transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.hb-xd11[data-past="true"] .hb-xd11-hint { opacity: 1; transform: none; }
.hb-xd11-bin {
  width: 20px;
  height: 20px;
  transform: scale(calc(0.7 + var(--hb-xd11-p) * 0.4));
  transition: transform 0.3s cubic-bezier(0.3, 1.8, 0.5, 1);
}
.hb-xd11[data-past="true"] .hb-xd11-bin { transform: scale(1.22) rotate(-8deg); }
.hb-xd11-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 10px 10px 11px;
  background: linear-gradient(180deg, #171717, #131313);
  border: 1px solid #242424;
  border-radius: 12px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
  transform: translateX(var(--hb-xd11-x));
  touch-action: pan-y;
  cursor: grab;
  outline: none;
  transition: transform 0.5s cubic-bezier(0.25, 1.35, 0.4, 1), border-color 0.2s ease;
  -webkit-mask-image: linear-gradient(90deg, #000 calc(var(--hb-xd11-m) - 12%), transparent var(--hb-xd11-m));
  mask-image: linear-gradient(90deg, #000 calc(var(--hb-xd11-m) - 12%), transparent var(--hb-xd11-m));
}
.hb-xd11[data-drag="true"] .hb-xd11-row { cursor: grabbing; transition: border-color 0.2s ease; }
.hb-xd11-row:focus-visible { border-color: color-mix(in srgb, var(--hb-xd11-c) 60%, #242424); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xd11-c) 22%, transparent); }
.hb-xd11[data-phase="dissolving"] .hb-xd11-row { animation: hb-xd11-wipe 0.62s cubic-bezier(0.5, 0, 0.6, 1) forwards; transition: none; }
.hb-xd11-av {
  display: grid;
  place-items: center;
  flex: none;
  width: 34px;
  height: 34px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  border-radius: 999px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--hb-xd11-av) 85%, #fff), color-mix(in srgb, var(--hb-xd11-av) 75%, #000));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
}
.hb-xd11-txt { display: flex; flex: 1; flex-direction: column; gap: 2px; min-width: 0; }
.hb-xd11-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.hb-xd11-top b { overflow: hidden; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.hb-xd11-top time { flex: none; font-size: 0.7rem; color: #737373; font-variant-numeric: tabular-nums; }
.hb-xd11-sub { overflow: hidden; color: #8f8f8f; text-overflow: ellipsis; white-space: nowrap; }
.hb-xd11-del {
  display: grid;
  place-items: center;
  flex: none;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  color: #8f8f8f;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease, color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}
.hb-xd11-row:hover .hb-xd11-del, .hb-xd11-row:focus-within .hb-xd11-del { opacity: 1; }
.hb-xd11-del:hover { color: #fff; background: color-mix(in srgb, var(--hb-xd11-c) 22%, transparent); border-color: color-mix(in srgb, var(--hb-xd11-c) 40%, transparent); }
.hb-xd11-del:focus-visible { opacity: 1; outline: 2px solid var(--hb-xd11-c); outline-offset: 1px; }
.hb-xd11-dust {
  position: absolute;
  inset: 0;
  transform: translateX(var(--hb-xd11-x));
  pointer-events: none;
}
.hb-xd11-dust i {
  position: absolute;
  width: var(--hb-xd11-s);
  height: var(--hb-xd11-s);
  border-radius: 1px;
  font-style: normal;
  background: var(--hb-xd11-k);
  opacity: 0;
  animation: hb-xd11-fly 0.75s cubic-bezier(0.2, 0.6, 0.35, 1) var(--hb-xd11-d) forwards;
}
.hb-xd11-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes hb-xd11-wipe {
  from { --hb-xd11-m: 112%; }
  to { --hb-xd11-m: 0%; }
}
@keyframes hb-xd11-fly {
  0% { opacity: 0; transform: translate(0, 0) scale(1); }
  12% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--hb-xd11-dx), var(--hb-xd11-dy)) scale(0.2) rotate(var(--hb-xd11-r)); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xd11, .hb-xd11-row, .hb-xd11-bin, .hb-xd11-hint { transition: none; }
  .hb-xd11[data-phase="dissolving"] .hb-xd11-row { animation: none; opacity: 0; }
  .hb-xd11-dust i { animation: none; }
}
`;

function hash(n: number) {
  let h = Math.imul(n + 0x9e37, 2654435761);
  h = Math.imul(h ^ (h >>> 16), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return (h ^ (h >>> 16)) >>> 0;
}

export function ButtonSwipeDissolve({
  title = "Priya Raman",
  subtitle = "Re: Q3 vendor contracts, final redlines attached",
  meta = "9:41",
  initials = "PR",
  avatarColor = "#7c5cff",
  threshold = 0.42,
  accent = "#ef4444",
  resetAfter = 2400,
  disabled = false,
  onDelete,
  className = "",
  style,
  ...rest
}: ButtonSwipeDissolveProps) {
  const clipRef = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef<{ id: number; start: number; startY: number; live: boolean } | null>(null);
  const latest = React.useRef(onDelete);
  const [x, setX] = React.useState(0);
  const [width, setWidth] = React.useState(300);
  const [dragging, setDragging] = React.useState(false);
  const [phase, setPhase] = React.useState<"idle" | "dissolving" | "gone">("idle");

  React.useEffect(() => {
    latest.current = onDelete;
  }, [onDelete]);

  React.useEffect(() => {
    const el = clipRef.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(120, el.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    if (phase === "dissolving") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const t = window.setTimeout(() => setPhase("gone"), reduce ? 0 : 900);
      return () => window.clearTimeout(t);
    }
    if (phase === "gone") {
      const t1 = window.setTimeout(() => latest.current?.(), 380);
      const t2 = resetAfter > 0 ? window.setTimeout(() => {
        setX(0);
        setPhase("idle");
      }, resetAfter) : 0;
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }
  }, [phase, resetAfter]);

  const p = Math.min(1, -x / width);
  const past = p >= threshold;
  const locked = disabled || phase !== "idle";

  const dissolve = () => {
    if (locked) return;
    setPhase("dissolving");
  };

  const dust = React.useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => {
        const h = hash(i);
        const left = (h % 1000) / 10;
        const top = ((h >>> 10) % 1000) / 10;
        const tone = (h >>> 20) % 5;
        return {
          left: `${left.toFixed(1)}%`,
          top: `${top.toFixed(1)}%`,
          s: `${(2 + ((h >>> 3) % 3)).toFixed(0)}px`,
          d: `${((100 - left) * 5.2).toFixed(0)}ms`,
          dx: `${(14 + ((h >>> 6) % 46)).toFixed(0)}px`,
          dy: `${(-6 - ((h >>> 14) % 26)).toFixed(0)}px`,
          r: `${((h >>> 8) % 180).toFixed(0)}deg`,
          k: tone === 0 ? "var(--hb-xd11-c)" : tone === 1 ? "#8f8f8f" : tone === 2 ? "var(--hb-xd11-av)" : "#d4d4d4",
        };
      }),
    [],
  );

  return (
    <div
      className={`hb-xd11 ${className}`.trim()}
      data-phase={phase}
      data-drag={dragging}
      data-past={past && phase === "idle"}
      style={{ "--hb-xd11-c": accent, "--hb-xd11-av": avatarColor, "--hb-xd11-x": `${x.toFixed(1)}px`, "--hb-xd11-p": p.toFixed(3), ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-button-swipe-dissolve" precedence="default">{css}</style>
      <div ref={clipRef} className="hb-xd11-clip">
        <div className="hb-xd11-well" aria-hidden="true">
          <span className="hb-xd11-hint">Release to delete</span>
          <svg className="hb-xd11-bin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13M10 11v5M14 11v5" />
          </svg>
        </div>
        <div
          className="hb-xd11-row"
          tabIndex={phase === "idle" ? 0 : -1}
          role="group"
          aria-roledescription="swipeable row"
          aria-label={`${title}. ${subtitle}. Swipe left or press Delete to remove.`}
          aria-keyshortcuts="Delete Backspace"
          onPointerDown={(e) => {
            if (locked || e.button !== 0) return;
            if ((e.target as HTMLElement).closest("button")) return;
            drag.current = { id: e.pointerId, start: e.clientX, startY: e.clientY, live: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d || d.id !== e.pointerId) return;
            const dx = e.clientX - d.start;
            if (!d.live) {
              if (Math.abs(dx) < 6) return;
              if (Math.abs(e.clientY - d.startY) > Math.abs(dx)) {
                drag.current = null;
                return;
              }
              d.live = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragging(true);
            }
            const limit = width * 0.7;
            const raw = Math.min(0, dx);
            const next = raw < -limit ? -limit + (raw + limit) * 0.25 : raw > 0 ? raw * 0.2 : raw;
            setX(next);
          }}
          onPointerUp={(e) => {
            const d = drag.current;
            drag.current = null;
            if (!d || d.id !== e.pointerId || !d.live) return;
            setDragging(false);
            if (-x / width >= threshold) dissolve();
            else setX(0);
          }}
          onPointerCancel={() => {
            drag.current = null;
            setDragging(false);
            setX(0);
          }}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.key === "Delete" || e.key === "Backspace") {
              e.preventDefault();
              dissolve();
            }
          }}
        >
          <span className="hb-xd11-av" aria-hidden="true">{initials}</span>
          <span className="hb-xd11-txt">
            <span className="hb-xd11-top">
              <b>{title}</b>
              <time>{meta}</time>
            </span>
            <span className="hb-xd11-sub">{subtitle}</span>
          </span>
          <button type="button" className="hb-xd11-del" aria-label={`Delete ${title}`} tabIndex={phase === "idle" ? 0 : -1} onClick={dissolve}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13" />
            </svg>
          </button>
        </div>
        {phase === "dissolving" && (
          <div className="hb-xd11-dust" aria-hidden="true">
            {dust.map((q, i) => (
              <i
                key={i}
                style={{ left: q.left, top: q.top, "--hb-xd11-s": q.s, "--hb-xd11-d": q.d, "--hb-xd11-dx": q.dx, "--hb-xd11-dy": q.dy, "--hb-xd11-r": q.r, "--hb-xd11-k": q.k } as React.CSSProperties}
              />
            ))}
          </div>
        )}
      </div>
      <span className="hb-xd11-sr" role="status" aria-live="polite">{phase !== "idle" ? `${title} deleted` : ""}</span>
    </div>
  );
}
