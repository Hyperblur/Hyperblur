"use client";

import * as React from "react";

export interface HeroSpotlightAction {
  label: string;
  href: string;
}

export interface HeroSpotlightProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: HeroSpotlightAction | null;
  secondaryCta?: HeroSpotlightAction | null;
  accent?: string;
  logos?: string[];
  radius?: number;
}

const css = `
@keyframes hb-hrs-up {
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hrs-pulse {
  0%, 100% { opacity: .55; }
  50% { opacity: 1; }
}
.hb-hrs {
  --hb-hrs-accent: #2f7bff;
  --hb-hrs-x: 50%;
  --hb-hrs-y: 38%;
  --hb-hrs-tx: 50%;
  --hb-hrs-ty: 50%;
  --hb-hrs-r: 280px;
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 560px;
  overflow: hidden;
  container-type: inline-size;
  background: #060607;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hrs *, .hb-hrs *::before, .hb-hrs *::after { box-sizing: border-box; }
.hb-hrs-base {
  position: absolute;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  background-image: radial-gradient(rgba(255, 255, 255, .075) 1px, transparent 1.5px);
  background-size: 24px 24px;
  background-position: 12px 12px;
  -webkit-mask-image: radial-gradient(ellipse 75% 70% at 50% 40%, #000 20%, transparent 85%);
  mask-image: radial-gradient(ellipse 75% 70% at 50% 40%, #000 20%, transparent 85%);
}
.hb-hrs-glow {
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background: radial-gradient(circle calc(var(--hb-hrs-r) * 1.6) at var(--hb-hrs-x) var(--hb-hrs-y), color-mix(in srgb, var(--hb-hrs-accent) 17%, transparent), transparent 70%);
}
.hb-hrs-reveal {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(circle var(--hb-hrs-r) at var(--hb-hrs-x) var(--hb-hrs-y), #000 0%, rgba(0, 0, 0, .6) 42%, transparent 100%);
  mask-image: radial-gradient(circle var(--hb-hrs-r) at var(--hb-hrs-x) var(--hb-hrs-y), #000 0%, rgba(0, 0, 0, .6) 42%, transparent 100%);
}
.hb-hrs-dots {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(color-mix(in srgb, var(--hb-hrs-accent) 55%, #ffffff) 1.15px, transparent 1.75px),
    linear-gradient(color-mix(in srgb, var(--hb-hrs-accent) 22%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--hb-hrs-accent) 22%, transparent) 1px, transparent 1px);
  background-size: 24px 24px, 96px 96px, 96px 96px;
  background-position: 12px 12px, 0 0, 0 0;
}
.hb-hrs-chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 11px;
  border: 1px solid color-mix(in srgb, var(--hb-hrs-accent) 45%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--hb-hrs-accent) 10%, #0b0b0d);
  color: #dfe8ff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 10px 30px -12px color-mix(in srgb, var(--hb-hrs-accent) 70%, transparent);
}
.hb-hrs-chip b { color: #ffffff; font-weight: 600; }
.hb-hrs-chip i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-hrs-c, #3ddc97);
  box-shadow: 0 0 8px var(--hb-hrs-c, #3ddc97);
}
.hb-hrs-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 80px 24px 56px;
  text-align: center;
}
.hb-hrs-a {
  animation: hb-hrs-up .8s cubic-bezier(.2, .8, .2, 1) both;
  animation-delay: calc(var(--hb-hrs-i, 0) * 80ms);
}
.hb-hrs-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  margin: 0 0 26px;
  padding: 4px 14px 4px 4px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: rgba(255, 255, 255, .035);
  color: #a1a1a1;
  font-size: 13px;
  line-height: 20px;
  backdrop-filter: blur(6px);
}
.hb-hrs-eyebrow span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-hrs-badge {
  flex: none;
  padding: 1px 9px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-hrs-accent) 22%, transparent);
  color: color-mix(in srgb, var(--hb-hrs-accent) 45%, #ffffff);
  font-size: 12px;
  font-weight: 600;
}
.hb-hrs-title {
  position: relative;
  max-width: 900px;
  margin: 0;
  font-size: clamp(34px, 7.2cqi, 72px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -.04em;
  text-wrap: balance;
}
.hb-hrs-dim {
  display: block;
  background: linear-gradient(180deg, #f2f2f2 10%, #7d7d84 120%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hb-hrs-lit {
  position: absolute;
  inset: 0;
  display: block;
  pointer-events: none;
  background: linear-gradient(100deg, #ffffff 15%, color-mix(in srgb, var(--hb-hrs-accent) 40%, #ffffff) 45%, var(--hb-hrs-accent) 85%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 22px color-mix(in srgb, var(--hb-hrs-accent) 55%, transparent));
  -webkit-mask-image: radial-gradient(circle calc(var(--hb-hrs-r) * .78) at var(--hb-hrs-tx) var(--hb-hrs-ty), #000 0%, rgba(0, 0, 0, .5) 45%, transparent 100%);
  mask-image: radial-gradient(circle calc(var(--hb-hrs-r) * .78) at var(--hb-hrs-tx) var(--hb-hrs-ty), #000 0%, rgba(0, 0, 0, .5) 45%, transparent 100%);
}
.hb-hrs-sub {
  max-width: 580px;
  margin: 22px 0 0;
  color: #a1a1a1;
  font-size: clamp(16px, 1.95cqi, 18.5px);
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-hrs-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 34px;
}
.hb-hrs-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: #ededed;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .2s ease, background-color .2s ease, border-color .2s ease, box-shadow .25s ease;
}
.hb-hrs-btn:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .28); transform: translate3d(0, -1px, 0); }
.hb-hrs-btn:active { transform: translate3d(0, 0, 0) scale(.98); }
.hb-hrs-btn:focus-visible { outline: 2px solid var(--hb-hrs-accent); outline-offset: 3px; }
.hb-hrs-btn svg { transition: transform .2s ease; }
.hb-hrs-btn:hover svg { transform: translate3d(3px, 0, 0); }
.hb-hrs-btn[data-primary="true"] {
  border-color: transparent;
  background: #ededed;
  color: #0a0a0a;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .1), 0 10px 34px -10px color-mix(in srgb, var(--hb-hrs-accent) 80%, transparent);
}
.hb-hrs-btn[data-primary="true"]:hover { background: #ffffff; box-shadow: 0 0 0 1px rgba(255, 255, 255, .2), 0 14px 40px -10px var(--hb-hrs-accent); }
.hb-hrs-trust {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 56px;
}
.hb-hrs-trust p {
  margin: 0;
  color: #6f6f76;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-hrs-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 34px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-hrs-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #8f8f8f;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -.02em;
  transition: color .2s ease;
}
.hb-hrs-logo:hover { color: #ededed; }
.hb-hrs-logo svg { flex: none; }
.hb-hrs-logo[data-v="1"] { font-weight: 700; letter-spacing: .06em; font-size: 14px; text-transform: uppercase; }
.hb-hrs-logo[data-v="2"] { font-weight: 500; }
.hb-hrs-logo[data-v="3"] { font-weight: 800; letter-spacing: -.045em; }
.hb-hrs-logo[data-v="4"] { font-weight: 500; letter-spacing: .02em; }
.hb-hrs-hint {
  position: absolute;
  right: 18px;
  bottom: 16px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #5c5c63;
  font-size: 11.5px;
  pointer-events: none;
}
.hb-hrs-hint i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-hrs-accent);
  animation: hb-hrs-pulse 2.4s ease-in-out infinite;
}
@container (max-width: 760px) {
  .hb-hrs-chip[data-hide="md"] { display: none; }
  .hb-hrs-hint { display: none; }
}
@container (max-width: 520px) {
  .hb-hrs-inner { padding: 64px 20px 44px; }
  .hb-hrs-chip { display: none; }
  .hb-hrs-actions { flex-direction: column; align-self: stretch; }
  .hb-hrs-btn { width: 100%; }
  .hb-hrs-trust { margin-top: 44px; }
  .hb-hrs-logos { gap: 10px 22px; }
  .hb-hrs-logo { font-size: 15px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hrs-a, .hb-hrs-hint i { animation: none; }
  .hb-hrs-btn, .hb-hrs-btn svg, .hb-hrs-logo { transition: none; }
  .hb-hrs-btn:hover, .hb-hrs-btn:hover svg { transform: none; }
}
`;

