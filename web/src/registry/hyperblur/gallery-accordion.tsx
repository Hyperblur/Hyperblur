"use client";

import * as React from "react";

export interface AccordionPanel {
  title: string;
  subtitle?: string;
  color?: string;
  src?: string;
}

export interface GalleryAccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: AccordionPanel[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  openOn?: "hover" | "click";
  height?: number;
  grow?: number;
  idle?: boolean;
}

const css = `
.hb-qk8 {
  display: flex;
  width: 100%;
  height: var(--hb-qk8-h);
  gap: 6px;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-qk8 *, .hb-qk8 *::before, .hb-qk8 *::after { box-sizing: border-box; }
.hb-qk8-p {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background-color: var(--hb-qk8-c);
  background-size: cover;
  background-position: center;
  color: #ffffff;
  font: inherit;
  text-align: left;
  cursor: pointer;
  outline: none;
  transition: flex-grow 0.65s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-qk8-p[data-active="true"] { flex-grow: var(--hb-qk8-g); border-color: rgba(255, 255, 255, 0.22); }
.hb-qk8-p:focus-visible { outline: 2px solid #ededed; outline-offset: 2px; }
.hb-qk8-art {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 80% at 15% 0%, color-mix(in srgb, var(--hb-qk8-c) 60%, #ffffff) 0%, transparent 58%),
    repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0 2px, transparent 2px 12px),
    linear-gradient(165deg, var(--hb-qk8-c), color-mix(in srgb, var(--hb-qk8-c) 24%, #050508));
  transform: scale(1.12);
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-qk8-p[data-active="true"] .hb-qk8-art { transform: scale(1); }
.hb-qk8-p[data-src="true"] .hb-qk8-art { background: none; }
.hb-qk8-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(5, 5, 8, 0.05) 30%, rgba(5, 5, 8, 0.78) 100%);
  opacity: 0.6;
  transition: opacity 0.5s ease;
}
.hb-qk8-p[data-active="true"] .hb-qk8-scrim { opacity: 1; }
.hb-qk8-idx {
  position: absolute;
  left: 12px;
  top: 11px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.78);
  font-variant-numeric: tabular-nums;
}
.hb-qk8-vert {
  position: absolute;
  left: 50%;
  bottom: 12px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  writing-mode: vertical-rl;
  transform: translateX(-50%) rotate(180deg);
  opacity: 1;
  transition: opacity 0.3s ease 0.1s;
  color: rgba(255, 255, 255, 0.9);
}
.hb-qk8-p[data-active="true"] .hb-qk8-vert { opacity: 0; transition-delay: 0s; transition-duration: 0.15s; }
.hb-qk8-info {
  position: absolute;
  left: 14px;
  bottom: 13px;
  width: max-content;
  max-width: calc(100% - 28px);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.hb-qk8-p[data-active="true"] .hb-qk8-info { opacity: 1; transform: none; transition: opacity 0.4s ease 0.28s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.28s; }
.hb-qk8-title {
  display: block;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.hb-qk8-sub {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.3;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.78);
}
@media (prefers-reduced-motion: reduce) {
  .hb-qk8-p, .hb-qk8-art, .hb-qk8-scrim, .hb-qk8-vert, .hb-qk8-info { transition: none !important; }
}
`;

const defaultItems: AccordionPanel[] = [
  { title: "Lofoten", subtitle: "Arctic Norway, 68 N", color: "#2c7bd9" },
  { title: "Kyoto", subtitle: "Autumn temples", color: "#d9573b" },
  { title: "Atacama", subtitle: "Chile, 2,400 m", color: "#c4872a" },
  { title: "Faroe", subtitle: "Eighteen islands", color: "#2f9c78" },
  { title: "Dolomites", subtitle: "Italian Alps", color: "#8a62d6" },
];

export function GalleryAccordion({
  items = defaultItems,
  value,
  defaultValue = 0,
  onChange,
  openOn = "hover",
  height = 200,
  grow = 5,
  idle = true,
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onKeyDown,
  ...rest
}: GalleryAccordionProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const buttons = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const active = Math.min(items.length - 1, Math.max(0, controlled ? value : inner));
  const user = React.useRef(false);
  const visible = React.useRef(true);

  const select = React.useCallback(
    (index: number) => {
      if (!controlled) setInner(index);
      onChange?.(index);
    },
    [controlled, onChange],
  );

  React.useEffect(() => {
    const el = root.current;
    if (!el || !idle || controlled || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    io.observe(el);
    const timer = window.setInterval(() => {
      if (user.current || !visible.current) return;
      setInner((i) => (i + 1) % items.length);
    }, 2400);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [idle, controlled, items.length]);

  const go = (index: number) => {
    buttons.current[(index + items.length) % items.length]?.focus();
  };

  return (
    <div
      ref={root}
      role="group"
      aria-label="Gallery"
      className={`hb-qk8 ${className}`}
      style={{ "--hb-qk8-h": `${height}px`, "--hb-qk8-g": grow, ...style } as React.CSSProperties}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        user.current = true;
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        user.current = false;
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          go(active + 1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          go(active - 1);
        } else if (e.key === "Home") {
          e.preventDefault();
          go(0);
        } else if (e.key === "End") {
          e.preventDefault();
          go(items.length - 1);
        }
      }}
      {...rest}
    >
      <style href="hb-gallery-accordion" precedence="default">{css}</style>
      {items.map((item, i) => (
        <button
          key={`${item.title}-${i}`}
          ref={(node) => {
            buttons.current[i] = node;
          }}
          type="button"
          className="hb-qk8-p"
          data-active={i === active ? "true" : "false"}
          data-src={item.src ? "true" : "false"}
          aria-expanded={i === active}
          aria-label={item.subtitle ? `${item.title}, ${item.subtitle}` : item.title}
          style={
            {
              "--hb-qk8-c": item.color ?? "#2f7bff",
              backgroundImage: item.src ? `url(${JSON.stringify(item.src)})` : undefined,
            } as React.CSSProperties
          }
          onPointerEnter={(e) => {
            if (openOn === "hover" && e.pointerType !== "touch" && i !== active) select(i);
          }}
          onFocus={() => {
            if (i !== active) select(i);
          }}
          onClick={() => {
            if (i !== active) select(i);
          }}
        >
          <span className="hb-qk8-art" aria-hidden="true" />
          <span className="hb-qk8-scrim" aria-hidden="true" />
          <span className="hb-qk8-idx" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="hb-qk8-vert" aria-hidden="true">
            {item.title}
          </span>
          <span className="hb-qk8-info" aria-hidden="true">
            <span className="hb-qk8-title">{item.title}</span>
            {item.subtitle ? <span className="hb-qk8-sub">{item.subtitle}</span> : null}
          </span>
        </button>
      ))}
    </div>
  );
}
