"use client";

import * as React from "react";

export interface HoverDistortImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  title?: string;
  caption?: string;
  intensity?: number;
  split?: number;
  autoPlay?: boolean;
  ratio?: number;
}

const css = `
.hb-wg5 { position: relative; box-sizing: border-box; width: 100%; border-radius: 14px; overflow: hidden; font-family: inherit; color: #ededed; background: #0d0d0d; box-shadow: 0 0 0 1px #262626, 0 22px 40px -24px rgba(0,0,0,.9); isolation: isolate; touch-action: pan-y; cursor: crosshair; }
.hb-wg5 *, .hb-wg5 *::before, .hb-wg5 *::after { box-sizing: border-box; }
.hb-wg5-svg { display: block; width: 100%; height: 100%; }
.hb-wg5-img { transform-origin: 50% 50%; transition: transform 1.1s cubic-bezier(.16,1,.3,1); }
.hb-wg5[data-live="true"] .hb-wg5-img { transform: scale(1.04); }
.hb-wg5-meta { position: absolute; left: 12px; right: 12px; bottom: 11px; display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; pointer-events: none; }
.hb-wg5-title { margin: 0; font-size: 15px; font-weight: 650; letter-spacing: -.015em; line-height: 1.1; text-shadow: 0 1px 10px rgba(0,0,0,.5); }
.hb-wg5-cap { margin: 3px 0 0; font-family: var(--font-mono, ui-monospace, monospace); font-size: 9.5px; letter-spacing: .06em; text-transform: uppercase; color: rgba(237,237,237,.7); }
.hb-wg5-gauge { display: flex; align-items: flex-end; gap: 2px; height: 16px; }
.hb-wg5-bar { width: 3px; border-radius: 1px; background: rgba(255,255,255,.22); height: 30%; transition: height .18s ease-out, background .2s ease; }
.hb-wg5-bar[data-on="true"] { background: #ededed; }
.hb-wg5::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,.55)); }
.hb-wg5-meta { z-index: 1; }
@media (prefers-reduced-motion: reduce) {
  .hb-wg5-img, .hb-wg5-bar { transition: none; }
  .hb-wg5[data-live="true"] .hb-wg5-img { transform: none; }
}
`;

function Scene() {
  return (
    <>
      <defs>
        <linearGradient id="hb-wg5-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1446" />
          <stop offset=".45" stopColor="#c2417a" />
          <stop offset=".72" stopColor="#ff9a5a" />
          <stop offset="1" stopColor="#ffd59a" />
        </linearGradient>
        <linearGradient id="hb-wg5-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a1f55" />
          <stop offset="1" stopColor="#0a0b1e" />
        </linearGradient>
        <radialGradient id="hb-wg5-sun" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fff4d6" />
          <stop offset=".7" stopColor="#ffd08a" />
          <stop offset="1" stopColor="#ff9a5a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="url(#hb-wg5-sky)" />
      <circle cx="200" cy="150" r="64" fill="url(#hb-wg5-sun)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="120" y={(122 + i * 8.5).toFixed(1)} width="160" height={(1.2 + i * 0.9).toFixed(1)} fill="#c2417a" opacity=".85" />
      ))}
      <path d="M0 160 L46 128 L84 146 L132 112 L170 150 L0 160Z" fill="#2a1847" />
      <path d="M230 160 L270 120 L300 138 L344 104 L400 140 L400 160Z" fill="#251540" />
      <rect y="158" width="400" height="102" fill="url(#hb-wg5-sea)" />
      {Array.from({ length: 14 }, (_, i) => {
        const y = 164 + i * 7;
        const w = 30 + i * 9;
        return <rect key={i} x={(200 - w / 2).toFixed(1)} y={y} width={w.toFixed(1)} height="1.6" rx=".8" fill="#ffc38a" opacity={(0.75 - i * 0.045).toFixed(3)} />;
      })}
    </>
  );
}

