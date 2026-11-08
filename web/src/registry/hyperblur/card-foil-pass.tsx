"use client";

import * as React from "react";

export interface CardFoilPassProps extends React.HTMLAttributes<HTMLDivElement> {
  event?: string;
  edition?: string;
  name?: string;
  detail?: string;
  access?: string;
  code?: string;
  maxTilt?: number;
  idle?: boolean;
  flippable?: boolean;
  accent?: string;
  onFlip?: (flipped: boolean) => void;
}

function hash(n: number) {
  let x = Math.imul(n ^ 0x5bd1e995, 0x27d4eb2d) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x85ebca6b) >>> 0;
  return ((x ^ (x >>> 13)) >>> 0) / 4294967295;
}

const bars = Array.from({ length: 44 }, (_, i) => 1 + Math.floor(hash(i + 11) * 3));
const cells = Array.from({ length: 121 }, (_, i) => {
  const r = Math.floor(i / 11);
  const c = i % 11;
  const finder = (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3);
  return finder || hash(i * 7 + 3) > 0.52;
});

const css = `
.hb-vl10 {
  --hb-vl10-rx: 0deg;
  --hb-vl10-ry: 0deg;
  --hb-vl10-mx: 50%;
  --hb-vl10-my: 50%;
  --hb-vl10-e: 0;
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1.586;
  perspective: 900px;
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
  container-type: inline-size;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hb-vl10 *, .hb-vl10 *::before, .hb-vl10 *::after { box-sizing: border-box; }
.hb-vl10-tilt {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform: rotateX(var(--hb-vl10-rx)) rotateY(var(--hb-vl10-ry));
}
.hb-vl10-flip {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 0.9s cubic-bezier(0.65, 0, 0.35, 1), scale 0.25s ease;
}
.hb-vl10[data-flipped="true"] .hb-vl10-flip { transform: rotateY(180deg); }
.hb-vl10:active .hb-vl10-flip { scale: 0.985; }
.hb-vl10:focus-visible .hb-vl10-face { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-vl10-a), 0 30px 50px -24px rgba(0, 0, 0, 0.9); }
.hb-vl10-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 4.6cqw;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  background:
    radial-gradient(120% 90% at 0% 0%, #23262f 0%, transparent 60%),
    linear-gradient(150deg, #181a21 0%, #0d0e12 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 30px 50px -24px rgba(0, 0, 0, 0.9);
}
.hb-vl10-back { transform: rotateY(180deg); }
.hb-vl10-guil {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.22;
}
.hb-vl10-foil {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(115deg, #ff6b9d 0%, #ffd36b 7%, #7dffb2 14%, #6bd5ff 21%, #a98bff 28%, #ff6b9d 35%);
  background-size: 300% 300%;
  background-position: var(--hb-vl10-mx) var(--hb-vl10-my);
  mix-blend-mode: color-dodge;
  opacity: calc(0.18 + var(--hb-vl10-e) * 0.5);
  mask-image:
    repeating-linear-gradient(60deg, #000000 0 1px, transparent 1px 5px),
    radial-gradient(70% 90% at 82% 30%, #000000 0%, transparent 70%);
  mask-composite: intersect;
  -webkit-mask-image:
    repeating-linear-gradient(60deg, #000000 0 1px, transparent 1px 5px),
    radial-gradient(70% 90% at 82% 30%, #000000 0%, transparent 70%);
  -webkit-mask-composite: source-in;
}
.hb-vl10-seal {
  position: absolute;
  right: 6cqw;
  top: 7cqw;
  width: 17cqw;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    conic-gradient(from calc(var(--hb-vl10-ry) * 6) at 50% 50%, #ff8ab8, #ffe08a, #8affc4, #8ad8ff, #b89aff, #ff8ab8);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.4);
  transform: translateZ(28px);
  opacity: 0.92;
}
.hb-vl10-seal::before {
  content: "";
  position: absolute;
  inset: 18%;
  border-radius: 50%;
  background: repeating-conic-gradient(rgba(255, 255, 255, 0.55) 0 6deg, transparent 6deg 18deg);
  mix-blend-mode: overlay;
}
.hb-vl10-seal::after {
  content: "";
  position: absolute;
  inset: 36%;
  border-radius: 50%;
  background: #14161c;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}
.hb-vl10-glare {
  position: absolute;
  inset: 0;
  background: radial-gradient(55% 70% at var(--hb-vl10-mx) var(--hb-vl10-my), rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0.06) 40%, transparent 70%);
  mix-blend-mode: overlay;
  opacity: calc(0.35 + var(--hb-vl10-e) * 0.65);
  pointer-events: none;
}
.hb-vl10-edge {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(60% 60% at var(--hb-vl10-mx) var(--hb-vl10-my), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.08) 60%);
  mask: linear-gradient(#000000 0 0) content-box, linear-gradient(#000000 0 0);
  mask-composite: exclude;
  -webkit-mask: linear-gradient(#000000 0 0) content-box, linear-gradient(#000000 0 0);
  -webkit-mask-composite: xor;
  pointer-events: none;
}
.hb-vl10-in {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 6cqw 6.5cqw;
  transform: translateZ(18px);
  transform-style: preserve-3d;
}
.hb-vl10-top { display: flex; align-items: center; gap: 2cqw; }
.hb-vl10-logo {
  display: grid;
  place-items: center;
  width: 7.5cqw;
  aspect-ratio: 1;
  border-radius: 2cqw;
  background: var(--hb-vl10-a);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
}
.hb-vl10-ev { display: flex; flex-direction: column; line-height: 1.1; }
.hb-vl10-evn { font-family: var(--font-grotesk, inherit); font-size: 3.9cqw; font-weight: 600; letter-spacing: -0.01em; }
.hb-vl10-evd { font-family: var(--font-mono, ui-monospace, monospace); font-size: 2.5cqw; letter-spacing: 0.12em; text-transform: uppercase; color: #8f8f8f; }
.hb-vl10-mid { margin-top: auto; transform: translateZ(10px); }
.hb-vl10-acc {
  display: inline-block;
  margin-bottom: 1.6cqw;
  padding: 0.6cqw 2cqw;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 2.4cqw;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.hb-vl10-name { margin: 0; font-size: 7.2cqw; font-weight: 600; line-height: 1; letter-spacing: -0.03em; white-space: nowrap; }
.hb-vl10-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 4cqw; margin-top: 3cqw; }
.hb-vl10-role { font-size: 2.9cqw; color: #a1a1a1; white-space: nowrap; }
.hb-vl10-code { margin-top: 0.6cqw; font-family: var(--font-mono, ui-monospace, monospace); font-size: 2.4cqw; letter-spacing: 0.1em; color: #6f6f75; }
.hb-vl10-bars { display: flex; align-items: stretch; gap: 0.45cqw; height: 6.5cqw; opacity: 0.85; }
.hb-vl10-bars span { background: #ededed; border-radius: 0.2cqw; }
.hb-vl10-bk { position: absolute; inset: 0; display: flex; align-items: center; gap: 6cqw; padding: 7cqw; }
.hb-vl10-qr {
  display: grid;
  flex: none;
  grid-template-columns: repeat(11, 1fr);
  gap: 0.5cqw;
  width: 34cqw;
  padding: 2.4cqw;
  border-radius: 2.4cqw;
  background: #f4f4f5;
}
.hb-vl10-qr span { aspect-ratio: 1; border-radius: 0.3cqw; }
.hb-vl10-qr span[data-on="true"] { background: #0d0e12; }
.hb-vl10-bt { display: flex; flex-direction: column; gap: 1.6cqw; }
.hb-vl10-bt strong { font-size: 4.6cqw; font-weight: 600; letter-spacing: -0.02em; }
.hb-vl10-bt span { font-size: 2.9cqw; line-height: 1.45; color: #a1a1a1; }
.hb-vl10-hint {
  position: absolute;
  right: 5cqw;
  bottom: 4.6cqw;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 2.2cqw;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6f6f75;
  transform: translateZ(12px);
}
@media (prefers-reduced-motion: reduce) {
  .hb-vl10-flip { transition: none; }
}
`;

