"use client";

import * as React from "react";

export interface MotionLogoLensItem {
  name: string;
  note: string;
  glyph?: number;
}

export interface MotionLogoLensProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  logos?: MotionLogoLensItem[];
  label?: string;
  speed?: number;
  arc?: number;
  magnify?: number;
  pauseOnHover?: boolean;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  onFocusChange?: (index: number) => void;
}

const defaultLogos: MotionLogoLensItem[] = [
  { name: "Northwind", note: "2,400 seats since 2025", glyph: 0 },
  { name: "Quillr", note: "Cut review time by 41%", glyph: 1 },
  { name: "Halden", note: "Runs 18 regional teams", glyph: 2 },
  { name: "Orbitly", note: "Migrated in one weekend", glyph: 3 },
  { name: "Fennec", note: "Ships twice a day", glyph: 4 },
  { name: "Lumen&Co", note: "Saved $310k in year one", glyph: 5 },
  { name: "Parcelo", note: "99.98% on-time builds", glyph: 6 },
  { name: "Brightline", note: "From 3 tools down to 1", glyph: 7 },
];

const css = `
.hb-wh8 {
  --hb-wh8-a: #2f7bff;
  position: relative;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  container-type: inline-size;
  padding: clamp(10px, 3cqw, 32px) 0 clamp(8px, 2.4cqw, 26px);
}
.hb-wh8 *, .hb-wh8 *::before, .hb-wh8 *::after { box-sizing: border-box; }
.hb-wh8-label {
  margin: 0 0 clamp(4px, 1.4cqw, 16px);
  text-align: center;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(8px, 1.3cqw, 12px);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #7a7a7a;
}
.hb-wh8-track {
  position: relative;
  height: clamp(66px, 15cqw, 150px);
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.35) 10%, #000 34%, #000 66%, rgba(0, 0, 0, 0.35) 90%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.35) 10%, #000 34%, #000 66%, rgba(0, 0, 0, 0.35) 90%, transparent 100%);
}
.hb-wh8-list { margin: 0; padding: 0; list-style: none; }
.hb-wh8-li { display: contents; }
.hb-wh8-lens {
  position: absolute;
  left: 50%;
  top: 50%;
  width: clamp(70px, 17cqw, 170px);
  aspect-ratio: 1;
  border-radius: 50%;
  transform: translate(-50%, -54%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-wh8-a) 16%, transparent), transparent 75%);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-wh8-a) 28%, transparent);
  pointer-events: none;
}
.hb-wh8-lens::before, .hb-wh8-lens::after {
  content: "";
  position: absolute;
  left: 50%;
  width: 1px;
  height: 8%;
  background: color-mix(in srgb, var(--hb-wh8-a) 70%, #fff);
}
.hb-wh8-lens::before { top: -4%; }
.hb-wh8-lens::after { bottom: -4%; }
.hb-wh8-item {
  --k: 0;
  position: absolute;
  left: 0;
  top: 50%;
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(11px, 2.1cqw, 21px);
  font-weight: 600;
  letter-spacing: -0.02em;
  white-space: nowrap;
  color: color-mix(in srgb, #ffffff calc(var(--k) * 100%), #6a6a6a);
  will-change: transform;
}
.hb-wh8-item svg {
  width: 1.35em;
  height: 1.35em;
  flex: none;
  color: color-mix(in srgb, var(--hb-wh8-a) calc(var(--k) * 100%), #5a5a5a);
}
.hb-wh8-cap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2em;
  margin-top: clamp(2px, 1cqw, 12px);
  min-height: 2.6em;
  text-align: center;
}
.hb-wh8-cap b {
  font-size: clamp(10px, 1.6cqw, 16px);
  font-weight: 600;
  color: #f2f2f2;
  animation: hb-wh8-in 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-wh8-cap span {
  font-size: clamp(9px, 1.35cqw, 14px);
  color: #9a9a9a;
  animation: hb-wh8-in 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes hb-wh8-in { from { opacity: 0; transform: translateY(5px); filter: blur(3px); } to { opacity: 1; transform: none; filter: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-wh8-cap b, .hb-wh8-cap span { animation: none; }
  .hb-wh8-item { will-change: auto; }
}
`;