export function HoverDistortImage({
  src,
  title = "Low tide, Algarve",
  caption = "Frame 0412 · 35mm",
  intensity = 34,
  split = 5,
  autoPlay = true,
  ratio = 0.62,
  className = "",
  style,
  ...rest
}: HoverDistortImageProps) {
  const rawId = React.useId();
  const id = `hb-wg5-f${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const turbRef = React.useRef<SVGFETurbulenceElement>(null);
  const dispRef = React.useRef<SVGFEDisplacementMapElement>(null);
  const rRef = React.useRef<SVGFEOffsetElement>(null);
  const bRef = React.useRef<SVGFEOffsetElement>(null);
  const gaugeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const turb = turbRef.current;
    const disp = dispRef.current;
    const ro = rRef.current;
    const bo = bRef.current;
    const gauge = gaugeRef.current;
    if (!root || !turb || !disp || !ro || !bo || !gauge) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bars = Array.from(gauge.children) as HTMLElement[];
    let lx = 0;
    let ly = 0;
    let has = false;
    let energy = 0;
    let dirX = 1;
    let dirY = 0;
    let inside = false;
    let t = 0;
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      if (!inside && autoPlay) {
        const pulse = Math.pow(Math.max(0, Math.sin(t * 1.1)), 6);
        energy = Math.max(energy, pulse * 0.75);
      }
      energy *= Math.exp(-dt * 2.4);
      const e = Math.min(1, energy);
      const scale = intensity * e;
      const f1 = 0.012 + 0.01 * e + 0.002 * Math.sin(t * 3.1);
      const f2 = 0.03 + 0.05 * e;
      turb.setAttribute("baseFrequency", `${f1.toFixed(4)} ${f2.toFixed(4)}`);
      disp.setAttribute("scale", scale.toFixed(2));
      const off = split * e;
      ro.setAttribute("dx", (off * dirX).toFixed(2));
      ro.setAttribute("dy", (off * dirY).toFixed(2));
      bo.setAttribute("dx", (-off * dirX).toFixed(2));
      bo.setAttribute("dy", (-off * dirY).toFixed(2));
      root.dataset.live = inside || e > 0.15 ? "true" : "false";
      bars.forEach((b, i) => {
        const on = e > (i + 0.5) / bars.length;
        b.dataset.on = on ? "true" : "false";
        b.style.height = `${(30 + 70 * Math.min(1, e * bars.length / (i + 1))).toFixed(0)}%`;
      });
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      inside = true;
      if (has) {
        const dx = e.clientX - lx;
        const dy = e.clientY - ly;
        const d = Math.hypot(dx, dy);
        if (d > 0.5) {
          dirX = dirX * 0.7 + (dx / d) * 0.3;
          dirY = dirY * 0.7 + (dy / d) * 0.3;
          const m = Math.hypot(dirX, dirY) || 1;
          dirX /= m;
          dirY /= m;
        }
        energy = Math.min(1.2, energy + d * 0.012);
      }
      lx = e.clientX;
      ly = e.clientY;
      has = true;
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      energy = Math.min(1.2, energy + 0.6);
    };
    const onLeave = () => {
      inside = false;
      has = false;
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    start();
    return () => {
      stop();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
    };
  }, [intensity, split, autoPlay]);

  const h = Math.round(400 * ratio);

  return (
    <div ref={rootRef} className={`hb-wg5 ${className}`} style={{ aspectRatio: `400 / ${h}`, ...style }} data-live="false" role="img" aria-label={title} {...rest}>
      <style href="hb-hover-distort-image" precedence="default">{css}</style>
      <svg className="hb-wg5-svg" viewBox={`0 0 400 ${h}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <filter id={id} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.012 0.03" numOctaves={2} seed={3} result="noise" />
            <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale={0} xChannelSelector="R" yChannelSelector="G" result="warp" />
            <feColorMatrix in="warp" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feOffset ref={rRef} in="red" dx={0} dy={0} result="red2" />
            <feColorMatrix in="warp" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            <feColorMatrix in="warp" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feOffset ref={bRef} in="blue" dx={0} dy={0} result="blue2" />
            <feBlend in="red2" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue2" mode="screen" />
          </filter>
        </defs>
        <g className="hb-wg5-img" filter={`url(#${id})`}>
          {src ? <image href={src} width="400" height={h} preserveAspectRatio="xMidYMid slice" /> : <Scene />}
        </g>
      </svg>
      <div className="hb-wg5-meta">
        <div>
          <p className="hb-wg5-title">{title}</p>
          <p className="hb-wg5-cap">{caption}</p>
        </div>
        <div ref={gaugeRef} className="hb-wg5-gauge" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="hb-wg5-bar" data-on="false" />
          ))}
        </div>
      </div>
    </div>
  );
}