const defaultPrimary: HeroSpotlightAction = { label: "Start free trial", href: "#" };
const defaultSecondary: HeroSpotlightAction = { label: "Watch the demo", href: "#" };
const defaultLogos = ["Northwind", "Kestrel", "Halcyon", "Lumen", "Arcadia"];

const chips = [
  { left: "6%", top: "18%", label: "LCP", value: "1.2s", color: "#3ddc97", hide: "" },
  { left: "74%", top: "14%", label: "Replay", value: "#48213", color: "#7fb3ff", hide: "md" },
  { left: "4%", top: "64%", label: "Errors", value: "-62%", color: "#3ddc97", hide: "md" },
  { left: "78%", top: "58%", label: "Rage clicks", value: "3", color: "#ff6b6b", hide: "" },
  { left: "17%", top: "5%", label: "Sessions", value: "18,402", color: "#7fb3ff", hide: "md" },
];

function LogoMark({ index }: { index: number }) {
  const v = index % 5;
  if (v === 0) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      </svg>
    );
  }
  if (v === 1) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.5 22 20H2z" />
      </svg>
    );
  }
  if (v === 2) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="13" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="8" rx="2" opacity=".45" />
      </svg>
    );
  }
  if (v === 3) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2 22 12 12 22 2 12z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
      <path d="M4 18c4-10 12-10 16 0" />
      <path d="M8 18c2-5 6-5 8 0" />
    </svg>
  );
}