function Glyph({ kind }: { kind: number }) {
  const k = ((kind % 8) + 8) % 8;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {k === 0 ? <path d="M12 2 22 12 12 22 2 12Z M12 7 7 12l5 5 5-5Z" fill="currentColor" fillRule="evenodd" /> : null}
      {k === 1 ? <path d="M4 20c0-9 7-16 16-16-1 9-7 16-16 16Zm4-3c4-1 7-4 8-8" fill="currentColor" /> : null}
      {k === 2 ? (
        <g fill="currentColor">
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="8" rx="4" />
          <rect x="3" y="13" width="8" height="8" rx="4" />
          <rect x="13" y="13" width="8" height="8" rx="2" />
        </g>
      ) : null}
      {k === 3 ? (
        <g fill="none" stroke="currentColor" strokeWidth="2.4">
          <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)" />
        </g>
      ) : null}
      {k === 4 ? <path d="M3 20 8 4l4 9 4-9 5 16h-4l-1-4-4 4-4-4-1 4Z" fill="currentColor" /> : null}
      {k === 5 ? (
        <g fill="currentColor">
          <circle cx="9" cy="12" r="7" />
          <circle cx="17" cy="12" r="5" opacity="0.55" />
        </g>
      ) : null}
      {k === 6 ? <path d="M12 2 21 7v10l-9 5-9-5V7Zm0 4.3L7 9v6l5 2.8 5-2.8V9Z" fill="currentColor" fillRule="evenodd" /> : null}
      {k === 7 ? (
        <g fill="currentColor">
          <rect x="3" y="15" width="4" height="6" rx="1" />
          <rect x="10" y="9" width="4" height="12" rx="1" />
          <rect x="17" y="3" width="4" height="18" rx="1" />
        </g>
      ) : null}
    </svg>
  );
}

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function findScroller(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    const oy = getComputedStyle(node).overflowY;
    if ((oy === "auto" || oy === "scroll" || oy === "overlay") && node.scrollHeight > node.clientHeight + 1) return node;
    node = node.parentElement;
  }
  return null;
}

function layout(width: number, count: number) {
  const gap = Math.min(220, Math.max(112, width / 4.6));
  const copies = Math.max(1, Math.ceil((width + gap * 3) / (count * gap)));
  return { gap, copies, total: count * copies * gap };
}

function place(i: number, offset: number, width: number, gap: number, total: number, arc: number, magnify: number) {
  const raw = (((i * gap - offset) % total) + total) % total;
  const x = raw - gap;
  const c = width / 2;
  const dx = x - c;
  const prox = clamp01(1 - Math.abs(dx) / (gap * 1.25));
  const e = prox * prox * (3 - 2 * prox);
  const edge = Math.min(1, Math.abs(dx) / (width / 2 || 1));
  const y = edge * edge * arc - e * arc * 0.35;
  const s = 1 + e * magnify;
  return { x, y, s, e };
}

