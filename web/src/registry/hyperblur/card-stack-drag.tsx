"use client";

import * as React from "react";

export interface StackCard {
  title: string;
  meta?: string;
  text?: string;
  color?: string;
}

export interface CardStackDragProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  cards?: StackCard[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  ratio?: number;
  idle?: boolean;
}

const css = `
.hb-qka {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: var(--hb-qka-r);
  font-family: inherit;
  box-sizing: border-box;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-qka *, .hb-qka *::before, .hb-qka *::after { box-sizing: border-box; }
.hb-qka:focus-visible { outline: 2px solid #2f7bff; outline-offset: 4px; border-radius: 16px; }
.hb-qka-c {
  position: absolute;
  left: 17%;
  right: 17%;
  top: 0;
  bottom: 34px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px 15px 14px;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    radial-gradient(120% 70% at 15% 0%, color-mix(in srgb, var(--hb-qka-c) 65%, #ffffff) 0%, transparent 62%),
    linear-gradient(165deg, var(--hb-qka-c), color-mix(in srgb, var(--hb-qka-c) 26%, #050508));
  color: #ffffff;
  box-shadow: 0 16px 28px -14px rgba(0, 0, 0, 0.9);
  z-index: var(--hb-qka-z);
  transform-origin: 50% 92%;
  transform: translateY(calc(var(--hb-qka-d) * 9px)) scale(calc(1 - var(--hb-qka-d) * 0.055)) rotate(var(--hb-qka-r0));
  filter: brightness(calc(1 - var(--hb-qka-d) * 0.14));
  opacity: 1;
  cursor: default;
  user-select: none;
  touch-action: pan-y;
  transition: transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 1), filter 0.4s ease, opacity 0.3s ease;
}
.hb-qka-c[data-top="true"] { cursor: grab; }
.hb-qka-c[data-drag="true"] { cursor: grabbing; }
.hb-qka-c[data-hide="true"] { opacity: 0; pointer-events: none; }
.hb-qka-c[data-fly="true"] { z-index: 99; transition: none; filter: none; pointer-events: none; }
.hb-qka-c[data-enter="true"] { animation: hb-qka-in 0.55s cubic-bezier(0.22, 1.2, 0.4, 1) backwards; }
@keyframes hb-qka-in {
  from { transform: translateX(-120%) rotate(-14deg); opacity: 0; }
  60% { opacity: 1; }
}
.hb-qka-meta {
  align-self: flex-start;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(8, 8, 12, 0.4);
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #f4f4f4;
}
.hb-qka-title {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: #ffffff;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
}
.hb-qka-text {
  margin: 6px 0 0;
  font-size: 12px;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.82);
}
.hb-qka-dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  z-index: 120;
  display: flex;
  justify-content: center;
  gap: 6px;
  pointer-events: none;
}
.hb-qka-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #3a3a3a;
  transition: width 0.3s ease, background-color 0.3s ease;
}
.hb-qka-dot[data-on="true"] { width: 18px; background: #ededed; }
.hb-qka-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qka-c { transition: none; }
  .hb-qka-c[data-enter="true"] { animation: none; }
}
`;

const defaultCards: StackCard[] = [
  { title: "Slow mornings", meta: "Prompt 01", text: "Write down one thing you noticed before checking your phone.", color: "#e0553f" },
  { title: "The long way", meta: "Prompt 02", text: "Take a different route home and describe the first detail that surprised you.", color: "#2f7bff" },
  { title: "Unsent letter", meta: "Prompt 03", text: "Draft a thank-you note to someone who will never read it.", color: "#2fa67c" },
  { title: "Small repairs", meta: "Prompt 04", text: "Fix one tiny thing today that has annoyed you for months.", color: "#b8841c" },
  { title: "Night inventory", meta: "Prompt 05", text: "List five sounds you can hear right now, from nearest to farthest.", color: "#8a62d6" },
];

function hash(n: number) {
  let h = Math.imul(n + 1, 2654435761) >>> 0;
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519) >>> 0;
  h ^= h >>> 13;
  return (h >>> 0) / 4294967296;
}

