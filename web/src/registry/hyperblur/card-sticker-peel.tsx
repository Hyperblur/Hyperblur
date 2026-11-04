"use client";

import * as React from "react";

export type StickerCorner = "br" | "bl" | "tr" | "tl";

export interface CardStickerPeelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  subtitle?: string;
  backing?: string;
  accent?: string;
  corner?: StickerCorner;
  ratio?: number;
  idle?: boolean;
  children?: React.ReactNode;
}

const css = `
.hb-qk5 {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: var(--hb-qk5-r);
  border-radius: 18px;
  border: 1px solid #2a2a2a;
  background:
    radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1.5px) 0 0 / 12px 12px,
    linear-gradient(160deg, #f1ede2, #dcd6c6);
  color: #121622;
  font-family: inherit;
  box-sizing: border-box;
  cursor: grab;
  user-select: none;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-qk5 *, .hb-qk5 *::before, .hb-qk5 *::after { box-sizing: border-box; }
.hb-qk5[data-drag="true"] { cursor: grabbing; }
.hb-qk5:focus-visible { outline: 2px solid var(--hb-qk5-c); outline-offset: 3px; }
.hb-qk5-back {
  position: absolute;
  inset: 6%;
  display: flex;
  padding: 2.4% 3%;
  align-items: flex-end;
  justify-content: flex-end;
  border-radius: 20px;
  border: 1.5px dashed rgba(18, 22, 34, 0.28);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(18, 22, 34, 0.5);
}
.hb-qk5[data-corner="bl"] .hb-qk5-back { justify-content: flex-start; }
.hb-qk5[data-corner="tr"] .hb-qk5-back { align-items: flex-start; }
.hb-qk5[data-corner="tl"] .hb-qk5-back { align-items: flex-start; justify-content: flex-start; }
.hb-qk5-stage {
  position: absolute;
  inset: 6%;
  filter: drop-shadow(0 7px 7px rgba(18, 22, 34, 0.32));
}
.hb-qk5-face, .hb-qk5-flap { position: absolute; inset: 0; }
.hb-qk5-face {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5%;
  padding: 6%;
  border-radius: 20px;
  border: 5px solid #fbfaf6;
  background:
    repeating-conic-gradient(from 0deg at 50% 46%, var(--hb-qk5-c) 0 9deg, color-mix(in srgb, var(--hb-qk5-c) 78%, #ffffff) 9deg 18deg);
  color: #ffffff;
  overflow: hidden;
}
.hb-qk5-badge {
  display: grid;
  place-items: center;
  width: 46%;
  max-height: 58%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #fbfaf6;
  box-shadow: 0 3px 0 rgba(18, 22, 34, 0.25);
}
.hb-qk5-badge svg {
  width: 56%;
  height: 56%;
  fill: var(--hb-qk5-c);
  stroke: #121622;
  stroke-width: 1.4;
  stroke-linejoin: round;
}
.hb-qk5-tx { text-align: center; min-width: 0; max-width: 100%; }
.hb-qk5-title {
  margin: 0;
  font-size: 19px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #ffffff;
  text-shadow: 0 2px 0 rgba(18, 22, 34, 0.4);
}
.hb-qk5-sub {
  margin: 4px 0 0;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.86);
}
.hb-qk5-flap { pointer-events: none; }
`;

type Pt = [number, number];

function clipHalf(poly: Pt[], side: (p: Pt) => number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i += 1) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const fa = side(a);
    const fb = side(b);
    if (fa >= 0) out.push(a);
    if ((fa >= 0) !== (fb >= 0)) {
      const t = fa / (fa - fb);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return out;
}

function cornerOf(corner: StickerCorner, w: number): Pt {
  return [corner.endsWith("r") ? w : 0, corner.startsWith("b") ? 1 : 0];
}

function shape(poly: Pt[], w: number) {
  return `polygon(${poly.map(([x, y]) => `${((x / w) * 100).toFixed(2)}% ${(y * 100).toFixed(2)}%`).join(", ")})`;
}

