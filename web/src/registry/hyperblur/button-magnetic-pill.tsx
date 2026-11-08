"use client";

import * as React from "react";

export interface ButtonMagneticPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  radius?: number;
  strength?: number;
  stretch?: number;
  variant?: "light" | "accent" | "dark";
  accent?: string;
  arrow?: boolean;
}

const css = `
.hb-xb11 {
  --hb-xb11-c: #2f7bff;
  --hb-xb11-tx: 0px;
  --hb-xb11-ty: 0px;
  --hb-xb11-a: 0deg;
  --hb-xb11-k: 0;
  --hb-xb11-gx: 50%;
  --hb-xb11-gy: 0%;
  --hb-xb11-gl: 0;
  --hb-xb11-bg: linear-gradient(180deg, #ffffff 0%, #ececec 100%);
  --hb-xb11-fg: #0a0a0a;
  --hb-xb11-sh: 0 14px 30px -14px rgba(255, 255, 255, 0.35), 0 4px 12px -4px rgba(0, 0, 0, 0.6);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 46px;
  margin: 0;
  padding: 0 24px;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--hb-xb11-fg);
  cursor: pointer;
  isolation: isolate;
  -webkit-tap-highlight-color: transparent;
  transform: translate(var(--hb-xb11-tx), var(--hb-xb11-ty));
  transition: transform 0.75s cubic-bezier(0.2, 1.65, 0.38, 1);
}
.hb-xb11 *, .hb-xb11 *::before, .hb-xb11 *::after { box-sizing: border-box; }
.hb-xb11[data-variant="accent"] {
  --hb-xb11-bg: linear-gradient(180deg, color-mix(in srgb, var(--hb-xb11-c) 82%, #fff) 0%, var(--hb-xb11-c) 60%, color-mix(in srgb, var(--hb-xb11-c) 88%, #000) 100%);
  --hb-xb11-fg: #ffffff;
  --hb-xb11-sh: 0 14px 30px -12px var(--hb-xb11-c), 0 4px 12px -4px rgba(0, 0, 0, 0.6);
}
.hb-xb11[data-variant="dark"] {
  --hb-xb11-bg: linear-gradient(180deg, #262626 0%, #171717 100%);
  --hb-xb11-fg: #ededed;
  --hb-xb11-sh: 0 0 0 1px #303030, 0 14px 30px -14px rgba(0, 0, 0, 0.95);
}
.hb-xb11[data-live="true"] { transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xb11-skin {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 999px;
  background: var(--hb-xb11-bg);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.12), var(--hb-xb11-sh);
  transform: rotate(var(--hb-xb11-a)) scale(calc(1 + var(--hb-xb11-k)), calc(1 - var(--hb-xb11-k) * 0.38)) rotate(calc(var(--hb-xb11-a) * -1));
  transition: transform 0.8s cubic-bezier(0.2, 1.8, 0.35, 1), box-shadow 0.3s ease;
  overflow: hidden;
}
.hb-xb11[data-variant="dark"] .hb-xb11-skin { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.09), var(--hb-xb11-sh); }
.hb-xb11[data-live="true"] .hb-xb11-skin { transition: transform 0.16s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xb11-skin::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(70px 46px at var(--hb-xb11-gx) var(--hb-xb11-gy), rgba(255, 255, 255, 0.55), transparent 70%);
  opacity: var(--hb-xb11-gl);
  mix-blend-mode: soft-light;
  transition: opacity 0.4s ease;
}
.hb-xb11-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transform: translate(calc(var(--hb-xb11-tx) * 0.45), calc(var(--hb-xb11-ty) * 0.45));
  transition: transform 0.9s cubic-bezier(0.2, 1.65, 0.38, 1);
}
.hb-xb11[data-live="true"] .hb-xb11-label { transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xb11-arrow { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xb11:hover .hb-xb11-arrow { transform: translateX(3px); }
.hb-xb11:active:not(:disabled) .hb-xb11-skin { transform: rotate(var(--hb-xb11-a)) scale(calc(0.95 + var(--hb-xb11-k)), calc(0.92 - var(--hb-xb11-k) * 0.38)) rotate(calc(var(--hb-xb11-a) * -1)); transition-duration: 0.12s; }
.hb-xb11:focus-visible { outline: none; }
.hb-xb11:focus-visible .hb-xb11-skin { outline: 2px solid var(--hb-xb11-c); outline-offset: 3px; }
.hb-xb11[data-variant="accent"]:focus-visible .hb-xb11-skin { outline-color: #ffffff; }
.hb-xb11:disabled { cursor: not-allowed; opacity: 0.45; }
@media (prefers-reduced-motion: reduce) {
  .hb-xb11, .hb-xb11 * { transition-duration: 0.01s !important; }
}
`;

export function ButtonMagneticPill({
  children = "Get early access",
  radius = 110,
  strength = 0.35,
  stretch = 0.22,
  variant = "light",
  accent = "#2f7bff",
  arrow = true,
  disabled = false,
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonMagneticPillProps) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    let live = false;
    const reset = () => {
      live = false;
      el.dataset.live = "false";
      el.style.setProperty("--hb-xb11-tx", "0px");
      el.style.setProperty("--hb-xb11-ty", "0px");
      el.style.setProperty("--hb-xb11-k", "0");
      el.style.setProperty("--hb-xb11-gl", "0");
    };
    const frame = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const tx = parseFloat(el.style.getPropertyValue("--hb-xb11-tx")) || 0;
      const ty = parseFloat(el.style.getPropertyValue("--hb-xb11-ty")) || 0;
      const cx = r.left - tx + r.width / 2;
      const cy = r.top - ty + r.height / 2;
      const dx = px - cx;
      const dy = py - cy;
      const ex = Math.max(0, Math.abs(dx) - r.width / 2);
      const ey = Math.max(0, Math.abs(dy) - r.height / 2);
      const edge = Math.hypot(ex, ey);
      if (edge > radius) {
        if (live) reset();
        return;
      }
      const t = 1 - edge / radius;
      const f = t * t * (3 - 2 * t);
      const reach = Math.min(1, Math.hypot(dx, dy) / (r.width / 2 + radius));
      live = true;
      el.dataset.live = "true";
      el.style.setProperty("--hb-xb11-tx", `${(dx * strength * f).toFixed(2)}px`);
      el.style.setProperty("--hb-xb11-ty", `${(dy * strength * f * 1.2).toFixed(2)}px`);
      el.style.setProperty("--hb-xb11-a", `${((Math.atan2(dy, dx) * 180) / Math.PI).toFixed(1)}deg`);
      el.style.setProperty("--hb-xb11-k", (reach * f * stretch).toFixed(4));
      const gx = Math.max(0, Math.min(100, ((px - (cx - r.width / 2)) / r.width) * 100));
      const gy = Math.max(0, Math.min(100, ((py - (cy - r.height / 2)) / r.height) * 100));
      el.style.setProperty("--hb-xb11-gx", `${gx.toFixed(1)}%`);
      el.style.setProperty("--hb-xb11-gy", `${gy.toFixed(1)}%`);
      el.style.setProperty("--hb-xb11-gl", f.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      reset();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      reset();
    };
  }, [radius, strength, stretch, disabled]);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={`hb-xb11 ${className}`.trim()}
      data-variant={variant}
      data-live="false"
      style={{ "--hb-xb11-c": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-button-magnetic-pill" precedence="default">{css}</style>
      <span className="hb-xb11-skin" aria-hidden="true" />
      <span className="hb-xb11-label">
        {children}
        {arrow && (
          <svg className="hb-xb11-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        )}
      </span>
    </button>
  );
}
