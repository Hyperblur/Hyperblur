"use client";

import * as React from "react";

export interface LogoLoopBeltProps extends React.HTMLAttributes<HTMLDivElement> {
  logos?: string[];
  speed?: number;
  direction?: "left" | "right";
  hoverSpeed?: number;
  secondRow?: boolean;
  fade?: number;
  gap?: number;
  accent?: string;
}

const defaultLogos = [
  "Orbitly",
  "Kestrel",
  "Plinth",
  "Moonbeam",
  "Fathom",
  "Tessera",
  "Brightside",
  "Quillon",
  "Harbor & Co",
  "Lumenary",
];

const css = `
.hb-qr3 {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  font-family: inherit;
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 var(--hb-qr3-f), #000 calc(100% - var(--hb-qr3-f)), transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, #000 var(--hb-qr3-f), #000 calc(100% - var(--hb-qr3-f)), transparent 100%);
}
.hb-qr3-v {
  overflow: hidden;
  width: 100%;
}
.hb-qr3-k {
  display: flex;
  width: max-content;
  will-change: transform;
}
.hb-qr3-s {
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--hb-qr3-g);
  margin: 0;
  padding: 0 var(--hb-qr3-g) 0 0;
  list-style: none;
}
.hb-qr3-c {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: none;
  box-sizing: border-box;
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: #b8b8b8;
  font-size: 14px;
  line-height: 1.2;
  white-space: nowrap;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.hb-qr3-c:hover {
  color: #ffffff;
  border-color: color-mix(in srgb, var(--hb-qr3-a) 55%, transparent);
  background: color-mix(in srgb, var(--hb-qr3-a) 10%, transparent);
}
.hb-qr3-m {
  flex: none;
  width: 14px;
  height: 14px;
  color: var(--hb-qr3-a);
}
.hb-qr3-c[data-v="0"] .hb-qr3-w { font-weight: 700; letter-spacing: -0.02em; }
.hb-qr3-c[data-v="1"] .hb-qr3-w { font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-size: 16px; }
.hb-qr3-c[data-v="2"] .hb-qr3-w { font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }
.hb-qr3-c[data-v="3"] .hb-qr3-w { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; letter-spacing: -0.02em; }
.hb-qr3-c[data-v="4"] .hb-qr3-w { font-weight: 300; font-size: 16px; letter-spacing: 0.02em; }
.hb-qr3-c[data-v="5"] .hb-qr3-w { font-weight: 800; letter-spacing: -0.04em; }
@media (prefers-reduced-motion: reduce) {
  .hb-qr3-c { transition: none; }
}
`;

function Mark({ index }: { index: number }) {
  const shape = index % 5;
  return (
    <svg className="hb-qr3-m" viewBox="0 0 14 14" aria-hidden="true" fill="currentColor">
      {shape === 0 ? <circle cx="7" cy="7" r="6" /> : null}
      {shape === 1 ? <rect x="2" y="2" width="10" height="10" rx="2" transform="rotate(45 7 7)" /> : null}
      {shape === 2 ? <path d="M7 1.2 13 12.4H1Z" /> : null}
      {shape === 3 ? <path d="M7 .8 12.6 4v6L7 13.2 1.4 10V4Z" /> : null}
      {shape === 4 ? <path d="M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1Zm0 3.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6Z" fillRule="evenodd" /> : null}
    </svg>
  );
}

interface RowProps {
  logos: string[];
  speed: number;
  direction: "left" | "right";
  hoverSpeed: number;
  phase: number;
  hovering: React.RefObject<boolean>;
}

function BeltRow({ logos, speed, direction, hoverSpeed, phase, hovering }: RowProps) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const setRef = React.useRef<HTMLUListElement>(null);
  const [copies, setCopies] = React.useState(2);

  React.useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const first = setRef.current;
    if (!viewport || !track || !first) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let period = 0;
    let offset = phase;
    let rate = 1;
    let last = 0;
    let raf = 0;
    let visible = true;

    const place = () => {
      if (!period) return;
      const pos = ((offset % period) + period) % period;
      const x = direction === "left" ? -pos : pos - period;
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    };

    const measure = () => {
      period = first.getBoundingClientRect().width;
      const need = Math.ceil(viewport.clientWidth / Math.max(1, period)) + 1;
      setCopies(Math.max(2, need));
      place();
    };

    const frame = (ts: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0.016;
      last = ts;
      const target = hovering.current ? hoverSpeed : 1;
      rate += (target - rate) * Math.min(1, dt * 6);
      offset += speed * rate * dt;
      place();
      if (visible) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduced || raf || !visible) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(first);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) start();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(viewport);
    measure();
    start();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [speed, direction, hoverSpeed, phase, hovering, logos]);

  return (
    <div ref={viewportRef} className="hb-qr3-v">
      <div ref={trackRef} className="hb-qr3-k">
        {Array.from({ length: copies }, (_, copy) => (
          <ul
            key={copy}
            ref={copy === 0 ? setRef : undefined}
            className="hb-qr3-s"
            aria-hidden={copy === 0 ? undefined : true}
          >
            {logos.map((name, i) => (
              <li key={`${name}-${i}`} className="hb-qr3-c" data-v={i % 6}>
                <Mark index={i} />
                <span className="hb-qr3-w">{name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function LogoLoopBelt({
  logos = defaultLogos,
  speed = 40,
  direction = "left",
  hoverSpeed = 0,
  secondRow = false,
  fade = 64,
  gap = 12,
  accent = "#7fb3ff",
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: LogoLoopBeltProps) {
  const hovering = React.useRef(false);
  const list = logos.length ? logos : defaultLogos;
  const shifted = React.useMemo(() => {
    const cut = Math.floor(list.length / 2);
    return [...list.slice(cut), ...list.slice(0, cut)];
  }, [list]);

  return (
    <div
      className={`hb-qr3 ${className}`.trim()}
      style={
        {
          ["--hb-qr3-f" as string]: `${fade}px`,
          ["--hb-qr3-g" as string]: `${gap}px`,
          ["--hb-qr3-a" as string]: accent,
          ...style,
        } as React.CSSProperties
      }
      onPointerEnter={(e) => {
        hovering.current = true;
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        hovering.current = false;
        onPointerLeave?.(e);
      }}
      {...rest}
    >
      <style href="hb-logo-loop-belt" precedence="default">
        {css}
      </style>
      <BeltRow
        logos={list}
        speed={speed}
        direction={direction}
        hoverSpeed={hoverSpeed}
        phase={0}
        hovering={hovering}
      />
      {secondRow ? (
        <BeltRow
          logos={shifted}
          speed={speed * 0.8}
          direction={direction === "left" ? "right" : "left"}
          hoverSpeed={hoverSpeed}
          phase={90}
          hovering={hovering}
        />
      ) : null}
    </div>
  );
}