function geometry(p: Pt, corner: StickerCorner, w: number) {
  const c = cornerOf(corner, w);
  const dx = p[0] - c[0];
  const dy = p[1] - c[1];
  const len = Math.hypot(dx, dy);
  if (len < 0.004) return { face: "none", flap: "polygon(0 0, 0 0, 0 0)", paper: "none" };
  const nx = dx / len;
  const ny = dy / len;
  const mx = (c[0] + p[0]) / 2;
  const my = (c[1] + p[1]) / 2;
  const f = (q: Pt) => (q[0] - mx) * nx + (q[1] - my) * ny;
  const box: Pt[] = [
    [0, 0],
    [w, 0],
    [w, 1],
    [0, 1],
  ];
  const face = clipHalf(box, f);
  const folded = clipHalf(box, (q) => -f(q)).map((q): Pt => {
    const d = f(q);
    return [q[0] - 2 * d * nx, q[1] - 2 * d * ny];
  });
  const angle = (Math.atan2(nx, -ny) * 180) / Math.PI;
  const span = Math.abs(w * nx) + Math.abs(ny);
  const at = ((mx - w / 2) * nx + (my - 0.5) * ny) / span + 0.5;
  const ext = len / 2 / span;
  const paper = `linear-gradient(${angle.toFixed(1)}deg, #a9a392 ${(at * 100).toFixed(2)}%, #f0ece3 ${((at + ext * 0.4) * 100).toFixed(2)}%, #fbfaf6 ${((at + ext) * 100).toFixed(2)}%)`;
  return { face: shape(face, w), flap: shape(folded, w), paper };
}

function restPoint(corner: StickerCorner, w: number, k: number): Pt {
  const c = cornerOf(corner, w);
  const sx = c[0] > 0 ? -1 : 1;
  const sy = c[1] > 0 ? -1 : 1;
  return [c[0] + sx * k * w, c[1] + sy * k];
}

function clampPoint(p: Pt, corner: StickerCorner, w: number): Pt {
  let x = Math.min(w, Math.max(0, p[0]));
  let y = Math.min(1, Math.max(0, p[1]));
  const c = cornerOf(corner, w);
  const max = Math.hypot(w, 1) * 0.8;
  const d = Math.hypot(x - c[0], y - c[1]);
  if (d > max) {
    x = c[0] + ((x - c[0]) / d) * max;
    y = c[1] + ((y - c[1]) / d) * max;
  }
  return [x, y];
}

