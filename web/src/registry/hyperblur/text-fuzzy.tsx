"use client";

import * as React from "react";

export interface TextFuzzyProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  baseIntensity?: number;
  hoverIntensity?: number;
  frequency?: number;
  fps?: number;
  glow?: boolean;
}

const css = `
.hb-qd4 {
  position: relative;
  display: inline-block;
  max-width: 100%;
  padding: 0.1em 0.12em;
  line-height: 1.1;
  cursor: default;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-qd4-svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
}
.hb-qd4-t { display: inline-block; max-width: 100%; }
.hb-qd4[data-glow] .hb-qd4-t { text-shadow: 0 0 0.35em color-mix(in srgb, currentColor 45%, transparent); }
`;

export function TextFuzzy({
  text,
  baseIntensity = 2,
  hoverIntensity = 14,
  frequency = 0.7,
  fps = 14,
  glow = true,
  className = "",
  style,
  ...rest
}: TextFuzzyProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = `hb-qd4-${uid}`;
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const noiseRef = React.useRef<SVGFETurbulenceElement>(null);
  const mapRef = React.useRef<SVGFEDisplacementMapElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const noise = noiseRef.current;
    const map = mapRef.current;
    if (!root || !noise || !map) return;
    map.setAttribute("scale", String(baseIntensity));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = 1000 / Math.max(1, fps);
    const start = performance.now();
    let hovered = false;
    let level = baseIntensity;
    let lastSeed = -1;
    let shownScale = -1;
    let visible = true;
    let raf = 0;

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const t = (now - start) / 1000;
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.4);
      const target = hovered
        ? hoverIntensity
        : baseIntensity + (hoverIntensity - baseIntensity) * 0.28 * pulse * pulse;
      level += (target - level) * 0.12;
      const step = Math.floor((now - start) / interval);
      if (step !== lastSeed) {
        lastSeed = step;
        noise.setAttribute("seed", String(1 + (step % 97)));
      }
      if (Math.abs(level - shownScale) > 0.05) {
        shownScale = level;
        map.setAttribute("scale", level.toFixed(2));
      }
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };
    const on = () => {
      hovered = true;
    };
    const off = () => {
      hovered = false;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });
    io.observe(root);
    root.addEventListener("pointerenter", on);
    root.addEventListener("pointerleave", off);
    root.addEventListener("pointercancel", off);
    root.addEventListener("focus", on);
    root.addEventListener("blur", off);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      root.removeEventListener("pointerenter", on);
      root.removeEventListener("pointerleave", off);
      root.removeEventListener("pointercancel", off);
      root.removeEventListener("focus", on);
      root.removeEventListener("blur", off);
    };
  }, [baseIntensity, hoverIntensity, fps]);

  const fx = (frequency * 0.02).toFixed(4);
  const fy = frequency.toFixed(3);

  return (
    <span
      ref={rootRef}
      className={`hb-qd4 ${className}`}
      style={style}
      data-glow={glow ? "" : undefined}
      {...rest}
    >
      <style href="hb-text-fuzzy" precedence="default">{css}</style>
      <svg className="hb-qd4-svg" aria-hidden="true" focusable="false" width="0" height="0">
        <filter id={id} x="-12%" y="-30%" width="124%" height="160%" colorInterpolationFilters="sRGB">
          <feTurbulence
            ref={noiseRef}
            type="fractalNoise"
            baseFrequency={`${fx} ${fy}`}
            numOctaves="2"
            seed="1"
            result="noise"
          />
          <feDisplacementMap
            ref={mapRef}
            in="SourceGraphic"
            in2="noise"
            scale={baseIntensity}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <span className="hb-qd4-t" style={{ filter: `url(#${id})` }}>
        {text}
      </span>
    </span>
  );
}
