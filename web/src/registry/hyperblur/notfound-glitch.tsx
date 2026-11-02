"use client";

import * as React from "react";

export interface NotfoundGlitchLink {
  label: string;
  href: string;
}

export interface NotfoundGlitchProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  code?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  lines?: string[];
  primary?: NotfoundGlitchLink;
  secondary?: NotfoundGlitchLink;
  onReport?: () => void;
  accent?: string;
}

const css = `
.hb-kg1 {
  --hb-kg1-accent: #ff3864;
  --hb-kg1-cyan: #22d3ee;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kg1 *, .hb-kg1 *::before, .hb-kg1 *::after { box-sizing: border-box; }
.hb-kg1::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(60% 70% at 18% 40%, color-mix(in srgb, var(--hb-kg1-accent) 16%, transparent), transparent 70%),
    radial-gradient(50% 60% at 85% 80%, color-mix(in srgb, var(--hb-kg1-cyan) 9%, transparent), transparent 70%),
    linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px) 0 0 / 100% 48px,
    linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px) 0 0 / 48px 100%;
  -webkit-mask-image: radial-gradient(80% 90% at 50% 50%, #000 40%, transparent 100%);
  mask-image: radial-gradient(80% 90% at 50% 50%, #000 40%, transparent 100%);
}
.hb-kg1::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background:
    linear-gradient(to bottom, transparent 0, rgba(255, 255, 255, .05) 50%, transparent 100%) 0 -30% / 100% 140px no-repeat,
    repeating-linear-gradient(to bottom, rgba(255, 255, 255, .03) 0 1px, transparent 1px 3px);
  animation: hb-kg1-sweep 6s linear infinite;
}
.hb-kg1-inner {
  display: grid;
  gap: 40px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px;
  align-items: center;
}
.hb-kg1-stage {
  position: relative;
  display: flex;
  justify-content: center;
}
.hb-kg1-code {
  position: relative;
  margin: 0;
  font-size: clamp(120px, 34cqi, 300px);
  font-weight: 800;
  line-height: .82;
  letter-spacing: -.07em;
  color: #f5f5f5;
  text-shadow: 0 0 40px rgba(255, 255, 255, .08);
  animation: hb-kg1-jitter 4.2s steps(1) infinite;
  user-select: none;
}
.hb-kg1-code::before, .hb-kg1-code::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
  pointer-events: none;
}
.hb-kg1-code::before {
  color: var(--hb-kg1-accent);
  transform: translateX(-4px);
  clip-path: inset(12% 0 64% 0);
  animation: hb-kg1-slice-a 2.8s steps(1) infinite;
}
.hb-kg1-code::after {
  color: var(--hb-kg1-cyan);
  transform: translateX(4px);
  clip-path: inset(58% 0 18% 0);
  animation: hb-kg1-slice-b 2.3s steps(1) infinite;
}
.hb-kg1-shadow {
  position: absolute;
  left: 50%;
  bottom: -18px;
  width: 70%;
  height: 26px;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kg1-accent) 40%, transparent), transparent);
  filter: blur(8px);
  opacity: .7;
}
.hb-kg1-copy { min-width: 0; text-align: center; }
.hb-kg1-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: #a1a1a1;
  font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-kg1-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hb-kg1-accent);
  box-shadow: 0 0 10px var(--hb-kg1-accent);
  animation: hb-kg1-blink 1.2s steps(1) infinite;
}
.hb-kg1-title {
  margin: 18px 0 0;
  font-size: clamp(28px, 4.4cqi, 44px);
  font-weight: 650;
  line-height: 1.08;
  letter-spacing: -.03em;
  text-wrap: balance;
}
.hb-kg1-sub {
  margin: 14px auto 0;
  max-width: 460px;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kg1-term {
  margin: 26px auto 0;
  max-width: 480px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 14px;
  background: linear-gradient(180deg, #131313, #0d0d0d);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 24px 60px -30px rgba(0, 0, 0, .9);
  text-align: left;
  overflow: hidden;
}
.hb-kg1-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, .06);
  color: #6b6b6b;
  font-size: 11px;
}
.hb-kg1-bar i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #2a2a2a;
}
.hb-kg1-bar span { margin-left: auto; font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace; }
.hb-kg1-body {
  padding: 14px 16px 16px;
  font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: clamp(11px, 2.9cqi, 13px);
  line-height: 1.75;
}
.hb-kg1-line { display: block; max-width: 100%; overflow: hidden; white-space: nowrap; color: #a1a1a1; }
.hb-kg1-line:first-child { color: #ededed; }
.hb-kg1-line:nth-child(2) { color: var(--hb-kg1-accent); }
.hb-kg1-typed {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  vertical-align: bottom;
  white-space: pre;
  width: 0;
  animation: hb-kg1-type calc(var(--hb-kg1-n) * 38ms) steps(var(--hb-kg1-n), end) var(--hb-kg1-d) forwards;
}
.hb-kg1-prompt { color: #ededed; opacity: 0; animation: hb-kg1-show .01s linear var(--hb-kg1-d) forwards; }
.hb-kg1-caret {
  display: inline-block;
  width: .6em;
  height: 1.1em;
  margin-left: 2px;
  vertical-align: -.2em;
  background: #ededed;
  animation: hb-kg1-blink 1s steps(1) infinite;
}
.hb-kg1-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 28px;
}
.hb-kg1-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid transparent;
  border-radius: 999px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: transform .2s cubic-bezier(.2, .8, .2, 1), background-color .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.hb-kg1-btn:focus-visible { outline: 2px solid var(--hb-kg1-accent); outline-offset: 3px; }
.hb-kg1-btn svg { width: 16px; height: 16px; flex: none; }
.hb-kg1-primary { background: #ededed; color: #0a0a0a; box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .12); }
.hb-kg1-primary:hover { transform: translateY(-1px); background: #fff; box-shadow: 0 10px 30px -12px rgba(255, 255, 255, .5); }
.hb-kg1-ghost { border-color: rgba(255, 255, 255, .12); background: rgba(255, 255, 255, .03); color: #ededed; }
.hb-kg1-ghost:hover { transform: translateY(-1px); border-color: color-mix(in srgb, var(--hb-kg1-accent) 60%, transparent); background: color-mix(in srgb, var(--hb-kg1-accent) 10%, transparent); }
@container (min-width: 760px) {
  .hb-kg1-inner { grid-template-columns: 1.05fr 1fr; gap: 56px; padding: 96px 40px; }
  .hb-kg1-code { font-size: clamp(160px, 23cqi, 280px); }
  .hb-kg1-copy { text-align: left; }
  .hb-kg1-sub, .hb-kg1-term { margin-left: 0; }
  .hb-kg1-actions { justify-content: flex-start; }
}
@keyframes hb-kg1-slice-a {
  0% { clip-path: inset(12% 0 64% 0); transform: translateX(-4px); }
  14% { clip-path: inset(44% 0 38% 0); transform: translateX(-10px); }
  28% { clip-path: inset(70% 0 8% 0); transform: translateX(3px); }
  42% { clip-path: inset(4% 0 86% 0); transform: translateX(-6px); }
  56% { clip-path: inset(30% 0 52% 0); transform: translateX(8px); }
  70% { clip-path: inset(82% 0 2% 0); transform: translateX(-3px); }
  84% { clip-path: inset(20% 0 66% 0); transform: translateX(-12px); }
}
@keyframes hb-kg1-slice-b {
  0% { clip-path: inset(58% 0 18% 0); transform: translateX(4px); }
  18% { clip-path: inset(8% 0 78% 0); transform: translateX(9px); }
  36% { clip-path: inset(36% 0 46% 0); transform: translateX(-5px); }
  54% { clip-path: inset(74% 0 6% 0); transform: translateX(12px); }
  72% { clip-path: inset(22% 0 60% 0); transform: translateX(-8px); }
  90% { clip-path: inset(48% 0 34% 0); transform: translateX(5px); }
}
@keyframes hb-kg1-jitter {
  0%, 46%, 50%, 88%, 92%, 100% { transform: none; }
  47% { transform: translate(-3px, 1px) skewX(-6deg); }
  48% { transform: translate(4px, -1px) skewX(4deg); }
  89% { transform: translate(2px, 0) skewX(8deg); }
  90% { transform: translate(-2px, 1px); }
}
@keyframes hb-kg1-type { to { width: calc(var(--hb-kg1-n) * 1ch); } }
@keyframes hb-kg1-show { to { opacity: 1; } }
@keyframes hb-kg1-blink { 0% { opacity: 1; } 50% { opacity: 0; } }
@keyframes hb-kg1-sweep { from { background-position: 0 -140px, 0 0; } to { background-position: 0 calc(100% + 140px), 0 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-kg1::after, .hb-kg1-code, .hb-kg1-code::before, .hb-kg1-code::after, .hb-kg1-dot, .hb-kg1-caret { animation: none; }
  .hb-kg1-typed { animation: none; width: auto; }
  .hb-kg1-prompt { animation: none; opacity: 1; }
  .hb-kg1-btn { transition: none; }
  .hb-kg1-btn:hover { transform: none; }
}
`;

