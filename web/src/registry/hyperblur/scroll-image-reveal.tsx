"use client";

import * as React from "react";

export interface ScrollImageRevealProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  src?: string;
  alt?: string;
  eyebrow?: string;
  caption?: string;
  detail?: string;
  aspect?: string;
  axis?: "vertical" | "horizontal";
  radius?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  loop?: boolean;
  loopHold?: number;
  accent?: string;
}

const css = `
.hb-zb2 {
  --hb-zb2-a: #ff9f6e;
  --hb-zb2-d: 1400ms;
  --hb-zb2-r: 20px;
  --hb-zb2-ease: cubic-bezier(0.77, 0, 0.18, 1);
  position: relative;
  display: block;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  color: #ededed;
  font-family: inherit;
}
.hb-zb2 *, .hb-zb2 *::before, .hb-zb2 *::after { box-sizing: border-box; }
.hb-zb2-wrap {
  width: 100%;
  filter: drop-shadow(0 0 14px color-mix(in srgb, var(--hb-zb2-a) 75%, transparent));
  transition: filter var(--hb-zb2-d) var(--hb-zb2-ease);
}
.hb-zb2[data-in="true"] .hb-zb2-wrap { filter: drop-shadow(0 18px 36px rgba(0, 0, 0, 0.45)); }
.hb-zb2-frame {
  position: relative;
  width: 100%;
  overflow: hidden;
  aspect-ratio: var(--hb-zb2-ar, 4 / 3);
  background: #141414;
  clip-path: inset(calc(50% - 1.5px) 0 round 2px);
  transition: clip-path var(--hb-zb2-d) var(--hb-zb2-ease);
}
.hb-zb2[data-axis="horizontal"] .hb-zb2-frame { clip-path: inset(0 calc(50% - 1.5px) round 2px); }
.hb-zb2[data-in="true"] .hb-zb2-frame { clip-path: inset(0 0 0 0 round var(--hb-zb2-r)); }
.hb-zb2-media {
  position: absolute;
  inset: 0;
  transform: scale(1.3);
  transform-origin: 50% 60%;
  transition: transform calc(var(--hb-zb2-d) * 1.25) var(--hb-zb2-ease);
}
.hb-zb2[data-in="true"] .hb-zb2-media { transform: scale(1); }
.hb-zb2[data-in="true"]:hover .hb-zb2-media { transform: scale(1.035); transition-duration: 1.2s; }
.hb-zb2-img, .hb-zb2-svg { display: block; width: 100%; height: 100%; object-fit: cover; }
.hb-zb2-img { background-size: cover; background-position: center; }
.hb-zb2-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(8, 8, 12, 0.78), rgba(8, 8, 12, 0) 52%);
  opacity: 0;
  transition: opacity calc(var(--hb-zb2-d) * 0.6) ease calc(var(--hb-zb2-d) * 0.4);
}
.hb-zb2[data-in="true"] .hb-zb2-shade { opacity: 1; }
.hb-zb2-cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: clamp(14px, 4cqw, 28px);
}
.hb-zb2-ln { display: block; overflow: hidden; padding-bottom: 0.12em; }
.hb-zb2-tx {
  display: block;
  transform: translateY(115%);
  transition: transform calc(var(--hb-zb2-d) * 0.7) var(--hb-zb2-ease) calc(var(--hb-zb2-d) * 0.5 + var(--hb-zb2-i, 0) * 110ms);
}
.hb-zb2[data-in="true"] .hb-zb2-tx { transform: translateY(0); }
.hb-zb2-eb {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--hb-zb2-a) 80%, #ffffff);
}
.hb-zb2-ti { font-size: clamp(20px, 5.4cqw, 34px); font-weight: 600; line-height: 1.1; letter-spacing: -0.02em; color: #ffffff; }
.hb-zb2-de { font-size: 13px; line-height: 1.4; color: rgba(255, 255, 255, 0.72); }
@media (prefers-reduced-motion: reduce) {
  .hb-zb2-wrap, .hb-zb2-frame, .hb-zb2-media, .hb-zb2-shade, .hb-zb2-tx { transition: none; }
  .hb-zb2-frame { clip-path: inset(0 0 0 0 round var(--hb-zb2-r)); }
  .hb-zb2-media, .hb-zb2[data-in="true"]:hover .hb-zb2-media { transform: scale(1); }
  .hb-zb2-shade { opacity: 1; }
  .hb-zb2-tx { transform: none; }
  .hb-zb2-wrap { filter: drop-shadow(0 18px 36px rgba(0, 0, 0, 0.45)); }
}
`;

