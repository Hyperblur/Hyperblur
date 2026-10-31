"use client";

import * as React from "react";

export interface CtaLink {
  label: string;
  href: string;
}

export interface CtaBannerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  text?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
  accent?: string;
}

const css = `
.hb-cb {
  --hb-cb-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  padding: 96px 24px;
  background: #07070a;
  color: #f2f2f5;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, .08);
  border-bottom: 1px solid rgba(255, 255, 255, .08);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.hb-cb *, .hb-cb *::before, .hb-cb *::after { box-sizing: border-box; }
.hb-cb::before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 50%;
  top: 50%;
  width: min(900px, 140%);
  aspect-ratio: 2 / 1;
  transform: translate(-50%, -50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-cb-accent) 38%, transparent), transparent);
  filter: blur(20px);
  pointer-events: none;
  animation: hb-cb-glow 7s ease-in-out infinite alternate;
}
.hb-cb-inner { max-width: 680px; margin: 0 auto; }
.hb-cb-title {
  margin: 0;
  font-size: clamp(30px, 4.8vw, 52px);
  font-weight: 650;
  line-height: 1.08;
  letter-spacing: -.025em;
}
.hb-cb-text {
  margin: 18px auto 0;
  max-width: 520px;
  font-size: clamp(15px, 1.7vw, 18px);
  line-height: 1.6;
  color: rgba(255, 255, 255, .66);
}
.hb-cb-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 36px;
}
.hb-cb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 26px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .25s cubic-bezier(.22, .8, .24, 1), background-color .25s ease, border-color .25s ease, box-shadow .25s ease;
}
.hb-cb-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-cb-primary {
  background: var(--hb-cb-accent);
  color: #fff;
  box-shadow: 0 10px 28px -10px var(--hb-cb-accent);
}
.hb-cb-primary:hover {
  transform: translate3d(0, -2px, 0);
  box-shadow: 0 16px 34px -10px var(--hb-cb-accent);
}
.hb-cb-secondary {
  border-color: rgba(255, 255, 255, .2);
  background: rgba(255, 255, 255, .04);
  color: #f2f2f5;
}
.hb-cb-secondary:hover {
  transform: translate3d(0, -2px, 0);
  border-color: rgba(255, 255, 255, .4);
  background: rgba(255, 255, 255, .09);
}
@keyframes hb-cb-glow {
  from { opacity: .75; transform: translate(-50%, -50%) scale(.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
}
@media (max-width: 767px) {
  .hb-cb { padding: 64px 16px; }
  .hb-cb-actions { flex-direction: column; align-items: stretch; margin-top: 28px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-cb::before { animation: none; }
  .hb-cb-btn { transition: none; }
  .hb-cb-primary:hover, .hb-cb-secondary:hover { transform: none; }
}
`;

export function CtaBanner({
  title = "Ready to build something great?",
  text = "Start for free today. No credit card required, and you can cancel anytime.",
  primary = { label: "Get started", href: "#start" },
  secondary = { label: "Talk to sales", href: "#contact" },
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: CtaBannerProps) {
  const uid = React.useId();
  const vars = { "--hb-cb-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-cb ${className}`} style={vars} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-cta-banner" precedence="default">{css}</style>
      <div className="hb-cb-inner">
        <h2 id={`${uid}-title`} className="hb-cb-title">{title}</h2>
        {text && <p className="hb-cb-text">{text}</p>}
        <div className="hb-cb-actions">
          <a className="hb-cb-btn hb-cb-primary" href={primary.href}>{primary.label}</a>
          <a className="hb-cb-btn hb-cb-secondary" href={secondary.href}>{secondary.label}</a>
        </div>
      </div>
    </section>
  );
}
