"use client";

import * as React from "react";

export interface TextPathFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  separator?: string;
  speed?: number;
  amplitude?: number;
  waves?: number;
  fontSize?: number;
  width?: number;
  height?: number;
  accent?: string;
  guide?: boolean;
  reverse?: boolean;
}

const css = `
.hb-vi8 { display: block; width: 100%; font-family: inherit; box-sizing: border-box; }
.hb-vi8-svg { display: block; width: 100%; height: auto; overflow: visible; }
.hb-vi8-text { font-family: inherit; letter-spacing: 0.01em; }
.hb-vi8-guide {
  fill: none;
  stroke: var(--hb-vi8-accent);
  stroke-opacity: 0.32;
  stroke-width: 1;
  stroke-dasharray: 2 7;
  stroke-linecap: round;
}
`;

function wavePath(w: number, h: number, amp: number, waves: number, phase: number) {
  const steps = 64;
  const mid = h / 2;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = -w * 0.05 + t * w * 1.1;
    const env = Math.sin(Math.PI * Math.min(1, Math.max(0, t))) * 0.35 + 0.65;
    const y = mid + Math.sin(t * Math.PI * 2 * waves + phase) * amp * env;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d.trim();
}

export function TextPathFlow({
  text,
  separator = "  •  ",
  speed = 60,
  amplitude = 28,
  waves = 1.5,
  fontSize = 34,
  width = 600,
  height = 160,
  accent = "#7fb3ff",
  guide = true,
  reverse = false,
  className = "",
  style,
  ...rest
}: TextPathFlowProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const pathId = `hb-vi8-p${uid}`;
  const gradId = `hb-vi8-g${uid}`;
  const maskId = `hb-vi8-m${uid}`;
  const fadeId = `hb-vi8-f${uid}`;
  const svgRef = React.useRef<SVGSVGElement>(null);
  const pathRef = React.useRef<SVGPathElement>(null);
  const guideRef = React.useRef<SVGPathElement>(null);
  const tpRef = React.useRef<SVGTextPathElement>(null);
  const unitRef = React.useRef<SVGTextElement>(null);
  const [repeat, setRepeat] = React.useState(4);
  const unit = `${text}${separator}`;
  const initial = React.useMemo(() => wavePath(width, height, amplitude, waves, 0), [width, height, amplitude, waves]);

  React.useEffect(() => {
    const path = pathRef.current;
    const tp = tpRef.current;
    const probe = unitRef.current;
    const svg = svgRef.current;
    if (!path || !tp || !probe || !svg) return;
    let unitLen = 1;
    const measure = () => {
      unitLen = Math.max(1, probe.getComputedTextLength());
      const need = Math.ceil(path.getTotalLength() / unitLen) + 2;
      setRepeat((r) => (r === need ? r : need));
    };
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => undefined);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let visible = true;
    let begin = 0;
    const frame = (now: number) => {
      if (!begin) begin = now;
      const t = (now - begin) / 1000;
      const amp = amplitude * (0.82 + Math.sin(t * 0.9) * 0.18);
      const d = wavePath(width, height, amp, waves, t * 0.8 * (reverse ? -1 : 1));
      path.setAttribute("d", d);
      guideRef.current?.setAttribute("d", d);
      const travel = (t * speed) % unitLen;
      const off = reverse ? travel - unitLen : -travel;
      tp.setAttribute("startOffset", off.toFixed(1));
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((e) => e.isIntersecting);
            if (visible && !raf) raf = requestAnimationFrame(frame);
          })
        : null;
    io?.observe(svg);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [amplitude, waves, width, height, speed, reverse, unit]);

  const vars = { "--hb-vi8-accent": accent, ...style } as React.CSSProperties;

  return (
    <div className={`hb-vi8 ${className}`} style={vars} {...rest}>
      <style href="hb-text-path-flow" precedence="default">{css}</style>
      <svg
        ref={svgRef}
        className="hb-vi8-svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={text}
      >
        <title>{text}</title>
        <defs>
          <path id={pathId} ref={pathRef} d={initial} />
          <linearGradient id={gradId} x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={accent} />
            <stop offset="0.5" stopColor="#f4f6fb" />
            <stop offset="1" stopColor={accent} />
          </linearGradient>
          <linearGradient id={fadeId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.12" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.88" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
            <rect x="0" y="0" width={width} height={height} fill={`url(#${fadeId})`} />
          </mask>
        </defs>
        <text ref={unitRef} className="hb-vi8-text" fontSize={fontSize} opacity="0" aria-hidden="true" style={{ whiteSpace: "pre" }}>
          {unit}
        </text>
        <g mask={`url(#${maskId})`} aria-hidden="true">
          {guide ? <path ref={guideRef} className="hb-vi8-guide" d={initial} transform={`translate(0 ${(fontSize * 0.42).toFixed(1)})`} /> : null}
          <text className="hb-vi8-text" fontSize={fontSize} fill={`url(#${gradId})`} fontWeight={600} style={{ whiteSpace: "pre" }}>
            <textPath ref={tpRef} href={`#${pathId}`} startOffset="0">
              {Array.from({ length: repeat }, () => unit).join("")}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
}