function Scene({ id }: { id: string }) {
  return (
    <svg className="hb-zb2-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2547" />
          <stop offset="0.45" stopColor="#8a4f6e" />
          <stop offset="0.75" stopColor="#f08f5e" />
          <stop offset="1" stopColor="#f9cd86" />
        </linearGradient>
        <radialGradient id={`${id}-u`}>
          <stop offset="0" stopColor="#fff3d0" />
          <stop offset="0.45" stopColor="#ffc989" />
          <stop offset="1" stopColor="#ffb56b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6a26a" stopOpacity="0.7" />
          <stop offset="1" stopColor="#3b2a4f" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-s)`} />
      <g fill="#ffffff" opacity="0.8">
        <circle cx="52" cy="38" r="1.1" />
        <circle cx="118" cy="22" r="0.9" />
        <circle cx="170" cy="56" r="1.2" />
        <circle cx="236" cy="28" r="0.8" />
        <circle cx="332" cy="44" r="1.1" />
        <circle cx="372" cy="86" r="0.9" />
        <circle cx="24" cy="92" r="0.9" />
      </g>
      <circle cx="268" cy="168" r="92" fill={`url(#${id}-u)`} />
      <circle cx="268" cy="168" r="30" fill="#fff0cc" />
      <path d="M0 196 L46 168 L84 186 L138 146 L196 190 L254 160 L312 188 L360 164 L400 182 V300 H0 Z" fill="#5a3d63" opacity="0.92" />
      <path d="M0 226 L58 196 L112 218 L170 184 L236 224 L300 200 L352 220 L400 204 V300 H0 Z" fill="#33284f" />
      <rect x="0" y="236" width="400" height="64" fill={`url(#${id}-w)`} opacity="0.55" />
      <path d="M0 258 L70 240 L140 254 L212 238 L290 256 L352 244 L400 254 V300 H0 Z" fill="#171226" />
    </svg>
  );
}

export function ScrollImageReveal({
  src,
  alt = "",
  eyebrow = "Plate 07 / Dawn",
  caption = "Salt flats before the heat",
  detail = "Uyuni, Bolivia. Shot at 05:42, thirty minutes ahead of sunrise.",
  aspect = "4 / 3",
  axis = "vertical",
  radius = 20,
  duration = 1400,
  threshold = 0.25,
  once = true,
  loop = false,
  loopHold = 2800,
  accent = "#ff9f6e",
  className = "",
  style,
  ...rest
}: ScrollImageRevealProps) {
  const uid = React.useId().replace(/:/g, "");
  const ref = React.useRef<HTMLElement>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    const step = (next: boolean) => {
      setShown(next);
      timer = window.setTimeout(() => step(!next), next ? loopHold + duration : 1100);
    };
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries[entries.length - 1].isIntersecting;
        window.clearTimeout(timer);
        if (loop) {
          if (hit) step(true);
          else setShown(false);
          return;
        }
        if (hit) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [loop, once, loopHold, duration, threshold]);

  const lines = [
    { key: "eb", cls: "hb-zb2-eb", text: eyebrow },
    { key: "ti", cls: "hb-zb2-ti", text: caption },
    { key: "de", cls: "hb-zb2-de", text: detail },
  ].filter((l) => l.text);

  return (
    <figure
      ref={ref}
      data-in={shown ? "true" : "false"}
      data-axis={axis}
      className={`hb-zb2 ${className}`.trim()}
      style={
        {
          "--hb-zb2-a": accent,
          "--hb-zb2-d": `${duration}ms`,
          "--hb-zb2-r": `${radius}px`,
          "--hb-zb2-ar": aspect,
          containerType: "inline-size",
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-scroll-image-reveal" precedence="default">{css}</style>
      <div className="hb-zb2-wrap">
        <div className="hb-zb2-frame">
          <div className="hb-zb2-media">
            {src ? <div className="hb-zb2-img" role="img" aria-label={alt} style={{ backgroundImage: `url("${src}")` }} /> : <Scene id={uid} />}
          </div>
          <div className="hb-zb2-shade" aria-hidden="true" />
          <figcaption className="hb-zb2-cap">
            {lines.map((l, i) => (
              <span key={l.key} className="hb-zb2-ln">
                <span className={`hb-zb2-tx ${l.cls}`} style={{ "--hb-zb2-i": i } as React.CSSProperties}>
                  {l.text}
                </span>
              </span>
            ))}
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
