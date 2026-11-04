"use client";

import * as React from "react";

export interface BounceCard {
  title: string;
  meta?: string;
  color?: string;
}

export interface CardBounceStackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  cards?: BounceCard[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  ratio?: number;
  idle?: boolean;
}

const css = `
.hb-qk6 {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: var(--hb-qk6-r);
  font-family: inherit;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-qk6 *, .hb-qk6 *::before, .hb-qk6 *::after { box-sizing: border-box; }
.hb-qk6:focus-visible { outline: 2px solid #2f7bff; outline-offset: 4px; border-radius: 16px; }
.hb-qk6-card {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 84%;
  aspect-ratio: 3 / 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 11px 11px;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    radial-gradient(120% 70% at 20% 0%, color-mix(in srgb, var(--hb-qk6-c) 70%, #ffffff) 0%, transparent 60%),
    linear-gradient(165deg, var(--hb-qk6-c), color-mix(in srgb, var(--hb-qk6-c) 28%, #050508));
  color: #ffffff;
  box-shadow: 0 14px 24px -14px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.35);
  z-index: var(--hb-qk6-z);
  transform: translate(calc(-50% + var(--hb-qk6-cx)), calc(-50% + var(--hb-qk6-cy))) rotate(var(--hb-qk6-cr));
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) calc(var(--hb-qk6-d) * 0.4ms), box-shadow 0.3s ease;
}
.hb-qk6[data-open="true"] .hb-qk6-card {
  transform: translate(calc(-50% + var(--hb-qk6-ox)), calc(-50% + var(--hb-qk6-oy))) rotate(var(--hb-qk6-or));
  transition: transform 0.85s cubic-bezier(0.3, 1.75, 0.5, 1) calc(var(--hb-qk6-d) * 1ms), box-shadow 0.3s ease;
}
.hb-qk6[data-open="true"] .hb-qk6-card:hover {
  transform: translate(calc(-50% + var(--hb-qk6-ox)), calc(-50% + var(--hb-qk6-oy) - 7%)) rotate(0deg) scale(1.05);
  transition: transform 0.35s cubic-bezier(0.3, 1.6, 0.5, 1);
  box-shadow: 0 22px 30px -14px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.35);
  z-index: 20;
}
.hb-qk6-tag {
  align-self: flex-start;
  padding: 3px 7px;
  border-radius: 999px;
  background: rgba(8, 8, 12, 0.42);
  font-size: 9.5px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #f4f4f4;
}
.hb-qk6-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: #ffffff;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);
}
@media (prefers-reduced-motion: reduce) {
  .hb-qk6-card, .hb-qk6[data-open="true"] .hb-qk6-card, .hb-qk6[data-open="true"] .hb-qk6-card:hover { transition: none; }
}
`;

const defaultCards: BounceCard[] = [
  { title: "Kyoto", meta: "Oct 12", color: "#e0553f" },
  { title: "Lisbon", meta: "Nov 03", color: "#2f7bff" },
  { title: "Oaxaca", meta: "Nov 21", color: "#c28a1d" },
  { title: "Tromso", meta: "Dec 09", color: "#2fa67c" },
];

function hash(n: number) {
  let h = Math.imul(n + 1, 2654435761) >>> 0;
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519) >>> 0;
  h ^= h >>> 13;
  return (h >>> 0) / 4294967296;
}

export function CardBounceStack({
  cards = defaultCards,
  open,
  defaultOpen = false,
  onOpenChange,
  ratio = 1.9,
  idle = true,
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onClick,
  onPointerDown,
  onFocus,
  onBlur,
  onKeyDown,
  ...rest
}: CardBounceStackProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const [inner, setInner] = React.useState(defaultOpen);
  const controlled = open !== undefined;
  const isOpen = controlled ? open : inner;
  const user = React.useRef(false);
  const visible = React.useRef(true);
  const lastType = React.useRef("mouse");

  const set = React.useCallback(
    (next: boolean) => {
      if (!controlled) setInner(next);
      onOpenChange?.(next);
    },
    [controlled, onOpenChange],
  );

  React.useEffect(() => {
    const el = root.current;
    if (!el || !idle || controlled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    io.observe(el);
    const timer = window.setInterval(() => {
      if (user.current || !visible.current) return;
      setInner((o) => !o);
    }, 2300);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [idle, controlled]);

  const n = cards.length;
  const mid = (n - 1) / 2;
  const step = n > 1 ? Math.min(74, 170 / (n - 1)) : 0;

  return (
    <div
      ref={root}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label="Card stack, press Enter to fan out the cards"
      className={`hb-qk6 ${className}`}
      data-open={isOpen ? "true" : "false"}
      style={{ "--hb-qk6-r": ratio, ...style } as React.CSSProperties}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        lastType.current = e.pointerType;
        if (e.pointerType === "touch") return;
        user.current = true;
        if (!isOpen) set(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        if (e.pointerType === "touch") return;
        user.current = false;
        if (isOpen) set(false);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (lastType.current === "touch") set(!isOpen);
      }}
      onPointerDown={(e) => {
        onPointerDown?.(e);
        lastType.current = e.pointerType;
      }}
      onFocus={(e) => {
        onFocus?.(e);
        if (e.target === e.currentTarget && e.currentTarget.matches(":focus-visible")) {
          user.current = true;
          if (!isOpen) set(true);
        }
      }}
      onBlur={(e) => {
        onBlur?.(e);
        user.current = false;
        if (isOpen) set(false);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          user.current = true;
          set(!isOpen);
        } else if (e.key === "Escape" && isOpen) {
          set(false);
        }
      }}
      {...rest}
    >
      <style href="hb-card-bounce-stack" precedence="default">{css}</style>
      {cards.map((card, i) => {
        const off = i - mid;
        const jitter = hash(i) - 0.5;
        const vars = {
          "--hb-qk6-c": card.color ?? "#2f7bff",
          "--hb-qk6-z": i + 1,
          "--hb-qk6-d": Math.abs(off) * 70 + 20,
          "--hb-qk6-cx": `${(off * 7 + jitter * 6).toFixed(2)}%`,
          "--hb-qk6-cy": `${(jitter * -6).toFixed(2)}%`,
          "--hb-qk6-cr": `${(off * 5 + jitter * 8).toFixed(2)}deg`,
          "--hb-qk6-ox": `${(off * step).toFixed(2)}%`,
          "--hb-qk6-oy": `${i % 2 === 0 ? -4 : 5}%`,
          "--hb-qk6-or": `${(off * 4).toFixed(2)}deg`,
        } as React.CSSProperties;
        return (
          <div className="hb-qk6-card" style={vars} key={`${card.title}-${i}`}>
            {card.meta ? <span className="hb-qk6-tag">{card.meta}</span> : <span />}
            <h3 className="hb-qk6-title">{card.title}</h3>
          </div>
        );
      })}
    </div>
  );
}
