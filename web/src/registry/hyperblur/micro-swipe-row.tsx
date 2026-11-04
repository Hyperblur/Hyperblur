"use client";

import * as React from "react";

export type MicroSwipeRowReveal = "none" | "archive" | "delete";

export interface MicroSwipeRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  title?: string;
  subtitle?: string;
  time?: string;
  reveal?: MicroSwipeRowReveal;
  defaultReveal?: MicroSwipeRowReveal;
  archiveLabel?: string;
  deleteLabel?: string;
  accent?: string;
  danger?: string;
  idle?: boolean;
  onRevealChange?: (reveal: MicroSwipeRowReveal) => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

const ACT = 84;

const css = `
.hb-ql4 {
  display: grid;
  grid-template-rows: 1fr;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --hb-ql4-c: #2f7bff;
  --hb-ql4-r: #ff4d5e;
}
.hb-ql4 *, .hb-ql4 *::before, .hb-ql4 *::after { box-sizing: border-box; }
.hb-ql4[data-gone="true"] { grid-template-rows: 0fr; }
.hb-ql4-w {
  position: relative;
  min-height: 0;
  overflow: hidden;
  border: 1px solid #262626;
  border-radius: 16px;
  background: #0d0d0d;
  transition: border-width 0.3s ease, opacity 0.3s ease;
}
.hb-ql4[data-gone="true"] .hb-ql4-w { border-width: 0; opacity: 0; }
.hb-ql4-p {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: stretch;
  opacity: 0;
}
.hb-ql4-p[data-side="l"] { background: var(--hb-ql4-c); justify-content: flex-start; }
.hb-ql4-p[data-side="r"] { background: var(--hb-ql4-r); justify-content: flex-end; }
.hb-ql4-a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: ${ACT}px;
  margin: 0;
  padding: 0;
  font: inherit;
  font-size: 0.74em;
  font-weight: 600;
  color: #fff;
  background: transparent;
  border: 0;
  cursor: pointer;
}
.hb-ql4-a svg { width: 20px; height: 20px; }
.hb-ql4-a:focus-visible { outline: 2px solid #fff; outline-offset: -4px; border-radius: 12px; }
.hb-ql4-c {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  color: #ededed;
  background: #131313;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  will-change: transform;
}
.hb-ql4-c:active { cursor: grabbing; }
.hb-ql4-c:focus-visible { outline: 2px solid var(--hb-ql4-c); outline-offset: -2px; border-radius: 16px; }
.hb-ql4-v {
  display: grid;
  flex: none;
  place-items: center;
  width: 38px;
  height: 38px;
  font-size: 0.82em;
  font-weight: 600;
  color: #fff;
  border-radius: 50%;
}
.hb-ql4-x { min-width: 0; flex: 1; line-height: 1.3; }
.hb-ql4-t {
  margin: 0;
  overflow: hidden;
  font-size: 0.92em;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-ql4-s {
  margin: 2px 0 0;
  overflow: hidden;
  font-size: 0.8em;
  color: #8f8f8f;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-ql4-m {
  flex: none;
  align-self: flex-start;
  font-size: 0.72em;
  color: #6f6f6f;
  font-variant-numeric: tabular-nums;
}
.hb-ql4-h {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-ql4, .hb-ql4-w { transition: none; }
}
`;

function tint(name: string) {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) h = Math.imul(h ^ name.charCodeAt(i), 16777619) >>> 0;
  return `hsl(${h % 360} 46% 38%)`;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function pull(a: number) {
  return a <= ACT ? a : ACT + 36 * (1 - Math.exp(-(a - ACT) / 36));
}

