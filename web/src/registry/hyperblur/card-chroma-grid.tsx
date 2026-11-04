"use client";

import * as React from "react";

export interface ChromaItem {
  title: string;
  subtitle?: string;
  tag?: string;
  accent?: string;
  href?: string;
}

export interface CardChromaGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: ChromaItem[];
  columns?: number;
  radius?: number;
  gap?: number;
  idle?: boolean;
}

const css = `
.hb-qk7 {
  --hb-qk7-x: 50%;
  --hb-qk7-y: 50%;
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(var(--hb-qk7-cols), minmax(0, 1fr));
  gap: var(--hb-qk7-gap);
  font-family: inherit;
  box-sizing: border-box;
  touch-action: pan-y;
}
.hb-qk7 *, .hb-qk7 *::before, .hb-qk7 *::after { box-sizing: border-box; }
.hb-qk7-card {
  --hb-qk7-n: 0;
  --hb-qk7-mx: 50%;
  --hb-qk7-my: 50%;
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--hb-qk7-a) calc(var(--hb-qk7-n) * 75%), #262626);
  background:
    radial-gradient(150px circle at var(--hb-qk7-mx) var(--hb-qk7-my), color-mix(in srgb, var(--hb-qk7-a) calc(var(--hb-qk7-n) * 30%), transparent), transparent 72%),
    #101010;
  box-shadow: 0 0 calc(var(--hb-qk7-n) * 22px) -8px color-mix(in srgb, var(--hb-qk7-a) 70%, transparent);
  color: #ededed;
  text-decoration: none;
  outline: none;
}
.hb-qk7-card:focus-visible { outline: 2px solid #ededed; outline-offset: 2px; }
.hb-qk7-row {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}
.hb-qk7-av {
  display: grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: linear-gradient(145deg, var(--hb-qk7-a), color-mix(in srgb, var(--hb-qk7-a) 45%, #000000));
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
}
.hb-qk7-tag {
  overflow: hidden;
  padding: 3px 7px;
  border-radius: 999px;
  border: 1px solid #2a2a2a;
  font-size: 9.5px;
  line-height: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: color-mix(in srgb, var(--hb-qk7-a) 70%, #bdbdbd);
}
.hb-qk7-name {
  margin: 0;
  overflow: hidden;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #f2f2f2;
}
.hb-qk7-sub {
  margin: 1px 0 0;
  overflow: hidden;
  font-size: 11px;
  line-height: 1.25;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #8f8f8f;
}
.hb-qk7-veil {
  position: absolute;
  inset: -2px;
  z-index: 3;
  pointer-events: none;
  background: rgba(10, 10, 10, 0.28);
  backdrop-filter: grayscale(1) brightness(0.9);
  -webkit-backdrop-filter: grayscale(1) brightness(0.9);
  -webkit-mask-image: radial-gradient(circle var(--hb-qk7-rad) at var(--hb-qk7-x) var(--hb-qk7-y), transparent 0%, transparent 32%, rgba(0, 0, 0, 0.6) 68%, #000000 100%);
  mask-image: radial-gradient(circle var(--hb-qk7-rad) at var(--hb-qk7-x) var(--hb-qk7-y), transparent 0%, transparent 32%, rgba(0, 0, 0, 0.6) 68%, #000000 100%);
}
@media (prefers-reduced-motion: reduce) {
  .hb-qk7-card { transition: none; }
}
`;