function ArrowLeft() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3.5 5.5 8l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 14V2.5m0 0h7.2l-1.4 2.6 1.4 2.6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NotfoundGlitch({
  code = "404",
  eyebrow = "Error 404 · signal lost",
  title = "This page slipped through the cracks",
  subtitle = "The link may be broken, or the page was moved during our last deploy. Head back home, or tell us where you found it.",
  lines = ["$ open /reports/q3-legacy", "HTTP/2 404  route not found", "hint: moved or never existed"],
  primary = { label: "Back to home", href: "/" },
  secondary = { label: "Report broken link", href: "mailto:support@northwind.app?subject=Broken%20link" },
  onReport,
  accent = "#ff3864",
  className = "",
  style,
  ...rest
}: NotfoundGlitchProps) {
  const uid = React.useId();
  const vars = { "--hb-kg1-accent": accent, ...style } as React.CSSProperties;
  const timed = lines.reduce<{ line: string; start: number }[]>((acc, line) => {
    const prev = acc[acc.length - 1];
    const start = prev ? prev.start + prev.line.length * 0.038 + 0.35 : 0.5;
    return [...acc, { line, start }];
  }, []);
  const last = timed[timed.length - 1];
  const delay = last ? last.start + last.line.length * 0.038 + 0.35 : 0.5;

  return (
    <section className={`hb-kg1 ${className}`} style={vars} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-notfound-glitch" precedence="default">{css}</style>
      <div className="hb-kg1-inner">
        <div className="hb-kg1-stage" aria-hidden="true">
          <p className="hb-kg1-code" data-text={code}>{code}</p>
          <span className="hb-kg1-shadow" />
        </div>
        <div className="hb-kg1-copy">
          <span className="hb-kg1-eyebrow"><span className="hb-kg1-dot" />{eyebrow}</span>
          <h1 id={`${uid}-title`} className="hb-kg1-title">{title}</h1>
          {subtitle && <p className="hb-kg1-sub">{subtitle}</p>}
          {lines.length > 0 && (
            <div className="hb-kg1-term" role="log" aria-label="Request log">
              <div className="hb-kg1-bar" aria-hidden="true"><i /><i /><i /><span>zsh · northwind</span></div>
              <div className="hb-kg1-body">
                {timed.map(({ line, start }, i) => (
                  <span key={i} className="hb-kg1-line">
                    <span
                      className="hb-kg1-typed"
                      style={{ "--hb-kg1-n": line.length, "--hb-kg1-d": `${start.toFixed(2)}s` } as React.CSSProperties}
                    >
                      {line}
                    </span>
                  </span>
                ))}
                <span className="hb-kg1-line" aria-hidden="true">
                  <span className="hb-kg1-prompt" style={{ "--hb-kg1-d": `${delay.toFixed(2)}s` } as React.CSSProperties}>
                    $<span className="hb-kg1-caret" />
                  </span>
                </span>
              </div>
            </div>
          )}
          <div className="hb-kg1-actions">
            <a className="hb-kg1-btn hb-kg1-primary" href={primary.href}><ArrowLeft />{primary.label}</a>
            <a className="hb-kg1-btn hb-kg1-ghost" href={secondary.href} onClick={onReport}><FlagIcon />{secondary.label}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
