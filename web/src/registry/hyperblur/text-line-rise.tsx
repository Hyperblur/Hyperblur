"use client";

import * as React from "react";

export interface TextLineRiseProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  rule?: boolean;
  ruleColor?: string;
  once?: boolean;
  loop?: number;
}

const css = `
@keyframes hb-vi6-rise {
  0% { transform: translate3d(0, 112%, 0) skewY(7deg) scaleY(1.3); }
  100% { transform: translate3d(0, 0, 0) skewY(0deg) scaleY(1); }
}
@keyframes hb-vi6-rule {
  0% { transform: scaleX(0); opacity: 1; }
  55% { transform: scaleX(1); opacity: 1; }
  100% { transform: scaleX(1); opacity: 0.35; }
}
.hb-vi6 { position: relative; display: block; font-family: inherit; box-sizing: border-box; }
.hb-vi6 *, .hb-vi6 *::before, .hb-vi6 *::after { box-sizing: border-box; }
.hb-vi6-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi6-measure {
  position: absolute;
  inset: 0;
  visibility: hidden;
  pointer-events: none;
}
.hb-vi6-hold { visibility: hidden; }
.hb-vi6-line {
  position: relative;
  display: block;
  overflow: hidden;
  padding: 0.06em 0 0.14em;
  margin: -0.06em 0 -0.14em;
  white-space: nowrap;
}
.hb-vi6-in {
  display: inline-block;
  transform: translate3d(0, 112%, 0);
  transform-origin: 0 100%;
  will-change: transform;
}
.hb-vi6-rule {
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 1px;
  background: var(--hb-vi6-rule);
  transform: scaleX(0);
  transform-origin: 0 50%;
}
.hb-vi6[data-active] .hb-vi6-in {
  animation: hb-vi6-rise var(--hb-vi6-dur) cubic-bezier(.16, 1, .3, 1) both;
  animation-delay: calc(var(--hb-vi6-delay) + var(--hb-vi6-n) * var(--hb-vi6-stagger) + var(--hb-vi6-dur) * 0.18);
}
.hb-vi6[data-active] .hb-vi6-rule {
  animation: hb-vi6-rule calc(var(--hb-vi6-dur) * 1.3) cubic-bezier(.65, 0, .35, 1) both;
  animation-delay: calc(var(--hb-vi6-delay) + var(--hb-vi6-n) * var(--hb-vi6-stagger));
}
@media (prefers-reduced-motion: reduce) {
  .hb-vi6 .hb-vi6-in { transform: none; animation: none !important; will-change: auto; }
  .hb-vi6 .hb-vi6-rule { display: none; }
}
`;

export function TextLineRise({
  text,
  stagger = 0.1,
  duration = 1,
  delay = 0,
  rule = true,
  ruleColor = "rgba(255, 255, 255, 0.22)",
  once = true,
  loop = 0,
  className = "",
  style,
  ...rest
}: TextLineRiseProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);
  const words = React.useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const [lines, setLines] = React.useState<string[] | null>(null);
  const [inView, setInView] = React.useState(false);
  const [resting, setResting] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);

  React.useLayoutEffect(() => {
    const box = measureRef.current;
    if (!box) return;
    const measure = () => {
      const spans = Array.from(box.querySelectorAll<HTMLSpanElement>("[data-w]"));
      const out: string[] = [];
      let top = Number.NaN;
      let current: string[] = [];
      spans.forEach((s) => {
        const t = Math.round(s.offsetTop);
        if (current.length && Math.abs(t - top) > 2) {
          out.push(current.join(" "));
          current = [];
        }
        if (!current.length) top = t;
        current.push(s.textContent ?? "");
      });
      if (current.length) out.push(current.join(" "));
      setLines((prev) => (prev && prev.join("\n") === out.join("\n") ? prev : out));
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => undefined);
    return () => ro.disconnect();
  }, [words]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const count = lines ? lines.length : 1;

  React.useEffect(() => {
    if (!inView || loop <= 0) return;
    if (resting) {
      const id = setTimeout(() => {
        setResting(false);
        setCycle((c) => c + 1);
      }, 420);
      return () => clearTimeout(id);
    }
    const total = (delay + duration * 1.4 + stagger * count + loop) * 1000;
    const id = setTimeout(() => setResting(true), total);
    return () => clearTimeout(id);
  }, [inView, loop, resting, delay, duration, stagger, count]);

  const vars = {
    "--hb-vi6-dur": `${duration}s`,
    "--hb-vi6-delay": `${delay}s`,
    "--hb-vi6-stagger": `${stagger}s`,
    "--hb-vi6-rule": ruleColor,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={`hb-vi6 ${className}`}
      style={vars}
      data-active={inView && lines && !resting ? "" : undefined}
      {...rest}
    >
      <style href="hb-text-line-rise" precedence="default">{css}</style>
      <span className="hb-vi6-sr">{text}</span>
      <div ref={measureRef} className="hb-vi6-measure" aria-hidden="true">
        {words.map((w, i) => (
          <React.Fragment key={i}>
            <span data-w="">{w}</span>{" "}
          </React.Fragment>
        ))}
      </div>
      {lines ? (
        <div aria-hidden="true" key={cycle}>
          {lines.map((line, i) => (
            <span className="hb-vi6-line" key={`${i}-${line}`} style={{ "--hb-vi6-n": i } as React.CSSProperties}>
              {rule ? <span className="hb-vi6-rule" /> : null}
              <span className="hb-vi6-in">{line}</span>
            </span>
          ))}
        </div>
      ) : (
        <div className="hb-vi6-hold" aria-hidden="true">{text}</div>
      )}
    </div>
  );
}