export function CardStickerPeel({
  title = "Ship it",
  subtitle = "Friday release",
  backing = "Peel slowly",
  accent = "#2f7bff",
  corner = "br",
  ratio = 1,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CardStickerPeelProps) {
  const [p, setP] = React.useState<Pt>(() => restPoint(corner, ratio, 0.13));
  const [peeled, setPeeled] = React.useState(false);
  const pRef = React.useRef<Pt>(p);
  const mode = React.useRef<"idle" | "drag" | "held">("idle");
  const hold = React.useRef<Pt>(p);
  const drag = React.useRef({ x: 0, y: 0, p0: p, moved: false, from: "idle" as "idle" | "held" });
  const reduced = React.useRef(false);
  const root = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);

  const put = React.useCallback((next: Pt) => {
    pRef.current = next;
    setP(next);
  }, []);

  React.useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    if (!el || reduced.current || !idle) return;
    let raf = 0;
    const frame = (ms: number) => {
      if (mode.current !== "drag") {
        const goal =
          mode.current === "idle"
            ? restPoint(corner, ratio, 0.14 + 0.05 * Math.sin((ms / 1000) * 1.1))
            : hold.current;
        const cur = pRef.current;
        const nx = cur[0] + (goal[0] - cur[0]) * 0.14;
        const ny = cur[1] + (goal[1] - cur[1]) * 0.14;
        if (Math.abs(nx - cur[0]) > 0.0002 || Math.abs(ny - cur[1]) > 0.0002) put([nx, ny]);
      }
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
  }, [corner, ratio, idle, put]);

  const settle = React.useCallback(
    (goal: Pt) => {
      if (reduced.current || !idle) put(goal);
    },
    [idle, put],
  );

  const reset = React.useCallback(() => {
    mode.current = "idle";
    setPeeled(false);
    settle(restPoint(corner, ratio, 0.13));
  }, [corner, ratio, settle]);

  const open = React.useCallback(() => {
    const goal = clampPoint(restPoint(corner, ratio, 0.52), corner, ratio);
    hold.current = goal;
    mode.current = "held";
    setPeeled(true);
    settle(goal);
  }, [corner, ratio, settle]);

  const toggle = () => {
    if (mode.current === "held") reset();
    else open();
  };

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    rest.onPointerDown?.(e);
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      p0: pRef.current,
      moved: false,
      from: mode.current === "held" ? "held" : "idle",
    };
    mode.current = "drag";
    setDragging(true);
  };

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    rest.onPointerMove?.(e);
    if (mode.current !== "drag") return;
    const r = e.currentTarget.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const d = drag.current;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.hypot(dx, dy) > 4) d.moved = true;
    if (!d.moved) return;
    const next = clampPoint([d.p0[0] + (dx / r.width) * ratio, d.p0[1] + dy / r.height], corner, ratio);
    put(next);
  };

  const up = (e: React.PointerEvent<HTMLDivElement>) => {
    rest.onPointerUp?.(e);
    if (mode.current !== "drag") return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
    const d = drag.current;
    if (!d.moved) {
      mode.current = d.from;
      toggle();
      return;
    }
    const c = cornerOf(corner, ratio);
    const dist = Math.hypot(pRef.current[0] - c[0], pRef.current[1] - c[1]);
    if (dist < 0.1) {
      reset();
    } else {
      hold.current = pRef.current;
      mode.current = "held";
      setPeeled(true);
    }
  };

  const cancel = (e: React.PointerEvent<HTMLDivElement>) => {
    rest.onPointerCancel?.(e);
    if (mode.current !== "drag") return;
    setDragging(false);
    hold.current = pRef.current;
    mode.current = "held";
    setPeeled(true);
  };

  const key = (e: React.KeyboardEvent<HTMLDivElement>) => {
    rest.onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    } else if (e.key === "Escape" && mode.current === "held") {
      e.preventDefault();
      reset();
    }
  };

  const geo = geometry(p, corner, ratio);

  return (
    <div
      ref={root}
      role="button"
      tabIndex={0}
      aria-pressed={peeled}
      aria-label={`${title} sticker. Drag a corner or press Enter to peel it, press again to put it back.`}
      className={`hb-qk5 ${className}`}
      data-corner={corner}
      data-drag={dragging ? "true" : "false"}
      style={{ "--hb-qk5-r": ratio, "--hb-qk5-c": accent, ...style } as React.CSSProperties}
      {...rest}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={cancel}
      onKeyDown={key}
    >
      <style href="hb-card-sticker-peel" precedence="default">{css}</style>
      <div className="hb-qk5-back" aria-hidden="true">
        {backing}
      </div>
      <div className="hb-qk5-stage">
        <div className="hb-qk5-face" style={{ clipPath: geo.face }}>
          {children ?? (
            <>
              <span className="hb-qk5-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M13.2 2 5 13.4h5.4L9.6 22 19 9.8h-5.6L13.2 2z" />
                </svg>
              </span>
              <span className="hb-qk5-tx">
                <h3 className="hb-qk5-title">{title}</h3>
                {subtitle ? <p className="hb-qk5-sub">{subtitle}</p> : null}
              </span>
            </>
          )}
        </div>
        <div className="hb-qk5-flap" style={{ clipPath: geo.flap, background: geo.paper }} aria-hidden="true" />
      </div>
    </div>
  );
}