export function CardStackDrag({
  cards = defaultCards,
  value,
  defaultValue = 0,
  onChange,
  ratio = 1.7,
  idle = true,
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onKeyDown,
  onFocus,
  onBlur,
  ...rest
}: CardStackDragProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const nodes = React.useRef<(HTMLDivElement | null)[]>([]);
  const n = cards.length;
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const index = n ? ((controlled ? value : inner) % n + n) % n : 0;
  const [flying, setFlying] = React.useState(-1);
  const [entering, setEntering] = React.useState(-1);
  const user = React.useRef(false);
  const visible = React.useRef(true);
  const busy = React.useRef(false);
  const drag = React.useRef({ id: -1, sx: 0, sy: 0, lx: 0, lt: 0, vx: 0, moved: false });
  const indexRef = React.useRef(index);

  React.useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const commit = React.useCallback(
    (next: number) => {
      indexRef.current = next;
      if (!controlled) setInner(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );

  const fling = React.useCallback(
    (card: number, dir: number, vx0: number, dx0: number, dy0: number) => {
      const el = nodes.current[card];
      const host = root.current;
      if (!el || !host || busy.current) return;
      busy.current = true;
      el.style.transition = "none";
      setFlying(card);
      commit((indexRef.current + 1) % n);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const limit = host.clientWidth * 0.8 + el.offsetWidth * 0.6;
      let x = dx0;
      let y = dy0;
      let vx = dir * Math.max(Math.abs(vx0), 900);
      const spin = dir * 40;
      let last = 0;
      const finish = () => {
        el.style.transition = "none";
        el.style.transform = "";
        el.style.opacity = "0";
        setFlying(-1);
        busy.current = false;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            el.style.transition = "";
            el.style.opacity = "";
          }),
        );
      };
      if (reduce) {
        finish();
        return;
      }
      const frame = (ms: number) => {
        const dt = Math.min(0.04, last ? (ms - last) / 1000 : 0.016);
        last = ms;
        vx += dir * 1400 * dt;
        x += vx * dt;
        y += dt * 60;
        const rot = x * 0.06 + spin * Math.min(1, Math.abs(x) / limit);
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rot.toFixed(2)}deg)`;
        el.style.opacity = String(Math.max(0, 1 - Math.max(0, Math.abs(x) - limit * 0.55) / (limit * 0.45)));
        if (Math.abs(x) >= limit) {
          finish();
          return;
        }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    },
    [commit, n],
  );

  const next = React.useCallback(() => {
    if (n < 2) return;
    fling(indexRef.current, 1, 1100, 0, 0);
  }, [fling, n]);

  const prev = React.useCallback(() => {
    if (n < 2 || busy.current) return;
    const target = (indexRef.current - 1 + n) % n;
    setEntering(target);
    commit(target);
  }, [commit, n]);

  React.useEffect(() => {
    const el = root.current;
    if (!el || !idle || controlled || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    io.observe(el);
    const timer = window.setInterval(() => {
      if (user.current || !visible.current || busy.current) return;
      next();
    }, 2800);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [idle, controlled, n, next]);

  const down = (e: React.PointerEvent<HTMLDivElement>, card: number) => {
    if (e.button !== 0 || card !== indexRef.current || busy.current) return;
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    el.style.transition = "none";
    el.dataset.drag = "true";
    drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, lx: e.clientX, lt: e.timeStamp, vx: 0, moved: false };
  };

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (Math.hypot(dx, dy) > 3) d.moved = true;
    const dt = Math.max(1, e.timeStamp - d.lt);
    d.vx = d.vx * 0.5 + (((e.clientX - d.lx) / dt) * 1000) * 0.5;
    d.lx = e.clientX;
    d.lt = e.timeStamp;
    e.currentTarget.style.transform = `translate(${dx.toFixed(1)}px, ${(dy * 0.6).toFixed(1)}px) rotate(${(dx * 0.06).toFixed(2)}deg)`;
  };

  const up = (e: React.PointerEvent<HTMLDivElement>, card: number) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    d.id = -1;
    const el = e.currentTarget;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    delete el.dataset.drag;
    const dx = e.clientX - d.sx;
    const dy = (e.clientY - d.sy) * 0.6;
    const width = el.offsetWidth;
    if (d.moved && (Math.abs(dx) > width * 0.28 || Math.abs(d.vx) > 650)) {
      const dir = Math.abs(d.vx) > 650 ? Math.sign(d.vx) : Math.sign(dx) || 1;
      fling(card, dir, d.vx, dx, dy);
    } else {
      el.style.transition = "";
      el.style.transform = "";
    }
  };

  const nav = (dir: number) => {
    user.current = true;
    if (dir > 0) next();
    else prev();
  };

  return (
    <div
      ref={root}
      role="group"
      aria-roledescription="card stack"
      aria-label="Card stack. Use the arrow keys to move between cards."
      tabIndex={0}
      className={`hb-qka ${className}`}
      style={{ "--hb-qka-r": ratio, ...style } as React.CSSProperties}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        user.current = true;
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        user.current = false;
      }}
      onFocus={(e) => {
        onFocus?.(e);
        user.current = true;
      }}
      onBlur={(e) => {
        onBlur?.(e);
        user.current = false;
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          nav(1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          nav(-1);
        }
      }}
      {...rest}
    >
      <style href="hb-card-stack-drag" precedence="default">{css}</style>
      {cards.map((card, i) => {
        const depth = (i - index + n) % n;
        const top = depth === 0;
        return (
          <div
            key={`${card.title}-${i}`}
            ref={(node) => {
              nodes.current[i] = node;
            }}
            className="hb-qka-c"
            data-top={top ? "true" : "false"}
            data-hide={depth > 3 && i !== flying ? "true" : "false"}
            data-fly={i === flying ? "true" : "false"}
            data-enter={i === entering ? "true" : "false"}
            aria-hidden={top ? undefined : true}
            style={
              {
                "--hb-qka-c": card.color ?? "#2f7bff",
                "--hb-qka-z": n - depth,
                "--hb-qka-d": Math.min(depth, 3),
                "--hb-qka-r0": `${top ? 0 : ((hash(i) - 0.5) * 7).toFixed(2)}deg`,
              } as React.CSSProperties
            }
            onPointerDown={(e) => down(e, i)}
            onPointerMove={move}
            onPointerUp={(e) => up(e, i)}
            onPointerCancel={(e) => up(e, i)}
            onAnimationEnd={() => {
              if (i === entering) setEntering(-1);
            }}
          >
            {card.meta ? <span className="hb-qka-meta">{card.meta}</span> : <span />}
            <div>
              <h3 className="hb-qka-title">{card.title}</h3>
              {card.text ? <p className="hb-qka-text">{card.text}</p> : null}
            </div>
          </div>
        );
      })}
      <div className="hb-qka-dots" aria-hidden="true">
        {cards.map((card, i) => (
          <span className="hb-qka-dot" key={`${card.title}-${i}`} data-on={i === index ? "true" : "false"} />
        ))}
      </div>
      <span className="hb-qka-sr" role="status" aria-live="polite">
        {cards[index] ? `Card ${index + 1} of ${n}: ${cards[index].title}` : ""}
      </span>
    </div>
  );
}