const defaultItems: ChromaItem[] = [
  { title: "Ada Okafor", subtitle: "Core runtime", tag: "412", accent: "#ff6a5c" },
  { title: "Ben Hartley", subtitle: "Docs and DX", tag: "186", accent: "#ffb020" },
  { title: "Chloe Tran", subtitle: "Design system", tag: "304", accent: "#35c98f" },
  { title: "Dario Silva", subtitle: "Build tooling", tag: "97", accent: "#3b8cff" },
  { title: "Elin Berg", subtitle: "Accessibility", tag: "228", accent: "#a56bff" },
  { title: "Farah Nasser", subtitle: "Release lead", tag: "351", accent: "#ff5fa8" },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function CardChromaGrid({
  items = defaultItems,
  columns = 3,
  radius = 130,
  gap = 8,
  idle = true,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  onPointerCancel,
  ...rest
}: CardChromaGridProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const cards = React.useRef<(HTMLElement | null)[]>([]);
  const st = React.useRef({ tx: 0, ty: 0, x: 0, y: 0, hover: false, focus: -1, ready: false });

  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    const s = st.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paint = () => {
      el.style.setProperty("--hb-qk7-x", `${s.x.toFixed(1)}px`);
      el.style.setProperty("--hb-qk7-y", `${s.y.toFixed(1)}px`);
      const reach = radius * 1.25;
      for (const card of cards.current) {
        if (!card) continue;
        const cx = card.offsetLeft + card.offsetWidth / 2;
        const cy = card.offsetTop + card.offsetHeight / 2;
        const d = Math.hypot(cx - s.x, cy - s.y);
        const n = Math.max(0, 1 - d / reach);
        card.style.setProperty("--hb-qk7-n", (n * n).toFixed(3));
        card.style.setProperty("--hb-qk7-mx", `${(s.x - card.offsetLeft).toFixed(1)}px`);
        card.style.setProperty("--hb-qk7-my", `${(s.y - card.offsetTop).toFixed(1)}px`);
      }
    };
    const home = () => {
      s.x = el.clientWidth * 0.3;
      s.y = el.clientHeight * 0.35;
      s.tx = s.x;
      s.ty = s.y;
    };
    if (!s.ready) {
      home();
      s.ready = true;
    }
    if (reduce) {
      paint();
      const ro = new ResizeObserver(() => {
        home();
        paint();
      });
      ro.observe(el);
      return () => ro.disconnect();
    }
    let raf = 0;
    const frame = (ms: number) => {
      const t = ms / 1000;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const f = s.focus >= 0 ? cards.current[s.focus] : null;
      if (f && !s.hover) {
        s.tx = f.offsetLeft + f.offsetWidth / 2;
        s.ty = f.offsetTop + f.offsetHeight / 2;
      } else if (!s.hover) {
        if (idle) {
          s.tx = w * (0.5 + 0.42 * Math.sin(t * 0.7));
          s.ty = h * (0.5 + 0.36 * Math.sin(t * 0.53 + 1));
        } else {
          s.tx = w * 0.5;
          s.ty = h * 0.5;
        }
      }
      s.x += (s.tx - s.x) * 0.14;
      s.y += (s.ty - s.y) * 0.14;
      paint();
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [radius, idle, items.length]);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    const r = e.currentTarget.getBoundingClientRect();
    const s = st.current;
    s.hover = true;
    s.tx = e.clientX - r.left;
    s.ty = e.clientY - r.top;
  };

  const leave = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    st.current.hover = false;
  };

  const cancel = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerCancel?.(e);
    st.current.hover = false;
  };

  return (
    <div
      ref={root}
      className={`hb-qk7 ${className}`}
      style={
        {
          "--hb-qk7-cols": columns,
          "--hb-qk7-gap": `${gap}px`,
          "--hb-qk7-rad": `${radius}px`,
          ...style,
        } as React.CSSProperties
      }
      onPointerMove={move}
      onPointerLeave={leave}
      onPointerCancel={cancel}
      {...rest}
    >
      <style href="hb-card-chroma-grid" precedence="default">{css}</style>
      {items.map((item, i) => {
        const Tag = (item.href ? "a" : "div") as "a";
        return (
          <Tag
            key={`${item.title}-${i}`}
            ref={(node) => {
              cards.current[i] = node;
            }}
            className="hb-qk7-card"
            href={item.href}
            tabIndex={0}
            style={{ "--hb-qk7-a": item.accent ?? "#2f7bff" } as React.CSSProperties}
            onFocus={() => {
              st.current.focus = i;
            }}
            onBlur={() => {
              st.current.focus = -1;
            }}
          >
            <div className="hb-qk7-row">
              <span className="hb-qk7-av" aria-hidden="true">
                {initials(item.title)}
              </span>
              {item.tag ? <span className="hb-qk7-tag">{item.tag}</span> : null}
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 className="hb-qk7-name">{item.title}</h3>
              {item.subtitle ? <p className="hb-qk7-sub">{item.subtitle}</p> : null}
            </div>
          </Tag>
        );
      })}
      <div className="hb-qk7-veil" aria-hidden="true" />
    </div>
  );
}
