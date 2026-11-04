"use client";

import * as React from "react";

export interface CardBorderGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
  radius?: number;
  borderWidth?: number;
  arc?: number;
  bloom?: number;
  speed?: number;
  idle?: boolean;
}

const css = `
.hb-qv2 {
  --hb-qv2-acc: #2f7bff;
  --hb-qv2-r: 18px;
  --hb-qv2-bw: 1.5px;
  --hb-qv2-w: 38deg;
  --hb-qv2-bl: 14px;
  --hb-qv2-a: 0deg;
  --hb-qv2-i: 0.7;
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: var(--hb-qv2-r);
  background: #111111;
  color: #ededed;
  font: inherit;
  isolation: isolate;
}
.hb-qv2 *, .hb-qv2 *::before, .hb-qv2 *::after { box-sizing: border-box; }
.hb-qv2-ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: var(--hb-qv2-bw);
  pointer-events: none;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
.hb-qv2-ln {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
}
.hb-qv2-ln .hb-qv2-ring { background: rgba(255, 255, 255, 0.09); }
.hb-qv2-hot {
  background: conic-gradient(
    from calc(var(--hb-qv2-a) - var(--hb-qv2-w)) at 50% 50%,
    transparent 0deg,
    color-mix(in srgb, var(--hb-qv2-acc) 40%, transparent) calc(var(--hb-qv2-w) * 0.55),
    color-mix(in srgb, var(--hb-qv2-acc) 40%, #ffffff) var(--hb-qv2-w),
    color-mix(in srgb, var(--hb-qv2-acc) 40%, transparent) calc(var(--hb-qv2-w) * 1.45),
    transparent calc(var(--hb-qv2-w) * 2),
    transparent 360deg
  );
}
.hb-qv2-lt {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  opacity: var(--hb-qv2-i);
}
.hb-qv2-bl {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  opacity: calc(var(--hb-qv2-i) * 0.85);
  filter: blur(var(--hb-qv2-bl));
}
.hb-qv2-bl .hb-qv2-ring { padding: calc(var(--hb-qv2-bw) + 2px); }
.hb-qv2-in {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  opacity: calc(var(--hb-qv2-i) * 0.32);
  background: conic-gradient(
    from calc(var(--hb-qv2-a) - var(--hb-qv2-w) * 1.4) at 50% 50%,
    transparent 0deg,
    var(--hb-qv2-acc) calc(var(--hb-qv2-w) * 1.4),
    transparent calc(var(--hb-qv2-w) * 2.8),
    transparent 360deg
  );
  -webkit-mask-image: radial-gradient(ellipse farthest-side at 50% 50%, transparent 48%, #000 100%);
  mask-image: radial-gradient(ellipse farthest-side at 50% 50%, transparent 48%, #000 100%);
}
.hb-qv2-c {
  position: relative;
  z-index: 1;
  border-radius: inherit;
}
`;

export function CardBorderGlow({
  accent = "#2f7bff",
  radius = 18,
  borderWidth = 1.5,
  arc = 76,
  bloom = 14,
  speed = 9,
  idle = true,
  className = "",
  style,
  children,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  ...rest
}: CardBorderGlowProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const wake = React.useRef<(() => void) | null>(null);
  const sim = React.useRef({ a: 20, i: 0.7, ta: 20, ti: 0.7, active: false, visible: true, running: false, raf: 0, t0: 0 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const s = sim.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function write() {
      if (!el) return;
      el.style.setProperty("--hb-qv2-a", `${s.a.toFixed(2)}deg`);
      el.style.setProperty("--hb-qv2-i", s.i.toFixed(3));
    }

    function tick(ts: number) {
      s.running = false;
      if (!s.visible) return;
      if (!s.active) {
        s.ta = ((ts / 1000) * (360 / Math.max(1, speed)) + 20) % 360;
        s.ti = idle ? 0.7 : 0.18;
      }
      const delta = ((s.ta - s.a + 540) % 360) - 180;
      s.a = (s.a + delta * 0.12 + 360) % 360;
      s.i += (s.ti - s.i) * 0.1;
      write();
      const settling = Math.abs(delta) > 0.1 || Math.abs(s.ti - s.i) > 0.002;
      if ((idle && !reduced) || s.active || settling) {
        s.running = true;
        s.raf = requestAnimationFrame(tick);
      }
    }

    function ensure() {
      if (reduced) {
        s.a = s.ta;
        s.i = s.ti;
        write();
        return;
      }
      if (s.running || !s.visible) return;
      s.running = true;
      s.raf = requestAnimationFrame(tick);
    }

    wake.current = ensure;
    ensure();

    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
      if (s.visible) ensure();
    });
    io.observe(el);

    return () => {
      wake.current = null;
      io.disconnect();
      cancelAnimationFrame(s.raf);
      s.running = false;
    };
  }, [idle, speed]);

  function aim(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const s = sim.current;
    s.active = true;
    s.ti = 1;
    s.ta = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
    wake.current?.();
  }

  const vars = {
    "--hb-qv2-acc": accent,
    "--hb-qv2-r": `${radius}px`,
    "--hb-qv2-bw": `${borderWidth}px`,
    "--hb-qv2-w": `${(arc / 2).toFixed(2)}deg`,
    "--hb-qv2-bl": `${bloom}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-card-border-glow" precedence="default">{css}</style>
      <div
        ref={ref}
        className={`hb-qv2 ${className}`}
        style={vars}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          aim(e);
        }}
        onPointerMove={(e) => {
          onPointerMove?.(e);
          aim(e);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          const s = sim.current;
          s.active = false;
          s.ti = idle ? 0.7 : 0.18;
          wake.current?.();
        }}
        {...rest}
      >
        <span className="hb-qv2-ln" aria-hidden="true">
          <span className="hb-qv2-ring" />
        </span>
        <span className="hb-qv2-bl" aria-hidden="true">
          <span className="hb-qv2-ring hb-qv2-hot" />
        </span>
        <span className="hb-qv2-in" aria-hidden="true" />
        <span className="hb-qv2-lt" aria-hidden="true">
          <span className="hb-qv2-ring hb-qv2-hot" />
        </span>
        <div className="hb-qv2-c">{children}</div>
      </div>
    </>
  );
}