export function MotionLogoLens({
  logos = defaultLogos,
  label = "Trusted by product teams at",
  speed = 46,
  arc = 18,
  magnify = 0.6,
  pauseOnHover = true,
  accent = "#2f7bff",
  progress,
  autoPlay = true,
  onFocusChange,
  className,
  style,
  ...rest
}: MotionLogoLensProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const items = React.useRef<(HTMLSpanElement | null)[]>([]);
  const [width, setWidth] = React.useState(1000);
  const [focus, setFocus] = React.useState(0);
  const progressRef = React.useRef(progress);
  const offsetRef = React.useRef(0);
  const focusCb = React.useRef(onFocusChange);
  const n = Math.max(1, logos.length);
  const { gap, copies, total } = layout(width, n);
  const controlled = typeof progress === "number";

  React.useEffect(() => {
    progressRef.current = progress;
    focusCb.current = onFocusChange;
  });

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = Math.round(el.clientWidth);
      if (w > 0) setWidth((old) => (old === w ? old : w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const count = n * copies;
    let shown = -1;
    const draw = (offset: number) => {
      let best = -1;
      let bestE = -1;
      for (let i = 0; i < count; i++) {
        const node = items.current[i];
        if (!node) continue;
        const { x, y, s, e } = place(i, offset, width, gap, total, arc, magnify);
        node.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${s.toFixed(3)})`;
        node.style.setProperty("--k", e.toFixed(3));
        node.style.zIndex = e > 0.01 ? "2" : "1";
        if (e > bestE) {
          bestE = e;
          best = i % n;
        }
      }
      if (best !== shown && best >= 0) {
        shown = best;
        setFocus(best);
        focusCb.current?.(best);
      }
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (controlled) {
      draw((progressRef.current ?? 0) * n * gap);
      return;
    }
    if (reduce) {
      draw(0);
      return;
    }
    let raf = 0;
    let last = 0;
    let offset = offsetRef.current;
    let target = 0;
    let hover = false;
    let visible = true;
    let rate = 1;
    const sc = autoPlay ? null : findScroller(root);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(root);
    const enter = () => {
      hover = true;
    };
    const leave = () => {
      hover = false;
    };
    if (pauseOnHover) {
      root.addEventListener("pointerenter", enter);
      root.addEventListener("pointerleave", leave);
      root.addEventListener("focusin", enter);
      root.addEventListener("focusout", leave);
    }
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(50, now - last) : 16;
      last = now;
      if (!visible) return;
      if (autoPlay) {
        rate += ((hover ? 0 : 1) - rate) * Math.min(1, dt * 0.006);
        offset += (dt / 1000) * speed * rate;
      } else {
        const r = root.getBoundingClientRect();
        const top = sc ? r.top - sc.getBoundingClientRect().top : r.top;
        const vh = sc ? sc.clientHeight : window.innerHeight;
        target = clamp01((vh - top) / (vh + r.height)) * n * gap * 1.5;
        offset += (target - offset) * Math.min(1, dt * 0.01);
      }
      offsetRef.current = offset;
      draw(offset);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("focusin", enter);
      root.removeEventListener("focusout", leave);
    };
  }, [controlled, progress, autoPlay, speed, arc, magnify, pauseOnHover, width, gap, copies, total, n]);

  const all = Array.from({ length: n * copies }, (_, i) => logos[i % n]);
  const current = logos[focus] ?? logos[0];

  return (
    <div
      ref={ref}
      className={["hb-wh8", className].filter(Boolean).join(" ")}
      style={{ "--hb-wh8-a": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-motion-logo-lens" precedence="default">{css}</style>
      {label ? <p className="hb-wh8-label">{label}</p> : null}
      <div className="hb-wh8-track" ref={trackRef}>
        <span className="hb-wh8-lens" aria-hidden="true" />
        <ul className="hb-wh8-list" aria-label={label || "Customers"}>
          {all.map((logo, i) => {
            const { x, y, s, e } = place(i, 0, width, gap, total, arc, magnify);
            return (
              <li key={i} aria-hidden={i >= n ? "true" : undefined} className="hb-wh8-li">
                <span
                  className="hb-wh8-item"
                  ref={(node) => {
                    items.current[i] = node;
                  }}
                  style={
                    {
                      transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${s.toFixed(3)})`,
                      "--k": e.toFixed(3),
                    } as React.CSSProperties
                  }
                >
                  <Glyph kind={logo.glyph ?? i} />
                  {logo.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      {current ? (
        <div className="hb-wh8-cap" key={focus}>
          <b>{current.name}</b>
          <span>{current.note}</span>
        </div>
      ) : null}
    </div>
  );
}