export function MicroSwipeRow({
  title = "Maya Okonkwo",
  subtitle = "Re: Lighting specs for the studio build",
  time = "9:41",
  reveal,
  defaultReveal = "none",
  archiveLabel = "Archive",
  deleteLabel = "Delete",
  accent = "#2f7bff",
  danger = "#ff4d5e",
  idle = true,
  onRevealChange,
  onArchive,
  onDelete,
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: MicroSwipeRowProps) {
  const [inner, setInner] = React.useState<MicroSwipeRowReveal>(defaultReveal);
  const current = reveal ?? inner;
  const [gone, setGone] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const hintId = React.useId();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const leftRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);
  const state = React.useRef({
    x: 0,
    v: 0,
    drag: false,
    moved: false,
    startX: 0,
    baseX: 0,
    lastX: 0,
    lastT: 0,
    vel: 0,
    hover: false,
    focus: false,
    resumeAt: 0,
    idleStart: -1,
    cyc: -1,
    leave: 0,
    target: 0,
  });
  const api = React.useRef({ wake: () => {}, draw: () => {}, reduced: false });
  const latest = React.useRef({ idle, current, reveal, onRevealChange });

  React.useEffect(() => {
    latest.current = { idle, current, reveal, onRevealChange };
    state.current.target = current === "archive" ? ACT : current === "delete" ? -ACT : 0;
    api.current.wake();
  }, [idle, current, reveal, onRevealChange]);

  React.useEffect(() => {
    const el = contentRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!el || !left || !right) return;
    const s = state.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    api.current.reduced = mq.matches;
    let raf = 0;
    let last = 0;
    let visible = true;

    const draw = () => {
      el.style.transform = `translate3d(${s.x.toFixed(2)}px,0,0)`;
      left.style.opacity = s.x > 0.5 ? "1" : "0";
      right.style.opacity = s.x < -0.5 ? "1" : "0";
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const cfg = latest.current;
      const w = el.clientWidth || 1;
      const idleOn =
        cfg.idle &&
        !api.current.reduced &&
        cfg.current === "none" &&
        !s.hover &&
        !s.focus &&
        !s.drag &&
        !s.leave &&
        now >= s.resumeAt;
      if (idleOn) {
        if (s.idleStart < 0) s.idleStart = now;
        const cyc = Math.floor((now - s.idleStart - 900) / 3600);
        if (cyc >= 0 && cyc !== s.cyc) {
          s.cyc = cyc;
          s.v += cyc % 2 === 0 ? -620 : 620;
        }
      } else {
        s.idleStart = -1;
        s.cyc = -1;
      }
      if (!s.drag) {
        let rem = dt;
        while (rem > 0) {
          const h = Math.min(rem, 1 / 120);
          if (s.leave) {
            const t = s.leave * (w + 40);
            s.v += (150 * (t - s.x) - 24 * s.v) * h;
          } else {
            s.v += (300 * (s.target - s.x) - 24 * s.v) * h;
          }
          s.x += s.v * h;
          rem -= h;
        }
        if (s.leave && Math.abs(s.x) > w + 4) {
          draw();
          setGone(true);
          return;
        }
        if (!s.leave && Math.abs(s.x - s.target) < 0.01 && Math.abs(s.v) < 0.01) {
          s.x = s.target;
          s.v = 0;
        }
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (api.current.reduced) {
        if (!s.drag) s.x = s.leave ? s.leave * (w0() + 40) : s.target;
        draw();
        if (s.leave) setGone(true);
        return;
      }
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const w0 = () => el.clientWidth || 1;

    api.current.wake = wake;
    api.current.draw = draw;
    s.x = s.target;
    draw();
    wake();

    const io = new IntersectionObserver((entries) => {
      visible = (entries[entries.length - 1]?.isIntersecting ?? true) || !!s.leave;
      if (visible) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(el.parentElement ?? el);
    const onMq = () => {
      api.current.reduced = mq.matches;
      if (mq.matches) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      wake();
    };
    mq.addEventListener("change", onMq);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  React.useEffect(() => {
    if (!gone) return;
    const id = window.setTimeout(() => setHidden(true), 340);
    return () => window.clearTimeout(id);
  }, [gone]);

  function setReveal(next: MicroSwipeRowReveal) {
    if (latest.current.reveal === undefined) setInner(next);
    latest.current.onRevealChange?.(next);
    const s = state.current;
    s.target = next === "archive" ? ACT : next === "delete" ? -ACT : 0;
    api.current.wake();
  }

  function act(kind: "archive" | "delete") {
    const s = state.current;
    s.leave = kind === "archive" ? 1 : -1;
    s.drag = false;
    if (kind === "archive") onArchive?.();
    else onDelete?.();
    api.current.wake();
  }

  if (hidden) return <style href="hb-micro-swipe-row" precedence="default">{css}</style>;

  const vars = { "--hb-ql4-c": accent, "--hb-ql4-r": danger, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-micro-swipe-row" precedence="default">{css}</style>
      <div
        {...rest}
        className={`hb-ql4 ${className}`}
        style={vars}
        data-gone={gone}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          state.current.hover = true;
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          state.current.hover = false;
          state.current.resumeAt = performance.now() + 1500;
        }}
      >
        <div className="hb-ql4-w">
          <div ref={leftRef} className="hb-ql4-p" data-side="l" inert={current !== "archive"}>
            <button type="button" className="hb-ql4-a" onClick={() => act("archive")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="5" rx="1.5" />
                <path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" />
                <path d="M10 13h4" />
              </svg>
              {archiveLabel}
            </button>
          </div>
          <div ref={rightRef} className="hb-ql4-p" data-side="r" inert={current !== "delete"}>
            <button type="button" className="hb-ql4-a" onClick={() => act("delete")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 7h16" />
                <path d="M9 7V4.5h6V7" />
                <path d="M6 7l1 12.5a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5L18 7" />
                <path d="M10 11v6M14 11v6" />
              </svg>
              {deleteLabel}
            </button>
          </div>
          <div
            ref={contentRef}
            className="hb-ql4-c"
            role="group"
            tabIndex={0}
            aria-label={title}
            aria-describedby={hintId}
            onFocus={() => {
              state.current.focus = true;
            }}
            onBlur={() => {
              state.current.focus = false;
              state.current.resumeAt = performance.now() + 1500;
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                setReveal(current === "delete" ? "none" : "archive");
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                setReveal(current === "archive" ? "none" : "delete");
              } else if (e.key === "Escape" && current !== "none") {
                e.preventDefault();
                setReveal("none");
              }
            }}
            onPointerDown={(e) => {
              if (e.button !== 0 || state.current.leave) return;
              const s = state.current;
              e.currentTarget.setPointerCapture(e.pointerId);
              s.drag = true;
              s.moved = false;
              s.startX = e.clientX;
              s.baseX = s.x;
              s.lastX = e.clientX;
              s.lastT = e.timeStamp;
              s.vel = 0;
              s.v = 0;
              api.current.wake();
            }}
            onPointerMove={(e) => {
              const s = state.current;
              if (!s.drag) return;
              const dx = e.clientX - s.startX;
              if (Math.abs(dx) > 4) s.moved = true;
              const raw = s.baseX + dx;
              s.x = Math.sign(raw) * pull(Math.abs(raw));
              const dt = Math.max(1, e.timeStamp - s.lastT);
              s.vel = Math.max(-3, Math.min(3, s.vel * 0.6 + ((e.clientX - s.lastX) / dt) * 0.4));
              s.lastX = e.clientX;
              s.lastT = e.timeStamp;
              api.current.draw();
            }}
            onPointerUp={(e) => {
              const s = state.current;
              if (!s.drag) return;
              if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
              s.drag = false;
              s.resumeAt = performance.now() + 2200;
              if (!s.moved) {
                if (current !== "none") setReveal("none");
                return;
              }
              s.v = s.vel * 1000;
              const projected = s.x + s.vel * 180;
              const next: MicroSwipeRowReveal =
                projected > ACT * 0.5 ? "archive" : projected < -ACT * 0.5 ? "delete" : "none";
              setReveal(next);
            }}
            onPointerCancel={() => {
              const s = state.current;
              s.drag = false;
              api.current.wake();
            }}
          >
            <span className="hb-ql4-v" style={{ background: tint(title) }} aria-hidden="true">
              {initials(title)}
            </span>
            <div className="hb-ql4-x">
              <p className="hb-ql4-t">{title}</p>
              <p className="hb-ql4-s">{subtitle}</p>
            </div>
            <span className="hb-ql4-m">{time}</span>
          </div>
        </div>
        <span id={hintId} className="hb-ql4-h">
          Swipe or use the left and right arrow keys to reveal actions
        </span>
      </div>
    </>
  );
}