export function CardFoilPass({
  event = "Northwind Summit",
  edition = "Lisbon / 14-16 May 2027",
  name = "Maya Lindqvist",
  detail = "Speaker, Hall B",
  access = "All access",
  code = "NWS-0427-118",
  maxTilt = 14,
  idle = true,
  flippable = true,
  accent = "#2f7bff",
  onFlip,
  className,
  style,
  onPointerMove,
  onPointerLeave,
  onKeyDown,
  onClick,
  ...rest
}: CardFoilPassProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const target = React.useRef({ rx: 0, ry: 0, mx: 50, my: 50, e: 0 });
  const over = React.useRef(false);
  const [flipped, setFlipped] = React.useState(false);
  const uid = React.useId().replace(/:/g, "");

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cur = { rx: 0, ry: 0, mx: 50, my: 50, e: 0 };
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (!over.current) {
        if (idle) {
          const ry = Math.sin(t * 0.0006) * maxTilt * 0.55;
          const rx = Math.sin(t * 0.0009 + 1.2) * maxTilt * 0.35;
          target.current = { rx, ry, mx: 50 + (ry / maxTilt) * 45, my: 50 - (rx / maxTilt) * 45, e: 0.35 };
        } else target.current = { rx: 0, ry: 0, mx: 50, my: 50, e: 0 };
      }
      const k = over.current ? 0.14 : 0.06;
      const tg = target.current;
      cur.rx += (tg.rx - cur.rx) * k;
      cur.ry += (tg.ry - cur.ry) * k;
      cur.mx += (tg.mx - cur.mx) * k;
      cur.my += (tg.my - cur.my) * k;
      cur.e += (tg.e - cur.e) * k;
      el.style.setProperty("--hb-vl10-rx", `${cur.rx.toFixed(2)}deg`);
      el.style.setProperty("--hb-vl10-ry", `${cur.ry.toFixed(2)}deg`);
      el.style.setProperty("--hb-vl10-mx", `${cur.mx.toFixed(1)}%`);
      el.style.setProperty("--hb-vl10-my", `${cur.my.toFixed(1)}%`);
      el.style.setProperty("--hb-vl10-e", cur.e.toFixed(3));
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [idle, maxTilt]);

  const aim = (px: number, py: number) => {
    target.current = {
      ry: (px - 0.5) * 2 * maxTilt,
      rx: -(py - 0.5) * 2 * maxTilt,
      mx: px * 100,
      my: py * 100,
      e: Math.min(1, 0.5 + Math.hypot(px - 0.5, py - 0.5)),
    };
  };

  const flip = () => {
    if (!flippable) return;
    const next = !flipped;
    setFlipped(next);
    onFlip?.(next);
  };

  return (
    <div
      ref={ref}
      className={["hb-vl10", className].filter(Boolean).join(" ")}
      style={{ "--hb-vl10-a": accent, ...style } as React.CSSProperties}
      data-flipped={flipped ? "true" : "false"}
      tabIndex={0}
      role={flippable ? "button" : "img"}
      aria-pressed={flippable ? flipped : undefined}
      aria-label={`${event} pass for ${name}, ${access}${flippable ? ". Press to flip" : ""}`}
      onPointerMove={(e) => {
        onPointerMove?.(e);
        const r = e.currentTarget.getBoundingClientRect();
        over.current = true;
        const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        aim(flipped ? 1 - px : px, py);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        over.current = false;
      }}
      onClick={(e) => {
        onClick?.(e);
        flip();
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          flip();
          return;
        }
        const step: Record<string, [number, number]> = { ArrowLeft: [0.15, 0.5], ArrowRight: [0.85, 0.5], ArrowUp: [0.5, 0.15], ArrowDown: [0.5, 0.85] };
        const s = step[e.key];
        if (!s) return;
        e.preventDefault();
        over.current = true;
        aim(s[0], s[1]);
      }}
      onBlur={() => {
        over.current = false;
      }}
      {...rest}
    >
      <style href="hb-card-foil-pass" precedence="default">{css}</style>
      <div className="hb-vl10-tilt">
        <div className="hb-vl10-flip">
          <div className="hb-vl10-face">
            <svg className="hb-vl10-guil" viewBox="0 0 400 252" preserveAspectRatio="none" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <path
                  key={i}
                  d={`M-10 ${(40 + i * 14).toFixed(0)} C 90 ${(10 + i * 14).toFixed(0)}, 170 ${(80 + i * 14).toFixed(0)}, 260 ${(36 + i * 14).toFixed(0)} S 380 ${(20 + i * 14).toFixed(0)}, 420 ${(52 + i * 14).toFixed(0)}`}
                  fill="none"
                  stroke="#8aa4ff"
                  strokeWidth="0.6"
                />
              ))}
            </svg>
            <span className="hb-vl10-foil" aria-hidden="true" />
            <span className="hb-vl10-seal" aria-hidden="true" />
            <div className="hb-vl10-in">
              <div className="hb-vl10-top">
                <span className="hb-vl10-logo" aria-hidden="true">
                  <svg viewBox="0 0 20 20" width="60%" height="60%" fill="none">
                    <path d="M4 15V5l12 10V5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="hb-vl10-ev">
                  <span className="hb-vl10-evn">{event}</span>
                  <span className="hb-vl10-evd">{edition}</span>
                </span>
              </div>
              <div className="hb-vl10-mid">
                <span className="hb-vl10-acc">{access}</span>
                <p className="hb-vl10-name">{name}</p>
                <div className="hb-vl10-row">
                  <div>
                    <div className="hb-vl10-role">{detail}</div>
                    <div className="hb-vl10-code">{code}</div>
                  </div>
                  <div className="hb-vl10-bars" aria-hidden="true">
                    {bars.map((w, i) => (
                      <span key={i} style={{ width: `${(w * 0.28).toFixed(2)}cqw` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <span className="hb-vl10-glare" aria-hidden="true" />
            <span className="hb-vl10-edge" aria-hidden="true" />
          </div>
          <div className="hb-vl10-face hb-vl10-back" aria-hidden={!flipped}>
            <div className="hb-vl10-bk">
              <div className="hb-vl10-qr" aria-hidden="true">
                {cells.map((on, i) => (
                  <span key={`${uid}-${i}`} data-on={on ? "true" : "false"} />
                ))}
              </div>
              <div className="hb-vl10-bt">
                <strong>Scan at the entrance</strong>
                <span>
                  Valid for all three days. Keep this pass visible inside the venue. Badge pickup opens at 08:00 in the Atrium.
                </span>
              </div>
            </div>
            <span className="hb-vl10-hint">{code}</span>
            <span className="hb-vl10-glare" aria-hidden="true" />
            <span className="hb-vl10-edge" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
