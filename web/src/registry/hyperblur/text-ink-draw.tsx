"use client";

import * as React from "react";

export interface TextInkDrawProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  weight?: number;
  drawDuration?: number;
  fillDuration?: number;
  trigger?: "view" | "hover" | "mount";
  loop?: number;
}

const FS = 100;

const css = `
@keyframes hb-vi11-draw {
  0% { stroke-dashoffset: var(--hb-vi11-dash); stroke-opacity: 1; }
  80% { stroke-opacity: 1; }
  100% { stroke-dashoffset: 0; stroke-opacity: 1; }
}
@keyframes hb-vi11-settle {
  0% { stroke-opacity: 1; }
  100% { stroke-opacity: 0.38; }
}
@keyframes hb-vi11-flood {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0%); }
}
.hb-vi11 { display: block; width: 100%; font-family: inherit; box-sizing: border-box; }
.hb-vi11-svg { display: block; width: 100%; height: auto; overflow: visible; }
.hb-vi11-t { font-family: inherit; }
.hb-vi11-s {
  fill: none;
  stroke: var(--hb-vi11-stroke);
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-dasharray: var(--hb-vi11-dash) var(--hb-vi11-dash);
  stroke-dashoffset: var(--hb-vi11-dash);
}
.hb-vi11-f { fill: var(--hb-vi11-fill); }
.hb-vi11-sweep { transform: translateX(-100%); }
.hb-vi11[data-active] .hb-vi11-s {
  animation:
    hb-vi11-draw var(--hb-vi11-dd) cubic-bezier(.55, .1, .3, 1) both,
    hb-vi11-settle 0.8s ease var(--hb-vi11-settle) both;
}
.hb-vi11[data-active] .hb-vi11-sweep {
  animation: hb-vi11-flood var(--hb-vi11-fd) cubic-bezier(.65, 0, .25, 1) both;
  animation-delay: calc(var(--hb-vi11-dd) * 0.72);
}
@media (prefers-reduced-motion: reduce) {
  .hb-vi11 .hb-vi11-s { animation: none !important; stroke-dashoffset: 0; stroke-opacity: 0.38; }
  .hb-vi11 .hb-vi11-sweep { animation: none !important; transform: none; }
}
`;

export function TextInkDraw({
  text,
  stroke = "#7fb3ff",
  fill = "#ededed",
  strokeWidth = 2.2,
  weight = 700,
  drawDuration = 1.8,
  fillDuration = 0.9,
  trigger = "view",
  loop = 0,
  className = "",
  style,
  onMouseEnter,
  ...rest
}: TextInkDrawProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const maskId = `hb-vi11-m${uid}`;
  const gradId = `hb-vi11-g${uid}`;
  const ref = React.useRef<HTMLDivElement>(null);
  const probe = React.useRef<SVGTextElement>(null);
  const [box, setBox] = React.useState<{ x: number; y: number; w: number; h: number }>(() => ({
    x: 0,
    y: -FS * 0.8,
    w: Math.max(1, Array.from(text).length) * FS * 0.6,
    h: FS * 1.05,
  }));
  const [active, setActive] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);

  React.useLayoutEffect(() => {
    const el = probe.current;
    if (!el) return;
    const measure = () => {
      try {
        const b = el.getBBox();
        if (b.width > 0) {
          const pad = strokeWidth * 2 + 2;
          setBox((prev) => {
            const next = { x: b.x - pad, y: b.y - pad, w: b.width + pad * 2, h: b.height + pad * 2 };
            return Math.abs(prev.w - next.w) < 0.5 && Math.abs(prev.h - next.h) < 0.5 && Math.abs(prev.x - next.x) < 0.5 ? prev : next;
          });
        }
      } catch {
        return;
      }
    };
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => undefined);
  }, [text, weight, strokeWidth]);

  const play = React.useCallback(() => {
    setActive(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setCycle((c) => c + 1);
        setActive(true);
      }),
    );
  }, []);

  React.useEffect(() => {
    if (trigger === "hover") return;
    if (trigger === "mount") {
      const id = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(id);
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  React.useEffect(() => {
    if (!active || loop <= 0) return;
    const id = setTimeout(play, (drawDuration + fillDuration + 0.8 + loop) * 1000);
    return () => clearTimeout(id);
  }, [active, loop, cycle, drawDuration, fillDuration, play]);

  const dash = FS * 7;
  const vars = {
    "--hb-vi11-stroke": stroke,
    "--hb-vi11-fill": fill,
    "--hb-vi11-dash": dash,
    "--hb-vi11-dd": `${drawDuration}s`,
    "--hb-vi11-fd": `${fillDuration}s`,
    "--hb-vi11-settle": `${(drawDuration * 0.72 + fillDuration).toFixed(2)}s`,
    ...style,
  } as React.CSSProperties;

  const textProps = {
    x: 0,
    y: 0,
    fontSize: FS,
    fontWeight: weight,
    className: "hb-vi11-t",
    style: { whiteSpace: "pre" } as React.CSSProperties,
  };

  return (
    <div
      ref={ref}
      className={`hb-vi11 ${className}`}
      style={vars}
      data-active={active ? "" : undefined}
      onMouseEnter={(e) => {
        if (trigger === "hover") play();
        onMouseEnter?.(e);
      }}
      {...rest}
    >
      <style href="hb-text-ink-draw" precedence="default">{css}</style>
      <svg
        className="hb-vi11-svg"
        viewBox={`${box.x.toFixed(1)} ${box.y.toFixed(1)} ${box.w.toFixed(1)} ${box.h.toFixed(1)}`}
        role="img"
        aria-label={text}
      >
        <title>{text}</title>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.86" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={maskId} maskUnits="userSpaceOnUse" x={box.x} y={box.y} width={box.w} height={box.h}>
            <rect
              key={cycle}
              className="hb-vi11-sweep"
              x={box.x}
              y={box.y}
              width={box.w * 1.16}
              height={box.h}
              fill={`url(#${gradId})`}
              style={{ transformBox: "fill-box" }}
            />
          </mask>
        </defs>
        <text ref={probe} {...textProps} opacity="0" aria-hidden="true">{text}</text>
        <g aria-hidden="true" key={cycle}>
          <text {...textProps} className="hb-vi11-t hb-vi11-f" mask={`url(#${maskId})`}>{text}</text>
          <text {...textProps} className="hb-vi11-t hb-vi11-s" strokeWidth={strokeWidth}>{text}</text>
        </g>
      </svg>
    </div>
  );
}
