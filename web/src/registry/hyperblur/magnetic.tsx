"use client";

import * as React from "react";

export interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  /** What to pull toward the cursor. */
  children: React.ReactNode;
  /** Fraction of the cursor offset the child follows (0 to 1). */
  strength?: number;
  /** Distance in pixels from the center where the pull reaches. */
  radius?: number;
  /** Seconds the spring back takes. */
  ease?: number;
}

const css = `
.hb-mg { display: inline-block; }
.hb-mg > .hb-mg-i {
  display: inline-block;
  transform: translate3d(var(--hb-x, 0px), var(--hb-y, 0px), 0);
  transition: transform var(--hb-e) cubic-bezier(.34, 1.56, .64, 1);
  will-change: transform;
}
.hb-mg > .hb-mg-i[data-active="true"] { transition: transform .12s ease-out; }
@media (prefers-reduced-motion: reduce) { .hb-mg > .hb-mg-i { transform: none !important; transition: none !important; } }
`;

export function Magnetic({
  children,
  strength = 0.35,
  radius = 120,
  ease = 0.4,
  className = "",
  style,
  ...rest
}: MagneticProps) {
  const outer = React.useRef<HTMLDivElement>(null);
  const inner = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const box = outer.current;
    const el = inner.current;
    if (!box || !el) return;

    // the outer box never moves, so the center stays stable while the child drifts
    function move(e: PointerEvent) {
      if (!box || !el || e.pointerType === "touch") return;
      const r = box.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) > radius) return reset();
      el.dataset.active = "true";
      el.style.setProperty("--hb-x", `${(dx * strength).toFixed(2)}px`);
      el.style.setProperty("--hb-y", `${(dy * strength).toFixed(2)}px`);
    }

    function reset() {
      if (!el) return;
      el.dataset.active = "false";
      el.style.setProperty("--hb-x", "0px");
      el.style.setProperty("--hb-y", "0px");
    }

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [strength, radius]);

  const vars = { "--hb-e": `${ease}s`, ...style } as React.CSSProperties;

  return (
    <div ref={outer} className={`hb-mg ${className}`} style={vars} {...rest}>
      <style href="hb-magnetic" precedence="default">{css}</style>
      <div ref={inner} className="hb-mg-i" data-active="false">
        {children}
      </div>
    </div>
  );
}