function delay(index: number) {
  return { "--hb-hrs-i": index } as React.CSSProperties;
}

export function HeroSpotlight({
  eyebrow = "Session replay 2.0 is live",
  badge = "New",
  title = "See what your users actually see",
  subtitle = "Replays, real-user metrics and error traces on one timeline, so you find the slow screen before your customers do.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  accent = "#2f7bff",
  logos = defaultLogos,
  radius = 280,
  className = "",
  style,
  ...rest
}: HeroSpotlightProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const heading = titleRef.current;
    if (!root || !heading) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = root.offsetWidth;
    let h = root.offsetHeight;
    let ox = 0;
    let oy = 0;
    let cx = w * 0.5;
    let cy = h * 0.4;
    let px = cx;
    let py = cy;
    let pointer = false;
    let visible = true;
    let raf = 0;
    let last = 0;
    let t = 0;

    function measure() {
      if (!root || !heading) return;
      w = root.offsetWidth;
      h = root.offsetHeight;
      let x = 0;
      let y = 0;
      let node: HTMLElement | null = heading;
      while (node && node !== root) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      ox = x;
      oy = y;
    }

    function path(time: number) {
      return {
        x: w * (0.5 + 0.34 * Math.sin(time * 0.42)),
        y: h * (0.4 + 0.2 * Math.sin(time * 0.77 + 1.1)),
      };
    }

    function apply() {
      if (!root) return;
      root.style.setProperty("--hb-hrs-x", `${cx.toFixed(1)}px`);
      root.style.setProperty("--hb-hrs-y", `${cy.toFixed(1)}px`);
      root.style.setProperty("--hb-hrs-tx", `${(cx - ox).toFixed(1)}px`);
      root.style.setProperty("--hb-hrs-ty", `${(cy - oy).toFixed(1)}px`);
    }

    function frame(now: number) {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      if (!pointer) t += dt;
      const target = pointer ? { x: px, y: py } : path(t);
      const k = 1 - Math.exp(-dt * (pointer ? 9 : 3.5));
      cx += (target.x - cx) * k;
      cy += (target.y - cy) * k;
      apply();
      if (visible) raf = requestAnimationFrame(frame);
    }

    function start() {
      if (reduce || raf || !visible) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    }

    function local(e: PointerEvent) {
      if (!root) return { x: 0, y: 0 };
      const r = root.getBoundingClientRect();
      const sx = r.width ? root.offsetWidth / r.width : 1;
      const sy = r.height ? root.offsetHeight / r.height : 1;
      return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
    }

    function onMove(e: PointerEvent) {
      const p = local(e);
      px = p.x;
      py = p.y;
      pointer = true;
      if (reduce) {
        cx = px;
        cy = py;
        apply();
      }
    }

    function onLeave() {
      pointer = false;
      if (!reduce) {
        let best = 0;
        let bestD = Infinity;
        for (let i = 0; i < 64; i++) {
          const s = t + (i / 64) * 15;
          const p = path(s);
          const d = (p.x - cx) ** 2 + (p.y - cy) ** 2;
          if (d < bestD) {
            bestD = d;
            best = s;
          }
        }
        t = best;
      }
    }

    measure();
    const start0 = path(0);
    cx = start0.x;
    cy = start0.y;
    apply();

    const ro = new ResizeObserver(() => {
      measure();
      if (reduce) apply();
    });
    ro.observe(root);
    ro.observe(heading);

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) start();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(root);

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  const vars = {
    "--hb-hrs-accent": accent,
    "--hb-hrs-r": `${Math.max(80, radius)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <section ref={rootRef} className={`hb-hrs ${className}`} style={vars} {...rest}>
      <style href="hb-hero-spotlight" precedence="default">{css}</style>
      <div className="hb-hrs-base" aria-hidden="true" />
      <div className="hb-hrs-glow" aria-hidden="true" />
      <div className="hb-hrs-reveal" aria-hidden="true">
        <div className="hb-hrs-dots" />
        {chips.map((chip) => (
          <span
            key={chip.label}
            className="hb-hrs-chip"
            data-hide={chip.hide || undefined}
            style={{ left: chip.left, top: chip.top, "--hb-hrs-c": chip.color } as React.CSSProperties}
          >
            <i />
            {chip.label} <b>{chip.value}</b>
          </span>
        ))}
      </div>
      <div className="hb-hrs-inner">
        {eyebrow ? (
          <p className="hb-hrs-eyebrow hb-hrs-a" style={delay(0)}>
            {badge ? <span className="hb-hrs-badge">{badge}</span> : null}
            <span>{eyebrow}</span>
          </p>
        ) : null}
        <h1 ref={titleRef} className="hb-hrs-title hb-hrs-a" style={delay(1)}>
          <span className="hb-hrs-dim">{title}</span>
          <span className="hb-hrs-lit" aria-hidden="true">{title}</span>
        </h1>
        {subtitle ? (
          <p className="hb-hrs-sub hb-hrs-a" style={delay(2)}>
            {subtitle}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="hb-hrs-actions hb-hrs-a" style={delay(3)}>
            {primaryCta ? (
              <a className="hb-hrs-btn" data-primary="true" href={primaryCta.href}>
                {primaryCta.label}
              </a>
            ) : null}
            {secondaryCta ? (
              <a className="hb-hrs-btn" href={secondaryCta.href}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                </svg>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
        {logos.length > 0 ? (
          <div className="hb-hrs-trust hb-hrs-a" style={delay(4)}>
            <p>Trusted by product teams at</p>
            <ul className="hb-hrs-logos">
              {logos.map((name, i) => (
                <li key={name} className="hb-hrs-logo" data-v={i % 5}>
                  <LogoMark index={i} />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <span className="hb-hrs-hint" aria-hidden="true">
        <i />
        Move your cursor
      </span>
    </section>
  );
}
